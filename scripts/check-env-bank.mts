// Checks the Our Environment notes and question bank. Run: npx tsx scripts/check-env-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { ENV_A } from '../src/data/envNotesA.ts';
import { ENV_B } from '../src/data/envNotesB.ts';
import { ENV10_MCQS } from '../src/data/env10_mcq.ts';
import { ENV10_ASSERTIONS } from '../src/data/env10_ar.ts';
import { ENV10_VERY_SHORT, ENV10_SHORT } from '../src/data/env10_short.ts';
import { ENV10_LONG, ENV10_COMPETENCY } from '../src/data/env10_long.ts';
import { ENV10_NCERT_SOLVED } from '../src/data/env10_ncert.ts';
import { ENV10_SELF_ASSESSMENT } from '../src/data/env10_self.ts';

const bad: string[] = [];
const topics = [...ENV_A, ...ENV_B];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['ev_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(ENV10_MCQS, 'mcq'); mcqCheck(ENV10_SELF_ASSESSMENT, 'self');
dia(ENV10_VERY_SHORT, 'vs'); dia(ENV10_SHORT, 's'); dia(ENV10_LONG, 'long'); dia(ENV10_COMPETENCY, 'comp'); dia(ENV10_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = ENV10_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = ENV10_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => ENV10_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
// the marking scheme of every four-mark question must add to 4
ENV10_LONG.forEach((q) => { const tot = q.markingScheme.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0); if (Math.abs(tot - 4) > 1e-9 && !(q.markingScheme.length === 1 && /1 mark/.test(q.markingScheme[0]))) bad.push('long ' + q.id + ' marks add to ' + tot); });
ENV10_COMPETENCY.forEach((c) => { if (c.subQuestions.length !== 2) bad.push('competency ' + c.id + ' has ' + c.subQuestions.length + ' parts'); });
// wording rules: no slash, no em dash, no "AI" as a word, no stray underscore or caret in the bank
const text = JSON.stringify([topics, ENV10_MCQS, ENV10_ASSERTIONS, ENV10_VERY_SHORT, ENV10_SHORT, ENV10_LONG, ENV10_COMPETENCY, ENV10_NCERT_SOLVED, ENV10_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^ev_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
const bankText = JSON.stringify([ENV10_MCQS, ENV10_ASSERTIONS, ENV10_VERY_SHORT, ENV10_SHORT, ENV10_LONG, ENV10_COMPETENCY, ENV10_NCERT_SOLVED, ENV10_SELF_ASSESSMENT]);
const bs: string[] = []; JSON.parse(bankText, (_k, v) => { if (typeof v === 'string') bs.push(v); return v; });
bs.forEach((s) => { if (/_/.test(s) && !/^ev_/.test(s)) bad.push('underscore: ' + s.slice(0, 70)); if (/\^/.test(s)) bad.push('caret: ' + s.slice(0, 70)); });
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^ev_/.test(k)).length);
console.log('MCQ', ENV10_MCQS.length, '(assertion-reason inside:', arInMcq + ')', 'answer positions', dist(ENV10_MCQS), '| assertion set', ENV10_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', ENV10_VERY_SHORT.length, '| 3-mark', ENV10_SHORT.length, '| 4-mark', ENV10_LONG.length, '| passage', ENV10_COMPETENCY.length, '| solved NCERT', ENV10_NCERT_SOLVED.length);
console.log('total of the 150:', ENV10_MCQS.length + ENV10_VERY_SHORT.length + ENV10_SHORT.length + ENV10_LONG.length + ENV10_COMPETENCY.length);
console.log('self assessment', ENV10_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(ENV10_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(ENV10_MCQS), '2m', withDia(ENV10_VERY_SHORT), '3m', withDia(ENV10_SHORT), '4m', withDia(ENV10_LONG), 'passage', withDia(ENV10_COMPETENCY), 'solved', withDia(ENV10_NCERT_SOLVED), 'self', withDia(ENV10_SELF_ASSESSMENT));
const unused = Object.keys(DIAGRAMS).filter((k) => /^ev_/.test(k) && !used.has(k));
if (unused.length) console.log('diagrams not used anywhere:', unused.join(', '));
console.log(bad.length ? bad : 'all ok');
