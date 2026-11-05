import type { NTopic } from "./circles9Notes";
import * as F from "./props9Figs";

// Class IX Maths (Ganita Manjari, Part II): Propositions and their Converses.
// Order of the notes: first the theory (definitions, rules and proofs), then the solved examples, then the revision.
// **bold** inside a string makes bold text. A slash is avoided in the text because some screens show it as a fraction.

export const PROPS9_BRANCHES = [
  { title: "1. Proposition", color: "#2563eb", lines: ["A statement, true or false", "Not: question, order, opinion", "Form: if X then Y", "X implies Y, or Y when X"] },
  { title: "2. Parts", color: "#0f766e", lines: ["X is the hypothesis (condition)", "Y is the conclusion (result)", "The setup sentence stays as it is", "Any statement can be put in if-then"] },
  { title: "3. Converse", color: "#b45309", lines: ["if X then Y becomes if Y then X", "Only swap. Never add 'not'", "Converse of converse = original", "Check the converse separately"] },
  { title: "4. Four cases", color: "#7c3aed", lines: ["True and true: imply each other", "True and false: very common", "False and true: roles exchanged", "False and false: also possible"] },
  { title: "5. Counterexample", color: "#be123c", lines: ["Satisfies X but breaks Y", "One is enough to disprove", "Many examples never prove", "Fermat and Euler: 2³² + 1"] },
  { title: "6. Geometry pairs", color: "#0369a1", lines: ["Isosceles pair: both true (AAS)", "Pythagoras pair: both true (SSS)", "Same area does not mean congruent", "Equal angles do not give a square"] },
  { title: "7. Number pairs", color: "#15803d", lines: ["Odd factors if and only if square", "Div by 6 gives div by 3, not back", "60: 5 and 12 work both ways", "24: 4 and 6 fail, 12 is the proof"] },
  { title: "8. Uses", color: "#a21caf", lines: ["Equations: add the same, cancel", "Squaring is not reversible", "A test needs both directions", "a² + b² = c² tests a right angle"] },
];

export const PROPS9_TOPICS: NTopic[] = [
  // ───────────────────────────── 1 THEORY
  {
    id: "p1", category: "Theory", title: "What is a Proposition?", heading: "Propositions",
    sub: "Statements that are true or false, and the if-then form.",
    blocks: [
      { t: "p", s: "In mathematics we keep making claims about numbers and shapes. \"The angles of a triangle add up to 180°.\" \"Every prime number is odd.\" Before we use a claim we must know whether it is right or wrong. So we first decide which kind of sentence can be checked at all." },
      { t: "key", title: "Proposition", s: "A **proposition** is a statement that is **either true or false**. It cannot be both, and it cannot be neither." },
      { t: "h", s: "What is not a proposition" },
      { t: "ul", items: [
        "A **question**, such as \"Is 9 a perfect square?\". A question is not called true or false.",
        "A **command or request**, such as \"Draw a circle of radius 3 cm.\"",
        "An **exclamation**, such as \"What a big number!\"",
        "An **opinion** that changes from person to person, such as \"Maths is easy.\"",
        "A sentence with an **unknown whose value is not fixed**, such as \"x + 2 = 5\". It is true for x = 3 and false for every other value. It becomes a proposition when we say which x we mean, or when we say \"for every x\".",
      ] },
      { t: "p", s: "A proposition can be false and still be a proposition. \"Every prime number is odd\" is false, because 2 is prime and even, but we are able to say that it is false. That is all a proposition needs." },
      { t: "h", s: "The if-then form" },
      { t: "p", s: "Most propositions in mathematics are written as \"if X then Y\". The two parts have names." },
      { t: "key", title: "Hypothesis and conclusion", s: "In the proposition **\"if X then Y\"**, X is the **hypothesis**. It is the condition we start with (the given). Y is the **conclusion**. It is the result we say follows." },
      { t: "ul", items: [
        "\"If X then Y\" is also written **\"X implies Y\"**. Both mean the same thing, and the book uses both.",
        "The same meaning can be said in other words: **\"Y when X\"**, **\"Y if X\"**, **\"Whenever X, Y\"**. In each of these, X is the condition and Y is the result.",
        "A statement that is not in the if-then form can be rewritten in it. \"The diagonals of a rectangle are equal\" becomes \"If a quadrilateral is a rectangle, then its diagonals are equal.\"",
        "A true proposition that has been proved is called a **theorem**.",
      ] },
      { t: "table", head: ["Wording", "Same meaning in if-then form"], rows: [
        ["X implies Y", "If X, then Y"],
        ["Y when X", "If X, then Y"],
        ["Y if X", "If X, then Y"],
        ["Whenever X, Y", "If X, then Y"],
      ] },
      { t: "note", title: "Watch the word \"when\"", s: "In \"Y when X\", the word \"when\" goes with X. Read \"A number has an odd number of factors when it is a perfect square\". The condition X is \"it is a perfect square\" and the result Y is \"it has an odd number of factors\". So the if-then form is: if a number is a perfect square, then it has an odd number of factors." },
    ],
  },
  // ───────────────────────────── 2 THEORY
  {
    id: "p2", category: "Theory", title: "The Converse of a Proposition", heading: "The Converse of a Proposition",
    sub: "Swap the condition and the result to get a new proposition.",
    blocks: [
      { t: "p", s: "Take the proposition \"if X then Y\". Now interchange the two parts, so that Y becomes the condition and X becomes the result. This gives a new proposition. It is a different statement and it can say something quite different." },
      { t: "key", title: "Converse", s: "The **converse** of the proposition **\"if X then Y\"** is the proposition **\"if Y then X\"**. The two propositions are called **converses of each other**." },
      { t: "table", head: ["Proposition", "Its converse"], rows: [
        ["If X then Y", "If Y then X"],
        ["X implies Y", "Y implies X"],
        ["Y when X", "X when Y"],
      ] },
      { t: "h", s: "How to write the converse" },
      { t: "ol", items: [
        "Put the proposition in the form \"if X then Y\" and find X and Y.",
        "Write \"if Y then X\".",
        "Keep everything else as it was. If the statement begins with a setup sentence, such as \"Let a, b, c be the lengths of the sides of a triangle\", keep that sentence unchanged and swap only the \"if\" part and the \"then\" part.",
        "Read the new sentence once more. It must still be a proper statement and make sense.",
      ] },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "The converse of the converse is the original proposition. So the two always come as a pair.",
        "The converse is **not** the \"opposite\" or the negative of the statement. We do not write \"not\" anywhere. We only change the order of the two parts.",
        "Writing the converse does not tell us whether the converse is true. It is a new proposition and its truth has to be decided on its own.",
      ] },
      { t: "key", title: "If and only if", s: "If a proposition **and** its converse are both true, then X and Y **imply each other**. Mathematicians say that X is true **if and only if** Y is true. You will use this phrase in higher classes. For now it is enough to say \"each one implies the other\"." },
    ],
  },
  // ───────────────────────────── 3 THEORY
  {
    id: "p3", category: "Theory", title: "Is the Converse True? Counterexamples", heading: "Is the Converse Always True?",
    sub: "A true proposition can have a false converse. We prove or disprove each one separately.",
    blocks: [
      { t: "p", s: "Here is the main question of this chapter. If a proposition is true, is its converse always true? The answer is **no**. The truth of one does not decide the truth of the other. When we write a proposition and its converse, four things can happen." },
      { t: "table", head: ["Case", "Proposition", "Converse", "What it means"], rows: [
        ["1", "True", "True", "The two statements imply each other."],
        ["2", "True", "False", "This is very common. The result can also come from other conditions."],
        ["3", "False", "True", "Same as case 2 with the two statements exchanged."],
        ["4", "False", "False", "Both fail. This can also happen."],
      ] },
      { t: "h", s: "Proving and disproving" },
      { t: "ul", items: [
        "To show that a proposition is **true**, we need an argument (a proof) that works for **every** case that satisfies the condition. Checking a few cases is not a proof.",
        "To show that a proposition is **false**, **one** case is enough, as long as it satisfies the condition and breaks the conclusion.",
      ] },
      { t: "key", title: "Counterexample", s: "An example that **satisfies the condition X but does not satisfy the conclusion Y** is called a **counterexample**. It contradicts the proposition and so shows that the proposition is false." },
      { t: "ul", items: [
        "A counterexample must have \"X true\" and \"Y false\" **at the same time**. A case in which X itself is false proves nothing.",
        "One counterexample is enough. A hundred examples that agree with a proposition do not prove it.",
        "A good counterexample is small and easy to check.",
      ] },
      { t: "h", s: "Method to decide a proposition" },
      { t: "ol", items: [
        "Write the proposition in the form \"if X then Y\".",
        "Try small and special cases.",
        "If some case satisfies X but not Y, stop. That case is a counterexample and the proposition is false.",
        "If no case fails, look for a reason that works for all cases and write a proof.",
        "Do the whole thing again for the converse. Never assume the converse from the proposition.",
      ] },
      { t: "h", s: "A warning from history" },
      { t: "p", s: "Examples can mislead even great mathematicians. Fermat noticed that the numbers of the form 2²ⁿ + 1 are prime for n = 0, 1, 2, 3 and 4. These numbers are 3, 5, 17, 257 and 65 537. He claimed that every number of this form is prime. Later Euler showed that for n = 5 the number 2³² + 1 = 4 294 967 297 is **not** prime. It equals 641 × 6 700 417. Five correct cases did not make the claim true, and one counterexample ended it." },
      { t: "note", title: "Reading an argument", s: "A chain of reasoning \"X implies Z, and Z implies W\" proves only \"if X then W\". It says nothing about \"if W then X\". So when you read or write a proof, always ask which direction it has proved. The next topics show this with a real example." },
    ],
  },
  // ───────────────────────────── 4 THEORY
  {
    id: "p4", category: "Theory", title: "Two Pairs from Geometry", heading: "Two Theorems and Their Converses (Geometry)",
    sub: "In both pairs the converse is true, but each needed its own proof.",
    blocks: [
      { t: "p", s: "Some theorems you have met in earlier classes also have converses. Here are two of them. In both, the converse turns out to be true, but we cannot say that before we have proved it." },
      { t: "proof", title: "The isosceles triangle theorem and its converse",
        statement: "**Statement 1:** If two sides of a triangle are equal, then the angles opposite the equal sides are equal. (This was proved in an earlier grade.) **Statement 2 (converse):** If two angles of a triangle are equal, then the sides opposite the equal angles are equal.",
        given: "In △ABC, ∠B = ∠C.", show: "AB = AC.",
        figs: [F.isoTri("Statement 1: AB = AC"), F.isoConverse("Statement 2: ∠B = ∠C")],
        steps: [
          "Draw the altitude AD from A to the side BC. So ∠ADB = ∠ADC = 90°.",
          "In △ABD and △ACD: ∠B = ∠C (given), ∠ADB = ∠ADC (both 90°) and AD = AD (common side).",
          "So △ABD ≅ △ACD by the AAS criterion.",
          "Therefore AB = AC, as they are corresponding sides of congruent triangles.",
        ],
        end: "Both statements are true. A triangle has two equal sides if and only if it has two equal angles opposite them." },
      { t: "proof", title: "The Baudhāyana–Pythagoras theorem and its converse",
        statement: "**Theorem:** Let a, b, c be the lengths of the sides of a triangle. If the triangle is right-angled, then a² + b² = c². **Converse:** Let a, b, c be the lengths of the sides of a triangle. If a² + b² = c², then the triangle is right-angled.",
        given: "△ABC has sides BC = a, CA = b, AB = c with a² + b² = c².", show: "The triangle is right-angled (the right angle is ∠C, opposite the side c).",
        figs: [F.pythTri("△ABC"), F.pythRight("△XYZ")],
        steps: [
          "Construct a right-angled triangle XYZ with ∠Z = 90°, YZ = a and XZ = b.",
          "By the Baudhāyana–Pythagoras theorem applied to △XYZ, XY² = a² + b².",
          "But a² + b² = c² (given). So XY² = c², which gives XY = c.",
          "Now BC = YZ = a, CA = ZX = b and AB = XY = c. So △ABC ≅ △XYZ by the SSS criterion.",
          "Hence ∠C = ∠Z = 90°.",
        ],
        end: "So a triangle with sides a, b, c is right-angled if and only if a² + b² = c². The right angle is opposite the side whose square equals the sum of the other two squares." },
      { t: "note", title: "Notice the setup sentence", s: "The theorem begins with \"Let a, b, c be the lengths of the sides of a triangle\". In the converse this sentence is kept as it was. Only the \"if\" part and the \"then\" part have changed places." },
    ],
  },
  // ───────────────────────────── 5 THEORY
  {
    id: "p5", category: "Theory", title: "Factors, Squares and Divisibility", heading: "Factors, Perfect Squares and Divisibility",
    sub: "Number facts that give propositions whose converses we have to check.",
    blocks: [
      { t: "h", s: "Factor pairs" },
      { t: "p", s: "Every factor of a number has a **partner factor**, and the product of the two is the number. For 35 the factor 5 has the partner 7, because 5 × 7 = 35. For 12 the factor pairs are (1, 12), (2, 6) and (3, 4). In a pair like (5, 5) for 25 the partner of the factor is the factor itself." },
      { t: "proof", title: "A number has an odd number of factors if and only if it is a perfect square",
        statement: "**P:** If n is a perfect square, then n has an odd number of factors. **Q:** If n has an odd number of factors, then n is a perfect square.",
        given: "n is a positive integer. Write each factor together with its partner.", show: "P and Q are both true.",
        steps: [
          "**Proof of Q.** Suppose n has an odd number of factors. If every pair had two different factors, the factors would go in twos and the total would be even. So some pair has the same factor twice, say (f, f). Then n = f × f is a perfect square.",
          "**Why the argument above does not prove P.** It starts from \"odd number of factors\" and ends at \"perfect square\". It proves Q only. For P we must start from the perfect square.",
          "**Proof of P.** Let n = f × f. Then (f, f) is one pair with a repeated factor. There cannot be a second such pair (g, g), because g × g = f × f gives g = f. So all other pairs have two different factors.",
          "Each of those pairs gives 2 factors, and the pair (f, f) gives only 1 factor. So the total is (an even number) + 1, which is **odd**.",
        ],
        end: "Hence a number is a perfect square if and only if it has an odd number of factors." },
      { t: "h", s: "Divisibility facts" },
      { t: "key", title: "Product rule for divisibility", s: "If a number is divisible by a product bc, then it is divisible by b **and** by c. This is always true, because n = bc × k = b × (ck) = c × (bk)." },
      { t: "key", title: "Its converse needs a condition", s: "The converse is: if a number is divisible by b and by c, then it is divisible by bc. This is **true when b and c have no common factor other than 1**, and it can be **false** when they have one." },
      { t: "proof", title: "Why the converse works when b and c have no common factor",
        statement: "If b and c have no common factor other than 1, and n is divisible by both b and c, then n is divisible by bc.",
        given: "b and c have no common factor except 1. n = b × m and c divides n.", show: "bc divides n.",
        steps: [
          "Since c divides b × m and c has no factor in common with b, every prime factor of c must come from m. So c divides m.",
          "Write m = c × r. Then n = b × c × r.",
        ],
        end: "So n is divisible by bc. If b and c share a factor, this reasoning breaks down. For instance 4 and 6 share the factor 2, and 12 is divisible by both 4 and 6 but not by 4 × 6 = 24." },
      { t: "ul", items: [
        "So \"check divisibility by 4 and 6\" is **not** a test for 24, and \"check divisibility by 2 and 4\" is **not** a test for 8.",
        "\"Check divisibility by 5 and 12\" **is** a test for 60, and \"check 2 and 3\" **is** a test for 6, because the two numbers have no common factor other than 1.",
        "Any common factor of n and n + 3 divides their difference 3. So the only possible common factors are 1 and 3.",
      ] },
    ],
  },
  // ───────────────────────────── 6 THEORY
  {
    id: "p6", category: "Theory", title: "Why Converses Matter", heading: "Where Propositions and Converses Are Used",
    sub: "Equations, tests and constructions all depend on knowing which way a statement works.",
    blocks: [
      { t: "key", title: "Enough and sure test", s: "If \"if X then Y\" is true, then X is **enough** to be sure of Y. If the converse is also true, then Y is **enough to be sure of X** as well, and so Y can be used as a **test** for X." },
      { t: "h", s: "In solving equations" },
      { t: "ul", items: [
        "\"If x = y then a + x = a + y\" lets us add the same number to both sides. Its converse, \"if a + x = a + y then x = y\", lets us cancel the same number from both sides. Both are true, and we use both while solving equations.",
        "\"If x = y then x² = y²\" is true, but its converse is false (x and y may have opposite signs). So squaring both sides is **not reversible**. After squaring, an answer must be checked in the original equation, because new answers may have appeared.",
        "\"If x = y then x³ = y³\" is true and so is its converse, for real numbers. Taking cube roots does not create new answers.",
      ] },
      { t: "h", s: "In tests" },
      { t: "ul", items: [
        "A good test works in **both** directions. The test for 3 (the sum of the digits is a multiple of 3) is good because \"divisible by 3 gives digit sum a multiple of 3\" and its converse are both true.",
        "The test \"a² + b² = c²\" is used by carpenters and builders to check a right angle. It works because the converse of the Baudhāyana–Pythagoras theorem is true.",
      ] },
      { t: "h", s: "In constructions" },
      { t: "p", s: "Suppose two thin sticks are crossed to be the diagonals of a quadrilateral, and the ends are joined (Fig. 9.2). If a type Q of quadrilateral always has equal diagonals, then equal sticks are **necessary**. But equal sticks alone may not give type Q. If, on the other hand, every quadrilateral with equal diagonals is of type Q, then equal sticks are **enough**, however they cross." },
      { t: "fig", spec: F.sticks("Fig. 9.2: two sticks as the diagonals") },
      { t: "h", s: "Common mistakes" },
      { t: "ul", items: [
        "Thinking the converse must be true because the proposition is true.",
        "Giving an example that agrees with the proposition and calling it a proof.",
        "Giving a \"counterexample\" in which the condition X is not satisfied.",
        "Writing \"not\" while forming the converse, or changing the setup sentence.",
        "Treating a question, a command or an opinion as a proposition.",
      ] },
    ],
  },
  // ───────────────────────────── 7 EXAMPLES
  {
    id: "p7", category: "Solved Examples", title: "Solved Examples: Numbers and Algebra", heading: "Solved Examples (Numbers and Algebra)",
    sub: "Frame the converse, then decide each statement with a proof or a counterexample.",
    blocks: [
      { t: "ex", title: "Example 1", q: "Proposition P: If it rains, then the road is wet. Write the converse Q. Is Q true?", steps: [
        "X is \"it rains\" and Y is \"the road is wet\".",
        "Converse Q: If the road is wet, then it has rained.",
        "P is true. But a road can be wet in other ways. A water tanker may have spilled water on it, or a pipe may have burst.",
        "In such a case the condition of Q (the road is wet) holds and the conclusion (it has rained) does not. This is a counterexample.",
      ], ans: "Q: If the road is wet, then it has rained. Q is false although P is true." },
      { t: "ex", title: "Example 2", q: "P: If a number is a multiple of 6, then it is a multiple of 3. Justify P. Write the converse Q and decide whether Q is true.", steps: [
        "Let the number be 6k, where k is a whole number.",
        "6k = 3 × (2k), so the number is a multiple of 3. So P is true.",
        "Converse Q: If a number is a multiple of 3, then it is a multiple of 6.",
        "Take 9. It is 3 × 3, a multiple of 3. But 9 ÷ 6 is not a whole number. So 9 is a counterexample.",
      ], ans: "P is true. Q is false (counterexample: 9)." },
      { t: "ex", title: "Example 3", q: "P: If n is even, then n² is even. Write the converse and decide both.", steps: [
        "P: let n = 2k. Then n² = 4k² = 2 × (2k²), which is even. So P is true.",
        "Converse Q: If n² is even, then n is even.",
        "Suppose n were odd, n = 2k + 1. Then n² = 4k² + 4k + 1 = 2 × (2k² + 2k) + 1, which is odd.",
        "So an odd n can never give an even n². Hence if n² is even, n has to be even. Q is true.",
      ], ans: "Both P and Q are true. So n is even if and only if n² is even." },
      { t: "ex", title: "Example 4", q: "P: If a number is odd, then it is prime. Write the converse Q. Decide P and Q.", steps: [
        "P is false. The number 9 is odd and it is not prime (9 = 3 × 3). So is 15.",
        "Converse Q: If a number is prime, then it is odd.",
        "Q is also false. The number 2 is prime but it is even.",
      ], ans: "Both P and Q are false (counterexamples: 9 for P and 2 for Q). So a proposition and its converse can both be false." },
      { t: "ex", title: "Example 5", q: "P: If x = y, then x² = y² (x and y are real numbers). Write the converse and decide both. What does this say about squaring both sides of an equation?", steps: [
        "P is true. If x and y are the same number, their squares are the same.",
        "Converse Q: If x² = y², then x = y.",
        "Take x = 5 and y = −5. Then x² = 25 = y², but x ≠ y. So Q is false.",
        "Squaring both sides can therefore bring in an answer that the original equation did not have. Every answer has to be checked in the original equation.",
      ], ans: "P is true and Q is false (x = 5, y = −5). Squaring is not a reversible step." },
      { t: "ex", title: "Example 6", q: "Show that the claim \"n² + n + 11 is a prime number for every positive integer n\" is false.", steps: [
        "Try small values. n = 1 gives 13, n = 2 gives 17, n = 3 gives 23, n = 4 gives 31, n = 5 gives 41. All are prime.",
        "Continue. n = 6 gives 53, n = 7 gives 67, n = 8 gives 83 and n = 9 gives 101. All prime again.",
        "Now n = 10 gives 100 + 10 + 11 = 121 = 11 × 11, which is not prime.",
      ], ans: "n = 10 is a counterexample. Nine correct cases did not make the claim true." },
      { t: "ex", title: "Example 7", q: "P: If a number is divisible by 10, then it is divisible by 2 and by 5. Decide P and its converse.", steps: [
        "P: n = 10k = 2 × (5k) = 5 × (2k). So P is true.",
        "Converse Q: If a number is divisible by 2 and by 5, then it is divisible by 10.",
        "Let n = 2a. Since 5 divides 2a and 5 has no factor in common with 2, 5 divides a. Write a = 5b. Then n = 10b.",
        "So Q is true. (This is the rule for numbers which have no common factor.)",
      ], ans: "P and Q are both true." },
      { t: "ex", title: "Example 8", q: "To test whether a number is divisible by (a) 36 and (b) 24, a student only checks divisibility by 4 and 9 in (a), and by 4 and 6 in (b). Is this enough in each case?", steps: [
        "(a) 4 and 9 have no common factor other than 1. A number divisible by both is divisible by 4 × 9 = 36. So the check is enough.",
        "(b) 4 and 6 have the common factor 2. The number 12 is divisible by 4 and by 6 but not by 24. So the check is not enough.",
      ], ans: "(a) Enough. (b) Not enough, 12 is a counterexample." },
    ],
  },
  // ───────────────────────────── 8 EXAMPLES
  {
    id: "p8", category: "Solved Examples", title: "Solved Examples: Geometry and Daily Life", heading: "Solved Examples (Geometry and Daily Life)",
    sub: "The same method for shapes, and for statements from everyday life.",
    blocks: [
      { t: "ex", title: "Example 9", q: "In △PQR, ∠Q = ∠R = 48° and PQ = 9 cm. Find PR and ∠P.", steps: [
        "Two angles of the triangle are equal. By the converse of the isosceles triangle theorem, the sides opposite them are equal.",
        "The side opposite ∠Q is PR and the side opposite ∠R is PQ. So PR = PQ = 9 cm.",
        "∠P = 180° − 48° − 48° = 84°.",
      ], ans: "PR = 9 cm and ∠P = 84°." },
      { t: "ex", title: "Example 10", q: "Which of the triangles with the following sides are right-angled? (i) 5, 12, 13 (ii) 7, 8, 10 (iii) 9, 40, 41", steps: [
        "Use the converse of the Baudhāyana–Pythagoras theorem. Take the longest side as c.",
        "(i) 5² + 12² = 25 + 144 = 169 = 13². Right-angled. The right angle is opposite the side 13.",
        "(ii) 7² + 8² = 49 + 64 = 113, but 10² = 100. Not equal, so it is not right-angled.",
        "(iii) 9² + 40² = 81 + 1600 = 1681 = 41². Right-angled. The right angle is opposite the side 41.",
      ], ans: "(i) and (iii) are right-angled. (ii) is not." },
      { t: "ex", title: "Example 11", q: "P: If two triangles have the same area, then they are congruent. Q: If two triangles are congruent, then they have the same area. Decide P and Q.", fig: F.sameAreaTriangles("Same area, not congruent"), steps: [
        "P is false. Take a right triangle with legs 6 and 4. Its area is ½ × 6 × 4 = 12. Take another right triangle with legs 8 and 3. Its area is ½ × 8 × 3 = 12.",
        "The areas are equal, but the triangles are not congruent. Their hypotenuses are √52 and √73, which are different.",
        "Q is true. Congruent triangles can be placed exactly on each other, so the region they cover is the same and their areas are equal.",
      ], ans: "P is false and Q is true. The two statements are not the same." },
      { t: "ex", title: "Example 12", q: "P: If a quadrilateral is a rhombus, then its diagonals are perpendicular. Write the converse and decide both.", fig: F.kite("Kite: perpendicular diagonals"), steps: [
        "P is true. This is a known property of a rhombus.",
        "Converse Q: If the diagonals of a quadrilateral are perpendicular, then it is a rhombus.",
        "Take a kite ABCD with AB = AD = 5 cm and CB = CD = 3 cm (for example with BD = 4 cm). The line AC is its axis of symmetry, so AC is perpendicular to BD.",
        "The diagonals are perpendicular, but the sides are not all equal. So it is not a rhombus.",
      ], ans: "P is true. Q is false (counterexample: the kite above)." },
      { t: "ex", title: "Example 13", q: "A transversal cuts two lines l and m. The corresponding angles are 70° and 70°. What can you say about l and m? What if they were 70° and 75°?", fig: F.transversal("Corresponding angles"), steps: [
        "The converse of the corresponding angles statement is true: if corresponding angles are equal, the lines are parallel. Here 70° = 70°, so l ∥ m.",
        "If the angles were 70° and 75°, the lines could not be parallel. If they were parallel, the corresponding angles would have to be equal, because that statement is true.",
      ], ans: "With 70° and 70°, l ∥ m. With 70° and 75°, l and m are not parallel." },
      { t: "ex", title: "Example 14", q: "P: If a vehicle is a bicycle, then it has two wheels. Write the converse and decide both.", steps: [
        "P is true. Every bicycle has two wheels.",
        "Converse Q: If a vehicle has two wheels, then it is a bicycle.",
        "A motorbike and a scooter have two wheels and are not bicycles.",
      ], ans: "P is true and Q is false (counterexample: a scooter)." },
      { t: "ex", title: "Example 15", q: "P: If two numbers are both odd, then their sum is even. Write the converse and decide both.", steps: [
        "P: let the numbers be 2a + 1 and 2b + 1. The sum is 2a + 2b + 2 = 2(a + b + 1), which is even. So P is true.",
        "Converse Q: If the sum of two numbers is even, then both numbers are odd.",
        "Take 2 and 4. The sum is 6, which is even, but neither number is odd.",
      ], ans: "P is true and Q is false (counterexample: 2 and 4)." },
      { t: "ex", title: "Example 16", q: "Put the statement \"A triangle is isosceles when two of its angles are equal\" in if-then form and write its converse.", steps: [
        "The word \"when\" goes with the condition. So X is \"two angles of the triangle are equal\" and Y is \"the triangle is isosceles\".",
        "Proposition: If two angles of a triangle are equal, then the triangle is isosceles.",
        "Converse: If a triangle is isosceles, then two of its angles are equal.",
        "Both are true. They are the two statements of the isosceles triangle theorem.",
      ], ans: "Proposition: if two angles of a triangle are equal, then it is isosceles. Converse: if a triangle is isosceles, then two of its angles are equal. Both are true." },
    ],
  },
  // ───────────────────────────── 9 REVISION
  {
    id: "p9", category: "Revision", title: "Chapter at a Glance", heading: "Chapter at a Glance",
    sub: "Mind map, definitions and the pairs worth remembering.",
    blocks: [
      { t: "mindmap" },
      { t: "table", head: ["Term", "Meaning"], rows: [
        ["Proposition", "A statement that is either true or false."],
        ["Hypothesis and conclusion", "In \"if X then Y\", X is the condition and Y is the result."],
        ["Converse", "The converse of \"if X then Y\" is \"if Y then X\"."],
        ["Counterexample", "An example that satisfies X and does not satisfy Y. One is enough to disprove a proposition."],
        ["If and only if", "The proposition and its converse are both true."],
      ] },
      { t: "h", s: "Pairs worth remembering" },
      { t: "table", head: ["Proposition", "Converse", "Is the converse true?"], rows: [
        ["If two lines are parallel, corresponding angles are equal.", "If corresponding angles are equal, the lines are parallel.", "**True**"],
        ["If two sides of a triangle are equal, the opposite angles are equal.", "If two angles are equal, the opposite sides are equal.", "**True**"],
        ["If a triangle is right-angled, a² + b² = c².", "If a² + b² = c², the triangle is right-angled.", "**True**"],
        ["The opposite angles of a cyclic quadrilateral add up to 180°.", "If a pair of opposite angles of a quadrilateral add up to 180°, it is cyclic.", "**True**"],
        ["If n is a perfect square, it has an odd number of factors.", "If n has an odd number of factors, it is a perfect square.", "**True**"],
        ["If n is divisible by 60, it is divisible by 5 and 12.", "If n is divisible by 5 and 12, it is divisible by 60.", "**True**"],
        ["If a quadrilateral is a square, all its angles are equal.", "If all angles of a quadrilateral are equal, it is a square.", "**False** (rectangle)"],
        ["If two triangles are congruent, their areas are equal.", "If two triangles have equal areas, they are congruent.", "**False** (6 and 4, 8 and 3)"],
        ["If x = y, then x² = y².", "If x² = y², then x = y.", "**False** (5 and −5)"],
        ["If n is divisible by 24, it is divisible by 4 and 6.", "If n is divisible by 4 and 6, it is divisible by 24.", "**False** (12)"],
      ] },
      { t: "h", s: "Quick points before the exam" },
      { t: "ul", items: [
        "To disprove a proposition, give one counterexample that satisfies X and breaks Y, and show the check.",
        "To prove a proposition, give an argument for every case. Examples are not a proof.",
        "Write the converse by swapping the two parts only. Keep the setup sentence.",
        "A proposition and its converse can be: both true, one true and one false, or both false.",
        "Decide the truth of the proposition and of the converse separately, with reasons.",
      ] },
    ],
  },
];
