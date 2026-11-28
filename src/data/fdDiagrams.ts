import { SceneBuilder } from "../components/sceneKit";
import type { Scene } from "../components/sceneKit";
import { INK, GREEN, DGREEN, LGREEN, BLUE, LBLUE, ORANGE, LORANGE, PURPLE, LPURPLE, GREY, RED, LRED, YELLOW, LYELLOW, TEAL, LTEAL, box } from "./harmKit";

// Diagrams for Class VIII Maths "Fractions in Disguise" (NCERT Ganita Prakash Part II, Chapter 1): percentages, bar models, profit and loss,
// growth and compounding, decline, successive changes and the mind map. Checked by scripts/check-fd-diagrams.mts.

/** a horizontal bar from x with total width w; `parts` coloured segments given as [fraction of the bar, colour] */
function bar(sb: SceneBuilder, x: number, y: number, w: number, h: number, parts: [number, string][]) {
  sb.rect(x, y, w, h, { fill: "#e2e8f0" });
  let at = x;
  for (const [f, col] of parts) { sb.rect(at, y, w * f, h, { fill: col }); at += w * f; }
}
const tick = (sb: SceneBuilder, x: number, y1: number, y2: number) => sb.line(x, y1, x, y2, { stroke: INK, sw: 1.6, decor: true });

// ── 1. out of 100: the grid ──
function grid(): Scene {
  const sb = new SceneBuilder(720, 340, "Per cent means out of 100");
  const x0 = 60, y0 = 30, c = 26;
  for (let r = 0; r < 10; r++) for (let k = 0; k < 10; k++) sb.rect(x0 + k * c, y0 + r * c, c - 3, c - 3, { fill: r * 10 + k < 25 ? "#0ea5e9" : "#e2e8f0" });
  box(sb, 370, 40, 320, 62, ["100 small squares", "25 of them are shaded"], { fill: LBLUE, stroke: BLUE, size: 15, bold: [true, false] });
  box(sb, 370, 118, 320, 62, ["25 out of 100", "= 25% = 25 ÷ 100 = 0.25"], { fill: LGREEN, stroke: GREEN, size: 15, bold: [true, true] });
  box(sb, 370, 196, 320, 62, ["In lowest terms", "one quarter of the whole"], { fill: LORANGE, stroke: ORANGE, size: 15, bold: [true, false] });
  sb.text(530, 292, "x per cent means x out of every 100", { size: 13.5, fill: GREY, bold: false });
  sb.text(190, 312, "25% of the grid is blue", { size: 13.5 });
  return sb.build();
}

// ── 2. bar model: three quarters ──
function bar34(): Scene {
  const sb = new SceneBuilder(720, 240, "Bar model: three quarters is 75 per cent");
  const x = 60, w = 600;
  bar(sb, x, 80, w, 46, [[0.75, "#fb923c"]]);
  for (let i = 0; i <= 4; i++) { tick(sb, x + (w * i) / 4, 74, 132); sb.text(x + (w * i) / 4, 62, i === 0 ? "0" : `${i} of 4`, { size: 13 }); sb.text(x + (w * i) / 4, 158, `${25 * i}%`, { size: 14, fill: i === 3 ? "#c2410c" : INK }); }
  sb.text(360, 28, "Red paint makes up three of the four equal parts of the colour", { size: 13.5, fill: GREY, bold: false });
  sb.text(360, 200, "Three quarters = 75 out of 100 = 75%.  The rest, one quarter, is 25%.", { size: 14 });
  return sb.build();
}

// ── 3. fraction, decimal, percentage ──
function fdp(): Scene {
  const sb = new SceneBuilder(720, 350, "Fractions, decimals and percentages are the same number in three dresses");
  box(sb, 270, 20, 180, 70, ["Percentage", "25%"], { fill: LORANGE, stroke: ORANGE, size: 17, bold: [true, true] });
  box(sb, 40, 220, 180, 70, ["Fraction", "25 over 100"], { fill: LBLUE, stroke: BLUE, size: 17, bold: [true, true] });
  box(sb, 500, 220, 180, 70, ["Decimal", "0.25"], { fill: LGREEN, stroke: GREEN, size: 17, bold: [true, true] });
  sb.arrow(150, 218, 284, 94, { stroke: BLUE, sw: 2.4 }); sb.arrow(440, 94, 574, 218, { stroke: GREEN, sw: 2.4 }); sb.arrow(496, 266, 226, 266, { stroke: PURPLE, sw: 2.4 });
  sb.text(170, 130, "multiply by 100", { size: 13, anchor: "end", fill: BLUE }); sb.text(550, 130, "divide by 100", { size: 13, anchor: "start", fill: GREEN });
  sb.text(360, 254, "write over 100 and simplify", { size: 13, fill: PURPLE });
  sb.text(360, 324, "Find y% of a number: multiply the number by y ÷ 100 (that is, by the decimal)", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 4. Delhi to Agra ──
function trip(): Scene {
  const sb = new SceneBuilder(720, 230, "Bar model: 40 per cent of the journey is 92 km");
  const x = 60, w = 600;
  bar(sb, x, 90, w, 40, [[0.4, "#38bdf8"]]);
  [0, 0.4, 1].forEach((f) => tick(sb, x + w * f, 82, 138));
  sb.text(x, 164, "0%", { size: 13 }); sb.text(x + w * 0.4, 164, "40%", { size: 13 }); sb.text(x + w, 164, "100%", { size: 13 });
  sb.text(x, 70, "Delhi", { size: 14 }); sb.text(x + w, 70, "Agra", { size: 14 });
  sb.text(x + w * 0.2, 70, "92 km", { size: 15, fill: "#0369a1" }); sb.text(x + w * 0.7, 70, "? km (60%)", { size: 15, fill: "#c2410c" });
  sb.text(360, 204, "40% is 92 km, so 20% is 46 km and 60% is 138 km. The whole journey is 230 km.", { size: 13.5 });
  return sb.build();
}

// ── 5. percentages greater than 100 ──
function target(): Scene {
  const sb = new SceneBuilder(720, 330, "Sales against a daily target of 5000 rupees");
  const x = 150, unit = 3.6;
  const rows: [string, number, string][] = [["Day 1: 2000", 40, "#f87171"], ["Day 2: 3500", 70, "#fbbf24"], ["Day 3: 5000", 100, "#4ade80"], ["Day 4: 6000", 120, "#38bdf8"]];
  rows.forEach(([t, p, col], i) => {
    const y = 60 + i * 55;
    sb.text(x - 14, y + 5, t, { size: 13, anchor: "end" });
    sb.rect(x, y - 14, p * unit, 30, { rx: 5, fill: col });
    sb.text(x + p * unit + 12, y + 5, `${p}%`, { size: 14, anchor: "start" });
  });
  sb.line(x + 100 * unit, 30, x + 100 * unit, 250, { stroke: INK, sw: 1.6, dash: "5 4", decor: true });
  sb.text(x + 100 * unit, 22, "target = 100%", { size: 13 });
  sb.text(360, 300, "A percentage greater than 100 means more than the whole: 120% is the target and 20% more", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 6. percentage increase and decrease ──
function change(): Scene {
  const sb = new SceneBuilder(720, 330, "Percentage increase and decrease");
  box(sb, 20, 16, 330, 40, ["Price of tomatoes goes up"], { fill: LGREEN, stroke: GREEN, size: 14.5 });
  box(sb, 370, 16, 330, 40, ["Theatre visitors go down"], { fill: LRED, stroke: RED, size: 14.5 });
  sb.rect(80, 150, 70, 90, { fill: "#86efac" }); sb.rect(210, 114, 70, 126, { fill: "#22c55e" });
  sb.text(115, 262, "30 rupees", { size: 13 }); sb.text(245, 262, "42 rupees", { size: 13 });
  sb.text(180, 90, "increase 12", { size: 13, fill: DGREEN });
  sb.rect(430, 80, 70, 160, { fill: "#fca5a5" }); sb.rect(560, 140, 70, 100, { fill: "#ef4444" });
  sb.text(465, 262, "160 people", { size: 13 }); sb.text(595, 262, "100 people", { size: 13 });
  sb.text(598, 100, "decrease 60", { size: 13, fill: RED });
  sb.text(185, 296, "12 ÷ 30 × 100 = 40% increase", { size: 14, fill: DGREEN });
  sb.text(535, 296, "60 ÷ 160 × 100 = 37.5% decrease", { size: 14, fill: RED });
  sb.text(360, 322, "Always divide the change by the ORIGINAL (old) value", { size: 12.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 7. the journey of a sweater ──
function chain(): Scene {
  const sb = new SceneBuilder(720, 300, "Cost price, marked price and selling price along the journey of a sweater");
  const nodes: [number, string, string, string][] = [[20, "Manufacturer", "makes it for 230", LBLUE], [200, "Wholesaler", "buys at 253", LGREEN], [380, "Retailer", "buys at 300", LORANGE], [560, "Customer", "pays 430", LPURPLE]];
  nodes.forEach(([x, a, b, fill]) => box(sb, x, 60, 140, 70, [a, b], { fill, stroke: GREY, size: 13.5, bold: [true, false] }));
  [160, 340, 520].forEach((x) => sb.arrow(x + 2, 95, x + 36, 95, { stroke: INK, sw: 2.4 }));
  sb.text(180, 152, "sold at 253", { size: 12.5 }); sb.text(360, 152, "sold at 300", { size: 12.5 }); sb.text(540, 152, "marked 480", { size: 12.5 });
  box(sb, 60, 176, 600, 78, ["For the retailer: CP = 300, MP = 480, SP = 430", "Profit = SP − CP = 130,  profit per cent = 130 ÷ 300 × 100 ≈ 43.33%"], { fill: LYELLOW, stroke: "#ca8a04", size: 14, bold: [true, false] });
  sb.text(360, 284, "The selling price of one person is the cost price of the next", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 8. profit and loss ──
function profit(): Scene {
  const sb = new SceneBuilder(720, 310, "Profit and loss are measured on the cost price");
  const x = 60, w = 600, at = (v: number) => x + (v / 130) * w;
  [[80, "Profit: SP is more than CP", "#22c55e", 125], [210, "Loss: SP is less than CP", "#ef4444", 82]].forEach(([y, t, col, sp]) => {
    const yy = y as number, s = sp as number;
    bar(sb, x, yy, w, 26, [[100 / 130, "#93c5fd"]]);
    tick(sb, at(100), yy - 8, yy + 34); tick(sb, at(s), yy - 8, yy + 34);
    sb.text(x + 150, yy - 14, t as string, { size: 14, fill: col as string });
    sb.text(at(100), yy + 52, "CP = 100%", { size: 13 });
    sb.text(at(s), yy - 14, s > 100 ? "SP = 125%" : "SP = 82%", { size: 13, fill: col as string });
    sb.rect(Math.min(at(100), at(s)), yy + 8, Math.abs(at(s) - at(100)), 10, { fill: col as string });
  });
  sb.text(360, 292, "Profit % = profit ÷ CP × 100;  Loss % = loss ÷ CP × 100", { size: 14 });
  return sb.build();
}

// ── 9. with and without compounding ──
function growth(): Scene {
  const sb = new SceneBuilder(720, 370, "6000 rupees at 10% per year with and without compounding");
  const rows: [string, number, number][] = [["Start", 6000, 6000], ["Year 1", 6600, 6600], ["Year 2", 7200, 7260], ["Year 3", 7800, 7986]];
  const base = 290, scale = (v: number) => ((v - 4000) / 4000) * 220;
  rows.forEach(([t, s, c], i) => {
    const x = 90 + i * 160;
    sb.rect(x, base - scale(s), 52, scale(s), { fill: "#60a5fa" }); sb.rect(x + 58, base - scale(c), 52, scale(c), { fill: "#f97316" });
    sb.text(x + 26, base - scale(s) - 10, String(s), { size: 12.5, fill: "#1d4ed8" }); sb.text(x + 88, base - scale(c) - 26, String(c), { size: 12.5, fill: "#c2410c" });
    sb.text(x + 55, base + 22, t, { size: 14 });
  });
  sb.line(70, base, 700, base, { stroke: GREY, sw: 1.6 });
  sb.rect(150, 336, 16, 14, { fill: "#60a5fa" }); sb.text(174, 348, "without compounding (interest paid out)", { size: 12.5, anchor: "start" });
  sb.rect(440, 336, 16, 14, { fill: "#f97316" }); sb.text(464, 348, "with compounding (interest added)", { size: 12.5, anchor: "start" });
  sb.text(360, 22, "Same money, same rate, same time: compounding gives 186 rupees more", { size: 13.5, bold: false, fill: GREY });
  return sb.build();
}

// ── 10. decline ──
function decline(): Scene {
  const sb = new SceneBuilder(720, 290, "Decline: a village of 1250 falls by about 10% every decade");
  const vals: [string, number][] = [["Now", 1250], ["After 1 decade", 1125], ["After 2 decades", 1013], ["After 3 decades", 912]];
  vals.forEach(([t, v], i) => {
    const x = 60 + i * 170, h = (v / 1250) * 150;
    sb.rect(x + 20, 210 - h, 70, h, { fill: ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"][i] });
    sb.text(x + 55, 210 - h - 10, String(v), { size: 14 });
    sb.text(x + 55, 232, t, { size: 13 });
    if (i < 3) sb.text(x + 140, 150, "× 0.9", { size: 14, fill: PURPLE });
  });
  sb.line(50, 210, 690, 210, { stroke: GREY, sw: 1.6 });
  sb.text(360, 270, "A fall of 10% means multiplying by 0.9 every time: value after t terms = p (1 − r) to the power t", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 11. successive discounts ──
function successive(): Scene {
  const sb = new SceneBuilder(720, 300, "Two discounts one after the other are not added");
  const steps: [number, string, string, string][] = [[20, "Marked price", "100", LBLUE], [270, "After 20% off", "80", LGREEN], [520, "After 10% more off", "72", LORANGE]];
  steps.forEach(([x, a, b, fill]) => box(sb, x, 60, 180, 80, [a, b], { fill, stroke: GREY, size: 16, bold: [true, true] }));
  sb.arrow(204, 100, 266, 100, { stroke: INK, sw: 2.6 }); sb.arrow(454, 100, 516, 100, { stroke: INK, sw: 2.6 });
  sb.text(235, 86, "× 0.8", { size: 14, fill: DGREEN }); sb.text(485, 86, "× 0.9", { size: 14, fill: "#c2410c" });
  box(sb, 90, 172, 540, 70, ["Total discount = 100 − 72 = 28%, not 30%", "Rule: net change = a + b + a × b ÷ 100 = −20 − 10 + 2 = −28"], { fill: LYELLOW, stroke: "#ca8a04", size: 15, bold: [true, false] });
  sb.text(360, 30, "20% off, then 10% off", { size: 15 });
  sb.text(360, 278, "The second discount works on the NEW price, not on the original price", { size: 13, bold: false, fill: GREY });
  return sb.build();
}

// ── 12. up and then down ──
function upDown(): Scene {
  const sb = new SceneBuilder(720, 280, "Up by 10% and then down by 10% does not come back");
  const vals: [number, string, number, string][] = [[100, "Start", 100, "#60a5fa"], [290, "Up 10%", 110, "#22c55e"], [480, "Down 10%", 99, "#ef4444"]];
  vals.forEach(([x, t, v, col]) => { const h = v * 1.4; sb.rect(x, 200 - h, 90, h, { fill: col }); sb.text(x + 45, 200 - h - 10, String(v), { size: 16 }); sb.text(x + 45, 224, t, { size: 14 }); });
  sb.line(80, 200, 640, 200, { stroke: GREY, sw: 1.6 });
  sb.line(80, 60, 640, 60, { stroke: INK, sw: 1.2, dash: "4 4", decor: true });
  sb.text(648, 64, "100", { size: 12.5, anchor: "start" });
  sb.text(360, 258, "The 10% decrease is taken on 110, which is bigger than 100: 99, a net fall of 1%", { size: 13.5 });
  return sb.build();
}

// ── 13. mind map ──
function mindMap(): Scene {
  const W = 1440, H = 940;
  const sb = new SceneBuilder(W, H, "Fractions in Disguise: the whole chapter");
  const cx = W / 2, cy = 440;
  type Br = { n: string; t: string; col: string; tint: string; leaves: string[] };
  const brs: Br[] = [
    { n: "1", t: "Per cent", col: "#b45309", tint: "#fef3c7", leaves: ["Means out of 100", "x% = x ÷ 100", "Fraction × 100 = per cent"] },
    { n: "2", t: "Of a quantity", col: "#2563eb", tint: "#dbeafe", leaves: ["y% of z = y ÷ 100 × z", "10%, 25%, 50% mentally", "More than 100%: more than whole"] },
    { n: "3", t: "Increase, decrease", col: "#0f766e", tint: "#ccfbf1", leaves: ["Change ÷ original × 100", "Up r%: × (1 + r ÷ 100)", "Down r%: × (1 − r ÷ 100)"] },
    { n: "4", t: "Profit and loss", col: "#15803d", tint: "#dcfce7", leaves: ["Profit = SP − CP", "Per cent on cost price", "Discount on marked price"] },
    { n: "5", t: "Taxes", col: "#c2410c", tint: "#ffedd5", leaves: ["GST added to the price", "CGST + SGST on a bill", "Bill = price × (1 + rate)"] },
    { n: "6", t: "Without compounding", col: "#7c3aed", tint: "#ede9fe", leaves: ["Interest paid out each year", "Interest = p × r × t", "Amount = p (1 + rt)"] },
    { n: "7", t: "With compounding", col: "#b91c1c", tint: "#fee2e2", leaves: ["Interest added to principal", "Amount = p (1 + r)^{t}", "Decline: p (1 − r)^{t}"] },
    { n: "8", t: "Tricky percentages", col: "#a21caf", tint: "#fae8ff", leaves: ["Successive changes do not add", "x% of y = y% of x", "Up 10%, down 10%: 99"] },
  ];
  [120, 175].forEach((r, i) => sb.circle(cx, cy, r, { stroke: "#e2e8f0", sw: 1.2, dash: i ? "6 6" : undefined }));
  sb.circle(cx, cy, 96, { fill: "#0f172a" }); sb.circle(cx, cy, 104, { stroke: "#334155", sw: 3 });
  sb.text(cx, cy - 16, "FRACTIONS", { size: 18, fill: "#ffffff" }); sb.text(cx, cy + 6, "IN DISGUISE", { size: 17, fill: "#e2e8f0" }); sb.text(cx, cy + 32, "%", { size: 22, fill: "#fbbf24" });
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
  sb.text(cx, 800, "THREE GOLDEN RULES", { size: 14, fill: GREY });
  const rules: [string, string, string, string][] = [
    ["Know the whole", "a per cent is a part of some whole", "always ask: per cent of what?", "#0f766e"],
    ["Divide by the original", "increase, decrease, profit, loss", "compare with the starting value", "#c2410c"],
    ["Multiply, do not add", "successive changes multiply", "1.1 × 0.9 = 0.99, not 1", "#7c3aed"],
  ];
  rules.forEach(([a, b2, c2, col], i) => {
    const x = 90 + i * 430;
    sb.rect(x, 820, 400, 100, { rx: 16, fill: "#ffffff", stroke: col, sw: 2.6 });
    sb.rect(x, 820, 400, 34, { rx: 16, fill: col });
    sb.text(x + 200, 843, a, { size: 14.5, fill: "#ffffff" });
    sb.text(x + 200, 878, b2, { size: 13.5, fill: INK }); sb.text(x + 200, 900, c2, { size: 12, fill: INK, bold: false });
  });
  return sb.build();
}

export const FD_DIAGRAMS: Record<string, () => Scene> = {
  fd_grid: grid,
  fd_bar34: bar34,
  fd_fdp: fdp,
  fd_trip: trip,
  fd_target: target,
  fd_change: change,
  fd_chain: chain,
  fd_profit: profit,
  fd_growth: growth,
  fd_decline: decline,
  fd_successive: successive,
  fd_updown: upDown,
  fd_mindmap: mindMap,
};
void [GREEN, DGREEN, TEAL, LTEAL, LPURPLE, LRED, YELLOW, LYELLOW, PURPLE];
