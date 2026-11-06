// Class IX question banks
// Loaded only when a student opens the question bank, solved questions or self assessment for this class,
// so these question banks are no longer part of the download everyone waits for at log-in.
import type { Bank, BankParams } from './bankTypes';
import { CLASS10_ASSERTIONS as CLASSX_ASSERTION_REASON } from './class10';
import { BIOLOGY9_NCERT_SOLVED, BIOLOGY9_MCQS, BIOLOGY9_VERY_SHORT, BIOLOGY9_SHORT, BIOLOGY9_LONG, BIOLOGY9_COMPETENCY, BIOLOGY9_SELF_ASSESSMENT } from './biology9';
import { PHYSICS9_NCERT_SOLVED, PHYSICS9_MCQS, PHYSICS9_ASSERTION_REASON, PHYSICS9_VERY_SHORT, PHYSICS9_SHORT, PHYSICS9_LONG, PHYSICS9_COMPETENCY, PHYSICS9_SELF_ASSESSMENT } from './physics9';
import { FORCES9_MCQS } from './forces9_mcq';
import { FORCES9_VERY_SHORT, FORCES9_SHORT } from './forces9_short';
import { FORCES9_LONG, FORCES9_COMPETENCY } from './forces9_long';
import { FORCES9_NCERT_SOLVED, FORCES9_SELF_ASSESSMENT } from './forces9_practice';
import { ENERGY9_MCQS } from './energy9_mcq';
import { ENERGY9_VERY_SHORT, ENERGY9_SHORT } from './energy9_short';
import { ENERGY9_LONG, ENERGY9_COMPETENCY } from './energy9_long';
import { ENERGY9_NCERT_SOLVED, ENERGY9_SELF_ASSESSMENT } from './energy9_practice';
import { SOUND9_MCQS } from './sound9_mcq';
import { SOUND9_VERY_SHORT, SOUND9_SHORT } from './sound9_short';
import { SOUND9_LONG, SOUND9_COMPETENCY } from './sound9_long';
import { SOUND9_NCERT_SOLVED, SOUND9_SELF_ASSESSMENT } from './sound9_practice';
import { FOUNDATIONS9_MCQS } from './foundations9_mcq';
import { FOUNDATIONS9_VERY_SHORT, FOUNDATIONS9_SHORT } from './foundations9_short';
import { FOUNDATIONS9_LONG, FOUNDATIONS9_COMPETENCY } from './foundations9_long';
import { FOUNDATIONS9_NCERT_SOLVED, FOUNDATIONS9_SELF_ASSESSMENT } from './foundations9_practice';
import { TISSUES9_MCQS } from './tissues9_mcq';
import { TISSUES9_VERY_SHORT, TISSUES9_SHORT } from './tissues9_short';
import { TISSUES9_LONG, TISSUES9_COMPETENCY } from './tissues9_long';
import { TISSUES9_NCERT_SOLVED, TISSUES9_SELF_ASSESSMENT } from './tissues9_practice';
import { DIVERSITY9_MCQS } from './diversity9_mcq';
import { DIVERSITY9_VERY_SHORT, DIVERSITY9_SHORT } from './diversity9_short';
import { DIVERSITY9_LONG, DIVERSITY9_COMPETENCY } from './diversity9_long';
import { DIVERSITY9_NCERT_SOLVED } from './diversity9_ncert';
import { DIVERSITY9_SELF_ASSESSMENT } from './diversity9_self';
import { CIRCLES9_MCQS } from './circles9_mcq';
import { CIRCLES9_VERY_SHORT, CIRCLES9_SHORT } from './circles9_short';
import { CIRCLES9_LONG, CIRCLES9_COMPETENCY } from './circles9_long';
import { CIRCLES9_NCERT_SOLVED } from './circles9_ncert';
import { PROPS9_MCQS } from './props9_mcq';
import { PROPS9_VERY_SHORT, PROPS9_SHORT } from './props9_short';
import { PROPS9_LONG, PROPS9_COMPETENCY } from './props9_long';
import { PROPS9_NCERT_SOLVED } from './props9_ncert';
import { PROPS9_SELF_ASSESSMENT } from './props9_self';
import { SOUND9_SELF_MORE } from './sound9_self_more';
import { CIRCLES9_SELF_ASSESSMENT } from './circles9_self';

export function getBank(p: BankParams): Bank {
  const { preparingFor, qbSubject, physicsChapter9, bioChapter9, mathsChapter9 } = p;
  if (preparingFor === '9th' && qbSubject === 'maths' && mathsChapter9 === 'propositions') {
    return {
          ncert: PROPS9_NCERT_SOLVED,
          mcqs: PROPS9_MCQS,
          veryshort: PROPS9_VERY_SHORT,
          short: PROPS9_SHORT,
          long: PROPS9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: PROPS9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'physics' && physicsChapter9 === 'sound') {
    return {
          ncert: SOUND9_NCERT_SOLVED,
          mcqs: SOUND9_MCQS,
          veryshort: SOUND9_VERY_SHORT,
          short: SOUND9_SHORT,
          long: SOUND9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: SOUND9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'physics' && physicsChapter9 === 'energy') {
    return {
          ncert: ENERGY9_NCERT_SOLVED,
          mcqs: ENERGY9_MCQS,
          veryshort: ENERGY9_VERY_SHORT,
          short: ENERGY9_SHORT,
          long: ENERGY9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: ENERGY9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'physics' && physicsChapter9 === 'forces') {
    return {
          ncert: FORCES9_NCERT_SOLVED,
          mcqs: FORCES9_MCQS,
          veryshort: FORCES9_VERY_SHORT,
          short: FORCES9_SHORT,
          long: FORCES9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: FORCES9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'physics') {
    return {
          ncert: PHYSICS9_NCERT_SOLVED,
          mcqs: PHYSICS9_MCQS,
          veryshort: PHYSICS9_VERY_SHORT,
          short: PHYSICS9_SHORT,
          long: PHYSICS9_LONG,
          assertion: PHYSICS9_ASSERTION_REASON,
          competency: PHYSICS9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'biology' && bioChapter9 === 'diversity') {
    return {
          ncert: DIVERSITY9_NCERT_SOLVED,
          mcqs: DIVERSITY9_MCQS,
          veryshort: DIVERSITY9_VERY_SHORT,
          short: DIVERSITY9_SHORT,
          long: DIVERSITY9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: DIVERSITY9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'biology' && bioChapter9 === 'tissues') {
    return {
          ncert: TISSUES9_NCERT_SOLVED,
          mcqs: TISSUES9_MCQS,
          veryshort: TISSUES9_VERY_SHORT,
          short: TISSUES9_SHORT,
          long: TISSUES9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: TISSUES9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'maths') {
    return {
          ncert: CIRCLES9_NCERT_SOLVED,
          mcqs: CIRCLES9_MCQS,
          veryshort: CIRCLES9_VERY_SHORT,
          short: CIRCLES9_SHORT,
          long: CIRCLES9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: CIRCLES9_COMPETENCY,
    };
  } else if (preparingFor === '9th' && qbSubject === 'foundations') {
    return {
          ncert: FOUNDATIONS9_NCERT_SOLVED,
          mcqs: FOUNDATIONS9_MCQS,
          veryshort: FOUNDATIONS9_VERY_SHORT,
          short: FOUNDATIONS9_SHORT,
          long: FOUNDATIONS9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: FOUNDATIONS9_COMPETENCY,
    };
  } else {
    return {
          ncert: BIOLOGY9_NCERT_SOLVED,
          mcqs: BIOLOGY9_MCQS,
          veryshort: BIOLOGY9_VERY_SHORT,
          short: BIOLOGY9_SHORT,
          long: BIOLOGY9_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: BIOLOGY9_COMPETENCY,
    };
  }
}

export function getSelf(p: BankParams): any[] {
  const { qbSubject, physicsChapter9, bioChapter9, mathsChapter9 } = p;
  // Class IX Maths: both chapters have a self assessment (Circles: 100 questions, Propositions and Converses: 50).
  if (qbSubject === 'maths') return mathsChapter9 === 'propositions' ? PROPS9_SELF_ASSESSMENT : CIRCLES9_SELF_ASSESSMENT;
  return (qbSubject === 'physics' ? (physicsChapter9 === 'sound' ? [...SOUND9_SELF_ASSESSMENT, ...SOUND9_SELF_MORE] : physicsChapter9 === 'energy' ? ENERGY9_SELF_ASSESSMENT : physicsChapter9 === 'forces' ? FORCES9_SELF_ASSESSMENT : PHYSICS9_SELF_ASSESSMENT) : qbSubject === 'foundations' ? FOUNDATIONS9_SELF_ASSESSMENT : bioChapter9 === 'diversity' ? DIVERSITY9_SELF_ASSESSMENT : bioChapter9 === 'tissues' ? TISSUES9_SELF_ASSESSMENT : BIOLOGY9_SELF_ASSESSMENT);
}
