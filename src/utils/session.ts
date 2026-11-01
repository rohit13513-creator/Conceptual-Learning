// The login token of whoever is signed in on this device, as a ready-made request header. Used by the
// screens that are not handed the user directly (the chemistry simulator and chemical look-up).
export function authHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem('optics_v1_user') || sessionStorage.getItem('optics_v1_user');
    const token = raw ? JSON.parse(raw)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

// Protected study files (notes, question banks, diagrams) are opened by the browser itself, which cannot
// send the login token along, so the server also keeps the login in a cookie. Logging in sets it; this makes
// sure it is there for sessions that began before it existed or whose cookie was lost. It is requested once
// per page load per login, and every protected download waits for it.
let cookieFor = '';
let cookiePromise: Promise<void> = Promise.resolve();
export function ensureSessionCookie(): Promise<void> {
  let token = '';
  try {
    const raw = localStorage.getItem('optics_v1_user') || sessionStorage.getItem('optics_v1_user');
    token = raw ? JSON.parse(raw)?.token || '' : '';
  } catch { /* storage unavailable */ }
  if (!token) return Promise.resolve();
  if (cookieFor === token) return cookiePromise;
  cookieFor = token;
  cookiePromise = fetch('/api/session/cookie', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, credentials: 'same-origin' })
    .then(() => undefined)
    .catch(() => { cookieFor = ''; });
  return cookiePromise;
}
