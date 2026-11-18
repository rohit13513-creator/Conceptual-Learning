import { SceneBuilder, Scene, C } from "../components/sceneKit";
import { tube, flame, tubeRow } from "../components/chemApparatus";

// Diagrams for Class X Chemistry, "Metals and Non-metals". Every picture is a Scene (see components/sceneKit.ts),
// so scripts/check-mnm-diagrams.mts can check that no text touches a line, a shape or another text.

const bubble = (sb: SceneBuilder, x: number, y: number, r = 3) => sb.circle(x, y, r, { fill: "#ffffff", stroke: "#475569", sw: 1.2 });
const pale = "#f1f5f9";

// ── 1. heat travels along a metal wire (Activity 3.5) ──
function heatWire(): Scene {
  const sb = new SceneBuilder(560, 270, "Metals are good conductors of heat: the wax melts and the pin falls");
  sb.rect(40, 60, 16, 170, { fill: "#94a3b8", stroke: C.ink, sw: 1.4 });
  sb.rect(20, 226, 56, 12, { fill: "#64748b", stroke: C.ink, sw: 1.4 });
  sb.rect(56, 92, 24, 10, { fill: "#cbd5e1", stroke: C.ink, sw: 1.4 });
  sb.line(80, 97, 440, 97, { stroke: "#b45309", sw: 5 });
  sb.line(440, 97, 440, 128, { stroke: "#475569", sw: 2.6 });
  sb.circle(440, 97, 5, { fill: "#fde68a", stroke: "#ca8a04", sw: 1.2 });
  flame(sb, 130, 152, 22, 44, "#fdba74", "#ea580c");
  sb.rect(116, 152, 28, 18, { fill: "#cbd5e1", stroke: C.ink, sw: 1.4 });
  sb.text(66, 56, "Stand with clamp", { size: 12.5, anchor: "start" });
  sb.text(260, 76, "Aluminium or copper wire", { size: 12.5 });
  sb.text(440, 150, "Pin fixed with wax", { size: 12.5 });
  sb.text(130, 196, "Spirit lamp: heat the wire near the clamp", { size: 12.5, anchor: "start" });
  sb.arrow(160, 126, 400, 126, { stroke: C.red, sw: 1.8 });
  sb.text(280, 146, "Heat travels along the wire", { size: 12, fill: C.red, bold: false });
  return sb.build();
}

// ── 2. does the metal conduct electricity? (Activity 3.6) ──
function circuit(): Scene {
  const sb = new SceneBuilder(500, 250, "Metals are good conductors of electricity: the bulb glows");
  sb.rect(60, 100, 90, 44, { fill: "#cbd5e1", stroke: C.ink, sw: 1.8 });
  sb.text(105, 127, "Battery", { size: 12.5 });
  sb.poly([[60, 122], [30, 122], [30, 40], [190, 40]], { stroke: C.ink, sw: 2, close: false });
  sb.circle(210, 40, 18, { fill: "#fde047", stroke: C.ink, sw: 1.8 });
  [[210, 10, 210, 2], [234, 20, 242, 12], [186, 20, 178, 12], [238, 54, 246, 60], [182, 54, 174, 60]].forEach(([a, b, c, d]) => sb.line(a, b, c, d, { stroke: "#ca8a04", sw: 2 }));
  sb.poly([[228, 40], [440, 40], [440, 122], [370, 122]], { stroke: C.ink, sw: 2, close: false });
  sb.text(210, 78, "Bulb", { size: 12.5 });
  sb.rect(250, 108, 120, 28, { fill: "#d6a36b", stroke: C.ink, sw: 1.6 });
  sb.text(310, 126, "Metal tested", { size: 12.5 });
  sb.circle(250, 122, 5, { fill: "#ffffff", stroke: C.ink, sw: 1.6 });
  sb.circle(370, 122, 5, { fill: "#ffffff", stroke: C.ink, sw: 1.6 });
  sb.line(150, 122, 245, 122, { stroke: C.ink, sw: 2 });
  sb.text(250, 160, "A", { size: 14, fill: C.red });
  sb.text(370, 160, "B", { size: 14, fill: C.red });
  sb.text(250, 230, "Place the metal between terminals A and B", { size: 12.5, fill: C.grey });
  return sb.build();
}

// ── 3. magnesium and sulphur oxides with litmus (Activity 3.8) ──
function oxidesLitmus(): Scene {
  const sb = new SceneBuilder(620, 300, "Magnesium forms a basic oxide, sulphur forms an acidic oxide");
  // left: ash solution
  sb.line(40, 60, 100, 100, { stroke: "#64748b", sw: 5 });
  flame(sb, 112, 100, 30, 52, "#f8fafc", "#94a3b8");
  sb.text(8, 40, "Magnesium ribbon burns", { size: 12.5, anchor: "start" });
  tube(sb, 130, 140, 50, 110, { level: 0.55, liquid: "#e0f2fe" });
  sb.text(155, 272, "Ash in water", { size: 12.5 });
  sb.rect(205, 190, 24, 40, { fill: "#93c5fd" });
  sb.text(238, 206, "Red litmus", { size: 12, fill: C.grey, anchor: "start" });
  sb.text(238, 222, "turns blue", { size: 12, fill: C.blue, anchor: "start" });
  // right: sulphur fumes solution
  sb.rect(350, 112, 70, 10, { fill: "#94a3b8", stroke: C.ink, sw: 1.4 });
  flame(sb, 385, 112, 30, 44, "#93c5fd", "#2563eb");
  sb.text(385, 40, "Sulphur burns", { size: 12.5 });
  sb.text(385, 58, "(fumes collected in a tube)", { size: 12, fill: C.grey, bold: false });
  tube(sb, 440, 140, 50, 110, { level: 0.55, liquid: "#fef9c3" });
  sb.text(465, 272, "Fumes in water", { size: 12.5 });
  sb.rect(515, 190, 24, 40, { fill: "#fca5a5" });
  sb.text(546, 206, "Blue litmus", { size: 12, fill: C.grey, anchor: "start" });
  sb.text(546, 222, "turns red", { size: 12, fill: C.red, anchor: "start" });
  return sb.build();
}

// ── 4. metal with steam (Activity 3.10, Figure 3.3) ──
function steamApparatus(): Scene {
  const sb = new SceneBuilder(620, 300, "Action of steam on a metal: hydrogen gas is collected over water");
  sb.circle(80, 190, 46, { fill: "#e0f2fe", stroke: C.ink, sw: 2 });
  sb.rect(70, 100, 20, 46, { fill: "#f8fafc", stroke: C.ink, sw: 1.8 });
  flame(sb, 80, 262, 36, 44, "#fdba74", "#ea580c");
  sb.rect(60, 262, 40, 8, { fill: "#64748b" });
  sb.text(80, 82, "Water boils to give steam", { size: 12 });
  sb.poly([[90, 108], [180, 108], [180, 150], [300, 150]], { stroke: "#475569", sw: 3, close: false });
  sb.rect(230, 134, 120, 30, { fill: "#e5e7eb", stroke: C.ink, sw: 1.8 });
  sb.rect(256, 140, 56, 18, { fill: "#94a3b8" });
  sb.text(284, 180, "Metal sample", { size: 12 });
  flame(sb, 284, 232, 40, 40, "#fdba74", "#ea580c");
  sb.text(284, 252, "Heat the metal", { size: 12 });
  sb.poly([[350, 150], [420, 150], [420, 224]], { stroke: "#475569", sw: 3, close: false });
  sb.rect(380, 224, 190, 56, { fill: "#bfdbfe", stroke: C.ink, sw: 2 });
  tube(sb, 440, 150, 36, 100, { level: 0.2, liquid: "#bfdbfe" });
  [[452, 178], [460, 196]].forEach(([x, y]) => bubble(sb, x, y, 3));
  sb.text(560, 160, "Hydrogen", { size: 12.5, anchor: "end", fill: C.blue });
  sb.text(560, 176, "gas collects", { size: 12.5, anchor: "end", fill: C.blue });
  sb.text(475, 296, "Trough of water", { size: 12 });
  return sb.build();
}

// ── 5. reactions with water ──
function waterChart(): Scene {
  const sb = new SceneBuilder(620, 360, "Reaction of metals with water: reactivity decreases down the list");
  const rows: [string, string, string, string][] = [
    ["K, Na", "Violent with cold water. The hydrogen catches fire.", "#dc2626", "#ffffff"],
    ["Ca", "Reacts with cold water. It floats; no fire.", "#ea580c", "#ffffff"],
    ["Mg", "No reaction with cold water. Reacts with hot water; floats.", "#f59e0b", C.ink],
    ["Al, Zn, Fe", "No reaction with cold or hot water. React with steam.", "#eab308", C.ink],
    ["Pb, Cu, Ag, Au", "Do not react with water at all.", "#94a3b8", C.ink],
  ];
  rows.forEach(([m, d, fill, tc], i) => {
    const y = 20 + i * 62;
    sb.rect(10, y, 150, 50, { rx: 8, fill });
    sb.text(85, y + 31, m, { size: 15, fill: tc });
    sb.rect(168, y, 442, 50, { rx: 8, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.2 });
    sb.text(180, y + 31, d, { size: 12.5, anchor: "start", bold: false });
  });
  sb.arrow(612, 24, 612, 328, { stroke: C.grey, sw: 1.4 });
  return sb.build();
}

// ── 6. metals in dilute HCl (Activity 3.11) ──
const acidRates = (): Scene => tubeRow([
  { name: ["Mg", "fastest, hottest"], liquid: "#e0f2fe", level: 0.62, bubbles: 5, piece: true },
  { name: ["Al", "fast"], liquid: "#e0f2fe", level: 0.62, bubbles: 4, piece: true },
  { name: ["Zn", "slower"], liquid: "#e0f2fe", level: 0.62, bubbles: 3, piece: true },
  { name: ["Fe", "slowest"], liquid: "#e0f2fe", level: 0.62, bubbles: 1, piece: true },
  { name: ["Cu", "no bubbles"], liquid: "#e0f2fe", level: 0.62, piece: true },
], "Metals in dilute hydrochloric acid: Mg > Al > Zn > Fe; copper does not react", 14);

// ── 7. iron nail in copper sulphate, copper wire in iron sulphate (Activity 3.12) ──
function displacement(): Scene {
  const sb = new SceneBuilder(560, 300, "Iron displaces copper from copper sulphate; copper cannot displace iron");
  tube(sb, 70, 50, 70, 160, { level: 0.7, liquid: "#bbf7d0" });
  sb.line(104, 30, 104, 170, { stroke: "#6b7280", sw: 6 });
  sb.rect(100, 120, 8, 46, { fill: "#a16207" });
  sb.text(105, 232, "Iron nail in", { size: 12.5 });
  sb.text(105, 248, "copper sulphate", { size: 12.5 });
  sb.text(105, 270, "Blue fades to light green;", { size: 12, fill: C.red, bold: false });
  sb.text(105, 286, "brown copper coats the nail", { size: 12, fill: C.red, bold: false });
  tube(sb, 390, 50, 70, 160, { level: 0.7, liquid: "#bbf7d0" });
  sb.line(425, 30, 425, 170, { stroke: "#b45309", sw: 4 });
  sb.text(425, 232, "Copper wire in", { size: 12.5 });
  sb.text(425, 248, "iron sulphate", { size: 12.5 });
  sb.text(425, 270, "No change: no reaction", { size: 12, fill: C.green, bold: false });
  sb.text(280, 130, "OR", { size: 14, fill: C.grey });
  return sb.build();
}

// ── 8. the reactivity series ──
function reactivitySeries(): Scene {
  const sb = new SceneBuilder(620, 470, "The reactivity series and how each metal is obtained");
  const rows: [string, string, string][] = [
    ["K", "Potassium", "#b91c1c"], ["Na", "Sodium", "#dc2626"], ["Ca", "Calcium", "#ea580c"], ["Mg", "Magnesium", "#f97316"], ["Al", "Aluminium", "#f59e0b"],
    ["Zn", "Zinc", "#eab308"], ["Fe", "Iron", "#a3a322"], ["Pb", "Lead", "#65a30d"], ["H", "Hydrogen (for comparison)", "#94a3b8"],
    ["Cu", "Copper", "#0d9488"], ["Hg", "Mercury", "#0891b2"], ["Ag", "Silver", "#2563eb"], ["Au", "Gold", "#7c3aed"],
  ];
  rows.forEach(([s, n, c], i) => {
    const y = 24 + i * 32;
    sb.rect(16, y, 56, 26, { rx: 6, fill: c });
    sb.text(44, y + 19, s, { size: 14, fill: "#ffffff" });
    sb.text(82, y + 19, n, { size: 13, anchor: "start", bold: i !== 8 });
  });
  sb.text(150, 14, "Most reactive", { size: 12, fill: C.red, anchor: "middle" });
  sb.text(150, 458, "Least reactive", { size: 12, fill: C.blue, anchor: "middle" });
  const grp = (from: number, to: number, label: string[], col: string) => {
    const y1 = 24 + from * 32, y2 = 24 + to * 32 + 26;
    sb.line(330, y1, 330, y2, { stroke: col, sw: 3 });
    label.forEach((t, i) => sb.text(346, (y1 + y2) / 2 - (label.length - 1) * 9 + i * 18 + 4, t, { size: 12.5, anchor: "start", fill: col }));
  };
  grp(0, 4, ["Electrolysis of the", "molten compound"], C.red);
  grp(5, 7, ["Roast or calcine,", "then reduce with carbon"], C.orange);
  grp(9, 10, ["Heat the ore"], C.teal);
  grp(11, 12, ["Often found free", "(native state)"], C.blue);
  return sb.build();
}

// ── 9. sulphur dioxide and litmus (Exercise 9) ──
function so2Litmus(): Scene {
  const sb = new SceneBuilder(560, 300, "Sulphur dioxide: no action on dry litmus, turns moist blue litmus red");
  sb.line(60, 238, 180, 214, { stroke: "#64748b", sw: 5 });
  sb.circle(188, 212, 8, { fill: "#facc15", stroke: C.ink, sw: 1.2 });
  flame(sb, 188, 204, 24, 44, "#93c5fd", "#2563eb");
  sb.poly([[150, 60], [150, 164], [226, 164], [226, 60]], { stroke: "#475569", sw: 2.4, close: false });
  sb.poly([[150, 60], [226, 60]], { stroke: "#475569", sw: 2.4, close: false });
  sb.text(188, 40, "Test tube held upside down", { size: 12 });
  sb.text(188, 270, "Sulphur burning on a spatula", { size: 12.5 });
  sb.rect(310, 70, 90, 28, { fill: "#93c5fd" });
  sb.text(355, 116, "Dry blue litmus", { size: 12.5 });
  sb.text(355, 134, "no change", { size: 12.5, fill: C.blue });
  sb.rect(430, 70, 100, 28, { fill: "#fca5a5" });
  sb.text(480, 116, "Moist blue litmus", { size: 12.5 });
  sb.text(480, 134, "turns red", { size: 12.5, fill: C.red });
  sb.text(420, 200, "SO_{2} + H_{2}O → H_{2}SO_{3} (an acid)", { size: 13, fill: C.ink });
  sb.text(420, 222, "forms only when water is present", { size: 12, fill: C.grey, bold: false });
  return sb.build();
}

// ── atoms with shells, used for the ionic bond pictures ──
function atom(sb: SceneBuilder, cx: number, cy: number, shells: number[], sym: string, o: { scale?: number; gapAt?: number; extra?: number; hide?: boolean } = {}) {
  const sc = o.scale ?? 1;
  const radii = [20, 32, 44].map((r) => r * sc);
  sb.circle(cx, cy, 11 * sc, { fill: "#fef3c7" });
  sb.text(cx, cy + 4 * sc, sym, { size: 11 * sc + 1, bold: true });
  shells.forEach((n, k) => {
    const r = radii[k];
    sb.circle(cx, cy, r, { stroke: "#cbd5e1", sw: 1.2 });
    const slots = n === 8 || (k === 2 && n >= 7) ? 8 : Math.max(n, 1);
    for (let i = 0; i < n; i++) {
      const a = (k === 2 && n < 8 && n >= 7 ? 1 + i : i) * ((Math.PI * 2) / slots) + (n === 1 ? 0 : Math.PI / 8);
      const ang = n === 1 ? (o.gapAt ?? 0) : a;
      sb.circle(cx + r * Math.cos(ang), cy + r * Math.sin(ang), 2.8 * sc + 0.6, { fill: "#2563eb" });
    }
  });
  if (o.extra !== undefined) {
    const r = radii[shells.length - 1];
    sb.circle(cx + r * Math.cos(o.extra), cy + r * Math.sin(o.extra), 3.4 * sc, { fill: C.red });
  }
}

// ── 10. sodium chloride ──
function naclFormation(): Scene {
  const sb = new SceneBuilder(740, 250, "Formation of sodium chloride: sodium gives one electron to chlorine");
  atom(sb, 80, 110, [2, 8, 1], "Na", { gapAt: 0 });
  atom(sb, 230, 110, [2, 8, 7], "Cl");
  sb.arrow(112, 60, 198, 60, { stroke: C.red, sw: 1.8 });
  sb.text(155, 48, "e⁻", { size: 13, fill: C.red });
  sb.text(80, 190, "Sodium atom", { size: 12.5 });
  sb.text(80, 206, "2, 8, 1", { size: 12.5, fill: C.grey });
  sb.text(230, 190, "Chlorine atom", { size: 12.5 });
  sb.text(230, 206, "2, 8, 7", { size: 12.5, fill: C.grey });
  sb.arrow(300, 110, 380, 110, { stroke: C.ink, sw: 2 });
  atom(sb, 470, 110, [2, 8], "Na");
  atom(sb, 620, 110, [2, 8, 7], "Cl", { extra: Math.PI });
  sb.text(470, 190, "Sodium cation, Na⁺", { size: 12.5 });
  sb.text(470, 206, "2, 8", { size: 12.5, fill: C.grey });
  sb.text(620, 190, "Chloride anion, Cl⁻", { size: 12.5 });
  sb.text(620, 206, "2, 8, 8", { size: 12.5, fill: C.grey });
  sb.text(545, 232, "attract each other: NaCl", { size: 12.5, fill: C.green });
  return sb.build();
}

// ── 11. magnesium chloride ──
function mgcl2Formation(): Scene {
  const sb = new SceneBuilder(830, 250, "Formation of magnesium chloride: magnesium gives one electron to each of two chlorine atoms");
  atom(sb, 70, 110, [2, 8, 7], "Cl", { scale: 0.8 });
  atom(sb, 190, 110, [2, 8, 2], "Mg", { scale: 0.8, gapAt: 0 });
  atom(sb, 310, 110, [2, 8, 7], "Cl", { scale: 0.8 });
  sb.arrow(166, 58, 100, 58, { stroke: C.red, sw: 1.6 });
  sb.arrow(214, 58, 280, 58, { stroke: C.red, sw: 1.6 });
  sb.text(133, 48, "e⁻", { size: 12.5, fill: C.red });
  sb.text(247, 48, "e⁻", { size: 12.5, fill: C.red });
  sb.text(70, 180, "Cl: 2, 8, 7", { size: 12.5 });
  sb.text(190, 180, "Mg: 2, 8, 2", { size: 12.5 });
  sb.text(310, 180, "Cl: 2, 8, 7", { size: 12.5 });
  sb.arrow(385, 110, 450, 110, { stroke: C.ink, sw: 2 });
  atom(sb, 530, 110, [2, 8, 7], "Cl", { scale: 0.8, extra: 0 });
  atom(sb, 650, 110, [2, 8], "Mg", { scale: 0.8 });
  atom(sb, 770, 110, [2, 8, 7], "Cl", { scale: 0.8, extra: Math.PI });
  sb.text(530, 180, "Cl⁻: 2, 8, 8", { size: 12.5 });
  sb.text(650, 180, "Mg²⁺: 2, 8", { size: 12.5 });
  sb.text(770, 180, "Cl⁻: 2, 8, 8", { size: 12.5 });
  sb.text(650, 222, "one Mg²⁺ and two Cl⁻ form MgCl_{2}", { size: 13, fill: C.green });
  return sb.build();
}

// ── 12. electron dots and the formation of Na2O and MgO ──
function dotsAndOxides(): Scene {
  const sb = new SceneBuilder(740, 330, "Electron-dot structures, and the formation of Na₂O and MgO");
  const dots = (cx: number, cy: number, sym: string, n: number) => {
    sb.text(cx, cy + 6, sym, { size: 18 });
    const pos: [number, number][] = [[0, -17], [0, 17], [-17, 0], [17, 0]];
    const order: number[] = n === 1 ? [3] : n === 2 ? [0, 1] : [0, 1, 2, 3];
    const dotsAt: [number, number][] = [];
    order.forEach((i) => dotsAt.push(pos[i]));
    if (n === 6) { dotsAt.push([-6, -17], [6, 17]); }
    if (n === 6) { dotsAt.length = 0; [[-6, -17], [6, -17], [-6, 17], [6, 17], [-17, 0], [17, 0]].forEach((p) => dotsAt.push(p as [number, number])); }
    dotsAt.forEach(([dx, dy]) => sb.circle(cx + dx, cy + dy, 2.6, { fill: C.blue }));
  };
  dots(80, 40, "Na", 1); sb.text(80, 80, "1 outer electron", { size: 12 });
  dots(250, 40, "Mg", 2); sb.text(250, 80, "2 outer electrons", { size: 12 });
  dots(420, 40, "O", 6); sb.text(420, 80, "6 outer electrons", { size: 12 });
  // Na2O
  atom(sb, 70, 190, [2, 8, 1], "Na", { scale: 0.62, gapAt: 0 });
  atom(sb, 150, 190, [2, 6], "O", { scale: 0.62 });
  atom(sb, 230, 190, [2, 8, 1], "Na", { scale: 0.62, gapAt: Math.PI });
  sb.arrow(280, 190, 320, 190, { stroke: C.ink, sw: 2 });
  sb.text(150, 250, "Na₂O: two Na⁺ and one O²⁻", { size: 12.5, fill: C.green });
  atom(sb, 370, 190, [2, 8], "Na", { scale: 0.62 });
  atom(sb, 450, 190, [2, 8], "O", { scale: 0.62 });
  atom(sb, 530, 190, [2, 8], "Na", { scale: 0.62 });
  sb.text(370, 232, "Na⁺", { size: 12.5 });
  sb.text(450, 232, "O²⁻", { size: 12.5 });
  sb.text(530, 232, "Na⁺", { size: 12.5 });
  // MgO
  atom(sb, 640, 80, [2, 8, 2], "Mg", { scale: 0.52, gapAt: 0 });
  atom(sb, 700, 80, [2, 6], "O", { scale: 0.52 });
  sb.text(670, 130, "Mg + O", { size: 12.5 });
  sb.arrow(670, 146, 670, 176, { stroke: C.ink, sw: 2 });
  atom(sb, 640, 220, [2, 8], "Mg", { scale: 0.52 });
  atom(sb, 700, 220, [2, 8], "O", { scale: 0.52 });
  sb.text(640, 258, "Mg²⁺", { size: 12 });
  sb.text(700, 258, "O²⁻", { size: 12 });
  sb.text(670, 282, "MgO", { size: 12.5, fill: C.green });
  sb.text(260, 300, "Metal gives electrons, non-metal takes them: an ionic compound forms", { size: 12.5, fill: C.grey, bold: false });
  return sb.build();
}

// ── 13. melting and boiling points of ionic compounds (Table 3.4) ──
function meltingPoints(): Scene {
  const sb = new SceneBuilder(620, 300, "Ionic compounds have high melting and boiling points (in kelvin)");
  const rows: [string, number, number][] = [["NaCl", 1074, 1686], ["LiCl", 887, 1600], ["CaCl_{2}", 1045, 1900], ["CaO", 2850, 3120], ["MgCl_{2}", 981, 1685]];
  const x0 = 70, k = 0.16;
  rows.forEach(([n, m, b], i) => {
    const y = 26 + i * 52;
    sb.text(x0 - 10, y + 22, n, { size: 13, anchor: "end" });
    sb.rect(x0, y, m * k, 18, { rx: 3, fill: "#60a5fa" });
    sb.text(x0 + m * k + 6, y + 14, String(m), { size: 12, anchor: "start" });
    sb.rect(x0, y + 22, b * k, 18, { rx: 3, fill: "#f87171" });
    sb.text(x0 + b * k + 6, y + 36, String(b), { size: 12, anchor: "start" });
  });
  sb.rect(380, 270, 14, 14, { fill: "#60a5fa" });
  sb.text(400, 282, "Melting point", { size: 12.5, anchor: "start" });
  sb.rect(500, 270, 14, 14, { fill: "#f87171" });
  sb.text(520, 282, "Boiling point", { size: 12.5, anchor: "start" });
  return sb.build();
}

// ── 14. conduction in the solid, molten and dissolved states ──
function ionicConduction(): Scene {
  const sb = new SceneBuilder(660, 270, "An ionic compound conducts electricity only when its ions can move");
  const panel = (x: number, title: string, grid: boolean, glow: boolean, note: string[]) => {
    sb.rect(x, 20, 190, 130, { rx: 8, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.4 });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      const cx = x + 30 + i * 43 + (grid ? 0 : ((i * 7 + j * 11) % 9) - 4), cy = 52 + j * 36 + (grid ? 0 : ((i * 5 + j * 13) % 9) - 4);
      sb.circle(cx, cy, 8, { fill: (i + j) % 2 ? "#93c5fd" : "#fca5a5" });
    }
    sb.circle(x + 95, 188, 15, { fill: glow ? "#fde047" : "#e5e7eb", stroke: C.ink, sw: 1.6 });
    if (glow) [[0, -24], [18, -18], [-18, -18]].forEach(([dx, dy]) => sb.line(x + 95 + dx * 0.8, 188 + dy * 0.8, x + 95 + dx * 1.25, 188 + dy * 1.25, { stroke: "#ca8a04", sw: 2 }));
    sb.text(x + 95, 224, title, { size: 13 });
    note.forEach((t, i) => sb.text(x + 95, 242 + i * 16, t, { size: 12, fill: glow ? C.green : C.red, bold: false }));
  };
  panel(10, "Solid", true, false, ["Ions fixed: bulb off"]);
  panel(235, "Molten", false, true, ["Ions free: bulb glows"]);
  panel(460, "In water", false, true, ["Ions free: bulb glows"]);
  return sb.build();
}

// ── 15. flow of metallurgy ──
function metallurgyFlow(): Scene {
  const sb = new SceneBuilder(640, 430, "Steps in getting a pure metal from its ore");
  const box = (cx: number, cy: number, w: number, lines: string[], col: string) => {
    const h = lines.length * 18 + 16;
    sb.rect(cx - w / 2, cy - h / 2, w, h, { rx: 9, fill: "#f8fafc", stroke: col, sw: 2 });
    lines.forEach((t, i) => sb.text(cx, cy - h / 2 + 24 + i * 18, t, { size: 13, fill: i === 0 ? col : C.ink, bold: i === 0 }));
    return h;
  };
  box(320, 34, 300, ["Mining", "digging the ore out of the earth"], C.blue);
  sb.arrow(320, 64, 320, 92, { stroke: C.grey, sw: 2 });
  box(320, 122, 340, ["Enrichment of the ore", "removing the gangue (soil, sand)"], C.teal);
  sb.arrow(320, 152, 320, 180, { stroke: C.grey, sw: 2 });
  box(320, 206, 200, ["Extracting the metal"], C.red);
  sb.line(320, 228, 320, 246, { stroke: C.grey, sw: 1.6 });
  sb.line(110, 246, 530, 246, { stroke: C.grey, sw: 1.6 });
  [[110, "Low reactivity", ["Heating the ore"], C.teal], [320, "Medium reactivity", ["Roasting or calcination,", "then reduction"], C.orange], [530, "High reactivity", ["Electrolytic reduction", "of molten compound"], C.red]].forEach(([x, t, lines, col]: any) => {
    sb.line(x, 246, x, 268, { stroke: C.grey, sw: 1.6 });
    box(x, 268 + (lines.length * 18 + 34) / 2, 190, [t, ...lines], col);
  });
  sb.arrow(320, 340, 320, 376, { stroke: C.grey, sw: 2 });
  box(320, 400, 300, ["Refining", "electrolytic refining gives pure metal"], C.purple);
  return sb.build();
}

// ── 16. thermit reaction ──
function thermit(): Scene {
  const sb = new SceneBuilder(520, 270, "Thermit reaction: molten iron joins two railway tracks");
  sb.poly([[170, 40], [350, 40], [320, 120], [200, 120]], { fill: "#9ca3af", stroke: C.ink, sw: 1.8 });
  sb.rect(190, 50, 140, 22, { fill: "#f97316" });
  sb.text(260, 31, "Fe₂O₃ + 2Al", { size: 13 });
  sb.line(260, 120, 260, 190, { stroke: "#f97316", sw: 6 });
  sb.rect(70, 190, 170, 24, { fill: "#64748b", stroke: C.ink, sw: 1.6 });
  sb.rect(280, 190, 170, 24, { fill: "#64748b", stroke: C.ink, sw: 1.6 });
  sb.rect(240, 190, 40, 24, { fill: "#f97316" });
  sb.text(155, 234, "Railway track", { size: 12.5 });
  sb.text(365, 234, "Railway track", { size: 12.5 });
  sb.text(260, 256, "Molten iron fills the gap and welds them", { size: 12.5, fill: C.red });
  sb.text(500, 150, "Fe₂O₃ + 2Al →", { size: 12.5, anchor: "end" });
  sb.text(500, 168, "2Fe + Al₂O₃ + heat", { size: 12.5, anchor: "end" });
  return sb.build();
}

// ── 17. electrolysis of molten sodium chloride ──
function moltenNacl(): Scene {
  const sb = new SceneBuilder(560, 330, "Sodium is obtained by electrolysis of molten sodium chloride");
  sb.rect(120, 130, 240, 140, { fill: "#fed7aa", stroke: C.ink, sw: 2 });
  sb.rect(170, 70, 22, 150, { fill: "#6b7280", stroke: C.ink, sw: 1.4 });
  sb.rect(288, 70, 22, 150, { fill: "#6b7280", stroke: C.ink, sw: 1.4 });
  sb.poly([[181, 70], [181, 36], [226, 36]], { stroke: C.ink, sw: 2, close: false });
  sb.poly([[299, 70], [299, 36], [254, 36]], { stroke: C.ink, sw: 2, close: false });
  sb.rect(226, 24, 28, 24, { fill: "#cbd5e1", stroke: C.ink, sw: 1.6 });
  sb.text(212, 22, "+", { size: 18, fill: C.red });
  sb.text(268, 22, "−", { size: 18, fill: C.blue });
  [[158, 106], [152, 92], [160, 120]].forEach(([x, y]) => bubble(sb, x, y, 3.4));
  sb.text(140, 96, "Cl_{2}", { size: 14, fill: C.green, anchor: "end" });
  sb.text(342, 96, "Na", { size: 14, fill: C.ink, anchor: "start" });
  sb.text(342, 114, "(molten, collects)", { size: 12, bold: false, anchor: "start" });
  sb.text(160, 60, "Anode", { size: 12.5, anchor: "end" });
  sb.text(320, 60, "Cathode", { size: 12.5, anchor: "start" });
  sb.text(240, 206, "Molten NaCl", { size: 13, fill: "#9a3412" });
  sb.text(240, 292, "Cathode: Na⁺ + e⁻ → Na", { size: 12.5, fill: C.ink });
  sb.text(240, 310, "Anode: 2Cl⁻ → Cl₂ + 2e⁻", { size: 12.5, fill: C.ink });
  return sb.build();
}

// ── 18. electrolytic refining of copper (Figure 3.12) ──
function refining(): Scene {
  const sb = new SceneBuilder(580, 340, "Electrolytic refining of copper");
  sb.rect(100, 130, 380, 150, { fill: "#bfdbfe", stroke: C.ink, sw: 2 });
  sb.rect(150, 70, 50, 180, { fill: "#b45309", stroke: C.ink, sw: 1.4 });
  sb.rect(390, 70, 12, 180, { fill: "#ea580c", stroke: C.ink, sw: 1.4 });
  sb.poly([[175, 70], [175, 36], [262, 36]], { stroke: C.ink, sw: 2, close: false });
  sb.poly([[396, 70], [396, 36], [318, 36]], { stroke: C.ink, sw: 2, close: false });
  sb.rect(262, 24, 56, 24, { fill: "#cbd5e1", stroke: C.ink, sw: 1.6 });
  sb.text(240, 24, "+", { size: 18, fill: C.red });
  sb.text(340, 24, "−", { size: 18, fill: C.blue });
  [[160, 262], [176, 266], [192, 262], [168, 268], [184, 270]].forEach(([x, y]) => sb.circle(x, y, 2.6, { fill: "#451a03" }));
  sb.text(215, 268, "Anode mud", { size: 12, fill: "#451a03", anchor: "start" });
  sb.arrow(210, 160, 380, 160, { stroke: C.red, sw: 1.8 });
  sb.text(295, 150, "Cu²⁺ ions move", { size: 12.5, fill: C.red });
  sb.text(295, 200, "Solution of acidified", { size: 12.5, fill: C.blue });
  sb.text(295, 218, "copper sulphate", { size: 12.5, fill: C.blue });
  sb.text(175, 306, "Anode: impure copper", { size: 12.5 });
  sb.text(396, 306, "Cathode: pure copper strip", { size: 12.5 });
  return sb.build();
}

// ── 19. conditions for rusting (Activity 3.14, Figure 3.13) ──
function rustTubes(): Scene {
  const sb = new SceneBuilder(560, 300, "Iron rusts only when both air and water are present");
  const nail = (cx: number, top: number, len: number, rust = false) => { sb.line(cx, top, cx, top + len, { stroke: rust ? "#92400e" : "#6b7280", sw: 5 }); sb.circle(cx, top - 1, 4, { fill: rust ? "#b45309" : "#6b7280" }); };
  const col = (i: number) => 30 + i * 175;
  // A: water and air
  tube(sb, col(0) + 20, 50, 60, 150, { level: 0.55, liquid: "#bfdbfe" });
  nail(col(0) + 50, 100, 80, true);
  sb.rect(col(0) + 16, 42, 68, 8, { fill: "#b45309", stroke: C.ink, sw: 1.2 });
  sb.text(col(0) + 50, 226, "A: water + air", { size: 12.5 });
  sb.text(col(0) + 50, 244, "Nail rusts", { size: 12.5, fill: C.red });
  // B: boiled water and oil
  tube(sb, col(1) + 20, 50, 60, 150, { level: 0.55, liquid: "#bfdbfe" });
  sb.rect(col(1) + 22, 118, 56, 12, { fill: "#fde68a" });
  nail(col(1) + 50, 100, 80);
  sb.rect(col(1) + 16, 42, 68, 8, { fill: "#b45309", stroke: C.ink, sw: 1.2 });
  sb.text(col(1) + 50, 226, "B: boiled water", { size: 12.5 });
  sb.text(col(1) + 50, 244, "+ oil (no air)", { size: 12.5 });
  sb.text(col(1) + 50, 262, "No rust", { size: 12.5, fill: C.green });
  // C: dry air
  tube(sb, col(2) + 20, 50, 60, 150, { level: 0.1, liquid: "#f1f5f9" });
  nail(col(2) + 50, 80, 90);
  sb.rect(col(2) + 16, 42, 68, 8, { fill: "#b45309", stroke: C.ink, sw: 1.2 });
  sb.text(col(2) + 50, 226, "C: dry air", { size: 12.5 });
  sb.text(col(2) + 50, 244, "(anhydrous CaCl₂)", { size: 12.5 });
  sb.text(col(2) + 50, 262, "No rust", { size: 12.5, fill: C.green });
  return sb.build();
}

// ── 20. metals and non-metals compared ──
function compareChart(): Scene {
  const sb = new SceneBuilder(620, 360, "Metals and non-metals: the general pattern");
  const rows: [string, string, string][] = [
    ["Physical state", "Solids (mercury is a liquid)", "Solids or gases (bromine is a liquid)"],
    ["Lustre", "Shining", "Dull (iodine and graphite shine)"],
    ["Hardness", "Hard (sodium is soft)", "Soft (diamond is hard)"],
    ["Beaten and drawn", "Malleable and ductile", "Brittle, not malleable or ductile"],
    ["Heat and electricity", "Good conductors", "Poor conductors (graphite conducts)"],
    ["Sound", "Sonorous", "Not sonorous"],
    ["Oxides", "Basic (some amphoteric)", "Acidic or neutral"],
    ["Ions formed", "Positive, by losing electrons", "Negative, by gaining electrons"],
  ];
  sb.rect(150, 8, 220, 30, { rx: 6, fill: "#2563eb" }); sb.text(260, 29, "Metals", { size: 14, fill: "#ffffff" });
  sb.rect(380, 8, 232, 30, { rx: 6, fill: "#ea580c" }); sb.text(496, 29, "Non-metals", { size: 14, fill: "#ffffff" });
  rows.forEach(([a, m, n], i) => {
    const y = 44 + i * 39;
    sb.rect(4, y, 640 - 40, 34, { rx: 5, fill: i % 2 ? "#f8fafc" : "#eef2ff" });
    sb.text(10, y + 22, a, { size: 12.5, anchor: "start" });
    sb.text(260, y + 22, m, { size: 11.5, bold: false });
    sb.text(496, y + 22, n, { size: 11.5, bold: false });
  });
  return sb.build();
}

// ── 21. the whole chapter ──
function mindMap(): Scene {
  const W = 1000, H = 720, bw = 310;
  const sb = new SceneBuilder(W, H, "Metals and Non-metals: the whole chapter");
  const cols = ["#2563eb", "#b91c1c", "#0f766e", "#7c3aed", "#b45309", "#0369a1", "#15803d", "#a21caf"];
  const items: [string, string[]][] = [
    ["1. Physical properties", ["Metals: lustre, malleable, ductile", "Conduct heat and electricity", "Non-metals: dull, brittle, insulators"]],
    ["2. Metals react with", ["Oxygen: basic oxide, amphoteric", "Water: oxide or hydroxide + H_{2}", "Dilute acid: salt + H_{2}"]],
    ["3. Displacement", ["More reactive metal displaces", "a less reactive metal from salt", "K Na Ca Mg Al Zn Fe Pb H Cu Hg Ag Au"]],
    ["4. Non-metals", ["Form acidic or neutral oxides", "Do not displace H_{2} from acids", "Gain electrons: negative ions"]],
    ["5. Ionic bond", ["Metal gives electrons", "Non-metal takes electrons", "Na⁺ + Cl⁻ gives NaCl"]],
    ["6. Ionic compounds", ["Hard, brittle solids", "High melting and boiling points", "Conduct when molten or dissolved"]],
    ["7. Metallurgy", ["Mining, enrichment, extraction", "Roasting, calcination, reduction", "Electrolytic refining"]],
    ["8. Corrosion and alloys", ["Rust needs air and water", "Galvanising, painting, alloying", "Alloy: homogeneous mixture"]],
  ];
  const ys = [78, 238, 398, 558];
  const cx = W / 2, cy = H / 2;
  sb.ellipse(cx, cy, 112, 62, { fill: "#0f172a" });
  sb.text(cx, cy - 4, "Metals and", { size: 17, fill: "#ffffff" });
  sb.text(cx, cy + 20, "Non-metals", { size: 17, fill: "#ffffff" });
  items.forEach(([title, lines], i) => {
    const left = i < 4, y = ys[i % 4], x = left ? 8 : W - bw - 8, col = cols[i], h = 124;
    sb.curve([left ? x + bw : x, y], [(left ? x + bw : x) + (left ? 50 : -50), (y + cy) / 2], [left ? cx - 112 : cx + 112, cy], { stroke: col, sw: 2.2 });
    sb.rect(x, y - h / 2, bw, h, { rx: 12, fill: "#ffffff", stroke: col, sw: 2.2 });
    sb.text(x + 14, y - h / 2 + 26, title, { size: 15, fill: col, anchor: "start" });
    lines.forEach((l, k) => sb.text(x + 14, y - h / 2 + 54 + k * 24, l, { size: 13, fill: C.ink, anchor: "start", bold: false }));
  });
  return sb.build();
}

export const MNM_DIAGRAMS: Record<string, () => Scene> = {
  mnm_heat: heatWire,
  mnm_circuit: circuit,
  mnm_compare: compareChart,
  mnm_oxides: oxidesLitmus,
  mnm_steam: steamApparatus,
  mnm_water: waterChart,
  mnm_acid: acidRates,
  mnm_displace: displacement,
  mnm_series: reactivitySeries,
  mnm_so2: so2Litmus,
  mnm_nacl: naclFormation,
  mnm_mgcl2: mgcl2Formation,
  mnm_dots: dotsAndOxides,
  mnm_mp: meltingPoints,
  mnm_conduct: ionicConduction,
  mnm_flow: metallurgyFlow,
  mnm_thermit: thermit,
  mnm_moltennacl: moltenNacl,
  mnm_refining: refining,
  mnm_rust: rustTubes,
  mnm_mindmap: mindMap,
};
void pale;
