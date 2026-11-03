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
  durationMinutes: number;
  maxMarks: number;
  note?: string; // one line shown on the card, e.g. the marking rule
  paperFile?: string; // file name in the private "downloads" storage folder
  keyFile?: string;
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
    maxMarks: 100,
    note: "Negative marking for wrong answers.",
    paperFile: "mock-x-bio-1-paper.pdf",
    keyFile: "mock-x-bio-1-key.pdf",
  },
];

export const findMockTest = (id: string): MockTest | undefined => MOCK_TESTS.find((t) => t.id === id);
