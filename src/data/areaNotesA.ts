import type { CTopic, CBlock } from "./carbonNotesTypes";

// Class VIII Maths, Area (NCERT Ganita Prakash Part II, Chapter 7). Topics 1 to 7: unit squares, perimeter against area, missing sides, paths,
// crosspaths, tubes and doubled squares. Written from the teacher's notes; solved examples 1 to 62 keep the numbers used in those notes.
// In every text: **bold** makes bold, [a|b] is a stacked fraction, ^{..} is a power. Do not write a letter touching a digit (it becomes a subscript).

let n = 0;
/** a solved example, numbered in order through the chapter (same numbers as the teacher's notes) */
export const ex = (q: string, steps: string[], ans: string): CBlock => ({ t: "ex", title: `Solved example ${++n}`, q, steps, ans });
/** an additional worked example that does not disturb that numbering */
export const more = (q: string, steps: string[], ans: string): CBlock => ({ t: "ex", title: "One more example", q, steps, ans });

export const AREA_A: CTopic[] = [
  {
    id: "r1", category: "Rectangles", title: "Area and Unit Squares", heading: "What Area Means",
    sub: "Counting unit squares in a rectangle and a square.",
    blocks: [
      { t: "ul", items: [
        "**Area** is the amount of flat surface enclosed inside a closed figure.",
        "A **unit square** is a square of side 1 unit, for example a square of side 1 cm.",
        "Area is measured by counting how many unit squares (whole or in parts) cover the region **without overlapping**.",
        "**Simple idea:** area tells how much rangoli powder or paint is needed to fill a shape evenly.",
        "Units of area: sq. cm (cm^{2}), sq. m (m^{2}), sq. in (in^{2}), sq. ft (ft^{2}).",
      ] },
      { t: "h", s: "Which rectangle needs more rangoli powder?" },
      { t: "dia", id: "area_units" },
      { t: "p", s: "The 7 cm by 4 cm rectangle holds 7 rows of 4 unit squares, **28** in all. The 8 cm by 3 cm rectangle holds 8 rows of 3, only **24**. So the first one needs more powder." },
      { t: "eq", lines: ["Area of a rectangle = length × width", "Area of a square = side × side"] },
      { t: "h", s: "Four equal parts of a square" },
      { t: "dia", id: "area_four" },
      { t: "ul", items: [
        "A square can be divided into 4 parts of equal area in **infinitely many ways**.",
        "If a part is **pushed in** along one edge and **pushed out** by the same amount along another edge, its area **does not change**.",
      ] },
      { t: "h", s: "Triangle made by a diagonal" },
      { t: "dia", id: "area_diagonal" },
      { t: "key", title: "Half the rectangle", s: "A diagonal divides a rectangle into two **congruent** triangles (exactly the same shape and size). So **each triangle has half the area** of the rectangle." },
      ex("A rectangle has sides 7 cm and 4 cm. Find the area of each triangle formed by its diagonal.", ["Given: length = 7 cm, width = 4 cm", "Area of rectangle = 7 × 4 = 28 cm^{2}", "Area of each triangle = [1|2] × 28 = 14 cm^{2}"], "14 cm^{2}"),
    ],
  },
  {
    id: "r2", category: "Rectangles", title: "Perimeter Cannot Measure Area", heading: "Boundary and Surface Are Different",
    sub: "A longer boundary can hold less.",
    blocks: [
      { t: "ul", items: [
        "**Perimeter** is the length of the boundary of a region.",
        "Two regions can have the **same perimeter** but **different areas**.",
        "A region with a **larger perimeter** can even have a **smaller area**.",
        "So area must be measured with **unit squares**, not with perimeter.",
      ] },
      { t: "dia", id: "area_perimeter" },
      { t: "table", head: ["Region", "Perimeter", "Area"], rows: [["9 cm by 1 cm strip", "20 cm", "9 cm^{2}"], ["4 cm by 4 cm square", "16 cm", "16 cm^{2}"]] },
      { t: "note", title: "Remember", s: "A **long thin** shape always has a large boundary but holds little area." },
      more("A rectangle of 6 cm by 2 cm and a square of side 4 cm: compare their perimeters and areas.", ["Rectangle: perimeter 16 cm, area 6 × 2 = 12 cm^{2}", "Square: perimeter 16 cm, area 4 × 4 = 16 cm^{2}"], "Same perimeter, but the square has 4 cm^{2} more area"),
    ],
  },
  {
    id: "r3", category: "Rectangles", title: "Finding a Missing Side", heading: "Working Backwards from the Area",
    sub: "Other side = area divided by the known side.",
    blocks: [
      { t: "key", title: "Rule", s: "If the area and one side of a rectangle are known, **the other side = area ÷ known side**." },
      { t: "dia", id: "area_missing" },
      ex("In figure (i), four rectangles of areas 28 in^{2}, 21 in^{2}, 35 in^{2} and 14 in^{2} meet at a point. Find the missing side marked ? in.",
        ["21 in^{2} rectangle: width 7 in, so height = 21 ÷ 7 = 3 in", "28 in^{2} rectangle: height = 4 + 3 = 7 in, so width = 28 ÷ 7 = 4 in", "35 in^{2} rectangle: width = 3 + 4 = 7 in, so height = 35 ÷ 7 = 5 in", "14 in^{2} rectangle: height = 5 + 2 = 7 in, so width = 14 ÷ 7 = 2 in"], "Missing side = 2 in"),
      ex("In figure (ii), the yellow rectangle (29 m^{2}) and the grey rectangle (11 m^{2}) have height 4 m. The thick-edged rectangle has area 50 m^{2}. Find the missing sides.",
        ["Width of the yellow part = 29 ÷ 4 = 7.25 m", "Width of the grey part = 11 ÷ 4 = 2.75 m", "Height of the thick-edged rectangle = 50 ÷ 7.25 ≈ 6.9 m", "Missing height below = 6.9 − 4 = 2.9 m"], "7.25 m, 2.75 m and about 2.9 m"),
    ],
  },
  {
    id: "r4", category: "Paths", title: "Area of a Path Around a Park", heading: "Outer Area Minus Inner Area",
    sub: "A strip of land around a rectangle.",
    blocks: [
      { t: "p", s: "A **path** is a strip of land around or across a park or plot." },
      { t: "key", title: "Rule", s: "**Area of a path = area of the outer figure − area of the inner figure.** If the outer rectangle is L by W and the park is l by w, the area of the path is **LW − lw**." },
      { t: "dia", id: "area_path" },
      ex("A park EFGH is 30 m long and 20 m wide. The outer rectangle ABCD is 40 m long and 28 m wide. Find the area of the path.",
        ["Given: outer 40 m by 28 m, inner 30 m by 20 m", "Area of ABCD = 40 × 28 = 1120 m^{2}", "Area of EFGH = 30 × 20 = 600 m^{2}", "Area of path = 1120 − 600 = 520 m^{2}"], "520 m^{2}"),
      { t: "h", s: "If only the widths of the path are given" },
      { t: "ul", items: [
        "The width of the path alone is **not enough**: the park's length and width are also needed.",
        "For a park l by w with path widths p and q (left and right) and r and s (bottom and top): **area of path = (l + p + q)(w + r + s) − lw**.",
        "**Moving** the outer rectangle while the park stays inside does **not** change the area of the path, because both rectangles keep the same size.",
      ] },
      ex("A park is 20 m by 12 m. A path 2 m wide runs all around it outside. Find the area of the path.",
        ["Given: l = 20 m, w = 12 m, path width 2 m on every side", "Outer rectangle = (20 + 4) × (12 + 4) = 24 × 16 = 384 m^{2}", "Park = 20 × 12 = 240 m^{2}", "Area of path = 384 − 240 = 144 m^{2}"], "144 m^{2}"),
    ],
  },
  {
    id: "r5", category: "Paths", title: "Area of a Crosspath", heading: "Two Paths Crossing in the Middle",
    sub: "The middle square must be counted only once.",
    blocks: [
      { t: "p", s: "A **crosspath** is made of two paths crossing each other through the middle of a plot." },
      { t: "dia", id: "area_cross" },
      { t: "eq", lines: ["Area of crosspath = 12 × p + 14 × q − p × q"] },
      { t: "key", title: "Why subtract p × q?", s: "The small rectangle where the paths cross belongs to **both** paths, so it gets counted **twice**. It must be **subtracted once**." },
      ex("A 14 m by 12 m plot has a crosspath. The path running along the 12 m direction is 2 m wide (p) and the path along the 14 m direction is 1.5 m wide (q). Find its area.",
        ["Given: p = 2 m, q = 1.5 m", "Area = 12 × 2 + 14 × 1.5 − 2 × 1.5", "= 24 + 21 − 3", "= 42 m^{2}"], "42 m^{2}"),
      more("In the same plot, how much land is left for grass?", ["Plot = 14 × 12 = 168 m^{2}", "Grass = 168 − 42 = 126 m^{2}", "Check: (14 − 2) × (12 − 1.5) = 12 × 10.5 = 126 m^{2}"], "126 m^{2}"),
    ],
  },
  {
    id: "r6", category: "Paths", title: "The Spiral Tube", heading: "Straighten the Tube",
    sub: "A bent strip of width 1.",
    blocks: [
      { t: "p", s: "A bent tube of width 1 can be cut at each corner and **straightened**." },
      { t: "dia", id: "area_ltube" },
      { t: "p", s: "An L-shaped tube with outer arms 5 and 5 has area 5 + 5 − 1 = **9**, because the corner square is counted in **both** arms. So it matches a straight tube of length 9 and width 1." },
      { t: "dia", id: "area_spiral" },
      ex("Find the area of the spiral tube of width 1, whose straight pieces have outer lengths 20, 20, 20, 15, 15, 10, 10, 5 and 5.",
        ["Sum of the outer lengths = 20 + 20 + 20 + 15 + 15 + 10 + 10 + 5 + 5 = 120", "There are 9 pieces and 8 corners; each corner square is counted twice", "Area = 120 − 8 × 1 = 112 square units", "A straight tube of width 1 with the same area must be 112 units long"], "112 square units"),
    ],
  },
  {
    id: "r7", category: "Rectangles", title: "Doubling a Side and a Square with a Hole", heading: "What Happens When Sizes Change",
    sub: "Four times the area, and a clever rearrangement.",
    blocks: [
      { t: "ul", items: [
        "When **every side is doubled**, every length inside the figure also doubles.",
        "Each region then becomes 2 × 2 = **4 times** as big.",
        "So the **increase** in the area of each region is **3 times** its old area.",
      ] },
      { t: "dia", id: "area_double" },
      more("A square of side 6 cm is cut into regions, one of which has area 9 cm^{2}. The side of the square is doubled. Find the new area of that region and the increase.",
        ["Every area becomes 2 × 2 = 4 times", "New area = 4 × 9 = 36 cm^{2}", "Increase = 36 − 9 = 27 cm^{2}"], "36 cm^{2}, an increase of 27 cm^{2}"),
      { t: "h", s: "Square with a hole" },
      { t: "dia", id: "area_hole" },
      { t: "act", title: "Make a bigger square from the same pieces",
        steps: ["Take a cardboard square and draw two perpendicular lines through its centre, tilted to the sides.", "Cut along the lines to get 4 equal pieces.", "Slide the pieces and turn them so that the old sides come to the inside."],
        see: ["A **bigger square** appears, with a small **square hole** in the middle."],
        why: ["The total area of the 4 pieces stays the same. Only the outline becomes bigger, and the extra space is the hole."] },
    ],
  },
];
