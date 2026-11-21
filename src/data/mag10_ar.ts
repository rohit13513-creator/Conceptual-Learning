import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./magUtil";

// Class X Physics, Magnetic Effects of Electric Current: 24 assertion-reason questions for the separate Assertion section
// (different from the 20 inside the multiple-choice list).
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const MAG10_ASSERTIONS: AssertionReasonQuestion[] = [
  q("A freely suspended bar magnet comes to rest along the north-south direction.", "The earth behaves like a huge magnet and exerts a force on the suspended magnet.", "A", "The earth's field turns the magnet until its north pole points to the geographic north. R explains A."),
  q("Iron filings sprinkled round a bar magnet arrange themselves in a definite pattern.", "The magnet exerts its influence in the region surrounding it.", "A", "The filings behave like tiny magnets and line up along the field lines in that region. R explains A."),
  q("Inside a bar magnet the magnetic field lines run from the south pole to the north pole.", "The tangent to a field line at a point gives the direction of the field at that point.", "B", "Both are true. The second statement is a general property of field lines; it does not tell why the lines run from south to north inside."),
  q("Equally spaced parallel field lines represent a uniform magnetic field.", "In a uniform field the field lines are crowded at one end and spread at the other.", "C", "A is true. R is false: crowded and spread lines would show a field that is stronger at one end, which is not uniform."),
  q("Reversing the direction of the current in a straight wire has no effect on the direction of the magnetic field round it.", "By the right-hand thumb rule, the direction of the field depends on the direction of the current.", "D", "A is false: reversing the current reverses the field, and the compass needle swings the opposite way. R is true."),
  q("The deflection of a compass needle near a wire is reversed when the current in the wire is reversed.", "The direction of the magnetic field of a wire depends on the direction of the current.", "A", "Reversing the current reverses the field, so the needle is deflected the other way. R explains A."),
  q("Iron filings round a vertical wire carrying current arrange themselves in concentric circles.", "The strength of the field of a straight wire falls as the distance from the wire increases.", "B", "Both are true. The circles come from the shape of the field; the fall of strength with distance does not explain the circles."),
  q("When the current in a long straight wire is doubled, the magnetic field at a given point near it is doubled.", "The magnetic field due to a current-carrying wire does not depend on the current.", "C", "A is true. R is false: the field depends directly on the current."),
  q("A soft iron core placed inside a solenoid makes the field much stronger.", "The soft iron core is magnetised by the field of the solenoid and adds its own field.", "A", "This is how an electromagnet is made. R explains A."),
  q("A current-carrying solenoid has no north pole and no south pole.", "The magnetic field of a solenoid is similar to that of a bar magnet.", "D", "A is false: one end of the solenoid acts as a north pole and the other as a south pole. R is true."),
  q("Electromagnets are used in cranes to lift heavy iron scrap and to drop it at the right place.", "The magnetism of an electromagnet can be switched on and off by the current.", "A", "Switching the current on picks up the scrap; switching it off releases it. R explains A."),
  q("Fleming's left-hand rule is used to find the direction of the force on a current-carrying conductor in a field.", "Fleming's right-hand rule is used to find the direction of the induced current.", "B", "Both statements are true and the two rules are related, but one is not the reason for the other."),
  q("A current-carrying conductor always experiences a force in a magnetic field.", "The force on a conductor is zero when the current is parallel to the field.", "D", "A is false: there is no force when the current is parallel to the field. R is true and shows the exception."),
  q("The coil of a DC motor keeps rotating in the same direction.", "The split-ring commutator reverses the current in the coil after every half rotation.", "A", "The reversal makes the force on each side of the coil keep the same turning sense. R explains A."),
  q("A current is induced in a coil when a magnet is moved towards it.", "A relative motion between the coil and the magnet changes the magnetic field linked with the coil.", "A", "The change in the field linked with the coil sets up the induced current. R explains A."),
  q("A generator converts mechanical energy into electrical energy.", "A generator works on the principle of the force on a current-carrying conductor in a magnetic field.", "C", "A is true. R is false: a generator works on electromagnetic induction. (The motor uses the force on a conductor.)"),
  q("Fleming's right-hand rule is used to find the direction of the current in an electric generator.", "A generator produces alternating current.", "B", "Both are true. The rule gives the direction of the induced current at an instant; it is not the reason why the output is alternating."),
  q("Alternating current is the type of supply used in homes.", "Alternating current can be transmitted over long distances without much loss of energy.", "A", "This advantage of AC is the reason for using it for the mains. R explains A."),
  q("The mains supply in India reverses its direction 50 times every second.", "The frequency of the AC supply in India is 50 Hz.", "D", "A is false: with 50 complete cycles each second the current reverses direction 100 times, once every one-hundredth of a second. R is true."),
  q("The potential difference between the live wire and the neutral wire in a house is 220 V.", "The live wire and the neutral wire are at the same potential.", "C", "A is true. R is false: the live wire is at a high potential and the neutral wire is near earth potential, which makes the 220 V difference."),
  q("The fuse wire is made of a material having a low melting point.", "The Joule heating in the fuse melts it when the current exceeds the rating and breaks the circuit.", "A", "A low melting point lets the wire melt quickly when it gets hot. R explains A."),
  q("A separate 15 A circuit is used for a geyser or an air cooler.", "Appliances of high power rating draw a large current.", "A", "A thicker wire and a higher rating are needed for large currents. R explains A."),
  q("Overloading can occur when too many appliances are connected to a single socket.", "A fuse protects a circuit from damage due to overloading.", "B", "Both are true. The fuse is a protection; it is not the reason why overloading occurs."),
  q("Magnetic Resonance Imaging (MRI) is used to obtain images of body parts.", "The heart and the brain produce significant magnetic fields because of the weak ion currents in their nerve cells.", "A", "The magnetic field inside the body forms the basis of MRI. R explains A."),
];
