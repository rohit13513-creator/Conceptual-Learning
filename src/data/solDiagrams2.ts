import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, LGREY, RED, LRED, YELLOW, LYELLOW, TEAL, LTEAL, BROWN, LBROWN, box, fish } from "./harmKit";
import { glass, stone, dotsIn, WATER, DEEPWATER, SALT, SAND } from "./solKit";

// Diagrams (part 2) for Class VIII Science, "The Amazing World of Solutes, Solvents, and Solutions": floating and sinking, measuring mass and volume,
// the effect of temperature and pressure on density, the layers of the Earth and the mind map.

// ── 10. floating and sinking ──
function floating(): Scene {
  const sb = new SceneBuilder(720, 400, "Floating and sinking depend on the density of the object and of the liquid");
  // (a) oil on water
  glass(sb, 30, 50, 130, 140, 0.8, DEEPWATER);
  sb.rect(31, 80, 128, 26, { fill: "#fde047" });
  sb.text(95, 214, "(a) Oil floats on water", { size: 12.5 }); sb.text(95, 232, "oil is less dense", { size: 11.5, bold: false, fill: GREY });
  // (b) peeled and unpeeled orange
  glass(sb, 200, 50, 130, 140, 0.8, DEEPWATER);
  sb.circle(236, 94, 19, { fill: "#fb923c" }); sb.circle(236, 94, 19, { stroke: "#ea580c", sw: 1.6 });
  sb.circle(296, 172, 15, { fill: "#fdba74" });
  sb.text(265, 214, "(b) Unpeeled floats", { size: 12.5 }); sb.text(265, 232, "peeled orange sinks", { size: 11.5, bold: false, fill: GREY });
  // (c) egg in tap water and in salt water
  glass(sb, 370, 50, 130, 140, 0.8, DEEPWATER);
  sb.ellipse(435, 176, 15, 19, { fill: "#fef3c7" });
  glass(sb, 540, 50, 130, 140, 0.8, "#7dd3fc");
  sb.ellipse(605, 96, 15, 19, { fill: "#fef3c7" });
  [[560, 140], [590, 150], [625, 140], [650, 156], [575, 170], [615, 172]].forEach(([x, y]) => sb.circle(x, y, 2.2, { fill: SALT }));
  sb.text(435, 214, "(c) Raw egg in", { size: 12.5 }); sb.text(435, 232, "tap water: sinks", { size: 11.5, bold: false, fill: GREY });
  sb.text(605, 214, "In salt water:", { size: 12.5 }); sb.text(605, 232, "floats (denser water)", { size: 11.5, bold: false, fill: GREY });
  box(sb, 70, 262, 270, 70, ["Density of object less than water", "the object floats"], { fill: LGREEN, stroke: GREEN, size: 13, bold: [true, false] });
  box(sb, 380, 262, 270, 70, ["Density of object more than water", "the object sinks"], { fill: LRED, stroke: RED, size: 13, bold: [true, false] });
  sb.text(360, 362, "Bamboo and wooden logs are light, so ancient rafts and boats were made of them", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 384, "Density explains floating and sinking only partly: it is not the only factor", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 11. measuring mass with a digital balance ──
function balance(): Scene {
  const sb = new SceneBuilder(720, 320, "Measuring mass with a digital weighing balance");
  const panel = (x: number, display: string, step: string, sub: string, what: "none" | "glass" | "stone") => {
    sb.rect(x, 30, 200, 160, { rx: 10, fill: LGREY, stroke: "#cbd5e1", sw: 1.4 });
    sb.rect(x + 40, 120, 120, 16, { rx: 4, fill: "#94a3b8" });
    sb.rect(x + 30, 136, 140, 26, { rx: 6, fill: "#475569" });
    sb.rect(x + 56, 142, 88, 14, { rx: 3, fill: "#d1fae5" });
    sb.text(x + 100, 153.5, display, { size: 11.5, fill: "#065f46" });
    if (what !== "none") sb.ellipse(x + 100, 114, 40, 6, { fill: "#bae6fd" });
    if (what === "stone") stone(sb, x + 100, 100, 13);
    sb.text(x + 100, 214, step, { size: 12.5 }); sb.text(x + 100, 232, sub, { size: 11.5, bold: false, fill: GREY });
  };
  panel(14, "0.000 g", "(a) Zero reading", "press tare if it is not zero", "none");
  panel(260, "0.000 g", "(b) Watch glass on the pan", "tare again to get zero", "glass");
  panel(506, "16.400 g", "(c) Stone on the watch glass", "reading = mass of the stone", "stone");
  sb.text(360, 276, "Mass is the quantity of matter in an object. Unit: gram (g) or kilogram (kg).", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 296, "For a liquid, use a beaker in place of the watch glass.", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 12. a measuring cylinder and the meniscus ──
function cylinder(): Scene {
  const sb = new SceneBuilder(720, 420, "A 100 mL measuring cylinder, its smallest reading, and reading the meniscus");
  // the cylinder
  const x = 80, y0 = 50, h = 300, w = 60;
  sb.rect(x + 1, y0 + 120, w - 2, h - 120 - 1, { fill: WATER });
  sb.poly([[x, y0], [x, y0 + h], [x + w, y0 + h], [x + w, y0]], { stroke: INK, sw: 2, close: false });
  for (let i = 0; i <= 10; i++) {
    const yy = y0 + h - (i * h) / 10;
    sb.line(x + w - 22, yy, x + w, yy, { stroke: INK, sw: 1.8 });
    if (i % 2 === 0 && i > 0) sb.text(x + w + 6, yy + 4, String(i * 10), { size: 11, anchor: "start", fill: GREY });
    if (i < 10) for (let k = 1; k < 10; k++) sb.line(x + w - 10, yy - (k * h) / 100, x + w, yy - (k * h) / 100, { stroke: GREY, sw: 0.8, decor: true });
  }
  sb.text(x + w / 2, 372, "100 mL", { size: 13 });
  sb.text(x + w / 2, 392, "cylinder", { size: 12, bold: false });
  // the three steps
  const S: [string, string][] = [["1  Volume between two big marks", "10 mL (from 10 mL to 20 mL)"], ["2  Small divisions between them", "10"], ["3  Divide: 10 mL ÷ 10", "smallest reading = 1 mL"]];
  S.forEach(([a, b], i) => {
    box(sb, 220, 50 + i * 72, 290, 58, [a, b], { fill: i === 2 ? LGREEN : LYELLOW, stroke: i === 2 ? GREEN : "#ca8a04", size: 12.5, bold: [true, i === 2] });
  });
  box(sb, 220, 276, 290, 128, ["Smallest reading by capacity", "10 mL or 25 mL cylinder: 0.1 mL", "100 mL cylinder: 1 mL", "250 mL cylinder: 2 mL", "500 mL cylinder: 5 mL"], { fill: LBLUE, stroke: BLUE, size: 12, bold: [true, false, false, false, false] });
  // the meniscus: colourless and coloured liquids
  const tube = (cx: number, col: string, convex: boolean) => {
    sb.rect(cx - 27, convex ? 150 : 128, 54, convex ? 100 : 122, { fill: col });
    if (convex) sb.curve([cx - 27, 150], [cx, 112], [cx + 27, 150], { stroke: INK, sw: 2 });
    else sb.curve([cx - 27, 128], [cx, 160], [cx + 27, 128], { stroke: INK, sw: 2 });
    sb.poly([[cx - 28, 100], [cx - 28, 252], [cx + 28, 252], [cx + 28, 100]], { stroke: INK, sw: 2, close: false });
    sb.arrow(cx + 44, convex ? 132 : 146, cx + 30, convex ? 132 : 146, { stroke: RED, sw: 1.8 });
  };
  tube(578, WATER, false);
  tube(660, "#fca5a5", true);
  sb.text(578, 82, "Water", { size: 12.5 }); sb.text(660, 82, "Coloured", { size: 12.5 });
  sb.text(578, 276, "read the bottom", { size: 11.5, bold: false }); sb.text(578, 292, "(meniscus)", { size: 11.5, bold: false });
  sb.text(660, 276, "read the top", { size: 11.5, bold: false }); sb.text(660, 292, "(meniscus)", { size: 11.5, bold: false });
  sb.text(620, 326, "Keep the eyes level with", { size: 12, fill: GREY, bold: false });
  sb.text(620, 342, "the surface while reading", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 13. volume of solids ──
function volumes(): Scene {
  const sb = new SceneBuilder(720, 380, "Volume of a regular solid and of an irregular solid by displacement");
  // (a) cuboid
  sb.rect(40, 70, 150, 36, { rx: 2, fill: "#fde68a", stroke: BROWN, sw: 2 });
  sb.poly([[40, 70], [64, 52], [214, 52], [190, 70]], { fill: "#fef3c7", stroke: BROWN, sw: 1.8 });
  sb.poly([[190, 70], [214, 52], [214, 88], [190, 106]], { fill: "#fcd34d", stroke: BROWN, sw: 1.8 });
  sb.text(115, 130, "length l = 25 cm", { size: 12 }); sb.text(115, 148, "width w = 18 cm, height h = 2 cm", { size: 12, bold: false });
  box(sb, 20, 166, 210, 64, ["Volume = l × w × h", "25 × 18 × 2 = 900 cm^{3}"], { fill: LGREEN, stroke: GREEN, size: 13, bold: [true, false] });
  sb.text(125, 40, "Regular solid (notebook)", { size: 13, fill: DGREEN });
  // (b) displacement
  const cyl = (x: number, level: number, withStone: boolean, label: string, vol: string) => {
    const top = 250 - level * 1.4;
    sb.rect(x + 1, top, 58, 250 - top - 1, { fill: WATER });
    sb.poly([[x, 100], [x, 250], [x + 60, 250], [x + 60, 100]], { stroke: INK, sw: 2, close: false });
    [100, 130, 160, 190, 220].forEach((yy) => sb.line(x + 46, yy, x + 60, yy, { stroke: INK, sw: 1.6 }));
    if (withStone) { stone(sb, x + 30, 232, 12); sb.line(x + 30, 222, x + 30, 120, { stroke: GREY, sw: 1.4, dash: "3 3" }); }
    sb.text(x + 30, 274, label, { size: 12.5 }); sb.text(x + 30, 292, vol, { size: 12.5, fill: BLUE });
  };
  sb.text(430, 40, "Irregular solid (stone): displacement", { size: 13, fill: DGREEN });
  cyl(300, 50, false, "(a) Initial", "A = 50 mL");
  cyl(420, 55, true, "(b) With stone", "B = 55 mL");
  sb.arrow(364, 175, 414, 175, { stroke: GREY, sw: 2 });
  box(sb, 520, 130, 180, 110, ["Volume of stone", "= B − A", "= 55 − 50", "= 5 mL = 5 cm^{3}"], { fill: LYELLOW, stroke: "#ca8a04", size: 13, bold: [true, false, false, true] });
  sb.text(360, 336, "For solids, the volume in mL is written in the equal unit cm^{3}", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 356, "Tie the stone with a thread and lower it slowly into the water", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 14. effect of temperature on density ──
function heating(): Scene {
  const sb = new SceneBuilder(720, 380, "On heating, the volume increases and the density decreases");
  sb.rect(40, 70, 130, 130, { rx: 6, fill: "#e0f2fe", stroke: BLUE, sw: 2.2 });
  dotsIn(sb, 46, 76, 118, 118, 36, "#1d4ed8", 4.4);
  sb.rect(280, 40, 190, 190, { rx: 6, fill: "#ffedd5", stroke: RED, sw: 2.2 });
  dotsIn(sb, 288, 48, 174, 174, 36, "#b91c1c", 4.4);
  sb.arrow(176, 135, 274, 135, { stroke: RED, sw: 3 });
  sb.text(225, 118, "heat", { size: 13, fill: RED });
  sb.text(105, 32, "Cooler", { size: 14, fill: BLUE }); sb.text(375, 28, "Hotter", { size: 14, fill: RED });
  sb.text(105, 222, "same mass, small volume", { size: 12, bold: false }); sb.text(105, 240, "density is more", { size: 12.5, fill: BLUE });
  sb.text(375, 254, "same mass, large volume", { size: 12, bold: false }); sb.text(375, 272, "density is less", { size: 12.5, fill: RED });
  // a hot air balloon
  sb.ellipse(610, 110, 52, 62, { fill: "#f97316" });
  sb.poly([[570, 150], [650, 150], [624, 192], [596, 192]], { fill: "#fb923c", decor: true });
  sb.rect(598, 200, 24, 16, { fill: BROWN });
  sb.arrow(610, 252, 610, 230, { stroke: RED, sw: 2.2 });
  sb.text(610, 32, "Hot air balloon", { size: 13 });
  sb.text(610, 276, "hot air is less dense,", { size: 12, bold: false }); sb.text(610, 292, "so it rises", { size: 12, bold: false });
  sb.text(360, 330, "Density = mass ÷ volume: the mass stays the same, the volume increases, so the density decreases", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 352, "Water heated in a test tube rises in the glass tube: its volume increases", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 15. why ice floats ──
function iceFloats(): Scene {
  const sb = new SceneBuilder(720, 360, "Ice floats on water because it is less dense than liquid water");
  const row: [string, string, string, string][] = [["Water at 4 °C", "highest density", LBLUE, BLUE], ["Water at 0 °C", "freezes into ice", LGREY, GREY], ["Ice at 0 °C", "particles take more space", "#ecfeff", TEAL]];
  row.forEach(([a, b, f, c], i) => {
    const y = 28 + i * 84;
    box(sb, 20, y, 200, 64, [a, b], { fill: f, stroke: c, size: 13, bold: [true, false] });
    if (i < 2) sb.arrow(120, y + 66, 120, y + 82, { stroke: INK });
  });
  sb.text(120, 290, "expansion: the same mass takes", { size: 11.5, bold: false, fill: GREY }); sb.text(120, 306, "a larger volume, so density falls", { size: 11.5, bold: false, fill: GREY });
  // a frozen pond
  sb.rect(280, 40, 420, 220, { rx: 10, fill: "#f0f9ff", stroke: "#cbd5e1", sw: 1.4 });
  sb.rect(290, 60, 400, 36, { fill: "#ffffff" });
  sb.rect(290, 60, 400, 36, { fill: "#e0f2fe" });
  sb.rect(290, 96, 400, 150, { fill: WATER });
  fish(sb, 400, 160, ORANGE, 1, 1.2); fish(sb, 560, 190, "#f59e0b", -1, 1.1);
  sb.text(490, 52, "Layer of ice on top", { size: 13, fill: TEAL });
  sb.text(490, 84, "ice floats", { size: 12.5, fill: GREY, bold: false });
  sb.text(490, 236, "water below stays liquid and warm", { size: 12.5 });
  sb.text(490, 284, "Fish and other animals survive in very cold weather", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 340, "Water has its highest density at 4 °C. Ice is lighter than water and floats.", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 16. effect of pressure on density ──
function pressure(): Scene {
  const sb = new SceneBuilder(720, 380, "Pressure changes the density of gases a lot, but of liquids and solids very little");
  const piston = (x: number, h: number, n: number, label: string, sub: string) => {
    const top = 60 + h;
    sb.rect(x, top, 110, 230 - top, { fill: "#f1f5f9" });
    sb.poly([[x, 60], [x, 230], [x + 110, 230], [x + 110, 60]], { stroke: INK, sw: 2, close: false });
    sb.rect(x + 2, top - 10, 106, 10, { fill: "#64748b" });
    sb.line(x + 55, 36, x + 55, top - 10, { stroke: "#64748b", sw: 5, decor: true });
    sb.arrow(x + 55, 22, x + 55, 40 + h * 0.6, { stroke: RED, sw: 2.2 });
    dotsIn(sb, x + 6, top + 4, 98, 230 - top - 8, n, "#1d4ed8", 3.2);
    sb.text(x + 55, 254, label, { size: 12.5 }); sb.text(x + 55, 272, sub, { size: 11.5, bold: false, fill: GREY });
  };
  piston(30, 20, 15, "Gas: low pressure", "particles far apart");
  piston(180, 90, 15, "Gas: high pressure", "particles closer: denser");
  // liquid and solid
  sb.rect(350, 100, 100, 130, { rx: 4, fill: WATER });
  sb.arrow(400, 70, 400, 98, { stroke: RED, sw: 2.2 });
  sb.text(400, 254, "Liquid", { size: 12.5 }); sb.text(400, 272, "small effect", { size: 11.5, bold: false, fill: GREY });
  sb.rect(500, 100, 100, 130, { rx: 4, fill: "#cbd5e1" });
  dotsIn(sb, 504, 104, 92, 122, 48, "#475569", 3.4);
  sb.arrow(550, 70, 550, 98, { stroke: RED, sw: 2.2 });
  sb.text(550, 254, "Solid", { size: 12.5 }); sb.text(550, 272, "negligible effect", { size: 11.5, bold: false, fill: GREY });
  sb.text(655, 150, "Liquids are nearly", { size: 11.5, bold: false, fill: GREY }); sb.text(655, 166, "incompressible;", { size: 11.5, bold: false, fill: GREY }); sb.text(655, 182, "solid particles are", { size: 11.5, bold: false, fill: GREY }); sb.text(655, 198, "already very close", { size: 11.5, bold: false, fill: GREY });
  sb.text(360, 326, "For gases: more pressure, smaller volume, higher density", { size: 13 });
  sb.text(360, 348, "Density of gases depends on pressure; density of solids and liquids hardly does", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 17. layers of the Earth ──
function earth(): Scene {
  const sb = new SceneBuilder(720, 380, "Layers of the Earth: density increases towards the centre");
  const cx = 230, cy = 190;
  const L: [number, string, string][] = [[160, "#d6b588", "Crust"], [135, "#f59e0b", "Upper mantle"], [100, "#ea580c", "Lower mantle"], [64, "#dc2626", "Outer core (liquid)"], [30, "#7f1d1d", "Inner core (solid)"]];
  L.forEach(([r, f]) => sb.circle(cx, cy, r, { fill: f }));
  sb.circle(cx, cy, 160, { stroke: INK, sw: 1.6 });
  // labels from the inner core (top) to the crust (bottom); each leader starts inside its own layer
  const mid = [0, 47, 82, 117.5, 147.5];
  [L[4], L[3], L[2], L[1], L[0]].forEach(([, , name], k) => {
    const y = 60 + k * 64;
    sb.line(cx + mid[k], cy, 462, y, { stroke: GREY, sw: 1.2 });
    sb.circle(cx + mid[k], cy, 3, { fill: "#ffffff" });
    sb.text(470, y + 4, name, { size: 13, anchor: "start" });
  });
  sb.text(470, 24, "Densest: the centre of the Earth", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.text(470, 352, "Lightest: the outermost layer", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.text(360, 372, "Pressure and temperature rise with depth: the materials become heavier and more compact", { size: 11.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 18. the mind map of the whole chapter ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "The Amazing World of Solutes, Solvents, and Solutions: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Solutions", col: "#b45309", tint: "#fef3c7", leaves: ["Uniform mixture of substances", "Solute dissolves in the solvent", "Air: a solution of gases"] },
    { n: "2", t: "Saturation", col: "#2563eb", tint: "#dbeafe", leaves: ["Unsaturated: more can dissolve", "Saturated: no more dissolves", "Dilute and concentrated: relative"] },
    { n: "3", t: "Solubility", col: "#0f766e", tint: "#ccfbf1", leaves: ["Most solute in 100 mL solvent", "Solids: rises with temperature", "Gases: falls with temperature"] },
    { n: "4", t: "Water as a solvent", col: "#15803d", tint: "#dcfce7", leaves: ["Universal solvent: most versatile", "No: oil, grease, wax, paint", "Other solvents: petrol, acetone"] },
    { n: "5", t: "Density", col: "#c2410c", tint: "#ffedd5", leaves: ["Mass in a unit volume", "kg per m^{3}; g per cm^{3}", "Relative density: no unit"] },
    { n: "6", t: "Floating and sinking", col: "#7c3aed", tint: "#ede9fe", leaves: ["Less dense than water: floats", "More dense than water: sinks", "Egg, orange, ice, Dead Sea"] },
    { n: "7", t: "Measuring", col: "#b91c1c", tint: "#fee2e2", leaves: ["Mass: balance, tare, gram", "Volume: measuring cylinder", "Irregular solid: displacement"] },
    { n: "8", t: "Changes in density", col: "#a21caf", tint: "#fae8ff", leaves: ["Heating lowers the density", "Pressure raises density of gases", "Earth's layers: densest core"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 22, "SOLUTES,", { size: 17, fill: "#ffffff" }); sb.text(cx, cy, "SOLVENTS AND", { size: 15, fill: "#e2e8f0" }); sb.text(cx, cy + 22, "SOLUTIONS", { size: 17, fill: "#e2e8f0" });
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
  sb.text(cx, 800, "THE THREE FORMULAS", { size: 14, fill: GREY });
  const rules: [string, string, string, string][] = [
    ["Density", "Mass ÷ Volume", "unit: g per cm^{3} or kg per m^{3}", "#0f766e"],
    ["Volume of a cuboid", "l × w × h", "length, width and height", "#c2410c"],
    ["Volume of an irregular solid", "final level − initial level", "displacement of water", "#7c3aed"],
  ];
  rules.forEach(([a, b2, c2, col], i) => {
    const x = 90 + i * 430;
    sb.rect(x, 820, 400, 100, { rx: 16, fill: "#ffffff", stroke: col, sw: 2.6 });
    sb.rect(x, 820, 400, 34, { rx: 16, fill: col });
    sb.text(x + 200, 843, a, { size: 14.5, fill: "#ffffff" });
    sb.text(x + 200, 878, b2, { size: 14.5, fill: INK }); sb.text(x + 200, 900, c2, { size: 12, fill: INK, bold: false });
  });
  return sb.build();
}

export const SOL_DIAGRAMS_2: Record<string, () => Scene> = {
  sl_float: floating,
  sl_balance: balance,
  sl_cylinder: cylinder,
  sl_volume: volumes,
  sl_heating: heating,
  sl_ice: iceFloats,
  sl_pressure: pressure,
  sl_earth: earth,
  sl_mindmap: mindMap,
};
void [GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, LGREY, RED, LRED, YELLOW, LYELLOW, TEAL, LTEAL, LBROWN, SAND, DEEPWATER];
