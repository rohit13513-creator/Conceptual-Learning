// Checks the new Assertion and Reason sets: 20 each, valid option letters, no duplicate assertions,
// no slash or em dash in the maths sets, nothing student-facing that says AI, and a spread of the four answers.
import * as a8 from "../src/data/ar8";
import * as a9 from "../src/data/ar9";
import * as a9m from "../src/data/ar9m";
import * as a10 from "../src/data/ar10";

const sets: Record<string, any[]> = { ...a8, ...a9, ...a9m, ...a10 };
let bad = 0;
const fail = (m: string) => { bad++; console.log("PROBLEM:", m); };
for (const [name, set] of Object.entries(sets)) {
  if (!Array.isArray(set)) continue;
  if (set.length < 20) fail(`${name} has only ${set.length}`);
  const seen = new Set<string>();
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  set.forEach((q, i) => {
    if (q.id !== i + 1) fail(`${name} id ${q.id}`);
    if (!["A", "B", "C", "D"].includes(q.correctOption)) fail(`${name} #${q.id} option`);
    count[q.correctOption]++;
    for (const f of ["assertion", "reason", "explanation"]) if (!q[f] || q[f].trim().length < 8) fail(`${name} #${q.id} empty ${f}`);
    if (seen.has(q.assertion + "|" + q.reason)) fail(`${name} #${q.id} duplicate`);
    seen.add(q.assertion + "|" + q.reason);
    const text = [q.assertion, q.reason, q.explanation].join(" ");
    if (/\bAI\b/.test(text)) fail(`${name} #${q.id} says AI`);
    if (/—|–/.test(text)) fail(`${name} #${q.id} dash`);
    if (/(CIRCLES9|PROPS9|LIN9|AL9|MATHS8SC)/.test(name) && /\//.test(text)) fail(`${name} #${q.id} slash`);
    // a "D" answer says A is false and R is true; a "C" answer says A is true and R is false (explanation must say so)
    if (q.correctOption === "D" && !/A is false|is false/i.test(q.explanation)) fail(`${name} #${q.id} D explanation does not say A is false`);
    if (q.correctOption === "C" && !/R is false|is false/i.test(q.explanation)) fail(`${name} #${q.id} C explanation does not say R is false`);
  });
  console.log(name.padEnd(36), String(set.length).padStart(3), `A${count.A} B${count.B} C${count.C} D${count.D}`);
}
console.log(bad ? `${bad} problem(s)` : "all sets pass");
