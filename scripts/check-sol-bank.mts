// Checks the Solutes, Solvents and Solutions notes and question bank. Run: npx tsx scripts/check-sol-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { SOL_A } from '../src/data/solNotesA.ts';
import { SOL_B } from '../src/data/solNotesB.ts';
import { SOL_C } from '../src/data/solNotesC.ts';
import { SOL8_MCQS } from '../src/data/sol8_mcq.ts';
import { SOL8_ASSERTIONS } from '../src/data/sol8_ar.ts';
import { SOL8_VERY_SHORT, SOL8_SHORT } from '../src/data/sol8_short.ts';
import { SOL8_LONG } from '../src/data/sol8_long.ts';
import { SOL8_COMPETENCY } from '../src/data/sol8_case.ts';
import { SOL8_NCERT_SOLVED } from '../src/data/sol8_ncert.ts';
import { SOL8_SELF_ASSESSMENT } from '../src/data/sol8_self.ts';

const bad: string[] = [];
const topics = [...SOL_A, ...SOL_B, ...SOL_C];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['sl_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(SOL8_MCQS, 'mcq'); mcqCheck(SOL8_SELF_ASSESSMENT, 'self');
dia(SOL8_VERY_SHORT, 'vs'); dia(SOL8_SHORT, 's'); dia(SOL8_LONG, 'long'); dia(SOL8_COMPETENCY, 'comp'); dia(SOL8_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = SOL8_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = SOL8_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => SOL8_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
const arMcqDist = [0, 1, 2, 3].map((i) => SOL8_MCQS.filter((q) => /^Assertion/.test(q.question) && q.correctAnswer === i).length).join('/');
// the marking scheme of every five-mark question must add to 5; the three-mark questions to 3; a case study is 1 + 1 + 2
const sum = (schemes: string[]) => schemes.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0);
SOL8_LONG.forEach((q) => { const tot = sum(q.markingScheme); if (Math.abs(tot - 5) > 1e-9) bad.push('long ' + q.id + ' marks add to ' + tot); });
SOL8_SHORT.forEach((q) => { const tot = sum(q.keyPoints); if (!Number.isNaN(tot) && Math.abs(tot - 3) > 1e-9) bad.push('3-mark ' + q.id + ' marks add to ' + tot); });
SOL8_VERY_SHORT.forEach((q) => { if (q.keyPoints.length !== 2) bad.push('2-mark ' + q.id + ' has ' + q.keyPoints.length + ' key points'); });
SOL8_COMPETENCY.forEach((c) => { const m = c.subQuestions.map((x) => x.marks).join(''); if (m !== '112') bad.push('competency ' + c.id + ' marks ' + m); });
// wording rules: no slash, no em dash, no "AI" as a word, no stray underscore or caret in the bank
const text = JSON.stringify([topics, SOL8_MCQS, SOL8_ASSERTIONS, SOL8_VERY_SHORT, SOL8_SHORT, SOL8_LONG, SOL8_COMPETENCY, SOL8_NCERT_SOLVED, SOL8_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^sl_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
const bankText = JSON.stringify([SOL8_MCQS, SOL8_ASSERTIONS, SOL8_VERY_SHORT, SOL8_SHORT, SOL8_LONG, SOL8_COMPETENCY, SOL8_NCERT_SOLVED, SOL8_SELF_ASSESSMENT]);
const bs: string[] = []; JSON.parse(bankText, (_k, v) => { if (typeof v === 'string') bs.push(v); return v; });
bs.forEach((s) => { if (/_/.test(s) && !/^sl_/.test(s)) bad.push('underscore: ' + s.slice(0, 70)); if (/\^/.test(s)) bad.push('caret: ' + s.slice(0, 70)); });
// the Exercises must be together at the end of the solved list, in order
const ex = SOL8_NCERT_SOLVED.map((q) => q.questionNumber);
const firstEx = ex.findIndex((x) => /^Keep the curiosity alive/.test(x));
if (ex.slice(firstEx).some((x) => !/^Keep the curiosity alive/.test(x))) bad.push('the Keep the curiosity alive questions are not together at the end');
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^sl_/.test(k)).length);
console.log('MCQ', SOL8_MCQS.length, '(assertion-reason inside:', arInMcq + ', A/B/C/D', arMcqDist + ')', 'answer positions', dist(SOL8_MCQS), '| assertion set', SOL8_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', SOL8_VERY_SHORT.length, '| 3-mark', SOL8_SHORT.length, '| 5-mark', SOL8_LONG.length, '| passage', SOL8_COMPETENCY.length, '| solved NCERT', SOL8_NCERT_SOLVED.length);
console.log('total of the 100:', SOL8_MCQS.length + SOL8_VERY_SHORT.length + SOL8_SHORT.length + SOL8_LONG.length + SOL8_COMPETENCY.length);
console.log('self assessment', SOL8_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(SOL8_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(SOL8_MCQS), '2m', withDia(SOL8_VERY_SHORT), '3m', withDia(SOL8_SHORT), '5m', withDia(SOL8_LONG), 'passage', withDia(SOL8_COMPETENCY), 'solved', withDia(SOL8_NCERT_SOLVED), 'self', withDia(SOL8_SELF_ASSESSMENT));
const unused = Object.keys(DIAGRAMS).filter((k) => /^sl_/.test(k) && !used.has(k));
if (unused.length) console.log('diagrams not used anywhere:', unused.join(', '));
console.log(bad.length ? bad : 'all ok');
