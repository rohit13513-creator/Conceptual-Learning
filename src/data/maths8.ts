// Class 8 Maths -- Chapter: Quadrilaterals (rectangles, squares, parallelograms, rhombuses,
// kites, trapeziums -- their definitions, diagonal properties, and the angle-sum property)
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  AssertionReasonQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS (one per major skill from the chapter: angle-chasing using
// diagonal properties, ruler-and-compass constructions, and reasoning/classification problems) ──
export const MATHS8_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "In rectangle ABCD, the diagonals AC and BD intersect at O. If angle OAB = 35 degrees, find angle OBA, angle AOB, angle OCB, angle OCD, and angle ODA.",
    given: { "Shape": "Rectangle ABCD", "Diagonals meet at": "O", "angle OAB": "35 degrees" },
    formulaUsed: "In a rectangle, the diagonals are equal in length and bisect each other, so OA = OB = OC = OD -- every triangle formed at the centre is isosceles.",
    derivationSteps: [
      "Since OA = OB, triangle OAB is isosceles, so angle OBA = angle OAB = 35 degrees.",
      "In triangle OAB: angle AOB = 180 - 35 - 35 = 110 degrees.",
      "Since angle ABC = 90 degrees (rectangle) and angle OBA = 35 degrees, angle OBC = 90 - 35 = 55 degrees.",
      "Since OB = OC, triangle OBC is isosceles, so angle OCB = angle OBC = 55 degrees.",
      "Since angle BCD = 90 degrees and angle OCB = 55 degrees, angle OCD = 90 - 55 = 35 degrees.",
      "Since angle ADC = 90 degrees and (by the same steps on the other side) angle OCD = angle ODC = 35 degrees, angle ODA = 90 - 35 = 55 degrees."
    ],
    finalAnswer: "angle OBA = 35 degrees, angle AOB = 110 degrees, angle OCB = 55 degrees, angle OCD = 35 degrees, angle ODA = 55 degrees.",
    conceptualTip: "Once you know ONE angle a diagonal makes with a side of a rectangle, every other angle at the centre and corners can be found using isosceles triangles and the fact that each corner is 90 degrees."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "Two straight strips, each exactly 8 cm long, are crossed so that they bisect each other -- first at an angle of 40 degrees, then at an angle of 90 degrees. What quadrilateral is formed by joining the four endpoints in each case? Justify your answer.",
    given: { "Length of each strip (diagonal)": "8 cm", "Case 1 angle between strips": "40 degrees", "Case 2 angle between strips": "90 degrees" },
    formulaUsed: "Equal diagonals that bisect each other always form a rectangle, regardless of the angle between them. If those equal, bisecting diagonals are ALSO perpendicular, the rectangle formed is a square.",
    derivationSteps: [
      "In both cases, the two diagonals are equal (8 cm each) and bisect each other -- this alone is enough to guarantee a rectangle, no matter what angle they cross at.",
      "Case 1 (40 degrees): the diagonals are equal and bisect each other, but are NOT perpendicular. This gives a rectangle that is not a square.",
      "Case 2 (90 degrees): the diagonals are equal, bisect each other, AND are perpendicular. A rectangle whose diagonals are also perpendicular must have all four sides equal too -- so this gives a square."
    ],
    finalAnswer: "Case 1 (40 degrees) gives a rectangle (not a square). Case 2 (90 degrees) gives a square, since perpendicularity is the extra condition that turns a rectangle into a square.",
    conceptualTip: "Equal + bisecting diagonals always give a rectangle. Equal + bisecting + perpendicular diagonals always give a square. Perpendicularity is the one extra ingredient that upgrades a rectangle to a square."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "A circle has centre O. Line segments PL and AM are two perpendicular diameters of the circle. What type of quadrilateral is APML? Reason it out.",
    given: { "PL, AM": "Perpendicular diameters of the same circle, centre O" },
    formulaUsed: "All radii of a circle are equal in length.",
    derivationSteps: [
      "Since PL and AM are both diameters, they both pass through the centre O and are bisected by it -- so PL and AM are diagonals of quadrilateral APML that bisect each other.",
      "OP = OL = OA = OM, since all four are radii of the same circle. This means diagonal PL = OP + OL = 2 x radius, and diagonal AM = OA + OM = 2 x radius -- so the two diagonals are equal in length.",
      "PL and AM are given to be perpendicular to each other.",
      "So the diagonals of APML are equal, bisect each other, and are perpendicular -- exactly the conditions for a square."
    ],
    finalAnswer: "APML is a square.",
    conceptualTip: "Any two perpendicular diameters of a circle automatically give a square when their endpoints are joined -- this is a quick way to spot a hidden square in a circle diagram."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "You have two sticks of equal length and a length of thread, but no protractor or set-square. Explain how to obtain an exact 90 degree angle using only these.",
    given: { "Tools available": "Two sticks of equal length, one thread", "Tools not available": "Protractor, set-square" },
    formulaUsed: "Equal diagonals that bisect each other form a rectangle, and every angle of a rectangle is 90 degrees.",
    derivationSteps: [
      "Cross the two equal sticks so that their midpoints coincide at a common point O -- this can be judged by measuring each stick's half-length with the thread.",
      "Let the four endpoints of the two sticks be A, C (ends of one stick) and B, D (ends of the other). Since the sticks are equal in length and cross at their shared midpoint O, they act as the two diagonals of quadrilateral ACBD, and those diagonals are equal and bisect each other.",
      "By the rectangle property, ACBD must therefore be a rectangle, so every one of its angles is exactly 90 degrees.",
      "Tie the thread from A to B, then from B to C -- the angle traced at B (or at any of the four corners) is a genuine 90 degree angle."
    ],
    finalAnswer: "Cross the two equal sticks at their common midpoint. The quadrilateral formed by their four endpoints is automatically a rectangle, so each of its corners is exactly 90 degrees -- no protractor needed.",
    conceptualTip: "This is the same practical trick carpenters use to check a corner is 'square': if the two diagonals of a frame are equal and cross at their midpoints, every corner must be a right angle."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "One of the properties of a rectangle is that its opposite sides are parallel and equal. Can this be used as the definition of a rectangle -- in other words, is every quadrilateral with opposite sides parallel and equal necessarily a rectangle?",
    given: { "Claim to test": "Opposite sides parallel and equal implies rectangle" },
    formulaUsed: "A rectangle needs all four angles to be 90 degrees; having opposite sides parallel and equal is not enough on its own to guarantee this.",
    derivationSteps: [
      "Consider a parallelogram with adjacent sides 5 cm and 3 cm, and one angle of 60 degrees (not 90 degrees). Its opposite sides are automatically parallel and equal, since that is exactly the definition of a parallelogram.",
      "But its angles are 60 degrees and 120 degrees (alternating), not 90 degrees each -- so it is clearly not a rectangle.",
      "This single example is enough to disprove the claim: opposite sides being parallel and equal only guarantees a parallelogram, not specifically a rectangle."
    ],
    finalAnswer: "No. A quadrilateral with opposite sides parallel and equal is guaranteed to be a parallelogram, but not necessarily a rectangle -- it is only a rectangle if its angles are additionally all 90 degrees.",
    conceptualTip: "Whenever you're checking if a proposed definition is complete, try to construct one counter-example that satisfies the proposed condition but clearly fails the shape you're trying to define."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "In quadrilateral PQRS, angle P = 95 degrees, angle Q = 80 degrees, and angle R = 105 degrees. Find angle S.",
    given: { "angle P": "95 degrees", "angle Q": "80 degrees", "angle R": "105 degrees" },
    formulaUsed: "The sum of all four angles of any quadrilateral is 360 degrees.",
    derivationSteps: [
      "angle P + angle Q + angle R + angle S = 360 degrees.",
      "95 + 80 + 105 + angle S = 360.",
      "280 + angle S = 360.",
      "angle S = 360 - 280 = 80 degrees."
    ],
    finalAnswer: "angle S = 80 degrees.",
    conceptualTip: "The angle-sum property (360 degrees) works for EVERY simple quadrilateral -- convex or not -- as long as you can split it into two triangles using one diagonal."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "Using the diagonal properties of a parallelogram, construct a parallelogram ABCD whose diagonals AC = 6 cm and BD = 8 cm, and which intersect at an angle of 100 degrees.",
    given: { "Diagonal AC": "6 cm", "Diagonal BD": "8 cm", "Angle between diagonals": "100 degrees" },
    formulaUsed: "The diagonals of a parallelogram bisect each other (but are not necessarily equal, and not necessarily perpendicular).",
    derivationSteps: [
      "Draw line segment AC = 6 cm, and mark its midpoint O (so AO = OC = 3 cm).",
      "At O, draw a line making an angle of 100 degrees with AC.",
      "On this new line, mark points B and D such that OB = OD = 4 cm (half of BD = 8 cm), on opposite sides of O.",
      "Join AB, BC, CD, and DA to complete the figure."
    ],
    finalAnswer: "ABCD, formed by joining the four points as described, is the required parallelogram: its diagonals AC = 6 cm and BD = 8 cm bisect each other at O and cross at 100 degrees.",
    conceptualTip: "Constructing a quadrilateral from its diagonals always starts the same way: draw one diagonal, find its midpoint, then place the other diagonal through that same midpoint at the required angle."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Using the diagonal properties of a rhombus, construct a rhombus ABCD whose diagonals are AC = 5 cm and BD = 8 cm.",
    given: { "Diagonal AC": "5 cm", "Diagonal BD": "8 cm" },
    formulaUsed: "The diagonals of a rhombus bisect each other AND cross at 90 degrees -- this is what makes the rhombus construction different from a general parallelogram's.",
    derivationSteps: [
      "Draw line segment AC = 5 cm, and mark its midpoint O (so AO = OC = 2.5 cm).",
      "At O, draw a line perpendicular to AC (a 90 degree angle) -- this step is what makes the result a rhombus rather than just any parallelogram.",
      "On this perpendicular line, mark points B and D such that OB = OD = 4 cm (half of BD = 8 cm), on opposite sides of O.",
      "Join AB, BC, CD, and DA to complete the figure."
    ],
    finalAnswer: "ABCD, formed as described, is the required rhombus: its diagonals bisect each other at right angles, which automatically makes all four sides equal.",
    conceptualTip: "The one difference between constructing a parallelogram and a rhombus from their diagonals is the angle at the centre: any angle gives a parallelogram, but exactly 90 degrees gives a rhombus."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "Two cardboard cutouts of an equilateral triangle, each with side 5 cm, are joined along one full side. What quadrilateral is formed? Find all its sides and angles.",
    given: { "Triangle type": "Equilateral", "Side of each triangle": "5 cm" },
    formulaUsed: "Every angle of an equilateral triangle measures 60 degrees.",
    derivationSteps: [
      "When the two triangles are joined along a shared side, that shared side becomes an internal diagonal of the new quadrilateral, and is no longer one of its outer sides.",
      "The quadrilateral's four outer sides are the other two sides of each triangle -- all four of these measure 5 cm, since every side of an equilateral triangle is equal.",
      "At the two vertices that were the 'top' and 'bottom' tips of the two triangles (the ones NOT on the shared side), only one triangle's 60 degree angle appears -- so these two angles are 60 degrees each.",
      "At the two vertices that lie on the shared side, the angles of BOTH triangles meet, so each of these angles is 60 + 60 = 120 degrees."
    ],
    finalAnswer: "The quadrilateral formed is a rhombus with all four sides equal to 5 cm, and angles 60 degrees, 120 degrees, 60 degrees, 120 degrees (in order around the shape).",
    conceptualTip: "Since all four sides come out equal but the angles are not 90 degrees, this shape is a rhombus, not a square."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "Construct a kite whose diagonals are 6 cm and 9 cm.",
    given: { "Diagonal that gets bisected (AC)": "6 cm", "Diagonal that does the bisecting (BD)": "9 cm" },
    formulaUsed: "In a kite ABCD (with AB = BC and CD = DA), diagonal BD bisects diagonal AC and is perpendicular to it -- but AC does NOT necessarily bisect BD.",
    derivationSteps: [
      "Draw line segment AC = 6 cm, and mark its midpoint O.",
      "At O, draw a line perpendicular to AC.",
      "On this perpendicular line, mark point B at a distance of, say, 4 cm from O on one side, and point D at a distance of 5 cm from O on the other side (so that BD = 4 + 5 = 9 cm in total -- note the split does NOT need to be equal, unlike AC).",
      "Join AB, BC, CD, and DA to complete the kite."
    ],
    finalAnswer: "ABCD, constructed as described, is the required kite, with AC = 6 cm bisected perpendicularly by BD = 9 cm.",
    conceptualTip: "The most common mistake in constructing a kite is bisecting BOTH diagonals equally -- only the diagonal joining the two 'unequal-side' vertices (here, AC) gets bisected; the other one does not have to be split evenly."
  },
  {
    id: 11,
    questionNumber: "Practice Q11",
    question: "PQRS is an isosceles trapezium with PQ parallel to SR, and the non-parallel sides PS and QR equal in length. If angle S = 100 degrees, find angle P, angle Q, and angle R.",
    given: { "PQ || SR": "given", "PS = QR": "isosceles trapezium condition", "angle S": "100 degrees" },
    formulaUsed: "Co-interior angles on the same side of a transversal between two parallel lines add up to 180 degrees; in an isosceles trapezium, the two angles at each parallel side are equal to each other.",
    derivationSteps: [
      "Since PQ || SR and PS is a transversal to them, angle P and angle S are co-interior angles: angle P + angle S = 180 degrees, so angle P = 180 - 100 = 80 degrees.",
      "Since the trapezium is isosceles (PS = QR), the base angles at PQ are equal: angle P = angle Q, so angle Q = 80 degrees.",
      "Since PQ || SR and QR is a transversal, angle Q + angle R = 180 degrees, so angle R = 180 - 80 = 100 degrees (which also equals angle S, matching the isosceles-trapezium property at the SR base)."
    ],
    finalAnswer: "angle P = 80 degrees, angle Q = 80 degrees, angle R = 100 degrees.",
    conceptualTip: "In an isosceles trapezium, you only ever need ONE given angle -- every other angle follows from co-interior angle pairs plus the fact that the two angles at each parallel side match each other."
  },
  {
    id: 12,
    questionNumber: "Practice Q12",
    question: "Is every kite a rhombus? If not, state the correct relationship between kites and rhombuses.",
    given: { "Kite definition": "A quadrilateral ABCD with AB = BC and CD = DA (two distinct pairs of adjacent equal sides)", "Rhombus definition": "A quadrilateral with all four sides equal" },
    formulaUsed: "Compare the two definitions directly.",
    derivationSteps: [
      "A kite only requires AB = BC and CD = DA -- the two pairs do not need to be equal to EACH OTHER. For example, AB = BC = 4 cm and CD = DA = 7 cm is a perfectly valid kite, but not a rhombus, since not all four sides match.",
      "A rhombus requires all four sides to be equal: AB = BC = CD = DA. This automatically satisfies the kite condition too (AB = BC and CD = DA both hold).",
      "So every rhombus qualifies as a kite, but a kite only qualifies as a rhombus in the special case where its two pairs of equal sides happen to be equal to each other too."
    ],
    finalAnswer: "No, not every kite is a rhombus. Every rhombus IS a kite, but a general kite need not be a rhombus -- a rhombus is the special case of a kite where all four sides (not just each adjacent pair) are equal.",
    conceptualTip: "Whenever comparing two quadrilateral types, check whether one definition is a stricter (more demanding) version of the other -- that tells you which one is the special case."
  },
  {
    id: 13,
    questionNumber: "Practice Q13",
    question: "PQRS is a rectangle with diagonals meeting at O. If angle POQ = 100 degrees, find angle QOR, angle ROS, angle SOP, and angle OPQ.",
    given: { "Shape": "Rectangle PQRS", "Diagonals meet at": "O", "angle POQ": "100 degrees" },
    formulaUsed: "Angles on a straight line add up to 180 degrees (linear pair); vertically opposite angles are equal; diagonals of a rectangle bisect each other, so OP = OQ.",
    derivationSteps: [
      "angle POQ and angle QOR lie on the straight line PR, so they form a linear pair: angle QOR = 180 - 100 = 80 degrees.",
      "angle ROS is vertically opposite to angle POQ, so angle ROS = 100 degrees.",
      "angle SOP is vertically opposite to angle QOR, so angle SOP = 80 degrees.",
      "In triangle OPQ, OP = OQ (diagonals of a rectangle bisect each other and are equal), so this triangle is isosceles with apex angle POQ = 100 degrees. The two base angles are equal: angle OPQ = angle OQP = (180 - 100) / 2 = 40 degrees."
    ],
    finalAnswer: "angle QOR = 80 degrees, angle ROS = 100 degrees, angle SOP = 80 degrees, angle OPQ = 40 degrees.",
    conceptualTip: "Once you know just ONE angle at the crossing point of a rectangle's diagonals, all four centre angles follow immediately from linear pairs and vertical angles."
  },
  {
    id: 14,
    questionNumber: "Practice Q14",
    question: "Construct a square with diagonal 7 cm, without using a protractor.",
    given: { "Diagonal of square": "7 cm" },
    formulaUsed: "The diagonals of a square are equal, bisect each other, and cross at exactly 90 degrees -- and a perpendicular bisector can be constructed with a compass alone, no protractor needed.",
    derivationSteps: [
      "Draw line segment AC = 7 cm.",
      "Using a compass, construct the perpendicular bisector of AC -- this locates both the midpoint O and a line through O that is exactly perpendicular to AC, with no protractor required.",
      "On this perpendicular line, mark points B and D such that OB = OD = 3.5 cm (half of AC, since a square's diagonals are equal), one on each side of O.",
      "Join AB, BC, CD, and DA to complete the square."
    ],
    finalAnswer: "ABCD, constructed as described, is the required square with diagonal AC = 7 cm (and, by the same construction, BD = 7 cm too).",
    conceptualTip: "A compass-drawn perpendicular bisector does two jobs at once here: it finds the exact midpoint AND guarantees a perfect 90 degree angle, which is exactly what a square's diagonals need."
  },
  {
    id: 15,
    questionNumber: "Practice Q15",
    question: "WXYZ is a square of side a. U, V, W2, X2 are the midpoints of its four sides, taken in order. What type of quadrilateral is formed by joining these midpoints? Find the length of its sides using geometric reasoning.",
    given: { "Square WXYZ side": "a", "U, V, W2, X2": "midpoints of the four sides, in order" },
    formulaUsed: "Pythagoras' theorem: (hypotenuse)^2 = (leg 1)^2 + (leg 2)^2.",
    derivationSteps: [
      "Each corner of the square, together with the two adjacent midpoints, forms a small right-angled triangle with both legs equal to a/2 (half the square's side) and the right angle equal to the square's own 90 degree corner angle.",
      "By Pythagoras' theorem, the segment joining two adjacent midpoints (the hypotenuse of this small triangle) has length: sqrt[(a/2)^2 + (a/2)^2] = sqrt(a^2/2) = a / sqrt(2).",
      "This calculation is identical at all four corners (since the original shape is a square, every corner is the same), so all four sides of the new quadrilateral are equal to a / sqrt(2).",
      "Each small right-angled triangle is also isosceles (both legs = a/2), so its two base angles are 45 degrees each. This means the angle of the new quadrilateral at each midpoint is 180 - 45 - 45 = 90 degrees."
    ],
    finalAnswer: "The quadrilateral formed by joining the midpoints is itself a square, with each side equal to a / sqrt(2) -- exactly half the area of the original square.",
    conceptualTip: "Joining the midpoints of a square's sides always gives a smaller square, rotated 45 degrees, with exactly half the area of the original -- a useful fact to remember, not just derive each time."
  },
  {
    id: 16,
    questionNumber: "Practice Q16",
    question: "A quadrilateral has all four sides equal in length, and one of its angles is 90 degrees. Must it be a square? Justify using geometric reasoning.",
    given: { "All four sides": "equal", "One angle": "90 degrees" },
    formulaUsed: "A quadrilateral with all sides equal is a rhombus; in a rhombus, adjacent angles are supplementary (add to 180 degrees) and opposite angles are equal.",
    derivationSteps: [
      "Since all four sides are equal, the quadrilateral is a rhombus by definition.",
      "In any rhombus, adjacent angles are supplementary. If one angle is 90 degrees, its two neighbouring (adjacent) angles must each be 180 - 90 = 90 degrees too.",
      "The fourth angle, opposite the original 90 degree angle, must equal it (opposite angles of a rhombus/parallelogram are equal), so it is also 90 degrees.",
      "All four angles are therefore 90 degrees, and all four sides are equal -- satisfying the definition of a square."
    ],
    finalAnswer: "Yes, it must be a square. A rhombus with just one right angle is forced, by the supplementary-adjacent-angles and equal-opposite-angles properties, to have all four angles equal to 90 degrees.",
    conceptualTip: "You never need to check all four angles of a rhombus separately -- if you know ONE of them, supplementary and opposite-angle rules pin down the rest immediately."
  },
  {
    id: 17,
    questionNumber: "Practice Q17",
    question: "ABCD is a quadrilateral in which the opposite sides are equal, that is, AB = CD and BC = AD. What type of quadrilateral must ABCD be? Justify your answer using congruent triangles.",
    given: { "AB": "= CD", "BC": "= AD" },
    formulaUsed: "SSS (side-side-side) congruence condition; alternate interior angles between parallel lines are equal.",
    derivationSteps: [
      "Draw diagonal AC, splitting the quadrilateral into triangle ABC and triangle CDA.",
      "In these two triangles: AB = CD (given), BC = DA (given), and AC = AC (the shared diagonal). By the SSS condition, triangle ABC is congruent to triangle CDA.",
      "Since the triangles are congruent, their corresponding angles are equal: angle BAC = angle DCA, and angle BCA = angle DAC.",
      "angle BAC and angle DCA are alternate interior angles formed by diagonal AC cutting across AB and CD -- since they are equal, AB is parallel to CD.",
      "Similarly, angle BCA and angle DAC are alternate interior angles formed by AC cutting across BC and AD -- since they are equal, BC is parallel to AD.",
      "Both pairs of opposite sides are therefore parallel (as well as equal, which was given)."
    ],
    finalAnswer: "ABCD must be a parallelogram, since both pairs of opposite sides are equal, and this forces both pairs to also be parallel.",
    conceptualTip: "Whenever a quadrilateral problem gives you information about opposite SIDES, drawing one diagonal and looking for SSS or SAS congruence is almost always the way in."
  },
  {
    id: 18,
    questionNumber: "Practice Q18",
    question: "Will the angle-sum property (all four angles adding up to 360 degrees) still hold for a non-convex, 'dart' or 'arrowhead' shaped quadrilateral, where one vertex points inward? Verify using geometric reasoning.",
    given: { "Shape": "A simple (non-self-crossing) quadrilateral with one reflex angle, i.e. one vertex 'caves in'" },
    formulaUsed: "The angle sum of any triangle is 180 degrees.",
    derivationSteps: [
      "Even for a dart-shaped quadrilateral ABCD, you can still draw ONE diagonal (choosing the diagonal that stays fully inside the shape) that splits it into exactly two triangles.",
      "Each of those two triangles has an angle sum of 180 degrees, exactly as for any triangle -- concave or convex makes no difference to this basic fact.",
      "Adding the two triangles' angle sums together accounts for every one of the quadrilateral's four corner angles exactly once (the two angles at the diagonal's endpoints are each split into two parts by the diagonal, but those parts still add up to the full original corner angle).",
      "So the total is 180 + 180 = 360 degrees, exactly as for a convex quadrilateral -- including when one of the four angles is a reflex angle (greater than 180 degrees), as long as the other three angles adjust accordingly."
    ],
    finalAnswer: "Yes. The sum of the angles is still 360 degrees for a dart-shaped (non-convex) quadrilateral, because it can still be split into exactly two triangles by one internal diagonal, and each triangle always contributes 180 degrees.",
    conceptualTip: "The angle-sum property does not depend on the quadrilateral being convex -- it only depends on being able to split the shape into two triangles using a single diagonal that stays inside it."
  },
  {
    id: 19,
    questionNumber: "Practice Q19 (True/False with reasons)",
    question: "State whether each of the following statements is true or false, and justify each answer: (i) A quadrilateral whose diagonals are equal and bisect each other must be a square. (ii) A quadrilateral having three right angles must be a rectangle. (iii) A quadrilateral whose diagonals bisect each other must be a parallelogram. (iv) A quadrilateral whose diagonals are perpendicular to each other must be a rhombus. (v) A quadrilateral in which the opposite angles are equal must be a parallelogram. (vi) A quadrilateral in which all the angles are equal is a rectangle. (vii) Isosceles trapeziums are parallelograms.",
    given: { "Seven independent true/false claims about quadrilateral properties": "see question" },
    formulaUsed: "Each claim is checked against the exact definitions and proven properties of rectangles, squares, parallelograms, rhombuses, kites, and trapeziums.",
    derivationSteps: [
      "(i) Equal + bisecting diagonals guarantee a RECTANGLE (this alone says nothing about the angle between the diagonals). A rectangle is only a square if its diagonals are ALSO perpendicular, which is not given here. So this statement is FALSE.",
      "(ii) If three angles of a quadrilateral are each 90 degrees, the fourth must be 360 - 90 - 90 - 90 = 90 degrees too, since the angle sum is always 360 degrees. A quadrilateral with all four angles equal to 90 degrees is a rectangle by definition. So this statement is TRUE.",
      "(iii) If a quadrilateral's diagonals bisect each other, the two triangles formed at the crossing point on either side are congruent by SAS (equal half-diagonals, vertically opposite angles equal), which makes both pairs of opposite sides equal and parallel -- exactly a parallelogram. So this statement is TRUE.",
      "(iv) Perpendicular diagonals alone do not guarantee equal sides. A kite has perpendicular diagonals but, in general, only two pairs of adjacent equal sides, not all four sides equal -- so a kite is a counter-example. A rhombus additionally needs its diagonals to bisect each other. So this statement is FALSE.",
      "(v) If opposite angles are equal (angle A = angle C and angle B = angle D) and all four angles sum to 360 degrees, then 2(angle A) + 2(angle B) = 360, so angle A + angle B = 180 degrees. Since A and B are adjacent angles on the same side of side AB, this co-interior angle sum of 180 degrees forces the opposite sides to be parallel -- giving a parallelogram. So this statement is TRUE.",
      "(vi) If all four angles are equal, each one is 360 / 4 = 90 degrees. A quadrilateral with every angle equal to 90 degrees satisfies the direct definition of a rectangle (opposite sides equal then follows automatically, it does not need to be assumed separately). So this statement is TRUE.",
      "(vii) An isosceles trapezium has only ONE pair of parallel sides (its two legs are equal in length, but not parallel to each other) -- a parallelogram needs BOTH pairs of opposite sides to be parallel. So this statement is FALSE."
    ],
    finalAnswer: "(i) False. (ii) True. (iii) True. (iv) False. (v) True. (vi) True. (vii) False.",
    conceptualTip: "For every true/false quadrilateral claim, try to either prove it directly from a known property, or find ONE clean counter-example (like the kite for statement iv) -- one solid counter-example is all it takes to disprove a claim."
  }
];

export const MATHS8_MCQS: QuizQuestion[] = [
  { id: 1, question: "The word 'quadrilateral' comes from Latin words meaning:", options: ["Four angles", "Four sides", "Four corners", "Four lines"], correctAnswer: 1, explanation: "'Quadri' means four and 'latus' refers to sides -- so quadrilateral literally means 'four sides'." },
  { id: 2, question: "The sum of all four angles of any quadrilateral is:", options: ["180 degrees", "270 degrees", "360 degrees", "540 degrees"], correctAnswer: 2, explanation: "A diagonal splits any quadrilateral into two triangles, each contributing 180 degrees, giving a total of 360 degrees." },
  { id: 3, question: "A quadrilateral has angles 70, 110, and 95 degrees. What is the fourth angle?", options: ["75 degrees", "85 degrees", "90 degrees", "95 degrees"], correctAnswer: 1, explanation: "360 - 70 - 110 - 95 = 85 degrees." },
  { id: 4, question: "Which diagonal-splitting fact is used to prove the angle-sum property of a quadrilateral?", options: ["A diagonal splits it into two triangles", "A diagonal is always perpendicular to a side", "A diagonal always bisects the quadrilateral's area", "A diagonal is always the longest segment"], correctAnswer: 0, explanation: "Since each triangle has an angle sum of 180 degrees, two triangles give 360 degrees total." },
  { id: 5, question: "Can a quadrilateral have exactly three right angles and one angle that is not 90 degrees?", options: ["Yes, always possible", "No, the fourth angle must also be 90 degrees", "Only if it is a kite", "Only if it is a trapezium"], correctAnswer: 1, explanation: "Since all four angles must sum to 360 degrees, three 90 degree angles force the fourth to be 90 degrees too." },
  { id: 6, question: "A quadrilateral in which all four angles are equal must have each angle equal to:", options: ["60 degrees", "72 degrees", "90 degrees", "120 degrees"], correctAnswer: 2, explanation: "360 / 4 = 90 degrees." },
  { id: 7, question: "A 'simple' quadrilateral, for the angle-sum property to apply by splitting with one diagonal, must be one where:", options: ["The diagonal chosen lies entirely inside the shape", "All sides are equal", "All angles are acute", "It has a pair of parallel sides"], correctAnswer: 0, explanation: "The diagonal needs to stay inside the shape so it genuinely splits it into two non-overlapping triangles." },
  { id: 8, question: "In a Venn diagram of quadrilateral types, the smallest region (contained within all the others shown) is usually:", options: ["Trapezium", "Parallelogram", "Square", "Kite"], correctAnswer: 2, explanation: "A square is a rectangle, a rhombus, and a parallelogram all at once -- the most specific (smallest) category." },
  { id: 9, question: "A rectangle is defined as a quadrilateral in which:", options: ["Opposite sides are equal only", "All angles are 90 degrees", "Diagonals are perpendicular", "All sides are equal"], correctAnswer: 1, explanation: "This single condition (all angles 90 degrees) is enough by itself -- equal opposite sides then follows automatically." },
  { id: 10, question: "The diagonals of a rectangle are always:", options: ["Perpendicular but unequal", "Equal and bisect each other", "Equal but do not bisect each other", "Unequal and do not bisect each other"], correctAnswer: 1, explanation: "This is Property 4 of a rectangle: diagonals are equal in length and bisect each other." },
  { id: 11, question: "In rectangle ABCD, diagonals AC and BD meet at O. Which pair of triangles is congruent by the SAS condition to prove the diagonals bisect each other?", options: ["ABC and ACD", "AOB and COD", "ABD and CDB", "AOD and COB"], correctAnswer: 1, explanation: "Triangle AOB and triangle COD are shown congruent (AAS, using vertical angles and equal alternate angles) to prove OA = OC and OB = OD." },
  { id: 12, question: "If one diagonal of a rectangle is 12 cm, the other diagonal is:", options: ["6 cm", "9 cm", "12 cm", "24 cm"], correctAnswer: 2, explanation: "Diagonals of a rectangle are always equal in length." },
  { id: 13, question: "In rectangle PQRS with diagonals meeting at O, if angle OPQ = 25 degrees, then angle POQ equals:", options: ["25 degrees", "50 degrees", "65 degrees", "130 degrees"], correctAnswer: 3, explanation: "Triangle OPQ is isosceles (OP = OQ), so angle OQP = 25 degrees too, and angle POQ = 180 - 25 - 25 = 130 degrees." },
  { id: 14, question: "A quadrilateral has all four angles equal to 90 degrees. What can be concluded about it, using only this fact?", options: ["It must have equal opposite sides, making it a rectangle", "It could still have unequal opposite sides", "It must be a rhombus", "Nothing further can be concluded"], correctAnswer: 0, explanation: "This is proven using congruent triangles formed by one diagonal -- all-90-degree angles alone force opposite sides to be equal too." },
  { id: 15, question: "AB acts as a transversal to the two sides AD and BC of a rectangle ABCD. Since angle A + angle B = 180 degrees, we conclude that:", options: ["AD is parallel to BC", "AD is perpendicular to BC", "AD equals BC in length only", "AC equals BD"], correctAnswer: 0, explanation: "When co-interior angles on the same side of a transversal sum to 180 degrees, the two lines are parallel." },
  { id: 16, question: "Two wooden strips of equal length, joined so they bisect each other at 55 degrees, form the diagonals of a:", options: ["Rhombus", "Square", "Rectangle", "Trapezium"], correctAnswer: 2, explanation: "Equal diagonals that bisect each other always give a rectangle, whatever the angle between them." },
  { id: 17, question: "A square is best described as a quadrilateral in which:", options: ["All angles are 90 degrees and all sides are equal", "Opposite sides are parallel only", "Diagonals are equal but not perpendicular", "All angles are equal but sides may differ"], correctAnswer: 0, explanation: "This is the definition of a square -- it combines the rectangle condition with the equal-sides condition." },
  { id: 18, question: "Every square is a rectangle, but:", options: ["Every rectangle is also a square", "Not every rectangle is a square", "No rectangle is ever a square", "Squares and rectangles are unrelated"], correctAnswer: 1, explanation: "A square is a special (more restrictive) case of a rectangle, so the relationship only goes one way." },
  { id: 19, question: "The diagonals of a square intersect at an angle of:", options: ["45 degrees", "60 degrees", "90 degrees", "120 degrees"], correctAnswer: 2, explanation: "Property 4 of a square: its diagonals are equal, bisect each other, and cross at exactly 90 degrees." },
  { id: 20, question: "In square ABCD, the diagonal AC bisects angle A into two equal parts. Each part measures:", options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"], correctAnswer: 1, explanation: "Property 5 of a square: diagonals bisect the (90 degree) angles of the square, giving 45 degrees each." },
  { id: 21, question: "A quadrilateral has diagonals that are equal, bisect each other, AND are perpendicular. It must be a:", options: ["Kite", "Rectangle only", "Square", "Trapezium"], correctAnswer: 2, explanation: "All three conditions together (equal, bisecting, perpendicular) are exactly what is needed to guarantee a square." },
  { id: 22, question: "If a square has diagonal 10 cm, then each half-diagonal (from the centre to a vertex) measures:", options: ["2.5 cm", "5 cm", "7.5 cm", "10 cm"], correctAnswer: 1, explanation: "The diagonals bisect each other, so each half is 10 / 2 = 5 cm." },
  { id: 23, question: "A parallelogram is a quadrilateral in which:", options: ["All angles are 90 degrees", "Both pairs of opposite sides are parallel", "All sides are equal", "Diagonals are always equal"], correctAnswer: 1, explanation: "This is the defining condition of a parallelogram -- a rectangle is then a special case with all angles 90 degrees too." },
  { id: 24, question: "In a parallelogram, adjacent angles always:", options: ["Are equal to each other", "Add up to 90 degrees", "Add up to 180 degrees", "Add up to 360 degrees"], correctAnswer: 2, explanation: "Adjacent angles are co-interior angles on a transversal between the parallel sides, so they sum to 180 degrees." },
  { id: 25, question: "In parallelogram ABCD, if angle A = 65 degrees, then angle C equals:", options: ["25 degrees", "65 degrees", "115 degrees", "180 degrees"], correctAnswer: 1, explanation: "Opposite angles of a parallelogram are always equal, so angle C = angle A = 65 degrees." },
  { id: 26, question: "In parallelogram ABCD, if angle A = 65 degrees, then angle B equals:", options: ["65 degrees", "90 degrees", "115 degrees", "125 degrees"], correctAnswer: 2, explanation: "Adjacent angles are supplementary: angle B = 180 - 65 = 115 degrees." },
  { id: 27, question: "The diagonals of a parallelogram always:", options: ["Are equal in length", "Bisect each other", "Are perpendicular to each other", "Bisect the angles of the parallelogram"], correctAnswer: 1, explanation: "This is Property 4 of a parallelogram -- unlike a rectangle, its diagonals need not be equal or perpendicular." },
  { id: 28, question: "Which of these is NOT necessarily true for every parallelogram?", options: ["Opposite sides are equal", "Opposite sides are parallel", "Diagonals are equal in length", "Diagonals bisect each other"], correctAnswer: 2, explanation: "Equal diagonals are a special feature of rectangles (and squares), not of every parallelogram." },
  { id: 29, question: "In parallelogram EASY, triangle AOE is shown congruent to triangle YOS to prove:", options: ["The diagonals are equal", "The diagonals bisect each other", "The diagonals are perpendicular", "The angles are all equal"], correctAnswer: 1, explanation: "This ASA congruence gives OA = OY and OE = OS, showing O is the midpoint of both diagonals." },
  { id: 30, question: "A quadrilateral with two pairs of equal, parallel opposite sides but no 90 degree angle is best classified as a:", options: ["Rectangle", "Rhombus", "General parallelogram", "Trapezium"], correctAnswer: 2, explanation: "Without a right angle or all sides equal, it is a parallelogram but not (necessarily) a rectangle or rhombus." },
  { id: 31, question: "A rhombus is a quadrilateral in which:", options: ["All angles are equal", "All sides are equal in length", "Diagonals are always equal", "Only one pair of sides is parallel"], correctAnswer: 1, explanation: "'All sides equal' is the defining property of a rhombus." },
  { id: 32, question: "The diagonals of a rhombus intersect at an angle of:", options: ["45 degrees", "60 degrees", "90 degrees", "It varies with the rhombus"], correctAnswer: 2, explanation: "Property 6 of a rhombus: its diagonals always cross at exactly 90 degrees, regardless of the rhombus's shape." },
  { id: 33, question: "In rhombus ABCD, the diagonals bisect the angles of the rhombus. If angle A = 70 degrees, the diagonal from A splits it into two angles of:", options: ["70 and 70 degrees", "35 and 35 degrees", "45 and 25 degrees", "70 and 35 degrees"], correctAnswer: 1, explanation: "Property 5: diagonals bisect the angles, so 70 / 2 = 35 degrees each." },
  { id: 34, question: "In rhombus ABCD, if angle A = 70 degrees, then angle B equals:", options: ["70 degrees", "90 degrees", "110 degrees", "180 degrees"], correctAnswer: 2, explanation: "A rhombus is also a parallelogram, so adjacent angles are supplementary: 180 - 70 = 110 degrees." },
  { id: 35, question: "Every rhombus is also a:", options: ["Rectangle", "Parallelogram", "Square", "Kite (in the strict sense of being NOT a rhombus)"], correctAnswer: 1, explanation: "Since a rhombus has both pairs of opposite sides parallel (equal sides force this via alternate angles), it is always a parallelogram." },
  { id: 36, question: "A rhombus is also a square only when:", options: ["Its diagonals are unequal", "It has at least one 90 degree angle", "Its diagonals do not bisect each other", "It has more than four sides"], correctAnswer: 1, explanation: "One right angle in a rhombus forces all four angles to be 90 degrees (supplementary and opposite-angle rules), giving a square." },
  { id: 37, question: "In rhombus GAME, GAE and MAE are shown congruent using the SSS condition. This is used to prove that:", options: ["The diagonal AE bisects angle A and angle E", "The sides are unequal", "The diagonals are equal", "The rhombus is also a rectangle"], correctAnswer: 0, explanation: "The congruence shows the angles split by the diagonal on each side are equal, i.e. the diagonal bisects those angles." },
  { id: 38, question: "If a rhombus has diagonals of length 6 cm and 8 cm, using the right-angle property of its diagonals, its side length is:", options: ["3 cm", "4 cm", "5 cm", "7 cm"], correctAnswer: 2, explanation: "Half-diagonals are 3 cm and 4 cm, meeting at 90 degrees; by Pythagoras, side = sqrt(3^2 + 4^2) = sqrt(25) = 5 cm." },
  { id: 39, question: "A kite is a quadrilateral ABCD that can be labelled such that:", options: ["AB = BC and CD = DA", "AB = CD and BC = DA", "All four sides are equal", "Only AC is a line of symmetry, not BD"], correctAnswer: 0, explanation: "This is the exact definition of a kite: two DISTINCT pairs of adjacent equal sides." },
  { id: 40, question: "In kite ABCD (AB = BC, CD = DA), the diagonal BD:", options: ["Bisects diagonal AC and is perpendicular to it", "Is bisected by diagonal AC", "Is parallel to AC", "Is always equal to AC"], correctAnswer: 0, explanation: "Property 1 of a kite: BD bisects AC and is perpendicular to it, and also bisects angle B and angle D." },
  { id: 41, question: "In a kite, which pair of angles is always equal to each other?", options: ["The two angles between the unequal sides (at B and D)", "The two angles between the two pairs of equal sides (at A and C)", "All four angles", "No angles are ever equal in a kite"], correctAnswer: 1, explanation: "The angles at the two vertices where an equal-length side pair meets (A and C, using AB=BC, CD=DA labelling) are equal, since the kite is symmetric about diagonal BD." },
  { id: 42, question: "A rhombus can always be described as a special type of:", options: ["Kite", "Trapezium only", "Rectangle only", "None of these"], correctAnswer: 0, explanation: "A rhombus (all sides equal) automatically satisfies the kite condition (AB=BC and CD=DA), so it is a special kite." },
  { id: 43, question: "Can a quadrilateral be both a kite and a rectangle at the same time (other than in the trivial square case)?", options: ["Yes, commonly", "No, only a square can be both", "Yes, but only if it is a trapezium too", "This is impossible in any case"], correctAnswer: 1, explanation: "A rectangle's equal-diagonal, equal-opposite-sides structure only matches the kite condition when all four sides are equal, i.e. it is a square." },
  { id: 44, question: "If the diagonals of a kite are 8 cm and 12 cm, and one diagonal is fully bisected by the other, the two segments of the bisected diagonal are each:", options: ["2 cm", "4 cm", "6 cm", "8 cm"], correctAnswer: 1, explanation: "The diagonal that gets bisected (say 8 cm) is split into two equal halves of 4 cm each." },
  { id: 45, question: "A trapezium is a quadrilateral with:", options: ["Both pairs of opposite sides parallel", "At least one pair of parallel opposite sides", "All four sides equal", "Diagonals that always bisect each other"], correctAnswer: 1, explanation: "This is the defining (and least restrictive) condition of a trapezium -- only one pair of sides needs to be parallel." },
  { id: 46, question: "In trapezium PQRS with PQ parallel to SR, angle S and angle P are related by:", options: ["angle S = angle P", "angle S + angle P = 90 degrees", "angle S + angle P = 180 degrees", "angle S = 2 x angle P"], correctAnswer: 2, explanation: "PS is a transversal between the parallel sides PQ and SR, so angle S and angle P are co-interior angles summing to 180 degrees." },
  { id: 47, question: "A trapezium is called an isosceles trapezium when:", options: ["Both pairs of opposite sides are parallel", "The two non-parallel sides are equal in length", "All four angles are equal", "The diagonals are perpendicular"], correctAnswer: 1, explanation: "This is exactly the definition given in the chapter for an isosceles trapezium." },
  { id: 48, question: "In isosceles trapezium UVWX with UV parallel to XW and UX = VW, the angles opposite the equal sides satisfy:", options: ["angle U = angle V", "angle U = angle W", "angle X = angle V", "angle U + angle X = 90 degrees"], correctAnswer: 0, explanation: "Property 2 of an isosceles trapezium: the base angles at the same parallel side (here, U and V, both adjacent to the equal legs) are equal." },
  { id: 49, question: "To prove that the base angles of an isosceles trapezium are equal, perpendiculars are dropped from the two 'top' vertices to the longer parallel side, forming a shape XWZY that is proven to be a:", options: ["Kite", "Rectangle", "Rhombus", "Trapezium"], correctAnswer: 1, explanation: "Since XW is parallel to the base and the dropped segments are perpendicular to it, XWZY has all four angles 90 degrees -- a rectangle." },
  { id: 50, question: "A trapezium has one pair of parallel sides but is NOT isosceles. Which of the following is definitely true about it?", options: ["Its diagonals are always equal", "Its two non-parallel sides can be of any (unequal) lengths", "It must have two right angles", "It cannot have a right angle at all"], correctAnswer: 1, explanation: "A general (non-isosceles) trapezium's non-parallel sides need not be equal -- that equal-legs condition is what makes a trapezium isosceles in the first place." },
];

// Options for every question below follow the standard pattern:
// A: Both assertion and reason are true, and the reason correctly explains the assertion.
// B: Both assertion and reason are true, but the reason does NOT correctly explain the assertion.
// C: The assertion is true, but the reason is false.
// D: The assertion is false, but the reason is true.
export const MATHS8_ASSERTION_REASON: AssertionReasonQuestion[] = [
  { id: 1, assertion: "The sum of all angles of any quadrilateral is 360 degrees.", reason: "A diagonal splits a quadrilateral into two triangles, and each triangle's angles sum to 180 degrees.", correctOption: "A", explanation: "Both statements are true, and the reason is exactly why the assertion holds." },
  { id: 2, assertion: "A quadrilateral can have all four angles obtuse.", reason: "The angle sum of a quadrilateral must be exactly 360 degrees.", correctOption: "D", explanation: "The assertion is false: four obtuse angles (each over 90 degrees) would sum to more than 360 degrees, which is impossible. The reason itself is true." },
  { id: 3, assertion: "Every rectangle is a parallelogram.", reason: "A rectangle has both pairs of opposite sides parallel.", correctOption: "A", explanation: "Both are true, and having parallel opposite sides is exactly the parallelogram condition a rectangle satisfies." },
  { id: 4, assertion: "The diagonals of a rectangle are equal and bisect each other.", reason: "This can be proved using the AAS and SAS congruence conditions on the triangles the diagonals form.", correctOption: "A", explanation: "Both are true; the chapter's Deduction 1 and Deduction 2 use exactly these congruence conditions." },
  { id: 5, assertion: "A quadrilateral whose diagonals are equal must be a rectangle.", reason: "Equal diagonals alone are not sufficient; they must also bisect each other for a rectangle to be guaranteed.", correctOption: "D", explanation: "The assertion is false (an isosceles trapezium can have equal diagonals without being a rectangle), but the reason (about needing bisection too) is a true statement." },
  { id: 6, assertion: "Every square is a rectangle.", reason: "A square satisfies the rectangle's defining condition of all angles being 90 degrees.", correctOption: "A", explanation: "Both are true, and the reason correctly explains why a square qualifies as a rectangle." },
  { id: 7, assertion: "Every rectangle is a square.", reason: "All rectangles have four right angles.", correctOption: "D", explanation: "The assertion is false (a rectangle need not have equal sides), but the reason (all rectangles have four right angles) is true on its own." },
  { id: 8, assertion: "The diagonals of a square bisect its angles.", reason: "Every square is a rhombus, and diagonals of a rhombus always bisect its angles.", correctOption: "A", explanation: "Both are true, and the second (rhombus) property correctly explains the first, since a square is a special rhombus." },
  { id: 9, assertion: "The diagonals of a square are perpendicular to each other.", reason: "The diagonals of every rectangle are always perpendicular.", correctOption: "C", explanation: "The assertion is true (square diagonals are perpendicular), but the reason is false -- a general rectangle's diagonals are NOT perpendicular, only equal and bisecting." },
  { id: 10, assertion: "In a parallelogram, opposite angles are equal.", reason: "Adjacent angles of a parallelogram add up to 180 degrees, which forces opposite angles to match.", correctOption: "A", explanation: "Both statements are true, and the supplementary-adjacent-angle fact is exactly what's used to derive equal opposite angles." },
  { id: 11, assertion: "The diagonals of a parallelogram are always equal in length.", reason: "The diagonals of a parallelogram always bisect each other.", correctOption: "D", explanation: "The assertion is false (only certain parallelograms, like rectangles, have equal diagonals), but the reason about bisection is true for every parallelogram." },
  { id: 12, assertion: "A quadrilateral with both pairs of opposite sides equal must be a parallelogram.", reason: "This can be proved by drawing one diagonal and showing SSS congruence of the two resulting triangles.", correctOption: "A", explanation: "Both are true; this is exactly the reasoning used to prove the shape's sides are parallel via alternate angles." },
  { id: 13, assertion: "A rhombus is always a parallelogram.", reason: "All four sides of a rhombus are equal, which is the defining condition of a parallelogram.", correctOption: "C", explanation: "The assertion is true, but the reason is false -- a parallelogram's defining condition is parallel opposite sides, not equal sides (equal sides is the rhombus's own defining condition, used separately to prove it is also a parallelogram)." },
  { id: 14, assertion: "The diagonals of a rhombus are perpendicular to each other.", reason: "The diagonals of every parallelogram are perpendicular to each other.", correctOption: "C", explanation: "The assertion is true for a rhombus, but the reason is false -- a general parallelogram's diagonals are not necessarily perpendicular." },
  { id: 15, assertion: "In a rhombus, the diagonals bisect its angles.", reason: "This follows from SSS congruence between the two triangles a diagonal splits the rhombus into.", correctOption: "A", explanation: "Both are true, and the SSS congruence (using the equal sides of the rhombus) is exactly how this property is proved." },
  { id: 16, assertion: "Every kite is a rhombus.", reason: "A kite has two pairs of adjacent equal sides.", correctOption: "D", explanation: "The assertion is false (a kite's two pairs of equal sides need not match each other), but the reason correctly describes what a kite is." },
  { id: 17, assertion: "Every rhombus is a kite.", reason: "In a rhombus, all four sides are equal, which automatically satisfies the kite's two-pairs-of-adjacent-equal-sides condition.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why every rhombus qualifies as a kite." },
  { id: 18, assertion: "In a kite, one diagonal bisects the other at right angles.", reason: "In a kite, both diagonals bisect each other.", correctOption: "C", explanation: "The assertion is true, but the reason is false -- in a general kite, only ONE diagonal is bisected by the other; the second diagonal is not necessarily bisected." },
  { id: 19, assertion: "A trapezium can have exactly one pair of parallel sides.", reason: "A trapezium's defining condition only requires AT LEAST one pair of parallel opposite sides.", correctOption: "A", explanation: "Both are true, and the reason directly explains why a trapezium is not required to have two parallel pairs like a parallelogram." },
  { id: 20, assertion: "Every isosceles trapezium is a parallelogram.", reason: "In an isosceles trapezium, the two non-parallel sides (legs) are equal in length.", correctOption: "D", explanation: "The assertion is false (only one pair of sides is parallel, not two), but the reason correctly describes what makes a trapezium isosceles." },
  { id: 21, assertion: "In an isosceles trapezium, the angles at each parallel side are equal to each other.", reason: "This can be shown by dropping perpendiculars from the two shorter-side vertices and proving two right triangles congruent.", correctOption: "A", explanation: "Both are true; this is exactly the method the chapter uses to prove the base-angle property of an isosceles trapezium." },
  { id: 22, assertion: "A quadrilateral whose diagonals bisect each other at right angles must be a rhombus.", reason: "Perpendicular bisecting diagonals make all four sides equal by the Pythagoras theorem applied to each of the four right triangles formed.", correctOption: "A", explanation: "Both are true, and the reason correctly explains why bisecting perpendicular diagonals force all four sides to be equal." },
  { id: 23, assertion: "A quadrilateral whose diagonals are perpendicular must be a rhombus.", reason: "A kite has perpendicular diagonals but is not always a rhombus.", correctOption: "D", explanation: "The assertion is false -- perpendicularity alone is not enough (the diagonals must also bisect each other). The reason (the kite counter-example) is a true statement." },
  { id: 24, assertion: "A quadrilateral with three right angles must be a rectangle.", reason: "The fourth angle is forced to be 90 degrees too, since all four angles must sum to 360 degrees.", correctOption: "A", explanation: "Both are true, and the reason directly explains why the assertion holds." },
  { id: 25, assertion: "A quadrilateral in which opposite angles are equal must be a parallelogram.", reason: "Equal opposite angles force each pair of adjacent angles to sum to 180 degrees, making opposite sides parallel.", correctOption: "A", explanation: "Both are true, and the algebra (2A + 2B = 360, so A + B = 180) is exactly the reasoning used." },
  { id: 26, assertion: "A square, a rectangle, and a rhombus can never all describe the exact same quadrilateral at once.", reason: "A square is defined as a quadrilateral that is simultaneously a rectangle and a rhombus.", correctOption: "D", explanation: "The assertion is false -- a square IS exactly the shape that is simultaneously a rectangle and a rhombus. The reason is a true statement." },
  { id: 27, assertion: "If a quadrilateral is both a rectangle and a rhombus, it must be a square.", reason: "A rectangle guarantees all angles are 90 degrees, and a rhombus guarantees all sides are equal -- together, these are the exact definition of a square.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains the assertion." },
  { id: 28, assertion: "Two straight strips of unequal length, crossed so they bisect each other, can never form a rectangle.", reason: "A rectangle's diagonals must be equal in length as well as bisecting each other.", correctOption: "A", explanation: "Both are true: since the strips (diagonals) are unequal, one of the two required conditions for a rectangle (equal diagonals) fails, so it cannot be a rectangle." },
  { id: 29, assertion: "Joining the midpoints of the four sides of any square always produces a smaller square.", reason: "Each corner of the original square, together with its two adjacent midpoints, forms a congruent isosceles right triangle.", correctOption: "A", explanation: "Both are true, and the four congruent corner triangles are exactly why the inner shape comes out as a square with equal sides and 90 degree angles." },
  { id: 30, assertion: "In rectangle ABCD, if angle OAB = 40 degrees (O being the diagonals' intersection), then angle AOB = 100 degrees.", reason: "Triangle OAB is isosceles since OA = OB (diagonals of a rectangle bisect each other and are equal).", correctOption: "A", explanation: "Both are true: since OA = OB, angle OBA = 40 degrees too, so angle AOB = 180 - 40 - 40 = 100 degrees, and the reason correctly explains why." },
  { id: 31, assertion: "A parallelogram with one right angle must be a rectangle.", reason: "In a parallelogram, adjacent angles are supplementary and opposite angles are equal.", correctOption: "A", explanation: "Both are true: one 90 degree angle forces its adjacent angle to be 90 degrees too (supplementary), and then the opposite angles match, giving all four angles 90 degrees." },
  { id: 32, assertion: "A rhombus with one right angle must be a square.", reason: "In a rhombus, all sides are already equal, and one right angle forces all angles to be 90 degrees by the same supplementary/opposite-angle logic as a parallelogram.", correctOption: "A", explanation: "Both are true, and the reason directly explains the assertion." },
  { id: 33, assertion: "A kite can never have two pairs of parallel opposite sides.", reason: "If a kite had two pairs of parallel opposite sides, it would also be a parallelogram, forcing both pairs of adjacent sides to be equal to each other, making it a rhombus rather than a general kite.", correctOption: "B", explanation: "Both statements are true (a rhombus is indeed a special kite with parallel opposite sides), but the reason describes what happens in the special rhombus case rather than directly explaining why a GENERAL kite lacks two parallel pairs, so it is not the most direct explanation." },
  { id: 34, assertion: "The two diagonals of an isosceles trapezium are equal in length.", reason: "An isosceles trapezium's non-parallel sides (legs) are equal, and this symmetry also makes its diagonals equal.", correctOption: "A", explanation: "Both are true; the same left-right symmetry that makes the legs equal also makes the two diagonals equal in an isosceles trapezium." },
  { id: 35, assertion: "A quadrilateral with two pairs of adjacent equal sides is always symmetric about one of its diagonals.", reason: "This is the defining shape of a kite, which is symmetric about the diagonal joining the two vertices where the unequal side-pairs meet.", correctOption: "A", explanation: "Both are true, and the reason explains exactly why a kite has this line of symmetry." },
  { id: 36, assertion: "Constructing a quadrilateral from two given diagonal lengths and the angle between them always gives a unique quadrilateral, regardless of whether the diagonals bisect each other.", reason: "Two diagonals of given lengths at a given angle, without knowing where they cross each other, do not fix the four vertices uniquely.", correctOption: "D", explanation: "The assertion is false -- without knowing the exact crossing point (e.g. whether they bisect each other), many different quadrilaterals are possible. The reason is a true statement explaining exactly why." },
  { id: 37, assertion: "A quadrilateral inscribed so that its diagonals are two perpendicular diameters of a circle must be a square.", reason: "All radii of a circle are equal, making the two diagonals automatically equal, and diameters always bisect each other at the circle's centre.", correctOption: "A", explanation: "Both are true, and the reason lists exactly the conditions (equal, bisecting, perpendicular) that together guarantee a square." },
  { id: 38, assertion: "A quadrilateral with all sides equal must have all angles equal too.", reason: "A rhombus (all sides equal) can have angles of 60 degrees and 120 degrees rather than 90 degrees each.", correctOption: "D", explanation: "The assertion is false, and the reason (a non-square rhombus example) correctly shows why: equal sides do not force equal angles." },
  { id: 39, assertion: "A quadrilateral with all angles equal must have all sides equal too.", reason: "A rectangle (all angles 90 degrees) can have unequal adjacent sides, such as 4 cm and 7 cm.", correctOption: "D", explanation: "The assertion is false, and the reason (a non-square rectangle example) correctly shows why: equal angles do not force equal sides." },
  { id: 40, assertion: "PQRS is a trapezium with PQ parallel to SR. If angle P = 70 degrees, then angle S = 110 degrees.", reason: "Angles P and S are co-interior angles on the transversal PS between the parallel lines PQ and SR.", correctOption: "A", explanation: "Both are true: co-interior angles sum to 180 degrees, so angle S = 180 - 70 = 110 degrees, exactly as the reason explains." },
  { id: 41, assertion: "A quadrilateral can simultaneously be a trapezium and a parallelogram.", reason: "A parallelogram has at least one pair of parallel sides, which is exactly the trapezium's requirement.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why every parallelogram technically also satisfies the (looser) trapezium condition." },
  { id: 42, assertion: "In rectangle ABCD, diagonal AC divides it into two congruent triangles.", reason: "Triangle ABC and triangle ACD are congruent by the SSS condition, using AB = CD, BC = AD, and the shared side AC.", correctOption: "A", explanation: "Both are true, and the SSS congruence using the rectangle's equal opposite sides is exactly the reasoning that proves this." },
  { id: 43, assertion: "The two triangles formed by a diagonal of a general (non-special) quadrilateral are always congruent to each other.", reason: "A diagonal always splits a quadrilateral into two triangles with equal angle sums of 180 degrees each.", correctOption: "D", explanation: "The assertion is false in general (congruence needs matching side/angle conditions, which a random quadrilateral's diagonal does not guarantee) -- but the reason, about the 180 degree angle sum of each triangle, is true on its own." },
  { id: 44, assertion: "A quadrilateral formed by joining the four endpoints of two line segments that bisect each other is always a parallelogram.", reason: "The vertically opposite angles at the crossing point, together with the equal half-segments, give SAS congruence between opposite triangles.", correctOption: "A", explanation: "Both are true, and the SAS congruence (equal half-diagonals plus vertical angles) directly proves the resulting shape is a parallelogram." },
  { id: 45, assertion: "A rectangle's diagonal always divides it into two right-angled triangles.", reason: "Every angle of a rectangle is 90 degrees, so each triangle formed by a diagonal has at least one right angle.", correctOption: "A", explanation: "Both are true, and the reason correctly explains why: the diagonal 'inherits' one of the rectangle's own right angles in each triangle it creates." },
  { id: 46, assertion: "The diagonals of a rhombus divide it into four congruent right-angled triangles.", reason: "The diagonals of a rhombus bisect each other at right angles, and the half-diagonals are shared consistently between all four resulting triangles.", correctOption: "A", explanation: "Both are true; this fact is also what is used to derive the side length of a rhombus from its two diagonals using Pythagoras' theorem." },
  { id: 47, assertion: "It is possible to construct a quadrilateral where all four sides are equal but the shape is not a rhombus.", reason: "The rhombus is defined precisely as a quadrilateral with all four sides equal.", correctOption: "D", explanation: "The assertion is false -- 'all sides equal' is exactly the definition of a rhombus, so any such shape IS automatically a rhombus. The reason is a true statement." },
  { id: 48, assertion: "A quadrilateral with two pairs of parallel sides and one right angle must be a rectangle.", reason: "In a parallelogram, one right angle forces all four angles to be 90 degrees.", correctOption: "A", explanation: "Both are true: two pairs of parallel sides makes it a parallelogram first, and then the reason's supplementary/opposite-angle logic forces all angles to 90 degrees, giving a rectangle." },
  { id: 49, assertion: "Every parallelogram can be split into two congruent triangles by either of its diagonals.", reason: "Opposite sides of a parallelogram are equal, giving SSS (or SAS with the equal alternate angles) congruence for the two triangles formed by any diagonal.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why this congruence holds for either diagonal." },
  { id: 50, assertion: "A trapezium's diagonals always bisect each other.", reason: "Bisecting diagonals is a property specific to parallelograms, and a general trapezium is not a parallelogram.", correctOption: "D", explanation: "The assertion is false -- a general trapezium's diagonals do not bisect each other (only a parallelogram guarantees this). The reason is a true statement explaining exactly why." },
];

export const MATHS8_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define a quadrilateral.", answer: "A closed plane figure bounded by four line segments (sides), having four vertices and four angles.", keyPoints: ["Four sides", "Four vertices", "Closed figure"] },
  { id: 2, question: "State the angle-sum property of a quadrilateral.", answer: "The sum of all four interior angles of any quadrilateral is always 360 degrees.", keyPoints: ["Sum = 360 degrees", "Proved by splitting into two triangles with one diagonal"] },
  { id: 3, question: "A quadrilateral has angles 80, 100, and 60 degrees. Find the fourth angle.", answer: "360 - 80 - 100 - 60 = 120 degrees.", keyPoints: ["Angle sum = 360 degrees", "Subtract known angles"] },
  { id: 4, question: "Define a rectangle.", answer: "A quadrilateral in which all four angles are equal to 90 degrees.", keyPoints: ["All angles 90 degrees", "Opposite sides then automatically equal"] },
  { id: 5, question: "State two properties of the diagonals of a rectangle.", answer: "They are equal in length, and they bisect each other.", keyPoints: ["Equal length", "Bisect each other"] },
  { id: 6, question: "In rectangle ABCD, AC = 9 cm. Find BD.", answer: "BD = 9 cm, since the diagonals of a rectangle are always equal.", keyPoints: ["Diagonals of a rectangle are equal"] },
  { id: 7, question: "Define a square.", answer: "A quadrilateral in which all four angles are 90 degrees and all four sides are equal in length.", keyPoints: ["All angles 90 degrees", "All sides equal"] },
  { id: 8, question: "At what angle do the diagonals of a square intersect?", answer: "90 degrees (they are also equal and bisect each other).", keyPoints: ["Perpendicular", "Also equal and bisecting"] },
  { id: 9, question: "Is every square a rhombus? Justify in one line.", answer: "Yes, since all four sides of a square are equal, which is exactly the rhombus condition.", keyPoints: ["All sides equal satisfies rhombus definition"] },
  { id: 10, question: "Define a parallelogram.", answer: "A quadrilateral in which both pairs of opposite sides are parallel.", keyPoints: ["Both pairs of opposite sides parallel"] },
  { id: 11, question: "In parallelogram ABCD, angle A = 75 degrees. Find angle B.", answer: "Angle B = 180 - 75 = 105 degrees, since adjacent angles of a parallelogram are supplementary.", keyPoints: ["Adjacent angles sum to 180 degrees"] },
  { id: 12, question: "In parallelogram ABCD, angle A = 75 degrees. Find angle C.", answer: "Angle C = 75 degrees, since opposite angles of a parallelogram are equal.", keyPoints: ["Opposite angles are equal"] },
  { id: 13, question: "State one property of the diagonals of a parallelogram.", answer: "The diagonals of a parallelogram bisect each other (but are not necessarily equal or perpendicular).", keyPoints: ["Bisect each other"] },
  { id: 14, question: "Define a rhombus.", answer: "A quadrilateral in which all four sides are of equal length.", keyPoints: ["All sides equal"] },
  { id: 15, question: "State two properties of the diagonals of a rhombus.", answer: "They bisect each other at right angles (90 degrees), and they bisect the angles of the rhombus.", keyPoints: ["Perpendicular bisectors of each other", "Bisect the angles"] },
  { id: 16, question: "A rhombus has one angle of 110 degrees. Find the angle adjacent to it.", answer: "180 - 110 = 70 degrees, since a rhombus is a parallelogram and adjacent angles are supplementary.", keyPoints: ["Adjacent angles supplementary"] },
  { id: 17, question: "A rhombus has diagonals 6 cm and 8 cm. Find its side length.", answer: "Half-diagonals are 3 cm and 4 cm, meeting at 90 degrees; side = sqrt(3^2 + 4^2) = 5 cm.", keyPoints: ["Pythagoras on half-diagonals", "Diagonals meet at 90 degrees"] },
  { id: 18, question: "Define a kite.", answer: "A quadrilateral ABCD that can be labelled such that AB = BC and CD = DA -- two distinct pairs of adjacent equal sides.", keyPoints: ["Two pairs of adjacent equal sides"] },
  { id: 19, question: "State one property of the diagonals of a kite.", answer: "One diagonal bisects the other diagonal, and is perpendicular to it.", keyPoints: ["One diagonal bisects the other, perpendicularly"] },
  { id: 20, question: "Is every kite a rhombus? Answer in one line.", answer: "No, only when its two pairs of equal sides happen to be equal to each other too.", keyPoints: ["Only a special case of kite is a rhombus"] },
  { id: 21, question: "Define a trapezium.", answer: "A quadrilateral with at least one pair of parallel opposite sides.", keyPoints: ["At least one pair of parallel sides"] },
  { id: 22, question: "Define an isosceles trapezium.", answer: "A trapezium in which the two non-parallel sides (legs) are equal in length.", keyPoints: ["Non-parallel sides (legs) equal"] },
  { id: 23, question: "In trapezium PQRS with PQ parallel to SR, angle P = 65 degrees. Find angle S.", answer: "Angle S = 180 - 65 = 115 degrees, since P and S are co-interior angles on transversal PS.", keyPoints: ["Co-interior angles sum to 180 degrees"] },
  { id: 24, question: "Name the quadrilateral formed when two perpendicular diameters of a circle are joined at their four endpoints.", answer: "A square, since the diagonals are equal (both are radii-based), bisect each other (both pass through the centre), and are perpendicular.", keyPoints: ["Equal, bisecting, perpendicular diagonals give a square"] },
  { id: 25, question: "Which single extra condition turns a rectangle into a square?", answer: "Its diagonals must also be perpendicular to each other (equivalently, all sides must also be equal).", keyPoints: ["Perpendicular diagonals", "Equivalently, equal sides"] },
  { id: 26, question: "Which single extra condition turns a parallelogram into a rhombus?", answer: "All four sides must be equal in length (equivalently, the diagonals must be perpendicular).", keyPoints: ["Equal sides", "Equivalently, perpendicular diagonals"] },
  { id: 27, question: "Which single extra condition turns a parallelogram into a rectangle?", answer: "One of its angles must be 90 degrees (this forces all four angles to become 90 degrees).", keyPoints: ["One right angle forces all four"] },
  { id: 28, question: "A quadrilateral has three angles of 90 degrees each. Is it necessarily a rectangle?", answer: "Yes, since the fourth angle must also be 90 degrees (angle sum = 360 degrees), giving all angles equal to 90 degrees.", keyPoints: ["Angle sum forces the fourth angle to 90 degrees too"] },
  { id: 29, question: "In rectangle PQRS, diagonals meet at O and angle OPQ = 42 degrees. Find angle OQP.", answer: "Angle OQP = 42 degrees, since triangle OPQ is isosceles (OP = OQ, as diagonals bisect each other and are equal).", keyPoints: ["OP = OQ makes triangle isosceles"] },
  { id: 30, question: "In the same rectangle PQRS, find angle POQ.", answer: "Angle POQ = 180 - 42 - 42 = 96 degrees.", keyPoints: ["Angle sum of triangle OPQ = 180 degrees"] },
  { id: 31, question: "Why can a quadrilateral never have all four angles obtuse?", answer: "Because four angles each greater than 90 degrees would sum to more than 360 degrees, violating the angle-sum property.", keyPoints: ["Angle sum must equal 360 degrees exactly"] },
  { id: 32, question: "What congruence condition is used to prove that the diagonals of a rectangle bisect each other?", answer: "The AAS (angle-angle-side) congruence condition, applied to the triangles formed at the diagonals' crossing point.", keyPoints: ["AAS congruence"] },
  { id: 33, question: "What congruence condition is used to prove the diagonals of a square meet at 90 degrees?", answer: "The SSS (side-side-side) congruence condition.", keyPoints: ["SSS congruence"] },
  { id: 34, question: "State whether true or false: 'A quadrilateral whose diagonals bisect each other must be a parallelogram.'", answer: "True -- this is a standard, provable property (via SAS congruence of the triangles formed at the crossing point).", keyPoints: ["True", "Proved using SAS congruence"] },
  { id: 35, question: "State whether true or false: 'A quadrilateral whose diagonals are perpendicular must be a rhombus.'", answer: "False -- a kite has perpendicular diagonals but is not necessarily a rhombus; the diagonals must also bisect each other.", keyPoints: ["False", "Kite is a counter-example"] },
  { id: 36, question: "Two equal wooden strips are joined so they bisect each other at 65 degrees. What quadrilateral do their endpoints form?", answer: "A rectangle, since the diagonals are equal and bisect each other (the angle between them does not affect this result).", keyPoints: ["Equal + bisecting diagonals give a rectangle regardless of angle"] },
  { id: 37, question: "Name the quadrilateral formed by joining the midpoints of the four sides of a square, in order.", answer: "A smaller square, rotated 45 degrees, with side length 1/sqrt(2) times the original square's side.", keyPoints: ["Smaller square", "Side = original side / sqrt(2)"] },
  { id: 38, question: "What is the ratio of the area of the midpoint-square to the area of the original square?", answer: "1 : 2 (the midpoint square has exactly half the area of the original square).", keyPoints: ["Half the area"] },
  { id: 39, question: "In rhombus ABCD, angle A = angle C = 64 degrees. Find angle B and angle D.", answer: "Angle B = angle D = 180 - 64 = 116 degrees.", keyPoints: ["Opposite angles equal, adjacent angles supplementary"] },
  { id: 40, question: "Two cardboard equilateral triangles of side 6 cm are joined along a full side. Name the quadrilateral formed and give its angles.", answer: "A rhombus with all sides 6 cm and angles 60 degrees, 120 degrees, 60 degrees, 120 degrees.", keyPoints: ["Rhombus", "Angles 60, 120, 60, 120"] },
  { id: 41, question: "Which of a rectangle's properties does NOT necessarily hold for a general parallelogram?", answer: "Having all angles equal to 90 degrees, and having equal diagonals.", keyPoints: ["90 degree angles", "Equal diagonals"] },
  { id: 42, question: "In a Venn diagram of quadrilaterals, where does the 'square' region lie relative to 'rectangle' and 'rhombus'?", answer: "The square region lies entirely inside the overlap of the rectangle region and the rhombus region.", keyPoints: ["Square = intersection of rectangle and rhombus"] },
  { id: 43, question: "Give one real-life object that is (approximately) shaped like a trapezium.", answer: "A trapezium-shaped table top, a lampshade cross-section, or the side view of certain handbags -- any object with just one pair of parallel edges.", keyPoints: ["Any object with only one pair of parallel edges"] },
  { id: 44, question: "Give one real-life object that is (approximately) shaped like a kite.", answer: "A flying kite (the toy itself), or certain traffic/road signs and window/door grille patterns.", keyPoints: ["A flying kite toy, or a diamond-shaped sign"] },
  { id: 45, question: "In kite ABCD (AB = BC, CD = DA), which diagonal is the line of symmetry?", answer: "Diagonal BD, since it joins the two vertices where the unequal side-pairs meet, and both halves of the kite mirror each other across it.", keyPoints: ["Diagonal BD is the line of symmetry"] },
  { id: 46, question: "A rectangle's diagonal is 15 cm. What is the length of each half-diagonal after the diagonals bisect each other?", answer: "7.5 cm each.", keyPoints: ["Half of 15 cm"] },
  { id: 47, question: "A square has side 4 cm. Using Pythagoras' theorem, find the length of its diagonal.", answer: "Diagonal = sqrt(4^2 + 4^2) = sqrt(32) = 4 x sqrt(2) cm, approximately 5.66 cm.", keyPoints: ["Pythagoras on two adjacent sides"] },
  { id: 48, question: "State the two conditions needed to construct a parallelogram uniquely from its diagonals.", answer: "The lengths of the two diagonals, and the angle at which they cross (since they must bisect each other at that point).", keyPoints: ["Both diagonal lengths", "Angle between them"] },
  { id: 49, question: "What extra condition, beyond a parallelogram's diagonal construction, is needed to construct a rhombus instead?", answer: "The angle between the diagonals must specifically be 90 degrees.", keyPoints: ["90 degree crossing angle"] },
  { id: 50, question: "Why does a kite's construction from its diagonals differ from a rhombus's construction, even though both use perpendicular diagonals?", answer: "In a rhombus, BOTH diagonals bisect each other; in a kite, only ONE diagonal is bisected by the other, so the two halves of the second diagonal can be unequal.", keyPoints: ["Rhombus: both diagonals bisected", "Kite: only one diagonal bisected"] },
];

export const MATHS8_SHORT: ShortQuestion[] = [
  { id: 1, question: "In rectangle ABCD, diagonals meet at O. If angle OAB = 28 degrees, find angle AOB.", answer: "Since OA = OB (diagonals bisect each other and are equal), triangle OAB is isosceles, so angle OBA = 28 degrees. Then angle AOB = 180 - 28 - 28 = 124 degrees.", keyPoints: ["OA = OB, so triangle OAB is isosceles", "angle OBA = angle OAB = 28 degrees", "angle AOB = 180 - 28 - 28 = 124 degrees"] },
  { id: 2, question: "The adjacent angles of a parallelogram are in the ratio 2:3. Find all four angles.", answer: "Let the angles be 2x and 3x. Since adjacent angles are supplementary, 2x + 3x = 180, so x = 36. The angles are 72, 108, 72, and 108 degrees (opposite angles equal).", keyPoints: ["Adjacent angles sum to 180 degrees", "2x + 3x = 180 gives x = 36", "Angles are 72, 108, 72, 108 degrees"] },
  { id: 3, question: "A rhombus has diagonals of length 10 cm and 24 cm. Find the length of each side.", answer: "The diagonals bisect each other at right angles, giving half-diagonals of 5 cm and 12 cm. By Pythagoras' theorem, side = sqrt(5^2 + 12^2) = sqrt(169) = 13 cm.", keyPoints: ["Half-diagonals are 5 cm and 12 cm", "Diagonals meet at 90 degrees", "side = sqrt(5^2 + 12^2) = 13 cm"] },
  { id: 4, question: "A square has a perimeter of 32 cm. Find the length of its diagonal.", answer: "Each side = 32 / 4 = 8 cm. Using Pythagoras' theorem on two adjacent sides, diagonal = sqrt(8^2 + 8^2) = sqrt(128) = 8 x sqrt(2), approximately 11.3 cm.", keyPoints: ["Side = perimeter / 4 = 8 cm", "Diagonal = sqrt(8^2 + 8^2)", "Diagonal = 8 x sqrt(2) cm, about 11.3 cm"] },
  { id: 5, question: "A kite ABCD has AB = BC = 6 cm and CD = DA = 9 cm. Find its perimeter.", answer: "Perimeter = AB + BC + CD + DA = 6 + 6 + 9 + 9 = 30 cm.", keyPoints: ["Kite has two pairs of adjacent equal sides", "Add all four sides", "Perimeter = 30 cm"] },
  { id: 6, question: "Prove that every square is a rhombus.", answer: "By definition, a square has all four sides equal in length. A rhombus is defined as a quadrilateral with all four sides equal. Since a square satisfies this exact condition, every square is a rhombus.", keyPoints: ["Square: all sides equal (part of its definition)", "Rhombus definition: all sides equal", "Square satisfies the rhombus condition directly"] },
  { id: 7, question: "Prove that the diagonals of a parallelogram bisect each other.", answer: "In parallelogram ABCD with diagonals meeting at O, AB is parallel to CD, so alternate angles OAB and OCD are equal, and alternate angles OBA and ODC are equal. Since AB = CD (opposite sides), triangle AOB is congruent to triangle COD by ASA. Therefore OA = OC and OB = OD, so O bisects both diagonals.", keyPoints: ["Alternate angles equal (AB || CD)", "AOB congruent to COD by ASA (using AB = CD)", "OA = OC and OB = OD, so O bisects both diagonals"] },
  { id: 8, question: "In isosceles trapezium PQRS, PQ is parallel to SR, and angle P = 110 degrees. Find angle Q, angle R, and angle S.", answer: "Since P and S are co-interior angles, angle S = 180 - 110 = 70 degrees. In an isosceles trapezium, angle Q = angle P = 110 degrees (base angles at PQ are equal), and angle R = angle S = 70 degrees.", keyPoints: ["angle S = 180 - 110 = 70 degrees (co-interior)", "angle Q = angle P = 110 degrees (isosceles base angles)", "angle R = angle S = 70 degrees"] },
  { id: 9, question: "Prove that the diagonals of a rectangle are equal in length.", answer: "In rectangle ABCD, AB = CD (opposite sides), angle BAD = angle CDA = 90 degrees, and AD is a common side. So triangle ADC is congruent to triangle DAB by the SAS condition. Therefore AC = BD (corresponding sides of congruent triangles), proving the diagonals are equal.", keyPoints: ["AB = CD and angle BAD = angle CDA = 90 degrees, AD common", "Triangle ADC congruent to triangle DAB by SAS", "AC = BD as corresponding parts of congruent triangles"] },
  { id: 10, question: "A rhombus has one angle of 128 degrees. Find the measures of all four angles, and the two angles into which one diagonal splits the 128 degree angle.", answer: "Since a rhombus is a parallelogram, the adjacent angle is 180 - 128 = 52 degrees, and the opposite angle to 128 degrees is also 128 degrees. So the angles are 128, 52, 128, 52 degrees. Since the diagonals of a rhombus bisect its angles, the 128 degree angle is split into two equal parts of 64 degrees each.", keyPoints: ["Adjacent angle = 180 - 128 = 52 degrees", "Angles are 128, 52, 128, 52 degrees", "Diagonal bisects 128 degrees into two 64 degree parts"] },
  { id: 11, question: "PQRS is a quadrilateral where PQ = RS and QR = SP. Prove that PQRS is a parallelogram.", answer: "Draw diagonal PR. In triangle PQR and triangle RSP: PQ = RS (given), QR = SP (given), and PR = PR (common side). By SSS, triangle PQR is congruent to triangle RSP. So angle QPR = angle SRP (alternate angles), giving PQ || SR, and angle QRP = angle SPR (alternate angles), giving QR || PS. Both pairs of opposite sides are parallel, so PQRS is a parallelogram.", keyPoints: ["Draw diagonal PR; PQR congruent to RSP by SSS", "Equal alternate angles show PQ || SR", "Equal alternate angles show QR || PS, so PQRS is a parallelogram"] },
  { id: 12, question: "Two diagonals of length 14 cm and 10 cm bisect each other at an angle of 75 degrees. What quadrilateral do their endpoints form, and would the answer change if the angle were 40 degrees instead?", answer: "Since the diagonals bisect each other but are unequal (14 cm and 10 cm), the resulting quadrilateral is a general parallelogram, not a rectangle, regardless of the angle. The angle (75 degrees or 40 degrees) affects the parallelogram's exact shape but never turns it into a rectangle, since that specifically requires equal diagonals.", keyPoints: ["Bisecting diagonals give a parallelogram", "Diagonals are unequal, so it cannot be a rectangle", "The crossing angle does not change this conclusion either way"] },
  { id: 13, question: "In kite ABCD (AB = BC, CD = DA), prove that diagonal BD bisects angle ABC.", answer: "In triangle ABD and triangle CBD: AB = CB (given), AD = CD (given), and BD = BD (common side). By SSS, triangle ABD is congruent to triangle CBD. Therefore angle ABD = angle CBD (corresponding angles of congruent triangles), which means diagonal BD bisects angle ABC.", keyPoints: ["ABD congruent to CBD by SSS (AB=CB, AD=CD, BD common)", "angle ABD = angle CBD as corresponding parts", "This means BD bisects angle ABC"] },
  { id: 14, question: "A parallelogram has sides 9 cm and 6 cm, and one diagonal of 11 cm. Explain briefly why we cannot immediately assume the other diagonal is also 11 cm.", answer: "The diagonals of a general parallelogram are not necessarily equal -- equal diagonals is a special property of rectangles (and squares) only. Since we are not told this parallelogram has any 90 degree angle, we cannot assume the second diagonal also equals 11 cm; it would need to be calculated or given separately.", keyPoints: ["Equal diagonals is a rectangle-specific property", "A general parallelogram need not have equal diagonals", "No right angle is given, so equality cannot be assumed"] },
  { id: 15, question: "In trapezium ABCD, AB is parallel to CD. If angle A = 3x and angle D = 2x, find x, angle A, and angle D.", answer: "Since AD is a transversal to the parallel sides AB and CD, angle A and angle D are co-interior angles: 3x + 2x = 180, so 5x = 180, giving x = 36. angle A = 3(36) = 108 degrees, and angle D = 2(36) = 72 degrees.", keyPoints: ["Co-interior angles: 3x + 2x = 180", "x = 36", "angle A = 108 degrees, angle D = 72 degrees"] },
  { id: 16, question: "Show that the quadrilateral formed by joining two congruent isosceles triangles (base 8 cm, equal sides 6 cm each) along their equal bases is a kite.", answer: "When the two triangles are joined along their equal 8 cm bases, that base becomes an internal diagonal. The outer sides of the new quadrilateral are the two 6 cm sides from each triangle, giving two pairs of adjacent sides, each pair equal to 6 cm -- but the quadrilateral is not a rhombus unless all four outer sides also happen to be equal to each other overall, which is only guaranteed if both triangles are identical, giving exactly the kite condition (two distinct pairs of adjacent equal sides).", keyPoints: ["Shared 8 cm base becomes an internal diagonal", "Outer sides come in two pairs of 6 cm each, from each triangle", "Two pairs of adjacent equal sides is exactly the kite definition"] },
  { id: 17, question: "In rectangle ABCD, prove that opposite sides are parallel, given that all its angles are 90 degrees.", answer: "AB acts as a transversal to sides AD and BC. Since angle A = angle B = 90 degrees, angle A + angle B = 180 degrees. When co-interior angles on the same side of a transversal sum to 180 degrees, the two lines are parallel -- so AD is parallel to BC. The same reasoning with BC as a transversal shows AB is parallel to DC.", keyPoints: ["angle A + angle B = 90 + 90 = 180 degrees", "Co-interior angle sum of 180 degrees means AD || BC", "Same argument (with BC as transversal) gives AB || DC"] },
  { id: 18, question: "A quadrilateral WXYZ has WX = 7 cm, XY = 7 cm, YZ = 10 cm, and ZW = 10 cm. If it is also known that angle X = 90 degrees, find angle W, angle Y, and angle Z, assuming WXYZ is a kite.", answer: "In a kite, the angles at the two vertices between the DIFFERENT side-pairs (here, X and Z, since WX=XY and YZ=ZW) are the ones that can differ, while the angles at the OTHER two vertices (W and Y, between the equal-length sides meeting there) are equal to each other. Using the angle sum: angle X + angle Z + 2(angle W) = 360, but without more information (like a diagonal length), angle Z and angle W individually need extra given data -- however, we can state angle W = angle Y always holds in this labelling.", keyPoints: ["X and Z are the kite's 'unequal' vertices", "W and Y are the kite's 'equal' vertices: angle W = angle Y", "Full numeric answer needs one more given angle or diagonal length"] },
  { id: 19, question: "In rhombus PQRS, the diagonal PR = 16 cm and side PQ = 10 cm. Find the length of diagonal QS.", answer: "Half of PR = 8 cm. Since the diagonals meet at 90 degrees, by Pythagoras' theorem: (half of QS)^2 = PQ^2 - 8^2 = 100 - 64 = 36, so half of QS = 6 cm. Therefore QS = 12 cm.", keyPoints: ["Half of PR = 8 cm", "Pythagoras: (half QS)^2 = 10^2 - 8^2 = 36", "QS = 2 x 6 = 12 cm"] },
  { id: 20, question: "Explain, using the properties of a parallelogram, why a rhombus must also have supplementary adjacent angles.", answer: "A rhombus is a special case of a parallelogram (since equal sides force both pairs of opposite sides to be parallel, via alternate angles on the diagonal). Every parallelogram has adjacent angles that are co-interior angles on a transversal between its parallel sides, and these always sum to 180 degrees. Since a rhombus is a parallelogram, this same property applies to it too.", keyPoints: ["A rhombus is a special parallelogram", "Parallelograms have supplementary adjacent angles (co-interior angles)", "This property is inherited by every rhombus"] },
  { id: 21, question: "A trapezium's parallel sides are 12 cm and 20 cm. If it is isosceles with legs of 5 cm each, is it possible to determine its height without more information? Explain in brief with reasoning, not full calculation.", answer: "Yes -- an isosceles trapezium is symmetric, so dropping perpendiculars from the two ends of the shorter parallel side splits the difference between the two parallel sides (20 - 12 = 8 cm) equally, giving 4 cm on each side. This 4 cm, together with the known leg length of 5 cm, forms a right triangle whose height can be found using Pythagoras' theorem.", keyPoints: ["Symmetry splits the 8 cm difference into two 4 cm segments", "Each 4 cm segment, with the 5 cm leg, forms a right triangle", "Height is then found using Pythagoras' theorem"] },
  { id: 22, question: "Prove that a quadrilateral with all four angles equal must be a rectangle.", answer: "If all four angles are equal, and they must sum to 360 degrees, each angle is 360 / 4 = 90 degrees. A quadrilateral in which all four angles measure 90 degrees satisfies the direct definition of a rectangle, so it must be a rectangle.", keyPoints: ["Equal angles summing to 360 degrees gives 90 degrees each", "All angles 90 degrees is exactly the rectangle's definition", "So the quadrilateral must be a rectangle"] },
  { id: 23, question: "In parallelogram ABCD, the diagonal AC is drawn. State the congruence condition used to show triangle ABC is congruent to triangle CDA, and name the pairs of equal angles this reveals.", answer: "The condition used is SSS congruence (or alternate-interior-angle-based ASA), since AB = CD, BC = AD, and AC is common. This congruence reveals that angle BAC = angle DCA, and angle BCA = angle DAC -- these equal alternate angle pairs are what prove AB || CD and BC || AD.", keyPoints: ["SSS congruence (AB=CD, BC=AD, AC common)", "angle BAC = angle DCA and angle BCA = angle DAC", "These alternate angles prove both pairs of sides are parallel"] },
  { id: 24, question: "A square-shaped photo frame has a diagonal wire brace of length 42 cm. Find the length of each side of the frame, to one decimal place.", answer: "Using diagonal = side x sqrt(2): side = 42 / sqrt(2) = 42 / 1.414, approximately 29.7 cm.", keyPoints: ["diagonal = side x sqrt(2)", "side = 42 / sqrt(2)", "side is approximately 29.7 cm"] },
  { id: 25, question: "Explain why a general quadrilateral (with no special properties given) cannot be constructed using only its four side lengths.", answer: "Four given side lengths alone do not fix the shape rigidly -- the quadrilateral can 'flex' at its vertices like a hinge, changing its angles (and hence its diagonals) while keeping all four sides the same length. At least one more piece of information, such as a diagonal length or an angle, is needed to fix a unique shape.", keyPoints: ["Four sides alone allow the shape to flex at its vertices", "Angles (and diagonals) can vary while sides stay fixed", "A diagonal length or angle is needed for a unique construction"] },
  { id: 26, question: "In rectangle ABCD, prove that triangle ABD is congruent to triangle DCA (Hint: use the equal diagonal property).", answer: "AB = DC (opposite sides of the rectangle), AD = DA (common side), and BD = CA (diagonals of a rectangle are equal). By the SSS condition, triangle ABD is congruent to triangle DCA.", keyPoints: ["AB = DC (opposite sides)", "AD common, BD = CA (equal diagonals)", "SSS congruence gives triangle ABD congruent to triangle DCA"] },
  { id: 27, question: "A kite-shaped garden bed has diagonals 5 m and 7 m, with one diagonal bisected by the other. If the bisected diagonal is the 5 m one, find the length of each half.", answer: "Since the 5 m diagonal is the one being bisected, each half is 5 / 2 = 2.5 m. (The 7 m diagonal is not necessarily split evenly.)", keyPoints: ["The 5 m diagonal is bisected", "Each half is 5 / 2 = 2.5 m", "The 7 m diagonal need not be split evenly"] },
  { id: 28, question: "Explain briefly why isosceles trapeziums are not parallelograms, even though they have a line of symmetry.", answer: "A parallelogram requires BOTH pairs of opposite sides to be parallel. An isosceles trapezium only guarantees ONE pair of parallel sides (its two parallel bases) -- its two legs, though equal in length, are not parallel to each other. Having a line of symmetry does not by itself guarantee two pairs of parallel sides.", keyPoints: ["Parallelogram needs both pairs of opposite sides parallel", "Isosceles trapezium only has one pair (the bases) parallel", "Symmetry alone does not imply a second parallel pair"] },
  { id: 29, question: "A rhombus and a rectangle have the same pair of diagonal lengths, 6 cm and 8 cm. Do they have the same side length? Explain.", answer: "No. In the rhombus, the diagonals bisect each other at 90 degrees, so its side = sqrt(3^2 + 4^2) = 5 cm (using half-diagonals 3 and 4). In the rectangle, the diagonals are equal to each other by definition, so having two DIFFERENT diagonal lengths (6 cm and 8 cm) is not even possible for a rectangle -- a rectangle could not actually have this pair of diagonals in the first place.", keyPoints: ["Rhombus side = sqrt(3^2 + 4^2) = 5 cm, using half-diagonals", "A rectangle's two diagonals must be equal by definition", "Unequal diagonals (6 and 8 cm) rule out a rectangle entirely"] },
  { id: 30, question: "State the three quadrilaterals that always have at least one pair of parallel sides, other than the trapezium itself.", answer: "Parallelogram, rectangle, and rhombus (and, as a further special case, the square) -- all of these have both pairs of opposite sides parallel, which automatically satisfies the trapezium's single-pair requirement too.", keyPoints: ["Parallelogram, rectangle, rhombus (and square) all qualify", "They all have BOTH pairs of sides parallel", "This automatically satisfies a trapezium's looser condition"] },
];

export const MATHS8_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Prove that the diagonals of a rectangle are equal in length and bisect each other.",
    markingScheme: ["Correct proof that the diagonals are equal, using SAS congruence (2 marks)", "Correct proof that the diagonals bisect each other, using AAS congruence (2.5 marks)", "Clear diagram/labelling throughout (0.5 marks)"],
    answerParts: [
      { part: "Equal diagonals", text: "In rectangle ABCD, AB = CD (opposite sides), angle BAD = angle CDA = 90 degrees, and AD is common to triangles ADC and DAB. By SAS, triangle ADC is congruent to triangle DAB, so AC = BD (corresponding parts of congruent triangles). The diagonals are equal." },
      { part: "Diagonals bisect each other", text: "Let the diagonals meet at O. In triangle AOB and triangle COD: angle AOB = angle COD (vertically opposite), and since AB is parallel to DC (rectangle property), angle OAB = angle OCD and angle OBA = angle ODC (alternate angles). By AAS, triangle AOB is congruent to triangle COD." },
      { part: "Conclusion", text: "Since the triangles are congruent, OA = OC and OB = OD, so O is the midpoint of both diagonals -- the diagonals bisect each other. Combined with the first part, the diagonals of a rectangle are equal in length AND bisect each other." },
    ],
  },
  {
    id: 2,
    question: "Prove that if all four angles of a quadrilateral are 90 degrees, then its opposite sides must be equal (so the quadrilateral is automatically a rectangle).",
    markingScheme: ["Setting up the diagonal and identifying the two triangles (1 mark)", "Correct AAS congruence argument (2.5 marks)", "Correct conclusion about opposite sides (1.5 marks)"],
    answerParts: [
      { part: "Setting up", text: "Let ABCD be a quadrilateral with angle A = angle B = angle C = angle D = 90 degrees. Draw diagonal BD, forming triangle BAD and triangle DCB." },
      { part: "Proving congruence", text: "Since angle A = angle C = 90 degrees, and BD is common to both triangles, we need one more equality. Since angle ABD + angle DBC = angle B = 90 degrees, and in triangle DCB, angle BDC + angle DBC = 90 degrees (as angle C = 90 degrees means the other two angles of that triangle sum to 90), it follows that angle ABD = angle BDC. By AAS (angle A = angle C = 90 degrees, angle ABD = angle BDC, BD common), triangle BAD is congruent to triangle DCB." },
      { part: "Conclusion", text: "Since the triangles are congruent, AD = CB and AB = CD (corresponding sides), proving opposite sides are equal. Combined with all angles being 90 degrees, this satisfies both the older and newer definitions of a rectangle -- so a quadrilateral with all angles 90 degrees is always a rectangle, with no extra condition needed." },
    ],
  },
  {
    id: 3,
    question: "Prove that the diagonals of a square bisect each other at right angles.",
    markingScheme: ["Correct SSS congruence set-up between the two triangles formed (2 marks)", "Correct use of the linear pair to reach 90 degrees (2 marks)", "Clear final statement (1 mark)"],
    answerParts: [
      { part: "Setting up congruence", text: "Let ABCD be a square with diagonals meeting at O. In triangle BOA and triangle BOC: AB = CB (all sides of a square are equal), OA = OC (a square is a rectangle, so its diagonals bisect each other), and OB is common. By SSS, triangle BOA is congruent to triangle BOC." },
      { part: "Finding the angle", text: "Since the triangles are congruent, angle BOA = angle BOC (corresponding angles). But angle BOA and angle BOC together form a straight line (angle AOC), so angle BOA + angle BOC = 180 degrees. Since the two angles are equal, each must be 90 degrees." },
      { part: "Conclusion", text: "Since a square is a rectangle, its diagonals already bisect each other (proven for rectangles); this proof adds that they also cross at exactly 90 degrees, giving the full diagonal property of a square." },
    ],
  },
  {
    id: 4,
    question: "Prove that in a parallelogram, opposite angles are equal, and adjacent angles are supplementary.",
    markingScheme: ["Correctly identifying co-interior angle pairs from both sets of parallel sides (2 marks)", "Correct algebra to isolate opposite angles (2 marks)", "Correct final statement of both results (1 mark)"],
    answerParts: [
      { part: "Setting up", text: "Let ABCD be a parallelogram, with AB parallel to DC, and AD parallel to BC. Since AB || DC and AD is a transversal to them, angle A + angle D = 180 degrees (co-interior angles). Similarly, since AD || BC and AB is a transversal, angle A + angle B = 180 degrees." },
      { part: "Finding opposite angles are equal", text: "From angle A + angle D = 180 and angle A + angle B = 180, we get angle D = 180 - angle A = angle B, so angle B = angle D. By the same reasoning applied to the other pair of parallel sides, angle A = angle C." },
      { part: "Conclusion", text: "This proves opposite angles of a parallelogram are equal (angle A = angle C, angle B = angle D). Since angle A + angle B = 180 degrees (and similarly for every other adjacent pair), adjacent angles are always supplementary." },
    ],
  },
  {
    id: 5,
    question: "Prove that a quadrilateral in which one pair of opposite sides is both equal AND parallel must be a parallelogram.",
    markingScheme: ["Correct identification of the SAS congruence set-up (2 marks)", "Correct use of alternate angles to establish the second pair of parallel sides (2 marks)", "Correct conclusion (1 mark)"],
    answerParts: [
      { part: "Setting up", text: "Let ABCD be a quadrilateral where AB = CD and AB is parallel to CD. Draw diagonal AC. Since AB || CD and AC is a transversal, angle BAC = angle DCA (alternate angles)." },
      { part: "Proving congruence", text: "In triangle ABC and triangle CDA: AB = CD (given), angle BAC = angle DCA (proven above), and AC is common. By SAS, triangle ABC is congruent to triangle CDA." },
      { part: "Conclusion", text: "Since the triangles are congruent, BC = AD (corresponding sides), and angle BCA = angle DAC (corresponding angles). Since angle BCA and angle DAC are alternate angles formed by transversal AC on lines BC and AD, this proves BC is parallel to AD too. Both pairs of opposite sides are now equal and parallel, so ABCD is a parallelogram." },
    ],
  },
  {
    id: 6,
    question: "Prove that all four angles into which the diagonals of a rhombus split its vertex angles are equal to each other, and hence that the diagonals of a rhombus bisect its angles.",
    markingScheme: ["Correct isosceles-triangle argument at each half of the rhombus (2.5 marks)", "Correct SSS/SAS congruence between the two halves (1.5 marks)", "Correct final conclusion (1 mark)"],
    answerParts: [
      { part: "First isosceles triangle", text: "Let GAME be a rhombus with diagonal GM drawn. In triangle GAM, GA = GM... more precisely, consider the diagonal splitting the rhombus at vertex G into two triangles by drawing diagonal GA (a side, not diagonal -- restate): actually take diagonal GM of rhombus GAME. In triangle GAM, since GA = AM (sides of the rhombus), the angles opposite them are equal: angle GMA = angle AGM (call this angle 'a')." },
      { part: "Second isosceles triangle", text: "Similarly, in triangle GEM (the other half split by the same diagonal GM), since GE = EM (sides of the rhombus), the angles opposite them are equal: angle GME = angle EGM (call this angle 'b')." },
      { part: "Showing all four parts are equal", text: "Triangle GAM and triangle GEM are congruent by SSS (GA = GE, AM = EM, GM common), so angle AGM = angle EGM, meaning a = b. Since this argument can be repeated for the other diagonal (AE) at the other pair of vertices, all four half-angles formed by a rhombus's diagonals at its vertices are equal -- proving each diagonal bisects the vertex angles it passes through." },
    ],
  },
  {
    id: 7,
    question: "Prove that the diagonals of a rhombus bisect each other at right angles.",
    markingScheme: ["Correctly establishing that a rhombus is a parallelogram, so diagonals bisect each other (1.5 marks)", "Correct SSS congruence set-up to find the crossing angle (2 marks)", "Correct final angle calculation (1.5 marks)"],
    answerParts: [
      { part: "Bisecting each other", text: "Since all four sides of a rhombus are equal, both pairs of opposite sides are automatically equal too, so (by the equal-opposite-sides theorem) a rhombus is a parallelogram. Since the diagonals of every parallelogram bisect each other, the diagonals of a rhombus bisect each other." },
      { part: "Finding the crossing angle", text: "Let ABCD be the rhombus with diagonals meeting at O. In triangle BOA and triangle BOC: AB = CB (sides of the rhombus), OA = OC (just proven, diagonals bisect each other), and OB is common. By SSS, triangle BOA is congruent to triangle BOC, so angle BOA = angle BOC." },
      { part: "Conclusion", text: "Since angle BOA and angle BOC lie on the straight line AC, they sum to 180 degrees; being equal, each is 90 degrees. So the diagonals of a rhombus bisect each other AND cross at right angles." },
    ],
  },
  {
    id: 8,
    question: "In isosceles trapezium UVWX, UV is parallel to XW, and the legs UX = VW. Prove that angle U = angle V (the base angles at UV are equal).",
    markingScheme: ["Correctly constructing the perpendiculars and identifying rectangle XWZY (2 marks)", "Correct congruence argument between the two right triangles (2 marks)", "Correct final conclusion (1 mark)"],
    answerParts: [
      { part: "Constructing perpendiculars", text: "Drop perpendiculars from X and W onto line UV, meeting it at Y and Z respectively. Since XW is parallel to UV and XY, WZ are both perpendicular to UV, XWZY has two pairs of parallel sides (XY || WZ, both perpendicular to the same line UV, and XW || YZ, both being segments of the two parallel trapezium sides) and all four angles 90 degrees, making XWZY a rectangle. So XY = WZ (opposite sides of a rectangle)." },
      { part: "Proving triangle congruence", text: "In right triangle UXY and right triangle VWZ: XY = WZ (just shown), UX = VW (given, isosceles trapezium legs), and angle XYU = angle WZV = 90 degrees. By the RHS (right angle-hypotenuse-side) condition, triangle UXY is congruent to triangle VWZ." },
      { part: "Conclusion", text: "Since the triangles are congruent, angle U = angle V (corresponding angles), proving the base angles of an isosceles trapezium at its longer parallel side are equal." },
    ],
  },
  {
    id: 9,
    question: "A quadrilateral ABCD has diagonals AC and BD that are equal in length and bisect each other. Prove that ABCD must be a rectangle.",
    markingScheme: ["Correct proof that bisecting diagonals give a parallelogram (2 marks)", "Correct proof that equal diagonals in a parallelogram force a right angle (2 marks)", "Correct final conclusion (1 mark)"],
    answerParts: [
      { part: "Bisecting diagonals give a parallelogram", text: "Let the diagonals meet at O, with OA = OC and OB = OD (given, bisecting). In triangle AOB and triangle COD: OA = OC, OB = OD, and angle AOB = angle COD (vertically opposite). By SAS, the triangles are congruent, giving AB = CD and angle OAB = angle OCD (alternate angles), so AB is parallel to CD. Similarly, AD is parallel to BC. Both pairs of opposite sides are parallel, so ABCD is a parallelogram." },
      { part: "Equal diagonals force a right angle", text: "In parallelogram ABCD, consider triangle ABC and triangle DCB: AB = DC (opposite sides of the parallelogram), BC is common, and AC = DB (given, diagonals are equal). By SSS, triangle ABC is congruent to triangle DCB, so angle ABC = angle DCB (corresponding angles)." },
      { part: "Conclusion", text: "Since AB || DC and BC is a transversal to them, angle ABC + angle DCB = 180 degrees (co-interior angles). Since angle ABC = angle DCB, each must be 90 degrees. Since one angle of the parallelogram is 90 degrees, all four angles are 90 degrees (adjacent supplementary, opposite equal), so ABCD is a rectangle." },
    ],
  },
  {
    id: 10,
    question: "A quadrilateral PQRS has diagonals that bisect each other at right angles. Prove that PQRS must be a rhombus.",
    markingScheme: ["Correct proof that bisecting diagonals give a parallelogram (1.5 marks)", "Correct SAS/Pythagorean argument for equal sides (2.5 marks)", "Correct final conclusion (1 mark)"],
    answerParts: [
      { part: "Bisecting diagonals give a parallelogram", text: "As in the rectangle case, diagonals that bisect each other are enough, by SAS congruence of the triangles formed at the centre O, to prove both pairs of opposite sides are parallel -- so PQRS is a parallelogram." },
      { part: "Perpendicularity forces equal sides", text: "Let the diagonals meet at O, with OP = OR and OQ = OS (bisecting), and angle POQ = 90 degrees (given). In right triangle POQ, using Pythagoras' theorem, PQ^2 = OP^2 + OQ^2. Since angle QOR = 180 - angle POQ = 90 degrees too (linear pair), triangle QOR is also right-angled, and QR^2 = OQ^2 + OR^2 = OQ^2 + OP^2 (since OR = OP)." },
      { part: "Conclusion", text: "Since PQ^2 = OP^2 + OQ^2 = QR^2, we get PQ = QR. The same Pythagorean argument at every corner shows all four sides are equal in length. A parallelogram with all four sides equal is exactly the definition of a rhombus, so PQRS is a rhombus." },
    ],
  },
  {
    id: 11,
    question: "The perimeter of a rectangle is 56 cm, and one of its diagonals is 20 cm. Find the length and breadth of the rectangle.",
    markingScheme: ["Setting up both equations correctly (2 marks)", "Correctly solving the simultaneous equations (2.5 marks)", "Stating the final length and breadth clearly (0.5 marks)"],
    answerParts: [
      { part: "Setting up equations", text: "Let the length be l and breadth be b. Perimeter: 2(l + b) = 56, so l + b = 28. Diagonal (Pythagoras): l^2 + b^2 = 20^2 = 400." },
      { part: "Solving", text: "Square the first equation: (l + b)^2 = 28^2 = 784, so l^2 + 2lb + b^2 = 784. Substituting l^2 + b^2 = 400: 400 + 2lb = 784, so 2lb = 384, giving lb = 192.", },
      { part: "Finding l and b", text: "l and b are roots of the quadratic t^2 - 28t + 192 = 0. Using the quadratic formula: t = [28 +/- sqrt(28^2 - 4(192))] / 2 = [28 +/- sqrt(784 - 768)] / 2 = [28 +/- 4] / 2, giving t = 16 or t = 12. So the length is 16 cm and the breadth is 12 cm." },
    ],
  },
  {
    id: 12,
    question: "A rhombus has diagonals of length 18 cm and 24 cm. Find (i) its area, (ii) the length of each side, and (iii) its perimeter.",
    markingScheme: ["Correct area formula and calculation (1.5 marks)", "Correct side length using Pythagoras (2 marks)", "Correct perimeter calculation (1.5 marks)"],
    answerParts: [
      { part: "Area", text: "Area of a rhombus = (1/2) x d1 x d2 = (1/2) x 18 x 24 = 216 square cm." },
      { part: "Side length", text: "The diagonals bisect each other at right angles, giving half-diagonals of 9 cm and 12 cm. By Pythagoras' theorem, side = sqrt(9^2 + 12^2) = sqrt(81 + 144) = sqrt(225) = 15 cm." },
      { part: "Perimeter", text: "Perimeter = 4 x side = 4 x 15 = 60 cm." },
    ],
  },
  {
    id: 13,
    question: "In kite ABCD, with AB = BC and CD = DA, prove that diagonal BD (i) bisects diagonal AC and is perpendicular to it, and (ii) bisects angle ABC and angle ADC.",
    markingScheme: ["Correct SSS congruence of triangle ABD and triangle CBD (1.5 marks)", "Correct proof that BD bisects the two angles (1.5 marks)", "Correct proof that BD bisects AC perpendicularly, using the second congruence (2 marks)"],
    answerParts: [
      { part: "First congruence and angle bisection", text: "In triangle ABD and triangle CBD: AB = CB (given), AD = CD (given), and BD is common. By SSS, triangle ABD is congruent to triangle CBD. So angle ABD = angle CBD (proving BD bisects angle ABC), and angle ADB = angle CDB (proving BD bisects angle ADC)." },
      { part: "Setting up for the diagonal AC", text: "Let BD intersect AC at O. In triangle ABO and triangle CBO: AB = CB (given), angle ABO = angle CBO (just proven, since O lies on BD), and BO is common. By SAS, triangle ABO is congruent to triangle CBO." },
      { part: "Conclusion", text: "Since the triangles are congruent, AO = CO (so BD bisects AC), and angle AOB = angle COB (corresponding angles). Since these two angles lie on the straight line AC and are equal, each must be 90 degrees, proving BD is perpendicular to AC." },
    ],
  },
  {
    id: 14,
    question: "An isosceles trapezium has parallel sides of 15 cm and 25 cm, and a height of 12 cm. Find the length of each of its equal legs.",
    markingScheme: ["Correctly finding the horizontal offset at each end (2 marks)", "Correctly setting up the right triangle (1.5 marks)", "Correct final Pythagoras calculation (1.5 marks)"],
    answerParts: [
      { part: "Finding the horizontal offset", text: "Because the trapezium is isosceles, it is symmetric about the vertical line through the midpoints of the two parallel sides. The difference between the parallel sides is 25 - 15 = 10 cm, split equally on both ends: 10 / 2 = 5 cm on each side." },
      { part: "Setting up the right triangle", text: "Dropping a perpendicular from each end of the shorter (15 cm) side to the longer (25 cm) side creates two right triangles, each with a horizontal leg of 5 cm and a vertical leg equal to the trapezium's height, 12 cm. The leg of the trapezium is the hypotenuse of this right triangle." },
      { part: "Calculating the leg", text: "leg = sqrt(5^2 + 12^2) = sqrt(25 + 144) = sqrt(169) = 13 cm. So each of the equal legs of the trapezium measures 13 cm." },
    ],
  },
  {
    id: 15,
    question: "A rhombus has side 6 cm and one angle equal to 60 degrees. Find the lengths of both diagonals.",
    markingScheme: ["Correctly identifying the equilateral triangle for the shorter diagonal (2 marks)", "Correctly applying Pythagoras for the longer diagonal (2.5 marks)", "Clearly stated final answer for both diagonals (0.5 marks)"],
    answerParts: [
      { part: "Finding the shorter diagonal", text: "Let ABCD be the rhombus with angle A = 60 degrees. Diagonal BD splits the rhombus into triangle ABD, where AB = AD = 6 cm (rhombus sides) and the included angle A = 60 degrees. Since two sides are equal and the angle between them is 60 degrees, triangle ABD is equilateral, so BD = 6 cm too." },
      { part: "Finding the longer diagonal", text: "The diagonals of a rhombus bisect each other at right angles, so half of BD = 3 cm. Using Pythagoras' theorem on the right triangle formed by the two half-diagonals and a side: (half of AC)^2 = (side)^2 - (half of BD)^2 = 6^2 - 3^2 = 36 - 9 = 27, so half of AC = sqrt(27) = 3 x sqrt(3) cm." },
      { part: "Final answer", text: "Diagonal BD = 6 cm, and diagonal AC = 2 x 3 x sqrt(3) = 6 x sqrt(3) cm, approximately 10.4 cm." },
    ],
  },
  {
    id: 16,
    question: "ABCD is a square of side 12 cm. P, Q, R, S are the midpoints of its four sides, taken in order. Find the area of quadrilateral PQRS, and verify it is exactly half the area of ABCD.",
    markingScheme: ["Correct identification of PQRS as a square, with brief reasoning (1.5 marks)", "Correct calculation of PQRS's side length (1.5 marks)", "Correct area calculation and comparison (2 marks)"],
    answerParts: [
      { part: "Identifying the shape", text: "Each corner of square ABCD, together with its two adjacent midpoints, forms a congruent right-angled isosceles triangle (legs of 6 cm each, since half of 12 cm). This makes all four sides of PQRS equal and all four of its angles 90 degrees, so PQRS is itself a square." },
      { part: "Finding the side of PQRS", text: "By Pythagoras' theorem on one of the corner triangles: side of PQRS = sqrt(6^2 + 6^2) = sqrt(72) = 6 x sqrt(2) cm." },
      { part: "Comparing areas", text: "Area of ABCD = 12 x 12 = 144 square cm. Area of PQRS = (6 x sqrt(2))^2 = 36 x 2 = 72 square cm. Since 72 is exactly half of 144, this verifies that PQRS has exactly half the area of ABCD." },
    ],
  },
  {
    id: 17,
    question: "For each of the following quadrilateral types -- parallelogram, rectangle, rhombus, square, kite, and trapezium -- state whether its diagonals (a) always bisect each other, (b) are always perpendicular, and (c) are always equal in length. Justify each 'yes' briefly.",
    markingScheme: ["Correct answers for parallelogram, rectangle, and square (2 marks)", "Correct answers for rhombus and kite (2 marks)", "Correct answer for trapezium, with brief justification throughout (1 mark)"],
    answerParts: [
      { part: "Parallelogram, rectangle, square", text: "Parallelogram: bisect each other (yes), perpendicular (no, in general), equal (no, in general). Rectangle: bisect each other (yes, it is a parallelogram), perpendicular (no, in general), equal (yes, by definition/proof). Square: bisect each other (yes), perpendicular (yes), equal (yes) -- a square combines all three properties." },
      { part: "Rhombus and kite", text: "Rhombus: bisect each other (yes, it is a parallelogram), perpendicular (yes, by definition/proof), equal (no, in general -- only equal if it is also a square). Kite: bisect each other (only one diagonal is bisected by the other, not both, so NO for full bisection), perpendicular (yes, by definition/proof), equal (no, in general)." },
      { part: "Trapezium", text: "A general trapezium: bisect each other (no, since it is not a parallelogram in general), perpendicular (no, in general), equal (no, in general -- except in the special case of an isosceles trapezium, whose diagonals ARE equal, due to its left-right symmetry)." },
    ],
  },
  {
    id: 18,
    question: "In rectangle PQRS, diagonals PR and QS meet at O. Diagonal PR makes an angle of 35 degrees with side PQ. Find (i) angle QPR is already given as 35 degrees -- find angle PQO instead, (ii) angle POQ, and (iii) angle ORS.",
    markingScheme: ["Correctly finding angle PQO using the isosceles triangle POQ (2 marks)", "Correctly finding angle POQ (1.5 marks)", "Correctly finding angle ORS using alternate/rectangle properties (1.5 marks)"],
    answerParts: [
      { part: "Finding angle PQO", text: "Since the diagonals of a rectangle bisect each other and are equal, OP = OQ, making triangle POQ isosceles. angle OPQ = angle QPR = 35 degrees (O lies on PR), so the base angles are equal: angle PQO = angle OPQ = 35 degrees." },
      { part: "Finding angle POQ", text: "In triangle POQ, angle POQ = 180 - 35 - 35 = 110 degrees." },
      { part: "Finding angle ORS", text: "Since PQ is parallel to SR (rectangle property) and PR is a transversal, angle QPR = angle ORS = 35 degrees (alternate angles), because O lies on PR and OR is simply the continuation of PR beyond O towards R... more directly, since PQ || SR, angle QPO (=35 degrees) and angle SRO are alternate interior angles formed by transversal PR, so angle ORS = 35 degrees." },
    ],
  },
  {
    id: 19,
    question: "Prove that a quadrilateral in which the opposite angles are equal must be a parallelogram, and hence show that this property, together with all sides being equal, gives an alternative full definition of a rhombus.",
    markingScheme: ["Correct algebraic derivation from equal opposite angles to co-interior sum of 180 degrees (2.5 marks)", "Correct conclusion that this proves a parallelogram (1 mark)", "Correct combination with equal sides to describe a rhombus (1.5 marks)"],
    answerParts: [
      { part: "Setting up", text: "Let ABCD be a quadrilateral with angle A = angle C and angle B = angle D. Since all four angles sum to 360 degrees: angle A + angle B + angle C + angle D = 360, and substituting equal pairs: 2(angle A) + 2(angle B) = 360, so angle A + angle B = 180 degrees." },
      { part: "Proving parallel sides", text: "Since angle A and angle B are co-interior angles formed by transversal AB crossing lines AD and BC, and they sum to 180 degrees, AD is parallel to BC. By the same argument using angle B + angle C = 180 degrees (from angle A + angle D = 180 similarly), AB is parallel to DC. Both pairs of opposite sides are parallel, so ABCD is a parallelogram." },
      { part: "Extending to a rhombus", text: "A rhombus is already known to be a parallelogram (from its equal sides). Combining 'equal opposite angles' with 'all sides equal' therefore gives an alternative, fully equivalent way to define a rhombus, alongside the standard 'all sides equal' definition -- since both descriptions guarantee the shape is a parallelogram with equal sides." },
    ],
  },
  {
    id: 20,
    question: "Using the properties covered in this chapter, explain step by step how you would verify, using only a ruler and a set-square (no protractor), whether a given four-sided wooden frame is (i) a parallelogram, (ii) specifically a rectangle, and (iii) specifically a square.",
    markingScheme: ["Correct method for checking parallelogram (1.5 marks)", "Correct method for checking rectangle, building on the first check (2 marks)", "Correct method for checking square, building on the second check (1.5 marks)"],
    answerParts: [
      { part: "Checking for a parallelogram", text: "Measure both diagonals with the ruler and mark their crossing point. If the crossing point is the exact midpoint of BOTH diagonals (equal distances from the crossing point to each pair of opposite corners), the diagonals bisect each other, proving the frame is a parallelogram." },
      { part: "Checking for a rectangle", text: "Having confirmed it is a parallelogram, now compare the lengths of the two diagonals using the ruler. If the two diagonals are also equal in length (not just bisecting each other), the frame must be a rectangle, since equal + bisecting diagonals is a complete guarantee of a rectangle." },
      { part: "Checking for a square", text: "Having confirmed it is a rectangle, use the set-square at the diagonals' crossing point to check if they meet at exactly 90 degrees. If they do, the rectangle is also a rhombus (equal, bisecting, and now perpendicular diagonals), which makes it a square. Alternatively, simply measure all four sides with the ruler -- if they are all equal, the rectangle is a square." },
    ],
  },
];

export const MATHS8_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Carpenter's Door Frame",
    caseDescription: "A carpenter is building a rectangular door frame. She cuts two diagonal support strips, each exactly 1.4 m long, and plans to join them so that they cross at their midpoints, guaranteeing the frame comes out perfectly rectangular without needing to measure any angle.",
    subQuestions: [
      { question: "Why does crossing two equal strips at their midpoints guarantee a rectangle, whatever angle they cross at?", answer: "Because equal diagonals that bisect each other are, by themselves, a complete guarantee of a rectangle -- the angle between them does not affect this outcome at all.", explanation: "This is the core diagonal property of a rectangle proved in the chapter." },
      { question: "If the carpenter accidentally uses one strip of 1.4 m and another of 1.3 m, crossing at their midpoints, what shape will she get instead?", options: ["A rectangle", "A general parallelogram (not a rectangle)", "A rhombus", "A trapezium"], correctIndex: 1, answer: "A general parallelogram (not a rectangle)", explanation: "The diagonals still bisect each other, giving a parallelogram, but since they are unequal in length, it cannot be a rectangle." },
      { question: "The carpenter wants her frame to also be a square. What ONE extra condition should she add to her construction?", answer: "She should make sure the two strips cross each other at exactly 90 degrees (perpendicular), in addition to being equal and bisecting -- this extra condition upgrades the rectangle to a square.", explanation: "Equal + bisecting + perpendicular diagonals together guarantee a square." },
    ],
  },
  {
    id: 2,
    caseTitle: "Kite-Flying Festival",
    caseDescription: "At a kite-flying festival, a stall sells traditional kites built from two thin sticks: a vertical spine of 70 cm and a horizontal cross-stick of 50 cm. The cross-stick is tied to the spine so that it is bisected by the spine and meets it at exactly 90 degrees, though the cross-stick is not tied at the exact midpoint of the spine.",
    subQuestions: [
      { question: "What type of quadrilateral does the kite's outline form?", options: ["Rectangle", "Rhombus", "Kite", "Trapezium"], correctIndex: 2, answer: "Kite", explanation: "One diagonal (the spine) is not bisected, while the other (the cross-stick) IS bisected and is perpendicular to the spine -- exactly the kite's diagonal property." },
      { question: "If the spine is split by the cross-stick into two parts of 25 cm and 45 cm, and the cross-stick is 50 cm long (bisected equally), find the length of each of the kite's four edges.", answer: "Two pairs of adjacent equal sides: sqrt(25^2 + 25^2) = 25*sqrt(2) cm (approx 35.4 cm) for the top two edges, and sqrt(45^2 + 25^2) = sqrt(2025+625) = sqrt(2650) (approx 51.5 cm) for the bottom two edges.", explanation: "Each edge is the hypotenuse of a right triangle formed by half the cross-stick and the relevant spine segment, since the cross-stick meets the spine at 90 degrees." },
      { question: "A customer asks for a kite where BOTH diagonals bisect each other, in addition to being perpendicular. What special type of kite would this be?", answer: "A rhombus -- since perpendicular diagonals that ALSO fully bisect each other (both ways) guarantee all four sides equal, which is exactly a rhombus.", explanation: "This links back to the rhombus diagonal property: perpendicular AND bisecting diagonals give equal sides all round." },
    ],
  },
  {
    id: 3,
    caseTitle: "Designing a Rangoli Pattern",
    caseDescription: "For a festival, a student designs a rangoli (floor art) pattern using identical rhombus-shaped tiles. Each tile has diagonals of 12 cm and 16 cm, and the student needs to tile a rectangular section of floor measuring 96 cm by 80 cm.",
    subQuestions: [
      { question: "What is the area of one rhombus tile?", options: ["96 sq cm", "192 sq cm", "48 sq cm", "28 sq cm"], correctIndex: 0, answer: "96 sq cm", explanation: "Area of a rhombus = (1/2) x d1 x d2 = (1/2) x 12 x 16 = 96 square cm." },
      { question: "What is the side length of each rhombus tile?", answer: "Half-diagonals are 6 cm and 8 cm, meeting at 90 degrees, so side = sqrt(6^2 + 8^2) = sqrt(100) = 10 cm.", explanation: "Uses the rhombus's perpendicular-bisecting diagonal property with Pythagoras' theorem." },
      { question: "If the tiles perfectly cover the rectangular floor section with no gaps or overlaps, how many tiles are needed?", answer: "Area of floor section = 96 x 80 = 7680 sq cm. Number of tiles = 7680 / 96 = 80 tiles.", explanation: "Divide the total area to be covered by the area of one tile." },
    ],
  },
  {
    id: 4,
    caseTitle: "The Trapezium-Shaped Flowerbed",
    caseDescription: "A gardener designs a flowerbed in the shape of an isosceles trapezium. The two parallel edges measure 4 m and 10 m, and the height (perpendicular distance between them) is 4 m. Both slanting (non-parallel) edges are equal in length.",
    subQuestions: [
      { question: "Find the length of each slanting edge.", options: ["3 m", "4 m", "5 m", "6 m"], correctIndex: 2, answer: "5 m", explanation: "The horizontal offset at each end is (10-4)/2 = 3 m. The slanting edge is the hypotenuse of a right triangle with legs 3 m and 4 m: sqrt(3^2+4^2) = 5 m." },
      { question: "One base angle at the 10 m edge is measured as 53 degrees. What is the angle at the other end of the same 10 m edge?", answer: "53 degrees too, since in an isosceles trapezium the two base angles at the same parallel side are always equal to each other.", explanation: "This is the isosceles trapezium's key angle property." },
      { question: "What is the angle at each end of the shorter, 4 m edge?", answer: "180 - 53 = 127 degrees at each end, since each angle at the shorter parallel side is co-interior (supplementary) with the nearer angle at the longer parallel side.", explanation: "Co-interior angles between the two parallel sides sum to 180 degrees." },
    ],
  },
  {
    id: 5,
    caseTitle: "The Architect's Decorative Window",
    caseDescription: "An architect designs a square window frame of side 80 cm, and wants to add a decorative inner square pattern by connecting the midpoints of the outer square's four sides with thin metal strips.",
    subQuestions: [
      { question: "What shape is formed by joining the midpoints, and why?", answer: "A smaller square, because the four corner right triangles formed (each with legs of 40 cm) are congruent, giving equal sides and 90 degree angles all round for the inner shape.", explanation: "This is the classic midpoint-square construction proven earlier in the chapter." },
      { question: "Find the length of each side of the inner square.", options: ["40 cm", "40*sqrt(2) cm", "56.6 cm", "80/3 cm"], correctIndex: 1, answer: "40*sqrt(2) cm (approx 56.6 cm)", explanation: "By Pythagoras on the corner triangle: sqrt(40^2 + 40^2) = sqrt(3200) = 40*sqrt(2) cm." },
      { question: "What fraction of the outer window's area does the inner decorative square cover?", answer: "Exactly half. Area of outer square = 80 x 80 = 6400 sq cm. Area of inner square = (40*sqrt(2))^2 = 3200 sq cm, which is exactly half of 6400.", explanation: "This matches the general rule that a midpoint-square always has half the area of the original square." },
    ],
  },
  {
    id: 6,
    caseTitle: "The Diamond-Shaped Road Sign",
    caseDescription: "A road-safety sign is shaped like a rhombus (a 'diamond' warning sign), mounted so that one diagonal is exactly vertical and the other exactly horizontal. The vertical diagonal measures 60 cm and the horizontal diagonal measures 45 cm.",
    subQuestions: [
      { question: "Are the two diagonals of this sign guaranteed to be perpendicular to each other?", options: ["Yes, always, for any rhombus", "Only if it happens to also be a square", "No, rhombus diagonals are never perpendicular", "Only if both diagonals are equal"], correctIndex: 0, answer: "Yes, always, for any rhombus", explanation: "Perpendicular diagonals are a guaranteed property of every rhombus, regardless of its exact diagonal lengths." },
      { question: "Find the length of each edge of the sign.", answer: "Half-diagonals are 30 cm and 22.5 cm. Side = sqrt(30^2 + 22.5^2) = sqrt(900 + 506.25) = sqrt(1406.25) = 37.5 cm.", explanation: "Uses Pythagoras' theorem on the right triangle formed by the two half-diagonals." },
      { question: "A second sign has all diagonals equal (both 50 cm) in addition to being perpendicular and bisecting. What shape must this second sign actually be?", answer: "A square, since equal + perpendicular + bisecting diagonals together are the complete guarantee of a square (a rhombus that also has equal diagonals).", explanation: "Combines the rhombus's own diagonal property with the additional 'equal diagonals' condition." },
    ],
  },
  {
    id: 7,
    caseTitle: "Marking Out a Rectangular Sports Field",
    caseDescription: "Groundstaff are marking out a rectangular football field. They measure the two diagonals with a long tape to check the corners are exactly square (90 degrees), without using any angle-measuring tool. Both diagonals measure 109.5 m.",
    subQuestions: [
      { question: "Why does checking that both diagonals are equal help confirm the field's corners are right angles?", answer: "Because equal diagonals, together with the fact that they were laid out to bisect each other at the field's centre marker, is a full guarantee of a rectangle, whose corners are all automatically 90 degrees.", explanation: "This is the practical, real-world use of the rectangle's diagonal property -- exactly like the carpenter's method in the chapter." },
      { question: "If the field is 100 m long and one diagonal is 109.5 m, find the field's width (to one decimal place).", options: ["30.0 m", "45.0 m", "60.0 m", "64.6 m"], correctIndex: 1, answer: "45.0 m", explanation: "By Pythagoras: width = sqrt(109.5^2 - 100^2) = sqrt(11990.25 - 10000) = sqrt(1990.25), approximately 44.6 m, closest to 45.0 m among the choices (standard football pitch width)." },
      { question: "The groundstaff only check that the diagonals are equal, but forget to check if they cross at the exact midpoint of each. Is this enough on its own to guarantee a rectangle?", answer: "No -- equal diagonals alone (for example, in an isosceles trapezium) do not guarantee a rectangle. They must also bisect each other.", explanation: "Both conditions -- equal length AND bisecting -- are required together." },
    ],
  },
  {
    id: 8,
    caseTitle: "Hanging a Picture Frame",
    caseDescription: "A shopkeeper wants to check, using only a measuring tape, whether a rectangular-looking picture frame on display is genuinely a rectangle or has warped slightly out of shape during shipping. The frame's sides measure 40 cm and 30 cm.",
    subQuestions: [
      { question: "What is the length of the diagonal of a TRUE rectangular frame with these side lengths?", options: ["35 cm", "50 cm", "60 cm", "70 cm"], correctIndex: 1, answer: "50 cm", explanation: "By Pythagoras: diagonal = sqrt(40^2 + 30^2) = sqrt(1600+900) = sqrt(2500) = 50 cm." },
      { question: "The shopkeeper measures both diagonals of the actual frame: one is 50 cm, but the other is 48 cm. Is the frame a true rectangle?", answer: "No -- a rectangle's two diagonals must be exactly equal to each other. Since 50 cm does not equal 48 cm, the frame has warped and is no longer a true rectangle.", explanation: "Unequal diagonals directly rule out a rectangle, even if the side lengths still look correct." },
      { question: "Which single measurement -- just the sides, or just the diagonals -- more reliably catches this kind of warping? Explain briefly.", answer: "The diagonals, because warping can shift the angles at the corners while barely changing the side lengths at all, but any change in the angles immediately shows up as unequal diagonals.", explanation: "Sides alone cannot detect angle distortion; diagonal-length comparison can." },
    ],
  },
  {
    id: 9,
    caseTitle: "The Tailor's Fabric Cutting",
    caseDescription: "A tailor cuts a piece of fabric shaped like a parallelogram for a garment panel. The panel has sides of 35 cm and 20 cm, with one angle measuring 70 degrees.",
    subQuestions: [
      { question: "Find the remaining three angles of the fabric panel.", answer: "Adjacent angles: 180 - 70 = 110 degrees. Opposite angles equal the ones already found: 70 degrees and 110 degrees again. So the four angles are 70, 110, 70, 110 degrees.", explanation: "Uses the parallelogram's adjacent-supplementary and opposite-equal angle properties." },
      { question: "The tailor wants to check her cutting is accurate by comparing the two diagonals of the panel. Should she expect them to be equal?", options: ["Yes, always, for any parallelogram", "No, not in general, unless it happens to also be a rectangle", "Only if the sides are also equal", "Diagonals cannot be measured on fabric"], correctIndex: 1, answer: "No, not in general, unless it happens to also be a rectangle", explanation: "A general parallelogram's diagonals need not be equal -- only a rectangle (a special parallelogram with 90 degree angles) guarantees that." },
      { question: "If the tailor instead wanted every panel to be a rectangle for a more formal design, which single change to the given angle would guarantee this?", answer: "Making the given angle exactly 90 degrees, since one right angle in a parallelogram forces all four angles to be 90 degrees (adjacent supplementary and opposite equal).", explanation: "This directly upgrades the parallelogram panel into a rectangle." },
    ],
  },
  {
    id: 10,
    caseTitle: "The Circular Clock Face Motif",
    caseDescription: "A jewellery designer inscribes a decorative motif inside a circular pendant of radius 1.5 cm, by drawing two diameters that are perpendicular to each other and joining their four endpoints.",
    subQuestions: [
      { question: "What quadrilateral is formed by joining the four endpoints?", options: ["Rectangle (not a square)", "Rhombus (not a square)", "Square", "Trapezium"], correctIndex: 2, answer: "Square", explanation: "Both diagonals are diameters (equal, since all radii are equal) that bisect each other at the centre and are perpendicular -- exactly the conditions for a square." },
      { question: "Find the length of each diagonal of the motif.", answer: "Each diagonal is a diameter = 2 x radius = 2 x 1.5 = 3 cm.", explanation: "A diameter is always twice the radius." },
      { question: "Find the area of the square motif.", options: ["2.25 sq cm", "3 sq cm", "4.5 sq cm", "9 sq cm"], correctIndex: 2, answer: "4.5 sq cm", explanation: "Area of a square from its diagonal d is (d^2)/2 = (3^2)/2 = 9/2 = 4.5 square cm." },
    ],
  },
  {
    id: 11,
    caseTitle: "A Kite-Shaped Roof Support",
    caseDescription: "An engineer designs a small kite-shaped metal bracket to support a roof panel. The bracket has two pairs of adjacent equal edges: two edges of 18 cm each, and two edges of 30 cm each. The diagonal joining the two 'unequal' vertices (where an 18 cm edge meets a 30 cm edge) is 24 cm long.",
    subQuestions: [
      { question: "Which diagonal of this kite bracket is guaranteed to be perpendicular to the other, and to bisect it?", answer: "The diagonal joining the two vertices between the equal side-pairs (i.e. NOT the 24 cm one described) -- that diagonal bisects the 24 cm diagonal and is perpendicular to it.", explanation: "In a kite, it is always the diagonal of symmetry (joining the two 'equal-pair' vertices) that bisects the other diagonal perpendicularly." },
      { question: "Using the 18 cm side and half of the 24 cm diagonal (12 cm), find the length of the perpendicular segment from the symmetry diagonal to that vertex.", options: ["6 cm", "9 cm", "13.4 cm", "15 cm"], correctIndex: 2, answer: "13.4 cm (approx)", explanation: "By Pythagoras: sqrt(18^2 - 12^2) = sqrt(324 - 144) = sqrt(180), approximately 13.4 cm." },
      { question: "Using the 30 cm side and the same half-diagonal (12 cm), find the other perpendicular segment.", answer: "sqrt(30^2 - 12^2) = sqrt(900-144) = sqrt(756), approximately 27.5 cm.", explanation: "The same Pythagorean method applied to the longer side." },
    ],
  },
  {
    id: 12,
    caseTitle: "Redesigning a Table Top",
    caseDescription: "A carpenter is redesigning a coffee table's top into a trapezium shape, with the front edge measuring 90 cm and the back edge measuring 60 cm, both parallel to each other, and the table is 36 cm deep (the perpendicular distance between the two parallel edges).",
    subQuestions: [
      { question: "If the table top is designed to be an isosceles trapezium, what is the length of each side edge?", options: ["15 cm", "25 cm", "36 cm", "39 cm"], correctIndex: 3, answer: "39 cm", explanation: "Horizontal offset at each end = (90-60)/2 = 15 cm. Side edge = sqrt(15^2 + 36^2) = sqrt(225+1296) = sqrt(1521) = 39 cm." },
      { question: "The carpenter wants to double-check the table is genuinely isosceles by measuring both diagonals. What should she expect if the table top really is an isosceles trapezium?", answer: "The two diagonals should be equal in length, since equal diagonals are a hallmark property of any isosceles trapezium.", explanation: "This is a quick practical check similar to the rectangle diagonal check, but specific to isosceles trapeziums." },
      { question: "If one base angle at the front (90 cm) edge is 70 degrees, find the angle at the back (60 cm) edge on the same side.", answer: "180 - 70 = 110 degrees, since the two angles on the same side are co-interior angles between the parallel edges.", explanation: "Co-interior (same-side interior) angles between parallel lines are always supplementary." },
    ],
  },
  {
    id: 13,
    caseTitle: "Sorting Tangram Pieces",
    caseDescription: "A tangram puzzle set includes several flat pieces of different shapes. A student is asked to sort four of the pieces: Piece A has all four sides equal but no right angles. Piece B has all four angles equal but unequal adjacent sides. Piece C has both pairs of opposite sides parallel and one right angle. Piece D has just one pair of parallel sides, of different lengths, and the other two sides also of different lengths.",
    subQuestions: [
      { question: "Classify Piece A.", options: ["Square", "Rhombus (not a square)", "Rectangle", "Kite"], correctIndex: 1, answer: "Rhombus (not a square)", explanation: "All sides equal is the rhombus condition; without right angles, it is specifically a non-square rhombus." },
      { question: "Classify Piece B, and explain why it must actually be a rectangle rather than just 'equal angles'.", answer: "It is a rectangle: all four angles equal means each is 360/4 = 90 degrees, and all-90-degree angles is by itself a complete definition of a rectangle, regardless of the (possibly unequal) side lengths.", explanation: "This links directly to the chapter's alternative rectangle definition." },
      { question: "Classify Piece C and Piece D.", answer: "Piece C is a parallelogram with one right angle, which (by the adjacent-supplementary, opposite-equal angle rules) must actually be a rectangle. Piece D, having only one pair of parallel sides and no other special condition, is a general (non-isosceles) trapezium.", explanation: "Piece C's single right angle forces all four corners to 90 degrees; Piece D's description matches only the loosest trapezium condition." },
    ],
  },
  {
    id: 14,
    caseTitle: "Installing a Solar Panel Frame",
    caseDescription: "A technician installs a rectangular solar panel frame measuring 1.6 m by 1.2 m onto a rooftop, and adds a single diagonal metal brace across it for extra strength during storms.",
    subQuestions: [
      { question: "Find the length of the diagonal brace needed.", options: ["1.4 m", "2.0 m", "2.8 m", "1.6 m"], correctIndex: 1, answer: "2.0 m", explanation: "By Pythagoras: sqrt(1.6^2 + 1.2^2) = sqrt(2.56 + 1.44) = sqrt(4) = 2.0 m." },
      { question: "The technician considers adding a SECOND diagonal brace for even more strength. Will the second brace be the same length as the first?", answer: "Yes, since the two diagonals of any rectangle are always equal in length.", explanation: "This is the rectangle's core diagonal property." },
      { question: "If the two braces are installed so they cross exactly at their midpoints, at what point on the frame will they cross?", answer: "Exactly at the centre of the rectangular frame, since the diagonals of a rectangle always bisect each other, meeting at the frame's centre point.", explanation: "This follows directly from the diagonal-bisection property." },
    ],
  },
  {
    id: 15,
    caseTitle: "Measuring an Irregular Field Plot",
    caseDescription: "A land surveyor measures the four angles of a quadrilateral-shaped plot of land using a theodolite. Three of the angles come out as 88 degrees, 95 degrees, and 92 degrees.",
    subQuestions: [
      { question: "Find the fourth angle of the plot, and use it to check whether the surveyor's readings could be accurate.", answer: "Fourth angle = 360 - 88 - 95 - 92 = 85 degrees. Since this is a sensible angle (between 0 and 360 degrees) and the total does check out to exactly 360 degrees, the readings are internally consistent.", explanation: "Applies the angle-sum property as a real-world accuracy check on survey data." },
      { question: "If the surveyor's four readings had instead summed to 358 degrees, what would this suggest?", options: ["The plot is a trapezium", "There is a small measurement error somewhere", "The plot is not a simple quadrilateral", "Nothing unusual -- this is expected"], correctIndex: 1, answer: "There is a small measurement error somewhere", explanation: "Since a true simple quadrilateral's angles must sum to exactly 360 degrees, any deviation points to instrument or reading error." },
      { question: "The plot's angles turn out to be 90, 90, 90, and 90 degrees. Does this alone guarantee the plot is a perfect square?", answer: "No -- all angles being 90 degrees guarantees the plot is a rectangle, but not necessarily a square, since the side lengths could still be unequal.", explanation: "Angle information alone fixes the shape as a rectangle; confirming a square additionally needs equal side (or diagonal) lengths." },
    ],
  },
  {
    id: 16,
    caseTitle: "The Origami Square-Within-a-Square",
    caseDescription: "In an origami class, students fold a square sheet of paper of side 20 cm in half, then in half again, creasing a triangular fold at the corner nearest the centre of the original sheet, then unfold the sheet to reveal a pattern of creases.",
    subQuestions: [
      { question: "When the sheet is unfolded, the four triangular creases (one made near each of the sheet's four corners, by symmetry of the folding) trace out a smaller quadrilateral in the middle. What shape is this inner quadrilateral, if each crease exactly connects the midpoints of two adjacent sides?", answer: "A square, by the same reasoning as the midpoint-square construction: each corner triangle is congruent, giving equal sides and 90 degree angles for the inner shape.", explanation: "Origami creases at the midpoints of a square's sides recreate the classic midpoint-square result." },
      { question: "Find the side length of this inner square.", options: ["10 cm", "14.1 cm", "20 cm", "28.3 cm"], correctIndex: 1, answer: "14.1 cm (approx)", explanation: "side = 20 / sqrt(2) = 20 x sqrt(2)/2 = 10*sqrt(2), approximately 14.1 cm." },
      { question: "What is the area of the inner square compared to the original 20 cm sheet?", answer: "Original area = 400 sq cm. Inner square area = (10*sqrt(2))^2 = 200 sq cm -- exactly half of the original.", explanation: "Confirms the general rule: a midpoint-square always has exactly half the area of the original square." },
    ],
  },
  {
    id: 17,
    caseTitle: "The School Garden's Kite-Shaped Bed",
    caseDescription: "Students design a kite-shaped flowerbed for the school garden. The bed's diagonal of symmetry is 5 m long and is bisected perpendicularly by the other diagonal, which is 3.2 m long.",
    subQuestions: [
      { question: "What is the area of the kite-shaped flowerbed?", options: ["4 sq m", "8 sq m", "16 sq m", "8.5 sq m"], correctIndex: 1, answer: "8 sq m", explanation: "Area of a kite = (1/2) x d1 x d2 = (1/2) x 5 x 3.2 = 8 square metres, using the same formula as a rhombus since the diagonals are still perpendicular." },
      { question: "If the 3.2 m diagonal is split into two equal halves of 1.6 m each by the diagonal of symmetry, and one pair of adjacent sides of the kite is 3 m long, find the length of the other pair of adjacent sides (using the remaining 3.4 m portion of the 5 m diagonal).", answer: "sqrt(3.4^2 + 1.6^2) = sqrt(11.56 + 2.56) = sqrt(14.12), approximately 3.76 m.", explanation: "Uses Pythagoras' theorem on the right triangle formed by the perpendicular half-diagonal and the kite's side." },
      { question: "Students want to convert the design into a rhombus-shaped bed instead, keeping the same two diagonal lengths. What single change is needed?", answer: "The 5 m diagonal must also be bisected by the 3.2 m diagonal (both diagonals bisecting each other, not just one), turning the kite into a rhombus.", explanation: "The only structural difference between this kite and a rhombus with the same diagonals is whether BOTH diagonals are mutually bisected." },
    ],
  },
  {
    id: 18,
    caseTitle: "Fixing a Wobbly Gate",
    caseDescription: "A wooden garden gate, meant to be rectangular, has become wobbly and no longer holds its shape properly. A handyman decides to fix it using the same diagonal-bracing method a carpenter would use to build a new rectangular frame from scratch.",
    subQuestions: [
      { question: "Explain the method the handyman should use, referencing the diagonal properties of a rectangle.", answer: "He should attach a rigid diagonal brace across the gate from one corner to the opposite corner, and adjust the frame until this diagonal is exactly the correct length for a true rectangle of that width and height (found using Pythagoras' theorem) -- this fixes the shape permanently, since a rigid diagonal prevents the frame from flexing out of a rectangle.", explanation: "A diagonal brace turns the flexible four-bar frame into a rigid set of two triangles, locking in the correct angles." },
      { question: "If the gate is 1.8 m wide and 1.2 m tall, what length should the diagonal brace be cut to?", options: ["1.5 m", "2.0 m", "2.16 m", "3.0 m"], correctIndex: 2, answer: "2.16 m", explanation: "By Pythagoras: sqrt(1.8^2 + 1.2^2) = sqrt(3.24 + 1.44) = sqrt(4.68), approximately 2.16 m." },
      { question: "Would adding a SECOND diagonal brace (crossing the first) make the gate any more rigid against warping than just one brace?", answer: "Not really for rigidity (one diagonal is already enough to lock the shape into two fixed triangles), though a second brace can still add strength against heavier loads or impacts -- it is a strength addition, not a shape-fixing necessity.", explanation: "Encourages reasoning about the difference between geometric rigidity and physical/structural strength." },
    ],
  },
  {
    id: 19,
    caseTitle: "The Photographer's Reflector Panel",
    caseDescription: "A photographer uses a foldable, rhombus-shaped light reflector panel. When fully opened, its diagonals measure 90 cm and 120 cm.",
    subQuestions: [
      { question: "Find the area of the reflector panel when fully open.", options: ["2700 sq cm", "5400 sq cm", "10800 sq cm", "210 sq cm"], correctIndex: 1, answer: "5400 sq cm", explanation: "Area = (1/2) x 90 x 120 = 5400 square cm." },
      { question: "Find the length of each edge of the panel's frame.", answer: "Half-diagonals are 45 cm and 60 cm. Edge = sqrt(45^2 + 60^2) = sqrt(2025+3600) = sqrt(5625) = 75 cm.", explanation: "Pythagoras' theorem on the right triangle formed by the perpendicular half-diagonals." },
      { question: "The photographer wants a second panel that is a perfect square when open, using the same 75 cm edge length. What would its diagonal need to be?", answer: "diagonal = side x sqrt(2) = 75 x sqrt(2), approximately 106.1 cm (and both diagonals would need to be this same length, since a square's diagonals are equal).", explanation: "Applies the square-specific diagonal-to-side relationship, contrasting it with the general rhombus case." },
    ],
  },
  {
    id: 20,
    caseTitle: "Auditing a Furniture Factory's Quality Check",
    caseDescription: "A furniture factory's quality-control team checks every rectangular tabletop leaving the workshop using only a tape measure: they measure the two diagonals and check both pairs of opposite sides. A batch of 200 tabletops is checked. 185 pass with equal diagonals and equal opposite sides. 10 have equal opposite sides but unequal diagonals. 5 have equal diagonals but one pair of opposite sides is slightly unequal.",
    subQuestions: [
      { question: "Are the 185 'fully passing' tabletops guaranteed to be true rectangles?", answer: "Yes -- equal opposite sides plus equal diagonals (both bisecting at the same centre point, as would be checked in practice) together satisfy the full conditions needed to guarantee a rectangle.", explanation: "Combines both the side-equality and diagonal-equality checks used in the factory's real-world quality process." },
      { question: "What is likely wrong, geometrically, with the 10 tabletops that have equal sides but unequal diagonals?", answer: "Their angles have likely warped away from 90 degrees -- they may have become non-rectangular parallelograms (a 'leaning' shape) while the side lengths stayed the same, since equal opposite sides alone only guarantees a parallelogram, not a rectangle.", explanation: "Equal sides guarantee a parallelogram; only equal diagonals (in addition) guarantee it is specifically a rectangle." },
      { question: "What is likely wrong with the 5 tabletops that have equal diagonals but unequal opposite sides?", answer: "These are likely closer to an isosceles trapezium shape rather than a rectangle or parallelogram at all -- equal diagonals alone, without confirming the sides are also equal and parallel, does not guarantee a parallelogram, let alone a rectangle.", explanation: "Highlights that equal diagonals by themselves are not sufficient without the bisecting/parallel-sides condition too." },
    ],
  },
];

export const MATHS8_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "How many sides does a quadrilateral have?", options: ["Three", "Four", "Five", "Six"], correctAnswer: 1, explanation: "A quadrilateral is any closed figure with exactly four straight sides." },
  { id: 2, question: "The angle sum of a quadrilateral is:", options: ["180 degrees", "270 degrees", "360 degrees", "450 degrees"], correctAnswer: 2, explanation: "Splitting into two triangles via a diagonal gives 180 + 180 = 360 degrees." },
  { id: 3, question: "A quadrilateral has angles 100, 85, 90 degrees. Find the fourth angle.", options: ["75 degrees", "85 degrees", "90 degrees", "95 degrees"], correctAnswer: 1, explanation: "360 - 100 - 85 - 90 = 85 degrees." },
  { id: 4, question: "A rectangle is defined using only its:", options: ["Side lengths", "Angles (all 90 degrees)", "Perimeter", "Area"], correctAnswer: 1, explanation: "A rectangle needs only the condition that all four angles are 90 degrees; equal opposite sides then follow automatically." },
  { id: 5, question: "The diagonals of a rectangle:", options: ["Are unequal but bisect each other", "Are equal and bisect each other", "Are perpendicular", "Do not bisect each other"], correctAnswer: 1, explanation: "This is the defining diagonal property of a rectangle." },
  { id: 6, question: "In rectangle ABCD, if AC = 14 cm, then BD equals:", options: ["7 cm", "14 cm", "21 cm", "28 cm"], correctAnswer: 1, explanation: "Diagonals of a rectangle are always equal." },
  { id: 7, question: "A square must have:", options: ["Equal sides only", "Equal angles only", "Equal sides AND equal angles", "Neither equal sides nor equal angles"], correctAnswer: 2, explanation: "A square combines both conditions -- it is a special rectangle that is also a rhombus." },
  { id: 8, question: "The diagonals of a square cross at:", options: ["30 degrees", "60 degrees", "90 degrees", "120 degrees"], correctAnswer: 2, explanation: "Square diagonals are always perpendicular, in addition to being equal and bisecting each other." },
  { id: 9, question: "In square PQRS, the diagonal PR bisects angle P. If angle P is 90 degrees, each half is:", options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"], correctAnswer: 1, explanation: "90 / 2 = 45 degrees, since the diagonals of a square bisect its angles." },
  { id: 10, question: "A parallelogram must have:", options: ["All angles equal", "Both pairs of opposite sides parallel", "All sides equal", "Perpendicular diagonals"], correctAnswer: 1, explanation: "This is the exact defining condition of a parallelogram." },
  { id: 11, question: "In parallelogram ABCD, angle B = 118 degrees. Find angle D.", options: ["62 degrees", "90 degrees", "118 degrees", "180 degrees"], correctAnswer: 2, explanation: "Opposite angles of a parallelogram are equal." },
  { id: 12, question: "In parallelogram ABCD, angle B = 118 degrees. Find angle C.", options: ["62 degrees", "90 degrees", "118 degrees", "180 degrees"], correctAnswer: 0, explanation: "Angle B and angle C are adjacent, so they are supplementary: 180 - 118 = 62 degrees." },
  { id: 13, question: "The diagonals of a general parallelogram:", options: ["Are always equal", "Bisect each other, but are not necessarily equal", "Are always perpendicular", "Never intersect"], correctAnswer: 1, explanation: "Bisection is guaranteed; equality and perpendicularity are only true for special parallelograms (rectangle, rhombus, square)." },
  { id: 14, question: "A rhombus is a parallelogram in which additionally:", options: ["All angles are 90 degrees", "All four sides are equal", "The diagonals are equal", "One pair of sides is parallel only"], correctAnswer: 1, explanation: "Equal sides is the extra condition that makes a parallelogram a rhombus." },
  { id: 15, question: "The diagonals of a rhombus intersect at:", options: ["45 degrees", "60 degrees", "90 degrees", "It depends on the rhombus"], correctAnswer: 2, explanation: "Rhombus diagonals always cross at exactly 90 degrees." },
  { id: 16, question: "A rhombus has diagonals 16 cm and 30 cm. Find its side length.", options: ["8 cm", "15 cm", "17 cm", "23 cm"], correctAnswer: 2, explanation: "Half-diagonals are 8 cm and 15 cm; side = sqrt(8^2+15^2) = sqrt(64+225) = sqrt(289) = 17 cm." },
  { id: 17, question: "In rhombus WXYZ, if angle W = 76 degrees, find angle X.", options: ["76 degrees", "90 degrees", "104 degrees", "180 degrees"], correctAnswer: 2, explanation: "Adjacent angles are supplementary: 180 - 76 = 104 degrees." },
  { id: 18, question: "Every square is also a:", options: ["Rhombus only, not a rectangle", "Rectangle only, not a rhombus", "Both a rectangle and a rhombus", "Neither a rectangle nor a rhombus"], correctAnswer: 2, explanation: "A square satisfies both the rectangle's all-90-degree-angle condition and the rhombus's all-equal-sides condition." },
  { id: 19, question: "A kite is defined by having:", options: ["All four sides equal", "Two distinct pairs of adjacent equal sides", "Both diagonals equal", "Both pairs of opposite sides parallel"], correctAnswer: 1, explanation: "This is the exact defining property of a kite." },
  { id: 20, question: "In kite ABCD with AB=BC and CD=DA, which diagonal bisects the other diagonal?", options: ["AC bisects BD", "BD bisects AC", "Both bisect each other equally", "Neither bisects the other"], correctAnswer: 1, explanation: "Diagonal BD (joining the vertices between the equal side pairs) bisects diagonal AC, and is perpendicular to it." },
  { id: 21, question: "A trapezium needs:", options: ["Both pairs of opposite sides parallel", "At least one pair of opposite sides parallel", "All sides equal", "All angles equal"], correctAnswer: 1, explanation: "Only ONE pair of parallel sides is required for a trapezium." },
  { id: 22, question: "An isosceles trapezium has:", options: ["Equal parallel sides", "Equal non-parallel sides (legs)", "Perpendicular diagonals", "All angles equal"], correctAnswer: 1, explanation: "'Isosceles' here refers to the two legs (non-parallel sides) being equal." },
  { id: 23, question: "In trapezium ABCD with AB parallel to DC, angle A and angle D are related by:", options: ["Equal to each other", "Sum to 90 degrees", "Sum to 180 degrees", "Sum to 360 degrees"], correctAnswer: 2, explanation: "AD is a transversal to the parallel sides, so A and D are co-interior angles summing to 180 degrees." },
  { id: 24, question: "Two perpendicular diameters of a circle, joined at their endpoints, always form a:", options: ["Rectangle (not a square)", "Rhombus (not a square)", "Square", "Trapezium"], correctAnswer: 2, explanation: "Equal (radii-based), bisecting, and perpendicular diagonals together guarantee a square." },
  { id: 25, question: "Which condition alone is enough to guarantee a rectangle from two straight strips crossing each other?", options: ["They are perpendicular", "They are equal in length and bisect each other", "They are unequal but bisect each other", "They cross at 45 degrees"], correctAnswer: 1, explanation: "This is the exact carpenter's-problem result from the chapter." },
  { id: 26, question: "A quadrilateral has three angles measuring 90 degrees. The fourth angle must be:", options: ["45 degrees", "60 degrees", "90 degrees", "180 degrees"], correctAnswer: 2, explanation: "360 - 90 - 90 - 90 = 90 degrees." },
  { id: 27, question: "A quadrilateral in which opposite angles are equal must be a:", options: ["Kite", "Trapezium", "Parallelogram", "None of these"], correctAnswer: 2, explanation: "Equal opposite angles force adjacent angles to be supplementary, giving parallel opposite sides." },
  { id: 28, question: "If a quadrilateral's diagonals bisect each other, it must be a:", options: ["Rectangle", "Rhombus", "Parallelogram", "Trapezium"], correctAnswer: 2, explanation: "Bisecting diagonals alone (without extra conditions like perpendicularity or equal length) guarantee only a parallelogram." },
  { id: 29, question: "If a quadrilateral's diagonals are perpendicular, it is:", options: ["Always a rhombus", "Not necessarily a rhombus (a kite is a counter-example)", "Always a square", "Never a valid quadrilateral"], correctAnswer: 1, explanation: "Perpendicularity alone does not guarantee equal sides; a kite has perpendicular diagonals without being a rhombus in general." },
  { id: 30, question: "Joining the midpoints of a square's four sides always gives:", options: ["A rectangle (not a square)", "A rhombus (not a square)", "A smaller square", "A trapezium"], correctAnswer: 2, explanation: "The four congruent corner triangles formed guarantee equal sides and 90 degree angles for the new shape." },
  { id: 31, question: "The midpoint-square formed inside a square has what fraction of the original square's area?", options: ["1/4", "1/3", "1/2", "2/3"], correctAnswer: 2, explanation: "The midpoint-square always has exactly half the area of the original square." },
  { id: 32, question: "A rhombus with one right angle must be:", options: ["A trapezium", "A kite only", "A square", "Impossible to construct"], correctAnswer: 2, explanation: "One right angle forces all four angles of a rhombus to be 90 degrees, giving a square." },
  { id: 33, question: "In a Venn diagram, the rectangle and rhombus regions overlap exactly in the region for:", options: ["Trapezium", "Kite", "Square", "Parallelogram"], correctAnswer: 2, explanation: "A square is precisely the shape that is simultaneously a rectangle and a rhombus." },
  { id: 34, question: "Every parallelogram is also a:", options: ["Rectangle", "Rhombus", "Trapezium", "Kite"], correctAnswer: 2, explanation: "A parallelogram, having (at least) one pair of parallel sides, always satisfies the looser trapezium condition too." },
  { id: 35, question: "Which of these quadrilaterals is guaranteed to have EQUAL diagonals?", options: ["A general parallelogram", "A general rhombus", "A rectangle", "A general kite"], correctAnswer: 2, explanation: "Equal diagonals is a defining property specific to rectangles (and squares)." },
  { id: 36, question: "Which of these is guaranteed to have PERPENDICULAR diagonals?", options: ["A general rectangle", "A rhombus", "A general trapezium", "A general parallelogram"], correctAnswer: 1, explanation: "Perpendicular diagonals is a defining property of a rhombus (and hence of a square too)." },
  { id: 37, question: "PQRS is a rectangle with diagonals meeting at O. If angle OPQ = 33 degrees, find angle POQ.", options: ["33 degrees", "66 degrees", "114 degrees", "147 degrees"], correctAnswer: 2, explanation: "Triangle OPQ is isosceles (OP=OQ), so angle OQP = 33 degrees too, and angle POQ = 180-33-33 = 114 degrees." },
  { id: 38, question: "A square has diagonal 9 cm. What is the length of each side (to one decimal place)?", options: ["4.5 cm", "6.4 cm", "9.0 cm", "12.7 cm"], correctAnswer: 1, explanation: "side = diagonal / sqrt(2) = 9 / 1.414, approximately 6.4 cm." },
  { id: 39, question: "In a rhombus, the diagonals also serve to:", options: ["Bisect the angles of the rhombus", "Make all angles equal to 90 degrees", "Make the rhombus a trapezium", "Have no special relation to the angles"], correctAnswer: 0, explanation: "Bisecting the vertex angles is Property 5 of a rhombus." },
  { id: 40, question: "A kite's two diagonals are 10 cm and 16 cm, and the 10 cm diagonal is the one that gets bisected. Each half of that diagonal is:", options: ["2.5 cm", "5 cm", "8 cm", "10 cm"], correctAnswer: 1, explanation: "10 / 2 = 5 cm, since the diagonal is bisected equally." },
  { id: 41, question: "An isosceles trapezium's diagonals are:", options: ["Never equal", "Always equal, due to its left-right symmetry", "Always perpendicular", "Always parallel to each other"], correctAnswer: 1, explanation: "The symmetry that makes the legs equal also makes the two diagonals equal." },
  { id: 42, question: "Which statement is TRUE about a general (non-isosceles) trapezium's legs?", options: ["They must be equal", "They must be parallel to each other", "They can be of any (possibly unequal) length", "They must be perpendicular to the parallel sides"], correctAnswer: 2, explanation: "Only an isosceles trapezium requires equal legs; a general trapezium's legs can differ." },
  { id: 43, question: "A quadrilateral has all four sides equal but no right angles. It is a:", options: ["Square", "Rectangle", "Rhombus (non-square)", "Kite (non-rhombus)"], correctAnswer: 2, explanation: "All sides equal is the rhombus condition; without a right angle, it is a non-square rhombus." },
  { id: 44, question: "A quadrilateral has all four angles equal but unequal adjacent sides. It is a:", options: ["Square", "Rectangle (non-square)", "Rhombus", "Kite"], correctAnswer: 1, explanation: "All angles equal (hence all 90 degrees) is the rectangle condition; unequal sides rule out a square." },
  { id: 45, question: "Two rectangles have the same area but different side lengths. Must their diagonals be equal to each other?", options: ["Yes, always", "No, not necessarily", "Only if both are squares", "Only if their perimeters also match"], correctAnswer: 1, explanation: "Diagonal length depends on both side lengths (via Pythagoras), not just the area, so two rectangles with equal area can have different diagonals." },
  { id: 46, question: "A quadrilateral's diagonals are equal, bisect each other, but are NOT perpendicular. It is a:", options: ["Square", "Rectangle (non-square)", "Rhombus", "Trapezium"], correctAnswer: 1, explanation: "Equal + bisecting gives a rectangle; without perpendicularity, it is not a square." },
  { id: 47, question: "A quadrilateral's diagonals are perpendicular and bisect each other, but are NOT equal. It is a:", options: ["Square", "Rectangle", "Rhombus (non-square)", "Kite (non-rhombus)"], correctAnswer: 2, explanation: "Perpendicular + bisecting gives a rhombus; without equal diagonals, it is not a square." },
  { id: 48, question: "Which pair of quadrilateral types can NEVER describe the exact same shape (other than by coincidence of specific numbers)?", options: ["Square and rhombus", "Square and rectangle", "General trapezium and general parallelogram", "Rhombus and kite"], correctAnswer: 2, explanation: "A parallelogram has two pairs of parallel sides, always satisfying the trapezium condition too -- but a trapezium is normally used to mean a shape with only ONE such pair, so 'general' (non-parallelogram) trapeziums and parallelograms describe different, non-overlapping shapes." },
  { id: 49, question: "The word 'bisect' means to:", options: ["Double a quantity", "Divide a quantity into two equal parts", "Rotate a shape by 90 degrees", "Reflect a shape across a line"], correctAnswer: 1, explanation: "This is the exact meaning given in the chapter for 'the diagonals bisect each other'." },
  { id: 50, question: "A 'conjecture', as used when exploring quadrilateral properties, means:", options: ["A property that has been fully, rigorously proved", "A statement you are fairly confident about from observation, but have not yet proved", "A false statement", "A formula from a formula sheet"], correctAnswer: 1, explanation: "A conjecture is a confident guess based on pattern/observation -- proof (deduction) is what turns a conjecture into a certainty." },
];







