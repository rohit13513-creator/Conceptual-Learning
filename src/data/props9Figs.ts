import type { GeoSpec } from "../components/GeoFigure";

// Figures for Class IX Maths, Propositions and their Converses. Not drawn to scale; they only show the arrangement.

const rad = (d: number) => (d * Math.PI) / 180;

/** Statement 1: triangle with AB = AC. */
export const isoTri = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { A: [0, 1.0], B: [-0.95, -0.6], C: [0.95, -0.6] },
  polys: [{ p: ["A", "B", "C"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }],
  ticks: [{ p: ["A", "B"] }, { p: ["A", "C"] }],
  caption: cap,
});

/** Converse of the isosceles triangle theorem: angles B and C equal, altitude AD drawn. */
export const isoConverse = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { A: [0, 1.0], B: [-0.95, -0.6], C: [0.95, -0.6], D: [0, -0.6] },
  polys: [{ p: ["A", "B", "C"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }, { p: ["A", "D"], dash: true }],
  rights: [["A", "D", "B"]],
  angs: [{ at: "B", from: "C", to: "A", label: "x" }, { at: "C", from: "A", to: "B", label: "x" }],
  caption: cap,
});

/** Triangle ABC with sides a, b, c (the triangle of the converse of the Pythagoras theorem). */
export const pythTri = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { A: [0.55, 0.95], B: [-0.95, -0.6], C: [0.95, -0.6] },
  polys: [{ p: ["A", "B", "C"] }],
  segs: [{ p: ["B", "C"], bold: true, label: "a" }, { p: ["C", "A"], bold: true, label: "b" }, { p: ["A", "B"], bold: true, label: "c" }],
  caption: cap,
});

/** Right triangle XYZ with perpendicular sides a and b. */
export const pythRight = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { X: [-0.7, 0.95], Y: [0.95, -0.6], Z: [-0.7, -0.6] },
  polys: [{ p: ["X", "Y", "Z"] }],
  segs: [{ p: ["Y", "Z"], bold: true, label: "a" }, { p: ["Z", "X"], bold: true, label: "b" }, { p: ["X", "Y"], bold: true, label: "?" }],
  rights: [["X", "Z", "Y"]],
  caption: cap,
});

/** Triangle with the bisectors of angles B and C meeting at the incentre I; they meet AC at E and AB at F. */
export const incentre = (angA: number, angB: number, cap?: string): GeoSpec => {
  const angC = 180 - angA - angB;
  const a = Math.sin(rad(angA)), b = Math.sin(rad(angB)), c = Math.sin(rad(angC));
  // sides (scaled): BC = a, CA = b, AB = c (sine rule)
  const k = 1.9 / Math.max(a, b, c);
  const B: [number, number] = [-0.95, -0.6];
  const C: [number, number] = [B[0] + a * k, B[1]];
  const A: [number, number] = [B[0] + c * k * Math.cos(rad(angB)), B[1] + c * k * Math.sin(rad(angB))];
  const s = a + b + c;
  const I: [number, number] = [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s];
  const E: [number, number] = [A[0] + ((C[0] - A[0]) * c) / (a + c), A[1] + ((C[1] - A[1]) * c) / (a + c)];
  const F: [number, number] = [A[0] + ((B[0] - A[0]) * b) / (a + b), A[1] + ((B[1] - A[1]) * b) / (a + b)];
  const shift = -(A[0] + B[0] + C[0]) / 3;
  const mv = (p: [number, number]): [number, number] => [p[0] + shift, p[1] - 0.15];
  return {
    noMain: true,
    pts: { A: mv(A), B: mv(B), C: mv(C), I: mv(I), E: mv(E), F: mv(F) },
    polys: [{ p: ["A", "B", "C"] }],
    segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }, { p: ["B", "E"] }, { p: ["C", "F"] }],
    caption: cap,
  };
};

/** Two parallel lines cut by a transversal: corresponding angles 1 and 2. */
export const transversal = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { P: [-1.3, 0.4], Q: [1.3, 0.4], R: [-1.3, -0.5], S: [1.3, -0.5], T: [-0.55, 1.15], U: [0.65, -1.25], M: [-0.19, 0.4], N: [0.3, -0.5] },
  segs: [{ p: ["P", "Q"], bold: true }, { p: ["R", "S"], bold: true }, { p: ["T", "U"], bold: true }],
  angs: [{ at: "M", from: "Q", to: "T", label: "1" }, { at: "N", from: "S", to: "M", label: "2" }],
  noLabel: ["M", "N"],
  caption: cap,
});

/** Fig. 9.2: two sticks put together as the diagonals of a quadrilateral. */
export const sticks = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { A: [-1.1, 0.2], B: [0.3, 0.95], C: [1.1, -0.2], D: [-0.3, -0.95], O: [0, 0] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"] }, { p: ["B", "C"] }, { p: ["C", "D"] }, { p: ["D", "A"] }, { p: ["A", "C"], bold: true }, { p: ["B", "D"], bold: true }],
  noLabel: ["O"],
  caption: cap,
});

/** A rectangle that is not a square: all angles equal, sides unequal. */
export const rectangle = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { A: [-1.2, -0.55], B: [1.2, -0.55], C: [1.2, 0.55], D: [-1.2, 0.55] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true, label: "6" }, { p: ["B", "C"], bold: true, label: "4" }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }],
  rights: [["D", "A", "B"], ["A", "B", "C"], ["B", "C", "D"], ["C", "D", "A"]],
  caption: cap,
});

/** Two triangles with the same area (6 × 4 ÷ 2 = 8 × 3 ÷ 2 = 12) that are not congruent. */
export const sameAreaTriangles = (cap?: string): GeoSpec => ({
  noMain: true, w: 340,
  pts: { P: [-1.55, -0.45], Q: [-0.55, -0.45], R: [-1.55, 0.15], X: [0.05, -0.45], Y: [1.35, -0.45], Z: [0.05, 0.0] },
  polys: [{ p: ["P", "Q", "R"] }, { p: ["X", "Y", "Z"] }],
  segs: [
    { p: ["P", "Q"], bold: true, label: "6" }, { p: ["P", "R"], bold: true, label: "4" }, { p: ["Q", "R"], bold: true },
    { p: ["X", "Y"], bold: true, label: "8" }, { p: ["X", "Z"], bold: true, label: "3" }, { p: ["Y", "Z"], bold: true },
  ],
  rights: [["Q", "P", "R"], ["Y", "X", "Z"]],
  caption: cap,
});

/** A kite: diagonals are perpendicular but it is not a rhombus. */
export const kite = (cap?: string): GeoSpec => ({
  noMain: true,
  pts: { A: [0, 1.15], B: [-0.8, 0.1], C: [0, -0.9], D: [0.8, 0.1], O: [0, 0.1] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }, { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }],
  ticks: [{ p: ["A", "B"] }, { p: ["A", "D"] }, { p: ["C", "B"], n: 2 }, { p: ["C", "D"], n: 2 }],
  rights: [["A", "O", "B"]],
  noLabel: ["O"],
  caption: cap,
});
