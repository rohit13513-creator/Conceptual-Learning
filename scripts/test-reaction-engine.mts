// Tests for the Reaction Simulator engine (reactionEngine.ts):
//  1. every reactant the simulator offers, in every pair, either gets a balanced answer or is left to the older code (null);
//  2. every returned equation has the same atoms on both sides;
//  3. no placeholder text such as "_Product" is ever returned;
//  4. named school reactions give the expected products.
import fs from "node:fs";
import { simulateStandardReaction, parseFormula } from "../reactionEngine";

const src = fs.readFileSync("src/components/ReactionSimulator.tsx", "utf8");
const block = src.slice(src.indexOf("const SUPPORTED_REACTANTS_BASE"), src.indexOf("export const SUPPORTED_REACTANTS:"));
const palette = Array.from(new Set(Array.from(block.matchAll(/formula: "([^"]+)"/g)).map((m) => m[1])));

let bad = 0;
const fail = (m: string) => { bad++; if (bad < 40) console.log("PROBLEM:", m); };

const atomsOfSide = (side: string) => {
  const total: Record<string, number> = {};
  for (const part of side.split(" + ")) {
    const m = part.trim().match(/^(\d+)?(.+?)\((s|l|g|aq)\)$/);
    if (!m) return null;
    const k = m[1] ? parseInt(m[1], 10) : 1;
    const a = parseFormula(m[2]);
    if (!a) return null;
    for (const [el, n] of Object.entries(a)) total[el] = (total[el] || 0) + n * k;
  }
  return total;
};
const sameAtoms = (a: Record<string, number>, b: Record<string, number>) => Object.keys({ ...a, ...b }).every((k) => (a[k] || 0) === (b[k] || 0));

const check = (a: string, b: string, T = 25, conc = "concentrated") => {
  const r = simulateStandardReaction({ reactants: [{ formula: a, concentration: conc }, { formula: b, concentration: conc }], temperatureC: T });
  if (!r) return null;
  const text = JSON.stringify(r);
  if (/_Product|Transformed|Residue/.test(text)) fail(`${a} + ${b}: placeholder text`);
  for (const k of ["deltaH_rxn", "deltaS_rxn"] as const) if (!Number.isFinite(r[k])) fail(`${a} + ${b}: ${k} not a number`);
  if (!r.balancedEquation || !r.conceptualExplanationFoundational) fail(`${a} + ${b}: empty text`);
  if (r.reactionFeasible && !/Dissolution|Ionisation/.test(r.reactionClass)) {
    const [l, rt] = r.balancedEquation.split(" → ");
    const al = atomsOfSide(l), ar = atomsOfSide(rt || "");
    if (!al || !ar) fail(`${a} + ${b}: cannot read equation "${r.balancedEquation}"`);
    else if (!sameAtoms(al, ar)) fail(`${a} + ${b}: NOT BALANCED "${r.balancedEquation}"`);
  }
  return r;
};

let answered = 0, left = 0;
for (let i = 0; i < palette.length; i++) {
  for (let j = i; j < palette.length; j++) {
    for (const T of [25, 120]) {
      const r = check(palette[i], palette[j], T);
      if (T === 25) { if (r) answered++; else left++; }
    }
  }
}
console.log(`palette of ${palette.length} reactants: ${answered} pairs answered by the engine, ${left} left to the older code`);

const inorganic = ["HCl", "HNO3", "H2SO4", "CH3COOH", "HBr", "H2CO3", "NaOH", "KOH", "Ca(OH)2", "NH3", "NH4OH", "MgO", "CaO", "CuO", "ZnO", "Na", "K", "Mg", "Zn", "Fe", "Cu", "Al", "Ag", "CaCO3", "Na2CO3", "NaHCO3", "MgCO3", "ZnCO3", "CuSO4", "ZnSO4", "FeSO4", "MgSO4", "BaCl2", "NaCl", "Na2SO4", "NH4Cl", "AgNO3", "Pb(NO3)2", "KI", "FeCl3", "CuCl2", "H2O", "O2", "Cl2", "CO2", "H2", "Br2"];
const gaps: string[] = [];
for (let i = 0; i < inorganic.length; i++) for (let j = i; j < inorganic.length; j++) {
  const r = simulateStandardReaction({ reactants: [{ formula: inorganic[i], concentration: "dilute" }, { formula: inorganic[j], concentration: "dilute" }], temperatureC: 25 });
  if (!r && inorganic[i] !== inorganic[j]) gaps.push(inorganic[i] + " + " + inorganic[j]);
}
console.log("inorganic reactants:", inorganic.length, " pairs left to the older code:", gaps.length);
if (process.argv.includes("--gaps")) console.log(gaps.join(String.fromCharCode(10)));
// named reactions: [reactant A, reactant B, text that must be in the balanced equation]
const expect: [string, string, string, string?, number?][] = [
  ["HCl", "NaOH", "HCl(aq) + NaOH(aq) → NaCl(aq) + H2O(l)"],
  ["HNO3", "NaOH", "HNO3(aq) + NaOH(aq) → NaNO3(aq) + H2O(l)"],
  ["HNO3", "KOH", "HNO3(aq) + KOH(aq) → KNO3(aq) + H2O(l)"],
  ["H2SO4", "NaOH", "H2SO4(aq) + 2NaOH(aq) → Na2SO4(aq) + 2H2O(l)"],
  ["H2SO4", "KOH", "H2SO4(aq) + 2KOH(aq) → K2SO4(aq) + 2H2O(l)"],
  ["HCl", "Ca(OH)2", "2HCl(aq) + Ca(OH)2(aq) → CaCl2(aq) + 2H2O(l)"],
  ["HNO3", "Ca(OH)2", "2HNO3(aq) + Ca(OH)2(aq) → Ca(NO3)2(aq) + 2H2O(l)"],
  ["H2SO4", "Ca(OH)2", "H2SO4(aq) + Ca(OH)2(aq) → CaSO4(s) + 2H2O(l)"],
  ["HCl", "Mg(OH)2", "2HCl(aq) + Mg(OH)2(s) → MgCl2(aq) + 2H2O(l)"],
  ["HNO3", "NH3", "HNO3(aq) + NH3(g) → NH4NO3(aq)"],
  ["HCl", "NH4OH", "HCl(aq) + NH4OH(aq) → NH4Cl(aq) + H2O(l)"],
  ["H2SO4", "NH3", "H2SO4(aq) + 2NH3(g) → (NH4)2SO4(aq)"],
  ["CH3COOH", "NaOH", "CH3COOH(aq) + NaOH(aq) → CH3COONa(aq) + H2O(l)"],
  ["HCl", "CaO", "2HCl(aq) + CaO(s) → CaCl2(aq) + H2O(l)"],
  ["HNO3", "CuO", "2HNO3(aq) + CuO(s) → Cu(NO3)2(aq) + H2O(l)"],
  ["HCl", "CaCO3", "2HCl(aq) + CaCO3(s) → CaCl2(aq) + H2O(l) + CO2(g)"],
  ["HNO3", "Na2CO3", "2HNO3(aq) + Na2CO3(aq) → 2NaNO3(aq) + H2O(l) + CO2(g)"],
  ["H2SO4", "NaHCO3", "H2SO4(aq) + 2NaHCO3(aq) → Na2SO4(aq) + 2H2O(l) + 2CO2(g)"],
  ["Zn", "HCl", "Zn(s) + 2HCl(aq) → ZnCl2(aq) + H2(g)"],
  ["Mg", "H2SO4", "Mg(s) + H2SO4(aq) → MgSO4(aq) + H2(g)", "dilute"],
  ["Al", "HCl", "2Al(s) + 6HCl(aq) → 2AlCl3(aq) + 3H2(g)"],
  ["Fe", "HCl", "Fe(s) + 2HCl(aq) → FeCl2(aq) + H2(g)"],
  ["Cu", "HNO3", "Cu(s) + 4HNO3(aq) → Cu(NO3)2(aq) + 2NO2(g) + 2H2O(l)", "concentrated"],
  ["Cu", "HNO3", "3Cu(s) + 8HNO3(aq) → 3Cu(NO3)2(aq) + 2NO(g) + 4H2O(l)", "dilute"],
  ["Cu", "AgNO3", "Cu(s) + 2AgNO3(aq) → Cu(NO3)2(aq) + 2Ag(s)"],
  ["Zn", "CuSO4", "Zn(s) + CuSO4(aq) → ZnSO4(aq) + Cu(s)"],
  ["Al", "CuSO4", "2Al(s) + 3CuSO4(aq) → Al2(SO4)3(aq) + 3Cu(s)"],
  ["AgNO3", "NaCl", "AgNO3(aq) + NaCl(aq) → AgCl(s) + NaNO3(aq)"],
  ["Pb(NO3)2", "KI", "Pb(NO3)2(aq) + 2KI(aq) → PbI2(s) + 2KNO3(aq)"],
  ["CuSO4", "NaOH", "CuSO4(aq) + 2NaOH(aq) → Cu(OH)2(s) + Na2SO4(aq)"],
  ["FeCl3", "NaOH", "FeCl3(aq) + 3NaOH(aq) → Fe(OH)3(s) + 3NaCl(aq)"],
  ["BaCl2", "H2SO4", "BaCl2(aq) + H2SO4(aq) → BaSO4(s) + 2HCl(aq)"],
  ["NH4Cl", "NaOH", "NH4Cl(aq) + NaOH(aq) → NaCl(aq) + NH3(g) + H2O(l)"],
  ["CaO", "H2O", "CaO(s) + H2O(l) → Ca(OH)2(s)"],
  ["CO2", "Ca(OH)2", "CO2(g) + Ca(OH)2(aq) → CaCO3(s) + H2O(l)"],
  ["Cl2", "KI", "Cl2(g) + 2KI(aq) → 2KCl(aq) + I2(s)"],
  ["Mg", "O2", "2Mg(s) + O2(g) → 2MgO(s)"],
  ["CuO", "H2", "CuO(s) + H2(g) → Cu(s) + H2O(l)"],
  ["Fe", "H2O", "3Fe(s) + 4H2O(l) → Fe3O4(s) + 4H2(g)", "concentrated", 150],
];
for (const [a, b, eq, conc, T] of expect) {
  const r = check(a, b, T || 25, conc || "concentrated");
  if (!r) fail(`${a} + ${b}: no answer (expected ${eq})`);
  else if (!r.balancedEquation.includes(eq)) fail(`${a} + ${b}: got "${r.balancedEquation}" but expected "${eq}"`);
}
// reactions that must NOT happen
for (const [a, b] of [["Cu", "HCl"], ["Cu", "ZnSO4"], ["NaCl", "KNO3"], ["Ag", "H2SO4"], ["Fe", "MgSO4"], ["NaCl", "Na2SO4"], ["HCl", "HNO3"], ["NaOH", "KOH"]] as const) {
  const r = check(a, b, 25, "dilute");
  if (!r) fail(`${a} + ${b}: no answer (expected "no reaction")`);
  else if (r.reactionFeasible) fail(`${a} + ${b}: should be no reaction but got "${r.balancedEquation}"`);
}
console.log(bad ? `${bad} problem(s)` : "all checks pass");
process.exit(bad ? 1 : 0);
