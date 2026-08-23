import React, { useState } from "react";
import {
  BookOpen,
  Award,
  HelpCircle,
  Leaf,
  Droplet,
  Zap,
  Wind,
  HeartPulse,
  Network,
  GitBranch,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Dna,
  Filter,
} from "lucide-react";

type BioTopicId =
  | "life-processes-intro"
  | "autotrophic-nutrition"
  | "heterotrophic-nutrition"
  | "human-digestion"
  | "respiration-pathways"
  | "human-respiratory-system"
  | "the-heart"
  | "blood-vessels-lymph"
  | "double-circulation"
  | "transport-in-plants"
  | "excretion-humans"
  | "excretion-plants"
  | "glossary-mindmap"
  | "competitive-corner";

interface BioTopic {
  id: BioTopicId;
  title: string;
  category: string;
}

const BIO_TOPICS: BioTopic[] = [
  { id: "life-processes-intro", title: "1. What Are Life Processes?", category: "Fundamentals" },
  { id: "autotrophic-nutrition", title: "2. Autotrophic Nutrition & Photosynthesis", category: "Nutrition" },
  { id: "heterotrophic-nutrition", title: "3. Heterotrophic Nutrition", category: "Nutrition" },
  { id: "human-digestion", title: "4. Nutrition in Human Beings", category: "Nutrition" },
  { id: "respiration-pathways", title: "5. Respiration & Breakdown of Glucose", category: "Respiration" },
  { id: "human-respiratory-system", title: "6. The Human Respiratory System", category: "Respiration" },
  { id: "the-heart", title: "7. The Heart & Blood Circulation", category: "Transportation" },
  { id: "blood-vessels-lymph", title: "8. Blood Vessels, Blood Pressure & Lymph", category: "Transportation" },
  { id: "double-circulation", title: "9. Double Circulation Across Animals", category: "Transportation" },
  { id: "transport-in-plants", title: "10. Transportation in Plants", category: "Transportation" },
  { id: "excretion-humans", title: "11. Excretion in Human Beings", category: "Excretion" },
  { id: "excretion-plants", title: "12. Excretion in Plants & Dialysis", category: "Excretion" },
  { id: "glossary-mindmap", title: "13. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competitive-corner", title: "14. Competitive Corner", category: "Advanced" },
];

interface LearnBiology10Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// ── Reusable building blocks (same visual language as the Class IX Biology notes) ──

const InfoCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-[#0f1a12] border border-green-500/15 p-5 rounded-2xl space-y-3 shadow-md">
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-green-400" />
      <h3 className="text-sm font-black uppercase tracking-wider text-green-300 font-mono">{title}</h3>
    </div>
    <div className="space-y-3 text-sm font-semibold leading-relaxed text-slate-300">{children}</div>
  </div>
);

const RememberBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1">
      <HelpCircle className="w-3.5 h-3.5" /> {title}
    </h5>
    <div className="text-slate-350 text-[14px] font-sans leading-relaxed">{children}</div>
  </div>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-green-300 font-mono">
    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
    <span>{children}</span>
  </div>
);

const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sm text-slate-300 font-semibold">
    <span className="text-white font-black">{label}:</span> <span>{children}</span>
  </div>
);

const ExampleQ: React.FC<{ number: number; question: string; answer: string }> = ({ number, question, answer }) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
    <p className="text-sm font-bold leading-relaxed text-slate-300"><span className="text-green-400 font-mono">Q{number}.</span> {question}</p>
    <p className="text-sm font-semibold leading-relaxed text-slate-300"><span className="text-emerald-400 font-black">Answer: </span>{answer}</p>
  </div>
);

const CompareTable: React.FC<{
  leftHeader: string;
  rightHeader: string;
  rows: [string, string][];
  isLightMode?: boolean;
}> = ({ leftHeader, rightHeader, rows, isLightMode = false }) => (
  <div className={`overflow-hidden rounded-xl border ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
    <div className={`grid grid-cols-2 text-[12.5px] font-black uppercase tracking-wider ${isLightMode ? "bg-slate-800 text-white" : "bg-green-950/50 text-green-300"}`}>
      <div className="px-3 py-2 border-r border-slate-700/50">{leftHeader}</div>
      <div className="px-3 py-2">{rightHeader}</div>
    </div>
    <div className={`divide-y ${isLightMode ? "divide-slate-200" : "divide-slate-800"}`}>
      {rows.map(([l, r], i) => (
        <div key={i} className={`grid grid-cols-2 text-[14px] font-semibold ${isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
          <div className={`px-3 py-2 border-r ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>{l}</div>
          <div className="px-3 py-2">{r}</div>
        </div>
      ))}
    </div>
  </div>
);

const DiagramCard: React.FC<{ caption: string; children: React.ReactNode; isLightMode?: boolean }> = ({ caption, children, isLightMode = false }) => (
  <div className="space-y-2">
    <div className={`rounded-2xl border p-3 shadow-lg ${isLightMode ? "bg-white border-slate-200" : "bg-[#0b1710] border-slate-800"}`}>
      {children}
    </div>
    <p className={`text-center text-[13px] font-bold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>{caption}</p>
  </div>
);

// A numbered marker placed ON a diagram, paired with a numbered legend list beside/below it.
// Deliberately used instead of free-floating text labels for every densely-labelled
// figure in this chapter (a leaf cross-section, the alimentary canal, the respiratory system,
// the heart) -- with 8-13 real labels per figure, positioning that much text directly around a
// small diagram risks exactly the label/label and label/line overlap the notes must never have.
// A numbered dot has zero text to collide with anything; the legend is a plain list.
const NumMarker: React.FC<{ x: number; y: number; n: number; isLightMode?: boolean }> = ({ x, y, n, isLightMode = false }) => (
  <g>
    <circle cx={x} cy={y} r="11" fill={isLightMode ? "#065f46" : "#34d399"} stroke={isLightMode ? "#ffffff" : "#052e18"} strokeWidth="2" />
    <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill={isLightMode ? "#ffffff" : "#052e18"}>{n}</text>
  </g>
);

const NumberedLegend: React.FC<{ items: string[]; isLightMode?: boolean }> = ({ items, isLightMode = false }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-3 pt-3 border-t ${isLightMode ? "border-slate-200" : "border-slate-800/60"}`}>
    {items.map((label, i) => (
      <div key={i} className="flex items-center gap-2 text-[13px] font-bold">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isLightMode ? "bg-emerald-800 text-white" : "bg-emerald-400 text-emerald-950"}`}>{i + 1}</span>
        <span className={isLightMode ? "text-slate-700" : "text-slate-300"}>{label}</span>
      </div>
    ))}
  </div>
);

type MindMapColor = "green" | "emerald" | "indigo" | "orange" | "amber" | "rose" | "cyan";

const MIND_MAP_PALETTE: Record<MindMapColor, { dark: string; light: string; icon: string }> = {
  green: { dark: "bg-green-950/30 border-green-500/25 text-green-300", light: "bg-green-50 border-green-300 text-green-900", icon: "text-green-400" },
  emerald: { dark: "bg-emerald-950/30 border-emerald-500/25 text-emerald-300", light: "bg-emerald-50 border-emerald-300 text-emerald-900", icon: "text-emerald-500" },
  indigo: { dark: "bg-indigo-950/30 border-indigo-500/25 text-indigo-300", light: "bg-indigo-50 border-indigo-300 text-indigo-900", icon: "text-indigo-400" },
  orange: { dark: "bg-orange-950/30 border-orange-500/25 text-orange-300", light: "bg-orange-50 border-orange-300 text-orange-900", icon: "text-orange-500" },
  amber: { dark: "bg-amber-950/30 border-amber-500/25 text-amber-300", light: "bg-amber-50 border-amber-300 text-amber-900", icon: "text-amber-500" },
  rose: { dark: "bg-rose-950/30 border-rose-500/25 text-rose-300", light: "bg-rose-50 border-rose-300 text-rose-900", icon: "text-rose-500" },
  cyan: { dark: "bg-cyan-950/30 border-cyan-500/25 text-cyan-300", light: "bg-cyan-50 border-cyan-300 text-cyan-900", icon: "text-cyan-400" },
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

export function LearnBiology10({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnBiology10Props) {
  const [activeTopic, setActiveTopic] = useState<BioTopicId>("life-processes-intro");

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-biology10-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-green-500" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-green-400"}`}>Life Processes</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-green-500" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Life Processes Notes</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Nutrition, respiration, transportation, and excretion -- how living things keep themselves running.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {BIO_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 group ${
                activeTopic === topic.id
                  ? isLightMode
                    ? "bg-green-50 border border-green-300"
                    : "bg-green-950/40 border border-green-500/30"
                  : "border border-transparent hover:bg-slate-800/40"
              }`}
            >
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeTopic === topic.id ? "text-green-400" : "text-slate-500"}`}>
                {topic.category}
              </span>
              <span className={`text-sm font-bold ${activeTopic === topic.id ? (isLightMode ? "text-green-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>
                {topic.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-biology10-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-biology10-main p, #learn-biology10-main li, #learn-biology10-main span, #learn-biology10-main label, #learn-biology10-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-biology10-main b, #learn-biology10-main strong, #learn-biology10-main h1, #learn-biology10-main h2, #learn-biology10-main h3, #learn-biology10-main h4, #learn-biology10-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-biology10-container .bg-slate-900, #learn-biology10-container .bg-\\[\\#0d1424\\], #learn-biology10-container .bg-\\[\\#0f1a12\\], #learn-biology10-container .bg-slate-950, #learn-biology10-container .bg-\\[\\#0b1710\\] {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-biology10-container .border-slate-800, #learn-biology10-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-green-50 via-emerald-50 to-green-50 border-green-300" : "from-green-950/40 via-[#0a2018]/40 to-emerald-950/40 border-green-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-green-400 tracking-tight">Life Processes, Notes</h4>
              </div>
            </div>
          </div>

          {activeTopic === "life-processes-intro" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">What Are Life Processes?</h1>
                <p className="text-base font-semibold text-slate-400">The basic "maintenance jobs" every living thing must keep doing, even while resting or asleep.</p>
              </div>

              <InfoCard title="Deciding What Counts as 'Alive'" icon={Award}>
                <p>Visible movement (a dog running, a cow chewing) seems like an obvious sign of life -- but a plant's growth is movement too, just far slower. Even something that looks perfectly still has constant, invisible movement happening at the molecular level inside its cells.</p>
                <p>Biologists use this <b className="text-white">molecular movement</b> -- the ongoing chemical activity that maintains and repairs an organism's structure -- as the real criterion for life, not just visible motion.</p>
              </InfoCard>

              <SectionHeading>Why Viruses Are Controversial</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">A virus shows no molecular movement of its own -- until it infects a living cell and hijacks that cell's machinery. This is exactly why whether viruses count as "alive" is still debated among biologists.</p>

              <SectionHeading>Life Processes = Maintenance</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Every living organism is a highly organised structure. The environment constantly works to break this order down, so an organism must continuously repair and maintain itself.</li>
                <li><b>Life processes</b> are the processes that together perform this "maintenance job" -- and they carry on even when the body is completely inactive or asleep.</li>
                <li>Since maintenance needs energy and material from outside the body, <b>nutrition</b> (bringing in food) and, for growth, additional raw material, are both essential.</li>
                <li>Most food sources on Earth are carbon-based, since life on Earth itself is carbon-based.</li>
              </ul>

              <SectionHeading>Why Multicellular Organisms Need More Than Diffusion</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Single-Celled Organisms</h4>
                  <p className="text-sm font-semibold">No specialised organs needed -- the <b>entire body surface</b> is in direct contact with the environment, so simple diffusion is enough.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">Multicellular Organisms</h4>
                  <p className="text-sm font-semibold">Most cells are <b>not</b> in contact with the environment -- diffusion alone is too slow, so specialised tissues are needed for uptake, transport, and excretion.</p>
                </div>
              </div>

              <RememberBox title="The four life processes in this chapter">
                <b>Nutrition</b> (getting food/energy in), <b>Respiration</b> (breaking food down for usable energy), <b>Transportation</b> (carrying food/gases/wastes around the body), and <b>Excretion</b> (removing harmful waste). Every topic in this chapter is really just one of these four.
              </RememberBox>
            </div>
          )}

          {activeTopic === "autotrophic-nutrition" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Autotrophic Nutrition & Photosynthesis</h1>
                <p className="text-base font-semibold text-slate-400">How green plants make their own food from thin air, water, and sunlight.</p>
              </div>

              <InfoCard title="Core Definition" icon={Leaf}>
                <p><b className="text-white">Nutrition</b> is the process of obtaining the source of energy and material for the body -- food. <b className="text-white">Autotrophs</b> (green plants, some bacteria) use simple inorganic material (CO2 and water) to make their own food. <b className="text-white">Heterotrophs</b> use complex substances that must be broken down with enzymes, and depend directly or indirectly on autotrophs.</p>
              </InfoCard>

              <SectionHeading>The Overall Photosynthesis Equation</SectionHeading>
              <div className={`p-4 rounded-xl border text-center font-mono text-[13px] font-bold ${isLightMode ? "bg-slate-50 border-slate-200 text-slate-800" : "bg-slate-950 border-slate-800 text-slate-200"}`}>
                6CO₂ + 12H₂O &nbsp;—(chlorophyll, sunlight)→&nbsp; C₆H₁₂O₆ (glucose) + 6O₂ + 6H₂O
              </div>

              <SectionHeading>Three Key Events of Photosynthesis</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>Absorption of light energy by chlorophyll.</li>
                <li>Conversion of light energy to chemical energy, and splitting of water into hydrogen and oxygen.</li>
                <li>Reduction of carbon dioxide to carbohydrates (using the released hydrogen).</li>
              </ol>
              <p className="text-sm font-semibold leading-relaxed">These steps need not happen immediately one after another. <b>Desert plants</b> take up CO2 at night (forming an intermediate substance) and use daytime light energy to process it later, which limits water loss.</p>

              <DiagramCard caption="Cross-section of a leaf, showing every labelled structure" isLightMode={isLightMode}>
                <svg viewBox="0 0 720 300" className="w-full h-auto">
                  <rect x="140" y="40" width="440" height="16" rx="4" fill={isLightMode ? "#a3e635" : "#65a30d"} fillOpacity="0.7" />
                  <rect x="140" y="60" width="440" height="60" rx="4" fill={isLightMode ? "#bbf7d0" : "#14532d"} fillOpacity="0.6" />
                  <rect x="140" y="124" width="440" height="70" rx="4" fill={isLightMode ? "#dcfce7" : "#0a2018"} fillOpacity="0.6" />
                  <rect x="140" y="198" width="440" height="16" rx="4" fill={isLightMode ? "#a3e635" : "#65a30d"} fillOpacity="0.7" />
                  <rect x="330" y="40" width="16" height="174" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity="0.55" />
                  {[80, 100, 140, 160, 175].map((cy, i) => (
                    <circle key={i} cx={230 + i * 55} cy={cy} r="7" fill={isLightMode ? "#16a34a" : "#4ade80"} />
                  ))}
                  <circle cx="230" cy="205" r="9" fill={isLightMode ? "#0369a1" : "#38bdf8"} fillOpacity="0.7" />
                  <rect x="215" y="200" width="30" height="10" rx="5" fill="none" stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="1.5" />
                  <circle cx="450" cy="205" r="9" fill={isLightMode ? "#0369a1" : "#38bdf8"} fillOpacity="0.7" />
                  <rect x="435" y="200" width="30" height="10" rx="5" fill="none" stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="1.5" />

                  <NumMarker x={200} y={48} n={7} isLightMode={isLightMode} />
                  <NumMarker x={200} y={90} n={1} isLightMode={isLightMode} />
                  <NumMarker x={338} y={90} n={9} isLightMode={isLightMode} />
                  <NumMarker x={500} y={90} n={5} isLightMode={isLightMode} />
                  <NumMarker x={200} y={160} n={10} isLightMode={isLightMode} />
                  <NumMarker x={500} y={160} n={4} isLightMode={isLightMode} />
                  <NumMarker x={200} y={206} n={12} isLightMode={isLightMode} />
                  <NumMarker x={262} y={222} n={11} isLightMode={isLightMode} />
                  <NumMarker x={338} y={230} n={3} isLightMode={isLightMode} />
                  <NumMarker x={95} y={130} n={2} isLightMode={isLightMode} />
                  <NumMarker x={620} y={90} n={8} isLightMode={isLightMode} />
                  <NumMarker x={620} y={160} n={6} isLightMode={isLightMode} />
                </svg>
                <NumberedLegend isLightMode={isLightMode} items={[
                  "Upper epidermis", "Lamina or leaf blade", "Vascular bundle", "Xylem", "Phloem",
                  "Air spaces", "Waxy cuticle", "Vein", "Chloroplast", "Lower epidermis",
                  "Guard cell", "Midrib",
                ]} />
              </DiagramCard>

              <SectionHeading>Stomata and Guard Cells</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li><b>Stomata</b> are tiny pores on the leaf surface (gas exchange also happens across the stem and root surfaces).</li>
                <li><b>Guard cells</b> regulate the opening/closing of each stomatal pore: they swell with water to open it, and shrink to close it.</li>
                <li>Closing the pore mainly prevents excessive water loss when CO2 is not urgently needed.</li>
              </ul>

              <SectionHeading>Two Classic Photosynthesis Experiments</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Variegated Leaf (Activity 5.1)</h4>
                  <p className="text-sm font-semibold">Destarch in the dark, expose to light, decolorise, then treat with iodine. Only the <b>green</b> (chlorophyll) regions turn blue-black -- proves chlorophyll is necessary.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">KOH Experiment (Activity 5.2)</h4>
                  <p className="text-sm font-semibold">A plant sealed with KOH (absorbs CO2) tests negative for starch, while a plant without KOH tests positive -- proves CO2 is necessary.</p>
                </div>
              </div>

              <SectionHeading>Other Raw Materials, From the Soil</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Nitrogen">Essential for protein synthesis; absorbed as inorganic nitrates/nitrites, or via bacteria that convert atmospheric nitrogen into usable compounds.</FactRow>
                <FactRow label="Phosphorus, iron, magnesium">Other essential minerals absorbed from the soil through the roots.</FactRow>
                <FactRow label="Storage of excess glucose">Stored as starch in plants (glycogen in animals/humans).</FactRow>
              </div>

              <RememberBox title="Chlorophyll shows up as green dots">
                In a leaf cross-section, chloroplasts (containing chlorophyll) appear as small green dots inside the cells -- this is a very commonly tested diagram-labelling point.
              </RememberBox>
            </div>
          )}

          {activeTopic === "heterotrophic-nutrition" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Heterotrophic Nutrition</h1>
                <p className="text-base font-semibold text-slate-400">Organisms that cannot make their own food -- and the very different strategies they use to get it.</p>
              </div>

              <InfoCard title="Strategy Depends on Environment and Food" icon={Network}>
                <p>A heterotroph's nutrition strategy depends on how it is adapted to its environment and the type/availability of food. A food source can be stationary (grass) or mobile (a deer) -- this shapes the whole feeding apparatus, e.g. a cow's teeth versus a lion's.</p>
              </InfoCard>

              <SectionHeading>Three Heterotrophic Strategies</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Saprophytic">Break down food outside the body, then absorb it. Example: fungi -- bread moulds, yeast, mushrooms.</FactRow>
                <FactRow label="Holozoic">Take in whole food and break it down inside the body. Example: Amoeba, most animals, humans.</FactRow>
                <FactRow label="Parasitic">Derive nutrition from a living host without immediately killing it. Example: Cuscuta (amar-bel), ticks, lice, leeches, tapeworms.</FactRow>
              </div>

              <SectionHeading>How Single-Celled Organisms Feed</SectionHeading>
              <DiagramCard caption="Amoeba engulfing a food particle using pseudopodia, forming a food vacuole" isLightMode={isLightMode}>
                <svg viewBox="0 0 680 200" className="w-full h-auto">
                  {[0, 1, 2, 3].map((i) => {
                    const cx = 85 + i * 165;
                    const stage = i;
                    return (
                      <g key={i}>
                        <path
                          d={
                            stage === 0 ? `M ${cx - 40} 100 Q ${cx - 50} 70 ${cx - 10} 65 Q ${cx + 30} 60 ${cx + 40} 95 Q ${cx + 45} 130 ${cx + 5} 138 Q ${cx - 35} 140 ${cx - 40} 100 Z`
                            : stage === 1 ? `M ${cx - 45} 100 Q ${cx - 55} 60 ${cx - 5} 58 Q ${cx + 35} 60 ${cx + 45} 90 Q ${cx + 50} 100 ${cx + 15} 100 L ${cx - 5} 100 L ${cx + 15} 100 Q ${cx + 50} 100 ${cx + 45} 115 Q ${cx + 35} 145 ${cx - 5} 143 Q ${cx - 55} 140 ${cx - 45} 100 Z`
                            : stage === 2 ? `M ${cx - 42} 100 Q ${cx - 52} 62 ${cx - 2} 60 Q ${cx + 42} 62 ${cx + 44} 100 Q ${cx + 42} 138 ${cx - 2} 140 Q ${cx - 52} 138 ${cx - 42} 100 Z`
                            : `M ${cx - 42} 100 Q ${cx - 52} 62 ${cx - 2} 60 Q ${cx + 42} 62 ${cx + 44} 100 Q ${cx + 42} 138 ${cx - 2} 140 Q ${cx - 52} 138 ${cx - 42} 100 Z`
                          }
                          fill={isLightMode ? "#e0f2fe" : "#0c1f2e"} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="2"
                        />
                        <circle cx={cx - 10} cy={100} r="10" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity="0.7" />
                        {stage < 3 ? (
                          <circle cx={cx + (stage === 0 ? 35 : stage === 1 ? 5 : -2)} cy={100} r="7" fill={isLightMode ? "#b45309" : "#fbbf24"} />
                        ) : (
                          <circle cx={cx - 2} cy={100} r="10" fill={isLightMode ? "#b45309" : "#fbbf24"} fillOpacity="0.3" stroke={isLightMode ? "#b45309" : "#fbbf24"} strokeWidth="1.5" strokeDasharray="3 2" />
                        )}
                        <text x={cx} y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#334155" : "#94a3b8"}>{["(a) Food nearby", "(b) Pseudopodia extend", "(c) Food surrounded", "(d) Food vacuole formed"][stage]}</text>
                      </g>
                    );
                  })}
                </svg>
                <NumberedLegend isLightMode={isLightMode} items={["Nucleus (purple)", "Food particle (orange, becomes food vacuole in stage d)"]} />
              </DiagramCard>

              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li><b>Amoeba</b> puts out temporary finger-like extensions called <b>pseudopodia</b>, which fuse over a food particle to form a <b>food vacuole</b>. Complex substances are broken down inside the vacuole and diffuse into the cytoplasm; undigested material is expelled.</li>
                <li><b>Paramecium</b> has a fixed shape, so food is taken in at one specific spot. <b>Cilia</b> covering its entire cell surface beat in coordination to sweep food toward this spot.</li>
              </ul>

              <RememberBox title="Endocytosis">
                Engulfing solid food particles by folding the plasma membrane around them (as Amoeba does) is called endocytosis -- specifically phagocytosis, since it involves solid particles.
              </RememberBox>
            </div>
          )}

          {activeTopic === "human-digestion" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Nutrition in Human Beings</h1>
                <p className="text-base font-semibold text-slate-400">The long journey food takes through the alimentary canal, and everything that breaks it down along the way.</p>
              </div>

              <InfoCard title="The Alimentary Canal" icon={Filter}>
                <p>The <b className="text-white">alimentary canal</b> is a long tube, running from the mouth to the anus, with specialised regions for chewing, digesting, and absorbing food. Food is pushed along it by rhythmic muscular contractions called <b className="text-white">peristaltic movements</b>.</p>
              </InfoCard>

              <DiagramCard caption="The human alimentary canal and its associated glands, showing every labelled structure" isLightMode={isLightMode}>
                <svg viewBox="0 0 720 340" className="w-full h-auto">
                  <circle cx="120" cy="45" r="20" fill="none" stroke={isLightMode ? "#334155" : "#94a3b8"} strokeWidth="2.5" />
                  <path d="M 130 60 Q 100 90 130 130 Q 90 160 140 190" fill="none" stroke={isLightMode ? "#334155" : "#94a3b8"} strokeWidth="10" strokeLinecap="round" />
                  <ellipse cx="230" cy="210" rx="55" ry="45" fill={isLightMode ? "#fde68a" : "#78350f"} fillOpacity="0.5" stroke={isLightMode ? "#b45309" : "#fbbf24"} strokeWidth="2.5" />
                  <path d="M 140 190 Q 230 175 260 240 Q 250 290 180 285 Q 130 275 140 240 Z" fill={isLightMode ? "#fecaca" : "#450a0a"} fillOpacity="0.6" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2.5" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <path key={i} d={`M ${290 + i * 70} 100 Q ${330 + i * 70} 90 ${290 + i * 70} 170 Q ${330 + i * 70} 200 ${290 + i * 70} 260`} fill="none" stroke={isLightMode ? "#059669" : "#34d399"} strokeWidth="14" strokeLinecap="round" opacity={0.75} />
                  ))}
                  <rect x="60" y="290" width="580" height="24" rx="12" fill={isLightMode ? "#a78bfa" : "#6d28d9"} fillOpacity="0.5" stroke={isLightMode ? "#6d28d9" : "#a78bfa"} strokeWidth="2" />
                  <circle cx="640" cy="302" r="14" fill={isLightMode ? "#a78bfa" : "#6d28d9"} fillOpacity="0.4" stroke={isLightMode ? "#6d28d9" : "#a78bfa"} strokeWidth="2" />
                  <rect x="660" y="296" width="14" height="14" rx="4" fill={isLightMode ? "#475569" : "#cbd5e1"} />

                  <NumMarker x={185} y={15} n={1} isLightMode={isLightMode} />
                  <NumMarker x={190} y={50} n={2} isLightMode={isLightMode} />
                  <NumMarker x={150} y={90} n={3} isLightMode={isLightMode} />
                  <NumMarker x={90} y={110} n={4} isLightMode={isLightMode} />
                  <NumMarker x={230} y={190} n={5} isLightMode={isLightMode} />
                  <NumMarker x={210} y={230} n={6} isLightMode={isLightMode} />
                  <NumMarker x={280} y={215} n={7} isLightMode={isLightMode} />
                  <NumMarker x={195} y={280} n={8} isLightMode={isLightMode} />
                  <NumMarker x={330} y={120} n={9} isLightMode={isLightMode} />
                  <NumMarker x={470} y={95} n={10} isLightMode={isLightMode} />
                  <NumMarker x={150} y={270} n={11} isLightMode={isLightMode} />
                  <NumMarker x={605} y={332} n={12} isLightMode={isLightMode} />
                  <NumMarker x={705} y={325} n={13} isLightMode={isLightMode} />
                </svg>
                <NumberedLegend isLightMode={isLightMode} items={[
                  "Tongue", "Mouth (buccal cavity)", "Oesophagus", "Diaphragm",
                  "Gall bladder (stores bile)", "Bile duct", "Stomach", "Liver",
                  "Pancreas", "Small intestine", "Large intestine (colon)", "Appendix", "Anus",
                ]} />
              </DiagramCard>

              <SectionHeading>Digestion, Step by Step</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li><b>Mouth:</b> teeth crush food; saliva (with salivary amylase) wets it and starts starch digestion; the tongue mixes food with saliva.</li>
                <li><b>Oesophagus:</b> peristaltic movements carry food to the stomach.</li>
                <li><b>Stomach:</b> gastric glands secrete HCl (acidic medium, kills bacteria), pepsin (digests protein), and mucus (protects the lining). The pyloric sphincter releases small amounts of food onward.</li>
                <li><b>Small intestine:</b> receives bile (emulsifies fats, makes food alkaline) and pancreatic juice (trypsin for protein, lipase for fat), plus intestinal juice completing digestion into absorbable molecules -- glucose, amino acids, fatty acids and glycerol.</li>
                <li><b>Villi</b> in the small intestine, richly supplied with blood vessels, absorb the digested food into the blood.</li>
                <li><b>Large intestine:</b> absorbs more water from the remaining undigested material.</li>
                <li><b>Anus:</b> regulated by the anal sphincter, releases waste.</li>
              </ol>

              <SectionHeading>Herbivores vs Carnivores</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Herbivores (grass-eaters) have a <b>longer</b> small intestine, since cellulose takes more time and surface area to digest. Carnivores (like tigers) have a <b>shorter</b> small intestine, since meat is comparatively easier to digest.</p>

              <RememberBox title="Dental caries (tooth decay)">
                Bacteria act on sugars stuck to teeth (dental plaque), producing acid that softens and demineralises enamel. Plaque also blocks saliva from neutralising this acid. Brushing after eating removes plaque before it can cause damage.
              </RememberBox>
            </div>
          )}

          {activeTopic === "respiration-pathways" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Respiration & Breakdown of Glucose</h1>
                <p className="text-base font-semibold text-slate-400">How cells release usable energy from food -- with or without oxygen.</p>
              </div>

              <InfoCard title="Core Definition" icon={Zap}>
                <p><b className="text-white">Respiration</b> is the process of acquiring oxygen from outside and using it to break down food, releasing energy the cell can use.</p>
              </InfoCard>

              <DiagramCard caption="The three possible pathways for breaking down glucose, depending on oxygen availability" isLightMode={isLightMode}>
                <svg viewBox="0 0 700 300" className="w-full h-auto">
                  <rect x="270" y="15" width="160" height="42" rx="10" fill={isLightMode ? "#e0f2fe" : "#0c2536"} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="2" />
                  <text x="350" y="41" textAnchor="middle" fontSize="13.5" fontWeight="800" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Glucose (6-C)</text>

                  <line x1="350" y1="57" x2="350" y2="88" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2.5" markerEnd="url(#bio10arrow)" />
                  <text x="365" y="76" fontSize="11" fontWeight="700" fill={isLightMode ? "#64748b" : "#94a3b8"}>in cytoplasm</text>
                  <defs>
                    <marker id="bio10arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? "#64748b" : "#94a3b8"} />
                    </marker>
                  </defs>

                  <rect x="265" y="90" width="170" height="42" rx="10" fill={isLightMode ? "#fef3c7" : "#3f2d0a"} stroke={isLightMode ? "#b45309" : "#fbbf24"} strokeWidth="2" />
                  <text x="350" y="116" textAnchor="middle" fontSize="13.5" fontWeight="800" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Pyruvate (3-C) + Energy</text>

                  <line x1="285" y1="132" x2="130" y2="185" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2" markerEnd="url(#bio10arrow)" />
                  <line x1="350" y1="132" x2="350" y2="185" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2" markerEnd="url(#bio10arrow)" />
                  <line x1="415" y1="132" x2="570" y2="185" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2" markerEnd="url(#bio10arrow)" />

                  <rect x="20" y="188" width="220" height="66" rx="10" fill={isLightMode ? "#fce7f3" : "#3b0d24"} stroke={isLightMode ? "#be185d" : "#f472b6"} strokeWidth="2" />
                  <text x="130" y="208" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={isLightMode ? "#be185d" : "#f472b6"}>NO OXYGEN (in yeast)</text>
                  <text x="130" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Ethanol + CO₂</text>
                  <text x="130" y="245" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>+ Energy</text>

                  <rect x="240" y="188" width="220" height="66" rx="10" fill={isLightMode ? "#dcfce7" : "#052e18"} stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="2" />
                  <text x="350" y="208" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={isLightMode ? "#15803d" : "#4ade80"}>NO OXYGEN (muscle cells)</text>
                  <text x="350" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Lactic acid</text>
                  <text x="350" y="245" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>+ Energy</text>

                  <rect x="460" y="188" width="220" height="66" rx="10" fill={isLightMode ? "#e0f2fe" : "#0c2536"} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="2" />
                  <text x="570" y="208" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={isLightMode ? "#0369a1" : "#38bdf8"}>WITH OXYGEN (mitochondria)</text>
                  <text x="570" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>CO₂ + Water</text>
                  <text x="570" y="245" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>+ (much more) Energy</text>

                  <text x="350" y="285" textAnchor="middle" fontSize="12" fontWeight="700" fill={isLightMode ? "#64748b" : "#94a3b8"}>Left two paths: anaerobic respiration. Right path: aerobic respiration.</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Aerobic vs Anaerobic Respiration</SectionHeading>
              <CompareTable
                leftHeader="Aerobic Respiration"
                rightHeader="Anaerobic Respiration"
                isLightMode={isLightMode}
                rows={[
                  ["Occurs in the presence of oxygen", "Occurs in the absence of oxygen"],
                  ["Completed partly in the mitochondria", "Occurs entirely in the cytoplasm"],
                  ["Releases much more energy", "Releases much less energy"],
                  ["End products: CO₂ + water", "End products: ethanol + CO₂ (yeast) or lactic acid (muscle)"],
                ]}
              />

              <RememberBox title="ATP: the cell's energy currency">
                ATP is formed from ADP + inorganic phosphate using energy released during respiration. Breaking ATP's terminal phosphate bond (using water) releases about 30.5 kJ/mol, which drives many cellular processes -- muscle contraction, protein synthesis, nerve impulse conduction, and more.
              </RememberBox>

              <SectionHeading>Gas Exchange in Plants: Day vs Night</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">At <b>night</b>, with no photosynthesis, CO2 from respiration is the major gas released. During the <b>day</b>, CO2 from respiration is used up in photosynthesis, so oxygen release becomes the major visible event.</p>
            </div>
          )}

          {activeTopic === "human-respiratory-system" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Human Respiratory System</h1>
                <p className="text-base font-semibold text-slate-400">The pathway air takes, and how the lungs squeeze an enormous surface area into your chest.</p>
              </div>

              <DiagramCard caption="Pathway of air through the human respiratory system, showing every labelled structure" isLightMode={isLightMode}>
                <svg viewBox="0 0 640 320" className="w-full h-auto">
                  <ellipse cx="320" cy="35" rx="60" ry="18" fill="none" stroke={isLightMode ? "#334155" : "#94a3b8"} strokeWidth="2.5" />
                  <rect x="305" y="50" width="30" height="70" rx="10" fill={isLightMode ? "#e0f2fe" : "#0c2536"} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="2.5" />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={i} x1="305" y1={58 + i * 10} x2="335" y2={58 + i * 10} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="1.5" opacity="0.6" />
                  ))}
                  <path d="M 320 120 L 220 175 M 320 120 L 420 175" stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="8" strokeLinecap="round" fill="none" />
                  {Array.from({ length: 4 }).map((_, i) => (
                    <g key={i}>
                      <path d={`M ${215 - i * 10} ${180 + i * 18} L ${175 - i * 14} ${200 + i * 22}`} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                      <path d={`M ${425 + i * 10} ${180 + i * 18} L ${465 + i * 14} ${200 + i * 22}`} stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                    </g>
                  ))}
                  <ellipse cx="150" cy="230" rx="80" ry="70" fill={isLightMode ? "#fecaca" : "#450a0a"} fillOpacity="0.35" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2" />
                  <ellipse cx="490" cy="230" rx="80" ry="70" fill={isLightMode ? "#fecaca" : "#450a0a"} fillOpacity="0.35" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2" />
                  {[[110, 200], [150, 220], [110, 250], [180, 255]].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="14" fill={isLightMode ? "#fca5a5" : "#7f1d1d"} fillOpacity="0.6" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="1.5" />
                  ))}
                  <rect x="80" y="290" width="480" height="20" rx="10" fill={isLightMode ? "#a78bfa" : "#6d28d9"} fillOpacity="0.5" stroke={isLightMode ? "#6d28d9" : "#a78bfa"} strokeWidth="2" />
                  <line x1="60" y1="160" x2="60" y2="300" stroke={isLightMode ? "#94a3b8" : "#475569"} strokeWidth="4" strokeLinecap="round" />
                  <line x1="580" y1="160" x2="580" y2="300" stroke={isLightMode ? "#94a3b8" : "#475569"} strokeWidth="4" strokeLinecap="round" />

                  <NumMarker x={280} y={30} n={1} isLightMode={isLightMode} />
                  <NumMarker x={320} y={20} n={2} isLightMode={isLightMode} />
                  <NumMarker x={355} y={40} n={3} isLightMode={isLightMode} />
                  <NumMarker x={320} y={70} n={4} isLightMode={isLightMode} />
                  <NumMarker x={340} y={90} n={5} isLightMode={isLightMode} />
                  <NumMarker x={260} y={155} n={6} isLightMode={isLightMode} />
                  <NumMarker x={220} y={230} n={7} isLightMode={isLightMode} />
                  <NumMarker x={150} y={165} n={8} isLightMode={isLightMode} />
                  <NumMarker x={95} y={155} n={9} isLightMode={isLightMode} />
                  <NumMarker x={60} y={150} n={10} isLightMode={isLightMode} />
                  <NumMarker x={320} y={302} n={11} isLightMode={isLightMode} />
                </svg>
                <NumberedLegend isLightMode={isLightMode} items={[
                  "Nasal passage", "Mouth cavity", "Pharynx", "Larynx", "Rings of cartilage",
                  "Trachea", "Bronchi / bronchioles", "Lung", "Alveolar sac (alveoli)",
                  "Ribs", "Diaphragm",
                ]} />
              </DiagramCard>

              <SectionHeading>Air's Pathway</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Nostrils (filtered by hairs and mucus) → pharynx → larynx → trachea (kept open by cartilage rings) → bronchi → bronchioles → <b>alveoli</b> -- tiny, thin-walled, balloon-like sacs with a dense network of blood vessels, where actual gas exchange happens.</p>

              <SectionHeading>The Mechanics of Breathing</SectionHeading>
              <CompareTable
                leftHeader="Inhalation"
                rightHeader="Exhalation"
                isLightMode={isLightMode}
                rows={[
                  ["Ribs lift up and out", "Ribs move down and in"],
                  ["Diaphragm contracts and flattens", "Diaphragm relaxes, domes upward"],
                  ["Chest cavity enlarges", "Chest cavity shrinks"],
                  ["Air is drawn into the lungs", "Air is pushed out of the lungs"],
                ]}
              />

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Alveolar surface area">Roughly 80 square metres in an adult -- this enormous area is what makes gas exchange so efficient.</FactRow>
                <FactRow label="Residual air volume">Lungs never fully empty, giving enough time for O2 absorption and CO2 release on every breath.</FactRow>
                <FactRow label="Haemoglobin">The respiratory pigment in red blood cells; without it, diffusion alone would take roughly 3 years to get oxygen to your toes.</FactRow>
              </div>

              <RememberBox title="Smoking destroys cilia">
                Cilia in the upper respiratory tract normally sweep out germs, dust, and chemicals. Smoking destroys these cilia, letting harmful material reach deep into the lungs -- causing infection, cough, and cancer.
              </RememberBox>
            </div>
          )}

          {activeTopic === "the-heart" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Heart & Blood Circulation</h1>
                <p className="text-base font-semibold text-slate-400">A muscular pump with four chambers, built to keep two different kinds of blood from ever mixing.</p>
              </div>

              <InfoCard title="Blood: A Fluid Connective Tissue" icon={HeartPulse}>
                <p><b className="text-white">Plasma</b> is the fluid medium that transports food, CO2, and nitrogenous wastes in dissolved form, plus salts. <b className="text-white">Red blood cells (RBCs)</b> carry oxygen via haemoglobin. The system needs a pump (heart), tubes (blood vessels), and a repair mechanism (platelets).</p>
              </InfoCard>

              <DiagramCard caption="Schematic sectional view of the human heart, showing every labelled structure" isLightMode={isLightMode}>
                <svg viewBox="0 0 640 320" className="w-full h-auto">
                  <rect x="140" y="40" width="26" height="90" rx="10" fill={isLightMode ? "#fca5a5" : "#7f1d1d"} fillOpacity="0.7" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2" />
                  <rect x="470" y="40" width="26" height="90" rx="10" fill={isLightMode ? "#93c5fd" : "#1e3a8a"} fillOpacity="0.7" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="2" />
                  <rect x="220" y="55" width="200" height="26" rx="10" fill={isLightMode ? "#93c5fd" : "#1e3a8a"} fillOpacity="0.5" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="2" />
                  <path d="M 250 30 Q 320 15 390 30" fill="none" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="10" strokeLinecap="round" />

                  <rect x="170" y="130" width="140" height="70" rx="14" fill={isLightMode ? "#fca5a5" : "#7f1d1d"} fillOpacity="0.55" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2.5" />
                  <rect x="330" y="130" width="140" height="70" rx="14" fill={isLightMode ? "#93c5fd" : "#1e3a8a"} fillOpacity="0.55" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="2.5" />
                  <rect x="315" y="130" width="10" height="200" fill={isLightMode ? "#334155" : "#cbd5e1"} />

                  <rect x="180" y="205" width="130" height="110" rx="18" fill={isLightMode ? "#fca5a5" : "#7f1d1d"} fillOpacity="0.75" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2.5" />
                  <rect x="330" y="205" width="130" height="110" rx="18" fill={isLightMode ? "#93c5fd" : "#1e3a8a"} fillOpacity="0.75" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="2.5" />

                  <rect x="480" y="140" width="24" height="55" rx="8" fill={isLightMode ? "#fca5a5" : "#7f1d1d"} fillOpacity="0.5" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2" />
                  <rect x="140" y="140" width="24" height="55" rx="8" fill={isLightMode ? "#93c5fd" : "#1e3a8a"} fillOpacity="0.5" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="2" />

                  <NumMarker x={320} y={22} n={1} isLightMode={isLightMode} />
                  <NumMarker x={155} y={20} n={2} isLightMode={isLightMode} />
                  <NumMarker x={492} y={20} n={3} isLightMode={isLightMode} />
                  <NumMarker x={230} y={68} n={4} isLightMode={isLightMode} />
                  <NumMarker x={410} y={68} n={5} isLightMode={isLightMode} />
                  <NumMarker x={240} y={165} n={6} isLightMode={isLightMode} />
                  <NumMarker x={400} y={165} n={7} isLightMode={isLightMode} />
                  <NumMarker x={152} y={165} n={8} isLightMode={isLightMode} />
                  <NumMarker x={245} y={260} n={9} isLightMode={isLightMode} />
                  <NumMarker x={395} y={260} n={10} isLightMode={isLightMode} />
                </svg>
                <NumberedLegend isLightMode={isLightMode} items={[
                  "Aorta", "Vena cava from upper body", "Pulmonary arteries (to lungs)",
                  "Right atrium", "Left atrium", "Pulmonary veins (from lungs, into left atrium)",
                  "Septum (dividing wall)", "Vena cava from lower body", "Right ventricle", "Left ventricle",
                ]} />
              </DiagramCard>

              <SectionHeading>Blood Flow, Step by Step</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>Oxygen-rich blood from the lungs enters the <b>left atrium</b>, which relaxes to collect it.</li>
                <li>The left atrium contracts, moving blood into the <b>left ventricle</b>.</li>
                <li>The left ventricle contracts powerfully, pumping oxygenated blood to the entire body.</li>
                <li>De-oxygenated blood from the body enters the <b>right atrium</b>, which relaxes to collect it.</li>
                <li>The right atrium contracts, and the <b>right ventricle</b> dilates to receive the blood.</li>
                <li>The right ventricle contracts, pumping blood to the lungs for oxygenation.</li>
              </ol>
              <p className="text-sm font-semibold leading-relaxed"><b>Valves</b> between chambers prevent backflow. <b>Ventricles</b> have thicker, more muscular walls than atria, since they must pump blood much further -- to the lungs, or the entire body.</p>

              <RememberBox title="Why the septum matters">
                The septum keeps oxygenated and deoxygenated blood from mixing. This matters most for animals with high, constant energy needs -- like birds and mammals -- who depend on a highly efficient oxygen supply.
              </RememberBox>
            </div>
          )}

          {activeTopic === "blood-vessels-lymph" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Blood Vessels, Blood Pressure & Lymph</h1>
                <p className="text-base font-semibold text-slate-400">The tubes that carry blood, the pressure that drives it, and the fluid that leaks out along the way.</p>
              </div>

              <SectionHeading>The Three Types of Blood Vessels</SectionHeading>
              <CompareTable
                leftHeader="Vessel"
                rightHeader="Function & Structure"
                isLightMode={isLightMode}
                rows={[
                  ["Arteries", "Carry blood away from the heart, under high pressure -- thick, elastic walls"],
                  ["Veins", "Carry blood back to the heart, not under high pressure -- thinner walls, with valves"],
                  ["Capillaries", "Bring blood in contact with individual cells for exchange -- walls one cell thick"],
                ]}
              />

              <InfoCard title="Platelets: The Repair Crew" icon={Droplet}>
                <p><b className="text-white">Platelets</b> circulate in the blood and plug leaks (clotting) at injury sites, preventing excessive blood loss and pressure loss.</p>
              </InfoCard>

              <SectionHeading>Blood Pressure</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li><b>Blood pressure</b> is the force exerted by blood against vessel walls -- greater in arteries than veins.</li>
                <li><b>Systolic pressure</b> (ventricular contraction): normally about 120 mm Hg. <b>Diastolic pressure</b> (ventricular relaxation): normally about 80 mm Hg.</li>
                <li>Measured using a <b>sphygmomanometer</b>.</li>
                <li><b>Hypertension</b> (high BP): caused by constriction of arterioles, which increases resistance to blood flow -- can rupture an artery and cause internal bleeding.</li>
              </ul>

              <SectionHeading>Lymph (Tissue Fluid)</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Lymph forms when plasma, proteins, and blood cells escape through capillary pores into intercellular spaces. It is similar to plasma, but colourless and with less protein. It drains into lymphatic capillaries, then larger lymph vessels, eventually opening into veins.</p>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Carries fat">Digested and absorbed fat from the intestine.</FactRow>
                <FactRow label="Drains fluid">Excess fluid from the extracellular space, back into the blood.</FactRow>
              </div>
            </div>
          )}

          {activeTopic === "double-circulation" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Double Circulation Across Animals</h1>
                <p className="text-base font-semibold text-slate-400">Why some animals mix their blood a little, and why mammals and birds absolutely cannot afford to.</p>
              </div>

              <InfoCard title="Why Separation Matters" icon={GitBranch}>
                <p>Separating oxygenated and deoxygenated blood prevents dilution of oxygen supply -- important for animals with high energy needs that must maintain a constant body temperature, like <b className="text-white">birds and mammals</b>.</p>
              </InfoCard>

              <CompareTable
                leftHeader="Animal Group"
                rightHeader="Heart & Circulation"
                isLightMode={isLightMode}
                rows={[
                  ["Fish", "Two-chambered heart; blood passes through the heart once per cycle -- single circulation"],
                  ["Amphibians & many reptiles", "Three-chambered heart; some mixing of oxygenated/deoxygenated blood is tolerated"],
                  ["Birds & mammals", "Four-chambered heart with a complete septum; blood passes through the heart twice -- double circulation"],
                ]}
              />

              <RememberBox title="Single vs double circulation, in one line">
                Single circulation = blood passes through the heart ONCE per full body circuit (fish). Double circulation = blood passes through the heart TWICE per full body circuit (birds, mammals) -- once toward the lungs, once toward the body.
              </RememberBox>
            </div>
          )}

          {activeTopic === "transport-in-plants" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Transportation in Plants</h1>
                <p className="text-base font-semibold text-slate-400">Two independent tissues, moving in different directions, for different reasons.</p>
              </div>

              <InfoCard title="Why Plants Can Use a Slow Transport System" icon={Leaf}>
                <p>Plants have <b className="text-white">low energy needs</b> (they don't move, and much of their tissue is made of dead cells), so even a slow transport system works -- even over the huge distances found in tall trees.</p>
              </InfoCard>

              <CompareTable
                leftHeader="Xylem"
                rightHeader="Phloem"
                isLightMode={isLightMode}
                rows={[
                  ["Moves water and minerals", "Moves food (products of photosynthesis)"],
                  ["Only one direction: upward, from roots", "Either direction, according to the plant's needs"],
                  ["Physical process -- no energy used", "Active process -- uses ATP energy"],
                  ["Driven by root pressure & transpiration pull", "Driven by osmotic pressure built up by active sucrose loading"],
                ]}
              />

              <SectionHeading>Moving Water Upward</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li><b>Root pressure:</b> roots actively take up ions from the soil, creating a concentration difference that draws water into the root xylem, pushing it upward -- more important at night, when stomata are closed.</li>
                <li><b>Transpiration pull:</b> evaporation of water from leaf cells (through open stomata, during the day) creates suction that pulls water up through the xylem -- the major driving force during the day.</li>
                <li><b>Transpiration</b> also helps regulate the plant's temperature, besides pulling water upward.</li>
              </ul>

              <SectionHeading>Moving Food: Translocation</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed"><b>Translocation</b> is the transport of soluble photosynthesis products (mainly sucrose) through phloem, via <b>sieve tubes</b> with help from <b>companion cells</b>. Sucrose is actively loaded into phloem using ATP, raising osmotic pressure, drawing in water, and building pressure that pushes material toward tissues that need it -- e.g. stored sugar moving from root to growing buds in spring.</p>
            </div>
          )}

          {activeTopic === "excretion-humans" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Excretion in Human Beings</h1>
                <p className="text-base font-semibold text-slate-400">Millions of tiny filtering units, working together to keep your blood clean.</p>
              </div>

              <InfoCard title="Core Definition" icon={Filter}>
                <p><b className="text-white">Excretion</b> is the biological process of removing harmful metabolic wastes -- especially nitrogenous wastes -- from the body.</p>
              </InfoCard>

              <SectionHeading>The Excretory System</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Kidneys">A pair, located in the abdomen, one on either side of the backbone -- where urine is formed by filtering blood.</FactRow>
                <FactRow label="Ureters">A pair of tubes carrying urine from each kidney to the urinary bladder.</FactRow>
                <FactRow label="Urinary bladder">Stores urine until it is released.</FactRow>
                <FactRow label="Urethra">The tube through which urine is finally released from the body; the bladder is muscular and under nervous control, so urination can be voluntarily held.</FactRow>
              </div>

              <SectionHeading>The Nephron: The Kidney's Filtration Unit</SectionHeading>
              <DiagramCard caption="Structure of a nephron, showing every labelled structure" isLightMode={isLightMode}>
                <svg viewBox="0 0 680 260" className="w-full h-auto">
                  <path d="M 120 130 Q 40 130 40 90 Q 40 55 90 55 Q 140 55 140 95 Q 140 130 120 130 Z" fill="none" stroke={isLightMode ? "#334155" : "#94a3b8"} strokeWidth="3" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <path key={i} d={`M ${75 + (i % 4) * 15} ${65 + Math.floor(i / 4) * 40} q 15 -10 25 10 q 10 20 -5 25`} fill="none" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="2.5" opacity="0.85" />
                  ))}
                  <path d="M 130 100 Q 220 60 260 110 Q 300 160 220 170 Q 140 180 180 220 Q 220 250 320 235" fill="none" stroke={isLightMode ? "#0369a1" : "#38bdf8"} strokeWidth="9" strokeLinecap="round" />
                  <rect x="320" y="220" width="120" height="26" rx="10" fill={isLightMode ? "#fde68a" : "#78350f"} fillOpacity="0.6" stroke={isLightMode ? "#b45309" : "#fbbf24"} strokeWidth="2" />
                  <line x1="15" y1="90" x2="40" y2="90" stroke={isLightMode ? "#b91c1c" : "#f87171"} strokeWidth="5" strokeLinecap="round" />
                  <line x1="15" y1="115" x2="55" y2="120" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="5" strokeLinecap="round" />

                  <NumMarker x={90} y={90} n={1} isLightMode={isLightMode} />
                  <NumMarker x={128} y={122} n={2} isLightMode={isLightMode} />
                  <NumMarker x={230} y={140} n={3} isLightMode={isLightMode} />
                  <NumMarker x={22} y={88} n={4} isLightMode={isLightMode} />
                  <NumMarker x={22} y={118} n={5} isLightMode={isLightMode} />
                  <NumMarker x={95} y={70} n={6} isLightMode={isLightMode} />
                  <NumMarker x={380} y={233} n={7} isLightMode={isLightMode} />
                </svg>
                <NumberedLegend isLightMode={isLightMode} items={[
                  "Glomerulus", "Bowman's capsule", "Tubular part of nephron",
                  "Branch of renal artery (blood in)", "Branch of renal vein (blood out)",
                  "Capillaries", "Collecting duct",
                ]} />
              </DiagramCard>

              <SectionHeading>Filtration and Reabsorption</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>Blood pressure forces small molecules (water, glucose, amino acids, salts, urea) out of the <b>glomerulus</b> into the <b>Bowman's capsule</b> as filtrate; blood cells and large proteins are retained.</li>
                <li>As filtrate flows along the <b>tubule</b>, useful substances (glucose, amino acids, salts, most water) are <b>selectively reabsorbed</b> back into the blood.</li>
                <li>Remaining filtrate (urea, excess salts and water) becomes urine, flowing into the <b>collecting duct</b>, then the ureter, then the bladder.</li>
              </ol>

              <RememberBox title="180 litres in, 1-2 litres out">
                The kidneys form about 180 litres of initial filtrate per day, but almost all of it (all but 1-2 litres) is reabsorbed back into the blood along the tubule -- that's how much reabsorption is actually happening every day.
              </RememberBox>
            </div>
          )}

          {activeTopic === "excretion-plants" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Excretion in Plants & Dialysis</h1>
                <p className="text-base font-semibold text-slate-400">No kidneys needed -- plants store, shed, and release their waste instead.</p>
              </div>

              <InfoCard title="A Completely Different Strategy" icon={Leaf}>
                <p>Plants don't have a dedicated excretory organ like animals. Oxygen from photosynthesis can itself be considered a waste product, and CO2 is handled through the same gas-exchange pathways discussed under respiration.</p>
              </InfoCard>

              <SectionHeading>How Plants Get Rid of Waste</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Transpiration">Removes excess water through the aerial parts of the plant.</FactRow>
                <FactRow label="Cellular vacuoles">Some waste is simply stored inside vacuoles.</FactRow>
                <FactRow label="Leaves">Waste is stored in leaves, which are eventually shed (leaf fall).</FactRow>
                <FactRow label="Resins and gums">Waste stored this way, especially in old xylem tissue.</FactRow>
                <FactRow label="Soil">Some waste is excreted directly into the surrounding soil.</FactRow>
              </div>

              <SectionHeading>Artificial Kidney: Hemodialysis</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">When kidney function fails (infection, injury, restricted blood flow), <b>dialysis</b> mechanically removes nitrogenous wastes from the blood. The patient's blood is passed through tubes with a selectively permeable lining, suspended in a tank of dialysing fluid that has the <b>same osmotic pressure as blood but no nitrogenous wastes</b>. Wastes diffuse out into the fluid, and purified blood is pumped back. Unlike a real kidney, <b>no reabsorption</b> occurs in dialysis.</p>

              <RememberBox title="Organ donation">
                Donating an organ (with consent) to someone with organ failure can save or transform their life. Common transplants include corneas, kidneys, heart, liver, pancreas, lungs, intestines, and bone marrow. Most donations happen after death, though some organs/tissues (like a kidney, or part of a liver/lung) can be donated by a living donor.
              </RememberBox>
            </div>
          )}

          {activeTopic === "glossary-mindmap" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Revision Map & Extra Terms</h1>
                <p className="text-base font-semibold text-slate-400">Every life process in this chapter, in one place.</p>
              </div>

              <SectionHeading>Quick Revision Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch
                  icon={Leaf}
                  title="Nutrition"
                  color="green"
                  isLightMode={isLightMode}
                  points={["Autotrophic: makes own food (photosynthesis) -- CO2 + water + sunlight + chlorophyll", "Heterotrophic: saprophytic, holozoic, or parasitic", "Human digestion: mouth -> stomach -> small intestine (bile, pancreatic, intestinal juice) -> absorption via villi"]}
                />
                <MindMapBranch
                  icon={Wind}
                  title="Respiration"
                  color="cyan"
                  isLightMode={isLightMode}
                  points={["Glucose -> pyruvate (cytoplasm) is common to all", "Aerobic (mitochondria, more energy) vs anaerobic (yeast: ethanol+CO2; muscle: lactic acid)", "ATP is the cell's energy currency"]}
                />
                <MindMapBranch
                  icon={HeartPulse}
                  title="Human Transport"
                  color="rose"
                  isLightMode={isLightMode}
                  points={["Heart: 4 chambers, septum keeps blood separate", "Double circulation: blood passes through heart twice per cycle", "Arteries (thick, high pressure), veins (valves), capillaries (one-cell walls)"]}
                />
                <MindMapBranch
                  icon={Network}
                  title="Plant Transport"
                  color="emerald"
                  isLightMode={isLightMode}
                  points={["Xylem: water/minerals, upward only, physical process", "Phloem: food, either direction, uses ATP (translocation)", "Root pressure (night) + transpiration pull (day) drive xylem flow"]}
                />
                <MindMapBranch
                  icon={Filter}
                  title="Human Excretion"
                  color="indigo"
                  isLightMode={isLightMode}
                  points={["Nephron: glomerulus + Bowman's capsule filter blood", "Tubule selectively reabsorbs useful substances", "Remaining filtrate = urine, via collecting duct -> ureter -> bladder"]}
                />
                <MindMapBranch
                  icon={Dna}
                  title="Plant Excretion"
                  color="amber"
                  isLightMode={isLightMode}
                  points={["O2 released as a by-product; CO2 via gas exchange", "Excess water via transpiration", "Waste stored in vacuoles, shed leaves, resins/gums, or soil"]}
                />
              </div>

              <SectionHeading>Extra Terms From Your Notes</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Peristalsis">Rhythmic muscular contractions of the alimentary canal that push food forward.</FactRow>
                <FactRow label="Sphincter muscle">A ring of muscle (e.g. pyloric, anal) that regulates the release of material from one region to the next.</FactRow>
                <FactRow label="Villi">Finger-like projections in the small intestine that increase surface area for absorption.</FactRow>
                <FactRow label="Fermentation">Anaerobic breakdown of pyruvate into ethanol and CO2, as carried out by yeast.</FactRow>
                <FactRow label="Stomata / guard cells">Pores on the leaf surface for gas exchange, opened/closed by guard cells.</FactRow>
                <FactRow label="Translocation">Transport of food (mainly sucrose) through phloem.</FactRow>
                <FactRow label="Systole / diastole">Contraction / relaxation phases of the heart's pumping cycle.</FactRow>
                <FactRow label="Sphygmomanometer">The instrument used to measure blood pressure.</FactRow>
                <FactRow label="Lymph">Tissue fluid formed from plasma/proteins/cells escaping capillary pores.</FactRow>
                <FactRow label="Hemodialysis">Artificial removal of nitrogenous wastes from blood using a machine, when kidneys fail.</FactRow>
              </div>

              <RememberBox title="You've completed the Life Processes chapter!">
                Go back to any topic using the sidebar whenever you need to revise, and try the self-assessment quiz to test what you remember under real exam-style time pressure.
              </RememberBox>
            </div>
          )}

          {activeTopic === "competitive-corner" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Competitive Corner</h1>
                <p className="text-base font-semibold text-slate-400">The earlier topics cover the fundamentals. Competitive exams often push a step further with these same ideas.</p>
              </div>

              <SectionHeading>Ideas That Go a Step Further</SectionHeading>

              <InfoCard title="Counter-Current Exchange in Fish Gills" icon={Trophy}>
                <p>Fish gills use a counter-current mechanism: blood in the gill capillaries flows in the OPPOSITE direction to the water flowing over them. This keeps a concentration gradient favouring oxygen uptake along the entire length of the gill, letting fish extract far more oxygen from water than a simple parallel-flow system would allow. This is a favourite "why" question in competitive exams.</p>
              </InfoCard>

              <InfoCard title="Why the Left Ventricle Wall Is Thicker Than the Right" icon={HeartPulse}>
                <p>Both ventricles pump the same volume of blood per beat, but the left ventricle must generate enough pressure to push blood through the ENTIRE body (systemic circulation), a much longer and higher-resistance path than the right ventricle's short trip to the lungs (pulmonary circulation). This is why the left ventricle's muscular wall is noticeably thicker.</p>
              </InfoCard>

              <InfoCard title="C3 vs C4 Photosynthesis (Beyond the Basics)" icon={Leaf}>
                <p>Most plants (C3) fix CO2 directly into a 3-carbon compound. Some plants adapted to hot, dry climates (like maize, sugarcane -- C4 plants) first fix CO2 into a 4-carbon compound in specialised cells, minimising water loss and photorespiration. Desert plants using a similar night-time CO2 uptake strategy (mentioned earlier in this chapter without naming it) follow a related pathway called CAM (Crassulacean Acid Metabolism).</p>
              </InfoCard>

              <InfoCard title="Osmoregulation Beyond the Nephron" icon={Filter}>
                <p>ADH (antidiuretic hormone), released by the pituitary gland, controls how much water the nephron's tubule reabsorbs -- more ADH means more water reabsorbed and more concentrated urine. This hormonal fine-tuning is what actually regulates urine volume day to day, beyond the basic filtration/reabsorption described earlier in this chapter.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Human RBC lifespan">About 120 days, after which they are broken down, mainly in the spleen and liver.</FactRow>
                <FactRow label="Universal donor/recipient blood groups">O-negative is the universal donor; AB-positive is the universal recipient (a common cross-topic competitive question).</FactRow>
                <FactRow label="Cardiac output">The volume of blood the heart pumps per minute -- roughly 5 litres/minute at rest in a healthy adult.</FactRow>
                <FactRow label="Largest gland in the body">The liver -- also central to bile production and detoxification.</FactRow>
                <FactRow label="Vital capacity">The maximum volume of air a person can forcibly exhale after a full inhalation -- a measure often tested alongside residual volume.</FactRow>
              </div>

              <RememberBox title="Watch for 'both/and' comparison questions">
                Competitive exams love pairing two structures and asking for BOTH a similarity and a difference in the same question -- e.g. alveoli vs nephrons, xylem vs phloem, single vs double circulation. Practising both directions of comparison is the single best preparation.
              </RememberBox>

              <SectionHeading>Solved Competitive Questions</SectionHeading>

              <ExampleQ
                number={1}
                question="A fish's gills extract oxygen from water far more efficiently than a simple diffusion model would predict. What mechanism explains this, and how does it work?"
                answer="Counter-current exchange: blood in the gill capillaries flows opposite to the direction of water flow over the gills. This maintains a favourable oxygen concentration gradient (blood always meets water with relatively more oxygen than itself) along the gill's entire length, maximising oxygen uptake compared to a same-direction (parallel) flow arrangement."
              />
              <ExampleQ
                number={2}
                question="Why does the left ventricle of the human heart have a thicker muscular wall than the right ventricle, even though both pump the same volume of blood?"
                answer="The left ventricle must generate enough pressure to push blood all the way around the systemic circulation (the entire body), a much longer and higher-resistance circuit than the right ventricle's short pulmonary circulation to the lungs -- so it needs more muscular power, hence a thicker wall."
              />
              <ExampleQ
                number={3}
                question="A desert plant takes up CO2 only at night and stores it as an intermediate compound, processing it with light energy during the day. Name this adaptation and explain its advantage."
                answer="This is CAM (Crassulacean Acid Metabolism). Its advantage is water conservation: by keeping stomata open only at night (when it's cooler and evaporation is lower) rather than during the hot day, the plant drastically reduces water loss while still obtaining the CO2 it needs for photosynthesis."
              />
              <ExampleQ
                number={4}
                question="A patient's urine output drops sharply, becoming very concentrated, after a period of not drinking enough water. Which hormone is most directly responsible for this response, and what does it do?"
                answer="ADH (antidiuretic hormone). When the body is short of water, more ADH is released, causing the nephron's tubule to reabsorb more water back into the blood, producing a smaller volume of more concentrated urine to conserve water."
              />
              <ExampleQ
                number={5}
                question="Why is O-negative blood called the 'universal donor', and AB-positive called the 'universal recipient'?"
                answer="O-negative red blood cells lack the A, B, and Rh antigens that could trigger an immune reaction, so they can generally be given to people of any blood group. AB-positive plasma/blood contains no anti-A or anti-B antibodies (and accepts the Rh factor), so a person with AB-positive blood can generally receive blood from any donor group."
              />
              <ExampleQ
                number={6}
                question="Compare C3 and C4 plants in terms of where they first fix carbon dioxide, and explain why C4 plants have an advantage in hot, dry climates."
                answer="C3 plants fix CO2 directly into a 3-carbon compound in normal leaf cells. C4 plants (like maize and sugarcane) first fix CO2 into a 4-carbon compound in specialised cells before passing it on, which lets them keep internal CO2 concentration high even with stomata partly closed -- reducing water loss and minimising wasteful photorespiration, a real advantage in hot, dry conditions."
              />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = BIO_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(BIO_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = BIO_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < BIO_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(BIO_TOPICS[currentIndex + 1].id)}
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
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-slate-950 font-black text-[14px] cursor-pointer hover:from-green-450 hover:to-emerald-450 shadow-md border border-green-400/30 shrink-0"
                    >
                      Complete Notes
                      <ChevronRight className="w-3.5 h-3.5 font-bold" />
                    </button>
                    {onGoToSelfAssessment && (
                      <button
                        onClick={onGoToSelfAssessment}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[14px] cursor-pointer hover:from-cyan-350 hover:to-blue-450 shadow-md border border-cyan-400/30 shrink-0"
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
                    onClick={() => setActiveTopic(BIO_TOPICS[0].id)}
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
