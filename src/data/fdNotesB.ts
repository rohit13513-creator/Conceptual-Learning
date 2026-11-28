import type { CTopic } from "./carbonNotesTypes";
import { ex } from "./fdNotesA";

// Class VIII Maths, Fractions in Disguise. Topics 10 to 19: comparing proportions, percentage change, profit and loss, discount, taxes,
// interest with and without compounding, decline, tricky percentages and revision. Same writing rules as fdNotesA.ts.

export const FD_B: CTopic[] = [
  {
    id: "d10", category: "Comparing", title: "Comparing Proportions and Reading Labels", heading: "Fair Comparisons, and Know Your Contents",
    sub: "Marks out of 50 and out of 80 cannot be compared directly.",
    blocks: [
      { t: "p", s: "When the maximum marks are different, convert both scores into **percentages**. Likewise, to compare the ingredients on food labels, convert each weight into a **percentage of the total**. This is called **KYC: Know Your Contents**." },
      ex("Eesha scored 42 out of 50 in English and 70 out of 80 in Science. In which subject did she do better?", ["English: [42|50] × 100 = 84%", "Science: [70|80] × 100 = 87.5%"], "Science, though she lost more marks there"),
      ex("Team A won 18 of 24 matches and Team B won 26 of 40 matches. Which team has the better record?", ["Team A: [18|24] × 100 = 75%", "Team B: [26|40] × 100 = 65%"], "Team A"),
      { t: "h", s: "Two badam drink mixes" },
      { t: "table", head: ["Product", "Sugar", "Milk solids", "Badam powder", "Food chemicals", "Total"], rows: [
        ["DEF (150 g)", "99 g = 66%", "30 g = 20%", "12 g = 8%", "9 g = 6%", "100%"],
        ["Zacni (400 g)", "272 g = 68%", "64 g = 16%", "40 g = 10%", "24 g = 6%", "100%"],
      ] },
      { t: "ul", items: ["**Zacni** has the larger share of badam (10% against 8%).", "Both have the **same share of food chemicals** (6%).", "Sugar is about **two-thirds** of both: they could be called sugar drink mixes!", "The percentages of each product add up to **100%**."] },
      ex("A 65 g packet of chips has potato 70%, vegetable oil 24%, salt 3% and spices 3%. Find the weight of each.", ["Potato 0.70 × 65 = 45.5 g", "Oil 0.24 × 65 = 15.6 g", "Salt 0.03 × 65 = 1.95 g; spices 1.95 g", "Check: 45.5 + 15.6 + 1.95 + 1.95 = 65 g"], "45.5 g, 15.6 g, 1.95 g, 1.95 g"),
    ],
  },
  {
    id: "d11", category: "Increase and decrease", title: "Percentage Increase and Decrease", heading: "How Big Is a Change?",
    sub: "Always compare the change with the original value.",
    blocks: [
      { t: "eq", lines: ["Percentage increase = [amount of increase|original amount] × 100", "Percentage decrease = [amount of decrease|original amount] × 100"] },
      { t: "dia", id: "fd_change" },
      { t: "key", title: "Multiplier shortcut", s: "An increase of r% means the new value is (100 + r)% of the old: **multiply by 1 + [r|100]**. A decrease of r% means **multiply by 1 − [r|100]**. For example, +10% means × 1.1 and −10% means × 0.9." },
      ex("The price of 1 kg of tomatoes was 30 rupees three years ago and is 42 rupees now. Find the percentage increase.", ["Increase = 42 − 30 = 12", "Percentage increase = [12|30] × 100 = 40%"], "40%"),
      ex("The average number of visitors of a theatre was 160 before COVID and is 100 now. Find the percentage decrease.", ["Decrease = 160 − 100 = 60", "Percentage decrease = [60|160] × 100 = 37.5%"], "37.5%"),
      ex("Do these mean the same? (i) The population in 1991 is 165% of that in 1961. (ii) The population increased by 65% from 1961 to 1991.", ["Let the 1961 population be p and the 1991 population be q.", "(i) q = 165% of p = 1.65 p", "(ii) q = p + 0.65 p = 1.65 p"], "Yes, both mean q = 1.65 p"),
      ex("A number increased by 20% becomes 90. Find the number.", ["120% of the number is 90.", "Number = 90 × 100 ÷ 120 = 75"], "75"),
      ex("The price of 1 kg of rice rose from 38 rupees to 42 rupees in a year. Find the rate of inflation (percentage rise in price).", ["Rise = 4", "Inflation = [4|38] × 100 ≈ 10.53%"], "about 10.53%"),
    ],
  },
  {
    id: "d12", category: "Profit and loss", title: "Profit and Loss", heading: "Cost Price, Selling Price, Profit and Loss",
    sub: "The journey of a sweater.",
    blocks: [
      { t: "dia", id: "fd_chain" },
      { t: "table", head: ["Term", "Meaning"], rows: [
        ["Cost price (CP)", "The price at which an item is bought"], ["Marked price (MP)", "The price quoted by the shopkeeper (sometimes the MRP)"], ["Selling price (SP)", "The price the customer pays after any discount"],
      ] },
      { t: "eq", lines: ["Profit = SP − CP (when SP is more than CP)", "Loss = CP − SP (when CP is more than SP)", "Profit % = [profit|CP] × 100", "Loss % = [loss|CP] × 100", "SP = CP × [100 + profit %|100]    or    CP × [100 − loss %|100]"] },
      { t: "dia", id: "fd_profit" },
      ex("Kishanlal buys a sweater for 300 rupees, marks it 480 and sells it for 430 rupees. Find his profit percentage.", ["Profit = 430 − 300 = 130", "Profit % = [130|300] × 100 ≈ 43.33%"], "about 43.33%"),
      ex("Raghu bought rice at 35 rupees per kg and sold 10 kg for 300 rupees. Find the loss percentage.", ["CP of 10 kg = 350; SP = 300; loss = 50", "Loss % = [50|350] × 100 ≈ 14.28%", "Per kg: CP 35, SP 30, loss 5: [5|35] × 100 ≈ 14.28%, the same"], "about 14.28%"),
      ex("Shyamala bought a vase for 2650 rupees and sells a damaged one at 18% loss. How much does she get?", ["Method 1: loss = 18% of 2650 = 477, so SP = 2650 − 477 = 2173", "Method 2: SP = 82% of 2650 = 0.82 × 2650 = 2173"], "2173 rupees"),
      ex("Shambhavi buys notebooks at 36 rupees and sells with a 20% profit. She sells crayon boxes at 50 rupees with a 25% profit. Find the selling price of a notebook and the cost price of a crayon box.", ["Notebook SP = 36 × [120|100] = 43.20", "Crayon box: 50 = 125% of CP, so CP = 50 × [100|125] = 40"], "43.20 rupees; 40 rupees"),
      ex("Snehal sells strawberries at 80 rupees per kg at a 12% loss. Find the cost price.", ["80 = 88% of CP", "CP = 80 × 100 ÷ 88 ≈ 90.91"], "about 90.91 rupees per kg"),
    ],
  },
  {
    id: "d13", category: "Discount", title: "Discount and Marked Price", heading: "Discount: A Cut on the Marked Price",
    sub: "'30% off' means the price is reduced by 30% of the marked price.",
    blocks: [
      { t: "eq", lines: ["Discount = discount % of MP", "SP = MP − discount = MP × [100 − d|100]"] },
      { t: "key", title: "Reverse calculation", s: "If the price after a d% discount is S, then **MP = S × [100|100 − d]**. Do not add d% to the selling price." },
      ex("A cooker with MRP 1800 rupees is sold at 35% discount. Find the selling price. If the cost price was 900 rupees, find the profit percentage.", ["Discount = 35% of 1800 = 630; SP = 1800 − 630 = 1170", "Profit = 1170 − 900 = 270", "Profit % = [270|900] × 100 = 30%"], "1170 rupees; 30% profit"),
      ex("A shop gives 25% off on shirts marked 300 rupees. How much will Anwar pay?", ["He pays 75% of 300", "= 225"], "225 rupees"),
      ex("Samson paid 4,40,000 rupees for a car after a 15% discount. What was the original price?", ["85% of the original price = 440000", "Original price = 440000 × [100|85] ≈ 517647"], "about 5,17,647 rupees"),
    ],
  },
  {
    id: "d14", category: "Money matters", title: "Gross Profit, Net Profit and Taxes", heading: "Profit on Cost or on Sales, and GST",
    sub: "The same profit can give two different percentages.",
    blocks: [
      { t: "ul", items: [
        "**Gross profit** = money from sales − the buying cost of those goods. For example 80,000 − 48,000 = 32,000.",
        "**Net profit** = gross profit − other expenses (transport, salaries, electricity). For example 32,000 − 8,000 = 24,000.",
        "In this chapter, 'profit' means **gross profit** unless stated otherwise.",
        "**On cost price:** how much profit compared with what was invested? **On revenue:** how much profit on the total sales?",
      ] },
      ex("Manisha buys a bag of fertiliser at 500 rupees and sells it at 750 rupees. Find the profit percentage on cost and on revenue.", ["Profit = 250", "On cost: [250|500] × 100 = 50%", "On revenue: [250|750] × 100 ≈ 33.33%"], "50% on cost; 33.33% on revenue"),
      ex("In a month a shop had sales of 1,50,000 rupees; the goods cost 1,00,000 and expenses were 5,000. Find the gross profit, the net profit and the net profit percentage on revenue.", ["Gross profit = 150000 − 100000 = 50000", "Net profit = 50000 − 5000 = 45000", "Net profit % on revenue = [45000|150000] × 100 = 30%"], "50,000; 45,000; 30%"),
      { t: "h", s: "Taxes (GST)" },
      { t: "p", s: "**GST (Goods and Services Tax)** is a tax added on top of the price as a percentage. The customer pays it and the shop gives it to the government. On a bill, 18% GST often appears as **CGST 9% + SGST 9%**. Income tax rates are also given as percentages." },
      ex("A bill shows 3 CFL bulbs at 150 rupees each, CGST 9%, SGST 9% and a total of 531 rupees. Is the bill correct?", ["Sub total = 3 × 150 = 450", "CGST = 9% of 450 = 40.50; SGST = 40.50", "Total = 450 + 40.50 + 40.50 = 531"], "Yes, the bill is correct"),
      ex("A mobile phone costs 8250 rupees and GST of 18% is added. Find the final price.", ["Final price = 8250 + 18% of 8250", "= 8250 × 1.18 = 9735"], "9735 rupees"),
    ],
  },
  {
    id: "d15", category: "Interest", title: "Interest: Without and With Compounding", heading: "Growth of Money",
    sub: "Fixed deposits, principal and rate.",
    blocks: [
      { t: "ul", items: [
        "**Interest** is the extra money paid by a bank on money kept with it, or paid by a borrower on money borrowed.",
        "**Principal (p)** is the money first deposited or borrowed. **Rate (r)** is the interest per year as a percentage. **p.a.** (per annum) means every year.",
        "A **Fixed Deposit (FD)** locks money for a fixed time at a fixed rate; taking it early means a penalty.",
        "At 10% p.a. on 6000 rupees, one year's interest is 600 and the amount is 6600 = 6000 × 1.1 (110% of the principal).",
      ] },
      { t: "table", head: ["Without compounding (simple interest)", "With compounding (compound interest)"], rows: [
        ["Interest is paid out every year", "Interest is added back to the deposit"], ["Principal stays the same", "Principal grows every year"], ["Same interest each year", "Interest increases each year"], ["Amount = p (1 + rt)", "Amount = p (1 + r)^{t}"], ["Linear growth", "Exponential growth"],
      ] },
      { t: "dia", id: "fd_growth" },
      ex("6000 rupees is deposited at 10% p.a. for 3 years. Find the total received without and with compounding.", ["Without: interest per year 600; total = 6000 + 3 × 600 = 7800", "With: 6000 × 1.1 = 6600; 6600 × 1.1 = 7260; 7260 × 1.1 = 7986", "Compounding gives 7986 − 7800 = 186 more"], "7800 and 7986 rupees"),
      ex("What percentage of the deposit is received in each case?", ["Without: [7800|6000] × 100 = 130% (gain 30%)", "With: [7986|6000] × 100 = 133.1% (gain 33.1%)"], "130% and 133.1%"),
      ex("A bank offers 10% p.a. Compare the amounts on 20,000 rupees for 2 years with and without compounding.", ["Without: 20000 + 20000 × 0.1 × 2 = 24000", "With: 20000 × 1.1 × 1.1 = 24200"], "Compounding gives 200 rupees more"),
    ],
  },
  {
    id: "d16", category: "Interest", title: "Formulas for t Years and More Examples", heading: "The Amount after t Years",
    sub: "Writing the pattern as a formula.",
    blocks: [
      { t: "eq", lines: ["Without compounding: interest = p r t,  amount = p (1 + rt)", "With compounding: amount = p (1 + r)^{t},  interest = p (1 + r)^{t} − p", "Here r is the rate as a decimal: 10% means r = 0.1"] },
      ex("A bank offers 5% p.a. Compare the amounts on 20,000 rupees for 4 years with and without compounding.", ["Without: 20000 + 20000 × 0.05 × 4 = 24000", "With: 20000 × (1.05)^{4} = 20000 × 1.21550625 ≈ 24310.13"], "24,000 against about 24,310.13"),
      { t: "note", title: "Notice something interesting", s: "10% for 2 years and 5% for 4 years give the **same 24,000 without compounding** (10 × 2 = 5 × 4 = 20%). With compounding, the **lower rate for more years** gives **more** (24,310.13 against 24,200), because interest is added back more often." },
      ex("The post office offers 7% p.a. Find the interest on 50,000 rupees for 3 years without compounding, and how much more with compounding.", ["Without: 50000 × 0.07 × 3 = 10500", "With: 50000 × (1.07)^{3} = 50000 × 1.225043 = 61252.15, so interest 11252.15", "Difference = 11252.15 − 10500 = 752.15"], "10,500 rupees; 752.15 rupees more"),
      ex("Giridhar borrows 12,500 rupees at 12% p.a. for 3 years without compounding. Raghava borrows the same at 10% p.a. compounded yearly. Who pays more interest and by how much?", ["Giridhar: 12500 × 0.12 × 3 = 4500", "Raghava: 12500 × (1.1)^{3} − 12500 = 16637.50 − 12500 = 4137.50", "Difference = 4500 − 4137.50 = 362.50"], "Giridhar pays 362.50 rupees more"),
      ex("1000 rupees grows at 10% p.a. When does it double without and with compounding?", ["Without: 100 per year, so 10 years", "With: (1.1)^{7} ≈ 1.95 and (1.1)^{8} ≈ 2.14, so it doubles during the 8th year", "Without compounding the growth is linear; with compounding it is exponential"], "10 years; a little over 7 years"),
      ex("A city's population of 1.5 crore rises about 3% a year. Find it after 3 years. Bacteria rise 2.5% an hour from 5,06,000: find the number after 2 hours.", ["Population = 1.5 × (1.03)^{3} = 1.5 × 1.092727 ≈ 1.64 crore", "Bacteria = 506000 × (1.025)^{2} = 506000 × 1.050625 ≈ 531616"], "about 1.64 crore; about 5,31,616"),
    ],
  },
  {
    id: "d17", category: "Decline", title: "Decline and Depreciation", heading: "When a Value Falls",
    sub: "A bike, a TV, a village.",
    blocks: [
      { t: "p", s: "Many things **lose value** with time: a bike, a TV, a car. This fall in value due to use and age is called **depreciation**. It depends on the age, the use, any damage and the parts replaced. A fall of r% every term means **multiplying by 1 − [r|100]** every time." },
      { t: "eq", lines: ["Value after t terms = p (1 − r)^{t}"] },
      { t: "dia", id: "fd_decline" },
      ex("A TV bought for 21,000 rupees depreciates by 5% in a year. Find its value after one year.", ["Method 1: reduction = 0.05 × 21000 = 1050, value = 21000 − 1050 = 19950", "Method 2: value = 0.95 × 21000 = 19950"], "19,950 rupees"),
      ex("A village of 1250 people decreases by about 10% every decade. Find the expected population after 3 decades.", ["Each decade it becomes 0.9 times.", "1250 × 0.9 × 0.9 × 0.9 = 911.25", "Decade by decade, with whole people: 1250, 1125, 1013, 912"], "about 910"),
      ex("A scooter worth 80,000 rupees depreciates by 10% every year. Find its value after 2 years.", ["80000 × 0.9 × 0.9", "= 64800"], "64,800 rupees"),
    ],
  },
  {
    id: "d18", category: "Tricky percentages", title: "Tricky Percentages", heading: "Do Not Be Tricked",
    sub: "Would you rather? A mishap, and a surprising rule.",
    blocks: [
      { t: "ul", items: [
        "A **bigger percentage is not always a bigger amount**: 200% of 100 (200) is less than 50% of 1000 (500).",
        "Two percentages applied one after the other **cannot be simply added**: the second works on the new value.",
      ] },
      { t: "dia", id: "fd_updown" },
      ex("Option A: deposit 100 and get back 300. Option B: deposit 1000 and get back 1500. Find the percentage gain of each. Which is better?", ["A: gain 200, which is 200%", "B: gain 500, which is 50%", "A has the higher percentage, but B gives more money"], "A for the best rate, B for the most money"),
      ex("A store offers 20% off or 50 rupees off on purchases above 150 rupees. Which is better for 180, 225 and 300 rupees?", ["20% of 180 = 36, less than 50", "20% of 225 = 45, less than 50", "20% of 300 = 60, more than 50", "Both are equal at 250"], "50 off for 180 and 225; 20% off for 300"),
      ex("Cakely offers '30% + 20%' off and Cakify offers 50% off on a 200 rupee cake. Which is cheaper?", ["Cakely: 200 − 60 = 140, then 140 − 28 = 112", "Cakify: 200 − 100 = 100", "30% + 20% in shopping means one discount after another, 44% in all"], "Cakify"),
      ex("Surbhi keeps a 50% profit margin, then offers 50% discount. (i) Loss or not? (ii) She got 12,000 rupees after discount: find the loss. (iii) What discount means no profit and no loss?", ["Let CP = x. Price with margin = 1.5 x; after 50% off, SP = 0.75 x", "(i) SP is 75% of CP: a 25% loss", "(ii) 0.75 x = 12000, so x = 16000; loss = 4000", "(iii) 1.5 x − d × 1.5 x = x gives d = [1|3]"], "25% loss; 4000 rupees; 33.33% discount"),
      { t: "key", title: "A surprising rule", s: "**x% of y = y% of x**, because both equal [x y|100]. So 8% of 50 = 50% of 8 = 4. Use the easier one!" },
      ex("A room has 100 people, 99% of them left-handed. How many left-handed people must leave so that 98% are left-handed?", ["One person is right-handed and stays.", "At 98% left-handed, that 1 person is 2% of the room, so the room has 50 people.", "Left-handed then are 49, so 99 − 49 = 50 must leave"], "50 people"),
    ],
  },
  {
    id: "d19", category: "Revision", title: "Revision: Mind Map and Formulas", heading: "Revision: The Whole Chapter",
    sub: "The mind map, the formula sheet and the points to remember.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "Formula sheet" },
      { t: "table", head: ["Quantity", "Formula"], rows: [
        ["x%", "[x|100]"], ["Fraction to percentage", "fraction × 100"], ["y% of z", "[y|100] × z"], ["Percentage increase or decrease", "[change|original] × 100"], ["Profit % or loss %", "[profit or loss|CP] × 100"],
        ["SP with profit r%", "CP × [100 + r|100]"], ["SP with loss r%", "CP × [100 − r|100]"], ["SP after discount d%", "MP × [100 − d|100]"], ["Amount without compounding", "p (1 + rt)"], ["Amount with compounding", "p (1 + r)^{t}"], ["Value after depreciation", "p (1 − r)^{t}"],
      ] },
      { t: "h", s: "Points to remember" },
      { t: "ul", items: [
        "Percentages are fractions with denominator **100**.", "A percentage is always a percentage **of something**.", "Parts of a ratio become percentages through the fraction of the **total**.",
        "Increase, decrease, profit and loss are compared with the **original** value (cost price).", "Successive changes **multiply**; they do not simply add.", "Draw a **rough bar diagram** and **estimate** first.",
      ] },
    ],
  },
];
