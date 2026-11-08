import { arSet } from "./arHelper";

// 20 assertion and reason questions: Class IX Maths, Quadrilaterals. No slash is used, because the page shows it as a stacked fraction.

export const QUAD9_ASSERTION_REASON = arSet([
  ["A figure ABCD in which three of the four points are collinear is not a quadrilateral.", "Two adjacent sides would then lie along one line, giving a triangle or overlapping sides.", "A", "R explains A."],
  ["The diagonals of a convex quadrilateral intersect.", "The diagonals of every quadrilateral intersect.", "C", "A is true. R is false, since the diagonals of a non-convex quadrilateral do not meet."],
  ["A quadrilateral can have two internal angles that are each more than 180°.", "The four internal angles of a quadrilateral add up to 360°.", "D", "Two angles over 180° would already add up to more than 360°, so A is false. R is true."],
  ["If AB = DC and AD = BC in a quadrilateral ABCD, then ABCD is a parallelogram.", "In that case △ACD ≅ △CAB by SSS, so the alternate angles are equal and the opposite sides are parallel.", "A", "R explains A (Theorem 2)."],
  ["The diagonals of a rectangle are equal.", "The diagonals of a parallelogram bisect each other.", "B", "Both are true. R is a property of every parallelogram and does not explain why the diagonals of a rectangle are equal."],
  ["A quadrilateral with one pair of equal and parallel opposite sides is a parallelogram.", "A quadrilateral with one pair of equal opposite sides is always a parallelogram.", "C", "A is true (Theorem 5). R is false, because the equal sides must also be parallel."],
  ["A parallelogram whose diagonals are equal is a rectangle.", "Equal diagonals give △ABC ≅ △DCB, so ∠ABC = ∠DCB, and these add up to 180°, so each is 90°.", "A", "R explains A."],
  ["A rhombus with perpendicular diagonals is a square.", "Every rhombus has perpendicular diagonals.", "D", "A is false, since this holds for every rhombus. R is true."],
  ["In △ABC, if P and Q are the midpoints of AB and AC, then PQ = ½ BC.", "The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.", "A", "R is the Midpoint Theorem, which explains A."],
  ["The segment joining the midpoints of two sides of a triangle is parallel to the third side.", "The three medians of a triangle meet at one point.", "B", "Both are true. R is the Centroid Theorem, which does not explain A."],
  ["The line through the midpoint of AB parallel to BC bisects AC.", "The line through the midpoint of AB parallel to BC passes through the vertex C.", "C", "A is true (Theorem 7). R is false, because that line meets AC at its midpoint and does not pass through C."],
  ["The medians of a triangle are concurrent.", "The Centroid Theorem says that all three medians pass through one point, which divides each in the ratio 2 : 1.", "A", "R explains A."],
  ["The centroid divides a median in the ratio 1 : 2, counting from the vertex.", "The centroid divides each median in the ratio 2 : 1, the longer part being next to the vertex.", "D", "A is false. R is true."],
  ["The midpoints of the sides of any quadrilateral form a parallelogram.", "Two sides of the figure so formed are parallel to one diagonal and the other two are parallel to the other diagonal.", "A", "R explains A (Varignon's theorem)."],
  ["If the diagonals of a quadrilateral ABCD are equal, the Varignon parallelogram is a rhombus.", "If the diagonals of ABCD are perpendicular, the Varignon parallelogram is a rhombus.", "C", "A is true, since two adjacent sides ½AC and ½BD are equal. R is false, because perpendicular diagonals make it a rectangle."],
  ["If the diagonals of a quadrilateral are perpendicular, its Varignon parallelogram is a rectangle.", "If the diagonals of a quadrilateral are equal, its Varignon parallelogram is a rhombus.", "B", "Both are true. R does not explain A."],
  ["Any quadrilateral can tile the plane.", "The four angles of a quadrilateral add up to 360°, so four copies fit round a point, each angle once.", "A", "R explains A."],
  ["A regular pentagon can tile the plane.", "Each angle of a regular pentagon is 108°, and 360° is not a multiple of 108°.", "D", "A is false. R is true, and it is the reason why a regular pentagon cannot tile."],
  ["A 4-gon cannot have sides of 2, 5, 11 and 100.", "In a 4-gon the longest side must be less than the sum of the other three sides.", "A", "100 is more than 2 + 5 + 11 = 18, so R explains A."],
  ["A hexagon has 9 diagonals.", "The sum of the angles of a hexagon is 720°.", "B", "Both are true. R does not explain A."],
]);
