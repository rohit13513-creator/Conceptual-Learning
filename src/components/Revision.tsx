import React, { useState, useEffect, useRef, useCallback } from 'react';
import html2pdf from 'html2pdf.js';
import { PhotoUploader } from './PhotoUploader';
import { fetchJsonWithRetry, uploadWithRetry } from '../utils/uploadWithRetry';
import {
  BookOpen,
  Calendar,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  ChevronRight,
  AlertTriangle,
  Award,
  Info,
  ArrowLeft,
  ListChecks,
} from 'lucide-react';

interface RevisionUser {
  name: string;
  email: string;
  token: string;
  role?: 'admin' | 'student';
  studentClass?: string;
}

interface RevisionQuestion {
  id: string;
  sectionLabel: 'A' | 'B' | 'C' | 'D' | 'E';
  marks: number;
  text: string;
  // The step-by-step marking scheme -- only ever present once the paper's status is 'graded' (the
  // backend withholds it entirely while a paper is still being attempted).
  markingPoints?: string[];
}

interface RevisionPaper {
  id: string;
  subject: 'Maths' | 'Science';
  chapterName: string;
  totalMarks: number;
  timeAllottedMinutes: number;
  status: 'draft' | 'active' | 'submitted' | 'graded';
  startedAt: string | null;
  deadlineAt: string | null;
  questions: RevisionQuestion[];
  sections: { label: string; count: number; marks: number; kind: string }[];
  cycleNumber?: number;
  createdAt?: string;
}

interface RevisionSubmission {
  id: string;
  revisionPaperId: string;
  status: 'pending' | 'checked';
  aiScore: number | null;
  aiFeedback: string | null;
  firstAttemptScore?: number | null;
  firstAttemptFeedback?: string | null;
  isLate: boolean;
  submittedAt?: string | null;
}

interface RevisionSetup {
  mathsExamDate: string | null;
  mathsChapters: string[];
  mathsCompletedChapters: string[];
  scienceExamDate: string | null;
  scienceChapters: string[];
  scienceCompletedChapters: string[];
  fallbackClass?: string | null;
}

interface RevisionProps {
  isLightMode?: boolean;
  user: RevisionUser;
}

const SECTION_LABELS: Record<string, string> = { A: 'Section A -- Objective', B: 'Section B -- Short Answer', C: 'Section C -- Short Answer', D: 'Section D -- Competency Based', E: 'Section E -- Long Answer' };
const CLASS_TO_TARGET_CLIENT: Record<string, string> = { VIII: '8th', IX: '9th', X: '10th' };
const REVISION_SECTION_ORDER: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

const cardClass = (isLightMode: boolean) => `border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`;
const inputClass = (isLightMode: boolean) => `w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`;
const labelClass = (isLightMode: boolean) => `text-[9px] font-black uppercase tracking-wider block font-mono mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`;

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// How long after the 75-minute window a submission actually came in -- shown to the student purely
// as information (there is deliberately no score penalty for it in Revision, unlike Homework).
function formatLateBy(deadlineAt: string | null | undefined, submittedAt: string | null | undefined): string | null {
  if (!deadlineAt || !submittedAt) return null;
  const diffMs = new Date(submittedAt).getTime() - new Date(deadlineAt).getTime();
  if (diffMs <= 0) return null;
  const totalMin = Math.round(diffMs / 60000);
  if (totalMin < 1) return 'under a minute';
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m} minute${m === 1 ? '' : 's'}`;
  return `${h} hour${h === 1 ? '' : 's'}${m > 0 ? ` ${m} minute${m === 1 ? '' : 's'}` : ''}`;
}

interface RevisionFeedbackRow {
  questionId: string;
  awarded: number;
  max: number;
  reason: string;
}

// aiFeedback is stored as one plain-text blob: an overall summary line, then one "id: x/y" or
// "id: x/y -- reason" line per question (server.ts checkRevisionSubmission). Splitting it back out
// here lets every question render as its own clearly separated row instead of one dense paragraph --
// directly what students asked for ("always show result question wise").
function parseRevisionFeedback(raw: string): { overall: string; rows: RevisionFeedbackRow[] } {
  const lines = raw.split('\n');
  const rows: RevisionFeedbackRow[] = [];
  const overallLines: string[] = [];
  const rowPattern = /^([A-Za-z]\d+):\s*(\d+)\/(\d+)(?:\s*--\s*(.*))?$/;
  for (const line of lines) {
    const match = rowPattern.exec(line.trim());
    if (match) {
      rows.push({ questionId: match[1], awarded: Number(match[2]), max: Number(match[3]), reason: match[4] || '' });
    } else if (line.trim()) {
      overallLines.push(line.trim());
    }
  }
  return { overall: overallLines.join(' '), rows };
}

export function Revision({ isLightMode = false, user }: RevisionProps) {
  const [loading, setLoading] = useState(true);
  const [setup, setSetup] = useState<RevisionSetup | null>(null);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [currentPaper, setCurrentPaper] = useState<RevisionPaper | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<RevisionSubmission | null>(null);
  const [generating, setGenerating] = useState(false);
  // A ref alongside the `generating` state: React state updates aren't visible until the next
  // render, so a fast double-tap on "I'm Ready" can fire handleConfirmChapterChoice twice before
  // the button actually disables -- each call generates a paper via a real Claude call, so a race
  // here directly costs API spend, not just a UI glitch. The ref is set synchronously, closing
  // that gap regardless of render timing.
  const generatingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);

  // Setup form fields
  const [mathsSelectedChapters, setMathsSelectedChapters] = useState<string[]>([]);
  const [mathsDropdownPick, setMathsDropdownPick] = useState('');
  const [mathsNoExam, setMathsNoExam] = useState(false);
  const [mathsExamDate, setMathsExamDate] = useState('');
  const [scienceSelectedChapters, setScienceSelectedChapters] = useState<string[]>([]);
  const [scienceDropdownPick, setScienceDropdownPick] = useState('');
  const [scienceNoExam, setScienceNoExam] = useState(false);
  const [scienceExamDate, setScienceExamDate] = useState('');
  const [fallbackClass, setFallbackClass] = useState('');
  const [savingSetup, setSavingSetup] = useState(false);

  // Dropdown/checklist chapter picker -- the default, recommended way to set a syllabus, since
  // picking from the real chapter list can never be mis-typed or need correcting (unlike Type
  // Chapters/Upload Photo, which still exist as a fallback for anything not in the list). Class 8
  // is the one class where old and new NCERT are both genuinely still in use in schools, so it
  // alone gets an "Old NCERT / New NCERT" choice that changes which chapter list is offered.
  const [ncertVersion, setNcertVersion] = useState<'new' | 'old'>('new');
  const [chapterOptions, setChapterOptions] = useState<{ Maths: string[]; Science: string[] }>({ Maths: [], Science: [] });
  const [chapterOptionsLoading, setChapterOptionsLoading] = useState(false);
  const [chapterOptionsError, setChapterOptionsError] = useState<string | null>(null);
  const effectiveClassKey = user.studentClass ? CLASS_TO_TARGET_CLIENT[user.studentClass] : (fallbackClass || setup?.fallbackClass || null);
  const isClass8 = effectiveClassKey === '8th';

  // Active/timer
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  // Full paper/submission history (up to the last 20 of each, per /api/revision/mine) -- kept
  // separately from currentPaper/currentSubmission (which only ever track the single latest one)
  // so a student can browse and re-download every paper they've already given, with both their
  // first-attempt and post-improvement scores, not just their most recent attempt.
  const [allPapers, setAllPapers] = useState<RevisionPaper[]>([]);
  const [allSubmissions, setAllSubmissions] = useState<RevisionSubmission[]>([]);
  const [showPastPapers, setShowPastPapers] = useState(false);
  const [expandedPastPaperId, setExpandedPastPaperId] = useState<string | null>(null);
  const [pastPaperPdfTarget, setPastPaperPdfTarget] = useState<RevisionPaper | null>(null);
  const [pastPaperPdfDownloading, setPastPaperPdfDownloading] = useState<string | null>(null);
  const pastPaperPrintRef = useRef<HTMLDivElement>(null);

  // Whether the per-question marking-scheme breakdown is expanded on the result screen -- reset
  // whenever a new paper/submission comes into view so it doesn't carry over from a previous one.
  const [showSolution, setShowSolution] = useState(false);

  // True from the moment "Improve Score" is clicked until either a new resubmission is uploaded
  // or the student leaves for a different chapter. Needed for two reasons: (1) it distinguishes
  // "resubmitting this same paper" from the unrelated recovery fallback that also shows when a
  // submitted paper has no matching submission record, which would otherwise wrongly bounce the
  // student to the chapter picker (with the very chapter they're improving now shown as done and
  // disabled) instead of back to the upload form; (2) it's the trigger to strip the just-graded
  // paper's markingPoints out of memory before showing it again, so the answer key a student saw
  // on the result screen isn't still sitting in state while they re-attempt the same paper.
  const [improvingScore, setImprovingScore] = useState(false);

  // Chapter breakdown/picker -- a student always sees which chapter they're about to be tested on
  // and picks it themselves from their own syllabus, before anything is generated. pendingChoice
  // holds the just-tapped chapter while the "are you ready" confirmation is open; nothing is
  // generated until that's confirmed.
  const [pendingChoice, setPendingChoice] = useState<{ subject: 'Maths' | 'Science'; chapterName: string } | null>(null);

  // Submission upload
  const [uploadMode, setUploadMode] = useState<'photos' | 'pdf'>('photos');
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [photoTempPaths, setPhotoTempPaths] = useState<string[]>([]);
  const [photosUploading, setPhotosUploading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [checkingNow, setCheckingNow] = useState(false);

  const paperPrintRef = useRef<HTMLDivElement>(null);
  const needsClassPicker = !user.studentClass && !fallbackClass && !setup?.fallbackClass;

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [setupResp, mineResp] = await Promise.all([
        fetch('/api/revision/setup', { headers: { Authorization: `Bearer ${user.token}` } }).then((r) => r.json()),
        fetch('/api/revision/mine', { headers: { Authorization: `Bearer ${user.token}` } }).then((r) => r.json()),
      ]);
      const loadedSetup: RevisionSetup | null = setupResp?.setup || null;
      setSetup(loadedSetup);
      // Auto-open the setup form whenever there's no syllabus to show yet -- not just when the
      // setup row itself is missing. A student can save an exam date without ever picking a
      // chapter (row exists, both chapter lists empty); without this check they'd land on a
      // dead-end summary screen with no chapters and no way back into the editor (see the button
      // visibility fix below for the other half of this).
      const loadedHasChapters = (loadedSetup?.mathsChapters?.length || 0) > 0 || (loadedSetup?.scienceChapters?.length || 0) > 0;
      if (!loadedHasChapters) setShowSetupForm(true);
      const papers: RevisionPaper[] = mineResp?.papers || [];
      const submissions: RevisionSubmission[] = mineResp?.submissions || [];
      setAllPapers(papers);
      setAllSubmissions(submissions);
      if (papers.length > 0) {
        const latest = papers[0];
        setCurrentPaper(latest);
        setCurrentSubmission(submissions.find((s) => s.revisionPaperId === latest.id) || null);
      }
    } catch (e: any) {
      setError('Failed to load your revision data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Fetches the real chapter list to offer in the dropdown for both subjects at once -- refetched
  // whenever the setup form opens, again if a Class 8 student switches Old/New NCERT, and again the
  // moment a class becomes known (an account with no class on file -- chiefly the admin's own login
  // -- can't be given a chapter list until the fallback-class picker below is actually filled in;
  // previously the fetch just silently returned nothing to select with no explanation why).
  const fetchChapterOptions = useCallback(async (version: 'new' | 'old') => {
    setChapterOptionsLoading(true);
    setChapterOptionsError(null);
    try {
      // A class picked in the fallback-class selector only lives in local state until the whole
      // form is saved -- pass it straight through as an override so the chapter list appears
      // immediately after picking a class, not only after a full save-then-reload round trip.
      const classOverride = fallbackClass ? `&classKey=${fallbackClass}` : '';
      const [mathsResp, scienceResp] = await Promise.all([
        fetch(`/api/revision/chapter-options?subject=Maths&version=${version}${classOverride}`, { headers: { Authorization: `Bearer ${user.token}` } }).then(async (r) => ({ ok: r.ok, data: await r.json() })),
        fetch(`/api/revision/chapter-options?subject=Science&version=${version}${classOverride}`, { headers: { Authorization: `Bearer ${user.token}` } }).then(async (r) => ({ ok: r.ok, data: await r.json() })),
      ]);
      if (!mathsResp.ok || !scienceResp.ok) {
        throw new Error((!mathsResp.ok ? mathsResp.data.error : scienceResp.data.error) || 'Failed to load the chapter list.');
      }
      setChapterOptions({ Maths: mathsResp.data.chapters || [], Science: scienceResp.data.chapters || [] });
    } catch (err: any) {
      setChapterOptions({ Maths: [], Science: [] });
      setChapterOptionsError(err.message === 'We couldn\'t determine your class. Please pick a class in the revision setup.'
        ? 'Pick your class below first, then the chapter list will appear.'
        : 'Could not load the chapter list -- you can still type your chapters or upload a photo instead.');
    } finally {
      setChapterOptionsLoading(false);
    }
  }, [user.token, fallbackClass]);

  useEffect(() => {
    if (showSetupForm) fetchChapterOptions(ncertVersion);
  }, [showSetupForm, ncertVersion, fetchChapterOptions]);

  // Opening the form for editing starts the dropdown picker from whatever chapters are already
  // saved, so a student adding one more chapter doesn't lose everything else already there --
  // matching how the setup form is otherwise a "resume editing" experience, not a blank slate.
  useEffect(() => {
    if (showSetupForm && setup) {
      setMathsSelectedChapters(setup.mathsChapters || []);
      setScienceSelectedChapters(setup.scienceChapters || []);
    }
  }, [showSetupForm, setup]);

  useEffect(() => {
    if (!currentPaper || currentPaper.status !== 'active' || !currentPaper.deadlineAt) { setRemainingMs(null); return; }
    const deadline = new Date(currentPaper.deadlineAt).getTime();
    const tick = () => setRemainingMs(deadline - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [currentPaper]);

  const handleSaveSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    // A setup saved with zero chapters in both subjects is a dead end -- there's nothing to
    // generate a paper from, and (before this check existed) several students ended up exactly
    // here: they filled in an exam date and the form let them save successfully with no chapters
    // added at all, silently producing a syllabus that could never do anything. Block it at the
    // source with a clear message instead of allowing an unusable setup to be saved.
    if (mathsSelectedChapters.length === 0 && scienceSelectedChapters.length === 0) {
      setError('Please add at least one chapter (Maths or Science) before saving your syllabus.');
      return;
    }
    setSavingSetup(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('mathsSyllabusChapters', JSON.stringify(mathsSelectedChapters));
      form.append('mathsExamDate', mathsNoExam ? '' : mathsExamDate);
      form.append('scienceSyllabusChapters', JSON.stringify(scienceSelectedChapters));
      form.append('scienceExamDate', scienceNoExam ? '' : scienceExamDate);
      if (fallbackClass) form.append('fallbackClass', fallbackClass);
      const result = await uploadWithRetry({ url: '/api/revision/setup', token: user.token, formData: form });
      if (!result.ok) throw new Error(result.data.error || 'Failed to save your syllabus.');
      setShowSetupForm(false);
      await loadAll();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingSetup(false);
    }
  };

  // Generates the confirmed chapter's paper and immediately starts its timer in one go -- by the
  // time a student has picked a chapter and confirmed they're ready, there's no reason to make
  // them tap "Start Now" separately afterward. handleStartNow below is kept only to resume a paper
  // that was left in 'draft' (generated but not started) by an interrupted request.
  const handleConfirmChapterChoice = async () => {
    if (!pendingChoice || generatingRef.current) return;
    generatingRef.current = true;
    setGenerating(true);
    setError(null);
    try {
      const genResult = await fetchJsonWithRetry({ url: '/api/revision/generate-paper', token: user.token, body: { subject: pendingChoice.subject, chapterName: pendingChoice.chapterName } });
      if (!genResult.ok) throw new Error(genResult.data.error || 'Failed to generate a paper right now.');
      const paper: RevisionPaper = genResult.data.paper;
      const startResult = await fetchJsonWithRetry({ url: `/api/revision/start/${paper.id}`, token: user.token, body: {} });
      if (!startResult.ok) throw new Error(startResult.data.error || 'Failed to start the paper.');
      setCurrentPaper({ ...paper, status: 'active', startedAt: startResult.data.startedAt, deadlineAt: startResult.data.deadlineAt });
      setCurrentSubmission(null);
      setPendingChoice(null);
      setImprovingScore(false);
      setShowDeadlineModal(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      generatingRef.current = false;
      setGenerating(false);
    }
  };

  const handleStartNow = async () => {
    if (!currentPaper) return;
    setError(null);
    try {
      const result = await fetchJsonWithRetry({ url: `/api/revision/start/${currentPaper.id}`, token: user.token, body: {} });
      if (!result.ok) throw new Error(result.data.error || 'Failed to start the paper.');
      setCurrentPaper({ ...currentPaper, status: 'active', startedAt: result.data.startedAt, deadlineAt: result.data.deadlineAt });
      setShowDeadlineModal(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDownloadPaperPdf = () => {
    const element = paperPrintRef.current;
    if (!element || !currentPaper) return;
    const opt = {
      margin: [14, 14, 14, 14],
      filename: `Conceptual_Learning_${currentPaper.subject}_${currentPaper.chapterName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2.0, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };
    const html2pdfFunc = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default || (window as any).html2pdf;
    if (!html2pdfFunc) return;
    html2pdfFunc().set(opt).from(element).save();
  };

  // Starts a PDF download for a paper from "My Papers" -- just sets which paper the hidden print
  // node below should render; the actual html2pdf call happens in the effect right after, once
  // React has committed that paper's content into the DOM (setting state and immediately reading
  // the ref in the same tick would still show the PREVIOUS paper's content).
  const handleDownloadPastPaperPdf = (paper: RevisionPaper) => {
    setPastPaperPdfDownloading(paper.id);
    setPastPaperPdfTarget(paper);
  };

  useEffect(() => {
    if (!pastPaperPdfTarget) return;
    const element = pastPaperPrintRef.current;
    if (!element) { setPastPaperPdfDownloading(null); return; }
    const opt = {
      margin: [14, 14, 14, 14],
      filename: `Conceptual_Learning_${pastPaperPdfTarget.subject}_${pastPaperPdfTarget.chapterName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2.0, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };
    const html2pdfFunc = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default || (window as any).html2pdf;
    if (!html2pdfFunc) { setPastPaperPdfDownloading(null); setPastPaperPdfTarget(null); return; }
    html2pdfFunc().set(opt).from(element).save().then(() => {
      setPastPaperPdfDownloading(null);
      setPastPaperPdfTarget(null);
    });
  }, [pastPaperPdfTarget]);

  const handleSubmitAnswers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPaper) return;
    if (uploadMode === 'photos' && photoTempPaths.length === 0) return;
    if (uploadMode === 'pdf' && !pdfFile) return;
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    try {
      let result: { ok: boolean; data: any };
      if (uploadMode === 'photos') {
        setUploadProgress(100);
        result = await fetchJsonWithRetry({ url: '/api/revision/finalize-submission', token: user.token, body: { sessionId, paperId: currentPaper.id } });
      } else {
        const CHUNK_SIZE = 3 * 1024 * 1024;
        const file = pdfFile as File;
        const totalSize = file.size;
        let uploadedBytes = 0;
        let order = 0;
        for (let start = 0; start < file.size; start += CHUNK_SIZE) {
          const chunk = file.slice(start, start + CHUNK_SIZE);
          const chunkSize = chunk.size;
          const chunkForm = new FormData();
          chunkForm.append('sessionId', sessionId);
          chunkForm.append('order', String(order));
          chunkForm.append('chunk', chunk, 'chunk.part');
          const chunkResult = await uploadWithRetry({
            url: '/api/revision/upload-chunk',
            token: user.token,
            formData: chunkForm,
            onProgress: (fraction) => setUploadProgress(Math.round(((uploadedBytes + fraction * chunkSize) / totalSize) * 100)),
          });
          if (!chunkResult.ok) throw new Error(chunkResult.data.error || 'Failed to upload part of the PDF. Please try again.');
          uploadedBytes += chunkSize;
          order += 1;
          setUploadProgress(Math.round((uploadedBytes / totalSize) * 100));
        }
        result = await fetchJsonWithRetry({ url: '/api/revision/finalize-pdf-submission', token: user.token, body: { sessionId, paperId: currentPaper.id } });
      }
      if (!result.ok) throw new Error(result.data.error || 'Failed to upload your answers.');
      const submissionId = result.data.submission?.id;
      setPhotoTempPaths([]);
      setSessionId(crypto.randomUUID());
      setPdfFile(null);
      setCurrentPaper((p) => (p ? { ...p, status: 'submitted' } : p));
      setCurrentSubmission({ id: submissionId, revisionPaperId: currentPaper.id, status: 'pending', aiScore: null, aiFeedback: null, isLate: !!result.data.submission?.isLate, submittedAt: result.data.submission?.submittedAt });
      setImprovingScore(false);

      if (submissionId) {
        setCheckingNow(true);
        try {
          const checkResult = await fetchJsonWithRetry({ url: '/api/revision/check-mine', token: user.token, body: { submissionId } });
          if (checkResult.ok && checkResult.data.submission) {
            setCurrentSubmission(checkResult.data.submission);
            if (checkResult.data.submission.status === 'checked') {
              setCurrentPaper((p) => (p ? { ...p, status: 'graded' } : p));
              // A graded submission just marked a chapter "done this cycle" server-side -- refetch
              // so the syllabus summary above (chapter counts) doesn't sit stale until next reload.
              fetch('/api/revision/setup', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((r) => r.json())
                .then((d) => { if (d?.setup) setSetup(d.setup); })
                .catch(() => {});
              // The paper still held in memory was fetched before grading, so it has no
              // markingPoints yet (the backend only includes them once status is 'graded') --
              // refetch it now so "View Solution" actually has something to show.
              fetch('/api/revision/mine', { headers: { Authorization: `Bearer ${user.token}` } })
                .then((r) => r.json())
                .then((d) => {
                  const graded = (d?.papers || []).find((p: RevisionPaper) => p.id === currentPaper.id);
                  if (graded) setCurrentPaper(graded);
                })
                .catch(() => {});
            }
          }
        } catch {
          // Already told the student it's uploaded -- grading will be retried automatically.
        } finally {
          setCheckingNow(false);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImproveScore = () => {
    setCurrentSubmission(null);
    setError(null);
    setShowSolution(false);
    setImprovingScore(true);
    // Put the same paper back in front of the student to re-attempt, with the marking scheme/
    // answer key they just saw on the result screen stripped back out -- they must solve it again
    // without the answers available, exactly as if they were seeing it for the first time.
    setCurrentPaper((p) => (p ? { ...p, status: 'submitted', questions: p.questions.map((q) => ({ ...q, markingPoints: undefined })) } : p));
  };

  const handleNextChapter = () => {
    setCurrentPaper(null);
    setCurrentSubmission(null);
    setShowSolution(false);
    setImprovingScore(false);
  };

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center h-full ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
        <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading your revision...</p>
      </div>
    );
  }

  if (showGuidelines) {
    const section = (icon: React.ElementType, title: string, lines: string[], iconColor: string) => {
      const Icon = icon;
      return (
        <div className={`${cardClass(isLightMode)} space-y-3`}>
          <h2 className={`text-sm font-black flex items-center gap-2 uppercase tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <Icon className={`w-4 h-4 ${iconColor}`} /> {title}
          </h2>
          <ul className="space-y-2">
            {lines.map((line, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                <span className={`mt-0.5 shrink-0 ${iconColor}`}>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    return (
      <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
        <div className="max-w-3xl mx-auto space-y-6">
          <button onClick={() => setShowGuidelines(false)} className={`flex items-center gap-1.5 text-xs font-bold cursor-pointer ${isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Revision
          </button>

          <div className={`${cardClass(isLightMode)} space-y-2`}>
            <h1 className={`text-xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              <ListChecks className="w-5 h-5 text-cyan-400" /> Revision Guidelines
            </h1>
            <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Everything about how Revision works, how your paper is set, and exactly how it's checked -- read this once so there are no surprises.
            </p>
          </div>

          {section(BookOpen, 'What Revision is for', [
            'Revision is separate from admin-posted Homework -- it\'s a self-serve practice tool you control yourself, for a half-yearly, pre-board, unit test, periodic test, final exam, or just for the habit of revising regularly.',
            'It is not graded coursework -- your admin/teacher can see your activity and scores in a report, but nothing here affects your Homework record.',
          ], 'text-cyan-400')}

          {section(Calendar, 'Setting your syllabus', [
            'Set your syllabus for Maths and/or Science by picking chapters from the dropdown list and hitting "Add", one at a time -- if you\'re in Class 8, pick Old or New NCERT first so the right chapter list shows up.',
            'For each subject, you can give an exam date, or tick "No exam -- just revising" if you\'re not preparing for a specific exam.',
            'You can edit your syllabus or exam dates at any time using "Edit Syllabus / Exam Dates" above.',
          ], 'text-cyan-400')}

          {section(RefreshCw, 'How your paper is picked', [
            'You choose the chapter yourself: every chapter from your own syllabus (Maths and Science) is listed, and you pick exactly which one you want to be tested on next -- nothing is generated until you choose.',
            'Chapters you\'ve already completed this cycle are shown but can\'t be picked again -- once every chapter in a subject is done, that subject\'s list resets and everything becomes pickable again, with fresh questions.',
            'You\'ll be asked to confirm you\'re ready before anything is generated, since the 60-minute timer starts the moment your paper is created -- so only confirm when you\'re actually about to sit down and attempt it.',
          ], 'text-cyan-400')}

          {section(Award, 'The paper itself', [
            'Every paper is a fixed 30-mark, 13-question CBSE-style paper: Section A (5 x 1 mark, objective/MCQ), Section B (3 x 2 marks), Section C (2 x 3 marks), Section D (2 x 4 marks, competency/case-based), Section E (1 x 5 marks, long answer).',
            'Section D and E questions are often split into 2-3 sub-parts (e.g. 1+2+2 or 2+1+2 marks) -- the same way current CBSE teachers usually set these, though a single complete question shows up sometimes too. Splitting a question into parts never changes its total marks.',
            'Science/Biology papers may include a "draw and label a diagram" style question -- a completely normal CBSE question type.',
            'Every paper is freshly written for you -- questions are never reused, even if you see the same chapter again in a later cycle.',
          ], 'text-cyan-400')}

          {section(Clock, 'Timing', [
            'You get 60 minutes to solve the paper, plus 15 extra minutes just to upload your answers -- 75 minutes total from the moment you tap "Start Now".',
            'Submitting after that window is never blocked -- you can still upload late.',
            'Late submission is shown on your result (e.g. "submitted 8 minutes after the time window") purely as information for you and your admin -- it does NOT reduce your score in any way. There is no late penalty in Revision.',
          ], 'text-amber-400')}

          {section(Download, 'Downloading and submitting', [
            'Use "Download Paper PDF" for a clean, printable copy -- just the heading, chapter name, marking scheme, time allotted, and the questions. No answers.',
            'Solve it on paper, then come back and submit photos of your pages (or a single PDF) -- exactly the same upload flow as Homework.',
          ], 'text-cyan-400')}

          {section(CheckCircle2, 'How your answers are checked', [
            'Grading follows genuine CBSE board step marking: every question in Sections B-E has its own step-by-step marking scheme (method/formula, substitution, working, final answer), and each step is checked and awarded independently.',
            'Section A (objective/MCQ) questions are all-or-nothing for their 1 mark -- there\'s no partial credit on these, since choosing an option isn\'t a multi-step working.',
            '"Error carried forward" applies: if you make an early mistake but correctly follow the right method afterward using your own (incorrect) value, you still get credit for those later correct steps -- one mistake doesn\'t wipe out the rest of the question.',
            'Handwriting quality and neatness are never marked down -- only the actual content of your answer matters.',
            'Your score is always the exact sum of the steps you were awarded -- never a rough estimate.',
          ], 'text-emerald-400')}

          {section(RefreshCw, 'Improving your score', [
            'If you didn\'t score full marks, an "Improve Score" button appears -- upload a fresh, complete attempt and it will be checked again from scratch.',
            'Once you\'re happy with a chapter\'s result, "Get Next Chapter" moves you on to your next paper.',
          ], 'text-cyan-400')}

          <button
            onClick={() => setShowGuidelines(false)}
            className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition"
          >
            Back to Revision
          </button>
        </div>
      </div>
    );
  }

  const mathsHasChapters = (setup?.mathsChapters?.length || 0) > 0;
  const scienceHasChapters = (setup?.scienceChapters?.length || 0) > 0;
  const hasAnySyllabus = mathsHasChapters || scienceHasChapters;

  return (
    <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
      <div className="max-w-3xl mx-auto space-y-6">

        <div className={cardClass(isLightMode)}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className={`text-lg font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              <BookOpen className="w-5 h-5 text-cyan-400" /> Revision
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowGuidelines(true)}
                className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-wide cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}
              >
                <Info className="w-3.5 h-3.5" /> Guidelines
              </button>
              <button
                type="button"
                onClick={() => setShowPastPapers((v) => !v)}
                className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-wide cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}
              >
                <ListChecks className="w-3.5 h-3.5" /> {showPastPapers ? 'Hide My Papers' : 'My Papers'}
              </button>
              {/* Always available as an escape hatch, not just when a syllabus is already saved --
                  otherwise a student who saves an exam date without picking any chapters (setup
                  row exists, chapter lists empty) has no button anywhere to get back into the
                  editor at all, only a dead-end "add your syllabus above" message. */}
              <button
                type="button"
                onClick={() => setShowSetupForm((v) => !v)}
                className={`text-[11px] font-black uppercase tracking-wide cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}
              >
                {showSetupForm ? 'Hide Syllabus Editor' : hasAnySyllabus ? 'Edit Syllabus / Exam Dates' : 'Add Syllabus'}
              </button>
            </div>
          </div>
          <p className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Set your syllabus once, then work through fresh 30-mark practice papers, one chapter at a time -- for a half-yearly, pre-board, unit test, or just for the habit of revising.
          </p>

          {hasAnySyllabus && !showSetupForm && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
              <div className={`p-3 rounded-xl border text-xs font-semibold ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <span className={`block text-[10px] font-black uppercase tracking-wider font-mono mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Maths</span>
                {mathsHasChapters ? (
                  <>
                    <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>{setup!.mathsChapters.length} chapter{setup!.mathsChapters.length === 1 ? '' : 's'} -- {setup!.mathsCompletedChapters.length} done this cycle</span>
                    <span className="block text-amber-400 mt-0.5">{setup!.mathsExamDate ? `Exam: ${new Date(setup!.mathsExamDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : 'No exam date -- just revising'}</span>
                  </>
                ) : <span className={isLightMode ? 'text-slate-400' : 'text-slate-600'}>Not set up</span>}
              </div>
              <div className={`p-3 rounded-xl border text-xs font-semibold ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <span className={`block text-[10px] font-black uppercase tracking-wider font-mono mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Science</span>
                {scienceHasChapters ? (
                  <>
                    <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>{setup!.scienceChapters.length} chapter{setup!.scienceChapters.length === 1 ? '' : 's'} -- {setup!.scienceCompletedChapters.length} done this cycle</span>
                    <span className="block text-amber-400 mt-0.5">{setup!.scienceExamDate ? `Exam: ${new Date(setup!.scienceExamDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : 'No exam date -- just revising'}</span>
                  </>
                ) : <span className={isLightMode ? 'text-slate-400' : 'text-slate-600'}>Not set up</span>}
              </div>
            </div>
          )}
        </div>

        {showPastPapers && (
          <div className={cardClass(isLightMode)}>
            <h3 className={`text-sm font-black uppercase tracking-wide mb-3 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>My Papers</h3>
            {allPapers.length === 0 ? (
              <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>You haven't attempted any papers yet.</p>
            ) : (
              <div className="space-y-2">
                {allPapers.map((p) => {
                  const sub = allSubmissions.find((s) => s.revisionPaperId === p.id) || null;
                  const isExpanded = expandedPastPaperId === p.id;
                  const statusLabel = p.status === 'graded' ? 'Graded' : p.status === 'submitted' ? 'Awaiting check' : p.status === 'active' ? 'In progress' : 'Not started';
                  const statusColor = p.status === 'graded' ? (isLightMode ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20') : (isLightMode ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800 text-slate-400 border-slate-700');
                  return (
                    <div key={p.id} className={`rounded-xl border overflow-hidden ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                      <button
                        type="button"
                        onClick={() => setExpandedPastPaperId(isExpanded ? null : p.id)}
                        className={`w-full flex items-center justify-between gap-2 p-3 text-left cursor-pointer ${isLightMode ? 'bg-slate-50 hover:bg-slate-100' : 'bg-slate-950 hover:bg-slate-900'}`}
                      >
                        <div>
                          <p className={`text-xs font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{p.subject} -- {p.chapterName}</p>
                          <p className={`text-[10px] font-semibold mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide border ${statusColor}`}>{statusLabel}</span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''} ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className={`p-3 space-y-2.5 ${isLightMode ? 'bg-white' : 'bg-slate-900/40'}`}>
                          {sub ? (
                            <div className="flex flex-wrap gap-2">
                              {sub.firstAttemptScore != null && (
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-300'}`}>
                                  First attempt: {sub.firstAttemptScore} / {p.totalMarks}
                                </span>
                              )}
                              {sub.aiScore != null && (
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${isLightMode ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                  {sub.firstAttemptScore != null ? 'After improvement' : 'Score'}: {sub.aiScore} / {p.totalMarks}
                                </span>
                              )}
                              {sub.status === 'pending' && (
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${isLightMode ? 'bg-amber-50 text-amber-700' : 'bg-amber-500/10 text-amber-400'}`}>Being checked...</span>
                              )}
                            </div>
                          ) : (
                            <p className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Not submitted.</p>
                          )}
                          {p.status === 'graded' && (
                            <button
                              type="button"
                              onClick={() => handleDownloadPastPaperPdf(p)}
                              disabled={pastPaperPdfDownloading === p.id}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition disabled:opacity-50 ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                            >
                              <Download className="w-3.5 h-3.5" /> {pastPaperPdfDownloading === p.id ? 'Preparing PDF...' : 'Download Paper + Answers PDF'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Hidden print node for a past paper's PDF -- includes markingPoints (the official answer)
            since this is only ever offered for an already-graded paper, and the backend only
            reveals a paper's markingPoints once its status is 'graded'. */}
        <div className="fixed -left-[9999px] top-0" aria-hidden="true">
          <div ref={pastPaperPrintRef} style={{ background: '#ffffff', color: '#111111', padding: '24px', width: '700px', fontFamily: 'Georgia, serif' }}>
            {pastPaperPdfTarget && (
              <>
                <h1 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Conceptual Learning -- Paper with Answers</h1>
                <p style={{ textAlign: 'center', fontSize: '13px', marginBottom: '16px' }}>{pastPaperPdfTarget.subject} -- {pastPaperPdfTarget.chapterName}</p>
                <table style={{ width: '100%', fontSize: '12px', marginBottom: '16px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '4px 0' }}><b>Time Allotted:</b> {pastPaperPdfTarget.timeAllottedMinutes} minutes</td>
                      <td style={{ padding: '4px 0', textAlign: 'right' }}><b>Maximum Marks:</b> {pastPaperPdfTarget.totalMarks}</td>
                    </tr>
                  </tbody>
                </table>
                {REVISION_SECTION_ORDER.map((label) => {
                  const qs = pastPaperPdfTarget.questions.filter((q) => q.sectionLabel === label);
                  if (qs.length === 0) return null;
                  return (
                    <div key={label} style={{ marginBottom: '14px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '6px' }}>{SECTION_LABELS[label]}</h3>
                      {qs.map((q) => (
                        <div key={q.id} style={{ margin: '8px 0' }}>
                          <p style={{ fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
                            <b>{q.id}.</b> {q.text} <i>[{q.marks} mark{q.marks > 1 ? 's' : ''}]</i>
                          </p>
                          {q.markingPoints && q.markingPoints.length > 0 && (
                            <div style={{ marginTop: '3px', paddingLeft: '14px', borderLeft: '2px solid #ccc' }}>
                              {q.markingPoints.map((mp, i) => (
                                <p key={i} style={{ fontSize: '11px', margin: '2px 0', color: '#1a7a3d' }}>-- {mp}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {showSetupForm && (
          <form onSubmit={handleSaveSetup} className={`${cardClass(isLightMode)} space-y-5`}>
            <h3 className={`text-sm font-black uppercase tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Your Syllabus</h3>

            {needsClassPicker && (
              <div className="space-y-1.5">
                <label className={labelClass(isLightMode)}>Your Class</label>
                <select value={fallbackClass} onChange={(e) => setFallbackClass(e.target.value)} required className={inputClass(isLightMode)}>
                  <option value="">Choose a class...</option>
                  <option value="8th">Class VIII</option>
                  <option value="9th">Class IX</option>
                  <option value="10th">Class X</option>
                </select>
                <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>We couldn't find a class on your account -- pick one first so the right chapter list appears below.</p>
              </div>
            )}

            {isClass8 && (
              <div className={`p-3 rounded-xl border space-y-2 ${isLightMode ? 'bg-amber-50 border-amber-200' : 'bg-amber-500/10 border-amber-500/20'}`}>
                <label className={labelClass(isLightMode)}>Which NCERT are you following?</label>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => setNcertVersion('new')} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition ${ncertVersion === 'new' ? 'bg-cyan-500 text-slate-950' : (isLightMode ? 'bg-white text-slate-600 border border-amber-200' : 'bg-slate-900 text-slate-400 border border-amber-500/20')}`}>New NCERT (Ganita Prakash / Curiosity)</button>
                  <button type="button" onClick={() => setNcertVersion('old')} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition ${ncertVersion === 'old' ? 'bg-cyan-500 text-slate-950' : (isLightMode ? 'bg-white text-slate-600 border border-amber-200' : 'bg-slate-900 text-slate-400 border border-amber-500/20')}`}>Old NCERT</button>
                </div>
                <p className={`text-[10px] font-semibold ${isLightMode ? 'text-amber-800' : 'text-amber-300'}`}>Most schools have switched to the new NCERT -- only pick "Old" if your school is still teaching from the earlier books.</p>
              </div>
            )}

            {([
              { key: 'maths', label: 'Maths', selected: mathsSelectedChapters, setSelected: setMathsSelectedChapters, dropdownPick: mathsDropdownPick, setDropdownPick: setMathsDropdownPick, noExam: mathsNoExam, setNoExam: setMathsNoExam, examDate: mathsExamDate, setExamDate: setMathsExamDate },
              { key: 'science', label: 'Science', selected: scienceSelectedChapters, setSelected: setScienceSelectedChapters, dropdownPick: scienceDropdownPick, setDropdownPick: setScienceDropdownPick, noExam: scienceNoExam, setNoExam: setScienceNoExam, examDate: scienceExamDate, setExamDate: setScienceExamDate },
            ] as const).map((s) => {
              const availableOptions = chapterOptions[s.label].filter((c) => !s.selected.includes(c));
              return (
              <div key={s.key} className={`p-4 rounded-xl border space-y-3 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <h4 className={`text-xs font-black uppercase tracking-wide ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{s.label}</h4>

                <div className="space-y-1.5">
                  <label className={labelClass(isLightMode)}>Syllabus (chapter names)</label>
                  <div className="space-y-2">
                    {chapterOptionsError && (
                      <p className={`text-[10px] font-semibold ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`}>{chapterOptionsError}</p>
                    )}
                    <div className="flex gap-1.5">
                      <select
                        value={s.dropdownPick}
                        onChange={(e) => s.setDropdownPick(e.target.value)}
                        disabled={chapterOptionsLoading || availableOptions.length === 0}
                        className={`${inputClass(isLightMode)} disabled:opacity-50`}
                      >
                        <option value="">{chapterOptionsLoading ? 'Loading chapters...' : availableOptions.length === 0 ? 'No more chapters to add' : 'Choose a chapter...'}</option>
                        {availableOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => { if (s.dropdownPick) { s.setSelected([...s.selected, s.dropdownPick]); s.setDropdownPick(''); } }}
                        disabled={!s.dropdownPick}
                        className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wide rounded-xl cursor-pointer hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                      >
                        Add
                      </button>
                    </div>
                    {s.selected.length > 0 ? (
                      <ul className="space-y-1">
                        {s.selected.map((c) => (
                          <li key={c} className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${isLightMode ? 'bg-white border border-slate-200 text-slate-700' : 'bg-slate-900 border border-slate-800 text-slate-300'}`}>
                            {c}
                            <button type="button" onClick={() => s.setSelected(s.selected.filter((x) => x !== c))} className="text-red-400 hover:text-red-300 cursor-pointer shrink-0">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>No chapters added yet.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass(isLightMode)}>Exam Date</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="date"
                      value={s.examDate}
                      disabled={s.noExam}
                      onChange={(e) => s.setExamDate(e.target.value)}
                      className={`${inputClass(isLightMode)} w-auto disabled:opacity-40`}
                    />
                    <label className={`flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                      <input type="checkbox" checked={s.noExam} onChange={(e) => { s.setNoExam(e.target.checked); if (e.target.checked) s.setExamDate(''); }} />
                      No exam -- just revising
                    </label>
                  </div>
                </div>
              </div>
              );
            })}

            <button
              type="submit"
              disabled={savingSetup}
              className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingSetup ? 'Saving...' : 'Save Syllabus'}
            </button>
          </form>
        )}

        {!showSetupForm && hasAnySyllabus && (
          <>
            {!improvingScore && (!currentPaper || currentPaper.status === 'graded' || (currentPaper.status === 'submitted' && currentSubmission?.status !== 'checked' && currentSubmission?.status !== 'pending')) ? (
              <div className={`${cardClass(isLightMode)} space-y-4`}>
                <div>
                  <h3 className={`text-sm font-black uppercase tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Choose a Chapter</h3>
                  <p className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Pick which chapter from your own syllabus you want to be tested on next -- nothing is generated until you confirm.</p>
                </div>
                {([
                  { subject: 'Maths' as const, chapters: setup!.mathsChapters, completed: setup!.mathsCompletedChapters },
                  { subject: 'Science' as const, chapters: setup!.scienceChapters, completed: setup!.scienceCompletedChapters },
                ]).filter((s) => s.chapters.length > 0).map((s) => (
                  <div key={s.subject} className="space-y-2">
                    <h4 className={`text-[11px] font-black uppercase tracking-wide font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{s.subject}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.chapters.map((chapterName) => {
                        const done = s.completed.includes(chapterName);
                        return (
                          <button
                            key={chapterName}
                            type="button"
                            onClick={() => !done && setPendingChoice({ subject: s.subject, chapterName })}
                            disabled={done || generating}
                            className={`text-left p-3 rounded-lg border text-xs font-semibold transition ${done ? (isLightMode ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed') : (isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800 hover:border-cyan-500 cursor-pointer' : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500 cursor-pointer')}`}
                          >
                            {chapterName}
                            {done && <span className="block text-[9px] font-black uppercase tracking-wide mt-1 text-emerald-500">Done this cycle</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {currentPaper && currentPaper.status === 'draft' && (
              <div className={`${cardClass(isLightMode)} space-y-4`}>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono text-cyan-400">{currentPaper.subject}</span>
                  <h3 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{currentPaper.chapterName}</h3>
                  <p className={`text-xs font-semibold mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>30 marks -- 13 questions -- {currentPaper.timeAllottedMinutes} minutes</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleStartNow}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                  >
                    Start Now <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextChapter}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Choose a Different Chapter
                  </button>
                </div>
              </div>
            )}

            {currentPaper && (currentPaper.status === 'active' || currentPaper.status === 'submitted') && currentSubmission?.status !== 'checked' && (
              <div className={`${cardClass(isLightMode)} space-y-5`}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest font-mono text-cyan-400">{currentPaper.subject}{currentPaper.cycleNumber && currentPaper.cycleNumber > 1 ? ` -- Cycle ${currentPaper.cycleNumber}` : ''}</span>
                    <h3 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{currentPaper.chapterName}</h3>
                  </div>
                  {remainingMs !== null && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-black text-sm ${remainingMs <= 0 ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      <Clock className="w-4 h-4" /> {formatCountdown(remainingMs)}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDownloadPaperPdf}
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border cursor-pointer transition ${isLightMode ? 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20'}`}
                >
                  <Download className="w-4 h-4" /> Download Paper PDF
                </button>

                <div className="space-y-4">
                  {REVISION_SECTION_ORDER.map((label) => {
                    const qs = currentPaper.questions.filter((q) => q.sectionLabel === label);
                    if (qs.length === 0) return null;
                    return (
                      <div key={label} className="space-y-2">
                        <h4 className={`text-[11px] font-black uppercase tracking-wide font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{SECTION_LABELS[label]}</h4>
                        {qs.map((q) => (
                          <div key={q.id} className={`p-3 rounded-lg border text-sm font-semibold ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'}`}>
                            <span className="text-cyan-400 font-mono mr-1.5">{q.id}.</span>{q.text} <span className={`text-[10px] font-mono ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>[{q.marks} mark{q.marks > 1 ? 's' : ''}]</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmitAnswers} className={`border-t pt-4 space-y-3 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                  <h4 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    <Upload className="w-4 h-4 text-cyan-400" /> Submit Your Answers
                  </h4>
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => setUploadMode('photos')} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition ${uploadMode === 'photos' ? 'bg-cyan-500 text-slate-950' : (isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400')}`}>Photos</button>
                    <button type="button" onClick={() => setUploadMode('pdf')} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition ${uploadMode === 'pdf' ? 'bg-cyan-500 text-slate-950' : (isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400')}`}>Single PDF</button>
                  </div>
                  {uploadMode === 'photos' ? (
                    <PhotoUploader
                      key={sessionId}
                      token={user.token}
                      sessionId={sessionId}
                      isLightMode={isLightMode}
                      disabled={uploading}
                      accent="cyan"
                      endpoint="/api/revision/upload-photo"
                      onChange={(paths, isUp) => { setPhotoTempPaths(paths); setPhotosUploading(isUp); }}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      className={`w-full text-xs font-semibold file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase file:cursor-pointer cursor-pointer ${isLightMode ? 'text-slate-600 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200' : 'text-slate-400 file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700'}`}
                    />
                  )}
                  {uploading && (
                    <div className="space-y-1">
                      <div className={`h-2 rounded-full overflow-hidden ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'}`}>
                        <div className="h-full bg-cyan-400 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className={`text-[10px] font-bold text-right ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{checkingNow ? 'Checking your paper...' : `${uploadProgress}% uploaded`}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={uploading || photosUploading || (uploadMode === 'photos' ? photoTempPaths.length === 0 : !pdfFile)}
                    className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (checkingNow ? 'Checking...' : 'Uploading...') : 'Submit Answers'}
                  </button>
                </form>

                {/* Hidden print node for the downloadable paper PDF -- white background, black text, questions only. */}
                <div className="fixed -left-[9999px] top-0" aria-hidden="true">
                  <div ref={paperPrintRef} style={{ background: '#ffffff', color: '#111111', padding: '24px', width: '700px', fontFamily: 'Georgia, serif' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Conceptual Learning -- Sample Paper</h1>
                    <p style={{ textAlign: 'center', fontSize: '13px', marginBottom: '16px' }}>{currentPaper.subject} -- {currentPaper.chapterName}</p>
                    <table style={{ width: '100%', fontSize: '12px', marginBottom: '16px', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '4px 0' }}><b>Time Allotted:</b> {currentPaper.timeAllottedMinutes} minutes</td>
                          <td style={{ padding: '4px 0', textAlign: 'right' }}><b>Maximum Marks:</b> {currentPaper.totalMarks}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p style={{ fontSize: '11px', marginBottom: '16px', fontStyle: 'italic' }}>
                      Marking scheme: Section A -- 5 questions x 1 mark; Section B -- 3 questions x 2 marks; Section C -- 2 questions x 3 marks; Section D -- 2 questions x 4 marks; Section E -- 1 question x 5 marks.
                    </p>
                    {REVISION_SECTION_ORDER.map((label) => {
                      const qs = currentPaper.questions.filter((q) => q.sectionLabel === label);
                      if (qs.length === 0) return null;
                      return (
                        <div key={label} style={{ marginBottom: '14px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '6px' }}>{SECTION_LABELS[label]}</h3>
                          {qs.map((q) => (
                            <p key={q.id} style={{ fontSize: '12px', margin: '6px 0', lineHeight: 1.5 }}>
                              <b>{q.id}.</b> {q.text} <i>[{q.marks} mark{q.marks > 1 ? 's' : ''}]</i>
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {currentPaper && currentSubmission?.status === 'checked' && (
              <div className={`${cardClass(isLightMode)} space-y-4 text-center`}>
                <Award className="w-10 h-10 text-emerald-400 mx-auto" />
                <div>
                  <p className={`text-3xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{currentSubmission.aiScore ?? '--'} / {currentPaper.totalMarks}</p>
                  <p className={`text-xs font-bold mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{currentPaper.subject} -- {currentPaper.chapterName}</p>
                  {currentSubmission.isLate && (
                    <p className={`text-[11px] font-semibold mt-1.5 px-2.5 py-1 rounded-lg inline-block ${isLightMode ? 'bg-amber-50 text-amber-700' : 'bg-amber-500/10 text-amber-400'}`}>
                      Submitted {formatLateBy(currentPaper.deadlineAt, currentSubmission.submittedAt) || 'late'} after the time window closed -- this does not reduce your score.
                    </p>
                  )}
                </div>
                {currentSubmission.aiFeedback && (() => {
                  const { overall, rows } = parseRevisionFeedback(currentSubmission.aiFeedback);
                  return (
                    <div className="text-left space-y-3">
                      {overall && (
                        <p className={`text-xs font-semibold p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                          {overall}
                        </p>
                      )}
                      {rows.length > 0 && (
                        <div className={`rounded-lg border divide-y overflow-hidden ${isLightMode ? 'border-slate-200 divide-slate-200' : 'border-slate-800 divide-slate-800'}`}>
                          {rows.map((row) => {
                            const full = row.awarded === row.max;
                            return (
                              <div key={row.questionId} className={`flex items-start gap-3 px-3 py-2 ${isLightMode ? 'bg-white' : 'bg-slate-950'}`}>
                                <span className={`shrink-0 text-[11px] font-black font-mono w-8 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{row.questionId}</span>
                                <span className={`shrink-0 text-[11px] font-black font-mono ${full ? (isLightMode ? 'text-emerald-600' : 'text-emerald-400') : (isLightMode ? 'text-amber-600' : 'text-amber-400')}`}>
                                  {row.awarded}/{row.max}
                                </span>
                                {row.reason && (
                                  <span className={`text-[11px] font-semibold text-left ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>{row.reason}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}
                <div className="flex flex-wrap gap-2 justify-center">
                  {(currentSubmission.aiScore ?? 0) < currentPaper.totalMarks && (
                    <button
                      onClick={handleImproveScore}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                      Improve Score
                    </button>
                  )}
                  <button
                    onClick={() => setShowSolution((v) => !v)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                  <button
                    onClick={handleNextChapter}
                    disabled={generating}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer disabled:opacity-50"
                  >
                    {generating ? 'Generating...' : 'Get Next Chapter'} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {showSolution && (
                  <div className={`text-left space-y-4 border-t pt-4 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                    {!currentPaper.questions[0]?.markingPoints ? (
                      <p className={`text-xs font-semibold text-center ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading solution...</p>
                    ) : (
                      REVISION_SECTION_ORDER.map((label) => {
                        const qs = currentPaper.questions.filter((q) => q.sectionLabel === label);
                        if (qs.length === 0) return null;
                        return (
                          <div key={label} className="space-y-2">
                            <h4 className={`text-[11px] font-black uppercase tracking-wide font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{SECTION_LABELS[label]}</h4>
                            {qs.map((q) => (
                              <div key={q.id} className={`p-3 rounded-lg border text-sm ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                                <p className={`font-semibold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                                  <span className="text-cyan-400 font-mono mr-1.5">{q.id}.</span>{q.text}
                                </p>
                                <ul className="mt-2 space-y-1">
                                  {(q.markingPoints || []).map((mp, i) => (
                                    <li key={i} className={`flex items-start gap-1.5 text-xs font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> {mp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            )}

            {currentPaper && currentSubmission?.status === 'pending' && (
              <div className={`${cardClass(isLightMode)} text-center`}>
                <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>Your submission is being checked -- your score will appear here shortly.</p>
              </div>
            )}
          </>
        )}

        {!showSetupForm && !hasAnySyllabus && (
          <div className={`${cardClass(isLightMode)} text-center`}>
            <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>Add your syllabus above to get your first revision paper.</p>
          </div>
        )}

        {pendingChoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !generating && setPendingChoice(null)}>
            <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-2xl border shadow-2xl p-6 space-y-4 text-center ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'}`}>
              <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center ${isLightMode ? 'bg-cyan-100' : 'bg-cyan-500/10'}`}>
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest font-mono text-cyan-400">{pendingChoice.subject}</span>
                <h3 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{pendingChoice.chapterName}</h3>
              </div>
              <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Only generate this paper when you're fully prepared to attempt the test right now. Once it's generated, you'll have 60 minutes to complete it, plus 15 extra minutes after that to upload your answers -- the timer starts immediately.
              </p>
              {error && (
                <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-left">{error}</div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPendingChoice(null)}
                  disabled={generating}
                  className={`flex-1 py-2.5 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                >
                  Not Yet
                </button>
                <button
                  type="button"
                  onClick={handleConfirmChapterChoice}
                  disabled={generating}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? 'Generating...' : "I'm Ready"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeadlineModal && currentPaper && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeadlineModal(false)}>
            <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-2xl border shadow-2xl p-6 space-y-4 text-center ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'}`}>
              <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center ${isLightMode ? 'bg-amber-100' : 'bg-amber-500/10'}`}>
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Your Paper Has Started!</h3>
              <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                You have {currentPaper.timeAllottedMinutes} minutes to solve the paper, plus 15 extra minutes to upload your answers -- try to submit by {currentPaper.deadlineAt ? new Date(currentPaper.deadlineAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''}. Download the PDF, solve it on paper, then come back here to submit. Submitting later than this is fine too -- it's shown on your result for information only and never reduces your score.
              </p>
              <button onClick={() => setShowDeadlineModal(false)} className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition">
                Got It
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Revision;
