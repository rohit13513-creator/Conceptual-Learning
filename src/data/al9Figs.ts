import type { GeoSpec } from "../components/GeoFigure";

// Figures for Class IX Maths, The World of Algorithms. Not drawn to scale; they only show the arrangement.

/** Euclid's picture: blocks of size d tile m (8 blocks) and n (5 blocks), so they also tile m - n (3 blocks). */
export const tiles = (cap?: string): GeoSpec => {
  const pts: Record<string, [number, number]> = {};
  const segs: NonNullable<GeoSpec["segs"]> = [];
  const polys: NonNullable<GeoSpec["polys"]> = [];
  const labels: NonNullable<GeoSpec["labels"]> = [];
  const bw = 0.27, x0 = -0.45, h = 0.34;
  const row = (key: string, blocks: number, y: number, name: string, fill: string) => {
    for (let i = 0; i <= blocks; i++) { pts[`_${key}t${i}`] = [x0 + i * bw, y + h]; pts[`_${key}b${i}`] = [x0 + i * bw, y]; segs.push({ p: [`_${key}t${i}`, `_${key}b${i}`], bold: i === 0 || i === blocks }); }
    segs.push({ p: [`_${key}t0`, `_${key}t${blocks}`], bold: true }, { p: [`_${key}b0`, `_${key}b${blocks}`], bold: true });
    polys.push({ p: [`_${key}t0`, `_${key}t${blocks}`, `_${key}b${blocks}`, `_${key}b0`], fill });
    labels.push({ x: x0 - 0.38, y: y + h / 2, t: name });
  };
  row("m", 8, 0.62, "m", "#dbeafe");
  row("n", 5, 0.1, "n", "#dcfce7");
  row("r", 3, -0.42, "m − n", "#fef3c7");
  labels.push({ x: x0 + bw / 2, y: 1.2, t: "d" });
  pts._dtip1 = [x0, 1.04]; pts._dtip2 = [x0 + bw, 1.04];
  segs.push({ p: ["_dtip1", "_dtip2"], bold: true });
  return { noMain: true, w: 340, h: 190, scale: 100, pts, polys, segs, labels, caption: cap };
};
