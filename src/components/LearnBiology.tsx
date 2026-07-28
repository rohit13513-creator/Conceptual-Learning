import React, { useState } from "react";
import {
  BookOpen,
  Award,
  HelpCircle,
  Printer,
  Microscope,
  Dna,
  Leaf,
  Droplet,
  Zap,
  Package,
  Trash2,
  Network,
  GitBranch,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type BioTopicId =
  | "intro-to-cells"
  | "discovery-history"
  | "studying-cells"
  | "cell-membrane"
  | "diffusion-osmosis"
  | "cell-wall"
  | "nucleus"
  | "prokaryotic-eukaryotic"
  | "er-golgi"
  | "lysosomes"
  | "mitochondria"
  | "plastids"
  | "vacuoles"
  | "plant-vs-animal-cell"
  | "cell-division"
  | "glossary-mindmap";

interface BioTopic {
  id: BioTopicId;
  title: string;
  category: string;
}

const BIO_TOPICS: BioTopic[] = [
  { id: "intro-to-cells", title: "1. What Is a Cell?", category: "Fundamentals" },
  { id: "discovery-history", title: "2. Discovery of the Cell", category: "Fundamentals" },
  { id: "studying-cells", title: "3. How Do We Study Cells?", category: "Fundamentals" },
  { id: "cell-membrane", title: "4. The Cell Membrane", category: "Cell Boundary" },
  { id: "diffusion-osmosis", title: "5. Diffusion & Osmosis", category: "Cell Boundary" },
  { id: "cell-wall", title: "6. The Cell Wall", category: "Cell Boundary" },
  { id: "nucleus", title: "7. The Nucleus", category: "Control Centre" },
  { id: "prokaryotic-eukaryotic", title: "8. Prokaryotic vs Eukaryotic Cells", category: "Control Centre" },
  { id: "er-golgi", title: "9. Endoplasmic Reticulum & Golgi Apparatus", category: "Cell Organelles" },
  { id: "lysosomes", title: "10. Lysosomes", category: "Cell Organelles" },
  { id: "mitochondria", title: "11. Mitochondria", category: "Cell Organelles" },
  { id: "plastids", title: "12. Plastids", category: "Cell Organelles" },
  { id: "vacuoles", title: "13. Vacuoles", category: "Cell Organelles" },
  { id: "plant-vs-animal-cell", title: "14. Plant Cell vs Animal Cell", category: "Big Picture" },
  { id: "cell-division", title: "15. Cell Division: Mitosis & Meiosis", category: "Big Picture" },
  { id: "glossary-mindmap", title: "16. Quick Glossary & Mind Map", category: "Revision" },
];

interface LearnBiologyProps {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// ── Reusable building blocks (same visual language as the Chemistry/Physics notes) ──

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

// A single "cell part: what it does" row, used to build compact reference lists.
const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sm text-slate-300 font-semibold">
    <span className="text-white font-black">{label}:</span> <span>{children}</span>
  </div>
);

// A two-column "X vs Y" comparison card built from a simple data array -- used instead of
// an HTML <table> so it stays readable on small screens and follows light/dark mode cleanly.
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

// A diagram "card" wrapper -- every SVG diagram sits inside one of these for a consistent frame.
const DiagramCard: React.FC<{ caption: string; children: React.ReactNode; isLightMode?: boolean }> = ({ caption, children, isLightMode = false }) => (
  <div className="space-y-2">
    <div className={`rounded-2xl border p-3 shadow-lg ${isLightMode ? "bg-white border-slate-200" : "bg-[#0b1710] border-slate-800"}`}>
      {children}
    </div>
    <p className={`text-center text-[13px] font-bold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>{caption}</p>
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

export function LearnBiology({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnBiologyProps) {
  const [activeTopic, setActiveTopic] = useState<BioTopicId>("intro-to-cells");

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-biology-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Dna className="w-4 h-4 text-green-500" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-green-400"}`}>Cells: Structure & Function</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-green-500" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Cells Notes</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              The basic unit of life -- structure, organelles, and how cells work, explained simply.
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-biology-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-biology-main p, #learn-biology-main li, #learn-biology-main span, #learn-biology-main label, #learn-biology-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-biology-main b, #learn-biology-main strong, #learn-biology-main h1, #learn-biology-main h2, #learn-biology-main h3, #learn-biology-main h4, #learn-biology-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-biology-container .bg-slate-900, #learn-biology-container .bg-\\[\\#0d1424\\], #learn-biology-container .bg-\\[\\#0f1a12\\], #learn-biology-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-biology-container .border-slate-800, #learn-biology-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-green-50 via-emerald-50 to-green-50 border-green-300" : "from-green-950/40 via-[#0a2018]/40 to-emerald-950/40 border-green-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 shrink-0">
                <Dna className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-green-400 tracking-tight">Class IX: cells notes</h4>
              </div>
            </div>
          </div>

          {activeTopic === "intro-to-cells" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">What Is a Cell?</h1>
                <p className="text-base font-semibold text-slate-400">The smallest unit that is still "alive" -- and the starting point for everything in biology.</p>
              </div>

              <InfoCard title="Core Definition" icon={Award}>
                <p><b className="text-white">Cell:</b> the smallest structural and functional unit of every living thing. Every organism -- from a single bacterium to a giant tree to you -- is built entirely out of cells.</p>
              </InfoCard>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-4">
                <p>Think of a cell as a tiny, self-contained "room" that can do everything a living thing needs to do: take in food, breathe, get rid of waste, grow, and even make copies of itself. The word "cell" actually comes from a Latin word meaning <b>"a little room"</b>.</p>
                <p>Every living cell can carry out basic life functions on its own -- respiration (releasing energy), obtaining nutrition, removing waste, and building new material. Some organisms are just one cell doing all of this by itself; others are made of trillions of cells all working as a team.</p>
              </div>

              <SectionHeading>Unicellular vs Multicellular Organisms</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Unicellular</h4>
                  <p className="text-sm font-semibold">Made of a <b>single cell</b> that does every job by itself.</p>
                  <p className="text-[13.5px] text-slate-400">Examples: Amoeba, Paramecium, Chlamydomonas, most bacteria.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">Multicellular</h4>
                  <p className="text-sm font-semibold">Made of <b>many cells</b>, grouped into tissues and organs that work together.</p>
                  <p className="text-[13.5px] text-slate-400">Examples: fungi, plants, animals, humans.</p>
                </div>
              </div>

              <RememberBox title="Every big organism started as one cell">
                Even a multicellular organism like you began life as a single fertilised cell. That one cell divided again and again to eventually form every cell in your body -- so ultimately, <b>all cells come from pre-existing cells</b>.
              </RememberBox>

              <SectionHeading>Shape and Size of Cells</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>A cell's shape usually depends on the job it does. Some cells, like Amoeba, keep changing shape as they move and feed. Other cells have a fixed, specialised shape -- for example, nerve cells are long and thread-like so they can carry signals over long distances.</p>
                <p>Cells also vary hugely in size -- from bacteria just a couple of micrometres across, up to some plant cells you can just about see with the naked eye. You will see exactly how small this is in the next topic.</p>
              </div>
            </div>
          )}

          {activeTopic === "discovery-history" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Discovery of the Cell</h1>
                <p className="text-base font-semibold text-slate-400">How scientists slowly uncovered that all life is built from cells.</p>
              </div>

              <InfoCard title="Timeline of Discovery" icon={Sparkles}>
                <div className="space-y-2.5">
                  <p><b className="text-white">1665 -- Robert Hooke:</b> examined a wafer-thin slice of cork (bark of a tree) under a self-made microscope. He saw tiny box-like compartments, like a honeycomb, and named them <b>"cells."</b> This was the first time anyone had seen that living material is made of separate units.</p>
                  <p><b className="text-white">1674 -- Antonie van Leeuwenhoek:</b> using an improved microscope, he was the first to observe free-living cells swimming in pond water.</p>
                  <p><b className="text-white">1831 -- Robert Brown:</b> discovered the nucleus inside the cell.</p>
                  <p><b className="text-white">1839 -- Jan Evangelista Purkinje:</b> coined the term <b>"protoplasm"</b> for the living fluid substance inside a cell.</p>
                </div>
              </InfoCard>

              <SectionHeading>The Cell Theory</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Three scientists, working a few years apart, put together the idea that is now called the <b>Cell Theory</b> -- one of the most important unifying ideas in all of biology:</p>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Matthias Schleiden (1838)">Reported that all plants are made up of cells.</FactRow>
                <FactRow label="Theodor Schwann (1839)">Found that all animals are also made up of cells. Together with Schleiden, this gave the first two statements of Cell Theory: all living things are made of cells, and the cell is the basic unit of structure and function.</FactRow>
                <FactRow label="Rudolf Virchow (1855)">Added the third and final statement: all cells arise only from pre-existing cells (a cell cannot form from non-living matter).</FactRow>
              </div>

              <RememberBox title="The three statements of Cell Theory">
                1) All living organisms are made up of one or more cells. 2) The cell is the basic unit of structure and function in living things. 3) All cells arise from pre-existing cells.
              </RememberBox>

              <div className="prose prose-sm leading-relaxed font-semibold">
                <p>Later, in the 1940s, the invention of the <b>electron microscope</b> let scientists see the tiny structures (organelles) inside a cell in much finer detail than ever before -- opening up everything you will learn in this chapter.</p>
              </div>
            </div>
          )}

          {activeTopic === "studying-cells" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">How Do We Study Cells?</h1>
                <p className="text-base font-semibold text-slate-400">Cells are far too small to see with the naked eye -- so we need help.</p>
              </div>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>The human eye can only tell two points apart if they are at least about 0.1 mm away from each other -- this is called the eye's <b>limit of resolution</b>. Most cells are much, much smaller than that, so we need instruments that magnify (enlarge) and resolve (show fine detail) far beyond what our eyes can manage.</p>
              </div>

              <DiagramCard caption="Roughly how big different things are, from a whole plant down to a single molecule (not to true scale)" isLightMode={isLightMode}>
                <svg viewBox="0 0 720 220" className="w-full h-auto">
                  <line x1="40" y1="185" x2="680" y2="185" stroke={isLightMode ? "#cbd5e1" : "#334155"} strokeWidth="2" />
                  <text x="360" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>Smaller ⟵────────────────────────────────────⟶ Larger</text>

                  <g>
                    <circle cx="90" cy="145" r="3" fill={isLightMode ? "#0891b2" : "#22d3ee"} />
                    <text x="90" y="190" textAnchor="middle" fontSize="13" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Virus</text>
                    <text x="90" y="204" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>~100 nm</text>
                  </g>

                  <g>
                    <circle cx="250" cy="145" r="14" fill={isLightMode ? "#059669" : "#34d399"} fillOpacity="0.85" />
                    <text x="250" y="190" textAnchor="middle" fontSize="13" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Bacterium</text>
                    <text x="250" y="204" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>~1-10 μm</text>
                  </g>

                  <g>
                    <circle cx="440" cy="130" r="48" fill={isLightMode ? "#65a30d" : "#a3e635"} fillOpacity="0.25" stroke={isLightMode ? "#65a30d" : "#a3e635"} strokeWidth="2" />
                    <text x="440" y="190" textAnchor="middle" fontSize="13" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Plant / animal cell</text>
                    <text x="440" y="204" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>~10-100 μm</text>
                  </g>

                  <g>
                    <circle cx="630" cy="115" r="63" fill={isLightMode ? "#ca8a04" : "#fbbf24"} fillOpacity="0.18" stroke={isLightMode ? "#ca8a04" : "#fbbf24"} strokeWidth="2" strokeDasharray="4 3" />
                    <text x="630" y="190" textAnchor="middle" fontSize="13" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Just visible to the eye</text>
                    <text x="630" y="204" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>~0.1 mm (100 μm)</text>
                  </g>
                </svg>
              </DiagramCard>

              <SectionHeading>Two Kinds of Microscopes</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <div className="flex items-center gap-1.5">
                    <Microscope className="w-4 h-4 text-green-400" />
                    <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Light Microscope</h4>
                  </div>
                  <p className="text-sm font-semibold">Uses a lens (or combination of lenses) and visible light to magnify an object. Common in school labs -- good enough to see a cell's basic outline, nucleus, and larger organelles.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <div className="flex items-center gap-1.5">
                    <Microscope className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">Electron Microscope</h4>
                  </div>
                  <p className="text-sm font-semibold">Uses a beam of electrons instead of light, giving far higher magnification and resolution. This is what lets us see the fine details of organelles, down to the scale of a nanometre.</p>
                </div>
              </div>

              <RememberBox title="Magnification vs resolution">
                <b>Magnification</b> is how much bigger an object appears. <b>Resolution</b> is how much fine detail you can actually make out. A good microscope needs both -- magnifying a blurry image just makes a bigger blur.
              </RememberBox>
            </div>
          )}

          {activeTopic === "cell-membrane" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Cell Membrane</h1>
                <p className="text-base font-semibold text-slate-400">The thin boundary every single cell has, guarding what goes in and what goes out.</p>
              </div>

              <InfoCard title="Core Definition" icon={Layers}>
                <p><b className="text-white">Cell membrane (plasma membrane):</b> a thin, flexible boundary that surrounds every cell, separating its contents from the outside world. It is made mainly of lipids (fats) and proteins.</p>
              </InfoCard>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>The cell membrane is only about 7 to 10 nanometres thick -- far too thin to see without an electron microscope. Even so, it does an enormous job: it decides exactly what is allowed to enter or leave the cell.</p>
                <p>Because it lets some substances through while blocking others, it is called a <b>selectively permeable membrane</b>.</p>
              </div>

              <SectionHeading>The Fluid Mosaic Model</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>The membrane is built from a double layer ("bilayer") of special fat molecules called phospholipids, with proteins scattered throughout it -- like tiles arranged in a mosaic pattern. The molecules are not fixed in place; they can slide, rotate, and drift sideways, which is why the whole structure is described as <b>fluid</b>.</p>
              </div>

              <DiagramCard caption="The fluid mosaic model: a double layer of phospholipids with proteins floating in it" isLightMode={isLightMode}>
                <svg viewBox="0 0 680 240" className="w-full h-auto">
                  <text x="340" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>OUTSIDE THE CELL</text>
                  {Array.from({ length: 13 }).map((_, i) => {
                    if (i === 3 || i === 9) return null;
                    const x = 44 + i * 46;
                    return (
                      <g key={i}>
                        <line x1={x - 3} y1={62} x2={x - 3} y2={108} stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1={x + 3} y1={62} x2={x + 3} y2={108} stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx={x} cy="55" r="8" fill={isLightMode ? "#0e7490" : "#67e8f9"} />
                        <line x1={x - 3} y1={126} x2={x - 3} y2={172} stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1={x + 3} y1={126} x2={x + 3} y2={172} stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx={x} cy="179" r="8" fill={isLightMode ? "#0e7490" : "#67e8f9"} />
                      </g>
                    );
                  })}
                  {[3, 9].map((i) => {
                    const x = 44 + i * 46;
                    return (
                      <rect key={i} x={x - 13} y="42" width="26" height="150" rx="12" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity={isLightMode ? 0.8 : 0.55} stroke={isLightMode ? "#6d28d9" : "#a78bfa"} strokeWidth="1.5" />
                    );
                  })}
                  <text x="340" y="222" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>INSIDE THE CELL (CYTOPLASM)</text>
                </svg>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 justify-center mt-2 pt-2 border-t border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-300"><span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: isLightMode ? "#0e7490" : "#67e8f9" }} /> Phospholipid (round head + two tails)</span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-300"><span className="w-3 h-3 rounded shrink-0" style={{ backgroundColor: isLightMode ? "#7c3aed" : "#c4b5fd" }} /> Protein embedded in the membrane</span>
                </div>
              </DiagramCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="The molecules can move">sideways, flip, and rotate within the membrane -- this is why it is described as "fluid."</FactRow>
                <FactRow label="Proteins act as gatekeepers">helping specific substances pass through the membrane.</FactRow>
                <FactRow label="Endocytosis">because the membrane is flexible, some cells can even engulf whole food particles from outside. Amoeba feeds this way.</FactRow>
              </div>

              <RememberBox title="Cell wall is an extra layer, not a replacement">
                Every cell has a cell membrane. Plant, fungal, and bacterial cells additionally have a rigid cell wall outside the membrane -- you will meet that in a later topic.
              </RememberBox>
            </div>
          )}

          {activeTopic === "diffusion-osmosis" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Diffusion & Osmosis</h1>
                <p className="text-base font-semibold text-slate-400">How substances move in and out of a cell without it doing any active "work."</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard title="Diffusion" icon={Sparkles}>
                  <p>The spontaneous movement of particles from a region of <b className="text-white">higher concentration</b> to a region of <b className="text-white">lower concentration</b>, until they are evenly spread out. Oxygen and carbon dioxide move across cell membranes this way.</p>
                </InfoCard>
                <InfoCard title="Osmosis" icon={Droplet}>
                  <p>A special case of diffusion: the movement of <b className="text-white">water molecules</b> across a selectively permeable membrane, from a region with more water to a region with less water (more dissolved solute).</p>
                </InfoCard>
              </div>

              <SectionHeading>Three Situations a Cell Can Be In</SectionHeading>
              <DiagramCard caption="What happens to a cell placed in solutions with different water concentrations" isLightMode={isLightMode}>
                <svg viewBox="0 0 720 250" className="w-full h-auto">
                  {[
                    { cx: 120, label: "Hypotonic solution", sub: "more water outside -- cell swells", r: 58, arrows: "in", dots: 3 },
                    { cx: 360, label: "Isotonic solution", sub: "equal water in/out -- no change", r: 46, arrows: "none", dots: 7 },
                    { cx: 600, label: "Hypertonic solution", sub: "less water outside -- cell shrinks", r: 34, arrows: "out", dots: 13 },
                  ].map((panel, pi) => (
                    <g key={pi}>
                      <rect x={panel.cx - 100} y="20" width="200" height="160" rx="14" fill={isLightMode ? "#eff6ff" : "#0b1a2e"} stroke={isLightMode ? "#bfdbfe" : "#1e3a5f"} strokeWidth="1.5" />
                      {Array.from({ length: panel.dots }).map((_, di) => {
                        const gx = panel.cx - 80 + (di % 5) * 32;
                        const gy = 35 + Math.floor(di / 5) * 25;
                        return <circle key={di} cx={gx} cy={gy} r="3" fill={isLightMode ? "#3b82f6" : "#60a5fa"} fillOpacity="0.6" />;
                      })}
                      <circle cx={panel.cx} cy="100" r={panel.r} fill={isLightMode ? "#86efac" : "#166534"} fillOpacity="0.55" stroke={isLightMode ? "#16a34a" : "#4ade80"} strokeWidth="2.5" />
                      {panel.r !== 46 && (
                        <circle cx={panel.cx} cy="100" r="46" fill="none" stroke={isLightMode ? "#94a3b8" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
                      )}
                      {panel.arrows === "in" && [0, 90, 180, 270].map((ang) => {
                        const rad = (ang * Math.PI) / 180;
                        const x1 = panel.cx + Math.cos(rad) * 80, y1 = 100 + Math.sin(rad) * 80;
                        const x2 = panel.cx + Math.cos(rad) * 62, y2 = 100 + Math.sin(rad) * 62;
                        return <line key={ang} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isLightMode ? "#2563eb" : "#60a5fa"} strokeWidth="2.5" markerEnd="url(#bioArrowIn)" />;
                      })}
                      {panel.arrows === "out" && [0, 90, 180, 270].map((ang) => {
                        const rad = (ang * Math.PI) / 180;
                        const x1 = panel.cx + Math.cos(rad) * 38, y1 = 100 + Math.sin(rad) * 38;
                        const x2 = panel.cx + Math.cos(rad) * 58, y2 = 100 + Math.sin(rad) * 58;
                        return <line key={ang} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isLightMode ? "#dc2626" : "#f87171"} strokeWidth="2.5" markerEnd="url(#bioArrowOut)" />;
                      })}
                      <text x={panel.cx} y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>{panel.label}</text>
                      <text x={panel.cx} y="222" textAnchor="middle" fontSize="12" fill={isLightMode ? "#64748b" : "#94a3b8"}>{panel.sub}</text>
                    </g>
                  ))}
                  <defs>
                    <marker id="bioArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? "#2563eb" : "#60a5fa"} />
                    </marker>
                    <marker id="bioArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? "#dc2626" : "#f87171"} />
                    </marker>
                  </defs>
                </svg>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 justify-center mt-2 pt-2 border-t border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-300"><span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: isLightMode ? "#3b82f6" : "#60a5fa" }} /> Dissolved solute particles</span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-300"><span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: isLightMode ? "#16a34a" : "#4ade80" }} /> The cell</span>
                </div>
              </DiagramCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Hypotonic solution">has more water (less solute) than the cell -- water moves in, and the cell swells.</FactRow>
                <FactRow label="Isotonic solution">has the same water concentration as the cell -- no net movement, the cell stays the same size.</FactRow>
                <FactRow label="Hypertonic solution">has less water (more solute) than the cell -- water moves out, and the cell shrinks.</FactRow>
              </div>

              <RememberBox title="Everyday examples">
                A de-shelled egg or a raisin swells up in plain water (hypotonic) and shrinks in a strong sugar/salt solution (hypertonic). Plant roots take up water from soil by exactly this process of osmosis.
              </RememberBox>
            </div>
          )}

          {activeTopic === "cell-wall" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Cell Wall</h1>
                <p className="text-base font-semibold text-slate-400">An extra, rigid layer that gives plant cells their shape and strength.</p>
              </div>

              <InfoCard title="Core Definition" icon={Layers}>
                <p><b className="text-white">Cell wall:</b> a rigid, permeable outer covering found <b className="text-white">outside</b> the cell membrane in plant, fungal, and bacterial cells. It is mostly absent in animal cells.</p>
              </InfoCard>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Plants cannot walk away from wind, rain, or other stresses, so they need a strong structure to stay upright and keep their shape. The cell wall provides exactly that. In plants it is made mainly of <b>cellulose</b>, a tough carbohydrate built from many linked glucose units.</p>
                <p>Even though it is rigid, the cell wall is freely permeable -- water and dissolved minerals can pass straight through it. This, together with the selective permeability of the membrane underneath, is how plant roots absorb water and nutrients from soil.</p>
              </div>

              <SectionHeading>Plasmolysis -- What Happens When a Plant Cell Loses Water</SectionHeading>
              <DiagramCard caption="A plant cell in normal water (left) compared with the same cell in a concentrated solution (right)" isLightMode={isLightMode}>
                <svg viewBox="0 0 620 220" className="w-full h-auto">
                  <g>
                    <rect x="60" y="40" width="180" height="150" rx="8" fill="none" stroke={isLightMode ? "#65a30d" : "#a3e635"} strokeWidth="4" />
                    <circle cx="150" cy="115" r="62" fill={isLightMode ? "#86efac" : "#166534"} fillOpacity="0.5" stroke={isLightMode ? "#16a34a" : "#4ade80"} strokeWidth="2.5" />
                    <text x="150" y="205" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>In plain water</text>
                  </g>
                  <g>
                    <rect x="380" y="40" width="180" height="150" rx="8" fill="none" stroke={isLightMode ? "#65a30d" : "#a3e635"} strokeWidth="4" />
                    <circle cx="470" cy="115" r="34" fill={isLightMode ? "#86efac" : "#166534"} fillOpacity="0.5" stroke={isLightMode ? "#16a34a" : "#4ade80"} strokeWidth="2.5" />
                    <text x="470" y="205" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>In a concentrated (sugar/salt) solution</text>
                  </g>
                </svg>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 justify-center mt-2 pt-2 border-t border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-300"><span className="w-3 h-2 rounded-sm shrink-0 border-2" style={{ borderColor: isLightMode ? "#65a30d" : "#a3e635" }} /> Rigid cell wall (keeps its shape)</span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-300"><span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: isLightMode ? "#16a34a" : "#4ade80" }} /> Cell membrane + contents (shrinks)</span>
                </div>
              </DiagramCard>

              <div className="prose prose-sm leading-relaxed font-semibold">
                <p>Notice the outer wall stays exactly the same size and shape in both cases -- only the membrane and the contents inside it pull away and shrink. This shrinking-away of the cell contents from the wall is called <b>plasmolysis</b>.</p>
              </div>

              <RememberBox title="Why plant cells don't burst or collapse like animal cells">
                Because the wall is rigid, plant cells can take up a lot of water and swell against the wall without bursting -- the wall pushes back with equal pressure. This is also why animal cells (which have no wall) shrink much more dramatically in a concentrated solution, and can even change shape freely since they have no rigid boundary at all.
              </RememberBox>
            </div>
          )}

          {activeTopic === "nucleus" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Nucleus</h1>
                <p className="text-base font-semibold text-slate-400">The control room of the cell -- where all its genetic instructions are kept.</p>
              </div>

              <InfoCard title="Core Definition" icon={Dna}>
                <p><b className="text-white">Nucleus:</b> a large, prominent structure inside a cell, enclosed by its own double membrane, that stores the cell's genetic material (DNA) and directs almost everything the cell does.</p>
              </InfoCard>

              <DiagramCard caption="Structure of the nucleus" isLightMode={isLightMode}>
                <svg viewBox="-20 0 680 360" className="w-full h-auto">
                  <circle cx="320" cy="180" r="120" fill={isLightMode ? "#dbeafe" : "#0c1f3d"} stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="3" />
                  <circle cx="320" cy="180" r="112" fill="none" stroke={isLightMode ? "#1d4ed8" : "#60a5fa"} strokeWidth="1.5" strokeOpacity="0.7" />
                  {[315, 20, 110, 200].map((ang) => {
                    const rad = (ang * Math.PI) / 180;
                    return <circle key={ang} cx={320 + 116 * Math.cos(rad)} cy={180 + 116 * Math.sin(rad)} r="5" fill={isLightMode ? "#dbeafe" : "#0c1f3d"} />;
                  })}
                  <circle cx="278" cy="150" r="30" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity={isLightMode ? 0.85 : 0.6} stroke={isLightMode ? "#6d28d9" : "#a78bfa"} strokeWidth="1.5" />
                  {[
                    "M 350 210 q 15 -10 30 0 q 15 10 25 -2",
                    "M 330 240 q 12 12 28 2 q 14 -8 24 4",
                    "M 300 210 q 10 14 -5 22",
                  ].map((d, i) => (
                    <path key={i} d={d} fill="none" stroke={isLightMode ? "#334155" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" />
                  ))}

                  <line x1="320" y1="60" x2="320" y2="30" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="320" y="18" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nuclear membrane (double-layered)</text>

                  <line x1="391" y1="219" x2="500" y2="255" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="505" y="259" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nuclear pore</text>
                  <text x="505" y="274" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(lets material pass in/out)</text>

                  <line x1="250" y1="150" x2="120" y2="150" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="115" y="146" textAnchor="end" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nucleolus</text>
                  <text x="115" y="161" textAnchor="end" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(builds ribosome parts)</text>

                  <line x1="365" y1="235" x2="440" y2="310" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="445" y="314" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Chromatin</text>
                  <text x="445" y="329" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(thread-like DNA)</text>
                </svg>
              </DiagramCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Nuclear membrane">a double-layered covering with pores that allow material to move between the nucleus and the cytoplasm.</FactRow>
                <FactRow label="Nucleolus">a dense round body inside the nucleus where the building blocks of ribosomes are put together.</FactRow>
                <FactRow label="Chromatin">the entangled, thread-like form the DNA takes when the cell is not dividing.</FactRow>
                <FactRow label="Chromosomes">when a cell is about to divide, the chromatin organises itself into visible, rod-shaped chromosomes.</FactRow>
              </div>

              <SectionHeading>DNA, Genes, and Chromosomes</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Chromosomes are made of <b>DNA (Deoxyribonucleic Acid)</b> combined with specific proteins. DNA carries the coded instructions for building and running a cell, and for passing characteristics from parents to offspring. A working segment of DNA that codes for one particular characteristic is called a <b>gene</b>.</p>
                <p>The nucleus does not just store this information -- along with signals from the environment, it directs the chemical activities of the cell and plays the central role whenever a cell divides to reproduce itself.</p>
              </div>

              <RememberBox title="Cells without a nucleus">
                Mature red blood cells in humans lose their nucleus entirely -- this frees up extra space to carry more oxygen-carrying haemoglobin. The trade-off: without a nucleus they cannot repair or divide themselves, so they only survive around 120 days.
              </RememberBox>
            </div>
          )}

          {activeTopic === "prokaryotic-eukaryotic" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Prokaryotic vs Eukaryotic Cells</h1>
                <p className="text-base font-semibold text-slate-400">Every cell on Earth falls into one of exactly two categories, based on its nucleus.</p>
              </div>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Cells are sorted into two types depending on whether their genetic material is enclosed inside a proper nuclear membrane or not.</p>
              </div>

              <DiagramCard caption="A typical bacterial (prokaryotic) cell -- no nuclear membrane, no membrane-bound organelles" isLightMode={isLightMode}>
                <svg viewBox="0 0 560 260" className="w-full h-auto">
                  <rect x="80" y="60" width="360" height="130" rx="65" fill={isLightMode ? "#fef9c3" : "#1c1a06"} stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="3.5" />
                  <rect x="90" y="70" width="340" height="110" rx="55" fill="none" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="1.2" strokeOpacity="0.6" />
                  <ellipse cx="255" cy="125" rx="72" ry="26" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity={isLightMode ? 0.8 : 0.55} stroke={isLightMode ? "#6d28d9" : "#a78bfa"} strokeWidth="1.5" />
                  {[[190, 90], [340, 95], [370, 150], [200, 165], [320, 165]].map(([dx, dy], i) => (
                    <circle key={i} cx={dx} cy={dy} r="3.5" fill={isLightMode ? "#0f172a" : "#f1f5f9"} />
                  ))}
                  <path d="M 440 125 q 30 -10 45 5 q 15 15 40 0" fill="none" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="3" strokeLinecap="round" />

                  <line x1="255" y1="99" x2="255" y2="35" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="255" y="23" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nucleoid (DNA, no membrane around it)</text>

                  <line x1="200" y1="165" x2="150" y2="235" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="145" y="248" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Ribosomes</text>

                  <line x1="80" y1="110" x2="18" y2="110" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="15" y="100" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Cell wall +</text>
                  <text x="15" y="115" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>cell membrane</text>

                  <line x1="480" y1="130" x2="490" y2="210" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="490" y="223" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Flagellum</text>
                  <text x="490" y="238" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(for movement)</text>
                </svg>
              </DiagramCard>

              <CompareTable
                isLightMode={isLightMode}
                leftHeader="Prokaryotic Cell"
                rightHeader="Eukaryotic Cell"
                rows={[
                  ["No well-defined nucleus (has a nucleoid instead)", "Well-defined nucleus with a nuclear membrane"],
                  ["No membrane-bound organelles", "Has membrane-bound organelles (ER, Golgi, mitochondria, etc.)"],
                  ["Typical diameter: 1 to 10 μm", "Typical diameter: 10 to 100 μm"],
                  ["Usually unicellular", "Can be unicellular or multicellular"],
                  ["Examples: bacteria, archaea", "Examples: fungi, plants, animals, Amoeba"],
                ]}
              />

              <RememberBox title="Where the words come from">
                <b>Pro</b> means primitive/before, and <b>karyon</b> means nucleus -- so prokaryotic literally means "before a nucleus." <b>Eu</b> means true, so eukaryotic means "true nucleus."
              </RememberBox>
            </div>
          )}

          {activeTopic === "er-golgi" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Endoplasmic Reticulum & Golgi Apparatus</h1>
                <p className="text-base font-semibold text-slate-400">The cell's manufacturing line and its packaging/shipping department.</p>
              </div>

              <InfoCard title="Endoplasmic Reticulum (ER)" icon={Network}>
                <p>A large network of membrane-bound tubes and sheets spreading through the cytoplasm, continuous with the nuclear membrane. It manufactures and transports proteins, fats, and some hormones.</p>
              </InfoCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Rough ER (RER)</h4>
                  <p className="text-sm font-semibold">Looks "rough" because ribosomes are attached to its surface. Mainly involved in <b>protein synthesis</b> and secretion -- for example in gland cells.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">Smooth ER (SER)</h4>
                  <p className="text-sm font-semibold">No ribosomes on its surface, so it looks smooth. Involved in the synthesis and storage of <b>fats and hormones</b>.</p>
                </div>
              </div>

              <DiagramCard caption="Proteins made on the RER travel through the ER network to the Golgi apparatus, which packages and ships them out in vesicles" isLightMode={isLightMode}>
                <svg viewBox="0 0 720 260" className="w-full h-auto">
                  <path d="M 30 60 Q 60 130 30 200" fill="none" stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="5" strokeLinecap="round" />
                  {[85, 115, 145, 175].map((y, i) => (
                    <path key={i} d={`M 60 ${y} Q 120 ${y - 14} 180 ${y} Q 240 ${y + 14} 300 ${y}`} fill="none" stroke={isLightMode ? "#0e7490" : "#67e8f9"} strokeWidth="3" />
                  ))}
                  {[[80, 78], [95, 108], [110, 140], [85, 170], [130, 90], [140, 160]].map(([dx, dy], i) => (
                    <circle key={i} cx={dx} cy={dy} r="3.5" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} />
                  ))}
                  {[0, 1, 2, 3, 4].map((i) => {
                    const y = 90 + i * 22;
                    const off = (i % 2) * 10;
                    return <path key={i} d={`M ${420 + off} ${y} Q 470 ${y - 8} 520 ${y}`} fill="none" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="5" strokeLinecap="round" />;
                  })}
                  <circle cx="580" cy="140" r="10" fill={isLightMode ? "#a16207" : "#facc15"} fillOpacity="0.5" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="2" />
                  <circle cx="630" cy="115" r="7" fill={isLightMode ? "#a16207" : "#facc15"} fillOpacity="0.5" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="2" />
                  <path d="M 340 130 Q 380 100 415 130" fill="none" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#bioArrowGolgi)" />
                  <defs>
                    <marker id="bioArrowGolgi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? "#64748b" : "#94a3b8"} />
                    </marker>
                  </defs>

                  <text x="30" y="40" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nucleus</text>
                  <text x="150" y="230" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Endoplasmic Reticulum</text>
                  <text x="60" y="248" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(dots = ribosomes on the rough ER)</text>
                  <text x="470" y="230" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Golgi Apparatus</text>
                  <text x="630" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Vesicles</text>
                  <text x="630" y="150" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>heading out of the cell</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Golgi Apparatus -- The Packaging and Shipping Centre</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>The Golgi apparatus is a stack of flattened, sac-like membranes. Material made near the ER is sent to the Golgi apparatus, which <b>modifies, sorts, and packages</b> proteins and fats into small vesicles for transport, secretion out of the cell, or for forming lysosomes.</p>
              </div>

              <RememberBox title="Think of it as a production line">
                Nucleus (instructions) → Rough ER (makes the protein) → Golgi apparatus (packages and labels it) → Vesicle (delivery van) → destination inside or outside the cell.
              </RememberBox>
            </div>
          )}

          {activeTopic === "lysosomes" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Lysosomes</h1>
                <p className="text-base font-semibold text-slate-400">The cell's clean-up crew.</p>
              </div>

              <InfoCard title="Core Definition" icon={Trash2}>
                <p><b className="text-white">Lysosomes:</b> small, single membrane-bound sacs filled with powerful digestive enzymes, made by the rough ER.</p>
              </InfoCard>

              <DiagramCard caption="A lysosome breaking down worn-out material inside the cell" isLightMode={isLightMode}>
                <svg viewBox="0 0 480 240" className="w-full h-auto">
                  <circle cx="230" cy="120" r="95" fill={isLightMode ? "#fee2e2" : "#2a0f10"} stroke={isLightMode ? "#dc2626" : "#f87171"} strokeWidth="3.5" />
                  {[[195, 90], [265, 95], [200, 150], [260, 155], [230, 75], [230, 165]].map(([dx, dy], i) => (
                    <polygon key={i} points={`${dx},${dy - 7} ${dx + 6},${dy} ${dx},${dy + 7} ${dx - 6},${dy}`} fill={isLightMode ? "#dc2626" : "#f87171"} />
                  ))}
                  <path d="M 225 115 l 10 -14 l 8 6 l -6 10 l 8 4 l -10 12 l -12 -6 z" fill={isLightMode ? "#78716c" : "#a8a29e"} fillOpacity="0.7" stroke={isLightMode ? "#57534e" : "#78716c"} strokeWidth="1.5" />

                  <line x1="230" y1="25" x2="230" y2="5" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="230" y="-3" textAnchor="middle" fontSize="1" fill="none" />
                  <text x="230" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Single membrane</text>

                  <line x1="300" y1="90" x2="400" y2="60" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="405" y="64" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Digestive</text>
                  <text x="405" y="79" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>enzymes</text>

                  <line x1="245" y1="125" x2="330" y2="200" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="335" y="204" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Worn-out material</text>
                  <text x="335" y="219" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>being broken down</text>
                </svg>
              </DiagramCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Waste disposal">Lysosomes keep the cell clean by digesting unwanted proteins, carbohydrates, fats, foreign material like bacteria, and worn-out organelles.</FactRow>
                <FactRow label="Recycling">The simple products of this breakdown are released into the cytoplasm and can be reused by the cell.</FactRow>
                <FactRow label='"Suicide bags"'>if a cell is damaged, lysosomes can burst and digest the entire cell from within -- which is how they earned this nickname.</FactRow>
              </div>
            </div>
          )}

          {activeTopic === "mitochondria" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Mitochondria</h1>
                <p className="text-base font-semibold text-slate-400">Often called the "powerhouse of the cell" -- and for good reason.</p>
              </div>

              <InfoCard title="Core Definition" icon={Zap}>
                <p><b className="text-white">Mitochondrion:</b> a double-membrane-bound organelle that releases energy for the cell's activities by breaking down glucose in a process called cellular respiration.</p>
              </InfoCard>

              <DiagramCard caption="Structure of a mitochondrion" isLightMode={isLightMode}>
                <svg viewBox="0 -10 620 270" className="w-full h-auto">
                  <ellipse cx="310" cy="130" rx="220" ry="85" fill={isLightMode ? "#fed7aa" : "#3a1a06"} stroke={isLightMode ? "#c2410c" : "#fb923c"} strokeWidth="4" />
                  <ellipse cx="310" cy="130" rx="196" ry="66" fill="none" stroke={isLightMode ? "#c2410c" : "#fb923c"} strokeWidth="2.5" />
                  {[-140, -80, -20, 40, 100, 160].map((dx, i) => (
                    <path
                      key={i}
                      d={`M ${310 + dx} 66 q ${i % 2 === 0 ? 30 : -30} 64 0 128`}
                      fill="none"
                      stroke={isLightMode ? "#c2410c" : "#fb923c"}
                      strokeWidth="2.5"
                    />
                  ))}
                  <circle cx="245" cy="120" r="4" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} />
                  <circle cx="255" cy="132" r="4" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} />

                  <line x1="310" y1="45" x2="310" y2="18" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="310" y="10" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Outer membrane (smooth)</text>

                  <line x1="150" y1="100" x2="60" y2="60" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="55" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Cristae</text>
                  <text x="55" y="70" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(folded inner</text>
                  <text x="55" y="82" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>membrane)</text>

                  <line x1="250" y1="126" x2="180" y2="215" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="175" y="228" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Own DNA</text>

                  <line x1="450" y1="110" x2="540" y2="70" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="545" y="65" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Matrix</text>
                  <text x="545" y="80" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(inner fluid)</text>
                </svg>
              </DiagramCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Outer membrane">smooth and porous.</FactRow>
                <FactRow label="Inner membrane">folded into finger-like projections called cristae, which increase the surface area available for energy-releasing reactions.</FactRow>
                <FactRow label="ATP">the energy released during cellular respiration is stored in a molecule called Adenosine Triphosphate (ATP) -- the cell's "energy currency," used to power most cellular activities.</FactRow>
                <FactRow label="Its own DNA">mitochondria carry their own small set of DNA and ribosomes, so they can make some of their own proteins.</FactRow>
              </div>
            </div>
          )}

          {activeTopic === "plastids" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Plastids</h1>
                <p className="text-base font-semibold text-slate-400">Special organelles found in plant cells, used for making and storing food.</p>
              </div>

              <InfoCard title="Core Definition" icon={Leaf}>
                <p><b className="text-white">Plastid:</b> a double-membrane-bound organelle found in plant cells, involved in food synthesis and storage. Like mitochondria, plastids have their own DNA and ribosomes.</p>
              </InfoCard>

              <DiagramCard caption="Structure of a chloroplast, the plastid responsible for photosynthesis" isLightMode={isLightMode}>
                <svg viewBox="0 -10 580 270" className="w-full h-auto">
                  <ellipse cx="280" cy="130" rx="190" ry="90" fill={isLightMode ? "#dcfce7" : "#052e18"} stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="4" />
                  <ellipse cx="280" cy="130" rx="170" ry="74" fill="none" stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="2" />
                  {[[190, 100], [250, 90], [310, 105], [200, 155], [270, 165], [340, 150]].map(([dx, dy], i) => (
                    <g key={i}>
                      {[0, 1, 2, 3].map((s) => (
                        <ellipse key={s} cx={dx} cy={dy - s * 5} rx="20" ry="5" fill={isLightMode ? "#16a34a" : "#22c55e"} fillOpacity="0.8" />
                      ))}
                    </g>
                  ))}

                  <line x1="280" y1="40" x2="280" y2="15" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="280" y="8" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Outer + inner membrane</text>

                  <line x1="130" y1="150" x2="55" y2="200" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="50" y="215" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Stroma</text>
                  <text x="50" y="230" textAnchor="middle" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(fluid inside)</text>

                  <line x1="340" y1="135" x2="440" y2="200" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="445" y="204" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Chlorophyll discs</text>
                  <text x="445" y="219" fontSize="11.5" fill={isLightMode ? "#64748b" : "#94a3b8"}>(absorb sunlight)</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Three Types of Plastids</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Chloroplasts (green)">contain the green pigment chlorophyll, which absorbs sunlight for photosynthesis -- the process by which plants make their own food.</FactRow>
                <FactRow label="Chromoplasts (coloured)">contain yellow, orange, or red pigments. They give flowers and fruits their bright colours, which attract pollinators and seed-dispersing animals.</FactRow>
                <FactRow label="Leucoplasts (colourless)">have no pigment at all. They store food materials such as starch, oils, or proteins -- for example, in potato and taro tubers.</FactRow>
              </div>
            </div>
          )}

          {activeTopic === "vacuoles" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Vacuoles</h1>
                <p className="text-base font-semibold text-slate-400">Storage sacs -- small in animal cells, often enormous in plant cells.</p>
              </div>

              <InfoCard title="Core Definition" icon={Droplet}>
                <p><b className="text-white">Vacuole:</b> a fluid-filled sac, surrounded by a single membrane, used for storing water, minerals, sugars, and waste.</p>
              </InfoCard>

              <DiagramCard caption="A mature plant cell (large central vacuole) next to an animal cell (several small vacuoles)" isLightMode={isLightMode}>
                <svg viewBox="0 0 620 240" className="w-full h-auto">
                  <g>
                    <rect x="40" y="30" width="240" height="175" rx="16" fill={isLightMode ? "#dcfce7" : "#052e18"} stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="3.5" />
                    <circle cx="160" cy="117" r="72" fill={isLightMode ? "#93c5fd" : "#1e3a5f"} fillOpacity="0.55" stroke={isLightMode ? "#2563eb" : "#60a5fa"} strokeWidth="2.5" />
                    <text x="160" y="222" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Plant cell</text>
                  </g>
                  <g>
                    <circle cx="470" cy="117" r="105" fill={isLightMode ? "#fce7f3" : "#2a0f1e"} stroke={isLightMode ? "#be185d" : "#f472b6"} strokeWidth="3.5" />
                    {[[430, 90], [500, 80], [510, 145], [440, 155]].map(([dx, dy], i) => (
                      <circle key={i} cx={dx} cy={dy} r="14" fill={isLightMode ? "#93c5fd" : "#1e3a5f"} fillOpacity="0.55" stroke={isLightMode ? "#2563eb" : "#60a5fa"} strokeWidth="2" />
                    ))}
                    <text x="470" y="222" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Animal cell</text>
                  </g>
                </svg>
              </DiagramCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="In plant cells">a mature cell usually has one large central vacuole, which can occupy 50-90% of the cell's total volume. It is filled with a watery fluid called cell sap.</FactRow>
                <FactRow label="Turgidity">by storing large amounts of water, the vacuole builds up internal pressure that keeps a plant cell firm (turgid). When water is scarce, the vacuole loses water and the plant wilts.</FactRow>
                <FactRow label="In animal cells">vacuoles are present but much smaller, used only for temporary storage.</FactRow>
                <FactRow label="In Amoeba">a food vacuole holds the food the cell has engulfed, while a separate contractile vacuole pumps out excess water.</FactRow>
              </div>
            </div>
          )}

          {activeTopic === "plant-vs-animal-cell" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Plant Cell vs Animal Cell</h1>
                <p className="text-base font-semibold text-slate-400">Putting all the organelles together into two full, labelled cells.</p>
              </div>

              <DiagramCard caption="A typical plant cell -- boxy in shape, with a cell wall and one large central vacuole" isLightMode={isLightMode}>
                <svg viewBox="0 0 900 540" className="w-full h-auto">
                  <rect x="190" y="70" width="480" height="400" rx="28" fill={isLightMode ? "#ecfdf5" : "#08150e"} stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="5" />
                  <rect x="204" y="84" width="452" height="372" rx="22" fill="none" stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2.5" />

                  <circle cx="300" cy="170" r="58" fill={isLightMode ? "#ede9fe" : "#1e1240"} stroke={isLightMode ? "#7c3aed" : "#c4b5fd"} strokeWidth="3" />
                  <circle cx="315" cy="172" r="17" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity="0.6" stroke={isLightMode ? "#7c3aed" : "#c4b5fd"} strokeWidth="1.5" />

                  <circle cx="465" cy="315" r="115" fill={isLightMode ? "#dbeafe" : "#0e2438"} fillOpacity="0.7" stroke={isLightMode ? "#2563eb" : "#60a5fa"} strokeWidth="3" />

                  {[[228, 355, 0], [615, 155, 25]].map(([dx, dy, rot], i) => (
                    <g key={i} transform={`translate(${dx},${dy}) rotate(${rot})`}>
                      <ellipse cx="0" cy="0" rx="26" ry="14" fill={isLightMode ? "#fed7aa" : "#3a1a06"} stroke={isLightMode ? "#c2410c" : "#fb923c"} strokeWidth="2" />
                      <path d="M -14 -6 Q -6 6 2 -6 Q 10 6 16 -6" fill="none" stroke={isLightMode ? "#c2410c" : "#fb923c"} strokeWidth="1.5" />
                    </g>
                  ))}

                  {[[228, 250], [605, 400], [370, 440]].map(([dx, dy], i) => (
                    <g key={i}>
                      {[0, 1, 2].map((s) => (
                        <ellipse key={s} cx={dx} cy={dy - s * 4} rx="16" ry="4" fill={isLightMode ? "#16a34a" : "#22c55e"} fillOpacity="0.85" />
                      ))}
                    </g>
                  ))}

                  {[86, 106, 126].map((y, i) => (
                    <path key={i} d={`M 355 ${y} Q 385 ${y - 9} 415 ${y}`} fill="none" stroke={isLightMode ? "#0e7490" : "#67e8f9"} strokeWidth="2.2" />
                  ))}

                  {[0, 1, 2].map((i) => {
                    const y = 258 + i * 16;
                    return <path key={i} d={`M 590 ${y} Q 615 ${y - 6} 640 ${y}`} fill="none" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="4" strokeLinecap="round" />;
                  })}

                  <line x1="175" y1="95" x2="215" y2="82" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="98" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Cell wall</text>

                  <line x1="175" y1="155" x2="207" y2="140" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="158" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Cell membrane</text>

                  <line x1="175" y1="215" x2="248" y2="185" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="210" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nucleus</text>
                  <text x="170" y="225" textAnchor="end" fontSize="12" fill={isLightMode ? "#64748b" : "#94a3b8"}>(with nucleolus)</text>

                  <line x1="175" y1="355" x2="205" y2="355" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="358" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Mitochondrion</text>

                  <line x1="175" y1="420" x2="215" y2="400" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="423" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Cytoplasm</text>

                  <line x1="685" y1="105" x2="410" y2="106" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="109" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Endoplasmic reticulum</text>

                  <line x1="685" y1="155" x2="632" y2="155" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="158" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Chloroplast</text>

                  <line x1="685" y1="315" x2="580" y2="315" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="311" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Vacuole</text>
                  <text x="690" y="326" fontSize="12" fill={isLightMode ? "#64748b" : "#94a3b8"}>(large, filled with cell sap)</text>

                  <line x1="685" y1="400" x2="632" y2="266" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="403" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Golgi apparatus</text>
                </svg>
              </DiagramCard>

              <DiagramCard caption="A typical animal cell -- rounded/irregular shape, no cell wall, no plastids, small vacuoles" isLightMode={isLightMode}>
                <svg viewBox="0 0 900 540" className="w-full h-auto">
                  <path
                    d="M 430 70 C 560 60 660 110 670 210 C 685 300 650 380 560 420 C 470 460 350 455 280 400 C 200 340 190 240 230 160 C 265 95 350 78 430 70 Z"
                    fill={isLightMode ? "#fce7f3" : "#210f1c"}
                    stroke={isLightMode ? "#be185d" : "#f472b6"}
                    strokeWidth="4.5"
                  />

                  <circle cx="400" cy="220" r="62" fill={isLightMode ? "#ede9fe" : "#1e1240"} stroke={isLightMode ? "#7c3aed" : "#c4b5fd"} strokeWidth="3" />
                  <circle cx="415" cy="222" r="18" fill={isLightMode ? "#7c3aed" : "#c4b5fd"} fillOpacity="0.6" stroke={isLightMode ? "#7c3aed" : "#c4b5fd"} strokeWidth="1.5" />

                  {[[300, 330, 0], [530, 300, -20], [480, 150, 40]].map(([dx, dy, rot], i) => (
                    <g key={i} transform={`translate(${dx},${dy}) rotate(${rot})`}>
                      <ellipse cx="0" cy="0" rx="24" ry="13" fill={isLightMode ? "#fed7aa" : "#3a1a06"} stroke={isLightMode ? "#c2410c" : "#fb923c"} strokeWidth="2" />
                      <path d="M -12 -5 Q -5 5 2 -5 Q 9 5 14 -5" fill="none" stroke={isLightMode ? "#c2410c" : "#fb923c"} strokeWidth="1.4" />
                    </g>
                  ))}

                  <circle cx="330" cy="410" r="17" fill={isLightMode ? "#fee2e2" : "#2a0f10"} stroke={isLightMode ? "#dc2626" : "#f87171"} strokeWidth="2.2" />
                  <circle cx="380" cy="120" r="15" fill={isLightMode ? "#93c5fd" : "#1e3a5f"} fillOpacity="0.55" stroke={isLightMode ? "#2563eb" : "#60a5fa"} strokeWidth="2" />
                  <circle cx="560" cy="390" r="13" fill={isLightMode ? "#93c5fd" : "#1e3a5f"} fillOpacity="0.55" stroke={isLightMode ? "#2563eb" : "#60a5fa"} strokeWidth="2" />

                  {[100, 118, 136].map((y, i) => (
                    <path key={i} d={`M 460 ${y} Q 500 ${y - 8} 540 ${y}`} fill="none" stroke={isLightMode ? "#0e7490" : "#67e8f9"} strokeWidth="2.2" />
                  ))}

                  {[0, 1, 2].map((i) => {
                    const y = 240 + i * 15;
                    return <path key={i} d={`M 555 ${y} Q 578 ${y - 6} 600 ${y}`} fill="none" stroke={isLightMode ? "#a16207" : "#facc15"} strokeWidth="3.6" strokeLinecap="round" />;
                  })}

                  <rect x="240" y="185" width="8" height="26" rx="3" fill={isLightMode ? "#334155" : "#cbd5e1"} transform="rotate(20 244 198)" />
                  <rect x="255" y="185" width="8" height="26" rx="3" fill={isLightMode ? "#334155" : "#cbd5e1"} transform="rotate(-20 259 198)" />

                  <line x1="175" y1="90" x2="270" y2="130" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="87" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Cell membrane</text>
                  <text x="170" y="102" textAnchor="end" fontSize="12" fill={isLightMode ? "#64748b" : "#94a3b8"}>(no cell wall outside it)</text>

                  <line x1="175" y1="200" x2="338" y2="220" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="203" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Nucleus</text>

                  <line x1="175" y1="330" x2="278" y2="330" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="333" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Mitochondrion</text>

                  <line x1="175" y1="410" x2="313" y2="410" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="170" y="413" textAnchor="end" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Lysosome</text>

                  <line x1="685" y1="115" x2="500" y2="118" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="118" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Endoplasmic reticulum</text>

                  <line x1="685" y1="200" x2="252" y2="198" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="203" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Centrioles</text>

                  <line x1="685" y1="255" x2="592" y2="252" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="258" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Golgi apparatus</text>

                  <line x1="685" y1="325" x2="540" y2="310" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="328" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Vacuole (small)</text>

                  <line x1="685" y1="392" x2="573" y2="392" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="1.5" />
                  <text x="690" y="395" fontSize="15" fontWeight="bold" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Vacuole (small)</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Differences at a Glance</SectionHeading>
              <CompareTable
                leftHeader="Plant Cell"
                rightHeader="Animal Cell"
                isLightMode={isLightMode}
                rows={[
                  ["Cell wall present (outside the membrane)", "No cell wall"],
                  ["Usually fixed, rectangular shape", "Usually round or irregular shape"],
                  ["Plastids (chloroplasts etc.) present", "No plastids"],
                  ["One large central vacuole", "Vacuoles small and few, if present"],
                  ["Centrioles absent (in most plant cells)", "Centrioles present"],
                  ["Cannot easily change shape", "Can often change shape"],
                ]}
              />

              <RememberBox title="One easy way to remember">
                If it has a rigid rectangular outline, a big central water sac, and green discs inside -- it's a plant cell. If it's rounder, has no wall, and no green discs -- it's an animal cell.
              </RememberBox>
            </div>
          )}

          {activeTopic === "cell-division" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Cell Division</h1>
                <p className="text-base font-semibold text-slate-400">How one cell becomes two -- or four.</p>
              </div>

              <InfoCard title="Why Cells Divide" icon={GitBranch}>
                <p>Cells divide so that living things can grow, repair damaged tissue, and reproduce. There are two main types of cell division: <b>mitosis</b> and <b>meiosis</b>.</p>
              </InfoCard>

              <DiagramCard caption="Mitosis produces 2 identical cells; meiosis produces 4 cells with half the chromosome number" isLightMode={isLightMode}>
                <svg viewBox="0 0 760 260" className="w-full h-auto">
                  <text x="150" y="30" textAnchor="middle" fontSize="17" fontWeight="900" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Mitosis</text>
                  <circle cx="75" cy="130" r="48" fill={isLightMode ? "#dcfce7" : "#052e18"} stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="3" />
                  <line x1="58" y1="118" x2="92" y2="118" stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="4" strokeLinecap="round" />
                  <line x1="58" y1="142" x2="92" y2="142" stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="4" strokeLinecap="round" />

                  <path d="M 128 130 L 178 130" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2.5" markerEnd="url(#bioArrowDiv)" />
                  <defs>
                    <marker id="bioArrowDiv" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? "#64748b" : "#94a3b8"} />
                    </marker>
                  </defs>

                  {[85, 175].map((y, i) => (
                    <g key={i}>
                      <circle cx="240" cy={y} r="34" fill={isLightMode ? "#dcfce7" : "#052e18"} stroke={isLightMode ? "#15803d" : "#4ade80"} strokeWidth="2.5" />
                      <line x1="228" y1={y - 6} x2="252" y2={y - 6} stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="3.5" strokeLinecap="round" />
                      <line x1="228" y1={y + 6} x2="252" y2={y + 6} stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                  ))}
                  <text x="150" y="240" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={isLightMode ? "#64748b" : "#94a3b8"}>1 division → 2 identical cells</text>

                  <line x1="380" y1="15" x2="380" y2="250" stroke={isLightMode ? "#cbd5e1" : "#334155"} strokeWidth="1.5" strokeDasharray="5 4" />

                  <text x="590" y="30" textAnchor="middle" fontSize="17" fontWeight="900" fill={isLightMode ? "#0f172a" : "#f1f5f9"}>Meiosis</text>
                  <circle cx="450" cy="130" r="45" fill={isLightMode ? "#fce7f3" : "#210f1c"} stroke={isLightMode ? "#be185d" : "#f472b6"} strokeWidth="3" />
                  <line x1="434" y1="118" x2="466" y2="118" stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="4" strokeLinecap="round" />
                  <line x1="434" y1="142" x2="466" y2="142" stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="4" strokeLinecap="round" />

                  <path d="M 500 130 L 545 130" stroke={isLightMode ? "#64748b" : "#94a3b8"} strokeWidth="2.5" markerEnd="url(#bioArrowDiv)" />

                  {[55, 105, 155, 205].map((y, i) => (
                    <g key={i}>
                      <circle cx="620" cy={y} r="26" fill={isLightMode ? "#fce7f3" : "#210f1c"} stroke={isLightMode ? "#be185d" : "#f472b6"} strokeWidth="2.2" />
                      <line x1="611" y1={y} x2="629" y2={y} stroke={isLightMode ? "#334155" : "#e2e8f0"} strokeWidth="3" strokeLinecap="round" />
                    </g>
                  ))}
                  <text x="560" y="240" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={isLightMode ? "#64748b" : "#94a3b8"}>2 divisions → 4 cells, half chromosomes</text>
                </svg>
              </DiagramCard>

              <CompareTable
                leftHeader="Mitosis"
                rightHeader="Meiosis"
                isLightMode={isLightMode}
                rows={[
                  ["One division", "Two divisions, one after another"],
                  ["Produces 2 daughter cells", "Produces 4 daughter cells"],
                  ["Daughter cells identical to parent", "Daughter cells genetically different"],
                  ["Chromosome number stays the same", "Chromosome number is halved"],
                  ["Happens in body (somatic) cells", "Happens only in reproductive cells"],
                  ["Purpose: growth and repair", "Purpose: forming sperm and egg cells"],
                ]}
              />

              <RememberBox title="Why meiosis halves the chromosome number">
                When a sperm cell (half the chromosomes) fuses with an egg cell (half the chromosomes) during reproduction, the resulting new cell gets the full chromosome number back -- exactly as in the parents.
              </RememberBox>
            </div>
          )}

          {activeTopic === "glossary-mindmap" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Revision Map & Extra Terms</h1>
                <p className="text-base font-semibold text-slate-400">Everything from this chapter in one place, plus a few extra words you should know.</p>
              </div>

              <SectionHeading>Quick Revision Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch
                  icon={BookOpen}
                  title="Cell Basics"
                  color="green"
                  isLightMode={isLightMode}
                  points={["The cell is the basic structural and functional unit of life", "Organisms may be unicellular (one cell) or multicellular (many cells)", "Cell theory: all living things are made of cells, the cell is the basic unit of life, and new cells arise from pre-existing cells"]}
                />
                <MindMapBranch
                  icon={Droplet}
                  title="Cell Boundary"
                  color="cyan"
                  isLightMode={isLightMode}
                  points={["Cell membrane: selectively permeable, made of a fluid mosaic of lipids and proteins", "Diffusion moves substances from high to low concentration; osmosis is the diffusion of water", "Cell wall: found only in plant cells, made of cellulose, gives shape and protection"]}
                />
                <MindMapBranch
                  icon={Dna}
                  title="The Nucleus"
                  color="indigo"
                  isLightMode={isLightMode}
                  points={["Surrounded by the nuclear envelope, contains the nucleoplasm", "Nucleolus makes ribosomes; chromatin condenses into chromosomes during division", "Controls and directs all activities of the cell"]}
                />
                <MindMapBranch
                  icon={Layers}
                  title="Cell Organelles"
                  color="amber"
                  isLightMode={isLightMode}
                  points={["ER (rough/smooth): makes and transports proteins and fats", "Golgi apparatus: packages and ships material", "Lysosomes digest waste; mitochondria release energy; plastids make/store food (plants); vacuoles store material"]}
                />
                <MindMapBranch
                  icon={Microscope}
                  title="Prokaryotic vs Eukaryotic"
                  color="rose"
                  isLightMode={isLightMode}
                  points={["Prokaryotic cells: no true nucleus, no membrane-bound organelles, smaller", "Eukaryotic cells: true nucleus present, membrane-bound organelles present, larger"]}
                />
                <MindMapBranch
                  icon={GitBranch}
                  title="Cell Division"
                  color="emerald"
                  isLightMode={isLightMode}
                  points={["Mitosis: 1 division, 2 identical cells, used for growth and repair", "Meiosis: 2 divisions, 4 cells with half the chromosome number, used to form sperm and egg cells"]}
                />
              </div>

              <SectionHeading>Extra Terms From Your Notes</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Nuclear envelope">the double membrane that surrounds and protects the nucleus.</FactRow>
                <FactRow label="Nucleoplasm">the jelly-like fluid inside the nucleus, in which the nucleolus and chromatin float.</FactRow>
                <FactRow label="Nuclear reticulum">the thread-like, tangled network formed by chromatin fibres inside the nucleus.</FactRow>
                <FactRow label="Macronucleus & micronucleus">two differently-sized nuclei found in some single-celled organisms; the macronucleus controls daily functions, the micronucleus is used in reproduction.</FactRow>
                <FactRow label="Cis face & trans face">the two ends of the Golgi apparatus -- the cis face receives material from the ER, the trans face releases finished, packaged material.</FactRow>
                <FactRow label="Dictyosomes">another name used for Golgi bodies, especially in plant cells.</FactRow>
                <FactRow label="Secretory vesicles">small membrane-bound sacs that carry finished material from the Golgi apparatus to be released outside the cell.</FactRow>
                <FactRow label="Pinocytic vesicles">tiny vesicles formed when the cell membrane takes in liquid droplets from outside the cell.</FactRow>
                <FactRow label="Lumen">the internal space enclosed within a membrane, such as the space inside the ER's tubes.</FactRow>
                <FactRow label="Granules">small stored particles inside the cytoplasm, such as stored starch or protein.</FactRow>
                <FactRow label="Peroxisomes">small sacs containing enzymes that break down toxic substances such as hydrogen peroxide inside the cell.</FactRow>
                <FactRow label="Tonoplast">the membrane that surrounds the large central vacuole in a plant cell.</FactRow>
                <FactRow label="Contractile vacuole">a special vacuole, found in cells like Amoeba, that pumps out excess water to keep the cell from bursting.</FactRow>
                <FactRow label="Centrioles">small cylindrical structures found near the nucleus in animal cells; they help organise fibres during cell division.</FactRow>
                <FactRow label="Cilia">short, hair-like projections on a cell's surface that beat rhythmically to move fluid or help the cell move.</FactRow>
                <FactRow label="Flagella">long, whip-like projections used by some cells, such as sperm cells, for swimming.</FactRow>
              </div>

              <RememberBox title="You've completed the Cells chapter!">
                Go back to any topic using the sidebar whenever you need to revise, and try the self-assessment questions to test what you remember.
              </RememberBox>
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

export default LearnBiology;
