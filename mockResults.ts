// Results of the Class X Mock Test Series: the shape of a result and the functions that check it, match it to a student and pick the top three.
// The results themselves (names and marks of students) are NOT kept in this repository. They sit in one private file, mock-results.json, in the
// "downloads" storage bucket; the server reads it (see /api/mock-tests) and hands each student only the top three and his or her own row, so the
// marks of the other students never reach a browser. To publish or change a result: node scripts/upload-mock-results.mjs <file.json>
// (the file is checked with validateMockResult below before it is uploaded).
//
// A row is matched to a student's account by the name on the account, written in lower case with single spaces. `names` lists every way the
// same student's name is written on the account (for example only the first name).
//
// Marking of the Biology test (+1 correct, -0.25 wrong, 0 not attempted): marks = correct - 0.25 x wrong. `penalty` is the (negative)
// deduction for a correct answer written with the option letter or the statement missing (1 mark each, at most 5 marks). A letter and a
// statement that do not match are counted wrong. final = marks + penalty.

export interface MockResultRow {
  rank: number;                 // as published: two students with the same marks share a rank and the next rank is skipped
  name: string;                 // as shown on the leaderboard
  names: string[];              // lower-case names that identify the student's account
  correct: number;
  wrong: number;
  notAttempted: number;
  marks: number;
  penalty: number;              // 0 or negative
  finalMarks: number;
  remark: string | null;        // what went wrong while writing the paper, shown to that student
}

export interface MockResult {
  testId: string;
  maxMarks: number;
  rows: MockResultRow[];
}

export type MockResults = Record<string, MockResult>;

export const normName = (s: string) => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
export const percentOf = (marks: number, max: number) => Math.round((marks / max) * 10000) / 100;

/** The result row of the student whose account carries this name, or null if the student is not in the result. */
export function findMockRow(r: MockResult | undefined, accountName: string): MockResultRow | null {
  if (!r) return null;
  const n = normName(accountName);
  return r.rows.find((row) => row.names.includes(n)) || null;
}

/** The students on ranks 1 to 3 (a shared rank lists every student who shares it). Rank 3 is empty when two students share rank 2. */
export function topThree(r: MockResult | undefined): { rank: number; names: string[]; finalMarks: number; percent: number }[] {
  if (!r) return [];
  const out: { rank: number; names: string[]; finalMarks: number; percent: number }[] = [];
  for (const row of r.rows) {
    if (row.rank > 3) continue;
    const g = out.find((x) => x.rank === row.rank);
    if (g) g.names.push(row.name);
    else out.push({ rank: row.rank, names: [row.name], finalMarks: row.finalMarks, percent: percentOf(row.finalMarks, r.maxMarks) });
  }
  return out.sort((a, b) => a.rank - b.rank);
}

/** Everything that can be wrong with a result file; an empty list means it is safe to publish. */
export function validateMockResult(r: MockResult, expectedMaxMarks?: number): string[] {
  const bad: string[] = [];
  const near = (a: number, b: number) => Math.abs(a - b) < 1e-9;
  if (!r || !Array.isArray(r.rows) || r.rows.length === 0) return ["no rows"];
  if (expectedMaxMarks !== undefined && r.maxMarks !== expectedMaxMarks) bad.push(`maxMarks is ${r.maxMarks} but the test has ${expectedMaxMarks}`);
  const sorted = [...r.rows].sort((a, b) => b.finalMarks - a.finalMarks);
  const seen = new Map<string, string>();
  for (const row of r.rows) {
    if (!near(row.marks, row.correct - 0.25 * row.wrong)) bad.push(`${row.name}: marks ${row.marks} is not correct - 0.25 x wrong`);
    if (!near(row.finalMarks, row.marks + row.penalty)) bad.push(`${row.name}: final ${row.finalMarks} is not marks + penalty`);
    if (row.correct + row.wrong + row.notAttempted !== r.maxMarks) bad.push(`${row.name}: correct + wrong + not attempted is not ${r.maxMarks}`);
    if (row.penalty > 0 || row.penalty < -5) bad.push(`${row.name}: penalty ${row.penalty} is outside 0 to -5`);
    if (row.penalty < 0 && !row.remark) bad.push(`${row.name}: a penalty with no remark`);
    const expectedRank = 1 + sorted.filter((x) => x.finalMarks > row.finalMarks).length;
    if (expectedRank !== row.rank) bad.push(`${row.name}: rank ${row.rank} but the marks give rank ${expectedRank}`);
    if (!row.names.includes(normName(row.name))) bad.push(`${row.name}: names must include the full name`);
    for (const n of row.names) { if (seen.has(n)) bad.push(`name "${n}" belongs to ${seen.get(n)} and ${row.name}`); seen.set(n, row.name); }
  }
  return bad;
}
