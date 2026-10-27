// Pure layout engine for the circle figures: turns a GeoSpec into drawing primitives and places every
// text label where it touches nothing (no line, no point, no other label). The same function is used by
// the renderer and by the overlap checker, so what the checker approves is exactly what is drawn.

export type GPoint = [number, number] | { a: number; r?: number; c?: [number, number] };

export interface GeoSpec {
  w?: number;
  h?: number;
  scale?: number; // pixels per radius unit (default 78)
  pts: Record<string, GPoint>; // names starting with "_" are helpers: no dot, no label
  circles?: { c?: string | [number, number]; r?: number; dash?: boolean; fill?: string; color?: string }[];
  noMain?: boolean; // do not draw the default circle (centre O at the origin, radius 1)
  polys?: { p: string[]; fill?: string }[];
  segs?: { p: [string, string]; dash?: boolean; bold?: boolean; color?: string; label?: string; ext?: number }[];
  arcs?: { a1: number; a2: number; color?: string; c?: [number, number]; r?: number }[];
  ticks?: { p: [string, string]; n?: number }[];
  rights?: [string, string, string][];
  angs?: { at: string; from: string; to: string; label?: string; r?: number; reflex?: boolean; color?: string }[];
  labels?: { p?: string; x?: number; y?: number; t: string; dx?: number; dy?: number; color?: string; size?: number }[];
  hide?: string[];
  noLabel?: string[];
  labelAway?: string;
  caption?: string;
}

export const INK = "#0f172a";
export const BLUE = "#2563eb";
export const ORANGE = "#ea580c";
export const GREEN = "#15803d";

type Seg = [number, number, number, number];
type Box = [number, number, number, number]; // x0, y0, x1, y1

export type Prim =
  | { k: "polygon"; pts: string; fill: string }
  | { k: "circle"; cx: number; cy: number; r: number; fill: string; stroke: string; sw: number; dash?: string }
  | { k: "path"; d: string; stroke: string; sw: number; cap?: boolean }
  | { k: "line"; x1: number; y1: number; x2: number; y2: number; stroke: string; sw: number; dash?: string }
  | { k: "polyline"; pts: string; stroke: string; sw: number }
  | { k: "dot"; x: number; y: number };

export interface TextItem { x: number; y: number; t: string; size: number; fill: string; italic?: boolean; box: Box; clash: boolean }

export interface Layout {
  prims: Prim[];
  texts: TextItem[];
  view: [number, number, number, number];
  issues: string[];
}

const f1 = (n: number) => n.toFixed(1);
const textWidth = (t: string, size: number, bold = true) => Math.max(size * 0.85, t.length * size * (bold ? 0.68 : 0.6));

// does segment s touch box b (box grown by m)?
function segHitsBox(s: Seg, b: Box, m = 0): boolean {
  const x0 = b[0] - m, y0 = b[1] - m, x1 = b[2] + m, y1 = b[3] + m;
  let [ax, ay, bx, by] = s;
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
const ptInBox = (x: number, y: number, b: Box, m = 0) => x > b[0] - m && x < b[2] + m && y > b[1] - m && y < b[3] + m;

export function layoutFigure(spec: GeoSpec): Layout {
  const w = spec.w ?? 280, h = spec.h ?? 256, S = spec.scale ?? 90;
  const cx = w / 2, cy = h / 2;
  const toXY = (p: GPoint): [number, number] => {
    if (Array.isArray(p)) return [p[0], p[1]];
    const r = p.r ?? 1, c = p.c ?? [0, 0];
    const t = (p.a * Math.PI) / 180;
    return [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
  };
  const P: Record<string, [number, number]> = {};
  for (const [k, v] of Object.entries(spec.pts)) P[k] = toXY(v as GPoint);
  const px = (n: string): [number, number] => { const q = P[n] || [0, 0]; return [cx + q[0] * S, cy - q[1] * S]; };
  const cpx = (c: string | [number, number] | undefined): [number, number] => (typeof c === "string" ? px(c) : c ? [cx + c[0] * S, cy - c[1] * S] : [cx, cy]);
  const away: [number, number] = spec.labelAway ? px(spec.labelAway) : [cx, cy];

  const prims: Prim[] = [];
  const obst: Seg[] = []; // everything a label must stay clear of
  const issues: string[] = [];
  const realSegs: { s: Seg; id: string }[] = [];

  const sampleCircle = (x: number, y: number, r: number, a1 = 0, a2 = 360, n = 72) => {
    const out: Seg[] = [];
    let prev: [number, number] | null = null;
    for (let i = 0; i <= n; i++) {
      const t = ((a1 + ((a2 - a1) * i) / n) * Math.PI) / 180;
      const q: [number, number] = [x + r * Math.cos(t), y - r * Math.sin(t)];
      if (prev) out.push([prev[0], prev[1], q[0], q[1]]);
      prev = q;
    }
    return out;
  };

  (spec.polys || []).forEach((pg) => prims.push({ k: "polygon", pts: pg.p.map((n) => px(n).join(",")).join(" "), fill: pg.fill || "rgba(37,99,235,0.10)" }));

  const circles = [...(spec.noMain ? [] : [{ c: [0, 0] as [number, number], r: 1 } as NonNullable<GeoSpec["circles"]>[number]]), ...(spec.circles || [])];
  circles.forEach((c) => {
    const [x, y] = cpx(c.c as any);
    const r = (c.r ?? 1) * S;
    prims.push({ k: "circle", cx: x, cy: y, r, fill: c.fill || "none", stroke: c.color || INK, sw: 1.6, dash: c.dash ? "4 3" : undefined });
    obst.push(...sampleCircle(x, y, r));
  });

  (spec.arcs || []).forEach((a) => {
    const c = a.c || [0, 0], r = a.r ?? 1;
    const p1 = [cx + (c[0] + r * Math.cos((a.a1 * Math.PI) / 180)) * S, cy - (c[1] + r * Math.sin((a.a1 * Math.PI) / 180)) * S];
    const p2 = [cx + (c[0] + r * Math.cos((a.a2 * Math.PI) / 180)) * S, cy - (c[1] + r * Math.sin((a.a2 * Math.PI) / 180)) * S];
    const span = (((a.a2 - a.a1) % 360) + 360) % 360;
    prims.push({ k: "path", d: `M ${f1(p1[0])} ${f1(p1[1])} A ${f1(r * S)} ${f1(r * S)} 0 ${span > 180 ? 1 : 0} 0 ${f1(p2[0])} ${f1(p2[1])}`, stroke: a.color || ORANGE, sw: 3.4, cap: true });
  });

  (spec.segs || []).forEach((s, i) => {
    let [x1, y1] = px(s.p[0]);
    let [x2, y2] = px(s.p[1]);
    if (s.ext) { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1; x1 -= (dx / L) * s.ext * S; y1 -= (dy / L) * s.ext * S; x2 += (dx / L) * s.ext * S; y2 += (dy / L) * s.ext * S; }
    prims.push({ k: "line", x1, y1, x2, y2, stroke: s.color || (s.bold ? BLUE : INK), sw: s.bold ? 2.4 : 1.5, dash: s.dash ? "5 3" : undefined });
    obst.push([x1, y1, x2, y2]);
    realSegs.push({ s: [x1, y1, x2, y2], id: `${s.p[0]}${s.p[1]}#${i}` });
  });

  (spec.ticks || []).forEach((t) => {
    const [x1, y1] = px(t.p[0]), [x2, y2] = px(t.p[1]);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L, nx = -uy, ny = ux, n = t.n ?? 1;
    for (let i = 0; i < n; i++) {
      const o = (i - (n - 1) / 2) * 5;
      const sg: Seg = [mx + ux * o + nx * 5, my + uy * o + ny * 5, mx + ux * o - nx * 5, my + uy * o - ny * 5];
      prims.push({ k: "line", x1: sg[0], y1: sg[1], x2: sg[2], y2: sg[3], stroke: INK, sw: 1.4 });
      obst.push(sg);
    }
  });

  (spec.rights || []).forEach(([a, v, b]) => {
    const [vx, vy] = px(v), [ax, ay] = px(a), [bx, by] = px(b);
    const l1 = Math.hypot(ax - vx, ay - vy) || 1, l2 = Math.hypot(bx - vx, by - vy) || 1, s = 9;
    const u1: [number, number] = [((ax - vx) / l1) * s, ((ay - vy) / l1) * s], u2: [number, number] = [((bx - vx) / l2) * s, ((by - vy) / l2) * s];
    const q = [[vx + u1[0], vy + u1[1]], [vx + u1[0] + u2[0], vy + u1[1] + u2[1]], [vx + u2[0], vy + u2[1]]];
    prims.push({ k: "polyline", pts: q.map((z) => `${f1(z[0])},${f1(z[1])}`).join(" "), stroke: INK, sw: 1.3 });
    obst.push([q[0][0], q[0][1], q[1][0], q[1][1]], [q[1][0], q[1][1], q[2][0], q[2][1]]);
  });

  const angGeo: { at: string; mid: number; r: number; d: number; vx: number; vy: number }[] = [];
  (spec.angs || []).forEach((g) => {
    const [vx, vy] = px(g.at), [ax, ay] = px(g.from), [bx, by] = px(g.to);
    const r = g.r ?? 22;
    const a1 = Math.atan2(ay - vy, ax - vx), a2 = Math.atan2(by - vy, bx - vx);
    let d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    if (g.reflex) d = d > 0 ? d - 2 * Math.PI : d + 2 * Math.PI;
    const sweep = d > 0 ? 1 : 0, large = Math.abs(d) > Math.PI ? 1 : 0;
    const p1 = [vx + r * Math.cos(a1), vy + r * Math.sin(a1)], p2 = [vx + r * Math.cos(a1 + d), vy + r * Math.sin(a1 + d)];
    prims.push({ k: "path", d: `M ${f1(p1[0])} ${f1(p1[1])} A ${r} ${r} 0 ${large} ${sweep} ${f1(p2[0])} ${f1(p2[1])}`, stroke: g.color || ORANGE, sw: 1.8 });
    const n = 10;
    for (let i = 0; i < n; i++) {
      const t0 = a1 + (d * i) / n, t1 = a1 + (d * (i + 1)) / n;
      obst.push([vx + r * Math.cos(t0), vy + r * Math.sin(t0), vx + r * Math.cos(t1), vy + r * Math.sin(t1)]);
    }
    angGeo.push({ at: g.at, mid: a1 + d / 2, r, d, vx, vy });
  });

  // dots
  const hidden = new Set(spec.hide || []);
  const noName = new Set(spec.noLabel || []);
  const dotPts: [number, number][] = [];
  Object.keys(P).forEach((n) => {
    if (n.startsWith("_")) return;
    const [x, y] = px(n);
    if (!hidden.has(n)) { prims.push({ k: "dot", x, y }); dotPts.push([x, y]); }
  });

  // ── label placement ──
  const texts: TextItem[] = [];
  const placed: Box[] = [];
  const dotBoxes: Box[] = dotPts.map(([x, y]) => [x - 3.5, y - 3.5, x + 3.5, y + 3.5]);

  const cost = (b: Box): number => {
    let c = 0;
    for (const s of obst) if (segHitsBox(s, b, 3)) { c += 100; if (c > 400) break; }
    for (const p of placed) if (boxesHit(b, p, 3)) c += 100;
    for (const d of dotBoxes) if (boxesHit(b, d, 2.5)) c += 100;
    return c;
  };
  const boxAt = (x: number, y: number, tw: number, size: number): Box => [x - tw / 2, y - size * 0.55, x + tw / 2, y + size * 0.5];

  const place = (t: string, size: number, fill: string, cands: { x: number; y: number; pen: number }[], italic = false) => {
    const tw = textWidth(t, size) + 1;
    let best: { x: number; y: number; c: number; b: Box } | null = null;
    for (const c of cands) {
      const b = boxAt(c.x, c.y, tw, size);
      const total = cost(b) + c.pen;
      if (!best || total < best.c) { best = { x: c.x, y: c.y, c: total, b }; if (total < 1) break; }
    }
    if (!best) return;
    const clash = best.c >= 100;
    placed.push(best.b);
    texts.push({ x: best.x, y: best.y + size * 0.3, t, size, fill, italic, box: best.b, clash });
    if (clash) issues.push(`label "${t}" overlaps something`);
  };

  // point names
  Object.keys(P).forEach((n) => {
    if (n.startsWith("_") || noName.has(n)) return;
    const [x, y] = px(n);
    let dx = x - away[0], dy = y - away[1];
    const L = Math.hypot(dx, dy);
    const base = L < 4 ? -Math.PI / 2 : Math.atan2(dy, dx);
    const cands: { x: number; y: number; pen: number }[] = [];
    for (const rad of [11, 14, 18, 23, 29, 36]) {
      for (let k = 0; k < 24; k++) {
        const ang = base + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * (Math.PI / 12);
        const dev = Math.abs(Math.atan2(Math.sin(ang - base), Math.cos(ang - base)));
        cands.push({ x: x + Math.cos(ang) * rad, y: y + Math.sin(ang) * rad, pen: rad * 0.35 + dev * 2 });
      }
    }
    place(n, 13, INK, cands, true);
  });

  // segment labels
  (spec.segs || []).forEach((s) => {
    if (!s.label) return;
    let [x1, y1] = px(s.p[0]);
    let [x2, y2] = px(s.p[1]);
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L, ny = dx / L;
    const cands: { x: number; y: number; pen: number }[] = [];
    const tw = textWidth(s.label, 11.5);
    for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8]) {
      for (const d of [9 + tw / 4, 14 + tw / 3, 20 + tw / 2, 28 + tw / 2]) {
        for (const side of [1, -1]) {
          const mx = x1 + dx * t, my = y1 + dy * t;
          const ox = mx + nx * d * side, oy = my + ny * d * side;
          const outward = (ox - away[0]) ** 2 + (oy - away[1]) ** 2 > (mx - away[0]) ** 2 + (my - away[1]) ** 2 ? 0 : 1.5;
          cands.push({ x: ox, y: oy, pen: Math.abs(t - 0.5) * 6 + d * 0.15 + outward });
        }
      }
    }
    place(s.label, 11.5, s.color || GREEN, cands);
  });

  // angle labels
  (spec.angs || []).forEach((g, i) => {
    if (!g.label) return;
    const geo = angGeo[i];
    const cands: { x: number; y: number; pen: number }[] = [];
    const tw = textWidth(g.label, 11.5);
    const span = Math.abs(geo.d);
    for (const add of [9 + tw / 3, 14 + tw / 2, 20 + tw / 2, 28 + tw / 2, 38 + tw / 2, 50 + tw / 2]) {
      for (const off of [0, 0.2, -0.2, 0.4, -0.4]) {
        const ang = geo.mid + off * span;
        const rr = geo.r + add;
        cands.push({ x: geo.vx + rr * Math.cos(ang), y: geo.vy + rr * Math.sin(ang), pen: add * 0.2 + Math.abs(off) * 4 });
      }
    }
    place(g.label, 11.5, g.color || ORANGE, cands);
  });

  // free labels
  (spec.labels || []).forEach((l) => {
    let x: number, y: number;
    if (l.p) { [x, y] = px(l.p); } else { x = cx + (l.x ?? 0) * S; y = cy - (l.y ?? 0) * S; }
    x += l.dx ?? 0; y += l.dy ?? 0;
    const cands: { x: number; y: number; pen: number }[] = [{ x, y, pen: 0 }];
    for (const rr of [6, 10, 15, 21, 28, 36]) for (let k = 0; k < 16; k++) { const a = (k * Math.PI) / 8; cands.push({ x: x + rr * Math.cos(a), y: y + rr * Math.sin(a), pen: rr * 0.3 }); }
    place(l.t, l.size ?? 12, l.color || ORANGE, cands);
  });

  // ── issue checks ──
  // (a) two lines lying on top of each other
  for (let i = 0; i < realSegs.length; i++) {
    for (let j = i + 1; j < realSegs.length; j++) {
      const a = realSegs[i].s, b = realSegs[j].s;
      const adx = a[2] - a[0], ady = a[3] - a[1], bdx = b[2] - b[0], bdy = b[3] - b[1];
      const la = Math.hypot(adx, ady), lb = Math.hypot(bdx, bdy);
      if (la < 1 || lb < 1) continue;
      const cross = Math.abs(adx * bdy - ady * bdx) / (la * lb);
      if (cross > 0.03) continue;
      const dist = Math.abs((b[0] - a[0]) * ady - (b[1] - a[1]) * adx) / la;
      if (dist > 2) continue;
      const ux = adx / la, uy = ady / la;
      const t1 = (b[0] - a[0]) * ux + (b[1] - a[1]) * uy, t2 = (b[2] - a[0]) * ux + (b[3] - a[1]) * uy;
      const lo = Math.max(0, Math.min(t1, t2)), hi = Math.min(la, Math.max(t1, t2));
      if (hi - lo > 3) issues.push(`lines ${realSegs[i].id} and ${realSegs[j].id} overlap`);
    }
  }
  // (b) two dots too close, or a dot on a label
  const names = Object.keys(P).filter((n) => !n.startsWith("_") && !hidden.has(n));
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
    const a = px(names[i]), b = px(names[j]);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 9) issues.push(`points ${names[i]} and ${names[j]} are too close`);
  }
  // (c0) two lines leaving one point at almost the same angle look like one thick line
  for (let i = 0; i < realSegs.length; i++) for (let j = i + 1; j < realSegs.length; j++) {
    const a = realSegs[i].s, b = realSegs[j].s;
    const ends = [[0, 1], [0, 2], [2, 0], [2, 2]] as const;
    for (const [ia, ib] of ends) {
      if (Math.hypot(a[ia] - b[ib], a[ia + 1] - b[ib + 1]) > 1.5) continue;
      const oa = ia === 0 ? 2 : 0, ob = ib === 0 ? 2 : 0;
      const v1 = [a[oa] - a[ia], a[oa + 1] - a[ia + 1]], v2 = [b[ob] - b[ib], b[ob + 1] - b[ib + 1]];
      const l1 = Math.hypot(v1[0], v1[1]), l2 = Math.hypot(v2[0], v2[1]);
      if (l1 < 1 || l2 < 1) continue;
      const cos = (v1[0] * v2[0] + v1[1] * v2[1]) / (l1 * l2);
      if (cos > Math.cos((9 * Math.PI) / 180)) issues.push(`lines ${realSegs[i].id} and ${realSegs[j].id} leave one point almost on top of each other`);
    }
  }
  // (c) angle arcs crossing a line that does not start at their vertex
  (spec.angs || []).forEach((g, i) => {
    const geo = angGeo[i];
    const n = 10;
    for (let k = 0; k < n; k++) {
      const t0 = geo.mid - geo.d / 2 + (geo.d * k) / n, t1 = geo.mid - geo.d / 2 + (geo.d * (k + 1)) / n;
      const arc: Seg = [geo.vx + geo.r * Math.cos(t0), geo.vy + geo.r * Math.sin(t0), geo.vx + geo.r * Math.cos(t1), geo.vy + geo.r * Math.sin(t1)];
      for (const rs of realSegs) {
        const s = rs.s;
        const touchesVertex = Math.hypot(s[0] - geo.vx, s[1] - geo.vy) < 1.5 || Math.hypot(s[2] - geo.vx, s[3] - geo.vy) < 1.5;
        if (touchesVertex) continue;
        const bx: Box = [Math.min(arc[0], arc[2]) - 0.5, Math.min(arc[1], arc[3]) - 0.5, Math.max(arc[0], arc[2]) + 0.5, Math.max(arc[1], arc[3]) + 0.5];
        if (segHitsBox(s, bx, 0)) { issues.push(`angle mark at ${g.at} crosses line ${rs.id}`); return; }
      }
    }
  });

  // canvas: grow to fit everything
  let x0 = 0, y0 = 0, x1 = w, y1 = h;
  const grow = (x: number, y: number) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
  obst.forEach((s) => { grow(s[0], s[1]); grow(s[2], s[3]); });
  texts.forEach((t) => { grow(t.box[0] - 3, t.box[1] - 3); grow(t.box[2] + 3, t.box[3] + 3); });
  dotPts.forEach(([x, y]) => grow(x, y));
  const m = 5;
  const vx0 = x0 < 0 ? x0 - m : 0, vy0 = y0 < 0 ? y0 - m : 0;
  const vx1 = x1 > w ? x1 + m : w, vy1 = y1 > h ? y1 + m : h;
  return { prims, texts, view: [vx0, vy0, vx1 - vx0, vy1 - vy0], issues };
}

// quick check used when label boxes are tested against the rest of the drawing from outside
export const _internals = { segHitsBox, boxesHit, ptInBox };
