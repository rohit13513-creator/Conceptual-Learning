import React, { useState } from "react";
import {
  Compass,
  Award,
  HelpCircle,
  Eye,
  Lightbulb,
  FlaskConical,
  RefreshCw,
  FileText,
  Shield,
  Users,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ScienceTopicId =
  | "introduction"
  | "observation-inference"
  | "questions-hypothesis"
  | "fair-experiment"
  | "inquiry-cycle"
  | "recording-communicating"
  | "tools-safety"
  | "teamwork-chance"
  | "glossary-mindmap"
  | "competition-corner";

interface ScienceTopic {
  id: ScienceTopicId;
  title: string;
  category: string;
}

const SCIENCE_TOPICS: ScienceTopic[] = [
  { id: "introduction", title: "1. What Is Science? Curiosity & Inquiry", category: "Fundamentals" },
  { id: "observation-inference", title: "2. Observation vs Inference", category: "Fundamentals" },
  { id: "questions-hypothesis", title: "3. Questions, Hypotheses & Predictions", category: "Fundamentals" },
  { id: "fair-experiment", title: "4. Designing a Fair Experiment", category: "The Method" },
  { id: "inquiry-cycle", title: "5. The Cycle of Scientific Inquiry", category: "The Method" },
  { id: "recording-communicating", title: "6. Recording & Communicating Results", category: "The Method" },
  { id: "tools-safety", title: "7. Tools of Investigation & Staying Safe", category: "Practical Skills" },
  { id: "teamwork-chance", title: "8. Teamwork, Chance & Growth of Science", category: "Big Picture" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnScience8Props {
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

export function LearnScience8({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnScience8Props) {
  const [activeTopic, setActiveTopic] = useState<ScienceTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const textMain = isLightMode ? "#0f172a" : "#f1f5f9";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-science8-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Exploring Science</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Exploring Science</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              What science really is, how curiosity turns into knowledge, and the step-by-step way every real discovery gets made -- explained simply.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {SCIENCE_TOPICS.map((topic) => (
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-science8-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-science8-main p, #learn-science8-main li, #learn-science8-main span, #learn-science8-main label, #learn-science8-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-science8-main b, #learn-science8-main strong, #learn-science8-main h1, #learn-science8-main h2, #learn-science8-main h3, #learn-science8-main h4, #learn-science8-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-science8-container .bg-slate-900, #learn-science8-container .bg-\\[\\#0d1424\\], #learn-science8-container .bg-\\[\\#0a1622\\], #learn-science8-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-science8-container .border-slate-800, #learn-science8-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Chapter: Exploring the Investigative World of Science</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">What Is Science? Curiosity & Inquiry</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Every scientific discovery, big or small, starts the exact same way -- with a question. This topic looks at how that question turns into real knowledge.</p>
              </div>

              <InfoCard title="Core Definition" icon={Compass} isLightMode={isLightMode}>
                <p><b>Science:</b> a systematic way of studying the natural world by observing it carefully, asking questions, testing ideas, and checking those ideas against evidence.</p>
                <p>Science is not a fixed pile of facts to memorise -- it is a PROCESS, a way of investigating and finding things out.</p>
              </InfoCard>

              <DiagramCard caption="Curiosity is the starting point of every scientific journey -- it drives us to observe, question, and eventually understand" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 140" className="w-full h-auto">
                  <circle cx="60" cy="70" r="40" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="60" y="65" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Curiosity</text>
                  <text x="60" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill={isLightMode ? "#475569" : "#94a3b8"}>("Why? How?")</text>
                  <line x1="102" y1="70" x2="148" y2="70" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow1)" />
                  <circle cx="190" cy="70" r="40" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="190" y="65" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Investigation</text>
                  <text x="190" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill={isLightMode ? "#475569" : "#94a3b8"}>(observe & test)</text>
                  <line x1="232" y1="70" x2="278" y2="70" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow1)" />
                  <circle cx="320" cy="70" r="40" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="320" y="65" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>Understanding</text>
                  <text x="320" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill={isLightMode ? "#475569" : "#94a3b8"}>(new knowledge)</text>
                  <defs>
                    <marker id="arrow1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Curiosity means wanting to know "why" or "how" something happens -- it is the natural starting point of all scientific work.</li>
                <li>Science relies on EVIDENCE, not guesswork or opinion -- an idea is only accepted once it is supported by careful observation or a fair test.</li>
                <li>Science is self-correcting: if new evidence contradicts an old idea, the old idea is changed or replaced -- this is a strength of science, not a weakness.</li>
                <li>Anyone who observes carefully, asks clear questions, and tests ideas fairly is doing real scientific work -- it is not limited to people in laboratories.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Science = Curiosity + Careful Observation + Fair Testing + Evidence</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A child notices that plants near a window grow taller than plants in a dark corner and wonders why. Is this the start of a scientific investigation? Give a reason." answer="Yes. Noticing a pattern and asking 'why' is exactly how scientific investigation begins -- the child is showing curiosity based on a real observation, which can then be tested." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Why is evidence so important in science?" answer="Because evidence lets an idea be checked by anyone, at any time -- without evidence, an idea is just a guess that cannot be confirmed or ruled out." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A scientific idea from 100 years ago was later proven wrong by new evidence and was changed. Does this mean science cannot be trusted?" answer="No -- this shows science working correctly. Being willing to change an idea when better evidence appears is exactly what makes science reliable over time, unlike a fixed belief that never changes regardless of evidence." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Is a person doing science only if they work in a laboratory?" answer="No -- anyone who observes carefully, asks a clear question, and tests their idea fairly is doing scientific work, whether that is in a lab, a kitchen, a farm, or a garden." />
              <ExampleQ number={5} isLightMode={isLightMode} question="What is the difference between an opinion and a scientific idea?" answer="An opinion is a personal preference that cannot be tested (like 'mangoes taste better than apples'), while a scientific idea makes a claim about the natural world that CAN be checked against evidence." />

              <RememberBox title="Science is a process, not a list of facts" isLightMode={isLightMode}>
                It is easy to think of science as just a set of facts to remember. In reality, the facts are the OUTPUT -- the real subject of this chapter is the PROCESS that produces them: curiosity, observation, questioning, testing, and evidence.
              </RememberBox>
            </div>
          )}

          {activeTopic === "observation-inference" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Observation vs Inference</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Two words that sound similar but mean very different things -- mixing them up is one of the most common mistakes in scientific reasoning.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Eye} isLightMode={isLightMode}>
                <p><b>Observation:</b> information gathered directly through the senses (seeing, hearing, smelling, touching, tasting) or with the help of an instrument. An observation states only what was actually noticed.</p>
                <p><b>Inference:</b> an explanation or conclusion drawn FROM an observation, using reasoning or existing knowledge. An inference goes beyond what was directly seen.</p>
              </InfoCard>

              <DiagramCard caption="An observation is what you directly notice; an inference is the explanation your mind builds on top of it" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 160" className="w-full h-auto">
                  <rect x="20" y="20" width="150" height="60" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="95" y="45" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">OBSERVATION</text>
                  <text x="95" y="65" textAnchor="middle" fontSize="10" fontWeight="700" fill={textMain}>"The ground is wet"</text>
                  <line x1="170" y1="50" x2="210" y2="50" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow2)" />
                  <rect x="210" y="20" width="150" height="60" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="285" y="45" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fbbf24">INFERENCE</text>
                  <text x="285" y="65" textAnchor="middle" fontSize="10" fontWeight="700" fill={textMain}>"It must have rained"</text>
                  <text x="190" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill={isLightMode ? "#475569" : "#94a3b8"}>(reasoning added on top of what was seen)</text>
                  <defs>
                    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>An observation is DIRECT -- it only reports what the senses (or an instrument) actually detected.</li>
                <li>An inference is INDIRECT -- it is a guess or explanation built using the observation plus prior knowledge or reasoning.</li>
                <li>The same observation can lead to more than one possible inference -- "the ground is wet" could mean it rained, or a pipe leaked, or someone washed the floor.</li>
                <li>A good investigator always separates the two clearly, and treats an inference as something that still needs to be checked, not as a fact.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Observation = what the senses detect. Inference = the explanation reasoning adds on top.</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="'The leaves of a plant have turned yellow.' Is this an observation or an inference?" answer="An observation -- it directly describes what was seen, with no explanation added." />
              <ExampleQ number={2} isLightMode={isLightMode} question="'The plant turned yellow because it did not get enough water.' Is this an observation or an inference?" answer="An inference -- it offers a possible reason (explanation) for the observation, based on reasoning, not something directly seen." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Give two different possible inferences for the single observation: 'The classroom floor is covered in muddy footprints.'" answer="Possible inference 1: students walked in after it rained outside. Possible inference 2: someone tracked in mud from a nearby garden. (Both are reasonable guesses from the same observation -- neither is certain until checked further.)" />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why is it risky to treat an inference as if it were a proven fact?" answer="Because an inference is only one possible explanation among several -- treating it as certain, without checking, can lead to a wrong conclusion even though the original observation was correct." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A student hears a loud bang and sees smoke coming from the kitchen, and says, 'A pressure cooker whistle must have gone off.' Identify the observation(s) and the inference." answer="Observations: a loud bang was heard; smoke is coming from the kitchen. Inference: a pressure cooker whistle went off (a reasonable explanation, but not yet confirmed)." />

              <RememberBox title="A quick test" isLightMode={isLightMode}>
                Ask: "Did I directly sense this, or did my mind add an explanation to it?" If it's exactly what was sensed, it's an observation. If reasoning was used to explain WHY or HOW, it's an inference.
              </RememberBox>
            </div>
          )}

          {activeTopic === "questions-hypothesis" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Questions, Hypotheses & Predictions</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Turning a curious observation into something that can actually be tested.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Lightbulb} isLightMode={isLightMode}>
                <p><b>Scientific question:</b> a question about the natural world that can be answered by observation or experiment (not by opinion alone).</p>
                <p><b>Hypothesis:</b> a possible, testable explanation for an observation, proposed BEFORE the experiment is carried out. A good hypothesis can be shown to be right or wrong by a fair test.</p>
                <p><b>Prediction:</b> a specific statement about what should happen IF the hypothesis is true, usually in an "if... then..." form.</p>
              </InfoCard>

              <DiagramCard caption="A question leads to a hypothesis, and the hypothesis leads to a testable prediction" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 130" className="w-full h-auto">
                  <rect x="10" y="15" width="110" height="55" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="65" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">QUESTION</text>
                  <text x="65" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>Why do seeds sprout faster in warm soil?</text>
                  <line x1="120" y1="42" x2="150" y2="42" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow3)" />
                  <rect x="150" y="15" width="110" height="55" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="205" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24">HYPOTHESIS</text>
                  <text x="205" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>Warmth speeds up sprouting</text>
                  <line x1="260" y1="42" x2="290" y2="42" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow3)" />
                  <rect x="290" y="15" width="80" height="55" rx="10" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="330" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a3e635">PREDICTION</text>
                  <text x="330" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>Warm-soil seeds sprout first</text>
                  <defs>
                    <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Not every question is scientific -- a question must be answerable through observation or experiment to count as a scientific question.</li>
                <li>A hypothesis is a proposed EXPLANATION, made before testing -- it is an educated guess based on existing knowledge, not a random guess.</li>
                <li>A hypothesis must be testable -- if there is no possible way to check whether it is true or false, it is not a useful scientific hypothesis.</li>
                <li>A prediction is more specific than a hypothesis -- it states exactly what result should be seen if the hypothesis is correct.</li>
                <li>If the test result does NOT match the prediction, the hypothesis is not supported and needs to be changed or rejected -- this is a normal, useful part of science, not a failure.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Question leads to Hypothesis. Hypothesis leads to a testable Prediction.</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Which of these is a scientific question: 'Which colour is the prettiest?' or 'Do plants grow taller with more sunlight?'" answer="'Do plants grow taller with more sunlight?' is scientific -- it can be tested by observation and measurement. 'Which colour is the prettiest?' is a matter of personal opinion and cannot be tested." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Write a hypothesis for the question: 'Why does ice melt faster in some places than others?'" answer="A possible hypothesis: 'Ice melts faster in places with a higher temperature.' (This proposes a testable explanation.)" />
              <ExampleQ number={3} isLightMode={isLightMode} question="Turn the hypothesis 'Warmer water dissolves sugar faster' into a testable prediction." answer="'If warmer water dissolves sugar faster, then sugar placed in hot water should fully dissolve in less time than the same amount of sugar placed in cold water.'" />
              <ExampleQ number={4} isLightMode={isLightMode} question="A student's test result does not match their prediction. What should the student do?" answer="Reconsider or reject the hypothesis, and possibly form a new one -- an unmatched prediction is useful information, not a mistake to hide." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why must a hypothesis be testable to be useful in science?" answer="Because science relies on evidence -- if there is no way to test a hypothesis, there is no way to gather evidence for or against it, so it cannot be confirmed or ruled out." />

              <RememberBox title="A hypothesis is not a wild guess" isLightMode={isLightMode}>
                A hypothesis is built on some existing knowledge or reasoning -- it is an INFORMED, testable explanation, not a random shot in the dark.
              </RememberBox>
            </div>
          )}

          {activeTopic === "fair-experiment" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Designing a Fair Experiment</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>An experiment only gives a trustworthy result if it is designed fairly -- this topic explains exactly what that means.</p>
              </div>

              <InfoCard title="Core Definitions" icon={FlaskConical} isLightMode={isLightMode}>
                <p><b>Variable:</b> any factor in an experiment that can change or be changed.</p>
                <p><b>Independent variable:</b> the one factor that the investigator deliberately changes.</p>
                <p><b>Dependent variable:</b> the factor that is measured, to see whether it was affected by the independent variable.</p>
                <p><b>Controlled variables:</b> all the other factors that must be kept exactly the same, so they cannot affect the result.</p>
                <p><b>Fair test:</b> an experiment in which only the independent variable is changed, while every controlled variable is kept the same -- this way, any change in the dependent variable can be confidently linked to the independent variable.</p>
              </InfoCard>

              <DiagramCard caption="In a fair test, only ONE variable changes on purpose (independent); everything else is held constant (controlled), so the outcome (dependent) can be trusted" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 170" className="w-full h-auto">
                  <rect x="15" y="15" width="150" height="45" rx="8" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="90" y="35" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">INDEPENDENT VARIABLE</text>
                  <text x="90" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>(changed on purpose)</text>
                  <line x1="90" y1="60" x2="90" y2="90" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow4)" />
                  <rect x="15" y="90" width="150" height="45" rx="8" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="90" y="110" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a3e635">DEPENDENT VARIABLE</text>
                  <text x="90" y="125" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>(measured as the result)</text>
                  <rect x="210" y="15" width="150" height="120" rx="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="5 4" />
                  <text x="285" y="40" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24">CONTROLLED VARIABLES</text>
                  <text x="285" y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>same amount of soil</text>
                  <text x="285" y="80" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>same pot size</text>
                  <text x="285" y="100" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>same seed type</text>
                  <text x="285" y="120" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>(kept identical)</text>
                  <defs>
                    <marker id="arrow4" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
                      <path d="M0,0 L8,0 L4,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>A fair test changes only ONE variable at a time (the independent variable) -- changing more than one makes it impossible to know which one caused the result.</li>
                <li>Every controlled variable must be kept identical across all trials being compared.</li>
                <li>A control group (or control setup) receives no special treatment, and is used for comparison against the group that does.</li>
                <li>Repeating an experiment (or testing many samples) makes the result more reliable, since it reduces the chance that the result was just a coincidence.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Fair test: change ONLY the independent variable, keep everything else (controlled variables) exactly the same.</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A student wants to find out if the amount of sunlight affects how tall a plant grows. Identify the independent and dependent variables." answer="Independent variable: amount of sunlight (this is what is deliberately changed). Dependent variable: height of the plant (this is what is measured as the outcome)." />
              <ExampleQ number={2} isLightMode={isLightMode} question="For the sunlight experiment above, name two variables that should be controlled (kept the same)." answer="Any two of: the amount of water given, the type of soil used, the type of plant/seed used, the size of the pot, the temperature of the room." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A student changes both the amount of water AND the amount of sunlight given to different plants, then compares their growth. Is this a fair test? Give a reason." answer="No -- since two variables were changed at once, if the plants grow differently, it is impossible to tell whether sunlight, water, or both caused the difference." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why does testing many plants (instead of just one) make an experiment's conclusion more reliable?" answer="Because a single plant's growth could be affected by chance factors (like a weak seed); testing many plants and looking at the overall pattern reduces the effect of any one unusual case." />
              <ExampleQ number={5} isLightMode={isLightMode} question="What is the purpose of a control group in an experiment?" answer="It provides a baseline for comparison -- by seeing what happens WITHOUT the special treatment, the investigator can tell whether the treatment actually caused a difference." />

              <RememberBox title="One change at a time" isLightMode={isLightMode}>
                If an experiment does not clearly show ONE thing being changed while everything else stays the same, its result cannot be trusted -- this single rule is the heart of a fair test.
              </RememberBox>
            </div>
          )}

          {activeTopic === "inquiry-cycle" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">The Cycle of Scientific Inquiry</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Putting every earlier idea together into one connected process -- and seeing why it is a CYCLE, not a straight line.</p>
              </div>

              <InfoCard title="Core Idea" icon={RefreshCw} isLightMode={isLightMode}>
                <p>Scientific inquiry is often shown as a series of steps, but real investigation rarely goes in one straight line. A result can raise a NEW question, sending the investigator back to an earlier step -- this is why it is better understood as a CYCLE.</p>
              </InfoCard>

              <DiagramCard caption="The cycle of scientific inquiry -- a result can lead straight back to a new question, starting the cycle again" isLightMode={isLightMode}>
                <svg viewBox="0 0 320 320" className="w-full h-auto">
                  <circle cx="160" cy="160" r="120" fill="none" stroke={strokeMain} strokeWidth="1.5" strokeDasharray="3 4" />
                  {[
                    { angle: -90, label: "Observation", color: "#22d3ee" },
                    { angle: -30, label: "Question", color: "#fbbf24" },
                    { angle: 30, label: "Hypothesis", color: "#a3e635" },
                    { angle: 90, label: "Experiment", color: "#f87171" },
                    { angle: 150, label: "Analysis", color: "#a78bfa" },
                    { angle: 210, label: "Conclusion", color: "#38bdf8" },
                  ].map((step, i) => {
                    const rad = (step.angle * Math.PI) / 180;
                    const x = 160 + 120 * Math.cos(rad);
                    const y = 160 + 120 * Math.sin(rad);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="30" fill="none" stroke={step.color} strokeWidth="2.5" />
                        <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>{step.label}</text>
                      </g>
                    );
                  })}
                  <text x="160" y="164" textAnchor="middle" fontSize="12" fontWeight="800" fill={isLightMode ? "#475569" : "#94a3b8"}>The Cycle</text>
                  <text x="160" y="180" textAnchor="middle" fontSize="9" fontWeight="700" fill={isLightMode ? "#475569" : "#94a3b8"}>repeats & refines</text>
                </svg>
              </DiagramCard>

              <SectionHeading>The Six Stages, Step by Step</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="1. Observation" isLightMode={isLightMode}>Noticing something interesting or unexplained in the natural world.</FactRow>
                <FactRow label="2. Question" isLightMode={isLightMode}>Turning the observation into a clear, testable question.</FactRow>
                <FactRow label="3. Hypothesis" isLightMode={isLightMode}>Proposing a possible, testable explanation.</FactRow>
                <FactRow label="4. Experiment" isLightMode={isLightMode}>Designing and carrying out a fair test of the hypothesis.</FactRow>
                <FactRow label="5. Analysis" isLightMode={isLightMode}>Studying the results carefully to see what they actually show.</FactRow>
                <FactRow label="6. Conclusion" isLightMode={isLightMode}>Deciding whether the evidence supports or does not support the hypothesis, and sharing the finding.</FactRow>
              </div>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>The stages are usually taught in this order, but real scientific work often loops back -- a surprising result can create a brand new question.</li>
                <li>A conclusion is never the "final word forever" -- it stays open to being revised if new evidence appears later.</li>
                <li>Skipping a stage (for example, testing without first forming a clear question) usually leads to a confusing or unreliable investigation.</li>
              </ul>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Arrange in the correct order: Experiment, Question, Conclusion, Hypothesis, Observation, Analysis." answer="Observation, Question, Hypothesis, Experiment, Analysis, Conclusion." />
              <ExampleQ number={2} isLightMode={isLightMode} question="A student's conclusion raises a brand new question they had not thought of before. What does this show about the cycle of inquiry?" answer="It shows why inquiry is described as a CYCLE rather than a straight line -- a conclusion can lead directly back into a fresh round of observation and questioning." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why is 'Analysis' listed as a separate stage from 'Experiment'?" answer="Because carrying out an experiment (collecting data) and making sense of that data (analysis) are two different tasks -- data alone does not automatically reveal what it means, it must be examined carefully first." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Should a conclusion ever be treated as absolutely final and unchangeable? Explain." answer="No -- a conclusion is the best explanation based on CURRENT evidence. If new evidence appears later, the conclusion can and should be updated." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A student skips forming a hypothesis and jumps straight from a question to an experiment. What problem could this cause?" answer="Without a hypothesis, the student has no clear prediction to test against, making it hard to judge whether the experiment's result actually supports or contradicts any specific explanation." />

              <RememberBox title="Not a strict ladder" isLightMode={isLightMode}>
                Think of the six stages as a circle you can enter or re-enter at almost any point, not a straight ladder you climb only once.
              </RememberBox>
            </div>
          )}

          {activeTopic === "recording-communicating" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Recording & Communicating Results</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A brilliant experiment is only useful if its results are recorded honestly and shared clearly.</p>
              </div>

              <InfoCard title="Core Ideas" icon={FileText} isLightMode={isLightMode}>
                <p><b>Recording:</b> writing down observations and measurements accurately, at the time they are made -- not relying on memory afterwards.</p>
                <p><b>Communicating:</b> sharing findings clearly with others, usually including the method used, so that anyone else can understand -- and repeat -- the investigation.</p>
              </InfoCard>

              <SectionHeading>Why Careful Recording Matters</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Accuracy" isLightMode={isLightMode}>Writing results down immediately avoids errors caused by forgetting or misremembering details later.</FactRow>
                <FactRow label="Honesty" isLightMode={isLightMode}>All results must be recorded exactly as observed -- including unexpected or "inconvenient" ones -- never adjusted to match what was expected.</FactRow>
                <FactRow label="Organisation" isLightMode={isLightMode}>Tables, labelled diagrams, and clear units (like cm, °C, or seconds) make results far easier to understand and compare.</FactRow>
              </div>

              <SectionHeading>Why Communicating Findings Matters</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Verification" isLightMode={isLightMode}>Sharing the exact method used allows other people to repeat the investigation and check whether they get the same result.</FactRow>
                <FactRow label="Building on others' work" isLightMode={isLightMode}>Clearly shared findings let other investigators use them as a starting point for their own new questions, instead of starting from zero.</FactRow>
                <FactRow label="Catching mistakes" isLightMode={isLightMode}>When findings are shared openly, other people can spot errors or alternative explanations that the original investigator may have missed.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>An investigation is not finished until its results are recorded honestly and shared clearly.</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why should measurements be written down immediately during an experiment, rather than from memory afterwards?" answer="Because memory can be inaccurate or incomplete, especially after some time has passed -- recording at the moment of observation keeps the data accurate and trustworthy." />
              <ExampleQ number={2} isLightMode={isLightMode} question="A student gets a result that does not match what they expected, so they consider leaving it out of their report. Is this acceptable? Explain." answer="No -- all genuine results must be reported honestly, including unexpected ones. Leaving out inconvenient data would make the investigation dishonest and could hide something scientifically important." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why is it useful for an investigator to describe their exact method when sharing results?" answer="So that other people can repeat the same investigation under the same conditions and check whether they get a similar result -- this is how findings get verified." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Give one advantage of recording data in a table rather than as a long paragraph of text." answer="A table organises data clearly by category and makes it much easier to compare values and spot patterns at a glance." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Two different investigators test the same hypothesis and get different results. How does open communication of methods help resolve this?" answer="By comparing their exact methods, they may spot a difference (like a controlled variable that was not actually kept the same) that explains why their results differed." />

              <RememberBox title="Report the data you got, not the data you expected" isLightMode={isLightMode}>
                Genuine, unexpected results are often exactly where new discoveries come from -- changing or hiding data to match an expectation is one of the most serious mistakes an investigator can make.
              </RememberBox>
            </div>
          )}

          {activeTopic === "tools-safety" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Tools of Investigation & Staying Safe</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The right tool makes an observation sharper -- and the right precautions keep every investigation safe.</p>
              </div>

              <InfoCard title="Common Tools of Investigation" icon={Shield} isLightMode={isLightMode}>
                <p>Simple tools extend what our senses alone can detect, making observations more precise and more reliable.</p>
              </InfoCard>

              <SectionHeading>Everyday Tools & What They Are For</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Hand lens (magnifying glass)" isLightMode={isLightMode}>Makes small details larger and easier to observe closely.</FactRow>
                <FactRow label="Thermometer" isLightMode={isLightMode}>Measures temperature precisely, instead of relying on a vague sense of "hot" or "cold".</FactRow>
                <FactRow label="Measuring scale / ruler" isLightMode={isLightMode}>Measures length or height precisely, in standard units like centimetres.</FactRow>
                <FactRow label="Weighing balance" isLightMode={isLightMode}>Measures mass precisely, in standard units like grams.</FactRow>
                <FactRow label="Stopwatch" isLightMode={isLightMode}>Measures time precisely, useful for timing how long a change takes to happen.</FactRow>
                <FactRow label="Measuring cylinder" isLightMode={isLightMode}>Measures the volume of a liquid precisely, in standard units like millilitres.</FactRow>
              </div>

              <SectionHeading>Why Instruments Are Better Than Senses Alone</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Instruments give a NUMBER in a standard unit, which can be compared exactly with other measurements -- "quite warm" cannot be compared precisely, but "38°C" can.</li>
                <li>Our senses can be fooled or can vary from person to person (what feels "warm" to one person may feel "mild" to another) -- instruments remove this variation.</li>
                <li>Some things (like very small objects, or very precise amounts) simply cannot be measured accurately by the senses alone at all.</li>
              </ul>

              <SectionHeading>Basic Safety Rules During an Investigation</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Rule 1" isLightMode={isLightMode}>Always follow the teacher's or the activity's instructions exactly -- never experiment with materials or steps that have not been approved.</FactRow>
                <FactRow label="Rule 2" isLightMode={isLightMode}>Never taste, smell directly, or touch an unknown substance -- observe it visually and through approved methods only.</FactRow>
                <FactRow label="Rule 3" isLightMode={isLightMode}>Handle glass equipment, sharp tools, and hot objects carefully, and report any breakage or spill immediately.</FactRow>
                <FactRow label="Rule 4" isLightMode={isLightMode}>Keep the work area tidy and free of unnecessary items, so that accidents are less likely.</FactRow>
                <FactRow label="Rule 5" isLightMode={isLightMode}>Wash hands after handling any investigation materials, especially before eating or drinking.</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Which tool would best help measure exactly how long it takes an ice cube to melt: a ruler or a stopwatch?" answer="A stopwatch -- it measures time, which is exactly what is needed here; a ruler measures length, which is not relevant to melting time." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Why is 'the water felt quite hot' a weaker observation than 'the water was 62°C'?" answer="'Quite hot' is a vague, personal impression that can differ between people, while '62°C' is an exact, standard measurement that means the same thing to everyone who reads it." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A student is unsure what an unfamiliar liquid in a beaker is, and considers smelling it directly to find out. Is this safe? What should they do instead?" answer="No, this is not safe -- unknown substances should never be smelled or tasted directly. They should ask a teacher and only use approved, safe methods of identification." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why should a work area be kept tidy during an investigation?" answer="A cluttered area increases the risk of knocking something over, tripping, or mixing up materials by mistake -- tidiness reduces the chance of accidents." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A glass beaker breaks during an activity. What is the correct first step?" answer="Report it to the teacher (or supervising adult) immediately, rather than trying to clean up broken glass alone -- this keeps everyone safe from cuts." />

              <RememberBox title="Precision needs the right tool" isLightMode={isLightMode}>
                Every measuring tool is designed for ONE kind of quantity (length, mass, time, temperature, or volume) -- always match the tool to the exact thing being measured.
              </RememberBox>
            </div>
          )}

          {activeTopic === "teamwork-chance" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Teamwork, Chance & the Growth of Science</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Real discoveries are rarely made by one person working entirely alone -- and sometimes, luck plays a genuine part too.</p>
              </div>

              <InfoCard title="Core Ideas" icon={Users} isLightMode={isLightMode}>
                <p><b>Collaboration:</b> scientific investigations are usually carried out by teams, and often build on the recorded work of many earlier investigators, sometimes from different places and different times.</p>
                <p><b>Chance discovery (serendipity):</b> sometimes an investigator notices something useful completely by accident while looking for something else entirely -- but only a prepared, observant mind actually recognises its importance.</p>
              </InfoCard>

              <DiagramCard caption="Knowledge grows like a chain -- each investigation builds on results recorded and shared by those before it" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 100" className="w-full h-auto">
                  {[0, 1, 2, 3].map(i => (
                    <g key={i}>
                      <circle cx={50 + i * 100} cy="50" r="30" fill="none" stroke={["#22d3ee", "#fbbf24", "#a3e635", "#f87171"][i]} strokeWidth="2.5" />
                      <text x={50 + i * 100} y="55" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Study {i + 1}</text>
                      {i < 3 && <line x1={80 + i * 100} y1="50" x2={120 + i * 100} y2="50" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrow5)" />}
                    </g>
                  ))}
                  <defs>
                    <marker id="arrow5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Why Teamwork Matters in Science</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Different team members often bring different skills, tools, or knowledge, making a fuller investigation possible than one person could manage alone.</li>
                <li>Sharing recorded work across teams (and across countries) means an investigator does not need to start every question completely from scratch.</li>
                <li>Other investigators checking and re-testing a finding (sometimes called verification) helps catch mistakes and builds confidence in a result.</li>
              </ul>

              <SectionHeading>Chance Discoveries in Science</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="What it means" isLightMode={isLightMode}>An unplanned, accidental observation sometimes leads to an important discovery -- but only when the observer is alert and curious enough to notice it.</FactRow>
                <FactRow label="Why it still counts as science" isLightMode={isLightMode}>Noticing the accident is only the start -- the discovery still has to be investigated, tested, and confirmed using the normal process of scientific inquiry before it is accepted.</FactRow>
                <FactRow label="Key idea" isLightMode={isLightMode}>"Chance favours the prepared mind" -- an accident is only useful to someone who already has the curiosity and knowledge to recognise it as significant.</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why is it useful for one investigator's recorded results to be available to other investigators later?" answer="Because later investigators can build on that recorded knowledge instead of repeating the same work from the very beginning, allowing scientific understanding to grow faster over time." />
              <ExampleQ number={2} isLightMode={isLightMode} question="An investigator notices something unusual completely by accident while working on an unrelated task. Does noticing this alone count as a finished scientific discovery? Explain." answer="No -- noticing something by chance is only the starting point. It still needs to be investigated, tested, and confirmed through proper scientific method before it becomes an accepted discovery." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Explain the phrase 'chance favours the prepared mind' in your own words." answer="It means that lucky accidents are only useful to someone who has enough knowledge and curiosity to notice them and understand why they might be important -- the same accident might go completely unnoticed by someone else." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Give one reason why modern scientific work is usually done in teams rather than by single individuals." answer="Modern investigations often need a combination of different skills, tools, and knowledge areas that a single person is unlikely to have all at once." />
              <ExampleQ number={5} isLightMode={isLightMode} question="How does another team repeating an investigation and getting the same result help science?" answer="It builds confidence that the original result was correct and not just a coincidence or an error, which is an important part of how findings become trusted and accepted." />

              <RememberBox title="Science is cumulative" isLightMode={isLightMode}>
                Almost no discovery starts from zero -- it builds on the recorded, shared work of many investigators before it. This is exactly why careful recording and honest communication (from the earlier topic) matter so much.
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
                <FactRow label="Science" isLightMode={isLightMode}>a systematic way of studying the natural world through observation, questioning, and testing.</FactRow>
                <FactRow label="Observation" isLightMode={isLightMode}>information gathered directly through the senses or an instrument.</FactRow>
                <FactRow label="Inference" isLightMode={isLightMode}>an explanation drawn from an observation, using reasoning.</FactRow>
                <FactRow label="Hypothesis" isLightMode={isLightMode}>a testable, proposed explanation made before an experiment.</FactRow>
                <FactRow label="Prediction" isLightMode={isLightMode}>a specific statement of what should happen if the hypothesis is true.</FactRow>
                <FactRow label="Independent variable" isLightMode={isLightMode}>the one factor deliberately changed in an experiment.</FactRow>
                <FactRow label="Dependent variable" isLightMode={isLightMode}>the factor measured as the outcome of an experiment.</FactRow>
                <FactRow label="Controlled variable" isLightMode={isLightMode}>a factor kept the same across an experiment, so it cannot affect the result.</FactRow>
                <FactRow label="Fair test" isLightMode={isLightMode}>an experiment where only the independent variable changes.</FactRow>
                <FactRow label="Serendipity" isLightMode={isLightMode}>a valuable discovery made by chance, recognised by a prepared, curious mind.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={Compass} title="What Is Science" color="cyan" isLightMode={isLightMode} points={[
                  "A process, not just a list of facts",
                  "Built on curiosity and evidence",
                  "Self-correcting when new evidence appears",
                ]} />
                <MindMapBranch icon={Eye} title="Observation vs Inference" color="amber" isLightMode={isLightMode} points={[
                  "Observation: directly sensed",
                  "Inference: reasoning added on top",
                  "One observation can have many inferences",
                ]} />
                <MindMapBranch icon={Lightbulb} title="Question to Prediction" color="sky" isLightMode={isLightMode} points={[
                  "Scientific question must be testable",
                  "Hypothesis: proposed explanation",
                  "Prediction: specific expected result",
                ]} />
                <MindMapBranch icon={FlaskConical} title="Fair Testing" color="rose" isLightMode={isLightMode} points={[
                  "Change only the independent variable",
                  "Keep controlled variables identical",
                  "Repeat trials for reliability",
                ]} />
                <MindMapBranch icon={RefreshCw} title="The Inquiry Cycle" color="indigo" isLightMode={isLightMode} points={[
                  "Observation to Question to Hypothesis",
                  "Experiment to Analysis to Conclusion",
                  "A cycle, not a straight line",
                ]} />
                <MindMapBranch icon={Users} title="Recording & Teamwork" color="emerald" isLightMode={isLightMode} points={[
                  "Record honestly, right away",
                  "Communicate methods clearly",
                  "Science builds on shared, past work",
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

              <InfoCard title="Correlation Is Not Causation" icon={GitBranch} isLightMode={isLightMode}>
                <p>Two things can change together (be "correlated") without one actually causing the other. For example, ice cream sales and drowning incidents both rise in summer -- but ice cream does not cause drowning. Both are caused by a third factor: hot weather leading to more swimming AND more ice cream buying.</p>
                <p>A careful investigator always asks whether a suspected cause has actually been tested with a fair experiment, rather than assuming causation just because two things happened together.</p>
              </InfoCard>

              <InfoCard title="Reproducibility" icon={RefreshCw} isLightMode={isLightMode}>
                <p>A result is called reproducible if other investigators, repeating the same method, get a similar result. Findings that cannot be reproduced by anyone else are treated with caution, since the original result may have been due to an error or an unusual coincidence.</p>
              </InfoCard>

              <InfoCard title="Bias in Observation" icon={Eye} isLightMode={isLightMode}>
                <p>Sometimes an investigator unconsciously notices results that match what they expected, while overlooking results that do not -- this is called observer bias. Recording ALL results honestly, including unexpected ones, and having other people check the data, helps guard against this.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Sample size" isLightMode={isLightMode}>testing more samples (more plants, more trials) generally gives a more reliable result than testing just one or two.</FactRow>
                <FactRow label="Anecdote vs evidence" isLightMode={isLightMode}>a single interesting story ("my friend tried this and it worked!") is not the same as evidence from a properly controlled, repeated test.</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Reasoning-based papers love describing an experiment with a hidden flaw (an uncontrolled variable, a missing control group, or a single untested anecdote) and asking you to spot exactly what went wrong. Always check: was only ONE variable changed, and was the result properly tested and repeated?
              </RememberBox>

              <SectionHeading>Solved Reasoning Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="A news report says, 'Towns with more bookstores have higher literacy rates, so opening bookstores increases literacy.' What is the flaw in this reasoning?" answer="This confuses correlation with causation -- both bookstores and literacy rates could be caused by a third factor, such as the town's overall investment in education, rather than bookstores directly causing higher literacy." />
              <ExampleQ number={2} isLightMode={isLightMode} question="A student tests a new fertiliser on just ONE plant and concludes it definitely works. What is the main weakness in this investigation?" answer="The sample size is too small -- a single plant's growth could be due to chance factors unrelated to the fertiliser, so no reliable conclusion can be drawn from just one case." />
              <ExampleQ number={3} isLightMode={isLightMode} question="An investigator only reports the trials where their hypothesis seemed correct, and quietly ignores the trials where it did not. What is this called, and why is it a problem?" answer="This is a form of observer bias (selective reporting). It is a problem because it gives a false, one-sided picture of the evidence, hiding results that might disprove the hypothesis." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why do scientific papers usually get checked by other experts before being widely accepted?" answer="This checking process (sometimes called peer review) helps catch errors, unfair test designs, or unsupported conclusions before a finding is trusted and shared widely." />
              <ExampleQ number={5} isLightMode={isLightMode} question="A claim cannot be repeated successfully by any other investigator, no matter how many times they try. What should be concluded about the claim?" answer="The claim should be treated with strong doubt -- since a genuine scientific result should be reproducible, repeated failure to reproduce it suggests the original result may have been an error or a coincidence." />
              <ExampleQ number={6} isLightMode={isLightMode} question="Two students test whether music affects plant growth. Student A plays music to 10 plants and compares them to 10 plants with no music, keeping water and sunlight identical. Student B plays music to just 1 plant and compares it to a plant a friend is growing at home under unknown conditions. Whose test is more trustworthy, and why?" answer="Student A's test is far more trustworthy -- it uses a reasonable sample size (10 plants per group) and keeps other variables controlled. Student B's test has too small a sample and does not control other conditions, making the comparison unreliable." />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = SCIENCE_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(SCIENCE_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = SCIENCE_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < SCIENCE_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(SCIENCE_TOPICS[currentIndex + 1].id)}
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
                    onClick={() => setActiveTopic(SCIENCE_TOPICS[0].id)}
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

export default LearnScience8;
