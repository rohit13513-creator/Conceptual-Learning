import type { GeoSpec } from "./components/GeoFigure";
// Unified Custom TypeScript interfaces for all Question Banks and NCERT Solved Questions

export interface QuizQuestion {
  figure?: GeoSpec;
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface NCERTSolvedQuestion {
  figure?: GeoSpec;
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
  figure?: GeoSpec;
  id: number;
  question: string;
  answer: string;
  keyPoints: string[];
}

export interface LongQuestion {
  figure?: GeoSpec;
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
  figure?: GeoSpec;
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
