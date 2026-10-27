import React from "react";
import { layoutFigure } from "./geoLayout";
import type { GeoSpec } from "./geoLayout";

// A small drawing engine for circle geometry. A figure is described by a plain object (GeoSpec), so the
// same figure can be used in the notes, the solved questions and the question bank without any image.
// Coordinates are in units of the main circle's radius: x to the right, y upwards, circle centre (0, 0).
// Labels are placed automatically (see geoLayout.ts) so that no text touches a line, a point or another label.

export type { GeoSpec, GPoint } from "./geoLayout";

export const GeoFigure: React.FC<{ spec: GeoSpec; max?: number }> = ({ spec, max = 300 }) => {
  const L = React.useMemo(() => layoutFigure(spec), [spec]);
  return (
    <figure className="m-0 inline-block bg-white rounded-xl border border-slate-200 p-2" style={{ maxWidth: max, width: "100%" }}>
      <svg viewBox={L.view.join(" ")} width="100%" style={{ display: "block", background: "#ffffff" }} role="img" aria-label={spec.caption || "Circle figure"}>
        {L.prims.map((p, i) => {
          switch (p.k) {
            case "polygon": return <polygon key={i} points={p.pts} fill={p.fill} stroke="none" />;
            case "circle": return <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} stroke={p.stroke} strokeWidth={p.sw} strokeDasharray={p.dash} />;
            case "path": return <path key={i} d={p.d} fill="none" stroke={p.stroke} strokeWidth={p.sw} strokeLinecap={p.cap ? "round" : undefined} />;
            case "line": return <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={p.stroke} strokeWidth={p.sw} strokeDasharray={p.dash} />;
            case "polyline": return <polyline key={i} points={p.pts} fill="none" stroke={p.stroke} strokeWidth={p.sw} />;
            case "dot": return <circle key={i} cx={p.x} cy={p.y} r={2.8} fill="#0f172a" />;
          }
        })}
        {L.texts.map((t, i) => (
          <text key={"t" + i} x={t.x} y={t.y} fontSize={t.size} fontWeight={t.italic ? 800 : 700} fill={t.fill} textAnchor="middle" fontStyle={t.italic ? "italic" : undefined}>{t.t}</text>
        ))}
      </svg>
      {spec.caption && <figcaption className="text-center text-[12px] font-bold mt-1" style={{ color: "#475569" }}>{spec.caption}</figcaption>}
    </figure>
  );
};
