import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { verifyToken, readCookie, SESSION_COOKIE } from "./sessionToken.js";
import { findMockTest } from "./mockTests.js";

// Serves the study material that must only be visible after login:
//   kind "a"  the website's notes / question-bank code files   (any approved, logged-in account)
//   kind "d"  diagram images                                    (any approved, logged-in account)
//   kind "f"  downloadable PDF notes                            (approved offline students and the teacher only)
//   kind "m"  Mock Test Series PDFs (question paper, answer key) (approved students of that test's class and the teacher;
//                                                                 saving a copy: offline students and the teacher only)
// Nothing here is ever cached by shared caches: every response is "private", and every request is checked
// against the login cookie (or an Authorization header) and the account's current status.

export interface ProtectedDeps {
  secret: string;
  baseDir: string; // folder holding the protected files produced by the build
  lookupUser: (email: string) => Promise<{ status: string; studentType: string | null; role: string; studentClass?: string | null } | null>;
  readStorage: (bucket: string, objectPath: string) => Promise<Buffer | null>;
  signStorage: (bucket: string, objectPath: string, seconds: number) => Promise<string | null>; // full signed URL
}

const SAFE_ASSET = /^[A-Za-z0-9._-]+\.(js|mjs|css)$/;
const SAFE_IMAGE = /^[A-Za-z0-9._\-/]+\.(webp|png|jpe?g|svg|gif)$/i;
const SAFE_PDF = /^[A-Za-z0-9._-]+\.pdf$/i;
const DOWNLOAD_BUCKETS = new Set(["downloads", "study-notes"]);
const TYPES: Record<string, string> = {
  js: "text/javascript; charset=utf-8", mjs: "text/javascript; charset=utf-8", css: "text/css; charset=utf-8",
  webp: "image/webp", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", svg: "image/svg+xml", gif: "image/gif",
};

function send(res: ServerResponse, status: number, message: string) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(message);
}

// The browser keeps a private copy for `maxAge` seconds and then asks the server (which checks the login and the
// account); when nothing changed the server answers "304 not modified" without resending the file. Every request
// that reaches the server starts the function, so a short private cache saves most repeat requests. Nothing is ever
// cached by shared caches, and a file the browser has not fetched yet is always checked against the login.
function sendWithEtag(req: IncomingMessage, res: ServerResponse, body: Buffer, etag: string, maxAge: number) {
  res.setHeader("Cache-Control", `private, max-age=${maxAge}`);
  res.setHeader("ETag", etag);
  if (req.headers["if-none-match"] === etag) { res.statusCode = 304; return void res.end(); }
  res.statusCode = 200;
  res.setHeader("Content-Length", String(body.length));
  return void res.end(req.method === "HEAD" ? undefined : body);
}

function cleanRelative(p: string): string | null {
  let rel: string;
  try { rel = decodeURIComponent(p); } catch { return null; }
  if (!rel || rel.includes("..") || rel.includes("\\") || rel.includes("\0") || rel.startsWith("/")) return null;
  return rel;
}

export async function handleProtected(req: IncomingMessage, res: ServerResponse, kind: string, rawPath: string, deps: ProtectedDeps): Promise<void> {
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");
  const rel = cleanRelative(rawPath);
  if (!rel) return send(res, 400, "Bad request");

  // 1. who is asking
  const header = String(req.headers["authorization"] || "");
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const token = bearer || readCookie(req.headers["cookie"] as string | undefined, SESSION_COOKIE);
  const who = verifyToken(token, deps.secret);
  if (!who) return send(res, 401, "Please log in to open this.");

  // 2. is the account still allowed in (not pending, suspended or removed)
  const user = await deps.lookupUser(who.email);
  if (!user || user.status !== "approved") return send(res, 403, "This account cannot open study material.");

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Vary", "Cookie, Authorization, Accept-Encoding");

  if (kind === "a") {
    if (!SAFE_ASSET.test(rel)) return send(res, 400, "Bad request");
    const file = path.join(deps.baseDir, "assets", rel);
    const accepts = String(req.headers["accept-encoding"] || "");
    const brFile = file + ".br";
    let body: Buffer;
    let encoded = false;
    if (accepts.includes("br") && fs.existsSync(brFile)) { body = fs.readFileSync(brFile); encoded = true; }
    else if (fs.existsSync(file)) body = fs.readFileSync(file);
    else return send(res, 404, "Not found");
    res.statusCode = 200;
    res.setHeader("Content-Type", TYPES[rel.split(".").pop() as string] || "application/octet-stream");
    if (encoded) res.setHeader("Content-Encoding", "br");
    // code files have a new name on every build, so a copy kept for 6 hours is never stale
    return sendWithEtag(req, res, body, `"${rel}-${encoded ? "br" : "raw"}-${body.length}"`, 6 * 3600);
  }

  if (kind === "d") {
    if (!SAFE_IMAGE.test(rel)) return send(res, 400, "Bad request");
    let body: Buffer | null;
    if (rel.startsWith("study-notes/")) body = await deps.readStorage("study-notes", rel.slice("study-notes/".length));
    else {
      const file = path.join(deps.baseDir, "diagrams", rel);
      body = fs.existsSync(file) ? fs.readFileSync(file) : null;
    }
    if (!body) return send(res, 404, "Not found");
    res.statusCode = 200;
    res.setHeader("Content-Type", TYPES[rel.split(".").pop()!.toLowerCase()] || "application/octet-stream");
    return sendWithEtag(req, res, body, `"${crypto.createHash("sha1").update(body).digest("hex").slice(0, 20)}"`, 3600);
  }

  if (kind === "f") {
    // PDF notes: offline (classroom) students and the teacher only -- never online students.
    const mayDownload = user.role === "admin" || user.studentType !== "online";
    if (!mayDownload) return send(res, 403, "PDF downloads are available to offline (classroom) students only.");
    const [bucket, file, ...rest] = rel.split("/");
    if (rest.length || !bucket || !file || !DOWNLOAD_BUCKETS.has(bucket) || !SAFE_PDF.test(file)) return send(res, 400, "Bad request");
    const signed = await deps.signStorage(bucket, file, 120);
    if (!signed) return send(res, 404, "Not found");
    res.statusCode = 302;
    res.setHeader("Location", signed + (signed.includes("?") ? "&" : "?") + "download=" + encodeURIComponent(file));
    res.setHeader("Cache-Control", "no-store");
    return void res.end();
  }

  if (kind === "m") {
    // Mock Test Series: p = "<test id>/<paper|key>" to open, or "<test id>/<paper|key>/download" to save a copy.
    const [testId, which, action, ...rest] = rel.split("/");
    const test = findMockTest(testId || "");
    if (rest.length || !test || (which !== "paper" && which !== "key") || (action !== undefined && action !== "download")) return send(res, 400, "Bad request");
    if (user.role !== "admin" && user.studentClass !== test.classLabel) return send(res, 403, "This test is not part of your class.");
    const fileName = which === "paper" ? test.paperFile : test.keyFile;
    if (!fileName || !SAFE_PDF.test(fileName)) return send(res, 404, "Not available yet.");
    // Opening is for every student of the class (they need the paper to take the test); a saved copy follows the
    // same rule as every other PDF: classroom (offline) students and the teacher only.
    const wantsDownload = action === "download";
    if (wantsDownload && !(user.role === "admin" || user.studentType !== "online")) return send(res, 403, "PDF downloads are available to offline (classroom) students only.");
    const signed = await deps.signStorage("downloads", fileName, 120);
    if (!signed) return send(res, 404, "Not found");
    const niceName = `Class-${test.classLabel}-Mock-Test-${test.number}-${which === "paper" ? "Question-Paper" : "Answer-Key"}.pdf`;
    res.statusCode = 302;
    res.setHeader("Location", signed + (wantsDownload ? (signed.includes("?") ? "&" : "?") + "download=" + encodeURIComponent(niceName) : ""));
    res.setHeader("Cache-Control", "no-store");
    return void res.end();
  }

  return send(res, 400, "Bad request");
}

// ── the real dependencies (used by the live function and the local server) ──
export function realDeps(): ProtectedDeps {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const here = typeof __dirname !== "undefined" ? __dirname : process.cwd();
  const candidates = [path.join(process.cwd(), "protected"), path.join(here, "protected"), path.join(here, "..", "protected")];
  return {
    secret: process.env.SESSION_SECRET as string,
    baseDir: candidates.find((d) => fs.existsSync(d)) || candidates[0],
    // Read from the database on EVERY request, never cached: a student who is rejected or suspended loses
    // access to study files on their very next request.
    lookupUser: async (email) => {
      const r = await fetch(`${url}/rest/v1/users?select=status,student_type,role,student_class&email=eq.${encodeURIComponent(email)}`, { headers });
      if (!r.ok) return null;
      const rows = (await r.json()) as any[];
      return rows[0] ? { status: String(rows[0].status), studentType: rows[0].student_type ?? null, role: String(rows[0].role || "student"), studentClass: rows[0].student_class ?? null } : null;
    },
    readStorage: async (bucket, objectPath) => {
      const r = await fetch(`${url}/storage/v1/object/${bucket}/${objectPath.split("/").map(encodeURIComponent).join("/")}`, { headers });
      return r.ok ? Buffer.from(await r.arrayBuffer()) : null;
    },
    signStorage: async (bucket, objectPath, seconds) => {
      const r = await fetch(`${url}/storage/v1/object/sign/${bucket}/${encodeURIComponent(objectPath)}`, {
        method: "POST", headers: { ...headers, "content-type": "application/json" }, body: JSON.stringify({ expiresIn: seconds }),
      });
      if (!r.ok) return null;
      const j = (await r.json()) as { signedURL?: string };
      return j.signedURL ? `${url}/storage/v1${j.signedURL}` : null;
    },
  };
}
