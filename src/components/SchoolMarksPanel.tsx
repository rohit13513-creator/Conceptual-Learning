import React, { useMemo, useState } from 'react';
import { Pencil, Trash2, TrendingUp, TrendingDown, Minus, Plus, X, ShieldCheck, AlertTriangle, FileText } from 'lucide-react';
import { VerifyMarksModal, VerifyOutcome } from './VerifyMarksModal';
import {
  MarksEntry, EXAM_PRESETS, SUBJECT_CHOICES, SERIES_COLORS, academicYearOptions, currentAcademicYear,
  groupExams, summariseSubjects, shortExamName,
} from './schoolMarksUtil';

// Shows a student's school marks as progress (cards, a line chart and a history list), and -- for the student
// themself -- the form to add or correct marks. The teacher sees the same thing read-only.

export interface MarksPayload {
  academicYear: string; examName: string; subject: string; marksObtained: number; maxMarks: number; examDate: string;
}
interface Props {
  entries: MarksEntry[];
  isLightMode: boolean;
  editable: boolean;
  onSave?: (payload: MarksPayload) => Promise<string | null>; // returns an error message, or null when saved
  onDelete?: (id: string) => Promise<string | null>;
  verificationReady?: boolean; // the checking feature is switched on
  onVerify?: (exam: { academicYear: string; examName: string }, files: File[]) => Promise<VerifyOutcome>;
  onViewProof?: (id: string) => Promise<string[]>; // teacher: links to the uploaded page
  onDecide?: (id: string, action: 'approve' | 'reject') => Promise<void>; // teacher: approve or reject marks that need a decision
}

const card = (light: boolean) => `border rounded-2xl p-4 sm:p-5 ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`;
const labelCls = (light: boolean) => `text-[10px] font-black uppercase tracking-wider block font-mono mb-1 ${light ? 'text-slate-500' : 'text-slate-400'}`;
const inputCls = (light: boolean) => `w-full border rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-cyan-500 ${light ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-100'}`;

function ChangeBadge({ change }: { change: number | null }) {
  if (change === null) return <span className="text-[10px] font-bold text-slate-500">first exam</span>;
  if (change > 0) return <span className="text-[11px] font-black text-emerald-400 inline-flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+{change}</span>;
  if (change < 0) return <span className="text-[11px] font-black text-rose-400 inline-flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />{change}</span>;
  return <span className="text-[11px] font-black text-slate-400 inline-flex items-center gap-0.5"><Minus className="w-3 h-3" />same</span>;
}

function ProgressChart({ entries, isLightMode }: { entries: MarksEntry[]; isLightMode: boolean }) {
  const groups = useMemo(() => groupExams(entries), [entries]);
  const subjects = useMemo(() => [...new Set(groups.flatMap((g) => g.entries.map((e) => e.subject)))].sort(), [groups]);
  if (groups.length === 0) return null;
  const W = 640, H = 260, L = 38, R = 14, T = 14, B = 46;
  const x = (i: number) => (groups.length === 1 ? (L + (W - R)) / 2 : L + (i * (W - L - R)) / (groups.length - 1));
  // The bottom of the chart follows the lowest mark (rounded down to a multiple of 10, with some room), so small
  // differences between exams stay visible; a student who scores 70-95% is not squeezed into a flat line.
  const allPct = entries.map((e) => e.percentage);
  const floor = Math.max(0, Math.min(60, Math.floor((Math.min(...allPct) - 8) / 10) * 10));
  const ticks: number[] = []; for (let v = floor; v <= 100; v += floor >= 50 ? 10 : 20) ticks.push(v);
  if (ticks[ticks.length - 1] !== 100) ticks.push(100);
  const y = (pct: number) => T + ((100 - Math.max(pct, floor)) * (H - T - B)) / (100 - floor);
  const axis = isLightMode ? '#94a3b8' : '#475569';
  const text = isLightMode ? '#475569' : '#94a3b8';
  const series = [
    { name: 'Overall', color: isLightMode ? '#0f172a' : '#f8fafc', width: 3, points: groups.map((g, i) => (g.overall == null ? null : { i, pct: g.overall, label: `${g.examName} ${g.academicYear}: overall ${g.overall}%` })).filter(Boolean) as { i: number; pct: number; label: string }[] },
    ...subjects.map((s, k) => ({
      name: s, color: SERIES_COLORS[k % SERIES_COLORS.length], width: 2,
      points: groups.map((g, i) => { const e = g.entries.find((en) => en.subject === s); return e ? { i, pct: e.percentage, label: `${s}, ${g.examName} ${g.academicYear}: ${e.marksObtained}/${e.maxMarks} = ${e.percentage}%` } : null; }).filter(Boolean) as { i: number; pct: number; label: string }[],
    })),
  ];
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Marks progress chart">
        {ticks.map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={axis} strokeOpacity={v === floor ? 0.8 : 0.25} strokeDasharray={v === floor ? undefined : '3 4'} />
            <text x={L - 6} y={y(v) + 3} textAnchor="end" fontSize="10" fill={text}>{v}%</text>
          </g>
        ))}
        {groups.map((g, i) => (
          <g key={g.key}>
            <text x={x(i)} y={H - 26} textAnchor="middle" fontSize="11" fontWeight="700" fill={text}>{shortExamName(g.examName)}</text>
            {(i === 0 || groups[i - 1].academicYear !== g.academicYear) && <text x={x(i)} y={H - 12} textAnchor="middle" fontSize="9" fill={text} opacity="0.8">{g.academicYear}</text>}
          </g>
        ))}
        {series.map((s) => (
          <g key={s.name}>
            {s.points.length > 1 && <polyline fill="none" stroke={s.color} strokeWidth={s.width} strokeLinejoin="round" strokeLinecap="round" points={s.points.map((p) => `${x(p.i)},${y(p.pct)}`).join(' ')} />}
            {s.points.map((p) => (
              <circle key={p.i} cx={x(p.i)} cy={y(p.pct)} r={s.width + 1.5} fill={s.color} stroke={isLightMode ? '#fff' : '#0f172a'} strokeWidth="1">
                <title>{p.label}</title>
              </circle>
            ))}
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
        {series.map((s) => (
          <span key={s.name} className={`text-[11px] font-bold inline-flex items-center gap-1.5 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            <span className="inline-block w-3 h-1.5 rounded-full" style={{ background: s.color }} /> {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SchoolMarksPanel({ entries, isLightMode, editable, onSave, onDelete, verificationReady, onVerify, onViewProof, onDecide }: Props) {
  const groups = useMemo(() => groupExams(entries), [entries]);
  const summary = useMemo(() => summariseSubjects(entries), [entries]);

  // entry form
  const [showForm, setShowForm] = useState(false);
  const [year, setYear] = useState(currentAcademicYear());
  const [examChoice, setExamChoice] = useState<string>('PT1');
  const [customExam, setCustomExam] = useState('');
  const [subjectChoice, setSubjectChoice] = useState<string>('Maths');
  const [customSubject, setCustomSubject] = useState('');
  const [obtained, setObtained] = useState('');
  const [maximum, setMaximum] = useState('');
  const [examDate, setExamDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [toDelete, setToDelete] = useState<MarksEntry | null>(null);
  const [verifying, setVerifying] = useState<{ academicYear: string; examName: string } | null>(null);
  const [proofLinks, setProofLinks] = useState<Record<string, string[]>>({});

  const examName = examChoice === 'Other' ? customExam.trim() : examChoice;
  const subject = subjectChoice === 'Other' ? customSubject.trim() : subjectChoice;
  const typedPct = obtained !== '' && Number(maximum) > 0 ? Math.round((Number(obtained) / Number(maximum)) * 1000) / 10 : null;

  const startEdit = (e: MarksEntry) => {
    setYear(e.academicYear);
    if (EXAM_PRESETS.includes(e.examName)) { setExamChoice(e.examName); setCustomExam(''); } else { setExamChoice('Other'); setCustomExam(e.examName); }
    if (SUBJECT_CHOICES.includes(e.subject)) { setSubjectChoice(e.subject); setCustomSubject(''); } else { setSubjectChoice('Other'); setCustomSubject(e.subject); }
    setObtained(String(e.marksObtained)); setMaximum(String(e.maxMarks)); setExamDate(e.examDate || '');
    setShowForm(true); setMessage(null);
    window.scrollTo?.({ top: 0 });
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!onSave) return;
    setMessage(null);
    if (!examName) return setMessage({ type: 'error', text: 'Type the name of the exam.' });
    if (!subject) return setMessage({ type: 'error', text: 'Type the subject.' });
    if (obtained === '' || maximum === '') return setMessage({ type: 'error', text: 'Enter the marks you got and the maximum marks.' });
    if (Number(obtained) > Number(maximum)) return setMessage({ type: 'error', text: 'Marks you got cannot be more than the maximum marks.' });
    setSaving(true);
    const err = await onSave({ academicYear: year, examName, subject, marksObtained: Number(obtained), maxMarks: Number(maximum), examDate });
    setSaving(false);
    if (err) return setMessage({ type: 'error', text: err });
    setMessage({ type: 'ok', text: `Saved: ${subject}, ${examName} ${year} -- ${obtained}/${maximum}. Add the next subject of this exam, or close the form.` });
    setObtained(''); // keep year, exam and maximum so the next subject is quick to enter
  };

  const confirmDelete = async () => {
    if (!toDelete || !onDelete) return;
    const err = await onDelete(toDelete.id);
    setToDelete(null);
    setMessage(err ? { type: 'error', text: err } : { type: 'ok', text: 'Entry deleted.' });
  };

  return (
    <div className="space-y-5">
      {editable && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className={`text-xs font-semibold max-w-xl ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
            Add your marks from school -- PT1, PT2, Half Yearly, PT3, PT4, Final Exam or any other test -- to see your progress over the year. Only you and your teacher can see them, unless you choose to show them on your profile.
          </p>
          <button onClick={() => { setShowForm((v) => !v); setMessage(null); }} className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer">
            {showForm ? <><X className="w-3.5 h-3.5" /> Close</> : <><Plus className="w-3.5 h-3.5" /> Add marks</>}
          </button>
        </div>
      )}

      {editable && showForm && (
        <form onSubmit={submit} className={`${card(isLightMode)} space-y-4`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={labelCls(isLightMode)}>School year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)} className={inputCls(isLightMode)}>
                {academicYearOptions().map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls(isLightMode)}>Subject</label>
              <select value={subjectChoice} onChange={(e) => setSubjectChoice(e.target.value)} className={inputCls(isLightMode)}>
                {SUBJECT_CHOICES.map((s) => <option key={s} value={s}>{s}</option>)}
                <option value="Other">Other...</option>
              </select>
              {subjectChoice === 'Other' && <input value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} maxLength={30} placeholder="Subject name" className={`${inputCls(isLightMode)} mt-2`} />}
            </div>
            <div>
              <label className={labelCls(isLightMode)}>Marks you got</label>
              <input type="number" inputMode="decimal" min="0" step="0.5" value={obtained} onChange={(e) => setObtained(e.target.value)} placeholder="e.g. 17" className={inputCls(isLightMode)} />
            </div>
            <div>
              <label className={labelCls(isLightMode)}>Out of (maximum)</label>
              <input type="number" inputMode="decimal" min="1" step="0.5" value={maximum} onChange={(e) => setMaximum(e.target.value)} placeholder="e.g. 20" className={inputCls(isLightMode)} />
            </div>
          </div>
          <div>
            <label className={labelCls(isLightMode)}>Which exam?</label>
            <div className="flex flex-wrap gap-2">
              {[...EXAM_PRESETS, 'Other'].map((p) => (
                <button type="button" key={p} onClick={() => setExamChoice(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer border transition ${examChoice === p ? 'bg-cyan-500 text-slate-950 border-cyan-400' : (isLightMode ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700')}`}>
                  {p === 'Other' ? 'Other exam...' : p}
                </button>
              ))}
            </div>
            {examChoice === 'Other' && <input value={customExam} onChange={(e) => setCustomExam(e.target.value)} maxLength={40} placeholder="Name of the exam, e.g. Pre-Board 1" className={`${inputCls(isLightMode)} mt-2 sm:max-w-xs`} />}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className={labelCls(isLightMode)}>Exam date (optional)</label>
              <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className={inputCls(isLightMode)} />
            </div>
            <div className={`text-sm font-black ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>{typedPct !== null && Number(obtained) <= Number(maximum) ? `= ${typedPct}%` : ''}</div>
          </div>
          {message && (
            <div className={`text-xs font-bold rounded-lg px-3 py-2.5 border ${message.type === 'ok' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>{message.text}</div>
          )}
          <button type="submit" disabled={saving} className="w-full sm:w-auto px-6 py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50">
            {saving ? 'Saving...' : 'Save marks'}
          </button>
          <p className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Saving the same subject and exam again simply corrects the earlier entry.</p>
        </form>
      )}

      {!showForm && message && (
        <div className={`text-xs font-bold rounded-lg px-3 py-2.5 border ${message.type === 'ok' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>{message.text}</div>
      )}

      {entries.length === 0 ? (
        <div className={`${card(isLightMode)} text-center py-10`}>
          <p className={`text-sm font-black ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>No school marks yet</p>
          <p className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{editable ? 'Press "Add marks" and enter your latest test to start tracking your progress.' : 'This student has not added any school marks yet.'}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {summary.map((s, k) => (
              <div key={s.subject} className={`${card(isLightMode)} !p-4`}>
                <p className="text-[10px] font-black uppercase tracking-wider font-mono" style={{ color: SERIES_COLORS[(k) % SERIES_COLORS.length] }}>{s.subject}</p>
                <p className={`text-2xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{s.latest}%</p>
                <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{s.latestExam}</p>
                <div className="mt-1.5 space-y-0.5">
                  <div><ChangeBadge change={s.change} /></div>
                  <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>best {s.best}% · average {s.average}%</p>
                </div>
              </div>
            ))}
          </div>

          <div className={card(isLightMode)}>
            <h3 className={`text-xs font-black uppercase tracking-wider font-mono mb-3 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>Progress over the exams</h3>
            <ProgressChart entries={entries} isLightMode={isLightMode} />
          </div>

          <div className="space-y-3">
            <h3 className={`text-xs font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>All exams</h3>
            {groups.slice().reverse().map((g) => (
              <div key={g.key} className={`${card(isLightMode)} !p-4`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{g.examName} <span className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{g.academicYear}</span></p>
                  <div className="flex items-center gap-2">
                    {g.overall !== null && g.entries.length > 1 && <span className="text-xs font-black text-cyan-400">Overall {g.overall}%</span>}
                    {editable && verificationReady && onVerify && (
                      g.entries.every((e) => e.verificationStatus === 'verified')
                        ? <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> All verified</span>
                        : <button onClick={() => setVerifying({ academicYear: g.academicYear, examName: g.examName })} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide cursor-pointer bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"><ShieldCheck className="w-3.5 h-3.5" /> Verify marks</button>
                    )}
                  </div>
                </div>
                <div className={`divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800'}`}>
                  {g.entries.map((e) => (
                    <div key={e.id} className="py-1.5">
                    <div className="flex items-center gap-3">
                      <span className={`flex-1 text-sm font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{e.subject}</span>
                      <span className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{e.marksObtained} / {e.maxMarks}</span>
                      <span className={`w-14 text-right text-sm font-black ${e.percentage >= 75 ? 'text-emerald-400' : e.percentage >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{e.percentage}%</span>
                      {e.verificationStatus === 'verified' && <span title="Checked against the school's own page" className="text-emerald-400"><ShieldCheck className="w-4 h-4" /></span>}
                      {(e.verificationStatus === 'mismatch' || e.verificationStatus === 'review') && <span title={e.verificationNote || ''} className={e.verificationStatus === 'review' ? 'text-amber-400' : 'text-rose-400'}><AlertTriangle className="w-4 h-4" /></span>}
                      {!editable && e.hasProof && onViewProof && (
                        <button title="View the uploaded page" onClick={async () => { const links = await onViewProof(e.id); setProofLinks((p) => ({ ...p, [e.id]: links })); }} className="p-1 rounded text-slate-500 hover:text-cyan-400 cursor-pointer"><FileText className="w-3.5 h-3.5" /></button>
                      )}
                      {editable && (
                        <>
                          <button onClick={() => startEdit(e)} title="Edit" className="p-1 rounded text-slate-500 hover:text-cyan-400 cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setToDelete(e)} title="Delete" className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </>
                      )}
                    </div>
                    {(e.verificationStatus === 'mismatch' || e.verificationStatus === 'review') && e.verificationNote && (
                      <p className={`mt-0.5 text-[11px] font-semibold ${e.verificationStatus === 'review' ? 'text-amber-400' : 'text-rose-400'}`}>{e.verificationNote}</p>
                    )}
                    {!editable && onDecide && (e.verificationStatus === 'review' || e.verificationStatus === 'mismatch') && (
                      <div className="mt-1 flex gap-2">
                        <button onClick={() => onDecide(e.id, 'approve')} className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide cursor-pointer bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25">Approve</button>
                        <button onClick={() => onDecide(e.id, 'reject')} className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide cursor-pointer bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25">Do not approve</button>
                      </div>
                    )}
                    {proofLinks[e.id] && (
                      <p className="mt-0.5 text-[11px] font-semibold text-cyan-400">{proofLinks[e.id].length === 0 ? 'No page found.' : proofLinks[e.id].map((u, i) => <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="underline mr-3">Page {i + 1}</a>)}</p>
                    )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {verifying && onVerify && (
        <VerifyMarksModal examLabel={`${verifying.examName} ${verifying.academicYear}`} isLightMode={isLightMode} onClose={() => setVerifying(null)} onSubmit={(files) => onVerify(verifying, files)} />
      )}

      {toDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setToDelete(null)}>
          <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-2xl border shadow-2xl p-6 space-y-4 text-center ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'}`}>
            <p className={`text-base font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Delete this entry?</p>
            <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>{toDelete.subject}, {toDelete.examName} {toDelete.academicYear}: {toDelete.marksObtained}/{toDelete.maxMarks}</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setToDelete(null)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer ${isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'}`}>Keep it</button>
              <button onClick={confirmDelete} className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer bg-red-500 text-white hover:bg-red-400">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
