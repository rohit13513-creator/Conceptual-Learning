import type { GeoSpec } from "../components/GeoFigure";

// Ready-made circle figures, each a small function that returns a GeoSpec. They are used in the notes,
// the solved questions and the question bank. Angles of points are in degrees (0 = east, anticlockwise).

const ang = (a: number, r = 1): { a: number; r?: number } => ({ a, r });
const rad = (d: number) => (d * Math.PI) / 180;

/** A chord AB at distance d from the centre O (perpendicular OM), optionally with the radius OA. */
export const chordDist = (o: { dy?: number; d?: string; r?: string; len?: string; showR?: boolean; cap?: string; names?: [string, string, string] } = {}): GeoSpec => {
  const dy = o.dy ?? 0.55, hx = Math.sqrt(1 - dy * dy);
  const [A, B, M] = o.names || ["A", "B", "M"];
  return {
    pts: { O: [0, 0], [A]: [-hx, -dy], [B]: [hx, -dy], [M]: [0, -dy] },
    segs: [
      { p: [A, B], bold: true, label: o.len },
      { p: ["O", M], dash: true, label: o.d },
      ...(o.showR ? [{ p: ["O", A] as [string, string], dash: true, label: o.r }] : []),
    ],
    rights: [["O", M, A]],
    caption: o.cap,
  };
};

/** Two chords of a circle with their perpendiculars from the centre. equal => chords AB = DE at equal distances. */
export const twoChords = (o: { equal?: boolean; l1?: string; l2?: string; d1?: string; d2?: string; cap?: string } = {}): GeoSpec => {
  const dy1 = o.equal ? 0.5 : 0.28, dy2 = o.equal ? 0.5 : 0.62;
  const h1 = Math.sqrt(1 - dy1 * dy1), h2 = Math.sqrt(1 - dy2 * dy2);
  // AB is a horizontal chord below the centre; DE is the same kind of chord turned to the upper right
  const t = rad(o.equal ? 150 : 135);
  const rot = (x: number, y: number): [number, number] => [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)];
  return {
    pts: { O: [0, 0], A: [-h1, -dy1], B: [h1, -dy1], F: [0, -dy1], D: rot(-h2, -dy2), E: rot(h2, -dy2), G: rot(0, -dy2) },
    segs: [
      { p: ["A", "B"], bold: true, label: o.l1 },
      { p: ["D", "E"], bold: true, label: o.l2 },
      { p: ["O", "F"], dash: true, label: o.d1 },
      { p: ["O", "G"], dash: true, label: o.d2 },
    ],
    rights: [["O", "F", "A"], ["O", "G", "D"]],
    caption: o.cap,
  };
};

/** Central angle AOB and inscribed angle APB on the same arc AB. */
export const inscribed = (o: { central?: string; insc?: string; a1?: number; a2?: number; p?: number; cap?: string; showArc?: boolean } = {}): GeoSpec => {
  const a1 = o.a1 ?? 215, a2 = o.a2 ?? 325, p = o.p ?? 90;
  return {
    pts: { O: [0, 0], A: ang(a1), B: ang(a2), P: ang(p) },
    segs: [{ p: ["O", "A"] }, { p: ["O", "B"] }, { p: ["P", "A"], bold: true }, { p: ["P", "B"], bold: true }],
    arcs: o.showArc === false ? [] : [{ a1, a2 }],
    angs: [
      ...(o.central ? [{ at: "O", from: "A", to: "B", label: o.central, r: 20 }] : []),
      ...(o.insc ? [{ at: "P", from: "A", to: "B", label: o.insc, r: 26, color: "#2563eb" }] : []),
    ],
    caption: o.cap,
  };
};

/** Angle in a semicircle: diameter AB and a point C on the circle. */
export const semicircle = (o: { c?: number; angle?: string; left?: string; right?: string; cap?: string } = {}): GeoSpec => ({
  pts: { A: ang(180), B: ang(0), C: ang(o.c ?? 70), O: [0, 0] },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"] }, { p: ["B", "C"] }, { p: ["O", "C"], dash: true }],
  rights: o.angle === "right" || !o.angle ? [["A", "C", "B"]] : [],
  angs: [
    ...(o.left ? [{ at: "A", from: "B", to: "C", label: o.left, r: 24 }] : []),
    ...(o.right ? [{ at: "B", from: "A", to: "C", label: o.right, r: 24 }] : []),
    ...(o.angle && o.angle !== "right" ? [{ at: "C", from: "A", to: "B", label: o.angle, r: 18 }] : []),
  ],
  caption: o.cap,
});

/** Cyclic quadrilateral ABCD (vertices at the given angles) with optional angle labels at the corners. */
export const cyclicQuad = (o: { A?: string; B?: string; C?: string; D?: string; diag?: boolean; centre?: boolean; va?: number[]; cap?: string; ext?: string; tag?: string } = {}): GeoSpec => {
  const [a, b, c, d] = o.va || [100, 205, 305, 25];
  const cs: GeoSpec = {
    pts: { A: ang(a), B: ang(b), C: ang(c), D: ang(d), ...(o.centre ? { O: [0, 0] as [number, number] } : {}) },
    polys: [{ p: ["A", "B", "C", "D"] }],
    segs: [
      { p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true },
      ...(o.diag ? [{ p: ["A", "C"] as [string, string], dash: true }, { p: ["B", "D"] as [string, string], dash: true }] : []),
    ],
    angs: [
      ...(o.A ? [{ at: "A", from: "D", to: "B", label: o.A }] : []),
      ...(o.B ? [{ at: "B", from: "A", to: "C", label: o.B }] : []),
      ...(o.C ? [{ at: "C", from: "B", to: "D", label: o.C }] : []),
      ...(o.D ? [{ at: "D", from: "C", to: "A", label: o.D }] : []),
    ],
    caption: o.cap,
  };
  if (o.ext) {
    // side BC extended beyond C to a point E, to show the exterior angle DCE
    const C = [Math.cos(rad(c)), Math.sin(rad(c))], B = [Math.cos(rad(b)), Math.sin(rad(b))];
    cs.pts.E = [C[0] + (C[0] - B[0]) * 0.55, C[1] + (C[1] - B[1]) * 0.55];
    cs.segs!.push({ p: ["C", "E"], bold: true });
    cs.angs!.push({ at: "C", from: "E", to: "D", label: o.ext, r: 20, color: "#15803d" });
  }
  return cs;
};

/** Two parallel chords AB and CD with their distances from the centre. */
export const parallelChords = (o: { same?: boolean; l1?: string; l2?: string; d1?: string; d2?: string; dist?: string; y1?: number; y2?: number; cap?: string } = {}): GeoSpec => {
  const y1 = o.y1 ?? (o.same ? 0.3 : 0.4), y2 = o.y2 ?? (o.same ? 0.7 : -0.5);
  const h1 = Math.sqrt(1 - y1 * y1), h2 = Math.sqrt(1 - y2 * y2);
  return {
    pts: { O: [0, 0], A: [-h1, y1], B: [h1, y1], C: [-h2, y2], D: [h2, y2], P: [0, y1], Q: [0, y2] },
    segs: [
      { p: ["A", "B"], bold: true, label: o.l1 },
      { p: ["C", "D"], bold: true, label: o.l2 },
      { p: ["O", "P"], dash: true, label: o.d1 },
      { p: ["O", "Q"], dash: true, label: o.d2 },
    ],
    noLabel: ["P", "Q"],
    labels: o.dist ? [{ x: 0.2, y: (y1 + y2) / 2, t: o.dist, dx: 18, color: "#15803d" }] : [],
    caption: o.cap,
  };
};

/** Triangle ABC inscribed in its circle: kind = acute | obtuse | right (centre O is drawn). */
export const triCircle = (kind: "acute" | "obtuse" | "right" = "acute", cap?: string): GeoSpec => {
  const v = kind === "acute" ? [90, 215, 335] : kind === "obtuse" ? [270, 205, 335] : [90, 180, 0];
  return {
    pts: { A: ang(v[0]), B: ang(v[1]), C: ang(v[2]), O: [0, 0] },
    polys: [{ p: ["A", "B", "C"] }],
    segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }],
    caption: cap,
  };
};

/** Circumcircle construction: perpendicular bisectors of AB and BC meet at the circumcentre O. */
export const circumcircle = (cap?: string): GeoSpec => {
  const A = ang(95), B = ang(215), C = ang(335);
  const mid = (a: number, b: number): [number, number] => [(Math.cos(rad(a)) + Math.cos(rad(b))) / 2, (Math.sin(rad(a)) + Math.sin(rad(b))) / 2];
  const mAB = mid(95, 215), mBC = mid(215, 335), mCA = mid(335, 95);
  return {
    pts: { A, B, C, O: [0, 0], _m1: mAB, _m2: mBC, _m3: mCA, _p1: [mAB[0] * 1.5, mAB[1] * 1.5], _p2: [mBC[0] * 1.5, mBC[1] * 1.5], _p3: [mCA[0] * 1.5, mCA[1] * 1.5] },
    polys: [{ p: ["A", "B", "C"] }],
    segs: [
      { p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true },
      { p: ["O", "_p1"], dash: true, color: "#ea580c" }, { p: ["O", "_p2"], dash: true, color: "#ea580c" }, { p: ["O", "_p3"], dash: true, color: "#ea580c" },
    ],
    ticks: [{ p: ["O", "A"], n: 1 }, { p: ["O", "B"], n: 1 }, { p: ["O", "C"], n: 1 }],
    caption: cap,
  };
};

/** Two points A, B with the perpendicular bisector and three circles through them. */
export const twoPointCircles = (cap?: string): GeoSpec => ({
  noMain: true,
  w: 260, h: 262, scale: 68,
  pts: { A: [-0.6, 0], B: [0.6, 0], M: [0, 0], K: [0, 0.7], L: [0, -0.8], _t: [0, 1.75], _b: [0, -1.75] },
  circles: [{ c: [0, 0], r: 0.6, color: "#2563eb" }, { c: [0, 0.7], r: Math.hypot(0.6, 0.7), color: "#15803d" }, { c: [0, -0.8], r: Math.hypot(0.6, 0.8), color: "#ea580c" }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["_t", "_b"], dash: true, color: "#475569" }],
  labelAway: "M",
  caption: cap,
});

/** Chords AB and CD intersecting at P inside the circle. */
export const intersectChords = (o: { equal?: boolean; labels?: string[]; cap?: string } = {}): GeoSpec => ({
  pts: { A: ang(200), B: ang(20), C: ang(120), D: ang(300), P: [0, 0] },
  segs: [
    { p: ["A", "B"], bold: true, label: o.labels?.[0] },
    { p: ["C", "D"], bold: true, label: o.labels?.[1] },
  ],
  labels: o.labels && o.labels.length > 2 ? [{ x: 0.1, y: -0.18, t: o.labels[2], color: "#15803d" }] : [],
  caption: o.cap,
});

/** Regular polygon inscribed in the circle (n sides), centre O shown. */
export const regularPoly = (n = 6, o: { spokes?: boolean; cap?: string; r?: string; side?: string } = {}): GeoSpec => {
  const names = "ABCDEFGH".split("").slice(0, n);
  const pts: GeoSpec["pts"] = { O: [0, 0] };
  names.forEach((nm, i) => { pts[nm] = ang(90 + (360 / n) * i); });
  return {
    pts,
    polys: [{ p: names }],
    segs: [
      ...names.map((nm, i) => ({ p: [nm, names[(i + 1) % n]] as [string, string], bold: true, label: i === 0 ? o.side : undefined })),
      ...(o.spokes ? names.map((nm, i) => ({ p: ["O", nm] as [string, string], dash: true, label: i === 0 ? o.r : undefined })) : []),
    ],
    caption: o.cap,
  };
};

/** A rectangle inscribed in a circle, diagonals through the centre. */
export const rectInscribed = (cap?: string): GeoSpec => ({
  pts: { A: ang(145), B: ang(215), C: ang(325), D: ang(35), O: [0, 0] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }, { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }],
  caption: cap,
});

/** Isosceles triangle ABC (AB = AC) in a circle, with the altitude from A. */
export const isoInscribed = (cap?: string): GeoSpec => ({
  pts: { A: ang(90), B: ang(215), C: ang(325), D: [0, Math.sin(rad(215))], O: [0, 0] },
  polys: [{ p: ["A", "B", "C"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["A", "D"], dash: true }],
  ticks: [{ p: ["A", "B"], n: 1 }, { p: ["A", "C"], n: 1 }],
  rights: [["A", "D", "B"]],
  caption: cap,
});

/** Chord AB with the isosceles triangle OAB, optionally with the equal base angles marked. */
export const chordTriangle = (o: { angle?: string; base?: string; cap?: string; rLabel?: string } = {}): GeoSpec => ({
  pts: { O: [0, 0], A: ang(215), B: ang(325) },
  polys: [{ p: ["O", "A", "B"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["O", "A"], label: o.rLabel }, { p: ["O", "B"], label: o.rLabel }],
  ticks: [{ p: ["O", "A"] }, { p: ["O", "B"] }],
  angs: [
    ...(o.angle ? [{ at: "O", from: "A", to: "B", label: o.angle, r: 20 }] : []),
    ...(o.base ? [{ at: "A", from: "B", to: "O", label: o.base, r: 24, color: "#15803d" }, { at: "B", from: "O", to: "A", label: o.base, r: 24, color: "#15803d" }] : []),
  ],
  caption: o.cap,
});

/** Concyclic points: segment AB seen at equal angles from C and D on the same side. */
export const sameSegment = (o: { ang?: string; cap?: string; showCircle?: boolean; withO?: boolean } = {}): GeoSpec => ({
  pts: { A: ang(215), B: ang(325), C: ang(80), D: ang(135), ...(o.withO ? { O: [0, 0] as [number, number] } : {}) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["C", "A"] }, { p: ["C", "B"] }, { p: ["D", "A"] }, { p: ["D", "B"] }],
  angs: [
    { at: "C", from: "A", to: "B", label: o.ang, r: 24 },
    { at: "D", from: "A", to: "B", label: o.ang, r: 24, color: "#2563eb" },
  ],
  noMain: o.showCircle === false,
  caption: o.cap,
});

/** Major and minor arc between A and B. */
export const arcs = (o: { cap?: string; minor?: string; major?: string } = {}): GeoSpec => ({
  pts: { O: [0, 0], A: ang(30), B: ang(150) },
  arcs: [{ a1: 30, a2: 150, color: "#ea580c" }, { a1: 150, a2: 390, color: "#2563eb" }],
  segs: [{ p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["A", "B"] }],
  labels: [
    { x: 0, y: 1.2, t: o.minor || "minor arc", color: "#ea580c" },
    { x: 0, y: -1.25, t: o.major || "major arc", color: "#2563eb" },
  ],
  caption: o.cap,
});

/** A chord and a diameter drawn from the same end, to show the diameter is the longest chord. */
export const diameterLongest = (cap?: string): GeoSpec => ({
  pts: { O: [0, 0], A: ang(160), B: ang(20), C: ang(340), P: ang(250) },
  segs: [{ p: ["A", "C"], bold: true }, { p: ["A", "B"] }, { p: ["A", "P"] }, { p: ["P", "C"], dash: true }],
  caption: cap,
});

/** Perpendicular bisector of a chord passing through the centre. */
export const bisectorCentre = (cap?: string): GeoSpec => ({
  pts: { O: [0, 0], A: ang(215), B: ang(325), M: [0, Math.sin(rad(215))], _t: [0, 1], _b: [0, -1] },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["_t", "_b"], dash: true, color: "#ea580c", ext: 0.2 }],
  ticks: [{ p: ["A", "M"] }, { p: ["M", "B"] }],
  rights: [["O", "M", "B"]],
  caption: cap,
});

/** Circle with two radii and a chord: used for symmetry and rotation. */
export const symmetry = (cap?: string): GeoSpec => ({
  pts: { O: [0, 0], _a: ang(90), _b: ang(270), _c: ang(30), _d: ang(210), _e: ang(150), _f: ang(330) },
  segs: [{ p: ["_a", "_b"], dash: true, color: "#ea580c" }, { p: ["_c", "_d"], dash: true, color: "#2563eb" }, { p: ["_e", "_f"], dash: true, color: "#15803d" }],
  caption: cap,
});

/** Circle with named parts: centre, radius, chord, diameter, arc. */
export const partsOfCircle = (cap?: string): GeoSpec => ({
  pts: { O: [0, 0], A: ang(30), B: ang(210), C: ang(130), D: ang(250), E: ang(330) },
  segs: [{ p: ["A", "B"], bold: true, label: "diameter" }, { p: ["C", "D"], label: "chord" }, { p: ["O", "E"], dash: true, label: "radius", color: "#ea580c" }],
  arcs: [{ a1: 250, a2: 330, color: "#ea580c" }],
  labelAway: "O",
  caption: cap,
});

/** The figure for the right-angle (semicircle) proof: triangle ACB with the radius OC. */
export const semicircleProof = (cap?: string): GeoSpec => ({
  pts: { A: ang(180), B: ang(0), C: ang(65), O: [0, 0] },
  polys: [{ p: ["A", "C", "B"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["O", "C"], dash: true }],
  ticks: [{ p: ["O", "A"] }, { p: ["O", "B"] }, { p: ["O", "C"] }],
  angs: [{ at: "A", from: "B", to: "C", label: "a", r: 24 }, { at: "B", from: "A", to: "C", label: "b", r: 24 }],
  caption: cap,
});

/** Proof of the opposite angles: the four isosceles triangles at O (p, q, u, v are the base angles). */
export const cyclicProof = (cap?: string): GeoSpec => ({
  pts: { A: ang(105), B: ang(205), C: ang(315), D: ang(30), O: [0, 0] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [
    { p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true },
    { p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["O", "C"], dash: true }, { p: ["O", "D"], dash: true },
  ],
  angs: [
    { at: "A", from: "O", to: "D", label: "p", r: 24, color: "#ea580c" }, { at: "A", from: "O", to: "B", label: "q", r: 24, color: "#2563eb" },
    { at: "B", from: "O", to: "A", label: "q", r: 24, color: "#2563eb" }, { at: "B", from: "O", to: "C", label: "u", r: 24, color: "#15803d" },
    { at: "C", from: "O", to: "B", label: "u", r: 24, color: "#15803d" }, { at: "C", from: "O", to: "D", label: "v", r: 24, color: "#7c3aed" },
    { at: "D", from: "O", to: "C", label: "v", r: 24, color: "#7c3aed" }, { at: "D", from: "O", to: "A", label: "p", r: 24, color: "#ea580c" },
  ],
  caption: cap,
});

/** Theorem 9, case 1: the line DC extended passes through the arc AFB. */
export const th9a = (cap?: string): GeoSpec => ({
  pts: { C: [0, 0], A: ang(215), B: ang(325), D: ang(95), E: ang(275), F: ang(245) },
  segs: [{ p: ["C", "A"] }, { p: ["C", "B"] }, { p: ["D", "A"], bold: true }, { p: ["D", "B"], bold: true }, { p: ["D", "E"], dash: true }],
  arcs: [{ a1: 215, a2: 325 }],
  caption: cap,
});

/** Theorem 9, case 2: DC extended meets the circle at E outside the arc AFB. */
export const th9b = (cap?: string): GeoSpec => ({
  pts: { C: [0, 0], A: ang(215), B: ang(285), D: ang(150), E: ang(330) },
  segs: [{ p: ["C", "A"] }, { p: ["C", "B"] }, { p: ["D", "A"], bold: true }, { p: ["D", "B"], bold: true }, { p: ["D", "E"], dash: true }],
  arcs: [{ a1: 215, a2: 285 }],
  caption: cap,
});

/** Concyclic proof: circle through A, B, C; D is outside (or inside) on the line AE where E is on the circle. */
export const th10 = (outside = true, cap?: string): GeoSpec => {
  const A = ang(205), B = ang(335), C = ang(95), E = ang(140);
  const a = [Math.cos(rad(205)), Math.sin(rad(205))], e = [Math.cos(rad(140)), Math.sin(rad(140))];
  const k = outside ? 1.45 : 0.62;
  const D: [number, number] = [a[0] + k * (e[0] - a[0]), a[1] + k * (e[1] - a[1])];
  return {
    pts: { A, B, C, D, E },
    segs: [{ p: ["A", "B"], bold: true }, { p: ["C", "A"] }, { p: ["C", "B"] }, { p: ["A", outside ? "D" : "E"] }, { p: ["B", "D"] }, { p: ["B", "E"], dash: true }],
    caption: cap,
  };
};

/** The figure with 100 degrees at D and x at B (Exercise 5.6, question 3). */
export const findX = (cap?: string): GeoSpec => ({
  pts: { A: ang(180), B: ang(275), C: ang(5), D: ang(90) },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }],
  angs: [{ at: "D", from: "C", to: "A", label: "100°", r: 20 }, { at: "B", from: "A", to: "C", label: "x", r: 20, color: "#2563eb" }],
  caption: cap,
});

/** Equal chords AB and DE, joined to the centre, with the equal angles at O marked. */
export const equalChordsAngles = (o: { a?: string; b?: string; cap?: string; len?: string } = {}): GeoSpec => ({
  pts: { O: [0, 0], A: ang(205), B: ang(335), D: ang(25), E: ang(155) },
  segs: [
    { p: ["A", "B"], bold: true, label: o.len }, { p: ["D", "E"], bold: true, label: o.len },
    { p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["O", "D"], dash: true }, { p: ["O", "E"], dash: true },
  ],
  angs: [
    { at: "O", from: "A", to: "B", label: o.a, r: 20 },
    { at: "O", from: "D", to: "E", label: o.b ?? o.a, r: 20, color: "#2563eb" },
  ],
  caption: o.cap,
});

/** Converse of the cyclic quadrilateral theorem: circle through A, B, D with C outside, CD cutting the circle again at E. */
export const converseCyclic = (cap?: string): GeoSpec => {
  const D = [Math.cos(rad(340)), Math.sin(rad(340))], E = [Math.cos(rad(285)), Math.sin(rad(285))];
  const C: [number, number] = [E[0] + 0.7 * (E[0] - D[0]), E[1] + 0.7 * (E[1] - D[1])];
  return {
    h: 250,
    pts: { A: ang(100), B: ang(205), D: ang(340), E: ang(285), C },
    segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }, { p: ["B", "E"], dash: true }],
    caption: cap,
  };
};

/** Two circles meeting at P and Q: the common chord is perpendicular to the line of centres. */
export const commonChord = (o: { cap?: string; len?: string; r1?: string; r2?: string } = {}): GeoSpec => {
  const d = 1.0, r1 = 1, r2 = 1.25;
  // circle 1 centred at (-d/2... ) kept simple: centres O1 and O2 on the x-axis
  const x1 = -0.55, x2 = 0.7;
  const a = (r1 * r1 - r2 * r2 + (x2 - x1) * (x2 - x1)) / (2 * (x2 - x1));
  const px = x1 + a, py = Math.sqrt(r1 * r1 - a * a);
  void d;
  return {
    w: 280, h: 230, scale: 70, noMain: true,
    pts: { O1: [x1, 0], O2: [x2, 0], P: [px, py], Q: [px, -py], M: [px, 0] },
    circles: [{ c: [x1, 0], r: r1, color: "#2563eb" }, { c: [x2, 0], r: r2, color: "#ea580c" }],
    segs: [{ p: ["P", "Q"], bold: true, label: o.len }, { p: ["O1", "O2"], dash: true }, { p: ["O1", "P"], dash: true, label: o.r1 }, { p: ["O2", "P"], dash: true, label: o.r2 }],
    rights: [["O1", "M", "P"]],
    labelAway: "M",
    caption: o.cap,
  };
};

/** Chords AC and BD perpendicular to the diameter PQ; M, N are the midpoints of AB and CD. */
export const perpToDiameter = (cap?: string): GeoSpec => ({
  pts: { P: ang(180), Q: ang(0), O: [0, 0], A: ang(120), B: ang(30), C: ang(240), D: ang(330), M: [(Math.cos(rad(120)) + Math.cos(rad(30))) / 2, (Math.sin(rad(120)) + Math.sin(rad(30))) / 2], N: [(Math.cos(rad(240)) + Math.cos(rad(330))) / 2, (Math.sin(rad(240)) + Math.sin(rad(330))) / 2] },
  segs: [{ p: ["P", "Q"], bold: true }, { p: ["A", "C"], bold: true }, { p: ["B", "D"], bold: true }, { p: ["A", "B"] }, { p: ["C", "D"] }, { p: ["M", "N"], dash: true, color: "#ea580c" }],
  labelAway: "O",
  caption: cap,
});

/** Triangle with a circle through its vertices and the radii, for isosceles-triangle problems. */
export const radiiTriangle = (cap?: string): GeoSpec => ({
  pts: { O: [0, 0], A: ang(100), B: ang(220), C: ang(320) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }, { p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["O", "C"], dash: true }],
  caption: cap,
});

/** Hexagon with a side, the radius and the distance of the side from the centre. */
export const hexagonSide = (cap?: string): GeoSpec => {
  const a = ang(60), b = ang(120);
  return {
    pts: { O: [0, 0], A: a, B: b, M: [0, Math.sin(rad(60))], C: ang(180), D: ang(240), E: ang(300), F: ang(0) },
    polys: [{ p: ["A", "B", "C", "D", "E", "F"] }],
    segs: [{ p: ["A", "B"], bold: true, label: "r" }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "E"], bold: true }, { p: ["E", "F"], bold: true }, { p: ["F", "A"], bold: true }, { p: ["O", "A"], dash: true, label: "r" }, { p: ["O", "B"], dash: true }, { p: ["O", "M"], dash: true, color: "#15803d" }],
    rights: [["O", "M", "A"]],
    caption: cap,
  };
};

/** Two concentric circles (outer radius 1, inner radius k) with a chord of the outer circle at distance dy from O. */
export const concentric = (o: { k?: number; dy?: number; cap?: string; len?: string } = {}): GeoSpec => {
  const k = o.k ?? 5 / 13, dy = o.dy ?? 3 / 13;
  const h1 = Math.sqrt(1 - dy * dy), h2 = Math.sqrt(Math.max(0, k * k - dy * dy));
  return {
    pts: { O: [0, 0], A: [-h1, -dy], B: [h1, -dy], C: [-h2, -dy], D: [h2, -dy], M: [0, -dy] },
    circles: [{ c: [0, 0], r: k, color: "#2563eb" }],
    segs: [{ p: ["A", "B"], bold: true, label: o.len }, { p: ["O", "M"], dash: true }],
    rights: [["O", "M", "B"]],
    noLabel: ["M"],
    caption: o.cap,
  };
};

/** Triangle ABC in its circle with the centre joined to all three vertices (central angles drawn). */
export const triCentral = (o: { a?: number; b?: number; c?: number; ang?: [string, string, string]; cap?: string } = {}): GeoSpec => {
  const a = o.a ?? 90, b = o.b ?? 190, c = o.c ?? 320;
  return {
    pts: { A: ang(a), B: ang(b), C: ang(c), O: [0, 0] },
    polys: [{ p: ["A", "B", "C"] }],
    segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }, { p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["O", "C"], dash: true }],
    angs: o.ang ? [{ at: "O", from: "A", to: "B", label: o.ang[0], r: 18 }, { at: "O", from: "B", to: "C", label: o.ang[1], r: 18, color: "#2563eb" }, { at: "O", from: "C", to: "A", label: o.ang[2], r: 18, color: "#15803d" }] : [],
    caption: o.cap,
  };
};
