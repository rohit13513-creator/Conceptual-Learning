export enum DeviceType {
  PLANE_MIRROR = "PLANE_MIRROR",
  CONCAVE_MIRROR = "CONCAVE_MIRROR",
  CONVEX_MIRROR = "CONVEX_MIRROR",
  CONVEX_LENS = "CONVEX_LENS",
  CONCAVE_LENS = "CONCAVE_LENS",
}

export interface Preset {
  id: string;
  label: string;
  u: number; // Object distance in virtual units
  description: string;
}

export interface NCERTTableRow {
  objectPos: string;
  imagePos: string;
  size: string;
  nature: string;
  rangeMinU: number; // min u (absolute) to match this state
  rangeMaxU: number; // max u (absolute) to match this state
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
