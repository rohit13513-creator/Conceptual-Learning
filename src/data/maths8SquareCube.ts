// Class 8 Maths -- Chapter: Squares and Cubes (perfect squares, patterns in square numbers,
// Pythagorean triples, square roots by repeated subtraction/prime factorization/long division,
// perfect cubes, patterns in cube numbers, and cube roots by prime factorization).
// Every numeric fact below was independently verified by direct computation before being written
// in, the same discipline this app's own auto-graded tests are held to.
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS (one per major method taught in the chapter) ──
export const MATHS8SC_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "Without actually adding, find the sum: 1 + 3 + 5 + 7 + 9 + 11 + 13.",
    given: { "Numbers to add": "The first 7 odd numbers (1 to 13)" },
    formulaUsed: "The sum of the first n odd numbers is always n^2.",
    derivationSteps: [
      "Count how many odd numbers are being added: 1, 3, 5, 7, 9, 11, 13 -- that is 7 numbers.",
      "Apply the rule: sum of first n odd numbers = n^2.",
      "Here n = 7, so the sum = 7^2 = 49."
    ],
    finalAnswer: "49.",
    conceptualTip: "This only works when the odd numbers start from 1 and are completely consecutive (no odd number skipped) -- always count how many terms there are first, that count IS the n you square."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "How many numbers lie between 12^2 and 13^2?",
    given: { "First square": "12^2 = 144", "Second square": "13^2 = 169" },
    formulaUsed: "Between n^2 and (n+1)^2, there are always exactly 2n numbers.",
    derivationSteps: [
      "Here n = 12, so the number of numbers strictly between 12^2 and 13^2 is 2 x 12 = 24.",
      "Check directly: 169 - 144 - 1 = 24 (subtracting 1 because both endpoints 144 and 169 are themselves perfect squares, not counted)."
    ],
    finalAnswer: "24 numbers.",
    conceptualTip: "This pattern means the 'gap' between consecutive perfect squares keeps growing by 2 every time you move to the next pair -- between 1^2 and 2^2 there are 2 numbers, between 2^2 and 3^2 there are 4, and so on."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "Using the pattern for generating Pythagorean triples, find a triple with 2m = 16.",
    given: { "2m": "16, so m = 8" },
    formulaUsed: "For any m > 1, the three numbers (2m, m^2 - 1, m^2 + 1) always form a Pythagorean triple.",
    derivationSteps: [
      "m = 8, so 2m = 16.",
      "m^2 - 1 = 64 - 1 = 63.",
      "m^2 + 1 = 64 + 1 = 65.",
      "Check: 16^2 + 63^2 = 256 + 3969 = 4225, and 65^2 = 4225. They match."
    ],
    finalAnswer: "(16, 63, 65) is a Pythagorean triple.",
    conceptualTip: "Always verify a generated triple by actually squaring and adding, the way this solution just did -- it takes one extra line and guarantees the answer is genuinely correct, not just 'shaped like' a triple."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "Find the square root of 225 using the repeated subtraction method.",
    given: { "Number": "225" },
    formulaUsed: "Subtract successive odd numbers (1, 3, 5, 7, ...) starting from the given number, until the result is exactly 0. The count of subtractions performed is the square root.",
    derivationSteps: [
      "225 - 1 = 224 (1 subtraction)",
      "224 - 3 = 221 (2)",
      "221 - 5 = 216 (3)",
      "216 - 7 = 209 (4)",
      "209 - 9 = 200 (5)",
      "200 - 11 = 189 (6)",
      "189 - 13 = 176 (7)",
      "176 - 15 = 161 (8)",
      "161 - 17 = 144 (9)",
      "144 - 19 = 125 (10)",
      "125 - 21 = 104 (11)",
      "104 - 23 = 81 (12)",
      "81 - 25 = 56 (13)",
      "56 - 27 = 29 (14)",
      "29 - 29 = 0 (15) -- reached exactly zero"
    ],
    finalAnswer: "sqrt(225) = 15 (15 subtractions were needed to reach 0).",
    conceptualTip: "This method is reliable but slow for larger numbers -- it directly demonstrates WHY square roots and sums of odd numbers are connected, but prime factorization or long division are faster in practice."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "Find the square root of 1296 using the prime factorization method.",
    given: { "Number": "1296" },
    formulaUsed: "Write the number as a product of prime factors, pair up identical primes, and take one factor from each pair; multiply those together to get the square root.",
    derivationSteps: [
      "Divide 1296 repeatedly by primes: 1296 = 2 x 648 = 2 x 2 x 324 = 2 x 2 x 2 x 162 = 2 x 2 x 2 x 2 x 81 = 2 x 2 x 2 x 2 x 3 x 27 = 2 x 2 x 2 x 2 x 3 x 3 x 9 = 2 x 2 x 2 x 2 x 3 x 3 x 3 x 3.",
      "So 1296 = 2^4 x 3^4 = (2 x 2 x 2 x 2) x (3 x 3 x 3 x 3).",
      "Group into pairs: (2 x 2) x (2 x 2) x (3 x 3) x (3 x 3) -- four complete pairs.",
      "Take one factor from each pair: 2 x 2 x 3 x 3 = 36."
    ],
    finalAnswer: "sqrt(1296) = 36.",
    conceptualTip: "If the prime factorization of a number does NOT split into complete pairs (some prime is left over on its own), the number is not a perfect square at all -- this method doubles as a quick test for whether a square root will even be a whole number."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "Find the square root of 3249 using the long division method.",
    given: { "Number": "3249" },
    formulaUsed: "Pair the digits from the right (32 | 49). Find the largest digit whose square is at most the first pair, subtract, bring down the next pair, then find the next quotient digit by trial so that (twice the quotient so far, with a new digit appended) times that new digit stays at or under the current remainder.",
    derivationSteps: [
      "Pair the digits from the right: 32 | 49.",
      "First pair is 32. The largest number whose square is at most 32 is 5 (5^2 = 25). Quotient so far: 5. Remainder: 32 - 25 = 7.",
      "Bring down the next pair (49): new number to work with is 749.",
      "Double the quotient so far (5 x 2 = 10). Find a digit x such that (10 followed by x) x x is at most 749. Try x = 7: 107 x 7 = 749 -- an exact match.",
      "Quotient becomes 57. Remainder: 749 - 749 = 0."
    ],
    finalAnswer: "sqrt(3249) = 57.",
    conceptualTip: "The long division method is the fastest hand method for large numbers, and is the only one of the three methods that still works cleanly for decimals (pair digits outward from the decimal point in both directions)."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "Find the smallest number that must be multiplied to 180 so that the product becomes a perfect square. Also find the square root of that product.",
    given: { "Number": "180" },
    formulaUsed: "Factorize the number into primes; any prime appearing an ODD number of times needs one more copy of itself to become a complete pair.",
    derivationSteps: [
      "180 = 2 x 2 x 3 x 3 x 5 = 2^2 x 3^2 x 5^1.",
      "The primes 2 and 3 already appear an even number of times (paired), but 5 appears only once (unpaired).",
      "Multiplying by 5 will pair up the remaining 5, making every prime's count even.",
      "180 x 5 = 900 = 2^2 x 3^2 x 5^2. sqrt(900) = 2 x 3 x 5 = 30."
    ],
    finalAnswer: "The smallest multiplier is 5, giving 900, whose square root is 30.",
    conceptualTip: "Only the primes with an ODD exponent in the factorization ever need fixing -- multiply by exactly those primes (each once) and nothing else, to keep the multiplier as small as possible."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Find the smallest number by which 108 must be divided so that the quotient is a perfect square. Also find the square root of the quotient.",
    given: { "Number": "108" },
    formulaUsed: "Factorize the number into primes; any prime with an ODD exponent must be removed entirely (divided out) to leave only evenly-paired primes.",
    derivationSteps: [
      "108 = 2 x 2 x 3 x 3 x 3 = 2^2 x 3^3.",
      "The prime 2 already has an even exponent (2), but 3 has an odd exponent (3) -- one unpaired 3 remains after making two pairs.",
      "Dividing by 3 removes exactly that one unpaired copy: 108 / 3 = 36 = 2^2 x 3^2.",
      "sqrt(36) = 2 x 3 = 6."
    ],
    finalAnswer: "The smallest divisor is 3, giving a quotient of 36, whose square root is 6.",
    conceptualTip: "This is the 'divide' version of the previous multiply question -- always check whether the question asks you to MULTIPLY (fix an odd exponent by adding one more copy) or DIVIDE (fix it by removing the leftover copy entirely), since the correct answer number is usually different between the two."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "A garden is in the shape of a square with an area of 2025 square metres. Find the length of one side of the garden.",
    given: { "Area of the square garden": "2025 square metres" },
    formulaUsed: "For a square, area = side x side, so side = sqrt(area).",
    derivationSteps: [
      "side = sqrt(2025).",
      "Factorize: 2025 = 3 x 3 x 3 x 3 x 5 x 5 = 3^4 x 5^2.",
      "Pairing: (3 x 3) x (3 x 3) x (5 x 5) -- take one from each pair: 3 x 3 x 5 = 45."
    ],
    finalAnswer: "Each side of the garden is 45 metres.",
    conceptualTip: "Any 'area of a square, find the side' word problem is really just a square-root problem in disguise -- the moment you see 'square' and 'area', the very next step is always side = sqrt(area)."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "Is 500 a perfect cube? If not, find the smallest number by which it should be multiplied to make it a perfect cube.",
    given: { "Number": "500" },
    formulaUsed: "A perfect cube's prime factorization has every prime's exponent as a multiple of 3. If any prime's exponent leaves a remainder when divided by 3, more copies of that prime are needed to bring the exponent up to the next multiple of 3.",
    derivationSteps: [
      "500 = 2 x 2 x 5 x 5 x 5 = 2^2 x 5^3.",
      "The exponent of 5 is already 3 (a multiple of 3) -- fine. But the exponent of 2 is 2, which is 1 short of the next multiple of 3 (which is 3).",
      "500 is therefore NOT a perfect cube (2's exponent isn't a multiple of 3).",
      "Multiplying by one more 2 fixes this: 500 x 2 = 1000 = 2^3 x 5^3.",
      "cbrt(1000) = 2 x 5 = 10."
    ],
    finalAnswer: "500 is not a perfect cube. Multiplying by 2 gives 1000, a perfect cube whose cube root is 10.",
    conceptualTip: "For cubes, check each prime's exponent against multiples of 3 (3, 6, 9, ...), not multiples of 2 as you would for squares -- this is the single most common mix-up between the two topics."
  },
  {
    id: 11,
    questionNumber: "Practice Q11",
    question: "Find the cube root of 15625 using the prime factorization method.",
    given: { "Number": "15625" },
    formulaUsed: "Write the number as a product of prime factors, group into triples of identical primes, and take one factor from each triple; multiply those together to get the cube root.",
    derivationSteps: [
      "15625 = 5 x 3125 = 5 x 5 x 625 = 5 x 5 x 5 x 125 = 5 x 5 x 5 x 5 x 25 = 5 x 5 x 5 x 5 x 5 x 5.",
      "So 15625 = 5^6 = (5 x 5 x 5) x (5 x 5 x 5) -- two complete triples.",
      "Take one factor from each triple: 5 x 5 = 25."
    ],
    finalAnswer: "cbrt(15625) = 25.",
    conceptualTip: "A quick check: 25^3 = 25 x 25 x 25 = 625 x 25 = 15625 -- always verify a cube root answer by cubing it back, exactly as this check does."
  },
  {
    id: 12,
    questionNumber: "Practice Q12",
    question: "A cube-shaped water tank has a volume of 13824 cubic metres. Find the length of one edge of the tank.",
    given: { "Volume of the cube tank": "13824 cubic metres" },
    formulaUsed: "For a cube, volume = edge x edge x edge, so edge = cube root of volume.",
    derivationSteps: [
      "edge = cbrt(13824).",
      "Factorize: 13824 = 2^9 x 3^3 (dividing by 2 nine times gives 27, which is 3^3).",
      "Group into triples: (2 x 2 x 2) x (2 x 2 x 2) x (2 x 2 x 2) x (3 x 3 x 3) -- four complete triples.",
      "Take one factor from each triple: 2 x 2 x 2 x 3 = 24."
    ],
    finalAnswer: "Each edge of the tank is 24 metres.",
    conceptualTip: "Just like the square-garden problem, any 'volume of a cube, find the edge' question is a cube-root problem in disguise -- 'cube' plus 'volume' should immediately signal edge = cbrt(volume)."
  },
  {
    id: 13,
    questionNumber: "Practice Q13",
    question: "Using the pattern that expresses a cube as a sum of consecutive odd numbers, write 6^3 as such a sum, and verify the total.",
    given: { "Cube to express": "6^3" },
    formulaUsed: "n^3 can always be written as the sum of n consecutive odd numbers, where the first of these odd numbers is (n^2 - n + 1).",
    derivationSteps: [
      "For n = 6: first odd number = 6^2 - 6 + 1 = 36 - 6 + 1 = 31.",
      "The 6 consecutive odd numbers starting from 31 are: 31, 33, 35, 37, 39, 41.",
      "Sum = 31 + 33 + 35 + 37 + 39 + 41 = 216.",
      "Check: 6^3 = 6 x 6 x 6 = 216. It matches."
    ],
    finalAnswer: "6^3 = 31 + 33 + 35 + 37 + 39 + 41 = 216.",
    conceptualTip: "The number of terms in the sum always equals n itself (here, 6 terms for 6^3) -- if your count of odd numbers doesn't match n, you've started from the wrong first odd number."
  },
  {
    id: 14,
    questionNumber: "Practice Q14",
    question: "Without actually cubing, find the last digit of 87^3.",
    given: { "Number to cube": "87" },
    formulaUsed: "The last digit of a cube is completely determined by the last digit of the original number, via a fixed one-to-one pairing (0-0, 1-1, 2-8, 3-7, 4-4, 5-5, 6-6, 7-3, 8-2, 9-9).",
    derivationSteps: [
      "The last digit of 87 is 7.",
      "From the fixed pairing, a number ending in 7 always produces a cube ending in 3 (since 7^3 = 343, which ends in 3)."
    ],
    finalAnswer: "The last digit of 87^3 is 3.",
    conceptualTip: "This exact pairing is also how the prime-factorization method for cube roots gets a head start in exams: the last digit of a given perfect cube tells you the last digit of its cube root immediately, without any factorization at all."
  },
  {
    id: 15,
    questionNumber: "Practice Q15",
    question: "Estimate sqrt(150) to the nearest whole number, without using a calculator.",
    given: { "Number": "150" },
    formulaUsed: "Find the two consecutive perfect squares that the number falls between, and see which one it is closer to.",
    derivationSteps: [
      "12^2 = 144 and 13^2 = 169.",
      "150 lies between 144 and 169, so sqrt(150) lies between 12 and 13.",
      "150 is much closer to 144 (a difference of 6) than to 169 (a difference of 19), so the estimate should be just a bit above 12."
    ],
    finalAnswer: "sqrt(150) is approximately 12 (a little above 12, more precisely about 12.2).",
    conceptualTip: "This estimation technique -- 'which two perfect squares does it sit between, and which one is it nearer to' -- is exactly what's needed whenever a number isn't a perfect square but you still need a quick, reasoned estimate rather than a calculator."
  },
];

// ── MCQs (1 mark each) ──
export const MATHS8SC_MCQS: QuizQuestion[] = [
  { id: 1, question: "A number obtained by multiplying a whole number by itself is called:", options: ["A cube number", "A perfect square", "A prime number", "A factor"], correctAnswer: 1, explanation: "A perfect square is exactly the result of a whole number multiplied by itself, e.g. 7 x 7 = 49." },
  { id: 2, question: "Which of the following is a perfect square?", options: ["48", "64", "72", "90"], correctAnswer: 1, explanation: "64 = 8 x 8. None of 48, 72, or 90 can be written as a whole number multiplied by itself." },
  { id: 3, question: "The square of an odd number is always:", options: ["Even", "Odd", "A multiple of 4", "Negative"], correctAnswer: 1, explanation: "An odd number squared is always odd -- for example, 7^2 = 49, which is odd." },
  { id: 4, question: "The square of an even number is always:", options: ["Odd", "Even", "A prime number", "Equal to itself"], correctAnswer: 1, explanation: "An even number squared is always even -- for example, 6^2 = 36, which is even." },
  { id: 5, question: "A perfect square number can NEVER end in which of these digits?", options: ["1 or 9", "4 or 6", "0 or 5", "2 or 3"], correctAnswer: 3, explanation: "The only possible last digits of a perfect square are 0, 1, 4, 5, 6, and 9 -- 2, 3, 7, and 8 never occur as the last digit of a perfect square." },
  { id: 6, question: "How many zeroes will 900^2 end with?", options: ["1", "2", "4", "3"], correctAnswer: 2, explanation: "900 ends in 2 zeroes, so 900^2 ends in exactly 2 x 2 = 4 zeroes (900^2 = 810000)." },
  { id: 7, question: "Which of the following numbers has a units digit that could belong to a perfect square?", options: ["9999", "1253", "4447", "7772"], correctAnswer: 0, explanation: "A perfect square can only end in 0, 1, 4, 5, 6, or 9. Checking the last digits here (9, 3, 7, 2), only 9999 ends in a valid digit (9); the other three end in 3, 7, and 2, none of which a perfect square can end in." },
  { id: 8, question: "The sum of the first 9 odd natural numbers is:", options: ["45", "64", "81", "100"], correctAnswer: 2, explanation: "The sum of the first n odd numbers is n^2. Here n = 9, so the sum is 9^2 = 81." },
  { id: 9, question: "1 + 3 + 5 + 7 + 9 + 11 equals:", options: ["25", "36", "49", "64"], correctAnswer: 1, explanation: "There are 6 consecutive odd numbers here, so the sum is 6^2 = 36." },
  { id: 10, question: "How many non-square numbers lie between 15^2 and 16^2?", options: ["15", "30", "31", "32"], correctAnswer: 1, explanation: "Between n^2 and (n+1)^2 there are always exactly 2n numbers. Here n = 15, so 2 x 15 = 30." },
  { id: 11, question: "Which set of three numbers (2m, m^2-1, m^2+1) is generated using m = 5?", options: ["(10, 24, 26)", "(8, 15, 17)", "(12, 35, 37)", "(6, 8, 10)"], correctAnswer: 0, explanation: "2m = 10, m^2-1 = 24, m^2+1 = 26 for m = 5. Check: 10^2 + 24^2 = 100 + 576 = 676 = 26^2." },
  { id: 12, question: "Using m = 4 in the Pythagorean triple pattern (2m, m^2-1, m^2+1) gives:", options: ["(6, 8, 10)", "(8, 15, 17)", "(10, 24, 26)", "(4, 3, 5)"], correctAnswer: 1, explanation: "2m = 8, m^2-1 = 15, m^2+1 = 17. Check: 8^2 + 15^2 = 64 + 225 = 289 = 17^2." },
  { id: 13, question: "In the repeated subtraction method for finding a square root, the square root of the number equals:", options: ["The final remainder", "The number of subtractions performed until reaching 0", "The first number subtracted", "The sum of all numbers subtracted"], correctAnswer: 1, explanation: "Each subtraction removes the next odd number, and the count of successful subtractions needed to reach exactly 0 is the square root." },
  { id: 14, question: "How many subtractions of consecutive odd numbers are needed to reduce 64 to 0?", options: ["6", "7", "8", "9"], correctAnswer: 2, explanation: "sqrt(64) = 8, so exactly 8 subtractions of 1, 3, 5, 7, 9, 11, 13, 15 are needed." },
  { id: 15, question: "Using prime factorization, sqrt(196) equals:", options: ["12", "13", "14", "16"], correctAnswer: 2, explanation: "196 = 2^2 x 7^2, so sqrt(196) = 2 x 7 = 14." },
  { id: 16, question: "Using prime factorization, sqrt(441) equals:", options: ["19", "20", "21", "22"], correctAnswer: 2, explanation: "441 = 3^2 x 7^2, so sqrt(441) = 3 x 7 = 21." },
  { id: 17, question: "The prime factorization of a perfect square always has:", options: ["Every prime appearing an odd number of times", "Every prime appearing an even number of times", "Exactly two distinct prime factors", "No repeated prime factors"], correctAnswer: 1, explanation: "Every prime factor must be able to split into complete matching pairs -- meaning each one appears an even number of times." },
  { id: 18, question: "What is the smallest number by which 72 must be multiplied to make it a perfect square?", options: ["2", "3", "4", "6"], correctAnswer: 0, explanation: "72 = 2^3 x 3^2. The prime 2 has an odd exponent (3), while 3 already has an even exponent (2). Multiplying by 2 gives 2^4 x 3^2 = 144 = 12^2, a perfect square." },
  { id: 19, question: "What is the smallest number by which 50 must be divided to make it a perfect square?", options: ["2", "5", "10", "25"], correctAnswer: 0, explanation: "50 = 2 x 5^2. The prime 2 has an odd exponent (1) and is unpaired. Dividing by 2 gives 25, a perfect square." },
  { id: 20, question: "In the long division method for square roots, digits are grouped in pairs starting from:", options: ["The leftmost digit", "The decimal point (or the rightmost digit if there is none)", "The middle of the number", "Wherever the largest digit is"], correctAnswer: 1, explanation: "Pairing always starts from the units place (or the decimal point) and moves outward, which is why an odd-digit-count number has a lone leftmost digit as its own 'pair'." },
  { id: 21, question: "Using the long division method, sqrt(1225) equals:", options: ["33", "34", "35", "36"], correctAnswer: 2, explanation: "Pairing 12|25: 3^2=9 fits under 12 (remainder 3), bring down 25 to get 325; double 3 is 6, and 65 x 5 = 325 exactly, giving quotient 35." },
  { id: 22, question: "sqrt(51.84) equals:", options: ["6.8", "7.0", "7.2", "7.4"], correctAnswer: 2, explanation: "7.2 x 7.2 = 51.84 exactly." },
  { id: 23, question: "A square-shaped park has an area of 5625 square metres. Its side length is:", options: ["65 m", "70 m", "75 m", "80 m"], correctAnswer: 2, explanation: "sqrt(5625) = 75, since 75 x 75 = 5625." },
  { id: 24, question: "sqrt(90) lies between which two whole numbers?", options: ["8 and 9", "9 and 10", "10 and 11", "7 and 8"], correctAnswer: 1, explanation: "9^2 = 81 and 10^2 = 100, and 90 lies between them, so sqrt(90) lies between 9 and 10." },
  { id: 25, question: "A number obtained by multiplying a whole number by itself three times is called:", options: ["A perfect square", "A perfect cube", "A prime factor", "A triangular number"], correctAnswer: 1, explanation: "A perfect cube is exactly a whole number multiplied by itself three times, e.g. 5 x 5 x 5 = 125." },
  { id: 26, question: "Which of the following is a perfect cube?", options: ["100", "121", "216", "300"], correctAnswer: 2, explanation: "216 = 6 x 6 x 6. None of 100, 121, or 300 can be written as a whole number cubed." },
  { id: 27, question: "The cube of a negative number is always:", options: ["Positive", "Negative", "Zero", "Undefined"], correctAnswer: 1, explanation: "A negative number cubed stays negative, since multiplying three negatives together gives a negative result: (-2)^3 = -8." },
  { id: 28, question: "The cube of an even number is always:", options: ["Odd", "Even", "A perfect square too", "Negative"], correctAnswer: 1, explanation: "An even number cubed remains even -- for example, 4^3 = 64." },
  { id: 29, question: "3^3 is expressed as the sum of how many consecutive odd numbers?", options: ["2", "3", "4", "9"], correctAnswer: 1, explanation: "n^3 is always the sum of exactly n consecutive odd numbers. For 3^3, that is 3 odd numbers: 7 + 9 + 11 = 27." },
  { id: 30, question: "5^3 is expressed as the sum of the 5 consecutive odd numbers starting at:", options: ["17", "19", "21", "23"], correctAnswer: 2, explanation: "The first odd number is n^2 - n + 1 = 25 - 5 + 1 = 21, giving 21+23+25+27+29 = 125 = 5^3." },
  { id: 31, question: "A number ending in which digit can NEVER be a perfect cube ending?", options: ["2", "3", "Every digit 0-9 is possible for some perfect cube", "5"], correctAnswer: 2, explanation: "Unlike squares, EVERY digit 0-9 can be the last digit of some perfect cube (e.g. cubes ending in 2, 3, 7, 8 all genuinely occur, such as 12^3 = 1728 ending in 8)." },
  { id: 32, question: "If a number ends in 8, its cube root (if it is a perfect cube) must end in:", options: ["2", "3", "7", "8"], correctAnswer: 0, explanation: "The fixed last-digit pairing for cubes matches 2 with 8 (since 2^3 = 8), so a cube ending in 8 has a cube root ending in 2." },
  { id: 33, question: "If a number ends in 7, its cube root (if it is a perfect cube) must end in:", options: ["3", "7", "4", "9"], correctAnswer: 0, explanation: "The fixed pairing matches 3 with 7 (since 3^3 = 27, ending in 7), so a cube ending in 7 has a cube root ending in 3." },
  { id: 34, question: "Using prime factorization, cbrt(1728) equals:", options: ["10", "11", "12", "13"], correctAnswer: 2, explanation: "1728 = 2^6 x 3^3 = (2x2x2) x (2x2x2) x (3x3x3), giving cube root 2 x 2 x 3 = 12." },
  { id: 35, question: "Using prime factorization, cbrt(9261) equals:", options: ["19", "20", "21", "22"], correctAnswer: 2, explanation: "9261 = 3^3 x 7^3, so cbrt(9261) = 3 x 7 = 21." },
  { id: 36, question: "The prime factorization of a perfect cube always has:", options: ["Every prime's exponent a multiple of 3", "Every prime's exponent a multiple of 2", "Exactly three prime factors", "No repeated prime factors"], correctAnswer: 0, explanation: "Every prime must be able to split into complete groups of three, meaning each one's exponent is a multiple of 3." },
  { id: 37, question: "What is the smallest number by which 88 must be multiplied to make it a perfect cube?", options: ["2", "11", "121", "22"], correctAnswer: 2, explanation: "88 = 2^3 x 11^1. The exponent of 11 is 1, needing 2 more copies (to reach 3), so multiply by 11^2 = 121." },
  { id: 38, question: "What is the smallest number by which 250 must be multiplied to make it a perfect cube?", options: ["2", "4", "5", "10"], correctAnswer: 1, explanation: "250 = 2^1 x 5^3. The exponent of 2 is 1, needing 2 more copies to reach 3, so multiply by 2^2 = 4." },
  { id: 39, question: "A cube-shaped box has volume 3375 cubic cm. Its edge length is:", options: ["12 cm", "13 cm", "14 cm", "15 cm"], correctAnswer: 3, explanation: "3375 = 3^3 x 5^3, so cbrt(3375) = 3 x 5 = 15." },
  { id: 40, question: "How many perfect cubes lie between 1 and 100 (both included)?", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "1, 8, 27, and 64 are the perfect cubes up to 100 -- that is 4 of them (125 is already over 100)." },
  { id: 41, question: "How many perfect squares lie between 1 and 100 (both included)?", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "1, 4, 9, 16, 25, 36, 49, 64, 81, 100 -- that is 10 perfect squares." },
  { id: 42, question: "A three-digit perfect square has how many digits in its square root?", options: ["Always 1 digit", "Always 2 digits", "Always 3 digits", "Could be 1 or 2 digits"], correctAnswer: 1, explanation: "The square root of any 3-digit number (10 to 99 squared gives 100 to 9801, but restricting to 3-digit squares: 100 to 961) is always a 2-digit number (10 to 31)." },
  { id: 43, question: "A six-digit perfect cube has how many digits in its cube root?", options: ["1 digit", "2 digits", "3 digits", "4 digits"], correctAnswer: 1, explanation: "6-digit perfect cubes range from 100000 to 999999, whose cube roots range from about 46 to 99 -- always 2 digits." },
  { id: 44, question: "Which of these is NOT a perfect square?", options: ["361", "400", "450", "484"], correctAnswer: 2, explanation: "19^2 = 361, 20^2 = 400, and 22^2 = 484 are perfect squares, but 450 lies strictly between 21^2 = 441 and 22^2 = 484, so it is not one." },
  { id: 45, question: "Which of these is NOT a perfect cube?", options: ["512", "600", "729", "1000"], correctAnswer: 1, explanation: "8^3 = 512, 9^3 = 729, and 10^3 = 1000 are perfect cubes, but 600 lies strictly between 8^3 = 512 and 9^3 = 729, so it is not one." },
  { id: 46, question: "If x^2 = 289, then x equals:", options: ["15", "16", "17", "18"], correctAnswer: 2, explanation: "17 x 17 = 289." },
  { id: 47, question: "If y^3 = 4913, then y equals:", options: ["15", "16", "17", "18"], correctAnswer: 2, explanation: "17 x 17 x 17 = 4913." },
  { id: 48, question: "The number of zeroes at the end of a perfect square that itself ends in an even number of zeroes must be:", options: ["Any number", "Always an even number", "Always an odd number", "Always exactly 2"], correctAnswer: 1, explanation: "Since squaring doubles the count of trailing zeroes in the original number, a perfect square's own trailing-zero count is always even." },
  { id: 49, question: "The number of zeroes at the end of a perfect cube must always be a multiple of:", options: ["2", "3", "5", "6"], correctAnswer: 1, explanation: "Cubing a number with k trailing zeroes gives 3k trailing zeroes, so a perfect cube's trailing-zero count is always a multiple of 3." },
  { id: 50, question: "Which method is best suited for finding the square root of a large decimal number such as 176.89?", options: ["Repeated subtraction", "Prime factorization", "Long division", "Guessing between two squares"], correctAnswer: 2, explanation: "The long division method is the only one of these that extends cleanly to decimals, by pairing digits outward from the decimal point in both directions." },
];

// ── VERY SHORT (2 marks each) ──
export const MATHS8SC_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define a perfect square with one example.", answer: "A perfect square is a number obtained by multiplying a whole number by itself. Example: 36 = 6 x 6.", keyPoints: ["Whole number times itself", "Example: 36 = 6x6"] },
  { id: 2, question: "Define a perfect cube with one example.", answer: "A perfect cube is a number obtained by multiplying a whole number by itself three times. Example: 125 = 5 x 5 x 5.", keyPoints: ["Whole number cubed", "Example: 125 = 5x5x5"] },
  { id: 3, question: "State whether 2028 can be a perfect square, and why.", answer: "No -- 2028 ends in 8, and a perfect square can never end in 2, 3, 7, or 8.", keyPoints: ["Last digit 8", "Never a valid perfect-square ending"] },
  { id: 4, question: "State whether 4225 can be a perfect square, and why it can't be ruled out by its last digit alone.", answer: "It cannot be ruled out, since it ends in 5, one of the valid perfect-square endings (0,1,4,5,6,9). Checking further, 4225 = 65^2, so it IS a perfect square.", keyPoints: ["Ends in 5 (valid)", "4225 = 65 x 65"] },
  { id: 5, question: "Find the sum 1+3+5+7+9 using the odd-number-sum pattern.", answer: "There are 5 consecutive odd numbers, so the sum is 5^2 = 25.", keyPoints: ["5 terms", "Sum = 5^2 = 25"] },
  { id: 6, question: "How many numbers lie between 20^2 and 21^2?", answer: "2 x 20 = 40 numbers.", keyPoints: ["Formula 2n", "n=20 gives 40"] },
  { id: 7, question: "Write the Pythagorean triple generated using m = 3 in (2m, m^2-1, m^2+1).", answer: "2m=6, m^2-1=8, m^2+1=10, giving the triple (6, 8, 10).", keyPoints: ["m=3", "(6,8,10)"] },
  { id: 8, question: "Verify that (9, 40, 41) is a Pythagorean triple.", answer: "9^2 + 40^2 = 81 + 1600 = 1681, and 41^2 = 1681. They match, so it is a valid triple.", keyPoints: ["81+1600=1681", "41^2=1681"] },
  { id: 9, question: "Find sqrt(169) using repeated subtraction (state only the count of subtractions and the answer).", answer: "13 subtractions of consecutive odd numbers (1,3,...,25) reduce 169 to exactly 0, so sqrt(169) = 13.", keyPoints: ["13 subtractions", "sqrt(169)=13"] },
  { id: 10, question: "Find sqrt(484) using prime factorization.", answer: "484 = 2^2 x 11^2, so sqrt(484) = 2 x 11 = 22.", keyPoints: ["484=2^2x11^2", "sqrt=22"] },
  { id: 11, question: "Find sqrt(676) using prime factorization.", answer: "676 = 2^2 x 13^2, so sqrt(676) = 2 x 13 = 26.", keyPoints: ["676=2^2x13^2", "sqrt=26"] },
  { id: 12, question: "Is 98 a perfect square? If not, find the smallest number to multiply it by to make it one.", answer: "98 = 2 x 7^2. The prime 2 is unpaired, so multiplying by 2 gives 196 = 14^2, a perfect square.", keyPoints: ["98=2x7^2", "Multiply by 2 -> 196"] },
  { id: 13, question: "Is 75 a perfect square? If not, find the smallest number to divide it by to make it one.", answer: "75 = 3 x 5^2. The prime 3 is unpaired, so dividing by 3 gives 25 = 5^2, a perfect square.", keyPoints: ["75=3x5^2", "Divide by 3 -> 25"] },
  { id: 14, question: "Estimate sqrt(70) between two consecutive whole numbers.", answer: "8^2 = 64 and 9^2 = 81, and 70 lies between them, so sqrt(70) is between 8 and 9.", keyPoints: ["64 < 70 < 81", "Between 8 and 9"] },
  { id: 15, question: "Find sqrt(1.44).", answer: "1.2 x 1.2 = 1.44, so sqrt(1.44) = 1.2.", keyPoints: ["1.2x1.2=1.44"] },
  { id: 16, question: "A square carpet has area 324 square metres. Find its side length.", answer: "sqrt(324) = 18, since 18 x 18 = 324, so the side is 18 metres.", keyPoints: ["sqrt(324)=18"] },
  { id: 17, question: "State the cube of -4.", answer: "(-4)^3 = -4 x -4 x -4 = -64.", keyPoints: ["Negative cubed stays negative", "(-4)^3=-64"] },
  { id: 18, question: "Express 4^3 as the sum of consecutive odd numbers.", answer: "First odd number = 4^2-4+1 = 13. The 4 consecutive odd numbers are 13+15+17+19 = 64 = 4^3.", keyPoints: ["First term = 13", "13+15+17+19=64"] },
  { id: 19, question: "Without cubing, find the last digit of 63^3.", answer: "63 ends in 3, and 3^3 = 27 ends in 7, so 63^3 ends in 7.", keyPoints: ["Last digit 3 -> cube ends in 7"] },
  { id: 20, question: "Without cubing, find the last digit of 124^3.", answer: "124 ends in 4, and 4^3 = 64 ends in 4, so 124^3 ends in 4.", keyPoints: ["Last digit 4 -> cube ends in 4"] },
  { id: 21, question: "Find cbrt(2744) using prime factorization.", answer: "2744 = 2^3 x 7^3, so cbrt(2744) = 2 x 7 = 14.", keyPoints: ["2744=2^3x7^3", "cbrt=14"] },
  { id: 22, question: "Find cbrt(10648) using prime factorization.", answer: "10648 = 2^3 x 11^3, so cbrt(10648) = 2 x 11 = 22.", keyPoints: ["10648=2^3x11^3", "cbrt=22"] },
  { id: 23, question: "Is 120 a perfect cube? If not, find the smallest number to multiply it by to make it one.", answer: "120 = 2^3 x 3 x 5. Both 3 and 5 have exponent 1 (need 2 more each), so multiply by 3^2 x 5^2 = 225 to get 27000, a perfect cube.", keyPoints: ["120=2^3x3x5", "Multiply by 225 -> 27000"] },
  { id: 24, question: "A cube has volume 8000 cubic cm. Find its edge length.", answer: "8000 = 2^6 x 5^3, so cbrt(8000) = 2^2 x 5 = 20 cm.", keyPoints: ["cbrt(8000)=20"] },
  { id: 25, question: "How many perfect cubes lie strictly between 27 and 216?", answer: "The perfect cubes here are 64 (4^3) and 125 (5^3) -- that is 2 of them.", keyPoints: ["4^3=64, 5^3=125", "2 cubes"] },
  { id: 26, question: "State one number that is both a perfect square and a perfect cube, other than 1, and explain why.", answer: "64 is both, since 64 = 8^2 (a perfect square) and 64 = 4^3 (a perfect cube). Any number that is a perfect sixth power (like 2^6=64) is automatically both.", keyPoints: ["64=8^2 and 64=4^3", "Perfect sixth powers work"] },
  { id: 27, question: "Find the square of 105 using the identity (a+b)^2 = a^2+2ab+b^2, taking a=100, b=5.", answer: "105^2 = 100^2 + 2(100)(5) + 5^2 = 10000 + 1000 + 25 = 11025.", keyPoints: ["a=100,b=5", "11025"] },
  { id: 28, question: "Find the square of 98 using the identity (a-b)^2 = a^2-2ab+b^2, taking a=100, b=2.", answer: "98^2 = 100^2 - 2(100)(2) + 2^2 = 10000 - 400 + 4 = 9604.", keyPoints: ["a=100,b=2", "9604"] },
  { id: 29, question: "Find sqrt(0.0016).", answer: "0.04 x 0.04 = 0.0016, so sqrt(0.0016) = 0.04.", keyPoints: ["0.04x0.04=0.0016"] },
  { id: 30, question: "A number when cubed gives a result ending in 5. What must the units digit of the original number be?", answer: "5, since 5^3 = 125 also ends in 5, and 5 is the only digit that maps to itself under cubing in this way (checking all others confirms no other digit's cube ends in 5).", keyPoints: ["Units digit 5", "5^3=125"] },
];

// ── SHORT (3 marks each) ──
export const MATHS8SC_SHORT: ShortQuestion[] = [
  { id: 1, question: "Find sqrt(3025) using the prime factorization method, showing the full factor tree.", answer: "3025 = 5 x 605 = 5 x 5 x 121 = 5 x 5 x 11 x 11 = 5^2 x 11^2. Pairing: (5x5)(11x11). sqrt(3025) = 5 x 11 = 55.", keyPoints: ["Factorize fully: 5^2 x 11^2", "Pair identical primes", "sqrt = 5x11 = 55"] },
  { id: 2, question: "Find sqrt(7744) using the long division method, showing each step.", answer: "Pair as 77|44. Largest digit d with d^2 <= 77 is 8 (64), remainder 13. Bring down 44 to get 1344. Double 8 = 16; find x so (160+x)x <= 1344: x=8 gives 168x8=1344 exactly. Quotient = 88, remainder 0. sqrt(7744) = 88.", keyPoints: ["Pair digits: 77|44", "First digit 8, remainder 13", "Second digit 8, quotient 88"] },
  { id: 3, question: "Using the repeated subtraction method, show all the subtraction steps to find sqrt(49).", answer: "49-1=48(1), 48-3=45(2), 45-5=40(3), 40-7=33(4), 33-9=24(5), 24-11=13(6), 13-13=0(7). 7 subtractions were needed, so sqrt(49)=7.", keyPoints: ["List all successive odd subtractions", "Reaches 0 after 7 steps", "sqrt(49) = 7"] },
  { id: 4, question: "A society wants to plant trees so that the number of rows equals the number of trees in each row, using exactly 1024 trees. How many rows will there be?", answer: "This means the number of rows, r, satisfies r x r = 1024, so r = sqrt(1024). Since 1024 = 2^10 = (2^5)^2, sqrt(1024) = 2^5 = 32. There will be 32 rows.", keyPoints: ["Set up r^2 = 1024", "1024 = 2^10", "r = 32"] },
  { id: 5, question: "Find the smallest 4-digit perfect square, and state its square root.", answer: "The smallest 4-digit number is 1000. sqrt(1000) is approximately 31.6, so try 32: 32^2 = 1024, which is the smallest 4-digit perfect square (31^2 = 961 is only 3 digits). Its square root is 32.", keyPoints: ["31^2=961 (too small)", "32^2=1024 (first 4-digit square)", "Square root is 32"] },
  { id: 6, question: "Find the largest 3-digit perfect square, and state its square root.", answer: "sqrt(999) is approximately 31.6, so try 31: 31^2 = 961, a 3-digit number. Check 32^2 = 1024, which is 4 digits, too big. So 961 is the largest 3-digit perfect square, with square root 31.", keyPoints: ["32^2=1024 (too big)", "31^2=961 (fits)", "Square root is 31"] },
  { id: 7, question: "Verify whether 3364 is a perfect square using prime factorization, and find its square root if so.", answer: "3364 = 2 x 1682 = 2 x 2 x 841 = 2 x 2 x 29 x 29 = 2^2 x 29^2. Every prime appears an even number of times, so it IS a perfect square. sqrt(3364) = 2 x 29 = 58.", keyPoints: ["Factorize: 2^2 x 29^2", "All exponents even -> perfect square", "sqrt = 58"] },
  { id: 8, question: "Find the smallest number that must be added to 1780 to make it a perfect square.", answer: "sqrt(1780) is approximately 42.2, so check 42^2=1764 and 43^2=1849. Since 1780 is between these, the next perfect square above 1780 is 1849. Adding 1849-1780=69 gives the next perfect square.", keyPoints: ["42^2=1764, 43^2=1849", "1780 is between them", "Add 69 to reach 1849"] },
  { id: 9, question: "Find the largest number that must be subtracted from 1780 to make it a perfect square.", answer: "From the previous check, 42^2 = 1764, which is below 1780. Subtracting 1780-1764=16 brings it down exactly to the perfect square 1764.", keyPoints: ["42^2=1764 (largest square below 1780)", "Subtract 16"] },
  { id: 10, question: "A gardener has 5000 plants and wants to plant them in rows such that the number of rows equals the number of columns. Find how many more plants are needed for this to be possible, or how many should be removed.", answer: "sqrt(5000) is approximately 70.7, so check 70^2=4900 and 71^2=5041. Since 5000 is closer to being reached by adding, the gardener needs 5041-5000=41 more plants to form a 71x71 square, OR could remove 5000-4900=100 plants to form a 70x70 square.", keyPoints: ["70^2=4900, 71^2=5041", "Add 41 for 71x71, or remove 100 for 70x70"] },
  { id: 11, question: "Show that 2^3 + 3^3 does NOT equal (2+3)^3, and state the actual difference between them.", answer: "2^3+3^3 = 8+27 = 35. (2+3)^3 = 5^3 = 125. They are not equal; the difference is 125-35 = 90.", keyPoints: ["2^3+3^3=35", "(2+3)^3=125", "Difference is 90"] },
  { id: 12, question: "Find cbrt(35937) using prime factorization, showing the full factor tree.", answer: "35937 = 3 x 11979 = 3 x 3 x 3993 = 3 x 3 x 3 x 1331 = 3^3 x 11^3 (since 1331 = 11x11x11). Grouping into triples: (3x3x3)(11x11x11). cbrt(35937) = 3 x 11 = 33.", keyPoints: ["Factorize: 3^3 x 11^3", "Group into triples", "cbrt = 3x11 = 33"] },
  { id: 13, question: "Is 200 a perfect cube? If not, find the smallest number to multiply it by to make it one, and state the resulting cube root.", answer: "200 = 2^3 x 5^2. The exponent of 5 is 2, needing 1 more to reach 3. Multiplying by 5 gives 1000 = 2^3 x 5^3, a perfect cube. cbrt(1000) = 2 x 5 = 10.", keyPoints: ["200=2^3x5^2", "Multiply by 5 -> 1000", "cbrt(1000)=10"] },
  { id: 14, question: "Find the smallest number by which 192 must be divided to make it a perfect cube, and state the resulting cube root.", answer: "192 = 2^6 x 3^1. The exponent of 3 is 1, which is not a multiple of 3 and cannot be reduced further by dividing without removing it entirely. Dividing by 3 gives 64 = 2^6, and cbrt(64) = 2^2 = 4.", keyPoints: ["192=2^6x3", "Divide by 3 -> 64", "cbrt(64)=4"] },
  { id: 15, question: "Express 7^3 as a sum of consecutive odd numbers and verify the total.", answer: "First odd number = 7^2-7+1 = 43. The 7 consecutive odd numbers are 43,45,47,49,51,53,55. Sum = 43+45+47+49+51+53+55 = 343 = 7^3.", keyPoints: ["First term 43", "7 terms summing to 343"] },
  { id: 16, question: "A cube-shaped box has a volume of 21952 cubic cm. A second, similar box has 8 times this volume. Find the edge length of each box.", answer: "First box: 21952 = 2^6 x 7^3, cbrt = 2^2 x 7 = 28 cm. Second box's volume = 21952 x 8 = 175616 = 2^9 x 7^3, cbrt = 2^3 x 7 = 56 cm.", keyPoints: ["First edge: 28 cm", "Volume x8 -> edge doubles", "Second edge: 56 cm"] },
  { id: 17, question: "Without fully calculating, determine whether 5^3 + 6^3 is greater than, less than, or equal to (5+6)^3, and justify briefly.", answer: "5^3+6^3 = 125+216 = 341. (5+6)^3 = 11^3 = 1331. Since 341 < 1331, the sum of cubes is much less than the cube of the sum -- cubing a combined (larger) number grows far faster than adding two smaller cubes.", keyPoints: ["5^3+6^3=341", "11^3=1331", "Sum of cubes is smaller"] },
  { id: 18, question: "Find the number of digits in the cube root of 456533, without fully computing the cube root.", answer: "456533 has 6 digits. For a 6-digit perfect cube, grouping digits from the right in sets of three gives two groups (456 and 533), meaning the cube root has exactly 2 digits.", keyPoints: ["Group digits in sets of 3", "Two groups -> 2-digit cube root"] },
  { id: 19, question: "Find the number of digits in the square root of 15129, without fully computing the square root.", answer: "15129 has 5 digits. Grouping digits from the right in pairs gives 1|51|29 -- three groups (the leftmost group can have just 1 digit), so the square root has exactly 3 digits.", keyPoints: ["Group digits in pairs", "Three groups -> 3-digit square root"] },
  { id: 20, question: "Find the smallest square number divisible by each of the numbers 6, 9, and 15.", answer: "LCM of 6, 9, 15 = 90 = 2 x 3^2 x 5. The exponents of 2 and 5 are odd (1 each), so multiply by 2 x 5 = 10 to make every exponent even: 90 x 10 = 900 = 2^2 x 3^2 x 5^2, which is 30^2.", keyPoints: ["LCM(6,9,15)=90", "90=2x3^2x5", "Multiply by 10 -> 900=30^2"] },
];

// ── LONG (5 marks each) ──
export const MATHS8SC_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Find the square root of 11664 using the long division method, showing every step clearly, and verify your answer by squaring it.",
    markingScheme: [
      "Correctly pairs the digits from the right: 1|16|64",
      "Finds the first quotient digit correctly (1, since 1^2=1 fits under the first group '1', remainder 0)",
      "Brings down the next pair (16) and correctly finds the next quotient digit (0, since with quotient-so-far 1 doubled to 2, testing 20 x 0 = 0 fits under 16 with room, but the digit must be chosen properly to maximize digit value)",
      "Continues the process correctly through the final pair, arriving at quotient 108",
      "Verifies 108 x 108 = 11664 to confirm the answer"
    ],
    answerParts: [
      { part: "Setup", text: "Pair the digits of 11664 from the right: 1 | 16 | 64." },
      { part: "Step 1", text: "First group is '1'. Largest digit d with d^2 <= 1 is 1 (1^2=1). Quotient so far: 1. Remainder: 1-1=0." },
      { part: "Step 2", text: "Bring down the next pair (16): new number is 016 = 16. Double the quotient (1x2=2). Find digit x such that (20+x)*x <= 16. Since even x=0 gives 20x0=0 <=16, but we need the LARGEST such x; testing x=0 is forced since (21)x1=21>16. So x=0. Quotient becomes 10. Remainder stays 16." },
      { part: "Step 3", text: "Bring down the next pair (64): new number is 1664. Double the quotient (10x2=20). Find digit x such that (200+x)*x <= 1664. Testing x=8: 208x8=1664, an exact match. Quotient becomes 108. Remainder: 0." },
      { part: "Final Answer", text: "sqrt(11664) = 108. Verification: 108 x 108 = 11664, confirming the answer is correct." }
    ]
  },
  {
    id: 2,
    question: "A farmer has 8836 sq metres of land in the shape of a square, and wants to fence it using a 4-metre gap for a gate. Find the total length of fencing wire required using the square root of the area to determine the side, then computing the total perimeter minus the gate gap.",
    markingScheme: [
      "Correctly identifies that side = sqrt(area) and sets up sqrt(8836)",
      "Correctly finds sqrt(8836) = 94 (using any valid method, verified by 94x94=8836)",
      "Correctly computes the perimeter of the square: 4 x side = 4 x 94 = 376 metres",
      "Correctly subtracts the 4-metre gate gap: 376 - 4 = 372 metres",
      "States the final answer clearly with correct units"
    ],
    answerParts: [
      { part: "Step 1: Find the side", text: "Side = sqrt(8836). Factorizing: 8836 = 2^2 x 47^2, so sqrt(8836) = 2 x 47 = 94 metres." },
      { part: "Step 2: Find the perimeter", text: "Perimeter of the square = 4 x side = 4 x 94 = 376 metres." },
      { part: "Step 3: Subtract the gate gap", text: "Fencing required = 376 - 4 = 372 metres." },
      { part: "Final Answer", text: "372 metres of fencing wire is required." }
    ]
  },
  {
    id: 3,
    question: "Three consecutive natural numbers n-1, n, n+1 have the property that (n-1)(n+1) = n^2 - 1. Using this, find three consecutive natural numbers whose outer product is exactly 168, then verify the middle number's square is 169.",
    markingScheme: [
      "Correctly sets up the equation n^2 - 1 = 168",
      "Correctly solves n^2 = 169",
      "Correctly finds n = 13 (taking the positive root, since natural numbers are positive)",
      "States the three consecutive numbers as 12, 13, 14",
      "Verifies both that 12 x 14 = 168 AND that 13^2 = 169"
    ],
    answerParts: [
      { part: "Setting up", text: "Let the three consecutive numbers be n-1, n, n+1. Their outer product is (n-1)(n+1) = n^2 - 1." },
      { part: "Solving", text: "n^2 - 1 = 168, so n^2 = 169, giving n = 13 (the positive root, since these are natural numbers)." },
      { part: "The three numbers", text: "The three consecutive numbers are 12, 13, and 14." },
      { part: "Verification", text: "12 x 14 = 168, matching the given product. Also, 13^2 = 169, confirming the middle number's square is exactly one more than the outer product, as the identity predicts." },
      { part: "Final Answer", text: "The three numbers are 12, 13, and 14." }
    ]
  },
  {
    id: 4,
    question: "Using the pattern (2m, m^2-1, m^2+1) for generating Pythagorean triples, generate the triples for m = 7 and m = 9, and verify BOTH using the Pythagoras relation.",
    markingScheme: [
      "Correctly computes the triple for m=7: (14, 48, 50)",
      "Correctly verifies 14^2+48^2=50^2 for the first triple",
      "Correctly computes the triple for m=9: (18, 80, 82)",
      "Correctly verifies 18^2+80^2=82^2 for the second triple",
      "States both final triples clearly"
    ],
    answerParts: [
      { part: "For m=7", text: "2m = 14, m^2-1 = 48, m^2+1 = 50. Triple: (14, 48, 50)." },
      { part: "Verifying m=7", text: "14^2 + 48^2 = 196 + 2304 = 2500. 50^2 = 2500. They match." },
      { part: "For m=9", text: "2m = 18, m^2-1 = 80, m^2+1 = 82. Triple: (18, 80, 82)." },
      { part: "Verifying m=9", text: "18^2 + 80^2 = 324 + 6400 = 6724. 82^2 = 6724. They match." },
      { part: "Final Answer", text: "The two Pythagorean triples are (14, 48, 50) and (18, 80, 82), both verified correct." }
    ]
  },
  {
    id: 5,
    question: "Find the smallest square number that is exactly divisible by each of the numbers 8, 12, and 15. Show your full working using LCM and prime factorization.",
    markingScheme: [
      "Correctly finds the LCM of 8, 12, and 15",
      "Correctly finds the prime factorization of that LCM",
      "Correctly identifies which primes have an odd exponent",
      "Correctly determines the smallest multiplier needed to make all exponents even",
      "Correctly computes the final answer and identifies its square root"
    ],
    answerParts: [
      { part: "Step 1: Find the LCM", text: "8 = 2^3, 12 = 2^2 x 3, 15 = 3 x 5. LCM = 2^3 x 3 x 5 = 120." },
      { part: "Step 2: Factorize the LCM", text: "120 = 2^3 x 3^1 x 5^1." },
      { part: "Step 3: Identify odd exponents", text: "The exponents of 2, 3, and 5 are 3, 1, and 1 respectively -- all odd, so each needs exactly one more copy to become even." },
      { part: "Step 4: Find the multiplier", text: "Multiply by 2 x 3 x 5 = 30. 120 x 30 = 3600 = 2^4 x 3^2 x 5^2." },
      { part: "Final Answer", text: "The smallest such square number is 3600, and sqrt(3600) = 2^2 x 3 x 5 = 60." }
    ]
  },
  {
    id: 6,
    question: "A cuboid-shaped box has dimensions in the ratio 2:3:4, and a cube of the same volume as this cuboid has an edge of 12 cm. Find the actual dimensions of the cuboid.",
    markingScheme: [
      "Correctly finds the volume of the cube: 12^3 = 1728 cubic cm",
      "Correctly sets up the cuboid's dimensions as 2x, 3x, 4x for some x",
      "Correctly sets up the equation (2x)(3x)(4x) = 1728, simplifying to 24x^3 = 1728",
      "Correctly solves for x^3 = 72, and further simplification if needed to find x",
      "Correctly finds the final dimensions of the cuboid"
    ],
    answerParts: [
      { part: "Step 1: Volume of the cube", text: "Volume = 12^3 = 1728 cubic cm." },
      { part: "Step 2: Set up the cuboid's dimensions", text: "Let the dimensions be 2x, 3x, and 4x. Volume = (2x)(3x)(4x) = 24x^3." },
      { part: "Step 3: Equate volumes", text: "24x^3 = 1728, so x^3 = 72." },
      { part: "Step 4: Note on x", text: "72 is not a perfect cube (72 = 2^3 x 3^2, and the exponent of 3 is not a multiple of 3), so x is not a whole number here -- the cuboid's dimensions in this exact ratio and this exact equal-volume condition come out as x = cube root of 72 (approximately 4.16), giving approximate dimensions 8.32 cm, 12.48 cm, and 16.64 cm." },
      { part: "Final Answer", text: "x = cbrt(72) (approximately 4.16 cm), giving approximate dimensions 8.32 cm x 12.48 cm x 16.64 cm; a genuinely whole-number answer would require the ratio or the cube's edge to be chosen so that x^3 comes out as a perfect cube." }
    ]
  },
  {
    id: 7,
    question: "Find the square root of 176.89 using the long division method for decimals, showing how the digits are paired around the decimal point.",
    markingScheme: [
      "Correctly pairs the integer part digits from the decimal point going left: 1|76",
      "Correctly pairs the decimal part digits from the decimal point going right: 89",
      "Correctly finds the integer part of the square root through the standard process",
      "Correctly continues into the decimal part, bringing down the paired decimal digits",
      "Arrives at the correct final answer 13.3 and verifies by squaring"
    ],
    answerParts: [
      { part: "Pairing", text: "Integer part 176 pairs as 1|76 (from the decimal point leftward); decimal part .89 pairs as .89 (from the decimal point rightward)." },
      { part: "First pair", text: "First group '1': largest d with d^2<=1 is 1 (1^2=1). Quotient so far: 1. Remainder: 0." },
      { part: "Second pair", text: "Bring down 76: number is 076=76. Double the quotient (1x2=2). Find x with (20+x)x<=76: x=3 gives 23x3=69 (remainder 7). Quotient so far: 13." },
      { part: "Decimal pair", text: "Bring down the decimal pair 89: number is 789. Double the quotient (13x2=26). Find x with (260+x)x<=789: x=3 gives 263x3=789, an exact match. Quotient: 13.3. Remainder: 0." },
      { part: "Final Answer", text: "sqrt(176.89) = 13.3. Verification: 13.3 x 13.3 = 176.89, confirming the answer." }
    ]
  },
  {
    id: 8,
    question: "Show that the difference between the squares of two consecutive natural numbers is always equal to the sum of those two numbers. Verify this rule using the pair 45 and 46.",
    markingScheme: [
      "Correctly sets up two consecutive numbers algebraically as n and n+1",
      "Correctly expands (n+1)^2 - n^2 using algebra",
      "Correctly simplifies to reach 2n+1, which equals n + (n+1)",
      "Correctly applies the verified rule to the specific numbers 45 and 46",
      "Correctly confirms the numeric check matches the algebraic rule"
    ],
    answerParts: [
      { part: "Setting up algebraically", text: "Let the two consecutive numbers be n and n+1." },
      { part: "Expanding the difference of squares", text: "(n+1)^2 - n^2 = (n^2 + 2n + 1) - n^2 = 2n + 1." },
      { part: "Connecting to the sum", text: "The sum of the two numbers is n + (n+1) = 2n + 1, exactly matching the difference of their squares." },
      { part: "Verifying with 45 and 46", text: "46^2 - 45^2 = 2116 - 2025 = 91. Sum: 45 + 46 = 91. They match exactly." },
      { part: "Final Answer", text: "The rule is confirmed both algebraically (difference = 2n+1 = sum) and numerically (91 = 91) for the pair 45 and 46." }
    ]
  },
  {
    id: 9,
    question: "A number N, when expressed as a product of primes, is 2^4 x 3^2 x 5^6 x 7^3. Determine whether N is a perfect square, a perfect cube, both, or neither, giving full reasoning, and state the smallest number by which N must be multiplied to make it BOTH a perfect square and a perfect cube (i.e. a perfect sixth power).",
    markingScheme: [
      "Correctly checks each exponent for the perfect-square condition (all even)",
      "Correctly concludes N is not a perfect square (7's exponent, 3, is odd)",
      "Correctly checks each exponent for the perfect-cube condition (all multiples of 3)",
      "Correctly concludes N is not a perfect cube either (2's exponent 4 and 3's exponent 2 are not multiples of 3)",
      "Correctly finds the smallest multiplier needed to make every exponent a multiple of 6 (LCM of 2 and 3)"
    ],
    answerParts: [
      { part: "Checking perfect square", text: "N = 2^4 x 3^2 x 5^6 x 7^3. For a perfect square, every exponent must be even. Here 4, 2, and 6 are even, but 3 (on the 7) is odd -- so N is NOT a perfect square." },
      { part: "Checking perfect cube", text: "For a perfect cube, every exponent must be a multiple of 3. Here 6 and 3 are multiples of 3, but 4 (on the 2) and 2 (on the 3) are not -- so N is NOT a perfect cube either." },
      { part: "Conclusion", text: "N is neither a perfect square nor a perfect cube." },
      { part: "Making it a perfect sixth power", text: "For N to be both simultaneously, every exponent must be a multiple of 6 (the LCM of 2 and 3). Currently: 2 needs 2 more (4->6), 3 needs 4 more (2->6), 5 already has 6 (fine), 7 needs 3 more (3->6). Multiply by 2^2 x 3^4 x 7^3 = 4 x 81 x 343 = 111132." },
      { part: "Final Answer", text: "N is neither a perfect square nor a perfect cube. The smallest number to multiply by to make it a perfect sixth power (both at once) is 2^2 x 3^4 x 7^3 = 111132." }
    ]
  },
  {
    id: 10,
    question: "Two square plots of land have areas in the ratio 25:64. If the smaller plot's side is 40 metres less than the larger plot's side, find the side length of each plot.",
    markingScheme: [
      "Correctly recognizes that since areas are in ratio 25:64, the sides are in the ratio sqrt(25):sqrt(64) = 5:8",
      "Correctly sets up the sides as 5x and 8x for some common multiplier x",
      "Correctly sets up the equation 8x - 5x = 40",
      "Correctly solves 3x = 40 leading to x, and computes the actual side lengths",
      "States both final side lengths clearly with correct units"
    ],
    answerParts: [
      { part: "Step 1: Ratio of sides", text: "Since area is proportional to (side)^2, if areas are in ratio 25:64, sides are in ratio sqrt(25):sqrt(64) = 5:8." },
      { part: "Step 2: Set up variables", text: "Let the sides be 5x and 8x metres." },
      { part: "Step 3: Use the given difference", text: "The larger side exceeds the smaller by 40 m: 8x - 5x = 40, so 3x = 40, giving x = 40/3." },
      { part: "Step 4: Find actual sides", text: "Smaller side = 5 x (40/3) = 200/3 = 66.67 m (approx). Larger side = 8 x (40/3) = 320/3 = 106.67 m (approx)." },
      { part: "Final Answer", text: "The smaller plot's side is approximately 66.67 m and the larger plot's side is approximately 106.67 m." }
    ]
  },
  {
    id: 11,
    question: "Find the cube root of 274625 using the prime factorization method, showing the complete factor tree.",
    markingScheme: [
      "Correctly begins factorizing 274625 by dividing out the smallest applicable prime",
      "Correctly continues the full factorization down to primes",
      "Correctly identifies 274625 = 5^3 x 13^3",
      "Correctly groups the factors into complete triples",
      "Correctly computes the final cube root as 5 x 13 = 65"
    ],
    answerParts: [
      { part: "Factorizing", text: "274625 / 5 = 54925. 54925 / 5 = 10985. 10985 / 5 = 2197. 2197 / 13 = 169. 169 / 13 = 13. 13 / 13 = 1." },
      { part: "Prime factorization", text: "274625 = 5 x 5 x 5 x 13 x 13 x 13 = 5^3 x 13^3." },
      { part: "Grouping into triples", text: "(5 x 5 x 5) x (13 x 13 x 13) -- two complete triples." },
      { part: "Taking one from each triple", text: "cbrt(274625) = 5 x 13 = 65." },
      { part: "Final Answer", text: "cbrt(274625) = 65. Verification: 65^3 = 65 x 65 x 65 = 4225 x 65 = 274625, confirming the answer." }
    ]
  },
  {
    id: 12,
    question: "A water tank in the shape of a cube can hold 42875 litres of water when full, and 1 cubic metre equals 1000 litres. Find the length of one edge of the tank in metres.",
    markingScheme: [
      "Correctly converts 42875 litres into cubic metres using the given conversion",
      "Correctly identifies that edge = cube root of the volume in cubic metres",
      "Correctly factorizes 42.875 or works with 42875 directly scaled appropriately",
      "Correctly computes the cube root using prime factorization or another valid method",
      "States the final edge length with correct units"
    ],
    answerParts: [
      { part: "Step 1: Convert to cubic metres", text: "42875 litres / 1000 = 42.875 cubic metres." },
      { part: "Step 2: Work with a scaled whole number", text: "42.875 = 42875/1000. Since 1000 = 10^3, cbrt(42.875) = cbrt(42875)/10." },
      { part: "Step 3: Factorize 42875", text: "42875 = 5^3 x 7^3 (since 42875 / 5 = 8575, /5 = 1715, /5 = 343 = 7^3)." },
      { part: "Step 4: Compute the cube root", text: "cbrt(42875) = 5 x 7 = 35. So cbrt(42.875) = 35/10 = 3.5." },
      { part: "Final Answer", text: "The edge length of the tank is 3.5 metres." }
    ]
  },
  {
    id: 13,
    question: "Prove, using algebra, that the sum of the cubes of the first n natural numbers equals the square of their sum, i.e. 1^3+2^3+...+n^3 = (1+2+...+n)^2, by verifying it for n=4 and stating the general formula.",
    markingScheme: [
      "States the general formula 1+2+...+n = n(n+1)/2",
      "Correctly computes the sum of the first 4 natural numbers as 10",
      "Correctly computes the sum of the first 4 cubes as 1+8+27+64=100",
      "Correctly computes 10^2 = 100 and confirms the match",
      "States the general identity clearly"
    ],
    answerParts: [
      { part: "General formula", text: "The sum of the first n natural numbers is n(n+1)/2." },
      { part: "For n=4: sum of numbers", text: "1+2+3+4 = 10, matching n(n+1)/2 = 4x5/2 = 10." },
      { part: "For n=4: sum of cubes", text: "1^3+2^3+3^3+4^3 = 1+8+27+64 = 100." },
      { part: "Comparing", text: "10^2 = 100, which exactly equals the sum of the cubes." },
      { part: "Final Answer", text: "This confirms the identity 1^3+2^3+3^3+4^3 = (1+2+3+4)^2 = 100 for n=4, and in general, the sum of the first n cubes always equals the square of the sum of the first n natural numbers, i.e. [n(n+1)/2]^2." }
    ]
  },
  {
    id: 14,
    question: "Find the smallest number that must be subtracted from 5607 to make the result a perfect cube. State the resulting perfect cube and its cube root.",
    markingScheme: [
      "Correctly identifies the two nearest perfect cubes surrounding 5607 (17^3 and 18^3)",
      "Correctly computes 17^3 = 4913 and 18^3 = 5832",
      "Correctly determines that 4913 is the largest perfect cube not exceeding 5607",
      "Correctly computes the subtraction: 5607 - 4913",
      "States the final answer with the resulting cube and its cube root"
    ],
    answerParts: [
      { part: "Step 1: Find nearby cubes", text: "17^3 = 4913 and 18^3 = 5832. 5607 lies between these two." },
      { part: "Step 2: Choose the cube to subtract down to", text: "Since we need to SUBTRACT to reach a perfect cube, we go down to the smaller cube, 4913." },
      { part: "Step 3: Compute the subtraction", text: "5607 - 4913 = 694." },
      { part: "Final Answer", text: "Subtracting 694 from 5607 gives 4913, which is a perfect cube (17^3), with cube root 17." }
    ]
  },
  {
    id: 15,
    question: "Find the smallest number that must be added to 5607 to make the result a perfect cube. State the resulting perfect cube and its cube root.",
    markingScheme: [
      "Correctly identifies the two nearest perfect cubes surrounding 5607 (17^3 and 18^3)",
      "Correctly computes 17^3 = 4913 and 18^3 = 5832",
      "Correctly determines that 5832 is the smallest perfect cube not less than 5607",
      "Correctly computes the addition: 5832 - 5607",
      "States the final answer with the resulting cube and its cube root"
    ],
    answerParts: [
      { part: "Step 1: Find nearby cubes", text: "17^3 = 4913 and 18^3 = 5832. 5607 lies between these two." },
      { part: "Step 2: Choose the cube to add up to", text: "Since we need to ADD to reach a perfect cube, we go up to the larger cube, 5832." },
      { part: "Step 3: Compute the addition", text: "5832 - 5607 = 225." },
      { part: "Final Answer", text: "Adding 225 to 5607 gives 5832, which is a perfect cube (18^3), with cube root 18." }
    ]
  },
  {
    id: 16,
    question: "Find sqrt(9.4249) using the long division method for decimals, pairing digits appropriately, and verify your final answer.",
    markingScheme: [
      "Correctly pairs the integer part (just '9') and the decimal part (42|49)",
      "Correctly finds the first quotient digit for the integer part (3, since 3^2=9 exactly)",
      "Correctly continues into the decimal part, bringing down paired digits",
      "Correctly arrives at the quotient 3.07",
      "Correctly verifies 3.07 x 3.07 = 9.4249"
    ],
    answerParts: [
      { part: "Pairing", text: "Integer part '9' stands alone; decimal part .4249 pairs as .42|49." },
      { part: "Integer part", text: "Largest d with d^2<=9 is 3 (exactly 9). Remainder 0. Quotient so far: 3." },
      { part: "First decimal pair", text: "Bring down 42 (remainder was 0): number to work with is 42. Double the quotient (3x2=6). Find the largest digit x with (60+x)x<=42: testing x=1 gives 61x1=61, already too big, so x=0. Quotient so far: 3.0. Remainder stays 42." },
      { part: "Second decimal pair", text: "Bring down 49: number is 4249. Double quotient-so-far digits (30x2=60... using full quotient 30, doubled=60). Find x with (600+x)x<=4249: x=7 gives 607x7=4249, an exact match. Quotient: 3.07. Remainder: 0." },
      { part: "Final Answer", text: "sqrt(9.4249) = 3.07. Verification: 3.07 x 3.07 = 9.4249, confirming the answer." }
    ]
  },
  {
    id: 17,
    question: "A rectangular field is 3 times as long as it is wide. A square field has the same width as the rectangular field, and the square field's area is 400 square metres. Find the dimensions of the rectangular field and state how much larger its area is than the square field's area.",
    markingScheme: [
      "Correctly finds the width of the square field using square root: sqrt(400)=20",
      "Correctly recognizes the rectangular field has the same width, 20 m",
      "Correctly sets up the rectangular field's length as 3 times its width: 60 m",
      "Correctly computes the rectangular field's area: 60 x 20 = 1200",
      "Correctly finds the area difference between the two fields"
    ],
    answerParts: [
      { part: "Step 1: Square field's width", text: "Square field's area = 400 sq m, so its side (width) = sqrt(400) = 20 m." },
      { part: "Step 2: Rectangular field's width", text: "The rectangular field has the same width: 20 m." },
      { part: "Step 3: Rectangular field's length", text: "The rectangle is 3 times as long as it is wide: length = 3 x 20 = 60 m." },
      { part: "Step 4: Rectangular field's area", text: "Area = length x width = 60 x 20 = 1200 sq m." },
      { part: "Final Answer", text: "The rectangular field measures 60 m by 20 m, with an area of 1200 sq m -- that is 1200 - 400 = 800 sq m larger than the square field's area." }
    ]
  },
  {
    id: 18,
    question: "Determine how many perfect squares and how many perfect cubes lie between 1 and 1000, and state how many numbers in this range are BOTH a perfect square and a perfect cube.",
    markingScheme: [
      "Correctly counts the perfect squares from 1^2 up to the largest below 1000 (31^2=961)",
      "Correctly counts the perfect cubes from 1^3 up to the largest below 1000 (9^3=729)",
      "Correctly identifies that a number which is both must be a perfect sixth power",
      "Correctly finds the perfect sixth powers in range: 1^6=1 and 2^6=64 (3^6=729 also qualifies)",
      "States all three final counts clearly"
    ],
    answerParts: [
      { part: "Counting perfect squares", text: "1^2 through 31^2 (961) are all under 1000 (32^2=1024 exceeds it). That is 31 perfect squares." },
      { part: "Counting perfect cubes", text: "1^3 through 9^3 (729) are all under 1000 (10^3=1000 is included if inclusive, or excluded if strictly under). Taking 1 to 999, that is 9 perfect cubes (1 through 729); if 1000 itself is included, that is 10." },
      { part: "Numbers that are both", text: "A number that is both a perfect square and a perfect cube must be a perfect sixth power. 1^6=1, 2^6=64, 3^6=729 -- all under 1000. 4^6=4096, too big." },
      { part: "Final Answer", text: "There are 31 perfect squares and 9 perfect cubes (10 if 1000 is included) between 1 and 1000, and exactly 3 numbers (1, 64, and 729) are both." }
    ]
  },
  {
    id: 19,
    question: "Two numbers are in the ratio 4:9. If the difference of their squares is 260, find the two numbers.",
    markingScheme: [
      "Correctly sets up the numbers as 4x and 9x",
      "Correctly sets up the equation for the difference of squares: (9x)^2 - (4x)^2 = 260",
      "Correctly simplifies to 81x^2 - 16x^2 = 65x^2 = 260",
      "Correctly solves x^2 = 4, giving x = 2",
      "Correctly computes the final two numbers"
    ],
    answerParts: [
      { part: "Step 1: Set up variables", text: "Let the numbers be 4x and 9x." },
      { part: "Step 2: Set up the difference of squares", text: "(9x)^2 - (4x)^2 = 81x^2 - 16x^2 = 65x^2." },
      { part: "Step 3: Solve for x", text: "65x^2 = 260, so x^2 = 4, giving x = 2 (taking the positive root)." },
      { part: "Step 4: Compute the numbers", text: "The two numbers are 4(2)=8 and 9(2)=18." },
      { part: "Final Answer", text: "The two numbers are 8 and 18. Check: 18^2 - 8^2 = 324 - 64 = 260, matching the given difference." }
    ]
  },
  {
    id: 20,
    question: "Find the least perfect cube which is exactly divisible by 4, 6, and 10.",
    markingScheme: [
      "Correctly finds the LCM of 4, 6, and 10",
      "Correctly factorizes the LCM into primes",
      "Correctly identifies which prime exponents are not multiples of 3",
      "Correctly determines the smallest multiplier to fix each exponent to the next multiple of 3",
      "Correctly computes the final answer"
    ],
    answerParts: [
      { part: "Step 1: Find the LCM", text: "4 = 2^2, 6 = 2 x 3, 10 = 2 x 5. LCM = 2^2 x 3 x 5 = 60." },
      { part: "Step 2: Factorize the LCM", text: "60 = 2^2 x 3^1 x 5^1." },
      { part: "Step 3: Check exponents against multiples of 3", text: "2's exponent is 2 (needs 1 more to reach 3). 3's exponent is 1 (needs 2 more to reach 3). 5's exponent is 1 (needs 2 more to reach 3)." },
      { part: "Step 4: Find the multiplier", text: "Multiply by 2^1 x 3^2 x 5^2 = 2 x 9 x 25 = 450. 60 x 450 = 27000 = 2^3 x 3^3 x 5^3." },
      { part: "Final Answer", text: "The least perfect cube divisible by 4, 6, and 10 is 27000 (which is 30^3)." }
    ]
  },
];

// ── COMPETENCY / CASE-BASED (4 marks each) ──
export const MATHS8SC_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Housing Society's Square Park",
    caseDescription: "A housing society wants to build a square-shaped park. The society has exactly 5776 square metres of land available and wants to use the entire plot for the park, with no land left over.",
    subQuestions: [
      { question: "What must be true about 5776 for a square park to exactly use up the land?", answer: "5776 must be a perfect square, since the area of a square is (side)^2, and side must be a whole number of metres for practical construction." },
      { question: "Find the side length of the park.", answer: "sqrt(5776) = 76 metres, since 5776 = 2^4 x 19^2, giving sqrt = 2^2 x 19 = 76.", options: ["72 m", "74 m", "76 m", "78 m"], correctIndex: 2 },
      { question: "The society wants to build a walking path 2 metres wide along the inside of the park's boundary. Find the area still available for the park's actual garden (inside the path).", answer: "Inner side = 76 - 2(2) = 72 m. Inner area = 72 x 72 = 5184 sq m." },
      { question: "What is the area used up by the walking path alone?", answer: "Path area = total area - inner area = 5776 - 5184 = 592 sq m." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Cube-Shaped Storage Crates",
    caseDescription: "A warehouse uses cube-shaped storage crates. One particular crate has a volume of 5832 cubic cm.",
    subQuestions: [
      { question: "Find the edge length of the crate.", answer: "5832 = 2^3 x 3^6 = 18^3 (since 18 = 2 x 3^2), so the edge is 18 cm.", options: ["16 cm", "17 cm", "18 cm", "19 cm"], correctIndex: 2 },
      { question: "The warehouse wants a bigger crate with exactly 8 times the volume. Find the new crate's volume and edge length.", answer: "New volume = 5832 x 8 = 46656 cubic cm. Since volume scales as (edge)^3, and 8=2^3, the new edge = 18 x 2 = 36 cm." },
      { question: "If crates are stacked in a single layer covering a floor area of 1296 sq cm per crate's base, how many crates (each 18 cm x 18 cm base) fit along one side of a shelf that is 90 cm wide?", answer: "90 / 18 = 5 crates fit exactly along one side." },
      { question: "Explain why doubling a cube's edge length results in 8 times the volume, not 2 times.", answer: "Volume of a cube is edge^3. Doubling the edge means (2 x edge)^3 = 8 x edge^3, since the multiplier 2 gets cubed too -- so volume scales by the CUBE of the scale factor, not the scale factor itself." }
    ]
  },
  {
    id: 3,
    caseTitle: "Sports Day Formation",
    caseDescription: "A school is arranging 2025 students into a perfect square formation for a sports day display, with each row having the same number of students as there are rows.",
    subQuestions: [
      { question: "Is 2025 a perfect square? Justify using prime factorization.", answer: "2025 = 3^4 x 5^2 = (3x3)x(3x3)x(5x5), all exponents even, so yes, 2025 is a perfect square." },
      { question: "How many students will stand in each row?", answer: "sqrt(2025) = 3^2 x 5 = 45 students per row.", options: ["40", "43", "45", "48"], correctIndex: 2 },
      { question: "If 4 more students join and the school wants to keep it a perfect square formation with everyone included, how many more students beyond those 4 (if any) are needed?", answer: "2025 + 4 = 2029. The next perfect square after 2025 (45^2) is 46^2 = 2116. So 2116 - 2029 = 87 more students are needed beyond the initial 4 to reach the next full square formation." },
      { question: "Alternatively, if the school wants a smaller square formation without those 4 extra students and without adding anyone, is 2025 already usable directly, or must students be removed?", answer: "2025 is already a perfect square (45x45), so it can be used directly for a formation with no one removed, as long as the 4 extra students don't join this particular formation." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Pythagorean Triple Generator Machine",
    caseDescription: "A mathematics club builds a simple 'machine' (a formula) that takes any whole number m greater than 1 and outputs the three numbers (2m, m^2-1, m^2+1), which always form a Pythagorean triple.",
    subQuestions: [
      { question: "Run the machine with m = 6. What three numbers come out?", answer: "2m=12, m^2-1=35, m^2+1=37. Output: (12, 35, 37)." },
      { question: "Verify the output from m=6 is a genuine Pythagorean triple.", answer: "12^2+35^2 = 144+1225 = 1369. 37^2 = 1369. They match, confirming a valid triple." },
      { question: "A student runs the machine and gets the output (2m, 24, 26) but has forgotten the value of m used. Find m.", answer: "Since m^2+1=26, m^2=25, so m=5 (taking the positive root). Check: 2m=10, m^2-1=24 -- matches the given 24.", options: ["4", "5", "6", "7"], correctIndex: 1 },
      { question: "Explain, in your own words, why this machine's formula always produces a valid Pythagorean triple for any m > 1 (no need for full algebraic proof, just the key algebraic idea).", answer: "The key idea is that (2m)^2 + (m^2-1)^2 always simplifies algebraically to exactly (m^2+1)^2 -- expanding both sides shows the middle terms cancel out perfectly, so the relationship holds for every value of m, not just specific numbers checked by trial." }
    ]
  },
  {
    id: 5,
    caseTitle: "The Bakery's Cube-Shaped Cake Boxes",
    caseDescription: "A bakery packs cube-shaped cakes into cube-shaped boxes. One box has a volume of 4096 cubic cm.",
    subQuestions: [
      { question: "Find the edge length of the box using prime factorization.", answer: "4096 = 2^12, so cbrt(4096) = 2^4 = 16 cm.", options: ["14 cm", "15 cm", "16 cm", "17 cm"], correctIndex: 2 },
      { question: "The bakery also sells a 'mini' version with exactly 1/8 the volume. Find the mini box's edge length.", answer: "Mini volume = 4096/8 = 512 cubic cm. Since volume scales as edge^3 and 1/8 = (1/2)^3, mini edge = 16/2 = 8 cm." },
      { question: "If the bakery wants a 'jumbo' box with 27 times the original volume, find the jumbo box's edge length.", answer: "27 = 3^3, so jumbo edge = 16 x 3 = 48 cm (since volume scaling by 3^3 means edge scales by 3)." },
      { question: "Explain why a box with exactly double the ORIGINAL box's edge length does NOT have double the volume.", answer: "Volume = edge^3, so doubling the edge multiplies volume by 2^3 = 8, not by 2 -- the cubic relationship means small changes in edge length cause much bigger changes in volume." }
    ]
  },
  {
    id: 6,
    caseTitle: "Estimating Without a Calculator",
    caseDescription: "During an exam, calculators are not allowed. A student needs to estimate several square roots quickly using only the nearest perfect squares.",
    subQuestions: [
      { question: "Estimate sqrt(130) to the nearest whole number.", answer: "11^2=121 and 12^2=144. 130 is closer to 121 (difference 9) than to 144 (difference 14), so sqrt(130) is approximately 11 (more precisely about 11.4)." },
      { question: "Estimate sqrt(300) to the nearest whole number.", answer: "17^2=289 and 18^2=324. 300 is closer to 289 (difference 11) than to 324 (difference 24), so sqrt(300) is approximately 17 (more precisely about 17.3)." },
      { question: "A rectangle has area 130 sq cm shaped so it is very close to a square. Estimate its approximate side length using your answer above.", answer: "Since the shape is close to a square, side is approximately sqrt(130), which was estimated as about 11.4 cm." },
      { question: "Why is 'closeness' to the nearer perfect square a better estimate than simply picking the midpoint between two perfect squares?", answer: "Square roots don't grow at a constant rate -- as numbers get bigger, consecutive perfect squares get further apart, so a number's exact position between two squares (not just picking the midpoint of the number range) gives a more accurate estimate of where its square root actually falls." }
    ]
  },
  {
    id: 7,
    caseTitle: "The School's Number Pattern Competition",
    caseDescription: "For a competition, students are asked to explore the pattern where n^3 is written as a sum of n consecutive odd numbers.",
    subQuestions: [
      { question: "Write 5^3 as a sum of 5 consecutive odd numbers.", answer: "First term = 5^2-5+1 = 21. The sum is 21+23+25+27+29 = 125 = 5^3." },
      { question: "A student claims 8^3 can be written using odd numbers starting from 57. Verify if this is correct.", answer: "The correct first term for n=8 is 8^2-8+1 = 57. The student is correct: the 8 consecutive odd numbers are 57,59,61,63,65,67,69,71, summing to 512 = 8^3." },
      { question: "Verify the sum from the previous question equals exactly 512.", answer: "57+59+61+63+65+67+69+71 = 512, matching 8^3 = 8x8x8 = 512." },
      { question: "Without computing the full sum, explain how you know in advance that exactly 8 odd numbers should be added for 8^3 (not 7 or 9).", answer: "The rule states n^3 is the sum of exactly n consecutive odd numbers -- since we are computing 8^3, the number n itself is 8, so exactly 8 terms must be used, no more and no fewer." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Swimming Pool Renovation",
    caseDescription: "A community centre has a square swimming pool with an area of 1156 square metres. They plan to build a square pool cover that fits exactly over it.",
    subQuestions: [
      { question: "Find the side length of the pool.", answer: "sqrt(1156) = 34 metres, since 1156 = 2^2 x 17^2.", options: ["32 m", "33 m", "34 m", "35 m"], correctIndex: 2 },
      { question: "The pool cover costs Rs 250 per square metre. Find the total cost of the cover.", answer: "Cover area = 1156 sq m (same as the pool). Cost = 1156 x 250 = Rs 289000." },
      { question: "The centre later decides to extend the pool so its area becomes exactly 4 times the original. Find the new side length.", answer: "New area = 1156 x 4 = 4624. Since area scales by 4 = 2^2, side scales by 2: new side = 34 x 2 = 68 metres." },
      { question: "Explain, using the idea of scaling, why quadrupling the AREA of a square only doubles its SIDE length, rather than also quadrupling it.", answer: "Area = side^2, a squared relationship -- to quadruple the area (multiply by 4 = 2^2), the side only needs to be multiplied by 2, since squaring that factor of 2 gives the required factor of 4 in area." }
    ]
  },
  {
    id: 9,
    caseTitle: "Verifying a Building Corner is Truly Square",
    caseDescription: "A construction worker wants to check that a room's corner forms a genuine right angle using only a tape measure, applying the idea of Pythagorean triples.",
    subQuestions: [
      { question: "The worker measures 9 m and 12 m along the two walls from the corner, then measures the diagonal distance between those two marked points. What diagonal length would confirm a genuine right angle?", answer: "Using the classic triple pattern (a multiple of 3-4-5, here scaled by 3: 9,12,15), the diagonal should measure exactly 15 m for a genuine right angle." },
      { question: "Verify that (9, 12, 15) is a valid Pythagorean triple.", answer: "9^2+12^2 = 81+144 = 225. 15^2 = 225. They match, confirming a valid right-angle triple." },
      { question: "If the worker instead measures the diagonal as 15.3 m instead of exactly 15 m, what does this suggest about the corner?", answer: "It suggests the corner is not a perfect 90-degree angle -- a genuine right angle would give exactly 15 m by the Pythagorean relationship, so any noticeable difference indicates the corner is slightly off-square." },
      { question: "Suggest a different, larger Pythagorean triple (not just a multiple of 3-4-5) the worker could use if the walls happen to be longer, using the (2m, m^2-1, m^2+1) pattern with m=10.", answer: "For m=10: 2m=20, m^2-1=99, m^2+1=101, giving the triple (20, 99, 101)." }
    ]
  },
  {
    id: 10,
    caseTitle: "The Perfect Square Number Detective",
    caseDescription: "A student is given four numbers -- 1458, 1444, 1521, and 1560 -- and must determine which ones are perfect squares using prime factorization, without a calculator.",
    subQuestions: [
      { question: "Is 1444 a perfect square? Show the factorization.", answer: "1444 = 2^2 x 19^2, all exponents even -- yes, it is a perfect square, and sqrt(1444) = 2 x 19 = 38." },
      { question: "Is 1521 a perfect square? Show the factorization.", answer: "1521 = 3^2 x 169 = 3^2 x 13^2, all exponents even -- yes, it is a perfect square, and sqrt(1521) = 3 x 13 = 39." },
      { question: "Is 1458 a perfect square? Show the factorization and explain your conclusion.", answer: "1458 = 2 x 729 = 2 x 3^6. The exponent of 2 is 1 (odd) -- so 1458 is NOT a perfect square, since not every prime factor is paired.", options: ["Yes", "No", "Cannot be determined", "Only if rounded"], correctIndex: 1 },
      { question: "Is 1560 a perfect square? Justify using its trailing zero count alone, without full factorization.", answer: "1560 ends in only a single zero. A perfect square must always have an EVEN number of trailing zeroes, so a single trailing zero already proves 1560 cannot be a perfect square." }
    ]
  },
  {
    id: 11,
    caseTitle: "Packing Identical Cubes into a Bigger Cube",
    caseDescription: "A puzzle box contains many small identical unit cubes. A student wants to arrange exactly 3375 of them into one single, larger solid cube shape with no cubes left over.",
    subQuestions: [
      { question: "Is 3375 a perfect cube? Show using prime factorization.", answer: "3375 = 3^3 x 5^3, both exponents multiples of 3 -- yes, it is a perfect cube." },
      { question: "How many small cubes make up one edge of the larger cube?", answer: "cbrt(3375) = 3 x 5 = 15 small cubes along each edge.", options: ["13", "14", "15", "16"], correctIndex: 2 },
      { question: "If the student has 50 more cubes (3425 total) and wants to form the next possible bigger perfect cube, will 3425 work directly, or how many more/fewer are needed?", answer: "The next perfect cube after 15^3=3375 is 16^3=4096. 3425 is not a perfect cube, so the student needs 4096-3425=671 more cubes to reach the next full cube shape (16 along each edge)." },
      { question: "Alternatively, could the student remove cubes from 3425 to reach the PREVIOUS perfect cube instead? How many would need to be removed?", answer: "The previous perfect cube is 15^3=3375. Removing 3425-3375=50 cubes (exactly the 50 extra ones) would bring it back to a valid cube shape." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Solar Panel Grid",
    caseDescription: "An engineering team is installing solar panels in a perfectly square grid arrangement on a rooftop, using 1089 identical panels.",
    subQuestions: [
      { question: "Confirm 1089 is a perfect square and find the grid's dimensions (rows x columns).", answer: "1089 = 3^2 x 11^2, so sqrt(1089) = 3 x 11 = 33. The grid is 33 x 33 panels." },
      { question: "Each panel produces 250 watts. Find the total power output of the entire grid.", answer: "Total panels = 1089. Total power = 1089 x 250 = 272250 watts." },
      { question: "The team wants to expand the grid to a 40 x 40 arrangement. How many additional panels are needed?", answer: "New total = 40^2 = 1600. Additional panels needed = 1600 - 1089 = 511." },
      { question: "Explain why a 'square grid' arrangement (equal rows and columns) requires the total panel count to be a perfect square, using the definition of area.", answer: "A grid of r rows and c columns has r x c total panels; for the grid to be square-shaped, rows must equal columns (r=c), so the total becomes r x r = r^2 -- a perfect square by definition." }
    ]
  },
  {
    id: 13,
    caseTitle: "Comparing Two Methods for the Same Square Root",
    caseDescription: "Two students, Aisha and Rohan, are asked to find sqrt(2116). Aisha uses prime factorization, while Rohan uses the long division method.",
    subQuestions: [
      { question: "Complete Aisha's method: factorize 2116 into primes.", answer: "2116 = 2^2 x 23^2." },
      { question: "Using Aisha's factorization, what is sqrt(2116)?", answer: "sqrt(2116) = 2 x 23 = 46.", options: ["44", "45", "46", "47"], correctIndex: 2 },
      { question: "Rohan pairs the digits of 2116 for long division. Show how he should pair them.", answer: "Rohan should pair the digits from the right: 21 | 16." },
      { question: "Both students should arrive at the same final answer. If Rohan's long division gives a different result, what would that indicate?", answer: "It would indicate an arithmetic error in Rohan's long-division steps, since both correctly-applied methods must always agree on the same true square root of the same number -- a mismatch means a mistake was made somewhere in the working, not that the methods disagree in principle." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Cube Root Speed Trick",
    caseDescription: "A teacher shows students a trick: for any perfect cube up to 6 digits, you can find its cube root instantly using the last-digit pairing rule combined with grouping the number in sets of three digits from the right.",
    subQuestions: [
      { question: "Using the trick, find the last digit of the cube root of 175616.", answer: "175616 ends in 6, and the pairing rule matches 6 with 6 (since 6^3=216 ends in 6), so the cube root ends in 6." },
      { question: "Group 175616 into sets of three from the right, and use the LEFT group to estimate the first digit of the cube root.", answer: "Grouping: 175 | 616. The left group is 175. Since 5^3=125 and 6^3=216, and 175 lies between them, the first digit of the cube root is 5 (the cube root of the left group's 'bracket', taking the smaller one)." },
      { question: "Combine both digits found above to state the full cube root of 175616.", answer: "Combining the first digit (5) and last digit (6) gives 56 as the cube root.", options: ["54", "55", "56", "57"], correctIndex: 2 },
      { question: "Verify that 56^3 = 175616.", answer: "56^3 = 56 x 56 x 56 = 3136 x 56 = 175616, confirming the trick's answer is correct." }
    ]
  },
  {
    id: 15,
    caseTitle: "The Fabric Cutting Problem",
    caseDescription: "A tailor has a square piece of fabric with an area of 2916 square cm and needs to cut it into smaller equal squares for a patchwork quilt.",
    subQuestions: [
      { question: "Find the side length of the original square fabric.", answer: "sqrt(2916) = 54 cm, since 2916 = 2^2 x 3^6 = (2x3^3)^2 = 54^2.", options: ["52 cm", "53 cm", "54 cm", "55 cm"], correctIndex: 2 },
      { question: "The tailor wants to cut it into smaller squares of side 6 cm each, with no fabric wasted. How many small squares can be made?", answer: "Total area / small square area = 2916 / 36 = 81 small squares." },
      { question: "Verify that 81 small squares of side 6 cm can be arranged edge-to-edge to exactly fill the original square (state the arrangement as rows x columns).", answer: "Since the original side is 54 cm and each small square is 6 cm, 54/6 = 9 small squares fit along each side, giving a 9x9 = 81 arrangement, matching the total found above." },
      { question: "If the tailor instead wanted squares of side 8 cm, would the fabric divide evenly with no waste? Explain.", answer: "54/8 = 6.75, which is not a whole number, so 8 cm squares would NOT divide the fabric evenly -- some fabric would be wasted or the squares would need to be a different size that evenly divides 54." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Rocket Launch Countdown Pattern",
    caseDescription: "A science club notices that the number of odd numbers needed to build up to a given square number follows a clean pattern, and wants to use it to solve a puzzle involving 20^2.",
    subQuestions: [
      { question: "How many consecutive odd numbers (starting from 1) are needed to sum to exactly 400?", answer: "Since 400 = 20^2, exactly 20 consecutive odd numbers (starting from 1) are needed." },
      { question: "What is the last (largest) odd number in this sequence of 20 odd numbers?", answer: "The nth odd number (starting count from 1) is (2n-1). For n=20, the last odd number is 2(20)-1 = 39." },
      { question: "Verify that the sum of odd numbers from 1 to 39 equals 400.", answer: "The sum of the first 20 odd numbers is 20^2 = 400, and the sequence 1,3,5,...,39 has exactly 20 terms, confirming the total is 400." },
      { question: "If the club instead wanted a sum of exactly 361, how many consecutive odd numbers (from 1) would they need, and what would be the last one?", answer: "361 = 19^2, so 19 consecutive odd numbers are needed, with the last one being 2(19)-1 = 37." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Two Water Tanks",
    caseDescription: "A farm has two cube-shaped water tanks. The larger tank has a volume exactly 64 times that of the smaller tank.",
    subQuestions: [
      { question: "If the smaller tank has an edge of 5 metres, find its volume.", answer: "Volume = 5^3 = 125 cubic metres." },
      { question: "Find the volume of the larger tank.", answer: "Larger volume = 125 x 64 = 8000 cubic metres." },
      { question: "Find the edge length of the larger tank using the cube root of its volume.", answer: "cbrt(8000) = 20 metres (since 8000 = 2^6 x 5^3, cbrt = 2^2 x 5 = 20).", options: ["18 m", "19 m", "20 m", "21 m"], correctIndex: 2 },
      { question: "Confirm that the ratio of the edge lengths (larger:smaller) matches the cube root of the volume ratio (64), and explain the relationship.", answer: "Edge ratio = 20:5 = 4:1. Cube root of the volume ratio: cbrt(64) = 4. They match -- this is because volume scales as the CUBE of the edge-length scale factor, so to find how much the edge scaled, you take the cube root of how much the volume scaled." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Chessboard Square Number Puzzle",
    caseDescription: "A maths club poses a puzzle: a square chessboard-style grid has a total of 1600 small unit squares.",
    subQuestions: [
      { question: "Find the number of squares along one side of the grid.", answer: "sqrt(1600) = 40, since 1600 = 2^6 x 5^2 = (2^3 x 5)^2 = 40^2.", options: ["38", "39", "40", "41"], correctIndex: 2 },
      { question: "If the grid is extended so that it has 100 more small squares in total along both dimensions equally (still remaining a perfect square grid), what is the smallest new total that fits this description?", answer: "The next perfect square after 40^2=1600 is 41^2=1681, which is 81 more, not 100. The one after that, 42^2=1764, is 164 more. Neither is exactly 100 more, so the smallest perfect square total that is MORE than 100 extra is 1764 (an increase of 164), since no perfect square is exactly 1700." },
      { question: "How many small squares would a grid with 45 squares along each side contain in total?", answer: "45^2 = 2025 small squares." },
      { question: "Explain why simply adding a fixed number of squares (like 100) to a square grid's total does not usually result in another perfect square total.", answer: "Perfect squares are not evenly spaced -- the gap between consecutive perfect squares n^2 and (n+1)^2 is 2n+1, which keeps growing as n grows, so no single fixed number added will consistently jump from one perfect square to the next as n increases." }
    ]
  },
  {
    id: 19,
    caseTitle: "Building a Ramp Using a Pythagorean Triple",
    caseDescription: "A carpenter is building a wheelchair ramp and needs the ramp's length, the height it rises, and the horizontal base to form a right triangle for structural accuracy, using whole-number measurements.",
    subQuestions: [
      { question: "The carpenter wants the ramp to rise 5 metres in height. Suggest a whole-number Pythagorean triple with 5 as one leg, and state the matching base and ramp length.", answer: "The triple (5, 12, 13) has 5 as one leg: base = 12 m, ramp length = 13 m." },
      { question: "Verify that (5, 12, 13) is a genuine Pythagorean triple.", answer: "5^2+12^2 = 25+144 = 169. 13^2 = 169. They match." },
      { question: "If the height instead needs to be 8 metres, suggest a suitable whole-number triple, and state the base and ramp length.", answer: "Using (8,15,17): base = 15 m, ramp length = 17 m." },
      { question: "Verify (8, 15, 17) using the Pythagoras relation.", answer: "8^2+15^2 = 64+225 = 289. 17^2 = 289. They match, confirming this is a valid triple for the ramp's dimensions." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Library's Cube-Shaped Storage Modules",
    caseDescription: "A library is buying cube-shaped modular storage units. Three module sizes are available with volumes 1331, 2197, and 3375 cubic cm.",
    subQuestions: [
      { question: "Find the edge length of the 1331 cubic cm module.", answer: "1331 = 11^3, so the edge is 11 cm." },
      { question: "Find the edge length of the 2197 cubic cm module.", answer: "2197 = 13^3, so the edge is 13 cm." },
      { question: "Find the edge length of the 3375 cubic cm module.", answer: "3375 = 15^3, so the edge is 15 cm.", options: ["14 cm", "15 cm", "16 cm", "17 cm"], correctIndex: 1 },
      { question: "The library wants to stack modules of the SAME size to build a single large cube shape with no gaps, using exactly 8 of the 11 cm modules. Is this possible, and if so, describe the arrangement.", answer: "Yes -- 8 identical small cubes can always be arranged as a 2x2x2 larger cube (since 2^3=8 exactly), regardless of the individual module's own size, so 8 of the 11 cm modules form one large cube of edge 22 cm." }
    ]
  },
];

// ── SELF-ASSESSMENT (independent mixed set, matching the MCQ format) ──
export const MATHS8SC_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "Which of the following is a perfect square?", options: ["112", "121", "130", "142"], correctAnswer: 1, explanation: "121 = 11 x 11." },
  { id: 2, question: "A perfect square can never end in:", options: ["1", "4", "8", "9"], correctAnswer: 2, explanation: "8 is never a valid last digit of a perfect square." },
  { id: 3, question: "The sum of the first 10 odd numbers equals:", options: ["81", "90", "100", "110"], correctAnswer: 2, explanation: "Sum of first n odd numbers = n^2. For n=10, that is 100." },
  { id: 4, question: "How many numbers lie between 9^2 and 10^2?", options: ["16", "18", "20", "22"], correctAnswer: 1, explanation: "2n for n=9 gives 18." },
  { id: 5, question: "Using m=4 in (2m, m^2-1, m^2+1), the triple is:", options: ["(6,8,10)", "(8,15,17)", "(10,24,26)", "(12,35,37)"], correctAnswer: 1, explanation: "2(4)=8, 4^2-1=15, 4^2+1=17." },
  { id: 6, question: "sqrt(361) equals:", options: ["17", "18", "19", "20"], correctAnswer: 2, explanation: "19 x 19 = 361." },
  { id: 7, question: "sqrt(529) equals:", options: ["21", "22", "23", "24"], correctAnswer: 2, explanation: "23 x 23 = 529." },
  { id: 8, question: "Using prime factorization, sqrt(784) equals:", options: ["26", "27", "28", "29"], correctAnswer: 2, explanation: "784 = 2^4 x 7^2, so sqrt = 2^2 x 7 = 28." },
  { id: 9, question: "The smallest number that must be multiplied to 45 to make it a perfect square is:", options: ["3", "5", "9", "15"], correctAnswer: 1, explanation: "45 = 3^2 x 5. The 5 is unpaired, so multiply by 5 to get 225 = 15^2." },
  { id: 10, question: "The smallest number that must be divided from 32 to make it a perfect square is:", options: ["2", "4", "8", "16"], correctAnswer: 0, explanation: "32 = 2^5. Dividing by 2 gives 2^4 = 16, a perfect square." },
  { id: 11, question: "sqrt(6.25) equals:", options: ["2.5", "2.05", "0.25", "25"], correctAnswer: 0, explanation: "2.5 x 2.5 = 6.25." },
  { id: 12, question: "sqrt(120) lies between:", options: ["9 and 10", "10 and 11", "11 and 12", "12 and 13"], correctAnswer: 1, explanation: "10^2=100 and 11^2=121, and 120 falls between them." },
  { id: 13, question: "Which of the following is a perfect cube?", options: ["144", "169", "196", "216"], correctAnswer: 3, explanation: "216 = 6 x 6 x 6." },
  { id: 14, question: "The cube of 9 is:", options: ["81", "279", "729", "819"], correctAnswer: 2, explanation: "9 x 9 x 9 = 729." },
  { id: 15, question: "4^3 is the sum of how many consecutive odd numbers?", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "n^3 is the sum of exactly n consecutive odd numbers -- here n=4." },
  { id: 16, question: "Using prime factorization, cbrt(4096) equals:", options: ["14", "15", "16", "17"], correctAnswer: 2, explanation: "4096 = 2^12, so cbrt = 2^4 = 16." },
  { id: 17, question: "Using prime factorization, cbrt(6859) equals:", options: ["17", "18", "19", "20"], correctAnswer: 2, explanation: "6859 = 19^3." },
  { id: 18, question: "The smallest number to multiply 108 by to make it a perfect cube is:", options: ["2", "3", "4", "6"], correctAnswer: 0, explanation: "108 = 2^2 x 3^3. The exponent of 2 is 2, needing 1 more, so multiply by 2 to get 216 = 6^3." },
  { id: 19, question: "A cube has volume 2197 cubic cm. Its edge length is:", options: ["11 cm", "12 cm", "13 cm", "14 cm"], correctAnswer: 2, explanation: "2197 = 13^3." },
  { id: 20, question: "If a perfect cube ends in 9, its cube root ends in:", options: ["1", "3", "9", "7"], correctAnswer: 2, explanation: "The pairing matches 9 with 9 (since 9^3=729, ending in 9)." },
  { id: 21, question: "Which method extends naturally to finding the square root of a decimal number?", options: ["Repeated subtraction", "Prime factorization", "Long division", "None of these"], correctAnswer: 2, explanation: "The long division method handles decimals by pairing digits outward from the decimal point." },
  { id: 22, question: "In the long division method, sqrt(4489) equals:", options: ["65", "66", "67", "68"], correctAnswer: 2, explanation: "67 x 67 = 4489." },
  { id: 23, question: "A square garden has area 1444 sq m. Its perimeter is:", options: ["148 m", "152 m", "156 m", "160 m"], correctAnswer: 1, explanation: "sqrt(1444)=38, so perimeter = 4x38 = 152 m." },
  { id: 24, question: "Verify: which of these is a genuine Pythagorean triple?", options: ["(5,11,13)", "(7,24,25)", "(9,14,17)", "(6,10,12)"], correctAnswer: 1, explanation: "7^2+24^2 = 49+576 = 625 = 25^2. The others fail this check." },
  { id: 25, question: "The number of zeroes at the end of a perfect square must always be:", options: ["Odd", "Even", "A multiple of 3", "Exactly 2"], correctAnswer: 1, explanation: "Squaring doubles the trailing-zero count of the original number, so it is always even." },
  { id: 26, question: "The number of zeroes at the end of a perfect cube must always be:", options: ["Even", "A multiple of 3", "Odd", "Exactly 3"], correctAnswer: 1, explanation: "Cubing triples the trailing-zero count of the original number, so it is always a multiple of 3." },
  { id: 27, question: "A number that is both a perfect square and a perfect cube must be a perfect:", options: ["Fourth power", "Fifth power", "Sixth power", "Ninth power"], correctAnswer: 2, explanation: "It needs exponents that are multiples of both 2 and 3, i.e. multiples of 6 (a sixth power)." },
  { id: 28, question: "108 must be divided by which number to become a perfect square?", options: ["2", "3", "4", "9"], correctAnswer: 1, explanation: "108 = 2^2 x 3^3. Dividing by 3 gives 36 = 6^2." },
  { id: 29, question: "Which of these numbers is NOT a perfect cube?", options: ["343", "400", "512", "729"], correctAnswer: 1, explanation: "7^3=343, 8^3=512, 9^3=729 are perfect cubes, but 400 is not." },
  { id: 30, question: "Estimating without a calculator, sqrt(200) is closest to:", options: ["13", "14", "15", "16"], correctAnswer: 1, explanation: "14^2=196 and 15^2=225. 200 is much closer to 196, so sqrt(200) is approximately 14.1." },
];
