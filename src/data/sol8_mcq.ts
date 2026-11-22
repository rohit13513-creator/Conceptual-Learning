import type { QuizQuestion } from "../types-custom";
import { mc, ar } from "./sol8Util";

// Class VIII Science, The Amazing World of Solutes, Solvents, and Solutions: 40 multiple-choice questions, 10 of them assertion-reason.
// Everything stays inside NCERT Chapter 9. Do not write a slash in any text (use "per" or ÷). Powers are written cm^3 (see sol8Util.ts).

export const SOL8_MCQS: QuizQuestion[] = [
  // ── mixtures, solute and solvent ──
  mc("Which of the following is a uniform mixture?", "sugar and salt dissolved in water", ["sand in water", "sawdust in water", "chalk powder in water"], "In a uniform mixture the components are evenly distributed and cannot be seen separately. Sand, sawdust and chalk powder do not mix evenly with water.", "sl_mixtures"),
  mc("A uniform mixture of two or more substances is called a", "solution", ["suspension of sand", "non-uniform mixture", "pure substance"], "A uniform mixture is called a solution, for example salt in water."),
  mc("When a solid is dissolved in a liquid to form a solution, the solid is called the", "solute", ["solvent", "solution", "saturate"], "The solid that dissolves is the solute and the liquid in which it dissolves is the solvent.", "sl_solute"),
  mc("When two liquids are mixed to form a solution, the liquid present in the smaller amount is called the", "solute", ["solvent", "solution", "mixture"], "In a solution of two liquids, the one in the smaller amount is the solute and the one in the larger amount is the solvent."),
  mc("In the chashni (sugar syrup) of a gulab jamun, a large amount of sugar is dissolved in a small amount of water. Which statement is correct?", "Water is the solvent and sugar is the solute.", ["Sugar is the solvent because it is in the larger amount.", "Water is the solute because it is in the smaller amount.", "There is no solute and no solvent in it."], "A solid dissolved in a liquid is the solute, whatever the amounts; the liquid is the solvent."),
  mc("Air is", "a uniform mixture of gases", ["a non-uniform mixture of gases", "a single pure gas", "a compound of oxygen and nitrogen"], "The gases of the air are spread evenly, so air is a uniform mixture, a solution of gases."),
  // ── saturated, concentration, solubility ──
  mc("A solution in which more solute can be dissolved at a given temperature is called", "an unsaturated solution", ["a saturated solution", "a concentrated solution only", "a pure solvent"], "If more solute can still dissolve, the solution is unsaturated.", "sl_saturation"),
  mc("In a saturated solution of salt at a given temperature", "the extra salt added settles at the bottom", ["the added salt dissolves completely", "no salt is dissolved at all", "the solvent is not water"], "A saturated solution has dissolved the maximum amount of solute possible at that temperature."),
  mc("Which solution is more concentrated?", "4 spoons of salt in 50 mL of water", ["2 spoons of salt in 100 mL of water", "1 spoon of salt in 100 mL of water", "They are equally concentrated"], "4 spoons in 50 mL is 8 spoons per 100 mL, which is more than 2 spoons per 100 mL.", "sl_concentration"),
  mc("The maximum amount of solute that dissolves in a fixed quantity (100 mL) of a solvent at a particular temperature is called its", "solubility", ["concentration", "density", "saturation point of the solvent"], "This is the definition of solubility."),
  mc("For most solids dissolved in water, an increase in temperature", "increases the solubility", ["decreases the solubility", "does not change the solubility", "makes the solid insoluble"], "Water at 70 °C dissolves more baking soda than water at 50 °C, and water at 20 °C dissolves even less.", "sl_solubility"),
  mc("A saturated solution of baking soda at 20 °C is heated to 50 °C. It now behaves as", "an unsaturated solution", ["a saturated solution", "a pure solvent", "a non-uniform mixture"], "More solute can dissolve at the higher temperature, so the solution behaves as an unsaturated one."),
  mc("Sugar stops dissolving in your tea. Which of these can be done to dissolve it?", "heat the tea or add more tea", ["cool the tea", "add more sugar", "stir the tea with a cold spoon only"], "Heating raises the solubility of the sugar and adding more tea gives more solvent."),
  // ── solubility of gases, water as a solvent ──
  mc("The solubility of a gas in water", "decreases as the temperature increases", ["increases as the temperature increases", "does not depend on the temperature", "is zero at all temperatures"], "Cold water holds more oxygen than warm water.", "sl_gases"),
  mc("Aquatic plants and animals depend on", "the oxygen dissolved in water", ["the oxygen in the sunlight", "the salt dissolved in water", "the heat of the water"], "Even though it dissolves only to a small extent, dissolved oxygen sustains all aquatic life."),
  mc("Which of the following does NOT dissolve in water?", "oil", ["salt", "sugar", "baking soda"], "Salt and sugar dissolve in water but not in oil. Oil, grease, wax, paint and plastics do not dissolve in water.", "sl_water"),
  mc("Which solvent is used to remove nail polish?", "acetone", ["water", "turpentine", "vinegar"], "Acetone is used for nail polish, turpentine for paint, kerosene or petrol for grease and alcohol for many medicines and perfumes."),
  // ── density ──
  mc("Density is defined as", "the mass present in a unit volume of a substance", ["the volume of a unit mass of a substance", "the weight of a substance", "the space occupied by an object"], "Density = mass ÷ volume.", "sl_density"),
  mc("The SI unit of density is", "kilogram per cubic metre", ["gram per millilitre", "kilogram", "cubic metre"], "The SI unit is kg per m^3. Gram per mL and gram per cm^3 are other units used for liquids."),
  mc("A block of mass 400 g has a volume of 40 cm^3. Its density is", "10 g per cm^3", ["0.1 g per cm^3", "16 g per cm^3", "360 g per cm^3"], "Density = 400 ÷ 40 = 10 g per cm^3."),
  mc("An aluminium block of mass 27 g and volume 10 cm^3 has a relative density of", "2.7", ["27", "0.37", "2.7 g per cm^3"], "Its density is 27 ÷ 10 = 2.7 g per cm^3. The relative density is the density divided by the density of water (1 g per cm^3), so it is 2.7 and has no unit."),
  mc("The volume of an iron block of mass 600 g and density 7.9 g per cm^3 is about", "75.9 cm^3", ["4740 cm^3", "13.2 cm^3", "0.013 cm^3"], "Volume = mass ÷ density = 600 ÷ 7.9 ≈ 75.9 cm^3."),
  mc("A stone sculpture weighs 225 g and has a volume of 90 cm^3. In water it will", "sink, because its density is 2.5 g per cm^3", ["float, because its density is 2.5 g per cm^3", "sink, because its density is 0.4 g per cm^3", "float, because its density is 0.4 g per cm^3"], "Density = 225 ÷ 90 = 2.5 g per cm^3, which is more than that of water (1 g per cm^3), so it sinks."),
  // ── floating and sinking ──
  mc("An object floats on water if", "its density is less than the density of water", ["its density is more than that of water", "its mass is large", "it is made of metal"], "Objects with a density less than water float; those with a density more than water sink.", "sl_float"),
  mc("An unpeeled orange floats on water but the peeled orange sinks because", "the peel of the orange has air pockets that make it less dense", ["the peel makes the orange heavier", "the peeled orange has no mass", "the water dissolves the peel"], "The air pockets in the peel lower the density of the unpeeled orange below that of water."),
  mc("A raw egg sinks in tap water but floats when enough salt is dissolved in the water, because", "salt water is denser than tap water", ["salt makes the egg lighter", "salt water is less dense than tap water", "the egg dissolves in salt"], "The density of salt water is more than that of tap water and also more than the density of the egg."),
  // ── measuring mass and volume ──
  mc("Before weighing a stone on a digital weighing balance on a watch glass, the balance is set to zero by pressing the", "tare (reset) button", ["power button of another balance", "display button", "stop button"], "The balance is tared with the watch glass on the pan, so that only the mass of the stone is displayed.", "sl_balance"),
  mc("A bottle of 2 L has 500 mL of water in it. How much more water can it hold?", "1500 mL", ["500 mL", "2500 mL", "1000 mL"], "2 L = 2000 mL. 2000 − 500 = 1500 mL."),
  mc("Between the 20 mL and 30 mL marks of a measuring cylinder there are 5 equal divisions. Its smallest reading is", "2 mL", ["5 mL", "0.2 mL", "50 mL"], "The volume between the marks is 10 mL, divided by 5 divisions: 10 ÷ 5 = 2 mL.", "sl_cylinder"),
  mc("The water in a measuring cylinder rises from 50 mL to 62 mL when a stone is put in it. The volume of the stone is", "12 cm^3", ["112 cm^3", "50 cm^3", "62 cm^3"], "Volume = final level − initial level = 62 − 50 = 12 mL = 12 cm^3.", "sl_volume"),

  // ── assertion-reason (10) ──
  ar("Every sip of an ORS solution tastes the same.", "The sugar and salt are evenly distributed in the water.", 0, "A uniform mixture has the same composition everywhere. R explains A."),
  ar("A saturated solution of baking soda at 20 °C becomes unsaturated on heating.", "The solubility of most solids increases with an increase in temperature.", 0, "At a higher temperature more solute can dissolve in the same amount of water. R explains A."),
  ar("Oil floats on water.", "Oil does not dissolve in water.", 1, "Both are true, but the second does not explain the first. Oil floats because its density is less than that of water."),
  ar("Water is called the universal solvent.", "Water dissolves oil, grease and wax.", 2, "A is true because water dissolves more substances than any other common liquid. R is false: oil, grease and wax do not dissolve in water."),
  ar("Oxygen is more soluble in hot water than in cold water.", "The solubility of gases decreases with an increase in temperature.", 3, "A is false: more oxygen dissolves in cold water. R is true."),
  ar("The density of a piece of clay does not change when it is flattened from a cube into a thin sheet.", "The mass and the volume of the clay remain the same.", 0, "Density = mass ÷ volume. Both stay the same, so the density is unchanged. R explains A."),
  ar("A measuring cylinder is narrow and tall.", "The smallest reading of a measuring cylinder depends on its capacity.", 1, "Both are true, but the second does not explain the first. A narrow, tall shape makes a small change in volume a large change in height."),
  ar("Ice floats on water.", "Ice is denser than liquid water.", 2, "A is true. R is false: ice is less dense than water because the water expands on freezing."),
  ar("A hot air balloon rises because hot air is denser than the cool air around it.", "The density of a substance decreases when it is heated.", 3, "A is false: hot air is less dense than the cool air, so it rises. R is true."),
  ar("The density of a gas increases when the pressure on it is increased.", "The particles of the gas come closer and its volume decreases.", 0, "With the mass the same and a smaller volume, the density increases. R explains A."),
];
