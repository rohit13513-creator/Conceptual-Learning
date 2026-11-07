// Pure layout engine for coordinate-plane graphs (straight lines, points and step triangles). A graph is described by a
// plain object (GraphData), so the same graph can be used in the notes, the solved questions and the question bank.
// Every text label is placed where it touches no line, no point, no tick number and no other label. The same function is
// used by the renderer and by the overlap checker, so what the checker approves is exactly what is drawn.

export type XY = [number, number];

export interface GraphData {
  x: XY; // visible range of x, for example [-1, 7]
  y: XY; // visible range of y
  unit?: number; // distance between tick numbers on the x-axis (default 1)
  unitY?: number; // the same for the y-axis (default: the same as unit)
  lines?: { p: XY; q: XY; color?: string; dash?: boolean; label?: string; at?: XY }[]; // the line through p and q, drawn across the whole window
  points?: { at: XY; label?: string; color?: string; hollow?: boolean }[];
  segs?: { from: XY; to: XY; color?: string; dash?: boolean; label?: string }[];
  labels?: { at: XY; t: string; color?: string }[];
  noTicks?: boolean;
  noGrid?: boolean;
}

export const GRID = "#e2e8f0";
export const AXIS = "#0f172a";
export const LBLUE = "#2563eb";
export const LORANGE = "#ea580c";
export const LGREEN = "#15803d";
export const LRED = "#be123c";

type Box = [number, number, number, number];
type Seg = [number, number, number, number];

export type GPrim =
  | { k: "line"; x1: number; y1: number; x2: number; y2: number; stroke: string; sw: number; dash?: string }
  | { k: "dot"; x: number; y: number; stroke: string; fill: string }
  | { k: "arrow"; pts: string; fill: string };

export interface GText { x: number; y: number; t: string; size: number; fill: string; anchor: "middle" | "start" | "end"; bold: boolean }

export interface GLayout { prims: GPrim[]; texts: GText[]; w: number; h: number; issues: string[] }

const tw = (t: string, size: number) => Math.max(size * 0.8, t.length * size * 0.62);

function segHitsBox(s: Seg, b: Box, m = 0): boolean {
  const x0 = b[0] - m, y0 = b[1] - m, x1 = b[2] + m, y1 = b[3] + m;
  const [ax, ay, bx, by] = s;
  const dx = bx - ax, dy = by - ay;
  let t0 = 0, t1 = 1;
  const clip = (p: number, q: number) => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; }
    return true;
  };
  return clip(-dx, ax - x0) && clip(dx, x1 - ax) && clip(-dy, ay - y0) && clip(dy, y1 - ay) && t0 <= t1;
}
const boxesHit = (a: Box, b: Box, m = 0) => a[0] - m < b[2] && a[2] + m > b[0] && a[1] - m < b[3] && a[3] + m > b[1];

export function layoutGraph(g: GraphData, w = 320, h = 280): GLayout {
  const M = 26; // margin for the axis names and the end of the axes
  const [x0, x1] = g.x, [y0, y1] = g.y;
  const unit = g.unit ?? 1;
  const unitY = g.unitY ?? unit;
  const S = Math.min((w - 2 * M) / (x1 - x0), (h - 2 * M) / (y1 - y0));
  const ox = (w - S * (x1 - x0)) / 2, oy = (h - S * (y1 - y0)) / 2;
  const px = (x: number) => ox + (x - x0) * S;
  const py = (y: number) => h - oy - (y - y0) * S;
  const pt = (p: XY): XY => [px(p[0]), py(p[1])];
  const prims: GPrim[] = [];
  const texts: GText[] = [];
  const issues: string[] = [];
  const obstacles: Seg[] = [];
  const boxes: Box[] = [];

  // grid
  if (!g.noGrid) {
    for (let x = Math.ceil(x0 / unit) * unit; x <= x1 + 1e-9; x += unit) prims.push({ k: "line", x1: px(x), y1: py(y0), x2: px(x), y2: py(y1), stroke: GRID, sw: 1 });
    for (let y = Math.ceil(y0 / unitY) * unitY; y <= y1 + 1e-9; y += unitY) prims.push({ k: "line", x1: px(x0), y1: py(y), x2: px(x1), y2: py(y), stroke: GRID, sw: 1 });
  }
  // axes (drawn through the origin when it is inside the window, else along the window edge)
  const ax = Math.min(Math.max(0, x0), x1), ay = Math.min(Math.max(0, y0), y1);
  const xAxis: Seg = [px(x0), py(ay), px(x1), py(ay)];
  const yAxis: Seg = [px(ax), py(y0), px(ax), py(y1)];
  for (const s of [xAxis, yAxis]) { prims.push({ k: "line", x1: s[0], y1: s[1], x2: s[2], y2: s[3], stroke: AXIS, sw: 1.6 }); obstacles.push(s); }
  prims.push({ k: "arrow", pts: `${xAxis[2] + 7},${xAxis[3]} ${xAxis[2] - 2},${xAxis[3] - 3.5} ${xAxis[2] - 2},${xAxis[3] + 3.5}`, fill: AXIS });
  prims.push({ k: "arrow", pts: `${yAxis[0]},${yAxis[1] - 7} ${yAxis[0] - 3.5},${yAxis[1] + 2} ${yAxis[0] + 3.5},${yAxis[1] + 2}`, fill: AXIS });
  texts.push({ x: xAxis[2] + 2, y: xAxis[3] + 15, t: "x", size: 13, fill: AXIS, anchor: "middle", bold: true });
  texts.push({ x: yAxis[0] + 10, y: yAxis[1] + 4, t: "y", size: 13, fill: AXIS, anchor: "middle", bold: true });
  boxes.push([xAxis[2] - 4, xAxis[3] + 3, xAxis[2] + 9, xAxis[3] + 19]);
  boxes.push([yAxis[0] + 3, yAxis[1] - 6, yAxis[0] + 17, yAxis[1] + 8]);

  // tick numbers
  if (!g.noTicks) {
    const size = 10.5;
    // when the numbers would crowd each other, write only every second (third, ...) one
    const widest = (lo: number, hi: number, u: number) => { let w = 0; for (let v = Math.ceil(lo / u) * u; v <= hi + 1e-9; v += u) w = Math.max(w, tw(String(Math.round(v * 100) / 100), size)); return w; };
    const skipX = Math.max(1, Math.ceil((widest(x0, x1, unit) + 6) / (unit * S)));
    const skipY = Math.max(1, Math.ceil(16 / (unitY * S)));
    for (let x = Math.ceil(x0 / unit) * unit, ix = 0; x <= x1 + 1e-9; x += unit, ix++) {
      if (Math.abs(x) < 1e-9 || Math.abs(x - x1) < 1e-9) continue; // no number under the arrow end
      if (Math.round(x / unit) % skipX !== 0) continue;
      const t = String(Math.round(x * 100) / 100).replace("-", "−");
      const cx = px(x), cy = xAxis[3] + 12;
      texts.push({ x: cx, y: cy + 3.5, t, size, fill: "#475569", anchor: "middle", bold: true });
      boxes.push([cx - tw(t, size) / 2, cy - 7, cx + tw(t, size) / 2, cy + 7]);
    }
    for (let y = Math.ceil(y0 / unitY) * unitY; y <= y1 + 1e-9; y += unitY) {
      if (Math.abs(y) < 1e-9 || Math.abs(y - y1) < 1e-9) continue;
      if (Math.round(y / unitY) % skipY !== 0) continue;
      const t = String(Math.round(y * 100) / 100).replace("-", "−");
      const cx = yAxis[0] - 7, cy = py(y);
      texts.push({ x: cx, y: cy + 3.5, t, size, fill: "#475569", anchor: "end", bold: true });
      boxes.push([cx - tw(t, size), cy - 7, cx + 1, cy + 7]);
    }
    if (ax === 0 && ay === 0 && x0 <= 0 && y0 <= 0) {
      texts.push({ x: px(0) - 8, y: py(0) + 13, t: "O", size, fill: "#475569", anchor: "middle", bold: true });
      boxes.push([px(0) - 14, py(0) + 3, px(0) - 2, py(0) + 17]);
    }
  }

  // lines, clipped to the window
  const clipLine = (p: XY, q: XY): Seg | null => {
    const dx = q[0] - p[0], dy = q[1] - p[1];
    const ts: number[] = [];
    if (dx !== 0) { ts.push((x0 - p[0]) / dx, (x1 - p[0]) / dx); }
    if (dy !== 0) { ts.push((y0 - p[1]) / dy, (y1 - p[1]) / dy); }
    const inside = (t: number) => { const x = p[0] + t * dx, y = p[1] + t * dy; return x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9; };
    const good = ts.filter(inside).sort((a, b) => a - b);
    if (good.length < 2) return null;
    const a = good[0], b = good[good.length - 1];
    const A = pt([p[0] + a * dx, p[1] + a * dy]), B = pt([p[0] + b * dx, p[1] + b * dy]);
    return [A[0], A[1], B[0], B[1]];
  };
  const placed: { s: Seg; color: string }[] = [];
  for (const l of g.lines ?? []) {
    const s = clipLine(l.p, l.q);
    if (!s) { issues.push(`line ${JSON.stringify(l.p)} ${JSON.stringify(l.q)} is outside the window`); continue; }
    const color = l.color ?? LBLUE;
    prims.push({ k: "line", x1: s[0], y1: s[1], x2: s[2], y2: s[3], stroke: color, sw: 2.2, dash: l.dash ? "6 4" : undefined });
    obstacles.push(s); placed.push({ s, color });
  }
  for (const s of g.segs ?? []) {
    const A = pt(s.from), B = pt(s.to);
    prims.push({ k: "line", x1: A[0], y1: A[1], x2: B[0], y2: B[1], stroke: s.color ?? LORANGE, sw: 1.8, dash: s.dash ? "5 4" : undefined });
    obstacles.push([A[0], A[1], B[0], B[1]]);
  }
  const dots = (g.points ?? []).map((p) => ({ ...p, xy: pt(p.at) }));
  for (const d of dots) {
    prims.push({ k: "dot", x: d.xy[0], y: d.xy[1], stroke: d.color ?? AXIS, fill: d.hollow ? "#ffffff" : d.color ?? AXIS });
    boxes.push([d.xy[0] - 4, d.xy[1] - 4, d.xy[0] + 4, d.xy[1] + 4]);
  }

  // label placement: try rings of positions around an anchor and keep the first one that touches nothing
  const inWindow = (b: Box) => b[0] >= 2 && b[2] <= w - 2 && b[1] >= 2 && b[3] <= h - 2;
  const free = (b: Box) => inWindow(b) && !obstacles.some((s) => segHitsBox(s, b, 1.5)) && !boxes.some((o) => boxesHit(b, o, 1.5));
  const place = (anchor: XY, t: string, color: string, size: number, prefer: number[], radii = [8, 14, 21, 29, 38]) => {
    const wd = tw(t, size), ht = size + 3;
    for (const r of radii) {
      for (const deg of prefer) {
        const a = (deg * Math.PI) / 180;
        // centre of the box is placed so that the box edge nearest to the anchor sits r pixels away
        const cx = anchor[0] + Math.cos(a) * (r + (wd / 2) * Math.abs(Math.cos(a)));
        const cy = anchor[1] - Math.sin(a) * (r + (ht / 2) * Math.abs(Math.sin(a)));
        const b: Box = [cx - wd / 2, cy - ht / 2, cx + wd / 2, cy + ht / 2];
        if (free(b)) { boxes.push(b); texts.push({ x: cx, y: cy + size * 0.34, t, size, fill: color, anchor: "middle", bold: true }); return; }
      }
    }
    issues.push(`label "${t}" could not be placed without touching something`);
    texts.push({ x: anchor[0] + 10, y: anchor[1] - 10, t, size, fill: color, anchor: "start", bold: true });
  };
  const ring = [45, 135, 315, 225, 90, 0, 180, 270, 20, 160, 340, 200, 70, 110, 250, 290];
  for (const d of dots) if (d.label) place(d.xy, d.label, d.color ?? AXIS, 12.5, ring);
  for (const l of g.lines ?? []) {
    if (!l.label) continue;
    const s = clipLine(l.p, l.q);
    if (!s) continue;
    const anchor: XY = l.at ? pt(l.at) : [s[0] + (s[2] - s[0]) * 0.84, s[1] + (s[3] - s[1]) * 0.84];
    // prefer the two sides of the line
    const ang = (Math.atan2(-(s[3] - s[1]), s[2] - s[0]) * 180) / Math.PI;
    const side = [ang + 90, ang - 90, ang + 60, ang - 60, ang + 120, ang - 120, ang, ang + 180].map((v) => ((v % 360) + 360) % 360);
    place(anchor, l.label, l.color ?? LBLUE, 12, [...side, ...ring]);
  }
  for (const s of g.segs ?? []) {
    if (!s.label) continue;
    const mid: XY = pt([(s.from[0] + s.to[0]) / 2, (s.from[1] + s.to[1]) / 2]);
    const A = pt(s.from), B = pt(s.to);
    const ang = (Math.atan2(-(B[1] - A[1]), B[0] - A[0]) * 180) / Math.PI;
    const side = [ang + 90, ang - 90, ang + 60, ang - 60].map((v) => ((v % 360) + 360) % 360);
    place(mid, s.label, s.color ?? LORANGE, 12, [...side, ...ring], [5, 11, 18, 26]);
  }
  for (const l of g.labels ?? []) place(pt(l.at), l.t, l.color ?? AXIS, 12, ring);

  return { prims, texts, w, h, issues };
}
