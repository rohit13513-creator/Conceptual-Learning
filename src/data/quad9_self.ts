import type { QuizQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import * as F from "./quad9Figs";

// Self Assessment: Class IX Maths, Quadrilaterals. 80 multiple-choice questions in 60 minutes.
// Every type of question is used: recall, numerical, reasoning, which statement is correct, converse and counterexample,
// figure-based and assertion and reasoning. Everything stays inside the chapter (definitions, convexity, angle sums,
// parallelograms and their tests, the Midpoint Theorem and its converse, the centroid, Varignon's theorem, tiling, and the
// side, diagonal and angle facts of polygons). 10 questions are assertion and reasoning, 9 have a figure.
// Each ordinary question is written with the right answer first and placed at the position in POSITION, so the right
// answers are spread evenly. A slash is not used in the text, because the page shows it as a stacked fraction.

const POSITION = [
  2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 2, 0, 0, 2, 1, 3, 2, 3, 0, 1, 1, 0, 3, 2, 3, 2, 1, 0, 0, 1, 2, 3, 2, 0, 1, 3, 1, 2, 0, 3, 0, 3, 2, 1, 2, 0, 1, 3,
  1, 3, 2, 0, 3, 1, 0, 2, 0, 2, 3, 1, 2, 3, 1, 0, 3, 0, 2, 1, 1, 2, 3, 0,
];

let n = 0;
let k = 0;
const q = (question: string, right: string, wrong: string[], explanation: string, figure?: GeoSpec): QuizQuestion => {
  const at = POSITION[k++];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { id: ++n, question, options, correctAnswer: at, explanation, figure };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
const ar = (question: string, correct: number, explanation: string): QuizQuestion => ({ id: ++n, question, options: AR, correctAnswer: correct, explanation });

export const QUAD9_SELF_ASSESSMENT: QuizQuestion[] = [
  // ── Definitions and classification ──
  q("Which of these is NOT needed for four points A, B, C, D to give a quadrilateral ABCD?", "all four sides are equal in length", ["no three of the points are collinear", "all four points lie in one plane", "the sides do not cross each other"],
    "A quadrilateral needs distinct points in one plane, no three collinear and no crossing sides. The sides need not be equal."),
  q("In a figure NOPE, the points N, O, P are collinear. Then NOPE is", "a triangle (or a figure with overlapping sides), not a quadrilateral", ["a convex quadrilateral", "a non-convex quadrilateral", "a self-intersecting quadrilateral"],
    "Two adjacent sides lie along the same line, so no quadrilateral is formed."),
  q("The four points are the corners of a convex quadrilateral. Of the 3 different 4-gons that can be drawn through them, how many are self-intersecting?", "2", ["0", "1", "3"],
    "One 4-gon follows the outline and is convex. The other two use both diagonals of the outline as sides, so their sides cross."),
  q("One of four points (no three collinear) lies inside the triangle formed by the other three. How many of the 3 different 4-gons through them are convex?", "0", ["1", "2", "3"],
    "Each 4-gon then has a dent at the inside point, so all three are non-convex."),
  q("At a vertex that lies inside the triangle formed by the other three vertices, the internal angle of the quadrilateral is", "more than 180° (the reflex angle)", ["less than 90°", "exactly 90°", "between 90° and 180°"],
    "Such a vertex is a dent. The internal angle is 360° minus the smaller angle between the two sides there."),
  q("The figure CUTS shown is not a quadrilateral because", "the sides CU and TS cross each other", ["it has five vertices", "three of its vertices are collinear", "its four points are not in one plane"],
    "The sides CU and TS intersect at a point that is not a vertex, so the figure is self-intersecting.", F.quadSelf({ cap: "CUTS" })),
  q("A quadrilateral has one pair of parallel opposite sides. Which of these is NOT possible?", "it is non-convex", ["it is a trapezium", "its diagonals meet", "∠A + ∠B = 180° for the two angles on one non-parallel side"],
    "A pair of parallel opposite sides forces the quadrilateral to be convex."),
  q("Why can a self-intersecting quadrilateral never be non-planar?", "Two crossing sides lie on two lines that meet, so all four vertices lie in one plane", ["Because a non-planar figure has no angles", "Because it has only three vertices", "Because its diagonals are parallel"],
    "Two lines that meet at a point lie in one plane, and that plane contains all four vertices."),

  // ── Angles ──
  q("The angles of a quadrilateral are 3x°, 4x°, 5x° and 6x°. The largest angle is", "120°", ["108°", "100°", "90°"],
    "18x = 360 gives x = 20. The angles are 60°, 80°, 100° and 120°."),
  q("In the non-convex quadrilateral DART, ∠A = 30°, ∠R = 20° and ∠T = 40°. The angle at D is", "270°", ["90°", "180°", "300°"],
    "360° − (30° + 20° + 40°) = 270°, which is more than 180°, so D is the dent."),
  q("In a parallelogram ABCD, ∠A = (4x − 15)° and ∠B = (2x + 15)°. The value of ∠A is", "105°", ["75°", "90°", "115°"],
    "Adjacent angles add up to 180°: 6x = 180 gives x = 30, so ∠A = 105° (and ∠B = 75°)."),
  q("In a parallelogram ABCD, ∠A : ∠B = 4 : 5. Then ∠C is", "80°", ["100°", "40°", "90°"],
    "∠A + ∠B = 180° gives ∠A = 80° and ∠B = 100°. ∠C = ∠A = 80°."),
  q("In a self-intersecting quadrilateral ABCD, AB and CD meet at E. If ∠A + ∠B + ∠C + ∠D = 240°, then ∠AED is", "60°", ["120°", "30°", "90°"],
    "The sum is 360° − 2∠AED, so 2∠AED = 120° and ∠AED = 60°."),
  q("The sum of the angles of a pentagon is", "540°", ["360°", "450°", "720°"],
    "(5 − 2) × 180° = 540°."),
  q("Each angle of a regular hexagon is", "120°", ["108°", "135°", "60°"],
    "The angle sum is 4 × 180° = 720°, and 720° ÷ 6 = 120°."),
  q("A polygon has an angle sum of 1440°. How many sides does it have?", "10", ["8", "9", "12"],
    "(n − 2) × 180° = 1440° gives n − 2 = 8, so n = 10."),

  // ── Parallelograms and their tests ──
  q("Which of these is NOT true for every parallelogram?", "the diagonals are equal", ["the opposite angles are equal", "the diagonals bisect each other", "the adjacent angles are supplementary"],
    "Equal diagonals hold for a rectangle, not for every parallelogram."),
  q("In a parallelogram ABCD, the diagonal BD makes ∠ABD = 40° and ∠CBD = 30°. Then ∠BAD is", "110°", ["70°", "100°", "140°"],
    "∠ABC = 40° + 30° = 70°. Adjacent angles are supplementary, so ∠BAD = 180° − 70° = 110°."),
  q("In a parallelogram ABCD, AB = (3x + 2) cm and CD = (5x − 10) cm. Then AB is", "20 cm", ["12 cm", "17 cm", "30 cm"],
    "Opposite sides are equal: 3x + 2 = 5x − 10 gives x = 6 and AB = 20 cm."),
  q("The diagonals of a parallelogram meet at O. OA = (2x + 1) cm and OC = (3x − 4) cm. The length AC is", "22 cm", ["11 cm", "10 cm", "5 cm"],
    "The diagonals bisect each other, so 2x + 1 = 3x − 4 gives x = 5. OA = 11 cm and AC = 22 cm."),
  q("The diagonals of a quadrilateral bisect each other, are unequal and are not perpendicular. The quadrilateral is", "a parallelogram that is neither a rectangle nor a rhombus", ["a rectangle", "a rhombus", "a trapezium that is not a parallelogram"],
    "Bisecting diagonals make it a parallelogram. Equal diagonals would make it a rectangle and perpendicular ones a rhombus."),
  q("Which pair of conditions together guarantees that a quadrilateral is a rectangle?", "the diagonals bisect each other and are equal", ["the diagonals are equal", "the diagonals are perpendicular", "one pair of opposite sides is equal and parallel"],
    "Bisecting diagonals make a parallelogram, and equal diagonals then make it a rectangle."),
  q("In a quadrilateral ABCD, AB ∥ DC and AD = BC. Then ABCD is", "not necessarily a parallelogram (it may be an isosceles trapezium)", ["always a parallelogram", "always a rectangle", "always a rhombus"],
    "The pair AD = BC is not parallel. An isosceles trapezium has AB ∥ DC and AD = BC without being a parallelogram."),
  q("Which of these are true? (i) every square is a rhombus, (ii) every rhombus is a square, (iii) every rectangle is a parallelogram, (iv) every parallelogram is a rectangle.", "(i) and (iii) only", ["(i), (ii) and (iii)", "(ii) and (iv) only", "(iii) and (iv) only"],
    "A square has four equal sides, so it is a rhombus. A rectangle has two pairs of parallel sides. The other two statements are false."),
  q("The converse of 'if a quadrilateral is a rectangle, then its diagonals are equal' is", "false, because an isosceles trapezium has equal diagonals", ["true, by Theorem 4", "true, by Theorem 2", "false, because a rectangle has unequal diagonals"],
    "The converse says that equal diagonals make a rectangle. An isosceles trapezium is a counterexample."),
  q("In a rhombus ABCD, ∠A = 60°. The triangle ABD is", "equilateral", ["right-angled", "scalene", "isosceles with the unequal angle at B"],
    "AB = AD (rhombus) and ∠A = 60°, so the other two angles are 60° each."),
  q("The diagonals of a rectangle ABCD meet at O and ∠AOB = 70°. Then ∠OAB is", "55°", ["70°", "35°", "110°"],
    "OA = OB (the diagonals are equal and bisect each other), so ∠OAB = (180° − 70°) ÷ 2 = 55°."),
  q("The bisectors of two adjacent angles of a parallelogram meet at an angle of", "90°", ["60°", "45°", "180°"],
    "Adjacent angles add up to 180°, so half of each add up to 90°, and the angle between the bisectors is 90°."),
  q("The diagonals of the parallelogram shown meet at E with AE = 5 cm and BE = 3 cm. Then AC + BD is", "16 cm", ["8 cm", "13 cm", "30 cm"],
    "AC = 2 × 5 = 10 cm and BD = 2 × 3 = 6 cm, so AC + BD = 16 cm.", F.parallelogram({ diag: true, cap: "ABCD, diagonals meet at E" })),
  q("In the proof that a quadrilateral whose diagonals bisect each other is a parallelogram, △AED ≅ △CEB by", "SAS", ["SSS", "ASA", "RHS"],
    "EA = EC, EB = ED and the angles at E are vertically opposite, so the congruence is by SAS."),
  q("Which of these converses is TRUE?", "if the diagonals of a quadrilateral bisect each other at right angles, it is a rhombus", ["if the diagonals of a quadrilateral are equal, it is a rectangle", "if the diagonals of a quadrilateral are perpendicular, it is a rhombus", "if one pair of opposite sides of a quadrilateral is equal, it is a parallelogram"],
    "Bisecting diagonals give a parallelogram, and perpendicular diagonals then give equal adjacent sides. The other three statements are false."),

  // ── Midpoint Theorem and its converse ──
  q("P and Q are the midpoints of AB and AC. PQ = (3x + 1) cm and BC = (10x − 6) cm. Then PQ is", "7 cm", ["4 cm", "14 cm", "10 cm"],
    "PQ = ½ BC, so 3x + 1 = 5x − 3 gives x = 2 and PQ = 7 cm."),
  q("The perimeter of △ABC is 50 cm. D, E, F are the midpoints of its sides. The perimeter of △DEF is", "25 cm", ["50 cm", "12.5 cm", "100 cm"],
    "Each side of △DEF is half of a side of △ABC, so the perimeter is 25 cm."),
  q("In △ABC, P and Q are the midpoints of AB and AC, and R and S are the midpoints of PB and QC. If BC = 24 cm, then RS is", "18 cm", ["12 cm", "6 cm", "20 cm"],
    "PQ = 12 cm. PBCQ is a trapezium with parallel sides PQ and BC, and R, S are the midpoints of its non-parallel sides, so RS = ½ (12 + 24) = 18 cm."),
  q("In △ABC, D is the midpoint of AB and DE ∥ BC meets AC at E. If ∠C = 55°, then ∠AED is", "55°", ["125°", "35°", "90°"],
    "DE ∥ BC, so ∠AED and ∠ACB are corresponding angles and are equal."),
  q("In △ABC, M and N are the midpoints of AB and AC and D is on BC. AD meets MN at X. If AD = 14 cm, then AX is", "7 cm", ["14 cm", "3.5 cm", "10 cm"],
    "MN bisects AD, so AX = ½ AD = 7 cm.", F.triMNAD({ cap: "MN meets AD at X" })),
  q("The midpoints of the sides of a triangle are joined. The area of the triangle formed in the middle is what part of the area of the big triangle?", "one fourth", ["one half", "one third", "one sixth"],
    "The three midsegments cut the triangle into four congruent triangles, so the middle one has one fourth of the area."),
  q("In trapezium ABCD, AB ∥ DC, AB = 14 cm and DC = 22 cm. E and F are the midpoints of AD and BC. Then EF is", "18 cm", ["36 cm", "8 cm", "9 cm"],
    "EF = ½ (AB + DC) = ½ (14 + 22) = 18 cm.", F.trapEF({ cap: "AB ∥ DC" })),
  q("In a trapezium, the segment joining the midpoints of the non-parallel sides is 20 cm and one parallel side is 12 cm. The other parallel side is", "28 cm", ["32 cm", "8 cm", "16 cm"],
    "20 = ½ (12 + x), so 12 + x = 40 and x = 28 cm."),
  q("In a quadrilateral ABCD, AB ∥ DC, AB = 9 cm and DC = 21 cm. G and H are the midpoints of the diagonals. Then GH is", "6 cm", ["15 cm", "12 cm", "30 cm"],
    "GH ∥ AB and GH = ½ (DC − AB) = ½ (21 − 9) = 6 cm.", F.quadGH({ cap: "G, H midpoints of the diagonals" })),
  q("The line through the midpoint of AB parallel to BC meets AC at Q. If AQ = (2x + 3) cm and QC = (4x − 5) cm, then AC is", "22 cm", ["11 cm", "8 cm", "16 cm"],
    "Q is the midpoint of AC, so 2x + 3 = 4x − 5 gives x = 4. AQ = QC = 11 cm and AC = 22 cm."),
  q("In a parallelogram ABCD, E is the midpoint of AB and the line through E parallel to AD meets DC at F. Then F is", "the midpoint of DC", ["the point dividing DC in the ratio 1 : 2", "the point C", "a point whose position cannot be found"],
    "AEFD has AE ∥ DF and EF ∥ AD, so it is a parallelogram and DF = AE = ½ AB = ½ DC."),
  q("In △ABC with AB = AC, D, E, F are the midpoints of BC, CA, AB. The triangle DEF is", "isosceles", ["equilateral always", "scalene", "right-angled"],
    "DE = ½ AB and DF = ½ AC. Since AB = AC, DE = DF."),

  // ── Centroid ──
  q("G is the centroid of △ABC and the median AD is 27 cm. Then GD is", "9 cm", ["18 cm", "13.5 cm", "27 cm"],
    "GD is one third of the median: 27 ÷ 3 = 9 cm.", F.triMedians({ cap: "The centroid (shown as M)" })),
  q("G is the centroid of △ABC and BE is a median. If BG = 14 cm, then GE is", "7 cm", ["28 cm", "14 cm", "21 cm"],
    "BG = 2 GE, so GE = 7 cm."),
  q("The medians BE and CF of △ABC meet at G. If GE = 4 cm and GF = 5 cm, then BE + CF is", "27 cm", ["9 cm", "18 cm", "36 cm"],
    "BG = 8 cm so BE = 12 cm, and CG = 10 cm so CF = 15 cm. The sum is 27 cm."),
  q("The centroid of a triangle always lies", "inside the triangle", ["outside the triangle", "on one of its sides", "at one of its vertices"],
    "The medians lie inside the triangle, and they meet at the centroid."),
  q("In △ABC, G is the centroid and AD is the median. AG = (3x − 2) cm and GD = (x + 1) cm. Then AD is", "15 cm", ["5 cm", "10 cm", "30 cm"],
    "AG = 2 GD gives 3x − 2 = 2x + 2, so x = 4. GD = 5 cm, AG = 10 cm and AD = 15 cm."),
  q("The medians of a triangle are 9 cm, 12 cm and 15 cm. The sum of the distances of the centroid from the three vertices is", "24 cm", ["36 cm", "18 cm", "12 cm"],
    "Each distance is two thirds of a median, so the sum is ⅔ × 36 = 24 cm."),
  q("Which statement about the centroid is NOT true?", "the centroid is the midpoint of each median", ["the three medians pass through it", "it divides each median in the ratio 2 : 1", "the longer part of each median is next to the vertex"],
    "The centroid divides each median in the ratio 2 : 1, so it is not the midpoint."),
  q("In the proof of the Centroid Theorem, the points X and Y are taken as the midpoints of", "BM and CM", ["AB and AC", "BC and AM", "AP and AQ"],
    "X and Y are the midpoints of BM and CM, so that the Midpoint Theorem can be used in △MBC."),

  // ── Varignon's theorem ──
  q("The diagonals of a quadrilateral ABCD are 16 cm and 12 cm. The perimeter of the quadrilateral formed by joining the midpoints of its sides is", "28 cm", ["56 cm", "14 cm", "20 cm"],
    "The sides are 8 cm, 6 cm, 8 cm, 6 cm, so the perimeter is 28 cm.", F.quadVarignon({ diag: true, cap: "ABCD with its Varignon parallelogram" })),
  q("The midpoints of the sides of a rectangle are joined in order. The figure formed is", "a rhombus", ["a rectangle", "a square always", "a trapezium"],
    "The diagonals of a rectangle are equal, so the adjacent sides of the Varignon parallelogram are equal."),
  q("The midpoints of the sides of a rhombus are joined in order. The figure formed is", "a rectangle", ["a rhombus", "a square always", "a parallelogram with no right angle"],
    "The diagonals of a rhombus are perpendicular, so the Varignon parallelogram has a right angle."),
  q("The midpoints of the sides of a square are joined in order. The figure formed is", "a square", ["a rectangle that is not a square", "a rhombus that is not a square", "a trapezium"],
    "The diagonals of a square are equal and perpendicular, so the Varignon parallelogram is a square."),
  q("The Varignon parallelogram of a quadrilateral ABCD is a rectangle. Then the diagonals AC and BD are", "perpendicular", ["equal", "parallel", "equal and parallel"],
    "PQ ∥ AC and QR ∥ BD. A right angle at Q means AC ⟂ BD."),
  q("The diagonals of a quadrilateral are equal and perpendicular, each 10 cm. The area of the quadrilateral formed by joining the midpoints of its sides is", "25 square cm", ["50 square cm", "100 square cm", "10 square cm"],
    "It is a square with side 5 cm (half a diagonal), so its area is 25 square cm."),
  q("The diagonals of the Varignon parallelogram PQRS meet at O. Then", "O is the midpoint of PR and of QS", ["O is the midpoint of PR only", "PR and QS are always equal", "PR and QS are always perpendicular"],
    "The diagonals of every parallelogram bisect each other."),
  q("The Varignon parallelogram of a quadrilateral collapses to a segment when", "the diagonals AC and BD are parallel (a self-intersecting quadrilateral)", ["the quadrilateral is convex", "the quadrilateral is a rhombus", "the diagonals are equal"],
    "PQ and QR are parallel to AC and BD. If AC ∥ BD, then P, Q, R, S lie on one line."),
  q("For the Varignon parallelogram PQRS of ABCD, PQ = 7 cm and QR = 5 cm. Then AC + BD is", "24 cm", ["12 cm", "6 cm", "35 cm"],
    "AC = 2 PQ = 14 cm and BD = 2 QR = 10 cm."),
  q("The Midpoint Theorem for quadrilaterals (Varignon) is true for", "convex, non-convex and self-intersecting quadrilaterals", ["convex quadrilaterals only", "convex and non-convex quadrilaterals only", "parallelograms only"],
    "The proof uses only the diagonals and the Midpoint Theorem in four triangles, with no condition on convexity."),

  // ── Tiling and polygons ──
  q("The angles of a quadrilateral are 85°, 95°, 75° and 105°. Four copies placed round a point, each angle used once, leave", "no gap and no overlap", ["a gap of 20°", "an overlap of 20°", "a gap of 40°"],
    "85° + 95° + 75° + 105° = 360°.", F.tileQuad({ cap: "Four angles round a point" })),
  q("Which of these cannot tile the plane?", "a regular pentagon", ["any triangle", "any quadrilateral", "any parallelogram"],
    "Each angle of a regular pentagon is 108°, and 360° is not a multiple of 108°."),
  q("Three regular pentagons are placed round a point. The gap left is", "36°", ["72°", "108°", "0°"],
    "3 × 108° = 324°, and 360° − 324° = 36°."),
  q("The number of diagonals of a polygon with 9 sides is", "27", ["18", "36", "54"],
    "n(n − 3) ÷ 2 = 9 × 6 ÷ 2 = 27."),
  q("A polygon has 35 diagonals. The number of its sides is", "10", ["9", "11", "12"],
    "n(n − 3) ÷ 2 = 35 gives n = 10, since 10 × 7 ÷ 2 = 35."),
  q("Three sides of a 4-gon are 3 cm, 7 cm and 9 cm. The fourth side CANNOT be", "20 cm", ["1 cm", "10 cm", "18 cm"],
    "The longest side must be less than the sum of the other three. For 20 cm: 20 is more than 3 + 7 + 9 = 19."),
  q("Two copies of a triangle are joined by turning one through 180° about the midpoint of a side. The figure formed is", "a parallelogram", ["a rectangle always", "a trapezium that is not a parallelogram", "a triangle"],
    "The opposite sides are equal (each side of the triangle appears twice as opposite sides), so it is a parallelogram."),
  q("The sum of the angles of a decagon (10 sides) is", "1440°", ["1260°", "1800°", "1080°"],
    "(10 − 2) × 180° = 1440°."),
  q("Which of these is a correct name for the quadrilateral PQRS?", "SRQP", ["PRQS", "QSPR", "PSQR"],
    "A name must go round the figure. S-R-Q-P goes round in the opposite direction. The others have a diagonal between neighbouring letters."),

  // ── Assertion and reasoning ──
  ar("Assertion (A): The centroid of a triangle lies inside the triangle.\nReason (R): The medians are drawn inside the triangle and meet at the centroid.", 0,
    "The medians lie inside the triangle and their common point, the centroid, is therefore inside. R explains A."),
  ar("Assertion (A): In △ABC, if P is the midpoint of AB and PQ ∥ BC with Q on AC, then PQ = ½ BC.\nReason (R): By the converse of the Midpoint Theorem, Q is the midpoint of AC, and then the Midpoint Theorem gives PQ = ½ BC.", 0,
    "Both are true. Q is the midpoint of AC, so P and Q are midpoints and PQ is half of BC."),
  ar("Assertion (A): The diagonals of a rhombus are perpendicular.\nReason (R): The diagonals of a rectangle are equal.", 1,
    "Both are true. R is about a different shape and does not explain A."),
  ar("Assertion (A): The opposite angles of a parallelogram are equal.\nReason (R): Every square is a rectangle.", 1,
    "Both are true. R is a fact about squares and does not explain A."),
  ar("Assertion (A): In any parallelogram, adjacent angles are supplementary.\nReason (R): In any parallelogram, adjacent angles are equal.", 2,
    "A is true. R is false: adjacent angles are equal only in a rectangle."),
  ar("Assertion (A): The three medians of a triangle are concurrent.\nReason (R): The centroid is the midpoint of each median.", 2,
    "A is true. R is false: the centroid divides each median in the ratio 2 : 1."),
  ar("Assertion (A): A regular pentagon tiles the plane.\nReason (R): The angle 108° of a regular pentagon is not a divisor of 360°.", 3,
    "A is false. R is true, and it is the reason that a regular pentagon cannot tile the plane."),
  ar("Assertion (A): A pair of equal opposite sides is enough to make a quadrilateral a parallelogram.\nReason (R): A quadrilateral with one pair of equal and parallel opposite sides is a parallelogram.", 3,
    "A is false: the sides must also be parallel. R is true (Theorem 5)."),
  ar("Assertion (A): The Varignon parallelogram of a rectangle is a rhombus.\nReason (R): The diagonals of a rectangle are equal, so PQ = ½ AC = ½ BD = QR.", 0,
    "The adjacent sides PQ and QR are equal, so the parallelogram is a rhombus. R explains A."),
  ar("Assertion (A): Four copies of any quadrilateral fit round a point.\nReason (R): The angle sum of a triangle is 180°.", 1,
    "Both are true, but the reason for A is that the angle sum of a quadrilateral is 360°, so R does not explain A directly."),
];
