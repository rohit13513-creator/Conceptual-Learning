import { SceneBuilder, C } from "../components/sceneKit";
import type { Scene, Pt } from "../components/sceneKit";

// Diagrams for Class X Physics, "Magnetic Effects of Electric Current" (NCERT Chapter 12). Every picture is a Scene (see components/sceneKit.ts),
// so scripts/check-mag-diagrams.mts can check that no text touches a line, a shape or another text.
// Texts: B_{H} is a subscript, 10^{-7} a superscript.

const RED = "#dc2626", LRED = "#fee2e2", BLUE = "#2563eb", LBLUE = "#dbeafe", GREEN = "#15803d", LGREEN = "#dcfce7", ORANGE = "#ea580c", LORANGE = "#ffedd5";
const PURPLE = "#7c3aed", LPURPLE = "#ede9fe", GREY = "#64748b", LGREY = "#f1f5f9", TEAL = "#0f766e", INK = C.ink;

// ── small drawing helpers ──
function head(sb: SceneBuilder, x: number, y: number, dx: number, dy: number, col: string, s = 8) {
  const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  sb.poly([[x, y], [x - ux * s * 1.6 - uy * s * 0.7, y - uy * s * 1.6 + ux * s * 0.7], [x - ux * s * 1.6 + uy * s * 0.7, y - uy * s * 1.6 - ux * s * 0.7]], { fill: col, close: true, decor: true });
}
function cubicPts(p0: Pt, p1: Pt, p2: Pt, p3: Pt, n = 28): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i <= n; i++) { const t = i / n, m = 1 - t; out.push([m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0], m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1]]); }
  return out;
}
/** a smooth curve through four control points, with an arrow head at fraction `at` of the way (default the middle) */
function curve4(sb: SceneBuilder, p0: Pt, p1: Pt, p2: Pt, p3: Pt, o: { stroke?: string; sw?: number; arrow?: boolean; at?: number; rev?: boolean } = {}) {
  const pts = cubicPts(p0, p1, p2, p3);
  const d = "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
  sb.blob(d, pts, { stroke: o.stroke ?? INK, sw: o.sw ?? 1.6 });
  if (o.arrow !== false) {
    const k = Math.max(1, Math.min(pts.length - 2, Math.round((o.at ?? 0.5) * (pts.length - 1))));
    const a = pts[k - 1], b = pts[k + 1], m = pts[k];
    const dx = (b[0] - a[0]) * (o.rev ? -1 : 1), dy = (b[1] - a[1]) * (o.rev ? -1 : 1);
    head(sb, m[0] + (dx / Math.hypot(dx, dy)) * 5, m[1] + (dy / Math.hypot(dx, dy)) * 5, dx, dy, o.stroke ?? INK, 6.5);
  }
}
function circlePts(cx: number, cy: number, r: number, n = 48): Pt[] { const o: Pt[] = []; for (let i = 0; i <= n; i++) { const a = (i / n) * Math.PI * 2; o.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return o; }
/** a circle with an arrow head: ccw true = anticlockwise as seen on the screen */
function ring(sb: SceneBuilder, cx: number, cy: number, r: number, ccw: boolean, col = BLUE, sw = 1.6) {
  sb.circle(cx, cy, r, { stroke: col, sw });
  const a = ccw ? -Math.PI / 4 : -Math.PI / 4; // arrow near the upper right
  const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
  // tangent direction on screen: clockwise (y down) is (-sin, cos) in screen coordinates
  const tx = ccw ? Math.sin(a) : -Math.sin(a), ty = ccw ? -Math.cos(a) : Math.cos(a);
  head(sb, x + tx * 3, y + ty * 3, tx, ty, col, 6.5);
}
const mark = (sb: SceneBuilder, x: number, y: number, kind: "out" | "in", r = 8) => {
  sb.circle(x, y, r, { fill: "#ffffff", stroke: INK, sw: 1.6 });
  if (kind === "out") sb.circle(x, y, r * 0.32, { fill: INK });
  else { const k = r * 0.62; sb.line(x - k, y - k, x + k, y + k, { sw: 1.6 }); sb.line(x - k, y + k, x + k, y - k, { sw: 1.6 }); }
};
function bar(sb: SceneBuilder, x: number, y: number, w: number, h: number, flip = false) {
  const half = w / 2;
  sb.rect(x, y, half, h, { fill: flip ? LBLUE : LRED, stroke: INK, sw: 1.8 });
  sb.rect(x + half, y, half, h, { fill: flip ? LRED : LBLUE, stroke: INK, sw: 1.8 });
  sb.text(x + half / 2, y + h / 2 + 5, flip ? "S" : "N", { size: 15, fill: flip ? BLUE : RED });
  sb.text(x + half + half / 2, y + h / 2 + 5, flip ? "N" : "S", { size: 15, fill: flip ? RED : BLUE });
}
function compass(sb: SceneBuilder, cx: number, cy: number, r: number, deg: number) {
  // deg: angle of the north end measured clockwise from "up"
  sb.circle(cx, cy, r, { fill: "#ffffff", stroke: INK, sw: 1.8 });
  const a = (deg * Math.PI) / 180, ux = Math.sin(a), uy = -Math.cos(a);
  const nx = cx + ux * (r - 4), ny = cy + uy * (r - 4), sx = cx - ux * (r - 4), sy = cy - uy * (r - 4);
  sb.poly([[nx, ny], [cx - uy * 4, cy + ux * 4], [cx + uy * 4, cy - ux * 4]], { fill: RED, stroke: RED, sw: 1 });
  sb.poly([[sx, sy], [cx - uy * 4, cy + ux * 4], [cx + uy * 4, cy - ux * 4]], { fill: "#cbd5e1", stroke: GREY, sw: 1 });
}
function box(sb: SceneBuilder, x: number, y: number, w: number, h: number, lines: string[], o: { fill?: string; stroke?: string; size?: number; bold?: boolean[] } = {}) {
  sb.rect(x, y, w, h, { rx: 8, fill: o.fill ?? "#ffffff", stroke: o.stroke ?? INK, sw: 1.8 });
  const size = o.size ?? 13, lh = size + 4;
  const y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  lines.forEach((t, i) => sb.text(x + w / 2, y0 + i * lh, t, { size, bold: o.bold ? o.bold[i] : i === 0 }));
}
const wirecell = (sb: SceneBuilder, x: number, y: number) => { sb.line(x, y - 13, x, y + 13, { sw: 1.8 }); sb.line(x + 8, y - 7, x + 8, y + 7, { sw: 4.6 }); };

// ── 1. Oersted's observation ──
function oersted(): Scene {
  const sb = new SceneBuilder(640, 280, "Oersted's observation: a compass needle is deflected when a current flows in a wire near it");
  const panel = (x0: number, on: boolean) => {
    sb.rect(x0, 30, 280, 190, { rx: 10, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.4 });
    sb.line(x0 + 30, 78, x0 + 250, 78, { stroke: on ? ORANGE : INK, sw: on ? 4 : 3 });
    if (on) { sb.arrow(x0 + 70, 64, x0 + 130, 64, { stroke: RED, sw: 2 }); sb.text(x0 + 100, 52, "current", { size: 12, fill: RED }); }
    compass(sb, x0 + 140, 150, 38, on ? 42 : 0);
    sb.text(x0 + 140, 205, on ? "Key closed: needle deflected" : "Key open: needle points north", { size: 12.5 });
    sb.text(x0 + 140, 48, "wire", { size: 12, fill: GREY, bold: false, anchor: "middle" });
  };
  panel(20, false); panel(340, true);
  sb.text(320, 262, "The current has a magnetic effect: electricity and magnetism are linked", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 2. field lines of a bar magnet ──
function barField(): Scene {
  const sb = new SceneBuilder(640, 372, "Magnetic field lines around a bar magnet");
  const cx = 320, cy = 180, a = 70; // the magnet spans cx-a .. cx+a
  [[28, 60], [50, 100], [80, 140], [120, 180]].forEach(([s, h], i) => {
    const wd = 40 + i * 28;
    curve4(sb, [cx + a, cy - 12 + 12 - 0], [cx + a + wd, cy - h * 1.15], [cx - a - wd, cy - h * 1.15], [cx - a, cy], { stroke: BLUE, sw: 1.6 });
    curve4(sb, [cx + a, cy], [cx + a + wd, cy + h * 1.15], [cx - a - wd, cy + h * 1.15], [cx - a, cy], { stroke: BLUE, sw: 1.6 });
    void s;
  });
  sb.line(cx + a, cy, cx + a + 120, cy, { stroke: BLUE, sw: 1.6 });
  sb.line(cx - a - 120, cy, cx - a, cy, { stroke: BLUE, sw: 1.6 });
  head(sb, cx + a + 108, cy, 1, 0, BLUE, 6.5);
  head(sb, cx - a - 10, cy, 1, 0, BLUE, 6.5);
  bar(sb, cx - a, cy - 18, a * 2, 36, true);
  sb.text(cx, 352, "Outside the magnet the lines go from N to S; they are crowded near the poles", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 3. a uniform field ──
function uniform(): Scene {
  const sb = new SceneBuilder(440, 230, "A uniform magnetic field: parallel, equally spaced lines in one direction");
  [50, 90, 130, 170].forEach((y) => { sb.arrow(40, y, 400, y, { stroke: BLUE, sw: 1.8 }); });
  sb.text(220, 28, "same strength and same direction everywhere", { size: 12.5, fill: GREY, bold: false });
  sb.text(220, 214, "B", { size: 15, fill: BLUE });
  return sb.build();
}

// ── 4. a compass under a straight wire ──
function compassWire(): Scene {
  const sb = new SceneBuilder(660, 300, "A compass under a straight wire: the needle moves the other way when the current is reversed");
  const panel = (x0: number, down: boolean, deg: number, title: string) => {
    sb.rect(x0, 20, 300, 230, { rx: 10, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.4 });
    compass(sb, x0 + 150, 140, 46, deg);
    sb.line(x0 + 150, 40, x0 + 150, 240, { stroke: ORANGE, sw: 4 });
    if (down) sb.arrow(x0 + 186, 70, x0 + 186, 130, { stroke: RED, sw: 2.2 }); else sb.arrow(x0 + 186, 130, x0 + 186, 70, { stroke: RED, sw: 2.2 });
    sb.text(x0 + 215, 106, "I", { size: 14, fill: RED });
    sb.text(x0 + 150, 32, "N", { size: 13, fill: GREY }); sb.text(x0 + 150, 262, "S", { size: 13, fill: GREY });
    sb.text(x0 + 22, 145, "W", { size: 13, fill: GREY }); sb.text(x0 + 278, 145, "E", { size: 13, fill: GREY });
    sb.text(x0 + 150, 290, title, { size: 12.5 });
  };
  panel(20, true, 55, "(a) Current from N to S: needle turns east");
  panel(340, false, -55, "(b) Current from S to N: needle turns west");
  return sb.build();
}

// ── 5. concentric circles around a straight wire ──
function wireField(): Scene {
  const sb = new SceneBuilder(640, 340, "Magnetic field lines around a straight wire: concentric circles");
  const cx = 200, cy = 170;
  [26, 50, 78, 110, 146].forEach((r, i) => ring(sb, cx, cy, r, true, i % 2 ? BLUE : "#3b82f6", 1.6));
  mark(sb, cx, cy, "out", 10);
  sb.text(380, 82, "The wire is at the centre.", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.text(380, 108, "Current out of the page:", { size: 12.5, anchor: "start" });
  sb.text(380, 128, "the field lines go", { size: 12.5, anchor: "start" });
  sb.text(380, 148, "anticlockwise", { size: 12.5, anchor: "start", fill: BLUE });
  sb.text(380, 200, "The circles get larger", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.text(380, 216, "and the field weaker", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.text(380, 232, "farther from the wire", { size: 12, anchor: "start", fill: GREY, bold: false });
  return sb.build();
}

// ── 6. the right-hand thumb rule ──
function thumbRule(): Scene {
  const sb = new SceneBuilder(700, 340, "The right-hand thumb rule");
  sb.line(180, 40, 180, 290, { stroke: ORANGE, sw: 5 });
  sb.arrow(198, 130, 198, 46, { stroke: RED, sw: 2.6 });
  sb.text(212, 64, "current I", { size: 13, fill: RED, anchor: "start" });
  [[205, 70, 20], [150, 52, 16]].forEach(([y, rx, ry]) => {
    const pts: Pt[] = [];
    for (let i = 0; i <= 36; i++) { const a = (i / 36) * Math.PI * 2; pts.push([180 + rx * Math.cos(a), y + ry * Math.sin(a)]); }
    sb.poly(pts, { close: true, stroke: BLUE, sw: 1.8 });
  });
  head(sb, 250, 205, 0, -1, BLUE, 7); head(sb, 110, 205, 0, 1, BLUE, 7);
  head(sb, 232, 150, 0, -1, BLUE, 7); head(sb, 128, 150, 0, 1, BLUE, 7);
  sb.text(180, 322, "thumb along the current,", { size: 12.5 });
  sb.text(180, 338, "fingers curl along the field", { size: 12.5 });
  sb.rect(380, 20, 300, 300, { rx: 10, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.4 });
  mark(sb, 500, 90, "out", 10); ring(sb, 500, 90, 36, true, BLUE);
  sb.text(530 + 90, 94, "dot = out", { size: 12, bold: false, fill: GREY, anchor: "middle" });
  sb.text(530, 152, "Current out of the page:", { size: 12.5 }); sb.text(530, 170, "field anticlockwise", { size: 12.5, fill: BLUE });
  mark(sb, 500, 235, "in", 10); ring(sb, 500, 235, 36, false, BLUE);
  sb.text(530 + 90, 239, "cross = in", { size: 12, bold: false, fill: GREY, anchor: "middle" });
  sb.text(530, 292, "Current into the page:", { size: 12.5 }); sb.text(530, 308, "field clockwise", { size: 12.5, fill: BLUE });
  return sb.build();
}

// ── 7. field of a circular loop ──
function loopField(): Scene {
  const sb = new SceneBuilder(600, 392, "Magnetic field lines of a current-carrying circular loop (cross-section)");
  const cx = 300, cy = 170, d = 62;
  mark(sb, cx, cy - d, "in", 10); mark(sb, cx, cy + d, "out", 10);
  [22, 40].forEach((r) => { ring(sb, cx, cy - d, r, false, BLUE, 1.3); ring(sb, cx, cy + d, r, true, BLUE, 1.3); });
  [cy - 24, cy, cy + 24].forEach((y) => { sb.arrow(cx + 44, y, cx - 44, y, { stroke: BLUE, sw: 1.8 }); });
  [[110, 150], [165, 205]].forEach(([wx, hy]) => {
    curve4(sb, [cx - 46, cy - 36], [cx - wx - 40, cy - hy], [cx + wx + 40, cy - hy], [cx + 46, cy - 36], { stroke: BLUE, sw: 1.4 });
    curve4(sb, [cx - 46, cy + 36], [cx - wx - 40, cy + hy], [cx + wx + 40, cy + hy], [cx + 46, cy + 36], { stroke: BLUE, sw: 1.4 });
  });
  sb.text(cx + 112, 176, "strong field", { size: 12.5, anchor: "start", fill: GREY, bold: false });
  sb.text(cx + 112, 192, "at the centre", { size: 12.5, anchor: "start", fill: GREY, bold: false });
  sb.text(cx, 382, "Every part of the loop gives a field in the same direction inside it", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 8. a solenoid ──
function solenoid(): Scene {
  const sb = new SceneBuilder(660, 370, "Magnetic field lines through and around a current-carrying solenoid");
  const x0 = 200, x1 = 440, cy = 180, ry = 44, n = 9;
  for (let i = 0; i < n; i++) { const x = x0 + (i / (n - 1)) * (x1 - x0); const pts: Pt[] = []; for (let k = 0; k <= 24; k++) { const a = (k / 24) * Math.PI * 2; pts.push([x + 7 * Math.cos(a), cy + ry * Math.sin(a)]); } sb.poly(pts, { close: true, stroke: GREEN, sw: 2 }); }
  [cy - 22, cy, cy + 22].forEach((y) => sb.arrow(x0 + 20, y, x1 - 10, y, { stroke: BLUE, sw: 1.8 }));
  [[70, 100], [120, 150]].forEach(([wd, h]) => {
    curve4(sb, [x1 + 14, cy - ry + 8], [x1 + wd + 40, cy - h - 30], [x0 - wd - 40, cy - h - 30], [x0 - 14, cy - ry + 8], { stroke: BLUE, sw: 1.5 });
    curve4(sb, [x1 + 14, cy + ry - 8], [x1 + wd + 40, cy + h + 30], [x0 - wd - 40, cy + h + 30], [x0 - 14, cy + ry - 8], { stroke: BLUE, sw: 1.5 });
  });
  sb.text(x1 + 36, cy + 5, "N", { size: 17, fill: RED, anchor: "start" });
  sb.text(x0 - 36, cy + 5, "S", { size: 17, fill: BLUE, anchor: "end" });
  sb.text(320, 22, "Inside: parallel straight lines, the field is uniform", { size: 12.5, fill: GREEN });
  sb.line(x0, cy + ry, x0, 316, { sw: 1.8 }); sb.line(x1, cy + ry, x1, 316, { sw: 1.8 });
  sb.line(x0, 316, 290, 316, { sw: 1.8 }); sb.line(350, 316, x1, 316, { sw: 1.8 });
  wirecell(sb, 310, 316); wirecell(sb, 336, 316);
  sb.text(323, 352, "Battery", { size: 12.5 });
  return sb.build();
}

// ── 9. an electromagnet ──
function electromagnet(): Scene {
  const sb = new SceneBuilder(620, 300, "An electromagnet: a soft iron core inside a coil of insulated copper wire");
  sb.rect(180, 100, 230, 46, { fill: "#cbd5e1", stroke: GREY, sw: 2 });
  for (let i = 0; i < 9; i++) { const x = 196 + i * 24; sb.line(x, 88, x + 10, 158, { stroke: "#b45309", sw: 3 }); }
  sb.text(295, 80, "Coil of insulated copper wire", { size: 12.5 });
  sb.text(295, 186, "Soft iron core", { size: 12.5, fill: GREY });
  sb.line(180, 123, 130, 123, { sw: 1.8 }); sb.line(410, 123, 460, 123, { sw: 1.8 });
  sb.line(130, 123, 130, 240, { sw: 1.8 }); sb.line(460, 123, 460, 240, { sw: 1.8 });
  sb.line(130, 240, 270, 240, { sw: 1.8 }); sb.line(330, 240, 460, 240, { sw: 1.8 });
  wirecell(sb, 290, 240); wirecell(sb, 316, 240);
  sb.text(303, 272, "Battery and key", { size: 12.5 });
  [[430, 118], [446, 130], [432, 140]].forEach(([x, y]) => { sb.rect(x + 18, y - 4, 16, 6, { rx: 3, fill: "#e2e8f0", stroke: GREY, sw: 1.2 }); });
  sb.text(540, 100, "pins and", { size: 12, bold: false, fill: GREY, anchor: "middle" }); sb.text(540, 116, "clips pulled", { size: 12, bold: false, fill: GREY, anchor: "middle" });
  sb.text(540, 132, "to the end", { size: 12, bold: false, fill: GREY, anchor: "middle" });
  return sb.build();
}

// ── 10. a current-carrying rod in a magnetic field (Activity 7) ──
function rodField(): Scene {
  const sb = new SceneBuilder(680, 330, "A current-carrying rod in a magnetic field is pushed sideways (end view)");
  sb.rect(160, 40, 320, 52, { fill: LBLUE, stroke: INK, sw: 1.8 }); sb.text(320, 72, "S pole", { size: 14, fill: BLUE });
  sb.rect(160, 238, 320, 52, { fill: LRED, stroke: INK, sw: 1.8 }); sb.text(320, 270, "N pole", { size: 14, fill: RED });
  [190, 440].forEach((x) => sb.arrow(x, 228, x, 104, { stroke: BLUE, sw: 1.8 }));
  sb.text(500, 170, "field B", { size: 13, fill: BLUE, anchor: "middle" });
  mark(sb, 320, 165, "out", 13);
  sb.text(338, 150, "rod AB", { size: 12.5, anchor: "start" });
  sb.text(338, 190, "current B to A", { size: 12, anchor: "start" });
  sb.text(338, 206, "(out of the page)", { size: 11.5, anchor: "start", fill: GREY, bold: false });
  sb.arrow(520, 228, 520, 190, { stroke: BLUE, sw: 1.8 });
  sb.arrow(300, 165, 244, 165, { stroke: GREEN, sw: 3 });
  sb.text(262, 152, "force", { size: 13, fill: GREEN, anchor: "middle" });
  sb.text(320, 318, "Reverse the current or the field: the force is reversed", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 11. Fleming's left-hand rule ──
function fleming(): Scene {
  const sb = new SceneBuilder(680, 360, "Fleming's left-hand rule: the three directions are at right angles to each other");
  const ox = 280, oy = 210;
  sb.arrow(ox, oy, ox, 70, { stroke: GREEN, sw: 3.4 });
  sb.arrow(ox, oy, ox + 220, oy, { stroke: BLUE, sw: 3.4 });
  sb.arrow(ox, oy, ox - 120, oy + 90, { stroke: RED, sw: 3.4 });
  sb.circle(ox, oy, 5, { fill: INK });
  sb.text(ox - 14, 78, "Thumb: force (motion)", { size: 13.5, fill: GREEN, anchor: "end" });
  sb.text(ox + 226, oy - 12, "Forefinger: magnetic field", { size: 13.5, fill: BLUE, anchor: "end" });
  sb.text(ox - 128, oy + 114, "Middle finger: current", { size: 13.5, fill: RED, anchor: "middle" });
  sb.text(640, 120, "Fo - Field", { size: 12.5, anchor: "end" }); sb.text(640, 140, "C - Current", { size: 12.5, anchor: "end" }); sb.text(640, 160, "T - Thrust", { size: 12.5, anchor: "end" });
  sb.text(340, 346, "Use the LEFT hand for the force on a conductor, the RIGHT hand for the induced current", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 12. direct and alternating current ──
function acdc(): Scene {
  const sb = new SceneBuilder(700, 300, "Direct current is steady; alternating current keeps reversing");
  const g = (x0: number, title: string) => {
    sb.arrow(x0, 150, x0 + 270, 150, { sw: 1.8 }); sb.arrow(x0, 250, x0, 40, { sw: 1.8 });
    sb.text(x0 + 276, 168, "time", { size: 12.5, anchor: "start" }); sb.text(x0 + 8, 46, "current", { size: 12.5, anchor: "start" });
    sb.text(x0 + 135, 24, title, { size: 13.5 });
  };
  g(30, "Direct current (DC)"); g(370, "Alternating current (AC)");
  sb.line(30, 90, 285, 90, { stroke: BLUE, sw: 2.8 });
  const pts: Pt[] = []; for (let i = 0; i <= 100; i++) { const t = i / 100; pts.push([370 + t * 230, 150 - 80 * Math.sin(t * Math.PI * 4)]); }
  sb.blob("M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L "), pts, { stroke: RED, sw: 2.6 });
  sb.line(370, 238, 485, 238, { stroke: GREY, sw: 1.4 }); sb.text(428, 258, "one cycle", { size: 12, fill: GREY, bold: false });
  sb.text(500, 282, "India: 50 cycles per second (50 Hz)", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 13. a domestic circuit ──
function domestic(): Scene {
  const sb = new SceneBuilder(740, 480, "A common domestic circuit: live, neutral and earth wires");
  const L1 = 70, N1 = 106, EY = 452, TL = 430, TN = 448;
  sb.line(20, L1, 335, L1, { stroke: RED, sw: 3 }); sb.text(14, L1 - 12, "Live (red)", { size: 12, fill: RED, anchor: "start" });
  sb.line(20, N1, 335, N1, { stroke: INK, sw: 3 }); sb.text(14, N1 + 20, "Neutral (black)", { size: 12, anchor: "start" });
  sb.line(20, EY, 720, EY, { stroke: GREEN, sw: 3 }); sb.text(14, EY + 20, "Earth (green): to a metal plate deep in the earth", { size: 12, fill: GREEN, anchor: "start" });
  const fuse = (x: number, y: number, t: string) => { sb.rect(x, y - 9, 38, 18, { rx: 3, fill: "#ffffff", stroke: INK, sw: 1.8 }); sb.text(x + 19, y - 15, t, { size: 11.5 }); };
  fuse(110, L1, "Main fuse");
  sb.circle(210, 88, 26, { fill: "#ffffff", stroke: INK, sw: 1.8 }); sb.text(210, 93, "kWh", { size: 12 }); sb.text(210, 134, "Meter", { size: 11.5 });
  sb.rect(272, L1 - 4, 40, 8, { fill: "#ffffff" }); sb.circle(274, L1, 3, { fill: INK }); sb.line(274, L1, 300, L1 - 16, { sw: 1.8 }); sb.circle(310, L1, 3, { fill: INK }); sb.text(292, L1 - 26, "Main switch", { size: 11.5 });
  sb.rect(335, 50, 70, 78, { rx: 6, fill: LGREY, stroke: GREY, sw: 1.8 }); sb.text(370, 86, "Distri-", { size: 11.5 }); sb.text(370, 101, "bution", { size: 11.5 }); sb.text(370, 116, "box", { size: 11.5 });
  sb.line(405, L1, TL, L1, { stroke: RED, sw: 3 }); sb.line(TL, L1, TL, 320, { stroke: RED, sw: 3 });
  sb.line(405, N1, TN, N1, { stroke: INK, sw: 3 }); sb.line(TN, N1, TN, 410, { stroke: INK, sw: 3 });
  const circuit = (yl: number, yn: number, label: string, rating: string, items: [number, string, boolean][]) => {
    sb.line(TL, yl, 720, yl, { stroke: RED, sw: 3 }); sb.line(TN, yn, 720, yn, { stroke: INK, sw: 3 });
    fuse(TL + 36, yl, rating);
    sb.text(600, yl - 14, label, { size: 12.5, fill: TEAL });
    items.forEach(([x, name, metal]) => {
      sb.line(x, yl, x, yl + 20, { sw: 1.8 }); sb.circle(x, yl + 22, 2.6, { fill: INK }); sb.line(x, yl + 22, x + 9, yl + 32, { sw: 1.8 }); sb.circle(x, yl + 38, 2.6, { fill: INK });
      sb.line(x, yl + 38, x, yl + 48, { sw: 1.8 });
      if (metal) { sb.rect(x - 24, yl + 48, 48, 30, { rx: 4, fill: "#fef3c7", stroke: INK, sw: 1.8 }); sb.text(x, yl + 68, name, { size: 11.5 }); }
      else { sb.circle(x, yl + 63, 15, { fill: "#fef9c3", stroke: INK, sw: 1.8 }); sb.line(x - 10, yl + 53, x + 10, yl + 73, { sw: 1.4 }); sb.line(x - 10, yl + 73, x + 10, yl + 53, { sw: 1.4 }); sb.text(x, yn + 18, name, { size: 11.5 }); }
      sb.line(x, yl + 78, x, yn, { sw: 1.8 }); sb.circle(x, yn, 3, { fill: INK });
    });
  };
  circuit(170, 260, "Lighting circuit (5 A)", "5 A", [[520, "bulb", false], [650, "fan", false]]);
  circuit(320, 410, "Power circuit (15 A)", "15 A", [[560, "geyser", true]]);
  sb.line(584, 360, 690, 360, { stroke: GREEN, sw: 2.4, dash: "6 4" }); sb.line(690, 360, 690, EY, { stroke: GREEN, sw: 2.4, dash: "6 4" });
  sb.text(640, 350, "metal body", { size: 11.5, bold: false, fill: GREEN });
  return sb.build();
}

// ── 14. magnetism of atoms ──
function atoms(): Scene {
  const sb = new SceneBuilder(680, 300, "An electron is a tiny magnet because of its orbital motion and its spin");
  // orbital
  sb.text(110, 28, "Orbital motion", { size: 13.5 });
  sb.circle(110, 130, 12, { fill: LRED, stroke: RED, sw: 2 }); sb.text(110, 135, "+", { size: 13, fill: RED });
  sb.circle(110, 130, 62, { stroke: GREY, sw: 1.6, dash: "4 4" });
  sb.circle(172, 130, 7, { fill: BLUE });
  head(sb, 172, 150, 0, 1, GREY, 6.5);
  sb.text(110, 220, "an electron going round", { size: 12, bold: false }); sb.text(110, 237, "the nucleus is a tiny loop", { size: 12, bold: false }); sb.text(110, 254, "of current", { size: 12, bold: false });
  // spin
  sb.text(340, 28, "Spin", { size: 13.5 });
  sb.circle(340, 130, 34, { fill: LBLUE, stroke: BLUE, sw: 2 });
  sb.line(340, 76, 340, 90, { stroke: GREY, sw: 1.4 }); sb.line(340, 170, 340, 186, { stroke: GREY, sw: 1.4 });
  curve4(sb, [318, 114], [326, 98], [354, 98], [362, 114], { stroke: ORANGE, sw: 2 });
  sb.text(340, 140, "e", { size: 15, fill: BLUE });
  sb.text(340, 220, "an electron also spins", { size: 12, bold: false }); sb.text(340, 237, "about its own axis and", { size: 12, bold: false }); sb.text(340, 254, "acts like a tiny magnet", { size: 12, bold: false });
  // pairs
  sb.text(570, 28, "Paired electrons", { size: 13.5 });
  sb.circle(540, 130, 26, { fill: LBLUE, stroke: BLUE, sw: 2 }); sb.arrow(540, 148, 540, 108, { stroke: RED, sw: 2.4 });
  sb.circle(604, 130, 26, { fill: LBLUE, stroke: BLUE, sw: 2 }); sb.arrow(604, 112, 604, 152, { stroke: RED, sw: 2.4 });
  sb.text(572, 220, "opposite spins: the", { size: 12, bold: false }); sb.text(572, 237, "effects cancel", { size: 12, bold: false });
  return sb.build();
}

// ── 15. magnetic domains ──
function domains(): Scene {
  const sb = new SceneBuilder(680, 290, "Magnetic domains in unmagnetised and magnetised iron");
  const grid = (x0: number, dirs: [number, number][]) => {
    sb.rect(x0, 50, 270, 160, { stroke: INK, sw: 2 });
    sb.line(x0 + 90, 50, x0 + 90, 210, { stroke: "#94a3b8", sw: 1.2 }); sb.line(x0 + 180, 50, x0 + 180, 210, { stroke: "#94a3b8", sw: 1.2 }); sb.line(x0, 130, x0 + 270, 130, { stroke: "#94a3b8", sw: 1.2 });
    dirs.forEach(([dx, dy], i) => {
      const cx = x0 + 45 + (i % 3) * 90, cy = 90 + Math.floor(i / 3) * 80;
      sb.arrow(cx - dx * 28, cy - dy * 28, cx + dx * 28, cy + dy * 28, { stroke: RED, sw: 2.4 });
    });
  };
  grid(30, [[1, 0], [0, 1], [-1, 0], [0, -1], [0.7, 0.7], [-0.7, 0.7]]);
  grid(380, [[1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0]]);
  sb.text(165, 36, "Unmagnetised: the domains point every way", { size: 12.5 });
  sb.text(515, 36, "Magnetised: the domains point one way", { size: 12.5 });
  sb.text(165, 236, "their effects cancel", { size: 12, bold: false, fill: GREY }); sb.text(515, 236, "strong magnet (saturation: all aligned)", { size: 12, bold: false, fill: GREY });
  sb.text(340, 272, "A domain is a tiny region where all the atomic magnets point the same way", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 16. kinds of magnetic materials ──
function materials(): Scene {
  const sb = new SceneBuilder(780, 360, "Arrangement of atomic magnets in different kinds of materials");
  const rows: [string, string][] = [["Diamagnetic", "no atomic magnets: weakly repelled"], ["Paramagnetic", "random directions: weakly attracted"], ["Ferromagnetic", "all parallel: strongly attracted"], ["Antiferromagnetic", "equal, opposite: almost no effect"], ["Ferrimagnetic", "unequal, opposite: fairly strong"]];
  const small = (x: number, y: number, dx: number, dy: number, col = RED) => sb.arrow(x - dx * 12, y - dy * 12, x + dx * 12, y + dy * 12, { stroke: col, sw: 2 });
  rows.forEach(([name, note], r) => {
    const y = 40 + r * 62;
    sb.text(14, y + 5, name, { size: 13, anchor: "start" });
    for (let i = 0; i < 7; i++) {
      const x = 210 + i * 38;
      if (r === 0) sb.circle(x, y, 6, { fill: "#e2e8f0", stroke: GREY, sw: 1.4 });
      else if (r === 1) { const a = [0.3, 2.2, 4.1, 1.2, 5.3, 3.1, 0.8][i]; small(x, y, Math.cos(a), Math.sin(a)); }
      else if (r === 2) small(x, y, 1, 0);
      else if (r === 3) small(x, y, 0, i % 2 ? 1 : -1, i % 2 ? BLUE : RED);
      else { const l = i % 2 ? 0.55 : 1; sb.arrow(x, y + (i % 2 ? -1 : 1) * -0.1, x, y + (i % 2 ? 1 : -1) * 14 * l * 1.6, { stroke: i % 2 ? BLUE : RED, sw: 2 }); }
    }
    sb.text(500, y + 5, note, { size: 12, bold: false, anchor: "start", fill: GREY });
  });
  return sb.build();
}

// ── 17. the earth as a magnet ──
function earth(): Scene {
  const sb = new SceneBuilder(660, 380, "The earth behaves like a huge bar magnet");
  const cx = 330, cy = 200, R = 96;
  sb.circle(cx, cy, R, { fill: "#bbf7d0", stroke: GREEN, sw: 2.4 });
  // geographic axis
  sb.line(cx, cy - R - 30, cx, cy + R + 30, { stroke: GREY, sw: 1.4, dash: "5 4" });
  sb.text(cx - 8, cy - R - 36, "Geographic north", { size: 12, anchor: "end", fill: GREY, bold: false });
  // tilted magnet inside (axis tilted by about 11 degrees)
  const a = (11 * Math.PI) / 180, ux = Math.sin(a), uy = -Math.cos(a);
  const nx = cx - ux * 70, ny = cy - uy * 70, sx = cx + ux * 70, sy = cy + uy * 70;
  sb.line(nx, ny, cx, cy, { stroke: RED, sw: 14 }); sb.line(cx, cy, sx, sy, { stroke: BLUE, sw: 14 });
  sb.text(sx + 10, sy + 6, "S", { size: 14, fill: BLUE, anchor: "start" }); sb.text(nx - 10, ny + 8, "N", { size: 14, fill: RED, anchor: "end" });
  // field lines outside: from the south geographic region towards the north geographic region
  [[150, 130], [215, 170]].forEach(([w, h]) => {
    curve4(sb, [cx - 20, cy + R + 4], [cx - w - 20, cy + h], [cx - w - 20, cy - h], [cx - 8, cy - R - 4], { stroke: BLUE, sw: 1.5 });
    curve4(sb, [cx + 20, cy + R + 4], [cx + w + 20, cy + h], [cx + w + 20, cy - h], [cx + 8, cy - R - 4], { stroke: BLUE, sw: 1.5 });
  });
  sb.text(cx + 20, cy - R - 44, "", { size: 1 });
  sb.text(640, 60, "Magnetic south pole", { size: 12.5, anchor: "end", fill: BLUE }); sb.text(640, 76, "is near geographic north", { size: 12, anchor: "end", fill: GREY, bold: false });
  sb.text(80, 330, "Magnetic north pole", { size: 12.5, anchor: "start", fill: RED }); sb.text(80, 346, "is near geographic south", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.text(580, 340, "axis tilted by about 11°", { size: 12, anchor: "end", fill: GREY, bold: false });
  return sb.build();
}

// ── 18. field formulas at a glance ──
function formulas(): Scene {
  const sb = new SceneBuilder(720, 310, "The field of a straight wire, a circular coil and a solenoid");
  const card = (x: number, title: string, formula: string, note: string[]) => {
    sb.rect(x, 20, 220, 250, { rx: 12, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.6 });
    sb.text(x + 110, 46, title, { size: 13.5 });
    sb.text(x + 110, 232, formula, { size: 14, fill: BLUE });
    note.forEach((t, i) => sb.text(x + 110, 252 + i * 0, t, { size: 1 }));
  };
  card(10, "Straight wire", "B = μ_{0} I ÷ (2π r)", []);
  card(250, "Circular coil", "B = μ_{0} n I ÷ (2r)", []);
  card(490, "Solenoid", "B = μ_{0} n I", []);
  // icons
  sb.line(120, 70, 120, 190, { stroke: ORANGE, sw: 5 }); ring(sb, 120, 130, 34, true, BLUE); ring(sb, 120, 130, 56, true, BLUE);
  sb.text(120, 212, "r is the distance", { size: 11.5, bold: false, fill: GREY });
  const lp: Pt[] = []; for (let i = 0; i <= 40; i++) { const a = (i / 40) * Math.PI * 2; lp.push([360 + 58 * Math.cos(a), 130 + 58 * Math.sin(a)]); }
  sb.poly(lp, { close: true, stroke: GREEN, sw: 3 }); sb.circle(360, 130, 3, { fill: INK });
  sb.text(360, 212, "n turns, radius r", { size: 11.5, bold: false, fill: GREY });
  for (let i = 0; i < 7; i++) { const x = 546 + i * 17; const pts: Pt[] = []; for (let k = 0; k <= 20; k++) { const a = (k / 20) * Math.PI * 2; pts.push([x + 4 * Math.cos(a), 130 + 40 * Math.sin(a)]); } sb.poly(pts, { close: true, stroke: GREEN, sw: 2 }); }
  sb.text(600, 212, "n = turns per metre", { size: 11.5, bold: false, fill: GREY });
  sb.text(360, 284, "μ_{0} = 4π × 10^{-7} T m per A", { size: 12.5, fill: GREY });
  return sb.build();
}

// ── 19. force between two parallel wires ──
function parallelWires(): Scene {
  const sb = new SceneBuilder(680, 300, "Parallel wires: currents in the same direction attract, in opposite directions repel");
  const panel = (x0: number, kind: "in" | "out", title: string, att: boolean) => {
    sb.rect(x0, 20, 310, 250, { rx: 10, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.4 });
    const a = x0 + 100, b = x0 + 210, y = 130;
    mark(sb, a, y, "in", 11); mark(sb, b, y, kind, 11);
    ring(sb, a, y, 30, false, BLUE, 1.3); ring(sb, b, y, 30, kind === "out", BLUE, 1.3);
    if (att) { sb.arrow(a + 14, y + 56, x0 + 155 - 3, y + 56, { stroke: GREEN, sw: 2.6 }); sb.arrow(b - 14, y + 56, x0 + 155 + 3, y + 56, { stroke: GREEN, sw: 2.6 }); }
    else { sb.arrow(a - 14, y + 56, a - 70, y + 56, { stroke: GREEN, sw: 2.6 }); sb.arrow(b + 14, y + 56, b + 70, y + 56, { stroke: GREEN, sw: 2.6 }); }
    sb.text(x0 + 155, 36, title, { size: 13 });
    sb.text(x0 + 155, 232, att ? "the wires attract each other" : "the wires repel each other", { size: 12.5, fill: GREEN });
    sb.text(x0 + 155, 252, att ? "weak field between them, strong outside" : "strong field between them", { size: 11.5, fill: GREY, bold: false });
  };
  panel(15, "in", "Same direction (both into the page)", true);
  panel(355, "out", "Opposite directions", false);
  return sb.build();
}

// ── 20. a charged particle moving in a circle in a magnetic field ──
function chargeCircle(): Scene {
  const sb = new SceneBuilder(560, 340, "A charge entering a uniform field at right angles moves in a circle");
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = 60 + c * 70, y = 40 + r * 66; sb.line(x - 5, y - 5, x + 5, y + 5, { stroke: "#94a3b8", sw: 1.2 }); sb.line(x - 5, y + 5, x + 5, y - 5, { stroke: "#94a3b8", sw: 1.2 }); }
  const cx = 290, cy = 170, R = 90;
  sb.circle(cx, cy, R, { stroke: RED, sw: 2.4 });
  sb.circle(cx + R, cy, 9, { fill: BLUE });
  sb.text(cx + R + 18, cy + 28, "+q", { size: 13, anchor: "start", fill: BLUE });
  sb.arrow(cx + R, cy, cx + R, cy - 50, { stroke: GREEN, sw: 2.6 }); sb.text(cx + R + 8, cy - 44, "v", { size: 14, fill: GREEN, anchor: "start" });
  sb.arrow(cx + R - 12, cy, cx + 20, cy, { stroke: ORANGE, sw: 2.2 }); sb.text(cx + 52, cy - 10, "F", { size: 14, fill: ORANGE });
  sb.line(cx, cy, cx - 60, cy + 66, { stroke: GREY, sw: 1.4, dash: "5 3" }); sb.text(cx - 44, cy + 30, "r", { size: 14, anchor: "end" });
  sb.circle(cx, cy, 3, { fill: INK });
  sb.text(280, 326, "Field into the page (crosses): F = q v B points to the centre, r = m v ÷ (q B)", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 21. electromagnetic induction with a magnet and a coil ──
function emi(): Scene {
  const sb = new SceneBuilder(720, 320, "Moving a magnet into a coil induces a current, shown by the galvanometer");
  const panel = (x0: number, mx: number, deg: number, title: string, mv: string | null) => {
    sb.rect(x0, 20, 225, 280, { rx: 10, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.4 });
    for (let i = 0; i < 6; i++) { const x = x0 + 130 + i * 11; const pts: Pt[] = []; for (let k = 0; k <= 20; k++) { const a = (k / 20) * Math.PI * 2; pts.push([x + 3 * Math.cos(a), 125 + 26 * Math.sin(a)]); } sb.poly(pts, { close: true, stroke: GREEN, sw: 2 }); }
    sb.line(x0 + 130, 151, x0 + 130, 215, { sw: 1.6 }); sb.line(x0 + 190, 151, x0 + 190, 215, { sw: 1.6 });
    sb.line(x0 + 130, 215, x0 + 150, 215, { sw: 1.6 }); sb.line(x0 + 170, 215, x0 + 190, 215, { sw: 1.6 });
    sb.circle(x0 + 160, 215, 14, { fill: "#ffffff", stroke: INK, sw: 1.8 }); sb.text(x0 + 160, 220, "G", { size: 13 });
    // the needle position of G
    if (deg > 0) sb.arrow(x0 + 160, 240, x0 + 190, 240, { stroke: RED, sw: 2 }); else if (deg < 0) sb.arrow(x0 + 160, 240, x0 + 130, 240, { stroke: RED, sw: 2 });
    bar(sb, x0 + mx, 108, 70, 34, false);
    if (mv) { sb.arrow(mv === "in" ? x0 + mx - 6 : x0 + mx + 76, 96, mv === "in" ? x0 + mx + 34 : x0 + mx + 36, 96, { stroke: ORANGE, sw: 2.2 }); }
    sb.text(x0 + 112, 268, title, { size: 12.5 });
  };
  panel(10, 40, 40, "Magnet pushed in:", "in");
  sb.text(122, 286, "needle moves one way", { size: 11.5, fill: GREY, bold: false });
  panel(245, 50, 0, "Magnet held still:", null);
  sb.text(357, 286, "no deflection", { size: 11.5, fill: GREY, bold: false });
  panel(480, 40, -40, "Magnet pulled out:", "out");
  sb.text(592, 286, "needle moves the other way", { size: 11.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 22. an electric motor (end view) ──
function motor(): Scene {
  const sb = new SceneBuilder(680, 380, "A simple electric motor (end view): forces on the two arms of the coil turn it");
  const cx = 340, cy = 150;
  sb.rect(70, 70, 90, 160, { fill: LRED, stroke: INK, sw: 1.8 }); sb.text(115, 156, "N", { size: 20, fill: RED });
  sb.rect(520, 70, 90, 160, { fill: LBLUE, stroke: INK, sw: 1.8 }); sb.text(565, 156, "S", { size: 20, fill: BLUE });
  [100, 124, 176, 200].forEach((y) => sb.arrow(170, y, 510, y, { stroke: "#93c5fd", sw: 1.6 }));
  sb.line(cx - 110, cy, cx + 110, cy, { stroke: "#b45309", sw: 5 });
  mark(sb, cx - 110, cy, "in", 12); mark(sb, cx + 110, cy, "out", 12);
  sb.text(cx - 136, cy + 5, "AB", { size: 13, anchor: "end" }); sb.text(cx + 136, cy + 5, "CD", { size: 13, anchor: "start" });
  sb.arrow(cx - 110, cy + 16, cx - 110, cy + 66, { stroke: GREEN, sw: 3 }); sb.arrow(cx + 110, cy - 16, cx + 110, cy - 66, { stroke: GREEN, sw: 3 });
  sb.text(cx - 124, cy + 40, "F", { size: 14, fill: GREEN, anchor: "end" }); sb.text(cx + 124, cy - 34, "F", { size: 14, fill: GREEN, anchor: "start" });
  sb.circle(cx, cy, 5, { fill: INK }); sb.text(cx, cy - 14, "axle", { size: 11.5, bold: false, fill: GREY });
  curve4(sb, [cx - 60, cy + 40], [cx - 30, cy + 70], [cx + 30, cy + 70], [cx + 60, cy + 40], { stroke: ORANGE, sw: 2, rev: true });
  // split ring and brushes
  sb.circle(cx, 300, 26, { stroke: INK, sw: 2.2 }); sb.rect(cx - 30, 297, 60, 6, { fill: "#ffffff" });
  sb.text(cx - 8, 304, "P", { size: 12.5, anchor: "end" }); sb.text(cx + 8, 304, "Q", { size: 12.5, anchor: "start" });
  sb.rect(cx - 56, 284, 14, 32, { fill: LGREY, stroke: GREY, sw: 1.6 }); sb.rect(cx + 42, 284, 14, 32, { fill: LGREY, stroke: GREY, sw: 1.6 });
  sb.text(cx - 100, 268, "Brush X", { size: 12, anchor: "middle" }); sb.text(cx + 100, 268, "Brush Y", { size: 12, anchor: "middle" });
  sb.line(cx - 56, 300, 250, 300, { sw: 1.6 }); sb.line(cx + 56, 300, 430, 300, { sw: 1.6 });
  sb.line(250, 300, 250, 360, { sw: 1.6 }); sb.line(430, 300, 430, 360, { sw: 1.6 });
  sb.line(250, 360, 320, 360, { sw: 1.6 }); sb.line(360, 360, 430, 360, { sw: 1.6 });
  wirecell(sb, 334, 360); wirecell(sb, 346, 360);
  sb.text(340, 62, "field from N to S", { size: 12.5, fill: BLUE });
  sb.text(560, 262, "split-ring commutator reverses", { size: 11.5, fill: GREY, bold: false, anchor: "middle" });
  sb.text(560, 278, "the current every half turn", { size: 11.5, fill: GREY, bold: false, anchor: "middle" });
  return sb.build();
}

// ── 23. an AC generator (end view) ──
function generator(): Scene {
  const sb = new SceneBuilder(680, 380, "A simple AC generator (end view): rotating the coil induces a current");
  const cx = 340, cy = 150;
  sb.rect(70, 70, 90, 160, { fill: LRED, stroke: INK, sw: 1.8 }); sb.text(115, 156, "N", { size: 20, fill: RED });
  sb.rect(520, 70, 90, 160, { fill: LBLUE, stroke: INK, sw: 1.8 }); sb.text(565, 156, "S", { size: 20, fill: BLUE });
  [100, 124, 176, 200].forEach((y) => sb.arrow(170, y, 510, y, { stroke: "#93c5fd", sw: 1.6 }));
  sb.line(cx - 110, cy, cx + 110, cy, { stroke: "#b45309", sw: 5 });
  mark(sb, cx - 110, cy, "in", 12); mark(sb, cx + 110, cy, "out", 12);
  sb.text(cx - 136, cy + 5, "AB", { size: 13, anchor: "end" }); sb.text(cx + 136, cy + 5, "CD", { size: 13, anchor: "start" });
  sb.arrow(cx - 110, cy - 18, cx - 110, cy - 80, { stroke: GREEN, sw: 3 }); sb.arrow(cx + 110, cy + 18, cx + 110, cy + 80, { stroke: GREEN, sw: 3 });
  sb.text(cx - 106, cy - 96, "AB moves up", { size: 12, fill: GREEN, anchor: "middle" }); sb.text(cx + 106, cy + 104, "CD moves down", { size: 12, fill: GREEN, anchor: "middle" });
  sb.circle(cx, cy, 5, { fill: INK });
  curve4(sb, [cx - 60, cy + 40], [cx - 30, cy + 70], [cx + 30, cy + 70], [cx + 60, cy + 40], { stroke: ORANGE, sw: 2, rev: false });
  sb.text(cx - 86, cy + 116, "turned by a turbine or engine", { size: 12, fill: ORANGE });
  // slip rings
  sb.circle(cx - 24, 300, 18, { stroke: INK, sw: 2.2 }); sb.circle(cx + 24, 300, 18, { stroke: INK, sw: 2.2 });
  sb.text(cx - 24, 336, "R_{1}", { size: 12.5 }); sb.text(cx + 24, 336, "R_{2}", { size: 12.5 });
  sb.rect(cx - 68, 284, 14, 32, { fill: LGREY, stroke: GREY, sw: 1.6 }); sb.rect(cx + 54, 284, 14, 32, { fill: LGREY, stroke: GREY, sw: 1.6 });
  sb.text(cx - 92, 306, "B_{1}", { size: 12.5, anchor: "end" }); sb.text(cx + 92, 306, "B_{2}", { size: 12.5, anchor: "start" });
  sb.line(cx - 68, 300, 250, 300, { sw: 1.6 }); sb.line(cx + 68, 300, 430, 300, { sw: 1.6 });
  sb.line(250, 300, 250, 350, { sw: 1.6 }); sb.line(430, 300, 430, 350, { sw: 1.6 });
  sb.line(250, 350, 316, 350, { sw: 1.6 }); sb.line(364, 350, 430, 350, { sw: 1.6 });
  sb.circle(340, 350, 16, { fill: "#ffffff", stroke: INK, sw: 1.8 }); sb.text(340, 355, "G", { size: 13 });
  sb.text(560, 270, "slip rings turn with the coil;", { size: 11.5, fill: GREY, bold: false, anchor: "middle" });
  sb.text(560, 286, "the current changes direction", { size: 11.5, fill: GREY, bold: false, anchor: "middle" });
  sb.text(560, 302, "every half turn", { size: 11.5, fill: GREY, bold: false, anchor: "middle" });
  return sb.build();
}

// ── 24. the mind map of the whole chapter ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "Magnetic Effects of Electric Current: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Oersted's discovery", col: "#b45309", tint: "#fef3c7", leaves: ["1820: current deflects a compass needle", "Current reversed: needle turns opposite", "Moving charges give magnetism"] },
    { n: "2", t: "Magnets and field lines", col: "#2563eb", tint: "#dbeafe", leaves: ["Like poles repel, unlike attract", "Lines: N to S outside, closed curves", "Crowded lines: strong; never cross"] },
    { n: "3", t: "Straight wire", col: "#0f766e", tint: "#ccfbf1", leaves: ["Field lines: concentric circles", "B grows with I, falls with distance", "Right-hand thumb rule: direction"] },
    { n: "4", t: "Loop, coil, solenoid", col: "#15803d", tint: "#dcfce7", leaves: ["Loop: straight lines at the centre", "n turns give n times the field", "Soft iron core: an electromagnet"] },
    { n: "5", t: "Force on a conductor", col: "#c2410c", tint: "#ffedd5", leaves: ["Largest when I is at 90° to B", "Fleming's left-hand rule: F, B, I", "Motor and loudspeaker use it"] },
    { n: "6", t: "Induction, AC and DC", col: "#7c3aed", tint: "#ede9fe", leaves: ["Fleming's right-hand rule: induced I", "DC: one way; AC keeps reversing", "India: 220 V, 50 Hz"] },
    { n: "7", t: "Domestic circuits", col: "#b91c1c", tint: "#fee2e2", leaves: ["Live red, neutral black, earth green", "Appliances in parallel across 220 V", "Fuse and switch in the live wire"] },
    { n: "8", t: "Safety", col: "#a21caf", tint: "#fae8ff", leaves: ["Short circuit: current rises heavily", "Overload: fuse melts, circuit breaks", "Earth wire prevents severe shock"] },
  ];
  // the centre
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 18, "MAGNETIC", { size: 18, fill: "#ffffff" }); sb.text(cx, cy + 4, "EFFECTS OF", { size: 15, fill: "#e2e8f0" }); sb.text(cx, cy + 26, "ELECTRIC CURRENT", { size: 13, fill: "#e2e8f0" });
  const slots = [110, 300, 490, 680];
  const pw = 232, ph = 44, lw = 272, lh = 32, gap = 9, off = 300;
  brs.forEach((b, i) => {
    const right = i < 4;
    const my = right ? slots[i] : slots[7 - i];
    const mx = right ? cx + off : cx - off;
    // the branch from the centre: a thick curve, with a thin one on top
    const a = Math.atan2(my - cy, mx - cx);
    const sx = cx + Math.cos(a) * 104, sy = cy + Math.sin(a) * 104;
    const ex = right ? mx - pw / 2 : mx + pw / 2, ey = my;
    curve4(sb, [sx, sy], [sx + (ex - sx) * 0.5, sy], [sx + (ex - sx) * 0.5, ey], [ex, ey], { stroke: b.col, sw: 9, arrow: false });
    curve4(sb, [sx, sy], [sx + (ex - sx) * 0.5, sy], [sx + (ex - sx) * 0.5, ey], [ex, ey], { stroke: "#ffffff", sw: 2, arrow: false });
    sb.rect(mx - pw / 2, my - ph / 2, pw, ph, { rx: 22, fill: b.col, stroke: "#ffffff", sw: 3 });
    sb.circle(mx - pw / 2 + 24, my, 15, { fill: "#ffffff" }); sb.text(mx - pw / 2 + 24, my + 5.5, b.n, { size: 16, fill: b.col });
    sb.text(mx - pw / 2 + 46, my + 5, b.t, { size: 13, fill: "#ffffff", anchor: "start" });
    // the leaves, stacked beside the branch
    const total = b.leaves.length * lh + (b.leaves.length - 1) * gap;
    const lx = right ? mx + pw / 2 + 26 : mx - pw / 2 - 26 - lw;
    const ly0 = my - total / 2;
    b.leaves.forEach((t, k) => {
      const y = ly0 + k * (lh + gap);
      const sxm = right ? mx + pw / 2 : mx - pw / 2;
      sb.line(sxm, my, right ? lx : lx + lw, y + lh / 2, { stroke: b.col, sw: 1.8 });
      sb.rect(lx, y, lw, lh, { rx: 16, fill: b.tint, stroke: b.col, sw: 1.8 });
      sb.text(lx + lw / 2, y + lh / 2 + 4.5, t, { size: 12, fill: INK });
    });
  });
  // the three rules of the chapter
  sb.text(cx, 800, "THE THREE RULES", { size: 14, fill: GREY });
  const rules: [string, string, string, string][] = [
    ["Right-hand thumb rule", "gives the direction of the", "magnetic field round a wire", "#0f766e"],
    ["Fleming's left-hand rule", "gives the direction of the", "force on a current-carrying conductor", "#c2410c"],
    ["Fleming's right-hand rule", "gives the direction of the", "induced current", "#7c3aed"],
  ];
  rules.forEach(([a, b2, c2, col], i) => {
    const x = 90 + i * 430;
    sb.rect(x, 820, 400, 100, { rx: 16, fill: "#ffffff", stroke: col, sw: 2.6 });
    sb.rect(x, 820, 400, 34, { rx: 16, fill: col });
    sb.text(x + 200, 843, a, { size: 14.5, fill: "#ffffff" });
    sb.text(x + 200, 878, b2, { size: 12.5, fill: INK, bold: false }); sb.text(x + 200, 898, c2, { size: 12.5, fill: INK });
  });
  return sb.build();
}

export const MAG_DIAGRAMS: Record<string, () => Scene> = {
  mg_oersted: oersted,
  mg_barfield: barField,
  mg_uniform: uniform,
  mg_compass: compassWire,
  mg_wirefield: wireField,
  mg_thumb: thumbRule,
  mg_loop: loopField,
  mg_solenoid: solenoid,
  mg_electromagnet: electromagnet,
  mg_rod: rodField,
  mg_fleming: fleming,
  mg_acdc: acdc,
  mg_domestic: domestic,
  mg_atoms: atoms,
  mg_domains: domains,
  mg_materials: materials,
  mg_earth: earth,
  mg_formulas: formulas,
  mg_parallel: parallelWires,
  mg_circle: chargeCircle,
  mg_emi: emi,
  mg_motor: motor,
  mg_generator: generator,
  mg_mindmap: mindMap,
};
