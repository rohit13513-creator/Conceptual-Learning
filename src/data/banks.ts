import type { Bank, BankParams } from './bankTypes';

// Question banks are loaded one class at a time, the first time a student opens the question bank,
// solved questions or a self assessment. Once a class has loaded, switching chapter inside it is instant.
type BankModule = { getBank: (p: BankParams) => Bank; getSelf: (p: BankParams) => any[] };
const loaded: Record<string, BankModule> = {};
const groupOf = (p: BankParams) => (p.preparingFor === '8th' ? '8' : p.preparingFor === '9th' ? '9' : p.preparingFor === '10th' ? '10' : 'other');

export function peekBank(p: BankParams): { bank: Bank; self: any[] } | null {
  const m = loaded[groupOf(p)];
  return m ? { bank: m.getBank(p), self: m.getSelf(p) } : null;
}

export async function loadBank(p: BankParams): Promise<void> {
  const g = groupOf(p);
  if (loaded[g]) return;
  loaded[g] = g === '8' ? await import('./bank8') : g === '9' ? await import('./bank9') : g === '10' ? await import('./bank10') : await import('./bankCompetition');
}
