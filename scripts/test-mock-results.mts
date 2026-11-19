// Checks the code that handles Class X mock test results (mockResults.ts) on a made-up result: the marking arithmetic checks, the ranks with ties,
// the top three with a shared rank, and the matching of account names. The real result is private data and is checked when it is published:
//   npx tsx scripts/upload-mock-results.mts <file.json> --check
import { validateMockResult, topThree, findMockRow, percentOf } from "../mockResults.ts";
import type { MockResult } from "../mockResults.ts";

let bad = 0;
const fail = (m: string) => { bad++; console.log("PROBLEM:", m); };
const row = (rank: number, name: string, correct: number, wrong: number, na: number, penalty = 0, remark: string | null = null, names = [name.toLowerCase()]) => {
  const marks = correct - 0.25 * wrong;
  return { rank, name, names, correct, wrong, notAttempted: na, marks, penalty, finalMarks: marks + penalty, remark };
};
const good: MockResult = { testId: "t", maxMarks: 20, rows: [
  row(1, "Student A", 18, 1, 1, -1, "one answer had no statement", ["student a", "a"]),
  row(2, "Student B", 16, 4, 0), row(2, "Student C", 16, 4, 0), row(4, "Student D", 10, 2, 8), row(5, "Student E", 0, 0, 20),
] };
if (validateMockResult(good, 20).length) fail("a correct result was rejected: " + validateMockResult(good, 20).join("; "));

const broken = (f: (r: MockResult) => void) => { const c: MockResult = JSON.parse(JSON.stringify(good)); f(c); return validateMockResult(c, 20); };
if (!broken((r) => { r.rows[1].marks = 17; }).length) fail("wrong marks were not caught");
if (!broken((r) => { r.rows[1].finalMarks = 14; }).length) fail("wrong final marks were not caught");
if (!broken((r) => { r.rows[3].rank = 3; }).length) fail("a wrong rank was not caught");
if (!broken((r) => { r.rows[4].correct = 1; }).length) fail("counts that do not add up to the maximum were not caught");
if (!broken((r) => { r.rows[0].remark = null; }).length) fail("a penalty without a remark was not caught");
if (!broken((r) => { r.rows[1].penalty = -6; r.rows[1].finalMarks = r.rows[1].marks - 6; }).length) fail("a penalty above 5 was not caught");
if (!broken((r) => { r.rows[4].names = ["student a"]; }).length) fail("a name that belongs to two students was not caught");
if (validateMockResult(good, 25).length === 0) fail("a wrong maximum was not caught");

const top = topThree(good);
if (JSON.stringify(top.map((t) => [t.rank, t.names])) !== JSON.stringify([[1, ["Student A"]], [2, ["Student B", "Student C"]]])) fail("top three with a shared rank 2: " + JSON.stringify(top));
const tie3 = topThree({ ...good, rows: [row(1, "P", 20, 0, 0), row(2, "Q", 19, 0, 1), row(3, "R", 18, 0, 2), row(3, "S", 18, 0, 2), row(5, "T", 1, 0, 19)] });
if (JSON.stringify(tie3.map((t) => [t.rank, t.names])) !== JSON.stringify([[1, ["P"]], [2, ["Q"]], [3, ["R", "S"]]])) fail("top three with a shared rank 3: " + JSON.stringify(tie3));
if (findMockRow(good, "  STUDENT   a ")?.name !== "Student A" || findMockRow(good, "a")?.name !== "Student A") fail("name matching ignores case and spaces and uses the listed names");
if (findMockRow(good, "Student") || findMockRow(good, "Student F") || findMockRow(undefined, "Student A")) fail("name matching must not match a different or missing student");
if (percentOf(67, 75) !== 89.33 || percentOf(24.25, 75) !== 32.33) fail("percentages are rounded to two places");
console.log(bad ? `${bad} problem(s)` : "all mock result checks pass");
process.exit(bad ? 1 : 0);
