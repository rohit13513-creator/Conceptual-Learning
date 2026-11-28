import type { CompetencyQuestion } from "../types-custom";
import { u } from "./fd8Util";

// Class VIII Maths, Fractions in Disguise: 20 case studies of the CBSE pattern, easiest first. A paragraph is followed by three questions of
// 1, 1 and 2 marks, so each carries 4 marks. A slash means a fraction.

let k = 0;
type Part = { question: string; marks: number; answer: string; explanation?: string };
const q = (question: string, answer: string, marks: number, explanation?: string): Part => ({ question: u(question), marks, answer: u(answer), explanation: explanation ? u(explanation) : undefined });
const C = (caseTitle: string, caseDescription: string, subQuestions: [Part, Part, Part], diagram?: string): CompetencyQuestion => ({
  id: ++k, caseTitle: u(caseTitle), caseDescription: u(caseDescription), subQuestions, diagram,
});

export const FD8_COMPETENCY: CompetencyQuestion[] = [
  C("The paint mixture", "Surya mixes red and yellow paint to make a deep orange. Red paint makes up 3/4 of the mixture. He prepares 60 mL of the colour.",
    [q("What percentage of the colour is red?", "75%", 1), q("What percentage is yellow?", "25%", 1), q("How many mL of red and yellow paint are used?", "Red = 0.75 × 60 = 45 mL. Yellow = 60 − 45 = 15 mL.", 2)], "fd_bar34"),
  C("The marble bag", "Nandini has 25 marbles, of which 15 are white and the rest blue.",
    [q("What percentage of the marbles are white?", "15 ÷ 25 × 100 = 60%", 1), q("What percentage are blue?", "40%", 1), q("If she gets 5 more blue marbles, what percentage are white now?", "Total 30, white 15: 15 ÷ 30 × 100 = 50%.", 2)]),
  C("The walking students", "In a school 15 of the 80 students of a class come to school by walking, 25 come by bus and the rest by cycle or car.",
    [q("What percentage walk?", "18.75%", 1), q("How many come by cycle or car?", "80 − 15 − 25 = 40", 1), q("What percentage come by bus, and what percentage come by cycle or car?", "Bus 25 ÷ 80 × 100 = 31.25%. Cycle or car 40 ÷ 80 × 100 = 50%.", 2)]),
  C("The kanji pot", "To prepare millet kanji, millet and water are mixed in the ratio 2 : 7.",
    [q("What fraction of the mixture is millet?", "2/9", 1), q("About what percentage of the mixture is water?", "7/9 × 100 ≈ 77.78%", 1), q("Find the amount of millet and water in 900 mL of the mixture.", "Millet = 2/9 × 900 = 200 mL. Water = 700 mL.", 2)]),
  C("The sales target", "Kishanlal's target is ₹5000 a day. He sold ₹3500 on Monday, ₹5000 on Tuesday and ₹7800 on Wednesday.",
    [q("What percentage of the target was Monday's sale?", "70%", 1), q("On which day was exactly 100% achieved?", "Tuesday", 1), q("Find the percentage for Wednesday and say by what per cent it exceeded the target.", "7800 ÷ 5000 × 100 = 156%, which exceeds the target by 56%.", 2)], "fd_target"),
  C("The halwa recipe", "A halwa recipe has rava 40%, sugar 40% and ghee 20% by weight. Meena makes 2.5 kg of the mixture of ingredients.",
    [q("What percentage is ghee?", "20%", 1), q("How much sugar does she use?", "0.4 × 2.5 = 1 kg", 1), q("How much rava and ghee does she use?", "Rava 1 kg and ghee 0.2 × 2.5 = 0.5 kg.", 2)]),
  C("The report card", "Eesha scored 42 out of 50 in English, 70 out of 80 in Science and 33 out of 40 in Maths.",
    [q("What is her English percentage?", "84%", 1), q("What is her Science percentage?", "87.5%", 1), q("Find her Maths percentage and arrange the subjects from best to weakest.", "33 ÷ 40 × 100 = 82.5%. Science, English, Maths.", 2)]),
  C("The sweater journey", "A retailer buys a sweater at ₹300, marks it at ₹480 and, after bargaining, sells it at ₹430.",
    [q("What is the cost price of the retailer?", "₹300", 1), q("What is his profit?", "₹130", 1), q("Find the profit per cent and the discount on the marked price.", "Profit % = 130 ÷ 300 × 100 ≈ 43.33%. Discount = 480 − 430 = ₹50.", 2)], "fd_chain"),
  C("The clearance sale", "A shop offers either 20% off or a flat ₹50 off on purchases above ₹150.",
    [q("For a purchase of ₹180, how much is 20% off?", "₹36", 1), q("Which offer is better for ₹300?", "20% off (₹60)", 1), q("For what purchase amount are both offers equal? Show your working.", "20% of x = 50, so x = 50 × 100 ÷ 20 = ₹250.", 2)]),
  C("The electricity of the bill", "A shop bill shows 3 CFL bulbs at ₹150 each, with CGST 9% and SGST 9%.",
    [q("What is the sub total?", "₹450", 1), q("What is the total GST per cent?", "18%", 1), q("Find the amount of tax and the total to be paid.", "Tax = 18% of 450 = ₹81. Total = ₹531.", 2)]),
  C("The fixed deposit", "Meera puts ₹6000 in a fixed deposit at 10% per annum for 3 years.",
    [q("What is the interest of one year without compounding?", "₹600", 1), q("What is the total amount without compounding after 3 years?", "₹7800", 1), q("Find the amount after 3 years with compounding and how much more it is.", "6000 × 1.331 = ₹7986, which is ₹186 more.", 2)], "fd_growth"),
  C("The old television", "A family bought a TV for ₹21,000. Its value falls by 5% every year.",
    [q("By how much does its value fall in the first year?", "₹1050", 1), q("What is its value after one year?", "₹19,950", 1), q("What is its value after two years?", "19950 × 0.95 = ₹18,952.50", 2)]),
  C("The shrinking village", "A village of 1250 people decreases by about 10% every decade.",
    [q("By what number do we multiply for each decade?", "0.9", 1), q("What is the population after one decade?", "1125", 1), q("Estimate the population after three decades.", "1250 × 0.9 × 0.9 × 0.9 = 911.25, about 910.", 2)], "fd_decline"),
  C("The two banks", "Bank P pays 10% p.a. and Bank Q pays 5% p.a. A person invests ₹20,000 with compounding: in P for 2 years and in Q for 4 years.",
    [q("Find the amount in Bank P.", "20000 × 1.21 = ₹24,200", 1), q("Write the expression for the amount in Bank Q.", "20000 × (1.05)^4", 1), q("Find the amount in Bank Q (to two decimals) and say which gives more.", "20000 × 1.21550625 ≈ ₹24,310.13, so Bank Q gives more.", 2)]),
  C("The shopkeeper's offer", "A bakery offers '30% + 20%' off on cakes. Another bakery offers a flat 50% off. A cake costs ₹200 at both.",
    [q("Price at the second bakery?", "₹100", 1), q("Price at the first bakery after the first discount?", "₹140", 1), q("Find the final price at the first bakery and the single discount it equals.", "140 × 0.8 = ₹112; it equals a 44% discount.", 2)]),
  C("The profit mishap", "Surbhi bought cookware and added a 50% profit margin. To clear stock she gave a 50% discount and got ₹12,000.",
    [q("If the cost is x, what is the selling price after the discount?", "0.75x", 1), q("Is it a profit or a loss?", "A loss of 25%", 1), q("Find the cost of the goods and the loss in rupees.", "0.75x = 12000, so x = ₹16,000. Loss = ₹4000.", 2)]),
  C("The election", "In an election 1600 people voted. The winner got 500 votes. Several candidates stood.",
    [q("What percentage of the votes did the winner get?", "31.25%", 1), q("How many votes did the other candidates get together?", "1100", 1), q("What is the least number of candidates? Explain.", "At least 4: each other candidate gets fewer than 500, so two others get at most 998, less than 1100.", 2)]),
  C("The dried grapes", "A farmer has 100 kg of fresh grapes with 90% water. He dries them into raisins with 80% water.",
    [q("What is the dry part in the fresh grapes?", "10 kg", 1), q("What percentage of the dried grapes is the dry part?", "20%", 1), q("Find the weight of the dried grapes and the water removed.", "10 × 100 ÷ 20 = 50 kg, so 50 kg of water is removed.", 2)]),
  C("The price of petrol", "The price of petrol rose from ₹80 to ₹100 per litre. A family used to buy 40 litres a month.",
    [q("What is the percentage rise in price?", "25%", 1), q("What did the family spend earlier in a month?", "40 × 80 = ₹3200", 1), q("If they keep the spending the same, how many litres can they buy now, and what percentage less is that?", "3200 ÷ 100 = 32 litres, which is 8 ÷ 40 × 100 = 20% less.", 2)]),
  C("The rectangle garden", "A rectangular garden is 20 m long and 10 m wide. The owner increases the length by 10% and wants the area to remain the same.",
    [q("What is the area of the garden?", "200 m^2", 1), q("What is the new length?", "22 m", 1), q("Find the new width and the percentage decrease in width.", "Width = 200 ÷ 22 = 100/11 ≈ 9.09 m. Decrease = (10 − 100/11) ÷ 10 × 100 = 100/11 ≈ 9.09%.", 2)]),
];
