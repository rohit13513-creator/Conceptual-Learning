import { SceneBuilder, Scene, C, Pt } from "./sceneKit";

// Laboratory pictures: test tubes, flames, burners, the oil trap. Every picture is a Scene, so the overlap checker covers it.

// ── building blocks ──
function tubeOutline(x: number, top: number, w: number, h: number): Pt[] {
  const r = w / 2, cx = x + r, cy = top + h - r;
  const pts: Pt[] = [[x, top], [x, cy]];
  for (let k = 1; k < 16; k++) { const a = Math.PI - (k / 16) * Math.PI; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  pts.push([x + w, cy], [x + w, top]);
  return pts;
}
const dOf = (pts: Pt[]) => "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");

/** a test tube with liquid filling `level` (0..1) of its height */
export function tube(sb: SceneBuilder, x: number, top: number, w: number, h: number, o: { level?: number; liquid?: string; sw?: number } = {}) {
  const r = w / 2, yl = top + h * (1 - (o.level ?? 0));
  if (o.level && o.liquid) {
    const out = tubeOutline(x, top, w, h);
    const below = out.filter((p) => p[1] >= yl);
    const poly: Pt[] = [[x, yl], ...below.filter((p) => p[0] <= x + r || true), [x + w, yl]];
    // keep the order of the outline between the two wall points at the liquid surface
    const startIdx = out.findIndex((p) => p[1] >= yl);
    const seg = out.slice(startIdx).filter((p) => p[1] >= yl);
    sb.items.push({ k: "poly", pts: [[x, yl], ...seg, [x + w, yl]].map((p) => p as Pt), fill: o.liquid, close: true });
    void poly;
  }
  const out = tubeOutline(x, top, w, h);
  sb.items.push({ k: "path", d: dOf(out), pts: out, fill: "none", stroke: C.ink, sw: o.sw ?? 2 });
  return { surfaceY: yl, bottomY: top + h, cx: x + r };
}

/** teardrop flame whose base sits at y = by */
export function flame(sb: SceneBuilder, cx: number, by: number, w: number, h: number, fill: string, stroke?: string) {
  const left: Pt[] = [], right: Pt[] = [];
  for (let i = 0; i <= 24; i++) {
    const u = i / 24;
    const hw = (w / 2) * Math.sin(Math.PI * Math.pow(u, 0.62)) * (1 - 0.15 * u);
    left.push([cx - hw, by - h * u]);
    right.push([cx + hw, by - h * u]);
  }
  sb.items.push({ k: "poly", pts: [...left, ...right.reverse()], fill, stroke, sw: 1.3, close: true });
}

const bubble = (sb: SceneBuilder, x: number, y: number, r = 3.2) => sb.circle(x, y, r, { fill: "#ffffff", stroke: "#475569", sw: 1.2 });

// ── 1. burn a sample and pass the gas through limewater (also used for carbonate + acid) ──
export function limewaterTest(left: string[], caption: string, milky = true): Scene {
  const sb = new SceneBuilder(450, 280, caption);
  // generating tube
  sb.rect(62, 66, 46, 12, { fill: "#b45309", stroke: C.ink, sw: 1.4 });
  tube(sb, 62, 72, 46, 118, { level: 0.34, liquid: "#e0f2fe" });
  sb.rect(74, 168, 22, 8, { fill: "#6b7280" });
  flame(sb, 85, 228, 22, 30, "#fdba74", "#ea580c");
  // delivery tube
  sb.poly([[85, 72], [85, 32], [334, 32], [334, 168]], { stroke: "#475569", sw: 3.4, close: false });
  // receiving tube with limewater
  tube(sb, 312, 100, 44, 104, { level: 0.62, liquid: milky ? "#e5e7eb" : "#e0f2fe" });
  [[322, 182], [345, 186], [334, 192]].forEach(([x, y]) => bubble(sb, x, y));
  sb.text(209, 22, "Delivery tube", { size: 12, fill: C.grey });
  left.forEach((t, i) => sb.text(85, 252 + i * 14, t, { size: 12 }));
  sb.text(334, 224, "Limewater", { size: 12, fill: C.blue });
  sb.text(334, 240, milky ? "turns milky" : "", { size: 12, fill: C.blue });
  return sb.build();
}

// ── 2. Bunsen burner: air hole closed and open ──
function burner(sb: SceneBuilder, cx: number, open: boolean) {
  sb.poly([[cx - 36, 252], [cx + 36, 252], [cx + 28, 236], [cx - 28, 236]], { fill: "#94a3b8", stroke: C.ink, sw: 1.6 });
  sb.rect(cx - 7, 130, 14, 106, { fill: "#cbd5e1", stroke: C.ink, sw: 1.6 });
  sb.rect(cx - 11, 196, 22, 28, { fill: "#94a3b8", stroke: C.ink, sw: 1.6 });
  if (open) sb.ellipse(cx, 210, 4.5, 7, { fill: "#ffffff", stroke: C.ink, sw: 1.3 });
}
export function bunsenFlames(): Scene {
  const sb = new SceneBuilder(470, 330, "Flames of a Bunsen burner");
  // left: air hole closed -> yellow, sooty
  burner(sb, 120, false);
  flame(sb, 120, 130, 40, 92, "#fde047", "#ca8a04");
  [[112, 22], [128, 14], [122, 32]].forEach(([x, y]) => sb.circle(x, y, 2.6, { fill: "#334155" }));
  sb.text(120, 284, "Air hole closed", { size: 13 });
  sb.text(120, 302, "Yellow, sooty flame", { size: 12, fill: "#a16207" });
  sb.text(120, 318, "(incomplete combustion)", { size: 11.5, fill: C.grey, bold: false });
  // right: air hole open -> blue
  burner(sb, 350, true);
  flame(sb, 350, 130, 28, 62, "#93c5fd", "#2563eb");
  flame(sb, 350, 130, 11, 30, "#1d4ed8");
  sb.text(350, 284, "Air hole open", { size: 13 });
  sb.text(350, 302, "Blue flame, no soot", { size: 12, fill: C.blue });
  sb.text(350, 318, "(complete combustion)", { size: 11.5, fill: C.grey, bold: false });
  sb.line(386, 211, 361, 211, { stroke: C.grey, sw: 1.2 });
  sb.text(390, 215, "air hole", { size: 11.5, fill: C.grey, anchor: "start", bold: false });
  return sb.build();
}

// ── 3. burning a carbon compound on a spatula under a metal plate ──
export function sootActivity(): Scene {
  const sb = new SceneBuilder(420, 270, "Burning a carbon compound: is there a sooty deposit?");
  sb.rect(110, 52, 200, 10, { fill: "#94a3b8", stroke: C.ink, sw: 1.6 });
  sb.rect(130, 62, 160, 6, { fill: "#1f2937" });
  sb.line(60, 224, 196, 206, { stroke: "#64748b", sw: 5 });
  sb.circle(204, 204, 8, { fill: "#a3a3a3", stroke: C.ink, sw: 1.3 });
  flame(sb, 204, 196, 36, 100, "#fde047", "#ca8a04");
  sb.text(210, 38, "Metal plate", { size: 13 });
  sb.line(318, 66, 296, 66, { stroke: C.grey, sw: 1.2 });
  sb.text(324, 70, "Black soot", { size: 12, fill: C.grey, anchor: "start" });
  sb.text(210, 250, "Compound on a spatula, burning", { size: 12 });
  sb.line(158, 150, 182, 160, { stroke: C.grey, sw: 1.2 });
  sb.text(154, 148, "Yellow flame", { size: 12, fill: "#a16207", anchor: "end" });
  return sb.build();
}

// ── 4. an oil trap under the ground ──
export function oilTrap(): Scene {
  const W = 560, H = 330;
  const sb = new SceneBuilder(W, H, "Natural gas and petroleum trapped under impervious rock");
  const arch = (x: number) => 230 - 100 * Math.sin((Math.PI * (x - 60)) / 330);
  const band = (ya: number, yb: number): Pt[] => {
    const top: Pt[] = [], bot: Pt[] = [];
    for (let x = 60; x <= 390; x += 5) { const a = arch(x); if (a < yb) { top.push([x, Math.max(a, ya)]); bot.push([x, yb]); } }
    return [...top, ...bot.reverse()];
  };
  sb.rect(20, 44, 380, 250, { fill: "#fef3c7" });
  sb.rect(20, 44, 380, 22, { fill: "#a3e635" });
  const capTop: Pt[] = [], capBot: Pt[] = [];
  for (let x = 60; x <= 390; x += 5) { capTop.push([x, arch(x) - 26]); capBot.push([x, arch(x)]); }
  sb.poly([...capTop, ...capBot.reverse()], { fill: "#9ca3af", stroke: "#4b5563", sw: 1.4 });
  sb.poly(band(0, 150), { fill: "#bae6fd" });
  sb.poly(band(150, 186), { fill: "#92400e" });
  sb.poly(band(186, 232), { fill: "#60a5fa" });
  sb.rect(20, 44, 380, 250, { stroke: C.ink, sw: 1.8 });
  sb.line(222, 24, 222, 168, { stroke: "#1f2937", sw: 3 });
  sb.poly([[208, 44], [236, 44], [222, 14]], { stroke: "#1f2937", sw: 2.2, fill: "#e5e7eb" });
  const lab = (y: number, t: string, tx: number, ty: number, col = C.ink) => { sb.line(414, y, tx, ty, { stroke: C.grey, sw: 1.2 }); sb.text(420, y + 4, t, { size: 12.5, fill: col, anchor: "start" }); };
  lab(58, "Soil", 392, 56);
  lab(100, "Impervious rock", 360, 190);
  lab(140, "Natural gas", 272, 145, C.blue);
  lab(176, "Petroleum (oil)", 332, 181, "#92400e");
  lab(214, "Water", 300, 212, C.blue);
  lab(256, "Porous rock", 396, 262);
  return sb.build();
}

// ── 5. rows of test tubes ──
export interface TubeSpec { name: string[]; level?: number; liquid?: string; layers?: [string, number][]; foam?: boolean; curds?: boolean; emulsion?: boolean; bubbles?: number; piece?: boolean; match?: boolean }
export function tubeRow(specs: TubeSpec[], caption: string, labelSize = 12): Scene {
  const gap = 150, W = specs.length * gap + 30, H = 270;
  const sb = new SceneBuilder(W, H, caption);
  specs.forEach((s, i) => {
    const cx = 15 + gap / 2 + i * gap, x = cx - 24, top = 50, h = 130, w = 48;
    if (s.layers) {
      const total = s.layers.reduce((a, l) => a + l[1], 0);
      let used = 0;
      const cum = s.layers.map(([col, frac]) => { used += frac; return { col, lvl: (used / total) * (s.level ?? 0.7) }; });
      // the first layer is the bottom one; paint the top layer first and the lower ones over it
      [...cum].reverse().forEach((c) => tube(sb, x, top, w, h, { level: c.lvl, liquid: c.col, sw: 0.01 }));
      tube(sb, x, top, w, h, {});
    } else tube(sb, x, top, w, h, { level: s.level ?? 0.7, liquid: s.liquid ?? "#bfdbfe" });
    const surf = top + h * (1 - (s.level ?? 0.7));
    if (s.emulsion) for (let k = 0; k < 14; k++) sb.circle(x + 8 + ((k * 13) % 32), surf + 12 + ((k * 17) % 70), 2.4, { fill: "#fde68a", stroke: "#ca8a04", sw: 0.8 });
    if (s.foam) for (let k = 0; k < 7; k++) bubble(sb, x + 9 + ((k * 11) % 31), surf - 4 - (k % 3) * 5, 4);
    if (s.curds) for (let k = 0; k < 6; k++) sb.circle(x + 10 + ((k * 9) % 28), surf + 18 + ((k * 14) % 56), 3.6, { fill: "#ffffff", stroke: "#94a3b8", sw: 1 });
    for (let k = 0; k < (s.bubbles ?? 0); k++) bubble(sb, x + 14 + ((k * 12) % 22), surf + 22 + k * 15, 3);
    if (s.piece) sb.rect(x + 14, surf + 4, 14, 8, { fill: "#9ca3af", stroke: C.ink, sw: 1 });
    if (s.match) { sb.line(cx + 38, top - 22, cx + 8, top - 4, { stroke: "#92400e", sw: 3 }); flame(sb, cx + 40, top - 20, 12, 22, "#fdba74", "#ea580c"); }
    s.name.forEach((t, k) => sb.text(cx, 206 + k * 16, t, { size: labelSize, fill: k === 0 ? C.ink : C.grey, bold: k === 0 }));
  });
  return sb.build();
}

// ── 6. warming ethanol and ethanoic acid in a water bath ──
export function esterBath(): Scene {
  const sb = new SceneBuilder(430, 290, "Forming an ester: the mixture is warmed in a water bath");
  sb.rect(90, 110, 170, 128, { fill: "#dbeafe", stroke: C.ink, sw: 2 });
  sb.rect(90, 110, 170, 22, { fill: "#ffffff" });
  sb.rect(90, 110, 170, 128, { stroke: C.ink, sw: 2 });
  tube(sb, 156, 36, 38, 140, { level: 0.5, liquid: "#fef9c3" });
  sb.rect(150, 30, 50, 8, { fill: "#6b7280" });
  flame(sb, 175, 282, 34, 34, "#fdba74", "#ea580c");
  sb.rect(150, 240, 50, 6, { fill: "#475569" });
  sb.line(262, 160, 290, 160, { stroke: C.grey, sw: 1.2 });
  sb.text(296, 164, "Water bath", { size: 12.5, fill: C.blue, anchor: "start" });
  sb.line(204, 110, 290, 92, { stroke: C.grey, sw: 1.2 });
  sb.text(296, 96, "Ethanol + ethanoic", { size: 12.5, fill: "#a16207", anchor: "start" });
  sb.text(296, 112, "acid + a few drops", { size: 12.5, fill: "#a16207", anchor: "start" });
  sb.text(296, 128, "of conc. H₂SO₄", { size: 12.5, fill: "#a16207", anchor: "start" });
  sb.text(296, 226, "Warm for 5 minutes", { size: 12.5, fill: C.ink, anchor: "start" });
  return sb.build();
}
