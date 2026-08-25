import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Calculator, FlaskConical, Download, ArrowLeft, AlertTriangle, Loader2, GraduationCap } from 'lucide-react';

interface NcertDownloadsUser {
  email: string;
  token: string;
}

interface NcertDownloadsProps {
  isLightMode?: boolean;
  user: NcertDownloadsUser;
}

interface ReferenceFile {
  fileName: string;
  title: string;
}

const cardClass = (isLightMode: boolean) => `border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`;

// Only accounts with no class on their own profile (chiefly the admin's own login) ever need
// this -- a real student's class always comes from their profile automatically. Remembered in
// localStorage so it's picked once, not every visit.
const MANUAL_CLASS_STORAGE_KEY = 'ncertDownloads_manualClass';
const CLASS_OPTIONS = ['8th', '9th', '10th'] as const;

export function NcertDownloads({ isLightMode = false, user }: NcertDownloadsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsClassPick, setNeedsClassPick] = useState(false);
  const [classKey, setClassKey] = useState<string | null>(null);
  const [usingManualClass, setUsingManualClass] = useState(false);
  const [subjects, setSubjects] = useState<Record<string, ReferenceFile[]>>({ Maths: [], Science: [] });
  const [selectedSubject, setSelectedSubject] = useState<'Maths' | 'Science' | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const fetchAvailable = useCallback(async (overrideClassKey?: string) => {
    setLoading(true);
    setError(null);
    setNeedsClassPick(false);
    try {
      const manual = overrideClassKey || localStorage.getItem(MANUAL_CLASS_STORAGE_KEY) || '';
      const params = manual ? `?classKey=${encodeURIComponent(manual)}` : '';
      const resp = await fetch(`/api/revision/reference-books/mine${params}`, { headers: { Authorization: `Bearer ${user.token}` } });
      const data = await resp.json();
      if (!resp.ok) {
        if (/couldn.t determine your class/i.test(data.error || '')) {
          setNeedsClassPick(true);
          return;
        }
        throw new Error(data.error || 'Failed to load available chapters.');
      }
      setClassKey(data.classKey);
      setUsingManualClass(!!manual);
      setSubjects(data.subjects || { Maths: [], Science: [] });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => { fetchAvailable(); }, [fetchAvailable]);

  const handlePickClass = (picked: string) => {
    localStorage.setItem(MANUAL_CLASS_STORAGE_KEY, picked);
    setSelectedSubject(null);
    fetchAvailable(picked);
  };

  const handleChangeClass = () => {
    localStorage.removeItem(MANUAL_CLASS_STORAGE_KEY);
    setSelectedSubject(null);
    setNeedsClassPick(true);
    setClassKey(null);
  };

  const handleDownload = async (subject: 'Maths' | 'Science', file: ReferenceFile) => {
    if (!classKey) return;
    setDownloadError(null);
    setDownloadingFile(file.fileName);
    try {
      const params = new URLSearchParams({ classKey, subject, fileName: file.fileName });
      const resp = await fetch(`/api/revision/reference-books/download?${params.toString()}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to download this chapter.');
      }
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setDownloadError(err.message);
    } finally {
      setDownloadingFile(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Loader2 className={`w-8 h-8 mx-auto animate-spin ${isLightMode ? 'text-slate-400' : 'text-slate-600'}`} />
      </div>
    );
  }

  if (needsClassPick) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        <div>
          <h2 className={`text-xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <BookOpen className="w-5 h-5 text-cyan-400" /> Download NCERT
          </h2>
        </div>
        <div className={cardClass(isLightMode)}>
          <div className="flex items-start gap-3 mb-4">
            <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>Your account isn't linked to a class -- pick one to browse its NCERT chapters. This is remembered, so you won't be asked again.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {CLASS_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => handlePickClass(c)}
                className={`py-4 rounded-xl border text-sm font-black transition ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800 hover:border-cyan-500' : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500'}`}
              >
                Class {c.replace('th', '')}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className={cardClass(isLightMode)}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const subjectMeta = {
    Maths: { icon: Calculator, color: 'cyan' },
    Science: { icon: FlaskConical, color: 'emerald' },
  } as const;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className={`text-xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <BookOpen className="w-5 h-5 text-cyan-400" /> Download NCERT
          </h2>
          <p className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Chapter-wise NCERT PDFs for {usingManualClass ? `Class ${classKey?.replace('th', '')}` : 'your class'} -- pick a subject, then a chapter, to download it straight away.</p>
        </div>
        {usingManualClass && (
          <button onClick={handleChangeClass} className={`text-[11px] font-black uppercase tracking-wide shrink-0 ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}>
            Change Class
          </button>
        )}
      </div>

      {downloadError && (
        <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{downloadError}</div>
      )}

      {!selectedSubject ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(['Maths', 'Science'] as const).map((subject) => {
            const Icon = subjectMeta[subject].icon;
            const count = subjects[subject]?.length || 0;
            return (
              <button
                key={subject}
                onClick={() => count > 0 && setSelectedSubject(subject)}
                disabled={count === 0}
                className={`${cardClass(isLightMode)} text-left transition hover:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-inherit`}
              >
                <Icon className={`w-8 h-8 mb-3 ${subjectMeta[subject].color === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'}`} />
                <h3 className={`text-base font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{subject}</h3>
                <p className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{count > 0 ? `${count} chapter${count === 1 ? '' : 's'} available` : 'Not available yet'}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={cardClass(isLightMode)}>
          <button
            onClick={() => setSelectedSubject(null)}
            className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider mb-4 ${isLightMode ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Subjects
          </button>
          <h3 className={`text-sm font-black uppercase tracking-wide mb-3 ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>{selectedSubject}</h3>
          <ul className={`divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800'}`}>
            {(subjects[selectedSubject] || []).map((file) => (
              <li key={file.fileName} className="flex items-center justify-between gap-3 py-3">
                <span className={`text-sm font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>{file.title}</span>
                <button
                  onClick={() => handleDownload(selectedSubject, file)}
                  disabled={downloadingFile === file.fileName}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-cyan-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloadingFile === file.fileName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  {downloadingFile === file.fileName ? 'Downloading' : 'Download'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
