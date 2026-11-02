import React from 'react';
import { User, GraduationCap, Heart, Target, Cake, BookOpen } from 'lucide-react';

// The look of a student's profile -- shown to other students (only what the student chose to show) and as the
// "this is how others see you" preview on the student's own profile page.

export interface PublicProfile {
  name: string;
  photoUrl?: string | null;
  studentClass?: string;
  city?: string;
  country?: string;
  school?: string;
  bio?: string;
  interests?: string;
  favoriteSubject?: string;
  ambition?: string;
  birthday?: string;
  isTeacher?: boolean;
  view?: 'self' | 'teacher' | 'student';
  schoolProgress?: { subject: string; examName: string; academicYear: string; percentage: number; verified?: boolean }[];
}

export const classLabel = (c?: string | null) => (!c ? '' : c === 'Canadian' ? 'Canadian Board' : `Class ${c}`);

export function Avatar({ name, photoUrl, size = 80 }: { name: string; photoUrl?: string | null; size?: number }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('') || '?';
  return photoUrl ? (
    <img src={photoUrl} alt={name} style={{ width: size, height: size }} className="rounded-full object-cover border-4 border-white/90 dark:border-slate-900 shadow-lg bg-slate-200" />
  ) : (
    <div style={{ width: size, height: size, fontSize: size / 2.6 }} className="rounded-full flex items-center justify-center font-black text-slate-950 bg-gradient-to-br from-cyan-300 to-teal-400 border-4 border-white/90 dark:border-slate-900 shadow-lg">{initials}</div>
  );
}

function Row({ icon: Icon, label, children, light }: { icon: React.ElementType; label: string; children: React.ReactNode; light: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${light ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-cyan-400'}`}><Icon className="w-4 h-4" /></span>
      <div className="min-w-0">
        <p className={`text-[10px] font-black uppercase tracking-wider font-mono ${light ? 'text-slate-500' : 'text-slate-400'}`}>{label}</p>
        <p className={`text-sm font-semibold break-words whitespace-pre-wrap ${light ? 'text-slate-800' : 'text-slate-100'}`}>{children}</p>
      </div>
    </div>
  );
}

export function ProfileCardBody({ profile, isLightMode }: { profile: PublicProfile; isLightMode: boolean }) {
  const chips = [classLabel(profile.studentClass), profile.city, profile.country, profile.school].filter(Boolean) as string[];
  const hasDetails = profile.bio || profile.interests || profile.favoriteSubject || profile.ambition || profile.birthday;
  return (
    <div className={`rounded-2xl border overflow-hidden ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-slate-800'}`}>
      <div className="h-24 bg-gradient-to-r from-cyan-500/70 via-teal-500/60 to-indigo-500/60" />
      <div className="px-5 pb-5 -mt-12">
        <Avatar name={profile.name} photoUrl={profile.photoUrl} size={88} />
        <div className="mt-2">
          <h2 className={`text-xl font-black leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{profile.name}</h2>
          {profile.isTeacher && <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">Teacher</span>}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {chips.map((c) => <span key={c} className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'}`}>{c}</span>)}
            </div>
          )}
        </div>

        {hasDetails ? (
          <div className="mt-4 space-y-3.5">
            {profile.bio && <Row icon={User} label="About" light={isLightMode}>{profile.bio}</Row>}
            {profile.interests && <Row icon={Heart} label="Interests & hobbies" light={isLightMode}>{profile.interests}</Row>}
            {profile.favoriteSubject && <Row icon={BookOpen} label="Favourite subject" light={isLightMode}>{profile.favoriteSubject}</Row>}
            {profile.ambition && <Row icon={Target} label="Wants to become" light={isLightMode}>{profile.ambition}</Row>}
            {profile.birthday && <Row icon={Cake} label="Birthday" light={isLightMode}>{profile.birthday}</Row>}
          </div>
        ) : (
          <p className={`mt-4 text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{profile.view === 'student' ? 'This student has not shared more details.' : 'No details to show yet.'}</p>
        )}

        {profile.schoolProgress && profile.schoolProgress.length > 0 && (
          <div className="mt-5">
            <p className={`text-[10px] font-black uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}><GraduationCap className="w-3.5 h-3.5" /> Latest school marks</p>
            <div className="space-y-2">
              {profile.schoolProgress.map((p) => (
                <div key={p.subject}>
                  <div className="flex justify-between text-xs font-bold">
                    <span className={isLightMode ? 'text-slate-700' : 'text-slate-200'}>{p.subject} <span className="font-semibold opacity-60">({p.examName})</span>{p.verified && <span title="Checked against the school's own page" className="ml-1.5 text-[10px] font-black text-emerald-400">✓ verified</span>}</span>
                    <span className="text-cyan-400">{p.percentage}%</span>
                  </div>
                  <div className={`h-1.5 rounded-full mt-1 ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'}`}><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${Math.min(100, p.percentage)}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

