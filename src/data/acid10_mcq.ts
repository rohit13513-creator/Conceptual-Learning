import type { QuizQuestion } from "../types-custom";
import { mc, ar } from "./acid10Util";

// Class X Chemistry, Acids, Bases and Salts: 50 multiple-choice questions (10 of them assertion-reason).
// Every question stays inside Chapter 2 of the textbook.

export const ACID10_MCQS: QuizQuestion[] = [
  // ── indicators ──
  mc("Which indicator is colourless in an acid and turns pink in a base?", "Phenolphthalein", ["Methyl orange", "Blue litmus", "Turmeric"], "Phenolphthalein is colourless in acids and neutral solutions and pink in bases.", "abs_indicators"),
  mc("A yellow curry stain on a white cloth turns reddish-brown when soap is rubbed on it. This shows that", "soap is basic and turmeric is an indicator", ["soap is acidic", "curry is a base", "turmeric is a salt"], "Turmeric turns reddish-brown in a base. Soap is basic."),
  mc("Litmus is a purple dye that is obtained from", "lichen", ["turmeric root", "red cabbage leaves", "beetroot"], "Litmus is extracted from lichen, a plant of the division Thallophyta."),
  mc("Which of the following can be used as an olfactory indicator?", "Onion", ["Litmus", "Phenolphthalein", "Methyl orange"], "Onion, vanilla and clove oil change smell in a base. They are olfactory indicators."),
  mc("A student has only red litmus paper. A solution turns it blue. The solution is", "basic", ["acidic", "neutral", "a salt of a strong acid"], "Only a base turns red litmus blue."),
  mc("The colour of methyl orange in a base is", "yellow", ["red", "pink", "colourless"], "Methyl orange is red in acids and yellow in bases."),
  // ── acids and bases ──
  mc("All alkalis are bases but all bases are not alkalis, because", "some bases do not dissolve in water", ["some bases are acidic", "alkalis are weak bases", "bases do not give OH⁻ ions"], "An alkali is a base that dissolves in water. Mg(OH)2 is a base that is only very slightly soluble."),
  mc("The acid present in tamarind is", "tartaric acid", ["citric acid", "lactic acid", "oxalic acid"], "Tamarind has tartaric acid. Lemon and orange have citric acid, curd has lactic acid and tomato has oxalic acid."),
  mc("The stinging hair of nettle leaves injects", "methanoic acid", ["acetic acid", "citric acid", "lactic acid"], "Methanoic acid causes the burning pain of a nettle sting."),
  // ── reactions with metals ──
  mc("Zinc granules are added to dilute sulphuric acid. The gas that burns with a pop sound is", "hydrogen", ["oxygen", "carbon dioxide", "chlorine"], "Acid + metal gives a salt and hydrogen. Hydrogen burns with a pop.", "abs_zinc"),
  mc("Which of the following does NOT release hydrogen gas?", "Copper oxide with dilute HCl", ["Zinc with dilute HCl", "Magnesium with dilute H2SO4", "Zinc with warm NaOH solution"], "Copper oxide is a metal oxide. It gives a salt and water with an acid."),
  mc("Aluminium reacts with dilute sulphuric acid to form", "Al2(SO4)3 and H2", ["AlSO4 and H2", "Al(SO4)3 and H2", "Al2SO4 and H2"], "Al³⁺ and SO4²⁻ balance as Al2(SO4)3, so 2Al + 3H2SO4 → Al2(SO4)3 + 3H2."),
  mc("Zinc is warmed with sodium hydroxide solution. The salt formed is", "sodium zincate", ["zinc hydroxide", "zinc oxide", "sodium chloride"], "2NaOH + Zn → Na2ZnO2 + H2. Na2ZnO2 is sodium zincate."),
  mc("Curd should not be kept in brass vessels because", "the acid in the curd reacts with the metal and forms harmful salts", ["curd turns brass black", "brass dissolves in water", "curd is a base"], "Curd contains lactic acid, which reacts with the metals of brass."),
  // ── carbonates and neutralisation ──
  mc("The gas that turns lime water milky is", "carbon dioxide", ["hydrogen", "oxygen", "ammonia"], "CO2 reacts with lime water, Ca(OH)2, to form insoluble white CaCO3.", "abs_limewater"),
  mc("On passing excess carbon dioxide through milky lime water, the milkiness disappears because", "soluble calcium hydrogencarbonate is formed", ["calcium carbonate dissolves in acid", "water evaporates", "carbon dioxide turns to oxygen"], "CaCO3 + H2O + CO2 → Ca(HCO3)2, which dissolves in water."),
  mc("Sodium carbonate reacts with dilute hydrochloric acid to give", "sodium chloride, water and carbon dioxide", ["sodium chloride and hydrogen", "sodium hydroxide and chlorine", "sodium chloride and water only"], "Metal carbonate + acid gives salt + water + carbon dioxide."),
  mc("In the activity with NaOH, phenolphthalein and dilute HCl, the pink colour disappears because", "the base is neutralised by the acid", ["the indicator is destroyed", "the solution is diluted", "HCl is a base"], "Phenolphthalein is pink only in a basic solution.", "abs_neutral"),
  mc("10 mL of NaOH needs 8 mL of a given HCl for complete neutralisation. For 30 mL of the same NaOH, the same HCl needed is", "24 mL", ["8 mL", "16 mL", "30 mL"], "30 mL is 3 times 10 mL, so the acid needed is 3 × 8 = 24 mL."),
  mc("When black copper oxide is added to dilute HCl, the solution becomes", "blue-green", ["pink", "colourless", "yellow"], "Copper(II) chloride is blue-green. CuO + 2HCl → CuCl2 + H2O.", "abs_cuo"),
  mc("Calcium hydroxide and carbon dioxide react to give", "calcium carbonate and water", ["calcium oxide and hydrogen", "calcium chloride and water", "calcium carbonate and hydrogen"], "Base + non-metal oxide gives salt + water: Ca(OH)2 + CO2 → CaCO3 + H2O."),
  // ── ions and water ──
  mc("In water, a hydrogen ion exists as", "H3O⁺", ["OH⁻", "H2⁺", "H⁻"], "H⁺ + H2O → H3O⁺, the hydronium ion."),
  mc("The bulb glows when the beaker contains", "dilute hydrochloric acid", ["glucose solution", "alcohol solution", "distilled water"], "Only the acid solution has ions to carry current.", "abs_conduct"),
  mc("Dry HCl gas is passed over dry blue litmus paper and then over wet blue litmus paper. The paper that turns red is", "only the wet paper", ["only the dry paper", "both papers", "neither paper"], "HCl gives H⁺ ions only in the presence of water.", "abs_hcl"),
  mc("When concentrated sulphuric acid is to be diluted, one should", "add the acid slowly to water with stirring", ["add water quickly to the acid", "add the acid all at once to water", "heat the acid first"], "The mixing gives out a lot of heat, so acid goes into water slowly."),
  mc("The concentration of H3O⁺ ions when an acid is diluted", "decreases", ["increases", "stays the same", "becomes zero"], "The same acid is spread over a larger volume.", "abs_dilution"),
  // ── pH ──
  mc("The pH of a neutral solution is", "7", ["0", "1", "14"], "pH 7 is neutral. Below 7 is acidic and above 7 is basic."),
  mc("The solution with pH 2 compared with the solution with pH 5 has", "more hydrogen ions", ["fewer hydrogen ions", "the same hydrogen ions", "more hydroxide ions"], "Lower pH means higher H⁺ ion concentration."),
  mc("Our body works within the pH range", "7.0 to 7.8", ["1.0 to 3.0", "5.0 to 6.0", "9.0 to 10.0"], "Living organisms survive only in a narrow pH range.", "abs_phlife"),
  mc("Rain water is called acid rain when its pH is", "less than 5.6", ["more than 7", "exactly 7", "between 6 and 7"], "Acid rain lowers the pH of rivers and harms aquatic life."),
  mc("Tooth decay starts when the pH of the mouth falls below", "5.5", ["7.0", "6.5", "3.0"], "The enamel (calcium hydroxyapatite) is corroded below pH 5.5."),
  mc("Relief from a bee sting is obtained by rubbing", "baking soda", ["vinegar", "lemon juice", "tamarind"], "A bee sting leaves an acid. A mild base like baking soda neutralises it."),
  // ── salts ──
  mc("The solution of copper sulphate in water has a pH", "less than 7", ["equal to 7", "more than 7", "equal to 14"], "CuSO4 is made from a strong acid (H2SO4) and a weak base (Cu(OH)2): acidic."),
  mc("Which of the following salts has a neutral solution?", "KNO3", ["Na2CO3", "AlCl3", "CH3COONa"], "KNO3 comes from a strong acid (HNO3) and a strong base (KOH)."),
  mc("In the chlor-alkali process, chlorine gas is given off at", "the anode", ["the cathode", "the surface of the solution", "the battery"], "Chlorine at the anode, hydrogen at the cathode, NaOH near the cathode.", "abs_chloralkali"),
  mc("Bleaching powder is represented as", "Ca(ClO)2", ["CaCl2", "Ca(OH)2", "CaCO3"], "It is made from chlorine and dry slaked lime."),
  mc("The chemical name of baking soda is", "sodium hydrogencarbonate", ["sodium carbonate", "sodium hydroxide", "sodium chloride"], "Baking soda is NaHCO3."),
  mc("Washing soda has the formula", "Na2CO3.10H2O", ["NaHCO3", "Na2CO3", "NaOH"], "It is sodium carbonate with 10 molecules of water of crystallisation."),
  mc("The number of water molecules in one formula unit of blue copper sulphate crystals is", "5", ["2", "7", "10"], "The formula is CuSO4.5H2O.", "abs_cuso4"),
  mc("Gypsum, on heating at 373 K, forms", "Plaster of Paris", ["bleaching powder", "washing soda", "baking soda"], "CaSO4.2H2O loses water and becomes CaSO4.½H2O.", "abs_gypsum"),
  // ── assertion-reason ──
  ar("Dry HCl gas does not turn dry blue litmus paper red.", "HCl gives H⁺ ions only in the presence of water.", 0, "Acidic behaviour needs H⁺ ions. Without water, HCl does not form them, so R explains A."),
  ar("Acid is always added slowly to water and never water to acid.", "Dissolving an acid in water is a highly exothermic process.", 0, "The large amount of heat can splash the mixture out. So R explains A."),
  ar("Glucose contains hydrogen but it is not an acid.", "Glucose does not give H⁺ ions in water.", 0, "A compound is an acid only if it gives H⁺ ions. So R explains A."),
  ar("A solution of baking soda in water is basic.", "Sodium hydrogencarbonate is made from a strong base and a weak acid.", 0, "A salt of a strong base and a weak acid is basic, so R explains A."),
  ar("The pH of sodium chloride solution is 7.", "Sodium chloride is formed from a strong acid and a strong base.", 0, "Such a salt is neutral, so R explains A."),
  ar("Magnesium ribbon fizzes more vigorously in HCl than in acetic acid of the same concentration.", "Hydrochloric acid is a stronger acid than acetic acid.", 0, "HCl gives more H⁺ ions, so it reacts faster with magnesium."),
  ar("Plaster of Paris is stored in a moisture-proof container.", "Plaster of Paris is a white powder.", 1, "Both statements are true, but the reason is moisture changing it into gypsum, not its colour."),
  ar("Excess carbon dioxide makes milky lime water clear again.", "Calcium carbonate is insoluble in water.", 1, "Both are true, but R does not explain A. The clearing is due to soluble calcium hydrogencarbonate."),
  ar("Zinc reacts with sodium hydroxide to give hydrogen gas.", "All metals react with bases to give hydrogen gas.", 2, "A is true for zinc (and aluminium). R is false: such reactions are not possible with all metals."),
  ar("Crystals of washing soda are wet.", "Washing soda contains water of crystallisation.", 3, "A is false. The water is part of the crystal, so the crystals are not wet. R is true."),
];
