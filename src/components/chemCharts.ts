import { SceneBuilder, Scene, C, textWidth } from "./sceneKit";

// Charts: classification tree, homologous-series ladder, reaction map and the chapter mind map.

interface Box { cx: number; cy: number; w: number; h: number }

function box(sb: SceneBuilder, cx: number, cy: number, lines: string[], o: { fill?: string; stroke?: string; size?: number; title?: string; minW?: number; col?: string } = {}): Box {
  const size = o.size ?? 13, pad = 12, lh = size + 5;
  const all = o.title ? [o.title, ...lines] : lines;
  const w = Math.max(o.minW ?? 0, ...all.map((t, i) => textWidth(t, size, i === 0 && !!o.title || !o.title)) ) + pad * 2;
  const h = all.length * lh + 14;
  sb.rect(cx - w / 2, cy - h / 2, w, h, { rx: 9, fill: o.fill ?? "#f8fafc", stroke: o.stroke ?? C.blue, sw: 1.8 });
  all.forEach((t, i) => sb.text(cx, cy - h / 2 + 11 + size + i * lh - 2, t, { size, bold: !o.title || i === 0, fill: i === 0 && o.title ? (o.stroke ?? C.blue) : C.ink }));
  return { cx, cy, w, h };
}
/** one connector from a parent box to its children: a stem, a bar and a drop to every child */
const branch = (sb: SceneBuilder, a: Box, kids: Box[]) => {
  const y1 = a.cy + a.h / 2, y2 = Math.min(...kids.map((k) => k.cy - k.h / 2)), mid = (y1 + y2) / 2;
  const xs = [a.cx, ...kids.map((k) => k.cx)];
  sb.line(a.cx, y1, a.cx, mid, { sw: 1.6 });
  if (Math.max(...xs) - Math.min(...xs) > 0.5) sb.line(Math.min(...xs), mid, Math.max(...xs), mid, { sw: 1.6 });
  kids.forEach((k) => sb.line(k.cx, mid, k.cx, k.cy - k.h / 2, { sw: 1.6 }));
};

export function hydrocarbonTree(): Scene {
  const sb = new SceneBuilder(740, 330, "Classification of hydrocarbons");
  const t = box(sb, 330, 30, ["Hydrocarbons (only C and H)"], { fill: "#dbeafe" });
  const ali = box(sb, 220, 108, ["Aliphatic"], {});
  const aro = box(sb, 600, 108, ["Aromatic", "(benzene ring)"], { stroke: C.purple });
  const acy = box(sb, 120, 190, ["Acyclic", "(open chain)"], {});
  const ali2 = box(sb, 330, 190, ["Alicyclic", "(closed ring)"], {});
  const l1 = box(sb, 60, 280, ["Saturated", "Alkanes"], { stroke: C.green, size: 12.5 });
  const l2 = box(sb, 190, 280, ["Unsaturated", "Alkenes, alkynes"], { stroke: C.red, size: 12.5 });
  const l3 = box(sb, 330, 280, ["Saturated", "Cycloalkanes"], { stroke: C.green, size: 12.5 });
  const l4 = box(sb, 475, 280, ["Unsaturated", "Cycloalkenes"], { stroke: C.red, size: 12.5 });
  const l5 = box(sb, 640, 280, ["Examples", "Benzene, toluene"], { stroke: C.purple, size: 12.5 });
  branch(sb, t, [ali, aro]); branch(sb, ali, [acy, ali2]);
  branch(sb, acy, [l1, l2]); branch(sb, ali2, [l3, l4]); branch(sb, aro, [l5]);
  return sb.build();
}

export function homologousLadder(): Scene {
  const sb = new SceneBuilder(420, 340, "A homologous series: each member is one −CH₂− more than the one before");
  const rows = ["Methane   CH_{4}   (16 u)", "Ethane   C_{2}H_{6}   (30 u)", "Propane   C_{3}H_{8}   (44 u)", "Butane   C_{4}H_{10}   (58 u)"];
  const bs = rows.map((r, i) => box(sb, 150, 36 + i * 90, [r], { fill: i % 2 ? "#ecfeff" : "#eff6ff", minW: 250 }));
  for (let i = 0; i < 3; i++) {
    const y1 = bs[i].cy + bs[i].h / 2, y2 = bs[i + 1].cy - bs[i + 1].h / 2;
    sb.arrow(150, y1 + 1, 150, y2 - 1, { stroke: C.red, sw: 2 });
    sb.text(166, (y1 + y2) / 2 + 5, "+ CH_{2}  (14 u)", { size: 12.5, fill: C.red, anchor: "start" });
  }
  return sb.build();
}

export function reactionMap(): Scene {
  const sb = new SceneBuilder(640, 330, "Four reactions of carbon compounds");
  const c = box(sb, 320, 165, ["Carbon", "compounds"], { fill: "#dbeafe", size: 14 });
  const mk = (cx: number, cy: number, title: string, l: string[], col: string) => box(sb, cx, cy, l, { title, stroke: col, size: 12.5 });
  const b1 = mk(120, 60, "1. Combustion", ["Burns in oxygen:", "CO_{2} + H_{2}O + heat, light"], C.red);
  const b2 = mk(520, 60, "2. Oxidation", ["Alcohol → acid with", "KMnO_{4} or K_{2}Cr_{2}O_{7}"], C.orange);
  const b3 = mk(120, 272, "3. Addition", ["Unsaturated + H_{2}, Ni:", "gives a saturated compound"], C.green);
  const b4 = mk(520, 272, "4. Substitution", ["Saturated + Cl_{2}, sunlight:", "Cl takes the place of H"], C.purple);
  [b1, b2, b3, b4].forEach((b) => {
    const sx = b.cx < c.cx ? c.cx - c.w / 2 : c.cx + c.w / 2, ex = b.cx < c.cx ? b.cx + b.w / 2 : b.cx - b.w / 2;
    sb.line(sx, c.cy + (b.cy < c.cy ? -10 : 10), ex, b.cy, { stroke: C.grey, sw: 1.6 });
  });
  return sb.build();
}

export function chapterMindMap(): Scene {
  const W = 1000, H = 720, bw = 310;
  const sb = new SceneBuilder(W, H, "Carbon and its Compounds: the whole chapter");
  const cols = ["#2563eb", "#0f766e", "#b45309", "#7c3aed", "#be123c", "#0369a1", "#15803d", "#a21caf"];
  const items: [string, string[]][] = [
    ["1. Carbon", ["Atomic number 6, valency 4", "Millions of compounds", "Burns to CO_{2}: limewater test"]],
    ["2. Covalent bond", ["Electrons are shared", "Low m.p. and b.p., poor conductors", "Single, double, triple bonds"]],
    ["3. Versatile carbon", ["Catenation: chains, branches, rings", "Tetravalency: four bonds", "Strong C–C bond (small atom)"]],
    ["4. Allotropes", ["Diamond: hard 3D network", "Graphite: slippery, conducts", "C_{60}: football-shaped"]],
    ["5. Hydrocarbons", ["Alkanes C_{n}H_{2n+2}: saturated", "Alkenes C_{n}H_{2n}: C=C", "Alkynes C_{n}H_{2n−2}: C≡C"]],
    ["6. Series and names", ["Same group, −CH_{2}− apart", "Root + suffix: ane, ene, yne", "Isomers: same formula"]],
    ["7. Reactions", ["Combustion, oxidation", "Addition: unsaturated + H_{2}", "Substitution: alkane + Cl_{2}"]],
    ["8. Ethanol, acid, soap", ["Ethanol: Na test, ester", "Ethanoic acid: weak acid", "Soap: micelle; detergent"]],
  ];
  const ys = [78, 238, 398, 558];
  const cx = W / 2, cy = H / 2;
  sb.ellipse(cx, cy, 112, 62, { fill: "#0f172a" });
  sb.text(cx, cy - 4, "Carbon and its", { size: 17, fill: "#ffffff" });
  sb.text(cx, cy + 20, "Compounds", { size: 17, fill: "#ffffff" });
  items.forEach(([title, lines], i) => {
    const left = i < 4, y = ys[i % 4], x = left ? 8 : W - bw - 8;
    const col = cols[i];
    const h = 124;
    sb.curve([left ? x + bw : x, y], [(left ? x + bw : x) + (left ? 50 : -50), (y + cy) / 2 + (y < cy ? 0 : 0)], [left ? cx - 112 : cx + 112, cy], { stroke: col, sw: 2.2 });
    sb.rect(x, y - h / 2, bw, h, { rx: 12, fill: "#ffffff", stroke: col, sw: 2.2 });
    sb.text(x + 14, y - h / 2 + 26, title, { size: 15, fill: col, anchor: "start" });
    lines.forEach((l, k) => sb.text(x + 14, y - h / 2 + 54 + k * 24, l, { size: 13.5, fill: C.ink, anchor: "start", bold: false }));
  });
  return sb.build();
}

/** boiling points of five compounds with two carbon atoms: the stronger the pull between molecules, the higher the boiling point */
export function boilingPoints(): Scene {
  const sb = new SceneBuilder(600, 290, "Boiling points of compounds with 2 carbon atoms (in kelvin)");
  const rows: [string, number, string, string][] = [
    ["Ethane  C_{2}H_{6}", 184, "#94a3b8", "no –OH, no C=O"],
    ["Methoxymethane  C_{2}H_{6}O", 249, "#60a5fa", "ether: no H-bonds"],
    ["Ethanal  C_{2}H_{4}O", 294, "#34d399", "polar C=O"],
    ["Ethanol  C_{2}H_{5}OH", 351, "#f59e0b", "H-bonds"],
    ["Ethanoic acid  CH_{3}COOH", 391, "#ef4444", "strongest H-bonds"],
  ];
  const x0 = 205, k = 1.25;
  rows.forEach(([name, bp, col, note], i) => {
    const y = 28 + i * 50, len = (bp - 140) * k;
    sb.text(x0 - 10, y + 16, name, { size: 12.5, anchor: "end" });
    sb.rect(x0, y, len, 24, { rx: 4, fill: col });
    sb.text(x0 + len + 8, y + 16, `${bp} K`, { size: 12.5, anchor: "start" });
    sb.text(x0 + 6, y + 40, note, { size: 11, fill: C.grey, anchor: "start", bold: false });
  });
  return sb.build();
}
