import React, { useState } from "react";
import { FlaskConical, ChevronLeft, ChevronRight, Lightbulb, HelpCircle, ListChecks, ShieldCheck, Beaker, MessageCircleQuestion, Atom, Brain, Droplets, Flame, Trophy } from "lucide-react";
import { DownloadNotesLink } from "./DownloadNotesLink";
import { SceneFigure } from "./SceneFigure";
import { parseMarkup, fm } from "./sceneKit";
import { DIAGRAMS } from "../data/carbonDiagrams";
import { CARBON_A } from "../data/carbonNotesA";
import { CARBON_B } from "../data/carbonNotesB";
import { CARBON_C } from "../data/carbonNotesC";
import { CARBON_D } from "../data/carbonNotesD";
import type { CBlock } from "../data/carbonNotesTypes";

// Class X Chemistry: "Carbon and its Compounds". Simple words, point by point, with clear diagrams.

const TOPICS = [...CARBON_A, ...CARBON_B, ...CARBON_C, ...CARBON_D];
const NOTES_PDF_URL = "/Class-10-Carbon-Compounds-Notes.pdf";
const NOTES_PDF_NAME = "Class-10-Carbon-Compounds-Notes.pdf";

const ICONS: Record<string, React.ElementType> = {
  Carbon: Atom, Bonding: Atom, Allotropes: Atom, Hydrocarbons: FlaskConical, "Series and naming": ListChecks, "Classes of compounds": Beaker,
  "Properties and reactions": Flame, "Important compounds": Droplets, Revision: Brain, "Competition Zone": Trophy,
};

// formulas get subscripts automatically; **bold** makes bold text; _{..} and ^{..} give subscripts and superscripts
function chem(s: string, key: string): React.ReactNode {
  return parseMarkup(fm(s)).map((g, i) => (g.kind === "sub" ? <sub key={key + i}>{g.s}</sub> : g.kind === "sup" ? <sup key={key + i}>{g.s}</sup> : <React.Fragment key={key + i}>{g.s}</React.Fragment>));
}
function rich(s: string): React.ReactNode {
  return s.split("**").map((part, i) => (i % 2 === 1 ? <b key={i}>{chem(part, "b" + i)}</b> : <React.Fragment key={i}>{chem(part, "t" + i)}</React.Fragment>));
}

const Table: React.FC<{ head: string[]; rows: string[][]; light: boolean }> = ({ head, rows, light }) => (
  <div className={`overflow-x-auto rounded-xl border ${light ? "border-slate-200" : "border-slate-800"}`}>
    <table className="w-full text-left border-collapse min-w-[420px]">
      <thead>
        <tr className={`text-[12.5px] font-black uppercase tracking-wider ${light ? "bg-slate-800 text-white" : "bg-emerald-950/50 text-emerald-200"}`}>
          {head.map((h, i) => <th key={i} className="px-3 py-2 align-top">{rich(h)}</th>)}
        </tr>
      </thead>
      <tbody className={`divide-y ${light ? "divide-slate-200" : "divide-slate-800"}`}>
        {rows.map((r, i) => (
          <tr key={i} className={`text-[14px] font-semibold ${light ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
            {r.map((c, j) => <td key={j} className={`px-3 py-2 align-top ${j === 0 ? "font-black" : ""}`}>{rich(c)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Dia: React.FC<{ id: string; max?: number }> = ({ id, max = 480 }) => {
  const f = DIAGRAMS[id];
  const scene = React.useMemo(() => (f ? f() : null), [f]);
  return scene ? <SceneFigure scene={scene} max={max} /> : null;
};

const Block: React.FC<{ b: CBlock; light: boolean }> = ({ b, light }) => {
  switch (b.t) {
    case "p": return <p className="text-sm font-semibold leading-relaxed">{rich(b.s)}</p>;
    case "h": return <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-emerald-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span>{rich(b.s)}</span></div>;
    case "ul": return <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{b.items.map((it, i) => <li key={i}>{rich(it)}</li>)}</ul>;
    case "ol": return <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-2">{b.items.map((it, i) => <li key={i}>{rich(it)}</li>)}</ol>;
    case "table": return <Table head={b.head} rows={b.rows} light={light} />;
    case "dia": return <div className="flex justify-center"><Dia id={b.id} /></div>;
    case "dias": return <div className="flex flex-wrap justify-center gap-4">{b.ids.map((id) => <Dia key={id} id={id} max={b.ids.length > 2 ? 300 : 400} />)}</div>;
    case "mindmap": return <div className="overflow-x-auto"><div className="min-w-[760px]"><Dia id="ch_mindmap" max={1000} /></div></div>;
    case "key": return (
      <div className="bg-emerald-950/25 border border-emerald-500/25 p-4 rounded-xl space-y-1.5 font-semibold">
        <h5 className="font-black text-emerald-300 text-[12.5px] uppercase tracking-wider flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> {b.title}</h5>
        <div className="text-[14.5px] leading-relaxed">{rich(b.s)}</div>
      </div>
    );
    case "note": return (
      <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
        <h5 className="font-bold text-amber-400 text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {b.title}</h5>
        <div className="text-[14px] leading-relaxed">{rich(b.s)}</div>
      </div>
    );
    case "eq": return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 space-y-1.5 overflow-x-auto">
        {b.lines.map((l, i) => <p key={i} className="text-[15px] font-bold leading-relaxed whitespace-nowrap">{rich(l)}</p>)}
      </div>
    );
    case "act": return (
      <div className="bg-[#0a1f14] border border-emerald-500/15 p-5 rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-emerald-400" /><h3 className="text-sm font-black uppercase tracking-wider text-emerald-300">{rich(b.title)}</h3></div>
        <div>
          <b className="text-[11.5px] uppercase tracking-wider text-cyan-300 block mb-1">What to do</b>
          <ol className="list-decimal pl-5 text-[14px] font-semibold leading-relaxed space-y-1">{b.steps.map((s, i) => <li key={i}>{rich(s)}</li>)}</ol>
        </div>
        <div>
          <b className="text-[11.5px] uppercase tracking-wider text-cyan-300 block mb-1">What you see</b>
          <ul className="list-disc pl-5 text-[14px] font-semibold leading-relaxed space-y-1">{b.see.map((s, i) => <li key={i}>{rich(s)}</li>)}</ul>
        </div>
        <div>
          <b className="text-[11.5px] uppercase tracking-wider text-cyan-300 block mb-1">Why it happens</b>
          <ul className="list-disc pl-5 text-[14px] font-semibold leading-relaxed space-y-1">{b.why.map((s, i) => <li key={i}>{rich(s)}</li>)}</ul>
        </div>
      </div>
    );
    case "qa": return (
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center gap-2"><MessageCircleQuestion className="w-5 h-5 text-emerald-400" /><h4 className="text-sm font-black uppercase tracking-wider">{b.title || "Check yourself"}</h4></div>
        {b.items.map(([q, a], i) => (
          <div key={i} className="space-y-1">
            <p className="text-[14px] font-black leading-relaxed">Q. {rich(q)}</p>
            <p className="text-[14px] font-semibold leading-relaxed pl-3 border-l-2 border-emerald-500/50">{rich(a)}</p>
          </div>
        ))}
      </div>
    );
  }
};

export function LearnCarbon10({ isLightMode = false, onBack }: { isLightMode?: boolean; onBack?: () => void }) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;
  const go = (id: string) => { setActiveId(id); document.getElementById("learn-carbon-main")?.scrollTo({ top: 0 }); };
  const Icon = ICONS[topic.category] || ListChecks;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-carbon-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center gap-2">
          <select value={activeId} onChange={(e) => go(e.target.value)} className={`flex-1 min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
            {TOPICS.map((t, i) => <option key={t.id} value={t.id}>{i + 1}. {t.title}</option>)}
          </select>
          <DownloadNotesLink href={NOTES_PDF_URL} fileName={NOTES_PDF_NAME} isLightMode={isLightMode} compact />
        </div>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><FlaskConical className="w-5 h-5 text-emerald-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Carbon and its Compounds</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Class X Chemistry: topic-wise notes with clear diagrams, activities and a mind map.</p>
          <DownloadNotesLink href={NOTES_PDF_URL} fileName={NOTES_PDF_NAME} isLightMode={isLightMode} />
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => go(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-emerald-50 border border-emerald-300" : "bg-emerald-950/40 border border-emerald-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest block ${activeId === t.id ? "text-emerald-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-emerald-900" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{i + 1}. {t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-carbon-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-carbon-main p, #learn-carbon-main li, #learn-carbon-main span, #learn-carbon-main td, #learn-carbon-main div:not(.bg-white) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-carbon-main th { color: ${isLightMode ? "#ffffff" : "#a7f3d0"}; }
          #learn-carbon-main b, #learn-carbon-main strong, #learn-carbon-main h1, #learn-carbon-main h2, #learn-carbon-main h3, #learn-carbon-main h4, #learn-carbon-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          #learn-carbon-main .bg-white, #learn-carbon-main .bg-white * { color: inherit; }
          #learn-carbon-main figure figcaption { color: #475569; }
          ${isLightMode ? `#learn-carbon-container .bg-slate-900, #learn-carbon-container .bg-\\[\\#0a1f14\\] { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-carbon-container .bg-emerald-950\\/25 { background-color: #ecfdf5 !important; } #learn-carbon-container .bg-amber-950\\/20 { background-color: #fffbeb !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" />{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{rich(topic.heading)}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => <Block key={i} b={blk} light={isLightMode} />)}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? <button onClick={() => go(TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button> : <div />}
            {idx < TOPICS.length - 1
              ? <button onClick={() => go(TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
              : onBack && <button onClick={onBack} className={navBtn}>Back to Home<ChevronRight className="w-3 h-3" /></button>}
          </div>
        </div>
      </main>
    </div>
  );
}
