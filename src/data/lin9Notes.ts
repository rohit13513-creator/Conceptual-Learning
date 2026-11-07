import type { NTopic } from "./circles9Notes";
import * as F from "./lin9Figs";

// Class IX Maths (Ganita Manjari, Part II): Two Variables, One Line.
// Order of the notes: first the theory (definitions, rules and proofs), then the solved examples, then the revision.
// **bold** inside a string makes bold text. A slash is avoided in the text because some screens show it as a fraction.

// The revision mind map: five simple cards in the order a student meets them, then the three cases of a pair.
export const LIN9_MAP = {
  steps: [
    { title: "One equation", color: "#2563eb", lines: ["ax + by + c = 0 (a, b not both 0)", "A solution is an ordered pair (x, y)", "Infinitely many solutions, all on one line"] },
    { title: "One line", color: "#0f766e", lines: ["Slope m = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁)", "y = mx + d: m is the slope, d is the y-intercept", "m = −a ÷ b and d = −c ÷ b"] },
    { title: "Two lines (a pair)", color: "#b45309", lines: ["a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0", "A solution must fit both equations", "It is the point where the two lines meet"] },
    { title: "Solve it", color: "#7c3aed", lines: ["Substitution: put one variable in terms of the other", "Elimination: make coefficients equal and subtract", "Graph: draw both lines and read the meeting point"] },
    { title: "Word problems", color: "#be123c", lines: ["Call the unknowns x and y", "Write two equations from the two facts", "Solve, then check in the story"] },
  ],
  cases: [
    { ratio: "a₁÷a₂ ≠ b₁÷b₂", lines: "Lines intersect", solutions: "One solution", color: "#166534", bg: "#dcfce7" },
    { ratio: "a₁÷a₂ = b₁÷b₂ = c₁÷c₂", lines: "Lines coincide", solutions: "Infinitely many solutions", color: "#1e40af", bg: "#dbeafe" },
    { ratio: "a₁÷a₂ = b₁÷b₂ ≠ c₁÷c₂", lines: "Lines are parallel", solutions: "No solution", color: "#9f1239", bg: "#ffe4e6" },
  ],
  rule: "Compare a₁÷a₂ and b₁÷b₂ first. Only when they are equal do you look at c₁÷c₂.",
};

export const LIN9_TOPICS: NTopic[] = [
  // ───────────────────────────── 1 THEORY
  {
    id: "l1", category: "Theory", title: "Linear Equations in Two Variables", heading: "Linear Equations in Two Variables",
    sub: "What the equation looks like, and its standard form.",
    blocks: [
      { t: "p", s: "Radha buys mangoes at ₹60 per kg and bananas at ₹50 per kg and pays ₹280 in all. We do not know how many kilograms of each she bought, so we give them names. Let x be the kilograms of mangoes and y the kilograms of bananas. The mangoes cost 60x rupees, the bananas cost 50y rupees, and the total is 280. So" },
      { t: "key", title: "The equation for Radha's shopping", s: "**60x + 50y = 280.** The left side and the right side both stand for the same thing, the total cost in rupees. This is a linear equation in two variables." },
      { t: "key", title: "Linear equation in two variables", s: "An equation that can be written as **ax + by + c = 0**, where a, b and c are real numbers and **a and b are not both zero**, is a linear equation in two variables. This way of writing it is the **standard form**. Here a is the coefficient of x, b is the coefficient of y and c is the constant." },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "The numbers a, b and c can be fractions or decimals. For example, ¼x + ⅗y − ½ = 0 is a linear equation. To remove the fractions we can multiply the whole equation by a number. Multiplying by 20 gives 5x + 12y − 10 = 0.",
        "An equation like **ax + c = 0** is also a linear equation in two variables, because it can be written as ax + 0 × y + c = 0. For example 7 + 4x = 0 is 4x + 0y + 7 = 0, with a = 4, b = 0 and c = 7.",
        "To bring an equation to standard form, move **every term to the left side** so that the right side is 0. Then read a, b and c with their signs.",
        "The standard form is not unique. Multiplying all the terms by −1 gives another correct standard form. So 5x + 2y − 2.7 = 0 and −5x − 2y + 2.7 = 0 are the same equation.",
        "The word **linear** says that x and y appear only to the first power and are not multiplied together. The graph of such an equation is a straight line.",
      ] },
      { t: "table", head: ["Equation", "Standard form", "a", "b", "c"], rows: [
        ["5x + 2y = 2.7", "5x + 2y − 2.7 = 0", "5", "2", "−2.7"],
        ["y − 15 = 2x", "−2x + y − 15 = 0", "−2", "1", "−15"],
        ["5x = 3y", "5x − 3y + 0 = 0", "5", "−3", "0"],
        ["x = 8", "x + 0y − 8 = 0", "1", "0", "−8"],
        ["3y = 1", "0x + 3y − 1 = 0", "0", "3", "−1"],
      ] },
      { t: "note", title: "Writing a situation as an equation", s: "Read the sentence slowly and decide what the unknowns are. A notebook costs twice a pen. If a notebook is ₹t and a pen is ₹p, then t = 2p. (Not p = 2t: the larger quantity is the one that is multiplied.) Two batsmen together scored 176 runs, so x + y = 176." },
    ],
  },
  // ───────────────────────────── 2
  {
    id: "l2", category: "Theory", title: "Solutions of a Linear Equation", heading: "Solutions of a Linear Equation in Two Variables",
    sub: "Ordered pairs that fit the equation, and why there are infinitely many.",
    blocks: [
      { t: "key", title: "Solution", s: "A **solution** of a linear equation in two variables is a **pair of values of x and y that satisfies the equation**. We write it as an **ordered pair (x, y)**. The order matters: the first number is the x-value and the second is the y-value." },
      { t: "p", s: "Take 3x + 2y = 12. The pair (2, 3) is a solution because 3 × 2 + 2 × 3 = 12. The pair (4, 0) is a solution because 3 × 4 + 2 × 0 = 12. The pair (1, 3) is not a solution, because 3 × 1 + 2 × 3 = 9, which is not 12." },
      { t: "h", s: "How to test a pair" },
      { t: "ol", items: [
        "Put the x-value and the y-value into the left side of the equation.",
        "Work out the left side.",
        "If it equals the right side, the pair is a solution. If not, it is not.",
      ] },
      { t: "h", s: "How many solutions are there?" },
      { t: "p", s: "Choose any value u for x. Put it in the equation. This gives an equation in y alone, which can be solved to get a value v. Then (u, v) is a solution. Since we are free to choose u as we like, **a linear equation in two variables has infinitely many solutions**." },
      { t: "ul", items: [
        "In 3x + 2y = 12, the choice x = 0 gives y = 6, x = 2 gives y = 3, x = 4 gives y = 0, and x = 1 ÷ 2 gives y = 21 ÷ 4. These solutions are all different.",
        "Solutions can be integers, fractions or decimals.",
        "Different equations can share a solution. The pair (−3, 4) is a solution of both 3ax + 4y = −2 (when a = 2) and 2x + by = 14 (when b = 5).",
      ] },
      { t: "key", title: "Unknown constants", s: "If a pair is said to be a solution of an equation that has an unknown constant, **substitute the pair into the equation**. You get a simple equation in the constant. For (−3, 4) in 3ax + 4y = −2: 3a(−3) + 4(4) = −2, so −9a = −18 and a = 2." },
      { t: "note", title: "Two equations with the same solutions", s: "The equations 3x + 4y = 7 and 6x + 8y = 14 have exactly the same solutions. Doubling both sides does not change which pairs fit. In general ax + by = c and kax + kby = kc (k ≠ 0) have the same solutions." },
    ],
  },
  // ───────────────────────────── 3
  {
    id: "l3", category: "Theory", title: "Graph of a Linear Equation", heading: "The Graph of a Linear Equation",
    sub: "Why the solutions lie on a straight line, and how to draw it quickly.",
    blocks: [
      { t: "p", s: "If we plot all the solutions of a linear equation as points on the coordinate plane, what do we get? Take 3x + 2y = 12. It can be written as 2y = −3x + 12, that is y = −(3 ÷ 2)x + 6. Four solutions are A(−1, 7.5), B(0, 6), C(1, 4.5) and D(4, 0). When we plot them they lie on one straight line." },
      { t: "fig", spec: F.g3x2y12("The solutions of 3x + 2y = 12 lie on a line") },
      { t: "key", title: "Graph of a linear equation", s: "The graph of a linear equation in two variables is a **straight line**. **Every solution is a point on the line, and every point on the line is a solution.** A point that is not on the line does not satisfy the equation." },
      { t: "h", s: "Drawing the line quickly" },
      { t: "ol", items: [
        "Put **x = 0** and find y. This is the point where the line cuts the **y-axis**.",
        "Put **y = 0** and find x. This is the point where the line cuts the **x-axis**.",
        "Plot the two points and draw a straight line through them. Extend it on both sides.",
        "For a third point as a check, choose another value of x and see that the point is on your line.",
      ] },
      { t: "fig", spec: F.g2xy7("2x + y = 7 meets the axes at (0, 7) and (3.5, 0)") },
      { t: "h", s: "Special lines" },
      { t: "ul", items: [
        "If **c = 0**, the equation is ax + by = 0 and the line **passes through the origin**, because x = 0, y = 0 is a solution. For such a line the origin gives only one point, so choose another value of x to get a second point (for 2x + 5y = 0 take x = 5 and get y = −2).",
        "If **b = 0**, the equation is x = constant (for example x = 3). It is a **vertical line**, parallel to the y-axis. The line x = 0 is the y-axis.",
        "If **a = 0**, the equation is y = constant (for example y = 5). It is a **horizontal line**, parallel to the x-axis. The line y = 0 is the x-axis.",
      ] },
      { t: "fig", spec: F.g2x5y0("2x + 5y = 0 passes through the origin") },
      { t: "note", title: "A point on the line, a point off the line", s: "For 3x − 7y = 21, the point (7, 0) is on the line, since 21 = 21. The point (2, 3) gives 6 − 21 = −15, which is not 21, so it is not on the line. A point can satisfy the equation only if it is on the line." },
    ],
  },
  // ───────────────────────────── 4
  {
    id: "l4", category: "Theory", title: "Slope of a Line", heading: "Slope of a Line",
    sub: "Rise, run, and what the steepness of a line tells us.",
    blocks: [
      { t: "p", s: "Cycling up a steep hill needs more effort than riding on a flat road. In mathematics, the steepness of a line is called its **slope** (or **gradient**)." },
      { t: "ul", items: [
        "A **positive slope** means the line goes **up** as we move from left to right.",
        "A **negative slope** means the line goes **down** as we move from left to right.",
      ] },
      { t: "key", title: "Rise, run and slope", s: "For two points A(x₁, y₁) and B(x₂, y₂) on a line, the **run** is the horizontal distance x₂ − x₁ and the **rise** is the vertical distance y₂ − y₁. **Slope = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁).** Moving right is a positive run, moving left is a negative run. Going up is a positive rise and going down is a negative rise." },
      { t: "fig", spec: F.gSlopeAB("A(2, 0) and B(4, 3): rise 3, run 2, slope 3 ÷ 2") },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "The slope is the **same wherever we measure it on the line**. For the line through A(2, 0) and B(4, 3) the slope is 3 ÷ 2. Taking B and a farther point D(8, 9) gives 6 ÷ 4 = 3 ÷ 2 again.",
        "The **order of the points does not matter**. Slope from A(−4, 5) to B(−1, 2) is (2 − 5) ÷ (−1 + 4) = −1. Slope from B to A is (5 − 2) ÷ (−4 + 1) = −1. Take the points in the same order in the top and the bottom.",
        "A steeper line has a slope of larger size. A ramp that rises 2.5 m over a run of 4 m has slope 2.5 ÷ 4 = 5 ÷ 8.",
        "Slope has no unit when the rise and the run are measured in the same unit.",
      ] },
      { t: "h", s: "The four kinds of slope" },
      { t: "table", head: ["Kind", "How the line looks", "Example", "Slope"], rows: [
        ["Positive", "Goes up from left to right", "y = 2x + 1", "m = 2"],
        ["Negative", "Goes down from left to right", "y = −3x + 4", "m = −3"],
        ["Zero", "Horizontal, parallel to the x-axis", "y = 5", "m = 0"],
        ["Undefined", "Vertical, parallel to the y-axis", "x = 2", "run is 0, so no slope"],
      ] },
      { t: "figs", specs: [F.gPositive("Positive slope"), F.gNegative("Negative slope"), F.gHorizontal("Zero slope"), F.gVertical("Undefined slope")] },
      { t: "note", title: "Why a vertical line has no slope", s: "On a vertical line all points have the same x, so the run is 0. The slope would be rise ÷ 0, and we cannot divide by 0. So we say the slope is undefined. This is also why x = 2 cannot be written in the form y = mx + d." },
    ],
  },
  // ───────────────────────────── 5
  {
    id: "l5", category: "Theory", title: "Slope-Intercept Form", heading: "The Slope-Intercept Form y = mx + d",
    sub: "Reading the slope and the y-intercept straight from the equation.",
    blocks: [
      { t: "key", title: "Slope-intercept form", s: "The equation **y = mx + d** is the slope-intercept form of a line. Here **m is the slope** and **d is the y-intercept**, the length cut off on the y-axis. The line meets the y-axis at the point (0, d)." },
      { t: "proof", title: "Why m is the slope", statement: "A line has the equation y = mx + d. Show that the slope between any two of its points is m.",
        given: "A(x₁, y₁) and B(x₂, y₂) are on the line y = mx + d.", show: "(y₂ − y₁) ÷ (x₂ − x₁) = m",
        steps: ["Since A and B are on the line, they satisfy the equation: y₁ = mx₁ + d and y₂ = mx₂ + d.", "Slope = (y₂ − y₁) ÷ (x₂ − x₁) = ((mx₂ + d) − (mx₁ + d)) ÷ (x₂ − x₁).", "The d cancels, so this is (mx₂ − mx₁) ÷ (x₂ − x₁) = m(x₂ − x₁) ÷ (x₂ − x₁) = m."],
        end: "So the slope of y = mx + d is m, whichever two points we take." },
      { t: "h", s: "From standard form to slope-intercept form" },
      { t: "p", s: "The standard form ax + by + c = 0 gives by = −ax − c. If b ≠ 0, dividing by b gives" },
      { t: "key", title: "Slope and intercept from ax + by + c = 0", s: "**y = −(a ÷ b)x − (c ÷ b)**, so the **slope is m = −a ÷ b** and the **y-intercept is d = −c ÷ b** (b ≠ 0)." },
      { t: "ul", items: [
        "For 5x + y = 3, write y = −5x + 3. The slope is −5: for every 1 unit increase in x, y decreases by 5. The y-intercept is 3, so the line crosses the y-axis at (0, 3).",
        "To graph it, make a table: x = 0 gives y = 3, x = 1 gives y = −2, x = −1 gives y = 8. Plot A(0, 3), B(1, −2), C(−1, 8) and join them.",
        "**m > 0**: the line goes up from left to right. **m < 0**: it goes down. **m = 0**: it is horizontal (y = d). The vertical line x = k has an undefined slope.",
        "The **x-intercept** is found by putting y = 0 in y = mx + d. Then x = −d ÷ m (m ≠ 0).",
      ] },
      { t: "fig", spec: F.gY5x3("y = −5x + 3: slope −5, y-intercept 3") },
      { t: "key", title: "Equal slopes mean parallel lines", s: "Two different lines **y = mx + d₁** and **y = mx + d₂** with the same slope never meet, so they are **parallel**. If they met at a point (x, y), then mx + d₁ = mx + d₂ would give d₁ = d₂, but the lines are different. Lines with the same slope **and** the same intercept are the same line." },
    ],
  },
  // ───────────────────────────── 6
  {
    id: "l6", category: "Theory", title: "A Pair of Linear Equations", heading: "A Pair of Linear Equations in Two Variables",
    sub: "Two facts about the same two unknowns, and what a solution of the pair means.",
    blocks: [
      { t: "p", s: "Rakesh says: \"I have thought of two numbers. Their sum is 25 and their difference is 11.\" If the numbers are x and y, then **x + y = 25** and **x − y = 11**. Two facts about the same two unknowns give a **pair of linear equations in two variables**." },
      { t: "p", s: "A science exhibition charges different fees for adults and children. Group A pays ₹600 for 2 adult and 3 child tickets. Group B pays ₹700 for 3 adult and 2 child tickets. With ₹x for an adult and ₹y for a child, **2x + 3y = 600** and **3x + 2y = 700**." },
      { t: "key", title: "General form of a pair", s: "A pair of linear equations in x and y is written **a₁x + b₁y + c₁ = 0** and **a₂x + b₂y + c₂ = 0**, where a₁, b₁, c₁, a₂, b₂, c₂ are real numbers, a₁ and b₁ are not both zero, and a₂ and b₂ are not both zero." },
      { t: "key", title: "Solution of a pair", s: "A **solution of a pair** is an ordered pair (a, b) that **satisfies both equations** at the same time. A pair that fits only one of the equations is not a solution of the pair." },
      { t: "h", s: "How to frame the equations" },
      { t: "ol", items: [
        "Decide the two unknowns and give them letters (say x and y), with their units.",
        "Pick out the two separate facts in the problem. Each fact gives one equation.",
        "Write each fact in symbols. For example, a taxi with fixed charge ₹x and ₹y per km: a 6 km ride costing ₹122 gives x + 6y = 122.",
      ] },
      { t: "p", s: "To find the solution we need a way to turn the pair into one equation in one variable. Section 7 and 8 give two such methods, and section 10 gives a third that uses graphs." },
    ],
  },
  // ───────────────────────────── 7
  {
    id: "l7", category: "Theory", title: "The Substitution Method", heading: "The Method of Substitution",
    sub: "Write one variable in terms of the other and put it into the second equation.",
    blocks: [
      { t: "p", s: "Every solution of the pair must satisfy both equations. So if one equation tells us that x = 3 − 2y, then in the other equation we can replace x by 3 − 2y. This leaves only y." },
      { t: "key", title: "Steps of substitution", s: "**Step 1.** Pick one equation and write one variable in terms of the other (choose the one that gives the simplest result, such as a variable with coefficient 1).  **Step 2.** Substitute this in the other equation. It becomes an equation in one variable. Solve it.  **Step 3.** Put the value found into the equation from step 1 to get the other variable.  **Step 4.** Verify the solution in both equations." },
      { t: "ex", title: "Example: 7x − 15y = 2 and x + 2y = 3", q: "Solve the pair by substitution.", steps: [
        "From x + 2y = 3 we get x = 3 − 2y.",
        "Put it in the first equation: 7(3 − 2y) − 15y = 2, so 21 − 14y − 15y = 2, so −29y = −19 and y = 19 ÷ 29.",
        "Then x = 3 − 2 × 19 ÷ 29 = 3 − 38 ÷ 29 = 49 ÷ 29.",
        "Check: 49÷29 + 38÷29 = 87÷29 = 3. Also 7 × 49÷29 − 15 × 19÷29 = (343 − 285)÷29 = 2.",
      ], ans: "x = 49 ÷ 29 and y = 19 ÷ 29." },
      { t: "note", title: "Does the choice of variable matter?", s: "No. Writing y = ½(3 − x) from the second equation and substituting in the first gives the same answer, x = 49 ÷ 29 and y = 19 ÷ 29. The solution of the pair is one fixed point. Only the amount of work changes." },
    ],
  },
  // ───────────────────────────── 8
  {
    id: "l8", category: "Theory", title: "The Elimination Method", heading: "The Method of Elimination",
    sub: "Make the coefficients of one variable equal, then subtract (or add) to remove it.",
    blocks: [
      { t: "p", s: "Sometimes it is easier to remove one of the variables by combining the two equations. Subtracting equal quantities from equal quantities leaves equal quantities, so the new equation is still true for the solution." },
      { t: "key", title: "Steps of elimination", s: "**Step 1.** Decide which variable to remove. Multiply the equations by suitable numbers so that its coefficients in the two equations are **equal** (or equal in size and opposite in sign).  **Step 2.** **Subtract** the equations if the coefficients are equal, or **add** them if they are opposite. One variable is gone. Solve the equation that remains.  **Step 3.** Put the value in one of the original equations to find the other variable.  **Step 4.** Verify in both equations." },
      { t: "ex", title: "Example: the incomes", q: "The incomes of two persons are in the ratio 9 : 7 and their expenditures in the ratio 4 : 3. Each saves ₹2000 a month. Find the incomes.", steps: [
        "Let the incomes be 9x and 7x and the expenditures 4y and 3y. Then 9x − 4y = 2000 (1) and 7x − 3y = 2000 (2).",
        "To remove y, multiply (1) by 3 and (2) by 4: 27x − 12y = 6000 (3) and 28x − 12y = 8000 (4).",
        "Subtract (3) from (4): x = 2000. From (1): 18 000 − 4y = 2000, so y = 4000.",
        "Incomes: 9 × 2000 = ₹18 000 and 7 × 2000 = ₹14 000. Check: expenditures are ₹16 000 and ₹12 000, in the ratio 4 : 3.",
      ], ans: "The incomes are ₹18 000 and ₹14 000." },
      { t: "h", s: "Useful shortcuts" },
      { t: "ul", items: [
        "If the coefficients are swapped (such as 9x + 7y = 107 and 7x + 9y = 101), **add** the equations to get x + y = 13 and **subtract** them to get x − y = 3. Then x = 8 and y = 5.",
        "Use substitution when one coefficient is 1 or −1. Use elimination when the coefficients are awkward numbers.",
        "In both methods, always check the answer in both original equations.",
      ] },
    ],
  },
  // ───────────────────────────── 9
  {
    id: "l9", category: "Theory", title: "How Many Solutions?", heading: "How Many Solutions Does a Pair Have?",
    sub: "Unique, none or infinitely many, and the simple rule with ratios.",
    blocks: [
      { t: "p", s: "Does a pair of linear equations always have exactly one solution? Let us see what elimination tells us. While eliminating a variable, either the other variable remains, or it vanishes too." },
      { t: "h", s: "Case 1: the other variable remains" },
      { t: "p", s: "If after subtracting one variable is still there, we can solve for it, so there is a **unique solution**. For x + y = 25 and x − y = 11 subtracting gives 2y = 14, so y = 7. One solution." },
      { t: "h", s: "Case 2: both variables vanish and 0 = 0" },
      { t: "p", s: "Take x − y = 10 and 10x − 10y = 100. Multiplying the first by 10 gives 10x − 10y = 100. Both equations are the same. Every solution of one is a solution of the other, so there are **infinitely many solutions**." },
      { t: "h", s: "Case 3: both variables vanish and the result is false" },
      { t: "p", s: "Take x − y = 10 and 10x − 10y = 101. Multiplying the first by 10 gives 10x − 10y = 100. The same left side cannot equal both 100 and 101. So there is **no solution**." },
      { t: "key", title: "The rule using ratios", s: "For a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 (with a₂, b₂, c₂ not zero):" },
      { t: "table", head: ["Condition", "Meaning", "Number of solutions"], rows: [
        ["a₁÷a₂ ≠ b₁÷b₂", "one variable remains after elimination", "**Exactly one solution** (unique)"],
        ["a₁÷a₂ = b₁÷b₂ = c₁÷c₂", "one equation is a multiple of the other, a₁ = ka₂, b₁ = kb₂, c₁ = kc₂", "**Infinitely many solutions**"],
        ["a₁÷a₂ = b₁÷b₂ ≠ c₁÷c₂", "left sides are multiples but the constants are not (c₁ ≠ kc₂)", "**No solution**"],
      ] },
      { t: "ul", items: [
        "The three conditions cover every possible pair and never overlap. Because of this, the **converses are also true**: a pair with a unique solution must have a₁÷a₂ ≠ b₁÷b₂, and so on.",
        "A pair of linear equations does **not** always have a solution. Parallel lines give none.",
        "Check for 10x − 5y = 20 and 4x − 2y = 8: 10÷4 = (−5)÷(−2) = 20÷8 = 2.5, so there are infinitely many solutions.",
        "If one of a₂, b₂, c₂ is 0, the ratio is not defined. Then compare the equations directly: they have infinitely many solutions only if one is a constant multiple of the other.",
      ] },
      { t: "ex", title: "Quick check", q: "Without solving, say how many solutions the pair has: 5x − 4y + 8 = 0 and 7x + 6y − 9 = 0.", steps: [
        "a₁÷a₂ = 5÷7 and b₁÷b₂ = (−4)÷6 = −2÷3.",
        "These are different, so we need not look at c.",
      ], ans: "The pair has exactly one solution." },
    ],
  },
  // ───────────────────────────── 10
  {
    id: "l10", category: "Theory", title: "The Graphical Method", heading: "The Graphical Method",
    sub: "Draw both lines. Where they meet is the solution.",
    blocks: [
      { t: "p", s: "A solution of the pair is a point that lies on **both** lines. So we draw the graph of each equation and see how the two lines are placed." },
      { t: "figs", specs: [F.gIntersect("Intersecting lines: one solution"), F.gParallel("Parallel lines: no solution"), F.gCoincident("Coincident lines: infinitely many solutions")] },
      { t: "table", head: ["The two lines", "Number of solutions", "Ratio condition"], rows: [
        ["**Intersect** at one point", "One (the point of intersection)", "a₁÷a₂ ≠ b₁÷b₂"],
        ["**Coincide** (are the same line)", "Infinitely many (every point of the line)", "a₁÷a₂ = b₁÷b₂ = c₁÷c₂"],
        ["Are **parallel**", "None", "a₁÷a₂ = b₁÷b₂ ≠ c₁÷c₂"],
      ] },
      { t: "h", s: "Steps" },
      { t: "ol", items: [
        "Make a table of two or three points for each equation (put x = 0 and y = 0 for quick points).",
        "Plot the points on graph paper and draw both lines with a ruler.",
        "If the lines meet, read the coordinates of the meeting point. Check them in both equations.",
        "If the lines do not meet, they are parallel and there is no solution. If they are on top of each other, there are infinitely many solutions.",
      ] },
      { t: "ex", title: "Example: x + 3y = 6 and 2x − 3y = 12", q: "Solve graphically.", fig: F.gEx11("The lines meet at B(6, 0)"), steps: [
        "x + 3y = 6: the points are (0, 2) and (6, 0).",
        "2x − 3y = 12: the points are (0, −4) and (3, −2).",
        "Plot and join. The lines cross at B(6, 0).",
        "Check: 6 + 0 = 6 and 12 − 0 = 12.",
      ], ans: "x = 6 and y = 0. The pair has a unique solution." },
      { t: "note", title: "A graph only gives exact answers for easy points", s: "If the meeting point has fractional coordinates, such as (8 ÷ 3, 2 ÷ 3) for 2x + y = 6 and x − y = 2, a graph can only show it approximately. Use the algebraic methods to find the exact value." },
    ],
  },
  // ───────────────────────────── 11
  {
    id: "l11", category: "Theory", title: "Word Problems", heading: "Solving Word Problems",
    sub: "A plan that works for numbers, digits, fractions, ages, money and speed.",
    blocks: [
      { t: "ol", items: [
        "**Read** the problem and underline what is asked.",
        "**Name** the unknowns (x and y) and note what each stands for.",
        "**Write two equations**, one from each fact.",
        "**Solve** by substitution, elimination or a graph.",
        "**Check** the answer in the story, not only in the equations. For example, an age or the number of notes must be a sensible whole number.",
        "**Answer** in a full sentence with the units.",
      ] },
      { t: "table", head: ["Type", "How to set up"], rows: [
        ["**Two numbers**", "Sum: x + y = s. Difference: x − y = d. \"One is three times the other\": x = 3y."],
        ["**Two-digit number**", "Tens digit x, units digit y. The number is 10x + y. Reversed: 10y + x."],
        ["**Fractions**", "Let the fraction be x ÷ y. \"2 added to both\" gives (x + 2) ÷ (y + 2). Cross-multiply to remove the fractions."],
        ["**Ages**", "Present ages x and y. n years ago: x − n and y − n. After n years: x + n and y + n."],
        ["**Money, notes, tickets**", "One equation counts the items (x + y = 25 notes) and one counts the money (50x + 100y = 2000)."],
        ["**Fixed plus per unit**", "Cost = fixed charge + rate × quantity (taxi fare, library fine, phone plan)."],
        ["**Speed, time, distance**", "Distance = speed × time. When speed or time changes, the distance stays the same."],
        ["**Geometry**", "Angle sum of a triangle is 180°. Opposite angles of a cyclic quadrilateral add up to 180°. Half the perimeter of a rectangle is length + width."],
      ] },
      { t: "ex", title: "Example: ages", q: "Five years ago Nuri was thrice as old as Sonu. Ten years later Nuri will be twice as old as Sonu. Find their ages.", steps: [
        "Let Nuri be N and Sonu S. Five years ago: N − 5 = 3(S − 5), so N = 3S − 10.",
        "Ten years later: N + 10 = 2(S + 10), so N = 2S + 10.",
        "Equate: 3S − 10 = 2S + 10, so S = 20 and N = 50.",
        "Check: five years ago 45 and 15 (45 = 3 × 15). After ten years 60 and 30 (60 = 2 × 30).",
      ], ans: "Nuri is 50 years old and Sonu is 20." },
      { t: "ex", title: "Example: a train", q: "A train takes 6 hours less if its speed is 6 km per hour more, and 6 hours more if its speed is 4 km per hour less. Find the distance and the speed.", steps: [
        "Speed v, time t, distance vt. From (v + 6)(t − 6) = vt: t − v = 6. From (v − 4)(t + 6) = vt: 3v − 2t = 12.",
        "Put t = v + 6: 3v − 2v − 12 = 12, so v = 24 and t = 30.",
        "Distance = 24 × 30 = 720 km.",
      ], ans: "Speed 24 km per hour and distance 720 km." },
    ],
  },
  // ───────────────────────────── 12 SOLVED EXAMPLES
  {
    id: "l12", category: "Solved Examples", title: "Solved Examples: Equations and Graphs", heading: "Solved Examples: Equations, Solutions and Graphs",
    sub: "Standard form, solutions, intercepts and unknown constants.",
    blocks: [
      { t: "ex", title: "Example 1: standard form", q: "Write 4 = 1.5x − 1.3y and 3y = 5 in the form ax + by + c = 0 and give a, b, c.", steps: [
        "4 = 1.5x − 1.3y becomes 1.5x − 1.3y − 4 = 0. So a = 1.5, b = −1.3, c = −4.",
        "3y = 5 becomes 0 × x + 3y − 5 = 0. So a = 0, b = 3, c = −5.",
      ], ans: "(1.5, −1.3, −4) and (0, 3, −5)." },
      { t: "ex", title: "Example 2: is a pair a solution?", q: "Is (4, 3) a solution of 5x − 6y = 2? Is (1, 3) a solution of 3x + 2y = 12?", steps: [
        "5(4) − 6(3) = 20 − 18 = 2. Yes.",
        "3(1) + 2(3) = 9, not 12. No.",
      ], ans: "(4, 3) is a solution. (1, 3) is not." },
      { t: "ex", title: "Example 3: unknown constants", q: "If (2, −1) is a solution of both 2mx + 3y = 7 and 4x + ny = −10, find m and n.", steps: [
        "First: 2m(2) + 3(−1) = 7, so 4m = 10 and m = 5 ÷ 2.",
        "Second: 4(2) + n(−1) = −10, so 8 − n = −10 and n = 18.",
      ], ans: "m = 5 ÷ 2 and n = 18." },
      { t: "ex", title: "Example 4: draw 2x + y = 7", q: "Find two solutions of 2x + y = 7, draw the graph and read four more solutions.", fig: F.g2xy7("Graph of 2x + y = 7"), steps: [
        "x = 0 gives y = 7. y = 0 gives x = 3.5. So (0, 7) and (3.5, 0).",
        "Draw the line through them. From the graph, (1, 5), (2, 3), (3, 1) and (1.5, 4) lie on it.",
      ], ans: "(0, 7), (3.5, 0) and four more: (1, 5), (2, 3), (3, 1), (1.5, 4)." },
      { t: "ex", title: "Example 5: points in different quadrants", q: "Find two solutions of 5x + 3y = 7 that lie in different quadrants.", steps: [
        "x = 2: 10 + 3y = 7, so y = −1. The point (2, −1) is in quadrant IV.",
        "x = −1: −5 + 3y = 7, so y = 4. The point (−1, 4) is in quadrant II.",
      ], ans: "(2, −1) in quadrant IV and (−1, 4) in quadrant II." },
      { t: "ex", title: "Example 6: equivalent equations", q: "Show that 3x + 4y = 7 and 6x + 8y = 14 have the same solutions.", steps: [
        "The second equation is 2 times the first.",
        "If 3p + 4q = 7, then 6p + 8q = 14. If 6p + 8q = 14, dividing by 2 gives 3p + 4q = 7.",
      ], ans: "Every solution of one is a solution of the other." },
    ],
  },
  // ───────────────────────────── 13
  {
    id: "l13", category: "Solved Examples", title: "Solved Examples: Slope", heading: "Solved Examples: Slope and Intercepts",
    sub: "Slope from two points, from a figure and from an equation.",
    blocks: [
      { t: "ex", title: "Example 1: slope from two points", q: "Find the slope of the line through A(−1, 0), B(1, 2) and C(4, 5).", fig: F.gEx5("Example"), steps: [
        "Take B(1, 2) and C(4, 5). Rise = 5 − 2 = 3 and run = 4 − 1 = 3.",
        "Slope = 3 ÷ 3 = 1. The points A and B give (2 − 0) ÷ (1 + 1) = 1 as well.",
      ], ans: "The slope is 1." },
      { t: "ex", title: "Example 2: negative slope", q: "Find the slope of the line through A(−4, 5) and B(−1, 2).", fig: F.gEx6("Example"), steps: [
        "Slope = (2 − 5) ÷ (−1 − (−4)) = −3 ÷ 3 = −1.",
        "Taking B first gives (5 − 2) ÷ (−4 + 1) = 3 ÷ (−3) = −1.",
      ], ans: "The slope is −1." },
      { t: "ex", title: "Example 3: ramps and hills", q: "A ramp rises 2.5 m over a run of 4 m. A second ramp rises 60 m over 70 m. Which is steeper?", steps: [
        "First slope: 2.5 ÷ 4 = 0.625.",
        "Second slope: 60 ÷ 70 ≈ 0.857.",
      ], ans: "The second ramp is steeper." },
      { t: "ex", title: "Example 4: slope and intercept from the equation", q: "Find the slope and the y-intercept of 3x + 2y = 12 and of 5x + y = 3.", steps: [
        "3x + 2y = 12 gives y = −(3 ÷ 2)x + 6. Slope = −3 ÷ 2, y-intercept = 6.",
        "5x + y = 3 gives y = −5x + 3. Slope = −5, y-intercept = 3.",
      ], ans: "Slopes −3÷2 and −5; y-intercepts 6 and 3." },
      { t: "ex", title: "Example 5: a point on a line", q: "A line passes through A(2, 0) and B(4, 3). Find the y-coordinate of the point of the line with x = 8.", steps: [
        "Slope = (3 − 0) ÷ (4 − 2) = 3 ÷ 2.",
        "From A(2, 0) the run to x = 8 is 6, so the rise is (3 ÷ 2) × 6 = 9.",
      ], ans: "y = 9, so the point is (8, 9)." },
      { t: "ex", title: "Example 6: the wheelchair ramp", q: "The slope of a ramp must be 1 cm of rise for every 12 cm of horizontal length. What horizontal length is needed for 18 cm of height?", steps: [
        "Run = rise ÷ slope = 18 ÷ (1 ÷ 12) = 18 × 12 = 216 cm.",
      ], ans: "216 cm." },
    ],
  },
  // ───────────────────────────── 14
  {
    id: "l14", category: "Solved Examples", title: "Solved Examples: Pairs of Equations", heading: "Solved Examples: Pairs of Linear Equations",
    sub: "Substitution, elimination, nature of the solution and word problems.",
    blocks: [
      { t: "ex", title: "Example 1: angles of a triangle", q: "Two angles of a triangle are x° and y° with y = 4x. The third angle is 50°. Find the angles.", steps: [
        "x + y + 50 = 180 and y = 4x.",
        "Substitute: 5x + 50 = 180, so x = 26 and y = 104.",
      ], ans: "26°, 104° and 50°." },
      { t: "ex", title: "Example 2: two-digit number", q: "The sum of a two-digit number and the number with its digits reversed is 66. The digits differ by 2. Find the number.", steps: [
        "Let the tens digit be x and the units digit y with x larger. (10x + y) + (10y + x) = 66 gives x + y = 6.",
        "x − y = 2. Adding: 2x = 8, so x = 4 and y = 2.",
      ], ans: "The number is 42 (the number 24 also fits, with the smaller digit in the tens place)." },
      { t: "ex", title: "Example 3: swapped coefficients", q: "9 citrons and 7 wood-apples cost 107. 7 citrons and 9 wood-apples cost 101. Find each price.", steps: [
        "Add: 16x + 16y = 208, so x + y = 13.",
        "Subtract: 2x − 2y = 6, so x − y = 3.",
        "So x = 8 and y = 5.",
      ], ans: "A citron costs 8 and a wood-apple costs 5." },
      { t: "ex", title: "Example 4: nature of the solution", q: "Decide for each pair: (i) 9x + 3y + 12 = 0 and 18x + 6y + 24 = 0, (ii) 6x − 3y + 10 = 0 and 2x − y + 9 = 0.", steps: [
        "(i) 9÷18 = 3÷6 = 12÷24 = ½. All three ratios are equal.",
        "(ii) 6÷2 = 3 and (−3)÷(−1) = 3, but 10÷9 is not 3.",
      ], ans: "(i) coincident lines, infinitely many solutions. (ii) parallel lines, no solution." },
      { t: "ex", title: "Example 5: a taxi", q: "A taxi charges a fixed amount plus a rate per km. 10 km costs ₹155 and 15 km costs ₹220. Find the fixed charge, the rate and the fare for 25 km.", steps: [
        "F + 10k = 155 and F + 15k = 220. Subtract: 5k = 65, so k = 13.",
        "F = 155 − 130 = 25. For 25 km: 25 + 13 × 25 = 350.",
      ], ans: "Fixed charge ₹25, ₹13 per km, fare ₹350." },
      { t: "ex", title: "Example 6: a missing constant", q: "Find k for which x + 2y = 3 and (k − 1)x + (k + 1)y = k + 3 are coincident lines.", steps: [
        "1 ÷ (k − 1) = 2 ÷ (k + 1) = 3 ÷ (k + 3).",
        "From the first two, k + 1 = 2k − 2, so k = 3. Check the third: 1÷2 = 2÷4 = 3÷6.",
      ], ans: "k = 3." },
      { t: "ex", title: "Example 7: mobile plans", q: "Plan A: ₹50 + ₹0.20 per minute. Plan B: ₹30 + ₹0.30 per minute. For how many minutes do they cost the same?", steps: [
        "50 + 0.2m = 30 + 0.3m, so 20 = 0.1m and m = 200.",
        "Both cost ₹90 at 200 minutes. For more than 200 minutes Plan A is cheaper.",
      ], ans: "They cost the same at 200 minutes." },
    ],
  },
  // ───────────────────────────── 15 REVISION
  {
    id: "l15", category: "Revision", title: "Revision and Mind Map", heading: "Revision: Mind Map, Formulas and Common Mistakes",
    sub: "Five steps and the three cases of a pair, on one page.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "Formulas to remember" },
      { t: "table", head: ["Topic", "Formula or rule"], rows: [
        ["Standard form", "ax + by + c = 0 (a, b not both 0)"],
        ["Slope of a line", "m = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁)"],
        ["Slope-intercept form", "y = mx + d. From ax + by + c = 0: m = −a ÷ b, d = −c ÷ b"],
        ["Intercepts", "y-intercept: put x = 0. x-intercept: put y = 0 (for y = mx + d it is −d ÷ m)"],
        ["Special lines", "y = k is horizontal (slope 0). x = k is vertical (slope undefined). c = 0 means the line passes through the origin."],
        ["Unique solution", "a₁÷a₂ ≠ b₁÷b₂ (lines intersect)"],
        ["Infinitely many solutions", "a₁÷a₂ = b₁÷b₂ = c₁÷c₂ (lines coincide)"],
        ["No solution", "a₁÷a₂ = b₁÷b₂ ≠ c₁÷c₂ (lines are parallel)"],
        ["Equal slopes", "Two different lines with the same slope are parallel"],
      ] },
      { t: "h", s: "Common mistakes" },
      { t: "ul", items: [
        "Forgetting that the standard form has **0 on the right side**, so c carries its sign. In 5x + 2y = 2.7 the constant is −2.7, not 2.7.",
        "Writing the point as (y, x). The **x-value comes first**.",
        "Taking the rise and the run from different orders of points. Use (y₂ − y₁) ÷ (x₂ − x₁) with the same point first in both.",
        "Believing that every pair of equations has a solution. **Parallel lines give none.**",
        "Checking c₁÷c₂ without first comparing a₁÷a₂ and b₁÷b₂.",
        "Not checking the answer in the **story**. Ages and numbers of notes must be sensible whole numbers.",
        "Mixing up the quantities in a word problem, such as writing p = 2t when the notebook (t) costs twice the pen (p).",
      ] },
    ],
  },
];
