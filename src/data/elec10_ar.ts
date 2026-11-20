import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./elec10Util";

// Class X Physics, Electricity: 20 assertion-reason questions for the separate Assertion section.
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const ELEC10_ASSERTIONS: AssertionReasonQuestion[] = [
  q("Electric current is the rate of flow of electric charge.", "One ampere is the current when one coulomb of charge flows through a cross-section in one second.", "A", "The definition of the ampere is exactly charge per unit time, I = Q ÷ t."),
  q("A voltmeter joined in parallel reads exactly the potential difference between two points.", "Components joined in parallel have the same potential difference across them.", "A", "The voltmeter and the part between the two points are across the same two points."),
  q("Charges do not flow in a copper wire unless there is a potential difference between its ends.", "A cell creates a potential difference between its terminals by chemical action.", "B", "Both are true. The cell only supplies the potential difference; it is not the reason why a difference is needed."),
  q("A voltmeter is joined in series to measure the current in a circuit.", "A voltmeter has a very high resistance.", "D", "A voltmeter is joined in parallel and measures potential difference. It does have a very high resistance."),
  q("If the potential difference across a metal wire is doubled at a constant temperature, the current is also doubled.", "The potential difference across a metallic wire is directly proportional to the current through it at constant temperature.", "A", "That is Ohm's law, V = I R."),
  q("The resistance of a wire depends on its length and its area of cross-section.", "The resistivity of the material of a wire depends on its length and its area of cross-section.", "C", "Resistivity is a property of the material only. It does not depend on the length or the area."),
  q("The resistance of a conductor becomes half when its area of cross-section is doubled.", "The resistance of a conductor is inversely proportional to its area of cross-section.", "A", "R = ρ l ÷ A, so R is proportional to 1 ÷ A."),
  q("Copper and aluminium are used for electrical transmission lines.", "Copper has a high melting point.", "B", "Both are true. They are chosen for their very low resistivity, not because of the melting point."),
  q("Mercury is a better conductor of electricity than iron.", "The resistivity of mercury (94.0 × 10^-8 Ω m) is higher than that of iron (10.0 × 10^-8 Ω m).", "D", "The higher resistivity of mercury makes it the poorer conductor, so the assertion is false."),
  q("The equivalent resistance of resistors in series is greater than any one of the resistances.", "In a series combination the resistances add up.", "A", "R_s = R1 + R2 + R3, which is bigger than each term."),
  q("In a string of fairy lights joined in series, all the bulbs go off when one bulb fuses.", "In a series circuit the whole circuit is broken when one component fails.", "A", "The same single path carries the current to every bulb."),
  q("In a parallel combination the total current divides among the branches.", "The equivalent resistance of a parallel combination is less than the smallest resistance.", "B", "Both are true, but the small value of the equivalent resistance is a separate result and does not explain why the current divides."),
  q("Of two resistors in series, the larger resistor produces more heat.", "In a series combination the same current flows through each resistor and H = I^2 R t.", "A", "With the same I and t, H is proportional to R."),
  q("A heater draws a much larger current than a bulb from the same 220 V source.", "The resistance of a heater coil is much less than that of a bulb filament.", "A", "I = V ÷ R: less resistance, more current (2.2 A against 0.18 A in the textbook example)."),
  q("A fuse wire is made of a material of high melting point.", "A fuse must not melt when the normal current flows through it.", "C", "The fuse wire has a low melting point, so that it melts quickly when the current becomes too large."),
  q("A 5 A fuse is chosen for a 1 kW electric iron used on 220 V.", "The working current of the iron is 4.54 A and the fuse should have the next higher rating.", "A", "I = P ÷ V = 1000 ÷ 220 = 4.54 A, so the 5 A fuse is the right one."),
  q("The kilowatt hour is the commercial unit of electrical energy.", "1 kW h = 3.6 × 10^6 J.", "B", "Both are true. The unit is used because the joule is too small for household energy; the conversion alone does not explain why."),
  q("We pay the electricity board for the electrons used up in our homes.", "Electrons are not used up in a circuit; the energy used to move them is what we pay for.", "D", "The assertion is wrong: electrons are not consumed. The reason is correct."),
  q("For an appliance on a fixed supply voltage, a higher resistance means a lower power.", "At a fixed voltage the current decreases when the resistance increases, and P = V^2 ÷ R.", "A", "P = V^2 ÷ R is inversely proportional to R at fixed V."),
  q("In a purely resistive circuit the whole energy given by the source is released as heat.", "A part of the source energy always goes into turning the blades of a fan in a purely resistive circuit.", "C", "A purely resistive circuit has only resistors. Turning fan blades happens in a circuit with a motor, which is not purely resistive."),
];
