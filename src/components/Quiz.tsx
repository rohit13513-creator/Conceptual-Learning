import React, { useState, useEffect } from "react";
import { QUIZ_8TH, QUIZ_10TH, QUIZ_12TH, QUIZ_JEE } from "../quizData";
import { QuizQuestion } from "../types";
import { CheckCircle, XCircle, ChevronRight, Award, HelpCircle, GraduationCap, Sparkles, Clock, AlertTriangle, BookOpen, Play } from "lucide-react";

type QuizGrade = "8th" | "10th" | "12th" | "jee";

interface QuizProps {
  initialGrade?: QuizGrade;
  customQuestions?: QuizQuestion[];
  isLightMode?: boolean;
  subjectTitle?: string;
  subjectSubtitle?: string;
}

export const Quiz: React.FC<QuizProps> = ({ initialGrade, customQuestions, isLightMode = false, subjectTitle, subjectSubtitle }) => {
  const [selectedGrade, setSelectedGrade] = useState<QuizGrade>(initialGrade || "10th");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Advanced feature additions: Track user selections for full Solutions Review
  const [userSelections, setUserSelections] = useState<Record<number, number>>({});
  
  // Timer state (seconds)
  const [timeLeft, setTimeLeft] = useState<number>(1800);

  // Initialize and reset the test & timer whenever selectedGrade or customQuestions change
  useEffect(() => {
    let duration = 1800; // Defaults to 30 mins (Class 10)
    
    if (customQuestions) {
      // If we are passing custom questions (like CLASSVIII_SELF_ASSESSMENT or COMPETITION_SELF_ASSESSMENT)
      if (initialGrade === "8th") {
        duration = 1200; // 20 mins for Class VIII
      } else if (initialGrade === "10th") {
        duration = 1800; // 30 mins for Class X
      } else {
        duration = 3600; // 60 mins for Competition level (50 questions)
      }
    } else {
      if (selectedGrade === "8th") {
        duration = 1200; // 20 mins
      } else if (selectedGrade === "10th") {
        duration = 1800; // 30 mins
      } else if (selectedGrade === "12th") {
        duration = 2400; // 40 mins
      } else if (selectedGrade === "jee") {
        duration = 3600; // 60 mins
      }
    }

    setTimeLeft(duration);
    setQuizFinished(false);
    setScore(0);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setUserSelections({});
    setHasStarted(false);
  }, [selectedGrade, initialGrade, customQuestions]);

  // Handle countdown interval
  useEffect(() => {
    if (!hasStarted || quizFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizFinished(true); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizFinished]);

  // Determine current active quiz pool
  const getActiveQuizPool = () => {
    if (customQuestions && customQuestions.length > 0) {
      return customQuestions;
    }
    switch (selectedGrade) {
      case "8th":
        return QUIZ_8TH;
      case "12th":
        return QUIZ_12TH;
      case "jee":
        return QUIZ_JEE;
      case "10th":
      default:
        return QUIZ_10TH;
    }
  };

  const activePool = getActiveQuizPool();
  const activeQuestion = activePool[currentIdx] || activePool[0];

  const handleGradeSelect = (grade: QuizGrade) => {
    setSelectedGrade(grade);
    setHasStarted(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || isSubmitted) return;
    
    // Save selection in tracking dict
    setUserSelections((prev) => ({ ...prev, [currentIdx]: selectedOpt }));
    setIsSubmitted(true);
    
    if (selectedOpt === activeQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < activePool.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    // Reset timer and states to restart the test
    let duration = 1800;
    if (customQuestions) {
      if (initialGrade === "8th") duration = 1200;
      else if (initialGrade === "10th") duration = 1800;
      else duration = 3600;
    } else {
      if (selectedGrade === "8th") duration = 1200;
      else if (selectedGrade === "10th") duration = 1800;
      else if (selectedGrade === "12th") duration = 2400;
      else if (selectedGrade === "jee") duration = 3600;
    }
    setTimeLeft(duration);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setUserSelections({});
    setHasStarted(false);
  };

  // Helper to print formatted time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const renderStartPage = () => {
    return (
      <div className="space-y-6 text-center py-6 animate-fade-in font-sans">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner animate-pulse">
          <Clock className={`w-8 h-8 ${isLightMode ? 'text-blue-900' : 'text-cyan-450'}`} />
        </div>

        <div className="space-y-2">
          <h2 className={`text-xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
            {subjectTitle || 'Physics Optics Self-Assessment'}
          </h2>
          <p className={`text-xs tracking-wider uppercase font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {subjectSubtitle || 'Ready to test your knowledge of Light, Reflection, and Refraction?'}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
          <div className={`p-4 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/50'} border rounded-xl space-y-1 text-center`}>
            <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'} uppercase font-mono tracking-wider block`}>Total Questions</span>
            <span className={`text-lg font-black ${isLightMode ? 'text-blue-900' : 'text-cyan-450'} font-mono`}>{activePool.length} MCQ Questions</span>
          </div>
          <div className={`p-4 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-slate-800/50'} border rounded-xl space-y-1 text-center`}>
            <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'} uppercase font-mono tracking-wider block`}>Allotted Time</span>
            <span className={`text-lg font-black ${isLightMode ? 'text-blue-900' : 'text-cyan-455'} font-mono`}>{Math.floor(timeLeft / 60)} Minutes</span>
          </div>
        </div>

        {/* Instructions */}
        <div className={`p-4 border rounded-2xl text-left space-y-2 text-xs max-w-md mx-auto ${
          isLightMode ? 'bg-blue-50 border-blue-150 text-slate-800' : 'bg-[#111726]/80 border-slate-850 text-slate-350'
        }`}>
          <h5 className={`font-bold flex items-center gap-1.5 ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`}>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Test Instructions:
          </h5>
          <ul className="list-disc pl-5 space-y-1 font-medium">
            <li>The assessment timer will begin ticking down the moment you start.</li>
            <li>Select an option and click <strong>Submit Answer</strong> to lock your response.</li>
            <li>A detailed step-by-step concept & mathematical breakdown will be shown instantly for each question upon submission.</li>
          </ul>
        </div>

        <button
          onClick={() => setHasStarted(true)}
          className={`w-full max-w-md mx-auto py-3 rounded-xl ${
            isLightMode
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500'
              : 'bg-gradient-to-r from-cyan-400 to-indigo-600 text-slate-950 font-black'
          } font-black text-xs uppercase tracking-widest transition shadow-lg hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5`}
        >
          <Play className="w-4 h-4 fill-current" />
          Start Self-Assessment Test
        </button>
      </div>
    );
  };

  // Scale score out of 100 marks
  const scaledScore = activePool.length > 0 ? Math.round((score / activePool.length) * 100) : 0;

  return (
    <div className={`${isLightMode ? 'bg-white border-slate-200 text-slate-800 shadow-slate-100' : 'bg-[#121b2e]/80 backdrop-blur-xl border border-slate-800/80 shadow-xl shadow-black/25 text-slate-100'} rounded-2xl p-5 sm:p-6`} id="quiz-block-root">
      
      {/* Quiz Section Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800/60'}`}>
        <div className="flex items-center gap-2">
          <HelpCircle className={`w-5 h-5 ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`} />
          <div>
            <h3 className={`text-sm font-bold ${isLightMode ? 'text-blue-900' : 'text-cyan-400'} uppercase tracking-wider font-mono`}>
              {customQuestions ? "Chapter-Wise Practice MCQs" : "Light & Vision Graded Quizzes"}
            </h3>
            <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-300'} font-semibold font-sans`}>
              {customQuestions ? `${customQuestions.length} exam-targeted practice questions` : "Four challenging grade-spec assessment levels"}
            </p>
          </div>
        </div>

        {/* Grade tabs */}
        {!customQuestions && (
          <div className={`flex ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-850'} p-1 rounded-xl border self-start sm:self-auto`}>
            {[
              { id: "8th", label: "8th Grade" },
              { id: "10th", label: "10th Grade" },
              { id: "12th", label: "12th Secondary" },
              { id: "jee", label: "JEE Advanced" }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => handleGradeSelect(g.id as QuizGrade)}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer font-sans ${
                  selectedGrade === g.id
                    ? isLightMode ? "bg-cyan-500 text-slate-950 shadow font-black" : "bg-cyan-500 text-slate-950 shadow font-black"
                    : isLightMode ? "bg-transparent text-slate-600 hover:text-slate-800" : "bg-transparent text-slate-300 hover:text-slate-200"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!hasStarted ? (
        renderStartPage()
      ) : !quizFinished ? (
        <div className="space-y-4">
          
          {/* Question Meta metrics & COUNTDOWN TIMER BAR */}
          <div className={`flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 text-xs font-bold ${isLightMode ? 'text-slate-700 bg-slate-50 border-slate-200' : 'text-slate-300 bg-slate-950/40 border-slate-800/50'} p-3 rounded-xl border`}>
            <span className="flex items-center gap-1">
              <GraduationCap className={`w-3.5 h-3.5 ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`} />
              QUESTION {currentIdx + 1}
            </span>
            
            {/* Countdown timer node */}
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded ${isLightMode ? 'bg-red-50 border-red-200 text-red-800' : 'bg-red-950/20 border-red-500/20 text-red-400'} animate-pulse`}>
              <Clock className="w-3.5 h-3.5" />
              <span>TIME REMAINING: {formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Text */}
          <h4 className={`text-sm sm:text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'} leading-snug`}>
            {activeQuestion.question}
          </h4>

          {/* Options Grid */}
          <div className="space-y-2">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === activeQuestion.correctAnswer;
              let btnClass = "";

              if (isLightMode) {
                btnClass = "border-slate-250 bg-slate-50 text-slate-800 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-900";
                
                if (isSubmitted) {
                  if (isCorrect) {
                    btnClass = "bg-emerald-50 border-emerald-350 text-emerald-900 font-bold";
                  } else if (isSelected) {
                    btnClass = "bg-rose-50 border-rose-350 text-rose-900 font-bold";
                  } else {
                    btnClass = "opacity-55 border-slate-200 bg-slate-100/50 text-slate-500";
                  }
                } else if (isSelected) {
                  btnClass = "border-blue-900 bg-blue-100 text-blue-950 font-bold shadow-sm";
                }
              } else {
                btnClass = "border-slate-800 bg-[#0a0f1d] text-slate-100 hover:border-slate-700 hover:bg-slate-900/60 hover:text-white";

                if (isSubmitted) {
                  if (isCorrect) {
                    btnClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-300 font-bold";
                  } else if (isSelected) {
                    btnClass = "bg-rose-500/10 border-rose-500/50 text-rose-300 font-bold";
                  } else {
                    btnClass = "opacity-40 border-slate-900 bg-[#070b14]";
                  }
                } else if (isSelected) {
                  btnClass = "border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                  id={`quiz-opt-${idx}`}
                >
                  <span className="font-medium">{option}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle className={`w-4 h-4 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'} flex-shrink-0 ml-2`} />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className={`w-4 h-4 ${isLightMode ? 'text-rose-700' : 'text-rose-400'} flex-shrink-0 ml-2`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed explanation callout */}
          {isSubmitted && (
            <div className={`p-4 ${isLightMode ? 'bg-blue-50 border-blue-250 text-slate-800' : 'bg-[#0a1122]/90 border-slate-800/80 text-slate-250'} rounded-xl border animate-fade-in space-y-1`}>
              <span className={`text-xs font-black ${isLightMode ? 'text-blue-900' : 'text-cyan-400'} uppercase tracking-wider font-mono block`}>
                🎓 Concepts & Mathematical Breakdown
              </span>
              <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                {activeQuestion.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-2 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOpt === null}
                className={`py-2.5 px-5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all font-mono cursor-pointer ${
                  selectedOpt === null
                    ? isLightMode ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" : "bg-[#0a0f1d] text-slate-400 border border-slate-800/40 cursor-not-allowed"
                    : isLightMode ? "bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-sm hover:shadow-md" : "bg-gradient-to-tr from-cyan-400 to-indigo-600 text-slate-950 hover:shadow-lg hover:shadow-cyan-400/10"
                }`}
                id="btn-quiz-submit"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`py-2.5 px-5 text-xs font-bold uppercase tracking-wider rounded-xl ${isLightMode ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white' : 'bg-gradient-to-tr from-cyan-400 to-indigo-600 text-slate-950'} transition-all flex items-center gap-1 shadow hover:shadow-md cursor-pointer font-mono`}
                id="btn-quiz-next"
              >
                {currentIdx < activePool.length - 1 ? "Next Question" : "View Results"}
                <ChevronRight className={`w-4 h-4 ${isLightMode ? 'text-white' : 'text-slate-950'}`} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Enhanced Results Card layout with Marks scaled out of 100, and Solutions Review */
        <div className="space-y-6 font-sans animate-fade-in" id="quiz-results-card">
          <div className={`text-center py-6 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/50'} border rounded-2xl p-6 space-y-4`}>
            <div className="relative inline-block">
              <Award className="w-14 h-14 text-yellow-400 mx-auto animate-bounce" />
              <Sparkles className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-cyan-400'} absolute top-0 right-0 animate-pulse`} />
            </div>

            <div className="space-y-1">
              <h4 className={`text-base sm:text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                {customQuestions ? "Practice Quiz Finished!" : `${selectedGrade.toUpperCase()} Assessment Complete!`}
              </h4>
              <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-400'} uppercase font-mono tracking-widest`}>
                Official Score Transcript
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
              <div className={`p-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'} border rounded-xl space-y-1 text-center`}>
                <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'} uppercase font-mono tracking-wider block`}>Raw Score</span>
                <span className={`text-xl font-black ${isLightMode ? 'text-blue-900' : 'text-cyan-400'} font-mono`}>{score} / {activePool.length}</span>
              </div>
              <div className={`p-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-850'} border rounded-xl space-y-1 text-center`}>
                <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'} uppercase font-mono tracking-wider block`}>Final Marks</span>
                <span className="text-xl font-black text-yellow-500 font-mono">{scaledScore} / 100</span>
              </div>
            </div>

            <div className={`inline-block px-4 py-2.5 ${isLightMode ? 'bg-blue-50 text-blue-900 border-blue-200' : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/15'} font-bold text-xs sm:text-sm rounded-xl max-w-md border`}>
              {scaledScore >= 90
                ? "Excellent score! Standard of concepts mastered. Outstanding work!"
                : scaledScore >= 60
                ? "Good passing understanding! Try running the interactive optics workbench model to clarify any incorrect questions."
                : "Review your textbook topics! Use the Learn section to review key ray layouts, and double check physical sign rules."}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                onClick={handleRestart}
                className={`w-full sm:w-auto py-2.5 px-6 text-xs uppercase font-black font-mono tracking-widest rounded-xl border transition-all cursor-pointer shadow ${
                  isLightMode 
                    ? 'border-slate-250 bg-white hover:bg-slate-50 text-blue-900 font-bold' 
                    : 'border-slate-850 hover:border-slate-800 bg-slate-900 text-cyan-400 hover:text-cyan-300 font-black'
                }`}
              >
                Restart Test
              </button>
              
              {!customQuestions && selectedGrade !== "jee" && (
                <button
                  onClick={() => {
                    const nextGrades: Record<QuizGrade, QuizGrade> = {
                      "8th": "10th",
                      "10th": "12th",
                      "12th": "jee",
                      "jee": "8th",
                    };
                    handleGradeSelect(nextGrades[selectedGrade]);
                  }}
                  className={`w-full sm:w-auto py-2.5 px-6 text-xs uppercase font-black font-mono tracking-widest rounded-xl transition-all cursor-pointer shadow ${
                    isLightMode
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:opacity-90 font-bold'
                      : 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 hover:opacity-90 font-black'
                  }`}
                >
                  Promote Difficulty &rarr;
                </button>
              )}
            </div>
          </div>

          {/* 🎓 COMPREHENSIVE Post-Results Solutions Board (Shows detailed solutions 1 to N) */}
          <div className="space-y-4">
            <div className={`flex items-center gap-2 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800'} pb-3`}>
              <BookOpen className={`w-4 h-4 ${isLightMode ? 'text-blue-900' : 'text-cyan-400'}`} />
              <h3 className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-slate-100'} uppercase tracking-wider font-mono`}>
                ✏️ Answer Key, Explanations & Step-By-Step Verified Solutions
              </h3>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {activePool.map((q, qIndex) => {
                const userChoice = userSelections[qIndex];
                const wasCorrect = userChoice === q.correctAnswer;
                const isUnanswered = userChoice === undefined;

                return (
                  <div key={q.id} className={`p-4 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800'} border rounded-xl space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black font-mono uppercase px-2 py-0.5 rounded ${
                        isLightMode
                          ? 'bg-blue-50 text-blue-900 border border-blue-250'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/15'
                      }`}>
                        Question {qIndex + 1}
                      </span>
                      <span className={`text-[9px] font-black font-mono uppercase px-2 py-0.5 rounded ${
                        wasCorrect 
                          ? isLightMode ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : isUnanswered
                          ? isLightMode ? "bg-slate-200 text-slate-500" : "bg-slate-800 text-slate-400"
                          : isLightMode ? "bg-rose-50 text-rose-800 border border-rose-200" : "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                      }`}>
                        {wasCorrect ? "✓ Correct" : isUnanswered ? "∅ Unanswered" : "✗ Incorrect"}
                      </span>
                    </div>

                    <h4 className={`text-xs sm:text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{q.question}</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIndex) => {
                        const isSelectedOpt = userChoice === optIndex;
                        const isCorrectOpt = optIndex === q.correctAnswer;
                        
                        let borderStyle = "";
                        if (isLightMode) {
                          borderStyle = "border-slate-200 text-slate-700 bg-white";
                          if (isCorrectOpt) {
                            borderStyle = "border-emerald-300 text-emerald-900 bg-emerald-50/50";
                          } else if (isSelectedOpt) {
                            borderStyle = "border-rose-300 text-rose-900 bg-rose-50/50";
                          }
                        } else {
                          borderStyle = "border-slate-850 text-slate-250 bg-slate-950/20";
                          if (isCorrectOpt) {
                            borderStyle = "border-emerald-500/30 text-emerald-300 bg-emerald-500/10";
                          } else if (isSelectedOpt) {
                            borderStyle = "border-rose-500/30 text-rose-300 bg-rose-500/10";
                          }
                        }

                        return (
                          <div key={optIndex} className={`p-2 border rounded-lg flex items-center justify-between ${borderStyle}`}>
                            <span>{opt}</span>
                            {isCorrectOpt && <CheckCircle className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`} />}
                            {isSelectedOpt && !isCorrectOpt && <XCircle className={`w-3.5 h-3.5 ${isLightMode ? 'text-rose-700' : 'text-rose-450'}`} />}
                          </div>
                        );
                      })}
                    </div>

                    <div className={`p-3 ${isLightMode ? 'bg-blue-50/60 border-blue-100 text-slate-800' : 'bg-slate-950/70 border-slate-850 text-slate-350'} rounded-lg border text-xs space-y-1`}>
                      <span className={`text-[10px] font-extrabold ${isLightMode ? 'text-blue-900' : 'text-cyan-400'} uppercase tracking-widest block font-mono`}>
                        Detailed Explanation:
                      </span>
                      <p className="font-semibold leading-relaxed font-sans">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
