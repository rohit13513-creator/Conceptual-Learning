import React from 'react';
import {
  Target,
  Sparkles,
  Lightbulb,
  PenLine,
  MessageCircleQuestion,
  Trophy,
  Medal,
  BadgeCheck,
  TrendingUp,
  Rocket,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from './Reveal';

// About Us: used both inside the student app and on the public home page.
// Styling comes from the shared premium layer in index.css (.cl-card, .cl-eyebrow, ...), which
// switches between dark and light by itself.

const STATS = [
  { value: '98.6%', label: 'Highest overall score', note: 'achieved by our student pool', accent: 'from-cyan-400 to-sky-500' },
  { value: '99/100', label: 'Subject perfection', note: 'peaking at 99 in Science and Maths', accent: 'from-amber-300 to-orange-400' },
  { value: '8+', label: '95% club', note: 'students crossed 95% overall', accent: 'from-emerald-400 to-teal-400' },
  { value: '12+', label: '90% super achievers', note: 'students crossed the 90% mark', accent: 'from-violet-400 to-fuchsia-400' },
];

const WAYS = [
  { icon: Lightbulb, title: 'Concept first', text: 'Every topic starts from the basics and the reason behind it, so the idea stays in the mind and not just the answer.' },
  { icon: PenLine, title: 'Try, then correct', text: 'Students attempt the questions, find where they go wrong, and set it right together with their teacher.' },
  { icon: MessageCircleQuestion, title: 'No doubt is too small', text: 'Every doubt is welcome. Maths and Science are not only for the bright ones, every student can be good at them.' },
];

const CLASSES = [
  { roman: 'VIII', name: 'Class VIII', tag: 'Foundation of Concepts', ring: 'from-cyan-400 to-sky-500' },
  { roman: 'IX', name: 'Class IX', tag: 'Foundation for Competitions', ring: 'from-violet-400 to-indigo-500' },
  { roman: 'X', name: 'Class X', tag: 'Board Excellence', ring: 'from-emerald-400 to-teal-500' },
];

const HIGHLIGHTS = [
  { icon: Rocket, tone: 'text-cyan-400', title: 'The Ultimate Heights', text: <>Our student pool achieved a highest overall score of <b>98.6%</b>.</> },
  { icon: Trophy, tone: 'text-amber-400', title: 'Near-Perfect Subject Scores', text: <>In individual core subjects, our students reached <b>99/100</b> in Science and <b>99/100</b> in Mathematics.</> },
  { icon: Medal, tone: 'text-emerald-400', title: 'The 95%+ Elite Club', text: <>Over <b>8 students</b> crossed the 95% overall aggregate, showing steady excellence across the board.</> },
  { icon: BadgeCheck, tone: 'text-violet-400', title: 'The 90% Super Achievers', text: <><b>12+ students</b> went past the 90% overall mark, which shows that the method works for everyone, not only a few.</> },
  { icon: TrendingUp, tone: 'text-rose-400', title: 'Subject Mastery', text: <>A large majority of our students consistently score <b>90+ marks out of 100</b> in Mathematics and Science.</> },
];

function Leader({ initials, name, role, accent, paragraphs, footer }: { initials: string; name: string; role: string; accent: string; paragraphs: string[]; footer: string }) {
  return (
    <div className="cl-card cl-card-hover p-6 sm:p-7 flex flex-col h-full relative overflow-hidden">
      <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-2xl pointer-events-none`} />
      <Quote className="absolute top-5 right-5 w-8 h-8 opacity-10" />
      <div className="flex items-center gap-4 relative">
        <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} p-[2px] shadow-lg`}>
          <div className="w-full h-full rounded-[0.9rem] flex items-center justify-center font-black text-lg tracking-wide cl-heading" style={{ background: 'var(--cl-bg)' }}>
            {initials}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-black cl-heading leading-tight">{name}</h3>
          <span className="cl-eyebrow mt-1.5" style={{ fontSize: '.6rem' }}>{role}</span>
        </div>
      </div>
      <div className="mt-5 space-y-3 flex-1 relative">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed font-medium cl-page">{p}</p>
        ))}
      </div>
      <div className="mt-5 pt-4 flex items-center justify-between relative" style={{ borderTop: '1px solid var(--cl-border)' }}>
        <span className="text-[11px] font-black uppercase tracking-[0.18em] cl-muted">{footer}</span>
        <Sparkles className="w-4 h-4 text-cyan-400" />
      </div>
    </div>
  );
}

export function AboutUs({ isLightMode = false }: { isLightMode?: boolean }) {
  void isLightMode;
  return (
    <div className="space-y-16 font-sans cl-page" id="about-us-container">

      {/* ── HERO ── */}
      <Reveal>
        <section className="cl-card cl-aurora relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16 text-center">
          <div className="cl-grid-bg absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="cl-eyebrow"><Sparkles className="w-3.5 h-3.5" /> Our academic philosophy</span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] cl-heading">
              The power of <span className="cl-gradient-text cl-shine-text">Conceptual Learning</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed font-medium cl-page max-w-2xl mx-auto">
              A place where education goes beyond memorising, and grows true, deep-rooted understanding.
            </p>
            <div className="cl-card text-left p-5 sm:p-6 mt-2" style={{ background: 'var(--cl-surface-flat)' }}>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-400">
                <Target className="w-4 h-4" /> Our mission
              </div>
              <p className="mt-2 text-sm sm:text-base leading-relaxed font-semibold cl-heading">
                To change the way students learn, from "memorising for exams" to "understanding for life." We believe that once a concept is crystal clear, good grades and success follow on their own.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── NUMBERS ── */}
      <section className="space-y-6">
        <Reveal>
          <div className="text-center space-y-2">
            <span className="cl-eyebrow">Proven results</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight cl-heading">Concepts that turn into <span className="cl-gradient-text">marks</span></h2>
            <p className="text-sm font-medium cl-muted max-w-2xl mx-auto">
              Year after year, our students deliver strong results in the CBSE Class X Board Examinations. By focusing on Core Mathematics and Science, we help them go beyond expectations.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="cl-card cl-card-hover h-full p-5 sm:p-6 text-center relative overflow-hidden">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.accent}`} />
                <p className={`text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r ${s.accent} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }}>{s.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] cl-heading">{s.label}</p>
                <p className="mt-1 text-xs font-medium cl-muted leading-snug">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="space-y-6">
        <Reveal>
          <div className="text-center space-y-2">
            <span className="cl-eyebrow">The leadership</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight cl-heading">Our story and <span className="cl-gradient-text">academic vision</span></h2>
            <p className="text-sm font-medium cl-muted max-w-xl mx-auto">Meet the people bridging the gap between rote learning and real understanding.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <Reveal className="h-full">
            <Leader
              initials="NS" name="Mrs. Nisha Sharma" role="Founder" accent="from-teal-400 to-cyan-500" footer="Founder"
              paragraphs={[
                "The idea behind Conceptual Learning is Mrs. Nisha Sharma's. She believes that a student learns best when every topic is understood from the basics, and not just learnt by heart. The whole platform is built on this thought.",
                'Her way is simple. Explain the reason first, let the student try the questions, and correct the mistakes together. No doubt is too small to ask, and every student can be good at Maths and Science.',
              ]}
            />
          </Reveal>
          <Reveal delay={100} className="h-full">
            <Leader
              initials="RS" name="Mr. Rohit Sharma" role="Core Academic Lead" accent="from-amber-400 to-orange-500" footer="Academic Mentor"
              paragraphs={[
                'At the heart of this academic platform is Mr. Rohit Sharma. He is passionate about his work and has conquered many competitive examinations. As a proficient teacher who excels at explaining concepts to students, he transforms complex, challenging topics into clear, highly intuitive lessons.',
                'His clear and well-planned way of teaching helps students do well in school examinations and also builds a strong base for engineering and medical entrance tests.',
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ── HOW WE TEACH ── */}
      <section className="space-y-6">
        <Reveal>
          <div className="text-center space-y-2">
            <span className="cl-eyebrow">How we teach</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight cl-heading">Understanding, <span className="cl-gradient-text">step by step</span></h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {WAYS.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={w.title} delay={i * 90} className="h-full">
                <div className="cl-card cl-card-hover h-full p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 to-teal-400 shadow-lg shadow-cyan-500/20">
                    <Icon className="w-6 h-6 text-slate-950" />
                  </div>
                  <h3 className="mt-4 text-base font-black cl-heading">{w.title}</h3>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed cl-page">{w.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CLASSES ── */}
      <section className="space-y-6">
        <Reveal>
          <div className="text-center space-y-2">
            <span className="cl-eyebrow">Admissions and mentorship</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight cl-heading">Classes we <span className="cl-gradient-text">cater to</span></h2>
            <p className="text-sm font-medium cl-muted max-w-xl mx-auto">Focused, concept-driven online and offline mentorship for these classes.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {CLASSES.map((c, i) => (
            <Reveal key={c.name} delay={i * 90} className="h-full">
              <div className="cl-card cl-card-hover h-full p-7 text-center">
                <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${c.ring} p-[3px] shadow-xl`}>
                  <div className="w-full h-full rounded-full flex items-center justify-center text-2xl font-black cl-heading" style={{ background: 'var(--cl-bg)' }}>{c.roman}</div>
                </div>
                <h3 className="mt-4 text-lg font-black cl-heading">{c.name}</h3>
                <p className="mt-1 text-sm font-bold cl-muted">{c.tag}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── LEDGER ── */}
      <Reveal>
        <section className="cl-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-400">
            <Trophy className="w-4 h-4" /> The performance record
          </div>
          <ul className="mt-5 grid md:grid-cols-2 gap-x-8 gap-y-5">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <li key={h.title} className="flex gap-3.5 items-start">
                  <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${h.tone}`} style={{ background: 'var(--cl-surface-flat)', border: '1px solid var(--cl-border)' }}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black cl-heading">{h.title}</p>
                    <p className="mt-0.5 text-sm font-medium leading-relaxed cl-page">{h.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cl-divider my-6" />
          <p className="text-sm font-semibold cl-page flex items-center gap-2">
            Ready to learn the concept first? Join us, online or in the classroom. <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
          </p>
        </section>
      </Reveal>

    </div>
  );
}
