import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { bee, flower, INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, LGREY, RED, LRED, YELLOW, BROWN, LBROWN, TEAL, LTEAL, LYELLOW, PINK, LPINK, box, sun, tree, fish, beast, bird, house, wave } from "./harmKit";

// Diagrams (part 2) for Class VIII Science, "How Nature Works in Harmony": food chains, trophic levels, pyramid, food web,
// decomposers, migratory birds, chains of change, relationships, mangroves, farming. Scenes are checked by scripts/check-harm-diagrams.mts.

// ── 10. food chains ──
function chains(): Scene {
  const sb = new SceneBuilder(720, 330, "Food chains: grass, hare, leopard; grass, grasshopper, frog, snake, eagle; millet, mouse, eagle");
  const rows: [string, string[], string[]][] = [
    ["(a) Grassland", ["Grass", "Hare", "Leopard"], [LGREEN, LORANGE, LRED]],
    ["(b) Grassland", ["Grass", "Grasshopper", "Frog", "Snake", "Eagle"], [LGREEN, LORANGE, LORANGE, LRED, LRED]],
    ["(c) Crop field", ["Millet", "Mouse", "Eagle"], [LGREEN, LORANGE, LRED]],
  ];
  rows.forEach(([name, items, fills], r) => {
    const y = 56 + r * 92;
    sb.text(14, y - 26, name, { size: 13, anchor: "start", fill: GREY });
    items.forEach((t, i) => {
      const x = 14 + i * 140;
      box(sb, x, y - 14, 106, 40, [t], { fill: fills[i], stroke: GREY, size: 13 });
      if (i < items.length - 1) sb.arrow(x + 108, y + 6, x + 138, y + 6, { stroke: INK });
    });
  });
  sb.text(360, 308, "The arrow points from the organism that is eaten to the organism that eats it", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 322, "Green: producers   Orange: herbivores and small carnivores   Red: large carnivores", { size: 11.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 11. trophic levels ──
function trophic(): Scene {
  const sb = new SceneBuilder(680, 380, "Trophic levels of the food chain grass, grasshopper, frog, snake, eagle");
  const rows: [string, string, string, string, string][] = [
    ["Eagle", "5th level", "large carnivore", LRED, RED],
    ["Snake", "4th level", "carnivore", LRED, RED],
    ["Frog", "3rd level", "small carnivore", LORANGE, ORANGE],
    ["Grasshopper", "2nd level", "herbivore", LORANGE, ORANGE],
    ["Grass", "1st level", "producer", LGREEN, GREEN],
  ];
  rows.forEach(([n, lev, role, fill, col], i) => {
    const y = 24 + i * 66;
    box(sb, 210, y, 170, 46, [n], { fill, stroke: col, size: 14 });
    sb.text(190, y + 28, lev, { size: 13, anchor: "end", fill: GREY });
    sb.text(400, y + 28, role, { size: 13, anchor: "start", fill: col });
    if (i < rows.length - 1) sb.arrow(295, y + 66, 295, y + 48, { stroke: INK });
  });
  sb.text(615, 30, "decomposers act", { size: 12, anchor: "middle", fill: PURPLE });
  sb.text(615, 46, "on dead organisms", { size: 12, anchor: "middle", fill: PURPLE });
  sb.text(615, 62, "of every level", { size: 12, anchor: "middle", fill: PURPLE });
  sb.text(60, 366, "Food and energy move up; the Sun is the source of energy", { size: 12, anchor: "start", fill: GREY, bold: false });
  return sb.build();
}

// ── 12. pyramid of numbers ──
function pyramid(): Scene {
  const sb = new SceneBuilder(700, 340, "Pyramid of numbers for the food chain millet, mouse, eagle");
  const cx = 230;
  sb.poly([[cx - 40, 50], [cx + 40, 50], [cx + 78, 120], [cx - 78, 120]], { fill: LRED, stroke: RED, sw: 2 });
  sb.poly([[cx - 78, 126], [cx + 78, 126], [cx + 126, 196], [cx - 126, 196]], { fill: LORANGE, stroke: ORANGE, sw: 2 });
  sb.poly([[cx - 126, 202], [cx + 126, 202], [cx + 190, 272], [cx - 190, 272]], { fill: LGREEN, stroke: GREEN, sw: 2 });
  sb.text(cx, 88, "Eagle", { size: 14 }); sb.text(cx, 106, "1", { size: 13, fill: RED });
  sb.text(cx, 160, "Mice", { size: 14 }); sb.text(cx, 178, "10 (fewer)", { size: 13, fill: ORANGE });
  sb.text(cx, 236, "Millet plants", { size: 14 }); sb.text(cx, 254, "100 (the most)", { size: 13, fill: DGREEN });
  sb.text(470, 88, "highest level: large carnivore", { size: 12.5, anchor: "start" });
  sb.text(470, 160, "second level: herbivore", { size: 12.5, anchor: "start" });
  sb.text(470, 236, "first level: producer", { size: 12.5, anchor: "start" });
  sb.arrow(520, 130, 520, 108, { stroke: GREY });
  sb.text(470, 306, "The number of organisms becomes", { size: 12.5, anchor: "start", fill: GREY, bold: false });
  sb.text(470, 322, "smaller at each higher level", { size: 12.5, anchor: "start", fill: GREY, bold: false });
  sb.text(cx, 20, "(the numbers are only an example)", { size: 11.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 13. a food web ──
function web(): Scene {
  const sb = new SceneBuilder(720, 440, "A food web of a grassland: many food chains joined together");
  const W = 104, H = 34;
  type N = [string, number, number, string];
  const n: Record<string, N> = {
    hawk: ["Hawk", 300, 20, LRED],
    frog: ["Frog", 40, 120, LORANGE], bird: ["Bird", 170, 120, LORANGE], fox: ["Fox", 300, 120, LRED], snake: ["Snake", 430, 120, LRED], owl: ["Owl", 560, 120, LRED],
    hopper: ["Grasshopper", 40, 235, LORANGE], hare: ["Hare", 290, 235, LORANGE], mouse: ["Mouse", 510, 235, LORANGE],
    grass: ["Grasses", 290, 345, LGREEN],
  };
  const cx = (k: string) => n[k][1] + W / 2;
  const arrows: [string, string][] = [
    ["grass", "hopper"], ["grass", "hare"], ["grass", "mouse"],
    ["hopper", "frog"], ["hopper", "bird"], ["hare", "fox"], ["mouse", "fox"], ["mouse", "snake"], ["mouse", "owl"],
    ["frog", "hawk"], ["bird", "hawk"], ["snake", "hawk"],
  ];
  arrows.forEach(([a, b]) => {
    const A = n[a], B = n[b];
    sb.arrow(cx(a), A[2] - 1, cx(b), B[2] + H + 2, { stroke: GREY, sw: 1.6 });
  });
  Object.values(n).forEach(([t, x, y, fill]) => box(sb, x, y, W, H, [t], { fill, stroke: INK, size: 12.5 }));
  sb.text(14, 420, "Green: producer   Orange: herbivores and small carnivores   Red: carnivores", { size: 11.5, anchor: "start", fill: GREY, bold: false });
  sb.text(14, 436, "Each animal may be eaten by more than one kind of animal: the food chains are linked", { size: 11.5, anchor: "start", fill: GREY, bold: false });
  return sb.build();
}

// ── 14. decomposers recycle nutrients ──
function decomposers(): Scene {
  const sb = new SceneBuilder(720, 380, "Decomposers recycle nutrients: nothing is wasted in nature");
  box(sb, 270, 20, 180, 50, ["Plants", "(producers)"], { fill: LGREEN, stroke: GREEN, size: 13.5 });
  box(sb, 520, 120, 180, 50, ["Animals", "(consumers)"], { fill: LORANGE, stroke: ORANGE, size: 13.5 });
  box(sb, 440, 270, 220, 62, ["Dead plants and animals,", "droppings, waste"], { fill: LBROWN, stroke: BROWN, size: 13, bold: [true, true] });
  box(sb, 60, 270, 200, 62, ["Decomposers", "fungi, bacteria, beetles, flies"], { fill: LPURPLE, stroke: PURPLE, size: 13 });
  box(sb, 20, 120, 180, 50, ["Nutrients in", "the soil"], { fill: "#fef3c7", stroke: "#a16207", size: 13.5 });
  sb.arrow(452, 56, 560, 116, { stroke: INK });
  sb.text(540, 70, "eaten", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.arrow(600, 172, 580, 266, { stroke: INK });
  sb.text(612, 222, "die", { size: 12, anchor: "start", fill: GREY, bold: false });
  sb.arrow(352, 72, 500, 268, { stroke: INK, dash: "5 4" });
  sb.text(420, 190, "die, leaves fall", { size: 12, anchor: "end", fill: GREY, bold: false });
  sb.arrow(438, 301, 264, 301, { stroke: PURPLE, sw: 2.2 });
  sb.text(352, 290, "break down", { size: 12, fill: PURPLE });
  sb.arrow(110, 268, 110, 174, { stroke: PURPLE, sw: 2.2 });
  sb.text(122, 224, "return nutrients", { size: 12, anchor: "start", fill: PURPLE });
  sb.arrow(150, 118, 268, 70, { stroke: GREEN, sw: 2.2 });
  sb.text(20, 84, "absorbed by roots", { size: 12, anchor: "start", fill: DGREEN });
  sb.text(360, 366, "Decomposition: dead matter is broken into simple substances that go back to the soil", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 15. migratory birds link two habitats ──
function migrate(): Scene {
  const sb = new SceneBuilder(720, 360, "Migratory birds link two habitats");
  box(sb, 20, 20, 300, 80, ["A cold region in winter", "harsh climate, little food"], { fill: LBLUE, stroke: BLUE, size: 13.5 });
  box(sb, 20, 250, 300, 80, ["An Indian wetland", "(e.g. Khichan village, Jodhpur)", "food and water in winter"], { fill: LGREEN, stroke: GREEN, size: 13 });
  [[120, 150], [170, 168], [220, 150]].forEach(([x, y]) => bird(sb, x, y, INK, 1.4));
  sb.arrow(170, 104, 170, 246, { stroke: ORANGE, sw: 3 });
  sb.text(196, 202, "migrate in winter", { size: 12.5, anchor: "start", fill: ORANGE });
  sb.text(520, 40, "What migratory birds do for India", { size: 14 });
  const items = ["pollinate flowers", "spread seeds (seed dispersers)", "eat insect pests: help farmers", "add beauty to the habitat", "link two habitats"];
  items.forEach((t, i) => {
    const y = 76 + i * 46;
    sb.rect(380, y - 16, 320, 36, { rx: 18, fill: i % 2 ? LGREEN : LYELLOW, stroke: GREY, sw: 1.4 });
    sb.text(540, y + 6, t, { size: 13, bold: false });
  });
  sb.text(520, 330, "Example: the Demoiselle Crane visits Khichan every winter", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 16. one change leads to another ──
function changes(): Scene {
  const sb = new SceneBuilder(720, 360, "One change leads to another: a chain of changes in a pond");
  const steps = ["Pollution:", "plants in the", "pond die"];
  const A: string[][] = [["Pollution: plants", "in the pond die"], ["Less oxygen", "in the water"], ["Fish die; fewer", "consumers"], ["Insects increase", "(nothing eats them)"], ["Insects spread to", "farms; crops damaged"], ["Farmers use more", "pesticides"]];
  void steps;
  A.forEach((lines, i) => {
    const row = Math.floor(i / 3), col = i % 3;
    const x = row === 0 ? 20 + col * 236 : 20 + (2 - col) * 236, y = 40 + row * 150;
    const fills = [LGREEN, LBLUE, LORANGE, LYELLOW, LRED, LPURPLE];
    box(sb, x, y, 200, 64, lines, { fill: fills[i], stroke: GREY, size: 13, bold: [false, false] });
    sb.circle(x + 12, y - 11, 9, { fill: INK });
    sb.text(x + 12, y - 7, String(i + 1), { size: 11, fill: "#ffffff" });
    if (col < 2) { if (row === 0) sb.arrow(x + 202, y + 32, x + 234, y + 32, { stroke: INK }); else sb.arrow(x - 2, y + 32, x - 34, y + 32, { stroke: INK }); }
  });
  sb.arrow(620, 106, 620, 188, { stroke: INK });
  sb.text(360, 290, "The environment is harmed again: more problems follow", { size: 13 });
  sb.text(360, 312, "A small change in one part can affect many other parts of an ecosystem", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 17. frogs, insects and pesticides ──
function frogs(): Scene {
  const sb = new SceneBuilder(720, 360, "Frog legs, insect pests and pesticides");
  sb.text(360, 24, "A food chain on a farm", { size: 13, fill: GREY });
  ["Crop plants", "Insect pests", "Frogs"].forEach((t, i) => {
    box(sb, 160 + i * 150, 38, 120, 38, [t], { fill: [LGREEN, LORANGE, LGREEN][i], stroke: GREY, size: 13 });
    if (i < 2) sb.arrow(282 + i * 150, 57, 308 + i * 150, 57, { stroke: INK });
  });
  const steps: [string, string[]][] = [
    ["1", ["In the 1980s many frogs were", "caught for export of frog legs"]],
    ["2", ["The number of frogs fell"]],
    ["3", ["Fewer frogs to eat insects:", "farm pests increased"]],
    ["4", ["Farmers used more synthetic", "pesticides"]],
    ["5", ["Soil, water and health", "are harmed"]],
    ["6", ["Government of India bans", "the export of frog legs"]],
  ];
  steps.forEach(([n, lines], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 14 + (row === 0 ? col : 2 - col) * 238, y = 116 + row * 106;
    box(sb, x, y, 214, 70, lines, { fill: i === 5 ? LGREEN : i === 4 ? LRED : LYELLOW, stroke: GREY, size: 12.5, bold: lines.map(() => false) });
    sb.circle(x + 12, y - 11, 9, { fill: INK }); sb.text(x + 12, y - 7, n, { size: 11, fill: "#ffffff" });
    if (col < 2) { if (row === 0) sb.arrow(x + 216, y + 35, x + 236, y + 35, { stroke: INK }); else sb.arrow(x - 2, y + 35, x - 22, y + 35, { stroke: INK }); }
  });
  sb.arrow(614, 188, 614, 216, { stroke: INK });
  sb.text(360, 340, "A balance in nature is dynamic: it can be upset by natural or human-made changes", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 18. mutualism, commensalism, parasitism ──
function relations(): Scene {
  const sb = new SceneBuilder(720, 380, "Mutualism, commensalism and parasitism");
  const P: [string, string, string, string, string, string, string, string][] = [
    ["Mutualism", "Both benefit (+ +)", "Honeybee and flower", "Bee: gets nectar (+)", "Flower: gets pollinated (+)", GREEN, LGREEN, "+ +"],
    ["Commensalism", "One benefits, the other is not affected (+ 0)", "Orchid on a tree", "Orchid: gets support (+)", "Tree: is unaffected (0)", BLUE, LBLUE, "+ 0"],
    ["Parasitism", "One benefits, the other is harmed (+ −)", "Tick on a dog", "Tick: feeds on blood (+)", "Dog: skin irritation (−)", RED, LRED, "+ −"],
  ];
  P.forEach(([t, d, ex, a, b, col, fill, sign], i) => {
    const x = 12 + i * 240;
    sb.rect(x, 20, 222, 340, { rx: 12, fill, stroke: col, sw: 2 });
    sb.rect(x, 20, 222, 40, { rx: 12, fill: col });
    sb.text(x + 111, 46, t, { size: 15, fill: "#ffffff" });
    const w = d.split(" (")[0].split(", ");
    sb.text(x + 111, 84, w[0] + (w[1] ? "," : ""), { size: 12.5, bold: false });
    if (w[1]) sb.text(x + 111, 100, w[1], { size: 12.5, bold: false });
    sb.circle(x + 60, 176, 32, { fill: "#ffffff", stroke: col, sw: 2 });
    sb.circle(x + 162, 176, 32, { fill: "#ffffff", stroke: col, sw: 2 });
    sb.line(x + 92, 176, x + 130, 176, { stroke: col, sw: 2.4 });
    sb.text(x + 111, 168, sign, { size: 15, fill: col });
    sb.text(x + 111, 232, ex, { size: 13.5 });
    sb.text(x + 111, 266, a, { size: 12, bold: false });
    sb.text(x + 111, 288, b, { size: 12, bold: false });
  });
  // small pictures in the circles
  bee(sb, 72, 176, 1.1); flower(sb, 174, 176, 8, PINK);
  [[252 + 60, 176], [252 + 162, 176]].forEach(([x, y], k) => { if (k === 0) flower(sb, x, y, 8, "#a855f7"); else { sb.rect(x - 4, y - 20, 8, 40, { fill: BROWN }); sb.circle(x, y - 22, 12, { fill: GREEN }); } });
  sb.ellipse(552, 176, 7, 5, { fill: RED });
  beast(sb, 646, 182, "#a16207", "round", 0.6, 1);
  return sb.build();
}

// ── 19. mangroves protect the coast ──
function mangrove(): Scene {
  const sb = new SceneBuilder(720, 360, "Mangroves slow down waves and protect villages on the coast");
  const panel = (x0: number, withM: boolean, title: string, sub: string) => {
    sb.rect(x0, 20, 340, 250, { rx: 12, fill: "#e0f2fe" });
    sb.rect(x0, 160, 120, 110, { fill: "#60a5fa" });
    wave(sb, x0 + 6, 176, 5, BLUE, 22); wave(sb, x0 + 6, 214, 5, BLUE, 22);
    sb.rect(x0 + 120, 160, 220, 110, { fill: "#fde68a" });
    if (withM) [[x0 + 150, 170], [x0 + 176, 176], [x0 + 202, 170]].forEach(([x, y]) => { tree(sb, x, y + 12, 0.9); sb.line(x - 8, y + 14, x - 12, y + 30, { stroke: BROWN, sw: 2, decor: true }); sb.line(x + 8, y + 14, x + 12, y + 30, { stroke: BROWN, sw: 2, decor: true }); });
    house(sb, x0 + 270, 190, 1.1); house(sb, x0 + 312, 190, 0.9);
    sb.arrow(x0 + 14, 196, x0 + (withM ? 122 : 240), 196, { stroke: RED, sw: withM ? 5 : 9 });
    if (withM) sb.arrow(x0 + 232, 196, x0 + 252, 196, { stroke: RED, sw: 1.8 });
    sb.text(x0 + 170, 60, title, { size: 14, fill: withM ? DGREEN : RED });
    sb.text(x0 + 170, 84, sub, { size: 12, bold: false });
  };
  panel(14, true, "With mangroves", "tangled roots slow the waves");
  panel(366, false, "Without mangroves", "big waves hit the village");
  sb.text(180, 296, "Less damage to the village", { size: 13, fill: DGREEN });
  sb.text(536, 296, "More damage to the village", { size: 13, fill: RED });
  sb.text(360, 340, "In the 2004 tsunami, a Cuddalore village with mangroves was less affected", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 20. chemical farming and sustainable farming ──
function farming(): Scene {
  const sb = new SceneBuilder(720, 400, "Effects of overusing chemicals in farming and ways of sustainable farming");
  box(sb, 14, 20, 330, 40, ["Overuse of synthetic fertilisers and pesticides"], { fill: LRED, stroke: RED, size: 13 });
  const bad = ["Fewer friendly microbes in the soil", "Less humus: soil is eroded easily", "Natural predators of pests are killed", "Pests become resistant and increase", "Earthworms and snails are disturbed", "Monoculture: fewer pollinators"];
  bad.forEach((t, i) => {
    const y = 84 + i * 46;
    sb.arrow(180, i === 0 ? 62 : y - 16, 180, y - 1, { stroke: GREY, sw: 1.4 });
    box(sb, 14, y, 330, 30, [t], { fill: LYELLOW, stroke: GREY, size: 12.5, bold: [false] });
  });
  sb.text(179, 368, "Soil loses fertility: farming becomes unsustainable", { size: 12.5, fill: RED });
  box(sb, 376, 20, 330, 40, ["Sustainable farming"], { fill: LGREEN, stroke: GREEN, size: 14 });
  const good = ["Organic manure and compost (Kunapa Jala)", "Natural and organic farming methods", "Different crops in turn, not one crop", "Save beetles and other natural predators", "Use water carefully; avoid heavy ploughing", "Reuse and recycle farm materials"];
  good.forEach((t, i) => {
    const y = 84 + i * 46;
    sb.circle(392, y + 15, 6, { fill: GREEN });
    sb.text(406, y + 20, t, { size: 12.5, anchor: "start", bold: false });
  });
  sb.text(540, 368, "Soil stays healthy and food is secure for the future", { size: 12.5, fill: DGREEN });
  sb.text(360, 392, "Green Revolution: more food, but heavy use of chemicals, water and one crop", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 21. the mind map of the whole chapter ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "How Nature Works in Harmony: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Habitat", col: "#b45309", tint: "#fef3c7", leaves: ["Place with the right conditions", "Biotic and abiotic parts", "Adaptation helps survival"] },
    { n: "2", t: "Levels of life", col: "#2563eb", tint: "#dbeafe", leaves: ["Individual: one organism", "Population: one kind together", "Community: all populations"] },
    { n: "3", t: "Ecosystem", col: "#0f766e", tint: "#ccfbf1", leaves: ["Living and non-living parts", "Aquatic and terrestrial", "Human-made: farm, park, pond"] },
    { n: "4", t: "Producers and consumers", col: "#15803d", tint: "#dcfce7", leaves: ["Producers make food: autotrophs", "Herbivores, carnivores, omnivores", "Consumers are heterotrophs"] },
    { n: "5", t: "Food chain and web", col: "#c2410c", tint: "#ffedd5", leaves: ["Chain: who eats whom", "Trophic levels; pyramid of numbers", "Linked chains make a food web"] },
    { n: "6", t: "Decomposers", col: "#7c3aed", tint: "#ede9fe", leaves: ["Fungi and bacteria: saprotrophs", "Break down dead matter", "Recycle nutrients to the soil"] },
    { n: "7", t: "Balance and change", col: "#b91c1c", tint: "#fee2e2", leaves: ["One change leads to another", "Competition keeps balance", "Frog legs: pests and pesticides"] },
    { n: "8", t: "Care of nature", col: "#a21caf", tint: "#fae8ff", leaves: ["Threats: deforestation, pollution", "Protected areas, mangroves", "Sustainable farming"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 18, "HOW NATURE", { size: 18, fill: "#ffffff" }); sb.text(cx, cy + 4, "WORKS IN", { size: 16, fill: "#e2e8f0" }); sb.text(cx, cy + 26, "HARMONY", { size: 18, fill: "#e2e8f0" });
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
  sb.text(cx, 800, "THREE CLOSE RELATIONSHIPS", { size: 14, fill: GREY });
  const rules: [string, string, string, string][] = [
    ["Mutualism", "both organisms benefit", "honeybee and flower", "#15803d"],
    ["Commensalism", "one benefits, the other is not affected", "orchid on a tree", "#2563eb"],
    ["Parasitism", "one benefits, the other is harmed", "tick on a dog", "#b91c1c"],
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

export const HARM_DIAGRAMS_2: Record<string, () => Scene> = {
  hm_chains: chains,
  hm_trophic: trophic,
  hm_pyramid: pyramid,
  hm_web: web,
  hm_decomp: decomposers,
  hm_migrate: migrate,
  hm_changes: changes,
  hm_frogs: frogs,
  hm_relations: relations,
  hm_mangrove: mangrove,
  hm_farming: farming,
  hm_mindmap: mindMap,
};
void [LGREY, TEAL, LTEAL, YELLOW, PINK, LPINK, LBROWN, GREEN, BLUE, LBLUE, sun, fish];
