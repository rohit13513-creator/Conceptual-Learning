// Checks the Metals and Non-metals notes and question bank. Run: npx tsx scripts/check-mnm-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { MNM_A } from '../src/data/mnmNotesA.ts';
import { MNM_B } from '../src/data/mnmNotesB.ts';
import { MNM_C } from '../src/data/mnmNotesC.ts';
import { MNM_D } from '../src/data/mnmNotesD.ts';
import { MNM10_MCQS } from '../src/data/mnm10_mcq.ts';
import { MNM10_ASSERTIONS } from '../src/data/mnm10_ar.ts';
import { MNM10_VERY_SHORT, MNM10_SHORT } from '../src/data/mnm10_short.ts';
import { MNM10_LONG, MNM10_COMPETENCY } from '../src/data/mnm10_long.ts';
import { MNM10_NCERT_SOLVED } from '../src/data/mnm10_ncert.ts';
import { MNM10_SELF_ASSESSMENT } from '../src/data/mnm10_self.ts';

const bad: string[] = [];
const topics = [...MNM_A, ...MNM_B, ...MNM_C, ...MNM_D];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['mnm_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram && !DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(MNM10_MCQS, 'mcq'); mcqCheck(MNM10_SELF_ASSESSMENT, 'self');
dia(MNM10_VERY_SHORT, 'vs'); dia(MNM10_SHORT, 's'); dia(MNM10_LONG, 'long'); dia(MNM10_COMPETENCY, 'comp'); dia(MNM10_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = MNM10_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = MNM10_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => MNM10_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
// wording rules: no slash, no em dash, no "AI" as a word
const text = JSON.stringify([topics, MNM10_MCQS, MNM10_ASSERTIONS, MNM10_VERY_SHORT, MNM10_SHORT, MNM10_LONG, MNM10_COMPETENCY, MNM10_NCERT_SOLVED, MNM10_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^mnm_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => k.startsWith('mnm_')).length);
console.log('MCQ', MNM10_MCQS.length, '(assertion-reason inside:', arInMcq + ')', 'answer positions', dist(MNM10_MCQS), '| assertion set', MNM10_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', MNM10_VERY_SHORT.length, '| 3-mark', MNM10_SHORT.length, '| 4-mark', MNM10_LONG.length, '| competency', MNM10_COMPETENCY.length, '| solved NCERT', MNM10_NCERT_SOLVED.length);
console.log('self assessment', MNM10_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(MNM10_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(MNM10_MCQS), '2m', withDia(MNM10_VERY_SHORT), '3m', withDia(MNM10_SHORT), '4m', withDia(MNM10_LONG), 'comp', withDia(MNM10_COMPETENCY), 'solved', withDia(MNM10_NCERT_SOLVED), 'self', withDia(MNM10_SELF_ASSESSMENT));
console.log(bad.length ? bad : 'all ok');
