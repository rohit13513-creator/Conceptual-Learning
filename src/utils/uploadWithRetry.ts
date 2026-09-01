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
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener('online', handler);
      clearInterval(poll);
      resolve();
    };
    const handler = () => finish();
    window.addEventListener('online', handler);
    // navigator.onLine can get stuck reporting false on some mobile browsers even once the
    // connection is actually back, and the 'online' event doesn't reliably fire to correct it --
    // poll as a fallback so a real reconnect is never missed and this can't wait forever.
    const poll = setInterval(() => { if (navigator.onLine) finish(); }, 2000);
  });
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Shared retry loop: tries `attempt` immediately, then waits for the browser to be back online
// before each retry. The online check is deliberately NOT applied before the very first attempt --
// navigator.onLine is unreliable on mobile browsers and can misreport `false` for an instant even
// while genuinely connected; gating the first attempt on it caused later photos in a multi-photo
// upload to hang forever waiting for an 'online' event that was never going to fire, with no error
// shown at all. A genuine network-level failure (thrown by `attempt`) is retried with exponential
// backoff; a real server response is returned as-is on the first try and never retried, so a
// validation error still surfaces immediately instead of being silently retried 6 times.
async function withNetworkRetry<T>(attempt: () => Promise<T>, onRetry: () => void, maxRetries: number): Promise<T> {
  let count = 0;
  for (;;) {
    try {
      return await attempt();
    } catch {
      count++;
      if (count > maxRetries) {
        throw new Error('Upload failed -- your network connection was interrupted. Please check your connection and try again.');
      }
      onRetry();
      await waitForOnline();
      await delay(Math.min(1000 * 2 ** (count - 1), 15000));
    }
  }
}

// A single attempt, via XHR rather than fetch specifically because XHR exposes upload progress
// events (fetch has no cross-browser way to report how much of a request body has been sent).
//
// xhr.timeout is set explicitly (XHR defaults to 0 = never) -- without it, a connection that
// stalls after being established (TCP connects fine, then nothing) neither loads nor errors, so
// the returned promise never settles at all. A real case: a student's photo upload silently hung
// like this with 22 minutes still on the clock, which permanently disabled the Submit button
// (derived from "is anything still mid-upload") with no error shown and no way to recover short
// of reloading the page and losing whatever had already been added. A stalled request now times
// out and rejects like any other network failure, which the existing retry-with-backoff logic in
// withNetworkRetry already handles correctly.
function attemptUpload(url: string, token: string, formData: FormData, method: string, onProgress?: (fraction: number) => void): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.timeout = 60000;
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
//
// fetch(), like plain XHR, never times out on its own -- a stalled connection just leaves the
// await hanging forever, which is exactly as capable of permanently disabling a submit button as
// the unbounded XHR upload was (see attemptUpload above). AbortController is the only way to give
// fetch a timeout; a shorter one than the upload's is fine here since this request carries no file
// data.
export async function fetchJsonWithRetry({ url, token, body, method = 'POST', maxRetries = 6 }: JsonWithRetryOptions): Promise<UploadResult> {
  return withNetworkRetry(
    async () => {
      let resp: Response;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      try {
        resp = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
      } catch {
        throw new Error('network');
      } finally {
        clearTimeout(timeoutId);
      }
      let data: any = {};
      try { data = await resp.json(); } catch { /* non-JSON response, treated as empty */ }
      return { ok: resp.ok, status: resp.status, data };
    },
    () => {},
    maxRetries,
  );
}
