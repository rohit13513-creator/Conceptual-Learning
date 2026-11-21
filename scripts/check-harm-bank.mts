// Checks the How Nature Works in Harmony notes and question bank. Run: npx tsx scripts/check-harm-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { HARM_A } from '../src/data/harmNotesA.ts';
import { HARM_B } from '../src/data/harmNotesB.ts';
import { HARM_C } from '../src/data/harmNotesC.ts';
import { HARM8_MCQS } from '../src/data/harm8_mcq.ts';
import { HARM8_ASSERTIONS } from '../src/data/harm8_ar.ts';
import { HARM8_VERY_SHORT, HARM8_SHORT } from '../src/data/harm8_short.ts';
import { HARM8_LONG } from '../src/data/harm8_long.ts';
import { HARM8_COMPETENCY } from '../src/data/harm8_case.ts';
import { HARM8_NCERT_SOLVED } from '../src/data/harm8_ncert.ts';
import { HARM8_SELF_ASSESSMENT } from '../src/data/harm8_self.ts';

const bad: string[] = [];
const topics = [...HARM_A, ...HARM_B, ...HARM_C];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['hm_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(HARM8_MCQS, 'mcq'); mcqCheck(HARM8_SELF_ASSESSMENT, 'self');
dia(HARM8_VERY_SHORT, 'vs'); dia(HARM8_SHORT, 's'); dia(HARM8_LONG, 'long'); dia(HARM8_COMPETENCY, 'comp'); dia(HARM8_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = HARM8_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = HARM8_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => HARM8_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
const arMcqDist = [0, 1, 2, 3].map((i) => HARM8_MCQS.filter((q) => /^Assertion/.test(q.question) && q.correctAnswer === i).length).join('/');
// the marking scheme of every five-mark question must add to 5; the three-mark questions to 3; a case study is 1 + 1 + 2
const sum = (schemes: string[]) => schemes.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0);
HARM8_LONG.forEach((q) => { const tot = sum(q.markingScheme); if (Math.abs(tot - 5) > 1e-9) bad.push('long ' + q.id + ' marks add to ' + tot); });
HARM8_SHORT.forEach((q) => { const tot = sum(q.keyPoints); if (!Number.isNaN(tot) && Math.abs(tot - 3) > 1e-9) bad.push('3-mark ' + q.id + ' marks add to ' + tot); });
HARM8_VERY_SHORT.forEach((q) => { if (q.keyPoints.length !== 2) bad.push('2-mark ' + q.id + ' has ' + q.keyPoints.length + ' key points'); });
HARM8_COMPETENCY.forEach((c) => { const m = c.subQuestions.map((x) => x.marks).join(''); if (m !== '112') bad.push('competency ' + c.id + ' marks ' + m); });
// wording rules: no slash, no em dash, no "AI" as a word, no stray underscore or caret in the bank
const text = JSON.stringify([topics, HARM8_MCQS, HARM8_ASSERTIONS, HARM8_VERY_SHORT, HARM8_SHORT, HARM8_LONG, HARM8_COMPETENCY, HARM8_NCERT_SOLVED, HARM8_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^hm_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
const bankText = JSON.stringify([HARM8_MCQS, HARM8_ASSERTIONS, HARM8_VERY_SHORT, HARM8_SHORT, HARM8_LONG, HARM8_COMPETENCY, HARM8_NCERT_SOLVED, HARM8_SELF_ASSESSMENT]);
const bs: string[] = []; JSON.parse(bankText, (_k, v) => { if (typeof v === 'string') bs.push(v); return v; });
bs.forEach((s) => { if (/_/.test(s) && !/^hm_/.test(s)) bad.push('underscore: ' + s.slice(0, 70)); if (/\^/.test(s)) bad.push('caret: ' + s.slice(0, 70)); });
// the Exercises must be together at the end of the solved list, in order
const ex = HARM8_NCERT_SOLVED.map((q) => q.questionNumber);
const firstEx = ex.findIndex((x) => /^Keep the curiosity alive/.test(x));
if (ex.slice(firstEx).some((x) => !/^Keep the curiosity alive/.test(x))) bad.push('the Keep the curiosity alive questions are not together at the end');
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^hm_/.test(k)).length);
console.log('MCQ', HARM8_MCQS.length, '(assertion-reason inside:', arInMcq + ', A/B/C/D', arMcqDist + ')', 'answer positions', dist(HARM8_MCQS), '| assertion set', HARM8_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', HARM8_VERY_SHORT.length, '| 3-mark', HARM8_SHORT.length, '| 5-mark', HARM8_LONG.length, '| passage', HARM8_COMPETENCY.length, '| solved NCERT', HARM8_NCERT_SOLVED.length);
console.log('total of the 100:', HARM8_MCQS.length + HARM8_VERY_SHORT.length + HARM8_SHORT.length + HARM8_LONG.length + HARM8_COMPETENCY.length);
console.log('self assessment', HARM8_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(HARM8_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(HARM8_MCQS), '2m', withDia(HARM8_VERY_SHORT), '3m', withDia(HARM8_SHORT), '5m', withDia(HARM8_LONG), 'passage', withDia(HARM8_COMPETENCY), 'solved', withDia(HARM8_NCERT_SOLVED), 'self', withDia(HARM8_SELF_ASSESSMENT));
const unused = Object.keys(DIAGRAMS).filter((k) => /^hm_/.test(k) && !used.has(k));
if (unused.length) console.log('diagrams not used anywhere:', unused.join(', '));
console.log(bad.length ? bad : 'all ok');
