import type { QuizQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import * as F from "./lin9Figs";

// 50 multiple-choice questions: Class IX Maths, Two Variables, One Line.
// 38 ordinary questions (4 of them with a graph), then 12 assertion and reasoning questions.
// Each ordinary question is written with the right answer first; it is then placed at the position listed in POSITION
// so the right answers are spread evenly over the four options.

const POSITION = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 2, 0, 0, 2, 1, 3, 2, 3, 0, 1, 1, 0, 3, 2, 3, 2, 1, 0, 0, 1, 2, 3, 2, 0, 1, 3, 1, 3];

let n = 0;
const m = (question: string, right: string, wrong: string[], explanation: string, figure?: GeoSpec): QuizQuestion => {
  const at = POSITION[n];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { id: ++n, question, options, correctAnswer: at, explanation, figure };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
const ar = (question: string, correct: number, explanation: string): QuizQuestion => ({ id: ++n, question, options: AR, correctAnswer: correct, explanation });

export const LIN9_MCQS: QuizQuestion[] = [
  m("Which of the following is a linear equation in two variables?", "3x + 2y = 7", ["x² + y = 5", "xy = 6", "x + y² = 4"],
    "A linear equation can be written as ax + by + c = 0. In the other three the variables are squared or multiplied together."),
  m("The equation 5x = 3y − 2, written as ax + by + c = 0, has", "a = 5, b = −3, c = 2", ["a = 5, b = 3, c = −2", "a = 5, b = −3, c = −2", "a = −5, b = 3, c = 2"],
    "Move everything to the left: 5x − 3y + 2 = 0. So a = 5, b = −3 and c = 2. The other options change one of the signs."),
  m("For the equation 4 = 1.5x − 1.3y, the constant term c in the standard form 1.5x − 1.3y + c = 0 is", "−4", ["4", "1.5", "−1.3"],
    "Moving 4 to the right side gives 1.5x − 1.3y − 4 = 0, so c = −4."),
  m("In the equation 7 + 4x = 0, written as ax + by + c = 0, the value of b is", "0", ["7", "4", "−4"],
    "7 + 4x = 0 is 4x + 0 × y + 7 = 0. So a = 4, b = 0 and c = 7."),
  m("Which of these pairs is NOT a solution of 3x + 2y = 12?", "(4, 1)", ["(2, 3)", "(0, 6)", "(4, 0)"],
    "For (4, 1): 3(4) + 2(1) = 14, which is not 12. The other three pairs give 12."),
  m("If (k, 3) is a solution of 2x + 3y = 13, then k is", "2", ["4", "−2", "5"],
    "Put y = 3: 2k + 9 = 13, so 2k = 4 and k = 2."),
  m("A linear equation in two variables has", "infinitely many solutions", ["exactly one solution", "exactly two solutions", "no solution"],
    "Every value of x gives a value of y, and x can be chosen freely. So there are infinitely many solutions."),
  m("The y-intercept of the line 4x + 3y = 12 is", "4", ["3", "12", "−4"],
    "Put x = 0: 3y = 12, so y = 4. The line meets the y-axis at (0, 4)."),
  m("The line 2x + 5y = 0", "passes through the origin", ["is parallel to the x-axis", "is parallel to the y-axis", "has y-intercept 5"],
    "The constant is 0, so (0, 0) satisfies the equation and the line passes through the origin. It is not horizontal or vertical because both a and b are non-zero."),
  m("The graph of the equation x = 3 is a line that is", "parallel to the y-axis, 3 units to its right", ["parallel to the x-axis, 3 units above it", "passing through the origin", "parallel to the y-axis, 3 units to its left"],
    "Every point of x = 3 has x-coordinate 3, so the line is vertical, at a distance 3 to the right of the y-axis."),
  m("The slope of the line through (2, 0) and (4, 3) is", "3 ÷ 2", ["2 ÷ 3", "3", "−3 ÷ 2"],
    "Slope = (3 − 0) ÷ (4 − 2) = 3 ÷ 2."),
  m("The slope of the line through A(−4, 5) and B(−1, 2) is", "−1", ["1", "−3", "3"],
    "Slope = (2 − 5) ÷ (−1 − (−4)) = −3 ÷ 3 = −1. A line that goes down to the right has a negative slope."),
  m("For the line y = −5x + 3, the slope and the y-intercept are", "−5 and 3", ["5 and 3", "3 and −5", "−5 and −3"],
    "In y = mx + d, m is the slope and d is the y-intercept. Here m = −5 and d = 3."),
  m("The slope of the line 3x + 2y = 12 is", "−3 ÷ 2", ["3 ÷ 2", "2 ÷ 3", "−2 ÷ 3"],
    "y = −(3 ÷ 2)x + 6, so the slope is −3 ÷ 2. By the formula m = −a ÷ b = −3 ÷ 2."),
  m("The slope of a horizontal line is", "0", ["1", "undefined", "−1"],
    "On a horizontal line the rise is 0, so the slope is 0 ÷ run = 0."),
  m("The slope of the vertical line x = 2 is", "undefined", ["0", "2", "1"],
    "The run is 0 and division by 0 is not defined, so the slope is undefined."),
  m("A ramp rises 2.5 m over a run of 4 m. Its slope is", "5 ÷ 8", ["8 ÷ 5", "2.5", "4"],
    "Slope = 2.5 ÷ 4 = 25 ÷ 40 = 5 ÷ 8."),
  m("A ramp has a slope of 1 : 12. The horizontal length needed for a height of 18 cm is", "216 cm", ["30 cm", "18 cm", "1.5 cm"],
    "Run = rise × 12 = 18 × 12 = 216 cm."),
  m("The line through (1, 2) and (3, k) has slope 2. Then k equals", "6", ["4", "5", "8"],
    "(k − 2) ÷ (3 − 1) = 2, so k − 2 = 4 and k = 6."),
  m("A line has slope 3 and meets the y-axis at (0, −4). Its equation is", "y = 3x − 4", ["y = −4x + 3", "y = 3x + 4", "y = −3x − 4"],
    "In y = mx + d we put m = 3 and d = −4."),
  m("The lines y = 2x + 1 and y = 2x + 5 are", "parallel", ["intersecting at one point", "coincident", "perpendicular"],
    "They have the same slope 2 and different y-intercepts, so they never meet."),
  m("The pair 2x + 3y = 5 and 4x + 6y = 10 has", "infinitely many solutions", ["a unique solution", "no solution", "exactly two solutions"],
    "2 ÷ 4 = 3 ÷ 6 = 5 ÷ 10 = ½, so the lines coincide."),
  m("The pair x + 2y − 4 = 0 and 2x + 4y − 12 = 0 has", "no solution", ["a unique solution", "infinitely many solutions", "two solutions"],
    "1 ÷ 2 = 2 ÷ 4 = ½ but (−4) ÷ (−12) = 1 ÷ 3. The first two ratios are equal and the third is different, so the lines are parallel."),
  m("The solution of 3x − y = 2 and x + y = 2 is", "x = 1, y = 1", ["x = 2, y = 0", "x = 0, y = 2", "x = 1, y = −1"],
    "Add the equations: 4x = 4, so x = 1. Then y = 2 − 1 = 1. Check: 3 − 1 = 2."),
  m("Solving x + 2y = 3 and 7x − 15y = 2 by substitution, the value of y is", "19 ÷ 29", ["49 ÷ 29", "29 ÷ 19", "3 ÷ 2"],
    "x = 3 − 2y. Then 7(3 − 2y) − 15y = 2, so −29y = −19 and y = 19 ÷ 29."),
  m("The sum of two numbers is 25 and their difference is 11. The larger number is", "18", ["14", "7", "36"],
    "x + y = 25 and x − y = 11. Adding gives 2x = 36, so x = 18."),
  m("The difference of two numbers is 26 and one number is three times the other. The smaller number is", "13", ["26", "39", "9"],
    "Let the smaller be y. Then 3y − y = 26, so y = 13."),
  m("5 pencils and 7 pens cost ₹50, and 7 pencils and 5 pens cost ₹46. The cost of one pen is", "₹5", ["₹3", "₹4", "₹7"],
    "Adding: 12(p + q) = 96, so p + q = 8. Subtracting: 2(p − q) = −4, so p − q = −2. So p = 3 (pencil) and q = 5 (pen)."),
  m("A taxi charges a fixed fee plus a rate per km. For 10 km the fare is ₹155 and for 15 km it is ₹220. The fare for 20 km is", "₹285", ["₹250", "₹300", "₹275"],
    "Per km: (220 − 155) ÷ 5 = ₹13. Fixed: 155 − 130 = ₹25. For 20 km: 25 + 260 = ₹285."),
  m("The digits of a two-digit number add up to 9 and the number exceeds the number formed by reversing its digits by 27. The number is", "63", ["72", "54", "81"],
    "x + y = 9 and 9(x − y) = 27 gives x − y = 3. So x = 6 and y = 3. The number is 63 (and 63 − 36 = 27)."),
  m("A father is three times as old as his son. After 12 years he will be twice as old as his son. The father's present age is", "36 years", ["30 years", "42 years", "48 years"],
    "F = 3S and F + 12 = 2(S + 12). So 3S + 12 = 2S + 24, S = 12 and F = 36."),
  m("The pair 2x + 3y = 7 and 4x + ky = 14 has infinitely many solutions when k equals", "6", ["3", "7", "14"],
    "We need 2 ÷ 4 = 3 ÷ k = 7 ÷ 14, that is ½ = 3 ÷ k. So k = 6."),
  m("The pair kx + 2y = 3 and 4x + 8y = 9 has no solution when k equals", "1", ["2", "4", "8"],
    "We need k ÷ 4 = 2 ÷ 8 ≠ 3 ÷ 9. Then k ÷ 4 = ¼, so k = 1. And ¼ ≠ ⅓, so the lines are parallel."),
  m("Using F = (9 ÷ 5)C + 32, a temperature of 95 °F is equal to", "35 °C", ["30 °C", "40 °C", "63 °C"],
    "95 = (9 ÷ 5)C + 32 gives (9 ÷ 5)C = 63, so C = 35."),
  m("The graph shows the lines x + y = 10 and y = x + 4 for the boys (x) and girls (y) in a quiz team. The number of boys is", "3", ["7", "4", "10"],
    "The lines meet at (3, 7). So there are 3 boys and 7 girls.", F.gBoysGirls("Boys (x) and girls (y)")),
  m("The graph of the pair 2x + y − 6 = 0 and 4x − 2y − 4 = 0 is shown. The solution of the pair is", "x = 2, y = 2", ["x = 3, y = 0", "x = 0, y = 6", "x = 1, y = 0"],
    "The lines meet at the point (2, 2). Check: 4 + 2 − 6 = 0 and 8 − 4 − 4 = 0.", F.gQ4iii("Lines meet at one point")),
  m("The pair of lines in the figure (L1 and L2 are drawn on the same axes) has", "no solution", ["one solution", "two solutions", "infinitely many solutions"],
    "The two lines are parallel, so they have no common point and the pair has no solution.", F.gParallel("Two lines L1 and L2")),
  m("In the figure the two equations give one line (L1 and L2 lie on top of each other). The pair has", "infinitely many solutions", ["exactly one solution", "no solution", "exactly two solutions"],
    "Coincident lines share every point, so each point of the line is a solution.", F.gCoincident("Two lines on top of each other")),

  // ── Assertion and reasoning ──
  ar("Assertion (A): 3x = 5 is a linear equation in two variables.\nReason (R): 3x = 5 can be written as 3x + 0y − 5 = 0.", 0,
    "Both are true. Writing 3x − 5 = 0 as 3x + 0y − 5 = 0 shows that it has the form ax + by + c = 0 with b = 0. R explains A."),
  ar("Assertion (A): The line 2x + 3y = 0 passes through the origin.\nReason (R): When c = 0, the pair x = 0, y = 0 satisfies ax + by + c = 0.", 0,
    "Both are true. Putting x = 0 and y = 0 in 2x + 3y = 0 gives 0 = 0, so the origin is on the line. R is the reason."),
  ar("Assertion (A): The lines y = 3x + 1 and y = 3x − 5 are parallel.\nReason (R): Two lines with the same slope and different y-intercepts never meet.", 0,
    "Both are true. If they met at a point, 3x + 1 = 3x − 5 would hold, which is impossible. R explains A."),
  ar("Assertion (A): The slope of the line y = −5x + 3 is −5.\nReason (R): The line y = −5x + 3 cuts the y-axis at the point (0, 3).", 1,
    "Both are true. But the slope is read from the coefficient of x. The fact that the line cuts the y-axis at (0, 3) tells us the intercept, not the slope."),
  ar("Assertion (A): The point (2, 3) does not satisfy 3x − 7y = 21.\nReason (R): The point (7, 0) lies on the line 3x − 7y = 21.", 1,
    "Both are true. For (2, 3), 6 − 21 = −15, not 21. The point (7, 0) gives 21 = 21. But R does not explain why (2, 3) fails."),
  ar("Assertion (A): The graph of 2x + y = 7 meets the axes at (0, 7) and (3.5, 0).\nReason (R): The slope of the line 2x + y = 7 is −2.", 1,
    "Both are true. x = 0 gives y = 7 and y = 0 gives x = 3.5. The slope is −2. But the slope is not the reason for the intercepts."),
  ar("Assertion (A): The pair x + y = 4 and 2x + 2y = 8 has infinitely many solutions.\nReason (R): For this pair a₁÷a₂ = b₁÷b₂ ≠ c₁÷c₂.", 2,
    "A is true because 1÷2 = 1÷2 = 4÷8, so the lines coincide. R is false: the three ratios are all equal, so c₁÷c₂ is also ½."),
  ar("Assertion (A): A horizontal line has slope 0.\nReason (R): All points on a horizontal line have the same x-coordinate.", 2,
    "A is true: the rise is 0. R is false: all points on a horizontal line have the same y-coordinate. It is a vertical line whose points have the same x-coordinate."),
  ar("Assertion (A): The pair 3x + 2y = 12 and 2x − y = 1 has a unique solution.\nReason (R): For this pair a₁÷a₂ = b₁÷b₂.", 2,
    "A is true because 3÷2 ≠ 2÷(−1) (the solution is (2, 3)). R is false, since the two ratios are different."),
  ar("Assertion (A): A linear equation in two variables has exactly one solution.\nReason (R): For every value of x the equation gives one value of y.", 3,
    "A is false. As x can be chosen freely, there are infinitely many solutions. R is true, but it leads to infinitely many pairs, not one."),
  ar("Assertion (A): The slope of the line x = 2 is 0.\nReason (R): The line x = 2 is parallel to the y-axis.", 3,
    "A is false. A vertical line has an undefined slope (the run is 0). R is true."),
  ar("Assertion (A): The pair x − y = 10 and 10x − 10y = 101 has a solution.\nReason (R): Multiplying x − y = 10 by 10 gives 10x − 10y = 100, which contradicts the second equation.", 3,
    "A is false. The same expression 10x − 10y cannot be both 100 and 101, so the pair has no solution. R is true."),
];
