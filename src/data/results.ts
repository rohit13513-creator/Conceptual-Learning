// Student results shown on the public home page, exactly as supplied by the teacher. A blank value
// means that number was not provided. Marks are shown as written (some lists give "x/100", some give
// just the mark).
export interface ResultRow {
  name: string;
  tag?: string;
  overall?: string;
  maths?: string;
  science?: string;
}

export interface ResultSlide {
  id: string;
  tab: string;
  exam: string;
  year: string;
  title: string;
  subtitle?: string;
  rows: ResultRow[];
  extraTitle?: string;
  extraRows?: ResultRow[];
}

export const RESULT_SLIDES: ResultSlide[] = [
  {
    id: '2026-27',
    tab: '2026-27',
    exam: 'Class X CBSE Board',
    year: '2026-27',
    title: 'Class X CBSE Board Results 2026-27',
    rows: [
      { name: 'Saatvik Sharma', overall: '98.6%', maths: '97/100', science: '99/100' },
      { name: 'Aarav Madaan', overall: '97.8%', maths: '99/100', science: '98/100' },
      { name: 'Praneet', overall: '97.6%', maths: '95/100', science: '99/100' },
      { name: 'Debjyoti Pal', overall: '97.2%', maths: '90/100', science: '97/100' },
      { name: 'Ansh Verma', overall: '97%', maths: '88/100', science: '96/100' },
      { name: 'Prachi Mishra', overall: '96.4%', maths: '95/100', science: '90/100' },
      { name: 'Drishti Mittal', overall: '96%', maths: '93/100', science: '95/100' },
      { name: 'Kavya Panda', overall: '95.6%', maths: '87/100', science: '95/100' },
      { name: 'Prajnil Sehrawat', overall: '93%', maths: '83/100', science: '94/100' },
      { name: 'Unnati Versha Sachan', overall: '92%', maths: '88/100', science: '91/100' },
      { name: 'Avneesh', overall: '92%', maths: '78/100', science: '93/100' },
      { name: 'Sahil', overall: '92%', maths: '81/100', science: '91/100' },
      { name: 'Advik Paul', maths: '80/100', science: '86/100' },
    ],
    extraTitle: 'Subject-specific results',
    extraRows: [
      { name: 'Tanmay', science: '93/100' },
      { name: 'Shreya Chaudhary', science: '90/100' },
      { name: 'Adeeb', maths: '89/100' },
      { name: 'Anant', science: '87/100' },
    ],
  },
  {
    id: '2025-26-ix',
    tab: '2025-26 Class IX',
    exam: 'Class IX',
    year: '2025-26',
    title: 'Class IX Results 2025-26',
    subtitle: 'Marks out of 80',
    rows: [
      { name: 'Parth Gupta', tag: 'School Topper', maths: '80/80', science: '77/80' },
      { name: 'Adwika Sharma', maths: '80/80', science: '78/80' },
      { name: 'Arush', maths: '80/80', science: '75/80' },
      { name: 'Rohan', tag: 'School 2nd Topper', maths: '79/80', science: '77/80' },
      { name: 'Vatsal', tag: 'School Topper', maths: '76/80', science: '77/80' },
      { name: 'Aarna', maths: '76/80', science: '75/80' },
      { name: 'Arjun Bharadwaj', maths: '74/80', science: '72.5/80' },
      { name: 'Manvi', maths: '76.5/80' },
      { name: 'Pratyush', maths: '71/80', science: '69/80' },
      { name: 'Rishika', science: '71/80' },
      { name: 'Anvesha', science: '71/80' },
      { name: 'Vriddhi', science: '71/80' },
    ],
  },
  {
    id: '2025-26-viii',
    tab: '2025-26 Class VIII',
    exam: 'Class VIII',
    year: '2025-26',
    title: 'Class VIII Results 2025-26',
    subtitle: 'Marks out of 80 (Anishka and Daksh: out of 70)',
    rows: [
      { name: 'Satataya', maths: '77.5/80', science: '76/80' },
      { name: 'Aparna', maths: '75/80', science: '77/80' },
      { name: 'Jyotsana', maths: '76/80', science: '74/80' },
      { name: 'Anishka', maths: '69/70', science: '66.5/70' },
      { name: 'Daksh', maths: '62.5/70', science: '65/70' },
      { name: 'Devya', maths: '79/80' },
      { name: 'Sarbani', maths: '75/80' },
    ],
  },
  {
    id: '2024-25',
    tab: '2024-25',
    exam: 'Class X CBSE Board',
    year: '2024-25',
    title: 'Class X CBSE Board Results 2024-25',
    subtitle: 'Scores of a few of our heroes',
    rows: [
      { name: 'Aviral Sharma', overall: '97.8%', maths: '99', science: '99' },
      { name: 'Aradhya Dwivedi', overall: '96.4%', maths: '90', science: '97' },
      { name: 'Yatharth Varshney', overall: '91%', maths: '88', science: '93' },
      { name: 'Ananya Singh', maths: '90', science: '85' },
      { name: 'Praneel Sehrawat', maths: '81', science: '92' },
      { name: 'Namrata Aggarwal', maths: '82', science: '95' },
      { name: 'Dhavna Jain', maths: '82', science: '88' },
      { name: 'Kaushani Chandra', science: '96' },
      { name: 'Preksha Sharma', science: '90' },
      { name: 'Anvita Murali', science: '87' },
      { name: 'Akshit Pillai', science: '87' },
      { name: 'Snitik Chaudhary', science: '87' },
      { name: 'Somukh Vats', science: '85' },
      { name: 'Stuti Mishra', science: '84' },
    ],
  },
  {
    id: '2023-24',
    tab: '2023-24',
    exam: 'Class X CBSE Board',
    year: '2023-24',
    title: 'Class X CBSE Board Results 2023-24',
    rows: [
      { name: 'Avni', overall: '97%', maths: '95', science: '94' },
      { name: 'Aarav Saxena', overall: '92%', maths: '98', science: '86' },
      { name: 'Pratham', overall: '88%', maths: '91', science: '85' },
      { name: 'Sneha', overall: '81%', maths: '81', science: '82' },
    ],
  },
  {
    id: '2022-23',
    tab: '2022-23',
    exam: 'CBSE High School',
    year: '2022-23',
    title: 'CBSE High School Results 2022-23',
    rows: [
      { name: 'Anya Singh', maths: '95' },
      { name: 'Tanishk', science: '91' },
    ],
  },
];

export interface ScoreCard {
  key: string;
  name: string;
  subject: string;
  marks: string;
  percent: number;
  exam: string;
  year: string;
  achievement?: string;
}

const percentOf = (v?: string): number | null => {
  if (!v) return null;
  const frac = v.match(/^\s*([\d.]+)\s*\/\s*([\d.]+)\s*$/);
  if (frac) return (parseFloat(frac[1]) / parseFloat(frac[2])) * 100;
  const num = parseFloat(v);
  return Number.isNaN(num) ? null : num;
};

// One card per single score of 90% or more -- a student with a 90+ in Maths and a 90+ in Science
// gets two cards, never one combined card. A bare mark (e.g. "99") is out of 100; "x/y" is judged
// against y (80 or 70 for the school exams); overall is already a percentage.
export const SCORE_CARDS: ScoreCard[] = (() => {
  const cards: ScoreCard[] = [];
  for (const slide of RESULT_SLIDES) {
    for (const row of [...slide.rows, ...(slide.extraRows || [])]) {
      const entries: [string, string | undefined][] = [
        ['Overall percentage', row.overall],
        ['Maths', row.maths],
        ['Science', row.science],
      ];
      for (const [subject, raw] of entries) {
        const p = percentOf(raw);
        if (!raw || p === null || p < 90) continue;
        const marks = subject === 'Overall percentage' || raw.includes('/') ? raw : raw + '/100';
        cards.push({
          key: slide.id + '|' + row.name + '|' + subject,
          name: row.name,
          subject,
          marks,
          percent: p,
          exam: slide.exam,
          year: slide.year,
          achievement: row.tag,
        });
      }
    }
  }
  return cards;
})();
