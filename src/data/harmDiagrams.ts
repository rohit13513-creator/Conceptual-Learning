import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, LGREY, RED, LRED, YELLOW, BROWN, LBROWN, TEAL, LTEAL, LYELLOW, PINK, LPINK, box, sun, tree, grass, fish, beast, bird, elephant, house, flower, bee, wave } from "./harmKit";

// Diagrams (part 1) for Class VIII Science, "How Nature Works in Harmony" (NCERT Chapter 12). Every picture is a Scene (see components/sceneKit.ts),
// so scripts/check-harm-diagrams.mts can check that no text touches a line, a shape or another text.

// ── 1. elephants, lost forests and corridors ──
function elephantChain(): Scene {
  const sb = new SceneBuilder(720, 380, "Why elephants enter farms and how a wildlife corridor helps");
  const steps: [string[], string][] = [
    [["Rainfall, temperature", "change; trees cut for", "roads and buildings"], LORANGE],
    [["Forest shrinks and", "dries; waterholes", "dry up"], LYELLOW],
    [["Loss of habitat:", "little food for", "elephants"], LRED],
    [["Elephants enter", "farms and villages;", "damage and harm"], LRED],
  ];
  steps.forEach(([lines, fill], i) => {
    const x = 14 + i * 178;
    box(sb, x, 28, 150, 76, lines, { fill, stroke: GREY, size: 12, bold: [false, false, false] });
    if (i < 3) sb.arrow(x + 152, 66, x + 176, 66, { stroke: INK });
  });
  sb.text(360, 18, "A chain of events", { size: 13, fill: GREY, bold: false });
  // the corridor
  sb.text(360, 142, "A wildlife corridor joins two forests so that animals can move safely", { size: 13 });
  sb.ellipse(110, 250, 96, 62, { fill: "#bbf7d0" });
  sb.ellipse(610, 250, 96, 62, { fill: "#bbf7d0" });
  [[70, 262], [110, 270], [150, 262], [90, 236], [130, 236]].forEach(([x, y]) => tree(sb, x, y, 0.7));
  [[570, 262], [610, 270], [650, 262], [590, 236], [630, 236]].forEach(([x, y]) => tree(sb, x, y, 0.7));
  sb.rect(190, 238, 340, 30, { fill: "#d9f99d" });
  elephant(sb, 360, 246, 0.8);
  sb.arrow(228, 252, 292, 252, { stroke: DGREEN });
  sb.arrow(496, 252, 432, 252, { stroke: DGREEN });
  sb.text(110, 334, "Forest A", { size: 13 });
  sb.text(610, 334, "Forest B", { size: 13 });
  sb.text(360, 304, "corridor: a strip of natural land", { size: 12.5, fill: DGREEN });
  house(sb, 300, 354, 0.9); house(sb, 360, 356, 0.9); house(sb, 420, 354, 0.9);
  sb.text(360, 372, "human settlement", { size: 11.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 2. a pond habitat and a forest habitat ──
function habitats(): Scene {
  const sb = new SceneBuilder(720, 400, "Two habitats: a pond and a forest, with their living (biotic) and non-living (abiotic) parts");
  // pond
  sb.rect(20, 24, 320, 230, { rx: 12, fill: LBLUE });
  sun(sb, 295, 62, 15);
  sb.ellipse(180, 190, 138, 52, { fill: "#60a5fa" });
  sb.ellipse(180, 150, 138, 14, { fill: "#93c5fd" });
  fish(sb, 120, 192, ORANGE, 1, 1); fish(sb, 220, 212, "#f59e0b", -1, 0.9);
  [[260, 168], [290, 178]].forEach(([x, y]) => sb.ellipse(x, y, 14, 5, { fill: GREEN }));
  flower(sb, 262, 163, 4, PINK);
  [[60, 150], [75, 146], [90, 152]].forEach(([x, y]) => grass(sb, x, y + 20, 1.1));
  bird(sb, 120, 66, INK); bird(sb, 160, 88, INK);
  // forest
  sb.rect(380, 24, 320, 230, { rx: 12, fill: "#ecfccb" });
  sun(sb, 665, 62, 15);
  sb.rect(380, 196, 320, 58, { fill: "#d6b588" });
  [[430, 200], [500, 204], [560, 198]].forEach(([x, y]) => tree(sb, x, y, 1.3));
  beast(sb, 610, 232, "#b45309", "antler", 0.8, -1);
  [[420, 240], [470, 244], [520, 240]].forEach(([x, y]) => grass(sb, x, y, 1));
  bird(sb, 500, 60, INK);
  // text
  sb.text(180, 280, "POND HABITAT", { size: 13.5, fill: BLUE });
  sb.text(180, 302, "Biotic: fish, frogs, snails, ducks,", { size: 12, bold: false });
  sb.text(180, 318, "algae, lotus, duckweed", { size: 12, bold: false });
  sb.text(180, 342, "Abiotic: water, sunlight, air,", { size: 12, bold: false });
  sb.text(180, 358, "mud, dissolved oxygen, temperature", { size: 12, bold: false });
  sb.text(540, 280, "FOREST HABITAT", { size: 13.5, fill: DGREEN });
  sb.text(540, 302, "Biotic: trees, grass, deer, hare, fox,", { size: 12, bold: false });
  sb.text(540, 318, "birds, insects, mushrooms", { size: 12, bold: false });
  sb.text(540, 342, "Abiotic: soil, air, sunlight,", { size: 12, bold: false });
  sb.text(540, 358, "rainwater, rocks, temperature", { size: 12, bold: false });
  sb.text(360, 390, "Both habitats have living and non-living parts, but the kinds are different", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 3. individual, population, community, ecosystem ──
function levels(): Scene {
  const sb = new SceneBuilder(720, 360, "Levels of life: individual, population, community and ecosystem");
  sb.rect(14, 20, 420, 322, { rx: 18, fill: LBLUE, stroke: BLUE, sw: 2 });
  sb.text(224, 44, "ECOSYSTEM", { size: 14, fill: BLUE });
  sb.rect(34, 58, 380, 266, { rx: 16, fill: LGREEN, stroke: GREEN, sw: 2 });
  sb.text(224, 80, "COMMUNITY", { size: 14, fill: DGREEN });
  sb.rect(54, 94, 200, 214, { rx: 14, fill: "#fef3c7", stroke: ORANGE, sw: 2 });
  sb.text(154, 116, "POPULATION", { size: 14, fill: ORANGE });
  fish(sb, 110, 174, ORANGE, 1, 1.1); fish(sb, 200, 176, ORANGE, 1, 1); fish(sb, 130, 216, ORANGE, 1, 1); fish(sb, 210, 250, ORANGE, 1, 1); fish(sb, 100, 276, ORANGE, 1, 1);
  sb.circle(110, 174, 28, { stroke: RED, sw: 2, dash: "4 3" });
  sb.text(110, 138, "individual", { size: 11.5, fill: RED });
  // other populations in the community
  [[320, 120], [350, 150]].forEach(([x, y]) => beast(sb, x, y + 20, "#a16207", "round", 0.55, -1));
  [[300, 220], [335, 232], [370, 222]].forEach(([x, y]) => tree(sb, x, y + 30, 0.55));
  [[310, 290], [345, 282], [380, 292]].forEach(([x, y]) => bee(sb, x, y, 0.8));
  sb.text(224, 336, "the water, sunlight, air and soil", { size: 11.5, fill: BLUE, bold: false });
  // legend
  const L: [string, string, string][] = [["Individual", "one organism: a single fish", RED], ["Population", "all organisms of one kind in a habitat at a given time", ORANGE], ["Community", "all the populations living together in a habitat", DGREEN], ["Ecosystem", "the community and the non-living parts interacting", BLUE]];
  L.forEach(([a, b, col], i) => {
    const y = 60 + i * 76;
    sb.rect(450, y - 18, 8, 50, { fill: col });
    sb.text(468, y, a, { size: 14, anchor: "start", fill: col });
    const words = b.split(" "); let line = "", ln = 0;
    words.forEach((w) => { if ((line + " " + w).length > 30) { sb.text(468, y + 20 + ln * 15, line.trim(), { size: 11.5, anchor: "start", bold: false }); line = w; ln++; } else line += " " + w; });
    sb.text(468, y + 20 + ln * 15, line.trim(), { size: 11.5, anchor: "start", bold: false });
  });
  return sb.build();
}

// ── 4. pollination ──
function pollination(): Scene {
  const sb = new SceneBuilder(720, 340, "A flower and pollination by an insect");
  // the flower
  const cx = 170, cy = 150;
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; sb.ellipse(cx + Math.cos(a) * 46, cy + Math.sin(a) * 46, 30, 17, { fill: "#fbcfe8" }); }
  sb.rect(cx - 3, cy + 40, 6, 110, { fill: "#4d7c0f" });
  sb.poly([[cx - 4, cy + 120], [cx - 40, cy + 104], [cx - 4, cy + 134]], { fill: "#65a30d", decor: true });
  sb.poly([[cx - 20, cy + 60], [cx - 30, cy + 80], [cx, cy + 70]], { fill: "#65a30d", decor: true });
  sb.rect(cx - 5, cy - 34, 10, 52, { fill: GREEN });
  sb.circle(cx, cy - 36, 8, { fill: "#bbf7d0" });
  [-26, 24].forEach((d) => { sb.line(cx + d, cy + 14, cx + d * 0.6, cy - 28, { stroke: ORANGE, sw: 2.2, decor: true }); sb.circle(cx + d * 0.6, cy - 30, 5, { fill: YELLOW }); });
  // labels
  const lab = (tx: number, ty: number, t: string, px: number, py: number, anchor: "start" | "end") => { sb.line(anchor === "end" ? tx + 6 : tx - 6, ty - 4, px, py, { stroke: GREY, sw: 1.2 }); sb.text(tx, ty, t, { size: 12.5, anchor }); };
  lab(120, 54, "Carpel (female)", cx - 4, cy - 38, "end");
  lab(120, 262, "Stalk", cx - 2, cy + 90, "end");
  lab(340, 100, "Petal", cx + 52, cy - 16, "start");
  lab(342, 186, "Stamen (male):", cx + 18, cy - 16, "start");
  sb.text(342, 202, "pollen grains", { size: 12.5, anchor: "start" });
  // two flowers and a bee
  flower(sb, 480, 250, 14, PINK); flower(sb, 660, 250, 14, "#f97316");
  sb.rect(477, 262, 6, 56, { fill: "#4d7c0f" }); sb.rect(657, 262, 6, 56, { fill: "#4d7c0f" });
  bee(sb, 570, 150, 1.5);
  sb.curve([492, 236], [520, 160], [552, 152], { stroke: ORANGE, sw: 2, dash: "5 4" });
  sb.curve([592, 152], [640, 160], [656, 234], { stroke: ORANGE, sw: 2, dash: "5 4" });
  sb.text(570, 112, "bee carries pollen", { size: 12.5, fill: ORANGE });
  sb.text(570, 128, "stamen to carpel", { size: 12.5, fill: ORANGE });
  sb.text(570, 330, "pollen moves from stamen to carpel", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 5. the pond study: direct and indirect effects ──
function pondStudy(): Scene {
  const sb = new SceneBuilder(720, 430, "Pond A with fish and pond B without fish: direct and indirect effects");
  const pond = (x: number, withFish: boolean, title: string) => {
    sb.rect(x, 20, 330, 150, { rx: 12, fill: "#f0f9ff", stroke: "#cbd5e1", sw: 1.4 });
    sb.ellipse(x + 165, 108, 110, 34, { fill: "#60a5fa" });
    if (withFish) { fish(sb, x + 130, 106, ORANGE, 1, 0.9); fish(sb, x + 200, 116, ORANGE, -1, 0.9); }
    [[x + 50, 70], [x + 280, 70]].forEach(([fx, fy]) => { flower(sb, fx, fy, 5, PINK); sb.line(fx, fy + 6, fx, fy + 34, { stroke: "#4d7c0f", sw: 2, decor: true }); });
    if (withFish) [[x + 80, 64], [x + 250, 64]].forEach(([fx, fy]) => flower(sb, fx, fy, 5, "#f97316"));
    sb.text(x + 165, 150, title, { size: 12.5 });
  };
  pond(20, true, "Pond A: fish, many flowers, many bees");
  pond(370, false, "Pond B: no fish, fewer flowers");
  // the chain
  const nodes: [string, number, string][] = [["Fish", 20, LORANGE], ["Dragonfly larvae", 200, LGREEN], ["Bees, butterflies", 380, LYELLOW], ["Flowering plants", 560, LPINK]];
  nodes.forEach(([t, x, f]) => box(sb, x, 250, 140, 44, [t], { fill: f, stroke: GREY, size: 12.5 }));
  [[160, 200], [340, 380], [520, 560]].forEach(([a, b], i) => { sb.arrow(a + 1, 272, b - 1, 272, { stroke: RED, sw: 2.2 }); });
  sb.text(180, 242, "eat (−)", { size: 12, fill: RED }); sb.text(360, 242, "eat (−)", { size: 12, fill: RED }); sb.text(540, 242, "pollinate (+)", { size: 12, fill: RED });
  sb.curve([90, 298], [360, 372], [630, 298], { stroke: "#15803d", sw: 2.2, dash: "6 4" });
  sb.text(360, 362, "indirect (+): fish reduce dragonflies, so more pollinators visit the flowers", { size: 12, fill: "#15803d" });
  sb.text(360, 200, "Red arrows: direct effects   Green dashed arrows: indirect effects", { size: 12, fill: GREY, bold: false });
  sb.text(360, 400, "More fish: fewer dragonflies, more bees and butterflies, more seeds in the plants", { size: 12.5 });
  return sb.build();
}

// ── 6. three groups of interactions ──
function interactions(): Scene {
  const sb = new SceneBuilder(720, 360, "Three groups of interactions in a habitat");
  const cols: [string, string[], string, string][] = [
    ["Living and non-living", ["Earthworms live in moist soil", "Plants use sunlight to make food", "Fish take in oxygen from water"], LGREEN, GREEN],
    ["Two non-living parts", ["Sunlight makes water evaporate", "Wind makes waves on the pond", "Rain raises the water level"], LBLUE, BLUE],
    ["Among living parts", ["A frog eats insects", "A snake eats fish", "Bees take nectar from flowers"], LORANGE, ORANGE],
  ];
  cols.forEach(([t, items, fill, col], i) => {
    const x = 14 + i * 236;
    sb.rect(x, 40, 220, 250, { rx: 12, fill, stroke: col, sw: 2 });
    sb.rect(x, 40, 220, 36, { rx: 12, fill: col });
    sb.text(x + 110, 63, t, { size: 13.5, fill: "#ffffff" });
    items.forEach((s, k) => {
      const y = 112 + k * 56;
      sb.circle(x + 18, y - 4, 4, { fill: col });
      const half = s.split(" "); const mid = Math.ceil(half.length / 2);
      sb.text(x + 30, y - 2, half.slice(0, mid).join(" "), { size: 12.5, anchor: "start", bold: false });
      sb.text(x + 30, y + 15, half.slice(mid).join(" "), { size: 12.5, anchor: "start", bold: false });
    });
  });
  sb.text(122, 312, "affect life processes: nutrition,", { size: 11.5, fill: GREY, bold: false });
  sb.text(122, 328, "respiration, reproduction", { size: 11.5, fill: GREY, bold: false });
  sb.text(358, 312, "affect the physical", { size: 11.5, fill: GREY, bold: false });
  sb.text(358, 328, "conditions of the habitat", { size: 11.5, fill: GREY, bold: false });
  sb.text(594, 312, "affect the resources available", { size: 11.5, fill: GREY, bold: false });
  sb.text(594, 328, "for life processes", { size: 11.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 7. terrestrial and aquatic ecosystems overlapping ──
function ecosystems(): Scene {
  const sb = new SceneBuilder(720, 380, "Terrestrial and aquatic ecosystems overlap");
  const x0 = 190, w = 340;
  sb.rect(x0, 30, w, 300, { rx: 12, fill: "#e0f2fe" });
  sun(sb, x0 + 300, 62, 14);
  sb.poly([[x0, 170], [x0 + 70, 80], [x0 + 140, 170]], { fill: "#94a3b8", decor: true });
  sb.poly([[x0 + 100, 170], [x0 + 190, 66], [x0 + 280, 170]], { fill: "#64748b", decor: true });
  sb.poly([[x0 + 80, 112], [x0 + 70, 96], [x0 + 92, 112]], { fill: "#f8fafc", decor: true });
  sb.rect(x0, 170, w, 160, { fill: "#bef264" });
  [[x0 + 24, 190], [x0 + 54, 196], [x0 + 86, 190], [x0 + 116, 198]].forEach(([x, y]) => tree(sb, x, y, 0.9));
  [[x0 + 40, 222], [x0 + 70, 228], [x0 + 100, 220]].forEach(([x, y]) => grass(sb, x, y, 1));
  // farmland
  sb.rect(x0 + 206, 224, 124, 90, { fill: "#d9a441" });
  [236, 250, 264, 278, 292].forEach((y) => sb.line(x0 + 210, y, x0 + 326, y, { stroke: "#a16207", sw: 2, decor: true }));
  // river
  sb.poly([[x0 + 130, 170], [x0 + 160, 170], [x0 + 190, 250], [x0 + 150, 330], [x0 + 110, 330], [x0 + 140, 250]], { fill: "#3b82f6", decor: true });
  const lab = (tx: number, ty: number, t: string, px: number, py: number, anchor: "start" | "end") => { sb.line(anchor === "end" ? tx + 6 : tx - 6, ty - 4, px, py, { stroke: GREY, sw: 1.2 }); sb.text(tx, ty, t, { size: 12.5, anchor }); };
  lab(170, 120, "Mountain", x0 + 60, 120, "end");
  lab(170, 200, "Forest", x0 + 40, 192, "end");
  lab(170, 232, "Grassland", x0 + 60, 226, "end");
  lab(550, 150, "River (aquatic)", x0 + 150, 230, "start");
  lab(550, 274, "Farmland", x0 + 300, 274, "start");
  sb.text(550, 292, "(human-made)", { size: 11.5, anchor: "start", fill: GREY, bold: false });
  sb.text(360, 358, "Terrestrial: mountain, forest, grassland, farm.  Aquatic: river, pond, lake, sea.", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 8. living and non-living parts depend on each other ──
function twoWay(): Scene {
  const sb = new SceneBuilder(720, 340, "Living parts depend on non-living parts, and non-living parts are changed by living parts");
  box(sb, 14, 30, 200, 270, ["ABIOTIC PARTS", "sunlight", "water", "air", "soil", "temperature"], { fill: LBLUE, stroke: BLUE, size: 14, bold: [true, false, false, false, false, false] });
  box(sb, 506, 30, 200, 270, ["BIOTIC PARTS", "plants", "animals", "microorganisms", "(fungi, bacteria)"], { fill: LGREEN, stroke: GREEN, size: 14, bold: [true, false, false, false, false] });
  sb.arrow(218, 100, 502, 100, { stroke: BLUE, sw: 2.6 });
  sb.text(360, 58, "Plants and animals need:", { size: 13, fill: BLUE });
  sb.text(360, 78, "sunlight, CO_{2} and water for food", { size: 12, bold: false });
  sb.text(360, 128, "soil: a medium and nutrients", { size: 12, bold: false });
  sb.text(360, 146, "air: oxygen for respiration", { size: 12, bold: false });
  sb.arrow(502, 214, 218, 214, { stroke: GREEN, sw: 2.6 });
  sb.text(360, 192, "Living parts give back:", { size: 13, fill: GREEN });
  sb.text(360, 238, "oxygen from photosynthesis", { size: 12, bold: false });
  sb.text(360, 256, "roots hold soil; no erosion", { size: 12, bold: false });
  sb.text(360, 274, "moisture, cooler air, nutrients", { size: 12, bold: false });
  return sb.build();
}

// ── 9. producers, consumers and decomposers ──
function groups(): Scene {
  const sb = new SceneBuilder(720, 380, "Producers, consumers and decomposers");
  box(sb, 215, 14, 290, 44, ["Organisms, by how they get food"], { fill: LGREY, stroke: GREY, size: 13 });
  const mid: [string, string[], string, string, number][] = [
    ["Producers", ["(autotrophs)", "make their own food", "grass, trees, algae"], LGREEN, GREEN, 14],
    ["Consumers", ["(heterotrophs)", "depend on other organisms", "for food"], LORANGE, ORANGE, 254],
    ["Decomposers", ["(saprotrophs)", "feed on dead matter", "fungi, bacteria"], LPURPLE, PURPLE, 494],
  ];
  mid.forEach(([t, lines, fill, col, x]) => {
    sb.line(360, 58, x + 105, 96, { stroke: GREY, sw: 1.6 });
    sb.rect(x, 96, 212, 108, { rx: 10, fill, stroke: col, sw: 2 });
    sb.text(x + 106, 120, t, { size: 14, fill: col });
    lines.forEach((l, i) => sb.text(x + 106, 144 + i * 18, l, { size: 12, bold: false }));
  });
  const kids: [string, string, string, number][] = [["Herbivores", "deer, hare, cow, grasshopper", "eat only plants", 170], ["Carnivores", "leopard, tiger, vulture", "eat only animals", 322], ["Omnivores", "crow, fox, mouse, human", "eat both", 474]];
  kids.forEach(([t, ex, d, x]) => {
    sb.line(360, 204, x + 70, 250, { stroke: ORANGE, sw: 1.6 });
    sb.rect(x, 250, 150, 104, { rx: 10, fill: "#fff7ed", stroke: ORANGE, sw: 1.8 });
    sb.text(x + 75, 274, t, { size: 13.5, fill: ORANGE });
    sb.text(x + 75, 296, d, { size: 12, bold: false });
    sb.text(x + 75, 318, ex.split(", ").slice(0, 2).join(", ") + ",", { size: 11.5, bold: false, fill: GREY });
    sb.text(x + 75, 334, ex.split(", ").slice(2).join(", "), { size: 11.5, bold: false, fill: GREY });
  });
  return sb.build();
}

export const HARM_DIAGRAMS_1: Record<string, () => Scene> = {
  hm_elephant: elephantChain,
  hm_habitats: habitats,
  hm_levels: levels,
  hm_pollination: pollination,
  hm_pondstudy: pondStudy,
  hm_interactions: interactions,
  hm_ecosystems: ecosystems,
  hm_twoway: twoWay,
  hm_groups: groups,
};
// keep the imports used by part 2 available here too
void [PURPLE, LPURPLE, BROWN, LBROWN, TEAL, LTEAL, YELLOW, PINK, LPINK, RED, LRED, wave];
