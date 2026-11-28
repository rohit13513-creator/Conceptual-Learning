import type { CTopic } from "./carbonNotesTypes";
import { ex } from "./bpNotesA";

// Class VIII Maths, The Baudhāyana-Pythagoras Theorem. Topics 10 to 17: daily life uses, checking for a right angle, triples, Fermat,
// the problems of the chapter and revision. Same writing rules as bpNotesA.ts.

export const BP_B: CTopic[] = [
  {
    id: "p10", category: "Applications", title: "The Theorem in Daily Life", heading: "Ladders, Walks, Poles and Rectangles",
    sub: "Find the right triangle first.",
    blocks: [
      { t: "key", title: "Method", s: "Draw a rough figure, find the **right angle**, name the **hypotenuse** (opposite the right angle), and then add or subtract squares." },
      { t: "dia", id: "bp_ladder" },
      ex("A 13 m ladder leans against a wall with its foot 5 m from the wall. How high up the wall does it reach?", ["The ladder is the hypotenuse: h^{2} = 13^{2} − 5^{2} = 169 − 25 = 144", "h = 12"], "12 m"),
      ex("A girl walks 8 m east and then 6 m north. How far is she from the start?", ["The two paths are at right angles: d^{2} = 64 + 36 = 100"], "10 m"),
      { t: "dia", id: "bp_poles" },
      ex("Two poles 6 m and 11 m high stand 12 m apart. Find the distance between their tops.", ["The taller pole rises 11 − 6 = 5 m above the horizontal line from the shorter top.", "d^{2} = 12^{2} + 5^{2} = 169"], "13 m"),
      ex("A pole 24 m tall is held by a wire from its top to a point 7 m from its foot. Find the length of the wire.", ["w^{2} = 24^{2} + 7^{2} = 576 + 49 = 625"], "25 m"),
      ex("Find the diagonal of a rectangle of length 15 cm and breadth 8 cm.", ["d^{2} = 225 + 64 = 289"], "17 cm"),
      ex("The diagonal of a TV screen is 50 cm and its width is 40 cm. Find its height.", ["h^{2} = 2500 − 1600 = 900"], "30 cm"),
      ex("Find the distance between the points (1, 2) and (4, 6) on a grid.", ["Across 4 − 1 = 3, up 6 − 2 = 4", "d^{2} = 9 + 16 = 25"], "5 units"),
    ],
  },
  {
    id: "p11", category: "Right angle", title: "Is the Triangle Right-angled?", heading: "Testing for a Right Angle",
    sub: "Check the longest side.",
    blocks: [
      { t: "key", title: "Test", s: "Take the **longest** side as c. If **a^{2} + b^{2} = c^{2}**, the triangle is right-angled (the right angle is opposite c). If not, it is not." },
      ex("Is a triangle with sides 7, 24, 25 right-angled? And 6, 7, 9?", ["7^{2} + 24^{2} = 49 + 576 = 625 = 25^{2}, so yes.", "6^{2} + 7^{2} = 36 + 49 = 85 but 9^{2} = 81, so no."], "Yes; no"),
      ex("Is a triangle with sides 20, 21 and 29 right-angled?", ["The longest side is 29.", "400 + 441 = 841 = 29^{2}"], "Yes"),
      ex("An isosceles triangle has sides 13 cm, 13 cm and base 10 cm. Find its height and area.", ["The height from the top bisects the base: 5 cm and 5 cm.", "h^{2} = 169 − 25 = 144, so h = 12 cm", "Area = [1|2] × 10 × 12 = 60 cm^{2}"], "12 cm and 60 cm^{2}"),
    ],
  },
  {
    id: "p12", category: "Triples", title: "Baudhāyana Triples: Scaled and Primitive", heading: "Right Triangles with Whole Number Sides",
    sub: "Pythagorean triples.",
    blocks: [
      { t: "key", title: "Baudhāyana triple", s: "Three counting numbers (a, b, c) with **a^{2} + b^{2} = c^{2}**. They are also called Pythagorean triples or right-angled triangle triples. Baudhāyana lists **(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), (12, 35, 37)** and **(15, 36, 39)** (Verse 1.13)." },
      { t: "p", s: "The triples with numbers up to 20 are **(3, 4, 5), (6, 8, 10), (5, 12, 13), (9, 12, 15), (8, 15, 17)** and **(12, 16, 20)**. Of these, (6, 8, 10), (9, 12, 15) and (12, 16, 20) are multiples of (3, 4, 5)." },
      { t: "dia", id: "bp_scaled" },
      { t: "h", s: "Scaled triples (proof)" },
      { t: "ol", items: [
        "Given a^{2} + b^{2} = c^{2}.",
        "(ka)^{2} + (kb)^{2} = k^{2} a^{2} + k^{2} b^{2}.",
        "= k^{2} (a^{2} + b^{2}) = k^{2} c^{2} = (kc)^{2}.",
        "So **(ka, kb, kc)** is also a triple, called a **scaled version**. Hence there are **infinitely many** triples.",
      ] },
      { t: "key", title: "Primitive triple", s: "A triple with **no common factor greater than 1** is **primitive**, such as (3, 4, 5). (9, 12, 15) is not primitive. Dividing a triple by a common factor f gives a triple. Every triple is either primitive or a scaled version of a primitive triple." },
      ex("Is (30, 40, 50) a triple? Is (300, 400, 500)?", ["30^{2} + 40^{2} = 900 + 1600 = 2500 = 50^{2}", "300^{2} + 400^{2} = 90000 + 160000 = 250000 = 500^{2}"], "Both are scaled versions of (3, 4, 5)"),
      ex("Is (10, 24, 26) primitive? If not, from which primitive triple does it come?", ["All three are even, so 2 is a common factor.", "Dividing by 2 gives (5, 12, 13), and 25 + 144 = 169."], "Not primitive; (5, 12, 13)"),
      ex("Find four triples that contain 15.", ["(3, 4, 5) × 5 = (15, 20, 25)", "(5, 12, 13) × 3 = (15, 36, 39)", "(8, 15, 17) is primitive", "From the odd square 225: (15, 112, 113)"], "Four such triples"),
      ex("Write five scaled versions of (8, 15, 17). Are they primitive?", ["(16, 30, 34), (24, 45, 51), (32, 60, 68), (40, 75, 85), (48, 90, 102)"], "No, each has the common factor k"),
    ],
  },
  {
    id: "p13", category: "Triples", title: "Generating Triples from Odd Numbers", heading: "Making Triples from Odd Squares",
    sub: "The sum of odd numbers helps.",
    blocks: [
      { t: "p", s: "1 = 1^{2}, 1 + 3 = 2^{2}, 1 + 3 + 5 = 3^{2}: **the sum of the first n odd numbers is n^{2}**, and the n-th odd number is **2n − 1**." },
      { t: "eq", lines: ["(n − 1)^{2} + (2n − 1) = n^{2}"] },
      { t: "p", s: "When the odd number 2n − 1 is itself a **square**, this gives a Baudhāyana triple. Take an odd square (like 9 = 3^{2}), find n from 2n − 1 = 9 (n = 5) and put it in: 4^{2} + 3^{2} = 5^{2}." },
      { t: "dia", id: "bp_odd" },
      { t: "table", head: ["Odd square 2n − 1", "n", "Triple"], rows: [
        ["9", "5", "(3, 4, 5)"], ["25", "13", "(5, 12, 13)"], ["49", "25", "(7, 24, 25)"], ["81", "41", "(9, 40, 41)"], ["121", "61", "(11, 60, 61)"], ["169", "85", "(13, 84, 85)"], ["225", "113", "(15, 112, 113)"],
      ] },
      { t: "ul", items: [
        "In every such triple the **hypotenuse is 1 more than** one of the shorter sides.",
        "Two consecutive numbers have no common factor, so this method gives **only primitive** triples.",
        "It does **not** give all primitive triples: (8, 15, 17), (20, 21, 29) and (12, 35, 37) are not of this form.",
      ] },
      ex("Find the triple from the odd square 289.", ["2n − 1 = 289 = 17^{2}, so n = 145", "144^{2} + 17^{2} = 145^{2}"], "(17, 144, 145)"),
    ],
  },
  {
    id: "p14", category: "History", title: "Fermat's Last Theorem", heading: "A Problem That Waited 300 Years",
    sub: "From squares to cubes and higher powers.",
    blocks: [
      { t: "p", s: "There are infinitely many squares that are the sum of two squares. The French mathematician **Fermat** (17th century) asked whether a cube can be the sum of two cubes, a fourth power the sum of two fourth powers, and so on." },
      { t: "key", title: "Fermat's Last Theorem", s: "The equation **x^{n} + y^{n} = z^{n}** has **no solution in natural numbers when n is greater than 2**." },
      { t: "ul", items: [
        "In the margin of a book he wrote that he had found a **marvellous proof**, but the margin was too small to contain it. His proof was never found.",
        "Great mathematicians tried for **more than 300 years** and failed.",
        "In 1963 the 10-year-old **Andrew Wiles** read about it and decided to prove it. He finally proved it in **1994**.",
      ] },
    ],
  },
  {
    id: "p15", category: "Applications", title: "Famous Problems of the Chapter", heading: "The Lotus, the Rhombus, the Triangle and the Grid",
    sub: "Further applications of the theorem.",
    blocks: [
      { t: "h", s: "The lotus problem (Līlāvatī of Bhāskarāchārya)" },
      { t: "dia", id: "bp_lotus" },
      ex("A lotus stem sticks 1 unit above a lake. When the breeze bends it, the tip touches the water 3 units away. Find the depth.", ["Let the depth be x; the stem is x + 1.", "3^{2} + x^{2} = (x + 1)^{2}", "9 + x^{2} = x^{2} + 2x + 1, so 9 = 2x + 1"], "x = 4 units"),
      { t: "dia", id: "bp_rhombus" },
      ex("Find the side of a rhombus whose diagonals are 24 and 70 units.", ["The diagonals bisect each other at right angles: halves 12 and 35.", "side^{2} = 144 + 1225 = 1369"], "37 units"),
      { t: "dia", id: "bp_equi" },
      ex("Find the area of an equilateral triangle of side 6 units.", ["The altitude bisects the base: 3 and 3.", "h^{2} = 36 − 9 = 27, h = √27", "Area = [1|2] × 6 × √27 = 3√27 = 9√3 ≈ 15.59"], "9√3 square units"),
      { t: "dia", id: "bp_diff" },
      ex("Construct a square whose area is the difference of the areas of squares of sides 7 and 5 units.", ["Area needed = 49 − 25 = 24, so the side is √24.", "Draw 5 units, a perpendicular at one end, and cut it with radius 7 from the other end."], "A square of side √24"),
      { t: "h", s: "Squares on a grid of dots" },
      { t: "dia", id: "bp_grid" },
      { t: "p", s: "A tilted square that goes p across and q up has area **p^{2} + q^{2}**. So whole areas that are sums of two squares are possible: **1, 2, 4, 5, 8, 9, 10, 13, 16, 17, 18, 20, 25, ...** Area **3** is not possible." },
      ex("Is the hypotenuse the longest side of a right triangle?", ["c^{2} = a^{2} + b^{2}, so c^{2} is greater than a^{2} and b^{2}."], "Yes, c is greater than a and b"),
    ],
  },
  {
    id: "p16", category: "Activities", title: "Activities and a Puzzle", heading: "Try These with Paper and a Pencil",
    sub: "Verify the theorem and solve the colour puzzle.",
    blocks: [
      { t: "act", title: "Checking the theorem by drawing",
        steps: ["Draw a right angle and mark 3 cm and 4 cm on its arms.", "Join the ends and measure the hypotenuse.", "Repeat with 5 cm and 12 cm."],
        see: ["The hypotenuses measure about 5 cm and 13 cm."],
        why: ["The measurements agree with a^{2} + b^{2} = c^{2}."] },
      { t: "act", title: "Find the colours (puzzle)",
        steps: ["Three closed boxes hold only red, only blue and only green balls. They are labelled RED, BLUE, GREEN, but every label is wrong.", "Open only the box labelled RED and see the colour, say blue."],
        see: ["The box labelled GREEN cannot hold green (wrong label) and blue is already taken, so it holds red. The box labelled BLUE then holds green."],
        why: ["Opening just one box is enough to place all three labels."] },
    ],
  },
  {
    id: "p17", category: "Revision", title: "Revision: Mind Map and Results", heading: "Revision: The Whole Chapter",
    sub: "The mind map, the results and the points to remember.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "Summary of results" },
      { t: "table", head: ["Result", "Statement"], rows: [
        ["Doubling a square", "The square on the diagonal has double the area"], ["Halving a square", "Join the midpoints of the sides"], ["Isosceles right triangle", "c^{2} = 2a^{2}, c = a√2"], ["Value of √2", "1.414 < √2 < 1.415; non-terminating; not a fraction"],
        ["Baudhāyana-Pythagoras theorem", "a^{2} + b^{2} = c^{2} (c = hypotenuse)"], ["Shorter side", "a^{2} = c^{2} − b^{2}"], ["Scaled triple", "(ka, kb, kc) is a triple if (a, b, c) is"], ["Triples from odd squares", "(n − 1)^{2} + (2n − 1) = n^{2}"], ["Fermat's Last Theorem", "x^{n} + y^{n} = z^{n} has no solution for n over 2 (proved 1994)"],
      ] },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "The **hypotenuse** is opposite the right angle and is the **longest** side.",
        "To find the hypotenuse **add** the squares; to find a shorter side **subtract** them.",
        "Take the square root at the end, and **estimate** it between two whole numbers.",
        "To test for a right angle, compare a^{2} + b^{2} with the square of the **longest** side.",
      ] },
    ],
  },
];
