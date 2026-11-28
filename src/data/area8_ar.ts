import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./area8Util";

// Class VIII Maths, Area: 20 assertion-reason questions for the separate Assertion section (different from the 25 inside the multiple-choice
// list), easiest first. A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const AREA8_ASSERTIONS: AssertionReasonQuestion[] = [
  q("A rectangle 9 cm long and 5 cm wide has an area of 45 cm^2.", "Area of a rectangle = length × width.", "A", "9 × 5 = 45"),
  q("A square of side 6 m has an area of 24 m^2.", "Area of a square = side × side.", "D", "A is false: 6 × 6 = 36. R is true."),
  q("The area of a triangle with base 14 cm and height 5 cm is 35 cm^2.", "A triangle is half of the rectangle on the same base with the same height.", "A", "1/2 × 14 × 5 = 35"),
  q("The area of a region can be measured by its perimeter.", "Perimeter is the length of the boundary of a region.", "D", "A is false: area needs unit squares."),
  q("A rectangle of 8 cm by 3 cm has a smaller area than a rectangle of 7 cm by 4 cm.", "The first rectangle has a perimeter of 22 cm.", "B", "24 is less than 28. Both are true, but the perimeter does not explain it."),
  q("In a triangle, any side may be chosen as the base.", "The height must then be drawn perpendicular to that side.", "B", "Both are true; R tells how to use the chosen base but does not prove A."),
  q("The area of a rhombus with diagonals 20 cm and 15 cm is 150 cm^2.", "The area of a rhombus is half the product of its diagonals.", "A", "1/2 × 20 × 15 = 150"),
  q("A parallelogram can be converted into a rectangle of equal area.", "A triangle cut from one end fits exactly at the other end.", "A", "The two triangles are congruent by RHS."),
  q("The area of a parallelogram with sides 10 cm and 6 cm is always 60 cm^2.", "Area of a parallelogram = base × height.", "D", "The height is 6 cm only when the parallelogram is a rectangle."),
  q("A median of a triangle of area 50 cm^2 forms two triangles of area 25 cm^2 each.", "The two triangles have equal bases and the same height.", "A", "R explains A."),
  q("The area of a path can be found by subtracting the inner area from the outer area.", "The path is the region between the outer and the inner boundary.", "A", "R explains A."),
  q("If the side of a square is halved, its area becomes half.", "Area of a square = side × side.", "D", "A is false: the area becomes one quarter."),
  q("△ABC and △DBC have equal areas if A and D lie on a line parallel to BC.", "Both triangles then have the same base and the same height.", "A", "R explains A."),
  q("The area of a quadrilateral can be found using one diagonal and two perpendiculars.", "A diagonal splits a quadrilateral into two triangles.", "A", "R explains A."),
  q("1 km^2 is equal to 1000 m^2.", "1 km is equal to 1000 m.", "D", "A is false: 1000 × 1000 = 10,00,000 m^2."),
  q("In a trapezium with parallel sides a, b and height h, the area is 1/2 × h × (a + b).", "The trapezium can be split into two triangles with bases a and b and height h.", "A", "A diagonal gives 1/2 ah + 1/2 bh."),
  q("The rectangle has the smallest perimeter among parallelograms with the same base and height.", "Slant sides are longer than the perpendicular height.", "A", "R explains A."),
  q("If M and N are the midpoints of XY and XZ, the area of △XMN is half the area of △XYZ.", "A median divides a triangle into two equal areas.", "D", "A is false: △XMN is one quarter of △XYZ. R is true."),
  q("For a polygon on a unit dot grid with 3 inside dots and 6 boundary dots, the area is 5 square units.", "Pick's theorem: area = i + b/2 − 1.", "A", "3 + 6 ÷ 2 − 1 = 5"),
  q("An equilateral triangle of side a has a smaller area than a square of side a.", "The height of an equilateral triangle is less than its side.", "A", "Half of a × height is less than half of a^2."),
];
