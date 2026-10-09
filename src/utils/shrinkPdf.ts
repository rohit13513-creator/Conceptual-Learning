import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { PDFDocument } from 'pdf-lib';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

// The homework storage bucket rejects any file over 25MB, and a phone scanner app can easily
// produce a 50-180MB PDF from a dozen pages -- uploading it only to be told "too large" at the very
// end wasted the student's whole upload (and several students gave up and missed their deadline).
// Anything over this threshold is re-rendered page by page into a much lighter PDF here in the
// browser, before any upload starts.
export const PDF_SHRINK_THRESHOLD_BYTES = 15 * 1024 * 1024;
export const PDF_MAX_UPLOAD_BYTES = 24 * 1024 * 1024;

export async function shrinkPdf(file: File, onProgress?: (done: number, total: number) => void): Promise<File> {
  const data = new Uint8Array(await file.arrayBuffer());
  const src = await pdfjs.getDocument({ data }).promise;
  const out = await PDFDocument.create();
  const maxSide = 1700;
  try {
    for (let i = 1; i <= src.numPages; i++) {
      onProgress?.(i - 1, src.numPages);
      const page = await src.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(maxSide / Math.max(base.width, base.height), 3);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas is not available on this device.');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.7));
      canvas.width = 0;
      canvas.height = 0;
      page.cleanup();
      if (!blob) throw new Error('Could not compress a page of this PDF.');
      const jpg = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const pdfPage = out.addPage([base.width, base.height]);
      pdfPage.drawImage(jpg, { x: 0, y: 0, width: base.width, height: base.height });
    }
    onProgress?.(src.numPages, src.numPages);
  } finally {
    await src.destroy();
  }
  const bytes = await out.save();
  return new File([bytes], file.name.replace(/\.pdf$/i, '') + '-compressed.pdf', { type: 'application/pdf' });
}
