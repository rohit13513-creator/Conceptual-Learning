import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./mnm10Util";

// Class X Chemistry, Metals and Non-metals: 25 assertion-reason questions.
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const MNM10_ASSERTIONS: AssertionReasonQuestion[] = [
  q("Metals can be drawn into thin wires.", "Metals are ductile.", "A", "Being drawn into wires is exactly what ductility means."),
  q("Gold and silver are used for making jewellery.", "They are lustrous, malleable and ductile, and they are very unreactive.", "A", "These properties make them suitable, and their low reactivity keeps them from tarnishing."),
  q("Sodium can be cut with a knife.", "Sodium is a very hard metal.", "C", "A is true. R is false: sodium is so soft that a knife can cut it."),
  q("Copper and aluminium are used for electric wires.", "Copper and aluminium are good conductors of electricity.", "A", "A good conductor passes current easily, so R explains A."),
  q("Electric wires are covered with PVC.", "PVC is a good conductor of electricity.", "C", "A is true. R is false: PVC is a poor conductor, and that is why it protects us from shocks."),
  q("Iodine is a lustrous non-metal.", "All non-metals are lustrous.", "C", "A is true, but R is false. Most non-metals are dull."),
  q("Diamond is the hardest natural substance.", "Diamond is an allotrope of carbon.", "B", "Both are true, but being an allotrope of carbon does not explain its hardness."),
  q("Magnesium burns with a dazzling white flame.", "Magnesium oxide formed is a white ash.", "B", "Both are true, but the colour of the ash does not explain the flame."),
  q("Metal oxides are generally basic.", "A solution of magnesium ash turns red litmus blue.", "A", "The litmus change shows that the oxide solution is basic."),
  q("Aluminium oxide is called amphoteric.", "It reacts with both acids and bases.", "A", "That is the meaning of amphoteric."),
  q("Sodium is stored under kerosene oil.", "Sodium is a soft metal that can be cut with a knife.", "B", "Both are true, but softness does not explain the storage. It is kept under oil because it reacts with air and moisture and can catch fire."),
  q("Calcium floats on water as it reacts.", "Bubbles of hydrogen stick to the surface of calcium.", "A", "The bubbles lift the metal, so R explains A."),
  q("Magnesium reacts with hot water but not with cold water.", "Magnesium is more reactive than sodium.", "C", "A is true. R is false: sodium is more reactive than magnesium."),
  q("Aluminium, iron and zinc react with steam.", "They do not react with cold or hot water.", "B", "Both are true. R is just another fact; it does not explain why they react with steam."),
  q("Hydrogen is not evolved when metals react with nitric acid.", "Nitric acid is a strong oxidising agent.", "A", "It oxidises the hydrogen to water."),
  q("Copper does not react with dilute hydrochloric acid.", "Copper is above hydrogen in the reactivity series.", "D", "A is true. R is false: copper is below hydrogen."),
  q("An iron nail becomes brown in copper sulphate solution.", "Iron displaces copper from copper sulphate.", "A", "Brown copper is deposited on the nail."),
  q("Silver does not displace copper from copper sulphate solution.", "Silver is more reactive than copper.", "D", "A is true. R is false: copper is more reactive than silver."),
  q("Sodium chloride does not exist as molecules.", "It is made of aggregates of oppositely charged ions.", "A", "Na⁺ and Cl⁻ ions are arranged in a crystal."),
  q("Ionic compounds are generally soluble in water.", "Ionic compounds are insoluble in kerosene and petrol.", "B", "Both are true, but the second does not explain the first."),
  q("Molten sodium chloride conducts electricity.", "The ions are free to move in the molten state.", "A", "Heat overcomes the attraction between the ions."),
  q("Highly reactive metals like sodium are extracted by electrolysis.", "Carbon cannot reduce their oxides.", "A", "These metals have more affinity for oxygen than carbon has."),
  q("Roasting is used for sulphide ores.", "Carbonate ores are heated in limited air to give oxides.", "B", "Both are true, but R describes calcination and does not explain roasting."),
  q("Pure iron is never used in daily life.", "Pure iron is very soft and stretches easily when hot.", "A", "So iron is alloyed, for example with carbon, to make it hard."),
  q("Food cans are coated with tin and not with zinc.", "Zinc is less reactive than tin.", "D", "A is true. R is false: zinc is more reactive than tin, so it would react with the food."),
];
