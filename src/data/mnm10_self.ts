import type { QuizQuestion } from "../types-custom";
import { mc, ar } from "./mnm10Util";

// SELF ASSESSMENT: Class X, Metals and Non-metals. 60 questions, 45 minutes.
// Every question stays inside Chapter 3 of the textbook. The questions are of every type: direct, data and table based, statement based,
// matching, calculation, assertion-reason and application questions.

export const MNM10_SELF_ASSESSMENT: QuizQuestion[] = [
  // ── physical properties ──
  mc("An element W is shiny, does not conduct electricity and breaks into pieces when hammered. W is most likely", "iodine", ["graphite", "sodium", "copper"], "Iodine is a lustrous non-metal. Graphite conducts, and sodium and copper are metals."),
  mc("Statements: I. All metals are solids at room temperature. II. Gallium and caesium melt on the palm. III. Alkali metals can be cut with a knife. Which are correct?", "II and III only", ["I only", "I and II only", "I, II and III"], "Mercury is a liquid metal, so I is wrong."),
  mc("Which pair of metals are comparatively poor conductors of heat?", "Lead and mercury", ["Silver and copper", "Iron and aluminium", "Gold and silver"], "Silver and copper are the best conductors of heat."),
  mc("Which statement is INCORRECT?", "Diamond conducts electricity", ["Graphite conducts electricity", "Diamond is the hardest natural substance", "Diamond and graphite are allotropes of carbon"], "Diamond is a poor conductor of electricity; graphite is a good conductor."),
  mc("The only non-metal that is a liquid at room temperature is", "bromine", ["iodine", "mercury", "sulphur"], "Mercury is a metal. Iodine and sulphur are solids."),
  mc("About 2 km of thin wire can be drawn from 1 g of", "gold", ["silver", "copper", "aluminium"], "Gold is the most ductile metal."),
  // ── chemical properties of metals ──
  mc("The ash of burning magnesium is dissolved in water. The solution", "turns red litmus blue", ["turns blue litmus red", "does not change either litmus", "turns both litmus papers red"], "Magnesium oxide is basic."),
  mc("A white solid X dissolves in dilute HCl and also in NaOH solution. X could be", "Al2O3", ["MgO", "Na2O", "CuO"], "Only an amphoteric oxide reacts with both an acid and a base.", "mnm_oxides"),
  mc("In the balanced equation Fe + H2O(steam) → Fe3O4 + H2, the sum of all the coefficients is", "12", ["8", "10", "9"], "3Fe + 4H2O → Fe3O4 + 4H2: 3 + 4 + 1 + 4 = 12."),
  mc("The correct order of decreasing reactivity with water is", "K > Na > Ca > Mg", ["Na > K > Ca > Mg", "K > Ca > Na > Mg", "Mg > Ca > Na > K"], "Potassium and sodium react violently, calcium less so, and magnesium only with hot water.", "mnm_water"),
  mc("Metal P reacts violently with cold water and the gas catches fire. Q reacts only with steam. R reacts with hot water but not cold. S does not react with steam. The decreasing order of reactivity is", "P > R > Q > S", ["P > Q > R > S", "R > P > Q > S", "S > Q > R > P"], "Cold-water metals are above hot-water metals, which are above steam-only metals."),
  mc("Among Zn, Fe, Al and Cu, the metal that reacts most vigorously with dilute hydrochloric acid is", "Al", ["Zn", "Fe", "Cu"], "The order of reactivity with dilute acid is Mg > Al > Zn > Fe, and Cu does not react.", "mnm_acid"),
  mc("Statements: I. Nitric acid is a strong oxidising agent. II. Hydrogen is released when copper reacts with nitric acid. III. Mg and Mn give hydrogen with very dilute HNO3. Which are correct?", "I and III only", ["I and II only", "II and III only", "I, II and III"], "Nitric acid oxidises hydrogen to water, so no hydrogen comes from copper."),
  mc("In which test tube will the blue colour of the solution fade?", "Zinc granules in copper sulphate solution", ["Copper wire in zinc sulphate solution", "Silver wire in copper sulphate solution", "Copper wire in iron sulphate solution"], "Zinc is more reactive than copper and displaces it.", "mnm_displace"),
  mc("A strip of metal X is placed in solutions of zinc sulphate, iron sulphate and copper sulphate. It is coated only in the copper sulphate solution. X lies in the series", "between iron and copper", ["above zinc", "between zinc and iron", "below copper"], "X displaces copper but not iron or zinc, so it is below iron and above copper."),
  mc("Table: Metal A displaces copper but not iron; B displaces iron but not zinc; C displaces silver only; D displaces none. The most reactive metal and the least reactive metal are respectively", "B and D", ["A and D", "B and C", "D and B"], "The order is B > A > C > D."),
  mc("Which pair will react on heating?", "Magnesium and copper oxide", ["Copper and magnesium oxide", "Zinc and magnesium oxide", "Copper and zinc oxide"], "Only a metal above the other metal in the series takes the oxygen from its oxide."),
  mc("Aluminium does not corrode easily although it is reactive, because", "a thin tough oxide layer covers its surface", ["it is below hydrogen in the series", "it does not react with oxygen", "it is a noble metal"], "The oxide layer prevents further oxidation. Anodising thickens it."),
  mc("In anodising, the aluminium article is made the", "anode in dilute sulphuric acid", ["cathode in dilute sulphuric acid", "anode in sodium hydroxide", "cathode in water"], "Oxygen formed at the anode reacts with aluminium and thickens the oxide layer."),
  mc("A metal X forms an oxide that turns red litmus blue when dissolved in water, and X floats on water while reacting. X is most likely", "calcium", ["zinc", "iron", "copper"], "Calcium floats because of hydrogen bubbles and gives calcium hydroxide, a base."),
  // ── non-metals ──
  mc("Which oxide is neither acidic nor basic?", "CO", ["SO2", "CO2", "Na2O"], "Carbon monoxide is a neutral oxide."),
  mc("Which of the following can displace hydrogen from dilute hydrochloric acid?", "Zinc", ["Sulphur", "Carbon", "Iodine"], "Non-metals do not displace hydrogen from dilute acids."),
  mc("Sulphur is burnt in a spatula and the gas is passed over dry blue litmus and then moist blue litmus. The observation is", "dry litmus unchanged, moist litmus turns red", ["both turn red", "dry turns red, moist unchanged", "both unchanged"], "SO2 forms sulphurous acid only with water.", "mnm_so2"),
  mc("Statements: I. Non-metals form acidic or neutral oxides. II. Non-metals displace hydrogen from dilute acids. III. Non-metals react with hydrogen to form hydrides. Which are correct?", "I and III only", ["I and II only", "II and III only", "I, II and III"], "Non-metals do not displace hydrogen from dilute acids."),
  // ── ionic compounds ──
  mc("The electronic configuration of the magnesium ion Mg²⁺ is", "2, 8", ["2, 8, 2", "2, 8, 8", "2, 6"], "Mg (2, 8, 2) loses two electrons."),
  mc("The number of electrons in an oxide ion O²⁻ is", "10", ["8", "6", "12"], "O has 8 electrons and gains 2."),
  mc("The number of electrons lost by magnesium atoms in forming one formula unit of MgCl2 is", "2", ["1", "3", "4"], "One magnesium atom loses two electrons, and two chlorine atoms take one each.", "mnm_mgcl2"),
  mc("From Table 3.4, which compound requires the largest amount of energy to melt?", "CaO", ["NaCl", "CaCl2", "LiCl"], "CaO melts at 2850 K, the highest.", "mnm_mp"),
  mc("Compound X has a melting point of 1045 K, dissolves in water, does not dissolve in kerosene, and its solution conducts electricity. X is most likely", "an ionic compound", ["a metal", "a non-metal", "an alloy"], "These are the properties of ionic compounds."),
  mc("Which of the following correctly shows the ions in sodium oxide?", "Two Na⁺ and one O²⁻", ["One Na²⁺ and one O²⁻", "Two Na⁻ and one O²⁺", "One Na⁺ and two O²⁻"], "Each sodium loses one electron; oxygen gains two."),
  mc("The chloride ion (Cl⁻) has the same electronic arrangement as", "argon", ["neon", "helium", "sodium atom"], "Cl⁻ is 2, 8, 8, the same as argon.", "mnm_nacl"),
  mc("Statements: I. Solid NaCl conducts electricity. II. Molten NaCl conducts electricity. III. NaCl solution conducts electricity. Which are correct?", "II and III only", ["I and II only", "I and III only", "I, II and III"], "Ions can move only in the molten state and in solution.", "mnm_conduct"),
  // ── metallurgy ──
  mc("Which statement is correct?", "Every ore is a mineral, but not every mineral is an ore", ["Every mineral is an ore", "Gangue is a type of ore", "Ores are found only in the sea"], "An ore is a mineral from which the metal can be extracted profitably."),
  mc("Which of the following metals is never found in the free state?", "Sodium", ["Gold", "Silver", "Platinum"], "Highly reactive metals are never found free."),
  mc("Match: (i) Mercury (ii) Zinc (iii) Aluminium with (p) heating the ore in air (q) roasting, then reduction with carbon (r) electrolytic reduction of molten oxide.", "(i)-p, (ii)-q, (iii)-r", ["(i)-q, (ii)-p, (iii)-r", "(i)-r, (ii)-q, (iii)-p", "(i)-p, (ii)-r, (iii)-q"], "Metal low in the series: heat; medium: oxide and carbon; high: electrolysis.", "mnm_flow"),
  mc("Which reaction represents calcination?", "ZnCO3 → ZnO + CO2", ["2ZnS + 3O2 → 2ZnO + 2SO2", "ZnO + C → Zn + CO", "2HgO → 2Hg + O2"], "Calcination is heating a carbonate ore in limited air. The sulphide reaction is roasting."),
  mc("In the reaction Fe2O3 + 2Al → 2Fe + Al2O3, the substance that is reduced is", "Fe2O3", ["Al", "Fe", "Al2O3"], "Iron(III) oxide loses oxygen, and aluminium gains oxygen.", "mnm_thermit"),
  mc("When molten sodium chloride is electrolysed, sodium is obtained at the", "cathode", ["anode", "both electrodes", "neither electrode"], "Na⁺ + e⁻ → Na at the cathode; chlorine forms at the anode.", "mnm_moltennacl"),
  mc("The anode mud in the electrolytic refining of copper contains", "insoluble impurities", ["pure copper", "the electrolyte", "soluble impurities"], "Insoluble impurities settle below the anode.", "mnm_refining"),
  mc("Carbon cannot be used to obtain aluminium from its oxide because", "aluminium has more affinity for oxygen than carbon", ["aluminium is below carbon in the series", "aluminium oxide is a gas", "carbon is a metal"], "Highly reactive metals are obtained by electrolysis."),
  mc("Which of the following is a sulphide ore?", "Cinnabar", ["Calamine", "Bauxite", "Haematite"], "Cinnabar is HgS, an ore of mercury. Calamine is a carbonate."),
  // ── corrosion and alloys ──
  mc("Three iron nails are kept: (A) in water open to air, (B) in boiled distilled water with oil on it, (C) in dry air with anhydrous calcium chloride. The nail that rusts is", "A only", ["B only", "C only", "A and B"], "Both air and water are needed.", "mnm_rust"),
  mc("A galvanised iron sheet and a tin-coated iron sheet are both scratched. The sheet that stays protected at the scratch is", "the galvanised sheet, as zinc is more reactive than iron", ["the tin-coated sheet, as tin is more reactive than iron", "both sheets equally", "neither sheet"], "Zinc corrodes first and protects the iron; tin is less reactive than iron."),
  mc("An alloy containing mercury is called", "an amalgam", ["brass", "bronze", "solder"], "Brass is copper and zinc; bronze is copper and tin; solder is lead and tin."),
  mc("The mass of pure gold in 24 g of 22 carat gold is", "22 g", ["24 g", "20 g", "2 g"], "22 carat gold has 22 parts of gold and 2 parts of copper or silver."),
  mc("Which of the following is NOT an alloy?", "Zinc", ["Brass", "Bronze", "Solder"], "Zinc is a pure metal."),
  mc("The black coating on a silver article is", "silver sulphide", ["silver oxide", "silver carbonate", "silver chloride"], "Silver reacts with sulphur in the air."),
  mc("The Delhi iron pillar is famous because it", "has not rusted for more than 1600 years", ["is made of pure iron", "is made of stainless steel", "is covered with zinc"], "The ancient workers developed a process that prevented the iron from rusting."),
  mc("A metal M is obtained at the cathode, and chlorine at the anode, when its molten chloride MCl2 is electrolysed. M is most likely", "calcium", ["copper", "mercury", "silver"], "Sodium, magnesium and calcium are obtained by the electrolysis of their molten chlorides. Copper, mercury and silver are low in the series."),
  mc("Which statement about the reactivity series is correct?", "A metal above hydrogen displaces hydrogen from dilute acids, and a metal above copper displaces copper from its salt solution", ["Hydrogen is the most reactive element in the series", "Metals below hydrogen react with dilute HCl", "Gold displaces all the other metals"], "Metals above hydrogen displace it from dilute acids, and a more reactive metal displaces a less reactive one from solution.", "mnm_series"),
  // ── assertion-reason ──
  ar("Hydrogen is not evolved when zinc reacts with dilute nitric acid in the usual way.", "Nitric acid oxidises the hydrogen formed to water.", 0, "Nitric acid is a strong oxidising agent."),
  ar("Copper vessels are cleaned with lemon or tamarind juice.", "The acids in them dissolve the basic copper carbonate layer.", 0, "A basic substance reacts with an acid."),
  ar("Aluminium is used for cooking utensils.", "Aluminium is a poor conductor of heat.", 2, "A is true. R is false: aluminium is a good conductor of heat, and it has a protective oxide layer."),
  ar("Ionic compounds conduct electricity in the molten state.", "The ions are free to move in the molten state.", 0, "Moving ions carry the current."),
  ar("Highly reactive metals are extracted by electrolysis.", "They have more affinity for oxygen than carbon.", 0, "Carbon cannot reduce their oxides."),
  ar("Zinc is used to coat iron to protect it from rusting.", "Zinc is less reactive than iron.", 2, "A is true (galvanisation). R is false: zinc is more reactive than iron, so it corrodes first."),
  ar("Pure copper, not brass, is used for making electrical circuits.", "The electrical conductivity of an alloy is less than that of the pure metal in it.", 0, "Brass is an alloy of copper and zinc and conducts poorly, so R explains A."),
  ar("Silver and gold are found in the free state.", "They are very unreactive.", 0, "Metals at the bottom of the series do not combine easily with other elements."),
  // ── application ──
  mc("A food can is coated with tin and not with zinc because", "zinc is more reactive than tin", ["zinc is costlier than tin", "zinc has a higher melting point", "zinc is less reactive than tin"], "A zinc coating would react with the acids of the food."),
  mc("Hot water tanks are made of copper and not of steel because copper", "does not react with water or steam", ["is cheaper than iron", "is a poor conductor of heat", "reacts with steam to form an oxide"], "Steel (iron) reacts slowly with steam and rusts."),
];
