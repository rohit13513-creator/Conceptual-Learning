import { useSyncExternalStore } from 'react';

// Whether the person using the app may see "Download PDF" options. Only students registered as
// offline (classroom) students -- and the teacher -- may; online students and anyone not logged in
// may not. The app sets this once from the logged-in account, and every download button reads it,
// so the rule lives in one place instead of being repeated in each screen. (The server enforces the
// same rule for the actual PDF files, so hiding a button is never the only protection.)
let allowed = false;
const listeners = new Set<() => void>();

export function setDownloadAccess(value: boolean) {
  if (value === allowed) return;
  allowed = value;
  listeners.forEach((l) => l());
}

export function useCanDownload(): boolean {
  return useSyncExternalStore(
    (callback) => { listeners.add(callback); return () => { listeners.delete(callback); }; },
    () => allowed,
    () => false,
  );
}
