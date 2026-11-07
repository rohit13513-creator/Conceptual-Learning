import type { QuizQuestion } from "../types-custom";
import type { GeoSpec } from "../components/GeoFigure";
import * as F from "./al9Figs";

// Self Assessment: Class IX Maths, The World of Algorithms. 60 multiple-choice questions in 60 minutes.
// The questions ask the student to carry out the algorithms of the chapter, to find the error in a working and to reason about
// why an algorithm is correct and how much work it does. Everything stays inside the chapter (addition, divisors and lists,
// the gcd algorithms, Euclid, Āryabhaṭa, and the algorithms of the exercises). 8 questions are assertion and reasoning, 2 have a figure.
// Each ordinary question is written with the right answer first and placed at the position in POSITION, so the right
// answers are spread evenly.

const POSITION = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 2, 0, 0, 2, 1, 3, 2, 3, 0, 1, 1, 0, 3, 2, 3, 2, 1, 0, 0, 1, 2, 3, 1, 3, 0, 2, 2, 0, 3, 1, 3, 1, 2, 0, 0, 2, 1, 3, 1, 0, 2, 3];

let n = 0;
const q = (question: string, right: string, wrong: string[], explanation: string, figure?: GeoSpec): QuizQuestion => {
  const at = POSITION[n];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { id: ++n, question, options, correctAnswer: at, explanation, figure };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
const ar = (question: string, correct: number, explanation: string): QuizQuestion => ({ id: ++n, question, options: AR, correctAnswer: correct, explanation });

export const AL9_SELF_ASSESSMENT: QuizQuestion[] = [
  // ── The addition algorithm ──
  q("In adding 9999 and 1 with the algorithm, how many columns produce a carry of 1, and what does step 5 write?", "4 columns; step 5 writes a 1 on the left, giving 10000", ["3 columns; step 5 writes nothing, giving 0000", "1 column; step 5 writes a 1, giving 10000", "4 columns; step 5 writes nothing, giving 9999"],
    "Units 9 + 1 = 10 (write 0, carry 1). Tens, hundreds and thousands each give 9 + 0 + 1 = 10 (write 0, carry 1). After the thousands column the carry is still 1, so step 5 writes 1 on the left: 10000."),
  q("Two 4-digit numbers are added by the algorithm. The sum can have at most", "5 digits, and the leading digit is then 1", ["4 digits only", "5 digits, and the leading digit can be any of 1 to 9", "6 digits"],
    "The largest total is 9999 + 9999 = 19998. A last carry is at most 1, so the extra digit at the left is 1 and the sum has at most 5 digits."),
  q("The algorithm without step 5 gives a wrong answer for which of these sums?", "66 + 44", ["48 + 51", "35 + 27", "29 + 31"],
    "66 + 44: units 10 (carry 1), tens 6 + 4 + 1 = 11 (write 1, carry 1). The last carry is lost and we get 10 instead of 110. In the other sums the carry after the last column is 0 (48 + 51 = 99, 35 + 27 = 62, 29 + 31 = 60)."),
  q("In adding 758 and 646 by the algorithm, the numbers of columns in which the carry is 1 is", "3", ["1", "2", "4"],
    "Units 8 + 6 = 14 (carry 1). Tens 5 + 4 + 1 = 10 (carry 1). Hundreds 7 + 6 + 1 = 14 (carry 1). All three columns carry 1, and the sum is 1404."),
  q("A student adds 276 and 589 and gets 855. The mistake is that she", "forgot to add the carry from the units column into the tens column", ["forgot step 5", "added the digits from left to right", "wrote the carry in the units column"],
    "Units 6 + 9 = 15 (write 5, carry 1). If the carry is forgotten, tens 7 + 8 = 15 (write 5, carry 1) and hundreds 2 + 5 + 1 = 8, giving 855. The correct tens column is 7 + 8 + 1 = 16, and the sum is 865."),
  q("When the numbers being added grow from 3 digits to 6 digits, the work of counting dots and the work of the addition algorithm become respectively about", "1000 times and 2 times", ["100 times and 3 times", "1000 times and 1000 times", "2 times and 1000 times"],
    "Counting: a 6-digit number is about 1000 times as large as a 3-digit number, so there are about 1000 times as many dots. The algorithm needs 3 more columns, so 6 columns instead of 3, which is 2 times as many."),
  q("To add 0.75 and 0.5 with the algorithm we should", "align the decimal points, write 0.5 as 0.50 and add to get 1.25", ["align the last digits and get 0.80", "align from the left and get 1.00", "ignore the decimal points and get 125"],
    "Equal place values must be in the same column. 0.75 + 0.50: hundredths 5, tenths 7 + 5 = 12 (write 2, carry 1), units 0 + 0 + 1 = 1. The sum is 1.25."),
  q("Which statement gives the best reason why the addition algorithm gives the true sum?", "It adds each group of units, tens, hundreds, ... separately and carries every new group of ten to the next place", ["It adds the digits faster than counting", "It always writes the carry on the left", "It works only for numbers with the same number of digits"],
    "The justification is the grouping by place value: each place value is added separately, and a group of ten of one place value is one of the next, which is the carry. Speed is a different matter (efficiency)."),

  // ── Lists and divisors ──
  q("Executing the divisors algorithm for n = 48, the list after the numbers j = 1 to 20 have been checked is", "[1, 2, 3, 4, 6, 8, 12, 16]", ["[1, 2, 3, 4, 6, 8, 12, 16, 24]", "[1, 2, 3, 4, 6, 8, 12]", "[1, 2, 4, 6, 8, 12, 16]"],
    "The numbers up to 20 that divide 48 are 1, 2, 3, 4, 6, 8, 12 and 16. The divisor 24 is added only when j reaches 24."),
  q("The list divisors(n) has exactly 3 elements. Then n could be", "49", ["50", "51", "48"],
    "A list of exactly 3 divisors is 1, p and p × p for a prime p. divisors(49) = [1, 7, 49]. The numbers 50, 51 and 48 have more than 3 divisors."),
  q("To find all divisors of 144 in pairs (j, 144 ÷ j), the largest value of j that needs to be examined is", "12", ["72", "144", "24"],
    "In each pair one divisor is at most 12, since 12 × 12 = 144. So j = 1 to 12 are enough, instead of 144 checks."),
  q("If the divisors of 36 are found in pairs, the number of distinct divisors obtained is", "9", ["10", "8", "5"],
    "The pairs are (1, 36), (2, 18), (3, 12), (4, 9) and (6, 6). The pair (6, 6) gives only one divisor, so there are 4 × 2 + 1 = 9 distinct divisors."),
  q("The list divisors(n) found by the algorithm is [1, 2, 4, 8, 16, 32]. Then n is", "32", ["16", "64", "30"],
    "The last element of the list found by the algorithm is n itself (j = n always divides n). So n = 32."),
  q("Executing the divisors algorithm for n = 28, the list after j = 1 to 10 have been checked is", "[1, 2, 4, 7]", ["[1, 2, 4, 7, 14]", "[1, 2, 4]", "[1, 2, 4, 7, 10]"],
    "1, 2, 4 and 7 divide 28; 14 is added when j reaches 14, and 3, 5, 6, 8, 9 and 10 do not divide 28."),
  q("If prime(n) is written using divisors(n), then prime(1) reports not prime because", "divisors(1) = [1] has only 1 element", ["divisors(1) is empty", "divisors(1) = [1, 1] has 2 equal elements", "1 divides every number"],
    "A prime has exactly two divisors, 1 and itself. For n = 1 these are the same number, so the list has only one element."),
  q("Using divisors, the list primedivisors(84) is", "[2, 3, 7]", ["[2, 3, 4, 7]", "[1, 2, 3, 7]", "[2, 3, 6, 7]"],
    "divisors(84) = [1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84]. The prime ones are 2, 3 and 7."),

  // ── gcd by lists and the improvements ──
  q("The number of common divisors of 54 and 72 is", "6", ["4", "8", "9"],
    "divisors(54) = [1, 2, 3, 6, 9, 18, 27, 54] and divisors(72) = [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72]. The common divisors are 1, 2, 3, 6, 9 and 18, so gcd(54, 72) = 18."),
  q("The list of common divisors of 45 and 60, found by the first algorithm, is", "[1, 3, 5, 15]", ["[1, 3, 5, 9, 15]", "[1, 3, 5, 15, 45]", "[1, 3, 15]"],
    "divisors(45) = [1, 3, 5, 9, 15, 45]. Of these, 9 and 45 do not divide 60. So the common divisors are [1, 3, 5, 15] and the gcd is 15."),
  q("For m = 250 and n = 100, the first gcd algorithm examines how many more numbers than the algorithm that scans from 1 to min(m, n)?", "250", ["150", "100", "350"],
    "The first algorithm examines m + n = 350 numbers. The last version scans 1 to min(m, n) = 100. The difference is 350 − 100 = 250."),
  q("Which pair of numbers has exactly one common divisor?", "9 and 28", ["12 and 18", "8 and 12", "45 and 60"],
    "The common divisors of 9 and 28 are only [1], since 9 = 3 × 3 and 28 = 4 × 7 have no common factor. The other pairs have gcd 6, 4 and 15."),
  q("Executing the no-list algorithm for m = 20 and n = 30, the successive values of most-recent-common-divisor are", "1, 2, 5, 10", ["1, 2, 4, 5, 10", "1, 2, 5, 10, 20", "1, 5, 10"],
    "min = 20. k = 2 divides both (2), k = 3 and 4 do not divide both, k = 5 (5), k = 6 to 9 no, k = 10 (10), k = 11 to 20 no. So the values are 1, 2, 5, 10 and gcd(20, 30) = 10."),
  q("The no-list algorithm is executed for m = 12 and n = 18. After the start, the value of most-recent-common-divisor is updated how many times?", "3", ["2", "4", "5"],
    "min = 12. The updates happen at k = 2, k = 3 and k = 6 (the numbers that divide both 12 and 18). The value goes 1, 2, 3, 6 and gcd(12, 18) = 6."),
  q("Scanning from min(84, 126) = 84 down to 1 for the first number that divides both, the number of values checked (including the one where it stops) is", "43", ["84", "42", "126"],
    "gcd(84, 126) = 42 and 126 = 3 × 42, 84 = 2 × 42. The values 84, 83, ..., 42 are checked, which is 84 − 42 + 1 = 43 values, and the scan stops at 42."),
  q("A common divisor of m and n is never larger than min(m, n) because", "a divisor of a number cannot be larger than the number itself", ["divisors are always prime", "the gcd is always 1", "a divisor of m is always smaller than n"],
    "If d divides the smaller number it is at most that number. So checking up to min(m, n) finds every common divisor."),
  q("The later versions of the gcd algorithm are still correct although they examine fewer numbers because", "each improvement does the same job with less work and does not change what is computed", ["they use a different definition of gcd", "they find the lcm instead", "they ignore the number 1"],
    "The changes (scanning together, scanning to the minimum, keeping only the latest common divisor) all still find the largest common divisor, so the result is unchanged."),
  q("The smaller of two numbers m and n changes from 3 digits to 6 digits. The work of the scan from 1 to min(m, n) grows by a factor of about", "1000", ["3", "2", "100"],
    "The scan checks every number up to min(m, n), so the work grows with the value of the smaller number. A 6-digit number is about 1000 times a 3-digit number."),
  q("For m = 144 and n = 36 the no-list algorithm (k from 2 to min(m, n)) ends with the value", "36", ["12", "72", "1"],
    "36 divides 144 (144 = 4 × 36) and 36 divides itself, so the last k = 36 updates the value to 36. gcd(144, 36) = 36."),

  // ── Euclid's subtraction algorithm ──
  q("The number of reductions in Euclid's subtraction algorithm for gcd(40, 15) is", "5", ["3", "4", "6"],
    "(40, 15) goes to (15, 25); reverse to (25, 15); (15, 10); (10, 5); (5, 5); (5, 0). That is 5 reductions and the answer is 5."),
  q("Which pair needs the largest number of reductions in Euclid's subtraction algorithm?", "gcd(61, 2)", ["gcd(60, 30)", "gcd(45, 15)", "gcd(48, 36)"],
    "gcd(61, 2) takes the second number away again and again (about 30 times). The others take 2, 3 and 4 reductions. The number of steps depends on the value, not the number of digits."),
  q("The first reduction of gcd(100, 35) in Euclid's algorithm gives", "gcd(35, 65)", ["gcd(65, 35)", "gcd(100, 65)", "gcd(35, 135)"],
    "For m ≥ n, gcd(m, n) is replaced by gcd(n, m − n) = gcd(35, 100 − 35) = gcd(35, 65). The numbers are reversed only in the next step, since 35 < 65."),
  q("For gcd(25, 75) Euclid's subtraction algorithm uses the following number of reductions (the reversals are not counted)", "3", ["1", "2", "4"],
    "(25, 75) is reversed to (75, 25). Then (25, 50), reverse to (50, 25), then (25, 25), then (25, 0). That is 3 reductions and the answer is 25."),
  q("Euclid's algorithm reaches gcd(m, 0). The reason for reporting m is that", "m divides both m and 0, and no larger number divides m", ["the gcd of any number with 0 is 0", "the algorithm has made a mistake", "m is always 1"],
    "Every number divides 0, so the common divisors of m and 0 are the divisors of m. The greatest is m itself."),
  q("If gcd(84, 36) = 12, then the gcd of the pair obtained after one reduction of (84, 36) is", "12", ["48", "36", "6"],
    "gcd(m, n) = gcd(n, m − n). So gcd(36, 48) = gcd(84, 36) = 12."),
  q("For gcd(101, 2), the number of reductions of Euclid's subtraction algorithm is about", "50", ["2", "101", "202"],
    "gcd(101, 2) reduces to gcd(99, 2), gcd(97, 2), ..., which takes about 50 steps. By contrast 101 mod 2 = 1 makes the division algorithm finish in 2 steps."),
  q("The figure shows blocks of size d that tile m (8 blocks) and n (5 blocks). The number of blocks of size d in m − n is", "3", ["13", "5", "8"],
    "m = 8d and n = 5d, so m − n = 3d, which is 3 blocks. This is why every d that tiles m and n also tiles m − n.", F.tiles("Blocks of size d tile m (8 blocks) and n (5 blocks)")),
  q("In the figure, the blocks have size d = 15 and tile m (8 blocks) and n (5 blocks) exactly. Then gcd(m, n) is", "15", ["5", "1", "75"],
    "m = 8 × 15 = 120 and n = 5 × 15 = 75. Since 8 and 5 have no common factor, the greatest block that tiles both is d = 15. Check: gcd(120, 75) = 15.", F.tiles("Blocks of size d = 15 tile m and n")),

  // ── Āryabhaṭa's algorithm ──
  q("Which of these is the largest?", "250 mod 12", ["100 mod 7", "45 mod 45", "17 mod 5"],
    "250 mod 12 = 10 (250 = 20 × 12 + 10), 100 mod 7 = 2, 45 mod 45 = 0 and 17 mod 5 = 2. The largest is 10."),
  q("The number of divisions in Āryabhaṭa's algorithm for gcd(210, 45) is", "3", ["2", "4", "5"],
    "210 = 4 × 45 + 30, 45 = 1 × 30 + 15, 30 = 2 × 15 + 0. Three divisions, and the gcd is 15."),
  q("In finding gcd(252, 198) by the division algorithm, the successive remainders are", "54, 36, 18, 0", ["54, 18, 0", "198, 54, 36, 0", "1, 3, 1, 2"],
    "252 = 1 × 198 + 54, 198 = 3 × 54 + 36, 54 = 1 × 36 + 18, 36 = 2 × 18 + 0. The gcd is the last non-zero remainder, 18."),
  q("gcd(231, 105) is", "21", ["7", "42", "105"],
    "231 = 2 × 105 + 21 and 105 = 5 × 21 + 0, so gcd = 21 after 2 divisions."),
  q("gcd(144, 36) takes how many divisions in Āryabhaṭa's algorithm?", "1", ["2", "0", "4"],
    "144 mod 36 = 0, so gcd(144, 36) reduces directly to gcd(36, 0) = 36. One division is enough because 36 divides 144."),
  q("gcd(1001, 2) takes how many reductions by the division algorithm?", "2", ["500", "1001", "1"],
    "1001 mod 2 = 1, so gcd(1001, 2) = gcd(2, 1), and 2 mod 1 = 0 gives gcd(1, 0) = 1. Just 2 reductions."),
  q("The step gcd(m, n) = gcd(n, m mod n) is valid because", "m mod n = m − qn, so d divides m and n exactly when d divides n and m mod n", ["m mod n is always smaller than gcd(m, n)", "m mod n equals the quotient of m and n", "we may change the numbers in any way"],
    "Write m = qn + r with r = m mod n. If d divides m and n it divides r = m − qn; if d divides n and r it divides m = qn + r. So the common divisors are the same."),
  q("A student states: gcd(119, 34) = 17 by long division. His divisions are 119 = 3 × 34 + 17 and 34 = 2 × 17 + 0. The number of divisions is", "2", ["3", "17", "1"],
    "There are two division steps, and the last divisor, 17, is the gcd."),
  q("Which statement correctly compares the two algorithms for large numbers?", "Euclid's subtraction can need a number of steps comparable to the value of the numbers, while Āryabhaṭa's division needs a number of steps comparable to the number of digits", ["Both need a number of steps comparable to the value of the numbers", "Āryabhaṭa's division needs more steps because it uses division", "Euclid's subtraction gives a different gcd for large numbers"],
    "Subtraction takes away the smaller number one time at a time (gcd(99, 2) takes about 50 steps), but division takes it away as many times as possible in one step."),

  // ── Algorithms from the exercises ──
  q("Using the gcd, the lcm of 18 and 24 is", "72", ["6", "432", "36"],
    "gcd(18, 24) = 6, so lcm = 18 × 24 ÷ 6 = 432 ÷ 6 = 72."),
  q("gcd(14, 35) = 7. Then lcm(14, 35) is", "70", ["490", "7", "35"],
    "lcm = 14 × 35 ÷ 7 = 490 ÷ 7 = 70, and 7 × 70 = 490 = 14 × 35."),
  q("The prime factorisation [(2, 3), (3, 1), (7, 1)], a list of (prime, power) pairs, stands for the number", "168", ["12", "42", "56"],
    "2³ × 3 × 7 = 8 × 3 × 7 = 168."),
  q("From the lists [(2, 3), (3, 1), (7, 1)] for 168 and [(2, 1), (3, 2), (5, 1)] for 90, the gcd and lcm are", "6 and 2520", ["2 and 15120", "6 and 15120", "3 and 2520"],
    "gcd: each common prime with the smaller power, 2 × 3 = 6. lcm: each prime with the larger power, 2³ × 3² × 5 × 7 = 2520. Check: 6 × 2520 = 15120 = 168 × 90."),
  q("List 1 is [2, 4, 6, 8, 10, 12] and List 2 is [3, 6, 9, 12]. The algorithm for the elements of List 1 that are not in List 2 reports", "[2, 4, 8, 10]", ["[3, 9]", "[6, 12]", "[2, 3, 4, 8, 9, 10]"],
    "The elements of List 1 that are also in List 2 are 6 and 12. The rest, in order, are 2, 4, 8 and 10."),
  q("In the algorithm for the divisors of n, the step 'if j divides n, add j to the list' is an example of", "a conditional step inside a repeated step", ["a basic step only", "a repeated step without a condition", "a data structure"],
    "'For each j' repeats the step for every j, and 'if j divides n' makes the addition conditional. The list is the data structure."),
  q("An algorithm gives gcd(m, n) correctly but needs about 1000 steps for a 4-digit input and about 100000 steps for a 6-digit input. Compared with an algorithm that needs about 4 steps and 6 steps, we say the first is", "less efficient, because its work grows with the value of the numbers", ["more efficient, because it uses more steps", "incorrect, because it takes too many steps", "the same, because both give the same gcd"],
    "Both are correct, but the number of steps of the first grows about 100 times for 2 extra digits, while the second grows only slightly. Efficiency is about how the work grows."),

  // ── Assertion and reasoning ──
  ar("Assertion (A): For every k, Āryabhaṭa's algorithm finds gcd(2k + 1, 2) in 2 reductions.\nReason (R): (2k + 1) mod 2 = 1, so gcd(2k + 1, 2) becomes gcd(2, 1) and then gcd(1, 0).", 0,
    "Both are true. R gives the exact reasoning: an odd number leaves remainder 1 when divided by 2."),
  ar("Assertion (A): The gcd algorithm needs to scan only the numbers from 1 to min(m, n).\nReason (R): A common divisor of m and n cannot be larger than the smaller of the two numbers.", 0,
    "Both are true. R is the reason why numbers above min(m, n) need not be checked."),
  ar("Assertion (A): 17 mod 5 = 2.\nReason (R): gcd(17, 5) = 1.", 1,
    "Both are true (17 = 3 × 5 + 2, and 17 and 5 have no common factor), but the gcd has nothing to do with the remainder, so R does not explain A."),
  ar("Assertion (A): The first gcd algorithm and the combined-scan algorithm give the same gcd for every pair.\nReason (R): The combined scan examines max(m, n) numbers.", 1,
    "Both are true. The reason for the same answer is that the combined scan finds the same divisors; the number max(m, n) only tells us how much work it does."),
  ar("Assertion (A): gcd(a, b) = gcd(b, a − b) for a ≥ b.\nReason (R): Every common divisor of a and b divides a + b but not a − b.", 2,
    "A is true. R is false: a common divisor of a and b divides every sum and difference of multiples of a and b, so it divides a − b too. That is exactly why A holds."),
  ar("Assertion (A): Counting the dots of a 5-digit and a 5-digit number takes about 100 times as much work as for 3-digit numbers.\nReason (R): The addition algorithm needs about 100 times as many columns for 5-digit numbers.", 2,
    "A is true (numbers about 100 times as large, so about 100 times as many dots). R is false: the algorithm needs only 2 more columns."),
  ar("Assertion (A): If the carry from the last column of the addition algorithm is 1, the sum has the same number of digits as the larger number.\nReason (R): Step 5 writes the last carry as 1 on the left of the bottom row.", 3,
    "A is false: the last carry is written as an extra digit on the left, so the sum has one digit more than the larger number (for example 56 + 67 = 123). R is true."),
  ar("Assertion (A): 33 mod 7 equals 4.\nReason (R): 33 = 4 × 7 + 5.", 3,
    "A is false: 33 mod 7 is the remainder 5, not the quotient 4. R is true (it shows the quotient is 4 and the remainder is 5)."),
];
