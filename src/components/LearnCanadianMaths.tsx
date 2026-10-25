import React, { useState } from "react";
import { BarChart3, ChevronLeft, ChevronRight, Lightbulb, HelpCircle, ListChecks, PenLine, CheckCircle2 } from "lucide-react";
import { DownloadNotesLink } from "./DownloadNotesLink";
import { CANADA_DATA_TOPICS, CBlock } from "../data/canadaDataAnalysis";

// Canadian Maths notes: "Data Analysis: Box Plots, Scatter Plots and Trend Lines".

const IMG_BASE = "/diagrams/canada-data/";
const NOTES_PDF_URL = "/Canadian-Maths-Data-Analysis-Notes.pdf";
const NOTES_PDF_NAME = "Canadian-Maths-Data-Analysis-Notes.pdf";

const ICONS: Record<string, React.ElementType> = { Data: BarChart3, Graphs: BarChart3, Models: BarChart3, Exercise: PenLine, Answers: CheckCircle2 };

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

const Pic: React.FC<{ file: string; alt: string; caption: string; light: boolean }> = ({ file, alt, caption, light }) => (
  <figure className="space-y-2 m-0">
    <div className={`rounded-2xl border p-3 shadow-lg bg-white flex items-center justify-center ${light ? "border-slate-200" : "border-slate-700"}`}>
      <img src={IMG_BASE + file + ".webp"} alt={alt} loading="lazy" className="w-auto h-auto max-w-full max-h-[420px] object-contain" />
    </div>
    <figcaption className="text-center text-[13px] font-bold text-slate-500">{caption}</figcaption>
  </figure>
);

const Block: React.FC<{ b: CBlock; light: boolean }> = ({ b, light }) => {
  switch (b.t) {
    case "p": return <p className="text-sm font-semibold leading-relaxed">{md(b.s)}</p>;
    case "h": return <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-cyan-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span>{b.s}</span></div>;
    case "ul": return <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ul>;
    case "ol": return <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-2">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ol>;
    case "table": return <Table head={b.head} rows={b.rows} light={light} />;
    case "img": return <Pic file={b.file} alt={b.alt} caption={b.caption} light={light} />;
    case "note": return (
      <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
        <h5 className="font-bold text-amber-400 text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {b.title}</h5>
        <div className="text-[14px] leading-relaxed">{md(b.s)}</div>
      </div>
    );
    case "ex": return (
      <div className="bg-[#0a1a1f] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-cyan-400" /><h3 className="text-sm font-black uppercase tracking-wider text-cyan-300">{b.title}</h3></div>
        <div className="space-y-3">{b.body.map((x, i) => <Block key={i} b={x} light={light} />)}</div>
      </div>
    );
    case "qs": return (
      <div className="space-y-4">
        {b.items.map((q) => (
          <div key={q.n} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
            <p className="text-sm font-bold leading-relaxed"><span className="text-cyan-400 mr-1.5">{q.n}.</span>{md(q.q)}</p>
            {q.table && <Table head={q.table.head} rows={q.table.rows} light={light} />}
            {q.img && <Pic file={q.img.file} alt={q.img.alt} caption={q.img.caption} light={light} />}
            {q.parts && <ul className="space-y-1.5 pl-1">{q.parts.map((p, i) => <li key={i} className="text-sm font-semibold leading-relaxed">{p}</li>)}</ul>}
          </div>
        ))}
      </div>
    );
  }
};

export function LearnCanadianMaths({ isLightMode = false, onBack }: { isLightMode?: boolean; onBack?: () => void }) {
  const [activeId, setActiveId] = useState<string>(CANADA_DATA_TOPICS[0].id);
  const idx = Math.max(0, CANADA_DATA_TOPICS.findIndex((t) => t.id === activeId));
  const topic = CANADA_DATA_TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;
  const go = (id: string) => { setActiveId(id); document.getElementById("learn-canada-main")?.scrollTo({ top: 0 }); };

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-canada-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center gap-2">
          <select value={activeId} onChange={(e) => go(e.target.value)} className={`flex-1 min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
            {CANADA_DATA_TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <DownloadNotesLink href={NOTES_PDF_URL} fileName={NOTES_PDF_NAME} isLightMode={isLightMode} compact />
        </div>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-cyan-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Data Analysis</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Canadian Maths: box plots, scatter plots and trend lines.</p>
          <DownloadNotesLink href={NOTES_PDF_URL} fileName={NOTES_PDF_NAME} isLightMode={isLightMode} />
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {CANADA_DATA_TOPICS.map((t) => (
            <button key={t.id} onClick={() => go(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-cyan-50 border border-cyan-300" : "bg-cyan-950/40 border border-cyan-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest block ${activeId === t.id ? "text-cyan-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-cyan-900" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-canada-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-canada-main p, #learn-canada-main li, #learn-canada-main span, #learn-canada-main td, #learn-canada-main div:not(.bg-white) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-canada-main th { color: ${isLightMode ? "#ffffff" : "#a5f3fc"}; }
          #learn-canada-main b, #learn-canada-main strong, #learn-canada-main h1, #learn-canada-main h2, #learn-canada-main h3, #learn-canada-main h4, #learn-canada-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-canada-container .bg-slate-900, #learn-canada-container .bg-\\[\\#0a1a1f\\] { background-color: #ffffff !important; border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || ListChecks, { className: "w-3.5 h-3.5" })}{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{topic.heading}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => <Block key={i} b={blk} light={isLightMode} />)}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? <button onClick={() => go(CANADA_DATA_TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button> : <div />}
            {idx < CANADA_DATA_TOPICS.length - 1
              ? <button onClick={() => go(CANADA_DATA_TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
              : onBack && <button onClick={onBack} className={navBtn}>Back to Home<ChevronRight className="w-3 h-3" /></button>}
          </div>
        </div>
      </main>
    </div>
  );
}
