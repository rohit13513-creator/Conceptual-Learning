import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle, FileUp, Loader2, Trash2 } from 'lucide-react';
import { prepareProofFile } from './proofUtil';

export interface VerifyResult { id: string; subject: string; status: 'verified' | 'mismatch' | 'review' | 'unverified'; note: string }
export interface VerifyOutcome { error?: string; results?: VerifyResult[]; schoolOnDocument?: string; profileSchoolMissing?: boolean }

// Window where a student uploads their result page or the front page of a test copy so the marks they entered can be
// checked against it. Photos are shrunk before upload; a PDF is accepted as it is.
export function VerifyMarksModal({ examLabel, isLightMode, onClose, onSubmit }: { examLabel: string; isLightMode: boolean; onClose: () => void; onSubmit: (files: File[]) => Promise<VerifyOutcome> }) {
  const light = isLightMode;
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<VerifyOutcome | null>(null);

  const add = (list: FileList | null) => {
    if (!list) return;
    setError(null);
    const incoming = [...list];
    const next = [...files, ...incoming];
    if (next.some((f) => f.type === 'application/pdf') && next.length > 1) return setError('Please upload either one PDF or up to 3 photos, not both.');
    if (next.length > 3) return setError('You can add at most 3 photos.');
    setFiles(next);
  };

  const submit = async () => {
    setBusy(true); setError(null);
    try {
      const prepared = await Promise.all(files.map(prepareProofFile));
      const result = await onSubmit(prepared);
      if (result.error) setError(result.error); else setOutcome(result);
    } catch (e: any) { setError(e.message || 'Something went wrong. Please try again.'); }
    setBusy(false);
  };

  const icon = (s: VerifyResult['status']) => s === 'verified' ? <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertTriangle className={`w-4 h-4 shrink-0 ${s === 'unverified' ? 'text-slate-400' : s === 'review' ? 'text-amber-400' : 'text-rose-400'}`} />;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !busy && onClose()}>
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl p-5 space-y-4 ${light ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={`text-base font-black ${light ? 'text-slate-900' : 'text-white'}`}>Verify your {examLabel} marks</p>
            <p className={`text-xs font-semibold mt-0.5 ${light ? 'text-slate-500' : 'text-slate-400'}`}>A verified tick shows that your marks match your school's own paper.</p>
          </div>
          {!busy && <button onClick={onClose} aria-label="Close" className="p-1 rounded text-slate-500 hover:text-slate-300 cursor-pointer"><X className="w-4 h-4" /></button>}
        </div>

        {!outcome ? (
          <>
            <div className={`rounded-xl p-3 text-xs font-semibold space-y-1 ${light ? 'bg-slate-50 text-slate-700' : 'bg-slate-900 text-slate-300'}`}>
              <p>Upload <b>your school's result page</b>, or the <b>front page of your test copy</b>, where your marks <b>and the school's name</b> are written.</p>
              <p>Keep the whole page in the picture, in good light, so the numbers can be read clearly. You can add up to 3 photos, or one PDF.</p>
            </div>

            <label className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-5 cursor-pointer text-xs font-black uppercase tracking-wider ${light ? 'border-slate-300 text-slate-600 hover:bg-slate-50' : 'border-slate-700 text-slate-300 hover:bg-slate-900'} ${busy ? 'opacity-50 pointer-events-none' : ''}`}>
              <FileUp className="w-4 h-4" /> {files.length ? 'Add another page' : 'Choose photo or PDF'}
              <input type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={(e) => { add(e.target.files); e.currentTarget.value = ''; }} />
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {files.map((f, i) => (
                  <div key={i} className={`relative rounded-lg overflow-hidden border aspect-square flex items-center justify-center ${light ? 'border-slate-200 bg-slate-100' : 'border-slate-700 bg-slate-900'}`}>
                    {f.type === 'application/pdf' ? <span className="text-[11px] font-black text-slate-400">PDF</span> : <img src={URL.createObjectURL(f)} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />}
                    {!busy && <button onClick={() => setFiles(files.filter((_, k) => k !== i))} aria-label="Remove" className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white cursor-pointer"><Trash2 className="w-3 h-3" /></button>}
                  </div>
                ))}
              </div>
            )}

            {error && <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">{error}</div>}
            {busy && <p className={`text-xs font-semibold flex items-center gap-2 ${light ? 'text-slate-600' : 'text-slate-300'}`}><Loader2 className="w-4 h-4 animate-spin" /> Checking your document. This takes about a minute -- please keep this page open.</p>}

            <button onClick={submit} disabled={busy || files.length === 0} className="w-full px-6 py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50">
              {busy ? 'Checking...' : 'Check my marks'}
            </button>
            <p className={`text-[11px] font-semibold ${light ? 'text-slate-500' : 'text-slate-500'}`}>Your teacher can see the page you upload. It is not shown to other students.</p>
          </>
        ) : (
          <>
            <div className="space-y-2">
              {outcome.results!.map((r) => (
                <div key={r.id} className={`flex items-start gap-2.5 rounded-xl p-3 border ${r.status === 'verified' ? 'border-emerald-500/30 bg-emerald-500/5' : r.status === 'mismatch' ? 'border-rose-500/30 bg-rose-500/5' : r.status === 'review' ? 'border-amber-500/30 bg-amber-500/5' : (light ? 'border-slate-200 bg-slate-50' : 'border-slate-700 bg-slate-900')}`}>
                  {icon(r.status)}
                  <div>
                    <p className={`text-sm font-black ${light ? 'text-slate-900' : 'text-white'}`}>{r.subject} <span className="text-[11px] font-bold opacity-60">{r.status === 'verified' ? 'verified' : r.status === 'review' ? 'with your teacher' : r.status === 'mismatch' ? 'does not match' : 'not checked'}</span></p>
                    <p className={`text-xs font-semibold ${light ? 'text-slate-600' : 'text-slate-300'}`}>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
            {outcome.profileSchoolMissing && outcome.schoolOnDocument && (
              <p className={`text-xs font-semibold ${light ? 'text-slate-600' : 'text-slate-300'}`}>The school on this document is <b>{outcome.schoolOnDocument}</b>. You can add it to your profile so your classmates can see where you study (if you choose to show it).</p>
            )}
            {outcome.results!.some((r) => r.status === 'unverified') && <p className={`text-xs font-semibold ${light ? 'text-slate-500' : 'text-slate-400'}`}>Subjects that were not found can be checked with another page: press "Verify marks" again and add it.</p>}
            <button onClick={onClose} className="w-full px-6 py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer">Done</button>
          </>
        )}
      </div>
    </div>
  );
}
