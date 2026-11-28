import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, GREY, RED, LYELLOW, box } from "./harmKit";
import { shape, seg, dash, right, tick, dim, txt, note, FB, FO, FG, FY, FR, FP, PATH, PARK } from "./areaDiagrams";
import type { P } from "./areaDiagrams";

// Diagrams (part 2: polygons, parallelogram, rhombus, trapezium, units and the mind map) for Class VIII Maths "Area".
// Coordinates are computed from the real lengths. Checked by scripts/check-area-diagrams.mts.

const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const foot = (p: P, a: P, b: P): P => { const vx = b[0] - a[0], vy = b[1] - a[1], t = ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / (vx * vx + vy * vy); return [a[0] + t * vx, a[1] + t * vy]; };

// ── 25. polygons split into triangles ──
function polygon(): Scene {
  const sb = new SceneBuilder(720, 300, "Any polygon can be divided into triangles");
  const A: P = [90, 70], B: P = [270, 50], C: P = [310, 230], D: P = [70, 215];
  shape(sb, [A, B, D], FB); shape(sb, [B, C, D], FY);
  txt(sb, A[0] - 12, 66, "A"); txt(sb, B[0] + 12, 48, "B"); txt(sb, C[0] + 12, 248, "C"); txt(sb, D[0] - 12, 232, "D");
  const cx = 540, cy = 145, r = 100;
  const v: P[] = [0, 1, 2, 3, 4].map((i) => [cx + r * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / 5), cy + r * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / 5)] as P);
  shape(sb, [v[0], v[1], v[2]], FG); shape(sb, [v[0], v[2], v[3]], FY); shape(sb, [v[0], v[3], v[4]], FB);
  txt(sb, 190, 274, "quadrilateral: 2 triangles", 14); txt(sb, cx, 274, "pentagon: 3 triangles", 14);
  return sb.build();
}

// ── 26. quadrilateral with a diagonal and two heights ──
function quad(): Scene {
  const sb = new SceneBuilder(720, 300, "A quadrilateral with diagonal AC and two heights");
  const A: P = [100, 150], C: P = [540, 150], M: P = [440, 150], N: P = [190, 150], B: P = [440, 70], D: P = [190, 230];
  shape(sb, [A, B, C], FB); shape(sb, [A, C, D], FY);
  dash(sb, B, M); dash(sb, D, N); right(sb, M, B, A); right(sb, N, D, C);
  txt(sb, 82, 156, "A"); txt(sb, 558, 156, "C"); txt(sb, B[0], 58, "B"); txt(sb, D[0], 250, "D"); txt(sb, M[0] - 14, 168, "M"); txt(sb, N[0] + 16, 142, "N");
  txt(sb, 428, 122, "3 cm", 14, INK, "end"); txt(sb, 202, 190, "3 cm", 14, INK, "start"); txt(sb, 312, 140, "AC = 22 cm", 14);
  box(sb, 575, 90, 130, 120, ["½ × 22 × 3", "+ ½ × 22 × 3", "= 66 cm²"], { fill: LGREEN, stroke: GREEN, size: 14.5, bold: [false, false, true] });
  note(sb, 320, 282, "The diagonal splits the quadrilateral into two triangles");
  return sb.build();
}

// ── 27. shaded region ──
function shaded(): Scene {
  const sb = new SceneBuilder(720, 350, "Find the area of the shaded region FECD");
  const u = 20, X = 150, Y = 60;
  const A: P = [X, Y], B: P = [X + 18 * u, Y], C: P = [X + 18 * u, Y + 10 * u], D: P = [X, Y + 10 * u], E: P = [X + 10 * u, Y], F: P = [X, Y + 6 * u];
  sb.poly([A, B, C, D], { stroke: INK, sw: 2 });
  shape(sb, [F, E, C, D], FB);
  txt(sb, X - 10, Y - 8, "A"); txt(sb, B[0] + 10, Y - 8, "B"); txt(sb, C[0] + 12, C[1] + 14, "C"); txt(sb, D[0] - 12, D[1] + 14, "D"); txt(sb, E[0], Y - 6, "E"); txt(sb, F[0] - 14, F[1] + 5, "F");
  dim(sb, [X + 12, Y - 26], [E[0] - 10, Y - 26]); txt(sb, X + 5 * u, Y - 33, "10 cm", 14);
  dim(sb, [E[0] + 10, Y - 26], [B[0] - 12, Y - 26]); txt(sb, X + 14 * u, Y - 33, "8 cm", 14);
  dim(sb, [X - 34, Y], [X - 34, F[1]]); txt(sb, X - 44, Y + 3 * u + 5, "6 cm", 14, INK, "end");
  dim(sb, [X - 34, F[1]], [X - 34, D[1]]); txt(sb, X - 44, Y + 8 * u + 5, "4 cm", 14, INK, "end");
  dim(sb, [B[0] + 24, Y], [B[0] + 24, C[1]]); txt(sb, B[0] + 34, Y + 5 * u + 5, "10 cm", 14, INK, "start");
  dim(sb, [X + 12, D[1] + 26], [C[0] - 12, D[1] + 26]); txt(sb, X + 9 * u, D[1] + 50, "18 cm", 14);
  return sb.build();
}

// ── 28. point inside a rectangle ──
function blue(): Scene {
  const sb = new SceneBuilder(720, 300, "A point inside a rectangle joined to the corners");
  const A: P = [170, 50], B: P = [430, 50], C: P = [430, 240], D: P = [170, 240], Pp: P = [340, 170];
  sb.rect(170, 50, 260, 190, { fill: "#ffffff" });
  shape(sb, [A, B, Pp], "#38bdf8"); shape(sb, [D, Pp, C], "#38bdf8");
  sb.poly([A, B, C, D], { stroke: INK, sw: 2.2 });
  dash(sb, [Pp[0], 50], Pp); dash(sb, Pp, [Pp[0], 240]);
  txt(sb, Pp[0] + 22, 174, "P"); txt(sb, Pp[0] - 14, 98, "h_{1}", 16, INK, "end"); txt(sb, Pp[0] - 5, 222, "h_{2}", 16, INK, "end");
  dim(sb, [170, 262], [430, 262]); txt(sb, 300, 285, "l", 16);
  dim(sb, [150, 50], [150, 240]); txt(sb, 138, 150, "w", 16, INK, "end");
  box(sb, 475, 90, 225, 110, ["h₁ + h₂ = w", "blue = ½ × l × w", "half the rectangle"], { fill: LBLUE, stroke: BLUE, size: 15.5, bold: [false, false, true] });
  return sb.build();
}

// ── 29. midpoint quadrilateral ──
function midQuad(): Scene {
  const sb = new SceneBuilder(720, 320, "Joining the midpoints gives half the area");
  const A: P = [130, 60], B: P = [420, 45], C: P = [460, 270], D: P = [90, 245];
  const Pp = mid(A, B), Q = mid(B, C), R = mid(C, D), S = mid(D, A);
  sb.poly([A, B, C, D], { stroke: INK, sw: 2.4 });
  shape(sb, [Pp, Q, R, S], FB);
  dash(sb, B, D, GREY);
  txt(sb, A[0] - 12, 56, "A"); txt(sb, B[0] + 12, 42, "B"); txt(sb, C[0] + 12, 288, "C"); txt(sb, D[0] - 12, 262, "D");
  txt(sb, Pp[0], Pp[1] - 12, "P"); txt(sb, Q[0] + 16, Q[1] + 4, "Q"); txt(sb, R[0], R[1] + 24, "R"); txt(sb, S[0] - 16, S[1] + 5, "S");
  box(sb, 500, 100, 200, 110, ["PQRS = half", "of ABCD", "for any quadrilateral"], { fill: LGREEN, stroke: GREEN, size: 15, bold: [true, true, false] });
  return sb.build();
}

// ── 30. parallelogram to rectangle ──
function pgram(): Scene {
  const sb = new SceneBuilder(720, 290, "Cut off a triangle and fit it at the other end");
  const h = 130, w = 200;
  const A: P = [100, 60], B: P = [100 + w, 60], C: P = [40 + w, 60 + h], D: P = [40, 60 + h], X: P = [100, 60 + h];
  shape(sb, [A, D, X], FG); shape(sb, [A, B, C, X], FB); right(sb, X, A, C);
  txt(sb, A[0], 48, "A"); txt(sb, B[0] + 6, 48, "B"); txt(sb, C[0] + 6, 210, "C"); txt(sb, 30, 208, "D"); txt(sb, X[0], 210, "X");
  sb.arrow(314, 125, 372, 125, { stroke: GREY, sw: 2.4 });
  const A2: P = [440, 60], B2: P = [440 + w, 60], C2: P = [380 + w, 60 + h], X2: P = [440, 60 + h], Y: P = [440 + w, 60 + h];
  shape(sb, [A2, B2, C2, X2], FB); shape(sb, [B2, Y, C2], FG); right(sb, X2, A2, C2); right(sb, Y, B2, C2);
  txt(sb, A2[0], 48, "A"); txt(sb, B2[0], 48, "B"); txt(sb, C2[0], 210, "C"); txt(sb, X2[0], 210, "X"); txt(sb, Y[0] + 6, 210, "Y");
  txt(sb, A2[0] - 10, 130, "height", 13.5, INK, "end");
  dim(sb, [440, 232], [440 + w, 232]); txt(sb, 540, 254, "XY = DC = base", 14);
  note(sb, 360, 278, "△AXD fits exactly on △BYC, so area = base × height");
  return sb.build();
}

// ── 31. other base ──
function pgramSide(): Scene {
  const sb = new SceneBuilder(720, 290, "Side AD as the base with height CZ");
  const A: P = [190, 60], B: P = [430, 60], C: P = [370, 230], D: P = [130, 230];
  const Z = foot(C, A, D);
  shape(sb, [A, B, C, D], FB); dash(sb, C, Z); right(sb, Z, C, A);
  txt(sb, A[0], 48, "A"); txt(sb, B[0] + 8, 48, "B"); txt(sb, C[0] + 8, 250, "C"); txt(sb, D[0] - 10, 250, "D"); txt(sb, Z[0] - 14, Z[1] + 2, "Z");
  txt(sb, (C[0] + Z[0]) / 2 + 24, (C[1] + Z[1]) / 2 - 12, "height", 14);
  box(sb, 485, 100, 215, 100, ["Area = AD × CZ", "also = DC × (its height)"], { fill: LGREEN, stroke: GREEN, size: 15, bold: [true, false] });
  return sb.build();
}

// ── 32. four parallelograms of the textbook ──
function pgramFour(): Scene {
  const sb = new SceneBuilder(720, 420, "Find the areas of these parallelograms");
  const u = 30;
  const one = (x: number, yBase: number, b: number, h: number, slant: number, fill: string, hl: string, bl: string, name: string) => {
    const D: P = [x, yBase], C: P = [x + b * u, yBase], A: P = [x + slant * u, yBase - h * u], B: P = [x + (slant + b) * u, yBase - h * u];
    shape(sb, [A, B, C, D], fill);
    const X: P = [A[0], yBase];
    dash(sb, A, X); right(sb, X, A, C);
    txt(sb, b > 2 ? A[0] + 8 : B[0] + 10, yBase - (h * u) / 2 + 5, hl, 13.5, INK, "start");
    dim(sb, [x, yBase + 16], [x + b * u, yBase + 16]); txt(sb, x + (b * u) / 2, yBase + 36, bl, 13.5);
    txt(sb, x - 22, yBase + 36, name, 13.5);
  };
  one(80, 170, 7, 4, 1, FB, "4 cm", "7 cm", "(i)");
  one(430, 170, 5, 3, 1, FG, "3 cm", "5 cm", "(ii)");
  one(80, 372, 5, 4.8, 0.8, FY, "4.8 cm", "5 cm", "(iii)");
  one(430, 372, 2, 4.4, 0.8, FR, "4.4 cm", "2 cm", "(iv)");
  return sb.build();
}

// ── 33. two heights QM and QN ──
function qn(): Scene {
  const sb = new SceneBuilder(720, 320, "Parallelogram PQRS with heights QM and QN");
  // SR = 12, PS = 7.6, QM = 6
  const u = 28, h = 6 * u, off = Math.sqrt(7.6 * 7.6 - 36) * u;
  const S: P = [220, 250], R: P = [220 + 12 * u, 250], P0: P = [S[0] - off, 250 - h], Q: P = [R[0] - off, 250 - h], M: P = [Q[0], 250];
  const N = foot(Q, P0, S);
  shape(sb, [P0, Q, R, S], FB); dash(sb, Q, M); dash(sb, Q, N); right(sb, M, Q, R); right(sb, N, Q, P0);
  txt(sb, P0[0] - 10, P0[1] - 6, "P"); txt(sb, Q[0] + 6, Q[1] - 10, "Q"); txt(sb, R[0] + 12, 266, "R"); txt(sb, S[0] - 6, 270, "S"); txt(sb, M[0], 270, "M"); txt(sb, N[0] - 16, N[1] + 4, "N");
  txt(sb, M[0] + 10, 190, "6 cm", 14, INK, "start");
  txt(sb, (P0[0] + S[0]) / 2 - 56, (P0[1] + S[1]) / 2 + 34, "PS = 7.6 cm", 13.5, INK, "end");
  dim(sb, [S[0] + 14, 288], [R[0], 288]); txt(sb, (S[0] + R[0]) / 2, 310, "SR = 12 cm", 14);
  box(sb, 580, 100, 130, 100, ["12 × 6 = 72", "QN = 72 ÷ 7.6", "≈ 9.47 cm"], { fill: LYELLOW, stroke: "#ca8a04", size: 14, bold: [false, false, true] });
  return sb.build();
}

// ── 34. rectangle against parallelogram ──
function rectPgram(): Scene {
  const sb = new SceneBuilder(720, 300, "A rectangle and a parallelogram with sides 5 cm and 4 cm");
  const u = 38, x = 130, yb = 230, off = 2.4 * u, h = 3.2 * u;
  sb.rect(x, yb - 4 * u, 5 * u, 4 * u, { fill: FY });
  sb.poly([[x, yb], [x + off, yb - h], [x + off + 5 * u, yb - h], [x + 5 * u, yb]], { stroke: BLUE, sw: 3 });
  sb.poly([[x, yb - 4 * u], [x + 5 * u, yb - 4 * u], [x + 5 * u, yb], [x, yb]], { stroke: INK, sw: 2 });
  dash(sb, [x + off, yb - h], [x + off, yb], RED);
  txt(sb, x - 12, yb - 2 * u, "4 cm", 14, INK, "end");
  txt(sb, x + off + 10, yb - h / 2 + 5, "h", 17, RED, "start");
  txt(sb, x + off / 2 - 6, yb - h / 2 - 8, "4 cm", 13.5, BLUE, "end");
  dim(sb, [x, yb + 18], [x + 5 * u, yb + 18]); txt(sb, x + 2.5 * u, yb + 40, "5 cm", 14);
  box(sb, 460, 90, 240, 110, ["Same base 5 cm", "h is less than 4 cm", "Rectangle has more area"], { fill: LGREEN, stroke: GREEN, size: 15, bold: [false, false, true] });
  return sb.build();
}

// ── 35. triangle to rectangle ──
function triRect(): Scene {
  const sb = new SceneBuilder(720, 300, "A triangle cut and rearranged into a rectangle of half the height");
  const A: P = [160, 60], B: P = [60, 220], C: P = [300, 220], Mm = mid(A, B), Nn = mid(A, C), Ft: P = [A[0], Mm[1]];
  shape(sb, [Mm, Nn, C, B], FB); shape(sb, [A, Mm, Ft], FY); shape(sb, [A, Ft, Nn], FG); right(sb, Ft, A, Nn);
  txt(sb, 160, 48, "A"); txt(sb, 48, 238, "B"); txt(sb, 312, 238, "C");
  sb.arrow(320, 150, 390, 150, { stroke: GREY, sw: 2.4 });
  const x = 408, w = 240, top = Mm[1], bot = 220;
  // the trapezium below the midline, with the two small right triangles turned into the lower corners
  const L1: P = [x + (Mm[0] - B[0]), top], R1: P = [x + (Nn[0] - B[0]), top];
  shape(sb, [L1, R1, [x + w, bot], [x, bot]], FB);
  shape(sb, [[x, bot], [x, top], L1], FY);
  shape(sb, [R1, [x + w, top], [x + w, bot]], FG);
  dim(sb, [x, 242], [x + w, 242]); txt(sb, x + w / 2, 264, "base", 14);
  dim(sb, [x + w + 18, top], [x + w + 18, bot]); txt(sb, x + w + 28, (top + bot) / 2 + 5, "h ÷ 2", 13.5, INK, "start");
  note(sb, 360, 28, "Cut along the line joining the midpoints, then halve the small triangle and turn the halves down");
  note(sb, 360, 290, "Rectangle = base × half the height = area of the triangle", 13.5, INK);
  return sb.build();
}

// ── 36. isosceles triangle to rectangle ──
function isoRect(): Scene {
  const sb = new SceneBuilder(720, 290, "An isosceles triangle rearranged into a rectangle");
  const A: P = [160, 50], B: P = [80, 220], C: P = [240, 220], D: P = [160, 220];
  shape(sb, [A, B, D], FB); shape(sb, [A, D, C], FY); right(sb, D, A, C); tick(sb, A, B); tick(sb, A, C);
  txt(sb, 160, 38, "A"); txt(sb, 68, 238, "B"); txt(sb, 252, 238, "C"); txt(sb, 160, 240, "D");
  sb.arrow(280, 140, 360, 140, { stroke: GREY, sw: 2.4 });
  const x = 420;
  shape(sb, [[x, 220], [x + 80, 50], [x + 80, 220]], FB);
  shape(sb, [[x, 220], [x, 50], [x + 80, 50]], FY);
  dim(sb, [x, 240], [x + 80, 240]); txt(sb, x + 40, 262, "half of BC", 13.5);
  dim(sb, [x + 100, 50], [x + 100, 220]); txt(sb, x + 112, 140, "AD", 15, INK, "start");
  box(sb, 570, 90, 140, 90, ["Same area:", "AD × half of BC"], { fill: LGREEN, stroke: GREEN, size: 13.5, bold: [true, false] });
  return sb.build();
}

// ── 37. rhombus to rectangle ──
function rhombus(): Scene {
  const sb = new SceneBuilder(720, 320, "A rhombus changed into a rectangle");
  const A: P = [190, 60], B: P = [60, 160], C: P = [190, 260], D: P = [320, 160], O: P = [190, 160];
  shape(sb, [A, B, D], FR); shape(sb, [B, C, D], FG); seg(sb, A, C, { sw: 1.6, dash: "6 4" }); right(sb, O, A, D);
  txt(sb, 190, 48, "A"); txt(sb, 46, 166, "B"); txt(sb, 190, 282, "C"); txt(sb, 336, 166, "D"); txt(sb, 176, 180, "O", 13);
  sb.arrow(356, 160, 420, 160, { stroke: GREY, sw: 2.4 });
  const x = 470, w = 130;
  shape(sb, [[x, 60], [x + w, 60], [x + w, 160], [x, 160]], FR); shape(sb, [[x, 160], [x + w, 160], [x + w, 260], [x, 260]], FG);
  txt(sb, x - 12, 56, "X"); txt(sb, x + w + 12, 56, "Y"); txt(sb, x - 14, 276, "W"); txt(sb, x + w + 12, 276, "Z");
  dim(sb, [x + w + 24, 60], [x + w + 24, 260]); txt(sb, x + w + 36, 165, "AC", 15, INK, "start");
  dim(sb, [x, 280], [x + w, 280]); txt(sb, x + w / 2, 302, "half of BD", 14);
  return sb.build();
}

// ── 38. rectangle to rhombus ──
function rectRhombus(): Scene {
  const sb = new SceneBuilder(720, 300, "A rectangle cut into four triangles that make a rhombus");
  // rectangle 2a by 2b: the middle line and a diagonal of each half give four right triangles with legs 2a and b
  const x = 50, y = 90, w = 160, h = 120, m = y + h / 2;
  shape(sb, [[x, y], [x + w, y], [x, m]], FB); shape(sb, [[x + w, y], [x + w, m], [x, m]], FY);
  shape(sb, [[x, m], [x + w, m], [x + w, y + h]], FG); shape(sb, [[x, m], [x + w, y + h], [x, y + h]], FR);
  sb.arrow(236, 150, 336, 150, { stroke: GREY, sw: 2.4 });
  const cx = 520, cy = 150, q = h / 2;       // long leg w and short leg q
  const L: P = [cx - w, cy], Rr: P = [cx + w, cy], T: P = [cx, cy - q], Bt: P = [cx, cy + q], O: P = [cx, cy];
  shape(sb, [O, T, L], FB); shape(sb, [O, T, Rr], FY); shape(sb, [O, Bt, Rr], FG); shape(sb, [O, Bt, L], FR);
  right(sb, O, T, Rr);
  txt(sb, x + w / 2, 244, "rectangle", 14); txt(sb, cx, 244, "rhombus: the same four pieces", 14);
  note(sb, 360, 40, "Cut along the middle line, then along a diagonal of each half");
  note(sb, 360, 282, "Right angles of all four pieces meet at the centre");
  return sb.build();
}

// ── 39. trapezium proof ──
function trap(): Scene {
  const sb = new SceneBuilder(720, 330, "A trapezium split into a rectangle and two triangles");
  const W: P = [150, 70], X: P = [320, 70], Y: P = [440, 230], Z: P = [70, 230], M: P = [150, 230], N: P = [320, 230];
  shape(sb, [W, M, Z], FB); shape(sb, [W, X, N, M], FY); shape(sb, [X, Y, N], FG); right(sb, M, W, N); right(sb, N, X, Y);
  txt(sb, W[0] - 8, 60, "W"); txt(sb, X[0] + 8, 60, "X"); txt(sb, Z[0] - 14, 236, "Z"); txt(sb, Y[0] + 14, 236, "Y"); txt(sb, M[0], 250, "M"); txt(sb, N[0], 250, "N");
  txt(sb, M[0] + 14, 155, "h", 17); txt(sb, N[0] - 14, 155, "h", 17);
  dim(sb, [W[0] + 12, 46], [X[0] - 12, 46]); txt(sb, 235, 36, "a", 17);
  dim(sb, [Z[0], 270], [M[0] - 12, 270]); txt(sb, 105, 290, "x", 16);
  dim(sb, [N[0] + 12, 270], [Y[0], 270]); txt(sb, 385, 290, "y", 16);
  dim(sb, [Z[0], 304], [Y[0], 304]); txt(sb, 255, 324, "b = x + a + y", 15);
  box(sb, 490, 100, 215, 120, ["½hx + ha + ½hy", "= ½h (x + y + 2a)", "= ½h (a + b)"], { fill: LGREEN, stroke: GREEN, size: 16, bold: [false, false, true] });
  return sb.build();
}

// ── 40. slanting trapezium ──
function trapSlant(): Scene {
  const sb = new SceneBuilder(720, 300, "Two ways for a slanting trapezium");
  const draw = (x: number, second: boolean) => {
    const F: P = [x, 220], A: P = [x, 80], B: P = [x + 110, 80], D: P = [x + 50, 220], C: P = [x + 260, 220], E: P = [x + 110, 220], G: P = [x + 160, 220];
    if (!second) { shape(sb, [A, B, C, D], FB); dash(sb, B, E); right(sb, E, B, C); txt(sb, E[0], 240, "E"); }
    else { shape(sb, [A, B, G, D], FY); shape(sb, [B, C, G], FG); txt(sb, G[0], 240, "G"); }
    dash(sb, A, F); dash(sb, F, D); right(sb, F, A, D);
    txt(sb, A[0] - 4, 68, "A"); txt(sb, B[0] + 4, 68, "B"); txt(sb, C[0] + 12, 238, "C"); txt(sb, D[0], 240, "D"); txt(sb, F[0] - 10, 240, "F");
    txt(sb, x - 12, 155, "h", 17, INK, "end");
    dim(sb, [x + 12, 52], [x + 98, 52]); txt(sb, x + 55, 42, "a", 16);
  };
  draw(60, false); draw(420, true);
  txt(sb, 190, 275, "Approach 1: take away △AFD", 14); txt(sb, 550, 275, "Approach 2: BG parallel to AD", 14);
  return sb.build();
}

// ── 41. two copies of a trapezium ──
function trapTwo(): Scene {
  const sb = new SceneBuilder(720, 300, "Two copies of a trapezium make a parallelogram");
  const a = 130, b = 230;
  const D: P = [80, 210], A: P = [130, 80], B: P = [130 + a, 80], C: P = [80 + b, 210];
  const D1: P = [B[0] + b, 80], A1: P = [C[0] + a, 210];
  shape(sb, [A, B, C, D], FB); shape(sb, [B, D1, A1, C], FY);
  dash(sb, A, [A[0], 210]); right(sb, [A[0], 210], A, C);
  txt(sb, A[0] - 6, 68, "A"); txt(sb, B[0], 68, "B"); txt(sb, D1[0] + 10, 68, "D′"); txt(sb, D[0] - 12, 228, "D"); txt(sb, C[0], 230, "C"); txt(sb, A1[0] + 10, 230, "A′");
  txt(sb, A[0] + 14, 150, "h", 17);
  dim(sb, [A[0] + 12, 46], [B[0] - 12, 46]); txt(sb, (A[0] + B[0]) / 2, 36, "a", 16);
  dim(sb, [B[0] + 12, 46], [D1[0] - 4, 46]); txt(sb, (B[0] + D1[0]) / 2, 36, "b", 16);
  dim(sb, [D[0], 252], [C[0] - 12, 252]); txt(sb, (D[0] + C[0]) / 2, 274, "b", 16);
  dim(sb, [C[0] + 12, 252], [A1[0], 252]); txt(sb, (C[0] + A1[0]) / 2, 274, "a", 16);
  // the angles named in the proof: x and y at B and C, u and v at the other corners
  txt(sb, B[0] - 20, 100, "x", 14, RED); txt(sb, B[0] + 22, 100, "y", 14, RED); txt(sb, C[0] - 22, 200, "y", 14, RED); txt(sb, C[0] + 20, 200, "x", 14, RED);
  txt(sb, A[0] + 26, 100, "u", 14, RED); txt(sb, D[0] + 24, 200, "v", 14, RED); txt(sb, D1[0] - 26, 100, "v", 14, RED); txt(sb, A1[0] - 24, 200, "u", 14, RED);
  box(sb, 545, 120, 165, 80, ["base = a + b", "area = h (a + b)"], { fill: LGREEN, stroke: GREEN, size: 14.5, bold: [false, true] });
  return sb.build();
}

// ── 42. four trapeziums of the textbook ──
function trapFigs(): Scene {
  const sb = new SceneBuilder(720, 450, "Find the areas of these trapeziums");
  // (i) parallel sides 10 and 7, 16 apart (drawn upright)
  const u = 11;
  const x = 100, yb = 190;
  shape(sb, [[x, yb], [x, yb - 10 * u], [x + 16 * u, yb - 7 * u], [x + 16 * u, yb]], FB);
  txt(sb, x - 10, yb - 5 * u + 5, "10 ft", 14, INK, "end"); txt(sb, x + 16 * u + 10, yb - 3.5 * u + 5, "7 ft", 14, INK, "start");
  dim(sb, [x, yb + 14], [x + 16 * u, yb + 14]); txt(sb, x + 8 * u, yb + 34, "16 ft", 14); txt(sb, x - 40, yb + 34, "(i)", 14);
  // (ii) 24 and 36, height 14
  const v = 6, X = 430;
  const D: P = [X, yb], C: P = [X + 36 * v, yb], B: P = [X + 28 * v, yb - 14 * v], A: P = [X + 4 * v, yb - 14 * v];
  shape(sb, [A, B, C, D], FG); dash(sb, B, [B[0], yb]); right(sb, [B[0], yb], B, C);
  txt(sb, (A[0] + B[0]) / 2, A[1] - 8, "24 m", 14); txt(sb, B[0] - 8, yb - 6 * v, "14 m", 14, INK, "end");
  dim(sb, [X, yb + 14], [X + 36 * v, yb + 14]); txt(sb, X + 18 * v, yb + 34, "36 m", 14); txt(sb, X - 28, yb + 34, "(ii)", 14);
  // (iii) 14 and 6, 10 apart
  const w = 13, x3 = 140, y3 = 410;
  shape(sb, [[x3, y3], [x3, y3 - 14 * w], [x3 + 10 * w, y3 - 6 * w], [x3 + 10 * w, y3]], FY);
  txt(sb, x3 - 10, y3 - 7 * w + 5, "14 in", 14, INK, "end"); txt(sb, x3 + 10 * w + 10, y3 - 3 * w + 5, "6 in", 14, INK, "start");
  dim(sb, [x3, y3 + 12], [x3 + 10 * w, y3 + 12]); txt(sb, x3 + 5 * w, y3 + 32, "10 in", 14); txt(sb, x3 - 40, y3 + 32, "(iii)", 14);
  // (iv) 12 and 18, height 8
  const t = 12.5, x4 = 440, y4 = 410;
  const D4: P = [x4, y4], C4: P = [x4 + 18 * t, y4], B4: P = [x4 + 13 * t, y4 - 8 * t], A4: P = [x4 + 1 * t, y4 - 8 * t];
  shape(sb, [A4, B4, C4, D4], FR); const H: P = [x4 + 3 * t, y4];
  dash(sb, [H[0], y4 - 8 * t], H); right(sb, H, [H[0], y4 - 8 * t], C4);
  txt(sb, (A4[0] + B4[0]) / 2, A4[1] - 8, "12 ft", 14); txt(sb, H[0] + 8, y4 - 4 * t + 5, "8 ft", 14, INK, "start");
  dim(sb, [x4, y4 + 12], [x4 + 18 * t, y4 + 12]); txt(sb, x4 + 9 * t, y4 + 32, "18 ft", 14); txt(sb, x4 - 28, y4 + 32, "(iv)", 14);
  return sb.build();
}

// ── 43. trapezium to rectangle ──
function trapRect(): Scene {
  const sb = new SceneBuilder(720, 300, "Trapezium ABCD changed into rectangle EFGH");
  const A: P = [250, 70], B: P = [470, 70], C: P = [560, 230], D: P = [190, 230];
  const I = mid(A, D), J = mid(B, C), H: P = [I[0], 70], G: P = [I[0], 230], E: P = [J[0], 70], F: P = [J[0], 230];
  shape(sb, [A, B, J, F, G, I], FB); shape(sb, [I, D, G], FY); shape(sb, [J, C, F], FY);
  dash(sb, H, A); dash(sb, B, E); dash(sb, H, I); dash(sb, E, J); shape(sb, [I, A, H], FG); shape(sb, [J, E, B], FG);
  right(sb, G, I, C); right(sb, F, J, D);
  tick(sb, A, I); tick(sb, I, D); tick(sb, B, J, 2); tick(sb, J, C, 2);
  txt(sb, A[0] + 4, 58, "A"); txt(sb, B[0] - 4, 58, "B"); txt(sb, C[0] + 12, 248, "C"); txt(sb, D[0] - 12, 248, "D");
  txt(sb, H[0] - 10, 62, "H"); txt(sb, E[0] + 10, 62, "E"); txt(sb, G[0], 250, "G"); txt(sb, F[0], 250, "F"); txt(sb, I[0] - 18, I[1] + 2, "I"); txt(sb, J[0] + 18, J[1] + 2, "J");
  note(sb, 360, 28, "The green triangles are filled by the yellow pieces cut off below");
  note(sb, 360, 284, "△AHI ≅ △DGI and △BEJ ≅ △CFJ, so EFGH has the same area as ABCD", 13.5, INK);
  return sb.build();
}

// ── 44. hexagon in three parts ──
function hexagon(): Scene {
  const sb = new SceneBuilder(720, 320, "A regular hexagon as a trapezium, a triangle and a rhombus");
  const cx = 240, cy = 160, r = 120;
  const v: P[] = [0, 1, 2, 3, 4, 5].map((i) => [cx + r * Math.cos((i * Math.PI) / 3), cy + r * Math.sin((i * Math.PI) / 3)] as P);
  const O: P = [cx, cy];
  // v[0] right, v[1] lower right, v[2] lower left, v[3] left, v[4] upper left, v[5] upper right
  shape(sb, [v[3], v[4], v[5], v[0]], FB); shape(sb, [v[3], O, v[2]], FY); shape(sb, [O, v[0], v[1], v[2]], FG);
  [v[4], v[5]].forEach((p) => dash(sb, O, p, GREY)); dash(sb, O, v[1], GREY);
  txt(sb, cx, cy - 62, "T", 18); txt(sb, cx - 56, cy + 48, "E", 18); txt(sb, cx + 10, cy + 76, "R", 18);
  box(sb, 440, 90, 250, 140, ["6 equal small triangles", "T has 3", "E has 1", "R has 2", "T : E : R = 3 : 1 : 2"], { fill: LORANGE, stroke: ORANGE, size: 15, bold: [false, false, false, false, true] });
  return sb.build();
}

// ── 45. trapezium and triangle of equal area ──
function trapZwb(): Scene {
  const sb = new SceneBuilder(720, 290, "Trapezium ZYXW and triangle ZWB have equal areas");
  const Z: P = [180, 60], Y: P = [320, 60], X: P = [420, 220], W: P = [100, 220];
  const A = mid(Y, X), Bb: P = [2 * A[0] - Z[0], 220];
  shape(sb, [Z, A, X, W], FB); shape(sb, [Z, Y, A], FY); shape(sb, [A, Bb, X], FY);
  tick(sb, Y, A); tick(sb, A, X);
  txt(sb, Z[0] - 8, 48, "Z"); txt(sb, Y[0] + 8, 48, "Y"); txt(sb, A[0] + 16, A[1] - 8, "A"); txt(sb, W[0] - 14, 238, "W"); txt(sb, X[0], 242, "X"); txt(sb, Bb[0] + 14, 238, "B");
  note(sb, 360, 272, "△AYZ ≅ △AXB: move the yellow triangle on the top down to the right", 13.5, INK);
  return sb.build();
}

// ── 46. square inch ──
function inch(): Scene {
  const sb = new SceneBuilder(720, 270, "One square inch is 6.4516 square centimetres");
  sb.rect(150, 70, 130, 130, { fill: LBLUE, stroke: BLUE, sw: 2.4 });
  sb.rect(440, 70, 130, 130, { fill: LBLUE, stroke: BLUE, sw: 2.4 });
  txt(sb, 215, 141, "1 in²", 18); txt(sb, 505, 141, "6.4516 cm²", 16); txt(sb, 360, 145, "=", 28);
  dim(sb, [150, 52], [280, 52]); txt(sb, 215, 42, "1 in", 15); dim(sb, [440, 52], [570, 52]); txt(sb, 505, 42, "2.54 cm", 15);
  note(sb, 360, 240, "Area uses the conversion number twice: 2.54 × 2.54", 14, INK);
  return sb.build();
}

// ── 47. kite ──
function kite(): Scene {
  const sb = new SceneBuilder(720, 340, "A kite: half the product of the diagonals");
  const T: P = [230, 40], Lp: P = [140, 120], Rp: P = [320, 120], Bt: P = [230, 290], O: P = [230, 120];
  shape(sb, [T, Rp, Bt, Lp], FG); dash(sb, T, Bt); dash(sb, Lp, Rp); right(sb, O, Rp, Bt);
  txt(sb, 224, 215, "d_{1}", 17, INK, "end"); txt(sb, 185, 108, "d_{2}", 17);
  box(sb, 420, 100, 260, 110, ["Diagonals at right angles", "Area = ½ × d₁ × d₂"], { fill: LGREEN, stroke: GREEN, size: 16, bold: [false, true] });
  note(sb, 230, 322, "Also true for a rhombus and a square");
  return sb.build();
}

// ── 48. paths outside and inside ──
function pathInOut(): Scene {
  const sb = new SceneBuilder(720, 320, "A path outside a park and a path inside a field");
  shape(sb, [[60, 60], [320, 60], [320, 230], [60, 230]], PATH); shape(sb, [[90, 90], [290, 90], [290, 200], [90, 200]], PARK);
  txt(sb, 190, 150, "park l × b", 16);
  dim(sb, [60, 145], [90, 145], INK); txt(sb, 75, 134, "w", 14);
  txt(sb, 190, 262, "(a) Path outside", 14.5); txt(sb, 190, 288, "(l + 2w)(b + 2w) − lb", 14, BLUE);
  shape(sb, [[420, 60], [660, 60], [660, 230], [420, 230]], PATH); shape(sb, [[450, 90], [630, 90], [630, 200], [450, 200]], PARK);
  txt(sb, 540, 142, "field l × b", 15); txt(sb, 540, 166, "(outer edge)", 13);
  dim(sb, [630, 145], [660, 145], INK); txt(sb, 646, 134, "w", 14);
  txt(sb, 540, 262, "(b) Path inside", 14.5); txt(sb, 540, 288, "lb − (l − 2w)(b − 2w)", 14, BLUE);
  return sb.build();
}

// ── 49. medians ──
function centroid(): Scene {
  const sb = new SceneBuilder(720, 320, "The three medians make 6 equal areas");
  const A: P = [220, 40], B: P = [80, 260], C: P = [420, 260];
  const D = mid(B, C), E = mid(C, A), F = mid(A, B), G: P = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  const fills = [FB, FY, FG, FR, FP, FO];
  [[A, F, G], [F, B, G], [B, D, G], [D, C, G], [C, E, G], [E, A, G]].forEach((t, i) => shape(sb, t as P[], fills[i], INK, 1.8));
  sb.circle(G[0], G[1], 5, { fill: INK });
  txt(sb, 220, 28, "A"); txt(sb, 66, 278, "B"); txt(sb, 434, 278, "C"); txt(sb, D[0], 282, "D"); txt(sb, E[0] + 16, E[1] - 2, "E"); txt(sb, F[0] - 16, F[1] - 2, "F");
  box(sb, 480, 100, 220, 110, ["Medians meet at the", "centroid G", "6 equal areas"], { fill: LGREEN, stroke: GREEN, size: 15.5, bold: [false, false, true] });
  return sb.build();
}

// ── 50. Pick's theorem ──
function pick(): Scene {
  const sb = new SceneBuilder(720, 330, "Counting dots to find an area");
  const c = 50, X = 80, Y = 50;
  const at = (i: number, j: number): P => [X + i * c, Y + j * c];
  // a rectangle 4 by 3 inside a 6 by 5 field of dots
  shape(sb, [at(1, 1), at(5, 1), at(5, 4), at(1, 4)], FY);
  for (let i = 0; i <= 6; i++) for (let j = 0; j <= 5; j++) {
    const inside = i > 1 && i < 5 && j > 1 && j < 4, edge = !inside && i >= 1 && i <= 5 && j >= 1 && j <= 4;
    sb.circle(at(i, j)[0], at(i, j)[1], inside || edge ? 6 : 3, { fill: inside ? RED : edge ? BLUE : "#94a3b8" });
  }
  box(sb, 440, 60, 260, 50, ["Inside dots (red): i = 6"], { fill: "#fee2e2", stroke: RED, size: 15 });
  box(sb, 440, 126, 260, 50, ["Boundary dots (blue): b = 14"], { fill: LBLUE, stroke: BLUE, size: 15 });
  box(sb, 440, 192, 260, 78, ["Area = i + b ÷ 2 − 1", "= 6 + 7 − 1 = 12"], { fill: LGREEN, stroke: GREEN, size: 16, bold: [true, true] });
  return sb.build();
}

// ── 51. mind map ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "Area: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Rectangle, square", col: "#b45309", tint: "#fef3c7", leaves: ["length × width", "side × side", "Perimeter is not area"] },
    { n: "2", t: "Paths and tubes", col: "#2563eb", tint: "#dbeafe", leaves: ["Outer − inner", "Cross: count middle once", "Straighten a bent tube"] },
    { n: "3", t: "Triangle", col: "#0f766e", tint: "#ccfbf1", leaves: ["½ × base × height", "Height is perpendicular", "Half of a rectangle"] },
    { n: "4", t: "Equal areas", col: "#15803d", tint: "#dcfce7", leaves: ["A median halves it", "Same base, same parallels", "Mirror: least perimeter"] },
    { n: "5", t: "Polygon", col: "#c2410c", tint: "#ffedd5", leaves: ["Split into triangles", "½ × d × (h_{1} + h_{2})", "Hexagon: 6 triangles"] },
    { n: "6", t: "Parallelogram", col: "#7c3aed", tint: "#ede9fe", leaves: ["base × height", "Cut and move a triangle", "Any side can be the base"] },
    { n: "7", t: "Rhombus", col: "#b91c1c", tint: "#fee2e2", leaves: ["½ × d_{1} × d_{2}", "Diagonals at right angles", "Also base × height"] },
    { n: "8", t: "Trapezium, units", col: "#a21caf", tint: "#fae8ff", leaves: ["½ × h × (a + b)", "1 in^{2} = 6.4516 cm^{2}", "1 acre = 43,560 ft^{2}"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 12, "AREA", { size: 30, fill: "#ffffff" }); sb.text(cx, cy + 24, "square units", { size: 15, fill: "#fbbf24" });
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
    ["Which height?", "the perpendicular to the chosen base", "a slant side is not the height", "#0f766e"],
    ["Same units first", "change all lengths to one unit", "the answer is in square units", "#c2410c"],
    ["Changing size", "all lengths doubled", "area becomes 4 times", "#7c3aed"],
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

export const AREA_DIAGRAMS_2: Record<string, () => Scene> = {
  area_polygon: polygon,
  area_quad: quad,
  area_shaded: shaded,
  area_blue: blue,
  area_midquad: midQuad,
  area_pgram: pgram,
  area_pgram_side: pgramSide,
  area_pgram_four: pgramFour,
  area_qn: qn,
  area_rect_pgram: rectPgram,
  area_tri_rect: triRect,
  area_iso_rect: isoRect,
  area_rhombus: rhombus,
  area_rect_rhombus: rectRhombus,
  area_trap: trap,
  area_trap_slant: trapSlant,
  area_trap_two: trapTwo,
  area_trap_figs: trapFigs,
  area_trap_rect: trapRect,
  area_hexagon: hexagon,
  area_trap_zwb: trapZwb,
  area_inch: inch,
  area_kite: kite,
  area_path_in_out: pathInOut,
  area_centroid: centroid,
  area_pick: pick,
  area_mindmap: mindMap,
};
