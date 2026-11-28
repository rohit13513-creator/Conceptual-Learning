import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./bp8Util";

// Class VIII Maths, The Baudhāyana-Pythagoras Theorem: 20 assertion-reason questions for the separate Assertion section (different from the 25 inside
// the multiple-choice list), easiest first. A = both true and R explains A, B = both true but R does not explain A, C = A true and R false,
// D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const BP8_ASSERTIONS: AssertionReasonQuestion[] = [
  q("The square drawn on the diagonal of a square has double its area.", "It is made of 4 congruent triangles while the original square is made of 2 of them.", "A", "R explains A."),
  q("Doubling the side of a square doubles its area.", "The area of a square is side × side.", "D", "A is false: the area becomes 4 times. R is true."),
  q("A right triangle with legs 8 and 15 has hypotenuse 17.", "8^2 + 15^2 = 17^2.", "A", "64 + 225 = 289, so R explains A."),
  q("The hypotenuse of an isosceles right triangle with equal sides 4 is √32.", "c^2 = 2a^2.", "A", "2 × 16 = 32."),
  q("The theorem is also called the Baudhāyana-Pythagoras theorem.", "Baudhāyana stated it about 800 BCE, before Pythagoras.", "A", "R explains A."),
  q("A square obtained by joining the midpoints of a square's sides has half its area.", "A square with half the side has half the area.", "C", "A is true. R is false: it has a quarter of the area."),
  q("√2 is not a terminating decimal.", "No square of a terminating decimal with a non-zero last digit ends with all zeros after the point.", "A", "R explains A."),
  q("√2 = 1.414 exactly.", "1.414^2 = 1.999396.", "D", "A is false: the square is not 2. R is true."),
  q("A triangle with sides 7, 24, 25 is right angled.", "(7, 24, 25) is listed by Baudhāyana.", "B", "Both are true, but being listed does not prove it; 7^2 + 24^2 = 25^2 does."),
  q("(15, 36, 39) is a Baudhāyana triple.", "(5, 12, 13) is a Baudhāyana triple and multiplying by 3 keeps it one.", "A", "R explains A."),
  q("(8, 15, 17) is not obtained from an odd square by the method of the chapter.", "Its hypotenuse is 2 more than the leg 15.", "A", "The method gives hypotenuse 1 more than a leg."),
  q("There are only finitely many Baudhāyana triples.", "(3k, 4k, 5k) is a triple for every counting number k.", "D", "A is false: there are infinitely many. R is true."),
  q("The equation x^3 + y^3 = z^3 has no solution in natural numbers.", "x^2 + y^2 = z^2 has many solutions in natural numbers.", "B", "Both are true, but R does not explain A; A is part of Fermat's Last Theorem."),
  q("The side of a rhombus with diagonals 10 and 24 is 13.", "The diagonals of a rhombus bisect each other at right angles.", "A", "Half diagonals 5 and 12 give 13."),
  q("The altitude of an equilateral triangle bisects its base.", "The area of an equilateral triangle of side 6 is 9√3.", "B", "Both are true, but the area does not explain why the altitude bisects the base."),
  q("A square of area 5 can be drawn on a dot grid.", "A square of area 4 can be drawn on a dot grid.", "B", "Both are true, but R is not the reason: 5 = 1^2 + 2^2."),
  q("The hypotenuse is always longer than each leg.", "In a right triangle the hypotenuse is equal to the longer leg.", "C", "A is true. R is false."),
  q("A triangle with sides 4, 5 and 6 is right angled.", "6 is the longest side.", "D", "A is false: 16 + 25 = 41, not 36. R is true."),
  q("A right triangle with legs 2 and 1 has hypotenuse √5.", "The square of the hypotenuse is the sum of the squares of the legs.", "A", "4 + 1 = 5, so R explains A."),
  q("The diagonal of a 3 by 4 by 12 box is 13.", "The diagonal of a box is l + b + h.", "C", "A is true: 9 + 16 + 144 = 169. R is false."),
];
