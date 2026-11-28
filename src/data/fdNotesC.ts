import type { CTopic } from "./carbonNotesTypes";
import { ex } from "./fdNotesA";

// Class VIII Maths, Fractions in Disguise. Topics 20 to 26: the Competition Corner (successive changes, price and consumption, profit tricks,
// compound interest shortcuts, mixtures and elections, reverse percentages and practice). A step beyond the textbook. Same writing rules as fdNotesA.ts.

export const FD_C: CTopic[] = [
  {
    id: "k1", category: "Competition Corner", title: "Successive Discounts and Successive Changes", heading: "Competition Corner: One Change After Another",
    sub: "Why 20% + 10% is not 30%.",
    blocks: [
      { t: "note", title: "Competition Corner", s: "These ideas go a step beyond the textbook. They are favourites in Olympiads and scholarship tests. First be sure of the textbook topics, then try these." },
      { t: "dia", id: "fd_successive" },
      { t: "key", title: "Successive change formula", s: "Two changes of **a%** and **b%** one after the other give a **net change of a + b + [a b|100] per cent**. Use a **minus** sign for a decrease or a discount." },
      { t: "eq", lines: ["For any number of changes: multiply the multipliers", "Final = Original × (1 ± [a|100]) × (1 ± [b|100]) × (1 ± [c|100])"] },
      ex("Find the single discount equal to successive discounts of 10%, 20% and 30%.", ["Multiplier = 0.9 × 0.8 × 0.7 = 0.504", "Pay 50.4% of the price"], "49.6% discount (not 60%)"),
      ex("Which is the better offer: a flat 40% off, or 25% off followed by 20% off?", ["25% then 20%: −25 − 20 + [500|100] = −40", "Both equal a 40% discount."], "Both are the same"),
      ex("Which is better for the buyer: 30% + 10% off, or 20% + 20% off?", ["30% + 10%: −30 − 10 + 3 = −37, a 37% discount", "20% + 20%: −20 − 20 + 4 = −36, a 36% discount"], "30% + 10% is better"),
      ex("The price of a thing rises by 20% and then falls by 20%. What is the net change?", ["Net = 20 − 20 + [20 × (−20)|100] = −4"], "A fall of 4%"),
      { t: "key", title: "Same rise and fall", s: "A rise of x% followed by a fall of x% (or the other way) is always a **net fall of [x^{2}|100] per cent**." },
      { t: "note", title: "Order does not matter", s: "A 10% discount followed by 10% GST gives the same price as GST first and then the discount, because multiplication can be done in any order: 1000 × 0.9 × 1.1 = 1000 × 1.1 × 0.9 = 990." },
    ],
  },
  {
    id: "k2", category: "Competition Corner", title: "More Than, Less Than, Price and Consumption", heading: "Competition Corner: Changing the Base",
    sub: "The same difference is a different per cent from the other side.",
    blocks: [
      { t: "table", head: ["Statement", "Then"], rows: [
        ["A is r% **more** than B", "B is [r|100 + r] × 100 per cent **less** than A"],
        ["A is r% **less** than B", "B is [r|100 − r] × 100 per cent **more** than A"],
        ["Price **rises** by r%, spending unchanged", "Consumption falls by [r|100 + r] × 100 per cent"],
        ["Price **falls** by r%, spending unchanged", "Consumption rises by [r|100 − r] × 100 per cent"],
        ["Expenditure", "= Price × Consumption (so multipliers multiply)"],
      ] },
      ex("Ravi's salary is 25% more than Mohan's. By what percentage is Mohan's salary less than Ravi's?", ["Mohan 100, Ravi 125", "[25|125] × 100 = 20"], "20% less (not 25%)"),
      ex("The price of sugar rises by 25%. By how much must a family reduce its use so that it spends the same?", ["[25|125] × 100 = 20", "Check: 1.25 × 0.8 = 1"], "20%"),
      ex("The price of apples falls by 20%. How much more can be bought with the same money?", ["[20|80] × 100 = 25"], "25% more (not 20%)"),
      ex("The price of petrol rises 25% but a family increases its spending on petrol by only 10%. By what percentage does its use fall?", ["Use multiplier = 1.1 ÷ 1.25 = 0.88", "Fall = 12%"], "12%"),
      { t: "key", title: "Percentage points and per cent", s: "A rate going from 8% to 10% has risen by **2 percentage points**, but by **25 per cent** of itself ([2|8] × 100)." },
    ],
  },
  {
    id: "k3", category: "Competition Corner", title: "Smart Profit and Loss", heading: "Competition Corner: Tricks of the Shop",
    sub: "Equal selling prices, false weights and free items.",
    blocks: [
      { t: "table", head: ["Situation", "Result"], rows: [
        ["Two articles sold at the **same SP**, one at x% profit and one at x% loss", "Always a **loss of [x^{2}|100] %**"],
        ["A trader sells at cost price but uses a **false weight**", "Gain % = [error|true weight − error] × 100"],
        ["MP is m% above CP and a discount of d% is given", "Multiplier = (1 + [m|100]) × (1 − [d|100])"],
        ["Buy a, get b free", "Discount = [b|a + b] × 100 %"],
      ] },
      ex("Two watches are sold at 1200 rupees each, one at 20% profit and the other at 20% loss. Find the overall result.", ["CP of first = 1200 × 100 ÷ 120 = 1000", "CP of second = 1200 × 100 ÷ 80 = 1500", "Total CP 2500, total SP 2400: loss 100, which is 4% = [20^{2}|100]"], "4% loss"),
      ex("A shopkeeper claims to sell at cost price but gives 900 g instead of 1 kg. Find his gain percentage.", ["He receives the money for 1000 g but parts with 900 g.", "Gain = [100|900] × 100 ≈ 11.11%"], "about 11.11%"),
      ex("A trader marks goods 14% above cost and also gives only 950 g in place of 1 kg. Find his gain percentage.", ["Money for 1000 g at 1.14 per unit of cost, but cost is only of 950 g.", "[1.14 × 1000|950] = 1.2"], "20% gain"),
      ex("Goods are marked 50% above cost and sold after successive discounts of 20% and 10%. Find the profit percentage.", ["1.5 × 0.8 × 0.9 = 1.08"], "8% profit"),
      ex("A shop offers 'buy 3 get 2 free'. What is the discount?", ["You get 5 items and pay for 3.", "[2|5] × 100 = 40%"], "40%"),
      ex("Selling an article at 10% profit instead of 10% loss gives 60 rupees more. Find its cost price.", ["The difference is 20% of the cost price.", "20% of CP = 60"], "CP = 300 rupees"),
    ],
  },
  {
    id: "k4", category: "Competition Corner", title: "Compound Interest Shortcuts", heading: "Competition Corner: Faster Interest",
    sub: "Difference of interests, half-yearly interest and the rule of 72.",
    blocks: [
      { t: "eq", lines: ["Compound − simple interest for 2 years = p r^{2}", "Compound − simple interest for 3 years = p r^{2} (3 + r)", "Compounded half yearly: use half the rate and twice the number of terms", "Doubling time (compound) ≈ 72 ÷ rate in per cent  (rule of 72)"] },
      ex("Find the difference between compound and simple interest on 8000 rupees at 5% p.a. for 2 and for 3 years.", ["2 years: 8000 × (0.05)^{2} = 20", "3 years: 8000 × 0.0025 × 3.05 = 61"], "20 and 61 rupees"),
      ex("10,000 rupees is invested at 10% p.a. compounded half yearly for 1 year. Find the amount.", ["Rate per half year 5%, two terms", "10000 × 1.05 × 1.05 = 11025"], "11,025 rupees (yearly compounding gives only 11,000)"),
      ex("In about how many years will money double at 8% compound interest?", ["Rule of 72: 72 ÷ 8 = 9", "Check: (1.08)^{9} ≈ 2.0"], "about 9 years"),
      ex("A sum becomes 13,310 rupees in 3 years at 10% compound interest. Find the sum.", ["p × 1.331 = 13310"], "p = 10,000 rupees"),
      ex("5000 rupees becomes 6050 rupees in 2 years at compound interest. Find the rate.", ["(1 + r)^{2} = 6050 ÷ 5000 = 1.21", "1 + r = 1.1"], "10% p.a."),
      ex("A sum doubles in 5 years at compound interest. In how many years will it become 8 times?", ["8 = 2 × 2 × 2, three doublings", "3 × 5 = 15"], "15 years"),
    ],
  },
  {
    id: "k5", category: "Competition Corner", title: "Mixtures, Elections and Savings", heading: "Competition Corner: Hold the Constant Part",
    sub: "Find what does not change.",
    blocks: [
      { t: "key", title: "Strategy", s: "In mixture and drying problems, find the part that **does not change** (the dry matter, the milk, the salt) and use it to find the new total." },
      ex("Fresh grapes have 90% water. 100 kg of fresh grapes are dried until they have 80% water. Find the weight of the dried grapes.", ["Dry part = 10% of 100 = 10 kg; it does not change", "In the dried grapes the dry part is 20%", "20% of new weight = 10 kg"], "50 kg"),
      ex("A can has 40 L of a mixture with 10% water. How much water must be added to make water 20%?", ["Milk = 36 L; it does not change", "36 L must be 80% of the new total, 45 L", "Water added = 45 − 40 = 5 L"], "5 L"),
      ex("60 g of salt solution has 5% salt. How much water must evaporate to make it 8% salt?", ["Salt = 3 g", "3 g is 8% of the new mass: 37.5 g", "Water evaporated = 60 − 37.5 = 22.5 g"], "22.5 g"),
      ex("In an election between two people the winner got 55% of the votes and won by 1200 votes. Find the total votes (all valid).", ["Difference = 55% − 45% = 10% of the total", "10% of total = 1200"], "12,000 votes"),
      ex("80% of voters voted. 5% of those votes were invalid. The winner got 60% of the valid votes, which was 4560. How many voters were on the list?", ["Valid votes = 4560 ÷ 0.6 = 7600", "Votes cast = 7600 ÷ 0.95 = 8000", "Voters = 8000 ÷ 0.8 = 10000"], "10,000 voters"),
      ex("A person spends 75% of his income. His income rises 20% and his spending rises 10%. By what percentage do his savings rise?", ["Income 100: spend 75, save 25", "Now: income 120, spend 82.5, save 37.5", "Rise = [12.5|25] × 100"], "50%"),
    ],
  },
  {
    id: "k6", category: "Competition Corner", title: "Reverse Percentages, Areas and Volumes", heading: "Competition Corner: Going Backwards and Growing Shapes",
    sub: "Original values, and what happens to areas and volumes.",
    blocks: [
      { t: "ul", items: [
        "**Reverse:** original = final ÷ (product of the multipliers).", "If every **length** of a shape rises by r%, its **area** is multiplied by (1 + [r|100])^{2} and a solid's **volume** by (1 + [r|100])^{3}.",
      ] },
      ex("A bike loses 20% of its value each year and is worth 32,000 rupees after 2 years. Find the original price.", ["32000 ÷ (0.8 × 0.8) = 32000 ÷ 0.64"], "50,000 rupees"),
      ex("A population rises 10%, then falls 10%, then rises 20%. Find the net change.", ["1.1 × 0.9 × 1.2 = 1.188"], "18.8% increase"),
      ex("The radius of a circle rises by 10%. By what percentage does the area rise?", ["Area multiplier = 1.1 × 1.1 = 1.21"], "21%"),
      ex("Each edge of a cube rises by 10%. By what percentage does the volume rise?", ["1.1^{3} = 1.331"], "33.1%"),
      ex("The length of a rectangle rises by 20% and the breadth falls by 20%. Find the change in area.", ["1.2 × 0.8 = 0.96"], "4% decrease"),
      ex("The length of a rectangle is increased by 10% and the area stays the same. By what exact percentage does the breadth fall?", ["New breadth = b ÷ 1.1 = [10|11] b", "Fall = [1|11] of b"], "9[1|11]%, about 9.09%"),
    ],
  },
  {
    id: "k7", category: "Competition Corner", title: "Practice: Challenge Questions", heading: "Competition Corner: Practise Like a Champion",
    sub: "Ten sharp questions with answers, and the common traps.",
    blocks: [
      { t: "qa", title: "Challenge yourself", items: [
        ["35% of students failed in Maths, 25% failed in English and 10% failed in both. What percentage passed in both?", "Failed in at least one = 35 + 25 − 10 = 50%. So **50%** passed in both."],
        ["A shopkeeper marks goods 25% above cost and gives 20% discount. Profit or loss?", "1.25 × 0.8 = 1: **no profit, no loss**."],
        ["30% of A equals 40% of B. Find A : B.", "30 A = 40 B, so **A : B = 4 : 3**."],
        ["A number is increased by 25%. By what percentage must it be decreased to return?", "[25|125] × 100 = **20%**."],
        ["Find 20% of 30% of 500.", "0.2 × 0.3 × 500 = **30**."],
        ["Two numbers are 20% and 50% more than a third number. The first is what percentage of the second?", "[1.2|1.5] × 100 = **80%**."],
        ["A sum doubles in 8 years at simple interest. Find the rate.", "Interest = principal in 8 years: [100|8] = **12.5%** p.a."],
        ["The price of an article marked 1000 rupees gets 10% discount and then 10% GST. Find the final price.", "1000 × 0.9 × 1.1 = **990 rupees**."],
        ["A is 40% of B and B is 25% of C. A is what percentage of C?", "0.4 × 0.25 = 0.1: **10%**."],
        ["A student needs 40% to pass, scores 90 marks and fails by 30 marks. Find the maximum marks.", "40% of maximum = 90 + 30 = 120, so maximum = **300**."],
      ] },
      { t: "table", head: ["Common trap", "The truth"], rows: [
        ["20% off and then 10% off is 30% off", "It is **28%** off"], ["Up 10% and down 10% brings the value back", "It ends **1% lower**"],
        ["A is 25% more than B, so B is 25% less than A", "B is **20%** less"], ["Profit % is found on the selling price", "In this chapter it is on the **cost price**"],
        ["A bigger percentage is a bigger amount", "Only if the **whole** is the same"],
      ] },
    ],
  },
];
