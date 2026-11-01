import type { ReactNode } from 'react';
import { useCanDownload } from '../utils/downloadAccess';

// Shows its content only to people who may download PDFs (offline-registered students and the teacher).
export function PdfOnly({ children }: { children: ReactNode }) {
  return useCanDownload() ? <>{children}</> : null;
}
