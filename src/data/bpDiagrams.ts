import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, RED, LRED, YELLOW, LYELLOW, box } from "./harmKit";

// Diagrams for Class VIII Maths "The Baudhāyana-Pythagoras Theorem" (NCERT Ganita Prakash Part II, Chapter 2). Coordinates are computed from the
// real lengths, so right angles and equal sides are true in every picture. Checked by scripts/check-bp-diagrams.mts.

type P = [number, number];
const A = "#bfdbfe", B = "#fed7aa", Cc = "#bbf7d0";
/** a filled polygon with an outline */
const shape = (sb: SceneBuilder, pts: P[], fill: string, stroke = INK, sw = 2) => sb.poly(pts, { fill, stroke, sw });
/** the small square that marks a right angle at v, pointing towards p and q */
function right(sb: SceneBuilder, v: P, p: P, q: P, s = 12) {
  const unit = (a: P): P => { const dx = a[0] - v[0], dy = a[1] - v[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
  const u = unit(p), w = unit(q);
  sb.poly([[v[0] + u[0] * s, v[1] + u[1] * s], [v[0] + (u[0] + w[0]) * s, v[1] + (u[1] + w[1]) * s], [v[0] + w[0] * s, v[1] + w[1] * s]], { stroke: INK, sw: 1.4, close: false, decor: true });
}

// ── 1. doubling a square ──
function doubling(): Scene {
  const sb = new SceneBuilder(720, 340, "The square on the diagonal has double the area");
  sb.rect(120, 40, 110, 110, { fill: A });
  sb.poly([[120, 40], [230, 40], [230, 150], [120, 150]], { stroke: BLUE, sw: 2 });
  sb.poly([[230, 40], [340, 150], [230, 260], [120, 150]], { stroke: ORANGE, sw: 3 });
  sb.line(230, 150, 230, 260, { stroke: GREY, sw: 1.6, dash: "5 4" }); sb.line(230, 150, 340, 150, { stroke: GREY, sw: 1.6, dash: "5 4" });
  sb.text(108, 90, "original square", { size: 13, anchor: "end", fill: BLUE });
  sb.text(318, 90, "new square", { size: 13, anchor: "start", fill: "#c2410c" });
  box(sb, 400, 150, 300, 40, ["Original square = 2 small triangles"], { fill: LBLUE, stroke: BLUE, size: 13.5 });
  box(sb, 400, 200, 300, 40, ["Square on the diagonal = 4 triangles"], { fill: LORANGE, stroke: ORANGE, size: 13.5 });
  box(sb, 400, 250, 300, 40, ["So its area is DOUBLE"], { fill: LGREEN, stroke: GREEN, size: 15 });
  sb.text(360, 320, "Baudhāyana: the diagonal of a square produces a square of double the area", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 2. squares of 2, 4 and 8 triangles ──
function sequence(): Scene {
  const sb = new SceneBuilder(720, 300, "A sequence of squares, each double the one before");
  shape(sb, [[60, 110], [140, 110], [140, 190], [60, 190]], A); sb.line(60, 190, 140, 110, { sw: 2 });
  shape(sb, [[300, 70], [380, 150], [300, 230], [220, 150]], B); sb.line(300, 70, 300, 230, { sw: 2 }); sb.line(220, 150, 380, 150, { sw: 2 });
  shape(sb, [[470, 70], [630, 70], [630, 230], [470, 230]], Cc); sb.line(550, 70, 550, 230, { sw: 2 }); sb.line(470, 150, 630, 150, { sw: 2 });
  [[470, 150, 550, 70], [550, 70, 630, 150], [630, 150, 550, 230], [550, 230, 470, 150]].forEach(([a, b, c, d]) => sb.line(a, b, c, d, { sw: 2 }));
  sb.arrow(160, 150, 205, 150, { stroke: GREY }); sb.arrow(398, 150, 450, 150, { stroke: GREY });
  sb.text(100, 262, "2 triangles", { size: 14 }); sb.text(300, 262, "4 triangles", { size: 14 }); sb.text(550, 262, "8 triangles", { size: 14 });
  sb.text(360, 32, "Draw a square on the diagonal again and again: the area doubles every time", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 3. halving a square ──
function halving(): Scene {
  const sb = new SceneBuilder(720, 320, "Joining the midpoints gives a square of half the area");
  sb.poly([[80, 50], [300, 50], [300, 270], [80, 270]], { fill: "#e2e8f0", stroke: INK, sw: 2 });
  shape(sb, [[190, 50], [300, 160], [190, 270], [80, 160]], B, ORANGE, 3);
  sb.line(190, 50, 190, 270, { stroke: GREY, sw: 1.5, dash: "5 4" }); sb.line(80, 160, 300, 160, { stroke: GREY, sw: 1.5, dash: "5 4" });
  box(sb, 370, 60, 330, 46, ["The big square has 8 equal triangles"], { fill: "#f1f5f9", stroke: GREY, size: 13.5 });
  box(sb, 370, 124, 330, 46, ["The tilted inner square holds 4 of them"], { fill: LORANGE, stroke: ORANGE, size: 13.5 });
  box(sb, 370, 188, 330, 46, ["So its area is HALF"], { fill: LGREEN, stroke: GREEN, size: 15 });
  sb.text(535, 266, "Halving the side gives only one quarter of the area", { size: 12.5, fill: RED });
  return sb.build();
}

// ── 4. paper folding ──
function folding(): Scene {
  const sb = new SceneBuilder(720, 360, "Fold the four corners to the centre: PQRS is a square of half the area");
  sb.poly([[220, 40], [500, 40], [500, 320], [220, 320]], { fill: "#fef3c7", stroke: INK, sw: 2 });
  shape(sb, [[360, 40], [500, 180], [360, 320], [220, 180]], B, ORANGE, 3);
  sb.line(360, 40, 360, 320, { stroke: GREY, sw: 1.4, dash: "5 4" }); sb.line(220, 180, 500, 180, { stroke: GREY, sw: 1.4, dash: "5 4" });
  [[238, 58, 284, 104], [482, 58, 436, 104], [482, 302, 436, 256], [238, 302, 284, 256]].forEach(([a, b, c, d]) => sb.arrow(a, b, c, d, { stroke: BLUE, sw: 2 }));
  sb.text(360, 28, "R", { size: 15 }); sb.text(520, 185, "Q", { size: 15, anchor: "start" }); sb.text(360, 342, "P", { size: 15 }); sb.text(200, 185, "S", { size: 15, anchor: "end" });
  sb.text(374, 168, "O", { size: 13, anchor: "start" });
  sb.text(100, 90, "fold the four", { size: 13 }); sb.text(100, 108, "corners in", { size: 13 });
  sb.text(620, 90, "PQRS keeps 4 of", { size: 13 }); sb.text(620, 108, "the 8 triangles", { size: 13 });
  return sb.build();
}

// ── 5. isosceles right triangle ──
function isosceles(): Scene {
  const sb = new SceneBuilder(720, 300, "The square on the hypotenuse of an isosceles right triangle");
  shape(sb, [[220, 240], [120, 140], [220, 40], [320, 140]], B);
  shape(sb, [[120, 240], [220, 240], [120, 140]], A);
  right(sb, [120, 240], [220, 240], [120, 140]);
  sb.text(170, 262, "a", { size: 16 }); sb.text(100, 196, "a", { size: 16, anchor: "end" }); sb.text(196, 172, "c", { size: 17, fill: "#9a3412" });
  sb.text(220, 128, "c²", { size: 20, fill: "#9a3412" });
  box(sb, 390, 50, 310, 56, ["Square on the hypotenuse", "= 2 × square on one equal side"], { fill: LBLUE, stroke: BLUE, size: 13.5, bold: [true, false] });
  box(sb, 390, 124, 310, 46, ["c² = 2a²"], { fill: LORANGE, stroke: ORANGE, size: 19 });
  box(sb, 390, 188, 310, 46, ["c = a√2"], { fill: LGREEN, stroke: GREEN, size: 19 });
  return sb.build();
}

// ── 6. bounds for root 2 ──
function rootTwo(): Scene {
  const sb = new SceneBuilder(720, 340, "Closer and closer bounds for the square root of 2");
  const rows: [number, number, number, number[], string][] = [[60, 1, 2, [1, 1.4, 1.5, 2], "1.4 < √2 < 1.5"], [160, 1.4, 1.5, [1.4, 1.41, 1.42, 1.5], "1.41 < √2 < 1.42"], [260, 1.41, 1.42, [1.41, 1.414, 1.415, 1.42], "1.414 < √2 < 1.415"]];
  rows.forEach(([y, lo, hi, marks, t]) => {
    const X = (v: number) => 50 + ((v - lo) / (hi - lo)) * 450;
    sb.line(50, y, 500, y, { sw: 2.4 });
    marks.forEach((m, i) => { sb.line(X(m), y - 7, X(m), y + 7, { sw: 2, decor: true }); sb.text(X(m), y + (i === 2 && hi - lo < 0.5 ? 42 : 26), String(m), { size: 12.5 }); });
    sb.circle(X(Math.SQRT2), y, 6, { fill: RED });
    sb.text(X(Math.SQRT2), y - 16, "√2", { size: 13.5, fill: RED });
    sb.text(540, y + 5, t, { size: 14, anchor: "start", fill: BLUE });
  });
  sb.text(360, 326, "√2 = 1.41421356... The decimal expansion goes on forever", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 7. squares on the sides of a 3-4-5 triangle ──
function squares345(): Scene {
  const sb = new SceneBuilder(720, 380, "Squares on the sides of a 3, 4, 5 triangle: 9 + 16 = 25");
  const u = 26, o: P = [280, 240];
  const x: P = [o[0] + 4 * u, o[1]], y: P = [o[0], o[1] - 3 * u];
  shape(sb, [o, x, [x[0], x[1] + 4 * u], [o[0], o[1] + 4 * u]], Cc);
  shape(sb, [o, y, [y[0] - 3 * u, y[1]], [o[0] - 3 * u, o[1]]], A);
  const n: P = [3 * u, -4 * u];
  shape(sb, [y, x, [x[0] + n[0], x[1] + n[1]], [y[0] + n[0], y[1] + n[1]]], B);
  shape(sb, [o, x, y], "#ffffff");
  right(sb, o, x, y);
  const tag = (cx: number, cy: number, t: string) => { sb.circle(cx, cy, 18, { fill: "#ffffff" }); sb.text(cx, cy + 6, t, { size: 17 }); };
  tag(o[0] - 1.5 * u, o[1] - 1.5 * u, "9"); tag(o[0] + 2 * u, o[1] + 2 * u, "16"); tag((y[0] + x[0] + n[0]) / 2, (y[1] + x[1] + n[1]) / 2, "25");
  sb.text(o[0] + 16, o[1] - 34, "3", { size: 13 }); sb.text(o[0] + 44, o[1] - 8, "4", { size: 13 }); sb.text(o[0] + 62, o[1] - 56, "5", { size: 14 });
  box(sb, 520, 150, 180, 80, ["9 + 16 = 25", "3² + 4² = 5²"], { fill: LYELLOW, stroke: "#ca8a04", size: 17, bold: [true, true] });
  return sb.build();
}

// ── 8. Baudhāyana's rearrangement of two squares into one ──
function rearrange(): Scene {
  const sb = new SceneBuilder(720, 320, "Cut two joined squares into three pieces and rearrange them into one square");
  shape(sb, [[40, 250], [180, 250], [40, 180]], A); shape(sb, [[180, 250], [250, 250], [250, 110]], B); shape(sb, [[40, 180], [180, 250], [250, 110], [110, 110], [110, 180]], Cc);
  sb.line(110, 180, 110, 250, { stroke: GREY, sw: 1.4, dash: "4 3" });
  sb.text(75, 168, "a", { size: 16 }); sb.text(180, 96, "b", { size: 16 }); sb.text(180, 272, "P", { size: 14 });
  shape(sb, [[400, 180], [540, 250], [610, 110], [470, 110], [470, 180]], Cc); shape(sb, [[470, 110], [610, 110], [470, 40]], A); shape(sb, [[400, 180], [470, 180], [470, 40]], B);
  sb.poly([[540, 250], [610, 110], [470, 40], [400, 180]], { stroke: INK, sw: 3.4 });
  sb.text(602, 196, "c", { size: 18, fill: RED }); sb.text(422, 96, "c", { size: 18, fill: RED });
  sb.arrow(292, 180, 366, 180, { stroke: INK, sw: 2.6 });
  sb.text(140, 300, "two squares: a² + b²", { size: 14 }); sb.text(510, 300, "one square of side c: c²", { size: 14 });
  return sb.build();
}

// ── 9. four triangles in a square ──
function fourTriangles(): Scene {
  const sb = new SceneBuilder(720, 320, "Four right triangles in a square of side a + b");
  sb.poly([[80, 40], [300, 40], [300, 260], [80, 260]], { stroke: INK, sw: 2 });
  shape(sb, [[80, 40], [160, 40], [80, 180]], A); shape(sb, [[160, 40], [300, 40], [300, 120]], A); shape(sb, [[300, 120], [300, 260], [220, 260]], A); shape(sb, [[220, 260], [80, 260], [80, 180]], A);
  shape(sb, [[160, 40], [300, 120], [220, 260], [80, 180]], B);
  sb.text(190, 156, "c²", { size: 22, fill: "#9a3412" });
  sb.text(120, 28, "a", { size: 15 }); sb.text(230, 28, "b", { size: 15 }); sb.text(318, 84, "a", { size: 15 }); sb.text(318, 196, "b", { size: 15 });
  sb.text(150, 282, "b", { size: 15 }); sb.text(260, 282, "a", { size: 15 }); sb.text(62, 114, "b", { size: 15 }); sb.text(62, 226, "a", { size: 15 });
  box(sb, 370, 60, 330, 46, ["(a + b)² = 4 × half of ab + c²"], { fill: LBLUE, stroke: BLUE, size: 14.5 });
  box(sb, 370, 126, 330, 46, ["a² + 2ab + b² = 2ab + c²"], { fill: LORANGE, stroke: ORANGE, size: 14.5 });
  box(sb, 370, 192, 330, 52, ["a² + b² = c²"], { fill: LGREEN, stroke: GREEN, size: 21 });
  return sb.build();
}

// ── 10. odd numbers make squares ──
function oddSquares(): Scene {
  const sb = new SceneBuilder(720, 300, "The fifth odd number added to 4 squared gives 5 squared");
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) sb.rect(80 + c * 40, 40 + r * 40, 37, 37, { fill: r === 0 || c === 4 ? "#fb923c" : "#60a5fa" });
  box(sb, 330, 46, 370, 46, ["Blue: 4² = 16 small squares"], { fill: LBLUE, stroke: BLUE, size: 14.5 });
  box(sb, 330, 110, 370, 46, ["Orange: 2 × 5 − 1 = 9, the 5th odd number"], { fill: LORANGE, stroke: ORANGE, size: 14.5 });
  box(sb, 330, 174, 370, 52, ["16 + 9 = 25, that is 4² + 3² = 5²"], { fill: LGREEN, stroke: GREEN, size: 15.5 });
  sb.text(360, 276, "(n − 1)² + (2n − 1) = n²: when 2n − 1 is a square we get a triple", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 11. scaled triples ──
function scaled(): Scene {
  const sb = new SceneBuilder(720, 290, "A scaled triple is the same shape in a bigger size");
  shape(sb, [[60, 220], [140, 220], [60, 160]], A); right(sb, [60, 220], [140, 220], [60, 160]);
  shape(sb, [[280, 250], [440, 250], [280, 130]], B); right(sb, [280, 250], [440, 250], [280, 130]);
  sb.text(100, 242, "4", { size: 15 }); sb.text(46, 196, "3", { size: 15, anchor: "end" }); sb.text(116, 180, "5", { size: 15 });
  sb.text(360, 272, "8", { size: 15 }); sb.text(266, 196, "6", { size: 15, anchor: "end" }); sb.text(380, 180, "10", { size: 15 });
  sb.arrow(160, 196, 238, 196, { stroke: PURPLE, sw: 2.6 }); sb.text(198, 182, "× 2", { size: 15, fill: PURPLE });
  box(sb, 490, 100, 210, 90, ["(3k, 4k, 5k)", "is a triple for every", "counting number k"], { fill: LPURPLE, stroke: PURPLE, size: 14, bold: [true, false, false] });
  sb.text(360, 30, "Multiply every side of a triple by k and it is still a triple", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 12. ladder ──
function ladder(): Scene {
  const sb = new SceneBuilder(720, 320, "A ladder against a wall");
  sb.rect(180, 30, 20, 242, { fill: "#cbd5e1" }); sb.line(120, 272, 420, 272, { stroke: INK, sw: 3 });
  sb.line(290, 270, 202, 56, { stroke: "#b45309", sw: 6 });
  right(sb, [202, 270], [290, 270], [202, 56], 14);
  sb.text(268, 150, "13 m", { size: 15, anchor: "start" }); sb.text(246, 296, "5 m", { size: 15 }); sb.text(164, 160, "h", { size: 18, anchor: "end", fill: RED });
  box(sb, 430, 70, 270, 120, ["The ladder is the hypotenuse", "h² = 13² − 5²", "= 169 − 25 = 144", "h = 12 m"], { fill: LYELLOW, stroke: "#ca8a04", size: 15, bold: [true, false, false, true] });
  return sb.build();
}

// ── 13. two poles ──
function poles(): Scene {
  const sb = new SceneBuilder(720, 320, "Distance between the tops of two poles");
  sb.line(80, 280, 380, 280, { stroke: INK, sw: 3 });
  sb.line(120, 280, 120, 172, { stroke: "#475569", sw: 7 }); sb.line(336, 280, 336, 82, { stroke: "#475569", sw: 7 });
  sb.line(124, 172, 332, 172, { stroke: GREY, sw: 1.6, dash: "5 4" }); sb.line(120, 172, 336, 82, { stroke: RED, sw: 2.6 });
  right(sb, [332, 172], [124, 172], [332, 82]);
  sb.text(104, 232, "6 m", { size: 14, anchor: "end" }); sb.text(356, 236, "11 m", { size: 14, anchor: "start" }); sb.text(356, 132, "5 m", { size: 14, anchor: "start" });
  sb.text(228, 192, "12 m", { size: 14 }); sb.text(210, 112, "d", { size: 18, fill: RED });
  box(sb, 440, 90, 260, 100, ["d² = 12² + 5²", "= 144 + 25 = 169", "d = 13 m"], { fill: LYELLOW, stroke: "#ca8a04", size: 15, bold: [false, false, true] });
  return sb.build();
}

// ── 14. the lotus ──
function lotus(): Scene {
  const sb = new SceneBuilder(720, 320, "The lotus problem of Bhāskarāchārya");
  sb.rect(60, 150, 340, 120, { fill: "#bfdbfe" });
  sb.line(60, 150, 400, 150, { stroke: BLUE, sw: 2.4 }); sb.line(60, 270, 400, 270, { stroke: "#92400e", sw: 3 });
  sb.line(200, 270, 200, 122, { stroke: DGREEN, sw: 4 }); sb.line(200, 270, 290, 150, { stroke: GREEN, sw: 3, dash: "7 5" });
  sb.circle(200, 114, 9, { fill: "#f472b6" }); sb.circle(290, 150, 9, { fill: "#f9a8d4" });
  sb.text(246, 138, "3", { size: 15 }); sb.text(184, 138, "1", { size: 14, anchor: "end" }); sb.text(184, 216, "x", { size: 17, anchor: "end" }); sb.text(264, 224, "x + 1", { size: 15, anchor: "start" });
  sb.text(110, 100, "water surface", { size: 12.5, fill: BLUE }); sb.line(110, 108, 110, 142, { stroke: GREY, sw: 1.2 });
  box(sb, 440, 80, 260, 130, ["3² + x² = (x + 1)²", "9 + x² = x² + 2x + 1", "9 = 2x + 1", "x = 4 units deep"], { fill: LYELLOW, stroke: "#ca8a04", size: 15, bold: [false, false, false, true] });
  sb.text(360, 306, "The stem is upright at first, then the breeze bends it until the tip touches the water", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 15. rhombus ──
function rhombus(): Scene {
  const sb = new SceneBuilder(720, 290, "A rhombus with diagonals 70 and 24");
  shape(sb, [[50, 150], [225, 90], [400, 150], [225, 210]], A);
  sb.line(50, 150, 400, 150, { stroke: GREY, sw: 1.6, dash: "5 4" }); sb.line(225, 90, 225, 210, { stroke: GREY, sw: 1.6, dash: "5 4" });
  right(sb, [225, 150], [400, 150], [225, 90], 10);
  sb.text(150, 140, "35", { size: 14 }); sb.text(214, 128, "12", { size: 14, anchor: "end" }); sb.text(330, 100, "side", { size: 15, fill: RED });
  box(sb, 450, 80, 250, 130, ["Diagonals bisect each", "other at right angles", "side² = 12² + 35² = 1369", "side = 37 units"], { fill: LYELLOW, stroke: "#ca8a04", size: 14, bold: [false, false, false, true] });
  return sb.build();
}

// ── 16. equilateral triangle ──
function equilateral(): Scene {
  const sb = new SceneBuilder(720, 310, "The altitude of an equilateral triangle of side 6");
  const top: P = [220, 260 - 90 * Math.sqrt(3)];
  shape(sb, [[130, 260], [310, 260], top], A);
  sb.line(220, top[1], 220, 260, { stroke: RED, sw: 2, dash: "6 4" }); right(sb, [220, 260], [310, 260], top);
  sb.text(156, 178, "6", { size: 15, anchor: "end" }); sb.text(286, 178, "6", { size: 15, anchor: "start" }); sb.text(175, 284, "3", { size: 15 }); sb.text(265, 284, "3", { size: 15 }); sb.text(232, 214, "h", { size: 17, anchor: "start", fill: RED });
  box(sb, 410, 80, 290, 130, ["h² = 6² − 3² = 27", "h = √27 = 3√3", "Area = half × 6 × 3√3", "= 9√3, about 15.59"], { fill: LYELLOW, stroke: "#ca8a04", size: 15, bold: [false, false, false, true] });
  return sb.build();
}

// ── 17. squares on a dot grid ──
function dotGrid(): Scene {
  const sb = new SceneBuilder(720, 340, "Squares on a grid of dots");
  const X = (i: number) => 90 + 48 * i, Y = (j: number) => 40 + 48 * j;
  for (let i = 0; i <= 11; i++) for (let j = 0; j <= 4; j++) sb.circle(X(i), Y(j), 3, { fill: "#64748b" });
  shape(sb, [[X(1), Y(1)], [X(2), Y(2)], [X(1), Y(3)], [X(0), Y(2)]], A);
  shape(sb, [[X(3), Y(1)], [X(5), Y(1)], [X(5), Y(3)], [X(3), Y(3)]], Cc);
  shape(sb, [[X(7), Y(1)], [X(9), Y(0)], [X(10), Y(2)], [X(8), Y(3)]], B);
  sb.text(X(1), 278, "area 2", { size: 15 }); sb.text(X(4), 278, "area 4", { size: 15 }); sb.text(X(8.5), 278, "area 5", { size: 15 });
  sb.text(X(1), 298, "1² + 1²", { size: 13, bold: false }); sb.text(X(4), 298, "2² + 0²", { size: 13, bold: false }); sb.text(X(8.5), 298, "2² + 1²", { size: 13, bold: false });
  sb.text(360, 326, "A tilted square going p across and q up has area p² + q². Area 3 is impossible.", { size: 13, fill: GREY, bold: false });
  return sb.build();
}

// ── 18. missing sides ──
function missing(): Scene {
  const sb = new SceneBuilder(720, 330, "Find the missing side in each right triangle");
  const cells: [string, string, string, string][] = [["(a)", "7", "9", "?"], ["(b)", "4", "10", "?"], ["(c)", "?", "40", "41"], ["(d)", "?", "10", "√200"], ["(e)", "10", "√150", "?"], ["(f)", "?", "27", "45"]];
  cells.forEach(([n, v, h, c], i) => {
    const x = (i % 3) * 240, y = Math.floor(i / 3) * 160;
    shape(sb, [[x + 70, y + 118], [x + 180, y + 118], [x + 70, y + 34]], A); right(sb, [x + 70, y + 118], [x + 180, y + 118], [x + 70, y + 34]);
    sb.text(x + 24, y + 30, n, { size: 15 });
    sb.text(x + 56, y + 82, v, { size: 15, anchor: "end", fill: v === "?" ? RED : INK }); sb.text(x + 125, y + 140, h, { size: 15 }); sb.text(x + 138, y + 66, c, { size: 15, anchor: "start", fill: c === "?" ? RED : INK });
  });
  return sb.build();
}

// ── 19. a square equal to the difference of two squares ──
function difference(): Scene {
  const sb = new SceneBuilder(720, 340, "Constructing a side whose square is 7 squared minus 5 squared");
  const Ay = 290, h = 36 * Math.sqrt(24);
  shape(sb, [[130, Ay], [310, Ay], [130, Ay - h]], A); right(sb, [130, Ay], [310, Ay], [130, Ay - h]);
  sb.line(130, Ay - h, 130, 44, { stroke: GREY, sw: 1.6, dash: "5 4" });
  sb.curve([166, 82], [130, 102], [104, 134], { stroke: ORANGE, sw: 2 });
  sb.text(220, 314, "5 units", { size: 14 }); sb.text(236, 188, "7 units", { size: 14, anchor: "start" }); sb.text(114, 210, "√24", { size: 16, anchor: "end", fill: RED });
  sb.text(118, Ay + 22, "A", { size: 14, anchor: "end" }); sb.text(326, Ay + 22, "B", { size: 14, anchor: "start" }); sb.text(144, Ay - h - 2, "C", { size: 14, anchor: "start" });
  box(sb, 410, 90, 290, 130, ["Draw AB = 5 and a line at 90° at A", "With centre B, radius 7, cut it at C", "AC² = 49 − 25 = 24", "The square on AC has area 24"], { fill: LYELLOW, stroke: "#ca8a04", size: 13.5, bold: [false, false, false, true] });
  return sb.build();
}

// ── 20. the square root spiral (Competition Corner) ──
function spiral(): Scene {
  const sb = new SceneBuilder(720, 420, "The square root spiral");
  const O: P = [360, 220], u = 70;
  let r: P = [u, 0];
  const pts: P[] = [[O[0] + r[0], O[1] + r[1]]];
  for (let k = 1; k <= 7; k++) { const l = Math.hypot(r[0], r[1]); r = [r[0] + (u * r[1]) / l, r[1] - (u * r[0]) / l]; pts.push([O[0] + r[0], O[1] + r[1]]); }
  const fills = ["#bfdbfe", "#fed7aa", "#bbf7d0", "#ddd6fe", "#fecaca", "#fef08a", "#a5f3fc"];
  for (let k = 0; k < 7; k++) shape(sb, [O, pts[k], pts[k + 1]], fills[k], INK, 1.6);
  pts.forEach((p, k) => { const dx = p[0] - O[0], dy = p[1] - O[1], l = Math.hypot(dx, dy); sb.text(O[0] + (dx / l) * (l + 24), O[1] + (dy / l) * (l + 24) + 5, k === 0 ? "1" : `√${k + 1}`, { size: 15, fill: "#1d4ed8" }); });
  sb.text(360, 408, "Each new triangle has a side of 1 at right angles to the last hypotenuse: lengths √2, √3, √4, ...", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 21. space diagonal of a box (Competition Corner) ──
function cuboid(): Scene {
  const sb = new SceneBuilder(720, 300, "The longest rod that fits in a box");
  const f: P[] = [[100, 240], [300, 240], [300, 130], [100, 130]], d: P = [80, -60];
  const bk = f.map(([x, y]) => [x + d[0], y + d[1]] as P);
  sb.poly(f, { stroke: INK, sw: 2 }); sb.poly([f[3], bk[3], bk[2], f[2]], { stroke: INK, sw: 2, close: false }); sb.line(f[1][0], f[1][1], bk[1][0], bk[1][1], { sw: 2 }); sb.line(bk[1][0], bk[1][1], bk[2][0], bk[2][1], { sw: 2 });
  sb.line(f[0][0], f[0][1], bk[0][0], bk[0][1], { stroke: GREY, sw: 1.4, dash: "5 4" }); sb.line(bk[0][0], bk[0][1], bk[1][0], bk[1][1], { stroke: GREY, sw: 1.4, dash: "5 4" }); sb.line(bk[0][0], bk[0][1], bk[3][0], bk[3][1], { stroke: GREY, sw: 1.4, dash: "5 4" });
  sb.line(f[0][0], f[0][1], bk[2][0], bk[2][1], { stroke: RED, sw: 3 });
  sb.text(200, 264, "l", { size: 17 }); sb.text(358, 222, "b", { size: 17, anchor: "start" }); sb.text(84, 190, "h", { size: 17, anchor: "end" }); sb.text(222, 150, "d", { size: 18, fill: RED });
  box(sb, 450, 90, 250, 110, ["d² = l² + b² + h²", "(the theorem used twice)", "3, 4, 12 gives d = 13"], { fill: LYELLOW, stroke: "#ca8a04", size: 14.5, bold: [true, false, false] });
  return sb.build();
}

// ── 22. mind map ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "The Baudhāyana-Pythagoras Theorem: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Doubling a square", col: "#b45309", tint: "#fef3c7", leaves: ["Square on the diagonal", "Area becomes double", "4 triangles against 2"] },
    { n: "2", t: "Halving a square", col: "#2563eb", tint: "#dbeafe", leaves: ["Join the midpoints", "Inner square is half", "Half the side: one quarter"] },
    { n: "3", t: "Isosceles right", col: "#0f766e", tint: "#ccfbf1", leaves: ["c^{2} = 2a^{2}", "c = a√2", "Side 1: hypotenuse √2"] },
    { n: "4", t: "The number √2", col: "#15803d", tint: "#dcfce7", leaves: ["Between 1.414 and 1.415", "Decimal never ends", "Not a fraction (Euclid)"] },
    { n: "5", t: "The theorem", col: "#c2410c", tint: "#ffedd5", leaves: ["a^{2} + b^{2} = c^{2}", "c is the hypotenuse", "Shorter side: c^{2} − b^{2}"] },
    { n: "6", t: "Triples", col: "#7c3aed", tint: "#ede9fe", leaves: ["(3, 4, 5), (5, 12, 13)", "Scaled and primitive", "From odd squares"] },
    { n: "7", t: "Fermat", col: "#b91c1c", tint: "#fee2e2", leaves: ["x^{n} + y^{n} = z^{n}", "No solution when n is over 2", "Proved by Wiles in 1994"] },
    { n: "8", t: "Applications", col: "#a21caf", tint: "#fae8ff", leaves: ["Lotus, ladder, poles", "Rhombus, equilateral triangle", "Squares on a dot grid"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 22, "BAUDHĀYANA", { size: 16, fill: "#ffffff" }); sb.text(cx, cy, "PYTHAGORAS", { size: 16, fill: "#e2e8f0" }); sb.text(cx, cy + 28, "a^{2} + b^{2} = c^{2}", { size: 17, fill: "#fbbf24" });
  const slots = [110, 300, 490, 680];
  const pw = 232, ph = 44, lw = 272, lh = 32, gap = 9, off = 300;
  const curve4 = (p0: P, p1: P, p2: P, p3: P, col: string, w: number) => {
    const pts: P[] = [];
    for (let i = 0; i <= 28; i++) { const t = i / 28, m = 1 - t; pts.push([m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0], m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1]]); }
    sb.blob("M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L "), pts, { stroke: col, sw: w });
  };
  brs.forEach((b, i) => {
    const rt = i < 4;
    const my = rt ? slots[i] : slots[7 - i];
    const mx = rt ? cx + off : cx - off;
    const an = Math.atan2(my - cy, mx - cx);
    const sx = cx + Math.cos(an) * 104, sy = cy + Math.sin(an) * 104;
    const ex = rt ? mx - pw / 2 : mx + pw / 2, ey = my;
    curve4([sx, sy], [sx + (ex - sx) * 0.5, sy], [sx + (ex - sx) * 0.5, ey], [ex, ey], b.col, 9);
    curve4([sx, sy], [sx + (ex - sx) * 0.5, sy], [sx + (ex - sx) * 0.5, ey], [ex, ey], "#ffffff", 2);
    sb.rect(mx - pw / 2, my - ph / 2, pw, ph, { rx: 22, fill: b.col, stroke: "#ffffff", sw: 3 });
    sb.circle(mx - pw / 2 + 24, my, 15, { fill: "#ffffff" }); sb.text(mx - pw / 2 + 24, my + 5.5, b.n, { size: 16, fill: b.col });
    sb.text(mx - pw / 2 + 46, my + 5, b.t, { size: 13, fill: "#ffffff", anchor: "start" });
    const total = b.leaves.length * lh + (b.leaves.length - 1) * gap;
    const lx = rt ? mx + pw / 2 + 26 : mx - pw / 2 - 26 - lw;
    const ly0 = my - total / 2;
    b.leaves.forEach((t, k) => {
      const y = ly0 + k * (lh + gap);
      const sxm = rt ? mx + pw / 2 : mx - pw / 2;
      sb.line(sxm, my, rt ? lx : lx + lw, y + lh / 2, { stroke: b.col, sw: 1.8 });
      sb.rect(lx, y, lw, lh, { rx: 16, fill: b.tint, stroke: b.col, sw: 1.8 });
      sb.text(lx + lw / 2, y + lh / 2 + 4.5, t, { size: 12, fill: INK });
    });
  });
  sb.text(cx, 800, "THREE THINGS TO REMEMBER", { size: 14, fill: GREY });
  const rules: [string, string, string, string][] = [
    ["Which side is c?", "the side opposite the right angle", "it is always the longest side", "#0f766e"],
    ["Finding a side", "hypotenuse: add the squares", "other side: subtract the squares", "#c2410c"],
    ["Checking a triangle", "square the two smaller sides and add", "equal to the largest square: right angle", "#7c3aed"],
  ];
  rules.forEach(([a, b2, c2, col], i) => {
    const x = 90 + i * 430;
    sb.rect(x, 820, 400, 100, { rx: 16, fill: "#ffffff", stroke: col, sw: 2.6 });
    sb.rect(x, 820, 400, 34, { rx: 16, fill: col });
    sb.text(x + 200, 843, a, { size: 14.5, fill: "#ffffff" });
    sb.text(x + 200, 878, b2, { size: 13.5, fill: INK }); sb.text(x + 200, 900, c2, { size: 12, fill: INK, bold: false });
  });
  return sb.build();
}

export const BP_DIAGRAMS: Record<string, () => Scene> = {
  bp_double: doubling,
  bp_sequence: sequence,
  bp_halve: halving,
  bp_fold: folding,
  bp_iso: isosceles,
  bp_root2: rootTwo,
  bp_345: squares345,
  bp_rearrange: rearrange,
  bp_four: fourTriangles,
  bp_odd: oddSquares,
  bp_scaled: scaled,
  bp_ladder: ladder,
  bp_poles: poles,
  bp_lotus: lotus,
  bp_rhombus: rhombus,
  bp_equi: equilateral,
  bp_grid: dotGrid,
  bp_missing: missing,
  bp_diff: difference,
  bp_spiral: spiral,
  bp_cuboid: cuboid,
  bp_mindmap: mindMap,
};
void [LRED, YELLOW, LPURPLE];
