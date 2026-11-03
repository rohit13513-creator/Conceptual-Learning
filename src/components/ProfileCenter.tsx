import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { User, Settings, GraduationCap, Eye, EyeOff, Pencil, Camera, Check, MapPin, School, Globe, Cake, Heart, Target, BookOpen, Lock, ShieldCheck, Plus, Info } from 'lucide-react';
import { ProfileCardBody, PublicProfile, Avatar, classLabel } from './ProfileCardBody';
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
  const labelCls = `text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${light ? 'text-slate-500' : 'text-slate-400'}`;
  const inputCls = `w-full border rounded-xl py-2.5 px-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 disabled:opacity-60 ${light ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-100'}`;
  const cardCls = `rounded-2xl border ${light ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'}`;
  const heading = light ? 'text-slate-900' : 'text-white';
  const muted = light ? 'text-slate-500' : 'text-slate-400';
  const body = light ? 'text-slate-700' : 'text-slate-200';
  const photoPreview = useMemo(() => (photoFile ? URL.createObjectURL(photoFile) : null), [photoFile]);
  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const place = [user.city, user.state].filter(Boolean).join(', ');
  const placeFull = [place, user.country].filter(Boolean).join(', ');
  const interestList = (user.hobbies || '').split(',').map((s) => s.trim()).filter(Boolean);

  // how complete the profile is
  const strength = [
    { done: !!user.photoUrl, label: 'Add a profile photo' },
    { done: !!(user.country && user.state && user.city), label: 'Choose your country, state and city' },
    { done: !!user.school, label: 'Add your school' },
    { done: !!user.bio, label: 'Write a few lines about yourself' },
    { done: !!user.hobbies, label: 'Add your interests' },
    { done: !!user.favoriteSubject, label: 'Add your favourite subject' },
    { done: !!user.ambition, label: 'Tell us what you want to become' },
    { done: !!user.dateOfBirth, label: 'Add your date of birth' },
  ];
  const pct = Math.round((strength.filter((s) => s.done).length / strength.length) * 100);
  const todo = strength.filter((s) => !s.done);

  const tabBtn = (key: typeof tab, label: string, Icon: React.ElementType) => (
    <button key={key} onClick={() => { setTab(key); setMessage(null); }}
      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3.5 text-[13px] sm:text-sm font-bold border-b-2 -mb-px cursor-pointer transition whitespace-nowrap ${tab === key ? 'border-cyan-400 text-cyan-400' : `border-transparent ${light ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-100'}`}`}>
      <Icon className="w-4 h-4" /> {key === 'marks' ? <><span className="sm:hidden">Marks</span><span className="hidden sm:inline">{label}</span></> : label}
    </button>
  );
  const banner = message && (
    <div className={`text-sm font-semibold rounded-xl px-4 py-3 border flex items-center gap-2 ${message.type === 'ok' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' : 'text-red-400 bg-red-500/10 border-red-500/25'}`}>{message.type === 'ok' && <Check className="w-4 h-4 shrink-0" />}{message.text}</div>
  );
  const sectionTitle = (Icon: React.ElementType, title: string, sub?: string) => (
    <div className={`flex ${sub ? "items-start" : "items-center"} gap-3 mb-4`}>
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${light ? 'bg-cyan-50 text-cyan-600' : 'bg-cyan-500/10 text-cyan-400'}`}><Icon className="w-[18px] h-[18px]" /></span>
      <div><h3 className={`text-sm font-black ${heading}`}>{title}</h3>{sub && <p className={`text-xs font-medium mt-0.5 ${muted}`}>{sub}</p>}</div>
    </div>
  );
  // one line of the "Details" card; the small eye shows whether other students can see it
  const fact = (Icon: React.ElementType, label: string, value: string | undefined | null, visKey?: string) => (
    <div className="flex items-center gap-3 py-3">
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${light ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-cyan-400'}`}><Icon className="w-4 h-4" /></span>
      <div className="min-w-0 flex-1">
        <p className={`text-[11px] font-bold uppercase tracking-wider ${muted}`}>{label}</p>
        {value ? <p className={`text-sm font-bold break-words ${heading}`}>{value}</p> : <button type="button" onClick={startEdit} className="text-sm font-semibold text-cyan-400 hover:underline cursor-pointer">+ Add</button>}
      </div>
      {visKey && value && <span title={vis[visKey] ? 'Other students can see this' : 'Hidden from other students'} className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${vis[visKey] ? 'text-emerald-400' : muted}`}>{vis[visKey] ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}<span className="hidden sm:inline">{vis[visKey] ? 'Shown' : 'Hidden'}</span></span>}
    </div>
  );
  const divider = light ? 'divide-slate-100' : 'divide-slate-800';

  const GROUPS: { title: string; sub: string; icon: React.ElementType; keys: string[] }[] = [
    { title: 'Basics', sub: 'How you appear at the top of your profile.', icon: User, keys: ['photo', 'class'] },
    { title: 'Where you live and study', sub: 'Your location and school.', icon: MapPin, keys: ['city', 'country', 'school'] },
    { title: 'About you', sub: 'What you would like others to know.', icon: Heart, keys: ['bio', 'interests', 'favoriteSubject', 'ambition'] },
    { title: 'Personal', sub: 'Shown only if you choose.', icon: Lock, keys: ['birthday', 'schoolMarks'] },
  ];

  return (
    <div className="space-y-6">
      {/* header: cover, photo, name, tabs */}
      <div className={`${cardCls} overflow-hidden`}>
        <div className="relative h-36 sm:h-48"
          style={{ backgroundImage: 'radial-gradient(circle at 18% 25%, rgba(255,255,255,.22), transparent 42%), radial-gradient(circle at 85% 0%, rgba(255,255,255,.14), transparent 38%), linear-gradient(135deg, rgb(8,145,178), rgb(79,70,229))' }}>
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="px-5 sm:px-8 pb-0">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 -mt-14 sm:-mt-16">
            <div className="shrink-0">
              <Avatar name={user.name} photoUrl={user.photoUrl} size={128} />
            </div>
            <div className="flex-1 min-w-0 sm:pt-[76px] sm:pb-2">
              <h1 className={`text-2xl sm:text-3xl font-black leading-tight ${heading}`}>{user.name}</h1>
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-sm font-semibold ${muted}`}>
                {user.studentClass && <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-cyan-400" />{classLabel(user.studentClass)}</span>}
                {placeFull && <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-400" />{placeFull}</span>}
                {user.school && <span className="inline-flex items-center gap-1.5"><School className="w-4 h-4 text-cyan-400" />{user.school}</span>}
              </div>
            </div>
            {tab === 'profile' && !editing && (
              <button onClick={startEdit} className="sm:mt-[76px] shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-300 cursor-pointer shadow-lg shadow-cyan-500/20 transition"><Pencil className="w-4 h-4" /> Edit profile</button>
            )}
          </div>
          <div className={`flex mt-5 border-b overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${light ? 'border-slate-200' : 'border-slate-800'}`}>
            {tabBtn('profile', 'Profile', User)}
            {tabBtn('marks', 'School marks', GraduationCap)}
            {tabBtn('privacy', 'Settings', Settings)}
          </div>
        </div>
      </div>

      {upgradeNote && <div className="text-sm font-semibold rounded-xl px-4 py-3 border text-amber-400 bg-amber-500/10 border-amber-500/25">Some new profile details (city, state, country, school, ambition, privacy choices) are being switched on and could not be saved yet. Your other details were saved. Please try again in a little while.</div>}

      {/* Profile tab */}
      {tab === 'profile' && (
        <>
          {banner}
          {!editing ? (
            <div className="grid lg:grid-cols-3 gap-6 items-start">
              <div className="space-y-6 lg:col-span-1">
                <div className={`${cardCls} p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-black ${heading}`}>Profile strength</h3>
                    <span className={`text-sm font-black ${pct === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>{pct}%</span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${light ? 'bg-slate-100' : 'bg-slate-800'}`}><div className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-400 to-teal-400'}`} style={{ width: `${pct}%` }} /></div>
                  {todo.length === 0 ? (
                    <p className="text-xs font-semibold text-emerald-400 mt-3 flex items-center gap-1.5"><Check className="w-4 h-4" /> Your profile is complete.</p>
                  ) : (
                    <ul className="mt-3 space-y-1.5">
                      {todo.slice(0, 4).map((t) => <li key={t.label}><button type="button" onClick={startEdit} className={`w-full text-left text-xs font-semibold flex items-center gap-2 cursor-pointer hover:text-cyan-400 ${muted}`}><Plus className="w-3.5 h-3.5 shrink-0 text-cyan-400" />{t.label}</button></li>)}
                    </ul>
                  )}
                </div>

                <div className={`${cardCls} p-5`}>
                  {sectionTitle(Info, 'Details', 'The eye shows what other students can see.')}
                  <div className={`divide-y ${divider}`}>
                    {fact(GraduationCap, 'Class', classLabel(user.studentClass), 'class')}
                    {fact(MapPin, 'City and state', place, 'city')}
                    {fact(Globe, 'Country', user.country, 'country')}
                    {fact(School, 'School', user.school, 'school')}
                    {fact(Cake, 'Birthday', formatBirthday(user.dateOfBirth), 'birthday')}
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-2">
                <div className={`${cardCls} p-6`}>
                  {sectionTitle(User, 'About me')}
                  {user.bio ? <p className={`text-[15px] leading-relaxed whitespace-pre-wrap break-words ${body}`}>{user.bio}</p> : <button type="button" onClick={startEdit} className="text-sm font-semibold text-cyan-400 hover:underline cursor-pointer">+ Write a few lines about yourself</button>}
                </div>
                <div className={`${cardCls} p-6`}>
                  {sectionTitle(Heart, 'Interests and hobbies')}
                  {interestList.length > 0 ? (
                    <div className="flex flex-wrap gap-2">{interestList.map((i) => <span key={i} className={`px-3.5 py-1.5 rounded-full text-sm font-bold border ${light ? 'bg-cyan-50 text-cyan-700 border-cyan-100' : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'}`}>{i}</span>)}</div>
                  ) : <button type="button" onClick={startEdit} className="text-sm font-semibold text-cyan-400 hover:underline cursor-pointer">+ Add your interests</button>}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className={`${cardCls} p-6`}>
                    {sectionTitle(BookOpen, 'Favourite subject')}
                    {user.favoriteSubject ? <p className={`text-lg font-black ${heading}`}>{user.favoriteSubject}</p> : <button type="button" onClick={startEdit} className="text-sm font-semibold text-cyan-400 hover:underline cursor-pointer">+ Add</button>}
                  </div>
                  <div className={`${cardCls} p-6`}>
                    {sectionTitle(Target, 'I want to become')}
                    {user.ambition ? <p className={`text-lg font-black ${heading}`}>{user.ambition}</p> : <button type="button" onClick={startEdit} className="text-sm font-semibold text-cyan-400 hover:underline cursor-pointer">+ Add</button>}
                  </div>
                </div>
                <p className={`text-xs font-semibold flex items-start gap-2 ${muted}`}><Lock className="w-4 h-4 shrink-0 mt-px" /> This is your full profile. Other students see only what you switch on under Settings. Your email, phone number and exact marks are never shown.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={saveProfile} className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6 items-start">
                <div className={`${cardCls} p-6 lg:col-span-1 text-center`}>
                  <div className="flex justify-center"><Avatar name={name || user.name} photoUrl={photoPreview || user.photoUrl} size={140} /></div>
                  <label className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
                    <Camera className="w-4 h-4" /> {photoFile ? 'Choose another' : 'Change photo'}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                  </label>
                  <p className={`text-xs font-medium mt-3 ${muted}`}>{photoFile ? `${photoFile.name} will be saved when you press Save.` : 'A clear face photo works best. JPG, PNG or WebP.'}</p>
                </div>

                <div className="space-y-6 lg:col-span-2">
                  <div className={`${cardCls} p-6`}>
                    {sectionTitle(User, 'Personal details')}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelCls}>Full name</label><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></div>
                      <div><label className={labelCls}>Class (taken automatically)</label><input className={inputCls} value={classLabel(user.studentClass) || '--'} disabled /></div>
                      <div><label className={labelCls}>Date of birth</label><input type="date" className={inputCls} value={dob} onChange={(e) => setDob(e.target.value)} /></div>
                      <div><label className={labelCls}>Favourite subject</label><input className={inputCls} value={favSubject} onChange={(e) => setFavSubject(e.target.value)} maxLength={60} placeholder="e.g. Physics" /></div>
                    </div>
                  </div>

                  <div className={`${cardCls} p-6`}>
                    {sectionTitle(MapPin, 'Where you live and study', 'Choose from the lists: first the country, then the state, then the city.')}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className={labelCls}>Country</label><select className={inputCls} value={country} onChange={(e) => { setCountry(e.target.value); if (!statesOf(e.target.value).includes(stateName)) { setStateName(''); setCity(''); } }}><option value="">Choose your country</option>{COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                      <div><label className={labelCls}>{country ? stateWord(country) : 'State'}</label><select className={inputCls} value={stateName} onChange={(e) => { setStateName(e.target.value); if (!citiesOf(country, e.target.value).includes(city)) setCity(''); }} disabled={!country}><option value="">{country ? `Choose your ${stateWord(country).toLowerCase()}` : 'Choose your country first'}</option>{statesOf(country).map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                      <div><label className={labelCls}>City</label><select className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} disabled={!stateName}><option value="">{stateName ? 'Choose your city' : (country ? `Choose your ${stateWord(country).toLowerCase()} first` : 'Choose your country first')}</option>{city && !citiesOf(country, stateName).includes(city) && <option value={city}>{city}</option>}{citiesOf(country, stateName).map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                      <div><label className={labelCls}>School</label><input className={inputCls} value={school} onChange={(e) => setSchool(e.target.value)} maxLength={100} placeholder="Name of your school" /></div>
                    </div>
                  </div>

                  <div className={`${cardCls} p-6`}>
                    {sectionTitle(Heart, 'About you')}
                    <div className="space-y-4">
                      <div><label className={labelCls}>About me</label><textarea className={`${inputCls} resize-none`} rows={4} maxLength={500} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A little about yourself..." /><p className={`text-[11px] font-medium mt-1 text-right ${muted}`}>{bio.length}/500</p></div>
                      <div>
                        <label className={labelCls}>Interests and hobbies</label>
                        <input className={inputCls} value={interests} onChange={(e) => setInterests(e.target.value)} maxLength={200} placeholder="e.g. Cricket, drawing, coding" />
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {INTEREST_IDEAS.filter((i) => !interests.toLowerCase().includes(i.toLowerCase())).map((i) => (
                            <button type="button" key={i} onClick={() => setInterests((cur) => (cur.trim() ? cur.replace(/[,\s]+$/, '') + ', ' : '') + i)} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${light ? 'bg-slate-100 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700' : 'bg-slate-800 text-slate-300 hover:bg-cyan-500/15 hover:text-cyan-300'}`}>+ {i}</button>
                          ))}
                        </div>
                      </div>
                      <div><label className={labelCls}>What I want to become</label><input className={inputCls} value={ambition} onChange={(e) => setAmbition(e.target.value)} maxLength={100} placeholder="e.g. Doctor, engineer, scientist" /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`sticky bottom-3 z-10 rounded-2xl border p-3 sm:p-4 flex items-center justify-end gap-3 backdrop-blur ${light ? 'bg-white/90 border-slate-200 shadow-lg' : 'bg-slate-900/90 border-slate-700 shadow-2xl shadow-black/40'}`}>
                <button type="button" onClick={() => { setEditing(false); setMessage(null); }} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Cancel</button>
                <button type="submit" disabled={saving} className="px-7 py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-300 cursor-pointer transition disabled:opacity-50">{saving ? 'Saving...' : 'Save profile'}</button>
              </div>
            </form>
          )}
        </>
      )}

      {/* Settings tab */}
      {tab === 'privacy' && (
        <>
          {banner}
          <div className="grid lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className={`${cardCls} p-5 flex items-start gap-3`}>
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className={`text-sm font-medium ${body}`}><b className={heading}>You decide what others see.</b> Your name is always shown. Your email, phone number and exact marks are never shown. Your teacher can see your whole profile. Each switch is saved as soon as you press it.</p>
              </div>
              {GROUPS.map((g) => (
                <div key={g.title} className={`${cardCls} p-6`}>
                  {sectionTitle(g.icon, g.title, g.sub)}
                  <div className={`divide-y ${divider}`}>
                    {g.keys.map((k) => PRIVACY_ROWS.find((r) => r.key === k)!).map((row) => (
                      <div key={row.key} className="flex items-center gap-3 py-3.5">
                        <span className={`shrink-0 ${vis[row.key] ? 'text-emerald-400' : muted}`}>{vis[row.key] ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${heading}`}>{row.title}</p>
                          {row.hint && <p className={`text-xs font-medium ${muted}`}>{row.hint}</p>}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider w-14 text-right ${vis[row.key] ? 'text-emerald-400' : muted}`}>{vis[row.key] ? 'Shown' : 'Hidden'}</span>
                        <Toggle on={!!vis[row.key]} onChange={(v) => setVisibility(row.key, v)} label={`Show ${row.title}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2 lg:sticky lg:top-4 space-y-3">
              <p className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${muted}`}><Eye className="w-4 h-4" /> This is how other students see you</p>
              <ProfileCardBody profile={preview} isLightMode={light} />
              {vis.schoolMarks && <p className={`text-xs font-medium ${muted}`}>Your latest percentage in each subject will also appear here once you have added marks.</p>}
            </div>
          </div>
        </>
      )}

      {/* School marks tab */}
      {tab === 'marks' && (
        marksUnavailable ? (
          <div className={`${cardCls} p-10 text-center`}>
            <p className={`text-base font-black ${heading}`}>School Marks is being switched on</p>
            <p className={`text-sm font-medium mt-1 ${muted}`}>Please come back in a little while.</p>
          </div>
        ) : !marksLoaded ? (
          <p className={`text-sm font-semibold text-center py-12 ${muted}`}>Loading your marks...</p>
        ) : (
          <SchoolMarksPanel entries={entries} isLightMode={light} editable onSave={saveMarks} onDelete={deleteMarks} verificationReady={verificationReady} onVerify={verifyMarks} />
        )
      )}
    </div>
  );
}
