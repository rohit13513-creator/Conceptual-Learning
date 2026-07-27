// Unified Custom TypeScript interfaces for all Question Banks and NCERT Solved Questions

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface NCERTSolvedQuestion {
  id: number;
  questionNumber: string;
  question: string;
  given: { [key: string]: string };
  formulaUsed: string;
  derivationSteps: string[];
  finalAnswer: string;
  conceptualTip?: string;
  grade?: "8th" | "10th";
}

export interface ShortQuestion {
  id: number;
  question: string;
  answer: string;
  keyPoints: string[];
}

export interface LongQuestion {
  id: number;
  question: string;
  markingScheme: string[];
  answerParts: { part: string; text: string }[];
}

export interface AssertionReasonQuestion {
  id: number;
  assertion: string;
  reason: string;
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface CompetencyQuestion {
  id: number;
  caseTitle: string;
  caseDescription: string;
  subQuestions: {
    question: string;
    options?: string[];
    correctIndex?: number;
    answer: string;
    explanation?: string;
  }[];
}
