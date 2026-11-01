// Shape shared by the per-class question bank modules and the screens that show them.
export interface BankParams {
  preparingFor: string;
  qbSubject: string;
  physicsChapter9: string;
  bioChapter9: string;
  bioChapter10: string;
  chemChapter10: string;
  mathsChapter8: string;
  scienceChapter8: string;
}

export interface Bank {
  ncert: any[];
  mcqs: any[];
  veryshort: any[];
  short: any[];
  long: any[];
  assertion: any[];
  competency: any[];
}
