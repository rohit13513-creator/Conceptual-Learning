import { SceneBuilder, Scene, C } from "./sceneKit";

// Electron dot structures. Atoms sit on a grid (one unit = 62 px). A shared pair is drawn between the two
// atoms (one marker from each atom); a lone pair is drawn on the side of the atom that is free.

export interface LAtom { el: string; x: number; y: number; m?: "o" | "x"; lone?: string; loneAt?: number[] }
export type LBond = [number, number, number] | [number, number, number, string];

const U = 62;
const MCOL = { o: C.blue, x: C.red };
const COL: Record<string, string> = { C: C.ink, H: "#475569", O: C.red, N: C.blue, F: C.green, Cl: C.green, S: "#a16207" };

function marker(sb: SceneBuilder, x: number, y: number, kind: "o" | "x") {
  if (kind === "o") sb.circle(x, y, 2.5, { fill: MCOL.o });
  else { sb.line(x - 2.8, y - 2.8, x + 2.8, y + 2.8, { stroke: MCOL.x, sw: 1.7 }); sb.line(x - 2.8, y + 2.8, x + 2.8, y - 2.8, { stroke: MCOL.x, sw: 1.7 }); }
}

export function lewis(atoms: LAtom[], bonds: LBond[], caption?: string, minW = 0): Scene {
  const xs = atoms.map((a) => a.x * U), ys = atoms.map((a) => a.y * U);
  const pad = 40;
  const minX = Math.min(...xs) - pad, maxX = Math.max(...xs) + pad, minY = Math.min(...ys) - pad, maxY = Math.max(...ys) + pad;
  const w = Math.max(maxX - minX, minW), h = maxY - minY;
  const ox = (w - (maxX - minX)) / 2 - minX, oy = -minY;
  const sb = new SceneBuilder(w, h, caption);
  const P = atoms.map((a) => [a.x * U + ox, a.y * U + oy] as [number, number]);
  // shared pairs
  bonds.forEach(([ia, ib, order, kinds]) => {
    const [x1, y1] = P[ia], [x2, y2] = P[ib];
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const ka = (kinds ? kinds[0] : atoms[ia].m ?? "o") as "o" | "x";
    const kb = (kinds ? kinds[1] : atoms[ib].m ?? "x") as "o" | "x";
    const offs = order === 1 ? [0] : order === 2 ? [-5.5, 5.5] : [-10, 0, 10];
    offs.forEach((o) => {
      marker(sb, mx + nx * o - ux * 5, my + ny * o - uy * 5, ka);
      marker(sb, mx + nx * o + ux * 5, my + ny * o + uy * 5, kb);
    });
  });
  // lone pairs
  atoms.forEach((a, i) => {
    const [x, y] = P[i];
    (a.lone ?? "").split("").forEach((s) => {
      const [vx, vy] = s === "u" ? [0, -1] : s === "d" ? [0, 1] : s === "l" ? [-1, 0] : [1, 0];
      const cx = x + vx * 19, cy = y + vy * 19;
      const tx = -vy, ty = vx;
      marker(sb, cx + tx * 4.5, cy + ty * 4.5, a.m ?? "o");
      marker(sb, cx - tx * 4.5, cy - ty * 4.5, a.m ?? "o");
    });
  });
  atoms.forEach((a, i) => (a.loneAt ?? []).forEach((deg) => {
    const t = (deg * Math.PI) / 180, vx = Math.cos(t), vy = -Math.sin(t);
    const cx = P[i][0] + vx * 19, cy = P[i][1] + vy * 19, tx = -vy, ty = vx;
    marker(sb, cx + tx * 4.5, cy + ty * 4.5, a.m ?? "o");
    marker(sb, cx - tx * 4.5, cy - ty * 4.5, a.m ?? "o");
  }));
  atoms.forEach((a, i) => sb.text(P[i][0], P[i][1] + 5.5, a.el, { size: 19, fill: COL[a.el] ?? C.ink }));
  return sb.build();
}

export const LEWIS_RINGS: Record<string, () => Scene> = {};
// ready-made molecules (x = cross, o = dot)
const o = (el: string, x: number, y: number, lone = ""): LAtom => ({ el, x, y, m: "o", lone });
const x = (el: string, xx: number, y: number, lone = ""): LAtom => ({ el, x: xx, y, m: "x", lone });

export const LEWIS = {
  H2: () => lewis([o("H", 0, 0), x("H", 1, 0)], [[0, 1, 1]], "Hydrogen, H₂ (one shared pair)"),
  Cl2: () => lewis([o("Cl", 0, 0, "uld"), x("Cl", 1, 0, "urd")], [[0, 1, 1]], "Chlorine, Cl₂ (one shared pair)", 230),
  F2: () => lewis([o("F", 0, 0, "uld"), x("F", 1, 0, "urd")], [[0, 1, 1]], "Fluorine, F₂ (one shared pair)", 230),
  O2: () => lewis([o("O", 0, 0, "ud"), x("O", 1, 0, "ud")], [[0, 1, 2]], "Oxygen, O₂ (double bond)", 230),
  N2: () => lewis([o("N", 0, 0, "l"), x("N", 1, 0, "r")], [[0, 1, 3]], "Nitrogen, N₂ (triple bond)", 230),
  H2O: () => lewis([x("O", 0, 0, "ud"), o("H", -1, 0), o("H", 1, 0)], [[0, 1, 1], [0, 2, 1]], "Water, H₂O", 260),
  H2S: () => lewis([x("S", 0, 0, "ud"), o("H", -1, 0), o("H", 1, 0)], [[0, 1, 1], [0, 2, 1]], "Hydrogen sulphide, H₂S", 260),
  NH3: () => lewis([x("N", 0, 0, "u"), o("H", -1, 0), o("H", 1, 0), o("H", 0, 1)], [[0, 1, 1], [0, 2, 1], [0, 3, 1]], "Ammonia, NH₃", 260),
  CH4: () => lewis([x("C", 0, 0), o("H", 0, -1), o("H", 0, 1), o("H", -1, 0), o("H", 1, 0)], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], "Methane, CH₄", 260),
  CH3Cl: () => lewis([x("C", 0, 0), o("H", 0, -1), o("H", 0, 1), o("H", -1, 0), o("Cl", 1, 0, "urd")], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], "Chloromethane, CH₃Cl", 300),
  CO2: () => lewis([x("C", 0, 0), o("O", -1, 0, "ud"), o("O", 1, 0, "ud")], [[0, 1, 2], [0, 2, 2]], "Carbon dioxide, CO₂", 300),
  C2H6: () => lewis([x("C", 0, 0), x("C", 1, 0), o("H", 0, -1), o("H", 0, 1), o("H", -1, 0), o("H", 1, -1), o("H", 1, 1), o("H", 2, 0)], [[0, 1, 1, "oo"], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1]], "Ethane, C₂H₆", 330),
  C2H4: () => lewis([x("C", 0, 0), x("C", 1, 0), o("H", 0, -1), o("H", 0, 1), o("H", 1, -1), o("H", 1, 1)], [[0, 1, 2, "oo"], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]], "Ethene, C₂H₄ (double bond)", 300),
  C2H2: () => lewis([x("C", 0, 0), x("C", 1, 0), o("H", -1, 0), o("H", 2, 0)], [[0, 1, 3, "oo"], [0, 2, 1], [1, 3, 1]], "Ethyne, C₂H₂ (triple bond)", 330),
  CH3COOH: () => lewis([x("C", 0, 0), x("C", 1, 0), o("H", 0, -1), o("H", 0, 1), o("H", -1, 0), o("O", 1, -1, "lr"), o("O", 2, 0, "ud"), o("H", 3, 0)], [[0, 1, 1, "oo"], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 2], [1, 6, 1, "xx"], [6, 7, 1, "xo"]], "Ethanoic acid, CH₃COOH", 360),
  CH3COCH3: () => lewis([x("C", 0, 0), x("C", 1, 0), x("C", 2, 0), o("H", 0, -1), o("H", 0, 1), o("H", -1, 0), o("O", 1, -1, "lr"), o("H", 2, -1), o("H", 2, 1), o("H", 3, 0)], [[0, 1, 1, "oo"], [1, 2, 1, "oo"], [0, 3, 1], [0, 4, 1], [0, 5, 1], [1, 6, 2], [2, 7, 1], [2, 8, 1], [2, 9, 1]], "Propanone, CH₃COCH₃", 400),
};

// ring molecules: sulphur S8, cyclopentane and cyclohexane
function ringLewis(n: number, kind: "S" | "C", caption: string): Scene {
  const atoms: LAtom[] = [], bonds: LBond[] = [];
  const R = kind === "S" ? 1.45 : n === 5 ? 1.1 : 1.0;
  for (let i = 0; i < n; i++) {
    const a = Math.PI / 2 + (i * 2 * Math.PI) / n, deg = (a * 180) / Math.PI;
    atoms.push({ el: kind, x: R * Math.cos(a), y: -R * Math.sin(a), m: kind === "S" ? (i % 2 ? "x" : "o") : "x", loneAt: kind === "S" ? [deg + 38, deg - 38] : undefined });
  }
  for (let i = 0; i < n; i++) bonds.push([i, (i + 1) % n, 1, kind === "C" ? "oo" : undefined as any]);
  if (kind === "C") for (let i = 0; i < n; i++) {
    const a = Math.PI / 2 + (i * 2 * Math.PI) / n;
    [-0.36, 0.36].forEach((d) => { atoms.push({ el: "H", x: (R + 0.95) * Math.cos(a + d), y: -(R + 0.95) * Math.sin(a + d), m: "o" }); bonds.push([i, atoms.length - 1, 1]); });
  }
  return lewis(atoms, bonds.map((b) => (b[3] === undefined ? [b[0], b[1], b[2]] as LBond : b)), caption);
}
LEWIS_RINGS.S8 = () => ringLewis(8, "S", "Sulphur, S₈: a ring of 8 atoms, each sharing a pair with its two neighbours");
LEWIS_RINGS.C5H10 = () => ringLewis(5, "C", "Cyclopentane, C₅H₁₀");
LEWIS_RINGS.C6H12 = () => ringLewis(6, "C", "Cyclohexane, C₆H₁₂");
