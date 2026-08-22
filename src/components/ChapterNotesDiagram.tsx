import React from 'react';

// Mirrors the shape/palette contract in server.ts (buildDiagramSvg, DIAGRAM_PALETTE) -- the same
// spec that was rasterized and vision-checked server-side is rendered here as real SVG, so what
// got QA'd is provably what students see, not two independently-drifting renderers.
export type DiagramShape =
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number; role: string; dashed?: boolean }
  | { type: 'arrow'; x1: number; y1: number; x2: number; y2: number; role: string }
  | { type: 'circle'; cx: number; cy: number; r: number; role: string; filled?: boolean }
  | { type: 'rect'; x: number; y: number; w: number; h: number; role: string; filled?: boolean }
  | { type: 'polygon'; points: string; role: string; filled?: boolean }
  | { type: 'text'; x: number; y: number; text: string; role: string; anchor?: 'start' | 'middle' | 'end'; size?: number };

export interface DiagramSpec {
  id: string;
  caption: string;
  viewBoxW: number;
  viewBoxH: number;
  shapes: DiagramShape[];
}

const DIAGRAM_PALETTE: Record<string, [string, string]> = {
  background: ['#ffffff', '#0b101d'],
  axis: ['#64748b', '#475569'],
  outline: ['#334155', '#f1f5f9'],
  fillPrimary: ['#0369a1', '#38bdf8'],
  fillSecondary: ['#b45309', '#fbbf24'],
  ray: ['#059669', '#34d399'],
  label: ['#1e293b', '#e2e8f0'],
  title: ['#0f172a', '#f8fafc'],
};

function paletteColor(role: string, isLightMode: boolean): string {
  const pair = DIAGRAM_PALETTE[role] || DIAGRAM_PALETTE.outline;
  return isLightMode ? pair[0] : pair[1];
}

function arrowHeadPoints(x1: number, y1: number, x2: number, y2: number): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const p1x = x2 - size * Math.cos(angle - Math.PI / 7);
  const p1y = y2 - size * Math.sin(angle - Math.PI / 7);
  const p2x = x2 - size * Math.cos(angle + Math.PI / 7);
  const p2y = y2 - size * Math.sin(angle + Math.PI / 7);
  return `${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`;
}

export default function ChapterNotesDiagram({ spec, isLightMode }: { spec: DiagramSpec; isLightMode: boolean }) {
  const bg = paletteColor('background', isLightMode);
  return (
    <div className={`rounded-xl border overflow-hidden ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
      <svg viewBox={`0 0 ${spec.viewBoxW} ${spec.viewBoxH}`} width="100%" style={{ display: 'block', background: bg }}>
        {spec.shapes.map((s, i) => {
          const color = paletteColor(s.role, isLightMode);
          if (s.type === 'line') {
            return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={color} strokeWidth={2} strokeDasharray={s.dashed ? '6,4' : undefined} />;
          }
          if (s.type === 'arrow') {
            return (
              <g key={i}>
                <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={color} strokeWidth={2} />
                <polygon points={arrowHeadPoints(s.x1, s.y1, s.x2, s.y2)} fill={color} />
              </g>
            );
          }
          if (s.type === 'circle') {
            return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} stroke={color} strokeWidth={2} fill={s.filled ? color : 'none'} />;
          }
          if (s.type === 'rect') {
            return <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} stroke={color} strokeWidth={2} fill={s.filled ? color : 'none'} />;
          }
          if (s.type === 'polygon') {
            return <polygon key={i} points={s.points} stroke={color} strokeWidth={2} fill={s.filled ? color : 'none'} />;
          }
          if (s.type === 'text') {
            return (
              <text key={i} x={s.x} y={s.y} fontSize={s.size || 13} fill={color} textAnchor={s.anchor || 'start'} fontFamily="Arial, sans-serif">
                {s.text}
              </text>
            );
          }
          return null;
        })}
      </svg>
      {spec.caption && (
        <p className={`text-[10px] text-center py-1.5 font-semibold ${isLightMode ? 'text-slate-500 bg-slate-50' : 'text-slate-400 bg-slate-900/60'}`}>{spec.caption}</p>
      )}
    </div>
  );
}
