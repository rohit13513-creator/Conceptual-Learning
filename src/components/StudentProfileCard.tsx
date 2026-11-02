import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ProfileCardBody, PublicProfile } from './ProfileCardBody';

// Pop-up profile of another student, opened by tapping a name in the leaderboards or the Learners Adda forum.
// Shows only what that student has chosen to share.
export default function StudentProfileCard({ email, token, isLightMode, onClose }: { email: string; token: string; isLightMode: boolean; onClose: () => void }) {
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setProfile(null); setError(null);
    fetch(`/api/profile/view?email=${encodeURIComponent(email)}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => { const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || 'This profile is not available.'); return d.profile as PublicProfile; })
      .then((p) => { if (!cancelled) setProfile(p); })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [email, token]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"><X className="w-4 h-4" /></button>
        {profile ? <ProfileCardBody profile={profile} isLightMode={isLightMode} /> : (
          <div className={`rounded-2xl border p-10 text-center text-sm font-semibold ${isLightMode ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>{error || 'Loading profile...'}</div>
        )}
      </div>
    </div>
  );
}
