import type { LongQuestion, CompetencyQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import * as F from "./props9Figs";

// Class IX Maths, Propositions and their Converses: 5 five-mark questions and 5 competency-based (paragraph) questions.

let a = 0;
const L = (question: string, markingScheme: string[], answerParts: [string, string][], figure?: GeoSpec): LongQuestion => ({
  id: ++a, question, markingScheme, answerParts: answerParts.map(([part, text]) => ({ part, text })), figure,
});

export const PROPS9_LONG: LongQuestion[] = [
  L("State the converse of the Baudhāyana–Pythagoras theorem and prove it.",
    ["Statement of the converse: 1 mark", "Construction of the right triangle XYZ: 1 mark", "XY = c by the theorem: 1 mark", "SSS congruence: 1 mark", "Conclusion ∠C = 90°: 1 mark"],
    [["Converse", "Let a, b, c be the lengths of the sides of a triangle. If a² + b² = c², then the triangle is right-angled."],
     ["Given and to prove", "In △ABC, BC = a, CA = b, AB = c and a² + b² = c². To prove: ∠C = 90°."],
     ["Construction", "Construct a right triangle XYZ with ∠Z = 90°, YZ = a and XZ = b."],
     ["Using the theorem", "By the Baudhāyana–Pythagoras theorem in △XYZ, XY² = a² + b². But a² + b² = c², so XY² = c² and XY = c."],
     ["Congruence", "In △ABC and △XYZ: BC = YZ = a, CA = ZX = b and AB = XY = c. So △ABC ≅ △XYZ by the SSS criterion."],
     ["Conclusion", "Corresponding angles are equal, so ∠C = ∠Z = 90°. Hence △ABC is right-angled and the converse is true."]], F.pythTri("△ABC with a² + b² = c²")),
  L("Prove that a positive integer has an odd number of factors if and only if it is a perfect square.",
    ["Idea of factor-partner pairs: 1 mark", "Odd number of factors gives a repeated pair: 1 mark", "The repeated pair gives a perfect square: 1 mark", "Perfect square has only one repeated pair: 1 mark", "Total is odd, conclusion: 1 mark"],
    [["Factor pairs", "Every factor f of n has a partner n ÷ f, and the product of the two is n. For example, the pairs for 12 are (1, 12), (2, 6) and (3, 4)."],
     ["Odd number of factors gives a perfect square", "Suppose n has an odd number of factors. If every pair had two different numbers, the factors would go in twos and their number would be even. So some pair has the same number twice, say (f, f), and n = f × f is a perfect square."],
     ["Perfect square gives an odd number of factors", "Let n = f × f. Then (f, f) is a pair with a repeated number. There is no other such pair, because g × g = f × f gives g = f."],
     ["Counting", "All the other pairs have two different numbers and give 2 factors each, an even total. The pair (f, f) gives 1 factor. So the total is odd."],
     ["Conclusion", "n has an odd number of factors if and only if n is a perfect square. (The first argument proves only one direction, so the second argument is needed for the other.)"]]),
  L("In △ABC the bisectors of ∠B and ∠C meet at the incentre I. They are extended to meet AC at E and AB at F. Prove that if AB = AC, then IE = IF. Is the converse true? Justify your answer.",
    ["Proof that BE = CF: 2 marks", "IB = IC and IE = IF: 1 mark", "Converse is false: 1 mark", "Counterexample with working: 1 mark"],
    [["Equal angles", "AB = AC gives ∠B = ∠C. As BE and CF are bisectors, ∠ABE = ∠ACF = ∠IBC = ∠ICB = half of ∠B."],
     ["BE = CF", "In △ABE and △ACF: ∠A is common, AB = AC and ∠ABE = ∠ACF. So △ABE ≅ △ACF (ASA) and BE = CF."],
     ["IB = IC", "In △IBC, ∠IBC = ∠ICB, so IB = IC (converse of the isosceles triangle theorem)."],
     ["IE = IF", "IE = BE − IB = CF − IC = IF. So the proposition is true."],
     ["Converse is false", "Converse: if IE = IF, then AB = AC. Take ∠A = 60°, ∠B = 80°, ∠C = 40°. Then ∠BIC = 180° − (40° + 20°) = 120° = ∠EIF. In quadrilateral AFIE, ∠A + ∠EIF = 180°, so it is cyclic. the line from A to I bisects ∠A, so IF and IE subtend equal angles of 30° at A and IF = IE. But ∠B ≠ ∠C, so AB ≠ AC."]], F.incentre(50, 65, "Fig. 9.1")),
  L("Write the converse of each proposition and decide whether each statement is true. Justify the true statements and give a counterexample for each false statement. (a) If n is divisible by 24, then n is divisible by both 4 and 6. (b) If n is a product of two unequal prime numbers, then n has exactly 4 divisors.",
    ["Converse of (a) and (b): 1 mark", "(a) proposition true: 1 mark", "(a) converse false with counterexample: 1 mark", "(b) proposition true: 1 mark", "(b) converse false with counterexample: 1 mark"],
    [["(a) Converse", "If n is divisible by both 4 and 6, then n is divisible by 24."],
     ["(a) Proposition", "Let n = 24k. Then n = 4 × 6k and n = 6 × 4k, so it is divisible by 4 and by 6. True."],
     ["(a) Converse", "False. The number 12 is divisible by 4 and by 6 but not by 24. (4 and 6 have the common factor 2.)"],
     ["(b) Converse", "If n has exactly 4 divisors, then n is a product of two unequal prime numbers."],
     ["(b) Proposition", "Let n = p × q with unequal primes p and q. The divisors are 1, p, q and pq, exactly 4. True."],
     ["(b) Converse", "False. The number 8 has exactly 4 divisors (1, 2, 4, 8) but 8 = 2 × 2 × 2 is not a product of two unequal primes. (27 is another counterexample.)"]]),
  L("(a) Prove that x = y if and only if x³ = y³ for real numbers x and y. (b) Show that the statement \"if x² = y², then x = y\" is false. What does this tell us about squaring both sides of an equation?",
    ["Proposition x = y gives x³ = y³: 1 mark", "Converse using the factorisation: 2 marks", "Counterexample for squares: 1 mark", "Conclusion about squaring: 1 mark"],
    [["Proposition", "If x = y, then x × x × x = y × y × y, so x³ = y³."],
     ["Converse", "Let x³ = y³. Then (x − y)(x² + xy + y²) = 0. Now x² + xy + y² = ½(x² + y² + (x + y)²), which is zero only when x = y = 0. So either x − y = 0 or both are 0. In each case x = y."],
     ["Conclusion for cubes", "So x = y if and only if x³ = y³."],
     ["Squares", "If x = 3 and y = −3, then x² = 9 = y² but x ≠ y. So the converse is false."],
     ["Squaring an equation", "Squaring both sides is not a reversible step. It may bring in a value that does not satisfy the original equation, so every answer must be checked in the original equation."]]),
];

// ───────────────────────────── Competency-based paragraph questions (4 marks each) ─────────────────────────────

let c = 0;
type Sub = CompetencyQuestion["subQuestions"][number];
const mc = (question: string, options: string[], correctIndex: number, answer: string, explanation?: string): Sub => ({ question, options, correctIndex, answer, explanation });
const oq = (question: string, answer: string, explanation?: string): Sub => ({ question, answer, explanation });
const C = (caseTitle: string, caseDescription: string, subQuestions: Sub[], figure?: GeoSpec): CompetencyQuestion => ({ id: ++c, caseTitle, caseDescription, subQuestions, figure });

export const PROPS9_COMPETENCY: CompetencyQuestion[] = [
  C("The wet cricket pitch", "Before a match, the groundsman says: \"If it rained last night, then the pitch is wet.\" Everyone agrees with him. The coach touches the pitch, finds it wet and says: \"The pitch is wet, so it must have rained last night.\"",
    [mc("The coach's sentence, put in if-then form, is the ____ of the groundsman's statement.", ["converse", "original statement", "proof", "counterexample"], 0, "converse", "The groundsman says \"if it rained, then wet\". The coach says \"if wet, then it rained\". The two parts are exchanged."),
     oq("Is the coach's conclusion always correct? Give a reason.", "No. The pitch can be wet for another reason: the ground staff may have watered it, a pipe may have burst, or there may be heavy dew. So \"wet\" does not prove \"rained\".", "A true proposition can have a false converse."),
     oq("Write the coach's statement as \"if X then Y\" and name the condition and the conclusion.", "If the pitch is wet, then it rained last night. The condition (hypothesis) X is \"the pitch is wet\" and the conclusion Y is \"it rained last night\".")]),
  C("Meera's pattern", "Meera calculates 4n² + 1 for n = 1, 2 and 3 and gets 5, 17 and 37. All of them are prime numbers. She announces: \"The number 4n² + 1 is a prime number for every positive integer n.\"",
    [mc("What is needed to show that Meera's claim is true?", ["Three examples are enough", "Ten examples are enough", "A reason that works for every positive integer n", "Nothing, as the claim looks true"], 2, "A reason that works for every n.", "Examples never prove a proposition. A proof must work for all cases."),
     oq("Test the claim for n = 4. What do you find?", "For n = 4, 4n² + 1 = 4 × 16 + 1 = 65 = 5 × 13. It is not prime, so n = 4 is a counterexample and Meera's claim is false.", ""),
     oq("What does this tell us about checking a few examples?", "A few correct examples cannot prove a claim, but one counterexample is enough to disprove it. The same happened with Fermat's claim about 2²ⁿ + 1, which Euler disproved with n = 5.")]),
  C("The carpenter's rope", "A carpenter makes the corner of a room exactly square. He marks a rope into 12 equal parts, makes a loop and ties it so that the sides of a triangle are 3, 4 and 5 parts. When the rope is pulled tight, the angle between the sides of 3 and 4 parts is a right angle.",
    [mc("The method works because of", ["the converse of the Baudhāyana–Pythagoras theorem", "the isosceles triangle theorem", "the SAS criterion for congruence", "the corresponding angles axiom"], 0, "The converse of the Baudhāyana–Pythagoras theorem.", "3² + 4² = 9 + 16 = 25 = 5², so the triangle is right-angled."),
     oq("Another carpenter uses a rope with sides of 6, 8 and 10 parts. Will he get a right angle? Show your working.", "Yes. 6² + 8² = 36 + 64 = 100 = 10². By the converse of the theorem the triangle is right-angled, and the right angle is between the sides of 6 and 8 parts.", ""),
     oq("A third carpenter uses sides of 5, 6 and 7 parts. Does he get a right angle? Give a reason.", "No. 5² + 6² = 25 + 36 = 61, but 7² = 49. The two are not equal, so the triangle is not right-angled.", "")], F.pythTri("Sides a, b, c with a² + b² = c²")),
  C("Uniform numbers", "A school gives each student a number. Students whose number is divisible by 24 get a blue badge, and students whose number is divisible by 60 get a gold badge. To save time, Arun decides to check only divisibility by 4 and 6 for the blue badge. Bina checks only divisibility by 5 and 12 for the gold badge.",
    [mc("Which student has a shortcut that always works?", ["Arun only", "Bina only", "Both Arun and Bina", "Neither"], 1, "Bina only.", "5 and 12 have no common factor other than 1. 4 and 6 have the common factor 2."),
     oq("Show with a number that Arun's shortcut can fail.", "Take 12. It is divisible by 4 and by 6, so Arun would give a blue badge, but 12 is not divisible by 24. So the converse of \"divisible by 24 gives divisible by 4 and 6\" is false.", ""),
     oq("Why does Bina's shortcut work?", "If a number is divisible by 12, write it as 12m. Since 5 divides 12m and 5 is a prime that does not divide 12, 5 divides m. So m = 5t and the number is 60t. This works because 5 and 12 have no common factor other than 1.", "")]),
  C("Frames made from two sticks", "A craftsman makes quadrilateral frames by crossing two thin sticks as diagonals and joining the four ends. He knows this about his frames of type R: \"If a frame is of type R, then it has equal diagonals.\" His friend says: \"If a frame has equal diagonals, then it is of type R.\"",
    [mc("Using only the craftsman's knowledge, to make a frame of type R he should use sticks that are", ["of equal length", "of different lengths", "always perpendicular", "of length 10 cm each"], 0, "Of equal length.", "Frames of type R have equal diagonals, and the sticks are the diagonals."),
     oq("Suppose the friend is right. He crosses two equal sticks in some way and joins the ends. What can he say about the frame?", "The frame is of type R, however the equal sticks are crossed, because every quadrilateral with equal diagonals is of type R.", ""),
     oq("Take type R to be \"rectangle\". Is the friend's statement true? Give a frame to support your answer.", "No. Equal sticks that cross away from their midpoints give a quadrilateral with equal diagonals that is not a rectangle, for example an isosceles trapezium. So the friend's statement, the converse of the craftsman's, is false for rectangles.", "A proposition can be true while its converse is false.")], F.sticks("Two sticks as the diagonals")),
];
