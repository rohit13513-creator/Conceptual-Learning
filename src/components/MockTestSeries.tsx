import React, { useEffect, useState } from 'react';
import { ClipboardCheck, Download, Eye, Clock, CalendarDays, Hourglass, FileText, KeyRound } from 'lucide-react';

// The Class X Mock Test Series on the home page: each test with its question paper and answer key, and the result
// once it is published. The list comes from /api/mock-tests (only Class X students and the teacher receive it); the
// PDFs open through /mocktest/..., which checks the login again on every click.

interface MockTestInfo {
  id: string; number: number; title: string; subject: string; date: string;
  durationMinutes: number; maxMarks: number; note: string | null; hasPaper: boolean; hasKey: boolean;
}
interface MockTestsResponse { series: { title: string; summary: string; totalTests: number } | null; tests: MockTestInfo[]; canDownload: boolean }

const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const prettyDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function MockTestSeries({ token, isLightMode }: { token: string; isLightMode: boolean }) {
  const [data, setData] = useState<MockTestsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/mock-tests', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!cancelled && d) setData(d); })
      .catch(() => { /* the section simply stays hidden */ });
    return () => { cancelled = true; };
  }, [token]);

  if (!data || !data.series || data.tests.length === 0) return null;
  const light = isLightMode;
  const today = todayIST();
  const heading = light ? 'text-slate-900' : 'text-white';
  const muted = light ? 'text-slate-600' : 'text-slate-400';
  const chip = `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${light ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'}`;
  const viewBtn = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition bg-[#22d3ee] text-slate-950 hover:bg-cyan-300';
  const saveBtn = `inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`;

  const fileRow = (test: MockTestInfo, which: 'paper' | 'key', label: string, Icon: React.ElementType) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold w-full sm:w-36 ${heading}`}><Icon className="w-4 h-4 text-cyan-400" /> {label}</span>
      <a href={`/mocktest/${test.id}/${which}`} target="_blank" rel="noopener noreferrer" className={viewBtn}><Eye className="w-3.5 h-3.5" /> View PDF</a>
      {data.canDownload && <a href={`/mocktest/${test.id}/${which}/download`} className={saveBtn}><Download className="w-3.5 h-3.5" /> Download</a>}
    </div>
  );

  return (
    <div className={`border rounded-2xl p-5 shadow-lg ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-300 to-orange-400 shadow-lg shadow-amber-500/20"><ClipboardCheck className="w-6 h-6 text-slate-950" /></span>
        <div>
          <h2 className={`text-base font-black ${heading}`}>{data.series.title}</h2>
          <p className={`text-xs font-semibold mt-0.5 ${muted}`}>{data.series.summary}</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {data.tests.map((t) => {
          const upcoming = t.date > today;
          return (
            <div key={t.id} className={`rounded-xl border p-4 space-y-3 ${light ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-500">Test {t.number} of {data.series!.totalTests}</span>
                {upcoming && <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-500">Upcoming</span>}
              </div>
              <div>
                <p className={`text-lg font-black leading-tight ${heading}`}>{t.title}</p>
                <p className={`text-xs font-semibold mt-0.5 ${muted}`}>{t.subject}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={chip}><CalendarDays className="w-3.5 h-3.5 text-cyan-400" /> {upcoming ? 'On ' : 'Held on '}{prettyDate(t.date)}</span>
                <span className={chip}><Clock className="w-3.5 h-3.5 text-cyan-400" /> {t.durationMinutes} minutes</span>
                <span className={chip}><FileText className="w-3.5 h-3.5 text-cyan-400" /> {t.maxMarks} marks</span>
              </div>
              {t.note && <p className={`text-xs font-semibold ${muted}`}>{t.note}</p>}

              {t.hasPaper || t.hasKey ? (
                <div className="space-y-2.5">
                  {t.hasPaper && fileRow(t, 'paper', 'Question paper', FileText)}
                  {t.hasKey && fileRow(t, 'key', 'Answer key', KeyRound)}
                </div>
              ) : (
                <p className={`text-xs font-semibold ${muted}`}>The question paper will be available here on the day of the test.</p>
              )}

              <div className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs font-bold ${light ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-amber-500/10 text-amber-300 border border-amber-500/25'}`}>
                <Hourglass className="w-4 h-4 shrink-0 mt-px" />
                <span>{upcoming ? 'The result will be displayed here after the test.' : 'Result will be displayed soon.'}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className={`text-[11px] font-semibold mt-3 ${muted}`}>Notice of the next test will be shown here before it is held.</p>
    </div>
  );
}
