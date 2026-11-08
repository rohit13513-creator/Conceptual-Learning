// Overlap checker for the Quadrilaterals figures: no label may touch a line, a point or another label.
// With a second argument (a folder) it also writes a contact sheet of every figure as PNG, so they can be looked at.
import * as F from "../src/data/quad9Figs";
import { layoutFigure } from "../src/components/geoLayout";

const all: Record<string, any> = { ...F };
let bad = 0, n = 0;
const sheet: { name: string; svg: string }[] = [];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
for (const [name, fn] of Object.entries(all)) {
  if (typeof fn !== "function") continue;
  const spec = fn();
  n++;
  const L = layoutFigure(spec);
  if (L.issues.length) { bad++; console.log(name, L.issues); }
  const body = L.prims.map((p: any) => {
    switch (p.k) {
      case "polygon": return `<polygon points="${p.pts}" fill="${p.fill}"/>`;
      case "circle": return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.sw}"/>`;
      case "path": return `<path d="${p.d}" fill="none" stroke="${p.stroke}" stroke-width="${p.sw}"/>`;
      case "line": return `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="${p.stroke}" stroke-width="${p.sw}" ${p.dash ? `stroke-dasharray="${p.dash}"` : ""}/>`;
      case "polyline": return `<polyline points="${p.pts}" fill="none" stroke="${p.stroke}" stroke-width="${p.sw}"/>`;
      case "dot": return `<circle cx="${p.x}" cy="${p.y}" r="2.8" fill="#0f172a"/>`;
    }
    return "";
  }).join("") + L.texts.map((t: any) => `<text x="${t.x}" y="${t.y}" font-size="${t.size}" font-weight="700" fill="${t.fill}" text-anchor="middle" ${t.italic ? 'font-style="italic"' : ""}>${esc(t.t)}</text>`).join("");
  sheet.push({ name, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${L.view.join(" ")}" width="300" height="270"><rect x="${L.view[0]}" y="${L.view[1]}" width="${L.view[2]}" height="${L.view[3]}" fill="#fff"/>${body}</svg>` });
}
console.log(`${n} figures checked, ${bad} with problems`);
const out = process.argv[2];
if (out) {
  const sharp = (await import("sharp")).default;
  const fs = await import("node:fs");
  fs.mkdirSync(out, { recursive: true });
  const per = 12, cols = 4;
  for (let s = 0; s * per < sheet.length; s++) {
    const items = sheet.slice(s * per, (s + 1) * per);
    const comps = [];
    for (let i = 0; i < items.length; i++) {
      const png = await sharp(Buffer.from(items[i].svg)).png().toBuffer();
      const lab = await sharp({ create: { width: 300, height: 22, channels: 3, background: "#e2e8f0" } }).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="22"><text x="6" y="16" font-size="13" font-family="sans-serif">${esc(items[i].name)}</text></svg>`), top: 0, left: 0 }]).png().toBuffer();
      comps.push({ input: png, left: (i % cols) * 304, top: Math.floor(i / cols) * 298 + 22 }, { input: lab, left: (i % cols) * 304, top: Math.floor(i / cols) * 298 });
    }
    const rows = Math.ceil(items.length / cols);
    await sharp({ create: { width: cols * 304, height: rows * 298, channels: 3, background: "#cbd5e1" } }).composite(comps).png().toFile(`${out}/quad-sheet${s}.png`);
  }
  console.log("sheets written to", out);
}
