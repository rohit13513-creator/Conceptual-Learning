import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, LGREY, RED, LRED, YELLOW, LYELLOW, TEAL, LTEAL, BROWN, LBROWN, box } from "./harmKit";

// Diagrams (part 1) for Class VIII Science "Exploring Forces" (NCERT Chapter 5): what a force is, its effects, contact forces and friction,
// magnetic and electrostatic forces. Every picture is a Scene (see components/sceneKit.ts) checked by scripts/check-fo-diagrams.mts.
// Shapes without text use fill only or decor lines, so the overlap checker only looks at text, boxes and arrows.

const CRATE = "#d6b588";
/** a stick figure standing at (x, feet y) with a given height; arms are two end points relative to the shoulder */
function person(sb: SceneBuilder, x: number, feet: number, arms: [number, number][], h = 100, col = INK) {
  const head = feet - h, sh = head + 18, hip = feet - h * 0.42;
  sb.circle(x, head + 8, 9, { fill: "#fbbf24" });
  sb.line(x, head + 17, x, hip, { stroke: col, sw: 3.4, decor: true });
  sb.line(x, hip, x - 14, feet, { stroke: col, sw: 3.4, decor: true }); sb.line(x, hip, x + 14, feet, { stroke: col, sw: 3.4, decor: true });
  arms.forEach(([dx, dy]) => sb.line(x, sh, x + dx, sh + dy, { stroke: col, sw: 3.2, decor: true }));
}

// ── 1. push, pull, lift ──
function pushPull(): Scene {
  const sb = new SceneBuilder(720, 310, "Moving a box: pushing, pulling, lifting and carrying");
  [20, 256, 492].forEach((ox, i) => {
    sb.line(ox, 205, ox + 212, 205, { stroke: GREY, sw: 2 });
    if (i === 0) { person(sb, ox + 50, 205, [[44, 18], [38, 30]]); sb.rect(ox + 96, 150, 70, 55, { fill: CRATE }); sb.arrow(ox + 100, 130, ox + 186, 130, { stroke: GREEN, sw: 3 }); sb.text(ox + 150, 118, "push", { size: 13, fill: DGREEN }); }
    if (i === 1) { sb.rect(ox + 10, 150, 70, 55, { fill: CRATE }); person(sb, ox + 170, 205, [[-40, 22], [-34, 34]]); sb.line(ox + 80, 178, ox + 133, 172, { stroke: BROWN, sw: 2.4 }); sb.arrow(ox + 60, 104, ox + 140, 104, { stroke: GREEN, sw: 3 }); sb.text(ox + 100, 92, "pull", { size: 13, fill: DGREEN }); }
    if (i === 2) { person(sb, ox + 106, 205, [[-26, 28], [26, 28]]); sb.rect(ox + 78, 146, 56, 40, { fill: CRATE }); sb.arrow(ox + 160, 160, ox + 160, 96, { stroke: GREEN, sw: 3 }); sb.text(ox + 186, 100, "pull up", { size: 12, fill: DGREEN, anchor: "start" }); }
    sb.text(ox + 106, 236, ["(a) Pushing", "(b) Pulling", "(c) Lifting and carrying"][i], { size: 13.5 });
  });
  sb.text(360, 282, "Every way of moving a box needs a push or a pull. A push or a pull on an object is called a force.", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 2. four effects of a force ──
function effects(): Scene {
  const sb = new SceneBuilder(720, 330, "What a force can do to an object");
  const cards: [string, string[], string, string][] = [
    ["Moves it from rest", ["kicking a football", "opening a drawer"], LBLUE, BLUE],
    ["Changes its speed", ["applying brakes on", "a moving bicycle"], LGREEN, GREEN],
    ["Changes its direction", ["hitting a moving ball", "with a bat"], LORANGE, ORANGE],
    ["Changes its shape", ["pressing a balloon,", "rolling a chapati"], LPURPLE, PURPLE],
  ];
  cards.forEach(([t, ex, fill, stroke], i) => {
    const x = 12 + i * 177, cx = x + 82;
    sb.rect(x, 20, 165, 240, { rx: 12, fill, stroke, sw: 2 });
    if (i === 0) { sb.circle(cx + 20, 100, 18, { fill: RED }); sb.arrow(cx - 55, 100, cx - 8, 100, { stroke: INK, sw: 3 }); }
    if (i === 1) { sb.circle(cx - 40, 80, 12, { fill: RED }); sb.arrow(cx - 20, 80, cx + 10, 80, { stroke: INK, sw: 3 }); sb.circle(cx - 40, 125, 12, { fill: RED }); sb.arrow(cx - 20, 125, cx + 58, 125, { stroke: INK, sw: 3 }); }
    if (i === 2) { sb.arrow(cx - 55, 135, cx - 5, 90, { stroke: INK, sw: 3 }); sb.arrow(cx - 2, 90, cx + 52, 128, { stroke: INK, sw: 3 }); sb.circle(cx - 4, 88, 11, { fill: RED }); }
    if (i === 3) { sb.circle(cx - 36, 100, 24, { fill: "#f472b6" }); sb.arrow(cx - 4, 100, cx + 14, 100, { stroke: INK, sw: 3 }); sb.ellipse(cx + 42, 100, 28, 14, { fill: "#f472b6" }); }
    sb.text(cx, 178, t, { size: 13.5 });
    ex.forEach((e, k) => sb.text(cx, 206 + k * 18, e, { size: 12, bold: false, fill: "#334155" }));
  });
  sb.text(360, 300, "None of these changes happens without a force", { size: 13, fill: GREY, bold: false });
  return sb.build();
}

// ── 3. force is an interaction ──
function interaction(): Scene {
  const sb = new SceneBuilder(720, 320, "A force is an interaction between two objects");
  box(sb, 40, 70, 150, 100, ["Your hand", "(object 1)"], { fill: LBLUE, stroke: BLUE, size: 14, bold: [true, false] });
  box(sb, 530, 70, 150, 100, ["The table", "(object 2)"], { fill: LORANGE, stroke: ORANGE, size: 14, bold: [true, false] });
  sb.arrow(196, 100, 524, 100, { stroke: GREEN, sw: 3 }); sb.text(360, 88, "force of the hand on the table", { size: 13, fill: DGREEN });
  sb.arrow(524, 140, 196, 140, { stroke: RED, sw: 3 }); sb.text(360, 168, "force of the table on the hand", { size: 13, fill: RED });
  box(sb, 60, 220, 600, 72, ["At least two objects must interact for a force to come into play.", "Each object feels a force from the other. When the interaction stops, the forces stop."], { fill: LYELLOW, stroke: "#ca8a04", size: 13, bold: [true, false] });
  return sb.build();
}

// ── 4. types of forces ──
function types(): Scene {
  const sb = new SceneBuilder(720, 330, "Contact and non-contact forces");
  box(sb, 260, 14, 200, 44, ["Forces"], { fill: "#0f172a", stroke: "#0f172a", size: 17, fillText: "#ffffff" });
  sb.line(360, 58, 360, 76, { stroke: GREY, sw: 2 }); sb.line(190, 76, 540, 76, { stroke: GREY, sw: 2 }); sb.line(190, 76, 190, 96, { stroke: GREY, sw: 2 }); sb.line(540, 76, 540, 96, { stroke: GREY, sw: 2 });
  box(sb, 60, 96, 260, 60, ["Contact forces", "act only when objects touch"], { fill: LGREEN, stroke: GREEN, size: 13.5, bold: [true, false] });
  box(sb, 400, 96, 280, 60, ["Non-contact forces", "act even without touching"], { fill: LPURPLE, stroke: PURPLE, size: 13.5, bold: [true, false] });
  [[110, 190], [270, 190]].forEach(([x]) => sb.line(190, 156, x + 50, 190, { stroke: GREEN, sw: 1.8 }));
  [[372], [484], [596]].forEach(([x]) => sb.line(540, 156, x + 52, 190, { stroke: PURPLE, sw: 1.8 }));
  [[30, "Muscular force"], [210, "Friction"]].forEach(([x, t]) => box(sb, x as number, 190, 150, 50, [t as string], { fill: "#ffffff", stroke: GREEN, size: 13 }));
  [[372, ["Magnetic", "force"]], [484, ["Electrostatic", "force"]], [596, ["Gravitational", "force"]]].forEach(([x, t]) => box(sb, x as number, 190, 108, 50, t as string[], { fill: "#ffffff", stroke: PURPLE, size: 12, bold: [true, false] }));
  sb.text(360, 280, "The contact can be direct (hands, body) or indirect (a stick or a rope)", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 302, "Magnetic and electrostatic forces can attract or repel; gravitational force only attracts", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 5. muscular force ──
function muscular(): Scene {
  const sb = new SceneBuilder(720, 320, "Muscular force");
  const cards: [string, string[], string][] = [
    ["Our body", ["walking, running,", "lifting, jumping"], LBLUE],
    ["Animals", ["bullocks plough fields", "and pull carts"], LORANGE],
    ["The heart", ["heart muscles pump", "blood round the body"], LRED],
    ["The food pipe", ["muscles push the", "food along it"], LGREEN],
  ];
  const strokes = [BLUE, ORANGE, RED, GREEN];
  cards.forEach(([t, ex, fill], i) => {
    const x = 12 + i * 177, cx = x + 82;
    sb.rect(x, 20, 165, 230, { rx: 12, fill, stroke: strokes[i], sw: 2 });
    if (i === 0) { person(sb, cx, 140, [[-26, 16], [26, -6]], 84); }
    if (i === 1) { sb.ellipse(cx - 22, 108, 30, 14, { fill: "#92400e" }); sb.circle(cx - 54, 98, 9, { fill: "#92400e" }); [-38, -28, -8, 2].forEach((d) => sb.line(cx + d, 118, cx + d, 138, { stroke: "#92400e", sw: 4, decor: true })); sb.rect(cx + 20, 96, 40, 18, { fill: CRATE }); sb.circle(cx + 32, 124, 11, { fill: "#6b7280" }); sb.circle(cx + 52, 124, 11, { fill: "#6b7280" }); sb.line(cx + 8, 104, cx + 20, 104, { stroke: INK, sw: 2, decor: true }); }
    if (i === 2) { sb.circle(cx - 10, 94, 15, { fill: "#ef4444" }); sb.circle(cx + 12, 94, 15, { fill: "#ef4444" }); sb.poly([[cx - 23, 102], [cx + 25, 102], [cx + 1, 138]], { fill: "#ef4444" }); }
    if (i === 3) { sb.rect(cx - 56, 104, 112, 24, { rx: 12, fill: "#fda4af" }); sb.arrow(cx - 40, 116, cx + 40, 116, { stroke: "#ffffff", sw: 3 }); }
    sb.text(cx, 178, t, { size: 14 });
    ex.forEach((e, k) => sb.text(cx, 204 + k * 18, e, { size: 12, bold: false, fill: "#334155" }));
  });
  sb.text(360, 290, "Muscular force is a contact force: the force of the muscles when they contract and elongate", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 6. friction ──
function friction(): Scene {
  const sb = new SceneBuilder(720, 330, "Friction opposes motion and arises from surface irregularities");
  sb.line(30, 190, 330, 190, { stroke: GREY, sw: 2.4 });
  sb.rect(110, 130, 90, 60, { fill: CRATE });
  sb.arrow(86, 160, 40, 160, { stroke: RED, sw: 3 }); sb.text(62, 148, "friction", { size: 12.5, fill: RED });
  sb.arrow(224, 160, 300, 160, { stroke: GREEN, sw: 3 }); sb.text(262, 148, "push", { size: 12.5, fill: DGREEN });
  sb.text(180, 232, "A pushed object slides and stops:", { size: 13 }); sb.text(180, 252, "friction acts opposite to its motion", { size: 13 });
  const top: [number, number][] = [], bot: [number, number][] = [];
  for (let i = 0; i <= 9; i++) { top.push([400 + i * 30, i % 2 ? 128 : 100]); bot.push([415 + i * 30, i % 2 ? 128 : 156]); }
  sb.poly(top.slice(0, 9), { stroke: BLUE, sw: 2.4, close: false }); sb.poly(bot.slice(0, 9), { stroke: ORANGE, sw: 2.4, close: false });
  sb.rect(400, 60, 240, 40, { fill: "#dbeafe" }); sb.rect(415, 156, 240, 36, { fill: "#fed7aa" });
  sb.text(530, 48, "surface 1 (magnified)", { size: 12 }); sb.text(530, 212, "surface 2 (magnified)", { size: 12 });
  sb.text(530, 244, "Even smooth-looking surfaces have tiny bumps and dips.", { size: 12, bold: false });
  sb.text(530, 262, "They lock into each other and oppose motion.", { size: 12, bold: false });
  sb.text(360, 306, "The force of friction is a contact force", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 7. friction and the surface ──
function surfaces(): Scene {
  const sb = new SceneBuilder(720, 320, "The same object pushed on different surfaces");
  const rows: [string, number, string][] = [["Glass", 400, "#93c5fd"], ["Ceramic tile", 330, "#a5b4fc"], ["Wood", 250, "#d6b588"], ["Cloth", 160, "#f9a8d4"], ["Sand", 80, "#fde68a"]];
  sb.text(360, 28, "Distance travelled by the object after the same push", { size: 13.5, fill: GREY });
  rows.forEach(([t, len, col], i) => {
    const y = 64 + i * 46;
    sb.text(130, y + 5, t, { size: 13.5, anchor: "end" });
    sb.rect(144, y - 15, len, 30, { rx: 6, fill: col });
  });
  sb.text(554, 69, "smooth: goes far", { size: 12, anchor: "start", fill: DGREEN, bold: false });
  sb.text(236, 253, "rough: stops soon", { size: 12, anchor: "start", fill: RED, bold: false });
  sb.text(360, 304, "Friction depends on the surfaces in contact and is greater on rough surfaces", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 8. friction: a necessity and a problem ──
function necessity(): Scene {
  const sb = new SceneBuilder(720, 340, "Friction is a necessity and a problem");
  box(sb, 20, 14, 330, 34, ["Friction is a necessity"], { fill: GREEN, stroke: GREEN, size: 15, fillText: "#ffffff" });
  box(sb, 370, 14, 330, 34, ["Friction is a problem"], { fill: RED, stroke: RED, size: 15, fillText: "#ffffff" });
  ["Walking without slipping", "Writing with a pen or pencil", "Applying brakes to stop a vehicle", "Holding objects, lighting a matchstick"].forEach((t, i) => box(sb, 20, 60 + i * 48, 330, 38, [t], { fill: LGREEN, stroke: GREEN, size: 13, bold: [false] }));
  ["Wears out shoe soles and tyres", "Wastes energy as heat in machines", "Makes heavy objects hard to move", "Slows vehicles and needs more fuel"].forEach((t, i) => box(sb, 370, 60 + i * 48, 330, 38, [t], { fill: LRED, stroke: RED, size: 13, bold: [false] }));
  sb.text(360, 275, "To reduce friction: oiling, greasing, ball bearings, wheels, smooth surfaces", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 297, "To increase friction: treads on tyres and shoes, rough surfaces", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 319, "Ships, boats, aeroplanes and fast trains have shapes that reduce friction with water or air", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 9. two ring magnets ──
function ringMagnets(): Scene {
  const sb = new SceneBuilder(720, 330, "Two ring magnets on a stick");
  sb.rect(180, 286, 240, 14, { fill: CRATE });
  sb.rect(294, 60, 12, 228, { fill: BROWN });
  const ring = (y: number, topCol: string, topT: string, botCol: string, botT: string) => {
    sb.rect(250, y, 100, 14, { fill: topCol }); sb.rect(250, y + 14, 100, 14, { fill: botCol });
    sb.rect(294, y, 12, 28, { fill: BROWN });
    sb.text(268, y + 11, topT, { size: 11, fill: "#ffffff" }); sb.text(332, y + 11, topT, { size: 11, fill: "#ffffff" });
    sb.text(268, y + 25, botT, { size: 11, fill: "#ffffff" }); sb.text(332, y + 25, botT, { size: 11, fill: "#ffffff" });
  };
  ring(256, "#ef4444", "N", "#2563eb", "S");
  ring(170, "#2563eb", "S", "#ef4444", "N");
  sb.arrow(228, 238, 228, 206, { stroke: GREEN, sw: 3 });
  sb.arrow(372, 140, 372, 172, { stroke: RED, sw: 3 });
  sb.text(424, 250, "magnetic force pushes up", { size: 12.5, anchor: "start", fill: DGREEN });
  sb.text(424, 130, "weight pulls down", { size: 12.5, anchor: "start", fill: RED });
  sb.text(424, 200, "like poles face each other:", { size: 12.5, anchor: "start" }); sb.text(424, 218, "the upper magnet floats", { size: 12.5, anchor: "start" });
  sb.text(360, 322, "A magnet exerts a force on another magnet without touching it: a non-contact force", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 10. like and unlike poles ──
function poles(): Scene {
  const sb = new SceneBuilder(720, 300, "Like poles repel and unlike poles attract");
  const rows: [number, string, string, string, string, boolean, string][] = [
    [60, "N", "S", "N", "S", true, "unlike poles (S and N face each other): attract"],
    [150, "S", "N", "N", "S", false, "like poles (N and N face each other): repel"],
    [240, "N", "S", "S", "N", false, "like poles (S and S face each other): repel"],
  ];
  rows.forEach(([y, a1, a2, b1, b2, att, t]) => {
    const col = (c: string) => (c === "N" ? "#ef4444" : "#2563eb");
    sb.rect(120, y - 14, 50, 28, { fill: col(a1) }); sb.rect(170, y - 14, 50, 28, { fill: col(a2) });
    sb.rect(300, y - 14, 50, 28, { fill: col(b1) }); sb.rect(350, y - 14, 50, 28, { fill: col(b2) });
    [[145, a1], [195, a2], [325, b1], [375, b2]].forEach(([x, c]) => sb.text(x as number, y + 5, c as string, { size: 14, fill: "#ffffff" }));
    if (att) { sb.arrow(226, y, 250, y, { stroke: GREEN, sw: 3 }); sb.arrow(294, y, 270, y, { stroke: GREEN, sw: 3 }); }
    else { sb.arrow(246, y, 224, y, { stroke: RED, sw: 3 }); sb.arrow(274, y, 296, y, { stroke: RED, sw: 3 }); }
    sb.text(420, y + 5, t, { size: 12.5, anchor: "start" });
  });
  return sb.build();
}

// ── 11. charged scale and paper ──
function charged(): Scene {
  const sb = new SceneBuilder(720, 320, "A charged plastic scale attracts small pieces of paper");
  sb.rect(150, 40, 300, 18, { rx: 5, fill: "#38bdf8" });
  [180, 230, 280, 330, 380, 420].forEach((x) => sb.text(x, 54, "−", { size: 15, fill: "#ffffff" }));
  sb.rect(60, 226, 480, 14, { fill: CRATE });
  [150, 250, 350, 450].forEach((x) => sb.rect(x - 9, 220, 18, 6, { fill: "#fde047" }));
  [[210, 120], [320, 100], [410, 130]].forEach(([x, y]) => sb.rect(x - 9, y, 18, 6, { fill: "#fde047" }));
  [[250, 78], [330, 78]].forEach(([x, y]) => sb.rect(x - 9, y, 18, 6, { fill: "#fde047" }));
  [150, 250, 350, 450].forEach((x) => sb.arrow(x, 214, x, 150, { stroke: GREEN, sw: 2.4 }));
  sb.text(500, 100, "paper pieces are pulled up", { size: 12.5, anchor: "start" }); sb.text(500, 118, "and stick to the scale", { size: 12.5, anchor: "start" });
  box(sb, 20, 258, 680, 52, ["Rubbing builds up static charges on the scale.", "A charged object attracts uncharged objects without touching them."], { fill: LYELLOW, stroke: "#ca8a04", size: 12.5, bold: [true, false] });
  return sb.build();
}

// ── 12. charged balloons ──
function balloons(): Scene {
  const sb = new SceneBuilder(720, 320, "Two balloons rubbed with a woollen cloth");
  sb.line(20, 30, 700, 30, { stroke: BROWN, sw: 4 });
  const bal = (x: number, y: number, ch: string) => { sb.circle(x, y, 26, { fill: "#fda4af" }); if (ch) sb.text(x, y + 6, ch, { size: 17, fill: "#7f1d1d" }); };
  // (a)
  sb.line(80, 30, 80, 160, { stroke: GREY, sw: 1.6 }); sb.line(150, 30, 150, 160, { stroke: GREY, sw: 1.6 }); bal(80, 186, ""); bal(150, 186, "");
  // (b)
  sb.line(335, 30, 300, 152, { stroke: GREY, sw: 1.6 }); sb.line(405, 30, 440, 152, { stroke: GREY, sw: 1.6 }); bal(296, 178, "−"); bal(444, 178, "−");
  sb.arrow(334, 185, 322, 185, { stroke: RED, sw: 2.4 }); sb.arrow(406, 185, 418, 185, { stroke: RED, sw: 2.4 });
  // (c)
  sb.line(560, 30, 584, 152, { stroke: GREY, sw: 1.6 }); bal(588, 178, "−");
  sb.rect(630, 150, 46, 62, { rx: 6, fill: "#fb923c" }); sb.text(653, 188, "+", { size: 20, fill: "#ffffff" });
  sb.arrow(618, 182, 640, 182, { stroke: GREEN, sw: 2.4 });
  [[115, ["(a) Uncharged balloons", "hang straight"]], [370, ["(b) Both rubbed: they", "repel each other"]], [610, ["(c) Rubbed balloon and", "woollen cloth attract"]]].forEach(([x, ls]) => (ls as string[]).forEach((l, k) => sb.text(x as number, 246 + k * 18, l, { size: 12.5, bold: k === 0 })));
  sb.text(360, 300, "Like charges repel; unlike charges attract. The two kinds are called positive and negative.", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

export const FO_DIAGRAMS_1: Record<string, () => Scene> = {
  fo_pushpull: pushPull,
  fo_effects: effects,
  fo_interaction: interaction,
  fo_types: types,
  fo_muscular: muscular,
  fo_friction: friction,
  fo_surfaces: surfaces,
  fo_necessity: necessity,
  fo_ringmagnets: ringMagnets,
  fo_poles: poles,
  fo_charged: charged,
  fo_balloons: balloons,
};
void [GREEN, DGREEN, LGREEN, TEAL, LTEAL, LGREY, YELLOW, LYELLOW, LBROWN, PURPLE, LPURPLE, YELLOW];
