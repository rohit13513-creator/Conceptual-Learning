import React, { useState } from "react";
import { Circle, ChevronLeft, ChevronRight, Lightbulb, HelpCircle, ListChecks, Trophy, Brain, Sigma, CheckCircle2, ShieldCheck } from "lucide-react";
import { GeoFigure, GeoSpec } from "./GeoFigure";
import { CIRCLES9_TOPICS, NBlock } from "../data/circles9Notes";

// Class IX Maths: Circles. Topic-wise notes with proofs, diagrams, a mind map and a Competition Zone.

const ICONS: Record<string, React.ElementType> = {
  Basics: Circle, "Circles through points": Circle, Chords: Sigma, "Arcs and angles": Sigma, "Concyclic points": Sigma,
  "Cyclic quadrilaterals": Sigma, Revision: Brain, "Competition Zone": Trophy,
};

// "**bold**" markers inside a string become bold text
function md(s: string): React.ReactNode {
  return s.split("**").map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : <React.Fragment key={i}>{part}</React.Fragment>));
}

const Table: React.FC<{ head: string[]; rows: string[][]; light: boolean }> = ({ head, rows, light }) => (
  <div className={`overflow-x-auto rounded-xl border ${light ? "border-slate-200" : "border-slate-800"}`}>
    <table className="w-full text-left border-collapse min-w-[420px]">
      <thead>
        <tr className={`text-[12.5px] font-black uppercase tracking-wider ${light ? "bg-slate-800 text-white" : "bg-cyan-950/50 text-cyan-200"}`}>
          {head.map((h, i) => <th key={i} className="px-3 py-2 align-top">{h}</th>)}
        </tr>
      </thead>
      <tbody className={`divide-y ${light ? "divide-slate-200" : "divide-slate-800"}`}>
        {rows.map((r, i) => (
          <tr key={i} className={`text-[14px] font-semibold ${light ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
            {r.map((c, j) => <td key={j} className={`px-3 py-2 align-top ${j === 0 ? "font-black" : ""}`}>{md(c)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Mind map ───────────────────────────────────────────────────────────────────────────────────────────
interface Branch { title: string; color: string; lines: string[] }
const BRANCHES: Branch[] = [
  { title: "1. Circle and parts", color: "#2563eb", lines: ["Centre, radius (all equal)", "Chord, diameter (longest)", "Arc, segment, sector", "Inside / on / outside: d < r, = r, > r"] },
  { title: "2. Symmetry", color: "#0f766e", lines: ["Rotational: every angle", "Reflection: every diameter", "Infinite lines of symmetry", "Diameter = longest chord"] },
  { title: "3. Circles through points", color: "#b45309", lines: ["1 point: infinitely many", "2 points: infinitely many,", "centres on perpendicular bisector", "3 non-collinear: exactly one"] },
  { title: "4. Chords and the centre", color: "#7c3aed", lines: ["Equal chords = equal angles at O", "Perpendicular from O bisects chord", "Equal chords = equal distances", "Longer chord is nearer the centre"] },
  { title: "5. Arcs and angles", color: "#be123c", lines: ["Angle at centre = 2 × angle at circle", "Same segment: angles equal", "Angle in a semicircle = 90°", "Opposite sides of a chord: sum 180°"] },
  { title: "6. Concyclic points", color: "#0369a1", lines: ["Segment subtends equal angles", "at two points on the same side", "= the four points lie on a circle", "Used to prove points concyclic"] },
  { title: "7. Cyclic quadrilateral", color: "#15803d", lines: ["Opposite angles add up to 180°", "Converse is true", "Exterior angle = interior opposite", "Cyclic parallelogram = rectangle"] },
  { title: "8. Key formulas", color: "#a21caf", lines: ["Chord = 2√(r² − d²)", "Right triangle: R = hypotenuse ÷ 2", "Hexagon side = r", "Chord = r: 60°, 30° (major), 150°"] },
];

const MindMap: React.FC = () => {
  const W = 1000, H = 700, bw = 292, bh = 128, cx = W / 2, cy = H / 2;
  const left = BRANCHES.slice(0, 4), right = BRANCHES.slice(4);
  const ys = [8, 182, 356, 530];
  const box = (b: Branch, x: number, y: number, side: "l" | "r", key: number) => {
    const ex = side === "l" ? x + bw : x, ey = y + bh / 2;
    return (
      <g key={key}>
        <path d={`M ${ex} ${ey} C ${(ex + cx) / 2} ${ey}, ${(ex + cx) / 2} ${cy}, ${side === "l" ? cx - 105 : cx + 105} ${cy}`} fill="none" stroke={b.color} strokeWidth={2.4} opacity={0.85} />
        <rect x={x} y={y} width={bw} height={bh} rx={14} fill="#ffffff" stroke={b.color} strokeWidth={2.4} />
        <rect x={x} y={y} width={bw} height={30} rx={14} fill={b.color} />
        <rect x={x} y={y + 16} width={bw} height={14} fill={b.color} />
        <text x={x + 12} y={y + 21} fontSize={15} fontWeight={800} fill="#ffffff">{b.title}</text>
        {b.lines.map((l, i) => <text key={i} x={x + 12} y={y + 54 + i * 21} fontSize={13.5} fontWeight={600} fill="#1e293b">{l}</text>)}
      </g>
    );
  };
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-300 bg-white p-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[820px]" role="img" aria-label="Mind map of the chapter Circles">
        {left.map((b, i) => box(b, 6, ys[i], "l", i))}
        {right.map((b, i) => box(b, W - bw - 6, ys[i], "r", i + 4))}
        <ellipse cx={cx} cy={cy} rx={108} ry={62} fill="#0f172a" />
        <circle cx={cx - 62} cy={cy - 6} r={20} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
        <circle cx={cx - 62} cy={cy - 6} r={2.6} fill="#38bdf8" />
        <line x1={cx - 62} y1={cy - 6} x2={cx - 45} y2={cy - 15} stroke="#38bdf8" strokeWidth={2} />
        <text x={cx + 14} y={cy + 6} textAnchor="middle" fontSize={26} fontWeight={800} fill="#ffffff">Circles</text>
        <text x={cx} y={cy + 36} textAnchor="middle" fontSize={12.5} fontWeight={600} fill="#bae6fd">Class IX Maths</text>
      </svg>
    </div>
  );
};

// ── Blocks ─────────────────────────────────────────────────────────────────────────────────────────────
const Figs: React.FC<{ specs: GeoSpec[] }> = ({ specs }) => (
  <div className="flex flex-wrap justify-center gap-4">{specs.map((s, i) => <GeoFigure key={i} spec={s} />)}</div>
);

const Block: React.FC<{ b: NBlock; light: boolean }> = ({ b, light }) => {
  switch (b.t) {
    case "p": return <p className="text-sm font-semibold leading-relaxed">{md(b.s)}</p>;
    case "h": return <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-cyan-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span>{b.s}</span></div>;
    case "ul": return <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ul>;
    case "ol": return <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-2">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ol>;
    case "table": return <Table head={b.head} rows={b.rows} light={light} />;
    case "fig": return <div className="flex justify-center"><GeoFigure spec={b.spec} max={340} /></div>;
    case "figs": return <Figs specs={b.specs} />;
    case "mindmap": return <MindMap />;
    case "key": return (
      <div className="bg-cyan-950/25 border border-cyan-500/25 p-4 rounded-xl space-y-1.5 font-semibold">
        <h5 className="font-black text-cyan-300 text-[12.5px] uppercase tracking-wider flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> {b.title}</h5>
        <div className="text-[14.5px] leading-relaxed">{md(b.s)}</div>
      </div>
    );
    case "note": return (
      <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
        <h5 className="font-bold text-amber-400 text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {b.title}</h5>
        <div className="text-[14px] leading-relaxed">{md(b.s)}</div>
      </div>
    );
    case "proof": return (
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3.5 shadow-md">
        <div className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><h3 className="text-sm font-black tracking-tight leading-snug">{b.title}</h3></div>
        <p className="text-sm font-semibold leading-relaxed">{md(b.statement)}</p>
        {(b.given || b.show) && (
          <div className="grid sm:grid-cols-2 gap-2.5">
            {b.given && <div className="rounded-lg border border-slate-700/60 p-2.5 text-[13.5px] font-semibold leading-relaxed"><b className="text-emerald-400 uppercase text-[11.5px] tracking-wider block">Given</b>{md(b.given)}</div>}
            {b.show && <div className="rounded-lg border border-slate-700/60 p-2.5 text-[13.5px] font-semibold leading-relaxed"><b className="text-rose-400 uppercase text-[11.5px] tracking-wider block">To prove</b>{md(b.show)}</div>}
          </div>
        )}
        {b.figs && <Figs specs={b.figs} />}
        <div className="space-y-1.5">
          <b className="text-[11.5px] uppercase tracking-wider text-cyan-300 block">Proof</b>
          <div className="space-y-1.5">
            {b.steps.map((st, i) => <p key={i} className="text-[14px] font-semibold leading-relaxed">{md(st)}</p>)}
          </div>
        </div>
        {b.end && <p className="text-sm font-black leading-relaxed border-t border-slate-700/60 pt-2.5">{md(b.end)}</p>}
      </div>
    );
    case "ex": return (
      <div className="bg-[#0a1a1f] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-cyan-400" /><h3 className="text-sm font-black uppercase tracking-wider text-cyan-300">{b.title}</h3></div>
        <p className="text-sm font-bold leading-relaxed">{md(b.q)}</p>
        {b.fig && <div className="flex justify-center"><GeoFigure spec={b.fig} /></div>}
        <ol className="list-decimal pl-5 text-[14px] font-semibold leading-relaxed space-y-1.5">{b.steps.map((st, i) => <li key={i}>{md(st)}</li>)}</ol>
        <p className="text-sm font-black rounded-lg bg-emerald-950/30 border border-emerald-500/25 px-3 py-2">Answer: {md(b.ans)}</p>
      </div>
    );
  }
};

export function LearnCircles9({ isLightMode = false, onCompleteNotes, onBack }: { isLightMode?: boolean; onCompleteNotes?: () => void; onBack?: () => void }) {
  const [activeId, setActiveId] = useState<string>(CIRCLES9_TOPICS[0].id);
  const idx = Math.max(0, CIRCLES9_TOPICS.findIndex((t) => t.id === activeId));
  const topic = CIRCLES9_TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;
  const go = (id: string) => { setActiveId(id); document.getElementById("learn-circles-main")?.scrollTo({ top: 0 }); };
  const Icon = ICONS[topic.category] || ListChecks;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-circles-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => go(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {CIRCLES9_TOPICS.map((t, i) => <option key={t.id} value={t.id}>{i + 1}. {t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Circle className="w-5 h-5 text-cyan-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Circles</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Class IX Maths: topic-wise notes, proofs with diagrams, mind map and Competition Zone.</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {CIRCLES9_TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => go(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-cyan-50 border border-cyan-300" : "bg-cyan-950/40 border border-cyan-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest block ${activeId === t.id ? "text-cyan-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-cyan-900" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{i + 1}. {t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-circles-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-circles-main p, #learn-circles-main li, #learn-circles-main span, #learn-circles-main td, #learn-circles-main div:not(.bg-white) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-circles-main th { color: ${isLightMode ? "#ffffff" : "#a5f3fc"}; }
          #learn-circles-main b, #learn-circles-main strong, #learn-circles-main h1, #learn-circles-main h2, #learn-circles-main h3, #learn-circles-main h4, #learn-circles-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          #learn-circles-main .bg-white, #learn-circles-main .bg-white * { color: inherit; }
          #learn-circles-main figure figcaption { color: #475569; }
          ${isLightMode ? `#learn-circles-container .bg-slate-900, #learn-circles-container .bg-\\[\\#0a1a1f\\] { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-circles-container .bg-cyan-950\\/25 { background-color: #ecfeff !important; } #learn-circles-container .bg-emerald-950\\/30 { background-color: #ecfdf5 !important; } #learn-circles-container .bg-amber-950\\/20 { background-color: #fffbeb !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" />{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{topic.heading}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => <Block key={i} b={blk} light={isLightMode} />)}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? <button onClick={() => go(CIRCLES9_TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button> : <div />}
            {idx < CIRCLES9_TOPICS.length - 1
              ? <button onClick={() => go(CIRCLES9_TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
              : onCompleteNotes
                ? <button onClick={onCompleteNotes} className={navBtn}>Go to Solved Questions<ChevronRight className="w-3 h-3" /></button>
                : onBack && <button onClick={onBack} className={navBtn}>Back to Home<ChevronRight className="w-3 h-3" /></button>}
          </div>
        </div>
      </main>
    </div>
  );
}
