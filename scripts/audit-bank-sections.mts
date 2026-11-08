// Counts every question-bank section (and the self assessment) for every class, subject and chapter.
import * as b8 from "../src/data/bank8";
import * as b9 from "../src/data/bank9";
import * as b10 from "../src/data/bank10";
import * as bc from "../src/data/bankCompetition";

const base = { physicsChapter9: "motion", bioChapter9: "cell", bioChapter10: "life-processes", chemChapter10: "reactions", mathsChapter8: "quadrilaterals", mathsChapter9: "circles", scienceChapter8: "investigative-world" };
type Row = [string, any, any];
const rows: Row[] = [];
const add = (label: string, mod: any, over: Record<string, string>) => rows.push([label, mod, { ...base, ...over }]);
for (const c of ["quadrilaterals", "square-and-cube"]) add(`8 Maths ${c}`, b8, { preparingFor: "8th", qbSubject: "maths", mathsChapter8: c });
for (const c of ["investigative-world", "invisible-living-world", "health", "matter", "elements-compounds"]) add(`8 Science ${c}`, b8, { preparingFor: "8th", qbSubject: "science", scienceChapter8: c });
for (const c of ["motion", "forces", "energy", "sound"]) add(`9 Physics ${c}`, b9, { preparingFor: "9th", qbSubject: "physics", physicsChapter9: c });
for (const c of ["cell", "tissues", "diversity"]) add(`9 Biology ${c}`, b9, { preparingFor: "9th", qbSubject: "biology", bioChapter9: c });
for (const c of ["circles", "propositions", "linear", "algorithms", "quadrilaterals"]) add(`9 Maths ${c}`, b9, { preparingFor: "9th", qbSubject: "maths", mathsChapter9: c });
add("9 Foundations", b9, { preparingFor: "9th", qbSubject: "foundations" });
add("10 Physics light", b10, { preparingFor: "10th", qbSubject: "physics" });
for (const c of ["reactions", "carbon"]) add(`10 Chemistry ${c}`, b10, { preparingFor: "10th", qbSubject: "chemistry", chemChapter10: c });
for (const c of ["life-processes", "control-coordination", "reproduction", "heredity"]) add(`10 Biology ${c}`, b10, { preparingFor: "10th", qbSubject: "biology", bioChapter10: c });
add("Competitions", bc, { preparingFor: "competitions", qbSubject: "physics" });

const isAR = (q: any) => /assertion/i.test(JSON.stringify(q.question ?? q.q ?? q.text ?? "")) ;
console.log("chapter".padEnd(34), "ncert mcq  vs  short long  AR  comp self  | AR-inside-MCQ");
for (const [label, mod, p] of rows) {
  const b = mod.getBank(p); const s = mod.getSelf(p);
  const arIn = b.mcqs.filter(isAR).length;
  console.log(label.padEnd(34), String(b.ncert.length).padStart(4), String(b.mcqs.length).padStart(4), String(b.veryshort.length).padStart(4), String(b.short.length).padStart(5), String(b.long.length).padStart(4), String(b.assertion.length).padStart(4), String(b.competency.length).padStart(5), String(s.length).padStart(4), "  |", arIn);
}
