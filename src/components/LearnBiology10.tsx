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
  Download,
  FlaskConical,
} from "lucide-react";

const LIFE_PROCESSES_NOTES_PDF_URL = "https://hcofglrixcokhhchivvi.supabase.co/storage/v1/object/public/study-notes/class10-biology-life-processes.pdf";

// Real diagram images cropped from the admin's own downloadable notes PDF -- used instead of
// hand-drawn SVGs, which reviewed as too unclear to keep.
const DIAGRAM_BASE = "https://hcofglrixcokhhchivvi.supabase.co/storage/v1/object/public/study-notes/biology10-diagrams/";
// "?v=2" cache-busts every diagram URL below so browsers/CDN edges that cached the
// earlier (mis-cropped, lower-resolution) images fetch the corrected files instead
// of silently reusing a stale copy.
const DIAGRAM_V = "?v=2";
const DIAGRAMS = {
  leafParts: DIAGRAM_BASE + "leaf-parts.webp" + DIAGRAM_V,
  photosynthesisEq: DIAGRAM_BASE + "photosynthesis-eq.webp" + DIAGRAM_V,
  leafCrossSection: DIAGRAM_BASE + "leaf-cross-section.webp" + DIAGRAM_V,
  stomata: DIAGRAM_BASE + "stomata.webp" + DIAGRAM_V,
  amoebaDigestion: DIAGRAM_BASE + "amoeba-digestion.webp" + DIAGRAM_V,
  alimentaryCanal: DIAGRAM_BASE + "alimentary-canal.webp" + DIAGRAM_V,
  glucoseBreakdown: DIAGRAM_BASE + "glucose-breakdown.webp" + DIAGRAM_V,
  atpAdpCycle: DIAGRAM_BASE + "atp-adp-cycle.webp" + DIAGRAM_V,
  respiratorySystem: DIAGRAM_BASE + "respiratory-system.webp" + DIAGRAM_V,
  alveolusGasExchange: DIAGRAM_BASE + "alveolus-gas-exchange.webp" + DIAGRAM_V,
  heartDiagram: DIAGRAM_BASE + "heart-diagram.webp" + DIAGRAM_V,
  doubleCirculation: DIAGRAM_BASE + "double-circulation.webp" + DIAGRAM_V,
  lymphDiagram: DIAGRAM_BASE + "lymph-diagram.webp" + DIAGRAM_V,
  xylemPhloem: DIAGRAM_BASE + "xylem-phloem.webp" + DIAGRAM_V,
  excretorySystem: DIAGRAM_BASE + "excretory-system.webp" + DIAGRAM_V,
  kidneyNephron: DIAGRAM_BASE + "kidney-nephron.webp" + DIAGRAM_V,
};

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
  | "activities"
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
  { id: "activities", title: "13. Hands-On Activities", category: "Practical" },
  { id: "glossary-mindmap", title: "14. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competitive-corner", title: "15. Competitive Corner", category: "Advanced" },
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

// Real, pre-drawn diagram images (cropped from the admin's own notes PDF -- see DIAGRAMS above)
// rendered inside the same card frame every other diagram in this chapter uses.
const DiagramImage: React.FC<{ src: string; alt: string; caption?: string; isLightMode?: boolean }> = ({ src, alt, caption, isLightMode = false }) => (
  <DiagramCard caption={caption || alt} isLightMode={isLightMode}>
    <img src={src} alt={alt} className="w-full h-auto rounded-lg" />
  </DiagramCard>
);

interface ActivityStep {
  step: string;
  why?: string;
}

const ActivityCard: React.FC<{
  number: number;
  title: string;
  aim: string;
  materials: string[];
  procedure: ActivityStep[];
  observation: string;
  conclusion: string;
  isLightMode?: boolean;
}> = ({ number, title, aim, materials, procedure, observation, conclusion, isLightMode = false }) => (
  <div className={`rounded-2xl border p-5 space-y-4 shadow-md ${isLightMode ? "bg-white border-slate-200" : "bg-[#0f1a12] border-green-500/15"}`}>
    <div className="flex items-start gap-2.5">
      <FlaskConical className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
      <h3 className={`text-base font-black leading-snug ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>
        <span className="text-green-400 font-mono">Activity {number}.</span> {title}
      </h3>
    </div>

    <p className={`text-sm font-semibold leading-relaxed ${isLightMode ? "text-slate-600" : "text-slate-300"}`}>
      <span className="text-green-400 font-black">Aim: </span>{aim}
    </p>

    <div className="space-y-1.5">
      <SectionHeading>Materials Required</SectionHeading>
      <ul className={`list-disc pl-5 text-sm font-semibold leading-relaxed space-y-1 ${isLightMode ? "text-slate-600" : "text-slate-300"}`}>
        {materials.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>

    <div className="space-y-1.5">
      <SectionHeading>Procedure</SectionHeading>
      <ol className={`list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-2.5 ${isLightMode ? "text-slate-600" : "text-slate-300"}`}>
        {procedure.map((p, i) => (
          <li key={i}>
            <span>{p.step}</span>
            {p.why && (
              <span className={`block text-[12.5px] font-semibold mt-0.5 ${isLightMode ? "text-cyan-700" : "text-cyan-400/90"}`}>
                Why: {p.why}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>

    <RememberBox title="Observation">{observation}</RememberBox>
    <RememberBox title="Conclusion">{conclusion}</RememberBox>
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
          <a
            href={LIFE_PROCESSES_NOTES_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded transition ${isLightMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-400 text-[#052e18]"}`}
          >
            <Download className="w-2.5 h-2.5" />
            PDF
          </a>
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
          <a
            href={LIFE_PROCESSES_NOTES_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${
              isLightMode
                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/10"
                : "bg-green-500 hover:bg-green-400 text-slate-950 shadow-green-450/5"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Download Notes
          </a>
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
              <DiagramImage src={DIAGRAMS.photosynthesisEq} alt="6CO2 + 12H2O, with sunlight and chlorophyll, gives glucose + water + oxygen" caption="The photosynthesis reaction" isLightMode={isLightMode} />

              <SectionHeading>Three Key Events of Photosynthesis</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>Absorption of light energy by chlorophyll.</li>
                <li>Conversion of light energy to chemical energy, and splitting of water into hydrogen and oxygen.</li>
                <li>Reduction of carbon dioxide to carbohydrates (using the released hydrogen).</li>
              </ol>
              <p className="text-sm font-semibold leading-relaxed">These steps need not happen immediately one after another. <b>Desert plants</b> take up CO2 at night (forming an intermediate substance) and use daytime light energy to process it later, which limits water loss.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DiagramImage src={DIAGRAMS.leafParts} alt="Parts of a leaf: tip, midrib, margin, lamina, vein, petiole" isLightMode={isLightMode} />
                <DiagramImage src={DIAGRAMS.leafCrossSection} alt="Cross section of a leaf showing cuticle, palisade layer, air space, chloroplast, guard cell, spongy cell, lower epidermis" isLightMode={isLightMode} />
              </div>

              <SectionHeading>Stomata and Guard Cells</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li><b>Stomata</b> are tiny pores on the leaf surface (gas exchange also happens across the stem and root surfaces).</li>
                <li><b>Guard cells</b> regulate the opening/closing of each stomatal pore: they swell with water to open it, and shrink to close it.</li>
                <li>Closing the pore mainly prevents excessive water loss when CO2 is not urgently needed.</li>
              </ul>

              <DiagramImage src={DIAGRAMS.stomata} alt="Stoma open (guard cells swollen) vs stoma closed (guard cells shrunk)" caption="Open vs closed stomatal pore" isLightMode={isLightMode} />

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
              <DiagramImage src={DIAGRAMS.amoebaDigestion} alt="Stages in Amoeba's digestion process: ingestion, digestion, absorption, assimilation, egestion" caption="Stages in Amoeba's digestion process" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.alimentaryCanal} alt="Human alimentary canal: tongue, mouth, oesophagus, stomach, liver, gall bladder, pancreas, small intestine, large intestine, appendix, anus" caption="The human alimentary canal and its associated glands" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.glucoseBreakdown} alt="Glucose to pyruvate in cytoplasm, then three pathways: absence of O2 (yeast) gives ethanol + CO2, lack of O2 (muscle cells) gives lactic acid, presence of O2 (mitochondria) gives CO2 + water" caption="The three pathways for breaking down glucose" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.atpAdpCycle} alt="ATP-ADP cycle: phosphorylation adds a phosphate to ADP using energy from food to form ATP; hydrolysis breaks ATP back to ADP, releasing energy for cells" caption="The ATP-ADP cycle" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.respiratorySystem} alt="Human respiratory system: nasal cavity, pharynx, larynx, trachea, bronchi, bronchioles, lungs, alveoli, diaphragm" caption="The human respiratory system" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.alveolusGasExchange} alt="Alveolus gas exchange: oxygen diffuses from air into red blood cells, carbon dioxide diffuses out, across the capillary and alveolar wall" caption="Gas exchange at the alveolus" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.heartDiagram} alt="Human heart: aorta, superior and inferior vena cava, pulmonary arteries and veins, right and left atrium, right and left ventricle, tricuspid, pulmonary, mitral and aortic valves" caption="Schematic sectional view of the human heart" isLightMode={isLightMode} />

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

              <DiagramImage src={DIAGRAMS.lymphDiagram} alt="Lymph capillary, tissue cells, tissue spaces, arteriole, tissue fluid, venule, lymphatic vessel" caption="How lymph forms from tissue fluid" isLightMode={isLightMode} />
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

              <DiagramImage src={DIAGRAMS.doubleCirculation} alt="Double circulation: blood passes through the heart twice per cycle, once to the lungs and back, once to the body and back" caption="Double circulation in mammals and birds" isLightMode={isLightMode} />
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

              <DiagramImage src={DIAGRAMS.xylemPhloem} alt="Xylem carries water upward; phloem transports sucrose from source (leaf cell) to sink (root cell) via sieve-tube elements and companion cells" caption="Translocation of food through phloem, alongside xylem" isLightMode={isLightMode} />
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

              <DiagramImage src={DIAGRAMS.excretorySystem} alt="Human excretory system: aorta, right and left kidney, inferior vena cava, ureter, bladder, urethra" caption="The excretory system" isLightMode={isLightMode} />

              <SectionHeading>The Nephron: The Kidney's Filtration Unit</SectionHeading>
              <DiagramImage src={DIAGRAMS.kidneyNephron} alt="Kidney and nephron: glomerulus, Bowman's capsule, loop of the nephron, collecting duct, artery, vein, urine" caption="Structure of a nephron" isLightMode={isLightMode} />

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

          {activeTopic === "activities" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Hands-On Activities</h1>
                <p className="text-base font-semibold text-slate-400">Every practical activity from this chapter, in full: aim, materials, step-by-step procedure, observation, conclusion, and the reasoning behind each step.</p>
              </div>

              <InfoCard title="Why these activities matter" icon={FlaskConical}>
                <p>Every activity below is a real experiment/demonstration you can actually try (with adult supervision where needed) or that has already been performed to establish a fact you're studying as theory elsewhere in this chapter. Exam questions frequently ask about the procedure, expected observation, or the reason for a specific step -- so treat this list as seriously as the theory topics.</p>
              </InfoCard>

              <ActivityCard
                number={1}
                title="Chlorophyll is necessary for photosynthesis"
                aim="To show that a leaf can make starch (i.e. photosynthesise) only in the parts that contain chlorophyll."
                materials={["A potted plant with variegated leaves (green and white patches, e.g. money plant/Croton)", "Dark room", "Beaker, water, alcohol", "Water bath / bowl of hot water", "Dilute iodine solution", "White tile or petri dish"]}
                procedure={[
                  { step: "Keep the potted plant in a dark room for 3 days.", why: "This uses up all the starch already stored in the leaves (destarching), so any starch found afterwards must be freshly made." },
                  { step: "Place the plant in bright sunlight for about 6 hours.", why: "Gives the leaf time to photosynthesise again -- but only in the parts that actually contain chlorophyll." },
                  { step: "Pluck a variegated leaf and trace its green and white areas onto paper before testing it.", why: "Once the leaf is decolorised in the next steps, the green and white patches become impossible to tell apart by eye." },
                  { step: "Dip the leaf in boiling water for a few minutes.", why: "Softens and breaks down the leaf's cell walls so that alcohol can penetrate the tissue easily in the next step." },
                  { step: "Put the leaf in a beaker of alcohol, and heat that beaker in a water bath until the alcohol boils.", why: "Alcohol dissolves out all the chlorophyll, turning the leaf pale -- alcohol is heated indirectly (water bath), never on a direct flame, because it is highly flammable." },
                  { step: "Dip the decolorised leaf in dilute iodine solution for a few minutes, then rinse with water.", why: "Iodine reacts with any starch present to give a blue-black colour, revealing exactly where starch was made." },
                ]}
                observation="The areas of the leaf that were green turn blue-black with iodine. The areas that were white (no chlorophyll) stay iodine's own brown colour -- no blue-black change."
                conclusion="Starch is formed only in the parts of the leaf that had chlorophyll, proving that chlorophyll is necessary for photosynthesis."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={2}
                title="Carbon dioxide is necessary for photosynthesis"
                aim="To show that a plant needs carbon dioxide from the air in order to photosynthesise and form starch."
                materials={["Two healthy potted plants of nearly the same size", "A watch-glass", "Potassium hydroxide (KOH)", "Two bell jars", "Vaseline", "Dark room, then sunlight", "Alcohol, water, dilute iodine solution"]}
                procedure={[
                  { step: "Keep both potted plants in a dark room for three days.", why: "Destarches both plants so the test result only reflects what happens during the experiment, not leftover starch." },
                  { step: "Place a watch-glass containing KOH beside one plant (call it Plant A); leave the other plant (Plant B) without any KOH, as the control.", why: "KOH absorbs carbon dioxide from the air around it (forming potassium carbonate), so Plant A is left with almost no CO2 available." },
                  { step: "Cover both plants with separate bell jars and seal the base of each jar to its glass plate with Vaseline, making them air-tight.", why: "Stops outside air (and its CO2) from leaking in or out, so each plant's own sealed atmosphere is what actually gets tested." },
                  { step: "Keep both air-tight set-ups in sunlight for about two hours.", why: "Gives light and time for photosynthesis to occur wherever CO2 is actually available." },
                  { step: "Pluck a leaf from each plant and test both for starch using the iodine test (boil in water, decolorise in alcohol via a water bath, then dip in iodine).", why: "Same reasoning as Activity 1 -- this reveals whether starch was actually made." },
                ]}
                observation="The leaf from Plant B (no KOH, CO2 freely available) turns blue-black with iodine. The leaf from Plant A (KOH present, CO2 absorbed) does not turn blue-black, or turns only a very faint shade."
                conclusion="Since the CO2-starved plant could not make starch while the other plant could, carbon dioxide is necessary for photosynthesis."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={3}
                title="Saliva breaks down starch"
                aim="To show that saliva contains an enzyme that digests starch into simpler sugars."
                materials={["Two test tubes", "Starch solution", "A small saliva sample", "Dropper", "Dilute iodine solution"]}
                procedure={[
                  { step: "Take starch solution in two separate test tubes.", why: "Gives one tube to test with saliva and one to act as an untouched control for comparison." },
                  { step: "Add a little saliva to one test tube only, and leave both test tubes undisturbed for 20-30 minutes.", why: "This resting time lets the enzyme in saliva (salivary amylase) act on and break down the starch in that tube." },
                  { step: "Add a few drops of dilute iodine solution to both test tubes.", why: "Iodine turns blue-black in the presence of starch, so it shows directly whether starch is still there." },
                ]}
                observation="The test tube without saliva turns blue-black (starch is still present). The test tube with saliva stays largely unchanged or only faintly coloured -- the starch has already been broken down."
                conclusion="Saliva contains an enzyme (salivary amylase) that breaks starch down into simpler sugars, which is why digestion of starchy food already begins in the mouth."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={4}
                title="Exhaled air contains more carbon dioxide"
                aim="To compare the carbon dioxide content of exhaled (breathed-out) air with that of normal atmospheric air, using lime water."
                materials={["Two test tubes of fresh, clear lime water (calcium hydroxide solution)", "A delivery tube, syringe, or pichkari", "Cotton"]}
                procedure={[
                  { step: "Take two test tubes, each with a small amount of fresh lime water.", why: "Fresh lime water is clear, so any change to milky white is easy to see." },
                  { step: "Using a delivery tube or syringe, gently pass ordinary atmospheric air through the lime water in the first tube.", why: "This tube acts as the control, showing what normal room air does to lime water." },
                  { step: "Breathe out (exhale) directly into the lime water of the second tube several times through a tube.", why: "This tube captures the effect of air that has just come out of the lungs." },
                  { step: "Compare how quickly and how strongly each tube turns milky.", why: "The speed and strength of the milkiness is a direct measure of how much CO2 was present." },
                ]}
                observation="The tube into which exhaled air was blown turns milky quickly and heavily. The tube with ordinary atmospheric air passed through it stays clear, or turns only very faintly milky even after a long time."
                conclusion="Exhaled air contains far more carbon dioxide than atmospheric air, because CO2 reacts with the calcium hydroxide in lime water to form insoluble calcium carbonate, which is what makes the solution turn milky."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={5}
                title="Fermentation by yeast releases carbon dioxide"
                aim="To demonstrate that yeast carries out anaerobic respiration (fermentation) on sugar and releases carbon dioxide gas."
                materials={["A conical flask or bottle", "Lukewarm water", "Sugar", "Dry yeast granules", "A balloon (or a delivery tube leading into a test tube of lime water)", "Rubber band"]}
                procedure={[
                  { step: "Add lukewarm water and a spoonful of sugar to the flask.", why: "Sugar is the food substrate yeast will ferment; the water is kept warm (not hot) so it activates the yeast without killing it." },
                  { step: "Add a small amount of dry yeast granules to the sugar solution and swirl gently.", why: "This introduces the living yeast cells that will actually carry out the fermentation." },
                  { step: "Immediately stretch a deflated balloon tightly over the mouth of the flask and secure it with a rubber band.", why: "Traps any gas produced inside the flask so it can be seen inflating the balloon, instead of escaping into the room." },
                  { step: "Keep the set-up undisturbed in a warm place for 30-60 minutes and check on it periodically.", why: "Fermentation needs time to build up a detectable amount of gas." },
                ]}
                observation="The balloon gradually inflates on its own, and a faint alcohol-like smell may be noticed near the flask."
                conclusion="Yeast breaks down sugar without using oxygen (anaerobic respiration/fermentation), releasing carbon dioxide gas (which inflates the balloon) and ethanol as by-products."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={6}
                title="Observing the breathing rate of a fish"
                aim="To observe the gill (breathing) movements of a fish and estimate its breathing rate."
                materials={["A fish in an aquarium or fish bowl", "A stop-watch or timer"]}
                procedure={[
                  { step: "Observe a fish swimming normally in an aquarium without disturbing or stressing it.", why: "A calm, undisturbed fish gives a natural, resting breathing rate rather than a panicked one." },
                  { step: "Watch the gill covers (operculum) at the sides of its head and count how many times they open and close in one full minute, using a stop-watch.", why: "Counting over a full minute (not just a few seconds) gives a far more reliable rate, since breathing can vary moment to moment." },
                  { step: "Repeat the count 2-3 times and take the average.", why: "Averaging multiple counts reduces the effect of any one unusually fast or slow reading." },
                ]}
                observation="The gill covers open and close rhythmically and quite rapidly -- noticeably faster than a human's breathing rate."
                conclusion="Fish breathe faster than land animals because the amount of dissolved oxygen in water is far lower than the amount of oxygen in air, so a much larger volume of water must pass over the gills every minute to obtain enough oxygen."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={7}
                title="Field visit: measuring haemoglobin and blood pressure"
                aim="To visit a nearby health centre and see, first-hand, how haemoglobin content and blood pressure are measured, and to learn their normal ranges."
                materials={["No equipment of your own is needed -- this is an observational field visit", "A notebook to record the readings shown by the technician/doctor"]}
                procedure={[
                  { step: "Visit a nearby primary health centre, hospital, or pathology lab along with a teacher or family member.", why: "Seeing real clinical instruments in use makes the abstract numbers from theory concrete." },
                  { step: "Observe (or ask the technician to explain) how a small blood sample is used to estimate haemoglobin content using a haemoglobinometer.", why: "Connects directly to the role of haemoglobin in carrying oxygen, covered under blood and transportation." },
                  { step: "Observe how blood pressure is measured using a sphygmomanometer, noting both the systolic and diastolic readings.", why: "Shows exactly how the systolic/diastolic pressures discussed in theory are actually measured in practice." },
                  { step: "Note down the normal ranges the technician or doctor states.", why: "Lets you compare the textbook's normal values against what a real clinician quotes." },
                ]}
                observation="Typical normal ranges quoted are: Haemoglobin -- about 14-18 g/dL for males and 12-16 g/dL for females; Blood pressure -- about 120/80 mm Hg."
                conclusion="Haemoglobin content and blood pressure are two vital signs of the transportation system's health, and both can be measured quickly with simple, everyday clinical instruments."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={8}
                title="Demonstrating transpiration"
                aim="To demonstrate that leaves lose water to the atmosphere through transpiration."
                materials={["A healthy, leafy potted plant (or a leafy twig standing in a bottle of water)", "A transparent polythene bag", "Thread or a rubber band"]}
                procedure={[
                  { step: "Choose a few healthy, leafy branches on the plant.", why: "Healthy leaves with open stomata transpire actively, giving a clear result." },
                  { step: "Cover the chosen branches completely with a transparent polythene bag and tie the mouth of the bag tightly around the stem with thread.", why: "A tight seal ensures that any water vapour collected genuinely came from the leaves themselves, not from the surrounding air." },
                  { step: "Keep the set-up in sunlight for a few hours.", why: "Sunlight keeps the stomata open and drives active transpiration, so water loss happens quickly enough to observe." },
                  { step: "Check the inner surface of the polythene bag periodically.", why: "The bag is the only surface the water vapour can condense on, since it is sealed off from the outside air." },
                ]}
                observation="Fine droplets of water gradually appear and collect on the inside surface of the polythene bag."
                conclusion="The leaves continuously release water vapour into the air through transpiration; the sealed bag simply traps and condenses it so the water loss becomes visible."
                isLightMode={isLightMode}
              />
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
