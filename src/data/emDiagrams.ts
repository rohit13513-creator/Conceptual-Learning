import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, LGREY, RED, LRED, YELLOW, LYELLOW, TEAL, LTEAL, box } from "./harmKit";
import { cell, switchSym, compass, nail, coil, clip, led, beaker, rings, ringArrow, wire, IRON, LIGHTIRON, COPPER, NICHROME, FLAME } from "./emKit";

// Diagrams (part 1) for Class VIII Science "Electricity: Magnetic and Heating Effects" (NCERT Chapter 4):
// the effects of current, the compass, electromagnets, the Earth, the lifting crane and the heating effect.
// Every picture is a Scene (see components/sceneKit.ts) checked by scripts/check-em-diagrams.mts.

// ── 1. three effects ──
function three(): Scene {
  const sb = new SceneBuilder(720, 330, "The effects of electric current");
  sb.rect(220, 18, 280, 46, { rx: 23, fill: "#0f172a" });
  sb.text(360, 47, "Electric current", { size: 17, fill: "#ffffff" });
  [[130, LBLUE, BLUE], [360, LORANGE, ORANGE], [590, LGREEN, GREEN]].forEach(([cx, , col]) => sb.arrow(360, 66, cx as number, 128, { stroke: col as string, sw: 2.4 }));
  const cards: [number, string, string, string[]][] = [
    [30, LBLUE, BLUE, ["Magnetic effect", "a current-carrying wire", "acts like a magnet", "(electromagnet)"]],
    [260, LORANGE, ORANGE, ["Heating effect", "a current-carrying wire", "gets hot", "(heater, iron, kettle)"]],
    [490, LGREEN, GREEN, ["Chemical reactions", "inside a cell or battery", "make the current", "(Voltaic, dry cell)"]],
  ];
  cards.forEach(([x, fill, stroke, lines], i) => {
    sb.rect(x, 130, 200, 170, { rx: 12, fill, stroke, sw: 2 });
    lines.forEach((t, k) => sb.text(x + 100, 220 + k * 20, t, { size: k === 0 ? 15 : 12.5, bold: k === 0, fill: k === 0 ? INK : "#334155" }));
    if (i === 0) compass(sb, x + 100, 175, 26, 40);
    if (i === 1) sb.poly([[x + 55, 175], [x + 70, 160], [x + 85, 190], [x + 100, 160], [x + 115, 190], [x + 130, 160], [x + 145, 175]], { stroke: "#dc2626", sw: 4, close: false, decor: true });
    if (i === 2) { cell(sb, x + 80, 175); cell(sb, x + 105, 175); cell(sb, x + 130, 175); }
  });
  sb.text(360, 322, "Cells and batteries make the current; the current has a magnetic and a heating effect", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 2. Oersted's activity ──
function oersted(): Scene {
  const sb = new SceneBuilder(720, 330, "A compass needle near a wire: switch OFF and switch ON");
  [20, 380].forEach((ox, p) => {
    const on = p === 1;
    sb.rect(ox, 62, 320, 130, { fill: "#fef3c7" });
    sb.circle(compassX(ox), 128, 30, { fill: "#f8fafc", stroke: INK, sw: 2 });
    sb.circle(ox + 40, 128, 5, { fill: IRON }); sb.circle(ox + 280, 128, 5, { fill: IRON });
    wire(sb, [[ox + 40, 128], [ox + 280, 128]]);
    compassNeedle(sb, compassX(ox), 128, 30, on ? 42 : 0);
    wire(sb, [[ox + 280, 128], [ox + 280, 232], [ox + 232, 232]]);
    switchSym(sb, ox + 132, 232, 100, on);
    wire(sb, [[ox + 94, 232], [ox + 132, 232]]); cell(sb, ox + 86, 232);
    wire(sb, [[ox + 86, 232], [ox + 40, 232], [ox + 40, 128]]);
    sb.text(ox + 160, 38, on ? "(b) Switch ON: current flows" : "(a) Switch OFF: no current", { size: 14, fill: on ? DGREEN : RED });
    sb.text(ox + 160, 270, on ? "the needle is deflected" : "the needle stays in its original", { size: 12.5, bold: false });
    sb.text(ox + 160, 288, on ? "(the wire has a magnetic effect)" : "direction", { size: 12.5, bold: false });
  });
  sb.arrow(400, 106, 440, 106, { stroke: GREEN });
  sb.text(480, 110, "current", { size: 12, fill: DGREEN, bold: false });
  sb.text(360, 318, "Oersted, 1820: a current deflects the compass needle, so electricity and magnetism are linked", { size: 12, bold: false, fill: GREY });
  return sb.build();
}
const compassX = (ox: number) => ox + 160;
/** the needle only (the ring is drawn before the wire so that the wire passes over the glass) */
function compassNeedle(sb: SceneBuilder, cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a), L = r * 0.78;
  sb.poly([[cx + dx * L, cy + dy * L], [cx - dy * 4.5, cy + dx * 4.5], [cx + dy * 4.5, cy - dx * 4.5]], { fill: RED, decor: true });
  sb.poly([[cx - dx * L, cy - dy * L], [cx - dy * 4.5, cy + dx * 4.5], [cx + dy * 4.5, cy - dx * 4.5]], { fill: "#1d4ed8", decor: true });
}

// ── 3. magnetic field round a wire ──
function field(): Scene {
  const sb = new SceneBuilder(720, 330, "The magnetic field round a current-carrying wire");
  const cx = 200, cy = 160;
  rings(sb, cx, cy, [44, 74, 104]);
  [[0, 74], [90, 74], [180, 74], [270, 74]].forEach(([deg, r]) => ringArrow(sb, cx, cy, r, deg, true));
  sb.circle(cx, cy, 11, { fill: "#0f172a" });
  sb.line(cx - 5, cy - 5, cx + 5, cy + 5, { stroke: "#ffffff", sw: 2, decor: true }); sb.line(cx - 5, cy + 5, cx + 5, cy - 5, { stroke: "#ffffff", sw: 2, decor: true });
  compass(sb, cx + 74, cy, 14, 180); compass(sb, cx, cy - 74, 14, 90); compass(sb, cx - 74, cy, 14, 0);
  sb.text(cx, 292, "Compasses show the field round the wire (top view)", { size: 12, bold: false, fill: GREY });
  box(sb, 400, 28, 300, 82, ["Magnetic field", "the region where the magnetic", "effect can be felt, e.g. a compass deflects"], { fill: LBLUE, stroke: BLUE, size: 12.5, bold: [true, false, false] });
  box(sb, 400, 124, 300, 72, ["Current flows", "a magnetic field is formed round the wire"], { fill: LGREEN, stroke: GREEN, size: 12.5, bold: [true, false] });
  box(sb, 400, 210, 300, 72, ["Current stops", "the magnetic field disappears"], { fill: LRED, stroke: RED, size: 12.5, bold: [true, false] });
  return sb.build();
}

// ── 4. a coil on a nail with a cell ──
function coilNail(): Scene {
  const sb = new SceneBuilder(720, 330, "A coil of wire on an iron nail joined to a cell");
  nail(sb, 150, 150, 240); coil(sb, 188, 150, 170, 14, 28);
  wire(sb, [[188, 164], [188, 240], [242, 240]]); cell(sb, 250, 240); wire(sb, [[258, 240], [358, 240], [358, 164]]);
  sb.text(270, 90, "Coil of insulated wire", { size: 13 }); sb.line(270, 98, 270, 134, { stroke: GREY, sw: 1.4 });
  sb.text(132, 155, "Iron nail", { size: 13, anchor: "end" });
  sb.text(250, 276, "Cell", { size: 13 });
  [168, 182, 196].forEach((y) => clip(sb, 398, y));
  sb.text(420, 200, "Iron paper clips", { size: 13, anchor: "start" });
  box(sb, 480, 30, 220, 62, ["Current ON", "the clips cling to the nail"], { fill: LGREEN, stroke: GREEN, size: 12.5, bold: [true, false] });
  box(sb, 480, 106, 220, 62, ["Current OFF", "the clips fall down"], { fill: LRED, stroke: RED, size: 12.5, bold: [true, false] });
  sb.text(360, 318, "Connect the cell only for a few seconds, or it weakens quickly", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 5. with and without an iron core ──
function core(): Scene {
  const sb = new SceneBuilder(720, 330, "A coil with and without an iron core");
  [20, 380].forEach((ox, p) => {
    const iron = p === 1;
    if (iron) nail(sb, ox + 40, 130, 220);
    else sb.rect(ox + 60, 114, 160, 32, { fill: "#e2e8f0" });
    coil(sb, ox + 62, 130, 156, 14, 34);
    wire(sb, [[ox + 62, 148], [ox + 62, 214], [ox + 126, 214]]); cell(sb, ox + 134, 214); wire(sb, [[ox + 142, 214], [ox + 218, 214], [ox + 218, 148]]);
    compass(sb, ox + 22, 86, 20, iron ? 72 : 22);
    if (iron) { clip(sb, ox + 270, 148); clip(sb, ox + 270, 162); }
    sb.text(ox + 160, 258, iron ? "(b) Coil with an iron nail" : "(a) Coil only (paper cylinder)", { size: 13.5, fill: iron ? DGREEN : GREY });
    sb.text(ox + 160, 278, iron ? "much bigger deflection; the clips are attracted" : "small deflection of the needle", { size: 12, bold: false });
  });
  sb.text(360, 26, "A current-carrying coil behaves like a magnet; an iron core makes it much stronger", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 6. poles of an electromagnet ──
function poles(): Scene {
  const sb = new SceneBuilder(720, 340, "Finding the poles of an electromagnet with a compass");
  nail(sb, 200, 140, 320); coil(sb, 228, 140, 266, 16, 34);
  wire(sb, [[228, 158], [228, 252], [346, 252]]); cell(sb, 354, 252); wire(sb, [[362, 252], [494, 252], [494, 158]]);
  sb.text(188, 98, "A (south pole)", { size: 14, fill: BLUE, anchor: "middle" });
  sb.text(540, 98, "B (north pole)", { size: 14, fill: RED, anchor: "middle" });
  compass(sb, 80, 140, 28, 90); compass(sb, 640, 140, 28, 90);
  sb.text(80, 196, "north pole of the needle", { size: 12, bold: false }); sb.text(80, 212, "is attracted to A", { size: 12, bold: false });
  sb.text(640, 196, "south pole of the needle", { size: 12, bold: false }); sb.text(640, 212, "is attracted to B", { size: 12, bold: false });
  sb.text(358, 290, "Cell", { size: 13 });
  sb.text(360, 322, "Unlike poles attract, so end A is a south pole and end B is a north pole", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 7. strength ──
function strength(): Scene {
  const sb = new SceneBuilder(720, 340, "Strength of an electromagnet: more cells or more turns");
  const items: [number, number, number, number, string, string][] = [[20, 1, 8, 2, "(a) 1 cell, 8 turns", "attracts 2 clips"], [260, 2, 8, 4, "(b) 2 cells, 8 turns", "attracts 4 clips"], [500, 2, 16, 7, "(c) 2 cells, 16 turns", "attracts 7 clips"]];
  items.forEach(([ox, cells, turns, clips, a, b], i) => {
    for (let k = 0; k < cells; k++) cell(sb, ox + 50 + k * 22, 62);
    sb.text(ox + 100, 38, "battery", { size: 11.5, bold: false, fill: GREY, anchor: "start" });
    nail(sb, ox + 10, 130, 150); coil(sb, ox + 30, 130, 100, turns, 30);
    for (let k = 0; k < clips; k++) clip(sb, ox + 176, 108 + k * 14);
    sb.text(ox + 90, 252, a, { size: 13.5, fill: [BLUE, PURPLE, RED][i] });
    sb.text(ox + 90, 272, b, { size: 12.5, bold: false });
  });
  sb.text(360, 318, "More current (more cells) or more turns of the coil: a stronger electromagnet", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 8. reversing the current ──
function reverse(): Scene {
  const sb = new SceneBuilder(720, 330, "Reversing the current reverses the poles");
  [20, 380].forEach((ox, p) => {
    const rev = p === 1;
    nail(sb, ox + 50, 120, 200); coil(sb, ox + 72, 120, 160, 12, 30);
    sb.rect(ox + 8, 100, 32, 40, { rx: 5, fill: rev ? "#ef4444" : "#3b82f6" }); sb.text(ox + 24, 126, rev ? "N" : "S", { size: 18, fill: "#ffffff" });
    sb.rect(ox + 276, 100, 32, 40, { rx: 5, fill: rev ? "#3b82f6" : "#ef4444" }); sb.text(ox + 292, 126, rev ? "S" : "N", { size: 18, fill: "#ffffff" });
    wire(sb, [[ox + 72, 136], [ox + 72, 200], [ox + 126, 200]]); cell(sb, ox + 134, 200, rev); wire(sb, [[ox + 142, 200], [ox + 232, 200], [ox + 232, 136]]);
    sb.text(ox + 160, 250, rev ? "(b) Battery reversed" : "(a) Current one way", { size: 14, fill: rev ? RED : BLUE });
    sb.text(ox + 160, 270, rev ? "A is a north pole, B is a south pole" : "A is a south pole, B is a north pole", { size: 12.5, bold: false });
    sb.text(ox + 24, 90, "A", { size: 14 }); sb.text(ox + 292, 90, "B", { size: 14 });
  });
  sb.text(360, 26, "Change the direction of the current and the poles change places", { size: 13, fill: GREY, bold: false });
  return sb.build();
}

// ── 9. the Earth as a magnet ──
function earthMagnet(): Scene {
  const sb = new SceneBuilder(720, 330, "The Earth behaves like a giant magnet");
  const cx = 230, cy = 170;
  [220, 330].forEach((d) => { sb.curve([cx, 92], [cx + d, cy], [cx, 248], { stroke: BLUE, sw: 1.6, dash: "6 4" }); sb.curve([cx, 92], [cx - d, cy], [cx, 248], { stroke: BLUE, sw: 1.6, dash: "6 4" }); });
  sb.circle(cx, cy, 78, { fill: "#93c5fd" }); sb.circle(cx, cy, 52, { fill: "#fbbf24" }); sb.circle(cx, cy, 28, { fill: "#f97316" });
  sb.text(cx, cy + 5, "iron core", { size: 11.5, fill: "#ffffff" });
  sb.text(cx, 70, "North", { size: 13 }); sb.text(cx, 282, "South", { size: 13 });
  box(sb, 460, 26, 240, 74, ["Deep inside the Earth", "liquid iron in the core moves", "and makes electric currents"], { fill: LORANGE, stroke: ORANGE, size: 12.5, bold: [true, false, false] });
  box(sb, 460, 116, 240, 74, ["The currents make the Earth", "a giant magnet; a freely hung", "magnet rests north-south"], { fill: LBLUE, stroke: BLUE, size: 12.5, bold: [true, false, false] });
  box(sb, 460, 206, 240, 74, ["The field shields us from", "harmful particles of space;", "birds and fish use it to navigate"], { fill: LGREEN, stroke: GREEN, size: 12.5, bold: [true, false, false] });
  return sb.build();
}

// ── 10. lifting electromagnet ──
function crane(): Scene {
  const sb = new SceneBuilder(720, 330, "A lifting electromagnet on a crane");
  [20, 380].forEach((ox, p) => {
    const on = p === 0;
    sb.rect(ox + 20, 50, 12, 210, { fill: IRON }); sb.rect(ox + 20, 50, 180, 10, { fill: IRON });
    sb.line(ox + 170, 60, ox + 170, 120, { stroke: GREY, sw: 2.4 });
    sb.rect(ox + 140, 120, 60, 26, { rx: 4, fill: "#334155" });
    sb.text(ox + 170, 138, on ? "ON" : "OFF", { size: 12, fill: on ? "#4ade80" : "#fca5a5" });
    if (on) { sb.rect(ox + 142, 148, 22, 14, { fill: IRON }); sb.rect(ox + 168, 148, 28, 12, { fill: IRON }); sb.rect(ox + 150, 162, 20, 13, { fill: LIGHTIRON }); sb.rect(ox + 174, 160, 18, 12, { fill: LIGHTIRON }); }
    else { sb.rect(ox + 120, 246, 22, 14, { fill: IRON }); sb.rect(ox + 152, 248, 28, 12, { fill: IRON }); sb.rect(ox + 190, 246, 20, 14, { fill: LIGHTIRON }); }
    sb.line(ox + 10, 262, ox + 310, 262, { stroke: GREY, sw: 2 });
    sb.text(ox + 255, 100, "electromagnet", { size: 12.5, anchor: "middle" });
    sb.text(ox + 160, 288, on ? "(a) Current ON: lifts iron and steel" : "(b) Current OFF: the objects are released", { size: 13, fill: on ? DGREEN : RED });
  });
  sb.text(360, 318, "The crane operator controls the magnet by switching the current ON and OFF", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 11. the heating effect in a nichrome wire ──
function heating(): Scene {
  const sb = new SceneBuilder(720, 330, "The heating effect in a nichrome wire");
  [20, 380].forEach((ox, p) => {
    const on = p === 1;
    sb.rect(ox, 70, 320, 130, { fill: "#fef3c7" });
    sb.circle(ox + 60, 130, 5, { fill: IRON }); sb.circle(ox + 260, 130, 5, { fill: IRON });
    sb.line(ox + 60, 130, ox + 260, 130, { stroke: on ? "#ea580c" : NICHROME, sw: on ? 4 : 3 });
    sb.text(ox + 160, 112, "nichrome wire", { size: 12.5, anchor: "middle" });
    if (on) [100, 150, 200, 240].forEach((x) => sb.poly([[x + ox, 156], [x + ox + 5, 164], [x + ox, 172], [x + ox + 5, 180]], { stroke: FLAME, sw: 2.2, close: false, decor: true }));
    wire(sb, [[ox + 260, 130], [ox + 260, 236], [ox + 220, 236]]); switchSym(sb, ox + 150, 236, 70, on);
    wire(sb, [[ox + 108, 236], [ox + 150, 236]]); cell(sb, ox + 100, 236); wire(sb, [[ox + 100, 236], [ox + 60, 236], [ox + 60, 130]]);
    sb.text(ox + 160, 40, on ? "(b) Switch ON for 30 s" : "(a) Switch OFF", { size: 14, fill: on ? RED : GREY });
    sb.text(ox + 160, 280, on ? "the wire feels warm" : "the wire is not warm", { size: 13, bold: false });
  });
  sb.text(360, 316, "Safety: touch the wire only for a moment, and only with a teacher present", { size: 12, bold: false, fill: RED });
  return sb.build();
}

// ── 12. factors affecting the heat ──
function factors(): Scene {
  const sb = new SceneBuilder(720, 340, "What the heat produced in a wire depends on");
  const cards: [number, number, string, string, string, string, string][] = [
    [20, 20, "1", "Amount of current", "more current, more heat", "2 cells heat more than 1 cell", LBLUE],
    [260, 20, "2", "Material of the wire", "nichrome gives more heat", "than copper (same size)", LORANGE],
    [500, 20, "3", "Thickness of the wire", "a thinner wire", "heats up more", LGREEN],
    [140, 140, "4", "Length of the wire", "a shorter wire heats up more", "(same cell)", LPURPLE],
    [380, 140, "5", "Time", "the longer the current flows,", "the more the heat produced", LYELLOW],
  ];
  const strokes = [BLUE, ORANGE, GREEN, PURPLE, "#ca8a04"];
  cards.forEach(([x, y, n, t, a, b, fill], i) => {
    sb.rect(x, y, 200, 100, { rx: 10, fill, stroke: strokes[i], sw: 2 });
    sb.circle(x + 20, y + 22, 12, { fill: strokes[i] }); sb.text(x + 20, y + 27, n, { size: 14, fill: "#ffffff" });
    sb.text(x + 112, y + 27, t, { size: 13 });
    sb.text(x + 100, y + 58, a, { size: 11.5, bold: false }); sb.text(x + 100, y + 76, b, { size: 11.5, bold: false });
  });
  sb.line(40, 290, 220, 290, { stroke: RED, sw: 3 }); sb.text(130, 276, "thin wire: hotter", { size: 12, anchor: "middle" });
  sb.line(250, 290, 430, 290, { stroke: GREY, sw: 8 }); sb.text(340, 276, "thick wire: less hot", { size: 12, anchor: "middle" });
  sb.line(470, 290, 530, 290, { stroke: RED, sw: 3 }); sb.text(500, 276, "short", { size: 12, anchor: "middle" });
  sb.line(560, 290, 700, 290, { stroke: GREY, sw: 3 }); sb.text(630, 276, "long", { size: 12, anchor: "middle" });
  sb.text(360, 326, "More heat: a large current, a thin and short wire, and a long time", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 13. household heating appliances ──
function appliances(): Scene {
  const sb = new SceneBuilder(720, 330, "Appliances that work on the heating effect of current");
  const labels = ["Electric room heater", "Electric stove", "Electric kettle", "Electric iron", "Immersion rod", "Hair dryer"];
  labels.forEach((t, i) => {
    const x = 12 + (i % 3) * 236, y = 10 + Math.floor(i / 3) * 128;
    sb.rect(x, y, 224, 116, { rx: 10, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.6 });
    const cx = x + 112, cy = y + 48;
    if (i === 0) { sb.rect(cx - 40, cy - 28, 80, 56, { rx: 6, fill: "#64748b" }); [0, 1, 2, 3].forEach((k) => sb.rect(cx - 30 + k * 19, cy - 22, 7, 44, { fill: "#ef4444" })); }
    if (i === 1) { sb.rect(cx - 46, cy + 8, 92, 16, { fill: "#64748b" }); sb.ellipse(cx, cy, 46, 14, { fill: "#475569" }); sb.ellipse(cx, cy, 30, 9, { fill: "#ef4444" }); sb.ellipse(cx, cy, 14, 4, { fill: "#fca5a5" }); }
    if (i === 2) { sb.poly([[cx - 26, cy + 24], [cx - 20, cy - 14], [cx + 20, cy - 14], [cx + 26, cy + 24]], { fill: "#94a3b8" }); sb.rect(cx - 16, cy - 22, 32, 8, { fill: "#475569" }); sb.poly([[cx + 22, cy - 6], [cx + 42, cy - 22], [cx + 45, cy - 15], [cx + 24, cy + 4]], { fill: "#94a3b8" }); sb.poly([[cx - 24, cy - 8], [cx - 40, cy - 8], [cx - 38, cy + 14], [cx - 26, cy + 14]], { stroke: "#334155", sw: 4, close: false, decor: true }); }
    if (i === 3) { sb.poly([[cx - 44, cy + 24], [cx + 40, cy + 24], [cx + 40, cy + 12], [cx + 12, cy - 6], [cx - 30, cy - 6]], { fill: "#94a3b8" }); sb.poly([[cx - 24, cy - 6], [cx - 14, cy - 24], [cx + 10, cy - 24], [cx + 12, cy - 6]], { stroke: "#334155", sw: 5, close: false, decor: true }); }
    if (i === 4) { sb.rect(cx - 36, cy - 6, 72, 34, { fill: "#bfdbfe" }); sb.poly([[cx + 18, cy - 30], [cx + 18, cy + 14], [cx - 10, cy + 14], [cx - 10, cy - 2]], { stroke: "#ef4444", sw: 5, close: false, decor: true }); }
    if (i === 5) { sb.rect(cx - 34, cy - 20, 56, 26, { rx: 10, fill: "#a78bfa" }); sb.rect(cx + 22, cy - 16, 16, 18, { fill: "#7c3aed" }); sb.rect(cx - 12, cy + 4, 14, 28, { fill: "#7c3aed" }); [-8, 0, 8].forEach((d) => sb.line(cx + 42, cy - 7 + d, cx + 56, cy - 7 + d, { stroke: "#94a3b8", sw: 2, decor: true })); }
    sb.text(cx, y + 101, t, { size: 13 });
  });
  sb.text(360, 292, "All of them have a heating element: a rod or coil of wire that gets hot when current flows", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 312, "In some appliances the element can be seen glowing red hot", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

export const EM_DIAGRAMS_1: Record<string, () => Scene> = {
  em_three: three,
  em_oersted: oersted,
  em_field: field,
  em_coil: coilNail,
  em_core: core,
  em_poles: poles,
  em_strength: strength,
  em_reverse: reverse,
  em_earth: earthMagnet,
  em_crane: crane,
  em_heating: heating,
  em_factors: factors,
  em_appliances: appliances,
};
void [GREEN, LGREEN, TEAL, LTEAL, LGREY, YELLOW, LYELLOW, PURPLE, LPURPLE, beaker, led, COPPER, compass];
