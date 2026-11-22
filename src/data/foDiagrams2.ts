import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, RED, LRED, YELLOW, LYELLOW, BROWN, box } from "./harmKit";

// Diagrams (part 2) for Class VIII Science "Exploring Forces" (NCERT Chapter 5): gravity, weight and mass, the spring balance, floating and sinking,
// the ball on a slope, the Competition Corner pictures and the mind map.

const CRATE = "#d6b588";

// ── 13. gravity pulls everything down ──
function gravity(): Scene {
  const sb = new SceneBuilder(720, 330, "The Earth pulls every object towards itself");
  sb.circle(360, 552, 302, { fill: "#86efac" }); sb.circle(360, 552, 272, { fill: "#4ade80" });
  sb.text(360, 26, "Objects thrown up or dropped finally fall to the ground: the Earth attracts them", { size: 13, fill: GREY, bold: false });
  sb.text(360, 46, "Gravitational force is always attractive, and it is a non-contact force", { size: 13, fill: GREY, bold: false });
  [[150, "a fruit"], [360, "a ball"], [570, "a diver"]].forEach(([x, t], i) => {
    if (i === 0) { sb.circle(x as number, 120, 15, { fill: RED }); sb.line(x as number, 105, (x as number) + 4, 96, { stroke: "#166534", sw: 3, decor: true }); }
    if (i === 1) { sb.circle(x as number, 120, 15, { fill: ORANGE }); }
    if (i === 2) { sb.circle(x as number, 100, 8, { fill: "#fbbf24" }); sb.line(x as number, 108, x as number, 132, { stroke: INK, sw: 4, decor: true }); sb.line(x as number, 114, (x as number) - 14, 100, { stroke: INK, sw: 3, decor: true }); sb.line(x as number, 114, (x as number) + 14, 100, { stroke: INK, sw: 3, decor: true }); sb.line(x as number, 132, (x as number) - 8, 148, { stroke: INK, sw: 3, decor: true }); sb.line(x as number, 132, (x as number) + 8, 148, { stroke: INK, sw: 3, decor: true }); }
    sb.arrow(x as number, 160, x as number, 240, { stroke: RED, sw: 3 });
    sb.text(x as number, 80, t as string, { size: 13 });
    sb.text((x as number) + 14, 204, "gravity", { size: 12, anchor: "start", fill: RED });
  });
  sb.text(360, 292, "Earth", { size: 17, fill: "#14532d" });
  return sb.build();
}

// ── 14. forces on a ball thrown upwards ──
function vertical(): Scene {
  const sb = new SceneBuilder(720, 340, "Forces on a ball thrown upwards");
  const heads = [["(a) Going up", "speed decreases"], ["(b) At the top", "stops for a moment"], ["(c) Coming down", "speed increases"]];
  [10, 250, 490].forEach((ox, i) => {
    sb.rect(ox, 20, 220, 250, { rx: 12, fill: "#f8fafc", stroke: "#cbd5e1", sw: 1.6 });
    sb.text(ox + 110, 46, heads[i][0], { size: 14 }); sb.text(ox + 110, 66, heads[i][1], { size: 12, bold: false, fill: GREY });
    sb.circle(ox + 110, 140, 15, { fill: ORANGE });
    sb.arrow(ox + 102, 160, ox + 102, 232, { stroke: RED, sw: 3.4 });
    if (i === 0) sb.arrow(ox + 124, 160, ox + 124, 200, { stroke: BLUE, sw: 3.4 });
    if (i === 2) sb.arrow(ox + 124, 122, ox + 124, 82, { stroke: BLUE, sw: 3.4 });
    if (i === 0) sb.arrow(ox + 160, 190, ox + 160, 90, { stroke: GREEN, sw: 2.4 });
    if (i === 2) sb.arrow(ox + 160, 90, ox + 160, 190, { stroke: GREEN, sw: 2.4 });
    if (i === 0 || i === 2) sb.text(ox + 170, 142, "motion", { size: 11.5, anchor: "start", fill: DGREEN, bold: false });
  });
  sb.text(135, 296, "gravity: downwards, always", { size: 12.5, fill: RED });
  sb.text(360, 296, "air friction: opposite to the motion", { size: 12.5, fill: BLUE });
  sb.text(590, 296, "only gravity at the top", { size: 12.5, fill: GREY });
  sb.text(360, 324, "Gravity acts on the ball all the time: up, at the top and down", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 15. a spring stretched by different objects ──
function spring(): Scene {
  const sb = new SceneBuilder(720, 340, "A spring stretched by different objects");
  sb.rect(40, 24, 640, 10, { fill: BROWN });
  [[130, 70, 50, "light object"], [360, 110, 64, "heavier object"], [590, 150, 80, "heaviest object"]].forEach(([x, ext, w, t]) => {
    const pts: [number, number][] = [[x as number, 34]];
    const n = 9;
    for (let k = 1; k <= n; k++) pts.push([(x as number) + (k % 2 ? 12 : -12), 34 + ((ext as number) * k) / n]);
    pts.push([x as number, 34 + (ext as number)]);
    sb.poly(pts, { stroke: "#475569", sw: 2.4, close: false });
    const yy = 34 + (ext as number);
    sb.rect((x as number) - (w as number) / 2, yy + 8, w as number, 36, { rx: 5, fill: CRATE });
    sb.text(x as number, yy + 68, t as string, { size: 13 });
  });
  sb.text(360, 292, "The spring stretches more for a heavier object: the Earth pulls different objects", { size: 12.5, bold: false, fill: GREY });
  sb.text(360, 312, "with different forces, so their weights are different", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 16. the spring balance and its smallest reading ──
function balance(): Scene {
  const sb = new SceneBuilder(720, 340, "A spring balance: range and smallest reading");
  sb.rect(280, 20, 56, 250, { rx: 8, fill: "#f1f5f9", stroke: INK, sw: 2 });
  for (let k = 0; k <= 50; k++) { const y = 40 + k * 4.4; sb.line(336, y, k % 5 === 0 ? 352 : 344, y, { stroke: INK, sw: k % 5 === 0 ? 1.8 : 1 }); }
  for (let k = 0; k <= 10; k++) sb.text(362, 40 + k * 22 + 4.5, String(k), { size: 11, anchor: "start" });
  sb.text(402, 36, "N", { size: 12, anchor: "start", fill: GREY });
  sb.poly([[270, 132], [254, 123], [254, 141]], { fill: RED });
  sb.text(246, 136, "pointer", { size: 11.5, anchor: "end", fill: RED, bold: false });
  sb.line(308, 270, 308, 290, { stroke: INK, sw: 3 }); sb.circle(308, 296, 7, { stroke: INK, sw: 3 });
  box(sb, 440, 24, 260, 52, ["Range: 0 to 10 N", "the largest weight it can measure"], { fill: LBLUE, stroke: BLUE, size: 12.5, bold: [true, false] });
  box(sb, 440, 90, 260, 52, ["Between two bigger marks: 1 N", "number of small divisions: 5"], { fill: LORANGE, stroke: ORANGE, size: 12.5, bold: [true, false] });
  box(sb, 440, 156, 260, 62, ["Smallest reading", "1 N ÷ 5 = 0.2 N"], { fill: LGREEN, stroke: GREEN, size: 14, bold: [true, true] });
  box(sb, 440, 232, 260, 52, ["Never hang an object heavier", "than the range: it may be damaged"], { fill: LRED, stroke: RED, size: 12.5, bold: [true, false] });
  sb.text(360, 326, "The pointer here is at 4.2 N: the 4 N mark and one small division (0.2 N) more", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 17. weight of 1 kg on different planets ──
function planets(): Scene {
  const sb = new SceneBuilder(720, 320, "Weight of an object of mass 1 kg at different places");
  const rows: [string, number, string][] = [["Earth", 10, "#60a5fa"], ["Moon", 1.6, "#94a3b8"], ["Mars", 3.8, "#f87171"], ["Venus", 9, "#fbbf24"], ["Jupiter", 25.4, "#fb923c"]];
  sb.text(360, 26, "The mass is 1 kg everywhere; only the weight changes", { size: 13.5, fill: GREY });
  rows.forEach(([t, w, col], i) => {
    const y = 66 + i * 46;
    sb.text(120, y + 5, t, { size: 14, anchor: "end" });
    sb.rect(134, y - 15, (w as number) * 20, 30, { rx: 6, fill: col as string });
    sb.text(134 + (w as number) * 20 + 12, y + 5, `${w} N`, { size: 14, anchor: "start" });
  });
  sb.text(360, 300, "On the Moon the weight is about one-sixth of the weight on the Earth", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 18. floating and sinking ──
function buoyancy(): Scene {
  const sb = new SceneBuilder(720, 350, "Upthrust: floating and sinking");
  const bk = (ox: number, level: number) => { const top = 110 + 170 * (1 - level); sb.rect(ox + 21, top, 168, 280 - top - 1, { fill: "#bfdbfe" }); sb.poly([[ox + 20, 110], [ox + 20, 280], [ox + 190, 280], [ox + 190, 110]], { stroke: INK, sw: 2, close: false }); };
  [10, 250, 490].forEach((ox, i) => {
    bk(ox, 0.7);
    if (i === 0) { sb.rect(ox + 90, 170, 30, 50, { rx: 8, fill: "#a78bfa" }); sb.arrow(ox + 105, 130, ox + 105, 164, { stroke: RED, sw: 3.4 }); sb.arrow(ox + 105, 258, ox + 105, 226, { stroke: GREEN, sw: 3.4 }); sb.text(ox + 156, 132, "push", { size: 12, anchor: "start", fill: RED, bold: false }); }
    if (i === 1) { sb.ellipse(ox + 105, 215, 24, 16, { fill: "#6b7280" }); sb.arrow(ox + 90, 200, ox + 90, 168, { stroke: GREEN, sw: 3 }); sb.arrow(ox + 120, 226, ox + 120, 272, { stroke: RED, sw: 3.8 }); }
    if (i === 2) { sb.rect(ox + 70, 180, 70, 38, { rx: 4, fill: "#d6b588" }); sb.arrow(ox + 88, 196, ox + 88, 150, { stroke: GREEN, sw: 3 }); sb.arrow(ox + 122, 196, ox + 122, 244, { stroke: RED, sw: 3 }); }
    sb.text(ox + 105, 56, ["(a) A bottle pushed in water", "(b) Sinks", "(c) Floats"][i], { size: 13.5 });
    sb.text(ox + 105, 78, ["the water pushes it up", "gravity is more than upthrust", "gravity equals upthrust"][i], { size: 12, bold: false, fill: GREY });
  });
  sb.text(250, 328, "gravitational force (weight): downwards", { size: 12.5, fill: RED });
  sb.text(520, 328, "buoyant force (upthrust): upwards", { size: 12.5, fill: DGREEN });
  return sb.build();
}

// ── 19. Archimedes' principle ──
function archimedes(): Scene {
  const sb = new SceneBuilder(720, 330, "Archimedes' principle");
  sb.poly([[40, 90], [40, 240], [200, 240], [200, 90]], { stroke: INK, sw: 2, close: false });
  sb.rect(41, 120, 158, 119, { fill: "#bfdbfe" });
  sb.poly([[200, 110], [236, 106], [236, 114], [200, 120]], { stroke: INK, sw: 2, close: false });
  sb.ellipse(120, 156, 36, 24, { fill: "#6b7280" });
  [[246, 150], [246, 176]].forEach(([x, y]) => sb.circle(x, y, 4, { fill: "#60a5fa" }));
  sb.poly([[226, 190], [226, 262], [296, 262], [296, 190]], { stroke: INK, sw: 2, close: false });
  sb.rect(227, 232, 68, 29, { fill: "#bfdbfe" });
  sb.text(120, 72, "object in a full can", { size: 12.5 }); sb.text(262, 284, "displaced liquid", { size: 12 });
  box(sb, 340, 30, 360, 74, ["Archimedes' principle", "An object fully or partly dipped in a liquid feels an", "upward force equal to the weight of the liquid it displaces"], { fill: LBLUE, stroke: BLUE, size: 12.5, bold: [true, false, false] });
  box(sb, 340, 124, 360, 56, ["Weight of displaced liquid is less than the object's weight", "the object sinks"], { fill: LRED, stroke: RED, size: 12.5, bold: [false, true] });
  box(sb, 340, 196, 360, 56, ["Weight of displaced liquid equals the object's weight", "the object floats"], { fill: LGREEN, stroke: GREEN, size: 12.5, bold: [false, true] });
  sb.text(520, 290, "Pumice floats because it has tiny gas bubbles trapped inside", { size: 12, bold: false, fill: GREY });
  return sb.build();
}

// ── 20. ball on a slope: friction decides where it stops ──
function slope(): Scene {
  const sb = new SceneBuilder(720, 340, "A ball released from P stops at A");
  [0, 170].forEach((oy, p) => {
    sb.poly([[40, oy + 30], [250, oy + 130], [690, oy + 130]], { stroke: INK, sw: 2.4, close: false });
    sb.circle(50, oy + 26, 11, { fill: ORANGE });
    sb.text(34, oy + 20, "P", { size: 14, anchor: "end" });
    sb.line(470, oy + 70, 470, oy + 128, { stroke: GREY, sw: 1.6, dash: "4 3", decor: true });
    sb.text(470, oy + 62, "A", { size: 14 });
    if (p === 0) { for (let x = 270; x < 440; x += 12) sb.line(x, oy + 130, x + 6, oy + 123, { stroke: BROWN, sw: 2.4, decor: true }); sb.circle(436, oy + 118, 11, { fill: ORANGE }); sb.text(600, oy + 96, "rough surface (sand, cloth)", { size: 12, fill: BROWN }); sb.text(600, oy + 114, "more friction: stops before A", { size: 12, bold: false }); }
    else { sb.rect(260, oy + 130, 400, 6, { fill: "#93c5fd" }); sb.circle(580, oy + 118, 11, { fill: ORANGE }); sb.text(560, oy + 156, "smooth surface (glass): less friction, stops after A", { size: 12, bold: false }); }
  });
  sb.text(360, 28, "Friction on the horizontal surface decides how far the ball goes", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 21. mind map ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "Exploring Forces: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "What is a force?", col: "#b45309", tint: "#fef3c7", leaves: ["A push or a pull", "Interaction of two objects", "SI unit: newton (N)"] },
    { n: "2", t: "Effects of force", col: "#2563eb", tint: "#dbeafe", leaves: ["Moves an object from rest", "Changes speed or direction", "Changes the shape"] },
    { n: "3", t: "Contact forces", col: "#0f766e", tint: "#ccfbf1", leaves: ["Muscular force", "Friction", "Direct or indirect contact"] },
    { n: "4", t: "Friction", col: "#15803d", tint: "#dcfce7", leaves: ["Opposes the motion", "Due to surface irregularities", "More on rough surfaces"] },
    { n: "5", t: "Non-contact forces", col: "#c2410c", tint: "#ffedd5", leaves: ["Magnetic force", "Electrostatic force", "Gravitational force"] },
    { n: "6", t: "Gravity and weight", col: "#7c3aed", tint: "#ede9fe", leaves: ["Always attractive", "Weight: pull of the Earth, in N", "Spring balance measures it"] },
    { n: "7", t: "Mass and weight", col: "#b91c1c", tint: "#fee2e2", leaves: ["Mass is the same everywhere", "Weight changes with the place", "1 kg weighs 10 N, 1.6 N on Moon"] },
    { n: "8", t: "Floating and sinking", col: "#a21caf", tint: "#fae8ff", leaves: ["Upthrust: upward force of a liquid", "Weight more than upthrust: sinks", "Equal: floats (Archimedes)"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 8, "EXPLORING", { size: 17, fill: "#ffffff" }); sb.text(cx, cy + 16, "FORCES", { size: 19, fill: "#e2e8f0" });
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
    ["Force", "a push or a pull from an interaction", "it changes speed, direction or shape", "#0f766e"],
    ["Mass and weight", "mass stays the same everywhere", "weight is the pull of the Earth, in newton", "#c2410c"],
    ["Floating", "floats if weight equals the upthrust", "sinks if weight is more than the upthrust", "#a21caf"],
  ];
  rules.forEach(([a, b2, c2, col], i) => {
    const x = 90 + i * 430;
    sb.rect(x, 820, 400, 100, { rx: 16, fill: "#ffffff", stroke: col, sw: 2.6 });
    sb.rect(x, 820, 400, 34, { rx: 16, fill: col });
    sb.text(x + 200, 843, a, { size: 14.5, fill: "#ffffff" });
    sb.text(x + 200, 878, b2, { size: 13, fill: INK }); sb.text(x + 200, 900, c2, { size: 12, fill: INK, bold: false });
  });
  return sb.build();
}

// ── 22. resultant of two forces (Competition Corner) ──
function resultant(): Scene {
  const sb = new SceneBuilder(720, 310, "Resultant of two forces on a box");
  const rows: [number, string][] = [[60, "same direction: 5 N + 3 N = 8 N, to the right"], [150, "opposite directions: 5 N − 3 N = 2 N, to the right"], [240, "equal and opposite: 5 N − 5 N = 0: balanced forces"]];
  rows.forEach(([y, t], i) => {
    sb.rect(300, y - 24, 80, 48, { rx: 4, fill: CRATE });
    if (i === 0) { sb.arrow(384, y - 8, 484, y - 8, { stroke: GREEN, sw: 3 }); sb.text(496, y - 4, "5 N", { size: 12.5, anchor: "start" }); sb.arrow(384, y + 10, 444, y + 10, { stroke: BLUE, sw: 3 }); sb.text(456, y + 14, "3 N", { size: 12.5, anchor: "start" }); }
    if (i === 1) { sb.arrow(384, y, 484, y, { stroke: GREEN, sw: 3 }); sb.text(496, y + 4, "5 N", { size: 12.5, anchor: "start" }); sb.arrow(296, y, 236, y, { stroke: RED, sw: 3 }); sb.text(226, y + 4, "3 N", { size: 12.5, anchor: "end" }); }
    if (i === 2) { sb.arrow(384, y, 484, y, { stroke: GREEN, sw: 3 }); sb.text(496, y + 4, "5 N", { size: 12.5, anchor: "start" }); sb.arrow(296, y, 196, y, { stroke: RED, sw: 3 }); sb.text(186, y + 4, "5 N", { size: 12.5, anchor: "end" }); }
    sb.text(360, y + 46, t, { size: 12.5, bold: false });
  });
  return sb.build();
}

// ── 23. Newton's three laws (Competition Corner) ──
function newton(): Scene {
  const sb = new SceneBuilder(720, 320, "Newton's three laws of motion");
  const cards: [string, string, string[], string, string][] = [
    ["First law", "Law of inertia", ["An object stays at rest or moves", "with uniform velocity in a straight", "line unless an unbalanced force acts"], LBLUE, BLUE],
    ["Second law", "F = m × a", ["The force is the product of mass", "and acceleration; 1 N gives 1 kg", "an acceleration of 1 m per s^{2}"], LORANGE, ORANGE],
    ["Third law", "Action and reaction", ["To every action there is an equal", "and opposite reaction; they act", "on two different objects"], LGREEN, GREEN],
  ];
  cards.forEach(([t, s, ls, fill, stroke], i) => {
    const x = 12 + i * 238;
    sb.rect(x, 20, 226, 250, { rx: 12, fill, stroke, sw: 2 });
    sb.text(x + 113, 56, t, { size: 17 }); sb.text(x + 113, 88, s, { size: 14.5, fill: stroke });
    ls.forEach((l, k) => sb.text(x + 113, 140 + k * 26, l, { size: 12, bold: false }));
  });
  sb.text(360, 298, "Sir Isaac Newton gave these laws in 1687", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

export const FO_DIAGRAMS_2: Record<string, () => Scene> = {
  fo_gravity: gravity,
  fo_vertical: vertical,
  fo_spring: spring,
  fo_balance: balance,
  fo_planets: planets,
  fo_buoyancy: buoyancy,
  fo_archimedes: archimedes,
  fo_slope: slope,
  fo_resultant: resultant,
  fo_newton: newton,
  fo_mindmap: mindMap,
};
void [GREEN, LGREEN, PURPLE, LPURPLE, LYELLOW, YELLOW, LRED, LBLUE];
