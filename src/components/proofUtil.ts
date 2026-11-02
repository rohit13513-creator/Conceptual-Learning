// Prepares a result page / test copy before it is uploaded: photos are shrunk to a sensible size (a phone photo can
// be 5-10 MB, more than the upload limit); a PDF is accepted as it is if it is small enough.
export async function prepareProofFile(file: File): Promise<File> {
  if (file.type === 'application/pdf') {
    if (file.size > 3.5 * 1024 * 1024) throw new Error('This PDF is larger than 3.5 MB. Please upload photos of the pages instead.');
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    if (!blob) throw new Error('no image');
    return new File([blob], 'page.jpg', { type: 'image/jpeg' });
  } catch {
    // some phones give formats the browser cannot redraw; a small photo can still be sent as it is
    if (/^image\//.test(file.type) && file.size <= 3 * 1024 * 1024) return file;
    throw new Error('This photo could not be prepared. Please try a JPG or PNG photo.');
  }
}
