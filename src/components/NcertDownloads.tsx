import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Calculator, FlaskConical, Download, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';

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

export function NcertDownloads({ isLightMode = false, user }: NcertDownloadsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classKey, setClassKey] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Record<string, ReferenceFile[]>>({ Maths: [], Science: [] });
  const [selectedSubject, setSelectedSubject] = useState<'Maths' | 'Science' | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const fetchAvailable = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/revision/reference-books/mine', { headers: { Authorization: `Bearer ${user.token}` } });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to load available chapters.');
      setClassKey(data.classKey);
      setSubjects(data.subjects || { Maths: [], Science: [] });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => { fetchAvailable(); }, [fetchAvailable]);

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
      <div>
        <h2 className={`text-xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
          <BookOpen className="w-5 h-5 text-cyan-400" /> Download NCERT
        </h2>
        <p className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Chapter-wise NCERT PDFs for your class -- pick a subject, then a chapter, to download it straight away.</p>
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
