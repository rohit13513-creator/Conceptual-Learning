import { SceneBuilder } from "../components/sceneKit";
import { INK, GREY, BLUE, RED, GREEN, ORANGE, YELLOW, BROWN } from "./harmKit";

// Small drawing helpers for Class VIII Science "Electricity: Magnetic and Heating Effects" (NCERT Chapter 4).
// Shapes that carry no text use fill only or decor lines, so the overlap checker only looks at text, boxes and arrows.

export const IRON = "#64748b", LIGHTIRON = "#94a3b8", COPPER = "#c2410c", ZINC = "#94a3b8", WIRE = "#1e293b", NICHROME = "#7c2d12";

/** a cell symbol: long thin line (positive) and short thick line (negative) at x; the gap between wires is at y */
export function cell(sb: SceneBuilder, x: number, y: number, flip = false) {
  const p = flip ? 8 : 0, n = flip ? 0 : 8;
  sb.line(x + p, y - 14, x + p, y + 14, { sw: 2 });
  sb.line(x + n, y - 7, x + n, y + 7, { sw: 5 });
}
/** a switch with two terminals at (x, y) and (x + w, y); on = lever flat, off = lever raised */
export function switchSym(sb: SceneBuilder, x: number, y: number, w: number, on: boolean) {
  sb.circle(x, y, 3, { fill: INK }); sb.circle(x + w, y, 3, { fill: INK });
  if (on) sb.line(x, y, x + w, y, { sw: 2.4 }); else sb.line(x, y, x + w - 8, y - 18, { sw: 2.4 });
}
/** a magnetic compass: ring with a red (north) and blue needle turned `deg` degrees clockwise from the top */
export function compass(sb: SceneBuilder, cx: number, cy: number, r: number, deg: number) {
  sb.circle(cx, cy, r, { fill: "#f8fafc", stroke: INK, sw: 2 });
  const a = (deg * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a), L = r * 0.78;
  sb.poly([[cx + dx * L, cy + dy * L], [cx - dy * 4.5, cy + dx * 4.5], [cx + dy * 4.5, cy - dx * 4.5]], { fill: RED, decor: true });
  sb.poly([[cx - dx * L, cy - dy * L], [cx - dy * 4.5, cy + dx * 4.5], [cx + dy * 4.5, cy - dx * 4.5]], { fill: "#1d4ed8", decor: true });
  sb.circle(cx, cy, 2.2, { fill: INK });
}
/** an iron nail lying horizontally, head on the left */
export function nail(sb: SceneBuilder, x: number, y: number, len: number, col = IRON) {
  sb.rect(x, y - 6, 5, 12, { fill: col });
  sb.rect(x + 5, y - 2.5, len - 5, 5, { fill: col });
  sb.poly([[x + len, y - 2.5], [x + len + 8, y], [x + len, y + 2.5]], { fill: col, decor: true });
}
/** a coil of insulated wire drawn as slanted loops around a horizontal core, from x to x + len */
export function coil(sb: SceneBuilder, x: number, y: number, len: number, turns: number, h = 16, col = COPPER) {
  const step = len / turns;
  for (let i = 0; i < turns; i++) {
    const x0 = x + i * step;
    sb.line(x0, y - h / 2, x0 + step * 0.7, y + h / 2, { stroke: col, sw: 3, decor: true });
  }
}
/** a paper clip (small iron object) */
export function clip(sb: SceneBuilder, x: number, y: number, s = 1) {
  sb.rect(x - 5 * s, y - 3 * s, 10 * s, 6 * s, { rx: 3 * s, stroke: LIGHTIRON, sw: 1.6 });
}
/** a lemon */
export function lemon(sb: SceneBuilder, x: number, y: number, s = 1) {
  sb.ellipse(x, y, 30 * s, 22 * s, { fill: "#fde047" });
  sb.circle(x - 30 * s, y, 3 * s, { fill: "#fde047" }); sb.circle(x + 30 * s, y, 3 * s, { fill: "#fde047" });
  sb.ellipse(x - 8 * s, y - 8 * s, 10 * s, 5 * s, { fill: "#fef9c3" });
}
/** a small LED symbol: triangle and bar with two tiny rays */
export function led(sb: SceneBuilder, x: number, y: number, lit: boolean, flip = false) {
  const s = flip ? -1 : 1;
  sb.poly([[x - 9 * s, y - 10], [x - 9 * s, y + 10], [x + 9 * s, y]], { fill: lit ? YELLOW : "#e2e8f0", stroke: INK, sw: 1.8 });
  sb.line(x + 9 * s, y - 10, x + 9 * s, y + 10, { sw: 2.4 });
  if (lit) [-1, 1].forEach((k) => sb.line(x + 6 + k * 4, y - 16, x + 14 + k * 4, y - 26, { stroke: ORANGE, sw: 2, decor: true }));
}
/** a glass beaker with liquid (fill first, outline over it) */
export function beaker(sb: SceneBuilder, x: number, y: number, w: number, h: number, level: number, liquid: string) {
  const top = y + h * (1 - level);
  sb.rect(x + 1, top, w - 2, y + h - top - 1, { fill: liquid });
  sb.poly([[x, y], [x, y + h], [x + w, y + h], [x + w, y]], { stroke: INK, sw: 2, close: false });
}
/** magnetic field rings round a point (wire cross-section), r values given */
export function rings(sb: SceneBuilder, cx: number, cy: number, rs: number[], col = BLUE) {
  rs.forEach((r, i) => sb.circle(cx, cy, r, { stroke: col, sw: 1.6, dash: i % 2 ? "5 4" : undefined }));
}
/** small arrowhead lying on a circle at angle deg (screen angle, 0 = right, 90 = down), pointing clockwise when cw */
export function ringArrow(sb: SceneBuilder, cx: number, cy: number, r: number, deg: number, cw: boolean, col = BLUE) {
  const a = (deg * Math.PI) / 180, px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
  const t = cw ? a + Math.PI / 2 : a - Math.PI / 2, tx = Math.cos(t), ty = Math.sin(t);
  sb.poly([[px + tx * 7, py + ty * 7], [px - tx * 5 - ty * 5, py - ty * 5 + tx * 5], [px - tx * 5 + ty * 5, py - ty * 5 - tx * 5]], { fill: col, decor: true });
}
/** a plain wire route (polyline) */
export function wire(sb: SceneBuilder, pts: [number, number][], col = WIRE, sw = 2.4) {
  sb.poly(pts, { stroke: col, sw, close: false });
}
export const FLAME = "#f97316";
void [GREY, GREEN, BROWN];
