import type { QuizQuestion } from "../types-custom";

// Helpers for the Class X Physics "Magnetic Effects of Electric Current" question bank.
// u() turns powers and indices into proper symbols: 10^-8 becomes 10⁻⁸, I^2 becomes I², R1 becomes R₁ and V2 becomes V₂,
// so the plain-text screens show them properly. Do not write a slash inside question text: the screens show it as a stacked fraction (use ÷ or "per").

const SUB = "₀₁₂₃₄₅₆₇₈₉";
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻", "+": "⁺" };
export const u = (s: string): string =>
  s.replace(/\^\{?([+-]?\d+)\}?/g, (_m, d: string) => [...d].map((x) => SUP[x] ?? x).join(""))
    .replace(/_s\b/g, "ₛ").replace(/_p\b/g, "ₚ")
    .replace(/([A-Za-zμ\)])(\d+)/g, (_m, a: string, d: string) => a + d.replace(/\d/g, (x) => SUB[Number(x)]));

let n = 0;
/** a multiple-choice question: the right answer first, then three wrong ones; its position is varied automatically */
export const mc = (question: string, correct: string, wrong: [string, string, string], explanation: string, diagram?: string): QuizQuestion => {
  n++;
  const pos = (n * 3 + 1) % 4;
  const options = [...wrong];
  options.splice(pos, 0, correct);
  return { id: n, question: u(question), options: options.map(u), correctAnswer: pos, explanation: u(explanation), diagram };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
/** assertion-reason question inside a multiple-choice list; `right` is the index of the correct option (0 to 3) */
export const ar = (assertion: string, reason: string, right: number, explanation: string): QuizQuestion => {
  n++;
  return { id: n, question: u(`Assertion (A): ${assertion}\nReason (R): ${reason}`), options: AR, correctAnswer: right, explanation: u(explanation) };
};
