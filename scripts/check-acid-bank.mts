// Checks the Acids, Bases and Salts notes and question bank. Run: npx tsx scripts/check-acid-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { ACID_A } from '../src/data/acidNotesA.ts';
import { ACID_B } from '../src/data/acidNotesB.ts';
import { ACID_C } from '../src/data/acidNotesC.ts';
import { ACID_D } from '../src/data/acidNotesD.ts';
import { ACID10_MCQS } from '../src/data/acid10_mcq.ts';
import { ACID10_ASSERTIONS } from '../src/data/acid10_ar.ts';
import { ACID10_VERY_SHORT, ACID10_SHORT } from '../src/data/acid10_short.ts';
import { ACID10_LONG, ACID10_COMPETENCY } from '../src/data/acid10_long.ts';
import { ACID10_NCERT_SOLVED } from '../src/data/acid10_ncert.ts';
import { ACID10_SELF_ASSESSMENT } from '../src/data/acid10_self.ts';

const bad: string[] = [];
const topics = [...ACID_A, ...ACID_B, ...ACID_C, ...ACID_D];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['abs_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram && !DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  dia(list, name);
};
mcqCheck(ACID10_MCQS, 'mcq'); mcqCheck(ACID10_SELF_ASSESSMENT, 'self');
dia(ACID10_VERY_SHORT, 'vs'); dia(ACID10_SHORT, 's'); dia(ACID10_LONG, 'long'); dia(ACID10_COMPETENCY, 'comp'); dia(ACID10_NCERT_SOLVED, 'ncert');
const dist = (l: any[]) => [0, 1, 2, 3].map((i) => l.filter((q) => q.correctAnswer === i).length).join('/');
const arInMcq = ACID10_MCQS.filter((q) => /^Assertion/.test(q.question)).length;
const arInSelf = ACID10_SELF_ASSESSMENT.filter((q) => /^Assertion/.test(q.question)).length;
const arDist = ['A', 'B', 'C', 'D'].map((o) => ACID10_ASSERTIONS.filter((q) => q.correctOption === o).length).join('/');
// wording rules: no slash, no em dash, no "AI" as a word
const text = JSON.stringify([topics, ACID10_MCQS, ACID10_ASSERTIONS, ACID10_VERY_SHORT, ACID10_SHORT, ACID10_LONG, ACID10_COMPETENCY, ACID10_NCERT_SOLVED, ACID10_SELF_ASSESSMENT]);
const strings: string[] = []; JSON.parse(text, (_k, v) => { if (typeof v === 'string') strings.push(v); return v; });
strings.forEach((s) => {
  if (/—/.test(s)) bad.push('em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push('"AI": ' + s.slice(0, 60));
  if (/\//.test(s) && !/^abs_/.test(s)) bad.push('slash: ' + s.slice(0, 70));
});
console.log('notes topics', topics.length, '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => k.startsWith('abs_')).length);
console.log('MCQ', ACID10_MCQS.length, '(assertion-reason inside:', arInMcq + ')', 'answer positions', dist(ACID10_MCQS), '| assertion set', ACID10_ASSERTIONS.length, 'A/B/C/D', arDist);
console.log('2-mark', ACID10_VERY_SHORT.length, '| 3-mark', ACID10_SHORT.length, '| 4-mark', ACID10_LONG.length, '| competency', ACID10_COMPETENCY.length, '| solved NCERT', ACID10_NCERT_SOLVED.length);
console.log('self assessment', ACID10_SELF_ASSESSMENT.length, '(assertion-reason:', arInSelf + ')', 'answer positions', dist(ACID10_SELF_ASSESSMENT));
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('with a diagram: mcq', withDia(ACID10_MCQS), '2m', withDia(ACID10_VERY_SHORT), '3m', withDia(ACID10_SHORT), '4m', withDia(ACID10_LONG), 'comp', withDia(ACID10_COMPETENCY), 'solved', withDia(ACID10_NCERT_SOLVED), 'self', withDia(ACID10_SELF_ASSESSMENT));
console.log(bad.length ? bad : 'all ok');
