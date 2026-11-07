import type { QuizQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import { graphSpec as G } from "./lin9Figs";

// Self Assessment: Class IX Maths, Two Variables, One Line. 50 multiple-choice questions in 40 minutes.
// 12 questions carry a figure, 8 are assertion and reasoning questions. The questions test understanding and
// reasoning from the chapter, not memory of the book's own examples.
// Each ordinary question is written with the right answer first and placed at the position in POSITION, so the
// right answers are spread evenly. Every figure is checked by scripts/check-lin9-figs.mts (no overlapping labels).

const POSITION = [1, 3, 0, 2, 2, 0, 3, 1, 3, 1, 2, 0, 0, 2, 1, 3, 1, 0, 3, 2, 2, 3, 0, 1, 0, 1, 2, 3, 3, 2, 1, 0, 2, 0, 1, 3, 1, 3, 2, 0, 0, 2];

const B = "#2563eb", O = "#ea580c";

// ── Figures ──
export const SELF_FIGS: Record<string, GeoSpec> = {
  slope: G({ x: [-4, 4], y: [-4, 4], lines: [{ p: [-2, -3], q: [2, 3] }], points: [{ at: [-2, -3], label: "(−2, −3)" }, { at: [2, 3], label: "(2, 3)" }] }, "A line through two marked points", 280, 250),
  equation: G({ x: [-4, 4], y: [-2, 6], lines: [{ p: [-2, 0], q: [0, 3] }], points: [{ at: [-2, 0], label: "(−2, 0)" }, { at: [0, 3], label: "(0, 3)" }] }, "The line meets the axes at (−2, 0) and (0, 3)", 280, 240),
  meet: G({ x: [-1, 5], y: [-3, 5], lines: [{ p: [0, 3], q: [3, 0], label: "x + y = 3", color: B, at: [0.4, 2.6] }, { p: [0, -3], q: [1.5, 0], label: "2x − y = 3", color: O, at: [3.6, 4.2] }], points: [{ at: [2, 1], hollow: true }] }, "Two lines drawn on the same axes", 300, 260),
  parallel: G({ x: [-1, 6], y: [-1, 9], lines: [{ p: [0, 4], q: [2, 0], label: "2x + y = 4", color: B, at: [0.6, 2.8] }, { p: [0, 8], q: [4, 0], label: "2x + y = 8", color: O, at: [1.2, 5.6] }] }, "Two lines drawn on the same axes", 300, 260),
  same: G({ x: [-1, 5], y: [-1, 5], lines: [{ p: [0, 3], q: [2, 0], label: "3x + 2y = 6", color: B, at: [0.6, 2.1] }], labels: [{ at: [1.6, 0.6], t: "6x + 4y = 12" }] }, "The graphs of 3x + 2y = 6 and 6x + 4y = 12", 300, 250),
  axes: G({ x: [-5, 3], y: [-1, 4], lines: [{ p: [-5, 2], q: [3, 2], label: "y = 2", color: B, at: [2, 2] }, { p: [-3, -1], q: [-3, 4], label: "x = −3", color: O, at: [-3, 3.4] }], points: [{ at: [-3, 2], hollow: true }] }, "A horizontal and a vertical line", 300, 240),
  rise: G({ x: [-1, 11], y: [-1, 8], lines: [{ p: [1, 1], q: [5, 4] }], segs: [{ from: [1, 1], to: [5, 1], dash: true, label: "4" }, { from: [5, 1], to: [5, 4], dash: true, label: "3" }], points: [{ at: [1, 1], label: "A(1, 1)" }, { at: [5, 4], label: "B(5, 4)" }] }, "The line AB continues in the same direction", 320, 250),
  intercepts: G({ x: [-4, 6], y: [-4, 2], lines: [{ p: [4, 0], q: [0, -2] }], points: [{ at: [4, 0], label: "(4, 0)" }, { at: [0, -2], label: "(0, −2)" }] }, "A line with x-intercept 4 and y-intercept −2", 320, 230),
  twolines: G({ x: [-1, 7], y: [-1, 7], lines: [{ p: [0, 1], q: [2, 3], label: "y = x + 1", color: B, at: [5.4, 6.4] }, { p: [0, 5], q: [2, 3], label: "y = −x + 5", color: O, at: [4.4, 0.6] }], points: [{ at: [2, 3], hollow: true }] }, "Two lines meet at one point", 300, 260),
  plans: G({ x: [0, 400], y: [0, 150], unit: 100, unitY: 50, lines: [{ p: [0, 50], q: [200, 90], label: "Plan A", color: B, at: [330, 116] }, { p: [0, 30], q: [200, 90], label: "Plan B", color: O, at: [330, 129] }], points: [{ at: [200, 90], label: "(200, 90)" }] }, "Cost in rupees (y) for m minutes of calls (x)", 330, 260),
  origin: G({ x: [-4, 4], y: [-3, 3], lines: [{ p: [-3, 2], q: [3, -2] }], points: [{ at: [-3, 2], label: "(−3, 2)" }, { at: [3, -2], label: "(3, −2)" }] }, "A line through the origin", 280, 230),
};
export const SELF_RAMPS: GeoSpec = {
  noMain: true, w: 320, h: 160, scale: 24,
  pts: { _AL: [-6.2, -2.2], _AR: [-1.2, -2.2], _AT: [-1.2, 0.8], _BL: [1, -2.2], _BR: [8, -2.2], _BT: [8, 1.8] },
  polys: [{ p: ["_AL", "_AR", "_AT"] }, { p: ["_BL", "_BR", "_BT"] }],
  segs: [
    { p: ["_AL", "_AR"], bold: true, label: "5 m" }, { p: ["_AR", "_AT"], bold: true, label: "3 m" }, { p: ["_AT", "_AL"], bold: true },
    { p: ["_BL", "_BR"], bold: true, label: "7 m" }, { p: ["_BR", "_BT"], bold: true, label: "4 m" }, { p: ["_BT", "_BL"], bold: true },
  ],
  rights: [["_AL", "_AR", "_AT"], ["_BL", "_BR", "_BT"]],
  labels: [{ x: -4, y: 0.9, t: "Ramp 1" }, { x: 4.5, y: 2.2, t: "Ramp 2" }],
  caption: "Two ramps drawn as right triangles",
};

let n = 0;
const q = (question: string, right: string, wrong: string[], explanation: string, figure?: GeoSpec): QuizQuestion => {
  const at = POSITION[n];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { id: ++n, question, options, correctAnswer: at, explanation, figure };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
const ar = (question: string, correct: number, explanation: string): QuizQuestion => ({ id: ++n, question, options: AR, correctAnswer: correct, explanation });

export const LIN9_SELF_ASSESSMENT: QuizQuestion[] = [
  // ── Equations, standard form and solutions ──
  q("Which of these is NOT a linear equation in two variables?", "2xy + 3 = 0", ["7 + 4x = 0", "y = 5", "x ÷ 2 − y = 4"],
    "In 2xy + 3 = 0 the variables are multiplied together, so it is not of the form ax + by + c = 0. The other three are linear: 7 + 4x = 0 is 4x + 0y + 7 = 0 and y = 5 is 0x + y − 5 = 0."),
  q("For 3x − 2y = 8 written as ax + by + c = 0, the value of a + b + c is", "−7", ["3", "13", "−13"],
    "3x − 2y − 8 = 0, so a = 3, b = −2 and c = −8. The sum is 3 − 2 − 8 = −7."),
  q("The pair (x, y) = (3k, k) satisfies 2x + y = 14. Then x equals", "6", ["2", "4", "14"],
    "6k + k = 14, so k = 2. Then x = 3k = 6 (and y = 2)."),
  q("If (−2, 5) is a solution of ax + 2y = 4, then a equals", "3", ["−3", "7", "2"],
    "−2a + 10 = 4, so −2a = −6 and a = 3."),
  q("How many solutions of 2x + 3y = 6 have x = y?", "Exactly one", ["None", "Exactly two", "Infinitely many"],
    "Putting y = x gives 5x = 6, so x = 6 ÷ 5. There is exactly one such solution, (6÷5, 6÷5). A line meets the line y = x only once."),
  // ── Intercepts and the graph ──
  q("The x-intercept and the y-intercept of 3x − 4y = 24 are", "8 and −6", ["−8 and 6", "6 and −8", "24 and −24"],
    "y = 0 gives 3x = 24, so x = 8. x = 0 gives −4y = 24, so y = −6."),
  q("The line px + 2y = 8 passes through (2, 1). Then p equals", "3", ["2", "4", "−3"],
    "2p + 2 = 8, so 2p = 6 and p = 3."),
  // ── Slope ──
  q("The line through (a, 3) and (4, 7) has slope 2. Then a equals", "2", ["6", "−2", "4"],
    "(7 − 3) ÷ (4 − a) = 2, so 4 − a = 2 and a = 2."),
  q("The slope of the line 5x − 2y = 10 is", "5 ÷ 2", ["−5 ÷ 2", "2 ÷ 5", "5"],
    "−2y = −5x + 10 gives y = (5÷2)x − 5. The slope is 5÷2. By the rule m = −a ÷ b = −5 ÷ (−2) = 5÷2."),
  q("The line parallel to y = 4x − 1 that cuts the y-axis at (0, 3) is", "y = 4x + 3", ["y = 4x − 1", "y = −4x + 3", "y = 3x + 4"],
    "Parallel lines have the same slope 4. With y-intercept 3 the equation is y = 4x + 3."),
  q("Which line is numerically the steepest?", "y = −3x + 5", ["y = 2x + 1", "y = x − 7", "y = 0.5x"],
    "Steepness depends on the size of the slope, not on its sign. The slopes are 2, −3, 1 and 0.5, and |−3| = 3 is the largest."),
  q("The x-intercept of y = −2x + 8 is", "4", ["8", "−4", "2"],
    "Put y = 0: 0 = −2x + 8, so x = 4."),
  // ── Pairs of equations ──
  q("The pair 3x + 2y = 6 and 9x + 6y = 18 represents", "coincident lines", ["parallel lines", "intersecting lines", "perpendicular lines"],
    "3÷9 = 2÷6 = 6÷18 = ⅓. All three ratios are equal, so the lines coincide."),
  q("The pair kx + 3y = 6 and 4x + 6y = 12 has infinitely many solutions when k equals", "2", ["1", "4", "12"],
    "We need k ÷ 4 = 3 ÷ 6 = 6 ÷ 12 = ½. So k = 2."),
  q("The pair 2x − ky = 4 and 6x − 9y = 5 has no solution when k equals", "3", ["9", "6", "2"],
    "We need 2÷6 = k÷9, so k = 3. Then 4÷5 is not equal to ⅓, so the lines are parallel."),
  q("The pair kx + 2y = 7 and 3x + 6y = 5 has a unique solution for every k except", "1", ["3", "2", "7"],
    "A unique solution needs k ÷ 3 ≠ 2 ÷ 6 = ⅓, that is k ≠ 1."),
  q("Which pair of equations has no solution?", "x + y = 3 and 2x + 2y = 7", ["x + y = 3 and 2x + 2y = 6", "x + y = 3 and x − y = 7", "x + y = 3 and 2x − y = 0"],
    "In x + y = 3 and 2x + 2y = 7, 1÷2 = 1÷2 ≠ 3÷7, so the lines are parallel. The pair with 2x + 2y = 6 has all three ratios equal (infinitely many solutions), and in the other two pairs the ratios of a and b are different (one solution each)."),
  q("Solving y = 2x − 1 and 3x + 2y = 12 gives x + y equal to", "5", ["3", "4", "7"],
    "Substitute: 3x + 2(2x − 1) = 12, so 7x = 14, x = 2 and y = 3. So x + y = 5."),
  q("Solving 4x + 3y = 11 and 2x − y = 3, the value of y is", "1", ["2", "3", "−1"],
    "Multiply the second equation by 3: 6x − 3y = 9. Add to the first: 10x = 20, so x = 2. Then y = 2(2) − 3 = 1."),
  q("If x + y = 7 and x − y = 3, then x² − y² equals", "21", ["10", "4", "49"],
    "x² − y² = (x + y)(x − y) = 7 × 3 = 21. (Also x = 5 and y = 2, and 25 − 4 = 21.)"),
  q("If 2x + 3y = 12 and 3x + 2y = 13, then x + y equals", "5", ["4", "6", "25"],
    "Adding the two equations gives 5x + 5y = 25, so x + y = 5. (The solution is x = 3, y = 2.)"),
  // ── Word problems ──
  q("The sum of two numbers is 90 and one is 20 more than the other. The smaller number is", "35", ["55", "45", "20"],
    "x + y = 90 and x − y = 20. Adding: 2x = 110, x = 55. So y = 35."),
  q("The digits of a two-digit number add up to 11. The number is 27 more than the number formed by reversing the digits. The number is", "74", ["83", "65", "92"],
    "x + y = 11 and 9(x − y) = 27 gives x − y = 3. So x = 7 and y = 4. The number is 74 (and 74 − 47 = 27)."),
  q("A mother is three times as old as her daughter. Five years ago she was four times as old. The mother's present age is", "45 years", ["36 years", "42 years", "60 years"],
    "M = 3D and M − 5 = 4(D − 5). So 3D − 5 = 4D − 20 and D = 15. M = 45."),
  q("The numerator of a fraction is 4 less than its denominator. If 3 is added to both, the fraction becomes 3 ÷ 5. The fraction is", "3 ÷ 7", ["1 ÷ 5", "5 ÷ 9", "4 ÷ 8"],
    "n = d − 4 and (n + 3) ÷ (d + 3) = 3 ÷ 5. So 5(d − 1) = 3(d + 3), 5d − 5 = 3d + 9, d = 7 and n = 3. Check: 6 ÷ 10 = 3 ÷ 5."),
  q("A bag has ₹5 and ₹10 coins, 40 coins worth ₹260 in all. The number of ₹10 coins is", "12", ["28", "20", "8"],
    "x + y = 40 and 5x + 10y = 260, that is x + 2y = 52. Subtract: y = 12. So there are 12 ten-rupee coins and 28 five-rupee coins."),
  q("The length of a rectangle is 3 m more than twice its breadth and its perimeter is 36 m. Its length is", "13 m", ["5 m", "15 m", "11 m"],
    "l = 2b + 3 and l + b = 18. So 3b + 3 = 18, b = 5 and l = 13."),
  q("A taxi ride of 8 km costs ₹100 and a ride of 12 km costs ₹140. The charge per km is", "₹10", ["₹12.50", "₹20", "₹8"],
    "Subtract: 4 km cost ₹40 more, so the rate is ₹10 per km. (The fixed charge is 100 − 80 = ₹20.)"),
  q("4 pens and 3 pencils cost ₹31 and 3 pens and 4 pencils cost ₹25. The cost of one pen is", "₹7", ["₹5", "₹6", "₹1"],
    "Adding: 7(p + q) = 56, so p + q = 8. Subtracting: p − q = 6. So p = 7 and q = 1."),
  q("A boat goes 24 km downstream in 3 hours and 18 km upstream in 3 hours. Its speed in still water (in km per hour) is", "7", ["8", "6", "1"],
    "Downstream speed 8 = b + s and upstream speed 6 = b − s. So b = 7 and s = 1."),

  // ── With figures ──
  q("The line in the figure passes through (−2, −3) and (2, 3). Its slope is", "3 ÷ 2", ["2 ÷ 3", "1", "3"],
    "Slope = (3 − (−3)) ÷ (2 − (−2)) = 6 ÷ 4 = 3 ÷ 2.", SELF_FIGS.slope),
  q("The line in the figure meets the axes at (−2, 0) and (0, 3). Its equation is", "y = (3 ÷ 2)x + 3", ["y = (2 ÷ 3)x + 3", "y = −(3 ÷ 2)x + 3", "y = (3 ÷ 2)x − 2"],
    "The y-intercept is 3 and the slope is (3 − 0) ÷ (0 − (−2)) = 3 ÷ 2. So y = (3÷2)x + 3. Check: at x = −2, y = −3 + 3 = 0.", SELF_FIGS.equation),
  q("The graphs of x + y = 3 and 2x − y = 3 are shown. The solution of the pair is", "x = 2, y = 1", ["x = 1, y = 2", "x = 3, y = 0", "x = 0, y = 3"],
    "The lines cross at (2, 1). Check: 2 + 1 = 3 and 4 − 1 = 3.", SELF_FIGS.meet),
  q("The pair of equations whose graphs are shown has", "no solution", ["one solution", "two solutions", "infinitely many solutions"],
    "Both lines have slope −2 and different intercepts (4 and 8). They are parallel, so the pair has no solution.", SELF_FIGS.parallel),
  q("The two equations in the figure have the graph of one line. The pair has", "infinitely many solutions", ["exactly one solution", "no solution", "exactly two solutions"],
    "6x + 4y = 12 is twice 3x + 2y = 6, so the lines coincide and every point of the line is a solution.", SELF_FIGS.same),
  q("A horizontal line y = 2 and a vertical line x = −3 are shown. They meet at the point", "(−3, 2)", ["(2, −3)", "(−3, −3)", "(2, 2)"],
    "The point must have y = 2 and x = −3, so it is (−3, 2). The order of the coordinates is (x, y).", SELF_FIGS.axes),
  q("A line passes through A(1, 1) and B(5, 4). If the line is extended, the y-coordinate of its point with x = 9 is", "7", ["8", "6", "10"],
    "Slope = rise ÷ run = 3 ÷ 4. From B, a run of 4 gives a rise of 3, so at x = 9, y = 4 + 3 = 7.", SELF_FIGS.rise),
  q("The line in the figure meets the axes at (4, 0) and (0, −2). Which of these points is also on the line?", "(−2, −3)", ["(2, 1)", "(6, −2)", "(0, 2)"],
    "The line is x − 2y = 4. For (−2, −3): −2 + 6 = 4. For (2, 1): 0. For (6, −2): 10. For (0, 2): −4.", SELF_FIGS.intercepts),
  q("The two ramps in the figure rise 3 m over a run of 5 m and 4 m over a run of 7 m. Which statement is correct?", "Ramp 1 is steeper than Ramp 2", ["Ramp 2 is steeper than Ramp 1", "Both ramps are equally steep", "The steeper ramp is the one with the larger rise"],
    "Slope of Ramp 1 = 3 ÷ 5 = 0.6. Slope of Ramp 2 = 4 ÷ 7 ≈ 0.571. The smaller one is Ramp 2, so Ramp 1 is steeper, although its rise is smaller.", SELF_RAMPS),
  q("The lines y = x + 1 and y = −x + 5 are shown. At their point of intersection x + y equals", "5", ["3", "4", "6"],
    "The lines meet at (2, 3) and 2 + 3 = 5. (Adding the equations gives 2y = 6 and x + y = 5.)", SELF_FIGS.twolines),
  q("The graph shows the cost (in rupees) of two phone plans against the minutes of calls. For 300 minutes of calls", "Plan A is cheaper", ["Plan B is cheaper", "both cost the same", "the lines do not tell us"],
    "The lines cross at 200 minutes (₹90). After that, the line with the smaller slope, Plan A, stays lower. At 300 minutes Plan A costs 50 + 60 = ₹110 and Plan B costs 30 + 90 = ₹120.", SELF_FIGS.plans),
  q("The line in the figure passes through (−3, 2), the origin and (3, −2). Its equation is", "2x + 3y = 0", ["3x + 2y = 0", "2x − 3y = 0", "2x + 3y = 6"],
    "The line passes through the origin, so c = 0. The slope is (−2 − 2) ÷ (3 − (−3)) = −2 ÷ 3, so y = −(2÷3)x, that is 2x + 3y = 0.", SELF_FIGS.origin),

  // ── Assertion and reasoning ──
  ar("Assertion (A): The line y = 2x + 3 and the line y = 2x − 1 have no common point.\nReason (R): Two different lines with the same slope never meet.", 0,
    "Both are true. If they met, 2x + 3 = 2x − 1 would give 3 = −1, which is false. R explains A."),
  ar("Assertion (A): The pair x + y = 5 and x − y = 1 has exactly one solution.\nReason (R): For this pair a₁÷a₂ = 1 and b₁÷b₂ = −1, so a₁÷a₂ ≠ b₁÷b₂.", 0,
    "Both are true. The ratios are different, so the lines intersect at one point (3, 2). R is the condition that gives the unique solution."),
  ar("Assertion (A): The line 2x + 3y = 12 passes through (3, 2).\nReason (R): The point (0, 4) lies on the line 2x + 3y = 12.", 1,
    "Both are true: 6 + 6 = 12 and 0 + 12 = 12. But the fact that (0, 4) is on the line does not explain why (3, 2) is on it."),
  ar("Assertion (A): The graph of 3x − 2y = 6 meets the y-axis at (0, −3).\nReason (R): The slope of the line 3x − 2y = 6 is 3 ÷ 2.", 1,
    "Both are true. x = 0 gives −2y = 6 and y = −3. The slope is −a ÷ b = 3÷2. But the slope does not tell us where the line meets the y-axis."),
  ar("Assertion (A): The line through (1, 1) and (3, 5) has slope 2.\nReason (R): The slope is (x₂ − x₁) ÷ (y₂ − y₁).", 2,
    "A is true: (5 − 1) ÷ (3 − 1) = 2. R is false: the slope is (y₂ − y₁) ÷ (x₂ − x₁), rise over run, and not run over rise."),
  ar("Assertion (A): x = 5 is a linear equation in two variables.\nReason (R): x = 5 cannot be written in the form ax + by + c = 0.", 2,
    "A is true, because x = 5 is x + 0y − 5 = 0. R is false: it can be written in that form, with b = 0."),
  ar("Assertion (A): The line y = 4 is vertical.\nReason (R): The slope of a horizontal line is 0.", 3,
    "A is false: y = 4 is a horizontal line, parallel to the x-axis. R is true, and in fact it describes y = 4."),
  ar("Assertion (A): The pair 2x + 3y = 7 and 4x + 6y = 14 has no solution.\nReason (R): For this pair a₁÷a₂ = b₁÷b₂ = c₁÷c₂.", 3,
    "A is false. The second equation is twice the first, so the lines coincide and there are infinitely many solutions. R is true."),
];
