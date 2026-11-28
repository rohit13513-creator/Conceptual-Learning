import type { QuizQuestion } from "../types-custom";

// Helpers for the Class VIII Maths "The Baudhāyana-Pythagoras Theorem" question bank (NCERT Ganita Prakash Part II, Chapter 2).
// u() turns powers written as ^{3} or ^3 into superscripts (a^2 becomes a², x^n becomes xⁿ). Numbers are never turned into subscripts.
// A slash is a fraction (3/4). Write equations with ×, ÷, − and = so that scripts/check-bp-bank.mts can re-compute them.

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "t": "ᵗ", "n": "ⁿ", "-": "⁻" };
export const u = (s: string): string => s.replace(/\^\{?([0-9tn-]+)\}?/g, (_m, d: string) => [...d].map((x) => SUP[x] ?? x).join(""));

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
