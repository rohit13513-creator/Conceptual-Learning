// Checks the Exploring Forces notes and question bank. Run: npx tsx scripts/check-sol-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { FO_A } from '../src/data/foNotesA.ts';
import { FO_B } from '../src/data/foNotesB.ts';
import { FO_C } from '../src/data/foNotesC.ts';
import { FO8_MCQS } from '../src/data/fo8_mcq.ts';
import { FO8_ASSERTIONS } from '../src/data/fo8_ar.ts';
import { FO8_VERY_SHORT, FO8_SHORT } from '../src/data/fo8_short.ts';
import { FO8_LONG } from '../src/data/fo8_long.ts';
import { FO8_COMPETENCY } from '../src/data/fo8_case.ts';
import { FO8_NCERT_SOLVED } from '../src/data/fo8_ncert.ts';
import { FO8_SELF_ASSESSMENT } from '../src/data/fo8_self.ts';

const bad: string[] = [];
const topics = [...FO_A, ...FO_B, ...FO_C];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['fo_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(FO8_MCQS, 'mcq'); mcqCheck(FO8_SELF_ASSESSMENT, 'self');
dia(FO8_VERY_SHORT, 'vs'); dia(FO8_SHORT, 's'); dia(FO8_LONG, 'long'); dia(FO8_COMPETENCY, 'comp'); dia(FO8_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = FO8_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = FO8_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => FO8_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
const arMcqDist = [0, 1, 2, 3].map((i) => FO8_MCQS.filter((q) => /^Assertion/.test(q.question) && q.correctAnswer === i).length).join('/');
// the marking scheme of every five-mark question must add to 5; the three-mark questions to 3; a case study is 1 + 1 + 2
const sum = (schemes: string[]) => schemes.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0);
FO8_LONG.forEach((q) => { const tot = sum(q.markingScheme); if (Math.abs(tot - 5) > 1e-9) bad.push('long ' + q.id + ' marks add to ' + tot); });
FO8_SHORT.forEach((q) => { const tot = sum(q.keyPoints); if (!Number.isNaN(tot) && Math.abs(tot - 3) > 1e-9) bad.push('3-mark ' + q.id + ' marks add to ' + tot); });
FO8_VERY_SHORT.forEach((q) => { if (q.keyPoints.length !== 2) bad.push('2-mark ' + q.id + ' has ' + q.keyPoints.length + ' key points'); });
FO8_COMPETENCY.forEach((c) => { const m = c.subQuestions.map((x) => x.marks).join(''); if (m !== '112') bad.push('competency ' + c.id + ' marks ' + m); });
// wording rules: no slash, no em dash, no "AI" as a word, no stray underscore or caret in the bank
const text = JSON.stringify([topics, FO8_MCQS, FO8_ASSERTIONS, FO8_VERY_SHORT, FO8_SHORT, FO8_LONG, FO8_COMPETENCY, FO8_NCERT_SOLVED, FO8_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^fo_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
const bankText = JSON.stringify([FO8_MCQS, FO8_ASSERTIONS, FO8_VERY_SHORT, FO8_SHORT, FO8_LONG, FO8_COMPETENCY, FO8_NCERT_SOLVED, FO8_SELF_ASSESSMENT]);
const bs: string[] = []; JSON.parse(bankText, (_k, v) => { if (typeof v === 'string') bs.push(v); return v; });
bs.forEach((s) => { if (/_/.test(s) && !/^fo_/.test(s)) bad.push('underscore: ' + s.slice(0, 70)); if (/\^/.test(s)) bad.push('caret: ' + s.slice(0, 70)); });
// the Exercises must be together at the end of the solved list, in order
const ex = FO8_NCERT_SOLVED.map((q) => q.questionNumber);
const firstEx = ex.findIndex((x) => /^Keep the curiosity alive/.test(x));
if (ex.slice(firstEx).some((x) => !/^Keep the curiosity alive/.test(x))) bad.push('the Keep the curiosity alive questions are not together at the end');
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^fo_/.test(k)).length);
console.log('MCQ', FO8_MCQS.length, '(assertion-reason inside:', arInMcq + ', A/B/C/D', arMcqDist + ')', 'answer positions', dist(FO8_MCQS), '| assertion set', FO8_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', FO8_VERY_SHORT.length, '| 3-mark', FO8_SHORT.length, '| 5-mark', FO8_LONG.length, '| passage', FO8_COMPETENCY.length, '| solved NCERT', FO8_NCERT_SOLVED.length);
console.log('total of the 150:', FO8_MCQS.length + FO8_VERY_SHORT.length + FO8_SHORT.length + FO8_LONG.length + FO8_COMPETENCY.length);
console.log('self assessment', FO8_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(FO8_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(FO8_MCQS), '2m', withDia(FO8_VERY_SHORT), '3m', withDia(FO8_SHORT), '5m', withDia(FO8_LONG), 'passage', withDia(FO8_COMPETENCY), 'solved', withDia(FO8_NCERT_SOLVED), 'self', withDia(FO8_SELF_ASSESSMENT));
const unused = Object.keys(DIAGRAMS).filter((k) => /^fo_/.test(k) && !used.has(k));
if (unused.length) console.log('diagrams not used anywhere:', unused.join(', '));
console.log(bad.length ? bad : 'all ok');
