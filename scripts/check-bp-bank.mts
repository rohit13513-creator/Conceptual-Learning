// Checks the Baudhayana-Pythagoras notes and question bank: counts, marks, diagrams, wording, and every written equation is re-computed.
// Run: npx tsx scripts/check-bp-bank.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { BP_A } from '../src/data/bpNotesA.ts';
import { BP_B } from '../src/data/bpNotesB.ts';
import { BP_C } from '../src/data/bpNotesC.ts';
import { BP8_MCQS } from '../src/data/bp8_mcq.ts';
import { BP8_ASSERTIONS } from '../src/data/bp8_ar.ts';
import { BP8_VERY_SHORT, BP8_SHORT } from '../src/data/bp8_short.ts';
import { BP8_LONG } from '../src/data/bp8_long.ts';
import { BP8_COMPETENCY } from '../src/data/bp8_case.ts';
import { BP8_NCERT_SOLVED } from '../src/data/bp8_ncert.ts';
import { BP8_SELF_ASSESSMENT } from '../src/data/bp8_self.ts';

const bad: string[] = [];
const topics = [...BP_A, ...BP_B, ...BP_C];
const used = new Set<string>();
for (const t of topics) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'mindmap' ? ['bp_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
if (new Set(topics.map((t) => t.id)).size !== topics.length) bad.push('duplicate topic ids');
const dia = (list: any[], name: string) => list.forEach((x) => { if (x.diagram) { used.add(x.diagram); if (!DIAGRAMS[x.diagram]) bad.push(`${name} ${x.id}: missing diagram ${x.diagram}`); } });
const mcqCheck = (list: any[], name: string) => {
  list.forEach((q) => { if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) bad.push(name + ' ' + q.id); if (new Set(q.options).size !== 4 && !/^Assertion/.test(q.question)) bad.push(name + ' ' + q.id + ': repeated option'); });
  if (new Set(list.map((q) => q.id)).size !== list.length) bad.push('duplicate ids in ' + name);
  const seen = new Set<string>(); list.forEach((q) => { if (seen.has(q.question)) bad.push(name + ' repeated question: ' + q.question.slice(0, 60)); seen.add(q.question); });
  dia(list, name);
};
mcqCheck(BP8_MCQS, 'mcq'); mcqCheck(BP8_SELF_ASSESSMENT, 'self');
dia(BP8_VERY_SHORT, 'vs'); dia(BP8_SHORT, 's'); dia(BP8_LONG, 'long'); dia(BP8_COMPETENCY, 'comp'); dia(BP8_NCERT_SOLVED, 'ncert');
const arCount = (l: any[]) => l.filter((q) => /^Assertion/.test(q.question)).length;
const sum = (schemes: string[]) => schemes.reduce((a, s) => a + parseFloat((s.match(/:\s*([\d.]+) marks?/) || [])[1] || 'NaN'), 0);
BP8_LONG.forEach((q) => { const tot = sum(q.markingScheme); if (Math.abs(tot - 5) > 1e-9) bad.push('long ' + q.id + ' marks add to ' + tot); });
BP8_SHORT.forEach((q) => { const tot = sum(q.keyPoints); if (Math.abs(tot - 3) > 1e-9) bad.push('3-mark ' + q.id + ' marks add to ' + tot); });
BP8_VERY_SHORT.forEach((q) => { if (q.keyPoints.length !== 2) bad.push('2-mark ' + q.id + ' has ' + q.keyPoints.length + ' key points'); });
BP8_COMPETENCY.forEach((c) => { const m = c.subQuestions.map((x) => x.marks).join(''); if (m !== '112') bad.push('competency ' + c.id + ' marks ' + m); });

// every string, with a label
const all: [string, string][] = [];
const walk = (v: unknown, where: string) => { if (typeof v === 'string') all.push([where, v]); else if (Array.isArray(v)) v.forEach((x, i) => walk(x, where + '.' + i)); else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => { all.push([where, k]); walk(x, where); }); };
walk(topics, 'notes'); ([['mcq', BP8_MCQS], ['ar', BP8_ASSERTIONS], ['2m', BP8_VERY_SHORT], ['3m', BP8_SHORT], ['5m', BP8_LONG], ['case', BP8_COMPETENCY], ['ncert', BP8_NCERT_SOLVED], ['self', BP8_SELF_ASSESSMENT]] as [string, any[]][]).forEach(([n, l]) => l.forEach((x) => walk(x, n + ' ' + x.id)));
for (const [w, s] of all) {
  if (/—/.test(s)) bad.push(w + ' em dash: ' + s.slice(0, 60));
  if (/\bAI\b/.test(s)) bad.push(w + ' "AI": ' + s.slice(0, 60));
  if (!w.startsWith('notes') && /\[[^\]]+\|[^\]]+\]|\*\*|\^/.test(s)) bad.push(w + ' notes markup left in the bank: ' + s.slice(0, 60));
}

// re-compute the written equations
const SUPS: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
const norm = (s: string) => s.replace(/\*\*/g, '').replace(/\[([^\[\]|]+)\|([^\[\]|]+)\]/g, '(($1)/($2))').replace(/₹/g, '').replace(/(\d),(?=\d{2,3}\b)/g, '$1').replace(/(\d),(?=\d{2,3}\b)/g, '$1')
  .replace(/\^\{?(\d+)\}?/g, '^$1').replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (m) => '^' + [...m].map((c) => SUPS[c]).join('')).replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/').replace(/%\s*of\s+(?=[\d(])/g, '/100*').replace(/\^/g, '**');
// square roots are replaced by their value (with * 1 so that the equation is still compared)
const roots = (s: string) => { let x = s; for (let i = 0; i < 4; i++) x = x.replace(/(\d)?√\(([\d.+\-*/ ]+)\)/g, (m, k, e) => { try { const v = Math.sqrt(Function('return (' + e + ')')()); return (k ? k + '*' : '') + '(' + v + '*1)'; } catch { return m; } }).replace(/(\d)?√(\d+(?:\.\d+)?)/g, (_m, k, n) => (k ? k + '*' : '') + '(' + Math.sqrt(Number(n)) + '*1)'); return x; };
const value = (e: string): number | null => { try { if (/\d\s+\d/.test(e)) return null; const v = Function('"use strict";return (' + e.replace(/%/g, '') + ')')(); return typeof v === 'number' && Number.isFinite(v) ? v : null; } catch { return null; } };
let checked = 0;
for (const [w, s] of all) {
  const parts = roots(norm(s)).split(/(=|≈)/);
  for (let i = 1; i < parts.length; i += 2) {
    const approx = parts[i] === '≈';
    const lm = parts[i - 1].match(/[\d(][\d.+\-*/() %]*\s*$/);
    const rm = parts[i + 1].match(/^\s*-?[\d(][\d.+\-*/() %]*/);
    if (!lm || !rm) continue;
    const before = parts[i - 1].slice(0, lm.index).trimEnd();
    if (/[+\-*/]$/.test(before) || /\*\*$/.test(before)) continue; // the expression starts with a letter or a symbol
    let L = lm[0].trim(), R = rm[0].trim().replace(/[+\-*/(. ]+$/, '');
    if (!/[\d)%]\s*(\*\*|[+\-*/])\s*[\d(]/.test(L) && !/[\d)%]\s*(\*\*|[+\-*/])\s*[\d(]/.test(R)) continue;
    // a power such as (1.05)**4 is split by the pattern, so rebuild it
    const opens = (x: string) => (x.match(/\(/g) || []).length - (x.match(/\)/g) || []).length;
    while (opens(L) > 0) L = L.replace('(', ''); while (opens(L) < 0) L = L.replace(/\)(?!.*\))/, '');
    while (opens(R) > 0) R = R.replace(/\((?!.*\()/, ''); while (opens(R) < 0) R = R.replace(/\)(?!.*\))/, '');
    const a = value(L), b = value(R);
    if (a === null || b === null) continue;
    checked++;
    const tol = (x: number, y: number) => Math.abs(x - y) <= (approx ? Math.max(0.006, Math.abs(y) * 0.006) : Math.max(1e-6, Math.abs(y) * 1e-6));
    const pc = /%/.test(L + R);
    const decimals = (R.match(/\.(\d+)%?$/) || [])[1]?.length ?? 0;
    const rounded = decimals >= 2 && Math.abs(a - b) <= 0.0051;
    if (!(tol(a, b) || rounded || (pc && (tol(a * 100, b) || tol(a, b * 100))))) bad.push(`${w} equation: "${L}" gives ${a}, written ${R}   [${s.slice(0, 90)}]`);
  }
}

console.log('notes topics', topics.length, '| solved examples', topics.reduce((a, t) => a + t.blocks.filter((b: any) => b.t === 'ex').length, 0), '| diagrams used', used.size, 'of', Object.keys(DIAGRAMS).filter((k) => /^bp_/.test(k)).length);
console.log('MCQ', BP8_MCQS.length, '(assertion-reason inside', arCount(BP8_MCQS) + ') | assertion set', BP8_ASSERTIONS.length);
console.log('2-mark', BP8_VERY_SHORT.length, '| 3-mark', BP8_SHORT.length, '| 5-mark', BP8_LONG.length, '| case', BP8_COMPETENCY.length, '| total', BP8_MCQS.length + BP8_VERY_SHORT.length + BP8_SHORT.length + BP8_LONG.length + BP8_COMPETENCY.length);
console.log('solved NCERT', BP8_NCERT_SOLVED.length, '| self assessment', BP8_SELF_ASSESSMENT.length, '(assertion-reason', arCount(BP8_SELF_ASSESSMENT) + ')');
console.log('equations re-computed:', checked);
console.log(bad.length ? bad.join('\n') : 'all ok');
