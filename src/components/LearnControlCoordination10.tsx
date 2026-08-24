import React, { useState } from "react";
import {
  Award,
  HelpCircle,
  Leaf,
  Zap,
  Network,
  ChevronLeft,
  ChevronRight,
  Download,
  FlaskConical,
  Brain,
  Activity,
  Droplet,
  RefreshCw,
  Sun,
  Scale,
  Shield,
} from "lucide-react";

const CONTROL_COORDINATION_NOTES_PDF_URL = "https://hcofglrixcokhhchivvi.supabase.co/storage/v1/object/public/study-notes/class10-biology-control-coordination.pdf";

const DIAGRAM_BASE = "https://hcofglrixcokhhchivvi.supabase.co/storage/v1/object/public/study-notes/control-coordination10-diagrams/";
const DIAGRAMS = {
  cnsPnsOverview: DIAGRAM_BASE + "cns-pns-overview.webp",
  neuronStructure: DIAGRAM_BASE + "neuron-structure.webp",
  brainStructure: DIAGRAM_BASE + "brain-structure.webp",
  reflexArc: DIAGRAM_BASE + "reflex-arc.webp",
  neuromuscularJunction: DIAGRAM_BASE + "neuromuscular-junction.webp",
  endocrineSystem: DIAGRAM_BASE + "endocrine-system.webp",
};

type CCTopicId =
  | "cc-intro"
  | "neurons-impulse"
  | "brain-cns"
  | "reflex-actions"
  | "pns-muscle"
  | "hormonal-system"
  | "endocrine-glands"
  | "hormone-feedback"
  | "plant-tropic"
  | "plant-nastic"
  | "plant-hormones"
  | "nervous-vs-hormonal"
  | "activities"
  | "glossary-mindmap"
  | "competitive-corner";

interface CCTopic {
  id: CCTopicId;
  title: string;
  category: string;
}

const CC_TOPICS: CCTopic[] = [
  { id: "cc-intro", title: "1. What Is Control & Coordination?", category: "Fundamentals" },
  { id: "neurons-impulse", title: "2. Neurons & the Nerve Impulse", category: "Nervous System" },
  { id: "brain-cns", title: "3. The Central Nervous System", category: "Nervous System" },
  { id: "reflex-actions", title: "4. The Spinal Cord & Reflex Actions", category: "Nervous System" },
  { id: "pns-muscle", title: "5. Peripheral Nervous System & Muscle Movement", category: "Nervous System" },
  { id: "hormonal-system", title: "6. The Hormonal System: Basics", category: "Hormonal System" },
  { id: "endocrine-glands", title: "7. Major Endocrine Glands", category: "Hormonal System" },
  { id: "hormone-feedback", title: "8. Feedback Mechanism of Hormones", category: "Hormonal System" },
  { id: "plant-tropic", title: "9. Coordination in Plants: Tropic Movements", category: "Plant Coordination" },
  { id: "plant-nastic", title: "10. Coordination in Plants: Nastic Movements", category: "Plant Coordination" },
  { id: "plant-hormones", title: "11. Plant Hormones", category: "Plant Coordination" },
  { id: "nervous-vs-hormonal", title: "12. Nervous vs Hormonal Control", category: "Comparison" },
  { id: "activities", title: "13. Hands-On Activities", category: "Practical" },
  { id: "glossary-mindmap", title: "14. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competitive-corner", title: "15. Competitive Corner", category: "Advanced" },
];

interface LearnControlCoordination10Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// ── Reusable building blocks (same visual language as the Life Processes notes) ──

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

export function LearnControlCoordination10({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnControlCoordination10Props) {
  const [activeTopic, setActiveTopic] = useState<CCTopicId>("cc-intro");

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-cc10-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-green-500" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-green-400"}`}>Control & Coordination</span>
          </div>
          <a
            href={CONTROL_COORDINATION_NOTES_PDF_URL}
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
              <Brain className="w-5 h-5 text-green-500" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Control & Coordination Notes</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Nerves, the brain, hormones, and how plants coordinate too -- without a single neuron.
            </p>
          </div>
          <a
            href={CONTROL_COORDINATION_NOTES_PDF_URL}
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
          {CC_TOPICS.map((topic) => (
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-cc10-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-cc10-main p, #learn-cc10-main li, #learn-cc10-main span, #learn-cc10-main label, #learn-cc10-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-cc10-main b, #learn-cc10-main strong, #learn-cc10-main h1, #learn-cc10-main h2, #learn-cc10-main h3, #learn-cc10-main h4, #learn-cc10-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-cc10-container .bg-slate-900, #learn-cc10-container .bg-\\[\\#0d1424\\], #learn-cc10-container .bg-\\[\\#0f1a12\\], #learn-cc10-container .bg-slate-950, #learn-cc10-container .bg-\\[\\#0b1710\\] {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-cc10-container .border-slate-800, #learn-cc10-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-green-50 via-emerald-50 to-green-50 border-green-300" : "from-green-950/40 via-[#0a2018]/40 to-emerald-950/40 border-green-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-green-400 tracking-tight">Control & Coordination, Notes</h4>
              </div>
            </div>
          </div>

          {activeTopic === "cc-intro" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">What Is Control & Coordination?</h1>
                <p className="text-base font-semibold text-slate-400">How living things sense a change and respond with exactly the right action -- every single time.</p>
              </div>

              <InfoCard title="Movement Alone Doesn't Mean 'Alive'" icon={Activity}>
                <p>A seed pushing through soil, a cat chasing a mouse, a plant bending toward sunlight -- all of these are movement, but not all for the same reason.</p>
                <p><b className="text-white">Growth movement:</b> movement caused purely by growth (e.g. a seedling pushing upward). <b className="text-white">Non-growth movement:</b> movement not connected to growth (e.g. a cat running, buffaloes chewing).</p>
              </InfoCard>

              <SectionHeading>Movement as a Response to the Environment</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Most movement is actually a response to some change around the organism -- e.g. a cat runs because it spotted a mouse, or a plant grows toward sunlight to get more light.</li>
                <li>A change in the environment that an organism detects and responds to is called a <b>stimulus</b> (plural: stimuli). Examples: light, heat, cold, sound.</li>
                <li>Every kind of stimulus needs a matching, appropriate response -- not a random one. This matching of stimulus to correct response is what <b>control and coordination</b> is all about.</li>
              </ul>

              <SectionHeading>Two Systems Handle This Job</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Nervous System</h4>
                  <p className="text-sm font-semibold">Uses fast <b>electrical impulses</b> carried by specialised nerve cells. Found in animals.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">Hormonal System</h4>
                  <p className="text-sm font-semibold">Uses slower <b>chemical messengers (hormones)</b> carried in the blood. Found in both animals and plants (plants use only this system).</p>
                </div>
              </div>

              <SectionHeading>Receptors: Detecting the Stimulus</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">A <b>receptor</b> is a specialised cell or tissue, usually present in a sense organ, that detects a specific stimulus from the environment and converts it into a signal the nervous system can use.</p>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Photoreceptors (eye)">Detect light -- give us vision.</FactRow>
                <FactRow label="Photoreceptors (inner ear)">Detect sound and help with balance.</FactRow>
                <FactRow label="Olfactory receptors (nose)">Detect smell.</FactRow>
                <FactRow label="Gustatory receptors (tongue)">Detect taste.</FactRow>
                <FactRow label="Thermoreceptors (skin)">Detect touch, temperature, and pain.</FactRow>
              </div>

              <DiagramImage src={DIAGRAMS.cnsPnsOverview} alt="Human body showing the central nervous system (brain and spinal cord) in red and the peripheral nervous system (sensory and motor nerves) in blue" caption="The nervous system: central vs peripheral" isLightMode={isLightMode} />

              <RememberBox title="Two systems, one team">
                Animals use both the nervous system and the hormonal system together for control and coordination. Plants, lacking a nervous system and muscles, rely entirely on the hormonal (chemical) approach.
              </RememberBox>
            </div>
          )}

          {activeTopic === "neurons-impulse" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Neurons & the Nerve Impulse</h1>
                <p className="text-base font-semibold text-slate-400">The single building block that every nervous system message travels through.</p>
              </div>

              <InfoCard title="Core Definition" icon={Zap}>
                <p>A <b className="text-white">neuron</b> is the structural and functional unit of the nervous system -- a specialised cell that transmits electrical and chemical signals through the body. An individual nerve cell may be up to a meter long. Many neurons together form a <b className="text-white">nerve fibre</b>, and many nerve fibres together form a <b className="text-white">nerve</b> (nervous tissue).</p>
              </InfoCard>

              <DiagramImage src={DIAGRAMS.neuronStructure} alt="Structure of a neuron: dendrite, nucleus, cell body, axon, myelin sheath, Schwann cell, node of Ranvier, axon terminal" caption="Structure of a neuron" isLightMode={isLightMode} />

              <SectionHeading>The Four Parts of a Neuron</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Cell body (Soma)">The central part, containing the nucleus (genetic material, controls the cell) and cytoplasm (houses organelles for metabolism).</FactRow>
                <FactRow label="Dendrites">Branch-like extensions that receive incoming signals from other neurons or sensory receptors, and convert them into electrical impulses.</FactRow>
                <FactRow label="Axon">A single, long, thin projection carrying the impulse away from the cell body. Often wrapped in a fatty, insulating layer called the myelin sheath (made by Schwann cells in the peripheral nervous system, or oligodendroglial cells in the central nervous system), which speeds up transmission. Gaps in this sheath are called nodes of Ranvier.</FactRow>
                <FactRow label="Axon terminals (Synaptic boutons)">Branched, bulb-like endings that release neurotransmitter chemicals into the synapse to pass the signal onward.</FactRow>
              </div>

              <SectionHeading>Three Types of Neurons</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Sensory neurons (Afferent neurons)">Carry information from the senses to the brain.</FactRow>
                <FactRow label="Motor neurons (Efferent neurons)">Carry commands from the brain and spinal cord to muscles.</FactRow>
                <FactRow label="Interneurons (Relay neurons)">Connect sensory and motor neurons, and also play a role in learning, thinking, and remembering.</FactRow>
              </div>

              <SectionHeading>How the Impulse Travels</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">A stimulus is detected at the tip of a dendrite, setting off a chemical reaction that creates an electrical impulse. This impulse travels through the dendrite, across the cell body, and along the axon to the axon terminal. There, it triggers the release of <b>neurotransmitters</b> (chemical messengers) into the synapse.</p>

              <RememberBox title="The synapse: electrical becomes chemical">
                A <b>synapse</b> is the tiny gap between two neurons. The electrical impulse cannot cross this gap directly -- it must be converted into a chemical signal (neurotransmitters) first. Once across, the chemical signal restarts a fresh electrical impulse in the next neuron. This same synapse mechanism also connects the final neuron to a muscle cell or gland.
              </RememberBox>
            </div>
          )}

          {activeTopic === "brain-cns" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Central Nervous System</h1>
                <p className="text-base font-semibold text-slate-400">The brain and spinal cord -- the body's main processing centre.</p>
              </div>

              <InfoCard title="Core Definition" icon={Brain}>
                <p>The <b className="text-white">central nervous system (CNS)</b> consists of the brain and spinal cord. It is the body's central processing unit -- it receives information from all over the body, integrates it, and decides how to respond.</p>
              </InfoCard>

              <SectionHeading>Three Regions of the Brain</SectionHeading>
              <DiagramImage src={DIAGRAMS.brainStructure} alt="Structure of the human brain: cerebrum, brainstem (midbrain, pons, medulla), cerebellum, spinal cord" caption="The three main regions of the brain" isLightMode={isLightMode} />

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Forebrain">The largest region. Includes the cerebrum (the main thinking part, divided into two hemispheres joined by the corpus callosum), thalamus, and hypothalamus. Processes sensory information, integrates it with stored knowledge, makes decisions, and handles sensations like hunger.</FactRow>
                <FactRow label="Midbrain">The smallest, topmost region. Controls reflexes such as pupil size and eye/eyelid movement, handles sensory and motor functions, and relays signals between the spinal cord and the rest of the brain.</FactRow>
                <FactRow label="Hindbrain">Includes the medulla oblongata (controls involuntary life-supporting functions: breathing, heart rate, blood pressure, salivation, vomiting), the pons (regulates sleep, breathing, facial movements), and the cerebellum (coordinates balance, posture, and precise voluntary movement, e.g. riding a bicycle).</FactRow>
              </div>

              <SectionHeading>The Two Cerebral Hemispheres</SectionHeading>
              <CompareTable
                leftHeader="Left Hemisphere"
                rightHeader="Right Hemisphere"
                isLightMode={isLightMode}
                rows={[
                  ["Controls movement of the right side of the body", "Controls movement of the left side of the body"],
                  ["Logical thinking, language skills", "Creative skills, emotional processing"],
                ]}
              />

              <SectionHeading>How the Brain (and Spinal Cord) Are Protected</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>The brain sits inside the bony <b>skull</b> (made of 22 bones -- 14 facial, 8 cranial), shielded from the front, sides, and top.</li>
                <li>Inside the skull, the brain is wrapped in three protective layers called <b>meninges</b>: the dura mater (thick, outer), arachnoid layer (middle, thin), and pia mater (inner, thin).</li>
                <li>The brain is also cushioned by <b>cerebrospinal fluid (CSF)</b>, which absorbs shocks, offers immunological protection, and keeps the brain buoyant -- almost cancelling out its own weight so it isn't weighed down.</li>
                <li>The spinal cord is similarly protected by the bumpy <b>vertebral column</b> (33 ring-shaped bones called vertebrae), and is also wrapped in meninges and cushioned by CSF.</li>
              </ul>

              <RememberBox title="Brain weight">
                An adult human brain weighs, on average, between 1.0 kg and 1.5 kg, and is made up of billions of neurons.
              </RememberBox>
            </div>
          )}

          {activeTopic === "reflex-actions" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Spinal Cord & Reflex Actions</h1>
                <p className="text-base font-semibold text-slate-400">The shortcut your body takes when there's no time to think.</p>
              </div>

              <InfoCard title="What Is a Reflex Action?" icon={Zap}>
                <p>A <b className="text-white">reflex action</b> is a sudden, quick, involuntary (not consciously controlled) response to a stimulus, like jumping away from a moving vehicle or pulling your hand back from a flame. These actions happen without conscious thought, as an immediate reaction to a change in the environment.</p>
              </InfoCard>

              <SectionHeading>Why the Spinal Cord, Not the Brain?</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Reflexes are involuntary and must happen very fast to protect us from injury.</li>
                <li>If the signal had to travel all the way to the brain, be consciously processed, and then travel back down to the muscles, it would take too long.</li>
                <li>So the spinal cord takes charge instead, activating the motor neurons directly and bypassing the brain -- this is what a <b>reflex arc</b> is.</li>
                <li>The brain does not control this movement, but it still receives the same sensory information afterward, which is why we become aware of what happened (e.g. feel the pain) once the reflex is already over.</li>
              </ul>

              <SectionHeading>The Spinal Cord's Three Jobs</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Control movement">Carries motor signals from the brain to the body, allowing voluntary movement.</FactRow>
                <FactRow label="Sense the world">Receives sensory information (like heat or pain) from the body and sends it up to the brain.</FactRow>
                <FactRow label="Coordinate reflexes">Handles automatic reflex responses, like the knee-jerk, without needing the brain.</FactRow>
              </div>

              <SectionHeading>The Reflex Arc</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">A <b>reflex arc</b> is the neural pathway that controls a reflex action, running from a receptor through the spinal cord to an effector (usually a muscle).</p>

              <DiagramImage src={DIAGRAMS.reflexArc} alt="Reflex arc: receptor in skin detects heat, sensory neuron carries impulse to spinal cord, relay neuron connects to motor neuron, motor neuron activates the effector muscle in the arm" caption="Working of a reflex arc" isLightMode={isLightMode} />

              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>A sensory receptor (e.g. heat/pain receptors in the skin) picks up an external stimulus.</li>
                <li>The sensory neuron carries this information to the spinal cord.</li>
                <li>Inside the spinal cord, a relay neuron activates a motor neuron -- without routing the signal through the brain, allowing a much faster response.</li>
                <li>The motor neuron activates the effector (muscle), which performs the reflex action.</li>
              </ol>

              <RememberBox title="Voluntary vs involuntary vs reflex">
                Voluntary actions (like writing) are consciously planned by the forebrain. Involuntary actions (like heartbeat, breathing) run continuously in the background, controlled by the mid-brain/hind-brain. Reflex actions are sudden, single, fast responses to a specific stimulus, controlled by the spinal cord.
              </RememberBox>
            </div>
          )}

          {activeTopic === "pns-muscle" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Peripheral Nervous System & Muscle Movement</h1>
                <p className="text-base font-semibold text-slate-400">How a decision made by neurons finally turns into a physical movement.</p>
              </div>

              <InfoCard title="Core Definition" icon={Network}>
                <p>The <b className="text-white">peripheral nervous system (PNS)</b> is the part of the nervous system lying outside the brain and spinal cord. It carries information from the body back to the brain, and carries out commands from the brain to different parts of the body.</p>
              </InfoCard>

              <SectionHeading>Two Main Parts of the PNS</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-green-400 font-mono tracking-widest">Somatic Nervous System</h4>
                  <p className="text-sm font-semibold">Nerves going to the skin and muscles -- controls <b>voluntary</b> actions.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-emerald-400 font-mono tracking-widest">Autonomic Nervous System</h4>
                  <p className="text-sm font-semibold">Nerves connecting the CNS to internal organs (heart, stomach, intestines) -- controls <b>involuntary</b> actions.</p>
                </div>
              </div>

              <SectionHeading>From Nerve Impulse to Muscle Movement</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Nervous tissue collects information, sends it through the body, processes it, makes decisions, and directs muscles to act. Muscle tissue then performs the final action -- when a nerve impulse reaches a muscle, the muscle fibre moves.</p>

              <DiagramImage src={DIAGRAMS.neuromuscularJunction} alt="Neuromuscular junction: axon of motor neuron branching onto a muscle fiber, with presynaptic terminal releasing synaptic vesicles across the synaptic cleft to the postsynaptic membrane" caption="The neuromuscular junction" isLightMode={isLightMode} />

              <SectionHeading>How a Muscle Cell Contracts</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>A nerve impulse reaches the neuromuscular junction (where a motor neuron's axon meets a muscle fibre).</li>
                <li>The presynaptic terminal releases neurotransmitters across the synaptic cleft, acting on the muscle fibre's postsynaptic membrane.</li>
                <li>Special contractile proteins inside the muscle cell change their shape and rearrangement in response.</li>
                <li>This rearrangement makes the muscle cell shorten -- and this shortening of muscle fibres is what we experience as a muscle contracting.</li>
              </ol>

              <RememberBox title="Voluntary vs involuntary muscles">
                Voluntary muscles are consciously controlled by us (e.g. leg muscles when walking). Involuntary muscles operate automatically, without conscious thought (e.g. the heart, muscles of the gut).
              </RememberBox>
            </div>
          )}

          {activeTopic === "hormonal-system" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">The Hormonal System: Basics</h1>
                <p className="text-base font-semibold text-slate-400">A slower, quieter messaging system that can reach every single cell in the body.</p>
              </div>

              <InfoCard title="Core Definition" icon={Droplet}>
                <p>The <b className="text-white">hormonal system</b> (also called the <b className="text-white">endocrine system</b>) is a network of glands and organs that produce hormones controlling nearly every cell, organ, and function in the body. It is found in all mammals, birds, fish, and many other species.</p>
              </InfoCard>

              <SectionHeading>Components of the Endocrine System</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Glands">Located throughout the body -- these produce the hormones.</FactRow>
                <FactRow label="Hormones">Chemicals made by endocrine glands and released into the bloodstream (or the fluid surrounding cells).</FactRow>
                <FactRow label="Receptors">Present in various organs and tissues -- recognise and respond to specific hormones.</FactRow>
              </div>

              <SectionHeading>What Is a Hormone?</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">A <b>hormone</b> is a chemical made in one part of an organism and sent to distant organs or tissues, through complex biological processes, to regulate body functions -- such as growth, metabolism, mood, and reproduction. Over 50 hormones have been identified in humans and other vertebrates (animals with a backbone).</p>
              <p className="text-sm font-semibold leading-relaxed">Although a hormone circulates throughout the entire body in the blood, it can only act on <b>target cells</b> that carry a matching receptor for it -- like a key that only fits one lock. Binding to the receptor changes the cell's existing proteins and can switch on genes to make new proteins.</p>

              <SectionHeading>Three Types of Glands</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Endocrine glands">Ductless -- release hormones directly into the bloodstream. Example: pituitary gland.</FactRow>
                <FactRow label="Exocrine glands">Release non-hormonal substances through a duct onto a body surface or cavity. Example: sweat glands.</FactRow>
                <FactRow label="Heterocrine glands">Function as both endocrine and exocrine -- release some substances via ducts, and hormones directly into the blood. Example: the pancreas.</FactRow>
              </div>

              <DiagramImage src={DIAGRAMS.endocrineSystem} alt="Human endocrine system: hypothalamus, pituitary gland, pineal gland, thyroid and parathyroid glands, thymus, pancreas, adrenal glands, ovary, testicle, placenta" caption="Endocrine glands in the human body" isLightMode={isLightMode} />

              <RememberBox title="Examples of exocrine glands">
                The liver (largest exocrine gland, ~1.2-1.5 kg, also digests fats), sweat glands (regulate body temperature), mammary glands (produce breast milk), digestive glands (stomach, pancreas, intestines), and sebaceous glands (secrete oily sebum to protect and lubricate skin).
              </RememberBox>
            </div>
          )}

          {activeTopic === "endocrine-glands" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Major Endocrine Glands</h1>
                <p className="text-base font-semibold text-slate-400">A tour through every major hormone-producing gland in the human body.</p>
              </div>

              <SectionHeading>Hypothalamus & Pituitary Gland</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Hypothalamus">Deep in the brain. Links the endocrine and nervous systems together, and releases hormones (like dopamine, oxytocin) that control the pituitary gland.</FactRow>
                <FactRow label="Pituitary gland">Pea-sized, at the base of the brain, below the hypothalamus. Called the "master gland" because it produces hormones that control other glands. Secretes growth hormone (regulates body growth -- deficiency in childhood causes dwarfism, excess causes gigantism), TSH (stimulates the thyroid), ACTH (stimulates the adrenal gland), prolactin (stimulates the mammary gland), oxytocin (milk ejection during breastfeeding), FSH and LH (sexual development and fertility), and ADH (controls blood pressure and water balance).</FactRow>
              </div>

              <SectionHeading>Pineal, Thyroid & Parathyroid</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Pineal gland">A tiny gland in the middle of the brain. Releases melatonin, which controls the sleep-wake cycle.</FactRow>
                <FactRow label="Thyroid gland">A small, butterfly-shaped gland at the front of the neck. Controls metabolic rate (how the body converts food into energy). Secretes mainly thyroxine, which regulates carbohydrate, protein, and fat metabolism. Iodine is essential for making thyroxine -- deficiency can cause goitre (a swollen neck from thyroid enlargement).</FactRow>
                <FactRow label="Parathyroid gland">A set of four small glands behind the thyroid (sometimes located near the oesophagus or chest). Releases parathyroid hormone (PTH), responsible for calcium balance in blood and bone health.</FactRow>
              </div>

              <SectionHeading>Thymus & Adrenal Glands</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Thymus gland">A small organ in the chest, producing T cells (white blood cells) that fight infection -- especially important for a child's immune system. It starts shrinking after puberty.</FactRow>
                <FactRow label="Adrenal glands">Small, triangle-shaped glands on top of each kidney. Secrete adrenaline (also called epinephrine), which prepares the body for stress ("fight or flight"): it increases heart rate (more oxygen to muscles), reduces blood flow to the digestive system and skin (redirecting blood to skeletal muscles), and increases breathing rate.</FactRow>
              </div>

              <SectionHeading>Pancreas & Reproductive Glands</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Pancreas">Part of both the digestive and endocrine systems (a heterocrine gland). Secretes digestive enzymes (via a duct), and the hormones insulin and glucagon directly into the blood. Insulin helps the body use blood sugar for energy; glucagon increases blood sugar, preventing it from dropping too low. Diabetes occurs when insulin production is too low, or the insulin produced cannot be used effectively.</FactRow>
                <FactRow label="Ovary (in females)">Produces eggs and the hormones estrogen (develops/maintains female sexual characteristics, keeps bones strong, essential for the menstrual cycle and pregnancy) and progesterone (regulates the menstrual cycle, thickens the uterine lining for a fertilised egg, prepares breasts for feeding).</FactRow>
                <FactRow label="Testis (in males)">Produces sperm and the hormone testosterone, which develops/maintains male sexual characteristics and is essential for sperm production.</FactRow>
                <FactRow label="Placenta (during pregnancy)">A temporary endocrine organ attaching to the uterus wall. Connects the baby to the uterus, providing oxygen/nutrients and removing waste. Secretes progesterone (maintains pregnancy by supporting the uterine lining) and other hormones that help the baby grow and prepare for childbirth.</FactRow>
              </div>

              <RememberBox title="Puberty changes">
                The dramatic physical changes people notice around 10-12 years of age happen because of a surge in testosterone (in males) and estrogen (in females).
              </RememberBox>
            </div>
          )}

          {activeTopic === "hormone-feedback" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Feedback Mechanism of Hormones</h1>
                <p className="text-base font-semibold text-slate-400">How the body keeps hormone levels exactly where they need to be, without any conscious effort.</p>
              </div>

              <InfoCard title="Why Precise Regulation Matters" icon={RefreshCw}>
                <p>Hormones must be released in precise, carefully controlled quantities -- too much or too little can seriously disrupt normal body function. The timing and amount of hormone released is regulated by a <b className="text-white">feedback mechanism</b>: a self-correcting loop where the level of a substance in the body controls the secretion of the hormone regulating it.</p>
              </InfoCard>

              <SectionHeading>Worked Example: Blood Sugar Regulation</SectionHeading>
              <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">
                <li>If blood sugar level rises (e.g. after a meal), this is detected by cells of the pancreas.</li>
                <li>The pancreas responds by producing more insulin.</li>
                <li>Insulin converts excess glucose into glycogen for storage, lowering the blood sugar level.</li>
                <li>As blood sugar falls back to normal, insulin secretion is automatically reduced again.</li>
              </ol>

              <RememberBox title="A self-correcting loop">
                Notice the loop: rising sugar triggers more insulin, and once sugar falls, insulin secretion falls too. This is exactly why the process is called a "feedback" mechanism -- the outcome feeds back to control the next round of hormone release.
              </RememberBox>
            </div>
          )}

          {activeTopic === "plant-tropic" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Coordination in Plants: Tropic Movements</h1>
                <p className="text-base font-semibold text-slate-400">No nerves, no muscles -- yet plants still bend, curl, and grow with real purpose.</p>
              </div>

              <InfoCard title="How Plants Coordinate Without Nerves or Muscles" icon={Leaf}>
                <p>Plants don't have a nervous system or muscles, so they cannot use electrical impulses or muscle contraction the way animals do. Instead, they coordinate their growth, development, and responses using chemical messengers -- <b className="text-white">plant hormones</b>.</p>
              </InfoCard>

              <SectionHeading>Tropic Movements: Directional Growth</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed"><b>Tropic movements</b> are directional growth responses of a plant part toward or away from an external stimulus. These occur due to <b>differential cell elongation</b> (one side of the growing part elongates faster than the other), controlled by the hormone auxin, and help the plant adapt to its environment.</p>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Phototropism (light)">Auxin accumulates on the shaded side, causing that side to elongate more and bend toward light. Positive phototropism: growth toward light (e.g. shoots). Negative phototropism: growth away from light (e.g. some roots).</FactRow>
                <FactRow label="Geotropism / Gravitropism (gravity)">Starch-filled cells in the root cap sense gravity, causing auxin to redistribute. Positive geotropism: growth toward gravity (roots grow downward). Negative geotropism: growth against gravity (stems grow upward).</FactRow>
                <FactRow label="Hydrotropism (water)">The root cap senses a water gradient in the soil, triggering differential growth. Positive hydrotropism: roots grow toward water. Negative hydrotropism: rare, but some roots may avoid waterlogged areas.</FactRow>
                <FactRow label="Thigmotropism (touch)">Cells on the side in contact with an object grow slower, while the opposite side elongates faster, causing coiling. Example: tendrils of climbing plants (pea, cucumber) coiling around a support.</FactRow>
                <FactRow label="Chemotropism (chemicals)">The ovule releases chemical substances (sugars, amino acids) that guide growth. Positive chemotropism: growth toward chemicals (e.g. pollen tubes growing toward ovules). Negative chemotropism: growth away from harmful chemicals (e.g. roots avoiding toxins).</FactRow>
                <FactRow label="Thermotropism (temperature)">Temperature affects enzyme activity and auxin distribution. Example: some flowers (like tulips) open in warmth, or leaves orient toward sunlight for heat.</FactRow>
              </div>

              <RememberBox title="Positive vs negative, quick rule">
                "Positive" always means growth toward the stimulus; "negative" always means growth away from it. Roots and shoots almost always respond oppositely to light and gravity -- that's a favourite exam contrast.
              </RememberBox>
            </div>
          )}

          {activeTopic === "plant-nastic" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Coordination in Plants: Nastic Movements</h1>
                <p className="text-base font-semibold text-slate-400">Fast, reversible plant movements that have nothing to do with growth or direction.</p>
              </div>

              <InfoCard title="Core Definition" icon={Activity}>
                <p><b className="text-white">Nastic movements</b> are non-directional responses of a plant to a stimulus (touch, light, temperature) -- unlike tropic movements, the direction of the response does not depend on the direction the stimulus comes from. They are usually reversible, happen quickly (immediate movements), and are driven by changes in <b className="text-white">turgor pressure</b> (the water pressure within plant cells).</p>
              </InfoCard>

              <SectionHeading>How the Immediate Response Works</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>When a plant is touched, the movement often happens at a different part of the plant, not necessarily where the touch occurred -- so the information must be communicated from the touch point to the responding area.</li>
                <li>Plants use electrical and chemical signals to send this information, just like animals do -- but since they don't have specialised nervous tissue, they rely on their ordinary cells to pass the signal along.</li>
                <li>To actually move, cells change shape by adjusting the amount of water inside them (similar in spirit to how muscle cells change shape in animals, but through a completely different mechanism).</li>
                <li>This change in water content causes cells to swell or shrink, changing shape and producing movement.</li>
              </ul>

              <SectionHeading>Four Types of Nastic Movements</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Thigmonasty (touch)">Caused by changes in turgor pressure in specialised cells, leading to rapid leaf folding. Example: Mimosa pudica (the sensitive/touch-me-not plant) folds its leaves when touched.</FactRow>
                <FactRow label="Photonasty (light)">Changes in the position/orientation of leaves or flowers in response to light. Example: morning glory flowers open in the morning and close in the evening.</FactRow>
                <FactRow label="Nyctinasty (darkness)">Closing of flowers or leaves at night, to protect the plant. Example: Oxalis leaves fold down at night and reopen during the day.</FactRow>
                <FactRow label="Thermonasty (temperature)">Movements in response to temperature changes. Example: tulip flowers may open as the temperature rises during the day and close as it cools in the evening.</FactRow>
              </div>

              <RememberBox title="Turgor pressure">
                Turgor pressure is the force that pushes a cell's plasma membrane against its cell wall (also known as hydrostatic pressure). A sudden loss of turgor pressure in specific cells is exactly what makes Mimosa pudica's leaves fold so fast.
              </RememberBox>
            </div>
          )}

          {activeTopic === "plant-hormones" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Plant Hormones</h1>
                <p className="text-base font-semibold text-slate-400">Five chemical messengers that run every growth decision a plant makes.</p>
              </div>

              <InfoCard title="Core Definition" icon={Sun}>
                <p><b className="text-white">Plant hormones (phytohormones)</b> are organic compounds made by plants that regulate growth, development, and responses to environmental stimuli. They are produced in one part of the plant and transported to another part to stimulate a physiological change.</p>
              </InfoCard>

              <SectionHeading>Auxin</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Synthesised mainly at shoot tips and young leaves. Stimulates cells to elongate (helps plants grow taller), makes the shoot tip inhibit lateral tissue growth (called <b>apical dominance</b>, so height increases more than girth), regulates root initiation and growth, and drives phototropic bending. Used commercially as weedicides, rooting powder, and to help seedless fruit development.</p>

              <SectionHeading>Gibberellins</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">First discovered in a fungus (Gibberella fujikuroi) that caused abnormal tall growth in rice. Produced in young leaves, root tips, and developing seeds. Makes stems grow longer, and breaks seed dormancy by activating enzymes that digest stored food (starch into sugars) for the growing embryo, helping germination. Also helps fruits grow larger, produces seedless fruits, and can trigger flowering. Used to break seed dormancy, improve fruit size, and increase sugarcane yield.</p>

              <SectionHeading>Cytokinins</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Mainly produced in root tips, transported upward through the xylem. Promote cell division ("cyto" = cell, "kinin" = division), preventing yellowing of leaves by delaying the breakdown of chlorophyll and proteins (so it is anti-ageing). While auxin suppresses lateral tissue growth, cytokinin promotes it, making plants bushy. Also helps transport nutrients to areas of rapid growth, and is essential in plant tissue culture.</p>

              <SectionHeading>Abscisic Acid (ABA)</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Produced in mature leaves, stems, roots, and developing seeds. Unlike the three hormones above, ABA mainly slows growth and induces dormancy -- often called the <b>stress hormone</b>. It helps seeds and buds enter dormancy to survive unfavourable conditions, prevents premature germination, promotes shedding of leaves/flowers/fruits under stress, and closes stomata to save water during drought.</p>

              <SectionHeading>Ethylene (Gaseous Hormone)</SectionHeading>
              <p className="text-sm font-semibold leading-relaxed">Also known as the <b>ripening hormone</b> -- and unlike the others, it is a gas. Produced in almost all plant parts, especially ripening fruit. Speeds up ripening of climacteric fruits (mango, banana, tomato, apple), softening tissue, changing colour, and enhancing aroma. Also causes shortening/thickening of the stem, and promotes ageing and shedding of leaves/flowers/fruits (opposite to cytokinin, which delays ageing).</p>

              <SectionHeading>Comparing All Five at a Glance</SectionHeading>
              <CompareTable
                leftHeader="Hormone"
                rightHeader="Main Role"
                isLightMode={isLightMode}
                rows={[
                  ["Auxin", "Cell elongation, apical dominance, phototropism"],
                  ["Gibberellin", "Stem elongation, breaks seed dormancy"],
                  ["Cytokinin", "Cell division, delays leaf ageing"],
                  ["Abscisic acid", "Growth inhibitor, induces dormancy (stress hormone)"],
                  ["Ethylene", "Fruit ripening, promotes ageing (gaseous)"],
                ]}
              />

              <RememberBox title="Growth promoters vs growth inhibitor">
                Auxin, gibberellin, and cytokinin generally promote growth. Abscisic acid is the main growth inhibitor. Ethylene is a special case -- a gas that promotes ripening and ageing rather than growth.
              </RememberBox>
            </div>
          )}

          {activeTopic === "nervous-vs-hormonal" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Nervous vs Hormonal Control</h1>
                <p className="text-base font-semibold text-slate-400">Two very different tools for the same underlying job: control and coordination.</p>
              </div>

              <InfoCard title="Why Two Systems At All?" icon={Scale}>
                <p>Electrical impulses are fast, but limited -- they only reach cells directly connected by nervous tissue, and a nerve cell needs time to "reset" before firing again, so it can't fire continuously. Chemical (hormonal) signals are slower, but can potentially reach every cell in the body and can be sustained steadily over time. Multicellular organisms use both, each suited to different situations.</p>
              </InfoCard>

              <SectionHeading>Side-by-Side Comparison</SectionHeading>
              <CompareTable
                leftHeader="Nervous Control"
                rightHeader="Hormonal Control"
                isLightMode={isLightMode}
                rows={[
                  ["Uses electrical impulses along neurons", "Uses chemical hormones carried in blood"],
                  ["Very fast response", "Slower response"],
                  ["Effect is short-lived", "Effect tends to last much longer"],
                  ["Reaches only cells connected by that nerve pathway", "Can potentially reach every cell in the body"],
                  ["Best for urgent, split-second reactions (e.g. reflexes)", "Best for ongoing regulation (e.g. growth, metabolism, mood)"],
                ]}
              />

              <RememberBox title="They work together, not apart">
                The two systems are not rivals -- they're partners. For example, the hypothalamus (nervous system) triggers the pituitary gland (endocrine system) to release hormones, directly linking the two systems together.
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
                <p>Every activity below is a real experiment or task you can actually try, or that has already been used to establish a fact you're studying as theory elsewhere in this chapter. Exam questions frequently ask about the procedure, expected observation, or the reason for a specific step -- so treat this list as seriously as the theory topics.</p>
              </InfoCard>

              <ActivityCard
                number={1}
                title="How smell affects taste"
                aim="To show that our sense of smell contributes to how we perceive taste."
                materials={["A pinch of sugar", "Your own nose and mouth", "A regular meal/food to eat"]}
                procedure={[
                  { step: "Put a pinch of sugar in your mouth and note how it tastes.", why: "This gives you a normal baseline taste to compare against." },
                  { step: "Block your nose by pinching it shut between your thumb and index finger, then eat a pinch of sugar again.", why: "This removes the smell component entirely, isolating whatever the tongue alone can detect." },
                  { step: "While eating a regular meal, block your nose in the same way and notice whether you can fully appreciate the taste of the food.", why: "Confirms whether the effect seen with sugar also applies to real, more complex food." },
                ]}
                observation="With the nose blocked, sugar tastes noticeably blander and less sweet, and food in general is much harder to fully taste and enjoy."
                conclusion="A large part of what we experience as 'taste' during eating actually comes from smell working together with the tongue's taste receptors. Blocking the nose removes the smell component, leaving only the tongue's basic taste sense -- this is also why food tastes bland when your nose is blocked by a cold."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={2}
                title="Demonstrating phototropism in a growing shoot"
                aim="To demonstrate that shoots bend toward light and roots bend away from light."
                materials={["A conical flask", "Water", "A piece of wire mesh", "2-3 freshly germinated bean seeds", "An open-sided cardboard box", "A window with natural light"]}
                procedure={[
                  { step: "Fill the conical flask with water and cover its neck with the wire mesh.", why: "The mesh holds the seeds in place at the water's surface, letting roots reach down into the water and shoots grow upward." },
                  { step: "Place 2-3 freshly germinated bean seeds on the wire mesh.", why: "Germinated seeds already have a visible root and shoot, so bending can be observed right from the start." },
                  { step: "Place the flask inside the cardboard box (open on one side only), positioning the box so its open side faces a window.", why: "This ensures light reaches the seedlings from only one direction, so any bending is clearly caused by that light source." },
                  { step: "Leave the set-up undisturbed for two to three days, then observe the direction of growth.", why: "Bending due to growth takes time to become visible -- a quick check would show no change." },
                  { step: "Turn the flask so the shoots now face away from the light and the roots face toward it, then leave undisturbed for a few more days.", why: "This tests whether new growth reorients toward light again, confirming the response is genuinely driven by the light direction rather than a fixed, permanent shape." },
                ]}
                observation="Shoots bend and grow toward the light coming through the open side of the box, while roots grow away from it. After the flask is turned, the newer growth again reorients -- shoots bending back toward the light and roots away from it -- while the older, already-formed parts of the shoot and root keep their original direction."
                conclusion="Shoots show positive phototropism (bending toward light) and roots show negative phototropism (bending away from light). Since only the new growth changes direction after turning the flask, this bending happens through fresh, directional cell growth, not by moving parts that have already grown."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={3}
                title="Locating the endocrine glands"
                aim="To identify and locate the major endocrine glands of the human body using a labelled diagram, and learn more about the less familiar ones."
                materials={["A labelled diagram of the human endocrine system", "Reference books or other reliable sources", "A notebook"]}
                procedure={[
                  { step: "Study a labelled diagram of the human endocrine system, identifying glands such as the hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal glands, pancreas, ovaries/testes, and placenta.", why: "Seeing all the glands together on one diagram makes their relative positions in the body much easier to remember." },
                  { step: "Note down the approximate location of each gland in the body.", why: "Location is frequently asked directly in exams, and also helps make sense of each gland's function." },
                  { step: "For each gland already covered in class, note down its main hormone(s) and function(s) in your notebook.", why: "Writing it down in your own words reinforces the connection between gland, hormone, and function." },
                  { step: "For any gland not yet discussed in detail, look it up using books or trusted sources, and discuss your findings with a teacher.", why: "Filling in gaps yourself, rather than being told directly, makes the information stick better." },
                ]}
                observation="A complete, clear picture of where each major endocrine gland sits in the body, along with the hormone(s) and function(s) associated with each."
                conclusion="The endocrine glands are spread across many different regions of the body -- from the brain down to the reproductive organs -- yet all of them communicate the same basic way: releasing hormones into the bloodstream to reach and affect distant target cells."
                isLightMode={isLightMode}
              />

              <ActivityCard
                number={4}
                title="Building a hormone summary table"
                aim="To consolidate understanding of which hormone is secreted by which gland, and its main function, by completing a summary table."
                materials={["Notebook", "Pen", "Chapter notes or other reference material"]}
                procedure={[
                  { step: "Draw a table with three columns: Hormone, Endocrine Gland, and Function.", why: "Organising the same facts into a table format makes it far easier to compare hormones side by side." },
                  { step: "Fill in each row for the major hormones covered (growth hormone, thyroxine, insulin, testosterone, estrogen, adrenaline, releasing hormones, etc.), using your notes to fill in any gaps.", why: "Actively recalling and writing each fact strengthens memory much more than simply re-reading notes." },
                  { step: "Cross-check every entry against your notes once the table is complete.", why: "Catches any small errors before they get memorised incorrectly." },
                ]}
                observation="A complete, well-organised table pairing every major hormone with its gland and function."
                conclusion="Organising information into a table like this makes patterns easy to spot -- for instance, noticing how several glands (like the thyroid and adrenal gland) are themselves controlled by 'releasing hormones' from the hypothalamus and pituitary, tying the whole chapter together."
                isLightMode={isLightMode}
              />
            </div>
          )}

          {activeTopic === "glossary-mindmap" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Revision Map & Extra Terms</h1>
                <p className="text-base font-semibold text-slate-400">Every idea in this chapter, in one place.</p>
              </div>

              <SectionHeading>Quick Revision Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch
                  icon={Zap}
                  title="Neurons"
                  color="green"
                  isLightMode={isLightMode}
                  points={["4 parts: dendrite, cell body, axon, axon terminal", "3 types: sensory, motor, interneuron", "Synapse: electrical impulse becomes a chemical signal"]}
                />
                <MindMapBranch
                  icon={Brain}
                  title="Central Nervous System"
                  color="emerald"
                  isLightMode={isLightMode}
                  points={["Forebrain: thinking, sensory processing, decisions", "Midbrain: reflexes, relaying signals", "Hindbrain: medulla (involuntary), cerebellum (balance)"]}
                />
                <MindMapBranch
                  icon={Activity}
                  title="Reflexes & Muscles"
                  color="rose"
                  isLightMode={isLightMode}
                  points={["Reflex arc: receptor -> sensory neuron -> spinal cord -> motor neuron -> effector", "Bypasses brain for speed", "Neuromuscular junction triggers muscle contraction"]}
                />
                <MindMapBranch
                  icon={Droplet}
                  title="Hormonal System"
                  color="indigo"
                  isLightMode={isLightMode}
                  points={["Endocrine (ductless) vs exocrine (duct) vs heterocrine (both)", "Pituitary = master gland", "Feedback mechanism keeps hormone levels precise"]}
                />
                <MindMapBranch
                  icon={Sun}
                  title="Plant Movements"
                  color="amber"
                  isLightMode={isLightMode}
                  points={["Tropic: directional, growth-based (photo-, geo-, hydro-, thigmo-, chemo-, thermo-tropism)", "Nastic: non-directional, turgor-based (thigmo-, photo-, nyctinasty, thermonasty)", "Both ultimately controlled by plant hormones"]}
                />
                <MindMapBranch
                  icon={Leaf}
                  title="Plant Hormones"
                  color="cyan"
                  isLightMode={isLightMode}
                  points={["Growth promoters: auxin, gibberellin, cytokinin", "Growth inhibitor: abscisic acid (stress hormone)", "Ethylene: gaseous ripening hormone"]}
                />
              </div>

              <SectionHeading>Extra Terms From Your Notes</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Stimulus">A change in the environment that an organism detects and responds to.</FactRow>
                <FactRow label="Receptor">A specialised cell/tissue in a sense organ that detects a stimulus.</FactRow>
                <FactRow label="Nerve impulse">The electrical signal that passes along a nerve fibre.</FactRow>
                <FactRow label="Synapse">The functional gap between two neurons, where signals switch from electrical to chemical.</FactRow>
                <FactRow label="Meninges">The three protective membrane layers covering the brain and spinal cord.</FactRow>
                <FactRow label="Cerebrospinal fluid (CSF)">The fluid that cushions the brain and spinal cord.</FactRow>
                <FactRow label="Apical dominance">Auxin from the shoot tip suppressing growth of lateral (side) branches.</FactRow>
                <FactRow label="Turgor pressure">The water pressure inside a plant cell pushing against its cell wall.</FactRow>
                <FactRow label="Target cell">A cell with a matching receptor, which is the only kind of cell a given hormone can act on.</FactRow>
                <FactRow label="Goitre">Thyroid gland enlargement caused by iodine deficiency and low thyroxine.</FactRow>
              </div>

              <RememberBox title="You've completed the Control & Coordination chapter!">
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

              <InfoCard title="Resting Potential and Action Potential" icon={Zap}>
                <p>A resting neuron maintains a slight negative charge inside compared to outside (roughly -70 mV), called the resting potential, maintained by sodium-potassium ion pumps. When a stimulus arrives, sodium ions rush in, briefly flipping the charge (the action potential) -- this rapid, self-propagating flip is the actual electrical impulse travelling down the axon. Myelinated axons conduct impulses faster because the impulse can "jump" between nodes of Ranvier (called saltatory conduction) instead of travelling continuously.</p>
              </InfoCard>

              <InfoCard title="The Blood-Brain Barrier" icon={Shield}>
                <p>The brain is protected not just physically (skull, meninges, CSF) but also chemically, by the blood-brain barrier -- a selective boundary formed by tightly packed cells lining the brain's blood vessels. It allows essential substances like oxygen and glucose through, while blocking many toxins, pathogens, and even some medicines from reaching brain tissue.</p>
              </InfoCard>

              <InfoCard title="Why Hormone Response Is Slower But Not Weaker" icon={Droplet}>
                <p>Hormones act more slowly than nerve impulses because they must travel through the bloodstream and bind to specific receptors before producing an effect, but they are not weaker -- their sustained, body-wide reach makes them ideal for coordinating long-term processes like growth, metabolism, and reproductive cycles, which a fast but narrowly targeted nerve impulse simply cannot manage.</p>
              </InfoCard>

              <InfoCard title="Auxin's Role Beyond Simple Bending" icon={Sun}>
                <p>Beyond phototropism, synthetic (artificial) auxins are widely used in agriculture: as selective weedicides (killing broadleaf weeds without harming grasses/crops), as rooting powders to help cuttings grow roots during vegetative propagation, and to promote the development of seedless fruit.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Fastest nerve impulse speed">Impulses in some human motor neurons can travel over 100 metres per second, thanks to thick, heavily myelinated axons.</FactRow>
                <FactRow label="Neurotransmitter example">Acetylcholine is one of the most well-known neurotransmitters, used at neuromuscular junctions to trigger muscle contraction.</FactRow>
                <FactRow label="Insulin resistance">A separate concept from insufficient insulin production -- here the pancreas makes enough insulin, but body cells respond poorly to it, still causing high blood sugar.</FactRow>
                <FactRow label="Photoperiodism">A plant's flowering response to the relative length of day and night -- closely tied to gibberellin activity in some long-day plants.</FactRow>
                <FactRow label="Vernalisation">Some plants need a period of cold exposure before they can flower -- a temperature-triggered developmental switch, distinct from thermonasty.</FactRow>
              </div>

              <RememberBox title="Watch for 'both/and' comparison questions">
                Competitive exams love pairing two structures or processes and asking for BOTH a similarity and a difference in the same question -- e.g. tropic vs nastic movement, nervous vs hormonal control, endocrine vs exocrine glands. Practising both directions of comparison is the single best preparation.
              </RememberBox>

              <SectionHeading>Solved Competitive Questions</SectionHeading>

              <ExampleQ
                number={1}
                question="Why do myelinated axons conduct nerve impulses faster than unmyelinated ones?"
                answer="The myelin sheath insulates most of the axon, forcing the electrical impulse to 'jump' from one node of Ranvier to the next (saltatory conduction) rather than travelling continuously along the entire membrane -- this jumping is much faster than continuous conduction."
              />
              <ExampleQ
                number={2}
                question="A person is unable to feel pain in their hand after an injury but can still move their fingers normally. Which part of the reflex arc pathway is most likely affected?"
                answer="The sensory pathway (receptor or sensory neuron) carrying pain signals to the spinal cord/brain is affected, while the motor pathway (motor neuron to effector muscles) remains intact -- this shows sensory and motor pathways can be selectively damaged."
              />
              <ExampleQ
                number={3}
                question="Why can hormonal disorders like hypothyroidism cause both physical (weight gain, cold intolerance) and mental (fatigue, low mood) symptoms at the same time?"
                answer="Thyroxine affects the metabolic rate of nearly every cell in the body, including brain cells -- since the hormone travels everywhere via the blood and acts wherever matching receptors exist, a shortage disrupts energy use broadly, producing both physical and mental symptoms together."
              />
              <ExampleQ
                number={4}
                question="A farmer sprays a synthetic auxin on a field of broadleaf weeds growing among grass-like crops. Explain why this selectively kills the weeds but not the crop."
                answer="Broadleaf plants are far more sensitive to synthetic auxins than grasses -- the excess auxin overstimulates and disrupts their growth to fatal levels, while grass-like crops (like wheat or corn) are naturally more tolerant of high auxin doses, so they survive relatively unharmed."
              />
              <ExampleQ
                number={5}
                question="Explain why plants kept in a completely dark, sealed box for many days eventually stop growing taller, even if auxin is still being produced."
                answer="While auxin can still drive cell elongation for a while, sustained growth also needs the products of photosynthesis (sugars) as a source of energy and building material. Without any light, photosynthesis cannot occur, so the plant eventually runs out of stored energy reserves and growth stops, regardless of hormone levels."
              />
              <ExampleQ
                number={6}
                question="Compare thigmotropism and thigmonasty in terms of speed, direction, and whether growth is involved."
                answer="Thigmotropism (e.g. tendril coiling) is a directional response involving actual cell growth, so it is relatively slow. Thigmonasty (e.g. Mimosa pudica leaf-folding) is a non-directional response driven by a rapid change in turgor pressure, not growth, so it happens almost instantly."
              />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = CC_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(CC_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = CC_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < CC_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(CC_TOPICS[currentIndex + 1].id)}
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
                    onClick={() => setActiveTopic(CC_TOPICS[0].id)}
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
