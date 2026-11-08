import React, { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";

// Every worksheet, test paper and homework question sheet ever posted for the student's class (not only the newest ten),
// with a search box, so an older sheet can always be found and downloaded again. The question files are never deleted.
export interface SheetItem { id: string; title: string; subject?: string | null; description?: string | null; createdAt: string; targetClass: string; fileUrl: string | null; answersUrl?: string | null }

export const AllSheetsLibrary: React.FC<{ sheets: SheetItem[]; isLightMode: boolean; formatDate: (iso: string) => string }> = ({ sheets, isLightMode, formatDate }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? sheets.filter((s) => `${s.title} ${s.subject ?? ""} ${s.description ?? ""}`.toLowerCase().includes(t)) : sheets;
  }, [sheets, q]);
  const muted = isLightMode ? "text-slate-500" : "text-slate-400";
  return (
    <div className={`border rounded-2xl p-4 mt-4 ${isLightMode ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"}`}>
      <button onClick={() => setOpen((v) => !v)} className={`w-full flex items-center justify-between gap-2 text-left cursor-pointer ${isLightMode ? "text-slate-900" : "text-white"}`}>
        <span className="flex items-center gap-2 text-sm font-black"><FileText className="w-4 h-4 text-amber-400" /> All worksheets and test papers ({sheets.length})</span>
        <span className="text-[11px] font-black text-cyan-400">{open ? "Hide" : "Show all"}</span>
      </button>
      <p className={`text-[11px] font-semibold mt-1 ${muted}`}>Every question sheet that was ever posted stays here, so you can open or download an older one at any time.</p>
      {open && (
        <div className="mt-3 space-y-2">
          <div className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${isLightMode ? "bg-white border-slate-300" : "bg-slate-950 border-slate-700"}`}>
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, for example percentages or worksheet 1" className={`w-full bg-transparent text-xs font-semibold outline-none ${isLightMode ? "text-slate-900" : "text-slate-100"}`} />
          </div>
          <div className={`divide-y max-h-[420px] overflow-y-auto ${isLightMode ? "divide-slate-200" : "divide-slate-800/60"}`}>
            {shown.length === 0 ? (
              <p className={`text-[11px] font-semibold py-3 ${muted}`}>No worksheet matches that search.</p>
            ) : shown.map((s) => (
              <div key={s.id} className="py-2.5 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`text-xs font-bold ${isLightMode ? "text-slate-900" : "text-slate-100"}`}>{s.title}</p>
                  <p className="text-[10px] font-mono text-slate-500">{s.subject ? `${s.subject} • ` : ""}{formatDate(s.createdAt)}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1 sm:flex-row sm:items-center">
                  {s.fileUrl ? (
                    <a href={s.fileUrl} target="_blank" rel="noreferrer" download className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wide border ${isLightMode ? "bg-cyan-50 border-cyan-200 text-cyan-700" : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"}`}>
                      <Download className="w-3 h-3" /> PDF
                    </a>
                  ) : <span className="text-[10px] font-semibold text-slate-500">No file</span>}
                  {s.answersUrl && (
                    <a href={s.answersUrl} target="_blank" rel="noreferrer" download className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wide border ${isLightMode ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"}`}>
                      <Download className="w-3 h-3" /> Answers
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
