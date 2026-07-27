import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Zap, Compass, Award, FileText, ChevronRight, ChevronLeft,
  Layers, HelpCircle, Shield, CheckCircle, Search, Clock, RotateCcw,
  Check, X, AlertTriangle, HelpCircle as QuestionIcon, Target, BookOpenCheck
} from 'lucide-react';
import { 
  getCompetitionNotes, 
  getCompetitionQB_MCQs, 
  getCompetitionQB_Assertions, 
  getCompetitionSelfAssessment,
  CompetitionNotesModule
} from '../data/competitions';
import { QuizQuestion, AssertionReasonQuestion } from '../types-custom';

export function CompetitiveOptics({ 
  isLightMode = false,
  onCompleteNotes,
  onGoToSelfAssessment
}: { 
  isLightMode?: boolean; 
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}) {
  // Target level state
  const [targetGrade, setTargetGrade] = useState<'8th' | '10th'>('8th');
  
  // Navigation tabs: 'notes' | 'qb' | 'assessment'
  const [activeTab, setActiveTab] = useState<'notes' | 'qb' | 'assessment'>('notes');

  // --- TAB 1: DETAILED NOTES SYSTEM STATES ---
  const [activeModuleId, setActiveModuleId] = useState<string>('mod-1');

  // --- TAB 2: QUESTION BANK STATES ---
  const [qbType, setQbType] = useState<'mcq' | 'assertion'>('mcq');
  const [qbSearchQuery, setQbSearchQuery] = useState('');
  const [qbPage, setQbPage] = useState(0);
  const qbItemsPerPage = 6;
  const [verifiedQbAnswers, setVerifiedQbAnswers] = useState<{[key: string]: { selected: any, isCorrect: boolean, verified: boolean }}>({});

  // --- TAB 3: SELF-ASSESSMENT STATES ---
  const [assessmentStatus, setAssessmentStatus] = useState<'idle' | 'testing' | 'submitted'>('idle');
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({}); // qId -> optionIndex
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [examTimerInterval, setExamTimerInterval] = useState<any>(null);
  const [showReviewId, setShowReviewId] = useState<number>(1);

  // Load dynamically generated datasets based on target level
  const [notesData, setNotesData] = useState<CompetitionNotesModule[]>([]);
  const [mcqQbData, setMcqQbData] = useState<QuizQuestion[]>([]);
  const [assertionQbData, setAssertionQbData] = useState<AssertionReasonQuestion[]>([]);
  const [selfAssessmentData, setSelfAssessmentData] = useState<QuizQuestion[]>([]);

  // Regenerate datasets when target level changes
  useEffect(() => {
    const notes = getCompetitionNotes(targetGrade);
    const mQb = getCompetitionQB_MCQs(targetGrade);
    const aQb = getCompetitionQB_Assertions(targetGrade);
    const sa = getCompetitionSelfAssessment(targetGrade);

    setNotesData(notes);
    setMcqQbData(mQb);
    setAssertionQbData(aQb);
    setSelfAssessmentData(sa);

    // Reset temporary states
    setActiveModuleId('mod-1');
    setVerifiedQbAnswers({});
    setQbPage(0);
    setQbSearchQuery('');
    
    // Reset assessment if level changes
    if (assessmentStatus === 'testing') {
      clearInterval(examTimerInterval);
      setAssessmentStatus('idle');
    }
  }, [targetGrade]);

  // Handle countdown timer
  useEffect(() => {
    if (assessmentStatus === 'testing') {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            // Auto submit
            setAssessmentStatus('submitted');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setExamTimerInterval(interval);
      return () => clearInterval(interval);
    } else {
      if (examTimerInterval) {
        clearInterval(examTimerInterval);
      }
    }
  }, [assessmentStatus]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start self-assessment test
  const startSelfAssessment = () => {
    setUserAnswers({});
    setCurrentExamIndex(0);
    setTimeLeft(2705); // 45 minutes
    setAssessmentStatus('testing');
    setShowReviewId(1);
  };

  // Exit/reset assessment
  const resetAssessment = () => {
    if (confirm("Are you sure you want to exit or restart this assessment? Your current progression will be wiped.")) {
      setAssessmentStatus('idle');
      setUserAnswers({});
      setCurrentExamIndex(0);
    }
  };

  // Calculate scores on standard +2 / -0.5 negative scale
  const getExamResultMetrics = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    selfAssessmentData.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        unanswered++;
      } else if (ans === q.correctAnswer) {
        correct++;
        score += 2;
      } else {
        incorrect++;
        score -= 0.5;
      }
    });

    const totalQuestions = selfAssessmentData.length;
    const answeredCount = correct + incorrect;
    const accuracy = answeredCount > 0 ? Math.round((correct / answeredCount) * 100) : 0;

    return { score, correct, incorrect, unanswered, accuracy, totalQuestions };
  };

  // Verify a single question inside question bank tab
  const verifyQbAnswer = (qId: number, selectedIndex: number, correctIndex: number) => {
    const key = `mcq-${qId}`;
    setVerifiedQbAnswers(prev => ({
      ...prev,
      [key]: {
        selected: selectedIndex,
        isCorrect: selectedIndex === correctIndex,
        verified: true
      }
    }));
  };

  const verifyAssertionAnswer = (qId: number, selectedOption: "A" | "B" | "C" | "D", correctOption: "A" | "B" | "C" | "D") => {
    const key = `assert-${qId}`;
    setVerifiedQbAnswers(prev => ({
      ...prev,
      [key]: {
        selected: selectedOption,
        isCorrect: selectedOption === correctOption,
        verified: true
      }
    }));
  };

  // Filtering for Question Bank
  const filteredMcqs = mcqQbData.filter(q => 
    q.question.toLowerCase().includes(qbSearchQuery.toLowerCase()) ||
    q.explanation.toLowerCase().includes(qbSearchQuery.toLowerCase())
  );

  const filteredAssertions = assertionQbData.filter(q => 
    q.assertion.toLowerCase().includes(qbSearchQuery.toLowerCase()) ||
    q.reason.toLowerCase().includes(qbSearchQuery.toLowerCase()) ||
    q.explanation.toLowerCase().includes(qbSearchQuery.toLowerCase())
  );

  const paginatedMcqs = filteredMcqs.slice(qbPage * qbItemsPerPage, (qbPage + 1) * qbItemsPerPage);
  const paginatedAssertions = filteredAssertions.slice(qbPage * qbItemsPerPage, (qbPage + 1) * qbItemsPerPage);
  const totalQbPages = Math.ceil((qbType === 'mcq' ? filteredMcqs.length : filteredAssertions.length) / qbItemsPerPage);

  const metrics = assessmentStatus === 'submitted' ? getExamResultMetrics() : null;

  return (
    <div className={`w-full font-sans antialiased min-h-screen pb-12 ${
      isLightMode ? 'text-slate-800' : 'text-slate-100'
    }`}>
      {/* 1. Header Hero section */}
      <div className={`p-6 rounded-2xl shadow-2xl relative overflow-hidden mb-6 border ${
        isLightMode 
          ? 'bg-white border-slate-200' 
          : 'bg-[#090e1a]/80 border-slate-800/80'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30 select-none pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full filter blur-3xl opacity-20 select-none pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Olympiad & Competitive Prep
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
                Syllabus-Aligned
              </span>
            </div>
             <h1 className={`text-2xl font-black tracking-tight flex items-center gap-2.5 font-sans ${
              isLightMode ? 'text-slate-900' : 'text-slate-100'
            }`}>
              <Award className="w-7 h-7 text-cyan-400 animate-pulse" />
              Optics Competition Center
            </h1>
            <p className={`text-xs max-w-2xl leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Explore professional integrated modules, search physical question databases containing 150+ detailed problems, and challenge yourself with standard negative-marking self-assessments.
            </p>
          </div>

          {/* Target level Toggle */}
          <div className={`p-1 rounded-xl flex items-center w-full md:w-auto shadow-inner border ${
            isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#121826] border-slate-800'
          }`}>
            <button
              onClick={() => {
                setTargetGrade('8th');
              }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                targetGrade === '8th' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Class 8th Junior
            </button>
            <button
              onClick={() => {
                setTargetGrade('10th');
              }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                targetGrade === '10th' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md' 
                  : isLightMode ? 'text-slate-600 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Class 10th Senior
            </button>
          </div>
        </div>

        {/* 2. Top Navigation Tabs */}
        <div className={`flex mt-6 pt-5 flex-wrap gap-2.5 border-t ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`}>
          <button
            onClick={() => {
              if (assessmentStatus === 'testing' && !confirm("Exit test? Progression is wiped.")) return;
              setActiveTab('notes');
              if (assessmentStatus === 'testing') setAssessmentStatus('idle');
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'notes' && assessmentStatus !== 'testing' && assessmentStatus !== 'submitted'
                ? isLightMode 
                  ? 'bg-slate-200 border border-slate-300 text-slate-900 shadow-sm'
                  : 'bg-slate-800 border border-slate-700 text-white' 
                : isLightMode
                  ? 'text-slate-600 hover:bg-slate-250/50 hover:text-slate-900 border border-transparent'
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-250 border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Detailed Notes
          </button>

          <button
            onClick={() => {
              if (assessmentStatus === 'testing' && !confirm("Exit test? Progression is wiped.")) return;
              setActiveTab('qb');
              if (assessmentStatus === 'testing') setAssessmentStatus('idle');
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'qb' 
                ? isLightMode 
                  ? 'bg-slate-200 border border-slate-300 text-slate-900 shadow-sm'
                  : 'bg-slate-800 border border-slate-700 text-white' 
                : isLightMode
                  ? 'text-slate-600 hover:bg-slate-250/50 hover:text-slate-900 border border-transparent'
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-250 border border-transparent'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            Question Bank
            <span className="bg-amber-450/20 text-amber-400 px-1.5 py-0.2 text-[9px] rounded-full font-black">
              150 Qs
            </span>
          </button>

          <button
            onClick={() => {
              if (assessmentStatus === 'testing') return;
              setActiveTab('assessment');
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'assessment' || assessmentStatus === 'testing' || assessmentStatus === 'submitted'
                ? isLightMode 
                  ? 'bg-slate-200 border border-slate-300 text-slate-900 shadow-sm'
                  : 'bg-slate-800 border border-slate-700 text-white' 
                : isLightMode
                  ? 'text-slate-600 hover:bg-slate-250/50 hover:text-slate-900 border border-transparent'
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-250 border border-transparent'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            Self-Assessment
            <span className="bg-emerald-450/20 text-emerald-400 px-1.5 py-0.2 text-[9px] rounded-full font-black">
              LIVE TEST
            </span>
          </button>
        </div>
      </div>

      {/* =======================================================================
          TAB 1: VIEW DETAILED NOTES SYSTEM
          ======================================================================= */}
      {activeTab === 'notes' && assessmentStatus !== 'testing' && assessmentStatus !== 'submitted' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left index navigation column */}
          <div className="lg:col-span-4 space-y-3">
            <div className={`p-4 rounded-2xl border ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-[#090e1a]/80 border-slate-800/80'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${
                isLightMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Course Outline
              </span>
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                Optics Modules
              </h3>
              <p className={`text-[11px] leading-relaxed mb-4 ${
                isLightMode ? 'text-slate-600' : 'text-slate-450'
              }`}>
                {targetGrade === '8th' 
                  ? "Junior prep encompasses 8th basics up to 10th level conceptual principles, keeping technical layout highly understandable."
                  : "Senior prep combined compilation merges standard 8th foundations up to 12th, JEE Advanced, and NEET-level analytical equations."
                }
              </p>

              <div className="space-y-1.5">
                {notesData.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`w-full p-3 rounded-xl border text-left transition duration-200 cursor-pointer flex items-start gap-2.5 ${
                      activeModuleId === mod.id 
                        ? isLightMode
                          ? 'bg-blue-100 border-blue-300 text-blue-900 shadow'
                          : 'bg-slate-800/80 border-cyan-500/40 text-white shadow'
                        : isLightMode
                          ? 'bg-slate-50 border-slate-200 hover:bg-slate-100/60 text-slate-700 hover:text-slate-900'
                          : 'bg-slate-900/20 border-slate-850 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BookOpenCheck className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeModuleId === mod.id ? 'text-cyan-450 text-cyan-400' : 'text-slate-500'}`} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold leading-tight">{mod.title}</h4>
                      <p className={`text-[10px] truncate max-w-[220px] ${isLightMode ? 'text-slate-500' : 'text-slate-450'}`}>{mod.summary}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right reading pane column */}
          <div className="lg:col-span-8">
            {notesData.filter(m => m.id === activeModuleId).map(mod => (
              <div 
                key={mod.id} 
                className={`border rounded-2xl shadow-xl overflow-hidden p-6 space-y-5 ${
                  isLightMode ? 'bg-white border-slate-200' : 'bg-[#090e1a]/80 border-slate-800/80'
                }`}
                id={`read-pane-${mod.id}`}
              >
                <div className={`flex items-center justify-between border-b pb-4 mb-2 ${
                  isLightMode ? 'border-slate-150' : 'border-slate-800'
                }`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-cyan-450 uppercase tracking-widest block text-cyan-400">
                      📝 {targetGrade === '8th' ? 'Olympiad Foundation Series' : 'JEE / NEET Advanced Path'}
                    </span>
                    <h2 className={`text-lg font-black tracking-tight flex items-center gap-2 ${
                      isLightMode ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {mod.title}
                    </h2>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                    isLightMode ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#121826] border-slate-800 text-slate-500'
                  }`}>
                    Active Module
                  </span>
                </div>

                {/* Render HTML content safely with customized styling */}
                <div 
                  className={`space-y-4 text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`} 
                  dangerouslySetInnerHTML={{ __html: mod.content }}
                />

                <div className={`pt-5 border-t flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono ${
                  isLightMode ? 'border-slate-150' : 'border-slate-850'
                }`}>
                  <span>⌬ Professional Optics Curriculum</span>
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" /> High-contrast study guide
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================================
          TAB 2: QUESTION BANK VIEW
          ======================================================================= */}
      {activeTab === 'qb' && assessmentStatus !== 'testing' && (
        <div className="space-y-5">
          {/* Filter, search, and type card */}
          <div className={`p-4 border rounded-2xl shadow flex flex-col md:flex-row items-center justify-between gap-4 ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#090e1a]/80 border-slate-800/80'
          }`}>
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Type toggle */}
              <button
                onClick={() => {
                  setQbType('mcq');
                  setQbPage(0);
                }}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  qbType === 'mcq' 
                    ? isLightMode
                      ? 'bg-blue-100 border border-blue-300 text-blue-900 shadow'
                      : 'bg-slate-800 border border-slate-700 text-white shadow'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                      : 'text-slate-455 hover:text-slate-200'
                }`}
              >
                100 MCQs
              </button>
              <button
                onClick={() => {
                  setQbType('assertion');
                  setQbPage(0);
                }}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  qbType === 'assertion' 
                    ? isLightMode
                      ? 'bg-blue-100 border border-blue-300 text-blue-900 shadow'
                      : 'bg-slate-800 border border-slate-700 text-white shadow'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                      : 'text-slate-455 hover:text-slate-200'
                }`}
              >
                50 Assertion-Reason
              </button>
            </div>

            {/* Search Input bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={qbSearchQuery}
                onChange={(e) => {
                  setQbSearchQuery(e.target.value);
                  setQbPage(0);
                }}
                placeholder={`Search the ${qbType === 'mcq' ? '100 MCQs' : '50 Assertions'} block by keyword...`}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500/50 transition font-sans ${
                  isLightMode 
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400' 
                    : 'bg-slate-950 border border-slate-850 text-slate-200 placeholder-slate-600'
                }`}
              />
            </div>
          </div>

          {/* Core lists */}
          {qbType === 'mcq' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedMcqs.map((q) => {
                const verifiedKey = `mcq-${q.id}`;
                const verifiedState = verifiedQbAnswers[verifiedKey];

                return (
                  <div key={q.id} className={`p-5 rounded-2xl relative shadow-md flex flex-col justify-between min-h-[290px] border ${
                    isLightMode 
                      ? 'bg-white border-slate-200' 
                      : 'bg-[#090e1a]/85 border-slate-800/80'
                  }`}>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between border-b pb-2 mb-1 ${isLightMode ? 'border-slate-100' : 'border-slate-900'}`}>
                        <span className={`text-[11px] font-black font-mono ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`}>
                          QUESTION MCQ #{q.id} OF 100
                        </span>
                        <span className="text-[9px] font-black uppercase text-slate-500">
                          {targetGrade === '8th' ? 'Foundation Level' : 'JEE/NEET Standard'}
                        </span>
                      </div>

                      <p className={`text-xs sm:text-sm font-bold leading-relaxed font-sans min-h-[50px] ${
                        isLightMode ? 'text-slate-900' : 'text-slate-100'
                      }`}>
                        {q.question}
                      </p>

                      {/* Display 4 Interactive options */}
                      <div className="space-y-1.5 pt-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = verifiedState?.selected === oIdx;
                          const isCorrectOpt = oIdx === q.correctAnswer;
                          let optStyle = '';
                          
                          if (isLightMode) {
                            optStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-medium';
                            if (verifiedState?.verified) {
                              if (isCorrectOpt) {
                                optStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                              } else if (isSelected) {
                                optStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';
                              }
                            } else if (isSelected) {
                              optStyle = 'border-blue-500 bg-blue-50 text-blue-900 font-bold';
                            }
                          } else {
                            optStyle = 'border-slate-850 bg-slate-950/40 text-slate-101 hover:bg-slate-900/60 hover:text-white font-medium';
                            if (verifiedState?.verified) {
                              if (isCorrectOpt) {
                                optStyle = 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300';
                              } else if (isSelected) {
                                optStyle = 'border-rose-500/50 bg-rose-950/20 text-rose-300';
                              }
                            } else if (isSelected) {
                              optStyle = 'border-cyan-500/40 bg-cyan-900/10 text-cyan-300';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={verifiedState?.verified}
                              onClick={() => {
                                setVerifiedQbAnswers(prev => ({
                                  ...prev,
                                  [verifiedKey]: { selected: oIdx, isCorrect: false, verified: false }
                                }));
                              }}
                              className={`w-full p-2.5 rounded-lg border text-left text-xs transition duration-150 cursor-pointer flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {verifiedState?.verified && isCorrectOpt && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                              {verifiedState?.verified && isSelected && !isCorrectOpt && <X className="w-3.5 h-3.5 text-rose-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Verify actions */}
                    <div className={`pt-4 mt-4 border-t ${isLightMode ? 'border-slate-100' : 'border-slate-900/50'}`}>
                      {!verifiedState?.verified ? (
                        <button
                          disabled={verifiedState?.selected === undefined}
                          onClick={() => verifyQbAnswer(q.id, verifiedState?.selected, q.correctAnswer)}
                          className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            verifiedState?.selected !== undefined
                              ? isLightMode 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm'
                                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black hover:opacity-90'
                              : isLightMode
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                : 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed'
                          }`}
                        >
                          Verify Answer
                        </button>
                      ) : (
                        <div className={`p-3 border rounded-xl space-y-2 animate-fadeIn ${
                          isLightMode 
                            ? 'bg-blue-50/60 border-blue-150' 
                            : 'bg-[#111625] border-slate-800'
                        }`}>
                          <div className="flex items-center gap-1.5 text-xs">
                            {verifiedState.isCorrect ? (
                              <span className={`font-bold flex items-center gap-1 ${isLightMode ? 'text-emerald-850' : 'text-emerald-400'}`}>
                                <CheckCircle className="w-4 h-4" /> Correct Answer (+2.0 equivalent)
                              </span>
                            ) : (
                              <span className={`font-bold flex items-center gap-1 ${isLightMode ? 'text-rose-850' : 'text-rose-455 text-rose-500'}`}>
                                <X className="w-4 h-4 text-rose-500" /> Incorrect Answer (-0.5 equivalent)
                              </span>
                            )}
                          </div>
                          {/* Pristine high-contrast light text explanation */}
                          <p className={`text-[11px] leading-relaxed font-sans ${isLightMode ? 'text-slate-700' : 'text-slate-350'}`}>
                            <b className={isLightMode ? 'text-blue-900' : 'text-amber-400'}>Step-by-Step Explanation:</b> {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedAssertions.map((q) => {
                const verifiedKey = `assert-${q.id}`;
                const verifiedState = verifiedQbAnswers[verifiedKey];

                return (
                  <div key={q.id} className={`p-5 rounded-2xl relative shadow-md flex flex-col justify-between min-h-[300px] border ${
                    isLightMode 
                      ? 'bg-white border-slate-200' 
                      : 'bg-[#090e1a]/85 border-slate-800/80'
                  }`}>
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between border-b pb-2 mb-1 ${isLightMode ? 'border-slate-100' : 'border-slate-900'}`}>
                        <span className="text-[11px] font-black font-mono text-cyan-500">
                          ASSERTION & REASON #{q.id} OF 50
                        </span>
                        <span className={`text-[9px] font-black uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {targetGrade === '8th' ? 'Foundation Level' : 'JEE/NEET Standard'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className={`p-2.5 rounded-xl border ${
                          isLightMode 
                            ? 'bg-slate-50 border-slate-200' 
                            : 'bg-slate-950/60 border-slate-850'
                        }`}>
                          <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Assertion (A):</p>
                          <p className={`text-xs sm:text-sm font-bold leading-relaxed font-sans ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{q.assertion}</p>
                        </div>
                        <div className={`p-2.5 rounded-xl border ${
                          isLightMode 
                            ? 'bg-slate-50 border-slate-200' 
                            : 'bg-slate-950/60 border-slate-850'
                        }`}>
                          <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Reason (R):</p>
                          <p className={`text-xs sm:text-sm font-bold leading-relaxed font-sans ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{q.reason}</p>
                        </div>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                        {["A", "B", "C", "D"].map((opt) => {
                          const isSelected = verifiedState?.selected === opt;
                          const isCorrectOpt = opt === q.correctOption;
                          let optStyle = isLightMode 
                            ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                            : 'border-slate-850 bg-slate-950/40 text-slate-100 hover:bg-slate-905/60 hover:text-white font-medium';
                          
                          if (verifiedState?.verified) {
                            if (isCorrectOpt) {
                              optStyle = isLightMode 
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-850 font-bold'
                                : 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300';
                            } else if (isSelected) {
                              optStyle = isLightMode 
                                ? 'border-rose-300 bg-rose-50 text-rose-850 font-bold'
                                : 'border-rose-500/50 bg-rose-950/20 text-rose-300';
                            }
                          } else if (isSelected) {
                            optStyle = isLightMode 
                              ? 'border-cyan-400 bg-cyan-50 text-cyan-800 font-extrabold'
                              : 'border-cyan-500/45 bg-cyan-900/10 text-cyan-300';
                          }

                          let labelText = "";
                          if (opt === "A") labelText = "A: both true, R explain A";
                          if (opt === "B") labelText = "B: both true, R not explain";
                          if (opt === "C") labelText = "C: A true, R false";
                          if (opt === "D") labelText = "D: both false or A false";

                          return (
                            <button
                              key={opt}
                              disabled={verifiedState?.verified}
                              onClick={() => {
                                setVerifiedQbAnswers(prev => ({
                                  ...prev,
                                  [verifiedKey]: { selected: opt, isCorrect: false, verified: false }
                                }));
                              }}
                              className={`p-2 rounded-lg border text-left text-xs transition duration-150 cursor-pointer flex flex-col ${optStyle}`}
                            >
                              <span className="font-bold">{opt}</span>
                              <span className="text-[10px] opacity-80 font-sans leading-tight mt-0.5">{labelText}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className={`pt-4 mt-4 border-t ${isLightMode ? 'border-slate-100' : 'border-slate-900/50'}`}>
                      {!verifiedState?.verified ? (
                        <button
                          disabled={verifiedState?.selected === undefined}
                          onClick={() => verifyAssertionAnswer(q.id, verifiedState?.selected, q.correctOption)}
                          className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            verifiedState?.selected !== undefined
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:opacity-90'
                              : isLightMode 
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                : 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed'
                          }`}
                        >
                          Verify Logic
                        </button>
                      ) : (
                        <div className={`p-3 border rounded-xl space-y-2 animate-fadeIn text-xs ${
                          isLightMode 
                            ? 'bg-slate-50 border-slate-200' 
                            : 'bg-[#111625] border-slate-800'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            {verifiedState.isCorrect ? (
                              <span className="text-emerald-500 font-bold flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" /> Logic Valid (+2.0 equivalent)
                              </span>
                            ) : (
                              <span className="text-rose-500 font-bold flex items-center gap-1">
                                <X className="w-4 h-4" /> Logic Mismatch (-0.5 equivalent)
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] leading-relaxed font-sans ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            <b className={isLightMode ? 'text-cyan-700' : 'text-amber-400'}>Step-by-Step Logic Analysis:</b> {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination controls */}
          {totalQbPages > 1 && (
            <div className="flex items-center justify-center gap-3.5 pt-4">
              <button
                disabled={qbPage === 0}
                onClick={() => setQbPage(prev => Math.max(0, prev - 1))}
                className={`p-2 rounded-xl border transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${isLightMode ? 'border-slate-300 bg-white text-slate-600 hover:text-slate-900' : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`text-xs font-mono font-bold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Page {qbPage + 1} of {totalQbPages}
              </span>
              <button
                disabled={qbPage >= totalQbPages - 1}
                onClick={() => setQbPage(prev => Math.min(totalQbPages - 1, prev + 1))}
                className={`p-2 rounded-xl border transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${isLightMode ? 'border-slate-300 bg-white text-slate-600 hover:text-slate-900' : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          TAB 3: TIMED SELF-ASSESSMENT (-0.5 NEGATIVE SCORING)
          ======================================================================= */}
      {activeTab === 'notes' && (assessmentStatus === 'testing' || assessmentStatus === 'submitted') && (
        <div className={`text-center p-8 rounded-2xl border space-y-4 ${
          isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/20 border-slate-850'
        }`}>
          <BookOpen className={`w-12 h-12 mx-auto ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>You are currently taking the exam.</h3>
          <p className={`text-xs max-w-md mx-auto ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Please click the 'Self-Assessment' tab inside the sub-navigation above to complete or review your exam sheets.</p>
        </div>
      )}

      {activeTab === 'qb' && (assessmentStatus === 'testing' || assessmentStatus === 'submitted') && (
        <div className={`text-center p-8 rounded-2xl border space-y-4 ${
          isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/20 border-slate-850'
        }`}>
          <BookOpen className={`w-12 h-12 mx-auto ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>You have an active assessment block open.</h3>
          <p className={`text-xs max-w-md mx-auto ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Please click the 'Self-Assessment' tab inside the sub-navigation above to submit or view answers.</p>
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="space-y-6">
          {/* A: INTRO / IDLE VIEW */}
          {assessmentStatus === 'idle' && (
            <div className={`border rounded-2xl shadow-xl p-6 relative overflow-hidden ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-[#090e1a]/80 border-slate-800/80'
            }`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl opacity-20 pointer-events-none select-none"></div>

              <div className="max-w-2xl mx-auto text-center space-y-6 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner animate-pulse">
                  <Clock className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <h2 className={`text-xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                    Optics Competitive Self-Assessment
                  </h2>
                  <p className={`text-xs tracking-wider uppercase font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-450'}`}>
                    Official {targetGrade === '8th' ? 'Physics Junior Olympiad' : 'JEE / NEET Physics Prep'} Exam Deck
                  </p>
                </div>

                {/* Exam Rules card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  {[
                    { label: "Questions", value: "Exactly 50 Qs" },
                    { label: "Correct Scale", value: "+2.0 Marks" },
                    { label: "Negative Scale", value: "-0.5 Marks" },
                    { label: "Duration", value: "45 Minutes" },
                  ].map((rule, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border text-center space-y-0.5 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border border-slate-900'
                    }`}>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{rule.label}</span>
                      <span className={`text-xs font-black block ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{rule.value}</span>
                    </div>
                  ))}
                </div>

                <div className={`p-4 border rounded-2xl text-left space-y-2 text-xs ${
                  isLightMode ? 'bg-blue-50 border-blue-150 text-slate-800' : 'bg-[#111726] border-slate-850 text-slate-350'
                }`}>
                  <h5 className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Instructions & Warning Rules:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>This assessment consists of precisely <b>50 real-time optics calculations and concept questions</b>.</li>
                    <li>Negative marking applies: <b>-0.5 deduction</b> for incorrect choices; unanswered questions reward 0.0.</li>
                    <li>Completing or running out of time redirects you to a **Performance Dashboard** showcasing step-by-step math breakdowns for each question.</li>
                  </ul>
                </div>

                <button
                  onClick={startSelfAssessment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:opacity-95 transition shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Start Self-Assessment (50 Qs)
                </button>
              </div>
            </div>
          )}

          {/* B: LIVE TESTING EXAM MODE */}
          {assessmentStatus === 'testing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Question selector grid panel */}
              <div className={`lg:col-span-4 p-4 rounded-2xl shadow border ${
                isLightMode 
                  ? 'bg-white border-slate-200' 
                  : 'bg-[#090e1a]/80 border-slate-800/80'
              }`}>
                <div className={`flex items-center justify-between border-b pb-3 mb-4 ${isLightMode ? 'border-slate-100' : 'border-slate-900'}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                      isLightMode 
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-200' 
                        : 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20'
                    }`}>
                      {formatTime(timeLeft)} Left
                    </span>
                  </div>
                  <button
                    onClick={resetAssessment}
                    className="text-[10px] font-black text-rose-500 uppercase hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-rose-500" /> Wreck Sheet
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block">
                      Progress Board ({Object.keys(userAnswers).length} / 50 Answered)
                    </span>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-900'}`}>
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${(Object.keys(userAnswers).length / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 50 questions selector map */}
                  <div className="pt-2">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                      Answer Grid (1 to 50)
                    </span>
                    <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5 max-h-[290px] overflow-y-auto pr-1">
                      {selfAssessmentData.map((q, idx) => {
                        const isAnswered = userAnswers[q.id] !== undefined;
                        const isCurrent = currentExamIndex === idx;

                        let btnStyle = isLightMode 
                          ? 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-150'
                          : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900';
                        if (isCurrent) {
                          btnStyle = isLightMode 
                            ? 'bg-cyan-600 font-bold border-cyan-500 text-white shadow-lg ring-1 ring-cyan-400/30'
                            : 'bg-blue-600 font-bold border-blue-500 text-white shadow-lg ring-1 ring-blue-400/30';
                        } else if (isAnswered) {
                          btnStyle = isLightMode 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                            : 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400 font-bold';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentExamIndex(idx)}
                            className={`p-2.5 rounded-lg border text-[11px] font-bold text-center transition cursor-pointer flex items-center justify-center ${btnStyle}`}
                          >
                            {q.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`pt-4 border-t ${isLightMode ? 'border-slate-100' : 'border-slate-900'}`}>
                    <button
                      onClick={() => {
                        if (confirm(`Submit your exam now? You have answered ${Object.keys(userAnswers).length} out of 50 questions.`)) {
                          setAssessmentStatus('submitted');
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:opacity-95 transition shadow-lg cursor-pointer"
                    >
                      Submit Exam Sheets
                    </button>
                  </div>
                </div>
              </div>

              {/* Active live question card */}
              <div className="lg:col-span-8 space-y-4">
                {selfAssessmentData[currentExamIndex] && (() => {
                  const q = selfAssessmentData[currentExamIndex];
                  const chosenOpt = userAnswers[q.id];

                  return (
                    <div className={`border rounded-2xl shadow-xl overflow-hidden p-6 space-y-4 flex flex-col justify-between min-h-[400px] ${
                      isLightMode 
                        ? 'bg-white border-slate-200' 
                        : 'bg-[#090e1a]/80 border-slate-800/80'
                    }`}>
                      <div className="space-y-4">
                        <div className={`flex items-center justify-between border-b pb-3 mb-1 ${isLightMode ? 'border-slate-100' : 'border-slate-900'}`}>
                          <span className="text-xs font-black font-mono text-cyan-500">
                            QUESTION {currentExamIndex + 1}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            +2.0 Marks | -0.5 Penalty
                          </span>
                        </div>

                        <h3 className={`text-sm sm:text-base font-black leading-relaxed font-sans ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                          {q.question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-2 pt-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = chosenOpt === oIdx;

                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  setUserAnswers(prev => ({ ...prev, [q.id]: oIdx }));
                                }}
                                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-sans transition duration-150 cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? isLightMode 
                                      ? 'bg-cyan-50 border-cyan-400 text-cyan-800 font-extrabold shadow ring-1 ring-cyan-400/20'
                                      : 'bg-blue-900/10 border-blue-500/40 text-blue-300 shadow ring-1 ring-blue-500/20'
                                    : isLightMode 
                                      ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                                      : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900/30 text-slate-350 hover:text-slate-200'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check className="w-4 h-4 text-cyan-500" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Paginated flow actions */}
                      <div className={`pt-4 mt-6 border-t flex items-center justify-between gap-4 ${isLightMode ? 'border-slate-100' : 'border-slate-900'}`}>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={currentExamIndex === 0}
                            onClick={() => setCurrentExamIndex(prev => prev - 1)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 ${
                              isLightMode 
                                ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700' 
                                : 'bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-300'
                            }`}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" /> Prev
                          </button>
                          <button
                            disabled={currentExamIndex === selfAssessmentData.length - 1}
                            onClick={() => setCurrentExamIndex(prev => prev + 1)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 ${
                              isLightMode 
                                ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700' 
                                : 'bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-300'
                            }`}
                          >
                            Next <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {chosenOpt !== undefined && (
                          <button
                            onClick={() => {
                              setUserAnswers(prev => {
                                const copy = { ...prev };
                                delete copy[q.id];
                                return copy;
                              });
                            }}
                            className="text-xs text-rose-500 font-bold hover:underline cursor-pointer"
                          >
                            Clear Selection
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* C: DETAILED EXAM PERFORMANCE REPORT POST-TEST */}
          {assessmentStatus === 'submitted' && metrics && (
            <div className="space-y-6">
              {/* Score breakdown metrics card */}
              <div className={`border rounded-2xl shadow-xl p-6 relative overflow-hidden ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#090e1a]/85 border-slate-800/80'
              }`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl opacity-20 pointer-events-none select-none"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3 text-center md:text-left">
                    <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">
                      Exam Report Published
                    </span>
                    <h2 className={`text-xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                      Your Performance Statistics
                    </h2>
                    <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-400'} max-w-md`}>
                      Your optical calculations and formulas sheets have been calculated under standard negative marker rules (+2, -0.5).
                    </p>
                  </div>

                  <div className={`flex items-center gap-4.5 p-4 border rounded-2xl shadow-lg ring-1 ${
                    isLightMode 
                      ? 'bg-slate-50 border-slate-200 ring-slate-100' 
                      : 'bg-slate-950 border-slate-900 ring-slate-850'
                  }`}>
                    <div className="text-center space-y-0.5">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Total Score</span>
                      <span className="text-3xl font-black text-cyan-400 font-mono tracking-tight block">
                        {metrics.score.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ 100</span>
                      </span>
                    </div>
                    <div className={`w-px h-10 ${isLightMode ? 'bg-slate-200' : 'bg-slate-850'}`}></div>
                    <div className="text-center space-y-0.5">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Accuracy</span>
                      <span className="text-3xl font-black text-emerald-400 font-mono tracking-tight block">
                        {metrics.accuracy}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score breakdown bar */}
                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t text-center ${
                  isLightMode ? 'border-slate-100' : 'border-slate-900'
                }`}>
                  <div className={`space-y-0.5 p-2.5 rounded-xl border ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border border-slate-900'
                  }`}>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Correct Qs</span>
                    <span className="text-xs font-bold text-emerald-500">{metrics.correct} of 50</span>
                  </div>
                  <div className={`space-y-0.5 p-2.5 rounded-xl border ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border border-slate-900'
                  }`}>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Incorrect Qs</span>
                    <span className="text-xs font-bold text-rose-500">{metrics.incorrect} of 50</span>
                  </div>
                  <div className={`space-y-0.5 p-2.5 rounded-xl border ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border border-slate-900'
                  }`}>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Unanswered</span>
                    <span className="text-xs font-bold text-amber-500">{metrics.unanswered} of 50</span>
                  </div>
                  <div className={`space-y-0.5 p-2.5 rounded-xl border ${
                    isLightMode ? 'bg-slate-50 border-slate-200 font-bold' : 'bg-slate-950 border border-slate-900'
                  }`}>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Award Earned</span>
                    <span className="text-xs font-black text-yellow-500 font-mono">
                      {metrics.score >= 80 ? '👑 PHYSICS GOLD' : metrics.score >= 50 ? '🥈 EXCELLENT' : '🥉 PARTICIPANT'}
                    </span>
                  </div>
                </div>

                <div className={`mt-6 pt-5 flex border-t items-center justify-between flex-wrap gap-3 ${
                  isLightMode ? 'border-slate-100' : 'border-slate-900'
                }`}>
                  <button
                    onClick={startSelfAssessment}
                    className="px-4.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider hover:opacity-90 transition shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-950" />
                    Re-Take Assessment
                  </button>

                  <button
                    onClick={() => {
                      setAssessmentStatus('idle');
                      setUserAnswers({});
                    }}
                    className={`px-4.5 py-2.5 rounded-xl border hover:opacity-95 text-xs font-bold uppercase transition cursor-pointer ${
                      isLightMode 
                        ? 'bg-slate-100 border-slate-200 text-slate-750' 
                        : 'bg-slate-900 border-slate-800 text-slate-350'
                    }`}
                  >
                    Exit Exam Workspace
                  </button>
                </div>
              </div>

              {/* Individual Question-by-Question detailed dashboard (1 to 50) */}
              <div className={`p-5 rounded-2xl space-y-4 border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#090e1a]/80 border-slate-800/80'
              }`}>
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${
                  isLightMode ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Individual Question Sheets & Mathematical Explanations (1 to 50)
                </span>
                <p className={`text-xs leading-relaxed max-w-xl pb-2 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-450'
                }`}>
                  Verify exactly where you slipped up by JUMPING to any question below to see its formulas, steps, and options analysis.
                </p>

                {/* 50 question tab selectors */}
                <div className="flex flex-wrap gap-1.5 max-h-[141px] overflow-y-auto pr-1">
                  {selfAssessmentData.map((q, idx) => {
                    const ans = userAnswers[q.id];
                    const isCorrect = ans === q.correctAnswer;
                    const isUnanswered = ans === undefined;

                    let btnStyle = '';
                    if (isLightMode) {
                      btnStyle = 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900';
                      if (q.id === showReviewId) {
                        btnStyle = 'border-blue-600 bg-blue-600 text-white font-black shadow ring-1 ring-blue-400/30';
                      } else if (isUnanswered) {
                        btnStyle = 'border-amber-300 bg-amber-50 text-amber-700 font-bold';
                      } else if (isCorrect) {
                        btnStyle = 'border-emerald-300 bg-emerald-50 text-emerald-700 font-bold';
                      } else {
                        btnStyle = 'border-rose-300 bg-rose-50 text-rose-700 font-bold';
                      }
                    } else {
                      btnStyle = 'border-slate-850 bg-slate-950/40 text-slate-400 hover:bg-slate-900/60';
                      if (q.id === showReviewId) {
                        btnStyle = 'border-blue-500 bg-blue-600 text-white font-black shadow ring-1 ring-blue-550/30';
                      } else if (isUnanswered) {
                        btnStyle = 'border-amber-500/25 bg-amber-950/10 text-amber-500 font-bold';
                      } else if (isCorrect) {
                        btnStyle = 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-bold';
                      } else {
                        btnStyle = 'border-rose-500/30 bg-rose-950/20 text-rose-500 font-bold';
                      }
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setShowReviewId(q.id)}
                        className={`px-3 py-2 text-xs rounded-xl border text-center transition cursor-pointer min-w-[42px] ${btnStyle}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>

                {/* Active question review container */}
                {selfAssessmentData.filter(q => q.id === showReviewId).map(q => {
                  const ans = userAnswers[q.id];
                  const isCorrect = ans === q.correctAnswer;
                  const isUnanswered = ans === undefined;

                  return (
                    <div key={q.id} className={`p-5 mt-4 rounded-2xl space-y-4 animate-fadeIn border ${
                      isLightMode 
                        ? 'bg-slate-50 border-slate-200' 
                        : 'bg-slate-950/60 border-slate-900'
                    }`}>
                      <div className={`flex items-center justify-between border-b pb-3 mb-1 flex-wrap gap-2 ${
                        isLightMode ? 'border-slate-150' : 'border-slate-900'
                      }`}>
                        <span className={`text-xs font-black font-mono uppercase ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`}>
                          REVIEW SHEET FOR SELF-ASSESSMENT Q{q.id}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {isUnanswered && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-500 border border-amber-500/20 uppercase">
                              Skipped (0.0 Marks)
                            </span>
                          )}
                          {!isUnanswered && isCorrect && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 uppercase">
                              Correct (+2.0 Marks)
                            </span>
                          )}
                          {!isUnanswered && !isCorrect && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/15 text-rose-455 text-rose-500 border border-rose-500/20 uppercase">
                              Incorrect (-0.5 Marks)
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className={`text-xs sm:text-sm font-bold leading-relaxed font-sans ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                        {q.question}
                      </h3>

                      {/* Static options block */}
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isYourChoice = ans === oIdx;
                          const isCorrectChoice = q.correctAnswer === oIdx;

                          let containerStyle = '';
                          if (isLightMode) {
                            containerStyle = 'border-slate-200 bg-white text-slate-600';
                            if (isCorrectChoice) {
                              containerStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                            } else if (isYourChoice) {
                              containerStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';
                            }
                          } else {
                            containerStyle = 'border-slate-900 bg-slate-950 text-slate-400';
                            if (isCorrectChoice) {
                              containerStyle = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';
                            } else if (isYourChoice) {
                              containerStyle = 'border-rose-500/40 bg-rose-950/20 text-rose-300';
                            }
                          }

                          return (
                            <div 
                              key={oIdx}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${containerStyle}`}
                            >
                              <span>{opt}</span>
                              <div className="flex items-center gap-1.5">
                                {isCorrectChoice && <span className={`text-[10px] font-black uppercase tracking-widest ${isLightMode ? 'text-emerald-800' : 'text-emerald-400'}`}>Correct Answer</span>}
                                {isYourChoice && !isCorrectChoice && <span className={`text-[10px] font-black uppercase tracking-widest ${isLightMode ? 'text-rose-800' : 'text-rose-500'}`}>Your Attempt</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed calculation solution */}
                      <div className={`p-3 border rounded-xl space-y-2 ${
                        isLightMode 
                          ? 'bg-blue-50/60 border-blue-150' 
                          : 'bg-[#111625] border-slate-850'
                      }`}>
                        <h4 className={`text-xs font-black uppercase tracking-wide flex items-center gap-1 ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`}>
                          <BookOpenCheck className="w-4 h-4" />
                          Step-by-Step Mathematical Calculation:
                        </h4>
                        <p className={`text-[11px] leading-relaxed font-sans ${isLightMode ? 'text-slate-700' : 'text-slate-350'}`}>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Outer subtle license footer info */}
      <div className={`mt-8 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] uppercase tracking-wider font-mono select-none ${
        isLightMode ? 'border-slate-150 text-slate-500' : 'border-slate-900 text-slate-500'
      }`}>
        <span>© Optics Academy Competitive League & Olympiad Prep</span>
        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <Shield className="w-3.5 h-3.5" /> Certified Physics Portal
        </span>
      </div>
    </div>
  );
}
