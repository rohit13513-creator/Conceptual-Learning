import type { ShortQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import * as F from "./props9Figs";

// Class IX Maths, Propositions and their Converses: 10 two-mark questions and 10 three-mark questions.

let a = 0;
const v = (question: string, answer: string, keyPoints: string[], figure?: GeoSpec): ShortQuestion => ({ id: ++a, question, answer, keyPoints, figure });
let b = 0;
const s = (question: string, answer: string, keyPoints: string[], figure?: GeoSpec): ShortQuestion => ({ id: ++b, question, answer, keyPoints, figure });

export const PROPS9_VERY_SHORT: ShortQuestion[] = [
  v("Define a proposition. Give one true proposition and one false proposition.",
    "A proposition is a statement that is either true or false. True: \"The angles of a triangle add up to 180°.\" False: \"Every prime number is odd.\" (2 is prime and even.)",
    ["Statement, true or false", "A true example", "A false example"]),
  v("Write the converse of \"If a triangle is equilateral, then it is isosceles.\" Is the converse true?",
    "Converse: If a triangle is isosceles, then it is equilateral. It is false. A triangle with sides 5 cm, 5 cm and 8 cm is isosceles but not equilateral.",
    ["Swap the two parts", "Converse is false", "Counterexample 5, 5, 8"]),
  v("Write \"A number has an odd number of factors when it is a perfect square\" in the \"if-then\" form.",
    "The word \"when\" goes with the condition. So: If a number is a perfect square, then it has an odd number of factors.",
    ["Y when X means if X then Y", "X: it is a perfect square", "Y: it has an odd number of factors"]),
  v("What is a counterexample? Give a counterexample to \"If n is a prime number, then n is odd.\"",
    "A counterexample is an example that satisfies the condition of a proposition but does not satisfy its conclusion, so it shows the proposition is false. For the given proposition, n = 2 is prime and not odd.",
    ["Satisfies X, breaks Y", "Shows the proposition is false", "n = 2"]),
  v("Write the converse of \"If x = y, then a + x = a + y\". Is it true?",
    "Converse: If a + x = a + y, then x = y. It is true: subtracting a from both sides of a + x = a + y gives x = y. This is the cancellation step used in solving equations.",
    ["Swap the parts", "Subtract a from both sides", "True"]),
  v("State the converse of the Baudhāyana–Pythagoras theorem for the triangle in the figure.",
    "Let a, b, c be the lengths of the sides of a triangle. If a² + b² = c², then the triangle is right-angled (the right angle is opposite the side c). The first sentence of the theorem is kept and only the \"if\" part and the \"then\" part are exchanged.",
    ["Keep the setup sentence", "If a² + b² = c², then right-angled", "It is true"], F.pythTri("Sides a, b, c")),
  v("Justify the proposition: \"If a number is a multiple of 6, then it is a multiple of 3.\"",
    "Let the number be 6k. Then 6k = 3 × 2k, which is a multiple of 3. So the proposition is true.",
    ["Write the number as 6k", "6k = 3 × 2k", "Multiple of 3"]),
  v("Give a counterexample to the converse of \"If n is divisible by 24, then it is divisible by both 4 and 6\".",
    "The converse is: if n is divisible by both 4 and 6, then it is divisible by 24. The number 12 is divisible by 4 and 6 but not by 24, so it is a counterexample.",
    ["State the converse", "12 ÷ 4 and 12 ÷ 6 are whole numbers", "12 ÷ 24 is not"]),
  v("Can both a proposition and its converse be false? Give an example.",
    "Yes. \"If a number is odd, then it is prime\" is false (9 is odd and not prime), and its converse \"If a number is prime, then it is odd\" is also false (2 is prime and even).",
    ["Yes it can happen", "Counterexample 9", "Counterexample 2"]),
  v("Write the converse of \"If two lines are parallel, then the corresponding angles formed by a transversal are equal\". Is it true?",
    "Converse: If the corresponding angles formed by a transversal with two lines are equal, then the two lines are parallel. It is true. (The proposition and its converse are together the corresponding angles axiom.)",
    ["Swap the parts", "Converse is true"], F.transversal("Corresponding angles 1 and 2")),
];

export const PROPS9_SHORT: ShortQuestion[] = [
  s("Write the converse of \"If a quadrilateral is a square, then all its angles are equal\". Decide whether each statement is true. Justify the true one and give a counterexample for the false one.",
    "Converse: If all the angles of a quadrilateral are equal, then it is a square. The proposition is true, because all four angles of a square are 90°. The converse is false. A rectangle of sides 6 cm and 4 cm has all angles equal (90°) but is not a square.",
    ["Converse written correctly", "Proposition true with reason", "Counterexample: rectangle 6 by 4"], F.rectangle("All angles equal, not a square")),
  s("Show that the proposition \"If n is divisible by 60, then it is divisible by both 5 and 12\" is true, and that its converse is also true.",
    "Let n = 60k. Then n = 5 × 12k and n = 12 × 5k, so the proposition is true. Converse: if n is divisible by 5 and 12, then by 60. Let n = 12m. Since 5 divides 12m and 5 is a prime that does not divide 12, 5 divides m. Write m = 5t, so n = 60t. The converse is true, because 5 and 12 have no common factor other than 1.",
    ["Proposition proved", "Converse proved", "5 and 12 have no common factor"]),
  s("Find a counterexample to each claim. (i) 4n² + 1 is prime for every positive integer n. (ii) n² + n + 11 is prime for every positive integer n. (iii) 4ⁿ + 3 is prime for every positive integer n.",
    "(i) n = 4 gives 4 × 16 + 1 = 65 = 5 × 13. (ii) n = 10 gives 100 + 10 + 11 = 121 = 11 × 11. (iii) n = 4 gives 256 + 3 = 259 = 7 × 37. In each case the number is not prime, so the claim is false.",
    ["n = 4 for (i)", "n = 10 for (ii)", "n = 4 for (iii)"]),
  s("Prove that if two angles of a triangle are equal, then the sides opposite them are equal.",
    "Let ∠B = ∠C in △ABC. Draw the altitude AD, so ∠ADB = ∠ADC = 90°. In △ABD and △ACD, ∠B = ∠C, ∠ADB = ∠ADC and AD is common. So △ABD ≅ △ACD by AAS. Therefore AB = AC.",
    ["Altitude AD drawn", "Three conditions for AAS", "Conclusion AB = AC"], F.isoConverse("∠B = ∠C")),
  s("Is it enough to check divisibility by 2 and 4 to decide whether a number is divisible by 8? Give reasons.",
    "No. A number divisible by 8 is divisible by 2 and 4, but the converse is false. The number 12 is divisible by 2 and by 4 but not by 8. A check using two numbers works only when they have no common factor other than 1, and 2 and 4 share the factor 2.",
    ["Proposition true", "Converse false, counterexample 12", "2 and 4 share a factor"]),
  s("Prove that if a and b are perfect squares, then ab is a perfect square. Is the converse true? Give a reason.",
    "Let a = m² and b = k². Then ab = m²k² = (mk)², a perfect square. The converse is false. Take a = 2 and b = 8. Then ab = 16 = 4², a perfect square, but neither 2 nor 8 is a perfect square.",
    ["Proof with m and k", "Converse is false", "Counterexample 2 and 8"]),
  s("Check whether triangles with sides (a) 9 cm, 12 cm, 15 cm and (b) 6 cm, 7 cm, 10 cm are right-angled. Name the result you use.",
    "We use the converse of the Baudhāyana–Pythagoras theorem. (a) 9² + 12² = 81 + 144 = 225 = 15², so it is right-angled (right angle opposite 15 cm). (b) 6² + 7² = 36 + 49 = 85, but 10² = 100. They are not equal, so it is not right-angled.",
    ["Converse of the theorem named", "(a) right-angled with working", "(b) not right-angled with working"]),
  s("Write \"If-then\" sentences that connect \"a number is divisible by 3\" with \"the sum of its digits is a multiple of 3\". Is each sentence true?",
    "Sentence 1: If a number is divisible by 3, then the sum of its digits is a multiple of 3. Sentence 2: If the sum of the digits of a number is a multiple of 3, then the number is divisible by 3. Both are true. A number is the sum of its digits plus a multiple of 9 (for example 457 = 4 × 99 + 5 × 9 + 16), so the number and its digit sum are multiples of 3 together.",
    ["Sentence 1", "Sentence 2", "Both true with a reason"]),
  s("P: If two triangles have the same area, then they are congruent. Q: If two triangles are congruent, then they have the same area. Decide each statement.",
    "P is false. A right triangle with legs 6 and 4 and another with legs 8 and 3 both have area 12, but their hypotenuses are √52 and √73, so they are not congruent. Q is true: congruent triangles coincide, so their areas are equal.",
    ["P false with counterexample", "Q true with reason"], F.sameAreaTriangles("Same area, not congruent")),
  s("Write the converse of \"If n and n + 3 have no factors in common, then n is not a multiple of 3\". Decide whether each is true.",
    "Converse: If n is not a multiple of 3, then n and n + 3 have no factors in common. The proposition is true: if n = 3k then n + 3 = 3(k + 1), and 3 is common. The converse is true: a common factor of n and n + 3 divides (n + 3) − n = 3, so it is 1 or 3, and it is not 3 because n is not a multiple of 3.",
    ["Converse written", "Proposition justified", "Converse justified using the difference 3"]),
];
