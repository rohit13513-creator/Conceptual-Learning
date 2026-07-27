import React from 'react';
import { 
  Award, 
  BookOpen, 
  Star, 
  Target, 
  Compass, 
  Sparkles, 
  GraduationCap, 
  ChevronRight, 
  User, 
  Heart, 
  Flame, 
  TrendingUp, 
  Users 
} from 'lucide-react';

export function AboutUs({ isLightMode = false }: { isLightMode?: boolean }) {
  return (
    <div className={`space-y-10 font-sans ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`} id="about-us-container">
      
      {/* ── SECTION 1: MASTER HERO HEADER ── */}
      <div className={`relative rounded-3xl overflow-hidden p-8 sm:p-12 shadow-2xl border ${
        isLightMode 
          ? 'bg-gradient-to-r from-slate-100 via-slate-50 to-indigo-50 border-slate-200' 
          : 'bg-gradient-to-r from-[#0d1527] via-[#090f1d] to-[#1e1b4b] border-slate-800'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${isLightMode ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-500'} text-[10px] font-black uppercase tracking-widest rounded-full font-mono`}>
            <Sparkles className="w-3.5 h-3.5" />
            Our Academic Philosophy
          </div>
          
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            The Power of <span className="bg-gradient-to-r from-cyan-600 via-[#0284c7] to-indigo-600 bg-clip-text text-transparent">Conceptual Learning</span>
          </h1>
          
          <p className={`text-sm sm:text-base leading-relaxed font-sans ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            Welcome to our platform, where education goes beyond traditional memorization to foster true, deep-rooted understanding.
          </p>
          
          <div className={`p-5 rounded-2xl backdrop-blur-sm space-y-3 border ${
            isLightMode 
              ? 'bg-white/80 border-slate-200' 
              : 'bg-slate-950/70 border-slate-800/80'
          }`}>
            <h3 className={`text-xs font-bold ${isLightMode ? 'text-blue-900' : 'text-cyan-600'} font-mono uppercase tracking-wider flex items-center gap-2`}>
              <Target className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-cyan-600'}`} />
              Our Mission
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-semibold font-sans ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
              To transform the way students learn by shifting the focus from <span className={`hover:underline decoration-cyan-400 ${isLightMode ? 'text-cyan-800 font-bold' : 'text-white'}`}>"memorizing for exams"</span> to <span className={`hover:underline decoration-teal-400 ${isLightMode ? 'text-teal-800 font-bold' : 'text-white'}`}>"understanding for life."</span> We believe that once a concept is crystal clear, top grades and academic success naturally follow.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: THE VISIONaries ── */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className={`text-[10px] ${isLightMode ? 'text-blue-900' : 'text-cyan-600'} font-mono font-black uppercase tracking-widest block`}>
            The Leadership
          </span>
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
            🚀 Our Story & Academic Vision
          </h2>
          <p className="text-xs text-slate-400 font-semibold max-w-xl">
            Meet the pioneers bridgeing the gap between rote learning and true conceptual comprehension.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Nisha Sharma Card */}
          <div className={`p-6 rounded-2xl border transition duration-300 flex flex-col justify-between space-y-4 ${
            isLightMode 
              ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm text-slate-800' 
              : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Mrs. Nisha Sharma</h3>
                  <span className="text-[10px] uppercase font-mono font-black text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    Founder
                  </span>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                Every great journey begins with a vision. Our platform was conceptualized and initiated by Mrs. Nisha Sharma, whose passion for impactful education laid the foundation for this digital learning ecosystem to bridge the gap between rote learning and true comprehension.
              </p>
            </div>
            <div className={`pt-3 flex items-center justify-between text-[11px] font-mono border-t ${isLightMode ? 'border-slate-100' : 'border-slate-900/60'}`}>
              <span className="text-teal-600 font-extrabold uppercase tracking-wider">Founder</span>
              <Heart className="w-3.5 h-3.5 text-teal-500 fill-teal-500/20 animate-pulse" />
            </div>
          </div>

          {/* Rohit Sharma Card */}
          <div className={`p-6 rounded-2xl border transition duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden ${
            isLightMode 
              ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm text-slate-800' 
              : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className={`text-base font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Mr. Rohit Sharma</h3>
                  <span className="text-[10px] uppercase font-mono font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
                    Core Academic Lead
                  </span>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                At the heart of this academic platform is Mr. Rohit Sharma. He is passionate about his work and has conquered many competitive examinations. As a proficient teacher who excels at explaining concepts to students, he transforms complex, challenging topics into clear, highly intuitive lessons.
              </p>
              <p className={`text-xs leading-relaxed italic font-semibold pt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-200'}`}>
                His professional, structured, and result-oriented tutoring style helps students master both school examinations and core foundational engineering or medical entrance concepts.
              </p>
            </div>
            <div className={`pt-3 flex items-center justify-between text-[11px] font-mono border-t ${isLightMode ? 'border-slate-100' : 'border-slate-900/60'}`}>
              <span className="text-amber-500 font-extrabold uppercase tracking-wider">Academic Mentor</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>

        </div>
      </div>

      {/* ── SECTION 3: CLASSES DETAILS ── */}
      <div className="space-y-5">
        <div className="space-y-1">
          <span className="text-[10px] text-indigo-500 font-mono font-black uppercase tracking-widest block">
            Admissions & Mentorship
          </span>
          <h2 className={`text-xl font-black tracking-tight flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
            📚 Classes We Cater To
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            Currently, our platform provides highly focused, concept-driven online and offline mentorship exclusively for:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className={`p-5 rounded-xl border transition text-center space-y-2 ${
            isLightMode 
              ? 'bg-white border-slate-200 hover:border-cyan-500/35 shadow-sm text-slate-800' 
              : 'bg-[#090f1d] border-slate-800/80 hover:border-cyan-500/30'
          }`}>
            <div className={`w-9 h-9 rounded-full ${isLightMode ? 'bg-blue-100 text-blue-900' : 'bg-cyan-500/10 text-cyan-500'} flex items-center justify-center mx-auto text-xs font-mono font-black`}>
              VIII
            </div>
            <h4 className={`text-sm font-bold font-sans ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Class VIII</h4>
            <span className={`text-[10.5px] font-extrabold uppercase px-2.5 py-1.5 rounded-lg border font-sans tracking-wide block ${
              isLightMode 
                ? 'bg-blue-50 text-blue-900 border-blue-200' 
                : 'bg-cyan-950/60 text-cyan-200 border-cyan-500/35'
            }`}>
              Foundation of Concepts
            </span>
          </div>

          <div className={`p-5 rounded-xl border transition text-center space-y-2 ${
            isLightMode 
              ? 'bg-white border-slate-200 hover:border-indigo-500/35 shadow-sm text-slate-800' 
              : 'bg-[#090f1d] border-slate-800/80 hover:border-indigo-500/30'
          }`}>
            <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto text-xs font-mono font-black">
              IX
            </div>
            <h4 className={`text-sm font-bold font-sans ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Class IX</h4>
            <span className={`text-[10.5px] font-extrabold uppercase px-2.5 py-1.5 rounded-lg border font-sans tracking-wide block ${
              isLightMode 
                ? 'bg-indigo-50 text-indigo-800 border-indigo-200' 
                : 'bg-indigo-950/60 text-indigo-200 border-indigo-500/35'
            }`}>
              Foundation for Competitions
            </span>
          </div>

          <div className={`p-5 rounded-xl border transition text-center space-y-2 ${
            isLightMode 
              ? 'bg-white border-slate-200 hover:border-emerald-500/35 shadow-sm text-slate-800' 
              : 'bg-[#090f1d] border-slate-800/80 hover:border-emerald-500/30'
          }`}>
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto text-xs font-mono font-black">
              X
            </div>
            <h4 className={`text-sm font-bold font-sans ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Class X</h4>
            <span className={`text-[10.5px] font-extrabold uppercase px-2.5 py-1.5 rounded-lg border font-sans tracking-wide block ${
              isLightMode 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-emerald-950/60 text-emerald-200 border-emerald-500/35'
            }`}>
              Board Excellence
            </span>
          </div>

        </div>
      </div>

      {/* ── SECTION 4: PERFORMANCE MILESTONES ── */}
      <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
        isLightMode 
          ? 'bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200 text-slate-800 shadow-md' 
          : 'bg-gradient-to-br from-[#0c1222] to-slate-950 border-slate-800 text-slate-100'
      }`}>
        <div className="space-y-1">
          <span className="text-[10px] text-yellow-500 font-mono font-black uppercase tracking-widest block">
            Proven Results
          </span>
          <h2 className={`text-xl font-black tracking-tight flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
            🏆 Our Track Record: Academic Excellence
          </h2>
          <p className={`text-xs leading-relaxed font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
            We don’t just claim to teach differently—our results prove it. Year after year, our students deliver phenomenal performances in the CBSE Class X Board Examinations, turning conceptual clarity into top-tier scores.
          </p>
          <p className="text-xs text-slate-400 font-semibold font-sans">
            By focusing heavily on Core Mathematics and Science, we ensure our students outshine expectations. Here is a brief look at our stellar performance milestones:
          </p>
        </div>

        {/* Bento Board Performance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          
          <div className={`p-4 border rounded-xl space-y-1.5 text-center relative overflow-hidden ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-sm' 
              : 'bg-slate-900/60 border-slate-850'
          }`}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500" />
            <span className={`text-[9px] ${isLightMode ? 'text-blue-900' : 'text-cyan-500'} uppercase font-mono tracking-wider block font-black`}>The Ultimate Heights</span>
            <span className={`text-3xl font-black font-mono block ${isLightMode ? 'text-slate-900' : 'text-white'}`}>98.6%</span>
            <p className="text-[10.5px] leading-snug text-slate-400 font-medium">Staggering highest overall score achieved by our student pool.</p>
          </div>

          <div className={`p-4 border rounded-xl space-y-1.5 text-center relative overflow-hidden ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-sm' 
              : 'bg-slate-900/60 border-slate-850'
          }`}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500" />
            <span className="text-[9px] text-yellow-500 uppercase font-mono tracking-wider block font-black">Subject Perfection</span>
            <span className={`text-3xl font-black font-mono block ${isLightMode ? 'text-slate-900' : 'text-white'}`}>99/100</span>
            <p className="text-[10.5px] leading-snug text-slate-400 font-medium">In individual core subjects, peaking at 99 in Science & Math.</p>
          </div>

          <div className={`p-4 border rounded-xl space-y-1.5 text-center relative overflow-hidden ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-sm' 
              : 'bg-slate-900/60 border-slate-850'
          }`}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <span className="text-[9px] text-emerald-500 uppercase font-mono tracking-wider block font-black">95%+ Elite Club</span>
            <span className={`text-3xl font-black font-mono block ${isLightMode ? 'text-slate-900' : 'text-white'}`}>8+ Qs</span>
            <p className="text-[10.5px] leading-snug text-slate-400 font-medium">Over 8 students comfortably crossed 95% overall aggregate.</p>
          </div>

          <div className={`p-4 border rounded-xl space-y-1.5 text-center relative overflow-hidden ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-sm' 
              : 'bg-slate-900/60 border-slate-850'
          }`}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
            <span className="text-[9px] text-indigo-500 uppercase font-mono tracking-wider block font-black">90%+ Super Achievers</span>
            <span className={`text-3xl font-black font-mono block ${isLightMode ? 'text-slate-900' : 'text-white'}`}>12+ Qs</span>
            <p className="text-[10.5px] leading-snug text-slate-400 font-medium">An overwhelming majority shatttered the 90% benchmark.</p>
          </div>

        </div>

        {/* Long Text Bullet Checklist card */}
        <div className={`p-4 sm:p-5 rounded-xl border space-y-3 ${
          isLightMode 
            ? 'bg-white border-slate-200' 
            : 'bg-slate-950/80 border-slate-850'
        }`}>
          <h4 className="text-xs font-black text-amber-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Detailed Performance Ledger
          </h4>
          
          <ul className={`space-y-3 text-xs ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            <li className="flex gap-2.5 items-start">
              <span className={`shrink-0 select-none ${isLightMode ? 'text-blue-900' : 'text-cyan-500'}`}>🚀</span>
              <p className="font-semibold leading-relaxed">
                <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>The Ultimate Heights:</strong> Our student pool achieved a staggering highest overall score of <b className={`${isLightMode ? 'text-blue-900' : 'text-cyan-600'} font-bold`}>98.6%</b>.
              </p>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className={`shrink-0 select-none ${isLightMode ? 'text-blue-900' : 'text-cyan-500'}`}>💯</span>
              <p className="font-semibold leading-relaxed">
                <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Near-Perfect Subject Scores:</strong> In individual core subjects, our students peaked at an incredible <b className={`${isLightMode ? 'text-blue-950 font-black' : 'text-cyan-400 font-bold'}`}>99/100</b> in Science and <b className={`${isLightMode ? 'text-blue-950 font-black' : 'text-cyan-400 font-bold'}`}>99/100</b> in Mathematics.
              </p>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-indigo-500 shrink-0 select-none">🎖️</span>
              <p className="font-semibold leading-relaxed">
                <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>The 95%+ Elite Club:</strong> Over <b className="text-emerald-600 font-bold">8 students</b> comfortably crossed the prestigious 95% overall aggregate mark, showcasing consistent excellence across the board.
              </p>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-rose-500 shrink-0 select-none">🎯</span>
              <p className="font-semibold leading-relaxed">
                <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>The 90% Super Achievers:</strong> An overwhelming majority—<b className="text-amber-600 font-bold">12+ students</b>—shattered the 90% overall benchmark, proving that our methodology works for everyone, not just a select few.
              </p>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-amber-500 shrink-0 select-none">📈</span>
              <p className="font-semibold leading-relaxed">
                <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Subject Mastery:</strong> Even beyond overall percentages, a vast majority of our students consistently score <b className="text-amber-600 font-black">90+ marks out of 100</b> specifically in Mathematics and Science.
              </p>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
