// Shared helpers for the School Marks feature (a student's own school exams, to follow their progress).

export interface MarksEntry {
  id: string;
  academicYear: string; // e.g. 2026-27
  examName: string;
  subject: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  examDate: string | null;
  studentClass: string | null;
  createdAt?: string;
  // whether the mark has been checked against the student's result page / test copy
  verificationStatus?: 'unverified' | 'verified' | 'mismatch' | 'review';
  verificationNote?: string | null;
  hasProof?: boolean;
}

export const EXAM_PRESETS = ['PT1', 'PT2', 'Half Yearly', 'PT3', 'PT4', 'Final Exam'];
export const SUBJECT_CHOICES = ['Maths', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit', 'Computer Science'];

/** School years run April to March: in November 2026 the year is "2026-27", in February 2027 it is still "2026-27". */
export function currentAcademicYear(now = new Date()): string {
  const start = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, '0')}`;
}

export function academicYearOptions(now = new Date()): string[] {
  const current = Number(currentAcademicYear(now).slice(0, 4));
  return [current + 1, current, current - 1, current - 2, current - 3].map((y) => `${y}-${String((y + 1) % 100).padStart(2, '0')}`);
}

const examOrder = (name: string) => {
  const i = EXAM_PRESETS.findIndex((p) => p.toLowerCase() === name.toLowerCase());
  return i >= 0 ? i + 1 : 100;
};

export function sortChronologically(entries: MarksEntry[]): MarksEntry[] {
  return entries.slice().sort((a, b) =>
    a.academicYear.localeCompare(b.academicYear) || examOrder(a.examName) - examOrder(b.examName) ||
    String(a.examDate || a.createdAt || '').localeCompare(String(b.examDate || b.createdAt || '')) || a.subject.localeCompare(b.subject));
}

export interface ExamGroup {
  key: string;
  academicYear: string;
  examName: string;
  entries: MarksEntry[];
  overall: number | null; // total marks obtained / total maximum marks over the subjects entered for this exam
}

export function groupExams(entries: MarksEntry[]): ExamGroup[] {
  const groups = new Map<string, ExamGroup>();
  for (const e of sortChronologically(entries)) {
    const key = `${e.academicYear}|${e.examName}`;
    if (!groups.has(key)) groups.set(key, { key, academicYear: e.academicYear, examName: e.examName, entries: [], overall: null });
    groups.get(key)!.entries.push(e);
  }
  for (const g of groups.values()) {
    const obtained = g.entries.reduce((a, e) => a + e.marksObtained, 0);
    const max = g.entries.reduce((a, e) => a + e.maxMarks, 0);
    g.overall = max > 0 ? Math.round((obtained / max) * 1000) / 10 : null;
  }
  return [...groups.values()];
}

export interface SubjectSummary {
  subject: string;
  latest: number;
  latestExam: string;
  change: number | null; // difference from the exam before it, in percentage points
  best: number;
  average: number;
  count: number;
}

export function summariseSubjects(entries: MarksEntry[]): SubjectSummary[] {
  const bySubject = new Map<string, MarksEntry[]>();
  for (const e of sortChronologically(entries)) {
    if (!bySubject.has(e.subject)) bySubject.set(e.subject, []);
    bySubject.get(e.subject)!.push(e);
  }
  return [...bySubject.entries()].map(([subject, list]) => {
    const last = list[list.length - 1];
    const before = list.length > 1 ? list[list.length - 2] : null;
    const pcts = list.map((e) => e.percentage);
    return {
      subject,
      latest: last.percentage,
      latestExam: `${last.examName} ${last.academicYear}`,
      change: before ? Math.round((last.percentage - before.percentage) * 10) / 10 : null,
      best: Math.max(...pcts),
      average: Math.round((pcts.reduce((a, b) => a + b, 0) / pcts.length) * 10) / 10,
      count: list.length,
    };
  }).sort((a, b) => a.subject.localeCompare(b.subject));
}

/** A short label for the chart's bottom axis. */
export function shortExamName(name: string): string {
  if (name === 'Half Yearly') return 'HY';
  if (name === 'Final Exam') return 'Final';
  return name.length > 9 ? name.slice(0, 8) + '…' : name;
}

export const SERIES_COLORS = ['#22d3ee', '#f59e0b', '#34d399', '#a78bfa', '#fb7185', '#60a5fa', '#f472b6', '#facc15'];
