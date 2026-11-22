import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./sol8Util";

// Class VIII Science, The Amazing World of Solutes, Solvents, and Solutions: 22 assertion-reason questions for the separate Assertion section
// (different from the 10 inside the multiple-choice list).
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const SOL8_ASSERTIONS: AssertionReasonQuestion[] = [
  q("A mixture of sand and water is not a solution.", "The sand is not evenly distributed in the water and can be seen separately.", "A", "A solution is a uniform mixture; sand and water form a non-uniform mixture. R explains A."),
  q("Air is a uniform mixture.", "Air contains oxygen and nitrogen as its main gases.", "B", "Both are true, but naming the gases does not explain why air is a uniform mixture. It is uniform because the gases are evenly spread."),
  q("In the sugar syrup of a gulab jamun, water is the solvent.", "Water is present in the smaller amount in the syrup.", "B", "Both are true, but the amount is not the reason. Water is the solvent because the solid (sugar) dissolves in the liquid (water)."),
  q("The liquid present in the larger amount in a mixture of two liquids is the solvent.", "The solvent is the substance in which the solute dissolves.", "A", "In a solution of two liquids, the larger amount is the solvent. R explains A."),
  q("An unsaturated solution can dissolve more solute at a given temperature.", "An unsaturated solution has no solute dissolved in it.", "C", "A is true because the limit has not been reached. R is false: an unsaturated solution has some solute dissolved in it, but less than the maximum."),
  q("A saturated solution forms only at high temperatures.", "A saturated solution at one temperature behaves as an unsaturated solution when it is heated.", "D", "A is false: a saturated solution can form at any temperature. R is true."),
  q("A solution of 4 spoons of salt in 50 mL of water is more concentrated than 2 spoons in 100 mL of water.", "The first has 8 spoons per 100 mL and the second has 2 spoons per 100 mL.", "A", "Concentration is the amount of solute in a fixed quantity of solution. R explains A."),
  q("Dilute and concentrated are relative terms.", "One spoon of salt in a glass of water is dilute compared with two spoons in the same water.", "A", "A solution is called dilute or concentrated only when compared with another one. R explains A."),
  q("More baking soda dissolves in water at 70 °C than in water at 20 °C.", "The solubility of most solids increases with temperature.", "A", "This is the effect of temperature on solubility. R explains A."),
  q("Sugar dissolves in hot tea more than in cold tea.", "The tea is a liquid.", "B", "Both are true, but the fact that tea is a liquid does not explain why more sugar dissolves when it is hot."),
  q("Fish live better in cold water than in warm water.", "Cold water holds more dissolved oxygen than warm water.", "A", "The solubility of gases decreases with a rise in temperature. R explains A."),
  q("Common salt is obtained from sea water in salt pans.", "The heat of the Sun evaporates the water and leaves the salt crystals.", "A", "The salt is left behind as the water evaporates. R explains A."),
  q("Salt dissolves in water but not in oil.", "Oil is a good solvent for salt.", "C", "A is true. R is false: oil does not dissolve salt, while water is a good solvent for it."),
  q("Water can dissolve every substance.", "Oil, grease, wax and paint do not dissolve in water.", "D", "A is false, as the reason R shows: water is the most versatile solvent but it does not dissolve everything. R is true."),
  q("A wooden stick and an iron rod of the same size have different densities.", "The iron rod has more mass in the same volume.", "A", "Density is the mass in a unit volume. R explains A."),
  q("The density of a substance does not depend on the shape of the object.", "Changing the shape changes neither the mass nor the volume of a substance.", "A", "Density = mass ÷ volume, and neither changes with shape. R explains A."),
  q("Relative density has no unit.", "It is the ratio of two densities.", "A", "The units cancel in the ratio. R explains A."),
  q("An object having a density less than that of water floats on it.", "Mass is the quantity of matter in an object.", "B", "Both are true, but the definition of mass does not explain floating. The object floats because it is less dense than water."),
  q("A raw egg floats in salt water but sinks in tap water.", "Salt water is less dense than tap water.", "C", "A is true. R is false: salt water is denser than tap water, so the egg floats in it."),
  q("The mass of an object is measured in newtons.", "Weight is the force with which the Earth pulls an object.", "D", "A is false: mass is measured in grams or kilograms and weight in newtons. R is true."),
  q("A 100 mL measuring cylinder is the best choice to measure 70 mL of water.", "It can measure 70 mL in one step with a smaller smallest reading than a 250 mL cylinder.", "A", "A 50 mL cylinder needs two steps and a 250 mL cylinder is less accurate. R explains A."),
  q("Water in a test tube rises in the glass tube when the test tube is kept in hot water.", "The density of water increases on heating.", "C", "A is true because the water expands. R is false: its volume increases while its mass is the same, so the density decreases."),
];
