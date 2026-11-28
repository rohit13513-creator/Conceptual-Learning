import type { ShortQuestion } from "../types-custom";
import { u } from "./fd8Util";

// Class VIII Maths, Fractions in Disguise: 40 two-mark questions and 20 three-mark questions, in order of difficulty (easiest first).
// A two-mark answer has two steps of one mark each; a three-mark answer has three steps (1 + 1 + 1), as in CBSE marking. A slash means a fraction.

let a = 0;
const v = (question: string, answer: string, keyPoints: string[], diagram?: string): ShortQuestion => ({ id: ++a, question: u(question), answer: u(answer), keyPoints: keyPoints.map(u), diagram });
let b = 0;
const s = (question: string, answer: string, keyPoints: string[], diagram?: string): ShortQuestion => ({ id: ++b, question: u(question), answer: u(answer), keyPoints: keyPoints.map(u), diagram });

export const FD8_VERY_SHORT: ShortQuestion[] = [
  // ── level 1 ──
  v("Express 3/5 and 7/20 as percentages.", "3 ÷ 5 × 100 = 60, so 60%. 7 ÷ 20 × 100 = 35, so 35%.", ["3/5 = 60%", "7/20 = 35%"], "fd_bar34"),
  v("Express 36% as a fraction in lowest terms and as a decimal.", "36% = 36/100 = 9/25. As a decimal 36 ÷ 100 = 0.36.", ["Fraction 9/25", "Decimal 0.36"], "fd_fdp"),
  v("Write 0.6 and 1.25 as percentages.", "0.6 × 100 = 60, so 60%. 1.25 × 100 = 125, so 125%.", ["0.6 = 60%", "1.25 = 125%"]),
  v("Find 25% of 160 and 10% of 350.", "25 ÷ 100 × 160 = 40. 10 ÷ 100 × 350 = 35.", ["25% of 160 = 40", "10% of 350 = 35"]),
  v("In a school, 15 of 80 students walk to school. What percentage walk?", "Percentage = 15 ÷ 80 × 100 = 18.75, so 18.75% of the students walk.", ["Setting up 15 ÷ 80 × 100", "18.75%"]),
  v("Which is greater: 30% or 1/3? Give a reason.", "1/3 ≈ 33.33%, which is greater than 30%. So 1/3 is greater.", ["1/3 ≈ 33.33%", "1/3 is greater"]),
  v("Fill in the blank: 40 is 80% of ____.", "80% of the number is 40, so the number is 40 × 100 ÷ 80 = 50.", ["Equation 80% of x = 40", "x = 50"]),
  v("Calculate mentally 15% of 200, explaining your method.", "15% = 10% + 5%. 10% of 200 = 20 and 5% of 200 = 10, so 15% of 200 = 30.", ["Splitting 15% into 10% + 5%", "30"]),
  v("Express the ratio 3 : 2 of boys to girls as the percentage of girls in the class.", "Total parts = 3 + 2 = 5. Girls = 2 ÷ 5 × 100 = 40%.", ["Total parts 5", "Girls 40%"]),
  v("Kishanlal sold goods worth ₹6000 against a target of ₹5000. What percentage of the target did he achieve? By what per cent did he exceed it?", "Achieved = 6000 ÷ 5000 × 100 = 120%. He exceeded the target by 20%.", ["120% of the target", "Exceeded by 20%"], "fd_target"),
  v("Rava 40%, sugar 40% and ghee 20% make halwa. How much of each is in 2 kg?", "Rava 0.4 × 2 = 0.8 kg and sugar 0.8 kg. Ghee 0.2 × 2 = 0.4 kg.", ["Rava and sugar 800 g each", "Ghee 400 g"]),
  v("The price of a book increases from ₹80 to ₹92. Find the percentage increase.", "Increase = 12. Percentage increase = 12 ÷ 80 × 100 = 15%.", ["Increase ₹12", "15%"], "fd_change"),
  v("The number of visitors fell from 160 to 100. Find the percentage decrease.", "Decrease = 60. Percentage decrease = 60 ÷ 160 × 100 = 37.5%.", ["Decrease 60", "37.5%"]),
  v("A pen is bought for ₹20 and sold for ₹25. Find the profit and the profit per cent.", "Profit = 25 − 20 = 5. Profit % = 5 ÷ 20 × 100 = 25%.", ["Profit ₹5", "25%"]),
  // ── level 2 ──
  v("A shop offers 25% discount on a shirt marked ₹300. How much does the customer pay?", "Discount = 25% of 300 = 75. Price = 300 − 75 = ₹225.", ["Discount ₹75", "Price ₹225"]),
  v("A carpenter's material for a chair costs ₹475. At what price should the chair be sold for 50% profit?", "Selling price = 475 × 150 ÷ 100 = ₹712.50.", ["SP = CP × 150%", "₹712.50"]),
  v("A vase bought for ₹2650 is sold at 18% loss. Find the selling price.", "Selling price = 82% of 2650 = 0.82 × 2650 = ₹2173.", ["82% of CP", "₹2173"], "fd_profit"),
  v("A crayon box is sold for ₹50 at a profit of 25%. Find the cost price.", "125% of CP = 50, so CP = 50 × 100 ÷ 125 = ₹40.", ["125% of CP = 50", "CP = ₹40"]),
  v("A phone costs ₹8250. GST of 18% is added. Find the final price.", "Price = 8250 + 18% of 8250 = 8250 × 1.18 = ₹9735.", ["Multiplier 1.18", "₹9735"]),
  v("Zubin's test is out of 75. An A grade needs 80%. What is the least score for an A?", "80% of 75 = 0.8 × 75 = 60. He needs at least 60 marks.", ["0.8 × 75", "60 marks"]),
  v("Eesha scored 42 out of 50 and 70 out of 80. Which score is better?", "42 ÷ 50 × 100 = 84% and 70 ÷ 80 × 100 = 87.5%. The second score is better.", ["84% and 87.5%", "Second is better"]),
  v("A cyclist covered 40% of a journey, which is 92 km. Find the total length of the journey.", "40% of d = 92, so d = 92 × 100 ÷ 40 = 230 km.", ["40% of d = 92", "230 km"], "fd_trip"),
  v("A number increased by 20% becomes 90. Find the number.", "120% of x = 90, so x = 90 × 100 ÷ 120 = 75.", ["Equation 120% of x = 90", "x = 75"]),
  v("A village of 1250 people decreases by 10% in a decade. Find its population after one decade and after two decades.", "After one decade 1250 × 0.9 = 1125. After two decades 1125 × 0.9 = 1012.5, about 1013.", ["1125", "About 1013"], "fd_decline"),
  v("Find the simple interest and the amount on ₹6000 at 10% p.a. for 3 years without compounding.", "Interest = 6000 × 0.1 × 3 = ₹1800. Amount = 6000 + 1800 = ₹7800.", ["Interest ₹1800", "Amount ₹7800"], "fd_growth"),
  v("Find the amount on ₹6000 at 10% p.a. compounded yearly for 2 years.", "Amount = 6000 × (1.1)^2 = 6000 × 1.21 = ₹7260.", ["Formula p (1 + r)^2", "₹7260"]),
  v("A scooter worth ₹80,000 depreciates by 10% a year. Find its value after 2 years.", "Value = 80000 × (0.9)^2 = 80000 × 0.81 = ₹64,800.", ["Multiplier 0.9 twice", "₹64,800"]),
  v("Why is x% of y equal to y% of x? Verify with 8% of 50.", "Both equal x × y ÷ 100. 8% of 50 = 4 and 50% of 8 = 4.", ["Reason: x y ÷ 100", "Both equal 4"]),
  // ── level 3 ──
  v("The price of an article is increased by 10% and then decreased by 10%. Find the net percentage change.", "Take 100: after the increase 110, after the decrease 110 × 0.9 = 99. Net fall = 1%.", ["100 → 110 → 99", "1% fall"], "fd_updown"),
  v("Find the single discount equal to successive discounts of 20% and 10%.", "Price paid = 0.8 × 0.9 = 0.72 of the marked price. Single discount = 28%.", ["Multiplier 0.72", "28%"], "fd_successive"),
  v("Ravi's salary is 25% more than Mohan's. By what percentage is Mohan's salary less than Ravi's?", "Mohan 100 and Ravi 125. Less = 25 ÷ 125 × 100 = 20%.", ["Base is Ravi's salary", "20%"]),
  v("The price of sugar rises by 25%. By what percentage must a family cut its use to keep the spending the same?", "New use = 100 ÷ 125 = 0.8 of the old. Cut = 20%.", ["Use becomes 0.8", "20%"]),
  v("A shopkeeper marks goods 40% above cost and allows 25% discount. Find the profit per cent.", "SP = 1.4 × 0.75 = 1.05 of the cost price. Profit = 5%.", ["SP = 105% of CP", "5% profit"]),
  v("Bus fares rose 3% last year and 4% this year. Find the overall percentage rise.", "Multiplier = 1.03 × 1.04 = 1.0712. Overall rise = 7.12%.", ["1.0712", "7.12%"]),
  v("Find the compound interest on ₹10,000 at 8% p.a. for 2 years.", "Amount = 10000 × 1.08 × 1.08 = 11664. Interest = 11664 − 10000 = ₹1664.", ["Amount ₹11,664", "Interest ₹1664"]),
  v("After a 15% discount Samson paid ₹4,40,000 for a car. Find the original price (to the nearest rupee).", "85% of P = 440000, so P = 440000 × 100 ÷ 85 ≈ ₹5,17,647.", ["85% of P = 440000", "About ₹5,17,647"]),
  v("A rectangle's length increases by 10% while its area stays the same. By what exact percentage does its breadth decrease?", "New breadth = b ÷ 1.1 = 10b ÷ 11. Decrease = 1/11 of b = 9 1/11%.", ["New breadth 10/11 of b", "Decrease 9 1/11%"]),
  v("Two items are each sold for ₹990, one at 10% profit and one at 10% loss. Find the total cost price and the loss.", "CPs are 900 and 1100, total ₹2000. Total SP ₹1980, so the loss is ₹20.", ["Total CP ₹2000", "Loss ₹20"]),
  v("Selling a bat at 10% profit gives ₹60 more than selling it at 10% loss. Find the cost price.", "Difference of the two selling prices = 20% of CP = 60, so CP = ₹300.", ["20% of CP = 60", "₹300"]),
  v("In how many years will money double at 10% p.a. (i) without compounding and (ii) with compounding?", "(i) 100% interest needs 10 years. (ii) (1.1)^7 ≈ 1.95 and (1.1)^8 ≈ 2.14, so during the 8th year.", ["10 years", "During the 8th year"]),
];

export const FD8_SHORT: ShortQuestion[] = [
  // ── level 1 ──
  s("Express 9/34 and 13/45 as percentages and say which variety of biscuit with these sugar shares is more sugary.", "9 ÷ 34 × 100 ≈ 26.47%. 13 ÷ 45 × 100 ≈ 28.89%. The second variety (13/45) is more sugary.", ["26.47%: 1 mark", "28.89%: 1 mark", "Second variety is more sugary: 1 mark"]),
  s("Millet and water are mixed in the ratio 2 : 7. Find the percentage of millet and the amount of millet in 500 mL of the mixture.", "Total parts = 9. Millet = 2 ÷ 9 × 100 ≈ 22.22%. In 500 mL: 5 × 22.22 ≈ 111.1 mL.", ["Total parts 9: 1 mark", "22.22%: 1 mark", "About 111.1 mL: 1 mark"]),
  s("A class has 45% girls. There are 22 boys. Find the total number of students and the number of girls.", "Boys are 55%. Total = 22 × 100 ÷ 55 = 40. Girls = 40 − 22 = 18.", ["Boys 55%: 1 mark", "Total 40: 1 mark", "Girls 18: 1 mark"]),
  s("Out of 1600 votes the winner got 500. Find the winner's percentage, and show that at least 4 candidates must have stood.", "Winner = 500 ÷ 1600 × 100 = 31.25%. Others got 1100 votes, each less than 500. Two others could get at most 998, so at least 3 others, that is 4 candidates.", ["31.25%: 1 mark", "Others got 1100, each below 500: 1 mark", "Minimum 4 candidates: 1 mark"]),
  s("A cooker with MRP ₹1800 is sold at 35% discount. The shopkeeper paid ₹900 for it. Find the selling price, the profit and the profit per cent.", "SP = 1800 × 0.65 = ₹1170. Profit = 1170 − 900 = ₹270. Profit % = 270 ÷ 900 × 100 = 30%.", ["SP ₹1170: 1 mark", "Profit ₹270: 1 mark", "30%: 1 mark"]),
  s("Raghu bought rice at ₹35 per kg and sold 10 kg for ₹300. Find the loss and the loss per cent. Is the per cent the same for 1 kg?", "CP of 10 kg = ₹350, loss = ₹50. Loss % = 50 ÷ 350 × 100 ≈ 14.28%. For 1 kg: 5 ÷ 35 × 100 ≈ 14.28%, the same.", ["Loss ₹50: 1 mark", "14.28%: 1 mark", "Same for 1 kg with reason: 1 mark"]),
  s("A bill has 3 bulbs at ₹150 each, CGST 9% and SGST 9%. Find the sub total, the tax and the total.", "Sub total = ₹450. CGST = SGST = 9% of 450 = ₹40.50 each. Total = 450 + 40.50 + 40.50 = ₹531.", ["Sub total ₹450: 1 mark", "Tax ₹40.50 + ₹40.50: 1 mark", "Total ₹531: 1 mark"]),
  // ── level 2 ──
  s("A food label shows sugar 99 g, milk solids 30 g, badam powder 12 g and food chemicals 9 g in a 150 g pack. Find the percentage of each and check that they add up to 100%.", "Sugar 99 ÷ 150 × 100 = 66%. Milk 20%, badam 8%, chemicals 6%. Total 66 + 20 + 8 + 6 = 100%.", ["66% and 20%: 1 mark", "8% and 6%: 1 mark", "Total 100%: 1 mark"]),
  s("A shop's monthly sales are ₹1,50,000, the goods cost ₹1,00,000 and the expenses are ₹5000. Find the gross profit, net profit and net profit per cent on revenue.", "Gross profit = ₹50,000. Net profit = 50000 − 5000 = ₹45,000. Net profit % = 45000 ÷ 150000 × 100 = 30%.", ["Gross profit ₹50,000: 1 mark", "Net profit ₹45,000: 1 mark", "30%: 1 mark"]),
  s("A bank offers 10% p.a. on ₹20,000 for 2 years. Compare the amounts with and without compounding.", "Without: 20000 + 20000 × 0.1 × 2 = ₹24,000. With: 20000 × 1.1 × 1.1 = ₹24,200. Compounding gives ₹200 more.", ["Without ₹24,000: 1 mark", "With ₹24,200: 1 mark", "₹200 more: 1 mark"]),
  s("A city's population of 1.5 crore grows at 3% a year. Estimate it after 3 years.", "Population = 1.5 × (1.03)^3 crore. (1.03)^3 = 1.092727. Population ≈ 1.64 crore.", ["Formula p (1 + r)^3: 1 mark", "1.092727: 1 mark", "About 1.64 crore: 1 mark"]),
  s("Shyam takes a loan of ₹12,500 at 12% p.a. for 3 years without compounding. Find the interest and the amount, and the interest if the loan were at 10% p.a. compounded yearly.", "Interest = 12500 × 0.12 × 3 = ₹4500, amount = ₹17,000. Compound at 10%: 12500 × 1.331 = 16637.50, interest ₹4137.50.", ["Interest ₹4500: 1 mark", "Amount ₹17,000: 1 mark", "Compound interest ₹4137.50: 1 mark"]),
  s("Shops A, B and C sell an item at ₹100 each: A offers buy 1 get 1 free, B buy 2 get 1 free, C buy 3 get 1 free. Find the effective price per item and the best shop.", "A: 100 ÷ 2 = ₹50. B: 200 ÷ 3 ≈ ₹66.67. C: 300 ÷ 4 = ₹75. Shop A is the cheapest.", ["A ₹50: 1 mark", "B and C: ₹66.67 and ₹75: 1 mark", "Shop A cheapest: 1 mark"]),
  // ── level 3 ──
  s("Surbhi keeps 50% profit margin on goods and then gives a 50% discount. If she sells the goods for ₹12,000, find her loss and loss per cent.", "CP = x, marked price = 1.5x, SP = 0.75x = 12000, so x = 16000. Loss = ₹4000 = 25%.", ["SP = 0.75 x: 1 mark", "x = ₹16,000: 1 mark", "Loss ₹4000, 25%: 1 mark"]),
  s("A milkman sold two buffaloes at ₹80,000 each, one at 5% profit and the other at 10% loss. Find the total cost and his overall loss.", "CPs: 80000 × 100 ÷ 105 ≈ 76190.48 and 80000 × 100 ÷ 90 ≈ 88888.89. Total ≈ 165079.37. Loss ≈ 165079.37 − 160000 = ₹5079.37.", ["Two cost prices: 1 mark", "Total cost ≈ ₹1,65,079.37: 1 mark", "Loss ≈ ₹5079.37: 1 mark"]),
  s("Fresh grapes with 90% water weigh 100 kg. They are dried until the water is 80%. Find the final weight.", "Dry part = 10% of 100 = 10 kg and does not change. In the dried grapes the dry part is 20%. Weight = 10 × 100 ÷ 20 = 50 kg.", ["Dry part 10 kg: 1 mark", "Dry part is 20% of new weight: 1 mark", "50 kg: 1 mark"]),
  s("A room has 100 people, 99% left-handed. How many left-handed people must leave so that 98% are left-handed?", "Only 1 right-handed person, who stays. This person is 2% of the new room, so the room has 50 people. Left-handed = 49, so 99 − 49 = 50 must leave.", ["Right-handed person = 2% of the new total: 1 mark", "New total 50: 1 mark", "50 people leave: 1 mark"]),
  s("A sum of money at compound interest amounts to ₹6050 in 2 years and ₹6655 in 3 years. Find the rate and the sum.", "Rate = (6655 − 6050) ÷ 6050 × 100 = 10%. Sum = 6050 ÷ 1.21 = ₹5000. Check: 5000 × 1.331 = 6655.", ["Interest of the third year ₹605: 1 mark", "Rate 10%: 1 mark", "Sum ₹5000: 1 mark"]),
  s("The difference between compound and simple interest on a sum at 10% p.a. for 2 years is ₹80. Find the sum.", "Difference = p r^2 = p × 0.01 = 80. So p = 80 ÷ 0.01 = ₹8000. Check: CI 1680, SI 1600.", ["Using p r^2: 1 mark", "p × 0.01 = 80: 1 mark", "p = ₹8000: 1 mark"]),
  s("The price of petrol rises by 25% but a family increases its spending on petrol by only 10%. Find the percentage change in the amount of petrol used.", "Use = spending ÷ price. New use = 1.1 ÷ 1.25 = 0.88 of the old. The family uses 12% less.", ["Use = spending ÷ price: 1 mark", "0.88: 1 mark", "12% decrease: 1 mark"]),
];
