import React, { useEffect, useState } from "react";

// Diwali decoration for the home page (Diwali 2026 is on 8 November). It appears from the moment it was switched on and
// removes itself at the same time the next day (India time), so nothing has to be undone by hand.
// To change the days, change the two times below.
export const DIWALI_FROM = Date.parse("2026-11-08T00:00:00+05:30");
export const DIWALI_UNTIL = Date.parse("2026-11-09T18:57:00+05:30");

export const isDiwaliTime = (t: number = Date.now()) => t >= DIWALI_FROM && t < DIWALI_UNTIL;

// true while the decoration should show; checked again every 30 seconds, so a page left open also goes back to normal on time
export function useDiwali(): boolean {
  const [on, setOn] = useState(() => isDiwaliTime());
  useEffect(() => {
    const tick = () => setOn(isDiwaliTime());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return on;
}

const BULBS = ["#f59e0b", "#ef4444", "#22c55e", "#38bdf8", "#f472b6", "#fde047", "#fb923c"];

/** A string of twinkling lights hung along the top of a card. The parent must be position: relative. */
export const DiwaliLights: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div aria-hidden className={`cl-diwali-lights ${className}`}>
    <svg className="cl-diwali-wire" viewBox="0 0 100 6" preserveAspectRatio="none"><path d="M0 1 Q 12.5 5.5 25 1 T 50 1 T 75 1 T 100 1" fill="none" stroke="rgba(120,53,15,0.85)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" /></svg>
    <div className="cl-diwali-bulbs">
      {Array.from({ length: 26 }).map((_, i) => {
        const c = BULBS[i % BULBS.length];
        return <span key={i} className={`cl-twinkle ${i % 2 ? "hidden sm:block" : ""}`} style={{ background: c, boxShadow: `0 0 10px 3px ${c}99`, animationDelay: `${(i % 7) * 0.31}s`, marginTop: i % 2 ? 6 : 0 }} />;
      })}
    </div>
  </div>
);

/** A clay lamp (diya) with a flickering flame. */
export const Diya: React.FC<{ size?: number; className?: string }> = ({ size = 56, className = "" }) => (
  <svg aria-hidden viewBox="0 0 64 56" width={size} height={(size * 56) / 64} className={className}>
    <circle cx="32" cy="20" r="16" fill="rgba(251,191,36,0.22)" className="cl-flame-glow" />
    <g className="cl-flicker" style={{ transformOrigin: "32px 28px" }}>
      <path d="M32 5 C 39 14, 41 21, 32 29 C 23 21, 25 14, 32 5 Z" fill="#fbbf24" />
      <path d="M32 14 C 35.5 19, 35.5 23.5, 32 27 C 28.5 23.5, 28.5 19, 32 14 Z" fill="#fff7ed" />
    </g>
    <path d="M5 33 C 9 51, 55 51, 59 33 Z" fill="#c2410c" />
    <path d="M12 38 C 18 47, 46 47, 52 38" fill="none" stroke="#fbbf24" strokeWidth="1.6" strokeDasharray="1.5 3.2" strokeLinecap="round" />
    <ellipse cx="32" cy="33" rx="28" ry="5" fill="#f59e0b" />
    <ellipse cx="32" cy="33" rx="22" ry="3" fill="#7c2d12" />
    <rect x="25" y="48" width="14" height="4" rx="2" fill="#9a3412" />
  </svg>
);

const Stars: React.FC = () => (
  <>
    {[["8%", "18%", 0], ["22%", "72%", 0.6], ["46%", "12%", 1.1], ["68%", "78%", 0.3], ["84%", "20%", 0.9], ["93%", "62%", 1.4]].map(([l, t, d], i) => (
      <span key={i} aria-hidden className="cl-twinkle absolute text-amber-200 text-[11px] leading-none" style={{ left: l as string, top: t as string, animationDelay: `${d}s` }}>✦</span>
    ))}
  </>
);

/** The greeting card shown under the welcome banner. Colours are fixed so it reads well in both the light and the dark theme. */
export const DiwaliBanner: React.FC = () => (
  <section className="cl-diwali-banner relative overflow-hidden rounded-3xl px-5 py-6 sm:px-9 sm:py-7 text-center cl-view-in">
    <div aria-hidden className="cl-rangoli left-[-70px] top-[-70px]" />
    <div aria-hidden className="cl-rangoli right-[-70px] bottom-[-70px]" />
    <Stars />
    <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-8">
      <Diya size={64} className="hidden sm:block" />
      <div className="space-y-1.5">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-200">Festival of Lights</p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white" style={{ textShadow: "0 0 22px rgba(251,191,36,0.55)" }}>शुभ दीपावली</h2>
        <p className="text-base sm:text-lg font-black text-amber-100">Happy Diwali!</p>
        <p className="text-[13px] sm:text-sm font-semibold text-orange-50/90 max-w-xl mx-auto leading-relaxed">
          May the festival of lights fill your home with joy and your year with success. With best wishes from Conceptual Learning.
        </p>
      </div>
      <Diya size={64} className="hidden sm:block" />
    </div>
  </section>
);

/** A slim festive band for the first page (before log-in). */
export const DiwaliStrip: React.FC = () => {
  const on = useDiwali();
  if (!on) return null;
  return (
    <div className="cl-diwali-strip relative overflow-hidden text-center px-4 py-2.5">
      <DiwaliLights className="cl-diwali-lights-strip" />
      <p className="relative z-10 pt-3 text-[12px] sm:text-sm font-black tracking-wide text-amber-100 flex items-center justify-center gap-2">
        <Diya size={26} /> <span>शुभ दीपावली &middot; Happy Diwali<span className="hidden sm:inline"> from Conceptual Learning</span></span> <Diya size={26} className="hidden sm:block" />
      </p>
    </div>
  );
};
