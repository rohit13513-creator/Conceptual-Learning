import { SceneBuilder, C } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { Circuit, axes } from "../components/circuitKit";

// Diagrams for the solved textbook questions and the question bank of Class X Physics, "Electricity".
// Texts: R_{1} is a subscript, 10^{-8} a superscript.

// a loop with one resistor in series, then a parallel pair, then the battery: n1 shape
function seriesPair(rs: string, a: string, b: string, battery: string, caption: string): Scene {
  const c = new Circuit(480, 280, caption);
  c.res(40, 110, 170, 110, { len: 50 });
  c.wire([170, 60], [170, 160]); c.dot(170, 110);
  c.res(170, 60, 330, 60, { len: 50 }); c.res(170, 160, 330, 160, { len: 50 });
  c.wire([330, 60], [330, 160]); c.dot(330, 110);
  c.wire([330, 110], [410, 110], [410, 240], [250, 240]);
  c.battery(250, 240, 40, 240, 3, { pos: "start" });
  c.wire([40, 240], [40, 110]);
  c.label(105, 110, rs, "above", 22, { size: 12.5 });
  c.label(250, 60, a, "above", 22, { size: 12.5 });
  c.label(250, 160, b, "below", 22, { size: 12.5 });
  c.text(145, 270, battery, { size: 12.5, fill: C.grey });
  return c.build();
}

// two parallel pairs in series with a battery
function twoPairs(g1: [string, string], g2: [string, string], battery: string, caption: string): Scene {
  const c = new Circuit(520, 290, caption);
  c.wire([40, 105], [80, 105]);
  c.wire([80, 55], [80, 155]); c.dot(80, 105);
  c.res(80, 55, 200, 55, { len: 46 }); c.res(80, 155, 200, 155, { len: 46 });
  c.wire([200, 55], [200, 155]); c.dot(200, 105);
  c.wire([200, 105], [280, 105]);
  c.wire([280, 55], [280, 155]); c.dot(280, 105);
  c.res(280, 55, 400, 55, { len: 46 }); c.res(280, 155, 400, 155, { len: 46 });
  c.wire([400, 55], [400, 155]); c.dot(400, 105);
  c.wire([400, 105], [460, 105], [460, 240], [260, 240]);
  c.battery(260, 240, 40, 240, 3, { pos: "start" });
  c.wire([40, 240], [40, 105]);
  c.label(140, 55, g1[0], "above", 22, { size: 12.5 }); c.label(140, 155, g1[1], "below", 22, { size: 12.5 });
  c.label(340, 55, g2[0], "above", 22, { size: 12.5 }); c.label(340, 155, g2[1], "below", 22, { size: 12.5 });
  c.text(150, 274, battery, { size: 12.5, fill: C.grey });
  return c.build();
}

// resistors in parallel across a battery (vertical branches)
function parallelBank(vals: string[], battery: string, caption: string): Scene {
  const w = 100 + 110 * vals.length;
  const c = new Circuit(w, 270, caption);
  const xs = vals.map((_, i) => 130 + i * 110);
  c.wire([40, 50], [xs[xs.length - 1], 50]);
  c.wire([40, 210], [xs[xs.length - 1], 210]);
  c.cell(40, 210, 40, 50, { pos: "end", at: 0.5 });
  xs.forEach((x, i) => {
    c.res(x, 50, x, 210, { len: 56 });
    c.label(x, 130, vals[i], "right", 24, { size: 12.5 });
    if (i < xs.length - 1) { c.dot(x, 50); c.dot(x, 210); }
  });
  c.text(40 - 10, 250, battery, { size: 12.5, fill: C.grey, anchor: "start" });
  return c.build();
}

// 4 Ω and 6 Ω in series with ammeter and voltmeter (12 V battery)
function ser2meters(): Scene {
  const c = new Circuit(520, 270, "A 12 V battery with 4 Ω and 6 Ω in series, an ammeter and a voltmeter across the 6 Ω resistor");
  c.meter(40, 50, 140, 50, "A");
  c.res(140, 50, 270, 50, { len: 50 }); c.res(270, 50, 400, 50, { len: 50 });
  c.wire([400, 50], [450, 50], [450, 200]);
  c.key(450, 200, 330, 200);
  c.battery(330, 200, 40, 200, 4, { pos: "start" });
  c.wire([40, 200], [40, 50]);
  c.dot(270, 50); c.dot(400, 50);
  c.wire([270, 50], [270, 120]); c.meter(270, 120, 400, 120, "V"); c.wire([400, 120], [400, 50]);
  c.label(205, 50, "4 Ω", "above", 22, { size: 12.5 }); c.label(335, 50, "6 Ω", "above", 22, { size: 12.5 });
  c.text(185, 238, "12 V battery", { size: 12.5, fill: C.grey });
  return c.build();
}

// battery, key, rheostat, bulb, ammeter in series with a voltmeter across the bulb
function rheoCircuit(): Scene {
  const c = new Circuit(560, 270, "Battery, key, rheostat, bulb and ammeter in series, with a voltmeter across the bulb");
  c.meter(50, 50, 160, 50, "A");
  c.bulb(160, 50, 330, 50);
  c.wire([330, 50], [500, 50], [500, 200]);
  c.rheostat(500, 200, 350, 200);
  c.key(350, 200, 250, 200);
  c.battery(250, 200, 50, 200, 3, { pos: "start" });
  c.wire([50, 200], [50, 50]);
  c.dot(200, 50); c.dot(290, 50);
  c.wire([200, 50], [200, 115]); c.meter(200, 115, 290, 115, "V"); c.wire([290, 115], [290, 50]);
  c.label(245, 50, "Bulb", "above", 26, { size: 12.5 });
  c.label(425, 200, "Rheostat", "below", 26, { size: 12.5 });
  c.label(300, 200, "Key", "below", 24, { size: 12.5 });
  return c.build();
}

// three cells of 2 V, 5 Ω, 8 Ω, 12 Ω and a key (Question 11.6.1)
function q1(meters: boolean): Scene {
  const c = new Circuit(560, 260, meters ? "The same circuit with an ammeter and a voltmeter across the 12 Ω resistor" : "A battery of three 2 V cells with 5 Ω, 8 Ω and 12 Ω resistors and a plug key in series");
  if (meters) c.meter(40, 50, 120, 50, "A"); else c.wire([40, 50], [120, 50]);
  c.res(120, 50, 230, 50, { len: 50 }); c.res(230, 50, 340, 50, { len: 50 }); c.res(340, 50, 450, 50, { len: 50 });
  c.wire([450, 50], [500, 50], [500, 190]);
  c.key(500, 190, 380, 190);
  c.battery(380, 190, 40, 190, 3, { pos: "start" });
  c.wire([40, 190], [40, 50]);
  c.label(175, 50, "5 Ω", "above", 22, { size: 12.5 }); c.label(285, 50, "8 Ω", "above", 22, { size: 12.5 }); c.label(395, 50, "12 Ω", "above", 22, { size: 12.5 });
  c.text(210, 232, "Battery: three cells of 2 V each", { size: 12.5, fill: C.grey });
  if (meters) { c.dot(340, 50); c.dot(450, 50); c.wire([340, 50], [340, 115]); c.meter(340, 115, 450, 115, "V"); c.wire([450, 115], [450, 50]); }
  return c.build();
}

// graph of V against I from a table of readings
function viPoints(xs: number[], ys: number[], xmax: number, ymax: number, xtick: number, ytick: number, slope: number, caption: string): Scene {
  const sb = new SceneBuilder(460, 320, caption);
  const { X, Y } = axes(sb, 70, 270, 340, 220, xmax, ymax, { xtick, ytick, xlabel: "I (ampere)", ylabel: "V (volt)", grid: true });
  const xe = Math.min(xmax * 0.97, (ymax * 0.97) / slope);
  sb.line(X(0), Y(0), X(xe), Y(xe * slope), { stroke: C.blue, sw: 2.2 });
  xs.forEach((x, i) => sb.circle(X(x), Y(ys[i]), 4.2, { fill: C.red }));
  return sb.build();
}

function vi2(): Scene {
  const sb = new SceneBuilder(440, 300, "V–I graphs of two wires P and Q: both are straight lines through the origin");
  const { X, Y } = axes(sb, 70, 250, 300, 200, 4, 8, { xtick: 1, ytick: 2, xlabel: "I (ampere)", ylabel: "V (volt)" });
  sb.line(X(0), Y(0), X(2), Y(8), { stroke: C.red, sw: 2.6 });
  sb.line(X(0), Y(0), X(3.8), Y(7.6), { stroke: C.blue, sw: 2.6 });
  sb.text(X(2) + 8, Y(8) + 6, "P", { size: 14, anchor: "start", fill: C.red });
  sb.text(X(3.8) + 8, Y(7.6) + 4, "Q", { size: 14, anchor: "start", fill: C.blue });
  return sb.build();
}

function ex11(): Scene {
  const c = new Circuit(640, 230, "Three 6 Ω resistors: (i) two in parallel with the third in series gives 9 Ω; (ii) two in series with the third in parallel gives 4 Ω");
  // (i)
  c.res(30, 110, 100, 110, { len: 44 });
  c.wire([100, 70], [100, 150]); c.dot(100, 110);
  c.res(100, 70, 200, 70, { len: 44 }); c.res(100, 150, 200, 150, { len: 44 });
  c.wire([200, 70], [200, 150]); c.dot(200, 110);
  c.wire([200, 110], [250, 110]);
  c.dot(30, 110); c.dot(250, 110);
  c.text(30, 94, "A", { size: 13 }); c.text(250, 94, "B", { size: 13 });
  c.label(65, 110, "6 Ω", "above", 22, { size: 12 });
  c.label(150, 70, "6 Ω", "above", 22, { size: 12 }); c.label(150, 150, "6 Ω", "below", 22, { size: 12 });
  c.text(140, 215, "(i) 9 Ω", { size: 13, fill: C.blue });
  c.sb.line(300, 20, 300, 215, { stroke: "#cbd5e1", sw: 1.2, dash: "5 4" });
  // (ii)
  c.wire([330, 110], [360, 110]);
  c.wire([360, 70], [360, 150]); c.dot(360, 110);
  c.res(360, 70, 440, 70, { len: 40 }); c.res(440, 70, 520, 70, { len: 40 });
  c.res(360, 150, 520, 150, { len: 44 });
  c.wire([520, 70], [520, 150]); c.dot(520, 110);
  c.wire([520, 110], [570, 110]);
  c.dot(330, 110); c.dot(570, 110);
  c.text(330, 94, "A", { size: 13 }); c.text(570, 94, "B", { size: 13 });
  c.label(400, 70, "6 Ω", "above", 22, { size: 12 }); c.label(480, 70, "6 Ω", "above", 22, { size: 12 }); c.label(440, 150, "6 Ω", "below", 22, { size: 12 });
  c.text(450, 212, "(ii) 4 Ω", { size: 13, fill: C.blue });
  return c.build();
}

function ex14(): Scene {
  const c = new Circuit(640, 280, "(i) 6 V battery in series with 1 Ω and 2 Ω; (ii) 4 V battery in parallel with 12 Ω and 2 Ω");
  // (i)
  c.res(40, 60, 130, 60, { len: 44 }); c.res(130, 60, 220, 60, { len: 44 });
  c.wire([220, 60], [260, 60], [260, 190]);
  c.wire([260, 190], [170, 190]);
  c.cell(170, 190, 40, 190, { pos: "start" });
  c.wire([40, 190], [40, 60]);
  c.label(85, 60, "1 Ω", "above", 22, { size: 12.5 }); c.label(175, 60, "2 Ω", "above", 22, { size: 12.5 });
  c.text(150, 232, "(i) 6 V battery", { size: 13, fill: C.blue });
  c.sb.line(300, 20, 300, 265, { stroke: "#cbd5e1", sw: 1.2, dash: "5 4" });
  // (ii)
  c.cell(340, 190, 340, 60, { pos: "end" });
  c.wire([340, 60], [440, 60]); c.wire([340, 190], [540, 190]);
  c.res(440, 60, 440, 190, { len: 56 }); c.res(540, 60, 540, 190, { len: 56 });
  c.wire([440, 60], [540, 60]);
  c.dot(440, 60); c.dot(440, 190);
  c.label(440, 125, "12 Ω", "right", 24, { size: 12.5 });
  c.label(540, 125, "2 Ω", "right", 24, { size: 12.5 });
  c.text(440, 232, "(ii) 4 V battery", { size: 13, fill: C.blue });
  return c.build();
}

export const ELEC_DIAGRAMS_3: Record<string, () => Scene> = {
  qd_rheo: rheoCircuit,
  qd_par3: () => parallelBank(["6 Ω", "12 Ω", "4 Ω"], "12 V battery", "6 Ω, 12 Ω and 4 Ω in parallel across a 12 V battery"),
  qd_par2: () => parallelBank(["2 Ω", "4 Ω"], "12 V battery", "2 Ω and 4 Ω in parallel across a 12 V battery"),
  qd_mix1: () => seriesPair("4 Ω", "6 Ω", "3 Ω", "12 V battery", "A 4 Ω resistor in series with 6 Ω and 3 Ω in parallel, across a 12 V battery"),
  qd_mix3: () => seriesPair("4 Ω", "12 Ω", "6 Ω", "12 V battery", "A 4 Ω resistor in series with 12 Ω and 6 Ω in parallel, across a 12 V battery"),
  qd_mix2: () => twoPairs(["6 Ω", "3 Ω"], ["12 Ω", "4 Ω"], "10 V battery", "Two parallel pairs in series across a 10 V battery"),
  qd_ser2m: ser2meters,
  qd_vi2: vi2,
  qd_vi_pts: () => viPoints([0.5, 1, 1.5, 2], [2, 4, 6, 8], 2.5, 10, 0.5, 2, 4, "V–I graph from the readings I = 0.5, 1.0, 1.5, 2.0 A and V = 2, 4, 6, 8 V"),
  qd_vi_pts2: () => viPoints([0.2, 0.4, 0.6, 0.8, 1], [2, 4, 6, 8, 10], 1.2, 12, 0.2, 2, 10, "V–I graph from the readings I = 0.2 to 1.0 A and V = 2 to 10 V"),
  el_q1: () => q1(false),
  el_q2: () => q1(true),
  el_ex7: () => viPoints([0.5, 1, 2, 3, 4], [1.6, 3.4, 6.7, 10.2, 13.2], 4.5, 14, 0.5, 2, 3.3, "V–I graph for the readings of Exercise 7: the best line through the origin has the slope 3.3"),
  el_ex11: ex11,
  el_ex14: ex14,
};
