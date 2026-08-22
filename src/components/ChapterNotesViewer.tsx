import React from 'react';
import ChapterNotesDiagram, { DiagramSpec } from './ChapterNotesDiagram';

export interface ChapterNotesDiagramState {
  id: string;
  description: string;
  spec: DiagramSpec | null;
  status: 'pending' | 'ok' | 'flagged';
  issues?: string[];
}

export interface ChapterNotesSection {
  heading: string;
  points: string[];
  diagrams: ChapterNotesDiagramState[];
}

export interface ChapterNotesContent {
  title: string;
  sections: ChapterNotesSection[];
  reviewSummary?: string;
  reviewConcerns?: string[];
}

export default function ChapterNotesViewer({ content, isLightMode, showFlags = false }: { content: ChapterNotesContent; isLightMode: boolean; showFlags?: boolean }) {
  return (
    <div className="space-y-5">
      <h2 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{content.title}</h2>
      {content.sections.map((section, si) => (
        <div key={si} className={`rounded-xl border p-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'}`}>
          <h3 className={`text-sm font-black uppercase tracking-wide mb-2 ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{section.heading}</h3>
          <ul className="space-y-1.5 mb-3">
            {section.points.map((p, pi) => (
              <li key={pi} className={`text-[13px] leading-snug flex gap-2 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                <span className="opacity-50">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {section.diagrams.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {section.diagrams.map((d, di) => (
                <div key={di}>
                  {d.spec ? (
                    <>
                      <ChapterNotesDiagram spec={d.spec} isLightMode={isLightMode} />
                      {showFlags && d.status === 'flagged' && (
                        <p className="text-[10px] mt-1 font-bold text-amber-500">
                          ⚠ Not automatically confirmed clean -- please look this one over: {d.issues?.join(' ') || 'possible overlap.'}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className={`rounded-xl border p-4 text-[11px] italic ${isLightMode ? 'border-slate-200 text-slate-400' : 'border-slate-800 text-slate-500'}`}>
                      Diagram generating…
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {showFlags && content.reviewSummary && (
        <div className={`rounded-xl border p-4 ${isLightMode ? 'bg-cyan-50 border-cyan-200' : 'bg-cyan-950/20 border-cyan-800/30'}`}>
          <p className={`text-[11px] font-bold ${isLightMode ? 'text-cyan-700' : 'text-cyan-300'}`}>AI self-review: {content.reviewSummary}</p>
          {content.reviewConcerns && content.reviewConcerns.length > 0 && (
            <ul className="mt-1.5 space-y-1">
              {content.reviewConcerns.map((c, ci) => (
                <li key={ci} className={`text-[11px] ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`}>⚠ {c}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
