import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { verifyToken, readCookie, SESSION_COOKIE } from "./sessionToken.js";

// Serves the study material that must only be visible after login:
//   kind "a"  the website's notes / question-bank code files   (any approved, logged-in account)
//   kind "d"  diagram images                                    (any approved, logged-in account)
//   kind "f"  downloadable PDF notes                            (approved offline students and the teacher only)
// Nothing here is ever cached by shared caches: every response is "private", and every request is checked
// against the login cookie (or an Authorization header) and the account's current status.

export interface ProtectedDeps {
  secret: string;
  baseDir: string; // folder holding the protected files produced by the build
  lookupUser: (email: string) => Promise<{ status: string; studentType: string | null; role: string } | null>;
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
    res.setHeader("Cache-Control", "private, max-age=31536000, immutable");
    res.setHeader("Content-Length", String(body.length));
    return void res.end(req.method === "HEAD" ? undefined : body);
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
    res.setHeader("Cache-Control", "private, max-age=86400");
    res.setHeader("Content-Length", String(body.length));
    return void res.end(req.method === "HEAD" ? undefined : body);
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

  return send(res, 400, "Bad request");
}

// ── the real dependencies (used by the live function and the local server) ──
const userCache = new Map<string, { at: number; value: { status: string; studentType: string | null; role: string } | null }>();

export function realDeps(): ProtectedDeps {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const here = typeof __dirname !== "undefined" ? __dirname : process.cwd();
  const candidates = [path.join(process.cwd(), "protected"), path.join(here, "protected"), path.join(here, "..", "protected")];
  return {
    secret: process.env.SESSION_SECRET as string,
    baseDir: candidates.find((d) => fs.existsSync(d)) || candidates[0],
    // The account's status is re-checked at most every 2 minutes, so suspending someone cuts off study
    // material within minutes without a database call for every single file.
    lookupUser: async (email) => {
      const hit = userCache.get(email);
      if (hit && Date.now() - hit.at < 2 * 60_000) return hit.value;
      const r = await fetch(`${url}/rest/v1/users?select=status,student_type,role&email=eq.${encodeURIComponent(email)}`, { headers });
      if (!r.ok) return hit ? hit.value : null;
      const rows = (await r.json()) as any[];
      const value = rows[0] ? { status: String(rows[0].status), studentType: rows[0].student_type ?? null, role: String(rows[0].role || "student") } : null;
      userCache.set(email, { at: Date.now(), value });
      return value;
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
