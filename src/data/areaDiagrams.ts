import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, RED, LRED, LYELLOW, box } from "./harmKit";

// Diagrams (part 1: rectangles, paths and triangles) for Class VIII Maths "Area" (NCERT Ganita Prakash Part II, Chapter 7).
// Coordinates are computed from the real lengths, so equal lengths and right angles are true in every picture.
// Checked by scripts/check-area-diagrams.mts.

export type P = [number, number];
export const FB = "#bfdbfe", FO = "#fed7aa", FG = "#bbf7d0", FY = "#fde68a", FR = "#fecaca", FP = "#ddd6fe", PATH = "#e7d98a", PARK = "#86d48a";

// ── helpers ──
/** a filled polygon with an outline */
export const shape = (sb: SceneBuilder, pts: P[], fill: string, stroke = INK, sw = 2) => sb.poly(pts, { fill, stroke, sw });
export const seg = (sb: SceneBuilder, a: P, b: P, o: { stroke?: string; sw?: number; dash?: string } = {}) => sb.line(a[0], a[1], b[0], b[1], { stroke: o.stroke ?? INK, sw: o.sw ?? 2, dash: o.dash });
export const dash = (sb: SceneBuilder, a: P, b: P, stroke = INK) => seg(sb, a, b, { stroke, sw: 1.7, dash: "6 4" });
/** the small square that marks a right angle at v, pointing towards p and q */
export function right(sb: SceneBuilder, v: P, p: P, q: P, s = 11) {
  const unit = (a: P): P => { const dx = a[0] - v[0], dy = a[1] - v[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
  const u = unit(p), w = unit(q);
  sb.poly([[v[0] + u[0] * s, v[1] + u[1] * s], [v[0] + (u[0] + w[0]) * s, v[1] + (u[1] + w[1]) * s], [v[0] + w[0] * s, v[1] + w[1] * s]], { stroke: INK, sw: 1.3, close: false, decor: true });
}
/** a short stroke across the middle of a side: sides with the same number of strokes are equal */
export function tick(sb: SceneBuilder, a: P, b: P, count = 1) {
  const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l;
  for (let i = 0; i < count; i++) {
    const t = (i - (count - 1) / 2) * 6, mx = (a[0] + b[0]) / 2 + ux * t, my = (a[1] + b[1]) / 2 + uy * t;
    sb.poly([[mx - uy * 7, my + ux * 7], [mx + uy * 7, my - ux * 7]], { stroke: INK, sw: 1.8, close: false, decor: true });
  }
}
const head = (sb: SceneBuilder, tip: P, from: P, col: string) => {
  const dx = tip[0] - from[0], dy = tip[1] - from[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, bx = tip[0] - ux * 8, by = tip[1] - uy * 8;
  sb.poly([tip, [bx - uy * 4, by + ux * 4], [bx + uy * 4, by - ux * 4]], { fill: col, close: true, decor: true });
};
/** a measuring line with an arrow head at both ends */
export function dim(sb: SceneBuilder, a: P, b: P, col = GREY) {
  sb.line(a[0], a[1], b[0], b[1], { stroke: col, sw: 1.3 });
  head(sb, a, b, col); head(sb, b, a, col);
}
export const txt = (sb: SceneBuilder, x: number, y: number, t: string, size = 15, fill = INK, anchor: "start" | "middle" | "end" = "middle") => sb.text(x, y, t, { size, fill, anchor });
export const note = (sb: SceneBuilder, x: number, y: number, t: string, size = 12.5, fill = GREY) => sb.text(x, y, t, { size, fill, bold: false });
/** unit squares drawn inside a rectangle */
export function grid(sb: SceneBuilder, x: number, y: number, cols: number, rows: number, c: number, fill: string) {
  sb.rect(x, y, cols * c, rows * c, { fill });
  for (let i = 1; i < cols; i++) sb.line(x + i * c, y, x + i * c, y + rows * c, { stroke: GREY, sw: 1, decor: true });
  for (let j = 1; j < rows; j++) sb.line(x, y + j * c, x + cols * c, y + j * c, { stroke: GREY, sw: 1, decor: true });
  sb.poly([[x, y], [x + cols * c, y], [x + cols * c, y + rows * c], [x, y + rows * c]], { stroke: INK, sw: 2.2 });
}

// ── 1. counting unit squares ──
function units(): Scene {
  const sb = new SceneBuilder(720, 340, "Counting unit squares");
  const c = 30;
  grid(sb, 170, 50, 4, 7, c, FR);
  grid(sb, 450, 30, 3, 8, c, FG);
  dim(sb, [150, 50], [150, 260]); txt(sb, 140, 160, "7 cm", 15, INK, "end");
  dim(sb, [170, 34], [290, 34]); txt(sb, 230, 24, "4 cm", 15);
  dim(sb, [430, 30], [430, 270]); txt(sb, 420, 155, "8 cm", 15, INK, "end");
  dim(sb, [450, 16], [540, 16]); txt(sb, 556, 22, "3 cm", 15, INK, "start");
  txt(sb, 230, 298, "28 unit squares", 15, "#b91c1c"); txt(sb, 495, 298, "24 unit squares", 15, "#15803d");
  return sb.build();
}

// ── 2. four equal parts of a square ──
function four(): Scene {
  const sb = new SceneBuilder(720, 320, "A square divided into 4 parts of equal area");
  grid(sb, 90, 50, 2, 2, 105, "#e0f2fe");
  const X = 420, Y = 50, s = 210, m = 105;
  sb.rect(X, Y, s, s, { fill: "#e0f2fe" });
  // the same four parts, pushed in on one edge and out by the same amount on another
  const jag = (pts: P[]) => sb.poly(pts, { stroke: INK, sw: 2, close: false });
  jag([[X + m, Y], [X + m, Y + 30], [X + m - 34, Y + 30], [X + m - 34, Y + 66], [X + m, Y + 66], [X + m, Y + m]]);
  jag([[X + m, Y + m], [X + m + 30, Y + m], [X + m + 30, Y + m - 34], [X + m + 66, Y + m - 34], [X + m + 66, Y + m], [X + s, Y + m]]);
  jag([[X + m, Y + m], [X + m, Y + m + 39], [X + m + 34, Y + m + 39], [X + m + 34, Y + m + 75], [X + m, Y + m + 75], [X + m, Y + s]]);
  jag([[X, Y + m], [X + 39, Y + m], [X + 39, Y + m + 34], [X + 75, Y + m + 34], [X + 75, Y + m], [X + m, Y + m]]);
  sb.poly([[X, Y], [X + s, Y], [X + s, Y + s], [X, Y + s]], { stroke: INK, sw: 2.2 });
  sb.arrow(328, 155, 392, 155, { stroke: GREY });
  txt(sb, 195, 290, "4 equal squares", 14); txt(sb, 525, 290, "4 new shapes, still equal in area", 14);
  note(sb, 360, 28, "Push in on one edge and push out by the same amount on another");
  return sb.build();
}

// ── 3. diagonal of a rectangle ──
function diagonal(): Scene {
  const sb = new SceneBuilder(720, 290, "A diagonal halves a rectangle");
  const x = 190, y = 40, w = 210, h = 120 ;
  shape(sb, [[x, y], [x + w, y], [x, y + h]], FB);
  shape(sb, [[x + w, y], [x + w, y + h], [x, y + h]], FO);
  txt(sb, x + 55, y + 45, "14", 17); txt(sb, x + 158, y + 90, "14", 17);
  dim(sb, [x, y + h + 18], [x + w, y + h + 18]); txt(sb, x + w / 2, y + h + 40, "7 cm");
  dim(sb, [x - 18, y], [x - 18, y + h]); txt(sb, x - 28, y + h / 2 + 5, "4 cm", 15, INK, "end");
  box(sb, 450, 50, 240, 96, ["Rectangle: 28 cm²", "Each triangle: half of it", "= 14 cm²"], { fill: LGREEN, stroke: GREEN, size: 15, bold: [true, false, true] });
  note(sb, 360, 262, "The two triangles are congruent: same shape and same size");
  return sb.build();
}

// ── 4. perimeter against area ──
function perimeter(): Scene {
  const sb = new SceneBuilder(720, 290, "A larger perimeter but a smaller area");
  grid(sb, 70, 130, 9, 1, 34, FB);
  grid(sb, 500, 40, 4, 4, 34, FY);
  txt(sb, 223, 210, "Region 1: 9 cm by 1 cm", 14.5); txt(sb, 223, 234, "Perimeter 20 cm", 14, BLUE); txt(sb, 223, 258, "Area 9 cm²", 14, RED);
  txt(sb, 568, 210, "Region 2: 4 cm by 4 cm", 14.5); txt(sb, 568, 234, "Perimeter 16 cm", 14, BLUE); txt(sb, 568, 258, "Area 16 cm²", 14, RED);
  return sb.build();
}

// ── 5. missing sides ──
function missing(): Scene {
  const sb = new SceneBuilder(720, 390, "Find the missing sidelengths");
  const u = 22, ox = 190, oy = 200;           // ox, oy: the meeting point
  const rect = (x: number, y: number, w: number, h: number, f: string) => shape(sb, [[x, y], [x + w * u, y], [x + w * u, y + h * u], [x, y + h * u]], f);
  rect(ox - 4 * u, oy - 7 * u, 4, 7, FR);     // 28: 4 wide, 7 tall
  rect(ox, oy - 3 * u, 7, 3, FG);             // 21: 7 wide, 3 tall
  rect(ox - 7 * u, oy, 7, 5, FB);             // 35: 7 wide, 5 tall
  rect(ox, oy, 2, 7, FY);                     // 14: 2 wide, 7 tall
  txt(sb, ox - 2 * u, oy - 3.5 * u + 5, "28 in²", 14); txt(sb, ox + 3.5 * u, oy - 2 * u, "21 in²", 14); txt(sb, ox - 3.5 * u, oy + 2.5 * u + 5, "35 in²", 14); txt(sb, ox + u, oy + 3.5 * u + 5, "14", 13);
  dim(sb, [ox + 14, oy - 7 * u], [ox + 14, oy - 3 * u]); txt(sb, ox + 24, oy - 5 * u + 5, "4 in", 13.5, INK, "start");
  dim(sb, [ox, oy - 8], [ox + 7 * u, oy - 8]); txt(sb, ox + 4.8 * u, oy - 17, "7 in", 13.5);
  dim(sb, [ox - 7 * u, oy - 14], [ox - 4 * u, oy - 14]); txt(sb, ox - 5.5 * u, oy - 22, "3 in", 13.5);
  dim(sb, [ox - 14, oy + 5 * u], [ox - 14, oy + 7 * u]); txt(sb, ox - 24, oy + 6 * u + 5, "2 in", 13.5, INK, "end");
  dim(sb, [ox, oy + 7 * u + 10], [ox + 2 * u, oy + 7 * u + 10]); txt(sb, ox + u, oy + 7 * u + 30, "? in", 14, RED);
  txt(sb, 60, 372, "(i)", 15);
  // (ii)
  const X = 440, Y = 100, v = 17;
  shape(sb, [[X, Y], [X + 7.25 * v, Y], [X + 7.25 * v, Y + 4 * v], [X, Y + 4 * v]], FY);
  shape(sb, [[X + 7.25 * v, Y], [X + 10 * v, Y], [X + 10 * v, Y + 4 * v], [X + 7.25 * v, Y + 4 * v]], "#e2e8f0");
  sb.poly([[X, Y], [X + 7.25 * v, Y], [X + 7.25 * v, Y + 6.9 * v], [X, Y + 6.9 * v]], { stroke: INK, sw: 4 });
  for (let i = 1; i <= 5; i++) sb.poly([[X + 7.25 * v + 3, Y + i * 12], [X + 7.25 * v + 3 + Math.min(i * 12, 40), Y + i * 12 - Math.min(i * 12, 40)]], { stroke: "#cbd5e1", sw: 1, close: false, decor: true });
  txt(sb, X + 3.6 * v, Y + 2 * v + 5, "29 m²", 14); txt(sb, X + 8.65 * v, Y + 2 * v + 5, "11 m²", 12);
  dim(sb, [X - 16, Y], [X - 16, Y + 4 * v]); txt(sb, X - 26, Y + 2 * v + 5, "4 m", 13.5, INK, "end");
  dim(sb, [X, Y - 16], [X + 7.25 * v, Y - 16]); txt(sb, X + 3.6 * v, Y - 24, "?", 16, RED);
  dim(sb, [X + 7.25 * v + 2, Y - 16], [X + 10 * v, Y - 16]); txt(sb, X + 8.65 * v, Y - 24, "?", 16, RED);
  dim(sb, [X + 8.1 * v, Y + 4 * v + 3], [X + 8.1 * v, Y + 6.9 * v]); txt(sb, X + 8.1 * v + 12, Y + 5.45 * v + 5, "?", 16, RED, "start");
  note(sb, X + 4.5 * v, Y + 6.9 * v + 34, "Thick-edged rectangle: area 50 m²", 13, INK);
  txt(sb, 410, 372, "(ii)", 15);
  return sb.build();
}

// ── 6. a path around a park, in three positions ──
function path(): Scene {
  const sb = new SceneBuilder(720, 260, "Moving the outer rectangle does not change the path area");
  const draw = (x: number, dx: number, dy: number) => {
    shape(sb, [[x, 40], [x + 180, 40], [x + 180, 170], [x, 170]], PATH);
    shape(sb, [[x + dx, 40 + dy], [x + dx + 128, 40 + dy], [x + dx + 128, 40 + dy + 80], [x + dx, 40 + dy + 80]], PARK);
    const px = x + dx, py = 40 + dy;
    txt(sb, px + 12, py + 18, "H", 12); txt(sb, px + 116, py + 18, "G", 12); txt(sb, px + 12, py + 72, "E", 12); txt(sb, px + 116, py + 72, "F", 12);
    txt(sb, x - 8, 38, "D", 13); txt(sb, x + 188, 38, "C", 13); txt(sb, x - 8, 184, "A", 13); txt(sb, x + 188, 184, "B", 13);
  };
  draw(30, 26, 25); draw(270, 8, 8); draw(510, 48, 44);
  note(sb, 360, 222, "In all three: area of path = area of ABCD − area of park EFGH", 14, INK);
  note(sb, 360, 246, "Both rectangles keep their sizes, so the difference stays the same");
  return sb.build();
}

// ── 7. crosspath ──
function cross(): Scene {
  const sb = new SceneBuilder(720, 340, "A crosspath: the middle is shared by both paths");
  const u = 18, x = 130, y = 50, W = 14 * u, H = 12 * u, p = 2 * u, q = 1.5 * u;
  const vx = x + 6 * u, hy = y + 5.25 * u;
  sb.rect(x, y, W, H, { fill: FG });
  sb.rect(vx, y, p, H, { fill: FY }); sb.rect(x, hy, W, q, { fill: FY }); sb.rect(vx, hy, p, q, { fill: "#fb923c" });
  seg(sb, [vx, y], [vx, y + H], { sw: 1.6 }); seg(sb, [vx + p, y], [vx + p, y + H], { sw: 1.6 }); seg(sb, [x, hy], [x + W, hy], { sw: 1.6 }); seg(sb, [x, hy + q], [x + W, hy + q], { sw: 1.6 });
  sb.poly([[x, y], [x + W, y], [x + W, y + H], [x, y + H]], { stroke: INK, sw: 2.4 });
  dim(sb, [x, y - 16], [x + W, y - 16]); txt(sb, x + W / 2, y - 24, "14 m");
  dim(sb, [x - 16, y], [x - 16, y + H]); txt(sb, x - 26, y + H / 2 + 5, "12 m", 15, INK, "end");
  dim(sb, [vx, y + H + 14], [vx + p, y + H + 14]); txt(sb, vx + p / 2, y + H + 38, "p", 17, RED);
  dim(sb, [x + W + 14, hy], [x + W + 14, hy + q]); txt(sb, x + W + 28, hy + q / 2 + 5, "q", 17, RED, "start");
  box(sb, 450, 100, 250, 100, ["Area = 12p + 14q − pq", "pq is counted twice,", "so subtract it once"], { fill: LORANGE, stroke: ORANGE, size: 15, bold: [true, false, false] });
  return sb.build();
}

// ── 8. L tube straightened ──
function lTube(): Scene {
  const sb = new SceneBuilder(720, 260, "An L-shaped tube straightened");
  const u = 30;
  shape(sb, [[130, 50], [130 + 5 * u, 50], [130 + 5 * u, 50 + u], [130 + u, 50 + u], [130 + u, 50 + 5 * u], [130, 50 + 5 * u]], FR);
  sb.rect(130, 50, u, u, { fill: "#fb923c" });
  sb.poly([[130, 50], [130 + u, 50], [130 + u, 50 + u], [130, 50 + u]], { stroke: INK, sw: 1.4, dash: "4 3" });
  dim(sb, [130, 32], [130 + 5 * u, 32]); txt(sb, 205, 22, "5");
  dim(sb, [112, 50], [112, 200]); txt(sb, 98, 130, "5", 15, INK, "end");
  sb.arrow(315, 120, 372, 120, { stroke: GREY, sw: 2.4 });
  shape(sb, [[400, 105], [400 + 9 * u, 105], [400 + 9 * u, 105 + u], [400, 105 + u]], FR);
  dim(sb, [400, 88], [400 + 9 * u, 88]); txt(sb, 535, 78, "9");
  txt(sb, 688, 126, "1", 15, INK, "start");
  note(sb, 480, 190, "5 + 5 − 1 = 9: the corner square is in both arms", 13.5, INK);
  return sb.build();
}

// ── 9. spiral tube ──
function spiral(): Scene {
  const sb = new SceneBuilder(720, 460, "The spiral tube of width 1");
  const u = 18, X = 150, Y = 50;
  // outer edge of the tube, from the open end at the top left, with arms 20, 20, 20, 15, 15, 10, 10, 5, 5
  const outer: P[] = [[0, 0], [20, 0], [20, 20], [0, 20], [0, 5], [15, 5], [15, 15], [5, 15], [5, 10], [10, 10], [10, 11], [6, 11], [6, 14], [14, 14], [14, 6], [1, 6], [1, 19], [19, 19], [19, 1], [0, 1]];
  shape(sb, outer.map(([a, b]) => [X + a * u, Y + b * u] as P), FR, RED, 2);
  dim(sb, [X, Y - 16], [X + 20 * u, Y - 16]); txt(sb, X + 10 * u, Y - 24, "20");
  dim(sb, [X + 20 * u + 16, Y], [X + 20 * u + 16, Y + 20 * u]); txt(sb, X + 20 * u + 28, Y + 10 * u + 5, "20", 15, INK, "start");
  dim(sb, [X, Y + 20 * u + 16], [X + 20 * u, Y + 20 * u + 16]); txt(sb, X + 10 * u, Y + 20 * u + 38, "20");
  dim(sb, [X - 16, Y + 5 * u], [X - 16, Y + 20 * u]); txt(sb, X - 26, Y + 12.5 * u + 5, "15", 15, INK, "end");
  dim(sb, [X, Y + 3.2 * u], [X + 15 * u, Y + 3.2 * u]); txt(sb, X + 7.5 * u, Y + 2.6 * u, "15");
  txt(sb, X + 16.9 * u, Y + 10 * u + 5, "10", 14);
  txt(sb, X + 10 * u, Y + 17.2 * u, "10", 14);
  txt(sb, X + 3.4 * u, Y + 12.5 * u + 5, "5", 14);
  txt(sb, X + 7.5 * u, Y + 8.6 * u, "5", 14);
  txt(sb, 620, 120, "width 1", 14, RED, "middle");
  box(sb, 560, 170, 140, 110, ["Arms add to 120", "8 corners", "Area = 120 − 8", "= 112"], { fill: LYELLOW, stroke: "#ca8a04", size: 14, bold: [false, false, false, true] });
  return sb.build();
}

// ── 10. doubling the side ──
function doubling(): Scene {
  const sb = new SceneBuilder(720, 340, "Doubling the side makes every region 4 times as big");
  const draw = (x: number, y: number, s: number) => {
    const A: P = [x, y], B: P = [x + s, y], C: P = [x + s, y + s], D: P = [x, y + s], M: P = [x + s / 2, y + s / 2];
    shape(sb, [A, M, D], FY); shape(sb, [A, B, M], FB); shape(sb, [B, C, D], FG);
    tick(sb, B, M); tick(sb, M, D);
    txt(sb, x + s * 0.17, y + s * 0.52, "1", 15); txt(sb, x + s * 0.52, y + s * 0.22, "2", 15); txt(sb, x + s * 0.74, y + s * 0.76, "3", 15);
  };
  draw(80, 150, 110); draw(300, 40, 220);
  txt(sb, 135, 292, "side s"); txt(sb, 410, 292, "side 2s");
  box(sb, 550, 100, 155, 100, ["Each region:", "4 times as big", "increase = 3 times", "the old area"], { fill: LGREEN, stroke: GREEN, size: 13.5, bold: [true, true, false, false] });
  return sb.build();
}

// ── 11. square with a hole ──
function hole(): Scene {
  const sb = new SceneBuilder(720, 360, "Four equal pieces rearranged into a bigger square with a hole");
  // a square of side s cut by two perpendicular lines through its centre O; each line meets a side at distance k from a corner
  const x = 70, y = 80, s = 180, k = 55, O: P = [x + s / 2, y + s / 2];
  const T: P = [x + k, y], R: P = [x + s, y + k], Bm: P = [x + s - k, y + s], L: P = [x, y + s - k];
  const first: P[] = [[x, y], T, O, L];
  const pieces: P[][] = [first, [T, [x + s, y], R, O], [O, R, [x + s, y + s], Bm], [L, O, Bm, [x, y + s]]];
  const fills = [FB, FY, FG, FR];
  pieces.forEach((p, i) => shape(sb, p, fills[i]));
  right(sb, O, T, R);
  // the bigger square: the right angle that was at O goes to each outer corner, with the two cut edges along the sides
  const Lg = Math.hypot(s - 2 * k, s), X = 430, Y = 70;
  const turn = (p: P[], ang: number, from: P, to: P): P[] => p.map(([px, py]) => { const dx = px - from[0], dy = py - from[1]; return [to[0] + dx * Math.cos(ang) - dy * Math.sin(ang), to[1] + dx * Math.sin(ang) + dy * Math.cos(ang)] as P; });
  const dirT = Math.atan2(T[1] - O[1], T[0] - O[0]);
  const corners: P[] = [[X, Y], [X + Lg, Y], [X + Lg, Y + Lg], [X, Y + Lg]];
  const towards = [Math.PI / 2, Math.PI, -Math.PI / 2, 0];
  corners.forEach((cn, i) => shape(sb, turn(first, towards[i] - dirT, O, cn), fills[i]));
  sb.arrow(282, 170, 396, 170, { stroke: GREY, sw: 2.4 });
  txt(sb, x + s / 2, 314, "4 equal pieces", 14);
  txt(sb, X + Lg / 2, 314, "bigger square with a hole", 14);
  note(sb, 360, 30, "Two perpendicular lines through the centre, then the pieces are turned outwards");
  note(sb, 360, 344, "Total area of the pieces is unchanged");
  return sb.build();
}

// ── 12. triangles inside a rectangle ──
function half(): Scene {
  const sb = new SceneBuilder(720, 270, "Each triangle is half of its rectangle");
  const draw = (x: number, t: number, name: string) => {
    const A: P = [x, 50], B: P = [x + 260, 50], C: P = [x + 260, 180], D: P = [x, 180], X: P = [x + t, 50], Y: P = [x + t, 180];
    sb.poly([A, B, C, D], { stroke: INK, sw: 2 });
    shape(sb, [X, D, C], FB);
    dash(sb, X, Y); right(sb, Y, X, C);
    txt(sb, A[0] - 10, 46, "A"); txt(sb, B[0] + 10, 46, "B"); txt(sb, C[0] + 10, 200, "C"); txt(sb, D[0] - 10, 200, "D"); txt(sb, X[0], 36, name);
  };
  draw(40, 60, "X"); draw(420, 180, "Y");
  note(sb, 360, 232, "△XDC and △YDC each take half of the two small rectangles on either side of the dashed line", 13, INK);
  note(sb, 360, 254, "So each one is half of rectangle ABCD");
  return sb.build();
}

// ── 13. area formula: acute and obtuse ──
function formula(): Scene {
  const sb = new SceneBuilder(720, 330, "Height inside the base and height outside the base");
  const B: P = [60, 220], C: P = [300, 220], A: P = [150, 70], X: P = [150, 220], E: P = [60, 70], D: P = [300, 70];
  shape(sb, [A, B, C], FB);
  dash(sb, E, D); dash(sb, E, B); dash(sb, D, C); dash(sb, A, X); right(sb, X, A, C);
  txt(sb, 46, 66, "E"); txt(sb, 150, 56, "A"); txt(sb, 314, 66, "D"); txt(sb, 46, 238, "B"); txt(sb, 150, 240, "X"); txt(sb, 314, 238, "C");
  txt(sb, 163, 155, "h", 16, INK, "start");
  dim(sb, [60, 256], [300, 256]); txt(sb, 180, 278, "base");
  txt(sb, 180, 308, "(a) Acute triangle", 14);
  const A2: P = [450, 70], D2: P = [450, 220], B2: P = [520, 220], C2: P = [670, 220];
  shape(sb, [A2, B2, C2], FB);
  dash(sb, A2, D2); dash(sb, D2, B2); right(sb, D2, A2, B2);
  txt(sb, 450, 56, "A"); txt(sb, 436, 238, "D"); txt(sb, 520, 240, "B"); txt(sb, 684, 238, "C"); txt(sb, 436, 150, "h", 16, INK, "end");
  dim(sb, [520, 256], [670, 256]); txt(sb, 595, 278, "base");
  txt(sb, 565, 308, "(b) Obtuse triangle", 14);
  txt(sb, 360, 28, "Area of a triangle = half × base × height", 15, "#9a3412");
  return sb.build();
}

// ── 14. two heights of one triangle ──
function heights(): Scene {
  const sb = new SceneBuilder(720, 320, "Altitudes AX and BY of the same triangle");
  // BC = 5, AX = 3, AC = 4: with the foot X at distance sqrt(16 − 9) from C
  const u = 55, B: P = [150, 250], C: P = [150 + 5 * u, 250], Xx = C[0] - Math.sqrt(7) * u, X: P = [Xx, 250], A: P = [Xx, 250 - 3 * u];
  const vx = A[0] - C[0], vy = A[1] - C[1], t = ((B[0] - C[0]) * vx + (B[1] - C[1]) * vy) / (vx * vx + vy * vy), Y: P = [C[0] + t * vx, C[1] + t * vy];
  shape(sb, [A, B, C], FB);
  dash(sb, A, X); dash(sb, B, Y); right(sb, X, A, C); right(sb, Y, B, C);
  txt(sb, A[0] - 4, A[1] - 10, "A"); txt(sb, B[0] - 14, 266, "B"); txt(sb, C[0] + 14, 266, "C"); txt(sb, X[0], 270, "X"); txt(sb, Y[0] + 16, Y[1] - 6, "Y");
  txt(sb, X[0] - 10, 232, "3", 16, INK, "end");
  txt(sb, (A[0] + C[0]) / 2 + 34, (A[1] + C[1]) / 2 + 6, "4", 16);
  dim(sb, [B[0], 286], [C[0], 286]); txt(sb, (B[0] + C[0]) / 2, 308, "5");
  box(sb, 495, 90, 210, 100, ["½ × 5 × 3 = 7.5", "½ × 4 × BY = 2 BY", "so BY = 3.75"], { fill: LYELLOW, stroke: "#ca8a04", size: 15.5, bold: [false, false, true] });
  return sb.build();
}

// ── 15. three triangles from the textbook ──
function three(): Scene {
  const sb = new SceneBuilder(720, 330, "Find the areas of these triangles");
  // (i) base 4, height 3
  const u = 36, B: P = [40, 230], C: P = [40 + 4 * u, 230], A: P = [40 + 1.4 * u, 230 - 3 * u], E: P = [A[0], 230];
  shape(sb, [A, B, C], FB); dash(sb, A, E); right(sb, E, A, C);
  txt(sb, A[0], A[1] - 8, "A"); txt(sb, B[0] - 10, 246, "B"); txt(sb, C[0] + 10, 246, "C"); txt(sb, E[0], 250, "E"); txt(sb, A[0] + 10, 195, "3 cm", 13, INK, "start");
  dim(sb, [B[0], 264], [C[0], 264]); txt(sb, 112, 284, "4 cm", 14); txt(sb, 112, 312, "(i)", 14);
  // (ii) side EF = 5, altitude DN = 3.2 : N on EF with EN = 1.6
  const v = 40, D: P = [270, 230], F: P = [470, 230];
  const DF = 200, DN = 3.2 * v, NF = Math.sqrt(DF * DF - DN * DN), ang = Math.asin(DN / DF);
  const N: P = [F[0] - NF * Math.cos(ang), F[1] - NF * Math.sin(ang)];
  const ux = (N[0] - F[0]) / NF, uy = (N[1] - F[1]) / NF, Ept: P = [F[0] + ux * 5 * v, F[1] + uy * 5 * v];
  shape(sb, [Ept, D, F], FG); dash(sb, D, N); right(sb, N, D, F);
  txt(sb, Ept[0], Ept[1] - 8, "E"); txt(sb, D[0] - 10, 246, "D"); txt(sb, F[0] + 10, 246, "F"); txt(sb, N[0] + 12, N[1] - 6, "N");
  txt(sb, 372, 276, "EF = 5 cm", 14); txt(sb, 372, 296, "DN = 3.2 cm", 14); txt(sb, 262, 312, "(ii)", 14);
  // (iii) right triangle 3 and 4
  const A3: P = [560, 230], T: P = [560 + 3 * u, 230], N3: P = [560, 230 - 4 * u];
  shape(sb, [N3, A3, T], FY); right(sb, A3, N3, T);
  txt(sb, N3[0], N3[1] - 8, "N"); txt(sb, A3[0] - 10, 246, "A"); txt(sb, T[0] + 10, 246, "T"); txt(sb, A3[0] - 10, 164, "4 cm", 14, INK, "end");
  dim(sb, [A3[0], 264], [T[0], 264]); txt(sb, 614, 284, "3 cm", 14); txt(sb, 614, 312, "(iii)", 14);
  return sb.build();
}

// ── 16. altitude outside, find BY ──
function obtuseBy(): Scene {
  const sb = new SceneBuilder(720, 340, "Find the altitude BY");
  // AX = 4, BC = 6, AC = 8: X lies left of B, XC = sqrt(64 − 16)
  const u = 48, C: P = [520, 260], X: P = [C[0] - Math.sqrt(48) * u, 260], B: P = [C[0] - 6 * u, 260], A: P = [X[0], 260 - 4 * u];
  const vx = A[0] - C[0], vy = A[1] - C[1], t = ((B[0] - C[0]) * vx + (B[1] - C[1]) * vy) / (vx * vx + vy * vy), Y: P = [C[0] + t * vx, C[1] + t * vy];
  shape(sb, [A, B, C], FB); dash(sb, A, X); dash(sb, X, B); dash(sb, B, Y); right(sb, X, A, B); right(sb, Y, B, C);
  txt(sb, A[0], A[1] - 10, "A"); txt(sb, X[0] - 12, 278, "X"); txt(sb, B[0], 280, "B"); txt(sb, C[0] + 14, 278, "C"); txt(sb, Y[0] + 8, Y[1] - 12, "Y");
  txt(sb, X[0] - 12, 170, "4 units", 14, INK, "end");
  txt(sb, (A[0] + C[0]) / 2 + 66, (A[1] + C[1]) / 2 - 6, "AC = 8 units", 14, INK, "start");
  dim(sb, [B[0], 296], [C[0], 296]); txt(sb, (B[0] + C[0]) / 2, 320, "6 units", 14);
  return sb.build();
}

// ── 17. isosceles SUB ──
function isosceles(): Scene {
  const sb = new SceneBuilder(720, 300, "The perpendicular from the top of an isosceles triangle halves it");
  const S: P = [250, 50], U: P = [150, 230], B: P = [350, 230], E: P = [250, 230];
  shape(sb, [S, U, E], FB); shape(sb, [S, E, B], FY);
  right(sb, E, S, B); tick(sb, S, U); tick(sb, S, B);
  txt(sb, 250, 36, "S"); txt(sb, 136, 248, "U"); txt(sb, 364, 248, "B"); txt(sb, 250, 250, "E"); txt(sb, 285, 195, "24", 18);
  box(sb, 440, 80, 250, 110, ["UE = EB, same height SE", "Area (SEU) = Area (SEB)", "Area (SUB) = 48 sq. units"], { fill: LGREEN, stroke: GREEN, size: 14, bold: [false, false, true] });
  return sb.build();
}

// ── 18. diagonals of a rectangle ──
function diagonals(): Scene {
  const sb = new SceneBuilder(720, 310, "The diagonals cut a rectangle into 4 triangles of equal area");
  const draw = (x: number, second: boolean) => {
    const A: P = [x, 60], B: P = [x + 260, 60], C: P = [x + 260, 220], D: P = [x, 220], O: P = [x + 130, 140];
    if (!second) {
      shape(sb, [A, B, O], FY); shape(sb, [B, C, O], FG); shape(sb, [C, D, O], FR); shape(sb, [D, A, O], FB);
      txt(sb, x + 40, 146, "1", 17); txt(sb, x + 130, 96, "2", 17); txt(sb, x + 220, 146, "3", 17); txt(sb, x + 130, 196, "4", 17);
      txt(sb, x + 154, 146, "O", 13);
    } else {
      sb.poly([A, B, C, D], { stroke: INK, sw: 2 });
      shape(sb, [A, D, O], FB); shape(sb, [A, O, B], FY); seg(sb, O, C);
      // foot of the perpendicular from A on BD
      const vx = B[0] - D[0], vy = B[1] - D[1], t = ((A[0] - D[0]) * vx + (A[1] - D[1]) * vy) / (vx * vx + vy * vy), X: P = [D[0] + t * vx, D[1] + t * vy];
      dash(sb, A, X); right(sb, X, A, B);
      txt(sb, X[0] + 8, X[1] + 18, "X", 13); txt(sb, x + 130, 168, "O", 13);
    }
    txt(sb, x - 10, 54, "A"); txt(sb, x + 270, 54, "B"); txt(sb, x + 270, 240, "C"); txt(sb, x - 10, 240, "D");
  };
  draw(50, false); draw(410, true);
  note(sb, 360, 276, "Triangles AOD and AOB have equal bases (OD = OB) and the same height AX", 13.5, INK);
  note(sb, 360, 298, "So their areas are equal; each of the 4 triangles is a quarter of the rectangle");
  return sb.build();
}

// ── 19. median ──
function median(): Scene {
  const sb = new SceneBuilder(720, 300, "A median divides a triangle into two equal areas");
  const A: P = [200, 50], B: P = [70, 230], C: P = [430, 230], M: P = [250, 230], D: P = [200, 230];
  shape(sb, [A, B, M], FB); shape(sb, [A, M, C], FY); dash(sb, A, D); right(sb, D, A, B);
  tick(sb, B, M); tick(sb, M, C);
  txt(sb, 200, 36, "A"); txt(sb, 56, 248, "B"); txt(sb, 444, 248, "C"); txt(sb, 250, 252, "M"); txt(sb, 200, 252, "D");
  txt(sb, 158, 180, "1", 17); txt(sb, 285, 180, "2", 17);
  box(sb, 480, 90, 220, 110, ["BM = MC", "same height AD", "Area 1 = Area 2"], { fill: LGREEN, stroke: GREEN, size: 15.5, bold: [false, false, true] });
  return sb.build();
}

// ── 20. triangles between parallels ──
function parallels(): Scene {
  const sb = new SceneBuilder(720, 300, "Same base, between the same parallels: equal areas");
  const B: P = [270, 230], C: P = [390, 230];
  const tops: [number, string][] = [[90, "#fecaca"], [270, "#bfdbfe"], [420, "#bbf7d0"], [610, "#fde68a"]];
  tops.forEach(([x, f]) => sb.poly([[x, 70], B, C], { fill: f }));
  tops.forEach(([x]) => { seg(sb, [x, 70], B, { sw: 1.5 }); seg(sb, [x, 70], C, { sw: 1.5 }); });
  seg(sb, [50, 70], [660, 70], { sw: 2.4 }); seg(sb, [150, 230], [660, 230], { sw: 2.4 });
  txt(sb, 680, 76, "l", 17); txt(sb, 270, 252, "B"); txt(sb, 390, 252, "C");
  dim(sb, [645, 74], [645, 226]); txt(sb, 660, 156, "h", 17, INK, "start");
  note(sb, 360, 40, "The third vertex can be anywhere on l");
  note(sb, 360, 284, "Base BC and height h are the same for every triangle, so every area is the same", 13.5, INK);
  return sb.build();
}

// ── 21. mirror construction ──
function mirror(): Scene {
  const sb = new SceneBuilder(720, 380, "Reflecting in line l gives the least perimeter");
  const draw = (x: number, ax: number, straight: boolean) => {
    const B: P = [x, 290], C: P = [x + 180, 290], B1: P = [x, 70], C1: P = [x + 180, 70], A: P = [x + ax, 180];
    seg(sb, [x - 40, 180], [x + 230, 180], { sw: 2.4 }); txt(sb, x + 246, 186, "l", 17);
    dash(sb, B, B1, RED); dash(sb, C, C1, RED);
    seg(sb, B, C); seg(sb, A, B, { stroke: BLUE, sw: 2.6 }); seg(sb, A, C, { stroke: BLUE, sw: 2.6 });
    if (straight) seg(sb, A, C1, { stroke: BLUE, sw: 2.6 }); else dash(sb, A, C1, BLUE);
    txt(sb, B[0] - 10, 308, "B"); txt(sb, C[0] + 10, 308, "C"); txt(sb, B1[0] - 10, 64, "B′"); txt(sb, C1[0] + 12, 64, "C′");
    txt(sb, A[0] - 20, 172, "A");
  };
  draw(70, 54, false); draw(450, 90, true);
  txt(sb, 160, 336, "(a) Any point A on l", 14); txt(sb, 540, 336, "(b) A on the line BC′", 14);
  note(sb, 360, 30, "AC = AC′ for every A on l, so AB + AC = AB + AC′");
  note(sb, 360, 366, "The straight path from B to C′ is the shortest", 13.5, INK);
  return sb.build();
}

// ── 22. house, river, tank ──
function river(): Scene {
  const sb = new SceneBuilder(720, 380, "Shortest path from the house to the river to the water tank");
  sb.rect(80, 120, 560, 40, { fill: "#bae6fd" });
  seg(sb, [80, 160], [640, 160], { stroke: BLUE, sw: 2.6 });
  const H: P = [160, 320], T: P = [480, 230], I: P = [480, 90];
  const t = (160 - H[1]) / (I[1] - H[1]), Pp: P = [H[0] + t * (I[0] - H[0]), 160];
  seg(sb, H, Pp, { stroke: ORANGE, sw: 3 }); seg(sb, Pp, T, { stroke: ORANGE, sw: 3 });
  dash(sb, Pp, I, ORANGE); dash(sb, T, I, GREY);
  sb.circle(H[0], H[1], 8, { fill: INK }); sb.rect(T[0] - 8, T[1] - 8, 16, 16, { fill: INK }); sb.rect(I[0] - 8, I[1] - 8, 16, 16, { stroke: INK, sw: 2 });
  txt(sb, 160, 352, "House"); txt(sb, 520, 252, "Water tank", 15, INK, "start"); txt(sb, 505, 90, "image of the tank", 14, GREY, "start");
  txt(sb, Pp[0] - 16, 150, "P"); txt(sb, 130, 146, "River", 15, BLUE);
  note(sb, 390, 40, "Join the house to the image of the tank; it meets the bank at P", 13.5, INK);
  return sb.build();
}

// ── 23. three squares, red and blue ──
function squares(): Scene {
  const sb = new SceneBuilder(720, 380, "ABCD, BCEF and BFGH are identical squares");
  const s = 120, D: P = [180, 320], C: P = [300, 320], E: P = [420, 320], A: P = [180, 200], B: P = [300, 200], F: P = [420, 200], H: P = [300, 80], G: P = [420, 80], Pp: P = [240, 200];
  void s;
  shape(sb, [D, C, H], "#ef4444"); shape(sb, [A, D, Pp], "#1d4ed8");
  sb.poly([A, D, C, B], { stroke: INK, sw: 2 }); sb.poly([B, C, E, F], { stroke: INK, sw: 2 }); sb.poly([H, G, F, B], { stroke: INK, sw: 2 });
  txt(sb, 166, 196, "A"); txt(sb, 314, 192, "B"); txt(sb, 300, 340, "C"); txt(sb, 166, 340, "D"); txt(sb, 434, 340, "E"); txt(sb, 436, 206, "F"); txt(sb, 434, 76, "G"); txt(sb, 296, 68, "H"); txt(sb, 232, 190, "P");
  box(sb, 480, 120, 220, 120, ["Red △DCH = s²", "Blue △ADP = a quarter", "of s²", "P is the midpoint of AB"], { fill: "#f8fafc", stroke: GREY, size: 14, bold: [true, true, true, false] });
  return sb.build();
}

// ── 24. midpoints of two sides ──
function midTriangle(): Scene {
  const sb = new SceneBuilder(720, 320, "M and N are the midpoints of XY and XZ");
  const X: P = [230, 50], Y: P = [100, 260], Z: P = [400, 260], M: P = [165, 155], N: P = [315, 155];
  shape(sb, [X, M, N], FB); shape(sb, [M, Y, N], FY); shape(sb, [N, Y, Z], "#ffffff");
  tick(sb, X, M); tick(sb, M, Y); tick(sb, X, N, 2); tick(sb, N, Z, 2);
  txt(sb, 230, 36, "X"); txt(sb, 86, 278, "Y"); txt(sb, 414, 278, "Z"); txt(sb, 144, 150, "M"); txt(sb, 338, 150, "N");
  box(sb, 460, 90, 240, 120, ["XNY is half of XYZ", "XMN is half of XNY", "So XMN is a quarter", "of XYZ"], { fill: LGREEN, stroke: GREEN, size: 14.5, bold: [false, false, true, true] });
  note(sb, 250, 302, "Joining NY shows the two medians: NY first, then NM");
  return sb.build();
}

export const AREA_DIAGRAMS_1: Record<string, () => Scene> = {
  area_units: units,
  area_four: four,
  area_diagonal: diagonal,
  area_perimeter: perimeter,
  area_missing: missing,
  area_path: path,
  area_cross: cross,
  area_ltube: lTube,
  area_spiral: spiral,
  area_double: doubling,
  area_hole: hole,
  area_half: half,
  area_formula: formula,
  area_heights: heights,
  area_three: three,
  area_obtuse_by: obtuseBy,
  area_isosceles: isosceles,
  area_diagonals: diagonals,
  area_median: median,
  area_parallels: parallels,
  area_mirror: mirror,
  area_river: river,
  area_squares: squares,
  area_midtri: midTriangle,
};
void [PURPLE, LPURPLE, LRED, LBLUE, RED];
