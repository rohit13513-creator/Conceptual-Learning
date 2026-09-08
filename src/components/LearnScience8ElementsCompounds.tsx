import React, { useState } from "react";
import {
  FlaskConical,
  Award,
  HelpCircle,
  Wind,
  Layers,
  Sparkles,
  Atom,
  TestTube,
  Gem,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ECTopicId =
  | "introduction"
  | "air-mixture"
  | "types-of-mixtures"
  | "pure-substances"
  | "elements"
  | "compounds"
  | "iron-sulfur-activity"
  | "uses-and-minerals"
  | "glossary-mindmap"
  | "competition-corner";

interface ECTopic {
  id: ECTopicId;
  title: string;
  category: string;
}

const EC_TOPICS: ECTopic[] = [
  { id: "introduction", title: "1. What Are Mixtures?", category: "Fundamentals" },
  { id: "air-mixture", title: "2. Is Air a Mixture?", category: "Fundamentals" },
  { id: "types-of-mixtures", title: "3. Types of Mixtures", category: "Fundamentals" },
  { id: "pure-substances", title: "4. What Are Pure Substances?", category: "Pure Substances" },
  { id: "elements", title: "5. Elements", category: "Pure Substances" },
  { id: "compounds", title: "6. Compounds", category: "Pure Substances" },
  { id: "iron-sulfur-activity", title: "7. Mixture or Compound? An Experiment", category: "Pure Substances" },
  { id: "uses-and-minerals", title: "8. Everyday Uses & Minerals", category: "Big Picture" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
  { id: "competition-corner", title: "10. Competition Corner", category: "Beyond the Basics" },
];

interface LearnScience8ElementsCompoundsProps {
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

export function LearnScience8ElementsCompounds({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnScience8ElementsCompoundsProps) {
  const [activeTopic, setActiveTopic] = useState<ECTopicId>("introduction");
  const strokeMain = isLightMode ? "#334155" : "#cbd5e1";
  const textMain = isLightMode ? "#0f172a" : "#f1f5f9";

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-science8ec-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Elements, Compounds & Mixtures</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Elements, Compounds & Mixtures</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Almost nothing around you is a single, simple substance -- here is how to tell mixtures, elements, and compounds apart, and why the difference matters.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {EC_TOPICS.map((topic) => (
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
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-science8ec-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-science8ec-main p, #learn-science8ec-main li, #learn-science8ec-main span, #learn-science8ec-main label, #learn-science8ec-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-science8ec-main b, #learn-science8ec-main strong, #learn-science8ec-main h1, #learn-science8ec-main h2, #learn-science8ec-main h3, #learn-science8ec-main h4, #learn-science8ec-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-science8ec-container .bg-slate-900, #learn-science8ec-container .bg-\\[\\#0d1424\\], #learn-science8ec-container .bg-\\[\\#0a1622\\], #learn-science8ec-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-science8ec-container .border-slate-800, #learn-science8ec-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Chapter: Nature of Matter -- Elements, Compounds, and Mixtures</h4>
              </div>
            </div>
          </div>

          {activeTopic === "introduction" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">What Are Mixtures?</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Most things around you are not made of just one substance -- they are made of two or more substances mixed together.</p>
              </div>

              <InfoCard title="Core Definition" icon={Layers} isLightMode={isLightMode}>
                <p><b>Mixture:</b> formed when two or more substances are combined together in such a way that each substance keeps its own properties.</p>
                <p>The individual substances that make up a mixture are called its <b>components</b>. The components of a mixture do not react chemically with one another.</p>
              </InfoCard>

              <DiagramCard caption="In a non-uniform mixture, the separate components can still be seen; in a uniform mixture, they cannot be told apart, even with a microscope" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 150" className="w-full h-auto">
                  <rect x="20" y="20" width="150" height="100" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="55" cy="50" r="6" fill="#f87171" /><circle cx="90" cy="45" r="6" fill="#fbbf24" /><circle cx="125" cy="55" r="6" fill="#f87171" />
                  <circle cx="60" cy="85" r="6" fill="#fbbf24" /><circle cx="100" cy="90" r="6" fill="#f87171" /><circle cx="140" cy="80" r="6" fill="#fbbf24" />
                  <text x="95" y="135" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Non-uniform (sprout salad)</text>

                  <rect x="210" y="20" width="150" height="100" rx="10" fill="#a3e635" opacity="0.18" stroke="#a3e635" strokeWidth="2.5" />
                  <text x="285" y="75" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Sugar + water</text>
                  <text x="285" y="135" textAnchor="middle" fontSize="10" fontWeight="800" fill={textMain}>Uniform (evenly spread)</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Poha, sprout salad, soup, lemonade, and sugar dissolved in water are all everyday examples of mixtures.</li>
                <li>In a <b>non-uniform mixture</b>, the different components are generally visible with the naked eye or with a magnifying device (like the visible pieces in a sprout salad).</li>
                <li>In a <b>uniform mixture</b>, the components are evenly distributed and cannot be told apart, even with a microscope (like sugar fully dissolved in water).</li>
                <li>Stainless steel (iron, nickel, chromium, and a little carbon), brass (copper and zinc), and bronze (copper and tin) are all examples of uniform solid mixtures, called <b>alloys</b>.</li>
              </ul>

              <SectionHeading>A Historical Note</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Ancient Indian texts referred to a mixture of two or more metals, with properties different from the individual metals, as "Mishraloha". Bronze -- known as "Kamsya" -- made from four parts copper ("Tamra") and one part tin ("Vanga"), is mentioned in old texts as being used for health purposes.</p>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Mixture = two or more substances combined, each keeping its own properties</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Define a mixture." answer="A mixture is formed when two or more substances combine together, with each substance keeping its own properties, and without reacting chemically." />
              <ExampleQ number={2} isLightMode={isLightMode} question="What are the individual substances in a mixture called?" answer="Components." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Classify sprout salad and sugar dissolved in water as uniform or non-uniform mixtures." answer="Sprout salad is a non-uniform mixture, since its components can be seen separately. Sugar dissolved in water is a uniform mixture, since the sugar particles cannot be seen or told apart from the water." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Is stainless steel an element or a mixture? Explain." answer="A mixture -- specifically an alloy -- made of iron, nickel, chromium, and a small amount of carbon, mixed so uniformly that the individual substances cannot be seen." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why do the components of a mixture not lose their individual properties?" answer="Because the components of a mixture do not react chemically with each other -- they are simply combined physically, so each one keeps behaving as it normally would on its own." />

              <RememberBox title="Uniform does not mean 'not a mixture'" isLightMode={isLightMode}>
                A common mistake is assuming that if something looks completely smooth and even throughout, it cannot be a mixture. Uniform mixtures (like sugar syrup or air) are still genuine mixtures -- their components are just too evenly spread to see separately.
              </RememberBox>
            </div>
          )}

          {activeTopic === "air-mixture" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Is Air a Mixture?</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The air around us looks like nothing at all -- but it is actually a carefully balanced uniform mixture of several gases.</p>
              </div>

              <InfoCard title="Core Idea" icon={Wind} isLightMode={isLightMode}>
                <p>Air is a uniform mixture made mainly of nitrogen, oxygen, argon, carbon dioxide, and water vapour.</p>
              </InfoCard>

              <SectionHeading>What's In the Air</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Nitrogen" isLightMode={isLightMode}>makes up about 78% of air; it does not take part in combustion.</FactRow>
                <FactRow label="Oxygen" isLightMode={isLightMode}>needed by most living things to stay alive, and helps combustion happen.</FactRow>
                <FactRow label="Water vapour" isLightMode={isLightMode}>when warm, moist air touches a cool surface, this vapour condenses into tiny liquid droplets.</FactRow>
                <FactRow label="Carbon dioxide" isLightMode={isLightMode}>present in small amounts, and can be confirmed using lime water (calcium hydroxide solution), which turns milky in its presence.</FactRow>
                <FactRow label="Dust particles" isLightMode={isLightMode}>not part of the air itself -- these are suspended pollutants, and their amount can vary by time and place.</FactRow>
              </div>

              <SectionHeading>Confirming Carbon Dioxide in Air</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Calcium oxide added to water forms calcium hydroxide (lime water). When this clear lime water is left exposed to air, it slowly turns milky. This happens because carbon dioxide from the air reacts with calcium hydroxide to form calcium carbonate (tiny insoluble white particles) and water -- confirming that carbon dioxide is genuinely present in the air.</p>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Calcium hydroxide + Carbon dioxide -&gt; Calcium carbonate + Water (lime water turns milky)</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name the gas that makes up about 78% of air." answer="Nitrogen." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Which gas in the air is essential for combustion and for most living things to survive?" answer="Oxygen." />
              <ExampleQ number={3} isLightMode={isLightMode} question="How does lime water help confirm the presence of carbon dioxide in air?" answer="Lime water turns milky when exposed to air, because carbon dioxide reacts with the calcium hydroxide in it to form calcium carbonate -- this milky colour change confirms carbon dioxide is present." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Are dust particles considered a normal part of air? Explain." answer="No -- dust particles are suspended in the air but are not an integral part of it; they are considered pollutants, and their amount can vary." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why is air classified as a uniform mixture rather than a non-uniform one?" answer="Because its gas components (nitrogen, oxygen, and so on) are evenly mixed throughout and cannot be seen or told apart individually." />

              <RememberBox title="Water vapour is not the same as dust" isLightMode={isLightMode}>
                Water vapour is a genuine, expected part of air's composition, while dust particles are an unwanted, variable addition -- don't confuse the two when listing what air is made of.
              </RememberBox>
            </div>
          )}

          {activeTopic === "types-of-mixtures" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Types of Mixtures</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Mixtures can combine any of the three states of matter together -- here are the main combinations, with everyday examples.</p>
              </div>

              <InfoCard title="Core Idea" icon={Layers} isLightMode={isLightMode}>
                <p>In everyday language, "mixture" can include mixtures of mixtures (like poha). But in science, all the components of a mixture must themselves be pure substances.</p>
              </InfoCard>

              <SectionHeading>Mixture Types by Physical State</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Gas + Gas (uniform)" isLightMode={isLightMode}>Air (a mixture of nitrogen, oxygen, and other gases).</FactRow>
                <FactRow label="Gas + Liquid (uniform)" isLightMode={isLightMode}>Aerated (soda) water; oxygen dissolved in water.</FactRow>
                <FactRow label="Solid + Gas (non-uniform)" isLightMode={isLightMode}>Carbon (soot) particles suspended in air.</FactRow>
                <FactRow label="Liquid + Liquid" isLightMode={isLightMode}>Acetic acid in water (vinegar, uniform); oil and water (non-uniform, since they don't mix evenly).</FactRow>
                <FactRow label="Solid + Liquid" isLightMode={isLightMode}>Sand and water (non-uniform); seawater (uniform, since dissolved salts are evenly spread).</FactRow>
                <FactRow label="Solid + Solid" isLightMode={isLightMode}>Baking powder (baking soda and tartaric acid, non-uniform); alloys like stainless steel (uniform).</FactRow>
              </div>

              <SectionHeading>Why We Separate Mixtures</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>In everyday life, mixtures are separated to obtain a useful component, discarding the rest.</li>
                <li>In science, mixtures are separated with a different goal in mind: to obtain pure substances.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Any two states of matter can combine to form a mixture -- uniform or non-uniform</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Classify seawater by the states of matter combined, and state whether it is uniform or non-uniform." answer="Seawater is a solid (dissolved salts) and liquid (water) mixture, and it is uniform, since the dissolved salts are spread evenly and cannot be seen separately." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Classify oil and water, and state whether the mixture is uniform or non-uniform." answer="Oil and water form a liquid-liquid mixture, and it is non-uniform, since oil and water do not mix evenly and separate visibly into layers." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Give one example of a solid-gas mixture." answer="Carbon (soot) particles suspended in air." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain the difference between how mixtures are separated in everyday life versus in science." answer="In everyday life, separation is usually done to obtain one useful component while discarding the rest. In science, the goal of separating a mixture is specifically to obtain pure substances." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Why must all the components of a mixture, in the scientific sense, be pure substances?" answer="Because the scientific definition of a mixture requires its components to be pure substances -- everyday 'mixtures of mixtures', like poha, are described more loosely in common usage, but true scientific components must each be pure." />

              <RememberBox title="Combine any two states" isLightMode={isLightMode}>
                Don't assume mixtures only involve solids or only liquids -- gas-gas, gas-liquid, solid-gas, liquid-liquid, solid-liquid, and solid-solid combinations are all genuine, common types of mixtures.
              </RememberBox>
            </div>
          )}

          {activeTopic === "pure-substances" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">What Are Pure Substances?</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The word "pure" means something very different in a science classroom compared to what it means on a food label.</p>
              </div>

              <InfoCard title="Core Definition" icon={Sparkles} isLightMode={isLightMode}>
                <p>In everyday usage, "pure" simply means unadulterated -- free from cheaper or lower-quality substances added to increase quantity or cut costs.</p>
                <p><b>In science, a pure substance is one that has no other substance present in it at all.</b> A pure substance cannot be separated into other kinds of matter by any physical process, and it consists of only one type of particle.</p>
              </InfoCard>

              <DiagramCard caption="Matter can be divided into pure substances (elements and compounds) and mixtures (uniform and non-uniform)" isLightMode={isLightMode}>
                <svg viewBox="0 0 400 170" className="w-full h-auto">
                  <rect x="150" y="10" width="100" height="40" rx="8" fill="none" stroke={strokeMain} strokeWidth="2.5" />
                  <text x="200" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill={textMain}>MATTER</text>

                  <line x1="180" y1="50" x2="110" y2="80" stroke={strokeMain} strokeWidth="2" />
                  <line x1="220" y1="50" x2="290" y2="80" stroke={strokeMain} strokeWidth="2" />

                  <rect x="30" y="80" width="160" height="35" rx="6" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="110" y="102" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">PURE SUBSTANCES</text>

                  <rect x="210" y="80" width="160" height="35" rx="6" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="290" y="102" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24">MIXTURES</text>

                  <line x1="70" y1="115" x2="55" y2="140" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="150" y1="115" x2="165" y2="140" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="55" y="155" textAnchor="middle" fontSize="10" fontWeight="800" fill="#a3e635">Elements</text>
                  <text x="165" y="155" textAnchor="middle" fontSize="10" fontWeight="800" fill="#f87171">Compounds</text>

                  <line x1="250" y1="115" x2="240" y2="140" stroke={strokeMain} strokeWidth="1.5" />
                  <line x1="330" y1="115" x2="340" y2="140" stroke={strokeMain} strokeWidth="1.5" />
                  <text x="240" y="155" textAnchor="middle" fontSize="10" fontWeight="800" fill="#38bdf8">Uniform</text>
                  <text x="340" y="155" textAnchor="middle" fontSize="10" fontWeight="800" fill="#c084fc">Non-uniform</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Something labelled "pure" on a food package (like pure milk or pure ghee) may still be considered impure by a scientist, if it is made of more than one substance.</li>
                <li>A pure substance is made of only one kind of particle throughout.</li>
                <li>Pure substances are of exactly two types: elements and compounds.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Scientifically "pure" = only one type of particle, cannot be split by physical means</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="A product is labelled 'pure' because nothing cheap has been added to it. Would a scientist necessarily agree it is pure? Explain." answer="Not necessarily -- a scientist only considers something pure if it consists of a single type of particle throughout; a genuine food product could still be made of more than one substance even without any adulteration." />
              <ExampleQ number={2} isLightMode={isLightMode} question="What is adulteration?" answer="The illegal process of adding cheaper or lower-quality substances to a product, usually to increase quantity or cut costs, which lowers the product's quality and can make it unsafe." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Name the two types of pure substances." answer="Elements and compounds." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Can a pure substance be separated into different kinds of matter using a physical process like filtering or evaporation?" answer="No -- by definition, a pure substance cannot be separated into other kinds of matter by any physical process." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Classify milk as a mixture or a pure substance, giving a reason." answer="Milk is a mixture, since it is made of more than one substance (such as water, fats, and proteins) rather than a single type of particle." />

              <RememberBox title="Two meanings of 'pure'" isLightMode={isLightMode}>
                Always be clear about which meaning of "pure" a question is using -- the everyday meaning (unadulterated) and the scientific meaning (only one type of particle) are genuinely different ideas.
              </RememberBox>
            </div>
          )}

          {activeTopic === "elements" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Elements</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Elements are the simplest possible substances -- the true building blocks that everything else is made from.</p>
              </div>

              <InfoCard title="Core Definition" icon={Atom} isLightMode={isLightMode}>
                <p><b>Element:</b> a pure substance that cannot be broken down further into any simpler substance. Each element is made up of identical particles called atoms, different from the atoms of any other element.</p>
              </InfoCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Examples of elements include hydrogen, oxygen, gold, silver, sulfur, and carbon.</li>
                <li>Atoms of most elements do not exist completely independently -- two or more of them combine to form a stable particle called a molecule (for example, two hydrogen atoms form one hydrogen molecule).</li>
                <li>Elements are classified as metals (such as gold, silver, magnesium, iron, aluminium) or non-metals (such as carbon, sulfur, hydrogen, oxygen).</li>
                <li>A few elements, like silicon and boron, have properties in between metals and non-metals -- these are called metalloids.</li>
              </ul>

              <SectionHeading>Some Interesting Facts About Elements</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Total known elements" isLightMode={isLightMode}>118, with most existing as solids.</FactRow>
                <FactRow label="Gaseous elements" isLightMode={isLightMode}>11 elements are gases at room temperature, and all of them are non-metals (like oxygen, helium, nitrogen).</FactRow>
                <FactRow label="Liquid elements" isLightMode={isLightMode}>Only two -- mercury (a metal) and bromine (a non-metal) -- are liquid at room temperature.</FactRow>
                <FactRow label="Low-melting solids" isLightMode={isLightMode}>Gallium and caesium are solid at room temperature but melt into liquid at around 30 degrees Celsius.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Element = one type of atom, cannot be broken into anything simpler</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Define an element." answer="A pure substance made of identical atoms that cannot be broken down further into any simpler substance." />
              <ExampleQ number={2} isLightMode={isLightMode} question="What is a molecule of an element?" answer="A stable particle formed when two or more atoms of the same element combine, since most atoms cannot exist completely independently." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Classify gold, carbon, and silicon as metal, non-metal, or metalloid." answer="Gold is a metal, carbon is a non-metal, and silicon is a metalloid (having properties in between metals and non-metals)." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Name the two elements that are liquid at room temperature, and state whether each is a metal or non-metal." answer="Mercury (a metal) and bromine (a non-metal)." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Are most known elements solid, liquid, or gas at room temperature?" answer="Solid -- most of the 118 known elements exist in a solid state at room temperature." />

              <RememberBox title="Element is about atom type, not appearance" isLightMode={isLightMode}>
                Two samples of the same element can look completely different depending on their form (a lump of carbon looks nothing like fine carbon powder), but they are still the same element as long as they are made of the same type of atom.
              </RememberBox>
            </div>
          )}

          {activeTopic === "compounds" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Compounds</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>When elements combine chemically in a fixed ratio, they can create something entirely new, with completely different properties.</p>
              </div>

              <InfoCard title="Core Definition" icon={TestTube} isLightMode={isLightMode}>
                <p><b>Compound:</b> formed when two or more different elements combine chemically in a fixed ratio, creating a new substance whose properties are completely different from the elements that formed it. The constituent elements of a compound cannot be separated by any physical method.</p>
              </InfoCard>

              <DiagramCard caption="Passing electricity through water splits it into hydrogen gas (collected at one terminal) and oxygen gas (collected at the other), in a 2:1 ratio by volume" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 140" className="w-full h-auto">
                  <rect x="150" y="70" width="80" height="50" rx="6" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="190" y="98" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fbbf24">9V Battery</text>
                  <text x="190" y="112" textAnchor="middle" fontSize="8" fontWeight="700" fill={textMain}>in water + acid</text>

                  <line x1="150" y1="80" x2="80" y2="50" stroke={strokeMain} strokeWidth="2" />
                  <line x1="230" y1="80" x2="300" y2="50" stroke={strokeMain} strokeWidth="2" />

                  <rect x="45" y="10" width="70" height="60" rx="6" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="65" cy="30" r="3" fill="#22d3ee" /><circle cx="80" cy="25" r="3" fill="#22d3ee" /><circle cx="95" cy="35" r="3" fill="#22d3ee" /><circle cx="70" cy="45" r="3" fill="#22d3ee" />
                  <text x="80" y="80" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Hydrogen (more)</text>

                  <rect x="270" y="10" width="65" height="35" rx="6" fill="none" stroke="#f87171" strokeWidth="2.5" />
                  <circle cx="290" cy="27" r="3" fill="#f87171" /><circle cx="310" cy="22" r="3" fill="#f87171" />
                  <text x="302" y="60" textAnchor="middle" fontSize="9" fontWeight="800" fill={textMain}>Oxygen (less)</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Key Points</SectionHeading>
              <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">
                <li>Passing electric current through water (with a little sulfuric acid added) breaks it down into hydrogen gas (which produces a "pop" sound with a burning candle) and oxygen gas (which makes a flame burn brighter).</li>
                <li>This shows water is made of hydrogen and oxygen combined, so water is a compound, not an element.</li>
                <li>The ratio of hydrogen atoms to oxygen atoms in water is 2:1.</li>
                <li>Common salt (sodium chloride) is a compound made of sodium and chlorine in a 1:1 ratio -- even though sodium is a soft metal and chlorine is a hazardous gas, the compound they form is a harmless, taste-enhancing substance.</li>
                <li>Heating sugar causes it to char, leaving behind carbon (charcoal), while water droplets form near the top of the container -- showing sugar breaks down into carbon, hydrogen, and oxygen, making it a compound too.</li>
              </ul>

              <KeyIdeaBox isLightMode={isLightMode}>Compound = elements combined chemically, in a fixed ratio, with completely new properties</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why is water considered a compound rather than an element?" answer="Because passing electricity through water breaks it down into two simpler substances -- hydrogen and oxygen -- showing water is made of more than one element combined." />
              <ExampleQ number={2} isLightMode={isLightMode} question="State the ratio of hydrogen to oxygen atoms in a water molecule." answer="2:1 (two hydrogen atoms to one oxygen atom)." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Common salt is made from sodium (a soft metal) and chlorine (a hazardous gas), yet salt itself is safe to eat. Explain this using the idea of compounds." answer="A compound's properties are completely different from the properties of the elements that formed it -- so even though sodium and chlorine are each unsafe on their own, the compound they form (sodium chloride) is a safe, useful substance." />
              <ExampleQ number={4} isLightMode={isLightMode} question="What happens when sugar is heated strongly, and what does this reveal about sugar?" answer="Sugar turns brown, then chars into blackish charcoal (carbon), with water droplets forming near the top. This reveals sugar is a compound made of carbon, hydrogen, and oxygen, not an element." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Can the hydrogen and oxygen in water be separated using a simple physical method like filtering? Explain." answer="No -- the elements in a compound are combined chemically and cannot be separated by any physical method; separating water into hydrogen and oxygen requires a chemical process, like passing electricity through it." />

              <RememberBox title="New properties, not a blend of old ones" isLightMode={isLightMode}>
                A compound's properties are not simply a mix of its elements' properties -- they can be completely different and unexpected, exactly like table salt being nothing like a soft metal or a poisonous gas.
              </RememberBox>
            </div>
          )}

          {activeTopic === "iron-sulfur-activity" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Mixture or Compound? An Experiment</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The exact same two ingredients, iron and sulfur, can end up as either a mixture or a compound -- depending on what is done to them.</p>
              </div>

              <InfoCard title="The Setup" icon={FlaskConical} isLightMode={isLightMode}>
                <p>Iron filings and sulfur powder are mixed together to form <b>Sample A</b>. Half of Sample A is then heated strongly, cooled, and ground into a black mass called <b>Sample B</b>.</p>
              </InfoCard>

              <DiagramCard caption="Sample A (a mixture) responds to a magnet and reacts with acid to release hydrogen; Sample B (a compound, iron sulfide) does neither in the same way" isLightMode={isLightMode}>
                <svg viewBox="0 0 380 150" className="w-full h-auto">
                  <rect x="20" y="20" width="150" height="90" rx="10" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="95" y="45" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">SAMPLE A (mixture)</text>
                  <circle cx="55" cy="70" r="6" fill="#94a3b8" /><circle cx="80" cy="65" r="6" fill="#facc15" /><circle cx="105" cy="75" r="6" fill="#94a3b8" /><circle cx="130" cy="68" r="6" fill="#facc15" />
                  <text x="95" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>Magnet attracts iron;</text>
                  <text x="95" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>gives hydrogen gas with acid</text>

                  <rect x="210" y="20" width="150" height="90" rx="10" fill="#1f2937" opacity="0.5" stroke="#f87171" strokeWidth="2.5" />
                  <text x="285" y="45" textAnchor="middle" fontSize="11" fontWeight="800" fill="#f87171">SAMPLE B (compound)</text>
                  <rect x="255" y="60" width="60" height="25" rx="4" fill="#1f2937" />
                  <text x="285" y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="#e2e8f0">Iron sulfide</text>
                  <text x="285" y="128" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>Not magnetic;</text>
                  <text x="285" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill={textMain}>gives smelly gas with acid</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Comparing Sample A and Sample B</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Appearance" isLightMode={isLightMode}>Sample A shows separate black (iron) and yellow (sulfur) particles; Sample B is a uniform black mass throughout.</FactRow>
                <FactRow label="Magnet test" isLightMode={isLightMode}>A magnet attracts the iron out of Sample A; a magnet has no effect at all on Sample B.</FactRow>
                <FactRow label="Reaction with dilute hydrochloric acid (Sample A)" isLightMode={isLightMode}>Iron reacts to form iron chloride and hydrogen gas -- colourless, odourless, and burns with a "pop" sound.</FactRow>
                <FactRow label="Reaction with dilute hydrochloric acid (Sample B)" isLightMode={isLightMode}>Iron sulfide reacts to form iron chloride and hydrogen sulfide gas -- colourless, with a rotten-egg smell.</FactRow>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Sample A = a mixture of iron and sulfur. Sample B = iron sulfide, a genuine compound.</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Why does a magnet attract iron out of Sample A but not out of Sample B?" answer="In Sample A, the iron filings are simply mixed with sulfur and still behave as ordinary iron, which is magnetic. In Sample B, the iron has chemically combined with sulfur to form iron sulfide, a new substance with completely different properties, including no magnetic response." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Write the word equation for the reaction between Sample A (iron and sulfur mixture) and dilute hydrochloric acid." answer="Iron + Dilute hydrochloric acid -> Iron chloride + Hydrogen gas." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Write the word equation for the reaction between Sample B (iron sulfide) and dilute hydrochloric acid." answer="Iron sulfide + Dilute hydrochloric acid -> Iron chloride + Hydrogen sulfide gas." />
              <ExampleQ number={4} isLightMode={isLightMode} question="How can the different smells of the two gases produced help identify which sample is which?" answer="The gas from Sample A (hydrogen) is odourless, while the gas from Sample B (hydrogen sulfide) has a distinct rotten-egg smell -- this difference alone can help confirm which sample was tested." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Explain why Sample A is classified as a mixture and Sample B is classified as a compound." answer="In Sample A, iron and sulfur can still be separated (for example, using a magnet) and each retains its own properties -- the definition of a mixture. In Sample B, iron and sulfur have combined chemically into a new substance (iron sulfide) that cannot be separated back by physical means and has entirely different properties -- the definition of a compound." />

              <RememberBox title="Same starting materials, very different results" isLightMode={isLightMode}>
                This activity is one of the clearest possible demonstrations that a mixture and a compound made from the very same two elements can behave in completely different, testable ways.
              </RememberBox>
            </div>
          )}

          {activeTopic === "uses-and-minerals" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Everyday Uses & Minerals</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>From the phone in your hand to the buildings around you, elements, compounds, and mixtures shape nearly everything humans make.</p>
              </div>

              <InfoCard title="Core Idea" icon={Gem} isLightMode={isLightMode}>
                <p>Understanding elements, compounds, and mixtures is not just about naming what surrounds us -- it drives real innovation in medicine, agriculture, construction, and materials.</p>
              </InfoCard>

              <SectionHeading>Real-World Applications</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Medicine" isLightMode={isLightMode}>Understanding how elements combine into compounds helps create life-saving medicines and vaccines.</FactRow>
                <FactRow label="Agriculture" isLightMode={isLightMode}>Knowledge of compounds supports the creation of fertilisers that boost crop production.</FactRow>
                <FactRow label="Construction & materials" isLightMode={isLightMode}>Iron and aluminium (elements) are used in bridges and vehicles; alloys like stainless steel are stronger and more durable than pure iron; wood, steel, and concrete are all mixtures.</FactRow>
                <FactRow label="Mobile phones" isLightMode={isLightMode}>More than 45 different elements -- including aluminium, copper, silicon, cobalt, lithium, gold, and silver -- go into a single mobile phone.</FactRow>
              </div>

              <SectionHeading>Minerals</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="What minerals are" isLightMode={isLightMode}>Natural, solid substances found in rocks, with a fixed chemical composition.</FactRow>
                <FactRow label="Native minerals" isLightMode={isLightMode}>Pure elements, not compounds -- such as gold, silver, and copper (metals), or sulfur and carbon (non-metals).</FactRow>
                <FactRow label="Compound minerals" isLightMode={isLightMode}>Most minerals are actually compounds made of more than one element -- examples include quartz, calcite, mica, pyroxene, and olivine.</FactRow>
                <FactRow label="Everyday mineral uses" isLightMode={isLightMode}>Cement is made from calcite, quartz, alumina, and iron oxide; talcum powder is made from the mineral talc.</FactRow>
              </div>

              <SectionHeading>An Important Clarification: What Is NOT Matter</SectionHeading>
              <div className={`p-4 rounded-xl border ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Elements and compounds are the building blocks of matter -- anything that has mass and takes up space. But not everything around us is matter. Light, heat, electricity, and even thoughts and emotions are important parts of our world, but they are not made of matter at all.</p>
              </div>

              <KeyIdeaBox isLightMode={isLightMode}>Not everything real is matter -- light, heat, and electricity are not made of particles with mass</KeyIdeaBox>

              <SectionHeading>Worked Examples</SectionHeading>
              <ExampleQ number={1} isLightMode={isLightMode} question="Name two elements used in manufacturing a mobile phone." answer="Any two of: aluminium, copper, silicon, cobalt, lithium, gold, silver." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Give an example of a native mineral, and explain why it is called 'native'." answer="Gold is a native mineral -- it is called native because it occurs naturally as a pure element, not combined with other elements as a compound." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Are most minerals elements or compounds? Give an example." answer="Most minerals are compounds, made of more than one element -- for example, quartz." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Explain why stainless steel is preferred over pure iron for many construction uses." answer="Stainless steel, an alloy of iron with nickel, chromium, and a little carbon, is stronger and more durable than pure iron, making it more suitable for demanding construction uses." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Is heat considered matter? Explain." answer="No -- heat, like light and electricity, is not made of matter, since matter specifically refers to things that have mass and take up space." />

              <RememberBox title="Matter has a clear boundary" isLightMode={isLightMode}>
                Whenever unsure if something counts as matter, ask: does it have mass, and does it take up space? If the answer to either is no, it is not matter -- no matter how real or important it is.
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
                <FactRow label="Mixture" isLightMode={isLightMode}>two or more substances combined, each keeping its own properties.</FactRow>
                <FactRow label="Component" isLightMode={isLightMode}>an individual substance that makes up a mixture.</FactRow>
                <FactRow label="Uniform mixture" isLightMode={isLightMode}>components evenly distributed, cannot be told apart even with a microscope.</FactRow>
                <FactRow label="Non-uniform mixture" isLightMode={isLightMode}>components generally visible with the naked eye or a magnifying device.</FactRow>
                <FactRow label="Alloy" isLightMode={isLightMode}>a uniform solid-solid mixture of metals, like stainless steel or bronze.</FactRow>
                <FactRow label="Pure substance" isLightMode={isLightMode}>made of only one type of particle; cannot be split by physical means.</FactRow>
                <FactRow label="Element" isLightMode={isLightMode}>a pure substance made of identical atoms, cannot be broken down further.</FactRow>
                <FactRow label="Compound" isLightMode={isLightMode}>elements combined chemically in a fixed ratio, with new properties.</FactRow>
                <FactRow label="Mineral" isLightMode={isLightMode}>a natural, solid substance with fixed composition -- usually a compound, occasionally a pure element.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={Layers} title="Mixtures" color="cyan" isLightMode={isLightMode} points={[
                  "Two or more substances, properties kept",
                  "Uniform vs non-uniform",
                  "Any two states of matter can combine",
                ]} />
                <MindMapBranch icon={Wind} title="Air" color="sky" isLightMode={isLightMode} points={[
                  "Uniform mixture of gases",
                  "Nitrogen ~78%, oxygen for life/combustion",
                  "Lime water confirms carbon dioxide",
                ]} />
                <MindMapBranch icon={Sparkles} title="Pure Substances" color="amber" isLightMode={isLightMode} points={[
                  "Only one type of particle",
                  "Cannot be split physically",
                  "Two types: elements and compounds",
                ]} />
                <MindMapBranch icon={Atom} title="Elements" color="emerald" isLightMode={isLightMode} points={[
                  "Simplest substances, made of atoms",
                  "Metals, non-metals, metalloids",
                  "118 known, mostly solid",
                ]} />
                <MindMapBranch icon={TestTube} title="Compounds" color="rose" isLightMode={isLightMode} points={[
                  "Elements combined chemically, fixed ratio",
                  "New properties, different from elements",
                  "Water (2:1 H:O), salt (1:1 Na:Cl)",
                ]} />
                <MindMapBranch icon={Gem} title="Minerals & Uses" color="indigo" isLightMode={isLightMode} points={[
                  "Native minerals: pure elements",
                  "Most minerals are compounds",
                  "Light, heat, electricity are not matter",
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

              <InfoCard title="A Substance Cannot Be Both an Element and a Compound" icon={Atom} isLightMode={isLightMode}>
                <p>Since an element is defined as a substance that cannot be broken down further, and a compound is specifically made of two or more elements combined, no single substance can genuinely belong to both categories at once -- a common trap in reasoning questions.</p>
              </InfoCard>

              <InfoCard title="Fixed Ratio Is What Makes a Compound Special" icon={TestTube} isLightMode={isLightMode}>
                <p>Unlike mixtures, where the proportions of components can vary freely (weak or strong sugar solution, for instance), a compound always has its elements combined in one exact, fixed ratio -- water is always 2:1 hydrogen to oxygen, never any other ratio, wherever it is found.</p>
              </InfoCard>

              <InfoCard title="Gold as Both a Mineral and a Metal" icon={Gem} isLightMode={isLightMode}>
                <p>Gold can correctly be described as both a mineral (a natural, solid substance with fixed composition, in this case a native, pure-element mineral) and a metal (based on its element classification) -- these two descriptions are not contradictory, since they classify the same substance from two different angles.</p>
              </InfoCard>

              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Alloys are mixtures, not compounds" isLightMode={isLightMode}>even though alloys like stainless steel look completely uniform, their metal components are not combined in a fixed chemical ratio and can, in principle, still be separated -- so they remain mixtures, not compounds.</FactRow>
                <FactRow label="Air's variable composition" isLightMode={isLightMode}>unlike a true compound, the exact percentages of gases in air (especially water vapour and pollutants) can vary from place to place and day to day -- another clue that air is a mixture, not a compound.</FactRow>
              </div>

              <RememberBox title="One trap to watch for" isLightMode={isLightMode}>
                Reasoning-based papers love questions where a uniform-looking substance (like an alloy or air) is mistaken for a compound just because its components cannot be seen separately. Always check whether the components are combined in a truly FIXED chemical ratio -- if not, it's a mixture, however uniform it looks.
              </RememberBox>

              <SectionHeading>Solved Reasoning Questions</SectionHeading>

              <ExampleQ number={1} isLightMode={isLightMode} question="A and B are two substances that cannot be broken down into simpler substances by chemical reactions. They combine to form product C. Classify A, B, and C." answer="Since A and B cannot be broken down further, they are elements. Since C is formed by combining A and B, C is a compound, and it will have a fixed composition (a fixed ratio of A to B)." />
              <ExampleQ number={2} isLightMode={isLightMode} question="Assertion: Air is a mixture. Reason: A mixture is formed when two or more substances are mixed without undergoing any chemical change. Evaluate this Assertion-Reason pair." answer="Both the Assertion and the Reason are true, and the Reason correctly explains the Assertion -- air's gases are simply mixed together without any chemical reaction between them, which is exactly why air qualifies as a mixture." />
              <ExampleQ number={3} isLightMode={isLightMode} question="Water is a compound with properties completely different from hydrogen and oxygen. Justify this statement." answer="Hydrogen is a flammable fuel and oxygen supports combustion, yet water -- formed by combining them chemically -- is used to extinguish fires. This dramatic difference in behaviour shows that a compound's properties are genuinely new, not simply a blend of its elements' properties." />
              <ExampleQ number={4} isLightMode={isLightMode} question="Classify the following correctly, with reasoning: air, sand, brass, muddy water -- are these all non-uniform mixtures?" answer="No -- air and brass are actually uniform mixtures (their components cannot be seen separately), while sand-water mixtures and muddy water are non-uniform (particles can be seen settling or floating). This shows the original grouping is incorrect." />
              <ExampleQ number={5} isLightMode={isLightMode} question="Iron reacts with moist air to form iron oxide (rust), and magnesium burns in oxygen to form magnesium oxide. Classify all the substances involved." answer="Iron, magnesium, and oxygen are elements. Iron oxide and magnesium oxide are compounds, since each is formed by combining two elements chemically. Moist air is a mixture, since it contains multiple gases (and water vapour) simply combined together." />
              <ExampleQ number={6} isLightMode={isLightMode} question="Explain why stainless steel, despite looking completely uniform throughout, is still classified as a mixture and not a compound." answer="Although stainless steel appears uniform, its metals (iron, nickel, chromium) are not combined in one single fixed chemical ratio the way elements in a compound must be, and they are not chemically bonded together the way a compound's elements are -- so it remains an alloy, a type of mixture." />
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = EC_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(EC_TOPICS[currentIndex - 1].id)}
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
              const currentIndex = EC_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < EC_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(EC_TOPICS[currentIndex + 1].id)}
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
                    onClick={() => setActiveTopic(EC_TOPICS[0].id)}
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

export default LearnScience8ElementsCompounds;
