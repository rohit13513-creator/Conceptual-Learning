export interface UploadResult {
  ok: boolean;
  status: number;
  data: any;
}

interface UploadWithRetryOptions {
  url: string;
  token: string;
  formData: FormData;
  method?: string;
  onProgress?: (fraction: number) => void;
  maxRetries?: number;
}

interface JsonWithRetryOptions {
  url: string;
  token: string;
  body: any;
  method?: string;
  maxRetries?: number;
}

function waitForOnline(): Promise<void> {
  if (typeof navigator === 'undefined' || navigator.onLine) return Promise.resolve();
  return new Promise((resolve) => {
    const handler = () => { window.removeEventListener('online', handler); resolve(); };
    window.addEventListener('online', handler);
  });
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Shared retry loop: waits for the browser to be back online, then tries `attempt`. A genuine
// network-level failure (thrown by `attempt`) is retried with exponential backoff; a real server
// response is returned as-is on the first try and never retried, so a validation error still
// surfaces immediately instead of being silently retried 6 times.
async function withNetworkRetry<T>(attempt: () => Promise<T>, onRetry: () => void, maxRetries: number): Promise<T> {
  let count = 0;
  for (;;) {
    await waitForOnline();
    try {
      return await attempt();
    } catch {
      count++;
      if (count > maxRetries) {
        throw new Error('Upload failed -- your network connection was interrupted. Please check your connection and try again.');
      }
      onRetry();
      await delay(Math.min(1000 * 2 ** (count - 1), 15000));
    }
  }
}

// A single attempt, via XHR rather than fetch specifically because XHR exposes upload progress
// events (fetch has no cross-browser way to report how much of a request body has been sent).
function attemptUpload(url: string, token: string, formData: FormData, method: string, onProgress?: (fraction: number) => void): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(e.loaded / e.total);
      };
    }
    xhr.onload = () => {
      let data: any = {};
      try { data = JSON.parse(xhr.responseText); } catch { /* non-JSON response, treated as empty */ }
      resolve({ ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, data });
    };
    // onerror fires for genuine network-level failures (connection dropped, DNS failure, CORS) --
    // never for a real server response, even an error one, which resolves above via onload instead.
    xhr.onerror = () => reject(new Error('network'));
    xhr.ontimeout = () => reject(new Error('network'));
    xhr.send(formData);
  });
}

// Uploads a file (FormData), automatically retrying if the connection drops mid-upload rather than
// surfacing "network interrupted" straight to the student. Reports upload progress (0-1) via
// onProgress as the browser sends bytes.
export async function uploadWithRetry({ url, token, formData, method = 'POST', onProgress, maxRetries = 6 }: UploadWithRetryOptions): Promise<UploadResult> {
  return withNetworkRetry(
    () => attemptUpload(url, token, formData, method, onProgress),
    () => onProgress?.(0),
    maxRetries,
  );
}

// Same network-retry behavior for the small JSON requests around an upload (e.g. "finalize this
// session") that carry no file data and so need no progress reporting.
export async function fetchJsonWithRetry({ url, token, body, method = 'POST', maxRetries = 6 }: JsonWithRetryOptions): Promise<UploadResult> {
  return withNetworkRetry(
    async () => {
      let resp: Response;
      try {
        resp = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(body),
        });
      } catch {
        throw new Error('network');
      }
      let data: any = {};
      try { data = await resp.json(); } catch { /* non-JSON response, treated as empty */ }
      return { ok: resp.ok, status: resp.status, data };
    },
    () => {},
    maxRetries,
  );
}
