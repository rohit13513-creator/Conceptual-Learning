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
