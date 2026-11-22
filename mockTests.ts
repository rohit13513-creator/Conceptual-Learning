// The Class X Mock Test Series shown on the home page. Shared by the server (which hands out the list and the PDFs
// after login) and the checks. To add a test: upload its PDFs with  node scripts/upload-mock-test.mjs  and add an entry
// below. Dates are the day of the test (YYYY-MM-DD). A test with no PDF files yet is shown as an upcoming test.
export interface MockTest {
  id: string;
  classLabel: "X";
  number: number; // 1 to 7
  title: string;
  subject: string;
  date: string;
  durationMinutes?: number; // left out for a test whose paper is not announced yet
  maxMarks?: number; // left out for a test whose paper is not announced yet (a result needs it)
  note?: string; // one line shown on the card, e.g. the marking rule
  paperFile?: string; // file name in the private "downloads" storage folder
  keyFile?: string;
  solutionsFile?: string; // the worked solutions of the paper
}

export const MOCK_SERIES = {
  classLabel: "X" as const,
  title: "Class X Mock Test Series",
  summary: "7 Maths and Science tests till the Board examinations.",
  totalTests: 7,
};

export const MOCK_TESTS: MockTest[] = [
  {
    id: "x-bio-1",
    classLabel: "X",
    number: 1,
    title: "Biology MCQ Test",
    subject: "Biology: complete syllabus",
    date: "2026-11-02",
    durationMinutes: 50,
    maxMarks: 75,
    note: "+1 for a correct answer, -0.25 for a wrong answer, 0 if not attempted. A correct answer written with the option letter or the statement missing loses 1 mark (at most 5 marks).",
    paperFile: "mock-x-bio-1-paper.pdf",
    keyFile: "mock-x-bio-1-key.pdf",
  },
  {
    id: "x-maths-1",
    classLabel: "X",
    number: 2,
    title: "Maths Mock Test",
    subject: "Mathematics (Standard)",
    date: "2026-11-22",
    durationMinutes: 150,
    maxMarks: 80,
    note: "Board pattern paper of 38 questions in five sections. Calculator is not allowed.",
    paperFile: "mock-x-maths-1-paper.pdf",
    keyFile: "mock-x-maths-1-key.pdf",
    solutionsFile: "mock-x-maths-1-solutions.pdf",
  },
  {
    id: "x-test-3",
    classLabel: "X",
    number: 3,
    title: "Mock Test 3",
    subject: "Subject and syllabus will be announced",
    date: "2026-11-29",
  },
];

export const findMockTest = (id: string): MockTest | undefined => MOCK_TESTS.find((t) => t.id === id);
