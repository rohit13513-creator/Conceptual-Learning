import React, { useState } from "react";
import {
  Microscope,
  Award,
  HelpCircle,
  Globe,
  Cookie,
  Sprout,
  Bug,
  ShieldCheck,
  Package,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type MicroTopicId =
  | "introduction"
  | "habitat"
  | "friendly-food"
  | "friendly-medicine-soil"
  | "harmful-pathogens"
  | "disease-spread-protection"
  | "food-preservation"
  | "nitrogen-cycle"
  | "glossary-mindmap"
  | "competition-corner";

interface MicroTopic {
  id: MicroTopicId;
  title: string;
  category: string;
}

const MICRO_TOPICS: MicroTopic[] = [
  { id: "introduction", title: "1. Discovering the Invisible World", category: "Fundamentals" },
  { id: "habitat", title: "2. Where Microorganisms Live", category: "Fundamentals" },
  { id: "friendly-food", title: "3. Friendly Ones: Food & Fermentation", category: "Useful Microorganisms" },
  { id: "friendly-medicine-soil", title: "4. Friendly Ones: Medicine, Soil & Cleanup", category: "Useful Microorganisms" },
  { id: "harmful-pathogens", title: "5. Harmful Ones: Disease-Causing Pathogens", category: "Harmful Microorganisms" },
  { id: "disease-spread-protection", title: "6. How Disease Spreads & Staying Protected", category: "Harmful Microorganisms" },
  { id: "food-preservation", title: "7. Microorganisms & Food Preservation", category: "Everyday Applications" },
  { id: "nitrogen-cycle", title: "8. Microorganisms & the Nitrogen Cycle", category: "Everyday Applications" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnScience8InvisibleWorldProps {
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

const KeyIdeaBox: React.FC<{ children: React.ReactNode; isLightMode?: boolean }> = ({ children, isLightMode = false }) => (
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

// A solved, exam-style question, shown directly (not hidden behind a reveal) since this page is
// for reading and revising, not a timed quiz.
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

export function LearnScience8InvisibleWorld({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnScience8InvisibleWorldProps) {
  const [activeTopic, setActiveTopic] = useState<MicroTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const textMain = isLightMode ? "#0f172a" : "#f1f5f9";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-science8iw-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Microscope className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Invisible Living World</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Microscope className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Invisible Living World</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Tiny living things too small to see with the naked eye -- where they live, how some help us every day, how others cause disease, and how we stay safe.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {MICRO_TOPICS.map((topic) => (
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-science8iw-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-science8iw-main p, #learn-science8iw-main li, #learn-science8iw-main span, #learn-science8iw-main label, #learn-science8iw-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-science8iw-main b, #learn-science8iw-main strong, #learn-science8iw-main h1, #learn-science8iw-main h2, #learn-science8iw-main h3, #learn-science8iw-main h4, #learn-science8iw-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-science8iw-container .bg-slate-900, #learn-science8iw-container .bg-\\[\\#0d1424\\], #learn-science8iw-container .bg-\\[\\#0a1622\\], #learn-science8iw-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-science8iw-container .border-slate-800, #learn-science8iw-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Microscope className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Chapter: The Invisible Living World Beyond Our Naked Eye</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Discovering the Invisible World</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>All around us -- in the air, in water, on our skin, even inside our bodies -- live countless tiny organisms too small for our eyes to see on their own.</p>
              </div>

              <InfoCard title="Core Definition" icon={Microscope} isLightMode={isLightMode}>
                <p><b>Microorganisms:</b> living things so small that they cannot be seen with the naked eye -- they can only be seen with the help of a microscope, an instrument that magnifies very small objects.</p>
                <p>These tiny organisms are also called microbes, and they exist almost everywhere on Earth.</p>
              </InfoCard>

              <DiagramCard caption="A drop of pond water looks empty to the naked eye, but a microscope reveals many tiny living organisms inside it" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 160" className="w-full h-auto">
                  <circle cx="90" cy="80" r="55" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <text x="90" y="145" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Naked eye view</text>
                  <text x="90" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill={isLightMode ? "#475569" : "#94a3b8"}>(looks empty)</text>
                  <line x1="160" y1="80" x2="205" y2="80" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowIntro)" />
                  <text x="182" y="65" textAnchor="middle" fontSize="10" fontWeight="800" fill="#22d3ee">microscope</text>
                  <circle cx="290" cy="80" r="55" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="270" cy="65" r="7" fill="#a3e635" />
                  <circle cx="305" cy="90" r="9" fill="#fbbf24" />
                  <circle cx="285" cy="100" r="5" fill="#f87171" />
                  <circle cx="310" cy="60" r="6" fill="#38bdf8" />
                  <text x="290" y="145" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Magnified view</text>
                  <defs>
                    <marker id="arrowIntro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Discovery of Microorganisms</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Who discovered them" isLightMode={isLightMode}>Antonie van Leeuwenhoek was the first person to observe microorganisms, using a simple microscope he built himself.</FactRow>
                <FactRow label="Why this mattered" isLightMode={isLightMode}>Before microscopes existed, no one knew this hidden world of tiny living things even existed -- the microscope revealed an entirely new part of nature.</FactRow>
              </div>

              <SectionHeading>The Five Main Groups</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Bacteria" isLightMode={isLightMode}>Very simple, single-celled organisms, among the most common microorganisms on Earth.</FactRow>
                <FactRow label="Fungi" isLightMode={isLightMode}>Includes moulds and yeasts; some are single-celled, some form larger thread-like structures.</FactRow>
                <FactRow label="Protozoa" isLightMode={isLightMode}>Single-celled organisms that are usually able to move on their own.</FactRow>
                <FactRow label="Algae" isLightMode={isLightMode}>Simple organisms, usually found in water, that can make their own food using sunlight.</FactRow>
                <FactRow label="Viruses" isLightMode={isLightMode}>Extremely tiny particles, far smaller than bacteria, that can only multiply inside the living cells of another organism.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Microorganisms = living things too small to see without a microscope</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why can't microorganisms be seen with the naked eye?" answer="Because they are extremely small in size -- far smaller than the smallest detail the unaided human eye can resolve -- so a microscope's magnification is needed to see them." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Name the five main groups of microorganisms." answer="Bacteria, fungi, protozoa, algae, and viruses." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Who is credited with first observing microorganisms, and how?" answer="Antonie van Leeuwenhoek, using a simple microscope that he built himself." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What is common to all microorganisms, regardless of which group they belong to?" answer="They are all far too small to be seen with the naked eye, and can only be properly observed using a microscope." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A drop of pond water looks completely clear and empty to the naked eye. Does this mean it has no living organisms in it? Explain." answer="Not necessarily -- many microorganisms could be present in the water, invisible to the naked eye, and would only become visible under a microscope." />

              <RememberBox title="Small size, huge presence" isLightMode={isLightMode}>
                Even though microorganisms cannot be seen without help, they exist in enormous numbers almost everywhere on Earth -- their small size does not mean they are unimportant.
              </RememberBox>
            </div>
          )}

          {activeTopic === "habitat" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Where Microorganisms Live</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Microorganisms are found almost everywhere -- from the air we breathe to the soil beneath our feet, and even inside our own bodies.</p>
              </div>

              <InfoCard title="Core Idea" icon={Globe} isLightMode={isLightMode}>
                <p>Microorganisms can survive in an extremely wide range of places, including conditions that would be impossible for most other living things -- extremely hot springs, deep ocean water, thick ice, and even the digestive systems of animals.</p>
              </InfoCard>

              <DiagramCard caption="Microorganisms are found in nearly every part of our surroundings, not just in one single place" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 190" className="w-full h-auto">
                  <rect x="20" y="20" width="150" height="50" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="95" y="42" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">AIR</text>
                  <text x="95" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>floating spores &amp; bacteria</text>

                  <rect x="210" y="20" width="150" height="50" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="285" y="42" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fbbf24">WATER</text>
                  <text x="285" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>ponds, rivers, oceans</text>

                  <rect x="20" y="90" width="150" height="50" rx="10" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="95" y="112" textAnchor="middle" fontSize="12" fontWeight="800" fill="#a3e635">SOIL</text>
                  <text x="95" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>bacteria &amp; fungi everywhere</text>

                  <rect x="210" y="90" width="150" height="50" rx="10" fill="none" stroke="#f87171" strokeWidth="2.5" />
                  <text x="285" y="112" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f87171">LIVING BODIES</text>
                  <text x="285" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>inside plants, animals, humans</text>

                  <text x="190" y="175" textAnchor="middle" fontSize="11" fontWeight="800" fill={isLightMode ? "#475569" : "#94a3b8"}>...and even extreme places like hot springs and thick ice</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Microorganisms live freely on their own in soil, water, and air.</li>
                <li>Many microorganisms live inside the bodies of plants, animals, and humans, without causing any harm at all.</li>
                <li>Some microorganisms can survive in extremely harsh conditions, such as very hot springs or freezing ice, where most other living things could not survive.</li>
                <li>Because microorganisms are everywhere, surfaces that look completely clean can still carry large numbers of them.</li>
              </ul>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name three places where microorganisms can be found." answer="Any three of: air, water, soil, and inside the bodies of living organisms." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Can microorganisms survive in extremely hot springs, where most life could not survive?" answer="Yes -- certain microorganisms are specially suited to survive in extreme conditions, including very hot springs, thick ice, and other harsh environments." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A table looks perfectly clean to the eye. Does this mean it is completely free of microorganisms?" answer="No -- microorganisms are too small to be seen, so a surface can look completely clean while still carrying many of them." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Do all microorganisms living inside a human body cause harm?" answer="No -- many microorganisms live inside the human body without causing any harm, and some are even helpful to the body's normal functioning." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is it reasonable to say microorganisms are found 'almost everywhere'?" answer="Because they have been found in nearly every environment studied -- ordinary places like air, water, and soil, as well as extreme places like hot springs and ice -- showing how widely they can survive." />

              <RememberBox title="Not just outdoors" isLightMode={isLightMode}>
                It's easy to think of microorganisms as only being 'out there' in soil or water, but many also live inside our own bodies as a completely normal part of daily life.
              </RememberBox>
            </div>
          )}

          {activeTopic === "friendly-food" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Friendly Ones: Food & Fermentation</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Some of our most familiar foods exist only because of microorganisms working quietly behind the scenes.</p>
              </div>

              <InfoCard title="Core Idea: Fermentation" icon={Cookie} isLightMode={isLightMode}>
                <p><b>Fermentation:</b> a process in which microorganisms break down sugars, producing useful substances such as acids or gases in the process. This process is used to make several everyday foods.</p>
              </InfoCard>

              <SectionHeading>Everyday Foods Made Using Microorganisms</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Curd from milk" isLightMode={isLightMode}>A type of bacteria converts milk into curd during fermentation.</FactRow>
                <FactRow label="Bread from dough" isLightMode={isLightMode}>Yeast (a fungus) produces gas bubbles during fermentation, which makes bread dough rise and become soft and fluffy.</FactRow>
                <FactRow label="Idli and dosa batter" isLightMode={isLightMode}>Fermentation by microorganisms makes the batter rise and gives it a distinct taste, before it is cooked.</FactRow>
                <FactRow label="Alcohol and vinegar" isLightMode={isLightMode}>Fermentation of sugars by yeast produces alcohol; further fermentation can convert this into vinegar.</FactRow>
              </div>

              <DiagramCard caption="Yeast added to dough produces gas bubbles through fermentation, making the dough rise" isLightMode={isLightMode}>
                <svg viewBox="0 0 340 150" className="w-full h-auto">
                  <ellipse cx="90" cy="110" rx="60" ry="25" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <text x="90" y="145" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Fresh dough + yeast</text>
                  <line x1="165" y1="90" x2="210" y2="90" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowFerment)" />
                  <text x="187" y="75" textAnchor="middle" fontSize="10" fontWeight="800" fill="#22d3ee">fermentation</text>
                  <ellipse cx="290" cy="90" rx="60" ry="45" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="270" cy="70" r="5" fill="#a3e635" />
                  <circle cx="305" cy="65" r="4" fill="#fbbf24" />
                  <circle cx="285" cy="100" r="5" fill="#38bdf8" />
                  <circle cx="310" cy="105" r="4" fill="#f87171" />
                  <text x="290" y="145" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Risen dough (gas bubbles)</text>
                  <defs>
                    <marker id="arrowFerment" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="What is fermentation?" answer="A process in which microorganisms break down sugars, producing substances such as acids or gases, which is used to make many everyday foods." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Which microorganism converts milk into curd?" answer="A type of bacteria, through the process of fermentation." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why does bread dough rise before it is baked?" answer="Yeast, a fungus, ferments sugars in the dough and produces gas bubbles, which get trapped in the dough and make it rise." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain, step by step, how sugar can eventually be turned into vinegar using microorganisms." answer="First, yeast ferments sugar to produce alcohol. Then, further fermentation (by different microorganisms) converts this alcohol into vinegar." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is yeast specifically useful in bread-making, compared to other microorganisms?" answer="Yeast reliably ferments the sugars in dough to produce carbon dioxide gas, which is exactly what is needed to make the dough rise into soft, fluffy bread." />

              <RememberBox title="Not every microorganism does the same job" isLightMode={isLightMode}>
                Different microorganisms are useful for different foods -- the bacteria that make curd are not the same as the yeast that makes bread rise. Each has its own specific role.
              </RememberBox>
            </div>
          )}

          {activeTopic === "friendly-medicine-soil" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Friendly Ones: Medicine, Soil & Cleanup</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Beyond food, microorganisms quietly help fight disease, keep soil fertile, and clean up waste in nature.</p>
              </div>

              <InfoCard title="Core Idea" icon={Sprout} isLightMode={isLightMode}>
                <p>Not all microorganisms cause harm -- many play essential, helpful roles in medicine, farming, and the natural environment.</p>
              </InfoCard>

              <SectionHeading>Medicines from Microorganisms</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Antibiotics" isLightMode={isLightMode}>Medicines like penicillin are produced using certain fungi, and are used to treat infections caused by harmful bacteria.</FactRow>
                <FactRow label="Vaccines" isLightMode={isLightMode}>Made using weakened or killed microorganisms (or parts of them), vaccines train the body to fight a disease before a real infection ever happens.</FactRow>
              </div>

              <SectionHeading>Helping Agriculture & Soil</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Nitrogen-fixing bacteria" isLightMode={isLightMode}>Bacteria such as Rhizobium live in the roots of certain plants and convert nitrogen gas from the air into a form plants can absorb and use, increasing soil fertility.</FactRow>
                <FactRow label="Decomposers" isLightMode={isLightMode}>Bacteria and fungi break down dead plants, animals, and waste material into simpler substances, returning nutrients to the soil.</FactRow>
              </div>

              <SectionHeading>Cleaning the Environment</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Sewage treatment" isLightMode={isLightMode}>Microorganisms are used to break down harmful waste material in sewage treatment plants, making the water safer before it is released.</FactRow>
                <FactRow label="Natural recycling" isLightMode={isLightMode}>By decomposing dead matter, microorganisms prevent waste from piling up endlessly in the environment, keeping the cycle of nutrients going.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Microorganisms help make medicines, keep soil fertile, and clean up nature's waste</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name a well-known antibiotic and the type of microorganism it is produced from." answer="Penicillin, produced from a certain fungus." />
              <ExampleQ number={2} isLightMode={isLightMode} question="How does a vaccine help protect against a disease?" answer="A vaccine uses a weakened or killed form of the disease-causing microorganism (or a part of it) to train the body's defence system to recognise and fight it, without causing the actual disease." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why are nitrogen-fixing bacteria important to farmers?" answer="They convert nitrogen from the air into a form that plants can absorb and use, which increases soil fertility and helps crops grow better, often reducing the need for extra fertiliser." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What role do decomposer microorganisms play in nature?" answer="They break down dead plants, animals, and waste into simpler substances, returning useful nutrients to the soil and preventing waste from piling up." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why are microorganisms useful in sewage treatment plants?" answer="They break down harmful waste material in the sewage into simpler, less harmful substances, making the treated water safer before it is released back into the environment." />

              <RememberBox title="Helpful, not just harmful" isLightMode={isLightMode}>
                It is easy to think of microorganisms mainly as causes of illness, but many of them quietly support human health, farming, and a clean environment every single day.
              </RememberBox>
            </div>
          )}

          {activeTopic === "harmful-pathogens" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Harmful Ones: Disease-Causing Pathogens</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Some microorganisms cause disease in humans, animals, and plants -- these are called pathogens.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Bug} isLightMode={isLightMode}>
                <p><b>Pathogen:</b> a microorganism that causes disease in another living organism.</p>
                <p><b>Communicable disease:</b> a disease that can spread from an infected person (or animal) to a healthy one.</p>
              </InfoCard>

              <SectionHeading>Diseases in Humans</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Caused by bacteria" isLightMode={isLightMode}>Examples include cholera, typhoid, and tuberculosis.</FactRow>
                <FactRow label="Caused by viruses" isLightMode={isLightMode}>Examples include the common cold, measles, chicken pox, and polio.</FactRow>
                <FactRow label="Caused by protozoa" isLightMode={isLightMode}>Examples include malaria and amoebic dysentery.</FactRow>
              </div>

              <SectionHeading>Diseases in Animals & Plants</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Animal diseases" isLightMode={isLightMode}>Anthrax (affects cattle and can spread to humans) and foot-and-mouth disease (affects cattle) are both caused by microorganisms.</FactRow>
                <FactRow label="Plant diseases" isLightMode={isLightMode}>Citrus canker, rust of wheat, and yellow vein mosaic of okra (bhindi) are all plant diseases caused by microorganisms, and can seriously damage crops.</FactRow>
              </div>

              <DiagramCard caption="Pathogens can cause disease in three different groups of living things -- humans, animals, and plants" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 150" className="w-full h-auto">
                  <circle cx="90" cy="75" r="55" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="90" y="72" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">HUMANS</text>
                  <text x="90" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>cholera, cold, malaria</text>
                  <circle cx="290" cy="45" r="42" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="290" y="42" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24">ANIMALS</text>
                  <text x="290" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>anthrax</text>
                  <circle cx="290" cy="120" r="42" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="290" y="117" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a3e635">PLANTS</text>
                  <text x="290" y="133" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>citrus canker</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Define a pathogen." answer="A pathogen is a microorganism that causes disease in another living organism." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Name two human diseases caused by viruses." answer="Any two of: the common cold, measles, chicken pox, polio." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Which type of microorganism causes malaria?" answer="Malaria is caused by a protozoan parasite." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Name one plant disease caused by a microorganism and state which crop it affects." answer="Citrus canker affects citrus plants (such as orange and lemon trees). (Other valid answers: rust of wheat affects wheat; yellow vein mosaic affects okra/bhindi.)" />
              <ExampleQ number={5} isLightMode={isLightMode} question="What does it mean for a disease to be 'communicable'?" answer="It means the disease can spread from an infected person or animal to a healthy one." />

              <RememberBox title="Different pathogens, different diseases" isLightMode={isLightMode}>
                Not every disease is caused by the same type of microorganism -- some are bacterial, some viral, and some protozoan. Knowing which type causes a disease matters for choosing the right treatment.
              </RememberBox>
            </div>
          )}

          {activeTopic === "disease-spread-protection" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">How Disease Spreads & Staying Protected</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Knowing exactly how a disease travels from one person to another is the key to stopping it.</p>
              </div>

              <InfoCard title="Core Idea" icon={ShieldCheck} isLightMode={isLightMode}>
                <p>A communicable disease needs a way to travel from an infected person (or animal) to a healthy one. This pathway is called the mode of transmission.</p>
              </InfoCard>

              <SectionHeading>Modes of Disease Transmission</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Through air" isLightMode={isLightMode}>Tiny droplets released while coughing or sneezing can carry pathogens to others nearby -- this spreads diseases like the common cold and tuberculosis.</FactRow>
                <FactRow label="Through water" isLightMode={isLightMode}>Drinking water contaminated with pathogens can spread diseases like cholera and typhoid.</FactRow>
                <FactRow label="Through direct contact" isLightMode={isLightMode}>Touching an infected person, or objects they have touched, can spread certain diseases.</FactRow>
                <FactRow label="Through vectors" isLightMode={isLightMode}>A vector is a carrier that transfers a pathogen between hosts -- for example, the female Anopheles mosquito spreads malaria, and houseflies can spread typhoid by contaminating food.</FactRow>
              </div>

              <SectionHeading>Staying Protected</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Vaccination" isLightMode={isLightMode}>Introduces a weakened or killed pathogen (or a part of it) into the body, training it to fight the real disease later without ever causing the illness itself.</FactRow>
                <FactRow label="Personal hygiene" isLightMode={isLightMode}>Washing hands regularly, and covering the mouth and nose while coughing or sneezing, reduces the spread of pathogens.</FactRow>
                <FactRow label="Safe water & sanitation" isLightMode={isLightMode}>Drinking clean, safe water and properly treating sewage prevents many water-borne diseases.</FactRow>
                <FactRow label="Vector control" isLightMode={isLightMode}>Removing stagnant water (where mosquitoes breed) and using mosquito nets reduces the spread of vector-borne diseases like malaria.</FactRow>
              </div>

              <DiagramCard caption="Four common pathways by which a pathogen can travel from an infected host to a healthy one" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 170" className="w-full h-auto">
                  <rect x="10" y="10" width="165" height="55" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="92" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">AIR</text>
                  <text x="92" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>coughing / sneezing droplets</text>

                  <rect x="205" y="10" width="165" height="55" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="287" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fbbf24">WATER</text>
                  <text x="287" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>contaminated drinking water</text>

                  <rect x="10" y="95" width="165" height="55" rx="10" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="92" y="119" textAnchor="middle" fontSize="12" fontWeight="800" fill="#a3e635">CONTACT</text>
                  <text x="92" y="135" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>touching an infected person</text>

                  <rect x="205" y="95" width="165" height="55" rx="10" fill="none" stroke="#f87171" strokeWidth="2.5" />
                  <text x="287" y="119" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f87171">VECTORS</text>
                  <text x="287" y="135" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>mosquitoes, houseflies</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name the vector responsible for spreading malaria." answer="The female Anopheles mosquito." />
              <ExampleQ number={2} isLightMode={isLightMode} question="How can a housefly spread disease without biting anyone?" answer="A housefly can land on waste or contaminated matter and then land on food, contaminating it with pathogens that cause diseases like typhoid when eaten." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Explain, with a reason, why covering your mouth while coughing helps prevent disease spread." answer="Coughing releases tiny droplets that can carry pathogens through the air; covering the mouth traps these droplets and stops them from reaching and infecting other people nearby." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain how vaccination protects a person from a disease without making them ill." answer="A vaccine contains a weakened or killed version of the pathogen (or a part of it), which is not strong enough to cause the disease, but is enough to train the body's defences to recognise and fight the real pathogen if it appears later." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why does removing stagnant water around homes help reduce the spread of malaria?" answer="Mosquitoes, which act as vectors for malaria, breed in stagnant water -- removing it reduces the number of mosquitoes and therefore reduces the chances of the disease spreading." />

              <RememberBox title="Know the pathway to break the chain" isLightMode={isLightMode}>
                Every mode of transmission (air, water, contact, or vector) has its own specific way of being blocked -- knowing exactly how a disease spreads is the first step to stopping it effectively.
              </RememberBox>
            </div>
          )}

          {activeTopic === "food-preservation" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Microorganisms & Food Preservation</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Left alone, microorganisms will spoil almost any food -- preservation methods work by stopping them from growing.</p>
              </div>

              <InfoCard title="Core Idea" icon={Package} isLightMode={isLightMode}>
                <p><b>Food spoilage:</b> the growth of microorganisms on food, which can change its smell, taste, and appearance, and can sometimes produce harmful substances leading to food poisoning.</p>
                <p><b>Food preservation:</b> methods used to prevent or slow down microbial growth, keeping food safe to eat for longer.</p>
              </InfoCard>

              <SectionHeading>Common Preservation Methods & Why They Work</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Salt" isLightMode={isLightMode}>Draws water out of both the food and any microorganisms present, creating conditions where microorganisms cannot easily grow (used for pickles, dried fish, and meat).</FactRow>
                <FactRow label="Sugar" isLightMode={isLightMode}>Works in a similar way to salt, reducing the water available for microbial growth (used in jams and squashes).</FactRow>
                <FactRow label="Oil and vinegar" isLightMode={isLightMode}>Create an environment (often more acidic, or sealed away from air) that is unsuitable for most microorganisms to grow in (used in pickles).</FactRow>
                <FactRow label="Boiling and pasteurisation" isLightMode={isLightMode}>Heat kills most microorganisms present in the food or liquid; pasteurisation heats milk enough to kill harmful microbes, then cools it quickly.</FactRow>
                <FactRow label="Refrigeration and freezing" isLightMode={isLightMode}>Low temperatures slow down or stop the growth and reproduction of microorganisms, without necessarily killing them.</FactRow>
                <FactRow label="Chemical preservatives" isLightMode={isLightMode}>Certain approved chemicals can be added to packaged food to prevent microbial growth over a longer shelf life.</FactRow>
                <FactRow label="Airtight (vacuum) packing" isLightMode={isLightMode}>Removes air, which many microorganisms need in order to grow, extending how long the food stays safe.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Preservation works by stopping microorganisms from growing -- not by removing them completely</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why is salt effective for preserving pickles and dried fish?" answer="Salt draws water out of the food and out of any microorganisms present, creating a dry environment where microorganisms find it very difficult to grow." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Explain why refrigeration keeps food fresh for longer, even though it does not kill all microorganisms." answer="Low temperatures slow down the growth and activity of microorganisms considerably, even without killing them completely -- this greatly slows spoilage, even though it does not stop it forever." />
              <ExampleQ number={3} isLightMode={isLightMode} question="What is pasteurisation, and why is milk treated this way?" answer="Pasteurisation is a process of heating a liquid (like milk) enough to kill most harmful microorganisms, then cooling it quickly -- milk is treated this way to make it safer to drink for a longer period." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why does removing air from a food package (vacuum packing) help preserve the food?" answer="Many microorganisms need air to grow; removing the air creates conditions where these microorganisms cannot easily survive or multiply, helping preserve the food." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A student says refrigerating food removes all microorganisms from it completely. Is this correct? Explain." answer="No -- refrigeration only slows down microbial growth, it does not remove or kill all microorganisms; food can still spoil eventually even in a refrigerator, just much more slowly." />

              <RememberBox title="Slowing down, not always killing" isLightMode={isLightMode}>
                Many preservation methods (like refrigeration) only slow microorganisms down rather than destroying them completely -- only methods like proper boiling or specific chemical treatments actually kill most of them.
              </RememberBox>
            </div>
          )}

          {activeTopic === "nitrogen-cycle" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Microorganisms & the Nitrogen Cycle</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Nitrogen makes up most of the air around us, yet plants cannot use it directly -- microorganisms are the quiet link that makes it usable.</p>
              </div>

              <InfoCard title="Core Idea" icon={Leaf} isLightMode={isLightMode}>
                <p>Nitrogen gas makes up a very large share of the air, but most plants cannot absorb and use nitrogen gas directly. Certain microorganisms convert it into a usable form -- this is called nitrogen fixation.</p>
              </InfoCard>

              <DiagramCard caption="The nitrogen cycle -- microorganisms fix nitrogen for plants, and other microorganisms eventually return it to the air" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 260" className="w-full h-auto">
                  <rect x="140" y="10" width="100" height="45" rx="8" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="190" y="37" textAnchor="middle" fontSize="11" fontWeight="800" fill="#38bdf8">Nitrogen in Air</text>

                  <line x1="185" y1="55" x2="120" y2="95" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowN1)" />
                  <text x="120" y="75" textAnchor="middle" fontSize="9" fontWeight="800" fill="#22d3ee">nitrogen-fixing bacteria</text>

                  <rect x="30" y="100" width="140" height="45" rx="8" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="100" y="127" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">Usable Nitrogen in Soil</text>

                  <line x1="100" y1="145" x2="100" y2="185" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowN1)" />
                  <text x="100" y="170" textAnchor="middle" fontSize="9" fontWeight="800" fill="#a3e635">absorbed by roots</text>

                  <rect x="30" y="190" width="140" height="45" rx="8" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="100" y="217" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a3e635">Plants &amp; Animals</text>

                  <line x1="170" y1="212" x2="260" y2="150" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowN1)" />
                  <text x="245" y="185" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fbbf24">decomposers</text>

                  <rect x="230" y="100" width="140" height="45" rx="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="300" y="127" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24">Waste &amp; Dead Matter</text>

                  <line x1="290" y1="100" x2="220" y2="55" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowN1)" />
                  <text x="280" y="75" textAnchor="middle" fontSize="9" fontWeight="800" fill="#f87171">denitrifying bacteria</text>

                  <defs>
                    <marker id="arrowN1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Nitrogen-fixing bacteria, such as Rhizobium (found in the root nodules of certain plants like pea and gram), convert nitrogen gas from the air into a usable form in the soil.</li>
                <li>Plants absorb this usable nitrogen through their roots and use it to grow; animals then get nitrogen compounds by eating plants (or other animals).</li>
                <li>When plants and animals die, or produce waste, decomposer microorganisms break this down, releasing nitrogen compounds back into the soil.</li>
                <li>Other microorganisms (denitrifying bacteria) convert some nitrogen compounds back into nitrogen gas, returning it to the air and completing the cycle.</li>
              </ul>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="What is nitrogen fixation?" answer="The process by which certain microorganisms convert nitrogen gas from the air into a usable form that plants can absorb." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Name a nitrogen-fixing bacterium and where it is commonly found." answer="Rhizobium, commonly found in the root nodules of leguminous plants such as pea and gram." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why can't plants simply absorb nitrogen gas directly from the air, even though it makes up most of the atmosphere?" answer="Plants are not able to use nitrogen in its gas form directly -- it must first be converted by microorganisms into a form the plant's roots can actually absorb and use." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What role do decomposer microorganisms play in the nitrogen cycle?" answer="They break down dead plants, animals, and waste, releasing the nitrogen compounds trapped inside back into the soil, where they can be used again." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is the nitrogen cycle described as a 'cycle' rather than a one-way process?" answer="Because nitrogen keeps moving between the air, soil, plants, and animals, eventually returning to the air again through denitrifying bacteria -- forming a continuous loop rather than a single, one-directional path." />

              <RememberBox title="An invisible but essential partnership" isLightMode={isLightMode}>
                Without nitrogen-fixing microorganisms, plants would have almost no usable nitrogen at all, since they cannot use the nitrogen gas already surrounding them in the air.
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
                <FactRow label="Microorganism" isLightMode={isLightMode}>a living thing too small to see without a microscope.</FactRow>
                <FactRow label="Bacteria, fungi, protozoa, algae, viruses" isLightMode={isLightMode}>the five main groups of microorganisms.</FactRow>
                <FactRow label="Fermentation" isLightMode={isLightMode}>a process where microorganisms break down sugars, producing acids or gases, used to make foods like curd and bread.</FactRow>
                <FactRow label="Pathogen" isLightMode={isLightMode}>a microorganism that causes disease.</FactRow>
                <FactRow label="Communicable disease" isLightMode={isLightMode}>a disease that can spread from an infected person or animal to a healthy one.</FactRow>
                <FactRow label="Vector" isLightMode={isLightMode}>a carrier (such as a mosquito) that transfers a pathogen between hosts.</FactRow>
                <FactRow label="Vaccination" isLightMode={isLightMode}>using a weakened or killed pathogen to train the body's defences against a disease.</FactRow>
                <FactRow label="Food preservation" isLightMode={isLightMode}>methods used to prevent or slow down microbial growth in food.</FactRow>
                <FactRow label="Nitrogen fixation" isLightMode={isLightMode}>the process of converting nitrogen gas into a usable form for plants.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={Microscope} title="What & Where" color="cyan" isLightMode={isLightMode} points={[
                  "Too small to see without a microscope",
                  "Five groups: bacteria, fungi, protozoa, algae, viruses",
                  "Found almost everywhere, even in extreme places",
                ]} />
                <MindMapBranch icon={Cookie} title="Friendly: Food" color="amber" isLightMode={isLightMode} points={[
                  "Fermentation makes curd, bread, idli/dosa batter",
                  "Yeast produces gas that raises dough",
                  "Sugar fermentation can lead to alcohol, then vinegar",
                ]} />
                <MindMapBranch icon={Sprout} title="Friendly: Medicine & Soil" color="emerald" isLightMode={isLightMode} points={[
                  "Antibiotics (like penicillin) from fungi",
                  "Vaccines train the body's defences",
                  "Nitrogen-fixing bacteria improve soil fertility",
                ]} />
                <MindMapBranch icon={Bug} title="Harmful: Pathogens" color="rose" isLightMode={isLightMode} points={[
                  "Cause disease in humans, animals, plants",
                  "Bacteria, viruses, and protozoa examples",
                  "Communicable diseases spread to others",
                ]} />
                <MindMapBranch icon={ShieldCheck} title="Spread & Protection" color="sky" isLightMode={isLightMode} points={[
                  "Air, water, contact, and vectors",
                  "Vaccination trains the body in advance",
                  "Hygiene and vector control reduce spread",
                ]} />
                <MindMapBranch icon={Package} title="Preservation & Nitrogen" color="indigo" isLightMode={isLightMode} points={[
                  "Salt, sugar, heat, cold slow microbial growth",
                  "Nitrogen-fixing bacteria feed plants",
                  "Decomposers complete the nitrogen cycle",
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
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The regular syllabus covers the basics. Olympiad and reasoning-based papers often push these same ideas a step further -- this topic covers what commonly gets added on top, at this level.</p>
              </div>

              <SectionHeading>Ideas That Go a Step Further</SectionHeading>

              <InfoCard title="Why Antibiotics Do Not Work on Viruses" icon={Bug} isLightMode={isLightMode}>
                <p>Antibiotics work by disrupting processes specific to bacteria (such as building their cell walls), so they are effective against bacterial infections. Viruses do not have these same structures and instead multiply using the host's own cells, so ordinary antibiotics have no effect on viral infections -- this is why a doctor may not prescribe antibiotics for a common cold, which is caused by a virus.</p>
              </InfoCard>

              <InfoCard title="Herd Immunity" icon={ShieldCheck} isLightMode={isLightMode}>
                <p>When a large enough portion of a population is immune to a disease (through vaccination or past infection), the disease has far fewer opportunities to spread, indirectly protecting even those who are not immune. This is one reason widespread vaccination is important for a whole community, not just for the individual being vaccinated.</p>
              </InfoCard>

              <InfoCard title="Why Some Microorganisms Are Both Helpful and Harmful" icon={Sprout} isLightMode={isLightMode}>
                <p>The same broad group of microorganisms (such as bacteria) can contain both extremely helpful species (like those making curd or fixing nitrogen) and extremely harmful ones (like those causing cholera). It is never correct to label an entire group as simply 'good' or 'bad' -- the specific species matters.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Extremophiles" isLightMode={isLightMode}>microorganisms specially adapted to survive extreme conditions, such as very high temperatures or highly acidic environments, that would destroy most other living things.</FactRow>
                <FactRow label="Why pasteurised milk still needs refrigeration" isLightMode={isLightMode}>pasteurisation kills most harmful microorganisms present at that time, but it does not make milk permanently sterile -- new microorganisms can still grow in it over time if left unrefrigerated.</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Reasoning-based papers love testing whether a claim overgeneralises -- for example, assuming ALL bacteria are harmful, or that ALL preservation methods kill microorganisms completely. Always check whether a statement is true for every case, or only for some.
              </RememberBox>

              <SectionHeading>Solved Reasoning Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="A patient with a common cold is told that antibiotics will not help them. Explain why, using scientific reasoning." answer="The common cold is caused by a virus, and antibiotics work only against processes specific to bacteria. Since viruses lack these bacterial structures and multiply differently (using the host's own cells), antibiotics have no effect on them." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Explain how widespread vaccination in a community can help protect even people who have not been vaccinated." answer="This is called herd immunity -- when enough people in a community are immune, the disease has far fewer opportunities to spread from person to person, which lowers the risk of infection even for those who remain unvaccinated." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A student claims, 'All bacteria are harmful and cause disease.' Evaluate this claim." answer="This claim is incorrect -- while some bacteria are harmful pathogens (such as those causing cholera or typhoid), many other bacteria are extremely helpful, such as those used to make curd or those that fix nitrogen in soil. The group 'bacteria' contains both helpful and harmful species." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain why pasteurised milk left outside the refrigerator for several days can still spoil." answer="Pasteurisation only kills the harmful microorganisms present at the time of treatment -- it does not make the milk permanently free of all microorganisms, so new ones from the air or container can still grow over time if the milk is not kept refrigerated." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain how an extremophile microorganism living in a very hot spring differs from most other living things in terms of survival." answer="Most living things cannot survive extremely high temperatures, since heat can damage their cells. An extremophile is specially adapted to withstand such extreme heat, allowing it to survive and grow in conditions that would destroy nearly all other organisms." />
              <ExampleQ number={6} isLightMode={isLightMode} question="A village removes all sources of stagnant water and starts using mosquito nets. Explain, using ideas from this chapter, why cases of malaria in the village are likely to drop." answer="Malaria spreads through the female Anopheles mosquito, which breeds in stagnant water. Removing stagnant water reduces mosquito breeding sites, and mosquito nets reduce mosquito bites -- both actions interrupt the vector's ability to transfer the pathogen between people, reducing the spread of malaria." />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = MICRO_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(MICRO_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = MICRO_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < MICRO_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(MICRO_TOPICS[currentIndex + 1].id)}
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
                    onClick={() => setActiveTopic(MICRO_TOPICS[0].id)}
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

export default LearnScience8InvisibleWorld;
