import React from 'react';

// A student's name that opens their profile card when tapped. It only announces the request; the app listens
// for it and shows the card, so leaderboards and the forum need no knowledge of how profiles work.
export function ProfileLink({ email, name, className = '' }: { email?: string | null; name: string; className?: string }) {
  if (!email) return <>{name}</>;
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-student-profile', { detail: { email } })); }}
      className={`cursor-pointer hover:underline hover:text-cyan-400 text-left ${className}`}
      title={`View ${name}'s profile`}
    >
      {name}
    </button>
  );
}
