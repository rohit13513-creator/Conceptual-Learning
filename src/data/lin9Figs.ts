import type { GeoSpec } from "../components/GeoFigure";
import type { GraphData } from "../components/graphLayout";

// Figures for Class IX Maths (Ganita Manjari, Part II), Two Variables, One Line.
// A graph is drawn from plain data (see components/graphLayout.ts): gridded axes, straight lines and labelled points.
// The few shapes (hills, ramp, cyclic quadrilateral) use the ordinary figure engine.

const G = (graph: GraphData, caption?: string, w = 320, h = 280): GeoSpec => ({ pts: {}, noMain: true, graph, caption, w, h });

const B = "#2563eb", O = "#ea580c", GR = "#15803d", R = "#be123c";

// ── Section 13.2: solutions and their graph ──────────────────────────────────────────────────
/** 3x + 2y = 12 with some of its solutions. */
export const g3x2y12 = (cap?: string) => G({ x: [-2, 6], y: [-1, 9], lines: [{ p: [0, 6], q: [4, 0], label: "3x + 2y = 12", at: [3.2, 1.2] }], points: [{ at: [-1, 7.5], label: "A(−1, 7.5)" }, { at: [0, 6], label: "B(0, 6)" }, { at: [1, 4.5], label: "C(1, 4.5)" }, { at: [4, 0], label: "D(4, 0)" }] }, cap);
/** Example 2: 2x + y = 7. */
export const g2xy7 = (cap?: string) => G({ x: [-2, 6], y: [-1, 9], lines: [{ p: [0, 7], q: [3.5, 0], label: "2x + y = 7", at: [3, 1] }], points: [{ at: [0, 7], label: "A(0, 7)" }, { at: [3.5, 0], label: "B(3.5, 0)" }, { at: [1, 5], label: "C(1, 5)" }, { at: [2, 3], label: "D(2, 3)" }] }, cap);
/** Example 3 (i): 4x + 3y = 12. */
export const g4x3y12 = (cap?: string) => G({ x: [-2, 6], y: [-2, 6], lines: [{ p: [0, 4], q: [3, 0], label: "4x + 3y = 12", at: [3.6, -0.8] }], points: [{ at: [0, 4], label: "B(0, 4)" }, { at: [3, 0], label: "A(3, 0)" }] }, cap);
/** Example 3 (ii): 2x + 5y = 0. */
export const g2x5y0 = (cap?: string) => G({ x: [-3, 7], y: [-4, 3], lines: [{ p: [0, 0], q: [5, -2], label: "2x + 5y = 0", at: [-2, 0.8] }], points: [{ at: [0, 0], label: "A(0, 0)" }, { at: [1, -0.4], label: "B(1, −0.4)" }, { at: [5, -2], label: "C(5, −2)" }] }, cap);
/** Exercise 13.2, question 5: 3x - 7y = 21 with the point C(2, 3). */
export const g3x7y21 = (cap?: string) => G({ x: [-2, 9], y: [-5, 5], lines: [{ p: [0, -3], q: [7, 0], label: "3x − 7y = 21", at: [3.5, -1.5] }], points: [{ at: [7, 0], label: "A(7, 0)" }, { at: [0, -3], label: "B(0, −3)" }, { at: [2, 3], label: "C(2, 3)", color: R }] }, cap);

// ── Section 13.3: slope ──────────────────────────────────────────────────────────────────────
/** The line through A(2, 0) and B(4, 3): rise 3 and run 2. */
export const gSlopeAB = (cap?: string) => G({ x: [-1, 7], y: [-1, 6], lines: [{ p: [2, 0], q: [4, 3], at: [5.2, 5.1] }], segs: [{ from: [2, 0], to: [4, 0], dash: true, label: "Run = 2" }, { from: [4, 0], to: [4, 3], dash: true, label: "Rise = 3" }], points: [{ at: [2, 0], label: "A(2, 0)" }, { at: [4, 3], label: "B(4, 3)" }] }, cap);
/** Example 5: A(-1, 0), B(1, 2), C(4, 5). */
export const gEx5 = (cap?: string) => G({ x: [-3, 6], y: [-2, 7], lines: [{ p: [-1, 0], q: [4, 5] }], segs: [{ from: [1, 2], to: [4, 2], dash: true, label: "BP = 3" }, { from: [4, 2], to: [4, 5], dash: true, label: "CP = 3" }], points: [{ at: [-1, 0], label: "A(−1, 0)" }, { at: [1, 2], label: "B(1, 2)" }, { at: [4, 5], label: "C(4, 5)" }, { at: [4, 2], label: "P" }] }, cap);
/** Example 6: A(-4, 5), B(-1, 2). */
export const gEx6 = (cap?: string) => G({ x: [-6, 3], y: [-2, 7], lines: [{ p: [-4, 5], q: [-1, 2] }], segs: [{ from: [-4, 5], to: [-1, 5], dash: true }, { from: [-1, 5], to: [-1, 2], dash: true }], points: [{ at: [-4, 5], label: "A(−4, 5)" }, { at: [-1, 2], label: "B(−1, 2)" }, { at: [-1, 5], label: "P" }] }, cap);
/** y = -5x + 3 with A(0, 3), B(1, -2), C(-1, 8). */
export const gY5x3 = (cap?: string) => G({ x: [-3, 3], y: [-4, 10], unitY: 2, lines: [{ p: [0, 3], q: [1, -2], label: "y = −5x + 3", at: [1.8, -6] }], points: [{ at: [0, 3], label: "A(0, 3)" }, { at: [1, -2], label: "B(1, −2)" }, { at: [-1, 8], label: "C(−1, 8)" }] }, cap, 320, 300);
/** Four kinds of slope on one picture: y = 2x + 1 (up), y = -3x + 4 ... shown one at a time. */
export const gPositive = (cap?: string) => G({ x: [-3, 4], y: [-3, 6], lines: [{ p: [0, 1], q: [1, 3], label: "y = 2x + 1", at: [-1.2, -1.2] }], points: [{ at: [0, 1] }, { at: [1, 3] }] }, cap, 280, 250);
export const gNegative = (cap?: string) => G({ x: [-3, 4], y: [-3, 6], lines: [{ p: [0, 4], q: [1, 1], label: "y = −3x + 4", at: [-0.9, 5.1] }], points: [{ at: [0, 4] }, { at: [1, 1] }] }, cap, 280, 250);
export const gHorizontal = (cap?: string) => G({ x: [-3, 4], y: [-2, 6], lines: [{ p: [-3, 5], q: [4, 5], label: "y = 5", at: [2.6, 5] }] }, cap, 280, 230);
export const gVertical = (cap?: string) => G({ x: [-3, 5], y: [-2, 6], lines: [{ p: [2, -2], q: [2, 6], label: "x = 2", at: [2, 4.8] }] }, cap, 280, 230);

// ── Exercise 13.3 ───────────────────────────────────────────────────────────────────────────
/** Three ski hills with their rise and run (metres). */
export const gHills = (cap?: string): GeoSpec => {
  const hill = (x0: number, run: number, rise: number) => ({ L: [x0, -40] as [number, number], R: [x0 + run, -40] as [number, number], T: [x0 + run, -40 + rise] as [number, number] });
  const a = hill(-185, 70, 60), b = hill(-95, 110, 60), c = hill(40, 100, 80);
  return {
    noMain: true, w: 440, h: 150, scale: 1.1,
    pts: { _AL: a.L, _AR: a.R, _AT: a.T, _BL: b.L, _BR: b.R, _BT: b.T, _CL: c.L, _CR: c.R, _CT: c.T },
    polys: [{ p: ["_AL", "_AR", "_AT"] }, { p: ["_BL", "_BR", "_BT"] }, { p: ["_CL", "_CR", "_CT"] }],
    segs: [
      { p: ["_AL", "_AR"], bold: true, label: "70 m" }, { p: ["_AR", "_AT"], bold: true, label: "60 m" }, { p: ["_AT", "_AL"], bold: true },
      { p: ["_BL", "_BR"], bold: true, label: "110 m" }, { p: ["_BR", "_BT"], bold: true, label: "60 m" }, { p: ["_BT", "_BL"], bold: true },
      { p: ["_CL", "_CR"], bold: true, label: "100 m" }, { p: ["_CR", "_CT"], bold: true, label: "80 m" }, { p: ["_CT", "_CL"], bold: true },
    ],
    rights: [["_AL", "_AR", "_AT"], ["_BL", "_BR", "_BT"], ["_CL", "_CR", "_CT"]],
    labels: [{ x: -150, y: 55, t: "A" }, { x: -55, y: 55, t: "B" }, { x: 80, y: 55, t: "C" }],
    caption: cap,
  };
};
/** The loading dock ramp: rise 2.5 m over a run of 4 m. */
export const gRamp = (cap?: string): GeoSpec => ({
  noMain: true, w: 300, h: 170, scale: 40,
  pts: { _L: [-2, -0.8], _R: [2, -0.8], _T: [2, 1.7] },
  polys: [{ p: ["_L", "_R", "_T"] }],
  segs: [{ p: ["_L", "_R"], bold: true, label: "4 m" }, { p: ["_R", "_T"], bold: true, label: "2.5 m" }, { p: ["_T", "_L"], bold: true }],
  rights: [["_L", "_R", "_T"]],
  caption: cap,
});
/** Exercise 13.3 question 3: the four lines l. */
export const gQ3i = (cap?: string) => G({ x: [-4, 4], y: [-4, 4], lines: [{ p: [-4, 1], q: [4, 1], label: "l", at: [3.3, 1] }] }, cap, 250, 230);
export const gQ3ii = (cap?: string) => G({ x: [-4, 4], y: [-4, 4], lines: [{ p: [-2, 2], q: [2, -2], label: "l", at: [3, -3] }], points: [{ at: [-2, 2], label: "(−2, 2)" }, { at: [2, -2], label: "(2, −2)" }] }, cap, 250, 230);
export const gQ3iii = (cap?: string) => G({ x: [-4, 4], y: [-4, 4], lines: [{ p: [-2, -1], q: [1, 1], label: "l", at: [3, 2.3] }], points: [{ at: [-2, -1], label: "(−2, −1)" }, { at: [1, 1], label: "(1, 1)" }] }, cap, 250, 230);
export const gQ3iv = (cap?: string) => G({ x: [-4, 4], y: [-4, 4], lines: [{ p: [-2, -4], q: [-2, 4], label: "l", at: [-2, 3] }] }, cap, 250, 230);

// ── Sections 13.5 and 13.6: pairs of lines ─────────────────────────────────────────────────
/** Example 11: x + 3y = 6 and 2x - 3y = 12 meet at (6, 0). */
export const gEx11 = (cap?: string) => G({ x: [-2, 8], y: [-6, 4], lines: [{ p: [0, 2], q: [6, 0], label: "x + 3y = 6", at: [-1, 2.3], color: B }, { p: [0, -4], q: [3, -2], label: "2x − 3y = 12", at: [7, 0.7], color: O }], points: [{ at: [0, 2], label: "A(0, 2)" }, { at: [6, 0], label: "B(6, 0)" }, { at: [0, -4], label: "P(0, −4)" }, { at: [3, -2], label: "Q(3, −2)" }] }, cap, 340, 290);
/** Example 12: x + 2y - 4 = 0 and 2x + 4y - 12 = 0 are parallel. */
export const gEx12 = (cap?: string) => G({ x: [-2, 8], y: [-2, 5], lines: [{ p: [0, 2], q: [4, 0], label: "x + 2y − 4 = 0", at: [6.2, -1], color: B }, { p: [0, 3], q: [6, 0], label: "2x + 4y − 12 = 0", at: [1.2, 3.9], color: O }], points: [{ at: [0, 2], label: "R(0, 2)" }, { at: [4, 0], label: "S(4, 0)" }, { at: [0, 3], label: "P(0, 3)" }, { at: [6, 0], label: "Q(6, 0)" }] }, cap, 340, 260);
/** Example 13: 2x + 3y = 9 and 4x + 6y = 18 coincide. */
export const gEx13 = (cap?: string) => G({ x: [-2, 7], y: [-2, 5], lines: [{ p: [0, 3], q: [4.5, 0], label: "2x + 3y = 9", at: [1.5, 2] }], labels: [{ at: [3.8, 0.47], t: "4x + 6y = 18" }], points: [{ at: [0, 3], label: "P(0, 3)" }, { at: [4.5, 0], label: "(4.5, 0)" }, { at: [3, 1], label: "(3, 1)" }] }, cap, 340, 260);
/** Pair 1 of section 13.6: 2x + y = 6 and x - y = 2 meet at (8 over 3, 2 over 3). */
export const gPair1 = (cap?: string) => G({ x: [-2, 6], y: [-4, 8], lines: [{ p: [0, 6], q: [3, 0], label: "2x + y = 6", at: [-0.7, 7.4], color: B }, { p: [0, -2], q: [2, 0], label: "x − y = 2", at: [5, 3], color: O }], points: [{ at: [2.6667, 0.6667], label: "P" }] }, cap, 340, 290);
/** Pair 2: x + y = 4 and 2x + 2y = 8 coincide. */
export const gPair2 = (cap?: string) => G({ x: [-2, 7], y: [-2, 6], lines: [{ p: [0, 4], q: [4, 0], label: "x + y = 4", at: [1.6, 2.4] }], labels: [{ at: [3, 1], t: "2x + 2y = 8" }], points: [{ at: [0, 4], label: "(0, 4)" }, { at: [4, 0], label: "(4, 0)" }] }, cap, 340, 260);
/** Pair 3: 3x - 2y = 6 and 6x - 4y = 12 coincide. */
export const gPair3 = (cap?: string) => G({ x: [-2, 6], y: [-5, 3], lines: [{ p: [0, -3], q: [2, 0], label: "3x − 2y = 6", at: [3.4, 2.1 - 0] }], labels: [{ at: [4.6, 1.9], t: "6x − 4y = 12" }], points: [{ at: [0, -3], label: "(0, −3)" }, { at: [2, 0], label: "(2, 0)" }] }, cap, 340, 260);
/** Pair 4: x - 2y = 4 and 2x - 4y = 6 are parallel. */
export const gPair4 = (cap?: string) => G({ x: [-1, 6], y: [-3, 1], lines: [{ p: [0, -2], q: [4, 0], label: "x − 2y = 4", at: [5, 0.5], color: B }, { p: [0, -1.5], q: [3, 0], label: "2x − 4y = 6", at: [1.5, -0.75], color: O }], points: [{ at: [0, -2], label: "(0, −2)" }, { at: [4, 0], label: "(4, 0)" }, { at: [0, -1.5] }, { at: [3, 0], label: "(3, 0)" }] }, cap, 340, 230);
/** Exercise 13.5 question 2: boys and girls, x + y = 10 and y = x + 4, meet at (3, 7). */
export const gBoysGirls = (cap?: string) => G({ x: [-1, 11], y: [-1, 11], lines: [{ p: [0, 10], q: [10, 0], label: "x + y = 10", at: [8.2, 3.4], color: B }, { p: [0, 4], q: [6, 10], label: "y = x + 4", at: [1.8, 5.8], color: O }], points: [{ at: [3, 7], label: "(3, 7)", color: R }] }, cap, 330, 300);
/** Exercise 13.5 question 4 (i): x + y = 5 and 2x + 2y = 10 coincide. */
export const gQ4i = (cap?: string) => G({ x: [-2, 7], y: [-2, 7], lines: [{ p: [0, 5], q: [5, 0], label: "x + y = 5 and 2x + 2y = 10", at: [5.4, -1.2] }], points: [{ at: [0, 5], label: "(0, 5)" }, { at: [5, 0], label: "(5, 0)" }] }, cap, 340, 260);
/** Exercise 13.5 question 4 (ii): x - y = 8 and 3x - 3y = 16 are parallel. */
export const gQ4ii = (cap?: string) => G({ x: [-2, 10], y: [-9, 3], unit: 2, unitY: 2, lines: [{ p: [0, -8], q: [8, 0], label: "x − y = 8", at: [6, -2], color: B }, { p: [0, -5.3333], q: [5.3333, 0], label: "3x − 3y = 16", at: [9.2, 1.7 - 0.2], color: O }] }, cap, 340, 300);
/** Exercise 13.5 question 4 (iii): 2x + y - 6 = 0 and 4x - 2y - 4 = 0 meet at (2, 2). */
export const gQ4iii = (cap?: string) => G({ x: [-2, 6], y: [-4, 8], lines: [{ p: [0, 6], q: [3, 0], label: "2x + y − 6 = 0", at: [-0.8, 7.2], color: B }, { p: [0, -2], q: [1, 0], label: "4x − 2y − 4 = 0", at: [4.6, 6.6 - 0], color: O }], points: [{ at: [2, 2], label: "(2, 2)", color: R }] }, cap, 340, 290);
/** Exercise 13.5 question 4 (iv): 2x - 2y - 2 = 0 and 4x - 4y - 5 = 0 are parallel. */
export const gQ4iv = (cap?: string) => G({ x: [-2, 5], y: [-4, 3], lines: [{ p: [0, -1], q: [1, 0], label: "2x − 2y − 2 = 0", at: [3.9, 3.0 - 0.2], color: B }, { p: [0, -1.25], q: [1.25, 0], label: "4x − 4y − 5 = 0", at: [-0.6, -2.9], color: O }] }, cap, 340, 270);

// ── End-of-chapter exercises ─────────────────────────────────────────────────────────────────
/** Question 1: y = 3x, and the line x = 3. */
export const gY3x = (cap?: string) => G({ x: [-1, 5], y: [-2, 10], unitY: 2, lines: [{ p: [0, 0], q: [2, 6], label: "y = 3x", at: [0.9, 3.4], color: B }, { p: [3, -2], q: [3, 10], label: "x = 3", at: [3.9, 0.6], color: O }], points: [{ at: [0, 0], label: "(0, 0)" }, { at: [2, 6], label: "(2, 6)" }, { at: [3, 9], label: "(3, 9)", color: R }] }, cap, 320, 300);
/** Question 2: F = 9 over 5 times C + 32. */
export const gCtoF = (cap?: string) => G({ x: [-50, 50], y: [-50, 130], unit: 10, unitY: 20, lines: [{ p: [0, 32], q: [30, 86], label: "F = (9 ÷ 5)C + 32", at: [-38, -28] }], points: [{ at: [0, 32], label: "(0, 32)" }, { at: [30, 86], label: "(30, 86)" }, { at: [-40, -40], label: "(−40, −40)", color: R }, { at: [35, 95], label: "(35, 95)" }] }, cap, 340, 300);
/** Question 3: 2x + y = 6 and 2x - y - 2 = 0 meet at (2, 2). */
export const gQ3end = (cap?: string) => G({ x: [-2, 6], y: [-4, 8], lines: [{ p: [0, 6], q: [3, 0], label: "2x + y = 6", at: [-0.8, 7.2], color: B }, { p: [0, -2], q: [1, 0], label: "2x − y − 2 = 0", at: [4.6, 7.0 - 0.6], color: O }], points: [{ at: [2, 2], label: "(2, 2)", color: R }] }, cap, 340, 290);
/** Question 11 (i): robot paths y = 4x over 3 and y = 2(x - 10), meeting at (30, 40). */
export const gRobots1 = (cap?: string) => G({ x: [-5, 45], y: [-5, 55], unit: 10, unitY: 10, lines: [{ p: [0, 0], q: [30, 40], label: "Robot 1", at: [9, 13.5], color: B }, { p: [10, 0], q: [30, 40], label: "Robot 2", at: [24, 21], color: O }], points: [{ at: [0, 0], label: "start 1" }, { at: [10, 0], label: "start 2" }, { at: [30, 40], label: "(30, 40)", color: R }] }, cap, 340, 300);
/** Question 11 (ii): the lines meet at (4.5, 1.5) but the second robot starts at x = 7. */
export const gRobots2 = (cap?: string) => G({ x: [-1, 13], y: [-6, 10], unit: 2, unitY: 2, lines: [{ p: [3, 0], q: [8, 5], label: "Robot 1", at: [10.4, 8.4], color: B }, { p: [7, 0], q: [12, -3], label: "Robot 2", at: [10, -3.6], color: O }], points: [{ at: [3, 0], label: "(3, 0)" }, { at: [7, 0], label: "(7, 0)" }, { at: [4.5, 1.5], label: "(4.5, 1.5)", hollow: true, color: R }] }, cap, 340, 300);
/** Question 14: the cyclic quadrilateral ABCD. */
export const gCyclic = (cap?: string): GeoSpec => ({
  pts: { A: { a: 120 }, B: { a: 200 }, C: { a: 330 }, D: { a: 60 } },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }],
  caption: cap,
});

// ── Pictures for the notes ───────────────────────────────────────────────────────────────────
/** The three cases of a pair of lines. */
export const gIntersect = (cap?: string) => G({ x: [-1, 7], y: [-1, 7], lines: [{ p: [0, 6], q: [6, 0], color: B, label: "L1", at: [0.7, 5.3] }, { p: [0, 1], q: [6, 4], color: O, label: "L2", at: [5.2, 3.6] }], points: [{ at: [3.3333, 2.6667], color: R }] }, cap, 250, 230);
export const gParallel = (cap?: string) => G({ x: [-1, 7], y: [-1, 7], lines: [{ p: [0, 5], q: [5, 0], color: B, label: "L1", at: [1.5, 3.5] }, { p: [0, 3], q: [3, 0], color: O, label: "L2", at: [1.5, 1.5] }] }, cap, 250, 230);
export const gCoincident = (cap?: string) => G({ x: [-1, 7], y: [-1, 7], lines: [{ p: [0, 5], q: [5, 0], color: B, label: "L1 and L2", at: [2.5, 2.5] }] }, cap, 250, 230);

/** For the self assessment: draw any graph from plain data. */
export const graphSpec = G;
