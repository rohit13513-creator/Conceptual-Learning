import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./acid10Util";

// Class X Chemistry, Acids, Bases and Salts: 25 assertion-reason questions.
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const ACID10_ASSERTIONS: AssertionReasonQuestion[] = [
  q("Blue litmus turns red in an acid.", "An acid produces H⁺(aq) ions in solution.", "A", "The H⁺(aq) ions are responsible for the acidic properties, including the colour change of blue litmus."),
  q("Phenolphthalein cannot be used to tell an acid from a neutral solution.", "Phenolphthalein is colourless in both an acid and a neutral solution.", "A", "Both are true, and the colourless result in both is exactly why it cannot separate them."),
  q("Onion, vanilla and clove oil are called olfactory indicators.", "Their smell changes in an acidic or basic medium.", "A", "Olfactory means connected with smell. R explains the name."),
  q("All bases are alkalis.", "Alkalis are the bases that dissolve in water.", "D", "A is false: some bases, for example Mg(OH)2, do not dissolve well. R is the correct definition of an alkali."),
  q("Hydrogen gas is given out when zinc is added to dilute sulphuric acid.", "The metal displaces hydrogen from the acid.", "A", "Acid + metal gives a salt and hydrogen. The metal takes the place of hydrogen, so R explains A."),
  q("Nitric acid usually does not give hydrogen gas with metals.", "Nitric acid is a strong oxidising agent.", "A", "The hydrogen formed is oxidised to water, so R explains A."),
  q("Zinc reacts with warm sodium hydroxide to form sodium zincate and hydrogen.", "All metals react with sodium hydroxide to give hydrogen.", "C", "A is true. R is false: such reactions are not possible with all metals."),
  q("Acetic acid reacts slowly with magnesium.", "Acetic acid is a weak acid and gives few H⁺ ions.", "A", "Fewer H⁺ ions means a slower reaction."),
  q("Crushed egg-shells give effervescence with dilute HCl.", "Egg-shells contain calcium carbonate.", "A", "A carbonate reacts with an acid to give CO2, so R explains A."),
  q("Carbon dioxide turns lime water milky.", "Carbon dioxide reacts with calcium hydroxide to form insoluble calcium carbonate.", "A", "The white precipitate of CaCO3 makes the lime water milky."),
  q("Carbon dioxide puts out a burning candle.", "Carbon dioxide turns lime water milky.", "B", "Both are true, but the milky lime water is a different test and does not explain why the flame goes out."),
  q("The pink colour of NaOH with phenolphthalein disappears on adding HCl.", "The acid neutralises the base.", "A", "Phenolphthalein is pink only when a base is present."),
  q("If 10 mL of NaOH needs 8 mL of HCl, then 20 mL of the same NaOH needs 16 mL of the same HCl.", "The volume of acid needed does not depend on the volume of the base.", "C", "A is true: doubling the base doubles the acid. R is false: the acid needed is proportional to the volume of the base."),
  q("Metal oxides are called basic oxides.", "They react with acids to give a salt and water.", "A", "This is the behaviour of a base, so R explains A."),
  q("Non-metal oxides are acidic in nature.", "They react with bases to give a salt and water.", "A", "For example CO2 with Ca(OH)2 gives CaCO3 and water."),
  q("The bulb glows when glucose solution is used in the conductivity activity.", "Glucose contains hydrogen.", "D", "A is false: glucose gives no ions, so the bulb does not glow. R is true but a compound with hydrogen is not necessarily an acid."),
  q("Alcohol is not an acid although it contains hydrogen.", "Alcohol does not give H⁺ ions in water.", "A", "A compound is an acid only when it gives H⁺ ions, so R explains A."),
  q("Dilution decreases the concentration of H3O⁺ ions in an acid.", "The same number of ions is present in a larger volume.", "A", "So the number of ions per unit volume decreases."),
  q("The pH of a solution that turns red litmus blue is more than 7.", "A basic solution has more OH⁻ ions than H⁺ ions.", "A", "Bases turn red litmus blue and have pH above 7."),
  q("A solution of pH 11 has more H⁺ ions than a solution of pH 4.", "Lower pH means a higher concentration of H⁺ ions.", "D", "A is false: pH 4 has more H⁺ ions than pH 11. R is true."),
  q("Tooth decay starts when the pH of the mouth is lower than 5.5.", "Tooth enamel is corroded by acids below this pH.", "A", "Enamel does not dissolve in water but is corroded when the pH falls below 5.5."),
  q("Toothpaste helps in preventing tooth decay.", "Toothpastes are generally basic and neutralise the excess acid.", "A", "The acid made by bacteria is neutralised by the basic toothpaste."),
  q("Copper sulphate solution is acidic.", "It is a salt of a strong acid and a weak base.", "A", "Such salts have pH less than 7."),
  q("Bleaching powder is made by passing chlorine over dry slaked lime.", "Chlorine is produced in the chlor-alkali process.", "B", "Both are true, but the source of chlorine does not explain why it reacts with slaked lime."),
  q("Washing soda is used to remove permanent hardness of water.", "Washing soda is sodium carbonate crystals with water of crystallisation.", "B", "Both are true. The use depends on the carbonate; the water of crystallisation does not explain it."),
];
