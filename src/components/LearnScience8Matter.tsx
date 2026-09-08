import React, { useState } from "react";
import {
  Atom,
  Award,
  HelpCircle,
  Layers,
  Boxes,
  Droplets,
  Wind,
  Thermometer,
  Wand2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type MatterTopicId =
  | "introduction"
  | "interparticle-spaces"
  | "solid-state"
  | "liquid-state"
  | "gaseous-state"
  | "comparing-spacing"
  | "particle-motion"
  | "thermal-energy"
  | "glossary-mindmap"
  | "competition-corner";

interface MatterTopic {
  id: MatterTopicId;
  title: string;
  category: string;
}

const MATTER_TOPICS: MatterTopic[] = [
  { id: "introduction", title: "1. Matter Is Made of Particles", category: "Fundamentals" },
  { id: "interparticle-spaces", title: "2. Interparticle Spaces & Forces", category: "Fundamentals" },
  { id: "solid-state", title: "3. The Solid State", category: "The Three States" },
  { id: "liquid-state", title: "4. The Liquid State", category: "The Three States" },
  { id: "gaseous-state", title: "5. The Gaseous State", category: "The Three States" },
  { id: "comparing-spacing", title: "6. Comparing Spacing Across States", category: "The Three States" },
  { id: "particle-motion", title: "7. Particle Motion & Spreading", category: "Motion & Mixing" },
  { id: "thermal-energy", title: "8. Heat Energy & Change of State", category: "Motion & Mixing" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnScience8MatterProps {
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

export function LearnScience8Matter({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnScience8MatterProps) {
  const [activeTopic, setActiveTopic] = useState<MatterTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const textMain = isLightMode ? "#0f172a" : "#f1f5f9";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-science8m-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Particulate Nature of Matter</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Particulate Nature of Matter</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Why matter is really made of countless tiny particles, and how the spacing, forces, and motion between them decide whether something is a solid, a liquid, or a gas.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {MATTER_TOPICS.map((topic) => (
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-science8m-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-science8m-main p, #learn-science8m-main li, #learn-science8m-main span, #learn-science8m-main label, #learn-science8m-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-science8m-main b, #learn-science8m-main strong, #learn-science8m-main h1, #learn-science8m-main h2, #learn-science8m-main h3, #learn-science8m-main h4, #learn-science8m-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-science8m-container .bg-slate-900, #learn-science8m-container .bg-\\[\\#0d1424\\], #learn-science8m-container .bg-\\[\\#0a1622\\], #learn-science8m-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-science8m-container .border-slate-800, #learn-science8m-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Atom className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Chapter: Particulate Nature of Matter</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Matter Is Made of Particles</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Every single thing around you -- chalk, water, air -- is actually built from an enormous number of tiny pieces, far too small to see.</p>
              </div>

              <InfoCard title="Core Idea" icon={Atom} isLightMode={isLightMode}>
                <p><b>Constituent particle:</b> the basic tiny unit that makes up a larger piece of a substance or material. Every material, however big, is made of huge numbers of these particles.</p>
                <p>Breaking a piece of chalk again and again eventually gives specks too small to break further by hand -- but even these tiny specks are still made of enormous numbers of even smaller constituent particles, far beyond what any magnifying glass could reveal.</p>
              </InfoCard>

              <DiagramCard caption="Breaking a piece of chalk again and again eventually reaches particles too small to see, even with a magnifying glass" isLightMode={isLightMode}>
                <svg viewBox="0 0 400 130" className="w-full h-auto">
                  <rect x="10" y="35" width="70" height="30" rx="6" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="45" y="55" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Whole chalk</text>
                  <line x1="80" y1="50" x2="115" y2="50" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowMat1)" />
                  <text x="97" y="40" textAnchor="middle" fontSize="8" fontWeight="800" fill="#94a3b8">break</text>

                  <rect x="120" y="35" width="70" height="30" rx="6" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="155" y="55" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Small pieces</text>
                  <line x1="190" y1="50" x2="225" y2="50" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowMat1)" />
                  <text x="207" y="40" textAnchor="middle" fontSize="8" fontWeight="800" fill="#94a3b8">grind</text>

                  <rect x="230" y="35" width="70" height="30" rx="6" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="265" y="55" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Fine powder</text>
                  <line x1="300" y1="50" x2="325" y2="50" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowMat1)" />

                  <circle cx="350" cy="50" r="20" fill="none" stroke="#f87171" strokeWidth="2.5" />
                  <circle cx="345" cy="45" r="2.5" fill="#f87171" />
                  <circle cx="355" cy="55" r="2.5" fill="#f87171" />
                  <circle cx="353" cy="43" r="2.5" fill="#f87171" />
                  <text x="350" y="90" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Tiny particles</text>
                  <text x="350" y="102" textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">(too small to see)</text>

                  <defs>
                    <marker id="arrowMat1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Grinding chalk into powder does not turn it into a new substance -- it stays chalk. This confirms that only the SIZE of each speck has changed, not what it is made of.</li>
                <li>Even the finest visible speck of chalk is still built from a huge number of much smaller constituent particles.</li>
                <li>When sugar is stirred into water, the water tastes sweet throughout, even though no sugar grains can be seen -- this shows sugar has broken into constituent particles too small to see, spread evenly through the water.</li>
                <li>These constituent particles are so small that they cannot be seen even with an ordinary microscope.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>All matter is built from extremely small constituent particles</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A piece of chalk is ground into a very fine powder. Has the chalk turned into a new substance?" answer="No -- grinding only reduces the size of each speck; the powder is still chalk. This is a change in size, not a change into a new substance." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Sugar is stirred into water until it disappears completely. The water still tastes sweet. Explain why, using the idea of constituent particles." answer="The sugar has broken up into its constituent particles, which are too small to see but spread evenly through the water -- their presence can still be sensed by taste." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why can't constituent particles be seen even with an ordinary microscope?" answer="Constituent particles are extraordinarily small -- far smaller than the tiny dust or powder specks we can already barely see, so even a microscope's magnification is not enough to make them visible." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Is a fine speck of chalk powder the smallest possible unit of chalk?" answer="No -- that visible speck is still made up of a huge number of even smaller constituent particles that cannot be broken down any further." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain why grains of sand and clay are not considered the smallest units of the rocks they came from." answer="Sand and clay grains are themselves made up of a large number of their own constituent particles, just like chalk -- being small does not automatically mean being the smallest possible unit." />

              <RememberBox title="Size change, not substance change" isLightMode={isLightMode}>
                Breaking or grinding something only changes its size -- it stays the exact same substance all the way down to its constituent particles, unless a completely different kind of change (like burning) is involved.
              </RememberBox>
            </div>
          )}

          {activeTopic === "interparticle-spaces" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Interparticle Spaces & Forces</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Particles are never perfectly packed together -- there are gaps between them, and forces pulling them together.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Layers} isLightMode={isLightMode}>
                <p><b>Interparticle space:</b> the empty gap between constituent particles. When a substance dissolves, its particles spread into these gaps in the other substance.</p>
                <p><b>Interparticle attraction:</b> the attractive force holding constituent particles together. Its strength depends on the substance itself and on the distance between the particles.</p>
              </InfoCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>When sugar dissolves in water, its particles do not add extra space -- they fit into the interparticle spaces that already exist between the water particles.</li>
                <li>Even a small increase in the distance between particles causes a big drop in how strongly they attract each other.</li>
                <li>It is exactly this strength of interparticle attraction that decides whether a substance behaves as a solid, a liquid, or a gas.</li>
                <li>Interparticle space is genuinely empty -- it is not secretly filled with air or anything else.</li>
              </ul>

              <SectionHeading>A Historical Idea</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Long before modern instruments existed, the ancient Indian philosopher Acharya Kanad proposed that matter is built from extremely small, indivisible, everlasting particles, which he called "Parmanu". This idea appears in his work known as the Vaisheshika Sutras -- an early example of thinking about the particle nature of matter, long before it could be tested experimentally.</p>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Define interparticle space." answer="The empty gap that exists between the constituent particles of a substance." />
              <ExampleQ number={2} isLightMode={isLightMode} question="When sugar dissolves in water, does the total volume simply become the sum of the sugar's volume and the water's volume? Explain." answer="Not exactly -- since the sugar particles fit into the existing interparticle spaces between the water particles, the final volume is somewhat less than the two volumes simply added together." />
              <ExampleQ number={3} isLightMode={isLightMode} question="What two things does the strength of interparticle attraction depend on?" answer="The nature of the substance itself, and the distance between its particles." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why does a slight increase in the distance between particles cause a large drop in the force attracting them together?" answer="Interparticle attraction is extremely sensitive to distance -- even a small increase is enough to weaken the force drastically, which is exactly why heating a substance (which pushes particles slightly apart) can change its state." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Who proposed the early idea of indivisible particles called 'Parmanu', and in which work?" answer="Acharya Kanad, in his work known as the Vaisheshika Sutras." />

              <RememberBox title="Distance controls everything" isLightMode={isLightMode}>
                Almost every idea in this chapter traces back to one simple relationship: as interparticle distance increases, interparticle attraction drops sharply -- and this single relationship explains solids, liquids, gases, melting, and boiling all at once.
              </RememberBox>
            </div>
          )}

          {activeTopic === "solid-state" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">The Solid State</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Solids hold their shape because their particles are locked tightly in place -- but "locked" does not mean "frozen still".</p>
              </div>

              <InfoCard title="Core Idea" icon={Boxes} isLightMode={isLightMode}>
                <p>In solids, particles are tightly packed and held by very strong interparticle attraction. This keeps each particle fixed in position -- it can only vibrate or oscillate on the spot, but cannot move past its neighbours.</p>
              </InfoCard>

              <DiagramCard caption="Heating a solid makes its particles vibrate more strongly, until the solid melts into a liquid at its melting point" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 140" className="w-full h-auto">
                  <rect x="15" y="25" width="100" height="80" rx="8" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  {[0,1,2].map(r => [0,1,2].map(c => (
                    <circle key={`${r}-${c}`} cx={35 + c * 30} cy={45 + r * 28} r="4" fill="#22d3ee" />
                  )))}
                  <text x="65" y="120" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Solid (fixed, vibrating)</text>

                  <line x1="118" y1="65" x2="150" y2="65" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowMelt)" />
                  <text x="134" y="55" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fbbf24">heat</text>

                  <rect x="155" y="25" width="100" height="80" rx="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  {[0,1,2].map(r => [0,1,2].map(c => (
                    <circle key={`b${r}-${c}`} cx={175 + c * 30 + (r % 2 === 0 ? 4 : -4)} cy={45 + r * 28} r="4" fill="#fbbf24" />
                  )))}
                  <text x="205" y="120" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>More vibration</text>

                  <line x1="258" y1="65" x2="290" y2="65" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowMelt)" />
                  <text x="274" y="55" textAnchor="middle" fontSize="8" fontWeight="800" fill="#a3e635">melts</text>

                  <rect x="295" y="25" width="70" height="80" rx="8" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <circle cx="315" cy="45" r="4" fill="#a3e635" />
                  <circle cx="340" cy="50" r="4" fill="#a3e635" />
                  <circle cx="320" cy="70" r="4" fill="#a3e635" />
                  <circle cx="345" cy="80" r="4" fill="#a3e635" />
                  <circle cx="310" cy="90" r="4" fill="#a3e635" />
                  <text x="330" y="120" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Liquid</text>

                  <defs>
                    <marker id="arrowMelt" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Solids have a definite shape and a definite volume, because their particles cannot move from their fixed positions.</li>
                <li>The particles can still vibrate on the spot -- heating a solid makes these vibrations more vigorous.</li>
                <li>At a high enough temperature, vibrations become strong enough that particles break free from their fixed positions, and the solid turns into a liquid.</li>
                <li><b>Melting point:</b> the minimum temperature at which a solid turns into a liquid at atmospheric pressure.</li>
                <li>Substances with weaker interparticle attraction have lower melting points; substances with stronger attraction have higher melting points.</li>
              </ul>

              <SectionHeading>Melting Points of Some Materials</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Ice" isLightMode={isLightMode}>0 degrees Celsius.</FactRow>
                <FactRow label="Urea" isLightMode={isLightMode}>133 degrees Celsius.</FactRow>
                <FactRow label="Iron" isLightMode={isLightMode}>1538 degrees Celsius.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Solid: particles fixed in place, only vibrating -- definite shape and volume</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why do solids have a definite shape?" answer="Because their particles are held tightly in fixed positions by strong interparticle attraction, and cannot move past one another." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Can particles in a solid move at all? Explain." answer="Yes -- they can vibrate or oscillate about their fixed position, but they cannot leave that position or move past neighbouring particles." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Define melting point." answer="The minimum temperature at which a solid changes into a liquid at atmospheric pressure." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Iron has a much higher melting point than ice. What does this suggest about the interparticle attraction in each?" answer="Iron's particles are held together by much stronger interparticle attraction than ice's particles, so far more heat energy is needed to weaken that attraction enough for melting to occur." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain, step by step, what happens to a solid's particles as it is heated toward its melting point." answer="The particles first vibrate more and more vigorously as heat is added. Eventually the vibrations become strong enough to overcome some of the interparticle attraction, letting particles leave their fixed positions -- at this point the solid becomes a liquid." />

              <RememberBox title="Vibrating is not the same as moving around" isLightMode={isLightMode}>
                A common mix-up: solid particles are NOT perfectly still, but their vibration is only a small back-and-forth motion around one fixed spot -- very different from particles that can freely travel around, like in liquids or gases.
              </RememberBox>
            </div>
          )}

          {activeTopic === "liquid-state" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">The Liquid State</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Liquids can flow into any shape, yet a fixed amount of liquid always takes up exactly the same amount of room.</p>
              </div>

              <InfoCard title="Core Idea" icon={Droplets} isLightMode={isLightMode}>
                <p>In liquids, interparticle attraction is slightly weaker than in solids -- strong enough to keep particles close together, but weak enough to let them move freely within a limited space.</p>
              </InfoCard>

              <DiagramCard caption="The same water poured into three differently shaped containers always keeps the same volume, but changes shape each time" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 130" className="w-full h-auto">
                  <rect x="20" y="30" width="60" height="70" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <rect x="23" y="60" width="54" height="37" fill="#22d3ee" opacity="0.25" />
                  <text x="50" y="115" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Container A</text>

                  <path d="M 140 30 L 220 30 L 200 100 L 160 100 Z" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <path d="M 145 62 L 215 62 L 200 98 L 160 98 Z" fill="#fbbf24" opacity="0.25" />
                  <text x="180" y="115" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Container B</text>

                  <path d="M 280 40 Q 280 30 300 30 Q 320 30 320 40 L 320 100 L 280 100 Z" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <path d="M 280 65 L 320 65 L 320 98 L 280 98 Z" fill="#a3e635" opacity="0.25" />
                  <text x="300" y="115" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Container C</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Liquids take the shape of whatever container they are poured into, since their particles are free to move.</li>
                <li>Despite changing shape, a fixed quantity of liquid always keeps the same volume -- liquids have a definite volume but no fixed shape.</li>
                <li>A finger can move through water without permanently cutting it -- water is temporarily displaced and returns to its position, showing interparticle attraction is still strong enough to hold particles close, just not fixed in place.</li>
                <li><b>Boiling point:</b> the temperature at which a liquid turns into vapour throughout its whole volume (not just the surface) at atmospheric pressure.</li>
                <li><b>Evaporation:</b> a slower process where vapour forms only at the surface of a liquid, and can happen at any temperature, even well below the boiling point.</li>
                <li>Since both liquids and gases can flow and take the shape of their container, they are both called fluids.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Liquid: definite volume, no fixed shape, particles move within a limited space</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why does a liquid take the shape of its container?" answer="Because its particles are free to move around, unlike a solid's fixed particles, so the liquid flows to fill the shape of whatever it is poured into." />
              <ExampleQ number={2} isLightMode={isLightMode} question="200 mL of water is poured, one after another, into three differently shaped containers. What stays the same, and what changes?" answer="The volume stays the same (200 mL each time), but the shape of the water changes to match each container." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Distinguish between boiling and evaporation." answer="Boiling happens at a fixed temperature (the boiling point), forming vapour rapidly throughout the whole liquid, seen as bubbles. Evaporation happens more slowly, only at the surface, and can occur at any temperature." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why are liquids and gases both called 'fluids', while solids are not?" answer="Both liquids and gases can flow and do not hold a fixed shape of their own, unlike solids, which is exactly what the term 'fluid' describes." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain why a finger can pass through water without permanently damaging it, while the same is not true for a solid block." answer="Water's particles are free to move and temporarily shift out of the way, then return to position once the finger is removed. A solid's particles are fixed in place and cannot shift aside in the same way, so pushing through it would actually break it." />

              <RememberBox title="Definite volume is the key liquid property" isLightMode={isLightMode}>
                Shape can change freely, but the volume of a fixed amount of liquid never does -- this single fact is the quickest way to confirm something is behaving as a liquid.
              </RememberBox>
            </div>
          )}

          {activeTopic === "gaseous-state" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">The Gaseous State</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Gases don't just fill part of a container -- they spread out to fill every last bit of available space.</p>
              </div>

              <InfoCard title="Core Idea" icon={Wind} isLightMode={isLightMode}>
                <p>In gases, interparticle attraction is negligible -- so particles move freely and quickly in every direction, spreading out to occupy all the space available to them.</p>
              </InfoCard>

              <DiagramCard caption="Smoke trapped in one gas jar spreads out to completely fill a second, connected jar as well" isLightMode={isLightMode}>
                <svg viewBox="0 0 300 140" className="w-full h-auto">
                  <rect x="20" y="20" width="100" height="100" rx="6" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  {[[40,40],[60,55],[50,75],[80,50],[95,80],[65,95]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill="#22d3ee" opacity="0.7" />
                  ))}
                  <text x="70" y="132" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Jar A (smoke trapped)</text>

                  <line x1="122" y1="70" x2="158" y2="70" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowGas)" />
                  <text x="140" y="60" textAnchor="middle" fontSize="8" fontWeight="800" fill="#94a3b8">joined</text>

                  <rect x="160" y="20" width="120" height="100" rx="6" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  {[[180,35],[200,50],[220,40],[240,60],[190,75],[210,90],[230,80],[250,95],[265,50],[175,100]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill="#fbbf24" opacity="0.7" />
                  ))}
                  <text x="220" y="132" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Jar A + B (smoke everywhere)</text>

                  <defs>
                    <marker id="arrowGas" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Gases have no fixed shape and no fixed volume -- they always expand to fill whatever space is available to them.</li>
                <li>Trapped smoke or vapour spreading to completely fill a connected, larger space shows that gas particles move freely in every direction.</li>
                <li>Like liquids, gases flow and take the shape of their container, so they are also classified as fluids.</li>
                <li>Interparticle attraction in gases is so weak that it can be treated as practically zero.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Gas: no fixed shape, no fixed volume, particles move freely in all directions</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why does a gas always expand to fill its entire container, however large?" answer="Because interparticle attraction in gases is negligible, so particles move freely in every direction with nothing significant holding them together or back." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Smoke trapped in one gas jar is allowed to connect to a second, empty jar. What is observed, and why?" answer="The smoke spreads to fill both jars completely, since gas particles move freely in all directions until they occupy all the space available to them." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why are both liquids and gases described as 'fluids'?" answer="Both can flow and take the shape of whatever container holds them, unlike solids, which keep a fixed shape of their own." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Compare the strength of interparticle attraction in solids, liquids, and gases." answer="It is strongest in solids, somewhat weaker in liquids, and negligible in gases." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A gas is released into a large empty room. Will it stay near where it was released, or spread throughout the room? Explain." answer="It will spread throughout the entire room, since gas particles move freely in all directions and will keep spreading until they occupy all the available space." />

              <RememberBox title="Gases don't just sit there" isLightMode={isLightMode}>
                Unlike a liquid which stays put once poured, a gas released anywhere in a space will actively keep spreading until it has filled every available corner of that space.
              </RememberBox>
            </div>
          )}

          {activeTopic === "comparing-spacing" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Comparing Spacing Across States</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A simple pushing test reveals just how differently packed the particles in a solid, a liquid, and a gas really are.</p>
              </div>

              <InfoCard title="Core Idea" icon={Layers} isLightMode={isLightMode}>
                <p>Interparticle spacing is smallest in solids, a little more in liquids, and largest in gases -- and this spacing directly explains why gases can be compressed easily, while liquids practically cannot.</p>
              </InfoCard>

              <DiagramCard caption="Interparticle spacing increases from solid to liquid to gas -- particles are closest together in a solid and most spread out in a gas" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 130" className="w-full h-auto">
                  <rect x="10" y="15" width="105" height="90" rx="8" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  {[0,1,2,3].map(r => [0,1,2].map(c => (
                    <circle key={`s${r}-${c}`} cx={30 + c * 25} cy={35 + r * 20} r="5" fill="#22d3ee" />
                  )))}
                  <text x="62" y="118" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Solid</text>

                  <rect x="137" y="15" width="105" height="90" rx="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  {[[155,35],[180,32],[205,40],[160,60],[190,65],[215,58],[165,90],[195,88],[220,80]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="5" fill="#fbbf24" />
                  ))}
                  <text x="189" y="118" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Liquid</text>

                  <rect x="264" y="15" width="105" height="90" rx="8" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  {[[280,30],[340,25],[300,55],[355,70],[275,85],[320,95],[350,40]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="5" fill="#a3e635" />
                  ))}
                  <text x="316" y="118" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Gas</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Pushing the plunger of a syringe filled only with trapped air noticeably reduces the air's volume, showing gas particles have a lot of extra space between them that can be squeezed smaller.</li>
                <li>Trying the same thing with water shows almost no change in volume -- water (a liquid) is practically incompressible, since its particles are already close together.</li>
                <li>When sugar dissolves in water, the final volume is less than the sugar's volume plus the water's volume added together -- proving there is real empty interparticle space between water particles that the sugar particles can fit into.</li>
                <li>This interparticle space is genuinely empty -- it is not filled with air or any other hidden substance.</li>
                <li>Insoluble solids like sand do not fit into these interparticle spaces -- they simply settle and add to the total volume instead.</li>
              </ul>

              <SectionHeading>A Useful Distinction</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">The word "particle" is used in more than one way. In discussions about air pollution, "particulate matter" usually refers to visible dust and soot particles floating in air. These are still enormously larger than the constituent particles discussed in this chapter -- in fact, even a single tiny dust particle is itself built from a vast number of constituent particles.</p>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Interparticle spacing: least in solids, more in liquids, most in gases</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why can a syringe full of trapped air be compressed easily, while a syringe full of water cannot?" answer="Air (a gas) has large interparticle spaces that can be squeezed smaller, while water (a liquid) already has its particles packed closely together, leaving very little room to compress further." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Two teaspoons of sugar are added to a measured amount of water and dissolved completely. Explain why the final volume is less than simply adding the sugar's volume and the water's volume." answer="The sugar's particles fit into the existing interparticle spaces between the water particles rather than sitting on top of the water's own volume, so the total increase in volume is less than the sum of the two separate volumes." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Sand is added to water instead of sugar. Does the water's volume increase in the same limited way as with sugar? Explain." answer="No -- since sand does not dissolve, its particles cannot fit into the water's interparticle spaces; instead, the sand simply settles and adds its own full volume on top of the water's volume." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Is the empty space between particles in a solid filled with air?" answer="No -- interparticle space is genuinely empty; it does not contain air or anything else." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain the difference between 'suspended particulate matter' (as used in discussions of air pollution) and the 'constituent particles' discussed in this chapter." answer="Suspended particulate matter refers to visible dust or soot particles in the air, which are far larger than constituent particles -- in fact, even one dust particle is itself made up of enormous numbers of constituent particles." />

              <RememberBox title="Compressibility reveals spacing" isLightMode={isLightMode}>
                Whether something can be squeezed into a smaller volume is a direct, testable clue about how much empty interparticle space it already has -- gases have plenty, liquids have almost none left to give.
              </RememberBox>
            </div>
          )}

          {activeTopic === "particle-motion" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Particle Motion & Spreading</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Particles are never truly still -- and this constant motion is exactly why colours, smells, and flavours spread out on their own.</p>
              </div>

              <InfoCard title="Core Idea" icon={Wand2} isLightMode={isLightMode}>
                <p>The constituent particles of liquids and gases are in constant, random motion. This motion causes one substance's particles to gradually spread through another all on their own -- a process called diffusion.</p>
              </InfoCard>

              <DiagramCard caption="A coloured grain placed in water spreads out on its own, from streaks near the grain to an even colour throughout, as water particles keep moving and colliding" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 130" className="w-full h-auto">
                  <rect x="15" y="20" width="105" height="90" rx="8" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="67" cy="65" r="7" fill="#f472b6" />
                  <path d="M 67 65 Q 55 50 50 40" stroke="#f472b6" strokeWidth="1.5" fill="none" opacity="0.6" />
                  <path d="M 67 65 Q 80 55 90 45" stroke="#f472b6" strokeWidth="1.5" fill="none" opacity="0.6" />
                  <text x="67" y="118" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Just dropped in</text>

                  <line x1="122" y1="65" x2="150" y2="65" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowDiff)" />

                  <rect x="155" y="20" width="105" height="90" rx="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  {[[175,35],[200,30],[220,45],[180,60],[210,70],[190,90],[230,85],[240,50]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="4" fill="#f472b6" opacity="0.6" />
                  ))}
                  <text x="207" y="118" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Streaks spreading</text>

                  <line x1="262" y1="65" x2="290" y2="65" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowDiff)" />

                  <rect x="295" y="20" width="70" height="90" rx="8" fill="#f472b6" opacity="0.18" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="330" y="118" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Even colour</text>

                  <defs>
                    <marker id="arrowDiff" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>A coloured grain dropped into still water spreads on its own into streaks, and eventually colours the entire water evenly -- without any stirring at all.</li>
                <li>This happens because water particles are always moving; they knock particles off the grain and carry them throughout the liquid.</li>
                <li>Substances whose particles are held together too strongly for water particles to pull apart do not dissolve -- this is why sand does not dissolve in water.</li>
                <li>Diffusion happens faster in hot water than in room-temperature water, and slower still in ice-cold water -- so heat clearly speeds up particle motion.</li>
                <li>The scent of an incense stick lit in one corner of a room eventually reaches every corner, because moving air particles constantly collide with and carry the fragrance particles outward.</li>
                <li><b>Diffusion:</b> the spreading of one substance's particles through another, caused by the constant, random motion of particles.</li>
              </ul>

              <SectionHeading>A Real-Life Application</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Soap uses this particle behaviour to clean oily stains. Soap particles surround the oil on the fabric -- one end of each soap particle attaches to the oil, while the other end mixes freely with water. This lets the oil be lifted away and washed off along with the water.</p>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Diffusion happens because particles are always moving -- and heat makes this motion faster</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A coloured grain is dropped into still water and, without any stirring, the whole glass eventually turns the same colour. Explain why." answer="The water's particles are constantly moving, and this motion knocks particles off the grain and spreads them throughout the water -- this is diffusion." />
              <ExampleQ number={2} isLightMode={isLightMode} question="The same coloured grain is dropped into hot water, room-temperature water, and ice-cold water. In which does the colour spread fastest, and why?" answer="Fastest in hot water, since heat increases particle motion -- faster-moving particles cause quicker diffusion. It spreads slower in room-temperature water and slowest of all in ice-cold water." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why doesn't sand dissolve in water, even though water particles are constantly moving and colliding with everything?" answer="Sand's constituent particles are held together by forces too strong for the moving water particles to pull apart, so sand remains undissolved rather than spreading through the water." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain why the fragrance of an incense stick lit in one corner of a room can eventually be smelled everywhere in the room." answer="The constantly moving air particles collide with the fragrance particles and carry them outward in all directions, eventually spreading the scent throughout the entire room -- diffusion in a gas." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain, using particle behaviour, how soap helps remove an oily stain from fabric." answer="Soap particles surround the oil, with one end of each particle attaching to the oil and the other end mixing with water -- this allows the oil to be lifted off the fabric and washed away with the water." />

              <RememberBox title="Diffusion needs no stirring" isLightMode={isLightMode}>
                The most important takeaway about diffusion is that it happens entirely on its own, purely because particles are always moving -- no stirring, shaking, or outside help is required.
              </RememberBox>
            </div>
          )}

          {activeTopic === "thermal-energy" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Heat Energy & Change of State</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>One single idea -- heat energy -- ties together particle spacing, particle motion, and the state a substance is in.</p>
              </div>

              <InfoCard title="Core Idea" icon={Thermometer} isLightMode={isLightMode}>
                <p>The heat (thermal) energy of particles decides how far apart they are, and therefore how strongly they attract each other -- which in turn decides whether a substance behaves as a solid, a liquid, or a gas.</p>
              </InfoCard>

              <SectionHeading>Putting It All Together</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Solid" isLightMode={isLightMode}>Low heat energy -- particles stay close, interparticle attraction is strong, motion is limited to small vibrations.</FactRow>
                <FactRow label="At the melting point" isLightMode={isLightMode}>Added heat energy is used to weaken the interparticle attraction enough that particles can leave their fixed positions.</FactRow>
                <FactRow label="Liquid" isLightMode={isLightMode}>Interparticle distance increases slightly, weakening attraction just enough to let particles move, though still within a limited space.</FactRow>
                <FactRow label="Gas" isLightMode={isLightMode}>Particles gain enough heat energy to overcome interparticle attraction almost completely, moving freely in every direction.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Heat energy up -&gt; particles spread apart -&gt; attraction weakens -&gt; state changes</KeyIdeaBox>

              <SectionHeading>Beyond Constituent Particles: Atoms & Molecules</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">The constituent particles that make up matter are, more specifically, atoms and molecules. Iron is made of iron atoms, and gold is made of gold atoms. Some atoms, like those of hydrogen, oxygen, and sulfur, do not usually exist completely on their own -- a fixed number of such atoms join together to form a molecule. For example, two hydrogen atoms join to form a hydrogen molecule, and one water molecule is made from two hydrogen atoms joined with one oxygen atom.</p>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Explain, in terms of heat energy, why a solid has particles that barely move, while a gas has particles moving freely." answer="A solid's particles have low heat energy, keeping them close together under strong attraction with only small vibrations possible. A gas's particles have much higher heat energy, enough to overcome almost all interparticle attraction and move freely in every direction." />
              <ExampleQ number={2} isLightMode={isLightMode} question="What happens to the heat energy added to a solid exactly at its melting point?" answer="It is used to weaken the interparticle attraction enough for particles to break free from their fixed positions, allowing the solid to become a liquid." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Explain why a liquid's particles can move around, but only within a limited space, unlike a gas." answer="A liquid's particles have gained enough heat energy to loosen their fixed positions and move, but not so much that interparticle attraction is fully overcome -- so they stay loosely held together within a limited space, unlike a gas where attraction is almost completely overcome." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What are the basic constituent particles of iron and gold called?" answer="Atoms -- iron is made of iron atoms, and gold is made of gold atoms." />
              <ExampleQ number={5} isLightMode={isLightMode} question="How many atoms of each kind combine to form a water molecule?" answer="Two hydrogen atoms and one oxygen atom combine to form one water molecule." />

              <RememberBox title="One idea explains everything in this chapter" isLightMode={isLightMode}>
                If you remember only one thing from this whole chapter, make it this: heat energy controls particle spacing, particle spacing controls attraction strength, and attraction strength decides whether something is a solid, a liquid, or a gas.
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
                <FactRow label="Constituent particle" isLightMode={isLightMode}>the basic tiny unit making up a larger piece of matter.</FactRow>
                <FactRow label="Interparticle space" isLightMode={isLightMode}>the empty gap between constituent particles.</FactRow>
                <FactRow label="Interparticle attraction" isLightMode={isLightMode}>the attractive force holding particles together; depends on the substance and the distance between particles.</FactRow>
                <FactRow label="Melting point" isLightMode={isLightMode}>the minimum temperature at which a solid becomes a liquid at atmospheric pressure.</FactRow>
                <FactRow label="Boiling point" isLightMode={isLightMode}>the temperature at which a liquid turns to vapour throughout its volume at atmospheric pressure.</FactRow>
                <FactRow label="Evaporation" isLightMode={isLightMode}>slow vapour formation at a liquid's surface, at any temperature.</FactRow>
                <FactRow label="Fluid" isLightMode={isLightMode}>a substance that flows and has no fixed shape -- liquids and gases are both fluids.</FactRow>
                <FactRow label="Diffusion" isLightMode={isLightMode}>the spreading of one substance's particles through another due to constant particle motion.</FactRow>
                <FactRow label="Atom / molecule" isLightMode={isLightMode}>the specific constituent particles of matter; some atoms join together to form molecules.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={Atom} title="Particles & Spaces" color="cyan" isLightMode={isLightMode} points={[
                  "All matter is built from constituent particles",
                  "Interparticle spaces are genuinely empty",
                  "Interparticle attraction depends on distance",
                ]} />
                <MindMapBranch icon={Boxes} title="Solid" color="amber" isLightMode={isLightMode} points={[
                  "Particles fixed, only vibrate",
                  "Definite shape and volume",
                  "Melting point: solid to liquid",
                ]} />
                <MindMapBranch icon={Droplets} title="Liquid" color="sky" isLightMode={isLightMode} points={[
                  "Particles move within limited space",
                  "Definite volume, no fixed shape",
                  "Boiling point vs slower evaporation",
                ]} />
                <MindMapBranch icon={Wind} title="Gas" color="emerald" isLightMode={isLightMode} points={[
                  "Particles move freely everywhere",
                  "No fixed shape or volume",
                  "Negligible interparticle attraction",
                ]} />
                <MindMapBranch icon={Wand2} title="Motion & Diffusion" color="rose" isLightMode={isLightMode} points={[
                  "Particles are always moving",
                  "Heat speeds up diffusion",
                  "Explains smells, taste, soap cleaning",
                ]} />
                <MindMapBranch icon={Thermometer} title="Heat Energy" color="indigo" isLightMode={isLightMode} points={[
                  "Controls interparticle distance",
                  "Distance controls attraction strength",
                  "Attraction strength decides the state",
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

              <InfoCard title="Ice Is an Exception Worth Remembering" icon={Boxes} isLightMode={isLightMode}>
                <p>In most substances, particles in the solid state are packed closer together than in the liquid state. Ice is a notable exception -- its particles are actually arranged slightly farther apart than in liquid water, which is exactly why ice is less dense than water and floats on it.</p>
              </InfoCard>

              <InfoCard title="Compressibility Is a Real Test, Not Just a Definition" icon={Layers} isLightMode={isLightMode}>
                <p>Rather than memorising "gases are compressible, liquids are not", a stronger understanding comes from the reasoning: compressibility directly measures how much unused interparticle space is available to be squeezed out. A substance with almost no leftover space (like a liquid) simply has nowhere left to compress into.</p>
              </InfoCard>

              <InfoCard title="Diffusion Rate Depends on More Than Just Heat" icon={Wand2} isLightMode={isLightMode}>
                <p>While heat is the main factor explored in this chapter, diffusion also tends to happen faster for lighter, smaller particles compared to heavier, bulkier ones, since lighter particles are easier to set into faster motion for the same amount of energy.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Sublimation" isLightMode={isLightMode}>a few substances (like solid iodine) can turn directly from solid to vapour without becoming liquid first, when heated under suitable conditions.</FactRow>
                <FactRow label="Why gases exert pressure on container walls" isLightMode={isLightMode}>freely moving gas particles constantly collide with the walls of their container, and these countless tiny collisions are what create the pressure a gas exerts.</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Reasoning-based papers love testing the ice exception and asking you to explain WHY compressibility differs between states, rather than just asking you to state which state is compressible. Always be ready to explain the reasoning, not just recall the label.
              </RememberBox>

              <SectionHeading>Solved Reasoning Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="Explain why ice floats on liquid water, using the idea of interparticle spacing." answer="Ice is an exception where the solid's particles are arranged slightly farther apart than in the liquid state, making ice less dense than water -- and a less dense substance floats on a denser one." />
              <ExampleQ number={2} isLightMode={isLightMode} question="A student says, 'Gases are compressible simply because that is their defined property.' Provide a stronger, reasoning-based explanation instead." answer="Gases are compressible because their particles have large amounts of unused interparticle space; applying pressure can push particles into this available space, reducing the overall volume -- compressibility is a direct consequence of how much space is left, not just an arbitrary label." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Two gases with particles of very different sizes are released into the same room at the same temperature. Which would you expect to diffuse faster, and why?" answer="The gas with smaller, lighter particles would generally be expected to diffuse faster, since lighter particles can be set into faster motion more easily for the same available energy." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Solid iodine is gently heated and turns directly into a vapour without ever appearing to melt into a liquid first. What is this process called?" answer="Sublimation -- the direct change from solid to vapour without passing through a liquid state." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain, in terms of particle behaviour, why a gas stored in a rigid container exerts pressure on the container's walls." answer="Gas particles are in constant, fast motion in every direction, and they repeatedly collide with the container's walls; these very frequent collisions are what create the outward pressure the gas exerts on the container." />
              <ExampleQ number={6} isLightMode={isLightMode} question="A sealed balloon is placed in hot water and is observed to expand slightly. Explain this observation using ideas from this chapter." answer="The heat from the hot water increases the motion (and hence effective spacing tendency) of the gas particles trapped inside the balloon, causing them to push outward on the balloon's walls with slightly more force, making the balloon expand." />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = MATTER_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(MATTER_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = MATTER_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < MATTER_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(MATTER_TOPICS[currentIndex + 1].id)}
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
                    onClick={() => setActiveTopic(MATTER_TOPICS[0].id)}
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

export default LearnScience8Matter;
