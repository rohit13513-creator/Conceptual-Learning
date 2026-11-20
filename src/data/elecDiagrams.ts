import { SceneBuilder, C } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { Circuit, axes } from "../components/circuitKit";

// Diagrams for Class X Physics, "Electricity". Every picture is a Scene (see components/sceneKit.ts and circuitKit.ts),
// so scripts/check-elec-diagrams.mts can check that no text touches a line, a shape or another text.
// Texts: R_{1} is a subscript, 10^{-8} a superscript.

// ── 1. a simple circuit (Figure 11.1) ──
function simpleCircuit(): Scene {
  const c = new Circuit(520, 250, "A simple electric circuit: cell, electric bulb, ammeter and plug key");
  c.bulb(70, 60, 410, 60);
  c.meter(410, 60, 410, 190, "A");
  c.key(410, 190, 70, 190);
  c.cell(70, 190, 70, 60, { pos: "end" });
  c.label(70, 125, "Cell", "left", 20);
  c.text(92, 118, "+", { size: 15 });
  c.text(92, 140, "−", { size: 15 });
  c.label(240, 60, "Bulb", "above", 26);
  c.label(410, 125, "Ammeter", "right", 26);
  c.label(240, 190, "Plug key", "below", 18);
  c.flow(112, 38, 168, 38);
  c.text(140, 26, "I", { size: 14, fill: C.red });
  return c.build();
}

// ── 2. symbols of the commonly used components (Table 11.1) ──
function symbols(): Scene {
  const c = new Circuit(500, 440, "Symbols of some commonly used components in circuit diagrams");
  const x0 = 30, x1 = 150, tx = 180;
  const names = ["An electric cell", "A battery (cells joined one after another)", "Plug key or switch (open)", "Plug key or switch (closed)", "A wire joint", "Wires crossing without joining", "Electric bulb", "A resistor of resistance R", "Variable resistance or rheostat", "Ammeter", "Voltmeter"];
  const y = (i: number) => 28 + i * 38;
  c.cell(x0, y(0), x1, y(0), { pos: "start" });
  c.battery(x0, y(1), x1, y(1), 3, { pos: "start" });
  c.key(x0, y(2), x1, y(2), { open: true });
  c.key(x0, y(3), x1, y(3), { open: false });
  c.wire([x0, y(4)], [x1, y(4)]); c.wire([90, y(4) - 14], [90, y(4) - 2]); c.wire([90, y(4) + 2], [90, y(4) + 14]); c.dot(90, y(4));
  c.wire([x0, y(5)], [x1, y(5)]); c.wire([90, y(5) - 14], [90, y(5) + 14]);
  c.bulb(x0, y(6), x1, y(6));
  c.res(x0, y(7), x1, y(7));
  c.rheostat(x0, y(8), x1, y(8));
  c.meter(x0, y(9), x1, y(9), "A");
  c.meter(x0, y(10), x1, y(10), "V");
  names.forEach((n, i) => c.text(tx, y(i) + 5, n, { size: 13, anchor: "start" }));
  return c.build();
}

// ── 3. water flow and charge flow ──
function waterAnalogy(): Scene {
  const sb = new SceneBuilder(600, 250, "Water needs a difference of level to flow; charge needs a potential difference");
  sb.rect(30, 40, 90, 70, { fill: "#bfdbfe", stroke: C.ink, sw: 2 });
  sb.rect(31, 41, 88, 16, { fill: "#ffffff" });
  sb.poly([[120, 100], [195, 100], [245, 165]], { stroke: "#94a3b8", sw: 12, close: false });
  sb.arrow(140, 100, 184, 100, { stroke: C.blue });
  sb.text(75, 28, "Tank at a higher level", { size: 12.5 });
  sb.text(150, 170, "Water flows", { size: 12.5, fill: C.blue });
  sb.text(150, 188, "from higher to lower level", { size: 12.5, fill: C.blue });
  sb.line(30, 210, 245, 210, { stroke: C.grey, sw: 1.4, dash: "5 4" });
  sb.text(137, 228, "Flow stops when both ends", { size: 12, bold: false, fill: C.grey });
  sb.text(137, 244, "are at the same level", { size: 12, bold: false, fill: C.grey });
  sb.line(300, 20, 300, 235, { stroke: "#cbd5e1", sw: 1.2, dash: "5 4", decor: true });
  const c = new Circuit(600, 250);
  c.sb = sb;
  c.cell(360, 190, 360, 70, { pos: "end" });
  c.bulb(360, 70, 550, 70, { at: 0.55 });
  c.wire([550, 70], [550, 190], [360, 190]);
  c.text(362, 28, "Cell: potential difference", { size: 12.5, anchor: "start" });
  c.text(455, 228, "Charge flows from higher", { size: 12, bold: false, fill: C.grey });
  c.text(455, 244, "to lower potential", { size: 12, bold: false, fill: C.grey });
  c.flow(410, 56, 466, 56);
  return sb.build();
}

// ── 4. how the meters are joined ──
function metersJoined(): Scene {
  const c = new Circuit(560, 290, "Ammeter in series, voltmeter in parallel across the resistor, rheostat in series");
  c.meter(60, 50, 200, 50, "A");
  c.res(200, 50, 380, 50, { len: 50 });
  c.wire([380, 50], [500, 50], [500, 210]);
  c.rheostat(500, 210, 290, 210);
  c.key(290, 210, 60, 210);
  c.cell(60, 210, 60, 50, { pos: "end" });
  c.dot(222, 50); c.dot(358, 50);
  c.wire([222, 50], [222, 120]); c.meter(222, 120, 358, 120, "V"); c.wire([358, 120], [358, 50]);
  c.label(290, 50, "R", "above", 24);
  c.label(395, 210, "Rheostat", "below", 24);
  c.text(290, 156, "Voltmeter across R", { size: 12.5, fill: C.grey });
  c.text(130, 30, "Ammeter in series", { size: 12.5, fill: C.grey });
  return c.build();
}

// ── 5. circuit to study Ohm's law (Figure 11.2) ──
function ohmCircuit(): Scene {
  const c = new Circuit(540, 270, "Electric circuit for studying Ohm's law");
  c.meter(60, 50, 200, 50, "A");
  c.res(210, 50, 370, 50, { len: 70 });
  c.wire([370, 50], [470, 50], [470, 200]);
  c.key(470, 200, 330, 200);
  c.battery(330, 200, 60, 200, 4, { pos: "start" });
  c.wire([60, 200], [60, 50]);
  c.dot(210, 50); c.dot(370, 50);
  c.wire([210, 50], [210, 120]); c.meter(210, 120, 370, 120, "V"); c.wire([370, 120], [370, 50]);
  c.text(210, 28, "X", { size: 14 });
  c.text(370, 28, "Y", { size: 14 });
  c.label(290, 50, "Nichrome wire", "above", 28, { size: 12 });
  c.label(195, 200, "Battery of four cells", "below", 30, { size: 12.5 });
  c.label(400, 200, "Key", "below", 18, { size: 12.5 });
  return c.build();
}

// ── 6. V–I graph (Figure 11.3) ──
function viGraph(): Scene {
  const sb = new SceneBuilder(440, 300, "V–I graph for a nichrome wire: a straight line through the origin");
  const { X, Y } = axes(sb, 70, 250, 300, 200, 4, 8, { xtick: 1, ytick: 2, xlabel: "I (ampere)", ylabel: "V (volt)" });
  sb.line(X(0), Y(0), X(3.8), Y(7.6), { stroke: C.blue, sw: 2.6 });
  [1, 2, 3].forEach((i) => sb.circle(X(i), Y(2 * i), 4.4, { fill: C.red }));
  sb.text(110, 52, "A straight line through the origin:", { size: 12.5, anchor: "start", fill: C.grey });
  sb.text(110, 70, "V ÷ I is constant", { size: 12.5, anchor: "start", fill: C.grey });
  return sb.build();
}

// ── 7. circuit with a gap XY (Figure 11.4) ──
function gapCircuit(): Scene {
  const c = new Circuit(520, 250, "A circuit with a gap XY: different components are placed in the gap");
  c.wire([70, 50], [190, 50]);
  c.sb.line(190, 50, 330, 50, { stroke: C.grey, sw: 1.6, dash: "6 5" });
  c.wire([330, 50], [440, 50]);
  c.dot(190, 50); c.dot(330, 50);
  c.text(190, 32, "X", { size: 14 });
  c.text(330, 32, "Y", { size: 14 });
  c.text(260, 38, "gap", { size: 12.5, fill: C.grey, bold: false });
  c.meter(440, 50, 440, 190, "A");
  c.key(440, 190, 340, 190);
  c.battery(340, 190, 70, 190, 4, { pos: "start" });
  c.wire([70, 190], [70, 50]);
  c.label(205, 190, "Four cells of 1.5 V", "below", 30, { size: 12.5 });
  c.label(390, 190, "Key", "below", 18, { size: 12.5 });
  c.text(260, 118, "Nichrome wire, torch bulb or 10 W bulb", { size: 12.5, fill: C.grey });
  return c.build();
}

// ── 8. circuit to study the factors on which resistance depends (Figure 11.5) ──
function factorsCircuit(): Scene {
  const c = new Circuit(580, 260, "Circuit to study the factors on which the resistance of a wire depends");
  c.wire([50, 50], [100, 50]);
  c.sb.line(100, 50, 190, 50, { stroke: C.grey, sw: 1.6, dash: "6 5" });
  c.wire([190, 50], [235, 50]);
  c.dot(100, 50); c.dot(190, 50);
  c.text(100, 32, "P", { size: 14 });
  c.text(190, 32, "Q", { size: 14 });
  c.meter(235, 50, 235, 200, "A");
  c.key(235, 200, 160, 200);
  c.cell(160, 200, 50, 200, { pos: "start" });
  c.wire([50, 200], [50, 50]);
  const wires: [number, number, number, string, string][] = [[52, 90, 2.4, "#475569", "(1) Nichrome, length l"], [102, 170, 2.4, "#475569", "(2) Nichrome, length 2l"], [152, 90, 7, "#475569", "(3) Thicker nichrome, length l"], [202, 90, 2.4, "#c2410c", "(4) Copper, length l"]];
  wires.forEach(([y, len, sw, col, t]) => {
    c.sb.text(310, y - 12, t, { size: 12.5, anchor: "start" });
    c.sb.line(310, y, 310 + len, y, { stroke: col, sw });
  });
  return c.build();
}

// ── 9 and 10. resistors in series (Figures 11.6 and 11.8) ──
function seriesFig(across: "all" | "first"): Scene {
  const c = new Circuit(580, 270, across === "all" ? "Three resistors in series, with a voltmeter across the whole combination XY" : "Voltmeter across the first resistor, between X and P");
  c.meter(50, 50, 170, 50, "A");
  c.res(180, 50, 270, 50); c.res(270, 50, 360, 50); c.res(360, 50, 450, 50);
  c.wire([450, 50], [520, 50], [520, 190]);
  c.key(520, 190, 330, 190);
  c.battery(330, 190, 50, 190, 3, { pos: "start" });
  c.wire([50, 190], [50, 50]);
  const to = across === "all" ? 450 : 270;
  c.dot(180, 50); c.dot(to, 50);
  c.wire([180, 50], [180, 115]); c.meter(180, 115, to, 115, "V"); c.wire([to, 115], [to, 50]);
  c.text(180, 30, "X", { size: 14 });
  c.text(to, 30, across === "all" ? "Y" : "P", { size: 14 });
  c.label(225, 50, "R_{1}", "above", 26);
  c.label(315, 50, "R_{2}", "above", 26);
  c.label(405, 50, "R_{3}", "above", 26);
  if (across === "all") { c.text(315, 152, "Voltmeter across XY", { size: 12.5, fill: C.grey }); }
  return c.build();
}

// ── 11. resistors in parallel (Figure 11.10) ──
function parallelFig(): Scene {
  const c = new Circuit(580, 290, "Three resistors in parallel: the same potential difference across each, the currents add up");
  c.meter(50, 40, 250, 40, "A");
  c.wire([250, 40], [250, 210]);
  const ys = [70, 125, 180];
  ys.forEach((y, i) => { c.res(250, y, 450, y, { len: 56 }); c.label(350, y, `R_{${i + 1}}`, "above", 22); });
  c.wire([450, 70], [450, 250]);
  [70, 125, 180, 210].forEach((y) => c.dot(250, y));
  [125, 180, 210].forEach((y) => c.dot(450, y));
  c.meter(250, 210, 450, 210, "V");
  c.wire([450, 250], [330, 250]);
  c.key(330, 250, 220, 250);
  c.battery(220, 250, 50, 250, 3, { pos: "start" });
  c.wire([50, 250], [50, 40]);
  return c.build();
}

// ── 12. ammeters in the branches (Figure 11.11) ──
function parallelAmmeters(): Scene {
  const c = new Circuit(580, 280, "An ammeter in each branch: the total current is the sum of the branch currents");
  c.meter(50, 40, 190, 40, "A");
  c.wire([190, 40], [190, 190]);
  const ys = [70, 120, 170];
  ys.forEach((y, i) => {
    c.meter(190, y, 330, y, "A");
    c.res(330, y, 480, y, { len: 50 });
    c.label(405, y, `R_{${i + 1}}`, "above", 22);
  });
  c.wire([480, 70], [480, 240]);
  [120, 170].forEach((y) => { c.dot(190, y); c.dot(480, y); });
  c.dot(190, 70);
  c.wire([480, 240], [330, 240]);
  c.key(330, 240, 210, 240);
  c.battery(210, 240, 50, 240, 3, { pos: "start" });
  c.wire([50, 240], [50, 40]);
  c.text(76, 30, "I", { size: 13, fill: C.red });
  c.text(214, 60, "I_{1}", { size: 12.5, fill: C.red });
  c.text(214, 110, "I_{2}", { size: 12.5, fill: C.red });
  c.text(214, 160, "I_{3}", { size: 12.5, fill: C.red });
  return c.build();
}

// ── 13. series and parallel together (Figure 11.12) ──
function mixedFig(): Scene {
  const c = new Circuit(640, 280, "A circuit with resistors in series and in parallel (Example 11.9)");
  // first parallel pair: R1 = 10, R2 = 40
  c.wire([40, 120], [110, 120]);
  c.wire([110, 60], [110, 180]);
  c.res(110, 60, 250, 60, { len: 56 }); c.res(110, 180, 250, 180, { len: 56 });
  c.wire([250, 60], [250, 180]);
  c.dot(110, 120); c.dot(250, 120);
  c.wire([250, 120], [330, 120]);
  c.label(180, 60, "R_{1} = 10 Ω", "above", 22, { size: 12.5 });
  c.label(180, 180, "R_{2} = 40 Ω", "below", 22, { size: 12.5 });
  // second parallel group: R3 = 30, R4 = 20, R5 = 60
  c.wire([330, 50], [330, 200]);
  c.res(330, 50, 490, 50, { len: 56 }); c.res(330, 120, 490, 120, { len: 56 }); c.res(330, 200, 490, 200, { len: 56 });
  c.wire([490, 50], [490, 200]);
  c.dot(330, 120); c.dot(490, 120);
  c.wire([490, 120], [580, 120], [580, 245]);
  c.label(410, 50, "R_{3} = 30 Ω", "above", 22, { size: 12.5 });
  c.label(410, 120, "R_{4} = 20 Ω", "above", 22, { size: 12.5 });
  c.label(410, 200, "R_{5} = 60 Ω", "below", 22, { size: 12.5 });
  c.wire([580, 245], [330, 245]);
  c.battery(330, 245, 40, 245, 3, { pos: "start" });
  c.wire([40, 245], [40, 120]);
  c.text(185, 275, "12 V battery", { size: 12.5 });
  return c.build();
}

// ── 14. lamp and conductor in series (Figure 11.9) ──
function lampSeries(): Scene {
  const c = new Circuit(520, 240, "An electric lamp in series with a 4 Ω resistor and a 6 V battery");
  c.bulb(70, 55, 230, 55);
  c.res(230, 55, 400, 55, { len: 56 });
  c.wire([400, 55], [440, 55], [440, 175]);
  c.wire([440, 175], [260, 175]);
  c.battery(260, 175, 70, 175, 3, { pos: "start" });
  c.wire([70, 175], [70, 55]);
  c.label(150, 55, "Lamp 20 Ω", "above", 28, { size: 12.5 });
  c.label(315, 55, "4 Ω", "above", 24, { size: 12.5 });
  c.text(165, 210, "6 V battery", { size: 12.5 });
  return c.build();
}

// ── 15. steady current in a resistor (Figure 11.13) ──
function joule(): Scene {
  const c = new Circuit(500, 250, "A steady current I through a resistor R with a potential difference V across it");
  c.res(70, 55, 430, 55, { len: 70 });
  c.wire([430, 55], [430, 185]);
  c.cell(430, 185, 70, 185, { pos: "start", at: 0.5 });
  c.wire([70, 185], [70, 55]);
  c.dot(180, 55); c.dot(320, 55);
  c.label(250, 55, "R", "above", 26);
  c.flow(110, 34, 166, 34);
  c.text(138, 22, "I", { size: 14, fill: C.red });
  c.sb.line(180, 55, 180, 105, { stroke: C.grey, sw: 1.4, dash: "4 3" });
  c.sb.line(320, 55, 320, 105, { stroke: C.grey, sw: 1.4, dash: "4 3" });
  c.sb.arrow(250, 105, 320, 105, { stroke: C.blue });
  c.sb.arrow(250, 105, 180, 105, { stroke: C.blue });
  c.text(250, 130, "Potential difference V", { size: 12.5, fill: C.blue });
  c.text(250, 213, "Heat produced = V I t = I² R t", { size: 13 });
  return c.build();
}

// ── 16. parts of an electric bulb ──
function bulbParts(): Scene {
  const sb = new SceneBuilder(460, 310, "Parts of an electric bulb");
  sb.circle(230, 110, 72, { fill: "#f8fafc", stroke: C.ink, sw: 2.2 });
  sb.rect(206, 176, 48, 36, { fill: "#f8fafc", stroke: C.ink, sw: 2 });
  sb.rect(198, 212, 64, 58, { fill: "#cbd5e1", stroke: C.ink, sw: 2 });
  [226, 240, 254].forEach((y) => sb.line(198, y, 262, y, { stroke: C.grey, sw: 1.4 }));
  sb.rect(218, 270, 24, 10, { fill: "#94a3b8", stroke: C.ink, sw: 1.6 });
  sb.line(218, 176, 218, 112, { sw: 2 });
  sb.line(242, 176, 242, 112, { sw: 2 });
  sb.poly([[218, 112], [222, 102], [228, 120], [234, 102], [238, 120], [242, 112]], { stroke: C.red, sw: 2, close: false });
  // labels with leader lines
  sb.line(100, 44, 186, 84, { stroke: C.grey, sw: 1.2 });
  sb.text(8, 36, "Gas: nitrogen and argon", { size: 12.5, anchor: "start" });
  sb.line(296, 62, 330, 40, { stroke: C.grey, sw: 1.2 });
  sb.text(334, 38, "Glass bulb", { size: 12.5, anchor: "start" });
  sb.line(236, 102, 330, 96, { stroke: C.grey, sw: 1.2 });
  sb.text(334, 100, "Filament (tungsten)", { size: 12.5, anchor: "start" });
  sb.line(244, 150, 330, 150, { stroke: C.grey, sw: 1.2 });
  sb.text(334, 154, "Support wires", { size: 12.5, anchor: "start" });
  sb.line(264, 240, 330, 240, { stroke: C.grey, sw: 1.2 });
  sb.text(334, 244, "Metal cap", { size: 12.5, anchor: "start" });
  sb.line(242, 275, 330, 285, { stroke: C.grey, sw: 1.2 });
  sb.text(334, 289, "Terminal", { size: 12.5, anchor: "start" });
  return sb.build();
}

// ── 17. a cartridge fuse ──
function fusePic(): Scene {
  const sb = new SceneBuilder(460, 200, "A cartridge fuse: the fuse wire is sealed in a tube and joined in series with the appliance");
  sb.rect(110, 70, 220, 54, { fill: "#f1f5f9", stroke: C.ink, sw: 2 });
  sb.rect(90, 66, 22, 62, { fill: "#94a3b8", stroke: C.ink, sw: 2 });
  sb.rect(328, 66, 22, 62, { fill: "#94a3b8", stroke: C.ink, sw: 2 });
  sb.line(112, 97, 328, 97, { stroke: C.red, sw: 2 });
  sb.line(50, 97, 90, 97, { sw: 1.8 });
  sb.line(350, 97, 390, 97, { sw: 1.8 });
  sb.line(101, 66, 101, 36, { stroke: C.grey, sw: 1.2 });
  sb.text(101, 28, "Metal cap", { size: 12.5 });
  sb.line(220, 70, 220, 36, { stroke: C.grey, sw: 1.2 });
  sb.text(220, 28, "Glass or porcelain tube", { size: 12.5 });
  sb.line(220, 97, 220, 160, { stroke: C.grey, sw: 1.2 });
  sb.text(220, 178, "Fuse wire", { size: 12.5, fill: C.red });
  return sb.build();
}

// ── 18. the whole chapter ──
function mindMap(): Scene {
  const W = 1000, H = 720, bw = 310;
  const sb = new SceneBuilder(W, H, "Electricity: the whole chapter");
  const cols = ["#2563eb", "#b91c1c", "#0f766e", "#7c3aed", "#b45309", "#0369a1", "#15803d", "#a21caf"];
  const items: [string, string[]][] = [
    ["1. Current and circuit", ["I = Q ÷ t, unit ampere (A)", "Current opposite to electron flow", "Ammeter is joined in series"]],
    ["2. Potential difference", ["V = W ÷ Q, unit volt (V)", "1 V = 1 J per C", "Voltmeter is joined in parallel"]],
    ["3. Ohm's law", ["V = I R at constant temperature", "V–I graph: straight line", "Unit of R: ohm (Ω)"]],
    ["4. Resistance", ["R = ρ l ÷ A", "More length, more R; more area, less R", "Alloys: high resistivity"]],
    ["5. Series", ["Same current in each resistor", "R_{s} = R_{1} + R_{2} + R_{3}", "Voltages add up"]],
    ["6. Parallel", ["Same voltage across each", "1 ÷ R_{p} = 1 ÷ R_{1} + 1 ÷ R_{2} + ...", "Currents add up"]],
    ["7. Heating effect", ["H = I^{2} R t (Joule's law)", "Heater, iron, bulb filament", "Fuse protects the circuit"]],
    ["8. Electric power", ["P = V I = I^{2} R = V^{2} ÷ R", "Unit watt (W)", "1 kW h = 3.6 × 10^{6} J"]],
  ];
  const ys = [78, 238, 398, 558];
  const cx = W / 2, cy = H / 2;
  sb.ellipse(cx, cy, 112, 62, { fill: "#0f172a" });
  sb.text(cx, cy + 6, "Electricity", { size: 19, fill: "#ffffff" });
  items.forEach(([title, lines], i) => {
    const left = i < 4, y = ys[i % 4], x = left ? 8 : W - bw - 8, col = cols[i], h = 124;
    sb.curve([left ? x + bw : x, y], [(left ? x + bw : x) + (left ? 50 : -50), (y + cy) / 2], [left ? cx - 112 : cx + 112, cy], { stroke: col, sw: 2.2 });
    sb.rect(x, y - h / 2, bw, h, { rx: 12, fill: "#ffffff", stroke: col, sw: 2.2 });
    sb.text(x + 14, y - h / 2 + 26, title, { size: 15, fill: col, anchor: "start" });
    lines.forEach((l, k) => sb.text(x + 14, y - h / 2 + 54 + k * 24, l, { size: 13, fill: C.ink, anchor: "start", bold: false }));
  });
  return sb.build();
}

export const ELEC_DIAGRAMS: Record<string, () => Scene> = {
  el_circuit: simpleCircuit,
  el_symbols: symbols,
  el_water: waterAnalogy,
  el_meters: metersJoined,
  el_ohm: ohmCircuit,
  el_vi: viGraph,
  el_gap: gapCircuit,
  el_factors: factorsCircuit,
  el_series: () => seriesFig("all"),
  el_series_p: () => seriesFig("first"),
  el_parallel: parallelFig,
  el_parallel_i: parallelAmmeters,
  el_mixed: mixedFig,
  el_lamp: lampSeries,
  el_joule: joule,
  el_bulb: bulbParts,
  el_fuse: fusePic,
  el_mindmap: mindMap,
};
