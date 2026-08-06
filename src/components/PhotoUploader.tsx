import React, { useRef, useState, useEffect } from 'react';
import { Plus, Camera, X, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { uploadWithRetry } from '../utils/uploadWithRetry';

interface PhotoItem {
  id: string;
  file: File;
  previewUrl: string;
  status: 'uploading' | 'done' | 'error';
  tempPath?: string;
  errorMessage?: string;
  order: number;
  progress: number;
}

interface PhotoUploaderProps {
  token: string;
  sessionId: string;
  isLightMode: boolean;
  onChange: (tempPaths: string[], isUploading: boolean) => void;
  disabled?: boolean;
  accent?: 'cyan' | 'amber';
}

// Shrinks a photo client-side before it ever leaves the device -- keeps each individual upload
// request small and fast, especially over a student's mobile data connection.
async function compressPhoto(file: File, maxDimension = 1600, quality = 0.75): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file;
  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;
    if (width > maxDimension || height > maxDimension) {
      const scale = maxDimension / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

// Renders a live-updating grid of attached photos -- each one uploads to the server the moment
// it's picked (one small request per photo, never all of them bundled into one giant request),
// so the student/admin can see exactly which pages made it and retry just the ones that didn't.
export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ token, sessionId, isLightMode, onChange, disabled, accent = 'cyan' }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const nextOrderRef = useRef(0);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const done = photos.filter((p) => p.status === 'done').map((p) => p.tempPath!) as string[];
    const isUploading = photos.some((p) => p.status === 'uploading');
    onChange(done, isUploading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  const uploadPhoto = async (item: PhotoItem) => {
    try {
      const compressed = await compressPhoto(item.file);
      const formData = new FormData();
      formData.append('photo', compressed);
      formData.append('sessionId', sessionId);
      formData.append('order', String(item.order));
      // Retries automatically on a dropped connection (waiting for the browser to come back
      // online between attempts) rather than failing the whole photo outright.
      const result = await uploadWithRetry({
        url: '/api/homework/upload-photo',
        token,
        formData,
        onProgress: (fraction) => setPhotos((prev) => prev.map((p) => (p.id === item.id ? { ...p, progress: Math.round(fraction * 100) } : p))),
      });
      if (!result.ok) throw new Error(result.data.error || 'Failed to upload this photo.');
      setPhotos((prev) => prev.map((p) => (p.id === item.id ? { ...p, status: 'done', tempPath: result.data.tempPath, progress: 100 } : p)));
    } catch (err: any) {
      setPhotos((prev) => prev.map((p) => (p.id === item.id ? { ...p, status: 'error', errorMessage: err.message || 'Upload failed.' } : p)));
    }
  };

  const addFiles = async (files: File[]) => {
    // When several photos are picked together in one go (as opposed to one at a time), some
    // mobile browsers -- notably Chrome on Android using the OS "Photo Picker" -- only grant
    // transient read access to the selected files, scoped to this input's change event. The
    // upload loop below deliberately processes photos one at a time (see below), so by the time
    // it reaches photo #2 or #3 that grant can already be gone and the read silently fails,
    // which is exactly the "only the first photo uploads" symptom reported by multiple students.
    // Reading every file's bytes into memory immediately, before doing anything slow, means the
    // rest of the pipeline never has to race that revocation.
    const materialized = await Promise.all(files.map(async (file) => {
      try {
        const buffer = await file.arrayBuffer();
        return new File([buffer], file.name, { type: file.type });
      } catch {
        return file;
      }
    }));

    // Uploaded strictly one at a time, in the order picked -- matches how the pages will read in
    // the final PDF, and means the very first photo finishes (and shows as done) before the next
    // one starts, rather than racing several uploads against each other.
    for (const file of materialized) {
      const order = nextOrderRef.current++;
      const item: PhotoItem = {
        id: `${Date.now()}-${order}-${Math.random().toString(36).slice(2)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'uploading',
        order,
        progress: 0,
      };
      setPhotos((prev) => [...prev, item]);
      await uploadPhoto(item);
    }
  };

  const retryPhoto = (id: string) => {
    setPhotos((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        const resetItem = { ...item, status: 'uploading' as const, errorMessage: undefined, progress: 0 };
        uploadPhoto(resetItem);
        return prev.map((p) => (p.id === id ? resetItem : p));
      }
      return prev;
    });
  };

  const removePhoto = (id: string) => {
    const item = photos.find((p) => p.id === id);
    if (!item || item.status === 'uploading') return;
    if (item.status === 'done' && item.tempPath) {
      fetch('/api/homework/upload-photo', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ tempPath: item.tempPath }),
      }).catch(() => {});
    }
    URL.revokeObjectURL(item.previewUrl);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const accentClasses = accent === 'amber'
    ? { bg: isLightMode ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20' }
    : { bg: isLightMode ? 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20' };

  return (
    <div className="space-y-2">
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {photos.map((p) => (
            <div key={p.id} className={`relative aspect-square rounded-lg overflow-hidden border ${isLightMode ? 'border-slate-200 bg-slate-100' : 'border-slate-800 bg-slate-950'}`}>
              <img src={p.previewUrl} alt="" className="w-full h-full object-cover" />
              {p.status === 'uploading' && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                  <RefreshCw className="w-5 h-5 text-white animate-spin" />
                  <span className="text-[10px] font-black text-white">{p.progress}%</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-cyan-400 transition-all duration-200" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              )}
              {p.status === 'error' && (
                <div className="absolute inset-0 bg-red-950/70 flex flex-col items-center justify-center gap-1 p-1 text-center">
                  <AlertTriangle className="w-4 h-4 text-red-300" />
                  <button
                    type="button"
                    onClick={() => retryPhoto(p.id)}
                    className="text-[9px] font-black uppercase text-white bg-red-600 hover:bg-red-500 rounded px-1.5 py-0.5 cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}
              {p.status === 'done' && (
                <div className="absolute bottom-1 left-1 bg-emerald-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              )}
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                disabled={p.status === 'uploading'}
                className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 rounded-full p-0.5 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          className="hidden"
          onChange={(e) => { const files: File[] = Array.from(e.target.files || []); e.target.value = ''; if (files.length) addFiles(files); }}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => { const files: File[] = Array.from(e.target.files || []); e.target.value = ''; if (files.length) addFiles(files); }}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => galleryInputRef.current?.click()}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${accentClasses.bg}`}
        >
          <Plus className="w-3.5 h-3.5" /> Add Photo{photos.length > 0 ? 's' : ''}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => cameraInputRef.current?.click()}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${accentClasses.bg}`}
        >
          <Camera className="w-3.5 h-3.5" /> Camera
        </button>
      </div>

      {photos.length > 0 && (
        <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
          {photos.filter((p) => p.status === 'done').length} of {photos.length} photo{photos.length === 1 ? '' : 's'} uploaded
          {photos.some((p) => p.status === 'error') ? ' -- tap Retry on any that failed.' : '.'} Pages will appear in the order added.
        </p>
      )}
    </div>
  );
};

export default PhotoUploader;
