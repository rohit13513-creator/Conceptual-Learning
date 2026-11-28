import type { CTopic } from "./carbonNotesTypes";
import { ex } from "./bpNotesA";

// Class VIII Maths, The Baudhāyana-Pythagoras Theorem. Topics 18 to 24: the Competition Corner (square root spiral, triple formulas, acute and
// obtuse tests, area results, distances and box diagonals, classic puzzles and practice). A step beyond the textbook. Same writing rules.

export const BP_C: CTopic[] = [
  {
    id: "q1", category: "Competition Corner", title: "The Square Root Spiral", heading: "Competition Corner: Drawing √2, √3, √4 and More",
    sub: "Right triangles one after another.",
    blocks: [
      { t: "note", title: "Competition Corner", s: "These ideas go a step beyond the textbook. They are favourites in Olympiads and scholarship tests. First be sure of the textbook topics, then try these." },
      { t: "dia", id: "bp_spiral" },
      { t: "ol", items: [
        "Start with a right triangle whose two shorter sides are 1 and 1. Its hypotenuse is √2.",
        "On that hypotenuse draw a new right triangle with the other side 1. Its hypotenuse is √(2 + 1) = **√3**.",
        "Repeat: the hypotenuses are **√4 = 2, √5, √6, √7, √8, ...**",
      ] },
      { t: "key", title: "Rule", s: "The hypotenuse of the k-th triangle of the spiral is **√(k + 1)**." },
      ex("How many triangles of the spiral are needed to get a hypotenuse of length 5?", ["√(k + 1) = 5, so k + 1 = 25"], "24 triangles"),
      ex("Show how to get √10 with one right triangle.", ["10 = 9 + 1 = 3^{2} + 1^{2}", "Take shorter sides 3 and 1."], "The hypotenuse is √10"),
    ],
  },
  {
    id: "q2", category: "Competition Corner", title: "A Formula for All Primitive Triples", heading: "Competition Corner: Euclid's Formula",
    sub: "Two numbers give a whole triple.",
    blocks: [
      { t: "eq", lines: ["a = m^{2} − n^{2},  b = 2mn,  c = m^{2} + n^{2}   (m greater than n)"] },
      { t: "p", s: "Check: (m^{2} − n^{2})^{2} + (2mn)^{2} = (m^{2} + n^{2})^{2}. The triple is **primitive** when m and n have no common factor and **one of them is even and the other odd**." },
      { t: "table", head: ["m", "n", "Triple"], rows: [["2", "1", "(3, 4, 5)"], ["3", "2", "(5, 12, 13)"], ["4", "1", "(15, 8, 17)"], ["4", "3", "(7, 24, 25)"], ["5", "2", "(21, 20, 29)"], ["6", "1", "(35, 12, 37)"]] },
      { t: "key", title: "Nice facts about every triple", s: "In every Baudhāyana triple at least one of the **shorter sides is divisible by 3**, at least one is divisible by **4**, and at least one of the **three sides is divisible by 5**. So the product a × b × c is always divisible by **60**." },
      ex("Use m = 5, n = 4 to find a triple.", ["a = 25 − 16 = 9", "b = 2 × 5 × 4 = 40", "c = 25 + 16 = 41"], "(9, 40, 41)"),
      ex("One leg of a primitive triple is 20. Find a triple with m = 5 and n = 2.", ["b = 2 × 5 × 2 = 20", "a = 25 − 4 = 21 and c = 25 + 4 = 29"], "(20, 21, 29)"),
    ],
  },
  {
    id: "q3", category: "Competition Corner", title: "Acute, Right or Obtuse?", heading: "Competition Corner: Reading a Triangle from Its Sides",
    sub: "Compare the square of the longest side.",
    blocks: [
      { t: "table", head: ["If c is the longest side and", "the triangle is"], rows: [["c^{2} = a^{2} + b^{2}", "**right** angled"], ["c^{2} is more than a^{2} + b^{2}", "**obtuse** angled"], ["c^{2} is less than a^{2} + b^{2}", "**acute** angled"]] },
      ex("Classify the triangles with sides (i) 5, 6, 9 (ii) 6, 7, 8 (iii) 9, 12, 15.", ["(i) 81 and 25 + 36 = 61: obtuse", "(ii) 64 and 36 + 49 = 85: acute", "(iii) 225 and 81 + 144 = 225: right"], "obtuse, acute, right"),
      ex("For which whole numbers x is the triangle with sides 3, 4, x obtuse with x the longest side?", ["x^{2} more than 25 means x is at least 6.", "A triangle needs x less than 3 + 4 = 7."], "x = 6"),
    ],
  },
  {
    id: "q4", category: "Competition Corner", title: "Area Results Worth Knowing", heading: "Competition Corner: Shortcuts for Areas",
    sub: "Equilateral triangles, altitudes and circles.",
    blocks: [
      { t: "table", head: ["Result", "Formula"], rows: [
        ["Height of an equilateral triangle of side a", "[√3|2] a"], ["Area of an equilateral triangle", "[√3|4] a^{2}"], ["Altitude to the hypotenuse", "h = [ab|c]"], ["Median to the hypotenuse", "[c|2]"], ["Radius of the circle inside a right triangle", "r = [a + b − c|2]"],
        ["Semicircles on the sides", "area on c = sum of the areas on a and b"],
      ] },
      ex("Find the area of an equilateral triangle of side 10.", ["[√3|4] × 100 = 25√3"], "25√3 ≈ 43.30"),
      ex("The legs of a right triangle are 6 and 8. Find the altitude to the hypotenuse.", ["c = 10", "h = [6 × 8|10] = 4.8"], "4.8"),
      ex("Find the radius of the circle that touches the three sides of a 5, 12, 13 triangle.", ["r = [5 + 12 − 13|2] = 2"], "2"),
    ],
  },
  {
    id: "q5", category: "Competition Corner", title: "Distances and the Diagonal of a Box", heading: "Competition Corner: From a Flat Figure to a Solid",
    sub: "The distance formula and 3-D diagonals.",
    blocks: [
      { t: "eq", lines: ["Distance between (x1, y1) and (x2, y2) = √((x2 − x1)^{2} + (y2 − y1)^{2})", "Diagonal of a box: d = √(l^{2} + b^{2} + h^{2})", "Diagonal of a cube of side a: a√3"] },
      { t: "dia", id: "bp_cuboid" },
      ex("Find the distance between (−2, 3) and (4, −5).", ["Differences: 6 and 8", "d = √(36 + 64)"], "10"),
      ex("What is the longest rod that fits in a box 3 m by 4 m by 12 m?", ["d^{2} = 9 + 16 + 144 = 169"], "13 m"),
      ex("The diagonal of a cube is 6√3. Find its volume.", ["a√3 = 6√3, so a = 6", "Volume = 6 × 6 × 6"], "216 cubic units"),
    ],
  },
  {
    id: "q6", category: "Competition Corner", title: "Classic Puzzles", heading: "Competition Corner: Trees, Ladders and Ants",
    sub: "Popular problems with a twist.",
    blocks: [
      ex("A 15 m tree breaks, and its top touches the ground 9 m from its foot, still joined to the trunk. At what height did it break?", ["Let the standing part be x; the broken part is 15 − x.", "x^{2} + 81 = (15 − x)^{2} = 225 − 30x + x^{2}", "30x = 144"], "4.8 m"),
      ex("A 25 m ladder has its foot 7 m from a wall. The top slides down 4 m. How far does the foot move?", ["First height: √(625 − 49) = 24", "New height 20, new foot distance √(625 − 400) = 15", "Moved 15 − 7 = 8"], "8 m"),
      ex("An ant walks on the surface of a cube of edge 10 cm from one corner to the opposite corner. Find the shortest path.", ["Open two faces into one rectangle 20 by 10.", "Path = √(400 + 100) = √500"], "10√5 ≈ 22.36 cm"),
      ex("Two boats start together; one goes 15 km north and the other 8 km east. How far apart are they?", ["d^{2} = 225 + 64 = 289"], "17 km"),
    ],
  },
  {
    id: "q7", category: "Competition Corner", title: "Practice: Challenge Questions", heading: "Competition Corner: Practise Like a Champion",
    sub: "Ten sharp questions with answers, and the common traps.",
    blocks: [
      { t: "qa", title: "Challenge yourself", items: [
        ["The sides of a right triangle are three consecutive whole numbers. Find them.", "(x − 1)^{2} + x^{2} = (x + 1)^{2} gives x = 4: **3, 4, 5**."],
        ["The area of a square drawn on the diagonal of a square is 98 cm^{2}. Find the side of the first square.", "First area = 49 cm^{2}, side **7 cm**."],
        ["A right triangle has legs 20 and 21. Find its perimeter.", "c = √(400 + 441) = 29, perimeter **70**."],
        ["The hypotenuse of a right triangle is 25 and one leg is 7. Find the area.", "Other leg 24, area = [1|2] × 7 × 24 = **84**."],
        ["The diagonals of a rhombus are 10 and 24. Find its perimeter.", "Side 13, perimeter **52**."],
        ["The perimeter of an isosceles right triangle is 10 + 5√2 cm. Find its equal sides.", "2a + a√2 = 10 + 5√2, so **a = 5 cm**."],
        ["Which whole number is closest to √50?", "7^{2} = 49 and 8^{2} = 64, so **7**."],
        ["Can 13 be written as the sum of two squares? So can a square of area 13 be drawn on a dot grid?", "13 = 4 + 9 = 2^{2} + 3^{2}: **yes**."],
        ["A square and an equilateral triangle both have side 6. Which has the larger area?", "36 against 9√3 ≈ 15.6: the **square**."],
        ["A rectangle has diagonal 17 and one side 8. Find its area.", "Other side 15, area **120**."],
      ] },
      { t: "table", head: ["Common trap", "The truth"], rows: [
        ["Doubling the side doubles the area", "It makes the area **4 times**"], ["c^{2} = a^{2} + b^{2} works in any triangle", "Only in a **right** triangle with c the hypotenuse"], ["√(a^{2} + b^{2}) = a + b", "No: √(9 + 16) = 5, not 7"], ["The hypotenuse can be any side", "It is always **opposite the right angle** and the longest"], ["√2 = 1.414", "That is only an approximation"],
      ] },
    ],
  },
];
