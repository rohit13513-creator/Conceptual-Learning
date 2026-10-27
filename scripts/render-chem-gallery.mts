// Writes public/_chemgallery.html (temporary preview of the chemistry diagrams). Run: npx tsx scripts/render-chem-gallery.mts [from] [n]
import fs from 'fs';
import { parseMarkup, checkScene } from '../src/components/sceneKit.ts';
import { DIAGRAMS } from '../src/data/carbonDiagrams.ts';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function txt(it: any) {
  let shift = 0; let kids = '';
  for (const g of parseMarkup(it.t)) { const want = g.kind === 'sub' ? it.size * 0.28 : g.kind === 'sup' ? -it.size * 0.42 : 0; kids += `<tspan dy="${want - shift}"${g.kind === 'n' ? '' : ` font-size="${it.size * 0.7}"`}>${esc(g.s)}</tspan>`; shift = want; }
  return `<text x="${it.x}" y="${it.y}" font-size="${it.size}" font-weight="${it.bold ? 700 : 500}" fill="${it.fill}" text-anchor="${it.anchor}" ${it.italic ? 'font-style="italic"' : ''} font-family="Arial">${kids}</text>`;
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
  return `<svg viewBox="0 0 ${sc.w} ${sc.h}" width="${Math.min(sc.w * 1.1, 420)}" style="background:#fff;border-radius:8px">${body}</svg>`;
}
const from = Number(process.argv[2] || 0), n = Number(process.argv[3] || 12);
const ids = Object.keys(DIAGRAMS).slice(from, from + n);
const cells = ids.map((id) => { const sc = DIAGRAMS[id](); const iss = checkScene(sc); return `<div style="display:inline-block;vertical-align:top;margin:6px"><div style="font:700 11px sans-serif;color:${iss.length ? '#b91c1c' : '#334155'}">${id} ${esc(iss.join('; '))}</div>${svg(sc)}<div style="font:700 12px sans-serif;color:#475569;text-align:center;background:#fff">${esc(sc.caption || '')}</div></div>`; }).join('');
fs.writeFileSync('public/_chemgallery.html', `<html><body style="background:#cbd5e1;margin:6px">${cells}<div style="font:700 12px sans-serif">total ${Object.keys(DIAGRAMS).length}</div></body></html>`);
console.log('written', ids.length);
