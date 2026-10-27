import { SceneBuilder, Scene, C, Pt } from "./sceneKit";

// Carbon allotropes and soap molecules, drawn as scenes.

const atom = (sb: SceneBuilder, x: number, y: number, r = 13, label = "C") => {
  sb.circle(x, y, r, { fill: "#1f2937" });
  sb.text(x, y + 4.4, label, { size: 12, fill: "#ffffff" });
};
function bondBetween(sb: SceneBuilder, a: Pt, b: Pt, ra: number, rb: number, o: { dash?: string; sw?: number } = {}) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  sb.line(a[0] + ux * ra, a[1] + uy * ra, b[0] - ux * rb, b[1] - uy * rb, { sw: o.sw ?? 2.4, dash: o.dash });
}

// ── diamond: one carbon bonded to four others (tetrahedral) ──
export function diamondUnit(): Scene {
  const sb = new SceneBuilder(400, 300, "Diamond: each carbon atom is joined to four others");
  const c: Pt = [200, 140], n: Pt[] = [[112, 82], [288, 82], [140, 232], [262, 224]];
  // further bonds going on in all directions
  const stubs: [number, Pt[]][] = [[0, [[52, 40], [48, 112]]], [1, [[348, 40], [352, 112]]], [2, [[90, 268], [196, 276]]], [3, [[320, 262], [352, 190]]]];
  stubs.forEach(([i, ends]) => ends.forEach((e) => { bondBetween(sb, n[i], e, 13, 7, { dash: "5 4", sw: 1.8 }); sb.circle(e[0], e[1], 7, { fill: "#ffffff", stroke: "#1f2937", sw: 1.8 }); }));
  bondBetween(sb, c, n[0], 13, 13);
  bondBetween(sb, c, n[1], 13, 13);
  bondBetween(sb, c, n[2], 13, 13, { dash: "6 4" });
  // wedge towards the viewer
  const dx = n[3][0] - c[0], dy = n[3][1] - c[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const s: Pt = [c[0] + ux * 13, c[1] + uy * 13], e: Pt = [n[3][0] - ux * 13, n[3][1] - uy * 13];
  sb.items.push({ k: "poly", pts: [s, [e[0] - uy * 6, e[1] + ux * 6], [e[0] + uy * 6, e[1] - ux * 6]], fill: "#1f2937", close: true });
  atom(sb, c[0], c[1]);
  n.forEach((p) => atom(sb, p[0], p[1]));
  return sb.build();
}

// ── graphite: one flat sheet of hexagons ──
export function graphiteSheet(): Scene {
  const s = 30, W = 400, H = 330;
  const sb = new SceneBuilder(W, H, "Graphite: a flat sheet of hexagons (one layer)");
  const cx0 = W / 2, cy0 = 150;
  const cells: [number, number][] = [[0, 0], [1, 0], [-1, 0], [0, 1], [-1, 1], [0, -1], [1, -1]];
  const key = (x: number, y: number) => `${Math.round(x)},${Math.round(y)}`;
  const verts = new Map<string, Pt>(), edges = new Map<string, [Pt, Pt]>();
  cells.forEach(([q, r]) => {
    const hx = cx0 + s * Math.sqrt(3) * (q + r / 2), hy = cy0 + s * 1.5 * r;
    const v: Pt[] = Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 180) * (90 + 60 * k); return [hx + s * Math.cos(a), hy - s * Math.sin(a)] as Pt; });
    v.forEach((p) => verts.set(key(p[0], p[1]), p));
    for (let k = 0; k < 6; k++) { const a = v[k], b = v[(k + 1) % 6]; const ka = key(a[0], a[1]), kb = key(b[0], b[1]); edges.set(ka < kb ? ka + "|" + kb : kb + "|" + ka, [a, b]); }
  });
  edges.forEach(([a, b]) => sb.line(a[0], a[1], b[0], b[1], { sw: 2.2 }));
  verts.forEach((p) => sb.circle(p[0], p[1], 4.6, { fill: "#1f2937" }));
  sb.text(W / 2, 310, "Each carbon: 3 bonds in the plane + 1 free electron", { size: 12.5, fill: C.ink });
  return sb.build();
}

// ── graphite: layers stacked one above the other ──
export function graphiteLayers(): Scene {
  const W = 580, H = 300;
  const sb = new SceneBuilder(W, H, "Graphite: layers held together by weak forces");
  const layer = (y: number) => {
    sb.poly([[70, y], [300, y], [350, y - 34], [120, y - 34]], { fill: "#e2e8f0", stroke: "#334155", sw: 1.8 });
    for (let k = 0; k < 6; k++) sb.circle(104 + k * 36, y - 17, 4.4, { fill: "#1f2937" });
  };
  layer(236); layer(160); layer(84);
  [["Layer 3", 62], ["Layer 2", 138], ["Layer 1", 214]].forEach(([t, y]) => sb.text(10, y as number, t as string, { size: 12.5, anchor: "start" }));
  sb.arrow(366, 170, 366, 232, { stroke: C.red });
  sb.arrow(380, 232, 380, 170, { stroke: C.red });
  sb.text(396, 196, "Weak forces", { size: 12.5, fill: C.red, anchor: "start" });
  sb.text(396, 212, "between layers", { size: 12.5, fill: C.red, anchor: "start" });
  sb.arrow(150, 34, 300, 34, { stroke: C.blue });
  sb.text(330, 38, "Layers slide over each other", { size: 12.5, fill: C.blue, anchor: "start" });
  sb.text(260, 282, "Strong covalent bonds inside each layer", { size: 12.5 });
  return sb.build();
}

// ── C60 football (buckminsterfullerene) ──
export function c60(): Scene {
  const phi = (1 + Math.sqrt(5)) / 2;
  const base: [number, number, number][] = [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, 2 * phi + 1]];
  const signs = (v: [number, number, number]) => {
    const out: [number, number, number][] = [];
    for (const sx of v[0] === 0 ? [1] : [1, -1]) for (const sy of v[1] === 0 ? [1] : [1, -1]) for (const sz of v[2] === 0 ? [1] : [1, -1]) out.push([v[0] * sx, v[1] * sy, v[2] * sz]);
    return out;
  };
  const V: [number, number, number][] = [];
  base.forEach((b) => signs(b).forEach((p) => { V.push([p[0], p[1], p[2]], [p[2], p[0], p[1]], [p[1], p[2], p[0]]); }));
  // rotate for a pleasant view
  const rx = 0.42, ry = 0.5;
  const R = V.map(([x, y, z]) => {
    const y1 = y * Math.cos(rx) - z * Math.sin(rx), z1 = y * Math.sin(rx) + z * Math.cos(rx);
    const x2 = x * Math.cos(ry) + z1 * Math.sin(ry), z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    return [x2, y1, z2] as [number, number, number];
  });
  const k = 31, cx = 175, cy = 150;
  const sb = new SceneBuilder(350, 330, "C₆₀: a football of carbon atoms (60 atoms, 12 pentagons, 20 hexagons)");
  const vis = (i: number) => R[i][2] > 0.35;
  for (let i = 0; i < R.length; i++) for (let j = i + 1; j < R.length; j++) {
    const d = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
    if (Math.abs(d - 2) < 1e-6 && vis(i) && vis(j)) sb.line(cx + R[i][0] * k, cy - R[i][1] * k, cx + R[j][0] * k, cy - R[j][1] * k, { sw: 1.8 });
  }
  for (let i = 0; i < R.length; i++) if (vis(i)) sb.circle(cx + R[i][0] * k, cy - R[i][1] * k, 4.2, { fill: "#1f2937" });
  sb.text(175, 316, "Front half of the molecule is shown", { size: 12, fill: C.grey, bold: false });
  return sb.build();
}

// ── soap molecule (tadpole) ──
function zigzag(a: Pt, ang: number, len: number, amp = 4, step = 8): Pt[] {
  const pts: Pt[] = [a];
  const n = Math.floor(len / step), ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux;
  for (let i = 1; i <= n; i++) { const o = (i % 2 ? 1 : -1) * amp; pts.push([a[0] + ux * step * i + nx * o, a[1] + uy * step * i + ny * o]); }
  return pts;
}
function tadpole(sb: SceneBuilder, hx: number, hy: number, ang: number, len: number, hr = 6.5, tail = C.orange, head = C.blue) {
  // head at (hx,hy); tail starts at the head edge and runs in direction `ang` (radians)
  const sx = hx + Math.cos(ang) * hr, sy = hy + Math.sin(ang) * hr;
  const pts = zigzag([sx, sy], ang, len, 2.2, 6);
  sb.poly(pts, { stroke: tail, sw: 1.7, close: false });
  sb.circle(hx, hy, hr, { fill: head });
}

export function soapMolecule(): Scene {
  const sb = new SceneBuilder(440, 190, "A soap molecule has a head and a tail");
  const hr = 14, hx = 62, hy = 92;
  const pts = zigzag([hx + hr, hy], 0, 290, 6, 14);
  sb.poly(pts, { stroke: C.orange, sw: 2.6, close: false });
  sb.circle(hx, hy, hr, { fill: C.blue });
  sb.text(hx, 40, "Ionic head", { size: 13, fill: C.blue });
  sb.text(hx, 56, "−COO^{−}Na^{+}", { size: 12.5, fill: C.blue });
  sb.text(hx, 138, "water-loving", { size: 12.5, fill: C.blue, bold: false });
  sb.text(250, 52, "Long hydrocarbon tail", { size: 13, fill: C.orange });
  sb.text(250, 138, "oil-loving, water-hating", { size: 12.5, fill: C.orange, bold: false });
  sb.text(250, 168, "e.g. sodium stearate, C_{17}H_{35}COO^{−}Na^{+}", { size: 12 });
  return sb.build();
}

// ── soap at the surface of water ──
export function soapSurface(): Scene {
  const sb = new SceneBuilder(440, 250, "Soap molecules at the surface of water");
  sb.rect(20, 118, 400, 100, { fill: "#dbeafe" });
  sb.line(20, 118, 420, 118, { stroke: C.blue, sw: 2 });
  for (let i = 0; i < 7; i++) tadpole(sb, 150 + i * 40, 134, -Math.PI / 2, 52);
  sb.text(220, 28, "Air", { size: 13, fill: C.grey });
  sb.text(222, 240, "Water", { size: 13, fill: C.blue });
  sb.text(14, 70, "Tails stand", { size: 12, fill: C.orange, anchor: "start" });
  sb.text(14, 86, "out of water", { size: 12, fill: C.orange, anchor: "start" });
  sb.text(14, 168, "Heads stay", { size: 12, fill: C.blue, anchor: "start" });
  sb.text(14, 184, "in water", { size: 12, fill: C.blue, anchor: "start" });
  return sb.build();
}

// ── micelle ──
export function micelle(inWater: boolean): Scene {
  const W = 420, H = 300, cx = 150, cy = 150, R = 92, n = 16;
  const sb = new SceneBuilder(W, H, inWater ? "A micelle in water: tails inside, ionic heads outside" : "Soap in a hydrocarbon (kerosene): heads inside, tails outside");
  const tail = 40;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const hx = cx + R * Math.cos(a), hy = cy + R * Math.sin(a);
    if (inWater) tadpole(sb, hx, hy, a + Math.PI, tail);
    else {
      // heads inside, tails pointing outward
      const r2 = R - 30;
      tadpole(sb, cx + r2 * Math.cos(a), cy + r2 * Math.sin(a), a, tail);
    }
  }
  if (inWater) { sb.circle(cx, cy, 24, { fill: "#fde68a", stroke: "#ca8a04", sw: 1.4 }); sb.text(cx, cy + 4, "Oil", { size: 12, fill: "#92400e" }); }
  const lab = (x: number, y: number, t: string, col: string) => sb.text(x, y, t, { size: 12.5, fill: col, anchor: "start" });
  if (inWater) {
    lab(268, 70, "Ionic heads face water", C.blue); sb.line(262, 66, cx + R * Math.cos(-0.7) + 8, cy + R * Math.sin(-0.7) - 4, { stroke: C.grey, sw: 1.2 });
    lab(268, 160, "Tails trap the", C.orange); lab(268, 176, "oily dirt inside", C.orange);
    sb.line(262, 168, cx + 26, cy + 14, { stroke: C.grey, sw: 1.2 });
  } else {
    lab(268, 70, "Tails face the", C.orange); lab(268, 86, "hydrocarbon", C.orange); sb.line(262, 70, cx + 118 * Math.cos(-0.7), cy + 118 * Math.sin(-0.7), { stroke: C.grey, sw: 1.2 });
    lab(268, 190, "Ionic heads inside", C.blue); sb.line(262, 186, cx + 40, cy + 22, { stroke: C.grey, sw: 1.2 });
  }
  return sb.build();
}

// ── cleaning action in three steps ──
export function soapCleaning(): Scene {
  const W = 560, H = 270;
  const sb = new SceneBuilder(W, H, "How soap removes oily dirt");
  const panel = (x0: number, title: string) => { sb.text(x0 + 85, 22, title, { size: 12.5 }); };
  panel(10, "1. Oily dirt on cloth");
  sb.line(30, 190, 170, 190, { stroke: "#64748b", sw: 5 });
  sb.ellipse(100, 172, 34, 16, { fill: "#a16207" });
  sb.text(100, 176, "dirt", { size: 11.5, fill: "#ffffff" });
  panel(190, "2. Soap tails enter the dirt");
  sb.line(210, 190, 350, 190, { stroke: "#64748b", sw: 5 });
  sb.ellipse(280, 172, 34, 16, { fill: "#a16207" });
  [-26, -12, 2, 16, 28].forEach((dx, i) => tadpole(sb, 280 + dx * 1.15, 112 + (i % 2) * 6, Math.PI / 2, 38, 6));
  panel(370, "3. Micelles carry dirt away");
  sb.ellipse(465, 130, 20, 12, { fill: "#a16207" });
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; tadpole(sb, 465 + 46 * Math.cos(a), 130 + 36 * Math.sin(a), a + Math.PI, 18, 5.2); }
  sb.arrow(465, 80, 465, 54, { stroke: C.blue });
  sb.text(280, 258, "Water rinses the micelles away", { size: 12.5, fill: C.blue });
  return sb.build();
}
