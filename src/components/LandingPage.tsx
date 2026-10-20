import React, { useState, useEffect } from 'react';
import { Star, BookOpen, FlaskConical, MessageCircle, ClipboardCheck, Trophy, Mail, Sun, Moon, Target, Users, Gift, Calendar, ChevronLeft, ChevronRight, Sparkles, Laptop, School, CheckCircle2 } from 'lucide-react';
import { GOOGLE_LISTING, GOOGLE_REVIEWS, GoogleReview } from '../data/googleReviews';
import { SCORE_CARDS } from '../data/results';

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

const SubjectShowcase: React.FC<{ light: boolean; subject: 'Maths' | 'Science'; intervalMs: number }> = ({ light, subject, intervalMs }) => {
  // Newest year first, highest mark first within a year (stable for equal marks).
  const cards = SCORE_CARDS
    .filter((c) => c.subject === subject)
    .map((c, i) => ({ c, i }))
    .sort((a, b) => b.c.year.localeCompare(a.c.year) || b.c.percent - a.c.percent || a.i - b.i)
    .map((x) => x.c);
  const n = cards.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const card = cards[idx];
  const heading = light ? 'text-slate-900' : 'text-white';
  const muted = light ? 'text-slate-600' : 'text-slate-400';
  const years = Array.from(new Set(cards.map((c) => c.year)));

  useEffect(() => {
    if (paused || n < 2 || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % n), intervalMs);
    return () => clearTimeout(t);
  }, [idx, paused, n, intervalMs]);

  if (!card) return null;
  const arrow = `shrink-0 w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer ${light ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'}`;

  return (
    <div className={`rounded-2xl border p-3 sm:p-4 ${light ? 'bg-white border-slate-200' : 'bg-slate-900/50 border-slate-800'}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <h3 className={`text-center text-sm font-black uppercase tracking-widest ${subject === 'Maths' ? 'text-cyan-400' : 'text-teal-400'}`}>{subject} toppers</h3>
      <div className="flex gap-1.5 overflow-x-auto py-2 justify-start sm:justify-center" role="tablist" aria-label={`${subject}: jump to a year`}>
        {years.map((y) => (
          <button
            key={y}
            role="tab"
            aria-selected={card.year === y}
            onClick={() => setIdx(cards.findIndex((c) => c.year === y))}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-black border cursor-pointer transition ${card.year === y ? 'bg-cyan-500 text-slate-950 border-cyan-400' : (light ? 'bg-white border-slate-300 text-slate-600 hover:border-slate-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500')}`}
          >
            {y}
          </button>
        ))}
      </div>
      <div key={card.key} aria-live="polite" className="px-3 pt-6 pb-4 text-center space-y-2 min-h-[210px] flex flex-col items-center justify-center">
        <p className={`text-[11px] font-black uppercase tracking-widest ${light ? 'text-cyan-700' : 'text-cyan-300'}`}>{card.exam} &middot; {card.year}</p>
        <h4 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>{card.name}</h4>
        <p className="text-5xl sm:text-6xl font-black text-cyan-400 leading-none py-1">{card.marks}</p>
        {card.achievement && (
          <p className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-500 border border-amber-400/30">
            <Trophy className="w-3.5 h-3.5" /> {card.achievement}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 pb-1">
        <button onClick={() => setIdx((idx - 1 + n) % n)} aria-label={`Previous ${subject} result`} className={arrow}><ChevronLeft className="w-4 h-4" /></button>
        <button onClick={() => setIdx((idx + 1) % n)} aria-label={`Next ${subject} result`} className={arrow}><ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

// Public home page shown to anyone who is not logged in. Every figure and quote on it comes from
// src/data/googleReviews.ts (copied from the Google listing); nothing here is invented.
export const LandingPage: React.FC<LandingPageProps> = ({ isLightMode, onToggleTheme, onLogin, onRegister }) => {
  const light = isLightMode;
  const card = light ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800';
  const muted = light ? 'text-slate-600' : 'text-slate-400';
  const heading = light ? 'text-slate-900' : 'text-white';
  const lift = 'transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/40';

  const how = [
    { icon: Target, title: 'Concepts first', text: 'Every topic is taught so the idea stays in the mind, not just the answer.' },
    { icon: ClipboardCheck, title: 'Regular tests', text: 'Regular tests and timely assessments show each student where they are weak, so it is fixed early.' },
    { icon: MessageCircle, title: 'Doubts answered', text: 'Students send their doubts and get them cleared, however small they seem.' },
    { icon: Calendar, title: 'Ready for Class 11', text: 'Extra sessions on topics like the mole concept and logarithms, so the jump to Class 11 does not feel big.' },
    { icon: Gift, title: 'Rewards and trips', text: 'Students who do well are rewarded, and the batch goes on a trip once a year.' },
    { icon: Users, title: 'Every student counted', text: 'Focused on Class VIII, IX and X, with attention to each student\'s own potential.' },
  ];

  const platform = [
    { icon: BookOpen, title: 'Notes and question banks', text: 'Pointwise notes, solved NCERT questions and practice questions for Maths and Science.' },
    { icon: FlaskConical, title: 'Interactive simulators', text: 'See how a concept works instead of only reading about it.' },
    { icon: ClipboardCheck, title: 'Homework with quick feedback', text: 'Upload photos of your homework and get checked feedback with your score.' },
    { icon: Trophy, title: 'Revision papers and leaderboards', text: 'Fresh 30-mark practice papers for the chapters you choose, and class leaderboards.' },
  ];

  const steps = [
    { n: '1', title: 'Register', text: 'Create your account with your class and contact details.' },
    { n: '2', title: 'Get approved', text: 'Your registration is checked and approved before access is given.' },
    { n: '3', title: 'Start learning', text: 'Open your notes, simulators and homework, and begin.' },
  ];

  // Testimonials that name a place are left out of the bar, because the coaching is no longer tied to one location.
  const reviewsForBar = GOOGLE_REVIEWS.filter((r) => !/gaur|exotica|dreamville|noida|locality/i.test(r.text));
  const loop = [...reviewsForBar, ...reviewsForBar];
  const [activeReview, setActiveReview] = useState<GoogleReview | null>(null);

  const navLink = `hidden md:inline text-xs font-bold cursor-pointer ${light ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`;
  const iconBubble = 'w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/20';

  return (
    <div className={`relative min-h-screen flex flex-col font-sans overflow-x-hidden ${light ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'}`}>
      <style>{`
        @keyframes cl-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes cl-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .cl-marquee-track { animation: cl-marquee 300s linear infinite; width: max-content; }
        .cl-marquee-wrap:hover .cl-marquee-track { animation-play-state: paused; }
        .cl-float { animation: cl-float 6s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { .cl-marquee-track, .cl-float { animation: none; } .cl-marquee-wrap { overflow-x: auto; } html { scroll-behavior: auto; } }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[480px] rounded-full blur-3xl ${light ? 'bg-cyan-300/30' : 'bg-cyan-500/15'}`} />
        <div className={`absolute top-40 -right-24 w-[420px] h-[420px] rounded-full blur-3xl ${light ? 'bg-teal-300/30' : 'bg-teal-500/10'}`} />
        <div className={`absolute top-56 -left-28 w-[360px] h-[360px] rounded-full blur-3xl ${light ? 'bg-indigo-300/20' : 'bg-indigo-500/10'}`} />
      </div>

      <header className={`sticky top-0 z-30 backdrop-blur-md border-b ${light ? 'bg-white/80 border-slate-200' : 'bg-[#060b14]/80 border-slate-800'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center text-slate-950 text-xl font-extrabold shadow-md shadow-cyan-500/20">⌬</div>
          <span className={`font-black tracking-tight text-xs sm:text-base leading-tight ${heading}`}>Conceptual Learning Online</span>
          <div className="flex-1" />
          <a href="#how" className={navLink}>How we work</a>
          <a href="#results" className={navLink}>Results</a>
          <a href="#portal" className={navLink}>Portal</a>
          <a href="#join" className={navLink}>Join</a>
          <button onClick={onToggleTheme} aria-label="Toggle light or dark mode" className={`p-2 rounded-lg cursor-pointer ${light ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800'}`}>
            {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button onClick={onLogin} className={`px-3 py-2 rounded-lg text-xs font-black cursor-pointer whitespace-nowrap ${light ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800'}`}>Log In</button>
          <button onClick={onRegister} className="px-3.5 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 cursor-pointer shadow-md shadow-cyan-500/20">Register</button>
        </div>
      </header>

      <main className="relative flex-1 pb-44">
        <section className="max-w-6xl mx-auto px-4 pt-14 pb-10 sm:pt-20 text-center space-y-6">
          <span className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${light ? 'text-cyan-800 bg-cyan-50 border-cyan-200' : 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20'}`}>
            <Sparkles className="w-3.5 h-3.5" /> Online and offline coaching &middot; Class VIII to X
          </span>
          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] ${heading}`}>
            Learn the concept.<br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">The marks follow.</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-lg font-medium leading-relaxed ${muted}`}>
            Maths and Science coaching for Class VIII, IX and X, in the classroom and online. Clear concepts, regular practice and quick feedback, from wherever you study.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button onClick={onRegister} className="px-7 py-3.5 rounded-xl text-sm font-black bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 cursor-pointer shadow-lg shadow-cyan-500/25">Join us</button>
            <button onClick={onLogin} className={`px-7 py-3.5 rounded-xl text-sm font-black border cursor-pointer backdrop-blur ${light ? 'border-slate-300 text-slate-700 bg-white/70 hover:bg-white' : 'border-slate-700 text-slate-200 bg-slate-900/40 hover:bg-slate-900'}`}>Student Log In</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
            {[
              { big: `${GOOGLE_LISTING.rating.toFixed(1)} / 5`, small: 'Rating on Google', stars: true },
              { big: 'Online + Offline', small: 'Learn your way' },
              { big: 'VIII - X', small: 'Classes' },
              { big: 'Maths + Science', small: 'Subjects' },
            ].map((s) => (
              <div key={s.small} className={`rounded-2xl border p-3.5 text-center backdrop-blur ${card}`}>
                <p className={`text-base sm:text-lg font-black ${heading}`}>{s.big}</p>
                {s.stars && <div className="flex justify-center mt-0.5"><Stars className="w-3 h-3" /></div>}
                <p className={`text-[11px] font-bold mt-0.5 ${muted}`}>{s.small}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>Learn your way</h2>
            <p className={`text-sm font-medium ${muted}`}>The same concept-first teaching, wherever you are.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${card} ${lift}`}>
              <div className={iconBubble}><Laptop className="w-5 h-5 text-slate-950" /></div>
              <h3 className={`text-lg font-black ${heading}`}>Online</h3>
              <p className={`text-sm font-medium leading-relaxed ${muted}`}>Study from anywhere with our learning portal: detailed notes, interactive simulators, practice papers, and homework you upload and get checked.</p>
              <ul className={`text-xs font-semibold space-y-1.5 ${muted}`}>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" /> Available any time, on phone or computer</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" /> Quick feedback on every homework</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" /> Revision papers for the chapters you choose</li>
              </ul>
            </div>
            <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${card} ${lift}`}>
              <div className={iconBubble}><School className="w-5 h-5 text-slate-950" /></div>
              <h3 className={`text-lg font-black ${heading}`}>In the classroom</h3>
              <p className={`text-sm font-medium leading-relaxed ${muted}`}>Regular classes with personal attention, regular tests, and doubt support, backed by the same portal for practice between classes.</p>
              <ul className={`text-xs font-semibold space-y-1.5 ${muted}`}>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" /> Personal focus on each student's progress</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" /> Regular tests and timely assessments</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" /> Extra sessions to prepare for Class 11</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>How we work</h2>
            <p className={`text-sm font-medium ${muted}`}>What makes our coaching different.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {how.map((h) => (
              <div key={h.title} className={`rounded-2xl border p-5 space-y-3 ${card} ${lift}`}>
                <div className={iconBubble}><h.icon className="w-5 h-5 text-slate-950" /></div>
                <h3 className={`text-sm font-black ${heading}`}>{h.title}</h3>
                <p className={`text-xs font-medium leading-relaxed ${muted}`}>{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>Our results</h2>
            <p className={`text-sm font-medium ${muted}`}>Many students, many stories.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <SubjectShowcase light={light} subject="Maths" intervalMs={5000} />
            <SubjectShowcase light={light} subject="Science" intervalMs={6000} />
          </div>
        </section>

        <section id="portal" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>Our learning portal</h2>
            <p className={`text-sm font-medium ${muted}`}>Everything a student needs between classes.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {platform.map((p) => (
              <div key={p.title} className={`rounded-2xl border p-5 flex gap-4 ${card} ${lift}`}>
                <div className={`${iconBubble} shrink-0`}><p.icon className="w-5 h-5 text-slate-950" /></div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-black ${heading}`}>{p.title}</h3>
                  <p className={`text-xs font-medium leading-relaxed ${muted}`}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="join" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${heading}`}>Start in three steps</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {steps.map((st) => (
              <div key={st.n} className={`rounded-2xl border p-5 text-center space-y-2 ${card}`}>
                <div className="mx-auto w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 text-slate-950 font-black flex items-center justify-center">{st.n}</div>
                <h3 className={`text-sm font-black ${heading}`}>{st.title}</h3>
                <p className={`text-xs font-medium leading-relaxed ${muted}`}>{st.text}</p>
              </div>
            ))}
          </div>

          <div className={`relative overflow-hidden rounded-3xl border p-7 sm:p-10 text-center space-y-4 ${light ? 'bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200' : 'bg-gradient-to-br from-cyan-500/10 via-slate-900/60 to-teal-500/10 border-cyan-500/20'}`}>
            <h2 className={`text-xl sm:text-2xl font-black ${heading}`}>Ready to begin, or have a question?</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={onRegister} className="px-6 py-3 rounded-xl text-sm font-black bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 cursor-pointer shadow-lg shadow-cyan-500/25">Register now</button>
              <button onClick={onLogin} className={`px-6 py-3 rounded-xl text-sm font-black border cursor-pointer ${light ? 'border-slate-300 text-slate-700 bg-white' : 'border-slate-700 text-slate-200 bg-slate-900/50'}`}>Already a student? Log In</button>
            </div>
            <p className={`text-xs font-medium ${muted}`}>New registrations are approved before access is given.</p>
            <a href="mailto:conceptuallearning.online@gmail.com" className="inline-flex items-center gap-2 text-sm font-black text-cyan-400 hover:text-cyan-300 break-all"><Mail className="w-4 h-4 shrink-0" /> conceptuallearning.online@gmail.com</a>
          </div>
        </section>

        <footer className={`max-w-6xl mx-auto px-4 pt-4 pb-6 text-center text-[11px] font-medium ${muted}`}>
          &copy; {new Date().getFullYear()} Conceptual Learning Online
        </footer>
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
          <span className={`hidden sm:inline text-[11px] font-medium ${muted}`}>What our students wrote on Google, as written.</span>
        </div>
        <div className="cl-marquee-wrap overflow-hidden py-2" onMouseLeave={() => setActiveReview(null)}>
          <div className="cl-marquee-track flex gap-3 px-3">
            {loop.map((r, i) => (
              <figure key={`${r.name}-${i}`} aria-hidden={i >= reviewsForBar.length} onMouseEnter={() => setActiveReview(r)} onClick={() => setActiveReview(activeReview === r ? null : r)} className={`shrink-0 w-80 sm:w-[26rem] cursor-pointer rounded-xl border p-3 space-y-1.5 transition-colors ${activeReview === r ? (light ? 'bg-cyan-50 border-cyan-400' : 'bg-cyan-500/10 border-cyan-400') : (light ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-slate-800')}`}>
                <div className="flex items-center justify-between gap-2">
                  <figcaption className={`text-xs font-black truncate ${heading}`}>{r.name}</figcaption>
                  <span className={`text-[10px] font-medium shrink-0 ${muted}`}>{r.when}</span>
                </div>
                <blockquote className={`text-[11px] font-medium leading-snug line-clamp-4 ${muted}`}>"{r.text}"</blockquote>
                <p className={`text-[10px] font-bold ${light ? 'text-cyan-700' : 'text-cyan-400'}`}>Read more</p>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
