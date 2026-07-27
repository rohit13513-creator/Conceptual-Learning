import React, { useState } from "react";
import {
  BookOpen,
  Award,
  HelpCircle,
  Printer,
  FlaskConical,
  Beaker,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Flame,
  Snowflake,
} from "lucide-react";

type ChemTopicId =
  | "what-is-a-reaction"
  | "equations-balancing"
  | "types-of-reactions"
  | "exothermic-endothermic"
  | "oxidation-redox"
  | "corrosion-rancidity"
  | "important-reactions"
  | "ncert-activities"
  | "mind-map";

interface ChemTopic {
  id: ChemTopicId;
  title: string;
  category: string;
}

const CHEM_TOPICS: ChemTopic[] = [
  { id: "what-is-a-reaction", title: "1. What Is a Chemical Reaction?", category: "Fundamentals" },
  { id: "equations-balancing", title: "2. Chemical Equations & Balancing", category: "Equations" },
  { id: "types-of-reactions", title: "3. Types of Reactions (By Mechanism)", category: "Reaction Types" },
  { id: "exothermic-endothermic", title: "4. Exothermic & Endothermic Reactions", category: "Reaction Types" },
  { id: "oxidation-redox", title: "5. Oxidation, Reduction & Redox", category: "Reaction Types" },
  { id: "corrosion-rancidity", title: "6. Corrosion & Rancidity", category: "Everyday Chemistry" },
  { id: "important-reactions", title: "7. Important Reactions", category: "Reference" },
  { id: "ncert-activities", title: "8. NCERT Lab Activities", category: "Activities" },
  { id: "mind-map", title: "9. Mind Map", category: "Revision" },
];

interface LearnChemistryProps {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// A small reusable "lab activity" card -- materials / procedure / observation / explanation --
// used throughout to mirror the hands-on demonstrations from the source material.
const ActivityCard: React.FC<{
  title: string;
  materials?: string[];
  procedure: string[];
  observation: string[];
  equation?: React.ReactNode;
  explanation?: string[];
}> = ({ title, materials, procedure, observation, equation, explanation }) => (
  <div className="bg-[#0d1424] border border-cyan-500/15 rounded-2xl p-4.5 space-y-3 shadow-md">
    <div className="flex items-center gap-2">
      <FlaskConical className="w-4 h-4 text-cyan-400" />
      <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">{title}</h4>
    </div>
    {materials && materials.length > 0 && (
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase text-amber-500 font-mono tracking-widest">Materials Required</span>
        <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-0.5">
          {materials.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    )}
    <div className="space-y-1">
      <span className="text-[10px] font-black uppercase text-amber-500 font-mono tracking-widest">Procedure</span>
      <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-0.5">
        {procedure.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
    <div className="space-y-1">
      <span className="text-[10px] font-black uppercase text-emerald-500 font-mono tracking-widest">Observation</span>
      <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-0.5">
        {observation.map((o, i) => <li key={i}>{o}</li>)}
      </ul>
    </div>
    {equation && (
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center font-mono font-black text-sm text-yellow-300 overflow-x-auto">
        {equation}
      </div>
    )}
    {explanation && explanation.length > 0 && (
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase text-cyan-500 font-mono tracking-widest">Explanation</span>
        <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-0.5">
          {explanation.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </div>
    )}
  </div>
);

const RememberBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
    <h5 className="font-bold text-amber-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
      <HelpCircle className="w-3.5 h-3.5" /> {title}
    </h5>
    <div className="text-slate-350 text-[11.5px] font-sans leading-relaxed">{children}</div>
  </div>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-cyan-300 font-mono">
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
    <span>{children}</span>
  </div>
);

const Eq: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center font-mono font-black text-sm text-yellow-300 overflow-x-auto">
    {children}
  </div>
);

// A compact single-line "label: equation" row -- used to build the dense Important Reactions reference sheet.
const ReactionRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-semibold">
    <span className="text-white font-black">{label}:</span> <span className="text-yellow-300 font-mono block sm:inline mt-0.5 sm:mt-0">{children}</span>
  </div>
);

// A single branch of the end-of-chapter mind map -- a coloured card with a short title and 3-4 leaf bullet points.
type MindMapColor = "cyan" | "emerald" | "indigo" | "orange" | "amber" | "rose";

const MIND_MAP_PALETTE: Record<MindMapColor, { dark: string; light: string; icon: string }> = {
  cyan: { dark: "bg-cyan-950/30 border-cyan-500/25 text-cyan-300", light: "bg-cyan-50 border-cyan-300 text-cyan-900", icon: "text-cyan-400" },
  emerald: { dark: "bg-emerald-950/30 border-emerald-500/25 text-emerald-300", light: "bg-emerald-50 border-emerald-300 text-emerald-900", icon: "text-emerald-500" },
  indigo: { dark: "bg-indigo-950/30 border-indigo-500/25 text-indigo-300", light: "bg-indigo-50 border-indigo-300 text-indigo-900", icon: "text-indigo-400" },
  orange: { dark: "bg-orange-950/30 border-orange-500/25 text-orange-300", light: "bg-orange-50 border-orange-300 text-orange-900", icon: "text-orange-500" },
  amber: { dark: "bg-amber-950/30 border-amber-500/25 text-amber-300", light: "bg-amber-50 border-amber-300 text-amber-900", icon: "text-amber-500" },
  rose: { dark: "bg-rose-950/30 border-rose-500/25 text-rose-300", light: "bg-rose-50 border-rose-300 text-rose-900", icon: "text-rose-500" },
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
          <h4 className="text-xs font-black uppercase tracking-wider font-mono">{title}</h4>
        </div>
        <ul className={`list-disc pl-4 text-[11px] font-semibold space-y-1 ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
};

export function LearnChemistry({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnChemistryProps) {
  const [activeTopic, setActiveTopic] = useState<ChemTopicId>("what-is-a-reaction");

  const handleDownloadNotes = () => {
    const link = document.createElement("a");
    link.href = "/Class-10-Chemical-Reactions-Notes.pdf";
    link.download = "Class-10-Chemical-Reactions-Notes.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-chemistry-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-500" />
            <span className={`text-xs uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-emerald-400"}`}>Chemical Reactions & Equations</span>
          </div>
          <button
            onClick={handleDownloadNotes}
            className={`flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded transition ${isLightMode ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-500 hover:bg-emerald-400 text-[#0d1424]"}`}
          >
            <Printer className="w-2.5 h-2.5" />
            PDF
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-500" />
              <h3 className={`text-sm font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Chemical Reactions & Equations Notes</h3>
            </div>
            <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Reactions, equations, and everyday chemical change -- concept-first notes with worked examples.
            </p>
          </div>
          <button
            onClick={handleDownloadNotes}
            className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${isLightMode ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10" : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-450/5"}`}
          >
            <Printer className="w-3.5 h-3.5" />
            Download Notes (PDF)
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {CHEM_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 group ${
                activeTopic === topic.id
                  ? isLightMode
                    ? "bg-emerald-50 border border-emerald-300"
                    : "bg-emerald-950/40 border border-emerald-500/30"
                  : "border border-transparent hover:bg-slate-800/40"
              }`}
            >
              <span className={`text-[9px] font-black uppercase tracking-widest font-mono block ${activeTopic === topic.id ? "text-emerald-400" : isLightMode ? "text-slate-500" : "text-slate-500"}`}>
                {topic.category}
              </span>
              <span className={`text-xs font-bold ${activeTopic === topic.id ? (isLightMode ? "text-emerald-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>
                {topic.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-chemistry-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-chemistry-main p, #learn-chemistry-main li, #learn-chemistry-main span, #learn-chemistry-main label, #learn-chemistry-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-chemistry-main b, #learn-chemistry-main strong, #learn-chemistry-main h1, #learn-chemistry-main h2, #learn-chemistry-main h3, #learn-chemistry-main h4, #learn-chemistry-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-chemistry-container .bg-slate-900, #learn-chemistry-container .bg-\\[\\#0d1424\\], #learn-chemistry-container .bg-\\[\\#121c2e\\], #learn-chemistry-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-chemistry-container .border-slate-800, #learn-chemistry-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs ${isLightMode ? "from-emerald-50 via-teal-50 to-emerald-50 border-emerald-300" : "from-emerald-950/40 via-[#0a2820]/40 to-teal-950/40 border-emerald-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-emerald-400 tracking-tight">Class X: chemical reactions notes</h4>
              </div>
            </div>
            <button
              onClick={handleDownloadNotes}
              className="shrink-0 flex items-center gap-1.5 py-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-[#0d1424] font-black uppercase tracking-wider text-[11px] rounded-xl transition cursor-pointer hover:shadow-lg hover:shadow-emerald-400/5 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              Download Chemistry Notes (PDF)
            </button>
          </div>

          {activeTopic === "what-is-a-reaction" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">What Is a Chemical Reaction?</h1>
                <p className="text-sm font-semibold text-slate-400">
                  How to recognize a genuine chemical change in everyday life -- and the five tell-tale signs that prove one has actually happened.
                </p>
              </div>

              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definition</h3>
                </div>
                <div className="space-y-3 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">Chemical Reaction:</b> A process in which one or more substances (the reactants) are converted into one or more new substances (the products) with different properties. Chemical reactions happen because existing bonds between atoms break and new bonds form to build the different substances.
                  </p>
                </div>
              </div>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-4">
                <p>
                  Chemical change is happening around you constantly, even when nothing looks obviously "on fire." Consider what happens when milk is left out and turns sour, an iron pan left in humid air develops rust, grapes ferment, food is cooked, food is digested inside your body, or you simply breathe. In every one of these situations, the identity of the starting substance has genuinely changed into something new -- that is what makes it a chemical reaction rather than just a physical change.
                </p>
                <p>Some everyday examples of chemical change:</p>
                <ul className="list-disc pl-5 space-y-1 text-[12.5px]">
                  <li><b>Rusting of Iron</b> -- iron exposed to air and moisture slowly develops a reddish-brown coating.</li>
                  <li><b>Fermentation of Grapes</b> -- sugar in grapes is converted into alcohol by microbial action.</li>
                  <li><b>Cooking of Food</b> -- heat permanently alters the composition, taste, and texture of food.</li>
                  <li><b>Digestion of Food</b> -- enzymes break complex food down into simpler, absorbable substances.</li>
                  <li><b>Respiration</b> -- oxygen reacts with glucose inside your cells to release usable energy.</li>
                  <li><b>Formation of Curd from Milk</b> -- bacteria convert the lactose in milk into lactic acid.</li>
                </ul>
              </div>

              {/* HOW DO WE KNOW */}
              <SectionHeading>How Do We Know a Reaction Has Happened?</SectionHeading>
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-[10px] font-black uppercase text-amber-500 font-mono tracking-widest">Five Tell-Tale Signs of a Chemical Change</h4>
                <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                  {[
                    ["Change in State", "Wax burning to gas and soot; dough baking and solidifying."],
                    ["Change in Colour", "An iron nail rusting reddish-brown; a cut apple turning brown in air; silver tarnishing black."],
                    ["Evolution of a Gas", "Zinc + hydrochloric acid releasing hydrogen bubbles; baking soda + vinegar fizzing with CO₂."],
                    ["Change in Temperature", "Quicklime + water releasing heat; ammonium chloride dissolving and absorbing heat (feels cold)."],
                    ["Formation of a Precipitate", "Silver nitrate + sodium chloride forming a white solid; lead nitrate + potassium iodide forming a bright yellow solid."],
                  ].map(([label, ex], i) => (
                    <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-cyan-400 font-black">{label}:</span> <span className="text-slate-300">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ActivityCard
                title="Demonstration: Burning a Magnesium Ribbon"
                materials={["Magnesium ribbon (3-4 cm)", "Sandpaper", "Tongs", "Spirit lamp / burner", "Watch-glass", "Safety goggles"]}
                procedure={[
                  "Clean a 3-4 cm strip of magnesium ribbon with sandpaper to remove the surface oxide layer.",
                  "Hold the cleaned ribbon with tongs, well away from your face and eyes.",
                  "Bring it close to the flame of a spirit lamp or burner until it catches fire, and collect the resulting ash in a watch-glass.",
                ]}
                observation={[
                  "The ribbon burns with a bright, dazzling white flame.",
                  "A white powdery ash is left behind in the watch-glass.",
                ]}
                equation={<span>2Mg(s) + O₂(g) → 2MgO(s)</span>}
                explanation={[
                  "The white powder is magnesium oxide, formed by magnesium combining with oxygen from the air.",
                  "Since a new substance is formed and heat and light are released, this is an exothermic chemical change.",
                ]}
              />
            </div>
          )}

          {activeTopic === "equations-balancing" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Chemical Equations & Balancing</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Writing a reaction as a word equation and a chemical equation, why every equation must balance, and two reliable methods for balancing one yourself.
                </p>
              </div>

              {/* WORD & CHEMICAL EQUATIONS */}
              <SectionHeading>Word Equations and Chemical Equations</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>
                  Describing a reaction in a full sentence gets long fast, so chemists use two shorter, standard notations instead.
                </p>
                <p>
                  <b>1. Word Equation</b> -- reactants are written on the left-hand side (LHS) separated by "+" signs, an arrow points toward the products on the right-hand side (RHS), also separated by "+" signs:
                </p>
              </div>
              <Eq><span>Magnesium&nbsp;+&nbsp;Oxygen&nbsp;→&nbsp;Magnesium Oxide</span></Eq>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>
                  <b>2. Chemical Equation</b> -- the same reaction written using chemical formulae instead of names, which is far more concise and useful:
                </p>
              </div>
              <Eq><span>Mg&nbsp;+&nbsp;O₂&nbsp;→&nbsp;MgO</span></Eq>

              {/* BALANCED EQUATIONS */}
              <SectionHeading>Balanced Equations & the Law of Conservation of Mass</SectionHeading>
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">Law of Conservation of Mass</h3>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-300">
                  Mass can neither be created nor destroyed in a chemical reaction. The total mass of the elements present in the products must always equal the total mass of the elements present in the reactants -- which means the number of atoms of each element must stay exactly the same before and after the reaction.
                </p>
              </div>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>
                  An equation where the atom counts don't yet match on both sides (like <code className="bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]">Mg + O₂ → MgO</code>) is called an <b>unbalanced</b> or <b>skeletal</b> equation. It must be balanced -- by adjusting whole-number coefficients only, never the formulae themselves -- before it correctly represents the law of conservation of mass.
                </p>
              </div>

              <RememberBox title="Balancing rule">
                You may only change the number <i>in front of</i> a formula (its coefficient). You can never edit the formula itself -- to balance oxygen you write <code>4 H₂O</code>, never <code>H₂O₄</code> or <code>(H₂O)₄</code>.
              </RememberBox>

              {/* BALANCING METHOD 1 */}
              <SectionHeading>Balancing Method 1 -- Hit and Trial (best for simple equations)</SectionHeading>
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-300">Worked example: balance the reaction of iron with steam.</p>
                <Eq><span>Fe&nbsp;+&nbsp;H₂O&nbsp;→&nbsp;Fe₃O₄&nbsp;+&nbsp;H₂&nbsp;&nbsp;(unbalanced)</span></Eq>
                <ol className="list-decimal pl-5 space-y-1.5 text-[11.5px] text-slate-300 font-semibold">
                  <li>Start with the compound that has the most atoms: Fe₃O₄ has 4 oxygen atoms on the RHS, but H₂O has only 1 on the LHS -- so put a coefficient of 4 in front of H₂O.</li>
                  <li>That now gives 8 hydrogen atoms on the LHS (in 4 H₂O), so put a coefficient of 4 in front of H₂ on the RHS to match.</li>
                  <li>Finally, Fe₃O₄ has 3 iron atoms, so put a coefficient of 3 in front of Fe on the LHS.</li>
                  <li>Recount every element on both sides to confirm the equation is now fully balanced.</li>
                </ol>
                <Eq><span>3Fe&nbsp;+&nbsp;4H₂O&nbsp;→&nbsp;Fe₃O₄&nbsp;+&nbsp;4H₂&nbsp;&nbsp;(balanced)</span></Eq>
              </div>

              {/* BALANCING METHOD 2 */}
              <SectionHeading>Balancing Method 2 -- Algebraic Method (best for complex equations)</SectionHeading>
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-300">Worked example: balance the formation of ferric hydroxide.</p>
                <Eq><span>Fe&nbsp;+&nbsp;H₂O&nbsp;→&nbsp;Fe(OH)₃&nbsp;+&nbsp;H₂&nbsp;&nbsp;(unbalanced)</span></Eq>
                <ol className="list-decimal pl-5 space-y-1.5 text-[11.5px] text-slate-300 font-semibold">
                  <li>Assign a letter coefficient to every formula: <code>a Fe + b H₂O → c Fe(OH)₃ + d H₂</code>.</li>
                  <li>Balance iron: 1 Fe on each side means a = c, so let a = c = 1.</li>
                  <li>Balance oxygen: each H₂O gives 1 O, each Fe(OH)₃ needs 3 O, so b = 3.</li>
                  <li>Balance hydrogen: 3 H₂O gives 6 H on the left; 1 Fe(OH)₃ uses 3 H on the right, leaving 3 H for H₂ molecules, so d = 3/2 -- not a whole number.</li>
                  <li>Multiply every coefficient by 2 to clear the fraction.</li>
                </ol>
                <Eq><span>2Fe&nbsp;+&nbsp;6H₂O&nbsp;→&nbsp;2Fe(OH)₃&nbsp;+&nbsp;3H₂&nbsp;&nbsp;(balanced)</span></Eq>
              </div>

              {/* PHYSICAL STATES */}
              <SectionHeading>Physical State Symbols & Reaction Conditions</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>A balanced equation on its own says nothing about the physical state of each substance. Adding state symbols makes it far more informative, though they're usually only included when it matters:</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
                {[["(s)", "Solid"], ["(l)", "Liquid"], ["(g)", "Gas"], ["(aq)", "Aqueous (dissolved in water)"]].map(([sym, label], i) => (
                  <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                    <div className="text-yellow-300 font-mono font-black text-sm">{sym}</div>
                    <div className="text-slate-400 text-[10px] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <Eq><span>3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)</span></Eq>
              <p className="text-[11px] text-slate-400 font-semibold">Here (g) is used for H₂O to show the water is present as steam. Reaction conditions such as temperature, pressure, or a catalyst (like sunlight or chlorophyll) are often written above or below the arrow itself.</p>
            </div>
          )}

          {activeTopic === "types-of-reactions" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Types of Reactions (By Mechanism)</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Four ways reactants can rearrange into products: joining together, breaking apart, a single swap, and a double exchange of ions.
                </p>
              </div>

              {/* COMBINATION */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">1. Combination Reaction</h3>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-300">
                  Two or more reactants combine to form a <b className="text-white">single</b> product. General form: <code className="bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]">A + B → AB</code>. Combination reactions are usually (but not always) exothermic.
                </p>
              </div>
              <ActivityCard
                title="Demonstration: Slaking of Quicklime"
                materials={["Calcium oxide (quicklime)", "Water", "Beaker"]}
                procedure={["Take a small amount of calcium oxide in a beaker.", "Slowly add water to it and touch the side of the beaker."]}
                observation={["The beaker feels noticeably hot -- a large amount of heat is released."]}
                equation={<span>CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat</span>}
                explanation={[
                  "Calcium oxide (quicklime) and water combine to form the single product calcium hydroxide (slaked lime).",
                  "A limewash made from slaked lime reacts slowly with CO₂ in the air over 2-3 days to form a shiny calcium carbonate finish on walls -- the same compound marble is made of.",
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">Burning of coal: <span className="text-yellow-300 font-mono">C + O₂ → CO₂</span></div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">Formation of water: <span className="text-yellow-300 font-mono">2H₂ + O₂ → 2H₂O</span></div>
              </div>
              <RememberBox title="Exothermic vs. endothermic">
                Reactions that give out heat as they form products are <b>exothermic</b> (e.g. combustion, respiration). Reactions that need to absorb energy to proceed are <b>endothermic</b>.
              </RememberBox>

              {/* DECOMPOSITION */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">2. Decomposition Reaction</h3>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-300">
                  The reverse of a combination reaction: a <b className="text-white">single</b> reactant breaks down into two or more simpler products. General form: <code className="bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]">AB → A + B</code>. Most decomposition reactions need an energy input (heat, light, or electricity) and are endothermic. There are three flavours, based on the energy source.
                </p>
              </div>

              <ActivityCard
                title="(a) Thermal Decomposition -- Heating Ferrous Sulphate Crystals"
                materials={["Ferrous sulphate crystals (~2 g)", "Dry boiling tube", "Spirit lamp / burner"]}
                procedure={["Note the colour of the ferrous sulphate crystals.", "Heat the boiling tube over a flame and observe."]}
                observation={["The green crystals change colour on heating.", "A characteristic smell of burning sulphur is noticeable."]}
                equation={<span>2FeSO₄(s) →(Heat) Fe₂O₃(s) + SO₂(g) + SO₃(g)</span>}
                explanation={[
                  "Ferrous sulphate crystals (FeSO₄·7H₂O) first lose their water of crystallization, then decompose into solid ferric oxide plus sulphur dioxide and sulphur trioxide gases.",
                  "This is called thermal decomposition because heat drives the breakdown.",
                ]}
              />
              <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">Limestone → quicklime + carbon dioxide (used in cement manufacture): <span className="text-yellow-300 font-mono block mt-0.5">CaCO₃(s) →(Heat) CaO(s) + CO₂(g)</span></div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">Lead nitrate emits brown fumes of nitrogen dioxide on heating: <span className="text-yellow-300 font-mono block mt-0.5">2Pb(NO₃)₂(s) →(Heat) 2PbO(s) + 4NO₂(g) + O₂(g)</span></div>
              </div>

              <ActivityCard
                title="(b) Electrolytic Decomposition -- Electrolysis of Water"
                materials={["Plastic mug with two carbon electrodes", "6V battery", "Dilute sulphuric acid", "Two inverted test tubes"]}
                procedure={[
                  "Fill the mug with water and add a few drops of dilute sulphuric acid (pure water barely conducts electricity, so the acid supplies the ions needed to carry current).",
                  "Immerse both carbon electrodes and place an inverted, water-filled test tube over each one.",
                  "Switch on the current and leave the setup undisturbed.",
                ]}
                observation={[
                  "Bubbles collect at both electrodes, displacing water upward into each test tube.",
                  "The gas volume collected at one electrode is exactly double the volume at the other.",
                  "A burning splint tested at the mouth of each tube confirms which gas is which: the gas that burns with a pop is hydrogen (collected at the cathode); the gas that relights a glowing splint is oxygen (collected at the anode).",
                ]}
                equation={<span>2H₂O(l) →(electricity) 2H₂(g) + O₂(g)</span>}
                explanation={["Water is broken down into hydrogen and oxygen gas by passing an electric current through it -- twice as much hydrogen forms as oxygen, matching the 2:1 ratio of H to O in H₂O."]}
              />
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-semibold">
                Electrolysis of molten (not dissolved) sodium chloride similarly splits it apart: at the cathode Na⁺ ions gain electrons to form sodium metal, while at the anode Cl⁻ ions lose electrons to form chlorine gas.
              </div>

              <ActivityCard
                title="(c) Photolytic Decomposition -- Silver Chloride in Sunlight"
                materials={["Silver chloride (~2 g)", "China dish"]}
                procedure={["Note the initial white colour of the silver chloride.", "Place the china dish in direct sunlight for some time."]}
                observation={["The white silver chloride gradually turns grey."]}
                equation={<span>2AgCl(s) →(sunlight) 2Ag(s) + Cl₂(g)</span>}
                explanation={[
                  "Light energy breaks silver chloride down into visible silver metal and chlorine gas. Silver bromide behaves the same way.",
                  "This light sensitivity of silver halides is exactly what black-and-white photography is built on.",
                  "Hydrogen peroxide is similarly light-sensitive, which is why it's stored in dark-coloured bottles to slow its decomposition.",
                ]}
              />

              {/* DISPLACEMENT */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">3. Displacement Reaction</h3>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-300">
                  A more reactive element pushes a less reactive element out of its compound, taking its place. General form: <code className="bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]">A + BC → AC + B</code>. Whether displacement happens at all depends on the reactivity series of metals.
                </p>
              </div>
              <ActivityCard
                title="Demonstration: Iron Nails in Copper Sulphate Solution"
                materials={["Three clean iron nails", "Two test tubes (A, B)", "Copper sulphate solution (~10 mL each)", "Thread"]}
                procedure={[
                  "Clean three iron nails with sandpaper. Keep one aside for comparison.",
                  "Tie the remaining two nails with thread and immerse them in the copper sulphate solution in test tube B for about 20 minutes; leave test tube A undisturbed as a control.",
                  "After 20 minutes, remove the nails and compare colours.",
                ]}
                observation={[
                  "The immersed iron nails have turned a brownish colour.",
                  "The blue colour of the copper sulphate solution in test tube B has visibly faded compared to A.",
                ]}
                equation={<span>Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)</span>}
                explanation={[
                  "Iron, being more reactive than copper, displaces copper from the copper sulphate solution.",
                  "The brown coating on the nails is deposited copper metal; the fading blue colour is due to the pale-green iron sulphate now in solution.",
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">Zinc displaces copper: <span className="text-yellow-300 font-mono">Zn + CuSO₄ → ZnSO₄ + Cu</span></div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">Lead displaces copper: <span className="text-yellow-300 font-mono">Pb + CuCl₂ → PbCl₂ + Cu</span></div>
              </div>

              {/* DOUBLE DISPLACEMENT */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">4. Double Displacement (Precipitation) Reaction</h3>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-300">
                  Two compounds swap partners -- an exchange of ions between the reactants, usually in aqueous solution. General form: <code className="bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]">AB + CD → AD + CB</code>. Whenever one of the new combinations is insoluble, it separates out as a solid precipitate.
                </p>
              </div>
              <ActivityCard
                title="Demonstration: Sodium Sulphate + Barium Chloride"
                materials={["Sodium sulphate solution (~3 mL)", "Barium chloride solution (~3 mL)", "Two test tubes"]}
                procedure={["Take the two solutions in separate test tubes.", "Mix them together and observe."]}
                observation={["A white, water-insoluble substance forms immediately."]}
                equation={<span>Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)</span>}
                explanation={[
                  "The white precipitate is barium sulphate, formed when SO₄²⁻ ions meet Ba²⁺ ions.",
                  "Sodium chloride, the other product, stays dissolved in solution -- this exchange of ions is what makes it a double displacement (precipitation) reaction.",
                ]}
              />
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-semibold">
                Another classic example: lead nitrate reacts with potassium iodide to give a bright yellow precipitate of lead iodide, plus potassium nitrate left in solution.
              </div>
            </div>
          )}

          {activeTopic === "exothermic-endothermic" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Exothermic & Endothermic Reactions</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Every chemical reaction either gives out heat or takes it in -- classifying reactions by this heat exchange, with the exact textbook demonstrations for each.
                </p>
              </div>

              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p><b className="text-white">Exothermic Reaction:</b> a reaction in which heat is given out (released) along with the formation of products -- the reaction mixture becomes warm.</p>
                  <p><b className="text-white">Endothermic Reaction:</b> a reaction in which energy (heat, light, or electricity) is absorbed from the surroundings -- the reaction mixture becomes cold.</p>
                </div>
              </div>

              {/* EXOTHERMIC */}
              <SectionHeading>Exothermic Reactions</SectionHeading>
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-300">
                  Combination reactions are usually exothermic -- when calcium oxide reacts with water (Activity: Slaking of Quicklime, see previous topic) a large amount of heat is released. Other well-known exothermic reactions include:
                </p>
                <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                    <b className="text-white">Burning of natural gas:</b> <span className="text-yellow-300 font-mono block mt-0.5">CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                    <b className="text-white">Respiration</b> -- during digestion, carbohydrates from food (rice, potatoes, bread) are broken down into glucose, which then combines with oxygen inside our body's cells to release the energy we need to stay alive:
                    <span className="text-yellow-300 font-mono block mt-1">C₆H₁₂O₆(aq) + 6O₂(aq) → 6CO₂(aq) + 6H₂O(l) + energy</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                    <b className="text-white">Decomposition of vegetable matter into compost</b> is also exothermic.
                  </div>
                </div>
              </div>

              <RememberBox title="A decomposition reaction that is exothermic">
                Decomposition reactions usually need an energy input and are endothermic -- but composting of vegetable matter is a genuine exception: it is a decomposition reaction that releases heat, making it exothermic. Don't assume "decomposition = endothermic" applies without exception.
              </RememberBox>

              {/* ENDOTHERMIC */}
              <SectionHeading>Endothermic Reactions</SectionHeading>
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <p className="text-xs font-semibold text-slate-300">
                  Decomposition reactions need energy -- in the form of heat, light, or electricity -- to break the reactants down (thermal, electrolytic, and photolytic decomposition, covered in the previous topic, are all endothermic). Reactions in which energy is absorbed from the surroundings are known as endothermic reactions.
                </p>
              </div>

              <ActivityCard
                title="Demonstration: Barium Hydroxide + Ammonium Chloride"
                materials={["Barium hydroxide crystals (~2 g)", "Ammonium chloride (~1 g)", "Test tube", "Glass rod"]}
                procedure={[
                  "Take about 2 g of barium hydroxide in a test tube.",
                  "Add 1 g of ammonium chloride and mix thoroughly with a glass rod.",
                  "Touch the bottom of the test tube with your palm.",
                ]}
                observation={["The bottom of the test tube feels distinctly cold to the touch."]}
                equation={<span>Ba(OH)₂(s) + 2NH₄Cl(s) → BaCl₂(aq) + 2NH₃(g) + 2H₂O(l)</span>}
                explanation={[
                  "The reaction absorbs heat energy from its surroundings (your palm, in this case) rather than releasing it -- this is the classic textbook demonstration of an endothermic reaction.",
                  "Ammonia gas is also released, which can be detected by its sharp smell.",
                ]}
              />

              <ActivityCard
                title="Group Activity: Classifying Dissolution Reactions by Heat Exchange"
                materials={["Four beakers labelled A, B, C, D", "Water", "Copper sulphate solution", "Potassium sulphate", "Ammonium nitrate", "Anhydrous copper sulphate", "Iron filings", "Thermometer"]}
                procedure={[
                  "Put 25 mL of water in beakers A, B, and C, and 25 mL of copper sulphate solution in beaker D.",
                  "Measure and record the initial temperature of the liquid in each beaker.",
                  "Add two spatulas of potassium sulphate to A, ammonium nitrate to B, anhydrous copper sulphate to C, and fine iron filings to D, stirring each.",
                  "Measure and record the final temperature of each mixture, and classify each as exothermic or endothermic.",
                ]}
                observation={[
                  "A (potassium sulphate in water): temperature drops slightly -- mildly endothermic.",
                  "B (ammonium nitrate in water): temperature drops noticeably -- distinctly endothermic (this is the same reaction used in instant cold packs).",
                  "C (anhydrous copper sulphate in water): temperature rises -- exothermic (hydration of the anhydrous salt releases heat).",
                  "D (iron filings in copper sulphate solution): temperature rises -- exothermic (the displacement reaction Fe + CuSO₄ → FeSO₄ + Cu releases heat).",
                ]}
                explanation={["This activity shows that even simple dissolving/displacement changes -- not just combination or decomposition reactions -- can be classified as exothermic or endothermic purely by measuring temperature change."]}
              />

              {/* SUMMARY TABLE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-rose-950/30 to-orange-950/20 border border-orange-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <h5 className="text-[10px] font-black uppercase text-orange-400 font-mono tracking-widest">Exothermic</h5>
                  </div>
                  <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-0.5">
                    <li>Heat is released</li>
                    <li>Mixture feels warm/hot</li>
                    <li>Most combination reactions</li>
                    <li>Burning, respiration, composting</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/20 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Snowflake className="w-4 h-4 text-cyan-400" />
                    <h5 className="text-[10px] font-black uppercase text-cyan-400 font-mono tracking-widest">Endothermic</h5>
                  </div>
                  <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-0.5">
                    <li>Heat/energy is absorbed</li>
                    <li>Mixture feels cold</li>
                    <li>Most decomposition reactions</li>
                    <li>Ba(OH)₂ + NH₄Cl, electrolysis, photolysis</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTopic === "oxidation-redox" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Oxidation, Reduction & Redox Reactions</h1>
                <p className="text-sm font-semibold text-slate-400">
                  What it really means for a substance to be oxidised or reduced, why they always happen together, and how reactions are classified by the phase of their reactants.
                </p>
              </div>

              {/* REDOX */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">Oxidation and Reduction (Redox Reactions)</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p><b className="text-white">Oxidation:</b> a substance gains oxygen (or loses hydrogen/electrons).</p>
                  <p><b className="text-white">Reduction:</b> a substance loses oxygen (or gains hydrogen/electrons).</p>
                  <p>Whenever one reactant is oxidised while another is simultaneously reduced, the overall process is called a <b className="text-white">redox reaction</b>. The substance that supplies the oxygen (and gets reduced itself) is the <b className="text-white">oxidising agent</b>; the substance that removes oxygen (and gets oxidised itself) is the <b className="text-white">reducing agent</b>.</p>
                </div>
              </div>
              <ActivityCard
                title="Demonstration: Heating Copper Powder"
                materials={["Copper powder (~1 g)", "China dish", "Heat source"]}
                procedure={["Place copper powder in a china dish and heat it strongly in air."]}
                observation={["The copper surface turns black."]}
                equation={<span>2Cu + O₂ →(Heat) 2CuO</span>}
                explanation={[
                  "Oxygen is added to copper, so copper is oxidised to black copper(II) oxide.",
                  "If hydrogen gas is then passed over the heated CuO, the black coating turns back to brown copper metal -- CuO loses oxygen (is reduced) while hydrogen gains oxygen (is oxidised): CuO + H₂ → Cu + H₂O.",
                ]}
              />
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-semibold">
                Further examples: in <span className="text-yellow-300 font-mono">ZnO + C → Zn + CO</span>, carbon is oxidised while ZnO is reduced. In <span className="text-yellow-300 font-mono">MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂</span>, HCl is oxidised while MnO₂ is reduced.
              </div>

              <RememberBox title="Homogeneous vs. heterogeneous reactions">
                A <b>homogeneous</b> reaction has every reactant and product in the same physical state (e.g. SO₂ oxidising to SO₃ -- all gases). A <b>heterogeneous</b> reaction mixes phases (e.g. solid calcium carbonate decomposing into solid calcium oxide and gaseous carbon dioxide).
              </RememberBox>
            </div>
          )}

          {activeTopic === "corrosion-rancidity" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Corrosion & Rancidity</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Two unwanted, everyday consequences of oxidation -- how they damage metals and food, and the practical methods used to prevent both.
                </p>
              </div>

              <div className="bg-[#1d121c]/40 border border-rose-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-300 font-mono">Corrosion</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>When a metal is attacked by substances around it -- moisture, acids, or gases in the air -- it is said to corrode. Corrosion damages car bodies, bridges, ships, and iron railings, and repairing this damage costs enormous sums every year.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><b className="text-white">Rusting of iron</b> needs both oxygen and moisture together, forming reddish-brown hydrated iron(III) oxide, roughly Fe₂O₃·xH₂O.</li>
                    <li><b className="text-white">Corrosion of copper</b> gives a dull brown-black copper oxide layer, or a green film of copper carbonate and copper hydroxide when it reacts further with carbon dioxide and moisture.</li>
                    <li><b className="text-white">Corrosion of silver</b> forms a black layer of silver sulphide from reaction with sulphur-containing gases in the air -- commonly called tarnishing.</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                {[
                  ["Painting", "Coats the metal surface so air and moisture can't reach it -- used on railings, fences, and vehicles."],
                  ["Oiling / Greasing", "A protective film on moving machine parts, like bike chains and tools."],
                  ["Galvanization", "Coating iron/steel with zinc, which corrodes first as a sacrificial metal -- used for pipes, buckets, roofing."],
                  ["Electroplating", "A thin layer of a less reactive metal (chromium, nickel, silver) improves both looks and corrosion resistance."],
                  ["Alloying", "Mixing metals -- e.g. iron + chromium + nickel = stainless steel -- to resist corrosion far better than the pure metal."],
                ].map(([label, desc], i) => (
                  <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-black">{label}:</span> <span className="text-slate-300">{desc}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#1d121c]/40 border border-rose-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-300 font-mono">Rancidity</h3>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-300">
                  When fats and oils in food are oxidised by prolonged exposure to air, they turn rancid -- their taste and smell change for the worse, and the food may no longer be safe to eat. Chips, biscuits, ghee, and other fried foods left open too long are the classic example.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                {[
                  ["Airtight Storage", "Sealed containers keep oxygen and moisture away from the food, slowing oxidation."],
                  ["Refrigeration", "Lower temperatures directly slow the rate of oxidation, keeping food fresh longer."],
                  ["Antioxidants", "Chemicals like BHA and BHT are added to processed foods specifically to block oxidation."],
                  ["Nitrogen Packing", "Packets of chips are flushed with nitrogen gas to push out oxygen and stay fresh and crisp."],
                ].map(([label, desc], i) => (
                  <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-black">{label}:</span> <span className="text-slate-300">{desc}</span>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-[#0a2820]/40 to-teal-950/40 border border-emerald-500/20 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 font-mono">Quick Recap</h4>
                </div>
                <ul className="list-disc pl-5 text-[11.5px] text-slate-300 font-semibold space-y-1">
                  <li>A chemical equation must always be balanced -- atom counts must match on both sides, per the law of conservation of mass.</li>
                  <li>Combination: two or more reactants → one product. Decomposition: one reactant → two or more products (thermal / electrolytic / photolytic).</li>
                  <li>Exothermic reactions release heat (most combination reactions, respiration, burning); endothermic reactions absorb heat (most decomposition reactions).</li>
                  <li>Displacement: a more reactive element replaces a less reactive one. Double displacement: two compounds exchange ions, often producing a precipitate.</li>
                  <li>Oxidation is the gain of oxygen (or loss of hydrogen); reduction is the loss of oxygen (or gain of hydrogen); together they make a redox reaction.</li>
                  <li>Corrosion and rancidity are two everyday, unwanted consequences of oxidation -- and both can be slowed with the right prevention method.</li>
                </ul>
              </div>

            </div>
          )}

          {activeTopic === "important-reactions" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Important Reactions</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Every equation from the source material, gathered in one place and grouped by type -- a complete quick-reference sheet for last-minute revision.
                </p>
              </div>

              <SectionHeading>Word & Skeletal Equations</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Word equation">Magnesium + Oxygen → Magnesium oxide</ReactionRow>
                <ReactionRow label="Skeletal (unbalanced)">Mg + O₂ → MgO</ReactionRow>
                <ReactionRow label="Zinc + sulphuric acid">Zn + H₂SO₄ → ZnSO₄ + H₂</ReactionRow>
              </div>

              <SectionHeading>Balancing Worked Example</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Unbalanced">Fe + H₂O → Fe₃O₄ + H₂</ReactionRow>
                <ReactionRow label="Balanced, with states">3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)</ReactionRow>
              </div>

              <SectionHeading>Equations With Special Conditions</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Methanol synthesis (340 atm)">CO(g) + 2H₂(g) →(340 atm) CH₃OH(l)</ReactionRow>
                <ReactionRow label="Photosynthesis (sunlight, chlorophyll)">6CO₂(aq) + 12H₂O(l) →(sunlight/chlorophyll) C₆H₁₂O₆(aq) + 6O₂(aq) + 6H₂O(l)</ReactionRow>
              </div>

              <SectionHeading>Combination Reactions</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Slaking of quicklime">CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat</ReactionRow>
                <ReactionRow label="Whitewashing (2-3 days)">Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)</ReactionRow>
                <ReactionRow label="Burning of coal">C(s) + O₂(g) → CO₂(g)</ReactionRow>
                <ReactionRow label="Formation of water">2H₂(g) + O₂(g) → 2H₂O(l)</ReactionRow>
                <ReactionRow label="Burning of natural gas">CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)</ReactionRow>
                <ReactionRow label="Respiration">C₆H₁₂O₆(aq) + 6O₂(aq) → 6CO₂(aq) + 6H₂O(l) + energy</ReactionRow>
              </div>

              <SectionHeading>Decomposition Reactions</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Heating ferrous sulphate">2FeSO₄(s) →(Heat) Fe₂O₃(s) + SO₂(g) + SO₃(g)</ReactionRow>
                <ReactionRow label="Heating limestone">CaCO₃(s) →(Heat) CaO(s) + CO₂(g)</ReactionRow>
                <ReactionRow label="Heating lead nitrate">2Pb(NO₃)₂(s) →(Heat) 2PbO(s) + 4NO₂(g) + O₂(g)</ReactionRow>
                <ReactionRow label="Silver chloride in sunlight">2AgCl(s) →(sunlight) 2Ag(s) + Cl₂(g)</ReactionRow>
                <ReactionRow label="Silver bromide in sunlight">2AgBr(s) →(sunlight) 2Ag(s) + Br₂(g)</ReactionRow>
                <ReactionRow label="Electrolysis of water">2H₂O(l) →(electricity) 2H₂(g) + O₂(g)</ReactionRow>
              </div>

              <SectionHeading>Displacement Reactions</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Iron displaces copper">Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)</ReactionRow>
                <ReactionRow label="Zinc displaces copper">Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)</ReactionRow>
                <ReactionRow label="Lead displaces copper">Pb(s) + CuCl₂(aq) → PbCl₂(aq) + Cu(s)</ReactionRow>
              </div>

              <SectionHeading>Double Displacement Reactions</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Sodium sulphate + barium chloride">Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)</ReactionRow>
                <ReactionRow label="Lead nitrate + potassium iodide">Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)</ReactionRow>
              </div>

              <SectionHeading>Oxidation-Reduction (Redox) Reactions</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Copper oxidised">2Cu + O₂ →(Heat) 2CuO</ReactionRow>
                <ReactionRow label="Copper oxide reduced">CuO + H₂ →(Heat) Cu + H₂O</ReactionRow>
                <ReactionRow label="Carbon oxidised, ZnO reduced">ZnO + C → Zn + CO</ReactionRow>
                <ReactionRow label="HCl oxidised, MnO₂ reduced">MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂</ReactionRow>
              </div>

              <SectionHeading>Endothermic Demonstration</SectionHeading>
              <div className="grid grid-cols-1 gap-2">
                <ReactionRow label="Barium hydroxide + ammonium chloride">Ba(OH)₂(s) + 2NH₄Cl(s) → BaCl₂(aq) + 2NH₃(g) + 2H₂O(l)</ReactionRow>
              </div>

              <SectionHeading>Frequently-Tested Reactions From the Exercises</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ReactionRow label="Lead oxide + carbon">2PbO(s) + C(s) → 2Pb(s) + CO₂(g)</ReactionRow>
                <ReactionRow label="Thermite reaction">Fe₂O₃ + 2Al → Al₂O₃ + 2Fe</ReactionRow>
                <ReactionRow label="Iron filings + dilute HCl">Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)</ReactionRow>
                <ReactionRow label="Refining silver (copper displaces silver)">Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)</ReactionRow>
              </div>
            </div>
          )}

          {activeTopic === "ncert-activities" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">NCERT Lab Activities</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Every hands-on demonstration from the source material, gathered in one place with full materials, procedure, observation, and explanation -- for quick revision or lab-file reference.
                </p>
              </div>

              <ActivityCard
                title="Activity 1.1 -- Burning a Magnesium Ribbon"
                materials={["Magnesium ribbon (3-4 cm)", "Sandpaper", "Tongs", "Spirit lamp / burner", "Watch-glass", "Safety eyeglasses"]}
                procedure={[
                  "Clean a 3-4 cm strip of magnesium ribbon with sandpaper.",
                  "Hold it with tongs and burn it using a spirit lamp or burner, keeping it as far as possible from your eyes.",
                  "Collect the ash formed in a watch-glass.",
                ]}
                observation={["The ribbon burns with a dazzling white flame.", "It changes into a white powder (ash)."]}
                equation={<span>2Mg(s) + O₂(g) → 2MgO(s)</span>}
                explanation={["The white powder is magnesium oxide, formed by the reaction between magnesium and oxygen in the air. This is a combination reaction, and it is also exothermic (heat and light are given out)."]}
              />

              <ActivityCard
                title="Activity 1.2 -- Lead Nitrate + Potassium Iodide"
                materials={["Lead nitrate solution", "Potassium iodide solution", "Test tube"]}
                procedure={["Take lead nitrate solution in a test tube.", "Add potassium iodide solution to it and observe."]}
                observation={["A bright yellow precipitate forms immediately."]}
                equation={<span>Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)</span>}
                explanation={["The yellow solid is lead iodide, an insoluble precipitate formed by an exchange of ions between the two reactants -- this makes it a double displacement (precipitation) reaction."]}
              />

              <ActivityCard
                title="Activity 1.3 -- Zinc Granules + Dilute Acid"
                materials={["Zinc granules", "Dilute hydrochloric acid or dilute sulphuric acid", "Conical flask or test tube"]}
                procedure={["Take a few zinc granules in a conical flask or test tube.", "Add dilute hydrochloric acid or dilute sulphuric acid carefully.", "Observe what happens around the granules, and touch the flask to check its temperature."]}
                observation={["Bubbles of gas form vigorously around the zinc granules.", "The flask/test tube feels warm to the touch."]}
                equation={<span>Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)</span>}
                explanation={["Hydrogen gas is evolved (confirmed with a burning splint held at the mouth of the tube -- it burns with a pop) and the temperature rises, giving two of the classic signs that a chemical reaction has taken place."]}
              />

              <ActivityCard
                title="Activity 1.4 -- Slaking of Quicklime"
                materials={["Calcium oxide (quicklime)", "Water", "Beaker"]}
                procedure={["Take a small amount of calcium oxide in a beaker.", "Slowly add water to it and touch the side of the beaker."]}
                observation={["The beaker feels noticeably hot -- a large amount of heat is released."]}
                equation={<span>CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat</span>}
                explanation={["Calcium oxide (quicklime) and water combine to form the single product calcium hydroxide (slaked lime) -- a combination reaction that is also exothermic."]}
              />

              <ActivityCard
                title="Activity 1.5 -- Heating Ferrous Sulphate Crystals"
                materials={["Ferrous sulphate crystals (~2 g)", "Dry boiling tube", "Spirit lamp / burner"]}
                procedure={["Note the colour of the ferrous sulphate crystals.", "Heat the boiling tube over a flame and observe the colour after heating."]}
                observation={["The green crystals change colour on heating.", "A characteristic smell of burning sulphur is noticeable."]}
                equation={<span>2FeSO₄(s) →(Heat) Fe₂O₃(s) + SO₂(g) + SO₃(g)</span>}
                explanation={["Ferrous sulphate crystals lose their water of crystallization and then decompose into ferric oxide plus sulphur dioxide and sulphur trioxide gases -- a thermal decomposition reaction."]}
              />

              <ActivityCard
                title="Activity 1.6 -- Heating Lead Nitrate"
                materials={["Lead nitrate powder (~2 g)", "Boiling tube", "Tongs", "Burner"]}
                procedure={["Take about 2 g of lead nitrate powder in a boiling tube.", "Hold the boiling tube with tongs and heat it over a flame.", "Note any change observed."]}
                observation={["Brown fumes are emitted.", "A yellow solid remains in the boiling tube."]}
                equation={<span>2Pb(NO₃)₂(s) →(Heat) 2PbO(s) + 4NO₂(g) + O₂(g)</span>}
                explanation={["The brown fumes are nitrogen dioxide gas. A single reactant (lead nitrate) breaks down into three products -- lead oxide, nitrogen dioxide, and oxygen -- another example of thermal decomposition."]}
              />

              <ActivityCard
                title="Activity 1.7 -- Electrolysis of Water"
                materials={["Plastic mug with two carbon electrodes", "6 V battery", "Dilute sulphuric acid", "Two inverted test tubes"]}
                procedure={[
                  "Fill the mug with water and add a few drops of dilute sulphuric acid.",
                  "Immerse both carbon electrodes and place an inverted, water-filled test tube over each one.",
                  "Switch on the current and leave the setup undisturbed.",
                  "Test the gas collected in each tube by bringing a burning candle close to its mouth.",
                ]}
                observation={[
                  "Bubbles collect at both electrodes, displacing water upward into each test tube.",
                  "The volume of gas collected at one electrode is exactly double that at the other.",
                  "The gas that burns with a pop is hydrogen; the gas that relights a glowing splint is oxygen.",
                ]}
                equation={<span>2H₂O(l) →(electricity) 2H₂(g) + O₂(g)</span>}
                explanation={["Water is decomposed into hydrogen and oxygen gas by electricity -- an electrolytic decomposition, with hydrogen collected in double the volume of oxygen (matching the 2:1 ratio of H to O in H₂O)."]}
              />

              <ActivityCard
                title="Activity 1.8 -- Silver Chloride in Sunlight"
                materials={["Silver chloride (~2 g)", "China dish"]}
                procedure={["Note the initial white colour of the silver chloride.", "Place the china dish in direct sunlight for some time and observe the colour again."]}
                observation={["The white silver chloride gradually turns grey."]}
                equation={<span>2AgCl(s) →(sunlight) 2Ag(s) + Cl₂(g)</span>}
                explanation={["Light energy decomposes silver chloride into visible silver metal and chlorine gas -- a photolytic decomposition. Silver bromide behaves the same way, and this light-sensitivity is the basis of black-and-white photography."]}
              />

              <ActivityCard
                title="Activity: Barium Hydroxide + Ammonium Chloride"
                materials={["Barium hydroxide crystals (~2 g)", "Ammonium chloride (~1 g)", "Test tube", "Glass rod"]}
                procedure={["Take about 2 g of barium hydroxide in a test tube.", "Add 1 g of ammonium chloride and mix with a glass rod.", "Touch the bottom of the test tube with your palm."]}
                observation={["The bottom of the test tube feels distinctly cold."]}
                equation={<span>Ba(OH)₂(s) + 2NH₄Cl(s) → BaCl₂(aq) + 2NH₃(g) + 2H₂O(l)</span>}
                explanation={["The reaction absorbs heat from the surroundings (your palm) rather than releasing it -- the standard demonstration of an endothermic reaction."]}
              />

              <ActivityCard
                title="Activity 1.9 -- Iron Nails in Copper Sulphate Solution"
                materials={["Three clean iron nails", "Two test tubes (A, B)", "Copper sulphate solution (~10 mL each)", "Thread"]}
                procedure={[
                  "Clean three iron nails with sandpaper; keep one aside for comparison.",
                  "Tie the remaining two nails with thread and immerse them in copper sulphate solution in test tube B for about 20 minutes; leave test tube A undisturbed as a control.",
                  "After 20 minutes, remove the nails and compare colours in A and B.",
                ]}
                observation={[
                  "The immersed iron nails have turned brownish.",
                  "The blue colour of the copper sulphate solution in test tube B has faded compared to A.",
                ]}
                equation={<span>Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)</span>}
                explanation={["Iron, being more reactive than copper, displaces copper from copper sulphate solution -- a displacement reaction. The brown coating is deposited copper; the faded blue is due to the pale-green iron sulphate now in solution."]}
              />

              <ActivityCard
                title="Activity 1.10 -- Sodium Sulphate + Barium Chloride"
                materials={["Sodium sulphate solution (~3 mL)", "Barium chloride solution (~3 mL)", "Two test tubes"]}
                procedure={["Take the two solutions in separate test tubes.", "Mix them together and observe."]}
                observation={["A white, water-insoluble substance forms immediately."]}
                equation={<span>Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)</span>}
                explanation={["The white precipitate is barium sulphate. Sodium chloride, the other product, stays dissolved -- this exchange of ions between the reactants makes it a double displacement (precipitation) reaction."]}
              />

              <ActivityCard
                title="Activity 1.11 -- Heating Copper Powder"
                materials={["Copper powder (~1 g)", "China dish", "Heat source", "Hydrogen gas supply (optional, for reverse step)"]}
                procedure={["Heat a china dish containing about 1 g of copper powder strongly in air.", "Optionally, pass hydrogen gas over the heated black coating."]}
                observation={["The copper surface becomes coated with a black substance.", "Passing hydrogen over the heated coating turns it back to brown."]}
                equation={<span>2Cu + O₂ →(Heat) 2CuO,&nbsp;&nbsp; then&nbsp;&nbsp; CuO + H₂ →(Heat) Cu + H₂O</span>}
                explanation={["Copper gains oxygen and is oxidised to black copper(II) oxide. When hydrogen is then passed over it, CuO loses oxygen (is reduced) back to copper while hydrogen gains oxygen (is oxidised) -- together, this pair of steps is a redox reaction."]}
              />

              <ActivityCard
                title="Group Activity -- Classifying Dissolution Reactions by Heat Exchange"
                materials={["Four beakers labelled A, B, C, D", "Water", "Copper sulphate solution", "Potassium sulphate", "Ammonium nitrate", "Anhydrous copper sulphate", "Iron filings", "Thermometer"]}
                procedure={[
                  "Put 25 mL of water in beakers A, B, and C, and 25 mL of copper sulphate solution in beaker D.",
                  "Measure and record the initial temperature of each.",
                  "Add two spatulas of potassium sulphate to A, ammonium nitrate to B, anhydrous copper sulphate to C, and iron filings to D, stirring each.",
                  "Measure the final temperature of each mixture and classify it as exothermic or endothermic.",
                ]}
                observation={[
                  "A (potassium sulphate + water): temperature drops slightly.",
                  "B (ammonium nitrate + water): temperature drops noticeably.",
                  "C (anhydrous copper sulphate + water): temperature rises.",
                  "D (iron filings + copper sulphate solution): temperature rises.",
                ]}
                explanation={["A and B are endothermic (they absorb heat while dissolving); C and D are exothermic (hydration of the anhydrous salt, and the iron-copper displacement reaction, both release heat)."]}
              />
            </div>
          )}

          {activeTopic === "mind-map" && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">Mind Map</h1>
                <p className="text-sm font-semibold text-slate-400">
                  The complete chapter, condensed into six branches -- a one-glance visual summary for a final revision pass.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <FlaskConical className="w-8 h-8 text-slate-950" />
                </div>
                <h2 className="text-base font-black text-white tracking-tight">Chemical Reactions & Equations</h2>
                <p className="text-[11px] text-slate-400 font-mono uppercase tracking-widest">Complete Chapter Map</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <MindMapBranch
                  icon={Sparkles}
                  title="What Is a Reaction?"
                  color="cyan"
                  isLightMode={isLightMode}
                  points={[
                    "Reactants → Products",
                    "Bonds break & new bonds form",
                    "5 signs: state, colour, gas, temperature, precipitate",
                  ]}
                />
                <MindMapBranch
                  icon={BookOpen}
                  title="Equations & Balancing"
                  color="emerald"
                  isLightMode={isLightMode}
                  points={[
                    "Word eqn → chemical eqn",
                    "Law of conservation of mass",
                    "Hit-and-trial / algebraic method",
                    "State symbols: (s) (l) (g) (aq)",
                  ]}
                />
                <MindMapBranch
                  icon={Beaker}
                  title="Types of Reactions"
                  color="indigo"
                  isLightMode={isLightMode}
                  points={[
                    "Combination: A + B → AB",
                    "Decomposition: AB → A + B",
                    "Displacement: A + BC → AC + B",
                    "Double displacement: AB + CD → AD + CB",
                  ]}
                />
                <MindMapBranch
                  icon={Flame}
                  title="Exothermic & Endothermic"
                  color="orange"
                  isLightMode={isLightMode}
                  points={[
                    "Exothermic: heat released (combustion, respiration)",
                    "Endothermic: heat absorbed (most decomposition)",
                    "Ba(OH)₂ + NH₄Cl → cools down",
                  ]}
                />
                <MindMapBranch
                  icon={Award}
                  title="Oxidation & Reduction"
                  color="amber"
                  isLightMode={isLightMode}
                  points={[
                    "Oxidation: gain O / lose H",
                    "Reduction: lose O / gain H",
                    "Both together = redox reaction",
                    "Oxidising agent vs. reducing agent",
                  ]}
                />
                <MindMapBranch
                  icon={ShieldAlert}
                  title="Corrosion & Rancidity"
                  color="rose"
                  isLightMode={isLightMode}
                  points={[
                    "Corrosion: rusting, tarnishing -- prevented by painting, galvanising, alloying",
                    "Rancidity: oxidised fats/oils -- prevented by airtight storage, antioxidants, N₂ flushing",
                  ]}
                />
              </div>

              <RememberBox title="How to use this map">
                Cover the bullet points under each branch and try to recall them just from the branch title -- if you can rebuild all six branches from memory, you know this chapter cold.
              </RememberBox>
            </div>
          )}

          {/* Previous Topic / Next Topic navigation -- mirrors the same pattern used in the
              Physics notes. The first topic has no "Previous" button; the last
              topic's "Next" slot is replaced with a CTA into Solved NCERT / Question Bank. */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = CHEM_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(CHEM_TOPICS[currentIndex - 1].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[11px] cursor-pointer transition ${
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
              const currentIndex = CHEM_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < CHEM_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(CHEM_TOPICS[currentIndex + 1].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[11px] cursor-pointer transition ${
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
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-[11.5px] cursor-pointer hover:from-emerald-450 hover:to-teal-450 shadow-md border border-emerald-400/30 shrink-0"
                    >
                      Complete & Go to Solved NCERT
                      <ChevronRight className="w-3.5 h-3.5 font-bold" />
                    </button>
                    {onGoToSelfAssessment && (
                      <button
                        onClick={onGoToSelfAssessment}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[11.5px] cursor-pointer hover:from-cyan-350 hover:to-blue-450 shadow-md border border-cyan-400/30 shrink-0"
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
                    onClick={() => setActiveTopic(CHEM_TOPICS[0].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[11px] cursor-pointer transition ${
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

export default LearnChemistry;
