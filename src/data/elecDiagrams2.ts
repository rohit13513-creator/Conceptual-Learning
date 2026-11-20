import { SceneBuilder, C } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { Circuit } from "../components/circuitKit";

// Diagrams for the Competition Zone of Class X Physics, "Electricity", and for the solved textbook questions and the question bank.
// Texts: R_{1} is a subscript, 10^{-8} a superscript.

const term = (c: Circuit, x: number, y: number, name: string, side: "above" | "below" | "left" | "right", d = 16) => { c.dot(x, y); c.label(x, y, name, side, d, { size: 14 }); };

// ── Competition Zone ──
function galvanometer(): Scene {
  const c = new Circuit(580, 240, "A galvanometer becomes an ammeter with a shunt in parallel, and a voltmeter with a high resistance in series");
  // ammeter
  c.wire([20, 70], [60, 70]);
  c.meter(60, 70, 200, 70, "G");
  c.wire([200, 70], [250, 70]);
  c.wire([60, 70], [60, 140]); c.res(60, 140, 200, 140, { len: 50 }); c.wire([200, 140], [200, 70]);
  c.dot(60, 70); c.dot(200, 70);
  c.label(130, 70, "Galvanometer", "above", 26, { size: 12.5 });
  c.label(130, 140, "Shunt S (very low resistance)", "below", 24, { size: 12 });
  c.text(135, 214, "Ammeter: shunt in parallel", { size: 13, fill: C.blue });
  c.sb.line(290, 20, 290, 225, { stroke: "#cbd5e1", sw: 1.2, dash: "5 4" });
  // voltmeter
  c.wire([310, 70], [345, 70]);
  c.meter(345, 70, 435, 70, "G");
  c.res(435, 70, 535, 70, { len: 50 });
  c.wire([535, 70], [565, 70]);
  c.label(390, 70, "Galvanometer", "above", 26, { size: 12.5 });
  c.label(485, 70, "High R", "below", 24, { size: 12.5 });
  c.text(437, 214, "Voltmeter: high resistance in series", { size: 13, fill: C.blue });
  return c.build();
}

function nonOhmic(): Scene {
  const sb = new SceneBuilder(540, 270, "V–I graphs: a straight line for an ohmic conductor and a curve for a bulb filament");
  const ax = (x0: number) => { sb.arrow(x0, 220, x0 + 200, 220, { sw: 1.8 }); sb.arrow(x0, 220, x0, 40, { sw: 1.8 }); sb.text(x0 + 200, 242, "I", { size: 13, anchor: "end" }); sb.text(x0 - 8, 36, "V", { size: 13, anchor: "end" }); sb.text(x0 - 6, 236, "0", { size: 12, anchor: "end", bold: false }); };
  ax(40); ax(300);
  sb.line(40, 220, 220, 70, { stroke: C.blue, sw: 2.6 });
  sb.curve([300, 220], [420, 200], [490, 70], { stroke: C.red, sw: 2.6 });
  sb.text(130, 22, "Ohmic conductor", { size: 13 });
  sb.text(390, 22, "Non-ohmic: bulb filament", { size: 13 });
  return sb.build();
}

function cutFold(): Scene {
  const sb = new SceneBuilder(560, 300, "Cutting, folding and stretching a wire: the length and the area change, so the resistance changes");
  const row = (y: number, title: string, a: [number, number, number], b: [number, number, number][], note: string, t1: string) => {
    sb.text(14, y - 28, title, { size: 13, anchor: "start" });
    sb.line(30, y, 30 + a[1], y, { stroke: "#475569", sw: a[2] });
    sb.text(30 + a[1] / 2, y + 30, t1, { size: 12.5, fill: C.grey });
    sb.arrow(250, y, 290, y, { stroke: C.blue });
    b.forEach(([x, l, w]) => sb.line(x, y, x + l, y, { stroke: C.orange, sw: w }));
    sb.text(430, y + 30, note, { size: 12.5, fill: C.orange });
  };
  row(60, "1. Cut into two equal parts", [0, 200, 6], [[310, 90, 6], [420, 90, 6]], "Each part: R ÷ 2", "Wire of resistance R");
  row(165, "2. Fold into two equal halves", [0, 200, 5], [[310, 100, 10]], "Length l ÷ 2, area 2A: R ÷ 4", "Wire of resistance R");
  row(265, "3. Stretch to twice the length", [0, 100, 10], [[310, 200, 5]], "Length 2l, area A ÷ 2: 4R", "Wire of resistance R");
  return sb.build();
}

function n1(): Scene {
  const c = new Circuit(480, 220, "A 4 Ω resistor in series with a 6 Ω and a 3 Ω resistor in parallel");
  c.res(40, 110, 170, 110, { len: 50 });
  c.wire([170, 60], [170, 160]); c.dot(170, 110);
  c.res(170, 60, 330, 60, { len: 50 }); c.res(170, 160, 330, 160, { len: 50 });
  c.wire([330, 60], [330, 160]); c.dot(330, 110);
  c.wire([330, 110], [400, 110]);
  term(c, 40, 110, "A", "left"); term(c, 400, 110, "B", "right");
  c.label(105, 110, "4 Ω", "above", 22, { size: 12.5 });
  c.label(250, 60, "6 Ω", "above", 22, { size: 12.5 });
  c.label(250, 160, "3 Ω", "below", 22, { size: 12.5 });
  c.text(158, 100, "C", { size: 13, anchor: "end" });
  return c.build();
}

function n2(): Scene {
  const c = new Circuit(560, 240, "A 2 Ω resistor in series with two branches of two resistors each");
  c.res(30, 120, 150, 120, { len: 50 });
  c.wire([150, 60], [150, 180]); c.dot(150, 120);
  c.res(150, 60, 250, 60, { len: 46 }); c.res(250, 60, 350, 60, { len: 46 });
  c.res(150, 180, 250, 180, { len: 46 }); c.res(250, 180, 350, 180, { len: 46 });
  c.wire([350, 60], [350, 180]); c.dot(350, 120);
  c.wire([350, 120], [430, 120]);
  term(c, 30, 120, "A", "left"); term(c, 430, 120, "B", "right");
  c.label(90, 120, "2 Ω", "above", 22, { size: 12.5 });
  c.label(200, 60, "2 Ω", "above", 22, { size: 12.5 }); c.label(300, 60, "4 Ω", "above", 22, { size: 12.5 });
  c.label(200, 180, "3 Ω", "below", 22, { size: 12.5 }); c.label(300, 180, "3 Ω", "below", 22, { size: 12.5 });
  c.text(138, 110, "C", { size: 13, anchor: "end" }); c.text(362, 110, "D", { size: 13, anchor: "start" });
  return c.build();
}

function n3(): Scene {
  const c = new Circuit(430, 250, "A ladder network of 2 Ω resistors between A and B");
  c.res(40, 60, 190, 60, { len: 50 });
  c.res(190, 60, 340, 60, { len: 50 });
  c.res(190, 60, 190, 190, { len: 50 });
  c.res(340, 60, 340, 190, { len: 50 });
  c.wire([40, 190], [340, 190]);
  c.dot(190, 60); c.dot(190, 190);
  term(c, 40, 60, "A", "left"); term(c, 40, 190, "B", "left");
  c.text(182, 48, "C", { size: 13, anchor: "end" }); c.text(198, 210, "D", { size: 13, anchor: "start" });
  c.text(350, 48, "E", { size: 13, anchor: "start" }); c.text(350, 210, "F", { size: 13, anchor: "start" });
  c.label(115, 60, "2 Ω", "above", 22, { size: 12.5 });
  c.label(265, 60, "2 Ω", "above", 22, { size: 12.5 });
  c.label(190, 125, "2 Ω", "right", 28, { size: 12.5 });
  c.label(340, 125, "2 Ω", "right", 28, { size: 12.5 });
  return c.build();
}

function n4(): Scene {
  const c = new Circuit(450, 180, "A plain wire joined across the 6 Ω resistor");
  c.res(40, 110, 170, 110, { len: 50 });
  c.res(170, 110, 330, 110, { len: 50 });
  c.wire([170, 110], [170, 50], [330, 50], [330, 110]);
  c.dot(170, 110); c.dot(330, 110);
  c.wire([330, 110], [390, 110]);
  term(c, 40, 110, "A", "left"); term(c, 390, 110, "B", "right");
  c.label(105, 110, "3 Ω", "above", 22, { size: 12.5 });
  c.label(250, 110, "6 Ω", "below", 22, { size: 12.5 });
  c.text(250, 40, "plain wire", { size: 12.5, fill: C.grey });
  c.text(158, 128, "C", { size: 13, anchor: "end" });
  return c.build();
}

function n5(): Scene {
  const c = new Circuit(490, 240, "Three 6 Ω resistors in a line, with a wire from A to D and a wire from C to B");
  c.res(40, 120, 170, 120, { len: 50 }); c.res(170, 120, 300, 120, { len: 50 }); c.res(300, 120, 430, 120, { len: 50 });
  c.wire([40, 120], [40, 50], [300, 50], [300, 120]);
  c.wire([170, 120], [170, 195], [430, 195], [430, 120]);
  [40, 170, 300, 430].forEach((x) => c.dot(x, 120));
  c.text(28, 124, "A", { size: 14, anchor: "end" }); c.text(442, 124, "B", { size: 14, anchor: "start" });
  c.text(170, 102, "C", { size: 14 }); c.text(300, 148, "D", { size: 14 });
  [105, 235, 365].forEach((x) => c.label(x, 120, "6 Ω", "above", 22, { size: 12.5 }));
  return c.build();
}

function n6(): Scene {
  const c = new Circuit(440, 250, "Three equal resistors joined to form a triangle");
  c.res(100, 190, 340, 190, { len: 50 });
  c.res(100, 190, 220, 60, { len: 50 });
  c.res(220, 60, 340, 190, { len: 50 });
  [[100, 190], [340, 190], [220, 60]].forEach(([x, y]) => c.dot(x, y));
  c.text(84, 200, "A", { size: 14, anchor: "end" }); c.text(356, 200, "B", { size: 14, anchor: "start" }); c.text(220, 42, "C", { size: 14 });
  c.text(220, 224, "R", { size: 13 });
  c.text(134, 118, "R", { size: 13, anchor: "end" });
  c.text(306, 118, "R", { size: 13, anchor: "start" });
  return c.build();
}

function n7(): Scene {
  const c = new Circuit(500, 230, "A plain wire joined across the 3 Ω resistor between P and Q");
  c.res(60, 60, 180, 60, { len: 50 }); c.res(180, 60, 300, 60, { len: 50 }); c.res(300, 60, 420, 60, { len: 50 });
  c.wire([420, 60], [420, 170]);
  c.battery(420, 170, 60, 170, 2, { pos: "start" });
  c.wire([60, 170], [60, 60]);
  c.wire([180, 60], [180, 115], [300, 115], [300, 60]);
  c.dot(180, 60); c.dot(300, 60);
  c.label(120, 60, "2 Ω", "above", 22, { size: 12.5 }); c.label(240, 60, "3 Ω", "above", 22, { size: 12.5 }); c.label(360, 60, "6 Ω", "above", 22, { size: 12.5 });
  c.text(180, 44, "P", { size: 13 }); c.text(300, 44, "Q", { size: 13 });
  c.text(240, 136, "plain wire", { size: 12.5, fill: C.grey });
  return c.build();
}

function ladder(): Scene {
  const c = new Circuit(490, 230, "An endless ladder of equal resistors R");
  c.res(40, 60, 150, 60, { len: 46 }); c.res(150, 60, 260, 60, { len: 46 }); c.res(260, 60, 370, 60, { len: 46 });
  c.res(150, 60, 150, 170, { len: 46 }); c.res(260, 60, 260, 170, { len: 46 }); c.res(370, 60, 370, 170, { len: 46 });
  c.wire([40, 170], [370, 170]);
  c.dot(150, 60); c.dot(260, 60); c.dot(150, 170); c.dot(260, 170);
  c.sb.line(370, 60, 440, 60, { stroke: C.grey, sw: 1.6, dash: "6 5" });
  c.sb.line(370, 170, 440, 170, { stroke: C.grey, sw: 1.6, dash: "6 5" });
  term(c, 40, 60, "A", "left"); term(c, 40, 170, "B", "left");
  [95, 205, 315].forEach((x) => c.label(x, 60, "R", "above", 22, { size: 12.5 }));
  [150, 260, 370].forEach((x) => c.label(x, 115, "R", "right", 22, { size: 12.5 }));
  c.text(465, 118, "goes on", { size: 12, fill: C.grey, bold: false });
  return c.build();
}

function bright(): Scene {
  const c = new Circuit(600, 270, "A 100 W and a 60 W bulb (both 220 V) joined in parallel and in series across 220 V");
  // parallel
  c.battery(60, 190, 60, 60, 2, { pos: "end" });
  c.wire([60, 60], [210, 60]);
  c.wire([60, 190], [210, 190]);
  c.bulb(130, 60, 130, 190); c.bulb(210, 60, 210, 190);
  c.dot(130, 60); c.dot(210, 60); c.dot(130, 190); c.dot(210, 190);
  c.label(130, 125, "100 W", "right", 20, { size: 12 });
  c.label(210, 125, "60 W", "right", 22, { size: 12 });
  c.text(145, 238, "Parallel: the 100 W bulb is brighter", { size: 12.5, fill: C.blue });
  c.sb.line(300, 20, 300, 250, { stroke: "#cbd5e1", sw: 1.2, dash: "5 4" });
  // series
  c.bulb(340, 60, 440, 60); c.bulb(440, 60, 540, 60);
  c.wire([540, 60], [560, 60], [560, 190]);
  c.battery(560, 190, 340, 190, 2, { pos: "start" });
  c.wire([340, 190], [340, 60]);
  c.label(390, 60, "100 W", "above", 26, { size: 12 }); c.label(490, 60, "60 W", "above", 26, { size: 12 });
  c.text(450, 238, "Series: the 60 W bulb is brighter", { size: 12.5, fill: C.blue });
  return c.build();
}

function threeBulbs(): Scene {
  const c = new Circuit(480, 260, "Bulbs A and B in parallel, in series with bulb C");
  c.bulb(40, 60, 180, 60);
  c.wire([180, 60], [180, 160]); c.dot(180, 60);
  c.bulb(180, 60, 340, 60, { at: 0.5 });
  c.bulb(180, 160, 340, 160);
  c.wire([340, 60], [340, 210]); c.dot(340, 160);
  c.wire([340, 210], [200, 210]);
  c.battery(200, 210, 40, 210, 2, { pos: "start" });
  c.wire([40, 210], [40, 60]);
  c.dot(180, 160);
  c.label(110, 60, "C", "above", 26, { size: 14 });
  c.label(260, 60, "A", "above", 26, { size: 14 });
  c.label(260, 160, "B", "above", 26, { size: 14 });
  return c.build();
}

function junction(): Scene {
  const sb = new SceneBuilder(420, 220, "Currents at a junction: 3 A and 2 A enter, 1 A and I leave");
  sb.arrow(60, 40, 188, 98, { stroke: C.blue, sw: 2.2 });
  sb.arrow(60, 180, 188, 122, { stroke: C.blue, sw: 2.2 });
  sb.arrow(212, 98, 340, 40, { stroke: C.red, sw: 2.2 });
  sb.arrow(212, 122, 340, 180, { stroke: C.red, sw: 2.2 });
  sb.circle(200, 110, 5, { fill: C.ink });
  sb.text(60, 26, "3 A in", { size: 13, anchor: "start" });
  sb.text(60, 206, "2 A in", { size: 13, anchor: "start" });
  sb.text(340, 26, "1 A out", { size: 13, anchor: "end" });
  sb.text(340, 206, "I out", { size: 13, anchor: "end" });
  sb.text(200, 136, "O", { size: 14 });
  return sb.build();
}

function bridgeFig(p: string, q: string, r: string, s: string, mid: "G" | string, caption: string): Scene {
  const c = new Circuit(420, 290, caption);
  c.res(60, 130, 200, 40, { len: 50 }); c.res(200, 40, 340, 130, { len: 50 });
  c.res(60, 130, 200, 220, { len: 50 }); c.res(200, 220, 340, 130, { len: 50 });
  if (mid === "G") c.meter(200, 40, 200, 220, "G"); else c.res(200, 40, 200, 220, { len: 50 });
  [[60, 130], [340, 130], [200, 40], [200, 220]].forEach(([x, y]) => c.dot(x, y));
  c.wire([60, 130], [30, 130], [30, 262], [180, 262]);
  c.cell(180, 262, 230, 262, { pos: "start" });
  c.wire([230, 262], [370, 262], [370, 130], [340, 130]);
  c.text(44, 120, "A", { size: 14, anchor: "end" }); c.text(356, 120, "C", { size: 14, anchor: "start" });
  c.text(214, 30, "B", { size: 14, anchor: "start" }); c.text(214, 238, "D", { size: 14, anchor: "start" });
  c.text(104, 66, p, { size: 13, anchor: "end" }); c.text(296, 66, q, { size: 13, anchor: "start" });
  c.text(104, 208, r, { size: 13, anchor: "end" }); c.text(296, 208, s, { size: 13, anchor: "start" });
  if (mid !== "G") c.text(170, 128, mid, { size: 13, anchor: "end" });
  return c.build();
}

function squareDiag(): Scene {
  const c = new Circuit(420, 270, "A square of four resistors with a fifth along the diagonal AC");
  c.res(100, 60, 300, 60, { len: 50 }); c.res(300, 60, 300, 200, { len: 50 }); c.res(300, 200, 100, 200, { len: 50 }); c.res(100, 200, 100, 60, { len: 50 });
  c.res(100, 60, 300, 200, { len: 50 });
  [[100, 60], [300, 60], [300, 200], [100, 200]].forEach(([x, y]) => c.dot(x, y));
  c.text(84, 52, "A", { size: 14, anchor: "end" }); c.text(316, 52, "B", { size: 14, anchor: "start" });
  c.text(316, 216, "C", { size: 14, anchor: "start" }); c.text(84, 216, "D", { size: 14, anchor: "end" });
  return c.build();
}

function tetra(): Scene {
  const c = new Circuit(420, 250, "Six equal resistors along the edges of a tetrahedron");
  const A: [number, number] = [60, 190], B: [number, number] = [350, 190], Cc: [number, number] = [205, 40], D: [number, number] = [215, 135];
  const e = (p: [number, number], q: [number, number]) => c.res(p[0], p[1], q[0], q[1], { len: 40, amp: 6 });
  e(A, B); e(A, Cc); e(Cc, B); e(A, D); e(B, D); e(Cc, D);
  [A, B, Cc, D].forEach(([x, y]) => c.dot(x, y));
  c.text(44, 200, "A", { size: 14, anchor: "end" }); c.text(366, 200, "B", { size: 14, anchor: "start" });
  c.text(205, 24, "C", { size: 14 }); c.text(234, 130, "D", { size: 14, anchor: "start" });
  return c.build();
}

function grid2(): Scene {
  const c = new Circuit(440, 280, "Twelve equal resistors R in a 2 × 2 grid: A and B are opposite corners");
  const xs = [90, 220, 350], ys = [50, 140, 230];
  for (const y of ys) { c.res(xs[0], y, xs[1], y, { len: 40, amp: 6 }); c.res(xs[1], y, xs[2], y, { len: 40, amp: 6 }); }
  for (const x of xs) { c.res(x, ys[0], x, ys[1], { len: 40, amp: 6 }); c.res(x, ys[1], x, ys[2], { len: 40, amp: 6 }); }
  xs.forEach((x) => ys.forEach((y) => c.dot(x, y)));
  c.text(74, 44, "A", { size: 14, anchor: "end" }); c.text(366, 246, "B", { size: 14, anchor: "start" });
  c.text(220, 38, "C", { size: 13 }); c.text(366, 44, "E", { size: 13, anchor: "start" });
  c.text(74, 150, "D", { size: 13, anchor: "end" }); c.text(74, 246, "F", { size: 13, anchor: "end" });
  c.text(236, 128, "O", { size: 13, anchor: "start" }); c.text(366, 150, "G", { size: 13, anchor: "start" });
  c.text(220, 258, "H", { size: 13 });
  return c.build();
}

function cube(): Scene {
  const c = new Circuit(420, 270, "Twelve equal resistors along the edges of a cube");
  const A: [number, number] = [90, 220], B: [number, number] = [230, 220], F: [number, number] = [230, 110], E: [number, number] = [90, 110];
  const D: [number, number] = [170, 170], Cc: [number, number] = [310, 170], G: [number, number] = [310, 60], H: [number, number] = [170, 60];
  const e = (p: [number, number], q: [number, number]) => c.res(p[0], p[1], q[0], q[1], { len: 30, amp: 5 });
  [[A, B], [B, Cc], [Cc, D], [D, A], [E, F], [F, G], [G, H], [H, E], [A, E], [B, F], [Cc, G], [D, H]].forEach(([p, q]) => e(p as [number, number], q as [number, number]));
  [A, B, Cc, D, E, F, G, H].forEach(([x, y]) => c.dot(x, y));
  c.text(74, 232, "A", { size: 14, anchor: "end" }); c.text(236, 240, "B", { size: 14 });
  c.text(326, 186, "C", { size: 14, anchor: "start" }); c.text(170, 196, "D", { size: 14 });
  c.text(74, 108, "E", { size: 14, anchor: "end" }); c.text(222, 98, "F", { size: 14, anchor: "end" });
  c.text(326, 58, "G", { size: 14, anchor: "start" }); c.text(160, 46, "H", { size: 14, anchor: "end" });
  return c.build();
}

function hexagon(): Scene {
  const c = new Circuit(460, 270, "A hexagon of resistors with the centre O joined to every corner");
  const cx = 230, cy = 135, r = 110;
  const pts: [number, number][] = [[cx - r, cy], [cx - r / 2, cy - 96], [cx + r / 2, cy - 96], [cx + r, cy], [cx + r / 2, cy + 96], [cx - r / 2, cy + 96]];
  for (let i = 0; i < 6; i++) { const p = pts[i], q = pts[(i + 1) % 6]; c.res(p[0], p[1], q[0], q[1], { len: 36, amp: 5 }); }
  pts.forEach((p) => c.res(cx, cy, p[0], p[1], { len: 40, amp: 5 }));
  [...pts, [cx, cy] as [number, number]].forEach(([x, y]) => c.dot(x, y));
  const nm = ["A", "B", "C", "D", "E", "F"];
  const off: [number, number, "start" | "middle" | "end"][] = [[-14, 5, "end"], [-10, -10, "end"], [10, -10, "start"], [14, 5, "start"], [10, 20, "start"], [-10, 20, "end"]];
  pts.forEach((p, i) => c.text(p[0] + off[i][0], p[1] + off[i][1], nm[i], { size: 14, anchor: off[i][2] }));
  c.text(cx + 20, cy - 8, "O", { size: 13, anchor: "start" });
  return c.build();
}

function earth1(): Scene {
  const c = new Circuit(460, 270, "A 12 V battery with 4 Ω and 2 Ω in series; the point P is earthed");
  c.res(60, 60, 220, 60, { len: 50 }); c.res(220, 60, 380, 60, { len: 50 });
  c.wire([380, 60], [380, 190], [60, 190]);
  c.cell(60, 190, 60, 60, { pos: "end" });
  c.dot(220, 60); c.earth(220, 60);
  c.text(220, 44, "P", { size: 14 });
  c.text(60, 44, "X (+)", { size: 13, anchor: "start" });
  c.text(72, 212, "Y (−)", { size: 13, anchor: "start" });
  c.label(140, 60, "4 Ω", "above", 22, { size: 12.5 }); c.label(300, 60, "2 Ω", "above", 22, { size: 12.5 });
  c.text(40, 130, "12 V", { size: 13, anchor: "end" });
  return c.build();
}

function earth2(): Scene {
  const c = new Circuit(460, 290, "Two points earthed: the negative terminal and the junction J");
  c.res(60, 60, 220, 60, { len: 50 }); c.res(220, 60, 380, 60, { len: 50 });
  c.wire([380, 60], [380, 190], [60, 190]);
  c.cell(60, 190, 60, 60, { pos: "end" });
  c.dot(220, 60); c.earth(220, 60);
  c.dot(60, 190); c.earth(60, 190);
  c.text(220, 44, "J", { size: 14 });
  c.text(60, 44, "+", { size: 15, anchor: "start" });
  c.label(140, 60, "R_{1} = 2 Ω", "above", 22, { size: 12.5 }); c.label(300, 60, "R_{2} = 3 Ω", "above", 22, { size: 12.5 });
  c.text(40, 130, "10 V", { size: 13, anchor: "end" });
  return c.build();
}

function cellR(): Scene {
  const c = new Circuit(440, 270, "A cell of EMF E and internal resistance r joined to an outside resistance R");
  c.sb.rect(40, 50, 90, 170, { stroke: C.grey, sw: 1.4, dash: "6 4" });
  c.cell(85, 235, 85, 160, { pos: "end" });
  c.res(85, 160, 85, 50, { len: 50 });
  c.wire([85, 235], [85, 250], [360, 250], [360, 215]);
  c.res(360, 215, 360, 50, { len: 70 });
  c.wire([85, 50], [85, 30], [360, 30], [360, 50]);
  c.text(140, 190, "E", { size: 14, anchor: "start" });
  c.text(148, 106, "r", { size: 14, anchor: "start" });
  c.text(376, 130, "R", { size: 14, anchor: "start" });
  c.text(85, 270 - 4, "Cell (inside the dashed box)", { size: 12, fill: C.grey, bold: false });
  return c.build();
}

export const ELEC_DIAGRAMS_2: Record<string, () => Scene> = {
  el_gal: galvanometer,
  el_nonohmic: nonOhmic,
  el_cutfold: cutFold,
  el_n1: n1, el_n2: n2, el_n3: n3, el_n4: n4, el_n5: n5, el_n6: n6, el_n7: n7,
  el_ladder: ladder,
  el_bright: bright,
  el_abc: threeBulbs,
  el_junction: junction,
  el_bridge: () => bridgeFig("P", "Q", "R", "S", "G", "A Wheatstone bridge: a galvanometer G joins B and D"),
  el_bridge2: () => bridgeFig("2 Ω", "4 Ω", "3 Ω", "6 Ω", "5 Ω", "A balanced bridge: P ÷ Q = R ÷ S = 1 ÷ 2"),
  el_square: squareDiag,
  el_tetra: tetra,
  el_grid: grid2,
  el_cube: cube,
  el_hex: hexagon,
  el_earth1: earth1,
  el_earth2: earth2,
  el_cellr: cellR,
};
