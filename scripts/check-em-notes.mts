// Checks the Electricity: Magnetic and Heating Effects notes (Class VIII): every diagram id exists, the topics are numbered once, and the text keeps
// Rohit's writing rules (no slash, no em dash, the word AI never shown to students).  Run: npx tsx scripts/check-em-notes.mts
import { EM_A } from "../src/data/emNotesA.ts";
import { EM_B } from "../src/data/emNotesB.ts";
import { EM_C } from "../src/data/emNotesC.ts";
import { DIAGRAMS } from "../src/data/carbonDiagrams.ts";

const topics = [...EM_A, ...EM_B, ...EM_C];
let bad = 0;
const say = (m: string) => { bad++; console.log("PROBLEM: " + m); };
const ids = new Set<string>();
const strings: [string, string][] = [];
const push = (where: string, s: unknown) => { if (typeof s === "string") strings.push([where, s]); };
for (const t of topics) {
  if (ids.has(t.id)) say("duplicate topic id " + t.id);
  ids.add(t.id);
  [t.title, t.heading, t.sub, t.category].forEach((s) => push(t.id, s));
  for (const b of t.blocks as any[]) {
    if (b.t === "dia" && !DIAGRAMS[b.id]) say(`${t.id}: no diagram ${b.id}`);
    if (b.t === "dias") b.ids.forEach((i: string) => { if (!DIAGRAMS[i]) say(`${t.id}: no diagram ${i}`); });
    if (b.t === "mindmap" && !DIAGRAMS["em_mindmap"]) say("no mind map");
    ["s", "title"].forEach((k) => push(t.id, b[k]));
    (b.items || []).forEach((it: any) => (Array.isArray(it) ? it.forEach((x: string) => push(t.id, x)) : push(t.id, it)));
    (b.steps || []).concat(b.see || [], b.why || []).forEach((x: string) => push(t.id, x));
    (b.rows || []).forEach((r: string[]) => r.forEach((x) => push(t.id, x)));
    (b.head || []).forEach((x: string) => push(t.id, x));
  }
}
for (const [w, s] of strings) {
  if (s.includes("/")) say(`${w}: slash in "${s.slice(0, 60)}"`);
  if (s.includes("—") || s.includes("–")) say(`${w}: dash in "${s.slice(0, 60)}"`);
  if (/\bAI\b/.test(s)) say(`${w}: the word AI in "${s.slice(0, 60)}"`);
  if (/_{3,}/.test(s)) say(`${w}: blank made of underscores`);
  if ((s.match(/\*\*/g) || []).length % 2) say(`${w}: odd number of ** in "${s.slice(0, 60)}"`);
}
console.log(`${topics.length} topics (${EM_A.length} + ${EM_B.length} + ${EM_C.length}), ${strings.length} strings checked, ${[...new Set(Object.keys(DIAGRAMS).filter((k) => k.startsWith("em_")))].length} em diagrams`);
console.log(bad ? bad + " problem(s)" : "all ok");
process.exit(bad ? 1 : 0);
