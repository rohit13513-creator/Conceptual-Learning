import React, { useState } from "react";
import {
  BookOpen,
  Award,
  HelpCircle,
  Shapes,
  Square as SquareIcon,
  Diamond,
  Triangle,
  ChevronLeft,
  ChevronRight,
  Ruler,
  GitBranch,
} from "lucide-react";

type MathsTopicId =
  | "introduction"
  | "rectangles"
  | "squares"
  | "parallelograms"
  | "rhombuses"
  | "kites"
  | "trapeziums"
  | "relationships"
  | "glossary-mindmap"
  | "competition-corner";

interface MathsTopic {
  id: MathsTopicId;
  title: string;
  category: string;
}

const MATHS_TOPICS: MathsTopic[] = [
  { id: "introduction", title: "1. Quadrilaterals & the Angle-Sum Property", category: "Fundamentals" },
  { id: "rectangles", title: "2. Rectangles", category: "Parallel-Sided Shapes" },
  { id: "squares", title: "3. Squares", category: "Parallel-Sided Shapes" },
  { id: "parallelograms", title: "4. Parallelograms", category: "Parallel-Sided Shapes" },
  { id: "rhombuses", title: "5. Rhombuses", category: "Equal-Sided Shapes" },
  { id: "kites", title: "6. Kites", category: "Adjacent-Equal-Sided Shapes" },
  { id: "trapeziums", title: "7. Trapeziums", category: "One-Parallel-Pair Shapes" },
  { id: "relationships", title: "8. How They All Relate", category: "Big Picture" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnMaths8Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// ── Reusable building blocks (same visual language as the other subject notes, cyan accent) ──

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

// A solved competitive-exam-style question, used only in the Competition Corner topic. The
// answer is shown directly (not hidden behind a reveal) since this is a notes page for reading
// and revising, not a quiz.
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

// ── Small SVG helpers shared by the quadrilateral diagrams below ──

const vertexDot = (x: number, y: number, color: string) => <circle cx={x} cy={y} r="4.5" fill={color} />;
const vertexLabel = (x: number, y: number, text: string, color: string, dx = 0, dy = -10) => (
  <text x={x + dx} y={y + dy} textAnchor="middle" fontSize="15" fontWeight="800" fill={color}>{text}</text>
);

export function LearnMaths8({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnMaths8Props) {
  const [activeTopic, setActiveTopic] = useState<MathsTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const strokeDash = isLightMode ? "#94a3b8" : "#64748b";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-maths8-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Shapes className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Quadrilaterals</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Shapes className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Quadrilaterals Notes</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Rectangles, squares, parallelograms, rhombuses, kites, and trapeziums -- their definitions, angles, and diagonal properties, explained simply.
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-maths8-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-maths8-main p, #learn-maths8-main li, #learn-maths8-main span, #learn-maths8-main label, #learn-maths8-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-maths8-main b, #learn-maths8-main strong, #learn-maths8-main h1, #learn-maths8-main h2, #learn-maths8-main h3, #learn-maths8-main h4, #learn-maths8-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-maths8-container .bg-slate-900, #learn-maths8-container .bg-\\[\\#0d1424\\], #learn-maths8-container .bg-\\[\\#0a1622\\], #learn-maths8-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-maths8-container .border-slate-800, #learn-maths8-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Shapes className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Class 8: Quadrilaterals, Notes</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Quadrilaterals & the Angle-Sum Property</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Four-sided figures are everywhere -- windows, books, kites, road signs. This topic sets up the one rule that applies to every single one of them.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Shapes} isLightMode={isLightMode}>
                <p><b>Quadrilateral:</b> a closed plane figure with exactly four straight sides, four vertices, and four angles. The word comes from Latin: 'quadri' (four) + 'latus' (side).</p>
                <p><b>Diagonal:</b> a line segment joining two OPPOSITE (non-adjacent) vertices of a quadrilateral. Every quadrilateral has exactly two diagonals.</p>
              </InfoCard>

              <DiagramCard caption="Diagonal SM splits quadrilateral SOME into two triangles -- the key trick behind the angle-sum property" isLightMode={isLightMode}>
                <svg viewBox="0 0 420 260" className="w-full h-auto">
                  <polygon points="80,210 340,210 300,50 130,90" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="80" y1="210" x2="300" y2="50" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="6 4" />
                  {vertexDot(80, 210, "#22d3ee")}{vertexLabel(80, 210, "S", "#22d3ee", -14, 16)}
                  {vertexDot(340, 210, "#fbbf24")}{vertexLabel(340, 210, "M", "#fbbf24", 12, 16)}
                  {vertexDot(300, 50, "#f87171")}{vertexLabel(300, 50, "O", "#f87171", 10, -8)}
                  {vertexDot(130, 90, "#a3e635")}{vertexLabel(130, 90, "E", "#a3e635", -14, -8)}
                  <text x="205" y="145" textAnchor="middle" fontSize="13" fontWeight="800" fill={isLightMode ? "#475569" : "#94a3b8"}>triangle SEM</text>
                  <text x="230" y="95" textAnchor="middle" fontSize="13" fontWeight="800" fill={isLightMode ? "#475569" : "#94a3b8"}>triangle SOM</text>
                </svg>
              </DiagramCard>

              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Diagonal SM splits quadrilateral SOME into triangle SEM and triangle SOM.</li>
                <li>Each triangle's three angles add up to 180 degrees, so together the two triangles give 180 + 180 = 360 degrees.</li>
                <li>Those six small angles are exactly the four corner angles of the quadrilateral (two of the corners get split into two parts each by the diagonal, but the two parts still add up to the full corner angle).</li>
              </ul>

              <FormulaBox isLightMode={isLightMode}>angle S + angle O + angle M + angle E = 360 degrees</FormulaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A quadrilateral has angles 72, 108, and 95 degrees. Find the fourth angle." answer="360 - 72 - 108 - 95 = 85 degrees." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Can a quadrilateral have three obtuse angles and one acute angle? Give one valid example." answer="Yes. For example, 100, 100, 100, and 60 degrees sums to exactly 360 degrees -- three obtuse (over 90 degrees) angles and one acute (under 90 degrees) angle." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A quadrilateral has all four angles equal. What is each angle?" answer="360 / 4 = 90 degrees each." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why can a quadrilateral never have four obtuse angles?" answer="Four angles each greater than 90 degrees would sum to more than 360 degrees, which is impossible for any quadrilateral." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Does the angle-sum property still work for a 'dart'-shaped (non-convex) quadrilateral?" answer="Yes -- as long as one diagonal can still be drawn fully inside the shape, splitting it into two triangles, the total is still 360 degrees." />

              <RememberBox title="Convex vs non-convex" isLightMode={isLightMode}>
                A convex quadrilateral has every diagonal lying fully inside it, and every interior angle under 180 degrees. A non-convex ('dart' or 'arrowhead') quadrilateral has one vertex that caves inward, with one reflex interior angle (over 180 degrees) -- but the angle-sum property of 360 degrees still holds for both.
              </RememberBox>
            </div>
          )}

          {activeTopic === "rectangles" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Rectangles</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The most familiar quadrilateral -- and the one whose diagonal properties unlock every other shape in this chapter.</p>
              </div>

              <InfoCard title="Definition" icon={SquareIcon} isLightMode={isLightMode}>
                <p><b>Rectangle:</b> a quadrilateral in which all four angles are 90 degrees. (Equal opposite sides then follow automatically -- they do not need to be assumed separately.)</p>
                <p><b>Alternative definition:</b> a quadrilateral whose diagonals are equal in length and bisect each other.</p>
              </InfoCard>

              <DiagramCard caption="Rectangle ABCD with diagonals AC and BD meeting at O -- equal in length and bisecting each other" isLightMode={isLightMode}>
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  <polygon points="70,180 350,180 350,50 70,50" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="70" y1="180" x2="350" y2="50" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="70" y1="50" x2="350" y2="180" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
                  {vertexDot(70, 180, strokeMain)}{vertexLabel(70, 180, "A", isLightMode ? "#0f172a" : "#f1f5f9", -12, 16)}
                  {vertexDot(350, 180, strokeMain)}{vertexLabel(350, 180, "B", isLightMode ? "#0f172a" : "#f1f5f9", 12, 16)}
                  {vertexDot(350, 50, strokeMain)}{vertexLabel(350, 50, "C", isLightMode ? "#0f172a" : "#f1f5f9", 12, -10)}
                  {vertexDot(70, 50, strokeMain)}{vertexLabel(70, 50, "D", isLightMode ? "#0f172a" : "#f1f5f9", -12, -10)}
                  {vertexDot(210, 115, "#f87171")}{vertexLabel(210, 115, "O", "#f87171", 16, 6)}
                  <path d="M 82 180 A 12 12 0 0 1 70 168" fill="none" stroke={strokeMain} strokeWidth="2" />
                  <path d="M 338 180 A 12 12 0 0 0 350 168" fill="none" stroke={strokeMain} strokeWidth="2" />
                  <path d="M 350 62 A 12 12 0 0 1 338 50" fill="none" stroke={strokeMain} strokeWidth="2" />
                  <path d="M 82 50 A 12 12 0 0 0 70 62" fill="none" stroke={strokeMain} strokeWidth="2" />
                </svg>
              </DiagramCard>

              <SectionHeading>Properties of a Rectangle</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1" isLightMode={isLightMode}>All four angles of a rectangle are 90 degrees.</FactRow>
                <FactRow label="Property 2" isLightMode={isLightMode}>Opposite sides of a rectangle are equal in length.</FactRow>
                <FactRow label="Property 3" isLightMode={isLightMode}>Opposite sides of a rectangle are parallel to each other.</FactRow>
                <FactRow label="Property 4 (diagonals)" isLightMode={isLightMode}>The diagonals of a rectangle are equal in length, and they bisect each other.</FactRow>
              </div>

              <RememberBox title="The carpenter's trick" isLightMode={isLightMode}>
                Take two straight strips of EQUAL length and join them so they cross at their exact midpoints -- whatever angle they cross at, the quadrilateral formed by their four endpoints is always a perfect rectangle. This is exactly how carpenters check a frame is 'square' without a protractor.
              </RememberBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Rectangle ABCD has diagonals meeting at O. If angle OAB = 32 degrees, find angle AOB." answer="Triangle OAB is isosceles (OA = OB), so angle OBA = 32 degrees too. angle AOB = 180 - 32 - 32 = 116 degrees." />
              <ExampleQ number={2} isLightMode={isLightMode} question="One diagonal of a rectangle is 13 cm. What is the other diagonal?" answer="13 cm -- the diagonals of a rectangle are always equal." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A rectangle has sides 9 cm and 12 cm. Find the length of its diagonal." answer="By Pythagoras: diagonal = sqrt(9^2 + 12^2) = sqrt(81+144) = sqrt(225) = 15 cm." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Two unequal strips are crossed so they bisect each other. Can the result ever be a rectangle?" answer="No -- since the diagonals (the strips) are unequal, one of the two required conditions (equal length) fails, so the result is a general parallelogram, not a rectangle." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A quadrilateral has all four angles equal to 90 degrees. Must its opposite sides be equal?" answer="Yes -- this can be proved using AAS congruence on the two triangles formed by one diagonal, so all-90-degree angles alone is a complete definition of a rectangle." />
            </div>
          )}

          {activeTopic === "squares" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Squares</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A rectangle taken one step further -- the most special quadrilateral of all.</p>
              </div>

              <InfoCard title="Definition" icon={SquareIcon} isLightMode={isLightMode}>
                <p><b>Square:</b> a quadrilateral in which all four angles are 90 degrees, AND all four sides are equal in length.</p>
                <p>Every square is a rectangle (it satisfies the rectangle's angle condition), but not every rectangle is a square.</p>
              </InfoCard>

              <DiagramCard caption="Square ABCD with diagonals equal, bisecting each other at 90 degrees, and bisecting the corner angles" isLightMode={isLightMode}>
                <svg viewBox="0 0 300 220" className="w-full h-auto">
                  <polygon points="70,180 230,180 230,20 70,20" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="70" y1="180" x2="230" y2="20" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="70" y1="20" x2="230" y2="180" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
                  {vertexDot(70, 180, strokeMain)}{vertexLabel(70, 180, "A", isLightMode ? "#0f172a" : "#f1f5f9", -12, 16)}
                  {vertexDot(230, 180, strokeMain)}{vertexLabel(230, 180, "B", isLightMode ? "#0f172a" : "#f1f5f9", 12, 16)}
                  {vertexDot(230, 20, strokeMain)}{vertexLabel(230, 20, "C", isLightMode ? "#0f172a" : "#f1f5f9", 12, -10)}
                  {vertexDot(70, 20, strokeMain)}{vertexLabel(70, 20, "D", isLightMode ? "#0f172a" : "#f1f5f9", -12, -10)}
                  {vertexDot(150, 100, "#f87171")}{vertexLabel(150, 100, "O", "#f87171", 18, 4)}
                  <text x="105" y="165" fontSize="12" fontWeight="800" fill="#a3e635">45°</text>
                  <text x="185" y="165" fontSize="12" fontWeight="800" fill="#a3e635">45°</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Properties of a Square</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1" isLightMode={isLightMode}>All four sides of a square are equal to each other.</FactRow>
                <FactRow label="Property 2" isLightMode={isLightMode}>Opposite sides of a square are parallel to each other.</FactRow>
                <FactRow label="Property 3" isLightMode={isLightMode}>All four angles of a square are 90 degrees.</FactRow>
                <FactRow label="Property 4 (diagonals)" isLightMode={isLightMode}>The diagonals of a square are equal in length, and they bisect each other at 90 degrees.</FactRow>
                <FactRow label="Property 5 (diagonals)" isLightMode={isLightMode}>The diagonals of a square bisect its angles -- each 90 degree corner is split into two 45 degree halves.</FactRow>
              </div>

              <FormulaBox isLightMode={isLightMode}>diagonal = side x sqrt(2)</FormulaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A square has side 7 cm. Find its diagonal." answer="diagonal = 7 x sqrt(2), approximately 9.9 cm." />
              <ExampleQ number={2} isLightMode={isLightMode} question="A square has diagonal 10 cm. Find its side length." answer="side = 10 / sqrt(2) = 5 x sqrt(2), approximately 7.07 cm." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Two perpendicular diameters of a circle are joined at their four endpoints. What shape results?" answer="A square -- the diagonals are equal (both are diameters), bisect each other (both pass through the centre), and are perpendicular (given)." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A rectangle's diagonals are also found to be perpendicular. What can you conclude?" answer="The rectangle must actually be a square, since equal + bisecting (already true for any rectangle) plus perpendicular together guarantee a square." />
              <ExampleQ number={5} isLightMode={isLightMode} question="In square PQRS, diagonal PR bisects angle P. If angle P = 90 degrees, what are the two resulting angles?" answer="45 degrees and 45 degrees." />

              <RememberBox title="Square = Rectangle AND Rhombus" isLightMode={isLightMode}>
                A square is the one shape that is simultaneously a rectangle (all angles 90 degrees) and a rhombus (all sides equal). If you can show BOTH conditions for a quadrilateral, you have proved it is a square -- no need to check anything else.
              </RememberBox>
            </div>
          )}

          {activeTopic === "parallelograms" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Parallelograms</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A bigger family than rectangles -- any quadrilateral with both pairs of opposite sides parallel, whatever its angles.</p>
              </div>

              <InfoCard title="Definition" icon={Shapes} isLightMode={isLightMode}>
                <p><b>Parallelogram:</b> a quadrilateral in which both pairs of opposite sides are parallel.</p>
                <p>Every rectangle is a parallelogram (it has parallel opposite sides too), but a parallelogram does not need any 90 degree angle at all.</p>
              </InfoCard>

              <DiagramCard caption="Parallelogram ABCD (slanted, no right angles) with diagonals meeting at O -- they bisect each other but are not equal" isLightMode={isLightMode}>
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  <polygon points="70,180 290,180 350,40 130,40" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="70" y1="180" x2="350" y2="40" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="130" y1="40" x2="290" y2="180" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
                  {vertexDot(70, 180, strokeMain)}{vertexLabel(70, 180, "A", isLightMode ? "#0f172a" : "#f1f5f9", -12, 16)}
                  {vertexDot(290, 180, strokeMain)}{vertexLabel(290, 180, "B", isLightMode ? "#0f172a" : "#f1f5f9", 12, 16)}
                  {vertexDot(350, 40, strokeMain)}{vertexLabel(350, 40, "C", isLightMode ? "#0f172a" : "#f1f5f9", 12, -10)}
                  {vertexDot(130, 40, strokeMain)}{vertexLabel(130, 40, "D", isLightMode ? "#0f172a" : "#f1f5f9", -12, -10)}
                  {vertexDot(210, 110, "#f87171")}{vertexLabel(210, 110, "O", "#f87171", 18, 4)}
                </svg>
              </DiagramCard>

              <SectionHeading>Properties of a Parallelogram</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1" isLightMode={isLightMode}>Opposite sides of a parallelogram are equal in length.</FactRow>
                <FactRow label="Property 2" isLightMode={isLightMode}>Opposite sides of a parallelogram are parallel (this is its defining condition).</FactRow>
                <FactRow label="Property 3" isLightMode={isLightMode}>Adjacent angles add up to 180 degrees, and opposite angles are equal.</FactRow>
                <FactRow label="Property 4 (diagonals)" isLightMode={isLightMode}>The diagonals of a parallelogram bisect each other (but are not necessarily equal or perpendicular).</FactRow>
              </div>

              <FormulaBox isLightMode={isLightMode}>angle A + angle B = 180°,  angle A = angle C,  angle B = angle D</FormulaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="In parallelogram ABCD, angle A = 58 degrees. Find angle B, angle C, and angle D." answer="angle B = 180 - 58 = 122 degrees. angle C = angle A = 58 degrees (opposite). angle D = angle B = 122 degrees (opposite)." />
              <ExampleQ number={2} isLightMode={isLightMode} question="The adjacent angles of a parallelogram are in the ratio 4:5. Find both angles." answer="4x + 5x = 180, so x = 20. Angles are 80 and 100 degrees." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A parallelogram has one diagonal of 9 cm. Can you assume the other diagonal is also 9 cm?" answer="No -- a general parallelogram's diagonals are not necessarily equal. Equal diagonals is a special property of rectangles only." />
              <ExampleQ number={4} isLightMode={isLightMode} question="ABCD is a quadrilateral with AB = CD and AB parallel to CD. What type of quadrilateral must it be?" answer="A parallelogram -- one pair of opposite sides being both equal AND parallel is enough (proved using SAS congruence with a diagonal) to guarantee both pairs are parallel." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A parallelogram has one 90 degree angle. What can you conclude about the whole shape?" answer="It must be a rectangle -- one right angle forces all four angles to be 90 degrees, using the adjacent-supplementary and opposite-equal angle rules." />

              <RememberBox title="Every rectangle is a parallelogram" isLightMode={isLightMode}>
                Rectangles, rhombuses, and squares are all SPECIAL types of parallelograms with one or more extra conditions added (90 degree angles, equal sides, or both). Any property true for a general parallelogram is automatically true for all three of these special cases too.
              </RememberBox>
            </div>
          )}

          {activeTopic === "rhombuses" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Rhombuses</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The 'equal-sides' cousin of the rectangle -- and the shape with the most useful diagonal properties for calculations.</p>
              </div>

              <InfoCard title="Definition" icon={Diamond} isLightMode={isLightMode}>
                <p><b>Rhombus:</b> a quadrilateral in which all four sides are of equal length.</p>
                <p>Since equal sides force both pairs of opposite sides to be parallel too (provable via alternate angles), every rhombus is automatically a parallelogram as well.</p>
              </InfoCard>

              <DiagramCard caption="Rhombus ABCD with diagonals bisecting each other at 90 degrees, and bisecting the vertex angles" isLightMode={isLightMode}>
                <svg viewBox="0 0 300 220" className="w-full h-auto">
                  <polygon points="150,15 260,110 150,205 40,110" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="150" y1="15" x2="150" y2="205" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="40" y1="110" x2="260" y2="110" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
                  {vertexDot(150, 15, strokeMain)}{vertexLabel(150, 15, "A", isLightMode ? "#0f172a" : "#f1f5f9", 0, -10)}
                  {vertexDot(260, 110, strokeMain)}{vertexLabel(260, 110, "B", isLightMode ? "#0f172a" : "#f1f5f9", 16, 5)}
                  {vertexDot(150, 205, strokeMain)}{vertexLabel(150, 205, "C", isLightMode ? "#0f172a" : "#f1f5f9", 0, 22)}
                  {vertexDot(40, 110, strokeMain)}{vertexLabel(40, 110, "D", isLightMode ? "#0f172a" : "#f1f5f9", -16, 5)}
                  {vertexDot(150, 110, "#f87171")}{vertexLabel(150, 110, "O", "#f87171", 18, -6)}
                </svg>
              </DiagramCard>

              <SectionHeading>Properties of a Rhombus</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1" isLightMode={isLightMode}>All four sides of a rhombus are equal to each other.</FactRow>
                <FactRow label="Property 2" isLightMode={isLightMode}>Opposite sides of a rhombus are parallel to each other.</FactRow>
                <FactRow label="Property 3" isLightMode={isLightMode}>Adjacent angles add up to 180 degrees, and opposite angles are equal (it is a parallelogram).</FactRow>
                <FactRow label="Property 4 (diagonals)" isLightMode={isLightMode}>The diagonals of a rhombus bisect each other.</FactRow>
                <FactRow label="Property 5 (diagonals)" isLightMode={isLightMode}>The diagonals of a rhombus bisect its vertex angles.</FactRow>
                <FactRow label="Property 6 (diagonals)" isLightMode={isLightMode}>The diagonals of a rhombus intersect each other at 90 degrees.</FactRow>
              </div>

              <FormulaBox isLightMode={isLightMode}>side = sqrt[(half of d1)^2 + (half of d2)^2]</FormulaBox>
              <FormulaBox isLightMode={isLightMode}>area of a rhombus = (1/2) x d1 x d2</FormulaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A rhombus has diagonals 12 cm and 16 cm. Find its side length." answer="Half-diagonals are 6 cm and 8 cm; side = sqrt(6^2+8^2) = sqrt(100) = 10 cm." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Using the same rhombus (diagonals 12 cm and 16 cm), find its area." answer="Area = (1/2) x 12 x 16 = 96 square cm." />
              <ExampleQ number={3} isLightMode={isLightMode} question="In rhombus ABCD, angle A = 74 degrees. Find angle B." answer="A rhombus is a parallelogram, so adjacent angles are supplementary: 180 - 74 = 106 degrees." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Two equilateral triangles of side 6 cm are joined along a full side. What shape results, and what are its angles?" answer="A rhombus with all sides 6 cm and angles 60, 120, 60, 120 degrees." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A rhombus has one right angle. What can you conclude?" answer="It must be a square -- the right angle forces all four angles to 90 degrees (supplementary/opposite-angle rules), and the sides were already all equal." />

              <RememberBox title="Kite, rhombus, or both?" isLightMode={isLightMode}>
                Every rhombus is a kite (its equal sides trivially satisfy the kite's two-pairs-of-adjacent-equal-sides condition), but a general kite is NOT a rhombus, since a kite's two side-pairs need not match each other in length.
              </RememberBox>
            </div>
          )}

          {activeTopic === "kites" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Kites</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Shaped exactly like the toy -- two distinct pairs of adjacent equal sides, with just one diagonal doing all the bisecting.</p>
              </div>

              <InfoCard title="Definition" icon={Triangle} isLightMode={isLightMode}>
                <p><b>Kite:</b> a quadrilateral ABCD that can be labelled so that AB = BC, and CD = DA -- two DISTINCT pairs of adjacent equal sides (the two pairs need not be equal to each other).</p>
              </InfoCard>

              <DiagramCard caption="Kite ABCD: AB=BC and CD=DA. Diagonal BD bisects diagonal AC perpendicularly, and bisects angle B and angle D" isLightMode={isLightMode}>
                <svg viewBox="0 0 300 220" className="w-full h-auto">
                  <polygon points="150,10 230,95 150,205 70,95" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="150" y1="10" x2="150" y2="205" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="70" y1="95" x2="230" y2="95" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
                  {vertexDot(150, 10, strokeMain)}{vertexLabel(150, 10, "B", isLightMode ? "#0f172a" : "#f1f5f9", 0, -8)}
                  {vertexDot(230, 95, strokeMain)}{vertexLabel(230, 95, "C", isLightMode ? "#0f172a" : "#f1f5f9", 18, 4)}
                  {vertexDot(150, 205, strokeMain)}{vertexLabel(150, 205, "D", isLightMode ? "#0f172a" : "#f1f5f9", 0, 22)}
                  {vertexDot(70, 95, strokeMain)}{vertexLabel(70, 95, "A", isLightMode ? "#0f172a" : "#f1f5f9", -18, 4)}
                  {vertexDot(150, 95, "#f87171")}{vertexLabel(150, 95, "O", "#f87171", 18, -6)}
                </svg>
              </DiagramCard>

              <SectionHeading>Properties of a Kite</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1 (diagonals)" isLightMode={isLightMode}>In kite ABCD (AB=BC, CD=DA), diagonal BD bisects diagonal AC, and is perpendicular to it.</FactRow>
                <FactRow label="Property 2 (diagonals)" isLightMode={isLightMode}>Diagonal BD also bisects angle ABC and angle ADC (the angles between the UNEQUAL side pairs).</FactRow>
                <FactRow label="Property 3" isLightMode={isLightMode}>The angles at A and C (between the equal side pairs) are equal to each other -- the kite is symmetric about diagonal BD.</FactRow>
              </div>

              <RememberBox title="Only ONE diagonal is bisected" isLightMode={isLightMode}>
                This is the single most common mistake with kites: unlike a rhombus, a kite's SECOND diagonal (AC here) is NOT necessarily bisected by the first -- only diagonal BD does the bisecting (of AC), and only BD is bisected in half by nothing else, i.e. BD itself can be split unevenly by AC.
              </RememberBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Construct a kite whose diagonals are 6 cm and 10 cm, where the 6 cm diagonal is the one that gets bisected." answer="Draw a 6 cm segment, mark its midpoint, draw a perpendicular through that midpoint, and mark two points on it (for example 4 cm and 6 cm from the midpoint) whose distances add to 10 cm -- these do not need to be equal." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Is every kite a rhombus?" answer="No -- only when its two pairs of equal sides happen to also equal each other, making all four sides equal." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Is every rhombus a kite?" answer="Yes -- a rhombus's four equal sides automatically satisfy the kite's two-adjacent-equal-pairs condition." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A kite has diagonals 8 cm and 14 cm, with the 8 cm diagonal bisected. Find the length of each half of that diagonal." answer="8 / 2 = 4 cm each." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Can a kite ever also be a rectangle (other than being a square)?" answer="No -- a kite that is also a rectangle would need all four sides equal (to match both shapes' vertex conditions), which forces it to be a square." />
            </div>
          )}

          {activeTopic === "trapeziums" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Trapeziums</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The loosest quadrilateral family in this chapter -- just ONE pair of parallel sides is enough to qualify.</p>
              </div>

              <InfoCard title="Definitions" icon={Ruler} isLightMode={isLightMode}>
                <p><b>Trapezium:</b> a quadrilateral with at least one pair of parallel opposite sides.</p>
                <p><b>Isosceles trapezium:</b> a trapezium whose two non-parallel sides (legs) are equal in length.</p>
              </InfoCard>

              <DiagramCard caption="Isosceles trapezium PQRS with PQ parallel to SR, and equal legs PS and QR" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 200" className="w-full h-auto">
                  <polygon points="60,170 320,170 250,30 130,30" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <line x1="60" y1="170" x2="130" y2="30" stroke={strokeDash} strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="320" y1="170" x2="250" y2="30" stroke={strokeDash} strokeWidth="1.5" strokeDasharray="4 3" />
                  {vertexDot(60, 170, strokeMain)}{vertexLabel(60, 170, "P", isLightMode ? "#0f172a" : "#f1f5f9", -12, 16)}
                  {vertexDot(320, 170, strokeMain)}{vertexLabel(320, 170, "Q", isLightMode ? "#0f172a" : "#f1f5f9", 12, 16)}
                  {vertexDot(250, 30, strokeMain)}{vertexLabel(250, 30, "R", isLightMode ? "#0f172a" : "#f1f5f9", 12, -10)}
                  {vertexDot(130, 30, strokeMain)}{vertexLabel(130, 30, "S", isLightMode ? "#0f172a" : "#f1f5f9", -12, -10)}
                  <text x="190" y="15" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">SR parallel to PQ</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Properties</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Property 1 (any trapezium)" isLightMode={isLightMode}>Since PQ is parallel to SR, angle P + angle S = 180 degrees, and angle Q + angle R = 180 degrees (co-interior angle pairs).</FactRow>
                <FactRow label="Property 2 (isosceles trapezium only)" isLightMode={isLightMode}>The base angles at the same parallel side are equal: angle P = angle Q. The diagonals are also equal in length.</FactRow>
              </div>

              <RememberBox title="At LEAST one pair -- not both" isLightMode={isLightMode}>
                The word 'at least' matters: any parallelogram (rectangle, rhombus, square included) technically satisfies the trapezium's loose condition too, since it has two parallel pairs, which is more than enough. In practice, 'trapezium' usually refers to a shape with EXACTLY one parallel pair, to distinguish it from the parallelogram family.
              </RememberBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="In trapezium ABCD, AB is parallel to CD. If angle A = 72 degrees, find angle D." answer="angle D = 180 - 72 = 108 degrees (co-interior angles)." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Isosceles trapezium PQRS has PQ parallel to SR and angle S = 115 degrees. Find angle P, angle Q, and angle R." answer="angle P = 180 - 115 = 65 degrees. Since isosceles, angle Q = angle P = 65 degrees, and angle R = angle S = 115 degrees." />
              <ExampleQ number={3} isLightMode={isLightMode} question="An isosceles trapezium has parallel sides 8 cm and 20 cm, and height 8 cm. Find the length of each leg." answer="Horizontal offset each side = (20-8)/2 = 6 cm. leg = sqrt(6^2+8^2) = sqrt(100) = 10 cm." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why does an isosceles trapezium have equal diagonals, but a general (non-isosceles) trapezium does not?" answer="An isosceles trapezium is symmetric about the perpendicular bisector of its parallel sides, and this symmetry makes both diagonals mirror images of each other, hence equal. A general trapezium has no such symmetry." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Is every isosceles trapezium a parallelogram?" answer="No -- it only has ONE pair of parallel sides (the two bases); its legs, though equal, are not parallel to each other." />
            </div>
          )}

          {activeTopic === "relationships" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">How They All Relate</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Every shape in this chapter is a special case of a bigger, looser family. This is the whole chapter in one picture.</p>
              </div>

              <DiagramCard caption="Nested families: every square is a rectangle AND a rhombus; every rhombus is a kite; every parallelogram (and hence rectangle/rhombus/square) is a trapezium" isLightMode={isLightMode}>
                <svg viewBox="0 0 460 320" className="w-full h-auto">
                  <rect x="10" y="10" width="440" height="300" rx="24" fill="none" stroke="#a3e635" strokeWidth="2" />
                  <text x="28" y="34" fontSize="14" fontWeight="800" fill="#a3e635">Trapezium</text>

                  <rect x="40" y="66" width="380" height="224" rx="20" fill="none" stroke="#22d3ee" strokeWidth="2" />
                  <text x="58" y="90" fontSize="14" fontWeight="800" fill="#22d3ee">Parallelogram</text>

                  <circle cx="180" cy="205" r="88" fill={isLightMode ? "#fef3c7" : "#451a0330"} fillOpacity="0.35" stroke="#fbbf24" strokeWidth="2" />
                  <text x="105" y="150" fontSize="13" fontWeight="800" fill="#fbbf24">Rectangle</text>

                  <circle cx="300" cy="205" r="88" fill={isLightMode ? "#fee2e2" : "#4c051530"} fillOpacity="0.35" stroke="#f87171" strokeWidth="2" />
                  <text x="330" y="150" fontSize="13" fontWeight="800" fill="#f87171">Rhombus</text>

                  <text x="216" y="215" fontSize="12" fontWeight="800" fill={isLightMode ? "#0f172a" : "#ffffff"}>Square</text>

                  <circle cx="392" cy="255" r="62" fill={isLightMode ? "#ede9fe" : "#2e105530"} fillOpacity="0.35" stroke="#a78bfa" strokeWidth="2" />
                  <text x="368" y="300" fontSize="13" fontWeight="800" fill="#a78bfa">Kite</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Reading the Diagram</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li><b>Trapezium</b> is the outermost, loosest family (just one pair of parallel sides needed) -- every other shape here fits inside it.</li>
                <li><b>Parallelogram</b> sits inside Trapezium (it has TWO parallel pairs, which is stricter).</li>
                <li><b>Rectangle</b> and <b>Rhombus</b> both sit inside Parallelogram, as two different, overlapping special cases.</li>
                <li><b>Square</b> is exactly the overlap of Rectangle and Rhombus -- the shape that is both at once.</li>
                <li><b>Kite</b> is drawn separately, mostly OUTSIDE the Parallelogram box, but overlapping Rhombus -- because a rhombus is always a kite, but a general kite is not a parallelogram at all.</li>
              </ul>

              <SectionHeading>Quick-Answer Table</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Is every rectangle a parallelogram?" isLightMode={isLightMode}>Yes.</FactRow>
                <FactRow label="Is every parallelogram a rectangle?" isLightMode={isLightMode}>No -- only if it also has a 90 degree angle.</FactRow>
                <FactRow label="Is every rhombus a parallelogram?" isLightMode={isLightMode}>Yes.</FactRow>
                <FactRow label="Is every square a rhombus?" isLightMode={isLightMode}>Yes.</FactRow>
                <FactRow label="Is every rhombus a square?" isLightMode={isLightMode}>No -- only if it also has a 90 degree angle.</FactRow>
                <FactRow label="Is every kite a rhombus?" isLightMode={isLightMode}>No -- only if its two side-pairs happen to be equal to each other too.</FactRow>
                <FactRow label="Is every rhombus a kite?" isLightMode={isLightMode}>Yes.</FactRow>
                <FactRow label="Is every parallelogram a trapezium?" isLightMode={isLightMode}>Yes (it has at least one parallel pair -- in fact two).</FactRow>
                <FactRow label="Is every trapezium a parallelogram?" isLightMode={isLightMode}>No -- a trapezium only needs ONE parallel pair.</FactRow>
              </div>

              <RememberBox title="Going 'down' always adds a condition" isLightMode={isLightMode}>
                Every step from a bigger family to a smaller one (trapezium to parallelogram to rectangle/rhombus to square) adds exactly one extra requirement -- more parallel sides, then a right angle, or equal sides, or both. Nothing is ever removed.
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
                <FactRow label="Quadrilateral" isLightMode={isLightMode}>a closed four-sided plane figure.</FactRow>
                <FactRow label="Diagonal" isLightMode={isLightMode}>a segment joining two opposite (non-adjacent) vertices.</FactRow>
                <FactRow label="Angle-sum property" isLightMode={isLightMode}>all four angles of any quadrilateral add up to 360 degrees.</FactRow>
                <FactRow label="Bisect" isLightMode={isLightMode}>to divide into two equal parts.</FactRow>
                <FactRow label="Rectangle" isLightMode={isLightMode}>all angles 90 degrees; diagonals equal and bisecting.</FactRow>
                <FactRow label="Square" isLightMode={isLightMode}>all angles 90 degrees and all sides equal; diagonals equal, bisecting, and perpendicular.</FactRow>
                <FactRow label="Parallelogram" isLightMode={isLightMode}>both pairs of opposite sides parallel; diagonals bisect each other.</FactRow>
                <FactRow label="Rhombus" isLightMode={isLightMode}>all sides equal; diagonals bisect each other perpendicularly, and bisect the angles.</FactRow>
                <FactRow label="Kite" isLightMode={isLightMode}>two distinct pairs of adjacent equal sides; one diagonal bisects the other perpendicularly.</FactRow>
                <FactRow label="Trapezium" isLightMode={isLightMode}>at least one pair of parallel opposite sides.</FactRow>
                <FactRow label="Isosceles trapezium" isLightMode={isLightMode}>a trapezium with equal legs; equal base angles and equal diagonals.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={Shapes} title="Angle Sum" color="cyan" isLightMode={isLightMode} points={[
                  "Every quadrilateral: 360 degrees",
                  "Proved by splitting into 2 triangles",
                  "Works even for non-convex 'dart' shapes",
                ]} />
                <MindMapBranch icon={SquareIcon} title="Rectangle & Square" color="amber" isLightMode={isLightMode} points={[
                  "Rectangle: all angles 90 degrees",
                  "Square = rectangle + all sides equal",
                  "Diagonals: equal, bisecting (+perpendicular for square)",
                ]} />
                <MindMapBranch icon={GitBranch} title="Parallelogram" color="sky" isLightMode={isLightMode} points={[
                  "Both pairs of opposite sides parallel",
                  "Adjacent angles supplementary, opposite equal",
                  "Diagonals bisect each other",
                ]} />
                <MindMapBranch icon={Diamond} title="Rhombus" color="rose" isLightMode={isLightMode} points={[
                  "All four sides equal",
                  "Diagonals: perpendicular AND bisecting",
                  "Diagonals bisect the vertex angles",
                ]} />
                <MindMapBranch icon={Triangle} title="Kite" color="indigo" isLightMode={isLightMode} points={[
                  "Two distinct adjacent-equal side pairs",
                  "Only ONE diagonal is bisected",
                  "That diagonal is perpendicular to the other",
                ]} />
                <MindMapBranch icon={Ruler} title="Trapezium" color="emerald" isLightMode={isLightMode} points={[
                  "At least one parallel pair",
                  "Isosceles: equal legs, equal diagonals",
                  "Co-interior angles sum to 180 degrees",
                ]} />
              </div>

              <RememberBox title="You've completed the Quadrilaterals chapter!" isLightMode={isLightMode}>
                Go back to any topic using the sidebar whenever you need to revise. Then try the solved practice questions, the question bank, and the self-assessment quiz to test what you remember.
              </RememberBox>
            </div>
          )}

          {activeTopic === "competition-corner" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Competition Corner</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The regular syllabus covers the basics. Olympiad and NTSE-style papers often push these same ideas one step further -- this topic covers what commonly gets added on top, at a Class 8 level.</p>
              </div>

              <SectionHeading>Ideas That Go a Step Further</SectionHeading>

              <InfoCard title="Varignon's Parallelogram (the midpoint theorem, for ANY quadrilateral)" icon={GitBranch} isLightMode={isLightMode}>
                <p>Take ANY quadrilateral at all -- not just a square -- and join the midpoints of its four sides in order. The result is ALWAYS a parallelogram, no matter how irregular the original shape is.</p>
                <p>The sides of this midpoint parallelogram are parallel to the original quadrilateral's two diagonals, and exactly HALF their length. Its area is always exactly half the original quadrilateral's area.</p>
              </InfoCard>

              <InfoCard title="Cyclic Quadrilaterals" icon={Diamond} isLightMode={isLightMode}>
                <p>A cyclic quadrilateral is one whose four vertices all lie on a single circle. Every rectangle is cyclic (its equal, bisecting diagonals are all radii of a circle centred at their crossing point), but a general parallelogram, rhombus, or kite is not.</p>
                <p><b>Key property:</b> in a cyclic quadrilateral, opposite angles always add up to 180 degrees.</p>
              </InfoCard>

              <InfoCard title="Area Formulas Worth Knowing" icon={Ruler} isLightMode={isLightMode}>
                <p><b>Trapezium:</b> area = (1/2) x (sum of the parallel sides) x (height between them).</p>
                <p><b>Kite:</b> area = (1/2) x d1 x d2 (same formula as a rhombus, since a kite's diagonals are always perpendicular too).</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Coordinate check for a parallelogram" isLightMode={isLightMode}>plot the four vertices and find the midpoint of each diagonal -- if both diagonals share the exact same midpoint, the quadrilateral is a parallelogram.</FactRow>
                <FactRow label="Coordinate check for a rhombus" isLightMode={isLightMode}>after confirming a parallelogram, check that one pair of adjacent sides has equal length using the distance formula.</FactRow>
                <FactRow label="A rhombus always has a whole-number-friendly Pythagorean link" isLightMode={isLightMode}>since side, half of d1, and half of d2 form a right triangle, rhombus problems often use Pythagorean triples like (3,4,5), (6,8,10), or (5,12,13).</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Competitive papers love combining two ideas in one question -- for example, using Varignon's theorem to find a midpoint-parallelogram's side, then asking for ITS area too. Always re-read the full question before deciding which property to apply first.
              </RememberBox>

              <SectionHeading>Solved Competitive Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="A quadrilateral (of any shape) has diagonals of length 10 cm and 14 cm. Find the side lengths of the parallelogram formed by joining the midpoints of its four sides." answer="By Varignon's theorem, the midpoint parallelogram's sides are parallel to the diagonals and exactly half their length: 10/2 = 5 cm and 14/2 = 7 cm." />
              <ExampleQ number={2} isLightMode={isLightMode} question="ABCD is a cyclic quadrilateral with angle A = 108 degrees. Find angle C." answer="Opposite angles of a cyclic quadrilateral sum to 180 degrees, so angle C = 180 - 108 = 72 degrees." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A trapezium has parallel sides of 12 cm and 18 cm, and a height of 10 cm. Find its area." answer="Area = (1/2) x (12+18) x 10 = (1/2) x 30 x 10 = 150 square cm." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A kite has diagonals of 9 cm and 16 cm. Find its area." answer="Area = (1/2) x 9 x 16 = 72 square cm, using the same formula as a rhombus since a kite's diagonals are always perpendicular." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A rhombus has perimeter 52 cm, and one diagonal is 24 cm. Find the length of the other diagonal and the area of the rhombus." answer="Side = 52/4 = 13 cm. Half of the known diagonal = 12 cm. By Pythagoras, half of the other diagonal = sqrt(13^2 - 12^2) = sqrt(169-144) = sqrt(25) = 5 cm, so the other diagonal = 10 cm. Area = (1/2) x 24 x 10 = 120 square cm." />
              <ExampleQ number={6} isLightMode={isLightMode} question="Quadrilateral WXYZ has diagonals that share the exact same midpoint (2, 3). What can you immediately conclude about WXYZ?" answer="WXYZ must be a parallelogram, since diagonals sharing a common midpoint is exactly the coordinate-geometry test for diagonals bisecting each other." />
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
                      Complete Notes
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

export default LearnMaths8;
