import type { CTopic, CBlock } from "./carbonNotesTypes";

// Class VIII Maths, The Baudhāyana-Pythagoras Theorem (NCERT Ganita Prakash Part II, Chapter 2). Topics 1 to 9: doubling and halving a square,
// the isosceles right triangle, the number √2, combining squares and the theorem. Each topic ends with solved examples.
// In every text: **bold** makes bold, [a|b] is a stacked fraction, ^{..} is a power. Do not write a letter touching a digit (it becomes a subscript).

let n = 0;
/** a solved example, numbered in order through the chapter */
export const ex = (q: string, steps: string[], ans: string): CBlock => ({ t: "ex", title: `Solved example ${++n}`, q, steps, ans });

export const BP_A: CTopic[] = [
  {
    id: "p1", category: "Squares", title: "Doubling a Square", heading: "How to Make a Square with Double the Area",
    sub: "A question from Baudhāyana's Śulba-Sūtra, about 800 BCE.",
    blocks: [
      { t: "p", s: "In his **Śulba-Sūtra** (about 800 BCE) **Baudhāyana** asked: **how can one construct a square with double the area of a given square?** A first guess is to double each side. But then the new square has area 2 × 2 = **4 times** the area of the original, not twice." },
      { t: "key", title: "Baudhāyana's answer (Śulba-Sūtra, Verse 1.9)", s: "**The diagonal of a square produces a square of double the area of the original square.** So build the new square on the **diagonal**." },
      { t: "dia", id: "bp_double" },
      { t: "h", s: "Why is the area double? (Proof)" },
      { t: "ol", items: [
        "Draw the diagonal of the original square. It cuts the square into **2 equal triangles**.",
        "Extend the horizontal and vertical sides of the original square. They cut the new square into **4 triangles**.",
        "A diagonal of a square splits each 90° corner into 45° + 45°. So every one of these triangles has angles 90°, 45°, 45°.",
        "They all have the same two short sides (the side of the original square), so the triangles are **congruent**.",
        "The original square is made of **2** such triangles and the new square of **4**. So the new square has **double** the area.",
      ] },
      ex("A square has side 5 cm. What is the area of the square drawn on its diagonal?", ["Area of the given square = 5 × 5 = 25 cm^{2}", "The square on the diagonal has double the area: 2 × 25 = 50 cm^{2}"], "50 cm^{2}"),
      ex("The diagonal of a square is 8 cm. Find the area of the square.", ["The square on the diagonal has area 8 × 8 = 64 cm^{2}", "It is double the given square, so the given square has area 64 ÷ 2 = 32 cm^{2}"], "32 cm^{2}"),
      ex("If every side of a square is made 3 times as long, how many times does the area become?", ["Area = side × side", "(3s) × (3s) = 9 s^{2}"], "9 times"),
    ],
  },
  {
    id: "p2", category: "Squares", title: "A Chain of Squares and Paper Doubling", heading: "Doubling Again and Again",
    sub: "2, 4 and 8 triangles, and a paper activity.",
    blocks: [
      { t: "dia", id: "bp_sequence" },
      { t: "p", s: "Each square has **double the area** of the one before, as they are made of **2, 4 and 8** small triangles." },
      { t: "act", title: "Doubling a square with paper (1)",
        steps: ["Cut out two identical square papers and draw both diagonals on each.", "Cut the second square along its diagonals into four pieces, 5, 6, 7 and 8.", "Place the pieces around the first square, one on each side."],
        see: ["The pieces fit exactly and make a bigger square whose side is the **diagonal** of the first square."],
        why: ["The square on the diagonal has double the area of the original square."] },
      { t: "act", title: "Doubling a square with paper (2)",
        steps: ["Cut two identical squares, each along one diagonal, to get four congruent triangles, 1, 2, 3 and 4.", "Place them with their right-angle corners meeting at one point and the hypotenuses outside."],
        see: ["The four hypotenuses form the sides of a new square."],
        why: ["The new square has 4 triangles, double the area of one square (2 triangles)."] },
      ex("Starting with a square of area 6 cm^{2}, the square on the diagonal is drawn three times in a row. Find the area of the last square.", ["Each step doubles the area.", "6 × 2 × 2 × 2 = 48 cm^{2}"], "48 cm^{2}"),
    ],
  },
  {
    id: "p3", category: "Squares", title: "Halving a Square", heading: "A Square with Half the Area",
    sub: "Reverse the doubling, or fold a paper.",
    blocks: [
      { t: "p", s: "To get a square with **half** the area we reverse the doubling: **join the midpoints** of the four sides. The tilted inner square has half the area." },
      { t: "dia", id: "bp_halve" },
      { t: "key", title: "Do not halve the side!", s: "A square with **half the side** has only **one quarter** of the area: four such squares fill the original square." },
      { t: "h", s: "Folding the paper" },
      { t: "dia", id: "bp_fold" },
      { t: "p", s: "Fold the four corners of a square paper inward so that the creases pass through the midpoints of the sides. **PQRS** is the required square." },
      { t: "h", s: "Why is PQRS a square of half the area?" },
      { t: "ol", items: [
        "Join PR and QS. They cross at the centre O and cut the paper into **4 equal small squares**.",
        "Each side PQ, QR, RS and SP is the **diagonal** of a small square, so all four sides are equal.",
        "At each corner of PQRS, two angles of 45° meet, so each angle is **90°**. So PQRS is a **square**.",
        "Each small square is cut by its diagonal into 2 triangles, and PQRS keeps 1 triangle of each: **4 of the 8** triangles, which is **half**.",
      ] },
      ex("A square paper of side 20 cm is folded this way. Find the area of PQRS.", ["Area of the paper = 400 cm^{2}", "PQRS has half the area: 200 cm^{2}"], "200 cm^{2}"),
      ex("The side of a square is halved. What fraction of the area remains?", ["([s|2])^{2} = [s^{2}|4]"], "one quarter"),
    ],
  },
  {
    id: "p4", category: "Isosceles", title: "Hypotenuse of an Isosceles Right Triangle", heading: "The Isosceles Right Triangle",
    sub: "Two equal sides and a hypotenuse.",
    blocks: [
      { t: "key", title: "Words to know", s: "In a right triangle the side **opposite the right angle** is the **hypotenuse**; it is the **longest** side. An **isosceles right triangle** has its two shorter sides **equal**; two such triangles make a square, and the hypotenuse is the diagonal of that square." },
      { t: "dia", id: "bp_iso" },
      { t: "p", s: "For equal sides of length 1, the square on the hypotenuse has double the area of the 1 × 1 square, that is **2 square units**. So the hypotenuse c satisfies c × c = 2, and **c = √2**." },
      { t: "eq", lines: ["c^{2} = 2a^{2}", "c = a√2", "a^{2} = [c^{2}|2]"] },
      ex("Find the hypotenuse of an isosceles right triangle with equal sides 12, and say between which whole numbers it lies.", ["c^{2} = 2 × 12^{2} = 288, so c = √288", "16^{2} = 256 and 17^{2} = 289"], "√288, between 16 and 17"),
      ex("The hypotenuse of an isosceles right triangle is √72. Find its other two sides.", ["c^{2} = 2a^{2}, so 72 = 2a^{2}", "a^{2} = 36"], "each side is 6"),
      ex("The hypotenuse of an isosceles right triangle is 10. Find the other sides.", ["100 = 2a^{2}, so a^{2} = 50", "a = √50 ≈ 7.07"], "√50 each"),
      ex("Find the diagonal of a square of side 10 m.", ["d^{2} = 2 × 10^{2} = 200", "d = √200 = 10√2 ≈ 14.14 m"], "about 14.14 m"),
    ],
  },
  {
    id: "p5", category: "Root two", title: "The Value of √2", heading: "Squeezing √2 Between Decimals",
    sub: "Lower bounds and upper bounds.",
    blocks: [
      { t: "p", s: "**√2** is the number which, multiplied by itself, gives 2. A number just below it is a **lower bound** and a number just above it is an **upper bound**. We find them by squaring decimals." },
      { t: "table", head: ["Squares tried", "Conclusion"], rows: [
        ["1^{2} = 1,  2^{2} = 4", "1 < √2 < 2"], ["1.4^{2} = 1.96,  1.5^{2} = 2.25", "1.4 < √2 < 1.5"], ["1.41^{2} = 1.9881,  1.42^{2} = 2.0164", "1.41 < √2 < 1.42"], ["1.414^{2} = 1.999396,  1.415^{2} = 2.002225", "1.414 < √2 < 1.415"],
      ] },
      { t: "dia", id: "bp_root2" },
      { t: "key", title: "Value", s: "**√2 = 1.41421356...** For most calculations take √2 ≈ 1.414." },
      ex("Find bounds with one decimal digit for the hypotenuse of an isosceles right triangle with equal sides 3.", ["c^{2} = 18", "4.2^{2} = 17.64 and 4.3^{2} = 18.49"], "4.2 < √18 < 4.3"),
      ex("Find bounds with one decimal digit for equal sides 9.", ["c^{2} = 162", "12.7^{2} = 161.29 and 12.8^{2} = 163.84"], "12.7 < √162 < 12.8"),
      ex("Find √98 to one decimal place (the hypotenuse for equal sides 7 cm).", ["9.8^{2} = 96.04 and 9.9^{2} = 98.01", "98 is much closer to 98.01"], "about 9.9 cm"),
    ],
  },
  {
    id: "p6", category: "Root two", title: "√2 Is Not a Terminating Decimal or a Fraction", heading: "Two Beautiful Proofs",
    sub: "Why the digits of √2 never end.",
    blocks: [
      { t: "h", s: "√2 is not a terminating decimal" },
      { t: "ol", items: [
        "Suppose √2 ends, like 1.414...d, with a last digit d that is not 0.",
        "When it is squared, the last digit of the square comes from d × d.",
        "The squares of 1 to 9 are 1, 4, 9, 16, 25, 36, 49, 64, 81. None ends in 0, so the square ends in a **non-zero** digit.",
        "But 2 = 2.000... has only zeros after the point.",
        "So **no terminating decimal** has square 2: the decimal expansion of √2 goes on forever.",
      ] },
      { t: "h", s: "√2 is not a fraction" },
      { t: "ol", items: [
        "Suppose √2 = [m|n], where m and n are counting numbers.",
        "Squaring: 2 = [m^{2}|n^{2}], so **2n^{2} = m^{2}**.",
        "In the prime factorisation of a square number every prime appears an **even** number of times. So in m^{2} the prime 2 appears an even number of times.",
        "In 2n^{2} the prime 2 appears an even number of times from n^{2}, plus one more: an **odd** number of times.",
        "One number cannot have both, so our supposition is wrong: **√2 is not a fraction**.",
      ] },
      { t: "note", title: "History", s: "This proof was given by **Euclid** in his book **Elements** (about 300 BCE)." },
      ex("Is there a fraction [m|n] whose square is 3? Use the same idea.", ["3n^{2} = m^{2}", "In m^{2} the prime 3 appears an even number of times, but in 3n^{2} an odd number of times."], "No, √3 is not a fraction"),
    ],
  },
  {
    id: "p7", category: "Combining", title: "Combining Two Different Squares", heading: "One Square from Two",
    sub: "Baudhāyana's rule for any two squares.",
    blocks: [
      { t: "p", s: "Two **equal** squares combine into one square whose side is the diagonal of either square. What about two squares of **different** sizes?" },
      { t: "key", title: "Baudhāyana (Śulba-Sūtra, Verse 1.12)", s: "**The area of the square produced by the diagonal is the sum of the areas of the squares produced by the two sides.**" },
      { t: "p", s: "So to combine two squares: make a **right triangle** whose two shorter sides are the sides of the two squares. The square on its **hypotenuse** has area equal to the **sum** of the two areas. When both squares are equal, this is the same as the doubling method." },
      { t: "h", s: "Cut and rearrange" },
      { t: "dia", id: "bp_rearrange" },
      { t: "act", title: "Combining two squares with paper",
        steps: ["Cut two squares of sides a and b and join them side by side.", "Mark the point P on the base at distance a from the right end. Cut straight from P to the top-left corner of the small square and to the top-right corner of the big square: three pieces.", "Move the two triangles to build one square."],
        see: ["The three pieces form a single square of side c."],
        why: ["Nothing is lost or added, so c^{2} = a^{2} + b^{2}."] },
      ex("Two squares have sides 6 cm and 8 cm. Find the side of the square whose area equals their sum.", ["6^{2} + 8^{2} = 36 + 64 = 100", "side = √100"], "10 cm"),
      ex("How can we construct a square with 3 times and with 5 times the area of a square of side s? (Śulba-Sūtra, Verse 1.10)", ["Three times: take shorter sides s and the diagonal s√2. Then hypotenuse^{2} = s^{2} + 2s^{2} = 3s^{2}.", "Five times: take shorter sides s and 2s. Then hypotenuse^{2} = s^{2} + 4s^{2} = 5s^{2}."], "Draw the square on that hypotenuse"),
    ],
  },
  {
    id: "p8", category: "Proofs", title: "Proofs of the Theorem", heading: "Why a² + b² = c²",
    sub: "Baudhāyana's method and the four triangle method.",
    blocks: [
      { t: "h", s: "Proof 1: Baudhāyana's method (Verse 2.1)" },
      { t: "ol", items: [
        "Place the two squares of sides a and b (a smaller than b) side by side on one line. Total area = a^{2} + b^{2}.",
        "In the bigger square mark a rectangle of width a and height b. Its **diagonal** makes a right triangle with sides a, b and hypotenuse c.",
        "Draw three more copies of this triangle, so there are four: T, U, W and X. All are congruent.",
        "The new four-sided figure has each side equal to c, so all four sides are **equal**.",
        "At each corner the two small angles of a triangle, x and 90° − x, meet, so each corner is **90°**: the figure is a **square** of side c.",
        "Call the part shared by both figures V. The new square = T + U + V, and the two given squares = V + W + X. Since T, U, W and X are equal, **c^{2} = a^{2} + b^{2}**.",
      ] },
      { t: "dia", id: "bp_rearrange" },
      { t: "h", s: "Proof 2: four triangles in a square" },
      { t: "dia", id: "bp_four" },
      { t: "ol", items: [
        "Draw a big square of side (a + b) and place four copies of the right triangle inside it, one at each corner.",
        "The space in the middle is a tilted square of side c (its corners are 90°, because the two small angles of a triangle add to 90°).",
        "Area of the big square = (a + b)^{2} = a^{2} + 2ab + b^{2}.",
        "The same area = 4 triangles + middle square = 4 × [1|2] ab + c^{2} = 2ab + c^{2}.",
        "So a^{2} + 2ab + b^{2} = 2ab + c^{2}. Removing 2ab: **a^{2} + b^{2} = c^{2}**.",
      ] },
      ex("In the four triangle picture the legs are 5 and 12. Find the area of the big square and of the tilted square.", ["Big square: (5 + 12)^{2} = 289", "Triangles: 4 × [1|2] × 5 × 12 = 120", "Tilted square: 289 − 120 = 169, so c = 13"], "289 and 169"),
    ],
  },
  {
    id: "p9", category: "Theorem", title: "The Baudhāyana-Pythagoras Theorem and Using It", heading: "The Theorem",
    sub: "Find a hypotenuse or a shorter side.",
    blocks: [
      { t: "key", title: "Theorem", s: "If a right-angled triangle has sides a, b and c, where **c is the hypotenuse**, then **a^{2} + b^{2} = c^{2}**." },
      { t: "dia", id: "bp_345" },
      { t: "p", s: "Baudhāyana was the **first person in history** to state this theorem in this general and essentially modern form. It is also called the **Pythagorean theorem**, after the Greek **Pythagoras** (about 500 BCE), who lived a couple of hundred years after Baudhāyana. The name **Baudhāyana-Pythagoras theorem** tells everyone which theorem is meant." },
      { t: "eq", lines: ["Hypotenuse: c = √(a^{2} + b^{2})", "Shorter side: a = √(c^{2} − b^{2})"] },
      ex("A right triangle has shorter sides 5 cm and 12 cm. Find the hypotenuse.", ["c^{2} = 25 + 144 = 169", "c = 13"], "13 cm"),
      ex("A right triangle has one short side 8 cm and hypotenuse 17 cm. Find the third side.", ["b^{2} = 17^{2} − 8^{2} = 289 − 64 = 225", "b = 15"], "15 cm"),
      ex("Find the missing side (c is the hypotenuse): (i) a = 5, b = 7  (ii) a = 9, c = 15  (iii) a = 1.5, b = 3.5", ["(i) c^{2} = 25 + 49 = 74, c = √74 ≈ 8.60", "(ii) b^{2} = 225 − 81 = 144, b = 12", "(iii) c^{2} = 2.25 + 12.25 = 14.5, c = √14.5 ≈ 3.81"], "√74, 12, √14.5"),
      ex("A right triangle has shorter sides 9 cm and 40 cm. Find the hypotenuse.", ["c^{2} = 81 + 1600 = 1681", "c = 41"], "41 cm"),
    ],
  },
];
