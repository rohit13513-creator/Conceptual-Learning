import type { QuizQuestion } from "../types-custom";

// Self Assessment: Class IX Maths, Propositions and their Converses. 50 multiple-choice questions, 25 minutes.
// These are different from the 30 questions in the question bank. Each question is written with the right
// answer first; the right answer is then placed at the position listed in POSITION (so the answers are spread out).

const POSITION = [0, 3, 1, 0, 0, 1, 1, 2, 1, 3, 1, 0, 2, 3, 3, 0, 0, 3, 2, 1, 3, 0, 3, 1, 1, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 2, 0, 3, 2, 0, 2, 0, 1, 2, 1, 2, 3, 2, 3];

let n = 0;
const q = (question: string, right: string, wrong: string[], explanation: string): QuizQuestion => {
  const at = POSITION[n];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { id: ++n, question, options, correctAnswer: at, explanation };
};

export const PROPS9_SELF_ASSESSMENT: QuizQuestion[] = [
  // Propositions
  q("Which of these is NOT a proposition?", "Please close the door.", ["7 is an odd number.", "Every triangle has four sides.", "The sum of two even numbers is even."],
    "A command cannot be called true or false. The other three are statements. The third one is false, but a false statement is still a proposition."),
  q("The sentence \"x + 5 = 9\" becomes a proposition when:", "the value of x is given", ["it is written inside brackets", "x is a whole number", "it is made a very long sentence"],
    "The sentence is true only for x = 4. Once we say which x we mean, we can say whether it is true or false."),
  q("\"Every prime number is odd.\" is:", "a proposition that is false", ["not a proposition because it is false", "a proposition that is true", "not a proposition because it talks about many numbers"],
    "We can clearly say it is false, because 2 is prime and even. A false statement is still a proposition."),
  q("Which of these is a proposition?", "The diagonals of a rectangle are equal.", ["Is a rhombus a square?", "Draw the diagonals of the rectangle.", "Geometry is the best subject."],
    "A question, a command and a personal opinion are not propositions. The statement about the diagonals is true, so it is a proposition."),
  q("A proposition that has been proved is called a:", "theorem", ["question", "hypothesis", "counterexample"],
    "A theorem is a true proposition that has been proved."),

  // Hypothesis, conclusion and the if-then form
  q("In \"If a number is divisible by 10, then it is divisible by 5\", the hypothesis is:", "a number is divisible by 10", ["it is divisible by 5", "a number is even", "the number is 10"],
    "The hypothesis is the \"if\" part, the condition we start with."),
  q("In \"If two lines are parallel, then they never meet\", the conclusion is:", "they never meet", ["two lines are parallel", "the lines are drawn on paper", "they meet at a point"],
    "The conclusion is the \"then\" part, the result that is claimed."),
  q("\"Y when X\" has the same meaning as:", "If X, then Y", ["If Y, then X", "If not X, then not Y", "X and Y are never both true"],
    "In \"Y when X\", X is the condition and Y is the result, which is the form \"If X, then Y\"."),
  q("\"The angles of an equilateral triangle are equal.\" in the if-then form is:", "If a triangle is equilateral, then its angles are equal.", ["If the angles of a triangle are equal, then it is equilateral.", "If a triangle is equilateral, then it is a right triangle.", "If a triangle has equal angles, then one side is 3 cm."],
    "The thing we start with (an equilateral triangle) goes after \"if\" and the property (equal angles) goes after \"then\". The first wrong option is the converse."),
  q("\"A number is even whenever it is divisible by 4\" is the same as:", "If a number is divisible by 4, then it is even.", ["If a number is even, then it is divisible by 4.", "If a number is not even, then it is divisible by 4.", "If a number is divisible by 2, then it is divisible by 8."],
    "\"Whenever X, Y\" means \"If X, then Y\". Here X is \"divisible by 4\" and Y is \"even\"."),
  q("A proposition begins with a setup sentence, such as \"Let a, b, c be the sides of a triangle.\" When we write its converse, this first sentence:", "stays the same", ["moves to the end", "is dropped", "is changed to its opposite"],
    "Only the \"if\" part and the \"then\" part are swapped. The sentence that sets up the situation stays as it is."),

  // Writing the converse
  q("The converse of \"If it rains, then the ground is wet\" is:", "If the ground is wet, then it rains.", ["If it does not rain, then the ground is not wet.", "If the ground is dry, then it does not rain.", "If it rains, then the ground is dry."],
    "The converse swaps the two parts. Adding the word \"not\" gives a different proposition."),
  q("The converse of \"If a quadrilateral is a square, then its diagonals are equal\" is:", "If the diagonals of a quadrilateral are equal, then it is a square.", ["If a quadrilateral is not a square, then its diagonals are not equal.", "If a quadrilateral is a rectangle, then its diagonals are equal.", "If the diagonals of a square are equal, then it is a quadrilateral."],
    "Swap the \"if\" part and the \"then\" part. (This converse is false: a rectangle that is not a square has equal diagonals.)"),
  q("The converse of the converse of a proposition is:", "the original proposition", ["its opposite", "always false", "a new proposition with no link to the first"],
    "Swapping the two parts twice brings us back to where we started."),
  q("The converse of \"If x = 3, then x² = 9\" is:", "If x² = 9, then x = 3.", ["If x ≠ 3, then x² ≠ 9.", "If x = 9, then x² = 3.", "If x² ≠ 9, then x ≠ 3."],
    "Put the old conclusion after \"if\" and the old condition after \"then\"."),
  q("The converse of \"If two angles are vertically opposite, then they are equal\" is:", "If two angles are equal, then they are vertically opposite.", ["If two angles are not vertically opposite, then they are not equal.", "If two angles are not equal, then they are not vertically opposite.", "If two angles are vertically opposite, then they are supplementary."],
    "Swap the parts. (This converse is false: two angles of 30° each need not be vertically opposite.)"),
  q("Which of these is NOT a correct way to get the converse of \"If X, then Y\"?", "Writing \"If not X, then not Y\"", ["Swapping X and Y", "Writing \"If Y, then X\"", "Interchanging the \"if\" part and the \"then\" part"],
    "The converse only swaps the two parts. It never adds the word \"not\"."),

  // Is the converse true?
  q("The converse of \"If a number is divisible by 9, then it is divisible by 3\" is:", "false, since 6 is divisible by 3 but not by 9", ["true", "false, since 9 is not divisible by 3", "true, because 9 = 3 × 3"],
    "The converse says that a number divisible by 3 is divisible by 9. The number 6 breaks it."),
  q("For which proposition is the converse also true?", "If x = 5, then x + 2 = 7.", ["If x = 3, then x² = 9.", "If a number is divisible by 8, then it is even.", "If a number ends in 0, then it is divisible by 5."],
    "If x + 2 = 7, then x = 5, so this converse is true. The other three converses fail for x = −3, for 6 and for 15."),
  q("\"If n is divisible by 8, then n is even.\" The converse of this proposition is false because of:", "n = 6", ["n = 16", "n = 24", "n = 32"],
    "n = 6 is even but not divisible by 8. The others are divisible by 8, so they do not break the converse."),
  q("\"If a quadrilateral is a rhombus, then its diagonals are perpendicular.\" Which is correct?", "The proposition is true and its converse is false (a kite is a counterexample).", ["Both are true.", "Both are false.", "The proposition is false and its converse is true."],
    "A kite has perpendicular diagonals but is not a rhombus unless all its sides are equal."),
  q("When a proposition and its converse are both true, we join them using the words:", "if and only if", ["either or", "if not", "only then"],
    "\"X if and only if Y\" means that X gives Y and Y gives X."),
  q("A student tests the converse of a proposition with five examples and it works every time. She can say:", "the converse may be true or false, because examples do not prove it", ["the converse is now proved", "the converse is certainly false", "the original proposition is false"],
    "Many examples never prove a proposition. We need a proof, or one counterexample."),
  q("\"If x is a negative number, then x² is positive.\" Its converse is:", "false, since 3² is positive but 3 is not negative", ["true, since squares are positive", "false, since negative numbers have no square", "true for every x except 0"],
    "The converse says that a number with a positive square must be negative. The number 3 breaks it."),
  q("Which of these statements is true?", "If corresponding angles made by a transversal on two lines are equal, then the lines are parallel.", ["If a number is divisible by 3, then it is divisible by 9.", "If two triangles have the same area, then they are congruent.", "If a number is even, then it is divisible by 4."],
    "The first is the converse of the corresponding angles result and it is true. The other three fail for 6 (divisible by 3 but not by 9), for two triangles of equal area but different shape, and for 6 again (even but not divisible by 4)."),

  // Counterexamples
  q("A counterexample to \"If n is odd, then n is prime\" is:", "n = 9", ["n = 3", "n = 7", "n = 11"],
    "9 is odd but not prime. The others are odd and prime, so they fit the statement."),
  q("A counterexample to \"If n is a prime number, then n is odd\" is:", "n = 2", ["n = 3", "n = 9", "n = 15"],
    "2 is prime and even. The other numbers are odd, so they do not disprove the statement."),
  q("To show that a proposition is false it is enough to give:", "one counterexample", ["five examples that fit it", "a long explanation with no example", "an example in which it works"],
    "One case that satisfies the condition but breaks the result is enough to disprove a proposition."),
  q("Which value of x is a counterexample to \"If x² > 4, then x > 2\"?", "x = −3", ["x = 3", "x = 5", "x = 2.5"],
    "For x = −3, x² = 9 > 4 but x is not greater than 2. The other values satisfy both parts."),
  q("The expression n² − n + 41 gives a prime for n = 1, 2, 3, ..., 40. What happens for n = 41?", "It gives 1681 = 41 × 41, which is not prime", ["It gives a prime again", "It gives 41, which is prime", "It gives 1681, which is prime"],
    "41² − 41 + 41 = 1681 = 41 × 41. A pattern that works 40 times can still fail."),
  q("A counterexample to \"If a quadrilateral has four equal angles, then it has four equal sides\" is:", "a rectangle that is not a square", ["a square", "a rhombus with an angle of 60°", "a kite"],
    "A 3 cm by 5 cm rectangle has four equal angles (90°) but not four equal sides."),
  q("A counterexample to \"If the product of two integers is even, then both integers are even\" is:", "3 × 4 = 12", ["2 × 4 = 8", "6 × 10 = 60", "2 × 2 = 4"],
    "12 is even but 3 is not even. In the other three both numbers are even."),
  q("A counterexample to \"The sum of two prime numbers is even\" is:", "2 + 3 = 5", ["3 + 5 = 8", "7 + 11 = 18", "13 + 17 = 30"],
    "2 and 3 are primes but their sum 5 is odd."),

  // Geometry pairs
  q("In an isosceles triangle ABC with AB = AC, the two equal angles are:", "∠B and ∠C", ["∠A and ∠B", "∠A and ∠C", "∠A, ∠B and ∠C"],
    "Angles opposite equal sides are equal. AB is opposite ∠C and AC is opposite ∠B."),
  q("In triangle PQR, ∠Q = ∠R. Which two sides are equal?", "PQ and PR", ["QR and PQ", "QR and PR", "no two sides"],
    "Sides opposite equal angles are equal. PR is opposite ∠Q and PQ is opposite ∠R."),
  q("In triangle ABC, ∠B = ∠C = 50°, BC = 7 cm and AB = 6 cm. The length of AC is:", "6 cm", ["7 cm", "13 cm", "50 cm"],
    "Equal angles at B and C mean AB = AC, so AC = 6 cm."),
  q("The converse of the isosceles triangle result is proved by drawing the altitude AD from A and showing that triangles ABD and ACD are congruent by:", "AAS", ["SSS", "SAS", "they are not congruent"],
    "∠ADB = ∠ADC = 90°, ∠B = ∠C and AD is common, which is the AAS rule."),
  q("A triangle has sides a, b and c, with c the longest. It is right-angled when:", "a² + b² = c²", ["a + b = c", "a² + b² > c²", "a² + b² < c²"],
    "This is the converse of the Pythagoras theorem and it is true."),
  q("A triangle has sides 5 cm, 12 cm and 13 cm. Is it right-angled?", "Yes, since 5² + 12² = 13²", ["No, since 5 + 12 ≠ 13", "No, since 5² + 12² ≠ 13²", "Yes, since 5 + 12 is greater than 13"],
    "25 + 144 = 169 = 13², so the converse of the Pythagoras theorem tells us it is right-angled."),
  q("A triangle has sides 7 cm, 8 cm and 10 cm. Which statement is correct?", "It is not right-angled, since 7² + 8² ≠ 10²", ["It is right-angled, since 7 + 8 > 10", "It is right-angled, since 10 is the longest side", "It is right-angled, since its area is 28 cm²"],
    "49 + 64 = 113 but 10² = 100. The sum of squares is not equal, so there is no right angle."),
  q("One triangle has base 8 cm and height 5 cm. Another has base 10 cm and height 4 cm. Both have area 20 cm² but they are not congruent. This shows that:", "the converse of \"congruent triangles have equal area\" is false", ["the proposition \"congruent triangles have equal area\" is false", "both the proposition and its converse are true", "triangles with equal area must be congruent"],
    "Equal area does not force congruence, so the converse is false, even though the original proposition is true."),

  // Numbers
  q("Which numbers have an odd number of factors?", "perfect squares", ["prime numbers", "even numbers", "multiples of 3"],
    "Factors come in partner pairs. Only in a perfect square does one factor pair with itself, which leaves an odd count."),
  q("How many factors does 36 have?", "9", ["8", "10", "12"],
    "The factors are 1, 2, 3, 4, 6, 9, 12, 18 and 36. Since 36 is a perfect square, the count is odd."),
  q("Which of these numbers has an even number of factors?", "50", ["49", "64", "100"],
    "49, 64 and 100 are perfect squares, so they have an odd number of factors. 50 is not a perfect square: it has 6 factors."),
  q("\"If a number is divisible by 12, then it is divisible by 4.\" The converse of this proposition is:", "false, since 8 is divisible by 4 but not by 12", ["true", "false, since 12 is not divisible by 4", "true, since 12 = 4 × 3"],
    "A number divisible by 4 need not be divisible by 12. The number 8 shows this."),
  q("\"If a number is divisible by both 4 and 5, then it is divisible by 20.\" This holds because:", "4 and 5 have no common factor other than 1", ["4 and 5 are small numbers", "20 is an even number", "20 is a perfect square"],
    "When two numbers share no factor other than 1, a number divisible by both is divisible by their product."),
  q("\"If a number is divisible by both 4 and 6, then it is divisible by 24.\" Which number shows that this is false?", "12", ["24", "48", "72"],
    "12 is divisible by 4 and by 6 but not by 24. The others are divisible by 24. The rule fails because 4 and 6 share the factor 2."),
  q("Divisible by both of two numbers means divisible by their product. This is true for the pair:", "3 and 7", ["6 and 9", "4 and 10", "6 and 8"],
    "3 and 7 have no common factor other than 1. The other pairs share a factor of 3, 2 and 2."),

  // Uses
  q("\"If x = y, then x + 3 = y + 3.\" Its converse is true because:", "we can subtract 3 from both sides to get back x = y", ["adding 3 always gives the same number", "x and y are always positive", "3 is a prime number"],
    "When an operation can be undone, a statement and its converse are both true."),
  q("The converse of \"If x = y, then x² = y²\" is:", "\"If x² = y², then x = y\", which is false (x = 2, y = −2)", ["\"If x² = y², then x = y\", which is true", "\"If x = y, then x² ≠ y²\", which is false", "\"If x² = y², then x ≠ y\", which is true"],
    "Squaring cannot be undone in a single way, because a number and its negative have the same square."),
];
