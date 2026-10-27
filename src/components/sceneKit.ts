// A tiny scene kit for chemistry diagrams: a diagram is a list of simple shapes and texts. The same scene
// is drawn by <SceneFigure> and tested by checkScene(), which reports any text that touches a line, a
// shape outline or another text, and any two lines lying on top of each other.

export type Pt = [number, number];

export type Item =
  | { k: "line"; x1: number; y1: number; x2: number; y2: number; stroke: string; sw: number; dash?: string; decor?: boolean }
  | { k: "rect"; x: number; y: number; w: number; h: number; rx?: number; fill: string; stroke?: string; sw?: number; dash?: string }
  | { k: "circle"; cx: number; cy: number; r: number; fill: string; stroke?: string; sw?: number; dash?: string }
  | { k: "ellipse"; cx: number; cy: number; rx: number; ry: number; fill: string; stroke?: string; sw?: number }
  | { k: "poly"; pts: Pt[]; fill: string; stroke?: string; sw?: number; close?: boolean; dash?: string; decor?: boolean }
  | { k: "path"; d: string; pts: Pt[]; fill: string; stroke?: string; sw?: number; dash?: string; decor?: boolean }
  | { k: "text"; x: number; y: number; t: string; size: number; fill: string; anchor: "start" | "middle" | "end"; bold: boolean; italic?: boolean };

export interface Scene { w: number; h: number; items: Item[]; caption?: string; }

export const C = { ink: "#0f172a", blue: "#2563eb", red: "#dc2626", green: "#15803d", orange: "#ea580c", grey: "#64748b", purple: "#7c3aed", teal: "#0f766e", light: "#e2e8f0", glass: "#cbd5e1", water: "#bfdbfe", oil: "#fde68a", white: "#ffffff" };

// Markup inside texts: _{2} is a subscript, ^{+} is a superscript. fm("CH3COOH") turns formula digits into subscripts.
export const fm = (s: string): string => s.replace(/([A-Za-z\)])(\d+)/g, (_m, a, d) => `${a}_{${d}}`);

type Seg = { s: string; kind: "n" | "sub" | "sup" };
export function parseMarkup(t: string): Seg[] {
  const out: Seg[] = [];
  let i = 0, cur = "";
  const flush = () => { if (cur) { out.push({ s: cur, kind: "n" }); cur = ""; } };
  while (i < t.length) {
    const ch = t[i];
    if ((ch === "_" || ch === "^") && t[i + 1] === "{") {
      const j = t.indexOf("}", i);
      if (j > 0) { flush(); out.push({ s: t.slice(i + 2, j), kind: ch === "_" ? "sub" : "sup" }); i = j + 1; continue; }
    }
    cur += ch; i++;
  }
  flush();
  return out;
}

function charW(c: string): number {
  if (c === " ") return 0.3;
  if (/[A-Z]/.test(c)) return c === "I" ? 0.4 : c === "W" || c === "M" ? 0.92 : 0.72;
  if (/[a-z]/.test(c)) return c === "i" || c === "l" || c === "t" || c === "f" || c === "j" ? 0.34 : c === "m" || c === "w" ? 0.88 : 0.58;
  if (/[0-9]/.test(c)) return 0.58;
  if (/[.,:;'|!]/.test(c)) return 0.3;
  if (/[()\[\]\-]/.test(c)) return 0.38;
  return 0.75;
}
export function textWidth(t: string, size: number, bold = true): number {
  let w = 0;
  for (const g of parseMarkup(t)) for (const c of g.s) w += charW(c) * size * (g.kind === "n" ? 1 : 0.7) * (bold ? 1.06 : 1);
  return w;
}
const hasSub = (t: string) => parseMarkup(t).some((g) => g.kind === "sub");
const hasSup = (t: string) => parseMarkup(t).some((g) => g.kind === "sup");

export function textBox(it: Extract<Item, { k: "text" }>): [number, number, number, number] {
  const w = textWidth(it.t, it.size, it.bold);
  const x0 = it.anchor === "middle" ? it.x - w / 2 : it.anchor === "end" ? it.x - w : it.x;
  return [x0, it.y - it.size * (hasSup(it.t) ? 0.95 : 0.76), x0 + w, it.y + it.size * (hasSub(it.t) ? 0.42 : 0.24)];
}

// ── scene builder ──
export class SceneBuilder {
  items: Item[] = [];
  constructor(public w: number, public h: number, public caption?: string) {}
  line(x1: number, y1: number, x2: number, y2: number, o: { stroke?: string; sw?: number; dash?: string; decor?: boolean } = {}) {
    this.items.push({ k: "line", x1, y1, x2, y2, stroke: o.stroke ?? C.ink, sw: o.sw ?? 1.6, dash: o.dash, decor: o.decor });
    return this;
  }
  rect(x: number, y: number, w: number, h: number, o: { rx?: number; fill?: string; stroke?: string; sw?: number; dash?: string } = {}) {
    this.items.push({ k: "rect", x, y, w, h, rx: o.rx, fill: o.fill ?? "none", stroke: o.stroke ?? (o.fill ? undefined : C.ink), sw: o.sw ?? 1.6, dash: o.dash });
    return this;
  }
  circle(cx: number, cy: number, r: number, o: { fill?: string; stroke?: string; sw?: number; dash?: string } = {}) {
    this.items.push({ k: "circle", cx, cy, r, fill: o.fill ?? "none", stroke: o.stroke ?? (o.fill ? undefined : C.ink), sw: o.sw ?? 1.6, dash: o.dash });
    return this;
  }
  ellipse(cx: number, cy: number, rx: number, ry: number, o: { fill?: string; stroke?: string; sw?: number } = {}) {
    this.items.push({ k: "ellipse", cx, cy, rx, ry, fill: o.fill ?? "none", stroke: o.stroke ?? (o.fill ? undefined : C.ink), sw: o.sw ?? 1.6 });
    return this;
  }
  poly(pts: Pt[], o: { fill?: string; stroke?: string; sw?: number; close?: boolean; dash?: string; decor?: boolean } = {}) {
    this.items.push({ k: "poly", pts, fill: o.fill ?? "none", stroke: o.stroke ?? (o.fill ? undefined : C.ink), sw: o.sw ?? 1.6, close: o.close ?? true, dash: o.dash, decor: o.decor });
    return this;
  }
  curve(p0: Pt, p1: Pt, p2: Pt, o: { stroke?: string; sw?: number; dash?: string } = {}) {
    const pts: Pt[] = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16; pts.push([(1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]]); }
    this.items.push({ k: "path", d: `M ${p0[0]} ${p0[1]} Q ${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`, pts, fill: "none", stroke: o.stroke ?? C.ink, sw: o.sw ?? 1.6, dash: o.dash });
    return this;
  }
  /** closed free-form shape drawn through the points with straight edges (used for flames, droplets) */
  blob(d: string, pts: Pt[], o: { fill?: string; stroke?: string; sw?: number } = {}) {
    this.items.push({ k: "path", d, pts, fill: o.fill ?? "none", stroke: o.stroke, sw: o.sw ?? 1.4 });
    return this;
  }
  text(x: number, y: number, t: string, o: { size?: number; fill?: string; anchor?: "start" | "middle" | "end"; bold?: boolean; italic?: boolean } = {}) {
    this.items.push({ k: "text", x, y, t, size: o.size ?? 13, fill: o.fill ?? C.ink, anchor: o.anchor ?? "middle", bold: o.bold ?? true, italic: o.italic });
    return this;
  }
  arrow(x1: number, y1: number, x2: number, y2: number, o: { stroke?: string; sw?: number; dash?: string } = {}) {
    const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, hl = 9, hw = 4.5;
    const bx = x2 - ux * hl, by = y2 - uy * hl;
    const stroke = o.stroke ?? C.ink;
    this.line(x1, y1, bx, by, { stroke, sw: o.sw ?? 1.8, dash: o.dash });
    this.items.push({ k: "poly", pts: [[x2, y2], [bx - uy * hw, by + ux * hw], [bx + uy * hw, by - ux * hw]], fill: stroke, close: true, decor: true });
    return this;
  }
  build(): Scene { return { w: this.w, h: this.h, items: this.items, caption: this.caption }; }
}

// ── checking ──
type Seg4 = [number, number, number, number];
function segHitsBox(s: Seg4, b: [number, number, number, number], m: number): boolean {
  const x0 = b[0] - m, y0 = b[1] - m, x1 = b[2] + m, y1 = b[3] + m;
  const [ax, ay, bx, by] = s;
  const dx = bx - ax, dy = by - ay;
  let t0 = 0, t1 = 1;
  const clip = (p: number, q: number) => { if (p === 0) return q >= 0; const r = q / p; if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; } return true; };
  return clip(-dx, ax - x0) && clip(dx, x1 - ax) && clip(-dy, ay - y0) && clip(dy, y1 - ay) && t0 <= t1;
}
const boxHit = (a: number[], b: number[], m = 0) => a[0] - m < b[2] && a[2] + m > b[0] && a[1] - m < b[3] && a[3] + m > b[1];

export function strokeSegments(it: Item): Seg4[] {
  const out: Seg4[] = [];
  const polyline = (pts: Pt[], close: boolean) => { for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]]); if (close && pts.length > 2) out.push([pts[pts.length - 1][0], pts[pts.length - 1][1], pts[0][0], pts[0][1]]); };
  if (it.k === "line") out.push([it.x1, it.y1, it.x2, it.y2]);
  else if (it.k === "rect" && it.stroke) polyline([[it.x, it.y], [it.x + it.w, it.y], [it.x + it.w, it.y + it.h], [it.x, it.y + it.h]], true);
  else if (it.k === "circle" && it.stroke) { const pts: Pt[] = []; for (let i = 0; i <= 48; i++) { const a = (i / 48) * Math.PI * 2; pts.push([it.cx + it.r * Math.cos(a), it.cy + it.r * Math.sin(a)]); } polyline(pts, false); }
  else if (it.k === "ellipse" && it.stroke) { const pts: Pt[] = []; for (let i = 0; i <= 48; i++) { const a = (i / 48) * Math.PI * 2; pts.push([it.cx + it.rx * Math.cos(a), it.cy + it.ry * Math.sin(a)]); } polyline(pts, false); }
  else if (it.k === "poly" && it.stroke && !it.decor) polyline(it.pts, it.close ?? true);
  else if (it.k === "path" && it.stroke && !it.decor) polyline(it.pts, false);
  return out;
}

export function checkScene(sc: Scene): string[] {
  const issues: string[] = [];
  const texts = sc.items.filter((i): i is Extract<Item, { k: "text" }> => i.k === "text");
  const boxes = texts.map((t) => ({ t, b: textBox(t) }));
  const strokes: { s: Seg4; id: string; decor: boolean }[] = [];
  sc.items.forEach((it, idx) => { for (const s of strokeSegments(it)) strokes.push({ s, id: `${it.k}#${idx}`, decor: false }); });
  for (const { t, b } of boxes) {
    if (b[0] < -1 || b[1] < -1 || b[2] > sc.w + 1 || b[3] > sc.h + 1) issues.push(`text "${t.t}" is outside the picture`);
    const seen = new Set<string>();
    for (const st of strokes) if (!seen.has(st.id) && segHitsBox(st.s, b, 1.2)) { seen.add(st.id); issues.push(`text "${t.t}" touches ${st.id}`); }
  }
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) if (boxHit(boxes[i].b, boxes[j].b, 1)) issues.push(`texts "${boxes[i].t.t}" and "${boxes[j].t.t}" overlap`);
  // lines lying on top of each other
  const lines = sc.items.map((it, idx) => ({ it, idx })).filter((x): x is { it: Extract<Item, { k: "line" }>; idx: number } => x.it.k === "line" && !x.it.decor);
  for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) {
    const a = lines[i].it, b = lines[j].it;
    const adx = a.x2 - a.x1, ady = a.y2 - a.y1, bdx = b.x2 - b.x1, bdy = b.y2 - b.y1;
    const la = Math.hypot(adx, ady), lb = Math.hypot(bdx, bdy);
    if (la < 1 || lb < 1) continue;
    if (Math.abs(adx * bdy - ady * bdx) / (la * lb) > 0.03) continue;
    const dist = Math.abs((b.x1 - a.x1) * ady - (b.y1 - a.y1) * adx) / la;
    if (dist > 1.5) continue;
    const ux = adx / la, uy = ady / la;
    const t1 = (b.x1 - a.x1) * ux + (b.y1 - a.y1) * uy, t2 = (b.x2 - a.x1) * ux + (b.y2 - a.y1) * uy;
    const lo = Math.max(0, Math.min(t1, t2)), hi = Math.min(la, Math.max(t1, t2));
    if (hi - lo > 2) issues.push(`lines #${lines[i].idx} and #${lines[j].idx} overlap`);
  }
  return issues;
}
