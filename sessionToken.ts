import crypto from "node:crypto";

// Signed login tokens, shared by the main server and the small function that serves protected study
// files, so both apply exactly the same rules. A token is "<payload>.<signature>"; the signature is an
// HMAC of the payload made with SESSION_SECRET, which never leaves the server, so nobody can forge one.

export const SESSION_COOKIE = "cl_session";
export const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function base64url(input: Buffer): string {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function signToken(payload: { email: string; role: string }, secret: string): string {
  const body = { ...payload, exp: Date.now() + SESSION_MAX_AGE_MS };
  const payloadB64 = base64url(Buffer.from(JSON.stringify(body)));
  const sig = base64url(crypto.createHmac("sha256", secret).update(payloadB64).digest());
  return `${payloadB64}.${sig}`;
}

export function verifyToken(token: string, secret: string): { email: string; role: string } | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expectedSig = base64url(crypto.createHmac("sha256", secret).update(payloadB64).digest());
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now() || !payload.email) return null;
    return { email: String(payload.email).toLowerCase().trim(), role: String(payload.role || "student") };
  } catch {
    return null;
  }
}

/** Reads one cookie value out of a raw Cookie header. */
export function readCookie(header: string | undefined, name: string): string {
  if (!header) return "";
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return "";
}

/** The cookie that lets the browser fetch protected study files after login. HttpOnly so no script on the
 *  page can read it; Secure on https; SameSite=Lax so other websites cannot make the browser send it. */
export function sessionCookie(token: string, secure: boolean): string {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_MAX_AGE_MS / 1000)}${secure ? "; Secure" : ""}`;
}

export function clearedSessionCookie(secure: boolean): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`;
}
