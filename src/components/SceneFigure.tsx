import React from "react";
import { Scene, Item, parseMarkup } from "./sceneKit";

// Draws a Scene (see sceneKit.ts). Every figure sits on a white card so it reads well in light and dark themes.

const Txt: React.FC<{ it: Extract<Item, { k: "text" }> }> = ({ it }) => {
  const segs = parseMarkup(it.t);
  const kids: React.ReactNode[] = [];
  let shift = 0;
  segs.forEach((g, i) => {
    const want = g.kind === "sub" ? it.size * 0.28 : g.kind === "sup" ? -it.size * 0.42 : 0;
    kids.push(<tspan key={i} dy={want - shift} fontSize={g.kind === "n" ? undefined : it.size * 0.7}>{g.s}</tspan>);
    shift = want;
  });
  return <text x={it.x} y={it.y} fontSize={it.size} fontWeight={it.bold ? 700 : 500} fill={it.fill} textAnchor={it.anchor} fontStyle={it.italic ? "italic" : undefined} fontFamily="Inter, Arial, sans-serif">{kids}</text>;
};

export const SceneFigure: React.FC<{ scene: Scene; max?: number }> = ({ scene, max = 460 }) => (
  <figure className="m-0 inline-block bg-white rounded-xl border border-slate-200 p-2" style={{ maxWidth: Math.min(max, scene.w * 1.25 + 18), width: "100%" }}>
    <svg viewBox={`0 0 ${scene.w} ${scene.h}`} width="100%" style={{ display: "block", background: "#ffffff" }} role="img" aria-label={scene.caption || "Diagram"}>
      {scene.items.map((it, i) => {
        switch (it.k) {
          case "line": return <line key={i} x1={it.x1} y1={it.y1} x2={it.x2} y2={it.y2} stroke={it.stroke} strokeWidth={it.sw} strokeDasharray={it.dash} strokeLinecap="round" />;
          case "rect": return <rect key={i} x={it.x} y={it.y} width={it.w} height={it.h} rx={it.rx} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} strokeDasharray={it.dash} />;
          case "circle": return <circle key={i} cx={it.cx} cy={it.cy} r={it.r} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} strokeDasharray={it.dash} />;
          case "ellipse": return <ellipse key={i} cx={it.cx} cy={it.cy} rx={it.rx} ry={it.ry} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} />;
          case "poly": return it.close === false
            ? <polyline key={i} points={it.pts.map((p) => p.join(",")).join(" ")} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} strokeDasharray={it.dash} strokeLinejoin="round" />
            : <polygon key={i} points={it.pts.map((p) => p.join(",")).join(" ")} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} strokeDasharray={it.dash} strokeLinejoin="round" />;
          case "path": return <path key={i} d={it.d} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw} strokeDasharray={it.dash} strokeLinecap="round" />;
          case "text": return <Txt key={i} it={it} />;
        }
      })}
    </svg>
    {scene.caption && <figcaption className="text-center text-[12.5px] font-bold mt-1" style={{ color: "#475569" }}>{scene.caption}</figcaption>}
  </figure>
);
