import React, { useState } from "react";
import {
  Hash,
  Award,
  HelpCircle,
  TrendingUp,
  Triangle,
  Divide,
  Calculator,
  Box,
  Layers,
  ChevronLeft,
  ChevronRight,
  GitBranch,
} from "lucide-react";

type MathsTopicId =
  | "introduction"
  | "patterns-in-squares"
  | "pythagorean-triples"
  | "square-roots-methods"
  | "square-roots-long-division"
  | "perfect-cubes"
  | "patterns-in-cubes"
  | "cube-roots"
  | "glossary-mindmap"
  | "competition-corner";

interface MathsTopic {
  id: MathsTopicId;
  title: string;
  category: string;
}

const MATHS_TOPICS: MathsTopic[] = [
  { id: "introduction", title: "1. Perfect Squares: Meaning & Properties", category: "Fundamentals" },
  { id: "patterns-in-squares", title: "2. Patterns in Square Numbers", category: "Fundamentals" },
  { id: "pythagorean-triples", title: "3. Pythagorean Triples", category: "Special Patterns" },
  { id: "square-roots-methods", title: "4. Square Roots: Subtraction & Factorization", category: "Square Roots" },
  { id: "square-roots-long-division", title: "5. Square Roots: Long Division Method", category: "Square Roots" },
  { id: "perfect-cubes", title: "6. Perfect Cubes: Meaning & Properties", category: "Cubes" },
  { id: "patterns-in-cubes", title: "7. Patterns in Cube Numbers", category: "Cubes" },
  { id: "cube-roots", title: "8. Cube Roots by Factorization", category: "Cubes" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnMaths8SquareCubeProps {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// ── Reusable building blocks (same visual language as the other subject pages, cyan accent) ──

const InfoCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; isLightMode?: boolean }> = ({ title, icon: Icon, children, isLightMode = false }) => (
  <div className={`p-5 rounded-2xl space-y-3 shadow-md border ${isLightMode ? "bg-cyan-50 border-cyan-200" : "bg-[#0a1622] border-cyan-500/15"}`}>
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-cyan-400" />
      <h3 className={`text-sm font-black uppercase tracking-wider font-mono ${isLightMode ? "text-cyan-800" : "text-cyan-300"}`}>{title}</h3>
    </div>
    <div className={`space-y-3 text-sm font-semibold leading-relaxed ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>{children}</div>
  </div>
);

const RememberBox: React.FC<{ title: string; children: React.ReactNode; isLightMode?: boolean }> = ({ title, children, isLightMode = false }) => (
  <div className={`p-4 rounded-xl space-y-1.5 font-sans font-semibold border ${isLightMode ? "bg-amber-50 border-amber-200" : "bg-amber-950/20 border-amber-500/10"}`}>
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1">
      <HelpCircle className="w-3.5 h-3.5" /> {title}
    </h5>
    <div className={`text-[14px] font-sans leading-relaxed ${isLightMode ? "text-slate-700" : "text-slate-350"}`}>{children}</div>
  </div>
);

const FormulaBox: React.FC<{ children: React.ReactNode; isLightMode?: boolean }> = ({ children, isLightMode = false }) => (
  <div className={`p-4 rounded-xl border text-center font-mono text-[15px] font-black tracking-wide ${isLightMode ? "bg-slate-900 text-cyan-300 border-slate-700" : "bg-slate-950 text-cyan-300 border-slate-800"}`}>
    {children}
  </div>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-cyan-300 font-mono">
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
    <span>{children}</span>
  </div>
);

const FactRow: React.FC<{ label: string; children: React.ReactNode; isLightMode?: boolean }> = ({ label, children, isLightMode = false }) => (
  <div className={`p-2.5 rounded-lg border text-sm font-semibold ${isLightMode ? "bg-white border-slate-200 text-slate-700" : "bg-slate-950 border-slate-800 text-slate-300"}`}>
    <span className={`font-black ${isLightMode ? "text-slate-900" : "text-white"}`}>{label}:</span> <span>{children}</span>
  </div>
);

const DiagramCard: React.FC<{ caption: string; children: React.ReactNode; isLightMode?: boolean }> = ({ caption, children, isLightMode = false }) => (
  <div className="space-y-2">
    <div className={`rounded-2xl border p-4 shadow-lg ${isLightMode ? "bg-white border-slate-200" : "bg-[#0b1420] border-slate-800"}`}>
      {children}
    </div>
    <p className={`text-center text-[13px] font-bold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>{caption}</p>
  </div>
);

// A solved competitive-exam-style question, shown directly (not hidden behind a reveal) since
// this page is for reading and revising, not a timed quiz.
const ExampleQ: React.FC<{ number: number; question: string; answer: string; isLightMode?: boolean }> = ({ number, question, answer, isLightMode = false }) => (
  <div className={`p-4 rounded-xl border space-y-2 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
    <p className="text-sm font-bold leading-relaxed"><span className="text-cyan-400 font-mono">Q{number}.</span> {question}</p>
    <p className="text-sm font-semibold leading-relaxed"><span className="text-emerald-400 font-black">Answer: </span>{answer}</p>
  </div>
);

type MindMapColor = "cyan" | "emerald" | "indigo" | "orange" | "amber" | "rose" | "sky";

const MIND_MAP_PALETTE: Record<MindMapColor, { dark: string; light: string; icon: string }> = {
  cyan: { dark: "bg-cyan-950/30 border-cyan-500/25 text-cyan-300", light: "bg-cyan-50 border-cyan-300 text-cyan-900", icon: "text-cyan-400" },
  emerald: { dark: "bg-emerald-950/30 border-emerald-500/25 text-emerald-300", light: "bg-emerald-50 border-emerald-300 text-emerald-900", icon: "text-emerald-500" },
  indigo: { dark: "bg-indigo-950/30 border-indigo-500/25 text-indigo-300", light: "bg-indigo-50 border-indigo-300 text-indigo-900", icon: "text-indigo-400" },
  orange: { dark: "bg-orange-950/30 border-orange-500/25 text-orange-300", light: "bg-orange-50 border-orange-300 text-orange-900", icon: "text-orange-500" },
  amber: { dark: "bg-amber-950/30 border-amber-500/25 text-amber-300", light: "bg-amber-50 border-amber-300 text-amber-900", icon: "text-amber-500" },
  rose: { dark: "bg-rose-950/30 border-rose-500/25 text-rose-300", light: "bg-rose-50 border-rose-300 text-rose-900", icon: "text-rose-500" },
  sky: { dark: "bg-sky-950/30 border-sky-500/25 text-sky-300", light: "bg-sky-50 border-sky-300 text-sky-900", icon: "text-sky-400" },
};

const MindMapBranch: React.FC<{
  icon: React.ElementType;
  title: string;
  color: MindMapColor;
  points: string[];
  isLightMode?: boolean;
}> = ({ icon: Icon, title, color, points, isLightMode = false }) => {
  const palette = MIND_MAP_PALETTE[color];
  return (
    <div className="flex flex-col items-center">
      <div className={`w-px h-4 ${isLightMode ? "bg-slate-300" : "bg-slate-700"}`} />
      <div className={`w-full rounded-2xl border p-4 space-y-2.5 shadow-md ${isLightMode ? palette.light : palette.dark}`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${palette.icon}`} />
          <h4 className="text-sm font-black uppercase tracking-wider font-mono">{title}</h4>
        </div>
        <ul className={`list-disc pl-4 text-[13.5px] font-semibold space-y-1 ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
};

export function LearnMaths8SquareCube({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnMaths8SquareCubeProps) {
  const [activeTopic, setActiveTopic] = useState<MathsTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const textMain = isLightMode ? "#0f172a" : "#f1f5f9";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-maths8sc-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Squares & Cubes</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Squares & Cubes</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Perfect squares, patterns, Pythagorean triples, square roots, perfect cubes, and cube roots -- explained simply, one idea at a time.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {MATHS_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 group ${
                activeTopic === topic.id
                  ? isLightMode
                    ? "bg-cyan-50 border border-cyan-300"
                    : "bg-cyan-950/40 border border-cyan-500/30"
                  : "border border-transparent hover:bg-slate-800/40"
              }`}
            >
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeTopic === topic.id ? "text-cyan-400" : "text-slate-500"}`}>
                {topic.category}
              </span>
              <span className={`text-sm font-bold ${activeTopic === topic.id ? (isLightMode ? "text-cyan-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>
                {topic.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-maths8sc-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-maths8sc-main p, #learn-maths8sc-main li, #learn-maths8sc-main span, #learn-maths8sc-main label, #learn-maths8sc-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-maths8sc-main b, #learn-maths8sc-main strong, #learn-maths8sc-main h1, #learn-maths8sc-main h2, #learn-maths8sc-main h3, #learn-maths8sc-main h4, #learn-maths8sc-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-maths8sc-container .bg-slate-900, #learn-maths8sc-container .bg-\\[\\#0d1424\\], #learn-maths8sc-container .bg-\\[\\#0a1622\\], #learn-maths8sc-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-maths8sc-container .border-slate-800, #learn-maths8sc-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Hash className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Chapter: A Square and a Cube</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Perfect Squares: Meaning & Properties</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Multiplying a number by itself is one of the simplest operations in maths -- but the results it produces follow some surprisingly strict rules.</p>
              </div>

              <InfoCard title="Core Definition" icon={Hash} isLightMode={isLightMode}>
                <p><b>Perfect square:</b> a number obtained by multiplying a whole number by itself. For example, 6 x 6 = 36, so 36 is a perfect square.</p>
                <p>A perfect square is also called a "square number", since it can always be arranged as a square-shaped grid of dots -- side length n gives exactly n x n = n² dots.</p>
              </InfoCard>

              <DiagramCard caption="A 4 x 4 grid of dots -- 4 rows of 4 dots each -- shows exactly why 4 squared equals 16" isLightMode={isLightMode}>
                <svg viewBox="0 0 240 240" className="w-full h-auto">
                  {Array.from({ length: 4 }).map((_, row) =>
                    Array.from({ length: 4 }).map((_, col) => (
                      <circle key={`${row}-${col}`} cx={40 + col * 55} cy={30 + row * 55} r="9" fill="#22d3ee" />
                    ))
                  )}
                  <text x="120" y="225" textAnchor="middle" fontSize="14" fontWeight="800" fill={textMain}>4 x 4 = 16 dots, so 4² = 16</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Squares of 1 to 20</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => (
                  <FactRow key={n} label={`${n}²`} isLightMode={isLightMode}>{n * n}</FactRow>
                ))}
              </div>

              <SectionHeading>Key Properties</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1 (odd/even)" isLightMode={isLightMode}>The square of an odd number is always odd, and the square of an even number is always even.</FactRow>
                <FactRow label="Property 2 (last digit)" isLightMode={isLightMode}>A perfect square can only end in 0, 1, 4, 5, 6, or 9. It can never end in 2, 3, 7, or 8.</FactRow>
                <FactRow label="Property 3 (trailing zeroes)" isLightMode={isLightMode}>A perfect square always has an even number of zeroes at its end (0, 2, 4, ... never 1, 3, 5, ...).</FactRow>
                <FactRow label="Property 4 (negative squares)" isLightMode={isLightMode}>The square of a negative number is always positive, since a negative times a negative gives a positive: (-6) x (-6) = 36.</FactRow>
              </div>

              <FormulaBox isLightMode={isLightMode}>perfect square = whole number x itself = n²</FormulaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Is 361 a perfect square?" answer="Yes -- 19 x 19 = 361." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Without calculating, can 1357 be a perfect square?" answer="No -- it ends in 7, and 7 is never the last digit of a perfect square." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Find the square of -12." answer="(-12) x (-12) = 144, a positive number." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A perfect square ends in exactly 3 zeroes. Is this possible?" answer="No -- a perfect square must end in an even number of zeroes (0, 2, 4, ...), and 3 is odd, so this is impossible." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Is the square of 17 odd or even, and why?" answer="Odd, because 17 itself is odd, and the square of an odd number is always odd (17 x 17 = 289)." />

              <RememberBox title="Last-digit check first" isLightMode={isLightMode}>
                Before doing any real calculation, glance at the last digit of a number. If it ends in 2, 3, 7, or 8, it can be rejected instantly as a perfect square -- this quick check saves a lot of time in exams.
              </RememberBox>
            </div>
          )}

          {activeTopic === "patterns-in-squares" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Patterns in Square Numbers</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Square numbers are not just a random list -- they hide some beautifully consistent patterns.</p>
              </div>

              <InfoCard title="Pattern 1: Sum of Consecutive Odd Numbers" icon={TrendingUp} isLightMode={isLightMode}>
                <p>Adding up consecutive odd numbers starting from 1 always produces a perfect square. Adding the first n odd numbers gives exactly n².</p>
              </InfoCard>

              <DiagramCard caption="Each coloured L-shaped band (called a gnomon) adds the next odd number, building up bigger and bigger squares" isLightMode={isLightMode}>
                <svg viewBox="0 0 260 260" className="w-full h-auto">
                  <rect x="20" y="180" width="60" height="60" fill="#22d3ee" opacity="0.85" />
                  <rect x="80" y="180" width="60" height="60" fill="#fbbf24" opacity="0.8" />
                  <rect x="80" y="120" width="60" height="60" fill="#fbbf24" opacity="0.8" />
                  <rect x="140" y="180" width="60" height="60" fill="#f87171" opacity="0.8" />
                  <rect x="140" y="120" width="60" height="60" fill="#f87171" opacity="0.8" />
                  <rect x="140" y="60" width="60" height="60" fill="#f87171" opacity="0.8" />
                  <text x="50" y="215" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">1</text>
                  <text x="170" y="90" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">5</text>
                  <text x="110" y="150" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">3</text>
                  <text x="130" y="255" textAnchor="middle" fontSize="13" fontWeight="800" fill={textMain}>1 + 3 + 5 = 9 = 3²</text>
                </svg>
              </DiagramCard>

              <FormulaBox isLightMode={isLightMode}>1 + 3 + 5 + ... + (first n odd numbers) = n²</FormulaBox>

              <SectionHeading>Pattern 2: The Gap Between Consecutive Squares</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Rule" isLightMode={isLightMode}>Between n² and (n+1)², there are always exactly 2n numbers that are not perfect squares.</FactRow>
                <FactRow label="Example" isLightMode={isLightMode}>Between 5² (25) and 6² (36): there are 2 x 5 = 10 numbers (26 to 35).</FactRow>
                <FactRow label="Why it matters" isLightMode={isLightMode}>The gap between consecutive perfect squares keeps growing as the numbers get bigger -- squares get "further apart" the higher you go.</FactRow>
              </div>

              <SectionHeading>Pattern 3: Column Patterns</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Difference of consecutive squares" isLightMode={isLightMode}>(n+1)² - n² = 2n + 1, which is always exactly the sum of the two numbers, n + (n+1).</FactRow>
                <FactRow label="Palindromic products" isLightMode={isLightMode}>Numbers made only of 1s, when squared, form palindromes: 11² = 121, 111² = 12321, 1111² = 1234321.</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Find 1+3+5+7+9+11+13+15 using the pattern." answer="There are 8 terms, so the sum is 8² = 64." />
              <ExampleQ number={2} isLightMode={isLightMode} question="How many numbers lie between 14² and 15²?" answer="2 x 14 = 28 numbers." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Find the difference between 23² and 22² without squaring either number fully." answer="Using (n+1)²-n² = 2n+1 with n=22: 2(22)+1 = 45." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What is 1111², using the palindrome pattern?" answer="1234321." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A sum of consecutive odd numbers starting from 1 totals 144. How many terms were added?" answer="Since 144 = 12², exactly 12 consecutive odd numbers were added." />

              <RememberBox title="These patterns are shortcuts, not tricks" isLightMode={isLightMode}>
                Every pattern here can be proven with simple algebra (for example, (n+1)² - n² always expands to 2n+1) -- they aren't coincidences, so they can be trusted and reused confidently in any problem.
              </RememberBox>
            </div>
          )}

          {activeTopic === "pythagorean-triples" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Pythagorean Triples</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Three whole numbers that fit perfectly into the Pythagoras relationship -- and a simple formula that generates endless new ones.</p>
              </div>

              <InfoCard title="Definition" icon={Triangle} isLightMode={isLightMode}>
                <p><b>Pythagorean triple:</b> three positive whole numbers a, b, c such that a² + b² = c² -- exactly the relationship satisfied by the two legs and the hypotenuse of a right-angled triangle.</p>
                <p>The most famous example is (3, 4, 5), since 3²+4² = 9+16 = 25 = 5².</p>
              </InfoCard>

              <DiagramCard caption="A 3-4-5 right triangle, with a square drawn on each side -- the two smaller squares' areas (9+16) add up to exactly the large square's area (25)" isLightMode={isLightMode}>
                <svg viewBox="0 0 320 260" className="w-full h-auto">
                  <polygon points="40,220 160,220 40,140" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <text x="30" y="185" fontSize="13" fontWeight="800" fill="#22d3ee">4</text>
                  <text x="95" y="238" fontSize="13" fontWeight="800" fill="#fbbf24">3</text>
                  <text x="110" y="175" fontSize="13" fontWeight="800" fill="#f87171">5</text>
                  <rect x="0" y="140" width="40" height="80" fill="#22d3ee" opacity="0.25" />
                  <rect x="40" y="220" width="120" height="30" fill="#fbbf24" opacity="0.25" />
                </svg>
              </DiagramCard>

              <SectionHeading>Generating New Triples: A Ready Formula</SectionHeading>
              <FormulaBox isLightMode={isLightMode}>For any whole number m greater than 1: (2m, m² - 1, m² + 1) is always a Pythagorean triple</FormulaBox>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="m = 2" isLightMode={isLightMode}>(4, 3, 5)</FactRow>
                <FactRow label="m = 3" isLightMode={isLightMode}>(6, 8, 10)</FactRow>
                <FactRow label="m = 4" isLightMode={isLightMode}>(8, 15, 17)</FactRow>
                <FactRow label="m = 5" isLightMode={isLightMode}>(10, 24, 26)</FactRow>
                <FactRow label="m = 6" isLightMode={isLightMode}>(12, 35, 37)</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Generate the Pythagorean triple for m = 8." answer="2m=16, m²-1=63, m²+1=65, giving (16, 63, 65). Check: 16²+63² = 256+3969 = 4225 = 65²." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Verify whether (7, 24, 25) is a Pythagorean triple." answer="7²+24² = 49+576 = 625 = 25². Yes, it is valid." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A triple has 2m = 18. Find the other two numbers." answer="m=9, so m²-1=80 and m²+1=82, giving (18, 80, 82)." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Is (5, 6, 8) a Pythagorean triple?" answer="5²+6² = 25+36 = 61, but 8² = 64. Since 61 is not equal to 64, this is NOT a valid triple." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why does the formula always require m to be greater than 1?" answer="If m=1, then m²-1=0, which cannot be the length of a real side of a triangle -- a valid triangle needs all three positive side lengths." />

              <RememberBox title="Always verify, don't just trust the formula" isLightMode={isLightMode}>
                Even though the (2m, m²-1, m²+1) formula is always correct, it's good practice to plug the numbers back into a²+b²=c² and check the arithmetic -- this catches any calculation slip made while working out m².
              </RememberBox>
            </div>
          )}

          {activeTopic === "square-roots-methods" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Square Roots: Repeated Subtraction & Factorization</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Finding a square root is the reverse of squaring -- here are two hands-on methods for doing it without a calculator.</p>
              </div>

              <InfoCard title="Definition" icon={Divide} isLightMode={isLightMode}>
                <p><b>Square root:</b> if n² = m, then n is called the square root of m, written as sqrt(m). For example, sqrt(49) = 7, since 7² = 49.</p>
              </InfoCard>

              <SectionHeading>Method 1: Repeated Subtraction</SectionHeading>
              <div className={`p-4 rounded-xl border space-y-2 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Subtract consecutive odd numbers (1, 3, 5, 7, ...) from the given number, one at a time, until the result is exactly 0. The number of subtractions performed is the square root.</p>
                <p className="text-sm font-semibold">Example -- finding sqrt(25): 25-1=24, 24-3=21, 21-5=16, 16-7=9, 9-9=0. Exactly 5 subtractions were needed, so sqrt(25) = 5.</p>
              </div>

              <RememberBox title="Why this works" isLightMode={isLightMode}>
                This method works because a perfect square is always the sum of consecutive odd numbers starting from 1 -- so subtracting them back off, one at a time, must reach exactly 0 after n steps, where n is the square root.
              </RememberBox>

              <SectionHeading>Method 2: Prime Factorization</SectionHeading>
              <div className={`p-4 rounded-xl border space-y-2 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Break the number down into its prime factors, group identical primes into pairs, and take one factor from each pair. Multiplying those together gives the square root.</p>
              </div>

              <DiagramCard caption="Factor tree for 196: splitting down to primes shows 196 = 2 x 2 x 7 x 7, which pairs perfectly into (2x2) and (7x7)" isLightMode={isLightMode}>
                <svg viewBox="0 0 320 220" className="w-full h-auto">
                  <text x="160" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fill="#22d3ee">196</text>
                  <line x1="160" y1="38" x2="90" y2="80" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="160" y1="38" x2="230" y2="80" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="90" y="95" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fbbf24">2</text>
                  <text x="230" y="95" textAnchor="middle" fontSize="15" fontWeight="800" fill={textMain}>98</text>
                  <line x1="230" y1="103" x2="170" y2="145" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="230" y1="103" x2="290" y2="145" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="170" y="160" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fbbf24">2</text>
                  <text x="290" y="160" textAnchor="middle" fontSize="15" fontWeight="800" fill={textMain}>49</text>
                  <line x1="290" y1="168" x2="250" y2="205" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="290" y1="168" x2="320" y2="205" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="250" y="215" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f87171">7</text>
                  <text x="320" y="215" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f87171">7</text>
                </svg>
              </DiagramCard>

              <FormulaBox isLightMode={isLightMode}>196 = 2² x 7², so sqrt(196) = 2 x 7 = 14</FormulaBox>

              <SectionHeading>Smallest Multiplier / Divisor for a Perfect Square</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="To multiply" isLightMode={isLightMode}>Find any prime with an ODD exponent in the factorization -- multiplying by one more copy of it makes every exponent even.</FactRow>
                <FactRow label="To divide" isLightMode={isLightMode}>Find any prime with an ODD exponent -- dividing out that one leftover copy entirely also makes every exponent even.</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Find sqrt(81) using repeated subtraction." answer="81-1=80, 80-3=77, 77-5=72, 72-7=65, 65-9=56, 56-11=45, 45-13=32, 32-15=17, 17-17=0. Exactly 9 subtractions, so sqrt(81)=9." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Find sqrt(324) using prime factorization." answer="324 = 2² x 3⁴ = (2x2) x (3x3) x (3x3). sqrt(324) = 2 x 3 x 3 = 18." />
              <ExampleQ number={3} isLightMode={isLightMode} question="What is the smallest number to multiply 48 by to make it a perfect square?" answer="48 = 2⁴ x 3. The 3 is unpaired, so multiply by 3 to get 144 = 12²." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What is the smallest number to divide 300 by to make it a perfect square?" answer="300 = 2² x 3 x 5². The 3 is unpaired, so dividing by 3 gives 100 = 10²." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Is 288 a perfect square?" answer="288 = 2⁵ x 3². The exponent of 2 is 5 (odd), so 288 is not a perfect square." />
            </div>
          )}

          {activeTopic === "square-roots-long-division" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Square Roots: Long Division Method</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The fastest hand method for large numbers, and the only one of the three that extends cleanly to decimals.</p>
              </div>

              <InfoCard title="How the Method Works" icon={Calculator} isLightMode={isLightMode}>
                <p>Pair the digits of the number from the right (from the decimal point for decimals). Work through each pair, at every stage finding the largest possible next digit of the answer using a doubling-and-testing rule, then bringing down the next pair.</p>
              </InfoCard>

              <DiagramCard caption="Digits of 7744 are paired from the right: 77 | 44 -- the long division process works through each pair in turn" isLightMode={isLightMode}>
                <svg viewBox="0 0 260 100" className="w-full h-auto">
                  <text x="130" y="55" textAnchor="middle" fontSize="26" fontWeight="800" fontFamily="monospace" fill={textMain}>77 | 44</text>
                  <line x1="70" y1="70" x2="70" y2="30" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="45" y="90" fontSize="12" fontWeight="800" fill="#22d3ee">1st pair</text>
                  <text x="175" y="90" fontSize="12" fontWeight="800" fill="#fbbf24">2nd pair</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Step-by-Step: sqrt(7744)</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Step 1" isLightMode={isLightMode}>First pair is 77. Largest digit d with d² &lt;= 77 is 8 (since 8²=64). Quotient so far: 8. Remainder: 77-64=13.</FactRow>
                <FactRow label="Step 2" isLightMode={isLightMode}>Bring down the next pair (44): new number is 1344. Double the quotient (8x2=16). Find digit x so that (160+x) x x &lt;= 1344. Testing x=8: 168x8=1344, an exact match.</FactRow>
                <FactRow label="Result" isLightMode={isLightMode}>Quotient becomes 88, remainder 0, so sqrt(7744) = 88.</FactRow>
              </div>

              <SectionHeading>Extending to Decimals</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Rule" isLightMode={isLightMode}>Pair the integer digits from the decimal point going left, and the decimal digits from the decimal point going right, then proceed exactly as usual.</FactRow>
                <FactRow label="Example" isLightMode={isLightMode}>sqrt(51.84): pairing gives 51 | .84. Working through both pairs gives the answer 7.2, and indeed 7.2 x 7.2 = 51.84.</FactRow>
              </div>

              <SectionHeading>Estimating Square Roots of Non-Perfect Squares</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Rule" isLightMode={isLightMode}>Find the two consecutive perfect squares the number falls between, then judge which one it sits closer to.</FactRow>
                <FactRow label="Example" isLightMode={isLightMode}>sqrt(90): since 81 &lt; 90 &lt; 100, sqrt(90) is between 9 and 10 -- and since 90 is much closer to 81, the estimate is a little above 9 (about 9.49).</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Find sqrt(1225) using long division." answer="Pairing 12|25: first digit 3 (3²=9, remainder 3); bring down 25 to get 325; doubling 3 gives 6, and 65x5=325 exactly. sqrt(1225) = 35." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Find sqrt(12.25)." answer="Pairing 12|.25: quotient works out to 3.5, and 3.5 x 3.5 = 12.25." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Estimate sqrt(55) between two whole numbers." answer="7²=49 and 8²=64. Since 55 lies between them and is closer to 49, sqrt(55) is approximately 7.4." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A square-shaped hall has area 9801 sq m. Find its side using long division." answer="sqrt(9801) = 99 m (99 x 99 = 9801)." />
              <ExampleQ number={5} isLightMode={isLightMode} question="How many digits will the square root of a 6-digit perfect square have?" answer="Pairing 6 digits from the right gives exactly 3 pairs, so the square root has exactly 3 digits." />

              <RememberBox title="Pairing decides the digit count" isLightMode={isLightMode}>
                Before doing any actual division, just counting how many digit-pairs a number splits into instantly tells you how many digits the final square root will have -- a fast sanity check on your final answer.
              </RememberBox>
            </div>
          )}

          {activeTopic === "perfect-cubes" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Perfect Cubes: Meaning & Properties</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>One step beyond squaring -- multiplying a number by itself three times, and the shape that makes this idea visual.</p>
              </div>

              <InfoCard title="Core Definition" icon={Box} isLightMode={isLightMode}>
                <p><b>Perfect cube:</b> a number obtained by multiplying a whole number by itself three times. For example, 5 x 5 x 5 = 125, so 125 is a perfect cube.</p>
                <p>A perfect cube can always be built as a cube-shaped stack of unit cubes -- an edge of length n gives exactly n x n x n = n³ small cubes.</p>
              </InfoCard>

              <DiagramCard caption="A simple cube outline -- a solid with edge length 's' has volume s x s x s = s³" isLightMode={isLightMode}>
                <svg viewBox="0 0 260 220" className="w-full h-auto">
                  <polygon points="60,160 160,160 160,60 60,60" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <polygon points="60,60 110,20 210,20 160,60" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <polygon points="160,60 210,20 210,120 160,160" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <text x="35" y="115" fontSize="14" fontWeight="800" fill="#22d3ee">s</text>
                  <text x="105" y="45" fontSize="14" fontWeight="800" fill="#fbbf24">s</text>
                  <text x="225" y="90" fontSize="14" fontWeight="800" fill="#f87171">s</text>
                  <text x="130" y="200" textAnchor="middle" fontSize="14" fontWeight="800" fill={textMain}>Volume = s³</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Cubes of 1 to 15</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => (
                  <FactRow key={n} label={`${n}³`} isLightMode={isLightMode}>{n * n * n}</FactRow>
                ))}
              </div>

              <SectionHeading>Key Properties</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1 (odd/even)" isLightMode={isLightMode}>The cube of an odd number is always odd, and the cube of an even number is always even.</FactRow>
                <FactRow label="Property 2 (negative cubes)" isLightMode={isLightMode}>The cube of a negative number is always negative: (-4)³ = -64. This is different from squaring, where negatives always turn positive.</FactRow>
                <FactRow label="Property 3 (last digit)" isLightMode={isLightMode}>Unlike squares, EVERY digit from 0 to 9 is a valid last digit for some perfect cube -- there is no forbidden last digit for cubes.</FactRow>
                <FactRow label="Property 4 (trailing zeroes)" isLightMode={isLightMode}>A perfect cube's trailing zero count is always a multiple of 3 (0, 3, 6, 9, ...).</FactRow>
              </div>

              <FormulaBox isLightMode={isLightMode}>perfect cube = whole number x itself x itself = n³</FormulaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Is 512 a perfect cube?" answer="Yes -- 8 x 8 x 8 = 512." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Find the cube of -6." answer="(-6)³ = -216, since a negative number cubed stays negative." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A perfect cube ends in exactly 4 zeroes. Is this possible?" answer="No -- a perfect cube's trailing zero count must be a multiple of 3, and 4 is not a multiple of 3." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Which digit can never be the last digit of a perfect cube?" answer="None -- every digit 0 through 9 genuinely occurs as the last digit of some perfect cube (for example, 12³=1728 ends in 8, and 18³=5832 ends in 2)." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Is 7³ odd or even?" answer="Odd, since 7 is odd and an odd number cubed always stays odd (7³=343)." />

              <RememberBox title="Cubes and squares are not the same rules" isLightMode={isLightMode}>
                It's tempting to assume cube rules mirror square rules, but they don't always -- negative numbers stay negative when cubed (not squares), and every last digit is possible for cubes (unlike the restricted list for squares). Always think about which rule applies to which operation.
              </RememberBox>
            </div>
          )}

          {activeTopic === "patterns-in-cubes" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Patterns in Cube Numbers</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Cubes have their own version of the odd-number pattern seen with squares -- and a fixed last-digit code worth memorizing.</p>
              </div>

              <InfoCard title="Pattern 1: Sum of Consecutive Odd Numbers" icon={Layers} isLightMode={isLightMode}>
                <p>Every perfect cube n³ can be written as the sum of exactly n consecutive odd numbers, starting from the odd number (n² - n + 1).</p>
              </InfoCard>

              <DiagramCard caption="3³ as a sum of 3 consecutive odd numbers: 7 + 9 + 11 = 27" isLightMode={isLightMode}>
                <svg viewBox="0 0 260 100" className="w-full h-auto">
                  <rect x="20" y="30" width="60" height="40" fill="#22d3ee" opacity="0.8" rx="6" />
                  <rect x="100" y="30" width="60" height="40" fill="#fbbf24" opacity="0.8" rx="6" />
                  <rect x="180" y="30" width="60" height="40" fill="#f87171" opacity="0.8" rx="6" />
                  <text x="50" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0f172a">7</text>
                  <text x="130" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0f172a">9</text>
                  <text x="210" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0f172a">11</text>
                  <text x="130" y="90" textAnchor="middle" fontSize="13" fontWeight="800" fill={textMain}>7 + 9 + 11 = 27 = 3³</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Pattern 2: Fixed Last-Digit Pairing</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold mb-2">Unlike squares, cubes have a complete one-to-one pairing between a number's last digit and its cube's last digit:</p>
                <div className="grid grid-cols-5 gap-1.5 text-center text-[13px] font-bold font-mono">
                  {[["0","0"],["1","1"],["2","8"],["3","7"],["4","4"],["5","5"],["6","6"],["7","3"],["8","2"],["9","9"]].map(([a,b]) => (
                    <div key={a} className={`p-1.5 rounded-lg border ${isLightMode ? "bg-white border-slate-200" : "bg-slate-950 border-slate-800"}`}>{a} &rarr; {b}</div>
                  ))}
                </div>
              </div>

              <RememberBox title="Notice the swaps" isLightMode={isLightMode}>
                Every digit maps to itself EXCEPT 2 and 8 (which swap with each other) and 3 and 7 (which also swap with each other). This is worth memorizing -- it lets you find or check a cube root's last digit instantly.
              </RememberBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Express 6³ as a sum of consecutive odd numbers." answer="First term = 6²-6+1 = 31. The 6 terms are 31,33,35,37,39,41, summing to 216 = 6³." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Without cubing, find the last digit of 43³." answer="43 ends in 3, and 3 maps to 7, so 43³ ends in 7." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Without cubing, find the last digit of 58³." answer="58 ends in 8, and 8 maps to 2, so 58³ ends in 2." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A perfect cube ends in 5. What must its cube root's last digit be?" answer="5, since 5 maps only to itself in the pairing (5³=125, ending in 5)." />
              <ExampleQ number={5} isLightMode={isLightMode} question="How many consecutive odd numbers, and starting where, are needed to build 5³?" answer="5 terms, starting at 5²-5+1=21: 21+23+25+27+29=125=5³." />
            </div>
          )}

          {activeTopic === "cube-roots" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Cube Roots by Factorization</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Undoing a cube works just like undoing a square -- except primes now need to be grouped in THREES, not twos.</p>
              </div>

              <InfoCard title="Definition" icon={Layers} isLightMode={isLightMode}>
                <p><b>Cube root:</b> if n³ = m, then n is called the cube root of m, written as cbrt(m). For example, cbrt(125) = 5, since 5³ = 125.</p>
              </InfoCard>

              <SectionHeading>Method: Prime Factorization</SectionHeading>
              <div className={`p-4 rounded-xl border space-y-2 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Break the number down into its prime factors, group identical primes into sets of THREE, and take one factor from each group. Multiplying those together gives the cube root.</p>
              </div>

              <DiagramCard caption="Factor tree for 1728: splitting down to primes shows 1728 = 2x2x2x2x2x2x3x3x3, which groups into two triples of 2 and one triple of 3" isLightMode={isLightMode}>
                <svg viewBox="0 0 320 220" className="w-full h-auto">
                  <text x="160" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fill="#22d3ee">1728</text>
                  <line x1="160" y1="38" x2="90" y2="80" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="160" y1="38" x2="230" y2="80" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="90" y="95" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fbbf24">2</text>
                  <text x="230" y="95" textAnchor="middle" fontSize="15" fontWeight="800" fill={textMain}>864</text>
                  <line x1="230" y1="103" x2="170" y2="145" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="230" y1="103" x2="290" y2="145" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="170" y="160" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fbbf24">2</text>
                  <text x="290" y="160" textAnchor="middle" fontSize="15" fontWeight="800" fill={textMain}>432 = 2⁴ x 3³</text>
                  <text x="160" y="200" textAnchor="middle" fontSize="13" fontWeight="800" fill={textMain}>1728 = 2⁶ x 3³</text>
                </svg>
              </DiagramCard>

              <FormulaBox isLightMode={isLightMode}>1728 = 2⁶ x 3³ = (2x2x2) x (2x2x2) x (3x3x3), so cbrt(1728) = 2 x 2 x 3 = 12</FormulaBox>

              <SectionHeading>Smallest Multiplier / Divisor for a Perfect Cube</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="To multiply" isLightMode={isLightMode}>Find any prime whose exponent is NOT a multiple of 3 -- multiply by just enough extra copies to bring that exponent up to the next multiple of 3.</FactRow>
                <FactRow label="To divide" isLightMode={isLightMode}>Find any prime whose exponent is NOT a multiple of 3 and cannot be completed to one by adding one more group -- dividing out that leftover portion (down to the largest multiple-of-3 exponent) restores a perfect cube.</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Find cbrt(2197) using prime factorization." answer="2197 = 13³, so cbrt(2197) = 13." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Find cbrt(5832) using prime factorization." answer="5832 = 2³ x 3⁶ = (2x3²)³ = 18³, so cbrt(5832) = 18." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Is 250 a perfect cube? If not, find the smallest multiplier to fix it." answer="250 = 2 x 5³. The exponent of 2 is 1, needing 2 more, so multiply by 2²=4 to get 1000=10³." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Find the smallest number to divide 128 by to make it a perfect cube." answer="128 = 2⁷. The largest multiple of 3 not exceeding 7 is 6, so divide by 2¹=2 to get 64=2⁶=4³." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A storage cube has volume 3375 cubic cm. Find its edge length." answer="3375 = 3³ x 5³, so cbrt(3375) = 3 x 5 = 15 cm." />

              <RememberBox title="Threes for cubes, twos for squares" isLightMode={isLightMode}>
                The single biggest mix-up between these two topics: square-root factorization groups primes in PAIRS (checking for even exponents), while cube-root factorization groups them in TRIPLES (checking for exponents that are multiples of 3). Always double-check which one a question is actually asking for.
              </RememberBox>
            </div>
          )}

          {activeTopic === "glossary-mindmap" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Quick Glossary & Mind Map</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A fast, one-page recap of the whole chapter before your test.</p>
              </div>

              <SectionHeading>Glossary</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Perfect square" isLightMode={isLightMode}>a number obtained by multiplying a whole number by itself, e.g. 36 = 6x6.</FactRow>
                <FactRow label="Perfect cube" isLightMode={isLightMode}>a number obtained by multiplying a whole number by itself three times, e.g. 125 = 5x5x5.</FactRow>
                <FactRow label="Square root" isLightMode={isLightMode}>the number that, squared, gives the original number.</FactRow>
                <FactRow label="Cube root" isLightMode={isLightMode}>the number that, cubed, gives the original number.</FactRow>
                <FactRow label="Pythagorean triple" isLightMode={isLightMode}>three whole numbers a, b, c satisfying a²+b²=c².</FactRow>
                <FactRow label="Gnomon" isLightMode={isLightMode}>the L-shaped band added to a square to make the next bigger square -- always the next odd number.</FactRow>
                <FactRow label="Prime factorization" isLightMode={isLightMode}>writing a number as a product of only prime numbers.</FactRow>
                <FactRow label="Repeated subtraction" isLightMode={isLightMode}>finding a square root by subtracting successive odd numbers until reaching zero.</FactRow>
                <FactRow label="Long division method" isLightMode={isLightMode}>a digit-by-digit method for finding square roots, extendable to decimals.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={Hash} title="Perfect Squares" color="cyan" isLightMode={isLightMode} points={[
                  "n x n = n²",
                  "Last digit only 0,1,4,5,6,9",
                  "Even trailing zero count",
                ]} />
                <MindMapBranch icon={TrendingUp} title="Patterns" color="amber" isLightMode={isLightMode} points={[
                  "Sum of first n odd numbers = n²",
                  "2n numbers between n² and (n+1)²",
                  "(n+1)² - n² = 2n+1",
                ]} />
                <MindMapBranch icon={Triangle} title="Pythagorean Triples" color="sky" isLightMode={isLightMode} points={[
                  "a²+b²=c²",
                  "Formula: (2m, m²-1, m²+1)",
                  "Always verify by direct substitution",
                ]} />
                <MindMapBranch icon={Divide} title="Square Roots" color="rose" isLightMode={isLightMode} points={[
                  "Repeated subtraction: count the steps",
                  "Factorization: pair up primes",
                  "Long division: works for decimals too",
                ]} />
                <MindMapBranch icon={Box} title="Perfect Cubes" color="indigo" isLightMode={isLightMode} points={[
                  "n x n x n = n³",
                  "Every digit 0-9 possible as last digit",
                  "Trailing zero count a multiple of 3",
                ]} />
                <MindMapBranch icon={Layers} title="Cube Roots" color="emerald" isLightMode={isLightMode} points={[
                  "Group primes into triples, not pairs",
                  "Fixed last-digit pairing (2<->8, 3<->7)",
                  "n³ = sum of n consecutive odd numbers",
                ]} />
              </div>

              <RememberBox title="You've completed this chapter!" isLightMode={isLightMode}>
                Go back to any topic using the sidebar whenever you need to revise. Then try the solved practice questions, the question bank, and the self-assessment quiz to test what you remember.
              </RememberBox>
            </div>
          )}

          {activeTopic === "competition-corner" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Competition Corner</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The regular syllabus covers the basics. Olympiad and NTSE-style papers often push these same ideas one step further -- this topic covers what commonly gets added on top, at this level.</p>
              </div>

              <SectionHeading>Ideas That Go a Step Further</SectionHeading>

              <InfoCard title="Perfect Sixth Powers" icon={GitBranch} isLightMode={isLightMode}>
                <p>A number that is BOTH a perfect square and a perfect cube at the same time must be a perfect sixth power -- every prime in its factorization needs an exponent that is a multiple of 6 (since 6 is the smallest number divisible by both 2 and 3).</p>
                <p>Examples: 1 (1⁶), 64 (2⁶, and also 8² = 4³), 729 (3⁶, and also 27² = 9³).</p>
              </InfoCard>

              <InfoCard title="Sum of Cubes Equals Square of the Sum" icon={Layers} isLightMode={isLightMode}>
                <p>A striking identity: the sum of the first n cubes always equals the SQUARE of the sum of the first n natural numbers. For n=4: 1³+2³+3³+4³ = 1+8+27+64 = 100, and (1+2+3+4)² = 10² = 100 -- exactly the same.</p>
              </InfoCard>

              <InfoCard title="Scaling Rules for Area and Volume" icon={Box} isLightMode={isLightMode}>
                <p>If every side of a square is scaled by a factor k, its area scales by k². If every edge of a cube is scaled by k, its volume scales by k³. This is why doubling a cube's edge gives 8 times the volume, not 2 times.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Speed trick for cube roots up to 6 digits" isLightMode={isLightMode}>group the digits in sets of three from the right; the last-digit pairing gives the answer's last digit instantly, and the leading group (compared against nearby cubes) gives the first digit.</FactRow>
                <FactRow label="LCM-based square/cube completion" isLightMode={isLightMode}>to make a number divisible by several others AND a perfect square (or cube), first find the LCM of all of them, then fix up any odd (or non-multiple-of-3) exponents in the LCM's factorization.</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Competitive papers love combining two ideas in one question -- for example, generating a Pythagorean triple with the formula, then asking for the area of the triangle it forms. Always re-read the full question before deciding which property to apply first.
              </RememberBox>

              <SectionHeading>Solved Competitive Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="Find the smallest number that is both a perfect square and a perfect cube, greater than 1." answer="It must be a perfect sixth power. The smallest one greater than 1 is 2⁶ = 64." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Verify the identity 1³+2³+3³ = (1+2+3)²." answer="1+8+27 = 36, and (1+2+3)² = 6² = 36. They match." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A cube's edge is tripled. By what factor does its volume increase?" answer="3³ = 27 times." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Using the digit-grouping speed trick, find cbrt(42875) mentally." answer="Grouping as 42|875: last digit of 875 is 5, mapping to cube root last digit 5. Left group 42 lies between 3³=27 and 4³=64, so first digit is 3. Combined: 35. Check: 35³=42875." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Find a Pythagorean triple where the hypotenuse is 25, other than (7,24,25)." answer="Using (2m,m²-1,m²+1) with m=... testing m=12: 2m=24 -- not matching hypotenuse form directly; instead scale (3,4,5) by 5: (15,20,25). Check: 15²+20²=225+400=625=25²." />
              <ExampleQ number={6} isLightMode={isLightMode} question="How many perfect sixth powers lie between 1 and 5000?" answer="1⁶=1, 2⁶=64, 3⁶=729, 4⁶=4096 all lie under 5000; 5⁶=15625 does not. So there are 4." />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = MATHS_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(MATHS_TOPICS[currentIndex - 1].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${
                      isLightMode
                        ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous Topic
                  </button>
                );
              }
              return <div />;
            })()}
            {(() => {
              const currentIndex = MATHS_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < MATHS_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(MATHS_TOPICS[currentIndex + 1].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${
                      isLightMode
                        ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    Next Topic
                    <ChevronRight className="w-3 h-3" />
                  </button>
                );
              } else if (onCompleteNotes) {
                return (
                  <div className="flex flex-wrap gap-3 justify-end w-full sm:w-auto">
                    <button
                      onClick={onCompleteNotes}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black text-[14px] cursor-pointer hover:from-cyan-450 hover:to-sky-450 shadow-md border border-cyan-400/30 shrink-0"
                    >
                      Complete
                      <ChevronRight className="w-3.5 h-3.5 font-bold" />
                    </button>
                    {onGoToSelfAssessment && (
                      <button
                        onClick={onGoToSelfAssessment}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[14px] cursor-pointer hover:from-amber-350 hover:to-orange-450 shadow-md border border-amber-400/30 shrink-0"
                      >
                        Take Self Assessment Quiz
                        <Award className="w-4 h-4 text-slate-950" />
                      </button>
                    )}
                  </div>
                );
              } else {
                return (
                  <button
                    onClick={() => setActiveTopic(MATHS_TOPICS[0].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${
                      isLightMode
                        ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    Next Topic
                    <ChevronRight className="w-3 h-3" />
                  </button>
                );
              }
            })()}
          </div>

        </div>
      </main>
    </div>
  );
}

export default LearnMaths8SquareCube;
