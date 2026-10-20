import React, { useState } from "react";
import { Award, HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Sprout, Network, Trophy, Lightbulb, Globe2, Layers, Dna, PawPrint } from "lucide-react";
import { ClassificationTimelineDiagram, FiveKingdomKeyDiagram, PlantClassesDiagram, AnimalTreeDiagram, HierarchyLadderDiagram, DiversityMindMap } from "./diversity9Diagrams";
import { Block, Pic, SvgKey, Topic } from "./diversity9Types";
import { TOPICS_A } from "./diversity9TopicsA";
import { TOPICS_B } from "./diversity9TopicsB";
import { TOPICS_C } from "./diversity9TopicsC";
import { TOPICS_D } from "./diversity9TopicsD";

// Lesson: "Patterns in Life: Diversity and Classification". Simple words, short sentences, point by point.

const IMG_BASE = "/diagrams/diversity9/";
const TOPICS: Topic[] = [...TOPICS_A, ...TOPICS_B, ...TOPICS_C, ...TOPICS_D];

const ICONS: Record<string, React.ElementType> = {
  Biodiversity: Globe2, Classification: Layers, Kingdoms: Dna, "Plant Kingdom": Sprout, "Animal Kingdom": PawPrint,
  "Naming and Levels": Layers, Revision: Network, Advanced: Award, Complete: Trophy,
};

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0a1f14] border border-green-500/15 p-5 rounded-2xl space-y-3 shadow-md">
    <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-green-400" /><h3 className="text-sm font-black uppercase tracking-wider text-green-300 font-mono">{title}</h3></div>
    <div className="space-y-3 text-sm font-semibold leading-relaxed text-slate-300">{children}</div>
  </div>
);
const RememberBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {title}</h5>
    <div className="text-[14px] leading-relaxed">{children}</div>
  </div>
);
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-green-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /><span>{children}</span></div>
);
const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sm text-slate-300 font-semibold"><span className="text-white font-black">{label}:</span> <span>{children}</span></div>
);
const CompareTable: React.FC<{ left: string; right: string; rows: [string, string][]; isLightMode: boolean }> = ({ left, right, rows, isLightMode }) => (
  <div className={`overflow-hidden rounded-xl border ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
    <div className={`grid grid-cols-2 text-[12.5px] font-black uppercase tracking-wider ${isLightMode ? "bg-slate-800 text-white" : "bg-green-950/50 text-green-300"}`}>
      <div className="px-3 py-2 border-r border-slate-700/50">{left}</div><div className="px-3 py-2">{right}</div>
    </div>
    <div className={`divide-y ${isLightMode ? "divide-slate-200" : "divide-slate-800"}`}>
      {rows.map(([l, r], i) => (
        <div key={i} className={`grid grid-cols-2 text-[14px] font-semibold ${isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
          <div className={`px-3 py-2 border-r ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>{l}</div><div className="px-3 py-2">{r}</div>
        </div>
      ))}
    </div>
  </div>
);
const DataTable: React.FC<{ head: string[]; rows: string[][]; isLightMode: boolean }> = ({ head, rows, isLightMode }) => (
  <div className={`overflow-x-auto rounded-xl border ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
    <table className="w-full text-left border-collapse min-w-[520px]">
      <thead>
        <tr className={`text-[12.5px] font-black uppercase tracking-wider ${isLightMode ? "bg-slate-800 text-white" : "bg-green-950/50 text-green-300"}`}>
          {head.map((h, i) => <th key={i} className="px-3 py-2 align-top">{h}</th>)}
        </tr>
      </thead>
      <tbody className={`divide-y ${isLightMode ? "divide-slate-200" : "divide-slate-800"}`}>
        {rows.map((r, i) => (
          <tr key={i} className={`text-[14px] font-semibold ${isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
            {r.map((c, j) => <td key={j} className={`px-3 py-2 align-top ${j === 0 ? "font-black" : ""}`}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const PicCard: React.FC<{ pic: Pic; isLightMode: boolean }> = ({ pic, isLightMode }) => (
  <figure className="space-y-2 m-0">
    <div className={`rounded-2xl border p-3 shadow-lg bg-white flex items-center justify-center ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
      <img src={IMG_BASE + pic.file + ".webp"} alt={pic.alt} loading="lazy" className="w-auto h-auto max-w-full max-h-[460px] object-contain" />
    </div>
    <figcaption className="text-center text-[13px] font-bold text-slate-500">{pic.caption}</figcaption>
  </figure>
);
const SpeciesList: React.FC<{ title?: string; items: [string, string][]; isLightMode: boolean }> = ({ title, items, isLightMode }) => (
  <div className={`rounded-2xl border p-4 space-y-2.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900/60 border-slate-800"}`}>
    <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-teal-300 font-mono"><PawPrint className="w-3.5 h-3.5" />{title || "About the species"}</div>
    <ul className="space-y-2">
      {items.map(([n, t], i) => (
        <li key={i} className="text-[14px] font-semibold leading-relaxed"><b>{n}.</b> {t}</li>
      ))}
    </ul>
  </div>
);
const ExampleQ: React.FC<{ n: number; q: string; a: string }> = ({ n, q, a }) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
    <p className="text-sm font-bold leading-relaxed"><span className="text-green-400 font-mono">Q{n}.</span> {q}</p>
    <p className="text-sm font-semibold leading-relaxed"><span className="text-emerald-400 font-black">Answer: </span>{a}</p>
  </div>
);

function renderSvg(key: SvgKey) {
  switch (key) {
    case "timeline": return <ClassificationTimelineDiagram />;
    case "kingdom-key": return <FiveKingdomKeyDiagram />;
    case "plant-classes": return <PlantClassesDiagram />;
    case "animal-tree": return <AnimalTreeDiagram />;
    case "ladder": return <HierarchyLadderDiagram />;
    case "mind": return <DiversityMindMap />;
  }
}

function renderBlock(block: Block, i: number, isLightMode: boolean) {
  switch (block.t) {
    case "card": return <InfoCard key={i} title={block.title}>{block.body.map((p, j) => <p key={j}>{p}</p>)}</InfoCard>;
    case "h": return <SectionHeading key={i}>{block.text}</SectionHeading>;
    case "p": return <p key={i} className="text-sm font-semibold leading-relaxed">{block.body}</p>;
    case "ul": return <ul key={i} className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    case "facts": return <div key={i} className="grid grid-cols-1 gap-2.5">{block.rows.map(([l, r], j) => <FactRow key={j} label={l}>{r}</FactRow>)}</div>;
    case "compare": return <CompareTable key={i} left={block.left} right={block.right} rows={block.rows} isLightMode={isLightMode} />;
    case "table": return <DataTable key={i} head={block.head} rows={block.rows} isLightMode={isLightMode} />;
    case "remember": return <RememberBox key={i} title={block.title}>{block.body}</RememberBox>;
    case "img": return <PicCard key={i} pic={block.pic} isLightMode={isLightMode} />;
    case "imgs": return <div key={i} className={`grid grid-cols-1 gap-4 ${block.pics.length > 1 ? "sm:grid-cols-2" : ""}`}>{block.pics.map((p) => <PicCard key={p.file} pic={p} isLightMode={isLightMode} />)}</div>;
    case "species": return <SpeciesList key={i} title={block.title} items={block.items} isLightMode={isLightMode} />;
    case "exq": return <ExampleQ key={i} n={block.n} q={block.q} a={block.a} />;
    case "svg": return (
      <figure key={i} className="space-y-2 m-0">
        <div className={`rounded-2xl border p-3 shadow-lg bg-white overflow-x-auto ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
          <div className="min-w-[620px]">{renderSvg(block.key)}</div>
        </div>
        <figcaption className="text-center text-[13px] font-bold text-slate-500">{block.caption}</figcaption>
      </figure>
    );
    case "activity": return (
      <div key={i} className={`rounded-2xl border p-5 space-y-4 shadow-md ${isLightMode ? "bg-white border-slate-200" : "bg-[#0a1f14] border-green-500/15"}`}>
        <div className="flex items-start gap-2.5"><FlaskConical className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /><h3 className="text-base font-black leading-snug">{block.title}</h3></div>
        <p className="text-sm font-semibold leading-relaxed"><span className="text-green-400 font-black">Aim: </span>{block.aim}</p>
        <SectionHeading>Steps</SectionHeading>
        <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">{block.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
        <RememberBox title="What you see">{block.observation}</RememberBox>
        <RememberBox title="What it shows">{block.conclusion}</RememberBox>
      </div>
    );
    case "done": return (
      <div key={i} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
        <div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-400" /><h3 className="text-base font-black text-emerald-300">You have finished Diversity and Classification</h3></div>
        <ul className="space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed"><span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500 text-slate-950 text-[12px] font-black flex items-center justify-center">✓</span><span>{it}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

interface LearnDiversity9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnDiversity9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnDiversity9Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-diversity9-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Globe2 className="w-5 h-5 text-green-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Diversity and Classification</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Patterns in Life: how and why we group the living world.</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {TOPICS.map((t) => (
            <button key={t.id} onClick={() => setActiveId(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-green-50 border border-green-300" : "bg-green-950/40 border border-green-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeId === t.id ? "text-green-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-green-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-diversity9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-diversity9-main p, #learn-diversity9-main li, #learn-diversity9-main span, #learn-diversity9-main label, #learn-diversity9-main td, #learn-diversity9-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-diversity9-main th { color: ${isLightMode ? "#ffffff" : "#86efac"}; }
          #learn-diversity9-main b, #learn-diversity9-main strong, #learn-diversity9-main h1, #learn-diversity9-main h2, #learn-diversity9-main h3, #learn-diversity9-main h4, #learn-diversity9-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-diversity9-container .bg-slate-900, #learn-diversity9-container .bg-\\[\\#0d1424\\], #learn-diversity9-container .bg-\\[\\#0a1a1f\\], #learn-diversity9-container .bg-slate-950 { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-diversity9-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest font-mono text-green-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || Lightbulb, { className: "w-3.5 h-3.5" })}{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{topic.heading}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => renderBlock(blk, i, isLightMode))}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? (
              <button onClick={() => setActiveId(TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button>
            ) : <div />}
            {idx < TOPICS.length - 1 ? (
              <button onClick={() => setActiveId(TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
            ) : (
              <div className="flex flex-wrap gap-3 justify-end w-full sm:w-auto">
                {onCompleteNotes && (
                  <button onClick={onCompleteNotes} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-green-400/30 shrink-0">Complete Notes<ChevronRight className="w-3.5 h-3.5" /></button>
                )}
                {onGoToSelfAssessment && (
                  <button onClick={onGoToSelfAssessment} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-green-400/30 shrink-0">Take Self Assessment Quiz<Award className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
