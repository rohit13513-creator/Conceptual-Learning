// Checks the Carbon and its Compounds question bank. Run: npx tsx scripts/check-carbon-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { CARBON10_MCQ_A } from '../src/data/carbon10_mcqA.ts';
import { CARBON10_MCQ_B } from '../src/data/carbon10_mcqB.ts';
import { CARBON10_VERY_SHORT, CARBON10_SHORT } from '../src/data/carbon10_short.ts';
import { CARBON10_LONG, CARBON10_COMPETENCY } from '../src/data/carbon10_long.ts';
import { CARBON10_NCERT_SOLVED } from '../src/data/carbon10_ncert.ts';
const mcq = [...CARBON10_MCQ_A, ...CARBON10_MCQ_B];
const bad: string[] = [];
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram && !DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); });
mcq.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push('mcq ' + q.id); });
const ids = new Set(mcq.map((q) => q.id)); if (ids.size !== mcq.length) bad.push('duplicate mcq ids');
dia(mcq, 'mcq'); dia(CARBON10_VERY_SHORT, 'vs'); dia(CARBON10_SHORT, 's'); dia(CARBON10_LONG, 'long'); dia(CARBON10_COMPETENCY, 'comp'); dia(CARBON10_NCERT_SOLVED, 'ncert');
const dist = [0, 0, 0, 0]; mcq.forEach((q) => { if (q.options !== undefined) dist[q.correctAnswer]++; });
const withDia = (l: any[]) => l.filter((x) => x.diagram).length;
console.log('MCQ', mcq.length, 'answer positions', dist.join('/'), '| 2-mark', CARBON10_VERY_SHORT.length, '| 3-mark', CARBON10_SHORT.length, '| 5-mark', CARBON10_LONG.length, '| competency', CARBON10_COMPETENCY.length, '| solved', CARBON10_NCERT_SOLVED.length);
console.log('with a diagram: mcq', withDia(mcq), '2m', withDia(CARBON10_VERY_SHORT), '3m', withDia(CARBON10_SHORT), '5m', withDia(CARBON10_LONG), 'comp', withDia(CARBON10_COMPETENCY), 'solved', withDia(CARBON10_NCERT_SOLVED));
console.log(bad.length ? bad : 'all ok');
