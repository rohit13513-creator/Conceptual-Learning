import { SceneBuilder, Scene, C, textWidth } from "../components/sceneKit";
import type { Pt } from "../components/sceneKit";
import { tube, flame, limewaterTest, tubeRow } from "../components/chemApparatus";

// Diagrams for Class X Chemistry, "Acids, Bases and Salts". Every picture is a Scene (see components/sceneKit.ts),
// so scripts/check-acid-diagrams.mts can check that no text touches a line, a shape or another text.

const bubble = (sb: SceneBuilder, x: number, y: number, r = 3.2) => sb.circle(x, y, r, { fill: "#ffffff", stroke: "#475569", sw: 1.2 });
const pale = "#f1f5f9";

// ── 1. indicator colours ──
function indicatorChart(): Scene {
  const sb = new SceneBuilder(600, 392, "Colours of common indicators in acid, in a neutral solution and in a base");
  const x0 = 150, cw = 146, rh = 34;
  const head = ["In acid", "Neutral", "In base"];
  head.forEach((h, i) => sb.text(x0 + i * cw + cw / 2, 24, h, { size: 14 }));
  type Cell = [string, string, boolean?];
  const rows: [string, Cell, Cell, Cell][] = [
    ["Red litmus", ["#ef4444", "Red"], ["#ef4444", "Red"], ["#3b82f6", "Blue"]],
    ["Blue litmus", ["#ef4444", "Red"], ["#3b82f6", "Blue"], ["#3b82f6", "Blue"]],
    ["Phenolphthalein", [pale, "Colourless", true], [pale, "Colourless", true], ["#f472b6", "Pink"]],
    ["Methyl orange", ["#ef4444", "Red"], ["#facc15", "Yellow", true], ["#facc15", "Yellow", true]],
    ["Turmeric", ["#facc15", "Yellow", true], ["#facc15", "Yellow", true], ["#92400e", "Reddish-brown"]],
    ["Red cabbage", ["#ec4899", "Red or pink"], ["#7c3aed", "Purple"], ["#16a34a", "Green"]],
    ["Beetroot", ["#e11d48", "Red or pink"], ["#9f1239", "Red-purple"], ["#eab308", "Yellow", true]],
    ["Onion, vanilla,", [pale, "Smell stays", true], [pale, "Smell stays", true], [pale, "Smell is lost", true]],
  ];
  rows.forEach(([name, a, n, b], r) => {
    const y = 40 + r * (rh + 6);
    if (r === 7) { sb.text(8, y + 15, "Onion, vanilla,", { size: 13, anchor: "start" }); sb.text(8, y + 31, "clove oil (smell)", { size: 12, anchor: "start", bold: false, fill: C.grey }); }
    else sb.text(8, y + 22, name, { size: 13, anchor: "start" });
    [a, n, b].forEach((c, i) => {
      sb.rect(x0 + i * cw + 3, y, cw - 6, rh, { rx: 6, fill: c[0] });
      sb.text(x0 + i * cw + cw / 2, y + 22, c[1], { size: 13, fill: c[2] || c[0] === pale ? C.ink : "#ffffff" });
    });
  });
  return sb.build();
}

// ── 2. zinc with dilute sulphuric acid, and the soap bubble test (Activity 2.3) ──
function zincAcid(): Scene {
  const sb = new SceneBuilder(580, 310, "Zinc granules with dilute sulphuric acid: the hydrogen gas is tested with a burning candle");
  tube(sb, 50, 80, 54, 150, { level: 0.55, liquid: "#e0f2fe" });
  sb.rect(46, 72, 62, 12, { fill: "#b45309", stroke: C.ink, sw: 1.4 });
  [[66, 208], [82, 214], [74, 200], [90, 206]].forEach(([x, y]) => sb.circle(x, y, 4.2, { fill: "#6b7280", stroke: C.ink, sw: 1 }));
  [[62, 186], [86, 176], [74, 160], [66, 142]].forEach(([x, y]) => bubble(sb, x, y, 3));
  sb.rect(232, 200, 150, 54, { fill: "#dbeafe", stroke: C.ink, sw: 2 });
  sb.poly([[77, 72], [77, 34], [290, 34], [290, 232]], { stroke: "#475569", sw: 3.4, close: false });
  [[304, 226], [318, 236], [300, 242]].forEach(([x, y]) => bubble(sb, x, y, 3.4));
  bubble(sb, 352, 172, 14);
  sb.rect(466, 190, 22, 64, { fill: "#fef3c7", stroke: C.ink, sw: 1.6 });
  flame(sb, 477, 190, 14, 30, "#fdba74", "#ea580c");
  sb.text(76, 258, "Dilute H_{2}SO_{4}", { size: 12.5 });
  sb.text(76, 274, "with zinc granules", { size: 12.5 });
  sb.text(190, 24, "Delivery tube", { size: 12.5, fill: C.grey });
  sb.text(307, 276, "Soap solution", { size: 12.5, fill: C.blue });
  sb.text(352, 136, "Bubble filled", { size: 12, fill: C.grey });
  sb.text(352, 150, "with hydrogen", { size: 12, fill: C.grey });
  sb.text(477, 276, "Burning candle", { size: 12.5 });
  sb.text(477, 150, "Pop!", { size: 13, fill: C.red });
  return sb.build();
}

// ── 3. neutralisation with phenolphthalein (Activity 2.6) ──
const neutralisation = (): Scene => tubeRow([
  { name: ["NaOH solution", "+ phenolphthalein"], liquid: "#f9a8d4", level: 0.6 },
  { name: ["Add dilute HCl", "drop by drop"], liquid: "#f1f5f9", level: 0.66 },
  { name: ["Add a few drops of", "NaOH again"], liquid: "#f9a8d4", level: 0.7 },
], "Phenolphthalein: pink in the base, colourless when the acid has neutralised it, pink again with extra base", 12);

// ── 4. black copper(II) oxide with dilute hydrochloric acid (Activity 2.7) ──
const cuoAcid = (): Scene => tubeRow([
  { name: ["Black copper(II)", "oxide, CuO"], liquid: "#1f2937", level: 0.14 },
  { name: ["Add dilute HCl", "slowly, stirring"], liquid: "#e0f2fe", level: 0.62 },
  { name: ["Blue-green solution", "of CuCl_{2}"], liquid: "#2dd4bf", level: 0.62 },
], "Metal oxide + acid: the oxide dissolves and a blue-green salt solution forms", 12);

// ── 5. carbonate + acid, gas through limewater (Activity 2.5) ──
const limewater = (): Scene => limewaterTest(["Carbonate + dilute HCl"], "The gas from a carbonate and an acid turns limewater milky");

// ── 6. does the solution conduct electricity? (Activity 2.8) ──
function conduction(): Scene {
  const sb = new SceneBuilder(520, 290, "Acid solution conducts electricity: the bulb glows");
  sb.rect(70, 170, 150, 100, { fill: "#fef9c3", stroke: C.ink, sw: 2 });
  sb.rect(86, 160, 118, 10, { fill: "#b45309", stroke: C.ink, sw: 1.4 });
  sb.line(112, 170, 112, 244, { stroke: "#6b7280", sw: 5 });
  sb.line(178, 170, 178, 244, { stroke: "#6b7280", sw: 5 });
  // circuit: left nail, bulb, battery, switch, right nail
  sb.poly([[112, 160], [112, 50], [214, 50]], { stroke: C.ink, sw: 2, close: false });
  sb.circle(230, 50, 16, { fill: "#fde047", stroke: C.ink, sw: 1.8 });
  [[230, 22, 230, 14], [252, 30, 258, 24], [208, 30, 202, 24], [254, 70, 260, 76], [206, 70, 200, 76]].forEach(([a, b, c, d]) => sb.line(a, b, c, d, { stroke: "#ca8a04", sw: 2 }));
  sb.line(246, 50, 300, 50, { stroke: C.ink, sw: 2 });
  sb.rect(300, 30, 100, 40, { fill: "#cbd5e1", stroke: C.ink, sw: 1.8 });
  sb.text(350, 55, "6 V battery", { size: 12.5 });
  sb.poly([[400, 50], [440, 50], [440, 118]], { stroke: C.ink, sw: 2, close: false });
  sb.line(440, 118, 372, 118, { stroke: C.ink, sw: 2 });
  sb.line(372, 118, 344, 100, { stroke: C.ink, sw: 2 });
  sb.poly([[330, 118], [178, 118], [178, 160]], { stroke: C.ink, sw: 2, close: false });
  sb.text(352, 142, "Switch", { size: 12.5 });
  sb.text(230, 98, "Bulb", { size: 12.5 });
  sb.text(64, 214, "Nail", { size: 12.5, anchor: "end" });
  sb.text(212, 158, "Cork", { size: 12, fill: C.grey, anchor: "start" });
  sb.text(145, 288, "Solution in a beaker", { size: 12.5 });
  return sb.build();
}

// ── 7. dry and wet HCl gas (Activity 2.9) ──
function hclGas(): Scene {
  const sb = new SceneBuilder(560, 290, "Making HCl gas and testing it with dry and with moist blue litmus paper");
  tube(sb, 50, 90, 56, 130, { level: 0.42, liquid: "#f1f5f9" });
  sb.rect(46, 82, 64, 12, { fill: "#b45309", stroke: C.ink, sw: 1.4 });
  [[66, 194], [80, 200], [94, 192]].forEach(([x, y]) => bubble(sb, x, y, 3));
  sb.poly([[78, 82], [78, 40], [300, 40]], { stroke: "#475569", sw: 3.4, close: false });
  // dry litmus: no change
  sb.rect(300, 104, 90, 26, { fill: "#93c5fd" });
  sb.text(345, 122, "Dry litmus", { size: 12.5 });
  sb.line(345, 46, 345, 96, { stroke: C.grey, sw: 1.2, dash: "4 3" });
  sb.text(345, 150, "stays blue", { size: 12.5, fill: C.blue });
  // wet litmus: turns red
  sb.rect(430, 104, 100, 26, { fill: "#fca5a5" });
  sb.text(480, 122, "Moist litmus", { size: 12.5 });
  sb.line(480, 46, 480, 96, { stroke: C.grey, sw: 1.2, dash: "4 3" });
  sb.line(300, 40, 480, 40, { stroke: "#475569", sw: 3.4 });
  sb.text(480, 150, "turns red", { size: 12.5, fill: C.red });
  sb.text(78, 242, "Solid NaCl +", { size: 12.5 });
  sb.text(78, 258, "conc. H_{2}SO_{4}", { size: 12.5 });
  sb.text(180, 30, "HCl gas", { size: 12.5, fill: C.grey });
  return sb.build();
}

// ── 8. pH scale ──
function phScale(): Scene {
  const sb = new SceneBuilder(740, 290, "The pH scale and the pH of some common substances");
  const x0 = 40, dx = 44, y0 = 100, h = 36;
  const cols = ["#b91c1c", "#dc2626", "#ea580c", "#f97316", "#f59e0b", "#eab308", "#a3e635", "#22c55e", "#34d399", "#2dd4bf", "#38bdf8", "#3b82f6", "#6366f1", "#7c3aed", "#6d28d9"];
  cols.forEach((c, i) => {
    sb.rect(x0 + i * dx - dx / 2, y0, dx, h, { fill: c });
    sb.text(x0 + i * dx, y0 + 24, String(i), { size: 14, fill: "#ffffff" });
  });
  sb.text(x0 + 2.5 * dx, 24, "Acidic", { size: 15, fill: C.red });
  sb.text(x0 + 7 * dx, 24, "Neutral", { size: 15, fill: C.green });
  sb.text(x0 + 11.5 * dx, 24, "Basic (alkaline)", { size: 15, fill: C.blue });
  sb.arrow(x0 + 5 * dx, 44, x0 - dx / 2 + 4, 44, { stroke: C.red, sw: 1.6 });
  sb.arrow(x0 + 9 * dx, 44, x0 + 14 * dx + dx / 2 - 4, 44, { stroke: C.blue, sw: 1.6 });
  sb.text(8, 66, "More H⁺ ions", { size: 12, anchor: "start", fill: C.red, bold: false });
  sb.text(732, 66, "More OH⁻ ions", { size: 12, anchor: "end", fill: C.blue, bold: false });
  // [pH, label, anchor, row] rows: 0 above the bar, 1 and 2 below it
  const marks: [number, string, "start" | "middle" | "end", number][] = [
    [2.2, "Lemon juice (2.2)", "end", 0], [5, "Coffee (5)", "middle", 0], [7.4, "Saliva before meal (7.4)", "start", 0],
    [0, "1 M HCl (0)", "start", 1], [4.2, "Tomato juice (4.2)", "middle", 1], [7, "Tap water (7)", "start", 1], [14, "1 M NaOH (14)", "end", 1],
    [5.8, "Saliva after meal (5.8)", "middle", 2],
  ];
  marks.forEach(([p, t, anchor, row]) => {
    const x = x0 + p * dx;
    if (row === 0) { sb.line(x, y0 - 2, x, 92, { stroke: C.grey, sw: 1.2 }); sb.text(x + (anchor === "end" ? 3 : anchor === "start" ? -3 : 0), 84, t, { size: 12.5, anchor }); }
    else { const y = 170 + (row - 1) * 40; sb.line(x, y0 + h + 2, x, y - 14, { stroke: C.grey, sw: 1.2 }); sb.text(x + (anchor === "end" ? 3 : anchor === "start" ? -3 : 0), y, t, { size: 12.5, anchor }); }
  });
  return sb.build();
}

// ── 9. pH in living things and in the environment ──
function phLife(): Scene {
  const sb = new SceneBuilder(700, 230, "pH ranges that matter: body, acid rain and tooth decay");
  const x0 = 30, dx = 44;
  for (let i = 0; i <= 14; i++) sb.text(x0 + i * dx, 28, String(i), { size: 13, fill: C.grey });
  sb.line(x0, 40, x0 + 14 * dx, 40, { stroke: C.grey, sw: 1.4 });
  for (let i = 0; i <= 14; i++) sb.line(x0 + i * dx, 40, x0 + i * dx, 46, { stroke: C.grey, sw: 1.2 });
  sb.rect(x0 + 7 * dx, 70, 0.8 * dx, 22, { rx: 4, fill: "#22c55e" });
  sb.text(x0 + 7.8 * dx + 8, 86, "Our body works at pH 7.0 to 7.8", { size: 12.5, anchor: "start" });
  sb.rect(x0, 112, 5.6 * dx, 22, { rx: 4, fill: "#f97316" });
  sb.text(x0 + 5.6 * dx + 8, 128, "Acid rain: pH less than 5.6", { size: 12.5, anchor: "start" });
  sb.rect(x0, 154, 5.5 * dx, 22, { rx: 4, fill: "#ef4444" });
  sb.text(x0 + 5.5 * dx + 8, 170, "Tooth decay starts: pH less than 5.5", { size: 12.5, anchor: "start" });
  sb.text(x0 + 7 * dx, 208, "Neutral = 7", { size: 12.5, fill: C.green });
  return sb.build();
}

// ── 10. chlor-alkali process ──
function chlorAlkali(): Scene {
  const sb = new SceneBuilder(560, 330, "Chlor-alkali process: electricity passed through brine");
  sb.rect(120, 130, 240, 150, { fill: "#e0f2fe", stroke: C.ink, sw: 2 });
  sb.rect(170, 70, 22, 160, { fill: "#6b7280", stroke: C.ink, sw: 1.4 });
  sb.rect(288, 70, 22, 160, { fill: "#6b7280", stroke: C.ink, sw: 1.4 });
  sb.poly([[181, 70], [181, 36], [226, 36]], { stroke: C.ink, sw: 2, close: false });
  sb.poly([[299, 70], [299, 36], [254, 36]], { stroke: C.ink, sw: 2, close: false });
  sb.rect(226, 24, 28, 24, { fill: "#cbd5e1", stroke: C.ink, sw: 1.6 });
  sb.text(212, 22, "+", { size: 18, fill: C.red });
  sb.text(268, 22, "−", { size: 18, fill: C.blue });
  [[158, 106], [152, 92], [160, 120]].forEach(([x, y]) => bubble(sb, x, y, 3.4));
  [[322, 106], [328, 92], [320, 120]].forEach(([x, y]) => bubble(sb, x, y, 3.4));
  sb.text(140, 96, "Cl_{2}", { size: 14, fill: C.green, anchor: "end" });
  sb.text(140, 114, "chlorine", { size: 12, fill: C.green, anchor: "end", bold: false });
  sb.text(342, 96, "H_{2}", { size: 14, fill: C.blue, anchor: "start" });
  sb.text(342, 114, "hydrogen", { size: 12, fill: C.blue, anchor: "start", bold: false });
  sb.text(160, 60, "Anode", { size: 12.5, anchor: "end" });
  sb.text(320, 60, "Cathode", { size: 12.5, anchor: "start" });
  sb.text(240, 202, "Brine", { size: 13, fill: C.blue });
  sb.text(240, 220, "(NaCl solution)", { size: 12, bold: false });
  sb.text(240, 306, "NaOH forms near the cathode", { size: 13, fill: C.red });
  return sb.build();
}

// ── 11. one salt, many chemicals ──
function saltHub(): Scene {
  const sb = new SceneBuilder(720, 380, "Common salt is the raw material for many useful chemicals");
  const box = (cx: number, cy: number, lines: string[], col: string, w = 190) => {
    const h = lines.length * 19 + 16;
    sb.rect(cx - w / 2, cy - h / 2, w, h, { rx: 9, fill: "#f8fafc", stroke: col, sw: 1.8 });
    lines.forEach((t, i) => sb.text(cx, cy - h / 2 + 24 + i * 19, t, { size: 13, fill: i === 0 ? col : C.ink, bold: i === 0 }));
    return { cx, cy, w, h };
  };
  const mid = box(360, 190, ["Common salt", "NaCl"], "#0f172a", 130);
  const a = box(110, 56, ["Sodium hydroxide", "NaOH (chlor-alkali)"], C.red);
  const b = box(610, 56, ["Chlorine and hydrogen", "Cl_{2} and H_{2} (chlor-alkali)"], C.green, 220);
  const c = box(110, 324, ["Washing soda", "Na_{2}CO_{3}.10H_{2}O"], C.purple);
  const d = box(610, 324, ["Baking soda", "NaHCO_{3}"], C.orange);
  const e = box(360, 330, ["Bleaching powder", "Ca(ClO)_{2} (from Cl_{2})"], C.teal, 200);
  [a, b, c, d].forEach((n) => sb.line(n.cx + (n.cx < 360 ? 60 : -60), n.cy + (n.cy < 190 ? 24 : -24), 360 + (n.cx < 360 ? -50 : 50), 190 + (n.cy < 190 ? -20 : 20), { stroke: C.grey, sw: 1.6 }));
  sb.line(360, 190 + 28, 360, 330 - 28, { stroke: C.grey, sw: 1.6 });
  void mid; void e;
  return sb.build();
}

// ── 12. water of crystallisation in copper sulphate (Activity 2.15) ──
function cuso4Water(): Scene {
  const sb = new SceneBuilder(600, 300, "Copper sulphate crystals lose their water of crystallisation on heating and regain it with water");
  tube(sb, 40, 50, 50, 130, { level: 0.16, liquid: "#2563eb" });
  sb.text(65, 252, "Blue crystals", { size: 12.5 });
  sb.text(65, 268, "CuSO_{4}.5H_{2}O", { size: 12.5, fill: C.blue });
  sb.arrow(120, 130, 214, 130, { stroke: C.red, sw: 2 });
  sb.text(167, 114, "Heat", { size: 13, fill: C.red });
  tube(sb, 250, 50, 50, 130, { level: 0.16, liquid: "#f8fafc" });
  [[256, 90], [262, 108], [292, 98], [288, 116]].forEach(([x, y]) => sb.circle(x, y, 2.6, { fill: "#93c5fd", stroke: "#2563eb", sw: 0.8 }));
  flame(sb, 275, 232, 26, 40, "#fdba74", "#ea580c");
  sb.text(275, 252, "White powder", { size: 12.5 });
  sb.text(275, 268, "(no water of crystallisation)", { size: 12, fill: C.grey });
  sb.arrow(472, 96, 380, 96, { stroke: C.blue, sw: 2 });
  sb.text(430, 80, "Add water", { size: 13, fill: C.blue });
  tube(sb, 490, 50, 50, 130, { level: 0.16, liquid: "#2563eb" });
  sb.text(515, 252, "Blue again", { size: 12.5 });
  return sb.build();
}

// ── 13. gypsum and plaster of Paris ──
function gypsumCycle(): Scene {
  const sb = new SceneBuilder(640, 230, "Gypsum and Plaster of Paris");
  const bx = (cx: number, lines: string[], col: string) => {
    sb.rect(cx - 100, 80, 200, 92, { rx: 10, fill: "#f8fafc", stroke: col, sw: 2 });
    lines.forEach((t, i) => sb.text(cx, 108 + i * 22, t, { size: 13.5, fill: i === 0 ? col : C.ink, bold: i === 0 }));
  };
  bx(120, ["Gypsum", "CaSO_{4}.2H_{2}O", "(2 water molecules)"], C.blue);
  bx(520, ["Plaster of Paris", "CaSO_{4}.½H_{2}O", "(half a water molecule)"], C.orange);
  sb.arrow(228, 112, 412, 112, { stroke: C.red, sw: 2 });
  sb.text(320, 100, "Heat at 373 K", { size: 13, fill: C.red });
  sb.arrow(412, 142, 228, 142, { stroke: C.blue, sw: 2 });
  sb.text(320, 164, "Add water: sets hard", { size: 13, fill: C.blue });
  sb.text(320, 30, "Plaster of Paris is kept in a moisture-proof container,", { size: 12.5, fill: C.grey, bold: false });
  sb.text(320, 48, "because moisture changes it back to gypsum.", { size: 12.5, fill: C.grey, bold: false });
  return sb.build();
}

// ── 14. soda-acid fire extinguisher (Group activity II) ──
function fireExtinguisher(): Scene {
  const sb = new SceneBuilder(560, 300, "A model soda-acid fire extinguisher: acid meets NaHCO₃ and carbon dioxide puts out the flame");
  sb.rect(110, 100, 130, 150, { rx: 6, fill: "#f8fafc", stroke: C.ink, sw: 2 });
  sb.rect(110, 150, 130, 100, { rx: 6, fill: "#bfdbfe" });
  sb.rect(110, 100, 130, 150, { rx: 6, stroke: C.ink, sw: 2 });
  sb.rect(150, 60, 50, 40, { fill: "#f8fafc", stroke: C.ink, sw: 2 });
  sb.rect(146, 52, 58, 10, { fill: "#b45309", stroke: C.ink, sw: 1.4 });
  sb.line(175, 62, 175, 120, { stroke: C.ink, sw: 1.4 });
  tube(sb, 158, 116, 34, 70, { level: 0.6, liquid: "#fef08a", sw: 1.6 });
  sb.poly([[204, 56], [330, 56], [330, 76]], { stroke: "#475569", sw: 4, close: false });
  sb.text(330, 96, "Nozzle", { size: 12.5, anchor: "start" });
  [[348, 112], [362, 126], [376, 140], [390, 150]].forEach(([x, y]) => bubble(sb, x, y, 4));
  sb.rect(440, 170, 20, 70, { fill: "#fef3c7", stroke: C.ink, sw: 1.6 });
  flame(sb, 450, 170, 14, 30, "#fdba74", "#ea580c");
  sb.text(450, 262, "Candle", { size: 12.5 });
  sb.text(175, 270, "NaHCO_{3} solution in a wash-bottle", { size: 12.5 });
  sb.text(175, 286, "Tube of dilute H_{2}SO_{4} hangs inside", { size: 12, fill: C.grey, bold: false });
  sb.text(76, 140, "Wash-bottle", { size: 12.5, anchor: "end" });
  return sb.build();
}

// ── 15. diluting an acid ──
function dilution(): Scene {
  const sb = new SceneBuilder(560, 290, "Always add the acid slowly to water, with stirring");
  sb.rect(40, 140, 150, 110, { fill: "#bfdbfe", stroke: C.ink, sw: 2 });
  sb.line(115, 60, 115, 140, { stroke: "#7c2d12", sw: 6 });
  [[115, 86], [115, 104], [115, 122]].forEach(([x, y]) => sb.circle(x, y, 3.4, { fill: "#ea580c" }));
  sb.text(115, 36, "Acid, poured slowly", { size: 12.5, fill: "#7c2d12" });
  sb.text(115, 272, "Acid into water: safe", { size: 13, fill: C.green });
  sb.rect(360, 140, 150, 110, { fill: "#fed7aa", stroke: C.ink, sw: 2 });
  sb.line(435, 60, 435, 140, { stroke: C.blue, sw: 6 });
  [[400, 124], [470, 116], [420, 104], [455, 130]].forEach(([x, y]) => sb.circle(x, y, 3, { fill: "#ea580c" }));
  sb.text(435, 36, "Water, poured in", { size: 12.5, fill: C.blue });
  sb.text(435, 272, "Water into acid: splashes", { size: 13, fill: C.red });
  sb.text(275, 170, "OR", { size: 14, fill: C.grey });
  return sb.build();
}

// ── 16. what acids and bases do ──
function reactionsMap(): Scene {
  const sb = new SceneBuilder(740, 300, "Reactions of acids and bases");
  const panel = (x: number, title: string, col: string, rows: [string, string][]) => {
    sb.rect(x, 10, 350, 280, { rx: 12, fill: "#f8fafc", stroke: col, sw: 2 });
    sb.text(x + 175, 38, title, { size: 15, fill: col });
    rows.forEach(([l, r], i) => {
      const y = 56 + i * 58;
      sb.text(x + 16, y + 16, l, { size: 12.5, anchor: "start" });
      sb.text(x + 16, y + 36, "gives  " + r, { size: 12.5, anchor: "start", fill: col });
    });
  };
  panel(10, "ACID reacts with", C.red, [["a metal", "salt + H_{2}"], ["a metal carbonate or hydrogencarbonate", "salt + CO_{2} + H_{2}O"], ["a metal oxide", "salt + H_{2}O"], ["a base (neutralisation)", "salt + H_{2}O"]]);
  panel(380, "BASE reacts with", C.blue, [["some metals (zinc, aluminium)", "salt + H_{2}"], ["a non-metal oxide", "salt + H_{2}O"], ["an acid (neutralisation)", "salt + H_{2}O"]]);
  return sb.build();
}

// ── 17. pH of salts ──
function saltPh(): Scene {
  const sb = new SceneBuilder(700, 300, "pH of salts depends on the strength of the acid and the base they come from");
  const col = (cx: number, title: string, from: string[], ex: string[], ph: string, c: string, fill: string) => {
    sb.rect(cx - 105, 20, 210, 250, { rx: 12, fill, stroke: c, sw: 2 });
    sb.text(cx, 46, title, { size: 15, fill: c });
    from.forEach((t, i) => sb.text(cx, 78 + i * 20, t, { size: 12.5 }));
    sb.text(cx, 142, ph, { size: 17, fill: c });
    ex.forEach((t, i) => sb.text(cx, 178 + i * 22, t, { size: 13, bold: false }));
  };
  col(118, "Neutral salts", ["Strong acid", "+ strong base"], ["NaCl", "KNO_{3}"], "pH = 7", C.green, "#f0fdf4");
  col(350, "Acidic salts", ["Strong acid", "+ weak base"], ["AlCl_{3}", "ZnSO_{4}", "CuSO_{4}"], "pH less than 7", C.red, "#fef2f2");
  col(582, "Basic salts", ["Strong base", "+ weak acid"], ["CH_{3}COONa", "Na_{2}CO_{3}", "NaHCO_{3}"], "pH more than 7", C.blue, "#eff6ff");
  return sb.build();
}

// ── 18. the whole chapter ──
function mindMap(): Scene {
  const W = 1000, H = 720, bw = 310;
  const sb = new SceneBuilder(W, H, "Acids, Bases and Salts: the whole chapter");
  const cols = ["#2563eb", "#b91c1c", "#0f766e", "#7c3aed", "#b45309", "#0369a1", "#15803d", "#a21caf"];
  const items: [string, string[]][] = [
    ["1. Indicators", ["Litmus, turmeric: natural", "Phenolphthalein, methyl orange", "Onion, vanilla, clove: smell"]],
    ["2. Acids and bases", ["Acid: H⁺(aq), sour, blue litmus red", "Base: OH⁻(aq), bitter, red litmus blue", "Alkali: a base soluble in water"]],
    ["3. Reactions", ["Acid + metal: salt + H_{2}", "Acid + carbonate: salt + CO_{2} + H_{2}O", "Acid + base: salt + water"]],
    ["4. Water and ions", ["Dry HCl gas is not acidic", "H⁺ + H_{2}O gives H_{3}O⁺", "Acid into water: exothermic"]],
    ["5. pH scale", ["0 to 14, universal indicator", "pH 7 neutral, below 7 acidic", "Higher H⁺, lower pH"]],
    ["6. pH in life", ["Body 7.0 to 7.8, acid rain below 5.6", "Tooth decay below 5.5", "Antacids, baking soda on stings"]],
    ["7. Salts", ["Families of salts", "Strong + strong: pH 7", "Chemicals from common salt"]],
    ["8. Useful salts", ["NaOH, Cl_{2}, H_{2}: chlor-alkali", "Bleaching powder, baking soda", "Washing soda, Plaster of Paris"]],
  ];
  const ys = [78, 238, 398, 558];
  const cx = W / 2, cy = H / 2;
  sb.ellipse(cx, cy, 112, 62, { fill: "#0f172a" });
  sb.text(cx, cy - 4, "Acids, Bases", { size: 17, fill: "#ffffff" });
  sb.text(cx, cy + 20, "and Salts", { size: 17, fill: "#ffffff" });
  items.forEach(([title, lines], i) => {
    const left = i < 4, y = ys[i % 4], x = left ? 8 : W - bw - 8, col = cols[i], h = 124;
    sb.curve([left ? x + bw : x, y], [(left ? x + bw : x) + (left ? 50 : -50), (y + cy) / 2], [left ? cx - 112 : cx + 112, cy], { stroke: col, sw: 2.2 });
    sb.rect(x, y - h / 2, bw, h, { rx: 12, fill: "#ffffff", stroke: col, sw: 2.2 });
    sb.text(x + 14, y - h / 2 + 26, title, { size: 15, fill: col, anchor: "start" });
    lines.forEach((l, k) => sb.text(x + 14, y - h / 2 + 54 + k * 24, l, { size: 13, fill: C.ink, anchor: "start", bold: false }));
  });
  return sb.build();
}

export const ACID_DIAGRAMS: Record<string, () => Scene> = {
  abs_indicators: indicatorChart,
  abs_zinc: zincAcid,
  abs_neutral: neutralisation,
  abs_cuo: cuoAcid,
  abs_limewater: limewater,
  abs_conduct: conduction,
  abs_hcl: hclGas,
  abs_phscale: phScale,
  abs_phlife: phLife,
  abs_chloralkali: chlorAlkali,
  abs_salthub: saltHub,
  abs_cuso4: cuso4Water,
  abs_gypsum: gypsumCycle,
  abs_fire: fireExtinguisher,
  abs_dilution: dilution,
  abs_reactions: reactionsMap,
  abs_saltph: saltPh,
  abs_mindmap: mindMap,
};
void textWidth; void ({} as Pt);
