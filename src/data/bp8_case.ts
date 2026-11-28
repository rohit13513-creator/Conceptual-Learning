import type { CompetencyQuestion } from "../types-custom";
import { u } from "./bp8Util";

// Class VIII Maths, The Baudhāyana-Pythagoras Theorem: 20 case studies of the CBSE pattern, easiest first. A paragraph is followed by three questions
// of 1, 1 and 2 marks, so each carries 4 marks.

let k = 0;
type Part = { question: string; marks: number; answer: string; explanation?: string };
const q = (question: string, answer: string, marks: number, explanation?: string): Part => ({ question: u(question), marks, answer: u(answer), explanation: explanation ? u(explanation) : undefined });
const C = (caseTitle: string, caseDescription: string, subQuestions: [Part, Part, Part], diagram?: string): CompetencyQuestion => ({
  id: ++k, caseTitle: u(caseTitle), caseDescription: u(caseDescription), subQuestions, diagram,
});

export const BP8_COMPETENCY: CompetencyQuestion[] = [
  C("The double-sized mat", "Meena has a square mat of side 2 m and wants a square mat of double the area. Her friend suggests doubling the side, but Meena remembers Baudhāyana's rule about the diagonal.",
    [q("What is the area of the given mat?", "4 m^2", 1), q("What area will the mat have if the side is doubled?", "16 m^2, four times", 1), q("What should she use as the side of the new mat, and what is its area?", "The diagonal of the old mat, of length √8 m; the new area is 8 m^2.", 2)], "bp_double"),
  C("The folded paper", "Ravi has a square paper of side 20 cm. He folds all four corners to the centre and gets a smaller square PQRS.",
    [q("What shape is PQRS?", "A square", 1), q("What is the area of the original paper?", "400 cm^2", 1), q("Find the area of PQRS and explain why.", "200 cm^2, since PQRS keeps 4 of the 8 triangles, which is half.", 2)], "bp_fold"),
  C("The garden path", "A square garden has side 10 m. A path is made along its diagonal.",
    [q("What is the formula for the diagonal of a square of side a?", "a√2", 1), q("What is the length of the path?", "10√2 m", 1), q("Find the path length to two decimal places (√2 = 1.414) and the area of a square drawn on the path.", "10 × 1.414 = 14.14 m. Area = 200 m^2.", 2)], "bp_iso"),
  C("The three-four-five rope", "Ancient builders used a rope with 12 equal knots to make a triangle with sides 3, 4 and 5 units to get a perfect corner.",
    [q("Which side is opposite the right angle?", "The side of 5 units", 1), q("Is (3, 4, 5) a Baudhāyana triple?", "Yes", 1), q("If the unit is 50 cm, what are the three sides in metres? Check they still form a right angle.", "1.5 m, 2 m and 2.5 m; 2.25 + 4 = 6.25.", 2)], "bp_345"),
  C("The wall ladder", "A painter places a ladder 13 m long against a wall with its foot 5 m from the wall.",
    [q("Which side of the triangle is the ladder?", "The hypotenuse", 1), q("How high does the ladder reach?", "12 m", 1), q("If the foot is moved to 12 m from the wall, how high does it reach and how much lower than before?", "5 m, which is 7 m lower.", 2)], "bp_ladder"),
  C("The two poles", "Two poles 6 m and 11 m high stand 12 m apart. A wire joins their tops.",
    [q("What is the difference of the heights?", "5 m", 1), q("What is the length of the wire?", "13 m", 1), q("If the wire costs ₹20 per metre, find the cost, and the cost if 1 m extra is bought for knots.", "₹260, and with 1 m extra ₹280.", 2)], "bp_poles"),
  C("The rectangular field", "A farmer's field is a rectangle 24 m by 7 m. He walks along the diagonal instead of two sides.",
    [q("What is the sum of the two sides?", "31 m", 1), q("What is the length of the diagonal?", "25 m", 1), q("How much distance does he save in one round trip along the diagonal compared with the two sides, going and returning?", "Each way saves 6 m, so 12 m in all.", 2)]),
  C("The kite", "A kite flies with its string 50 m long and stretched straight. The kite is vertically above a point 30 m from the boy, who holds the string at ground level.",
    [q("What kind of triangle is formed?", "A right triangle", 1), q("What is the hypotenuse?", "The string, 50 m", 1), q("Find the height of the kite, and its height if the string were 34 m with the same distance.", "√(2500 − 900) = 40 m. With 34 m: √(1156 − 900) = 16 m.", 2)]),
  C("The lotus lake", "A lotus tip is 1 unit above water. The breeze bends the stem until the tip touches the water 3 units from where it was.",
    [q("If the depth is x, what is the stem length?", "x + 1", 1), q("Write the equation from the theorem.", "9 + x^2 = (x + 1)^2", 1), q("Find the depth and the length of the stem.", "x = 4 units; stem 5 units.", 2)], "bp_lotus"),
  C("The rhombus window", "A window grill is shaped as a rhombus with diagonals 60 cm and 80 cm.",
    [q("How do the diagonals of a rhombus meet?", "At right angles, bisecting each other", 1), q("What are the half diagonals?", "30 cm and 40 cm", 1), q("Find the side and the length of wire needed for the boundary.", "Side 50 cm, wire 200 cm.", 2)], "bp_rhombus"),
  C("The tent", "A tent's front face is an isosceles triangle with equal sides 13 ft and base 10 ft.",
    [q("Where does the altitude from the top meet the base?", "At its midpoint", 1), q("What is the height?", "12 ft", 1), q("Find the area of the front face and the cost of cloth for it at ₹15 per square foot.", "Area 60 ft^2; cost ₹900.", 2)]),
  C("The triangle park", "A park is an equilateral triangle of side 20 m.",
    [q("What is each half of the base when an altitude is drawn?", "10 m", 1), q("What is the altitude?", "√(400 − 100) = √300 = 10√3 m", 1), q("Find the area of the park using √3 = 1.732.", "100√3 ≈ 173.2 m^2.", 2)], "bp_equi"),
  C("The triple hunt", "A class finds Baudhāyana triples by multiplying the triple (5, 12, 13) by different counting numbers.",
    [q("Write the triple for k = 2.", "(10, 24, 26)", 1), q("Is (10, 24, 26) primitive?", "No", 1), q("Find the value of k that gives (35, 84, 91), and check the triple.", "k = 7; 1225 + 7056 = 8281 = 91^2.", 2)], "bp_scaled"),
  C("The odd square club", "Students find triples from odd squares using (n − 1)^2 + (2n − 1) = n^2.",
    [q("For the odd square 49, what is n?", "25", 1), q("Which triple results?", "(7, 24, 25)", 1), q("Find the triple from 121 and verify it.", "n = 61: 60^2 + 11^2 = 3600 + 121 = 3721 = 61^2.", 2)], "bp_odd"),
  C("The dot board", "A dot board has dots in a square grid, 1 unit apart. Students make squares with dots as corners.",
    [q("What area is the smallest square along grid lines?", "1 square unit", 1), q("Which area is impossible: 2, 3 or 5?", "3", 1), q("Describe how to make squares of area 8 and 10.", "Area 8: go 2 across and 2 up. Area 10: go 3 across and 1 up.", 2)], "bp_grid"),
  C("The packing box", "A box is 12 cm long, 4 cm wide and 3 cm high. A thin straight stick is to be packed inside.",
    [q("What is the diagonal of the base?", "√(144 + 16) = √160 cm", 1), q("What is the square of the longest rod?", "169", 1), q("Find the longest length and say if a 14 cm stick fits.", "13 cm, so a 14 cm stick does not fit.", 2)], "bp_cuboid"),
  C("The broken tree", "A tree 18 m tall breaks in a storm. Its top touches the ground 12 m from its foot while still joined at the break.",
    [q("If the standing part is x, what is the broken part?", "18 − x", 1), q("Write the equation.", "x^2 + 144 = (18 − x)^2", 1), q("Find the height at which the tree broke and the length of the broken part.", "x = 5 m, broken part 13 m.", 2)]),
  C("The map distance", "On a town map, a school is at (2, 3), a library at (8, 3) and a park at (8, 11). Roads run straight between them.",
    [q("What is the distance from the school to the library?", "6 units", 1), q("What is the distance from the library to the park?", "8 units", 1), q("Find the straight distance from the school to the park and how much shorter it is than going through the library.", "√(36 + 64) = 10 units, 4 units shorter.", 2)]),
  C("The ant's walk", "An ant sits at one corner of a cube of edge 12 cm and wants to walk on the surface to the opposite corner.",
    [q("What is the length of the space diagonal of the cube?", "12√3 cm", 1), q("Can the ant walk along it?", "No, it passes through the inside", 1), q("Find the shortest surface path.", "Unfold two faces: √(24^2 + 12^2) = 12√5 cm.", 2)]),
  C("The two squares", "A designer has square tiles of side 9 cm and 12 cm and wants one square tile of area equal to their total.",
    [q("What is the total area?", "81 + 144 = 225 cm^2", 1), q("What is the side of the new tile?", "15 cm", 1), q("How is this shown with a right triangle? Find its hypotenuse.", "Make a right triangle with legs 9 and 12; the square on the hypotenuse 15 has area 225.", 2)], "bp_rearrange"),
];
