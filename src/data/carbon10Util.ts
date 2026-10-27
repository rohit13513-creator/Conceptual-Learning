import type { QuizQuestion } from "../types-custom";

// Helpers for the Class X "Carbon and its Compounds" question bank.
// u() turns formula digits into subscripts (CH4 becomes CH₄) so the plain-text screens show formulas properly.

const SUB = "₀₁₂₃₄₅₆₇₈₉";
export const u = (s: string): string => s.replace(/([A-Za-z\)])(\d+)/g, (_m, a: string, d: string) => a + d.replace(/\d/g, (x) => SUB[Number(x)]));

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
/** assertion-reason question; `right` is the index of the correct option (0 to 3) */
export const ar = (assertion: string, reason: string, right: number, explanation: string): QuizQuestion => {
  n++;
  return { id: n, question: u(`Assertion (A): ${assertion}\nReason (R): ${reason}`), options: AR, correctAnswer: right, explanation: u(explanation) };
};
