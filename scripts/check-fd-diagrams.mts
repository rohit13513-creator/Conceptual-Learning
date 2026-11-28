// Overlap check (and optional PNG pictures) for every Fractions in Disguise diagram.
// Run: npx tsx scripts/check-sol-diagrams.mts [folder for PNG files] [only this id]
import fs from 'node:fs';
import sharp from 'sharp';
import { checkScene, parseMarkup } from '../src/components/sceneKit.ts';
import { FD_DIAGRAMS } from "../src/data/fdDiagrams.ts";
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function txt(it: any) {
  let shift = 0; let kids = '';
  for (const g of parseMarkup(it.t)) { const want = g.kind === 'sub' ? it.size * 0.28 : g.kind === 'sup' ? -it.size * 0.42 : 0; kids += `<tspan dy="${want - shift}"${g.kind === 'n' ? '' : ` font-size="${it.size * 0.7}"`}>${esc(g.s)}</tspan>`; shift = want; }
  return `<text x="${it.x}" y="${it.y}" font-size="${it.size}" font-weight="${it.bold ? 700 : 500}" fill="${it.fill}" text-anchor="${it.anchor}" font-family="Arial">${kids}</text>`;
}
function svg(sc: any) {
  const body = sc.items.map((it: any) => {
    const st = (it.stroke ? `stroke="${it.stroke}" stroke-width="${it.sw ?? 1.6}"` : '') + (it.dash ? ` stroke-dasharray="${it.dash}"` : '');
    switch (it.k) {
      case 'line': return `<line x1="${it.x1}" y1="${it.y1}" x2="${it.x2}" y2="${it.y2}" ${st} stroke-linecap="round"/>`;
      case 'rect': return `<rect x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" rx="${it.rx ?? 0}" fill="${it.fill}" ${st}/>`;
      case 'circle': return `<circle cx="${it.cx}" cy="${it.cy}" r="${it.r}" fill="${it.fill}" ${st}/>`;
      case 'ellipse': return `<ellipse cx="${it.cx}" cy="${it.cy}" rx="${it.rx}" ry="${it.ry}" fill="${it.fill}" ${st}/>`;
      case 'poly': return `<${it.close === false ? 'polyline' : 'polygon'} points="${it.pts.map((p: any) => p.join(',')).join(' ')}" fill="${it.fill}" ${st} stroke-linejoin="round"/>`;
      case 'path': return `<path d="${it.d}" fill="${it.fill}" ${st}/>`;
      case 'text': return txt(it);
    }
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sc.w} ${sc.h}" width="${sc.w * 1.3}" height="${sc.h * 1.3}"><rect width="100%" height="100%" fill="#fff"/>${body}</svg>`;
}
const out = process.argv[2];
const only = process.argv[3];
let bad = 0;
const all: Record<string, () => any> = { ...FD_DIAGRAMS };
const ids = Object.keys(all).filter((i) => !only || i === only);
if (out) fs.mkdirSync(out, { recursive: true });
for (const id of ids) {
  const sc = all[id]();
  const iss = checkScene(sc);
  if (iss.length) { bad++; console.log(id + ': ' + iss.slice(0, 8).join('; ')); }
  if (out) await sharp(Buffer.from(svg(sc))).png().toFile(`${out}/${id}.png`);
}
console.log(ids.length, 'diagrams,', bad, 'with issues');
