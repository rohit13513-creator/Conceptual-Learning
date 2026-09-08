import React, { useState } from "react";
import {
  HeartPulse,
  Award,
  HelpCircle,
  Apple,
  AlertCircle,
  Bug,
  ShieldCheck,
  Syringe,
  Activity,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type HealthTopicId =
  | "introduction"
  | "factors"
  | "disease-types"
  | "communicable-spread"
  | "prevention-control"
  | "immunity"
  | "non-communicable-deficiency"
  | "mental-health-habits"
  | "glossary-mindmap"
  | "competition-corner";

interface HealthTopic {
  id: HealthTopicId;
  title: string;
  category: string;
}

const HEALTH_TOPICS: HealthTopic[] = [
  { id: "introduction", title: "1. What Is Health?", category: "Fundamentals" },
  { id: "factors", title: "2. Factors That Keep Us Healthy", category: "Fundamentals" },
  { id: "disease-types", title: "3. Understanding Disease: Two Broad Types", category: "Disease" },
  { id: "communicable-spread", title: "4. Communicable Diseases: Causes & Spread", category: "Disease" },
  { id: "prevention-control", title: "5. Prevention & Control", category: "Disease" },
  { id: "immunity", title: "6. Our Body's Defence: Immunity", category: "Body's Defence" },
  { id: "non-communicable-deficiency", title: "7. Non-Communicable & Deficiency Diseases", category: "Disease" },
  { id: "mental-health-habits", title: "8. Mental Health & Healthy Habits", category: "Well-Being" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnScience8HealthProps {
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

export function LearnScience8Health({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnScience8HealthProps) {
  const [activeTopic, setActiveTopic] = useState<HealthTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const textMain = isLightMode ? "#0f172a" : "#f1f5f9";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-science8h-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Health</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Health: The Ultimate Treasure</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              What it really means to be healthy, why diseases happen, how our body defends itself, and simple habits that protect this treasure every single day.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {HEALTH_TOPICS.map((topic) => (
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-science8h-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-science8h-main p, #learn-science8h-main li, #learn-science8h-main span, #learn-science8h-main label, #learn-science8h-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-science8h-main b, #learn-science8h-main strong, #learn-science8h-main h1, #learn-science8h-main h2, #learn-science8h-main h3, #learn-science8h-main h4, #learn-science8h-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-science8h-container .bg-slate-900, #learn-science8h-container .bg-\\[\\#0d1424\\], #learn-science8h-container .bg-\\[\\#0a1622\\], #learn-science8h-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-science8h-container .border-slate-800, #learn-science8h-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Chapter: Health -- The Ultimate Treasure</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">What Is Health?</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Health is often thought of as simply "not being sick" -- but the real picture is much bigger than that.</p>
              </div>

              <InfoCard title="Core Definition" icon={HeartPulse} isLightMode={isLightMode}>
                <p><b>Health:</b> a state of complete physical, mental, and social well-being -- not merely the absence of disease.</p>
                <p>This means a person can be free of any illness and still not be considered fully healthy, if their mind is under constant stress or their social life is troubled.</p>
              </InfoCard>

              <DiagramCard caption="Health rests on three separate pillars -- physical, mental, and social well-being -- all three are needed together" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 190" className="w-full h-auto">
                  <rect x="20" y="20" width="105" height="60" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="72" y="45" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">PHYSICAL</text>
                  <text x="72" y="63" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>body works well</text>

                  <rect x="137" y="20" width="105" height="60" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="189" y="45" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fbbf24">MENTAL</text>
                  <text x="189" y="63" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>mind feels calm</text>

                  <rect x="254" y="20" width="105" height="60" rx="10" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="306" y="45" textAnchor="middle" fontSize="12" fontWeight="800" fill="#a3e635">SOCIAL</text>
                  <text x="306" y="63" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>good relationships</text>

                  <line x1="72" y1="80" x2="150" y2="128" stroke={strokeMain} strokeWidth="2" />
                  <line x1="189" y1="80" x2="189" y2="128" stroke={strokeMain} strokeWidth="2" />
                  <line x1="306" y1="80" x2="228" y2="128" stroke={strokeMain} strokeWidth="2" />

                  <rect x="115" y="128" width="150" height="48" rx="10" fill="none" stroke="#f87171" strokeWidth="2.5" />
                  <text x="190" y="156" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f87171">COMPLETE HEALTH</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Health has three parts: physical (the body working properly), mental (the mind feeling calm and stable), and social (having good relationships and support around us).</li>
                <li>A person free of illness but constantly stressed or lonely is not considered completely healthy under this definition.</li>
                <li>Personal health is about one individual, while community health looks at the overall health of a whole group of people living together.</li>
                <li>Good community health depends on shared conditions, such as a clean water supply and proper waste disposal, that no single individual can arrange alone.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Health = Physical + Mental + Social well-being (not just "no illness")</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A person has no physical illness but feels extremely stressed and isolated most days. Are they completely healthy according to the definition of health? Explain." answer="No -- health requires physical, mental, and social well-being together. Constant stress and isolation mean the mental and social parts are missing, even without physical illness." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Explain the difference between personal health and community health." answer="Personal health refers to the health of one individual, while community health refers to the overall health of a whole group of people, often depending on shared conditions like clean water and sanitation." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Why might one person alone find it difficult to fully protect their own health without support from the wider community?" answer="Many health risks, such as contaminated public water supplies or poor waste disposal, exist at a community level -- no single individual can fix these alone, so community-wide action is needed." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Give one example each of a physical, a mental, and a social factor that could affect a student's overall health." answer="Physical: getting enough sleep. Mental: managing exam stress calmly. Social: having supportive friends and family." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is it inaccurate to say a person is 'fully healthy' just because a doctor finds no physical illness?" answer="Because health also includes mental and social well-being -- a full medical check only examines the physical part, so it cannot alone confirm complete health." />

              <RememberBox title="Health is bigger than 'not sick'" isLightMode={isLightMode}>
                It is easy to assume health only means avoiding illness, but the accepted definition includes mental and social well-being too -- all three parts matter together.
              </RememberBox>
            </div>
          )}

          {activeTopic === "factors" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Factors That Keep Us Healthy</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Several everyday factors work together to keep a person, and a whole community, healthy.</p>
              </div>

              <InfoCard title="Core Idea" icon={Apple} isLightMode={isLightMode}>
                <p>Good health does not happen by chance -- it depends on a combination of personal habits and shared community conditions working together.</p>
              </InfoCard>

              <SectionHeading>Personal Factors</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Balanced diet" isLightMode={isLightMode}>Eating a variety of foods that provide the right nutrients supports the body's normal functioning and growth.</FactRow>
                <FactRow label="Personal hygiene" isLightMode={isLightMode}>Regular handwashing, bathing, and cleanliness reduce the chances of picking up or spreading infections.</FactRow>
                <FactRow label="Physical activity" isLightMode={isLightMode}>Regular exercise keeps the body fit and can also improve mood and reduce stress.</FactRow>
                <FactRow label="Adequate rest" isLightMode={isLightMode}>Enough sleep allows the body to recover and function well the next day.</FactRow>
              </div>

              <SectionHeading>Community-Level Factors</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Safe drinking water" isLightMode={isLightMode}>Access to clean water prevents many water-borne diseases from spreading in a community.</FactRow>
                <FactRow label="Proper sanitation" isLightMode={isLightMode}>Safe disposal of waste and sewage prevents contamination of water and living spaces.</FactRow>
                <FactRow label="Clean environment" isLightMode={isLightMode}>Clean air and surroundings reduce the risk of illness for everyone in the area.</FactRow>
                <FactRow label="Access to healthcare" isLightMode={isLightMode}>Availability of medical care and vaccination allows illnesses to be treated or prevented early.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Health depends on both personal habits AND shared community conditions</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name two personal habits that support good health." answer="Any two of: eating a balanced diet, maintaining personal hygiene, regular physical activity, getting adequate rest." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Name two community-level factors that support good health." answer="Any two of: safe drinking water, proper sanitation, a clean environment, access to healthcare." />
              <ExampleQ number={3} isLightMode={isLightMode} question="A student eats well and exercises regularly, but lives in an area with an unsafe water supply. Explain why they could still fall ill." answer="Personal habits alone cannot protect against risks that exist at the community level, such as contaminated water -- both personal and community factors need to be addressed together." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain why proper sanitation is considered a community-level factor rather than just a personal one." answer="Sanitation systems, such as sewage treatment and waste disposal, are usually shared infrastructure serving many people at once, not something one individual can arrange only for themselves." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is adequate rest considered important for health, beyond simply avoiding tiredness?" answer="Rest allows the body to recover and repair itself, supporting normal functioning -- without it, the body's overall ability to stay healthy can be affected over time." />

              <RememberBox title="Two levels working together" isLightMode={isLightMode}>
                Good health needs BOTH good personal habits and a healthy community environment -- one without the other leaves an important gap.
              </RememberBox>
            </div>
          )}

          {activeTopic === "disease-types" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Understanding Disease: Two Broad Types</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Not every disease behaves the same way -- some can spread between people, while others cannot.</p>
              </div>

              <InfoCard title="Core Definitions" icon={AlertCircle} isLightMode={isLightMode}>
                <p><b>Disease:</b> a condition in which the normal functioning of the body (or mind) is disturbed.</p>
                <p><b>Communicable disease:</b> a disease that can spread from an infected person (or animal) to a healthy one.</p>
                <p><b>Non-communicable disease:</b> a disease that does not spread from person to person, often developing due to lifestyle, genetics, or long-term conditions.</p>
              </InfoCard>

              <DiagramCard caption="Diseases fall into two broad categories, based on whether or not they can spread between people" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 150" className="w-full h-auto">
                  <rect x="150" y="10" width="80" height="40" rx="8" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <text x="190" y="35" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>DISEASE</text>

                  <line x1="170" y1="50" x2="100" y2="85" stroke={strokeMain} strokeWidth="2" />
                  <line x1="210" y1="50" x2="280" y2="85" stroke={strokeMain} strokeWidth="2" />

                  <rect x="20" y="85" width="160" height="55" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="100" y="108" textAnchor="middle" fontSize="12" fontWeight="800" fill="#22d3ee">COMMUNICABLE</text>
                  <text x="100" y="125" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>spreads person to person</text>

                  <rect x="200" y="85" width="160" height="55" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="280" y="108" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fbbf24">NON-COMMUNICABLE</text>
                  <text x="280" y="125" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>does not spread this way</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Communicable diseases are caused by pathogens (bacteria, viruses, fungi, protozoa) that can travel from one host to another.</li>
                <li>Non-communicable diseases are often linked to lifestyle factors (like diet or physical activity), genetics, or long-term wear on the body, and cannot be "caught" from another person.</li>
                <li>Examples of communicable diseases include the common cold, cholera, and tuberculosis.</li>
                <li>Examples of non-communicable diseases include diabetes, high blood pressure, and certain heart conditions.</li>
              </ul>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Classify the following as communicable or non-communicable: the common cold, diabetes." answer="The common cold is communicable (caused by a virus that can spread between people). Diabetes is non-communicable (it does not spread from person to person)." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Why can't a healthy person 'catch' diabetes from someone who already has it?" answer="Diabetes is a non-communicable disease, usually linked to lifestyle or genetic factors rather than a pathogen -- there is no infectious agent that can travel from one person to another." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Name the four broad types of pathogens that can cause communicable diseases." answer="Bacteria, viruses, fungi, and protozoa." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A person develops high blood pressure over many years due to a high-salt diet. Is this a communicable or non-communicable disease? Explain." answer="Non-communicable -- it developed due to a lifestyle factor (diet) over time, not through spread from an infected person." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is it important for doctors to know whether a disease is communicable or non-communicable?" answer="This affects how the disease should be managed -- communicable diseases require preventing spread to others, while non-communicable diseases usually require managing individual lifestyle or long-term treatment instead." />

              <RememberBox title="Spread is the key difference" isLightMode={isLightMode}>
                The single question that separates the two categories is: can this disease travel from an infected person to a healthy one? If yes, it's communicable; if no, it's non-communicable.
              </RememberBox>
            </div>
          )}

          {activeTopic === "communicable-spread" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Communicable Diseases: Causes & Spread</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Knowing exactly how a communicable disease travels between people is the key to stopping it.</p>
              </div>

              <InfoCard title="Core Idea" icon={Bug} isLightMode={isLightMode}>
                <p>Communicable diseases are caused by pathogens -- tiny disease-causing organisms. Each pathogen needs a specific pathway, called a mode of transmission, to travel from an infected host to a healthy one.</p>
              </InfoCard>

              <SectionHeading>Modes of Transmission</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Through air" isLightMode={isLightMode}>Droplets released while coughing or sneezing can carry pathogens to people nearby -- this spreads diseases like the common cold and tuberculosis.</FactRow>
                <FactRow label="Through water" isLightMode={isLightMode}>Drinking water contaminated with pathogens can spread diseases like cholera and typhoid.</FactRow>
                <FactRow label="Through direct contact" isLightMode={isLightMode}>Touching an infected person, or an object they have touched, can spread certain infections.</FactRow>
                <FactRow label="Through vectors" isLightMode={isLightMode}>A vector, such as a mosquito, carries a pathogen from one host to another -- for example, malaria spreads through mosquito bites.</FactRow>
              </div>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name the mode of transmission for the common cold." answer="Air -- through droplets released while coughing or sneezing." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Name the mode of transmission for cholera." answer="Water -- through drinking water contaminated with the pathogen." />
              <ExampleQ number={3} isLightMode={isLightMode} question="What is a vector? Give one example." answer="A vector is a carrier that transfers a pathogen between hosts; for example, the mosquito is a vector for malaria." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain why sharing a towel with an infected person could spread certain diseases." answer="This is an example of contact transmission -- pathogens present on the towel could transfer to a healthy person who then uses the same towel." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is understanding the exact mode of transmission important before deciding how to prevent a disease?" answer="Each mode of transmission needs a different, specific prevention approach -- for example, clean water prevents water-borne spread, but has no effect on a disease spread by mosquitoes." />

              <RememberBox title="One pathogen, one pathway" isLightMode={isLightMode}>
                A specific disease usually spreads mainly through one or two particular pathways -- knowing exactly which one lets you target prevention effectively, rather than guessing.
              </RememberBox>
            </div>
          )}

          {activeTopic === "prevention-control" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Prevention & Control</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Simple, targeted steps can block a disease's mode of transmission before it ever reaches a healthy person.</p>
              </div>

              <InfoCard title="Core Idea" icon={ShieldCheck} isLightMode={isLightMode}>
                <p>Preventing a communicable disease usually means blocking its specific mode of transmission, while controlling an outbreak means limiting how far it spreads once it has started.</p>
              </InfoCard>

              <SectionHeading>Prevention Measures & the Pathway They Target</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Personal hygiene" isLightMode={isLightMode}>Regular handwashing removes pathogens before they can be transferred, targeting contact and food-related spread.</FactRow>
                <FactRow label="Safe drinking water" isLightMode={isLightMode}>Boiling or properly treating water prevents water-borne diseases like cholera.</FactRow>
                <FactRow label="Covering coughs and sneezes" isLightMode={isLightMode}>Traps airborne droplets, reducing the spread of diseases like the common cold.</FactRow>
                <FactRow label="Vector control" isLightMode={isLightMode}>Removing stagnant water and using mosquito nets reduces vector-borne diseases like malaria.</FactRow>
                <FactRow label="Vaccination" isLightMode={isLightMode}>Trains the body's defences against a specific pathogen in advance, preventing illness even after exposure.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Prevention works best when it directly targets the disease's actual mode of transmission</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Which prevention measure would be most effective against a water-borne disease like typhoid?" answer="Ensuring safe, clean drinking water (such as by boiling or proper treatment), since typhoid spreads mainly through contaminated water." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Would covering your mouth while coughing help prevent malaria? Explain." answer="No -- malaria spreads through mosquito bites (a vector), not through the air, so covering coughs would not target its actual mode of transmission." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Explain how vaccination helps prevent a communicable disease without directly blocking its mode of transmission." answer="Instead of blocking the pathway the pathogen uses to travel, vaccination trains the body's own defences in advance, so that even if the pathogen does reach the person, the body can fight it off quickly." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Suggest two measures a community could take to reduce cases of a mosquito-borne disease." answer="Removing stagnant water (mosquito breeding sites) and encouraging the use of mosquito nets." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why might a single prevention measure not be enough to stop a disease outbreak completely?" answer="A disease may spread through more than one pathway, or through gaps a single measure cannot cover -- combining several targeted measures together is usually more effective than relying on just one." />

              <RememberBox title="Match the method to the pathway" isLightMode={isLightMode}>
                A prevention method that works brilliantly for one disease (like clean water for cholera) may do nothing at all for a disease spreading a different way (like malaria) -- always match the method to the actual mode of transmission.
              </RememberBox>
            </div>
          )}

          {activeTopic === "immunity" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Our Body's Defence: Immunity</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Our body has its own built-in defence system against pathogens, and this defence can also be deliberately strengthened.</p>
              </div>

              <InfoCard title="Core Definition" icon={Syringe} isLightMode={isLightMode}>
                <p><b>Immunity:</b> the body's ability to defend itself against pathogens and the diseases they cause.</p>
              </InfoCard>

              <SectionHeading>Two Types of Immunity</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Innate (natural) immunity" isLightMode={isLightMode}>The general defence a person is born with, such as skin acting as a barrier and certain cells that attack any pathogen entering the body.</FactRow>
                <FactRow label="Acquired immunity" isLightMode={isLightMode}>Defence that develops after the body encounters a specific pathogen (through infection or vaccination), allowing a faster, targeted response if that same pathogen appears again.</FactRow>
              </div>

              <DiagramCard caption="Vaccination trains acquired immunity in advance, so the body can respond quickly if the real pathogen ever appears" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 140" className="w-full h-auto">
                  <rect x="10" y="15" width="110" height="55" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="65" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">VACCINE</text>
                  <text x="65" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>weakened pathogen</text>

                  <line x1="120" y1="42" x2="150" y2="42" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowImm)" />

                  <rect x="150" y="15" width="110" height="55" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="205" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24">BODY TRAINS</text>
                  <text x="205" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>defences learn to fight it</text>

                  <line x1="260" y1="42" x2="290" y2="42" stroke={strokeMain} strokeWidth="2" markerEnd="url(#arrowImm)" />

                  <rect x="290" y="15" width="80" height="55" rx="10" fill="none" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="330" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a3e635">PROTECTED</text>
                  <text x="330" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>quick response later</text>

                  <defs>
                    <marker id="arrowImm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={strokeMain} />
                    </marker>
                  </defs>
                </svg>
              </DiagramCard>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Define immunity." answer="Immunity is the body's ability to defend itself against pathogens and the diseases they cause." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Distinguish between innate and acquired immunity." answer="Innate immunity is the general defence present from birth (like the skin barrier), while acquired immunity develops after the body encounters a specific pathogen, through infection or vaccination." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Explain how a vaccine builds acquired immunity without causing the actual disease." answer="A vaccine introduces a weakened or killed form of a pathogen, too weak to cause illness, but strong enough for the body's defences to learn to recognise and fight it, preparing it for the real pathogen later." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Why does the body usually respond faster the second time it meets the same pathogen?" answer="Because acquired immunity means the body has already learned to recognise that specific pathogen from the first encounter, allowing a much quicker and more effective response the next time." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Give one example of innate immunity that does not require any prior exposure to a pathogen." answer="The skin acting as a physical barrier that keeps many pathogens from entering the body in the first place." />

              <RememberBox title="Built-in versus trained" isLightMode={isLightMode}>
                Innate immunity is already there from birth, working generally against many pathogens; acquired immunity has to be built up over time against one specific pathogen, either naturally or through vaccination.
              </RememberBox>
            </div>
          )}

          {activeTopic === "non-communicable-deficiency" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Non-Communicable & Deficiency Diseases</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Not every disease comes from a pathogen -- some develop from lifestyle choices, and others from missing nutrients.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Activity} isLightMode={isLightMode}>
                <p><b>Non-communicable disease:</b> a disease that does not spread between people, often linked to lifestyle, genetics, or long-term wear on the body.</p>
                <p><b>Deficiency disease:</b> a disease caused by the long-term lack of a particular nutrient in the diet.</p>
              </InfoCard>

              <SectionHeading>Common Non-Communicable Diseases</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Diabetes" isLightMode={isLightMode}>A condition affecting how the body manages sugar levels, often linked to diet and lifestyle.</FactRow>
                <FactRow label="High blood pressure" isLightMode={isLightMode}>Often linked to a high-salt diet, lack of exercise, and long-term stress.</FactRow>
                <FactRow label="Obesity" isLightMode={isLightMode}>Excess body weight caused by an imbalance between food intake and physical activity over time.</FactRow>
              </div>

              <SectionHeading>Common Deficiency Diseases</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Anaemia" isLightMode={isLightMode}>Caused by a long-term lack of iron in the diet, affecting the blood's ability to carry oxygen.</FactRow>
                <FactRow label="Scurvy" isLightMode={isLightMode}>Caused by a long-term lack of vitamin C in the diet.</FactRow>
                <FactRow label="Rickets" isLightMode={isLightMode}>Caused by a long-term lack of vitamin D (or calcium), affecting bone development, especially in children.</FactRow>
                <FactRow label="Goitre" isLightMode={isLightMode}>Caused by a long-term lack of iodine in the diet, affecting a gland in the neck.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Deficiency diseases are prevented by eating a truly balanced diet, not by any medicine alone</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why can't a person 'catch' diabetes from someone else?" answer="Diabetes is a non-communicable disease, usually linked to lifestyle and genetic factors rather than a pathogen -- there is no infectious agent involved that could spread between people." />
              <ExampleQ number={2} isLightMode={isLightMode} question="What causes a deficiency disease?" answer="A long-term lack of a particular nutrient in a person's diet." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Name the nutrient deficiency responsible for goitre." answer="A long-term lack of iodine in the diet." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A child develops weak, poorly formed bones. Suggest a possible nutrient deficiency responsible, and name the disease." answer="A lack of vitamin D or calcium, leading to a condition called rickets." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain why eating a balanced diet is the main way to prevent deficiency diseases, rather than treating them after they occur." answer="Since deficiency diseases are directly caused by a long-term lack of a specific nutrient, ensuring the diet regularly includes that nutrient prevents the shortage from ever building up in the first place." />

              <RememberBox title="Different diseases, different origins" isLightMode={isLightMode}>
                A communicable disease needs a pathogen and a mode of transmission; a non-communicable disease often builds up from lifestyle over time; a deficiency disease comes specifically from a missing nutrient -- treating each one correctly starts with knowing which type it actually is.
              </RememberBox>
            </div>
          )}

          {activeTopic === "mental-health-habits" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Mental Health & Healthy Habits</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Since health includes the mind as well as the body, everyday habits matter for mental well-being too.</p>
              </div>

              <InfoCard title="Core Idea" icon={Brain} isLightMode={isLightMode}>
                <p>Mental health refers to a person's emotional and psychological well-being -- how they think, feel, and cope with the normal stresses of life.</p>
              </InfoCard>

              <SectionHeading>Supporting Mental Well-Being</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Managing stress" isLightMode={isLightMode}>Taking breaks, talking to someone trusted, and pacing workload can help manage everyday stress.</FactRow>
                <FactRow label="Positive relationships" isLightMode={isLightMode}>Supportive friends and family contribute to the social part of overall health.</FactRow>
                <FactRow label="Balanced routine" isLightMode={isLightMode}>A regular routine of activity, rest, and recreation supports both physical and mental well-being together.</FactRow>
              </div>

              <SectionHeading>Harmful Habits to Avoid</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Tobacco use" isLightMode={isLightMode}>Damages the body over time and is linked to serious long-term diseases.</FactRow>
                <FactRow label="Alcohol misuse" isLightMode={isLightMode}>Can affect both physical health and judgement, and can become difficult to control over time.</FactRow>
                <FactRow label="Drug misuse" isLightMode={isLightMode}>Can seriously harm both physical and mental health, and can be very difficult to stop once a dependency develops.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Mental well-being is a genuine, essential part of health -- not an optional extra</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why is mental health considered a genuine part of overall health, rather than something separate?" answer="Because the accepted definition of health explicitly includes mental well-being alongside physical and social well-being -- all three are considered equally essential parts of being healthy." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Suggest one healthy way a student could manage stress before an exam." answer="Any reasonable answer, such as: taking short breaks while studying, talking to a trusted friend or family member, or maintaining a balanced routine of study and rest." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Explain why habits like tobacco or drug misuse are considered harmful to overall health, not just physical health." answer="These habits can damage the body physically over time, but can also affect mental well-being and judgement, and can strain relationships -- harming more than one part of the overall definition of health." />
              <ExampleQ number={4} isLightMode={isLightMode} question="How do positive relationships contribute to a person's overall health?" answer="Positive relationships support the social part of health, providing support during difficult times and contributing to a person's overall sense of well-being." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain why a 'balanced routine' is described as supporting both physical and mental well-being at the same time." answer="A balanced routine typically includes physical activity (supporting physical health), adequate rest (supporting recovery), and time for recreation or relationships (supporting mental and social well-being) -- covering multiple parts of health together." />

              <RememberBox title="The mind matters just as much" isLightMode={isLightMode}>
                Since mental well-being is officially part of the definition of health, looking after it deserves the same attention as looking after the body.
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
                <FactRow label="Health" isLightMode={isLightMode}>a state of complete physical, mental, and social well-being, not merely the absence of disease.</FactRow>
                <FactRow label="Disease" isLightMode={isLightMode}>a condition in which the normal functioning of the body or mind is disturbed.</FactRow>
                <FactRow label="Communicable disease" isLightMode={isLightMode}>a disease that can spread from an infected host to a healthy one.</FactRow>
                <FactRow label="Non-communicable disease" isLightMode={isLightMode}>a disease that does not spread between people, often linked to lifestyle or genetics.</FactRow>
                <FactRow label="Vector" isLightMode={isLightMode}>a carrier that transfers a pathogen between hosts.</FactRow>
                <FactRow label="Immunity" isLightMode={isLightMode}>the body's ability to defend itself against pathogens and disease.</FactRow>
                <FactRow label="Innate immunity" isLightMode={isLightMode}>the general defence present from birth.</FactRow>
                <FactRow label="Acquired immunity" isLightMode={isLightMode}>defence developed after encountering a specific pathogen, through infection or vaccination.</FactRow>
                <FactRow label="Deficiency disease" isLightMode={isLightMode}>a disease caused by a long-term lack of a particular nutrient.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={HeartPulse} title="What Is Health" color="cyan" isLightMode={isLightMode} points={[
                  "Physical + mental + social well-being",
                  "Not merely the absence of disease",
                  "Personal health vs community health",
                ]} />
                <MindMapBranch icon={Apple} title="Keeping Healthy" color="amber" isLightMode={isLightMode} points={[
                  "Personal: diet, hygiene, exercise, rest",
                  "Community: water, sanitation, healthcare",
                  "Both levels are needed together",
                ]} />
                <MindMapBranch icon={Bug} title="Communicable Disease" color="rose" isLightMode={isLightMode} points={[
                  "Caused by pathogens",
                  "Spreads via air, water, contact, vectors",
                  "Prevention matches the mode of transmission",
                ]} />
                <MindMapBranch icon={Syringe} title="Immunity" color="sky" isLightMode={isLightMode} points={[
                  "Innate: present from birth",
                  "Acquired: built after exposure or vaccination",
                  "Vaccines train the body safely in advance",
                ]} />
                <MindMapBranch icon={Activity} title="Non-Communicable & Deficiency" color="indigo" isLightMode={isLightMode} points={[
                  "Lifestyle diseases: diabetes, high blood pressure",
                  "Deficiency diseases: anaemia, scurvy, rickets, goitre",
                  "Balanced diet prevents deficiency diseases",
                ]} />
                <MindMapBranch icon={Brain} title="Mental Health" color="emerald" isLightMode={isLightMode} points={[
                  "A genuine, essential part of health",
                  "Supported by routine and relationships",
                  "Harmed by tobacco, alcohol, and drug misuse",
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

              <InfoCard title="Risk Factors Are Not the Same as Causes" icon={Activity} isLightMode={isLightMode}>
                <p>A risk factor (like a high-salt diet) increases the CHANCE of developing a non-communicable disease, but does not guarantee it will happen, and its absence does not guarantee protection either. This is different from a pathogen directly causing a communicable disease.</p>
              </InfoCard>

              <InfoCard title="Herd Immunity Also Applies Here" icon={Syringe} isLightMode={isLightMode}>
                <p>When enough people in a community are immune to a communicable disease (through vaccination), the disease struggles to spread, indirectly protecting even those who are not immune. This links immunity at the individual level to health outcomes at the community level.</p>
              </InfoCard>

              <InfoCard title="Why Two Diseases with Similar Symptoms May Need Different Treatments" icon={AlertCircle} isLightMode={isLightMode}>
                <p>Some communicable and non-communicable diseases can share similar-looking symptoms (like fatigue), but since their underlying causes are completely different (a pathogen versus a long-term condition), the correct treatment approach is also completely different -- this is why identifying the actual cause matters more than just the symptoms.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Balanced diet vs deficiency disease" isLightMode={isLightMode}>a diet lacking even a single essential nutrient over a long period can still cause a deficiency disease, even if every other nutrient is present in the right amount.</FactRow>
                <FactRow label="Community health as a shared responsibility" isLightMode={isLightMode}>an individual's careful hygiene habits are far more effective at preventing disease spread when the whole community also follows similar practices.</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Reasoning-based papers love testing whether a claim confuses correlation, risk, and direct cause -- for example, assuming a risk factor guarantees a disease, or that all diseases with similar symptoms share the same cause. Always check what is actually causing the condition, not just what is associated with it.
              </RememberBox>

              <SectionHeading>Solved Reasoning Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="A person with a high-salt diet does not develop high blood pressure, while another person with a similar diet does. Does this mean a high-salt diet is not actually a risk factor? Explain." answer="No -- a risk factor increases the CHANCE of a disease, it does not guarantee it will occur. Other factors (like genetics or overall lifestyle) can also influence the outcome, so one person avoiding the disease does not disprove the risk factor's role." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Explain how widespread vaccination against a communicable disease can improve overall community health, beyond just protecting vaccinated individuals." answer="When enough people are vaccinated, herd immunity develops, reducing the disease's ability to spread through the community -- this indirectly protects even unvaccinated individuals, improving health outcomes for the community as a whole." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Two patients report feeling constantly tired. One has anaemia (a deficiency disease), and the other has a chronic viral infection (a communicable disease). Explain why they would need completely different treatments despite similar symptoms." answer="Since their underlying causes are different -- a nutrient deficiency versus an active pathogen -- the treatments must target the actual cause: correcting the diet or supplementing the missing nutrient for anaemia, versus treatment aimed at the specific virus for the infection." />
              <ExampleQ number={4} isLightMode={isLightMode} question="A community focuses only on treating disease cases after they occur, without investing in clean water or sanitation. Explain why this approach is likely to be less effective than prevention." answer="Without addressing the underlying community-level conditions (like contaminated water), new cases will likely keep occurring even as existing ones are treated -- prevention addresses the root cause, while treatment alone only manages individual cases after the fact." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain why a diet that provides enough of every nutrient except one (say, iodine) can still lead to a deficiency disease." answer="Each essential nutrient supports a specific function in the body; if even one is consistently missing over a long period, the specific problem linked to that nutrient (such as goitre from lack of iodine) can still develop, regardless of how well every other nutrient need is met." />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = HEALTH_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(HEALTH_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = HEALTH_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < HEALTH_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(HEALTH_TOPICS[currentIndex + 1].id)}
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
                    onClick={() => setActiveTopic(HEALTH_TOPICS[0].id)}
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

export default LearnScience8Health;
