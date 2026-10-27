// Overlap check for every circle figure (notes, solved questions, question bank). Run: npx tsx scripts/check-circle-figures.mts
import { layoutFigure } from '../src/components/geoLayout.ts';
import { CIRCLES9_MCQS } from '../src/data/circles9_mcq.ts';
import { CIRCLES9_VERY_SHORT, CIRCLES9_SHORT } from '../src/data/circles9_short.ts';
import { CIRCLES9_LONG, CIRCLES9_COMPETENCY } from '../src/data/circles9_long.ts';
import { CIRCLES9_NCERT_SOLVED } from '../src/data/circles9_ncert.ts';
import { CIRCLES9_TOPICS } from '../src/data/circles9Notes.ts';
let total = 0, bad = 0;
const out: string[] = [];
function chk(spec: any, where: string) {
  if (!spec) return;
  total++;
  const L = layoutFigure(spec);
  if (L.issues.length) { bad++; out.push(where + ' [' + (spec.caption || '') + ']: ' + L.issues.join('; ')); }
}
CIRCLES9_MCQS.forEach(q => chk(q.figure, 'MCQ' + q.id));
CIRCLES9_VERY_SHORT.forEach(q => chk(q.figure, 'VS' + q.id));
CIRCLES9_SHORT.forEach(q => chk(q.figure, 'S' + q.id));
CIRCLES9_LONG.forEach(q => chk(q.figure, 'LONG' + q.id));
CIRCLES9_COMPETENCY.forEach(q => chk(q.figure, 'COMP' + q.id));
CIRCLES9_NCERT_SOLVED.forEach(q => chk(q.figure, 'NCERT' + q.id));
CIRCLES9_TOPICS.forEach(t => t.blocks.forEach((b: any, i) => { if (b.spec) chk(b.spec, t.id + '#' + i); (b.specs || b.figs || []).forEach((s: any, k: number) => chk(s, t.id + '#' + i + '.' + k)); if (b.fig) chk(b.fig, t.id + '#' + i); }));
console.log(total, 'figures,', bad, 'with issues');
console.log(out.join('\n'));
