import React, { useEffect, useState } from 'react';
import { ClipboardCheck, Award, BookOpenCheck, ChevronDown, Download, Eye, Clock, CalendarDays, Hourglass, FileText, KeyRound, Trophy, AlertCircle, CheckCircle2 } from 'lucide-react';

// The Class X Mock Test Series on the home page: each test with its question paper and answer key, and the result
// once it is published. The list comes from /api/mock-tests (only Class X students and the teacher receive it); the
// PDFs open through /mocktest/..., which checks the login again on every click.
// The result of a test: every student sees the top three and only his or her own marks (with the remarks about errors made while
// writing the paper); a student who is not in the result is told that the test was not attempted. The teacher sees every row.

interface MockRow {
  rank: number; name: string; correct: number; wrong: number; notAttempted: number;
  marks: number; penalty: number; finalMarks: number; percent: number; remark: string | null;
}
interface MockResultInfo {
  maxMarks: number; appeared: number; average: number; averagePercent: number;
  highest: { marks: number; names: string[] };
  topThree: { rank: number; names: string[]; finalMarks: number; percent: number }[];
  me: null | ({ attempted: true } & MockRow) | { attempted: false };
  all: MockRow[] | null;
  notAttempted: string[] | null;
}
interface MockTestInfo {
  id: string; number: number; title: string; subject: string; date: string;
  durationMinutes: number | null; maxMarks: number | null; note: string | null; hasPaper: boolean; hasKey: boolean; hasSolutions: boolean;
  award: { headline: string; conditions: string[] } | null;
  result: MockResultInfo | null;
}
const num = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));
const joinNames = (names: string[]) => (names.length <= 1 ? names.join('') : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1]);
interface MockTestsResponse { series: { title: string; summary: string; totalTests: number } | null; tests: MockTestInfo[]; canDownload: boolean }

const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const prettyDuration = (m: number) => (m >= 60 && m % 60 === 0 ? `${m / 60} hour${m === 60 ? '' : 's'}` : m > 60 ? `${Math.floor(m / 60)} hour${m < 120 ? '' : 's'} ${m % 60} minutes` : `${m} minutes`);
const prettyDate =(iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function MockTestSeries({ token, isLightMode }: { token: string; isLightMode: boolean }) {
  const [data, setData] = useState<MockTestsResponse | null>(null);
  const [openResults, setOpenResults] = useState<Record<string, boolean>>({}); // which tests have their result dropdown open

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

  const fileRow = (test: MockTestInfo, which: 'paper' | 'key' | 'solutions', label: string, Icon: React.ElementType) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold w-full sm:w-36 ${heading}`}><Icon className="w-4 h-4 text-cyan-400" /> {label}</span>
      <a href={`/mocktest/${test.id}/${which}`} target="_blank" rel="noopener noreferrer" className={viewBtn}><Eye className="w-3.5 h-3.5" /> View PDF</a>
      {data.canDownload && <a href={`/mocktest/${test.id}/${which}/download`} className={saveBtn}><Download className="w-3.5 h-3.5" /> Download</a>}
    </div>
  );

  const panel = `rounded-xl border p-3.5 ${light ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-slate-800'}`;
  const medal = (rank: number) => (rank === 1 ? 'bg-amber-400 text-slate-950' : rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-orange-400 text-slate-950');

  const resultBlock = (r: MockResultInfo) => {
    const me = r.me;
    const stat = (label: string, value: string, tone = '') => (
      <div className={`rounded-lg px-3 py-2 text-center ${light ? 'bg-slate-100' : 'bg-slate-800/70'}`}>
        <p className={`text-[10px] font-black uppercase tracking-wider ${muted}`}>{label}</p>
        <p className={`text-base font-black ${tone || heading}`}>{value}</p>
      </div>
    );
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-400" /><p className={`text-sm font-black uppercase tracking-wider ${heading}`}>Result</p></div>
        <div className="flex flex-wrap gap-2">
          <span className={chip}>{r.appeared} students appeared</span>
          <span className={chip}>Class average {num(r.average)} / {r.maxMarks} ({num(r.averagePercent)}%)</span>
          <span className={chip}>Highest {num(r.highest.marks)} / {r.maxMarks}: {joinNames(r.highest.names)}</span>
        </div>

        <div className={panel}>
          <p className={`text-xs font-black uppercase tracking-wider mb-2 ${heading}`}>Leaderboard: top 3</p>
          <div className="space-y-2">
            {r.topThree.map((g) => (
              <div key={g.rank} className="flex items-center gap-3">
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${medal(g.rank)}`}>{g.rank}</span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-black leading-snug ${heading}`}>{joinNames(g.names)}</p>
                  {g.names.length > 1 && <p className={`text-[11px] font-semibold ${muted}`}>Shared rank {g.rank}</p>}
                </div>
                <p className={`shrink-0 text-sm font-black ${heading}`}>{num(g.finalMarks)} / {r.maxMarks} <span className={`text-[11px] font-bold ${muted}`}>({num(g.percent)}%)</span></p>
              </div>
            ))}
          </div>
        </div>

        {me && me.attempted && (
          <div className={`${panel} space-y-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className={`text-xs font-black uppercase tracking-wider ${heading}`}>Your result</p>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-500">Rank {me.rank} of {r.appeared}</span>
            </div>
            <p className={`text-3xl font-black leading-none ${heading}`}>{num(me.finalMarks)} <span className={`text-base ${muted}`}>/ {r.maxMarks} ({num(me.percent)}%)</span></p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {stat('Correct', String(me.correct), 'text-emerald-500')}
              {stat('Wrong', String(me.wrong), 'text-red-500')}
              {stat('Not attempted', String(me.notAttempted))}
              {stat('Marks', num(me.marks))}
              {stat('Penalty', me.penalty ? num(me.penalty) : 'None', me.penalty ? 'text-red-500' : '')}
              {stat('Final', num(me.finalMarks), 'text-cyan-500')}
            </div>
            <div className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs font-bold ${me.remark ? (light ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-amber-500/10 text-amber-300 border border-amber-500/25') : (light ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25')}`}>
              {me.remark ? <AlertCircle className="w-4 h-4 shrink-0 mt-px" /> : <CheckCircle2 className="w-4 h-4 shrink-0 mt-px" />}
              <span><b>Remarks: </b>{me.remark || 'No penalty. No error was noted in the way you wrote your answers.'}</span>
            </div>
          </div>
        )}
        {me && !me.attempted && (
          <div className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs font-bold ${light ? 'bg-slate-100 text-slate-700 border border-slate-200' : 'bg-slate-800/70 text-slate-300 border border-slate-700'}`}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
            <span>You did not attempt this test, so there is no result for you.</span>
          </div>
        )}

        {r.all && (
          <div className={`${panel} space-y-2`}>
            <p className={`text-xs font-black uppercase tracking-wider ${heading}`}>All results (teacher only)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead><tr className={`font-black uppercase tracking-wider ${muted}`}>
                  {['Rank', 'Student', 'Correct', 'Wrong', 'Not att.', 'Marks', 'Penalty', `Final / ${r.maxMarks}`, '%'].map((h) => <th key={h} className="py-1.5 pr-3">{h}</th>)}
                </tr></thead>
                <tbody>
                  {r.all.map((x) => (
                    <React.Fragment key={x.name}>
                      <tr className={`border-t font-semibold ${light ? 'border-slate-200 text-slate-800' : 'border-slate-800 text-slate-200'}`}>
                        <td className="py-1.5 pr-3 font-black">{x.rank}</td><td className="py-1.5 pr-3 font-bold">{x.name}</td>
                        <td className="py-1.5 pr-3">{x.correct}</td><td className="py-1.5 pr-3">{x.wrong}</td><td className="py-1.5 pr-3">{x.notAttempted}</td>
                        <td className="py-1.5 pr-3">{num(x.marks)}</td><td className="py-1.5 pr-3">{x.penalty ? num(x.penalty) : '-'}</td>
                        <td className="py-1.5 pr-3 font-black">{num(x.finalMarks)}</td><td className="py-1.5 pr-3">{num(x.percent)}%</td>
                      </tr>
                      {x.remark && <tr><td /><td colSpan={8} className={`pb-1.5 text-[11px] font-semibold ${muted}`}>{x.remark}</td></tr>}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            {r.notAttempted && r.notAttempted.length > 0 && (
              <p className={`text-xs font-semibold ${muted}`}><b className={heading}>Did not attempt ({r.notAttempted.length}): </b>{r.notAttempted.join(', ')}</p>
            )}
          </div>
        )}
      </div>
    );
  };

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
        {[...data.tests].sort((a, b) => b.number - a.number).map((t) => {
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
                {t.durationMinutes != null && <span className={chip}><Clock className="w-3.5 h-3.5 text-cyan-400" /> {prettyDuration(t.durationMinutes)}</span>}
                {t.maxMarks != null && <span className={chip}><FileText className="w-3.5 h-3.5 text-cyan-400" /> {t.maxMarks} marks</span>}
              </div>
              {t.note && <p className={`text-xs font-semibold ${muted}`}>{t.note}</p>}
              {t.award && (
                <div className={`rounded-xl border px-3.5 py-3 ${light ? 'bg-amber-50 border-amber-200' : 'bg-amber-500/10 border-amber-500/30'}`}>
                  <p className={`flex items-start gap-2 text-sm font-black ${light ? 'text-amber-900' : 'text-amber-300'}`}><Award className="w-5 h-5 shrink-0" /> {t.award.headline}</p>
                  <ol className={`mt-2 ml-7 list-decimal space-y-1 text-xs font-bold ${light ? 'text-amber-900' : 'text-amber-200'}`}>
                    {t.award.conditions.map((c) => <li key={c}>{c}</li>)}
                  </ol>
                </div>
              )}

              {t.hasPaper || t.hasKey || t.hasSolutions ? (
                <div className="space-y-2.5">
                  {t.hasPaper && fileRow(t, 'paper', 'Question paper', FileText)}
                  {t.hasKey && fileRow(t, 'key', 'Answer key', KeyRound)}
                  {t.hasSolutions && fileRow(t, 'solutions', 'Solutions', BookOpenCheck)}
                </div>
              ) : (
                <p className={`text-xs font-semibold ${muted}`}>The question paper will be available here on the day of the test.</p>
              )}

              {t.result ? (
                <div className="space-y-3">
                  <button type="button" aria-expanded={!!openResults[t.id]} onClick={() => setOpenResults((o) => ({ ...o, [t.id]: !o[t.id] }))}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition ${light ? 'bg-amber-100 text-amber-900 hover:bg-amber-200' : 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'}`}>
                    <span className="inline-flex items-center gap-2"><Trophy className="w-4 h-4" /> {openResults[t.id] ? 'Hide result' : 'Check result'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openResults[t.id] ? 'rotate-180' : ''}`} />
                  </button>
                  {openResults[t.id] && resultBlock(t.result)}
                </div>
              ) : (
                <div className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs font-bold ${light ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-amber-500/10 text-amber-300 border border-amber-500/25'}`}>
                  <Hourglass className="w-4 h-4 shrink-0 mt-px" />
                  <span>{upcoming ? 'The result will be displayed here after the test.' : 'Result will be displayed soon.'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className={`text-[11px] font-semibold mt-3 ${muted}`}>Notice of the next test will be shown here before it is held.</p>
    </div>
  );
}
