import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, LGREY, RED, LRED, YELLOW, LYELLOW, TEAL, LTEAL, BROWN, box } from "./harmKit";
import { glass, spread, spoon, thermo, stone, dotsIn, WATER, DEEPWATER, SALT, SAND, SAWDUST } from "./solKit";

// Diagrams (part 1) for Class VIII Science, "The Amazing World of Solutes, Solvents, and Solutions" (NCERT Chapter 9):
// mixtures, solute and solvent, saturation, concentration, solubility of solids and gases, water as a solvent, density and floating.
// Every picture is a Scene (see components/sceneKit.ts) checked by scripts/check-sol-diagrams.mts.

// ── 1. uniform and non-uniform mixtures ──
function mixtures(): Scene {
  const sb = new SceneBuilder(720, 340, "A uniform mixture and two non-uniform mixtures");
  const cols = [70, 300, 530];
  cols.forEach((x) => glass(sb, x, 50, 120, 150, 0.75));
  // (a) sugar, salt and water: evenly spread
  spread(sb, 72, 90, 116, 106, 7, 6, "#f8fafc", 2.4); spread(sb, 78, 95, 104, 98, 6, 5, "#facc15", 1.6);
  // (b) sand sinks
  sb.rect(301, 176, 118, 23, { fill: SAND });
  // (c) sawdust floats and a little in the water
  [[560, 92], [578, 90], [596, 93], [614, 91], [572, 96], [602, 97]].forEach(([x, y]) => sb.rect(x - 4, y - 2, 8, 4, { fill: SAWDUST }));
  [[580, 140], [600, 160]].forEach(([x, y]) => sb.rect(x - 3, y - 2, 6, 4, { fill: SAWDUST }));
  sb.text(130, 226, "(a) Sugar, salt and water", { size: 12.5 });
  sb.text(360, 226, "(b) Sand and water", { size: 12.5 });
  sb.text(590, 226, "(c) Sawdust and water", { size: 12.5 });
  sb.text(130, 252, "Uniform mixture", { size: 13.5, fill: DGREEN });
  sb.text(130, 270, "(a solution)", { size: 12, bold: false, fill: DGREEN });
  sb.text(360, 252, "Non-uniform mixture", { size: 13.5, fill: RED });
  sb.text(360, 270, "the sand sinks", { size: 12, bold: false, fill: RED });
  sb.text(590, 252, "Non-uniform mixture", { size: 13.5, fill: RED });
  sb.text(590, 270, "the sawdust floats", { size: 12, bold: false, fill: RED });
  sb.text(360, 26, "Components evenly spread: solution.  Components can be seen separately: not a solution.", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 318, "Every sip of ORS tastes the same, because sugar and salt are evenly spread in the water", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 2. solute, solvent and solution ──
function soluteSolvent(): Scene {
  const sb = new SceneBuilder(720, 330, "Solute, solvent and solution");
  // solute + solvent = solution
  glass(sb, 30, 70, 90, 110, 0.6, WATER);
  sb.text(75, 56, "Solvent", { size: 13, fill: BLUE });
  sb.text(75, 200, "water (liquid)", { size: 11.5, bold: false });
  sb.rect(158, 150, 40, 30, { rx: 4, fill: SALT, stroke: GREY, sw: 1.4 });
  sb.text(178, 140, "Solute", { size: 13, fill: ORANGE });
  sb.text(178, 200, "salt (solid)", { size: 11.5, bold: false });
  sb.text(136, 130, "+", { size: 22, fill: INK });
  sb.text(226, 130, "=", { size: 22, fill: INK });
  glass(sb, 250, 70, 90, 110, 0.6, WATER);
  spread(sb, 252, 106, 86, 72, 7, 5, "#e11d48", 2.4);
  sb.text(295, 56, "Solution", { size: 13, fill: DGREEN });
  sb.text(295, 200, "salt solution", { size: 11.5, bold: false });
  sb.text(180, 248, "Solute + Solvent  →  Solution", { size: 15 });
  sb.text(180, 272, "The solute is spread evenly in the solvent (magnified picture)", { size: 11.5, bold: false, fill: GREY });
  // rules
  box(sb, 392, 30, 300, 74, ["A solid dissolved in a liquid", "solid = solute, liquid = solvent"], { fill: LBLUE, stroke: BLUE, size: 13, bold: [true, false] });
  box(sb, 392, 120, 300, 84, ["Two liquids mixed together", "smaller amount = solute", "larger amount = solvent"], { fill: LORANGE, stroke: ORANGE, size: 13, bold: [true, false, false] });
  box(sb, 392, 220, 300, 84, ["Gulab jamun chashni", "much sugar in a little water:", "water is still the solvent"], { fill: LYELLOW, stroke: "#ca8a04", size: 13, bold: [true, false, false] });
  return sb.build();
}

// ── 3. unsaturated and saturated solutions ──
function saturation(): Scene {
  const sb = new SceneBuilder(720, 360, "Unsaturated and saturated solutions, and the effect of heating");
  const xs = [50, 300, 550];
  xs.forEach((x) => glass(sb, x, 70, 120, 140, 0.7));
  // (a) unsaturated: everything dissolved, a spoon adds more
  spread(sb, 52, 118, 116, 90, 6, 4, "#e11d48", 2.2);
  spoon(sb, 150, 80);
  // (b) saturated: undissolved salt on the bottom
  spread(sb, 302, 118, 116, 62, 6, 3, "#e11d48", 2.2);
  sb.rect(303, 190, 116, 19, { fill: SALT });
  [[330, 196], [360, 198], [390, 196]].forEach(([x, y]) => sb.circle(x, y, 3, { fill: "#cbd5e1" }));
  // (c) heated: dissolves, so it is unsaturated again
  spread(sb, 552, 118, 116, 90, 6, 4, "#e11d48", 2.2);
  thermo(sb, 674, 90, 60, "heat", RED);
  sb.text(110, 236, "(a) Unsaturated", { size: 13.5, fill: DGREEN });
  sb.text(110, 256, "more solute can dissolve", { size: 12, bold: false });
  sb.text(360, 236, "(b) Saturated", { size: 13.5, fill: RED });
  sb.text(360, 256, "extra solute settles at the bottom", { size: 12, bold: false });
  sb.text(610, 236, "(c) Heated: unsaturated again", { size: 13.5, fill: ORANGE });
  sb.text(610, 256, "the undissolved solute dissolves", { size: 12, bold: false });
  sb.arrow(180, 140, 296, 140, { stroke: GREY }); sb.arrow(430, 140, 546, 140, { stroke: GREY });
  sb.text(238, 124, "keep adding", { size: 11.5, bold: false, fill: GREY }); sb.text(488, 124, "heat it", { size: 11.5, bold: false, fill: GREY });
  sb.text(360, 304, "A saturated solution at one temperature behaves as an unsaturated one at a higher temperature", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 324, "A saturated solution can form at any temperature, not only at a high one", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 4. concentration: dilute and concentrated ──
function concentration(): Scene {
  const sb = new SceneBuilder(720, 340, "Which solution is more concentrated: 2 spoons in 100 mL or 4 spoons in 50 mL");
  glass(sb, 80, 60, 130, 170, 0.8);
  dotsIn(sb, 84, 100, 122, 126, 8, "#e11d48", 3.2);
  glass(sb, 400, 60, 130, 100, 0.8);
  dotsIn(sb, 404, 100, 122, 56, 16, "#e11d48", 3.2);
  sb.text(145, 40, "100 mL of water", { size: 13 });
  sb.text(465, 40, "50 mL of water", { size: 13 });
  sb.text(145, 252, "2 spoons of salt", { size: 13.5 });
  sb.text(145, 272, "2 spoons per 100 mL", { size: 12.5, bold: false });
  sb.text(145, 296, "Dilute (less solute)", { size: 13.5, fill: BLUE });
  sb.text(465, 182, "4 spoons of salt", { size: 13.5 });
  sb.text(465, 202, "8 spoons per 100 mL", { size: 12.5, bold: false });
  sb.text(465, 226, "Concentrated (more solute)", { size: 13.5, fill: RED });
  sb.text(620, 100, "Concentration:", { size: 13, anchor: "middle" });
  sb.text(620, 118, "amount of solute", { size: 12, bold: false });
  sb.text(620, 134, "in a fixed quantity", { size: 12, bold: false });
  sb.text(620, 150, "of solution", { size: 12, bold: false });
  sb.text(620, 180, "Dilute and", { size: 12, bold: false, fill: GREY });
  sb.text(620, 196, "concentrated are", { size: 12, bold: false, fill: GREY });
  sb.text(620, 212, "relative terms", { size: 12, bold: false, fill: GREY });
  sb.text(360, 326, "The second solution is more concentrated: 8 spoons per 100 mL is more than 2 spoons per 100 mL", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 5. solubility of baking soda at 20, 50 and 70 degrees ──
function solubilityTemp(): Scene {
  const sb = new SceneBuilder(720, 360, "More baking soda dissolves in water as the temperature rises");
  const T: [number, string, number][] = [[30, "20 °C", 6], [250, "50 °C", 12], [470, "70 °C", 18]];
  T.forEach(([x, label, n]) => {
    glass(sb, x, 60, 130, 150, 0.75);
    dotsIn(sb, x + 6, 112, 118, 92, n, "#e11d48", 3);
    thermo(sb, x + 150, 100, 70, label, label === "20 °C" ? BLUE : label === "50 °C" ? ORANGE : RED);
    sb.text(x + 65, 236, label === "20 °C" ? "least dissolved" : label === "50 °C" ? "more dissolved" : "most dissolved", { size: 13, fill: INK });
  });
  sb.arrow(50, 36, 640, 36, { stroke: RED, sw: 2.2 });
  sb.text(345, 24, "temperature increases", { size: 13, fill: RED });
  sb.text(360, 290, "Each time the water is heated, the undissolved baking soda dissolves", { size: 13 });
  sb.text(360, 312, "For most substances, solubility increases with a rise in temperature", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 332, "Too much sugar in tea? Heat the tea or add more tea (more solvent)", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 6. solubility of gases ──
function gases(): Scene {
  const sb = new SceneBuilder(720, 380, "Solubility of solids increases and solubility of gases decreases with temperature");
  const axes = (x0: number, title: string, col: string, rising: boolean) => {
    sb.line(x0, 60, x0, 230, { stroke: INK, sw: 1.8 }); sb.line(x0, 230, x0 + 260, 230, { stroke: INK, sw: 1.8 });
    sb.text(x0 + 130, 254, "temperature", { size: 12 }); sb.text(x0 - 6, 52, "solubility", { size: 12, anchor: "start" });
    sb.curve(rising ? [x0 + 14, 210] : [x0 + 14, 80], rising ? [x0 + 150, 190] : [x0 + 150, 190], rising ? [x0 + 246, 80] : [x0 + 246, 214], { stroke: col, sw: 3 });
    sb.text(x0 + 130, 36, title, { size: 13.5, fill: col });
  };
  axes(50, "Solids in liquids: increases", GREEN, true);
  axes(410, "Gases in liquids: decreases", RED, false);
  box(sb, 30, 284, 320, 70, ["More sugar dissolves in hot tea", "solubility of solids rises with heat"], { fill: LGREEN, stroke: GREEN, size: 12.5, bold: [true, false] });
  box(sb, 390, 284, 320, 70, ["More oxygen dissolves in cold water", "cold water keeps aquatic life alive"], { fill: LBLUE, stroke: BLUE, size: 12.5, bold: [true, false] });
  return sb.build();
}

// ── 7. water as a solvent ──
function waterSolvent(): Scene {
  const sb = new SceneBuilder(720, 380, "Water is the most versatile solvent, but it does not dissolve everything");
  box(sb, 250, 150, 220, 70, ["WATER", "the universal solvent"], { fill: LBLUE, stroke: BLUE, size: 15, bold: [true, false] });
  box(sb, 20, 20, 250, 96, ["Dissolve in water", "salt, sugar, ORS,", "many other substances"], { fill: LGREEN, stroke: GREEN, size: 13, bold: [true, false, false] });
  box(sb, 450, 20, 250, 96, ["Do not dissolve in water", "oil, grease, wax,", "paint, plastics"], { fill: LRED, stroke: RED, size: 13, bold: [true, false, false] });
  sb.arrow(300, 148, 200, 120, { stroke: GREEN, sw: 2.2 }); sb.arrow(420, 148, 520, 120, { stroke: RED, sw: 2.2 });
  sb.text(360, 262, "For such substances other solvents are used", { size: 13.5 });
  const S: [string, string][] = [["Grease", "kerosene or petrol"], ["Paint", "turpentine"], ["Nail polish", "acetone"], ["Medicines, perfumes", "alcohol"]];
  S.forEach(([a, b], i) => {
    const x = 14 + i * 178;
    box(sb, x, 280, 164, 70, [a, b], { fill: LYELLOW, stroke: "#ca8a04", size: 12.5, bold: [true, false] });
  });
  sb.text(360, 372, "Salt dissolves in water but not in oil", { size: 12, fill: GREY, bold: false });
  return sb.build();
}

// ── 8. what is density ──
function density(): Scene {
  const sb = new SceneBuilder(720, 360, "Density is the mass in a unit volume");
  sb.rect(40, 60, 150, 150, { rx: 6, fill: "#fef3c7", stroke: ORANGE, sw: 2.4 });
  dotsIn(sb, 48, 68, 134, 134, 49, "#92400e", 4.2);
  sb.rect(260, 60, 150, 150, { rx: 6, fill: "#fef3c7", stroke: ORANGE, sw: 2.4 });
  dotsIn(sb, 268, 68, 134, 134, 12, "#92400e", 4.2);
  sb.text(115, 40, "High density", { size: 14, fill: RED }); sb.text(335, 40, "Low density", { size: 14, fill: BLUE });
  sb.text(115, 232, "more mass in the same volume", { size: 12, bold: false }); sb.text(335, 232, "less mass in the same volume", { size: 12, bold: false });
  sb.text(115, 252, "like a crowded bus", { size: 12, bold: false, fill: GREY }); sb.text(335, 252, "like a nearly empty bus", { size: 12, bold: false, fill: GREY });
  box(sb, 470, 50, 230, 100, ["Density = Mass ÷ Volume", "mass in a unit volume"], { fill: LTEAL, stroke: TEAL, size: 15, bold: [true, false] });
  sb.text(585, 182, "Density does not depend on", { size: 12.5, bold: false }); sb.text(585, 200, "the shape or size of the object.", { size: 12.5, bold: false });
  sb.text(585, 228, "It depends on temperature", { size: 12.5, bold: false }); sb.text(585, 246, "and pressure.", { size: 12.5, bold: false });
  sb.text(360, 304, "A wooden stick and an iron rod of the same size: the iron rod has more mass", { size: 12.5, fill: GREY, bold: false });
  sb.text(360, 324, "in the same volume, so iron is denser than wood", { size: 12.5, fill: GREY, bold: false });
  return sb.build();
}

// ── 9. units of density and relative density ──
function units(): Scene {
  const sb = new SceneBuilder(720, 360, "Units of density and relative density");
  box(sb, 20, 20, 320, 70, ["SI unit of density", "kilogram per cubic metre (kg per m^{3})"], { fill: LBLUE, stroke: BLUE, size: 13.5, bold: [true, false] });
  box(sb, 380, 20, 320, 70, ["Other units for liquids", "g per mL and g per cm^{3}"], { fill: LGREEN, stroke: GREEN, size: 13.5, bold: [true, false] });
  box(sb, 20, 108, 680, 70, ["1 kg per m^{3} = 1 g per L = 1 g per 1000 mL = 1 g per 1000 cm^{3}", "1 mL = 1 cm^{3}, so 10 mL of water is about 10 g and the density of water is about 1 g per cm^{3}"], { fill: LYELLOW, stroke: "#ca8a04", size: 13, bold: [true, false] });
  box(sb, 20, 196, 330, 90, ["Relative density", "= density of the substance", "÷ density of water", "(no unit)"], { fill: LPURPLE, stroke: PURPLE, size: 13, bold: [true, false, false, false] });
  box(sb, 370, 196, 330, 90, ["Example: aluminium", "mass 27 g, volume 10 cm^{3}", "density = 27 ÷ 10 = 2.7 g per cm^{3}", "relative density = 2.7"], { fill: LORANGE, stroke: ORANGE, size: 13, bold: [true, false, false, false] });
  sb.text(360, 322, "Aluminium is 2.7 times denser than water", { size: 13, fill: GREY, bold: false });
  return sb.build();
}

export const SOL_DIAGRAMS_1: Record<string, () => Scene> = {
  sl_mixtures: mixtures,
  sl_solute: soluteSolvent,
  sl_saturation: saturation,
  sl_concentration: concentration,
  sl_solubility: solubilityTemp,
  sl_gases: gases,
  sl_water: waterSolvent,
  sl_density: density,
  sl_units: units,
};
void [GREEN, LGREEN, YELLOW, BROWN, DEEPWATER, stone, PURPLE];
