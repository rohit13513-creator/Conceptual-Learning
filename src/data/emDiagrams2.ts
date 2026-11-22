import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, RED, LRED, YELLOW, LYELLOW, box } from "./harmKit";
import { cell, switchSym, nail, coil, lemon, led, beaker, rings, ringArrow, wire, IRON, COPPER } from "./emKit";

// Diagrams (part 2) for Class VIII Science "Electricity: Magnetic and Heating Effects" (NCERT Chapter 4):
// Voltaic cell, lemon cell, dry cell, rechargeable batteries, disposal, the Competition Corner pictures and the mind map.

// ── 14. Voltaic cell ──
function voltaic(): Scene {
  const sb = new SceneBuilder(720, 330, "A Voltaic cell");
  beaker(sb, 240, 150, 200, 130, 0.72, "#fde68a");
  sb.rect(290, 112, 14, 150, { fill: COPPER }); sb.rect(376, 112, 14, 150, { fill: "#94a3b8" });
  sb.text(297, 138, "+", { size: 16, fill: "#ffffff" }); sb.text(383, 138, "−", { size: 16, fill: "#ffffff" });
  wire(sb, [[297, 112], [297, 52], [334, 52]]); wire(sb, [[362, 52], [383, 52], [383, 112]]);
  sb.circle(348, 52, 14, { fill: YELLOW, stroke: INK, sw: 2 });
  sb.text(348, 22, "lamp", { size: 12.5 });
  sb.arrow(306, 92, 372, 92, { stroke: GREEN, sw: 2 });
  sb.text(339, 84, "current", { size: 12, fill: DGREEN, bold: false });
  box(sb, 480, 28, 220, 56, ["Electrodes", "two different metal rods"], { fill: LORANGE, stroke: ORANGE, size: 12.5, bold: [true, false] });
  box(sb, 480, 112, 220, 56, ["Electrolyte (liquid)", "weak acid or salt solution"], { fill: LYELLOW, stroke: "#ca8a04", size: 12.5, bold: [true, false] });
  box(sb, 480, 196, 220, 56, ["Container", "of glass or plastic"], { fill: LBLUE, stroke: BLUE, size: 12.5, bold: [true, false] });
  sb.line(480, 56, 392, 118, { stroke: GREY, sw: 1.3, dash: "4 3" });
  sb.line(480, 140, 426, 188, { stroke: GREY, sw: 1.3, dash: "4 3" });
  sb.line(480, 224, 442, 262, { stroke: GREY, sw: 1.3, dash: "4 3" });
  sb.text(360, 312, "Current flows from the positive terminal through the circuit to the negative terminal", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 15. lemon cell ──
function lemonCell(): Scene {
  const sb = new SceneBuilder(720, 330, "A cell made from lemons");
  const xs = [110, 260, 410];
  xs.forEach((x) => { lemon(sb, x, 200, 1.1); sb.rect(x - 18, 120, 9, 86, { fill: COPPER }); sb.rect(x + 9, 120, 9, 86, { fill: IRON }); });
  wire(sb, [[xs[0] + 13, 120], [xs[0] + 13, 100], [xs[1] - 14, 100], [xs[1] - 14, 120]]);
  wire(sb, [[xs[1] + 13, 120], [xs[1] + 13, 100], [xs[2] - 14, 100], [xs[2] - 14, 120]]);
  wire(sb, [[xs[0] - 14, 120], [xs[0] - 14, 60], [251, 60]]); led(sb, 260, 60, true); wire(sb, [[269, 60], [xs[2] + 13, 60], [xs[2] + 13, 120]]);
  sb.text(260, 20, "LED glows", { size: 13, fill: DGREEN });
  sb.rect(490, 40, 14, 14, { fill: COPPER }); sb.text(514, 52, "Copper wire (electrode)", { size: 12.5, anchor: "start" });
  sb.rect(490, 70, 14, 14, { fill: IRON }); sb.text(514, 82, "Iron nail (electrode)", { size: 12.5, anchor: "start" });
  sb.rect(490, 100, 14, 14, { fill: "#fde047" }); sb.text(514, 112, "Lemon juice (electrolyte)", { size: 12.5, anchor: "start" });
  box(sb, 484, 140, 220, 70, ["The LED glows only if its", "longer wire is joined to the", "positive terminal of the battery"], { fill: LGREEN, stroke: GREEN, size: 11.5, bold: [false, false, false] });
  sb.text(360, 290, "Join the copper of one lemon to the iron nail of the next (5 or 6 lemons)", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 312, "If the LED does not glow, reverse its connections", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 16. lemon juice and pure water ──
function lemonWater(): Scene {
  const sb = new SceneBuilder(720, 330, "Iron nail and copper strip in lemon juice and in pure water");
  [20, 380].forEach((ox, p) => {
    const juice = p === 0;
    beaker(sb, ox + 90, 130, 140, 110, 0.65, juice ? "#fde68a" : "#bfdbfe");
    sb.rect(ox + 120, 92, 10, 120, { fill: IRON }); sb.rect(ox + 190, 92, 10, 120, { fill: COPPER });
    wire(sb, [[ox + 125, 92], [ox + 125, 60], [ox + 151, 60]]); led(sb, ox + 160, 60, juice, true); wire(sb, [[ox + 169, 60], [ox + 195, 60], [ox + 195, 92]]);
    sb.text(ox + 160, 266, juice ? "(a) Lemon juice" : "(b) Pure water", { size: 14, fill: juice ? DGREEN : RED });
    sb.text(ox + 160, 286, juice ? "the LED glows" : "the LED does not glow", { size: 13, bold: false });
  });
  sb.text(360, 320, "Pure water hardly conducts electricity, so it cannot work as the electrolyte", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 17. dry cell ──
function dryCell(): Scene {
  const sb = new SceneBuilder(720, 330, "A dry cell and its inside");
  sb.rect(270, 80, 120, 200, { rx: 6, fill: "#cbd5e1", stroke: INK, sw: 2 });
  sb.rect(284, 94, 92, 172, { fill: "#e7e5e4" });
  sb.rect(320, 60, 20, 200, { fill: "#1f2937" }); sb.rect(314, 44, 32, 16, { fill: "#9ca3af" });
  const rows: [number, string, number, number][] = [[52, "Metal cap and carbon rod: positive terminal", 346, 52], [112, "Carbon rod at the centre", 340, 120], [172, "Paste-like electrolyte", 372, 172], [232, "Zinc container: negative terminal", 388, 232]];
  rows.forEach(([y, t, px, py]) => { sb.text(430, y + 4, t, { size: 12, anchor: "start" }); sb.line(424, y, px + 4, py, { stroke: GREY, sw: 1.2, dash: "4 3" }); });
  box(sb, 20, 70, 210, 64, ["Dry cell", "the electrolyte is a thick", "moist paste, not a liquid"], { fill: LBLUE, stroke: BLUE, size: 12, bold: [true, false, false] });
  box(sb, 20, 160, 210, 64, ["Single-use cell", "used up, then it has to be", "disposed of"], { fill: LRED, stroke: RED, size: 12, bold: [true, false, false] });
  return sb.build();
}

// ── 18. single-use and rechargeable ──
function recharge(): Scene {
  const sb = new SceneBuilder(720, 330, "Single-use cell and rechargeable battery");
  const cols: [number, string, string, string, string[]][] = [
    [20, LRED, RED, "Dry cell (single-use)", ["Used once, then disposed of", "Creates more waste", "e.g. torch and remote cells"]],
    [380, LGREEN, GREEN, "Rechargeable battery", ["Recharged and reused many times", "Prevents wastage, saves money", "e.g. phone, laptop, inverter, vehicle"]],
  ];
  cols.forEach(([x, fill, stroke, title, lines]) => {
    sb.rect(x, 20, 320, 220, { rx: 12, fill, stroke, sw: 2 });
    sb.text(x + 160, 52, title, { size: 16 });
    lines.forEach((t, i) => { sb.rect(x + 24, 78 + i * 52, 272, 38, { rx: 8, fill: "#ffffff", stroke, sw: 1.4 }); sb.text(x + 160, 102 + i * 52, t, { size: 12.5, bold: false }); });
  });
  sb.text(360, 274, "A rechargeable battery also wears out after many charges:", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 294, "an old phone battery needs charging more and more often", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 19. disposal of batteries ──
function disposal(): Scene {
  const sb = new SceneBuilder(720, 350, "What to do with a used battery");
  box(sb, 20, 134, 170, 80, ["Used battery", "not completely dead:", "acids, lead, cadmium,", "nickel, lithium"], { fill: LYELLOW, stroke: "#ca8a04", size: 12, bold: [true, false, false, false] });
  sb.arrow(190, 156, 262, 80, { stroke: RED, sw: 2.4 }); sb.arrow(190, 192, 262, 268, { stroke: GREEN, sw: 2.4 });
  box(sb, 262, 40, 190, 80, ["Regular garbage", "WRONG"], { fill: LRED, stroke: RED, size: 14, bold: [true, true], fillText: RED });
  box(sb, 262, 228, 190, 80, ["E-waste recycling", "facility: RIGHT"], { fill: LGREEN, stroke: GREEN, size: 14, bold: [true, true], fillText: DGREEN });
  sb.arrow(452, 80, 498, 80, { stroke: RED, sw: 2.4 }); sb.arrow(452, 268, 498, 268, { stroke: GREEN, sw: 2.4 });
  box(sb, 498, 40, 200, 80, ["May cause fires and", "harm the environment"], { fill: "#ffffff", stroke: RED, size: 13, bold: [true, false] });
  box(sb, 498, 228, 200, 80, ["Valuable materials are", "recycled and reused"], { fill: "#ffffff", stroke: GREEN, size: 13, bold: [true, false] });
  sb.text(360, 338, "If you are not sure where to give a used battery, ask your teacher", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 20. right-hand thumb rule ──
function thumb(): Scene {
  const sb = new SceneBuilder(720, 340, "Right-hand thumb rule for a straight wire");
  sb.text(360, 24, "Thumb along the current: the curled fingers show the direction of the field", { size: 13, fill: GREY, bold: false });
  [20, 380].forEach((ox, p) => {
    const into = p === 1, cx = ox + 160, cy = 150;
    rings(sb, cx, cy, [30, 55, 80]);
    [30, 55, 80].forEach((r) => [45, 135, 225, 315].forEach((d) => ringArrow(sb, cx, cy, r, d, into)));
    sb.circle(cx, cy, 12, { fill: "#0f172a" });
    if (into) { sb.line(cx - 5, cy - 5, cx + 5, cy + 5, { stroke: "#ffffff", sw: 2, decor: true }); sb.line(cx - 5, cy + 5, cx + 5, cy - 5, { stroke: "#ffffff", sw: 2, decor: true }); }
    else sb.circle(cx, cy, 3.5, { fill: "#ffffff" });
    sb.text(cx, 262, into ? "(b) Current into the page: field clockwise" : "(a) Current out of the page: field anticlockwise", { size: 12.5, fill: into ? PURPLE : BLUE });
  });
  sb.text(360, 304, "The field is strong near the wire and weaker farther away; more current gives a stronger field", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 21. solenoid ──
function solenoid(): Scene {
  const sb = new SceneBuilder(720, 330, "A solenoid and its magnetic field");
  [-30, 20].forEach((c) => { sb.curve([535, 134], [360, c], [185, 134], { stroke: BLUE, sw: 1.6 }); sb.curve([535, 166], [360, 300 - c], [185, 166], { stroke: BLUE, sw: 1.6 }); });
  sb.arrow(200, 150, 518, 150, { stroke: BLUE, sw: 1.8 });
  coil(sb, 200, 150, 320, 12, 60);
  sb.rect(170, 134, 30, 32, { rx: 5, fill: "#3b82f6" }); sb.text(185, 157, "S", { size: 17, fill: "#ffffff" });
  sb.rect(520, 134, 30, 32, { rx: 5, fill: "#ef4444" }); sb.text(535, 157, "N", { size: 17, fill: "#ffffff" });
  sb.arrow(380, 72, 340, 72, { stroke: BLUE, sw: 2 }); sb.arrow(380, 228, 340, 228, { stroke: BLUE, sw: 2 });
  sb.text(360, 24, "A solenoid (a long coil) acts like a bar magnet: the field leaves N and enters S", { size: 12.5, fill: GREY, bold: false });
  sb.circle(150, 292, 14, { stroke: INK, sw: 1.8 }); ringArrow(sb, 150, 292, 14, 270, false, RED);
  sb.text(176, 297, "anticlockwise: north pole", { size: 12.5, anchor: "start" });
  sb.circle(430, 292, 14, { stroke: INK, sw: 1.8 }); ringArrow(sb, 430, 292, 14, 270, true, BLUE);
  sb.text(456, 297, "clockwise: south pole", { size: 12.5, anchor: "start" });
  return sb.build();
}

// ── 22. electric bell ──
function bell(): Scene {
  const sb = new SceneBuilder(720, 340, "The electric bell");
  sb.rect(150, 120, 20, 100, { fill: IRON }); sb.rect(210, 120, 20, 100, { fill: IRON }); sb.rect(150, 208, 80, 14, { fill: IRON });
  for (let i = 0; i < 6; i++) { sb.line(146, 128 + i * 12, 174, 138 + i * 12, { stroke: COPPER, sw: 3, decor: true }); sb.line(206, 128 + i * 12, 234, 138 + i * 12, { stroke: COPPER, sw: 3, decor: true }); }
  sb.rect(250, 110, 12, 122, { fill: "#475569" }); sb.circle(256, 238, 4, { fill: INK });
  sb.rect(262, 197, 26, 6, { fill: COPPER }); sb.rect(290, 192, 26, 14, { fill: "#9ca3af" });
  sb.line(262, 130, 350, 130, { stroke: "#475569", sw: 4, decor: true }); sb.circle(358, 130, 8, { fill: "#334155" });
  sb.circle(410, 130, 36, { fill: "#fbbf24" }); sb.circle(410, 130, 14, { fill: "#f59e0b" });
  wire(sb, [[160, 120], [160, 80], [60, 80], [60, 270], [92, 270]]); cell(sb, 100, 270); wire(sb, [[108, 270], [150, 270]]);
  switchSym(sb, 150, 270, 40, false); wire(sb, [[190, 270], [304, 270], [304, 206]]); wire(sb, [[220, 120], [220, 100], [256, 100], [256, 110]]);
  const marks: [number, number, string][] = [[128, 170, "1"], [276, 96, "2"], [358, 106, "3"], [410, 84, "4"], [304, 178, "5"], [170, 304, "6"], [104, 304, "7"]];
  marks.forEach(([x, y, n]) => { sb.circle(x, y, 10, { fill: "#0f172a" }); sb.text(x, y + 4.5, n, { size: 12.5, fill: "#ffffff" }); });
  const names = ["Electromagnet", "Soft iron armature", "Hammer", "Gong", "Contact screw", "Push switch", "Battery"];
  names.forEach((t, i) => { sb.circle(486, 36 + i * 26, 10, { fill: "#0f172a" }); sb.text(486, 40.5 + i * 26, String(i + 1), { size: 12.5, fill: "#ffffff" }); sb.text(504, 41 + i * 26, t, { size: 13, anchor: "start" }); });
  box(sb, 470, 224, 232, 96, ["Press the switch: the coil becomes", "a magnet and pulls the armature;", "the hammer strikes the gong and", "the contact breaks; it springs back"], { fill: LYELLOW, stroke: "#ca8a04", size: 11.5, bold: [false, false, false, false] });
  return sb.build();
}

// ── 23. cells in series and in parallel ──
function series(): Scene {
  const sb = new SceneBuilder(720, 340, "Cells in series and in parallel");
  [20, 380].forEach((ox, p) => {
    const par = p === 1;
    sb.circle(ox + 160, 90, 16, { fill: YELLOW, stroke: INK, sw: 2 });
    if (!par) {
      wire(sb, [[ox + 30, 90], [ox + 142, 90]]); wire(sb, [[ox + 178, 90], [ox + 290, 90]]);
      wire(sb, [[ox + 30, 90], [ox + 30, 210], [ox + 62, 210]]); wire(sb, [[ox + 290, 90], [ox + 290, 210], [ox + 158, 210]]);
      [70, 110, 150].forEach((x, i) => { cell(sb, ox + x, 210); if (i < 2) wire(sb, [[ox + x + 8, 210], [ox + x + 32, 210]]); });
      sb.text(ox + 160, 256, "(a) 3 cells in series", { size: 14, fill: BLUE });
      sb.text(ox + 160, 276, "1.5 V + 1.5 V + 1.5 V = 4.5 V", { size: 12.5, bold: false });
      sb.text(ox + 160, 296, "the lamp is brighter", { size: 12.5, bold: false });
    } else {
      wire(sb, [[ox + 90, 90], [ox + 142, 90]]); wire(sb, [[ox + 178, 90], [ox + 230, 90]]);
      wire(sb, [[ox + 90, 90], [ox + 90, 210]]); wire(sb, [[ox + 230, 90], [ox + 230, 210]]);
      [140, 175, 210].forEach((y) => { wire(sb, [[ox + 90, y], [ox + 147, y]]); wire(sb, [[ox + 163, y], [ox + 230, y]]); cell(sb, ox + 155, y); });
      sb.text(ox + 160, 256, "(b) 3 cells in parallel", { size: 14, fill: PURPLE });
      sb.text(ox + 160, 276, "voltage stays 1.5 V", { size: 12.5, bold: false });
      sb.text(ox + 160, 296, "the cells last longer", { size: 12.5, bold: false });
    }
  });
  sb.text(360, 326, "Each cell: 1.5 V.  Series adds the voltages; parallel keeps the voltage of one cell", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 24. mind map ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "Electricity: Magnetic and Heating Effects: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Effects of current", col: "#b45309", tint: "#fef3c7", leaves: ["Magnetic effect", "Heating effect", "Chemical reactions make the current"] },
    { n: "2", t: "Magnetic effect", col: "#2563eb", tint: "#dbeafe", leaves: ["Oersted, 1820: compass deflects", "Magnetic field round the wire", "Gone when the current stops"] },
    { n: "3", t: "Electromagnet", col: "#0f766e", tint: "#ccfbf1", leaves: ["Current-carrying coil as a magnet", "Iron core makes it stronger", "Two poles: north and south"] },
    { n: "4", t: "Strength and poles", col: "#15803d", tint: "#dcfce7", leaves: ["More current: stronger", "More turns: stronger", "Reverse current: poles reverse"] },
    { n: "5", t: "Heating effect", col: "#c2410c", tint: "#ffedd5", leaves: ["Resistance changes energy to heat", "More current: more heat", "Thin, short wire: hotter"] },
    { n: "6", t: "Uses of heating", col: "#7c3aed", tint: "#ede9fe", leaves: ["Heater, stove, kettle, iron", "Nichrome heating element", "Steel furnace; fuse for safety"] },
    { n: "7", t: "Cells and batteries", col: "#b91c1c", tint: "#fee2e2", leaves: ["Voltaic cell: lemon cell", "Dry cell: single use", "Rechargeable: Li-ion battery"] },
    { n: "8", t: "Use and disposal", col: "#a21caf", tint: "#fae8ff", leaves: ["Lifting electromagnet on a crane", "Bell, motor, fan, loudspeaker", "Used batteries to e-waste facility"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 22, "ELECTRICITY:", { size: 17, fill: "#ffffff" }); sb.text(cx, cy, "MAGNETIC AND", { size: 15, fill: "#e2e8f0" }); sb.text(cx, cy + 22, "HEATING EFFECTS", { size: 15, fill: "#e2e8f0" });
  const slots = [110, 300, 490, 680];
  const pw = 232, ph = 44, lw = 272, lh = 32, gap = 9, off = 300;
  const curve4 = (p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number], col: string, w: number) => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 28; i++) { const t = i / 28, m = 1 - t; pts.push([m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0], m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1]]); }
    sb.blob("M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L "), pts, { stroke: col, sw: w });
  };
  brs.forEach((b, i) => {
    const right = i < 4;
    const my = right ? slots[i] : slots[7 - i];
    const mx = right ? cx + off : cx - off;
    const a = Math.atan2(my - cy, mx - cx);
    const sx = cx + Math.cos(a) * 104, sy = cy + Math.sin(a) * 104;
    const ex = right ? mx - pw / 2 : mx + pw / 2, ey = my;
    curve4([sx, sy], [sx + (ex - sx) * 0.5, sy], [sx + (ex - sx) * 0.5, ey], [ex, ey], b.col, 9);
    curve4([sx, sy], [sx + (ex - sx) * 0.5, sy], [sx + (ex - sx) * 0.5, ey], [ex, ey], "#ffffff", 2);
    sb.rect(mx - pw / 2, my - ph / 2, pw, ph, { rx: 22, fill: b.col, stroke: "#ffffff", sw: 3 });
    sb.circle(mx - pw / 2 + 24, my, 15, { fill: "#ffffff" }); sb.text(mx - pw / 2 + 24, my + 5.5, b.n, { size: 16, fill: b.col });
    sb.text(mx - pw / 2 + 46, my + 5, b.t, { size: 13, fill: "#ffffff", anchor: "start" });
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
  sb.text(cx, 800, "THREE KEY IDEAS", { size: 14, fill: GREY });
  const rules: [string, string, string, string][] = [
    ["Electromagnet", "current ON: coil is a magnet", "current OFF: the magnet is gone", "#0f766e"],
    ["Heat in a wire", "current, material, thickness,", "length and time decide it", "#c2410c"],
    ["Cell or battery", "chemical reactions give the current", "recharge it, or recycle it safely", "#b91c1c"],
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

export const EM_DIAGRAMS_2: Record<string, () => Scene> = {
  em_voltaic: voltaic,
  em_lemon: lemonCell,
  em_lemon2: lemonWater,
  em_drycell: dryCell,
  em_recharge: recharge,
  em_disposal: disposal,
  em_thumb: thumb,
  em_solenoid: solenoid,
  em_bell: bell,
  em_series: series,
  em_mindmap: mindMap,
};
void [GREEN, LGREEN, LPURPLE, LRED, RED, ORANGE, nail, switchSym];
