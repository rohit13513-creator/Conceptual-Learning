import { SceneBuilder, Scene, C, textWidth } from "./sceneKit";

// Expanded structural formulae drawn from a short description. Bond lines stop just short of the atom
// letters, so a line never runs through a letter. Missing hydrogens are filled in from the valency.

const VAL: Record<string, number> = { C: 4, O: 2, N: 3, H: 1, F: 1, Cl: 1, Br: 1, I: 1, S: 2, R: 1, "R'": 1 };
const COL: Record<string, string> = { R: C.purple, "R'": C.purple, C: C.ink, H: "#475569", O: C.red, N: C.blue, F: C.green, Cl: C.green, Br: "#9a3412", I: C.purple, S: "#a16207" };
const SIZE = 16;

interface A { id: number; el: string; x: number; y: number }
interface B { a: number; b: number; order: number }
interface G { atoms: A[]; bonds: B[] }
const L = 64, LY = 42, HX = 32;

function addAtom(g: G, el: string, x: number, y: number): number { g.atoms.push({ id: g.atoms.length, el, x, y }); return g.atoms.length - 1; }
function bond(g: G, a: number, b: number, order = 1) { g.bonds.push({ a, b, order }); }

type Dir = "u" | "d" | "l" | "r";
const vec = (d: Dir): [number, number] => (d === "u" ? [0, -1] : d === "d" ? [0, 1] : d === "l" ? [-1, 0] : [1, 0]);

/** attach a group (written like "OH", "CH3", "Cl", "=O") to atom `from`, growing in direction d */
function attach(g: G, from: number, d: Dir, grp: string) {
  const p = g.atoms[from];
  const [vx, vy] = vec(d);
  const step = d === "u" || d === "d" ? LY : L * 0.8;
  const side = (n: number): [number, number][] => {
    // positions for hydrogens around an atom that grows in direction d: the two sides and the tip
    if (d === "u" || d === "d") return [[-HX, 0], [HX, 0], [0, vy * LY]].slice(0, n) as [number, number][];
    return [[0, -LY], [0, LY], [vx * HX, 0]].slice(0, n) as [number, number][];
  };
  const place = (el: string, x: number, y: number) => addAtom(g, el, x, y);
  const m = grp.match(/^(=?)([A-Z][a-z]?)(.*)$/)!;
  const order = m[1] ? 2 : 1;
  const base = grp === "OH" ? ["O", "H"] : null;
  if (grp === "H" || /^(F|Cl|Br|I)$/.test(grp) || grp === "=O") {
    const el = grp === "=O" ? "O" : grp;
    const a = place(el, p.x + vx * step, p.y + vy * step);
    bond(g, from, a, order);
    return;
  }
  if (base) {
    const o = place("O", p.x + vx * step, p.y + vy * step);
    bond(g, from, o);
    const h = place("H", p.x + vx * step * 2, p.y + vy * step * 2);
    bond(g, o, h);
    return;
  }
  if (grp === "NH2") {
    const n = place("N", p.x + vx * step, p.y + vy * step);
    bond(g, from, n);
    side(2).forEach(([dx, dy]) => { const h = place("H", g.atoms[n].x + dx, g.atoms[n].y + dy); bond(g, n, h); });
    return;
  }
  if (grp === "CH3" || grp === "C2H5") {
    let cur = from, k = 1;
    const carbons = grp === "CH3" ? 1 : 2;
    for (let i = 0; i < carbons; i++) {
      const c = place("C", p.x + vx * step * k, p.y + vy * step * k);
      bond(g, cur, c);
      const last = i === carbons - 1;
      side(last ? 3 : 2).forEach(([dx, dy]) => { const h = place("H", g.atoms[c].x + dx, g.atoms[c].y + dy); bond(g, c, h); });
      cur = c; k++;
    }
    return;
  }
  throw new Error("unknown group " + grp);
}

export interface ChainAtom { el: string; bond?: 1 | 2 | 3; up?: string; down?: string; noH?: boolean }

const subOrder = (s?: string) => (s ? (s.startsWith("=") ? 2 : 1) : 0);

/** a straight chain of atoms with groups above or below; hydrogens are filled in */
export function chain(atoms: ChainAtom[]): G {
  const g: G = { atoms: [], bonds: [] };
  const ids = atoms.map((a, i) => addAtom(g, a.el, i * L, 0));
  atoms.forEach((a, i) => { if (i + 1 < atoms.length) bond(g, ids[i], ids[i + 1], a.bond ?? 1); });
  atoms.forEach((a, i) => {
    const prev = i > 0 ? atoms[i - 1].bond ?? 1 : 0, next = i + 1 < atoms.length ? a.bond ?? 1 : 0;
    const used = prev + next + subOrder(a.up) + subOrder(a.down);
    let rem = (VAL[a.el] ?? 4) - used;
    if (a.up) attach(g, ids[i], "u", a.up);
    if (a.down) attach(g, ids[i], "d", a.down);
    const freeSlots: Dir[] = [];
    const first = i === 0, last = i === atoms.length - 1;
    const terms: Dir[] = [];
    if (first) terms.push("l");
    if (last) terms.push("r");
    if (a.noH) rem = 0;
    const wantOrder: Dir[] = rem >= 3 ? [...terms, "u", "d"] : rem === 2 ? (terms.length === 2 ? ["l", "r"] : ["u", "d", ...terms]) : [...terms, a.up ? "d" : "u", a.up ? "u" : "d"];
    for (const s of wantOrder) {
      if (rem <= 0) break;
      if ((s === "u" && a.up) || (s === "d" && a.down)) continue;
      freeSlots.push(s); rem--;
    }
    freeSlots.forEach((s) => attach(g, ids[i], s, "H"));
  });
  return g;
}

export interface RingOpts { n: number; kind?: "cyclo" | "benzene" }
export function ring(o: RingOpts): G {
  const g: G = { atoms: [], bonds: [] };
  const R = o.n === 3 ? 40 : o.n === 4 ? 50 : o.n === 5 ? 56 : 62;
  const ids: number[] = [];
  const th = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / o.n;
  for (let i = 0; i < o.n; i++) ids.push(addAtom(g, "C", R * Math.cos(th(i)), R * Math.sin(th(i))));
  for (let i = 0; i < o.n; i++) bond(g, ids[i], ids[(i + 1) % o.n], o.kind === "benzene" ? (i % 2 === 0 ? 2 : 1) : 1);
  const Rh = R + 44;
  if (o.kind === "benzene") ids.forEach((id, i) => { const h = addAtom(g, "H", (R + 36) * Math.cos(th(i)), (R + 36) * Math.sin(th(i))); bond(g, id, h); });
  else {
    const dl = o.n === 3 ? 0.5 : o.n === 4 ? 0.42 : o.n === 5 ? 0.38 : 0.34;
    ids.forEach((id, i) => [-dl, dl].forEach((e) => { const h = addAtom(g, "H", Rh * Math.cos(th(i) + e), Rh * Math.sin(th(i) + e)); bond(g, id, h); }));
  }
  return g;
}

/** draw a molecule graph into a scene, centred, with the given padding */
export function drawMolecule(g: G, caption?: string, o: { pad?: number; minW?: number; sb?: SceneBuilder; ox?: number; oy?: number } = {}): Scene {
  const pad = o.pad ?? 18;
  const xs = g.atoms.map((a) => a.x), ys = g.atoms.map((a) => a.y);
  const minX = Math.min(...xs) - 14, maxX = Math.max(...xs) + 14, minY = Math.min(...ys) - 12, maxY = Math.max(...ys) + 12;
  const w = Math.max(maxX - minX + pad * 2, o.minW ?? 0), h = maxY - minY + pad * 2;
  const sb = new SceneBuilder(w, h, caption);
  const ox = (w - (maxX - minX)) / 2 - minX, oy = pad - minY;
  paint(sb, g, ox, oy);
  return sb.build();
}

/** paint a molecule graph into an existing scene builder at an offset */
export function paint(sb: SceneBuilder, g: G, ox: number, oy: number) {
  const P = g.atoms.map((a) => [a.x + ox, a.y + oy] as [number, number]);
  const half = g.atoms.map((a) => [textWidth(a.el, SIZE) / 2, SIZE * 0.5] as [number, number]);
  g.bonds.forEach((b) => {
    const [x1, y1] = P[b.a], [x2, y2] = P[b.b];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const gap = (h: [number, number]) => Math.min(Math.abs(ux) > 1e-6 ? h[0] / Math.abs(ux) : 1e9, Math.abs(uy) > 1e-6 ? h[1] / Math.abs(uy) : 1e9) + 3.5;
    const g1 = gap(half[b.a]), g2 = gap(half[b.b]);
    if (g1 + g2 >= len - 2) return;
    const nx = -uy, ny = ux;
    const offs = b.order === 1 ? [0] : b.order === 2 ? [-2.8, 2.8] : [-4.5, 0, 4.5];
    offs.forEach((o2) => sb.line(x1 + ux * g1 + nx * o2, y1 + uy * g1 + ny * o2, x2 - ux * g2 + nx * o2, y2 - uy * g2 + ny * o2, { sw: 1.7 }));
  });
  g.atoms.forEach((a, i) => sb.text(P[i][0], P[i][1] + SIZE * 0.26, a.el, { size: SIZE, fill: COL[a.el] ?? C.ink }));
}

export const mol = (atoms: ChainAtom[], caption?: string) => drawMolecule(chain(atoms), caption);
export const cyc = (n: number, caption?: string, kind: "cyclo" | "benzene" = "cyclo") => drawMolecule(ring({ n, kind }), caption);

// shorthand builders for the carbon chains
export const alkane = (n: number, caption?: string) => mol(Array.from({ length: n }, () => ({ el: "C" })), caption);
export const C_ = (o: Partial<ChainAtom> = {}): ChainAtom => ({ el: "C", ...o });
export const O_ = (o: Partial<ChainAtom> = {}): ChainAtom => ({ el: "O", ...o });
export const H_ = (): ChainAtom => ({ el: "H" });


// ── composing pictures ──
import type { Item } from "./sceneKit";
export function shift(it: Item, dx: number, dy: number): Item {
  switch (it.k) {
    case "line": return { ...it, x1: it.x1 + dx, y1: it.y1 + dy, x2: it.x2 + dx, y2: it.y2 + dy };
    case "rect": return { ...it, x: it.x + dx, y: it.y + dy };
    case "circle": return { ...it, cx: it.cx + dx, cy: it.cy + dy };
    case "ellipse": return { ...it, cx: it.cx + dx, cy: it.cy + dy };
    case "poly": return { ...it, pts: it.pts.map(([x, y]) => [x + dx, y + dy] as [number, number]) };
    case "path": return { ...it, d: it.d.replace(/(-?d+.?d*)s+(-?d+.?d*)/g, (_m, a, b) => `${parseFloat(a) + dx} ${parseFloat(b) + dy}`), pts: it.pts.map(([x, y]) => [x + dx, y + dy] as [number, number]) };
    case "text": return { ...it, x: it.x + dx, y: it.y + dy };
  }
}
/** several scenes (or text pieces such as "+" or an arrow) placed in rows. A string starting with "->" is an arrow; the rest is its label. */
export type Piece = Scene | string;
export function scheme(rows: Piece[][], caption?: string, gap = 26): Scene {
  const metrics = rows.map((row) => {
    const widths = row.map((p) => (typeof p === "string" ? (p.startsWith("->") || p.startsWith("<>") ? Math.max(70, textWidth(p.slice(2), 12) + 26) : 26) : p.w));
    const h = Math.max(70, ...row.map((p) => (typeof p === "string" ? 0 : p.h)));
    return { widths, h, w: widths.reduce((a, b) => a + b, 0) + gap * (row.length - 1) };
  });
  const W = Math.max(...metrics.map((m) => m.w)) + 20, H = metrics.reduce((a, m) => a + m.h, 0) + gap * (rows.length - 1) + 10;
  const sb = new SceneBuilder(W, H, caption);
  let y = 5;
  rows.forEach((row, ri) => {
    const m = metrics[ri];
    let x = (W - m.w) / 2;
    row.forEach((p, i) => {
      const wd = m.widths[i];
      if (typeof p === "string") {
        const cy = y + m.h / 2;
        if (p.startsWith("->") || p.startsWith("<>")) {
          const label = p.slice(2);
          if (p.startsWith("->")) sb.arrow(x + 4, cy, x + wd - 4, cy, { sw: 2 });
          else { sb.arrow(x + 4, cy - 3, x + wd - 4, cy - 3, { sw: 1.8 }); sb.arrow(x + wd - 4, cy + 4, x + 4, cy + 4, { sw: 1.8 }); }
          if (label) sb.text(x + wd / 2, cy - 12, label, { size: 12, fill: C.grey });
        } else sb.text(x + wd / 2, cy + 6, p, { size: 22, fill: C.ink });
      } else p.items.forEach((it) => sb.items.push(shift(it, x, y + (m.h - p.h) / 2)));
      x += wd + gap;
    });
    y += m.h + gap;
  });
  return sb.build();
}

/** skeleton (line) formula with numbered carbons. subs: groups drawn on a carbon (1-based) */
export function skeleton(n: number, o: { dbl?: number[]; tri?: number[]; subs?: { at: number; text: string }[]; caption?: string; nums?: boolean } = {}): Scene {
  const dx = 52, dy = 26, base = 76;
  const pts = Array.from({ length: n }, (_, i) => [30 + i * dx, base + (i % 2 === 0 ? dy : -dy)] as [number, number]);
  const sb = new SceneBuilder(30 * 2 + (n - 1) * dx + 30, 156, o.caption);
  for (let i = 0; i + 1 < n; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux;
    const order = o.tri?.includes(i + 1) ? 3 : o.dbl?.includes(i + 1) ? 2 : 1;
    const offs = order === 1 ? [0] : order === 2 ? [-2.8, 2.8] : [-4.5, 0, 4.5];
    offs.forEach((d) => sb.line(x1 + nx * d, y1 + ny * d, x2 + nx * d, y2 + ny * d, { sw: 2 }));
  }
  pts.forEach(([x, y], i) => {
    const up = i % 2 === 1;
    const sub = o.subs?.find((q) => q.at === i + 1);
    if (sub) {
      if (up) { sb.line(x, y - 3, x, y - 18, { sw: 2 }); sb.text(x, y - 26, sub.text, { size: 14, fill: C.teal }); }
      else { sb.line(x, y + 3, x, y + 18, { sw: 2 }); sb.text(x, y + 34, sub.text, { size: 14, fill: C.teal }); }
    }
    if (o.nums !== false) {
      if (sub) sb.text(x + 20, up ? y + 4 : y - 3, String(i + 1), { size: 12, fill: C.red });
      else sb.text(x, up ? y - 11 : y + 22, String(i + 1), { size: 12, fill: C.red });
    }
  });
  return sb.build();
}
