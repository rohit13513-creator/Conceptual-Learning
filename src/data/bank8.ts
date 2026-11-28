// Class VIII question banks
// Loaded only when a student opens the question bank, solved questions or self assessment for this class,
// so these question banks are no longer part of the download everyone waits for at log-in.
import type { Bank, BankParams } from './bankTypes';
import { MATHS8SC_ASSERTION_REASON, SCIENCE8IW_ASSERTION_REASON, SCIENCE8IV_ASSERTION_REASON, SCIENCE8H_ASSERTION_REASON, SCIENCE8M_ASSERTION_REASON, SCIENCE8EC_ASSERTION_REASON } from './ar8';
import { CLASS8_NCERT_SOLVED as CLASSVIII_NCERT_SOLVED, CLASS8_MCQS as CLASSVIII_MCQS, CLASS8_ASSERTIONS as CLASSVIII_ASSERTION_REASON, CLASS8_VERY_SHORT as CLASSVIII_VERY_SHORT, CLASS8_SHORT as CLASSVIII_SHORT, CLASS8_LONG as CLASSVIII_LONG, CLASS8_COMPETENCY as CLASSVIII_CASE_COMPETENCY, CLASS8_SELF_ASSESSMENT as CLASSVIII_SELF_ASSESSMENT } from './class8';
import { MATHS8_SOLVED_QUESTIONS, MATHS8_MCQS, MATHS8_ASSERTION_REASON, MATHS8_VERY_SHORT, MATHS8_SHORT, MATHS8_LONG, MATHS8_COMPETENCY, MATHS8_SELF_ASSESSMENT } from './maths8';
import { MATHS8SC_SOLVED_QUESTIONS, MATHS8SC_MCQS, MATHS8SC_VERY_SHORT, MATHS8SC_SHORT, MATHS8SC_LONG, MATHS8SC_COMPETENCY, MATHS8SC_SELF_ASSESSMENT } from './maths8SquareCube';
import { SCIENCE8_SOLVED_QUESTIONS, SCIENCE8_MCQS, SCIENCE8_VERY_SHORT, SCIENCE8_SHORT, SCIENCE8_LONG, SCIENCE8_COMPETENCY, SCIENCE8_SELF_ASSESSMENT } from './science8';
import { SCIENCE8IW_SOLVED_QUESTIONS, SCIENCE8IW_MCQS, SCIENCE8IW_VERY_SHORT, SCIENCE8IW_SHORT, SCIENCE8IW_LONG, SCIENCE8IW_COMPETENCY, SCIENCE8IW_SELF_ASSESSMENT } from './science8InvisibleWorld';
import { SCIENCE8H_SOLVED_QUESTIONS, SCIENCE8H_MCQS, SCIENCE8H_VERY_SHORT, SCIENCE8H_SHORT, SCIENCE8H_LONG, SCIENCE8H_COMPETENCY, SCIENCE8H_SELF_ASSESSMENT } from './science8Health';
import { SCIENCE8M_SOLVED_QUESTIONS, SCIENCE8M_MCQS, SCIENCE8M_VERY_SHORT, SCIENCE8M_SHORT, SCIENCE8M_LONG, SCIENCE8M_COMPETENCY, SCIENCE8M_SELF_ASSESSMENT } from './science8Matter';
import { BP8_MCQS } from './bp8_mcq';
import { BP8_ASSERTIONS } from './bp8_ar';
import { BP8_VERY_SHORT, BP8_SHORT } from './bp8_short';
import { BP8_LONG } from './bp8_long';
import { BP8_COMPETENCY } from './bp8_case';
import { BP8_NCERT_SOLVED } from './bp8_ncert';
import { BP8_SELF_ASSESSMENT } from './bp8_self';
import { FD8_MCQS } from './fd8_mcq';
import { FD8_ASSERTIONS } from './fd8_ar';
import { FD8_VERY_SHORT, FD8_SHORT } from './fd8_short';
import { FD8_LONG } from './fd8_long';
import { FD8_COMPETENCY } from './fd8_case';
import { FD8_NCERT_SOLVED } from './fd8_ncert';
import { FD8_SELF_ASSESSMENT } from './fd8_self';
import { FO8_MCQS } from './fo8_mcq';
import { FO8_ASSERTIONS } from './fo8_ar';
import { FO8_VERY_SHORT, FO8_SHORT } from './fo8_short';
import { FO8_LONG } from './fo8_long';
import { FO8_COMPETENCY } from './fo8_case';
import { FO8_NCERT_SOLVED } from './fo8_ncert';
import { FO8_SELF_ASSESSMENT } from './fo8_self';
import { SOL8_MCQS } from './sol8_mcq';
import { SOL8_ASSERTIONS } from './sol8_ar';
import { SOL8_VERY_SHORT, SOL8_SHORT } from './sol8_short';
import { SOL8_LONG } from './sol8_long';
import { SOL8_COMPETENCY } from './sol8_case';
import { SOL8_NCERT_SOLVED } from './sol8_ncert';
import { SOL8_SELF_ASSESSMENT } from './sol8_self';
import { HARM8_MCQS } from './harm8_mcq';
import { HARM8_ASSERTIONS } from './harm8_ar';
import { HARM8_VERY_SHORT, HARM8_SHORT } from './harm8_short';
import { HARM8_LONG } from './harm8_long';
import { HARM8_COMPETENCY } from './harm8_case';
import { HARM8_NCERT_SOLVED } from './harm8_ncert';
import { HARM8_SELF_ASSESSMENT } from './harm8_self';
import { SCIENCE8EC_SOLVED_QUESTIONS, SCIENCE8EC_MCQS, SCIENCE8EC_VERY_SHORT, SCIENCE8EC_SHORT, SCIENCE8EC_LONG, SCIENCE8EC_COMPETENCY, SCIENCE8EC_SELF_ASSESSMENT } from './science8ElementsCompounds';

export function getBank(p: BankParams): Bank {
  const { preparingFor, qbSubject, mathsChapter8, scienceChapter8 } = p;
  if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'baudhayana') {
    return {
          ncert: BP8_NCERT_SOLVED,
          mcqs: BP8_MCQS,
          veryshort: BP8_VERY_SHORT,
          short: BP8_SHORT,
          long: BP8_LONG,
          assertion: BP8_ASSERTIONS,
          competency: BP8_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'fractions') {
    return {
          ncert: FD8_NCERT_SOLVED,
          mcqs: FD8_MCQS,
          veryshort: FD8_VERY_SHORT,
          short: FD8_SHORT,
          long: FD8_LONG,
          assertion: FD8_ASSERTIONS,
          competency: FD8_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'square-and-cube') {
    return {
          ncert: MATHS8SC_SOLVED_QUESTIONS,
          mcqs: MATHS8SC_MCQS,
          veryshort: MATHS8SC_VERY_SHORT,
          short: MATHS8SC_SHORT,
          long: MATHS8SC_LONG,
          assertion: MATHS8SC_ASSERTION_REASON,
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
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'forces') {
    return {
          ncert: FO8_NCERT_SOLVED,
          mcqs: FO8_MCQS,
          veryshort: FO8_VERY_SHORT,
          short: FO8_SHORT,
          long: FO8_LONG,
          assertion: FO8_ASSERTIONS,
          competency: FO8_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'solutions') {
    return {
          ncert: SOL8_NCERT_SOLVED,
          mcqs: SOL8_MCQS,
          veryshort: SOL8_VERY_SHORT,
          short: SOL8_SHORT,
          long: SOL8_LONG,
          assertion: SOL8_ASSERTIONS,
          competency: SOL8_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'harmony') {
    return {
          ncert: HARM8_NCERT_SOLVED,
          mcqs: HARM8_MCQS,
          veryshort: HARM8_VERY_SHORT,
          short: HARM8_SHORT,
          long: HARM8_LONG,
          assertion: HARM8_ASSERTIONS,
          competency: HARM8_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'elements-compounds') {
    return {
          ncert: SCIENCE8EC_SOLVED_QUESTIONS,
          mcqs: SCIENCE8EC_MCQS,
          veryshort: SCIENCE8EC_VERY_SHORT,
          short: SCIENCE8EC_SHORT,
          long: SCIENCE8EC_LONG,
          assertion: SCIENCE8EC_ASSERTION_REASON,
          competency: SCIENCE8EC_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'matter') {
    return {
          ncert: SCIENCE8M_SOLVED_QUESTIONS,
          mcqs: SCIENCE8M_MCQS,
          veryshort: SCIENCE8M_VERY_SHORT,
          short: SCIENCE8M_SHORT,
          long: SCIENCE8M_LONG,
          assertion: SCIENCE8M_ASSERTION_REASON,
          competency: SCIENCE8M_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'health') {
    return {
          ncert: SCIENCE8H_SOLVED_QUESTIONS,
          mcqs: SCIENCE8H_MCQS,
          veryshort: SCIENCE8H_VERY_SHORT,
          short: SCIENCE8H_SHORT,
          long: SCIENCE8H_LONG,
          assertion: SCIENCE8H_ASSERTION_REASON,
          competency: SCIENCE8H_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'invisible-living-world') {
    return {
          ncert: SCIENCE8IW_SOLVED_QUESTIONS,
          mcqs: SCIENCE8IW_MCQS,
          veryshort: SCIENCE8IW_VERY_SHORT,
          short: SCIENCE8IW_SHORT,
          long: SCIENCE8IW_LONG,
          assertion: SCIENCE8IV_ASSERTION_REASON,
          competency: SCIENCE8IW_COMPETENCY,
    };
  } else if (preparingFor === '8th' && qbSubject === 'science') {
    return {
          ncert: SCIENCE8_SOLVED_QUESTIONS,
          mcqs: SCIENCE8_MCQS,
          veryshort: SCIENCE8_VERY_SHORT,
          short: SCIENCE8_SHORT,
          long: SCIENCE8_LONG,
          assertion: SCIENCE8IW_ASSERTION_REASON,
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
  if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'baudhayana') return BP8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'fractions') return FD8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'maths' && mathsChapter8 === 'square-and-cube') return MATHS8SC_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'maths') return MATHS8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'forces') return FO8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'solutions') return SOL8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'harmony') return HARM8_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'invisible-living-world') return SCIENCE8IW_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'health') return SCIENCE8H_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'matter') return SCIENCE8M_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science' && scienceChapter8 === 'elements-compounds') return SCIENCE8EC_SELF_ASSESSMENT;
  if (preparingFor === '8th' && qbSubject === 'science') return SCIENCE8_SELF_ASSESSMENT;
  return CLASSVIII_SELF_ASSESSMENT;
}
