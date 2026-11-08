// Assertion and Reason sets: each row is [assertion, reason, correct option, explanation].
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.
export interface ArQ { id: number; assertion: string; reason: string; correctOption: "A" | "B" | "C" | "D"; explanation: string }
export type ArRow = [string, string, "A" | "B" | "C" | "D", string];

export const arSet = (rows: ArRow[]): ArQ[] =>
  rows.map(([assertion, reason, correctOption, explanation], i) => ({ id: i + 1, assertion, reason, correctOption, explanation }));
