// Class 8 Science -- Chapter: Nature of Matter: Elements, Compounds, and Mixtures (what mixtures
// are and their types, air as a mixture, pure substances, elements, compounds, the iron-and-sulfur
// activity that tells a mixture apart from a compound, everyday uses, and minerals). Every fact
// below reflects the verified content of the chapter, and every answer states the reason behind
// it, not just the conclusion.
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS ──
export const SCIENCE8EC_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "A sprout salad made of green gram, chickpeas, onion, and tomato can be picked apart with a fork, but sugar dissolved in water cannot be picked apart at all. Explain what type of mixture each one is.",
    given: { "Sprout salad": "Components visible and separable", "Sugar + water": "Components not separately visible" },
    formulaUsed: "A mixture is non-uniform when its components are visible and distinguishable; it is uniform when the components are evenly spread and cannot be told apart.",
    derivationSteps: [
      "In the sprout salad, each ingredient -- green gram, chickpeas, onion, tomato -- can still be seen and picked out separately with the naked eye.",
      "This means its components are not evenly distributed throughout, so it is a non-uniform mixture.",
      "In sugar dissolved in water, the sugar particles have spread so evenly among the water particles that they cannot be seen separately, even with a microscope.",
      "Since its components are evenly distributed and cannot be distinguished, sugar solution is a uniform mixture."
    ],
    finalAnswer: "The sprout salad is a non-uniform mixture because its components remain visible and separable; sugar dissolved in water is a uniform mixture because its components are evenly spread and cannot be told apart.",
    conceptualTip: "Whether a mixture is uniform or non-uniform depends only on whether its components can be told apart -- it has nothing to do with how many components there are."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "A colourless solution of lime water is left standing in the open air for a few hours and turns milky. Explain why this happens, and what it proves about air.",
    given: { "Observation": "Clear lime water turns milky on standing in air" },
    formulaUsed: "Calcium hydroxide (lime water) reacts with carbon dioxide to form insoluble calcium carbonate and water.",
    derivationSteps: [
      "Lime water is a solution of calcium hydroxide, which is colourless and clear to begin with.",
      "When left exposed to air, the carbon dioxide present in the air reacts with the calcium hydroxide.",
      "This reaction forms calcium carbonate, which does not dissolve in water and appears as tiny white particles suspended in the liquid, and it also produces water.",
      "Since the milkiness appears only because of exposure to air, this confirms that air must contain carbon dioxide."
    ],
    finalAnswer: "Lime water turns milky because the carbon dioxide present in air reacts with it to form insoluble calcium carbonate; this activity proves that carbon dioxide is present in air.",
    conceptualTip: "The word equation is: Calcium hydroxide + Carbon dioxide -> Calcium carbonate + Water -- remembering this equation makes the reasoning behind the milkiness automatic."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "Classify the following mixtures by the physical states of their components: air, aerated (soda) water, sand and water, and baking powder. State whether each is uniform or non-uniform.",
    given: { "Mixtures": "Air, soda water, sand + water, baking powder" },
    formulaUsed: "Mixtures can be classified by the physical states of their components (gas-gas, gas-liquid, solid-liquid, solid-solid), independently of whether they are uniform or non-uniform.",
    derivationSteps: [
      "Air is a gas-and-gas mixture (nitrogen, oxygen, and other gases), and it is uniform because its gases are evenly and invisibly mixed.",
      "Soda water is a gas-and-liquid mixture (carbon dioxide gas dissolved in water), and it is uniform since the dissolved gas cannot be seen separately.",
      "Sand and water is a solid-and-liquid mixture, and it is non-uniform because the sand grains remain visibly separate and settle at the bottom.",
      "Baking powder (baking soda and tartaric acid) is a solid-and-solid mixture, and it is uniform since the two powders are ground finely enough to look like one substance."
    ],
    finalAnswer: "Air (gas-gas, uniform), soda water (gas-liquid, uniform), sand and water (solid-liquid, non-uniform), baking powder (solid-solid, uniform).",
    conceptualTip: "The physical-state category (gas-gas, solid-liquid, etc.) and the uniform/non-uniform label are two completely separate classifications -- always check both independently."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "When electricity is passed through acidified water using a 9 V battery, gas bubbles collect at both terminals, but one test tube collects roughly twice the volume of gas as the other. Identify both gases and explain how each is confirmed.",
    given: { "Activity": "Electrolysis of acidified water using a 9 V battery" },
    formulaUsed: "Passing electricity through water splits it into hydrogen and oxygen gas, in a 2:1 ratio by volume; hydrogen gives a pop sound with a flame, oxygen makes a flame glow brighter.",
    derivationSteps: [
      "Water is made of hydrogen and oxygen combined in a fixed ratio, so passing electric current through it breaks it back down into these two gases.",
      "The terminal that collects the larger volume of gas (roughly twice as much) is collecting hydrogen, since water contains twice as many hydrogen atoms as oxygen atoms.",
      "Bringing a burning candle near this larger volume of gas produces a pop sound, confirming it is hydrogen.",
      "Bringing a burning candle near the smaller volume of gas at the other terminal makes its flame glow brighter, confirming it is oxygen."
    ],
    finalAnswer: "The terminal with the larger gas volume is hydrogen (confirmed by a pop sound with a flame); the terminal with the smaller gas volume is oxygen (confirmed by the flame glowing brighter).",
    conceptualTip: "These two gases collected are not water vapour -- if they were, they would simply condense back into water rather than being testable as separate gases."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "Explain why hydrogen and oxygen cannot be separated from water by any physical method, and use this to justify calling water a compound rather than a mixture.",
    given: { "Substance": "Water, made of hydrogen and oxygen" },
    formulaUsed: "A compound forms when elements combine chemically in a fixed ratio; its constituent elements cannot be separated by physical methods.",
    derivationSteps: [
      "In water, the particles of hydrogen and oxygen are combined so tightly with each other that ordinary physical processes (like filtering, evaporation, or settling) cannot pull them apart.",
      "This is very different from a mixture, where the components can always be separated by some physical method, since they do not react chemically with each other.",
      "The ratio of hydrogen atoms to oxygen atoms in water has been found to be fixed, at 2:1, which is a key feature of a compound.",
      "Since water's constituent elements are chemically combined in a fixed ratio and cannot be separated physically, water must be classified as a compound, not a mixture."
    ],
    finalAnswer: "Hydrogen and oxygen cannot be separated from water physically because they are chemically combined in a fixed 2:1 ratio -- this fixed, physically-inseparable combination is exactly what defines a compound, so water is correctly called a compound.",
    conceptualTip: "The single fastest way to tell a compound from a mixture is to ask: can the components be separated by an ordinary physical method? If no, it is a compound."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "Iron filings and sulfur powder are mixed to form Sample A, and half of Sample A is heated to form a black mass called Sample B. When a magnet is brought near each sample, only Sample A responds. Explain why.",
    given: { "Sample A": "Mixture of iron filings and sulfur powder", "Sample B": "Black mass formed by heating Sample A" },
    formulaUsed: "In a mixture, each component keeps its own original properties; in a compound, the new substance has entirely different properties from its constituent elements.",
    derivationSteps: [
      "In Sample A, the iron filings and sulfur powder are simply mixed together without any chemical reaction, so the iron still keeps its own natural property of being attracted to a magnet.",
      "This is why a magnet can pull the iron filings out of Sample A, leaving the sulfur behind.",
      "In Sample B, heating has caused the iron and sulfur to react chemically and combine, forming an entirely new substance, iron sulfide, with its own distinct properties.",
      "Since iron sulfide is a new compound and not simply iron mixed with sulfur, it does not retain iron's magnetic property, so a magnet has no effect on Sample B."
    ],
    finalAnswer: "Sample A responds to a magnet because it is a mixture in which the iron keeps its own magnetic property; Sample B does not respond because heating has chemically combined the iron and sulfur into iron sulfide, a new compound with completely different properties.",
    conceptualTip: "A magnet test is one of the simplest ways to physically separate a mixture -- the fact that it works on Sample A but not Sample B is itself proof that only Sample A is a mixture."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "When dilute hydrochloric acid is added to Sample A (iron and sulfur mixture) and to Sample B (iron sulfide compound), both release a gas, but the two gases smell completely different. Identify each gas and explain the difference.",
    given: { "Sample A + dilute HCl": "Colourless, odourless gas with a pop sound", "Sample B + dilute HCl": "Colourless gas with a rotten-egg smell" },
    formulaUsed: "Iron + Dilute hydrochloric acid -> Iron chloride + Hydrogen gas; Iron sulfide + Dilute hydrochloric acid -> Iron chloride + Hydrogen sulfide gas",
    derivationSteps: [
      "In Sample A, the iron (still present as plain iron, since it is only mixed with sulfur) reacts with dilute hydrochloric acid to form iron chloride and hydrogen gas.",
      "Hydrogen gas is colourless, has no smell, and burns with a characteristic pop sound, matching the gas observed from Sample A.",
      "In Sample B, the compound iron sulfide reacts differently with dilute hydrochloric acid, forming iron chloride and hydrogen sulfide gas instead.",
      "Hydrogen sulfide gas is colourless but has a distinctive rotten-egg-like odour, matching the gas observed from Sample B."
    ],
    finalAnswer: "Sample A releases hydrogen gas (odourless, pops with a flame) because it still contains plain iron reacting with the acid; Sample B releases hydrogen sulfide gas (rotten-egg smell) because iron sulfide, a different compound, reacts differently with the acid.",
    conceptualTip: "Never smell an evolved gas directly -- always waft it gently towards the nose, as shown in the activity's safety instructions."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Sodium (a soft, reactive metal) and chlorine (a hazardous gas) combine to form ordinary table salt, which is safe to eat. Explain how this is possible, using the idea of compounds.",
    given: { "Elements": "Sodium (metal) and chlorine (gas)", "Product": "Sodium chloride (table salt)" },
    formulaUsed: "A compound's properties are entirely different from the properties of the elements that combine to form it.",
    derivationSteps: [
      "Sodium and chlorine are both elements, and on their own, sodium is a highly reactive soft metal while chlorine is a hazardous, poisonous gas.",
      "When these two elements combine chemically in a fixed ratio (sodium to chlorine particles in a 1:1 ratio), they form sodium chloride, a completely new compound.",
      "The properties of a compound are always different from the properties of the elements that formed it, since a genuinely new substance has been created.",
      "This is why sodium chloride is a harmless, taste-enhancing substance essential for life, even though the elements that formed it are individually dangerous."
    ],
    finalAnswer: "Sodium chloride is safe because it is an entirely new compound with its own properties, completely different from the dangerous properties of the sodium metal and chlorine gas that combined to form it, in a fixed 1:1 ratio.",
    conceptualTip: "This is the clearest possible example of why a compound must never be judged by the properties of the elements that make it up."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "A teaspoon of sugar is heated gently in a boiling tube. It turns brown, then black, water droplets appear near the mouth of the tube, and finally only charcoal (carbon) is left behind. Explain what this shows about sugar.",
    given: { "Activity": "Heating sugar in a boiling tube" },
    formulaUsed: "Sugar decomposes on heating to give carbon and water; since water itself is made of hydrogen and oxygen, sugar must be a compound of carbon, hydrogen, and oxygen.",
    derivationSteps: [
      "As sugar is heated, it first turns brown and then chars to black, while droplets of water form inside the tube -- this water must have come from the sugar itself, since the tube is sealed from outside air during heating.",
      "The blackish substance left behind is charcoal, which is carbon.",
      "Since heating the sugar has produced two entirely different substances (water and carbon), sugar cannot be an element, because elements cannot be broken down into simpler substances.",
      "Since water itself is known to be made of hydrogen and oxygen, sugar must be a compound made of the elements carbon, hydrogen, and oxygen."
    ],
    finalAnswer: "This shows that sugar is a compound made of carbon, hydrogen, and oxygen, because heating decomposes it into carbon and water (which is itself hydrogen and oxygen), and only a compound -- not an element -- can be broken down into different substances this way.",
    conceptualTip: "This activity should always be performed under a teacher's supervision -- heating any substance to the point of charring needs proper care."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "Quartz, calcite, and mica are minerals used in daily life, while gold is also a mineral. Explain how gold differs from the others in terms of what it is made of, and why cement is made from several different minerals.",
    given: { "Minerals": "Quartz, calcite, mica, gold" },
    formulaUsed: "Native minerals are pure elements; most other minerals are compounds made of more than one element.",
    derivationSteps: [
      "Gold is an example of a native mineral, which means it exists in nature as a pure element and is not a compound of different elements.",
      "Quartz, calcite, and mica, on the other hand, are compounds -- each is made up of more than one element combined together.",
      "Cement is manufactured from calcite, quartz, alumina, and iron oxide, each of which is a mineral or a substance obtained from minerals.",
      "Combining several different minerals allows cement to have the specific properties needed for construction, which no single mineral alone would provide."
    ],
    finalAnswer: "Gold differs because it is a native mineral, existing as a pure element, while quartz, calcite, and mica are minerals that are compounds made of more than one element; cement uses several different minerals together because each contributes properties needed for a strong building material.",
    conceptualTip: "Most minerals are compounds, but native minerals (pure elements, whether metals like gold and silver or non-metals like sulfur and carbon) are the exception worth remembering."
  }
];

// ── MCQs (50) ──
export const SCIENCE8EC_MCQS: QuizQuestion[] = [
  { id: 1, question: "When two or more substances are mixed such that each retains its own properties, the result is called a:", options: ["Compound", "Mixture", "Element", "Atom"], correctAnswer: 1, explanation: "A mixture forms when substances are combined without any of them losing their own properties." },
  { id: 2, question: "The individual substances that make up a mixture are called its:", options: ["Elements", "Molecules", "Components", "Compounds"], correctAnswer: 2, explanation: "The substances making up a mixture are called its components." },
  { id: 3, question: "In a mixture, the components:", options: ["React chemically with each other", "Do not react chemically with each other", "Always form a new substance", "Cannot be separated by any method"], correctAnswer: 1, explanation: "The components of a mixture do not react chemically with each other." },
  { id: 4, question: "A sprout salad, where onion, tomato, and sprouts can be seen and picked apart, is an example of a:", options: ["Uniform mixture", "Non-uniform mixture", "Pure substance", "Compound"], correctAnswer: 1, explanation: "Its components are visible and separable, making it a non-uniform mixture." },
  { id: 5, question: "Sugar dissolved completely in water is an example of a:", options: ["Non-uniform mixture", "Uniform mixture", "Compound", "Element"], correctAnswer: 1, explanation: "The dissolved sugar particles cannot be distinguished from the water, making it a uniform mixture." },
  { id: 6, question: "Stainless steel, which contains iron, nickel, chromium, and carbon mixed so evenly that no individual substance can be seen, is an example of:", options: ["A compound", "An alloy", "A pure element", "A non-uniform mixture"], correctAnswer: 1, explanation: "Stainless steel is an alloy -- a uniform mixture of metals (and sometimes carbon)." },
  { id: 7, question: "Brass is an alloy made by mixing:", options: ["Copper and tin", "Copper and zinc", "Iron and carbon", "Gold and silver"], correctAnswer: 1, explanation: "Brass is an alloy of copper and zinc." },
  { id: 8, question: "Bronze is an alloy made by mixing:", options: ["Copper and zinc", "Copper and tin", "Iron and nickel", "Sodium and chlorine"], correctAnswer: 1, explanation: "Bronze is an alloy of copper and tin." },
  { id: 9, question: "Air is best described as:", options: ["A non-uniform mixture", "A uniform mixture of gases", "A pure element", "A compound of nitrogen and oxygen"], correctAnswer: 1, explanation: "Air is a uniform mixture, mainly of nitrogen, oxygen, argon, carbon dioxide, and water vapour." },
  { id: 10, question: "The gas that makes up about 78% of air is:", options: ["Oxygen", "Nitrogen", "Argon", "Carbon dioxide"], correctAnswer: 1, explanation: "Nitrogen constitutes about 78% of air." },
  { id: 11, question: "Lime water is used to test for the presence of which gas in air?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], correctAnswer: 2, explanation: "Lime water turns milky in the presence of carbon dioxide." },
  { id: 12, question: "When carbon dioxide reacts with calcium hydroxide (lime water), the products are:", options: ["Calcium carbonate and water", "Calcium oxide and oxygen", "Sodium chloride and water", "Hydrogen and oxygen"], correctAnswer: 0, explanation: "Calcium hydroxide + Carbon dioxide gives calcium carbonate and water, turning the solution milky." },
  { id: 13, question: "Tiny shining particles seen moving in a beam of sunlight are mainly:", options: ["Water vapour only", "Dust particles suspended in air", "Nitrogen gas", "Carbon dioxide gas"], correctAnswer: 1, explanation: "These are dust particles suspended in air, considered pollutants." },
  { id: 14, question: "The tool used to describe how clean or polluted the air is, is called the:", options: ["pH scale", "Air Quality Index (AQI)", "Melting point scale", "Boiling point index"], correctAnswer: 1, explanation: "The Air Quality Index (AQI) describes air quality." },
  { id: 15, question: "Aerated (soda) water is an example of a mixture of the type:", options: ["Solid and liquid", "Gas and liquid", "Gas and gas", "Solid and solid"], correctAnswer: 1, explanation: "Soda water is carbon dioxide gas dissolved in a liquid, a gas-and-liquid mixture." },
  { id: 16, question: "Sand and water together form a mixture of the type:", options: ["Gas and liquid", "Solid and gas", "Solid and liquid", "Liquid and liquid"], correctAnswer: 2, explanation: "Sand (solid) mixed with water (liquid) is a solid-and-liquid mixture." },
  { id: 17, question: "Baking powder, made from baking soda and tartaric acid, is a mixture of the type:", options: ["Solid and solid", "Solid and liquid", "Gas and gas", "Liquid and liquid"], correctAnswer: 0, explanation: "Baking powder is a mixture of two solids." },
  { id: 18, question: "Vinegar (acetic acid in water) and oil mixed with water are both examples of mixtures of the type:", options: ["Gas and liquid", "Liquid and liquid", "Solid and liquid", "Solid and gas"], correctAnswer: 1, explanation: "Both are examples of two liquids mixed together." },
  { id: 19, question: "According to science, a pure substance is one that:", options: ["Is unadulterated and looks clean", "Has no other substance present in it", "Is always a liquid", "Always dissolves in water"], correctAnswer: 1, explanation: "Scientifically, a pure substance has no other substance mixed into it, unlike the everyday meaning of 'pure'." },
  { id: 20, question: "Adulteration refers to:", options: ["Purifying a substance completely", "Illegally adding cheaper or poorer-quality substances to a product", "Combining two elements to form a compound", "Separating a mixture into its pure components"], correctAnswer: 1, explanation: "Adulteration is the illegal addition of cheaper or lower-quality substances to a product." },
  { id: 21, question: "A pure substance cannot be separated into other kinds of matter by:", options: ["Any chemical process", "Any physical process", "Heating only", "Cooling only"], correctAnswer: 1, explanation: "A pure substance cannot be separated by any physical process, since it consists of only one type of particle." },
  { id: 22, question: "Pure substances can be classified into two types, namely:", options: ["Mixtures and solutions", "Elements and compounds", "Metals and non-metals only", "Solids and liquids only"], correctAnswer: 1, explanation: "Pure substances are of two types: elements and compounds." },
  { id: 23, question: "When electricity is passed through acidified water, the two gases produced are:", options: ["Nitrogen and oxygen", "Hydrogen and oxygen", "Carbon dioxide and hydrogen", "Argon and nitrogen"], correctAnswer: 1, explanation: "Passing electricity through water splits it into hydrogen and oxygen gas." },
  { id: 24, question: "In the water-electrolysis activity, the gas collected in the larger volume is confirmed by a burning candle producing a:", options: ["Brighter flame -- oxygen", "Pop sound -- hydrogen", "No reaction at all", "Rotten-egg smell"], correctAnswer: 1, explanation: "The larger volume of gas is hydrogen, confirmed by a pop sound near a flame." },
  { id: 25, question: "The gas that makes a candle's flame glow brighter, in the water-electrolysis activity, is:", options: ["Hydrogen", "Oxygen", "Nitrogen", "Carbon dioxide"], correctAnswer: 1, explanation: "Oxygen supports combustion and makes the flame glow brighter." },
  { id: 26, question: "Substances like hydrogen and oxygen, which cannot be broken down into simpler substances, are called:", options: ["Compounds", "Mixtures", "Elements", "Alloys"], correctAnswer: 2, explanation: "Elements are pure substances that cannot be broken down further into simpler substances." },
  { id: 27, question: "The identical particles that make up an element are called:", options: ["Molecules only", "Atoms", "Compounds", "Mixtures"], correctAnswer: 1, explanation: "Each element is made of identical particles called atoms." },
  { id: 28, question: "Two atoms of hydrogen combining to form one stable particle results in:", options: ["A hydrogen compound", "A hydrogen molecule", "A hydrogen mixture", "A hydrogen element only, unchanged"], correctAnswer: 1, explanation: "Two or more atoms of an element can combine to form a molecule of that element." },
  { id: 29, question: "Elements are broadly classified into:", options: ["Solids and liquids", "Metals and non-metals", "Mixtures and compounds", "Pure and impure substances"], correctAnswer: 1, explanation: "Elements are classified into metals and non-metals." },
  { id: 30, question: "Silicon and boron, which show properties in between those of metals and non-metals, are called:", options: ["Alloys", "Metalloids", "Compounds", "Minerals"], correctAnswer: 1, explanation: "Elements with intermediate properties between metals and non-metals are called metalloids." },
  { id: 31, question: "The total number of elements known at present is approximately:", options: ["50", "78", "118", "200"], correctAnswer: 2, explanation: "The number of known elements is 118." },
  { id: 32, question: "How many elements exist in the gaseous state at room temperature?", options: ["Two", "Eleven", "Forty-five", "One hundred and eighteen"], correctAnswer: 1, explanation: "Eleven elements exist as gases at room temperature, and all are non-metals." },
  { id: 33, question: "Which two elements are liquid at room temperature?", options: ["Gold and silver", "Mercury and bromine", "Gallium and caesium", "Hydrogen and oxygen"], correctAnswer: 1, explanation: "Mercury (a metal) and bromine (a non-metal) are the two elements liquid at room temperature." },
  { id: 34, question: "Which elements are solid at room temperature but turn liquid at a temperature around 30 degrees Celsius?", options: ["Mercury and bromine", "Gallium and caesium", "Gold and silver", "Iron and aluminium"], correctAnswer: 1, explanation: "Gallium and caesium are solids that become liquid at around 30 degrees Celsius." },
  { id: 35, question: "More than 45 different elements are used in manufacturing:", options: ["A wooden chair", "A mobile phone", "A glass of water", "A cotton shirt"], correctAnswer: 1, explanation: "More than 45 elements are used in manufacturing mobile phones, including their screens and batteries." },
  { id: 36, question: "Compounds are formed when:", options: ["Substances are mixed physically without reacting", "Different elements combine chemically in a fixed ratio", "A single element is simply melted", "Two mixtures are combined"], correctAnswer: 1, explanation: "Compounds form when different elements combine chemically in a fixed ratio." },
  { id: 37, question: "The properties of a compound, compared to the elements that form it, are:", options: ["Exactly the same", "Different", "Always weaker", "Impossible to determine"], correctAnswer: 1, explanation: "A compound's properties are different from those of its constituent elements." },
  { id: 38, question: "In water, the ratio of hydrogen atoms to oxygen atoms is:", options: ["1:1", "2:1", "1:2", "3:1"], correctAnswer: 1, explanation: "Water has hydrogen and oxygen atoms combined in a 2:1 ratio." },
  { id: 39, question: "In sodium chloride (common salt), sodium and chlorine particles combine in the ratio:", options: ["1:1", "2:1", "1:2", "3:2"], correctAnswer: 0, explanation: "Sodium chloride is formed of sodium and chlorine in a 1:1 ratio." },
  { id: 40, question: "When sugar is heated in a boiling tube, it eventually leaves behind:", options: ["Only water", "Charcoal (carbon)", "Sodium chloride", "Hydrogen gas only"], correctAnswer: 1, explanation: "Sugar decomposes on heating, leaving behind charcoal (carbon) and releasing water." },
  { id: 41, question: "From the sugar-heating activity, sugar is concluded to be a compound made of:", options: ["Only carbon", "Carbon, hydrogen, and oxygen", "Sodium and chlorine", "Nitrogen and oxygen"], correctAnswer: 1, explanation: "Sugar decomposes into carbon and water (hydrogen and oxygen), showing it is a compound of these three elements." },
  { id: 42, question: "In the iron-and-sulfur activity, Sample A is prepared by:", options: ["Heating iron and sulfur together", "Simply mixing iron filings and sulfur powder", "Dissolving iron in water", "Passing electricity through iron"], correctAnswer: 1, explanation: "Sample A is formed by mixing iron filings and sulfur powder without heating." },
  { id: 43, question: "In the iron-and-sulfur activity, Sample B is formed by:", options: ["Simply mixing iron and sulfur", "Heating Sample A and grinding the resulting black mass", "Dissolving Sample A in acid", "Freezing Sample A"], correctAnswer: 1, explanation: "Sample B is formed by heating Sample A to form a black mass, which is then ground." },
  { id: 44, question: "When a magnet is brought near Sample A and Sample B:", options: ["Both are attracted equally", "Only Sample A is attracted", "Only Sample B is attracted", "Neither is attracted"], correctAnswer: 1, explanation: "Only Sample A (the mixture) is attracted, since its iron still keeps its magnetic property." },
  { id: 45, question: "Sample B does not respond to a magnet because:", options: ["It contains no iron at all", "It is a new compound (iron sulfide) with different properties", "It was never heated", "Magnets do not work on black substances"], correctAnswer: 1, explanation: "Iron sulfide is a new compound whose properties differ from those of plain iron." },
  { id: 46, question: "Adding dilute hydrochloric acid to Sample A produces:", options: ["Hydrogen sulfide gas", "Hydrogen gas, with a pop sound", "No reaction at all", "Oxygen gas"], correctAnswer: 1, explanation: "Sample A's iron reacts with dilute hydrochloric acid to give iron chloride and hydrogen gas." },
  { id: 47, question: "Adding dilute hydrochloric acid to Sample B produces a gas with:", options: ["No smell at all", "A rotten-egg-like odour", "A sweet smell", "The smell of chlorine"], correctAnswer: 1, explanation: "Sample B (iron sulfide) reacts with the acid to give hydrogen sulfide gas, which smells like rotten eggs." },
  { id: 48, question: "Native minerals, such as gold, silver, and sulfur, are examples of:", options: ["Compounds", "Pure elements found in nature", "Mixtures of two metals", "Alloys"], correctAnswer: 1, explanation: "Native minerals are pure elements, not compounds." },
  { id: 49, question: "Cement is manufactured mainly from:", options: ["Only water and sand", "Calcite, quartz, alumina, and iron oxide", "Only talc", "Only gold and silver"], correctAnswer: 1, explanation: "Cement is made from calcite, quartz, alumina, and iron oxide." },
  { id: 50, question: "Which of the following is NOT considered matter?", options: ["Water", "Air", "Light", "Iron"], correctAnswer: 2, explanation: "Light, heat, electricity, and thoughts are not made of matter, unlike water, air, and iron." },
];

// ── VERY SHORT (2 marks each) ──
export const SCIENCE8EC_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define a mixture.", answer: "A mixture forms when two or more substances are combined such that each substance retains its own properties.", keyPoints: ["Two or more substances", "Each retains its properties"] },
  { id: 2, question: "What are the components of a mixture?", answer: "The individual substances that make up a mixture are called its components.", keyPoints: ["Individual substances", "Make up the mixture"] },
  { id: 3, question: "Distinguish a non-uniform mixture from a uniform mixture in one line.", answer: "A non-uniform mixture has components that are visibly separable, while a uniform mixture has components so evenly spread that they cannot be told apart.", keyPoints: ["Non-uniform: visible/separable", "Uniform: evenly spread, indistinguishable"] },
  { id: 4, question: "Give one example each of a non-uniform mixture and a uniform mixture.", answer: "Sprout salad is a non-uniform mixture; sugar dissolved in water is a uniform mixture.", keyPoints: ["Sprout salad -- non-uniform", "Sugar + water -- uniform"] },
  { id: 5, question: "What is an alloy? Give one example.", answer: "An alloy is a uniform mixture of two or more metals; stainless steel (iron, nickel, chromium, and carbon) is an example.", keyPoints: ["Uniform mixture of metals", "Example: stainless steel"] },
  { id: 6, question: "State the gases nitrogen and oxygen make up in air, and which of the two supports combustion.", answer: "Nitrogen makes up about 78% of air and does not support combustion; oxygen supports combustion and is needed by most living beings.", keyPoints: ["Nitrogen ~78%, no combustion", "Oxygen supports combustion"] },
  { id: 7, question: "How is the presence of carbon dioxide in air tested using lime water?", answer: "Lime water is left exposed to air; if carbon dioxide is present, it reacts with the lime water and turns it milky.", keyPoints: ["Lime water exposed to air", "Turns milky if CO2 present"] },
  { id: 8, question: "What are dust particles in air considered, and why?", answer: "Dust particles suspended in air are considered pollutants, since they are not an integral part of the air itself.", keyPoints: ["Considered pollutants", "Not an integral part of air"] },
  { id: 9, question: "What does the Air Quality Index (AQI) describe?", answer: "The AQI is a tool used to describe how clean or polluted the air is.", keyPoints: ["Describes air quality", "A measuring tool"] },
  { id: 10, question: "Give one example each of a gas-and-liquid mixture and a solid-and-liquid mixture.", answer: "Aerated (soda) water is a gas-and-liquid mixture; sand and water is a solid-and-liquid mixture.", keyPoints: ["Gas-liquid: soda water", "Solid-liquid: sand and water"] },
  { id: 11, question: "In science, what does the word 'pure' mean, and how does this differ from its everyday meaning?", answer: "In science, 'pure' means having no other substance present at all; in everyday usage, 'pure' simply means unadulterated (not mixed with cheaper or poorer substances).", keyPoints: ["Science: no other substance at all", "Everyday: unadulterated"] },
  { id: 12, question: "Define adulteration.", answer: "Adulteration is the illegal process of adding cheaper or poorer-quality substances to a product, usually to increase quantity or reduce cost.", keyPoints: ["Illegal addition of substances", "Increases quantity/reduces cost"] },
  { id: 13, question: "Define a pure substance.", answer: "A pure substance is a kind of matter that cannot be separated into other kinds of matter by any physical process.", keyPoints: ["Cannot be separated physically", "Same type of particles throughout"] },
  { id: 14, question: "Name the two types of pure substances.", answer: "Elements and compounds.", keyPoints: ["Elements", "Compounds"] },
  { id: 15, question: "What two gases are produced when electricity is passed through acidified water?", answer: "Hydrogen gas and oxygen gas.", keyPoints: ["Hydrogen", "Oxygen"] },
  { id: 16, question: "How is hydrogen gas confirmed in the water-electrolysis activity?", answer: "Bringing a burning candle near the gas produces a pop sound, confirming it is hydrogen.", keyPoints: ["Pop sound with flame", "Confirms hydrogen"] },
  { id: 17, question: "Define an element.", answer: "An element is a pure substance made of identical particles (atoms) that cannot be broken down into simpler substances.", keyPoints: ["Made of identical atoms", "Cannot be broken down further"] },
  { id: 18, question: "What is a molecule of an element?", answer: "A stable particle formed when two or more atoms of the same element combine, such as two hydrogen atoms forming one hydrogen molecule.", keyPoints: ["Two or more atoms combine", "Example: hydrogen molecule"] },
  { id: 19, question: "Into what two broad categories are elements classified?", answer: "Metals and non-metals.", keyPoints: ["Metals", "Non-metals"] },
  { id: 20, question: "What are metalloids? Give one example.", answer: "Metalloids are elements with properties in between metals and non-metals; silicon is one example.", keyPoints: ["Intermediate properties", "Example: silicon or boron"] },
  { id: 21, question: "Name the two elements that exist as liquids at room temperature.", answer: "Mercury (a metal) and bromine (a non-metal).", keyPoints: ["Mercury (metal)", "Bromine (non-metal)"] },
  { id: 22, question: "Define a compound.", answer: "A compound forms when different elements combine chemically in a fixed ratio, giving properties different from the elements that formed it.", keyPoints: ["Elements combine chemically", "Fixed ratio, different properties"] },
  { id: 23, question: "State the ratio of hydrogen to oxygen atoms in water.", answer: "2:1.", keyPoints: ["2 hydrogen : 1 oxygen"] },
  { id: 24, question: "State the ratio of sodium to chlorine particles in sodium chloride.", answer: "1:1.", keyPoints: ["1 sodium : 1 chlorine"] },
  { id: 25, question: "What is left behind when sugar is strongly heated in a boiling tube?", answer: "Charcoal (carbon) is left behind, along with water droplets released during heating.", keyPoints: ["Charcoal/carbon left behind", "Water droplets also released"] },
  { id: 26, question: "In the iron-and-sulfur activity, what is Sample A?", answer: "Sample A is a mixture formed by simply mixing iron filings and sulfur powder together.", keyPoints: ["Simple mixture", "Iron filings + sulfur powder"] },
  { id: 27, question: "In the iron-and-sulfur activity, what is Sample B?", answer: "Sample B is iron sulfide, a compound formed by heating Sample A and grinding the resulting black mass.", keyPoints: ["Compound: iron sulfide", "Formed by heating Sample A"] },
  { id: 28, question: "Which of Sample A and Sample B is attracted to a magnet, and why?", answer: "Only Sample A, because it is a mixture in which the iron still keeps its own magnetic property.", keyPoints: ["Sample A only", "Iron keeps its magnetic property"] },
  { id: 29, question: "What are native minerals? Give one example.", answer: "Native minerals are minerals that exist as pure elements rather than compounds; gold is an example.", keyPoints: ["Pure elements, not compounds", "Example: gold"] },
  { id: 30, question: "Name two things that are not matter.", answer: "Light and heat are not matter (electricity and thoughts are also not matter).", keyPoints: ["Light", "Heat (or electricity/thoughts)"] },
];

// ── SHORT (3 marks each) ──
export const SCIENCE8EC_SHORT: ShortQuestion[] = [
  { id: 1, question: "Explain, with an example, why a sprout salad is called a non-uniform mixture while sugar dissolved in water is called a uniform mixture.", answer: "In a sprout salad, ingredients like green gram, chickpeas, onion, and tomato remain visible and can be picked apart with the naked eye, so its components are not evenly distributed -- making it non-uniform. In sugar dissolved in water, the sugar particles spread so evenly among the water particles that they cannot be seen separately even with a microscope, making it uniform. The difference lies entirely in whether the components can be told apart, not in how many components are present.", keyPoints: ["Explains sprout salad as non-uniform", "Explains sugar solution as uniform", "States the underlying distinguishing factor"] },
  { id: 2, question: "Describe the activity that confirms the presence of carbon dioxide in air, and explain the reasoning behind the observation.", answer: "A colourless solution of calcium hydroxide (lime water) is prepared and left standing in a petri dish exposed to air for a few hours. Over time, the solution turns milky. This happens because the carbon dioxide present in air reacts with the calcium hydroxide to form calcium carbonate, which is insoluble and appears as tiny white particles, along with water. Since the milkiness only appears due to exposure to air, this confirms that carbon dioxide is genuinely present in air.", keyPoints: ["Describes the lime-water setup", "States the milky observation", "Explains the chemical reasoning"] },
  { id: 3, question: "Explain what dust particles in air are, how they can be observed, and why they are considered pollutants.", answer: "Dust particles are tiny solid particles suspended in air, visible as shining specks moving in a beam of sunlight entering a dark room. They can also be observed by placing a clean black sheet of paper near an open window for a few hours and examining the settled particles with a magnifying glass. These particles are considered pollutants because they are not an integral part of air itself, and their number can vary from place to place and time to time.", keyPoints: ["Describes what dust particles are and how observed", "Explains why they are considered pollutants", "Notes their variability"] },
  { id: 4, question: "Classify the following mixtures by the physical state of their components, giving the category for each: air, oil and water, carbon particles in air, and alloys.", answer: "Air is a gas-and-gas mixture; oil and water is a liquid-and-liquid mixture; carbon particles in air is a solid-and-gas mixture; and alloys, such as stainless steel or brass, are solid-and-solid mixtures.", keyPoints: ["Air -- gas and gas", "Oil and water -- liquid and liquid", "Carbon particles in air -- solid and gas", "Alloys -- solid and solid"] },
  { id: 5, question: "Explain the difference between the everyday meaning of 'pure' and the scientific meaning of 'pure', using an example.", answer: "In everyday usage, 'pure' means a product is unadulterated -- that no cheaper or lower-quality substances have been illegally added to it, as with milk or ghee. In science, however, a pure substance means it has no other substance present in it at all -- even a product that looks unadulterated, like milk, is actually a mixture from a scientific point of view, since it contains water, fat, and other substances together.", keyPoints: ["Explains everyday meaning (unadulterated)", "Explains scientific meaning (no other substance at all)", "Gives a correct example showing the difference"] },
  { id: 6, question: "Describe the activity used to identify hydrogen and oxygen gas from water, and explain how the two gases are told apart.", answer: "Water containing a few drops of dilute sulfuric acid is placed in a beaker with a 9 V battery, and two water-filled test tubes are placed over its terminals. As electric current passes through, gas bubbles collect in both test tubes, with one collecting roughly twice the volume of the other. Bringing a burning candle near each tube's mouth is used to test the gas: a pop sound identifies hydrogen (the larger volume), while a brighter-glowing flame identifies oxygen (the smaller volume).", keyPoints: ["Describes the electrolysis setup", "Notes the roughly 2:1 volume difference", "Explains the pop-sound and brighter-flame tests"] },
  { id: 7, question: "Explain why hydrogen and oxygen are classified as elements, using the water-electrolysis activity as evidence.", answer: "In the water-electrolysis activity, passing electricity through water produces two pure substances -- hydrogen and oxygen. Since neither of these two gases can be broken down further into any simpler substances, and each is made of identical atoms of its own kind, they are classified as elements. They are also the building blocks that combine to form water itself, which is consistent with elements being the basic building blocks of matter.", keyPoints: ["States both are pure substances from the activity", "Explains they cannot be broken down further", "Connects to elements being building blocks of matter"] },
  { id: 8, question: "Explain the difference between an atom and a molecule, using hydrogen as an example.", answer: "An atom is the smallest identical particle that makes up an element. However, atoms of most elements, including hydrogen, do not usually exist independently in nature. Instead, two or more atoms combine to form a stable particle called a molecule -- for hydrogen, two hydrogen atoms combine to form one molecule of hydrogen gas. So an atom is the basic unit of an element, while a molecule is the stable, naturally occurring combination of such atoms.", keyPoints: ["Defines atom correctly", "Defines molecule correctly", "Uses hydrogen example accurately (2 atoms -> 1 molecule)"] },
  { id: 9, question: "Explain how elements are classified into metals, non-metals, and metalloids, giving one example of each.", answer: "Elements are broadly classified into metals, such as gold, silver, and iron, and non-metals, such as carbon, sulfur, and oxygen. A small group of elements, called metalloids, such as silicon and boron, have properties that lie in between those of metals and non-metals, showing characteristics of both categories to some degree.", keyPoints: ["Explains metals with example", "Explains non-metals with example", "Explains metalloids with example"] },
  { id: 10, question: "Explain, using the sugar-heating activity, why sugar cannot be classified as an element.", answer: "When sugar is heated in a boiling tube, it turns brown, then chars to black, releasing water droplets and finally leaving behind charcoal (carbon). Since heating has broken sugar down into two different substances (water and carbon), and elements by definition cannot be broken down into simpler substances, sugar cannot be an element. Since water itself is made of hydrogen and oxygen, sugar must actually be a compound made of carbon, hydrogen, and oxygen.", keyPoints: ["Describes the heating observations", "States why this rules out sugar being an element", "Concludes sugar is a compound of C, H, and O"] },
  { id: 11, question: "Explain why sodium chloride (table salt) is safe to eat even though it is formed from a reactive metal and a hazardous gas.", answer: "Sodium is a soft, reactive metal, and chlorine is a hazardous gas -- both dangerous on their own. However, when they combine chemically in a fixed 1:1 ratio, they form sodium chloride, an entirely new compound. Since a compound's properties are always completely different from the properties of the elements that formed it, sodium chloride ends up being a harmless, taste-enhancing substance essential for life, despite being made from two dangerous elements.", keyPoints: ["States the properties of sodium and chlorine individually", "States the fixed 1:1 ratio of combination", "Explains why compound properties differ entirely from element properties"] },
  { id: 12, question: "Describe how Sample A and Sample B are prepared in the iron-and-sulfur activity, and state one key difference in their appearance.", answer: "Sample A is prepared by simply mixing iron filings and sulfur powder together in a watch glass, without any heating. Sample B is prepared by taking half of Sample A, heating it strongly in a china dish with continuous stirring until a black mass forms, then cooling, grinding, and labelling this black mass as Sample B. In appearance, Sample A shows separate black (iron) and yellow (sulfur) particles, while Sample B is a uniform black mass with the same colour and texture throughout.", keyPoints: ["Describes preparation of Sample A", "Describes preparation of Sample B", "States the appearance difference"] },
  { id: 13, question: "Explain, using the magnet test, why Sample A and Sample B behave differently.", answer: "When a magnet is brought near Sample A, the iron filings are attracted and pulled out, since Sample A is only a mixture in which the iron has kept its own natural magnetic property. When a magnet is brought near Sample B, there is no effect at all, because heating has chemically combined the iron and sulfur into iron sulfide, a completely new compound whose properties -- including the loss of magnetism -- are entirely different from those of plain iron.", keyPoints: ["Explains Sample A's response and why", "Explains Sample B's lack of response and why", "Connects to compound properties differing from element properties"] },
  { id: 14, question: "Explain, using the dilute hydrochloric acid test, how Sample A and Sample B can be told apart by the smell of the gas they release.", answer: "When dilute hydrochloric acid is added to Sample A, the iron present reacts to form iron chloride and hydrogen gas, which is colourless, has no smell, and burns with a pop sound. When dilute hydrochloric acid is added to Sample B (iron sulfide), it reacts to form iron chloride and hydrogen sulfide gas instead, which has a distinctive rotten-egg-like odour. This clear difference in the gas produced shows that Sample A and Sample B are chemically different substances.", keyPoints: ["Explains Sample A's reaction and gas properties", "Explains Sample B's reaction and gas properties", "States the conclusion that the samples are chemically different"] },
  { id: 15, question: "Explain how the iron-and-sulfur activity, taken as a whole, demonstrates the difference between a mixture and a compound.", answer: "Sample A (the mixture) shows that its components, iron and sulfur, keep their own original properties -- the iron stays magnetic and still reacts with acid to give hydrogen gas. Sample B (the compound, iron sulfide) shows that once elements combine chemically through heating, an entirely new substance is formed with different properties -- it is no longer magnetic, and it reacts with acid to give a different gas altogether. This contrast between unchanged properties (mixture) and entirely new properties (compound) is the central lesson of the activity.", keyPoints: ["Describes Sample A retaining original properties", "Describes Sample B forming a new substance with different properties", "States the overall conclusion about mixtures versus compounds"] },
  { id: 16, question: "Explain how elements, compounds, and mixtures are each used in daily life, giving one example of each.", answer: "Elements like iron and aluminium are used directly to construct bridges, buildings, and vehicles. Compounds like water are essential for life, and understanding how elements combine to form compounds helps chemists create life-saving medicines and fertilisers. Mixtures like wood, steel, and concrete are widely used as building materials, showing how all three categories play essential roles in everyday life.", keyPoints: ["Gives a correct element example and use", "Gives a correct compound example and use", "Gives a correct mixture example and use"] },
  { id: 17, question: "Explain what native minerals are, and how they differ from most other minerals, with examples.", answer: "Native minerals are minerals that exist in nature as pure elements rather than as compounds -- examples include metals like gold, silver, and copper, and non-metals like sulfur and carbon. Most other minerals, however, are compounds made up of more than one element combined together, such as quartz, calcite, mica, pyroxene, and olivine. So native minerals are the exception, since most minerals found in rocks are compounds, not pure elements.", keyPoints: ["Defines native minerals with examples", "States most minerals are compounds, with examples", "Notes native minerals as the exception"] },
  { id: 18, question: "Explain how cement is made, and why it needs to be made from several different minerals rather than just one.", answer: "Cement is manufactured from calcite, quartz, alumina, and iron oxide, which are minerals or substances obtained from minerals. Each of these components contributes different properties needed for a strong, durable building material -- no single mineral alone could provide all the properties cement needs to bind and harden effectively. This is why cement is a carefully combined mixture of several different minerals rather than a single pure substance.", keyPoints: ["States the components cement is made from", "Explains why several minerals are needed together", "Concludes cement is a combined mixture, not a single substance"] },
  { id: 19, question: "A student says 'everything around us is matter'. Explain why this statement is not completely correct, giving examples.", answer: "This statement is not completely correct, because while elements and compounds are indeed the building blocks of matter -- everything that has mass and takes up space -- not everything around us is matter. Light, heat, electricity, and even thoughts and emotions are important parts of our world, but none of them are made of matter. So while most of what surrounds us physically is matter, some important things we experience every day are not.", keyPoints: ["States why the claim is incorrect", "Gives correct examples of non-matter", "Clarifies that matter has mass and takes up space"] },
  { id: 20, question: "Explain, with reasoning, why understanding elements and compounds is important for scientists and engineers, using one example each.", answer: "Chemists study how elements combine to form compounds, which enables them to invent life-saving medicines, vaccines, and fertilisers that improve crop production for the growing population. Engineers and material scientists use their understanding of compounds and mixtures to design materials with unique properties, such as stainless steel, an alloy that is stronger and more durable than pure iron. This shows that understanding elements and compounds is not just about recognising what surrounds us, but is also key to innovation.", keyPoints: ["Explains the chemist's use with example", "Explains the engineer's use with example", "Connects to innovation, not just recognition"] },
  { id: 21, question: "Explain why stainless steel is classified as a mixture (an alloy) and not as a compound.", answer: "Stainless steel is made of iron, nickel, chromium, and a small amount of carbon, mixed so uniformly that the whole material looks the same throughout. However, these metals are combined physically, not chemically, and each metal in the alloy keeps its own basic properties rather than forming an entirely new substance with a fixed ratio. Since compounds require a chemical combination in a fixed ratio with entirely new properties, and alloys do not meet this requirement, stainless steel is correctly classified as a mixture (specifically, an alloy), even though it looks uniform.", keyPoints: ["Describes stainless steel's composition", "Explains it is a physical, not chemical, combination", "Concludes it is a mixture (alloy), not a compound"] },
  { id: 22, question: "Explain why muddy water is classified as a non-uniform mixture, while seawater is generally classified as a uniform mixture.", answer: "Muddy water contains visible suspended soil or mud particles that can be seen separately and eventually settle at the bottom, so its components are not evenly distributed, making it non-uniform. Seawater, on the other hand, contains dissolved salts and minerals spread so evenly throughout the water that they cannot be seen separately, making it a uniform mixture, similar to how sugar dissolves evenly in water.", keyPoints: ["Explains muddy water as non-uniform, with reasoning", "Explains seawater as uniform, with reasoning", "Draws the comparison to a familiar uniform mixture"] },
  { id: 23, question: "A substance is found to break down into two simpler, different substances when heated. Explain what this tells you about whether it is an element, a compound, or a mixture.", answer: "Since elements cannot be broken down into simpler substances at all, this substance cannot be an element. Since the two products formed are different substances rather than the original components simply separating out unchanged, this rules out a simple mixture too. This behaviour matches the definition of a compound, which decomposes into the different elements (or simpler compounds) it was chemically formed from, exactly as seen when sugar is heated to give carbon and water.", keyPoints: ["Rules out element correctly", "Rules out simple mixture correctly", "Concludes it must be a compound, with reasoning"] },
  { id: 24, question: "Explain how the properties of Sample B (iron sulfide) support the general statement that 'a compound's properties are different from those of the elements forming it'.", answer: "Iron on its own is magnetic and reacts with dilute hydrochloric acid to release hydrogen gas, while sulfur on its own does not react with the acid at all. Sample B, the compound iron sulfide formed from these two elements, shows neither of these individual properties -- it is not magnetic, and it reacts with the acid to release a completely different gas, hydrogen sulfide, with a rotten-egg smell. This clearly supports the general statement, since iron sulfide's properties match neither iron's nor sulfur's original properties.", keyPoints: ["States iron's and sulfur's individual properties", "States Sample B's different properties", "Connects this to the general statement about compounds"] },
  { id: 25, question: "Explain why 'a mixture can be separated by physical methods, but a compound cannot' is a useful rule for classifying an unknown substance.", answer: "This rule is useful because it gives a simple, testable way to decide between a mixture and a compound without needing to know the substance's full chemical composition in advance. If ordinary physical methods -- like using a magnet, filtering, or evaporation -- successfully separate a substance into two or more different substances, it must be a mixture. If no physical method can separate it, but the substance still turns out to be made of more than one type of particle (as shown, for example, by heating or passing electric current through it), it must be a compound.", keyPoints: ["Explains the mixture case (separable by physical methods)", "Explains the compound case (not separable physically)", "States why this makes a practical, testable rule"] },
];

// ── LONG (5 marks each) ──
export const SCIENCE8EC_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Explain, in detail, what a mixture is, describe the difference between uniform and non-uniform mixtures, and classify mixtures by the physical states of their components with one example each.",
    markingScheme: [
      "Correctly defines a mixture and its components",
      "Explains uniform mixtures with an example",
      "Explains non-uniform mixtures with an example",
      "Classifies mixtures by physical state with correct examples",
      "Draws an overall conclusion connecting the ideas"
    ],
    answerParts: [
      { part: "Definition", text: "A mixture forms when two or more substances are combined such that each substance retains its own properties and does not react chemically with the others; the individual substances are called its components." },
      { part: "Uniform mixtures", text: "In a uniform mixture, the components are evenly distributed and cannot be distinguished from each other, even with a microscope -- for example, sugar dissolved in water." },
      { part: "Non-uniform mixtures", text: "In a non-uniform mixture, the components remain generally visible and can be told apart with the naked eye or a magnifying device -- for example, a sprout salad containing green gram, chickpeas, onion, and tomato." },
      { part: "Classification by physical state", text: "Mixtures can also be classified by the states of their components: gas-and-gas (air), gas-and-liquid (soda water), solid-and-gas (carbon particles in air), liquid-and-liquid (oil and water), solid-and-liquid (sand and water), and solid-and-solid (alloys like brass)." },
      { part: "Final Answer", text: "A mixture keeps its components' individual properties intact; whether it is uniform or non-uniform depends only on whether the components can be distinguished, while its physical-state category depends separately on what states its components are in." }
    ]
  },
  {
    id: 2,
    question: "Describe, in detail, the activity used to confirm the presence of carbon dioxide in air, and explain what air is made of overall, including how dust particles and pollutants relate to air.",
    markingScheme: [
      "Describes the lime water preparation and setup",
      "Describes the milky observation and its chemical explanation",
      "States the overall composition of air",
      "Explains dust particles and their role as pollutants",
      "Draws a clear final conclusion"
    ],
    answerParts: [
      { part: "Activity setup", text: "A glass tumbler is filled halfway with water, and a small amount of calcium oxide (quick lime) is added slowly, forming calcium hydroxide (lime water) after stirring, which is then filtered to get a colourless solution." },
      { part: "Milky observation", text: "When this colourless lime water is left in a petri dish exposed to air for a few hours, it gradually turns milky, because the carbon dioxide in the air reacts with the calcium hydroxide to form insoluble calcium carbonate and water." },
      { part: "Composition of air", text: "Air is a uniform mixture mainly of nitrogen (about 78%), oxygen, argon, carbon dioxide, and water vapour, with oxygen required for most living beings and combustion, while nitrogen does not take part in combustion." },
      { part: "Dust particles", text: "Air also contains tiny dust particles suspended in it, visible as shining specks in a beam of sunlight or as settled particles on a clean black sheet of paper left outdoors; these are considered pollutants since they are not an integral part of air, and the Air Quality Index (AQI) is used to describe air quality." },
      { part: "Final Answer", text: "Air is a uniform mixture of several gases with variable amounts of suspended dust and pollutants, and the lime-water activity provides direct, testable evidence that carbon dioxide is genuinely one of its components." }
    ]
  },
  {
    id: 3,
    question: "Explain, in detail, the difference between the everyday and scientific meanings of 'pure', define a pure substance, and explain the two types of pure substances with examples.",
    markingScheme: [
      "Explains the everyday meaning of 'pure'",
      "Explains the scientific meaning of 'pure'",
      "Gives a correct definition of a pure substance",
      "Explains elements with an example",
      "Explains compounds with an example"
    ],
    answerParts: [
      { part: "Everyday meaning", text: "In common usage, 'pure' means a product is unadulterated -- that no cheaper or lower-quality substances have been illegally added to increase quantity or reduce cost, as is checked for in products like milk, ghee, and spices." },
      { part: "Scientific meaning", text: "In science, 'pure' means a substance has no other substance present in it at all -- so even a product that looks unadulterated in the everyday sense, like milk, is actually impure from a scientific point of view, since it is made of more than one substance." },
      { part: "Definition of a pure substance", text: "A pure substance is a kind of matter that cannot be separated into other kinds of matter by any physical process, meaning it consists of the same type of particles throughout." },
      { part: "Elements", text: "Elements are pure substances made of identical atoms that cannot be broken down into simpler substances, such as hydrogen, oxygen, gold, and sulfur." },
      { part: "Compounds", text: "Compounds are pure substances formed when different elements combine chemically in a fixed ratio, giving properties different from the elements that formed them, such as water (from hydrogen and oxygen) and sodium chloride (from sodium and chlorine)." }
    ]
  },
  {
    id: 4,
    question: "Describe, in detail, the activity of passing electricity through acidified water, explain how the two gases produced are identified, and explain why this shows that water is a compound.",
    markingScheme: [
      "Describes the experimental setup accurately",
      "Describes the gas-collection observation",
      "Explains how each gas is tested and identified",
      "Explains why the gases are not water vapour",
      "Explains why this makes water a compound"
    ],
    answerParts: [
      { part: "Setup", text: "A beaker is filled with water and a few drops of dilute sulfuric acid, a 9 V battery is placed inside it, and two test tubes completely filled with this water are carefully placed over the battery's two terminals." },
      { part: "Gas collection", text: "After some minutes, gas bubbles are seen forming at both terminals, and after 10-15 minutes, the volume of gas collected in one test tube is roughly twice the volume collected in the other." },
      { part: "Testing the gases", text: "Bringing a burning candle near the mouth of each test tube tests the gases -- a pop sound is heard from the tube with the larger volume, confirming hydrogen, while the flame glows brighter near the tube with the smaller volume, confirming oxygen." },
      { part: "Not water vapour", text: "These gases cannot be water vapour, because if they were, they would simply condense back into water rather than remaining as separately testable gases." },
      { part: "Why water is a compound", text: "Since water breaks down into two different elements (hydrogen and oxygen) in a fixed 2:1 ratio that cannot be separated by any physical process, but only by passing electric current through it, water fits the definition of a compound rather than a mixture." }
    ]
  },
  {
    id: 5,
    question: "Explain, in detail, what elements are, how they are classified, and describe the interesting facts about the number and physical states of elements at room temperature.",
    markingScheme: [
      "Correctly defines an element and an atom",
      "Explains molecules using an example",
      "Explains the classification into metals, non-metals, and metalloids",
      "States the total number of known elements and their typical state",
      "States the facts about gaseous and liquid elements at room temperature"
    ],
    answerParts: [
      { part: "Definition", text: "An element is a pure substance made of identical particles called atoms, and elements cannot be broken down further into any simpler substances -- they are the building blocks of all matter." },
      { part: "Molecules", text: "Atoms of most elements do not exist independently; two or more atoms of the same element combine to form a stable particle called a molecule, such as two hydrogen atoms combining to form one hydrogen molecule." },
      { part: "Classification", text: "Elements are classified into metals (such as gold, silver, and iron), non-metals (such as carbon, sulfur, hydrogen, and oxygen), and metalloids (such as silicon and boron), which have properties in between metals and non-metals." },
      { part: "Total number", text: "The number of elements known at present is 118, and most of them exist in a solid state at room temperature." },
      { part: "Gaseous and liquid elements", text: "Eleven elements exist as gases at room temperature, and all are non-metals; only two elements are liquid at room temperature -- mercury (a metal) and bromine (a non-metal) -- while gallium and caesium are solids that turn liquid at a temperature around 30 degrees Celsius." }
    ]
  },
  {
    id: 6,
    question: "Explain, in detail, what a compound is, and describe two separate activities (the sugar-heating activity and the sodium chloride example) that illustrate how compounds differ from their constituent elements.",
    markingScheme: [
      "Correctly defines a compound",
      "Describes the sugar-heating activity accurately",
      "States the conclusion from the sugar activity",
      "Describes the sodium chloride example accurately",
      "States the conclusion from the sodium chloride example"
    ],
    answerParts: [
      { part: "Definition", text: "A compound is formed when different elements combine chemically in a fixed ratio to form something entirely new, with properties different from the elements that formed it, and its constituent elements cannot be separated by any physical method." },
      { part: "Sugar-heating activity", text: "When sugar is heated gently in a boiling tube, it turns brown and then chars to black, water droplets form near the mouth of the tube, and finally charcoal (carbon) is left behind." },
      { part: "Sugar conclusion", text: "Since sugar decomposes into carbon and water (itself made of hydrogen and oxygen) rather than staying as one simple substance, sugar cannot be an element and must be a compound made of carbon, hydrogen, and oxygen." },
      { part: "Sodium chloride example", text: "Sodium, a soft reactive metal, and chlorine, a hazardous gas, combine in a fixed 1:1 ratio to form sodium chloride, a harmless, taste-enhancing substance essential for life." },
      { part: "Final Answer", text: "Both examples show the same underlying idea about compounds -- that a compound's properties (and even its ability to be broken down further) are completely different from those of the elements that combine to form it, in a fixed ratio." }
    ]
  },
  {
    id: 7,
    question: "Describe, in detail, the entire iron-and-sulfur activity from preparation to testing, and explain how each step helps distinguish Sample A as a mixture and Sample B as a compound.",
    markingScheme: [
      "Describes the preparation of Sample A",
      "Describes the preparation of Sample B",
      "Explains the magnet test result and reasoning for both samples",
      "Explains the dilute hydrochloric acid test result and reasoning for both samples",
      "Draws the overall conclusion classifying Sample A and Sample B"
    ],
    answerParts: [
      { part: "Preparing Sample A", text: "5.6 grams of iron filings and 3.2 grams of sulfur powder are mixed thoroughly on a watch glass to form Sample A, in which separate black (iron) and yellow (sulfur) particles can still be seen." },
      { part: "Preparing Sample B", text: "Half of Sample A is heated strongly in a china dish with continuous stirring until a black mass forms; after cooling, this black mass is ground with a mortar and pestle and labelled Sample B." },
      { part: "Magnet test", text: "A magnet attracts the iron filings out of Sample A, since the iron has kept its own natural magnetic property in the mixture; a magnet has no effect at all on Sample B, since heating has chemically combined the iron and sulfur into iron sulfide, a new compound with different properties." },
      { part: "Acid test", text: "Adding dilute hydrochloric acid to Sample A produces iron chloride and hydrogen gas, which is odourless and pops with a flame, since the iron reacts as itself; adding the acid to Sample B produces iron chloride and hydrogen sulfide gas instead, with a rotten-egg odour, since iron sulfide reacts differently as a new compound." },
      { part: "Final Answer", text: "Sample A behaves as a mixture throughout, since its components keep their individual properties and can be separated by physical means (a magnet); Sample B behaves as a compound throughout, since it is a new substance formed by a chemical change, with properties entirely different from plain iron and sulfur." }
    ]
  },
  {
    id: 8,
    question: "Explain, in detail, how elements, compounds, and mixtures are each used in daily life and in various fields, with specific examples for each category.",
    markingScheme: [
      "Explains uses of elements with specific examples",
      "Explains uses of compounds with specific examples",
      "Explains uses of mixtures (including alloys) with specific examples",
      "Explains the role of chemists and material scientists",
      "Draws an overall conclusion about the importance of these concepts"
    ],
    answerParts: [
      { part: "Elements", text: "Elements like iron and aluminium are used directly to construct bridges, buildings, and vehicles, taking advantage of their natural strength and durability." },
      { part: "Compounds", text: "Water, a compound of hydrogen and oxygen, is essential for life; chemists study how elements combine to create compounds used in life-saving medicines, vaccines, and fertilisers that boost crop production." },
      { part: "Mixtures", text: "Wood, steel, and concrete, all used as building materials, are mixtures; alloys like stainless steel (a mixture of iron, nickel, chromium, and carbon) are stronger and more durable than pure iron alone." },
      { part: "Role of scientists", text: "Engineers and material scientists rely on their understanding of compounds and mixtures to design materials with unique properties, such as graphene aerogel, an extremely light, highly porous carbon-based material used to clean up oil spills and in energy-saving devices." },
      { part: "Final Answer", text: "Understanding elements, compounds, and mixtures is not just about recognising what surrounds us -- it is central to innovation in medicine, agriculture, construction, and materials science." }
    ]
  },
  {
    id: 9,
    question: "Explain, in detail, what minerals are, the difference between native minerals and compound minerals, and how minerals are used in everyday products.",
    markingScheme: [
      "Correctly defines what minerals are and how they occur",
      "Explains native minerals with examples",
      "Explains compound minerals with examples",
      "Explains how cement is made from minerals",
      "Explains one further everyday use of minerals"
    ],
    answerParts: [
      { part: "Definition", text: "Most rocks are a mixture of minerals, which can be viewed with the eyes, a magnifying glass, or a microscope." },
      { part: "Native minerals", text: "Native minerals are minerals that exist as pure elements rather than compounds; these can be metals, such as gold, silver, and copper, or non-metals, such as sulfur and carbon." },
      { part: "Compound minerals", text: "Most minerals are actually compounds made up of more than one element, with common examples including quartz, calcite, mica, pyroxene, and olivine." },
      { part: "Cement example", text: "Cement is manufactured from calcite, quartz, alumina, and iron oxide, which are minerals or substances obtained from minerals, each contributing properties needed for a strong building material." },
      { part: "Final Answer", text: "Talcum powder is made from the mineral talc, showing that many everyday products are made up of minerals or of elements extracted from minerals, whether those minerals are native elements or compounds." }
    ]
  },
  {
    id: 10,
    question: "A student is given an unknown black substance and told it may be a mixture of two metal powders or a single new compound. Design, in detail, a step-by-step plan using ideas from this chapter to determine which it is, and explain the reasoning behind each step.",
    markingScheme: [
      "Proposes a reasonable first observational step",
      "Proposes a magnet-based physical separation test with reasoning",
      "Proposes a reaction test (such as with dilute acid) with reasoning",
      "Explains how to interpret a 'mixture' result",
      "Explains how to interpret a 'compound' result"
    ],
    answerParts: [
      { part: "Step 1 -- Observation", text: "First, examine the substance carefully (using a magnifying glass if needed) to see if two differently coloured or textured particles can be distinguished, similar to comparing Sample A and Sample B in the iron-and-sulfur activity." },
      { part: "Step 2 -- Magnet test", text: "If one of the suspected metals is magnetic (like iron), bring a magnet near the substance; if the magnetic metal is successfully attracted and separated out, this shows the metal has kept its own property, suggesting a mixture." },
      { part: "Step 3 -- Reaction test", text: "Add a few drops of a dilute acid (like dilute hydrochloric acid) to a small sample and observe any gas released, noting its smell and any burning-splinter test result, since a mixture's components would react as themselves, while a compound would react differently as a whole new substance." },
      { part: "Interpreting a mixture result", text: "If the magnet successfully separates one component and the reaction matches what one of the suspected pure metals would normally do, the substance is a mixture, since its components have kept their individual properties." },
      { part: "Final Answer", text: "If the magnet has no effect at all and the reaction produces a different gas or result than either suspected metal alone would give, the substance is a compound, since heating or another chemical change has combined the elements into a new substance with entirely different properties -- exactly as seen with iron sulfide in Sample B." }
    ]
  },
  {
    id: 11,
    question: "Explain, in detail, the difference between non-uniform and uniform mixtures, and classify at least four mixtures mentioned in this chapter into the correct category, with reasoning for each.",
    markingScheme: [
      "Correctly defines non-uniform mixtures",
      "Correctly defines uniform mixtures",
      "Classifies at least two mixtures as non-uniform, with reasoning",
      "Classifies at least two mixtures as uniform, with reasoning",
      "Draws an overall conclusion about how to decide the category"
    ],
    answerParts: [
      { part: "Non-uniform mixtures", text: "In a non-uniform mixture, the components remain visible and can be distinguished with the naked eye or a magnifying device -- the components are not evenly spread throughout." },
      { part: "Uniform mixtures", text: "In a uniform mixture, the components are so evenly distributed that they cannot be told apart, even under a microscope." },
      { part: "Non-uniform examples", text: "A sprout salad is non-uniform, since its ingredients (green gram, chickpeas, onion, tomato) remain visible; sand mixed with water is also non-uniform, since sand grains remain visible and settle out." },
      { part: "Uniform examples", text: "Sugar dissolved in water is uniform, since the dissolved particles cannot be seen; air is also uniform, since its gases are evenly and invisibly mixed together." },
      { part: "Final Answer", text: "To decide the category of any mixture, the only question that matters is whether its components can be distinguished from one another -- if yes, it is non-uniform; if no, it is uniform." }
    ]
  },
  {
    id: 12,
    question: "Describe, in detail, how mixtures can be classified by the physical states of their components, giving two examples for each of three different categories, and explain why this classification is separate from the uniform/non-uniform classification.",
    markingScheme: [
      "Gives two correct examples for one physical-state category",
      "Gives two correct examples for a second physical-state category",
      "Gives two correct examples for a third physical-state category",
      "Explains that physical-state classification is independent of uniform/non-uniform",
      "Gives a supporting example showing the two classifications can vary independently"
    ],
    answerParts: [
      { part: "Gas and liquid", text: "Aerated (soda) water and oxygen dissolved in water are both gas-and-liquid mixtures." },
      { part: "Liquid and liquid", text: "Acetic acid in water (vinegar) and oil mixed with water are both liquid-and-liquid mixtures." },
      { part: "Solid and solid", text: "Baking powder (baking soda and tartaric acid) and alloys like brass are both solid-and-solid mixtures." },
      { part: "Independent classifications", text: "The physical-state classification describes only what states the components are in, while the uniform/non-uniform classification describes only whether the components can be distinguished -- these are two separate questions about the same mixture." },
      { part: "Final Answer", text: "This independence is shown clearly by alloys: they are solid-and-solid mixtures, yet they are uniform (like stainless steel), proving that a mixture's physical-state category does not decide whether it is uniform or non-uniform." }
    ]
  },
  {
    id: 13,
    question: "Explain, in detail, the activity used to detect dust particles suspended in air, describe what pollutants are, and explain why the number of dust particles in air can vary.",
    markingScheme: [
      "Describes the black-sheet-of-paper activity accurately",
      "States the observation from the activity",
      "Explains what pollutants are, in relation to air",
      "States the major pollutants present in air",
      "Explains why dust particle levels vary"
    ],
    answerParts: [
      { part: "Activity", text: "A black sheet of paper, free of any visible dust, is placed undisturbed near an open window or in a garden for a few hours." },
      { part: "Observation", text: "Tiny particles are found settled on its surface, which can be examined more closely using a magnifying glass, showing that dust particles are indeed suspended in the air." },
      { part: "Pollutants", text: "These dust particles are not an integral part of the air itself and are therefore considered pollutants." },
      { part: "Major pollutants", text: "The major pollutants present in air include particulate matter (dust, soot) and gases like carbon monoxide, ozone, nitrogen dioxide, and sulfur dioxide, measured using the Air Quality Index (AQI)." },
      { part: "Final Answer", text: "The nature and number of dust particles in the air varies from time to time and from place to place, depending on local sources of pollution and environmental conditions." }
    ]
  },
  {
    id: 14,
    question: "Explain, in detail, why a scientist would classify milk, packed fruit juice, and soil as mixtures rather than pure substances, even though some of them are labelled 'pure' on their packaging.",
    markingScheme: [
      "Explains the scientific definition of a pure substance",
      "Explains why milk is a mixture, not a pure substance",
      "Explains why packed fruit juice is a mixture, not a pure substance",
      "Explains why soil is a mixture, not a pure substance",
      "Draws the overall conclusion about labelling versus scientific classification"
    ],
    answerParts: [
      { part: "Scientific definition", text: "A pure substance, according to science, has no other substance present in it at all, and cannot be separated into other kinds of matter by any physical process." },
      { part: "Milk", text: "Milk contains water, fats, proteins, and other substances together, so even if it is unadulterated (pure in the everyday sense), it is a mixture from a scientific point of view." },
      { part: "Packed fruit juice", text: "Packed fruit juice contains water, dissolved sugars, fruit pulp, and other substances mixed together, making it a mixture rather than a single pure substance." },
      { part: "Soil", text: "Soil is a mixture of minerals, organic matter, water, and air, all combined together, none of which alone makes up the whole." },
      { part: "Final Answer", text: "The word 'pure' on a package refers only to the absence of illegal adulteration, which is a completely different idea from the strict scientific meaning of a pure substance having only one type of particle throughout." }
    ]
  },
  {
    id: 15,
    question: "Explain, in detail, the reasoning behind classifying hydrogen and oxygen as elements and water as a compound, using the water-electrolysis activity as the connecting evidence.",
    markingScheme: [
      "States why hydrogen and oxygen are elements",
      "Describes the water-electrolysis activity as connecting evidence",
      "States the fixed ratio in which they combine in water",
      "Explains why water cannot be separated into hydrogen and oxygen by physical means",
      "Draws the overall conclusion distinguishing elements from the compound they form"
    ],
    answerParts: [
      { part: "Why hydrogen and oxygen are elements", text: "Hydrogen and oxygen cannot be broken down further into any simpler substances, and each is made of identical atoms of its own kind, meeting the exact definition of an element." },
      { part: "Connecting evidence", text: "The water-electrolysis activity shows that passing electric current through water produces exactly these two gases, showing that water must be built from them." },
      { part: "Fixed ratio", text: "The atoms of hydrogen and oxygen combine in water in a fixed ratio of 2:1." },
      { part: "Cannot separate physically", text: "Because hydrogen and oxygen particles in water are chemically combined so tightly, no physical method (like filtering or evaporation) can separate them back into the two gases -- only a chemical process like passing electric current can." },
      { part: "Final Answer", text: "Hydrogen and oxygen are elements because they cannot be broken down further, while water is a compound because it is formed by combining these two elements chemically in a fixed ratio that cannot be undone by physical means." }
    ]
  },
  {
    id: 16,
    question: "Explain, in detail, how elements can be used to manufacture a single complex product like a mobile phone, and connect this to the idea that elements are the 'building blocks of matter'.",
    markingScheme: [
      "States the number of elements typically used in a mobile phone",
      "Gives at least three correctly named elements used and their general role",
      "Explains why so many different elements are needed rather than just one",
      "Connects this to the definition of elements as building blocks",
      "Draws an overall conclusion about the scale of element use in everyday technology"
    ],
    answerParts: [
      { part: "Number of elements", text: "More than 45 different elements are used in manufacturing a single mobile phone." },
      { part: "Example elements", text: "These include aluminium, copper, silicon, cobalt, lithium, gold, and silver, used in components such as the screen, battery, and internal circuitry." },
      { part: "Why so many are needed", text: "Each element has its own distinct properties -- for example, some conduct electricity well, some are light and strong, and some are needed in small precise amounts for batteries -- so many different elements are needed together to build all the different parts of the device." },
      { part: "Connection to building blocks", text: "Since elements are the simplest substances that cannot be broken down further, and everything in the mobile phone is ultimately built from combinations and uses of these elements, this directly demonstrates the idea of elements as the building blocks of all matter." },
      { part: "Final Answer", text: "A single everyday object like a mobile phone shows, in a very concrete way, just how many different elements combine to build the complex materials and components used in modern technology." }
    ]
  },
  {
    id: 17,
    question: "Explain, in detail, the difference between how a mixture and a compound respond to physical separation methods, using the iron-and-sulfur activity and one additional example of your own choice from the chapter.",
    markingScheme: [
      "Explains how a mixture responds to physical separation, with reasoning",
      "Explains how a compound responds (or fails to respond) to physical separation, with reasoning",
      "Uses the iron-and-sulfur activity correctly as the primary example",
      "Uses a second correct example from the chapter",
      "Draws an overall conclusion about the general rule"
    ],
    answerParts: [
      { part: "Mixture and physical separation", text: "In a mixture, components keep their own individual properties, so they can generally be separated by an appropriate physical method, such as using a magnet, filtering, or evaporation." },
      { part: "Compound and physical separation", text: "In a compound, the constituent elements are chemically combined and cannot be separated by any physical method at all -- only a chemical process (like heating strongly or passing electric current) can break the compound back into simpler substances." },
      { part: "Iron-and-sulfur example", text: "Sample A (a mixture of iron and sulfur) can be separated using a magnet, which pulls out the iron; Sample B (the compound iron sulfide) cannot be separated this way at all, since the iron is now chemically bound to the sulfur." },
      { part: "Second example", text: "Similarly, dissolved sodium chloride (a mixture with water) can be recovered by the physical process of evaporation, but sodium chloride itself cannot be separated into sodium and chlorine by any physical method, since it is a compound." },
      { part: "Final Answer", text: "In every case, whether a physical method can separate a substance's components is the clearest, most reliable way to tell a mixture apart from a compound." }
    ]
  },
  {
    id: 18,
    question: "Explain, in detail, how the concepts of elements, compounds, and mixtures apply to a real Indian craft tradition (Dhokra art) and a real Indian scientific heritage reference (Mishraloha), connecting both to the chapter's ideas about alloys.",
    markingScheme: [
      "Describes the Dhokra art process accurately",
      "Identifies the metals/alloy used in Dhokra art and classifies it correctly",
      "Explains the term Mishraloha and what it refers to",
      "Gives the correct historical example (Kamsya) with its composition and ratio",
      "Draws an overall conclusion connecting tradition to the chapter's scientific concepts"
    ],
    answerParts: [
      { part: "Dhokra art process", text: "Dhokra art, an old craft from Bihar and Odisha, involves shaping a design in beeswax, covering it with clay to form a mould, melting out the wax, and filling the hollow space with molten brass or bronze." },
      { part: "Classification", text: "The brass or bronze used is a mixture -- specifically an alloy -- since it combines two metals physically rather than forming a new chemical compound, giving the figures their strength and golden colour." },
      { part: "Mishraloha", text: "Mishraloha is the historical term for a mixture of two or more metals having properties distinct from its constituent metals, mentioned in ancient Indian texts such as the Charaka Samhita and Susruta Samhita." },
      { part: "Kamsya example", text: "Bronze, known as Kamsya, was one such alloy, made of copper (Tamra, 4 parts) and tin (Vanga, 1 part), and was historically used to improve digestion and boost immunity." },
      { part: "Final Answer", text: "Both Dhokra art and the historical idea of Mishraloha show that Indian traditions understood and used alloys (mixtures of metals) for centuries, well before the scientific classification of mixtures and compounds used today." }
    ]
  },
  {
    id: 19,
    question: "A group of substances is given: carbon dioxide, magnesium oxide, air, and gold. Explain, in detail, how each should be classified as an element, a compound, or a mixture, giving reasoning for each.",
    markingScheme: [
      "Correctly classifies carbon dioxide with reasoning",
      "Correctly classifies magnesium oxide with reasoning",
      "Correctly classifies air with reasoning",
      "Correctly classifies gold with reasoning",
      "Draws an overall conclusion about the reasoning process used"
    ],
    answerParts: [
      { part: "Carbon dioxide", text: "Carbon dioxide is a compound, since it is formed when carbon combines chemically with oxygen in a fixed ratio, and its properties differ from those of carbon and oxygen individually." },
      { part: "Magnesium oxide", text: "Magnesium oxide is a compound, formed when magnesium burns in oxygen and combines chemically with it, again in a fixed ratio, forming a new substance with different properties." },
      { part: "Air", text: "Air is a mixture -- specifically a uniform mixture of gases like nitrogen, oxygen, argon, carbon dioxide, and water vapour, none of which react chemically with each other." },
      { part: "Gold", text: "Gold is an element, since it cannot be broken down into any simpler substances and is made of identical atoms of its own kind; it can also be called a native mineral." },
      { part: "Final Answer", text: "In each case, the classification depends on the same two questions: can it be broken down further (ruling in or out an element), and if not, was it formed by a fixed chemical combination (compound) or just physically combined substances (mixture)." }
    ]
  },
  {
    id: 20,
    question: "Explain, in detail, why understanding what is NOT matter is just as important as understanding what elements, compounds, and mixtures are, using specific examples from the chapter.",
    markingScheme: [
      "States the correct definition of matter",
      "Gives at least two correct examples of things that are not matter",
      "Explains why these examples do not qualify as matter",
      "Explains why this distinction is useful in understanding the world",
      "Draws an overall conclusion connecting matter and non-matter"
    ],
    answerParts: [
      { part: "Definition of matter", text: "Matter is anything that has mass and takes up space; elements and compounds are its basic building blocks, and everyday materials are built from combinations of them." },
      { part: "Examples of non-matter", text: "Light, heat, and electricity are all important parts of our world, but none of them are made of matter." },
      { part: "Why they are not matter", text: "These do not have mass in the way physical substances do, and they do not occupy space as a solid, liquid, or gas would -- they are forms of energy or experience rather than physical substances built from elements and compounds." },
      { part: "Why the distinction is useful", text: "Being able to tell matter from non-matter prevents confusion when studying physical substances -- for example, understanding that the warmth felt near a fire is heat (not matter), while the wood burning is matter, avoids mixing up very different kinds of phenomena." },
      { part: "Final Answer", text: "Understanding what matter is -- and just as importantly, what it is not -- gives a clearer, more complete picture of the world, since not everything we experience around us is built from elements, compounds, and mixtures." }
    ]
  }
];

// ── COMPETENCY / CASE-BASED (4 marks each) ──
export const SCIENCE8EC_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Poha and the Sugar Water",
    caseDescription: "Meera makes a plate of poha with visible peanuts, onions, and curry leaves mixed in, and also stirs a spoon of sugar into a glass of water until it completely dissolves.",
    subQuestions: [
      { question: "Which of these two, the poha or the sugar water, is a non-uniform mixture? Explain.", answer: "The poha, since its ingredients (peanuts, onions, curry leaves) remain visible and can be picked apart, meaning its components are not evenly distributed." },
      { question: "Why can Meera not see the sugar in the water even though she knows it is there?", answer: "The sugar has broken into constituent particles so small and evenly spread throughout the water that they cannot be distinguished, even under a microscope." },
      { question: "Do the ingredients in the poha react chemically with each other?", answer: "No -- the components of a mixture, including the poha's ingredients, do not react chemically with each other; each keeps its own properties." },
      { question: "If Meera evaporates the sugar water completely, what would she expect to find left behind?", answer: "She would find sugar crystals left behind, since evaporation is a physical method that can separate the components of this mixture." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Milky Lime Water",
    caseDescription: "A student prepares a clear solution of lime water and leaves it in an open petri dish near a window for several hours, checking it now and then, and notices it slowly turning milky.",
    subQuestions: [
      { question: "What gas from the air is responsible for the lime water turning milky?", answer: "Carbon dioxide." },
      { question: "Write the word equation for the reaction that takes place.", answer: "Calcium hydroxide + Carbon dioxide -> Calcium carbonate + Water." },
      { question: "Why does the solution appear milky rather than staying clear?", answer: "Because calcium carbonate, formed by the reaction, is insoluble in water and appears as tiny suspended white particles, making the solution look milky." },
      { question: "If the same lime water were kept in a completely sealed, airtight container instead, would it still turn milky? Explain.", answer: "No -- since it would not be exposed to the carbon dioxide in the air, there would be no reaction to form calcium carbonate, so it would remain clear." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Electrolysis Test Tubes",
    caseDescription: "A teacher demonstrates passing electricity through acidified water using a 9 V battery and two water-filled test tubes placed over its terminals, and after fifteen minutes, one test tube has collected clearly more gas than the other.",
    subQuestions: [
      { question: "Which gas has collected in greater volume, and why?", answer: "Hydrogen, because water contains twice as many hydrogen atoms as oxygen atoms (a 2:1 ratio), so more hydrogen gas is released." },
      { question: "How would the teacher confirm which test tube contains hydrogen?", answer: "By bringing a burning candle near its mouth -- a pop sound confirms hydrogen gas." },
      { question: "How would the teacher confirm which test tube contains oxygen?", answer: "By bringing a burning candle near its mouth -- the flame glowing brighter confirms oxygen gas." },
      { question: "Could these collected gases simply be water vapour? Explain.", answer: "No -- if they were water vapour, they would condense back into water rather than remaining as separately testable, flammable, or combustion-supporting gases." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Charred Sugar Mystery",
    caseDescription: "A student heats a spoon of sugar in a boiling tube under a teacher's supervision and watches it turn brown, then black, with water droplets forming near the mouth of the tube and a black residue left behind.",
    subQuestions: [
      { question: "What is the black residue left behind in the boiling tube?", answer: "Charcoal, which is carbon." },
      { question: "Where did the water droplets near the mouth of the tube come from?", answer: "From the sugar itself, since the tube was sealed from outside air during heating, so the water must have come from inside the sugar as it decomposed." },
      { question: "Can sugar be classified as an element? Explain.", answer: "No -- since heating breaks sugar down into carbon and water (two different substances), and elements cannot be broken down into simpler substances, sugar is not an element." },
      { question: "What compound is sugar actually made of, based on this activity?", answer: "Sugar is a compound made of carbon, hydrogen, and oxygen, since it decomposes into carbon and water (which itself contains hydrogen and oxygen)." }
    ]
  },
  {
    id: 5,
    caseTitle: "Sodium, Chlorine, and the Salt Shaker",
    caseDescription: "A student learns that sodium is a soft, highly reactive metal and chlorine is a hazardous, poisonous gas, and is surprised to learn that these two combine to form ordinary table salt used every day at meals.",
    subQuestions: [
      { question: "What is the substance formed when sodium and chlorine combine?", answer: "Sodium chloride, or common table salt." },
      { question: "In what ratio do sodium and chlorine particles combine to form this substance?", answer: "In a 1:1 ratio." },
      { question: "Why is sodium chloride safe to eat even though sodium and chlorine are individually dangerous?", answer: "Because a compound's properties are always different from the properties of the elements that form it; sodium chloride is an entirely new substance, not simply a mix of dangerous sodium and chlorine." },
      { question: "Can sodium chloride be separated back into sodium and chlorine by dissolving it in water and evaporating the water? Explain.", answer: "No -- evaporation would only separate the dissolved sodium chloride from the water; separating sodium chloride into sodium and chlorine themselves is not possible by any physical method, since they are chemically combined." }
    ]
  },
  {
    id: 6,
    caseTitle: "Sample A Meets a Magnet",
    caseDescription: "A student mixes iron filings and sulfur powder to form Sample A, then heats half of it to form a black mass, Sample B, and tests both with a magnet.",
    subQuestions: [
      { question: "What result would the student observe with Sample A and the magnet?", answer: "The magnet would attract and pull out the iron filings from Sample A." },
      { question: "What result would the student observe with Sample B and the magnet?", answer: "The magnet would have no effect at all on Sample B." },
      { question: "Why does the iron in Sample A still respond to the magnet?", answer: "Because Sample A is only a mixture, so the iron has kept its own natural magnetic property, unchanged by simply being mixed with sulfur." },
      { question: "Why does Sample B not respond to the magnet at all?", answer: "Because heating has chemically combined the iron and sulfur into iron sulfide, a new compound whose properties -- including magnetism -- are completely different from plain iron." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Rotten-Egg Surprise",
    caseDescription: "A student adds a few drops of dilute hydrochloric acid to Sample A and separately to Sample B, and notices that the gas released from Sample B has a strong, unpleasant, rotten-egg-like smell, quite different from the gas released from Sample A.",
    subQuestions: [
      { question: "What gas is released when dilute hydrochloric acid is added to Sample A, and what are its properties?", answer: "Hydrogen gas, which is colourless, has no smell, and burns with a pop sound." },
      { question: "What gas is released when dilute hydrochloric acid is added to Sample B, and what are its properties?", answer: "Hydrogen sulfide gas, which is colourless but has a rotten-egg-like odour." },
      { question: "Write the word equation for the reaction between Sample A's iron and dilute hydrochloric acid.", answer: "Iron + Dilute hydrochloric acid -> Iron chloride + Hydrogen gas." },
      { question: "What safety precaution should always be followed when smelling a gas released in such an activity?", answer: "The gas should never be smelled directly -- it should be gently wafted towards the nose from a safe distance." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Mobile Phone's Hidden Elements",
    caseDescription: "A student learns that a single mobile phone is made using more than 45 different elements, including aluminium, copper, silicon, cobalt, lithium, gold, and silver, used in its screen, battery, and other components.",
    subQuestions: [
      { question: "What does this fact suggest about the classification of elements into metals and non-metals?", answer: "It suggests that a mobile phone uses a wide range of both metals (like aluminium, copper, gold, and silver) and elements like silicon, which is a metalloid, showing how varied elements are used together." },
      { question: "Why would engineers need this many different elements rather than just one or two?", answer: "Because each element has its own unique properties suited to a specific function -- for example, one element may be needed for its electrical conductivity in wiring, while another is needed for its strength or light weight in the casing." },
      { question: "Is silicon classified as a metal or a non-metal?", answer: "Neither exactly -- silicon is a metalloid, having properties in between those of metals and non-metals." },
      { question: "How does this example connect to the idea that elements are 'building blocks of matter'?", answer: "It shows very directly that even a single complex, everyday device is ultimately built up from many different pure elements, each contributing its own properties to the finished product." }
    ]
  },
  {
    id: 9,
    caseTitle: "Gold, Quartz, and the Rock Collection",
    caseDescription: "A geology student collects rock samples containing a small nugget of pure gold and separate crystals of quartz, and wants to classify both as minerals correctly.",
    subQuestions: [
      { question: "Is the gold nugget a native mineral or a compound mineral? Explain.", answer: "A native mineral, since gold exists in nature as a pure element, not combined with other elements." },
      { question: "Is quartz a native mineral or a compound mineral?", answer: "A compound mineral, since quartz is made up of more than one element combined together." },
      { question: "Are most minerals found in rocks native minerals or compounds?", answer: "Most minerals are compounds; native minerals (pure elements) are the less common exception." },
      { question: "Name one non-metal that can also occur as a native mineral.", answer: "Sulfur (or carbon), since native minerals can be either metals or non-metals existing as pure elements." }
    ]
  },
  {
    id: 10,
    caseTitle: "Not Everything Is Matter",
    caseDescription: "A student lists everything in their room -- a chair, a book, sunlight coming through the window, the warmth they feel, and their own excitement about an upcoming trip -- and wonders whether all of these count as matter.",
    subQuestions: [
      { question: "Which items in the student's list are matter, and why?", answer: "The chair and the book are matter, since they have mass and take up space." },
      { question: "Is sunlight considered matter? Explain.", answer: "No -- light is not made of matter, even though it can be observed and felt." },
      { question: "Is the warmth (heat) the student feels considered matter?", answer: "No -- heat is not matter, even though its effects can be sensed." },
      { question: "Is the student's excitement about the trip considered matter?", answer: "No -- thoughts and emotions are not matter, even though they are a real and important part of our world." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Stainless Steel Kitchen",
    caseDescription: "A family uses stainless steel utensils every day, made of iron, nickel, chromium, and a small amount of carbon mixed so uniformly that no individual metal can be seen.",
    subQuestions: [
      { question: "Is stainless steel a compound or a mixture? Explain.", answer: "A mixture (specifically an alloy), since its metals are combined physically rather than chemically, and each metal keeps its own basic properties." },
      { question: "Why does stainless steel appear the same throughout, even though it contains several different metals?", answer: "Because the metals are mixed so uniformly and finely that individual particles of each metal cannot be distinguished, making it a uniform mixture." },
      { question: "Name two other alloys mentioned in this chapter, along with the metals that form them.", answer: "Brass (copper and zinc) and bronze (copper and tin)." },
      { question: "Why is stainless steel preferred over pure iron for many kitchen utensils?", answer: "Because combining iron with other metals gives it properties -- such as greater strength and resistance to rusting -- that pure iron alone does not have as effectively." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Talcum Powder and the Cement Bag",
    caseDescription: "A student notices a bag of cement and a container of talcum powder at a construction site and learns that both are made from minerals found in the earth.",
    subQuestions: [
      { question: "Which mineral is talcum powder made from?", answer: "Talc." },
      { question: "Name the minerals or mineral-derived substances cement is made from.", answer: "Calcite, quartz, alumina, and iron oxide." },
      { question: "Are calcite and quartz native minerals or compound minerals?", answer: "Compound minerals, since they are made up of more than one element." },
      { question: "Why might a construction engineer need several different minerals to make cement rather than just one?", answer: "Because each mineral contributes different properties needed to make cement strong, durable, and able to bind and harden properly, which no single mineral could provide alone." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Air We Cannot See",
    caseDescription: "A student is told that the air around them is a uniform mixture of several gases plus some suspended dust, and wants to understand exactly what makes up the air they breathe every day.",
    subQuestions: [
      { question: "What is the most abundant gas in air, and does it support combustion?", answer: "Nitrogen, making up about 78% of air, and it does not support combustion." },
      { question: "Which gas in air is needed by most living beings and also helps in combustion?", answer: "Oxygen." },
      { question: "What happens to the water vapour in air when it touches a cool surface?", answer: "It turns into liquid water, forming tiny droplets." },
      { question: "Are the dust particles found in air considered part of air's normal composition, or as pollutants?", answer: "They are considered pollutants, since they are not an integral part of the air itself." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Dhokra Artisan's Metals",
    caseDescription: "A craftsperson practising the traditional Dhokra art fills a clay mould with molten brass or bronze to create a shiny golden figure, a technique passed down for generations.",
    subQuestions: [
      { question: "Is the brass or bronze used in Dhokra art a mixture or a compound?", answer: "A mixture -- specifically, an alloy." },
      { question: "What two metals combine to form the bronze that might be used in this art?", answer: "Copper and tin." },
      { question: "Why does the finished Dhokra figure have a shiny golden colour and added strength compared to using a single pure metal?", answer: "Because combining metals in an alloy can give the resulting mixture different, often improved, properties -- such as colour and strength -- compared to any one of the pure metals alone." },
      { question: "Is the ancient term 'Kamsya' associated with brass or with bronze?", answer: "Bronze -- Kamsya was the name for an alloy of copper (four parts) and tin (one part)." }
    ]
  },
  {
    id: 15,
    caseTitle: "Table 8.3 -- Sorting the Substances",
    caseDescription: "A student is given a list of substances to sort into elements, compounds, and mixtures: oxygen, magnesium oxide, seawater, gold, and rust.",
    subQuestions: [
      { question: "Is oxygen an element, a compound, or a mixture?", answer: "An element -- it cannot be broken down into simpler substances." },
      { question: "Is magnesium oxide an element, a compound, or a mixture?", answer: "A compound -- it is formed when magnesium combines chemically with oxygen." },
      { question: "Is seawater an element, a compound, or a mixture?", answer: "A mixture -- specifically, a uniform mixture of water with dissolved salts and minerals." },
      { question: "Is gold an element, a compound, or a mixture, and can it also be called a mineral?", answer: "Gold is an element; it can also be called a mineral, specifically a native mineral, since it occurs naturally as a pure element." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Fizzy Drink Investigation",
    caseDescription: "A student examines a bottle of aerated (soda) water and notices bubbles of gas continuously escaping when the cap is opened, and wants to understand what type of mixture this is.",
    subQuestions: [
      { question: "What type of mixture, by physical state, is aerated water?", answer: "A gas-and-liquid mixture." },
      { question: "Which gas is dissolved in the water to make it fizzy?", answer: "Carbon dioxide gas." },
      { question: "Is aerated water a uniform or non-uniform mixture? Explain.", answer: "A uniform mixture, since the dissolved gas cannot be seen separately from the water until it escapes as bubbles." },
      { question: "Give one other example of a gas dissolved in a liquid, mentioned in this chapter.", answer: "Oxygen dissolved in water." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Graphene Aerogel Wonder",
    caseDescription: "A student reads about graphene aerogel, a material made from carbon that is so light it can be held up by a blade of grass, and is known for its very high absorbing capacity.",
    subQuestions: [
      { question: "Which element is graphene aerogel made from?", answer: "Carbon." },
      { question: "Why is graphene aerogel useful for cleaning up oil spills?", answer: "Because it is highly porous and has a high absorbing capacity, allowing it to soak up spilled oil effectively." },
      { question: "Is carbon a metal, a non-metal, or a metalloid?", answer: "A non-metal." },
      { question: "What field of science and engineering would be responsible for developing a material like graphene aerogel?", answer: "Material science -- material scientists design materials with unique properties based on their understanding of elements and compounds." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Two Test Tubes and the Burning Candle",
    caseDescription: "During the water-electrolysis activity, a teacher carefully removes each water-filled test tube one at a time and brings a burning candle close to the mouth of each, asking the class to note down what happens.",
    subQuestions: [
      { question: "What sound or change would the class observe from the test tube containing hydrogen?", answer: "A pop sound." },
      { question: "What change would the class observe in the flame near the test tube containing oxygen?", answer: "The flame would glow brighter." },
      { question: "Why is this test done one test tube at a time rather than both together?", answer: "So that each gas can be identified individually and clearly, without the results of the two tests being confused with each other." },
      { question: "What safety instruction is important to follow while performing this gas test?", answer: "To maintain a safe distance from the set-up while performing the gas test with the burning candle." }
    ]
  },
  {
    id: 19,
    caseTitle: "The Bronze Medicine of the Past",
    caseDescription: "A student reads that ancient Indian texts describe an alloy called Kamsya, made of copper and tin, that was historically used to help improve digestion and boost immunity.",
    subQuestions: [
      { question: "What alloy is being described in this historical reference?", answer: "Bronze (Kamsya)." },
      { question: "In what ratio were copper and tin combined to form this alloy, as historically described?", answer: "Copper (Tamra) to tin (Vanga) in a 4:1 ratio." },
      { question: "Is bronze classified as a compound or a mixture?", answer: "A mixture -- specifically, an alloy." },
      { question: "What is the general historical term used for a mixture of two or more metals with properties distinct from its constituent metals?", answer: "Mishraloha." }
    ]
  },
  {
    id: 20,
    caseTitle: "A and B Combine to Form C",
    caseDescription: "A student is shown a general reaction where two substances, A and B, which cannot be broken down into simpler substances by chemical reactions, combine to form a product, C.",
    subQuestions: [
      { question: "Based on this description, what should A and B be classified as?", answer: "Elements, since they cannot be broken down into simpler substances by chemical reactions." },
      { question: "What should C be classified as?", answer: "A compound, since it is formed by the combination of two elements." },
      { question: "Would C have a fixed composition? Explain.", answer: "Yes -- compounds are formed when elements combine chemically in a fixed ratio, giving C a fixed composition." },
      { question: "Would the properties of C be the same as those of A and B? Explain.", answer: "No -- a compound's properties are always different from the properties of the elements that combine to form it." }
    ]
  }
];

// ── SELF-ASSESSMENT (separate 50-MCQ, 30-minute timed set) ──
export const SCIENCE8EC_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "A mixture is formed when two or more substances are combined such that:", options: ["They react chemically to form something new", "Each substance retains its own properties", "One substance disappears completely", "They must always be in the same physical state"], correctAnswer: 1, explanation: "In a mixture, each substance keeps its own properties and does not react chemically." },
  { id: 2, question: "The substances that make up a mixture are individually called its:", options: ["Molecules", "Elements", "Components", "Compounds"], correctAnswer: 2, explanation: "The substances making up a mixture are its components." },
  { id: 3, question: "A mixture in which the components are visible and can be picked apart is called:", options: ["Uniform", "Non-uniform", "A compound", "An element"], correctAnswer: 1, explanation: "Such a mixture, where components remain distinguishable, is non-uniform." },
  { id: 4, question: "Sugar completely dissolved in water is an example of a mixture that is:", options: ["Non-uniform", "Uniform", "A pure element", "A compound"], correctAnswer: 1, explanation: "Since the components cannot be told apart, it is a uniform mixture." },
  { id: 5, question: "Stainless steel is an example of:", options: ["A compound", "An alloy", "A single pure element", "A non-uniform mixture"], correctAnswer: 1, explanation: "Stainless steel is an alloy -- a uniform mixture of metals." },
  { id: 6, question: "Brass is formed by mixing which two metals?", options: ["Copper and tin", "Copper and zinc", "Iron and nickel", "Gold and copper"], correctAnswer: 1, explanation: "Brass is an alloy of copper and zinc." },
  { id: 7, question: "Bronze is formed by mixing which two metals?", options: ["Copper and zinc", "Copper and tin", "Iron and chromium", "Sodium and chlorine"], correctAnswer: 1, explanation: "Bronze is an alloy of copper and tin." },
  { id: 8, question: "Air is classified as a:", options: ["Non-uniform mixture", "Uniform mixture", "Single element", "Compound of nitrogen and oxygen"], correctAnswer: 1, explanation: "Air is a uniform mixture of gases." },
  { id: 9, question: "The gas making up about 78% of air is:", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], correctAnswer: 1, explanation: "Nitrogen makes up about 78% of air." },
  { id: 10, question: "Lime water turning milky is used to test for the presence of:", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Water vapour"], correctAnswer: 1, explanation: "Lime water turns milky in the presence of carbon dioxide." },
  { id: 11, question: "The products of the reaction between calcium hydroxide and carbon dioxide are:", options: ["Calcium carbonate and water", "Calcium oxide and hydrogen", "Sodium chloride and oxygen", "Only calcium carbonate"], correctAnswer: 0, explanation: "This reaction gives calcium carbonate and water." },
  { id: 12, question: "Dust particles suspended in air are considered:", options: ["An essential part of air", "Pollutants", "A type of pure substance", "Elements"], correctAnswer: 1, explanation: "Dust particles are considered pollutants, not an integral part of air." },
  { id: 13, question: "AQI stands for a tool used to describe:", options: ["Water quality", "Air quality", "Soil quality", "Sound quality"], correctAnswer: 1, explanation: "AQI (Air Quality Index) describes air quality." },
  { id: 14, question: "Soda water is an example of a mixture of the type:", options: ["Solid and liquid", "Gas and liquid", "Gas and gas", "Solid and solid"], correctAnswer: 1, explanation: "Soda water is a gas (carbon dioxide) dissolved in a liquid." },
  { id: 15, question: "Sand mixed with water is an example of a mixture of the type:", options: ["Gas and liquid", "Solid and liquid", "Liquid and liquid", "Solid and gas"], correctAnswer: 1, explanation: "This is a solid mixed with a liquid." },
  { id: 16, question: "Baking powder (baking soda and tartaric acid) is a mixture of the type:", options: ["Solid and solid", "Solid and liquid", "Gas and gas", "Liquid and liquid"], correctAnswer: 0, explanation: "Baking powder is a mixture of two solids." },
  { id: 17, question: "In science, a pure substance is one that:", options: ["Looks clean and unadulterated", "Has no other substance present in it", "Is always a solid", "Can always be separated by physical means"], correctAnswer: 1, explanation: "Scientifically, a pure substance has no other substance in it at all." },
  { id: 18, question: "Adding cheaper substances illegally to a product to increase its quantity is called:", options: ["Purification", "Adulteration", "Compounding", "Electrolysis"], correctAnswer: 1, explanation: "This illegal practice is called adulteration." },
  { id: 19, question: "A pure substance cannot be separated into other kinds of matter by:", options: ["Any physical process", "Heating only", "Any chemical process", "Filtering only"], correctAnswer: 0, explanation: "A pure substance cannot be separated by any physical process." },
  { id: 20, question: "Pure substances are classified into:", options: ["Solids and liquids", "Elements and compounds", "Metals and alloys", "Mixtures and solutions"], correctAnswer: 1, explanation: "Pure substances are elements and compounds." },
  { id: 21, question: "Passing electricity through acidified water produces:", options: ["Nitrogen and argon", "Hydrogen and oxygen", "Carbon dioxide and nitrogen", "Only water vapour"], correctAnswer: 1, explanation: "Electrolysis of water produces hydrogen and oxygen gas." },
  { id: 22, question: "In the water-electrolysis activity, the gas producing a pop sound with a flame is:", options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"], correctAnswer: 1, explanation: "Hydrogen produces a pop sound when tested with a flame." },
  { id: 23, question: "In the water-electrolysis activity, the gas making a flame glow brighter is:", options: ["Hydrogen", "Oxygen", "Nitrogen", "Argon"], correctAnswer: 1, explanation: "Oxygen supports combustion, making a flame glow brighter." },
  { id: 24, question: "Substances that cannot be broken down into simpler substances are called:", options: ["Mixtures", "Compounds", "Elements", "Alloys"], correctAnswer: 2, explanation: "Elements cannot be broken down into simpler substances." },
  { id: 25, question: "An element is made up of identical particles called:", options: ["Molecules only", "Atoms", "Compounds", "Alloys"], correctAnswer: 1, explanation: "Elements are made of identical atoms." },
  { id: 26, question: "Two atoms of oxygen combining together form:", options: ["An oxygen compound", "An oxygen molecule", "An oxygen mixture", "A different element entirely"], correctAnswer: 1, explanation: "Two oxygen atoms combine to form one oxygen molecule." },
  { id: 27, question: "Elements are broadly classified into:", options: ["Mixtures and compounds", "Metals and non-metals", "Uniform and non-uniform", "Native and compound"], correctAnswer: 1, explanation: "Elements are classified as metals and non-metals." },
  { id: 28, question: "Silicon and boron are examples of:", options: ["Metals", "Non-metals only", "Metalloids", "Alloys"], correctAnswer: 2, explanation: "Silicon and boron are metalloids." },
  { id: 29, question: "The total number of elements currently known is approximately:", options: ["78", "100", "118", "150"], correctAnswer: 2, explanation: "118 elements are currently known." },
  { id: 30, question: "The number of elements that exist as gases at room temperature is:", options: ["Two", "Eleven", "Forty-five", "One hundred and eighteen"], correctAnswer: 1, explanation: "Eleven elements are gases at room temperature." },
  { id: 31, question: "The two elements that are liquid at room temperature are:", options: ["Gold and silver", "Mercury and bromine", "Gallium and caesium", "Iron and aluminium"], correctAnswer: 1, explanation: "Mercury and bromine are liquid at room temperature." },
  { id: 32, question: "Compounds are formed when elements combine:", options: ["Physically, without reacting", "Chemically, in a fixed ratio", "Only when heated to very high temperatures", "Only in the presence of water"], correctAnswer: 1, explanation: "Compounds form through chemical combination in a fixed ratio." },
  { id: 33, question: "The ratio of hydrogen to oxygen atoms in water is:", options: ["1:1", "2:1", "3:1", "1:2"], correctAnswer: 1, explanation: "Water has hydrogen and oxygen in a 2:1 ratio." },
  { id: 34, question: "The ratio of sodium to chlorine particles in sodium chloride is:", options: ["1:1", "2:1", "1:2", "3:1"], correctAnswer: 0, explanation: "Sodium chloride has sodium and chlorine in a 1:1 ratio." },
  { id: 35, question: "Heating sugar in a boiling tube eventually leaves behind:", options: ["Pure water", "Charcoal (carbon)", "Sodium chloride", "Hydrogen gas"], correctAnswer: 1, explanation: "Sugar decomposes on heating, leaving behind charcoal." },
  { id: 36, question: "Sugar is concluded to be a compound of:", options: ["Only hydrogen and oxygen", "Carbon, hydrogen, and oxygen", "Sodium and chlorine", "Only carbon"], correctAnswer: 1, explanation: "Sugar decomposes into carbon and water, showing it contains carbon, hydrogen, and oxygen." },
  { id: 37, question: "Sample A in the iron-and-sulfur activity is prepared by:", options: ["Heating iron and sulfur together", "Mixing iron filings and sulfur powder without heating", "Dissolving iron in acid", "Passing electricity through sulfur"], correctAnswer: 1, explanation: "Sample A is a simple mixture, made without heating." },
  { id: 38, question: "Sample B in the iron-and-sulfur activity is:", options: ["The same as Sample A", "Iron sulfide, formed by heating Sample A", "Pure iron only", "Pure sulfur only"], correctAnswer: 1, explanation: "Sample B is iron sulfide, a compound formed by heating." },
  { id: 39, question: "Which sample responds to a magnet?", options: ["Only Sample B", "Only Sample A", "Both equally", "Neither"], correctAnswer: 1, explanation: "Only Sample A (the mixture) responds to a magnet." },
  { id: 40, question: "Sample A reacting with dilute hydrochloric acid produces:", options: ["Hydrogen sulfide gas", "Hydrogen gas", "Oxygen gas", "No gas at all"], correctAnswer: 1, explanation: "Sample A's iron reacts with the acid to give hydrogen gas." },
  { id: 41, question: "Sample B reacting with dilute hydrochloric acid produces a gas that smells like:", options: ["Nothing at all", "Rotten eggs", "Fresh flowers", "Vinegar"], correctAnswer: 1, explanation: "Sample B produces hydrogen sulfide gas, with a rotten-egg smell." },
  { id: 42, question: "Native minerals, such as gold and sulfur, exist in nature as:", options: ["Compounds", "Pure elements", "Alloys", "Mixtures of two metals"], correctAnswer: 1, explanation: "Native minerals are pure elements found in nature." },
  { id: 43, question: "Most minerals found in rocks are:", options: ["Pure elements", "Compounds", "Alloys", "Gases"], correctAnswer: 1, explanation: "Most minerals are compounds made of more than one element." },
  { id: 44, question: "Cement is made mainly from:", options: ["Only sand and water", "Calcite, quartz, alumina, and iron oxide", "Only gold and silver", "Only talc"], correctAnswer: 1, explanation: "Cement is manufactured from calcite, quartz, alumina, and iron oxide." },
  { id: 45, question: "Talcum powder is made from the mineral:", options: ["Quartz", "Talc", "Calcite", "Mica"], correctAnswer: 1, explanation: "Talcum powder is made from talc." },
  { id: 46, question: "Which of these is NOT considered matter?", options: ["Iron", "Water", "Heat", "Air"], correctAnswer: 2, explanation: "Heat is not matter, unlike iron, water, and air." },
  { id: 47, question: "Iron and aluminium are used to construct bridges and buildings mainly because they are:", options: ["Compounds with fixed ratios", "Strong, useful elements", "Non-uniform mixtures", "Gases at room temperature"], correctAnswer: 1, explanation: "Iron and aluminium are strong, useful elements used in construction." },
  { id: 48, question: "Graphene aerogel, an extremely light material used to clean oil spills, is made from the element:", options: ["Silicon", "Carbon", "Iron", "Sodium"], correctAnswer: 1, explanation: "Graphene aerogel is made from carbon." },
  { id: 49, question: "The historical term 'Mishraloha' refers to:", options: ["A single pure element", "A mixture of two or more metals with distinct properties", "A type of gas", "A compound of hydrogen and oxygen"], correctAnswer: 1, explanation: "Mishraloha was the term for an alloy (mixture of metals)." },
  { id: 50, question: "Overall, which idea best summarises this chapter?", options: ["Everything around us is a single pure substance", "Matter can be classified as elements, compounds, or mixtures based on composition and properties", "Only mixtures exist in nature", "Compounds and mixtures are exactly the same thing"], correctAnswer: 1, explanation: "This captures the chapter's central theme of classifying matter into elements, compounds, and mixtures." },
];
