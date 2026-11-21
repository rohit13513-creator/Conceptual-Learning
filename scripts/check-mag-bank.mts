// Checks the Magnetic Effects of Electric Current notes and question bank. Run: npx tsx scripts/check-mag-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { MAG_A } from '../src/data/magNotesA.ts';
import { MAG_B } from '../src/data/magNotesB.ts';
import { MAG_C } from '../src/data/magNotesC.ts';
import { MAG10_MCQS } from '../src/data/mag10_mcq.ts';
import { MAG10_ASSERTIONS } from '../src/data/mag10_ar.ts';
import { MAG10_VERY_SHORT, MAG10_SHORT } from '../src/data/mag10_short.ts';
import { MAG10_LONG } from '../src/data/mag10_long.ts';
import { MAG10_COMPETENCY } from '../src/data/mag10_case.ts';
import { MAG10_NCERT_SOLVED } from '../src/data/mag10_ncert.ts';
import { MAG10_SELF_ASSESSMENT } from '../src/data/mag10_self.ts';

const bad: string[] = [];
const topics = [...MAG_A, ...MAG_B, ...MAG_C];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['mg_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(MAG10_MCQS, 'mcq'); mcqCheck(MAG10_SELF_ASSESSMENT, 'self');
dia(MAG10_VERY_SHORT, 'vs'); dia(MAG10_SHORT, 's'); dia(MAG10_LONG, 'long'); dia(MAG10_COMPETENCY, 'comp'); dia(MAG10_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = MAG10_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = MAG10_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => MAG10_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
const arMcqDist = [0, 1, 2, 3].map((i) => MAG10_MCQS.filter((q) => /^Assertion/.test(q.question) && q.correctAnswer === i).length).join('/');
// the marking scheme of every five-mark question must add to 5; the three-mark questions to 3; a case study is 1 + 1 + 2
const sum = (schemes: string[]) => schemes.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0);
MAG10_LONG.forEach((q) => { const tot = sum(q.markingScheme); if (Math.abs(tot - 5) > 1e-9) bad.push('long ' + q.id + ' marks add to ' + tot); });
MAG10_SHORT.forEach((q) => { const tot = sum(q.keyPoints); if (!Number.isNaN(tot) && Math.abs(tot - 3) > 1e-9) bad.push('3-mark ' + q.id + ' marks add to ' + tot); });
MAG10_VERY_SHORT.forEach((q) => { if (q.keyPoints.length !== 2) bad.push('2-mark ' + q.id + ' has ' + q.keyPoints.length + ' key points'); });
MAG10_COMPETENCY.forEach((c) => { const m = c.subQuestions.map((x) => x.marks).join(''); if (m !== '112') bad.push('competency ' + c.id + ' marks ' + m); });
// wording rules: no slash, no em dash, no "AI" as a word, no stray underscore or caret in the bank
const text = JSON.stringify([topics, MAG10_MCQS, MAG10_ASSERTIONS, MAG10_VERY_SHORT, MAG10_SHORT, MAG10_LONG, MAG10_COMPETENCY, MAG10_NCERT_SOLVED, MAG10_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^mg_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
const bankText = JSON.stringify([MAG10_MCQS, MAG10_ASSERTIONS, MAG10_VERY_SHORT, MAG10_SHORT, MAG10_LONG, MAG10_COMPETENCY, MAG10_NCERT_SOLVED, MAG10_SELF_ASSESSMENT]);
const bs: string[] = []; JSON.parse(bankText, (_k, v) => { if (typeof v === 'string') bs.push(v); return v; });
bs.forEach((s) => { if (/_/.test(s) && !/^mg_/.test(s)) bad.push('underscore: ' + s.slice(0, 70)); if (/\^/.test(s)) bad.push('caret: ' + s.slice(0, 70)); });
// the Exercises must be together at the end of the solved list, in order
const ex = MAG10_NCERT_SOLVED.map((q) => q.questionNumber);
const firstEx = ex.findIndex((x) => /^Exercise/.test(x));
if (ex.slice(firstEx).some((x) => !/^Exercise/.test(x))) bad.push('exercises are not together at the end');
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^mg_/.test(k)).length);
console.log('MCQ', MAG10_MCQS.length, '(assertion-reason inside:', arInMcq + ', A/B/C/D', arMcqDist + ')', 'answer positions', dist(MAG10_MCQS), '| assertion set', MAG10_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', MAG10_VERY_SHORT.length, '| 3-mark', MAG10_SHORT.length, '| 5-mark', MAG10_LONG.length, '| passage', MAG10_COMPETENCY.length, '| solved NCERT', MAG10_NCERT_SOLVED.length);
console.log('total of the 150:', MAG10_MCQS.length + MAG10_VERY_SHORT.length + MAG10_SHORT.length + MAG10_LONG.length + MAG10_COMPETENCY.length);
console.log('self assessment', MAG10_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(MAG10_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(MAG10_MCQS), '2m', withDia(MAG10_VERY_SHORT), '3m', withDia(MAG10_SHORT), '5m', withDia(MAG10_LONG), 'passage', withDia(MAG10_COMPETENCY), 'solved', withDia(MAG10_NCERT_SOLVED), 'self', withDia(MAG10_SELF_ASSESSMENT));
const unused = Object.keys(DIAGRAMS).filter((k) => /^mg_/.test(k) && !used.has(k));
if (unused.length) console.log('diagrams not used anywhere:', unused.join(', '));
console.log(bad.length ? bad : 'all ok');
