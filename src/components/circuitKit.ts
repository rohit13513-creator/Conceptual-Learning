import { SceneBuilder, C } from "./sceneKit";
import type { Scene, Pt } from "./sceneKit";

// Circuit pictures for Class X Physics, "Electricity". A circuit is a Scene (see sceneKit.ts), so the overlap checker covers it.
// Every part (resistor, cell, bulb, meter, key ...) is drawn ON a wire: give the two ends of the wire piece and the part is put in the
// middle (or at fraction `at` of the way), with the wire joined to it on both sides.

export type Side = "above" | "below" | "left" | "right";
const INK = C.ink;

interface Frame { ux: number; uy: number; nx: number; ny: number; mx: number; my: number }

export class Circuit {
  sb: SceneBuilder;
  constructor(public w: number, public h: number, caption?: string) { this.sb = new SceneBuilder(w, h, caption); }
  build(): Scene { return this.sb.build(); }

  /** plain wire through the points */
  wire(...pts: Pt[]) { for (let i = 0; i + 1 < pts.length; i++) this.sb.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { sw: 1.8 }); return this; }
  dot(x: number, y: number) { this.sb.circle(x, y, 3.2, { fill: INK }); return this; }
  text(x: number, y: number, t: string, o: { size?: number; fill?: string; anchor?: "start" | "middle" | "end"; bold?: boolean } = {}) { this.sb.text(x, y, t, { size: o.size ?? 13, fill: o.fill, anchor: o.anchor, bold: o.bold }); return this; }

  /** label placed beside a point; `d` is the distance from the point */
  label(x: number, y: number, t: string, side: Side, d = 17, o: { size?: number; fill?: string } = {}) {
    const size = o.size ?? 13;
    if (side === "above") this.sb.text(x, y - d + 3, t, { size, fill: o.fill });
    else if (side === "below") this.sb.text(x, y + d + 4, t, { size, fill: o.fill });
    else if (side === "left") this.sb.text(x - d, y + 4.5, t, { size, anchor: "end", fill: o.fill });
    else this.sb.text(x + d, y + 4.5, t, { size, anchor: "start", fill: o.fill });
    return this;
  }

  private frame(x1: number, y1: number, x2: number, y2: number, len: number, at = 0.5): Frame & { ax: number; ay: number; bx: number; by: number } {
    const L = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const mx = x1 + (x2 - x1) * at, my = y1 + (y2 - y1) * at;
    const ax = mx - ux * len / 2, ay = my - uy * len / 2, bx = mx + ux * len / 2, by = my + uy * len / 2;
    this.wire([x1, y1], [ax, ay]);
    this.wire([bx, by], [x2, y2]);
    return { ux, uy, nx: -uy, ny: ux, mx, my, ax, ay, bx, by };
  }

  /** a resistor (zigzag) */
  res(x1: number, y1: number, x2: number, y2: number, o: { len?: number; at?: number; amp?: number } = {}) {
    const f = this.frame(x1, y1, x2, y2, o.len ?? 46, o.at);
    const len = o.len ?? 46, amp = o.amp ?? 7;
    const pts: Pt[] = [[f.ax, f.ay]];
    for (let i = 0; i < 6; i++) {
      const t = (i + 0.5) / 6, s = i % 2 === 0 ? 1 : -1;
      pts.push([f.ax + f.ux * len * t + f.nx * amp * s, f.ay + f.uy * len * t + f.ny * amp * s]);
    }
    pts.push([f.bx, f.by]);
    this.sb.poly(pts, { close: false, sw: 1.8 });
    return { mx: f.mx, my: f.my };
  }

  /** a resistor shown as a plain box (used where the zigzag is too tall) */
  resBox(x1: number, y1: number, x2: number, y2: number, o: { len?: number; at?: number; thick?: number } = {}) {
    const f = this.frame(x1, y1, x2, y2, o.len ?? 40, o.at);
    const len = o.len ?? 40, th = o.thick ?? 12;
    const pts: Pt[] = [
      [f.ax + f.nx * th / 2, f.ay + f.ny * th / 2], [f.bx + f.nx * th / 2, f.by + f.ny * th / 2],
      [f.bx - f.nx * th / 2, f.by - f.ny * th / 2], [f.ax - f.nx * th / 2, f.ay - f.ny * th / 2],
    ];
    void len;
    this.sb.poly(pts, { close: true, sw: 1.8, fill: "#ffffff" });
    return { mx: f.mx, my: f.my };
  }

  /** an electric cell: the long thin line is the positive terminal. pos says on which end of the piece it is (start = first point) */
  cell(x1: number, y1: number, x2: number, y2: number, o: { pos?: "start" | "end"; at?: number } = {}) {
    const f = this.frame(x1, y1, x2, y2, 8, o.at);
    const sgn = (o.pos ?? "start") === "start" ? -1 : 1;
    const lx = f.mx + f.ux * 4 * sgn, ly = f.my + f.uy * 4 * sgn;
    const sx = f.mx - f.ux * 4 * sgn, sy = f.my - f.uy * 4 * sgn;
    this.sb.line(lx - f.nx * 13, ly - f.ny * 13, lx + f.nx * 13, ly + f.ny * 13, { sw: 1.8 });
    this.sb.line(sx - f.nx * 7, sy - f.ny * 7, sx + f.nx * 7, sy + f.ny * 7, { sw: 4.6 });
    return { mx: f.mx, my: f.my };
  }

  /** a battery of n cells joined one after another; the positive end is on `pos` */
  battery(x1: number, y1: number, x2: number, y2: number, n: number, o: { pos?: "start" | "end"; at?: number } = {}) {
    const gap = 8, total = n * 2 * gap;
    const f = this.frame(x1, y1, x2, y2, total - gap, o.at);
    const sgn = (o.pos ?? "start") === "start" ? 1 : -1;
    for (let i = 0; i < n * 2; i++) {
      const t = (-(n * 2 - 1) / 2 + i) * gap * sgn;
      const px = f.mx + f.ux * t, py = f.my + f.uy * t;
      const long = i % 2 === 0;
      const h = long ? 13 : 7;
      this.sb.line(px - f.nx * h, py - f.ny * h, px + f.nx * h, py + f.ny * h, { sw: long ? 1.8 : 4.6 });
    }
    return { mx: f.mx, my: f.my };
  }

  /** an electric bulb (a circle with a cross) */
  bulb(x1: number, y1: number, x2: number, y2: number, o: { at?: number; r?: number } = {}) {
    const r = o.r ?? 13;
    const f = this.frame(x1, y1, x2, y2, r * 2, o.at);
    this.sb.circle(f.mx, f.my, r, { fill: "#fef9c3", stroke: INK, sw: 1.8 });
    const k = r * 0.7071;
    this.sb.line(f.mx - k, f.my - k, f.mx + k, f.my + k, { sw: 1.6 });
    this.sb.line(f.mx - k, f.my + k, f.mx + k, f.my - k, { sw: 1.6 });
    return { mx: f.mx, my: f.my };
  }

  /** a meter: letter A, V or G inside a circle */
  meter(x1: number, y1: number, x2: number, y2: number, letter: string, o: { at?: number } = {}) {
    const r = 14;
    const f = this.frame(x1, y1, x2, y2, r * 2, o.at);
    this.sb.circle(f.mx, f.my, r, { fill: "#ffffff", stroke: INK, sw: 1.8 });
    this.sb.text(f.mx, f.my + 4.6, letter, { size: 13 });
    return { mx: f.mx, my: f.my };
  }

  /** a plug key (switch): open = the lever is raised */
  key(x1: number, y1: number, x2: number, y2: number, o: { open?: boolean; at?: number } = {}) {
    const f = this.frame(x1, y1, x2, y2, 30, o.at);
    this.sb.circle(f.ax, f.ay, 2.6, { fill: INK });
    this.sb.circle(f.bx, f.by, 2.6, { fill: INK });
    if (o.open) {
      const c = Math.cos(0.5), s = Math.sin(0.5), len = 28;
      this.sb.line(f.ax, f.ay, f.ax + (f.ux * c - f.nx * s) * len, f.ay + (f.uy * c - f.ny * s) * len, { sw: 1.8 });
    } else {
      this.sb.line(f.ax, f.ay, f.bx, f.by, { sw: 1.8 });
    }
    return { mx: f.mx, my: f.my };
  }

  /** a variable resistance (rheostat): a resistor with an arrow across it */
  rheostat(x1: number, y1: number, x2: number, y2: number, o: { at?: number; len?: number } = {}) {
    const len = o.len ?? 50;
    const f = this.frame(x1, y1, x2, y2, len, o.at);
    const pts: Pt[] = [[f.ax, f.ay]];
    for (let i = 0; i < 6; i++) {
      const t = (i + 0.5) / 6, s = i % 2 === 0 ? 1 : -1;
      pts.push([f.ax + f.ux * len * t + f.nx * 6 * s, f.ay + f.uy * len * t + f.ny * 6 * s]);
    }
    pts.push([f.bx, f.by]);
    this.sb.poly(pts, { close: false, sw: 1.8 });
    this.sb.arrow(f.mx - f.ux * 20 - f.nx * 15, f.my - f.uy * 20 - f.ny * 15, f.mx + f.ux * 20 + f.nx * 15, f.my + f.uy * 20 + f.ny * 15, { sw: 1.6 });
    return { mx: f.mx, my: f.my };
  }

  /** a fuse: a small box with a line through it */
  fuse(x1: number, y1: number, x2: number, y2: number, o: { at?: number } = {}) {
    const f = this.frame(x1, y1, x2, y2, 34, o.at);
    const pts: Pt[] = [
      [f.ax + f.nx * 6, f.ay + f.ny * 6], [f.bx + f.nx * 6, f.by + f.ny * 6],
      [f.bx - f.nx * 6, f.by - f.ny * 6], [f.ax - f.nx * 6, f.ay - f.ny * 6],
    ];
    this.sb.poly(pts, { close: true, sw: 1.8, fill: "#ffffff" });
    this.sb.line(f.ax, f.ay, f.bx, f.by, { sw: 1.8 });
    return { mx: f.mx, my: f.my };
  }

  /** the earth symbol hanging below the point (x, y) */
  earth(x: number, y: number) {
    this.sb.line(x, y, x, y + 12, { sw: 1.8 });
    this.sb.line(x - 13, y + 12, x + 13, y + 12, { sw: 1.8 });
    this.sb.line(x - 8, y + 17, x + 8, y + 17, { sw: 1.8 });
    this.sb.line(x - 3, y + 22, x + 3, y + 22, { sw: 1.8 });
    return this;
  }

  /** an arrow showing the direction of the current, drawn beside the wire */
  flow(x1: number, y1: number, x2: number, y2: number, o: { stroke?: string } = {}) {
    this.sb.arrow(x1, y1, x2, y2, { stroke: o.stroke ?? C.red, sw: 2 });
    return this;
  }
}

/** simple axes with ticks for graphs; returns helper functions that turn data into picture coordinates */
export function axes(sb: SceneBuilder, x0: number, y0: number, wpx: number, hpx: number, xmax: number, ymax: number, o: { xtick: number; ytick: number; xlabel: string; ylabel: string; grid?: boolean }) {
  const X = (v: number) => x0 + (v / xmax) * wpx;
  const Y = (v: number) => y0 - (v / ymax) * hpx;
  if (o.grid) {
    for (let v = o.xtick; v <= xmax + 1e-9; v += o.xtick) sb.line(X(v), y0, X(v), Y(ymax), { stroke: "#e2e8f0", sw: 1, decor: true });
    for (let v = o.ytick; v <= ymax + 1e-9; v += o.ytick) sb.line(x0, Y(v), X(xmax), Y(v), { stroke: "#e2e8f0", sw: 1, decor: true });
  }
  sb.arrow(x0, y0, X(xmax) + 14, y0, { sw: 1.8 });
  sb.arrow(x0, y0, x0, Y(ymax) - 14, { sw: 1.8 });
  for (let v = o.xtick; v <= xmax + 1e-9; v += o.xtick) { sb.line(X(v), y0, X(v), y0 + 5, { sw: 1.4 }); sb.text(X(v), y0 + 19, String(+v.toFixed(2)), { size: 12, bold: false }); }
  for (let v = o.ytick; v <= ymax + 1e-9; v += o.ytick) { sb.line(x0 - 5, Y(v), x0, Y(v), { sw: 1.4 }); sb.text(x0 - 9, Y(v) + 4, String(+v.toFixed(2)), { size: 12, bold: false, anchor: "end" }); }
  sb.text(X(xmax) + 6, y0 + 36, o.xlabel, { size: 13, anchor: "end" });
  sb.text(x0 - 10, Y(ymax) - 20, o.ylabel, { size: 13, anchor: "start" });
  sb.text(x0 - 8, y0 + 17, "0", { size: 12, anchor: "end", bold: false });
  return { X, Y };
}
