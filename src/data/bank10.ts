// Class X question banks
// Loaded only when a student opens the question bank, solved questions or self assessment for this class,
// so these question banks are no longer part of the download everyone waits for at log-in.
import type { Bank, BankParams } from './bankTypes';
import { CLASS10_NCERT_SOLVED as CLASSX_NCERT_SOLVED, CLASS10_MCQS as CLASSX_MCQS, CLASS10_ASSERTIONS as CLASSX_ASSERTION_REASON, CLASS10_VERY_SHORT as CLASSX_VERY_SHORT, CLASS10_SHORT as CLASSX_SHORT, CLASS10_LONG as CLASSX_LONG, CLASS10_COMPETENCY as CLASSX_CASE_COMPETENCY, CLASS10_SELF_ASSESSMENT as CLASSX_SELF_ASSESSMENT } from './class10';
import { CHEMISTRY10_NCERT_SOLVED, CHEMISTRY10_MCQS, CHEMISTRY10_ASSERTIONS as CHEMISTRY10_ASSERTION_REASON, CHEMISTRY10_VERY_SHORT, CHEMISTRY10_SHORT, CHEMISTRY10_LONG, CHEMISTRY10_COMPETENCY, CHEMISTRY10_SELF_ASSESSMENT } from './chemistry10';
import { BIOLOGY10_NCERT_SOLVED, BIOLOGY10_MCQS, BIOLOGY10_VERY_SHORT, BIOLOGY10_SHORT, BIOLOGY10_LONG, BIOLOGY10_COMPETENCY, BIOLOGY10_SELF_ASSESSMENT } from './biology10';
import { CC10_NCERT_SOLVED, CC10_MCQS, CC10_VERY_SHORT, CC10_SHORT, CC10_LONG, CC10_COMPETENCY, CC10_SELF_ASSESSMENT } from './controlCoordination10';
import { REPRO10_MCQS } from './reproduction10_mcq';
import { REPRO10_VERY_SHORT, REPRO10_SHORT } from './reproduction10_short';
import { REPRO10_LONG, REPRO10_COMPETENCY } from './reproduction10_long';
import { REPRO10_NCERT_SOLVED, REPRO10_SELF_ASSESSMENT } from './reproduction10_practice';
import { HEREDITY10_MCQS } from './heredity10_mcq';
import { HEREDITY10_VERY_SHORT, HEREDITY10_SHORT } from './heredity10_short';
import { HEREDITY10_LONG, HEREDITY10_COMPETENCY } from './heredity10_long';
import { HEREDITY10_NCERT_SOLVED, HEREDITY10_SELF_ASSESSMENT } from './heredity10_practice';
import { CARBON10_MCQ_A } from './carbon10_mcqA';
import { CARBON10_MCQ_B } from './carbon10_mcqB';
import { CARBON10_VERY_SHORT, CARBON10_SHORT } from './carbon10_short';
import { CARBON10_LONG, CARBON10_COMPETENCY } from './carbon10_long';
import { CARBON10_ASSERTIONS } from './carbon10_ar';
import { CARBON10_NCERT_SOLVED } from './carbon10_ncert';
import { CARBON10_SELF_ASSESSMENT } from './carbon10_self';

export function getBank(p: BankParams): Bank {
  const { preparingFor, qbSubject, bioChapter10, chemChapter10 } = p;
  if (preparingFor === '10th' && qbSubject === 'chemistry' && chemChapter10 === 'carbon') {
    return {
          ncert: CARBON10_NCERT_SOLVED,
          mcqs: [...CARBON10_MCQ_A, ...CARBON10_MCQ_B],
          veryshort: CARBON10_VERY_SHORT,
          short: CARBON10_SHORT,
          long: CARBON10_LONG,
          assertion: CARBON10_ASSERTIONS,
          competency: CARBON10_COMPETENCY,
    };
  } else if (preparingFor === '10th' && qbSubject === 'chemistry') {
    return {
          ncert: CHEMISTRY10_NCERT_SOLVED,
          mcqs: CHEMISTRY10_MCQS,
          veryshort: CHEMISTRY10_VERY_SHORT,
          short: CHEMISTRY10_SHORT,
          long: CHEMISTRY10_LONG,
          assertion: CHEMISTRY10_ASSERTION_REASON,
          competency: CHEMISTRY10_COMPETENCY,
    };
  } else if (preparingFor === '10th' && qbSubject === 'biology' && bioChapter10 === 'heredity') {
    return {
          ncert: HEREDITY10_NCERT_SOLVED,
          mcqs: HEREDITY10_MCQS,
          veryshort: HEREDITY10_VERY_SHORT,
          short: HEREDITY10_SHORT,
          long: HEREDITY10_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: HEREDITY10_COMPETENCY,
    };
  } else if (preparingFor === '10th' && qbSubject === 'biology' && bioChapter10 === 'reproduction') {
    return {
          ncert: REPRO10_NCERT_SOLVED,
          mcqs: REPRO10_MCQS,
          veryshort: REPRO10_VERY_SHORT,
          short: REPRO10_SHORT,
          long: REPRO10_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: REPRO10_COMPETENCY,
    };
  } else if (preparingFor === '10th' && qbSubject === 'biology' && bioChapter10 === 'control-coordination') {
    return {
          ncert: CC10_NCERT_SOLVED,
          mcqs: CC10_MCQS,
          veryshort: CC10_VERY_SHORT,
          short: CC10_SHORT,
          long: CC10_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: CC10_COMPETENCY,
    };
  } else if (preparingFor === '10th' && qbSubject === 'biology') {
    return {
          ncert: BIOLOGY10_NCERT_SOLVED,
          mcqs: BIOLOGY10_MCQS,
          veryshort: BIOLOGY10_VERY_SHORT,
          short: BIOLOGY10_SHORT,
          long: BIOLOGY10_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: BIOLOGY10_COMPETENCY,
    };
  } else {
    return {
          ncert: CLASSX_NCERT_SOLVED,
          mcqs: CLASSX_MCQS,
          veryshort: CLASSX_VERY_SHORT,
          short: CLASSX_SHORT,
          long: CLASSX_LONG,
          assertion: CLASSX_ASSERTION_REASON,
          competency: CLASSX_CASE_COMPETENCY,
    };
  }
}

export function getSelf(p: BankParams): any[] {
  const { qbSubject, bioChapter10, chemChapter10 } = p;
  return (qbSubject === 'chemistry' ? (chemChapter10 === 'carbon' ? CARBON10_SELF_ASSESSMENT : CHEMISTRY10_SELF_ASSESSMENT) : qbSubject === 'biology' ? (bioChapter10 === 'heredity' ? HEREDITY10_SELF_ASSESSMENT : bioChapter10 === 'reproduction' ? REPRO10_SELF_ASSESSMENT : bioChapter10 === 'control-coordination' ? CC10_SELF_ASSESSMENT : BIOLOGY10_SELF_ASSESSMENT) : CLASSX_SELF_ASSESSMENT);
}
