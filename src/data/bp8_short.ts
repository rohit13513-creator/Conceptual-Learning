import type { ShortQuestion } from "../types-custom";
import { u } from "./bp8Util";

// Class VIII Maths, The Baudhāyana-Pythagoras Theorem: 40 two-mark questions and 20 three-mark questions, in order of difficulty (easiest first).
// A two-mark answer has two steps of one mark each; a three-mark answer has three steps (1 + 1 + 1), as in CBSE marking.

let a = 0;
const v = (question: string, answer: string, keyPoints: string[], diagram?: string): ShortQuestion => ({ id: ++a, question: u(question), answer: u(answer), keyPoints: keyPoints.map(u), diagram });
let b = 0;
const s = (question: string, answer: string, keyPoints: string[], diagram?: string): ShortQuestion => ({ id: ++b, question: u(question), answer: u(answer), keyPoints: keyPoints.map(u), diagram });

export const BP8_VERY_SHORT: ShortQuestion[] = [
  // ── level 1 ──
  v("State the Baudhāyana-Pythagoras theorem.", "If a right-angled triangle has sides a, b and hypotenuse c, then a^2 + b^2 = c^2, that is, the square on the hypotenuse equals the sum of the squares on the other two sides.", ["Condition: right triangle with hypotenuse c", "a^2 + b^2 = c^2"], "bp_345"),
  v("What is a hypotenuse? Which is the longest side of a right triangle?", "The side opposite the right angle is the hypotenuse. It is the longest side of a right triangle.", ["Side opposite the right angle", "It is the longest side"]),
  v("What did Baudhāyana say about making a square of double area?", "The diagonal of a square produces a square of double the area of the original square.", ["Use the diagonal of the square", "The new square has double the area"], "bp_double"),
  v("Will doubling the side of a square double its area? Explain with side 3.", "No. Area of side 3 is 9, but with side 6 it is 36, that is, 4 times.", ["No, with 9 and 36", "The area becomes 4 times"]),
  v("A square has area 18 cm^2. What is the area of the square on its diagonal?", "The square on the diagonal has double the area: 2 × 18 = 36 cm^2.", ["Double the area", "36 cm^2"]),
  v("Find the hypotenuse of a right triangle with legs 3 cm and 4 cm.", "c^2 = 3^2 + 4^2 = 25, so c = 5 cm.", ["c^2 = 25", "c = 5 cm"], "bp_345"),
  v("Find the hypotenuse of a right triangle with legs 5 cm and 12 cm.", "c^2 = 25 + 144 = 169, so c = 13 cm.", ["c^2 = 169", "c = 13 cm"]),
  v("The hypotenuse of a right triangle is 17 cm and one leg is 8 cm. Find the other leg.", "b^2 = 289 − 64 = 225, so b = 15 cm.", ["b^2 = 225", "b = 15 cm"]),
  v("Find the hypotenuse of an isosceles right triangle with equal sides 1.", "c^2 = 1 + 1 = 2, so c = √2.", ["c^2 = 2", "c = √2"], "bp_iso"),
  v("Between which two consecutive whole numbers does √18 lie? Why?", "4^2 = 16 and 5^2 = 25, and 18 lies between them, so 4 < √18 < 5.", ["16 < 18 < 25", "4 < √18 < 5"]),
  v("Write three Baudhāyana triples.", "(3, 4, 5), (5, 12, 13) and (8, 15, 17).", ["Two correct triples", "Three correct triples"]),
  v("What is a primitive Baudhāyana triple? Give one example.", "A triple whose numbers have no common factor greater than 1, for example (3, 4, 5).", ["Definition", "Example"]),
  v("Is (6, 8, 10) a primitive triple? Give the reason.", "No. 6, 8 and 10 have the common factor 2; it is a scaled version of (3, 4, 5).", ["Not primitive", "Common factor 2"], "bp_scaled"),
  v("Check whether (9, 40, 41) is a Baudhāyana triple.", "9^2 + 40^2 = 81 + 1600 = 1681 = 41^2. So it is a triple.", ["81 + 1600 = 1681", "Equal to 41^2, so a triple"]),
  v("Find the side of a square whose area is the sum of the areas of squares of sides 6 cm and 8 cm.", "Area = 36 + 64 = 100, so the side is 10 cm.", ["Sum of areas 100", "Side 10 cm"]),
  // ── level 2 ──
  v("Find the diagonal of a square of side 5 cm.", "d^2 = 25 + 25 = 50, so d = √50 = 5√2 ≈ 7.07 cm.", ["d^2 = 50", "d ≈ 7.07 cm"]),
  v("The diagonal of a square is 8 cm. Find its area.", "The square on the diagonal has area 64, double the square, so the area is 32 cm^2.", ["Square on diagonal 64", "Area 32 cm^2"]),
  v("The hypotenuse of an isosceles right triangle is √72. Find the equal sides.", "2a^2 = 72, so a^2 = 36 and a = 6.", ["2a^2 = 72", "a = 6"]),
  v("Find bounds with one decimal place for √32.", "5.6^2 = 31.36 and 5.7^2 = 32.49, so 5.6 < √32 < 5.7.", ["Two squares", "5.6 < √32 < 5.7"]),
  v("A ladder 13 m long reaches a wall with its foot 5 m away. Find the height reached.", "h^2 = 169 − 25 = 144, so h = 12 m.", ["h^2 = 144", "h = 12 m"], "bp_ladder"),
  v("A boy walks 9 m north and 12 m east. How far is he from the start?", "d^2 = 81 + 144 = 225, so d = 15 m.", ["d^2 = 225", "15 m"]),
  v("Find the diagonal of a rectangle 7 cm by 24 cm.", "d^2 = 49 + 576 = 625, so d = 25 cm.", ["d^2 = 625", "25 cm"]),
  v("Is a triangle with sides 6, 7, 9 right angled? Give the reason.", "6^2 + 7^2 = 85 but 9^2 = 81. As they are not equal, it is not right angled.", ["85 and 81 compared", "Not right angled"]),
  v("Find the height of an isosceles triangle with sides 13 cm, 13 cm and base 10 cm.", "The height bisects the base: h^2 = 169 − 25 = 144, so h = 12 cm.", ["Half base 5", "h = 12 cm"]),
  v("Find the side of a rhombus whose diagonals are 16 and 30.", "Half diagonals 8 and 15: side^2 = 64 + 225 = 289, side = 17.", ["Half diagonals 8 and 15", "Side 17"]),
  v("Why does the triple (ka, kb, kc) follow from (a, b, c)?", "(ka)^2 + (kb)^2 = k^2 (a^2 + b^2) = k^2 c^2 = (kc)^2.", ["Taking out k^2", "Equals (kc)^2"]),
  v("Using the odd square 25, write the Baudhāyana triple.", "2n − 1 = 25 gives n = 13; 12^2 + 5^2 = 13^2, so (5, 12, 13).", ["n = 13", "(5, 12, 13)"], "bp_odd"),
  v("State Fermat's Last Theorem. Who proved it?", "The equation x^n + y^n = z^n has no solution in natural numbers when n is greater than 2. Andrew Wiles proved it in 1994.", ["Statement", "Andrew Wiles, 1994"]),
  v("Why are squares of 3 times the area made with legs s and s√2?", "The square on the hypotenuse has area s^2 + 2s^2 = 3s^2.", ["Sum of squares", "3 s^2"]),
  v("A lotus stem is 1 unit above water and its tip touches the water 3 units away. Find the depth x.", "9 + x^2 = (x + 1)^2 gives 9 = 2x + 1, so x = 4.", ["Equation", "x = 4"], "bp_lotus"),
  // ── level 3 ──
  v("Find the area of an equilateral triangle of side 6.", "h^2 = 36 − 9 = 27. Area = 1/2 × 6 × √27 = 3√27 = 9√3.", ["h = √27", "Area 9√3"], "bp_equi"),
  v("Two poles 7 m and 15 m high are 15 m apart. Find the distance between their tops.", "Difference of heights 8: d^2 = 225 + 64 = 289, d = 17 m.", ["Vertical gap 8 m", "17 m"], "bp_poles"),
  v("Can a square of area 13 be drawn on a dot grid? Explain.", "Yes, 13 = 2^2 + 3^2, so a tilted square going 2 across and 3 up has area 13.", ["13 = 4 + 9", "Yes, such a square exists"], "bp_grid"),
  v("Squares of sides 7 and 24 are combined into one square. Find the perimeter of the new square.", "Side = √(49 + 576) = 25. Perimeter = 100.", ["Side 25", "Perimeter 100"]),
  v("A right triangle has legs 6 and 8. Find the altitude to the hypotenuse.", "c = 10. Area = 24 = half of 10 × h, so h = 4.8.", ["c = 10", "h = 4.8"]),
  v("Is a triangle with sides 8, 9, 13 right angled? Why?", "13^2 = 169 and 8^2 + 9^2 = 145. They are not equal, so it is not right angled.", ["169 and 145", "Not right angled"]),
  v("Find the longest rod that can be placed in a box 2 m by 3 m by 6 m.", "d^2 = 4 + 9 + 36 = 49, so d = 7 m.", ["d^2 = 49", "7 m"], "bp_cuboid"),
  v("Find the distance between the points (2, 3) and (8, 11).", "d^2 = 36 + 64 = 100, so d = 10.", ["Differences 6 and 8", "10"]),
  v("In a Baudhāyana triple made from the odd square 81, find the three sides.", "n = 41: 40^2 + 9^2 = 41^2, so (9, 40, 41).", ["n = 41", "(9, 40, 41)"]),
  v("How will you construct a square whose area equals the difference of the squares of sides 5 and 7?", "Draw 5 units, a perpendicular at one end, and cut it with an arc of radius 7 from the other end. The cut length is √24, and the square on it has area 24.", ["Right triangle with leg 5, hypotenuse 7", "Square of side √24"], "bp_diff"),
];

export const BP8_SHORT: ShortQuestion[] = [
  // ── level 1 ──
  s("Explain why the square on the diagonal of a square has double its area.", "The diagonal cuts the original square into 2 triangles. Horizontal and vertical lines cut the square on the diagonal into 4 triangles. All the triangles are congruent, so the new square has twice the area.", ["Original square = 2 triangles: 1 mark", "New square = 4 congruent triangles: 1 mark", "So double the area: 1 mark"], "bp_double"),
  s("How do you get a square of half the area by paper folding? Why is it half?", "Fold the four corners to the centre through the midpoints of the sides. The figure PQRS is a square. Of the 8 triangles of the paper it keeps 4, so it is half.", ["Folding through the midpoints: 1 mark", "PQRS is a square: 1 mark", "4 of 8 triangles, so half: 1 mark"], "bp_fold"),
  s("Find the hypotenuse of an isosceles right triangle with equal sides 12, and bounds with whole numbers.", "c^2 = 2 × 144 = 288, c = √288. 16^2 = 256 and 17^2 = 289, so 16 < √288 < 17.", ["c^2 = 288: 1 mark", "c = √288: 1 mark", "Between 16 and 17: 1 mark"]),
  s("Show that √2 lies between 1.41 and 1.42.", "1.41^2 = 1.9881, which is less than 2. 1.42^2 = 2.0164, which is more than 2. So 1.41 < √2 < 1.42.", ["1.41^2 = 1.9881: 1 mark", "1.42^2 = 2.0164: 1 mark", "Conclusion: 1 mark"], "bp_root2"),
  s("A right triangle has legs 9 cm and 12 cm. Find the hypotenuse and the perimeter.", "c^2 = 81 + 144 = 225, c = 15 cm. Perimeter = 9 + 12 + 15 = 36 cm.", ["c^2 = 225: 1 mark", "c = 15 cm: 1 mark", "Perimeter 36 cm: 1 mark"]),
  s("A 25 m wire is tied from the top of a pole to a point on the ground 7 m from its foot. Find the height of the pole and the area of the triangle formed.", "h^2 = 625 − 49 = 576, h = 24 m. Area = 1/2 × 7 × 24 = 84 m^2.", ["h^2 = 576: 1 mark", "h = 24 m: 1 mark", "Area 84 m^2: 1 mark"]),
  s("Prove that if (a, b, c) is a Baudhāyana triple, so is (ka, kb, kc).", "Given a^2 + b^2 = c^2. (ka)^2 + (kb)^2 = k^2 a^2 + k^2 b^2 = k^2 (a^2 + b^2) = k^2 c^2 = (kc)^2.", ["Squaring the scaled sides: 1 mark", "Taking k^2 common: 1 mark", "Using a^2 + b^2 = c^2 to get (kc)^2: 1 mark"]),
  // ── level 2 ──
  s("The sides of a triangle are 20 cm, 21 cm and 29 cm. Show that it is right angled and find its area.", "20^2 + 21^2 = 400 + 441 = 841 = 29^2, so it is right angled. Area = 1/2 × 20 × 21 = 210 cm^2.", ["400 + 441 = 841: 1 mark", "Equals 29^2, so right angled: 1 mark", "Area 210 cm^2: 1 mark"]),
  s("Find the side and the perimeter of a rhombus whose diagonals are 24 cm and 70 cm.", "Half diagonals 12 and 35. Side^2 = 144 + 1225 = 1369, side 37 cm. Perimeter 148 cm.", ["Half diagonals: 1 mark", "Side 37 cm: 1 mark", "Perimeter 148 cm: 1 mark"], "bp_rhombus"),
  s("Solve the lotus problem: a lotus tip is 1 unit above the water; blown aside it touches the water 3 units away. Find the depth.", "Let the depth be x, the stem is x + 1. 3^2 + x^2 = (x + 1)^2, so 9 = 2x + 1 and x = 4.", ["Forming the equation: 1 mark", "Expanding and simplifying: 1 mark", "x = 4 units: 1 mark"], "bp_lotus"),
  s("An isosceles triangle has equal sides 25 cm and base 14 cm. Find its height and area.", "The height bisects the base: h^2 = 625 − 49 = 576, h = 24 cm. Area = 1/2 × 14 × 24 = 168 cm^2.", ["Half base 7: 1 mark", "h = 24 cm: 1 mark", "Area 168 cm^2: 1 mark"]),
  s("Find the area of a rectangle whose diagonal is 26 cm and one side is 10 cm.", "Other side^2 = 676 − 100 = 576, side = 24 cm. Area = 10 × 24 = 240 cm^2.", ["Other side^2 = 576: 1 mark", "24 cm: 1 mark", "Area 240 cm^2: 1 mark"]),
  s("Using the odd square method, find three triples with odd squares 49, 121 and 169.", "49: n = 25, (7, 24, 25). 121: n = 61, (11, 60, 61). 169: n = 85, (13, 84, 85).", ["First triple: 1 mark", "Second triple: 1 mark", "Third triple: 1 mark"], "bp_odd"),
  s("Describe the four triangle proof of the theorem.", "Place four copies of the right triangle in a square of side a + b; the middle is a square of side c. (a + b)^2 = 4 × (half of ab) + c^2. So a^2 + 2ab + b^2 = 2ab + c^2, giving a^2 + b^2 = c^2.", ["The figure with the inner square of side c: 1 mark", "Equation of areas: 1 mark", "Simplification to a^2 + b^2 = c^2: 1 mark"], "bp_four"),
  // ── level 3 ──
  s("A 25 m ladder rests with its foot 7 m from a wall. Its top slides down 4 m. How much farther from the wall does the foot go?", "Earlier height = √(625 − 49) = 24 m. New height 20 m; new distance √(625 − 400) = 15 m. The foot moves 15 − 7 = 8 m.", ["First height 24 m: 1 mark", "New distance 15 m: 1 mark", "Moved 8 m: 1 mark"]),
  s("A tree 18 m tall breaks and its top touches the ground 12 m from its foot. Find the height at which it broke.", "Let the standing part be x: x^2 + 144 = (18 − x)^2 = 324 − 36x + x^2. So 36x = 180, x = 5 m.", ["Equation: 1 mark", "36x = 180: 1 mark", "x = 5 m: 1 mark"]),
  s("Show that √2 cannot be written as a fraction m divided by n.", "If √2 = m ÷ n then 2n^2 = m^2. In m^2 the prime 2 appears an even number of times, but in 2n^2 an odd number of times. This is impossible, so √2 is not a fraction.", ["2n^2 = m^2: 1 mark", "Even number of 2s in m^2, odd in 2n^2: 1 mark", "Contradiction and conclusion: 1 mark"]),
  s("The legs of a right triangle are in the ratio 3 : 4 and its hypotenuse is 40 cm. Find the legs and the area.", "Legs 3k and 4k, hypotenuse 5k = 40, so k = 8. Legs 24 and 32 cm. Area = 1/2 × 24 × 32 = 384 cm^2.", ["Hypotenuse 5k: 1 mark", "Legs 24 and 32: 1 mark", "Area 384 cm^2: 1 mark"]),
  s("The perimeter of a right triangle is 30 cm and its hypotenuse is 13 cm. Find the legs.", "a + b = 17 and a^2 + b^2 = 169. 2ab = 17^2 − 169 = 120, ab = 60. The numbers with sum 17 and product 60 are 12 and 5.", ["a + b = 17: 1 mark", "ab = 60: 1 mark", "Legs 5 cm and 12 cm: 1 mark"]),
  s("A square of side 10 has a square inside it joining the midpoints, and this square again has one joining its midpoints. Find the area of the innermost square.", "Area of the given square 100. Midpoint square 50. Next midpoint square 25.", ["First midpoint square 50: 1 mark", "Second 25: 1 mark", "Using halving each time: 1 mark"], "bp_halve"),
];
