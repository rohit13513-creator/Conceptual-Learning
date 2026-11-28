import type { CompetencyQuestion } from "../types-custom";
import { u } from "./area8Util";

// Class VIII Maths, Area: 20 case studies of the CBSE pattern, easiest first. A paragraph is followed by three questions of 1, 1 and 2 marks,
// so each carries 4 marks.

let k = 0;
type Part = { question: string; marks: number; answer: string; explanation?: string };
const q = (question: string, answer: string, marks: number, explanation?: string): Part => ({ question: u(question), marks, answer: u(answer), explanation: explanation ? u(explanation) : undefined });
const C = (caseTitle: string, caseDescription: string, subQuestions: [Part, Part, Part], diagram?: string): CompetencyQuestion => ({
  id: ++k, caseTitle: u(caseTitle), caseDescription: u(caseDescription), subQuestions, diagram,
});

export const AREA8_COMPETENCY: CompetencyQuestion[] = [
  C("The rangoli", "For a school festival, Asha draws two rectangular rangolis. The first is 7 dm long and 4 dm wide. The second is 8 dm long and 3 dm wide. One packet of powder covers 4 dm^2.",
    [q("What is the area of the first rangoli?", "28 dm^2", 1), q("Which rangoli needs more powder?", "The first, as 28 is more than 24.", 1), q("How many packets are needed to colour both?", "(28 + 24) ÷ 4 = 13 packets.", 2)], "area_units"),
  C("The classroom floor", "A classroom floor is 8 m long and 6 m wide. It is to be covered with square tiles of side 40 cm. Each tile costs ₹35.",
    [q("What is the area of the floor in m^2?", "48 m^2", 1), q("What is the area of one tile in cm^2?", "1600 cm^2", 1), q("Find the number of tiles and the total cost.", "480000 ÷ 1600 = 300 tiles; cost 300 × 35 = ₹10500.", 2)]),
  C("The park path", "A rectangular park is 30 m long and 20 m wide. The municipality lays a path so that the outer edge is a rectangle 40 m by 28 m.",
    [q("What is the area of the park?", "600 m^2", 1), q("What is the area inside the outer edge?", "1120 m^2", 1), q("Find the area of the path, and say whether it changes if the outer rectangle is shifted with the park still inside.", "520 m^2; it does not change.", 2)], "area_path"),
  C("The crossroads", "A field 60 m long and 40 m wide has two roads, each 5 m wide, crossing at the middle, one parallel to each side.",
    [q("What is the area of the road parallel to the longer side?", "300 m^2", 1), q("What is the area of the common part?", "25 m^2", 1), q("Find the total road area and the cost of paving at ₹50 per m^2.", "300 + 200 − 25 = 475 m^2; cost ₹23750.", 2)], "area_cross"),
  C("The triangular flag", "A flag is cut from a rectangular cloth 90 cm long and 60 cm wide. The flag is a triangle whose base is one 90 cm side and whose third corner is on the opposite side.",
    [q("What fraction of the cloth is used in the flag?", "Half", 1), q("What is the area of the cloth?", "5400 cm^2", 1), q("Find the area of the flag and of the cloth left.", "Flag 2700 cm^2 and 2700 cm^2 left.", 2)], "area_half"),
  C("The roof support", "A triangular roof support has a base of 12 m and a vertical height of 5 m. One of its slant sides is 10 m long.",
    [q("What is the area of the triangle?", "30 m^2", 1), q("Which formula connects the slant side and its perpendicular height?", "Area = 1/2 × side × height on that side.", 1), q("Find the perpendicular distance of the opposite corner from the 10 m side.", "30 × 2 ÷ 10 = 6 m.", 2)], "area_heights"),
  C("Sharing a field", "A farmer owns a triangular field of area 2400 m^2. He wants to give equal land to his two children by one straight fence from a corner.",
    [q("What is the line called that joins a corner to the midpoint of the opposite side?", "A median", 1), q("How much land does each child get?", "1200 m^2", 1), q("Why are the two parts equal in area?", "They have equal bases (half the side each) and the same height from the corner.", 2)], "area_median"),
  C("The plot map", "A plot is a quadrilateral ABCD. A surveyor measures the diagonal AC as 50 m and the perpendiculars on it from B and D as 18 m and 22 m.",
    [q("What is the area of triangle ABC?", "450 m^2", 1), q("What is the area of triangle ACD?", "550 m^2", 1), q("Find the area of the plot and its value at ₹2000 per m^2.", "1000 m^2; value ₹20,00,000.", 2)], "area_quad"),
  C("The window pane", "A rectangular window ABCD is 18 dm wide and 10 dm high. The part FECD is frosted glass, where E is on the top edge 10 dm from A and F is on the left edge 6 dm below A.",
    [q("What is the area of the window?", "180 dm^2", 1), q("What is the area of triangle AEF?", "30 dm^2", 1), q("Find the area of the frosted part.", "180 − 30 − 40 = 110 dm^2.", 2)], "area_shaded"),
  C("The kite maker", "Imran makes a kite with two sticks fixed at right angles. The sticks are 60 cm and 40 cm long and form the diagonals of the kite. Paper costs 2 paise per cm^2.",
    [q("What is the area of the kite?", "1200 cm^2", 1), q("What happens to the area if both sticks are doubled?", "It becomes 4 times.", 1), q("Find the cost of paper for 10 such kites.", "10 × 1200 = 12000 cm^2; cost 24000 paise = ₹240.", 2)], "area_kite"),
  C("The tilted shelf", "A frame is in the shape of a parallelogram with sides 12 cm and 8 cm. The height on the 12 cm side is 6 cm.",
    [q("What is the area of the frame?", "72 cm^2", 1), q("What is the height on the 8 cm side?", "9 cm", 1), q("If the frame is pushed upright into a rectangle with the same sides, what is the new area and the gain?", "96 cm^2, a gain of 24 cm^2.", 2)], "area_pgram_side"),
  C("The paper cutting", "Meena cuts a parallelogram of base 20 cm and height 9 cm along a height and moves the triangle to the other end.",
    [q("What shape does she get?", "A rectangle", 1), q("What is the name of this method?", "Dissection", 1), q("Give the dimensions and area of the new shape.", "20 cm by 9 cm, area 180 cm^2.", 2)], "area_pgram"),
  C("The floor design", "A designer uses rhombus-shaped tiles whose diagonals are 24 cm and 18 cm.",
    [q("What is the area of one tile?", "216 cm^2", 1), q("What is the side of the tile?", "15 cm, since 144 + 81 = 225.", 1), q("How many tiles cover 10.8 m^2 if there is no wastage?", "10.8 m^2 = 108000 cm^2; 108000 ÷ 216 = 500 tiles.", 2)], "area_rhombus"),
  C("The canal section", "The cross-section of a canal is a trapezium. The width at the top is 12 m, at the bottom 8 m, and the depth is 3 m.",
    [q("Which sides of the section are parallel?", "The top and the bottom.", 1), q("What is the sum of the parallel sides?", "20 m", 1), q("Find the area of the section.", "1/2 × 3 × 20 = 30 m^2.", 2)], "area_trap"),
  C("The staircase wall", "A wall below a staircase is a trapezium with the two upright sides 14 ft and 6 ft, which are 10 ft apart. One tin of paint covers 50 ft^2.",
    [q("What is the area of the wall?", "100 ft^2", 1), q("How many tins are needed for one coat?", "2 tins", 1), q("Express the area of the wall in square inches.", "100 × 144 = 14400 in^2.", 2)], "area_trap_figs"),
  C("The hexagonal table", "A regular hexagonal table top is painted in three colours: a trapezium, an equilateral triangle and a rhombus. The whole top has area 900 cm^2.",
    [q("Into how many equal small triangles can the hexagon be divided?", "6", 1), q("What is the area of one small triangle?", "150 cm^2", 1), q("Find the areas of the trapezium and the rhombus.", "Trapezium 3 × 150 = 450 cm^2, rhombus 2 × 150 = 300 cm^2.", 2)], "area_hexagon"),
  C("The water carrier", "Gopal's house and water tank are on the same side of a straight river bank. He must walk from his house to the river and then to the tank by the shortest way.",
    [q("What is the image of the tank in the river bank used for?", "To turn the bent path into a straight one of the same length.", 1), q("How does the distance from P to the tank compare with P to the image?", "They are equal.", 1), q("Describe how to find the point P.", "Reflect the tank in the bank and join the house to the image; the line meets the bank at P.", 2)], "area_river"),
  C("The garden of squares", "A square garden of side 16 m has an inner square bed formed by joining the midpoints of the sides. The corner pieces are planted with flowers.",
    [q("What is the area of the garden?", "256 m^2", 1), q("What is the area of the inner bed?", "128 m^2", 1), q("Find the area of one flower corner.", "(256 − 128) ÷ 4 = 32 m^2.", 2)]),
  C("The photo frame", "A rectangular photo 20 cm by 15 cm is put in a frame of equal width all round. The frame with the photo measures 26 cm by 21 cm.",
    [q("What is the width of the frame?", "3 cm", 1), q("What is the area of the photo?", "300 cm^2", 1), q("Find the area of the frame and its ratio to the area of the photo.", "546 − 300 = 246 cm^2; ratio 246 : 300 = 41 : 50.", 2)], "area_path_in_out"),
  C("The dot grid design", "On a dot grid with dots 1 cm apart, Tara draws a polygon whose corners are all on dots. It has 12 dots on its boundary and 9 dots inside.",
    [q("Which theorem gives the area from the dots?", "Pick's theorem", 1), q("What is half of the number of boundary dots?", "6", 1), q("Find the area of the polygon.", "9 + 6 − 1 = 14 cm^2.", 2)], "area_pick"),
];
