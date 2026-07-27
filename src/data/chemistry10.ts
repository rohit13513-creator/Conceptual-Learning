import { QuizQuestion, NCERTSolvedQuestion, ShortQuestion, LongQuestion, AssertionReasonQuestion, CompetencyQuestion } from "../types-custom";

// Solved answers for every in-text "Questions" block and every numbered end-of-chapter exercise
// from the Chemical Reactions and Equations unit. Answers are worked against the standard,
// widely-published CBSE/board marking scheme for this exact syllabus content.
export const CHEMISTRY10_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "In-Text Q1",
    question: "Why should a magnesium ribbon be cleaned before burning in air?",
    given: { "Observation": "Magnesium metal exposed to air" },
    formulaUsed: "Surface oxidation of reactive metals in air",
    derivationSteps: [
      "Magnesium is a reactive metal and reacts slowly with atmospheric oxygen even at room temperature.",
      "This forms a thin, unreactive layer of magnesium oxide (MgO) on the surface of the ribbon.",
      "This oxide layer coats the metal and prevents it from burning properly or igniting easily.",
      "Rubbing with sandpaper removes this oxide layer and exposes fresh, reactive metal underneath."
    ],
    finalAnswer: "The magnesium ribbon is cleaned with sandpaper to remove the layer of magnesium oxide from its surface, so the metal underneath can burn readily and completely in air.",
    conceptualTip: "Any metal that forms a surface oxide layer (aluminium, magnesium) needs cleaning before a combustion demonstration, or the reaction will look weak or fail to start."
  },
  {
    id: 2,
    questionNumber: "In-Text Q2",
    question: "Write the balanced equations for: (i) Hydrogen + Chlorine → Hydrogen chloride (ii) Barium chloride + Aluminium sulphate → Barium sulphate + Aluminium chloride (iii) Sodium + Water → Sodium hydroxide + Hydrogen",
    given: { "(i)": "H2 + Cl2 -> HCl", "(ii)": "BaCl2 + Al2(SO4)3 -> BaSO4 + AlCl3", "(iii)": "Na + H2O -> NaOH + H2" },
    formulaUsed: "Balance atom counts on both sides using whole-number coefficients only",
    derivationSteps: [
      "(i) H2 and Cl2 each contribute 2 atoms; one HCl only has 1 H and 1 Cl, so 2 HCl are needed to balance both sides.",
      "(ii) Al2(SO4)3 has 2 Al and 3 SO4 groups; matching these requires 3 BaCl2 (for 3 SO4 -> 3 BaSO4) and 2 AlCl3 (for 2 Al), which also balances 6 Cl on both sides.",
      "(iii) Balancing Na, O, and H together requires 2 Na and 2 H2O on the left to give 2 NaOH + 1 H2 with matching atoms on the right."
    ],
    finalAnswer: "(i) H2 + Cl2 -> 2HCl  (ii) 3BaCl2 + Al2(SO4)3 -> 3BaSO4 + 2AlCl3  (iii) 2Na + 2H2O -> 2NaOH + H2",
    conceptualTip: "Always balance the compound with the most atoms (like Al2(SO4)3) first, then work outward to the simpler formulas."
  },
  {
    id: 3,
    questionNumber: "In-Text Q3",
    question: "Write balanced chemical equations with state symbols for: (i) Solutions of barium chloride and sodium sulphate in water react to give insoluble barium sulphate and the solution of sodium chloride. (ii) Sodium hydroxide solution reacts with hydrochloric acid solution to produce sodium chloride solution and water.",
    given: { "(i) reactants": "BaCl2(aq) + Na2SO4(aq)", "(ii) reactants": "NaOH(aq) + HCl(aq)" },
    formulaUsed: "Double displacement: AB + CD -> AD + CB, with state symbols (s)/(l)/(g)/(aq)",
    derivationSteps: [
      "(i) Ba2+ pairs with SO4(2-) to form the insoluble precipitate BaSO4(s); Na+ pairs with Cl- to remain dissolved as NaCl(aq).",
      "(ii) The acid and base neutralise each other, producing the salt sodium chloride and water; both reactants and the salt are in aqueous solution."
    ],
    finalAnswer: "(i) BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + 2NaCl(aq)  (ii) NaOH(aq) + HCl(aq) -> NaCl(aq) + H2O(l)",
    conceptualTip: "Whenever one product is insoluble in water it is marked (s) with a downward precipitate arrow; the other product usually stays (aq)."
  },
  {
    id: 4,
    questionNumber: "In-Text Q4",
    question: "A solution of a substance 'X' is used for whitewashing. (i) Name the substance 'X' and write its formula. (ii) Write the reaction of the substance 'X' named in (i) above with water.",
    given: { "Use": "Whitewashing of walls" },
    formulaUsed: "Combination reaction of a metal oxide with water",
    derivationSteps: [
      "The substance used to begin the whitewashing process is calcium oxide (quicklime), CaO.",
      "When water is added to quicklime, it reacts vigorously and exothermically to form calcium hydroxide (slaked lime).",
      "The slaked-lime solution/suspension is what is actually applied to walls; it later reacts with atmospheric CO2 to leave a shiny CaCO3 finish."
    ],
    finalAnswer: "X = Calcium oxide (CaO). Reaction with water: CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat.",
    conceptualTip: "Don't confuse quicklime (CaO) with slaked lime (Ca(OH)2) -- CaO is the starting solid, Ca(OH)2 is what actually goes on the wall."
  },
  {
    id: 5,
    questionNumber: "In-Text Q5",
    question: "Why is the amount of gas collected in one of the test tubes in the water-electrolysis activity double the amount collected in the other? Name this gas.",
    given: { "Molecular formula": "H2O", "Ratio of H atoms to O atoms": "2 : 1" },
    formulaUsed: "2H2O(l) -electricity-> 2H2(g) + O2(g)",
    derivationSteps: [
      "Each water molecule (H2O) contains 2 hydrogen atoms for every 1 oxygen atom.",
      "During electrolysis, these atoms are released as H2 gas at the cathode and O2 gas at the anode in that same 2:1 mole ratio.",
      "Equal moles of gas occupy equal volumes under the same conditions, so twice as many moles of H2 means twice the volume of H2 compared to O2."
    ],
    finalAnswer: "The gas collected in double volume is hydrogen (H2), because water contains hydrogen and oxygen atoms in a 2:1 ratio.",
    conceptualTip: "The gas that burns with a characteristic 'pop' sound when tested with a burning splint is hydrogen; the one that relights a glowing splint is oxygen."
  },
  {
    id: 6,
    questionNumber: "In-Text Q6",
    question: "Why does the colour of copper sulphate solution change when an iron nail is dipped in it?",
    given: { "Reactants": "Fe(s) + CuSO4(aq)" },
    formulaUsed: "Displacement reaction: A + BC -> AC + B",
    derivationSteps: [
      "Iron is more reactive than copper, so it displaces copper from the copper sulphate solution.",
      "The Cu2+ ions responsible for the solution's blue colour are replaced by Fe2+ ions, which are pale green.",
      "Metallic copper is deposited on the surface of the iron nail as a reddish-brown coating."
    ],
    finalAnswer: "The blue colour fades (turning pale green) because Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s) -- iron displaces copper, and the newly formed iron sulphate is pale green instead of blue.",
    conceptualTip: "A colour change like this is one of the simplest visible confirmations that a displacement reaction has actually occurred."
  },
  {
    id: 7,
    questionNumber: "In-Text Q7",
    question: "Give an example of a double displacement reaction other than the sodium sulphate + barium chloride reaction.",
    given: { "Reaction type needed": "Double displacement (ion exchange)" },
    formulaUsed: "AB + CD -> AD + CB",
    derivationSteps: [
      "Choose two soluble ionic compounds whose 'swapped' combination produces an insoluble precipitate.",
      "Silver nitrate and sodium chloride are a classic example: swapping ions gives insoluble silver chloride."
    ],
    finalAnswer: "AgNO3(aq) + NaCl(aq) -> AgCl(s) [white precipitate] + NaNO3(aq). (Lead nitrate + potassium iodide giving yellow lead iodide is an equally valid example.)",
    conceptualTip: "Any 'precipitation reaction' you observe in a lab is automatically also an example of a double displacement reaction."
  },
  {
    id: 8,
    questionNumber: "In-Text Q8",
    question: "Identify the substances that are oxidised and the substances that are reduced in: (i) 4Na(s) + O2(g) -> 2Na2O(s) (ii) CuO(s) + H2(g) -> Cu(s) + H2O(l)",
    given: { "(i)": "4Na + O2 -> 2Na2O", "(ii)": "CuO + H2 -> Cu + H2O" },
    formulaUsed: "Oxidation = gain of oxygen; Reduction = loss of oxygen",
    derivationSteps: [
      "(i) Sodium metal has no oxygen initially and ends up bonded to oxygen in Na2O, so sodium is oxidised. Oxygen gas is the one being taken up, so it is the species being reduced (gaining electrons/bonding).",
      "(ii) CuO loses its oxygen atom to become Cu metal, so CuO is reduced. H2 gains that oxygen to become H2O, so H2 is oxidised."
    ],
    finalAnswer: "(i) Sodium is oxidised; oxygen is reduced.  (ii) CuO is reduced (to Cu); H2 is oxidised (to H2O).",
    conceptualTip: "In any redox equation, whatever gains oxygen is oxidised, and whatever loses oxygen is reduced -- they always happen together."
  },
  {
    id: 9,
    questionNumber: "Textbook Q1",
    question: "Which of the statements about the reaction below are incorrect? 2PbO(s) + C(s) -> 2Pb(s) + CO2(g). (a) Lead is getting reduced. (b) Carbon dioxide is getting oxidised. (c) Carbon is getting oxidised. (d) Lead oxide is getting reduced. Options: (i) (a) and (b) (ii) (a) and (c) (iii) (a), (b) and (c) (iv) all",
    given: { "Reaction": "2PbO(s) + C(s) -> 2Pb(s) + CO2(g)" },
    formulaUsed: "Oxidation = gain of oxygen; Reduction = loss of oxygen",
    derivationSteps: [
      "Carbon (C) gains oxygen to form CO2, so carbon is genuinely oxidised -- statement (c) is correct, not incorrect.",
      "Lead oxide (PbO) loses its oxygen to form Pb metal, so it is lead OXIDE (the compound) that is precisely and correctly described as being reduced -- statement (d) is correct.",
      "Statement (a) loosely says 'lead is getting reduced', but it is the compound lead oxide that undergoes reduction, not the element lead itself (lead is the product of that reduction) -- this imprecise phrasing is marked incorrect.",
      "Statement (b) says carbon dioxide is 'getting oxidised', but CO2 is the finished product of carbon's oxidation -- it is carbon, not carbon dioxide, that is oxidised, so this statement is factually incorrect."
    ],
    finalAnswer: "(i) (a) and (b) are the incorrect statements.",
    conceptualTip: "Watch the wording carefully in redox MCQs -- exam-setters often test whether you can tell 'the compound is reduced' apart from 'the element product is reduced'."
  },
  {
    id: 10,
    questionNumber: "Textbook Q2",
    question: "Fe2O3 + 2Al -> Al2O3 + 2Fe. The above reaction is an example of a (a) combination reaction (b) double displacement reaction (c) decomposition reaction (d) displacement reaction.",
    given: { "Reaction": "Fe2O3 + 2Al -> Al2O3 + 2Fe" },
    formulaUsed: "A + BC -> AC + B (single displacement)",
    derivationSteps: [
      "Aluminium is more reactive than iron, so it displaces iron from its oxide, taking iron's place bonded to oxygen.",
      "This matches the general single-displacement pattern where a more reactive element pushes out a less reactive one."
    ],
    finalAnswer: "(d) Displacement reaction. (This specific well-known example is also called the thermite reaction.)",
    conceptualTip: "Any reaction where a single free element takes the place of another element already in a compound is a displacement reaction."
  },
  {
    id: 11,
    questionNumber: "Textbook Q3",
    question: "What happens when dilute hydrochloric acid is added to iron filings? Tick the correct answer. (a) Hydrogen gas and iron chloride are produced. (b) Chlorine gas and iron hydroxide are produced. (c) No reaction takes place. (d) Iron salt and water are produced.",
    given: { "Reactants": "Fe(s) + HCl(aq)" },
    formulaUsed: "Metal + Dilute Acid -> Salt + Hydrogen gas",
    derivationSteps: [
      "Iron, being an active metal above hydrogen in the reactivity series, displaces hydrogen from dilute hydrochloric acid.",
      "This produces the soluble salt iron(II) chloride and releases hydrogen gas, identifiable by a pop sound with a burning splint."
    ],
    finalAnswer: "(a) Hydrogen gas and iron chloride are produced: Fe(s) + 2HCl(aq) -> FeCl2(aq) + H2(g).",
    conceptualTip: "Any reactive metal + dilute acid always follows the same pattern: Metal + Acid -> Salt + Hydrogen."
  },
  {
    id: 12,
    questionNumber: "Textbook Q4",
    question: "What is a balanced chemical equation? Why should chemical equations be balanced?",
    given: { "Concept": "Law of Conservation of Mass" },
    formulaUsed: "Total mass of reactants = Total mass of products",
    derivationSteps: [
      "A balanced chemical equation is one in which the number of atoms of each element is exactly equal on both the reactant (left) side and the product (right) side.",
      "This matters because of the Law of Conservation of Mass: matter can neither be created nor destroyed in a chemical reaction, so atoms cannot appear or vanish -- they can only be rearranged into new substances.",
      "An unbalanced (skeletal) equation would incorrectly imply that mass changes during the reaction, which never actually happens."
    ],
    finalAnswer: "A balanced chemical equation has equal atom counts of every element on both sides. Equations are balanced so they correctly obey the Law of Conservation of Mass.",
    conceptualTip: "Balance the compound with the most atoms and the most 'locked-in' elements first, then handle simpler formulas last."
  },
  {
    id: 13,
    questionNumber: "Textbook Q5",
    question: "Translate the following statements into chemical equations and then balance them. (a) Hydrogen gas combines with nitrogen to form ammonia. (b) Hydrogen sulphide gas burns in air to give water and sulphur dioxide. (c) Barium chloride reacts with aluminium sulphate to give aluminium chloride and a precipitate of barium sulphate. (d) Potassium metal reacts with water to give potassium hydroxide and hydrogen gas.",
    given: { "(a)": "H2 + N2 -> NH3", "(b)": "H2S + O2 -> H2O + SO2", "(c)": "BaCl2 + Al2(SO4)3 -> AlCl3 + BaSO4", "(d)": "K + H2O -> KOH + H2" },
    formulaUsed: "Balance atom counts with whole-number coefficients",
    derivationSteps: [
      "(a) Balancing 2 N atoms and 6 H atoms needs N2 + 3H2 -> 2NH3.",
      "(b) Balancing S, H, and O together needs 2H2S + 3O2 -> 2H2O + 2SO2.",
      "(c) As in In-Text Q2(ii): 3BaCl2 + Al2(SO4)3 -> 3BaSO4 + 2AlCl3.",
      "(d) Balancing K, O, and H needs 2K + 2H2O -> 2KOH + H2."
    ],
    finalAnswer: "(a) N2 + 3H2 -> 2NH3  (b) 2H2S + 3O2 -> 2H2O + 2SO2  (c) 3BaCl2 + Al2(SO4)3 -> 3BaSO4 + 2AlCl3  (d) 2K + 2H2O -> 2KOH + H2",
    conceptualTip: "Potassium reacts with water just like sodium does -- both are Group 1 alkali metals with near-identical reaction patterns."
  },
  {
    id: 14,
    questionNumber: "Textbook Q6",
    question: "Balance the following chemical equations. (a) HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O (b) NaOH + H2SO4 -> Na2SO4 + H2O (c) NaCl + AgNO3 -> AgCl + NaNO3 (d) BaCl2 + H2SO4 -> BaSO4 + HCl",
    given: { "(a)": "unbalanced", "(b)": "unbalanced", "(c)": "check if already balanced", "(d)": "unbalanced" },
    formulaUsed: "Balance atom counts with whole-number coefficients",
    derivationSteps: [
      "(a) Ca(OH)2 supplies 2 OH groups, so 2 HNO3 are needed to supply matching H and NO3 groups.",
      "(b) H2SO4 supplies 2 H atoms, so 2 NaOH are needed to fully neutralise it and form 2 H2O.",
      "(c) Every formula already appears once on each side with matching atom counts -- no coefficients are needed.",
      "(d) H2SO4 supplies 2 H atoms which must appear as 2 HCl on the product side."
    ],
    finalAnswer: "(a) 2HNO3 + Ca(OH)2 -> Ca(NO3)2 + 2H2O  (b) 2NaOH + H2SO4 -> Na2SO4 + 2H2O  (c) NaCl + AgNO3 -> AgCl + NaNO3 (already balanced)  (d) BaCl2 + H2SO4 -> BaSO4 + 2HCl",
    conceptualTip: "Not every equation needs new coefficients -- always check whether it's already balanced before you start guessing numbers."
  },
  {
    id: 15,
    questionNumber: "Textbook Q7",
    question: "Write the balanced chemical equations for the following reactions. (a) Calcium hydroxide + Carbon dioxide -> Calcium carbonate + Water (b) Zinc + Silver nitrate -> Zinc nitrate + Silver (c) Aluminium + Copper chloride -> Aluminium chloride + Copper (d) Barium chloride + Potassium sulphate -> Barium sulphate + Potassium chloride",
    given: { "(a)": "Ca(OH)2 + CO2", "(b)": "Zn + AgNO3", "(c)": "Al + CuCl2", "(d)": "BaCl2 + K2SO4" },
    formulaUsed: "Balance atom counts with whole-number coefficients",
    derivationSteps: [
      "(a) Every formula already has matching atom counts on both sides -- no extra coefficients needed.",
      "(b) Zn displaces Ag; 2 AgNO3 are needed to balance the 2 NO3 groups that pair with one Zn2+.",
      "(c) 2 Al displace 3 Cu2+ ions (matching charges: 2x(+3) = 3x(+2) = +6), needing 3 CuCl2 and 2 AlCl3.",
      "(d) Every formula already balances 1:1:1:1."
    ],
    finalAnswer: "(a) Ca(OH)2 + CO2 -> CaCO3 + H2O  (b) Zn + 2AgNO3 -> Zn(NO3)2 + 2Ag  (c) 2Al + 3CuCl2 -> 2AlCl3 + 3Cu  (d) BaCl2 + K2SO4 -> BaSO4 + KCl",
    conceptualTip: "When a metal displaces an ion with a different charge (e.g. Al3+ vs Cu2+), balance by finding the lowest common multiple of the charges."
  },
  {
    id: 16,
    questionNumber: "Textbook Q8",
    question: "Write the balanced chemical equation for the following and identify the type of reaction in each case. (a) Potassium bromide + Barium iodide -> Potassium iodide + Barium bromide (b) Zinc carbonate -> Zinc oxide + Carbon dioxide (c) Hydrogen + Chlorine -> Hydrogen chloride (d) Magnesium + Hydrochloric acid -> Magnesium chloride + Hydrogen",
    given: { "(a)": "KBr + BaI2", "(b)": "ZnCO3", "(c)": "H2 + Cl2", "(d)": "Mg + HCl" },
    formulaUsed: "Identify pattern: combination / decomposition / displacement / double displacement",
    derivationSteps: [
      "(a) Two compounds exchange ions (K/Ba swap partners with Br/I) -- this is a double displacement reaction.",
      "(b) One compound (ZnCO3) breaks into two simpler substances on heating -- this is a (thermal) decomposition reaction.",
      "(c) Two elements join to form a single compound -- this is a combination reaction.",
      "(d) A reactive metal displaces hydrogen from an acid -- this is a displacement reaction."
    ],
    finalAnswer: "(a) 2KBr + BaI2 -> 2KI + BaBr2 -- Double displacement.  (b) ZnCO3(s) -> ZnO(s) + CO2(g) -- Decomposition.  (c) H2(g) + Cl2(g) -> 2HCl(g) -- Combination.  (d) Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g) -- Displacement.",
    conceptualTip: "This single question is a great one-stop check for whether you can correctly tell all four major reaction types apart."
  },
  {
    id: 17,
    questionNumber: "Textbook Q9",
    question: "What does one mean by exothermic and endothermic reactions? Give examples.",
    given: { "Concept": "Energy change during a chemical reaction" },
    formulaUsed: "Exothermic: releases energy; Endothermic: absorbs energy",
    derivationSteps: [
      "An exothermic reaction releases heat energy to the surroundings as the products form, so the reaction mixture and its surroundings get warmer.",
      "An endothermic reaction absorbs heat energy from the surroundings to proceed, so the reaction mixture and its surroundings get cooler."
    ],
    finalAnswer: "Exothermic example: CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g) + heat (combustion of natural gas). Endothermic example: CaCO3(s) -> CaO(s) + CO2(g) (thermal decomposition of limestone, needs continuous heat input).",
    conceptualTip: "Respiration, combustion, and neutralisation reactions are almost always exothermic; most thermal decomposition reactions are endothermic."
  },
  {
    id: 18,
    questionNumber: "Textbook Q10",
    question: "Why is respiration considered an exothermic reaction? Explain.",
    given: { "Reaction": "C6H12O6(aq) + 6O2(aq) -> 6CO2(aq) + 6H2O(l) + energy" },
    formulaUsed: "Exothermic reaction releases energy as a product",
    derivationSteps: [
      "During respiration, glucose obtained from digested food combines with oxygen inside body cells.",
      "This reaction breaks glucose down into carbon dioxide and water, and in doing so releases usable chemical energy.",
      "Because energy is given out (not absorbed) as the reaction proceeds, respiration fits the exact definition of an exothermic reaction."
    ],
    finalAnswer: "Respiration is exothermic because it releases energy as one of its products: C6H12O6 + 6O2 -> 6CO2 + 6H2O + energy -- this released energy powers the body's functions and maintains body heat.",
    conceptualTip: "Respiration is essentially a slow, controlled version of combustion happening inside living cells."
  },
  {
    id: 19,
    questionNumber: "Textbook Q11",
    question: "Why are decomposition reactions called the opposite of combination reactions? Write equations for these reactions.",
    given: { "Combination general form": "A + B -> AB", "Decomposition general form": "AB -> A + B" },
    formulaUsed: "Reverse-process relationship",
    derivationSteps: [
      "In a combination reaction, two or more simpler reactants join together to form one single, more complex product.",
      "In a decomposition reaction, exactly the reverse happens: one single compound breaks apart into two or more simpler substances.",
      "Since decomposition simply reverses what combination does, the two reaction types are considered opposites of each other."
    ],
    finalAnswer: "Combination example: CaO(s) + H2O(l) -> Ca(OH)2(aq). Decomposition example (its reverse-type relationship): CaCO3(s) -> CaO(s) + CO2(g) on heating.",
    conceptualTip: "If you ever see a reaction and its 'mirror image' reverse reaction, one is very likely combination and the other decomposition."
  },
  {
    id: 20,
    questionNumber: "Textbook Q12",
    question: "Write one equation each for decomposition reactions where energy is supplied in the form of heat, light or electricity.",
    given: { "Heat": "thermal decomposition", "Light": "photolytic decomposition", "Electricity": "electrolytic decomposition" },
    formulaUsed: "AB -(energy)-> A + B",
    derivationSteps: [
      "Heat-driven (thermal): limestone breaks down into quicklime and carbon dioxide when strongly heated.",
      "Light-driven (photolytic): silver chloride breaks down into silver metal and chlorine gas when exposed to sunlight.",
      "Electricity-driven (electrolytic): water is split into hydrogen and oxygen gas when an electric current is passed through it."
    ],
    finalAnswer: "Heat: CaCO3(s) -(heat)-> CaO(s) + CO2(g).  Light: 2AgCl(s) -(sunlight)-> 2Ag(s) + Cl2(g).  Electricity: 2H2O(l) -(electricity)-> 2H2(g) + O2(g).",
    conceptualTip: "Notice all three follow the same AB -> A + B skeleton -- only the energy source driving the breakdown changes."
  },
  {
    id: 21,
    questionNumber: "Textbook Q13",
    question: "What is the difference between displacement and double displacement reactions? Write equations for these reactions.",
    given: { "Displacement": "A + BC -> AC + B", "Double displacement": "AB + CD -> AD + CB" },
    formulaUsed: "Number of species exchanging places",
    derivationSteps: [
      "In a displacement reaction, a single free element takes the place of another (less reactive) element inside a compound.",
      "In a double displacement reaction, no free element is involved at all -- instead, two compounds swap ions/radicals with each other to form two brand-new compounds."
    ],
    finalAnswer: "Displacement example: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s). Double displacement example: Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq).",
    conceptualTip: "Quick test: if a free metal or element appears as a reactant and a different free element appears as a product, it's displacement, not double displacement."
  },
  {
    id: 22,
    questionNumber: "Textbook Q14",
    question: "In the refining of silver, the recovery of silver from silver nitrate solution involved displacement by copper metal. Write down the reaction involved.",
    given: { "Reactants": "Cu(s) + AgNO3(aq)" },
    formulaUsed: "A + BC -> AC + B (displacement)",
    derivationSteps: [
      "Copper is more reactive than silver, so copper metal displaces silver from silver nitrate solution.",
      "Copper forms soluble copper(II) nitrate, while silver is deposited as free metal."
    ],
    finalAnswer: "Cu(s) + 2AgNO3(aq) -> Cu(NO3)2(aq) + 2Ag(s).",
    conceptualTip: "This is exactly the same displacement pattern as iron displacing copper from copper sulphate -- just with a different, more reactive-than-silver metal."
  },
  {
    id: 23,
    questionNumber: "Textbook Q15",
    question: "What do you mean by a precipitation reaction? Explain by giving examples.",
    given: { "Concept": "Formation of an insoluble solid from two solutions" },
    formulaUsed: "AB(aq) + CD(aq) -> AD(s) precipitate + CB(aq)",
    derivationSteps: [
      "A precipitation reaction is a type of double displacement reaction in which two soluble reactant solutions combine to form at least one new, insoluble product.",
      "This insoluble product separates out of the solution as a solid, called a precipitate."
    ],
    finalAnswer: "Example 1: Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) [white precipitate] + 2NaCl(aq). Example 2: Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) [yellow precipitate] + 2KNO3(aq).",
    conceptualTip: "The colour of a precipitate is often a giveaway clue in exams -- BaSO4 is white, PbI2 is bright yellow, AgCl is white turning grey/violet in light."
  },
  {
    id: 24,
    questionNumber: "Textbook Q16",
    question: "Explain the following in terms of gain or loss of oxygen with two examples each. (a) Oxidation (b) Reduction",
    given: { "(a)": "Oxidation definition", "(b)": "Reduction definition" },
    formulaUsed: "Oxidation = gain of oxygen; Reduction = loss of oxygen",
    derivationSteps: [
      "(a) Oxidation is the process in which a substance gains oxygen during a chemical reaction.",
      "(b) Reduction is the process in which a substance loses oxygen during a chemical reaction."
    ],
    finalAnswer: "(a) Oxidation examples: 2Mg(s) + O2(g) -> 2MgO(s); 2Cu + O2 -(heat)-> 2CuO.  (b) Reduction examples: CuO + H2 -> Cu + H2O; Fe2O3 + 2Al -> Al2O3 + 2Fe.",
    conceptualTip: "In any single redox equation you can usually spot BOTH an oxidation example and a reduction example happening together."
  },
  {
    id: 25,
    questionNumber: "Textbook Q17",
    question: "A shiny brown coloured element 'X' on heating in air becomes black in colour. Name the element 'X' and the black coloured compound formed.",
    given: { "Property": "Shiny brown metal that blackens on heating in air" },
    formulaUsed: "2Cu(s) + O2(g) -(heat)-> 2CuO(s)",
    derivationSteps: [
      "The shiny reddish-brown metal that is extremely commonly referenced in this exact context is copper.",
      "When heated strongly in air, copper's surface reacts with atmospheric oxygen and becomes coated with black copper(II) oxide."
    ],
    finalAnswer: "X = Copper (Cu). The black compound formed is copper(II) oxide, CuO.",
    conceptualTip: "This is one of the most frequently repeated one-liner questions in board papers -- memorise Cu -> CuO (black) on sight."
  },
  {
    id: 26,
    questionNumber: "Textbook Q18",
    question: "Why do we apply paint on iron articles?",
    given: { "Goal": "Prevent corrosion (rusting) of iron" },
    formulaUsed: "Rusting requires simultaneous contact with O2 and moisture",
    derivationSteps: [
      "Rusting of iron only happens when the metal surface is simultaneously exposed to both oxygen and moisture from the air.",
      "A layer of paint physically coats and seals the iron surface, blocking direct contact with air and water."
    ],
    finalAnswer: "Paint is applied to iron articles to prevent oxygen and moisture from reaching the metal surface, which stops (or greatly slows down) rusting/corrosion.",
    conceptualTip: "Galvanising (a zinc coating) and electroplating work on the exact same 'block the air and moisture' principle as painting."
  },
  {
    id: 27,
    questionNumber: "Textbook Q19",
    question: "Oil and fat containing food items are flushed with nitrogen. Why?",
    given: { "Goal": "Prevent rancidity of fats/oils" },
    formulaUsed: "Rancidity is caused by oxidation of fats and oils",
    derivationSteps: [
      "Fats and oils turn rancid (develop a bad smell and taste) when they are oxidised by the oxygen present in air.",
      "Nitrogen gas is chemically unreactive (inert), so flushing a food packet with nitrogen displaces the oxygen inside it.",
      "With almost no oxygen left in the packaging, the oxidation reaction that causes rancidity cannot take place."
    ],
    finalAnswer: "Food packets are flushed with nitrogen to remove the oxygen inside them, since it is oxidation by oxygen that causes fats and oils to turn rancid.",
    conceptualTip: "Nitrogen is chosen specifically because it does not react with the food -- it just physically pushes the reactive oxygen out."
  },
  {
    id: 28,
    questionNumber: "Textbook Q20",
    question: "Explain the following terms with one example each. (a) Corrosion (b) Rancidity",
    given: { "(a)": "Corrosion definition", "(b)": "Rancidity definition" },
    formulaUsed: "Both are everyday, unwanted consequences of oxidation",
    derivationSteps: [
      "(a) Corrosion is the gradual degradation of a metal when it is attacked by substances present in its environment, such as moisture, acids, or gases.",
      "(b) Rancidity is the spoiling of fats and oils in food due to oxidation, which changes their smell and taste for the worse."
    ],
    finalAnswer: "(a) Corrosion example: Iron reacts with oxygen and moisture in air to form reddish-brown rust (hydrated iron(III) oxide) on its surface.  (b) Rancidity example: Potato chips or fried snacks left open for a long time smell and taste unpleasant because their oil has oxidised.",
    conceptualTip: "Both corrosion and rancidity can be slowed by the same basic strategy: keep oxygen and moisture away from the vulnerable material."
  }
];

export const CHEMISTRY10_MCQS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is NOT a sign that a chemical reaction has taken place?",
    options: ["Change in state", "Change in colour", "Change in shape without any other change", "Evolution of a gas"],
    correctAnswer: 2,
    explanation: "A plain change in shape (like breaking a stick or crushing chalk) with no new substance formed is a physical change, not evidence of a chemical reaction."
  },
  {
    id: 2,
    question: "In the reaction Mg + O2 -> MgO, the correctly balanced equation is:",
    options: ["Mg + O2 -> MgO", "2Mg + O2 -> 2MgO", "Mg + 2O2 -> MgO2", "2Mg + 2O2 -> 2MgO"],
    correctAnswer: 1,
    explanation: "Balancing oxygen (2 atoms in O2) requires 2 MgO on the product side, which in turn requires 2 Mg on the reactant side."
  },
  {
    id: 3,
    question: "CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat is an example of a:",
    options: ["Decomposition reaction", "Displacement reaction", "Combination reaction", "Double displacement reaction"],
    correctAnswer: 2,
    explanation: "Two reactants (CaO and H2O) combine to form a single product, Ca(OH)2 -- the defining feature of a combination reaction."
  },
  {
    id: 4,
    question: "Which gas is evolved when dilute hydrochloric acid reacts with zinc granules?",
    options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Chlorine"],
    correctAnswer: 2,
    explanation: "Zn + 2HCl -> ZnCl2 + H2 -- a reactive metal displaces hydrogen gas from a dilute acid."
  },
  {
    id: 5,
    question: "Ferrous sulphate crystals (FeSO4.7H2O) on strong heating decompose to give ferric oxide, sulphur dioxide, and:",
    options: ["Sulphur trioxide", "Hydrogen gas", "Oxygen gas", "Water vapour only"],
    correctAnswer: 0,
    explanation: "2FeSO4(s) -heat-> Fe2O3(s) + SO2(g) + SO3(g) -- both sulphur dioxide and sulphur trioxide are released, along with the characteristic burning-sulphur smell."
  },
  {
    id: 6,
    question: "Which of the following is an example of a thermal decomposition reaction?",
    options: ["2AgCl -sunlight-> 2Ag + Cl2", "2H2O -electricity-> 2H2 + O2", "CaCO3 -heat-> CaO + CO2", "Fe + CuSO4 -> FeSO4 + Cu"],
    correctAnswer: 2,
    explanation: "Thermal decomposition specifically means a single compound is broken down using heat energy; limestone decomposing into quicklime and CO2 on heating is the classic example."
  },
  {
    id: 7,
    question: "Silver chloride turns grey when kept in sunlight because it decomposes to form silver metal and:",
    options: ["Silver oxide", "Chlorine gas", "Hydrochloric acid", "Silver nitrate"],
    correctAnswer: 1,
    explanation: "2AgCl(s) -sunlight-> 2Ag(s) + Cl2(g) -- this light-driven (photolytic) decomposition is the basis of black-and-white photography."
  },
  {
    id: 8,
    question: "In the electrolysis of water, hydrogen gas is collected at the:",
    options: ["Anode, in half the volume of oxygen", "Cathode, in double the volume of oxygen", "Anode, in double the volume of oxygen", "Cathode, in half the volume of oxygen"],
    correctAnswer: 1,
    explanation: "Hydrogen collects at the cathode, and since water contains H and O atoms in a 2:1 ratio, hydrogen gas is produced in double the volume of oxygen."
  },
  {
    id: 9,
    question: "Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s) is an example of a:",
    options: ["Combination reaction", "Decomposition reaction", "Displacement reaction", "Double displacement reaction"],
    correctAnswer: 2,
    explanation: "A single free element (iron) takes the place of another element (copper) already present in a compound -- the defining pattern of a displacement reaction."
  },
  {
    id: 10,
    question: "Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq) is best classified as a:",
    options: ["Combination reaction", "Displacement reaction", "Double displacement (precipitation) reaction", "Decomposition reaction"],
    correctAnswer: 2,
    explanation: "Two compounds exchange ions with each other (Ba swaps with Na) and one product, BaSO4, is an insoluble precipitate -- this is a double displacement / precipitation reaction."
  },
  {
    id: 11,
    question: "In the reaction CuO + H2 -> Cu + H2O, hydrogen gas acts as the:",
    options: ["Oxidising agent", "Reducing agent", "Catalyst", "Precipitate"],
    correctAnswer: 1,
    explanation: "Hydrogen removes oxygen from CuO (reducing it to Cu) while itself gaining that oxygen -- a substance that causes reduction in another substance is called a reducing agent."
  },
  {
    id: 12,
    question: "Which statement correctly defines oxidation in terms of oxygen?",
    options: ["Gain of oxygen by a substance", "Loss of oxygen by a substance", "Gain of hydrogen by a substance", "No change in oxygen content"],
    correctAnswer: 0,
    explanation: "Oxidation is defined as the gain of oxygen (or equivalently, the loss of hydrogen) by a substance during a chemical reaction."
  },
  {
    id: 13,
    question: "A reaction that releases heat energy to the surroundings as it proceeds is called:",
    options: ["Endothermic", "Exothermic", "Isothermal", "Photolytic"],
    correctAnswer: 1,
    explanation: "Exothermic reactions give out heat, warming the surroundings; combustion and respiration are common examples."
  },
  {
    id: 14,
    question: "CaCO3(s) -heat-> CaO(s) + CO2(g) is best described as:",
    options: ["An exothermic combination reaction", "An endothermic decomposition reaction", "An exothermic displacement reaction", "An endothermic double displacement reaction"],
    correctAnswer: 1,
    explanation: "This reaction needs a continuous supply of heat to proceed (endothermic) and breaks one compound into two simpler substances (decomposition)."
  },
  {
    id: 15,
    question: "The reddish-brown flaky coating that forms when iron is exposed to air and moisture is called:",
    options: ["Tarnish", "Rust", "Verdigris", "Rancidity"],
    correctAnswer: 1,
    explanation: "Rust is hydrated iron(III) oxide (roughly Fe2O3.xH2O), formed when iron corrodes in the presence of both oxygen and moisture."
  },
  {
    id: 16,
    question: "Which of the following methods is commonly used to prevent rusting of iron gates and railings?",
    options: ["Rancidity control", "Galvanisation or painting", "Adding antioxidants", "Refrigeration"],
    correctAnswer: 1,
    explanation: "Coating iron with a protective layer -- either paint or a sacrificial zinc coating (galvanisation) -- keeps oxygen and moisture away from the metal surface."
  },
  {
    id: 17,
    question: "Fried, oily food develops an unpleasant smell and taste when left open for a long time because of:",
    options: ["Corrosion of the food container", "Rancidity due to oxidation of fats and oils", "Combination reaction with nitrogen", "A double displacement reaction"],
    correctAnswer: 1,
    explanation: "Prolonged exposure to air oxidises the fats and oils in food, causing rancidity -- a change in smell and taste, unrelated to metal corrosion."
  },
  {
    id: 18,
    question: "Chips packets are usually flushed with nitrogen gas before sealing mainly to:",
    options: ["Add flavour to the chips", "Displace oxygen and slow down rancidity", "Speed up the oxidation of oils", "Increase the packet's weight"],
    correctAnswer: 1,
    explanation: "Nitrogen is inert and displaces the reactive oxygen inside the packet, which slows the oxidation reaction responsible for rancidity."
  },
  {
    id: 19,
    question: "In the reaction 2Na + 2H2O -> 2NaOH + H2, water acts as the:",
    options: ["Reducing agent", "Oxidising agent", "Catalyst", "Precipitating agent"],
    correctAnswer: 1,
    explanation: "Water supplies oxygen/oxidising power that converts sodium metal to sodium hydroxide while itself being reduced (losing an oxygen-hydrogen bond to release H2) -- water is the oxidising agent here."
  },
  {
    id: 20,
    question: "Which pair correctly matches the physical-state symbol with its meaning?",
    options: ["(g) = dissolved in water", "(aq) = gas", "(s) = solid", "(l) = precipitate"],
    correctAnswer: 2,
    explanation: "The standard state symbols are (s) solid, (l) liquid, (g) gas, and (aq) aqueous (dissolved in water)."
  }
];

export const CHEMISTRY10_ASSERTIONS: AssertionReasonQuestion[] = [
  {
    id: 1,
    assertion: "A chemical equation must always be balanced.",
    reason: "The Law of Conservation of Mass states that mass can neither be created nor destroyed in a chemical reaction.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains the assertion: since atoms cannot appear or vanish, their counts must match on both sides of the equation."
  },
  {
    id: 2,
    assertion: "Burning of magnesium ribbon in air is a combination reaction.",
    reason: "In this reaction, magnesium and oxygen combine to form a single product, magnesium oxide.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason directly and correctly explains why the reaction is classified as a combination reaction."
  },
  {
    id: 3,
    assertion: "Decomposition reactions are generally endothermic.",
    reason: "Breaking the bonds of a single compound into simpler substances usually requires an input of energy.",
    correctOption: "A",
    explanation: "Both statements are true and logically connected: bond-breaking (with no compensating bond formation of similar strength) needs energy input, which is why most decomposition reactions absorb heat."
  },
  {
    id: 4,
    assertion: "When an iron nail is dipped in copper sulphate solution, the blue colour of the solution fades.",
    reason: "Iron is less reactive than copper and therefore cannot displace it from copper sulphate solution.",
    correctOption: "C",
    explanation: "The assertion is true (the colour genuinely fades), but the reason is false: iron is actually MORE reactive than copper, which is exactly why it can and does displace copper from the solution."
  },
  {
    id: 5,
    assertion: "Silver chloride turns grey when exposed to sunlight.",
    reason: "Sunlight causes silver chloride to decompose into silver metal and chlorine gas.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains the colour change as a photolytic decomposition reaction."
  },
  {
    id: 6,
    assertion: "In the electrolysis of water, the volume of hydrogen gas collected is double that of oxygen gas.",
    reason: "A water molecule contains two hydrogen atoms for every one oxygen atom.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains the 2:1 volume ratio observed during electrolysis."
  },
  {
    id: 7,
    assertion: "Rusting of iron is an example of a physical change.",
    reason: "Rusting forms a new substance, hydrated iron(III) oxide, with properties different from iron.",
    correctOption: "D",
    explanation: "The assertion is false (rusting is a chemical change, not physical) while the reason is true and actually explains why rusting must be chemical, not physical."
  },
  {
    id: 8,
    assertion: "In the reaction CuO + H2 -> Cu + H2O, copper oxide is the reducing agent.",
    reason: "Copper oxide loses oxygen during the reaction and gets reduced to copper.",
    correctOption: "D",
    explanation: "The assertion is false: a substance that is ITSELF reduced is called the oxidising agent, not the reducing agent (hydrogen, which gets oxidised, is the actual reducing agent here). The reason given is true on its own."
  },
  {
    id: 9,
    assertion: "Calcium oxide reacting with water to form calcium hydroxide is an exothermic reaction.",
    reason: "A large amount of heat is released when water is added to quicklime.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains why this combination reaction is classified as exothermic."
  },
  {
    id: 10,
    assertion: "Applying paint on iron gates helps prevent rusting.",
    reason: "Paint reacts chemically with iron to form a protective, unreactive compound.",
    correctOption: "C",
    explanation: "The assertion is true, but the reason is false: paint works by physically sealing the surface to keep out air and moisture, not by chemically reacting with the iron."
  },
  {
    id: 11,
    assertion: "Displacement and double displacement reactions are the same type of reaction.",
    reason: "Both involve an exchange of ions between exactly two compounds and no free element.",
    correctOption: "D",
    explanation: "The assertion is false: displacement involves one free element replacing another element in a compound, while double displacement involves two compounds swapping ions with no free element at all. The reason describes only double displacement, and is not fully accurate as a general statement either."
  },
  {
    id: 12,
    assertion: "Chips packets are flushed with nitrogen gas before sealing.",
    reason: "Nitrogen gas reacts with the oils in the chips to keep them fresh.",
    correctOption: "C",
    explanation: "The assertion is true, but the reason is false: nitrogen is inert and does NOT react with the oils -- it works precisely because it simply displaces the reactive oxygen."
  },
  {
    id: 13,
    assertion: "The reaction Fe2O3 + 2Al -> Al2O3 + 2Fe is an example of a displacement reaction.",
    reason: "Aluminium, being more reactive than iron, displaces iron from its oxide.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains why this thermite-type reaction is classified as a displacement reaction."
  },
  {
    id: 14,
    assertion: "Respiration is classified as an endothermic reaction.",
    reason: "Energy is released when glucose reacts with oxygen inside body cells.",
    correctOption: "D",
    explanation: "The assertion is false -- respiration is exothermic, not endothermic, since it releases (not absorbs) energy. The reason itself is a true statement."
  },
  {
    id: 15,
    assertion: "A precipitation reaction always forms an insoluble solid product.",
    reason: "Precipitation reactions are a type of double displacement reaction where at least one product does not dissolve in water.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains the mechanism behind precipitate formation."
  },
  {
    id: 16,
    assertion: "Ferrous sulphate crystals change colour on heating.",
    reason: "On heating, ferrous sulphate loses its water of crystallisation and decomposes into ferric oxide, sulphur dioxide, and sulphur trioxide.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains why the green crystals change colour as they thermally decompose."
  },
  {
    id: 17,
    assertion: "Oxidation and reduction always occur together in the same reaction.",
    reason: "Whenever one substance loses oxygen (or electrons), another substance must simultaneously gain it.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains why oxidation and reduction are inseparable halves of any redox reaction."
  },
  {
    id: 18,
    assertion: "Galvanisation involves coating iron with a layer of copper.",
    reason: "Copper acts as a sacrificial metal that corrodes in place of iron.",
    correctOption: "D",
    explanation: "The assertion is false: galvanisation specifically uses a zinc coating, not copper. The reason correctly describes how a sacrificial coating protects iron, but it describes zinc's role, not copper's."
  },
  {
    id: 19,
    assertion: "Silver articles develop a black coating when exposed to air over time.",
    reason: "Silver reacts with sulphur-containing compounds present in air to form black silver sulphide on its surface.",
    correctOption: "A",
    explanation: "Both statements are true, and the reason correctly explains this specific form of corrosion (tarnishing) seen on silver jewellery and utensils."
  },
  {
    id: 20,
    assertion: "A chemical equation showing only formulae, without any physical state symbols, can never be considered correctly balanced.",
    reason: "Physical state symbols such as (s), (l), (g), and (aq) are compulsory for every valid balanced chemical equation.",
    correctOption: "D",
    explanation: "The assertion is false: a skeletal equation can be perfectly balanced (equal atom counts) even without state symbols -- state symbols only add extra descriptive information and are not compulsory for balancing. The reason is also false, since state symbols are typically added only when needed for clarity, not as a strict requirement."
  }
];

export const CHEMISTRY10_VERY_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "Define a chemical reaction in one line.",
    answer: "A chemical reaction is a process in which one or more substances (reactants) are converted into one or more new substances (products) with different properties.",
    keyPoints: ["Reactants convert to products", "New substance formed", "Properties differ from reactants"]
  },
  {
    id: 2,
    question: "What is a skeletal chemical equation?",
    answer: "A skeletal chemical equation is an unbalanced chemical equation in which the number of atoms of each element is not necessarily equal on both sides.",
    keyPoints: ["Unbalanced equation", "Atom counts may not match", "Must be balanced before use"]
  },
  {
    id: 3,
    question: "Write the state symbol used for a substance dissolved in water.",
    answer: "The symbol (aq), meaning 'aqueous', is used for a substance dissolved in water.",
    keyPoints: ["(aq) = aqueous", "Substance dissolved in water"]
  },
  {
    id: 4,
    question: "Name the type of reaction in which a single reactant breaks down into two or more products.",
    answer: "This is called a decomposition reaction.",
    keyPoints: ["One reactant -> multiple products", "Decomposition reaction"]
  },
  {
    id: 5,
    question: "What is a precipitate?",
    answer: "A precipitate is an insoluble solid substance that separates out of a solution during a chemical reaction.",
    keyPoints: ["Insoluble solid", "Formed during a reaction", "Separates from solution"]
  },
  {
    id: 6,
    question: "Give one example of an oxidising agent.",
    answer: "Copper(II) oxide (CuO) is an oxidising agent -- for example, in the reaction CuO + H2 -> Cu + H2O, it supplies oxygen to hydrogen.",
    keyPoints: ["CuO supplies oxygen", "Gets reduced itself", "Oxidises the other reactant"]
  },
  {
    id: 7,
    question: "Name the gas evolved when dilute sulphuric acid reacts with zinc granules.",
    answer: "Hydrogen gas is evolved.",
    keyPoints: ["Zn + H2SO4 -> ZnSO4 + H2", "Hydrogen gas released"]
  },
  {
    id: 8,
    question: "What is corrosion?",
    answer: "Corrosion is the gradual degradation of a metal caused by chemical reaction with substances present in its surroundings, such as moisture, acids, or gases.",
    keyPoints: ["Gradual metal degradation", "Caused by environment", "Example: rusting"]
  },
  {
    id: 9,
    question: "Name the compound used commercially as 'quicklime'.",
    answer: "Calcium oxide, CaO, is commercially known as quicklime.",
    keyPoints: ["CaO = quicklime", "Used in whitewashing and cement"]
  },
  {
    id: 10,
    question: "What colour precipitate is formed when lead nitrate solution reacts with potassium iodide solution?",
    answer: "A bright yellow precipitate of lead iodide (PbI2) is formed.",
    keyPoints: ["Pb(NO3)2 + 2KI -> PbI2 + 2KNO3", "PbI2 is a yellow precipitate"]
  }
];

export const CHEMISTRY10_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "Why should a magnesium ribbon be cleaned before burning it in air? Explain with reference to the oxide layer.",
    answer: "Magnesium reacts slowly with atmospheric oxygen even at room temperature, forming a thin coating of magnesium oxide on its surface. This unreactive layer prevents the metal from burning properly. Cleaning the ribbon with sandpaper removes the oxide coating and exposes fresh, reactive magnesium metal, allowing it to burn completely and readily when ignited.",
    keyPoints: ["MgO layer forms in air", "Layer is unreactive/protective", "Sandpaper exposes fresh metal"]
  },
  {
    id: 2,
    question: "Balance the equation Fe + H2O -> Fe3O4 + H2 by the hit-and-trial method, showing your steps briefly.",
    answer: "Start with the compound having the most atoms, Fe3O4 (4 oxygens). Balance oxygen first by placing 4 H2O on the left. This gives 8 hydrogen atoms on the left, so place 4 H2 on the right to balance hydrogen. Finally, balance the 3 iron atoms in Fe3O4 by placing 3 Fe on the left. The balanced equation is 3Fe + 4H2O -> Fe3O4 + 4H2.",
    keyPoints: ["Balance O first via H2O coefficient", "Balance H via H2 coefficient", "Balance Fe last", "Final: 3Fe + 4H2O -> Fe3O4 + 4H2"]
  },
  {
    id: 3,
    question: "Distinguish between exothermic and endothermic reactions with one example each.",
    answer: "An exothermic reaction releases heat energy to the surroundings as it proceeds, so the reaction mixture becomes warmer -- for example, the combustion of natural gas: CH4 + 2O2 -> CO2 + 2H2O + heat. An endothermic reaction absorbs heat energy from the surroundings, so the mixture becomes cooler -- for example, the thermal decomposition of limestone: CaCO3 -heat-> CaO + CO2.",
    keyPoints: ["Exothermic releases heat (combustion)", "Endothermic absorbs heat (decomposition)", "Correct example for each"]
  },
  {
    id: 4,
    question: "What happens when a solution of sodium sulphate reacts with a solution of barium chloride? Write the balanced equation and identify the reaction type.",
    answer: "A white, water-insoluble precipitate of barium sulphate is formed, along with sodium chloride which remains dissolved in solution. Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq). Since two compounds exchange ions to form the products, this is a double displacement (precipitation) reaction.",
    keyPoints: ["White BaSO4 precipitate forms", "NaCl stays dissolved", "Double displacement / precipitation reaction"]
  },
  {
    id: 5,
    question: "Explain, with an equation, why heating copper powder in air causes it to turn black.",
    answer: "When copper powder is heated strongly in the presence of air, it reacts with atmospheric oxygen and gets oxidised, forming a black coating of copper(II) oxide on its surface: 2Cu + O2 -heat-> 2CuO. This colour change from reddish-brown to black is a visible sign that oxidation has occurred.",
    keyPoints: ["Copper reacts with O2 on heating", "2Cu + O2 -> 2CuO", "Black CuO coating forms"]
  },
  {
    id: 6,
    question: "What is rancidity, and name two common methods used to prevent it.",
    answer: "Rancidity is the spoiling of fats and oils in food due to their oxidation on prolonged exposure to air, which causes an unpleasant change in smell and taste. It can be prevented by storing food in airtight containers to keep oxygen out, and by adding antioxidants (such as BHA or BHT) to processed foods to block the oxidation reaction.",
    keyPoints: ["Oxidation of fats/oils", "Unpleasant smell/taste change", "Prevention: airtight storage, antioxidants, refrigeration, or nitrogen packing"]
  },
  {
    id: 7,
    question: "Differentiate between a combination reaction and a decomposition reaction, with one equation each.",
    answer: "In a combination reaction, two or more substances join together to form a single product, as in CaO + H2O -> Ca(OH)2. In a decomposition reaction, a single compound breaks apart into two or more simpler substances, as in CaCO3 -heat-> CaO + CO2 -- the exact reverse pattern of a combination reaction.",
    keyPoints: ["Combination: A + B -> AB", "Decomposition: AB -> A + B", "One reaction is the reverse of the other"]
  },
  {
    id: 8,
    question: "Why is the reaction between quicklime and water considered both a combination reaction and an exothermic reaction?",
    answer: "It is a combination reaction because two reactants, calcium oxide and water, combine to form a single product, calcium hydroxide: CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat. It is also exothermic because a large amount of heat is released during this reaction, which is why the container becomes noticeably hot to the touch.",
    keyPoints: ["Two reactants -> one product (combination)", "Heat is released (exothermic)", "CaO + H2O -> Ca(OH)2 + Heat"]
  },
  {
    id: 9,
    question: "An iron nail is placed in a copper sulphate solution. Describe what is observed and explain the underlying reaction.",
    answer: "The iron nail gradually becomes coated with a reddish-brown deposit, while the blue colour of the copper sulphate solution fades and turns pale green. This happens because iron, being more reactive than copper, displaces copper from the copper sulphate solution: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s). The reddish-brown coating is deposited copper metal, and the pale green colour is due to the newly formed iron sulphate.",
    keyPoints: ["Nail gets copper coating", "Blue solution fades to pale green", "Fe + CuSO4 -> FeSO4 + Cu (displacement)"]
  },
  {
    id: 10,
    question: "Explain why the decomposition of silver chloride in sunlight is considered a photolytic decomposition reaction.",
    answer: "This reaction is called photolytic decomposition because it is driven specifically by light energy (photons from sunlight), rather than by heat or electricity. Silver chloride absorbs light energy and breaks down into silver metal and chlorine gas: 2AgCl(s) -sunlight-> 2Ag(s) + Cl2(g), turning the white solid grey as visible silver metal is deposited.",
    keyPoints: ["Driven by light energy, not heat/electricity", "2AgCl -> 2Ag + Cl2", "White solid turns grey"]
  }
];

export const CHEMISTRY10_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Explain the different types of chemical reactions with one balanced equation as an example for each type.",
    markingScheme: [
      "Define and give an example of a combination reaction (1 mark)",
      "Define and give an example of a decomposition reaction (1 mark)",
      "Define and give an example of a displacement reaction (1 mark)",
      "Define and give an example of a double displacement reaction (1 mark)",
      "Define and give an example of an oxidation-reduction (redox) reaction (1 mark)"
    ],
    answerParts: [
      { part: "Combination reaction", text: "Two or more reactants combine to form a single product. Example: CaO(s) + H2O(l) -> Ca(OH)2(aq)." },
      { part: "Decomposition reaction", text: "A single reactant breaks down into two or more simpler products, often needing heat, light, or electricity. Example: CaCO3(s) -heat-> CaO(s) + CO2(g)." },
      { part: "Displacement reaction", text: "A more reactive element displaces a less reactive element from its compound. Example: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s)." },
      { part: "Double displacement reaction", text: "Two compounds exchange ions to form two new compounds, often producing a precipitate. Example: Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq)." },
      { part: "Redox (oxidation-reduction) reaction", text: "One reactant is oxidised (gains oxygen) while another is simultaneously reduced (loses oxygen). Example: CuO(s) + H2(g) -> Cu(s) + H2O(l), where CuO is reduced and H2 is oxidised." }
    ]
  },
  {
    id: 2,
    question: "Describe the three types of decomposition reactions based on the source of energy used, giving one equation for each.",
    markingScheme: [
      "Explain thermal decomposition with an equation (1.5 marks)",
      "Explain electrolytic decomposition with an equation (1.5 marks)",
      "Explain photolytic decomposition with an equation (1.5 marks)",
      "Note the general similarity/pattern shared by all three (0.5 marks)"
    ],
    answerParts: [
      { part: "Thermal decomposition", text: "The reactant is broken down using heat energy. Example: CaCO3(s) -heat-> CaO(s) + CO2(g), used industrially to manufacture quicklime and cement." },
      { part: "Electrolytic decomposition", text: "The reactant is broken down by passing an electric current through it. Example: 2H2O(l) -electricity-> 2H2(g) + O2(g), producing hydrogen at the cathode and oxygen at the anode." },
      { part: "Photolytic decomposition", text: "The reactant is broken down by absorbing light energy. Example: 2AgCl(s) -sunlight-> 2Ag(s) + Cl2(g), the basis of black-and-white photography." },
      { part: "Shared pattern", text: "All three follow the same general skeleton AB -> A + B; only the specific form of energy driving the breakdown (heat, electricity, or light) differs." }
    ]
  },
  {
    id: 3,
    question: "What is corrosion? Explain the rusting of iron in detail and describe at least three practical methods used to prevent it.",
    markingScheme: [
      "Define corrosion (1 mark)",
      "Explain the conditions and chemistry of rusting (1.5 marks)",
      "Describe at least three prevention methods (2.5 marks)"
    ],
    answerParts: [
      { part: "Definition of corrosion", text: "Corrosion is the gradual degradation of a metal that occurs when it reacts with substances present in its surrounding environment, such as moisture, acids, or gases in the air." },
      { part: "Rusting of iron", text: "Rusting is a specific form of corrosion affecting iron and steel. It requires the simultaneous presence of both oxygen and moisture; iron reacts with these to form a reddish-brown, flaky coating of hydrated iron(III) oxide, roughly Fe2O3.xH2O, which weakens and eventually eats away the metal." },
      { part: "Prevention: Painting", text: "Coating the iron surface with paint seals it off from air and moisture, commonly used on railings, gates, and vehicle bodies." },
      { part: "Prevention: Galvanisation", text: "Coating iron or steel with a layer of zinc; the zinc corrodes first as a 'sacrificial' metal, protecting the iron underneath. Commonly used for water pipes and roofing sheets." },
      { part: "Prevention: Oiling/Greasing or Alloying", text: "Applying oil or grease forms a protective barrier on moving machine parts. Alternatively, converting iron into an alloy such as stainless steel (iron with chromium and nickel) makes it far more corrosion-resistant than pure iron." }
    ]
  },
  {
    id: 4,
    question: "With the help of a labelled activity, describe how you would demonstrate the electrolysis of water in the laboratory. Include your observations and the balanced equation.",
    markingScheme: [
      "Describe the experimental setup (1.5 marks)",
      "Describe the procedure (1 mark)",
      "State the observations, including the gas identification tests (1.5 marks)",
      "Write the balanced equation (1 mark)"
    ],
    answerParts: [
      { part: "Setup", text: "A plastic mug fitted with two carbon electrodes connected to a 6V battery is filled with water. A few drops of dilute sulphuric acid are added, since pure water conducts electricity poorly and the acid supplies extra ions to carry the current." },
      { part: "Procedure", text: "Two water-filled test tubes are inverted over the two electrodes, and the current is switched on. The apparatus is left undisturbed to allow gas to collect in each tube by displacing water." },
      { part: "Observations", text: "Bubbles form at both electrodes. The volume of gas collected at the cathode (hydrogen) is exactly double the volume collected at the anode (oxygen). Testing with a burning splint shows hydrogen burns with a characteristic pop sound, while oxygen relights a glowing splint." },
      { part: "Equation", text: "2H2O(l) -electricity-> 2H2(g) + O2(g)." }
    ]
  },
  {
    id: 5,
    question: "Explain what is meant by oxidation and reduction in terms of gain or loss of oxygen. Using the reaction CuO + H2 -> Cu + H2O, identify the substance oxidised, the substance reduced, the oxidising agent, and the reducing agent.",
    markingScheme: [
      "Define oxidation in terms of oxygen (1 mark)",
      "Define reduction in terms of oxygen (1 mark)",
      "Analyse the given equation correctly, identifying all four roles (2 marks)",
      "State that oxidation and reduction always occur together (1 mark)"
    ],
    answerParts: [
      { part: "Oxidation", text: "Oxidation is the process in which a substance gains oxygen (or loses hydrogen) during a chemical reaction." },
      { part: "Reduction", text: "Reduction is the process in which a substance loses oxygen (or gains hydrogen) during a chemical reaction." },
      { part: "Analysis of CuO + H2 -> Cu + H2O", text: "Hydrogen (H2) gains oxygen to become H2O, so hydrogen is oxidised, making it the reducing agent (it causes CuO to be reduced). Copper(II) oxide (CuO) loses its oxygen to become Cu, so CuO is reduced, making it the oxidising agent (it causes H2 to be oxidised)." },
      { part: "Simultaneous occurrence", text: "Oxidation and reduction always happen together in the same reaction -- this is why such reactions are together called oxidation-reduction, or redox, reactions." }
    ]
  }
];

export const CHEMISTRY10_SELF_ASSESSMENT: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is a sign that a chemical reaction has occurred?",
    options: ["The object changes shape only", "A gas is evolved with bubbling", "The substance is simply moved to another container", "The substance is dissolved without any other change"],
    correctAnswer: 1,
    explanation: "Evolution of a gas (seen as bubbling/effervescence) is one of the five classic tell-tale signs of a chemical reaction."
  },
  {
    id: 2,
    question: "The balanced form of Fe + H2O -> Fe3O4 + H2 is:",
    options: ["Fe + H2O -> Fe3O4 + H2", "3Fe + 4H2O -> Fe3O4 + 4H2", "3Fe + H2O -> Fe3O4 + H2", "Fe + 4H2O -> Fe3O4 + 4H2"],
    correctAnswer: 1,
    explanation: "Balancing oxygen (4 in Fe3O4) needs 4 H2O; this gives 8 H atoms, needing 4 H2; finally, 3 Fe are needed to match Fe3O4."
  },
  {
    id: 3,
    question: "Which type of reaction is CaCO3(s) -heat-> CaO(s) + CO2(g)?",
    options: ["Combination reaction", "Decomposition reaction", "Displacement reaction", "Double displacement reaction"],
    correctAnswer: 1,
    explanation: "One reactant breaks down into two simpler products -- the defining pattern of a decomposition reaction, driven here by heat."
  },
  {
    id: 4,
    question: "Which gas is produced at the cathode during the electrolysis of water?",
    options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Chlorine"],
    correctAnswer: 1,
    explanation: "Hydrogen gas is collected at the cathode, in double the volume of the oxygen collected at the anode."
  },
  {
    id: 5,
    question: "Iron displacing copper from copper sulphate solution is an example of a:",
    options: ["Combination reaction", "Decomposition reaction", "Displacement reaction", "Precipitation reaction"],
    correctAnswer: 2,
    explanation: "A single free element (iron) replaces another element (copper) in a compound -- this is a displacement reaction."
  },
  {
    id: 6,
    question: "The white precipitate formed when barium chloride reacts with sodium sulphate is:",
    options: ["Barium chloride", "Sodium chloride", "Barium sulphate", "Sodium sulphate"],
    correctAnswer: 2,
    explanation: "BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + 2NaCl(aq) -- barium sulphate is the insoluble white precipitate; sodium chloride remains dissolved."
  },
  {
    id: 7,
    question: "In CuO + H2 -> Cu + H2O, which substance is oxidised?",
    options: ["Copper oxide", "Hydrogen", "Copper", "Water"],
    correctAnswer: 1,
    explanation: "Hydrogen gains oxygen to become water, meaning hydrogen is the substance being oxidised."
  },
  {
    id: 8,
    question: "A reaction that absorbs heat energy from its surroundings is called:",
    options: ["Exothermic", "Endothermic", "Isothermal", "Combination"],
    correctAnswer: 1,
    explanation: "Endothermic reactions absorb heat, cooling their surroundings as they proceed."
  },
  {
    id: 9,
    question: "Rust is chemically best described as:",
    options: ["Pure iron metal", "Hydrated iron(III) oxide", "Iron sulphide", "Iron carbonate"],
    correctAnswer: 1,
    explanation: "Rust forms when iron reacts with oxygen and moisture together, producing hydrated iron(III) oxide, roughly Fe2O3.xH2O."
  },
  {
    id: 10,
    question: "Galvanisation protects iron from rusting by coating it with a layer of:",
    options: ["Copper", "Zinc", "Silver", "Gold"],
    correctAnswer: 1,
    explanation: "Galvanisation coats iron/steel with zinc, which corrodes preferentially (as a sacrificial metal), protecting the iron underneath."
  },
  {
    id: 11,
    question: "Rancidity in food is primarily caused by the:",
    options: ["Freezing of water content", "Oxidation of fats and oils", "Growth of algae", "Reduction of proteins"],
    correctAnswer: 1,
    explanation: "Rancidity occurs when fats and oils in food are oxidised by prolonged exposure to air, changing their smell and taste."
  },
  {
    id: 12,
    question: "Silver chloride decomposing in sunlight to form silver and chlorine gas is an example of:",
    options: ["Thermal decomposition", "Electrolytic decomposition", "Photolytic decomposition", "Combination reaction"],
    correctAnswer: 2,
    explanation: "This decomposition is driven by light energy from sunlight, making it a photolytic decomposition reaction."
  },
  {
    id: 13,
    question: "Which statement about a balanced chemical equation is correct?",
    options: ["Only the number of molecules must match on both sides", "The number of atoms of each element must be equal on both sides", "Only the reactant side needs balancing", "State symbols must always be shown for balance to be valid"],
    correctAnswer: 1,
    explanation: "A balanced equation requires the number of atoms of each individual element to match exactly on the reactant and product sides."
  },
  {
    id: 14,
    question: "Which of the following best prevents rancidity in packaged chips?",
    options: ["Storing them in direct sunlight", "Flushing the packet with nitrogen gas", "Adding extra oxygen to the packet", "Leaving the packet open after purchase"],
    correctAnswer: 1,
    explanation: "Nitrogen gas is inert and displaces the reactive oxygen inside the packet, slowing the oxidation that causes rancidity."
  },
  {
    id: 15,
    question: "2Na(s) + 2H2O(l) -> 2NaOH(aq) + H2(g) is an example of a:",
    options: ["Decomposition reaction", "Displacement reaction", "Double displacement reaction", "Combination reaction"],
    correctAnswer: 1,
    explanation: "Sodium, a reactive metal, displaces hydrogen from water -- the defining pattern of a displacement reaction."
  }
];

export const CHEMISTRY10_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Rusting Railings",
    caseDescription: "A housing society noticed that the iron railings around their garden, installed five years ago, had developed a reddish-brown flaky coating and had become weak in several places. A resident suggested repainting them every two years, while another suggested using galvanised iron railings instead for any future replacements.",
    subQuestions: [
      { question: "What is the reddish-brown flaky substance that formed on the railings?", options: ["Copper carbonate", "Rust (hydrated iron(III) oxide)", "Silver sulphide", "Calcium carbonate"], correctIndex: 1, answer: "Rust (hydrated iron(III) oxide, roughly Fe2O3.xH2O)", explanation: "Iron exposed to both oxygen and moisture over time forms rust, a reddish-brown flaky coating that weakens the metal." },
      { question: "Why did repainting help slow down this process?", answer: "Paint forms a physical barrier over the iron surface that keeps out the oxygen and moisture needed for rusting to occur, so it does not stop the underlying chemistry but blocks the reactants from reaching the metal.", explanation: "Painting is a purely physical protection method, not a chemical one." },
      { question: "Why would galvanised iron railings need less frequent maintenance than painted ones?", answer: "Galvanised iron is coated with a layer of zinc, which corrodes first as a sacrificial metal in place of the iron underneath. This protection continues even if the coating gets scratched, unlike paint which fails once its surface is broken.", explanation: "Zinc's sacrificial corrosion continues to protect the iron even where the coating is damaged, unlike a simple paint barrier." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Forgotten Chips Packet",
    caseDescription: "Raj found an unopened packet of potato chips at the back of his kitchen cupboard, six months past its best-before date. When he opened it, the chips still looked fine, but they tasted stale and had a faint unpleasant smell, different from a fresh packet.",
    subQuestions: [
      { question: "What chemical process most likely caused the change in smell and taste?", options: ["Corrosion", "Rancidity", "Neutralisation", "Precipitation"], correctIndex: 1, answer: "Rancidity", explanation: "Rancidity is the oxidation of fats and oils in food over time, changing its smell and taste, exactly as described." },
      { question: "Why does an unopened, factory-sealed packet still eventually show these signs?", answer: "Even sealed packets contain some residual oxygen (or the nitrogen flush used at packing time slowly loses effectiveness over a very long period), and trace oxidation of the oils continues gradually, which is why packaged snacks still carry a 'best before' date rather than lasting forever.", explanation: "No packaging method eliminates oxidation completely -- it only slows it down significantly." },
      { question: "Suggest one manufacturing practice that helps such packets stay fresh for longer.", answer: "Manufacturers flush the packet with nitrogen gas before sealing, which displaces the reactive oxygen inside and significantly slows the rate of oxidation of the fats and oils in the chips.", explanation: "Nitrogen flushing is the standard industrial method used to extend the shelf life of oily/fried snacks." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Displacement Demonstration",
    caseDescription: "During a school lab session, a teacher placed a clean iron nail into a test tube of blue copper sulphate solution and asked students to observe it over 20 minutes, while a second nail was kept aside in air as a control for comparison.",
    subQuestions: [
      { question: "What change would the students observe in the test tube after 20 minutes?", options: ["The solution turns colourless with no other change", "The iron nail develops a reddish-brown coating and the blue colour fades", "The iron nail dissolves completely", "No change occurs at all"], correctIndex: 1, answer: "The iron nail develops a reddish-brown coating (deposited copper) and the blue solution fades to pale green.", explanation: "This is the classic iron + copper sulphate displacement reaction observed in Activity 1.9 of the unit." },
      { question: "Write the balanced chemical equation for the reaction taking place.", answer: "Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s)", explanation: "Iron displaces copper from copper sulphate solution because it is more reactive than copper." },
      { question: "Why was the second nail kept aside in air rather than also placed in the solution?", answer: "It served as a control for comparison, so students could clearly see the colour and surface difference caused specifically by the reaction with copper sulphate solution, rather than any change that might happen to iron in air alone over the same short time period.", explanation: "A control sample isolates the variable being tested -- here, exposure to the copper sulphate solution." }
    ]
  }
];
