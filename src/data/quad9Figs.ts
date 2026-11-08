import type { GeoSpec } from "../components/GeoFigure";

// Figures for Class IX Maths, Quadrilaterals. They are drawn from coordinates, so every midpoint, parallel and
// bisector is exact. Not drawn to scale for the lengths mentioned in a question. Checked by scripts/check-quad9-figs.mts.

type Pt = [number, number];
const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const unit = (a: Pt, b: Pt): Pt => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
const meet = (p: Pt, d: Pt, q: Pt, e: Pt): Pt => {
  const det = d[0] * e[1] - d[1] * e[0];
  const t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / det;
  return [p[0] + t * d[0], p[1] + t * d[1]];
};
const outline = (names: string[], dash = false) => names.map((n, i) => ({ p: [n, names[(i + 1) % names.length]] as [string, string], bold: !dash, dash }));
const base = (pts: Record<string, Pt>, rest: Partial<GeoSpec>): GeoSpec => ({ noMain: true, pts, ...rest });

// Parallelogram ABCD: A bottom left, B bottom right, C top right, D top left.
const PA: Pt = [-1.1, -0.6], PB: Pt = [0.6, -0.6], PC: Pt = [1.1, 0.6], PD: Pt = [-0.6, 0.6];

/** Parallelogram ABCD, optionally with the diagonals meeting at E, equal-side marks and equal-angle marks. */
export const parallelogram = (o: { diag?: boolean; marks?: boolean; angles?: boolean; cap?: string } = {}): GeoSpec => {
  const E = mid(PA, PC);
  return base({ A: PA, B: PB, C: PC, D: PD, ...(o.diag ? { E } : {}) }, {
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [...outline(["A", "B", "C", "D"]), ...(o.diag ? [{ p: ["A", "C"] as [string, string], dash: true }, { p: ["B", "D"] as [string, string], dash: true }] : [])],
    ticks: o.marks ? [{ p: ["A", "B"] }, { p: ["D", "C"] }, { p: ["A", "D"], n: 2 }, { p: ["B", "C"], n: 2 }] : o.diag ? [{ p: ["A", "E"] }, { p: ["E", "C"] }, { p: ["B", "E"], n: 2 }, { p: ["E", "D"], n: 2 }] : undefined,
    angs: o.angles ? [{ at: "A", from: "B", to: "D", label: "x" }, { at: "B", from: "C", to: "A", label: "y" }, { at: "C", from: "D", to: "B", label: "x" }, { at: "D", from: "A", to: "C", label: "y" }] : undefined,
    caption: o.cap,
  });
};

/** Parallelogram ABCD with the diagonal AC only (the proof of Theorem 1(a) and the SSS proof of its converse). */
export const parallelogramAC = (o: { marks?: boolean; cap?: string } = {}): GeoSpec => base({ A: PA, B: PB, C: PC, D: PD }, {
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [...outline(["A", "B", "C", "D"]), { p: ["A", "C"], dash: true }],
  ticks: o.marks ? [{ p: ["A", "B"] }, { p: ["D", "C"] }, { p: ["A", "D"], n: 2 }, { p: ["B", "C"], n: 2 }] : undefined,
  caption: o.cap,
});

/** A convex quadrilateral ABCD with its diagonals crossing inside. */
export const quadConvex = (o: { diag?: boolean; cap?: string } = {}): GeoSpec => base({ A: [-1.0, -0.6], B: [0.9, -0.7], C: [0.7, 0.7], D: [-0.8, 0.5] }, {
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [...outline(["A", "B", "C", "D"]), ...(o.diag ? [{ p: ["A", "C"] as [string, string], dash: true }, { p: ["B", "D"] as [string, string], dash: true }] : [])],
  caption: o.cap,
});

/** The non-convex quadrilateral DART: the dent is at D. */
export const quadDart = (o: { diag?: boolean; cap?: string } = {}): GeoSpec => base({ D: [-0.2, -0.05], A: [-1.0, 0.8], R: [-0.7, -0.75], T: [1.0, 0.1] }, {
  polys: [{ p: ["D", "A", "R", "T"] }],
  segs: [...outline(["D", "A", "R", "T"]), ...(o.diag ? [{ p: ["D", "R"] as [string, string], dash: true }, { p: ["A", "T"] as [string, string], dash: true }] : [])],
  angs: [{ at: "D", from: "A", to: "T", reflex: true, label: ">180°" }],
  caption: o.cap,
});

/** A self-intersecting quadrilateral CUTS: sides CU and TS cross. */
export const quadSelf = (o: { cap?: string } = {}): GeoSpec => base({ C: [-1.0, -0.7], U: [0.9, 0.7], T: [0.9, -0.7], S: [-1.0, 0.7] }, {
  segs: [{ p: ["C", "U"], bold: true }, { p: ["U", "T"], bold: true }, { p: ["T", "S"], bold: true }, { p: ["S", "C"], bold: true }],
  caption: o.cap,
});

/** Self-intersecting ABCD where AB and CD meet at E (end-of-chapter question 3). */
export const selfAngles = (o: { cap?: string } = {}): GeoSpec => {
  const A: Pt = [-1.0, -0.6], B: Pt = [0.5, 0.7], C: Pt = [1.0, -0.6], D: Pt = [-0.5, 0.7];
  // AB and CD cross where the two long segments meet; place E exactly there
  const E = meet(A, [B[0] - A[0], B[1] - A[1]], C, [D[0] - C[0], D[1] - C[1]]);
  return base({ A, B, C, D, E }, {
    segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }],
    caption: o.cap,
  });
};

// Triangle ABC used for the midpoint figures.
const TA: Pt = [0.15, 1.0], TB: Pt = [-1.15, -0.65], TC: Pt = [1.2, -0.65];

/** Triangle ABC with the midpoints P of AB and Q of AC joined. With proof = true the line l through C parallel to BA and the point R are added. */
export const triMidsegment = (o: { proof?: boolean; cap?: string } = {}): GeoSpec => {
  const P = mid(TA, TB), Q = mid(TA, TC);
  const R: Pt = [2 * Q[0] - P[0], 2 * Q[1] - P[1]];
  return base({ A: TA, B: TB, C: TC, P, Q, ...(o.proof ? { R } : {}) }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [...outline(["A", "B", "C"]), { p: ["P", "Q"], bold: true, color: "#ea580c" }, ...(o.proof ? [{ p: ["C", "R"] as [string, string], dash: true }, { p: ["Q", "R"] as [string, string], dash: true, color: "#ea580c" }] : [])],
    ticks: [{ p: ["A", "P"] }, { p: ["P", "B"] }, { p: ["A", "Q"], n: 2 }, { p: ["Q", "C"], n: 2 }],
    caption: o.cap,
  });
};

/** The line through the midpoint P of AB parallel to BC meets AC at Q (converse of the Midpoint Theorem). */
export const triMidParallel = (o: { cap?: string } = {}): GeoSpec => {
  const P = mid(TA, TB), Q = mid(TA, TC);
  return base({ A: TA, B: TB, C: TC, P, Q }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [...outline(["A", "B", "C"]), { p: ["P", "Q"], bold: true, color: "#ea580c" }],
    ticks: [{ p: ["A", "P"] }, { p: ["P", "B"] }],
    caption: o.cap,
  });
};

/** All three midpoints P, Q, R joined: the triangle is cut into four small triangles. */
export const triFour = (o: { cap?: string } = {}): GeoSpec => {
  const P = mid(TA, TB), Q = mid(TA, TC), R = mid(TB, TC);
  return base({ A: TA, B: TB, C: TC, P, Q, R }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [...outline(["A", "B", "C"]), { p: ["P", "Q"], bold: true, color: "#ea580c" }, { p: ["Q", "R"], bold: true, color: "#ea580c" }, { p: ["R", "P"], bold: true, color: "#ea580c" }],
    ticks: [{ p: ["A", "P"] }, { p: ["P", "B"] }, { p: ["A", "Q"], n: 2 }, { p: ["Q", "C"], n: 2 }, { p: ["B", "R"], n: 3 }, { p: ["R", "C"], n: 3 }],
    caption: o.cap,
  });
};

/** The three medians AR, BQ, CP of triangle ABC meeting at the centroid M. */
export const triMedians = (o: { cap?: string; ratio?: boolean } = {}): GeoSpec => {
  const P = mid(TA, TB), Q = mid(TA, TC), R = mid(TB, TC);
  const M: Pt = [(TA[0] + TB[0] + TC[0]) / 3, (TA[1] + TB[1] + TC[1]) / 3];
  return base({ A: TA, B: TB, C: TC, P, Q, R, M }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [...outline(["A", "B", "C"]), { p: ["A", "R"], bold: true, color: "#ea580c" }, { p: ["B", "Q"], bold: true, color: "#ea580c" }, { p: ["C", "P"], bold: true, color: "#ea580c" }],
    ticks: o.ratio ? [{ p: ["C", "M"], n: 2 }, { p: ["M", "P"] }] : undefined,
    caption: o.cap,
  });
};

/** Two medians CP and BQ with the midpoints X of BM and Y of CM (proof of the Centroid Theorem). */
export const centroidProof = (o: { cap?: string } = {}): GeoSpec => {
  const P = mid(TA, TB), Q = mid(TA, TC);
  const M: Pt = [(TA[0] + TB[0] + TC[0]) / 3, (TA[1] + TB[1] + TC[1]) / 3];
  const X = mid(TB, M), Y = mid(TC, M);
  return base({ A: TA, B: TB, C: TC, P, Q, M, X, Y }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [...outline(["A", "B", "C"]), { p: ["B", "Q"], bold: true, color: "#ea580c" }, { p: ["C", "P"], bold: true, color: "#ea580c" }, { p: ["P", "Q"], dash: true }, { p: ["X", "Y"], dash: true }],
    caption: o.cap,
  });
};

// Quadrilateral ABCD for the Varignon figure.
const VA: Pt = [-1.1, -0.55], VB: Pt = [0.4, -0.75], VC: Pt = [1.15, 0.5], VD: Pt = [-0.55, 0.8];

/** Quadrilateral ABCD with the midpoints P, Q, R, S of its sides joined (the Varignon parallelogram). */
export const quadVarignon = (o: { diag?: boolean; cap?: string } = {}): GeoSpec => {
  const P = mid(VA, VB), Q = mid(VB, VC), R = mid(VC, VD), S = mid(VD, VA);
  return base({ A: VA, B: VB, C: VC, D: VD, P, Q, R, S }, {
    polys: [{ p: ["P", "Q", "R", "S"], fill: "rgba(234,88,12,0.12)" }],
    segs: [...outline(["A", "B", "C", "D"]), ...outline(["P", "Q", "R", "S"], false).map((s) => ({ ...s, color: "#ea580c" })), ...(o.diag ? [{ p: ["A", "C"] as [string, string], dash: true }, { p: ["B", "D"] as [string, string], dash: true }] : [])],
    caption: o.cap,
  });
};

/** Trapezium ABCD with AD parallel to BC (AD on top) and E, F the midpoints of AB and DC. */
export const trapMid = (o: { top?: string; bottom?: string; mid?: string; cap?: string } = {}): GeoSpec => {
  const A: Pt = [-0.55, 0.6], D: Pt = [0.45, 0.6], B: Pt = [-1.15, -0.6], C: Pt = [1.15, -0.6];
  const E = mid(A, B), F = mid(D, C);
  return base({ A, D, B, C, E, F }, {
    polys: [{ p: ["A", "D", "C", "B"] }],
    segs: [...outline(["A", "D", "C", "B"]), { p: ["E", "F"], bold: true, color: "#ea580c", label: o.mid }],
    labels: [
      ...(o.top ? [{ x: 0, y: 0.78, t: o.top }] : []),
      ...(o.bottom ? [{ x: 0, y: -0.82, t: o.bottom }] : []),
    ],
    ticks: [{ p: ["A", "E"] }, { p: ["E", "B"] }, { p: ["D", "F"], n: 2 }, { p: ["F", "C"], n: 2 }],
    caption: o.cap,
  });
};

/** Trapezium ABCD (AB parallel to DC, AB on top) with the midpoints E of AD and F of BC, and EF through them. */
export const trapEF = (o: { cap?: string } = {}): GeoSpec => {
  const A: Pt = [-0.6, 0.6], B: Pt = [0.5, 0.6], D: Pt = [-1.15, -0.6], C: Pt = [1.1, -0.6];
  const E = mid(A, D), F = mid(B, C);
  return base({ A, B, C, D, E, F }, {
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [...outline(["A", "B", "C", "D"]), { p: ["E", "F"], bold: true, color: "#ea580c" }],
    ticks: [{ p: ["A", "E"] }, { p: ["E", "D"] }, { p: ["B", "F"], n: 2 }, { p: ["F", "C"], n: 2 }],
    caption: o.cap,
  });
};

/** Quadrilateral ABCD with AB parallel to DC and G, H the midpoints of AC and BD (exercise 12.3, question 3). */
export const quadGH = (o: { cap?: string } = {}): GeoSpec => {
  const A: Pt = [-0.7, 0.6], B: Pt = [0.5, 0.6], D: Pt = [-1.15, -0.6], C: Pt = [1.15, -0.6];
  const G = mid(A, C), H = mid(B, D);
  return base({ A, B, C, D, G, H }, {
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [...outline(["A", "B", "C", "D"]), { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }, { p: ["G", "H"], bold: true, color: "#ea580c" }],
    caption: o.cap,
  });
};

/** Triangle ABC with M, N the midpoints of AB and AC, D a point on BC and AD crossing MN (exercise 12.3, question 2). */
export const triMNAD = (o: { cap?: string } = {}): GeoSpec => {
  const M = mid(TA, TB), N = mid(TA, TC);
  const D: Pt = [0.35, -0.65];
  const X = meet(TA, [D[0] - TA[0], D[1] - TA[1]], M, [N[0] - M[0], N[1] - M[1]]);
  return base({ A: TA, B: TB, C: TC, M, N, D, _X: X }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [...outline(["A", "B", "C"]), { p: ["M", "N"], bold: true, color: "#ea580c" }, { p: ["A", "D"], dash: true }],
    caption: o.cap,
  });
};

/** Parallelogram ABCD with P, Q on the diagonal BD so that DP = BQ (end-of-chapter question 4). */
export const parDiagPQ = (o: { cap?: string } = {}): GeoSpec => {
  const Dd = PD, Bb = PB;
  const P: Pt = [Dd[0] + 0.28 * (Bb[0] - Dd[0]), Dd[1] + 0.28 * (Bb[1] - Dd[1])];
  const Q: Pt = [Bb[0] - 0.28 * (Bb[0] - Dd[0]), Bb[1] - 0.28 * (Bb[1] - Dd[1])];
  return base({ A: PA, B: PB, C: PC, D: PD, P, Q }, {
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [...outline(["A", "B", "C", "D"]), { p: ["B", "D"], dash: true }, { p: ["A", "P"], bold: true, color: "#ea580c" }, { p: ["P", "C"], bold: true, color: "#ea580c" }, { p: ["C", "Q"], bold: true, color: "#ea580c" }, { p: ["Q", "A"], bold: true, color: "#ea580c" }],
    ticks: [{ p: ["D", "P"] }, { p: ["B", "Q"] }],
    caption: o.cap,
  });
};

/** Parallelogram ABCD with O the intersection of the diagonals and a line through O meeting AB at P and CD at Q (end-of-chapter question 8). */
export const parThroughO = (o: { cap?: string } = {}): GeoSpec => {
  const O = mid(PA, PC);
  const dir: Pt = [0.35, 1];
  const P = meet(O, dir, PA, [PB[0] - PA[0], PB[1] - PA[1]]);
  const Q = meet(O, dir, PD, [PC[0] - PD[0], PC[1] - PD[1]]);
  return base({ A: PA, B: PB, C: PC, D: PD, O, P, Q }, {
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [...outline(["A", "B", "C", "D"]), { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }, { p: ["P", "Q"], bold: true, color: "#ea580c" }],
    caption: o.cap,
  });
};

/** Parallelogram ABCD (A bottom left) with M, N the midpoints of AB and CD; DM and BN cut the diagonal AC (end-of-chapter question 12). */
export const parTrisect = (o: { cap?: string } = {}): GeoSpec => {
  const M = mid(PA, PB), N = mid(PC, PD);
  const X = meet(PD, [M[0] - PD[0], M[1] - PD[1]], PA, [PC[0] - PA[0], PC[1] - PA[1]]);
  const Y = meet(PB, [N[0] - PB[0], N[1] - PB[1]], PA, [PC[0] - PA[0], PC[1] - PA[1]]);
  return base({ A: PA, B: PB, C: PC, D: PD, M, N, X, Y }, {
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [...outline(["A", "B", "C", "D"]), { p: ["A", "C"], bold: true, color: "#ea580c" }, { p: ["D", "M"], dash: true }, { p: ["B", "N"], dash: true }],
    caption: o.cap,
  });
};

/** The four angle bisectors of a parallelogram ABCD (AB longer than BC) meet in the corners of a rectangle PQRS. */
export const parBisectors = (o: { cap?: string } = {}): GeoSpec => {
  const A: Pt = [-1.0, -0.65], B: Pt = [0.8, -0.65], C: Pt = [1.1, 0.65], D: Pt = [-0.7, 0.65];
  const bis = (V: Pt, U: Pt, W: Pt): Pt => { const a = unit(V, U), b = unit(V, W); return [a[0] + b[0], a[1] + b[1]]; };
  const dA = bis(A, B, D), dB = bis(B, C, A), dC = bis(C, D, B), dD = bis(D, A, C);
  const P = meet(A, dA, B, dB), Q = meet(B, dB, C, dC), R = meet(C, dC, D, dD), S = meet(D, dD, A, dA);
  return base({ A, B, C, D, P, Q, R, S }, {
    polys: [{ p: ["P", "Q", "R", "S"], fill: "rgba(234,88,12,0.12)" }],
    segs: [...outline(["A", "B", "C", "D"]), { p: ["A", "P"], bold: true, color: "#ea580c" }, { p: ["B", "Q"], bold: true, color: "#ea580c" }, { p: ["C", "R"], bold: true, color: "#ea580c" }, { p: ["D", "R"], bold: true, color: "#ea580c" }],
    caption: o.cap,
  });
};

/** A quadrilateral SOME with its four angles marked 1, 2, 3, 4 (they add up to 360°). */
export const tileQuad = (o: { cap?: string } = {}): GeoSpec => base({ S: [-0.9, 0.6], O: [0.9, 0.75], M: [0.6, -0.65], E: [-0.85, -0.5] }, {
  polys: [{ p: ["S", "O", "M", "E"] }],
  segs: outline(["S", "O", "M", "E"]),
  angs: [{ at: "S", from: "O", to: "E", label: "1" }, { at: "O", from: "M", to: "S", label: "2" }, { at: "M", from: "E", to: "O", label: "3" }, { at: "E", from: "S", to: "M", label: "4" }],
  caption: o.cap,
});

/** Method 1 of tiling: SOME and its copy turned through 180° about the midpoint of OM. */
export const tileRotate = (o: { cap?: string } = {}): GeoSpec => {
  const S: Pt = [-1.0, 0.5], O: Pt = [-0.05, 0.75], M: Pt = [0.05, -0.65], E: Pt = [-0.95, -0.5];
  const c = mid(O, M);
  const S2: Pt = [2 * c[0] - S[0], 2 * c[1] - S[1]], E2: Pt = [2 * c[0] - E[0], 2 * c[1] - E[1]];
  return base({ S, O, M, E, "S′": S2, "E′": E2 }, {
    polys: [{ p: ["S", "O", "M", "E"] }, { p: ["M", "S′", "E′", "O"], fill: "rgba(234,88,12,0.14)" }],
    segs: [...outline(["S", "O", "M", "E"]), { p: ["M", "S′"], bold: true, color: "#ea580c" }, { p: ["S′", "E′"], bold: true, color: "#ea580c" }, { p: ["E′", "O"], bold: true, color: "#ea580c" }],
    caption: o.cap,
  });
};

/** A grid of parallelograms: the plane tiled by copies of one parallelogram. */
export const parGrid = (o: { cap?: string } = {}): GeoSpec => {
  const pts: Record<string, Pt> = {};
  const polys: { p: string[]; fill?: string }[] = [];
  const segs: { p: [string, string]; bold?: boolean }[] = [];
  const ox = -1.2, oy = -0.75, ax = 0.62, ay = 0, bx = 0.28, by = 0.5;
  const nm = (i: number, j: number) => `_${i}_${j}`;
  for (let i = 0; i <= 3; i++) for (let j = 0; j <= 3; j++) pts[nm(i, j)] = [ox + i * ax + j * bx, oy + i * ay + j * by];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2 === 0) polys.push({ p: [nm(i, j), nm(i + 1, j), nm(i + 1, j + 1), nm(i, j + 1)], fill: "rgba(37,99,235,0.14)" });
  for (let i = 0; i <= 3; i++) segs.push({ p: [nm(i, 0), nm(i, 3)], bold: true });
  for (let j = 0; j <= 3; j++) segs.push({ p: [nm(0, j), nm(3, j)], bold: true });
  return base(pts, { polys, segs, caption: o.cap });
};

/** A triangle ABC and its copy turned through 180° about the midpoint of BC: together they make a parallelogram. */
export const triPar = (o: { cap?: string } = {}): GeoSpec => {
  const A: Pt = [-0.5, 0.65], B: Pt = [-1.1, -0.6], C: Pt = [0.5, -0.6];
  const c = mid(B, C);
  const D: Pt = [2 * c[0] - A[0], 2 * c[1] - A[1]];
  return base({ A, B, C, D }, {
    polys: [{ p: ["A", "B", "C"] }, { p: ["C", "D", "B"], fill: "rgba(234,88,12,0.14)" }],
    segs: [...outline(["A", "B", "D", "C"]), { p: ["B", "C"], dash: true }],
    caption: o.cap,
  });
};

/** Any quadrilateral ABCD split by the diagonal AC into two triangles with the angles marked (angle sum 360°). */
export const angleSumQuad = (o: { cap?: string } = {}): GeoSpec => base({ A: [-1.0, -0.55], B: [0.9, -0.7], C: [0.75, 0.7], D: [-0.8, 0.55] }, {
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [...outline(["A", "B", "C", "D"]), { p: ["A", "C"], dash: true }],
  caption: o.cap,
});

/** The Midpoint Theorem for a triangle of given sides: shows BC and PQ as labelled lengths. */
export const triMidLen = (o: { bc?: string; pq?: string; cap?: string } = {}): GeoSpec => {
  const P = mid(TA, TB), Q = mid(TA, TC);
  return base({ A: TA, B: TB, C: TC, P, Q }, {
    polys: [{ p: ["A", "B", "C"] }],
    segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"], bold: true }, { p: ["B", "C"], bold: true, label: o.bc }, { p: ["P", "Q"], bold: true, color: "#ea580c", label: o.pq }],
    caption: o.cap,
  });
};
