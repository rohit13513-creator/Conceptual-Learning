// Competition practice questions
// Loaded only when a student opens the question bank, solved questions or self assessment for this class,
// so these question banks are no longer part of the download everyone waits for at log-in.
import type { Bank, BankParams } from './bankTypes';
import { CLASS10_NCERT_SOLVED as CLASSX_NCERT_SOLVED, CLASS10_ASSERTIONS as CLASSX_ASSERTION_REASON, CLASS10_VERY_SHORT as CLASSX_VERY_SHORT, CLASS10_SHORT as CLASSX_SHORT, CLASS10_LONG as CLASSX_LONG, CLASS10_COMPETENCY as CLASSX_CASE_COMPETENCY } from './class10';
import { COMPETITION_MCQS, COMPETITION_SELF_ASSESSMENT } from './competitions';

export function getBank(p: BankParams): Bank {
  return {
          ncert: [] as typeof CLASSX_NCERT_SOLVED,
          mcqs: COMPETITION_MCQS,
          veryshort: [] as typeof CLASSX_VERY_SHORT,
          short: [] as typeof CLASSX_SHORT,
          long: [] as typeof CLASSX_LONG,
          assertion: [] as typeof CLASSX_ASSERTION_REASON,
          competency: [] as typeof CLASSX_CASE_COMPETENCY,
  };
}

export function getSelf(p: BankParams): any[] {
  return COMPETITION_SELF_ASSESSMENT;
}
