import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./fd8Util";

// Class VIII Maths, Fractions in Disguise: 20 assertion-reason questions for the separate Assertion section (different from the 25 inside the
// multiple-choice list), easiest first. A = both true and R explains A, B = both true but R does not explain A, C = A true and R false,
// D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const FD8_ASSERTIONS: AssertionReasonQuestion[] = [
  q("3/5 is the same as 60%.", "A fraction is changed into a percentage by multiplying it by 100.", "A", "3 ÷ 5 × 100 = 60, so R explains A."),
  q("50% of a quantity is half of it.", "25% of a quantity is a quarter of it.", "B", "Both are true, but the second statement does not explain the first. 50% means 50 out of 100, one half."),
  q("0.4 is equal to 4%.", "A decimal is changed into a percentage by multiplying it by 100.", "D", "A is false: 0.4 × 100 = 40, so 0.4 = 40%. R is true."),
  q("15% of 80 is 12.", "15% is the sum of 10% and 5%.", "A", "10% of 80 = 8 and 5% of 80 = 4, together 12."),
  q("200% of a number is twice the number.", "A percentage cannot be more than 100.", "C", "A is true. R is false: percentages above 100 mean more than the whole."),
  q("40% of 60 is greater than 60% of 30.", "40% of 60 is 24 and 60% of 30 is 18.", "A", "24 is greater than 18."),
  q("The price after a 30% discount on ₹500 is ₹350.", "Profit and loss are calculated on the cost price.", "B", "30% of 500 = 150 and 500 − 150 = 350. Both are true, but R is about profit and does not explain A."),
  q("Profit per cent and loss per cent in this chapter are found on the cost price.", "Selling price is always greater than cost price.", "C", "A is true. R is false: a loss means the selling price is less than the cost price."),
  q("GST increases the amount a customer pays.", "On many bills GST is split into CGST and SGST.", "B", "Both are true. The splitting into CGST and SGST does not explain why the amount goes up; it goes up because the tax is added to the price."),
  q("In compounding, the principal grows every year.", "In compounding the interest is added back to the principal.", "A", "R explains A."),
  q("₹6000 at 10% p.a. for 3 years without compounding gives ₹7986.", "The interest each year is ₹600 without compounding.", "D", "A is false: without compounding the total is 7800. R is true."),
  q("A value that depreciates by 5% a year is multiplied by 0.95 each year.", "100 − 5 = 95 per cent remains after each year.", "A", "R explains A."),
  q("x% of y is equal to y% of x.", "Multiplication can be done in any order.", "A", "Both equal x y ÷ 100, because x × y = y × x."),
  q("A 20% increase followed by a 20% decrease gives back the original value.", "The same percentage is used both times.", "D", "A is false: 1.2 × 0.8 = 0.96. R is true."),
  q("Two successive discounts of 10% each are equal to a 20% discount.", "The second discount is on the reduced price.", "D", "A is false: 0.9 × 0.9 = 0.81, a 19% discount. R is true."),
  q("The compound interest for 2 years exceeds the simple interest by the principal times the square of the rate.", "For 2 years compound interest includes interest on the first year's interest.", "A", "The extra is p r × r = p r^2, the interest on the first year's interest."),
  q("If a price rises by 25%, buying 20% less keeps the spending the same.", "1.25 × 0.8 = 1.", "A", "R explains A."),
  q("A shopkeeper who marks goods 50% above cost and gives 40% discount makes a loss.", "A discount smaller than the mark-up always gives a loss.", "C", "A is true: 1.5 × 0.6 = 0.9, a loss of 10%. R is false: 50% above and 20% off gives 1.5 × 0.8 = 1.2, a profit."),
  q("In an FD, the amount with compounding after 3 years at 10% p.a. is 1.331 times the principal.", "Without compounding, the interest of every year is the same.", "B", "Both are true (1.1 × 1.1 × 1.1 = 1.331), but R is about interest without compounding and does not explain A."),
  q("The population of a city rising 3% a year follows exponential growth.", "Each year 3% of the new, larger population is added.", "A", "R explains A."),
];
