// Overlap check for every Carbon-and-its-Compounds diagram. Run: npx tsx scripts/check-chem-diagrams.mts
import { checkScene } from '../src/components/sceneKit.ts';
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
let bad = 0;
const ids = Object.keys(DIAGRAMS);
for (const id of ids) {
  let issues: string[];
  try { issues = checkScene(DIAGRAMS[id]()); } catch (e: any) { issues = ['ERROR ' + e.message]; }
  if (issues.length) { bad++; console.log(id + ': ' + issues.slice(0, 6).join('; ')); }
}
console.log(ids.length, 'diagrams,', bad, 'with issues');
