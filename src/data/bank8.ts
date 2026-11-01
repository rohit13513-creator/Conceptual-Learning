// Class VIII question banks
// Loaded only when a student opens the question bank, solved questions or self assessment for this class,
// so these question banks are no longer part of the download everyone waits for at log-in.
import type { Bank, BankParams } from './bankTypes';
import { CLASS8_NCERT_SOLVED as CLASSVIII_NCERT_SOLVED, CLASS8_MCQS as CLASSVIII_MCQS, CLASS8_ASSERTIONS as CLASSVIII_ASSERTION_REASON, CLASS8_VERY_SHORT as CLASSVIII_VERY_SHORT, CLASS8_SHORT as CLASSVIII_SHORT, CLASS8_LONG as CLASSVIII_LONG, CLASS8_COMPETENCY as CLASSVIII_CASE_COMPETENCY, CLASS8_SELF_ASSESSMENT as CLASSVIII_SELF_ASSESSMENT } from './class8';
import { MATHS8_SOLVED_QUESTIONS, MATHS8_MCQS, MATHS8_ASSERTION_REASON, MATHS8_VERY_SHORT, MATHS8_SHORT, MATHS8_LONG, MATHS8_COMPETENCY, MATHS8_SELF_ASSESSMENT } from './maths8';
import { MATHS8SC_SOLVED_QUESTIONS, MATHS8SC_MCQS, MATHS8SC_VERY_SHORT, MATHS8SC_SHORT, MATHS8SC_LONG, MATHS8SC_COMPETENCY, MATHS8SC_SELF_ASSESSMENT } from './maths8SquareCube';
import { SCIENCE8_SOLVED_QUESTIONS, SCIENCE8_MCQS, SCIENCE8_VERY_SHORT, SCIENCE8_SHORT, SCIENCE8_LONG, SCIENCE8_COMPETENCY, SCIENCE8_SELF_ASSESSMENT } from './science8';
import { SCIENCE8IW_SOLVED_QUESTIONS, SCIENCE8IW_MCQS, SCIENCE8IW_VERY_SHORT, SCIENCE8IW_SHORT, SCIENCE8IW_LONG, SCIENCE8IW_COMPETENCY, SCIENCE8IW_SELF_ASSESSMENT } from './science8InvisibleWorld';
import { SCIENCE8H_SOLVED_QUESTIONS, SCIENCE8H_MCQS, SCIENCE8H_VERY_SHORT, SCIENCE8H_SHORT, SCIENCE8H_LONG, SCIENCE8H_COMPETENCY, SCIENCE8H_SELF_ASSESSMENT } from './science8Health';
import { SCIENCE8M_SOLVED_QUESTIONS, SCIENCE8M_MCQS, SCIENCE8M_VERY_SHORT, SCIENCE8M_SHORT, SCIENCE8M_LONG, SCIENCE8M_COMPETENCY, SCIENCE8M_SELF_ASSESSMENT } from './science8Matter';
import { SCIENCE8EC_SOLVED_QUESTIONS, SCIENCE8EC_MCQS, SCIENCE8EC_VERY_SHORT, SCIENCE8EC_SHORT, SCIENCE8EC_LONG, SCIENCE8EC_COMPETENCY, SCIENCE8EC_SELF_ASSESSMENT } from './science8ElementsCompounds';

export function getBank(p: BankParams): Bank {
  const { preparingFor, qbSubject, mathsChapter8, scienceChapter8 } = p;
  if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'square-and-cube') {
    return {
          ncert: MATHS8SC_SOLVED_QUESTIONS,
          mcqs: MATHS8SC_MCQS,
          veryshort: MATHS8SC_VERY_SHORT,
          short: MATHS8SC_SHORT,
          long: MATHS8SC_LONG,
          assertion: [] as typeof MATHS8_ASSERTION_REASON,
          competency: MATHS8SC_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'maths') {
    return {
          ncert: MATHS8_SOLVED_QUESTIONS,
          mcqs: MATHS8_MCQS,
          veryshort: MATHS8_VERY_SHORT,
          short: MATHS8_SHORT,
          long: MATHS8_LONG,
          assertion: MATHS8_ASSERTION_REASON,
          competency: MATHS8_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'elements-compounds') {
    return {
          ncert: SCIENCE8EC_SOLVED_QUESTIONS,
          mcqs: SCIENCE8EC_MCQS,
          veryshort: SCIENCE8EC_VERY_SHORT,
          short: SCIENCE8EC_SHORT,
          long: SCIENCE8EC_LONG,
          assertion: [] as typeof MATHS8_ASSERTION_REASON,
          competency: SCIENCE8EC_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'matter') {
    return {
          ncert: SCIENCE8M_SOLVED_QUESTIONS,
          mcqs: SCIENCE8M_MCQS,
          veryshort: SCIENCE8M_VERY_SHORT,
          short: SCIENCE8M_SHORT,
          long: SCIENCE8M_LONG,
          assertion: [] as typeof MATHS8_ASSERTION_REASON,
          competency: SCIENCE8M_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'health') {
    return {
          ncert: SCIENCE8H_SOLVED_QUESTIONS,
          mcqs: SCIENCE8H_MCQS,
          veryshort: SCIENCE8H_VERY_SHORT,
          short: SCIENCE8H_SHORT,
          long: SCIENCE8H_LONG,
          assertion: [] as typeof MATHS8_ASSERTION_REASON,
          competency: SCIENCE8H_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'invisible-living-world') {
    return {
          ncert: SCIENCE8IW_SOLVED_QUESTIONS,
          mcqs: SCIENCE8IW_MCQS,
          veryshort: SCIENCE8IW_VERY_SHORT,
          short: SCIENCE8IW_SHORT,
          long: SCIENCE8IW_LONG,
          assertion: [] as typeof MATHS8_ASSERTION_REASON,
          competency: SCIENCE8IW_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science') {
    return {
          ncert: SCIENCE8_SOLVED_QUESTIONS,
          mcqs: SCIENCE8_MCQS,
          veryshort: SCIENCE8_VERY_SHORT,
          short: SCIENCE8_SHORT,
          long: SCIENCE8_LONG,
          assertion: [] as typeof MATHS8_ASSERTION_REASON,
          competency: SCIENCE8_COMPETENCY,
    };
  } else {
    return {
          ncert: CLASSVIII_NCERT_SOLVED,
          mcqs: CLASSVIII_MCQS,
          veryshort: CLASSVIII_VERY_SHORT,
          short: CLASSVIII_SHORT,
          long: CLASSVIII_LONG,
          assertion: CLASSVIII_ASSERTION_REASON,
          competency: CLASSVIII_CASE_COMPETENCY,
    };
  }
}

export function getSelf(p: BankParams): any[] {
  const { preparingFor, qbSubject, mathsChapter8, scienceChapter8 } = p;
  if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'square-and-cube') return MATHS8SC_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'maths') return MATHS8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'invisible-living-world') return SCIENCE8IW_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'health') return SCIENCE8H_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'matter') return SCIENCE8M_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'elements-compounds') return SCIENCE8EC_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science') return SCIENCE8_SELF_ASSESSMENT;
  return CLASSVIII_SELF_ASSESSMENT;
}
