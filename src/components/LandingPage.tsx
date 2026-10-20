import React, { useState, useEffect } from 'react';
import { Star, BookOpen, FlaskConical, MessageCircle, ClipboardCheck, Trophy, Mail, Sun, Moon, Target, Users, Gift, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { GOOGLE_LISTING, GOOGLE_REVIEWS, GoogleReview } from '../data/googleReviews';
import { RESULT_SLIDES, ResultRow } from '../data/results';

interface LandingPageProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const Stars: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <span className="inline-flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${className} fill-current`} />)}
  </span>
);

// Only marks of 90% or more are shown. "x/y" is judged against y (80 or 70 for the school-exam
// classes); a bare number is out of 100; an overall figure is already a percentage.
const percentOf = (v?: string): number | null => {
  if (!v) return null;
  const frac = v.match(/^\s*([\d.]+)\s*\/\s*([\d.]+)\s*$/);
  if (frac) return (parseFloat(frac[1]) / parseFloat(frac[2])) * 100;
  const num = parseFloat(v);
  return Number.isNaN(num) ? null : num;
};
const ninetyPlus = (rows: ResultRow[]): ResultRow[] =>
  rows
    .map((r) => ({
      ...r,
      overall: (percentOf(r.overall) ?? 0) >= 90 ? r.overall : undefined,
      maths: (percentOf(r.maths) ?? 0) >= 90 ? r.maths : undefined,
      science: (percentOf(r.science) ?? 0) >= 90 ? r.science : undefined,
    }))
    .filter((r) => r.overall || r.maths || r.science);

const ResultsCarousel: React.FC<{ light: boolean }> = ({ light }) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = RESULT_SLIDES.length;
  const slide = RESULT_SLIDES[idx];
  const heading = light ? 'text-slate-900' : 'text-white';
  const muted = light ? 'text-slate-600' : 'text-slate-400';

  useEffect(() => {
    if (paused || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % n), 12000);
    return () => clearTimeout(t);
  }, [idx, paused, n]);

  const table = (allRows: ResultRow[]) => {
    const rows = ninetyPlus(allRows);
    const hasOverall = rows.some((r) => r.overall);
    const hasMaths = rows.some((r) => r.maths);
    const hasScience = rows.some((r) => r.science);
    const head = light ? 'text-slate-500' : 'text-slate-400';
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className={`text-[10px] sm:text-[11px] uppercase tracking-wider ${head}`}>
              <th className="py-2 pr-3 font-black">Student</th>
              {hasOverall && <th className="py-2 px-2 font-black text-center">Overall</th>}
              {hasMaths && <th className="py-2 px-2 font-black text-center">Maths</th>}
              {hasScience && <th className="py-2 pl-2 font-black text-center">Science</th>}
            </tr>
          </thead>
          <tbody className={`divide-y ${light ? 'divide-slate-200' : 'divide-slate-800'}`}>
            {rows.map((r) => (
              <tr key={r.name + (r.tag || '')}>
                <td className={`py-2 pr-3 font-bold ${heading}`}>
                  {r.name}
                  {r.tag && <span className="ml-2 align-middle text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-500 border border-amber-400/30">{r.tag}</span>}
                </td>
                {hasOverall && <td className="py-2 px-2 text-center font-black text-cyan-400">{r.overall || '-'}</td>}
                {hasMaths && <td className={`py-2 px-2 text-center font-semibold ${muted}`}>{r.maths || '-'}</td>}
                {hasScience && <td className={`py-2 pl-2 text-center font-semibold ${muted}`}>{r.science || '-'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="flex gap-2 overflow-x-auto pb-3 justify-start sm:justify-center" role="tablist" aria-label="Results by year">
        {RESULT_SLIDES.map((sl, i) => (
          <button
            key={sl.id}
            role="tab"
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-black border cursor-pointer transition ${i === idx ? 'bg-cyan-500 text-slate-950 border-cyan-400' : (light ? 'bg-white border-slate-300 text-slate-600 hover:border-slate-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500')}`}
          >
            {sl.tab}
          </button>
        ))}
      </div>
      <div className="flex items-stretch gap-2 sm:gap-3">
        <button onClick={() => setIdx((idx - 1 + n) % n)} aria-label="Previous results" className={`shrink-0 self-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center cursor-pointer ${light ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'}`}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className={`flex-1 min-w-0 rounded-2xl border p-4 sm:p-6 ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`} aria-live="polite">
          <h3 className={`text-lg sm:text-xl font-black tracking-tight ${heading}`}>{slide.title}</h3>
          {slide.subtitle && <p className={`text-xs font-medium mt-0.5 ${muted}`}>{slide.subtitle}</p>}
          <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${light ? 'text-cyan-700' : 'text-cyan-400'}`}>Scores of 90% and above</p>
          <div className="mt-3">{table(slide.rows)}</div>
          {slide.extraRows && ninetyPlus(slide.extraRows).length > 0 && (
            <div className="mt-5">
              <h4 className={`text-sm font-black ${heading}`}>{slide.extraTitle}</h4>
              {table(slide.extraRows)}
            </div>
          )}
        </div>
        <button onClick={() => setIdx((idx + 1) % n)} aria-label="Next results" className={`shrink-0 self-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center cursor-pointer ${light ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'}`}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Public home page shown to anyone who is not logged in. Every figure and quote on it comes from
// src/data/googleReviews.ts (copied from the Google listing); nothing here is invented.
export const LandingPage: React.FC<LandingPageProps> = ({ isLightMode, onToggleTheme, onLogin, onRegister }) => {
  const light = isLightMode;
  const card = light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800';
  const muted = light ? 'text-slate-600' : 'text-slate-400';
  const heading = light ? 'text-slate-900' : 'text-white';

  const how = [
    { icon: Target, title: 'Concepts first', text: 'Every topic is taught so the idea stays in the mind, not just the answer. Students describe understanding that stays with them.' },
    { icon: ClipboardCheck, title: 'Regular tests', text: 'Regular tests and timely assessments show each student exactly where they are weak, so it is fixed early.' },
    { icon: MessageCircle, title: 'Doubts answered', text: 'Students can send doubts on WhatsApp and get them cleared, however small they seem.' },
    { icon: Calendar, title: 'Ready for Class 11', text: 'Extra Sunday classes on topics like the mole concept and logarithms, so the jump to Class 11 does not feel big.' },
    { icon: Gift, title: 'Rewards and trips', text: 'Students who do well are rewarded, and the class goes on a trip once a year.' },
    { icon: Users, title: 'Every student counted', text: 'Classes are for Class VIII, IX and X only, with attention to each student\'s own potential.' },
  ];

  const platform = [
    { icon: BookOpen, title: 'Detailed notes and question banks', text: 'Pointwise notes, solved NCERT questions and practice questions for Maths and Science.' },
    { icon: FlaskConical, title: 'Simulators', text: 'Interactive simulators that let students see how a concept works.' },
    { icon: ClipboardCheck, title: 'Homework with quick feedback', text: 'Students upload photos of their homework and get checked feedback with their score.' },
    { icon: Trophy, title: 'Revision papers and leaderboards', text: 'Fresh 30-mark practice papers for the chapters a student chooses, and class leaderboards.' },
  ];

  const loop = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];
  // The review under the pointer (or last tapped on a phone) opens in full above the bar.
  const [activeReview, setActiveReview] = useState<GoogleReview | null>(null);

  return (
    <div className={`min-h-screen flex flex-col font-sans ${light ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'}`}>
      <style>{`
        @keyframes cl-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cl-marquee-track { animation: cl-marquee 300s linear infinite; width: max-content; }
        .cl-marquee-wrap:hover .cl-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .cl-marquee-track { animation: none; } .cl-marquee-wrap { overflow-x: auto; } }
      `}</style>

      <header className={`sticky top-0 z-30 backdrop-blur border-b ${light ? 'bg-white/90 border-slate-200' : 'bg-[#060b14]/90 border-slate-800'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl font-extrabold">⌬</div>
          <span className={`font-black tracking-tight text-xs sm:text-base leading-tight ${heading}`}>Conceptual Learning Online</span>
          <div className="flex-1" />
          <button onClick={onToggleTheme} aria-label="Toggle light or dark mode" className={`p-2 rounded-lg cursor-pointer ${light ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800'}`}>
            {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button onClick={onLogin} className={`px-3 py-2 rounded-lg text-xs font-black cursor-pointer whitespace-nowrap ${light ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800'}`}>Log In</button>
          <button onClick={onRegister} className="px-3.5 py-2 rounded-lg text-xs font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer">Register</button>
        </div>
      </header>

      <main className="flex-1 pb-44">
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-8 sm:pt-16 text-center space-y-5">
          <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${light ? 'text-cyan-800 bg-cyan-50 border-cyan-200' : 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20'}`}>Maths and Science for Class VIII, IX and X</span>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${heading}`}>
            Not just tuition.<br className="hidden sm:block" /> A change in how students think about studies.
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed ${muted}`}>
            Taught by Rohit Sir in Gaur City, Noida, with a learning portal for notes, simulators, homework feedback and revision. We teach the concept first, so marks follow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button onClick={onRegister} className="px-6 py-3 rounded-xl text-sm font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer">Join us</button>
            <button onClick={onLogin} className={`px-6 py-3 rounded-xl text-sm font-black border cursor-pointer ${light ? 'border-slate-300 text-slate-700 hover:bg-white' : 'border-slate-700 text-slate-200 hover:bg-slate-900'}`}>Student Log In</button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-6">
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3`}>
            {[
              { big: `${GOOGLE_LISTING.rating.toFixed(1)} / 5`, small: 'Rating on Google', stars: true },
              { big: 'VIII - X', small: 'Classes taught' },
              { big: 'Maths + Science', small: 'Subjects' },
            ].map((s) => (
              <div key={s.small} className={`rounded-2xl border p-4 text-center ${card}`}>
                <p className={`text-xl sm:text-2xl font-black ${heading}`}>{s.big}</p>
                {s.stars && <div className="flex justify-center mt-1"><Stars className="w-3.5 h-3.5" /></div>}
                <p className={`text-[11px] font-bold mt-1 ${muted}`}>{s.small}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl font-black tracking-tight ${heading}`}>How we work</h2>
            <p className={`text-sm font-medium ${muted}`}>What makes our classes different.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {how.map((h) => (
              <div key={h.title} className={`rounded-2xl border p-5 space-y-2 ${card}`}>
                <h.icon className="w-6 h-6 text-cyan-400" />
                <h3 className={`text-sm font-black ${heading}`}>{h.title}</h3>
                <p className={`text-xs font-medium leading-relaxed ${muted}`}>{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl font-black tracking-tight ${heading}`}>Our results</h2>
            <p className={`text-sm font-medium ${muted}`}>Year by year. Use the arrows or the year buttons to see each batch.</p>
          </div>
          <ResultsCarousel light={light} />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl font-black tracking-tight ${heading}`}>Our learning portal</h2>
            <p className={`text-sm font-medium ${muted}`}>Everything a student needs between classes, after approval of their registration.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {platform.map((p) => (
              <div key={p.title} className={`rounded-2xl border p-5 flex gap-3 ${card}`}>
                <p.icon className="w-6 h-6 shrink-0 text-teal-400" />
                <div className="space-y-1">
                  <h3 className={`text-sm font-black ${heading}`}>{p.title}</h3>
                  <p className={`text-xs font-medium leading-relaxed ${muted}`}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className={`rounded-2xl border p-6 sm:p-8 grid sm:grid-cols-2 gap-6 ${card}`}>
            <div className="space-y-3">
              <h2 className={`text-xl font-black ${heading}`}>Want to join or know more?</h2>
              <p className={`text-xs font-medium leading-relaxed ${muted}`}>Write to us and we will get back to you.</p>
              <a href="mailto:conceptuallearning.online@gmail.com" className="inline-flex items-center gap-2 text-sm font-black text-cyan-400 hover:text-cyan-300 break-all"><Mail className="w-4 h-4 shrink-0" /> conceptuallearning.online@gmail.com</a>
            </div>
            <div className="space-y-3 sm:text-right">
              <p className={`text-sm font-black ${heading}`}>Already a student?</p>
              <div className="flex gap-3 sm:justify-end">
                <button onClick={onLogin} className="px-5 py-2.5 rounded-xl text-xs font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer">Log In</button>
                <button onClick={onRegister} className={`px-5 py-2.5 rounded-xl text-xs font-black border cursor-pointer ${light ? 'border-slate-300 text-slate-700' : 'border-slate-700 text-slate-200'}`}>Register</button>
              </div>
              <p className={`text-[10px] font-medium ${muted}`}>New registrations are approved by the teacher before access is given.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Moving bar of Google reviews, fixed to the bottom of the page. Pauses on hover/touch. */}
      <div className={`fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur ${light ? 'bg-white/95 border-slate-200' : 'bg-[#0a1020]/95 border-slate-800'}`}>
        {activeReview && (
          <div className="absolute bottom-full inset-x-0 flex justify-center px-3 pb-2 pointer-events-none">
            <div role="dialog" aria-label={`Review by ${activeReview.name}`} className={`pointer-events-auto w-full max-w-2xl max-h-[60vh] overflow-y-auto rounded-2xl border shadow-2xl p-5 space-y-2 ${light ? 'bg-white border-slate-300' : 'bg-[#0c1324] border-cyan-500/30'}`}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2"><Stars className="w-3.5 h-3.5" /><span className={`text-sm font-black ${heading}`}>{activeReview.name}</span></div>
                <span className={`text-[11px] font-medium ${muted}`}>{activeReview.when}</span>
              </div>
              <p className={`text-sm font-medium leading-relaxed ${light ? 'text-slate-800' : 'text-slate-200'}`}>"{activeReview.text}"</p>
            </div>
          </div>
        )}
        <div className="max-w-6xl mx-auto px-4 pt-2 flex items-center gap-2 flex-wrap">
          <Stars className="w-3.5 h-3.5" />
          <span className={`text-[11px] font-black ${heading}`}>{GOOGLE_LISTING.rating.toFixed(1)} on Google</span>
          <span className={`hidden sm:inline text-[11px] font-medium ${muted}`}>What our students wrote on Google, as written (copied {GOOGLE_LISTING.syncedOn}).</span>
        </div>
        <div className="cl-marquee-wrap overflow-hidden py-2" onMouseLeave={() => setActiveReview(null)}>
          <div className="cl-marquee-track flex gap-3 px-3">
            {loop.map((r, i) => (
              <figure key={`${r.name}-${i}`} aria-hidden={i >= GOOGLE_REVIEWS.length} onMouseEnter={() => setActiveReview(r)} onClick={() => setActiveReview(activeReview === r ? null : r)} className={`shrink-0 w-80 sm:w-[26rem] cursor-pointer rounded-xl border p-3 space-y-1.5 transition-colors ${activeReview === r ? (light ? 'bg-cyan-50 border-cyan-400' : 'bg-cyan-500/10 border-cyan-400') : (light ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-slate-800')}`}>
                <div className="flex items-center justify-between gap-2">
                  <figcaption className={`text-xs font-black truncate ${heading}`}>{r.name}</figcaption>
                  <span className={`text-[10px] font-medium shrink-0 ${muted}`}>{r.when}</span>
                </div>
                <blockquote className={`text-[11px] font-medium leading-snug line-clamp-4 ${muted}`} >"{r.text}"</blockquote>
                <p className={`text-[10px] font-bold ${light ? 'text-cyan-700' : 'text-cyan-400'}`}>Hover or tap to read the full review</p>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
