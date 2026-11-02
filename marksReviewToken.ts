import crypto from "node:crypto";
import { base64url } from "./sessionToken.js";

// A link in the teacher's email that opens one student's exam for approval. It is a signed, single-purpose, expiring
// token (14 days) -- it cannot be used for anything else and cannot be forged without the server's secret.
export interface MarksReviewTarget { email: string; academicYear: string; examName: string }
const TTL_MS = 14 * 24 * 60 * 60 * 1000;

const sign = (payloadB64: string, secret: string) => base64url(crypto.createHmac("sha256", secret).update("marks-review:" + payloadB64).digest());

export function signMarksReviewToken(target: MarksReviewTarget, secret: string): string {
  const payloadB64 = base64url(Buffer.from(JSON.stringify({ e: target.email, y: target.academicYear, x: target.examName, exp: Date.now() + TTL_MS })));
  return `${payloadB64}.${sign(payloadB64, secret)}`;
}

export function verifyMarksReviewToken(token: string, secret: string): MarksReviewTarget | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expected = Buffer.from(sign(payloadB64, secret)), given = Buffer.from(sig);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
  try {
    const p = JSON.parse(Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (!p.exp || p.exp < Date.now() || !p.e || !p.y || !p.x) return null;
    return { email: String(p.e), academicYear: String(p.y), examName: String(p.x) };
  } catch { return null; }
}
