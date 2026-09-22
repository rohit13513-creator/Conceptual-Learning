import React, { useState } from "react";
import { Award, HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Compass, Ruler, ScrollText, Sparkles, Link2, Network, Trophy, Lightbulb, Users } from "lucide-react";
import { ModelSimplifyDiagram, UnitsSymbolsDiagram, LawTheoryPrincipleDiagram, PredictionLoopDiagram, EstimationDiagram, BranchesDiagram, FoundationsMindMap } from "./foundations9Diagrams";

// Notes for "How Science Works". Simple words, short sentences, point by point.

const IMG_BASE = "/diagrams/foundations9/";
interface Pic { file: string; alt: string; caption: string; }
type SvgKey = "model" | "units" | "ladder" | "loop" | "estimate" | "branches" | "mind";

type Block =
  | { t: "card"; title: string; body: React.ReactNode[] }
  | { t: "h"; text: string }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "facts"; rows: [string, React.ReactNode][] }
  | { t: "compare"; left: string; right: string; rows: [string, string][] }
  | { t: "remember"; title: string; body: React.ReactNode }
  | { t: "img"; pic: Pic }
  | { t: "imgs"; pics: Pic[] }
  | { t: "svg"; key: SvgKey; caption: string }
  | { t: "exq"; n: number; q: string; a: string }
  | { t: "activity"; title: string; aim: string; steps: string[]; observation: string; conclusion: string }
  | { t: "done"; items: string[] }
  | { t: "p"; body: React.ReactNode };

interface Topic { id: string; title: string; category: string; heading: string; sub: string; blocks: Block[]; }

const b = (s: string) => <b>{s}</b>;

const TOPICS: Topic[] = [
  {
    id: "models",
    title: "1. Learning to Model the World",
    category: "Models",
    heading: "Learning to Model the World",
    sub: "Science looks closely at nature by keeping only what matters for a question.",
    blocks: [
      { t: "img", pic: { file: "forest-students", alt: "Students looking closely at plants in a forest with a magnifying glass", caption: "Looking closely, asking questions, finding out how things work" } },
      { t: "card", title: "Core Idea", body: [
        <>The natural world is complex. Studying every detail of it is often impossible. So science uses {b("models")}: simplified pictures of a real system that keep only what matters for a given question.</>,
        <>A moving car can be shown as a single point. Atoms and molecules are drawn as spheres and bonds. A cell is shown as a diagram with its key parts. The Earth can be treated as a smooth sphere with layers.</>,
      ] },
      { t: "ul", items: [
        <>Making a model means {b("making assumptions")} and {b("leaving out")} some details on purpose.</>,
        <>Studying a falling object, we often ignore air resistance to see the basic effect of gravity.</>,
        <>Studying how the heart pumps blood, we ignore the many individual cells and study the heart as one working pump.</>,
        <>Leaving out details is {b("not a mistake")}. It is done on purpose, to keep things simple enough while still answering the question.</>,
      ] },
      { t: "h", text: "A Cricket Shot" },
      { t: "ul", items: [
        <>A ball is hit for a six. The real question is: will it cross the boundary without hitting the ground first?</>,
        <>The brand of the bat, the colour of the ball, and the grass on the field make no real difference to this question.</>,
        <>The {b("mass of the ball")} and the {b("speed and direction")} it is hit in matter a great deal.</>,
        <>Air resistance, the spin of the ball and the stitching at the seam have smaller effects. A simple model can leave them out. A more careful model adds them back for greater accuracy.</>,
      ] },
      { t: "svg", key: "model", caption: "A simple model keeps only what answers the question" },
      { t: "remember", title: "Try it: riding home from school", body: <>Think about modelling the time it takes to bike home from school. Distance and average speed matter. Whether you stop at a shop on the way is a detail you could add later, or leave out for a first, simple answer.</> },
      { t: "h", text: "Simplifying the Stars" },
      { t: "img", pic: { file: "saha-stamp", alt: "An Indian postage stamp showing the physicist Meghnad Saha", caption: "Meghnad Saha on an Indian postage stamp" } },
      { t: "ul", items: [
        <>When the physicist {b("Meghnad Saha")} studied the light from stars, he did not try to model every atom, every reaction or every movement inside a star.</>,
        <>He treated the matter in a star as a hot gas, ignored many complex processes, and focused only on temperature, pressure, and how atoms lose or gain electrons to form ions.</>,
        <>This simple model explained how the colour of a star is connected to its temperature.</>,
      ] },
    ],
  },
  {
    id: "language",
    title: "2. The Precise Language of Science",
    category: "Language",
    heading: "The Precise Language of Science",
    sub: "Everyday words get exact meanings, and quantities get symbols and standard units.",
    blocks: [
      { t: "card", title: "Words with exact meanings", body: [
        <>Words we use every day, such as {b("force")}, {b("work")}, {b("cell")} or {b("reaction")}, get a very specific meaning in science.</>,
        <>This lets scientists everywhere describe what they observe, compare results, and build ideas together without confusion.</>,
      ] },
      { t: "svg", key: "units", caption: "A quantity has a name, a symbol and a unit" },
      { t: "ul", items: [
        <>Quantities such as mass, velocity, force and electric current are given symbols: {b("m")}, {b("v")}, {b("F")}, {b("I")}. Each symbol goes with a defined unit.</>,
        <>Science often turns to {b("mathematics")} so that the relationship between quantities can be stated clearly and tested carefully.</>,
        <>An equation is not just a tool for calculating a number. It is a compact sentence about how quantities are related.</>,
        <>Using mathematics in science does not mean memorising equations. It means understanding the situation, finding the quantities that matter, and then reasoning with the relationship between them.</>,
      ] },
      { t: "h", text: "Why Standard Units Matter" },
      { t: "img", pic: { file: "vegetable-seller", alt: "A vegetable seller weighing vegetables on a pan balance", caption: "A kilogram means the same amount everywhere" } },
      { t: "ul", items: [
        <>When we buy rice or vegetables, we expect a kilogram to mean the same amount everywhere. Measurements are based on {b("agreed international standards")}, not on local objects or local opinions.</>,
        <>Standard units let results be compared fairly, in science and in everyday trade.</>,
      ] },
      { t: "remember", title: "A real mix-up: an aircraft running low on fuel", body: <>A passenger aircraft once needed 22 300 kg of fuel. The ground crew used the density of the fuel in pounds per litre instead of kilograms per litre. The plane ended up about 15 000 litres short of fuel mid-flight, and had to glide to an emergency landing. Using one standard system of units everywhere avoids this kind of costly mix-up.</> },
      { t: "remember", title: "Where does a symbol come from?", body: <>Scientific symbols often come from history and international agreement, not just convenience. The speed of light is written as {b("c")}, from the Latin word celeritas, meaning speed. Today the speed of light is defined to be exactly 299 792 458 m/s.</> },
    ],
  },
  {
    id: "laws",
    title: "3. Laws, Theories and Principles",
    category: "Science Ideas",
    heading: "Laws, Theories and Principles",
    sub: "Three words that sound alike in daily talk, but mean different things in science.",
    blocks: [
      { t: "svg", key: "ladder", caption: "A pattern becomes a law, an explanation of it becomes a theory, and a broad guiding idea is a principle" },
      { t: "facts", rows: [
        ["Law", "A regular pattern seen in nature, often written in words or as a mathematical relationship. Example: Newton's laws of motion explain the jerk felt when a bus stops suddenly"],
        ["Theory", "An explanation of why a pattern happens, based on evidence gathered and tested over time. Example: the atomic theory explains how molecules are formed from atoms"],
        ["Principle", "A broad idea that helps us make sense of many situations. Example: the principle of conservation of energy applies when you climb a flight of stairs"],
      ] },
      { t: "remember", title: "A theory is not a guess", body: <>In everyday talk, "just a theory" can sound like a guess. In science, a {b("theory")} is an explanation built on careful testing and checking, not an untested idea. Even so, theories stay open to being improved or changed as new evidence turns up.</> },
    ],
  },
  {
    id: "prediction",
    title: "4. Making Predictions That Can Be Tested",
    category: "Predictions",
    heading: "Making Predictions That Can Be Tested",
    sub: "A good scientific idea lets us say what should happen before we check.",
    blocks: [
      { t: "card", title: "Why prediction matters", body: [
        <>When laws, theories and models are well tested, they let us say what will happen under new conditions, often before we even run an experiment.</>,
        <>Motion tells us how far a kicked football will travel. Chemistry tells us how much carbon dioxide a reaction will give off, or how soft a baked loaf of bread will be. Biology tells us how our breathing changes while running.</>,
        <>These predictions are {b("reasoned expectations")} based on evidence, not guesses.</>,
      ] },
      { t: "svg", key: "loop", caption: "Prediction and testing keep improving our ideas" },
      { t: "ul", items: [
        <>When a prediction {b("matches")} what is observed, confidence in the idea behind it grows.</>,
        <>When it does {b("not match")}, scientists look again at their assumptions, their model, or their measurements, and improve them.</>,
      ] },
      { t: "h", text: "Can This Prediction Be Tested?" },
      { t: "ul", items: [
        <>Someone says, "It will rain this afternoon because the clouds look dark." A yes-or-no feeling is not enough to test.</>,
        <>Better questions ask for measurable evidence and past patterns: How dark were the clouds the last time it rained? What is the humidity today? What is today's wind speed and direction? Is the temperature dropping the way it did before earlier rains?</>,
      ] },
      { t: "remember", title: "Even good forecasts have limits", body: <>Weather depends on many changing factors: temperature, pressure, humidity, wind. Tiny differences in starting conditions can grow over time into very different outcomes. That is why forecasts are usually reliable for a few hours or days, but less certain further ahead. This is a limit of the model, not a failure of science.</> },
      { t: "h", text: "Checking a Claim: Food During an Eclipse" },
      { t: "img", pic: { file: "solar-eclipse", alt: "A total solar eclipse showing the corona around a dark moon", caption: "A total solar eclipse is a play of shadows" } },
      { t: "ul", items: [
        <>A common claim: "food becomes harmful during an eclipse." An eclipse is simply a play of shadows.</>,
        <>Ask simple, testable questions: does the temperature change enough to matter? Does food left in any shadow go bad? No physical, chemical or biological reason supports the claim.</>,
      ] },
      { t: "remember", title: "No idea is beyond question", body: <>Even the most successful ideas have limits, and can fail under new or more precise conditions. This is not a weakness. When a prediction does not match, scientists change their minds only because of evidence, never because of opinion or belief. No scientific idea is ever completely final.</> },
    ],
  },
  {
    id: "estimation",
    title: "5. Estimating a Reasonable Answer",
    category: "Estimation",
    heading: "Estimating a Reasonable Answer",
    sub: "A rough number, checked in more than one way, can be more useful than a wrong exact one.",
    blocks: [
      { t: "card", title: "Why estimate?", body: [
        <>A useful habit: first understand the situation, then find the quantities that matter, and then make a rough estimate to see if an answer feels reasonable.</>,
        <>An exact value is not always needed, especially early on. An approximate estimate is often enough to tell whether a result is sensible or clearly wrong.</>,
        <>Estimating builds intuition, helps catch errors, and builds confidence in reasoning. Careful reasoning matters at least as much as an exact calculation.</>,
      ] },
      { t: "h", text: "Feeding a Family for a Month" },
      { t: "img", pic: { file: "rice-cooking", alt: "Rice being cooked on a gas stove", caption: "Rice being cooked on a gas stove" } },
      { t: "ul", items: [
        <>How much rice would feed a family of four for a month? Assume all their calories come from rice.</>,
        <>An adult needs roughly 2000 to 2500 kilocalories a day. Find how many calories 100 g of cooked rice gives, and scale up.</>,
        <>The goal is not an exact figure. It is to check that the answer feels right: 100 g for a whole month is clearly too little, and a few tonnes is clearly too much.</>,
      ] },
      { t: "h", text: "How Much Air Do You Breathe in a Day?" },
      { t: "svg", key: "estimate", caption: "Two rough methods that land close to each other" },
      { t: "ul", items: [
        <>{b("Method 1:")} at rest we take about 12 to 15 breaths a minute. In a day (60 x 24 = 1440 minutes) that is roughly 18 000 to 22 000 breaths, about 20 000 breaths a day. It takes about 4 to 5 breaths to fill a 2 litre party balloon, so one breath is about 0.5 litre. That gives about {b("10 000 litres")} a day.</>,
        <>{b("Method 2:")} a balloon takes about 20 seconds to blow up, so about 3 balloons a minute. 3 balloons/minute x 2 litres/balloon x 1440 minutes/day gives about {b("8 640 litres")}.</>,
        <>The two rough methods land close to each other, which suggests the estimate of about 10 000 litres a day is reasonable. (Blowing balloons non-stop is far more tiring than normal restful breathing, so this comparison is only for checking the number.)</>,
      ] },
      { t: "remember", title: "When to be exact, and when to estimate", body: <>An estimate is good enough when checking if a plan is roughly workable, like guessing how much rice to buy. An exact value is needed when a small error matters a lot, like a dose of medicine or the amount of fuel a plane needs to complete a flight.</> },
    ],
  },
  {
    id: "branches",
    title: "6. Branches of Science Working Together",
    category: "Connections",
    heading: "Branches of Science Working Together",
    sub: "Physics, chemistry, biology and earth science are divisions we made, not walls in nature.",
    blocks: [
      { t: "card", title: "Divisions we made, not walls in nature", body: [
        <>Science is often divided into branches: {b("physics")}, {b("chemistry")}, {b("biology")} and {b("earth science")}. These divisions help us organise knowledge.</>,
        <>The natural world itself does not have such boundaries. Most real problems, such as understanding climate change, developing medicines, or designing sustainable technology, need ideas from several branches at once.</>,
        <>Science also connects with mathematics, technology, arts and social sciences.</>,
      ] },
      { t: "h", text: "How Does a Mask Really Work?" },
      { t: "img", pic: { file: "surgical-masks", alt: "A collection of surgical masks of different colours", caption: "Understanding a mask needs more than one branch of science" } },
      { t: "svg", key: "branches", caption: "One everyday object, four branches of science" },
      { t: "ul", items: [
        <>{b("Physics:")} how particles move in the air, and how static attraction pulls tiny particles towards the fibres.</>,
        <>{b("Chemistry:")} the properties of the polymer fibres the mask is made of.</>,
        <>{b("Biology:")} the size and behaviour of viruses the mask should stop.</>,
        <>{b("Mathematics:")} modelling the airflow and how well the mask filters the air.</>,
      ] },
    ],
  },
  {
    id: "human",
    title: "7. Science Is a Human Activity",
    category: "Connections",
    heading: "Science Is a Human Activity",
    sub: "Curiosity, creativity and careful questioning, carried out by people across the world.",
    blocks: [
      { t: "ul", items: [
        <>Science is not just a pile of facts, equations or experiments. It is a human activity shaped by {b("curiosity")}, {b("creativity")}, {b("collaboration")} and careful questioning.</>,
        <>It grows as people ask questions, test ideas, share their results, and learn from mistakes. It has grown over time through the work of many people across many cultures and generations.</>,
      ] },
      { t: "remember", title: "Why this matters even if you stop studying science", body: <>Scientific thinking helps you understand the technology around you, judge information carefully, and make sense of the world you live in, whatever you go on to do.</> },
      { t: "h", text: "A Habit Worth Building" },
      { t: "ul", items: [
        <>Think of a prediction you or your family recently made, such as the outcome of a match. Was it based on evidence and reasoning, or mostly on guesswork?</>,
        <>Pick a real object, such as a pressure cooker or a phone, or a problem, such as a traffic jam near your school. List which ideas from physics, chemistry, biology, earth science or mathematics are involved, and see how at least two branches connect.</>,
      ] },
    ],
  },
  {
    id: "mindmap",
    title: "8. Mind Map",
    category: "Revision",
    heading: "Mind Map",
    sub: "The whole topic on one page.",
    blocks: [
      { t: "svg", key: "mind", caption: "Mind map: how science works" },
      { t: "h", text: "Key Points at a Glance" },
      { t: "facts", rows: [
        ["Model", "A simplified picture that keeps only what matters for a question"],
        ["Symbol and unit", "Every quantity has a defined symbol and a standard unit"],
        ["Law", "A pattern seen again and again in nature"],
        ["Theory", "A tested explanation of why a pattern happens"],
        ["Principle", "A broad idea used across many situations"],
        ["Prediction", "A reasoned expectation based on evidence, checked by testing"],
        ["Estimate", "A rough, reasonable answer used to check if a result makes sense"],
        ["Branches of science", "Divisions we made to organise knowledge; real problems often need more than one"],
      ] },
    ],
  },
  {
    id: "competitive-1",
    title: "9. Competitive Corner: Ideas",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "The main topic is enough for school exams. These ideas take you one step further.",
    blocks: [
      { t: "card", title: "The Scientific Method, Step by Step", body: [
        <>{b("Observation")}: noticing something in nature. {b("Question")}: asking why or how it happens.</>,
        <>{b("Hypothesis")}: a testable guess that tries to explain the observation. {b("Experiment")}: a fair test of the hypothesis. {b("Conclusion")}: what the results show, and whether the hypothesis should be kept, changed or dropped.</>,
        <>A hypothesis that survives many tests, over time and by many people, can grow into a theory.</>,
      ] },
      { t: "card", title: "Fair Tests: Variables", body: [
        <>An {b("independent variable")} is the one you deliberately change. A {b("dependent variable")} is the one you measure, which may change because of it.</>,
        <>{b("Controlled variables")} are kept the same on purpose, so that only the independent variable can explain any change in the result.</>,
        <>A {b("control group")} is not given the treatment being tested, so it can be compared with the group that is.</>,
      ] },
      { t: "card", title: "Accuracy vs Precision", body: [
        <>{b("Accuracy")} means how close a measurement is to the true value. {b("Precision")} means how close repeated measurements are to each other.</>,
        <>Measurements can be precise but not accurate (consistently off by the same amount), or accurate on average but not precise (scattered around the true value).</>,
      ] },
      { t: "facts", rows: [
        ["Seven SI base units", "metre (length), kilogram (mass), second (time), ampere (current), kelvin (temperature), mole (amount of substance), candela (luminous intensity)"],
        ["Order of magnitude", "A quantity's size rounded to the nearest power of ten, useful for a quick sanity check on an estimate"],
        ["Scientific notation", "Writing a number as a value between 1 and 10 times a power of ten, such as 3 x 10^8 m/s for the speed of light"],
        ["Dimensional analysis", "Checking that both sides of an equation have matching units, a quick way to catch a wrong formula"],
        ["Reproducibility", "A result is trusted more when other people, in other places, get the same result by repeating the test"],
        ["Peer review", "Other scientists check a piece of work before it is accepted and published, looking for errors and gaps"],
        ["Occam's razor", "Among explanations that fit the evidence equally well, the simplest one is usually preferred"],
        ["Falsifiability", "A scientific idea must be capable of being shown wrong by some possible observation, or it is not truly scientific"],
        ["Paradigm shift", "A big change in scientific understanding, such as the shift from an Earth-centred to a Sun-centred solar system, or the discovery that germs cause disease"],
        ["Scientific temper", "The habit of asking for evidence before accepting a claim, in science and in daily life"],
      ] },
      { t: "remember", title: "Traps to avoid", body: <>(1) A theory is not a guess; it is a tested explanation. (2) A model leaving out details is a deliberate choice, not sloppiness. (3) An estimate is meant to check reasonableness, not replace an exact calculation where one is needed. (4) Correlation (two things happening together) is not the same as causation (one causing the other).</> },
    ],
  },
  {
    id: "competitive-2",
    title: "10. Competitive Corner: Solved",
    category: "Advanced",
    heading: "Solved Practice Questions",
    sub: "Try each one on paper first. Then check.",
    blocks: [
      { t: "exq", n: 1, q: "A classroom has 40 students. Estimate how many students in your whole town or city might be studying in Class 9, if the town has about 200 schools of a similar size.", a: "40 students x 200 schools = about 8 000 students. This is a rough order-of-magnitude estimate: the real number could be somewhat higher or lower, but it should not be off by a factor of 10 or more." },
      { t: "exq", n: 2, q: "Roughly how many seconds are there in one year? Give your answer as a rough estimate, then check with a calculation.", a: "Rough estimate: about 365 days x 24 hours x 3600 seconds is close to 3 x 10^7 seconds (about 31.5 million seconds), a number worth remembering for quick estimates." },
      { t: "exq", n: 3, q: "A recipe calls for 250 g of rice per person. Estimate how many kilograms of rice a school canteen needs for a lunch serving 300 students.", a: "250 g x 300 = 75 000 g = 75 kg. A canteen would round this up a little to allow for seconds and wastage, perhaps to about 80 kg." },
      { t: "exq", n: 4, q: "Which of these is a law, which is a theory and which is a principle: (i) objects fall towards the Earth with a constant acceleration near its surface (ii) energy is neither created nor destroyed, only changed in form (iii) the germ theory, which explains disease as being caused by microorganisms?", a: "(i) A law: it is an observed regular pattern. (ii) A principle: a broad idea applied across many situations. (iii) A theory: it explains why a pattern (illness) happens, based on tested evidence." },
      { t: "exq", n: 5, q: "A student measures the length of the same pencil five times and gets 14.2, 14.2, 14.3, 14.2 and 14.2 cm, but the true length (checked with a standard scale) is 14.5 cm. Is this measurement precise, accurate, both or neither?", a: "The five readings are very close to each other, so the measurement is precise. But they are all off from the true value of 14.5 cm, so it is not accurate. This is a case of precise but not accurate measurement, perhaps due to a small error in the measuring tool." },
      { t: "exq", n: 6, q: "A tablet claims 'boosts memory in 7 days' based on one person's experience. What is missing to call this a scientific claim?", a: "It is missing a fair test: a control group who did not take the tablet, enough people tested (not just one), a way to measure memory in a repeatable way, and a check that other researchers get the same result." },
      { t: "exq", n: 7, q: "Write 0.000056 m in scientific notation, and give its order of magnitude.", a: "0.000056 m = 5.6 x 10^-5 m. Its order of magnitude is 10^-5." },
      { t: "exq", n: 8, q: "Two students argue: one says a claim already believed by everyone must be true, the other says a claim already believed by everyone should still be tested if new evidence appears. Who is reasoning more scientifically, and why?", a: "The second student. In science, no idea is beyond question. Even long-held explanations are revised if careful testing turns up evidence against them." },
    ],
  },
  {
    id: "complete",
    title: "11. Topic Complete",
    category: "Complete",
    heading: "Topic Complete",
    sub: "Well done. Check what you can now do.",
    blocks: [
      { t: "done", items: [
        "I can explain why science uses models, and give my own example of one.",
        "I can explain why quantities need symbols and standard units.",
        "I can tell apart a law, a theory and a principle, with an example of each.",
        "I can judge whether a prediction is testable, and suggest better questions.",
        "I can make a rough estimate and check it a second way.",
        "I can name at least two branches of science involved in an everyday object.",
        "I can explain why no scientific idea is ever completely final.",
      ] },
      { t: "facts", rows: [
        ["Model", "Keeps only what matters for the question"],
        ["Law, theory, principle", "Pattern, tested explanation, broad guiding idea"],
        ["Prediction", "A reasoned expectation, checked against evidence"],
        ["Estimate", "A rough, sensible answer, checked more than one way"],
      ] },
      { t: "remember", title: "What to do next", body: <>Go to the Question Bank for practice. Then take the Self Assessment quiz to check how well you know the topic. If you make mistakes, come back to the topic and read it again.</> },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Models: Compass, Language: Ruler, "Science Ideas": ScrollText, Predictions: Sparkles, Estimation: Ruler, Connections: Link2, Revision: Network, Advanced: Award, Complete: Trophy };

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0a1a1f] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
    <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-cyan-400" /><h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">{title}</h3></div>
    <div className="space-y-3 text-sm font-semibold leading-relaxed text-slate-300">{children}</div>
  </div>
);
const RememberBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {title}</h5>
    <div className="text-[14px] leading-relaxed">{children}</div>
  </div>
);
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-cyan-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span>{children}</span></div>
);
const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sm text-slate-300 font-semibold"><span className="text-white font-black">{label}:</span> <span>{children}</span></div>
);
const CompareTable: React.FC<{ left: string; right: string; rows: [string, string][]; isLightMode: boolean }> = ({ left, right, rows, isLightMode }) => (
  <div className={`overflow-hidden rounded-xl border ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
    <div className={`grid grid-cols-2 text-[12.5px] font-black uppercase tracking-wider ${isLightMode ? "bg-slate-800 text-white" : "bg-cyan-950/50 text-cyan-300"}`}>
      <div className="px-3 py-2 border-r border-slate-700/50">{left}</div><div className="px-3 py-2">{right}</div>
    </div>
    <div className={`divide-y ${isLightMode ? "divide-slate-200" : "divide-slate-800"}`}>
      {rows.map(([l, r], i) => (
        <div key={i} className={`grid grid-cols-2 text-[14px] font-semibold ${isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
          <div className={`px-3 py-2 border-r ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>{l}</div><div className="px-3 py-2">{r}</div>
        </div>
      ))}
    </div>
  </div>
);
const PicCard: React.FC<{ pic: Pic; isLightMode: boolean }> = ({ pic, isLightMode }) => (
  <figure className="space-y-2 m-0">
    <div className={`rounded-2xl border p-3 shadow-lg bg-white flex items-center justify-center ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
      <img src={IMG_BASE + pic.file + ".webp"} alt={pic.alt} loading="lazy" className="w-auto h-auto max-w-full max-h-[440px] object-contain" />
    </div>
    <figcaption className="text-center text-[13px] font-bold text-slate-500">{pic.caption}</figcaption>
  </figure>
);
const ExampleQ: React.FC<{ n: number; q: string; a: string }> = ({ n, q, a }) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
    <p className="text-sm font-bold leading-relaxed"><span className="text-cyan-400 font-mono">Q{n}.</span> {q}</p>
    <p className="text-sm font-semibold leading-relaxed"><span className="text-emerald-400 font-black">Answer: </span>{a}</p>
  </div>
);

function renderSvg(key: SvgKey) {
  switch (key) {
    case "model": return <ModelSimplifyDiagram />;
    case "units": return <UnitsSymbolsDiagram />;
    case "ladder": return <LawTheoryPrincipleDiagram />;
    case "loop": return <PredictionLoopDiagram />;
    case "estimate": return <EstimationDiagram />;
    case "branches": return <BranchesDiagram />;
    case "mind": return <FoundationsMindMap />;
  }
}

function renderBlock(block: Block, i: number, isLightMode: boolean) {
  switch (block.t) {
    case "card": return <InfoCard key={i} title={block.title}>{block.body.map((p, j) => <p key={j}>{p}</p>)}</InfoCard>;
    case "h": return <SectionHeading key={i}>{block.text}</SectionHeading>;
    case "p": return <p key={i} className="text-sm font-semibold leading-relaxed">{block.body}</p>;
    case "ul": return <ul key={i} className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    case "facts": return <div key={i} className="grid grid-cols-1 gap-2.5">{block.rows.map(([l, r], j) => <FactRow key={j} label={l}>{r}</FactRow>)}</div>;
    case "compare": return <CompareTable key={i} left={block.left} right={block.right} rows={block.rows} isLightMode={isLightMode} />;
    case "remember": return <RememberBox key={i} title={block.title}>{block.body}</RememberBox>;
    case "img": return <PicCard key={i} pic={block.pic} isLightMode={isLightMode} />;
    case "imgs": return <div key={i} className={`grid grid-cols-1 gap-4 ${block.pics.length > 1 ? "sm:grid-cols-2" : ""}`}>{block.pics.map((p) => <PicCard key={p.file} pic={p} isLightMode={isLightMode} />)}</div>;
    case "exq": return <ExampleQ key={i} n={block.n} q={block.q} a={block.a} />;
    case "svg": return (
      <figure key={i} className="space-y-2 m-0">
        <div className={`rounded-2xl border p-3 shadow-lg bg-white overflow-x-auto ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
          <div className={block.key === "mind" ? "min-w-[640px]" : ""}>{renderSvg(block.key)}</div>
        </div>
        <figcaption className="text-center text-[13px] font-bold text-slate-500">{block.caption}</figcaption>
      </figure>
    );
    case "activity": return (
      <div key={i} className={`rounded-2xl border p-5 space-y-4 shadow-md ${isLightMode ? "bg-white border-slate-200" : "bg-[#0a1a1f] border-cyan-500/15"}`}>
        <div className="flex items-start gap-2.5"><FlaskConical className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" /><h3 className="text-base font-black leading-snug">{block.title}</h3></div>
        <p className="text-sm font-semibold leading-relaxed"><span className="text-cyan-400 font-black">Aim: </span>{block.aim}</p>
        <SectionHeading>Steps</SectionHeading>
        <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">{block.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
        <RememberBox title="What you see">{block.observation}</RememberBox>
        <RememberBox title="What it shows">{block.conclusion}</RememberBox>
      </div>
    );
    case "done": return (
      <div key={i} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
        <div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-400" /><h3 className="text-base font-black text-emerald-300">You have finished this topic</h3></div>
        <ul className="space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed"><span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500 text-slate-950 text-[12px] font-black flex items-center justify-center">✓</span><span>{it}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

interface LearnFoundations9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnFoundations9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnFoundations9Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-foundations9-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Compass className="w-5 h-5 text-cyan-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>How Science Works</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Models, precise language, laws and theories, predictions and estimation.</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {TOPICS.map((t) => (
            <button key={t.id} onClick={() => setActiveId(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-cyan-50 border border-cyan-300" : "bg-cyan-950/40 border border-cyan-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeId === t.id ? "text-cyan-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-cyan-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-foundations9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-foundations9-main p, #learn-foundations9-main li, #learn-foundations9-main span, #learn-foundations9-main label, #learn-foundations9-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-foundations9-main b, #learn-foundations9-main strong, #learn-foundations9-main h1, #learn-foundations9-main h2, #learn-foundations9-main h3, #learn-foundations9-main h4, #learn-foundations9-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-foundations9-container .bg-slate-900, #learn-foundations9-container .bg-\\[\\#0d1424\\], #learn-foundations9-container .bg-\\[\\#0a1a1f\\], #learn-foundations9-container .bg-slate-950 { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-foundations9-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest font-mono text-cyan-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || Lightbulb, { className: "w-3.5 h-3.5" })}{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{topic.heading}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => renderBlock(blk, i, isLightMode))}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? (
              <button onClick={() => setActiveId(TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button>
            ) : <div />}
            {idx < TOPICS.length - 1 ? (
              <button onClick={() => setActiveId(TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
            ) : (
              <div className="flex flex-wrap gap-3 justify-end w-full sm:w-auto">
                {onCompleteNotes && (
                  <button onClick={onCompleteNotes} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-cyan-400/30 shrink-0">Complete Notes<ChevronRight className="w-3.5 h-3.5" /></button>
                )}
                {onGoToSelfAssessment && (
                  <button onClick={onGoToSelfAssessment} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-cyan-400/30 shrink-0">Take Self Assessment Quiz<Award className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
