import type { CTopic } from "./carbonNotesTypes";
import { ex, more } from "./areaNotesA";

// Class VIII Maths, Area. Topics 8 to 14: triangles (inside a rectangle, the formula and its proofs, heights, medians, parallel lines,
// least perimeter, and the Sulba-Sutra shape changing problems). Same writing rules as areaNotesA.

export const AREA_B: CTopic[] = [
  {
    id: "t1", category: "Triangles", title: "Triangles Inside a Rectangle", heading: "Half of the Rectangle",
    sub: "Wherever the third vertex lies on the opposite side.",
    blocks: [
      { t: "ul", items: [
        "Take a triangle whose base is the side DC of a rectangle ABCD and whose third vertex X lies on AB.",
        "Dropping a **perpendicular** from X to DC splits the rectangle into two smaller rectangles.",
        "The triangle takes exactly **half of each** small rectangle.",
      ] },
      { t: "dia", id: "area_half" },
      { t: "key", title: "Result", s: "**△XDC is always half the rectangle**, wherever X lies on AB. If two rectangles are identical, △XDC and △YDC have equal area. A triangle △YBC, with base BC and Y on the opposite side AD, is also half, so it has the same area." },
      ex("ABCD is a rectangle with AD = 4 and DC = 5, and X lies on AB. Find the area of △XDC.", ["Area of rectangle ABCD = 5 × 4 = 20 square units", "△XDC is half the rectangle", "Area of △XDC = 20 ÷ 2 = 10 square units"], "10 square units"),
    ],
  },
  {
    id: "t2", category: "Triangles", title: "The Area Formula and Its Proof", heading: "Half of Base Times Height",
    sub: "Proof for acute and obtuse triangles.",
    blocks: [
      { t: "ul", items: [
        "The **height (altitude)** of a triangle is the **perpendicular** distance from a vertex to the opposite side, which is called the **base**.",
        "**Any side** can be the base; the height must be the perpendicular drawn **to that side**.",
      ] },
      { t: "eq", lines: ["Area of a triangle = [1|2] × base × height"] },
      { t: "dia", id: "area_formula" },
      { t: "h", s: "Proof for an acute triangle" },
      { t: "p", s: "**Given:** △ABC with base BC and altitude AX. **To prove:** Area (△ABC) = [1|2] × BC × AX." },
      { t: "ol", items: [
        "Draw a line through A parallel to BC, and perpendiculars at B and C to meet it at E and D.",
        "BCDE is a rectangle with sides BC and BE = AX (all its angles are right angles).",
        "AX splits BCDE into the rectangles BXAE and XCDA (AX ⊥ BC).",
        "AB is a diagonal of BXAE, so △ABX = [1|2] × area of BXAE.",
        "AC is a diagonal of XCDA, so △ACX = [1|2] × area of XCDA.",
        "Adding: △ABC = [1|2] × area of BCDE = [1|2] × BC × AX.",
      ] },
      { t: "h", s: "Proof for an obtuse triangle" },
      { t: "p", s: "**Given:** △ABC with ∠B obtuse; the altitude AD falls outside, on CB extended, and AD = h. **To prove:** Area (△ABC) = [1|2] × BC × h." },
      { t: "ol", items: [
        "△ADC and △ADB are right triangles, so the formula holds for each (each fits in its own rectangle).",
        "Area (△ADC) = [1|2] × h × DC and Area (△ADB) = [1|2] × h × DB.",
        "△ABC = △ADC − △ADB (△ADB is the extra part).",
        "Area (△ABC) = [1|2] × h × DC − [1|2] × h × DB = [1|2] × h × (DC − DB).",
        "B lies between D and C, so DC − DB = BC.",
      ] },
      { t: "key", title: "Result", s: "Area (△ABC) = [1|2] × BC × h, so the formula holds for **every** triangle." },
      more("The base of an obtuse triangle is 7 cm and its height, falling outside the triangle, is 6 cm. Find the area.", ["Area = [1|2] × base × height", "= [1|2] × 7 × 6 = 21 cm^{2}"], "21 cm^{2}"),
    ],
  },
  {
    id: "t3", category: "Triangles", title: "Finding Areas and Heights", heading: "Using the Formula Both Ways",
    sub: "The area is the same whichever side is the base.",
    blocks: [
      { t: "key", title: "One area, two ways", s: "The area of a triangle is the same whichever side is taken as the base: **[1|2] × base_{1} × height_{1} = [1|2] × base_{2} × height_{2}**. This helps to find an unknown height." },
      { t: "dia", id: "area_heights" },
      ex("In △ABC, BC = 5, AX = 3 (AX ⊥ BC) and AC = 4. Find the altitude BY drawn to AC.",
        ["Area (△ABC) = [1|2] × BC × AX = [1|2] × 5 × 3 = 7.5 square units", "Also, Area = [1|2] × AC × BY = [1|2] × 4 × BY = 2 BY", "2 BY = 7.5", "BY = 7.5 ÷ 2 = 3.75"], "BY = 3.75 units"),
      { t: "dia", id: "area_three" },
      ex("Figure (i): find the area of △ABC with base BC = 4 cm and height AE = 3 cm.", ["Area = [1|2] × base × height", "= [1|2] × 4 × 3 = 6 cm^{2}"], "6 cm^{2}"),
      ex("Figure (ii): in △DEF, EF = 5 cm and the altitude DN to EF is 3.2 cm. Find its area.", ["Area = [1|2] × EF × DN", "= [1|2] × 5 × 3.2 = 8 cm^{2}"], "8 cm^{2}"),
      ex("Figure (iii): △NAT is right-angled at A with AT = 3 cm and AN = 4 cm. Find its area.", ["In a right triangle, one arm is the base and the other is the height", "Area = [1|2] × 3 × 4 = 6 cm^{2}"], "6 cm^{2}"),
      { t: "dia", id: "area_obtuse_by" },
      ex("In the figure, BC = 6 units, the altitude AX from A to CB extended is 4 units and AC = 8 units. Find the altitude BY.",
        ["Given: BC = 6, AX = 4, AC = 8", "Area (△ABC) = [1|2] × 6 × 4 = 12 square units", "Also, Area = [1|2] × AC × BY = [1|2] × 8 × BY = 4 BY", "4 BY = 12, so BY = 12 ÷ 4 = 3"], "BY = 3 units"),
      { t: "dia", id: "area_isosceles" },
      ex("△SUB is isosceles with SU = SB, SE ⊥ UB, and the area of △SEB is 24 sq. units. Find the area of △SUB.",
        ["In an isosceles triangle, the perpendicular SE **bisects** the base, so UE = EB", "△SEU and △SEB have equal bases and the same height SE, so their areas are equal", "Area (△SUB) = 24 + 24 = 48 sq. units"], "48 sq. units"),
    ],
  },
  {
    id: "t4", category: "Triangles", title: "The Median and Equal Areas", heading: "A Median Halves a Triangle",
    sub: "Also, the four triangles made by the diagonals of a rectangle.",
    blocks: [
      { t: "p", s: "A **median** is the line joining a vertex of a triangle to the **midpoint** of the opposite side." },
      { t: "dia", id: "area_diagonals" },
      { t: "ul", items: [
        "The diagonals of a rectangle cut it into 4 triangles 1, 2, 3 and 4. They are **not all congruent**.",
        "Triangles 1 and 2 have bases OD and OB, and the **same height** AX from A to BD.",
        "OB = OD, because the diagonals of a rectangle **bisect each other**.",
        "So triangles 1 and 2 have equal areas. In the same way **all 4 have equal areas**, each [1|4] of the rectangle.",
      ] },
      { t: "h", s: "The general statement" },
      { t: "dia", id: "area_median" },
      { t: "p", s: "**Given:** △ABC with M the midpoint of BC. **To prove:** Area (△ABM) = Area (△AMC)." },
      { t: "ol", items: [
        "Draw AD ⊥ BC.",
        "AD is the height of both △ABM and △AMC (same vertex A, bases on the same line BC).",
        "BM = MC, as M is the midpoint.",
        "Area (△ABM) = [1|2] × BM × AD and Area (△AMC) = [1|2] × MC × AD.",
      ] },
      { t: "key", title: "Result", s: "Both areas are equal, so **a median divides a triangle into two triangles of equal area**." },
      more("AM is a median of △ABC and Area (△ABC) = 30 cm^{2}. Find Area (△ABM).", ["A median halves the area", "Area (△ABM) = 30 ÷ 2 = 15 cm^{2}"], "15 cm^{2}"),
    ],
  },
  {
    id: "t5", category: "Triangles", title: "Triangles Between Parallel Lines", heading: "Same Base, Same Height, Same Area",
    sub: "The third vertex slides along a parallel line.",
    blocks: [
      { t: "dia", id: "area_parallels" },
      { t: "ul", items: [
        "Let the line l be **parallel** to BC, and take triangles with base BC and third vertex A **anywhere** on l.",
        "All these triangles have the same base BC and the same height (the distance between l and BC).",
        "So **all of them have the same area**; none has a larger or smaller area than the others.",
        "Their **perimeters are different**. As A moves far along l, the sides AB and AC become very long, so there is **no maximum** perimeter.",
      ] },
      more("BC = 8 cm and the line l is 5 cm away from BC. Find the area of any triangle with base BC and third vertex on l.", ["Height = 5 cm for every such triangle", "Area = [1|2] × 8 × 5 = 20 cm^{2}"], "20 cm^{2}, for every position of A"),
    ],
  },
  {
    id: "t6", category: "Triangles", title: "The Least Perimeter: a Mirror Trick", heading: "Which Triangle Has the Smallest Boundary?",
    sub: "Reflect in the parallel line.",
    blocks: [
      { t: "p", s: "BC is common to all the triangles, so only **AB + AC** needs to be the smallest. Treat the line l as a **mirror** and reflect B and C to B′ and C′." },
      { t: "dia", id: "area_mirror" },
      { t: "ol", items: [
        "AB = AB′ and AC = AC′ (a point and its mirror image are at equal distances from every point of the mirror).",
        "So the path B → A → C has the same length as the path B → A → C′, for every A on l.",
        "The **shortest** path from B to C′ is the **straight line** BC′.",
        "So AB + AC is least when A is the point where BC′ cuts l.",
      ] },
      { t: "key", title: "Result", s: "△ABC has the least perimeter when A lies on BC′. Since BB′C′C is a rectangle, BC′ cuts l exactly above the midpoint of BC. So A lies on the **perpendicular bisector** of BC and the least-perimeter triangle is **isosceles** (AB = AC)." },
      { t: "dia", id: "area_river" },
      ex("Gopal walks from his house to the river and then to his water tank. Both are on the same side of the river. Find his shortest path.",
        ["Treat the river bank as a mirror line", "Mark the image of the tank on the other side of the bank, at the same distance", "Join the house to this image with a straight line; it meets the bank at P", "P to the tank equals P to its image, and a straight line is the shortest path"], "Shortest path: house → P → water tank"),
    ],
  },
  {
    id: "t7", category: "Shape changing", title: "Changing One Shape into Another", heading: "Problems from the Śulba-Sūtras",
    sub: "New shape, same area. Also two area puzzles.",
    blocks: [
      { t: "ul", items: [
        "The **Śulba-Sūtras** are ancient Indian texts on building fire altars.",
        "Altars had to have an exact shape and area, so these texts give methods to change one shape into another of **equal area**.",
        "Such problems are also found in Euclid's *Elements*.",
      ] },
      ex("Give a method to change a rectangle into a triangle of equal area.",
        ["Let the rectangle have length l and width w; its area is l × w", "Draw a triangle with base 2l and height w", "Area of triangle = [1|2] × 2l × w = l × w"], "A triangle with base 2l and height w has the same area"),
      ex("Give a method to change a triangle into a rectangle of equal area.",
        ["Let the triangle have base b and height h", "Draw a rectangle with length b and width half of h (or length half of b and width h)", "Area of rectangle = b × [h|2] = [1|2] × b × h"], "The rectangle has the same area as the triangle"),
      { t: "dia", id: "area_squares" },
      ex("ABCD, BCEF and BFGH are identical squares of side s. The red region is △DCH and the blue region is the triangle cut from ABCD by DH. (i) If the red region is 49 sq. units, find the blue region. (ii) If red + blue = 180 sq. units, find the area of each square.",
        ["Red △DCH: base DC = s, height CH = 2s, so red = [1|2] × s × 2s = s^{2}", "DH meets AB at P, the midpoint of AB (DH rises 2s over a width s, so it rises s over half that width)", "Blue △ADP = [1|2] × AD × AP = [1|2] × s × [s|2], which is one quarter of s^{2}", "(i) s^{2} = 49, so blue = 49 ÷ 4 = 12.25 sq. units", "(ii) s^{2} and a quarter of s^{2} make [5|4] of s^{2} = 180, so s^{2} = 180 × 4 ÷ 5 = 144"], "(i) 12.25 sq. units  (ii) 144 sq. units"),
      { t: "dia", id: "area_midtri" },
      ex("M and N are the midpoints of XY and XZ in △XYZ. What fraction of the area of △XYZ is the area of △XMN?",
        ["Join NY", "NY is a median of △XYZ, so Area (△XNY) = half of Area (△XYZ)", "NM is a median of △XNY, so Area (△XMN) = half of Area (△XNY)", "So Area (△XMN) = half of half of Area (△XYZ)"], "Area (△XMN) = [1|4] of Area (△XYZ)"),
    ],
  },
];
