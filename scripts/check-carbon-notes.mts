// Checks that every diagram named in the Carbon notes exists. Run: npx tsx scripts/check-carbon-notes.mts
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
import { CARBON_A } from '../src/data/carbonNotesA.ts';
import { CARBON_B } from '../src/data/carbonNotesB.ts';
import { CARBON_C } from '../src/data/carbonNotesC.ts';
const used = new Set<string>(); const bad: string[] = [];
for (const t of [...CARBON_A, ...CARBON_B, ...CARBON_C]) for (const b of t.blocks as any[]) {
  const ids: string[] = b.t === 'dia' ? [b.id] : b.t === 'dias' ? b.ids : b.t === 'mindmap' ? ['ch_mindmap'] : [];
  ids.forEach((i) => { used.add(i); if (!DIAGRAMS[i]) bad.push(t.id + ': missing diagram ' + i); });
}
console.log('topics', CARBON_A.length + CARBON_B.length + CARBON_C.length, 'diagrams used', used.size, 'of', Object.keys(DIAGRAMS).length);
console.log(bad.length ? bad : 'all diagrams found');
console.log('unused:', Object.keys(DIAGRAMS).filter((k) => !used.has(k)).join(', '));
