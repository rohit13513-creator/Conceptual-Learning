import type { CTopic } from "./carbonNotesTypes";
import { ex, more } from "./areaNotesA";

// Class VIII Maths, Area. Competition Corner: the teacher's formulas, path formulas, key facts, units and examples 47 to 62, followed by
// Pick's theorem, ratios of areas and a practice set. A step beyond the textbook. Same writing rules as areaNotesA.

export const AREA_E: CTopic[] = [
  {
    id: "q1", category: "Competition Corner", title: "Useful Formulas", heading: "Competition Corner: Formulas Worth Knowing",
    sub: "Often used in Olympiad and scholarship exams.",
    blocks: [
      { t: "note", title: "Competition Corner", s: "These results go a step beyond the textbook. First be sure of the textbook topics, then try these." },
      { t: "table", head: ["Figure", "Formula"], rows: [
        ["Equilateral triangle of side a", "height = [√3|2] a,  area = [√3|4] a^{2}"],
        ["Any triangle (Heron's formula)", "s = [a + b + c|2],  area = √(s(s − a)(s − b)(s − c))"],
        ["Kite, or any quadrilateral with perpendicular diagonals", "[1|2] × d_{1} × d_{2}"],
        ["Quadrilateral with diagonal d and offsets h_{1}, h_{2}", "[1|2] × d × (h_{1} + h_{2})"],
        ["Regular hexagon of side a", "6 × [√3|4] a^{2} = [3√3|2] a^{2}"],
        ["Right triangle with legs p and q", "[1|2] × p × q"],
        ["Rhombus with side a and one diagonal d_{1}", "half of d_{2} = √(a^{2} − [d_{1}|2] × [d_{1}|2])"],
      ] },
      { t: "dia", id: "area_kite" },
      ex("Find the area of an equilateral triangle of side 8 cm (√3 ≈ 1.732).", ["Area = [√3|4] × 8 × 8 = 16√3", "16 × 1.732 ≈ 27.71 cm^{2}"], "About 27.71 cm^{2}"),
      ex("Find the area of a triangle with sides 13 cm, 14 cm and 15 cm.", ["s = (13 + 14 + 15) ÷ 2 = 21", "Area = √(21 × 8 × 7 × 6) = √7056", "= 84 cm^{2}"], "84 cm^{2}"),
      ex("The side of a rhombus is 10 cm and one diagonal is 12 cm. Find its area.", ["Half of the given diagonal = 6 cm", "Half of the other diagonal = √(100 − 36) = √64 = 8 cm, so the diagonal is 16 cm", "Area = [1|2] × 12 × 16 = 96 cm^{2}"], "96 cm^{2}"),
    ],
  },
  {
    id: "q2", category: "Competition Corner", title: "Paths and Roads", heading: "Competition Corner: Three Path Formulas",
    sub: "Outside, inside and crossing.",
    blocks: [
      { t: "p", s: "For a rectangle l by b and a path of width w:" },
      { t: "eq", lines: ["Path outside:  (l + 2w)(b + 2w) − lb", "Path inside:  lb − (l − 2w)(b − 2w)", "Two crossroads through the middle:  w(l + b) − w^{2}"] },
      { t: "dia", id: "area_path_in_out" },
      ex("A field 60 m by 40 m has two crossroads, each 5 m wide, through its middle, parallel to the sides. Find the area of the roads and the cost of paving them at ₹50 per m^{2}.",
        ["Area = w(l + b) − w^{2} = 5 × (60 + 40) − 25 = 475 m^{2}", "Cost = 475 × 50 = ₹23750"], "475 m^{2}, cost ₹23,750"),
      ex("A garden 30 m by 20 m has a 2.5 m wide path inside along its boundary. Find the area of the path.",
        ["Inner rectangle = (30 − 5) × (20 − 5) = 25 × 15 = 375 m^{2}", "Garden = 30 × 20 = 600 m^{2}", "Path = 600 − 375 = 225 m^{2}"], "225 m^{2}"),
      more("A path of equal width runs outside a square lawn of side 20 m. The area of the path is 176 m^{2}. Find its width.",
        ["Outer square area = 400 + 176 = 576 m^{2}", "Outer side = √576 = 24 m", "Width = (24 − 20) ÷ 2 = 2 m"], "2 m"),
    ],
  },
  {
    id: "q3", category: "Competition Corner", title: "Key Area Facts", heading: "Competition Corner: Facts that Save Time",
    sub: "Medians, midpoints and scaling.",
    blocks: [
      { t: "ol", items: [
        "A **median** divides a triangle into two equal areas.",
        "The three medians meet at the **centroid** G and divide the triangle into **6 equal areas**.",
        "The triangle formed by joining the **midpoints** of the sides has [1|4] of the area.",
        "Triangles on the **same base** and between the **same parallels** have equal areas.",
        "A triangle and a parallelogram on the same base and between the same parallels: **triangle = half the parallelogram**.",
        "If every length is multiplied by k, the area is multiplied by **k × k**.",
        "Among all rectangles with the same perimeter, the **square** has the largest area.",
        "The diagonals of a **parallelogram** divide it into 4 triangles of equal area.",
      ] },
      { t: "dia", id: "area_centroid" },
      ex("If each side of a square is increased by 20%, by what percent does its area increase?", ["New side = 1.2 a, so the new area is 1.2 × 1.2 = 1.44 times", "Increase = 0.44 of the old area"], "The area increases by 44%"),
      ex("The parallel sides of a trapezium are in the ratio 2 : 3, its height is 8 cm and its area is 120 cm^{2}. Find the parallel sides.",
        ["Let the sides be 2x and 3x", "[1|2] × 8 × 5x = 120, so 20x = 120 and x = 6", "Sides are 2 × 6 = 12 cm and 3 × 6 = 18 cm"], "12 cm and 18 cm"),
      ex("A rectangle and a square have the same perimeter of 40 cm. The rectangle is 12 cm long. Which has the larger area, and by how much?",
        ["Rectangle width = 20 − 12 = 8 cm, area = 12 × 8 = 96 cm^{2}", "Square side = 40 ÷ 4 = 10 cm, area = 100 cm^{2}"], "The square, by 4 cm^{2}"),
      ex("In △ABC, D is the midpoint of BC and E is the midpoint of AD. If Area (△ABC) = 48 cm^{2}, find Area (△BED).",
        ["AD is a median, so Area (△ABD) = 48 ÷ 2 = 24 cm^{2}", "BE is a median of △ABD, so Area (△BED) = 24 ÷ 2 = 12 cm^{2}"], "12 cm^{2}"),
    ],
  },
  {
    id: "q4", category: "Competition Corner", title: "Land Units and Mixed Problems", heading: "Competition Corner: Hectares, Tiles and Plots",
    sub: "Land and map problems.",
    blocks: [
      { t: "table", head: ["Unit", "Value"], rows: [["1 are", "100 m^{2}"], ["1 hectare", "10,000 m^{2} = 100 ares"], ["1 km^{2}", "100 hectares"], ["1 acre", "about 4047 m^{2}, or 0.4047 hectare"]] },
      ex("Find the area of a regular hexagon of side 6 cm (√3 ≈ 1.732).", ["Area = [3√3|2] × 6 × 6 = 54√3", "54 × 1.732 ≈ 93.53 cm^{2}"], "About 93.53 cm^{2}"),
      ex("How many square tiles of side 25 cm are needed to cover a floor 5 m by 4 m?", ["Floor area = 500 × 400 = 2,00,000 cm^{2}", "Area of one tile = 25 × 25 = 625 cm^{2}", "Number of tiles = 2,00,000 ÷ 625 = 320"], "320 tiles"),
      ex("A parallelogram has sides 12 cm and 8 cm. The height on the 12 cm side is 6 cm. Find the height on the 8 cm side.", ["Area = 12 × 6 = 72 cm^{2}", "Height on the 8 cm side = 72 ÷ 8 = 9 cm"], "9 cm"),
      ex("The diagonals of a kite are 16 cm and 10 cm. Find its area.", ["Area = [1|2] × d_{1} × d_{2}", "= [1|2] × 16 × 10 = 80 cm^{2}"], "80 cm^{2}"),
      ex("A square and an equilateral triangle have the same perimeter of 24 cm. Find the ratio of their areas (√3 ≈ 1.732).",
        ["Square side = 6 cm, area = 36 cm^{2}", "Triangle side = 8 cm, area = [√3|4] × 64 = 16√3 ≈ 27.71 cm^{2}", "Ratio = 36 : 27.71"], "About 1.3 : 1, the square is larger"),
      ex("A farmer's field is 1.5 hectares. How many plots of 25 m by 20 m can it be divided into?", ["1.5 hectares = 1.5 × 10000 = 15000 m^{2}", "Area of one plot = 25 × 20 = 500 m^{2}", "Number of plots = 15000 ÷ 500 = 30"], "30 plots"),
      ex("The area of a triangle is 36 cm^{2} and its base is 12 cm. If the base is doubled and the height is halved, find the new area.",
        ["Height = 2 × 36 ÷ 12 = 6 cm", "New base 24 cm, new height 3 cm", "New area = [1|2] × 24 × 3 = 36 cm^{2}"], "36 cm^{2} (unchanged)"),
    ],
  },
  {
    id: "q5", category: "Competition Corner", title: "Area on a Dot Grid: Pick's Theorem", heading: "Competition Corner: Count Dots to Find Area",
    sub: "For a polygon whose corners are all on grid points.",
    blocks: [
      { t: "key", title: "Pick's theorem", s: "For a polygon with all its corners on the dots of a square grid: **Area = i + [b|2] − 1**, where **i** is the number of dots inside and **b** is the number of dots on the boundary. The dots are 1 unit apart." },
      { t: "dia", id: "area_pick" },
      ex("A polygon on a dot grid has 5 dots inside and 8 dots on its boundary. Find its area.", ["Area = i + [b|2] − 1", "= 5 + 4 − 1 = 8"], "8 square units"),
      ex("A rectangle of length 4 and width 3 is drawn on a dot grid. Check Pick's theorem.", ["Boundary dots = perimeter = 14", "Inside dots = 3 × 2 = 6", "Area = 6 + 7 − 1 = 12, and length × width = 12"], "Both give 12 square units"),
      ex("A polygon on a dot grid has area 10 square units and 8 boundary dots. How many dots are inside?", ["10 = i + 4 − 1", "i = 10 − 3 = 7"], "7 dots"),
    ],
  },
  {
    id: "q6", category: "Competition Corner", title: "Ratios of Areas", heading: "Competition Corner: Compare without Finding Areas",
    sub: "Same height, or same base.",
    blocks: [
      { t: "ul", items: [
        "Triangles with the **same height** have areas in the ratio of their **bases**.",
        "Triangles with the **same base** have areas in the ratio of their **heights**.",
        "If D divides BC so that BD : DC = m : n, then Area (△ABD) : Area (△ADC) = m : n.",
      ] },
      ex("D is on BC with BD : DC = 2 : 3 and Area (△ABC) = 75 cm^{2}. Find Area (△ABD).", ["The two triangles have the same height", "Area (△ABD) = [2|5] × 75 = 30 cm^{2}"], "30 cm^{2}"),
      ex("E is any point inside the side AB of a parallelogram ABCD of area 40 cm^{2}. Find Area (△CDE) and the sum of the other two triangles.", ["△CDE has the same base and height as the parallelogram, so it is half: 20 cm^{2}", "The other two triangles make the rest: 40 − 20 = 20 cm^{2}"], "20 cm^{2} and 20 cm^{2}"),
      ex("The area of a rectangle stays the same when its length is increased by 25%. By what percent must its width be decreased?", ["New length = [5|4] of the old, so new width = [4|5] of the old", "Decrease = [1|5] = 20%"], "20%"),
    ],
  },
  {
    id: "q7", category: "Competition Corner", title: "Practice: Challenge Questions", heading: "Competition Corner: Practise Like a Champion",
    sub: "Ten sharp questions with answers, and the common traps.",
    blocks: [
      { t: "qa", title: "Challenge yourself", items: [
        ["The diagonals of a rhombus are in the ratio 3 : 4 and its area is 96 cm^{2}. Find the diagonals.", "[1|2] × 3k × 4k = 96 gives k = 4: **12 cm and 16 cm**."],
        ["A square has diagonal 10 cm. Find its area.", "A square is a rhombus: [1|2] × 10 × 10 = **50 cm^{2}**."],
        ["Find the area of a right triangle with hypotenuse 25 cm and one side 7 cm.", "Other side 24 cm, area = [1|2] × 7 × 24 = **84 cm^{2}**."],
        ["The length of a rectangle is increased by 10% and its width is decreased by 10%. How does the area change?", "1.1 × 0.9 = 0.99, a **1% decrease**."],
        ["A wire bent as a square of side 11 cm is reshaped into a rectangle of length 15 cm. Find the change in area.", "Width = 22 − 15 = 7, area 105 against 121: **16 cm^{2} less**."],
        ["The parallel sides of a trapezium differ by 4 cm, its height is 5 cm and its area is 60 cm^{2}. Find them.", "a + b = 24 and b − a = 4: **10 cm and 14 cm**."],
        ["Find the area of the triangle with sides 6 cm, 8 cm and 10 cm.", "It is right-angled: [1|2] × 6 × 8 = **24 cm^{2}**."],
        ["A rectangle 12 m by 9 m has a diagonal. Find the area of each triangle.", "Half of 108: **54 m^{2}**."],
        ["The midpoints of the sides of a rectangle 14 cm by 8 cm are joined. Find the area of the figure formed.", "It is a rhombus with diagonals 14 and 8: **56 cm^{2}**, half the rectangle."],
        ["A floor of area 36 m^{2} is covered with tiles 30 cm by 20 cm. How many tiles are needed?", "36 m^{2} = 3,60,000 cm^{2}; each tile 600 cm^{2}: **600 tiles**."],
      ] },
      { t: "table", head: ["Common trap", "The truth"], rows: [
        ["The slant side is the height", "The height is the **perpendicular** distance to the base"],
        ["Bigger perimeter means bigger area", "No: perimeter does **not** measure area"],
        ["Doubling the side doubles the area", "It makes the area **4 times**"],
        ["1 m^{2} = 100 cm^{2}", "1 m^{2} = 100 × 100 = **10,000 cm^{2}**"],
        ["Area of a rhombus is the product of the diagonals", "It is **half** the product"],
        ["In a trapezium, multiply all the sides", "Only the two **parallel** sides are added"],
      ] },
    ],
  },
];
