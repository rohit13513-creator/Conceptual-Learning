import type { CTopic } from "./carbonNotesTypes";
import { ex, more } from "./areaNotesA";

// Class VIII Maths, Area. Topics 20 to 23: the trapezium, areas in real life and the revision mind map. Same writing rules as areaNotesA.

export const AREA_D: CTopic[] = [
  {
    id: "z1", category: "Trapezium", title: "Area of a Trapezium: the Proof", heading: "A Rectangle and Two Triangles",
    sub: "Also for a slanting trapezium.",
    blocks: [
      { t: "ul", items: [
        "A **trapezium** is a quadrilateral with **at least one pair of parallel sides**.",
        "Its **height** is the perpendicular distance between the parallel sides.",
      ] },
      { t: "dia", id: "area_trap" },
      { t: "p", s: "**Given:** trapezium WXYZ with WX ∥ ZY, WX = a, ZY = b and height h. **To prove:** Area = [1|2] × h × (a + b)." },
      { t: "ol", items: [
        "Draw WM ⊥ ZY and XN ⊥ ZY.",
        "∠MWX = ∠NXW = 90° (WX ∥ ZY, co-interior angles add to 180°), so WXNM is a rectangle.",
        "Let MZ = x and NY = y. Then WM = XN = h and MN = a.",
        "Area = △WMZ + rectangle WXNM + △XNY = [1|2] hx + ha + [1|2] hy.",
        "Taking half of h common: Area = [1|2] h (x + y + 2a).",
        "b = x + a + y, so x + y = b − a.",
        "Area = [1|2] h (b − a + 2a) = [1|2] h (a + b).",
      ] },
      { t: "eq", lines: ["Area of a trapezium = [1|2] × height × (sum of the parallel sides)"] },
      { t: "h", s: "When the height falls outside" },
      { t: "dia", id: "area_trap_slant" },
      { t: "ul", items: [
        "**Approach 1:** Area ABCD = Area ABED + Area △BEC, where Area ABED = Area ABEF − Area △AFD.",
        "**Approach 2:** draw BG ∥ AD. Area ABCD = parallelogram ABGD + △BGC = h × a + [1|2] × h × (b − a) = [1|2] h (a + b).",
        "Approach 2 works for **every** trapezium, because a line through B parallel to AD can always be drawn.",
      ] },
      { t: "h", s: "Another proof: two copies" },
      { t: "dia", id: "area_trap_two" },
      { t: "ol", items: [
        "Take two copies of the trapezium and turn the second copy upside down.",
        "Join them along BC. The angles x and y at B add to 180° (AB ∥ CD), so ABD′ is a straight line, and so is DCA′.",
        "The other two angles u and v also add to 180°, so the new figure AD′A′D is a **parallelogram**.",
        "Its base is a + b and its height is h, so its area is h (a + b).",
        "The trapezium is **half** of it: Area = [1|2] h (a + b).",
      ] },
    ],
  },
  {
    id: "z2", category: "Trapezium", title: "Trapezium Problems", heading: "Using the Formula",
    sub: "Four figures from the textbook.",
    blocks: [
      { t: "dia", id: "area_trap_figs" },
      ex("Figure (i): the parallel sides are 10 ft and 7 ft, and they are 16 ft apart. Find the area.", ["Area = [1|2] × 16 × (10 + 7)", "= 8 × 17 = 136 ft^{2}"], "136 ft^{2}"),
      ex("Figure (ii): the parallel sides are 24 m and 36 m and the height is 14 m. Find the area.", ["Area = [1|2] × 14 × (24 + 36)", "= 7 × 60 = 420 m^{2}"], "420 m^{2}"),
      ex("Figure (iii): the parallel sides are 14 in and 6 in and they are 10 in apart. Find the area.", ["Area = [1|2] × 10 × (14 + 6)", "= 5 × 20 = 100 in^{2}"], "100 in^{2}"),
      ex("Figure (iv): the parallel sides are 12 ft and 18 ft and the height is 8 ft. Find the area.", ["Area = [1|2] × 8 × (12 + 18)", "= 4 × 30 = 120 ft^{2}"], "120 ft^{2}"),
      more("A trapezium has area 90 cm^{2}, height 9 cm and one parallel side 8 cm. Find the other parallel side.", ["[1|2] × 9 × (8 + b) = 90", "8 + b = 20", "b = 20 − 8 = 12"], "12 cm"),
    ],
  },
  {
    id: "z3", category: "Trapezium", title: "Trapezium Dissections and Puzzles", heading: "Cutting and Comparing",
    sub: "Rectangles, hexagons and a neat proof.",
    blocks: [
      ex("Give a method to change an isosceles trapezium into a rectangle by dissection.",
        ["Draw the heights from the ends of the shorter parallel side a; they cut the trapezium into a rectangle (a by h) and two equal right triangles", "Join the two right triangles along their slant sides: they form a rectangle of width half of (b − a) and height h", "Place this small rectangle beside the middle one"], "A rectangle with length half of (a + b) and width h"),
      { t: "dia", id: "area_trap_rect" },
      ex("Trapezium ABCD is changed into the rectangle EFGH of equal area. How are E, F, G and H found?",
        ["Mark I and J, the midpoints of the slant sides AD and BC", "Draw a line through I perpendicular to the parallel sides; it meets them at H (on AB extended) and G (on DC)", "Do the same through J to get E and F", "△AHI ≅ △DGI and △BEJ ≅ △CFJ (ASA), so the cut pieces fill the gaps exactly"], "EFGH is the rectangle: length = half of (AB + DC), height = height of the trapezium"),
      ex("Construct a trapezium of area 144 cm^{2}.",
        ["Area = [1|2] × h × (a + b) = 144", "Choose h = 12 cm: 6 × (a + b) = 144, so a + b = 24 cm", "Take parallel sides 10 cm and 14 cm, 12 cm apart (many other answers are possible)"], "For example: sides 10 cm and 14 cm, height 12 cm"),
      { t: "dia", id: "area_hexagon" },
      ex("A regular hexagon is divided into a trapezium (T), an equilateral triangle (E) and a rhombus (R). Find the ratio of their areas.",
        ["Joining the centre to all the vertices gives 6 equal equilateral triangles", "T has 3 of them, E has 1 and R has 2"], "T : E : R = 3 : 1 : 2"),
      { t: "dia", id: "area_trap_zwb" },
      ex("ZYXW is a trapezium with ZY ∥ WX. A is the midpoint of XY, and ZA extended meets WX extended at B. Show that the area of ZYXW equals the area of △ZWB.",
        ["In △AYZ and △AXB: AY = AX (A is the midpoint)", "∠YAZ = ∠XAB (vertically opposite angles)", "∠AYZ = ∠AXB (alternate angles, ZY ∥ WB)", "So △AYZ ≅ △AXB (ASA), and their areas are equal", "Area ZYXW = Area ZAXW + △AYZ = Area ZAXW + △AXB"], "Area ZYXW = Area (△ZWB)"),
    ],
  },
  {
    id: "z4", category: "Real life", title: "Areas in Real Life", heading: "Inches, Feet, Acres and More",
    sub: "Changing from one unit to another.",
    blocks: [
      { t: "ul", items: [
        "An A​4 sheet is 21 cm by 29.7 cm, so its area is 21 × 29.7 = **623.7 cm^{2}**.",
        "Furniture sizes are often given in inches (in) and feet (ft).",
        "Classrooms and houses are measured in ft^{2} or m^{2}, farms in **acres** and cities in km^{2}.",
        "Local units of land area in India include bigha, gaj, katha, dhur, cent and ankanam.",
      ] },
      { t: "table", head: ["Unit", "Value"], rows: [
        ["1 inch (in)", "2.54 cm"], ["1 foot (ft)", "12 in"], ["1 in^{2}", "2.54 × 2.54 = 6.4516 cm^{2}"], ["1 ft^{2}", "12 × 12 = 144 in^{2}"], ["1 m^{2}", "100 × 100 = 10,000 cm^{2}"], ["1 km^{2}", "1000 × 1000 = 10,00,000 m^{2}"], ["1 acre", "43,560 ft^{2}"],
      ] },
      { t: "dia", id: "area_inch" },
      { t: "note", title: "A common mistake", s: "**Length** converts with 2.54, but **area** converts with 2.54 × 2.54. Square the conversion number for areas." },
      ex("Express (i) 5 in and (ii) 7.4 in in centimetres.", ["1 in = 2.54 cm", "(i) 5 × 2.54 = 12.7 cm", "(ii) 7.4 × 2.54 = 18.796 cm"], "12.7 cm and 18.796 cm"),
      ex("Express (i) 5.08 cm and (ii) 11.43 cm in inches.", ["Divide by 2.54", "(i) 5.08 ÷ 2.54 = 2 in", "(ii) 11.43 ÷ 2.54 = 4.5 in"], "2 in and 4.5 in"),
      ex("Convert (i) 10 in^{2} to cm^{2} and (ii) 161.29 cm^{2} to in^{2}.", ["1 in^{2} = 6.4516 cm^{2}", "(i) 10 × 6.4516 = 64.516 cm^{2}", "(ii) 161.29 ÷ 6.4516 = 25 in^{2}"], "64.516 cm^{2} and 25 in^{2}"),
      ex("A tabletop is 4 ft by 2.5 ft. Find its area in ft^{2} and in in^{2}.", ["Area = 4 × 2.5 = 10 ft^{2}", "1 ft^{2} = 144 in^{2}", "10 ft^{2} = 10 × 144 = 1440 in^{2}"], "10 ft^{2} = 1440 in^{2}"),
    ],
  },
  {
    id: "z5", category: "Revision", title: "Revision: Mind Map and Formulas", heading: "Revision: The Whole Chapter",
    sub: "The mind map, the formulas and the points to remember.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "Summary of formulas" },
      { t: "table", head: ["Figure", "Area"], rows: [
        ["Rectangle", "length × width"], ["Square", "side × side"], ["Triangle", "[1|2] × base × height"], ["Parallelogram", "base × height"], ["Rhombus", "[1|2] × product of the diagonals"], ["Trapezium", "[1|2] × height × sum of the parallel sides"], ["Any polygon", "sum of the areas of its triangles"],
      ] },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "The **height** is always **perpendicular** to the chosen base.",
        "A **diagonal** halves a rectangle; a **median** halves a triangle.",
        "Same base and same height means **same area**, even if the perimeters differ.",
        "When every length is doubled, the area becomes **4 times**.",
        "Write areas in **square** units, and change all lengths to the **same unit** before multiplying.",
      ] },
    ],
  },
];
