import type { CTopic, CBlock } from "./carbonNotesTypes";

// Class VIII Maths, Fractions in Disguise (NCERT Ganita Prakash Part II, Chapter 1). Topics 1 to 9: percentages, fractions and decimals,
// percentage of a quantity, mental computation, ratios, finding the whole and percentages greater than 100. Each topic ends with solved examples.
// In every text: **bold** makes bold, [a|b] is a stacked fraction, ^{..} is a power. Do not write a letter touching a digit (it becomes a subscript).

let n = 0;
/** a solved example, numbered in order through the chapter */
export const ex = (q: string, steps: string[], ans: string): CBlock => ({ t: "ex", title: `Solved example ${++n}`, q, steps, ans });

export const FD_A: CTopic[] = [
  {
    id: "d1", category: "Per cent", title: "What Is a Percentage?", heading: "Percentages: Fractions in Disguise",
    sub: "Mega sale, 83% in the board exams: what does % really mean?",
    blocks: [
      { t: "p", s: "You hear sentences like **'Mega Sale, up to 50% off!'** or **'Hiya scored 83% in her board exams'**. The symbol **%** is read as **per cent**. The word comes from the Latin phrase **per centum**, which means **'by the hundred'** or **'out of hundred'**." },
      { t: "key", title: "Percentage", s: "A **percentage** is a fraction whose **denominator is 100**. So 25% means 25 out of every 100: 25 people out of 100, 25 rupees out of 100 rupees, or 25 marks out of 100 marks.   **x% = [x|100]**" },
      { t: "dia", id: "fd_grid" },
      { t: "p", s: "50% of a quantity s means 50 × [1|100] × s = [1|2] s: it is simply **half** of s." },
      { t: "table", head: ["Percentage", "Fraction", "Percentage", "Fraction"], rows: [
        ["10%", "[1|10]", "50%", "[1|2]"], ["20%", "[1|5]", "75%", "[3|4]"], ["25%", "[1|4]", "100%", "1"], ["5%", "[1|20]", "33[1|3]%", "[1|3]"], ["12.5%", "[1|8]", "66[2|3]%", "[2|3]"],
      ] },
      { t: "h", s: "Percentages around us" },
      { t: "ul", items: [
        "The human body is, on average, about **60% water** by weight.", "Ice cream is about **30 to 50% air** by volume.", "About **45%** of the world's population watched at least part of the 2022 FIFA World Cup.",
        "Over **80%** of teenagers globally do not get at least one hour of daily physical activity.", "About **99.86%** of the mass of the Solar System is in the Sun.", "An estimated **52%** of the agricultural land worldwide is degraded.",
      ] },
      { t: "note", title: "A little history", s: "The idea of 'per hundred' is found as early as the 4th century BCE in **Kautilya's Arthashastra**: 'An interest of a pana and a quarter per month per cent is just. Five panas per month per cent is commercial interest. Ten panas per month per cent prevails among forests. Twenty panas per month per cent prevails among sea traders.' The Romans used taxes of [1|20] and [1|100] in trade and auctions. Italian manuscripts of the 15th century wrote 'xx p cento', 'x p cento' and 'vii p cento' for our 20%, 10% and 7%." },
      ex("What does 8% of 100 rupees mean? Find 50% of 60.", ["8% means 8 out of every 100, so 8% of 100 rupees is **8 rupees**.", "50% = [50|100] = [1|2], so 50% of 60 = [1|2] × 60 = 30."], "8 rupees; 30"),
    ],
  },
  {
    id: "d2", category: "Fractions", title: "Writing a Fraction as a Percentage", heading: "Expressing Fractions as Percentages",
    sub: "How many out of 100?",
    blocks: [
      { t: "p", s: "To change a fraction into a percentage, ask: **how many out of 100?** There are three good ways." },
      { t: "ol", items: [
        "**Make the denominator 100:** [3|4] = [3 × 25|4 × 25] = [75|100] = 75%.",
        "**Use an equation:** [3|4] = [x|100]. Multiply both sides by 100: x = [3|4] × 100 = 75, so 75%.",
        "**Shortcut: multiply the fraction by 100.** [2|5] × 100 = 40, so 40%. This always works.",
      ] },
      { t: "dia", id: "fd_bar34" },
      { t: "key", title: "Rule", s: "A fraction is a part **of a unit**; a percentage is a part **per 100**. So **Fraction × 100 = Percentage**." },
      ex("Surya mixes red and yellow paint. Red paint makes up [3|4] of the mixture. What percentage of the colour is red, and what percentage is yellow?", ["[3|4] = [6|8] = [30|40] = [75|100]", "So red paint is **75%**.", "Yellow paint is the rest: 100% − 75% = **25%**."], "Red 75%, yellow 25%"),
      ex("Surya wants to save [2|5] of his prize money for a new canvas. Express this as a percentage in two ways.", ["Method 1: [2|5] = [20|50] = [40|100] = 40%", "Method 2: [2|5] = [x|100], so x = [2|5] × 100 = 40", "In a bar model, [1|5] = 20%, so [2|5] = 40%."], "40%"),
      ex("Express as percentages: (i) [7|8]  (ii) [72|150]  (iii) [5|11]", ["(i) [7|8] × 100 = 87.5, so 87.5%", "(ii) [72|150] × 100 = [7200|150] = 48, so 48%", "(iii) [5|11] × 100 = [500|11] ≈ 45.45, so 45.45%"], "87.5%, 48%, 45.45%"),
    ],
  },
  {
    id: "d3", category: "Fractions", title: "Percentages, Fractions and Decimals", heading: "The FDP Trio",
    sub: "One number, three ways of writing it.",
    blocks: [
      { t: "p", s: "To change a **percentage into a fraction**, write it over 100 and simplify. A percentage z% can be written as any fraction **equivalent to [z|100]**. To change it into a **decimal**, divide by 100." },
      { t: "dia", id: "fd_fdp" },
      { t: "table", head: ["Per cent", "50%", "100%", "25%", "75%", "10%", "1%", "5%", "43%"], rows: [
        ["Fraction", "[1|2]", "1", "[1|4]", "[3|4]", "[1|10]", "[1|100]", "[1|20]", "[43|100]"],
        ["Decimal", "0.5", "1.0", "0.25", "0.75", "0.1", "0.01", "0.05", "0.43"],
      ] },
      { t: "p", s: "Why does multiplying by 0.5 give 50% of a value? Because 50% = [50|100] = [1|2] = 0.5. So **to find a percentage of a number, multiply by its decimal**: 80% of 75 = 0.8 × 75 = 60. To find 10% of a quantity, multiply by 0.1." },
      ex("Express 24% as a fraction in several forms and in lowest terms.", ["24% = [24|100]", "Equivalent forms: [24|100] = [12|50] = [6|25] = [48|200]", "Lowest terms: [6|25]"], "[6|25]"),
      ex("Express 140% as a fraction and as a decimal.", ["140% = [140|100] = [7|5]", "As a decimal: 140 ÷ 100 = 1.4"], "[7|5] = 1.4"),
      ex("Write 0.085 and 2.35 as percentages.", ["0.085 × 100 = 8.5, so 8.5%", "2.35 × 100 = 235, so 235%"], "8.5% and 235%"),
    ],
  },
  {
    id: "d4", category: "Comparing", title: "Why Percentages? Comparing and Estimating", heading: "Comparing with Percentages and Estimating",
    sub: "Out of 100 makes comparison easy.",
    blocks: [
      { t: "p", s: "A biscuit factory makes two varieties. Sugar is [9|34] of Variety 1 and [13|45] of Variety 2. Which is more sugary? It is not clear at a glance. Written as **26.47%** and **28.89%**, it is clear that **Variety 2** has more sugar." },
      { t: "p", s: "Why 100 and not 10, 50 or 43? Our number system is **base 10**, so 10, 100 and 1000 fit easily with decimals (31% = 0.31). **100** is round, easy to understand, and large enough to give detail (per 10 would be too rough). Other bases are used too: [9|34] is 26.47 per cent (per 100), 2.647 per decem (per 10) and 264.7 per mille (per 1000)." },
      { t: "key", title: "Estimate first", s: "Use benchmarks: [1|2] = 50%, [1|4] = 25%, [1|3] ≈ 33%, [1|5] = 20%, [1|10] = 10%. Estimating before calculating catches silly mistakes." },
      ex("Fill in >, < or = without calculating exactly: (i) 50% and 5%  (ii) [5|10] and 50%  (iii) [3|11] and 61%  (iv) 30% and [1|3]", ["(i) 50 parts of 100 are more than 5 parts: 50% > 5%", "(ii) [5|10] = [1|2] = 50%: equal", "(iii) [3|11] is less than [1|2] = 50%, so it is less than 61%", "(iv) [1|3] ≈ 33.3%, which is more than 30%: 30% < [1|3]"], "(i) >  (ii) =  (iii) <  (iv) <"),
      ex("Four runners A, B, C and D are about one third, just past the middle, about three fourths and almost at the finish. Match them with: 55%, 20%, 38%, 72%, 84%, 93%.", ["One third of the way is near 38%.", "Just past the middle is 55%.", "Three fourths of the way is about 72%.", "Very close to the finish is 93%."], "A 38%, B 55%, C 72%, D 93%; 20% and 84% are extra"),
      ex("Nandini has 25 marbles, of which 15 are white. What percentage are white? In a school of 80 students, 15 walk to school. What percentage walk?", ["White: [15|25] × 100 = 60%", "Walkers: [15|80] × 100 = [1500|80] = 18.75%"], "60% and 18.75%"),
    ],
  },
  {
    id: "d5", category: "Of a quantity", title: "Percentage of a Quantity", heading: "Finding y% of a Number",
    sub: "A per cent is a share, not an amount.",
    blocks: [
      { t: "key", title: "Rule", s: "**y% of z = [y|100] × z.** A percentage is a **share**, so always ask: **per cent of what?** 35% of a small packet can be less than 25% of a big packet." },
      { t: "p", s: "The part grows with the whole. 25% sugar means 25 g of sugar in 100 g of biscuits, so 30 g of sugar in 120 g (**25 : 100 :: 30 : 120**). We can solve by proportion, by finding the sugar in 1 g, or by multiplying by the decimal." },
      ex("Madhu ate 120 g of biscuits with 25% sugar and Madhav ate 95 g of biscuits with 35% sugar. Who ate more sugar?", ["Madhu: [25|100] × 120 = 30 g", "Madhav: 1 g of biscuit has [35|100] g of sugar, so 95 g has [35|100] × 95 = 33.25 g", "33.25 g > 30 g"], "Madhav ate more sugar"),
      ex("The maximum marks of a test are 75. An A grade needs 80% or more. What is the least score for an A grade?", ["Fraction: [80|100] × 75 = [4|5] × 75 = 60", "Decimal: 0.8 × 75 = 60", "Proportion: out of 100 the least is 80, so out of 75 it is 75 × 80 ÷ 100 = 60"], "60 marks"),
      ex("Find (i) 16% of 250  (ii) 62% of 360  (iii) 140% of 40  (iv) 1% of 1 hour  (v) 7% of 10 kg.", ["(i) 0.16 × 250 = 40", "(ii) 0.62 × 360 = 223.2", "(iii) 1.4 × 40 = 56", "(iv) 1% of 60 minutes = 0.6 minute = 36 seconds", "(v) 0.07 × 10 kg = 0.7 kg = 700 g"], "40, 223.2, 56, 36 seconds, 700 g"),
    ],
  },
  {
    id: "d6", category: "Mental maths", title: "Free-hand (Mental) Computations", heading: "Percentages in Your Head",
    sub: "Break a percentage into easy pieces.",
    blocks: [
      { t: "table", head: ["Percentage", "How to find it quickly"], rows: [
        ["50%", "Take half"], ["25%", "Take a quarter (half of half)"], ["10%", "Divide by 10"], ["1%", "Divide by 100"], ["20%", "Double of 10%"], ["5%", "Half of 10%"], ["15%", "10% + 5%"], ["75%", "50% + 25%"], ["90%", "100% − 10%"], ["70%", "50% + 20%"], ["55%", "50% + 5%"],
      ] },
      { t: "key", title: "Percentages add (on the same whole)", s: "20% of y + 5% of y = 25% of y, because [20|100] y + [5|100] y = [25|100] y. This works only when both are percentages **of the same** quantity." },
      { t: "table", head: ["Value", "100", "200", "50", "80", "10", "35", "287"], rows: [
        ["25%", "25", "50", "12.5", "20", "2.5", "8.75", "71.75"], ["10%", "10", "20", "5", "8", "1", "3.5", "28.7"], ["20%", "20", "40", "10", "16", "2", "7", "57.4"], ["5%", "5", "10", "2.5", "4", "0.5", "1.75", "14.35"], ["40%", "40", "80", "20", "32", "4", "14", "114.8"], ["15%", "15", "30", "7.5", "12", "1.5", "5.25", "43.05"],
      ] },
      ex("Mentally find 75% and 90% of 80.", ["75% of 80 is half plus a quarter: 40 + 20 = 60", "90% of 80 is the whole minus a tenth: 80 − 8 = 72"], "60 and 72"),
      ex("Is 10% of a day longer than 1% of a week?", ["10% of a day = 0.1 × 24 hours = 2.4 hours", "1% of a week = 0.01 × 168 hours = 1.68 hours"], "Yes, 10% of a day is longer"),
    ],
  },
  {
    id: "d7", category: "Ratios", title: "Ratios as Percentages", heading: "From a Ratio to a Percentage",
    sub: "First find the total number of parts.",
    blocks: [
      { t: "key", title: "Method", s: "For a ratio **a : b**, the total is a + b parts. The first share is [a|a + b] of the whole, so it is **[a|a + b] × 100 per cent**." },
      ex("Millet and water are mixed in the ratio 2 : 7 to make kanji. What percentage of the mixture is millet? How much millet is needed for 500 mL of mixture?", ["Total parts 2 + 7 = 9. Estimate: [2|9] is a little less than [1|4] = 25%.", "Millet = [2|9] × 100 ≈ 22.22%; water = 100 − 22.22 = 77.78%", "100 mL has 22.22 mL of millet, so 500 mL has 5 × 22.22 = 111.1 mL"], "22.22% millet; about 111.1 mL"),
      ex("A badminton training of 90 minutes has warm up : play : cool down = 10% : 80% : 10%. How long is each?", ["Warm up: 10% of 90 = 9 minutes", "Play: 80% of 90 = 72 minutes", "Cool down: 10% of 90 = 9 minutes"], "9 min, 72 min, 9 min"),
      ex("Halwa has rava 40%, sugar 40% and ghee 20% for 4 people. What are the proportions for 8 people, and the weights in 2 kg?", ["Proportions do not change with quantity: rava 40%, sugar 40%, ghee 20%.", "Rava 0.4 × 2 kg = 800 g; sugar 800 g; ghee 0.2 × 2 kg = 400 g"], "Same percentages; 800 g, 800 g, 400 g"),
    ],
  },
  {
    id: "d8", category: "Finding the whole", title: "Finding the Whole or the Remaining Part", heading: "When the Part Is Known",
    sub: "Draw a bar: the whole is 100%.",
    blocks: [
      { t: "dia", id: "fd_trip" },
      { t: "key", title: "Rule", s: "If p% of a quantity is q, then the **whole = q × [100|p]**." },
      ex("A cyclist going from Delhi to Agra completes 40% of the journey, which is 92 km. How much more must he travel?", ["40% is 92 km, so 20% is 46 km.", "The remaining 60% is 92 + 46 = 138 km.", "Check: whole distance = 92 × 100 ÷ 40 = 230 km, and 230 − 92 = 138 km."], "138 km"),
      ex("In a class, 45% of the students are girls. There are 22 boys. How many students are there?", ["Boys = 100% − 45% = 55%", "55% of the total is 22, so total = 22 × 100 ÷ 55 = 40"], "40 students"),
      ex("Fill in the blanks: (i) 3 is __% of 300  (ii) __ is 40% of 4  (iii) 40 is 80% of __", ["(i) [3|300] × 100 = 1, so 1%", "(ii) 0.4 × 4 = 1.6", "(iii) 40 × 100 ÷ 80 = 50"], "1%, 1.6, 50"),
    ],
  },
  {
    id: "d9", category: "More than 100", title: "Percentages Greater Than 100", heading: "More Than the Whole",
    sub: "120%, 200%, 250%: what do they mean?",
    blocks: [
      { t: "table", head: ["Percentage", "Meaning", "Fraction", "Decimal"], rows: [
        ["100%", "the full amount", "1", "1.0"], ["120%", "the full amount and 20% more", "[6|5]", "1.2"], ["200%", "double", "2", "2.0"], ["250%", "two and a half times", "[5|2]", "2.5"],
      ] },
      { t: "dia", id: "fd_target" },
      ex("Kishanlal's daily sales target is 5000 rupees. On Days 1 to 4 he sold 2000, 3500, 5000 and 6000 rupees. What percentage of the target did he achieve each day?", ["Day 1: [2000|5000] × 100 = 40% (60% short)", "Day 2: [3500|5000] × 100 = 70% (30% short)", "Day 3: 100%", "Day 4: [6000|5000] × 100 = 120% (20% more than the target)"], "40%, 70%, 100%, 120%"),
      ex("On Day 7 he achieved 150% and on Day 8, 210% of his target of 5000. Find the sales. On Days 5 and 6 he sold 7800 and 9550: what percentages?", ["Day 7: 1.5 × 5000 = 7500; Day 8: 2.1 × 5000 = 10500", "Day 5: [7800|5000] × 100 = 156%", "Day 6: [9550|5000] × 100 = 191%"], "7500, 10500; 156%, 191%"),
      ex("A farmer harvested 260 kg of wheat last year and 650 kg this year. This year's harvest is what percentage of last year's?", ["[650|260] × 100 = 250", "So 250%, that is, 2.5 times"], "250%"),
    ],
  },
];
