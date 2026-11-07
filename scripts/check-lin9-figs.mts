// Overlap checker for the Two Variables, One Line figures: every graph and shape must have no label touching a line, a point or another label.
import * as F from "../src/data/lin9Figs";
import { layoutGraph } from "../src/components/graphLayout";
import { layoutFigure } from "../src/components/geoLayout";

import { SELF_FIGS, SELF_RAMPS } from "../src/data/lin9_self";

let bad = 0, n = 0;
for (const [name, spec] of Object.entries({ ...SELF_FIGS, SELF_RAMPS } as Record<string, any>)) {
  n++;
  const issues: string[] = spec.graph ? layoutGraph(spec.graph, spec.w ?? 320, spec.h ?? 280).issues : layoutFigure(spec).issues;
  if (issues.length) { bad++; console.log("self:" + name, issues); }
}
for (const [name, fn] of Object.entries(F)) {
  const spec = (fn as any)();
  n++;
  const issues: string[] = spec.graph ? layoutGraph(spec.graph, spec.w ?? 320, spec.h ?? 280).issues : layoutFigure(spec).issues;
  if (issues.length) { bad++; console.log(name, issues); }
}
console.log(`${n} figures checked, ${bad} with problems`);
process.exit(bad ? 1 : 0);
