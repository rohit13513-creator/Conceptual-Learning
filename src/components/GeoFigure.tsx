import React from "react";

// A small drawing engine for circle geometry. A figure is described by a plain object (GeoSpec), so the
// same figure can be used in the notes, the solved questions and the question bank without any image.
// Coordinates are in units of the main circle's radius: x to the right, y upwards, circle centre (0, 0).
// A point can be given as [x, y] or as {a: angle in degrees, r?: distance from the centre, default 1}.

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
  arcs?: { a1: number; a2: number; color?: string; c?: [number, number]; r?: number }[]; // highlighted arc of a circle, anticlockwise from a1 to a2
  ticks?: { p: [string, string]; n?: number }[]; // equal-length marks
  rights?: [string, string, string][]; // right angle mark at the middle point
  angs?: { at: string; from: string; to: string; label?: string; r?: number; reflex?: boolean; color?: string }[];
  labels?: { p?: string; x?: number; y?: number; t: string; dx?: number; dy?: number; color?: string; size?: number }[];
  hide?: string[]; // point names to draw without a dot
  noLabel?: string[]; // point names to draw without a name
  labelAway?: string; // name of the point labels are pushed away from (default: centre of the main circle)
  caption?: string;
}

const INK = "#0f172a";
const BLUE = "#2563eb";
const ORANGE = "#ea580c";
const GREEN = "#15803d";

export const GeoFigure: React.FC<{ spec: GeoSpec; max?: number }> = ({ spec, max = 300 }) => {
  const w = spec.w ?? 240, h = spec.h ?? 220, S = spec.scale ?? 78;
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

  const away = spec.labelAway ? px(spec.labelAway) : [cx, cy];
  const f = (n: number) => n.toFixed(1);

  const els: React.ReactNode[] = [];
  let k = 0;
  const add = (e: React.ReactNode) => els.push(<React.Fragment key={k++}>{e}</React.Fragment>);

  (spec.polys || []).forEach((pg) => add(<polygon points={pg.p.map((n) => px(n).join(",")).join(" ")} fill={pg.fill || "rgba(37,99,235,0.10)"} stroke="none" />));

  const circles = [...(spec.noMain ? [] : [{ c: [0, 0] as [number, number], r: 1 }]), ...(spec.circles || [])];
  circles.forEach((c) => {
    const [x, y] = cpx(c.c as any);
    add(<circle cx={x} cy={y} r={(c.r ?? 1) * S} fill={c.fill || "none"} stroke={c.color || INK} strokeWidth={1.6} strokeDasharray={c.dash ? "4 3" : undefined} />);
  });

  (spec.arcs || []).forEach((a) => {
    const c = a.c || [0, 0], r = a.r ?? 1;
    const p1 = [cx + (c[0] + r * Math.cos((a.a1 * Math.PI) / 180)) * S, cy - (c[1] + r * Math.sin((a.a1 * Math.PI) / 180)) * S];
    const p2 = [cx + (c[0] + r * Math.cos((a.a2 * Math.PI) / 180)) * S, cy - (c[1] + r * Math.sin((a.a2 * Math.PI) / 180)) * S];
    let span = (((a.a2 - a.a1) % 360) + 360) % 360;
    add(<path d={`M ${f(p1[0])} ${f(p1[1])} A ${f(r * S)} ${f(r * S)} 0 ${span > 180 ? 1 : 0} 0 ${f(p2[0])} ${f(p2[1])}`} fill="none" stroke={a.color || ORANGE} strokeWidth={3.4} strokeLinecap="round" />);
  });

  (spec.segs || []).forEach((s) => {
    let [x1, y1] = px(s.p[0]);
    let [x2, y2] = px(s.p[1]);
    if (s.ext) { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1; x1 -= (dx / L) * s.ext * S; y1 -= (dy / L) * s.ext * S; x2 += (dx / L) * s.ext * S; y2 += (dy / L) * s.ext * S; }
    add(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.color || (s.bold ? BLUE : INK)} strokeWidth={s.bold ? 2.4 : 1.5} strokeDasharray={s.dash ? "5 3" : undefined} />);
    if (s.label) {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
      let nx = -dy / L, ny = dx / L;
      if ((mx + nx * 10 - away[0]) ** 2 + (my + ny * 10 - away[1]) ** 2 < (mx - away[0]) ** 2 + (my - away[1]) ** 2) { nx = -nx; ny = -ny; }
      add(<text x={mx + nx * 11} y={my + ny * 11 + 4} fontSize={11.5} fontWeight={700} fill={s.color || GREEN} textAnchor="middle">{s.label}</text>);
    }
  });

  (spec.ticks || []).forEach((t) => {
    const [x1, y1] = px(t.p[0]), [x2, y2] = px(t.p[1]);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L, nx = -uy, ny = ux, n = t.n ?? 1;
    for (let i = 0; i < n; i++) {
      const o = (i - (n - 1) / 2) * 5;
      add(<line x1={mx + ux * o + nx * 5} y1={my + uy * o + ny * 5} x2={mx + ux * o - nx * 5} y2={my + uy * o - ny * 5} stroke={INK} strokeWidth={1.4} />);
    }
  });

  (spec.rights || []).forEach(([a, v, b]) => {
    const [vx, vy] = px(v), [ax, ay] = px(a), [bx, by] = px(b);
    const l1 = Math.hypot(ax - vx, ay - vy) || 1, l2 = Math.hypot(bx - vx, by - vy) || 1, s = 9;
    const u1: [number, number] = [((ax - vx) / l1) * s, ((ay - vy) / l1) * s], u2: [number, number] = [((bx - vx) / l2) * s, ((by - vy) / l2) * s];
    add(<polyline points={`${f(vx + u1[0])},${f(vy + u1[1])} ${f(vx + u1[0] + u2[0])},${f(vy + u1[1] + u2[1])} ${f(vx + u2[0])},${f(vy + u2[1])}`} fill="none" stroke={INK} strokeWidth={1.3} />);
  });

  (spec.angs || []).forEach((g) => {
    const [vx, vy] = px(g.at), [ax, ay] = px(g.from), [bx, by] = px(g.to);
    const r = g.r ?? 22;
    let a1 = Math.atan2(ay - vy, ax - vx), a2 = Math.atan2(by - vy, bx - vx);
    let d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    if (g.reflex) d = d > 0 ? d - 2 * Math.PI : d + 2 * Math.PI;
    const sweep = d > 0 ? 1 : 0, large = Math.abs(d) > Math.PI ? 1 : 0;
    const p1 = [vx + r * Math.cos(a1), vy + r * Math.sin(a1)], p2 = [vx + r * Math.cos(a1 + d), vy + r * Math.sin(a1 + d)];
    add(<path d={`M ${f(p1[0])} ${f(p1[1])} A ${r} ${r} 0 ${large} ${sweep} ${f(p2[0])} ${f(p2[1])}`} fill="none" stroke={g.color || ORANGE} strokeWidth={1.8} />);
    if (g.label) {
      const mid = a1 + d / 2, lr = r + 13;
      add(<text x={vx + lr * Math.cos(mid)} y={vy + lr * Math.sin(mid) + 4} fontSize={11.5} fontWeight={700} fill={g.color || ORANGE} textAnchor="middle">{g.label}</text>);
    }
  });

  const hidden = new Set(spec.hide || []);
  const noName = new Set(spec.noLabel || []);
  Object.keys(P).forEach((n) => {
    if (n.startsWith("_")) return;
    const [x, y] = px(n);
    if (!hidden.has(n)) add(<circle cx={x} cy={y} r={2.8} fill={INK} />);
    if (noName.has(n)) return;
    let dx = x - away[0], dy = y - away[1];
    const L = Math.hypot(dx, dy);
    if (L < 4) { dx = 0; dy = -1; } else { dx /= L; dy /= L; }
    add(<text x={x + dx * 13} y={y + dy * 13 + 4.5} fontSize={13} fontWeight={800} fill={INK} textAnchor="middle" fontStyle="italic">{n}</text>);
  });

  (spec.labels || []).forEach((l) => {
    let x: number, y: number;
    if (l.p) { [x, y] = px(l.p); } else { x = cx + (l.x ?? 0) * S; y = cy - (l.y ?? 0) * S; }
    add(<text x={x + (l.dx ?? 0)} y={y + (l.dy ?? 0) + 4} fontSize={l.size ?? 12} fontWeight={700} fill={l.color || ORANGE} textAnchor="middle">{l.t}</text>);
  });

  return (
    <figure className="m-0 inline-block bg-white rounded-xl border border-slate-200 p-2" style={{ maxWidth: max, width: "100%" }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block", background: "#ffffff" }} role="img" aria-label={spec.caption || "Circle figure"}>
        {els}
      </svg>
      {spec.caption && <figcaption className="text-center text-[12px] font-bold mt-1" style={{ color: "#475569" }}>{spec.caption}</figcaption>}
    </figure>
  );
};
