import { SceneBuilder } from "../components/sceneKit";
import { INK, GREY, BLUE, LBLUE, ORANGE, BROWN, YELLOW, RED, GREEN } from "./harmKit";

// Small drawing helpers for the Class VIII Science chapter "The Amazing World of Solutes, Solvents, and Solutions" (NCERT Chapter 9).
// Shapes use fill only (no outline) where possible so that the overlap checker looks at the text, the glass outlines and the arrows.

export const WATER = "#93c5fd", DEEPWATER = "#60a5fa", SALT = "#e2e8f0", SAND = "#d6b588", SAWDUST = "#b45309";

/** an open-top glass: three sides; the liquid is drawn first (fill only) and the glass outline on top */
export function glass(sb: SceneBuilder, x: number, y: number, w: number, h: number, level = 0.7, liquid = WATER) {
  const top = y + h * (1 - level);
  if (level > 0) sb.rect(x + 1, top, w - 2, y + h - top - 1, { fill: liquid });
  sb.poly([[x, y], [x, y + h], [x + w, y + h], [x + w, y]], { stroke: INK, sw: 2, close: false });
  return top;
}
/** evenly spread dots inside a rectangle (a uniform mixture) */
export function spread(sb: SceneBuilder, x: number, y: number, w: number, h: number, nx: number, ny: number, col: string, r = 2.2) {
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
    const jx = ((i * 7 + j * 3) % 5 - 2) * 1.6, jy = ((i * 5 + j * 11) % 5 - 2) * 1.6;
    sb.circle(x + (w * (i + 0.5)) / nx + jx, y + (h * (j + 0.5)) / ny + jy, r, { fill: col });
  }
}
export function spoon(sb: SceneBuilder, x: number, y: number, col = SALT) {
  sb.line(x, y, x + 22, y - 26, { stroke: GREY, sw: 3, decor: true });
  sb.ellipse(x - 2, y + 2, 8, 5, { fill: "#94a3b8" });
  sb.ellipse(x - 2, y - 1, 6, 3, { fill: col });
}
export function thermo(sb: SceneBuilder, x: number, y: number, h: number, temp: string, col = RED) {
  sb.rect(x - 3, y, 6, h, { fill: "#e2e8f0" });
  sb.rect(x - 3, y + h * 0.4, 6, h * 0.6, { fill: col });
  sb.circle(x, y + h + 4, 7, { fill: col });
  sb.text(x + 12, y + h * 0.5, temp, { size: 12, anchor: "start", fill: col });
}
export function stone(sb: SceneBuilder, x: number, y: number, r = 9) {
  sb.ellipse(x, y, r, r * 0.8, { fill: "#6b7280" });
  sb.ellipse(x - r * 0.3, y - r * 0.25, r * 0.4, r * 0.25, { fill: "#9ca3af" });
}
export const dotsIn = (sb: SceneBuilder, x: number, y: number, w: number, h: number, n: number, col: string, r = 2.6) => {
  const cols = Math.max(1, Math.round(Math.sqrt((n * w) / h)));
  const rows = Math.ceil(n / cols);
  let k = 0;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols && k < n; i++, k++) sb.circle(x + (w * (i + 0.5)) / cols, y + (h * (j + 0.5)) / rows, r, { fill: col });
};
void [BLUE, LBLUE, ORANGE, BROWN, YELLOW, GREEN];
