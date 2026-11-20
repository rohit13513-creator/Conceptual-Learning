// Checks the Electricity notes and question bank. Run: npx tsx scripts/check-elec-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { ELEC_A } from '../src/data/elecNotesA.ts';
import { ELEC_B } from '../src/data/elecNotesB.ts';
import { ELEC_C } from '../src/data/elecNotesC.ts';
import { ELEC_D } from '../src/data/elecNotesD.ts';
import { ELEC10_MCQS } from '../src/data/elec10_mcq.ts';
import { ELEC10_ASSERTIONS } from '../src/data/elec10_ar.ts';
import { ELEC10_VERY_SHORT, ELEC10_SHORT } from '../src/data/elec10_short.ts';
import { ELEC10_LONG } from '../src/data/elec10_long.ts';
import { ELEC10_COMPETENCY } from '../src/data/elec10_case.ts';
import { ELEC10_NCERT_SOLVED } from '../src/data/elec10_ncert.ts';
import { ELEC10_SELF_ASSESSMENT } from '../src/data/elec10_self.ts';

const bad: string[] = [];
const topics = [...ELEC_A, ...ELEC_B, ...ELEC_C, ...ELEC_D];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['el_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(ELEC10_MCQS, 'mcq'); mcqCheck(ELEC10_SELF_ASSESSMENT, 'self');
dia(ELEC10_VERY_SHORT, 'vs'); dia(ELEC10_SHORT, 's'); dia(ELEC10_LONG, 'long'); dia(ELEC10_COMPETENCY, 'comp'); dia(ELEC10_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = ELEC10_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = ELEC10_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => ELEC10_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
ELEC10_COMPETENCY.forEach((c) => { const m = c.subQuestions.map((s: any) => s.marks).join('+'); if (m !== '1+1+2') bad.push('competency ' + c.id + ' marks ' + m); });
// the marking scheme of every five-mark question must add to 5
ELEC10_LONG.forEach((q) => { const tot = q.markingScheme.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0); if (Math.abs(tot - 5) > 1e-9) bad.push('long ' + q.id + ' marks add to ' + tot); });
// wording rules: no slash, no em dash, no "AI" as a word, no stray underscore
const text = JSON.stringify([topics, ELEC10_MCQS, ELEC10_ASSERTIONS, ELEC10_VERY_SHORT, ELEC10_SHORT, ELEC10_LONG, ELEC10_COMPETENCY, ELEC10_NCERT_SOLVED, ELEC10_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^(el_|qd_)/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
// underscores are fine inside the notes (R_{s} markup) but not in the question bank texts
const bankText = JSON.stringify([ELEC10_MCQS, ELEC10_ASSERTIONS, ELEC10_VERY_SHORT, ELEC10_SHORT, ELEC10_LONG, ELEC10_COMPETENCY, ELEC10_NCERT_SOLVED, ELEC10_SELF_ASSESSMENT]);
const bs: string[] = []; JSON.parse(bankText, (_k, v) => { if (typeof v === 'string') bs.push(v); return v; });
bs.forEach((s) => { if (/_/.test(s) && !/^(el_|qd_)/.test(s)) bad.push('underscore: ' + s.slice(0, 70)); if (/\^/.test(s)) bad.push('caret: ' + s.slice(0, 70)); });
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^(el_|qd_)/.test(k)).length);
console.log('MCQ', ELEC10_MCQS.length, '(assertion-reason inside:', arInMcq + ')', 'answer positions', dist(ELEC10_MCQS), '| assertion set', ELEC10_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', ELEC10_VERY_SHORT.length, '| 3-mark', ELEC10_SHORT.length, '| 5-mark', ELEC10_LONG.length, '| competency', ELEC10_COMPETENCY.length, '| solved NCERT', ELEC10_NCERT_SOLVED.length);
console.log('self assessment', ELEC10_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(ELEC10_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(ELEC10_MCQS), '2m', withDia(ELEC10_VERY_SHORT), '3m', withDia(ELEC10_SHORT), '5m', withDia(ELEC10_LONG), 'comp', withDia(ELEC10_COMPETENCY), 'solved', withDia(ELEC10_NCERT_SOLVED), 'self', withDia(ELEC10_SELF_ASSESSMENT));
const unused = Object.keys(DIAGRAMS).filter((k) => /^(el_|qd_)/.test(k) && !used.has(k));
if (unused.length) console.log('diagrams not used anywhere:', unused.join(', '));
console.log(bad.length ? bad : 'all ok');
