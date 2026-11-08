// A rule-based chemistry engine for the Reaction Simulator: acids, bases, salts, metals, oxides and gases at school level.
//
// Why it exists: the simulator used to answer only a short hand-written list of reactions (and, when a Gemini key was set,
// asked an AI). On the live site there is no key, so every other combination (for example nitric acid with a base) fell into a
// catch-all that printed placeholder products such as "HNO3_Product". This engine works out the products from the type of each
// substance, balances the equation with an exact matrix method, and takes the energy from tabulated enthalpies and entropies of
// formation. It returns null when it is not sure, and the caller then uses the older code.
//
// Every equation it returns is balanced by construction. scripts/test-reaction-engine.mts re-checks that for thousands of pairs.

export type Atoms = Record<string, number>;

const MASS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305,
  Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Ti: 47.867, Cr: 51.996, Mn: 54.938,
  Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Br: 79.904, Ag: 107.868, Sn: 118.71, I: 126.904, Ba: 137.327,
  Au: 196.967, Hg: 200.592, Pb: 207.2,
};

// ── formula parsing ─────────────────────────────────────────────────────────
const SUB = /[₀-₉]/g;

function parseGroup(s: string): Atoms | null {
  const stack: Atoms[] = [{}];
  let i = 0;
  const addTo = (t: Atoms, el: string, n: number) => { t[el] = (t[el] || 0) + n; };
  while (i < s.length) {
    const ch = s[i];
    if (ch === "(") { stack.push({}); i++; continue; }
    if (ch === ")") {
      if (stack.length < 2) return null;
      i++;
      let num = "";
      while (i < s.length && /\d/.test(s[i])) num += s[i++];
      const mult = num ? parseInt(num, 10) : 1;
      const top = stack.pop()!;
      for (const [el, n] of Object.entries(top)) addTo(stack[stack.length - 1], el, n * mult);
      continue;
    }
    if (/[A-Z]/.test(ch)) {
      let el = ch; i++;
      if (i < s.length && /[a-z]/.test(s[i])) el += s[i++];
      if (!(el in MASS)) return null;
      let num = "";
      while (i < s.length && /\d/.test(s[i])) num += s[i++];
      addTo(stack[stack.length - 1], el, num ? parseInt(num, 10) : 1);
      continue;
    }
    return null;
  }
  return stack.length === 1 ? stack[0] : null;
}

/** Atom counts of a formula such as Ca(OH)2, (NH4)2SO4 or CuSO4·5H2O. Returns null if it cannot be read. */
export function parseFormula(raw: string): Atoms | null {
  const s = raw.replace(/\s+/g, "").replace(SUB, (c) => String(c.charCodeAt(0) - 0x2080));
  if (!s) return null;
  const parts = s.split(/[·.•*]/);
  const total: Atoms = {};
  for (let k = 0; k < parts.length; k++) {
    let body = parts[k];
    let mult = 1;
    if (k > 0) { const m = body.match(/^(\d+)(.*)$/); if (m) { mult = parseInt(m[1], 10); body = m[2]; } }
    const a = parseGroup(body);
    if (!a) return null;
    for (const [el, n] of Object.entries(a)) total[el] = (total[el] || 0) + n * mult;
  }
  return total;
}

export function molarMass(atoms: Atoms): number {
  return Object.entries(atoms).reduce((m, [el, n]) => m + (MASS[el] || 0) * n, 0);
}

// ── exact equation balancing ────────────────────────────────────────────────
type Frac = [number, number];
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);
const fr = (n: number, d = 1): Frac => { const g = gcd(n, d) || 1; const s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
const fsub = (a: Frac, b: Frac): Frac => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fmul = (a: Frac, b: Frac): Frac => fr(a[0] * b[0], a[1] * b[1]);
const fdiv = (a: Frac, b: Frac): Frac => fr(a[0] * b[1], a[1] * b[0]);

/** Smallest whole-number coefficients that balance the equation, or null if there is no single balanced solution. */
export function balance(reactants: Atoms[], products: Atoms[]): number[] | null {
  const cols = reactants.length + products.length;
  const els = Array.from(new Set([...reactants, ...products].flatMap((a) => Object.keys(a))));
  const M: Frac[][] = els.map((el) => [...reactants.map((a) => fr(a[el] || 0)), ...products.map((a) => fr(-(a[el] || 0)))]);
  const pivotCol: number[] = [];
  let r = 0;
  for (let c = 0; c < cols && r < M.length; c++) {
    let p = -1;
    for (let k = r; k < M.length; k++) if (M[k][c][0] !== 0) { p = k; break; }
    if (p < 0) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const pv = M[r][c];
    M[r] = M[r].map((x) => fdiv(x, pv));
    for (let k = 0; k < M.length; k++) {
      if (k === r || M[k][c][0] === 0) continue;
      const f = M[k][c];
      M[k] = M[k].map((x, j) => fsub(x, fmul(f, M[r][j])));
    }
    pivotCol.push(c);
    r++;
  }
  const free = Array.from({ length: cols }, (_, i) => i).filter((c) => !pivotCol.includes(c));
  if (free.length !== 1) return null;
  const f = free[0];
  const x: Frac[] = Array.from({ length: cols }, () => fr(0));
  x[f] = fr(1);
  pivotCol.forEach((pc, row) => { x[pc] = fmul(fr(-1), M[row][f]); });
  const den = x.reduce((l, v) => lcm(l, v[1]), 1);
  let ints = x.map((v) => (v[0] * den) / v[1]);
  const g = ints.reduce((a, v) => gcd(a, v), 0) || 1;
  ints = ints.map((v) => v / g);
  if (ints.some((v) => v <= 0)) return null;
  return ints;
}

// ── ions and ionic compounds ────────────────────────────────────────────────
interface Cation { sym: string; name: string; charges: number[]; poly?: boolean }
interface Anion { sym: string; name: string; charge: number; poly?: boolean }

const CATIONS: Cation[] = [
  { sym: "Li", name: "Lithium", charges: [1] }, { sym: "Na", name: "Sodium", charges: [1] }, { sym: "K", name: "Potassium", charges: [1] },
  { sym: "Ag", name: "Silver", charges: [1] }, { sym: "NH4", name: "Ammonium", charges: [1], poly: true },
  { sym: "Mg", name: "Magnesium", charges: [2] }, { sym: "Ca", name: "Calcium", charges: [2] }, { sym: "Ba", name: "Barium", charges: [2] },
  { sym: "Zn", name: "Zinc", charges: [2] }, { sym: "Cu", name: "Copper", charges: [2] }, { sym: "Pb", name: "Lead", charges: [2] },
  { sym: "Fe", name: "Iron", charges: [2, 3] }, { sym: "Al", name: "Aluminium", charges: [3] }, { sym: "H", name: "Hydrogen", charges: [1] },
];
const ANIONS: Anion[] = [
  { sym: "Cl", name: "Chloride", charge: 1 }, { sym: "Br", name: "Bromide", charge: 1 }, { sym: "I", name: "Iodide", charge: 1 }, { sym: "F", name: "Fluoride", charge: 1 },
  { sym: "NO3", name: "Nitrate", charge: 1, poly: true }, { sym: "CH3COO", name: "Acetate", charge: 1, poly: true },
  { sym: "HCO3", name: "Hydrogen Carbonate", charge: 1, poly: true }, { sym: "OH", name: "Hydroxide", charge: 1, poly: true },
  { sym: "SO4", name: "Sulfate", charge: 2, poly: true }, { sym: "SO3", name: "Sulfite", charge: 2, poly: true },
  { sym: "CO3", name: "Carbonate", charge: 2, poly: true }, { sym: "S", name: "Sulfide", charge: 2 }, { sym: "O", name: "Oxide", charge: 2 },
  { sym: "PO4", name: "Phosphate", charge: 3, poly: true },
];

type Kind = "metal" | "nonmetal" | "acid" | "hydroxide" | "basicOxide" | "acidicOxide" | "carbonate" | "salt" | "water" | "ammonia" | "gas";

export interface Species {
  formula: string;      // canonical formula without water of crystallisation
  input: string;        // as the student chose it (may carry water of crystallisation)
  name: string;
  kind: Kind;
  atoms: Atoms;
  state: "s" | "l" | "g" | "aq";
  cat?: Cation; q?: number; an?: Anion; nc?: number; na?: number;
  weak?: boolean;
  hydrate?: number;
  forceSolid?: boolean;
  mass: number;
}

function ionicFormula(c: Cation, q: number, a: Anion): { formula: string; nc: number; na: number } {
  const g = gcd(q, a.charge);
  const nc = a.charge / g, na = q / g;
  const cp = nc > 1 ? (c.poly ? `(${c.sym})${nc}` : `${c.sym}${nc}`) : c.sym;
  const ap = na > 1 ? (a.poly ? `(${a.sym})${na}` : `${a.sym}${na}`) : a.sym;
  let formula = cp + ap;
  if (a.sym === "CH3COO" && na === 1) formula = "CH3COO" + cp;
  return { formula, nc, na };
}

const ACID_NAMES: Record<string, string> = {
  HCl: "Hydrochloric Acid", HBr: "Hydrobromic Acid", HI: "Hydroiodic Acid", HF: "Hydrofluoric Acid", HNO3: "Nitric Acid", H2SO4: "Sulfuric Acid",
  H3PO4: "Phosphoric Acid", H2CO3: "Carbonic Acid", CH3COOH: "Ethanoic (Acetic) Acid", H2S: "Hydrogen Sulfide (Hydrosulfuric Acid)", H2SO3: "Sulfurous Acid",
};
const WEAK_ACIDS = new Set(["CH3COOH", "H2CO3", "HF", "H3PO4", "H2S", "H2SO3"]);
const ACIDIC_OXIDE_ANION: Record<string, string> = { CO2: "CO3", SO2: "SO3", SO3: "SO4", P2O5: "PO4" };

const KNOWN = new Map<string, Species>();
const KNOWN_UPPER = new Map<string, string>();

function register(sp: Species) {
  KNOWN.set(sp.formula, sp);
  if (!KNOWN_UPPER.has(sp.formula.toUpperCase())) KNOWN_UPPER.set(sp.formula.toUpperCase(), sp.formula);
}

function build() {
  for (const c of CATIONS) {
    for (const q of c.charges) {
      for (const a of ANIONS) {
        if (c.sym === "H" && (a.sym === "OH" || a.sym === "O" || a.sym === "HCO3")) continue;
        const { formula, nc, na } = ionicFormula(c, q, a);
        const atoms = parseFormula(formula);
        if (!atoms) continue;
        let kind: Kind = "salt";
        let name = `${c.name}${c.charges.length > 1 || c.sym === "Cu" || c.sym === "Pb" ? `(${["", "I", "II", "III"][q]})` : ""} ${a.name}`;
        if (c.sym === "H") { kind = "acid"; name = ACID_NAMES[formula] || `${a.name} Acid`; }
        else if (a.sym === "OH") kind = "hydroxide";
        else if (a.sym === "O") { kind = "basicOxide"; name = name.replace(" Oxide", " Oxide"); }
        else if (a.sym === "CO3" || a.sym === "HCO3") kind = "carbonate";
        if (formula === "CaO") name = "Calcium Oxide (Quicklime)";
        if (formula === "Ca(OH)2") name = "Calcium Hydroxide (Slaked Lime)";
        if (formula === "NaHCO3") name = "Sodium Hydrogen Carbonate (Baking Soda)";
        const sp: Species = { formula, input: formula, name, kind, atoms, state: kind === "basicOxide" ? "s" : "aq", cat: c, q, an: a, nc, na, weak: kind === "acid" ? WEAK_ACIDS.has(formula) : undefined, mass: molarMass(atoms) };
        register(sp);
      }
    }
  }
  const add = (formula: string, name: string, kind: Kind, state: Species["state"], extra: Partial<Species> = {}) => {
    const atoms = parseFormula(formula)!;
    register({ formula, input: formula, name, kind, atoms, state, mass: molarMass(atoms), ...extra });
  };
  add("H2O", "Water", "water", "l");
  add("NH3", "Ammonia", "ammonia", "g");
  for (const [f, n] of [["O2", "Oxygen"], ["H2", "Hydrogen"], ["Cl2", "Chlorine"], ["N2", "Nitrogen"], ["F2", "Fluorine"]] as const) add(f, n, "nonmetal", "g");
  add("Br2", "Bromine", "nonmetal", "l"); add("I2", "Iodine", "nonmetal", "s"); add("S", "Sulfur", "nonmetal", "s"); add("C", "Carbon", "nonmetal", "s");
  add("CO2", "Carbon Dioxide", "acidicOxide", "g"); add("SO2", "Sulfur Dioxide", "acidicOxide", "g"); add("SO3", "Sulfur Trioxide", "acidicOxide", "g");
  add("P2O5", "Phosphorus Pentoxide", "acidicOxide", "s");
  add("CO", "Carbon Monoxide", "gas", "g"); add("NO", "Nitric Oxide", "gas", "g"); add("NO2", "Nitrogen Dioxide", "gas", "g");
  add("Fe3O4", "Iron(II,III) Oxide (Magnetite)", "basicOxide", "s");
  add("NaOCl", "Sodium Hypochlorite", "salt", "aq"); add("KOCl", "Potassium Hypochlorite", "salt", "aq");
  add("NaAlO2", "Sodium Aluminate", "salt", "aq"); add("Na2ZnO2", "Sodium Zincate", "salt", "aq");
}
build();

interface MetalInfo { name: string; valency: number; rank: number; water: "cold" | "hot" | "steam" | "none"; }
const REACT_ORDER = ["K", "Na", "Li", "Ba", "Ca", "Mg", "Al", "Zn", "Fe", "Sn", "Pb", "H", "Cu", "Hg", "Ag", "Au"];
const METALS: Record<string, MetalInfo> = {
  K: { name: "Potassium", valency: 1, rank: 0, water: "cold" }, Na: { name: "Sodium", valency: 1, rank: 1, water: "cold" }, Li: { name: "Lithium", valency: 1, rank: 2, water: "cold" },
  Ba: { name: "Barium", valency: 2, rank: 3, water: "cold" }, Ca: { name: "Calcium", valency: 2, rank: 4, water: "cold" }, Mg: { name: "Magnesium", valency: 2, rank: 5, water: "hot" },
  Al: { name: "Aluminium", valency: 3, rank: 6, water: "steam" }, Zn: { name: "Zinc", valency: 2, rank: 7, water: "steam" }, Fe: { name: "Iron", valency: 2, rank: 8, water: "steam" },
  Sn: { name: "Tin", valency: 2, rank: 9, water: "none" }, Pb: { name: "Lead", valency: 2, rank: 10, water: "none" }, Cu: { name: "Copper", valency: 2, rank: 12, water: "none" },
  Ag: { name: "Silver", valency: 1, rank: 14, water: "none" },
};
const HRANK = REACT_ORDER.indexOf("H");
const ALKALI_LIKE = new Set(["K", "Na", "Li", "Ba", "Ca"]);
const DIATOMIC: Record<string, string> = { O: "O2", H: "H2", Cl: "Cl2", N: "N2", F: "F2", Br: "Br2", I: "I2" };

/** Reads what the student chose (a formula, a symbol or a common name) and says what the substance is. */
export function identify(inputRaw: string): Species | null {
  let input = (inputRaw || "").trim().replace(/\s+/g, " ");
  if (!input) return null;
  const NAMES: Record<string, string> = {
    "WATER": "H2O", "HYDROCHLORIC ACID": "HCl", "NITRIC ACID": "HNO3", "SULFURIC ACID": "H2SO4", "SULPHURIC ACID": "H2SO4", "PHOSPHORIC ACID": "H3PO4",
    "SODIUM HYDROXIDE": "NaOH", "POTASSIUM HYDROXIDE": "KOH", "CALCIUM HYDROXIDE": "Ca(OH)2", "SLAKED LIME": "Ca(OH)2", "AMMONIA": "NH3",
    "AMMONIUM HYDROXIDE": "NH4OH", "ACETIC ACID": "CH3COOH", "ETHANOIC ACID": "CH3COOH", "QUICKLIME": "CaO", "BAKING SODA": "NaHCO3",
    "CARBON DIOXIDE": "CO2", "OXYGEN": "O2", "HYDROGEN": "H2", "CHLORINE": "Cl2", "COPPER SULFATE": "CuSO4", "COPPER(II) SULFATE": "CuSO4",
  };
  const up = input.toUpperCase();
  if (NAMES[up]) input = NAMES[up];
  // water of crystallisation: keep it for display, work with the plain formula
  let hydrate = 0;
  const hm = input.match(/^(.*?)\s*[·.•*]\s*(\d*)\s*H2O$/i);
  let body = input;
  if (hm) { body = hm[1].trim(); hydrate = hm[2] ? parseInt(hm[2], 10) : 1; }
  if (!/^[A-Za-z0-9()₀-₉]+$/.test(body)) return null;
  body = body.replace(SUB, (c) => String(c.charCodeAt(0) - 0x2080));
  let sp = KNOWN.get(body);
  if (!sp) {
    const canon = KNOWN_UPPER.get(body.toUpperCase());
    if (canon) sp = KNOWN.get(canon);
  }
  if (!sp) {
    // a metal given by its symbol, or an element given by its atomic symbol
    const sym = body.length <= 2 ? body[0].toUpperCase() + body.slice(1).toLowerCase() : "";
    if (METALS[sym]) {
      const m = METALS[sym];
      sp = { formula: sym, input: sym, name: `${m.name} Metal`, kind: "metal", atoms: { [sym]: 1 }, state: "s", mass: MASS[sym] };
    } else if (DIATOMIC[sym]) sp = KNOWN.get(DIATOMIC[sym]);
  }
  if (!sp) return null;
  if (hydrate > 0 && (sp.kind === "salt" || sp.kind === "carbonate")) {
    const total = parseFormula(`${sp.formula}·${hydrate}H2O`);
    return { ...sp, input: `${sp.formula}·${hydrate === 1 ? "" : hydrate}H2O`, hydrate, mass: total ? molarMass(total) : sp.mass };
  }
  if (hydrate > 0) return null;
  return { ...sp };
}

// ── solubility, colours, names ──────────────────────────────────────────────
function soluble(sp: Species): boolean {
  if (sp.kind === "acid" || sp.kind === "ammonia" || sp.kind === "water") return true;
  if (!sp.cat || !sp.an) return sp.kind === "salt" || sp.kind === "gas";
  const c = sp.cat.sym, a = sp.an.sym;
  if (["Li", "Na", "K", "NH4", "H"].includes(c)) return true;
  if (a === "NO3" || a === "CH3COO") return true;
  if (a === "Cl" || a === "Br" || a === "I") return !(c === "Ag" || c === "Pb");
  if (a === "SO4") return !["Ba", "Pb", "Ca", "Ag"].includes(c);
  if (a === "OH") return c === "Ba" || c === "Ca";
  if (a === "F") return !["Ca", "Ba", "Mg", "Pb"].includes(c);
  return false; // carbonates, phosphates, sulfides, sulfites, oxides of other metals
}

const PPT_COLOUR: Record<string, string> = {
  AgCl: "white", AgBr: "yellow", AgI: "yellow", PbCl2: "white", PbBr2: "white", PbI2: "yellow", BaSO4: "white", PbSO4: "white", CaSO4: "white", Ag2SO4: "white",
  "Cu(OH)2": "blue", "Fe(OH)3": "brown", "Fe(OH)2": "green", "Zn(OH)2": "white", "Mg(OH)2": "white", "Al(OH)3": "white", "Pb(OH)2": "white",
  CaCO3: "white", BaCO3: "white", MgCO3: "white", ZnCO3: "white", CuCO3: "green", PbCO3: "white", FeCO3: "grey", Ag2CO3: "yellow",
  CuS: "black", PbS: "black", FeS: "black", Ag2S: "black", ZnS: "white", Ag2O: "brown", CuO: "black", Fe2O3: "brown", Fe3O4: "black", ZnO: "white", MgO: "white", Al2O3: "white",
  CaF2: "white", BaF2: "white", MgF2: "white", PbF2: "white", Ca3PO42: "white",
};
const colourOf = (sp: Species) => PPT_COLOUR[sp.formula] || "white";

function solutionColour(sp: Species): string {
  if (sp.cat?.sym === "Cu" && soluble(sp)) return "blue";
  if (sp.cat?.sym === "Fe" && soluble(sp)) return sp.q === 3 ? "yellow" : "emerald";
  return "clear";
}

const PUBCHEM: Record<string, string> = {
  HCl: "313", HBr: "260", HI: "24841", HNO3: "944", H2SO4: "1118", H3PO4: "1004", CH3COOH: "176", H2CO3: "767", NaOH: "14798", KOH: "14797", "Ca(OH)2": "14777",
  NH3: "222", NH4OH: "14923", H2O: "962", CO2: "280", O2: "977", H2: "783", Cl2: "24526", NaCl: "5234", KCl: "4873", NaNO3: "24268", KNO3: "24434",
  Na2SO4: "24436", CaCO3: "10112", Na2CO3: "10340", NaHCO3: "516892", CuSO4: "24462", AgCl: "24561", AgNO3: "24470", BaSO4: "24414", CaO: "14778",
};

function displayName(sp: Species, concentration?: string): string {
  if (sp.kind === "metal") return `Solid ${sp.name}`;
  if (sp.kind === "acid") return `${concentration === "dilute" ? "Dilute" : "Concentrated"} ${sp.name}`;
  if (sp.kind === "water") return "Water";
  if (sp.kind === "nonmetal" && sp.state === "g") return `${sp.name} Gas`;
  if (sp.kind === "nonmetal") return `${sp.state === "s" ? "Solid " : ""}${sp.name}`;
  if (sp.kind === "acidicOxide" || sp.kind === "gas" || sp.kind === "ammonia") return sp.state === "g" ? `${sp.name} Gas` : sp.name;
  if (sp.kind === "basicOxide") return `Solid ${sp.name}`;
  const hyd = sp.hydrate ? ` ${sp.hydrate === 1 ? "Monohydrate" : "Hydrate"}` : "";
  return soluble(sp) ? `Aqueous ${sp.name}${hyd}` : `Solid ${sp.name}${hyd}`;
}

// ── energy data (standard enthalpy of formation kJ/mol, standard entropy J/mol K) ──
type Th = [number, number];
const ION: Record<string, Th> = {
  "H+": [0, 0], "Li+": [-278.5, 12.2], "Na+": [-240.1, 59.0], "K+": [-252.4, 101.2], "Ag+": [105.6, 72.7], "NH4+": [-132.5, 113.4],
  "Mg2+": [-466.9, -138.1], "Ca2+": [-542.8, -53.1], "Ba2+": [-537.6, 9.6], "Zn2+": [-153.9, -112.1], "Cu2+": [64.8, -99.6], "Pb2+": [-1.7, 10.5],
  "Fe2+": [-89.1, -137.7], "Fe3+": [-48.5, -315.9], "Al3+": [-531.0, -321.7],
  "Cl-": [-167.2, 56.5], "Br-": [-121.6, 82.4], "I-": [-55.2, 111.3], "F-": [-332.6, -13.8], "NO3-": [-205.0, 146.4], "OH-": [-230.0, -10.8],
  "SO4": [-909.3, 20.1], "CO3": [-677.1, -56.9], "HCO3-": [-692.0, 91.2], "CH3COO-": [-486.0, 86.6], "PO4": [-1277.4, -220.5], "S": [33.1, -14.6], "SO3": [-635.5, -29.0],
};
const SOLID: Record<string, Th> = {
  AgCl: [-127.0, 96.3], AgBr: [-100.4, 107.1], AgI: [-61.8, 115.5], PbCl2: [-359.4, 136.0], PbI2: [-175.5, 174.9], PbSO4: [-920.0, 148.5], BaSO4: [-1473.2, 132.2],
  CaSO4: [-1434.5, 106.5], CaCO3: [-1206.9, 92.9], MgCO3: [-1095.8, 65.7], ZnCO3: [-812.8, 82.4], BaCO3: [-1213.0, 112.1], CuCO3: [-595.0, 88.0],
  "Cu(OH)2": [-449.8, 108.4], "Fe(OH)3": [-823.0, 106.7], "Fe(OH)2": [-569.0, 88.0], "Mg(OH)2": [-924.5, 63.2], "Zn(OH)2": [-641.9, 81.2], "Al(OH)3": [-1277.0, 71.0],
  "Ca(OH)2": [-986.1, 83.4], CaO: [-635.1, 39.8], MgO: [-601.6, 27.0], CuO: [-157.3, 42.6], ZnO: [-350.5, 43.7], Al2O3: [-1675.7, 50.9], Fe2O3: [-824.2, 87.4],
  Fe3O4: [-1118.4, 146.4], Na2O: [-414.2, 75.1], K2O: [-361.5, 94.1], BaO: [-548.0, 72.1], PbO: [-217.3, 68.7], Ag2O: [-31.1, 121.3], FeS: [-100.0, 60.3],
  ZnS: [-206.0, 57.7], MgS: [-346.0, 50.3], Na2S: [-364.8, 83.7], CuS: [-53.1, 66.5], CuI: [-67.8, 96.7], P2O5: [-1504.9, 114.4], Al2S3: [-724.0, 116.9],
  NaCl: [-411.2, 72.1], KCl: [-436.5, 82.6], NaI: [-287.8, 98.5], Na2CO3: [-1130.7, 135.0], NaHCO3: [-950.8, 101.7], Li2O: [-597.9, 37.6],
};
const GAS_LIQ: Record<string, Th> = {
  H2O: [-285.8, 70.0], H2: [0, 130.7], O2: [0, 205.2], Cl2: [0, 223.1], N2: [0, 191.6], F2: [0, 202.8], Br2: [0, 152.2], I2: [0, 116.1], S: [0, 32.1], C: [0, 5.7],
  CO2: [-393.5, 213.8], CO: [-110.5, 197.7], SO2: [-296.8, 248.2], SO3: [-395.7, 256.8], NO: [90.3, 210.8], NO2: [33.2, 240.1], NH3: [-46.1, 192.5],
  Na: [0, 51.3], K: [0, 64.7], Li: [0, 29.1], Ba: [0, 62.5], Ca: [0, 41.6], Mg: [0, 32.7], Al: [0, 28.3], Zn: [0, 41.6], Fe: [0, 27.3], Sn: [0, 51.2], Pb: [0, 65.1], Cu: [0, 33.2], Ag: [0, 42.6],
  NaOCl: [-347.0, 118.0], KOCl: [-358.0, 130.0], H2S: [-20.6, 205.8], NH4OH: [-361.2, 165.6],
};
const WEAK_AQ: Record<string, Th> = { CH3COOH: [-485.8, 178.7], H3PO4: [-1288.3, 158.2], H2CO3: [-699.7, 187.4], HF: [-335.4, 88.7], H2S: [-39.7, 121.0], H2SO3: [-608.8, 232.2] };

function ionTh(sym: string, charge: number, isCation: boolean): Th | null {
  const key = isCation ? `${sym}${charge > 1 ? charge : ""}+` : `${sym}${charge > 1 ? "" : "-"}`;
  return ION[key] || ION[sym] || null;
}

function thermo(sp: Species): Th | null {
  if (sp.forceSolid) return SOLID[sp.formula] || null;
  if (sp.state !== "aq" && GAS_LIQ[sp.formula] && (sp.kind === "metal" || sp.kind === "nonmetal" || sp.kind === "water" || sp.kind === "ammonia" || sp.kind === "gas" || sp.kind === "acidicOxide")) return GAS_LIQ[sp.formula];
  if (sp.formula === "NH4OH") return GAS_LIQ.NH4OH;
  if (WEAK_AQ[sp.formula] && sp.kind === "acid") return WEAK_AQ[sp.formula];
  if (!sp.cat || !sp.an || sp.q === undefined || sp.nc === undefined || sp.na === undefined) return SOLID[sp.formula] || GAS_LIQ[sp.formula] || null;
  if (!soluble(sp) || sp.kind === "basicOxide") return SOLID[sp.formula] || null;
  const c = ionTh(sp.cat.sym, sp.q, true), a = ionTh(sp.an.sym, sp.an.charge, false);
  if (!c || !a) return SOLID[sp.formula] || null;
  return [sp.nc * c[0] + sp.na * a[0], sp.nc * c[1] + sp.na * a[1]];
}

// ── result building ─────────────────────────────────────────────────────────
export interface EngineInput {
  reactants: { formula: string; concentration?: string; gasSupply?: string }[];
  temperatureC: number;
  solvent?: string;
}
export interface EngineResult {
  reactionFeasible: boolean;
  reactantsData: { formula: string; name: string; iupacName: string; pubchemId: string; molecularWeight: number }[];
  productsData: { formula: string; name: string; pubchemId: string; state: string }[];
  deltaH_rxn: number;
  deltaS_rxn: number;
  balancedEquation: string;
  reactionClass: string;
  thermoType: string;
  visuals: { solutionColorStart: string; solutionColorEnd: string; hasBubbles: boolean; gasName: string; precipitateColor: string; animationDescription: string };
  dangerLevel: string;
  conceptualExplanationFoundational: string;
  conceptualExplanationAdvanced: string;
  arrowPushingDetails: string;
  advice: string[];
  // used by the tests, not shown to students
  coefficients?: number[];
}

interface Spec {
  products: Species[];
  cls: string;
  extraEquation?: string;            // an equation written by hand (dissolving, ionisation)
  dHDefault?: number; dSDefault?: number;
  danger?: string;
  bubbles?: string;                  // name of the gas that bubbles off
  ppt?: string;                      // colour of a solid that forms
  endColour?: string;
  look: string; why: string; deeper: string; arrow: string; advice?: string[];
  feasible?: boolean;
  solid?: string[];                  // products that show as a solid although they are slightly soluble
}

const stateOf = (sp: Species) => (sp.forceSolid || (sp.state === "aq" && !soluble(sp)) ? "s" : sp.state);
const fmt = (n: number) => (n === 1 ? "" : String(n));

function compose(input: EngineInput, rs: Species[], spec: Spec): EngineResult | null {
  const feasible = spec.feasible !== false;
  const prods = spec.products.map((p) => (spec.solid && spec.solid.includes(p.formula) ? { ...p, forceSolid: true } : p));
  let coefficients: number[] | undefined;
  let equation = spec.extraEquation || "";
  let dH = spec.dHDefault ?? -50, dS = spec.dSDefault ?? 20;
  if (!feasible) {
    equation = `${rs.map((r) => `${r.formula}(${stateOf(r)})`).join(" + ")} → No Reaction`;
  } else if (!spec.extraEquation) {
    const atomsR = rs.map((r) => r.atoms), atomsP = prods.map((p) => p.atoms);
    coefficients = balance(atomsR, atomsP) || undefined;
    if (!coefficients) return null;
    const left = rs.map((r, i) => `${fmt(coefficients![i])}${r.formula}(${stateOf(r)})`).join(" + ");
    const right = prods.map((p, i) => `${fmt(coefficients![rs.length + i])}${p.formula}(${stateOf(p)})`).join(" + ");
    equation = `${left} → ${right}`;
    const tr = rs.map(thermo), tp = prods.map(thermo);
    if (tr.every(Boolean) && tp.every(Boolean)) {
      dH = tp.reduce((s, t, i) => s + coefficients![rs.length + i] * t![0], 0) - tr.reduce((s, t, i) => s + coefficients![i] * t![0], 0);
      dS = tp.reduce((s, t, i) => s + coefficients![rs.length + i] * t![1], 0) - tr.reduce((s, t, i) => s + coefficients![i] * t![1], 0);
    }
  }
  if (!feasible) { dH = 0; dS = 0; }
  const gas = prods.find((p) => p.state === "g" && p.kind !== "water");
  const solid = spec.ppt ?? "";
  const startColour = rs.map(solutionColour).find((c) => c !== "clear") || "clear";
  const endColour = spec.endColour ?? (prods.map(solutionColour).find((c) => c !== "clear") || "clear");
  return {
    reactionFeasible: feasible,
    reactantsData: rs.map((r, i) => ({
      formula: r.input, name: displayName(r, input.reactants[i]?.concentration), iupacName: lc(r.name),
      pubchemId: PUBCHEM[r.formula] || "", molecularWeight: Number(r.mass.toFixed(2)),
    })),
    productsData: feasible ? prods.map((p) => ({ formula: p.formula, name: displayName(p), pubchemId: PUBCHEM[p.formula] || "", state: stateOf(p) })) : [],
    deltaH_rxn: Number(dH.toFixed(1)),
    deltaS_rxn: Number(dS.toFixed(1)),
    balancedEquation: equation,
    reactionClass: spec.cls,
    thermoType: dH < 0 ? "Exothermic" : "Endothermic",
    visuals: {
      solutionColorStart: startColour,
      solutionColorEnd: feasible ? endColour : startColour,
      hasBubbles: feasible && (!!spec.bubbles || !!gas),
      gasName: feasible ? (spec.bubbles || (gas ? gas.name : "")) : "",
      precipitateColor: feasible ? solid : "",
      animationDescription: spec.look,
    },
    dangerLevel: spec.danger || "safe",
    conceptualExplanationFoundational: spec.why,
    conceptualExplanationAdvanced: spec.deeper,
    arrowPushingDetails: spec.arrow,
    advice: spec.advice && spec.advice.length ? spec.advice : ["Change the temperature, pressure and concentration controls to see how the energy values and the spontaneity change."],
    coefficients,
  };
}

const lc = (n: string) => n.replace(/([A-Z])([a-z]+)/g, (_m, a: string, b: string) => a.toLowerCase() + b);
const H2O = () => KNOWN.get("H2O")!;
const get = (f: string) => KNOWN.get(f)!;
const salt = (cat: string, q: number, an: string): Species | null => {
  const c = CATIONS.find((x) => x.sym === cat), a = ANIONS.find((x) => x.sym === an);
  if (!c || !a) return null;
  const { formula } = ionicFormula(c, q, a);
  return KNOWN.get(formula) || null;
};
const sub = (s: string) => s.replace(/(\d+)/g, (d) => d.split("").map((x) => "₀₁₂₃₄₅₆₇₈₉"[+x]).join(""));
const SUPER = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number) => String(n).split("").map((d) => SUPER[+d]).join("");
const cationText = (sym: string, q: number) => `${sub(sym)}${q > 1 ? sup(q) : ""}⁺`;
const anionText = (an: Anion) => `${sub(an.sym)}${an.charge > 1 ? sup(an.charge) : ""}⁻`;
const ionText = (sp: Species) => (sp.cat && sp.q ? cationText(sp.cat.sym, sp.q) : sp.formula);

// ── the reaction rules ──────────────────────────────────────────────────────
type Rule = (a: Species, b: Species, ctx: Ctx) => EngineResult | null;
interface Ctx { input: EngineInput; rs: Species[]; conc: (s: Species) => string | undefined; T: number }
type Ctx0 = Ctx;

function neutralise(acid: Species, base: Species, ctx: Ctx): EngineResult | null {
  if (acid.kind !== "acid" || !acid.an) return null;
  if ((base.kind === "hydroxide" || base.kind === "basicOxide" || base.kind === "carbonate") && (!base.cat || !base.q)) return null;
  const an = acid.an;
  const conc = ctx.conc(acid);
  const hot = conc === "concentrated";
  const weak = !!acid.weak;
  let prods: Species[] | null = null;
  let cls = "Acid-Base Neutralization";
  let ppt = "";
  let bubbles = "";
  let what = "";
  if (base.kind === "hydroxide" || base.kind === "basicOxide") {
    const s = salt(base.cat!.sym, base.q!, an.sym);
    if (!s) return null;
    prods = [s, H2O()];
    if (!soluble(s)) ppt = colourOf(s);
    if (base.kind === "basicOxide") cls = "Acid + Metal Oxide (Neutralization)";
    what = base.kind === "basicOxide" ? "a metal oxide (a base)" : "a base";
  } else if (base.formula === "NH3" || base.formula === "NH4OH") {
    const s = salt("NH4", 1, an.sym);
    if (!s) return null;
    prods = base.formula === "NH3" ? [s] : [s, H2O()];
    cls = "Acid-Base Neutralization (Ammonia)";
    what = "ammonia";
  } else if (base.kind === "carbonate") {
    if (acid.formula === "H2CO3") return null;
    const s = salt(base.cat!.sym, base.q!, an.sym);
    if (!s) return null;
    prods = [s, H2O(), get("CO2")];
    if (!soluble(s)) ppt = colourOf(s);
    cls = "Acid + Carbonate (Gas Evolution)";
    bubbles = "Carbon Dioxide (CO₂)";
    what = "a carbonate";
  } else return null;
  if (!prods) return null;
  const nameSalt = prods[0].name;
  const strength = weak ? "a weak acid" : "a strong acid";
  const heat = hot ? "Because the acid is concentrated, a great deal of heat is released very quickly, so add it slowly and with care." : "The mixture warms slightly.";
  const gasLine = bubbles ? " Carbon dioxide gas bubbles off with fizzing (it turns limewater milky)." : "";
  const pptLine = ppt ? ` The salt formed, ${nameSalt}, does not dissolve, so it appears as a ${ppt} solid.` : "";
  const pairNote = weak ? " Weak acids and weak bases release a little less heat because some energy is used in ionising the acid." : "";
  return compose(ctx.input, ctx.rs, {
    products: prods, cls, ppt, bubbles: bubbles || undefined, danger: hot && ["H2SO4", "HNO3"].includes(acid.formula) ? "hazardous" : "safe",
    look: `${acid.name} meets ${base.name}. ${heat}${gasLine}${pptLine} The solution ends up with ${nameSalt} and ${base.kind === "carbonate" ? "water and carbon dioxide" : "water"}.`,
    why: `${acid.name} is ${strength} and ${base.name} is ${what}. An acid and a base react to form a salt and water (an acid with a carbonate also gives carbon dioxide). Here the salt is ${nameSalt}.${gasLine}`,
    deeper: `The net change is the transfer of H⁺ from the acid to the base${base.kind === "hydroxide" ? " (H⁺ + OH⁻ → H₂O)" : ""}. ${sub(`Salt formula: ${prods[0].formula}`)}, chosen so that the total positive and negative charges cancel.${pairNote}`,
    arrow: base.kind === "carbonate"
      ? `H⁺ (from the acid) reacts with the carbonate ion to give H₂CO₃, which breaks down at once into H₂O and CO₂(g).`
      : `H⁺ (from the acid) + OH⁻ (from the base) → H₂O. The other ions stay together as the salt, ${prods[0].name}.`,
    advice: ["Add a few drops of phenolphthalein to the base: it is pink, and the pink disappears at the neutral point.", weak ? "Try the same base with a strong acid such as HCl and compare the energy released." : "Try the same acid with a weak base such as ammonia and compare the energy released."],
  });
}

const ruleAcidBase: Rule = (a, b, ctx) => (a.kind === "acid" ? neutralise(a, b, ctx) : null);

const HNO3_TABLE: Record<string, { conc?: [string[], string[]]; dil?: [string[], string[]]; passiveConc?: boolean }> = {
  Cu: { conc: [["Cu", "HNO3"], ["Cu(NO3)2", "NO2", "H2O"]], dil: [["Cu", "HNO3"], ["Cu(NO3)2", "NO", "H2O"]] },
  Zn: { conc: [["Zn", "HNO3"], ["Zn(NO3)2", "NO2", "H2O"]], dil: [["Zn", "HNO3"], ["Zn(NO3)2", "NO", "H2O"]] },
  Mg: { conc: [["Mg", "HNO3"], ["Mg(NO3)2", "NO2", "H2O"]], dil: [["Mg", "HNO3"], ["Mg(NO3)2", "NO", "H2O"]] },
  Ag: { conc: [["Ag", "HNO3"], ["AgNO3", "NO2", "H2O"]], dil: [["Ag", "HNO3"], ["AgNO3", "NO", "H2O"]] },
  Pb: { conc: [["Pb", "HNO3"], ["Pb(NO3)2", "NO2", "H2O"]], dil: [["Pb", "HNO3"], ["Pb(NO3)2", "NO", "H2O"]] },
  Fe: { passiveConc: true, dil: [["Fe", "HNO3"], ["Fe(NO3)3", "NO", "H2O"]] },
  Al: { passiveConc: true, dil: [["Al", "HNO3"], ["Al(NO3)3", "NO", "H2O"]] },
};

function metalAcid(m: Species, acid: Species, ctx: Ctx): EngineResult | null {
  if (m.kind !== "metal" || acid.kind !== "acid") return null;
  const info = METALS[m.formula];
  if (!info) return null;
  const conc = ctx.conc(acid) === "concentrated";
  const danger = ["K", "Na", "Li"].includes(m.formula) ? "explosive" : ["Ba", "Ca"].includes(m.formula) ? "hazardous" : "safe";
  const none = (why: string, deeper: string): EngineResult | null =>
    compose(ctx.input, ctx.rs, { products: [], cls: "Metal + Acid (No Reaction)", feasible: false, look: `${m.name} and ${acid.name} stay together with no change. No bubbles and no colour change are seen.`, why, deeper, arrow: "No electron transfer happens, so there is no oxidation and no reduction.", advice: ["Try a more reactive metal such as Zn, Mg or Fe with the same acid."] });
  // nitric acid is an oxidising acid: it does not give hydrogen
  if (acid.formula === "HNO3") {
    const t = HNO3_TABLE[m.formula];
    if (!t) {
      if (info.rank < HRANK) {
        const s = salt(m.formula, info.valency, "NO3");
        if (!s) return null;
        return compose(ctx.input, ctx.rs, { products: [s, get("H2")], cls: "Metal + Acid (Displacement of Hydrogen)", danger, look: `${m.name} reacts violently with nitric acid, with hydrogen gas and a great deal of heat.`, why: `${m.name} is a very reactive metal. It displaces hydrogen from the acid and forms ${s.name}.`, deeper: "Very reactive metals release energy so fast that the hydrogen can ignite.", arrow: `${m.formula} → ${m.formula}${info.valency > 1 ? info.valency : ""}⁺ + ${info.valency}e⁻ (oxidation); 2H⁺ + 2e⁻ → H₂ (reduction).` });
      }
      return none(`${m.name} is below hydrogen in the reactivity series, so it cannot displace hydrogen.`, "Its electrode potential is higher than that of hydrogen.");
    }
    const pick = conc ? t.conc : t.dil;
    if (conc && t.passiveConc) return none(`Cold concentrated nitric acid makes a thin protective oxide layer on ${m.name} (passivation), so the metal does not react.`, "The oxide film stops the acid from reaching the metal. Dilute acid or heating removes this effect.");
    if (!pick) return null;
    const reactants = [m, acid];
    const prods = pick[1].map((f) => get(f));
    if (prods.some((x) => !x)) return null;
    const gas = conc ? "Nitrogen Dioxide (NO₂)" : "Nitric Oxide (NO)";
    return compose({ ...ctx.input }, reactants, {
      products: prods, cls: "Metal + Nitric Acid (Redox)", bubbles: gas, danger: conc ? "hazardous" : "safe",
      look: conc ? `${m.name} dissolves in concentrated nitric acid with violent evolution of poisonous reddish-brown nitrogen dioxide fumes, and the solution warms up.` : `${m.name} dissolves slowly in dilute nitric acid. Colourless nitric oxide gas is formed, which turns reddish-brown in air.`,
      why: `Nitric acid is a strong oxidising agent, so it does not give hydrogen with ${m.name}. Instead the nitrate is reduced to ${conc ? "nitrogen dioxide" : "nitric oxide"}, and the metal forms its nitrate.`,
      deeper: `${conc ? "In concentrated acid N(+5) is reduced to N(+4) in NO₂" : "In dilute acid N(+5) is reduced to N(+2) in NO"}, while the metal is oxidised to its ion. Reaction with HNO₃ is a redox reaction.`,
      arrow: `${m.formula} → ion + electrons (oxidation); NO₃⁻ + ${conc ? "2H⁺ + e⁻ → NO₂ + H₂O" : "4H⁺ + 3e⁻ → NO + 2H₂O"} (reduction).`,
      advice: ["Work in a fume cupboard: nitrogen dioxide is poisonous.", "Compare with dilute hydrochloric acid, which gives hydrogen instead."],
    });
  }
  // concentrated sulfuric acid is also an oxidising acid
  if (acid.formula === "H2SO4" && conc) {
    const needsHeat = ["Cu", "Ag", "Pb", "Sn"].includes(m.formula);
    const passive = ["Fe", "Al"].includes(m.formula);
    if ((needsHeat && ctx.T < 80) || (passive && ctx.T < 100)) {
      return none(passive ? `Cold concentrated sulfuric acid makes a protective oxide layer on ${m.name}, so there is no reaction.` : `${m.name} does not react with concentrated sulfuric acid until it is heated.`, passive ? "The oxide film stops the acid from reaching the metal." : "The reaction needs heat to start.");
    }
    if (info.rank < HRANK || needsHeat) {
      const higher = m.formula === "Fe" ? 3 : info.valency;
      const s = salt(m.formula, higher, "SO4");
      if (!s) return null;
      return compose(ctx.input, ctx.rs, {
        products: [s, get("SO2"), H2O()], cls: "Metal + Concentrated Sulfuric Acid (Redox)", bubbles: "Sulfur Dioxide (SO₂)", danger: "hazardous",
        look: `Hot concentrated sulfuric acid attacks ${m.name}. Choking sulfur dioxide gas is given off and the solution turns to a ${s.name} solution.`,
        why: `Hot concentrated sulfuric acid is an oxidising acid. It oxidises ${m.name} to its sulfate and is itself reduced to sulfur dioxide, so no hydrogen is formed.`,
        deeper: "S(+6) in H₂SO₄ is reduced to S(+4) in SO₂ while the metal is oxidised.",
        arrow: `${m.formula} → ion + electrons (oxidation); SO₄²⁻ + 4H⁺ + 2e⁻ → SO₂ + 2H₂O (reduction).`,
        advice: ["Do this only in a fume cupboard because sulfur dioxide is a poisonous gas."],
      });
    }
  }
  if (info.rank < HRANK) {
    const s = salt(m.formula, m.formula === "Fe" ? 2 : info.valency, acid.an!.sym);
    if (!s) return null;
    const pbCoat = m.formula === "Pb" && !soluble(s);
    return compose(ctx.input, ctx.rs, {
      products: [s, get("H2")], cls: "Metal + Acid (Displacement of Hydrogen)", bubbles: "Hydrogen (H₂)", danger, ppt: pbCoat ? colourOf(s) : "",
      look: danger === "explosive" ? `${m.name} reacts explosively with ${acid.name}: hydrogen gas is released so fast that it ignites.` : conc && acid.formula === "HCl" ? `${m.name} dissolves with vigorous fizzing as hydrogen gas is released and the mixture warms.` : `Bubbles of hydrogen gas form on the surface of the ${lc(m.name)} as it slowly dissolves, forming ${s.name}.`,
      why: `${m.name} is above hydrogen in the reactivity series, so it displaces hydrogen from ${acid.name}. The products are ${s.name} and hydrogen gas.`,
      deeper: `${m.name} is oxidised (it loses electrons to form ${ionText(s)}) and H⁺ is reduced to H₂. The more reactive the metal, the faster the bubbles. ${pbCoat ? "The insoluble salt coats the metal and slows the reaction." : ""}`,
      arrow: `${m.formula} → ${m.formula}${(m.formula === "Fe" ? 2 : info.valency) > 1 ? m.formula === "Fe" ? 2 : info.valency : ""}⁺ + ${m.formula === "Fe" ? 2 : info.valency}e⁻ (oxidation); 2H⁺ + 2e⁻ → H₂ (reduction).`,
      advice: ["Hold a burning splinter near the mouth of the tube: hydrogen burns with a squeaky pop.", "Compare Mg, Zn and Fe with the same acid to see the order of the reactivity series."],
    });
  }
  return none(`${m.name} is below hydrogen in the reactivity series, so it cannot displace hydrogen from ${acid.name}.`, "The metal is a weaker reducing agent than hydrogen, so H⁺ is not reduced.");
}
const ruleMetalAcid: Rule = (a, b, ctx) => metalAcid(a, b, ctx);

function metalSalt(m: Species, s: Species, ctx: Ctx): EngineResult | null {
  if (m.kind !== "metal" || s.kind !== "salt" || !s.cat || !s.an || !soluble(s)) return null;
  const mi = METALS[m.formula], ni = METALS[s.cat.sym];
  if (!mi || !ni) return null;
  if (s.cat.sym === "Fe" && s.q === 3) {
    if (mi.rank >= 13) return null;
    const lower = salt("Fe", 2, s.an.sym), mSalt = salt(m.formula, m.formula === "Fe" ? 2 : mi.valency, s.an.sym);
    if (!lower || !mSalt) return null;
    return compose(ctx.input, ctx.rs, {
      products: m.formula === "Fe" ? [lower] : [mSalt, lower], cls: "Redox (Reduction of Iron(III))",
      look: `The ${lc(m.name)} dissolves as the yellow-brown iron(III) solution fades towards the pale green of iron(II).`,
      why: `${m.name} is a good enough reducing agent to reduce iron(III) to iron(II), and the metal goes into solution as its salt.`,
      deeper: "Fe³⁺ + e⁻ → Fe²⁺ is easier than the full reduction to the metal, so iron(II) is formed first.",
      arrow: `${m.formula} → ion + electrons (oxidation); Fe³⁺ + e⁻ → Fe²⁺ (reduction).`,
    });
  }
  const reacts = mi.rank < ni.rank;
  if (!reacts) {
    return compose(ctx.input, ctx.rs, {
      products: [], feasible: false, cls: "Single Displacement (No Reaction)",
      look: "The solution stays the same colour and the metal does not change. Nothing happens.",
      why: `${m.name} is less reactive than ${lc(ni.name)}, so it cannot take ${lc(ni.name)}'s place in the salt. A less reactive metal cannot displace a more reactive one.`,
      deeper: "The displacement would need the weaker reducing agent to reduce the stronger metal's ion, which is not favourable.",
      arrow: "No electron transfer takes place between the metal and the ions.",
      advice: [`Try the other way round: ${ni.name} metal with ${m.name} salt solution.`],
    });
  }
  const newCharge = m.formula === "Fe" ? 2 : mi.valency;
  if (ALKALI_LIKE.has(m.formula)) {
    // very reactive metals react with the water of the solution first
    const mSalt = salt(m.formula, mi.valency, s.an.sym);
    const hyd = s.cat.sym === "Ag" ? get("Ag2O") : salt(s.cat.sym, s.q!, "OH");
    if (!mSalt || !hyd) return null;
    return compose(ctx.input, [m, s, H2O()], {
      products: [mSalt, hyd, get("H2")], cls: "Reactive Metal + Salt Solution (reacts with water first)", bubbles: "Hydrogen (H₂)", danger: "explosive", ppt: colourOf(hyd),
      look: `${m.name} does not displace the metal. It reacts with the water of the solution, giving hydrogen, and the hydroxide of the other metal settles as a ${colourOf(hyd)} solid.`,
      why: `${m.name} is so reactive that it reacts with water before it can displace another metal. The base formed then reacts with the salt.`,
      deeper: `First: ${m.formula} + H₂O → ${m.formula}OH + H₂. Then the hydroxide reacts with ${s.name} to give the insoluble ${hyd.name}.`,
      arrow: "2H₂O + 2e⁻ → 2OH⁻ + H₂ (reduction of water); the metal is oxidised.",
      advice: ["Never drop sodium or potassium into a salt solution: the reaction is explosive."],
    });
  }
  const mSalt = salt(m.formula, newCharge, s.an.sym);
  const freed = KNOWN.get(s.cat.sym) || { formula: s.cat.sym, input: s.cat.sym, name: `${ni.name} Metal`, kind: "metal" as Kind, atoms: { [s.cat.sym]: 1 }, state: "s" as const, mass: MASS[s.cat.sym] };
  if (!mSalt) return null;
  return compose(ctx.input, ctx.rs, {
    products: [mSalt, freed], cls: "Single Displacement / Redox", ppt: s.cat.sym === "Cu" ? "brown" : s.cat.sym === "Ag" ? "white" : "grey",
    look: `${m.name} is coated with ${lc(ni.name)} metal as it goes into solution as ${mSalt.name}.${s.cat.sym === "Cu" ? " The blue colour of the solution fades and a reddish-brown layer of copper appears." : s.cat.sym === "Ag" ? " Shiny silver crystals grow on the metal." : ""}`,
    why: `${m.name} is more reactive than ${lc(ni.name)}, so it displaces ${lc(ni.name)} from its salt solution. ${mSalt.name} forms in solution.`,
    deeper: `${m.name} is oxidised and the ${ionText(s)} ions are reduced to the metal. The standard electrode potentials make this reaction spontaneous.`,
    arrow: `${m.formula} → ${m.formula}${newCharge > 1 ? newCharge : ""}⁺ + ${newCharge}e⁻ (oxidation); ${s.cat.sym}${s.q! > 1 ? s.q : ""}⁺ + ${s.q}e⁻ → ${s.cat.sym} (reduction).`,
    advice: ["Arrange metals in the reactivity series and predict other displacements before trying them."],
  });
}
const ruleMetalSalt: Rule = (a, b, ctx) => metalSalt(a, b, ctx);

function metalWater(m: Species, w: Species, ctx: Ctx): EngineResult | null {
  if (m.kind !== "metal" || w.kind !== "water") return null;
  const info = METALS[m.formula];
  if (!info) return null;
  const T = ctx.T;
  if (info.water === "cold" || (info.water === "hot" && T >= 60) || (info.water === "steam" && T >= 100)) {
    const f = m.formula;
    let prods: Species[] | null;
    let cls = "Metal + Water (Displacement of Hydrogen)";
    let note = "";
    if (info.water === "cold") { const h = salt(f, info.valency, "OH"); prods = h ? [h, get("H2")] : null; note = "forming the hydroxide and hydrogen"; }
    else if (info.water === "hot") { const h = T >= 100 ? salt(f, 2, "O") : salt(f, 2, "OH"); prods = h ? [h, get("H2")] : null; note = T >= 100 ? "forming the oxide and hydrogen (in steam)" : "forming the hydroxide and hydrogen (slowly in hot water)"; }
    else { const o = f === "Fe" ? get("Fe3O4") : salt(f, info.valency, "O"); prods = o ? [o, get("H2")] : null; cls = "Metal + Steam"; note = "forming the oxide and hydrogen"; }
    if (!prods) return null;
    return compose(ctx.input, ctx.rs, {
      products: prods, cls, bubbles: "Hydrogen (H₂)", danger: ["K", "Na", "Li"].includes(f) ? "explosive" : ["Ba", "Ca"].includes(f) ? "hazardous" : "safe",
      look: `${m.name} reacts with ${info.water === "steam" ? "steam" : "water"}, ${note}. Bubbles of hydrogen are seen.`,
      why: `${m.name} is reactive enough to displace hydrogen from water ${info.water === "cold" ? "even in the cold" : info.water === "hot" ? "when the water is hot" : "when it is heated in steam"}.`,
      deeper: "Water acts as a weak acid here. The more reactive the metal, the colder the water it can react with: K, Na, Ca in cold water, Mg in hot water, and Al, Zn, Fe only in steam.",
      arrow: `${f} → ion + electrons (oxidation); water is reduced to hydrogen.`,
    });
  }
  return compose(ctx.input, ctx.rs, {
    products: [], feasible: false, cls: "Metal + Water (No Reaction)",
    look: `${m.name} stays unchanged in ${info.water === "none" ? "water" : T >= 60 ? "water at this temperature" : "cold water"}. No bubbles are seen.`,
    why: info.water === "none" ? `${m.name} is below hydrogen in the reactivity series, so it does not react with water or steam.` : `${m.name} reacts with water only when heated enough (${info.water === "hot" ? "hot water or steam" : "steam"}). At this temperature there is no visible reaction.`,
    deeper: "Metals such as Al, Zn and Fe form a protective oxide layer or react too slowly in cold water.",
    arrow: "No electron transfer takes place under these conditions.",
    advice: info.water === "none" ? [] : ["Raise the temperature to 100 °C or more to see the reaction with steam."],
  });
}
const ruleMetalWater: Rule = (a, b, ctx) => metalWater(a, b, ctx);

function metalNonmetal(m: Species, n: Species, ctx: Ctx): EngineResult | null {
  if (m.kind !== "metal" || n.kind !== "nonmetal") return null;
  const info = METALS[m.formula];
  if (!info) return null;
  const f = m.formula;
  if (n.formula === "O2") {
    if (info.rank >= 14) return compose(ctx.input, ctx.rs, { products: [], feasible: false, cls: "Metal + Oxygen (No Reaction)", look: `${m.name} does not burn or tarnish in oxygen.`, why: `${m.name} is a very unreactive (noble) metal and does not combine with oxygen.`, deeper: "Its oxide is unstable at ordinary temperatures.", arrow: "No reaction." });
    const ox = f === "Fe" ? get("Fe3O4") : salt(f, info.valency, "O");
    if (!ox) return null;
    const burn = ["Mg", "Ca", "Na", "K", "Li", "Ba", "Al", "Zn", "Fe"].includes(f);
    return compose(ctx.input, ctx.rs, {
      products: [ox], cls: "Combination / Combustion of a Metal", ppt: colourOf(ox), danger: ["K", "Na", "Li"].includes(f) ? "hazardous" : "safe",
      look: f === "Mg" ? "Magnesium ribbon burns with a dazzling white flame and leaves a white ash of magnesium oxide." : f === "Cu" ? "Heated copper slowly turns black as a coating of copper oxide forms." : burn ? `${m.name} burns in oxygen and forms ${colourOf(ox)} ${lc(ox.name)}.` : `${m.name} slowly becomes coated with ${lc(ox.name)}.`,
      why: `Metals combine with oxygen to form metal oxides. ${m.name} forms ${ox.name}.`,
      deeper: "The metal is oxidised and oxygen is reduced. Most metal oxides are basic oxides.",
      arrow: `${f} → ion + electrons (oxidation); O₂ + 4e⁻ → 2O²⁻ (reduction).`,
      advice: ["Dissolve the oxide in water and test with litmus: most metal oxides give a basic solution."],
    });
  }
  if (["Cl2", "Br2", "I2", "F2"].includes(n.formula)) {
    const hal = n.formula.replace("2", "");
    const q = f === "Fe" ? 3 : info.valency;
    const h = salt(f, q, hal);
    if (!h) return null;
    return compose(ctx.input, ctx.rs, {
      products: [h], cls: "Combination (Metal + Halogen)", ppt: soluble(h) ? "" : colourOf(h), danger: ["K", "Na", "Li"].includes(f) ? "hazardous" : "safe",
      look: `${m.name} burns brightly in ${lc(n.name)} and forms the ${lc(h.name)} as a ${f === "Fe" ? "brown" : "white"} solid.`,
      why: `A reactive metal combines directly with a halogen to form its halide. ${m.name} forms ${h.name}.`,
      deeper: "The halogen is reduced to the halide ion while the metal is oxidised.",
      arrow: `${f} → ion + electrons (oxidation); ${hal}₂ + 2e⁻ → 2${hal}⁻ (reduction).`,
    });
  }
  if (n.formula === "S" && ["Fe", "Zn", "Mg", "Na", "K", "Ca", "Al"].includes(f)) {
    const sulf = salt(f, f === "Fe" ? 2 : info.valency, "S");
    if (!sulf) return null;
    return compose(ctx.input, ctx.rs, { products: [sulf], cls: "Combination (Metal + Sulfur)", ppt: colourOf(sulf), look: `On heating, ${lc(m.name)} and sulfur combine to form ${lc(sulf.name)}.`, why: `A metal heated with sulfur forms its sulfide. Here ${sulf.name} is formed.`, deeper: "Sulfur is reduced to sulfide as the metal is oxidised.", arrow: `${f} → ion + electrons (oxidation); S + 2e⁻ → S²⁻ (reduction).` });
  }
  return null;
}
const ruleMetalNonmetal: Rule = (a, b, ctx) => metalNonmetal(a, b, ctx);

function oxideWater(o: Species, w: Species, ctx: Ctx): EngineResult | null {
  if (w.kind !== "water") return null;
  if (o.kind === "basicOxide" && o.cat && o.q) {
    const c = o.cat.sym;
    if (["Na", "K", "Li", "Ca", "Ba"].includes(c)) {
      const h = salt(c, o.q, "OH");
      if (!h) return null;
      return compose(ctx.input, ctx.rs, {
        products: [h], solid: ["Ca(OH)2"], cls: "Combination (Basic Oxide + Water)", danger: c === "Ca" || c === "Ba" ? "hazardous" : "hazardous",
        look: c === "Ca" ? "Quicklime hisses and swells as it takes up water. A lot of heat is released and the mixture becomes hot enough to boil some water, forming a milky suspension of slaked lime." : `${o.name} dissolves in water with a lot of heat, forming a strongly basic solution of ${lc(h.name)}.`,
        why: `Oxides of very reactive metals combine with water to form hydroxides. ${o.name} forms ${h.name}, which is a base.`,
        deeper: "The reaction is strongly exothermic. The hydroxide solution turns red litmus blue and phenolphthalein pink.",
        arrow: "O²⁻ (from the oxide) + H₂O → 2OH⁻.",
        advice: ["Add this solution to a few drops of phenolphthalein to see the pink colour."],
      });
    }
    return compose(ctx.input, ctx.rs, { products: [], feasible: false, cls: "Metal Oxide + Water (No Reaction)", look: "The oxide stays as an insoluble solid at the bottom of the water. No change is seen.", why: `${o.name} does not dissolve in water and does not react with it.`, deeper: "Oxides of less reactive metals are insoluble and do not form hydroxides with water.", arrow: "No reaction.", advice: ["Add an acid instead: metal oxides react with acids to form a salt and water."] });
  }
  if (o.kind === "acidicOxide") {
    const acidF: Record<string, string> = { CO2: "H2CO3", SO2: "H2SO3", SO3: "H2SO4", P2O5: "H3PO4" };
    const ac = KNOWN.get(acidF[o.formula]);
    if (!ac) return null;
    return compose(ctx.input, ctx.rs, {
      products: [ac], cls: "Combination (Acidic Oxide + Water)", danger: o.formula === "SO3" ? "hazardous" : "safe",
      look: `${o.name} dissolves in water to form ${lc(ac.name)}, which turns blue litmus red.`,
      why: `Oxides of non-metals are acidic. ${o.name} combines with water to give ${ac.name}.`,
      deeper: o.formula === "CO2" ? "This is why rainwater and soda water are slightly acidic. Carbonic acid is weak and unstable." : "The oxide takes up the elements of water to form an oxyacid.",
      arrow: `${o.formula} + H₂O → ${ac.formula}`,
    });
  }
  return null;
}
const ruleOxideWater: Rule = (a, b, ctx) => oxideWater(a, b, ctx);

function acidicOxideBase(o: Species, b: Species, ctx: Ctx): EngineResult | null {
  if (o.kind !== "acidicOxide") return null;
  const anion = ACIDIC_OXIDE_ANION[o.formula];
  if ((b.kind !== "hydroxide" && b.kind !== "basicOxide") || !b.cat || !b.q) return null;
  const s = salt(b.cat.sym, b.q, anion);
  if (!s) return null;
  const prods = b.kind === "hydroxide" ? [s, H2O()] : [s];
  const milky = o.formula === "CO2" && b.formula === "Ca(OH)2";
  return compose(ctx.input, ctx.rs, {
    products: prods, cls: b.kind === "hydroxide" ? "Acidic Oxide + Base" : "Acidic Oxide + Basic Oxide", ppt: soluble(s) ? "" : colourOf(s),
    look: milky ? "Carbon dioxide passed into clear limewater turns it milky white as insoluble calcium carbonate forms." : `${o.name} is absorbed by ${lc(b.name)} and ${lc(s.name)} is formed${soluble(s) ? " in solution" : " as a solid"}.`,
    why: `An acidic oxide reacts with a base to form a salt${b.kind === "hydroxide" ? " and water" : ""}. Here the salt is ${s.name}.`,
    deeper: milky ? "This is the standard test for carbon dioxide. With more CO₂ the milkiness disappears as soluble calcium hydrogencarbonate forms." : "The oxide behaves like an acid anhydride and the base like a proton acceptor.",
    arrow: b.kind === "hydroxide" ? `${o.formula} + 2OH⁻ → ${anion}²⁻ + H₂O` : `${o.formula} + O²⁻ → ${anion}²⁻`,
    advice: milky ? ["Keep bubbling carbon dioxide: the milkiness slowly goes away."] : [],
  });
}
const ruleAcidicOxideBase: Rule = (a, b, ctx) => acidicOxideBase(a, b, ctx);

function doubleDisplacement(x0: Species, y0: Species, ctx: Ctx0): EngineResult | null {
  // ammonia gas dissolved in the water of the solution acts as ammonium hydroxide
  const swap = (s: Species) => (s.formula === "NH3" ? get("NH4OH") : s);
  const x = swap(x0), y = swap(y0);
  if (x !== x0 || y !== y0) ctx = { ...ctx, rs: ctx.rs.map(swap) };
  const ionic = (s: Species) => s.cat && s.an && s.q !== undefined && (s.kind === "salt" || s.kind === "carbonate" || s.kind === "hydroxide" || s.kind === "acid");
  if (!ionic(x) || !ionic(y)) return null;
  if (x.kind === "acid" && y.kind === "acid") return noReaction(x, y, ctx, "Two acids");
  if (x.kind === "hydroxide" && y.kind === "hydroxide") return noReaction(x, y, ctx, "Two bases");
  // an acid with a carbonate or hydroxide is a neutralisation (handled elsewhere)
  if ((x.kind === "acid" && (y.kind === "hydroxide" || y.kind === "carbonate")) || (y.kind === "acid" && (x.kind === "hydroxide" || x.kind === "carbonate"))) return null;
  const A = x.cat!, B = x.an!, C = y.cat!, D = y.an!;
  // ammonium salt + hydroxide gives ammonia gas
  const nh = [x, y].find((s) => s.cat!.sym === "NH4" && s.kind === "salt");
  const oh = [x, y].find((s) => s.kind === "hydroxide");
  if (nh && oh && nh !== oh) {
    const s2 = salt(oh.cat!.sym, oh.q!, nh.an!.sym);
    if (!s2) return null;
    return compose(ctx.input, ctx.rs, {
      products: [s2, get("NH3"), H2O()], cls: "Double Displacement (Gas Evolution)", bubbles: "Ammonia (NH₃)", danger: "hazardous",
      look: `On warming, pungent ammonia gas is given off, which turns moist red litmus blue. ${s2.name} stays in the solution.`,
      why: `An ammonium salt heated with a base releases ammonia gas. This is the usual test for ammonium ions.`,
      deeper: "NH₄⁺ + OH⁻ → NH₃ + H₂O. The ammonia escapes as a gas, which drives the reaction to completion.",
      arrow: "NH₄⁺ (from the salt) + OH⁻ (from the base) → NH₃(g) + H₂O(l)",
      advice: ["Warm gently and smell with care. Ammonia is irritating."],
    });
  }
  // redox cases that are not simple exchanges
  const iodide = [x, y].find((s) => s.an!.sym === "I" && s.kind === "salt" && ["Na", "K", "Li", "NH4"].includes(s.cat!.sym));
  const oxid = [x, y].find((s) => s.kind === "salt" && ((s.cat!.sym === "Cu" && s.q === 2) || (s.cat!.sym === "Fe" && s.q === 3)));
  if (iodide && oxid && iodide !== oxid) {
    if (oxid.cat!.sym === "Cu") {
      const cui = get("CuI") || ({ formula: "CuI", input: "CuI", name: "Copper(I) Iodide", kind: "salt", atoms: parseFormula("CuI")!, state: "s", mass: molarMass(parseFormula("CuI")!) } as Species);
      const k = salt(iodide.cat!.sym, 1, oxid.an!.sym === "SO4" ? "SO4" : oxid.an!.sym);
      if (!k) return null;
      return compose(ctx.input, ctx.rs, {
        products: [cui, get("I2"), k], cls: "Redox (Copper(II) + Iodide)", ppt: "white", endColour: "brown",
        look: "The solution turns brown as iodine forms, and a dull white precipitate of copper(I) iodide settles out.",
        why: "Copper(II) is reduced by iodide ions to copper(I), and the iodide is oxidised to iodine. This is not a simple exchange of partners.",
        deeper: "2Cu²⁺ + 4I⁻ → 2CuI(s) + I₂. The iodine colours the solution brown.",
        arrow: "2I⁻ → I₂ + 2e⁻ (oxidation); Cu²⁺ + I⁻ + e⁻ → CuI (reduction).",
      });
    }
    const fe2 = salt("Fe", 2, oxid.an!.sym), k = salt(iodide.cat!.sym, 1, oxid.an!.sym);
    if (!fe2 || !k) return null;
    return compose(ctx.input, ctx.rs, {
      products: [fe2, get("I2"), k], cls: "Redox (Iron(III) + Iodide)", endColour: "brown",
      look: "The yellow solution turns dark brown as iodine is formed and iron(III) is reduced to iron(II).",
      why: "Iron(III) oxidises iodide to iodine and is reduced to iron(II). This is a redox reaction.",
      deeper: "2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂.", arrow: "2I⁻ → I₂ + 2e⁻ (oxidation); Fe³⁺ + e⁻ → Fe²⁺ (reduction).",
    });
  }
  if ([x, y].some((s) => s.cat!.sym === "Fe" && s.q === 3) && [x, y].some((s) => s.an!.sym === "S")) return null;
  // the ordinary exchange of partners
  const p1 = salt(A.sym, x.q!, D.sym), p2 = salt(C.sym, y.q!, B.sym);
  if (!p1 || !p2) {
    // iron(III) or aluminium with carbonate or sulfite: hydrolysis, not a simple exchange
    return null;
  }
  const badCarbonate = [x, y].some((s) => (s.cat!.sym === "Al" || (s.cat!.sym === "Fe" && s.q === 3)) ) && [x, y].some((s) => s.kind === "carbonate" && s.an!.sym === "CO3");
  if (badCarbonate) {
    const m = [x, y].find((s) => s.cat!.sym === "Al" || (s.cat!.sym === "Fe" && s.q === 3))!;
    const cb = [x, y].find((s) => s.kind === "carbonate")!;
    const hyd = salt(m.cat!.sym, m.q!, "OH"), other = salt(cb.cat!.sym, cb.q!, m.an!.sym);
    if (!hyd || !other) return null;
    return compose(ctx.input, [m, cb, H2O()], {
      products: [hyd, get("CO2"), other], cls: "Double Displacement (Hydrolysis)", ppt: colourOf(hyd), bubbles: "Carbon Dioxide (CO₂)",
      look: `A ${colourOf(hyd)} gelatinous precipitate of ${lc(hyd.name)} forms and carbon dioxide bubbles off.`,
      why: "The carbonates of aluminium and iron(III) cannot exist in water. The metal ions form the hydroxide, and carbon dioxide is given off.",
      deeper: "The highly charged metal ion makes the water around it acidic, so the carbonate is converted to CO₂.", arrow: "M³⁺ + 3H₂O → M(OH)₃ + 3H⁺; CO₃²⁻ + 2H⁺ → CO₂ + H₂O",
    });
  }
  const sameIons = [p1.formula, p2.formula].sort().join() === [x.formula, y.formula].sort().join();
  if (sameIons) return noReaction(x, y, ctx, "The two compounds already contain the same ions");
  const insol = [p1, p2].filter((p) => !soluble(p));
  const weakAcidMade = [p1, p2].find((p) => p.kind === "acid" && p.weak);
  if (insol.length === 0 && !weakAcidMade) return noReaction(x, y, ctx, "Both products would stay dissolved");
  // silver and lead halides convert to the less soluble halide only if the new one is less soluble
  if (!soluble(x) || !soluble(y)) {
    const solid = !soluble(x) ? x : y, other = solid === x ? y : x;
    const order = ["Cl", "Br", "I"];
    const ok = ["Ag", "Pb"].includes(solid.cat!.sym) && order.includes(solid.an!.sym) && other.kind === "salt" && order.includes(other.an!.sym) && order.indexOf(other.an!.sym) > order.indexOf(solid.an!.sym) && soluble(other);
    if (!ok) return noReaction(x, y, ctx, "An insoluble solid does not react with a salt solution here");
  }
  if (!soluble(x) && !soluble(y)) return noReaction(x, y, ctx, "Both are insoluble solids");
  const ppt = insol[0];
  return compose(ctx.input, ctx.rs, {
    products: [p1, p2], cls: ppt ? "Double Displacement / Precipitation" : "Double Displacement (Weak Acid Formation)", ppt: ppt ? colourOf(ppt) : "",
    look: ppt ? `A ${colourOf(ppt)} precipitate of ${lc(ppt.name)} forms the moment the two solutions are mixed, and the mixture turns cloudy.` : `The two substances exchange partners, forming ${p1.name} and ${p2.name} with no visible change.`,
    why: `In a double displacement reaction the two compounds swap their ions. ${ppt ? `${ppt.name} is insoluble in water, so it comes out of solution as a solid (a precipitate).` : "A weak acid is formed."}`,
    deeper: `${x.formula} + ${y.formula} → ${p1.formula} + ${p2.formula}. ${ppt ? `The reaction is driven by the formation of the insoluble ${ppt.formula}, so the net ionic equation is just the ions that combine to form it.` : ""}`,
    arrow: ppt ? `${ppt.nc! > 1 ? ppt.nc : ""}${cationText(ppt.cat!.sym, ppt.q!)}(aq) + ${ppt.na! > 1 ? ppt.na : ""}${anionText(ppt.an!)}(aq) → ${ppt.formula}(s)` : "The ions exchange partners and the weaker acid is formed.",
    advice: ppt ? ["Filter the mixture to separate the precipitate, and wash and dry it.", "Mix the two solutions in a different order: the same precipitate forms."] : [],
  });
}
const ruleDouble: Rule = (a, b, ctx) => doubleDisplacement(a, b, ctx);

function noReaction(a: Species, b: Species, ctx: Ctx, why: string): EngineResult {
  return compose(ctx.input, ctx.rs, {
    products: [], feasible: false, cls: "No Reaction",
    look: `${a.name} and ${b.name} mix without any visible change: no precipitate, no gas and no colour change.`,
    why: `${why}, so no new substance is formed. The ions simply stay mixed in the solution.`,
    deeper: "A reaction between two ionic solutions needs a driving force: an insoluble solid, a gas, water or a weak electrolyte. None is formed here.",
    arrow: "No net change: all the ions remain in solution.",
    advice: ["Look for combinations that give an insoluble solid (such as AgCl or BaSO₄) or a gas, or that are an acid with a base."],
  })!;
}

function halogenDisplacement(h: Species, s: Species, ctx: Ctx): EngineResult | null {
  if (!["Cl2", "Br2", "I2"].includes(h.formula)) return null;
  const hal = h.formula.replace("2", "");
  const isHalide = (s.kind === "salt" || s.kind === "acid") && s.an && ["Cl", "Br", "I"].includes(s.an.sym) && s.cat && ["Na", "K", "Li", "H", "NH4"].includes(s.cat.sym);
  if (!isHalide) return null;
  const order = ["Cl", "Br", "I"];
  const target = s.an!.sym;
  if (order.indexOf(hal) < order.indexOf(target)) {
    const freed = get(target + "2");
    const newSalt = salt(s.cat!.sym, 1, hal);
    if (!freed || !newSalt) return null;
    return compose(ctx.input, ctx.rs, {
      products: [newSalt, freed], cls: "Halogen Displacement (Redox)", endColour: target === "I" ? "brown" : "yellow",
      look: target === "I" ? "The solution turns brown as iodine is set free." : "The solution turns orange-yellow as bromine is set free.",
      why: `${h.name} is more reactive than ${lc(freed.name)}, so it displaces ${lc(freed.name)} from its compound.`,
      deeper: "Reactivity decreases down the halogen group (Cl > Br > I). The more reactive halogen is the stronger oxidising agent.",
      arrow: `${target}⁻ → ½${target}₂ + e⁻ (oxidation); ½${hal}₂ + e⁻ → ${hal}⁻ (reduction).`,
    });
  }
  return compose(ctx.input, ctx.rs, { products: [], feasible: false, cls: "Halogen Displacement (No Reaction)", look: "Nothing changes in the solution.", why: `${h.name} is less reactive than the halogen in the compound, so it cannot displace it.`, deeper: "A less reactive halogen cannot oxidise the halide of a more reactive one.", arrow: "No electron transfer takes place." });
}
const ruleHalogen: Rule = (a, b, ctx) => halogenDisplacement(a, b, ctx);

function chlorineBase(h: Species, b: Species, ctx: Ctx): EngineResult | null {
  if (h.formula !== "Cl2" || b.kind !== "hydroxide" || !["Na", "K"].includes(b.cat!.sym)) return null;
  const hypo = get(b.cat!.sym + "OCl"), chl = salt(b.cat!.sym, 1, "Cl");
  if (!hypo || !chl) return null;
  return compose(ctx.input, ctx.rs, { products: [chl, hypo, H2O()], cls: "Disproportionation (Chlorine + Alkali)", look: "The greenish-yellow gas dissolves in the cold alkali, giving a pale solution that bleaches colours.", why: "Chlorine reacts with a cold dilute alkali to form a chloride and a hypochlorite (a bleach).", deeper: "Chlorine is both oxidised and reduced: it forms Cl⁻ and OCl⁻.", arrow: "Cl₂ + 2OH⁻ → Cl⁻ + OCl⁻ + H₂O" });
}
const ruleChlorineBase: Rule = (a, b, ctx) => chlorineBase(a, b, ctx);

function amphoteric(m: Species, b: Species, ctx: Ctx): EngineResult | null {
  if (m.kind !== "metal" || b.formula !== "NaOH" || !["Zn", "Al"].includes(m.formula)) return null;
  const prods = m.formula === "Zn" ? [get("Na2ZnO2"), get("H2")] : [get("NaAlO2"), get("H2")];
  const rs = m.formula === "Al" ? [m, b, H2O()] : [m, b];
  return compose(ctx.input, rs, {
    products: m.formula === "Al" ? prods : prods, cls: "Metal + Alkali (Amphoteric Metal)", bubbles: "Hydrogen (H₂)",
    look: `${m.name} dissolves slowly in the hot concentrated sodium hydroxide with bubbles of hydrogen.`,
    why: `${m.name} is an amphoteric metal: it reacts with acids and also with strong alkalis, releasing hydrogen.`,
    deeper: "The metal forms a soluble complex salt with the alkali, so the oxide layer does not protect it.", arrow: `${m.formula} + hydroxide → ${m.formula === "Zn" ? "zincate" : "aluminate"} + H₂`,
  });
}
const ruleAmphoteric: Rule = (a, b, ctx) => amphoteric(a, b, ctx);

function oxideReduction(o: Species, r: Species, ctx: Ctx): EngineResult | null {
  if (o.kind !== "basicOxide" || !o.cat) return null;
  const c = o.cat.sym;
  const metal = identify(c);
  if (!metal || metal.kind !== "metal") return null;
  if (r.formula === "H2" && ["Cu", "Pb"].includes(c)) {
    return compose(ctx.input, ctx.rs, {
      products: [metal, H2O()], cls: "Reduction of a Metal Oxide", ppt: "brown",
      look: "On heating in a stream of hydrogen, the black oxide turns into shiny metal, and drops of water collect on the cooler glass.",
      why: "Hydrogen takes away the oxygen from the hot metal oxide: the oxide is reduced and hydrogen is oxidised.",
      deeper: "The metal oxide is reduced to the metal while H₂ is oxidised to H₂O.", arrow: "MO + H₂ → M + H₂O (heat)",
      advice: ["Keep the hydrogen flowing while the tube cools, or the hot metal will turn black again."],
    });
  }
  if (r.formula === "CO" && ["Cu", "Fe", "Pb"].includes(c)) {
    return compose(ctx.input, ctx.rs, {
      products: [metal, get("CO2")], cls: "Reduction of a Metal Oxide (Carbon Monoxide)", bubbles: "Carbon Dioxide (CO₂)",
      look: "Hot carbon monoxide takes the oxygen from the metal oxide and the metal is left behind.",
      why: "Carbon monoxide is a reducing agent: it takes oxygen from the metal oxide and becomes carbon dioxide.",
      deeper: "This is how iron is extracted from its ore in a blast furnace.", arrow: "MO + CO → M + CO₂ (heat)",
    });
  }
  if (r.formula === "C" && ["Cu", "Pb"].includes(c)) {
    return compose(ctx.input, ctx.rs, {
      products: [metal, get("CO2")], cls: "Reduction of a Metal Oxide (Carbon)", bubbles: "Carbon Dioxide (CO₂)", ppt: "brown",
      look: "On strong heating the black mixture turns to metal and carbon dioxide turns limewater milky.",
      why: "Carbon takes the oxygen from the metal oxide: the oxide is reduced and carbon is oxidised.",
      deeper: "Carbon is a stronger reducing agent than the metal at high temperature.", arrow: "2MO + C → 2M + CO₂ (heat)",
    });
  }
  return null;
}
const ruleOxideReduction: Rule = (a, b, ctx) => oxideReduction(a, b, ctx);

function metalOxideDisplacement(m: Species, o: Species, ctx: Ctx): EngineResult | null {
  if (m.kind !== "metal" || o.kind !== "basicOxide" || !o.cat || o.formula === "Fe3O4") return null;
  const mi = METALS[m.formula], ni = METALS[o.cat.sym];
  if (!mi || !ni) return null;
  if (mi.rank >= ni.rank) return null;
  const nOx = o;
  const mOx = m.formula === "Fe" ? get("Fe2O3") : salt(m.formula, mi.valency, "O");
  const freed = identify(o.cat.sym);
  if (!mOx || !freed) return null;
  return compose(ctx.input, ctx.rs, {
    products: [mOx, freed], cls: "Displacement from a Metal Oxide (Thermite-type)", danger: "hazardous", ppt: "grey",
    look: `${m.name} burns fiercely, taking the oxygen from ${lc(nOx.name)} and leaving ${lc(freed.name)} behind with a lot of heat and light.`,
    why: `${m.name} is more reactive than ${lc(freed.name)}, so it takes the oxygen away from its oxide.`,
    deeper: "A more reactive metal reduces the oxide of a less reactive metal. The thermite reaction (aluminium with iron oxide) is used to weld railway lines.",
    arrow: "More reactive metal → ions + electrons (oxidation); less reactive metal ions + electrons → metal (reduction).",
  });
}
const ruleMetalOxide: Rule = (a, b, ctx) => metalOxideDisplacement(a, b, ctx);

function basicOxidePair(x: Species, y: Species, ctx: Ctx): EngineResult | null {
  const plainGas = ["O2", "H2", "N2"].includes(y.formula);
  const reducing = (x.an && ["I", "S", "SO3"].includes(x.an.sym)) || (x.cat?.sym === "Fe" && x.q === 2);
  if (plainGas && (x.kind === "acid" || x.kind === "hydroxide" || x.kind === "carbonate" || x.kind === "salt") && !reducing) return noReaction(x, y, ctx, `${x.name} does not react with ${lc(y.name)} at ordinary temperatures`);
  if (["Cl2", "Br2"].includes(y.formula) && (x.kind === "acid" || x.kind === "carbonate") && !(x.an && ["Br", "I", "S"].includes(x.an.sym)) && x.formula !== "H2CO3") return noReaction(x, y, ctx, `${x.name} does not react with ${lc(y.name)}`);
  if (x.formula === "NH3" && (x.kind === "ammonia") && (y.kind === "hydroxide" || y.kind === "basicOxide" || y.kind === "carbonate")) return noReaction(x, y, ctx, "Ammonia is a base and does not react with another base or with a carbonate");
  if (x.kind === "basicOxide" && y.kind === "basicOxide") return noReaction(x, y, ctx, "Two metal oxides");
  if (x.kind === "basicOxide" && y.kind === "hydroxide") return noReaction(x, y, ctx, "A metal oxide and a base");
  if (x.kind === "metal" && y.kind === "metal") {
    return compose(ctx.input, ctx.rs, { products: [], feasible: false, cls: "No Reaction", look: "The two metals simply stay mixed. They would have to be melted together to form an alloy.", why: "Two metals do not react chemically.", deeper: "Mixing molten metals makes an alloy, which is a mixture and not a compound.", arrow: "No reaction." });
  }
  if (x.kind === "acid" && y.kind === "acidicOxide") return noReaction(x, y, ctx, "An acid and an acidic oxide");
  if (x.kind === "metal" && y.kind === "hydroxide" && !["Zn", "Al"].includes(x.formula)) return noReaction(x, y, ctx, "This metal does not react with an alkali");
  if (x.kind === "metal" && y.kind === "carbonate") return noReaction(x, y, ctx, "A metal does not react with a carbonate salt");
  return null;
}
const rulePairs: Rule = (a, b, ctx) => basicOxidePair(a, b, ctx);

function dissolve(s: Species, w: Species, ctx: Ctx): EngineResult | null {
  if (w.kind !== "water") return null;
  if (s.kind === "salt" || s.kind === "carbonate" || s.kind === "hydroxide") {
    if (!s.cat || !s.an || s.nc === undefined || s.na === undefined || s.q === undefined) return null;
    const ions = `${s.nc > 1 ? s.nc : ""}${cationText(s.cat.sym, s.q)}(aq) + ${s.na > 1 ? s.na : ""}${anionText(s.an)}(aq)`;
    if (!soluble(s)) {
      return compose(ctx.input, ctx.rs, { products: [], feasible: false, cls: "No Reaction (Insoluble)", look: `${s.name} does not dissolve. It stays as a solid at the bottom of the water.`, why: `${s.name} is insoluble in water, so nothing happens.`, deeper: "The attraction between its ions is stronger than the attraction between the ions and water molecules.", arrow: "No dissolving takes place." });
    }
    return compose(ctx.input, ctx.rs, {
      products: [s], cls: "Dissolution (Physical Change)", extraEquation: `${s.formula}(s) → ${ions}`, dHDefault: 4, dSDefault: 90, endColour: solutionColour(s),
      look: `${s.name} dissolves in water and its ions spread through the solution. No new substance is formed.`,
      why: `Dissolving is a physical change. The ions of ${s.name} separate and are surrounded by water molecules. No chemical reaction takes place.`,
      deeper: "Dissolving is driven by the increase in disorder (entropy) when the ions mix into the water.", arrow: "The crystal separates into ions which become hydrated.",
    });
  }
  if (s.kind === "acid" && s.an && s.nc !== undefined) {
    const n = s.nc;
    return compose(ctx.input, ctx.rs, {
      products: [s], cls: "Ionisation in Water", extraEquation: `${s.formula}(aq) + ${n > 1 ? n : ""}H2O(l) → ${n > 1 ? n : ""}H₃O⁺(aq) + ${anionText(s.an)}(aq)`, dHDefault: -20, dSDefault: 30,
      look: `${s.name} dissolves and ionises in water. The solution is acidic and turns blue litmus red. No new substance is formed.`,
      why: `Acids give hydrogen ions (as H₃O⁺) in water. ${s.weak ? "This acid ionises only a little." : "This strong acid ionises completely."}`,
      deeper: "Dissolving a strong acid in water releases heat, so always add acid to water and never water to acid.", arrow: "HA + H₂O → H₃O⁺ + A⁻",
      advice: ["Always add acid to water slowly, and never water to acid."],
    });
  }
  if (s.formula === "NH3") {
    return compose(ctx.input, ctx.rs, { products: [get("NH4OH")], cls: "Dissolution of Ammonia", look: "Ammonia gas dissolves very readily in water to give a basic solution with a sharp smell.", why: "Ammonia dissolves in water to form ammonium hydroxide, a weak base.", deeper: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (only a little of the ammonia ionises).", arrow: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻" });
  }
  return null;
}
const ruleDissolve: Rule = (a, b, ctx) => dissolve(a, b, ctx);

function nonmetals(a: Species, b: Species, ctx: Ctx): EngineResult | null {
  const pair = [a.formula, b.formula].sort().join("+");
  if (pair === "H2+O2") return compose(ctx.input, ctx.rs, { products: [H2O()], cls: "Combination / Combustion of Hydrogen", danger: "explosive", look: "A mixture of hydrogen and oxygen explodes with a loud bang when lit, forming water.", why: "Hydrogen burns in oxygen to form water.", deeper: "A very exothermic chain reaction. Hydrogen-oxygen mixtures are explosive.", arrow: "2H₂ + O₂ → 2H₂O" });
  if (pair === "Cl2+H2") return compose(ctx.input, ctx.rs, { products: [get("HCl")], cls: "Combination (Hydrogen + Chlorine)", danger: "explosive", look: "In sunlight or a flame, hydrogen and chlorine combine explosively to form hydrogen chloride gas.", why: "Hydrogen and chlorine combine to form hydrogen chloride.", deeper: "A light-initiated chain reaction.", arrow: "H₂ + Cl₂ → 2HCl" });
  if (pair === "O2+S") return compose(ctx.input, ctx.rs, { products: [get("SO2")], cls: "Combustion of Sulfur", bubbles: "Sulfur Dioxide (SO₂)", danger: "hazardous", look: "Sulfur burns with a blue flame and gives off choking sulfur dioxide gas.", why: "Sulfur burns in oxygen to form sulfur dioxide, an acidic oxide.", deeper: "SO₂ dissolves in water to form sulfurous acid, the source of acid rain.", arrow: "S + O₂ → SO₂" });
  if (pair === "H2+N2") return compose(ctx.input, ctx.rs, { products: [get("NH3")], cls: "Combination (Haber Process)", look: "Nitrogen and hydrogen combine slowly in the presence of a catalyst at high pressure and temperature to form ammonia.", why: "Nitrogen and hydrogen combine to form ammonia. The reaction needs a catalyst, high pressure and about 450 °C.", deeper: "The reaction is reversible and exothermic, so a high pressure favours ammonia while a high temperature speeds it up.", arrow: "N₂ + 3H₂ ⇌ 2NH₃" });
  return null;
}
const ruleNonmetals: Rule = (a, b, ctx) => nonmetals(a, b, ctx);

const RULES: Rule[] = [
  ruleDissolve, ruleAcidBase, ruleMetalAcid, ruleMetalWater, ruleMetalNonmetal, ruleMetalSalt, ruleAmphoteric, ruleOxideWater, ruleAcidicOxideBase,
  ruleHalogen, ruleChlorineBase, ruleOxideReduction, ruleMetalOxide, ruleNonmetals, ruleDouble, rulePairs,
];

/** Predicts a two-reactant reaction, or returns null when this engine is not sure. */
export function simulateStandardReaction(input: EngineInput): EngineResult | null {
  const list = input.reactants.filter((r) => r && r.formula);
  if (list.length !== 2) return null;
  const rs = list.map((r) => identify(r.formula));
  if (rs.some((r) => !r)) return null;
  const species = rs as Species[];
  if (species[0].input === species[1].input && species[0].kind !== "water") return null;
  const concOf = (s: Species) => list[species.indexOf(s)]?.concentration;
  const ctx: Ctx = { input, rs: species, conc: concOf, T: Number.isFinite(input.temperatureC) ? input.temperatureC : 25 };
  const [a, b] = species;
  for (const rule of RULES) {
    for (const [p, q] of [[a, b], [b, a]] as [Species, Species][]) {
      let out: EngineResult | null = null;
      try { out = rule(p, q, ctx); } catch { out = null; }
      if (out) return out;
    }
  }
  return null;
}
