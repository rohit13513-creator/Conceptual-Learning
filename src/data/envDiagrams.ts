import { SceneBuilder, C } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";

// Diagrams for Class X Science, "Our Environment" (NCERT Chapter 13). Every picture is a Scene (see components/sceneKit.ts),
// so scripts/check-env-diagrams.mts can check that no text touches a line, a shape or another text.
// Texts: O_{2} is a subscript.

const GREEN = "#16a34a", LGREEN = "#dcfce7", BLUE = "#2563eb", LBLUE = "#dbeafe", ORANGE = "#ea580c", LORANGE = "#ffedd5", PURPLE = "#7c3aed", LPURPLE = "#ede9fe", GREY = "#64748b", LGREY = "#f1f5f9", RED = "#dc2626", LRED = "#fee2e2", YELLOW = "#facc15";

/** a rounded box with centred lines of text */
function box(sb: SceneBuilder, x: number, y: number, w: number, h: number, lines: string[], o: { fill?: string; stroke?: string; size?: number; bold?: boolean[] } = {}) {
  sb.rect(x, y, w, h, { rx: 8, fill: o.fill ?? "#ffffff", stroke: o.stroke ?? C.ink, sw: 1.8 });
  const size = o.size ?? 13, lh = size + 4;
  const y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  lines.forEach((t, i) => sb.text(x + w / 2, y0 + i * lh, t, { size, bold: o.bold ? o.bold[i] : i === 0 }));
}

// ── 1. components of an ecosystem ──
function components(): Scene {
  const sb = new SceneBuilder(660, 360, "An ecosystem: living (biotic) and non-living (abiotic) components");
  sb.text(330, 26, "ECOSYSTEM", { size: 17 });
  box(sb, 20, 48, 300, 150, ["Biotic components (living)", "Producers: green plants", "Consumers: herbivores, carnivores,", "omnivores, parasites", "Decomposers: bacteria, fungi"], { fill: LGREEN, stroke: GREEN, bold: [true, false, false, false, false] });
  box(sb, 340, 48, 300, 150, ["Abiotic components (non-living)", "Temperature, rainfall, wind,", "soil, minerals, sunlight,", "water and air"], { fill: LBLUE, stroke: BLUE, bold: [true, false, false, false] });
  sb.arrow(322, 123, 338, 123, { stroke: GREY });
  sb.arrow(338, 123, 322, 123, { stroke: GREY });
  box(sb, 20, 232, 300, 100, ["Natural ecosystems", "forest, pond, lake, grassland"], { fill: LGREY, stroke: GREY, bold: [true, false] });
  box(sb, 340, 232, 300, 100, ["Human-made (artificial) ecosystems", "garden, crop-field, aquarium"], { fill: LORANGE, stroke: ORANGE, bold: [true, false] });
  sb.text(330, 222, "Types of ecosystem", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 2. an aquarium as a human-made ecosystem ──
function aquarium(): Scene {
  const sb = new SceneBuilder(660, 340, "An aquarium is a human-made ecosystem");
  const dx = 50;
  sb.rect(190 + dx, 70, 260, 200, { fill: "#ffffff", stroke: C.ink, sw: 2.2 });
  sb.rect(191 + dx, 100, 258, 169, { fill: "#bfdbfe" });
  sb.rect(191 + dx, 252, 258, 17, { fill: "#d6b588" });
  [[225, 250, 190], [250, 250, 205], [405, 250, 195], [425, 250, 210]].forEach(([x, y, top]) => { sb.line(x + dx, y, x + dx, top, { stroke: GREEN, sw: 3 }); sb.ellipse(x + dx, top - 6, 7, 12, { fill: "#4ade80" }); });
  const fish = (x: number, y: number) => { sb.ellipse(x + dx, y, 20, 10, { fill: ORANGE }); sb.poly([[x + dx + 18, y], [x + dx + 32, y - 9], [x + dx + 32, y + 9]], { fill: ORANGE }); sb.circle(x + dx - 11, y - 2, 2.2, { fill: "#ffffff" }); };
  fish(285, 150); fish(375, 215);
  [[330, 245], [334, 226], [328, 208], [336, 190], [331, 172]].forEach(([x, y]) => sb.circle(x + dx, y, 3, { fill: "#ffffff", stroke: "#475569", sw: 1 }));
  sb.rect(500 + dx, 36, 90, 40, { rx: 6, fill: LGREY, stroke: GREY, sw: 1.8 });
  sb.text(545 + dx, 62, "Air pump", { size: 12.5 });
  sb.poly([[545 + dx, 76], [545 + dx, 90], [330 + dx, 90], [330 + dx, 240]], { stroke: GREY, sw: 2.4, close: false });
  const lab = (tx: number, ty: number, t: string, px: number, py: number, anchor: "start" | "end") => { sb.line(anchor === "end" ? tx + 6 : tx - 6, ty - 4, px, py, { stroke: GREY, sw: 1.2 }); sb.text(tx, ty, t, { size: 12.5, anchor }); };
  lab(225, 125, "Water", 290, 125, "end");
  lab(225, 190, "Aquatic plants (producers)", 270, 196, "end");
  lab(225, 280, "Bacteria (decomposers)", 300, 262, "end");
  lab(516, 150, "Fish (consumers)", 330, 150, "start");
  lab(516, 228, "Air bubbles: oxygen", 388, 222, "start");
  return sb.build();
}

// ── 3. producers, consumers and decomposers ──
function groups(): Scene {
  const sb = new SceneBuilder(640, 340, "Producers, consumers and decomposers depend on one another");
  sb.circle(70, 52, 26, { fill: YELLOW, stroke: ORANGE, sw: 2 });
  sb.text(70, 100, "Sun", { size: 13 });
  box(sb, 150, 30, 150, 50, ["Producers", "green plants"], { fill: LGREEN, stroke: GREEN });
  box(sb, 400, 30, 160, 50, ["Consumers", "herbivores, carnivores"], { fill: LORANGE, stroke: ORANGE });
  box(sb, 270, 235, 190, 56, ["Decomposers", "bacteria and fungi"], { fill: LPURPLE, stroke: PURPLE });
  sb.arrow(98, 52, 148, 52, { stroke: ORANGE });
  sb.arrow(300, 55, 398, 55, { stroke: GREY });
  sb.text(349, 44, "food", { size: 12, fill: GREY, bold: false });
  sb.arrow(210, 82, 280, 232, { stroke: GREY });
  sb.arrow(470, 82, 440, 232, { stroke: GREY });
  sb.text(130, 160, "dead plants", { size: 12, fill: GREY, bold: false });
  sb.text(535, 160, "dead animals, wastes", { size: 12, fill: GREY, bold: false });
  sb.poly([[270, 265], [90, 265], [90, 130], [160, 84]], { stroke: PURPLE, sw: 2.2, close: false, dash: "6 4" });
  sb.text(180, 322, "simple inorganic substances go into the soil and are used again by plants", { size: 12, fill: PURPLE, bold: false, anchor: "start" });
  return sb.build();
}

// ── 4. food chains in a forest, a grassland and a pond ──
function foodChains(): Scene {
  const sb = new SceneBuilder(700, 300, "Food chains in (a) a forest, (b) a grassland and (c) a pond");
  const rows: [string, string[], string[]][] = [
    ["(a) Forest", ["Plants", "Deer", "Lion"], [LGREEN, LORANGE, LRED]],
    ["(b) Grassland", ["Grass", "Grasshopper", "Frog", "Snake"], [LGREEN, LORANGE, LORANGE, LRED]],
    ["(c) Pond", ["Phytoplankton", "Zooplankton", "Small fish", "Large fish"], [LGREEN, LORANGE, LORANGE, LRED]],
  ];
  rows.forEach(([name, items, fills], r) => {
    const y = 40 + r * 85;
    sb.text(14, y + 4, name, { size: 13, anchor: "start" });
    items.forEach((t, i) => {
      const x = 120 + i * 145;
      box(sb, x, y - 18, 110, 38, [t], { fill: fills[i], stroke: GREY, size: 12.5 });
      if (i < items.length - 1) sb.arrow(x + 112, y + 1, x + 143, y + 1, { stroke: C.ink });
    });
  });
  sb.text(350, 288, "The arrow points from the organism that is eaten to the organism that eats it", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 5. trophic levels ──
function trophic(): Scene {
  const sb = new SceneBuilder(680, 330, "Trophic levels of the food chain: grass, grasshopper, frog, snake");
  const items: [string, string, string, string][] = [
    ["Grass", "1st trophic level", "Producers", LGREEN],
    ["Grasshopper", "2nd trophic level", "Primary consumers (herbivores)", LORANGE],
    ["Frog", "3rd trophic level", "Secondary consumers (small carnivores)", LORANGE],
    ["Snake", "4th trophic level", "Tertiary consumers (larger carnivores)", LRED],
  ];
  items.forEach(([name, lev, role, fill], i) => {
    const x = 20 + i * 165, y = 230 - i * 55;
    box(sb, x, y, 125, 44, [name], { fill, stroke: GREY, size: 14 });
    sb.text(x + 62, y + 64, lev, { size: 12.5 });
    role.split(" (").forEach((p, k) => sb.text(x + 62, y + 80 + k * 15, k ? "(" + p : p, { size: 11.5, bold: false, fill: GREY }));
    if (i < items.length - 1) sb.arrow(x + 127, y + 22, x + 160, y - 28, { stroke: C.ink });
  });
  sb.text(340, 22, "Energy and food move up from one trophic level to the next", { size: 13, fill: GREY, bold: false });
  return sb.build();
}

// ── 6. a food web ──
function foodWeb(): Scene {
  const sb = new SceneBuilder(680, 400, "A food web: many food chains joined together");
  type N = [string, number, number, string];
  const nodes: Record<string, N> = {
    grass: ["Grass", 120, 340, LGREEN], grain: ["Grains", 400, 340, LGREEN], shrub: ["Shrubs", 560, 340, LGREEN],
    hopper: ["Grasshopper", 70, 245, LORANGE], rabbit: ["Rabbit", 260, 245, LORANGE], mouse: ["Mouse", 450, 245, LORANGE],
    frog: ["Frog", 70, 150, LORANGE], fox: ["Fox", 260, 150, LRED], snake: ["Snake", 450, 150, LRED],
    hawk: ["Hawk", 250, 55, LRED],
  };
  const W = 104, H = 34;
  const arrows: [string, string][] = [["grass", "hopper"], ["grass", "rabbit"], ["grain", "mouse"], ["shrub", "mouse"], ["shrub", "rabbit"], ["hopper", "frog"], ["rabbit", "fox"], ["mouse", "snake"], ["snake", "hawk"], ["frog", "hawk"]];
  arrows.forEach(([a, b]) => {
    const A = nodes[a], B = nodes[b];
    const ax = A[1] + W / 2, ay = A[2], bx = B[1] + W / 2, by = B[2] + H;
    sb.arrow(ax, ay - 1, bx, by + 2, { stroke: GREY, sw: 1.6 });
  });
  Object.values(nodes).forEach(([t, x, y, fill]) => box(sb, x, y, W, H, [t], { fill, stroke: C.ink, size: 12.5 }));
  sb.text(20, 392, "Green: producers   Orange: herbivores and small carnivores   Red: top carnivores", { size: 11.5, anchor: "start", fill: GREY, bold: false });
  return sb.build();
}

// ── 7. flow of energy ──
function energyFlow(): Scene {
  const sb = new SceneBuilder(700, 360, "Flow of energy in an ecosystem: it moves in one direction and becomes less at every step");
  sb.circle(55, 120, 34, { fill: YELLOW, stroke: ORANGE, sw: 2 });
  sb.text(55, 178, "Sun", { size: 13 });
  const cols: [string, string, number, string][] = [["Producers", "capture about 1%", 160, LGREEN], ["Primary", "consumers", 290, LORANGE], ["Secondary", "consumers", 420, LORANGE], ["Tertiary", "consumers", 550, LRED]];
  const hs = [110, 80, 56, 38];
  cols.forEach(([a, b, x, fill], i) => {
    const h = hs[i], y = 120 - h / 2;
    sb.rect(x, y, 96, h, { rx: 8, fill, stroke: GREY, sw: 1.8 });
    sb.text(x + 48, 202, a, { size: 12.5 });
    sb.text(x + 48, 218, b, { size: 11.5, bold: false, fill: GREY });
    if (i > 0) sb.arrow(x - 32, 120, x - 3, 120, { stroke: C.ink });
    sb.arrow(x + 48, y - 2, x + 48, y - 26, { stroke: RED });
  });
  sb.arrow(92, 120, 157, 120, { stroke: ORANGE });
  sb.text(125, 108, "sunlight", { size: 11.5, fill: ORANGE, bold: false });
  sb.text(350, 22, "Heat lost to the environment at every step", { size: 12.5, fill: RED });
  sb.text(305, 245, "10%", { size: 13, fill: GREEN }); sb.text(435, 245, "10%", { size: 13, fill: GREEN }); sb.text(565, 245, "10%", { size: 13, fill: GREEN });
  sb.text(350, 272, "only about 10% of the energy of a level reaches the next level", { size: 12, bold: false, fill: GREY });
  box(sb, 160, 296, 486, 40, ["Decomposers break down the dead remains of every level"], { fill: LPURPLE, stroke: PURPLE, size: 12.5 });
  return sb.build();
}

// ── 8. the ten percent rule as a pyramid of energy ──
function pyramid10(): Scene {
  const sb = new SceneBuilder(560, 340, "Energy at each trophic level (an example of the 10 per cent rule)");
  const rows: [string, string, number, string][] = [["Tertiary consumers", "10 J", 60, LRED], ["Secondary consumers", "100 J", 130, LORANGE], ["Primary consumers", "1000 J", 200, LORANGE], ["Producers", "10 000 J", 270, LGREEN]];
  rows.forEach(([name, val, w, fill], i) => {
    const y = 40 + i * 62;
    sb.rect(160 - w / 2 + 40, y, w, 50, { rx: 4, fill, stroke: GREY, sw: 1.8 });
    sb.text(200, y + 31, val, { size: 14 });
    sb.text(350, y + 31, name, { size: 12.5, anchor: "start" });
  });
  sb.text(280, 322, "Each step passes on about one-tenth of the energy it receives", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 9. biological magnification ──
function magnification(): Scene {
  const sb = new SceneBuilder(620, 360, "Biological magnification: a non-degradable chemical builds up at each trophic level (illustration)");
  const bars: [string, string, number, string][] = [["Water", "1", 18, "#93c5fd"], ["Plants", "10", 55, "#86efac"], ["Small fish", "100", 105, "#fde047"], ["Large fish", "1000", 165, "#fdba74"], ["Human beings", "10 000", 230, "#f87171"]];
  sb.line(60, 290, 590, 290, { sw: 1.8 });
  sb.arrow(60, 290, 60, 40, { sw: 1.8 });
  sb.text(70, 36, "Concentration of the chemical (units)", { size: 12.5, anchor: "start" });
  bars.forEach(([name, val, h, fill], i) => {
    const x = 90 + i * 100;
    sb.rect(x, 290 - h, 70, h, { fill, stroke: GREY, sw: 1.6 });
    sb.text(x + 35, 290 - h - 8, val, { size: 13 });
    sb.text(x + 35, 310, name, { size: 12, bold: false });
  });
  sb.text(325, 340, "pesticides washed into soil and water enter the food chain", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 10. how ozone forms ──
function ozoneForm(): Scene {
  const sb = new SceneBuilder(680, 260, "Formation of ozone in the upper atmosphere by ultraviolet radiation");
  const atom = (x: number, y: number) => sb.circle(x, y, 14, { fill: "#fecaca", stroke: RED, sw: 2 });
  sb.text(340, 26, "Step 1: UV radiation splits an oxygen molecule", { size: 13, anchor: "middle" });
  atom(90, 80); atom(118, 80); sb.text(104, 125, "O_{2}", { size: 13 });
  sb.arrow(170, 80, 270, 80, { stroke: PURPLE, sw: 2.4 }); sb.text(220, 66, "UV", { size: 13, fill: PURPLE });
  atom(330, 80); sb.text(330, 125, "O", { size: 13 }); sb.text(372, 85, "+", { size: 16 }); atom(414, 80); sb.text(414, 125, "O", { size: 13 });
  sb.text(340, 168, "Step 2: a free oxygen atom joins an oxygen molecule", { size: 13 });
  atom(70, 215); sb.text(70, 255, "O", { size: 13 }); sb.text(110, 220, "+", { size: 16 });
  atom(150, 215); atom(178, 215); sb.text(164, 255, "O_{2}", { size: 13 });
  sb.arrow(230, 215, 330, 215, { stroke: C.ink, sw: 2 });
  atom(400, 215); atom(428, 215); atom(456, 215); sb.text(428, 255, "O_{3} (ozone)", { size: 13 });
  return sb.build();
}

// ── 11. the ozone layer as a shield ──
function ozoneLayer(): Scene {
  const sb = new SceneBuilder(640, 360, "The ozone layer shields the Earth from the ultraviolet radiation of the Sun");
  sb.circle(70, 50, 30, { fill: YELLOW, stroke: ORANGE, sw: 2 });
  sb.text(70, 100, "Sun", { size: 13 });
  sb.rect(120, 150, 500, 32, { rx: 8, fill: "#ddd6fe", stroke: PURPLE, sw: 1.8 });
  sb.text(250, 171, "Ozone layer (high in the atmosphere)", { size: 12.5, fill: PURPLE });
  sb.rect(450, 150, 76, 32, { fill: "#ffffff" });
  sb.text(488, 171, "thin patch", { size: 12, fill: RED, bold: false });
  sb.ellipse(320, 420, 330, 110, { fill: "#86efac", stroke: GREEN, sw: 2 });
  sb.text(240, 335, "Earth", { size: 14 });
  [200, 300, 400].forEach((x) => { sb.arrow(x - 60, 60, x, 146, { stroke: PURPLE, sw: 2 }); });
  sb.text(250, 208, "UV is absorbed by the ozone layer", { size: 12.5, fill: PURPLE });
  sb.arrow(430, 60, 488, 146, { stroke: RED, sw: 2 });
  sb.arrow(488, 186, 520, 300, { stroke: RED, sw: 2.4 });
  ["more UV", "reaches the", "Earth"].forEach((t, i) => sb.text(540, 230 + i * 16, t, { size: 12, fill: RED, anchor: "start" }));
  return sb.build();
}

// ── 12. biodegradable and non-biodegradable waste ──
function wasteKinds(): Scene {
  const sb = new SceneBuilder(680, 340, "Biodegradable and non-biodegradable substances");
  box(sb, 20, 24, 310, 36, ["Biodegradable (broken down by living things)"], { fill: LGREEN, stroke: GREEN, size: 12.5 });
  box(sb, 350, 24, 310, 36, ["Non-biodegradable (not broken down)"], { fill: LRED, stroke: RED, size: 12.5 });
  const bio = ["Fruit and vegetable peels", "Used tea leaves", "Cake and other left-over food", "Dead plants and animals", "Paper, cotton cloth, wood", "Dung and garden waste"];
  const non = ["Plastic bags, bottles and wrappers", "Glass and metal cans", "Polythene packets", "Synthetic cloth", "Broken footwear (rubber, plastic)", "Electronic waste (old mobiles)"];
  bio.forEach((t, i) => { sb.circle(36, 94 + i * 38, 5, { fill: GREEN }); sb.text(50, 99 + i * 38, t, { size: 13, anchor: "start", bold: false }); });
  non.forEach((t, i) => { sb.circle(366, 94 + i * 38, 5, { fill: RED }); sb.text(380, 99 + i * 38, t, { size: 13, anchor: "start", bold: false }); });
  sb.line(340, 70, 340, 320, { stroke: "#cbd5e1", sw: 1.4, dash: "5 4" });
  return sb.build();
}

// ── 13. reduce, reuse, recycle ──
function threeR(): Scene {
  const sb = new SceneBuilder(640, 300, "Reduce, reuse and recycle: three ways to manage waste");
  box(sb, 15, 40, 195, 80, ["REDUCE", "use less: carry a cloth bag,", "switch off lights and fans"], { fill: LGREEN, stroke: GREEN, bold: [true, false, false], size: 12 });
  box(sb, 222, 40, 195, 80, ["REUSE", "use again: refill bottles,", "pass on old clothes"], { fill: LBLUE, stroke: BLUE, bold: [true, false, false], size: 12 });
  box(sb, 430, 40, 195, 80, ["RECYCLE", "make new things from", "old paper, glass, metal"], { fill: LORANGE, stroke: ORANGE, bold: [true, false, false], size: 12 });
  box(sb, 110, 180, 420, 90, ["Also: separate biodegradable and non-biodegradable waste,", "make compost from kitchen waste,", "refuse plastic bags and disposable items"], { fill: LGREY, stroke: GREY, bold: [false, false, false], size: 13 });
  sb.arrow(112, 122, 112, 178, { stroke: GREY }); sb.arrow(320, 122, 320, 178, { stroke: GREY }); sb.arrow(527, 122, 527, 178, { stroke: GREY });
  return sb.build();
}

// ── 14. ecological pyramids (competition zone) ──
function pyramids(): Scene {
  const sb = new SceneBuilder(700, 330, "Pyramids of numbers, biomass and energy");
  const tri = (cx: number, top: number, w: number, h: number, up: boolean, fills: string[]) => {
    const n = fills.length, rh = h / n;
    fills.forEach((f, i) => {
      const lvl = up ? n - 1 - i : i; // i = 0 is the top row
      const wTop = w * (up ? i / n : (n - i) / n), wBot = w * (up ? (i + 1) / n : (n - i - 1) / n);
      void lvl;
      const y = top + i * rh;
      sb.poly([[cx - wTop / 2, y], [cx + wTop / 2, y], [cx + wBot / 2, y + rh], [cx - wBot / 2, y + rh]], { fill: f, stroke: GREY, sw: 1.4 });
    });
  };
  tri(120, 60, 180, 150, true, [LRED, LORANGE, LGREEN]);
  sb.text(120, 36, "Energy: always upright", { size: 12.5 });
  sb.text(120, 240, "Producers have the most energy", { size: 11.5, bold: false, fill: GREY });
  tri(350, 60, 180, 150, true, [LRED, LORANGE, LGREEN]);
  sb.text(350, 36, "Numbers: grassland", { size: 12.5 });
  sb.text(350, 240, "Many grasses, few hawks", { size: 11.5, bold: false, fill: GREY });
  tri(580, 60, 180, 150, false, [LRED, LORANGE, LGREEN]);
  sb.text(580, 36, "Numbers: one big tree", { size: 12.5 });
  sb.text(580, 240, "One tree, many insects, birds", { size: 11.5, bold: false, fill: GREY });
  sb.text(350, 300, "In a pond the pyramid of biomass can also be inverted: tiny algae are quickly eaten", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 15. how a chlorine atom destroys ozone (competition zone) ──
function cfcCycle(): Scene {
  const sb = new SceneBuilder(680, 340, "A chlorine atom from a CFC destroys many ozone molecules");
  box(sb, 20, 30, 200, 50, ["CFC molecule", "in the stratosphere"], { fill: LGREY, stroke: GREY });
  sb.arrow(222, 55, 290, 55, { stroke: PURPLE, sw: 2.2 }); sb.text(256, 44, "UV", { size: 12.5, fill: PURPLE });
  box(sb, 292, 30, 130, 50, ["Free chlorine", "atom Cl"], { fill: LORANGE, stroke: ORANGE });
  box(sb, 20, 160, 200, 50, ["Cl + O_{3}", "gives ClO + O_{2}"], { fill: LPURPLE, stroke: PURPLE });
  box(sb, 292, 160, 130, 50, ["ClO + O", "gives Cl + O_{2}"], { fill: LPURPLE, stroke: PURPLE });
  sb.arrow(357, 82, 357, 156, { stroke: GREY }); sb.arrow(222, 185, 288, 185, { stroke: GREY });
  sb.poly([[357, 212], [357, 250], [120, 250], [120, 214]], { stroke: ORANGE, sw: 2, close: false });
  sb.arrow(120, 216, 120, 213, { stroke: ORANGE });
  sb.text(240, 276, "Cl is formed again and attacks the next ozone molecule", { size: 12, fill: ORANGE, bold: false });
  box(sb, 470, 160, 190, 100, ["One chlorine atom", "can destroy thousands", "of ozone molecules"], { fill: LRED, stroke: RED });
  sb.text(340, 318, "This is why a small amount of CFC causes a large loss of ozone", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 16. the whole chapter ──
function mindMap(): Scene {
  const W = 1000, H = 720, bw = 310;
  const sb = new SceneBuilder(W, H, "Our Environment: the whole chapter");
  const cols = ["#15803d", "#b45309", "#2563eb", "#7c3aed", "#0f766e", "#b91c1c", "#0369a1", "#a21caf"];
  const items: [string, string[]][] = [
    ["1. Ecosystem", ["Biotic: living things", "Abiotic: temperature, rain, soil", "Natural and human-made"]],
    ["2. Organisms", ["Producers make food", "Consumers: herbivores, carnivores...", "Decomposers break down dead matter"]],
    ["3. Food chain", ["Each step is a trophic level", "Producer, 1st, 2nd, 3rd consumer", "Only 3 or 4 steps"]],
    ["4. Energy flow", ["Plants capture about 1% of sunlight", "About 10% passes to the next level", "One-way flow, lost as heat"]],
    ["5. Food web", ["Many chains joined together", "Each organism eaten by several", "Gives stability"]],
    ["6. Magnification", ["Pesticides are not degradable", "They build up at each level", "Highest in human beings"]],
    ["7. Ozone layer", ["O_{3} shields us from UV", "CFCs destroy it", "UNEP 1987: freeze CFC output"]],
    ["8. Waste", ["Biodegradable and not", "Plastics persist for long", "Reduce, reuse, recycle"]],
  ];
  const ys = [78, 238, 398, 558];
  const cx = W / 2, cy = H / 2;
  sb.ellipse(cx, cy, 112, 62, { fill: "#0f172a" });
  sb.text(cx, cy - 4, "Our", { size: 17, fill: "#ffffff" });
  sb.text(cx, cy + 20, "Environment", { size: 17, fill: "#ffffff" });
  items.forEach(([title, lines], i) => {
    const left = i < 4, y = ys[i % 4], x = left ? 8 : W - bw - 8, col = cols[i], h = 124;
    sb.curve([left ? x + bw : x, y], [(left ? x + bw : x) + (left ? 50 : -50), (y + cy) / 2], [left ? cx - 112 : cx + 112, cy], { stroke: col, sw: 2.2 });
    sb.rect(x, y - h / 2, bw, h, { rx: 12, fill: "#ffffff", stroke: col, sw: 2.2 });
    sb.text(x + 14, y - h / 2 + 26, title, { size: 15, fill: col, anchor: "start" });
    lines.forEach((l, k) => sb.text(x + 14, y - h / 2 + 54 + k * 24, l, { size: 13, fill: C.ink, anchor: "start", bold: false }));
  });
  return sb.build();
}

export const ENV_DIAGRAMS: Record<string, () => Scene> = {
  ev_components: components,
  ev_aquarium: aquarium,
  ev_groups: groups,
  ev_foodchains: foodChains,
  ev_trophic: trophic,
  ev_foodweb: foodWeb,
  ev_energy: energyFlow,
  ev_pyramid10: pyramid10,
  ev_magnify: magnification,
  ev_ozoneform: ozoneForm,
  ev_ozonelayer: ozoneLayer,
  ev_waste: wasteKinds,
  ev_3r: threeR,
  ev_pyramids: pyramids,
  ev_cfc: cfcCycle,
  ev_mindmap: mindMap,
};
