import { SceneBuilder, C } from "../components/sceneKit";

// Shared colours and small drawing helpers for the Class VIII Science chapter "How Nature Works in Harmony" (NCERT Chapter 12).
// Pictures use shapes without outlines (fill only) so that the overlap checker only looks at the text, boxes and arrows.

export const INK = C.ink;
export const GREEN = "#16a34a", DGREEN = "#166534", LGREEN = "#dcfce7", BLUE = "#2563eb", LBLUE = "#dbeafe", ORANGE = "#ea580c", LORANGE = "#ffedd5";
export const PURPLE = "#7c3aed", LPURPLE = "#ede9fe", GREY = "#64748b", LGREY = "#f1f5f9", RED = "#dc2626", LRED = "#fee2e2", YELLOW = "#facc15", LYELLOW = "#fef9c3";
export const BROWN = "#92400e", LBROWN = "#fde8c8", TEAL = "#0f766e", LTEAL = "#ccfbf1", PINK = "#db2777", LPINK = "#fce7f3";

/** a rounded box with centred lines of text */
export function box(sb: SceneBuilder, x: number, y: number, w: number, h: number, lines: string[], o: { fill?: string; stroke?: string; size?: number; bold?: boolean[]; sw?: number; fillText?: string } = {}) {
  sb.rect(x, y, w, h, { rx: 8, fill: o.fill ?? "#ffffff", stroke: o.stroke ?? INK, sw: o.sw ?? 1.8 });
  const size = o.size ?? 13, lh = size + 4;
  const y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  lines.forEach((t, i) => sb.text(x + w / 2, y0 + i * lh, t, { size, bold: o.bold ? o.bold[i] : i === 0, fill: o.fillText ?? INK }));
}

export function sun(sb: SceneBuilder, x: number, y: number, r = 16) {
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; sb.line(x + Math.cos(a) * (r + 3), y + Math.sin(a) * (r + 3), x + Math.cos(a) * (r + 9), y + Math.sin(a) * (r + 9), { stroke: ORANGE, sw: 2, decor: true }); }
  sb.circle(x, y, r, { fill: YELLOW });
}
export function tree(sb: SceneBuilder, x: number, y: number, s = 1) {
  sb.rect(x - 3 * s, y - 14 * s, 6 * s, 14 * s, { fill: BROWN });
  sb.circle(x, y - 28 * s, 16 * s, { fill: GREEN });
  sb.circle(x - 10 * s, y - 20 * s, 11 * s, { fill: "#22c55e" });
  sb.circle(x + 10 * s, y - 20 * s, 11 * s, { fill: "#22c55e" });
}
export function grass(sb: SceneBuilder, x: number, y: number, s = 1) {
  [-5, 0, 5].forEach((d, i) => sb.line(x + d * s, y, x + (d + (i - 1) * 3) * s, y - (10 + (i === 1 ? 4 : 0)) * s, { stroke: GREEN, sw: 2, decor: true }));
}
/** a fish; dir = 1 faces right, -1 faces left */
export function fish(sb: SceneBuilder, x: number, y: number, col = ORANGE, dir = 1, s = 1) {
  sb.ellipse(x, y, 16 * s, 8 * s, { fill: col });
  sb.poly([[x - dir * 14 * s, y], [x - dir * 26 * s, y - 8 * s], [x - dir * 26 * s, y + 8 * s]], { fill: col, close: true, decor: true });
  sb.circle(x + dir * 8 * s, y - 2 * s, 1.8 * s, { fill: "#ffffff" });
}
/** a four-legged animal; ears: "long" (hare), "antler" (deer), "round" (fox, mouse) */
export function beast(sb: SceneBuilder, x: number, y: number, col: string, kind: "long" | "antler" | "round" = "round", s = 1, dir = 1) {
  sb.ellipse(x, y, 20 * s, 10 * s, { fill: col });
  sb.circle(x + dir * 20 * s, y - 8 * s, 8 * s, { fill: col });
  [-12, -5, 8, 14].forEach((d) => sb.line(x + d * s, y + 6 * s, x + d * s, y + 18 * s, { stroke: col, sw: 3 * s, decor: true }));
  sb.line(x - dir * 18 * s, y - 2 * s, x - dir * 28 * s, y - 8 * s, { stroke: col, sw: 3 * s, decor: true });
  if (kind === "long") { sb.line(x + dir * 18 * s, y - 14 * s, x + dir * 14 * s, y - 30 * s, { stroke: col, sw: 3 * s, decor: true }); sb.line(x + dir * 22 * s, y - 14 * s, x + dir * 24 * s, y - 30 * s, { stroke: col, sw: 3 * s, decor: true }); }
  else if (kind === "antler") { sb.line(x + dir * 18 * s, y - 14 * s, x + dir * 12 * s, y - 28 * s, { stroke: BROWN, sw: 2, decor: true }); sb.line(x + dir * 22 * s, y - 14 * s, x + dir * 28 * s, y - 28 * s, { stroke: BROWN, sw: 2, decor: true }); }
  else { sb.poly([[x + dir * 17 * s, y - 13 * s], [x + dir * 16 * s, y - 22 * s], [x + dir * 22 * s, y - 14 * s]], { fill: col, decor: true }); }
}
export function bird(sb: SceneBuilder, x: number, y: number, col = INK, s = 1) {
  sb.poly([[x - 14 * s, y - 6 * s], [x - 7 * s, y - 10 * s], [x, y], [x + 7 * s, y - 10 * s], [x + 14 * s, y - 6 * s]], { stroke: col, sw: 2, close: false, decor: true });
}
export function elephant(sb: SceneBuilder, x: number, y: number, s = 1) {
  const G = "#64748b";
  sb.ellipse(x, y, 26 * s, 15 * s, { fill: G });
  sb.circle(x + 26 * s, y - 8 * s, 11 * s, { fill: G });
  sb.ellipse(x + 20 * s, y - 6 * s, 5 * s, 9 * s, { fill: "#94a3b8" });
  sb.poly([[x + 34 * s, y - 4 * s], [x + 42 * s, y + 8 * s], [x + 38 * s, y + 20 * s], [x + 34 * s, y + 20 * s], [x + 36 * s, y + 8 * s], [x + 30 * s, y]], { fill: G, decor: true });
  [-16, -6, 8, 18].forEach((d) => sb.rect(x + d * s - 3 * s, y + 8 * s, 7 * s, 16 * s, { fill: G }));
}
export function house(sb: SceneBuilder, x: number, y: number, s = 1) {
  sb.rect(x - 14 * s, y - 14 * s, 28 * s, 14 * s, { fill: "#fde68a" });
  sb.poly([[x - 18 * s, y - 14 * s], [x, y - 28 * s], [x + 18 * s, y - 14 * s]], { fill: RED, decor: true });
  sb.rect(x - 3 * s, y - 8 * s, 6 * s, 8 * s, { fill: BROWN });
}
export function flower(sb: SceneBuilder, x: number, y: number, r = 9, col = PINK) {
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; sb.circle(x + Math.cos(a) * r * 1.1, y + Math.sin(a) * r * 1.1, r * 0.8, { fill: col }); }
  sb.circle(x, y, r * 0.7, { fill: YELLOW });
}
export function bee(sb: SceneBuilder, x: number, y: number, s = 1) {
  sb.ellipse(x - 4 * s, y - 7 * s, 6 * s, 4 * s, { fill: "#bae6fd" });
  sb.ellipse(x + 4 * s, y - 7 * s, 6 * s, 4 * s, { fill: "#bae6fd" });
  sb.ellipse(x, y, 11 * s, 6 * s, { fill: YELLOW });
  [-4, 1, 6].forEach((d) => sb.line(x + d * s, y - 5 * s, x + d * s, y + 5 * s, { stroke: INK, sw: 2, decor: true }));
}
export function wave(sb: SceneBuilder, x0: number, y: number, n: number, col = BLUE, step = 22) {
  for (let i = 0; i < n; i++) sb.curve([x0 + i * step, y], [x0 + i * step + step / 2, y - 7], [x0 + (i + 1) * step, y], { stroke: col, sw: 1.6 });
}
