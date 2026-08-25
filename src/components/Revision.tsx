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
  ImagePlus,
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
}

interface RevisionSubmission {
  id: string;
  revisionPaperId: string;
  status: 'pending' | 'checked';
  aiScore: number | null;
  aiFeedback: string | null;
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

export function Revision({ isLightMode = false, user }: RevisionProps) {
  const [loading, setLoading] = useState(true);
  const [setup, setSetup] = useState<RevisionSetup | null>(null);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [currentPaper, setCurrentPaper] = useState<RevisionPaper | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<RevisionSubmission | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Setup form fields
  const [mathsMode, setMathsMode] = useState<'text' | 'image'>('text');
  const [mathsText, setMathsText] = useState('');
  const [mathsImage, setMathsImage] = useState<File | null>(null);
  const [mathsNoExam, setMathsNoExam] = useState(false);
  const [mathsExamDate, setMathsExamDate] = useState('');
  const [scienceMode, setScienceMode] = useState<'text' | 'image'>('text');
  const [scienceText, setScienceText] = useState('');
  const [scienceImage, setScienceImage] = useState<File | null>(null);
  const [scienceNoExam, setScienceNoExam] = useState(false);
  const [scienceExamDate, setScienceExamDate] = useState('');
  const [fallbackClass, setFallbackClass] = useState('');
  const [savingSetup, setSavingSetup] = useState(false);

  // Active/timer
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

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
      if (!loadedSetup) setShowSetupForm(true);
      const papers: RevisionPaper[] = mineResp?.papers || [];
      const submissions: RevisionSubmission[] = mineResp?.submissions || [];
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
    setSavingSetup(true);
    setError(null);
    try {
      const form = new FormData();
      if (mathsMode === 'text') form.append('mathsSyllabusText', mathsText);
      else if (mathsImage) form.append('mathsSyllabusImage', mathsImage);
      form.append('mathsExamDate', mathsNoExam ? '' : mathsExamDate);
      if (scienceMode === 'text') form.append('scienceSyllabusText', scienceText);
      else if (scienceImage) form.append('scienceSyllabusImage', scienceImage);
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
    if (!pendingChoice) return;
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
            'Set your syllabus for Maths and/or Science by typing chapter names (one per line) or uploading a photo of your syllabus/date-sheet page -- either works.',
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
              {hasAnySyllabus && (
                <button
                  type="button"
                  onClick={() => setShowSetupForm((v) => !v)}
                  className={`text-[11px] font-black uppercase tracking-wide cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}
                >
                  {showSetupForm ? 'Hide Syllabus Editor' : 'Edit Syllabus / Exam Dates'}
                </button>
              )}
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

        {error && (
          <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {showSetupForm && (
          <form onSubmit={handleSaveSetup} className={`${cardClass(isLightMode)} space-y-5`}>
            <h3 className={`text-sm font-black uppercase tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Your Syllabus</h3>

            {([
              { key: 'maths', label: 'Maths', mode: mathsMode, setMode: setMathsMode, text: mathsText, setText: setMathsText, image: mathsImage, setImage: setMathsImage, noExam: mathsNoExam, setNoExam: setMathsNoExam, examDate: mathsExamDate, setExamDate: setMathsExamDate },
              { key: 'science', label: 'Science', mode: scienceMode, setMode: setScienceMode, text: scienceText, setText: setScienceText, image: scienceImage, setImage: setScienceImage, noExam: scienceNoExam, setNoExam: setScienceNoExam, examDate: scienceExamDate, setExamDate: setScienceExamDate },
            ] as const).map((s) => (
              <div key={s.key} className={`p-4 rounded-xl border space-y-3 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <h4 className={`text-xs font-black uppercase tracking-wide ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{s.label}</h4>

                <div className="space-y-1.5">
                  <label className={labelClass(isLightMode)}>Syllabus (chapter names)</label>
                  <div className="flex gap-1.5 mb-1.5">
                    <button type="button" onClick={() => s.setMode('text')} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition ${s.mode === 'text' ? 'bg-cyan-500 text-slate-950' : (isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400')}`}>Type Chapters</button>
                    <button type="button" onClick={() => s.setMode('image')} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide cursor-pointer transition ${s.mode === 'image' ? 'bg-cyan-500 text-slate-950' : (isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400')}`}>Upload Photo</button>
                  </div>
                  {s.mode === 'text' ? (
                    <textarea
                      value={s.text}
                      onChange={(e) => s.setText(e.target.value)}
                      rows={3}
                      placeholder={`One chapter per line, e.g.\nReal Numbers\nPolynomials\nPair of Linear Equations`}
                      className={`${inputClass(isLightMode)} resize-none`}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => s.setImage(e.target.files?.[0] || null)}
                        className={`w-full text-xs font-semibold file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase file:cursor-pointer cursor-pointer ${isLightMode ? 'text-slate-600 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200' : 'text-slate-400 file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700'}`}
                      />
                      {s.image && <ImagePlus className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                  )}
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
            ))}

            {needsClassPicker && (
              <div className="space-y-1.5">
                <label className={labelClass(isLightMode)}>Your Class</label>
                <select value={fallbackClass} onChange={(e) => setFallbackClass(e.target.value)} required className={inputClass(isLightMode)}>
                  <option value="">Choose a class...</option>
                  <option value="8th">Class VIII</option>
                  <option value="9th">Class IX</option>
                  <option value="10th">Class X</option>
                </select>
                <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>We couldn't find a class on your account -- pick one so papers are set at the right difficulty.</p>
              </div>
            )}

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
                {currentSubmission.aiFeedback && (
                  <div className={`text-left text-xs font-semibold whitespace-pre-line p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                    {currentSubmission.aiFeedback}
                  </div>
                )}
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
