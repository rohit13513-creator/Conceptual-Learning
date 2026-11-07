import type { NTopic } from "./circles9Notes";
import * as F from "./al9Figs";

// Class IX Maths (Ganita Manjari, Part II): The World of Algorithms.
// Order of the notes: first the theory (definitions, algorithms and their reasons), then the solved examples, then the revision.
// **bold** inside a string makes bold text. A slash is avoided in the text because some screens show it as a fraction.

// The revision mind map: five simple cards in the order a student meets them, then a table that compares the algorithms.
export const AL9_MAP = {
  steps: [
    { title: "Algorithm", color: "#2563eb", lines: ["A step-by-step procedure to get an answer", "Built from basic steps we can do directly", "Must be justified (correct) and analysed (how fast)"] },
    { title: "Adding numbers", color: "#0f766e", lines: ["Write the numbers with the digits aligned from the right", "Add column by column, right to left, with a carry", "A carry is never more than 1; a last carry is written on the left"] },
    { title: "GCD, the first way", color: "#b45309", lines: ["List the divisors of both numbers", "List the common divisors", "The rightmost one is the gcd"] },
    { title: "Make it faster", color: "#7c3aed", lines: ["Scan both numbers together", "Check only up to min(m, n)", "Keep only the most recent common divisor"] },
    { title: "Euclid and Āryabhaṭa", color: "#be123c", lines: ["Euclid: gcd(m, n) = gcd(n, m − n)", "Āryabhaṭa: gcd(m, n) = gcd(n, m mod n)", "Stop when n = 0: the answer is m"] },
  ],
  compare: [
    { name: "Counting dots", work: "grows with the value of the numbers" },
    { name: "Digit by digit addition", work: "grows with the number of digits" },
    { name: "First gcd algorithm", work: "scans m + n numbers" },
    { name: "Combined scan", work: "scans max(m, n) numbers" },
    { name: "Common divisors up to min", work: "scans min(m, n) numbers" },
    { name: "Euclid, subtraction", work: "can take about half the value (gcd(99, 2))" },
    { name: "Āryabhaṭa, remainder", work: "grows with the number of digits" },
  ],
  rule: "Every algorithm needs three things: clear steps, a reason why it is correct, and a count of how much work it does.",
};

export const AL9_TOPICS: NTopic[] = [
  // ───────────────────────────── 1 THEORY
  {
    id: "a1", category: "Theory", title: "What is an Algorithm?", heading: "What is an Algorithm?",
    sub: "A step-by-step procedure, and the words we use to describe it.",
    blocks: [
      { t: "p", s: "To add 5 and 7 we first learnt to draw 5 dots, draw 7 more dots and count all of them to get 12. Try this for 473 + 695 and it becomes very tiring. We then found a much faster way: write the numbers one below the other and add column by column. That faster way is an algorithm." },
      { t: "key", title: "Algorithm", s: "An **algorithm** is a **step-by-step procedure to arrive at an answer**. We describe it by writing down the steps as **precisely** as possible." },
      { t: "h", s: "What an algorithm is made of" },
      { t: "ul", items: [
        "**Basic steps.** An algorithm is built from steps that we already know how to do directly. For addition the basic step is adding two single digits without counting. For divisors it is checking whether a smaller number divides a larger one.",
        "**Repetition.** The same step may be done again and again, for example **for each j in 1, 2, 3, ..., n**, check whether j divides n.",
        "**A condition.** A step may be done only in some cases, for example **if j divides n, add j** to the list.",
        "**Names for values.** We give names such as j, list-of-divisors or carry to the values we keep track of. Without names the steps would be long and clumsy to describe.",
        "**Executing the algorithm** means running through its steps one by one, for a particular input, and writing down what happens.",
      ] },
      { t: "h", s: "Three questions to ask about every algorithm" },
      { t: "ol", items: [
        "**What are the steps?** They must be precise. Do exactly what is written, nothing else.",
        "**Is it correct?** When we give an algorithm we must also **justify why it works**.",
        "**How efficient is it?** We count how many steps it takes, in terms of the size of its input, and decide how fast it is.",
      ] },
      { t: "note", title: "Why the word algorithm?", s: "The word comes from the name of the Persian mathematician Al-Khwārizmī (780 to 850 CE). He wrote a book explaining the Indian place value system and the Indian ways of adding, subtracting, multiplying and dividing. Its Latin translation spread these methods in Europe, and the word algorismus, from Algoritmi (the Latin form of his name), became algorism and then algorithm. At first it meant an Indian method of arithmetic. Today it means any well-defined, step-by-step procedure for solving a class of problems." },
    ],
  },
  // ───────────────────────────── 2
  {
    id: "a2", category: "Theory", title: "Adding Numbers Digit by Digit", heading: "The Addition Algorithm",
    sub: "Column by column, right to left, with a carry.",
    blocks: [
      { t: "p", s: "Counting dots takes ten times as long when we move from 3-digit to 4-digit numbers. Adding digit by digit needs just one more column. Here is the algorithm written precisely." },
      { t: "key", title: "Algorithm to add two numbers", s: "**1.** Write the numbers one below the other in the Indian base-ten place-value system so that the digits are **aligned from right to left**.  **2.** Add the **rightmost** digits. If the sum is less than 10, write it below the two digits and set **carry = 0**. If the sum is 10 or more, write the **units digit** of the sum below and set **carry = 1**.  **3.** Move to the next column on the left. Add the two digits **and the current carry**. Treat the sum as in step 2.  **4.** Repeat step 3 until there are no more digits on the left.  **5.** If carry = 1, write **1 to the left** of the bottom row." },
      { t: "table", head: ["Column", "Digits and carry", "Sum", "Written", "New carry"], rows: [
        ["Units", "3 + 5", "8", "8", "0"],
        ["Tens", "7 + 9 + 0", "16", "6", "1"],
        ["Hundreds", "4 + 6 + 1", "11", "1", "1"],
        ["Step 5", "carry = 1", "", "1 on the left", ""],
      ] },
      { t: "p", s: "So 473 + 695 = **1168**." },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "**Why align from the right?** The units must be added to units, tens to tens and hundreds to hundreds. Aligning from the left would add digits of different place values.",
        "**Why is the carry never more than 1?** The biggest possible sum in a column is 9 + 9 + 1 = 19, so the units digit is written and the carry is at most 1.",
        "**Why is step 5 needed?** Without it, a last carry is lost. For example 56 + 67 would give 23 instead of **123**. It is not needed when the last carry is 0, for example 21 + 34 = 55.",
        "**Numbers of different lengths.** If one number has fewer digits (for example 12345 + 678), the missing digits are taken as 0, so that every column still has two digits to add.",
        "**An assumption.** We assume that we can add single-digit numbers without counting them out. Every algorithm rests on some basic steps like this.",
        "**Decimals.** To add decimal fractions, align the **decimal points** (so that equal place values are in the same column) and then add in the same way.",
      ] },
    ],
  },
  // ───────────────────────────── 3
  {
    id: "a3", category: "Theory", title: "Why It Works and How Fast It Is", heading: "Why the Addition Algorithm Works, and How Fast It Is",
    sub: "Justifying an algorithm and counting its work.",
    blocks: [
      { t: "key", title: "Justification", s: "Adding two numbers means combining their dots and counting. Digit by digit addition gives the same answer because we **group each number into units, tens, hundreds and so on, and add each group separately**. Whenever a smaller group (say the units) makes a group of ten, we **carry** the new ten to the tens group." },
      { t: "h", s: "How much work?" },
      { t: "p", s: "Suppose we can count one dot per second, and suppose we need 15 seconds to add two digits with a carry." },
      { t: "table", head: ["Sum", "Counting dots", "Digit by digit"], rows: [
        ["33 + 27", "60 dots, about 1 minute", "2 columns, about 30 seconds"],
        ["334 + 272", "606 dots, about 10 minutes", "3 columns, about 45 seconds"],
        ["3347 + 2729", "6076 dots, over 1 hour 40 minutes", "4 columns, about 1 minute"],
      ] },
      { t: "ul", items: [
        "Going from 3-digit to 4-digit numbers makes counting **10 times** longer. Going from 3 digits to 5 digits makes it **100 times** longer.",
        "For digit by digit addition, 4-digit numbers need only **1 more column** than 3-digit numbers, and 5-digit numbers need only **2 more columns**.",
        "So the work of counting grows with the **value** of the numbers, but the work of the addition algorithm grows with the **number of digits**.",
        "This is the idea of **efficiency**: a good algorithm saves a very large amount of work.",
      ] },
      { t: "note", title: "Think about it", s: "Always ask the same two questions of an algorithm: does it give the right answer for every input, and how does its work grow when the numbers become larger?" },
    ],
  },
  // ───────────────────────────── 4
  {
    id: "a4", category: "Theory", title: "Lists and Divisors", heading: "Lists and the Divisors of a Number",
    sub: "A list is a simple data structure. We use it to find all the divisors of n.",
    blocks: [
      { t: "p", s: "To find the greatest common divisor (gcd) or highest common factor (hcf) of two numbers from the definition, we first need all the divisors of each number. The divisors of a number are its factors, and each one lies between 1 and the number." },
      { t: "key", title: "List", s: "A **list** is a sequence of values kept in order, written in square brackets, for example [1, 4, 9, 16]. It starts **empty**, written [ ], and every new value is added at the **end**. A list is an example of a **data structure**: a way of organising information so that an algorithm can use it easily." },
      { t: "key", title: "Algorithm to find the divisors of n", s: "**1.** Start with an empty list-of-divisors.  **2.** For each number **j** in the sequence 1, 2, 3, ..., n: if j divides n, **add j** to the list-of-divisors." },
      { t: "h", s: "Executing it for n = 18" },
      { t: "table", head: ["j", "Does j divide 18?", "list-of-divisors"], rows: [
        ["start", "", "[ ]"],
        ["1", "yes", "[1]"],
        ["2", "yes", "[1, 2]"],
        ["3", "yes", "[1, 2, 3]"],
        ["4, 5", "no", "[1, 2, 3]"],
        ["6", "yes", "[1, 2, 3, 6]"],
        ["7, 8", "no", "[1, 2, 3, 6]"],
        ["9", "yes", "[1, 2, 3, 6, 9]"],
        ["10 to 17", "no", "[1, 2, 3, 6, 9]"],
        ["18", "yes", "[1, 2, 3, 6, 9, 18]"],
      ] },
      { t: "ul", items: [
        "The result is **divisors(18) = [1, 2, 3, 6, 9, 18]**. It is in **increasing order**, because we checked the numbers in order from 1 to 18.",
        "The **basic step** assumed here is that we can tell whether a smaller number divides a larger number.",
        "**divisors(375) = [1, 3, 5, 15, 25, 75, 125, 375]**  and  **divisors(825) = [1, 3, 5, 11, 15, 25, 33, 55, 75, 165, 275, 825]**.",
        "The work grows with the number: for n = 375 we check 375 values of j, and for 10 times a bigger number we check 10 times as many.",
        "The names list-of-divisors and j let us say clearly what to do each time we find a divisor.",
        "A divisor of n always **comes in a pair**: the divisors of 18 are (1, 18), (2, 9) and (3, 6).",
      ] },
    ],
  },
  // ───────────────────────────── 5
  {
    id: "a5", category: "Theory", title: "The First Algorithm for GCD", heading: "The First Algorithm for the GCD",
    sub: "Divisors of both numbers, common divisors, then the largest.",
    blocks: [
      { t: "p", s: "We break the problem into smaller pieces we know how to solve. We want the **greatest common divisor** of two numbers. So we (i) find the divisors of both, (ii) pick the divisors that are in both lists, and (iii) take the largest of them." },
      { t: "key", title: "Algorithm to find gcd(m, n)", s: "**1.** Let divisors-of-m be the list divisors(m).  **2.** Let divisors-of-n be the list divisors(n).  **3.** Start with an empty list common-divisors.  **4.** For each number x in divisors-of-m: if x also appears in divisors-of-n, add x to common-divisors.  **5.** Report the **rightmost element** of common-divisors as gcd(m, n)." },
      { t: "ul", items: [
        "**Why the rightmost?** divisors-of-m is in increasing order, so common-divisors is also in increasing order, and its last element is the largest.",
        "**Why is the list never empty?** The number **1** divides every number, so 1 is always in common-divisors.",
        "**gcd(375, 825).** Of the divisors 1, 3, 5, 15, 25, 75, 125, 375 of 375, the numbers 1, 3, 5, 15, 25, 75 are also divisors of 825, while 125 and 375 are not. So common-divisors = [1, 3, 5, 15, 25, 75] and **gcd = 75**.",
        "**gcd(54000, 81000).** Each number has about 80 divisors, so we must work systematically. The list of common divisors ends with 27000, so **gcd = 27000**.",
        "This algorithm comes straight from the **definition** of gcd, so it is easy to see why it is correct.",
      ] },
      { t: "note", title: "How many numbers are checked?", s: "This algorithm checks the numbers from 1 to m, then again from 1 to n. That is **m + n** possible divisors in all. The next topic shows how to reduce this." },
    ],
  },
  // ───────────────────────────── 6
  {
    id: "a6", category: "Theory", title: "Making the GCD Algorithm Faster", heading: "Improving the GCD Algorithm",
    sub: "Three small changes that do the same job with less work.",
    blocks: [
      { t: "p", s: "Each change below keeps the answer the same but reduces the work. Because the changes do not alter what is computed, all the versions give the correct gcd." },
      { t: "ol", items: [
        "**Compute both lists together.** Run j from 1 to max(m, n). If j divides m, add it to the divisors of m. If j divides n, add it to the divisors of n. The number of values checked falls from m + n to **max(m, n)**.",
        "**Compute the common divisors directly.** For each j from 1 to max(m, n), if j divides **both** m and n, add j to the list of common divisors. A common divisor cannot be larger than the smaller number, so it is enough to run j from 1 to **min(m, n)**.",
        "**Do away with the lists.** Each time we find a larger common divisor, the earlier ones are useless. Keep one value, **most-recent-common-divisor**, starting at **1** (since 1 is always a common divisor). For each k from 2 to min(m, n), if k divides both m and n, update most-recent-common-divisor to k. At the end it is the gcd.",
      ] },
      { t: "h", s: "Example: m = 6 and n = 12" },
      { t: "table", head: ["k", "Divides 6 and 12?", "most-recent-common-divisor"], rows: [
        ["start", "", "1"],
        ["2", "yes", "2"],
        ["3", "yes", "3"],
        ["4", "no (4 does not divide 6)", "3"],
        ["5", "no", "3"],
        ["6", "yes", "6"],
      ] },
      { t: "p", s: "The scan is complete and **gcd(6, 12) = 6**." },
      { t: "h", s: "How efficient is it?" },
      { t: "ul", items: [
        "Even the last version has to examine all the numbers from 1 to min(m, n).",
        "If the smaller number goes from 3 digits to 4 digits, we scan **10 times** as many values. From 3 digits to 5 digits, **100 times** as many.",
        "This is the same kind of growth as counting dots: the work depends on the **value** of the number, not on its number of digits.",
        "Scanning from min(m, n) **backwards** to 1 would also work, and the first common divisor found would be the gcd. Working backwards in the divisor lists would give the divisors in decreasing order.",
        "The question is whether there is a gcd algorithm whose work grows with the number of **digits**, like addition. Euclid and Āryabhaṭa give the answer.",
      ] },
    ],
  },
  // ───────────────────────────── 7
  {
    id: "a7", category: "Theory", title: "Euclid's Subtraction Algorithm", heading: "Euclid's Subtraction Algorithm",
    sub: "Replace gcd(m, n) by the simpler gcd(n, m − n).",
    blocks: [
      { t: "p", s: "Euclid wrote this algorithm in his book Elements. Historians believe other Greek mathematicians knew it earlier, but he was the first to write it down. It is based on one observation." },
      { t: "key", title: "Euclid's observation", s: "Let m ≥ n. Then **gcd(m, n) = gcd(n, m − n)**. The second problem has smaller numbers, so it is simpler." },
      { t: "proof", title: "Why gcd(m, n) = gcd(n, m − n)", statement: "Every common divisor of m and n is a common divisor of n and m − n, and the other way round.",
        given: "m ≥ n, and d is a natural number.", show: "d divides m and n if and only if d divides n and m − n.",
        steps: ["Suppose d divides both m and n. Write m = ad and n = bd for natural numbers a and b. Then m − n = ad − bd = (a − b)d, so d divides m − n. So d divides n and m − n.", "Now suppose d divides both n and m − n. Write n = xd and m − n = yd. Then m = n + (m − n) = xd + yd = (x + y)d, so d divides m. So d divides m and n."],
        end: "The two pairs have exactly the same common divisors, so they have the same greatest common divisor." },
      { t: "fig", spec: F.tiles("Blocks of size d tile m and n, and so also m − n") },
      { t: "key", title: "Euclid's algorithm for gcd(m, n)", s: "**1.** If m < n, reverse the numbers and compute gcd(n, m).  **2.** If n = 0, report the answer as m.  **3.** Otherwise, reduce the problem to computing gcd(n, m − n)." },
      { t: "ul", items: [
        "**When do we stop?** gcd(23, 23) is clearly 23. By the reduction, gcd(23, 23) becomes gcd(23, 0). So if we reach **gcd(m, 0), the answer is m**.",
        "**Trace for gcd(375, 825).** 375 < 825, so reverse to (825, 375). Then (375, 450), reverse (450, 375), then (375, 75), (75, 300), reverse (300, 75), (75, 225), reverse (225, 75), (75, 150), reverse (150, 75), (75, 75), (75, 0). The answer is **75**, after **7 reductions**.",
        "**A slow case.** gcd(99, 2) reduces to gcd(97, 2), gcd(95, 2), gcd(93, 2), and so on down to gcd(3, 2), gcd(2, 1), gcd(1, 1) and gcd(1, 0). The answer is 1, but it takes about 50 reductions.",
        "In general gcd(2k + 1, 2) needs about **k** reductions. The number of steps depends on the **value** we start with, not on the number of digits.",
      ] },
    ],
  },
  // ───────────────────────────── 8
  {
    id: "a8", category: "Theory", title: "Āryabhaṭa's Division Algorithm", heading: "Āryabhaṭa's Division Algorithm",
    sub: "Use the remainder instead of repeated subtraction.",
    blocks: [
      { t: "p", s: "In his Āryabhaṭīya (499 CE), Āryabhaṭa described the long division method for finding the gcd using Indian place value numerals. It uses repeated **division by remainder** in place of repeated subtraction. Subtracting 2 again and again from 99 until we cannot subtract any more leaves just the remainder when 99 is divided by 2." },
      { t: "key", title: "m mod n", s: "**m mod n** means the **remainder when m is divided by n**. For example 17 mod 5 = 2, 33 mod 7 = 5 and 99 mod 2 = 1." },
      { t: "key", title: "Āryabhaṭa's algorithm for gcd(m, n)", s: "**1.** If m < n, reverse the numbers and compute gcd(n, m).  **2.** If n = 0, report the answer as m.  **3.** Otherwise, reduce the problem to computing **gcd(n, m mod n)**." },
      { t: "ul", items: [
        "**Only step 3 changes.** The stopping condition is the same as in Euclid's algorithm.",
        "**Why it is correct.** A number d divides both m and n if and only if d divides both n and m mod n. This works like the subtraction argument, because m mod n is what is left after subtracting n as many times as possible.",
        "**gcd(99, 2).** Step 3 gives gcd(2, 1), then gcd(1, 0), so the answer is 1 in only **2 reductions**. The same is true for every gcd(2k + 1, 2).",
        "The number of reductions in this algorithm is **proportional to the number of digits** of m and n. The proof is for higher classes.",
      ] },
      { t: "h", s: "The long division method" },
      { t: "table", head: ["gcd", "Divisions", "Answer"], rows: [
        ["gcd(99, 2)", "99 = 49 × 2 + 1,  then  2 = 2 × 1 + 0", "1"],
        ["gcd(825, 375)", "825 = 2 × 375 + 75,  then  375 = 5 × 75 + 0", "75"],
        ["gcd(60, 16)", "60 = 3 × 16 + 12,  then  16 = 1 × 12 + 4,  then  12 = 3 × 4 + 0", "4"],
      ] },
      { t: "p", s: "In each case, the divisor of the last division (the one that leaves remainder 0) is the gcd." },
      { t: "table", head: ["Algorithm", "Reduces gcd(m, n) to", "Number of steps depends on"], rows: [
        ["Euclid (subtraction)", "gcd(n, m − n)", "the **value** of the numbers"],
        ["Āryabhaṭa (division)", "gcd(n, m mod n)", "the **number of digits**"],
      ] },
    ],
  },
  // ───────────────────────────── 9
  {
    id: "a9", category: "Theory", title: "Writing More Algorithms", heading: "Writing Algorithms of Your Own",
    sub: "Ways to describe lcm, primes, prime divisors and prime factorisation.",
    blocks: [
      { t: "p", s: "Once we can describe divisors and gcd, we can use them as building blocks for new algorithms. The pattern is always the same: say what is wanted, break it into smaller steps, and name the values we keep." },
      { t: "h", s: "Elements of one list that are not in another" },
      { t: "p", s: "Let List 1 and List 2 be lists of numbers in increasing order. To find the elements of List 1 that are **not in List 2**:" },
      { t: "ol", items: [
        "Start with an empty list called only-in-1.",
        "For each x in List 1: if x does not appear in List 2, add x to only-in-1.",
        "Report only-in-1. (Swapping the two lists gives the elements of List 2 that are not in List 1.)",
      ] },
      { t: "h", s: "Least common multiple" },
      { t: "ul", items: [
        "**Using gcd:** compute g = gcd(m, n), then **lcm(m, n) = (m × n) ÷ g**. For example gcd(12, 18) = 6, so lcm = 12 × 18 ÷ 6 = 36.",
        "**Directly:** for each j = 1, 2, 3, ..., m × n in order, the first j that is a multiple of both m and n (that is, both m and n divide j) is the lcm.",
      ] },
      { t: "h", s: "Primes" },
      { t: "ul", items: [
        "A prime number has **exactly two divisors**, 1 and itself.",
        "**Algorithm prime(n):** compute divisors(n). If the list has exactly **2 elements**, report that n is prime. Otherwise report that it is not prime. (For n = 1 the list is [1], with 1 element, so 1 is not prime.)",
        "**Algorithm primedivisors(n):** compute divisors(n), then start an empty list and, for each x in divisors(n), if prime(x) is true, add x to the list. For n = 30, divisors are [1, 2, 3, 5, 6, 10, 15, 30] and the prime divisors are [2, 3, 5].",
      ] },
      { t: "h", s: "Prime factorisation" },
      { t: "ul", items: [
        "**Representing it:** 180 = 2² × 3² × 5¹ can be stored as a list of pairs (prime, power): **[(2, 2), (3, 2), (5, 1)]**.",
        "**Algorithm:** start with the number n and a prime p = 2. While p divides n, divide n by p and count the divisions. Then record (p, count) if the count is more than 0 and move to the next number p. Stop when n becomes 1.",
        "**Comparing two numbers:** write both factorisations as lists of pairs in increasing order of the prime. For the gcd, take each prime that appears in **both** with the **smaller** power. For the lcm, take each prime that appears in **either** with the **larger** power.",
      ] },
      { t: "note", title: "Divisors in pairs", s: "Divisors come in pairs (d, n ÷ d). So it is enough to check j up to about the square root of n. For n = 36 we check j = 1 to 6, find the pairs (1, 36), (2, 18), (3, 12), (4, 9), (6, 6) and get all 9 divisors. A list of divisors made this way is no longer in increasing order, so a gcd algorithm that relied on the order (taking the rightmost element) would need the lists to be sorted first, or to take the largest common value instead." },
    ],
  },
  // ───────────────────────────── 10 SOLVED EXAMPLES
  {
    id: "a10", category: "Solved Examples", title: "Solved Examples", heading: "Solved Examples",
    sub: "Addition, divisors, the four gcd methods and writing algorithms.",
    blocks: [
      { t: "ex", title: "Example 1: addition with carries", q: "Add 958 and 467 using the addition algorithm. Write the carry at each column.", steps: [
        "Units: 8 + 7 = 15. Write 5, carry 1.",
        "Tens: 5 + 6 + 1 = 12. Write 2, carry 1.",
        "Hundreds: 9 + 4 + 1 = 14. Write 4, carry 1.",
        "No more digits, and carry = 1, so write 1 on the left (step 5).",
      ], ans: "958 + 467 = 1425." },
      { t: "ex", title: "Example 2: why step 5 is needed", q: "Show with 85 + 47 what goes wrong if step 5 is left out.", steps: [
        "Units: 5 + 7 = 12. Write 2, carry 1.",
        "Tens: 8 + 4 + 1 = 13. Write 3, carry 1.",
        "Without step 5 the answer would read 32. The correct sum is 132.",
      ], ans: "The last carry is lost, so the answer 32 is wrong. With step 5, the answer is 132." },
      { t: "ex", title: "Example 3: divisors of 36", q: "Execute the divisors algorithm for n = 36.", steps: [
        "Start with [ ]. Check j = 1 to 36.",
        "j = 1, 2, 3, 4 divide 36, giving [1, 2, 3, 4]. j = 5 does not.",
        "j = 6 divides, 7 and 8 do not, j = 9 divides, 10 and 11 do not, j = 12 divides, 13 to 17 do not, j = 18 divides, 19 to 35 do not, j = 36 divides.",
      ], ans: "divisors(36) = [1, 2, 3, 4, 6, 9, 12, 18, 36], which has 9 elements." },
      { t: "ex", title: "Example 4: gcd by the first algorithm", q: "Find gcd(36, 48) using lists of divisors.", steps: [
        "divisors(36) = [1, 2, 3, 4, 6, 9, 12, 18, 36].",
        "divisors(48) = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48].",
        "Common divisors: 1, 2, 3, 4, 6 and 12 are in both lists. 9, 18 and 36 are not in the second list.",
        "common-divisors = [1, 2, 3, 4, 6, 12]. The rightmost element is 12.",
      ], ans: "gcd(36, 48) = 12." },
      { t: "ex", title: "Example 5: most-recent-common-divisor", q: "Execute the no-list algorithm for m = 12 and n = 18.", steps: [
        "min(12, 18) = 12. Start with most-recent-common-divisor = 1.",
        "k = 2 divides both, so update to 2. k = 3 divides both, update to 3. k = 4 does not divide 18, so it stays 3. k = 5 does not divide 12.",
        "k = 6 divides both, update to 6. For k = 7 to 11, k does not divide both numbers, so it stays 6. k = 12 does not divide 18.",
      ], ans: "gcd(12, 18) = 6." },
      { t: "ex", title: "Example 6: Euclid's subtraction", q: "Find gcd(48, 18) using Euclid's subtraction algorithm.", steps: [
        "(48, 18) reduces to (18, 30). Since 18 < 30, reverse to (30, 18).",
        "(30, 18) reduces to (18, 12). Then (18, 12) reduces to (12, 6).",
        "(12, 6) reduces to (6, 6), and (6, 6) reduces to (6, 0). Since n = 0, the answer is 6.",
      ], ans: "gcd(48, 18) = 6, after 5 reductions." },
      { t: "ex", title: "Example 7: Āryabhaṭa's division", q: "Find gcd(252, 105) using the division algorithm.", steps: [
        "252 = 2 × 105 + 42, so gcd(252, 105) = gcd(105, 42).",
        "105 = 2 × 42 + 21, so gcd(105, 42) = gcd(42, 21).",
        "42 = 2 × 21 + 0, so gcd(42, 21) = gcd(21, 0) = 21.",
      ], ans: "gcd(252, 105) = 21, after 3 divisions." },
      { t: "ex", title: "Example 8: speed of the two methods", q: "Compare the number of reductions for gcd(99, 2) in the two algorithms.", steps: [
        "Euclid's subtraction: gcd(99, 2) goes to gcd(97, 2), gcd(95, 2), ..., gcd(3, 2), gcd(2, 1), gcd(1, 1), gcd(1, 0). That is about 50 reductions.",
        "Āryabhaṭa's division: 99 mod 2 = 1, so gcd(99, 2) goes to gcd(2, 1), then gcd(1, 0). That is 2 reductions.",
      ], ans: "About 50 reductions against 2 reductions. The division algorithm is much faster." },
      { t: "ex", title: "Example 9: lcm using gcd", q: "Describe how to compute lcm(15, 20) with the gcd algorithm.", steps: [
        "gcd(15, 20): 20 = 1 × 15 + 5, then 15 = 3 × 5 + 0, so the gcd is 5.",
        "lcm = (15 × 20) ÷ 5 = 300 ÷ 5 = 60.",
      ], ans: "lcm(15, 20) = 60." },
      { t: "ex", title: "Example 10: an algorithm for prime(n)", q: "Use divisors(n) to write an algorithm prime(n), and test it on 13 and 15.", steps: [
        "1. Compute the list divisors(n).",
        "2. If the list has exactly 2 elements, report that n is prime. Otherwise report that n is not prime.",
        "divisors(13) = [1, 13] has 2 elements, so 13 is prime. divisors(15) = [1, 3, 5, 15] has 4 elements, so 15 is not prime.",
      ], ans: "prime(13) says prime. prime(15) says not prime." },
    ],
  },
  // ───────────────────────────── 11 REVISION
  {
    id: "a11", category: "Revision", title: "Revision and Mind Map", heading: "Revision: Mind Map, Key Points and Common Mistakes",
    sub: "Five steps and a comparison of the algorithms, on one page.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "Key points to remember" },
      { t: "table", head: ["Topic", "Remember"], rows: [
        ["Algorithm", "A systematic step-by-step procedure to solve a problem, made of basic steps we can do directly"],
        ["Repetition and condition", "For each j in 1, 2, ..., n  (repeat);  add j only if j divides n  (condition)"],
        ["Addition", "Align digits from the right, add column by column with a carry. The carry is 0 or 1. Write a last carry on the left"],
        ["Divisors", "Check j from 1 to n and add j to the list if j divides n. The list is in increasing order"],
        ["First gcd algorithm", "Common divisors of the two lists; the rightmost is the gcd; it scans m + n numbers"],
        ["Faster versions", "max(m, n) numbers, then min(m, n) numbers, then no lists: keep most-recent-common-divisor, starting at 1"],
        ["Euclid", "gcd(m, n) = gcd(n, m − n) for m ≥ n; reverse if m < n; stop at gcd(m, 0) = m"],
        ["Āryabhaṭa", "gcd(m, n) = gcd(n, m mod n); steps grow with the number of digits"],
        ["Three questions", "What are the steps? Why is it correct? How many steps does it take?"],
      ] },
      { t: "h", s: "Common mistakes" },
      { t: "ul", items: [
        "Aligning the numbers from the left in the addition algorithm.",
        "Forgetting step 5, so that a last carry is left out of the answer.",
        "Thinking that a carry can be 2. It is only 0 or 1.",
        "Forgetting to reverse the numbers when m < n in Euclid's algorithm.",
        "Stopping at gcd(m, n) with n = 1. The algorithm stops only when n = 0 (the answer is then m).",
        "Using m mod n as the quotient. It is the **remainder**: 33 mod 7 = 5, not 4.",
        "Forgetting that 1 is always a common divisor, and that gcd(m, n) is never larger than min(m, n).",
        "Believing that fewer steps means a different answer. A faster algorithm gives the **same** gcd.",
      ] },
    ],
  },
];
