import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { User, Settings, GraduationCap, Eye, EyeOff, Pencil, Camera, Check } from 'lucide-react';
import { ProfileCardBody, PublicProfile, classLabel } from './ProfileCardBody';
import { SchoolMarksPanel, MarksPayload } from './SchoolMarksPanel';
import type { MarksEntry } from './schoolMarksUtil';
import type { VerifyOutcome } from './VerifyMarksModal';
import { COUNTRIES, statesOf, citiesOf, stateWord } from '../../places';

// The student's own profile: a social-style page (photo, class, city, school, interests ...), the privacy choices
// that decide what other students see, and the School Marks tracker. Class is taken automatically from the account.

export interface ProfileUser {
  name: string;
  email: string;
  token: string;
  studentClass?: string;
  photoUrl: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  favoriteSubject: string | null;
  hobbies: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  school?: string | null;
  ambition?: string | null;
  profileVisibility?: Record<string, boolean>;
}

const DEFAULT_VISIBILITY: Record<string, boolean> = {
  photo: true, class: true, bio: true, interests: true, favoriteSubject: true,
  city: false, country: false, school: false, ambition: false, birthday: false, schoolMarks: false,
};

const PRIVACY_ROWS: { key: string; title: string; hint: string }[] = [
  { key: 'photo', title: 'Profile photo', hint: 'Your picture. If hidden, others see your initials.' },
  { key: 'class', title: 'My class', hint: 'Taken automatically from your account.' },
  { key: 'city', title: 'City and state', hint: 'The city you live in.' },
  { key: 'country', title: 'Country', hint: 'The country you live in.' },
  { key: 'school', title: 'School', hint: 'The name of your school.' },
  { key: 'bio', title: 'About me', hint: 'The few lines you wrote about yourself.' },
  { key: 'interests', title: 'Interests & hobbies', hint: 'What you enjoy doing.' },
  { key: 'favoriteSubject', title: 'Favourite subject', hint: '' },
  { key: 'ambition', title: 'What I want to become', hint: 'Your dream or ambition.' },
  { key: 'birthday', title: 'Birthday', hint: 'Only the day and month are shown, never the year.' },
  { key: 'schoolMarks', title: 'My latest school marks', hint: 'Your most recent percentage in each subject. Your full marks always stay private.' },
];

const INTEREST_IDEAS = ['Cricket', 'Football', 'Reading', 'Drawing', 'Music', 'Dancing', 'Coding', 'Chess', 'Singing', 'Badminton', 'Science experiments', 'Photography'];

function formatBirthday(dob: string | null): string | undefined {
  if (!dob) return undefined;
  const d = new Date(dob + 'T00:00:00Z');
  return isNaN(d.getTime()) ? undefined : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', timeZone: 'UTC' });
}

function Toggle({ on, onChange, disabled, label }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} disabled={disabled} onClick={() => onChange(!on)}
      className={`relative shrink-0 w-11 h-6 rounded-full transition cursor-pointer disabled:opacity-50 ${on ? 'bg-emerald-500' : 'bg-slate-600'}`}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}

export default function ProfileCenter({ user, isLightMode, onUserUpdated }: { user: ProfileUser; isLightMode: boolean; onUserUpdated: (u: ProfileUser) => void }) {
  const [tab, setTab] = useState<'profile' | 'privacy' | 'marks'>('profile');
  const [editing, setEditing] = useState(false);
  const vis = useMemo(() => ({ ...DEFAULT_VISIBILITY, ...(user.profileVisibility || {}) }), [user.profileVisibility]);

  // edit form
  const [name, setName] = useState(user.name);
  const [dob, setDob] = useState(user.dateOfBirth || '');
  const [bio, setBio] = useState(user.bio || '');
  const [favSubject, setFavSubject] = useState(user.favoriteSubject || '');
  const [interests, setInterests] = useState(user.hobbies || '');
  const [city, setCity] = useState(user.city || '');
  const [country, setCountry] = useState(user.country || '');
  const [stateName, setStateName] = useState(user.state || '');
  const [school, setSchool] = useState(user.school || '');
  const [ambition, setAmbition] = useState(user.ambition || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [upgradeNote, setUpgradeNote] = useState(false);

  const startEdit = () => {
    setName(user.name); setDob(user.dateOfBirth || ''); setBio(user.bio || ''); setFavSubject(user.favoriteSubject || '');
    setInterests(user.hobbies || ''); setCity(user.city || ''); setCountry(user.country || ''); setStateName(user.state || ''); setSchool(user.school || ''); setAmbition(user.ambition || '');
    setPhotoFile(null); setMessage(null); setEditing(true);
  };

  // Sends the WHOLE profile every time (the server replaces what is stored), with any changes applied on top.
  const send = useCallback(async (fields: { name: string; dob: string; bio: string; favSubject: string; interests: string; city: string; state: string; country: string; school: string; ambition: string; visibility: Record<string, boolean>; photo?: File | null }) => {
    const fd = new FormData();
    fd.append('name', fields.name.trim());
    fd.append('dateOfBirth', fields.dob);
    fd.append('bio', fields.bio);
    fd.append('favoriteSubject', fields.favSubject);
    fd.append('hobbies', fields.interests);
    fd.append('city', fields.city);
    fd.append('country', fields.country);
    fd.append('state', fields.state);
    fd.append('school', fields.school);
    fd.append('ambition', fields.ambition);
    fd.append('profileVisibility', JSON.stringify(fields.visibility));
    if (fields.photo) fd.append('photo', fields.photo);
    const resp = await fetch('/api/profile/update', { method: 'POST', headers: { Authorization: `Bearer ${user.token}` }, body: fd });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data.error || 'Could not save. Please try again.');
    onUserUpdated({ ...data.user, token: user.token });
    setUpgradeNote(!!data.profileUpgradePending);
  }, [user.token, onUserUpdated]);

  const current = () => ({ name: user.name, dob: user.dateOfBirth || '', bio: user.bio || '', favSubject: user.favoriteSubject || '', interests: user.hobbies || '', city: user.city || '', state: user.state || '', country: user.country || '', school: user.school || '', ambition: user.ambition || '', visibility: vis });

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setMessage({ type: 'error', text: 'Your name cannot be empty.' });
    setSaving(true); setMessage(null);
    try {
      await send({ name, dob, bio, favSubject, interests, city, state: stateName, country, school, ambition, visibility: vis, photo: photoFile });
      setMessage({ type: 'ok', text: 'Profile saved.' }); setEditing(false); setPhotoFile(null);
    } catch (err: any) { setMessage({ type: 'error', text: err.message }); }
    setSaving(false);
  };

  const setVisibility = async (key: string, value: boolean) => {
    setMessage(null);
    try { await send({ ...current(), visibility: { ...vis, [key]: value } }); }
    catch (err: any) { setMessage({ type: 'error', text: err.message }); }
  };

  // what other students see: the same rules the server applies
  const preview: PublicProfile = {
    name: user.name,
    photoUrl: vis.photo ? user.photoUrl : null,
    studentClass: vis.class ? user.studentClass : undefined,
    city: vis.city && user.city ? user.city : undefined,
    state: vis.city && user.state ? user.state : undefined,
    country: vis.country && user.country ? user.country : undefined,
    school: vis.school && user.school ? user.school : undefined,
    bio: vis.bio && user.bio ? user.bio : undefined,
    interests: vis.interests && user.hobbies ? user.hobbies : undefined,
    favoriteSubject: vis.favoriteSubject && user.favoriteSubject ? user.favoriteSubject : undefined,
    ambition: vis.ambition && user.ambition ? user.ambition : undefined,
    birthday: vis.birthday ? formatBirthday(user.dateOfBirth) : undefined,
    view: 'student',
  };
  const myView: PublicProfile = { ...preview, photoUrl: user.photoUrl, studentClass: user.studentClass, city: user.city || undefined, state: user.state || undefined, country: user.country || undefined, school: user.school || undefined, bio: user.bio || undefined, interests: user.hobbies || undefined, favoriteSubject: user.favoriteSubject || undefined, ambition: user.ambition || undefined, birthday: formatBirthday(user.dateOfBirth), view: 'self' };

  // school marks
  const [entries, setEntries] = useState<MarksEntry[]>([]);
  const [marksLoaded, setMarksLoaded] = useState(false);
  const [marksUnavailable, setMarksUnavailable] = useState(false);
  const [verificationReady, setVerificationReady] = useState(false);
  const loadMarks = useCallback(async () => {
    try {
      const r = await fetch('/api/school-marks', { headers: { Authorization: `Bearer ${user.token}` } });
      const d = await r.json();
      setEntries(d.entries || []); setMarksUnavailable(!!d.unavailable); setVerificationReady(!!d.verificationReady);
    } catch { /* leave as is */ }
    setMarksLoaded(true);
  }, [user.token]);
  useEffect(() => { if (tab === 'marks' && !marksLoaded) loadMarks(); }, [tab, marksLoaded, loadMarks]);

  const saveMarks = async (payload: MarksPayload): Promise<string | null> => {
    const r = await fetch('/api/school-marks', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }, body: JSON.stringify(payload) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return d.error || 'Could not save these marks.';
    await loadMarks();
    return null;
  };
  const verifyMarks = async (exam: { academicYear: string; examName: string }, files: File[]): Promise<VerifyOutcome> => {
    const fd = new FormData();
    fd.append('academicYear', exam.academicYear);
    fd.append('examName', exam.examName);
    files.forEach((f) => fd.append('files', f));
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 170_000);
    try {
      const r = await fetch('/api/school-marks/verify', { method: 'POST', headers: { Authorization: `Bearer ${user.token}` }, body: fd, signal: controller.signal });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) return { error: d.error || 'Could not check the document. Please try again.' };
      await loadMarks();
      return d as VerifyOutcome;
    } catch { return { error: 'The check took too long or the connection dropped. Please try again.' }; }
    finally { window.clearTimeout(timer); }
  };
  const deleteMarks = async (id: string): Promise<string | null> => {
    const r = await fetch('/api/school-marks/delete', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }, body: JSON.stringify({ id }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return d.error || 'Could not delete this entry.';
    await loadMarks();
    return null;
  };

  const light = isLightMode;
  const labelCls = `text-[10px] font-black uppercase tracking-wider block font-mono mb-1 ${light ? 'text-slate-500' : 'text-slate-400'}`;
  const inputCls = `w-full border rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-cyan-500 ${light ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-100'}`;
  const tabBtn = (key: typeof tab, label: string, Icon: React.ElementType) => (
    <button key={key} onClick={() => { setTab(key); setMessage(null); }}
      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black uppercase tracking-wide cursor-pointer transition ${tab === key ? 'bg-cyan-500 text-slate-950' : (light ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800')}`}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </button>
  );
  const banner = message && (
    <div className={`text-xs font-bold rounded-lg px-3 py-2.5 border ${message.type === 'ok' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>{message.text}</div>
  );

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className={`text-2xl font-black flex items-center gap-2 ${light ? 'text-slate-900' : 'text-white'}`}><User className="w-6 h-6 text-cyan-400" /> My Profile</h1>
        <p className={`text-xs font-semibold ${light ? 'text-slate-500' : 'text-slate-400'}`}>Tell other learners about yourself, choose what to show in Settings, and track your school marks.</p>
      </div>

      <div className={`flex gap-1 p-1 rounded-xl border ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
        {tabBtn('profile', 'Profile', User)}
        {tabBtn('privacy', 'Settings', Settings)}
        {tabBtn('marks', 'School marks', GraduationCap)}
      </div>

      {upgradeNote && <div className="text-xs font-bold rounded-lg px-3 py-2.5 border text-amber-400 bg-amber-500/10 border-amber-500/20">Some new profile details (city, state, country, school, ambition, privacy choices) are being switched on and could not be saved yet. Your other details were saved. Please try again in a little while.</div>}

      {tab === 'profile' && (
        <>
          {banner}
          {!editing ? (
            <>
              <ProfileCardBody profile={myView} isLightMode={light} />
              <div className={`rounded-2xl border p-4 flex items-center justify-between gap-3 flex-wrap ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                <p className={`text-xs font-semibold ${light ? 'text-slate-600' : 'text-slate-400'}`}>This is your full profile. Other students see only what you switch on under <b>Settings</b>.</p>
                <button onClick={startEdit} className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer"><Pencil className="w-3.5 h-3.5" /> Edit profile</button>
              </div>
            </>
          ) : (
            <form onSubmit={saveProfile} className={`rounded-2xl border p-5 space-y-4 ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <div className="flex items-center gap-4">
                {photoFile ? <img src={URL.createObjectURL(photoFile)} alt="New" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40" /> : user.photoUrl ? <img src={user.photoUrl} alt="You" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40" /> : <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${light ? 'bg-slate-100 border-slate-300 text-slate-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}><User className="w-9 h-9" /></div>}
                <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider cursor-pointer ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                  <Camera className="w-3.5 h-3.5" /> Change photo
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>Full name</label><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></div>
                <div><label className={labelCls}>Class (taken automatically)</label><input className={`${inputCls} opacity-70`} value={classLabel(user.studentClass) || '--'} disabled /></div>
                <div><label className={labelCls}>Country</label><select className={inputCls} value={country} onChange={(e) => { setCountry(e.target.value); if (!statesOf(e.target.value).includes(stateName)) { setStateName(''); setCity(''); } }}><option value="">Choose your country</option>{COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>{country ? stateWord(country) : 'State'}</label><select className={inputCls} value={stateName} onChange={(e) => { setStateName(e.target.value); if (!citiesOf(country, e.target.value).includes(city)) setCity(''); }} disabled={!country}><option value="">{country ? `Choose your ${stateWord(country).toLowerCase()}` : 'Choose your country first'}</option>{statesOf(country).map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>City</label><select className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} disabled={!stateName}><option value="">{stateName ? 'Choose your city' : (country ? `Choose your ${stateWord(country).toLowerCase()} first` : 'Choose your country first')}</option>{city && !citiesOf(country, stateName).includes(city) && <option value={city}>{city}</option>}{citiesOf(country, stateName).map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>School</label><input className={inputCls} value={school} onChange={(e) => setSchool(e.target.value)} maxLength={100} placeholder="Name of your school" /></div>
                <div><label className={labelCls}>Date of birth</label><input type="date" className={inputCls} value={dob} onChange={(e) => setDob(e.target.value)} /></div>
                <div><label className={labelCls}>Favourite subject</label><input className={inputCls} value={favSubject} onChange={(e) => setFavSubject(e.target.value)} maxLength={60} placeholder="e.g. Physics" /></div>
              </div>
              <div><label className={labelCls}>About me</label><textarea className={`${inputCls} resize-none`} rows={3} maxLength={500} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A little about yourself..." /><p className="text-[10px] text-slate-500 mt-0.5">{bio.length}/500</p></div>
              <div>
                <label className={labelCls}>Interests & hobbies</label>
                <input className={inputCls} value={interests} onChange={(e) => setInterests(e.target.value)} maxLength={200} placeholder="e.g. Cricket, drawing, coding" />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {INTEREST_IDEAS.filter((i) => !interests.toLowerCase().includes(i.toLowerCase())).map((i) => (
                    <button type="button" key={i} onClick={() => setInterests((cur) => (cur.trim() ? cur.replace(/[,\s]+$/, '') + ', ' : '') + i)} className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>+ {i}</button>
                  ))}
                </div>
              </div>
              <div><label className={labelCls}>What I want to become</label><input className={inputCls} value={ambition} onChange={(e) => setAmbition(e.target.value)} maxLength={100} placeholder="e.g. Doctor, engineer, scientist" /></div>
              <div className="flex gap-2">
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50">{saving ? 'Saving...' : 'Save profile'}</button>
                <button type="button" onClick={() => { setEditing(false); setMessage(null); }} className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer ${light ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'}`}>Cancel</button>
              </div>
            </form>
          )}
        </>
      )}

      {tab === 'privacy' && (
        <>
          {banner}
          <div className={`rounded-2xl border p-5 space-y-1 ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
            <p className={`text-sm font-black ${light ? 'text-slate-900' : 'text-white'}`}>Profile settings: choose what to show and what to hide</p>
            <p className={`text-xs font-semibold pb-2 ${light ? 'text-slate-500' : 'text-slate-400'}`}>Your name is always shown. Your email, phone number and exact marks are never shown. Your teacher can see your whole profile. Changes are saved as soon as you switch them.</p>
            <div className={`divide-y ${light ? 'divide-slate-200' : 'divide-slate-800'}`}>
              {PRIVACY_ROWS.map((row) => (
                <div key={row.key} className="flex items-center gap-3 py-2.5">
                  <span className={`shrink-0 ${vis[row.key] ? 'text-emerald-400' : 'text-slate-500'}`}>{vis[row.key] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${light ? 'text-slate-800' : 'text-slate-100'}`}>{row.title}</p>
                    {row.hint && <p className={`text-[11px] font-semibold ${light ? 'text-slate-500' : 'text-slate-400'}`}>{row.hint}</p>}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider w-14 text-right ${vis[row.key] ? 'text-emerald-400' : 'text-slate-500'}`}>{vis[row.key] ? 'Shown' : 'Hidden'}</span>
                  <Toggle on={!!vis[row.key]} onChange={(v) => setVisibility(row.key, v)} label={`Show ${row.title}`} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5 ${light ? 'text-slate-500' : 'text-slate-400'}`}><Check className="w-3.5 h-3.5" /> This is how other students see you</p>
            <ProfileCardBody profile={preview} isLightMode={light} />
            {vis.schoolMarks && <p className={`text-[11px] font-semibold mt-2 ${light ? 'text-slate-500' : 'text-slate-400'}`}>Your latest percentage in each subject will also appear here once you have added marks.</p>}
          </div>
        </>
      )}

      {tab === 'marks' && (
        marksUnavailable ? (
          <div className={`rounded-2xl border p-8 text-center ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
            <p className={`text-sm font-black ${light ? 'text-slate-800' : 'text-slate-200'}`}>School Marks is being switched on</p>
            <p className={`text-xs font-semibold mt-1 ${light ? 'text-slate-500' : 'text-slate-400'}`}>Please come back in a little while.</p>
          </div>
        ) : !marksLoaded ? (
          <p className={`text-sm font-semibold text-center py-10 ${light ? 'text-slate-500' : 'text-slate-400'}`}>Loading your marks...</p>
        ) : (
          <SchoolMarksPanel entries={entries} isLightMode={light} editable onSave={saveMarks} onDelete={deleteMarks} verificationReady={verificationReady} onVerify={verifyMarks} />
        )
      )}
    </div>
  );
}
