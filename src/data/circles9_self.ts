import type { QuizQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import * as F from "./circles9Figs";

// Self Assessment: Class IX Maths, Circles. 100 multiple-choice questions, 60 minutes.
// Everything stays inside the chapter (chords and the centre, angles in a circle, cyclic quadrilaterals, circles
// through points). The questions ask for reasoning, not for facts to be repeated. 28 questions carry a figure
// (figures are not drawn to scale) and 16 are assertion and reasoning questions.
// Each ordinary question is written with the right answer first; the right answer is then placed at the
// position listed in POSITION so that the answers are spread out.

const POSITION = [3, 2, 0, 2, 2, 0, 0, 1, 1, 3, 0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 3, 1, 2, 0, 1, 2, 3, 2, 1, 2, 3, 1, 2, 2, 1, 2, 0, 3, 2, 2, 3, 1, 0, 2, 2, 3, 2, 1, 3, 0, 3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 3, 0, 1, 0, 3, 3, 2, 2, 0, 0, 3, 3, 0, 0, 2, 0, 3, 2, 3, 0, 2, 0];
let used = 0;

type Item = Omit<QuizQuestion, "id">;
const q = (question: string, right: string, wrong: string[], explanation: string, figure?: GeoSpec): Item => {
  const at = POSITION[used++];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { question, options, correctAnswer: at, explanation, ...(figure ? { figure } : {}) };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
const ar = (a: string, r: string, correctAnswer: number, explanation: string): Item => ({ question: `Assertion (A): ${a} Reason (R): ${r}`, options: AR, correctAnswer, explanation });

const pt = (deg: number, r = 1) => ({ a: deg, r });
const rad = (d: number) => (d * Math.PI) / 180;
// an angle label placed just outside the circle, beside the vertex at `deg` (shifted a little so it does not sit on the vertex letter)
const out = (deg: number, t: string, color?: string, shift = 20, k = 1.3) => ({ x: k * Math.cos(rad(deg + shift)), y: k * Math.sin(rad(deg + shift)), t, ...(color ? { color } : {}) });
const wide = (s: GeoSpec): GeoSpec => ({ ...s, w: 330, h: 300, scale: 100 });
const onC = (deg: number): [number, number] => [Math.cos(rad(deg)), Math.sin(rad(deg))];

// the ready-made cyclic quadrilateral with its angle arcs drawn and the angle labels placed beside the vertices
const cq = (o: { va?: number[]; ext?: string }, marks: [number, string, string | undefined, string, number][]): GeoSpec => {
  const s = wide(F.cyclicQuad({ va: o.va, ext: o.ext }));
  const from: Record<string, [string, string]> = { A: ["D", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "A"] };
  s.angs = [...(s.angs || []), ...marks.map(([, , color, v]) => ({ at: v, from: from[v][0], to: from[v][1], r: 22, ...(color ? { color } : {}) }))];
  s.labels = [...(s.labels || []), ...marks.map(([deg, t, color, , shift]) => out(deg, t, color, shift))];
  return s;
};

// ── figures that the ready-made builders do not cover ──
const figInscribed = (): GeoSpec => wide({
  pts: { O: [0, 0], A: pt(215), B: pt(325), P: pt(90) },
  segs: [{ p: ["O", "A"] }, { p: ["O", "B"] }, { p: ["P", "A"], bold: true }, { p: ["P", "B"], bold: true }],
  arcs: [{ a1: 215, a2: 325 }],
  angs: [{ at: "O", from: "A", to: "B", label: "(3x + 20)°", r: 26 }, { at: "P", from: "A", to: "B", r: 30, color: "#2563eb" }],
  labels: [out(90, "(x + 30)°", "#2563eb", -22, 1.22)],
});
const figSemi = (): GeoSpec => ({
  pts: { A: pt(180), B: pt(0), C: pt(75), O: [0, 0] },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"] }, { p: ["B", "C"] }],
  rights: [["A", "C", "B"]],
  angs: [{ at: "A", from: "B", to: "C", label: "2x+5°", r: 16 }, { at: "B", from: "A", to: "C", label: "3x−10°", r: 24 }],
});
const figConcentric = (): GeoSpec => {
  const dy = 0.42, k = 0.64, h1 = Math.sqrt(1 - dy * dy), h2 = Math.sqrt(k * k - dy * dy);
  return {
    pts: { O: [0, 0], A: [-h1, dy], B: [-h2, dy], C: [h2, dy], D: [h1, dy] },
    circles: [{ c: [0, 0], r: k, color: "#2563eb" }],
    segs: [{ p: ["A", "D"], bold: true }],
    labels: [{ x: 0, y: 0.78, t: "AD = 20 cm" }, { x: 0, y: -0.2, t: "BC = 12 cm", color: "#2563eb" }],
  };
};
const figSameSegment = (): GeoSpec => wide({
  pts: { A: pt(200), B: pt(340), C: pt(60), D: pt(125) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"] }, { p: ["B", "C"] }, { p: ["A", "D"] }, { p: ["B", "D"] }],
  angs: [{ at: "C", from: "A", to: "B", r: 24 }, { at: "D", from: "A", to: "B", r: 30, color: "#2563eb" }],
  labels: [out(60, "(2x + 5)°", undefined, -24), out(125, "(3x − 15)°", "#2563eb", 28)],
});
const figRadii = (): GeoSpec => ({
  pts: { O: [0, 0], A: pt(210), B: pt(90), C: pt(350) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "A"], bold: true }, { p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["O", "C"], dash: true }],
  angs: [{ at: "A", from: "B", to: "O", label: "30°", r: 26 }, { at: "C", from: "B", to: "O", label: "40°", r: 26, color: "#2563eb" }],
});
const figCyclicDiag = (): GeoSpec => {
  const s = F.cyclicQuad({ diag: true });
  s.angs = [...(s.angs || []), { at: "B", from: "D", to: "C", label: "50°", r: 26 }, { at: "A", from: "B", to: "C", label: "60°", r: 30, color: "#2563eb" }];
  return s;
};
const figPentagon = (): GeoSpec => {
  const names = "ABCDE".split("");
  const pts: GeoSpec["pts"] = {};
  names.forEach((n, i) => { pts[n] = pt(90 + 72 * i); });
  return {
    pts,
    polys: [{ p: names }],
    segs: [...names.map((n, i) => ({ p: [n, names[(i + 1) % 5]] as [string, string], bold: true })), { p: ["A", "C"], dash: true }],
    angs: [{ at: "C", from: "A", to: "B", label: "?", r: 24 }],
  };
};
const figRect = (): GeoSpec => ({
  pts: { A: [-0.882, 0.47], B: [-0.882, -0.47], C: [0.882, -0.47], D: [0.882, 0.47] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true, label: "8 cm" }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true, label: "15 cm" }, { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }],
});
const figDiameterTwo = (): GeoSpec => ({
  pts: { A: pt(180), B: pt(0), C: pt(70), D: pt(100), O: [0, 0] },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "D"] }, { p: ["D", "C"] }, { p: ["C", "B"] }, { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }],
  angs: [{ at: "A", from: "C", to: "B", label: "35°", r: 34 }, { at: "B", from: "D", to: "A", label: "40°", r: 30, color: "#2563eb" }, { at: "D", from: "A", to: "C", label: "?", r: 18, color: "#15803d" }],
});
const figChordRadius = (): GeoSpec => wide({
  pts: { O: [0, 0], A: pt(250), B: pt(20), C: pt(135) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["O", "A"], dash: true }, { p: ["O", "B"], dash: true }, { p: ["C", "A"] }, { p: ["C", "B"] }],
  angs: [{ at: "A", from: "B", to: "O", r: 24 }],
  labels: [out(250, "25°", undefined, 26)],
});
const figIsoRadii = (): GeoSpec => ({
  pts: { O: [0, 0], A: pt(90), B: pt(200), C: pt(340) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["O", "B"], dash: true }, { p: ["O", "C"], dash: true }],
  ticks: [{ p: ["A", "B"], n: 1 }, { p: ["A", "C"], n: 1 }],
  angs: [{ at: "B", from: "A", to: "C", label: "55°", r: 28 }],
});
const figDiamQuad = (): GeoSpec => ({
  pts: { A: pt(180), B: pt(0), C: pt(310), D: pt(235), O: [0, 0] },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }, { p: ["A", "C"], dash: true }],
  angs: [{ at: "D", from: "C", to: "A", label: "115°", r: 22 }],
});
const figTwoDiameters = (): GeoSpec => ({
  pts: { A: pt(105), B: pt(215), C: pt(285), D: pt(35), O: [0, 0] },
  polys: [{ p: ["A", "B", "C", "D"] }],
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["D", "A"], bold: true }, { p: ["A", "C"], dash: true }, { p: ["B", "D"], dash: true }],
  angs: [{ at: "B", from: "A", to: "D", label: "35°", r: 28 }],
});
const figThreeChords = (): GeoSpec => ({
  pts: { A: pt(200), B: pt(140), C: pt(80), D: pt(20) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["B", "C"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["A", "C"], dash: true }],
  ticks: [{ p: ["A", "B"], n: 1 }, { p: ["B", "C"], n: 1 }, { p: ["C", "D"], n: 1 }],
  angs: [{ at: "A", from: "B", to: "C", label: "30°", r: 26 }],
});
const figRightLegs = (): GeoSpec => ({
  pts: { A: pt(90), B: pt(180), C: pt(0), O: [0, 0] },
  polys: [{ p: ["A", "B", "C"] }],
  segs: [{ p: ["A", "B"], bold: true, label: "20 cm" }, { p: ["A", "C"], bold: true, label: "21 cm" }, { p: ["B", "C"], bold: true }],
  rights: [["B", "A", "C"]],
});
const figPerpDiameter = (): GeoSpec => ({
  pts: { A: pt(180), B: pt(0), O: [0, 0], M: [8 / 17, 0], C: [8 / 17, 15 / 17], D: [8 / 17, -15 / 17] },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["C", "D"], bold: true }],
  rights: [["O", "M", "C"]],
  labels: [{ x: 0.235, y: -0.13, t: "8 cm", color: "#15803d" }],
});
const figEqualMidpoints = (): GeoSpec => {
  const mid = (a: number, b: number): [number, number] => [(Math.cos(rad(a)) + Math.cos(rad(b))) / 2, (Math.sin(rad(a)) + Math.sin(rad(b))) / 2];
  return {
    pts: { O: [0, 0], A: pt(100), B: pt(180), C: pt(0), D: pt(80), M: mid(100, 180), N: mid(0, 80) },
    segs: [{ p: ["A", "B"], bold: true }, { p: ["C", "D"], bold: true }, { p: ["O", "M"], dash: true }, { p: ["O", "N"], dash: true }, { p: ["M", "N"], dash: true, color: "#ea580c" }],
    rights: [["O", "M", "A"], ["O", "N", "C"]],
    angs: [{ at: "M", from: "O", to: "N", label: "40°", r: 22 }],
  };
};
const figOppositeArcs = (): GeoSpec => wide({
  pts: { A: pt(200), B: pt(340), C: pt(90), D: pt(270) },
  segs: [{ p: ["A", "B"], bold: true }, { p: ["A", "C"] }, { p: ["B", "C"] }, { p: ["A", "D"] }, { p: ["B", "D"] }],
  angs: [{ at: "C", from: "A", to: "B", r: 24 }, { at: "D", from: "A", to: "B", r: 24, color: "#2563eb" }],
  labels: [out(90, "(2x − 10)°", undefined, 24), out(270, "(3x + 20)°", "#2563eb", 24)],
});
const figConcyclicTest = (): GeoSpec => ({
  noMain: true,
  pts: { P: [-0.9, -0.55], Q: [0.85, -0.7], R: [0.95, 0.4], S: [-0.45, 0.85] },
  polys: [{ p: ["P", "Q", "R", "S"] }],
  segs: [{ p: ["P", "Q"], bold: true }, { p: ["Q", "R"], bold: true }, { p: ["R", "S"], bold: true }, { p: ["S", "P"], bold: true }],
  angs: [{ at: "Q", from: "P", to: "R", label: "(2x + 10)°", r: 30 }, { at: "S", from: "R", to: "P", label: "(x + 50)°", r: 30, color: "#2563eb" }],
});
const figSameSideTest = (): GeoSpec => ({
  noMain: true,
  pts: { A: [-0.85, -0.45], D: [0.85, -0.45], B: [-0.3, 0.55], C: [0.45, 0.75] },
  segs: [{ p: ["A", "D"], bold: true }, { p: ["A", "B"] }, { p: ["B", "D"] }, { p: ["A", "C"] }, { p: ["C", "D"] }],
  angs: [{ at: "B", from: "A", to: "D", label: "40°", r: 26 }, { at: "C", from: "A", to: "D", label: "40°", r: 26, color: "#2563eb" }],
});

// ── questions with a figure (28) ──
const WITH_FIGURE: Item[] = [
  q("In the figure, O is the centre of the circle. ∠AOB = (3x + 20)° and ∠APB = (x + 30)°. The measure of ∠AOB is", "140°", ["100°", "120°", "160°"],
    "The angle at the centre is twice the angle at the circle on the same arc: 3x + 20 = 2(x + 30), so x = 40 and ∠AOB = 140°.", figInscribed()),
  q("AB is a diameter of the circle and C is a point on it. ∠CAB = (2x + 5)° and ∠CBA = (3x − 10)°. The measure of ∠CBA is", "47°", ["43°", "38°", "52°"],
    "∠ACB = 90° (angle in a semicircle). So (2x + 5) + (3x − 10) = 90, which gives x = 19. ∠CBA = 3 × 19 − 10 = 47°.", figSemi()),
  q("ABCD is a cyclic quadrilateral with ∠A = (2x + 10)° and ∠C = (3x − 20)°. The measure of ∠C is", "94°", ["86°", "90°", "98°"],
    "Opposite angles add up to 180°: 5x − 10 = 180, so x = 38. ∠C = 3 × 38 − 20 = 94° (and ∠A = 86°).", cq({}, [[100, "(2x + 10)°", undefined, "A", 24], [305, "(3x − 20)°", undefined, "C", -24]])),
  q("In the cyclic quadrilateral ABCD, side BC is extended to E. ∠DCE = (4x − 12)° and ∠BAD = (2x + 20)°. The measure of ∠BAD is", "52°", ["36°", "64°", "128°"],
    "The exterior angle of a cyclic quadrilateral equals the interior opposite angle: 4x − 12 = 2x + 20, so x = 16 and ∠BAD = 52°.", cq({ ext: "(4x − 12)°" }, [[100, "(2x + 20)°", undefined, "A", 24]])),
  q("A chord AB of length 48 cm is drawn in a circle of radius 25 cm. The distance d of the chord from the centre O is", "7 cm", ["5 cm", "9 cm", "14 cm"],
    "The perpendicular from O bisects the chord, so the half chord is 24 cm. d = √(25² − 24²) = √49 = 7 cm.", F.chordDist({ len: "48 cm", r: "25 cm", d: "d", showR: true, dy: 7 / 25 })),
  q("Two parallel chords AB = 24 cm and CD = 10 cm are drawn on the same side of the centre of a circle of radius 13 cm. The distance between the chords is", "7 cm", ["5 cm", "12 cm", "17 cm"],
    "AB is √(13² − 12²) = 5 cm from the centre and CD is √(13² − 5²) = 12 cm from the centre. On the same side the distance between them is 12 − 5 = 7 cm (it would be 17 cm on opposite sides).", F.parallelChords({ same: true, l1: "24 cm", l2: "10 cm", y1: 5 / 13, y2: 12 / 13, dist: "?" })),
  q("Two circles of radii 13 cm and 20 cm meet at P and Q, and PQ = 24 cm. The centres O1 and O2 lie on opposite sides of PQ. The distance O1O2 is", "21 cm", ["11 cm", "29 cm", "33 cm"],
    "The line of centres bisects PQ at right angles, so each half chord is 12 cm. O1 is √(13² − 12²) = 5 cm from PQ and O2 is √(20² − 12²) = 16 cm from PQ. O1O2 = 5 + 16 = 21 cm.", F.commonChord({ len: "24 cm", r1: "13 cm", r2: "20 cm" })),
  q("Two circles have the same centre O. A line meets the larger circle at A and D and the smaller circle at B and C, with AD = 20 cm and BC = 12 cm. The length AB is", "4 cm", ["2 cm", "6 cm", "8 cm"],
    "The perpendicular from O bisects both chords, so the midpoint of AD and of BC is the same point M. AM = 10 cm and BM = 6 cm, so AB = 10 − 6 = 4 cm.", figConcentric()),
  q("Chords AB and DE of a circle are equal. ∠AOB = (3x + 10)° and ∠DOE = (5x − 30)°. The measure of ∠AOB is", "70°", ["50°", "60°", "80°"],
    "Equal chords subtend equal angles at the centre: 3x + 10 = 5x − 30, so x = 20 and ∠AOB = 70°.", F.equalChordsAngles({ a: "(3x + 10)°", b: "(5x − 30)°" })),
  q("C and D lie on the same side of the chord AB. ∠ACB = (2x + 5)° and ∠ADB = (3x − 15)°. The measure of ∠ACB is", "45°", ["35°", "55°", "60°"],
    "Angles in the same segment of a circle are equal: 2x + 5 = 3x − 15, so x = 20 and ∠ACB = 45°.", figSameSegment()),
  q("O is the centre of the circle through A, B and C. ∠OAB = 30° and ∠OCB = 40°. The measure of ∠OAC is", "20°", ["25°", "30°", "35°"],
    "OA = OB, so ∠AOB = 180° − 60° = 120°. OB = OC, so ∠BOC = 180° − 80° = 100°. Then ∠AOC = 360° − 120° − 100° = 140°. OA = OC, so ∠OAC = (180° − 140°) ÷ 2 = 20°.", figRadii()),
  q("In the cyclic quadrilateral ABCD, ∠DBC = 50° and ∠BAC = 60°. The measure of ∠BAD is", "110°", ["100°", "120°", "130°"],
    "∠BDC = ∠BAC = 60° (same segment BC). In triangle BCD, ∠BCD = 180° − 50° − 60° = 70°. Then ∠BAD = 180° − 70° = 110°.", figCyclicDiag()),
  q("A regular pentagon ABCDE is inscribed in a circle. The measure of ∠ACB is", "36°", ["30°", "54°", "72°"],
    "Each side of the pentagon subtends 360° ÷ 5 = 72° at the centre. ∠ACB stands on the side AB, so it is half of that: 36°.", figPentagon()),
  q("A rectangle ABCD with AB = 8 cm and AD = 15 cm is inscribed in a circle. The radius of the circle is", "8.5 cm", ["8 cm", "11.5 cm", "17 cm"],
    "∠A = 90°, so BD is a diameter. BD = √(8² + 15²) = 17 cm, so the radius is 8.5 cm.", figRect()),
  q("AB is a diameter of the circle. C and D are on the same semicircle, with ∠CAB = 35° and ∠DBA = 40°. The measure of ∠ADC is", "125°", ["115°", "105°", "145°"],
    "Arc CB = 2 × 35° = 70° and arc AD = 2 × 40° = 80°, so arc DC = 180° − 70° − 80° = 30°. Then ∠DBC = 15° and ∠ABC = 40° + 15° = 55°. ADCB is cyclic, so ∠ADC = 180° − 55° = 125°.", figDiameterTwo()),
  q("O is the centre of the circle and ∠OAB = 25°. C is a point on the major arc AB. The measure of ∠ACB is", "65°", ["25°", "50°", "130°"],
    "OA = OB, so ∠OBA = 25° and ∠AOB = 130°. The angle at C on the major arc is half of it: 65°.", figChordRadius()),
  q("In the circle with centre O, AB = AC and ∠ABC = 55°. The measure of ∠OBC is", "20°", ["15°", "35°", "55°"],
    "∠ACB = 55°, so ∠BAC = 70°. The angle at the centre is ∠BOC = 140°. OB = OC, so ∠OBC = (180° − 140°) ÷ 2 = 20°.", figIsoRadii()),
  q("AB is a diameter of the circle through A, B, C and D (in this order) and ∠ADC = 115°. The measure of ∠CAB is", "25°", ["35°", "50°", "65°"],
    "ABCD is cyclic, so ∠ABC = 180° − 115° = 65°. ∠ACB = 90° (angle in a semicircle). So ∠CAB = 180° − 90° − 65° = 25°.", figDiamQuad()),
  q("Chords AB and DE of a circle are equal. The distances of the chords from the centre O are (3x − 1) cm and (x + 7) cm, as marked in the figure. The distance of each chord from the centre is", "11 cm", ["8 cm", "13 cm", "20 cm"],
    "Equal chords are at equal distances from the centre: 3x − 1 = x + 7, so x = 4 and the distance is 11 cm.", F.twoChords({ equal: true, d1: "(3x−1)", d2: "(x+7)" })),
  q("AC and BD are diameters of the circle and ∠ABD = 35°. The measure of ∠CAD is", "55°", ["35°", "45°", "90°"],
    "∠ACD = ∠ABD = 35° (same arc AD). ∠ADC = 90° (angle in a semicircle). So ∠CAD = 180° − 90° − 35° = 55°.", figTwoDiameters()),
  q("ABCD is a cyclic quadrilateral with AB parallel to DC. ∠ADC = (3x + 10)° and ∠BCD = (5x − 30)°. The measure of ∠DAB is", "110°", ["70°", "90°", "100°"],
    "Since AB ∥ DC, ∠DAB + ∠ADC = 180°. Since ABCD is cyclic, ∠DAB + ∠BCD = 180°. So ∠ADC = ∠BCD: 3x + 10 = 5x − 30, x = 20, and ∠ADC = 70°. Then ∠DAB = 180° − 70° = 110°.", cq({ va: [160, 20, 340, 200] }, [[200, "(3x + 10)°", undefined, "D", 24], [340, "(5x − 30)°", undefined, "C", -24]])),
  q("A, B, C, D are points on a circle with AB = BC = CD and ∠BAC = 30°. The measure of ∠ABD is", "90°", ["60°", "120°", "150°"],
    "∠BAC = 30° means arc BC = 60°, so arcs AB, BC and CD are 60° each, 180° together. The remaining arc DA is also 180°, so AD is a diameter and ∠ABD, the angle in a semicircle, is 90°.", figThreeChords()),
  q("A right triangle has legs 20 cm and 21 cm. The radius of the circle through its three vertices is", "14.5 cm", ["10.5 cm", "20.5 cm", "29 cm"],
    "The hypotenuse is √(20² + 21²) = 29 cm. The circle through the three vertices has the hypotenuse as a diameter, so the radius is 14.5 cm.", figRightLegs()),
  q("AB is a diameter of a circle of radius 17 cm. A chord CD is perpendicular to AB at M, and OM = 8 cm. The length of CD is", "30 cm", ["15 cm", "32 cm", "34 cm"],
    "The perpendicular from the centre bisects the chord: CM = √(17² − 8²) = 15 cm, so CD = 30 cm.", figPerpDiameter()),
  q("AB and CD are equal chords of a circle with centre O. M and N are their midpoints and ∠OMN = 40°. The measure of ∠MON is", "100°", ["40°", "80°", "140°"],
    "Equal chords are equidistant from the centre, so OM = ON. Then ∠ONM = ∠OMN = 40° and ∠MON = 180° − 80° = 100°.", figEqualMidpoints()),
  q("A chord AB subtends ∠ACB = (2x − 10)° at C on the major arc and ∠ADB = (3x + 20)° at D on the minor arc. The measure of ∠ADB is", "122°", ["58°", "98°", "112°"],
    "The angles at points on opposite arcs add up to 180°: 5x + 10 = 180, so x = 34. ∠ADB = 3 × 34 + 20 = 122°.", figOppositeArcs()),
  q("In quadrilateral PQRS, ∠PQR = (2x + 10)° and ∠PSR = (x + 50)°. For which value of x do P, Q, R and S lie on a circle?", "40", ["30", "50", "60"],
    "The four points are concyclic when the opposite angles at Q and S add up to 180°: 3x + 60 = 180, so x = 40.", figConcyclicTest()),
  q("In the figure, ∠ABD = ∠ACD = 40° and B and C are on the same side of AD. Which statement is correct?", "A, B, C and D lie on a circle, because AD makes equal angles at B and C on the same side of it", ["They do not lie on a circle, because 40° is less than 90°", "They lie on a circle only if AD is a diameter", "They do not lie on a circle, because the two angles do not add up to 180°"],
    "If a segment subtends equal angles at two points on the same side of it, the four points are concyclic. The 180° condition is for points on opposite sides.", figSameSideTest()),
];

// ── assertion and reasoning (16) ──
const ASSERTION: Item[] = [
  ar("A circle can be drawn through any three given points.", "Exactly one circle passes through three non-collinear points.", 3,
    "A is false: three points on a straight line lie on no circle. R is true."),
  ar("The perpendicular bisector of every chord of a circle passes through the centre.", "The centre is at the same distance from both ends of every chord.", 0,
    "The centre is equidistant from the two ends, and every point equidistant from two points lies on their perpendicular bisector. So R explains A."),
  ar("The line joining the centre of a circle to the midpoint of a chord that is not a diameter is perpendicular to the chord.", "The triangles formed by the centre, the midpoint and the two ends of the chord are congruent by SSS.", 0,
    "OA = OB, AM = BM and OM is common, so the triangles are congruent by SSS. The angles at M are then equal and add up to 180°, so each is 90°."),
  ar("Of two chords of a circle, the longer chord is nearer the centre.", "Equal chords of a circle are at equal distances from the centre.", 1,
    "Both are true. R is about equal chords only, so it does not explain why the longer chord is nearer."),
  ar("A chord that is twice as far from the centre as another chord is half as long.", "The length of a chord at distance d from the centre of a circle of radius r is 2√(r² − d²).", 3,
    "R is true. A is false because the length is not proportional to the distance. For r = 5, a chord at 2 is 2√21 long, but a chord at 4 is 6 long, not √21."),
  ar("Angles in the same segment of a circle are equal.", "The angle at the centre is twice the angle at the circle on the same arc.", 0,
    "Every angle in the segment is half of the same angle at the centre, so they are all equal. R explains A."),
  ar("If AB is a diameter of a circle and C lies inside the circle, then ∠ACB = 90°.", "The angle in a semicircle is a right angle.", 3,
    "R is true but it applies to points on the circle. For C inside the circle, ∠ACB is greater than 90°, so A is false."),
  ar("A parallelogram that is not a rectangle cannot be cyclic.", "Opposite angles of a parallelogram are equal, so in a cyclic parallelogram each angle must be 90°.", 0,
    "Opposite angles of a cyclic quadrilateral add up to 180° and those of a parallelogram are equal, so each is 90°, and the parallelogram is a rectangle."),
  ar("A rhombus can be inscribed in a circle only if it is a square.", "Opposite angles of a rhombus are equal and opposite angles of a cyclic quadrilateral add up to 180°.", 0,
    "Together they force every angle to be 90°. A rhombus with four right angles is a square."),
  ar("If ∠ACB = ∠ADB = 40°, with C and D on opposite sides of AB, then A, B, C and D lie on a circle.", "Points that see a segment at equal angles from the same side lie on one circle through its ends.", 3,
    "R is true. A is false: the points are on opposite sides and 40° + 40° is not 180°, so they are not concyclic."),
  ar("Two circles of different radii can have the same centre.", "A circle is fixed completely by its centre.", 2,
    "A is true (concentric circles). R is false: the radius is needed too."),
  ar("Infinitely many circles pass through two given points.", "Exactly one circle passes through three non-collinear points.", 1,
    "Both are true. A is true because the centre can be any point of the perpendicular bisector. R is a separate fact and does not explain A."),
  ar("A chord of length 24 cm cannot be drawn in a circle of radius 11 cm.", "The longest chord of a circle is its diameter.", 0,
    "The diameter is 22 cm, the longest chord. A chord of 24 cm would be longer than that, so it cannot exist. R explains A."),
  ar("The perpendicular bisectors of two chords of a circle that are not parallel meet at the centre.", "A circle has exactly one centre.", 1,
    "Both are true. Each perpendicular bisector passes through the centre, so they meet there. R alone does not give the reason."),
  ar("The angle in a semicircle is 90°.", "The angle subtended by a chord at the centre is half the angle it subtends at the circle.", 2,
    "A is true. R is false: the angle at the centre is twice the angle at the circle."),
  ar("A cyclic quadrilateral can have all four angles equal.", "Opposite angles of a cyclic quadrilateral are equal.", 2,
    "A is true: a rectangle is cyclic and all its angles are 90°. R is false: opposite angles are supplementary, and they are equal only when each is 90°."),
];

// ── reasoning questions without a figure (56) ──
const REASONING: Item[] = [
  q("Through three collinear points, the number of circles that can be drawn is", "none", ["one", "two", "infinitely many"],
    "The perpendicular bisectors of the two segments between the points are parallel, so they never meet and there is no centre."),
  q("Points P and Q are 10 cm apart. The radius of the smallest circle that passes through both is", "5 cm", ["10 cm", "2.5 cm", "20 cm"],
    "PQ is a chord of the circle, and no chord is longer than the diameter. So 2r is at least 10 cm and the smallest radius is 5 cm."),
  q("The centres of all the circles that pass through two points P and Q lie on", "the perpendicular bisector of PQ", ["the line PQ", "the circle with PQ as a diameter", "the line through P perpendicular to PQ"],
    "A centre must be at the same distance from P and from Q, so it lies on the perpendicular bisector of PQ."),
  q("A chord of length 16 cm is 6 cm from the centre of a circle. The radius of the circle is", "10 cm", ["8 cm", "12 cm", "14 cm"],
    "The half chord is 8 cm, so r = √(8² + 6²) = 10 cm."),
  q("Two parallel chords of a circle of radius 25 cm are 14 cm and 48 cm long and lie on opposite sides of the centre. The distance between them is", "31 cm", ["17 cm", "25 cm", "41 cm"],
    "The 14 cm chord is √(625 − 49) = 24 cm from the centre and the 48 cm chord is √(625 − 576) = 7 cm from the centre. On opposite sides: 24 + 7 = 31 cm."),
  q("Which of these cannot be the length of a chord of a circle of radius 6 cm?", "13 cm", ["12 cm", "7 cm", "0.5 cm"],
    "No chord is longer than the diameter, which is 12 cm."),
  q("A chord of a circle of radius 9 cm subtends 60° at the centre. The length of the chord is", "9 cm", ["4.5 cm", "9√3 cm", "18 cm"],
    "The triangle formed by the chord and the two radii is isosceles with a 60° angle at the top, so it is equilateral. The chord is 9 cm."),
  q("Chords PQ and RS of a circle subtend 72° each at the centre. Their distances from the centre are in the ratio", "1 : 1", ["2 : 1", "1 : 2", "it cannot be found"],
    "Equal angles at the centre mean equal chords, and equal chords are equidistant from the centre."),
  q("Two chords are at distances 5 cm and 12 cm from the centre of a circle of radius 13 cm. How much longer is the nearer chord than the farther one?", "14 cm", ["7 cm", "10 cm", "24 cm"],
    "The nearer chord is 2√(169 − 25) = 24 cm and the farther chord is 2√(169 − 144) = 10 cm. The difference is 14 cm."),
  q("The sum of the angles that a chord (not a diameter) subtends at a point on the major arc and at a point on the minor arc is always", "180°", ["90°", "270°", "360°"],
    "The four points are on a circle, so the angles at the two opposite arcs are opposite angles of a cyclic quadrilateral and add up to 180°."),
  q("PQRS is a cyclic quadrilateral with ∠P = ∠R. Then each of these angles is", "90°", ["60°", "120°", "180°"],
    "∠P + ∠R = 180° and they are equal, so each is 90°."),
  q("Which of these parallelograms can have all four vertices on a circle?", "A parallelogram whose angles are all 90°", ["Any parallelogram", "A rhombus with angles of 60° and 120°", "A parallelogram with sides 5 cm and 7 cm and an angle of 70°"],
    "Opposite angles of a parallelogram are equal and, if it is cyclic, they add up to 180°. So every angle is 90° and it is a rectangle."),
  q("Which set of angles, taken in order, can be the angles of a cyclic quadrilateral ABCD?", "95°, 80°, 85°, 100°", ["100°, 80°, 90°, 90°", "70°, 110°, 80°, 100°", "60°, 120°, 110°, 70°"],
    "We need ∠A + ∠C = 180° and ∠B + ∠D = 180°. Only 95° + 85° = 180° and 80° + 100° = 180° satisfy both."),
  q("Points B and C lie on opposite sides of AD, with ∠ABD = ∠ACD = 50°. Do A, B, C and D lie on a circle?", "No, because on opposite sides the two angles would have to add up to 180°", ["Yes, because the two angles are equal", "Yes, because 50° + 50° = 100°", "No, because angles of 50° cannot be drawn in a circle"],
    "For points on opposite sides the test is that the angles add up to 180°. Here they add up to 100°."),
  q("PQ and RS are parallel chords of a circle of radius 5 cm, with PQ = 6 cm and RS = 8 cm, both on the same side of the centre. The distance between them is", "1 cm", ["2 cm", "4 cm", "7 cm"],
    "PQ is 4 cm from the centre and RS is 3 cm from the centre. On the same side the distance is 4 − 3 = 1 cm."),
  q("Two chords of a circle are equidistant from the centre. Their lengths are (3x + 4) cm and (5x − 6) cm. The common length is", "19 cm", ["14 cm", "24 cm", "5 cm"],
    "Chords at equal distances are equal: 3x + 4 = 5x − 6, so x = 5 and the length is 19 cm."),
  q("O is the centre of a circle and OM is perpendicular to the chord AB. AB = 2(x + 3) cm and AM = (3x − 3) cm. The length of AB is", "12 cm", ["6 cm", "9 cm", "18 cm"],
    "M is the midpoint of AB, so AM = (x + 3) cm. Then x + 3 = 3x − 3, so x = 3 and AB = 12 cm."),
  q("If a rhombus is inscribed in a circle, it must be", "a square", ["a rectangle that is not a square", "a kite that is not a rhombus", "any parallelogram"],
    "Its opposite angles are equal and, being cyclic, add up to 180°. So all angles are 90° and a rhombus with right angles is a square."),
  q("Two circles meet at three different points. Then", "they are the same circle", ["they have the same centre but different radii", "one circle lies inside the other", "this can happen for two different circles of unequal radii"],
    "Only one circle passes through three non-collinear points. Three common points would therefore make the circles identical."),
  q("How many circles of radius 4 cm pass through two points that are 6 cm apart?", "2", ["1", "0", "infinitely many"],
    "The centre is on the perpendicular bisector at distance √(16 − 9) = √7 cm from the midpoint, which can be on either side of the segment. So there are two circles."),
  q("How many circles of radius 4 cm pass through two points that are 8 cm apart?", "1", ["0", "2", "infinitely many"],
    "The two points are 2r apart, so the segment joining them is a diameter and the centre is its midpoint. Only one circle is possible."),
  q("A circle with one chord drawn in it (the chord is not a diameter) has how many lines of symmetry?", "1", ["2", "0", "infinitely many"],
    "Only the line through the centre that is perpendicular to the chord (the perpendicular bisector of the chord) keeps the whole figure unchanged."),
  q("A circle with one of its diameters drawn in it has how many lines of symmetry?", "2", ["1", "4", "infinitely many"],
    "The line along the diameter and the line through the centre perpendicular to it both keep the figure unchanged."),
  q("Two circles with centres O1 and O2 meet at P and Q. The line O1O2 is", "the perpendicular bisector of PQ", ["parallel to PQ", "equal in length to PQ", "a bisector of PQ but not perpendicular to it"],
    "Both centres are equidistant from P and Q, so both lie on the perpendicular bisector of PQ, and so does the line through them."),
  q("Two circles of radius 5 cm meet and their common chord is 8 cm long. The distance between their centres is", "6 cm", ["3 cm", "8 cm", "10 cm"],
    "Each centre is √(25 − 16) = 3 cm from the common chord and the two centres are on opposite sides of it. The distance is 3 + 3 = 6 cm."),
  q("Two concentric circles have radii 5 cm and 13 cm. A chord of the larger circle is 5 cm from the centre. Its length is", "24 cm", ["12 cm", "18 cm", "26 cm"],
    "The half chord is √(13² − 5²) = 12 cm, so the chord is 24 cm."),
  q("A point P inside a circle of radius 13 cm is 5 cm from the centre. The length of the shortest chord through P is", "24 cm", ["10 cm", "12 cm", "26 cm"],
    "Chords farther from the centre are shorter, and the farthest chord through P is the one perpendicular to OP, at distance 5 cm. Its length is 2√(169 − 25) = 24 cm."),
  q("A point P inside a circle of radius 13 cm is 5 cm from the centre. How many chords of length 25 cm pass through P?", "2", ["1", "0", "infinitely many"],
    "Chords through P have lengths from 24 cm (the shortest) to 26 cm (the diameter). A chord of 25 cm is at a certain distance from the centre, and there are two chords through P at that distance, one on each side of OP."),
  q("O is the centre of a circle and ∠ACB = 35°, where C lies on the major arc AB. The measure of ∠OAB is", "55°", ["35°", "70°", "110°"],
    "∠AOB = 2 × 35° = 70°. OA = OB, so ∠OAB = (180° − 70°) ÷ 2 = 55°."),
  q("O is the centre of a circle and ∠OAB = 15°. The angle subtended by the chord AB at a point C on the minor arc is", "105°", ["75°", "150°", "165°"],
    "∠AOB = 180° − 30° = 150°. A point on the major arc sees AB at 75°, so a point on the minor arc sees it at 180° − 75° = 105°."),
  q("A chord PQ of length 10 cm is drawn in a circle of radius 5√2 cm. The angle subtended by PQ at the centre is", "90°", ["60°", "120°", "45°"],
    "OP² + OQ² = 50 + 50 = 100 = PQ², so the triangle OPQ has a right angle at O."),
  q("ABCD is a cyclic quadrilateral with ∠A = (2x + 5)°, ∠B = (3x − 10)° and ∠C = (4x − 5)°. The measure of ∠D is", "100°", ["80°", "90°", "110°"],
    "∠A + ∠C = 6x = 180°, so x = 30. ∠B = 80° and ∠D = 180° − 80° = 100°."),
  q("In a cyclic quadrilateral ABCD, ∠A is three times ∠C. The measure of ∠A is", "135°", ["45°", "90°", "120°"],
    "∠A + ∠C = 180° gives 4∠C = 180°, so ∠C = 45° and ∠A = 135°."),
  q("The angles of a cyclic quadrilateral, taken in order, are in the ratio 2 : 3 : 4 : 3. The largest angle is", "120°", ["90°", "135°", "144°"],
    "The ratio adds up to 12 parts and the angles add up to 360°, so one part is 30°. The angles are 60°, 90°, 120° and 90°. (The opposite angles 60° and 120° add up to 180°, as they should.)"),
  q("ABCD is a cyclic quadrilateral. Side AB is extended to E with ∠CBE = 65° and ∠ADB = 30°. The measure of ∠BDC is", "35°", ["30°", "65°", "95°"],
    "The exterior angle ∠CBE equals the interior opposite angle ∠ADC = 65°. Then ∠BDC = 65° − 30° = 35°."),
  q("A, B and C are points on a circle with centre O and ∠ABC = 130°. The measure of ∠AOC (not reflex) is", "100°", ["65°", "130°", "260°"],
    "The angle at B is more than 90°, so B is on the minor arc AC. The arc AC that does not contain B subtends 2 × 130° = 260° at the centre, so the other angle at the centre is 360° − 260° = 100°."),
  q("In a cyclic quadrilateral ABCD, ∠CAD = 35° and ∠ABD = 50°. The measure of ∠ADC is", "95°", ["85°", "105°", "130°"],
    "∠CBD = ∠CAD = 35° (same segment CD). So ∠ABC = 50° + 35° = 85°, and ∠ADC = 180° − 85° = 95°."),
  q("The sides of a triangle are 10 cm, 24 cm and 26 cm. The radius of the circle through its vertices is", "13 cm", ["12 cm", "10 cm", "26 cm"],
    "10² + 24² = 676 = 26², so the triangle has a right angle. The hypotenuse is a diameter and the radius is 13 cm."),
  q("The hypotenuse of a right triangle is 26 cm. The distance of the circumcentre from the vertex at the right angle is", "13 cm", ["26 cm", "6.5 cm", "10 cm"],
    "The circumcentre is the midpoint of the hypotenuse and the circumradius is 13 cm. The vertex at the right angle lies on the circle, so its distance from the centre is the radius."),
  q("A chord of a circle subtends 90° at the centre and its length is 10√2 cm. The radius is", "10 cm", ["5√2 cm", "10√2 cm", "20 cm"],
    "The chord is the hypotenuse of an isosceles right triangle with legs r, so r√2 = 10√2 and r = 10 cm."),
  q("A chord of a circle of radius 10 cm subtends 120° at the centre. The distance of the chord from the centre is", "5 cm", ["5√3 cm", "10 cm", "10√3 cm"],
    "The perpendicular from the centre splits the 120° angle into two angles of 60°. In the half-triangle with angles 30°, 60°, 90°, the side opposite the 30° angle is half the hypotenuse, so the distance is 10 ÷ 2 = 5 cm."),
  q("A chord of a circle of radius 8 cm is equal to the radius. Its distance from the centre is", "4√3 cm", ["4 cm", "8√3 cm", "6 cm"],
    "The half chord is 4 cm, so the distance is √(64 − 16) = √48 = 4√3 cm."),
  q("A regular hexagon ABCDEF is inscribed in a circle. The measure of ∠ABD is", "90°", ["60°", "120°", "30°"],
    "The arc AD that does not contain B is made of 3 sides of the hexagon, which is 180°. So AD is a diameter and ∠ABD is the angle in a semicircle, 90°."),
  q("A regular hexagon ABCDEF is inscribed in a circle. The measure of ∠BAD is", "60°", ["30°", "90°", "120°"],
    "The arc BD that does not contain A is made of 2 sides, which is 120° at the centre. The angle at A is half of it: 60°."),
  q("A chord AC of a circle subtends a right angle at a point B on the circle. If AC = 14 cm, the radius of the circle is", "7 cm", ["14 cm", "7√2 cm", "14√2 cm"],
    "An angle of 90° at the circle means 180° at the centre, so AC is a diameter and the radius is 7 cm."),
  q("To find the centre of a circle drawn on paper, we should draw", "the perpendicular bisectors of two chords that are not parallel", ["two parallel chords", "two radii of any length", "one chord and its perpendicular at one end"],
    "The perpendicular bisector of any chord passes through the centre. Two such lines that are not parallel meet at only one point, the centre."),
  q("Which statement is FALSE?", "The line joining the centre to the midpoint of any chord is perpendicular to the chord.", ["The perpendicular from the centre to a chord bisects the chord.", "Equal chords of a circle are equidistant from the centre.", "The perpendicular bisector of a chord passes through the centre."],
    "For a diameter, the midpoint is the centre itself, so there is no line to draw. The statement is true only for chords that are not diameters."),
  q("How many chords whose length equals the radius can be drawn from a point A on the circle?", "2", ["1", "3", "6"],
    "Such a chord subtends 60° at the centre, so its other end is 60° away from A on either side. That gives two chords."),
  q("ABC is an equilateral triangle inscribed in a circle. The angle that side BC subtends at a point on the minor arc BC is", "120°", ["60°", "30°", "240°"],
    "At the major arc the angle is 60° (the angle A of the triangle). At the minor arc it is 180° − 60° = 120°."),
  q("A triangle ABC is inscribed in a circle with centre O, with ∠A = 40° and ∠B = 80°. The measure of ∠AOB is", "120°", ["60°", "80°", "100°"],
    "∠C = 180° − 40° − 80° = 60°. The angle at the centre on arc AB is twice ∠C: 120°."),
  q("Chords AB and AC of a circle with centre O are equal. Which statement is true?", "O lies on the bisector of ∠BAC", ["BC is a diameter", "∠BAC = 90°", "OA is perpendicular to AB"],
    "Equal chords are equidistant from the centre, so O is at the same distance from AB and from AC. A point equidistant from the two arms of an angle lies on its bisector."),
  q("A chord AB of a circle is not a diameter. Which of these can be the angle that AB subtends at a point on the minor arc?", "132°", ["48°", "60°", "90°"],
    "The angle at a point on the minor arc is 180° minus the angle on the major arc. The angle on the major arc is less than 90° (the chord is not a diameter), so the angle on the minor arc is more than 90°. Only 132° qualifies."),
  q("A chord of a circle subtends an angle at a point on the minor arc that is 3 times the angle at a point on the major arc. The angle subtended by the chord at the centre is", "90°", ["45°", "135°", "180°"],
    "The two angles add up to 180°, so they are 135° and 45°. The angle at the centre is twice the angle on the major arc: 90°."),
  q("A chord PQ is 4 cm from the centre of a circle and PQ = 6 cm. Another chord RS is 3 cm from the centre. The length of RS is", "8 cm", ["6 cm", "7 cm", "10 cm"],
    "The radius is √(3² + 4²) = 5 cm. Then RS = 2√(25 − 9) = 8 cm."),
  q("Two chords AB and CD of a circle of radius 10 cm are 12 cm and 16 cm long. Which chord is nearer to the centre, and by how much nearer?", "CD, by 2 cm", ["AB, by 2 cm", "CD, by 4 cm", "They are at equal distances"],
    "AB is √(100 − 36) = 8 cm from the centre and CD is √(100 − 64) = 6 cm from the centre. The longer chord CD is 2 cm nearer."),
  q("In a cyclic quadrilateral ABCD, AB = AD and ∠ABD = 40°. The measure of ∠BCD is", "80°", ["40°", "100°", "140°"],
    "AB = AD, so ∠ADB = 40° and ∠BAD = 100°. ABCD is cyclic, so ∠BCD = 180° − 100° = 80°."),
];

// ── put the three kinds in a steady mix (a figure question, a reasoning question, now and then an assertion) ──
function mix(): QuizQuestion[] {
  const pools = [WITH_FIGURE, ASSERTION, REASONING];
  const share = pools.map((p) => p.length);
  const total = share.reduce((a, b) => a + b, 0);
  const taken = [0, 0, 0];
  const out: QuizQuestion[] = [];
  for (let i = 0; i < total; i++) {
    // take from the pool that is furthest behind its fair share
    let best = -1, bestGap = -Infinity;
    pools.forEach((p, k) => {
      if (taken[k] >= p.length) return;
      const gap = ((i + 1) * share[k]) / total - taken[k];
      if (gap > bestGap) { bestGap = gap; best = k; }
    });
    out.push({ id: i + 1, ...pools[best][taken[best]++] });
  }
  return out;
}

export const CIRCLES9_SELF_ASSESSMENT: QuizQuestion[] = mix();
