// Checks the Quadrilaterals question bank: counts, answer spread, no slash or dash, no "AI", figures that draw cleanly.
import { QUAD9_NCERT_SOLVED } from "../src/data/quad9_ncert";
import { QUAD9_MCQS } from "../src/data/quad9_mcq";
import { QUAD9_ASSERTION_REASON } from "../src/data/quad9_ar";
import { QUAD9_VERY_SHORT, QUAD9_SHORT } from "../src/data/quad9_short";
import { QUAD9_LONG, QUAD9_COMPETENCY } from "../src/data/quad9_long";
import { QUAD9_SELF_ASSESSMENT } from "../src/data/quad9_self";
import { QUAD9_TOPICS, QUAD_MAP } from "../src/data/quad9Notes";
import { layoutFigure } from "../src/components/geoLayout";

let bad = 0;
const fail = (m: string) => { bad++; console.log("PROBLEM:", m); };
const expect = (name: string, got: number, want: number) => { console.log(name.padEnd(26), got); if (got !== want) fail(`${name}: ${got} but expected ${want}`); };
expect("MCQ", QUAD9_MCQS.length, 40);
expect("Assertion and reason", QUAD9_ASSERTION_REASON.length, 20);
expect("Two-mark", QUAD9_VERY_SHORT.length, 40);
expect("Three-mark", QUAD9_SHORT.length, 30);
expect("Five-mark", QUAD9_LONG.length, 25);
expect("Competency", QUAD9_COMPETENCY.length, 25);
expect("Self assessment", QUAD9_SELF_ASSESSMENT.length, 80);
console.log("NCERT solved".padEnd(26), QUAD9_NCERT_SOLVED.length, " topics", QUAD9_TOPICS.length);

const spread = (name: string, qs: { correctAnswer: number }[]) => {
  const c = [0, 0, 0, 0]; qs.forEach((q) => c[q.correctAnswer]++);
  console.log(name.padEnd(26), "right answer at A B C D:", c.join(" "));
};
spread("MCQ", QUAD9_MCQS); spread("Self assessment", QUAD9_SELF_ASSESSMENT);

const text = (o: unknown) => JSON.stringify(o);
const all: Record<string, unknown> = { QUAD9_NCERT_SOLVED, QUAD9_MCQS, QUAD9_ASSERTION_REASON, QUAD9_VERY_SHORT, QUAD9_SHORT, QUAD9_LONG, QUAD9_COMPETENCY, QUAD9_SELF_ASSESSMENT, QUAD9_TOPICS, QUAD_MAP };
for (const [name, set] of Object.entries(all)) {
  const t = text(set).replace(/"figure":\{[^}]*\}/g, "");
  if (/\bAI\b/.test(t)) fail(`${name} says AI`);
  if (/[—–]/.test(t)) fail(`${name} has a dash`);
  const slashes = t.match(/[^\\]\//g);
  if (slashes && !/NCERT/.test(name)) fail(`${name} has ${slashes.length} slash(es)`);
  if (slashes && /NCERT/.test(name)) fail(`${name} has ${slashes.length} slash(es)`);
}
// every MCQ-type question: four different options, correct index valid
for (const [name, qs] of Object.entries({ QUAD9_MCQS, QUAD9_SELF_ASSESSMENT }) as [string, any[]][]) {
  qs.forEach((q) => {
    if (q.options.length !== 4 || new Set(q.options).size !== 4) fail(`${name} #${q.id} options`);
    if (!(q.correctAnswer >= 0 && q.correctAnswer < 4)) fail(`${name} #${q.id} correctAnswer`);
    if (!q.explanation || q.explanation.length < 10) fail(`${name} #${q.id} explanation`);
  });
}
for (const q of QUAD9_COMPETENCY) {
  if (q.subQuestions.length !== 4) fail(`competency #${q.id} has ${q.subQuestions.length} parts`);
  for (const s of q.subQuestions) if (s.options && (s.correctIndex === undefined || s.options.length !== 4 || new Set(s.options).size !== 4)) fail(`competency #${q.id} option part`);
}
// figures
let figs = 0;
const specs: any[] = [];
for (const set of [QUAD9_NCERT_SOLVED, QUAD9_MCQS, QUAD9_VERY_SHORT, QUAD9_SHORT, QUAD9_LONG, QUAD9_COMPETENCY, QUAD9_SELF_ASSESSMENT] as any[][]) for (const q of set) if (q.figure) specs.push(q.figure);
for (const t of QUAD9_TOPICS) for (const b of t.blocks as any[]) { if (b.spec) specs.push(b.spec); if (b.specs) specs.push(...b.specs); if (b.fig) specs.push(b.fig); if (b.figs) specs.push(...b.figs); }
for (const spec of specs) { figs++; const L = layoutFigure(spec); if (L.issues.length) fail(`figure "${spec.caption}": ${L.issues.join("; ")}`); }
console.log("figures in the chapter".padEnd(26), figs);
console.log(bad ? `${bad} problem(s)` : "all checks pass");
process.exit(bad ? 1 : 0);
