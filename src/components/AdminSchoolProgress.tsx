import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { SchoolMarksPanel } from './SchoolMarksPanel';
import type { MarksEntry } from './schoolMarksUtil';

// Teacher's view of how every student is doing in their own school: latest result, change since the exam before,
// and each student's full history (read-only).
interface Row { email: string; name: string; studentClass: string | null; entryCount: number; examCount: number; latestExam: string | null; latestPercentage: number | null; change: number | null; verifiedCount?: number; needsReviewCount?: number }

export default function AdminSchoolProgress({ token, isLightMode }: { token: string; isLightMode: boolean }) {
  const light = isLightMode;
  const [rows, setRows] = useState<Row[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [classFilter, setClassFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [openEmail, setOpenEmail] = useState<string | null>(null);
  const [entries, setEntries] = useState<MarksEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const r = await fetch('/api/admin/school-marks/overview', { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not load.');
      setRows(d.students || []); setUnavailable(!!d.unavailable);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [token]);
  useEffect(() => { load(); }, [load]);

  const viewProof = async (id: string): Promise<string[]> => {
    try {
      const r = await fetch(`/api/admin/school-marks/proof?id=${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json();
      return d.urls || [];
    } catch { return []; }
  };

  const open = async (email: string) => {
    if (openEmail === email) { setOpenEmail(null); return; }
    setOpenEmail(email); setEntries([]); setEntriesLoading(true);
    try {
      const r = await fetch(`/api/admin/school-marks/student?email=${encodeURIComponent(email)}`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json();
      setEntries(d.entries || []);
    } catch { /* empty list shown */ }
    setEntriesLoading(false);
  };

  const classes = useMemo(() => ['All', ...[...new Set((rows || []).map((r) => r.studentClass || '--'))].sort()], [rows]);
  const shown = (rows || []).filter((r) => (classFilter === 'All' || (r.studentClass || '--') === classFilter) && r.name.toLowerCase().includes(search.toLowerCase()));
  const withMarks = (rows || []).filter((r) => r.entryCount > 0).length;
  const inputCls = `border rounded-lg py-1.5 px-2.5 text-xs focus:outline-none focus:border-amber-500 ${light ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-100'}`;

  return (
    <div className={`border rounded-2xl p-5 shadow-lg ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-amber-400"><GraduationCap className="w-4 h-4" /> School Progress</h3>
        <button onClick={load} disabled={loading} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-black uppercase cursor-pointer border ${light ? 'border-slate-300 text-slate-600' : 'border-slate-700 text-slate-300'}`}><RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh</button>
      </div>
      {error && <p className="text-xs font-bold text-red-400">{error}</p>}
      {unavailable && <p className={`text-xs font-semibold ${light ? 'text-slate-600' : 'text-slate-400'}`}>The marks table has not been created yet (run supabase_profiles_and_marks.sql in Supabase).</p>}
      {rows && !unavailable && (
        <>
          <p className={`text-xs font-semibold mb-3 ${light ? 'text-slate-600' : 'text-slate-400'}`}>{withMarks} of {rows.length} students have added their school marks. Tap a student to see the full history.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className={inputCls}>{classes.map((c) => <option key={c} value={c}>{c === 'All' ? 'All classes' : `Class ${c}`}</option>)}</select>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a student" className={`${inputCls} flex-1 min-w-[140px]`} />
          </div>
          <div className={`rounded-xl border divide-y overflow-hidden ${light ? 'border-slate-200 divide-slate-200' : 'border-slate-800 divide-slate-800'}`}>
            {shown.length === 0 && <p className="text-xs font-semibold text-slate-500 p-3">No students match.</p>}
            {shown.map((r) => (
              <div key={r.email}>
                <button onClick={() => open(r.email)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-left cursor-pointer ${light ? 'bg-white hover:bg-slate-50' : 'bg-slate-950 hover:bg-slate-900'}`}>
                  <span className={`flex-1 min-w-0 text-sm font-bold truncate ${light ? 'text-slate-800' : 'text-slate-100'}`}>{r.name} <span className="text-[11px] font-semibold opacity-60">Class {r.studentClass || '--'}</span></span>
                  {r.entryCount === 0 ? <span className="text-[11px] font-semibold text-slate-500">no marks yet</span> : (
                    <>
                      {(r.needsReviewCount || 0) > 0 && <span className="text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">{r.needsReviewCount} to review</span>}
                      {(r.verifiedCount || 0) > 0 && <span title="Marks checked against the school's own page" className="text-[10px] font-black text-emerald-400">{r.verifiedCount}/{r.entryCount} verified</span>}
                      <span className="hidden sm:inline text-[11px] font-semibold text-slate-500 truncate max-w-[150px]">{r.latestExam}</span>
                      <span className={`text-sm font-black ${(r.latestPercentage ?? 0) >= 75 ? 'text-emerald-400' : (r.latestPercentage ?? 0) >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{r.latestPercentage ?? '--'}%</span>
                      {r.change !== null && (r.change > 0 ? <span className="text-[11px] font-black text-emerald-400 inline-flex items-center"><TrendingUp className="w-3 h-3" />+{r.change}</span> : r.change < 0 ? <span className="text-[11px] font-black text-rose-400 inline-flex items-center"><TrendingDown className="w-3 h-3" />{r.change}</span> : <span className="text-[11px] font-black text-slate-400">same</span>)}
                    </>
                  )}
                  {openEmail === r.email ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openEmail === r.email && (
                  <div className={`p-3 ${light ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
                    {entriesLoading ? <p className="text-xs font-semibold text-slate-500">Loading...</p> : <SchoolMarksPanel entries={entries} isLightMode={light} editable={false} onViewProof={viewProof} />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
