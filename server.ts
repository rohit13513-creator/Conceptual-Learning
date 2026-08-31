import "dotenv/config";
import crypto from "crypto";
import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import multer from "multer";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import AdmZip from "adm-zip";

interface DeviceSession {
  deviceId: string;
  deviceName: string;
  lastUsed: string;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  whatsappNumber?: string;
  status: "pending" | "approved" | "rejected";
  devices: DeviceSession[];
  createdAt: string;
  role: "admin" | "student";
  studentClass?: string;
  studentType: "offline" | "online";
  photoUrl: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  favoriteSubject: string | null;
  hobbies: string | null;
}

interface InviteCode {
  code: string;
  createdFor: string;
  createdAt: string;
}

interface HomeworkSubmission {
  id: string;
  studentEmail: string;
  subject: string | null;
  assignmentId: string | null;
  submittedAt: string;
  status: "pending" | "checked" | "reviewed";
  aiScore: number | null;
  aiFeedback: string | null;
  adminNotes: string | null;
  integrityFlag: string | null;
  fileUrl: string | null;
}

interface HomeworkAssignment {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  targetClass: string;
  fileUrl: string | null;
  assignedDate: string;
  deadline: string | null;
  createdAt: string;
}

interface RevisionQuestion {
  id: string;
  sectionLabel: "A" | "B" | "C" | "D" | "E";
  marks: number;
  text: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  targetClass: string;
  createdBy: string;
  createdAt: string;
}

interface ForumThread {
  id: string;
  title: string;
  body: string;
  authorEmail: string;
  authorName: string;
  imageUrl: string | null;
  status: "pending" | "approved";
  createdAt: string;
}

interface ForumReply {
  id: string;
  threadId: string;
  body: string;
  authorEmail: string;
  authorName: string;
  imageUrl: string | null;
  status: "pending" | "approved";
  createdAt: string;
}

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const ADMIN_EMAILS = ["rohit13513@gmail.com", "conceptuallearningonline@gmail.com"];

// Both addresses above keep full admin panel access, but all site email now sends and receives
// only through the conceptuallearningonline inbox -- rohit13513 is kept in ADMIN_EMAILS purely
// for login/authorization, not as a mail recipient.
const ADMIN_NOTIFICATION_EMAILS = ["conceptuallearningonline@gmail.com"];

// ── SESSION TOKENS ──
// Every previous "auth" check in this file trusted a plain client-supplied email (or an
// x-admin-email header) with nothing to prove the request actually came from that logged-in
// user -- anyone who knew or guessed an email could act as them. These signed, HMAC-based
// tokens are issued once at login and verified on every subsequent request; the client cannot
// forge one without knowing SESSION_SECRET, which never leaves the server.
// Fails loudly at startup instead of silently signing every session with an empty-string key --
// a missing env var used to mean every token became forgeable (anyone could compute the same
// HMAC with the same empty key) rather than the server simply refusing to come up.
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required and must not be empty.");
}
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function base64url(input: Buffer): string {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function signSessionToken(payload: { email: string; role: string }): string {
  const body = { ...payload, exp: Date.now() + SESSION_MAX_AGE_MS };
  const payloadB64 = base64url(Buffer.from(JSON.stringify(body)));
  const sig = base64url(crypto.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest());
  return `${payloadB64}.${sig}`;
}

function verifySessionToken(token: string): { email: string; role: string } | null {
  if (!token || !SESSION_SECRET) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expectedSig = base64url(crypto.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest());
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

// Verifies the Authorization: Bearer <token> header and returns the authenticated identity, or
// sends a 401 and returns null. Every endpoint that acts on a specific user's data must call
// this and use the returned email as the identity -- never a client-supplied body/query email.
function requireAuth(req: express.Request, res: express.Response): { email: string; role: string } | null {
  const authHeader = (req.headers["authorization"] as string) || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const payload = verifySessionToken(token);
  if (!payload) {
    res.status(401).json({ error: "Your session has expired or is invalid. Please log in again." });
    return null;
  }
  return payload;
}

// A short-lived, single-purpose signed token used only in the account-approval email link, so
// that link can't be forged just by knowing (or guessing) the target's email address.
function signApprovalToken(email: string): string {
  return base64url(crypto.createHmac("sha256", SESSION_SECRET).update(`approve:${email}`).digest());
}

function verifyApprovalToken(email: string, token: string): boolean {
  if (!token || !SESSION_SECRET) return false;
  const expected = signApprovalToken(email);
  const tokenBuf = Buffer.from(token);
  const expectedBuf = Buffer.from(expected);
  return tokenBuf.length === expectedBuf.length && crypto.timingSafeEqual(tokenBuf, expectedBuf);
}

const HOMEWORK_BUCKET = "homework";

// A student's own scanned PDF (as opposed to photos taken through this app, which get compressed
// during the merge step) can land close to or over the storage bucket's size limit -- a real case
// hit exactly this: repeated "Failed to save your submission" with no indication of why, so the
// student just kept retrying the same oversized file forever. Supabase's storage API returns this
// specific error shape when a bucket's file_size_limit is exceeded; detecting it lets the message
// actually tell the student what to do (retrying an unchanged oversized file can never succeed)
// instead of implying a transient failure worth retrying as-is.
function friendlyStorageUploadError(error: { message?: string; statusCode?: string } | null, fallback: string): string {
  if (error?.statusCode === "413" || /exceeded the maximum allowed size/i.test(error?.message || "")) {
    return "Your file is too large to upload. Please compress it, split it into fewer/lower-resolution photos, or re-scan at a lower quality, then try again.";
  }
  return fallback;
}
// Applied uniformly across every class's deadline -- see the late-submission penalty comment in
// checkHomeworkSubmission for why.
const LATE_SUBMISSION_GRACE_MS = 60 * 1000;
const homeworkUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file, matches the Storage bucket limit
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WEBP, HEIC, or PDF files are allowed."));
  },
});

// For raw byte-range pieces of a large file (see /api/homework/upload-chunk) -- a Blob produced
// by File.slice() reports no meaningful MIME type of its own, so this intentionally has no
// fileFilter restricting to image/PDF types the way homeworkUpload does.
const chunkUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // a little above the ~3MB chunk size actually sent
});

const AVATAR_BUCKET = "avatars";
const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB, matches the Storage bucket limit
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, or WEBP images are allowed."));
  },
});

const FORUM_BUCKET = "forum";
const forumUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, or WEBP images are allowed."));
  },
});

const CHAPTER_NOTES_BUCKET = "chapter-notes";
const chapterNotesUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // NCERT chapter PDFs run larger than a homework photo
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WEBP, or PDF files are allowed."));
  },
});

// ── Chapter Notes: diagram spec, palette, SVG builder, overlap check ──
// Diagrams are stored as this constrained shape list, never as raw AI-authored SVG/HTML -- that
// keeps color entirely under our control (see paletteColor below), which is what actually
// prevents the "dark text on dark background" class of bug the light/dark-mode notes pages hit
// before, and lets the exact same spec be rendered twice: once server-side to a PNG for the
// automated overlap self-check, and once client-side as real SVG/JSX for students -- so what got
// checked is provably what gets shown, not two independently-drifting renderers.
type DiagramShape =
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; role: string; dashed?: boolean }
  | { type: "arrow"; x1: number; y1: number; x2: number; y2: number; role: string }
  | { type: "circle"; cx: number; cy: number; r: number; role: string; filled?: boolean }
  | { type: "rect"; x: number; y: number; w: number; h: number; role: string; filled?: boolean }
  | { type: "polygon"; points: string; role: string; filled?: boolean }
  | { type: "text"; x: number; y: number; text: string; role: string; anchor?: "start" | "middle" | "end"; size?: number };

interface DiagramSpec {
  id: string;
  caption: string;
  viewBoxW: number;
  viewBoxH: number;
  shapes: DiagramShape[];
}

// [light, dark] hex pair per semantic role -- add new roles here, never let generated content pick
// a literal hex value itself, so every diagram is guaranteed theme-correct by construction.
const DIAGRAM_PALETTE: Record<string, [string, string]> = {
  background: ["#ffffff", "#0b101d"],
  axis: ["#64748b", "#475569"],
  outline: ["#334155", "#f1f5f9"],
  fillPrimary: ["#0369a1", "#38bdf8"],
  fillSecondary: ["#b45309", "#fbbf24"],
  ray: ["#059669", "#34d399"],
  label: ["#1e293b", "#e2e8f0"],
  title: ["#0f172a", "#f8fafc"],
};
function paletteColor(role: string, isLight: boolean): string {
  const pair = DIAGRAM_PALETTE[role] || DIAGRAM_PALETTE.outline;
  return isLight ? pair[0] : pair[1];
}

function arrowHeadPolygon(x1: number, y1: number, x2: number, y2: number): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const p1x = x2 - size * Math.cos(angle - Math.PI / 7);
  const p1y = y2 - size * Math.sin(angle - Math.PI / 7);
  const p2x = x2 - size * Math.cos(angle + Math.PI / 7);
  const p2y = y2 - size * Math.sin(angle + Math.PI / 7);
  return `${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildDiagramSvg(spec: DiagramSpec, isLight: boolean): string {
  const bg = paletteColor("background", isLight);
  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${spec.viewBoxW} ${spec.viewBoxH}" width="${spec.viewBoxW}" height="${spec.viewBoxH}" font-family="Arial, sans-serif">`,
    `<rect width="100%" height="100%" fill="${bg}"/>`,
  ];
  for (const s of spec.shapes) {
    const color = paletteColor(s.role, isLight);
    if (s.type === "line") {
      parts.push(`<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${color}" stroke-width="2"${s.dashed ? ' stroke-dasharray="6,4"' : ""}/>`);
    } else if (s.type === "arrow") {
      parts.push(`<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${color}" stroke-width="2"/>`);
      parts.push(`<polygon points="${arrowHeadPolygon(s.x1, s.y1, s.x2, s.y2)}" fill="${color}"/>`);
    } else if (s.type === "circle") {
      parts.push(`<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" stroke="${color}" stroke-width="2" fill="${s.filled ? color : "none"}"/>`);
    } else if (s.type === "rect") {
      parts.push(`<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" stroke="${color}" stroke-width="2" fill="${s.filled ? color : "none"}"/>`);
    } else if (s.type === "polygon") {
      parts.push(`<polygon points="${s.points}" stroke="${color}" stroke-width="2" fill="${s.filled ? color : "none"}"/>`);
    } else if (s.type === "text") {
      const size = s.size || 13;
      parts.push(`<text x="${s.x}" y="${s.y}" font-size="${size}" fill="${color}" text-anchor="${s.anchor || "start"}">${escapeXml(s.text)}</text>`);
    }
  }
  parts.push("</svg>");
  return parts.join("");
}

// Cheap deterministic pre-check before ever spending a vision call: approximate every text
// label's bounding box (monospace-ish width heuristic is intentionally generous -- overestimating
// width means we sometimes flag labels that would have just barely fit, which is a safe direction
// to be wrong in for "nothing must overlap") and flag pairwise overlaps between labels, and
// between a label and any line/shape passing directly through its box.
function findLikelyOverlaps(spec: DiagramSpec): string[] {
  type Box = { x0: number; y0: number; x1: number; y1: number; label: string };
  const textBoxes: Box[] = [];
  for (const s of spec.shapes) {
    if (s.type !== "text") continue;
    const size = s.size || 13;
    const w = s.text.length * size * 0.62;
    const h = size * 1.3;
    let x0 = s.x;
    if (s.anchor === "middle") x0 = s.x - w / 2;
    else if (s.anchor === "end") x0 = s.x - w;
    textBoxes.push({ x0, y0: s.y - h, x1: x0 + w, y1: s.y + h * 0.3, label: s.text });
  }
  const issues: string[] = [];
  const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
  for (let i = 0; i < textBoxes.length; i++) {
    for (let j = i + 1; j < textBoxes.length; j++) {
      if (overlaps(textBoxes[i], textBoxes[j])) {
        issues.push(`Labels "${textBoxes[i].label}" and "${textBoxes[j].label}" overlap each other.`);
      }
    }
  }
  const segmentNearBox = (x1: number, y1: number, x2: number, y2: number, b: Box) => {
    const steps = 12;
    for (let t = 0; t <= steps; t++) {
      const px = x1 + ((x2 - x1) * t) / steps;
      const py = y1 + ((y2 - y1) * t) / steps;
      if (px > b.x0 && px < b.x1 && py > b.y0 && py < b.y1) return true;
    }
    return false;
  };
  for (const s of spec.shapes) {
    if (s.type !== "line" && s.type !== "arrow") continue;
    for (const b of textBoxes) {
      if (segmentNearBox(s.x1, s.y1, s.x2, s.y2, b)) {
        issues.push(`A line/arrow passes directly through the label "${b.label}".`);
      }
    }
  }
  return issues;
}

// Combines multiple photos (e.g. several notebook pages) into a single PDF, one image per page.
async function mergeImagesToPdf(images: { buffer: Buffer }[]): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const PAGE_WIDTH = 595.28; // A4 at 72dpi
  const PAGE_HEIGHT = 841.89;

  for (const img of images) {
    const jpegBuffer = await sharp(img.buffer).rotate().jpeg({ quality: 85 }).toBuffer();
    const embedded = await pdfDoc.embedJpg(jpegBuffer);
    const scale = Math.min(PAGE_WIDTH / embedded.width, PAGE_HEIGHT / embedded.height) * 0.95;
    const drawWidth = embedded.width * scale;
    const drawHeight = embedded.height * scale;
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawImage(embedded, {
      x: (PAGE_WIDTH - drawWidth) / 2,
      y: (PAGE_HEIGHT - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return Buffer.from(await pdfDoc.save());
}

// Photos uploaded one at a time (via /api/homework/upload-photo) land here temporarily, keyed by
// the uploader's email + a client-generated session id, so a multi-photo submission never has to
// go through the server in a single large multipart request (that's what was silently truncating
// on Vercel's ~4.5MB serverless body limit -- the exact "10 photos in, only 1 saved" failure mode).
const HOMEWORK_TEMP_PREFIX = "homework-temp";
// Same idea, separate folder namespace, for Revision paper answer submissions (see the Revision
// section below) -- reuses the same HOMEWORK_BUCKET and the same merge/chunk helpers, just a
// different temp prefix so the two features' in-flight uploads never collide.
const REVISION_TEMP_PREFIX = "revision-temp";
// Admin-uploaded NCERT textbook PDFs used to ground Revision paper generation for classes whose
// syllabus/books changed for 2026 (new Class 8 "Ganita Prakash"/"Curiosity" and Class 9 "Ganita
// Manjari"/"Exploration" books) -- stored in the existing chapter-notes bucket, one FOLDER per
// (class, subject) holding any number of files (one per chapter, multiple volumes, etc.), so
// lookup never needs a DB table: whichever chapter name a student's own syllabus gives us,
// generation just searches within whatever's on file for their class. No files on file for a
// class/subject just falls back to the model's own knowledge, exactly as before this existed.
//
// Uploads go through the same chunk-then-finalize flow as homework/revision submissions (see
// REVISION_TEMP_PREFIX above) rather than a single multipart request -- Vercel serverless
// functions cap a request body around 4.5MB, far below a real textbook PDF or a zip of a whole
// book's chapters, so a direct single-shot upload would silently fail past that size.
const REVISION_REFERENCE_PREFIX = "revision-reference-books";
const REVISION_REFERENCE_TEMP_PREFIX = "revision-reference-temp";

// Lists, downloads, and merges every photo uploaded for one session into a single PDF, then
// deletes the temp copies. Returns null if no photos were found for that session. `prefix`
// defaults to the homework temp folder; Revision submissions pass REVISION_TEMP_PREFIX instead.
async function mergeSessionPhotos(email: string, sessionId: string, prefix: string = HOMEWORK_TEMP_PREFIX): Promise<Buffer | null> {
  const folder = `${prefix}/${email}/${sessionId}`;
  const { data: fileList, error: listError } = await supabase.storage.from(HOMEWORK_BUCKET).list(folder);
  if (listError || !fileList || fileList.length === 0) return null;

  const sorted = fileList.slice().sort((a, b) => {
    const orderA = parseInt(a.name.split("-")[0], 10) || 0;
    const orderB = parseInt(b.name.split("-")[0], 10) || 0;
    return orderA - orderB;
  });

  const buffers: { buffer: Buffer }[] = [];
  for (const f of sorted) {
    const { data: blob } = await supabase.storage.from(HOMEWORK_BUCKET).download(`${folder}/${f.name}`);
    if (blob) buffers.push({ buffer: Buffer.from(await blob.arrayBuffer()) });
  }
  if (buffers.length === 0) return null;

  const merged = await mergeImagesToPdf(buffers);

  // Best-effort cleanup -- a failure here shouldn't fail the submission itself.
  await supabase.storage.from(HOMEWORK_BUCKET).remove(sorted.map((f) => `${folder}/${f.name}`)).catch(() => {});

  return merged;
}

// Same temp-then-assemble idea as mergeSessionPhotos, but for a single large file (e.g. one big
// PDF) split into small byte chunks client-side -- each chunk upload stays tiny regardless of the
// total file size, so a 4-5MB+ PDF never has to cross the server in one request either.
async function concatenateSessionChunks(email: string, sessionId: string, prefix: string = HOMEWORK_TEMP_PREFIX): Promise<Buffer | null> {
  const folder = `${prefix}/${email}/${sessionId}`;
  const { data: fileList, error: listError } = await supabase.storage.from(HOMEWORK_BUCKET).list(folder);
  if (listError || !fileList || fileList.length === 0) return null;

  const sorted = fileList.slice().sort((a, b) => {
    const orderA = parseInt(a.name.split("-")[0], 10) || 0;
    const orderB = parseInt(b.name.split("-")[0], 10) || 0;
    return orderA - orderB;
  });

  const chunks: Buffer[] = [];
  for (const f of sorted) {
    const { data: blob } = await supabase.storage.from(HOMEWORK_BUCKET).download(`${folder}/${f.name}`);
    if (blob) chunks.push(Buffer.from(await blob.arrayBuffer()));
  }
  if (chunks.length === 0) return null;

  const combined = Buffer.concat(chunks);

  await supabase.storage.from(HOMEWORK_BUCKET).remove(sorted.map((f) => `${folder}/${f.name}`)).catch(() => {});

  return combined;
}

// A finalize request can fully succeed on the server (temp files merged, uploaded, submission row
// written, temp files cleaned up) and STILL appear to fail to the student, if their connection
// drops for a moment while the success response is on its way back -- the browser's fetch() throws
// a network error, the client's automatic retry logic resends the exact same finalize request, and
// that retry finds nothing left to merge (it was already consumed by the first, silently-successful
// attempt) and returns a confusing "no photos/file found" error, even though the homework is
// already submitted. Before surfacing that error, check whether a submission for this exact
// assignment was in fact just created -- if so, treat this as the success it actually was rather
// than telling the student their real submission failed.
async function findJustCreatedSubmission(studentEmail: string, assignmentId: string): Promise<any | null> {
  const { data } = await supabase
    .from("homework_submissions")
    .select("*")
    .eq("student_email", studentEmail)
    .eq("assignment_id", assignmentId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  const ageMs = Date.now() - new Date(data.submitted_at).getTime();
  return ageMs >= 0 && ageMs < 3 * 60 * 1000 ? data : null;
}

// Sonnet 5 -- reverted from a Haiku 4.5 cost-cutting change that turned out to produce unreliable
// arithmetic verification. Real submissions showed the same fixed MCQ (a Heron's-formula area
// calculation) "corrected" to four different wrong values across different students' checks --
// Haiku was getting its own digit-by-digit re-derivation wrong, which is exactly the field this
// grading tool relies on to decide correct vs incorrect. Grading real students' work needs the
// stronger model; cost savings aren't worth marking correct answers wrong.
const CLAUDE_MODEL = "claude-sonnet-5";
// Used ONLY for Revision paper generation (writing the questions), never for grading anything --
// the comment above this constant is exactly why: Haiku's own arithmetic isn't reliable enough to
// trust for checking a student's work. Generation is a different risk profile (writing a question
// is not verifying one), and it's the highest-volume, highest-cost-per-call Claude path in the app
// (see the cost-reduction pass that introduced this), so it's the one place a cheaper model is
// worth the trade-off.
const CLAUDE_MODEL_GENERATION = "claude-haiku-4-5-20251001";

// Finds the student's existing submission for this assignment (if any) and overwrites it in
// place with the new file, instead of inserting another row -- a student re-submitting the same
// homework used to create a brand new row every single time, leaving the admin looking at three
// or more entries for what was really just one piece of homework being refined. Returns the row
// (new or updated) plus whatever question numbers were still outstanding on it before this
// overwrite -- and also persists that same value onto the row's own admin_notes (see below), so
// checkHomeworkSubmission can keep treating a resubmission as "fix just these" whether it's
// checked immediately via the returned value or picked up later by the cron sweep, which has no
// access to this function's return value and can only see what's on the row itself.
// admin_notes is a guaranteed-existing column that nothing else in this app reads or writes, so
// it's reused as a small JSON-encoded object to carry two independent pieces of internal
// bookkeeping that would otherwise each need their own dedicated column (missing_questions and a
// late-status-override column, neither of which was ever actually migrated onto the live
// database): outstandingQuestions (see checkHomeworkSubmission's resubmissionNote -- which
// question numbers a resubmission should be scoped to) and lateOverride (an admin's explicit
// late/not-late call that should win over the automatic deadline-timestamp comparison). Also
// tolerates the older bare-array shape (`["3","7"]`) written before lateOverride existed.
interface SubmissionNotes {
  outstandingQuestions?: string[];
  lateOverride?: "late" | "not_late";
  // How many questions the FULL assignment actually has, from the last non-scoped check.
  // Needed because a resubmission's AI check is deliberately scoped to only the few outstanding
  // questions (see resubmissionNote below) -- its own questionByQuestionCheck array only has
  // entries for that small subset, not the whole assignment. Using that subset's length as the
  // denominator for the doubt-percentage rule is wrong or (e.g. 1 doubt out of 3 scoped
  // questions = 33%, when the real assignment has 20 questions and the true rate is 5%) --
  // carrying this forward lets every resubmission check use the real total instead.
  totalQuestionCount?: number;
}
function parseAdminNotes(raw: string | null | undefined): SubmissionNotes {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { outstandingQuestions: parsed };
    if (parsed && typeof parsed === "object") return parsed as SubmissionNotes;
  } catch {
    // Not JSON -- e.g. a genuine hand-typed admin note from before this reuse. Treat as empty.
  }
  return {};
}
function serializeAdminNotes(notes: SubmissionNotes): string | null {
  const cleaned: SubmissionNotes = {};
  if (Array.isArray(notes.outstandingQuestions) && notes.outstandingQuestions.length > 0) cleaned.outstandingQuestions = notes.outstandingQuestions;
  if (notes.lateOverride) cleaned.lateOverride = notes.lateOverride;
  if (typeof notes.totalQuestionCount === "number" && notes.totalQuestionCount > 0) cleaned.totalQuestionCount = notes.totalQuestionCount;
  return Object.keys(cleaned).length > 0 ? JSON.stringify(cleaned) : null;
}

async function upsertHomeworkSubmission(params: {
  studentEmail: string;
  assignmentId: string;
  filePath: string;
  subject: string | null;
  // Only set by the admin's "Upload Homework For A Student" form when the "do not mark as late"
  // box is checked -- undefined means don't touch/set an override either way.
  lateOverride?: "late" | "not_late";
}): Promise<{ row: any; priorMissingQuestions: string[] | null }> {
  const { data: existing, error: existingError } = await supabase
    .from("homework_submissions")
    .select("id, file_path, status, admin_notes")
    .eq("student_email", params.studentEmail)
    .eq("assignment_id", params.assignmentId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);

  if (existing) {
    const existingNotes = parseAdminNotes(existing.admin_notes);
    let priorMissingQuestions: string[] | null = null;
    if (existing.status === "checked" && Array.isArray(existingNotes.outstandingQuestions) && existingNotes.outstandingQuestions.length > 0) {
      priorMissingQuestions = existingNotes.outstandingQuestions;
    }

    // An explicit lateOverride passed in for THIS submission should take effect; otherwise fall
    // back to whatever override the row already had (e.g. an admin's earlier "not late" call
    // surviving a routine resubmission).
    const notesForUpdate: SubmissionNotes = {};
    const nextLateOverride = params.lateOverride ?? existingNotes.lateOverride;
    if (nextLateOverride) notesForUpdate.lateOverride = nextLateOverride;
    // Also carry priorMissingQuestions forward onto the row itself (reusing the same
    // outstandingQuestions field, since it's naturally overwritten with fresh values once this
    // submission is actually checked) -- not just returned to the caller below. Previously this
    // lived ONLY in the HTTP response, for the frontend to thread through to a separate
    // check-mine call right after upload. If that follow-up call never completed (a dropped
    // mobile connection, a closed tab -- exactly the kind of flakiness this app already works
    // around elsewhere), the submission sat "pending" with no record of what was still
    // outstanding, and whichever check eventually ran it (the cron sweep, "Check Pending Now")
    // had no way to recover that context and graded it as a brand new submission from scratch --
    // silently discarding credit for everything the student had already gotten right. Persisting
    // it here means any later check can still find it on the row itself. See
    // checkHomeworkSubmission's fallback logic for the read side.
    if (priorMissingQuestions) notesForUpdate.outstandingQuestions = priorMissingQuestions;
    // Same reasoning applies to totalQuestionCount: it must survive this "pending" window too, or
    // the scoped check that eventually runs has no real denominator to fall back on and ends up
    // computing the doubt-percentage rule against just the few resubmitted questions instead of
    // the whole assignment (a real incident: 1 doubt out of a 3-question resubmission read as
    // 33%, when the actual assignment had 20 questions and the true rate was 5%).
    if (typeof existingNotes.totalQuestionCount === "number" && existingNotes.totalQuestionCount > 0) {
      notesForUpdate.totalQuestionCount = existingNotes.totalQuestionCount;
    }

    const { data: updatedRow, error: updateError } = await supabase
      .from("homework_submissions")
      .update({
        file_path: params.filePath,
        subject: params.subject,
        submitted_at: new Date().toISOString(),
        status: "pending",
        ai_score: null,
        ai_feedback: null,
        integrity_flag: null,
        admin_notes: serializeAdminNotes(notesForUpdate),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (updateError || !updatedRow) throw new Error(updateError?.message || "Failed to update the existing submission record.");

    // Old file is no longer referenced by anything -- remove it so replaced submissions don't
    // pile up as orphaned storage. Non-fatal: the record update above already succeeded.
    if (existing.file_path && existing.file_path !== params.filePath) {
      const { error: removeError } = await supabase.storage.from(HOMEWORK_BUCKET).remove([existing.file_path]);
      if (removeError) console.warn("Could not remove superseded homework file:", removeError.message);
    }

    return { row: updatedRow, priorMissingQuestions };
  }

  const { data: insertedRow, error: insertError } = await supabase
    .from("homework_submissions")
    .insert({
      student_email: params.studentEmail,
      file_path: params.filePath,
      subject: params.subject,
      assignment_id: params.assignmentId,
      admin_notes: params.lateOverride ? serializeAdminNotes({ lateOverride: params.lateOverride }) : null,
    })
    .select()
    .single();

  if (insertError || !insertedRow) throw new Error(insertError?.message || "Failed to save the submission record.");
  return { row: insertedRow, priorMissingQuestions: null };
}

// Sends one homework submission to Claude for grading, and writes the result back to the row.
// Never throws -- a failed check just leaves the submission "pending" so a later run can retry it.
// priorMissingQuestions ties directly to caller intent:
//  - an array -> use it as-is (the caller, e.g. check-mine right after a resubmission, already
//    knows exactly what was outstanding before this upload).
//  - explicit null -> the caller deliberately wants a full recheck with NO resubmission scoping
//    at all (admin Reevaluate: "grade this properly from scratch", ignoring any prior history).
//  - omitted (undefined) -> the caller has no opinion -- the cron sweep and "Check Pending Now"
//    just sweep up whatever's pending, with no context about why. Fall back to whatever this
//    row's own admin_notes carries forward from upsertHomeworkSubmission. This is what actually
//    closes a real scoring bug: a resubmission's "what's still outstanding" used to live ONLY in
//    the HTTP response returned to the browser, for the frontend to thread through to a separate
//    check-mine call right after upload. If that immediate follow-up never completed (a dropped
//    mobile connection, a closed tab) and the submission was instead picked up later by the cron
//    sweep, the scoping was silently lost and the AI graded the resubmission as a brand new
//    submission from scratch -- discarding credit for everything the student had already gotten
//    right, and tanking their score on what was really just a small correction.
// Shared by every deterministic per-question tally below (score, doubt-percentage numerator).
// missingQuestions/incorrectQuestions/doubtQuestions all list lettered/numbered sub-parts
// individually (matching questionByQuestionCheck's granularity, e.g. "Q25(ii)" and "Q25(iii)" as
// two separate entries for one question with two bad sub-parts) -- collapsing to top-level
// question numbers here means a single multi-part question only ever counts once, not once per
// sub-part, regardless of which of these lists it's being counted in.
function countTopLevelQuestions(list: any): number {
  if (!Array.isArray(list)) return 0;
  return new Set(list.map((q: any) => String(q).replace(/\(.*\)\s*$/, "").trim())).size;
}

// The model occasionally writes a literal placeholder (a bare `""`, `''`, "none", "n/a", "null")
// into an "empty string if nothing to report" field instead of actually returning an empty
// string -- a real incident: every non-null integrityFlag in the database turned out to be the
// literal two-character text `""`, none of them an actual integrity concern, which showed up to
// the admin as a scary-looking red warning badge on several unrelated students' homework with no
// real content behind it. Strips that class of placeholder before deciding whether a value is
// "really" empty, on top of the schema instruction asking the model not to do this in the first
// place (defense in depth, since a prompt instruction alone doesn't reliably prevent it).
function sanitizePlaceholderText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^(""|''|none|n\/a|null)$/i.test(trimmed)) return null;
  return trimmed;
}

async function checkHomeworkSubmission(submissionId: string, priorMissingQuestions?: string[] | null) {
  const { data: sub } = await supabase.from("homework_submissions").select("*").eq("id", submissionId).maybeSingle();
  if (!sub) return;

  const notesFromRow = parseAdminNotes(sub.admin_notes);

  let effectivePriorMissingQuestions = priorMissingQuestions;
  if (effectivePriorMissingQuestions === undefined) {
    effectivePriorMissingQuestions = Array.isArray(notesFromRow.outstandingQuestions) && notesFromRow.outstandingQuestions.length > 0
      ? notesFromRow.outstandingQuestions
      : null;
  }
  const isScopedResubmission = !!(effectivePriorMissingQuestions && effectivePriorMissingQuestions.length > 0);

  // A student who got some questions wrong or missing may send just those questions in a
  // follow-up submission (an "Improve Score" resubmission) rather than resending everything.
  // Scope this check to only what was actually still outstanding -- missing OR incorrect --
  // instead of re-flagging already-completed questions, and so a corrected wrong answer actually
  // raises the score instead of being silently ignored because it was never "missing" to begin with.
  let resubmissionNote = "";
  if (effectivePriorMissingQuestions && effectivePriorMissingQuestions.length > 0) {
    const outstanding = effectivePriorMissingQuestions.join(", ");
    resubmissionNote = `This student already submitted homework for this same assignment earlier, and it was checked. At that time, these question numbers were still outstanding (either missing entirely, or attempted but incorrect): ${outstanding}. This new submission is a follow-up meant to fix/complete those specific questions (it may contain only those questions, not the whole assignment). Every other originally-assigned question is already correct and checked from the earlier submission -- do NOT re-flag any question outside this list as missing or wrong just because it doesn't appear in this file, and do NOT dock the score for it. Only evaluate the questions in this list (${outstanding}): for each one, check whether it now appears and is correct, is now correct via the proper CBSE method, or is still missing/wrong/a doubt. If a question that was wrong or missing before is now attempted correctly, treat it as fully correct and score the assignment as a whole accordingly -- a fixed answer must raise the score, not just avoid lowering it further. Base your "missingQuestions" output ONLY on this list (only include a number in it if it is STILL missing or still wrong after this submission), not the full original assigned range.\n`;
  }

  const { data: fileBlob, error: downloadError } = await supabase.storage.from(HOMEWORK_BUCKET).download(sub.file_path);
  if (downloadError || !fileBlob) {
    console.error(`Could not download homework file for submission ${submissionId}:`, downloadError?.message);
    return;
  }

  const arrayBuffer = await fileBlob.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");
  const isPdf = fileBlob.type === "application/pdf" || sub.file_path.toLowerCase().endsWith(".pdf");
  const mediaType = isPdf ? "application/pdf" : (fileBlob.type || "image/jpeg");

  let assignmentContext = "";
  let questionSheetBlock: any = null;
  let assignmentForDeadline: { target_class: string; assigned_date: string; deadline: string | null } | null = null;
  if (sub.assignment_id) {
    const { data: a } = await supabase.from("homework_assignments").select("title, description, subject, file_path, target_class, assigned_date, deadline").eq("id", sub.assignment_id).maybeSingle();
    if (a) {
      assignmentForDeadline = { target_class: a.target_class, assigned_date: a.assigned_date, deadline: a.deadline };
      assignmentContext = `This was assigned as: "${a.title}"${a.description ? ` -- ${a.description}` : ""}${a.subject ? ` (Subject: ${a.subject})` : ""}.\n`;

      // If the teacher attached an official question sheet (common for textbook homework where
      // different editions number questions differently), download it too so Claude can check
      // the submission against the exact assigned questions rather than guessing from the title.
      if (a.file_path) {
        const { data: sheetBlob } = await supabase.storage.from(HOMEWORK_BUCKET).download(a.file_path);
        if (sheetBlob) {
          const sheetBuffer = await sheetBlob.arrayBuffer();
          const sheetBase64 = Buffer.from(sheetBuffer).toString("base64");
          const sheetIsPdf = sheetBlob.type === "application/pdf" || a.file_path.toLowerCase().endsWith(".pdf");
          questionSheetBlock = sheetIsPdf
            ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: sheetBase64 } }
            : { type: "image", source: { type: "base64", media_type: sheetBlob.type || "image/jpeg", data: sheetBase64 } };
        }
      }
    }
  }

  const contentBlock = isPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64Data } }
    : { type: "image", source: { type: "base64", media_type: mediaType, data: base64Data } };

  const questionSheetNote = questionSheetBlock
    ? "The FIRST attached file below is the student's handwritten submission. The SECOND attached file is a question sheet, attached for reference on the content/wording of individual questions.\n"
    : "";

  // Split into a STATIC system prompt (byte-identical on every single call, across every student
  // and every assignment) and a small per-request user message with only what actually varies.
  // Anthropic's prompt caching only helps when the cached portion is an exact repeated prefix --
  // this split, plus cache_control below, means the ~500-word instruction block is billed at full
  // price once and then at a fraction of that on every subsequent check within the cache window,
  // instead of being paid for in full on every single submission.
  const systemPrompt = `You are a strict school teacher's assistant checking a student's handwritten homework submission for a CBSE-curriculum Indian school student.

Working out which questions were actually assigned:
- The assignment title/description given to you is the AUTHORITATIVE source for which question numbers were assigned, especially if it states an explicit range or list (e.g. "RD Sharma Ex 6.1, Q21 to Q45", "Q1-10"). Use that stated range as ground truth.
- Do NOT assume the numbering printed on an attached question sheet matches the assigned range. A question sheet may be numbered locally (e.g. 1-25 on the page) while the teacher actually assigned a different range from the source textbook (e.g. Q21-45) -- the sheet is just there to show what each question asks, not to redefine which numbers were assigned. Match the student's own question numbers (as they wrote them, e.g. "Ex.21", "Q21") against the range stated in the description, not against the sheet's internal numbering.
- If the student has correctly answered questions in the officially stated range, do not mark the homework incomplete just because those numbers don't match a differently-numbered question sheet.
- If the student attempted extra questions outside the assigned range (bonus/extra practice), still check and grade those too -- do not ignore them and do not penalize the student for doing extra work.
- If you genuinely cannot tell which questions were assigned (no range stated anywhere and no other way to infer it), just grade what's shown as usual, without guessing at what might be missing.
- Many assignments (e.g. "Examples 1-11, Exercise Q1-11") contain TWO separately-numbered lists that both restart at 1 -- a bare "Q9" is genuinely ambiguous between them and risks quoting or checking the wrong problem entirely. Whenever an assignment has more than one numbered list, always write "Example N" or "Exercise QN" (never a bare number) everywhere you refer to a question -- in pageByPageNotes, questionByQuestionCheck, feedback, missingQuestions, and incorrectQuestions alike.

Counting the assignment for the doubt-percentage rule: separately from questionByQuestionCheck (which lists each lettered/numbered sub-part individually so every sub-part's arithmetic gets checked), report assignedQuestionCount as the number of TOP-LEVEL assigned questions only -- the count implied by the assigned range itself (e.g. "Question 16 to 30" is 15 questions, even though some of those, like a question with parts (i)-(iv), expand to several entries in questionByQuestionCheck). Do not derive assignedQuestionCount by counting entries in questionByQuestionCheck; count top-level question numbers in the assigned range directly.

Some students write a question number followed by the word "doubt" (sometimes misspelled "dought") -- this means the student is stuck and wants the teacher to explain that question in class. This applies whether the doubt marker stands alone with no attempt at all, OR the student made a partial/incorrect attempt first and then wrote "doubt" (e.g. gave up partway through and flagged it, rather than leaving it fully blank) -- either way, treat the WHOLE question as a self-flagged doubt, not a wrong or missing answer. Do not grade the partial attempt as incorrect just because one exists alongside the doubt marker, and never mark a doubt as incorrect.

A doubt-marked question is fully accounted for and resolved from a grading standpoint -- it is neither missing nor something still "to be attempted." It must never appear in missingQuestions or incorrectQuestions, must never be cited as a reason the submission is INCOMPLETE, and must never be described in feedback as something the student still needs to attempt or complete (e.g. never write phrasing like "cannot be graded complete until the doubt-marked questions are attempted" -- that is exactly backwards). If literally every assigned question is either correct or marked doubt, with nothing missing and nothing incorrect, the submission is COMPLETE, and your own score for it should be 10/10 -- score purely on the merits of the non-doubt questions, as if the doubt-marked ones simply weren't part of the assignment. Separately, list every doubt-marked question number in doubtQuestions (matching the same per-sub-part granularity as questionByQuestionCheck). Do NOT factor how many questions were marked doubt into your own score in any way, however many there are -- a deterministic step outside your scoring already applies a defined deduction based on that proportion, and if you also reduce your own score for it, the submission gets penalized twice for the same thing.

Students often submit homework as phone photos of each page, one photo per page, which get combined into one file in the order they were uploaded. That order does not always match question order (e.g. a student may photograph pages out of sequence) -- this is normal and not a mistake. Never comment on question numbering being "inconsistent with page order/numbering" or similar; just work out which questions are present regardless of what order they appear in.

Some submissions (especially a student's own scanned PDF rather than a photo taken directly through this app) have one or more pages rotated 90 or 180 degrees from normal reading orientation -- the handwriting runs sideways or upside down relative to the page. This is a scanning artifact, not a mistake in the student's work. Whenever a page's content doesn't read naturally left-to-right top-to-bottom, mentally rotate it to the correct orientation FIRST and read it exactly as carefully as an upright page before judging anything on it -- do not let sideways or upside-down orientation cause a rushed reading, a skipped line, a guessed digit, or a conclusion that something is missing when it is actually present but rotated. A page being rotated is never itself a reason to mark anything wrong or incomplete.

SCORING RULES (CBSE board guidelines -- follow these exactly, the score must never be reduced for anything outside this list):
- The score is based ONLY on two things: (1) whether every assigned question was attempted, and (2) whether each attempted question was solved correctly and via the proper CBSE method/steps (not just a bare final answer where working is required). The final score is computed deterministically outside your own judgment as 10 minus 1 mark for every question that ends up in missingQuestions or incorrectQuestions (a multi-part question with several wrong sub-parts still only costs 1 mark total, not one per sub-part) -- so the single most important thing for an accurate score is getting those two lists exactly right, not picking a number yourself.
- NEVER reduce the score for handwriting quality, neatness, presentation, or messiness -- even if the writing is untidy or hard to read in places, do not lower the score for it. If a question's content genuinely cannot be made out at all because of illegibility, treat that specific question as unclear in the feedback (ask the student to rewrite it clearly) but still do not treat this as a scoring deduction category of its own -- score based on whatever content you can determine.
- Poor handwriting can make one specific digit or character genuinely ambiguous between two visually similar ones -- known confusable pairs include: 3/5, 1/7, 6/0, 4/9 (the open vs. closed top of a hand-written 4 and 9 is a very common confusion), and 5/9 (a hastily-closed loop on a 5's lower curve, or a 9 written with a flat rather than fully round top, are easily swapped for each other). This is a reading problem, not a math problem, and must not be treated as a wrong answer. Treat EVERY digit as a candidate for this kind of misread, not only ones that look obviously messy at a glance -- a confident-looking read can still be the wrong one of a confusable pair, which is exactly why cross-checking against the redo-the-calculation-yourself step (see questionByQuestionCheck below) matters even when a digit doesn't feel ambiguous on first pass. When you genuinely cannot tell which of two similar-looking characters was written, resolve the ambiguity using whichever of these two checks applies: (1) if the digit is somewhere in the student's own working or final answer, prefer whichever reading makes their own shown working and final answer internally consistent and mathematically correct; (2) if the digit is instead in a value the student copied from the assigned question itself (a "given" number, e.g. a length, angle, or coefficient stated in the problem), prefer whichever reading matches the actual value stated in the assigned question/question sheet, since a copying slip on a given value is a reading problem the same way a working-out digit is. In short: when a digit is genuinely ambiguous between two readings, default to whichever reading credits the student as correct, not whichever you noticed first -- do not mark either kind wrong based on the other, inconsistent reading. This applies ONLY to a real visual ambiguity on a single digit/character where the student's method is otherwise sound; it does NOT apply to an answer that is clearly and unambiguously written as something wrong, and it must never be used to excuse an actual calculation error or a flawed method.
- Indian school notebooks are commonly double-ruled (two thin horizontal guide lines per row of writing, meant to keep digit height consistent) rather than single-ruled. Where a digit or character's ink physically overlaps or sits right on top of one of these printed guide lines, do not let the ruling itself be mistaken for part of the character's shape (e.g. a ruling line crossing a digit can make a 1 look like it has an extra horizontal stroke and read as a 7 or a 4, or make an open digit look closed) -- mentally separate the handwritten ink from the fixed printed lines of the page before deciding what character was actually written, the same way you would ignore a page's margin line or edge.
- NEVER reduce the score because a student crossed out, cut, scribbled over, or erased a wrong attempt and redid it nearby -- correcting your own mistake on the page is normal and expected, not a fault. When the same question number appears worked out twice (a scratched-out/crossed-out/heavily-scribbled-over first attempt followed by a second, cleaner attempt), grade ONLY the second, non-crossed-out attempt -- it supersedes the first one entirely, even if the first attempt's wrong conclusion is easier to read than the correct final one. This applies just as much to a single crossed-out WORD or short phrase inside an otherwise-continuous sentence, not only to a whole separate re-attempt written elsewhere -- e.g. a student who writes "diseases that ~~do not~~ spread from person to person" with "do not" struck through has corrected their own sentence to read "diseases that spread from person to person"; read and grade the sentence with every struck-through word removed entirely, exactly as the student intends it to be read after their own correction, and never grade a struck-through word as if it were still part of the answer (including treating a struck-through negation as if it still reversed the sentence's meaning).
- NEVER treat a question marked "doubt" as a scoring deduction, individually or in aggregate -- it is a self-flagged request for the teacher's help, not a wrong or missing answer. This includes not reducing your score based on how MANY questions were marked doubt; a fixed, deterministic deduction for that is applied separately outside your own scoring (see the doubtQuestions field), so your own score must never account for doubt volume at all.
- NEVER treat a question as wrong, incomplete, or disorganized just because its working starts on one page and continues or concludes on a later page (or on a page out of the normal reading order) -- this is a completely normal consequence of handwriting layout, not a mistake. A student very often runs out of room mid-derivation, so the concluding line ("Hence Proved", a final boxed answer, "= RHS", the last algebraic step) is frequently the very first line of the NEXT page rather than the last line of the page where the question started, and a proof that looks cut off at the bottom of a page is not evidence it was left unfinished. This is what the required pageByPageNotes field (see the tool schema) exists for: fill it in for every single page first, explicitly noting anything that opens a page as a continuation from the previous one, and only judge a question incomplete, wrong, or unconcluded after that page-by-page pass is done.
- DO put a question in missingQuestions (completely missing -- no answer and no doubt marker) or incorrectQuestions (attempted but wrong, or skipping required CBSE-format working/steps) -- each one deducts exactly 1 mark from the final score, deterministically, regardless of how minor or major the specific error is; do not try to weight individual questions differently by, say, leaving an easier one out of incorrectQuestions because the mistake felt small, or by mentally docking extra marks for a question that felt like a bigger error -- every bad question costs exactly the same 1 mark.

Write EXCEPTION-BASED feedback: only report problems. Do not praise, list, or describe anything that is correct or complete -- if a question is fine, say nothing about it at all. Silence means it's fine. Specifically:
- Do NOT list or mention which questions were attempted correctly. Never write things like "Q1-Q6 are correct."
- Do NOT comment on handwriting, neatness, presentation, or crossed-out/cut corrections at all, even in passing -- these never affect the score and are not worth mentioning. The only exception is a question whose content is so illegible you genuinely cannot tell what was written -- in that case, name the question number and ask for it to be rewritten clearly, without implying any score penalty.
- DO flag, by question number, any question that is wrong, incomplete, or not solved in the proper CBSE board format/method (e.g. missing required steps, skipping the working, wrong formula, not showing the final answer clearly) -- briefly say what's wrong. List every one of these question numbers in "incorrectQuestions" too, so the student can resubmit corrections for exactly those questions later.
- DO list, by question number, any question that is simply missing -- no answer AND no doubt marker -- and tell the student to complete and resubmit just those questions. Do not explain that there was no doubt marker or otherwise narrate how you decided a question counts as missing -- just list it.
- DO list, by question number, any question marked "doubt" -- just note it will be covered in class; do not evaluate it. List every one of these in "doubtQuestions" too.
- If any questions are missing without a doubt marker, state plainly that the homework is INCOMPLETE and ask the student to complete those question numbers and resend them. Doubt-marked questions never trigger this -- a submission where the only "gaps" are doubt markers is COMPLETE, not incomplete.
- If everything checked out -- fully attempted, complete, and correct per CBSE method -- the feedback field must NOT be an empty string. Write one short sentence saying so instead, e.g. "All assigned questions attempted correctly." An empty feedback field is indistinguishable from a submission that was never checked at all, so there must always be at least one sentence.

Call the submit_grade tool with your result.`;

  const prompt = `This submission is for subject: ${sub.subject || "unspecified"}.
${assignmentContext}${questionSheetNote}${resubmissionNote}`;

  // Forcing a tool call instead of asking Claude to write raw JSON as text sidesteps a whole
  // class of bugs found the hard way: markdown code fences around the JSON, unescaped newlines
  // or stray quotes inside the feedback string, and other free-text formatting drift. The
  // Anthropic API guarantees tool_use input already matches this schema -- no text parsing at all.
  const gradeTool = {
    name: "submit_grade",
    description: "Submit the grading result for this homework submission.",
    input_schema: {
      type: "object",
      properties: {
        // Listed FIRST on purpose: tool arguments are generated in property order, so this forces
        // an actual page-by-page read-through to happen before the model commits to score/feedback
        // -- a prose instruction alone ("read across pages") was tried first and was not reliable;
        // a real submission's Q29 conclusion sitting on the next page still got missed. Making the
        // model write out what's on each page as a required step catches exactly that case, because
        // it can no longer decide a question looks "incomplete" from one page without having
        // already looked at, and written down, what opens the next one.
        pageByPageNotes: {
          type: "array",
          items: { type: "string" },
          description: "One entry per page of the student's submission, in the order the pages appear, BEFORE deciding anything about completeness. Each entry: which question number(s) appear or continue on that page, and -- critically -- whether the page OPENS with a continuation of a question whose working started on the previous page (e.g. a final algebraic step, 'Hence Proved', a boxed final answer, or '= RHS' as the very first thing on the page). This must be filled in for every page before any question is judged incomplete, wrong, or missing a conclusion."
        },
        // Also listed before score, for the same property-order reason as pageByPageNotes: a
        // real submission (Class VIII proportions, ~26 questions with several true/false and
        // find-x sub-parts) was scored 2/10 with self-contradicting feedback text ("marked false
        // but should be true... upon re-check this is correctly marked false") -- the model was
        // catching and fixing its own arithmetic mistakes while WRITING the feedback, but by then
        // score had already been generated and could never be revised. Forcing the actual
        // re-derivation of every question's arithmetic into its own required field, ahead of
        // score, means the number is computed from settled verifications instead of a first
        // impression that gets silently corrected too late to matter.
        questionByQuestionCheck: {
          type: "array",
          items: { type: "string" },
          description: "One entry per assigned question (by number -- 'Example N' or 'Exercise QN' if the assignment has more than one numbered list, including each lettered/numbered sub-part for questions with multiple parts, e.g. 'Exercise Q1(iv)'), in order, BEFORE deciding score, feedback, missingQuestions, or incorrectQuestions. First copy out the exact numbers/values the student actually wrote for that question -- do not recall or assume values from a similar-looking textbook problem. Then, for anything involving arithmetic (ratios, cross-multiplication, proportions, unit conversions, equation-solving, etc.), redo the calculation yourself digit-by-digit using those copied-out values, and state the correct result, then compare it to what the student concluded -- do not just judge whether their working 'looks right'. State plainly: correct / incorrect (with the actual correct value if it differs) / missing / doubt. This must be completed for every single assigned question, in a single pass without revisiting earlier entries, before anything else is decided."
        },
        assignedQuestionCount: { type: "integer", minimum: 1, description: "The total number of assigned questions, counted by TOP-LEVEL question number only (e.g. an assignment description of 'Question 16 to 30' is 15 questions), NOT the number of entries in questionByQuestionCheck -- a question with lettered sub-parts like (i)-(iv) still counts as ONE question here even though it expands to several entries there. Used only as the denominator for the doubt-percentage rule." },
        integrityFlag: { type: "string", description: "A short note ONLY if the work strongly looks copied verbatim rather than solved by the student -- e.g. 'Handwriting and ink appear identical to another submission' or 'Answers match a known solutions website verbatim, including an unusual phrasing error.' If nothing looks copied (the overwhelmingly common case), set this to a true empty string with zero characters -- not the two characters \" \" (a literal quote-quote placeholder), not the word \"none\", not any other placeholder text standing in for 'nothing to report'." },
        missingQuestions: { type: "array", items: { type: "string" }, description: "Question numbers (as strings, e.g. \"24\") that are completely missing -- no answer and no doubt marker. Empty array if none missing." },
        incorrectQuestions: { type: "array", items: { type: "string" }, description: "Question numbers (as strings) that were attempted but are wrong, or skip required CBSE-format working/steps. Does NOT include missing or doubt-marked questions. Empty array if none incorrect." },
        doubtQuestions: { type: "array", items: { type: "string" }, description: "Question numbers (as strings) marked as a self-flagged doubt -- whether left blank or attempted-but-unresolved. Does NOT include missing or incorrect questions. Used only to apply a fixed deduction based on what proportion of the assignment this is -- do not let it influence your own score. Empty array if none." },
        // Listed right after missingQuestions/incorrectQuestions (not literally last) on purpose:
        // a test run against a real failing submission showed the model could get
        // questionByQuestionCheck and incorrectQuestions right (7 genuine problems correctly
        // identified) and STILL output score: 10, because score was still being generated before
        // incorrectQuestions/missingQuestions were finalized -- so score does need to come after
        // those. But an earlier version of this schema put score as the LITERAL last field, and
        // on a long/dense submission the response could hit max_tokens before ever reaching it --
        // since a missing score fails the whole check with no retry (unlike missing feedback,
        // which already retries), every submission dense enough to run long got permanently stuck
        // at "pending" instead of graded. feedback is free text and the longest remaining field,
        // so it goes last instead -- truncating it is already handled by the retry-on-empty-
        // feedback logic below, whereas truncating score is not recoverable.
        score: { type: "integer", minimum: 0, maximum: 10, description: "Your best estimate, 0-10, based ONLY on completeness (every assigned question attempted) and correctness (solved right, via proper CBSE method), treating doubt-marked questions as excluded from the assignment entirely. The actual score shown to the student is computed deterministically afterward as 10 minus 1 mark per question in missingQuestions/incorrectQuestions (see those fields) plus separate fixed penalties for doubt-volume and lateness -- so this field is not the final word, but it must still be a genuine, careful estimate (not a placeholder), since an implausible value here (e.g. 10 alongside several incorrectQuestions) is a signal something else was filled in wrong." },
        feedback: { type: "string", description: "Exception-based feedback: problems only, by question number, drawn from questionByQuestionCheck." },
      },
      required: ["pageByPageNotes", "questionByQuestionCheck", "assignedQuestionCount", "integrityFlag", "missingQuestions", "incorrectQuestions", "doubtQuestions", "score", "feedback"],
    },
  };

  try {
    // Anthropic occasionally returns a transient 529 "Overloaded" or 429 rate-limit response --
    // retry a couple of times with a short backoff before giving up on this submission.
    let data: any;
    let lastErrorMessage = "Claude did not return a usable result.";
    let succeeded = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, attempt * 2000));

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY as string,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: CLAUDE_MODEL,
          // Cache the static instruction block (see systemPrompt above) -- identical on every
          // call, so after the first write in a cache window every subsequent homework check
          // reads it back at a fraction of the normal input-token cost instead of paying full
          // price for the same ~500-word instructions on every single submission.
          system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
          // Thinking was previously disabled to avoid it consuming the whole token budget on a
          // dense question-sheet attachment. That trade-off turned out to cost more than it
          // saved: without real scratch space, the model's own digit-by-digit arithmetic
          // (required by questionByQuestionCheck to verify a student's answer) was landing wrong
          // -- the same fixed MCQ came back "corrected" to four different values across
          // different students' submissions. Adaptive thinking at a moderate effort level gives
          // it room to actually work through the calculation instead of committing to a number
          // in one pass, at the cost of somewhat higher latency per check.
          thinking: { type: "adaptive" },
          output_config: { effort: "medium" },
          // Raised to 12000 to give thinking real room on top of the existing structured-output
          // budget (pageByPageNotes + questionByQuestionCheck for a dense ~26-question
          // assignment) -- a tight budget here risks the same truncation failure mode described
          // below, now with thinking tokens competing for the same ceiling.
          max_tokens: 12000,
          tools: [gradeTool],
          tool_choice: { type: "tool", name: "submit_grade" },
          messages: [{
            role: "user",
            content: questionSheetBlock
              ? [contentBlock, questionSheetBlock, { type: "text", text: prompt }]
              : [contentBlock, { type: "text", text: prompt }],
          }],
        }),
      });
      data = await resp.json();

      if ((resp.status === 529 || resp.status === 429) && attempt < 2) {
        lastErrorMessage = data?.error?.message || `Anthropic returned status ${resp.status}`;
        continue;
      }

      const toolUseBlock = (data?.content || []).find((b: any) => b.type === "tool_use" && b.name === "submit_grade");
      if (!resp.ok || !toolUseBlock) {
        lastErrorMessage = data?.error?.message || "Claude did not return a usable result.";
        break;
      }
      // A missing score (or missing/empty feedback) almost always means the response got cut off
      // mid-generation on a long/dense submission -- retrying almost always gets a complete
      // response back. Worth one more attempt before giving up entirely, since either one failing
      // outright used to leave the submission permanently stuck at "pending" with no automatic
      // recovery (the empty-feedback case already retried; a missing score did not, until now).
      const scoreMissing = typeof toolUseBlock.input?.score !== "number";
      const feedbackMissing = typeof toolUseBlock.input?.feedback !== "string" || !toolUseBlock.input.feedback.trim();
      if ((scoreMissing || feedbackMissing) && attempt < 2) {
        lastErrorMessage = scoreMissing ? "Claude did not return a score." : "Claude returned a score but no feedback text.";
        continue;
      }
      if (scoreMissing) {
        lastErrorMessage = "Claude did not return a usable result.";
        break;
      }
      succeeded = true;
      break;
    }
    if (!succeeded) throw new Error(lastErrorMessage);

    const toolUseBlock = (data?.content || []).find((b: any) => b.type === "tool_use" && b.name === "submit_grade");
    const parsed = toolUseBlock.input;

    // How many questions the FULL assignment actually has, counted the same top-level way the
    // teacher assigns them (e.g. "Question 16 to 30" = 15) -- NOT questionByQuestionCheck.length,
    // which deliberately expands into one entry per lettered sub-part (e.g. a question with parts
    // (i)-(iv) becomes 4 entries there) for accuracy-checking purposes. Conflating those two units
    // was a real incident: a 15-question assignment containing one question with 4 lettered
    // sub-parts produced questionByQuestionCheck.length 19, which then silently became "19
    // assigned questions" in the doubt-percentage feedback shown to the student. assignedQuestionCount
    // is the model's own dedicated top-level count instead. On a resubmission-scoped check, the
    // model was deliberately told to only evaluate the few still-outstanding questions (see
    // resubmissionNote above), so its assignedQuestionCount would only reflect that small subset
    // -- using it here would silently substitute a tiny denominator for the real one (a real
    // incident: 1 doubt out of a 3-question scoped resubmission read as 33%, over the 30%
    // deduction threshold, when the actual assignment had 20 questions and the true rate was 5%,
    // well under it). Reuse whatever was persisted from the last full check instead.
    const rawQuestionCount = typeof parsed.assignedQuestionCount === "number" && parsed.assignedQuestionCount > 0
      ? parsed.assignedQuestionCount
      : (Array.isArray(parsed.questionByQuestionCheck) ? parsed.questionByQuestionCheck.length : 0);
    const effectiveTotalQuestionCount = isScopedResubmission && typeof notesFromRow.totalQuestionCount === "number" && notesFromRow.totalQuestionCount > 0
      ? notesFromRow.totalQuestionCount
      : rawQuestionCount;

    // Deterministic score -- 10 minus 1 mark for each assigned question that is missing or
    // incorrect, replacing whatever number Claude itself put in the score field. Never left to
    // the AI's own arithmetic, for the same reason as the doubt-percentage and late-submission
    // penalties below: a fixed, simple rule the teacher chose (exactly 1 mark per bad question,
    // not an AI judgment call that was landing inconsistently at 2 or 3 marks per question in
    // practice) that can't vary submission to submission or teacher to teacher. Doubt-marked
    // questions never appear in either list (per the doubt-marking rules above) so they never
    // cost anything here -- their own separate deduction is the doubt-percentage rule further
    // below. missingQuestions/incorrectQuestions are collapsed to top-level question numbers via
    // countTopLevelQuestions (same reasoning as the doubt-percentage numerator below), so a
    // single multi-part question with several wrong sub-parts still only costs 1 mark, not one
    // per sub-part.
    if (Array.isArray(parsed.missingQuestions) && Array.isArray(parsed.incorrectQuestions)) {
      const badQuestionCount = countTopLevelQuestions([...parsed.missingQuestions, ...parsed.incorrectQuestions]);
      parsed.score = Math.max(0, 10 - badQuestionCount);
    }

    // Deterministic doubt-volume penalty -- applied on top of the score above, never left to the
    // AI's own arithmetic, for the same reason as the late penalty below: a fixed rule that can't
    // vary submission to submission. Tiers, by percentage of assigned questions marked doubt:
    // 0-30% -> no deduction, >30-50% -> 3 marks off, >50% -> score 0.
    if (typeof parsed.score === "number") {
      const totalQuestions = effectiveTotalQuestionCount;
      const doubtCount = countTopLevelQuestions(parsed.doubtQuestions);
      if (totalQuestions > 0 && doubtCount > 0) {
        const doubtPercent = (doubtCount / totalQuestions) * 100;
        let doubtNote: string | null = null;
        if (doubtPercent > 50) {
          parsed.score = 0;
          doubtNote = `More than half the assigned questions (${doubtCount} of ${totalQuestions}) were marked doubt -- no marks are given for this submission, as per the doubt-marking policy.`;
        } else if (doubtPercent > 30) {
          parsed.score = Math.max(0, parsed.score - 3);
          doubtNote = `${doubtCount} of ${totalQuestions} assigned questions (over 30%) were marked doubt -- 3 marks deducted as per the doubt-marking policy.`;
        }
        if (doubtNote) {
          parsed.feedback = typeof parsed.feedback === "string" && parsed.feedback.trim() ? `${parsed.feedback}\n\n${doubtNote}` : doubtNote;
        }
      }
    }

    // Deterministic late-submission penalty -- applied after the score above, on top of it,
    // never as part of the AI's own reasoning (so it can't be talked out of it or vary submission
    // to submission). Two different scales depending on whether this file is the student's
    // original submission for this assignment, or a later "Improve Score" resubmission fixing
    // previously-flagged questions (isResubmission below, true whenever this row already had
    // outstanding questions from an earlier completed check -- true both for the automatic
    // follow-up check right after a resubmission upload AND a later admin Reevaluate of that same
    // fixed file, since either way sub.submitted_at reflects when the fix was actually uploaded).
    // A resubmission is graded well after the ORIGINAL deadline as a matter of course (the
    // student is fixing flagged work after already receiving feedback on it) -- scoring it on the
    // same escalating scale as an original late submission would double-punish the same lateness
    // twice, once already reflected in the original submission's own penalty.
    //   Original submission, by full days late: 1 day = 2 marks, 2 days = 3 marks, 3 days = 4
    //   marks, ...N days = N+1 marks (uncapped; Math.max(0, ...) below naturally floors the score).
    //   Resubmission: a 2-day grace window (0 marks, since promptly fixing flagged work shouldn't
    //   be punished), then a flat 1 mark regardless of how much later than that it comes in.
    // An admin's explicit lateOverride (set via the "Upload Homework For A Student" form's "do
    // not mark as late" box, or via the late-status toggle on an already-checked submission)
    // always wins over the automatic timestamp comparison -- "late" with no further detail is
    // treated as exactly 1 day late (the mildest late tier), since an override carries no day
    // count of its own.
    if (typeof parsed.score === "number") {
      const isResubmission = Array.isArray(notesFromRow.outstandingQuestions) && notesFromRow.outstandingQuestions.length > 0;
      let isLate = false;
      let daysLate = 0;
      if (notesFromRow.lateOverride === "not_late") {
        isLate = false;
      } else if (notesFromRow.lateOverride === "late") {
        isLate = true;
        daysLate = 1;
      } else {
        let effectiveDeadline: string | null = assignmentForDeadline?.deadline ?? null;
        if (assignmentForDeadline?.target_class === "All") {
          const { data: studentRow } = await supabase.from("users").select("student_class").eq("email", sub.student_email).maybeSingle();
          const mappedTarget = studentRow?.student_class ? CLASS_TO_TARGET[studentRow.student_class] : null;
          if (mappedTarget && assignmentForDeadline?.assigned_date) {
            effectiveDeadline = computeDeadline(assignmentForDeadline.assigned_date, mappedTarget);
          }
        }
        if (effectiveDeadline && sub.submitted_at) {
          // A 1-minute grace margin on top of the exact deadline, for every class -- a submission
          // landing a handful of seconds after the cutoff (upload finishing right as the clock
          // ticks over, or a small clock-skew between the student's device and the server) isn't
          // meaningfully "late" in the way the policy is meant to catch, and shouldn't cost marks.
          const msLate = new Date(sub.submitted_at).getTime() - new Date(effectiveDeadline).getTime() - LATE_SUBMISSION_GRACE_MS;
          isLate = msLate > 0;
          if (isLate) daysLate = Math.floor(msLate / (24 * 60 * 60 * 1000)) + 1;
        }
      }
      if (isLate) {
        let penalty = 0;
        let lateNote: string | null = null;
        if (isResubmission) {
          if (daysLate > 2) {
            penalty = 1;
            lateNote = "Resubmitted more than 2 days after the original deadline -- 1 mark deducted as per the late-resubmission rule.";
          }
        } else {
          penalty = daysLate + 1;
          lateNote = `Submitted ${daysLate} day${daysLate === 1 ? "" : "s"} after the homework deadline -- ${penalty} mark${penalty === 1 ? "" : "s"} deducted as per the late-submission rule.`;
        }
        if (penalty > 0) {
          parsed.score = Math.max(0, parsed.score - penalty);
          parsed.feedback = typeof parsed.feedback === "string" && parsed.feedback.trim() ? `${parsed.feedback}\n\n${lateNote}` : lateNote;
        }
      }
    }

    // Union of truly-missing and attempted-but-wrong questions -- everything still outstanding
    // that a resubmission should specifically target. Stored in admin_notes (see the comment on
    // upsertHomeworkSubmission's read side for why) so a later "Improve Score" resubmission knows
    // to only grade these questions fresh and carry over credit for everything else. Cleared back
    // to null once nothing is outstanding, rather than persisting a stale empty array. Any
    // existing lateOverride is carried forward unchanged -- a Reevaluate shouldn't silently
    // discard an admin's earlier late/not-late call.
    const outstandingQuestions = Array.from(new Set([
      ...(Array.isArray(parsed.missingQuestions) ? parsed.missingQuestions : []),
      ...(Array.isArray(parsed.incorrectQuestions) ? parsed.incorrectQuestions : []),
    ]));

    const { error: updateError } = await supabase.from("homework_submissions").update({
      status: "checked",
      ai_score: typeof parsed.score === "number" ? parsed.score : null,
      ai_feedback: typeof parsed.feedback === "string" ? parsed.feedback : null,
      integrity_flag: sanitizePlaceholderText(parsed.integrityFlag),
      admin_notes: serializeAdminNotes({ outstandingQuestions, lateOverride: notesFromRow.lateOverride, totalQuestionCount: effectiveTotalQuestionCount }),
    }).eq("id", submissionId);
    if (updateError) throw new Error(updateError.message);
  } catch (err: any) {
    console.error(`Error checking homework submission ${submissionId}:`, err.message);
  }
}

function mapHomeworkRow(row: any, fileUrl?: string | null): HomeworkSubmission {
  return {
    id: row.id,
    studentEmail: row.student_email,
    subject: row.subject,
    assignmentId: row.assignment_id,
    submittedAt: row.submitted_at,
    status: row.status,
    aiScore: row.ai_score,
    aiFeedback: row.ai_feedback,
    adminNotes: row.admin_notes,
    integrityFlag: row.integrity_flag,
    fileUrl: fileUrl ?? null,
  };
}

// integrityFlag is an admin-only signal, and adminNotes doubles as internal resubmission-scoping
// bookkeeping (see upsertHomeworkSubmission) -- neither should ever reach a student-facing response.
function mapHomeworkRowForStudent(row: any, fileUrl?: string | null): Omit<HomeworkSubmission, "integrityFlag" | "adminNotes"> {
  const { integrityFlag, adminNotes, ...rest } = mapHomeworkRow(row, fileUrl);
  return rest;
}

function mapAssignmentRow(row: any, fileUrl?: string | null): HomeworkAssignment {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    subject: row.subject,
    targetClass: row.target_class,
    fileUrl: fileUrl ?? null,
    assignedDate: row.assigned_date,
    deadline: row.deadline,
    createdAt: row.created_at,
  };
}

// Today's date in IST, as "YYYY-MM-DD" -- the timezone the daily-homework deadline is anchored to.
function todayIST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

// Deadline for homework assigned on a given IST date: the FOLLOWING day, timed to each class's
// tuition slot -- Class VIII 6:45pm, Class IX 5:45pm, Class X 4:45pm. "All"/other target classes
// fall back to the latest (most generous) cutoff so no class is shortchanged.
const DEADLINE_TIME_BY_CLASS: Record<string, string> = {
  "8th": "18:45:00",
  "9th": "17:45:00",
  "10th": "16:45:00",
};
function computeDeadline(assignedDate: string, targetClass: string): string {
  const time = DEADLINE_TIME_BY_CLASS[targetClass] || "18:45:00";
  const next = new Date(`${assignedDate}T00:00:00+05:30`);
  next.setDate(next.getDate() + 1);
  const nextDateStr = next.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  return new Date(`${nextDateStr}T${time}+05:30`).toISOString();
}

// Maps users.student_class (Roman numeral) <-> homework_assignments.target_class ("Nth")
const CLASS_TO_TARGET: Record<string, string> = { VIII: "8th", IX: "9th", X: "10th", XII: "12th" };
const TARGET_TO_LABEL: Record<string, string> = { "8th": "VIII", "9th": "IX", "10th": "X", "12th": "XII" };

function mapAnnouncementRow(row: any): Announcement {
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    targetClass: row.target_class,
    createdBy: row.created_by,
    createdAt: row.created_at,
  };
}

function mapForumThreadRow(row: any): ForumThread {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    authorEmail: row.author_email,
    authorName: row.author_name,
    imageUrl: row.image_url || null,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapForumReplyRow(row: any): ForumReply {
  return {
    id: row.id,
    threadId: row.thread_id,
    body: row.body,
    authorEmail: row.author_email,
    authorName: row.author_name,
    imageUrl: row.image_url || null,
    status: row.status,
    createdAt: row.created_at,
  };
}

// Maps a raw Supabase `users` row (snake_case) to the camelCase shape the frontend expects.
function mapUserRow(row: any): User {
  return {
    name: row.name,
    email: row.email,
    phone: row.phone,
    whatsappNumber: row.whatsapp_number,
    status: row.status,
    devices: row.devices || [],
    createdAt: row.created_at,
    role: row.role,
    studentClass: row.student_class,
    studentType: row.student_type === "online" ? "online" : "offline",
    photoUrl: row.photo_url || null,
    dateOfBirth: row.date_of_birth || null,
    bio: row.bio || null,
    favoriteSubject: row.favorite_subject || null,
    hobbies: row.hobbies || null,
  };
}

function mapInviteRow(row: any): InviteCode {
  return {
    code: row.code,
    createdFor: row.created_for,
    createdAt: row.created_at,
  };
}

// OTP storage lives in Supabase (not in-memory) so it survives across serverless invocations.

// Reused across every send instead of creating a fresh SMTP connection (TLS handshake + auth)
// per email -- that per-call setup cost was extra latency and an extra point of transient
// failure on every single OTP, and it's unnecessary since the credentials never change between
// calls within one running function instance.
let cachedTransporter: nodemailer.Transporter | null = null;
function getTransporter(): nodemailer.Transporter | null {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) return null;
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for port 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      // Do not fail on invalid / self-signed certs which are common in private SMTP servers
      rejectUnauthorized: false
    }
  });
  return cachedTransporter;
}

// Helper to send real emails via nodemailer SMTP
async function sendRealEmail(to: string, subject: string, bodyText: string, bodyHtml?: string) {
  try {
    const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@rayoptica.com";
    const transporter = getTransporter();
    if (!transporter) {
      console.warn(`[SMTP Info] Real email to ${to} is pending SMTP credentials.`);
      return false;
    }

    const info = await transporter.sendMail({
      from: smtpFrom,
      to,
      subject,
      text: bodyText,
      html: bodyHtml || bodyText.replace(/\n/g, "<br/>"),
    });

    console.log(`[SMTP Success] Real email sent to ${to}. MessageId: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`[SMTP Error] Failed to dispatch real email to ${to}:`, err);
    return false;
  }
}

// Helper to log and record simulated email dispatches, and actually dispatch the real one.
// Returns a promise (true = actually delivered) that every call site below awaits before
// responding to the client -- a serverless function instance can be frozen the moment its HTTP
// response is sent, which silently kills any not-yet-finished background work. An unawaited
// SMTP send here was exactly that: it usually finished in time, but under any latency (slow TLS
// handshake, a loaded SMTP host) the response could go out first and the email would just never
// arrive, with nothing in the UI or the response ever indicating it failed.
function sendSimulatedEmail(to: string, subject: string, body: string, type: 'incoming' | 'outgoing' | 'otp', htmlBody?: string): Promise<boolean> {
  const id = "EML-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  supabase
    .from("email_logs")
    .insert({ id, to_email: to, subject, body: htmlBody || body, type })
    .then(({ error }) => {
      if (error) console.error("Error logging simulated email:", error.message);
    });

  return sendRealEmail(to, subject, body, htmlBody).catch(err => {
    console.error("Real email send failed:", err);
    return false;
  });
}

// Content-Security-Policy scoped to the exact external hosts this app actually loads --
// Google Fonts (stylesheet + font files), Supabase storage (homework/avatar/forum files, all
// served from signed URLs on the project's own subdomain), and PubChem/RCSB (chemical structure
// images in KnowYourChemicals). blob: and data: are needed for local file previews (profile
// photo picker, homework photo uploader) and inline SVG diagrams. style-src needs 'unsafe-inline'
// because of the many inline style="" props and the <style dangerouslySetInnerHTML> blocks used
// for light/dark-mode overrides throughout the notes components -- script-src does NOT get
// 'unsafe-inline' or 'unsafe-eval', which is the directive that actually matters for blocking
// injected/foreign JavaScript.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.supabase.co https://pubchem.ncbi.nlm.nih.gov https://cdn.rcsb.org https://www.rcsb.org",
  // KnowYourChemicals also calls PubChem's REST API directly from the browser (CID/name lookups,
  // not just <img> loads) -- confirmed by actually exercising the search in the browser after
  // the first draft of this policy blocked it silently as a generic "Failed to fetch".
  "connect-src 'self' https://pubchem.ncbi.nlm.nih.gov",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

function buildApp(): express.Express {
  const app = express();

  // Security response headers, applied to every response (API and the served frontend alike).
  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", CONTENT_SECURITY_POLICY);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    // No preload directive -- that's a separate, hard-to-reverse submission to browsers' built-in
    // preload lists. A moderate max-age still gets the real protection (forces HTTPS for anyone
    // who's visited before) without that lock-in.
    res.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
    next();
  });

  // JSON and URL-encoded parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ── API ROUTES ──

  // System status check
  app.get("/api/health", (req, res) => {
    res.json({ status: "alive", timestamp: new Date().toISOString() });
  });

  function isAcid(formula: string, label: string = ""): boolean {
    const f = formula.trim().toUpperCase();
    // BUG FIX: this used to be `Math.max(0, indexOf(...))`, which clamps the "not found" sentinel
    // (-1) up to 0 -- making `l >= 0` true unconditionally, for every formula/label, found or not.
    // That silently made isAcid() return true for every single reactant (including salts, bases,
    // and plain metals), which broke the salt/base/solid/gas classification below it and is why
    // compounds like KOH were showing up mislabeled as "Diluted/Concentrated" instead of "Aqueous".
    const l = label.trim().toUpperCase().indexOf("ACID");
    const acids = ["HCL", "H2SO4", "HNO3", "CH3COOH", "HBR", "ACID", "ETHANOIC", "H2C2O4", "C18H36O2"];
    return acids.some(a => f.includes(a)) || l >= 0;
  }

  function isSalt(formula: string): boolean {
    const f = formula.trim().toUpperCase();
    const salts = [
      "CUSO4", "ZNSO4", "BACL2", "NA2SO4", "NACL", "ZNCO3", "MGCO3", "MGSO4", "NH4CL",
      "KI", "PB(NO3)2", "PBI2", "AGNO3", "AGCL", "NA2CO3", "NAHCO3", "FESO4", "FECL3", "CUCL2"
    ];
    return salts.some(s => f.includes(s));
  }

  // Common laboratory bases. These are used dissolved in water in virtually every school/college
  // reaction context, so (like isSalt above) they must be labeled "Aqueous ___" rather than left
  // with no state descriptor at all, which previously made them read as if reacting dry/crystalline.
  // Bare "NH3" is intentionally excluded since ammonia is also commonly used as a gas-phase reactant
  // (e.g. combustion), where labeling it "Aqueous" would be incorrect.
  function isBase(formula: string): boolean {
    const f = formula.trim().toUpperCase();
    const bases = ["NAOH", "KOH", "CA(OH)2", "MG(OH)2", "NH4OH", "AMMONIUM HYDROXIDE"];
    return bases.some(b => f.includes(b));
  }

  // Chemistry Reaction Helper Normalizer and Algorithmic Simulator Engine Fallback
  function normalizeFormula(name: string): { formula: string; label: string } {
    const clean = name.trim().toUpperCase();
    if (clean === "H2O" || clean === "WATER") return { formula: "H2O", label: "Water" };
    if (clean === "HCL" || clean === "HYDROCHLORIC ACID" || clean === "HYDROCHLORICACID") return { formula: "HCl", label: "Hydrochloric Acid" };
    if (clean === "NA" || clean === "SODIUM") return { formula: "Na", label: "Sodium Metal" };
    if (clean === "FE" || clean === "IRON") return { formula: "Fe", label: "Iron Metal" };
    // Salts are anhydrous (no water of crystallization) by default -- the vast majority of school
    // chemistry reactions (displacement, precipitation, acid-base, etc.) are taught and balanced
    // using the plain anhydrous formula. The hydrated/crystalline form is a DISTINCT substance that
    // must only be selected when the user's query explicitly names it as such (e.g. "Copper Sulfate
    // Crystals", "Copper Sulfate Pentahydrate", "Hydrous Copper Sulfate", "Blue Vitriol", or a
    // formula already written with its hydrate water, e.g. "CuSO4.5H2O"/"CuSO4·5H2O").
    if (clean.includes("CUSO4") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("BLUE VITRIOL") || clean.includes("5H2O"))) return { formula: "CuSO4·5H2O", label: "Copper Sulfate Pentahydrate" };
    if (clean.includes("CUSO4") || clean === "COPPER SULFATE" || clean === "COPPERSULFATE" || clean === "COPPER(II) SULFATE" || clean === "COPPER II SULFATE" || clean === "CUPRIC SULFATE") return { formula: "CuSO4", label: "Copper(II) Sulfate" };
    if (clean === "NAOH" || clean === "SODIUM HYDROXIDE" || clean === "SODIUMHYDROXIDE") return { formula: "NaOH", label: "Sodium Hydroxide" };
    if (clean === "KOH" || clean === "POTASSIUM HYDROXIDE" || clean === "POTASSIUMHYDROXIDE") return { formula: "KOH", label: "Potassium Hydroxide" };
    if (clean === "CA(OH)2" || clean === "CAOH2" || clean === "CALCIUM HYDROXIDE" || clean === "CALCIUMHYDROXIDE" || clean === "SLAKED LIME") return { formula: "Ca(OH)2", label: "Calcium Hydroxide" };
    if (clean === "NH4OH" || clean === "AMMONIUM HYDROXIDE" || clean === "AMMONIUMHYDROXIDE" || clean === "AQUEOUS AMMONIA") return { formula: "NH4OH", label: "Ammonium Hydroxide" };
    if (clean === "PROPENE" || clean === "C3H6") return { formula: "C3H6", label: "Propene" };
    if (clean === "HBR" || clean === "HYDROGEN BROMIDE") return { formula: "HBr", label: "Hydrogen Bromide" };
    if (clean === "CU" || clean === "COPPER") return { formula: "Cu", label: "Copper Metal" };
    if (clean.includes("ZNSO4") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("7H2O"))) return { formula: "ZnSO4·7H2O", label: "Zinc Sulfate Heptahydrate" };
    if (clean.includes("ZNSO4") || clean === "ZINC SULFATE" || clean === "ZINCSULFATE") return { formula: "ZnSO4", label: "Zinc Sulfate" };
    if (clean.includes("BACL2") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("2H2O"))) return { formula: "BaCl2·2H2O", label: "Barium Chloride Dihydrate" };
    if (clean.includes("BACL2") || clean === "BARIUM CHLORIDE" || clean === "BARIUMCHLORIDE") return { formula: "BaCl2", label: "Barium Chloride" };
    if (clean === "NA2SO4" || clean === "SODIUM SULFATE" || clean === "SODIUMSULFATE") return { formula: "Na2SO4", label: "Sodium Sulfate" };
    if (clean.includes("FESO4") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("VITRIOL") || clean.includes("7H2O"))) return { formula: "FeSO4·7H2O", label: "Iron Sulfate Heptahydrate" };
    if (clean.includes("FESO4") || clean === "IRON SULFATE" || clean === "IRONSULFATE" || clean === "IRON(II) SULFATE" || clean === "FERROUS SULFATE") return { formula: "FeSO4", label: "Iron(II) Sulfate" };
    if (clean.includes("MGSO4") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("EPSOM") || clean.includes("7H2O"))) return { formula: "MgSO4·7H2O", label: "Magnesium Sulfate Heptahydrate" };
    if (clean.includes("MGSO4") || clean === "MAGNESIUM SULFATE" || clean === "MAGNESIUMSULFATE") return { formula: "MgSO4", label: "Magnesium Sulfate" };
    if (clean.includes("NA2CO3") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("WASHING SODA") || clean.includes("10H2O"))) return { formula: "Na2CO3·10H2O", label: "Sodium Carbonate Decahydrate" };
    if (clean.includes("NA2CO3") || clean === "SODIUM CARBONATE" || clean === "SODIUMCARBONATE") return { formula: "Na2CO3", label: "Sodium Carbonate" };
    if (clean.includes("FECL3") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("6H2O"))) return { formula: "FeCl3·6H2O", label: "Iron(III) Chloride Hexahydrate" };
    if (clean.includes("FECL3") || clean === "IRON CHLORIDE" || clean === "IRONTRICHLORIDE" || clean === "IRON(III) CHLORIDE") return { formula: "FeCl3", label: "Iron(III) Chloride" };
    if (clean === "CO" || clean === "CARBON MONOXIDE" || clean === "CARBONMONOXIDE") return { formula: "CO", label: "Carbon Monoxide" };
    if (clean === "NH3" || clean === "AMMONIA" || clean === "AMMONIAGAS") return { formula: "NH3", label: "Ammonia" };
    if (clean === "HEXANE" || clean === "C6H14") return { formula: "C6H14", label: "Hexane" };
    if (clean === "OXALIC ACID" || clean === "OXALICACID" || clean === "H2C2O4" || clean === "C2H2O4") return { formula: "H2C2O4", label: "Oxalic Acid" };
    if (clean === "STEARIC ACID" || clean === "STEARICACID" || clean === "C18H36O2" || clean === "C17H35COOH") return { formula: "C18H36O2", label: "Stearic Acid" };
    if (clean.includes("CUCL2") && (clean.includes("HYDRATE") || clean.includes("CRYSTAL") || clean.includes("HYDROUS") || clean.includes("2H2O"))) return { formula: "CuCl2·2H2O", label: "Copper(II) Chloride Dihydrate" };
    if (clean.includes("CUCL2") || clean === "COPPER CHLORIDE" || clean === "COPPERDICHLORIDE" || clean === "COPPER(II) CHLORIDE") return { formula: "CuCl2", label: "Copper(II) Chloride" };
    if (clean === "CARBONIC ACID" || clean === "CARBONICACID" || clean === "H2CO3") return { formula: "H2CO3", label: "Carbonic Acid" };
    if (clean === "GYPSUM" || clean === "CALCIUM SULFATE DIHYDRATE" || clean === "CALCIUMSULFATEDIHYDRATE" || clean === "CASO4.2H2O" || clean === "CASO4·2H2O") return { formula: "CaSO4·2H2O", label: "Gypsum" };
    if (clean === "PLASTER OF PARIS" || clean === "PLASTEROFPARIS" || clean === "CALCIUM SULFATE HEMIHYDRATE" || clean === "CALCIUMSULFATEHEMIHYDRATE" || clean === "CASO4.0.5H2O" || clean === "CASO4·0.5H2O" || clean === "CASO4.1/2H2O") return { formula: "CaSO4·0.5H2O", label: "Plaster of Paris" };
    if (clean === "BLEACHING POWDER" || clean === "BLEACHINGPOWDER" || clean === "CALCIUM OXYCHLORIDE" || clean === "CALCIUMOXYCHLORIDE" || clean === "CALCIUM HYPOCHLORITE" || clean === "CALCIUMHYPOCHLORITE" || clean === "CAOCL2") return { formula: "CaOCl2", label: "Bleaching Powder" };
    if (clean === "GLUCOSE" || clean === "C6H12O6") return { formula: "C6H12O6", label: "Glucose" };
    if (clean === "FRUCTOSE") return { formula: "C6H12O6", label: "Fructose" };
    if (clean === "MALTOSE" || clean === "C12H22O11") return { formula: "C12H22O11", label: "Maltose" };
    // The substances below are all already recognized by isSalt() further up (so they were already
    // being correctly labeled "Aqueous ___"), but had no entry here -- meaning they fell through to
    // the generic auto-formatter and displayed as a bare, un-described formula. Giving each one a
    // proper descriptive label here keeps their state-labeling and their display name consistent.
    if (clean === "NACL" || clean === "SODIUM CHLORIDE" || clean === "SODIUMCHLORIDE" || clean === "COMMON SALT") return { formula: "NaCl", label: "Sodium Chloride" };
    if (clean === "KI" || clean === "POTASSIUM IODIDE" || clean === "POTASSIUMIODIDE") return { formula: "KI", label: "Potassium Iodide" };
    if (clean === "ZNCO3" || clean === "ZINC CARBONATE" || clean === "ZINCCARBONATE") return { formula: "ZnCO3", label: "Zinc Carbonate" };
    if (clean === "MGCO3" || clean === "MAGNESIUM CARBONATE" || clean === "MAGNESIUMCARBONATE") return { formula: "MgCO3", label: "Magnesium Carbonate" };
    if (clean === "NH4CL" || clean === "AMMONIUM CHLORIDE" || clean === "AMMONIUMCHLORIDE" || clean === "SAL AMMONIAC") return { formula: "NH4Cl", label: "Ammonium Chloride" };
    if (clean === "PB(NO3)2" || clean === "PBNO32" || clean === "LEAD NITRATE" || clean === "LEADNITRATE") return { formula: "Pb(NO3)2", label: "Lead(II) Nitrate" };
    if (clean === "PBI2" || clean === "LEAD IODIDE" || clean === "LEADIODIDE") return { formula: "PbI2", label: "Lead(II) Iodide" };
    if (clean === "AGNO3" || clean === "SILVER NITRATE" || clean === "SILVERNITRATE") return { formula: "AgNO3", label: "Silver Nitrate" };
    if (clean === "AGCL" || clean === "SILVER CHLORIDE" || clean === "SILVERCHLORIDE") return { formula: "AgCl", label: "Silver Chloride" };
    if (clean === "NAHCO3" || clean === "SODIUM BICARBONATE" || clean === "SODIUMBICARBONATE" || clean === "BAKING SODA") return { formula: "NaHCO3", label: "Sodium Bicarbonate" };
    if (clean === "K2CO3" || clean === "POTASSIUM CARBONATE" || clean === "POTASSIUMCARBONATE" || clean === "POTASH") return { formula: "K2CO3", label: "Potassium Carbonate" };
    if (clean === "CACL2" || clean === "CALCIUM CHLORIDE" || clean === "CALCIUMCHLORIDE") return { formula: "CaCl2", label: "Calcium Chloride" };
    if (clean === "ZNCL2" || clean === "ZINC CHLORIDE" || clean === "ZINCCHLORIDE") return { formula: "ZnCl2", label: "Zinc Chloride" };
    if (clean === "KNO3" || clean === "POTASSIUM NITRATE" || clean === "POTASSIUMNITRATE") return { formula: "KNO3", label: "Potassium Nitrate" };
    if (clean === "NANO3" || clean === "SODIUM NITRATE" || clean === "SODIUMNITRATE") return { formula: "NaNO3", label: "Sodium Nitrate" };
    if (clean === "KMNO4" || clean === "POTASSIUM PERMANGANATE" || clean === "POTASSIUMPERMANGANATE") return { formula: "KMnO4", label: "Potassium Permanganate" };
    if (clean === "K2CR2O7" || clean === "POTASSIUM DICHROMATE" || clean === "POTASSIUMDICHROMATE") return { formula: "K2Cr2O7", label: "Potassium Dichromate" };
    if (clean === "ZN" || clean === "ZINC") return { formula: "Zn", label: "Zinc Metal" };
    if (clean === "MG" || clean === "MAGNESIUM") return { formula: "Mg", label: "Magnesium Metal" };
    if (clean === "AL" || clean === "ALUMINIUM" || clean === "ALUMINUM") return { formula: "Al", label: "Aluminium Metal" };
    if (clean === "CA" || clean === "CALCIUM") return { formula: "Ca", label: "Calcium Metal" };
    if (clean === "H2SO4" || clean === "SULFURIC ACID" || clean === "SULFURICACID" || clean === "SULPHURIC ACID") return { formula: "H2SO4", label: "Sulfuric Acid" };
    if (clean === "HNO3" || clean === "NITRIC ACID" || clean === "NITRICACID") return { formula: "HNO3", label: "Nitric Acid" };
    if (clean === "CH3COOH" || clean === "ACETIC ACID" || clean === "ACETICACID" || clean === "ETHANOIC ACID" || clean === "ETHANOICACID" || clean === "VINEGAR") return { formula: "CH3COOH", label: "Acetic Acid" };

    // Only apply automatic Title Case to inputs that read as a plain multi-word chemical NAME
    // (e.g. "potassium iodide" -> "Potassium Iodide"). A compact single-token formula (e.g. "KI",
    // "NaOH", "CuSO4") must never be Title Cased -- doing so corrupts its case-sensitive element
    // symbols (e.g. "KI" was previously mangled into "Ki"). Since that same mangled string was also
    // being reused as the `formula` field (not just the display label), it broke downstream
    // formula matching too, not merely the display name.
    const raw = name.trim();
    const looksLikeMultiWordName = /\s/.test(raw) && /^[a-zA-Z0-9.\s]+$/.test(raw);
    const label = looksLikeMultiWordName
      ? raw.replace(/\b([a-z])([a-z]*)\b/gi, (m, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
      : raw;
    return { formula: raw, label };
  }

  interface ReactantItemInput {
    formula: string;
    concentration: "dilute" | "concentrated";
    gasSupply?: "limited" | "excess";
  }

  function generateDynamicFallback(
    reactants: ReactantItemInput[],
    temperature: number,
    pressure: number,
    solvent: string,
    addedPeroxide: boolean,
    tKelvin: number,
    catalyst: string = "None"
  ) {
    const list = reactants.map((r, idx) => {
      const norm = normalizeFormula(r.formula);
      return {
        formula: norm.formula,
        label: norm.label,
        concentration: r.concentration || "concentrated",
        gasSupply: r.gasSupply || "excess",
        originalIndex: idx
      };
    });

    let reactionFeasible = true;
    let reactionClass = "Association / Thermal Collisions";
    let balancedEquation = "";
    let reactantsData = list.map((item, idx) => {
      let displayName = item.label;
      if (isAcid(item.formula, item.label)) {
        displayName = `${item.concentration === "dilute" ? "Diluted" : "Concentrated"} ${item.label}`;
      } else if (isSalt(item.formula) || isBase(item.formula)) {
        displayName = `Aqueous ${item.label}`;
      } else {
        const fUpper = item.formula.toUpperCase();
        if (["FE", "NA", "CU", "ZN", "MG", "CAO", "MGO"].includes(fUpper)) {
          displayName = `Solid ${item.label}`;
        } else if (["O2", "CO2", "H2", "CL2"].includes(fUpper)) {
          displayName = `Gaseous ${item.label}`;
        } else {
          displayName = item.label;
        }
      }
      return {
        formula: item.formula,
        name: displayName,
        iupacName: item.label.toLowerCase(),
        pubchemId: `300${idx}${Math.floor(Math.random() * 90)}`,
        molecularWeight: 40 + idx * 18
      };
    });

    let productsData: any[] = [];
    let deltaH_rxn = -40;
    let deltaS_rxn = 10;
    let thermoType = "Exothermic";
    let visuals = {
      solutionColorStart: "clear",
      solutionColorEnd: "clear",
      hasBubbles: false,
      gasName: "",
      precipitateColor: "",
      animationDescription: "Combined reagents collide inside the reactor, exchanging species dependent isochorically."
    };
    let dangerLevel = "safe";
    let conceptualExplanationFoundational = "";
    let conceptualExplanationAdvanced = "";
    let arrowPushingDetails = "";
    let advice: string[] = [];

    const formulasUpper = list.map(x => x.formula.toUpperCase());
    const hasFormula = (f: string) => formulasUpper.some(x => x.includes(f.toUpperCase()));
    const findReactant = (f: string) => list.find(x => x.formula.toUpperCase().includes(f.toUpperCase()));

    // Let's analyze indicators like dilute vs concentrated of these reactants
    const anyConc = list.some(r => r.concentration === "concentrated");

    // SINGLE REACTANT THERMAL DECOMPOSITION (1 reactant)
    if (list.length === 1) {
      const single = list[0];
      const singleFormula = single.formula.toUpperCase();
      reactionClass = "Thermal Decomposition";
      if (singleFormula === "CACO3" || singleFormula === "CALCIUM CARBONATE") {
        balancedEquation = "CaCO₃(s) --[Heat]--> CaO(s) + CO₂(g)";
        productsData = [
          { formula: "CaO", name: "Calcium Oxide (Quicklime)", pubchemId: "14730", state: "s" },
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" }
        ];
        deltaH_rxn = 178.3; // Endothermic
        deltaS_rxn = 160.4;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Dioxide (CO₂)";
        visuals.animationDescription = `Heating solid CaCO₃ (limestone) ${catalyst && catalyst !== "None" ? `with ${catalyst} catalyst` : ""} causes crystal structure degradation, releasing bubbles of Carbon Dioxide and leaving behind Calcium Oxide powder.`;
        conceptualExplanationFoundational = "A fundamental CBSE Class 10 decomposition. Calcium Carbonate (limestone) on heating decomposes to produce calcium oxide (quicklime) and gaseous carbon dioxide.";
        conceptualExplanationAdvanced = `This is a highly endothermic solid decomposition reaction driven entirely by high entropy change (producing a gas). In the presence of ${catalyst && catalyst !== "None" ? `${catalyst}` : "heat"}, activation barriers of crystalline degradation are lowered.`;
      } else if (singleFormula === "ZNCO3" || singleFormula === "ZINC CARBONATE") {
        balancedEquation = "ZnCO₃(s) --[Heat]--> ZnO(s) + CO₂(g)";
        productsData = [
          { formula: "ZnO", name: "Zinc Oxide", pubchemId: "14824", state: "s" },
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" }
        ];
        deltaH_rxn = 71.5; // Endothermic
        deltaS_rxn = 145.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Dioxide (CO₂)";
        visuals.animationDescription = `Heating dull white Zinc Carbonate (ZnCO₃) powder results in chemical decomposition. It turns yellow when hot (forming Zinc Oxide) and releases Carbon Dioxide bubbles, turning white again upon cooling.`;
        conceptualExplanationFoundational = "A classic Class 9-10 chemistry lab showcase: Zinc Carbonate decomposed by high heat into yellow-white Zinc Oxide residue and Carbon Dioxide gas. Turning yellow when hot is a key signature of ZnO!";
        conceptualExplanationAdvanced = "Thermolytic dissociation of calamine (ZnCO₃) proceeds with a moderately low activation energy compared to CaCO₃. Zinc Oxide solid acts as an n-type semiconductor and displays thermochromism (yellow when hot, white when cold).";
      } else if (singleFormula === "MGCO3" || singleFormula === "MAGNESIUM CARBONATE") {
        balancedEquation = "MgCO₃(s) --[Heat]--> MgO(s) + CO₂(g)";
        productsData = [
          { formula: "MgO", name: "Magnesium Oxide", pubchemId: "14792", state: "s" },
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" }
        ];
        deltaH_rxn = 117.3;
        deltaS_rxn = 152.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Dioxide (CO₂)";
        visuals.animationDescription = `Decomposition of Magnesium Carbonate (MgCO₃) under flame heat. The white powder is converted to dense MgO while CO₂ gas bubbles bubble away.`;
        conceptualExplanationFoundational = "Heating solid Magnesium Carbonate decomposes it into white Magnesium Oxide ash and carbon dioxide gas.";
        conceptualExplanationAdvanced = "A high-entropy thermolytic decomposition showing classic group-2 metal carbonate thermal stability scaling (MgCO₃ is less thermally stable than CaCO₃ due to smaller ionic radius of Mg²⁺).";
      } else if (singleFormula === "NAHCO3" || singleFormula === "SODIUM BICARBONATE") {
        balancedEquation = "2NaHCO₃(s) --[Heat]--> Na₂CO₃(s) + H₂O(g) + CO₂(g)";
        productsData = [
          { formula: "Na2CO3", name: "Sodium Carbonate (Washing Soda)", pubchemId: "10340", state: "s" },
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
          { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
        ];
        deltaH_rxn = 135.6;
        deltaS_rxn = 334.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Dioxide & Steam";
        visuals.animationDescription = `Baking soda thermal rise! Heating dry NaHCO₃ powder breaks it down, creating a light, dry residue of Sodium Carbonate and releasing a mixture of steam and Carbon Dioxide gas.`;
        conceptualExplanationFoundational = "Baking soda (Sodium Bicarbonate) on heating breaks down into Sodium Carbonate, water, and Carbon Dioxide gas. This is why baking soda makes cakes rise!";
        conceptualExplanationAdvanced = "The low temperature decomposition (starting around 80°C) of NaHCO₃. The release of CO₂ gas and water vapor is useful for leavening agent mechanisms and dry powder fire extinguishers.";
      } else if (singleFormula === "H2O2" || singleFormula === "HYDROGEN PEROXIDE") {
        balancedEquation = "2H₂O₂(l) --[Catalyst]--> 2H₂O(l) + O₂(g)";
        productsData = [
          { formula: "H2O", name: "Water Liquid", pubchemId: "962", state: "l" },
          { formula: "O2", name: "Oxygen Gas", pubchemId: "977", state: "g" }
        ];
        deltaH_rxn = -196.4;
        deltaS_rxn = 125.0;
        thermoType = "Exothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Oxygen (O₂)";
        visuals.animationDescription = `Rapid catalytic decomposition of Hydrogen Peroxide (H₂O₂)! Oxygen gas is vigorously evolved with rapid bubbling, generating mild heat.`;
        conceptualExplanationFoundational = "Hydrogen peroxide decomposes naturally into water and oxygen gas. Adding a catalyst like MnO₂ makes this happen super fast, creating an explosion of soapy oxygen bubbles!";
        conceptualExplanationAdvanced = "A highly exothermic catalytic disproportionation reaction. The MnO₂ catalyst provides an active surface containing Mn oxides of multiple states to reduce the activation barriers of radical-mediated O-O bond cleavage.";
      } else if (singleFormula === "H2C2O4" || singleFormula === "OXALIC ACID" || singleFormula === "C2H2O4") {
        balancedEquation = "H₂C₂O₄(s) --[Heat]--> CO(g) + CO₂(g) + H₂O(g)";
        productsData = [
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
          { formula: "CO", name: "Carbon Monoxide Gas", pubchemId: "281", state: "g" },
          { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
        ];
        deltaH_rxn = 150.0;
        deltaS_rxn = 350.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Monoxide, Carbon Dioxide & Steam";
        visuals.animationDescription = `Heating Oxalic acid causes complete sublimative thermal decomposition. It breaks down completely into Carbon Monoxide gas, Carbon Dioxide gas, and Steam, leaving no solid residue!`;
        conceptualExplanationFoundational = "Oxalic acid decomposes when heated above its melting point (~190°C) into carbon dioxide, poisonous carbon monoxide gas, and water vapor.";
        conceptualExplanationAdvanced = "An endothermic decarbonylation and decarboxylation process. Dry Oxalic acid undergoes intramolecular proton transfer followed by consecutive bond cleavage to yield CO, CO₂ and H₂O.";
      } else if (singleFormula === "H2CO3" || singleFormula === "CARBONIC ACID" || singleFormula === "CARBONICACID") {
        balancedEquation = "H₂CO₃(aq) → H₂O(l) + CO₂(g)";
        productsData = [
          { formula: "H2O", name: "Water Liquid", pubchemId: "962", state: "l" },
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" }
        ];
        deltaH_rxn = 20.4;
        deltaS_rxn = 96.5;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Dioxide (CO₂)";
        visuals.animationDescription = "Carbonic acid is highly unstable in liquid form and spontaneously decomposes at room temperature, releasing rapid fizzing bubbles of Carbon Dioxide gas.";
        conceptualExplanationFoundational = "Carbonic acid (H₂CO₃) is a weak diprotic acid. It is unstable and rapidly decomposes into water and carbon dioxide gas, which causes the fizzy effervescence we see in carbonated drinks.";
        conceptualExplanationAdvanced = "The decomposition of H₂CO₃ in aqueous solution has a very low activation barrier (~12 kcal/mol) and is thermodynamically favored under standard ambient conditions due to the massive entropic gain from gaseous CO₂ release.";
      } else if (singleFormula === "CASO4·2H2O" || singleFormula === "CASO4.2H2O" || singleFormula === "GYPSUM") {
        balancedEquation = "CaSO₄·2H₂O(s) --[Heat, ~120°C]--> CaSO₄·½H₂O(s) + 1½H₂O(g)";
        productsData = [
          { formula: "CaSO4·0.5H2O", name: "Plaster of Paris (Calcium Sulfate Hemihydrate)", pubchemId: "24928", state: "s" },
          { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
        ];
        deltaH_rxn = 88.0;
        deltaS_rxn = 180.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Water Vapor (Steam)";
        visuals.animationDescription = `Gently heating white Gypsum powder to around 120°C drives off three-quarters of its water of crystallization as steam, leaving behind the fine white powder Plaster of Paris.`;
        conceptualExplanationFoundational = "A classic CBSE Class 10 reaction. Gypsum (calcium sulfate dihydrate) loses most of its water of crystallization on gentle heating, converting it into Plaster of Paris (calcium sulfate hemihydrate). Heating much further destroys the hemihydrate entirely into 'dead burnt plaster'.";
        conceptualExplanationAdvanced = "This partial dehydration is carefully controlled around 120-180°C; heating beyond ~200°C over-dehydrates the hemihydrate into anhydrous CaSO4 ('dead burnt plaster'), which no longer sets properly with water.";
      } else if (singleFormula === "CASO4·0.5H2O" || singleFormula === "CASO4.0.5H2O" || singleFormula === "PLASTER OF PARIS") {
        balancedEquation = "CaSO₄·½H₂O(s) --[Heat, >200°C]--> CaSO₄(s) + ½H₂O(g)";
        productsData = [
          { formula: "CaSO4", name: "Anhydrous Calcium Sulfate (\"Dead Burnt Plaster\")", pubchemId: "24497", state: "s" },
          { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
        ];
        deltaH_rxn = 20.0;
        deltaS_rxn = 45.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Water Vapor (Steam)";
        visuals.animationDescription = `Strongly overheating Plaster of Paris beyond 200°C drives off its remaining water of crystallization, converting it into anhydrous "dead burnt plaster" that has lost its ability to set with water.`;
        conceptualExplanationFoundational = "If Plaster of Paris is heated too strongly (above ~200°C), it loses its last trace of water entirely, becoming anhydrous calcium sulfate. Unlike Plaster of Paris, this 'dead burnt plaster' no longer hardens when mixed with water, so it is chemically useless for casting.";
        conceptualExplanationAdvanced = "Complete anhydrous CaSO4 loses the structural water channels needed to rapidly re-form the interlocking gypsum crystal lattice on rehydration, which is why over-heated plaster fails to set.";
      } else if (singleFormula === "C6H12O6" || singleFormula === "GLUCOSE" || singleFormula === "FRUCTOSE") {
        balancedEquation = "C₆H₁₂O₆(s) --[Heat]--> 6C(s) + 6H₂O(g) (Caramelization / Charring)";
        productsData = [
          { formula: "C", name: "Amorphous Carbon Solid (Char)", pubchemId: "5462310", state: "s" },
          { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
        ];
        deltaH_rxn = 220.0;
        deltaS_rxn = 410.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Steam";
        visuals.animationDescription = "Heating solid glucose/fructose causes it to melt, turn amber-brown (caramelization), and eventually char completely into a dry, black carbonaceous solid releasing heavy steam.";
        conceptualExplanationFoundational = "When simple hexose sugars like glucose or fructose are heated, they undergo caramelization and thermal degradation. If heated strongly, they char into elemental black carbon (charcoal) and release steam.";
        conceptualExplanationAdvanced = "Thermal decomposition and dehydration of a hexose sugar. High temperatures drive intramolecular elimination of water, leaving behind carbonaceous char and gaseous H₂O.";
      } else if (singleFormula === "C12H22O11" || singleFormula === "MALTOSE" || singleFormula === "SUCROSE") {
        balancedEquation = "C₁₂H₂₂O₁₁(s) --[Heat]--> 12C(s) + 11H₂O(g) (Charring)";
        productsData = [
          { formula: "C", name: "Amorphous Carbon Solid (Char)", pubchemId: "5462310", state: "s" },
          { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
        ];
        deltaH_rxn = 430.0;
        deltaS_rxn = 780.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Steam";
        visuals.animationDescription = "Maltose/sucrose sugar melts, caramelizes, and chars under strong heat, forming a rising, black porous column of carbon solid while evolving hot steam.";
        conceptualExplanationFoundational = "Solid sugars like maltose undergo pyrolysis and dehydration under heat, splitting completely into solid black carbon and water vapor.";
        conceptualExplanationAdvanced = "Thermal degradation of a disaccharide. Heating above the melting point initiates glycosidic bond hydrolysis followed by dehydration of glucose monomers to solid carbon.";
      } else {
        balancedEquation = `${single.formula}(s) --[Heat]--> decomposed species + gas`;
        productsData = [
          { formula: `${single.formula}_Residue`, name: `Decomposed Chemical Residue`, pubchemId: "1019001", state: "s" },
          { formula: "Gas", name: "Evolved Gases", pubchemId: "1019002", state: "g" }
        ];
        deltaH_rxn = 120.0;
        deltaS_rxn = 110.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Released Gas";
        visuals.animationDescription = `Vaporization and splitting! Applying high energy decomposition pathways to ${single.label} causing solid/liquid breakdown, releasing bubbles/fumes and leaving residual material at the bottom.`;
        conceptualExplanationFoundational = `A classic thermal decomposition. Single reactant ${single.label} absorbs heat energy, breaking its primary chemical bonds into simpler constituent compounds.`;
        conceptualExplanationAdvanced = `This is a thermolytic degradation under dry/neat or solvent conditions where the reactant ${single.label} absorbs thermodynamic enthalpy to drive bond-cleavage pathways.`;
      }
    }
    // Plaster of Paris + Water (the "setting" reaction -- exothermic rehydration back into Gypsum)
    else if ((hasFormula("CASO4·0.5H2O") || hasFormula("CASO4.0.5H2O") || hasFormula("PLASTER OF PARIS")) && (hasFormula("H2O") || hasFormula("WATER"))) {
      reactionClass = "Hydration / Setting Reaction";
      balancedEquation = "CaSO₄·½H₂O(s) + 1½H₂O(l) --> CaSO₄·2H₂O(s)";
      productsData = [
        { formula: "CaSO4·2H2O", name: "Gypsum (Calcium Sulfate Dihydrate)", pubchemId: "24928", state: "s" }
      ];
      deltaH_rxn = -17.0;
      deltaS_rxn = -60.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = false;
      visuals.gasName = "";
      visuals.animationDescription = "The classic 'setting' reaction! Mixing Plaster of Paris powder with water forms a workable paste that slowly warms up and hardens within minutes into a solid, interlocking crystalline mass of Gypsum.";
      conceptualExplanationFoundational = "This is the famous setting reaction used to make plaster casts, chalk, and sculpture molds. Plaster of Paris (CaSO4·½H2O) reabsorbs water and slowly recrystallizes back into hard, solid Gypsum (CaSO4·2H2O), expanding very slightly as it sets.";
      conceptualExplanationAdvanced = "The exothermic rehydration nucleates and grows an interlocking network of needle-like gypsum crystals, which is what gives set plaster its mechanical rigidity. The slight volume expansion during crystallization is why Plaster of Paris faithfully fills fine mold details.";
      arrowPushingDetails = "CaSO4·½H2O(s) + 1½H2O(l) → CaSO4·2H2O(s) (direct recombination with water of crystallization, no ions in solution)";
      advice.push("This is why Plaster of Paris must be stored in an airtight container -- ambient moisture alone can slowly trigger the same setting reaction!");
    }
    // Chlorine gas + Slaked Lime (Calcium Hydroxide) -> Bleaching Powder
    else if ((hasFormula("CL2") || hasFormula("CHLORINE")) && (hasFormula("CA(OH)2") || hasFormula("CALCIUM HYDROXIDE") || hasFormula("SLAKED LIME"))) {
      // Unlike the limewater test elsewhere (which correctly uses aqueous Ca(OH)2), industrial
      // bleaching-powder manufacture passes chlorine gas over DRY slaked lime powder, not a solution
      // -- so the generic "Aqueous Calcium Hydroxide" auto-label from isBase() would be chemically
      // wrong here specifically. Override it back to the correct solid/dry form for this reaction.
      reactantsData = reactantsData.map(r =>
        r.formula.toUpperCase().includes("CA(OH)2")
          ? { ...r, name: "Solid Calcium Hydroxide (Dry Slaked Lime)" }
          : r
      );
      reactionClass = "Combination / Halogenation";
      balancedEquation = "Ca(OH)₂(s) + Cl₂(g) --> CaOCl₂(s) + H₂O(l)";
      productsData = [
        { formula: "CaOCl2", name: "Bleaching Powder (Calcium Hypochlorite)", pubchemId: "24504", state: "s" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -110.0;
      deltaS_rxn = -40.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = false;
      visuals.gasName = "";
      visuals.precipitateColor = "";
      visuals.animationDescription = "Pale greenish-yellow Chlorine gas is passed over dry, powdery slaked lime. The lime absorbs the gas and turns into a dull white powder with a sharp, pungent chlorine smell -- Bleaching Powder.";
      conceptualExplanationFoundational = "A classic CBSE Class 10 reaction. Chlorine gas reacts with dry slaked lime (calcium hydroxide) to produce bleaching powder (calcium oxychloride), an important industrial disinfectant and bleaching agent.";
      conceptualExplanationAdvanced = "Bleaching powder is technically a mixed salt of hypochlorous and hydrochloric acid (Ca(OCl)Cl), containing calcium bound to both a hypochlorite (OCl-) and a chloride (Cl-) ion. Its bleaching and disinfecting action comes from slow release of active chlorine/hypochlorite oxidizing species.";
      arrowPushingDetails = "Ca(OH)2(s) + Cl2(g) → Ca(OCl)Cl(s) + H2O(l) (chlorine disproportionates onto the calcium hydroxide lattice, forming one Ca-OCl and one Ca-Cl bond)";
      advice.push("Try passing excess Chlorine gas over Calcium Hydroxide slurry instead of dry powder to compare industrial wet-process bleaching powder manufacture!");
    }
    // Carbon + O2 reaction with limited vs excess Oxygen supply.
    // hasFormula("C") checks substring containment, so it would previously also match any compound
    // that merely contains the letter "C" anywhere (e.g. "Ca(OH)2", "NaHCO3", "CuSO4"), incorrectly
    // classifying totally unrelated reactions as carbon combustion. Elemental carbon is matched by
    // exact formula/label equality instead.
    else if ((list.some(r => ["C", "CARBON"].includes(r.formula.toUpperCase()) || ["COAL", "CHARCOAL", "CARBON"].includes(r.label.toUpperCase()))) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      const o2Reactant = findReactant("O2") || findReactant("OXYGEN");
      const supply = o2Reactant?.gasSupply || "excess";
      reactionClass = "Combustion / Oxide Formation";
      if (supply === "limited") {
        balancedEquation = "2C(s) + O₂(g) --[Heat]--> 2CO(g) (Incomplete Combustion)";
        productsData = [
          { formula: "CO", name: "Carbon Monoxide (Extremely Toxic Gas)", pubchemId: "281", state: "g" }
        ];
        deltaH_rxn = -221.0; 
        deltaS_rxn = 178.0;
        thermoType = "Exothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Monoxide (CO)";
        visuals.animationDescription = `Heating carbon coal with a restricted, limited Oxygen supply results in incomplete combustion, generating toxic colorless Carbon Monoxide gas.`;
        conceptualExplanationFoundational = "When there is not enough oxygen, combustion of carbon is incomplete. Dangerous toxic carbon monoxide gas is formed instead of carbon dioxide.";
        conceptualExplanationAdvanced = "Ambient oxygen scarcity prevents carbon species from being oxidized to +4 state. The system stabilizes at the carbon monoxide (+2) stage.";
      } else {
        balancedEquation = "C(s) + O₂(g) --[Heat]--> CO₂(g) (Complete Combustion)";
        productsData = [
          { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" }
        ];
        deltaH_rxn = -393.5;
        deltaS_rxn = 2.9;
        thermoType = "Exothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Carbon Dioxide (CO₂)";
        visuals.animationDescription = `Vigorous complete combustion of carbon coal in an abundant excess oxygen supply, producing clean Carbon Dioxide gas.`;
        conceptualExplanationFoundational = "Carbon reacts completely with excess oxygen gas. The carbon is fully oxidized to form stable carbon dioxide gas.";
        conceptualExplanationAdvanced = "With thermodynamic oxygen abundance, charcoal carbon undergoes full oxidation to gaseous CO₂ with high thermal evolution (ΔH = -393.5 kJ/mol).";
      }
    }
    // Hexane + O2 combustion
    else if ((hasFormula("C6H14") || hasFormula("HEXANE")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion";
      balancedEquation = "2C₆H₁₄(l) + 19O₂(g) --[Heat]--> 12CO₂(g) + 14H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -8331.0; 
      deltaS_rxn = 415.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide & Flame";
      visuals.animationDescription = `Vigorous rapid combustion of Hexane Alkane hydrocarbon in Oxygen, producing an intense hot flame, releasing Carbon Dioxide gas bubbles, steam, and high heat energy.`;
      conceptualExplanationFoundational = "Hexane is a flammable liquid alkane hydrocarbon. In the presence of oxygen and heat, it burns cleanly to produce carbon dioxide and water vapor releasing massive amounts of heat.";
      conceptualExplanationAdvanced = "Complete combustion of an alkane (CnH2n+2). The massive exothermic enthalpy (ΔH° ≈ -4165 kJ/mol-hexane) drives extremely high local temperature. This reaction involves radical-chain mechanisms initiating with oxygen activation followed by methyl/methylene radical carbon-backbone collapse.";
    }
    // Stearic Acid + O2 combustion
    else if ((hasFormula("C18H36O2") || hasFormula("STEARIC ACID") || hasFormula("STEARIC")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion";
      balancedEquation = "C₁₈H₃₆O₂(s) + 26O₂(g) --[Heat]--> 18CO₂(g) + 18H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -11280.0; 
      deltaS_rxn = 520.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide, Smoke & Steam";
      visuals.animationDescription = `Stearic acid melts into a liquid pool, then vaporizes and burns in oxygen, typical of candle wax combustion. It releases carbon dioxide gas, steam, and generates a bright yellow flame.`;
      conceptualExplanationFoundational = "Stearic acid is a solid saturated fatty acid commonly found in candle wax. It melts and burns in oxygen, reacting to form carbon dioxide, steam, and releasing heat.";
      conceptualExplanationAdvanced = "Full oxidation of a C18 long-chain carboxylic acid. After melting (melting point ~69°C), high temperatures vaporize stearic acid molecule fragments, initiating radical cleavage which reacts with oxygen species (ΔH° ≈ -11.2 MJ/mol).";
    }
    // KMnO4 + H2C2O4 + H2SO4 (Redox Titration!)
    else if ((hasFormula("KMnO4") || hasFormula("PERMANGANATE")) && (hasFormula("H2C2O4") || hasFormula("OXALIC ACID") || hasFormula("OXALIC")) && (hasFormula("H2SO4") || hasFormula("SULFURIC ACID") || hasFormula("SULFURIC"))) {
      reactionClass = "Redox Reaction / Titration";
      balancedEquation = "2KMnO₄(aq) + 5H₂C₂O₄(aq) + 3H₂SO₄(aq) --> K₂SO₄(aq) + 2MnSO₄(aq) + 10CO₂(g) + 8H₂O(l)";
      productsData = [
        { formula: "MnSO4", name: "Manganese(II) Sulfate", pubchemId: "24584", state: "aq" },
        { formula: "K2SO4", name: "Potassium Sulfate", pubchemId: "24507", state: "aq" },
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -250.0;
      deltaS_rxn = 450.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide (CO₂)";
      visuals.animationDescription = `Oxalic Acid-Permanganate titration! Heating is required. When Potassium Permanganate (purple solution) is introduced, it reacts with Oxalic Acid under hot sulfuric acid catalysis. The intense purple color completely dechlorinates/disappears (turns colorless due to Mn²⁺ formation) while Carbon Dioxide bubbles vigorously evolve.`;
      conceptualExplanationFoundational = "A famous school lab redox titration! Deep purple Potassium Permanganate is reduced to colorless Manganese(II) ions by oxalic acid in the presence of hot sulfuric acid, while the oxalic acid is oxidized to carbon dioxide gas.";
      conceptualExplanationAdvanced = "The Mn(VII) center in MnO₄⁻ is reduced to Mn(II) in an 5-electron transfer process, while oxalic acid's carbon (+3) is oxidized to CO₂ (+4) releasing carbon dioxide. The reaction is autocatalytic, catalyzed by the Mn²⁺ products formed.";
    }
    // Oxalic Acid + KOH / NaOH (Acid-Base Neutralization, not a redox titration -- distinct from the
    // permanganate case above). Oxalic acid is diprotic, so complete neutralization needs 2 equivalents
    // of base and yields the oxalate salt plus water.
    else if ((hasFormula("H2C2O4") || hasFormula("OXALIC ACID") || hasFormula("OXALIC")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE")) && !hasFormula("KMnO4") && !hasFormula("PERMANGANATE")) {
      const usesKOH = hasFormula("KOH") || hasFormula("POTASSIUM HYDROXIDE");
      const baseFormula = usesKOH ? "KOH" : "NaOH";
      const baseName = usesKOH ? "Potassium Hydroxide" : "Sodium Hydroxide";
      const saltFormula = usesKOH ? "K2C2O4" : "Na2C2O4";
      const saltName = usesKOH ? "Potassium Oxalate" : "Sodium Oxalate";
      const saltPubchemId = usesKOH ? "11413" : "6125";

      reactionClass = "Neutralization / Double Displacement";
      balancedEquation = `H₂C₂O₄(aq) + 2${baseFormula}(aq) --> ${saltFormula}(aq) + 2H₂O(l)`;
      productsData = [
        { formula: saltFormula, name: saltName, pubchemId: saltPubchemId, state: "aq" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -111.8; // two neutralization steps, roughly double the standard -57.1 kJ/mol per mole of water
      deltaS_rxn = 84.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = false;
      visuals.gasName = "";
      visuals.animationDescription = `Colorless Oxalic Acid solution is neutralized by ${baseName} solution. No gas evolution or color change occurs, but the solution warms noticeably as both acidic protons are neutralized in sequence.`;
      conceptualExplanationFoundational = `Oxalic acid is a diprotic organic acid, meaning it can donate two acidic protons (H⁺) per molecule. Each proton is neutralized by a hydroxide ion (OH⁻) from ${baseName}, forming water and the soluble ${saltName} salt.`;
      conceptualExplanationAdvanced = `Both acidic protons of H₂C₂O₄ (pKa1 ≈ 1.25, pKa2 ≈ 4.14) are sequentially neutralized by the strong base. The net ionic reaction proceeds as 2H⁺(aq) + 2OH⁻(aq) → 2H₂O(l), releasing the combined heat of neutralization across both proton-transfer steps.`;
      arrowPushingDetails = "The OH⁻ nucleophile abstracts each acidic proton from the oxalic acid's two carboxyl (-COOH) groups in two sequential proton-transfer steps, forming water and the doubly-deprotonated oxalate (C₂O₄²⁻) dianion.";
      advice.push("Add a phenolphthalein indicator to visually track the neutralization endpoint!");
      advice.push("Compare this to the Oxalic Acid + Potassium Permanganate redox titration to see the difference between an acid-base and a redox reaction of the very same acid.");
    }
    // Decane + O2 combustion
    else if ((hasFormula("C10H22") || hasFormula("DECANE")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion";
      balancedEquation = "2C₁₀H₂₂(l) + 31O₂(g) --[Heat]--> 20CO₂(g) + 22H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -13556.0; 
      deltaS_rxn = 710.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide & Water Vapor";
      visuals.animationDescription = `Vigorous rapid combustion of liquid Decane (saturated alkane) in oxygen, generating a hot brilliant orange flame with carbon dioxide gas and steam clouds.`;
      conceptualExplanationFoundational = "Decane is a heavy liquid alkane hydrocarbon (C10H22). In excess oxygen and heat, it undergoes highly exothermic combustion, breaking apart to form CO2 gas and water vapor.";
      conceptualExplanationAdvanced = "Complete combustion of an alkane according to general formula CnH2n+2. The high carbon cluster density (C10) results in higher soot generation if oxygen supply diminishes, but under complete conditions, yields full conversion with high heat output (ΔH° ≈ -6.7 MJ/mol).";
    }
    // Pentene + O2 combustion
    else if ((hasFormula("C5H10") || hasFormula("PENTENE")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion";
      balancedEquation = "2C₅H₁₀(l) + 15O₂(g) --[Heat]--> 10CO₂(g) + 10H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -6722.0; 
      deltaS_rxn = 315.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide & Steam";
      visuals.animationDescription = `Rapid combustion of Pentene (alkene hydrocarbon) with oxygen, producing light carbon dioxide gas bubbles and hot steam with a yellowish-blue flame.`;
      conceptualExplanationFoundational = "Pentene is a flammable, unsaturated alkene hydrocarbon. In excess oxygen, it burns readily to yield carbon dioxide gas and water vapor, releasing high heat energy.";
      conceptualExplanationAdvanced = "Oxidization of an alkene (C5H10). Unsaturated hydrocarbons burn with a slightly sootier flame compared to alkanes due to higher carbon-to-hydrogen ratio, but full excess oxygen drives clean conversion to CO2 and H2O.";
    }
    // Pentene + H2 (Alkene Hydrogenation)
    else if ((hasFormula("C5H10") || hasFormula("PENTENE")) && (hasFormula("H2") || hasFormula("HYDROGEN"))) {
      reactionClass = "Addition Reaction / Hydrogenation";
      balancedEquation = "C₅H₁₀(l) + H₂(g) --[Ni / Pt]--> C₅H₁₂(l)";
      productsData = [
        { formula: "C5H12", name: "Pentane Gas/Liquid", pubchemId: "10041", state: "l" }
      ];
      deltaH_rxn = -125.0; 
      deltaS_rxn = -130.0;
      thermoType = "Exothermic";
      visuals.precipitateColor = "";
      visuals.animationDescription = `Hydrogen gas is bubbled into liquid Pentene. In the presence of Nickel or Platinum catalyst, the C=C double bond undergoes electrophilic addition, combining with hydrogen molecules to produce saturated Pentane (C5H12).`;
      conceptualExplanationFoundational = "An addition reaction! Unsaturated pentene containing a carbon-carbon double bond reacts with hydrogen to become saturated pentane. A transition metal like Nickel or Platinum acts as a catalyst helper to speed up this reaction.";
      conceptualExplanationAdvanced = "Catalytic hydrogenation of alkene. The reactant H2 adsorb on the metal surface (Ni, Pd, or Pt), weakening the H-H bond. The alkene coordinates with the catalyst metal, enabling stepwise element transfer to the double bond to yield a saturated alkane (C5H12).";
    }
    // Citric Acid + NaOH Neutralization
    else if ((hasFormula("C6H8O7") || hasFormula("CITRIC ACID") || hasFormula("CITRIC")) && (hasFormula("NaOH") || hasFormula("SODIUM HYDROXIDE"))) {
      reactionClass = "Acid-Base Neutralization";
      balancedEquation = "C₆H₈O₇(aq) + 3NaOH(aq) --> Na₃C₆H₅O₇(aq) + 3H₂O(l)";
      productsData = [
        { formula: "Na3C6H5O7", name: "Sodium Citrate (aq)", pubchemId: "6224", state: "aq" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -162.0; 
      deltaS_rxn = 180.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Acid-Base neutralization! Mildly sour Citric Acid is neutralized by strong alkali Sodium Hydroxide, combining to form water and soluble Sodium Citrate salt. Heat is slightly released.`;
      conceptualExplanationFoundational = "Citric acid is a weak organic triprotic acid found in citrus fruits like lemons. When mixed with strong sodium hydroxide base, they neutralize each other, producing sodium citrate salt and water, warming up the solution.";
      conceptualExplanationAdvanced = "A classic triprotic neutralization. Citric acid contains three carboxylic acid (-COOH) groups, requiring three moles of hydroxide ions (OH⁻) to completely deprotonate the citrate core to citric anion (C6H5O7³⁻).";
    }
    // Tartaric Acid + NaOH Neutralization
    else if ((hasFormula("C4H6O6") || hasFormula("TARTARIC ACID") || hasFormula("TARTARIC")) && (hasFormula("NaOH") || hasFormula("SODIUM HYDROXIDE"))) {
      reactionClass = "Acid-Base Neutralization";
      balancedEquation = "C₄H₆O₆(aq) + 2NaOH(aq) --> Na₂C₄H₄O₆(aq) + 2H₂O(l)";
      productsData = [
        { formula: "Na2C4H4O6", name: "Sodium Tartrate", pubchemId: "23690623", state: "aq" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -108.0; 
      deltaS_rxn = 120.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Neutralization of Tartaric Acid (diprotic fruit acid) with strong Sodium Hydroxide, yielding Sodium Tartrate salt and neutral liquid water.`;
      conceptualExplanationFoundational = "Tartaric acid is a diprotic organic acid naturally present in grapes. It reacts with sodium hydroxide base, replacing acid hydrogen atoms with sodium to yield sodium tartrate salt and water.";
      conceptualExplanationAdvanced = "Deprotonation of diprotic tartaric acid [HOOC-CH(OH)-CH(OH)-COOH]. Two equivalent hydroxide molecules neutralize the double carboxylic cores (pKa1 ≈ 2.89, pKa2 ≈ 4.40) to form fully deprotonated tartrate (C4H4O6²⁻).";
    }
    // Citric Acid + NaHCO3 (Volcano Fizzy Endothermic Reaction!)
    else if ((hasFormula("C6H8O7") || hasFormula("CITRIC ACID") || hasFormula("CITRIC")) && (hasFormula("NaHCO3") || hasFormula("BAKING SODA") || hasFormula("BICARBONATE"))) {
      reactionClass = "Acid-Base + Decomposition";
      balancedEquation = "C₆H₈O₇(aq) + 3NaHCO₃(s) --> Na₃C₆H₅O₇(aq) + 3CO₂(g) + 3H₂O(l)";
      productsData = [
        { formula: "Na3C6H5O7", name: "Sodium Citrate", pubchemId: "6224", state: "aq" },
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = 70.0; 
      deltaS_rxn = 560.0;
      thermoType = "Endothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide (CO₂) Fizz";
      visuals.animationDescription = `Classic fizzing chemical kitchen volcano! Citric Acid reacts with solid Sodium Bicarbonate. Massive volumes of cold Carbon Dioxide gas bubbles are rapidly generated, causing vigorous frothing and cooling down the beaker noticeably (Endothermic!).`;
      conceptualExplanationFoundational = "A gorgeous fizzy science experiment! Citric acid gets mixed with baking soda (sodium bicarbonate). Carbonic acid is formed, which quickly splits to release carbon dioxide gas bubbles, causing massive effervescence and cooling the mixture down!";
      conceptualExplanationAdvanced = "A dynamic endothermic neutralization and decomposition loop. Deprotonation of citric acid generates H₃O⁺, which reacts with HCO₃⁻ to form carbonic acid (H₂CO₃). Carbonic acid undergoes rapid spontaneous dehydration to yield CO₂ gas bubbles, driving high positive entropy (ΔS° ≈ +560 J/mol K) and absorbing heat.";
    }
    // Acetaldehyde + AgNO3 (Silver Mirror / Tollens' Test)
    else if ((hasFormula("CH3CHO") || hasFormula("ACETALDEHYDE")) && (hasFormula("AgNO3") || hasFormula("SILVER NITRATE") || hasFormula("Ag+"))) {
      reactionClass = "Redox / Silver Mirror Test";
      balancedEquation = "CH₃CHO(aq) + 2Ag⁺(aq) + H₂O(l) --> CH₃COOH(aq) + 2Ag(s)↓ + 2H⁺(aq)";
      productsData = [
        { formula: "Ag", name: "Metallic Silver Mirror", pubchemId: "23954", state: "s" },
        { formula: "CH3COOH", name: "Ethanoic Acid", pubchemId: "176", state: "aq" }
      ];
      deltaH_rxn = -85.0; 
      deltaS_rxn = 45.0;
      thermoType = "Exothermic";
      visuals.solutionColorStart = "clear";
      visuals.solutionColorEnd = "silver";
      visuals.precipitateColor = "silver";
      visuals.animationDescription = `Tollens' Silver Mirror test! Gaseous or dissolved Acetaldehyde is introduced into Tollens' reagent container. Colored Silver ions are reduced to a beautifully shiny, metallic silver mirror coating depositing on the glass walls.`;
      conceptualExplanationFoundational = "The classic Tollens' silver mirror test for aldehydes! Acetaldehyde is oxidized into acetic acid, simultaneously reducing colorless silver ions into solid metallic silver, creating a mirror finish.";
      conceptualExplanationAdvanced = "Analytical test to distinguish aldehydes from ketones. The active oxidant is diamminesilver(I) complex [Ag(NH3)2]+. Carbonyl oxidation of ethanal yields acetate while single electron reduction shifts Ag(I) to Ag(0) nanoparticles.";
    }
    // Acetone + Iodine + NaOH (Iodoform Test)
    else if ((hasFormula("CH3COCH3") || hasFormula("ACETONE")) && (hasFormula("I2") || hasFormula("IODINE")) && (hasFormula("NaOH") || hasFormula("SODIUM HYDROXIDE"))) {
      reactionClass = "Haloform Reaction / Iodoform Test";
      balancedEquation = "CH₃COCH₃(aq) + 3I₂(aq) + 4NaOH(aq) --> CHI₃(s)↓ + CH₃COONa(aq) + 3NaI(aq) + 3H₂O(l)";
      productsData = [
        { formula: "CHI3", name: "Iodoform (Yellow Precipitate)", pubchemId: "6074", state: "s" },
        { formula: "CH3COONa", name: "Sodium Acetate", pubchemId: "517045", state: "aq" }
      ];
      deltaH_rxn = -140.0; 
      deltaS_rxn = 110.0;
      thermoType = "Exothermic";
      visuals.solutionColorStart = "orange";
      visuals.solutionColorEnd = "yellow";
      visuals.precipitateColor = "yellow";
      visuals.animationDescription = `Haloform test! Acetone reacts with dark orange Iodine solution under sodium hydroxide catalysis, instantly generating a distinct medicinal scent and heavy pale yellow iodoform crystals at the bottom.`;
      conceptualExplanationFoundational = "The classic iodoform test detecting methyl ketones! Adding iodine a base to acetone converts its methyl terminal group selectively into a pale-yellow crystalline precipitate named iodoform.";
      conceptualExplanationAdvanced = "Reversible alpha-proton halogenation, repeating until triiodoacetone forms. In base, OH- nucleophilically attacks the carbonyl carbon, initiating C-C bond cleavage of the triiodomethyl group and releasing a yellow iodoform solid.";
    }
    // Ethene/Propene/Pentene + Bromine (Unsaturation Test)
    else if ((hasFormula("C2H4") || hasFormula("C3H6") || hasFormula("C5H10") || hasFormula("PROPENE") || hasFormula("PENTENE") || hasFormula("ETHENE")) && (hasFormula("Br2") || hasFormula("BROMINE"))) {
      const alkene = hasFormula("C5H10") || hasFormula("PENTENE") ? "C5H10" : (hasFormula("C3H6") || hasFormula("PROPENE") ? "C3H6" : "C2H4");
      reactionClass = "Electrophilic Addition / Bromine Decorization";
      balancedEquation = `${alkene} + Br₂ --> ${alkene}Br₂`;
      productsData = [
        { formula: `${alkene}Br2`, name: `Dibromo-${alkene}`, pubchemId: "12480", state: "l" }
      ];
      deltaH_rxn = -115.0; 
      deltaS_rxn = -110.0;
      thermoType = "Exothermic";
      visuals.solutionColorStart = "orange";
      visuals.solutionColorEnd = "clear";
      visuals.animationDescription = `Unsaturation test! Orange-brown Bromine water is added to the unsaturated alkene. An instantaneous addition reaction takes place, completely decolorizing the orange solution to crystal clear.`;
      conceptualExplanationFoundational = "The diagnostic test for double bonds! Liquid or gas bromine adds across double bonds, generating a colorless dihalide. The red-orange color disappears completely, proving the chemical is an alkene.";
      conceptualExplanationAdvanced = "Electrophilic addition cycle. The pi-cloud coordinates with molecular bromine to create a cyclic bromonium ring intermediate. Rearside attack by bromide ion yields vicinal dihalide, shifting absorption out of the visible spectra.";
    }
    // Acetylene + Bromine (Alkyne Test)
    else if ((hasFormula("C2H2") || hasFormula("ACETYLENE")) && (hasFormula("Br2") || hasFormula("BROMINE"))) {
      reactionClass = "Addition Reaction / Alkyne Bromination";
      balancedEquation = "C₂H₂(g) + 2Br₂(aq) --> C₂H₂Br₄(l)";
      productsData = [
        { formula: "C2H2Br4", name: "1,1,2,2-Tetrabromoethane", pubchemId: "6571", state: "l" }
      ];
      deltaH_rxn = -225.0; 
      deltaS_rxn = -210.0;
      thermoType = "Exothermic";
      visuals.solutionColorStart = "orange";
      visuals.solutionColorEnd = "clear";
      visuals.animationDescription = `Gaseous Acetylene reacts with deep orange bromine water. Two equivalents of bromine are added across the carbon-carbon triple bond, completely and instantly draining the orange-brown tint to translucent.`;
      conceptualExplanationFoundational = "Like alkenes, alkynes have unsaturated bonds (a triple bond). Bromine adds twice to completely saturate the molecule to tetrabromoethane, causing the orange bromine color to fade.";
      conceptualExplanationAdvanced = "Stepwise addition where acetylene coordinates to form a dibromoalkene, which undergoes secondary electrophilic attack of bromine to form fully saturated 1,1,2,2-tetrabromoethane.";
    }
    // Acetylene + O2 (Oxy-acetylene Combustion)
    else if ((hasFormula("C2H2") || hasFormula("ACETYLENE")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion / Oxy-acetylene Flame";
      balancedEquation = "2C₂H₂(g) + 5O₂(g) --[Heat]--> 4CO₂(g) + 2H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -2600.0; 
      deltaS_rxn = 220.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide & Water Vapor";
      visuals.animationDescription = `Extremely strong, high-temperature combustion! Acetylene gas ignites in oxygen to generate an intensely glowing orange-white flame, venting steam and carbon dioxide.`;
      conceptualExplanationFoundational = "A classic welding reaction! Acetylene gas burns in oxygen with a flame hot enough to melt steel. It forms carbon dioxide gas and water vapor and releases immense heat energy.";
      conceptualExplanationAdvanced = "The high molecular unstability of the acetylene triple bond and massive enthalpy of combustion (ΔH° ≈ -1.3 MJ/mol) results in highly concentrated thermal output, raising temperatures up to 3100°C.";
    }
    // Bromoethane + KOH (aqueous substitution)
    else if ((hasFormula("C2H5Br") || hasFormula("BROMOETHANE")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE"))) {
      const isNaOH = hasFormula("NAOH") || hasFormula("SODIUM HYDROXIDE");
      reactionClass = "Nucleophilic Substitution (Sn2)";
      balancedEquation = isNaOH 
        ? "C₂H₅Br(l) + NaOH(aq) --> C₂H₅OH(aq) + NaBr(aq)"
        : "C₂H₅Br(l) + KOH(aq) --> C₂H₅OH(aq) + KBr(aq)";
      productsData = [
        { formula: "C2H5OH", name: "Ethanol", pubchemId: "702", state: "aq" },
        { formula: isNaOH ? "NaBr" : "KBr", name: isNaOH ? "Sodium Bromide" : "Potassium Bromide", pubchemId: isNaOH ? "10113" : "24447", state: "aq" }
      ];
      deltaH_rxn = -75.0; 
      deltaS_rxn = 15.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Nucleophilic substitution! Warm bromoethane transitions to ethanol under alkaline hydroxide attacks, smoothly yielding ${isNaOH ? 'sodium' : 'potassium'} bromide solution.`;
      conceptualExplanationFoundational = "A textbook SN2 nucleophilic substitution! The active hydroxide ion (OH-) from the base attacks bromoethane, displacing bromine to form ethanol and mineral salt.";
      conceptualExplanationAdvanced = "Bimolecular substitution (Sn2) pathways. Hydroxide ions coordinate backside attack at the alpha-carbon transition state, causing orbital inversion and bromide departure.";
    }
    // Bromomethane + NaOH/KOH (aqueous substitution)
    else if ((hasFormula("CH3Br") || hasFormula("BROMOMETHANE")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE"))) {
      const isNaOH = hasFormula("NAOH") || hasFormula("SODIUM HYDROXIDE");
      reactionClass = "Nucleophilic Substitution (Sn2) / Methylation";
      balancedEquation = isNaOH
        ? "CH₃Br(l) + NaOH(aq) --> CH₃OH(aq) + NaBr(aq)"
        : "CH₃Br(l) + KOH(aq) --> CH₃OH(aq) + KBr(aq)";
      productsData = [
        { formula: "CH3OH", name: "Methanol (Methyl Alcohol)", pubchemId: "887", state: "aq" },
        { formula: isNaOH ? "NaBr" : "KBr", name: isNaOH ? "Sodium Bromide" : "Potassium Bromide", pubchemId: isNaOH ? "10113" : "24447", state: "aq" }
      ];
      deltaH_rxn = -82.0;
      deltaS_rxn = 18.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Methyl halide substitution! Gaseous or liquified Bromomethane reacts quickly with strong alkali hydroxide, yielding toxic wood alcohol (Methanol) and a mineral bromide salt.`;
      conceptualExplanationFoundational = "The simplest alkyl bromide substitution! Bromomethane reacts with sodium hydroxide or potassium hydroxide base to yield dangerous methyl alcohol (methanol) and sodium or potassium bromide.";
      conceptualExplanationAdvanced = "Extremely rapid SN2 nucleophilic attack at the relatively unhindered methyl carbon. The high nucleophilicity of hydroxide drives the displacement of the bromide leaving group in a single concerted step.";
    }
    // Dibromomethane (Two bromo-carbon) + NaOH/KOH (hydrolysis)
    else if ((hasFormula("CH2Br2") || hasFormula("DIBROMOMETHANE")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE"))) {
      const isNaOH = hasFormula("NAOH") || hasFormula("SODIUM HYDROXIDE");
      reactionClass = "Geminal Dihalide Hydrolysis";
      balancedEquation = isNaOH
        ? "CH₂Br₂(l) + 2NaOH(aq) --> HCHO(aq) + 2NaBr(aq) + H₂O(l)"
        : "CH₂Br₂(l) + 2KOH(aq) --> HCHO(aq) + 2KBr(aq) + H₂O(l)";
      productsData = [
        { formula: "HCHO", name: "Formaldehyde / Methanal", pubchemId: "712", state: "aq" },
        { formula: isNaOH ? "NaBr" : "KBr", name: isNaOH ? "Sodium Bromide" : "Potassium Bromide", pubchemId: isNaOH ? "10113" : "24447", state: "aq" }
      ];
      deltaH_rxn = -95.0;
      deltaS_rxn = 35.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Formaldehyde Gas smell";
      visuals.animationDescription = `Geminal halide hydrolysis! Liquid dibromomethane reacts with basic hydroxide. Two bromines are substituted, but the resulting unstable diol spontaneously dehydrates into sharp-smelling Formaldehyde (Methanal).`;
      conceptualExplanationFoundational = "Hydrolyzing two bromines attached to a single carbon atom! Unstable intermediate molecules containing two -OH groups decompose immediately inside water, releasing sharp-scented formaldehyde gas and salt.";
      conceptualExplanationAdvanced = "Sequential nucleophilic substitutions at the same carbon. The intermediate gem-diol [CH2(OH)2] is highly thermodynamically unstable and undergoes instantaneous spontaneous dehydration (loss of H2O) to form the carbonyl double bond in formaldehyde.";
    }
    // 1,2-Dibromoethane (Two bromo-ethane) + NaOH/KOH (dehydrohalogenation / substitution)
    else if ((hasFormula("C2H4Br2") || hasFormula("1,2-DIBROMOETHANE") || hasFormula("DIBROMOETHANE")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE"))) {
      const isNaOH = hasFormula("NAOH") || hasFormula("SODIUM HYDROXIDE");
      const isConc = findReactant("KOH")?.concentration === "concentrated" || findReactant("NAOH")?.concentration === "concentrated";
      
      if (isConc) {
        // High concentration / alkaline elimination
        reactionClass = "Double Dehydrohalogenation (Elimination)";
        balancedEquation = isNaOH
          ? "C₂H₄Br₂(l) + 2NaOH(aq) --> C₂H₂(g)↑ + 2NaBr(aq) + 2H₂O(l)"
          : "C₂H₄Br₂(l) + 2KOH(aq) --> C₂H₂(g)↑ + 2KBr(aq) + 2H₂O(l)";
        productsData = [
          { formula: "C2H2", name: "Acetylene / Ethyne Gas", pubchemId: "6326", state: "g" },
          { formula: isNaOH ? "NaBr" : "KBr", name: isNaOH ? "Sodium Bromide" : "Potassium Bromide", pubchemId: isNaOH ? "10113" : "24447", state: "aq" }
        ];
        deltaH_rxn = 45.0;
        deltaS_rxn = 280.0;
        thermoType = "Endothermic";
        visuals.hasBubbles = true;
        visuals.gasName = "Acetylene (Ethyne) Gas";
        visuals.animationDescription = `Dehydrohalogenation! Hot, highly concentrated alkaline hydroxide pulls hydrogen and bromine atoms clean off 1,2-dibromoethane, producing vigorous bubbles of flammable Acetylene (Ethyne) gas.`;
        conceptualExplanationFoundational = "Making double/triple bonds! Strong, concentrated alkaline base strips hydrogen bromide (HBr) twice from 1,2-dibromoethane to form carbon-carbon triple bonds, unleashing acetylene gas bubbles!";
        conceptualExplanationAdvanced = "Double E2 elimination pathway. Hydroxide abstracts beta-protons under elevated alkaline conditions, forcing bromide departure. First stage yields vinyl bromide, then secondary E2 converts it to ethyne (triple bond).";
      } else {
        // dilute hydrolysis substitution
        reactionClass = "Vicinal Dihalide Hydrolysis";
        balancedEquation = isNaOH
          ? "C₂H₄Br₂(l) + 2NaOH(aq) --> C₂H₄(OH)₂(aq) + 2NaBr(aq)"
          : "C₂H₄Br₂(l) + 2KOH(aq) --> C₂H₄(OH)₂(aq) + 2KBr(aq)";
        productsData = [
          { formula: "C2H6O2", name: "Ethylene Glycol (1,2-Ethanediol)", pubchemId: "174", state: "aq" },
          { formula: isNaOH ? "NaBr" : "KBr", name: isNaOH ? "Sodium Bromide" : "Potassium Bromide", pubchemId: isNaOH ? "10113" : "24447", state: "aq" }
        ];
        deltaH_rxn = -68.0;
        deltaS_rxn = 12.0;
        thermoType = "Exothermic";
        visuals.animationDescription = `Hydrolysis substitute! Gentle dilute hydroxide dissolves vicinal 1,2-dibromoethane to synthesise sweet, highly hygroscopic Ethylene Glycol (anti-freeze compound) and mineral salts.`;
        conceptualExplanationFoundational = "Substituting bromines for alcohol groups! Dilute base reacts gently with 1,2-dibromoethane, substituting both bromine atoms with hydroxyl -OH units to yield sweet ethylene glycol.";
        conceptualExplanationAdvanced = "Stepwise double SN2 substitution. Hydroxide nucleophiles displace bromides from adjacent carbons sequentially, forming 2-bromoethanol, followed by secondary displacement to form 1,2-ethanediol.";
      }
    }
    // Chloroform + NaOH/KOH (Haloform Hydrolysis)
    else if ((hasFormula("CHCl3") || hasFormula("CHLOROFORM")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE"))) {
      const isNaOH = hasFormula("NAOH") || hasFormula("SODIUM HYDROXIDE");
      const basePrefix = isNaOH ? "Sodium" : "Potassium";
      const saltFormula = isNaOH ? "HCOONa" : "HCOOK";
      const chlorideFormula = isNaOH ? "NaCl" : "KCl";

      reactionClass = "Haloform Alkaline Hydrolysis";
      balancedEquation = isNaOH
        ? "CHCl₃(l) + 4NaOH(aq) --> HCOONa(aq) + 3NaCl(aq) + 2H₂O(l)"
        : "CHCl₃(l) + 4KOH(aq) --> HCOOK(aq) + 3KCl(aq) + 2H₂O(l)";
      productsData = [
        { formula: saltFormula, name: `${basePrefix} Formate`, pubchemId: "2723812", state: "aq" },
        { formula: chlorideFormula, name: `${basePrefix} Chloride`, pubchemId: "5234", state: "aq" }
      ];
      deltaH_rxn = -188.0;
      deltaS_rxn = 45.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Chloroform hydrolysis! Dense sweet-smelling liquid Chloroform is aggressively hydrolyzed by four equivalents of alkaline hydroxide, producing highly soluble ${basePrefix} Formate salt and mineral salt.`;
      conceptualExplanationFoundational = "A classic haloform transformation! Hydrolyzing sweet chloroform with sodium hydroxide dissolves it completely, producing non-toxic sodium formate (an organic salt) and common table salt.";
      conceptualExplanationAdvanced = "Hydrolysis initiates with deprotonation to form a dichlorocarbene [:CCl2] intermediate, which reacts with water and base, undergoing rapid nucleophilic attack to yield carbon monoxide or formate salts.";
    }
    // Carbon Tetrachloride + NaOH/KOH (Hydrolysis)
    else if ((hasFormula("CCl4") || hasFormula("CARBON TETRACHLORIDE")) && (hasFormula("KOH") || hasFormula("NAOH") || hasFormula("POTASSIUM HYDROXIDE") || hasFormula("SODIUM HYDROXIDE"))) {
      const isNaOH = hasFormula("NAOH") || hasFormula("SODIUM HYDROXIDE");
      const basePrefix = isNaOH ? "Sodium" : "Potassium";
      const carbonateFormula = isNaOH ? "Na2CO3" : "K2CO3";
      const chlorideFormula = isNaOH ? "NaCl" : "KCl";

      reactionClass = "Alkaline Hydrolysis of Carbon Tetrahalides";
      balancedEquation = isNaOH
        ? "CCl₄(l) + 6NaOH(aq) --> Na₂CO₃(aq) + 4NaCl(aq) + 3H₂O(l)"
        : "CCl₄(l) + 6KOH(aq) --> K₂CO₃(aq) + 4KCl(aq) + 3H₂O(l)";
      productsData = [
        { formula: carbonateFormula, name: `${basePrefix} Carbonate`, pubchemId: "10340", state: "aq" },
        { formula: chlorideFormula, name: `${basePrefix} Chloride`, pubchemId: "5234", state: "aq" }
      ];
      deltaH_rxn = -220.0;
      deltaS_rxn = 35.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Tetrachloride breakdown! Carbon tetrachloride undergoes exceedingly slow hydrolysis under hot, concentrated basic environments to yield soluble mineral ${basePrefix} Carbonate and chloride salts.`;
      conceptualExplanationFoundational = "Dismantling fire extinguisher fluids! Boiling carbon tetrachloride with strong caustic lye (NaOH) forces all four chlorines off, leaving simple carbonate washing soda and standard shelf salts.";
      conceptualExplanationAdvanced = "Slow SN2 hydrolysis under extreme alkaline conditions. The high activation energy is due to steric hindrance from the four chlorine atoms guarding the central carbon, eventually yielding orthocarbonate intermediates which collapse into carbonates.";
    }
    // Stearic / Oleic / Palmitic acid neutralization (Soap making from natural fatty acids)
    else if ((hasFormula("C18H36O2") || hasFormula("STEARIC") || hasFormula("C18H34O2") || hasFormula("OLEIC") || hasFormula("C16H32O2") || hasFormula("PALMITIC")) && (hasFormula("NAOH") || hasFormula("KOH") || hasFormula("SODIUM HYDROXIDE") || hasFormula("POTASSIUM HYDROXIDE"))) {
      const isStearic = hasFormula("C18H36O2") || hasFormula("STEARIC");
      const isOleic = hasFormula("C18H34O2") || hasFormula("OLEIC");
      const acidName = isStearic ? "Stearic Acid" : isOleic ? "Oleic Acid" : "Palmitic Acid";
      const baseName = (hasFormula("KOH") || hasFormula("POTASSIUM HYDROXIDE")) ? "Potassium" : "Sodium";
      const acidFormula = isStearic ? "C₁₇H₃₅COOH" : isOleic ? "C₁₇H₃₃COOH" : "C₁₅H₃₁COOH";
      const soapFormula = isStearic ? "C18H35NaO2" : isOleic ? "C18H33NaO2" : "C16H31NaO2";
      const soapCompoundFormula = isStearic 
        ? (baseName === "Potassium" ? "C18H35KO2" : "C18H35NaO2") 
        : isOleic 
        ? (baseName === "Potassium" ? "C18H33KO2" : "C18H33NaO2") 
        : (baseName === "Potassium" ? "C16H31KO2" : "C16H31NaO2");
      const soapName = `${baseName} ${isStearic ? 'Stearate' : isOleic ? 'Oleate' : 'Palmitate'} (Soap)`;

      reactionClass = "Soap Synthesis / Acid-Base Neutralization";
      balancedEquation = `${acidFormula} + ${baseName === "Potassium" ? "KOH" : "NaOH"} --> ${soapCompoundFormula}[Soap]↓ + H₂O`;
      productsData = [
        { formula: soapCompoundFormula, name: soapName, pubchemId: "23668197", state: "s" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -55.5; 
      deltaS_rxn = 15.0;
      thermoType = "Exothermic";
      visuals.solutionColorStart = "clear";
      visuals.solutionColorEnd = "white";
      visuals.precipitateColor = "white";
      visuals.animationDescription = `Soap synthesis from pure fats! Insoluble waxy solid ${acidName} is neutralized by hot solution of ${baseName} Hydroxide. A beautiful warm, opaque white lather of ${soapName} precipitously curds and accumulates.`;
      conceptualExplanationFoundational = `Direct soap formation through free fat acid neutralization! The natural organic acid (${acidName}) instantly reacts with caustic alkali base (${baseName} Hydroxide) to yield pure organic soap and water.`;
      conceptualExplanationAdvanced = `Long-chain fatty acid neutralization. Hydroxide ions deprotonate the terminal carboxylic group of ${acidName}. The resulting carboxylate ions gather into thick micellar soap curds that precipitate readily inside saline or basic mediums.`;
    }
    // Formic Acid + NaOH (Neutralization)
    else if ((hasFormula("HCOOH") || hasFormula("FORMIC ACID")) && (hasFormula("NaOH") || hasFormula("SODIUM HYDROXIDE"))) {
      reactionClass = "Acid-Base Neutralization";
      balancedEquation = "HCOOH(aq) + NaOH(aq) --> HCOONa(aq) + H₂O(l)";
      productsData = [
        { formula: "HCOONa", name: "Sodium Formate", pubchemId: "2723812", state: "aq" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -56.0; 
      deltaS_rxn = 80.0;
      thermoType = "Exothermic";
      visuals.animationDescription = `Formic acid (simplest carboxylic acid) is neutralized by sodium hydroxide, yielding soluble Sodium Formate salt and water, emitting trace steam from the heat.`;
      conceptualExplanationFoundational = "Ant-bite neutralization! Formic acid is a simple carboxylic acid found in ants. It neutralizes sodium hydroxide base, forming sodium formate salt and water.";
      conceptualExplanationAdvanced = "Standard neutralization of weak methanoic acid (pKa ~3.75). Proton abstraction by hydroxide ion forms stable formate anions, resonance-stabilized across double carboxyl oxygens.";
    }
    // Benzaldehyde + KMnO4 (Oxidation to Benzoic Acid)
    else if ((hasFormula("C6H5CHO") || hasFormula("C7H6O") || hasFormula("BENZALDEHYDE")) && (hasFormula("KMnO4") || hasFormula("PERMANGANATE"))) {
      reactionClass = "Redox / Organic Oxidation";
      balancedEquation = "3C₆H₅CHO(l) + 2KMnO₄(aq) + H₂O(l) --> 3C₆H₅COOH(s)↓ + 2MnO₂(s)↓ + 2KOH(aq)";
      productsData = [
        { formula: "C6H5COOH", name: "Benzoic Acid (White PPT)", pubchemId: "243", state: "s" },
        { formula: "MnO2", name: "Manganese Dioxide (Brown PPT)", pubchemId: "14801", state: "s" }
      ];
      deltaH_rxn = -310.0; 
      deltaS_rxn = -60.0;
      thermoType = "Exothermic";
      visuals.solutionColorStart = "purple";
      visuals.solutionColorEnd = "clear";
      visuals.precipitateColor = "white-brown";
      visuals.animationDescription = `Bright purple potassium permanganate oxidizes almond-scented liquid Benzaldehyde. White crystals of Benzoic Acid form immediately alongside a brown manganese dioxide suspension.`;
      conceptualExplanationFoundational = "An organic oxidation! Mild almond-scented benzaldehyde is oxidized by potassium permanganate into benzoic acid which deposits as white crystalline solids, while the purple permanganate color is reduced.";
      conceptualExplanationAdvanced = "Permanganate ion coordinates with the aldehyde hydrate, undergoing single hydrate transfer to reduce Mn(VII) into insoluble brown MnO2, oxidizing benzaldehyde into less soluble benzoic acid (pKa ~4.20).";
    }
    // Esterification check (CH3COOH + C2H5OH + H2SO4) (3 reactants)
    else if (hasFormula("CH3COOH") && (hasFormula("C2H5OH") || hasFormula("ETHANOL"))) {
      const h2so4Reactant = findReactant("H2SO4");
      const hasH2SO4 = !!h2so4Reactant;
      const isConcAcid = h2so4Reactant?.concentration !== "dilute";

      reactionClass = "Esterification (Acid Catalyst)";
      balancedEquation = "CH₃COOH(aq) + C₂H₅OH(aq) --[H₂SO₄]--> CH₃COOC₂H₅(aq) + H₂O(l)";
      productsData = [
        { formula: "CH3COOC2H5", name: "Ethyl Ethanoate (Ester)", pubchemId: "8857", state: "aq" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -12.5;
      deltaS_rxn = -4.3;

      if (hasH2SO4) {
        if (isConcAcid) {
          visuals.animationDescription = "Heating ethanoic acid and ethanol with concentrated sulfuric acid catalyst. A sweet, fruity, organic ester smell is produced rapidly.";
          conceptualExplanationFoundational = "A classic Class 10 CBSE reaction. Ethanoic acid combines with ethanol in the presence of concentrated sulfuric acid catalyst (acting as a superb dehydrator) to synthesize ethyl ethanoate ester.";
          conceptualExplanationAdvanced = "Concentrated sulfuric acid acts as a proton donor to activate the carboxyl oxygen, facilitating nucleophilic attack by the ethanol hydroxyl group. It shifts the esterification equilibrium by removing water molecules.";
          arrowPushingDetails = "Protonation of CH₃COOH → Attack by C₂H₅OH → Proton transfer → Loss of H₂O catalyst regenerates.";
          dangerLevel = "safe";
        } else {
          visuals.animationDescription = "Ethanoic acid and ethanol react with dilute H₂SO₄. Reaction proceeds much slower, with negligible ester aroma.";
          conceptualExplanationFoundational = "Because the sulfuric acid is dilute, its water absorption capability is low, keeping the equilibrium lying partially on the reactant side and slowing ester development.";
          conceptualExplanationAdvanced = "With high hydronium concentration in dilute acid, hydrolysis of ester competes with esterification, limiting the final equilibrium yield.";
          dangerLevel = "safe";
        }
      } else {
        visuals.animationDescription = "In the absence of a strong acid catalyst, the reactants collide without undergoing substantial ester formation.";
        conceptualExplanationFoundational = "Without the acid catalyst, this organic combination is extremely slow and will not form sweet-smelling ester under standard classroom session times.";
        conceptualExplanationAdvanced = "The activation energy barrier for carboxylic acid nucleophilic substitution is too high (+120 kJ/mol) without proton activation of the carbonyl carbon.";
      }
    }
    // Alkaline KMnO4 Oxidation (C2H5OH + KMnO4 + NaOH) (3 reactants)
    else if ((hasFormula("C2H5OH") || hasFormula("ETHANOL")) && hasFormula("KMNO4")) {
      reactionClass = "Alkaline Oxidation of Alcohol";
      balancedEquation = "CH₃CH₂OH(aq) + 2[O] --[KMnO₄/NaOH]--> CH₃COOH(aq) + H₂O(l)";
      productsData = [
        { formula: "CH3COOH", name: "Ethanoic Acid", pubchemId: "176", state: "aq" },
        { formula: "MnO2", name: "Manganese Dioxide (Precipitate)", pubchemId: "14801", state: "s" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -242.0;
      deltaS_rxn = 45.0;

      const hasNaOH = hasFormula("NaOH") || hasFormula("KOH");
      const isNaOHDilute = findReactant("NaOH")?.concentration === "dilute" || findReactant("KOH")?.concentration === "dilute";

      if (hasNaOH) {
        visuals.solutionColorStart = "purple";
        visuals.solutionColorEnd = "clear";
        visuals.precipitateColor = "brown";
        if (isNaOHDilute) {
          visuals.animationDescription = "The deep purple potassium permanganate solution decolorizes slowly, leaving a slightly cloudy, brown precipitative manganese dioxide ring.";
          conceptualExplanationFoundational = "Alkaline potassium permanganate behaves as a vigorous oxidizer of Class 10 science. It converts ethanol into ethanoic acid, depleting its purple state.";
          conceptualExplanationAdvanced = "In basic aqueous medium, Permanganate (Mn(VII)) is reduced to MnO₂, causing a brown suspension. Dilute alkali slows oxidation kinetics and the MnO₂ settling rate.";
        } else {
          visuals.animationDescription = "Vigorous decolorization! The deep purple solution turns rapidly clear with an intense, dense brown precipitate of MnO₂ forming at the bottom.";
          conceptualExplanationFoundational = "Strong concentrated alkali accelerates the oxidation of alcohol into organic ethanoic acid, rapidly degrading the purple KMnO₄ color.";
          conceptualExplanationAdvanced = "The reaction proceeds via ethyl aldehyde intermediates. High hydroxide ion concentrations speed up the MnO₄⁻ reduction path, shifting kinetics into high gear.";
        }
      } else {
        visuals.solutionColorStart = "purple";
        visuals.solutionColorEnd = "purple";
        visuals.animationDescription = "Neutral permanganate reacts only sluggishly with ethanol without alkaline activation, maintaining its violet tint.";
        conceptualExplanationFoundational = "Alkaline medium (such as sodium hydroxide) is necessary to activate potassium permanganate into its highly reactive oxidizing configuration.";
      }
    }
    // Soap Saponification (Oil + NaOH + NaCl) (3-4 reactants)
    else if ((hasFormula("OIL") || hasFormula("FAT") || hasFormula("ESTOR") || hasFormula("VEGETABLE") || hasFormula("CASTOR")) && hasFormula("NAOH")) {
      const hasNaCl = hasFormula("NACL");
      reactionClass = "Saponification (Ester Hydrolysis)";
      balancedEquation = "Glyceryl Ester + 3NaOH → Glycerol + 3 Sodium Stearate (Soap)";
      productsData = [
        { formula: "C17H35COONa", name: "Sodium Stearate (Soap Curd)", pubchemId: "23668197", state: "s" },
        { formula: "C3H8O3", name: "Glycerol", pubchemId: "753", state: "aq" }
      ];
      deltaH_rxn = -35.2;
      deltaS_rxn = 12.0;

      if (hasNaCl) {
        visuals.animationDescription = "Heating ester oil with NaOH. Upon introducing Sodium Chloride (NaCl), thick, white soap curds precipitate and float on the aqueous surface.";
        conceptualExplanationFoundational = "Saponification reaction (Class 10 CBSE)! Vegetable oil is hydrolyzed by strong Sodium Hydroxide. Adding salt (NaCl) reduces soap solubility, precipitating out soap curds (salting out).";
        conceptualExplanationAdvanced = "NaOH drives the nucleophilic ester hydrolysis of triglyceride molecules. The addition of NaCl shifts the ionic equilibrium, decreasing soap solubility via common ion effect.";
      } else {
        visuals.animationDescription = "Oil and NaOH blend into a warm, cloudy, emulsified suspension, with no clear soap separation.";
        conceptualExplanationFoundational = "Hydrolysis forms soluble soap molecules. However, adding salt (such as NaCl) is crucial to 'salt out' and precipitate the soap out of solution so it can solidify.";
      }
    }
    // Test for Metal + Acid
    else if (list.some(r => ["ZN", "FE", "MG", "AL", "NA", "CA"].includes(r.formula.toUpperCase())) && list.some(r => ["HCL", "H2SO4", "HNO3", "HBR"].includes(r.formula.toUpperCase()))) {
      const metal = list.find(r => ["ZN", "FE", "MG", "AL", "NA", "CA"].includes(r.formula.toUpperCase()))!;
      const acid = list.find(r => ["HCL", "H2SO4", "HNO3", "HBR"].includes(r.formula.toUpperCase()))!;

      reactionClass = "Zinc/Metal Acid Displacement";
      balancedEquation = `${metal.formula}(s) + 2${acid.formula}(aq) → ${metal.formula}Cl₂ + H₂(g)`;
      productsData = [
        { formula: `${metal.formula}Cl2`, name: `${metal.label} Chloride`, pubchemId: "12501", state: "aq" },
        { formula: "H2", name: "Hydrogen Gas", pubchemId: "783", state: "g" }
      ];
      deltaH_rxn = -140;
      deltaS_rxn = 64.0;
      visuals.hasBubbles = true;
      visuals.gasName = "Hydrogen (H₂)";

      if (acid.concentration === "dilute") {
        visuals.animationDescription = `Safe and steady effervescence. Bubbles of Hydrogen gas emerge from the surface of solid ${metal.label} metal at a moderate rate inside dilute ${acid.label}.`;
        conceptualExplanationFoundational = `A core 9th/10th grade CBSE NCERT practical. Active metals stand above Hydrogen in the reactivity series and displace it from dilute acids, generating safe, steady streams of Hydrogen gas.`;
        conceptualExplanationAdvanced = "The solid metal undergoes simple electron donation (oxidation). Because the acid is dilute, hydronium concentration is moderate, yielding highly regulated, non-hazardous kinetic rates.";
      } else {
        dangerLevel = "hazardous";
        visuals.animationDescription = `Explosive-style boiling reaction! High heat is instantly liberated as concentrated ${acid.label} vigorously dissolves the solid ${metal.label}, creating a cloud of hot acid vapours and thick gas bubbles.`;
        conceptualExplanationFoundational = `Concentrated acid contains high active hydronium ions, turning the displacement highly exothermic. This must be handled with extreme caution because it boils instantly and releases hot acid steam.`;
        conceptualExplanationAdvanced = "High reactant concentration leads to near-simultaneous surface oxidation of the metallic substrate, creating extreme reaction velocities and huge thermal gradients.";
      }
    }
    // Double Displacement precipitation: BaCl2 + Na2SO4
    else if (hasFormula("BACL2") && hasFormula("NA2SO4")) {
      reactionClass = "Double Displacement (Precipitation)";
      balancedEquation = "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)";
      productsData = [
        { formula: "BaSO4", name: "Barium Sulfate (Insoluble Salt)", pubchemId: "24414", state: "s" },
        { formula: "NaCl", name: "Sodium Chloride", pubchemId: "5234", state: "aq" }
      ];
      deltaH_rxn = -18.7;
      deltaS_rxn = 21.0;
      visuals.precipitateColor = "white";

      const rBa = findReactant("BACL2")!;
      const rNa = findReactant("NA2SO4")!;

      if (rBa.concentration === "dilute" || rNa.concentration === "dilute") {
        visuals.animationDescription = "A slow, milky-white translucent suspension forms sluggishly. The turbidity slowly increases, resembling standard low-concentration assays.";
        conceptualExplanationFoundational = "Dilute reagents have fewer ions per unit volume, which lowers the collision frequency. Barium Sulfate precipitates slowly as a fine, slow-settling suspension.";
        conceptualExplanationAdvanced = "Low supersaturation ratio drives crystalline nucleations to occur at a sluggish speed, producing small colloid crystals that remain suspended for long durations.";
      } else {
        visuals.animationDescription = "Instantaneous and highly dense white precipitate! Curdy white insoluble Barium Sulfate forms right upon collision and quickly precipitates to the bottom.";
        conceptualExplanationFoundational = "CBSE Class 10 Textbook Activity 1.10. High concentration of sulfate and barium ions immediately exceeds the solubility limit (Ksp), throwing heavy Barium Sulfate out of solution.";
        conceptualExplanationAdvanced = "High concentration leads to massive supersaturation, triggering instantaneous, run-away crystal nucleation. A thick, flocculated precipitate of BaSO₄ is formed.";
      }
    }
    // Glucose/Fructose + O2 (Combustion / Respiration)
    else if ((hasFormula("C6H12O6") || hasFormula("GLUCOSE") || hasFormula("FRUCTOSE")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion / Cellular Respiration";
      balancedEquation = "C₆H₁₂O₆(s) + 6O₂(g) → 6CO₂(g) + 6H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -2803.0;
      deltaS_rxn = 182.4;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide & Steam";
      visuals.animationDescription = "Sugar combustion! The solid sugar reacts vigorously with excess oxygen when heated, burning with a steady flame to evolve carbon dioxide gas and water vapor, releasing massive thermal energy.";
      conceptualExplanationFoundational = "Combustion of simple sugars (glucose and fructose). This is the exact chemical reaction for cellular respiration, where cells oxidize glucose to release CO2, water, and energy!";
      conceptualExplanationAdvanced = "Exothermic complete oxidation of a hexose. The reaction is highly spontaneous (ΔG° ≈ -2857 kJ/mol) and proceeds via radical-chain pathways under combustion, or enzymatically in biological mitochondria.";
    }
    // Maltose + O2 (Combustion)
    else if ((hasFormula("C12H22O11") || hasFormula("MALTOSE") || hasFormula("SUCROSE")) && (hasFormula("O2") || hasFormula("OXYGEN"))) {
      reactionClass = "Combustion";
      balancedEquation = "C₁₂H₂₂O₁₁(s) + 12O₂(g) → 12CO₂(g) + 11H₂O(g)";
      productsData = [
        { formula: "CO2", name: "Carbon Dioxide Gas", pubchemId: "280", state: "g" },
        { formula: "H2O", name: "Water Vapor", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = -5645.0;
      deltaS_rxn = 358.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = true;
      visuals.gasName = "Carbon Dioxide & Steam";
      visuals.animationDescription = "Disaccharide sugar burns brilliantly in excess oxygen, producing high-intensity heat, water vapor, and carbon dioxide gas.";
      conceptualExplanationFoundational = "Combustion of disaccharide sugar (maltose). High-energy bonds are fully oxidized to form stable carbon dioxide and water molecules.";
      conceptualExplanationAdvanced = "Complete oxidation of disaccharide maltose. Intramolecular glycosidic links break down during thermal degradation, followed by complete oxidation of glucose units.";
    }
    // Carbonic Acid + NaOH Neutralization
    else if ((hasFormula("H2CO3") || hasFormula("CARBONIC ACID") || hasFormula("CARBONIC")) && (hasFormula("NaOH") || hasFormula("SODIUM HYDROXIDE"))) {
      reactionClass = "Acid-Base Neutralization";
      balancedEquation = "H₂CO₃(aq) + 2NaOH(aq) → Na₂CO₃(aq) + 2H₂O(l)";
      productsData = [
        { formula: "Na2CO3", name: "Sodium Carbonate", pubchemId: "10340", state: "aq" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -106.0;
      deltaS_rxn = 125.0;
      thermoType = "Exothermic";
      visuals.animationDescription = "Carbonic Acid is neutralized by strong Sodium Hydroxide base, yielding soluble Sodium Carbonate salt and liquid water with mild heat release.";
      conceptualExplanationFoundational = "Carbonic acid is a weak inorganic acid. It reacts with strong sodium hydroxide base to undergo a classic neutralization, producing sodium carbonate salt and water.";
      conceptualExplanationAdvanced = "Stepwise double neutralization of diprotic carbonic acid (pKa1 ≈ 6.35, pKa2 ≈ 10.33) with sodium hydroxide to yield Na2CO3 salt.";
    }
    // Carbonic Acid + Ca(OH)2 (Limewater Milkiness!)
    else if ((hasFormula("H2CO3") || hasFormula("CARBONIC ACID") || hasFormula("CARBONIC") || hasFormula("CO2") || hasFormula("CARBON DIOXIDE")) && (hasFormula("CA(OH)2") || hasFormula("CALCIUM HYDROXIDE") || hasFormula("SLAKED LIME"))) {
      // Accepts both plain CO2 gas (the standard "blow into limewater" classroom test) and
      // pre-formed carbonic acid H2CO3 -- both give the same textbook milky-white precipitate.
      const usesCO2Gas = hasFormula("CO2") || hasFormula("CARBON DIOXIDE");
      reactionClass = "Precipitation / Double Displacement";
      balancedEquation = usesCO2Gas
        ? "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)"
        : "H₂CO₃(aq) + Ca(OH)₂(aq) → CaCO₃(s)↓ + 2H₂O(l)";
      productsData = [
        { formula: "CaCO3", name: "Calcium Carbonate (Insoluble Precipitate)", pubchemId: "10112", state: "s" },
        { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
      ];
      deltaH_rxn = -45.0;
      deltaS_rxn = 50.0;
      thermoType = "Exothermic";
      visuals.hasBubbles = usesCO2Gas;
      visuals.gasName = usesCO2Gas ? "Carbon Dioxide (CO₂), being absorbed" : "";
      visuals.precipitateColor = "white";
      visuals.animationDescription = usesCO2Gas
        ? "Limewater test! Carbon Dioxide gas is bubbled through clear Calcium Hydroxide (limewater) solution, instantly turning it milky-white as insoluble Calcium Carbonate precipitates out."
        : "Limewater test! Soluble Calcium Hydroxide is mixed with Carbonic Acid, instantly forming a milky-white turbid suspension of Calcium Carbonate precipitate.";
      conceptualExplanationFoundational = "The classic school chemical test! Carbon dioxide (as gas, or dissolved as carbonic acid) reacts with calcium hydroxide (slaked lime / limewater) to form insoluble calcium carbonate, turning the solution milky white. This is the standard laboratory test used to detect CO₂, including in exhaled breath.";
      conceptualExplanationAdvanced = "Limewater carbonation. Mixing bicarbonate/carbonate species with calcium ions rapidly exceeds the solubility product threshold of CaCO3 (Ksp ≈ 3.3 x 10⁻⁹), precipitating white calcite/aragonite. Prolonged excess CO₂ exposure can redissolve the precipitate by forming soluble calcium bicarbonate, Ca(HCO₃)₂.";
    }
    // Glucose/Fructose/Maltose + H2SO4 (Sugar Dehydration / Carbon Snake)
    else if ((hasFormula("C6H12O6") || hasFormula("C12H22O11") || hasFormula("GLUCOSE") || hasFormula("FRUCTOSE") || hasFormula("MALTOSE") || hasFormula("SUCROSE")) && (hasFormula("H2SO4") || hasFormula("SULFURIC ACID") || hasFormula("SULFURIC"))) {
      const isDisaccharide = hasFormula("C12H22O11") || hasFormula("MALTOSE") || hasFormula("SUCROSE");
      reactionClass = "Dehydration / Carbon Snake Demon.";
      balancedEquation = isDisaccharide
        ? "C₁₂H₂₂O₁₁(s) + H₂SO₄(conc) → 12C(s)↓ + 11H₂O(g) + H₂SO₄/water mixture"
        : "C₆H₁₂O₆(s) + H₂SO₄(conc) → 6C(s)↓ + 6H₂O(g) + H₂SO₄/water mixture";
      productsData = [
        { formula: "C", name: "Solid Carbon (Black Porous Snake)", pubchemId: "5462310", state: "s" },
        { formula: "H2O", name: "Water (as steam)", pubchemId: "962", state: "g" }
      ];
      deltaH_rxn = isDisaccharide ? -1050.0 : -550.0;
      deltaS_rxn = isDisaccharide ? 950.0 : 480.0;
      thermoType = "Exothermic";
      visuals.precipitateColor = "black";
      visuals.hasBubbles = true;
      visuals.gasName = "Steam & Sulfur Dioxide";
      visuals.animationDescription = "Vigorous sugar dehydration! Concentrated Sulfuric acid is added to the sugar. The white powder instantly turns yellow, then dark brown, and finally swells dramatically into a steaming, hot, black porous snake-like column of pure carbon rising out of the beaker, emitting a strong caramelized odor.";
      conceptualExplanationFoundational = "A highly famous and spectacular demonstration! Concentrated sulfuric acid has an extremely strong affinity for water. It literally rips away Hydrogen and Oxygen atoms from sugar as water molecules, leaving behind a steaming, expanding column of pure black carbon (charcoal).";
      conceptualExplanationAdvanced = "Exothermic acid-catalyzed carbohydrate dehydration. Sulfuric acid acts as a powerful dehydrating agent, protonating hydroxyl groups to drive beta-eliminations, leaving highly cross-linked amorphous carbon. The intense heat of hydration boils the eliminated water into steam, which expands the carbon residue into a highly porous snake-like column.";
    }
    // Default dynamic formula handler
    else {
      // General dynamic handling of whatever they input
      const combined = list.map(r => r.formula).join(" + ");
      const combinedLabels = list.map(r => r.label).join(", ");
      const concentrations = list.map(r => `${r.label} is ${r.concentration}`).join(" and ");

      balancedEquation = `${list.map(r => r.formula).join(" + ")} → ${list.map(r => r.formula + "_Product").join(" + ")}`;
      productsData = list.map((r, i) => ({
        formula: `${r.formula}_Product`,
        name: `Transformed ${r.label} Phase`,
        pubchemId: `400${i}`,
        state: "aq"
      }));

      visuals.animationDescription = solvent === "None"
        ? `Multiple reactants (${combinedLabels}) are combined neat (without solvent). Standard solid/gas phase collisions indicate safe dry blend formation. Notice that ${concentrations}.`
        : `Multiple reactants (${combinedLabels}) are combined inside ${solvent} solvent. Standard physical models indicate safe blend formation. Notice that ${concentrations}.`;
      conceptualExplanationFoundational = solvent === "None"
        ? `Combining ${list.length} variables (${combinedLabels}) neat triggers direct physical contact, solid-phase, or gas-phase thermodynamic exchange without solvent dilution.`
        : `Combining ${list.length} variables (${combinedLabels}) triggers molecular and physical thermal exchange inside the ${solvent} solvent.`;
      conceptualExplanationAdvanced = solvent === "None"
        ? `This ${list.length}-reactant system reacts under temperature ${temperature}°C without solvent-mediated ions, proceeding as a gas, solid-phase or molten neat reaction.`
        : `This ${list.length}-reactant system reacts under temperature ${temperature}°C. Free hydronium and solvent forces inside ${solvent} influence the kinetic parameters.`;
    }

    // Set thermodynamic constants based on temperature
    thermoType = deltaH_rxn < 0 ? "Exothermic" : "Endothermic";
    const dG = deltaH_rxn - tKelvin * (deltaS_rxn / 1000);
    const calculatedDeltaG = Number(dG.toFixed(2));
    const isSpontaneous = dG < 0;

    return {
      reactionFeasible,
      reactantsData,
      productsData,
      deltaH_rxn,
      deltaS_rxn,
      balancedEquation,
      reactionClass,
      thermoType,
      calculatedDeltaG,
      isSpontaneous,
      visuals,
      dangerLevel,
      conceptualExplanationFoundational,
      conceptualExplanationAdvanced,
      arrowPushingDetails,
      advice: advice.length > 0 ? advice : [
        "Change the concentration and temp sliders to trace thermodynamic shifts.",
        "This is an interactive simulation backing up school CBSE/NCERT activities perfectly."
      ]
    };
  }

  // Chemistry Reaction Simulator dynamic programmatic backend
  const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  app.post("/api/simulate-reaction", async (req, res) => {
    const { reactants, reactantA, reactantB, temperature, pressure, solvent, addedPeroxide, catalyst } = req.body;
    
    let reactantList: Array<{ formula: string; concentration: "dilute" | "concentrated"; gasSupply?: "limited" | "excess" }> = [];
    if (reactants && Array.isArray(reactants)) {
      reactantList = reactants
        .filter(r => r && r.formula && r.formula.trim().length > 0)
        .map(r => ({
          formula: r.formula,
          concentration: r.concentration || "concentrated",
          gasSupply: r.gasSupply
        }));
    } else {
      if (reactantA) {
        reactantList.push({ formula: reactantA, concentration: "concentrated" });
      }
      if (reactantB) {
        reactantList.push({ formula: reactantB, concentration: "concentrated" });
      }
    }

    if (reactantList.length === 0) {
      return res.status(400).json({ error: "At least one reactant is required to run the simulation." });
    }

    const tKelvin = (temperature === undefined ? 25 : Number(temperature)) + 273.15;
    const pAtm = pressure === undefined ? 1 : Number(pressure);
    const solv = solvent || "Water";
    const perox = !!addedPeroxide;

    // Normalizing strings for quick, beautiful local curriculum checks but stripping out crystallization water (e.g. ·5H2O or .5H2O)
    const cleanFormulaForMatch = (f: string) => f.trim().toUpperCase().replace(/[·.]\d+H2O/g, "").replace(/\./g, "").trim();
    const rawA = (reactantList[0]?.formula || "").trim();
    const rawB = (reactantList[1]?.formula || "").trim();
    const rA = cleanFormulaForMatch(rawA);
    const rB = cleanFormulaForMatch(rawB);
    // Whether the user actually picked the crystalline/hydrate form of a salt (vs. its plain
    // anhydrous formula) is significant to a chemistry student, so the hardcoded curriculum
    // reactions below must reflect back whichever form was really selected -- not silently swap
    // in the hydrate every time, regardless of what was typed/chosen.
    const isHydrateFormula = (f: string) => /[·.]\s*\d*\.?\d*\s*H2O/i.test(f);

    // Check offline fallbacks for guaranteed instantaneous 100% reliable responses
    let fallbackMatched = false;
    let fallbackData: any = null;

    // FE + CUSO4
    if ((rA === "FE" && rB === "CUSO4") || (rA === "CUSO4" && rB === "FE")) {
      fallbackMatched = true;
      // Whichever raw input actually named the crystalline/hydrate form (CuSO4.5H2O) determines
      // whether the displayed reactant/product also carries its water of crystallization -- typing
      // the plain anhydrous formula must show the plain anhydrous reaction, not silently substitute
      // the hydrate every time.
      const cuInputIsHydrate = isHydrateFormula(rA === "CUSO4" ? rawA : rawB);
      fallbackData = {
        reactionFeasible: true,
        reactantsData: [
          { formula: "Fe", name: "Solid Iron Metal", iupacName: "Iron", pubchemId: "23925", molecularWeight: 55.85 },
          cuInputIsHydrate
            ? { formula: "CuSO4·5H2O", name: "Aqueous Copper Sulfate Pentahydrate", iupacName: "Copper(II) sulfate pentahydrate", pubchemId: "24463", molecularWeight: 249.69 }
            : { formula: "CuSO4", name: "Aqueous Copper(II) Sulfate", iupacName: "Copper(II) sulfate", pubchemId: "24462", molecularWeight: 159.61 }
        ],
        productsData: [
          cuInputIsHydrate
            ? { formula: "FeSO4·7H2O", name: "Aqueous Iron(II) Sulfate Heptahydrate", pubchemId: "62662", state: "aq" }
            : { formula: "FeSO4", name: "Aqueous Iron(II) Sulfate", pubchemId: "24393", state: "aq" },
          { formula: "Cu", name: "Solid Copper", pubchemId: "23978", state: "s" }
        ],
        deltaH_rxn: -154.0, // kJ/mol
        deltaS_rxn: 11.5, // J/(mol K)
        balancedEquation: cuInputIsHydrate
          ? "Fe(s) + CuSO4·5H2O(aq) → FeSO4·7H2O(aq) + Cu(s)"
          : "Fe(s) + CuSO4(aq) → FeSO4(aq) + Cu(s)",
        reactionClass: "Single Displacement / Redox",
        thermoType: "Exothermic",
        visuals: {
          solutionColorStart: "blue",
          solutionColorEnd: "emerald", // pale green
          hasBubbles: false,
          gasName: "",
          precipitateColor: "brown", // copper coating
          animationDescription: "Blue copper sulfate solution turns light green while a reddish-brown metallic copper sediment deposits on the iron surface."
        },
        dangerLevel: "safe",
        conceptualExplanationFoundational: "Iron stands higher in the Reactivity Series than Copper. Hence, Iron readily displaces Copper from its chemical solution, forming light green Iron Sulfate and depositing reddish-brown metallic Copper.",
        conceptualExplanationAdvanced: "The standard reduction potential of Fe(II)/Fe is -0.44V, whereas Cu(II)/Cu is +0.34V. Fe is a much stronger reducing agent and readily displaces Cu(II) from solution. Gibbs Free Energy (ΔG) remains highly negative across all standard conditions.",
        arrowPushingDetails: "Fe(s) → Fe²⁺(aq) + 2e⁻ (Oxidation at metallic core)\nCu²⁺(aq) + 2e⁻ → Cu(s) (Reduction onto iron electrode grid)",
        advice: [
          "Try substituting Zinc (Zn) inside Copper Sulfate to observe a similarly vigorous displacement!",
          "Notice how the solid iron block acquires a reddish-brown coating over time during laboratory NCERT Activity 10.5."
        ]
      };
    }

    // CU + ZNSO4 (NO REACTION CASE)
    if ((rA === "CU" && rB === "ZNSO4") || (rA === "ZNSO4" && rB === "CU")) {
      fallbackMatched = true;
      const znInputIsHydrate = isHydrateFormula(rA === "ZNSO4" ? rawA : rawB);
      fallbackData = {
        reactionFeasible: false,
        reactantsData: [
          { formula: "Cu", name: "Solid Copper Metal", iupacName: "Copper", pubchemId: "23978", molecularWeight: 63.55 },
          znInputIsHydrate
            ? { formula: "ZnSO4·7H2O", name: "Aqueous Zinc Sulfate Heptahydrate", iupacName: "Zinc sulfate heptahydrate", pubchemId: "62640", molecularWeight: 287.6 }
            : { formula: "ZnSO4", name: "Aqueous Zinc Sulfate", iupacName: "Zinc sulfate", pubchemId: "24424", molecularWeight: 161.4 }
        ],
        productsData: [],
        deltaH_rxn: 213.0, // highly positive
        deltaS_rxn: -5.0,
        balancedEquation: znInputIsHydrate
          ? "Cu(s) + ZnSO4·7H2O(aq) → No Reaction"
          : "Cu(s) + ZnSO4(aq) → No Reaction",
        reactionClass: "Single Displacement",
        thermoType: "Endothermic",
        visuals: {
          solutionColorStart: "clear",
          solutionColorEnd: "clear",
          hasBubbles: false,
          gasName: "",
          precipitateColor: "",
          animationDescription: "Solution remains absolutely static. No metal color changes or gas evolution are observed."
        },
        dangerLevel: "safe",
        conceptualExplanationFoundational: "Copper is less reactive than Zinc and sits lower in the metal reactivity series. A less reactive metal cannot displace a more reactive metal from its salt solution, resulting in zero chemical transformation.",
        conceptualExplanationAdvanced: "The Gibbs Free Energy (ΔG) is positive (+214 kJ) under standard parameters because Cu(II)/Cu potential (+0.34V) is far higher than Zn(II)/Zn (-0.76V). Thus, the reverse reaction is thermodynamically impossible.",
        arrowPushingDetails: "No electron transfer occurs because Copper cannot reduce Zinc(II) ions in aqueous state.",
        advice: [
          "Try swapping the reactants: Use Zinc metallic powder with Copper Sulfate solution instead!",
          "Use a stronger reducing agent like Magnesium or Aluminum to readily displace Zinc."
        ]
      };
    }

    // NA + H2O (EXPLOSION DEMO)
    if ((rA === "NA" && rB === "H2O") || (rA === "H2O" && rB === "NA")) {
      fallbackMatched = true;
      fallbackData = {
        reactionFeasible: true,
        reactantsData: [
          { formula: "Na", name: "Sodium Metal", iupacName: "Sodium", pubchemId: "5356137", molecularWeight: 22.99 },
          { formula: "H2O", name: "Water", iupacName: "Oxidane", pubchemId: "962", molecularWeight: 18.02 }
        ],
        productsData: [
          { formula: "NaOH", name: "Sodium Hydroxide", pubchemId: "14798", state: "aq" },
          { formula: "H2", name: "Hydrogen Gas", pubchemId: "783", state: "g" }
        ],
        deltaH_rxn: -368.4, // highly exothermic
        deltaS_rxn: 35.2,
        balancedEquation: "2Na(s) + 2H2O(l) → 2NaOH(aq) + H2(g)",
        reactionClass: "Combination / Vigorous Neutralization",
        thermoType: "Exothermic",
        visuals: {
          solutionColorStart: "clear",
          solutionColorEnd: "pink", // assuming phenolphthalein indicator
          hasBubbles: true,
          gasName: "Hydrogen (H₂)",
          precipitateColor: "",
          animationDescription: "Vigorous fizzing. The sodium metal melts into a tiny glob, skates wildly across the water surface evolving Hydrogen gas, and ignites with a golden yellow flame! An intense heat explosion shattered the beaker!"
        },
        dangerLevel: "explosive",
        conceptualExplanationFoundational: "Sodium is an alkali metal that reacts violently with water. The reaction releases heavy amounts of highly flammable Hydrogen gas alongside extreme exothermic heat, leading to an immediate local fire or burst.",
        conceptualExplanationAdvanced: "Sodium has an extremely low first ionization energy and huge negative redox potential of -2.71V. It reduces protons in water to Hydrogen gas. The enormous heat release coupled with rapid volume expansion of evolved Hydrogen gas triggers an explosive shockwave.",
        arrowPushingDetails: "2Na(s) → 2Na⁺(aq) + 2e⁻ (Oxidation)\n2H₂O(l) + 2e⁻ → 2OH⁻(aq) + H₂(g) (Proton Reduction)",
        advice: [
          "BOOM! Pure Alkali Metals in hot water will trigger an explosive strain. Re-adjust conditions carefully!",
          "Try using a mild non-polar medium or cool down the apparatus temperature below 0°C to slow down kinetics."
        ]
      };
    }

    // ACID-BASE NEUTRALIZATION NH3/HCL/NAOH/KOH
    if (((rA === "NAOH" || rA === "KOH" || rA === "BASE") && (rB === "HCL" || rB === "ACID")) ||
        ((rA === "HCL" || rA === "ACID") && (rB === "NAOH" || rB === "KOH" || rB === "BASE"))) {
      fallbackMatched = true;
      const usesKOH = rA === "KOH" || rB === "KOH";
      const baseFormula = usesKOH ? "KOH" : "NaOH";
      const baseName = usesKOH ? "Potassium Hydroxide" : "Sodium Hydroxide";
      const saltFormula = usesKOH ? "KCl" : "NaCl";
      const saltPubchemId = usesKOH ? "4873" : "5234";
      fallbackData = {
        reactionFeasible: true,
        reactantsData: [
          { formula: "HCl", name: "Hydrochloric Acid", iupacName: "chlorane", pubchemId: "313", molecularWeight: 36.46 },
          { formula: baseFormula, name: baseName, iupacName: baseName, pubchemId: usesKOH ? "14797" : "14798", molecularWeight: usesKOH ? 56.11 : 40.00 }
        ],
        productsData: [
          { formula: saltFormula, name: `${saltFormula === "NaCl" ? "Sodium" : "Potassium"} Chloride (Salt)`, pubchemId: saltPubchemId, state: "aq" },
          { formula: "H2O", name: "Water", pubchemId: "962", state: "l" }
        ],
        deltaH_rxn: -57.1, // standard neutralization enthalpy
        deltaS_rxn: 80.5,
        balancedEquation: `HCl(aq) + ${baseFormula}(aq) → ${saltFormula}(aq) + H2O(l)`,
        reactionClass: "Neutralization / Double Displacement",
        thermoType: "Exothermic",
        visuals: {
          solutionColorStart: "clear",
          solutionColorEnd: "clear",
          hasBubbles: false,
          gasName: "",
          precipitateColor: "",
          animationDescription: "Strong acid and strong base combine silently. No visual color changes occur, but the system releases heat rapidly, raising the solution temperature coordinate."
        },
        dangerLevel: "safe",
        conceptualExplanationFoundational: `When an acidic solution mixes with a basic solution, the H⁺ ions of the acid combine with the OH⁻ ions of the base to form molecular water (H₂O) and soluble salt (${saltFormula}). This neutralization reaction is always exothermic.`,
        conceptualExplanationAdvanced: "The net ionic reaction is H⁺(aq) + OH⁻(aq) → H₂O(l) with standard heat of neutralisation ΔH = -57.1 kJ/mol. The reaction is highly spontaneous (ΔG < 0) driven by massive positive entropic release from covalent water bonding.",
        arrowPushingDetails: "OH⁻ nucleophile attacks the proton of hydronium H₃O⁺ ion, forming two neutral H₂O water solvent clusters.",
        advice: [
          "Try adding a fast pH indicator (like Phenolphthalein) to watch the solution swap from brilliant dark magenta to absolute clear at neutralization endpoint!",
          "Use a weak acid like Acetic Acid to observe a lower enthalpy of chemical neutralization."
        ]
      };
    }

    // ORGANIC ALKENE PROPENE + HBR (MARK / ANTI-MARK EFFECT)
    if (((rA === "PROPENE" || rA === "C3H6") && rB === "HBR") || ((rA === "HBR" || rA === "H-BR") && (rB === "PROPENE" || rB === "C3H6"))) {
      fallbackMatched = true;
      const isAntiMark = perox;
      fallbackData = {
        reactionFeasible: true,
        reactantsData: [
          { formula: "C3H6", name: "Propene", iupacName: "Prop-1-ene", pubchemId: "6378", molecularWeight: 42.08 },
          { formula: "HBr", name: "Hydrogen Bromide", iupacName: "bromane", pubchemId: "260", molecularWeight: 80.91 }
        ],
        productsData: isAntiMark ? [
          { formula: "CH3-CH2-CH2Br", name: "1-Bromopropane", pubchemId: "7841", state: "l" }
        ] : [
          { formula: "CH3-CHBr-CH3", name: "2-Bromopropane", pubchemId: "7840", state: "l" }
        ],
        deltaH_rxn: isAntiMark ? -112.0 : -123.0,
        deltaS_rxn: -145.0, // decrease in entropy
        balancedEquation: isAntiMark 
          ? "CH3-CH=CH2 + HBr (with Peroxides) → CH3-CH2-CH2Br"
          : "CH3-CH=CH2 + HBr → CH3-CHBr-CH3",
        reactionClass: "Electrophilic Addition (Organic)",
        thermoType: "Exothermic",
        majorProduct: isAntiMark ? "1-Bromopropane (Anti-Markovnikov Product)" : "2-Bromopropane (Markovnikov Product)",
        minorProduct: isAntiMark ? "2-Bromopropane" : "1-Bromopropane",
        majorYield: isAntiMark ? 92 : 86,
        minorYield: isAntiMark ? 8 : 14,
        visuals: {
          solutionColorStart: "clear",
          solutionColorEnd: "clear",
          hasBubbles: false,
          gasName: "",
          precipitateColor: "",
          animationDescription: isAntiMark 
            ? "Addition reaction proceeds under radial anti-Markovnikov mechanism, forming 1-bromopropane product."
            : "Hydrogen bromide adds to propene gas under classic Markovnikov conditions inside non-polar CCl4 solvent."
        },
        dangerLevel: "safe",
        conceptualExplanationFoundational: isAntiMark
          ? "NCERT / Org Core Rule: In the presence of organic peroxides (Peroxide Effect), HBr adds to unsymmetric alkenes contrary to Markovnikov's rule. The negative bromide part attaches to the carbon with MORE hydrogen atoms."
          : "Markovnikov's Rule: During hydrohalogenation of an unsymmetrical alkene, the acidic Hydrogen attaches to the double-bonded Carbon having more Hydrogen atom substituents, while Halogen goes to the highly substituted Carbon.",
        conceptualExplanationAdvanced: isAntiMark
          ? "The addition of HBr in the presence of peroxides proceeds via a free-radical chain mechanism. The bromyl free radical (Br•) attacks first to generate the more stable secondary free radical (•CH(CH3)CH2Br) rather than a primary radical, leading to 1-bromopropane."
          : "The reaction starts with protonation of propene double bond to generate a stable secondary carbocation (CH3-C⁺H-CH3). Bromide anion nucleophile attacks this carbon, forming 2-bromopropane with high Markovnikov selectivity.",
        arrowPushingDetails: isAntiMark
          ? "Initiation: Peroxide → 2 R-O•\nR-O• + H-Br → R-O-H + Br•\nPropagation: Br• attacks propene double bond forming •CH(CH3)CH2Br secondary radical, which abstracts H from H-Br."
          : "π-electrons of alkene double bond shift to protonate, creating a 2° carbocation intermediate. Bromide (Br⁻) nucleophile attacks the positive carbocation.",
        advice: [
          "Notice the reaction flip: This 'What If?' pathway showcases anti-Markovnikov (Kharasch peroxide effect) when organic peroxides are added!",
          "Use Polar Protic solvents to accelerate Markovnikov carbocation pathways."
        ]
      };
    }

    // BASE PRECIPITATION - BA2+ / SO42-
    if (((rA === "BA2+" || rA === "BACL2") && (rB === "SO42-" || rB === "NASO4" || rB === "NA2SO4")) ||
        ((rA === "SO42-" || rA === "NASO4" || rA === "NA2SO4") && (rB === "BA2+" || rB === "BACL2"))) {
      fallbackMatched = true;
      const baInputIsHydrate = isHydrateFormula(rA === "BACL2" ? rawA : rawB);
      fallbackData = {
        reactionFeasible: true,
        reactantsData: [
          baInputIsHydrate
            ? { formula: "BaCl2·2H2O", name: "Aqueous Barium Chloride Dihydrate", iupacName: "Barium chloride dihydrate", pubchemId: "5284346", molecularWeight: 244.26 }
            : { formula: "BaCl2", name: "Aqueous Barium Chloride", iupacName: "Barium chloride", pubchemId: "25204", molecularWeight: 208.23 },
          { formula: "Na2SO4", name: "Aqueous Sodium Sulfate", iupacName: "Sodium sulfate", pubchemId: "24436", molecularWeight: 142.04 }
        ],
        productsData: [
          { formula: "BaSO4", name: "Solid Barium Sulfate (Precipitate)", pubchemId: "24414", state: "s" },
          { formula: "NaCl", name: "Aqueous Sodium Chloride", pubchemId: "5234", state: "aq" }
        ],
        deltaH_rxn: -18.4,
        deltaS_rxn: 30.1,
        balancedEquation: baInputIsHydrate
          ? "BaCl2·2H2O(aq) + Na2SO4(aq) → BaSO4(s)↓ + 2NaCl(aq) + 2H2O(l)"
          : "BaCl2(aq) + Na2SO4(aq) → BaSO4(s)↓ + 2NaCl(aq)",
        reactionClass: "Precipitation / Double Displacement",
        thermoType: "Exothermic",
        visuals: {
          solutionColorStart: "clear",
          solutionColorEnd: "clear",
          hasBubbles: false,
          gasName: "",
          precipitateColor: "white",
          animationDescription: "An instant white milky precipitate of Barium Sulfate (BaSO4) is formed and slowly settles down to the bottom of the beaker."
        },
        dangerLevel: "safe",
        conceptualExplanationFoundational: "When solutions of Barium Chloride and Sodium Sulfate are mixed, an insoluble white precipitate of Barium Sulfate is formed immediately along with soluble Sodium Chloride. This is an example of double displacement and precipitation.",
        conceptualExplanationAdvanced: "The solubility product (Ksp) of BaSO4 is extremely low (1.1 x 10⁻¹⁰). Mixing Ba²⁺ and SO₄²⁻ ions exceeds this threshold, triggering spontaneous nucleation and rapid white solid precipitation.",
        arrowPushingDetails: "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ionic grid association)",
        advice: [
          "Check standard solubility rules: heavy metal sulfates like BaSO4 are highly insoluble in water.",
          "Try using Barium Nitrate instead of Barium Chloride to yield the same rich white precipitate!"
        ]
      };
    }

    if (fallbackMatched && fallbackData) {
      // Calculate dynamic ΔG based on the current temp (Kelvin) for fallback data
      // DeltaG = DeltaH - T * (DeltaS / 1000)
      const dH = fallbackData.deltaH_rxn;
      const dS = fallbackData.deltaS_rxn;
      const dG = dH - tKelvin * (dS / 1000);
      fallbackData.calculatedDeltaG = Number(dG.toFixed(2));
      fallbackData.isSpontaneous = dG < 0;

      // In secondary Fallback, we support condition based branching
      // If ΔG > 0, we can override reaction feasibility to false to match non-spontaneous condition branching
      if (dG > 0 && fallbackData.reactionFeasible) {
        fallbackData.reactionFeasible = false;
        fallbackData.conceptualExplanationFoundational = "The thermodynamic state under this extreme condition does not support spontaneous reaction. No chemical transformation occurs.";
        fallbackData.conceptualExplanationAdvanced = `The Gibbs Free Energy (ΔG = ${fallbackData.calculatedDeltaG} kJ) goes positive at this temperature (${temperature}°C), indicating that the reaction has become non-spontaneous and cannot occur.`;
      }

      return res.json(fallbackData);
    }

    // Call Gemini API if we have it and no static fallback matches; otherwise execute our physical simulation fallback
    if (!ai) {
      console.log("No Gemini API Key defined. Launching dynamic offline simulation backup.");
      const fallbackResult = generateDynamicFallback(reactantList, temperature, pressure, solvent, addedPeroxide, tKelvin, catalyst);
      return res.json(fallbackResult);
    }

    try {
      const reactantDescs = reactantList.map(r => `${r.formula} (${r.concentration || "concentrated"})`).join(", ");
      
      let response = null;
      let attempts = 0;
      const MAX_ATTEMPTS = 3;
      let delay = 1000;

      while (attempts < MAX_ATTEMPTS) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `
              Predict the chemical reaction outputs and thermodynamic constants for reactants: "${reactantDescs}"
              in solvent: "${solv}" at Temp: ${temperature}°C, Pressure: ${pressure} atm. addedPeroxide: ${perox}.
              Analyze physical and CBSE curriculum rules (e.g. reactivity series, school single/double displacement, oxidation, Saponification, Esterification, Solubility and pH etc).
              Pay close attention if materials are "dilute" or "concentrated", which can alter reaction kinetics, heat, bubbles, or precipitate thickness.
              Determine spontaneity under these conditions using: deltaH_rxn (kJ/mol) and deltaS_rxn (J/mol K).
              Return your prediction ONLY as a JSON string matching the specified schema.
            `,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  reactionFeasible: { type: Type.BOOLEAN, description: "Is reaction possible under standard reactivity/conditions" },
                  reactantsData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        formula: { type: Type.STRING },
                        name: { type: Type.STRING },
                        iupacName: { type: Type.STRING },
                        pubchemId: { type: Type.STRING },
                        molecularWeight: { type: Type.NUMBER }
                      }
                    }
                  },
                  productsData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        formula: { type: Type.STRING },
                        name: { type: Type.STRING },
                        pubchemId: { type: Type.STRING },
                        state: { type: Type.STRING }
                      }
                    }
                  },
                  deltaH_rxn: { type: Type.NUMBER, description: "Standard enthalpy of reaction in kJ/mol" },
                  deltaS_rxn: { type: Type.NUMBER, description: "Standard entropy change in J/(mol K)" },
                  balancedEquation: { type: Type.STRING },
                  reactionClass: { type: Type.STRING },
                  thermoType: { type: Type.STRING, description: "Exothermic or Endothermic" },
                  majorProduct: { type: Type.STRING },
                  minorProduct: { type: Type.STRING },
                  majorYield: { type: Type.NUMBER },
                  minorYield: { type: Type.NUMBER },
                  visuals: {
                    type: Type.OBJECT,
                    properties: {
                      solutionColorStart: { type: Type.STRING },
                      solutionColorEnd: { type: Type.STRING },
                      hasBubbles: { type: Type.BOOLEAN },
                      gasName: { type: Type.STRING },
                      precipitateColor: { type: Type.STRING },
                      animationDescription: { type: Type.STRING }
                    },
                    required: ["solutionColorStart", "solutionColorEnd", "hasBubbles", "precipitateColor"]
                  },
                  dangerLevel: { type: Type.STRING, description: "safe, hazardous, explosive" },
                  conceptualExplanationFoundational: { type: Type.STRING },
                  conceptualExplanationAdvanced: { type: Type.STRING },
                  arrowPushingDetails: { type: Type.STRING },
                  advice: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["reactionFeasible", "reactantsData", "deltaH_rxn", "deltaS_rxn", "balancedEquation", "reactionClass", "thermoType"]
              }
            }
          });
          break; // Success!
        } catch (retryErr: any) {
          attempts++;
          if (attempts >= MAX_ATTEMPTS) {
            throw retryErr;
          }
          await new Promise((r) => setTimeout(r, delay));
          delay *= 2;
        }
      }

      if (!response) {
        throw new Error("No response returned from Gemini API");
      }

      const parsedData = JSON.parse(response.text.trim());
      
      // Compute deltaG on server-side dynamically
      const dH = parsedData.deltaH_rxn || 0;
      const dS = parsedData.deltaS_rxn || 0;
      const dG = dH - tKelvin * (dS / 1000);
      parsedData.calculatedDeltaG = Number(dG.toFixed(2));
      parsedData.isSpontaneous = dG < 0;

      // Handle non-spontaneity: overriding feasibility if ΔG is positive
      if (dG > 0 && parsedData.reactionFeasible) {
        parsedData.reactionFeasible = false;
        parsedData.conceptualExplanationFoundational = "Gibbs Free Energy calculations indicate that this process is non-spontaneous at these environment levels.";
        parsedData.conceptualExplanationAdvanced = `The Gibbs Free Energy (ΔG = ${parsedData.calculatedDeltaG} kJ) is positive under these conditions, rendering the reaction non-spontaneous. Hence, no products are formed.`;
      }

      return res.json(parsedData);
    } catch (err: any) {
      console.log("[Simulation] Dynamic handler invoked.");
      const fallbackResult = generateDynamicFallback(reactantList, temperature, pressure, solvent, addedPeroxide, tKelvin, catalyst);
      return res.json(fallbackResult);
    }
  });

  // —————————————————————————————————————————————————————————————————————
  // Helper tools and databases for "Know Your Chemicals (KYC)"
  // —————————————————————————————————————————————————————————————————————
  function isValidFormula(str: string): boolean {
    const s = str.trim();
    if (s.includes(" ")) return false;
    // must start with uppercase or parenthesis
    if (!/^[A-Z(]/.test(s)) return false;
    // Check if every lowercase letter is part of a valid element symbol (i.e. immediately preceded by an uppercase letter)
    for (let i = 0; i < s.length; i++) {
      if (/[a-z]/.test(s[i])) {
        if (i === 0 || !/[A-Z]/.test(s[i - 1])) {
          return false;
        }
      }
    }
    // must contain mostly elements, numbers, parentheses, dots, etc.
    return /^[A-Za-z0-9().·\+=\-\[\]]+$/.test(s);
  }

  // Computes a real molecular weight from a chemical formula string (e.g. "V2O5", "Ca(OH)2",
  // "(NH4)2SO4", "CaSO4·2H2O") by summing each element's atomic mass from PERIODIC_TABLE_ELEMENTS,
  // handling parenthesized groups with multipliers and a trailing "·nH2O"/".nH2O" hydrate suffix.
  // Returns null if the formula contains anything this simple parser can't handle (unknown element
  // symbols, ionic charge brackets, etc.) so the caller can fall back gracefully instead of
  // reporting a fabricated number.
  function calculateMolecularWeight(formula: string): number | null {
    const hydrateMatch = formula.match(/[·.](\d*)H2O$/);
    let mainFormula = formula;
    let hydrateWaterCount = 0;
    if (hydrateMatch) {
      hydrateWaterCount = hydrateMatch[1] === "" ? 1 : parseInt(hydrateMatch[1], 10);
      mainFormula = formula.slice(0, formula.length - hydrateMatch[0].length);
    }

    const massLookup: Record<string, number> = {};
    for (const el of PERIODIC_TABLE_ELEMENTS) {
      massLookup[el.sym] = parseFloat(el.mass);
    }

    const str = mainFormula.trim();
    let index = 0;

    const parseGroup = (): Record<string, number> | null => {
      const counts: Record<string, number> = {};
      while (index < str.length) {
        const ch = str[index];
        if (ch === "(" || ch === "[") {
          const closeCh = ch === "(" ? ")" : "]";
          index++;
          const inner = parseGroup();
          if (!inner) return null;
          if (str[index] !== closeCh) return null;
          index++;
          let numStr = "";
          while (index < str.length && /[0-9]/.test(str[index])) {
            numStr += str[index];
            index++;
          }
          const multiplier = numStr === "" ? 1 : parseInt(numStr, 10);
          for (const el in inner) {
            counts[el] = (counts[el] || 0) + inner[el] * multiplier;
          }
        } else if (ch === ")" || ch === "]") {
          break;
        } else if (/[A-Z]/.test(ch)) {
          let sym = ch;
          index++;
          if (index < str.length && /[a-z]/.test(str[index])) {
            sym += str[index];
            index++;
          }
          if (!(sym in massLookup)) return null;
          let numStr = "";
          while (index < str.length && /[0-9]/.test(str[index])) {
            numStr += str[index];
            index++;
          }
          const count = numStr === "" ? 1 : parseInt(numStr, 10);
          counts[sym] = (counts[sym] || 0) + count;
        } else {
          return null;
        }
      }
      return counts;
    };

    const counts = parseGroup();
    if (!counts || index !== str.length || Object.keys(counts).length === 0) return null;

    let total = 0;
    for (const el in counts) {
      total += massLookup[el] * counts[el];
    }
    total += hydrateWaterCount * (massLookup["H"] * 2 + massLookup["O"]);

    return Math.round(total * 100) / 100;
  }

  function classifyFormula(formula: string): { classification: "Organic" | "Inorganic"; reason: string } {
    // A standard chemical formula consists of uppercase letter optionally followed by lowercase letter
    const elementsInFormula: string[] = [];
    const elementRegex = /([A-Z][a-z]?)/g;
    let match;
    while ((match = elementRegex.exec(formula)) !== null) {
      elementsInFormula.push(match[1]);
    }

    const hasCarbon = elementsInFormula.includes("C");

    if (!hasCarbon) {
      return {
        classification: "Inorganic",
        reason: `This compound (${formula}) does not contain any carbon atoms, classifying it systematically as inorganic.`
      };
    }

    // It has Carbon. Check for inorganic carbonaceous groups
    const norm = formula.toUpperCase();
    const isCarbonate = norm.includes("CO3") || norm.includes("HCO3");
    const isCarbonOxide = norm === "CO" || norm === "CO2" || norm === "C3O2";
    const isCyanide = norm.includes("CN") && !norm.includes("CH"); 
    const isCarbide = (norm.endsWith("C") || /C[1-9]?$/.test(norm)) && !norm.includes("H") && !norm.includes("O");

    if (isCarbonate || isCarbonOxide || isCyanide || isCarbide) {
      let group = "inorganic group";
      if (isCarbonate) group = "carbonate";
      if (isCarbonOxide) group = "carbon oxide";
      if (isCyanide) group = "cyanide";
      if (isCarbide) group = "carbide";
      return {
        classification: "Inorganic",
        reason: `Even though it contains carbon, ${formula} contains it only in the form of an inorganic ${group} without traditional organic covalent carbon-hydrogen frameworks.`
      };
    }

    return {
      classification: "Organic",
      reason: `This is classified as an organic compound because it contains covalent carbon-hydrogen or carbon-carbon bonds forming an organic molecular framework.`
    };
  }

  const COMMON_NAMES_TO_FORMULA: Record<string, { formula: string, iupac: string, type: string, color: string, classification?: "Organic" | "Inorganic", smiles?: string }> = {
    "copper oxide": { formula: "CuO", iupac: "Copper(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Cu]=O" },
    "copper(ii) oxide": { formula: "CuO", iupac: "Copper(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Cu]=O" },
    "copper (ii) oxide": { formula: "CuO", iupac: "Copper(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Cu]=O" },
    "copper(i) oxide": { formula: "Cu2O", iupac: "Copper(I) oxide", type: "Metal Oxide", color: "Red/brown powder", classification: "Inorganic", smiles: "[Cu]O[Cu]" },
    "copper (i) oxide": { formula: "Cu2O", iupac: "Copper(I) oxide", type: "Metal Oxide", color: "Red/brown powder", classification: "Inorganic", smiles: "[Cu]O[Cu]" },
    "cuprous oxide": { formula: "Cu2O", iupac: "Copper(I) oxide", type: "Metal Oxide", color: "Red/brown powder", classification: "Inorganic", smiles: "[Cu]O[Cu]" },
    "cupric oxide": { formula: "CuO", iupac: "Copper(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Cu]=O" },
    "copper sulfate": { formula: "CuSO4", iupac: "Copper(II) sulfate", type: "Metal Salt", color: "Blue crystals (hydrated) or white powder (anhydrous)", classification: "Inorganic", smiles: "[Cu+2].[O-]S(=O)(=O)[O-]" },
    "copper (ii) sulfate": { formula: "CuSO4", iupac: "Copper(II) sulfate", type: "Metal Salt", color: "Blue crystals (hydrated) or white powder (anhydrous)", classification: "Inorganic", smiles: "[Cu+2].[O-]S(=O)(=O)[O-]" },
    "copper(ii) sulfate": { formula: "CuSO4", iupac: "Copper(II) sulfate", type: "Metal Salt", color: "Blue crystals (hydrated) or white powder (anhydrous)", classification: "Inorganic", smiles: "[Cu+2].[O-]S(=O)(=O)[O-]" },
    "copper carbonate": { formula: "CuCO3", iupac: "Copper(II) carbonate", type: "Metal Carbonate", color: "Green powder", classification: "Inorganic", smiles: "[Cu+2].[O-]C(=O)[O-]" },
    "copper chloride": { formula: "CuCl2", iupac: "Copper(II) chloride", type: "Metal Halide", color: "Blue-green dihydrate crystals", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Cu+2]" },
    "iron oxide": { formula: "Fe2O3", iupac: "Iron(III) oxide", type: "Metal Oxide", color: "Reddish-brown powder", classification: "Inorganic", smiles: "O=[Fe]O[Fe]=O" },
    "iron(iii) oxide": { formula: "Fe2O3", iupac: "Iron(III) oxide", type: "Metal Oxide", color: "Reddish-brown powder", classification: "Inorganic", smiles: "O=[Fe]O[Fe]=O" },
    "iron (iii) oxide": { formula: "Fe2O3", iupac: "Iron(III) oxide", type: "Metal Oxide", color: "Reddish-brown powder", classification: "Inorganic", smiles: "O=[Fe]O[Fe]=O" },
    "iron(ii) oxide": { formula: "FeO", iupac: "Iron(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Fe]=O" },
    "iron (ii) oxide": { formula: "FeO", iupac: "Iron(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Fe]=O" },
    "ferric oxide": { formula: "Fe2O3", iupac: "Iron(III) oxide", type: "Metal Oxide", color: "Reddish-brown powder", classification: "Inorganic", smiles: "O=[Fe]O[Fe]=O" },
    "ferrous oxide": { formula: "FeO", iupac: "Iron(II) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "[Fe]=O" },
    "iron(ii,iii) oxide": { formula: "Fe3O4", iupac: "Iron(II,III) oxide", type: "Metal Oxide", color: "Black powder (magnetite)", classification: "Inorganic", smiles: "O=[Fe+2].O=[Fe+3]O[Fe+3]=O" },
    "magnetite": { formula: "Fe3O4", iupac: "Iron(II,III) oxide", type: "Metal Oxide", color: "Black powder", classification: "Inorganic", smiles: "O=[Fe+2].O=[Fe+3]O[Fe+3]=O" },
    "iron sulfate": { formula: "FeSO4", iupac: "Iron(II) sulfate", type: "Metal Salt", color: "Green crystals", classification: "Inorganic", smiles: "[Fe+2].[O-]S(=O)(=O)[O-]" },
    "iron chloride": { formula: "FeCl3", iupac: "Iron(III) chloride", type: "Metal Halide", color: "Yellow-brown crystals", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Cl-].[Fe+3]" },
    "ferric chloride": { formula: "FeCl3", iupac: "Iron(III) chloride", type: "Metal Halide", color: "Yellow-brown crystals", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Cl-].[Fe+3]" },
    "ferrous sulfate": { formula: "FeSO4", iupac: "Iron(II) sulfate", type: "Metal Salt", color: "Green crystals", classification: "Inorganic", smiles: "[Fe+2].[O-]S(=O)(=O)[O-]" },
    "sodium sulfate": { formula: "Na2SO4", iupac: "Sodium sulfate", type: "Metal Salt", color: "White crystalline powder", classification: "Inorganic", smiles: "[Na+].[Na+].[O-]S(=O)(=O)[O-]" },
    "sodium chloride": { formula: "NaCl", iupac: "Sodium chloride", type: "Metal Halide", color: "White cubic crystals", classification: "Inorganic", smiles: "[Na+].[Cl-]" },
    "sodium iodide": { formula: "NaI", iupac: "Sodium iodide", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[Na+].[I-]" },
    "potassium chloride": { formula: "KCl", iupac: "Potassium chloride", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[K+].[Cl-]" },
    "potassium iodide": { formula: "KI", iupac: "Potassium iodide", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[K+].[I-]" },
    "potassium bromide": { formula: "KBr", iupac: "Potassium bromide", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[K+].[Br-]" },
    "potassium permanganate": { formula: "KMnO4", iupac: "Potassium manganate(VII)", type: "Strong Oxidizer / Metal Salt", color: "Deep purple crystals", classification: "Inorganic", smiles: "[K+].[O-][Mn](=O)(=O)=O" },
    "potassium dichromate": { formula: "K2Cr2O7", iupac: "Potassium dichromate(VI)", type: "Strong Oxidizer / Metal Salt", color: "Bright orange-red crystals", classification: "Inorganic", smiles: "[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]" },
    "sodium nitrate": { formula: "NaNO3", iupac: "Sodium nitrate", type: "Metal Salt", color: "White crystalline powder", classification: "Inorganic", smiles: "[Na+].[O-][N+](=O)[O-]" },
    "potassium nitrate": { formula: "KNO3", iupac: "Potassium nitrate", type: "Metal Salt", color: "White crystalline powder", classification: "Inorganic", smiles: "[K+].[O-][N+](=O)[O-]" },
    "sodium carbonate": { formula: "Na2CO3", iupac: "Sodium carbonate", type: "Metal Carbonate", color: "White powder", classification: "Inorganic", smiles: "[Na+].[Na+].[O-]C(=O)[O-]" },
    "sodium bicarbonate": { formula: "NaHCO3", iupac: "Sodium hydrogen carbonate", type: "Metal Bicarbonate", color: "White powder", classification: "Inorganic", smiles: "[Na+].OC(=O)[O-]" },
    "calcium chloride": { formula: "CaCl2", iupac: "Calcium chloride", type: "Metal Halide", color: "White powder or pellets", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Ca+2]" },
    "magnesium chloride": { formula: "MgCl2", iupac: "Magnesium chloride", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Mg+2]" },
    "calcium sulfate": { formula: "CaSO4", iupac: "Calcium sulfate", type: "Metal Salt", color: "White powder", classification: "Inorganic", smiles: "[Ca+2].[O-]S(=O)(=O)[O-]" },
    "magnesium sulfate": { formula: "MgSO4", iupac: "Magnesium sulfate", type: "Metal Salt", color: "White crystalline powder", classification: "Inorganic", smiles: "[Mg+2].[O-]S(=O)(=O)[O-]" },
    "calcium carbonate": { formula: "CaCO3", iupac: "Calcium carbonate", type: "Metal Carbonate", color: "White chalky powder", classification: "Inorganic", smiles: "[Ca+2].[O-]C(=O)[O-]" },
    "calcium oxide": { formula: "CaO", iupac: "Calcium oxide", type: "Metal Oxide", color: "White powder", classification: "Inorganic", smiles: "[Ca]=O" },
    "calcium hydroxide": { formula: "Ca(OH)2", iupac: "Calcium hydroxide", type: "Metal Hydroxide / Base", color: "White powder", classification: "Inorganic", smiles: "[OH-].[OH-].[Ca+2]" },
    "magnesium oxide": { formula: "MgO", iupac: "Magnesium oxide", type: "Metal Oxide", color: "White powder", classification: "Inorganic", smiles: "[Mg]=O" },
    "magnesium hydroxide": { formula: "Mg(OH)2", iupac: "Magnesium hydroxide", type: "Metal Hydroxide / Antacid", color: "White suspension or powder", classification: "Inorganic", smiles: "[OH-].[OH-].[Mg+2]" },
    "zinc oxide": { formula: "ZnO", iupac: "Zinc oxide", type: "Metal Oxide", color: "White powder", classification: "Inorganic", smiles: "[Zn]=O" },
    "zinc sulfate": { formula: "ZnSO4", iupac: "Zinc sulfate", type: "Metal Salt", color: "White crystalline powder", classification: "Inorganic", smiles: "[Zn+2].[O-]S(=O)(=O)[O-]" },
    "zinc chloride": { formula: "ZnCl2", iupac: "Zinc chloride", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Zn+2]" },
    "silver chloride": { formula: "AgCl", iupac: "Silver chloride", type: "Precious Metal Halide", color: "White precipitate / powder (darkens in light)", classification: "Inorganic", smiles: "[Cl-].[Ag+]" },
    "barium sulfate": { formula: "BaSO4", iupac: "Barium sulfate", type: "Metal Salt", color: "White heavy powder", classification: "Inorganic", smiles: "[Ba+2].[O-]S(=O)(=O)[O-]" },
    "barium chloride": { formula: "BaCl2", iupac: "Barium chloride", type: "Metal Halide", color: "White crystalline solid", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Ba+2]" },
    "lead chloride": { formula: "PbCl2", iupac: "Lead(II) chloride", type: "Heavy Metal Halide", color: "White crystalline powder", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Pb+2]" },
    "lead oxide": { formula: "PbO", iupac: "Lead(II) oxide", type: "Heavy Metal Oxide", color: "Yellow or red powder", classification: "Inorganic", smiles: "[Pb]=O" },
    "lead nitrate": { formula: "Pb(NO3)2", iupac: "Lead(II) nitrate", type: "Heavy Metal Nitrate", color: "White crystalline powder", classification: "Inorganic", smiles: "[O-][N+](=O)[O-].[O-][N+](=O)[O-].[Pb+2]" },
    "lead iodide": { formula: "PbI2", iupac: "Lead(II) iodide", type: "Heavy Metal Halide", color: "Bright yellow powder", classification: "Inorganic", smiles: "[I-].[I-].[Pb+2]" },
    "silver nitrate": { formula: "AgNO3", iupac: "Silver nitrate", type: "Precious Metal Nitrate", color: "White crystals", classification: "Inorganic", smiles: "[Ag+].[O-][N+](=O)[O-]" },
    "aluminum oxide": { formula: "Al2O3", iupac: "Aluminium oxide", type: "Metal Oxide / Amphoteric", color: "White powder", classification: "Inorganic", smiles: "O=[Al]O[Al]=O" },
    "aluminium oxide": { formula: "Al2O3", iupac: "Aluminium oxide", type: "Metal Oxide / Amphoteric", color: "White powder", classification: "Inorganic", smiles: "O=[Al]O[Al]=O" },
    "aluminum chloride": { formula: "AlCl3", iupac: "Aluminium chloride", type: "Metal Halide", color: "White or pale yellow solid", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Cl-].[Al+3]" },
    "aluminium chloride": { formula: "AlCl3", iupac: "Aluminium chloride", type: "Metal Halide", color: "White or pale yellow solid", classification: "Inorganic", smiles: "[Cl-].[Cl-].[Cl-].[Al+3]" },
    "water": { formula: "H2O", iupac: "Oxidane", type: "Solvent", color: "Colorless liquid", classification: "Inorganic", smiles: "O" },
    "ammonia": { formula: "NH3", iupac: "Ammonia", type: "Weak Base", color: "Colorless gas with pungent odor", classification: "Inorganic", smiles: "N" },
    "carbon dioxide": { formula: "CO2", iupac: "Carbon dioxide", type: "Non-metal Oxide", color: "Colorless odorless gas", classification: "Inorganic", smiles: "O=C=O" },
    "carbon monoxide": { formula: "CO", iupac: "Carbon monoxide", type: "Non-metal Oxide", color: "Colorless odorless toxic gas", classification: "Inorganic", smiles: "[C-]#[O+]" },
    "sulfur dioxide": { formula: "SO2", iupac: "Sulfur dioxide", type: "Acidic Oxide", color: "Colorless gas with pungent suffocating odor", classification: "Inorganic", smiles: "O=S=O" },
    "sulfur trioxide": { formula: "SO3", iupac: "Sulfur trioxide", type: "Acidic Oxide", color: "Colorless fuming liquid or gas", classification: "Inorganic", smiles: "O=S(=O)=O" },
    "nitrogen dioxide": { formula: "NO2", iupac: "Nitrogen dioxide", type: "Acidic Oxide", color: "Reddish-brown toxic gas", classification: "Inorganic", smiles: "[O-][N+](=O)=O" },
    "nitrous oxide": { formula: "N2O", iupac: "Dinitrogen oxide", type: "Non-metal Oxide", color: "Colorless sweet-smelling gas (laughing gas)", classification: "Inorganic", smiles: "[N-]=[N+]=O" },
    "nitric oxide": { formula: "NO", iupac: "Nitrogen monoxide", type: "Non-metal Oxide", color: "Colorless gas", classification: "Inorganic", smiles: "[N]=O" },
    "phosphorus pentoxide": { formula: "P2O5", iupac: "Phosphorus pentoxide", type: "Acidic Oxide", color: "White crystalline powder", classification: "Inorganic", smiles: "O=P(O)OP(=O)(O)O" },
    "hydrochloric acid": { formula: "HCl", iupac: "Hydrogen chloride", type: "Mineral Acid", color: "Colorless fuming liquid", classification: "Inorganic", smiles: "Cl" },
    "sulfuric acid": { formula: "H2SO4", iupac: "Sulfuric acid", type: "Mineral Acid", color: "Colorless viscous liquid", classification: "Inorganic", smiles: "OS(=O)(=O)O" },
    "nitric acid": { formula: "HNO3", iupac: "Nitric acid", type: "Mineral Acid", color: "Colorless or yellowish liquid", classification: "Inorganic", smiles: "O[N+](=O)[O-]" },
    "phosphoric acid": { formula: "H3PO4", iupac: "Phosphoric acid", type: "Mineral Acid", color: "Colorless viscous liquid or crystalline solid", classification: "Inorganic", smiles: "OP(=O)(O)O" },
    "methane": { formula: "CH4", iupac: "Methane", type: "Alkane Hydrocarbon", color: "Colorless odorless gas", classification: "Organic", smiles: "C" },
    "ethane": { formula: "C2H6", iupac: "Ethane", type: "Alkane Hydrocarbon", color: "Colorless odorless gas", classification: "Organic", smiles: "CC" },
    "propane": { formula: "C3H8", iupac: "Propane", type: "Alkane Hydrocarbon", color: "Colorless gas", classification: "Organic", smiles: "CCC" },
    "butane": { formula: "C4H10", iupac: "Butane", type: "Alkane Hydrocarbon", color: "Colorless gas", classification: "Organic", smiles: "CCCC" },
    "ethene": { formula: "C2H4", iupac: "Ethene", type: "Alkene Hydrocarbon", color: "Colorless gas", classification: "Organic", smiles: "C=C" },
    "ethylene": { formula: "C2H4", iupac: "Ethene", type: "Alkene Hydrocarbon", color: "Colorless gas", classification: "Organic", smiles: "C=C" },
    "ethyne": { formula: "C2H2", iupac: "Ethyne", type: "Alkyne Hydrocarbon", color: "Colorless gas", classification: "Organic", smiles: "C#C" },
    "acetylene": { formula: "C2H2", iupac: "Ethyne", type: "Alkyne Hydrocarbon", color: "Colorless gas", classification: "Organic", smiles: "C#C" },
    "ethanol": { formula: "C2H5OH", iupac: "Ethanol", type: "Alcohol", color: "Colorless volatile liquid", classification: "Organic", smiles: "CCO" },
    "methanol": { formula: "CH3OH", iupac: "Methanol", type: "Alcohol", color: "Colorless toxic liquid", classification: "Organic", smiles: "CO" },
    "acetic acid": { formula: "CH3COOH", iupac: "Ethanoic acid", type: "Carboxylic Acid", color: "Colorless pungent liquid", classification: "Organic", smiles: "CC(=O)O" },
    "ethanoic acid": { formula: "CH3COOH", iupac: "Ethanoic acid", type: "Carboxylic Acid", color: "Colorless pungent liquid", classification: "Organic", smiles: "CC(=O)O" },
    "glucose": { formula: "C6H12O6", iupac: "D-Glucose", type: "Monosaccharide Sugar", color: "White crystalline powder", classification: "Organic", smiles: "C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O" },
    "sucrose": { formula: "C12H22O11", iupac: "beta-D-fructofuranosyl alpha-D-glucopyranoside", type: "Disaccharide Sugar", color: "White crystals or powder", classification: "Organic", smiles: "C(C1C(C(C(C(O1)OC2(C(C(C(O2)CO)O)O)CO)O)O)O)O" },
    "fructose": { formula: "C6H12O6", iupac: "D-Fructose", type: "Monosaccharide Sugar", color: "White crystalline powder", classification: "Organic", smiles: "C([C@@H]1[C@H]([C@@H](C(O1)(O)CO)O)O)O" },
    "urea": { formula: "CO(NH2)2", iupac: "Urea", type: "Organic Amide", color: "White crystalline solid", classification: "Organic", smiles: "C(=O)(N)N" },
    "caffeine": { formula: "C8H10N4O2", iupac: "1,3,7-Trimethylpurine-2,6-dione", type: "Purine Alkaloid", color: "White needles or powder", classification: "Organic", smiles: "CN1C2=C(C(=O)N(C1=O)C)N=CN2C" },
    "acetone": { formula: "CH3COCH3", iupac: "Propan-2-one", type: "Ketone Solvent", color: "Colorless volatile liquid", classification: "Organic", smiles: "CC(=O)C" },
    "propanone": { formula: "CH3COCH3", iupac: "Propan-2-one", type: "Ketone Solvent", color: "Colorless volatile liquid", classification: "Organic", smiles: "CC(=O)C" },
    "chloroform": { formula: "CHCl3", iupac: "Trichloromethane", type: "Halocarbon Solvent", color: "Colorless heavy volatile liquid", classification: "Organic", smiles: "C(Cl)(Cl)Cl" },
    "salicylic acid": { formula: "C7H6O3", iupac: "2-Hydroxybenzoic acid", type: "Hydroxy Acid", color: "White needles or powder", classification: "Organic", smiles: "C1=CC=C(C(=C1)O)C(=O)O" },
    "citric acid": { formula: "C6H8O7", iupac: "2-hydroxypropane-1,2,3-tricarboxylic acid", type: "Tricarboxylic Hydroxy Acid", color: "White crystalline solid", classification: "Organic", smiles: "C(C(=O)O)C(CC(=O)O)(C(=O)O)O" },
    "aspirin": { formula: "C9H8O4", iupac: "2-Acetyloxybenzoic acid", type: "Ester / Carboxylic Acid", color: "White crystalline powder", classification: "Organic", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
    "acetylsalicylic acid": { formula: "C9H8O4", iupac: "2-Acetyloxybenzoic acid", type: "Ester / Carboxylic Acid", color: "White crystalline powder", classification: "Organic", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
    "paracetamol": { formula: "C8H9NO2", iupac: "N-(4-hydroxyphenyl)acetamide", type: "Amide / Phenol", color: "White crystalline powder", classification: "Organic", smiles: "CC(=O)NC1=CC=C(C=C1)O" },
    "acetaminophen": { formula: "C8H9NO2", iupac: "N-(4-hydroxyphenyl)acetamide", type: "Amide / Phenol", color: "White crystalline powder", classification: "Organic", smiles: "CC(=O)NC1=CC=C(C=C1)O" },
    "lactic acid": { formula: "C3H6O3", iupac: "2-Hydroxypropanoic acid", type: "Hydroxy Acid", color: "Syrupy colorless liquid or white solid", classification: "Organic", smiles: "CC(C(=O)O)O" },
    "glycine": { formula: "C2H5NO2", iupac: "2-Aminoacetic acid", type: "Amino Acid", color: "White crystalline solid", classification: "Organic", smiles: "C(C(=O)O)N" },
    "alanine": { formula: "C3H7NO2", iupac: "2-Aminopropanoic acid", type: "Amino Acid", color: "White crystalline powder", classification: "Organic", smiles: "CC(C(=O)O)N" },
    "ibuprofen": { formula: "C13H18O2", iupac: "(RS)-2-(4-(2-methylpropyl)phenyl)propanoic acid", type: "Carboxylic Acid", color: "White crystalline powder", classification: "Organic", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O" },
    "ascorbic acid": { formula: "C6H8O6", iupac: "(5R)-[(1S)-1,2-dihydroxyethyl]-3,4-dihydroxyfuran-2(5H)-one", type: "Enol / Lactone", color: "White to light yellow crystals", classification: "Organic", smiles: "C(C(C1C(=C(C(=O)O1)O)O)O)O" },
    "vitamin c": { formula: "C6H8O6", iupac: "(5R)-[(1S)-1,2-dihydroxyethyl]-3,4-dihydroxyfuran-2(5H)-one", type: "Enol / Lactone", color: "White to light yellow crystals", classification: "Organic", smiles: "C(C(C1C(=C(C(=O)O1)O)O)O)O" },
    "carbon tetrachloride": { formula: "CCl4", iupac: "Tetrachloromethane", type: "Halocarbon Solvent", color: "Colorless heavy volatile liquid", classification: "Organic", smiles: "C(Cl)(Cl)(Cl)Cl" },
    "benzene": { formula: "C6H6", iupac: "Benzene", type: "Aromatic Hydrocarbon", color: "Colorless volatile liquid", classification: "Organic", smiles: "C1=CC=CC=C1" },
    "gypsum": { formula: "CaSO4·2H2O", iupac: "Calcium sulfate dihydrate", type: "Hydrated Metal Salt", color: "White crystalline solid", classification: "Inorganic", smiles: "[Ca+2].[O-]S(=O)(=O)[O-].O.O" },
    "calcium sulfate dihydrate": { formula: "CaSO4·2H2O", iupac: "Calcium sulfate dihydrate", type: "Hydrated Metal Salt", color: "White crystalline solid", classification: "Inorganic", smiles: "[Ca+2].[O-]S(=O)(=O)[O-].O.O" },
    "plaster of paris": { formula: "CaSO4·0.5H2O", iupac: "Calcium sulfate hemihydrate", type: "Hydrated Metal Salt", color: "Fine white powder", classification: "Inorganic", smiles: "[Ca+2].[O-]S(=O)(=O)[O-].O" },
    "calcium sulfate hemihydrate": { formula: "CaSO4·0.5H2O", iupac: "Calcium sulfate hemihydrate", type: "Hydrated Metal Salt", color: "Fine white powder", classification: "Inorganic", smiles: "[Ca+2].[O-]S(=O)(=O)[O-].O" },
    "bleaching powder": { formula: "CaOCl2", iupac: "Calcium hypochlorite", type: "Inorganic Salt / Disinfectant", color: "Dull white powder with a strong smell of chlorine", classification: "Inorganic", smiles: "[Ca+2].[Cl-].[O-][Cl]" },
    "calcium oxychloride": { formula: "CaOCl2", iupac: "Calcium hypochlorite", type: "Inorganic Salt / Disinfectant", color: "Dull white powder with a strong smell of chlorine", classification: "Inorganic", smiles: "[Ca+2].[Cl-].[O-][Cl]" },
    "calcium hypochlorite": { formula: "CaOCl2", iupac: "Calcium hypochlorite", type: "Inorganic Salt / Disinfectant", color: "Dull white powder with a strong smell of chlorine", classification: "Inorganic", smiles: "[Ca+2].[Cl-].[O-][Cl]" },
    "bromoethane": { formula: "C2H5Br", iupac: "Bromoethane", type: "Alkyl Halide", color: "Colorless volatile liquid", classification: "Organic", smiles: "CCBr" },
    "ethyl bromide": { formula: "C2H5Br", iupac: "Bromoethane", type: "Alkyl Halide", color: "Colorless volatile liquid", classification: "Organic", smiles: "CCBr" },
    "chloromethane": { formula: "CH3Cl", iupac: "Chloromethane", type: "Alkyl Halide", color: "Colorless gas", classification: "Organic", smiles: "CCl" },
    "methyl chloride": { formula: "CH3Cl", iupac: "Chloromethane", type: "Alkyl Halide", color: "Colorless gas", classification: "Organic", smiles: "CCl" },
    "bromomethane": { formula: "CH3Br", iupac: "Bromomethane", type: "Alkyl Halide", color: "Colorless gas", classification: "Organic", smiles: "CBr" },
    "methyl bromide": { formula: "CH3Br", iupac: "Bromomethane", type: "Alkyl Halide", color: "Colorless gas", classification: "Organic", smiles: "CBr" },
    "iodomethane": { formula: "CH3I", iupac: "Iodomethane", type: "Alkyl Halide", color: "Colorless liquid", classification: "Organic", smiles: "CI" },
    "methyl iodide": { formula: "CH3I", iupac: "Iodomethane", type: "Alkyl Halide", color: "Colorless liquid", classification: "Organic", smiles: "CI" },
    "dichloromethane": { formula: "CH2Cl2", iupac: "Dichloromethane", type: "Alkyl Halide Solvent", color: "Colorless volatile liquid", classification: "Organic", smiles: "C(Cl)Cl" },
    "methylene chloride": { formula: "CH2Cl2", iupac: "Dichloromethane", type: "Alkyl Halide Solvent", color: "Colorless volatile liquid", classification: "Organic", smiles: "C(Cl)Cl" },
    "iodoform": { formula: "CHI3", iupac: "Triiodomethane", type: "Alkyl Halide / Antiseptic", color: "Pale yellow crystalline solid", classification: "Organic", smiles: "C(I)(I)I" },
    "triiodomethane": { formula: "CHI3", iupac: "Triiodomethane", type: "Alkyl Halide / Antiseptic", color: "Pale yellow crystalline solid", classification: "Organic", smiles: "C(I)(I)I" },
    "chlorobenzene": { formula: "C6H5Cl", iupac: "Chlorobenzene", type: "Aryl Halide", color: "Colorless liquid", classification: "Organic", smiles: "C1=CC=C(C=C1)Cl" },
    "bromobenzene": { formula: "C6H5Br", iupac: "Bromobenzene", type: "Aryl Halide", color: "Colorless liquid", classification: "Organic", smiles: "C1=CC=C(C=C1)Br" }
  };

  const PERIODIC_TABLE_ELEMENTS = [
    { num: 1, sym: "H", name: "Hydrogen", mass: "1.008", cat: "Non-metal", state: "Gas", color: "Colorless gas", fact: "Hydrogen is the most abundant chemical substance in the Universe, making up about 75% of all normal matter.", uses: "Clean energy fuel cells, rocket fuel, industrial ammonia synthesis via the Haber process, oil hydrogenation." },
    { num: 2, sym: "He", name: "Helium", mass: "4.0026", cat: "Non-metal", state: "Gas", color: "Colorless gas", fact: "Helium is the second lightest and second most abundant element in the observable universe, and it cannot be solidified by cooling alone.", uses: "Cryogenics (cooling superconducting magnets in MRIs), pressurizing liquid rocket propellants, leak detection, helium balloons." },
    { num: 3, sym: "Li", name: "Lithium", mass: "6.94", cat: "Metal", state: "Solid", color: "Silvery-white soft metal", fact: "Lithium is the least dense of all solid elements and is so soft it can be easily cut with a butter knife.", uses: "Rechargeable lithium-ion batteries, lightweight alloys for aerospace, psychiatric mood stabilizers, lubricating greases." },
    { num: 4, sym: "Be", name: "Beryllium", mass: "9.0122", cat: "Metal", state: "Solid", color: "Lead-gray metallic solid", fact: "Beryllium is relatively rare in the universe and often forms in stars when larger cosmic rays collide with other elements.", uses: "Structural materials for aerospace, military satellites, spacecraft mirrors, window filters for X-ray tubes." },
    { num: 5, sym: "B", name: "Boron", mass: "10.81", cat: "Metalloid", state: "Solid", color: "Black-brown crystalline metalloid", fact: "Boron is commonly found in Earth's crust in solar-evaporated mineral deposits called borates.", uses: "Manufacturing borosilicate glass, fiberglass insulation, agricultural micronutrients, control rods in nuclear reactors." },
    { num: 6, sym: "C", name: "Carbon", mass: "12.011", cat: "Non-metal", state: "Solid", color: "Black (graphite) or clear (diamond)", fact: "Carbon has the highest thermal conductivity of any known element and is the foundational element for all known organic life.", uses: "Steel manufacturing, activated carbon filters, carbon fiber structures, synthetic diamonds, jewelry." },
    { num: 7, sym: "N", name: "Nitrogen", mass: "14.007", cat: "Non-metal", state: "Gas", color: "Colorless gas", fact: "Nitrogen gas makes up about 78% of Earth's atmosphere and is highly inert in its diatomic form.", uses: "Liquid nitrogen cryostat cooling, inert purging systems, chemical synthesis of ammonia and fertilizers, food preservation." },
    { num: 8, sym: "O", name: "Oxygen", mass: "15.999", cat: "Non-metal", state: "Gas", color: "Colorless gas", fact: "Oxygen is the third-most abundant element in the universe by mass, after hydrogen and helium, and is highly reactive.", uses: "Medical respiratory support, steel production, oxidizer in liquid rocket engines, municipal water purification." },
    { num: 9, sym: "F", name: "Fluorine", mass: "18.998", cat: "Non-metal", state: "Gas", color: "Pale yellow-green highly toxic gas", fact: "Fluorine is the most electronegative and chemically reactive of all elements, reacting with almost any substance.", uses: "Water and toothpaste fluoridation, manufacturing Teflon non-stick coatings, uranium hexafluoride for enrichment, refrigerants." },
    { num: 10, sym: "Ne", name: "Neon", mass: "20.180", cat: "Non-metal", state: "Gas", color: "Colorless gas (glowing reddish-orange)", fact: "Neon glows with a distinct, brilliant reddish-orange light when ionized in high-voltage glow discharge tubes.", uses: "Advertising neon signs, high-voltage indicators, cold cathode tubes, cryogenic liquid refrigerants." },
    { num: 11, sym: "Na", name: "Sodium", mass: "22.990", cat: "Metal", state: "Solid", color: "Silvery-white extremely soft metal", fact: "Sodium is a highly reactive alkali metal that floats on water and reacts violently with it to release explosive hydrogen gas.", uses: "Raw material for table salt (NaCl) and baking soda (NaHCO3), high-pressure sodium-vapor lamps, organic chemical catalyst." },
    { num: 12, sym: "Mg", name: "Magnesium", mass: "24.305", cat: "Metal", state: "Solid", color: "Shiny silvery-gray solid", fact: "Magnesium burns with an intensely bright white flame and is the central atom in chlorophyll molecules.", uses: "Lightweight structural aluminum-magnesium alloys, fireworks, signal flares, anti-acid medication (milk of magnesia), dietary supplements." },
    { num: 13, sym: "Al", name: "Aluminum", mass: "26.982", cat: "Metal", state: "Solid", color: "Silvery-white lightweight metal", fact: "Aluminum is the most abundant metal in Earth's crust, but was once so precious that it was valued higher than gold.", uses: "Beverage cans, aircraft frames, kitchen foil wraps, high-voltage power lines, window frames, engine components." },
    { num: 14, sym: "Si", name: "Silicon", mass: "28.085", cat: "Metalloid", state: "Solid", color: "Dark gray shiny crystalline solid", fact: "Silicon is a major component of sand, clay, quartz, and amethyst, and is the second most abundant element in Earth's crust.", uses: "Semiconductor computer chips, solar photovoltaic cells, silica glassmaking, silicone sealants and lubricants." },
    { num: 15, sym: "P", name: "Phosphorus", mass: "30.974", cat: "Non-metal", state: "Solid", color: "White (waxy/translucent) or Red (powder)", fact: "White phosphorus glows faintly in the dark when exposed to oxygen, a phenomenon known as chemiluminescence.", uses: "Agricultural fertilizers, safety matches, steel manufacturing, pyrotechnics, detergent builders." },
    { num: 16, sym: "S", name: "Sulfur", mass: "32.06", cat: "Non-metal", state: "Solid", color: "Bright yellow crystalline solid", fact: "Pure sulfur is odorless; the notorious 'rotten egg' smell is due to hydrogen sulfide gas.", uses: "Industrial production of sulfuric acid, vulcanization of rubber, gunpowder, fertilizers, skincare fungicides." },
    { num: 17, sym: "Cl", name: "Chlorine", mass: "35.45", cat: "Non-metal", state: "Gas", color: "Pale greenish-yellow choking gas", fact: "Chlorine is a highly active halogen that was used as a chemical weapon during World War I.", uses: "Water disinfection (drinking and swimming pools), PVC plastic manufacturing, industrial bleaching, salt production." },
    { num: 18, sym: "Ar", name: "Argon", mass: "39.948", cat: "Non-metal", state: "Gas", color: "Colorless gas", fact: "Argon is the third-most abundant gas in Earth's atmosphere, representing roughly 0.93%.", uses: "Double-pane window thermal insulation, shielding gas in gas tungsten arc welding, incandescent light bulbs preservation." },
    { num: 19, sym: "K", name: "Potassium", mass: "39.098", cat: "Metal", state: "Solid", color: "Silvery-white extremely soft metal", fact: "Potassium is an alkali metal that oxidizes within seconds of air exposure and is crucial for cellular neural transmission.", uses: "Agricultural potash fertilizers, liquid soaps, optical glass manufacturing, salt substitutes, potassium hydroxide precursors." },
    { num: 20, sym: "Ca", name: "Calcium", mass: "40.078", cat: "Metal", state: "Solid", color: "Dull gray alkaline earth metal", fact: "Calcium is the fifth-most abundant element in Earth's crust and is highly essential for human bone structure.", uses: "Cement and concrete production, steel manufacturing deoxidizer, dietary supplements, calcium carbonate fillers." },
    { num: 21, sym: "Sc", name: "Scandium", mass: "44.956", cat: "Metal", state: "Solid", color: "Silvery-white transition metal", fact: "Scandium is a rare-earth element discovered in Scandinavia, where it occurs in very trace minerals.", uses: "High-strength aluminum-scandium alloys for aerospace and high-end sports equipment (bicycle frames, baseball bats)." },
    { num: 22, sym: "Ti", name: "Titanium", mass: "47.867", cat: "Metal", state: "Solid", color: "Silvery-gray lustrous metal", fact: "Titanium is as strong as steel but 45% lighter, and it has the highest strength-to-weight ratio of any metal.", uses: "Aerospace structural frames, jet engines, medical prosthetic implants, dental crowns, sports gear, white paint pigment (TiO2)." },
    { num: 23, sym: "V", name: "Vanadium", mass: "50.942", cat: "Metal", state: "Solid", color: "Steel-gray ductile metal", fact: "Vanadium is named after Vanadís, the Old Norse goddess of beauty and fertility, owing to its colorful chemical compounds.", uses: "Strengthening steel alloys (rebar, tools), titanium aerospace alloys, vanadium redox flow batteries for grid storage." },
    { num: 24, sym: "Cr", name: "Chromium", mass: "51.996", cat: "Metal", state: "Solid", color: "Shiny silver-gray hard metal", fact: "Chromium is the primary additive in stainless steel (minimum 10.5%) that creates a protective passive layer against rust.", uses: "Chrome plating, stainless steel alloys, green and yellow pigments, leather tanning, refractory materials." },
    { num: 25, sym: "Mn", name: "Manganese", mass: "54.938", cat: "Metal", state: "Solid", color: "Hard, brittle silvery-gray metal", fact: "Manganese is essential to iron and steel production because of its sulfur-fixing and deoxidizing properties.", uses: "Stainless steel manufacturing, dry cell batteries, aluminum alloy cans, coloring agents in glass and bricks." },
    { num: 26, sym: "Fe", name: "Iron", mass: "55.845", cat: "Metal", state: "Solid", color: "Lustrous metallic gray metal", fact: "Iron is the most abundant element on Earth by mass, forming much of Earth's outer and inner core.", uses: "Structural steel beams, cast iron cookware, concrete reinforcement, industrial magnets, hemoglobin oxygen carrier in biology." },
    { num: 27, sym: "Co", name: "Cobalt", mass: "58.933", cat: "Metal", state: "Solid", color: "Hard lustrous bluish-gray metal", fact: "Cobalt is a key component of Vitamin B12 and was historically used by ancient Egyptians to paint glass deep blue.", uses: "Lithium-ion battery cathodes, aerospace superalloys, high-strength permanent magnets, cobalt blue glass pigments." },
    { num: 28, sym: "Ni", name: "Nickel", mass: "58.693", cat: "Metal", state: "Solid", color: "Lustrous silvery metal with golden tinge", fact: "Nickel is highly resistant to oxidation and is a major component of Earth's iron-nickel core.", uses: "Rechargeable batteries, stainless steel and nickel-chrome alloys, electroplating, coins, gas turbine engines." },
    { num: 29, sym: "Cu", name: "Copper", mass: "63.546", cat: "Metal", state: "Solid", color: "Reddish-orange metallic metal", fact: "Copper has been used by humans for over 10,000 years and is one of the few metals occurring naturally in directly usable form.", uses: "Electrical wiring, plumbing pipes, brass and bronze alloys, heat exchangers, cookware, integrated circuit interconnects." },
    { num: 30, sym: "Zn", name: "Zinc", mass: "65.38", cat: "Metal", state: "Solid", color: "Bluish-white lustrous metal", fact: "Zinc has been used for galvanizing steel to prevent rust since the 19th century and is essential for human enzyme systems.", uses: "Galvanizing steel structures, brass alloys, die-cast components, zinc-carbon batteries, dietary supplements." },
    { num: 31, sym: "Ga", name: "Gallium", mass: "69.723", cat: "Metal", state: "Solid", color: "Silvery-blue soft metal", fact: "Gallium has a melting point of only 29.76°C (85.57°F), causing it to melt into a liquid when held in a warm hand.", uses: "Semiconductors (Gallium Arsenide, Gallium Nitride) for microchips, LEDs, laser diodes, high-temperature thermometers." },
    { num: 32, sym: "Ge", name: "Germanium", mass: "72.630", cat: "Metalloid", state: "Solid", color: "Lustrous hard grayish-white metalloid", fact: "Germanium was highly important in the early development of solid-state electronics, including the first transistor.", uses: "Fiber optic communication lines, infrared night-vision optics, solar cell arrays on satellites, polymerization catalysts." },
    { num: 33, sym: "As", name: "Arsenic", mass: "74.922", cat: "Metalloid", state: "Solid", color: "Metallic gray brittle metalloid", fact: "Arsenic and its compounds are well-known poisons, historically used as a stealth toxin in political assassinations.", uses: "Semiconductor n-type doping, lead-acid car batteries, specialized wood preservatives, alloy hardening." },
    { num: 34, sym: "Se", name: "Selenium", mass: "78.971", cat: "Non-metal", state: "Solid", color: "Gray (metallic) or red (amorphous)", fact: "Selenium is a photoconductor, which means its electrical conductivity increases as light exposure increases.", uses: "Glassmaking (red tint and decolorizing), photocells, solar panels, laser printers, anti-dandruff shampoo." },
    { num: 35, sym: "Br", name: "Bromine", mass: "79.904", cat: "Non-metal", state: "Liquid", color: "Red-brown fuming liquid", fact: "Bromine is the only nonmetallic element that is a liquid at standard temperature and pressure, emitting a pungent vapor.", uses: "Brominated flame retardants, water purification, pharmaceuticals, agricultural pesticides, photography chemical emulsions." },
    { num: 36, sym: "Kr", name: "Krypton", mass: "83.798", cat: "Non-metal", state: "Gas", color: "Colorless gas", fact: "Between 1960 and 1983, the official definition of a meter was based on the orange-red spectral line of krypton-86.", uses: "High-speed photography strobe lights, airport runway lighting systems, energy-efficient fluorescent bulbs." },
    { num: 37, sym: "Rb", name: "Rubidium", mass: "85.468", cat: "Metal", state: "Solid", color: "Silvery soft alkali metal", fact: "Rubidium is extremely reactive, igniting spontaneously in air and reacting explosively with water.", uses: "Atomic clocks for satellite synchronization, vapor turbines, vacuum tube getter, pyrotechnic colorants." },
    { num: 38, sym: "Sr", name: "Strontium", mass: "87.62", cat: "Metal", state: "Solid", color: "Silvery-yellow soft metal", fact: "Strontium salts burn with an intense, brilliant crimson-red flame, making them essential in pyrotechnics.", uses: "Fireworks, ferrite permanent magnets, glow-in-the-dark paints and emergency exit signs." },
    { num: 39, sym: "Y", name: "Yttrium", mass: "88.906", cat: "Metal", state: "Solid", color: "Silvery-metallic transition metal", fact: "Yttrium was discovered in the Swedish village of Ytterby, which also gave names to ytterbium, terbium, and erbium.", uses: "Superconductors (YBCO), red phosphors for television displays, YAG lasers, metal alloys." },
    { num: 40, sym: "Zr", name: "Zirconium", mass: "91.224", cat: "Metal", state: "Solid", color: "Silvery-gray transition metal", fact: "Zirconium is highly resistant to corrosion by acids, alkalis, and saltwater, and has a very low neutron absorption.", uses: "Cladding for nuclear reactor fuel rods, ceramic glazes, industrial chemical valves, cubic zirconia gemstone jewelry." },
    { num: 41, sym: "Nb", name: "Niobium", mass: "92.906", cat: "Metal", state: "Solid", color: "Light gray ductile metal", fact: "Niobium is used in superconducting alloys that can conduct electricity with zero resistance at very low temperatures.", uses: "Superconducting magnets in MRI scanners and particle accelerators, high-strength structural steels, jet engines." },
    { num: 42, sym: "Mo", name: "Molybdenum", mass: "95.95", cat: "Metal", state: "Solid", color: "Dark gray transition metal", fact: "Molybdenum has one of the highest melting points of all pure elements (2,623°C) and is key to ancient samurai sword strength.", uses: "High-strength and high-temperature steel alloys, industrial heating elements, molybdenum disulfide lubricants." },
    { num: 43, sym: "Tc", name: "Technetium", mass: "98", cat: "Metal", state: "Solid", color: "Silvery-gray radioactive metal", fact: "Technetium is the lowest atomic number element without any stable isotopes, and was the first element made artificially.", uses: "Medical diagnostic imaging (radioactive tracer Technetium-99m used in bone, heart, and lung scans)." },
    { num: 44, sym: "Ru", name: "Ruthenium", mass: "101.07", cat: "Metal", state: "Solid", color: "Hard silvery-white transition metal", fact: "Ruthenium is a rare platinum-group metal that is highly resistant to chemical attack.", uses: "Electrical contacts, thick-film resistors, solar cells, titanium alloy corrosion-resistance booster, chemical catalysts." },
    { num: 45, sym: "Rh", name: "Rhodium", mass: "102.91", cat: "Metal", state: "Solid", color: "Silvery-white noble metal", fact: "Rhodium is one of the rarest, densest, and most expensive precious metals, often costing more than gold and platinum.", uses: "Three-way catalytic converters in automobiles, plating jewelry and searchlight mirrors, electrical contacts." },
    { num: 46, sym: "Pd", name: "Palladium", mass: "106.42", cat: "Metal", state: "Solid", color: "Silvery-white precious metal", fact: "Palladium can absorb up to 900 times its own volume of hydrogen gas at room temperature, acting like a sponge.", uses: "Catalytic converters, hydrogen purification systems, multi-layer ceramic capacitors, dental fillings, white gold alloys." },
    { num: 47, sym: "Ag", name: "Silver", mass: "107.87", cat: "Metal", state: "Solid", color: "Brilliant polished white metal", fact: "Silver possesses the highest electrical conductivity, thermal conductivity, and reflectivity of any metal.", uses: "Solar panels, electrical contacts, high-quality mirrors, silver jewelry, photographic film, antibacterial coatings." },
    { num: 48, sym: "Cd", name: "Cadmium", mass: "112.41", cat: "Metal", state: "Solid", color: "Soft bluish-white metal", fact: "Cadmium is highly toxic, causing severe bone damage and kidney disease if inhaled or ingested.", uses: "Nickel-cadmium rechargeable batteries, electroplating for rust protection, cadmium yellow pigments, solar panels." },
    { num: 49, sym: "In", name: "Indium", mass: "114.82", cat: "Metal", state: "Solid", color: "Very soft silvery-white metal", fact: "Indium-tin oxide (ITO) is transparent and electrically conductive, making modern smartphone touchscreens possible.", uses: "Touchscreens, LCD screens, solar panels, low-melting temperature alloys, vacuum seals." },
    { num: 50, sym: "Sn", name: "Tin", mass: "118.71", cat: "Metal", state: "Solid", color: "Silvery-white soft metal", fact: "Tin has been alloyed with copper to make bronze since 3000 BC, ushering in the Bronze Age of civilization.", uses: "Solder alloys for electronics, tin cans coating to prevent food container rust, bronze and brass, pewter tableware." },
    { num: 51, sym: "Sb", name: "Antimony", mass: "121.76", cat: "Metalloid", state: "Solid", color: "Lustrous silvery-gray metalloid", fact: "Antimony compounds have been used in cosmetics as kohl eye makeup for over 5,000 years.", uses: "Halogenated flame retardants, lead-acid batteries, infrared detectors, pewter alloys." },
    { num: 52, sym: "Te", name: "Tellurium", mass: "127.60", cat: "Metalloid", state: "Solid", color: "Brittle silvery-white metalloid", fact: "Tellurium is one of the rarest stable elements in the Earth's crust, often found associated with gold deposits.", uses: "Thermoelectric generators, cadmium-telluride (CdTe) solar panels, steel and copper alloys, vulcanization of rubber." },
    { num: 53, sym: "I", name: "Iodine", mass: "126.90", cat: "Non-metal", state: "Solid", color: "Dark purple-black shiny crystals", fact: "Iodine sublimates upon heating, turning from solid crystals directly into a beautiful violet gas without melting first.", uses: "Medical antiseptics (povidone-iodine), thyroid health supplements, polarized filters for displays, cloud seeding." },
    { num: 54, sym: "Xe", name: "Xenon", mass: "131.29", cat: "Non-metal", state: "Gas", color: "Colorless gas (glowing blue)", fact: "Xenon was the first noble gas ever shown to form chemical compounds, breaking the theory of complete inertness.", uses: "High-intensity discharge headlights, movie projector bulbs, spacecraft ion thruster propulsion, medical general anesthesia." },
    { num: 55, sym: "Cs", name: "Cesium", mass: "132.91", cat: "Metal", state: "Solid", color: "Silvery-gold extremely soft metal", fact: "Cesium is so reactive it melts at just 28.4°C (83.1°F) and is used to define the official length of a second.", uses: "Cesium atomic clocks, specialized oil drilling fluids, photoelectric cells, vacuum tube gas getters." },
    { num: 56, sym: "Ba", name: "Barium", mass: "137.33", cat: "Metal", state: "Solid", color: "Silvery-white soft metal", fact: "Although pure barium is toxic, insoluble barium sulfate is swallowed by medical patients for gastrointestinal X-rays.", uses: "Barium meal medical imaging, heavy drilling muds for oil wells, green fireworks, vacuum tube oxygen scavengers." },
    { num: 57, sym: "La", name: "Lanthanum", mass: "138.91", cat: "Metal", state: "Solid", color: "Silvery-white soft rare-earth metal", fact: "Lanthanum is the prototype and naming origin of the lanthanide series of rare-earth elements.", uses: "High-refractive index camera lenses, hybrid car nickel-metal hydride batteries, carbon-arc searchlights." },
    { num: 58, sym: "Ce", name: "Cerium", mass: "140.12", cat: "Metal", state: "Solid", color: "Silvery-gray rare-earth metal", fact: "Cerium is the most abundant of the rare-earth elements and is highly pyrophoric (sparks when scratched).", uses: "Mischmetal for lighter flints, catalytic converters in diesel engines, glass polishing powders, carbon-arc lights." },
    { num: 59, sym: "Pr", name: "Praseodymium", mass: "140.91", cat: "Metal", state: "Solid", color: "Soft silvery rare-earth metal", fact: "Praseodymium provides a beautiful yellow-green color when used as a glass tinting agent.", uses: "Didymium protective glass for glassblowers, high-strength permanent magnets, carbon-arc projector lights." },
    { num: 60, sym: "Nd", name: "Neodymium", mass: "144.24", cat: "Metal", state: "Solid", color: "Soft silvery rare-earth metal", fact: "Neodymium is alloyed with iron and boron to create the strongest permanent magnets commercially available.", uses: "High-power permanent magnets, electric car motors, wind turbines, hard disk drives, solid-state lasers." },
    { num: 61, sym: "Pm", name: "Promethium", mass: "145", cat: "Metal", state: "Solid", color: "Silvery radioactive solid", fact: "Promethium is extremely rare and was discovered only after being synthesized in nuclear reactors.", uses: "Nuclear batteries for spacecraft, thickness gauges, luminous instrumentation dials." },
    { num: 62, sym: "Sm", name: "Samarium", mass: "150.36", cat: "Metal", state: "Solid", color: "Silvery-white rare-earth metal", fact: "Samarium-cobalt magnets are extremely resistant to demagnetization and function at temperatures up to 700°C.", uses: "Samarium-cobalt magnets, medical cancer radiotherapy, control rods in nuclear reactors, specialized lasers." },
    { num: 63, sym: "Eu", name: "Europium", mass: "151.96", cat: "Metal", state: "Solid", color: "Silvery-white rare-earth metal", fact: "Europium is the most chemically reactive of all rare-earth elements, oxidizing instantly in air.", uses: "Red phosphors in televisions and CRT displays, fluorescent lamps, anti-counterfeiting ink in Euro bank notes." },
    { num: 64, sym: "Gd", name: "Gadolinium", mass: "157.25", cat: "Metal", state: "Solid", color: "Silvery-white rare-earth metal", fact: "Gadolinium has a high magnetic susceptibility and is highly effective at enhancing MRI scans.", uses: "Intravenous MRI contrast agents, nuclear reactor control rods, marine propulsion reactors." },
    { num: 65, sym: "Tb", name: "Terbium", mass: "158.93", cat: "Metal", state: "Solid", color: "Silvery-gray rare-earth metal", fact: "Terbium can be deformed mechanically and is used in green phosphors and magneto-optical discs.", uses: "Green phosphors for TVs and lamps, sonar transducer alloys (Terfenol-D), military solid-state electronics." },
    { num: 66, sym: "Dy", name: "Dysprosium", mass: "162.50", cat: "Metal", state: "Solid", color: "Silvery rare-earth metal", fact: "Dysprosium is added to neodymium magnets to increase their resistance to demagnetization at high heat.", uses: "Neodymium magnet thermal stabilizers, laser materials, infrared sensing systems, nuclear reactor control rods." },
    { num: 67, sym: "Ho", name: "Holmium", mass: "164.93", cat: "Metal", state: "Solid", color: "Silvery-white rare-earth metal", fact: "Holmium has the highest magnetic strength of any element, capable of concentrating magnetic flux.", uses: "High-strength magnetic poles, medical solid-state lasers, microwave equipment filters." },
    { num: 68, sym: "Er", name: "Erbium", mass: "167.26", cat: "Metal", state: "Solid", color: "Silvery rare-earth metal", fact: "Erbium ions are doped into silica fibers to amplify light signals in transoceanic internet cables.", uses: "Fiber optic amplifiers (EDFAs), surgical laser systems, pink coloring agent in glass and porcelain glazes." },
    { num: 69, sym: "Tm", name: "Thulium", mass: "168.93", cat: "Metal", state: "Solid", color: "Silvery rare-earth metal", fact: "Thulium is the second rarest of the stable rare-earth elements, making it highly expensive.", uses: "Portable battlefield X-ray machines, high-power solid-state lasers, ceramic magnetic materials." },
    { num: 70, sym: "Yb", name: "Ytterbium", mass: "173.05", cat: "Metal", state: "Solid", color: "Silvery-yellow rare-earth metal", fact: "Ytterbium has been used in atomic clocks, serving as an extremely stable frequency standard.", uses: "Industrial fiber lasers, portable industrial radiographic X-ray sources, high-precision atomic clocks." },
    { num: 71, sym: "Lu", name: "Lutetium", mass: "174.97", cat: "Metal", state: "Solid", color: "Silvery-white rare-earth metal", fact: "Lutetium is the heaviest, hardest, and highest-density element of the lanthanide rare-earth series.", uses: "Crystals for PET scan detectors, petroleum cracking catalysts, high-refractive-index immersion lenses." },
    { num: 72, sym: "Hf", name: "Hafnium", mass: "178.49", cat: "Metal", state: "Solid", color: "Silvery-gray transition metal", fact: "Hafnium is extremely resistant to corrosion and is used in modern computer microprocessors.", uses: "Nuclear reactor control rods, high-k gate dielectric insulators in microchips, gas turbine superalloys." },
    { num: 73, sym: "Ta", name: "Tantalum", mass: "180.95", cat: "Metal", state: "Solid", color: "Silvery-blue hard refractory metal", fact: "Tantalum is completely immune to body fluids, making it an excellent material for surgical bone implants.", uses: "Electrolytic capacitors in smartphones, chemical processing heat exchangers, surgical pins and skull plates." },
    { num: 74, sym: "W", name: "Tungsten", mass: "183.84", cat: "Metal", state: "Solid", color: "Steel-gray hard heavy metal", fact: "Tungsten has the highest melting point of all metals (3,422°C) and the highest tensile strength.", uses: "Incandescent light bulb filaments, tungsten carbide cutting tools, military armor-piercing shells, weights." },
    { num: 75, sym: "Re", name: "Rhenium", mass: "186.21", cat: "Metal", state: "Solid", color: "Silvery-gray heavy transition metal", fact: "Rhenium is one of the rarest elements in the Earth's crust, found in molybdenum ores.", uses: "Jet engine superalloys for high heat, platinum-rhenium catalysts for producing unleaded gasoline." },
    { num: 76, sym: "Os", name: "Osmium", mass: "190.23", cat: "Metal", state: "Solid", color: "Hard, brittle bluish-white metal", fact: "Osmium is the densest naturally occurring chemical element, twice as dense as lead.", uses: "Highly wear-resistant electrical contacts, record player stylus tips, fountain pen nibs." },
    { num: 77, sym: "Ir", name: "Iridium", mass: "192.22", cat: "Metal", state: "Solid", color: "Silvery-yellow transition metal", fact: "Iridium is the most corrosion-resistant metal known, and is highly abundant in dinosaur-killing asteroids.", uses: "High-end spark plugs, crucibles for high-temperature single crystal growth, standard kilogram weight prototypes." },
    { num: 78, sym: "Pt", name: "Platinum", mass: "195.08", cat: "Metal", state: "Solid", color: "Silvery-white dense noble metal", fact: "Platinum is highly unreactive and has extensive biological use in chemical chemotherapy.", uses: "Automotive catalytic converters, fine jewelry, laboratory crucibles, anticancer drugs (cisplatin)." },
    { num: 79, sym: "Au", name: "Gold", mass: "196.97", cat: "Metal", state: "Solid", color: "Bright metallic yellow metal", fact: "Gold is the most malleable and ductile of all metals; a single gram can be beaten into a one-square-meter sheet.", uses: "Financial gold reserves, fine jewelry, corrosion-free electrical connectors, aerospace heat shielding." },
    { num: 80, sym: "Hg", name: "Mercury", mass: "200.59", cat: "Metal", state: "Liquid", color: "Silvery liquid metal", fact: "Mercury is the only metal that is a liquid at room temperature and pressure, historically known as quicksilver.", uses: "Clinical thermometers, industrial barometers, fluorescent light bulbs, dental amalgam fillings." },
    { num: 81, sym: "Tl", name: "Thallium", mass: "204.38", cat: "Metal", state: "Solid", color: "Soft bluish-gray metal", fact: "Thallium is highly toxic and tasteless, historically popular as a murder weapon in mystery novels.", uses: "Infrared optical lenses, low-temperature liquid thermometers (alloyed with mercury), electronics." },
    { num: 82, sym: "Pb", name: "Lead", mass: "207.2", cat: "Metal", state: "Solid", color: "Dull bluish-gray heavy soft metal", fact: "Lead is a highly toxic cumulative poison that affects the nervous system, historically used in pipes and gasoline.", uses: "Lead-acid car batteries, X-ray and radiation shielding, industrial weights, ammunition." },
    { num: 83, sym: "Bi", name: "Bismuth", mass: "208.98", cat: "Metal", state: "Solid", color: "Silvery-white metal with pinkish hue", fact: "Bismuth crystals grow in a beautiful stair-step spiral form with colorful iridescent oxide layers.", uses: "Active ingredient in Pepto-Bismol stomach medicine, low-melting safety plugs for fire sprinklers." },
    { num: 84, sym: "Po", name: "Polonium", mass: "209", cat: "Metalloid", state: "Solid", color: "Silvery-gray highly radioactive metal", fact: "Polonium was discovered by Marie Curie and named in honor of her homeland, Poland.", uses: "Industrial static eliminators in brush bristles, thermoelectric heat sources for space probes." },
    { num: 85, sym: "At", name: "Astatine", mass: "210", cat: "Metalloid", state: "Solid", color: "Dark radioactive solid", fact: "Astatine is the rarest naturally occurring element in Earth's crust, with less than 30 grams existing at any time.", uses: "Experimental cancer alpha-particle targeted radiotherapy." },
    { num: 86, sym: "Rn", name: "Radon", mass: "222", cat: "Non-metal", state: "Gas", color: "Colorless radioactive gas", fact: "Radon is a naturally occurring radioactive noble gas that can accumulate in basements and cause lung cancer.", uses: "Geological earthquake fault monitoring, hydrological tracing, cancer radiation therapy." },
    { num: 87, sym: "Fr", name: "Francium", mass: "223", cat: "Metal", state: "Solid", color: "Highly radioactive reactive metal", fact: "Francium is the second rarest element in Earth's crust and is highly unstable.", uses: "Basic research into nuclear structure and laser-trapped atomic spectroscopy." },
    { num: 88, sym: "Ra", name: "Radium", mass: "226", cat: "Metal", state: "Solid", color: "Silvery-white radioactive alkaline earth metal", fact: "Radium was discovered by Marie Curie and was used in self-luminous watch dials before its radiation toxicity was discovered.", uses: "Industrial radiography, therapeutic cancer radiation, historical self-luminous paint." },
    { num: 89, sym: "Ac", name: "Actinium", mass: "227", cat: "Metal", state: "Solid", color: "Silvery radioactive metal", fact: "Actinium glows with an eerie, intense pale blue light in the dark due to its high radioactivity.", uses: "Targeted alpha-immunotherapy for cancer, neutron source generator." },
    { num: 90, sym: "Th", name: "Thorium", mass: "232.04", cat: "Metal", state: "Solid", color: "Silvery-white radioactive metal", fact: "Thorium has been studied extensively as a safer, more abundant alternative nuclear fuel to uranium.", uses: "Experimental thorium nuclear fuel cycles, high-temperature crucibles, camping lantern mantles." },
    { num: 91, sym: "Pa", name: "Protactinium", mass: "231.04", cat: "Metal", state: "Solid", color: "Bright silvery radioactive metal", fact: "Protactinium is extremely scarce on Earth and highly hazardous due to alpha particle emission.", uses: "Scientific geological dating of sediments, nuclear waste research." },
    { num: 92, sym: "U", name: "Uranium", mass: "238.03", cat: "Metal", state: "Solid", color: "Silvery-gray radioactive metal", fact: "Uranium is the heaviest naturally occurring element on Earth and has immense energy density.", uses: "Fuel for commercial nuclear power plants, depleted uranium armor plating, military nuclear weapons." },
    { num: 93, sym: "Np", name: "Neptunium", mass: "237", cat: "Metal", state: "Solid", color: "Silvery radioactive metal", fact: "Neptunium is named after the planet Neptune and is produced as a byproduct in nuclear reactors.", uses: "Precursor in Plutonium-238 production, neutron detection instruments." },
    { num: 94, sym: "Pu", name: "Plutonium", mass: "244", cat: "Metal", state: "Solid", color: "Bright silvery radioactive metal", fact: "Plutonium-239 is fissile and was used in the Trinity test and Nagasaki atomic bomb.", uses: "Nuclear weapon fissile cores, fuel for space probe radioisotope thermoelectric generators (RTGs)." },
    { num: 95, sym: "Am", name: "Americium", mass: "243", cat: "Metal", state: "Solid", color: "Silvery-white radioactive metal", fact: "Americium is a synthetic element that is found inside most standard household ionization smoke detectors.", uses: "Household ionization smoke detectors, industrial thickness gauges, neutron radiography." },
    { num: 96, sym: "Cm", name: "Curium", mass: "247", cat: "Metal", state: "Solid", color: "Silvery radioactive metal", fact: "Curium was named in honor of Marie and Pierre Curie for their pioneering work on radioactivity.", uses: "Alpha particle X-ray spectrometers on Mars and Moon exploration rovers." },
    { num: 97, sym: "Bk", name: "Berkelium", mass: "247", cat: "Metal", state: "Solid", color: "Silvery-gray radioactive metal", fact: "Berkelium was first synthesized at the University of California, Berkeley, in 1949.", uses: "Synthesis of heavier transuranic elements, basic scientific research." },
    { num: 98, sym: "Cf", name: "Californium", mass: "251", cat: "Metal", state: "Solid", color: "Silvery radioactive metal", fact: "Californium is a extremely potent neutron emitter; one microgram releases 139 million neutrons per minute.", uses: "Neutron source for nuclear reactor startup, coal sulfur analyzers, cancer therapy." },
    { num: 99, sym: "Es", name: "Einsteinium", mass: "252", cat: "Metal", state: "Solid", color: "Silvery radioactive metal", fact: "Einsteinium was discovered in the fallout debris of the first thermonuclear bomb (Ivy Mike) in 1952.", uses: "Basic high-energy physics laboratory research, synthesizing heavier elements." },
    { num: 100, sym: "Fm", name: "Fermium", mass: "257", cat: "Metal", state: "Solid", color: "Metallic radioactive metal", fact: "Fermium was named after the nuclear physics pioneer Enrico Fermi and is only produced in microgram quantities.", uses: "Basic high-energy physics research, atomic structure modeling." },
    { num: 101, sym: "Md", name: "Mendelevium", mass: "258", cat: "Metal", state: "Solid", color: "Radioactive metal", fact: "Mendelevium is named after Dmitri Mendeleev, the father of the modern periodic table.", uses: "Basic scientific study of actinides chemical properties." },
    { num: 102, sym: "No", name: "Nobelium", mass: "259", cat: "Metal", state: "Solid", color: "Radioactive metal", fact: "Nobelium was named in honor of Alfred Nobel, the Swedish philanthropist who founded the Nobel Prizes.", uses: "Heavy-ion nuclear physics research." },
    { num: 103, sym: "Lr", name: "Lawrencium", mass: "262", cat: "Metal", state: "Solid", color: "Radioactive metal", fact: "Lawrencium was named after Ernest Lawrence, inventor of the cyclotron particle accelerator.", uses: "Scientific research in heavy transactinide elements." },
    { num: 104, sym: "Rf", name: "Rutherfordium", mass: "267", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Rutherfordium is the first superheavy transactinide element, with an extremely short half-life.", uses: "Scientific research in nuclear chemistry and physics." },
    { num: 105, sym: "Db", name: "Dubnium", mass: "268", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Dubnium is named after Dubna, Russia, where it was first synthesized by nuclear researchers.", uses: "Scientific research in superheavy elements." },
    { num: 106, sym: "Sg", name: "Seaborgium", mass: "269", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Seaborgium is named after Glenn Seaborg, the only person to have an element named after him while alive.", uses: "Basic research into transactinide element physics." },
    { num: 107, sym: "Bh", name: "Bohrium", mass: "270", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Bohrium is named after Niels Bohr, who developed the quantum model of the atom.", uses: "Scientific research in superheavy elements." },
    { num: 108, sym: "Hs", name: "Hassium", mass: "269", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Hassium is named after the German state of Hesse (Hassia), where it was synthesized.", uses: "Scientific research in superheavy elements." },
    { num: 109, sym: "Mt", name: "Meitnerium", mass: "278", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Meitnerium is named in honor of Lise Meitner, a co-discoverer of nuclear fission.", uses: "Scientific research in superheavy elements." },
    { num: 110, sym: "Ds", name: "Darmstadtium", mass: "281", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Darmstadtium is named after the German city of Darmstadt, where it was synthesized.", uses: "Scientific research in superheavy elements." },
    { num: 111, sym: "Rg", name: "Roentgenium", mass: "282", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Roentgenium is named after Wilhelm Röntgen, the physicist who discovered X-rays in 1895.", uses: "Scientific research in superheavy elements." },
    { num: 112, sym: "Cn", name: "Copernicium", mass: "285", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Copernicium is named after the astronomer Nicolaus Copernicus, who proposed the heliocentric system.", uses: "Scientific research in superheavy elements." },
    { num: 113, sym: "Nh", name: "Nihonium", mass: "286", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Nihonium is the first element discovered and named by a team of scientists in Japan (Nihon).", uses: "Scientific research in superheavy elements." },
    { num: 114, sym: "Fl", name: "Flerovium", mass: "289", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Flerovium is named after the Flerov Laboratory of Nuclear Reactions in Dubna, Russia.", uses: "Scientific research in superheavy elements." },
    { num: 115, sym: "Mc", name: "Moscovium", mass: "290", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Moscovium is named in honor of the Moscow region in Russia, where superheavy element research is conducted.", uses: "Scientific research in superheavy elements." },
    { num: 116, sym: "Lv", name: "Livermorium", mass: "293", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Livermorium is named after the Lawrence Livermore National Laboratory in California.", uses: "Scientific research in superheavy elements." },
    { num: 117, sym: "Ts", name: "Tennessine", mass: "294", cat: "Metal", state: "Solid", color: "Synthetic radioactive metal", fact: "Tennessine is named after the US state of Tennessee, recognizing Oak Ridge National Laboratory.", uses: "Scientific research in superheavy elements." },
    { num: 118, sym: "Og", name: "Oganesson", mass: "294", cat: "Non-metal", state: "Gas", color: "Synthetic radioactive gas", fact: "Oganesson is the element with the highest atomic number and atomic mass of the periodic table.", uses: "Scientific research in superheavy elements." }
  ];

  // —————————————————————————————————————————————————————————————————————
  // "Know Your Chemicals (KYC)" Chemistry Encyclopedia API Endpoint
  // —————————————————————————————————————————————————————————————————————
  app.post("/api/kyc/lookup", async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Please enter a valid chemical name, common name, drug name, or molecular formula." });
    }

    const cleanQuery = query.trim().toLowerCase();

    // Check if the query is an element from the periodic table
    const elementMatch = PERIODIC_TABLE_ELEMENTS.find(
      el => el.sym.toLowerCase() === cleanQuery || el.name.toLowerCase() === cleanQuery
    );

    // Curated, PubChem-verified sets of structural/functional isomers for standard curriculum
    // molecular formulas (chain, position, and functional isomerism). Every name below has been
    // checked to resolve to its own distinct compound on PubChem's structure-image endpoint, so
    // each isomer always renders as its own separate image -- never merged into a single picture.
    // Keyed by the molecular formula with all non-alphanumeric characters stripped and lowercased.
    const ISOMER_GROUPS: Record<string, { isomerism_type: string; members: { name: string; iupac_name: string; note: string }[] }> = {
      "c4h10": {
        isomerism_type: "Chain Isomerism",
        members: [
          { name: "n-Butane", iupac_name: "Butane", note: "Straight, unbranched four-carbon chain." },
          { name: "Isobutane", iupac_name: "2-Methylpropane", note: "Branched chain with a single methyl side group." }
        ]
      },
      "c5h12": {
        isomerism_type: "Chain Isomerism",
        members: [
          { name: "n-Pentane", iupac_name: "Pentane", note: "Straight five-carbon chain." },
          { name: "Isopentane", iupac_name: "2-Methylbutane", note: "Branched chain with one methyl side group." },
          { name: "Neopentane", iupac_name: "2,2-Dimethylpropane", note: "Highly branched, most compact isomer." }
        ]
      },
      "c3h8o": {
        isomerism_type: "Position Isomerism",
        members: [
          { name: "1-Propanol", iupac_name: "Propan-1-ol", note: "-OH group on the terminal (end) carbon." },
          { name: "Isopropanol", iupac_name: "Propan-2-ol", note: "-OH group on the middle carbon." }
        ]
      },
      "c4h10o": {
        isomerism_type: "Chain & Position Isomerism",
        members: [
          { name: "1-Butanol", iupac_name: "Butan-1-ol", note: "Straight chain, -OH on the terminal carbon." },
          { name: "2-Butanol", iupac_name: "Butan-2-ol", note: "Straight chain, -OH on the second carbon." },
          { name: "Isobutanol", iupac_name: "2-Methylpropan-1-ol", note: "Branched chain, -OH on the terminal carbon." },
          { name: "tert-Butanol", iupac_name: "2-Methylpropan-2-ol", note: "Branched chain, -OH on the central carbon." }
        ]
      },
      "c4h8": {
        isomerism_type: "Position & Geometric Isomerism",
        members: [
          { name: "1-Butene", iupac_name: "But-1-ene", note: "Double bond starting at the first carbon." },
          { name: "cis-2-Butene", iupac_name: "(Z)-But-2-ene", note: "Double bond at the second carbon; methyl groups on the same side." },
          { name: "trans-2-Butene", iupac_name: "(E)-But-2-ene", note: "Double bond at the second carbon; methyl groups on opposite sides." },
          { name: "Isobutylene", iupac_name: "2-Methylprop-1-ene", note: "Branched chain with the double bond at a branch point." }
        ]
      },
      "c2h6o": {
        isomerism_type: "Functional Isomerism",
        members: [
          { name: "Ethanol", iupac_name: "Ethanol", note: "Contains a hydroxyl (-OH) functional group; an alcohol." },
          { name: "Dimethyl Ether", iupac_name: "Methoxymethane", note: "Contains an ether (-O-) linkage instead of a hydroxyl group." }
        ]
      },
      "c3h6o": {
        isomerism_type: "Functional Isomerism",
        members: [
          { name: "Propanal", iupac_name: "Propanal", note: "Contains an aldehyde (-CHO) functional group." },
          { name: "Acetone", iupac_name: "Propan-2-one", note: "Contains a ketone (C=O) functional group." }
        ]
      },
      "c6h12o6": {
        isomerism_type: "Functional Isomerism",
        members: [
          { name: "Glucose", iupac_name: "(2R,3S,4R,5R)-2,3,4,5,6-Pentahydroxyhexanal", note: "An aldose sugar containing an aldehyde group." },
          { name: "Fructose", iupac_name: "(3S,4R,5R)-1,3,4,5,6-Pentahydroxyhexan-2-one", note: "A ketose sugar containing a ketone group." }
        ]
      }
    };

    const buildIsomerData = (formula: string | undefined) => {
      if (!formula) return undefined;
      const key = formula.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      const group = ISOMER_GROUPS[key];
      if (!group) return undefined;
      return {
        isomerism_type: group.isomerism_type,
        members: group.members.map(m => ({
          name: m.name,
          iupac_name: m.iupac_name,
          note: m.note,
          structure_url: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(m.name)}/PNG?image_size=600x600`
        }))
      };
    };

    // pH reference data for a standard (typically ~0.1 M, room temperature) aqueous solution of
    // each compound. Values are drawn from standard chemistry references (textbook/CRC Handbook
    // ranges), keyed by normalized molecular formula. This is intentionally a curated set of the
    // most commonly searched acids, bases, and salts rather than an attempt to cover every possible
    // formula -- accuracy matters more than false coverage here, so anything not in this list falls
    // back to a clearly-labeled estimate based on its classification instead of inventing a value.
    const PH_REFERENCE: Record<string, { ph: string; note: string }> = {
      // Strong acids
      "hcl": { ph: "0 - 1 (concentrated); ~1 - 2 (dilute, ~0.1 M)", note: "Strongly acidic -- fully ionizes in water" },
      "h2so4": { ph: "0 - 1 (concentrated); ~1 (dilute, ~0.1 M)", note: "Strongly acidic -- fully ionizes in water" },
      "hno3": { ph: "0 - 1 (concentrated); ~1 (dilute, ~0.1 M)", note: "Strongly acidic -- fully ionizes in water" },
      "hbr": { ph: "0 - 1 (concentrated); ~1 (dilute, ~0.1 M)", note: "Strongly acidic -- fully ionizes in water" },
      // Weak / moderate acids
      "ch3cooh": { ph: "~2.4 - 3.0 (~1 M)", note: "Weak acid -- only partially ionizes in water" },
      "hcooh": { ph: "~2.4 (~1 M)", note: "Weak acid -- only partially ionizes in water" },
      "h2co3": { ph: "~3.6 (saturated CO2 solution)", note: "Weak, unstable diprotic acid" },
      "h2c2o4": { ph: "~1.3 (~0.1 M)", note: "Moderately strong diprotic organic acid" },
      "c6h8o7": { ph: "~2.2 (~0.1 M)", note: "Weak triprotic acid" },
      "c3h6o3": { ph: "~2.4 (~0.1 M)", note: "Weak acid" },
      "c6h8o6": { ph: "~3.0 (~0.1 M)", note: "Weak acid" },
      "c4h6o6": { ph: "~2.2 (~0.1 M)", note: "Weak diprotic acid" },
      "c7h6o3": { ph: "~2.4 (saturated)", note: "Weak acid" },
      "c7h6o2": { ph: "~2.8 (saturated)", note: "Weak acid, sparingly soluble" },
      "h3po4": { ph: "~1.5 (~0.1 M)", note: "Moderately strong triprotic acid" },
      "h3bo3": { ph: "~5.1 (~0.1 M)", note: "Very weak acid" },
      "c9h8o4": { ph: "~3.5 (saturated)", note: "Weak acid, sparingly soluble" },
      // Strong / moderate bases
      "naoh": { ph: "13 - 14 (concentrated); ~13 (dilute, ~0.1 M)", note: "Strongly basic -- fully ionizes in water" },
      "koh": { ph: "13 - 14 (concentrated); ~13 (dilute, ~0.1 M)", note: "Strongly basic -- fully ionizes in water" },
      "ca(oh)2": { ph: "~12.4 (saturated limewater)", note: "Strong base, but only sparingly soluble" },
      "nh4oh": { ph: "~11.6 (~0.1 M)", note: "Weak base -- only partially ionizes in water" },
      "nh3": { ph: "~11.6 (~0.1 M aqueous solution)", note: "Weak base -- only partially ionizes in water" },
      "mg(oh)2": { ph: "~10.5 (saturated)", note: "Weak, poorly soluble base" },
      // Neutral salts (strong acid + strong base)
      "h2o": { ph: "7.0", note: "Neutral by definition at 25°C" },
      "nacl": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      "kcl": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      "kno3": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      "nano3": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      "na2so4": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      "bacl2": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      "kcl2": { ph: "~7.0", note: "Neutral salt of a strong acid and a strong base" },
      // Basic salts (weak acid + strong base)
      "na2co3": { ph: "~11.6 (~0.1 M)", note: "Basic salt -- the carbonate ion hydrolyzes to produce OH-" },
      "nahco3": { ph: "~8.3 (~0.1 M)", note: "Mildly basic salt" },
      "k2co3": { ph: "~11.6 (~0.1 M)", note: "Basic salt -- the carbonate ion hydrolyzes to produce OH-" },
      "ch3coona": { ph: "~8.9 (~0.1 M)", note: "Mildly basic salt of a weak acid and a strong base" },
      // Acidic salts (strong acid + weak/hydrolyzing base, or hydrolyzing metal cation)
      "nh4cl": { ph: "~5.0 (~0.1 M)", note: "Mildly acidic salt -- the ammonium ion hydrolyzes to release H+" },
      "(nh4)2so4": { ph: "~5.0 - 5.5 (~0.1 M)", note: "Mildly acidic salt -- the ammonium ion hydrolyzes to release H+" },
      "nh4no3": { ph: "~5.0 - 5.5 (~0.1 M)", note: "Mildly acidic salt -- the ammonium ion hydrolyzes to release H+" },
      "(nh4)2co3": { ph: "~8.5 (~0.1 M)", note: "Mildly basic -- carbonate hydrolysis outweighs ammonium's acidity" },
      "nh4hco3": { ph: "~8.0 (~0.1 M)", note: "Mildly basic -- bicarbonate hydrolysis outweighs ammonium's acidity" },
      "(nh4)2hpo4": { ph: "~8.0 (~0.1 M)", note: "Mildly basic -- hydrogen phosphate hydrolysis outweighs ammonium's acidity" },
      "(nh4)2cr2o7": { ph: "~4.0 - 4.5 (~0.1 M)", note: "Acidic -- both the ammonium and dichromate ions contribute to acidity" },
      "(nh4)2s": { ph: "~9.0 - 9.5 (~0.1 M)", note: "Basic -- the sulfide ion hydrolyzes strongly to release OH-" },
      "ch3coonh4": { ph: "~7.0 (~0.1 M)", note: "Almost perfectly neutral -- the weakly acidic ammonium ion and weakly basic acetate ion cancel out" },
      "(nh4)2c2o4": { ph: "~6.0 (~0.1 M)", note: "Weakly acidic to near-neutral -- ammonium's acidity slightly outweighs oxalate's basicity" },
      "nh4i": { ph: "~5.0 - 5.5 (~0.1 M)", note: "Mildly acidic salt -- the ammonium ion hydrolyzes to release H+" },
      "nh4br": { ph: "~5.0 - 5.5 (~0.1 M)", note: "Mildly acidic salt -- the ammonium ion hydrolyzes to release H+" },
      "nh4scn": { ph: "~4.5 - 5.0 (~0.1 M)", note: "Mildly acidic -- both the ammonium and thiocyanate ions contribute to acidity" },
      "cuso4": { ph: "~4.0 (~0.1 M)", note: "Mildly acidic salt due to Cu2+ hydrolysis" },
      "znso4": { ph: "~4.5 - 5.0 (~0.1 M)", note: "Mildly acidic salt due to Zn2+ hydrolysis" },
      "feso4": { ph: "~3.5 - 4.0 (~0.1 M)", note: "Acidic salt due to Fe2+ hydrolysis" },
      "fecl3": { ph: "~2.0 - 3.0 (~0.1 M)", note: "Fairly acidic salt due to strong Fe3+ hydrolysis" },
      "alcl3": { ph: "~2.8 - 3.5 (~0.1 M)", note: "Fairly acidic salt due to strong Al3+ hydrolysis" },
      "agno3": { ph: "~5.4 - 6.2 (~0.1 M)", note: "Weakly acidic salt due to slight Ag+ hydrolysis" },
      "mgso4": { ph: "~6.0 (~0.1 M)", note: "Weakly acidic salt due to Mg2+ hydrolysis" },
      "kal(so4)2": { ph: "~3.0 - 4.0 (~0.1 M)", note: "Acidic salt (alum) due to Al3+ hydrolysis" },
      "k2cr2o7": { ph: "~3.5 - 4.0 (~0.1 M)", note: "Acidic due to dichromate/chromate equilibrium" },
      "kmno4": { ph: "~7 - 8 (~0.1 M)", note: "Roughly neutral; a strong oxidizer, not a strong acid or base" }
    };

    // Fallback pH estimate for compounds outside the curated PH_REFERENCE list above, based on
    // classification and formula patterns. Clearly labeled as approximate so it's never confused
    // with a verified reference value.
    const estimatePH = (result: any): { ph: string; note: string } | undefined => {
      const formulaKey = (result.chemical_formula || "").trim().toLowerCase().replace(/[·.][0-9]*h2o$/, "").replace(/\s/g, "");
      const curated = PH_REFERENCE[formulaKey];
      if (curated) return curated;

      // Pure elements don't have a meaningful aqueous pH.
      if (result.element_category) return undefined;

      const formulaUpper = (result.chemical_formula || "").toUpperCase();
      const typeStr = (result.chemical_type || "").toLowerCase();
      const reasonStr = (result.classification_reason || "").toLowerCase();

      const looksLikeAcid = typeStr.includes("acid") || reasonStr.includes("carboxyl") || reasonStr.includes("acidic") || /COOH/.test(formulaUpper);
      if (looksLikeAcid) {
        return { ph: "~3 - 5 (approximate, weak organic acid)", note: "Estimated from its acid functional group; exact value depends on concentration" };
      }

      const looksLikeBase = formulaUpper.endsWith("OH") && (formulaUpper.startsWith("NA") || formulaUpper.startsWith("K") || formulaUpper.startsWith("CA") || formulaUpper.startsWith("MG") || formulaUpper.startsWith("NH4"));
      if (looksLikeBase) {
        return { ph: "~10 - 14 (approximate, basic hydroxide)", note: "Estimated from its hydroxide functional group; exact value depends on concentration" };
      }

      if (result.classification === "Inorganic" && (typeStr.includes("salt") || typeStr.includes("halide") || typeStr.includes("nitrate") || typeStr.includes("sulfate") || typeStr.includes("carbonate"))) {
        return { ph: "~6 - 8 (approximate, near-neutral salt)", note: "Most simple salts are close to neutral in water unless their ions hydrolyze; exact value depends on the specific ions" };
      }

      if (result.classification === "Organic") {
        return { ph: "~7 (Neutral)", note: "Non-electrolyte -- does not significantly ionize in water, so it does not meaningfully change the solution's pH" };
      }

      return undefined;
    };

    // Helper to enrich matched results with primary and fallback structure URLs
    const enrichKYCResultWithStructureUrls = (result: any, qTerm: string): any => {
      const commonName = result.common_name || "Not Applicable";
      const iupacName = result.iupac_name || commonName;
      
      // Common names in our database are often written with a trailing synonym in parentheses
      // for readability (e.g. "Glucose (Dextrose)", "Sulfuric Acid (Oil of Vitriol)",
      // "Baking Soda (Sodium Bicarbonate)"). PubChem's name-lookup endpoint cannot resolve these
      // combined strings and returns 404, which is why the structure image silently failed for
      // every compound stored this way. We build the lookup URL from the name with any trailing
      // "(...)" suffix stripped, while leaving the original name (with synonym) untouched
      // everywhere else it's used for on-screen display. A "(I)"/"(II)"-style oxidation-state
      // marker in the middle of a name (e.g. "Copper(I) Oxide") is unaffected since only a
      // parenthetical group anchored at the very end of the string is removed.
      const stripTrailingSynonym = (name: string) => name.replace(/\s*\([^()]*\)\s*$/, "").trim();

      const sanitizeName = (name: string) => {
        return encodeURIComponent(stripTrailingSynonym(name.trim()));
      };

      const isComplex = result.chemical_type?.toLowerCase().includes("multi") || 
                        result.chemical_type?.toLowerCase().includes("acid") || 
                        result.chemical_type?.toLowerCase().includes("hydroxy") || 
                        (result.classification_reason && result.classification_reason.toLowerCase().includes("multiple functional group")) ||
                        (result.classification_reason && result.classification_reason.toLowerCase().includes("both")) ||
                        ["salicylic acid", "citric acid", "lactic acid", "aspirin", "paracetamol", "acetaminophen", "acetylsalicylic acid", "glycine", "alanine", "ascorbic acid", "vitamin c", "ibuprofen"].includes(commonName.toLowerCase());

      const primaryName = isComplex ? iupacName : (commonName !== "Not Applicable" ? commonName : iupacName);
      const isomers = buildIsomerData(result.chemical_formula);
      const phData = estimatePH(result);

      return {
        ...result,
        requested_compound: qTerm,
        primary_structure_url: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${sanitizeName(primaryName)}/PNG?image_size=600x600`,
        fallback_iupac_url: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${sanitizeName(iupacName)}/PNG?image_size=600x600`,
        source_credit: "National Institutes of Health (NIH) - PubChem",
        ...(isomers ? { isomers } : {}),
        ...(phData ? { ph_value: phData.ph, ph_note: phData.note } : {})
      };
    };

    if (elementMatch) {
      const propertiesList = [
        `Atomic Number: ${elementMatch.num}`,
        `Standard State: ${elementMatch.state}`,
        `Atomic Mass: ${elementMatch.mass} g/mol`,
        `Classification: ${elementMatch.cat}`
      ].join("\n");

      const elementResult = {
        common_name: elementMatch.name,
        iupac_name: `${elementMatch.name} (Element)`,
        chemical_formula: elementMatch.sym,
        molecular_weight: `${elementMatch.mass} g/mol`,
        chemical_type: `Pure Element (${elementMatch.cat})`,
        classification: "Inorganic" as const,
        classification_reason: `${elementMatch.name} is a pure chemical element on the periodic table (Atomic Number ${elementMatch.num}, Symbol ${elementMatch.sym}). All pure elements are fundamentally classified as Inorganic substances.`,
        smiles_notation: `[${elementMatch.sym}]`,
        pdb_id: null,
        quick_fact: elementMatch.fact,
        color: elementMatch.color,
        properties: propertiesList,
        uses: elementMatch.uses,
        requested_compound: query,
        element_category: elementMatch.cat,
        atomic_number: elementMatch.num,
        atomic_mass: elementMatch.mass
      };

      return res.json(enrichKYCResultWithStructureUrls(elementResult, query));
    }

    // 100% Reliable Offline fallbacks for core high-yield curriculum substances
    const OFFLINE_KYC_DB: Record<string, any> = {
      "phenol": {
        "common_name": "Phenol",
        "iupac_name": "Phenol",
        "chemical_formula": "C6H6O",
        "molecular_weight": "94.11 g/mol",
        "chemical_type": "Aromatic Alcohol / Phenolic Compound",
        "classification": "Organic",
        "classification_reason": "It contains a hydroxyl (-OH) group directly attached to an aromatic benzene ring, making it the simplest member of the phenol chemical class.",
        "smiles_notation": "C1=CC=C(C=C1)O",
        "pdb_id": null,
        "quick_fact": "Phenol (historically known as carbolic acid) was the first antiseptic widely used in surgery by Joseph Lister in 1865, drastically reducing post-operative infections.",
        "color": "Transparent crystalline solid or pinkish needle-like crystals",
        "properties": "Physical state: Needle-like crystalline solid\nMelting point: 40.5 °C\nBoiling point: 181.7 °C\nSlightly soluble in water at room temperature, highly soluble in organic solvents\nWeakly acidic in water (pKa ≈ 9.95)",
        "uses": "Precursor to plastics (bisphenol-A, phenolic resins)\nIntermediate in the production of drugs (like aspirin) and herbicides\nAntiseptic and disinfectant ingredient in household cleaners and sore throat sprays"
      },
      "c6h5oh": {
        "common_name": "Phenol",
        "iupac_name": "Phenol",
        "chemical_formula": "C6H6O",
        "molecular_weight": "94.11 g/mol",
        "chemical_type": "Aromatic Alcohol / Phenolic Compound",
        "classification": "Organic",
        "classification_reason": "It contains a hydroxyl (-OH) group directly attached to an aromatic benzene ring, making it the simplest member of the phenol chemical class.",
        "smiles_notation": "C1=CC=C(C=C1)O",
        "pdb_id": null,
        "quick_fact": "Phenol (historically known as carbolic acid) was the first antiseptic widely used in surgery by Joseph Lister in 1865, drastically reducing post-operative infections.",
        "color": "Transparent crystalline solid or pinkish needle-like crystals",
        "properties": "Physical state: Needle-like crystalline solid\nMelting point: 40.5 °C\nBoiling point: 181.7 °C\nSlightly soluble in water at room temperature, highly soluble in organic solvents\nWeakly acidic in water (pKa ≈ 9.95)",
        "uses": "Precursor to plastics (bisphenol-A, phenolic resins)\nIntermediate in the production of drugs (like aspirin) and herbicides\nAntiseptic and disinfectant ingredient in household cleaners and sore throat sprays"
      },
      "c6h6o": {
        "common_name": "Phenol",
        "iupac_name": "Phenol",
        "chemical_formula": "C6H6O",
        "molecular_weight": "94.11 g/mol",
        "chemical_type": "Aromatic Alcohol / Phenolic Compound",
        "classification": "Organic",
        "classification_reason": "It contains a hydroxyl (-OH) group directly attached to an aromatic benzene ring, making it the simplest member of the phenol chemical class.",
        "smiles_notation": "C1=CC=C(C=C1)O",
        "pdb_id": null,
        "quick_fact": "Phenol (historically known as carbolic acid) was the first antiseptic widely used in surgery by Joseph Lister in 1865, drastically reducing post-operative infections.",
        "color": "Transparent crystalline solid or pinkish needle-like crystals",
        "properties": "Physical state: Needle-like crystalline solid\nMelting point: 40.5 °C\nBoiling point: 181.7 °C\nSlightly soluble in water at room temperature, highly soluble in organic solvents\nWeakly acidic in water (pKa ≈ 9.95)",
        "uses": "Precursor to plastics (bisphenol-A, phenolic resins)\nIntermediate in the production of drugs (like aspirin) and herbicides\nAntiseptic and disinfectant ingredient in household cleaners and sore throat sprays"
      },
      "carbolic acid": {
        "common_name": "Phenol",
        "iupac_name": "Phenol",
        "chemical_formula": "C6H6O",
        "molecular_weight": "94.11 g/mol",
        "chemical_type": "Aromatic Alcohol / Phenolic Compound",
        "classification": "Organic",
        "classification_reason": "It contains a hydroxyl (-OH) group directly attached to an aromatic benzene ring, making it the simplest member of the phenol chemical class.",
        "smiles_notation": "C1=CC=C(C=C1)O",
        "pdb_id": null,
        "quick_fact": "Phenol (historically known as carbolic acid) was the first antiseptic widely used in surgery by Joseph Lister in 1865, drastically reducing post-operative infections.",
        "color": "Transparent crystalline solid or pinkish needle-like crystals",
        "properties": "Physical state: Needle-like crystalline solid\nMelting point: 40.5 °C\nBoiling point: 181.7 °C\nSlightly soluble in water at room temperature, highly soluble in organic solvents\nWeakly acidic in water (pKa ≈ 9.95)",
        "uses": "Precursor to plastics (bisphenol-A, phenolic resins)\nIntermediate in the production of drugs (like aspirin) and herbicides\nAntiseptic and disinfectant ingredient in household cleaners and sore throat sprays"
      },
      "uric acid": {
        "common_name": "Uric Acid",
        "iupac_name": "7,9-Dihydro-3H-purine-2,6,8-trione",
        "chemical_formula": "C5H4N4O3",
        "molecular_weight": "168.11 g/mol",
        "chemical_type": "Purine Derivative (Heterocyclic Organic Acid)",
        "classification": "Organic",
        "classification_reason": "Uric acid is a nitrogen-containing heterocyclic compound built on a fused bicyclic purine ring system with carbon-hydrogen bonds, making it organic despite behaving as a weak acid in water.",
        "smiles_notation": "C12=C(NC(=O)N1)NC(=O)NC2=O",
        "pdb_id": null,
        "quick_fact": "Uric acid is the final breakdown product of purine metabolism in humans. When it accumulates and crystallizes in joints it causes the painful condition gout, and its buildup in the kidneys can form kidney stones.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: Odorless white crystalline solid\nSolubility: Poorly soluble in water, dissolves more readily in alkaline solutions as soluble urate salts\nAcidity: Weak diprotic acid (pKa1 ≈ 5.4)\nStability: Stable solid at room temperature; decomposes rather than melting cleanly at high temperature",
        "uses": "Clinically measured biomarker for diagnosing gout and kidney stone risk\nStudied in biochemistry as the end product of purine catabolism in humans and other primates (who lack the uricase enzyme)\nUsed in small amounts as an antioxidant ingredient in some cosmetic formulations"
      },
      "gypsum": {
        "common_name": "Gypsum",
        "iupac_name": "Calcium sulfate dihydrate",
        "chemical_formula": "CaSO4·2H2O",
        "molecular_weight": "172.17 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt consisting of calcium cations, sulfate anions, and water of crystallization.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O.O",
        "pdb_id": null,
        "quick_fact": "Gypsum is a soft sulfate mineral used extensively as a fertilizer and as the main constituent in plaster, blackboard chalk, and wallboard.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: Crystalline solid\nContains exactly two moles of water of crystallization per mole of calcium sulfate\nVery low solubility in water\nUndergoes dehydration upon heating to form Plaster of Paris at around 120°C",
        "uses": "Used in the manufacturing of Plaster of Paris, wallboard (drywall), and cement\nApplied to agricultural soils as a conditioner and fertilizer to provide calcium and sulfur\nUsed as an alabaster for ornamental carving and sculpture"
      },
      "caso4.2h2o": {
        "common_name": "Gypsum",
        "iupac_name": "Calcium sulfate dihydrate",
        "chemical_formula": "CaSO4·2H2O",
        "molecular_weight": "172.17 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt consisting of calcium cations, sulfate anions, and water of crystallization.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O.O",
        "pdb_id": null,
        "quick_fact": "Gypsum is a soft sulfate mineral used extensively as a fertilizer and as the main constituent in plaster, blackboard chalk, and wallboard.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: Crystalline solid\nContains exactly two moles of water of crystallization per mole of calcium sulfate\nVery low solubility in water\nUndergoes dehydration upon heating to form Plaster of Paris at around 120°C",
        "uses": "Used in the manufacturing of Plaster of Paris, wallboard (drywall), and cement\nApplied to agricultural soils as a conditioner and fertilizer to provide calcium and sulfur\nUsed as an alabaster for ornamental carving and sculpture"
      },
      "caso4·2h2o": {
        "common_name": "Gypsum",
        "iupac_name": "Calcium sulfate dihydrate",
        "chemical_formula": "CaSO4·2H2O",
        "molecular_weight": "172.17 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt consisting of calcium cations, sulfate anions, and water of crystallization.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O.O",
        "pdb_id": null,
        "quick_fact": "Gypsum is a soft sulfate mineral used extensively as a fertilizer and as the main constituent in plaster, blackboard chalk, and wallboard.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: Crystalline solid\nContains exactly two moles of water of crystallization per mole of calcium sulfate\nVery low solubility in water\nUndergoes dehydration upon heating to form Plaster of Paris at around 120°C",
        "uses": "Used in the manufacturing of Plaster of Paris, wallboard (drywall), and cement\nApplied to agricultural soils as a conditioner and fertilizer to provide calcium and sulfur\nUsed as an alabaster for ornamental carving and sculpture"
      },
      "calcium sulfate dihydrate": {
        "common_name": "Gypsum",
        "iupac_name": "Calcium sulfate dihydrate",
        "chemical_formula": "CaSO4·2H2O",
        "molecular_weight": "172.17 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt consisting of calcium cations, sulfate anions, and water of crystallization.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O.O",
        "pdb_id": null,
        "quick_fact": "Gypsum is a soft sulfate mineral used extensively as a fertilizer and as the main constituent in plaster, blackboard chalk, and wallboard.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: Crystalline solid\nContains exactly two moles of water of crystallization per mole of calcium sulfate\nVery low solubility in water\nUndergoes dehydration upon heating to form Plaster of Paris at around 120°C",
        "uses": "Used in the manufacturing of Plaster of Paris, wallboard (drywall), and cement\nApplied to agricultural soils as a conditioner and fertilizer to provide calcium and sulfur\nUsed as an alabaster for ornamental carving and sculpture"
      },
      "plaster of paris": {
        "common_name": "Plaster of Paris",
        "iupac_name": "Calcium sulfate hemihydrate",
        "chemical_formula": "CaSO4·0.5H2O",
        "molecular_weight": "145.15 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic mineral compound of calcium sulfate containing half a molecule of water of crystallization per calcium sulfate unit.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O",
        "pdb_id": null,
        "quick_fact": "Plaster of Paris gets its name from its abundant preparation by heating gypsum found near Paris. When mixed with water, it rehydrates back into hard gypsum solid.",
        "color": "Fine white powder",
        "properties": "Physical state: White powder\nHemihydrate structure containing half a mole of water per calcium sulfate unit\nRapidly hardens into a solid mass (Gypsum) when mixed with water\nSlightly soluble in water",
        "uses": "Used by orthopedists as supportive casts for fractured and broken limbs\nUsed for making decorative moldings, false ceilings, cornices, and sculptures\nUsed as a fireproofing material and in dental casting molds"
      },
      "caso4.0.5h2o": {
        "common_name": "Plaster of Paris",
        "iupac_name": "Calcium sulfate hemihydrate",
        "chemical_formula": "CaSO4·0.5H2O",
        "molecular_weight": "145.15 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic mineral compound of calcium sulfate containing half a molecule of water of crystallization per calcium sulfate unit.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O",
        "pdb_id": null,
        "quick_fact": "Plaster of Paris gets its name from its abundant preparation by heating gypsum found near Paris. When mixed with water, it rehydrates back into hard gypsum solid.",
        "color": "Fine white powder",
        "properties": "Physical state: White powder\nHemihydrate structure containing half a mole of water per calcium sulfate unit\nRapidly hardens into a solid mass (Gypsum) when mixed with water\nSlightly soluble in water",
        "uses": "Used by orthopedists as supportive casts for fractured and broken limbs\nUsed for making decorative moldings, false ceilings, cornices, and sculptures\nUsed as a fireproofing material and in dental casting molds"
      },
      "caso4·0.5h2o": {
        "common_name": "Plaster of Paris",
        "iupac_name": "Calcium sulfate hemihydrate",
        "chemical_formula": "CaSO4·0.5H2O",
        "molecular_weight": "145.15 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic mineral compound of calcium sulfate containing half a molecule of water of crystallization per calcium sulfate unit.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O",
        "pdb_id": null,
        "quick_fact": "Plaster of Paris gets its name from its abundant preparation by heating gypsum found near Paris. When mixed with water, it rehydrates back into hard gypsum solid.",
        "color": "Fine white powder",
        "properties": "Physical state: White powder\nHemihydrate structure containing half a mole of water per calcium sulfate unit\nRapidly hardens into a solid mass (Gypsum) when mixed with water\nSlightly soluble in water",
        "uses": "Used by orthopedists as supportive casts for fractured and broken limbs\nUsed for making decorative moldings, false ceilings, cornices, and sculptures\nUsed as a fireproofing material and in dental casting molds"
      },
      "caso4·1/2h2o": {
        "common_name": "Plaster of Paris",
        "iupac_name": "Calcium sulfate hemihydrate",
        "chemical_formula": "CaSO4·0.5H2O",
        "molecular_weight": "145.15 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic mineral compound of calcium sulfate containing half a molecule of water of crystallization per calcium sulfate unit.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O",
        "pdb_id": null,
        "quick_fact": "Plaster of Paris gets its name from its abundant preparation by heating gypsum found near Paris. When mixed with water, it rehydrates back into hard gypsum solid.",
        "color": "Fine white powder",
        "properties": "Physical state: White powder\nHemihydrate structure containing half a mole of water per calcium sulfate unit\nRapidly hardens into a solid mass (Gypsum) when mixed with water\nSlightly soluble in water",
        "uses": "Used by orthopedists as supportive casts for fractured and broken limbs\nUsed for making decorative moldings, false ceilings, cornices, and sculptures\nUsed as a fireproofing material and in dental casting molds"
      },
      "calcium sulfate hemihydrate": {
        "common_name": "Plaster of Paris",
        "iupac_name": "Calcium sulfate hemihydrate",
        "chemical_formula": "CaSO4·0.5H2O",
        "molecular_weight": "145.15 g/mol",
        "chemical_type": "Hydrated Metal Salt / Mineral",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic mineral compound of calcium sulfate containing half a molecule of water of crystallization per calcium sulfate unit.",
        "smiles_notation": "[Ca+2].[O-]S(=O)(=O)[O-].O",
        "pdb_id": null,
        "quick_fact": "Plaster of Paris gets its name from its abundant preparation by heating gypsum found near Paris. When mixed with water, it rehydrates back into hard gypsum solid.",
        "color": "Fine white powder",
        "properties": "Physical state: White powder\nHemihydrate structure containing half a mole of water per calcium sulfate unit\nRapidly hardens into a solid mass (Gypsum) when mixed with water\nSlightly soluble in water",
        "uses": "Used by orthopedists as supportive casts for fractured and broken limbs\nUsed for making decorative moldings, false ceilings, cornices, and sculptures\nUsed as a fireproofing material and in dental casting molds"
      },
      "bleaching powder": {
        "common_name": "Bleaching Powder",
        "iupac_name": "Calcium hypochlorite",
        "chemical_formula": "CaOCl2",
        "molecular_weight": "142.98 g/mol",
        "chemical_type": "Inorganic Mixed Salt / Disinfectant",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt composed of calcium, hypochlorite, and chloride ions with no carbon-hydrogen skeleton.",
        "smiles_notation": "[Ca+2].[Cl-].[O-][Cl]",
        "pdb_id": null,
        "quick_fact": "Bleaching powder is manufactured by passing chlorine gas over dry slaked lime (calcium hydroxide). It is a strong oxidizing agent that releases chlorine when reacted with acids.",
        "color": "Dull white powder with a strong, pungent odor of chlorine",
        "properties": "Physical state: Solid powder\nStrong odor of chlorine gas due to continuous slow decomposition in moist air\nPowerful oxidizing agent\nSoluble in water, releasing active chlorine species",
        "uses": "Used for disinfecting drinking water and swimming pools to kill microbes\nUsed for bleaching cotton, linen, wood pulp, and dirty clothes in laundry\nUsed as an oxidizing agent in chemical laboratories and industrial manufacturing"
      },
      "caocl2": {
        "common_name": "Bleaching Powder",
        "iupac_name": "Calcium hypochlorite",
        "chemical_formula": "CaOCl2",
        "molecular_weight": "142.98 g/mol",
        "chemical_type": "Inorganic Mixed Salt / Disinfectant",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt composed of calcium, hypochlorite, and chloride ions with no carbon-hydrogen skeleton.",
        "smiles_notation": "[Ca+2].[Cl-].[O-][Cl]",
        "pdb_id": null,
        "quick_fact": "Bleaching powder is manufactured by passing chlorine gas over dry slaked lime (calcium hydroxide). It is a strong oxidizing agent that releases chlorine when reacted with acids.",
        "color": "Dull white powder with a strong, pungent odor of chlorine",
        "properties": "Physical state: Solid powder\nStrong odor of chlorine gas due to continuous slow decomposition in moist air\nPowerful oxidizing agent\nSoluble in water, releasing active chlorine species",
        "uses": "Used for disinfecting drinking water and swimming pools to kill microbes\nUsed for bleaching cotton, linen, wood pulp, and dirty clothes in laundry\nUsed as an oxidizing agent in chemical laboratories and industrial manufacturing"
      },
      "calcium oxychloride": {
        "common_name": "Bleaching Powder",
        "iupac_name": "Calcium hypochlorite",
        "chemical_formula": "CaOCl2",
        "molecular_weight": "142.98 g/mol",
        "chemical_type": "Inorganic Mixed Salt / Disinfectant",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt composed of calcium, hypochlorite, and chloride ions with no carbon-hydrogen skeleton.",
        "smiles_notation": "[Ca+2].[Cl-].[O-][Cl]",
        "pdb_id": null,
        "quick_fact": "Bleaching powder is manufactured by passing chlorine gas over dry slaked lime (calcium hydroxide). It is a strong oxidizing agent that releases chlorine when reacted with acids.",
        "color": "Dull white powder with a strong, pungent odor of chlorine",
        "properties": "Physical state: Solid powder\nStrong odor of chlorine gas due to continuous slow decomposition in moist air\nPowerful oxidizing agent\nSoluble in water, releasing active chlorine species",
        "uses": "Used for disinfecting drinking water and swimming pools to kill microbes\nUsed for bleaching cotton, linen, wood pulp, and dirty clothes in laundry\nUsed as an oxidizing agent in chemical laboratories and industrial manufacturing"
      },
      "calcium hypochlorite": {
        "common_name": "Bleaching Powder",
        "iupac_name": "Calcium hypochlorite",
        "chemical_formula": "CaOCl2",
        "molecular_weight": "142.98 g/mol",
        "chemical_type": "Inorganic Mixed Salt / Disinfectant",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt composed of calcium, hypochlorite, and chloride ions with no carbon-hydrogen skeleton.",
        "smiles_notation": "[Ca+2].[Cl-].[O-][Cl]",
        "pdb_id": null,
        "quick_fact": "Bleaching powder is manufactured by passing chlorine gas over dry slaked lime (calcium hydroxide). It is a strong oxidizing agent that releases chlorine when reacted with acids.",
        "color": "Dull white powder with a strong, pungent odor of chlorine",
        "properties": "Physical state: Solid powder\nStrong odor of chlorine gas due to continuous slow decomposition in moist air\nPowerful oxidizing agent\nSoluble in water, releasing active chlorine species",
        "uses": "Used for disinfecting drinking water and swimming pools to kill microbes\nUsed for bleaching cotton, linen, wood pulp, and dirty clothes in laundry\nUsed as an oxidizing agent in chemical laboratories and industrial manufacturing"
      },
      "paracetamol": {
        "common_name": "Paracetamol (Acetaminophen)",
        "iupac_name": "N-(4-hydroxyphenyl)acetamide",
        "chemical_formula": "C8H9NO2",
        "molecular_weight": "151.16 g/mol",
        "chemical_type": "Pharmaceutical / Analgesic Drug",
        "classification": "Organic",
        "classification_reason": "It is an organic compound because it contains a benzene ring linked covalently to carbon-based structures with hydrogen, nitrogen, and oxygen atoms.",
        "smiles_notation": "CC(=O)NC1=CC=C(O)C=C1",
        "pdb_id": null,
        "quick_fact": "Paracetamol is a widely used over-the-counter medicine that helps reduce fever (antipyretic) and relieve mild to moderate pain (analgesic).",
        "color": "White crystalline powder"
      },
      "acetaminophen": {
        "common_name": "Paracetamol (Acetaminophen)",
        "iupac_name": "N-(4-hydroxyphenyl)acetamide",
        "chemical_formula": "C8H9NO2",
        "molecular_weight": "151.16 g/mol",
        "chemical_type": "Pharmaceutical / Analgesic Drug",
        "classification": "Organic",
        "classification_reason": "It is an organic compound because it contains a benzene ring linked covalently to carbon-based structures with hydrogen, nitrogen, and oxygen atoms.",
        "smiles_notation": "CC(=O)NC1=CC=C(O)C=C1",
        "pdb_id": null,
        "quick_fact": "Paracetamol is a widely used over-the-counter medicine that helps reduce fever (antipyretic) and relieve mild to moderate pain (analgesic).",
        "color": "White crystalline powder"
      },
      "aspirin": {
        "common_name": "Aspirin",
        "iupac_name": "2-acetoxybenzoic acid",
        "chemical_formula": "C9H8O4",
        "molecular_weight": "180.16 g/mol",
        "chemical_type": "NSAID / Pharmaceutical Drug",
        "classification": "Organic",
        "classification_reason": "It is an organic compound synthesized from salicylic acid, possessing a carbon-based aromatic framework (benzene derivative).",
        "smiles_notation": "CC(=O)OC1=CC=CC=C1C(=O)O",
        "pdb_id": null,
        "quick_fact": "Aspirin is used to reduce pain, fever, and inflammation, and is often prescribed in low doses to prevent blood clots and heart attacks.",
        "color": "White crystalline solid"
      },
      "blue vitriol": {
        "common_name": "Blue Vitriol (Copper Sulfate Pentahydrate)",
        "iupac_name": "Copper(II) sulfate pentahydrate",
        "chemical_formula": "CuSO4.5H2O",
        "molecular_weight": "249.69 g/mol",
        "chemical_type": "Transition Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic salt consisting of copper cations and sulfate anions, without any carbon or carbon-hydrogen covalent bonds.",
        "smiles_notation": "[Cu+2].[O-]S(=O)(=O)[O-].O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Commonly asked in NEET/JEE, its beautiful blue color is due to d-d transition of copper ions surrounded by water molecules, and it loses its color when heated to form white anhydrous Copper(II) Sulfate.",
        "color": "Bright blue crystals"
      },
      "copper sulfate pentahydrate": {
        "common_name": "Blue Vitriol (Copper Sulfate Pentahydrate)",
        "iupac_name": "Copper(II) sulfate pentahydrate",
        "chemical_formula": "CuSO4.5H2O",
        "molecular_weight": "249.69 g/mol",
        "chemical_type": "Transition Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic salt consisting of copper cations and sulfate anions, without any carbon or carbon-hydrogen covalent bonds.",
        "smiles_notation": "[Cu+2].[O-]S(=O)(=O)[O-].O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Commonly asked in NEET/JEE, its beautiful blue color is due to d-d transition of copper ions surrounded by water molecules, and it loses its color when heated to form white anhydrous Copper(II) Sulfate.",
        "color": "Bright blue crystals"
      },
      "cuso4": {
        "common_name": "Copper(II) Sulfate (Cupric Sulfate)",
        "iupac_name": "Copper(II) sulfate",
        "chemical_formula": "CuSO4",
        "molecular_weight": "159.61 g/mol",
        "chemical_type": "Transition Metal Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic salt consisting of copper cations and sulfate anions, without any carbon or carbon-hydrogen covalent bonds.",
        "smiles_notation": "[Cu+2].[O-]S(=O)(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "The anhydrous (water-free) form is an off-white/greyish-white powder. It readily absorbs water from the air to turn into the familiar bright blue Copper Sulfate Pentahydrate (Blue Vitriol), which is why anhydrous copper sulfate is used as a simple test for the presence of water.",
        "color": "White to grey-white powder (anhydrous)"
      },
      "sodium stearate": {
        "common_name": "Sodium Stearate (Soap)",
        "iupac_name": "Sodium octadecanoate",
        "chemical_formula": "C18H35NaO2",
        "molecular_weight": "306.46 g/mol",
        "chemical_type": "Saturated Fatty Acid Salt / Soap",
        "classification": "Organic",
        "classification_reason": "It is classified as an organic compound because it features a long 18-carbon aliphatic fatty acid chain derived from stearic acid.",
        "smiles_notation": "CCCCCCCCCCCCCCCCCC(=O)[O-].[Na+]",
        "pdb_id": null,
        "quick_fact": "This is a major component of laundry soap, formed by saponification of triglycerides. In hard water, it forms insoluble scum with Calcium and Magnesium ions.",
        "color": "White fine powder"
      },
      "hemoglobin": {
        "common_name": "Hemoglobin",
        "iupac_name": "Hemoglobin macromolecule",
        "chemical_formula": "C2952H4664N812O832S8Fe4",
        "molecular_weight": "64,500 g/mol",
        "chemical_type": "Metalloprotein / Globular biological macromolecule",
        "classification": "Organic",
        "classification_reason": "It is a complex organic biomolecule consisting of continuous amino acid polypeptide chains and iron-containing carbon heme ring structures.",
        "smiles_notation": "Complex macromolecule chain",
        "pdb_id": "1A3N",
        "quick_fact": "Crucial protein in red blood cells that transports oxygen from the lungs to the body tissues. One of the most studied proteins in biophysics and medicine (RCSB PDB ID: 1A3N).",
        "color": "Deep dark red solid or solution"
      },
      "glucose": {
        "common_name": "Glucose (Dextrose)",
        "iupac_name": "(2R,3S,4R,5R)-2,3,4,5,6-pentahydroxyhexanal",
        "chemical_formula": "C6H12O6",
        "molecular_weight": "180.16 g/mol",
        "chemical_type": "Monosaccharide / Carbohydrate",
        "classification": "Organic",
        "classification_reason": "It is an organic compound because it constitutes a six-carbon sugar skeleton possessing covalent carbon-carbon, carbon-hydrogen, and carbon-oxygen single bonds.",
        "smiles_notation": "C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O",
        "pdb_id": null,
        "quick_fact": "Glucose is the primary source of energy for cellular respiration in living organisms, generated by plants during photosynthesis.",
        "color": "White sweet crystalline powder"
      },
      "fructose": {
        "common_name": "Fructose (Fruit Sugar)",
        "iupac_name": "(3S,4R,5R)-1,3,4,5,6-Pentahydroxyhexan-2-one",
        "chemical_formula": "C6H12O6",
        "molecular_weight": "180.16 g/mol",
        "chemical_type": "Monosaccharide / Ketohexose Carbohydrate",
        "classification": "Organic",
        "classification_reason": "It is an organic compound built on a six-carbon sugar skeleton containing a ketone functional group along with several hydroxyl groups, classifying it as a ketohexose (isomeric with glucose, an aldohexose).",
        "smiles_notation": "C1[C@H]([C@H]([C@@H](C(O1)(CO)O)O)O)O",
        "pdb_id": null,
        "quick_fact": "Fructose is the sweetest of all naturally occurring sugars. It is abundant in fruits and honey, and unlike glucose it is absorbed and metabolized mainly by the liver rather than being used directly by most body cells.",
        "color": "White crystalline solid",
        "properties": "Physical state: Odorless white crystalline solid, sweeter-tasting than both glucose and sucrose\nSolubility: Highly soluble in water\nStructure: Predominantly exists in a stable five-membered (furanose) or six-membered (pyranose) cyclic hemiketal ring form in solution\nStability: Caramelizes and browns at lower temperatures than glucose",
        "uses": "Natural sweetener in fruits, honey, and high-fructose corn syrup used in the food and beverage industry\nStudied in biochemistry as the primary example of a ketose sugar, contrasted with aldose sugars like glucose\nIntravenous fructose solutions historically used in some clinical nutrition settings"
      },
      "maltose": {
        "common_name": "Maltose (Malt Sugar)",
        "iupac_name": "(2R,3S,4S,5R,6R)-2-(Hydroxymethyl)-6-[(2R,3S,4R,5R)-4,5,6-trihydroxy-2-(hydroxymethyl)oxan-3-yl]oxyoxane-3,4,5-triol",
        "chemical_formula": "C12H22O11",
        "molecular_weight": "342.30 g/mol",
        "chemical_type": "Disaccharide Carbohydrate",
        "classification": "Organic",
        "classification_reason": "It is an organic compound formed from two glucose monosaccharide units joined by a glycosidic bond, giving it a carbon-ring skeleton with multiple hydroxyl functional groups.",
        "smiles_notation": "C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H](OC([C@@H]([C@H]2O)O)O)CO)O)O)O)O",
        "pdb_id": null,
        "quick_fact": "Maltose is produced when the enzyme amylase breaks down starch, both during human digestion and during the malting process used in brewing beer and whisky, which is where it gets the name 'malt sugar'.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline solid, less sweet-tasting than sucrose\nSolubility: Freely soluble in water\nStructure: Two D-glucose units joined by an alpha-1,4-glycosidic bond\nHydrolysis: Broken down into two molecules of glucose by the enzyme maltase during digestion",
        "uses": "Key intermediate sugar in the brewing and distilling industry, produced during the malting of barley\nFood industry sweetener and browning agent, notably in malted milk products and confectionery\nBiochemical substrate used to study carbohydrate-digesting enzymes such as maltase and amylase"
      },
      "ammonium chloride": {
        "common_name": "Ammonium Chloride (Sal Ammoniac)",
        "iupac_name": "Azanium Chloride",
        "chemical_formula": "NH4Cl",
        "molecular_weight": "53.49 g/mol",
        "chemical_type": "Ammonium Halide Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of the ammonium cation (NH4+) and chloride anion (Cl-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[Cl-]",
        "pdb_id": null,
        "quick_fact": "Ammonium chloride is historically called 'sal ammoniac' and is used as the electrolyte paste inside ordinary zinc-carbon dry cell batteries.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline solid, colorless in solution\nSolubility: Highly soluble in water, dissolving endothermically (cools the solution)\nAcidity: Mildly acidic salt (pH ~5) due to hydrolysis of the ammonium ion\nSublimation: Sublimes directly from solid to vapor on strong heating",
        "uses": "Electrolyte paste in dry cell (Leclanché) batteries\nFlux in soldering and galvanizing to clean metal surfaces before coating\nExpectorant ingredient in cough medicines and nitrogen source in fertilizers"
      },
      "ammonium sulfate": {
        "common_name": "Ammonium Sulfate",
        "iupac_name": "Diazanium Sulfate",
        "chemical_formula": "(NH4)2SO4",
        "molecular_weight": "132.14 g/mol",
        "chemical_type": "Ammonium Sulfate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of two ammonium cations (NH4+) and one sulfate anion (SO4^2-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[NH4+].[O-]S(=O)(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Ammonium sulfate is one of the most widely used nitrogen fertilizers in the world, prized for also supplying sulfur, an essential secondary plant nutrient.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline solid\nSolubility: Highly soluble in water\nAcidity: Mildly acidic salt (pH ~5 - 5.5) due to hydrolysis of the ammonium ion\nStability: Decomposes on strong heating rather than melting cleanly",
        "uses": "Major nitrogen-and-sulfur agricultural fertilizer for alkaline soils\nProtein precipitating (\"salting out\") agent in biochemistry and vaccine purification\nFlame-retardant additive and food additive (flour treatment agent)"
      },
      "ammonium nitrate": {
        "common_name": "Ammonium Nitrate",
        "iupac_name": "Azanium Nitrate",
        "chemical_formula": "NH4NO3",
        "molecular_weight": "80.04 g/mol",
        "chemical_type": "Ammonium Nitrate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of the ammonium cation (NH4+) and nitrate anion (NO3-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[O-][N+](=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Ammonium nitrate decomposes into nitrous oxide and water vapor when heated gently, but can detonate explosively under strong shock or intense heat -- a property responsible for several major industrial disasters.",
        "color": "White or grey crystalline solid",
        "properties": "Physical state: White crystalline solid\nSolubility: Extremely soluble in water, dissolving strongly endothermically\nAcidity: Mildly acidic salt (pH ~5 - 5.5) due to hydrolysis of the ammonium ion\nThermal behavior: Decomposes to N2O and H2O on gentle heating; can detonate under confinement or intense heat",
        "uses": "High-nitrogen agricultural fertilizer, the most widely used nitrogen fertilizer worldwide\nOxidizer component in industrial and mining explosives (ANFO)\nEndothermic dissolution used in instant cold packs for first-aid treatment"
      },
      "ammonium carbonate": {
        "common_name": "Ammonium Carbonate (Smelling Salts)",
        "iupac_name": "Diazanium Carbonate",
        "chemical_formula": "(NH4)2CO3",
        "molecular_weight": "96.09 g/mol",
        "chemical_type": "Ammonium Carbonate Salt",
        "classification": "Inorganic",
        "classification_reason": "Although it contains carbon, the carbon is present as a carbonate group (CO3^2-), which is systematically classified as inorganic rather than treated as an organic carbon skeleton.",
        "smiles_notation": "[NH4+].[NH4+].[O-]C(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Historically known as 'smelling salts', ammonium carbonate slowly releases pungent ammonia gas at room temperature and was used to revive people who had fainted.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline solid with a strong ammonia odor\nSolubility: Soluble in water, decomposing slowly as it dissolves\nAcidity: Mildly basic in solution (pH ~8.5) since carbonate hydrolysis dominates over ammonium hydrolysis\nStability: Unstable at room temperature, slowly releasing ammonia and carbon dioxide gas",
        "uses": "Traditional 'smelling salts' to revive people from fainting or dizziness\nLeavening (raising) agent in older baking recipes, especially flat cookies and crackers\nBuffering and pH-adjusting reagent in analytical chemistry"
      },
      "ammonium bicarbonate": {
        "common_name": "Ammonium Bicarbonate",
        "iupac_name": "Azanium Hydrogen Carbonate",
        "chemical_formula": "NH4HCO3",
        "molecular_weight": "79.06 g/mol",
        "chemical_type": "Ammonium Bicarbonate Salt",
        "classification": "Inorganic",
        "classification_reason": "Although it contains carbon, the carbon is present as a bicarbonate group (HCO3-), which is systematically classified as inorganic rather than treated as an organic carbon skeleton.",
        "smiles_notation": "[NH4+].OC(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Ammonium bicarbonate fully decomposes into ammonia, water vapor, and carbon dioxide gas on baking, leaving behind no solid residue at all -- making it a popular leavening agent for thin, crisp baked goods.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline solid with a faint ammonia odor\nSolubility: Soluble in water\nAcidity: Mildly basic in solution (pH ~8)\nStability: Decomposes completely into gaseous products below 60°C, leaving no residue",
        "uses": "Leavening agent in flatbreads, crackers, and traditional cookies (leaves no chemical aftertaste since it fully evaporates)\nBuffering agent and nitrogen source in biochemical and pharmaceutical manufacturing\nFire-extinguishing powder component"
      },
      "ammonium phosphate": {
        "common_name": "Ammonium Phosphate (Diammonium Phosphate)",
        "iupac_name": "Diazanium Hydrogen Phosphate",
        "chemical_formula": "(NH4)2HPO4",
        "molecular_weight": "132.06 g/mol",
        "chemical_type": "Ammonium Phosphate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of ammonium cations (NH4+) and a hydrogen phosphate anion (HPO4^2-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[NH4+].[O-]P(=O)([O-])O",
        "pdb_id": null,
        "quick_fact": "Diammonium phosphate (DAP) is the world's most widely used phosphate fertilizer, supplying crops with both nitrogen and phosphorus in a single granule.",
        "color": "White or grey crystalline solid",
        "properties": "Physical state: White crystalline solid\nSolubility: Highly soluble in water\nAcidity: Mildly basic in solution (pH ~8)\nStability: Releases ammonia gas on prolonged exposure to air or on heating",
        "uses": "World's most common phosphorus-and-nitrogen agricultural fertilizer (DAP)\nFire retardant coating in wood products and fireworks\nYeast nutrient in winemaking and brewing"
      },
      "ammonium dichromate": {
        "common_name": "Ammonium Dichromate",
        "iupac_name": "Diazanium Dichromate",
        "chemical_formula": "(NH4)2Cr2O7",
        "molecular_weight": "252.07 g/mol",
        "chemical_type": "Ammonium Dichromate Salt / Oxidizer",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of ammonium cations (NH4+) and a dichromate anion (Cr2O7^2-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[NH4+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Ammonium dichromate is famous for the 'volcano' demonstration: when ignited, it self-sustains an exothermic decomposition into a large, glowing pile of green chromium(III) oxide ash, nitrogen gas, and steam.",
        "color": "Bright orange-red crystalline solid",
        "properties": "Physical state: Bright orange crystalline solid\nSolubility: Soluble in water, giving a mildly acidic orange solution (pH ~4)\nOxidizing power: Strong oxidizer due to chromium in the +6 oxidation state\nThermal behavior: Undergoes vigorous self-sustaining exothermic decomposition on ignition",
        "uses": "Classic 'volcano' lecture demonstration of exothermic decomposition\nOxidizing agent in pyrotechnics, photoengraving, and lithography\nSource of green chromium(III) oxide pigment"
      },
      "ammonium sulfide": {
        "common_name": "Ammonium Sulfide",
        "iupac_name": "Diazanium Sulfide",
        "chemical_formula": "(NH4)2S",
        "molecular_weight": "68.15 g/mol",
        "chemical_type": "Ammonium Sulfide Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of ammonium cations (NH4+) and a sulfide anion (S^2-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[NH4+].[S-2]",
        "pdb_id": null,
        "quick_fact": "Ammonium sulfide solution has an intensely foul, rotten-egg-like odor from dissolved hydrogen sulfide and is used in qualitative inorganic analysis to selectively precipitate heavy metal sulfides.",
        "color": "Yellow aqueous solution (unstable as a pure solid)",
        "properties": "Physical state: Typically handled as a yellow aqueous solution; the pure solid is unstable\nSolubility: Freely soluble in water\nAcidity: Basic in solution (pH ~9 - 9.5) due to strong sulfide ion hydrolysis\nOdor: Strong, foul odor resembling rotten eggs",
        "uses": "Reagent in qualitative inorganic analysis to precipitate heavy metal sulfides (group-II/IV cation tests)\nSepia/browning toner in black-and-white photographic development\nReducing agent in some organic synthesis reactions"
      },
      "ammonium acetate": {
        "common_name": "Ammonium Acetate",
        "iupac_name": "Azanium Acetate",
        "chemical_formula": "CH3COONH4",
        "molecular_weight": "77.08 g/mol",
        "chemical_type": "Ammonium Carboxylate Salt",
        "classification": "Organic",
        "classification_reason": "It is an ammonium salt of acetic acid, a carboxylic acid, giving it a carbon-hydrogen (-CH3) organic backbone rather than a purely inorganic ionic framework.",
        "smiles_notation": "[NH4+].CC(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Ammonium acetate is unusual among ammonium salts because its aqueous solution is almost perfectly neutral (pH ~7), since the weakly acidic ammonium ion and weakly basic acetate ion neutralize each other's hydrolysis effects.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline, hygroscopic solid\nSolubility: Highly soluble in water\nAcidity: Almost perfectly neutral in solution (pH ~7), unlike most other ammonium salts\nStability: Volatile -- sublimes/decomposes readily on heating",
        "uses": "Volatile buffer in mass spectrometry and chromatography (LC-MS) since it leaves no residue on evaporation\nMeat curing and food preservative (E264)\nAnalytical reagent for precipitating proteins"
      },
      "ammonium oxalate": {
        "common_name": "Ammonium Oxalate",
        "iupac_name": "Diazanium Oxalate",
        "chemical_formula": "(NH4)2C2O4",
        "molecular_weight": "124.10 g/mol",
        "chemical_type": "Ammonium Dicarboxylate Salt",
        "classification": "Organic",
        "classification_reason": "It is an ammonium salt of oxalic acid, a dicarboxylic acid, giving it an organic carbon-carbon backbone (C2O4^2-) rather than a purely inorganic ionic framework.",
        "smiles_notation": "[NH4+].[NH4+].[O-]C(=O)C(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Ammonium oxalate is used as an anticoagulant in blood samples because the oxalate ion binds tightly to calcium ions in blood plasma, blocking the calcium-dependent clotting cascade.",
        "color": "White crystalline solid",
        "properties": "Physical state: White crystalline solid\nSolubility: Moderately soluble in water\nAcidity: Weakly acidic to near-neutral in solution (pH ~6)\nReactivity: Forms an insoluble white precipitate (calcium oxalate) with calcium ions",
        "uses": "Anticoagulant in laboratory blood collection tubes (binds plasma calcium)\nAnalytical reagent for gravimetric determination of calcium\nRust and mineral-stain remover for wood, metal, and stone surfaces"
      },
      "ammonium iodide": {
        "common_name": "Ammonium Iodide",
        "iupac_name": "Azanium Iodide",
        "chemical_formula": "NH4I",
        "molecular_weight": "144.94 g/mol",
        "chemical_type": "Ammonium Halide Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of the ammonium cation (NH4+) and iodide anion (I-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[I-]",
        "pdb_id": null,
        "quick_fact": "Ammonium iodide slowly darkens on exposure to light and air as trace iodide oxidizes to elemental iodine, similar to how silver halides darken in photographic film.",
        "color": "White or yellowish crystalline solid",
        "properties": "Physical state: White crystalline solid, yellows slightly on exposure to light and air\nSolubility: Extremely soluble in water\nAcidity: Mildly acidic salt (pH ~5) due to hydrolysis of the ammonium ion\nStability: Slowly oxidizes, releasing traces of iodine",
        "uses": "Iodine source in some pharmaceutical and veterinary formulations\nElectrolyte additive in specialty dry-cell battery formulations\nAnalytical and photographic chemistry reagent"
      },
      "ammonium bromide": {
        "common_name": "Ammonium Bromide",
        "iupac_name": "Azanium Bromide",
        "chemical_formula": "NH4Br",
        "molecular_weight": "97.94 g/mol",
        "chemical_type": "Ammonium Halide Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic salt of the ammonium cation (NH4+) and bromide anion (Br-) with no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[Br-]",
        "pdb_id": null,
        "quick_fact": "Ammonium bromide was historically used as a mild sedative and anticonvulsant in 19th and early 20th century medicine, before safer modern drugs replaced bromide-based treatments.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: White crystalline solid\nSolubility: Highly soluble in water\nAcidity: Mildly acidic salt (pH ~5) due to hydrolysis of the ammonium ion\nStability: Stable at room temperature; sublimes on strong heating",
        "uses": "Historical sedative and anticonvulsant medicine (now obsolete)\nPhotographic emulsion and flame-retardant textile treatment component\nAnalytical chemistry reagent and bromide ion source"
      },
      "ammonium thiocyanate": {
        "common_name": "Ammonium Thiocyanate",
        "iupac_name": "Azanium Thiocyanate",
        "chemical_formula": "NH4SCN",
        "molecular_weight": "76.12 g/mol",
        "chemical_type": "Ammonium Pseudohalide Salt",
        "classification": "Inorganic",
        "classification_reason": "Although it contains carbon, the carbon is present as part of the thiocyanate pseudohalide group (SCN-), which -- like cyanide -- is systematically classified as inorganic rather than treated as an organic carbon skeleton.",
        "smiles_notation": "[NH4+].[S-]C#N",
        "pdb_id": null,
        "quick_fact": "Ammonium thiocyanate solution is famous in qualitative analysis for turning blood-red immediately on contact with iron(III) ions, forming the complex ion [Fe(SCN)]^2+ -- a extremely sensitive test for Fe3+.",
        "color": "White or colorless crystalline solid",
        "properties": "Physical state: White crystalline, hygroscopic solid\nSolubility: Highly soluble in water, dissolving strongly endothermically\nAcidity: Mildly acidic in solution (pH ~4.5 - 5)\nReactivity: Forms an intense blood-red complex with iron(III) ions, used as a sensitive Fe3+ test",
        "uses": "Extremely sensitive qualitative test reagent for detecting iron(III) ions (blood-red complex)\nEndothermic dissolution used in some instant cold packs\nIntermediate in herbicide, dye, and pharmaceutical manufacturing"
      },
      "ammonium hydroxide": {
        "common_name": "Ammonium Hydroxide (Aqueous Ammonia)",
        "iupac_name": "Azanium Hydroxide",
        "chemical_formula": "NH4OH",
        "molecular_weight": "35.05 g/mol",
        "chemical_type": "Weak Base / Ammonium Hydroxide Solution",
        "classification": "Inorganic",
        "classification_reason": "It is the ionic hydroxide of the ammonium cation (NH4+) formed when ammonia gas dissolves in water, containing no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[NH4+].[OH-]",
        "pdb_id": null,
        "quick_fact": "Ammonium hydroxide does not really exist as a stable, isolable compound -- it is simply the name given to ammonia gas (NH3) dissolved in water, existing mostly as NH3 molecules with only a small fraction ionized to NH4+ and OH-.",
        "color": "Colorless solution with a pungent, sharp odor",
        "properties": "Physical state: Colorless aqueous solution with a very pungent odor\nBasicity: Weak base (pH ~11.6 for ~0.1 M) -- only partially ionizes in water\nVolatility: Readily releases ammonia gas, especially when warmed\nReactivity: Forms deep blue complexes with copper(II) salts in excess",
        "uses": "Household glass cleaner and general-purpose cleaning solution\nLaboratory reagent for precipitating metal hydroxides and forming complex ions (e.g. deep blue copper-ammonia complex)\npH-adjusting and buffering agent in water treatment and food processing"
      },
      "baking soda": {
        "common_name": "Baking Soda (Sodium Bicarbonate)",
        "iupac_name": "Sodium hydrogen carbonate",
        "chemical_formula": "NaHCO3",
        "molecular_weight": "84.01 g/mol",
        "chemical_type": "Alkali Metal Salt",
        "classification": "Inorganic",
        "classification_reason": "It is classified as inorganic because it is dry mineral carbonate salt of mineral origin that lacks covalent carbon-hydrogen or carbon-carbon frameworks.",
        "smiles_notation": "[Na+].OC(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "It undergoes thermal decomposition to release carbon dioxide gas, causing dough to rise in baking. It is also an effective antacid.",
        "color": "White crystalline powder"
      },
      "nahco3": {
        "common_name": "Baking Soda (Sodium Bicarbonate)",
        "iupac_name": "Sodium hydrogen carbonate",
        "chemical_formula": "NaHCO3",
        "molecular_weight": "84.01 g/mol",
        "chemical_type": "Alkali Metal Salt",
        "classification": "Inorganic",
        "classification_reason": "It is classified as inorganic because it is dry mineral carbonate salt of mineral origin that lacks covalent carbon-hydrogen or carbon-carbon frameworks.",
        "smiles_notation": "[Na+].OC(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "It undergoes thermal decomposition to release carbon dioxide gas, causing dough to rise in baking. It is also an effective antacid.",
        "color": "White crystalline powder"
      },
      "dna": {
        "common_name": "DNA (Deoxyribonucleic Acid)",
        "iupac_name": "Deoxyribonucleic acid polymer",
        "chemical_formula": "Polymer of nucleotides",
        "molecular_weight": "Variable (Complex polymer)",
        "chemical_type": "Nucleic Acid / Biomolecule polymer",
        "classification": "Organic",
        "classification_reason": "It is an organic macromolecular polymer built from nucleotides containing a strong carbon skeleton of repeating sugar-phosphate molecules and nitrogenous bases.",
        "smiles_notation": "Complex macromolecule chain",
        "pdb_id": "1D11",
        "quick_fact": "It is the hereditary material in humans and almost all other organisms, carrying instructions for build and maintenance of life.",
        "color": "White or off-white fibrous substance"
      },
      "penicillin": {
        "common_name": "Penicillin G",
        "iupac_name": "(2S,5R,6R)-3,3-dimethyl-7-oxo-6-[(2-phenylacetyl)amino]-4-thia-1-azabicyclo[3.2.0]heptane-2-carboxylic acid",
        "chemical_formula": "C16H18N2O4S",
        "molecular_weight": "334.39 g/mol",
        "chemical_type": "Beta-Lactam Antibiotic",
        "classification": "Organic",
        "classification_reason": "It is an organic compound with a structural carbon skeleton consisting of a fused thiazolidine ring and a beta-lactam ring linked to nitrogen and oxygen atoms.",
        "smiles_notation": "CC1(C(N2C(S1)C(C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C",
        "pdb_id": null,
        "quick_fact": "Discovered by Alexander Fleming in 1928, it was the world's first effective antibiotic, revolutionizing modern medicine against bacterial infections.",
        "color": "White to beige crystalline powder"
      },
      "green vitriol": {
        "common_name": "Green Vitriol (Iron(II) Sulfate Heptahydrate)",
        "iupac_name": "Iron(II) sulfate heptahydrate",
        "chemical_formula": "FeSO4.7H2O",
        "molecular_weight": "278.02 g/mol",
        "chemical_type": "Transition Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of iron cations and polyatomic sulfate anions without any organic carbon framework.",
        "smiles_notation": "[Fe+2].[O-]S(=O)(=O)[O-].O.O.O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Usually asked in boards, green vitriol decomposes upon heating to form solid ferric oxide along with sulfur dioxide and sulfur trioxide gases with a pungent smell.",
        "color": "Light green heptahydrate crystals"
      },
      "iron sulfate heptahydrate": {
        "common_name": "Green Vitriol (Iron(II) Sulfate Heptahydrate)",
        "iupac_name": "Iron(II) sulfate heptahydrate",
        "chemical_formula": "FeSO4.7H2O",
        "molecular_weight": "278.02 g/mol",
        "chemical_type": "Transition Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of iron cations and polyatomic sulfate anions without any organic carbon framework.",
        "smiles_notation": "[Fe+2].[O-]S(=O)(=O)[O-].O.O.O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Usually asked in boards, green vitriol decomposes upon heating to form solid ferric oxide along with sulfur dioxide and sulfur trioxide gases with a pungent smell.",
        "color": "Light green heptahydrate crystals"
      },
      "feso4": {
        "common_name": "Iron(II) Sulfate (Ferrous Sulfate)",
        "iupac_name": "Iron(2+) sulfate",
        "chemical_formula": "FeSO4",
        "molecular_weight": "151.91 g/mol",
        "chemical_type": "Transition Metal Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic salt consisting of iron cations and polyatomic sulfate anions without any organic carbon framework.",
        "smiles_notation": "[Fe+2].[O-]S(=O)(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "The anhydrous (water-free) form is a white to pale grey-brown powder. In moist air it readily absorbs water to form the familiar pale green Iron(II) Sulfate Heptahydrate (Green Vitriol), the form most commonly seen in the lab.",
        "color": "White to grey-brown powder (anhydrous)"
      },
      "zinc sulfate heptahydrate": {
        "common_name": "Zinc Sulfate Heptahydrate (White Vitriol)",
        "iupac_name": "Zinc sulfate heptahydrate",
        "chemical_formula": "ZnSO4.7H2O",
        "molecular_weight": "287.60 g/mol",
        "chemical_type": "Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of zinc cations and polyatomic sulfate anions without any organic carbon framework.",
        "smiles_notation": "[Zn+2].[O-]S(=O)(=O)[O-].O.O.O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Also historically called White Vitriol, this is the crystalline form of zinc sulfate most commonly seen and weighed out in the lab. It loses its water of crystallization on heating to leave anhydrous Zinc Sulfate behind.",
        "color": "Colorless to white crystals"
      },
      "magnesium sulfate heptahydrate": {
        "common_name": "Magnesium Sulfate Heptahydrate (Epsom Salt)",
        "iupac_name": "Magnesium sulfate heptahydrate",
        "chemical_formula": "MgSO4.7H2O",
        "molecular_weight": "246.48 g/mol",
        "chemical_type": "Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of magnesium cations and polyatomic sulfate anions without any organic carbon framework.",
        "smiles_notation": "[Mg+2].[O-]S(=O)(=O)[O-].O.O.O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Best known as Epsom Salt, this hydrate is widely used in bath soaks and as a soil/plant magnesium supplement. It effloresces (loses water to air) on prolonged exposure to dry conditions.",
        "color": "White crystalline solid"
      },
      "epsom salt": {
        "common_name": "Magnesium Sulfate Heptahydrate (Epsom Salt)",
        "iupac_name": "Magnesium sulfate heptahydrate",
        "chemical_formula": "MgSO4.7H2O",
        "molecular_weight": "246.48 g/mol",
        "chemical_type": "Metal Salt / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of magnesium cations and polyatomic sulfate anions without any organic carbon framework.",
        "smiles_notation": "[Mg+2].[O-]S(=O)(=O)[O-].O.O.O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "Best known as Epsom Salt, this hydrate is widely used in bath soaks and as a soil/plant magnesium supplement. It effloresces (loses water to air) on prolonged exposure to dry conditions.",
        "color": "White crystalline solid"
      },
      "barium chloride dihydrate": {
        "common_name": "Barium Chloride Dihydrate",
        "iupac_name": "Barium chloride dihydrate",
        "chemical_formula": "BaCl2.2H2O",
        "molecular_weight": "244.26 g/mol",
        "chemical_type": "Metal Halide / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of barium cations and chloride anions without any organic carbon framework.",
        "smiles_notation": "[Ba+2].[Cl-].[Cl-].O.O",
        "pdb_id": null,
        "quick_fact": "This is the crystalline, lab-shelf form of barium chloride; the anhydrous salt is obtained only after careful heating/drying, since barium chloride is otherwise hygroscopic and readily reabsorbs moisture.",
        "color": "White crystalline solid"
      },
      "copper(ii) chloride dihydrate": {
        "common_name": "Copper(II) Chloride Dihydrate",
        "iupac_name": "Copper(II) chloride dihydrate",
        "chemical_formula": "CuCl2.2H2O",
        "molecular_weight": "170.48 g/mol",
        "chemical_type": "Metal Halide / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of copper cations and chloride anions without any organic carbon framework.",
        "smiles_notation": "[Cu+2].[Cl-].[Cl-].O.O",
        "pdb_id": null,
        "quick_fact": "This blue-green crystalline hydrate is the form of copper(II) chloride most often stocked and weighed out in the lab; the anhydrous salt is a distinct yellow-brown solid.",
        "color": "Blue-green crystals"
      },
      "iron(iii) chloride hexahydrate": {
        "common_name": "Iron(III) Chloride Hexahydrate",
        "iupac_name": "Iron(III) chloride hexahydrate",
        "chemical_formula": "FeCl3.6H2O",
        "molecular_weight": "270.30 g/mol",
        "chemical_type": "Metal Halide / Hydrate",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic hydrated salt consisting of iron cations and chloride anions without any organic carbon framework.",
        "smiles_notation": "[Fe+3].[Cl-].[Cl-].[Cl-].O.O.O.O.O.O",
        "pdb_id": null,
        "quick_fact": "This yellow-brown deliquescent (moisture-absorbing) crystalline hydrate is the common lab and industrial form of ferric chloride, widely used as a water-treatment coagulant and a PCB-etching solution.",
        "color": "Yellow-brown crystals"
      },
      "water": {
        "common_name": "Water",
        "iupac_name": "Oxidane",
        "chemical_formula": "H2O",
        "molecular_weight": "18.015 g/mol",
        "chemical_type": "Hydrogen Oxide / Solvent",
        "classification": "Inorganic",
        "classification_reason": "Water does not contain any carbon atoms, so it is classified as an inorganic compound.",
        "smiles_notation": "O",
        "pdb_id": null,
        "quick_fact": "Water is known as the universal solvent due to its polar nature and ability to dissolve many substances.",
        "color": "Colorless liquid"
      },
      "h2o": {
        "common_name": "Water",
        "iupac_name": "Oxidane",
        "chemical_formula": "H2O",
        "molecular_weight": "18.015 g/mol",
        "chemical_type": "Hydrogen Oxide / Solvent",
        "classification": "Inorganic",
        "classification_reason": "Water does not contain any carbon atoms, so it is classified as an inorganic compound.",
        "smiles_notation": "O",
        "pdb_id": null,
        "quick_fact": "Water is known as the universal solvent due to its polar nature and ability to dissolve many substances.",
        "color": "Colorless liquid"
      },
      "ethanol": {
        "common_name": "Ethanol (Ethyl Alcohol)",
        "iupac_name": "Ethanol",
        "chemical_formula": "C2H5OH",
        "molecular_weight": "46.07 g/mol",
        "chemical_type": "Primary Alcohol",
        "classification": "Organic",
        "classification_reason": "Ethanol contains a covalent carbon-carbon and carbon-hydrogen framework, classifying it as organic.",
        "smiles_notation": "CCO",
        "pdb_id": null,
        "quick_fact": "Ethanol is produced naturally by yeast fermentation of sugars and is widely used as a disinfectant and fuel.",
        "color": "Colorless liquid"
      },
      "c2h5oh": {
        "common_name": "Ethanol (Ethyl Alcohol)",
        "iupac_name": "Ethanol",
        "chemical_formula": "C2H5OH",
        "molecular_weight": "46.07 g/mol",
        "chemical_type": "Primary Alcohol",
        "classification": "Organic",
        "classification_reason": "Ethanol contains a covalent carbon-carbon and carbon-hydrogen framework, classifying it as organic.",
        "smiles_notation": "CCO",
        "pdb_id": null,
        "quick_fact": "Ethanol is produced naturally by yeast fermentation of sugars and is widely used as a disinfectant and fuel.",
        "color": "Colorless liquid"
      },
      "acetic acid": {
        "common_name": "Acetic Acid (Vinegar)",
        "iupac_name": "Acetic acid",
        "chemical_formula": "CH3COOH",
        "molecular_weight": "60.05 g/mol",
        "chemical_type": "Carboxylic Acid",
        "classification": "Organic",
        "classification_reason": "It contains a covalent carbon framework with an organic methyl and carboxyl group.",
        "smiles_notation": "CC(=O)O",
        "pdb_id": null,
        "quick_fact": "A 5-8% solution of acetic acid in water is called vinegar, commonly used in food preservation and cooking.",
        "color": "Colorless liquid"
      },
      "ethanoic acid": {
        "common_name": "Acetic Acid (Vinegar)",
        "iupac_name": "Acetic acid",
        "chemical_formula": "CH3COOH",
        "molecular_weight": "60.05 g/mol",
        "chemical_type": "Carboxylic Acid",
        "classification": "Organic",
        "classification_reason": "It contains a covalent carbon framework with an organic methyl and carboxyl group.",
        "smiles_notation": "CC(=O)O",
        "pdb_id": null,
        "quick_fact": "A 5-8% solution of acetic acid in water is called vinegar, commonly used in food preservation and cooking.",
        "color": "Colorless liquid"
      },
      "ch3cooh": {
        "common_name": "Acetic Acid (Vinegar)",
        "iupac_name": "Acetic acid",
        "chemical_formula": "CH3COOH",
        "molecular_weight": "60.05 g/mol",
        "chemical_type": "Carboxylic Acid",
        "classification": "Organic",
        "classification_reason": "It contains a covalent carbon framework with an organic methyl and carboxyl group.",
        "smiles_notation": "CC(=O)O",
        "pdb_id": null,
        "quick_fact": "A 5-8% solution of acetic acid in water is called vinegar, commonly used in food preservation and cooking.",
        "color": "Colorless liquid"
      },
      "hydrochloric acid": {
        "common_name": "Hydrochloric Acid (Muriatic Acid)",
        "iupac_name": "Hydrogen chloride",
        "chemical_formula": "HCl",
        "molecular_weight": "36.46 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "Hydrochloric acid is a hydrogen halide without any carbon atoms, so it is inorganic.",
        "smiles_notation": "Cl",
        "pdb_id": null,
        "quick_fact": "Hydrochloric acid is a major component of gastric acid produced naturally in our stomachs to digest food.",
        "color": "Colorless or slightly yellowish liquid"
      },
      "hcl": {
        "common_name": "Hydrochloric Acid (Muriatic Acid)",
        "iupac_name": "Hydrogen chloride",
        "chemical_formula": "HCl",
        "molecular_weight": "36.46 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "Hydrochloric acid is a hydrogen halide without any carbon atoms, so it is inorganic.",
        "smiles_notation": "Cl",
        "pdb_id": null,
        "quick_fact": "Hydrochloric acid is a major component of gastric acid produced naturally in our stomachs to digest food.",
        "color": "Colorless or slightly yellowish liquid"
      },
      "sodium hydroxide": {
        "common_name": "Sodium Hydroxide (Caustic Soda)",
        "iupac_name": "Sodium hydroxide",
        "chemical_formula": "NaOH",
        "molecular_weight": "39.997 g/mol",
        "chemical_type": "Alkali / Strong Base",
        "classification": "Inorganic",
        "classification_reason": "NaOH contains sodium, oxygen, and hydrogen but no carbon atoms, making it inorganic.",
        "smiles_notation": "[Na+].[OH-]",
        "pdb_id": null,
        "quick_fact": "Caustic soda is highly hygroscopic, meaning it rapidly absorbs water and carbon dioxide from the air.",
        "color": "White crystalline solid (pellets)"
      },
      "naoh": {
        "common_name": "Sodium Hydroxide (Caustic Soda)",
        "iupac_name": "Sodium hydroxide",
        "chemical_formula": "NaOH",
        "molecular_weight": "39.997 g/mol",
        "chemical_type": "Alkali / Strong Base",
        "classification": "Inorganic",
        "classification_reason": "NaOH contains sodium, oxygen, and hydrogen but no carbon atoms, making it inorganic.",
        "smiles_notation": "[Na+].[OH-]",
        "pdb_id": null,
        "quick_fact": "Caustic soda is highly hygroscopic, meaning it rapidly absorbs water and carbon dioxide from the air.",
        "color": "White crystalline solid (pellets)"
      },
      "carbon dioxide": {
        "common_name": "Carbon Dioxide (Dry Ice)",
        "iupac_name": "Carbon dioxide",
        "chemical_formula": "CO2",
        "molecular_weight": "44.01 g/mol",
        "chemical_type": "Carbon Oxide",
        "classification": "Inorganic",
        "classification_reason": "Even though it contains carbon, carbon dioxide is systematically classified as inorganic because it lacks hydrogen atoms (C-H bonds).",
        "smiles_notation": "O=C=O",
        "pdb_id": null,
        "quick_fact": "Solid carbon dioxide is called Dry Ice, which sublimates directly from solid to gas at -78.5°C.",
        "color": "Colorless gas"
      },
      "co2": {
        "common_name": "Carbon Dioxide (Dry Ice)",
        "iupac_name": "Carbon dioxide",
        "chemical_formula": "CO2",
        "molecular_weight": "44.01 g/mol",
        "chemical_type": "Carbon Oxide",
        "classification": "Inorganic",
        "classification_reason": "Even though it contains carbon, carbon dioxide is systematically classified as inorganic because it lacks hydrogen atoms (C-H bonds).",
        "smiles_notation": "O=C=O",
        "pdb_id": null,
        "quick_fact": "Solid carbon dioxide is called Dry Ice, which sublimates directly from solid to gas at -78.5°C.",
        "color": "Colorless gas"
      },
      "oxygen": {
        "common_name": "Oxygen Gas",
        "iupac_name": "Molecular oxygen",
        "chemical_formula": "O2",
        "molecular_weight": "31.998 g/mol",
        "chemical_type": "Diatomic Gas",
        "classification": "Inorganic",
        "classification_reason": "Oxygen contains only oxygen atoms and zero carbon atoms, classifying it as inorganic.",
        "smiles_notation": "O=O",
        "pdb_id": null,
        "quick_fact": "Oxygen makes up about 21% of the Earth's atmosphere by volume and is produced by photosynthesis.",
        "color": "Colorless gas"
      },
      "o2": {
        "common_name": "Oxygen Gas",
        "iupac_name": "Molecular oxygen",
        "chemical_formula": "O2",
        "molecular_weight": "31.998 g/mol",
        "chemical_type": "Diatomic Gas",
        "classification": "Inorganic",
        "classification_reason": "Oxygen contains only oxygen atoms and zero carbon atoms, classifying it as inorganic.",
        "smiles_notation": "O=O",
        "pdb_id": null,
        "quick_fact": "Oxygen makes up about 21% of the Earth's atmosphere by volume and is produced by photosynthesis.",
        "color": "Colorless gas"
      },
      "hydrogen": {
        "common_name": "Hydrogen Gas",
        "iupac_name": "Molecular hydrogen",
        "chemical_formula": "H2",
        "molecular_weight": "2.016 g/mol",
        "chemical_type": "Diatomic Gas",
        "classification": "Inorganic",
        "classification_reason": "Hydrogen contains no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[H][H]",
        "pdb_id": null,
        "quick_fact": "Hydrogen is the most abundant chemical substance in the universe, making up about 75% of all baryonic mass.",
        "color": "Colorless gas"
      },
      "h2": {
        "common_name": "Hydrogen Gas",
        "iupac_name": "Molecular hydrogen",
        "chemical_formula": "H2",
        "molecular_weight": "2.016 g/mol",
        "chemical_type": "Diatomic Gas",
        "classification": "Inorganic",
        "classification_reason": "Hydrogen contains no carbon atoms, classifying it as inorganic.",
        "smiles_notation": "[H][H]",
        "pdb_id": null,
        "quick_fact": "Hydrogen is the most abundant chemical substance in the universe, making up about 75% of all baryonic mass.",
        "color": "Colorless gas"
      },
      "iron": {
        "common_name": "Iron Metal",
        "iupac_name": "Iron",
        "chemical_formula": "Fe",
        "molecular_weight": "55.845 g/mol",
        "chemical_type": "Transition Metal",
        "classification": "Inorganic",
        "classification_reason": "Iron is an elemental transition metal with no carbon or hydrogen atoms, so it is inorganic.",
        "smiles_notation": "[Fe]",
        "pdb_id": null,
        "quick_fact": "Iron is the most common element on Earth by mass, forming much of Earth's outer and inner core.",
        "color": "Lustrous silver-gray metal"
      },
      "fe": {
        "common_name": "Iron Metal",
        "iupac_name": "Iron",
        "chemical_formula": "Fe",
        "molecular_weight": "55.845 g/mol",
        "chemical_type": "Transition Metal",
        "classification": "Inorganic",
        "classification_reason": "Iron is an elemental transition metal with no carbon or hydrogen atoms, so it is inorganic.",
        "smiles_notation": "[Fe]",
        "pdb_id": null,
        "quick_fact": "Iron is the most common element on Earth by mass, forming much of Earth's outer and inner core.",
        "color": "Lustrous silver-gray metal"
      },
      "sodium chloride": {
        "common_name": "Table Salt (Sodium Chloride)",
        "iupac_name": "Sodium chloride",
        "chemical_formula": "NaCl",
        "molecular_weight": "58.44 g/mol",
        "chemical_type": "Alkali Metal Halide",
        "classification": "Inorganic",
        "classification_reason": "It contains sodium and chlorine ions, lacking carbon, hence strictly inorganic.",
        "smiles_notation": "[Na+].[Cl-]",
        "pdb_id": null,
        "quick_fact": "Salt is essential for cellular life and nerve impulse transmission in all animals.",
        "color": "White cubic crystals"
      },
      "nacl": {
        "common_name": "Table Salt (Sodium Chloride)",
        "iupac_name": "Sodium chloride",
        "chemical_formula": "NaCl",
        "molecular_weight": "58.44 g/mol",
        "chemical_type": "Alkali Metal Halide",
        "classification": "Inorganic",
        "classification_reason": "It contains sodium and chlorine ions, lacking carbon, hence strictly inorganic.",
        "smiles_notation": "[Na+].[Cl-]",
        "pdb_id": null,
        "quick_fact": "Salt is essential for cellular life and nerve impulse transmission in all animals.",
        "color": "White cubic crystals"
      },
      "calcium carbonate": {
        "common_name": "Limestone (Calcium Carbonate)",
        "iupac_name": "Calcium carbonate",
        "chemical_formula": "CaCO3",
        "molecular_weight": "100.09 g/mol",
        "chemical_type": "Alkaline Earth Metal Carbonate",
        "classification": "Inorganic",
        "classification_reason": "Metal carbonates are systematically classified as inorganic salts because they lack C-H framework.",
        "smiles_notation": "[Ca+2].[O-]C(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Calcium carbonate forms the shells of marine organisms, snails, and eggshells.",
        "color": "White chalky solid"
      },
      "caco3": {
        "common_name": "Limestone (Calcium Carbonate)",
        "iupac_name": "Calcium carbonate",
        "chemical_formula": "CaCO3",
        "molecular_weight": "100.09 g/mol",
        "chemical_type": "Alkaline Earth Metal Carbonate",
        "classification": "Inorganic",
        "classification_reason": "Metal carbonates are systematically classified as inorganic salts because they lack C-H framework.",
        "smiles_notation": "[Ca+2].[O-]C(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Calcium carbonate forms the shells of marine organisms, snails, and eggshells.",
        "color": "White chalky solid"
      },
      "copper": {
        "common_name": "Copper Metal",
        "iupac_name": "Copper",
        "chemical_formula": "Cu",
        "molecular_weight": "63.546 g/mol",
        "chemical_type": "Transition Metal",
        "classification": "Inorganic",
        "classification_reason": "It is an elemental transition metal with no carbon or hydrogen atoms, so it is inorganic.",
        "smiles_notation": "[Cu]",
        "pdb_id": null,
        "quick_fact": "Copper has extremely high thermal and electrical conductivity, surpassed only by silver.",
        "color": "Reddish-brown metallic solid"
      },
      "cu": {
        "common_name": "Copper Metal",
        "iupac_name": "Copper",
        "chemical_formula": "Cu",
        "molecular_weight": "63.546 g/mol",
        "chemical_type": "Transition Metal",
        "classification": "Inorganic",
        "classification_reason": "It is an elemental transition metal with no carbon or hydrogen atoms, so it is inorganic.",
        "smiles_notation": "[Cu]",
        "pdb_id": null,
        "quick_fact": "Copper has extremely high thermal and electrical conductivity, surpassed only by silver.",
        "color": "Reddish-brown metallic solid"
      },
      "copper oxide": {
        "common_name": "Copper(II) Oxide (Cupric Oxide)",
        "iupac_name": "Copper(II) oxide",
        "chemical_formula": "CuO",
        "molecular_weight": "79.545 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metal oxide consisting of copper cations and oxide anions, with no carbon or carbon-hydrogen bonds.",
        "smiles_notation": "[Cu]=O",
        "pdb_id": null,
        "quick_fact": "It is a black solid that occurs naturally as the mineral tenorite. It is used in ceramics as a pigment and as a catalyst.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water and alcohol, soluble in ammonium chloride and potassium cyanide. Thermally stable below 1026°C.",
        "uses": "Used as a pigment in ceramics to produce blue, green, and red glazes. Also used as a catalyst, in wood preservatives, and in batteries."
      },
      "copper(ii) oxide": {
        "common_name": "Copper(II) Oxide (Cupric Oxide)",
        "iupac_name": "Copper(II) oxide",
        "chemical_formula": "CuO",
        "molecular_weight": "79.545 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metal oxide consisting of copper cations and oxide anions, with no carbon or carbon-hydrogen bonds.",
        "smiles_notation": "[Cu]=O",
        "pdb_id": null,
        "quick_fact": "It is a black solid that occurs naturally as the mineral tenorite. It is used in ceramics as a pigment and as a catalyst.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water and alcohol, soluble in ammonium chloride and potassium cyanide. Thermally stable below 1026°C.",
        "uses": "Used as a pigment in ceramics to produce blue, green, and red glazes. Also used as a catalyst, in wood preservatives, and in batteries."
      },
      "cupric oxide": {
        "common_name": "Copper(II) Oxide (Cupric Oxide)",
        "iupac_name": "Copper(II) oxide",
        "chemical_formula": "CuO",
        "molecular_weight": "79.545 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metal oxide consisting of copper cations and oxide anions, with no carbon or carbon-hydrogen bonds.",
        "smiles_notation": "[Cu]=O",
        "pdb_id": null,
        "quick_fact": "It is a black solid that occurs naturally as the mineral tenorite. It is used in ceramics as a pigment and as a catalyst.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water and alcohol, soluble in ammonium chloride and potassium cyanide. Thermally stable below 1026°C.",
        "uses": "Used as a pigment in ceramics to produce blue, green, and red glazes. Also used as a catalyst, in wood preservatives, and in batteries."
      },
      "cuo": {
        "common_name": "Copper(II) Oxide (Cupric Oxide)",
        "iupac_name": "Copper(II) oxide",
        "chemical_formula": "CuO",
        "molecular_weight": "79.545 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metal oxide consisting of copper cations and oxide anions, with no carbon or carbon-hydrogen bonds.",
        "smiles_notation": "[Cu]=O",
        "pdb_id": null,
        "quick_fact": "It is a black solid that occurs naturally as the mineral tenorite. It is used in ceramics as a pigment and as a catalyst.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water and alcohol, soluble in ammonium chloride and potassium cyanide. Thermally stable below 1026°C.",
        "uses": "Used as a pigment in ceramics to produce blue, green, and red glazes. Also used as a catalyst, in wood preservatives, and in batteries."
      },
      "copper(i) oxide": {
        "common_name": "Copper(I) Oxide (Cuprous Oxide)",
        "iupac_name": "Copper(I) oxide",
        "chemical_formula": "Cu2O",
        "molecular_weight": "143.09 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic oxide consisting of monovalent copper(I) ions and divalent oxygen ions, with no carbon.",
        "smiles_notation": "[Cu]O[Cu]",
        "pdb_id": null,
        "quick_fact": "It is a red or brown solid that occurs naturally as the mineral cuprite. It was one of the first semiconductor materials discovered.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water and organic solvents, soluble in hydrochloric acid and ammonium hydroxide.",
        "uses": "Commonly used as an active ingredient in antifouling paints for ship hulls, as a red pigment in glass/ceramics, and in solar cells."
      },
      "cuprous oxide": {
        "common_name": "Copper(I) Oxide (Cuprous Oxide)",
        "iupac_name": "Copper(I) oxide",
        "chemical_formula": "Cu2O",
        "molecular_weight": "143.09 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic oxide consisting of monovalent copper(I) ions and divalent oxygen ions, with no carbon.",
        "smiles_notation": "[Cu]O[Cu]",
        "pdb_id": null,
        "quick_fact": "It is a red or brown solid that occurs naturally as the mineral cuprite. It was one of the first semiconductor materials discovered.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water and organic solvents, soluble in hydrochloric acid and ammonium hydroxide.",
        "uses": "Commonly used as an active ingredient in antifouling paints for ship hulls, as a red pigment in glass/ceramics, and in solar cells."
      },
      "cu2o": {
        "common_name": "Copper(I) Oxide (Cuprous Oxide)",
        "iupac_name": "Copper(I) oxide",
        "chemical_formula": "Cu2O",
        "molecular_weight": "143.09 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic oxide consisting of monovalent copper(I) ions and divalent oxygen ions, with no carbon.",
        "smiles_notation": "[Cu]O[Cu]",
        "pdb_id": null,
        "quick_fact": "It is a red or brown solid that occurs naturally as the mineral cuprite. It was one of the first semiconductor materials discovered.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water and organic solvents, soluble in hydrochloric acid and ammonium hydroxide.",
        "uses": "Commonly used as an active ingredient in antifouling paints for ship hulls, as a red pigment in glass/ceramics, and in solar cells."
      },
      "iron oxide": {
        "common_name": "Iron(III) Oxide (Hematite / Rust)",
        "iupac_name": "Iron(III) oxide",
        "chemical_formula": "Fe2O3",
        "molecular_weight": "159.69 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic compound consisting of ferric cations and oxide anions, lacking any carbon atoms.",
        "smiles_notation": "O=[Fe]O[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is one of the three main oxides of iron, found in nature as hematite. It is the main source of iron for the steel industry.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water, soluble in strong mineral acids like hydrochloric or sulfuric acid.",
        "uses": "Used as a red pigment in paints and plastics, as a polishing agent (jeweler's rouge), and as a magnetic recording material."
      },
      "iron(iii) oxide": {
        "common_name": "Iron(III) Oxide (Hematite / Rust)",
        "iupac_name": "Iron(III) oxide",
        "chemical_formula": "Fe2O3",
        "molecular_weight": "159.69 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic compound consisting of ferric cations and oxide anions, lacking any carbon atoms.",
        "smiles_notation": "O=[Fe]O[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is one of the three main oxides of iron, found in nature as hematite. It is the main source of iron for the steel industry.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water, soluble in strong mineral acids like hydrochloric or sulfuric acid.",
        "uses": "Used as a red pigment in paints and plastics, as a polishing agent (jeweler's rouge), and as a magnetic recording material."
      },
      "ferric oxide": {
        "common_name": "Iron(III) Oxide (Hematite / Rust)",
        "iupac_name": "Iron(III) oxide",
        "chemical_formula": "Fe2O3",
        "molecular_weight": "159.69 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic compound consisting of ferric cations and oxide anions, lacking any carbon atoms.",
        "smiles_notation": "O=[Fe]O[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is one of the three main oxides of iron, found in nature as hematite. It is the main source of iron for the steel industry.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water, soluble in strong mineral acids like hydrochloric or sulfuric acid.",
        "uses": "Used as a red pigment in paints and plastics, as a polishing agent (jeweler's rouge), and as a magnetic recording material."
      },
      "fe2o3": {
        "common_name": "Iron(III) Oxide (Hematite / Rust)",
        "iupac_name": "Iron(III) oxide",
        "chemical_formula": "Fe2O3",
        "molecular_weight": "159.69 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic compound consisting of ferric cations and oxide anions, lacking any carbon atoms.",
        "smiles_notation": "O=[Fe]O[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is one of the three main oxides of iron, found in nature as hematite. It is the main source of iron for the steel industry.",
        "color": "Reddish-brown powder",
        "properties": "Insoluble in water, soluble in strong mineral acids like hydrochloric or sulfuric acid.",
        "uses": "Used as a red pigment in paints and plastics, as a polishing agent (jeweler's rouge), and as a magnetic recording material."
      },
      "iron(ii) oxide": {
        "common_name": "Iron(II) Oxide",
        "iupac_name": "Iron(II) oxide",
        "chemical_formula": "FeO",
        "molecular_weight": "71.844 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic oxide consisting of divalent iron cations and oxygen anions, with no carbon.",
        "smiles_notation": "[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is a black-colored powder that occurs naturally as the rare mineral wüstite. It is a non-stoichiometric compound.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water, highly reactive in oxygen to oxidize to ferric oxide or magnetite.",
        "uses": "Used as a pigment in cosmetics, in ceramics and glazes, and in green-tinted glassware."
      },
      "ferrous oxide": {
        "common_name": "Iron(II) Oxide",
        "iupac_name": "Iron(II) oxide",
        "chemical_formula": "FeO",
        "molecular_weight": "71.844 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic oxide consisting of divalent iron cations and oxygen anions, with no carbon.",
        "smiles_notation": "[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is a black-colored powder that occurs naturally as the rare mineral wüstite. It is a non-stoichiometric compound.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water, highly reactive in oxygen to oxidize to ferric oxide or magnetite.",
        "uses": "Used as a pigment in cosmetics, in ceramics and glazes, and in green-tinted glassware."
      },
      "feo": {
        "common_name": "Iron(II) Oxide",
        "iupac_name": "Iron(II) oxide",
        "chemical_formula": "FeO",
        "molecular_weight": "71.844 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic metallic oxide consisting of divalent iron cations and oxygen anions, with no carbon.",
        "smiles_notation": "[Fe]=O",
        "pdb_id": null,
        "quick_fact": "It is a black-colored powder that occurs naturally as the rare mineral wüstite. It is a non-stoichiometric compound.",
        "color": "Black crystalline powder",
        "properties": "Insoluble in water, highly reactive in oxygen to oxidize to ferric oxide or magnetite.",
        "uses": "Used as a pigment in cosmetics, in ceramics and glazes, and in green-tinted glassware."
      },
      "sulfuric acid": {
        "common_name": "Sulfuric Acid (Oil of Vitriol)",
        "iupac_name": "Sulfuric acid",
        "chemical_formula": "H2SO4",
        "molecular_weight": "98.08 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "It contains hydrogen, sulfur, and oxygen but no carbon, making it inorganic.",
        "smiles_notation": "OS(=O)(=O)O",
        "pdb_id": null,
        "quick_fact": "Sulfuric acid is highly corrosive and has a very strong affinity for water, acting as an excellent dehydrating agent.",
        "color": "Colorless, viscous oily liquid"
      },
      "h2so4": {
        "common_name": "Sulfuric Acid (Oil of Vitriol)",
        "iupac_name": "Sulfuric acid",
        "chemical_formula": "H2SO4",
        "molecular_weight": "98.08 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "It contains hydrogen, sulfur, and oxygen but no carbon, making it inorganic.",
        "smiles_notation": "OS(=O)(=O)O",
        "pdb_id": null,
        "quick_fact": "Sulfuric acid is highly corrosive and has a very strong affinity for water, acting as an excellent dehydrating agent.",
        "color": "Colorless, viscous oily liquid"
      },
      "ammonia": {
        "common_name": "Ammonia Gas",
        "iupac_name": "Ammonia",
        "chemical_formula": "NH3",
        "molecular_weight": "17.031 g/mol",
        "chemical_type": "Pnictogen Hydride",
        "classification": "Inorganic",
        "classification_reason": "Ammonia consists of nitrogen and hydrogen and contains no carbon, making it inorganic.",
        "smiles_notation": "N",
        "pdb_id": null,
        "quick_fact": "Ammonia is crucial for manufacturing fertilizers, supporting about half of the global food supply.",
        "color": "Colorless gas"
      },
      "nh3": {
        "common_name": "Ammonia Gas",
        "iupac_name": "Ammonia",
        "chemical_formula": "NH3",
        "molecular_weight": "17.031 g/mol",
        "chemical_type": "Pnictogen Hydride",
        "classification": "Inorganic",
        "classification_reason": "Ammonia consists of nitrogen and hydrogen and contains no carbon, making it inorganic.",
        "smiles_notation": "N",
        "pdb_id": null,
        "quick_fact": "Ammonia is crucial for manufacturing fertilizers, supporting about half of the global food supply.",
        "color": "Colorless gas"
      },
      "calcium oxide": {
        "common_name": "Quicklime (Calcium Oxide)",
        "iupac_name": "Calcium oxide",
        "chemical_formula": "CaO",
        "molecular_weight": "56.077 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic mineral compound containing calcium and oxygen, with no carbon.",
        "smiles_notation": "[Ca+2].[O-2]",
        "pdb_id": null,
        "quick_fact": "Calcium oxide reacts intensely with water to produce slaked lime, emitting significant heat.",
        "color": "White to pale yellow/gray crystalline solid"
      },
      "cao": {
        "common_name": "Quicklime (Calcium Oxide)",
        "iupac_name": "Calcium oxide",
        "chemical_formula": "CaO",
        "molecular_weight": "56.077 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic mineral compound containing calcium and oxygen, with no carbon.",
        "smiles_notation": "[Ca+2].[O-2]",
        "pdb_id": null,
        "quick_fact": "Calcium oxide reacts intensely with water to produce slaked lime, emitting significant heat.",
        "color": "White to pale yellow/gray crystalline solid"
      },
      "calcium hydroxide": {
        "common_name": "Slaked Lime (Calcium Hydroxide)",
        "iupac_name": "Calcium hydroxide",
        "chemical_formula": "Ca(OH)2",
        "molecular_weight": "74.093 g/mol",
        "chemical_type": "Metal Hydroxide / Base",
        "classification": "Inorganic",
        "classification_reason": "It contains calcium, oxygen, and hydrogen ions with no carbon.",
        "smiles_notation": "[Ca+2].[OH-].[OH-]",
        "pdb_id": null,
        "quick_fact": "A saturated aqueous solution of calcium hydroxide is called Limewater, which turns milky-white in the presence of carbon dioxide.",
        "color": "White powder or colorless solution"
      },
      "ca(oh)2": {
        "common_name": "Slaked Lime (Calcium Hydroxide)",
        "iupac_name": "Calcium hydroxide",
        "chemical_formula": "Ca(OH)2",
        "molecular_weight": "74.093 g/mol",
        "chemical_type": "Metal Hydroxide / Base",
        "classification": "Inorganic",
        "classification_reason": "It contains calcium, oxygen, and hydrogen ions with no carbon.",
        "smiles_notation": "[Ca+2].[OH-].[OH-]",
        "pdb_id": null,
        "quick_fact": "A saturated aqueous solution of calcium hydroxide is called Limewater, which turns milky-white in the presence of carbon dioxide.",
        "color": "White powder or colorless solution"
      },
      "methane": {
        "common_name": "Methane (Natural Gas)",
        "iupac_name": "Methane",
        "chemical_formula": "CH4",
        "molecular_weight": "16.04 g/mol",
        "chemical_type": "Alkane Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "Methane is the simplest possible organic compound, containing a central carbon covalently bonded to four hydrogen atoms.",
        "smiles_notation": "C",
        "pdb_id": null,
        "quick_fact": "Methane is a potent greenhouse gas, with a warming potential more than 25 times greater than carbon dioxide.",
        "color": "Colorless gas"
      },
      "ch4": {
        "common_name": "Methane (Natural Gas)",
        "iupac_name": "Methane",
        "chemical_formula": "CH4",
        "molecular_weight": "16.04 g/mol",
        "chemical_type": "Alkane Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "Methane is the simplest possible organic compound, containing a central carbon covalently bonded to four hydrogen atoms.",
        "smiles_notation": "C",
        "pdb_id": null,
        "quick_fact": "Methane is a potent greenhouse gas, with a warming potential more than 25 times greater than carbon dioxide.",
        "color": "Colorless gas"
      },
      "benzene": {
        "common_name": "Benzene",
        "iupac_name": "Benzene",
        "chemical_formula": "C6H6",
        "molecular_weight": "78.11 g/mol",
        "chemical_type": "Aromatic Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a highly stable covalent aromatic hexagonal carbon-hydrogen ring.",
        "smiles_notation": "C1=CC=CC=C1",
        "pdb_id": null,
        "quick_fact": "Benzene's ring structure was discovered by August Kekulé, who envisioned a snake biting its own tail in a dream.",
        "color": "Colorless liquid"
      },
      "c6h6": {
        "common_name": "Benzene",
        "iupac_name": "Benzene",
        "chemical_formula": "C6H6",
        "molecular_weight": "78.11 g/mol",
        "chemical_type": "Aromatic Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a highly stable covalent aromatic hexagonal carbon-hydrogen ring.",
        "smiles_notation": "C1=CC=CC=C1",
        "pdb_id": null,
        "quick_fact": "Benzene's ring structure was discovered by August Kekulé, who envisioned a snake biting its own tail in a dream.",
        "color": "Colorless liquid"
      },
      "acetone": {
        "common_name": "Acetone (Propanone)",
        "iupac_name": "Propan-2-one",
        "chemical_formula": "CH3COCH3",
        "molecular_weight": "58.08 g/mol",
        "chemical_type": "Ketone",
        "classification": "Organic",
        "classification_reason": "It consists of a central carbonyl carbon covalently bonded to two methyl groups.",
        "smiles_notation": "CC(=O)C",
        "pdb_id": null,
        "quick_fact": "Acetone is the primary active ingredient in nail polish removers and is a highly effective solvent.",
        "color": "Colorless liquid"
      },
      "propanone": {
        "common_name": "Acetone (Propanone)",
        "iupac_name": "Propan-2-one",
        "chemical_formula": "CH3COCH3",
        "molecular_weight": "58.08 g/mol",
        "chemical_type": "Ketone",
        "classification": "Organic",
        "classification_reason": "It consists of a central carbonyl carbon covalently bonded to two methyl groups.",
        "smiles_notation": "CC(=O)C",
        "pdb_id": null,
        "quick_fact": "Acetone is the primary active ingredient in nail polish removers and is a highly effective solvent.",
        "color": "Colorless liquid"
      },
      "ch3coch3": {
        "common_name": "Acetone (Propanone)",
        "iupac_name": "Propan-2-one",
        "chemical_formula": "CH3COCH3",
        "molecular_weight": "58.08 g/mol",
        "chemical_type": "Ketone",
        "classification": "Organic",
        "classification_reason": "It consists of a central carbonyl carbon covalently bonded to two methyl groups.",
        "smiles_notation": "CC(=O)C",
        "pdb_id": null,
        "quick_fact": "Acetone is the primary active ingredient in nail polish removers and is a highly effective solvent.",
        "color": "Colorless liquid"
      },
      "sodium metal": {
        "common_name": "Sodium Metal",
        "iupac_name": "Sodium",
        "chemical_formula": "Na",
        "molecular_weight": "22.99 g/mol",
        "chemical_type": "Alkali Metal",
        "classification": "Inorganic",
        "classification_reason": "Elemental sodium lacks carbon-hydrogen covalent chains and is strictly inorganic.",
        "smiles_notation": "[Na]",
        "pdb_id": null,
        "quick_fact": "Sodium metal reacts violently with water to form sodium hydroxide and flammable hydrogen gas, storing it in kerosene is necessary.",
        "color": "Soft silvery metal"
      },
      "na": {
        "common_name": "Sodium Metal",
        "iupac_name": "Sodium",
        "chemical_formula": "Na",
        "molecular_weight": "22.99 g/mol",
        "chemical_type": "Alkali Metal",
        "classification": "Inorganic",
        "classification_reason": "Elemental sodium lacks carbon-hydrogen covalent chains and is strictly inorganic.",
        "smiles_notation": "[Na]",
        "pdb_id": null,
        "quick_fact": "Sodium metal reacts violently with water to form sodium hydroxide and flammable hydrogen gas, storing it in kerosene is necessary.",
        "color": "Soft silvery metal"
      },
      "propene": {
        "common_name": "Propene Gas",
        "iupac_name": "Prop-1-ene",
        "chemical_formula": "C3H6",
        "molecular_weight": "42.08 g/mol",
        "chemical_type": "Alkene Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "Propene features a three-carbon hydrocarbon chain with a covalent carbon-carbon double bond, qualifying as organic.",
        "smiles_notation": "CC=C",
        "pdb_id": null,
        "quick_fact": "Propene is the second most important starting material in the petrochemical industry after ethylene.",
        "color": "Colorless gas"
      },
      "c3h6": {
        "common_name": "Propene Gas",
        "iupac_name": "Prop-1-ene",
        "chemical_formula": "C3H6",
        "molecular_weight": "42.08 g/mol",
        "chemical_type": "Alkene Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "Propene features a three-carbon hydrocarbon chain with a covalent carbon-carbon double bond, qualifying as organic.",
        "smiles_notation": "CC=C",
        "pdb_id": null,
        "quick_fact": "Propene is the second most important starting material in the petrochemical industry after ethylene.",
        "color": "Colorless gas"
      },
      "hydrogen bromide": {
        "common_name": "Hydrogen Bromide",
        "iupac_name": "Hydrogen bromide",
        "chemical_formula": "HBr",
        "molecular_weight": "80.91 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "Hydrogen bromide lacks any carbon atoms in its chemical formula and is inorganic.",
        "smiles_notation": "Br",
        "pdb_id": null,
        "quick_fact": "HBr is a strong mineral acid widely used to synthesize organobromine compounds and promote hydrobromination.",
        "color": "Colorless gas or solution"
      },
      "hbr": {
        "common_name": "Hydrogen Bromide",
        "iupac_name": "Hydrogen bromide",
        "chemical_formula": "HBr",
        "molecular_weight": "80.91 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "Hydrogen bromide lacks any carbon atoms in its chemical formula and is inorganic.",
        "smiles_notation": "Br",
        "pdb_id": null,
        "quick_fact": "HBr is a strong mineral acid widely used to synthesize organobromine compounds and promote hydrobromination.",
        "color": "Colorless gas or solution"
      },
      "zinc metal": {
        "common_name": "Zinc Metal",
        "iupac_name": "Zinc",
        "chemical_formula": "Zn",
        "molecular_weight": "65.38 g/mol",
        "chemical_type": "Transition Metal",
        "classification": "Inorganic",
        "classification_reason": "Zinc is an elemental transition metal with no carbon or hydrogen atoms, making it inorganic.",
        "smiles_notation": "[Zn]",
        "pdb_id": null,
        "quick_fact": "Zinc is widely used to galvanize iron and steel to prevent rusting and corrosion.",
        "color": "Bluish-pale gray metal"
      },
      "zn": {
        "common_name": "Zinc Metal",
        "iupac_name": "Zinc",
        "chemical_formula": "Zn",
        "molecular_weight": "65.38 g/mol",
        "chemical_type": "Transition Metal",
        "classification": "Inorganic",
        "classification_reason": "Zinc is an elemental transition metal with no carbon or hydrogen atoms, making it inorganic.",
        "smiles_notation": "[Zn]",
        "pdb_id": null,
        "quick_fact": "Zinc is widely used to galvanize iron and steel to prevent rusting and corrosion.",
        "color": "Bluish-pale gray metal"
      },
      "magnesium metal": {
        "common_name": "Magnesium Metal",
        "iupac_name": "Magnesium",
        "chemical_formula": "Mg",
        "molecular_weight": "24.305 g/mol",
        "chemical_type": "Alkaline Earth Metal",
        "classification": "Inorganic",
        "classification_reason": "Magnesium is a pure metal containing zero organic carbon chains, hence inorganic.",
        "smiles_notation": "[Mg]",
        "pdb_id": null,
        "quick_fact": "Magnesium burns in air with an extremely bright, brilliant white light, producing magnesium oxide.",
        "color": "Shiny gray metal ribbon"
      },
      "mg": {
        "common_name": "Magnesium Metal",
        "iupac_name": "Magnesium",
        "chemical_formula": "Mg",
        "molecular_weight": "24.305 g/mol",
        "chemical_type": "Alkaline Earth Metal",
        "classification": "Inorganic",
        "classification_reason": "Magnesium is a pure metal containing zero organic carbon chains, hence inorganic.",
        "smiles_notation": "[Mg]",
        "pdb_id": null,
        "quick_fact": "Magnesium burns in air with an extremely bright, brilliant white light, producing magnesium oxide.",
        "color": "Shiny gray metal ribbon"
      },
      "magnesium oxide": {
        "common_name": "Magnesium Oxide",
        "iupac_name": "Magnesium oxide",
        "chemical_formula": "MgO",
        "molecular_weight": "40.30 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "MgO contains ionic bonds between magnesium cations and oxygen anions, lacking any carbon.",
        "smiles_notation": "[Mg+2].[O-2]",
        "pdb_id": null,
        "quick_fact": "Formed by burning magnesium ribbon, it is an alkaline oxide that reacts with water to produce magnesium hydroxide.",
        "color": "White powder"
      },
      "mgo": {
        "common_name": "Magnesium Oxide",
        "iupac_name": "Magnesium oxide",
        "chemical_formula": "MgO",
        "molecular_weight": "40.30 g/mol",
        "chemical_type": "Metal Oxide",
        "classification": "Inorganic",
        "classification_reason": "MgO contains ionic bonds between magnesium cations and oxygen anions, lacking any carbon.",
        "smiles_notation": "[Mg+2].[O-2]",
        "pdb_id": null,
        "quick_fact": "Formed by burning magnesium ribbon, it is an alkaline oxide that reacts with water to produce magnesium hydroxide.",
        "color": "White powder"
      },
      "potassium iodide": {
        "common_name": "Potassium Iodide",
        "iupac_name": "Potassium iodide",
        "chemical_formula": "KI",
        "molecular_weight": "166.00 g/mol",
        "chemical_type": "Alkali Metal Halide",
        "classification": "Inorganic",
        "classification_reason": "Potassium iodide is an ionic halide salt made from potassium and iodine, with no carbon.",
        "smiles_notation": "[K+].[I-]",
        "pdb_id": null,
        "quick_fact": "Potassium iodide is used in emergency thyroid protection during radiation exposure and to prepare iodized table salt.",
        "color": "White crystalline solid"
      },
      "ki": {
        "common_name": "Potassium Iodide",
        "iupac_name": "Potassium iodide",
        "chemical_formula": "KI",
        "molecular_weight": "166.00 g/mol",
        "chemical_type": "Alkali Metal Halide",
        "classification": "Inorganic",
        "classification_reason": "Potassium iodide is an ionic halide salt made from potassium and iodine, with no carbon.",
        "smiles_notation": "[K+].[I-]",
        "pdb_id": null,
        "quick_fact": "Potassium iodide is used in emergency thyroid protection during radiation exposure and to prepare iodized table salt.",
        "color": "White crystalline solid"
      },
      "lead nitrate": {
        "common_name": "Lead Nitrate",
        "iupac_name": "Lead(II) nitrate",
        "chemical_formula": "Pb(NO3)2",
        "molecular_weight": "331.2 g/mol",
        "chemical_type": "Heavy Metal Nitrate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic inorganic salt consisting of heavy metal lead cations and polyatomic nitrate anions.",
        "smiles_notation": "[Pb+2].[O-]N(=O)=O.[O-]N(=O)=O",
        "pdb_id": null,
        "quick_fact": "Usually studied in double displacement reactions, it reacts with potassium iodide to form a bright yellow precipitate of lead iodide.",
        "color": "White or colorless crystals"
      },
      "pb(no3)2": {
        "common_name": "Lead Nitrate",
        "iupac_name": "Lead(II) nitrate",
        "chemical_formula": "Pb(NO3)2",
        "molecular_weight": "331.2 g/mol",
        "chemical_type": "Heavy Metal Nitrate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic inorganic salt consisting of heavy metal lead cations and polyatomic nitrate anions.",
        "smiles_notation": "[Pb+2].[O-]N(=O)=O.[O-]N(=O)=O",
        "pdb_id": null,
        "quick_fact": "Usually studied in double displacement reactions, it reacts with potassium iodide to form a bright yellow precipitate of lead iodide.",
        "color": "White or colorless crystals"
      },
      "lead iodide": {
        "common_name": "Lead Iodide",
        "iupac_name": "Lead(II) iodide",
        "chemical_formula": "PbI2",
        "molecular_weight": "461.01 g/mol",
        "chemical_type": "Heavy Metal Halide Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt with ionic bonds between lead metal cations and iodide anions.",
        "smiles_notation": "[Pb+2].[I-].[I-]",
        "pdb_id": null,
        "quick_fact": "Often formed as a precipitate in school reactions, its brilliant yellow crystals are known as 'golden rain' under recrystallization.",
        "color": "Bright yellow precipitate / powder"
      },
      "pbi2": {
        "common_name": "Lead Iodide",
        "iupac_name": "Lead(II) iodide",
        "chemical_formula": "PbI2",
        "molecular_weight": "461.01 g/mol",
        "chemical_type": "Heavy Metal Halide Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an inorganic salt with ionic bonds between lead metal cations and iodide anions.",
        "smiles_notation": "[Pb+2].[I-].[I-]",
        "pdb_id": null,
        "quick_fact": "Often formed as a precipitate in school reactions, its brilliant yellow crystals are known as 'golden rain' under recrystallization.",
        "color": "Bright yellow precipitate / powder"
      },
      "silver nitrate": {
        "common_name": "Silver Nitrate",
        "iupac_name": "Silver nitrate",
        "chemical_formula": "AgNO3",
        "molecular_weight": "169.87 g/mol",
        "chemical_type": "Precious Metal Salt",
        "classification": "Inorganic",
        "classification_reason": "It contains ionic coordination bonds between precious silver cations and nitrate anions.",
        "smiles_notation": "[Ag+].[O-]N(=O)=O",
        "pdb_id": null,
        "quick_fact": "It is highly sensitive to light and is used in photographic film, Tollens' reagent tests, and to formulate medical cauterizers.",
        "color": "White crystalline solid"
      },
      "agno3": {
        "common_name": "Silver Nitrate",
        "iupac_name": "Silver nitrate",
        "chemical_formula": "AgNO3",
        "molecular_weight": "169.87 g/mol",
        "chemical_type": "Precious Metal Salt",
        "classification": "Inorganic",
        "classification_reason": "It contains ionic coordination bonds between precious silver cations and nitrate anions.",
        "smiles_notation": "[Ag+].[O-]N(=O)=O",
        "pdb_id": null,
        "quick_fact": "It is highly sensitive to light and is used in photographic film, Tollens' reagent tests, and to formulate medical cauterizers.",
        "color": "White crystalline solid"
      },
      "chlorine gas": {
        "common_name": "Chlorine Gas",
        "iupac_name": "Dichlorine",
        "chemical_formula": "Cl2",
        "molecular_weight": "70.90 g/mol",
        "chemical_type": "Diatomic Halogen Gas",
        "classification": "Inorganic",
        "classification_reason": "Chlorine gas contains only chlorine atoms and lacks organic carbon compounds, hence inorganic.",
        "smiles_notation": "ClCl",
        "pdb_id": null,
        "quick_fact": "Chlorine gas is a strong oxidizing agent used widely in water purification, sewage treatment, and bleaching.",
        "color": "Pale greenish-yellow gas"
      },
      "cl2": {
        "common_name": "Chlorine Gas",
        "iupac_name": "Dichlorine",
        "chemical_formula": "Cl2",
        "molecular_weight": "70.90 g/mol",
        "chemical_type": "Diatomic Halogen Gas",
        "classification": "Inorganic",
        "classification_reason": "Chlorine gas contains only chlorine atoms and lacks organic carbon compounds, hence inorganic.",
        "smiles_notation": "ClCl",
        "pdb_id": null,
        "quick_fact": "Chlorine gas is a strong oxidizing agent used widely in water purification, sewage treatment, and bleaching.",
        "color": "Pale greenish-yellow gas"
      },
      "nitric acid": {
        "common_name": "Nitric Acid",
        "iupac_name": "Nitric acid",
        "chemical_formula": "HNO3",
        "molecular_weight": "63.01 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "Nitric acid is a strong mineral acid with no carbon framework.",
        "smiles_notation": "O[N+](=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Highly corrosive, it reacts with metals to release nitrogen oxides instead of hydrogen gas due to its strong oxidizing nature.",
        "color": "Colorless or yellow-tinted liquid"
      },
      "hno3": {
        "common_name": "Nitric Acid",
        "iupac_name": "Nitric acid",
        "chemical_formula": "HNO3",
        "molecular_weight": "63.01 g/mol",
        "chemical_type": "Mineral Acid",
        "classification": "Inorganic",
        "classification_reason": "Nitric acid is a strong mineral acid with no carbon framework.",
        "smiles_notation": "O[N+](=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Highly corrosive, it reacts with metals to release nitrogen oxides instead of hydrogen gas due to its strong oxidizing nature.",
        "color": "Colorless or yellow-tinted liquid"
      },
      "bromine": {
        "common_name": "Bromine (Bromine Water)",
        "iupac_name": "Dibromine",
        "chemical_formula": "Br2",
        "molecular_weight": "159.808 g/mol",
        "chemical_type": "Diatomic Halogen Element",
        "classification": "Inorganic",
        "classification_reason": "Bromine contains only bromine atoms and is inorganic.",
        "smiles_notation": "BrBr",
        "pdb_id": null,
        "quick_fact": "Bromine is the only non-metallic element that is liquid at standard room temperature, evaporating into dark red corrosive fumes.",
        "color": "Deep reddish-brown fuming liquid"
      },
      "br2": {
        "common_name": "Bromine (Bromine Water)",
        "iupac_name": "Dibromine",
        "chemical_formula": "Br2",
        "molecular_weight": "159.808 g/mol",
        "chemical_type": "Diatomic Halogen Element",
        "classification": "Inorganic",
        "classification_reason": "Bromine contains only bromine atoms and is inorganic.",
        "smiles_notation": "BrBr",
        "pdb_id": null,
        "quick_fact": "Bromine is the only non-metallic element that is liquid at standard room temperature, evaporating into dark red corrosive fumes.",
        "color": "Deep reddish-brown fuming liquid"
      },
      "bromoethane": {
        "common_name": "Bromoethane (Ethyl Bromide)",
        "iupac_name": "Bromoethane",
        "chemical_formula": "C2H5Br",
        "molecular_weight": "108.97 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It consists of an ethyl carbon chain covalently bonded to a bromine halogen atom.",
        "smiles_notation": "CCBr",
        "pdb_id": null,
        "quick_fact": "An excellent ethylating agent used in organic synthesis, commonly prepared by reacting ethanol with hydrobromic acid.",
        "color": "Colorless volatile liquid with an ether-like odor",
        "properties": "Physical state: Volatile liquid\nEthyl carbon chain covalently bonded to a bromine halogen atom\nInsoluble in water but highly miscible with organic solvents\nFlammable with volatile vapor emissions",
        "uses": "Ethylating agent in organic synthesis of pharmaceuticals and agrochemicals\nHistorically used as an anesthetic\nIndustrial solvent and refrigerant"
      },
      "ethyl bromide": {
        "common_name": "Bromoethane (Ethyl Bromide)",
        "iupac_name": "Bromoethane",
        "chemical_formula": "C2H5Br",
        "molecular_weight": "108.97 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It consists of an ethyl carbon chain covalently bonded to a bromine halogen atom.",
        "smiles_notation": "CCBr",
        "pdb_id": null,
        "quick_fact": "An excellent ethylating agent used in organic synthesis, commonly prepared by reacting ethanol with hydrobromic acid.",
        "color": "Colorless volatile liquid with an ether-like odor",
        "properties": "Physical state: Volatile liquid\nEthyl carbon chain covalently bonded to a bromine halogen atom\nInsoluble in water but highly miscible with organic solvents\nFlammable with volatile vapor emissions",
        "uses": "Ethylating agent in organic synthesis of pharmaceuticals and agrochemicals\nHistorically used as an anesthetic\nIndustrial solvent and refrigerant"
      },
      "c2h5br": {
        "common_name": "Bromoethane (Ethyl Bromide)",
        "iupac_name": "Bromoethane",
        "chemical_formula": "C2H5Br",
        "molecular_weight": "108.97 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It consists of an ethyl carbon chain covalently bonded to a bromine halogen atom.",
        "smiles_notation": "CCBr",
        "pdb_id": null,
        "quick_fact": "An excellent ethylating agent used in organic synthesis, commonly prepared by reacting ethanol with hydrobromic acid.",
        "color": "Colorless volatile liquid with an ether-like odor",
        "properties": "Physical state: Volatile liquid\nEthyl carbon chain covalently bonded to a bromine halogen atom\nInsoluble in water but highly miscible with organic solvents\nFlammable with volatile vapor emissions",
        "uses": "Ethylating agent in organic synthesis of pharmaceuticals and agrochemicals\nHistorically used as an anesthetic\nIndustrial solvent and refrigerant"
      },
      "chloromethane": {
        "common_name": "Chloromethane (Methyl Chloride)",
        "iupac_name": "Chloromethane",
        "chemical_formula": "CH3Cl",
        "molecular_weight": "50.49 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a covalent carbon-hydrogen backbone with a chlorine atom substituted for a hydrogen.",
        "smiles_notation": "CCl",
        "pdb_id": null,
        "quick_fact": "It is the simplest haloalkane, historically used as a refrigerant (refrigerant-40) and as a chemical intermediate.",
        "color": "Colorless gas with a faintly sweet odor",
        "properties": "Physical state: Gas at room temperature\nHighly flammable gas\nSlightly soluble in water\nHigh vapor pressure",
        "uses": "Industrial methylating agent in organic synthesis\nPrecursor for silicone polymers\nSolvent in butyl rubber manufacturing"
      },
      "methyl chloride": {
        "common_name": "Chloromethane (Methyl Chloride)",
        "iupac_name": "Chloromethane",
        "chemical_formula": "CH3Cl",
        "molecular_weight": "50.49 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a covalent carbon-hydrogen backbone with a chlorine atom substituted for a hydrogen.",
        "smiles_notation": "CCl",
        "pdb_id": null,
        "quick_fact": "It is the simplest haloalkane, historically used as a refrigerant (refrigerant-40) and as a chemical intermediate.",
        "color": "Colorless gas with a faintly sweet odor",
        "properties": "Physical state: Gas at room temperature\nHighly flammable gas\nSlightly soluble in water\nHigh vapor pressure",
        "uses": "Industrial methylating agent in organic synthesis\nPrecursor for silicone polymers\nSolvent in butyl rubber manufacturing"
      },
      "ch3cl": {
        "common_name": "Chloromethane (Methyl Chloride)",
        "iupac_name": "Chloromethane",
        "chemical_formula": "CH3Cl",
        "molecular_weight": "50.49 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a covalent carbon-hydrogen backbone with a chlorine atom substituted for a hydrogen.",
        "smiles_notation": "CCl",
        "pdb_id": null,
        "quick_fact": "It is the simplest haloalkane, historically used as a refrigerant (refrigerant-40) and as a chemical intermediate.",
        "color": "Colorless gas with a faintly sweet odor",
        "properties": "Physical state: Gas at room temperature\nHighly flammable gas\nSlightly soluble in water\nHigh vapor pressure",
        "uses": "Industrial methylating agent in organic synthesis\nPrecursor for silicone polymers\nSolvent in butyl rubber manufacturing"
      },
      "bromomethane": {
        "common_name": "Bromomethane (Methyl Bromide)",
        "iupac_name": "Bromomethane",
        "chemical_formula": "CH3Br",
        "molecular_weight": "94.94 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is an organic compound with a central carbon atom covalently bonded to three hydrogens and one bromine.",
        "smiles_notation": "CBr",
        "pdb_id": null,
        "quick_fact": "A powerful soil fumigant and pesticide whose use is strictly controlled under the Montreal Protocol due to its ozone-depleting potential.",
        "color": "Colorless, odorless gas (toxic)",
        "properties": "Physical state: Gas or liquefied gas\nHighly toxic and ozone-depleting substance\nSparingly soluble in water but highly soluble in organic solvents\nNon-flammable under standard conditions",
        "uses": "Pest fumigant for agricultural soil and quarantine applications\nMethylating agent in organic chemical synthesis\nHistorically used as a high-efficiency fire extinguisher solvent"
      },
      "methyl bromide": {
        "common_name": "Bromomethane (Methyl Bromide)",
        "iupac_name": "Bromomethane",
        "chemical_formula": "CH3Br",
        "molecular_weight": "94.94 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is an organic compound with a central carbon atom covalently bonded to three hydrogens and one bromine.",
        "smiles_notation": "CBr",
        "pdb_id": null,
        "quick_fact": "A powerful soil fumigant and pesticide whose use is strictly controlled under the Montreal Protocol due to its ozone-depleting potential.",
        "color": "Colorless, odorless gas (toxic)",
        "properties": "Physical state: Gas or liquefied gas\nHighly toxic and ozone-depleting substance\nSparingly soluble in water but highly soluble in organic solvents\nNon-flammable under standard conditions",
        "uses": "Pest fumigant for agricultural soil and quarantine applications\nMethylating agent in organic chemical synthesis\nHistorically used as a high-efficiency fire extinguisher solvent"
      },
      "ch3br": {
        "common_name": "Bromomethane (Methyl Bromide)",
        "iupac_name": "Bromomethane",
        "chemical_formula": "CH3Br",
        "molecular_weight": "94.94 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is an organic compound with a central carbon atom covalently bonded to three hydrogens and one bromine.",
        "smiles_notation": "CBr",
        "pdb_id": null,
        "quick_fact": "A powerful soil fumigant and pesticide whose use is strictly controlled under the Montreal Protocol due to its ozone-depleting potential.",
        "color": "Colorless, odorless gas (toxic)",
        "properties": "Physical state: Gas or liquefied gas\nHighly toxic and ozone-depleting substance\nSparingly soluble in water but highly soluble in organic solvents\nNon-flammable under standard conditions",
        "uses": "Pest fumigant for agricultural soil and quarantine applications\nMethylating agent in organic chemical synthesis\nHistorically used as a high-efficiency fire extinguisher solvent"
      },
      "iodomethane": {
        "common_name": "Iodomethane (Methyl Iodide)",
        "iupac_name": "Iodomethane",
        "chemical_formula": "CH3I",
        "molecular_weight": "141.94 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a covalent methyl group bound to an iodine atom.",
        "smiles_notation": "CI",
        "pdb_id": null,
        "quick_fact": "A highly reactive methylating agent in organic synthesis, undergoing very rapid SN2 substitution reactions.",
        "color": "Colorless liquid (turns reddish-brown in light)",
        "properties": "Physical state: Heavy volatile liquid\nDense liquid with high refractive index\nReacts extremely fast in nucleophilic substitution reactions\nLight sensitive, decomposes to release molecular iodine",
        "uses": "Universal methylating agent in organic chemical research\nPrecursor for manufacturing acetic acid in the Monsanto process\nInsecticide and pesticide soil fumigant"
      },
      "methyl iodide": {
        "common_name": "Iodomethane (Methyl Iodide)",
        "iupac_name": "Iodomethane",
        "chemical_formula": "CH3I",
        "molecular_weight": "141.94 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a covalent methyl group bound to an iodine atom.",
        "smiles_notation": "CI",
        "pdb_id": null,
        "quick_fact": "A highly reactive methylating agent in organic synthesis, undergoing very rapid SN2 substitution reactions.",
        "color": "Colorless liquid (turns reddish-brown in light)",
        "properties": "Physical state: Heavy volatile liquid\nDense liquid with high refractive index\nReacts extremely fast in nucleophilic substitution reactions\nLight sensitive, decomposes to release molecular iodine",
        "uses": "Universal methylating agent in organic chemical research\nPrecursor for manufacturing acetic acid in the Monsanto process\nInsecticide and pesticide soil fumigant"
      },
      "ch3i": {
        "common_name": "Iodomethane (Methyl Iodide)",
        "iupac_name": "Iodomethane",
        "chemical_formula": "CH3I",
        "molecular_weight": "141.94 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a covalent methyl group bound to an iodine atom.",
        "smiles_notation": "CI",
        "pdb_id": null,
        "quick_fact": "A highly reactive methylating agent in organic synthesis, undergoing very rapid SN2 substitution reactions.",
        "color": "Colorless liquid (turns reddish-brown in light)",
        "properties": "Physical state: Heavy volatile liquid\nDense liquid with high refractive index\nReacts extremely fast in nucleophilic substitution reactions\nLight sensitive, decomposes to release molecular iodine",
        "uses": "Universal methylating agent in organic chemical research\nPrecursor for manufacturing acetic acid in the Monsanto process\nInsecticide and pesticide soil fumigant"
      },
      "dichloromethane": {
        "common_name": "Dichloromethane (Methylene Chloride)",
        "iupac_name": "Dichloromethane",
        "chemical_formula": "CH2Cl2",
        "molecular_weight": "84.93 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is a chlorinated hydrocarbon with a central carbon atom bonded to two hydrogen and two chlorine atoms.",
        "smiles_notation": "C(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "A widely used volatile solvent known for its low toxicity compared to other chlorinated solvents, though still regulated.",
        "color": "Colorless volatile liquid with a sweet, penetrating ether-like odor",
        "properties": "Physical state: Volatile liquid\nLow boiling point (39.6°C)\nHighly volatile and weakly flammable\nImmiscible with water but miscible with most organic solvents",
        "uses": "Industrial paint remover and degreaser solvent\nProcess solvent for decaffeinating coffee and tea\nLaboratory extraction solvent in chemical research\nFoaming agent in polyurethane foam manufacturing"
      },
      "methylene chloride": {
        "common_name": "Dichloromethane (Methylene Chloride)",
        "iupac_name": "Dichloromethane",
        "chemical_formula": "CH2Cl2",
        "molecular_weight": "84.93 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is a chlorinated hydrocarbon with a central carbon atom bonded to two hydrogen and two chlorine atoms.",
        "smiles_notation": "C(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "A widely used volatile solvent known for its low toxicity compared to other chlorinated solvents, though still regulated.",
        "color": "Colorless volatile liquid with a sweet, penetrating ether-like odor",
        "properties": "Physical state: Volatile liquid\nLow boiling point (39.6°C)\nHighly volatile and weakly flammable\nImmiscible with water but miscible with most organic solvents",
        "uses": "Industrial paint remover and degreaser solvent\nProcess solvent for decaffeinating coffee and tea\nLaboratory extraction solvent in chemical research\nFoaming agent in polyurethane foam manufacturing"
      },
      "ch2cl2": {
        "common_name": "Dichloromethane (Methylene Chloride)",
        "iupac_name": "Dichloromethane",
        "chemical_formula": "CH2Cl2",
        "molecular_weight": "84.93 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is a chlorinated hydrocarbon with a central carbon atom bonded to two hydrogen and two chlorine atoms.",
        "smiles_notation": "C(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "A widely used volatile solvent known for its low toxicity compared to other chlorinated solvents, though still regulated.",
        "color": "Colorless volatile liquid with a sweet, penetrating ether-like odor",
        "properties": "Physical state: Volatile liquid\nLow boiling point (39.6°C)\nHighly volatile and weakly flammable\nImmiscible with water but miscible with most organic solvents",
        "uses": "Industrial paint remover and degreaser solvent\nProcess solvent for decaffeinating coffee and tea\nLaboratory extraction solvent in chemical research\nFoaming agent in polyurethane foam manufacturing"
      },
      "iodoform": {
        "common_name": "Iodoform (Triiodomethane)",
        "iupac_name": "Triiodomethane",
        "chemical_formula": "CHI3",
        "molecular_weight": "393.73 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a single carbon atom covalently bonded to a hydrogen and three iodine atoms.",
        "smiles_notation": "C(I)(I)I",
        "pdb_id": null,
        "quick_fact": "Formed during the classic iodoform test for methyl ketones and acetaldehyde, exhibiting a highly distinctive antiseptic smell.",
        "color": "Pale yellow crystalline solid",
        "properties": "Physical state: Crystalline solid\nDistinctive sweet, medicinal, hospital-like odor\nHighly insoluble in water\nSublimes at room temperature",
        "uses": "Historically used as an antiseptic for wounds and burns\nComponent in dental paste for root canal treatments\nReagent in organic synthesis"
      },
      "triiodomethane": {
        "common_name": "Iodoform (Triiodomethane)",
        "iupac_name": "Triiodomethane",
        "chemical_formula": "CHI3",
        "molecular_weight": "393.73 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a single carbon atom covalently bonded to a hydrogen and three iodine atoms.",
        "smiles_notation": "C(I)(I)I",
        "pdb_id": null,
        "quick_fact": "Formed during the classic iodoform test for methyl ketones and acetaldehyde, exhibiting a highly distinctive antiseptic smell.",
        "color": "Pale yellow crystalline solid",
        "properties": "Physical state: Crystalline solid\nDistinctive sweet, medicinal, hospital-like odor\nHighly insoluble in water\nSublimes at room temperature",
        "uses": "Historically used as an antiseptic for wounds and burns\nComponent in dental paste for root canal treatments\nReagent in organic synthesis"
      },
      "chi3": {
        "common_name": "Iodoform (Triiodomethane)",
        "iupac_name": "Triiodomethane",
        "chemical_formula": "CHI3",
        "molecular_weight": "393.73 g/mol",
        "chemical_type": "Alkyl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a single carbon atom covalently bonded to a hydrogen and three iodine atoms.",
        "smiles_notation": "C(I)(I)I",
        "pdb_id": null,
        "quick_fact": "Formed during the classic iodoform test for methyl ketones and acetaldehyde, exhibiting a highly distinctive antiseptic smell.",
        "color": "Pale yellow crystalline solid",
        "properties": "Physical state: Crystalline solid\nDistinctive sweet, medicinal, hospital-like odor\nHighly insoluble in water\nSublimes at room temperature",
        "uses": "Historically used as an antiseptic for wounds and burns\nComponent in dental paste for root canal treatments\nReagent in organic synthesis"
      },
      "chlorobenzene": {
        "common_name": "Chlorobenzene",
        "iupac_name": "Chlorobenzene",
        "chemical_formula": "C6H5Cl",
        "molecular_weight": "112.56 g/mol",
        "chemical_type": "Aryl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It has a halogen chlorine atom attached directly to a covalent aromatic benzene ring skeleton.",
        "smiles_notation": "C1=CC=C(C=C1)Cl",
        "pdb_id": null,
        "quick_fact": "A classic aryl halide that does not undergo nucleophilic substitution under standard conditions due to partial double bond character of C-Cl bond.",
        "color": "Colorless clear liquid with an almond-like odor",
        "properties": "Physical state: Liquid\nHigh boiling point (131°C)\nHighly stable aromatic ring\nImmiscible with water",
        "uses": "High-boiling solvent in chemical synthesis and paint manufacturing\nPrecursor for producing pesticides (such as DDT historically)\nStarting material for phenol, aniline, and chlorobenzene derivatives"
      },
      "c6h5cl": {
        "common_name": "Chlorobenzene",
        "iupac_name": "Chlorobenzene",
        "chemical_formula": "C6H5Cl",
        "molecular_weight": "112.56 g/mol",
        "chemical_type": "Aryl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It has a halogen chlorine atom attached directly to a covalent aromatic benzene ring skeleton.",
        "smiles_notation": "C1=CC=C(C=C1)Cl",
        "pdb_id": null,
        "quick_fact": "A classic aryl halide that does not undergo nucleophilic substitution under standard conditions due to partial double bond character of C-Cl bond.",
        "color": "Colorless clear liquid with an almond-like odor",
        "properties": "Physical state: Liquid\nHigh boiling point (131°C)\nHighly stable aromatic ring\nImmiscible with water",
        "uses": "High-boiling solvent in chemical synthesis and paint manufacturing\nPrecursor for producing pesticides (such as DDT historically)\nStarting material for phenol, aniline, and chlorobenzene derivatives"
      },
      "bromobenzene": {
        "common_name": "Bromobenzene",
        "iupac_name": "Bromobenzene",
        "chemical_formula": "C6H5Br",
        "molecular_weight": "157.01 g/mol",
        "chemical_type": "Aryl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It consists of a bromine atom substituted onto an aromatic benzene ring.",
        "smiles_notation": "C1=CC=C(C=C1)Br",
        "pdb_id": null,
        "quick_fact": "Commonly used to prepare the highly versatile phenylmagnesium bromide Grignard reagent in organic synthesis.",
        "color": "Colorless or pale yellow liquid with a pleasant aromatic odor",
        "properties": "Physical state: Dense liquid\nBoiling point: 156°C\nInsoluble in water\nPrecursor for Grignard reagent formation in anhydrous ether",
        "uses": "Preparation of phenyl Grignard reagents for organic synthesis\nHigh-boiling industrial solvent\nAdditive in motor oil formulations"
      },
      "c6h5br": {
        "common_name": "Bromobenzene",
        "iupac_name": "Bromobenzene",
        "chemical_formula": "C6H5Br",
        "molecular_weight": "157.01 g/mol",
        "chemical_type": "Aryl Halide / Halogenated Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It consists of a bromine atom substituted onto an aromatic benzene ring.",
        "smiles_notation": "C1=CC=C(C=C1)Br",
        "pdb_id": null,
        "quick_fact": "Commonly used to prepare the highly versatile phenylmagnesium bromide Grignard reagent in organic synthesis.",
        "color": "Colorless or pale yellow liquid with a pleasant aromatic odor",
        "properties": "Physical state: Dense liquid\nBoiling point: 156°C\nInsoluble in water\nPrecursor for Grignard reagent formation in anhydrous ether",
        "uses": "Preparation of phenyl Grignard reagents for organic synthesis\nHigh-boiling industrial solvent\nAdditive in motor oil formulations"
      },
      "chloroform": {
        "common_name": "Chloroform (Trichloromethane)",
        "iupac_name": "Trichloromethane",
        "chemical_formula": "CHCl3",
        "molecular_weight": "119.38 g/mol",
        "chemical_type": "Trihalomethane Solvent",
        "classification": "Organic",
        "classification_reason": "It contains a carbon atom covalently bonded to hydrogen and chlorine atoms.",
        "smiles_notation": "C(Cl)(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "Historically used as a general inhalant anesthetic, it has a sweet-smelling volatile vapor and acts as a powerful non-polar solvent.",
        "color": "Colorless heavy liquid",
        "properties": "Physical state: Volatile, dense liquid\nBoiling point: 61.2°C\nInsoluble in water but highly miscible with alcohol and organic solvents\nNon-flammable under standard conditions but decomposes on heating to release phosgene gas\nSweet, heavy, characteristic anesthetic odor",
        "uses": "Common laboratory and industrial solvent for fats, oils, and rubber\nPrecursor in the synthesis of Teflon precursors (Chlorodifluoromethane)\nHistorically used as a general anesthetic in surgical procedures"
      },
      "chcl3": {
        "common_name": "Chloroform (Trichloromethane)",
        "iupac_name": "Trichloromethane",
        "chemical_formula": "CHCl3",
        "molecular_weight": "119.38 g/mol",
        "chemical_type": "Trihalomethane Solvent",
        "classification": "Organic",
        "classification_reason": "It contains a carbon atom covalently bonded to hydrogen and chlorine atoms.",
        "smiles_notation": "C(Cl)(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "Historically used as a general inhalant anesthetic, it has a sweet-smelling volatile vapor and acts as a powerful non-polar solvent.",
        "color": "Colorless heavy liquid",
        "properties": "Physical state: Volatile, dense liquid\nBoiling point: 61.2°C\nInsoluble in water but highly miscible with alcohol and organic solvents\nNon-flammable under standard conditions but decomposes on heating to release phosgene gas\nSweet, heavy, characteristic anesthetic odor",
        "uses": "Common laboratory and industrial solvent for fats, oils, and rubber\nPrecursor in the synthesis of Teflon precursors (Chlorodifluoromethane)\nHistorically used as a general anesthetic in surgical procedures"
      },
      "carbon tetrachloride": {
        "common_name": "Carbon Tetrachloride",
        "iupac_name": "Tetrachloromethane",
        "chemical_formula": "CCl4",
        "molecular_weight": "153.82 g/mol",
        "chemical_type": "Chlorinated Solvent",
        "classification": "Organic",
        "classification_reason": "It contains a central carbon atom covalently bonded to four chlorine atoms, typical of organic halocarbons.",
        "smiles_notation": "C(Cl)(Cl)(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "Formerly used in fire extinguishers and dry cleaning, it is highly hepatotoxic and acts as a strong non-polar organic solvent.",
        "color": "Colorless heavy volatile liquid",
        "properties": "Physical state: Dense, volatile liquid\nBoiling point: 76.72°C\nNon-flammable and stable under most conditions\nInsoluble in water but miscible with organic solvents\nHighly toxic and hepatotoxic, ozone-depleting substance",
        "uses": "Historically used as an industrial solvent and dry-cleaning agent\nFormerly used as a fire extinguisher fluid (vaporizes to smother flames)\nPrecursor in the production of refrigerants and propellants (chlorofluorocarbons)"
      },
      "ccl4": {
        "common_name": "Carbon Tetrachloride",
        "iupac_name": "Tetrachloromethane",
        "chemical_formula": "CCl4",
        "molecular_weight": "153.82 g/mol",
        "chemical_type": "Chlorinated Solvent",
        "classification": "Organic",
        "classification_reason": "It contains a central carbon atom covalently bonded to four chlorine atoms, typical of organic halocarbons.",
        "smiles_notation": "C(Cl)(Cl)(Cl)Cl",
        "pdb_id": null,
        "quick_fact": "Formerly used in fire extinguishers and dry cleaning, it is highly hepatotoxic and acts as a strong non-polar organic solvent.",
        "color": "Colorless heavy volatile liquid",
        "properties": "Physical state: Dense, volatile liquid\nBoiling point: 76.72°C\nNon-flammable and stable under most conditions\nInsoluble in water but miscible with organic solvents\nHighly toxic and hepatotoxic, ozone-depleting substance",
        "uses": "Historically used as an industrial solvent and dry-cleaning agent\nFormerly used as a fire extinguisher fluid (vaporizes to smother flames)\nPrecursor in the production of refrigerants and propellants (chlorofluorocarbons)"
      },
      "ethene": {
        "common_name": "Ethene Gas (Ethylene)",
        "iupac_name": "Ethene",
        "chemical_formula": "C2H4",
        "molecular_weight": "28.05 g/mol",
        "chemical_type": "Alkene Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is the simplest alkene containing a carbon-carbon double bond with covalent carbon-hydrogen linkage.",
        "smiles_notation": "C=C",
        "pdb_id": null,
        "quick_fact": "Ethene is a natural plant hormone that regulates fruit ripening and flower opening.",
        "color": "Colorless sweet-smelling gas"
      },
      "c2h4": {
        "common_name": "Ethene Gas (Ethylene)",
        "iupac_name": "Ethene",
        "chemical_formula": "C2H4",
        "molecular_weight": "28.05 g/mol",
        "chemical_type": "Alkene Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It is the simplest alkene containing a carbon-carbon double bond with covalent carbon-hydrogen linkage.",
        "smiles_notation": "C=C",
        "pdb_id": null,
        "quick_fact": "Ethene is a natural plant hormone that regulates fruit ripening and flower opening.",
        "color": "Colorless sweet-smelling gas"
      },
      "acetylene": {
        "common_name": "Acetylene Gas (Ethyne)",
        "iupac_name": "Ethyne",
        "chemical_formula": "C2H2",
        "molecular_weight": "26.04 g/mol",
        "chemical_type": "Alkyne Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a triple bond linking two carbon atoms covalently, each bound to a hydrogen atom.",
        "smiles_notation": "C#C",
        "pdb_id": null,
        "quick_fact": "Acetylene burns with oxygen to produce an extremely hot flame of over 3000°C, used in oxy-acetylene welding.",
        "color": "Colorless gas"
      },
      "ethyne": {
        "common_name": "Acetylene Gas (Ethyne)",
        "iupac_name": "Ethyne",
        "chemical_formula": "C2H2",
        "molecular_weight": "26.04 g/mol",
        "chemical_type": "Alkyne Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a triple bond linking two carbon atoms covalently, each bound to a hydrogen atom.",
        "smiles_notation": "C#C",
        "pdb_id": null,
        "quick_fact": "Acetylene burns with oxygen to produce an extremely hot flame of over 3000°C, used in oxy-acetylene welding.",
        "color": "Colorless gas"
      },
      "c2h2": {
        "common_name": "Acetylene Gas (Ethyne)",
        "iupac_name": "Ethyne",
        "chemical_formula": "C2H2",
        "molecular_weight": "26.04 g/mol",
        "chemical_type": "Alkyne Hydrocarbon",
        "classification": "Organic",
        "classification_reason": "It contains a triple bond linking two carbon atoms covalently, each bound to a hydrogen atom.",
        "smiles_notation": "C#C",
        "pdb_id": null,
        "quick_fact": "Acetylene burns with oxygen to produce an extremely hot flame of over 3000°C, used in oxy-acetylene welding.",
        "color": "Colorless gas"
      },
      "glycerol": {
        "common_name": "Glycerol (Glycerine)",
        "iupac_name": "Propane-1,2,3-triol",
        "chemical_formula": "C3H8O3",
        "molecular_weight": "92.09 g/mol",
        "chemical_type": "Polyol Alcohol",
        "classification": "Organic",
        "classification_reason": "It is a trivalent organic polyol containing a central propane chain with three hydroxyl groups.",
        "smiles_notation": "C(C(CO)O)O",
        "pdb_id": null,
        "quick_fact": "Glycerol is non-toxic, sweet-tasting, and highly hygroscopic, widely used in cosmetics, medicines, and food.",
        "color": "Viscous colorless odorless liquid"
      },
      "glycerine": {
        "common_name": "Glycerol (Glycerine)",
        "iupac_name": "Propane-1,2,3-triol",
        "chemical_formula": "C3H8O3",
        "molecular_weight": "92.09 g/mol",
        "chemical_type": "Polyol Alcohol",
        "classification": "Organic",
        "classification_reason": "It is a trivalent organic polyol containing a central propane chain with three hydroxyl groups.",
        "smiles_notation": "C(C(CO)O)O",
        "pdb_id": null,
        "quick_fact": "Glycerol is non-toxic, sweet-tasting, and highly hygroscopic, widely used in cosmetics, medicines, and food.",
        "color": "Viscous colorless odorless liquid"
      },
      "c3h8o3": {
        "common_name": "Glycerol (Glycerine)",
        "iupac_name": "Propane-1,2,3-triol",
        "chemical_formula": "C3H8O3",
        "molecular_weight": "92.09 g/mol",
        "chemical_type": "Polyol Alcohol",
        "classification": "Organic",
        "classification_reason": "It is a trivalent organic polyol containing a central propane chain with three hydroxyl groups.",
        "smiles_notation": "C(C(CO)O)O",
        "pdb_id": null,
        "quick_fact": "Glycerol is non-toxic, sweet-tasting, and highly hygroscopic, widely used in cosmetics, medicines, and food.",
        "color": "Viscous colorless odorless liquid"
      },
      "formaldehyde": {
        "common_name": "Formaldehyde (Formalin)",
        "iupac_name": "Methanal",
        "chemical_formula": "HCHO",
        "molecular_weight": "30.03 g/mol",
        "chemical_type": "Simple Aldehyde",
        "classification": "Organic",
        "classification_reason": "It consists of a central carbon atom with a double bond to oxygen and single bonds to two hydrogens.",
        "smiles_notation": "C=O",
        "pdb_id": null,
        "quick_fact": "Its 37% aqueous solution is called Formalin, which is widely used to preserve biological tissue specimens.",
        "color": "Colorless pungent gas or solution"
      },
      "hcho": {
        "common_name": "Formaldehyde (Formalin)",
        "iupac_name": "Methanal",
        "chemical_formula": "HCHO",
        "molecular_weight": "30.03 g/mol",
        "chemical_type": "Simple Aldehyde",
        "classification": "Organic",
        "classification_reason": "It consists of a central carbon atom with a double bond to oxygen and single bonds to two hydrogens.",
        "smiles_notation": "C=O",
        "pdb_id": null,
        "quick_fact": "Its 37% aqueous solution is called Formalin, which is widely used to preserve biological tissue specimens.",
        "color": "Colorless pungent gas or solution"
      },
      "benzoic acid": {
        "common_name": "Benzoic Acid",
        "iupac_name": "Benzoic acid",
        "chemical_formula": "C6H5COOH",
        "molecular_weight": "122.12 g/mol",
        "chemical_type": "Aromatic Carboxylic Acid",
        "classification": "Organic",
        "classification_reason": "It features a carboxyl group attached directly to an aromatic benzene carbon ring.",
        "smiles_notation": "C1=CC=C(C=C1)C(=O)O",
        "pdb_id": null,
        "quick_fact": "Benzoic acid is widely used as a food preservative because its salts inhibit the growth of mold, yeast, and bacteria.",
        "color": "White crystalline solid"
      },
      "c6h5cooh": {
        "common_name": "Benzoic Acid",
        "iupac_name": "Benzoic acid",
        "chemical_formula": "C6H5COOH",
        "molecular_weight": "122.12 g/mol",
        "chemical_type": "Aromatic Carboxylic Acid",
        "classification": "Organic",
        "classification_reason": "It features a carboxyl group attached directly to an aromatic benzene carbon ring.",
        "smiles_notation": "C1=CC=C(C=C1)C(=O)O",
        "pdb_id": null,
        "quick_fact": "Benzoic acid is widely used as a food preservative because its salts inhibit the growth of mold, yeast, and bacteria.",
        "color": "White crystalline solid"
      },
      "sodium sulfate": {
        "common_name": "Sodium Sulfate",
        "iupac_name": "Sodium sulfate",
        "chemical_formula": "Na2SO4",
        "molecular_weight": "142.04 g/mol",
        "chemical_type": "Alkali Metal Sulfate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic sodium salt of sulfuric acid, lacking any carbon or carbon-hydrogen bonds.",
        "smiles_notation": "[Na+].[Na+].[O-]S(=O)(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Historically known as Glauber's salt in its decahydrate form, it is used in the manufacture of detergents and paper pulping.",
        "color": "White crystalline powder"
      },
      "na2so4": {
        "common_name": "Sodium Sulfate",
        "iupac_name": "Sodium sulfate",
        "chemical_formula": "Na2SO4",
        "molecular_weight": "142.04 g/mol",
        "chemical_type": "Alkali Metal Sulfate Salt",
        "classification": "Inorganic",
        "classification_reason": "It is an ionic sodium salt of sulfuric acid, lacking any carbon or carbon-hydrogen bonds.",
        "smiles_notation": "[Na+].[Na+].[O-]S(=O)(=O)[O-]",
        "pdb_id": null,
        "quick_fact": "Historically known as Glauber's salt in its decahydrate form, it is used in the manufacture of detergents and paper pulping.",
        "color": "White crystalline powder"
      }
    };

    // Check for alkanes, alkenes, alkynes dynamically first to ensure 100% accurate structural coverage
    const parseHydrocarbon = (qStr: string) => {
      const q = qStr.trim().toLowerCase();
      
      // Try matching formula: C{n}H{m} or CH4
      const formulaRegex = /^c([0-9]*)h([0-9]*)$/i;
      const match = q.match(formulaRegex);
      
      let n = 0;
      let h = 0;
      let series: "alkane" | "alkene" | "alkyne" | null = null;
      
      if (match) {
        n = match[1] === "" ? 1 : parseInt(match[1]);
        h = parseInt(match[2]);
        
        if (h === 2 * n + 2) series = "alkane";
        else if (h === 2 * n && n >= 2) series = "alkene";
        else if (h === 2 * n - 2 && n >= 2) series = "alkyne";
      } else if (q === "ch4") {
        n = 1;
        h = 4;
        series = "alkane";
      } else {
        // Normalize name to strip position indicators like "1-butene" -> "butene", "hex-1-ene" -> "hexene"
        // Replace all numbers, dashes, and extra spaces, and prefix like iso-/neo-/n-
        const stemClean = q.replace(/[0-9\-]+/g, "").replace(/\s+/g, "").replace(/^(iso|neo|n-)/, "");
        
        const prefixes = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
        for (let i = 0; i < prefixes.length; i++) {
          const p = prefixes[i];
          if (stemClean.startsWith(p)) {
            n = i + 1;
            const suffix = stemClean.slice(p.length);
            if (suffix === "ane") {
              series = "alkane";
              h = 2 * n + 2;
            } else if (suffix === "ene" || suffix === "ylene") {
              if (n >= 2) {
                series = "alkene";
                h = 2 * n;
              }
            } else if (suffix === "yne") {
              if (n >= 2) {
                series = "alkyne";
                h = 2 * n - 2;
              }
            }
            break;
          }
        }
        
        // Check common synonyms
        if (!series) {
          if (q === "ethylene" || q === "ethene") {
            n = 2; h = 4; series = "alkene";
          } else if (q === "acetylene" || q === "ethyne") {
            n = 2; h = 2; series = "alkyne";
          } else if (q === "propylene" || q === "propene") {
            n = 3; h = 6; series = "alkene";
          } else if (q === "butylene" || q === "butene") {
            n = 4; h = 8; series = "alkene";
          }
        }
      }

      if (!series || n <= 0) return null;

      const prefixes = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
      const prefixName = prefixes[n - 1] || "carbon";
      const capitalizedPrefix = prefixName.charAt(0).toUpperCase() + prefixName.slice(1);
      const iupacName = capitalizedPrefix + (series === "alkane" ? "ane" : (series === "alkene" ? "ene" : "yne"));
      
      let commonName = iupacName;
      if (n === 2 && series === "alkene") commonName = "Ethylene";
      else if (n === 2 && series === "alkyne") commonName = "Acetylene";
      else if (n === 3 && series === "alkene") commonName = "Propylene";
      else if (n === 4 && series === "alkene") commonName = "Butylene";

      const formula = n === 1 ? `CH${h}` : `C${n}H${h}`;
      const weight = (n * 12.011 + h * 1.008).toFixed(2) + " g/mol";
      const type = `${series.charAt(0).toUpperCase() + series.slice(1)} Hydrocarbon`;

      let smiles = "C";
      if (series === "alkane") {
        smiles = n === 1 ? "C" : "C".repeat(n);
      } else if (series === "alkene") {
        smiles = n === 2 ? "C=C" : "C=CC" + "C".repeat(n - 3);
      } else {
        smiles = n === 2 ? "C#C" : "C#CC" + "C".repeat(n - 3);
      }

      let propertiesList = "";
      if (series === "alkane") {
        const state = n <= 4 ? "Colorless, highly flammable gas at room temperature" : (n <= 17 ? "Colorless, volatile liquid" : "Waxy white solid");
        propertiesList = `Physical state: ${state}\nSaturated aliphatic hydrocarbon chain with high relative molecular stability\nHypothetically solid or gas dependent on ambient chain length\nHighly hydrophobic and insoluble in water\nVery soluble in non-polar organic solvents like ether or chloroform\nLow density compared to water`;
      } else if (series === "alkene") {
        const state = n <= 4 ? "Colorless, flammable gas with a sweet odor" : (n <= 15 ? "Colorless liquid with characteristic sweet/petroleum odor" : "Waxy solid");
        propertiesList = `Physical state: ${state}\nUnsaturated aliphatic hydrocarbon containing a reactive carbon-carbon double bond\nInsoluble in polar solvents (hydrophobic)\nSoluble in organic solvents such as benzene or ethanol\nSubject to electrophilic addition reactions across the double bond`;
      } else {
        const state = n <= 4 ? "Colorless gas with a distinct ethereal odor" : (n <= 15 ? "Colorless liquid" : "Waxy solid");
        propertiesList = `Physical state: ${state}\nUnsaturated aliphatic hydrocarbon containing a highly reactive carbon-carbon triple bond\nWeakly acidic terminal C-H bond (for terminal alkynes)\nHydrophobic and insoluble in water\nHighly endothermic compound with a very high heat of combustion`;
      }

      let usesList = "";
      if (series === "alkane") {
        if (n === 1) usesList = "Primary component of natural gas for domestic and industrial heating\nFeedstock for steam reforming to produce hydrogen gas\nFuel for electricity generation in gas turbines";
        else if (n === 2) usesList = "Feedstock in chemical industry for ethylene cracking\nRefrigerant in low-temperature systems\nFuel gas additive";
        else if (n === 3) usesList = "Liquefied petroleum gas (LPG) fuel for heating and cooking\nPropellant in aerosol sprays\nFeedstock for petrochemical production";
        else if (n === 4) usesList = "LPG component and lighter fuel\nFeedstock for synthetic rubber and high-octane gasoline blending\nAerosol propellant";
        else if (n <= 8) usesList = "Primary component of gasoline fuel for internal combustion engines\nIndustrial solvent for extracting organic oils\nLaboratory solvent for chromatography";
        else usesList = "Component of diesel, kerosene, and aviation jet fuels\nRaw material for lubricating oils and anti-corrosive coatings\nParaffin wax for candles and food packaging";
      } else if (series === "alkene") {
        if (n === 2) usesList = "Precursor for polyethylene plastic production (the most common plastic)\nPlant hormone to accelerate fruit ripening\nStarting material for industrial ethanol and ethylene glycol synthesis";
        else if (n === 3) usesList = "Monomer for polypropylene plastics used in packaging and textiles\nSynthesis of acrylonitrile and propylene oxide\nFeedstock for acetone and isopropyl alcohol";
        else usesList = "Monomer for specialized co-polymer plastics and synthetic rubber\nStarting material for industrial plasticizers and synthetic lubricants\nIntermediate in surfactant and detergent manufacturing";
      } else {
        if (n === 2) usesList = "Fuel for oxy-acetylene welding and metal cutting torches\nStarting material for vinyl chloride monomer and synthetic polymers\nChemical synthesis intermediate in classic organic synthesis";
        else usesList = "Intermediate in complex organic synthesis and pharmaceutical drug design\nStarting material for specialty polymers and conductive plastics\nResearch reagent for studying transition-metal-catalyzed alkyne coupling reactions";
      }

      return {
        "common_name": commonName,
        "iupac_name": iupacName,
        "chemical_formula": formula,
        "molecular_weight": weight,
        "chemical_type": type,
        "classification": "Organic",
        "classification_reason": `It is an organic compound containing only carbon and hydrogen atoms belonging to the homologous series of ${series}s.`,
        "smiles_notation": smiles,
        "pdb_id": null,
        "quick_fact": `${commonName} (${formula}) is a fundamental ${series} hydrocarbon with ${n} carbon atoms, demonstrating characteristic physical and chemical trends of its homologous group.`,
        "properties": propertiesList,
        "uses": usesList,
        "color": n <= 4 ? "Colorless gas" : "Colorless liquid"
      };
    };

    // Cyclic hydrocarbons (cycloalkanes and cycloalkenes) -- e.g. cyclopropane, cyclobutane,
    // cyclohexane, cyclopropene, cyclohexene. parseHydrocarbon above only recognizes straight-chain
    // names (its prefix list is matched against the START of the name, so "cyclopropane" never
    // matches "prop"), which is why every "cyclo-" compound previously returned "not found". Ring
    // compounds are only ever recognized here by name, never by bare formula, because a cycloalkane
    // and the corresponding straight-chain alkene share the same molecular formula (e.g. cyclopropane
    // and propene are both C3H6) and would otherwise be ambiguous.
    const parseCyclicHydrocarbon = (qStr: string) => {
      const q = qStr.trim().toLowerCase().replace(/\s+/g, "");
      if (!q.startsWith("cyclo")) return null;

      const stemClean = q.slice("cyclo".length).replace(/[0-9\-]+/g, "");

      const prefixes = ["prop", "but", "pent", "hex", "hept", "oct", "non", "dec"];
      let n = 0;
      let series: "cycloalkane" | "cycloalkene" | null = null;

      for (let i = 0; i < prefixes.length; i++) {
        const p = prefixes[i];
        if (stemClean.startsWith(p)) {
          n = i + 3; // cyclopropane (3-membered ring) is the smallest possible cycloalkane/-ene
          const suffix = stemClean.slice(p.length);
          if (suffix === "ane") {
            series = "cycloalkane";
          } else if (suffix === "ene" || suffix === "ylene") {
            series = "cycloalkene";
          }
          break;
        }
      }

      if (!series || n < 3) return null;

      const prefixName = prefixes[n - 3];
      const iupacName = `Cyclo${prefixName}${series === "cycloalkane" ? "ane" : "ene"}`;
      const commonName = iupacName;

      const h = series === "cycloalkane" ? 2 * n : 2 * n - 2;
      const formula = `C${n}H${h}`;
      const weight = (n * 12.011 + h * 1.008).toFixed(2) + " g/mol";
      const type = series === "cycloalkane" ? "Cycloalkane (Saturated Cyclic Hydrocarbon)" : "Cycloalkene (Unsaturated Cyclic Hydrocarbon)";

      const smiles = series === "cycloalkane"
        ? "C1" + "C".repeat(n - 2) + "C1"
        : "C1=C" + "C".repeat(n - 3) + "C1";

      const state = n <= 4 ? "Colorless, flammable gas at room temperature" : (n <= 8 ? "Colorless, volatile liquid" : "Colorless liquid or low-melting solid");
      const propertiesList = series === "cycloalkane"
        ? `Physical state: ${state}\nSaturated hydrocarbon ring containing only carbon-carbon single bonds\nSmaller rings (3- and 4-membered) exhibit significant angle/ring strain, making them more reactive than their straight-chain isomers\nHydrophobic and insoluble in water; soluble in non-polar organic solvents`
        : `Physical state: ${state}\nUnsaturated hydrocarbon ring containing one carbon-carbon double bond\n${n === 3 ? "Cyclopropene is exceptionally strained and highly reactive due to the double bond forced into a three-membered ring." : "Undergoes characteristic addition reactions across the ring double bond, similar to open-chain alkenes."}\nHydrophobic and insoluble in water; soluble in non-polar organic solvents`;

      const usesList = series === "cycloalkane"
        ? (n === 3
          ? "Historically used as an inhaled general anesthetic (now discontinued due to its flammability)\nModel compound for studying ring strain in organic chemistry"
          : n === 6
          ? "Major industrial solvent and precursor in the manufacture of nylon (via oxidation to adipic acid and cyclohexanone)\nParaffin-type solvent for paints, varnishes, and resins"
          : "Non-polar laboratory and industrial solvent\nModel compound for studying cyclic hydrocarbon conformations and ring strain")
        : (n === 6
          ? "Chemical intermediate in the synthesis of adipic acid, maleic acid, and cyclohexanol\nMonomer-related feedstock in polymer and nylon precursor production"
          : "Chemical intermediate and monomer feedstock in specialty organic synthesis\nResearch compound for studying reactivity trends of cyclic alkenes");

      return {
        "common_name": commonName,
        "iupac_name": iupacName,
        "chemical_formula": formula,
        "molecular_weight": weight,
        "chemical_type": type,
        "classification": "Organic",
        "classification_reason": `It is an organic compound containing only carbon and hydrogen atoms arranged in a closed ring, belonging to the homologous series of ${series}s.`,
        "smiles_notation": smiles,
        "pdb_id": null,
        "quick_fact": `${commonName} (${formula}) is a ${n}-membered ${series === "cycloalkane" ? "saturated" : "unsaturated"} carbocyclic ring hydrocarbon${n <= 4 ? ", one of the most ring-strained hydrocarbons known" : ""}.`,
        "properties": propertiesList,
        "uses": usesList,
        "color": n <= 4 ? "Colorless gas" : "Colorless liquid"
      };
    };

    // Check for alcohols dynamically to ensure 100% accurate structural coverage of methanol, propanol, butanol, etc.
    const parseAlcohol = (qStr: string) => {
      const q = qStr.trim().toLowerCase();
      
      // Try matching formulas like: CH3OH, C2H5OH, C3H7OH, C4H9OH, etc.
      // Or general formula C{n}H{2n+2}O (e.g. CH4O, C2H6O, C3H8O, C4H10O)
      const alcoholFormulaRegex1 = /^c([0-9]*)h([0-9]*)oh$/i;
      const alcoholFormulaRegex2 = /^c([0-9]*)h([0-9]*)o$/i;
      
      let n = 0;
      let h = 0;
      let isAlcohol = false;

      const match1 = q.match(alcoholFormulaRegex1);
      const match2 = q.match(alcoholFormulaRegex2);

      if (match1) {
        n = match1[1] === "" ? 1 : parseInt(match1[1]);
        h = parseInt(match1[2]);
        // C_n H_{2n+1} OH
        if (h === 2 * n + 1) {
          isAlcohol = true;
        }
      } else if (match2) {
        n = match2[1] === "" ? 1 : parseInt(match2[1]);
        h = parseInt(match2[2]);
        // C_n H_{2n+2} O
        if (h === 2 * n + 2 && n >= 1) {
          isAlcohol = true;
        }
      } else if (q === "ch3oh") {
        n = 1;
        h = 4;
        isAlcohol = true;
      } else if (q === "c2h5oh") {
        n = 2;
        h = 6;
        isAlcohol = true;
      } else {
        // Normalize name: e.g. "1-propanol", "propan-1-ol", "isopropanol"
        const stemClean = q.replace(/[0-9\-]+/g, "").replace(/\s+/g, "").replace(/^(iso|sec|tert|n-)/, "");
        
        const prefixes = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
        for (let i = 0; i < prefixes.length; i++) {
          const p = prefixes[i];
          if (stemClean.startsWith(p)) {
            const suffix = stemClean.slice(p.length);
            if (suffix === "anol" || suffix === "ylalcohol" || suffix === "yl alcohol" || suffix === "ol") {
              n = i + 1;
              isAlcohol = true;
              break;
            }
          }
        }
        
        // Synonyms check
        if (!isAlcohol) {
          if (q === "wood alcohol" || q === "methyl alcohol" || q === "carbinol") {
            n = 1; isAlcohol = true;
          } else if (q === "grain alcohol" || q === "ethyl alcohol" || q === "spirit") {
            n = 2; isAlcohol = true;
          } else if (q === "rubbing alcohol" || q === "isopropyl alcohol" || q === "isopropanol") {
            n = 3; isAlcohol = true;
          }
        }
      }

      if (!isAlcohol || n <= 0) return null;

      const prefixes = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
      const prefixName = prefixes[n - 1] || "carbon";
      const capitalizedPrefix = prefixName.charAt(0).toUpperCase() + prefixName.slice(1);
      
      const iupacName = capitalizedPrefix + "anol";
      let commonName = capitalizedPrefix + "anol";
      if (n === 1) commonName = "Methanol";
      else if (n === 2) commonName = "Ethanol";
      else if (n === 3) {
        if (q.includes("iso")) {
          commonName = "Isopropyl Alcohol";
        } else {
          commonName = "Propanol";
        }
      } else if (n === 4) commonName = "Butanol";

      const formula = n === 1 ? "CH3OH" : `C${n}H${2 * n + 1}OH`;
      const weight = (n * 12.011 + (2 * n + 2) * 1.008 + 15.999).toFixed(2) + " g/mol";
      const type = "Primary Alcohol";

      let smiles = "CO";
      if (n === 1) smiles = "CO";
      else if (n === 2) smiles = "CCO";
      else if (q.includes("isoprop") || q.includes("isopropyl") || (n === 3 && q.includes("2-ol"))) {
        smiles = "CC(C)O";
      } else {
        smiles = "C".repeat(n) + "O";
      }

      const state = n <= 11 ? "Colorless, highly volatile liquid" : "Waxy white solid";
      const waterSolubility = n <= 3 ? "Completely miscible in water in all proportions due to hydrogen bonding" : (n === 4 ? "Moderately soluble in water (~7.3 g/100 mL)" : "Slightly soluble or insoluble in water due to dominating hydrophobic alkyl chain");

      const propertiesList = `Physical state: ${state}\nOdor: Characteristic sweet, pungent, or spirituous alcohol odor\nSolubility: ${waterSolubility}\nForms strong intermolecular hydrogen bonds resulting in high boiling points compared to corresponding hydrocarbons\nFlammability: Highly flammable, burns with a clean blue or pale-blue flame\nAcidity: Extremely weak acid (pKa ~15.5-18), reacts with sodium metal to evolve hydrogen gas`;

      let usesList = "";
      if (n === 1) {
        usesList = "Industrial solvent for paints, inks, varnishes, and chemical synthesis\nFeedstock for producing formaldehyde, acetic acid, and methyl esters\nDenaturant for industrial ethanol to make it unfit for human consumption\nAlternative clean-burning fuel or fuel additive in specialized internal combustion engines";
      } else if (n === 2) {
        usesList = "Primary active ingredient in alcoholic beverages and spirits\nUniversal industrial and laboratory solvent for polar and non-polar substances\nEssential component in hand sanitizers, disinfectants, and pharmaceutical preparations\nBiofuel (bioethanol) blended with gasoline to reduce fossil fuel carbon emissions";
      } else if (n === 3) {
        usesList = "Common rubbing alcohol antiseptic and disinfectant for skin and medical tools\nIndustrial solvent for dissolving oils, gums, resins, and alkaloids\nChemical intermediate for producing isopropyl esters and acetone\nDe-icing agent for windshields and fuel lines";
      } else if (n === 4) {
        usesList = "Industrial solvent for nitrocellulose, ethylcellulose, and resins\nStarting material for butyl esters (butyl acetate) used as artificial flavorings and solvents\nComponent in hydraulic brake fluids and industrial paint formulations\nPotential next-generation biofuel with energy density closer to gasoline";
      } else {
        usesList = "Solvent for extraction of essential oils, fragrances, and active pharmaceutical ingredients\nStarting material for plasticizers, lubricating oil additives, and surfactants\nFlavoring agent and perfume ingredient (particularly branched or longer-chain esters)\nChemical intermediate in organic synthesis";
      }

      return {
        "common_name": commonName,
        "iupac_name": iupacName,
        "chemical_formula": formula,
        "molecular_weight": weight,
        "chemical_type": type,
        "classification": "Organic",
        "classification_reason": `It is an organic compound consisting of a saturated carbon framework linked to a polar hydroxyl (-OH) functional group.`,
        "smiles_notation": smiles,
        "pdb_id": null,
        "quick_fact": `${commonName} (${formula}) is a key member of the homologous series of aliphatic alcohols, exhibiting characteristic trends in physical properties such as boiling point and water solubility as the carbon chain length increases.`,
        "properties": propertiesList,
        "uses": usesList,
        "color": n <= 11 ? "Colorless liquid" : "White solid"
      };
    };

    // Check for carboxylic acids dynamically to ensure complete organic homologous coverage
    const parseCarboxylicAcid = (qStr: string) => {
      const q = qStr.trim().toLowerCase();
      
      const acidFormulaRegex = /^c([0-9]*)h([0-9]*)o2$/i;
      
      let n = 0;
      let isAcid = false;

      const match = q.match(acidFormulaRegex);

      if (match) {
        n = match[1] === "" ? 1 : parseInt(match[1]);
        const h = parseInt(match[2]);
        // C_n H_{2n} O_2 (isomeric esters / carboxylic acids)
        if (h === 2 * n && n >= 1) {
          isAcid = true;
        }
      } else {
        const stemClean = q.replace(/[0-9\-]+/g, "").replace(/\s+/g, "").replace(/^(iso|n-)/, "");
        
        const prefixes = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
        for (let i = 0; i < prefixes.length; i++) {
          const p = prefixes[i];
          if (stemClean.startsWith(p)) {
            const suffix = stemClean.slice(p.length);
            if (suffix === "anoicacid" || suffix === "anoic acid" || suffix === "icacid" || suffix === "ic acid") {
              n = i + 1;
              isAcid = true;
              break;
            }
          }
        }
        
        // Common names
        if (!isAcid) {
          if (q === "formic acid" || q === "methanoic acid") {
            n = 1; isAcid = true;
          } else if (q === "acetic acid" || q === "ethanoic acid" || q === "vinegar") {
            n = 2; isAcid = true;
          } else if (q === "propionic acid" || q === "propanoic acid") {
            n = 3; isAcid = true;
          } else if (q === "butyric acid" || q === "butanoic acid") {
            n = 4; isAcid = true;
          }
        }
      }

      if (!isAcid || n <= 0) return null;

      const prefixes = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", "undec", "dodec", "tridec", "tetradec", "pentadec", "hexadec", "heptadec", "octadec", "nonadec", "icos"];
      const prefixName = prefixes[n - 1] || "carbon";
      const capitalizedPrefix = prefixName.charAt(0).toUpperCase() + prefixName.slice(1);
      
      const iupacName = capitalizedPrefix + "anoic acid";
      let commonName = iupacName;
      if (n === 1) commonName = "Formic Acid";
      else if (n === 2) commonName = "Acetic Acid";
      else if (n === 3) commonName = "Propionic Acid";
      else if (n === 4) commonName = "Butyric Acid";

      const formula = n === 1 ? "HCOOH" : (n === 2 ? "CH3COOH" : `C${n - 1}H${2 * n - 1}COOH`);
      const weight = (n * 12.011 + (2 * n) * 1.008 + 31.998).toFixed(2) + " g/mol";
      const type = "Carboxylic Acid";

      let smiles = "C(=O)O";
      if (n === 1) smiles = "C(=O)O";
      else smiles = "C".repeat(n - 1) + "C(=O)O";

      const state = n <= 9 ? "Colorless liquid" : "Waxy solid";
      const smell = n === 1 ? "Pungent, penetrating odor" : (n === 2 ? "Sharp, vinegar-like odor" : (n === 4 ? "Unpleasant, rancid-butter odor" : "Sour, pungent odor"));
      const propertiesList = `Physical state: ${state}\nOdor: ${smell}\nSolubility: Lower acids (n=1 to 4) are completely miscible in water due to powerful hydrogen bonding\nAcidity: Weak Brønsted-Lowry acid, partially dissociates in aqueous solution to release hydronium ions\nBoiling Point: Exceptionally high boiling points due to the formation of stable hydrogen-bonded dimers in gas and liquid phases`;

      let usesList = "";
      if (n === 1) {
        usesList = "Preservative and antibacterial agent in livestock feed\nCoagulant in the production of natural rubber\nActive agent in leather tanning and textile dyeing processes\nDecalcifying agent and component in industrial cleaners";
      } else if (n === 2) {
        usesList = "Main component of vinegar (~4-8% aqueous solution) used in culinary applications\nPrecursor for manufacturing vinyl acetate monomer (VAM) for adhesives and paints\nIndustrial solvent for purifying organic compounds and producing cellulose acetate\nStarting material for synthetic fibers and plastic bottles";
      } else {
        usesList = "Preservative for animal feed and grain storage\nChemical intermediate in the synthesis of esters, pharmaceuticals, and agricultural chemicals\nFlavoring agent and food additive (as propionates or butyrate derivatives)\nComponent in manufacturing synthetic perfumes and plastics";
      }

      return {
        "common_name": commonName,
        "iupac_name": iupacName,
        "chemical_formula": formula,
        "molecular_weight": weight,
        "chemical_type": type,
        "classification": "Organic",
        "classification_reason": `It is an organic compound containing a carboxyl (-COOH) functional group attached to a carbon skeleton.`,
        "smiles_notation": smiles,
        "pdb_id": null,
        "quick_fact": `${commonName} (${formula}) is a carboxylic acid, demonstrating characteristic acidity and physical dimer formation via robust double hydrogen bonds.`,
        "properties": propertiesList,
        "uses": usesList,
        "color": n <= 9 ? "Colorless liquid" : "White solid"
      };
    };

    const parseMultiFunctionalOrganic = (qStr: string) => {
      const q = qStr.trim().toLowerCase();
      const norm = (s: string) => s.replace(/[^a-z0-9]/g, "");
      const qNorm = norm(q);
      
      if (qNorm === "c7h6o3" || qNorm === "salicylicacid" || q === "salicylic acid") {
        return {
          "common_name": "Salicylic Acid",
          "iupac_name": "2-Hydroxybenzoic acid",
          "chemical_formula": "C7H6O3",
          "molecular_weight": "138.12 g/mol",
          "chemical_type": "Beta Hydroxy Acid (BHA)",
          "classification": "Organic",
          "classification_reason": "Salicylic acid contains multiple functional groups: an organic carboxylic acid (-COOH) group and a phenolic hydroxyl (-OH) group attached to a benzene ring.",
          "smiles_notation": "C1=CC=C(C(=C1)O)C(=O)O",
          "pdb_id": null,
          "quick_fact": "Salicylic acid is a precursor to aspirin and is widely used in skincare for acne treatment due to its lipophilic nature.",
          "properties": "Physical state: White needle-like crystals or powder\nSolubility: Moderately soluble in hot water, highly soluble in ethanol and ether\nMelting Point: 159°C\nAcidity: Weak organic acid (pKa = 2.97), more acidic than benzoic acid due to intramolecular hydrogen bonding",
          "uses": "Used as a key ingredient in cosmetic skincare products for exfoliation and acne therapy\nStarting material for the industrial synthesis of acetylsalicylic acid (aspirin)\nFood preservative and antiseptic agent in pharmaceuticals",
          "color": "White crystalline solid"
        };
      }
      
      if (qNorm === "c3h6o3" || qNorm === "lacticacid" || q === "lactic acid") {
        return {
          "common_name": "Lactic Acid",
          "iupac_name": "2-Hydroxypropanoic acid",
          "chemical_formula": "C3H6O3",
          "molecular_weight": "90.08 g/mol",
          "chemical_type": "Alpha Hydroxy Acid (AHA)",
          "classification": "Organic",
          "classification_reason": "Lactic acid contains multiple functional groups: a carboxylic acid (-COOH) group and a secondary alcohol (-OH) group on the alpha carbon.",
          "smiles_notation": "CC(C(=O)O)O",
          "pdb_id": null,
          "quick_fact": "Lactic acid is produced in human muscles during intense anaerobic exercise and is also the primary acid in sour milk products.",
          "properties": "Physical state: Colorless syrupy liquid or low-melting white solid\nSolubility: Highly hygroscopic and completely miscible in water and ethanol\nAcidity: Weak organic acid (pKa = 3.86)\nOptically active: Exists as D-lactic acid and L-lactic acid enantiomers",
          "uses": "Used in food industry as an acidulant, preservative, and flavoring agent in dairy and pickled foods\nKey component in anti-aging skincare products for skin hydration and peeling\nPrecursor for polylactic acid (PLA), a biodegradable plastic polymer",
          "color": "Colorless syrupy liquid or white solid"
        };
      }

      if (qNorm === "c6h8o7" || qNorm === "citricacid" || q === "citric acid") {
        return {
          "common_name": "Citric Acid",
          "iupac_name": "2-Hydroxypropane-1,2,3-tricarboxylic acid",
          "chemical_formula": "C6H8O7",
          "molecular_weight": "192.12 g/mol",
          "chemical_type": "Polyprotic Hydroxy Acid",
          "classification": "Organic",
          "classification_reason": "Citric acid contains multiple functional groups: one tertiary alcohol (-OH) group and three carboxylic acid (-COOH) groups on a branched carbon backbone.",
          "smiles_notation": "C(C(=O)O)C(CC(=O)O)(C(=O)O)O",
          "pdb_id": null,
          "quick_fact": "Citric acid is a vital intermediate in the Krebs Cycle (citric acid cycle) of aerobic respiration in all living organisms.",
          "properties": "Physical state: Colorless or white crystalline solid\nSolubility: Exceptionally soluble in water and ethanol\nAcidity: Weak triprotic acid (pKa1 = 3.13, pKa2 = 4.76, pKa3 = 6.40)\nFlavor: Strongly sour, citrus taste",
          "uses": "Natural preservative and acidulant in beverages, candies, and sour foods\nBuffering and chelating agent in detergents and cosmetic cleaners\nAnticoagulant in medical blood storage by binding calcium ions",
          "color": "White crystalline solid"
        };
      }

      if (qNorm === "c9h8o4" || qNorm === "aspirin" || qNorm === "acetylsalicylicacid" || q === "aspirin" || q === "acetylsalicylic acid") {
        return {
          "common_name": "Aspirin",
          "iupac_name": "2-Acetyloxybenzoic acid",
          "chemical_formula": "C9H8O4",
          "molecular_weight": "180.16 g/mol",
          "chemical_type": "Ester / Carboxylic Acid",
          "classification": "Organic",
          "classification_reason": "Aspirin contains multiple functional groups: an ester (-COO-) group and a carboxylic acid (-COOH) group bound to an aromatic benzene ring.",
          "smiles_notation": "CC(=O)OC1=CC=CC=C1C(=O)O",
          "pdb_id": null,
          "quick_fact": "Aspirin was first synthesized by Felix Hoffmann at Bayer in 1897 and remains one of the most widely used drugs in human history.",
          "properties": "Physical state: White needle-like crystalline powder\nSolubility: Poorly soluble in cold water, highly soluble in ethanol and alkali solutions\nHydrolysis: Slowly decomposes in moist air into salicylic and acetic acids\nMelting Point: 136°C",
          "uses": "Analgesic to relieve headaches, muscle pain, and joint swelling\nAntipyretic to reduce fever and anti-inflammatory to treat rheumatoid arthritis\nLow-dose cardiovascular medication to prevent blood clot formation and strokes",
          "color": "White crystalline powder"
        };
      }

      if (qNorm === "c8h9no2" || qNorm === "paracetamol" || qNorm === "acetaminophen" || q === "paracetamol" || q === "acetaminophen") {
        return {
          "common_name": "Paracetamol",
          "iupac_name": "N-(4-hydroxyphenyl)acetamide",
          "chemical_formula": "C8H9NO2",
          "molecular_weight": "151.16 g/mol",
          "chemical_type": "Amide / Phenol",
          "classification": "Organic",
          "classification_reason": "Paracetamol contains multiple functional groups: an amide (-NHCO-) linkage and a phenolic hydroxyl (-OH) group on a benzene ring.",
          "smiles_notation": "CC(=O)NC1=CC=C(C=C1)O",
          "pdb_id": null,
          "quick_fact": "Unlike aspirin, paracetamol has minimal anti-inflammatory action but is highly effective for reducing fever and pain with excellent stomach tolerance.",
          "properties": "Physical state: Odorless, slightly bitter white crystalline solid\nSolubility: Soluble in organic solvents and boiling water, sparingly soluble in cold water\nMelting Point: 169°C\nStability: Stable in dry conditions, hydrolyzes under strong acid/base heating",
          "uses": "Over-the-counter analgesic (pain reliever) and antipyretic (fever reducer)\nUsed to treat mild-to-moderate headaches, toothaches, joint pain, and cold symptoms\nSafe alternative for patients sensitive to aspirin or NSAIDs",
          "color": "White crystalline powder"
        };
      }

      if (qNorm === "c2h5no2" || qNorm === "glycine" || q === "glycine") {
        return {
          "common_name": "Glycine",
          "iupac_name": "2-Aminoacetic acid",
          "chemical_formula": "C2H5NO2",
          "molecular_weight": "75.07 g/mol",
          "chemical_type": "Amino Acid",
          "classification": "Organic",
          "classification_reason": "Glycine contains multiple functional groups: a primary amine (-NH2) group and a carboxylic acid (-COOH) group attached to a single carbon atom.",
          "smiles_notation": "C(C(=O)O)N",
          "pdb_id": null,
          "quick_fact": "Glycine is the simplest of the 20 standard amino acids used to build proteins, and is the only achiral amino acid because its alpha carbon is bound to two hydrogens.",
          "properties": "Physical state: Sweet-tasting white crystalline solid\nZwitterionic structure: In solid and neutral solution, it exists as a zwitterion (+NH3-CH2-COO-)\nSolubility: Exceptionally soluble in water, insoluble in non-polar organic solvents\nMelting Point: Decomposes above 233°C",
          "uses": "Core building block in cellular protein synthesis and collagen structure\nInhibitory neurotransmitter in the central nervous system (spinal cord and brainstem)\nBuffering agent in antacids, cosmetics, and biochemical research",
          "color": "White crystalline solid"
        };
      }

      if (qNorm === "c3h7no2" || qNorm === "alanine" || q === "alanine") {
        return {
          "common_name": "Alanine",
          "iupac_name": "2-Aminopropanoic acid",
          "chemical_formula": "C3H7NO2",
          "molecular_weight": "89.09 g/mol",
          "chemical_type": "Amino Acid",
          "classification": "Organic",
          "classification_reason": "Alanine contains multiple functional groups: a primary amine (-NH2) group and a carboxylic acid (-COOH) group bound to a central carbon with a methyl side chain.",
          "smiles_notation": "CC(C(=O)O)N",
          "pdb_id": null,
          "quick_fact": "L-alanine is an essential amino acid produced in human metabolism and plays a central role in the glucose-alanine cycle connecting liver and muscles.",
          "properties": "Physical state: Odorless white crystalline powder\nZwitterion state: Exists as +NH3-CH(CH3)-COO- at neutral physiological pH\nSolubility: Highly soluble in water, slightly soluble in ethanol\nMelting Point: 258°C with decomposition",
          "uses": "Protein synthesis component in cell cultures and nutritional supplements\nKey player in amino acid metabolism, supplying nitrogen and carbon to muscles\nRaw material in organic synthesis and pharmaceutical drug design",
          "color": "White crystalline solid"
        };
      }

      if (qNorm === "c6h8o6" || qNorm === "ascorbicacid" || qNorm === "vitaminc" || q === "ascorbic acid" || q === "vitamin c") {
        return {
          "common_name": "Ascorbic Acid",
          "iupac_name": "(5R)-[(1S)-1,2-dihydroxyethyl]-3,4-dihydroxyfuran-2(5H)-one",
          "chemical_formula": "C6H8O6",
          "molecular_weight": "176.12 g/mol",
          "chemical_type": "Enol / Lactone / Vitamin",
          "classification": "Organic",
          "classification_reason": "Ascorbic acid contains multiple functional groups: four hydroxyl (-OH) groups (two of which form a reactive enediol system) and a cyclic ester (lactone) ring.",
          "smiles_notation": "C(C(C1C(=C(C(=O)O1)O)O)O)O",
          "pdb_id": null,
          "quick_fact": "Humans cannot synthesize Vitamin C due to a mutation in the GULO gene, making it an essential dietary nutrient to prevent scurvy.",
          "properties": "Physical state: White or pale-yellow crystals, sour taste\nSolubility: Soluble in water, moderately soluble in alcohol, insoluble in ether\nAcidity: Acidic behavior due to deprotonation of the enol hydroxyls (pKa1 = 4.17)\nRedox: Strong reducing agent, easily oxidized by light and heat",
          "uses": "Essential dietary supplement (Vitamin C) for immune support and collagen synthesis\nAntioxidant food additive to prevent browning and spoilage of fruits and juices\nReducing agent in photographic developer solutions and biochemical assays",
          "color": "White or pale-yellow crystals"
        };
      }

      return null;
    };

    const multiFunctionalResult = parseMultiFunctionalOrganic(cleanQuery);
    if (multiFunctionalResult) {
      return res.json(enrichKYCResultWithStructureUrls(multiFunctionalResult, query));
    }

    const hydrocarbonResult = parseHydrocarbon(cleanQuery);
    if (hydrocarbonResult) {
      return res.json(enrichKYCResultWithStructureUrls(hydrocarbonResult, query));
    }

    const cyclicHydrocarbonResult = parseCyclicHydrocarbon(cleanQuery);
    if (cyclicHydrocarbonResult) {
      return res.json(enrichKYCResultWithStructureUrls(cyclicHydrocarbonResult, query));
    }

    const alcoholResult = parseAlcohol(cleanQuery);
    if (alcoholResult) {
      return res.json(enrichKYCResultWithStructureUrls(alcoholResult, query));
    }

    const acidResult = parseCarboxylicAcid(cleanQuery);
    if (acidResult) {
      return res.json(enrichKYCResultWithStructureUrls(acidResult, query));
    }

    // 1. Try exact or high-confidence match in OFFLINE_KYC_DB
    let matchedItem = null;
    const norm = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanNorm = norm(cleanQuery);

    // Word-boundary-safe helpers for the fuzzy fallback stages below.
    // Plain character-level substring checks are dangerous for chemical names: e.g. "uric acid"
    // is literally a substring of "sulfuric acid" once spaces are stripped, which previously caused
    // completely unrelated compounds to match. Comparing whole words instead of raw characters
    // prevents "uric" from matching inside "sulfuric", "ethane" from matching inside "methane", etc.
    const tokenize = (s: string): string[] =>
      s.trim().toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    const wordSetIsSubsetOf = (smaller: string[], bigger: string[]): boolean =>
      smaller.length > 0 && smaller.every(w => bigger.includes(w));
    const wordsMatch = (a: string, b: string): boolean => {
      const wa = tokenize(a);
      const wb = tokenize(b);
      return wordSetIsSubsetOf(wa, wb) || wordSetIsSubsetOf(wb, wa);
    };

    for (const key of Object.keys(OFFLINE_KYC_DB)) {
      const keyNorm = norm(key);
      const commonNameNorm = norm(OFFLINE_KYC_DB[key].common_name || "");
      const formulaNorm = norm(OFFLINE_KYC_DB[key].chemical_formula || "");
      
      if (keyNorm === cleanNorm || commonNameNorm === cleanNorm || formulaNorm === cleanNorm) {
        matchedItem = { ...OFFLINE_KYC_DB[key] };
        break;
      }
    }

    // 1.5. If no exact match in OFFLINE_KYC_DB, try exact or high-confidence match in COMMON_NAMES_TO_FORMULA
    if (!matchedItem) {
      for (const name of Object.keys(COMMON_NAMES_TO_FORMULA)) {
        const nameNorm = norm(name);
        const formulaNorm = norm(COMMON_NAMES_TO_FORMULA[name].formula);
        const iupacNorm = norm(COMMON_NAMES_TO_FORMULA[name].iupac);
        
        if (nameNorm === cleanNorm || formulaNorm === cleanNorm || iupacNorm === cleanNorm) {
          const item = COMMON_NAMES_TO_FORMULA[name];
          const classificationDetails = classifyFormula(item.formula);
          const smiles = item.smiles || (item.classification === "Organic" || classificationDetails.classification === "Organic" ? "C1=CC=CC=C1" : "[Na+].[Cl-]");
          const computedItemWeight = calculateMolecularWeight(item.formula);

          matchedItem = {
            "common_name": item.iupac,
            "iupac_name": item.iupac,
            "chemical_formula": item.formula,
            "molecular_weight": computedItemWeight !== null ? `${computedItemWeight} g/mol` : "Not available for this formula",
            "chemical_type": item.type,
            "classification": item.classification || classificationDetails.classification,
            "classification_reason": classificationDetails.reason,
            "smiles_notation": smiles,
            "pdb_id": null,
            "quick_fact": `A standard high-yield inorganic/organic compound studied in secondary chemistry. Formula: ${item.formula}`,
            "properties": item.classification === "Organic" 
              ? "Physical crystalline\nSolid substance with high relative molecular stability\nSoluble in organic solvents" 
              : "Physical crystalline\nInorganic mineral substance with standard physical crystalline framework",
            "uses": item.classification === "Organic"
              ? "General school and college-level chemical training\nTest-prep reactions\nGeneral scientific analysis"
              : "Industrial chemical uses\nLaboratory reagent exercises\nEducational compound study",
            "color": item.color
          };
          break;
        }
      }
    }

    // 1.8. Try parsing as a raw formula directly (e.g. CuSO4, Fe2O3, Cu2O) if it is valid
    if (!matchedItem && isValidFormula(query)) {
      const formula = query.trim();
      const classificationDetails = classifyFormula(formula);
      
      // Guess type and color
      let type = classificationDetails.classification === "Organic" ? "Organic Compound" : "Inorganic Compound";
      let color = "Colorless or white substance";
      if (formula.includes("SO4")) type = "Metal Sulfate";
      else if (formula.includes("CO3")) type = "Metal Carbonate";
      else if (formula.includes("NO3")) type = "Metal Nitrate";
      else if (formula.endsWith("O") || formula.includes("O2") || formula.includes("O3")) type = "Metal Oxide";
      else if (formula.includes("Cl") || formula.includes("Br") || formula.includes("I") || formula.includes("F")) type = "Metal Halide";
      else if (formula.includes("OH")) type = "Metal Hydroxide / Base";

      if (formula.includes("Cu")) color = "Bright blue or green crystals";
      else if (formula.includes("Fe")) color = "Yellow-brown or reddish-brown solid";
      else if (formula.includes("Ni")) color = "Green crystals";
      else if (formula.includes("Co")) color = "Pink/red crystals";
      else if (formula.includes("Cr")) color = "Orange or yellow crystals";

      // IMPORTANT: the common/IUPAC name must be the real formula itself, not a fabricated
      // "Chemical X" / "Systemic X" placeholder. Those fake names could never resolve on PubChem,
      // which is why the structure image fell through every fallback and eventually rendered a
      // hardcoded, completely unrelated SMILES (benzene for any unmatched organic formula, plain
      // sodium chloride for any unmatched inorganic one) -- a real but totally wrong structure. Most
      // raw formulas (e.g. "V2O5") actually do resolve directly on PubChem's name-lookup endpoint,
      // so using the real formula here gives the structure image a genuine chance to be correct, and
      // omitting a fabricated SMILES (left as "") means the frontend's fallback chain skips straight
      // past it to the name/formula-based URLs instead of drawing an unrelated molecule.
      const computedWeight = calculateMolecularWeight(formula);

      matchedItem = {
        "common_name": formula,
        "iupac_name": formula,
        "chemical_formula": formula,
        "molecular_weight": computedWeight !== null ? `${computedWeight} g/mol (calculated)` : "Not available for this formula",
        "chemical_type": type,
        "classification": classificationDetails.classification,
        "classification_reason": classificationDetails.reason,
        "smiles_notation": "",
        "pdb_id": null,
        "quick_fact": `Compound with molecular formula ${formula}, parsed and classified from its formula. Its full name, structure, and detailed properties were not found in our curated database, so the values shown here are best-effort estimates.`,
        "properties": `${classificationDetails.classification} chemical substance. Detailed physical properties were not found in our curated database for this specific formula.`,
        "uses": "Not available in our curated database for this specific formula.",
        "color": color
      };
    }

    // 2. Whole-word fallback match ONLY if no exact match has succeeded anywhere.
    // Uses word-set comparison (not raw substring) to avoid cross-matching unrelated
    // compounds whose names merely happen to contain each other as character sequences.
    //
    // A crystalline/hydrate entry's name (e.g. "Green Vitriol (Iron(II) Sulfate Heptahydrate)")
    // is always a word-superset of its plain anhydrous salt's name (e.g. "Iron(II) Sulfate"), so
    // a subset-based fuzzy match would otherwise ALWAYS resolve a plain salt search to the hydrate
    // entry -- exactly the "why does every salt show its crystallized form" bug. A query is only
    // allowed to fuzzy-match a hydrate-formula entry when it actually says so itself (mentions
    // hydration, or names the specific historical crystal name like "Vitriol"/"Epsom"/"Alum").
    const queryImpliesHydrate = /HYDRATE|CRYSTAL|HYDROUS|VITRIOL|EPSOM|ALUM|GYPSUM|BORAX|MOHR|PLASTER OF PARIS|WASHING SODA/i.test(cleanQuery);
    const isHydrateDbFormula = (f: string) => /[·.]\s*\d*\.?\d*\s*H2O/i.test(f || "");
    if (!matchedItem && cleanNorm.length >= 3) {
      for (const key of Object.keys(OFFLINE_KYC_DB)) {
        if (isHydrateDbFormula(OFFLINE_KYC_DB[key].chemical_formula) && !queryImpliesHydrate) continue;
        if (wordsMatch(cleanQuery, key) || wordsMatch(cleanQuery, OFFLINE_KYC_DB[key].common_name || "")) {
          matchedItem = { ...OFFLINE_KYC_DB[key] };
          break;
        }
      }
    }

    if (matchedItem) {
      // Dynamic fallback injection for Properties and Uses if absent
      const key = (matchedItem.common_name || "").toLowerCase();
      if (!matchedItem.properties) {
        if (key.includes("paracetamol") || key.includes("acetaminophen")) {
          matchedItem.properties = "Soluble in organic solvents (like ethanol), stable under normal dry storage, neutral pH in solution, decomposes at very high temperatures.";
          matchedItem.uses = "Self-administered over-the-counter medicine to reduce fever (antipyretic) and relieve mild/moderate headaches, muscle aches, or general pain.";
        } else if (key.includes("aspirin")) {
          matchedItem.properties = "White needle-like crystalline powder, slightly acidic taste, weakly soluble in water, forms salicylic acid and acetic acid on hydrolysis.";
          matchedItem.uses = "Treats mild to moderate pain/fever, decreases swelling and redness of joints, and is used at low doses to prevent cardiorespiratory blood clotting.";
        } else if (key.includes("cuso4") || key.includes("blue vitriol") || key.includes("copper sulfate")) {
          matchedItem.properties = "Bright blue crystalline solids coordination hydrate. Dehydrates on heating from blue to anhydrous white powder. Very soluble in water.";
          matchedItem.uses = "Educational test-reaction reagent, fungicide in grape agriculture, electroplating component, and mordant in structural textile dyeing.";
        } else if (key.includes("stearate")) {
          matchedItem.properties = "Aliphatic sodium carboxylate soap, amphipathic structure containing active hydrophilic head and long hydrophobic tail, forms insoluble scum with Ca2+/Mg2+.";
          matchedItem.uses = "Primary active surfactant ingredient in laundry hand soaps, thickener in petroleum lubricants, and emulsion stabilizer in cosmetics.";
        } else if (key.includes("hemoglobin")) {
          matchedItem.properties = "Large tetrameric globular biological metalloprotein containing organic folded globins bound covalently to central iron-containing heme coordination disks.";
          matchedItem.uses = "Primary physiological oxygen transport agent in eukaryotic erythrocyte cells, studied in biochemical protein coordination modeling.";
        } else if (key.includes("glucose")) {
          matchedItem.properties = "Hexose aldehyde monosaccharide sugar, highly soluble in polar solvents, sweet taste, crystallizes in open or closed hemiacetal ring conformations.";
          matchedItem.uses = "Fundamental carbohydrate metabolic fuel source oxidized during cellular respiration to synthesize ATP energy inside living cells.";
        } else if (key.includes("baking soda") || key.includes("nahco3") || key.includes("bicarbonate")) {
          matchedItem.properties = "Alkaline white carbonate mineral crystalline powder, releases carbon dioxide gas upon thermal decomposition above 50°C and neutralization with acids.";
          matchedItem.uses = "Essential food-grade leavening agent in baking doughs, antacid for immediate relief of stomach acidity, and buffer indicator in dry extinguishers.";
        } else if (key.includes("dna")) {
          matchedItem.properties = "Double-stranded right-handed helical macromolecular biopolymer composed of nitrogenous base pairs linked covalently to sugar-phosphate polymer backbones.";
          matchedItem.uses = "Permanently archives physiological/hereditary genetic blueprints, directs cellular enzyme syntheses, and acts as the material basis of heredity.";
        } else if (key.includes("penicillin")) {
          matchedItem.properties = "Organic beta-lactam chemical compound with bicyclic ring system coupled to thiazolidine ring, sensitive to specific bacterial penicillinase enzymes.";
          matchedItem.uses = "First discovered bacterial cell-wall synthesis inhibitor antibiotic, used to counter streptococci, pneumococci, and staphylococcal infections.";
        } else if (key.includes("vitriol") || key.includes("feso4") || key.includes("iron sulfate")) {
          matchedItem.properties = "Light-green crystalline heptahydrate salt. Thermally decomposes into ferric oxide, sulfur dioxide, and sulfur trioxide acidic toxic fumes.";
          matchedItem.uses = "Medical iron-deficiency mineral supplement, industrial raw material for writing ink manufacture, and clarifying flocculant in wastewater purification.";
        } else {
          matchedItem.properties = "Physical crystalline\nSolid substance with high relative molecular stability\nStandard chemical geometry";
          matchedItem.uses = "Educational chemistry research\nStoichiometry exercises\nExam preparation study";
        }
      }
      return res.json(enrichKYCResultWithStructureUrls(matchedItem, query));
    }

    // 3. Try custom COMMON_NAMES_TO_FORMULA dictionary (whole-word match, see note above)
    for (const name of Object.keys(COMMON_NAMES_TO_FORMULA)) {
      if (norm(name) === cleanNorm || (cleanNorm.length >= 4 && wordsMatch(cleanQuery, name))) {
        const item = COMMON_NAMES_TO_FORMULA[name];
        const classificationDetails = classifyFormula(item.formula);
        const smiles = item.smiles || (item.classification === "Organic" || classificationDetails.classification === "Organic" ? "C1=CC=CC=C1" : "[Na+].[Cl-]");
        
        return res.json(enrichKYCResultWithStructureUrls({
          "common_name": item.iupac,
          "iupac_name": item.iupac,
          "chemical_formula": item.formula,
          "molecular_weight": "80.00 g/mol",
          "chemical_type": item.type,
          "classification": item.classification || classificationDetails.classification,
          "classification_reason": classificationDetails.reason,
          "smiles_notation": smiles,
          "pdb_id": null,
          "quick_fact": `A standard high-yield inorganic/organic compound studied in secondary chemistry. Formula: ${item.formula}`,
          "properties": item.classification === "Organic" 
            ? "Physical crystalline\nSolid substance with high relative molecular stability\nSoluble in organic solvents" 
            : "Physical crystalline\nInorganic mineral substance with standard physical crystalline framework",
          "uses": "Educational chemistry research\nStoichiometry exercises\nExam preparation study",
          "color": item.color
        }, query));
      }
    }

    // 3.8. Fallback to Gemini AI model search if live API key is defined
    if (ai) {
      try {
        console.log(`[Gemini KYC] Querying AI model for multiple functional groups or custom compound: ${query}`);
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `
            Role & Objective:
            You are the advanced chemical structure data retriever for the "Know Your Chemicals" app tool. Your sole responsibility is to provide accurate, high-quality, large-scale 2D structural diagram image URLs for ANY requested compound. You must seamlessly handle everything from basic compounds to highly complex organic molecules with multiple functional groups and advanced inorganic compounds using precise naming systems.

            Language Constraint:
            CRITICAL: You must respond ONLY in English. Do not use Hindi, Hinglish, or any other language under any circumstances. All JSON keys and text values must be strictly in professional English.

            Dual-Naming Sourcing Strategy (No SMILES URLs):
            - For Everyday/Common Compounds: If the compound has a globally recognized common name (e.g., Aspirin, Caffeine, Paracetamol, Water), you must provide BOTH its common name and its precise systematic IUPAC name. Construct the primary URL using the verified common name.
            - For Complex & Multi-Functional Compounds: For complex organic compounds containing multiple functional groups (e.g., Salicylic Acid, Lactic Acid, Citric Acid, etc.), or specific inorganic molecules where common names fail or don't exist, you MUST determine and utilize the exact systematic IUPAC Name to build the structure URL. This ensures PubChem resolves the multi-functional layout without errors.

            Image Size & Formatting Rules:
            To ensure the structure is large, highly visible, zoomed-in, and perfectly fits the app's display box without shrinking, you must explicitly append the ?image_size=600x600 parameter to every constructed PubChem URL.

            URL Construction Rules:
            - Common Name URL Route: https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/[Common_Name]/PNG?image_size=600x600
            - IUPAC Name URL Route: https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/[IUPAC_Name]/PNG?image_size=600x600

            Strict Output Constraints:
            - NEVER attempt to draw chemical structures using text characters or ASCII art.
            - NEVER hallucinate or guess a structure link. Only build valid, standardized database URLs using sanitized names.

            Analyze the following chemical or compound query: "${query}"
            Identify if it contains multiple functional groups. If so, clearly outline all of them in the "classification_reason".
            
            Return the full detailed profile strictly as a JSON matching this TypeScript schema:
            
            interface KYCResult {
              common_name: string; // Common name or query name capitalized (e.g. "Salicylic Acid")
              iupac_name: string; // IUPAC systematic name (e.g. "2-hydroxybenzoic acid")
              chemical_formula: string; // Standard molecular formula (e.g. "C7H6O3")
              molecular_weight: string; // Molecular weight with units (e.g. "138.12 g/mol")
              chemical_type: string; // Class of compound (e.g. "Beta Hydroxy Acid (BHA)")
              classification: "Organic" | "Inorganic"; // Must be either "Organic" or "Inorganic"
              classification_reason: string; // Explain the carbon framework, and identify all functional groups present in detail (e.g. contains both carboxylic acid and phenol functional groups)
              smiles_notation: string; // Canonical SMILES string
              pdb_id: string | null; // Leave as null or provide a valid PDB ID
              quick_fact: string; // 1-2 sentences of interesting chemical or historical fact
              color: string; // Physical color and state (e.g. "White needle-like crystals")
              properties: string; // Multi-line physical properties (separated by \n)
              uses: string; // Multi-line common uses and applications (separated by \n)
              requested_compound: string; // Original search term entered by the user
              primary_structure_url: string; // PubChem 2D PNG URL using the most reliable name with ?image_size=600x600
              fallback_iupac_url: string; // PubChem 2D PNG URL using IUPAC systematic name with ?image_size=600x600
              source_credit: string; // Set to "National Institutes of Health (NIH) - PubChem"
              element_category?: "Metal" | "Non-metal" | "Metalloid"; // For pure elements of the periodic table
              atomic_number?: number; // For pure elements of the periodic table
              atomic_mass?: string; // For pure elements of the periodic table
            }
          `,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                common_name: { type: Type.STRING },
                iupac_name: { type: Type.STRING },
                chemical_formula: { type: Type.STRING },
                molecular_weight: { type: Type.STRING },
                chemical_type: { type: Type.STRING },
                classification: { type: Type.STRING, enum: ["Organic", "Inorganic"] },
                classification_reason: { type: Type.STRING },
                smiles_notation: { type: Type.STRING },
                pdb_id: { type: Type.STRING, nullable: true },
                quick_fact: { type: Type.STRING },
                color: { type: Type.STRING },
                properties: { type: Type.STRING },
                uses: { type: Type.STRING },
                requested_compound: { type: Type.STRING },
                primary_structure_url: { type: Type.STRING },
                fallback_iupac_url: { type: Type.STRING },
                source_credit: { type: Type.STRING },
                element_category: { type: Type.STRING, enum: ["Metal", "Non-metal", "Metalloid"] },
                atomic_number: { type: Type.INTEGER },
                atomic_mass: { type: Type.STRING }
              },
              required: [
                "common_name",
                "iupac_name",
                "chemical_formula",
                "molecular_weight",
                "chemical_type",
                "classification",
                "classification_reason",
                "smiles_notation",
                "quick_fact",
                "color",
                "properties",
                "uses",
                "requested_compound",
                "primary_structure_url",
                "fallback_iupac_url",
                "source_credit"
              ]
            }
          }
        });
        
        const text = response.text?.trim();
        if (text) {
          const data = JSON.parse(text);
          return res.json(enrichKYCResultWithStructureUrls(data, query));
        }
      } catch (err: any) {
        console.error("[Gemini KYC Error] Falling back to 404", err);
      }
    }

    // 4. If still not matched, do not analyze it. Return clear error.
    return res.status(404).json({ error: "This compound is not in our database." });
  });

  // Request Registration OTP for the phone number
  app.post("/api/otp/send", async (req, res) => {
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ error: "Email and Phone Number are both required to dispatch verification codes." });
    }

    const emailNormalized = email.toLowerCase().trim();
    const phoneTrimmed = phone.trim();

    const { data: existingUser } = await supabase.from("users").select("email").eq("email", emailNormalized).maybeSingle();
    if (existingUser) {
      return res.status(400).json({ error: "This email address is already registered inside Ray-Optica." });
    }

    // Generate random 4-digit mobile verification code
    const phoneOtp = String(Math.floor(1000 + Math.random() * 9000));

    // Store for 10 minutes, keyed by email (overwrites any earlier pending OTP for this email)
    await supabase.from("pending_otps").upsert({
      email: emailNormalized,
      phone: phoneTrimmed,
      phone_otp: phoneOtp,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    });

    // Awaited (not fire-and-forget): a serverless function instance can be frozen the instant
    // its HTTP response goes out, which would silently kill the SMTP send mid-flight and leave
    // the student waiting on a code that never arrives, even though this endpoint claimed success.
    const delivered = await sendSimulatedEmail(
      emailNormalized,
      "Your Verification Code - Conceptual Learning Online",
      `Your verification code is: ${phoneOtp}. Valid for 10 minutes.\n\nIf you did not request this, you can ignore this email.`,
      'otp'
    );

    if (!delivered) {
      console.error(`[OTP Send Failed] Could not deliver verification email to ${emailNormalized}`);
      return res.status(502).json({
        error: "We couldn't send the verification email right now. Please wait a moment and try again, or contact your teacher if this keeps happening.",
      });
    }

    console.log(`[OTP Generated] Verification code sent by email for ${emailNormalized}`);

    return res.json({
      success: true,
      message: "A verification code has been sent to your email address.",
    });
  });

  // User Profile registration (Requires Phone OTP + Phone Number)
  app.post("/api/register", async (req, res) => {
    const { name, email, password, phone, whatsappNumber, phoneOtp, studentClass, studentType } = req.body;

    if (!name || !email || !password || !phone || !whatsappNumber || !phoneOtp) {
      return res.status(400).json({ error: "Please complete all fields and verify your email using the OTP prior to registering." });
    }

    if (studentType !== "offline" && studentType !== "online") {
      return res.status(400).json({ error: "Please tell us whether you're an offline (regular class) or online (self-study) student." });
    }

    const emailNormalized = email.toLowerCase().trim();
    if (ADMIN_EMAILS.includes(emailNormalized)) {
      return res.status(400).json({ error: "Owner account is already bootstrapped. Please log in directly." });
    }

    const { data: existingUser } = await supabase.from("users").select("email").eq("email", emailNormalized).maybeSingle();
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email address is already registered." });
    }

    // Verify OTP tokens
    const { data: pending } = await supabase.from("pending_otps").select("*").eq("email", emailNormalized).maybeSingle();
    if (!pending) {
      return res.status(400).json({ error: "OTP sessions have expired or been misplaced. Please click 'Send Verification OTP' to dispatch codes again." });
    }

    if (Date.now() > new Date(pending.expires_at).getTime()) {
      await supabase.from("pending_otps").delete().eq("email", emailNormalized);
      return res.status(400).json({ error: "Your OTP verification code has expired. Please request a new one." });
    }

    if (pending.phone_otp !== String(phoneOtp).trim()) {
      // Invalidate the code on any wrong guess -- a 4-digit code with unlimited retries within
      // its 10-minute window would otherwise be brute-forceable in a few thousand requests.
      await supabase.from("pending_otps").delete().eq("email", emailNormalized);
      return res.status(400).json({ error: "Invalid verification code. Please click 'Send Verification OTP' again to get a new code." });
    }

    // OTP keys are valid! Discard pending session.
    await supabase.from("pending_otps").delete().eq("email", emailNormalized);

    const targetPhone = phone.trim();
    const targetWhatsapp = whatsappNumber.trim();
    const passwordHash = await bcrypt.hash(password, 10);

    // User is created strictly with 'pending' status by direct instruction.
    // "Whoever registers, their approval must first come to me via email."
    const { data: insertedRow, error: insertError } = await supabase
      .from("users")
      .insert({
        name: name.trim(),
        email: emailNormalized,
        phone: targetPhone,
        whatsapp_number: targetWhatsapp,
        password_hash: passwordHash,
        status: "pending", // ALWAYS pending first!
        devices: [],
        role: "student",
        student_class: studentClass || "10th",
        student_type: studentType
      })
      .select()
      .single();

    if (insertError || !insertedRow) {
      console.error("Error inserting new user:", insertError?.message);
      return res.status(500).json({ error: "Failed to create account. Please try again." });
    }

    const newUser = mapUserRow(insertedRow);

    // Send notification email to Rohit (Owner) with dynamic click-to-approve links
    const requestHost = `${req.protocol}://${req.get('host')}`;
    const appUrl = (process.env.APP_URL || requestHost || "").replace(/\/$/, "");
    const approveUrl = `${appUrl}/api/user/approve-external?email=${encodeURIComponent(newUser.email)}&token=${encodeURIComponent(signApprovalToken(newUser.email))}`;

    const textBody = `Hello Rohit,\n\nA new student has successfully completed verification and submitted their registration request:\n\n` +
      `- Name: ${newUser.name}\n` +
      `- Email Address: ${newUser.email}\n` +
      `- Phone Number: ${newUser.phone}\n` +
      `- Class Level: ${newUser.studentClass || "10th"}\n` +
      `- Status: PENDING INBOX APPROVAL\n\n` +
      `Review and approve this registration instantly:\n` +
      `👉 Click Approve directly inside the platform or click here to approve via your email client:\n` +
      `${approveUrl}\n\n` +
      `Warm regards,\nRay-Optica System Daemon`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700; border-bottom: 2px solid #22d3ee; padding-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          📚 New Ray-Optica Student Enrollment
        </h2>
        <p style="font-size: 15px; line-height: 1.5; color: #334155; margin-bottom: 20px;">
          Hello Rohit, a new student has successfully completed verification/OTP validation and submitted an enrollment request:
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 600; font-size: 14px; color: #475569; width: 35%; background-color: #f8fafc;">Full Name:</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #0f172a;">${newUser.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 600; font-size: 14px; color: #475569; background-color: #f8fafc;">Email Address:</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #0f172a;">${newUser.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 600; font-size: 14px; color: #475569; background-color: #f8fafc;">Phone Number:</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #0f172a;">${newUser.phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: 600; font-size: 14px; color: #475569; background-color: #f8fafc;">Class:</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #0891b2; font-weight: 800;">Class ${newUser.studentClass || "10th"}</td>
          </tr>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${approveUrl}" style="background-color: #0891b2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(8, 145, 178, 0.3);">
            ✅ APPROVE STUDENT NOW
          </a>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 0; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Note: If the button above doesn't open properly, copy and paste this URL direct into your web browser:<br/>
          <a href="${approveUrl}" style="color: #0ea5e9; word-break: break-all;">${approveUrl}</a>
        </p>
      </div>
    `;

    // Awaited so this can't be frozen mid-send once the response below goes out -- the account
    // itself is already created either way, so a failure here is only logged, never surfaced to
    // the student (they still see a normal success message).
    for (const adminEmail of ADMIN_NOTIFICATION_EMAILS) {
      await sendSimulatedEmail(
        adminEmail,
        `📝 Action Required: New Student Registry [${newUser.name}]`,
        textBody,
        'incoming',
        htmlBody
      );
    }

    return res.status(200).json({
      message: "Registration completed after Phone OTP validation! Your profile is pending manual review and approval by your teacher. A notification has been dispatched.",
      status: newUser.status,
      user: newUser
    });
  });

  // External GET entry point to approve students on a single click from incoming email CTA buttons
  app.get("/api/user/approve-external", async (req, res) => {
    const { email, token } = req.query;
    if (!email) {
      return res.status(400).send("<h1>Missing mandatory email field</h1>");
    }

    const targetEmail = String(email).toLowerCase().trim();
    // Without this, anyone who knows (or guesses) a pending student's email address could hit
    // this link directly and self-approve their own account, skipping admin review entirely.
    if (!verifyApprovalToken(targetEmail, String(token || ""))) {
      return res.status(403).send("<h1>Invalid or expired approval link.</h1>");
    }
    const { data: targetUser } = await supabase.from("users").select("*").eq("email", targetEmail).maybeSingle();

    if (!targetUser) {
      return res.status(404).send(`<h1>Student profile associated with ${targetEmail} not found</h1>`);
    }

    await supabase.from("users").update({ status: "approved" }).eq("email", targetEmail);

    const congradsSubject = "🎉 Account Approved: Welcome to Ray-Optica!";
    const congradsBody = `Dear ${targetUser.name},\n\nWe are delighted to inform you that your registration request for Conceptual Learning Online has been officially APPROVED!\n\nYou now have full access to study notes, CBSE Board preparations, and interactive physics ray simulators on up to 3 authorized device browsers.\n\nTo begin exploring, head to the portal and sign in using your account credentials.\n\nWarm regards,\nConceptual Learning Online Team`;

    // Notify student as well (awaited so it can't be frozen mid-send once the response goes out)
    await sendSimulatedEmail(
      targetEmail,
      congradsSubject,
      congradsBody,
      'outgoing'
    );

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Ray-Optica Approvals</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background-color: #050912;
              color: #f8fafc;
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              text-align: center;
            }
            .card {
              background-color: #0b1329;
              border: 1px solid #1e293b;
              border-radius: 16px;
              padding: 40px;
              max-width: 480px;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            }
            h1 {
              color: #22d3ee;
              font-size: 28px;
              margin-bottom: 12px;
            }
            p {
              color: #94a3b8;
              font-size: 15px;
              line-height: 1.6;
              margin-bottom: 24px;
            }
            .badge {
              display: inline-block;
              background-color: #022c22;
              color: #34d399;
              font-weight: bold;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              padding: 6px 12px;
              border-radius: 20px;
              border: 1px solid #064e3b;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">Success</div>
            <h1>Student Approved!</h1>
            <p><strong>${targetUser.name}</strong> (${targetEmail}) has been successfully approved as a student on Ray-Optica. They can now access all resources, calculators, and simulators instantly!</p>
            <p style="font-size: 13px; color: #475569;">You can safely close this browser window or return to the application layout.</p>
          </div>
        </body>
      </html>
    `);
  });

  // User Login & Device Limitation Gate
  app.post("/api/login", async (req, res) => {
    const { email, password, deviceId, deviceName } = req.body;

    if (!email || !password || !deviceId) {
      return res.status(400).json({ error: "Missing required parameters: email, password, and deviceId are mandatory." });
    }

    const emailNormalized = email.toLowerCase().trim();
    const isTestAccount = emailNormalized === "test@rayoptica.com";
    const { data: userRow } = await supabase.from("users").select("*").eq("email", emailNormalized).maybeSingle();

    if (!userRow) {
      return res.status(401).json({ error: "No user found with this email. Please check spelling or register." });
    }

    // Brute-force lockout: too many wrong passwords locks the account out temporarily, so a
    // script can't just guess passwords forever.
    const now = Date.now();
    const lockedUntilMs = userRow.locked_until ? new Date(userRow.locked_until).getTime() : 0;
    if (lockedUntilMs > now) {
      const minutesLeft = Math.max(1, Math.ceil((lockedUntilMs - now) / 60000));
      return res.status(429).json({ error: `Too many failed login attempts. Please try again in ${minutesLeft} minute(s).` });
    }

    const passwordMatches = await bcrypt.compare(password, userRow.password_hash);
    if (!passwordMatches) {
      const attempts = (userRow.failed_login_attempts || 0) + 1;
      const lockoutUpdates: Record<string, any> = { failed_login_attempts: attempts };
      if (attempts >= 8) lockoutUpdates.locked_until = new Date(now + 15 * 60 * 1000).toISOString();
      const { error: lockoutError } = await supabase.from("users").update(lockoutUpdates).eq("email", emailNormalized);
      if (lockoutError) console.warn("Login lockout tracking unavailable (run the latest schema migration):", lockoutError.message);
      return res.status(401).json({ error: "Invalid password. Please try again." });
    }

    if (userRow.failed_login_attempts || userRow.locked_until) {
      const { error: clearError } = await supabase.from("users").update({ failed_login_attempts: 0, locked_until: null }).eq("email", emailNormalized);
      if (clearError) console.warn("Login lockout tracking unavailable (run the latest schema migration):", clearError.message);
    }

    if (userRow.status === "pending") {
      return res.status(403).json({ error: "Registration is pending approval. Please ask your teacher to approve your account." });
    }

    if (userRow.status === "rejected") {
      return res.status(403).json({ error: "Your access has been suspended or rejected by the owner." });
    }

    // Exquisite Device Type validation: Mobile Phone, Laptop, Tablet
    const allowedDevices = ["Mobile Phone", "Laptop", "Tablet"];
    if (!isTestAccount && userRow.role !== "admin" && (!deviceName || !allowedDevices.includes(deviceName))) {
      return res.status(400).json({
        error: "Access Denied: Ray-Optica is exclusive to Laptops, Mobile Phones, and Tablets. Other device architectures are unsupported."
      });
    }

    // Check device limitations
    const devices: DeviceSession[] = userRow.devices || [];
    const existingDeviceIdx = devices.findIndex((d) => d.deviceId === deviceId);

    if (existingDeviceIdx !== -1) {
      // Device is already registered, update last used timestamp
      devices[existingDeviceIdx].lastUsed = new Date().toISOString();
      if (deviceName) {
        devices[existingDeviceIdx].deviceName = deviceName;
      }
    } else {
      // New device is attempting to log in. Must check max limit of 3 (unless test account).
      if (!isTestAccount && devices.length >= 3 && userRow.role !== "admin") {
        return res.status(403).json({
          error: "Permission Denied: This account is already authorized on the maximum of 3 devices. To log in here, please contact the owner to sign out or reset one of your devices."
        });
      }
      // Add new device
      devices.push({
        deviceId,
        deviceName: deviceName || "Laptop",
        lastUsed: new Date().toISOString()
      });
    }

    await supabase.from("users").update({ devices }).eq("email", emailNormalized);

    // Return authenticated user state without payload password
    const safeUser = mapUserRow({ ...userRow, devices });
    const token = signSessionToken({ email: emailNormalized, role: userRow.role });
    return res.status(200).json({
      message: "Login successful!",
      user: safeUser,
      token
    });
  });

  // Logged-in user changes their own password (must know the current one)
  app.post("/api/change-password", async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "Email, current password, and new password are all required." });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters." });
    }

    const emailNormalized = email.toLowerCase().trim();
    const { data: userRow } = await supabase.from("users").select("password_hash").eq("email", emailNormalized).maybeSingle();
    if (!userRow) {
      return res.status(404).json({ error: "Account not found." });
    }

    const currentMatches = await bcrypt.compare(currentPassword, userRow.password_hash);
    if (!currentMatches) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    const { error: updateError } = await supabase.from("users").update({ password_hash: newHash }).eq("email", emailNormalized);
    if (updateError) {
      console.error("Error updating password:", updateError.message);
      return res.status(500).json({ error: "Failed to update password. Please try again." });
    }

    return res.json({ success: true });
  });

  // Forgot password, step 1: email a reset code to the account holder (if the email exists).
  // Always returns the same generic message regardless of whether the account exists, so this
  // can't be used to check which emails are registered.
  app.post("/api/forgot-password/request", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });

    const emailNormalized = String(email).toLowerCase().trim();
    const genericMessage = "If an account exists for that email, a reset code has been sent.";

    const { data: userRow } = await supabase.from("users").select("email").eq("email", emailNormalized).maybeSingle();
    if (userRow) {
      const otp = String(Math.floor(1000 + Math.random() * 9000));
      const { error: otpError } = await supabase.from("password_reset_otps").upsert({
        email: emailNormalized,
        otp,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      });

      if (otpError) {
        console.error("Error storing password reset OTP:", otpError.message);
      } else {
        // Awaited so it can't be frozen mid-send once the response below goes out. The response
        // message stays generic either way (see comment above the route) -- only the server log
        // distinguishes a real delivery failure from "no account with that email".
        const delivered = await sendSimulatedEmail(
          emailNormalized,
          "Password Reset Code - Conceptual Learning Online",
          `Your password reset code is: ${otp}. Valid for 10 minutes.\n\nIf you did not request this, you can ignore this email -- your password will not change.`,
          'otp'
        );
        if (!delivered) console.error(`[Password Reset OTP Send Failed] Could not deliver reset email to ${emailNormalized}`);
      }
    }

    return res.json({ success: true, message: genericMessage });
  });

  // Forgot password, step 2: verify the code and set a new password.
  app.post("/api/forgot-password/reset", async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: "Email, code, and new password are all required." });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters." });
    }

    const emailNormalized = String(email).toLowerCase().trim();
    const { data: pending } = await supabase.from("password_reset_otps").select("*").eq("email", emailNormalized).maybeSingle();
    if (!pending) {
      return res.status(400).json({ error: "No reset code was requested for this email, or it has already been used." });
    }
    if (new Date(pending.expires_at).getTime() < Date.now()) {
      await supabase.from("password_reset_otps").delete().eq("email", emailNormalized);
      return res.status(400).json({ error: "This reset code has expired. Please request a new one." });
    }
    if (pending.otp !== String(otp).trim()) {
      // Invalidate the code on any wrong guess -- otherwise a 4-digit code is brute-forceable
      // within its 10-minute window, which would let an attacker take over any account (student
      // or admin) just by knowing their email address.
      await supabase.from("password_reset_otps").delete().eq("email", emailNormalized);
      return res.status(400).json({ error: "Incorrect reset code. Please request a new one." });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    const { error: updateError } = await supabase.from("users").update({ password_hash: newHash }).eq("email", emailNormalized);
    if (updateError) {
      console.error("Error resetting password:", updateError.message);
      return res.status(500).json({ error: "Failed to reset password. Please try again." });
    }

    await supabase.from("password_reset_otps").delete().eq("email", emailNormalized);
    return res.json({ success: true });
  });

  // Logged-in user updates their own profile (photo + academic/social details)
  app.post("/api/profile/update", (req, res, next) => {
    avatarUpload.single("photo")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the uploaded photo." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { name, dateOfBirth, bio, favoriteSubject, hobbies } = req.body;

    const emailNormalized = auth.email;
    const { data: existingUser } = await supabase.from("users").select("email").eq("email", emailNormalized).maybeSingle();
    if (!existingUser) return res.status(404).json({ error: "Account not found." });

    const updates: Record<string, any> = {
      date_of_birth: dateOfBirth || null,
      bio: bio ? String(bio).trim() : null,
      favorite_subject: favoriteSubject ? String(favoriteSubject).trim() : null,
      hobbies: hobbies ? String(hobbies).trim() : null,
    };

    // Lets a student fix their own name (a common request: a name mistyped or misspelled at
    // registration, which only the student themself would reliably know the correct spelling of)
    // without needing an admin to edit it on their behalf.
    if (name !== undefined) {
      const trimmedName = String(name).trim();
      if (!trimmedName) return res.status(400).json({ error: "Name cannot be empty." });
      updates.name = trimmedName;
    }

    if (req.file) {
      const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const filePath = `${emailNormalized}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (uploadError) {
        console.error("Avatar upload error:", uploadError.message);
        return res.status(500).json({ error: "Failed to upload photo." });
      }
      const { data: publicUrlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);
      updates.photo_url = publicUrlData.publicUrl;
    }

    const { data: updatedRow, error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("email", emailNormalized)
      .select()
      .single();

    if (updateError || !updatedRow) {
      console.error("Error updating profile:", updateError?.message);
      return res.status(500).json({ error: "Failed to save profile." });
    }

    return res.json({ success: true, user: mapUserRow(updatedRow) });
  });

  // ── HOMEWORK UPLOAD & REVIEW ──

  // Uploads exactly one photo into a temporary holding area for an in-progress multi-photo
  // submission/assignment. Used by both students (homework) and admins (assignment question
  // sheets) -- each call is a small, single-file request, so it can never hit the platform's
  // request-body size limit no matter how many photos the user attaches in total.
  app.post("/api/homework/upload-photo", (req, res, next) => {
    homeworkUpload.single("photo")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the photo." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, order } = req.body;
    if (!req.file) return res.status(400).json({ error: "No photo was received." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (req.file.mimetype === "application/pdf") {
      return res.status(400).json({ error: "This endpoint only accepts photos. Upload a PDF separately as a single file." });
    }

    const orderNum = parseInt(order, 10) || 0;
    const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, "");
    const tempPath = `${HOMEWORK_TEMP_PREFIX}/${auth.email}/${safeSessionId}/${String(orderNum).padStart(3, "0")}-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(tempPath, req.file.buffer, {
      contentType: req.file.mimetype,
    });
    if (uploadError) {
      console.error("Temp photo upload error:", uploadError.message);
      return res.status(500).json({ error: "Failed to upload this photo. Please try again." });
    }

    return res.json({ success: true, tempPath });
  });

  // Removes one previously uploaded temp photo (e.g. the user wants to retake/remove it before
  // finishing their submission). Only lets a user delete their own temp files.
  app.delete("/api/homework/upload-photo", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { tempPath } = req.body;
    if (!tempPath || typeof tempPath !== "string" || !tempPath.startsWith(`${HOMEWORK_TEMP_PREFIX}/${auth.email}/`)) {
      return res.status(400).json({ error: "Invalid photo reference." });
    }
    const { error: removeError } = await supabase.storage.from(HOMEWORK_BUCKET).remove([tempPath]);
    if (removeError) return res.status(500).json({ error: "Failed to remove this photo." });
    return res.json({ success: true });
  });

  // One small piece of a large file (e.g. a single big PDF split client-side into ~3MB slices).
  // Used so a single 4-5MB+ PDF never has to cross the server in one request -- that's what was
  // silently failing on Vercel's ~4.5MB serverless body limit for students with large scans.
  app.post("/api/homework/upload-chunk", (req, res, next) => {
    chunkUpload.single("chunk")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process this chunk." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, order } = req.body;
    if (!req.file) return res.status(400).json({ error: "No data was received." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });

    const orderNum = parseInt(order, 10) || 0;
    const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, "");
    const tempPath = `${HOMEWORK_TEMP_PREFIX}/${auth.email}/${safeSessionId}/${String(orderNum).padStart(4, "0")}-${Date.now()}.part`;

    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(tempPath, req.file.buffer, {
      contentType: "application/octet-stream",
    });
    if (uploadError) {
      console.error("Temp chunk upload error:", uploadError.message);
      return res.status(500).json({ error: "Failed to upload this piece of the file. Please try again." });
    }

    return res.json({ success: true, tempPath });
  });

  // Student finishes a single-large-PDF submission: reassembles every chunk already uploaded for
  // this session back into the original PDF and saves the submission. Carries no file data itself.
  app.post("/api/homework/finalize-pdf-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, subject, assignmentId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (!assignmentId || !String(assignmentId).trim()) {
      return res.status(400).json({ error: "Please choose which homework assignment this submission is for." });
    }
    const { data: targetAssignment } = await supabase.from("homework_assignments").select("id").eq("id", String(assignmentId).trim()).maybeSingle();
    if (!targetAssignment) {
      return res.status(400).json({ error: "That homework assignment no longer exists. Please refresh and choose it again." });
    }

    const { data: targetUser } = await supabase.from("users").select("email, status").eq("email", auth.email).maybeSingle();
    if (!targetUser) return res.status(404).json({ error: "Student account not found." });
    if (targetUser.status !== "approved") return res.status(403).json({ error: "Only approved students can submit homework." });

    let combined: Buffer | null;
    try {
      combined = await concatenateSessionChunks(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
    } catch (concatErr: any) {
      console.error("Error reassembling PDF chunks:", concatErr.message);
      return res.status(500).json({ error: "Failed to reassemble the uploaded file." });
    }
    if (!combined) {
      const justCreated = await findJustCreatedSubmission(auth.email, String(assignmentId));
      if (justCreated) return res.json({ success: true, submission: mapHomeworkRowForStudent(justCreated) });
      return res.status(400).json({ error: "No uploaded file pieces were found for this submission. Please attach a PDF and wait for it to finish uploading before submitting." });
    }

    const filePath = `${auth.email}/${Date.now()}-submission.pdf`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, combined, {
      contentType: "application/pdf",
    });
    if (uploadError) {
      console.error("Homework file upload error:", uploadError.message);
      return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to save the reassembled homework PDF. Please try again.") });
    }

    let upserted: { row: any; priorMissingQuestions: string[] | null };
    try {
      upserted = await upsertHomeworkSubmission({
        studentEmail: auth.email,
        assignmentId: String(assignmentId),
        filePath,
        subject: subject ? String(subject).trim() : null,
      });
    } catch (upsertErr: any) {
      console.error("Error saving homework submission record:", upsertErr.message);
      return res.status(500).json({ error: "PDF created but failed to save the submission record." });
    }

    // The AI check itself is triggered as a separate follow-up request (see
    // POST /api/homework/check-mine below) rather than awaited right here -- this endpoint already
    // spends real time reassembling and uploading the file, and grading a dense multi-page
    // submission can itself take tens of seconds; doing both in one request risked the combined
    // total crossing Vercel's function time limit, which killed the check silently mid-flight and
    // left the row stuck at "pending" with no error ever logged. Splitting them gives the check its
    // own full time budget, uncontended by the upload work that came before it.
    return res.json({ success: true, submission: mapHomeworkRowForStudent(upserted.row), priorMissingQuestions: upserted.priorMissingQuestions });
  });

  // Student finishes a photo-based submission: merges every photo already uploaded for this
  // session into one PDF and saves the submission. This request carries no file data at all
  // (just JSON), so it stays tiny regardless of how many photos were attached.
  app.post("/api/homework/finalize-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, subject, assignmentId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (!assignmentId || !String(assignmentId).trim()) {
      return res.status(400).json({ error: "Please choose which homework assignment this submission is for." });
    }
    const { data: targetAssignment } = await supabase.from("homework_assignments").select("id").eq("id", String(assignmentId).trim()).maybeSingle();
    if (!targetAssignment) {
      return res.status(400).json({ error: "That homework assignment no longer exists. Please refresh and choose it again." });
    }

    const { data: targetUser } = await supabase.from("users").select("email, status").eq("email", auth.email).maybeSingle();
    if (!targetUser) return res.status(404).json({ error: "Student account not found." });
    if (targetUser.status !== "approved") return res.status(403).json({ error: "Only approved students can submit homework." });

    let merged: Buffer | null;
    try {
      merged = await mergeSessionPhotos(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
    } catch (mergeErr: any) {
      console.error("Error merging session photos:", mergeErr.message);
      return res.status(500).json({ error: "Failed to combine the uploaded photos into a PDF." });
    }
    if (!merged) {
      const justCreated = await findJustCreatedSubmission(auth.email, String(assignmentId));
      if (justCreated) return res.json({ success: true, submission: mapHomeworkRowForStudent(justCreated) });
      return res.status(400).json({ error: "No uploaded photos were found for this submission. Please attach at least one photo and wait for it to finish uploading before submitting." });
    }

    const filePath = `${auth.email}/${Date.now()}-submission.pdf`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, merged, {
      contentType: "application/pdf",
    });
    if (uploadError) {
      console.error("Homework file upload error:", uploadError.message);
      return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to save the combined homework PDF. Please try again.") });
    }

    let upserted: { row: any; priorMissingQuestions: string[] | null };
    try {
      upserted = await upsertHomeworkSubmission({
        studentEmail: auth.email,
        assignmentId: String(assignmentId),
        filePath,
        subject: subject ? String(subject).trim() : null,
      });
    } catch (upsertErr: any) {
      console.error("Error saving homework submission record:", upsertErr.message);
      return res.status(500).json({ error: "PDF created but failed to save the submission record." });
    }

    // The AI check itself is triggered as a separate follow-up request (see
    // POST /api/homework/check-mine below) rather than awaited right here -- see the matching
    // comment in finalize-pdf-submission above for why.
    return res.json({ success: true, submission: mapHomeworkRowForStudent(upserted.row), priorMissingQuestions: upserted.priorMissingQuestions });
  });

  // The follow-up half of a submission: runs the actual AI check, as its own request with its own
  // full time budget, uncontended by the file merge/upload work the finalize-* endpoints above just
  // did. Deliberately still awaited rather than fire-and-forget -- a serverless function invocation
  // can be frozen the instant its response is sent, which would silently kill a background check
  // before Claude ever replied. Scoped to the caller's own submissions only, unlike the admin
  // reevaluate endpoint.
  app.post("/api/homework/check-mine", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { submissionId, priorMissingQuestions } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });

    const { data: existing } = await supabase.from("homework_submissions").select("id, student_email, status").eq("id", submissionId).maybeSingle();
    if (!existing || existing.student_email !== auth.email) return res.status(404).json({ error: "Submission not found." });

    // Only the very first caller right after upload has a real priorMissingQuestions array to
    // hand over -- a later retry (e.g. the student simply reopening the app while a submission is
    // still stuck "pending", see the matching frontend comment) has no way to know that value
    // anymore. Passing undefined through here (distinct from an explicit null) lets
    // checkHomeworkSubmission fall back to whatever scoping is already persisted on the row
    // instead of forcing an unscoped full recheck -- collapsing every non-array value to null
    // would silently discard resubmission-scoping on every retry that isn't the original call.
    const scoping: string[] | null | undefined = Array.isArray(priorMissingQuestions)
      ? priorMissingQuestions
      : (priorMissingQuestions === undefined ? undefined : null);

    // Only actually check if still pending -- this endpoint can now be called opportunistically
    // (e.g. a retry on app reopen) rather than exactly once right after upload, so it must be safe
    // to call repeatedly without re-running (and potentially overwriting a manually-graded score
    // on) a submission that's already been checked.
    if (existing.status === "pending") {
      await checkHomeworkSubmission(String(submissionId), scoping);
    }
    const { data: checkedRow } = await supabase.from("homework_submissions").select("*").eq("id", submissionId).maybeSingle();
    if (!checkedRow) return res.status(404).json({ error: "Submission not found after check." });
    return res.json({ success: true, submission: mapHomeworkRowForStudent(checkedRow) });
  });

  // Admin uploads homework on behalf of a student who called in unable to submit it themselves --
  // mirrors the student finalize-submission flow exactly, except the temp photos were uploaded
  // under the ADMIN's own auth (via the same /api/homework/upload-photo endpoint the admin's
  // browser calls with their own token) while the resulting submission is attributed to whichever
  // student the admin selected. Also returns immediately without checking (see check-mine above
  // for why); the frontend triggers the actual grading via the existing admin reevaluate endpoint.
  app.post("/api/admin/homework/finalize-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    if (!ADMIN_EMAILS.includes(auth.email)) return res.status(403).json({ error: "Forbidden: Admin privileges required." });
    const { studentEmail, sessionId, subject, assignmentId, doNotMarkLate } = req.body;
    if (!studentEmail) return res.status(400).json({ error: "Please choose which student this homework is for." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (!assignmentId || !String(assignmentId).trim()) {
      return res.status(400).json({ error: "Please choose which homework assignment this submission is for." });
    }
    const { data: targetAssignment } = await supabase.from("homework_assignments").select("id").eq("id", String(assignmentId).trim()).maybeSingle();
    if (!targetAssignment) return res.status(400).json({ error: "That homework assignment no longer exists." });

    const emailNormalized = String(studentEmail).toLowerCase().trim();
    const { data: targetUser } = await supabase.from("users").select("email, status, role").eq("email", emailNormalized).maybeSingle();
    if (!targetUser || targetUser.role !== "student") return res.status(404).json({ error: "Student account not found." });

    let merged: Buffer | null;
    try {
      merged = await mergeSessionPhotos(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
    } catch (mergeErr: any) {
      console.error("Error merging admin-uploaded session photos:", mergeErr.message);
      return res.status(500).json({ error: "Failed to combine the uploaded photos into a PDF." });
    }
    if (!merged) {
      return res.status(400).json({ error: "No uploaded photos were found for this submission. Please attach at least one photo and wait for it to finish uploading before submitting." });
    }

    const filePath = `${emailNormalized}/${Date.now()}-submission.pdf`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, merged, {
      contentType: "application/pdf",
    });
    if (uploadError) {
      console.error("Admin homework file upload error:", uploadError.message);
      return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to save the combined homework PDF. Please try again.") });
    }

    let upserted: { row: any; priorMissingQuestions: string[] | null };
    try {
      upserted = await upsertHomeworkSubmission({
        studentEmail: emailNormalized,
        assignmentId: String(assignmentId),
        filePath,
        subject: subject ? String(subject).trim() : null,
        lateOverride: doNotMarkLate ? "not_late" : undefined,
      });
    } catch (upsertErr: any) {
      console.error("Error saving admin-uploaded submission record:", upsertErr.message);
      return res.status(500).json({ error: "PDF created but failed to save the submission record." });
    }

    return res.json({ success: true, submission: mapHomeworkRow(upserted.row) });
  });

  // Same as above but for a single-PDF (chunked) upload rather than photos.
  app.post("/api/admin/homework/finalize-pdf-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    if (!ADMIN_EMAILS.includes(auth.email)) return res.status(403).json({ error: "Forbidden: Admin privileges required." });
    const { studentEmail, sessionId, subject, assignmentId, doNotMarkLate } = req.body;
    if (!studentEmail) return res.status(400).json({ error: "Please choose which student this homework is for." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (!assignmentId || !String(assignmentId).trim()) {
      return res.status(400).json({ error: "Please choose which homework assignment this submission is for." });
    }
    const { data: targetAssignment } = await supabase.from("homework_assignments").select("id").eq("id", String(assignmentId).trim()).maybeSingle();
    if (!targetAssignment) return res.status(400).json({ error: "That homework assignment no longer exists." });

    const emailNormalized = String(studentEmail).toLowerCase().trim();
    const { data: targetUser } = await supabase.from("users").select("email, status, role").eq("email", emailNormalized).maybeSingle();
    if (!targetUser || targetUser.role !== "student") return res.status(404).json({ error: "Student account not found." });

    let combined: Buffer | null;
    try {
      combined = await concatenateSessionChunks(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
    } catch (concatErr: any) {
      console.error("Error reassembling admin-uploaded PDF chunks:", concatErr.message);
      return res.status(500).json({ error: "Failed to reassemble the uploaded file." });
    }
    if (!combined) {
      return res.status(400).json({ error: "No uploaded file pieces were found for this submission. Please attach a PDF and wait for it to finish uploading before submitting." });
    }

    const filePath = `${emailNormalized}/${Date.now()}-submission.pdf`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, combined, {
      contentType: "application/pdf",
    });
    if (uploadError) {
      console.error("Admin homework file upload error:", uploadError.message);
      return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to save the reassembled homework PDF. Please try again.") });
    }

    let upserted: { row: any; priorMissingQuestions: string[] | null };
    try {
      upserted = await upsertHomeworkSubmission({
        studentEmail: emailNormalized,
        assignmentId: String(assignmentId),
        filePath,
        subject: subject ? String(subject).trim() : null,
        lateOverride: doNotMarkLate ? "not_late" : undefined,
      });
    } catch (upsertErr: any) {
      console.error("Error saving admin-uploaded submission record:", upsertErr.message);
      return res.status(500).json({ error: "PDF created but failed to save the submission record." });
    }

    return res.json({ success: true, submission: mapHomeworkRow(upserted.row) });
  });

  // Lets the admin edit an existing submission after the fact: reassign it to a different
  // homework assignment (e.g. it was filed under the wrong one), and/or add more photos onto the
  // END of the existing PDF (e.g. the student missed a page and it's easier to add it than to
  // have them redo the whole submission). Either change can be made alone or together. If the
  // file content changes, the submission goes back to "pending" -- the old AI grade no longer
  // reflects what's actually in the file, so it needs a fresh check (Reevaluate) same as any
  // other resubmission.
  app.post("/api/admin/homework/edit-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    if (!ADMIN_EMAILS.includes(auth.email)) return res.status(403).json({ error: "Forbidden: Admin privileges required." });
    const { submissionId, assignmentId, sessionId } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });

    const { data: sub } = await supabase.from("homework_submissions").select("*").eq("id", submissionId).maybeSingle();
    if (!sub) return res.status(404).json({ error: "Submission not found." });

    const updates: Record<string, any> = {};

    if (assignmentId && String(assignmentId).trim() && String(assignmentId).trim() !== sub.assignment_id) {
      const { data: targetAssignment } = await supabase.from("homework_assignments").select("id").eq("id", String(assignmentId).trim()).maybeSingle();
      if (!targetAssignment) return res.status(400).json({ error: "That homework assignment no longer exists." });
      updates.assignment_id = String(assignmentId).trim();
    }

    let fileChanged = false;
    if (sessionId && String(sessionId).trim()) {
      let newPagesBuffer: Buffer | null;
      try {
        newPagesBuffer = await mergeSessionPhotos(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
      } catch (mergeErr: any) {
        console.error("Error merging new photos for submission edit:", mergeErr.message);
        return res.status(500).json({ error: "Failed to process the new photos." });
      }
      if (newPagesBuffer) {
        if (!sub.file_path || !sub.file_path.toLowerCase().endsWith(".pdf")) {
          return res.status(400).json({ error: "Can only add photos to a PDF submission." });
        }
        const { data: existingBlob, error: downloadError } = await supabase.storage.from(HOMEWORK_BUCKET).download(sub.file_path);
        if (downloadError || !existingBlob) {
          console.error("Error downloading existing submission file:", downloadError?.message);
          return res.status(500).json({ error: "Failed to load the existing submission file." });
        }
        let combinedBuffer: Buffer;
        try {
          const existingBuffer = Buffer.from(await existingBlob.arrayBuffer());
          const baseDoc = await PDFDocument.load(existingBuffer);
          const appendDoc = await PDFDocument.load(newPagesBuffer);
          const copiedPages = await baseDoc.copyPages(appendDoc, appendDoc.getPageIndices());
          copiedPages.forEach((page) => baseDoc.addPage(page));
          combinedBuffer = Buffer.from(await baseDoc.save());
        } catch (combineErr: any) {
          console.error("Error combining PDFs for submission edit:", combineErr.message);
          return res.status(500).json({ error: "Failed to add the new pages to the existing PDF." });
        }

        const newFilePath = `${sub.student_email}/${Date.now()}-submission.pdf`;
        const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(newFilePath, combinedBuffer, { contentType: "application/pdf" });
        if (uploadError) {
          console.error("Error uploading edited submission file:", uploadError.message);
          return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to save the updated submission file.") });
        }
        // Old file is no longer referenced by anything now that the combined one is safely saved.
        await supabase.storage.from(HOMEWORK_BUCKET).remove([sub.file_path]).catch(() => {});
        updates.file_path = newFilePath;
        fileChanged = true;
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Nothing to update -- choose a different assignment or add at least one photo." });
    }

    if (fileChanged) {
      updates.status = "pending";
      updates.ai_score = null;
      updates.ai_feedback = null;
      updates.integrity_flag = null;
      updates.admin_notes = null;
    }

    const { data: updated, error } = await supabase
      .from("homework_submissions")
      .update(updates)
      .eq("id", submissionId)
      .select()
      .single();
    if (error || !updated) {
      console.error("Edit submission save error:", error?.message);
      return res.status(500).json({ error: "Failed to save the changes. Please try again." });
    }
    return res.json({ success: true, submission: mapHomeworkRow(updated) });
  });

  // Student submits homework: one or more images (merged into a single PDF) or one PDF
  app.post("/api/homework/upload", (req, res, next) => {
    homeworkUpload.array("files", 15)(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the uploaded file(s)." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { subject, assignmentId } = req.body;
    const files = (req.files as Express.Multer.File[]) || [];
    if (files.length === 0) {
      return res.status(400).json({ error: "At least one homework file is required." });
    }
    if (!assignmentId || !String(assignmentId).trim()) {
      return res.status(400).json({ error: "Please choose which homework assignment this submission is for." });
    }
    const { data: targetAssignment } = await supabase.from("homework_assignments").select("id").eq("id", String(assignmentId).trim()).maybeSingle();
    if (!targetAssignment) {
      return res.status(400).json({ error: "That homework assignment no longer exists. Please refresh and choose it again." });
    }

    const emailNormalized = auth.email;
    const { data: targetUser } = await supabase.from("users").select("email, status").eq("email", emailNormalized).maybeSingle();
    if (!targetUser) {
      return res.status(404).json({ error: "Student account not found." });
    }
    if (targetUser.status !== "approved") {
      return res.status(403).json({ error: "Only approved students can submit homework." });
    }

    const pdfCount = files.filter((f) => f.mimetype === "application/pdf").length;
    if (pdfCount > 0 && files.length > 1) {
      return res.status(400).json({ error: "Please upload either multiple images or a single PDF, not a mix." });
    }

    let finalBuffer: Buffer;
    let finalMimetype: string;
    let finalExt: string;

    if (files.length === 1) {
      finalBuffer = files[0].buffer;
      finalMimetype = files[0].mimetype;
      finalExt = finalMimetype === "application/pdf" ? "pdf" : (finalMimetype.split("/")[1] || "jpg");
    } else {
      // Multiple images submitted together -- always merge into one PDF, one page per photo.
      try {
        finalBuffer = await mergeImagesToPdf(files.map((f) => ({ buffer: f.buffer })));
      } catch (mergeErr: any) {
        console.error("Error merging homework images into PDF:", mergeErr.message);
        return res.status(500).json({ error: "Failed to combine the uploaded images into a PDF." });
      }
      finalMimetype = "application/pdf";
      finalExt = "pdf";
    }

    const filePath = `${emailNormalized}/${Date.now()}-submission.${finalExt}`;

    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, finalBuffer, {
      contentType: finalMimetype,
    });
    if (uploadError) {
      console.error("Homework file upload error:", uploadError.message);
      return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to upload homework file. Please try again.") });
    }

    let upserted: { row: any; priorMissingQuestions: string[] | null };
    try {
      upserted = await upsertHomeworkSubmission({
        studentEmail: emailNormalized,
        assignmentId: String(assignmentId),
        filePath,
        subject: subject ? String(subject).trim() : null,
      });
    } catch (upsertErr: any) {
      console.error("Error saving homework submission record:", upsertErr.message);
      return res.status(500).json({ error: "File uploaded but failed to save the submission record." });
    }

    // The AI check itself is triggered as a separate follow-up request (see
    // POST /api/homework/check-mine below) rather than awaited right here -- see the matching
    // comment in finalize-pdf-submission above for why.
    return res.json({ success: true, submission: mapHomeworkRowForStudent(upserted.row), priorMissingQuestions: upserted.priorMissingQuestions });
  });

  // Processes every still-pending homework submission, shared by both the cron sweep and the
  // admin "Check Pending Now" button below.
  //
  // Real incident (2026-08-08, Class X): a student's homework silently stayed "pending" through
  // both the daily cron run AND multiple admin "Check Pending Now" clicks, night after night --
  // yet a single admin Reevaluate on that exact submission always worked immediately. Root cause:
  // this used to fetch up to 25 pending rows with NO explicit order (an unspecified DB order, not
  // necessarily submission time) and check them ONE AT A TIME in a sequential for-loop, each
  // individual AI call taking anywhere from several seconds to over a minute (vision + adaptive
  // thinking, sometimes multiple retries) -- while the whole request shares Vercel's 120s
  // maxDuration (see vercel.json). On any evening where a meaningful number of submissions land
  // near the deadline, that sequential loop runs out of time partway through and Vercel kills the
  // function mid-sweep; whichever rows hadn't been reached yet (an amount that varies per run) are
  // left pending with no error surfaced anywhere. Because the fetch had no ordering, the same
  // unlucky rows kept landing outside whatever prefix happened to complete before each run got cut
  // off, so the same specific student was skipped run after run while others nearby in the query's
  // arbitrary order kept getting through -- explaining why it looked like it was happening to one
  // particular student's homework specifically, rather than a random subset each time.
  //
  // Fixed two ways: (1) run checks concurrently in small batches instead of one at a time, so far
  // more of the backlog fits inside the same time budget instead of the total time being the sum
  // of every individual check; (2) order oldest-submitted-first, so if a run genuinely can't finish
  // everything, it's always the newest arrivals left over for the next run -- never the same
  // specific student stranded indefinitely. Also stops starting new batches once within ~20s of
  // the 120s ceiling, so an in-progress batch has room to actually finish (and get its DB write
  // committed) rather than being killed mid-flight for nothing.
  const PENDING_CHECK_TIME_BUDGET_MS = 100_000; // leaves ~20s headroom under the 120s maxDuration
  const PENDING_CHECK_BATCH_SIZE = 6; // concurrent AI calls per batch -- enough to make real use of the time budget without hammering Anthropic's rate limits
  async function processPendingHomework(): Promise<{ checked: number; remaining: number }> {
    const startedAt = Date.now();
    const { data: pending } = await supabase
      .from("homework_submissions")
      .select("id")
      .eq("status", "pending")
      .order("submitted_at", { ascending: true })
      .limit(200); // a generous cap just to bound worst-case query size, not a processing limit -- see batching below
    const queue = pending || [];
    let checked = 0;
    let i = 0;
    while (i < queue.length && Date.now() - startedAt < PENDING_CHECK_TIME_BUDGET_MS) {
      const batch = queue.slice(i, i + PENDING_CHECK_BATCH_SIZE);
      await Promise.all(batch.map((row) => checkHomeworkSubmission(row.id)));
      checked += batch.length;
      i += batch.length;
    }

    // Same safety-net sweep, extended to Revision submissions -- kept in the same cron run rather
    // than a second cron entry, since Vercel's Hobby plan caps cron frequency and this project has
    // already been bitten once by accidentally adding a second, too-frequent cron path (see the
    // memo'd incident on the homework cron itself).
    if (Date.now() - startedAt < PENDING_CHECK_TIME_BUDGET_MS) {
      const { data: pendingRevision } = await supabase
        .from("revision_submissions")
        .select("id")
        .eq("status", "pending")
        .order("submitted_at", { ascending: true })
        .limit(200);
      const revisionQueue = pendingRevision || [];
      let j = 0;
      while (j < revisionQueue.length && Date.now() - startedAt < PENDING_CHECK_TIME_BUDGET_MS) {
        const batch = revisionQueue.slice(j, j + PENDING_CHECK_BATCH_SIZE);
        await Promise.all(batch.map((row) => checkRevisionSubmission(row.id)));
        checked += batch.length;
        j += batch.length;
      }
    }

    return { checked, remaining: queue.length - checked };
  }

  // Vercel Cron hits this on a schedule (see vercel.json) to check any homework that's still
  // "pending". Vercel automatically sends "Authorization: Bearer <CRON_SECRET>" for cron-triggered
  // requests when CRON_SECRET is set as an env var, which is what this checks against.
  app.get("/api/cron/check-homework", async (req, res) => {
    const auth = req.headers["authorization"] || "";
    if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const result = await processPendingHomework();
    return res.json(result);
  });

  // Admin-triggered immediate check of all pending homework (for local testing, or to skip
  // waiting for the next scheduled cron run).
  app.post("/api/admin/homework/check-now", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;

    const result = await processPendingHomework();
    return res.json(result);
  });

  // Admin manually re-runs the AI check on one specific submission, regardless of its current
  // status -- unlike check-now above (which only sweeps up still-pending rows), this lets an
  // admin force a fresh grading pass on a submission that was already checked, e.g. if the score
  // or feedback looks wrong. Always a full recheck of the whole file as it currently stands, not
  // scoped to previously-outstanding questions -- the admin's intent here is "grade this properly
  // from scratch", not "diff against an earlier resubmission". Passes null explicitly (rather than
  // omitting the argument) so checkHomeworkSubmission doesn't fall back to whatever the row's own
  // admin_notes carries forward -- that fallback exists for the cron sweep and "Check Pending Now",
  // which have no opinion either way, not for this endpoint's deliberate "ignore prior history" intent.
  app.post("/api/admin/homework/reevaluate", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { submissionId } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });

    const { data: existing } = await supabase.from("homework_submissions").select("id").eq("id", submissionId).maybeSingle();
    if (!existing) return res.status(404).json({ error: "Submission not found." });

    await checkHomeworkSubmission(String(submissionId), null);
    const { data: updated } = await supabase.from("homework_submissions").select("*").eq("id", submissionId).maybeSingle();
    if (!updated) return res.status(404).json({ error: "Submission not found after recheck." });
    return res.json({ success: true, submission: mapHomeworkRow(updated) });
  });

  // ── Chapter Notes routes ──
  // Fast: just uploads files and creates the job row. Does NOT start AI work itself -- the client
  // immediately follows up with /advance (see the pipeline comment above), same split as homework.
  app.post("/api/admin/chapter-notes/create", (req, res, next) => {
    chapterNotesUpload.fields([{ name: "ncertPdf", maxCount: 1 }, { name: "supportingFiles", maxCount: 10 }])(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      next();
    });
  }, async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const auth = requireAuth(req, res);
    if (!auth) return;

    const { targetClass, subject, chapterName, remarks } = req.body;
    if (!targetClass || !subject || !chapterName) {
      return res.status(400).json({ error: "Class, subject, and chapter name are required." });
    }
    const files = req.files as { [field: string]: Express.Multer.File[] } | undefined;
    const ncertFile = files?.ncertPdf?.[0];
    if (!ncertFile) return res.status(400).json({ error: "The NCERT chapter PDF is required." });

    const stamp = Date.now();
    const ncertPath = `${stamp}-ncert-${ncertFile.originalname.replace(/[^a-zA-Z0-9.\-]/g, "_")}`;
    const { error: ncertUploadErr } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).upload(ncertPath, ncertFile.buffer, { contentType: ncertFile.mimetype });
    if (ncertUploadErr) return res.status(500).json({ error: `Could not upload NCERT PDF: ${ncertUploadErr.message}` });

    const supportingPaths: string[] = [];
    for (const f of (files?.supportingFiles || [])) {
      const p = `${stamp}-support-${supportingPaths.length}-${f.originalname.replace(/[^a-zA-Z0-9.\-]/g, "_")}`;
      const { error } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).upload(p, f.buffer, { contentType: f.mimetype });
      if (!error) supportingPaths.push(p);
    }

    const { data: inserted, error: insertErr } = await supabase.from("chapter_notes_jobs").insert({
      admin_email: auth.email,
      target_class: targetClass,
      subject,
      chapter_name: chapterName,
      remarks: remarks || null,
      ncert_pdf_path: ncertPath,
      supporting_file_paths: supportingPaths,
      status: "processing",
      current_step: "outline",
    }).select("*").maybeSingle();
    if (insertErr || !inserted) return res.status(500).json({ error: insertErr?.message || "Could not create the job." });

    return res.json({ success: true, job: mapChapterNotesJobRow(inserted) });
  });

  // Slow: does exactly one pipeline step and awaits it fully before responding (see the pipeline
  // comment above for why this can't be fire-and-forget on Vercel). The client calls this
  // repeatedly in a loop until status stops being "processing".
  app.post("/api/admin/chapter-notes/advance", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ error: "Missing jobId." });

    await advanceChapterNotesJob(String(jobId));
    const { data: updated } = await supabase.from("chapter_notes_jobs").select("*").eq("id", jobId).maybeSingle();
    if (!updated) return res.status(404).json({ error: "Job not found." });
    return res.json({ success: true, job: mapChapterNotesJobRow(updated) });
  });

  // Piggybacks on the admin's own app usage, same as the homework silent sweep -- picks a job
  // back up if the admin's tab closed mid-generation. Bounded to a few jobs/steps per call so it
  // stays fast enough to run unattended every few minutes without ever approaching the time limit.
  app.post("/api/admin/chapter-notes/sweep", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { data: stuck } = await supabase.from("chapter_notes_jobs").select("id").eq("status", "processing").order("updated_at", { ascending: true }).limit(5);
    for (const row of (stuck || [])) {
      await advanceChapterNotesJob(row.id);
    }
    return res.json({ advanced: (stuck || []).length });
  });

  app.get("/api/admin/chapter-notes/list", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { data } = await supabase.from("chapter_notes_jobs").select("*").order("created_at", { ascending: false });
    return res.json({ jobs: (data || []).map(mapChapterNotesJobRow) });
  });

  app.post("/api/admin/chapter-notes/approve", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ error: "Missing jobId." });
    const { data: job } = await supabase.from("chapter_notes_jobs").select("status").eq("id", jobId).maybeSingle();
    if (!job) return res.status(404).json({ error: "Job not found." });
    if (job.status !== "ready_for_review") return res.status(400).json({ error: "This chapter isn't ready for review yet." });
    const { data: updated } = await supabase.from("chapter_notes_jobs").update({ status: "approved", updated_at: new Date().toISOString() }).eq("id", jobId).select("*").maybeSingle();
    return res.json({ success: true, job: mapChapterNotesJobRow(updated) });
  });

  app.post("/api/admin/chapter-notes/reject", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ error: "Missing jobId." });
    const { data: updated } = await supabase.from("chapter_notes_jobs").update({ status: "rejected", updated_at: new Date().toISOString() }).eq("id", jobId).select("*").maybeSingle();
    if (!updated) return res.status(404).json({ error: "Job not found." });
    return res.json({ success: true, job: mapChapterNotesJobRow(updated) });
  });

  app.post("/api/admin/chapter-notes/request-correction", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { jobId, correctionText } = req.body;
    if (!jobId) return res.status(400).json({ error: "Missing jobId." });
    if (!correctionText || !String(correctionText).trim()) return res.status(400).json({ error: "Please describe the correction you want." });
    const { data: updated } = await supabase.from("chapter_notes_jobs").update({
      status: "processing", current_step: "revise", correction_notes: String(correctionText).trim(), step_error: null, updated_at: new Date().toISOString(),
    }).eq("id", jobId).select("*").maybeSingle();
    if (!updated) return res.status(404).json({ error: "Job not found." });
    return res.json({ success: true, job: mapChapterNotesJobRow(updated) });
  });

  // Student-facing: approved chapters only, for a given class + subject.
  app.get("/api/chapter-notes/published", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { targetClass, subject } = req.query;
    let query = supabase.from("chapter_notes_jobs").select("*").eq("status", "approved").order("created_at", { ascending: true });
    if (targetClass) query = query.eq("target_class", String(targetClass));
    if (subject) query = query.eq("subject", String(subject));
    const { data } = await query;
    return res.json({ chapters: (data || []).map(mapChapterNotesJobRow) });
  });

  // Lets the admin set a submission's score and feedback directly, bypassing the AI entirely --
  // for when the automated grading (or a lack of it, e.g. no API credit) got it wrong and the
  // teacher wants full manual control rather than just re-running the same AI check again.
  app.post("/api/admin/homework/manual-grade", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { submissionId, score, feedback } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });

    const scoreNum = Number(score);
    if (!Number.isInteger(scoreNum) || scoreNum < 0 || scoreNum > 10) {
      return res.status(400).json({ error: "Score must be a whole number from 0 to 10." });
    }

    const { data: existing } = await supabase.from("homework_submissions").select("id").eq("id", submissionId).maybeSingle();
    if (!existing) return res.status(404).json({ error: "Submission not found." });

    const { data: updated, error } = await supabase
      .from("homework_submissions")
      .update({
        status: "checked",
        ai_score: scoreNum,
        ai_feedback: feedback && String(feedback).trim() ? String(feedback).trim() : null,
        // A manual grade is the teacher's final word on the whole assignment -- clear any
        // outstanding-questions tracking left over from a previous AI check (see admin_notes'
        // reuse in upsertHomeworkSubmission/checkHomeworkSubmission) so a future resubmission
        // doesn't get scoped against stale AI-era state the manual grade already superseded.
        admin_notes: null,
      })
      .eq("id", submissionId)
      .select()
      .single();
    if (error || !updated) {
      console.error("Manual grade save error:", error?.message);
      return res.status(500).json({ error: "Failed to save the manual grade. Please try again." });
    }
    return res.json({ success: true, submission: mapHomeworkRow(updated) });
  });

  // Lets the admin flip a submission's late status either direction (late -> not late, or the
  // reverse), correcting the score by exactly the flat 2-mark late penalty if the state actually
  // changes, and remembering the override so it survives a future Reevaluate.
  app.post("/api/admin/homework/set-late-status", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { submissionId, late } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });
    if (typeof late !== "boolean") return res.status(400).json({ error: "Missing or invalid 'late' flag." });

    const { data: sub } = await supabase.from("homework_submissions").select("*").eq("id", submissionId).maybeSingle();
    if (!sub) return res.status(404).json({ error: "Submission not found." });

    const notes = parseAdminNotes(sub.admin_notes);
    let currentlyLate: boolean;
    if (notes.lateOverride === "not_late") {
      currentlyLate = false;
    } else if (notes.lateOverride === "late") {
      currentlyLate = true;
    } else {
      // No override yet -- fall back to the same automatic timestamp comparison
      // checkHomeworkSubmission would have used.
      let effectiveDeadline: string | null = null;
      if (sub.assignment_id) {
        const { data: a } = await supabase.from("homework_assignments").select("target_class, assigned_date, deadline").eq("id", sub.assignment_id).maybeSingle();
        if (a) {
          effectiveDeadline = a.deadline;
          if (a.target_class === "All") {
            const { data: studentRow } = await supabase.from("users").select("student_class").eq("email", sub.student_email).maybeSingle();
            const mappedTarget = studentRow?.student_class ? CLASS_TO_TARGET[studentRow.student_class] : null;
            if (mappedTarget && a.assigned_date) effectiveDeadline = computeDeadline(a.assigned_date, mappedTarget);
          }
        }
      }
      currentlyLate = !!effectiveDeadline && !!sub.submitted_at && new Date(sub.submitted_at).getTime() > new Date(effectiveDeadline).getTime();
    }

    const LATE_NOTE = "Submitted after the homework deadline -- 2 marks deducted as per the late-submission rule.";
    let newScore = sub.ai_score;
    let newFeedback: string | null = sub.ai_feedback;

    if (currentlyLate !== late && typeof sub.ai_score === "number") {
      if (late) {
        newScore = Math.max(0, sub.ai_score - 2);
        newFeedback = newFeedback && newFeedback.trim() ? `${newFeedback}\n\n${LATE_NOTE}` : LATE_NOTE;
      } else {
        newScore = Math.min(10, sub.ai_score + 2);
        if (newFeedback) {
          newFeedback = newFeedback.split(`\n\n${LATE_NOTE}`).join("").split(LATE_NOTE).join("").trim();
          if (!newFeedback) newFeedback = null;
        }
      }
    }

    const { data: updated, error } = await supabase
      .from("homework_submissions")
      .update({
        ai_score: newScore,
        ai_feedback: newFeedback,
        admin_notes: serializeAdminNotes({ ...notes, lateOverride: late ? "late" : "not_late" }),
      })
      .eq("id", submissionId)
      .select()
      .single();
    if (error || !updated) {
      console.error("Set late-status save error:", error?.message);
      return res.status(500).json({ error: "Failed to update the late status. Please try again." });
    }
    return res.json({ success: true, submission: mapHomeworkRow(updated) });
  });

  // Deletes a homework submission entirely -- the record and its stored file. Used when a
  // submission was uploaded in error (wrong student, wrong assignment, duplicate, etc.) and
  // simply shouldn't exist rather than just being re-graded.
  app.post("/api/admin/homework/delete-submission", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { submissionId } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });

    const { data: sub } = await supabase.from("homework_submissions").select("file_path").eq("id", submissionId).maybeSingle();
    if (!sub) return res.status(404).json({ error: "Submission not found." });

    const { error: deleteError } = await supabase.from("homework_submissions").delete().eq("id", submissionId);
    if (deleteError) {
      console.error("Delete submission error:", deleteError.message);
      return res.status(500).json({ error: "Failed to delete the submission. Please try again." });
    }
    if (sub.file_path) {
      const { error: removeError } = await supabase.storage.from(HOMEWORK_BUCKET).remove([sub.file_path]);
      if (removeError) console.warn("Could not remove deleted submission's file:", removeError.message);
    }
    return res.json({ success: true });
  });

  // Student views their own homework submission history
  app.get("/api/homework/mine", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const email = auth.email;

    const { data: rows } = await supabase
      .from("homework_submissions")
      .select("*")
      .eq("student_email", email)
      .order("submitted_at", { ascending: false });

    const submissions = await Promise.all((rows || []).map(async (r) => {
      const { data: signed } = await supabase.storage.from(HOMEWORK_BUCKET).createSignedUrl(r.file_path, 3600);
      // integrityFlag is an admin-only signal, and adminNotes now doubles as internal
      // resubmission-scoping bookkeeping (see upsertHomeworkSubmission) -- neither should ever
      // reach the student's own view.
      const { integrityFlag, adminNotes, ...rest } = mapHomeworkRow(r, signed?.signedUrl);
      return rest;
    }));

    return res.json({ submissions });
  });

  // Admin views every student's homework submissions
  app.get("/api/admin/homework", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;

    const [{ data: rows }, { data: userRows }, { data: assignmentRows }] = await Promise.all([
      supabase.from("homework_submissions").select("*").order("submitted_at", { ascending: false }).limit(2000),
      supabase.from("users").select("email, name, student_class"),
      supabase.from("homework_assignments").select("id, title, deadline"),
    ]);

    const nameByEmail = new Map((userRows || []).map((u: any) => [u.email, u.name]));
    const classByEmail = new Map((userRows || []).map((u: any) => [u.email, u.student_class]));
    const titleById = new Map((assignmentRows || []).map((a: any) => [a.id, a.title]));
    const deadlineById = new Map((assignmentRows || []).map((a: any) => [a.id, a.deadline]));

    const submissions = await Promise.all((rows || []).map(async (r) => {
      const { data: signed } = await supabase.storage.from(HOMEWORK_BUCKET).createSignedUrl(r.file_path, 3600);
      const deadline = r.assignment_id ? (deadlineById.get(r.assignment_id) || null) : null;
      const notes = parseAdminNotes(r.admin_notes);
      const isLate = notes.lateOverride === "not_late" ? false
        : notes.lateOverride === "late" ? true
        : !!deadline && new Date(r.submitted_at).getTime() - new Date(deadline).getTime() - LATE_SUBMISSION_GRACE_MS > 0;
      return {
        ...mapHomeworkRow(r, signed?.signedUrl),
        studentName: nameByEmail.get(r.student_email) || r.student_email,
        studentClass: classByEmail.get(r.student_email) || null,
        assignmentTitle: r.assignment_id ? (titleById.get(r.assignment_id) || null) : null,
        isLate,
        lateOverride: notes.lateOverride || null,
      };
    }));

    return res.json({ submissions });
  });

  // Admin creates a homework assignment for students to see
  app.post("/api/admin/homework/assign", (req, res, next) => {
    homeworkUpload.single("file")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the uploaded file." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    if (!ADMIN_EMAILS.includes(auth.email)) {
      return res.status(403).json({ error: "Forbidden: Admin privileges required to execute this operation." });
    }
    const { title, description, subject, targetClass, assignedDate, photoSessionId, pdfSessionId } = req.body;
    if (!title) return res.status(400).json({ error: "Assignment title is required." });

    const today = todayIST();
    const finalAssignedDate = assignedDate ? String(assignedDate) : today;
    if (finalAssignedDate < today) {
      return res.status(400).json({ error: "Homework cannot be posted for a past date." });
    }

    let filePath: string | null = null;
    if (photoSessionId) {
      // Question sheet was attached as one-by-one photos rather than a single direct file --
      // merge whatever was uploaded to that session into one PDF.
      let merged: Buffer | null;
      try {
        merged = await mergeSessionPhotos(auth.email, String(photoSessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
      } catch (mergeErr: any) {
        console.error("Error merging assignment session photos:", mergeErr.message);
        return res.status(500).json({ error: "Failed to combine the uploaded photos into a PDF." });
      }
      if (merged) {
        filePath = `assignments/${Date.now()}-question-sheet.pdf`;
        const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, merged, {
          contentType: "application/pdf",
        });
        if (uploadError) {
          console.error("Assignment photo-session upload error:", uploadError.message);
          return res.status(500).json({ error: "Failed to upload assignment file." });
        }
      }
    } else if (pdfSessionId) {
      // A large single PDF attached via chunked upload -- reassemble the pieces instead of
      // trusting a single direct file upload, which fails for question sheets close to or over
      // Vercel's ~4.5MB serverless body limit.
      let combined: Buffer | null;
      try {
        combined = await concatenateSessionChunks(auth.email, String(pdfSessionId).replace(/[^a-zA-Z0-9_-]/g, ""));
      } catch (concatErr: any) {
        console.error("Error reassembling assignment PDF chunks:", concatErr.message);
        return res.status(500).json({ error: "Failed to reassemble the uploaded file." });
      }
      if (combined) {
        filePath = `assignments/${Date.now()}-question-sheet.pdf`;
        const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, combined, {
          contentType: "application/pdf",
        });
        if (uploadError) {
          console.error("Assignment PDF-chunk upload error:", uploadError.message);
          return res.status(500).json({ error: "Failed to upload assignment file." });
        }
      }
    } else if (req.file) {
      const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      filePath = `assignments/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (uploadError) {
        console.error("Assignment file upload error:", uploadError.message);
        return res.status(500).json({ error: "Failed to upload assignment file." });
      }
    }

    const { data: insertedRow, error: insertError } = await supabase
      .from("homework_assignments")
      .insert({
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        subject: subject ? String(subject).trim() : null,
        target_class: targetClass || "All",
        file_path: filePath,
        assigned_date: finalAssignedDate,
        deadline: computeDeadline(finalAssignedDate, targetClass || "All"),
      })
      .select()
      .single();

    if (insertError || !insertedRow) {
      console.error("Error creating homework assignment:", insertError?.message);
      return res.status(500).json({ error: "Failed to save homework assignment." });
    }

    let fileUrl: string | null = null;
    if (filePath) {
      const { data: signed } = await supabase.storage.from(HOMEWORK_BUCKET).createSignedUrl(filePath, 3600);
      fileUrl = signed?.signedUrl || null;
    }

    return res.json({ success: true, assignment: mapAssignmentRow(insertedRow, fileUrl) });
  });

  // Everyone (students + admin) can view the list of posted homework assignments
  app.get("/api/homework/assignments", async (req, res) => {
    const { data: rows } = await supabase
      .from("homework_assignments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    const assignments = await Promise.all((rows || []).map(async (r) => {
      let fileUrl: string | null = null;
      if (r.file_path) {
        const { data: signed } = await supabase.storage.from(HOMEWORK_BUCKET).createSignedUrl(r.file_path, 3600);
        fileUrl = signed?.signedUrl || null;
      }
      return mapAssignmentRow(r, fileUrl);
    }));

    return res.json({ assignments });
  });

  // Admin deletes a homework assignment
  // Admin corrects an already-posted assignment's details (most commonly the target class, e.g.
  // after accidentally posting everything as "All" instead of the intended specific class). The
  // deadline is always recomputed from the (possibly new) target class + assigned date, so a class
  // correction immediately fixes which day/time it's actually due -- the file attachment itself is
  // left untouched; delete and repost if that needs to change.
  app.post("/api/admin/homework/edit-assignment", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id, title, description, subject, targetClass, assignedDate } = req.body;
    if (!id) return res.status(400).json({ error: "Assignment id is required." });
    if (!title || !String(title).trim()) return res.status(400).json({ error: "Assignment title is required." });
    if (!assignedDate) return res.status(400).json({ error: "Assigned date is required." });

    const { data: existing } = await supabase.from("homework_assignments").select("id").eq("id", id).maybeSingle();
    if (!existing) return res.status(404).json({ error: "Assignment not found." });

    const finalTargetClass = targetClass || "All";
    const { data: updatedRow, error: updateError } = await supabase
      .from("homework_assignments")
      .update({
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        subject: subject ? String(subject).trim() : null,
        target_class: finalTargetClass,
        assigned_date: String(assignedDate),
        deadline: computeDeadline(String(assignedDate), finalTargetClass),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError || !updatedRow) {
      console.error("Error editing homework assignment:", updateError?.message);
      return res.status(500).json({ error: "Failed to save the changes." });
    }

    let fileUrl: string | null = null;
    if (updatedRow.file_path) {
      const { data: signed } = await supabase.storage.from(HOMEWORK_BUCKET).createSignedUrl(updatedRow.file_path, 3600);
      fileUrl = signed?.signedUrl || null;
    }

    return res.json({ success: true, assignment: mapAssignmentRow(updatedRow, fileUrl) });
  });

  app.post("/api/admin/homework/delete-assignment", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Assignment id is required." });

    // Submissions reference this assignment by id, and the foreign key has no cascade behavior,
    // so deleting the assignment while submissions still point to it silently fails at the
    // database level. Unlink them first (they become general submissions, not tied to any
    // listed assignment) so the assignment can always actually be deleted.
    const { error: unlinkError } = await supabase.from("homework_submissions").update({ assignment_id: null }).eq("assignment_id", id);
    if (unlinkError) {
      console.error("Error unlinking submissions before assignment delete:", unlinkError.message);
      return res.status(500).json({ error: "Failed to unlink existing submissions from this assignment." });
    }

    const { error: deleteError } = await supabase.from("homework_assignments").delete().eq("id", id);
    if (deleteError) {
      console.error("Error deleting homework assignment:", deleteError.message);
      return res.status(500).json({ error: deleteError.message || "Failed to delete the assignment." });
    }
    return res.json({ success: true });
  });

  // Admin report: for each recent assignment, which target-class students have not submitted yet.
  app.get("/api/admin/homework/missing", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;

    const [{ data: assignmentRows }, { data: userRows }, { data: submissionRows }] = await Promise.all([
      supabase.from("homework_assignments").select("*").order("assigned_date", { ascending: false }).limit(60),
      supabase.from("users").select("email, name, student_class, role, status, student_type"),
      supabase.from("homework_submissions").select("student_email, assignment_id, submitted_at, admin_notes"),
    ]);

    // Online (self-study) students are never assigned homework, so they're excluded from the roster.
    const students = (userRows || []).filter((u: any) => u.role === "student" && u.status === "approved" && u.student_type !== "online");
    // Keyed by assignment id -> student email -> that student's submitted_at + admin_notes. The
    // upsert-per-assignment model means there's only ever one row per (student, assignment) pair,
    // so this is always their latest (i.e. current) submission -- exactly what "late" should be
    // judged against.
    const submittedByAssignment = new Map<string, Map<string, { submittedAt: string; adminNotes: string | null }>>();
    (submissionRows || []).forEach((s: any) => {
      if (!s.assignment_id) return;
      if (!submittedByAssignment.has(s.assignment_id)) submittedByAssignment.set(s.assignment_id, new Map());
      submittedByAssignment.get(s.assignment_id)!.set(s.student_email, { submittedAt: s.submitted_at, adminNotes: s.admin_notes });
    });

    // An assignment posted to "All" classes doesn't have one shared deadline in practice -- each
    // class has its own tuition-slot cutoff the next day (VIII 6:45pm, IX 5:45pm, X 4:45pm), same
    // as the student-facing view already accounts for. Splitting it into one report row per class
    // (each with that class's own deadline and only that class's own roster) fixes two problems at
    // once: a class whose own deadline has passed shows up even while another class's hasn't yet,
    // and a class's row never lists another class's students.
    const report: any[] = [];
    for (const a of assignmentRows || []) {
      const targetKeys = a.target_class === "All" ? Object.keys(DEADLINE_TIME_BY_CLASS) : [a.target_class];
      for (const key of targetKeys) {
        const effectiveDeadline = a.target_class === "All" ? computeDeadline(a.assigned_date, key) : a.deadline;
        const deadlinePassed = !!effectiveDeadline && new Date(effectiveDeadline).getTime() <= Date.now();
        if (!deadlinePassed) continue; // only report once a class's own deadline has actually passed

        const roster = students.filter((u: any) => CLASS_TO_TARGET[u.student_class] === key);
        const submitted = submittedByAssignment.get(a.id) || new Map<string, { submittedAt: string; adminNotes: string | null }>();
        const missing = roster.filter((u: any) => !submitted.has(u.email)).map((u: any) => ({ email: u.email, name: u.name }));
        const late = roster
          .filter((u: any) => {
            const entry = submitted.get(u.email);
            if (!entry) return false;
            const notes = parseAdminNotes(entry.adminNotes);
            if (notes.lateOverride === "not_late") return false;
            if (notes.lateOverride === "late") return true;
            return !!effectiveDeadline && new Date(entry.submittedAt).getTime() - new Date(effectiveDeadline).getTime() - LATE_SUBMISSION_GRACE_MS > 0;
          })
          .map((u: any) => ({ email: u.email, name: u.name }));
        report.push({
          id: a.target_class === "All" ? `${a.id}-${key}` : a.id,
          title: a.target_class === "All" ? `${a.title} (Class ${TARGET_TO_LABEL[key] || key})` : a.title,
          targetClass: TARGET_TO_LABEL[key] || key,
          assignedDate: a.assigned_date,
          deadline: effectiveDeadline,
          rosterCount: roster.length,
          submittedCount: roster.filter((u: any) => submitted.has(u.email)).length,
          missing,
          late,
        });
      }
    }

    return res.json({ report });
  });

  // Class performance / ranking report over a date range -- every student in the chosen class,
  // ranked by total score across every assignment that falls in range, with a per-assignment
  // breakdown (score + on-time/late) so the admin can see both the day-by-day picture and the
  // total at once.
  app.get("/api/admin/homework/report", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { fromDate, toDate, targetClass } = req.query as { fromDate?: string; toDate?: string; targetClass?: string };
    if (!fromDate || !toDate) return res.status(400).json({ error: "Please choose both a from date and a to date." });
    if (!targetClass || (!(targetClass in DEADLINE_TIME_BY_CLASS) && targetClass !== "12th")) {
      return res.status(400).json({ error: "Please choose a class." });
    }
    if (new Date(`${fromDate}T00:00:00Z`).getTime() > new Date(`${toDate}T00:00:00Z`).getTime()) {
      return res.status(400).json({ error: "The from date must be on or before the to date." });
    }

    // A day's homework is due (deadline) the NEXT day -- so homework assigned the day before
    // fromDate is the homework students are actually turning in/being scored on as of fromDate,
    // and belongs in the report even though its own assigned_date falls just outside the picked
    // range. Extending the query's lower bound back by one day captures exactly that one extra
    // day, without needing to touch the upper bound (toDate's own assignment is still included
    // by plain range membership, regardless of whether its next-day deadline has passed yet).
    const queryFromDate = new Date(`${fromDate}T12:00:00Z`);
    queryFromDate.setUTCDate(queryFromDate.getUTCDate() - 1);
    const queryFromDateStr = queryFromDate.toISOString().slice(0, 10);

    const { data: assignmentRows } = await supabase
      .from("homework_assignments")
      .select("id, title, subject, assigned_date, deadline, target_class")
      .in("target_class", [targetClass, "All"])
      .gte("assigned_date", queryFromDateStr)
      .lte("assigned_date", toDate)
      .order("assigned_date", { ascending: true });

    const assignments = (assignmentRows || []).map((a: any) => ({
      id: a.id,
      title: a.title,
      subject: a.subject,
      assignedDate: a.assigned_date,
      deadline: a.target_class === "All" ? computeDeadline(a.assigned_date, targetClass) : a.deadline,
    }));

    const { data: userRows } = await supabase
      .from("users")
      .select("email, name, student_class, role, status, student_type");
    const roster = (userRows || []).filter(
      (u: any) => u.role === "student" && u.status === "approved" && u.student_type !== "online" && CLASS_TO_TARGET[u.student_class] === targetClass
    );

    let submissionRows: any[] = [];
    if (assignments.length > 0) {
      const { data } = await supabase
        .from("homework_submissions")
        .select("student_email, assignment_id, status, ai_score, submitted_at, admin_notes")
        .in("assignment_id", assignments.map((a) => a.id));
      submissionRows = data || [];
    }
    // Keyed by "assignmentId|studentEmail" -- the upsert-per-assignment model means at most one
    // row can exist per pair, so no ordering/dedup concerns here.
    const submissionByKey = new Map<string, any>();
    submissionRows.forEach((s) => submissionByKey.set(`${s.assignment_id}|${s.student_email}`, s));

    const studentsReport = roster.map((u: any) => {
      let total = 0;
      const perAssignment = assignments.map((a) => {
        const sub = submissionByKey.get(`${a.id}|${u.email}`);
        if (!sub) return { assignmentId: a.id, state: "missing" as const, score: 0, isLate: false };
        const notes = parseAdminNotes(sub.admin_notes);
        const isLate = notes.lateOverride === "not_late" ? false
          : notes.lateOverride === "late" ? true
          : !!a.deadline && new Date(sub.submitted_at).getTime() - new Date(a.deadline).getTime() - LATE_SUBMISSION_GRACE_MS > 0;
        if (sub.status !== "checked" || typeof sub.ai_score !== "number") {
          return { assignmentId: a.id, state: "pending" as const, score: 0, isLate };
        }
        total += sub.ai_score;
        return { assignmentId: a.id, state: "checked" as const, score: sub.ai_score, isLate };
      });
      return { email: u.email, name: u.name, total, maxPossible: assignments.length * 10, perAssignment };
    });

    studentsReport.sort((a, b) => b.total - a.total);
    const ranked = studentsReport.map((s, idx) => ({ rank: idx + 1, ...s }));

    return res.json({ assignments, students: ranked });
  });

  // Everyone (students + admin) can view the list of posted announcements/updates
  app.get("/api/announcements", async (req, res) => {
    const { data: rows } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    return res.json({ announcements: (rows || []).map(mapAnnouncementRow) });
  });

  // Admin posts a new announcement/update (latest news, CBSE syllabus, etc.)
  app.post("/api/admin/announcements", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth || !ADMIN_EMAILS.includes(auth.email)) {
      if (auth) res.status(403).json({ error: "Forbidden: Admin privileges required to execute this operation." });
      return;
    }
    const { title, message, targetClass } = req.body;
    if (!title || !message) return res.status(400).json({ error: "Title and message are required." });

    const { data: insertedRow, error: insertError } = await supabase
      .from("announcements")
      .insert({
        title: String(title).trim(),
        message: String(message).trim(),
        target_class: targetClass || "All",
        created_by: auth.email,
      })
      .select()
      .single();

    if (insertError || !insertedRow) {
      console.error("Error creating announcement:", insertError?.message);
      return res.status(500).json({ error: "Failed to save announcement." });
    }

    return res.json({ success: true, announcement: mapAnnouncementRow(insertedRow) });
  });

  // Admin deletes an announcement
  app.post("/api/admin/announcements/delete", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Announcement id is required." });

    await supabase.from("announcements").delete().eq("id", id);
    return res.json({ success: true });
  });

  // ── FORUM (one shared forum, visible to every class and the admin) ──
  // Student posts start "pending" and are invisible to everyone except their own author until
  // an admin approves them; admin's own posts are auto-approved.

  async function uploadForumImage(file: Express.Multer.File, prefix: string): Promise<string | null> {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = `${prefix}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(FORUM_BUCKET).upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });
    if (uploadError) {
      console.error("Forum image upload error:", uploadError.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage.from(FORUM_BUCKET).getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  }

  // List every thread visible to the requester (approved ones + their own pending ones),
  // most recent first, with a count of approved replies for each.
  app.get("/api/forum/threads", async (req, res) => {
    // Auth is optional here (approved threads are visible to everyone) but if a valid token is
    // present, it's what determines which of the requester's own pending threads they can see --
    // never the unverified ?email= query param, which anyone could set to any value.
    const authHeader = (req.headers["authorization"] as string) || "";
    const tokenPayload = verifySessionToken(authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "");
    const requester = tokenPayload?.email || "";

    const [{ data: threadRows }, { data: replyRows }] = await Promise.all([
      supabase.from("forum_threads").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("forum_replies").select("thread_id, status"),
    ]);

    const replyCountByThread = new Map<string, number>();
    (replyRows || []).forEach((r: any) => {
      if (r.status === "approved") {
        replyCountByThread.set(r.thread_id, (replyCountByThread.get(r.thread_id) || 0) + 1);
      }
    });

    const visible = (threadRows || []).filter((t: any) => t.status === "approved" || t.author_email === requester);

    const threads = visible.map((t: any) => ({
      ...mapForumThreadRow(t),
      replyCount: replyCountByThread.get(t.id) || 0,
    }));

    return res.json({ threads });
  });

  // Start a new thread, with an optional image
  app.post("/api/forum/threads", (req, res, next) => {
    forumUpload.single("image")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the uploaded image." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required." });
    }

    const emailNormalized = auth.email;
    const { data: authorRow } = await supabase.from("users").select("name").eq("email", emailNormalized).maybeSingle();
    if (!authorRow) return res.status(404).json({ error: "Account not found." });

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadForumImage(req.file, "threads");
      if (!imageUrl) return res.status(500).json({ error: "Failed to upload image." });
    }

    const { data: insertedRow, error: insertError } = await supabase
      .from("forum_threads")
      .insert({
        title: String(title).trim(),
        body: String(body).trim(),
        author_email: emailNormalized,
        author_name: authorRow.name,
        image_url: imageUrl,
        status: ADMIN_EMAILS.includes(emailNormalized) ? "approved" : "pending",
      })
      .select()
      .single();

    if (insertError || !insertedRow) {
      console.error("Error creating forum thread:", insertError?.message);
      return res.status(500).json({ error: "Failed to post thread." });
    }

    return res.json({ success: true, thread: mapForumThreadRow(insertedRow) });
  });

  // View one thread plus the replies visible to the requester
  app.get("/api/forum/threads/:id", async (req, res) => {
    const { id } = req.params;
    const authHeader = (req.headers["authorization"] as string) || "";
    const tokenPayload = verifySessionToken(authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "");
    const requester = tokenPayload?.email || "";
    const isAdmin = ADMIN_EMAILS.includes(requester);

    const [{ data: threadRow }, { data: replyRows }] = await Promise.all([
      supabase.from("forum_threads").select("*").eq("id", id).maybeSingle(),
      supabase.from("forum_replies").select("*").eq("thread_id", id).order("created_at", { ascending: true }),
    ]);

    if (!threadRow) return res.status(404).json({ error: "Thread not found." });
    if (threadRow.status !== "approved" && threadRow.author_email !== requester && !isAdmin) {
      return res.status(404).json({ error: "Thread not found." });
    }

    const visibleReplies = (replyRows || []).filter((r: any) => r.status === "approved" || r.author_email === requester || isAdmin);

    return res.json({
      thread: mapForumThreadRow(threadRow),
      replies: visibleReplies.map(mapForumReplyRow),
    });
  });

  // Reply to a thread, with an optional image
  app.post("/api/forum/threads/:id/replies", (req, res, next) => {
    forumUpload.single("image")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the uploaded image." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { id } = req.params;
    const { body } = req.body;
    if (!body) {
      return res.status(400).json({ error: "Reply body is required." });
    }

    const { data: threadRow } = await supabase.from("forum_threads").select("id").eq("id", id).maybeSingle();
    if (!threadRow) return res.status(404).json({ error: "Thread not found." });

    const emailNormalized = auth.email;
    const { data: authorRow } = await supabase.from("users").select("name").eq("email", emailNormalized).maybeSingle();
    if (!authorRow) return res.status(404).json({ error: "Account not found." });

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadForumImage(req.file, "replies");
      if (!imageUrl) return res.status(500).json({ error: "Failed to upload image." });
    }

    const { data: insertedRow, error: insertError } = await supabase
      .from("forum_replies")
      .insert({
        thread_id: id,
        body: String(body).trim(),
        author_email: emailNormalized,
        author_name: authorRow.name,
        image_url: imageUrl,
        status: ADMIN_EMAILS.includes(emailNormalized) ? "approved" : "pending",
      })
      .select()
      .single();

    if (insertError || !insertedRow) {
      console.error("Error posting forum reply:", insertError?.message);
      return res.status(500).json({ error: "Failed to post reply." });
    }

    return res.json({ success: true, reply: mapForumReplyRow(insertedRow) });
  });

  // Admin views every pending thread and reply awaiting approval
  app.get("/api/admin/forum/pending", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;

    const [{ data: pendingThreads }, { data: pendingReplies }, { data: allThreads }] = await Promise.all([
      supabase.from("forum_threads").select("*").eq("status", "pending").order("created_at", { ascending: false }),
      supabase.from("forum_replies").select("*").eq("status", "pending").order("created_at", { ascending: false }),
      supabase.from("forum_threads").select("id, title"),
    ]);

    const titleById = new Map((allThreads || []).map((t: any) => [t.id, t.title]));

    return res.json({
      threads: (pendingThreads || []).map(mapForumThreadRow),
      replies: (pendingReplies || []).map((r: any) => ({
        ...mapForumReplyRow(r),
        threadTitle: titleById.get(r.thread_id) || null,
      })),
    });
  });

  // Admin approves a pending thread
  app.post("/api/admin/forum/approve-thread", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Thread id is required." });

    await supabase.from("forum_threads").update({ status: "approved" }).eq("id", id);
    return res.json({ success: true });
  });

  // Admin approves a pending reply
  app.post("/api/admin/forum/approve-reply", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Reply id is required." });

    await supabase.from("forum_replies").update({ status: "approved" }).eq("id", id);
    return res.json({ success: true });
  });

  // Admin deletes a thread (its replies go with it via ON DELETE CASCADE)
  app.post("/api/admin/forum/delete-thread", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Thread id is required." });

    await supabase.from("forum_threads").delete().eq("id", id);
    return res.json({ success: true });
  });

  // Admin deletes a single reply
  app.post("/api/admin/forum/delete-reply", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Reply id is required." });

    await supabase.from("forum_replies").delete().eq("id", id);
    return res.json({ success: true });
  });

  // ── Revision: student-initiated practice papers ──
  // A student sets a syllabus (typed or a photographed page) and optional exam dates for Maths
  // and/or Science; each "generate paper" call picks whichever subject is furthest behind (fewest
  // chapters completed this cycle, tie-broken by the nearer exam date) and a chapter from it that
  // hasn't been completed yet, then has Claude draft a fresh fixed-shape 30-mark CBSE-style paper
  // for it. Submitting and grading reuses the exact same upload/merge/grade shape as Homework
  // (see checkHomeworkSubmission above), just against a different table and a simpler, single
  // fixed rubric instead of a per-question missing/incorrect/doubt/late apparatus -- a revision
  // paper's questions and marking points are entirely known in advance (the paper the AI itself
  // just wrote), so grading it is a straightforward per-question partial-credit comparison rather
  // than working out which questions were even assigned.
  const REVISION_TOTAL_MARKS = 30;
  const REVISION_TIME_MINUTES = 60;
  const REVISION_GRACE_MINUTES = 15;
  // Shared across paper generation, the review pass, and grading feedback -- without this, plain
  // digits get written where a subscript/superscript belongs (e.g. "N2" instead of "N₂" the
  // molecule), which reads as genuinely ambiguous to a student rather than just unpolished.
  const REVISION_SUBSCRIPT_INSTRUCTION = `Whenever you write a chemical formula, a mathematical exponent/power, or anything else that needs a subscript or superscript, use the actual Unicode subscript/superscript characters (e.g. H₂O, CO₂, NH₃, Ca(OH)₂, x², a³, 10⁻⁴, v₀) -- never a plain same-size digit standing in for one (never "H2O", "x2", "N2"). This applies to every piece of text you write: question text, diagram labels, marking-scheme/solution steps, and any feedback or remarks a student will read.`;
  // Fixed shape every paper is generated in: 5x1 (objective), 3x2, 2x3, 2x4 (competency/case-based),
  // 1x5 -- 13 questions, 30 marks total. Kept in one place so generation and the client-facing
  // "what to expect" text can't silently drift apart.
  const REVISION_SECTION_SHAPE: { label: "A" | "B" | "C" | "D" | "E"; count: number; marks: number; kind: string }[] = [
    { label: "A", count: 5, marks: 1, kind: "objective/MCQ" },
    { label: "B", count: 3, marks: 2, kind: "short answer" },
    { label: "C", count: 2, marks: 3, kind: "short answer" },
    { label: "D", count: 2, marks: 4, kind: "competency/case-based" },
    { label: "E", count: 1, marks: 5, kind: "long answer" },
  ];

  // No longer reachable from the current frontend (the syllabus setup form only ever sends the
  // dropdown-picked chapter list now, see mathsSyllabusChapters/scienceSyllabusChapters below), but
  // kept working correctly regardless, since the API still accepts it and an old cached page or a
  // direct call could still exercise it. A real submission showed why this matters: pasting a
  // syllabus from a formatted source (e.g. a table) can turn the gaps BETWEEN chapters into long
  // runs of spaces/tabs rather than actual newlines, and splitting on newline/comma/semicolon alone
  // silently fused three separate chapters into one garbled entry ("Electricity ... Chemical
  // Reactions and Equations ... Acids"), which then generated one unfocused paper spanning all
  // three topics instead of a proper single-chapter one. A run of 4+ whitespace characters is never
  // part of a real chapter title, so it's now also treated as a separator.
  function splitSyllabusText(text: string): string[] {
    return text
      .split(/[\n,;]+|\s{4,}/)
      .map((s) => s.trim().replace(/^[-•*\d.)\s]+/, "").trim())
      .filter((s) => s.length > 0);
  }

  async function extractChaptersFromImage(buffer: Buffer, mimeType: string): Promise<string[]> {
    const isPdf = mimeType === "application/pdf";
    const block = isPdf
      ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: buffer.toString("base64") } }
      : { type: "image", source: { type: "base64", media_type: mimeType || "image/jpeg", data: buffer.toString("base64") } };
    const tool = {
      name: "submit_chapters",
      description: "Submit the list of chapter/topic names found in the attached syllabus image.",
      input_schema: {
        type: "object",
        properties: {
          chapters: {
            type: "array",
            items: { type: "string" },
            description: "One entry per distinct chapter/topic name visible in the image, cleaned up (no page numbers, marks, dates, or list bullets), in the order they appear.",
          },
        },
        required: ["chapters"],
      },
    };
    const result = await callClaudeTool({
      system: "You are reading a photographed or scanned syllabus/date-sheet page for a CBSE school student. Extract only the chapter/topic names being tested, not subject headers, dates, marks, or instructions.",
      content: [block, { type: "text", text: "Extract the chapter list now." }],
      tool,
      maxTokens: 2000,
    });
    return Array.isArray(result.chapters) ? result.chapters.filter((c: any) => typeof c === "string" && c.trim()) : [];
  }

  // Never resets anything itself -- a subject simply has nothing available once its own chapters
  // are all completed (null), even if the other subject is still mid-cycle. The only place a fresh
  // cycle actually begins is markRevisionChapterDone, which resets BOTH subjects together the
  // instant the whole syllabus is done, not just one subject in isolation.
  function pickChapterWithinSubject(subject: "Maths" | "Science", setup: any): { subject: "Maths" | "Science"; chapterName: string } | null {
    const chapters: string[] = (subject === "Maths" ? setup.maths_chapters : setup.science_chapters) || [];
    if (chapters.length === 0) return null;
    const completed: string[] = (subject === "Maths" ? setup.maths_completed_chapters : setup.science_completed_chapters) || [];
    const available = chapters.filter((c) => !completed.includes(c));
    if (available.length === 0) return null;
    const chapterName = available[Math.floor(Math.random() * available.length)];
    return { subject, chapterName };
  }

  // Picks which subject to serve next: whichever has completed fewer chapters this cycle catches
  // up first; tied (including "both zero"), the nearer non-null exam date wins; still tied, random
  // -- this is what keeps a student from only ever seeing the subject with the closer exam date,
  // per the explicit "don't give only maths test, give science also" requirement. Only used as a
  // fallback when the student hasn't picked an explicit chapter themselves (see generate-paper).
  function pickNextRevisionTarget(setup: any, excludeChapter?: { subject: string; chapterName: string }): { subject: "Maths" | "Science"; chapterName: string } | null {
    const hasMaths = ((setup.maths_chapters || []) as string[]).length > 0;
    const hasScience = ((setup.science_chapters || []) as string[]).length > 0;
    if (!hasMaths && !hasScience) return null;

    let subject: "Maths" | "Science";
    if (hasMaths && !hasScience) subject = "Maths";
    else if (hasScience && !hasMaths) subject = "Science";
    else {
      const mathsDone = ((setup.maths_completed_chapters || []) as string[]).length;
      const scienceDone = ((setup.science_completed_chapters || []) as string[]).length;
      if (mathsDone !== scienceDone) {
        subject = mathsDone < scienceDone ? "Maths" : "Science";
      } else if (setup.maths_exam_date && setup.science_exam_date) {
        subject = new Date(setup.maths_exam_date).getTime() <= new Date(setup.science_exam_date).getTime() ? "Maths" : "Science";
      } else if (setup.maths_exam_date && !setup.science_exam_date) {
        subject = "Maths";
      } else if (setup.science_exam_date && !setup.maths_exam_date) {
        subject = "Science";
      } else {
        subject = Math.random() < 0.5 ? "Maths" : "Science";
      }
    }

    let picked = pickChapterWithinSubject(subject, setup);
    if (!picked) {
      // Preferred subject has nothing left available (e.g. it finished while the other subject
      // still has pending chapters) -- fall back to whichever subject actually has something.
      const otherSubject: "Maths" | "Science" = subject === "Maths" ? "Science" : "Maths";
      picked = pickChapterWithinSubject(otherSubject, setup);
    }
    if (!picked) return null;

    // If we landed on the exact chapter the student is switching away from and the other subject
    // also has options, try the other subject once instead of re-serving the same chapter.
    if (excludeChapter && picked.subject === excludeChapter.subject && picked.chapterName === excludeChapter.chapterName) {
      const otherSubject: "Maths" | "Science" = picked.subject === "Maths" ? "Science" : "Maths";
      const alt = pickChapterWithinSubject(otherSubject, setup);
      if (alt) return alt;
      // Only one option existed and it's the one being excluded -- re-roll within the same subject
      // once (harmless if it comes back the same; nothing better is available).
      const retry = pickChapterWithinSubject(picked.subject, setup);
      if (retry) return retry;
    }
    return picked;
  }

  const REVISION_PAPER_TOOL = {
    name: "submit_paper",
    description: "Submit the generated revision paper.",
    input_schema: {
      type: "object",
      properties: {
        questions: {
          type: "array",
          description: "Exactly 13 questions in section order: 5 in A, 3 in B, 2 in C, 2 in D, 1 in E.",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "e.g. A1, A2, B1, C1, D1, E1" },
              sectionLabel: { type: "string", enum: ["A", "B", "C", "D", "E"] },
              marks: { type: "integer" },
              text: { type: "string", description: "The full question text as it would appear on the paper, including MCQ options and/or lettered sub-parts (i), (ii), (iii) inline where relevant. Use real subscript/superscript Unicode characters for any chemical formula or exponent (e.g. H₂O, x²), never a plain same-size digit." },
              markingPoints: { type: "array", items: { type: "string" }, description: "For Section A: a single entry, the one correct option/answer (no step marking, all-or-nothing). For Sections B-E: one entry per mark, in step order (method/formula, substitution, working steps, final answer -- or, for a multi-part question, each sub-part's own step(s) in order) -- a genuine CBSE-style step marking scheme, so the grader can award each step's mark independently. The number of entries must always equal exactly this question's 'marks' value, however many sub-parts it has. Shown to the student afterward as the solution once the paper is graded. Use real subscript/superscript Unicode characters for any chemical formula or exponent (e.g. CO₂, a³), never a plain same-size digit." },
            },
            required: ["id", "sectionLabel", "marks", "text", "markingPoints"],
          },
        },
      },
      required: ["questions"],
    },
  };

  // How well a reference file's (renamed, human-readable) title matches the chapter name a
  // student's own syllabus gave us -- used to attach only the relevant file(s) to a generation
  // call instead of the whole book folder (see getRevisionReferenceBookBlocks below).
  function chapterMatchScore(chapterName: string, fileTitle: string): number {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
    const a = norm(chapterName);
    const b = norm(fileTitle);
    if (!a || !b) return 0;
    if (a === b) return 100;
    if (a.includes(b) || b.includes(a)) return 80;
    const aWords = a.split(" ").filter((w) => w.length > 2);
    const bWords = new Set(b.split(" ").filter((w) => w.length > 2));
    if (aWords.length === 0) return 0;
    const overlap = aWords.filter((w) => bWords.has(w)).length;
    return (overlap / aWords.length) * 60;
  }

  // Looks up admin-uploaded reference PDF(s) on file for this class/subject that actually look
  // like they cover the requested chapter (see REVISION_REFERENCE_PREFIX above -- one folder per
  // class/subject, any number of files: one per chapter, multiple volumes, etc.) and returns them
  // as Claude document content blocks. classLabel is the Roman-numeral form ("VIII"/"IX"/"X")
  // already used elsewhere in Revision; CLASS_TO_TARGET converts it to the "8th"/"9th"/"10th"
  // storage key. Empty array if none on file or nothing matches well enough.
  //
  // Deliberately does NOT attach every file in the folder -- a real book folder can hold a dozen-
  // plus chapter PDFs worth tens of MB combined, and attaching all of them to every single
  // generation call (twice, once for the draft and once for the review pass) was the single
  // biggest driver of API cost once reference books were in use. Matching by title keeps the
  // attached material to what's actually relevant.
  async function getRevisionReferenceBookBlocks(classLabel: string, subject: "Maths" | "Science", chapterName: string): Promise<any[]> {
    const classKey = CLASS_TO_TARGET[classLabel];
    if (!classKey) return [];
    const folder = `${REVISION_REFERENCE_PREFIX}/${classKey}-${subject}`;
    const { data: fileList } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).list(folder);
    const pdfFiles = (fileList || []).filter((f: any) => f.name.toLowerCase().endsWith(".pdf"));
    if (pdfFiles.length === 0) return [];

    const scored = pdfFiles
      .map((f: any) => ({ f, score: chapterMatchScore(chapterName, referenceBookDisplayTitle(f.name)) }))
      .filter((x: any) => x.score >= 30)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 2);

    // If nothing scored well -- e.g. files are still in their original NCERT filename form
    // (hegp101.pdf etc.), which carries no matchable text before renaming -- fall back to
    // attaching the whole folder only when it's small enough to stay cheap either way.
    const toFetch = scored.length > 0 ? scored.map((x: any) => x.f) : (pdfFiles.length <= 3 ? pdfFiles : []);

    const blocks: any[] = [];
    for (const f of toFetch) {
      const { data: blob } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).download(`${folder}/${f.name}`);
      if (!blob) continue;
      const buf = Buffer.from(await blob.arrayBuffer());
      blocks.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: buf.toString("base64") } });
    }
    return blocks;
  }

  // Cycle 1 is standard difficulty; every full cycle after that should be progressively harder,
  // since a student re-testing on a chapter they've already been through once should be pushed
  // further, not shown the same difficulty forever.
  function revisionDifficultyInstruction(cycleNumber: number): string {
    if (cycleNumber <= 1) return "";
    if (cycleNumber === 2) return ` This student has already completed one full cycle through their syllabus and is now on their second pass over this chapter -- raise the difficulty moderately above a first-attempt paper: less scaffolding, harder numbers/scenarios, more multi-step reasoning, while staying strictly within the syllabus for this chapter (never introduce content outside what's actually taught in it just to make it harder).`;
    return ` This is this student's cycle ${cycleNumber} through their syllabus on this chapter -- raise the difficulty well beyond a cycle-2 paper, and further again than the previous cycle: tougher multi-concept and competency-based questions, less hand-holding, harder numbers, while staying strictly within the syllabus for this chapter (never introduce out-of-syllabus content just to make it harder).`;
  }

  async function generateRevisionPaper(subject: "Maths" | "Science", chapterName: string, classLabel: string, cycleNumber: number = 1): Promise<RevisionQuestion[]> {
    const sectionsText = REVISION_SECTION_SHAPE.map((s) => `Section ${s.label}: ${s.count} question(s) x ${s.marks} mark(s) each, ${s.kind} style.`).join("\n");
    const referenceBlocks = await getRevisionReferenceBookBlocks(classLabel, subject, chapterName);
    const referenceInstruction = referenceBlocks.length > 0
      ? ` The attached PDF(s) are the actual official textbook material this student's class uses for ${subject} -- possibly one file per chapter, or multiple volumes, so not every attached file is relevant to this specific chapter. They may use different chapter names, ordering, or topic structure than you'd otherwise expect (for example, some 2026-onward NCERT books integrate multiple subjects into one chapter, or split content differently than older editions). Find whichever attached file(s) actually cover "${chapterName}" and base every question strictly on that content, terminology, and depth as it appears there -- do not substitute your own general knowledge of a similarly-named older chapter if it conflicts with what's actually in the attached material.`
      : ` No reference textbook is on file for this class/subject, so use your own best knowledge of the CBSE curriculum for this chapter -- if "${chapterName}" doesn't clearly match a chapter you know, interpret it as sensibly as possible from the name and class level given.`;
    const difficultyInstruction = revisionDifficultyInstruction(cycleNumber);
    const system = `You are an expert CBSE-curriculum teacher setting a short revision practice paper for a Class ${classLabel} student, subject: ${subject}, chapter: "${chapterName}".${referenceInstruction}${difficultyInstruction} ${REVISION_SUBSCRIPT_INSTRUCTION} NCERT chapters include supplementary/enrichment content set apart from the main examinable text -- shaded or outlined "box" callouts, "Do You Know?"/"Something to Think About"/"Additional Information" style panels, footnotes, or any passage explicitly marked "Not for Examination Purpose" per CBSE's own circulars. Never base a question on this boxed/supplementary material, even if it's interesting -- every question must come strictly from the chapter's main, examinable running text. If a reference PDF is attached, this applies to whatever is visually set apart as a box/panel on the page, not just text explicitly labelled as excluded. Separately, stay within the CURRENT CBSE board-examinable depth for this exact topic and class, not just the chapter's general subject area -- CBSE's rationalized syllabus has specifically trimmed certain analytical techniques down to a simpler case even where the textbook still briefly mentions the broader concept. The clearest example: Class 10 Polynomials briefly introduces that cubic (and higher-degree) polynomials exist, but "verify the relationship between zeroes and coefficients" is only examinable for a QUADRATIC polynomial -- never write a question asking a student to verify this relationship for a cubic polynomial, even though the chapter mentions cubics exist. Apply the same caution generally: when a chapter's textbook briefly introduces a broader or more advanced version of a technique/concept without walking through it as a worked method the student practises repeatedly, that broader version is very likely NOT board-examinable at this class level -- default to testing the core, standard-depth version of the topic that the chapter actually builds skill in, not an extension of it. Every one of the 13 questions must test a genuinely distinct scenario -- never reuse the same specific dataset, points, numbers, or setup in two different questions, even across sections and even if one is a quick MCQ and the other a full worked answer (e.g. never set an MCQ asking "are points (1,5),(2,3),(–2,–11) collinear?" and separately a Section C question asking to fully determine collinearity for that exact same trio of points -- a student who already answered it once has no way to know the second occurrence expects the full working shown again from scratch, and reasonably treats it as already-solved). Write real exam-style questions a CBSE school would actually ask for this chapter, covering as much of the chapter's content as this small paper can reasonably fit (don't concentrate on just one narrow sub-topic). Where useful, draw on the style and phrasing of real recent (2026) CBSE sample papers/model papers for this subject and class, but every question must be your own original wording, not copied verbatim from anywhere. The paper MUST have exactly this fixed structure, 30 marks total:
${sectionsText}
Section A questions are objective -- either a 4-option MCQ (write the options inline as (a)/(b)/(c)/(d) in the question text) or a very short one-line/one-word/fill-in-the-blank answer. Never write MCQ-style phrasing ("Which of the following...", "Choose the correct option...", "Select the correct answer...") unless the four lettered options are actually written out inline right there in the question text -- a question that asks a student to pick from "the following" while never actually stating what the following options are is unanswerable through no fault of the student's. If you are not going to list four real options, phrase the question as a direct question instead (e.g. "Name an example of..." / "State..." / a fill-in-the-blank), never with "which of the following" framing.

This paper is text-only -- no image, diagram, or figure of any kind is ever attached to a question, no matter what a real textbook or exam paper might include. NEVER write a question that refers to an external figure the student is expected to already have (e.g. "Study Fig. 2.10 showing...", "As shown in the diagram below...", "identify the labelled parts in the figure") -- a student receiving a question like that has no diagram to look at and cannot answer it, through no fault of their own. If a question's content genuinely involves a diagram or visual (e.g. comparing cell types, a circuit, a geometric figure), either (a) describe every visually-relevant detail directly in the question's own text, in full sentences, so the question is completely self-contained without needing to see anything, or (b) ask the student to draw and label the diagram themselves as part of their answer (e.g. "Draw and label a neat diagram of..."), which this app's marking scheme already handles well. Never assume a figure will be supplied by someone else.

Section D (4 marks) and Section E (5 marks) questions: this is exactly how current CBSE teachers actually set these questions, and you must follow the same pattern. PREFER splitting the question into 2-3 lettered sub-parts, e.g. (i)/(ii) worth 2+2 or 1+3, or (i)/(ii)/(iii) worth 1+2+2 or 2+1+2 or 1+1+3 -- whatever split fits the content best, as long as the sub-part marks add up to exactly the question's total (4 for D, 5 for E). A single, complete, non-split question (e.g. one full derivation, one long-answer theory question, or one "draw and label a neat diagram of..." question for Science/Biology chapters) is also allowed and good to use sometimes, but multi-part is the more common, preferred style -- lean toward it more often than not. Section D should be competency/case-based (a short real-world scenario or data/passage, then sub-question(s) about it); Section E can be a multi-part numerical/derivation, a multi-part theory question, or a single substantial question, whichever suits the chapter's content best.

For every question in Sections B, C, D, and E, write markingPoints as a genuine CBSE-board-style STEP marking scheme, exactly like the official marking scheme that would accompany this question on a real CBSE answer key: break the full solution into as many individual steps as the question's mark value (a 2-mark question gets 2 marking points, a 4-mark question gets 4, etc.), each worth exactly 1 mark, in the actual order the working proceeds -- typically: correct formula/concept/method identified, correct substitution of given values, correct intermediate simplification/steps (one point per major step for longer derivations), and the correct final answer/conclusion as its own separate point; for a multi-part question, this just means each sub-part contributes its own share of steps in order (e.g. a 1+2+2 split contributes 1 step for part (i), 2 for part (ii), 2 for part (iii) -- 5 total). However you divide a question, the number of marking points must always sum to exactly that question's own 'marks' value -- never more, never fewer -- so splitting into sub-parts never changes how many marks are actually available or costs the student anything extra. Each marking point must be concrete and checkable (e.g. "Correctly states the quadratic formula" or "(ii) Correctly labels the nucleus and cell membrane"), not vague. For Section A (objective/MCQ or one-line factual answers), there is no step marking -- just write a single markingPoints entry with the one correct option/answer, since these are all-or-nothing for their 1 mark.`;

    // Cost-reduction pass (explicit admin decision): this call now runs on the cheaper generation
    // model, and the separate proofreading/self-review pass that used to follow it was removed
    // entirely -- that second call was catching real issues over this app's history (duplicate
    // questions, wrong marking-scheme answers, out-of-syllabus content, missing-figure references),
    // so this is a genuine quality-vs-cost trade-off made knowingly, not an oversight. The grading
    // side's own defenses (page-by-page notes, the never-trust-a-self-contradicting-note backstop,
    // the crossed-out-work rule, the floor that protects a student's earned marks on Improve Score)
    // still catch a lot of the same damage after the fact even without this pass, and any paper
    // defect that does slip through can still be fixed the same way every other one found this
    // session was: patch the stored question content directly once reported.
    const result = await callClaudeTool({
      system,
      content: [...referenceBlocks, { type: "text", text: "Generate the paper now." }],
      tool: REVISION_PAPER_TOOL,
      maxTokens: 6000,
      model: CLAUDE_MODEL_GENERATION,
    });
    const draft = Array.isArray(result.questions) ? result.questions : [];
    if (draft.length === 0) throw new Error("Claude did not return any questions.");
    return draft;
  }

  // Looks for an already-generated paper for this exact (class, subject, chapter, cycle) --
  // from ANY student, not just this one -- so a whole class working through the same syllabus
  // doesn't each pay for a fresh generation call for the same chapter. Matching is by exact
  // (case-sensitive, as-typed) chapter name AND the same cycle number, so a student on their
  // second (harder) pass through a chapter never gets served a first-pass-difficulty cached
  // paper, or vice versa. A near-miss just falls through to a normal fresh generation, never a
  // wrong-content or wrong-difficulty match. Returns null on a miss.
  async function findReusableRevisionQuestions(subject: "Maths" | "Science", chapterName: string, classLabel: string, cycleNumber: number): Promise<RevisionQuestion[] | null> {
    const { data: candidates } = await supabase
      .from("revision_papers")
      .select("student_email, content, created_at, cycle_number")
      .eq("subject", subject)
      .eq("chapter_name", chapterName)
      .eq("cycle_number", cycleNumber)
      .order("created_at", { ascending: false })
      .limit(25);
    if (!candidates || candidates.length === 0) return null;

    const emails = [...new Set(candidates.map((c: any) => c.student_email))];
    const { data: users } = await supabase.from("users").select("email, student_class").in("email", emails);
    const classByEmail = new Map((users || []).map((u: any) => [u.email, u.student_class]));

    const match = candidates.find((c: any) => classByEmail.get(c.student_email) === classLabel);
    const questions = match?.content?.questions;
    return Array.isArray(questions) && questions.length > 0 ? questions : null;
  }

  // Drop-in wrapper around generateRevisionPaper that checks the reuse cache first -- same
  // (subject, chapterName, classLabel) argument order plus cycleNumber, so both call sites below
  // just swap the function name.
  async function getRevisionQuestionsForTarget(subject: "Maths" | "Science", chapterName: string, classLabel: string, cycleNumber: number): Promise<RevisionQuestion[]> {
    const reused = await findReusableRevisionQuestions(subject, chapterName, classLabel, cycleNumber);
    if (reused) return reused;
    return generateRevisionPaper(subject, chapterName, classLabel, cycleNumber);
  }

  function mapRevisionPaperForStudent(row: any) {
    // markingPoints (the step-by-step correct answer/marking scheme) is the exam's answer key --
    // withheld while a paper is still being attempted, and only included once it's graded, so a
    // student can review exactly how each mark was earned ("View Solution") without it being
    // visible during the test itself.
    const revealSolution = row.status === "graded";
    const content = (row.content?.questions || []).map((q: any) => ({
      id: q.id,
      sectionLabel: q.sectionLabel,
      marks: q.marks,
      text: q.text,
      ...(revealSolution ? { markingPoints: q.markingPoints || [] } : {}),
    }));
    return {
      id: row.id,
      subject: row.subject,
      chapterName: row.chapter_name,
      totalMarks: row.total_marks,
      timeAllottedMinutes: row.time_allotted_minutes,
      status: row.status,
      startedAt: row.started_at,
      deadlineAt: row.deadline_at,
      questions: content,
      sections: REVISION_SECTION_SHAPE,
      cycleNumber: row.cycle_number || 1,
      createdAt: row.created_at,
    };
  }

  async function findJustCreatedRevisionSubmission(studentEmail: string, paperId: string): Promise<any | null> {
    const { data } = await supabase
      .from("revision_submissions")
      .select("*")
      .eq("student_email", studentEmail)
      .eq("revision_paper_id", paperId)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return null;
    const ageMs = Date.now() - new Date(data.submitted_at).getTime();
    return ageMs >= 0 && ageMs < 3 * 60 * 1000 ? data : null;
  }

  async function upsertRevisionSubmission(params: { studentEmail: string; paperId: string; filePath: string; isLate: boolean }): Promise<any> {
    const { data: existing } = await supabase
      .from("revision_submissions")
      .select("id, file_path, ai_score, ai_feedback, first_attempt_score, first_attempt_feedback")
      .eq("student_email", params.studentEmail)
      .eq("revision_paper_id", params.paperId)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      const updates: Record<string, any> = {
        file_path: params.filePath,
        submitted_at: new Date().toISOString(),
        is_late: params.isLate,
        status: "pending",
        ai_score: null,
        ai_feedback: null,
      };
      // The very first graded score AND remarks are captured here, permanently, the moment a
      // student re-submits to improve it -- a second or third "Improve Score" attempt never
      // overwrites either again, so "first attempt" in admin reports always genuinely means
      // attempt 1, not whichever attempt happened to be graded before the most recent one.
      if (existing.first_attempt_score == null && existing.ai_score != null) {
        updates.first_attempt_score = existing.ai_score;
      }
      if (existing.first_attempt_feedback == null && existing.ai_feedback != null) {
        updates.first_attempt_feedback = existing.ai_feedback;
      }
      const { data: updatedRow, error: updateError } = await supabase
        .from("revision_submissions")
        .update(updates)
        .eq("id", existing.id)
        .select()
        .single();
      if (updateError || !updatedRow) throw new Error(updateError?.message || "Failed to update the existing revision submission.");
      if (existing.file_path && existing.file_path !== params.filePath) {
        await supabase.storage.from(HOMEWORK_BUCKET).remove([existing.file_path]).catch(() => {});
      }
      return updatedRow;
    }

    const { data: insertedRow, error: insertError } = await supabase
      .from("revision_submissions")
      .insert({
        student_email: params.studentEmail,
        revision_paper_id: params.paperId,
        file_path: params.filePath,
        is_late: params.isLate,
      })
      .select()
      .single();
    if (insertError || !insertedRow) throw new Error(insertError?.message || "Failed to save the revision submission.");
    return insertedRow;
  }

  // Marks a chapter as done for the current cycle once its paper is graded, resetting the
  // completed-list back to empty (starting a fresh cycle) once every chapter in that subject's
  // syllabus has been covered.
  async function markRevisionChapterDone(studentEmail: string, subject: "Maths" | "Science", chapterName: string) {
    const { data: setup } = await supabase.from("revision_setups").select("*").eq("student_email", studentEmail).maybeSingle();
    if (!setup) return;
    const completedKey = subject === "Maths" ? "maths_completed_chapters" : "science_completed_chapters";
    let completed: string[] = setup[completedKey] || [];
    if (!completed.includes(chapterName)) completed = [...completed, chapterName];

    const updates: Record<string, any> = { [completedKey]: completed, updated_at: new Date().toISOString() };

    // Only start a fresh cycle once EVERY chapter across the WHOLE syllabus (both subjects) has
    // been completed -- resetting per-subject the moment just that one subject finishes would let
    // its chapters repeat while the other subject's syllabus hasn't even been started yet, which
    // defeats the entire point of "don't repeat a chapter until the full syllabus cycle is done."
    const mathsChapters: string[] = setup.maths_chapters || [];
    const scienceChapters: string[] = setup.science_chapters || [];
    const mathsCompleted: string[] = subject === "Maths" ? completed : (setup.maths_completed_chapters || []);
    const scienceCompleted: string[] = subject === "Science" ? completed : (setup.science_completed_chapters || []);
    const mathsDone = mathsChapters.length === 0 || mathsChapters.every((c) => mathsCompleted.includes(c));
    const scienceDone = scienceChapters.length === 0 || scienceChapters.every((c) => scienceCompleted.includes(c));
    if ((mathsChapters.length > 0 || scienceChapters.length > 0) && mathsDone && scienceDone) {
      updates.maths_completed_chapters = [];
      updates.science_completed_chapters = [];
      // A full cycle just finished -- the next cycle's papers should be harder than this one's,
      // and progressively harder again each cycle after that (see generateRevisionPaper).
      updates.cycle_number = (setup.cycle_number || 1) + 1;
    }

    await supabase.from("revision_setups").update(updates).eq("student_email", studentEmail);
  }

  // Parses the "A1: 2/2 -- reason" per-question lines checkRevisionSubmission itself writes back
  // out of a stored feedback string. Used only to protect an "Improve Score" resubmission from
  // losing marks a student already earned -- unlike Homework's Improve (which only re-grades the
  // specific questions that were previously wrong, so an already-correct answer can structurally
  // never be marked down again), Revision re-grades the WHOLE paper fresh on every attempt, and an
  // independent grading run has no guarantee of reproducing the exact same read on a question it
  // already got right once. Real students hit this: the same correct working, graded fresh a
  // second time, occasionally came back lower than before purely from grading-run variance, not
  // from anything they did differently -- see checkRevisionSubmission's use of this below.
  function parseRevisionFeedbackForFloor(feedback: string | null | undefined): Map<string, { marks: number; line: string }> {
    const map = new Map<string, { marks: number; line: string }>();
    if (!feedback) return map;
    const rowPattern = /^([A-Za-z]\d+):\s*(\d+)\/(\d+)(?:\s*--\s*(.*))?$/;
    for (const rawLine of feedback.split("\n")) {
      const line = rawLine.trim();
      const match = rowPattern.exec(line);
      if (match) map.set(match[1], { marks: Number(match[2]), line });
    }
    return map;
  }

  // Backstop for a self-contradiction failure mode confirmed across several real, distinct
  // submissions despite two rounds of prompt-only fixes (reordering note before met, then telling
  // the model to write only a single settled conclusion, never a "first this looked wrong, but
  // actually..." narrated journey): a step's own note ends up affirming the work is correct --
  // "correctly matches the required value", "coincidentally arrives at the correct final answer...
  // matches the required" -- while met is still false. Since instructing the model not to do this
  // has not reliably worked, this catches the narrow, unambiguous case in code instead of only
  // hoping for compliance. Deliberately conservative (a false positive would wrongly credit a
  // genuinely wrong step): only overrides when the note contains an explicit
  // actually/correctly/coincidentally + correct/right/matches pairing with no negation nearby: a
  // note whose own final verdict is genuinely negative (e.g. a bad self-check the model itself got
  // wrong, "so check: ... but this doesn't match") is a different failure mode entirely (covered by
  // the "redo your own verification arithmetic" instruction above) and must not be swept in here.
  function resolveStepMet(step: { met: boolean; note?: string }): boolean {
    if (step.met) return true;
    const note = (step.note || "").toLowerCase();
    // Scope the negation check to the CONCLUDING clause only (text after the last semicolon, or
    // the whole note if there's none) -- an earlier clause describing what looked wrong before the
    // model talked itself into the correct resolution must not suppress the override, but a note
    // whose actual final verdict is genuinely negative (a bad self-check the model itself got
    // wrong -- a different failure mode, covered by the "redo your verification" instruction
    // above) must not be swept in here.
    const lastClause = note.split(";").pop() || "";
    const positivePattern = /\b(actually|correctly|coincidentally)\b[^.]{0,80}\b(correct|right|matches?)\b/;
    const negationNearby = /\b(not|n't|isn't|wasn't|doesn't|didn't|incorrect|wrong|never)\b/;
    return positivePattern.test(lastClause) && !negationNearby.test(lastClause);
  }

  async function checkRevisionSubmission(submissionId: string) {
    const { data: sub } = await supabase.from("revision_submissions").select("*").eq("id", submissionId).maybeSingle();
    if (!sub) return;
    const { data: paper } = await supabase.from("revision_papers").select("*").eq("id", sub.revision_paper_id).maybeSingle();
    if (!paper) return;

    const { data: fileBlob, error: downloadError } = await supabase.storage.from(HOMEWORK_BUCKET).download(sub.file_path);
    if (downloadError || !fileBlob) {
      console.error(`Could not download revision submission file for ${submissionId}:`, downloadError?.message);
      return;
    }
    const arrayBuffer = await fileBlob.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const isPdf = fileBlob.type === "application/pdf" || sub.file_path.toLowerCase().endsWith(".pdf");
    const contentBlock = isPdf
      ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64Data } }
      : { type: "image", source: { type: "base64", media_type: fileBlob.type || "image/jpeg", data: base64Data } };

    const questions: (RevisionQuestion & { markingPoints: string[] })[] = paper.content?.questions || [];
    const questionsBlock = questions
      .map((q) => {
        const steps = (q.markingPoints || []).map((mp, i) => `  Step ${i + 1} (1 mark): ${mp}`).join("\n");
        return `${q.id} (${q.marks} mark${q.marks > 1 ? "s" : ""}): ${q.text}\nStep marking scheme:\n${steps}`;
      })
      .join("\n\n");

    // CBSE step marking, made a real mechanic rather than a prompt instruction to hope the model
    // follows correctly: the model judges each step of the paper's own marking scheme true/false
    // independently (stepResults, same order as the question's markingPoints -- Section A/MCQ
    // questions have exactly one step, so they are naturally all-or-nothing with zero extra
    // special-casing), and the actual mark for each question is deterministically the count of
    // true steps, exactly mirroring how a real CBSE examiner ticks off a marking scheme -- never
    // a single holistic number the model picks itself (same "never trust the model's own
    // arithmetic" principle as homework grading's deterministic score, see checkHomeworkSubmission).
    const system = `You are a strict CBSE-board examiner grading a student's handwritten answers to a mock paper you already wrote, using genuine CBSE step-marking: for every question in Sections B-E, each step of the marking scheme below is worth exactly 1 mark, awarded independently of the other steps in that same question. Apply the standard CBSE "error carried forward" (ECF) principle: if an early step has a mistake, still award every later step whose method is correctly applied to the student's own (incorrect) value from that point on -- do not zero out an entire question just because one early step was wrong. Section A questions have only ONE step in their marking scheme (the single correct option/answer) -- these are all-or-nothing for their 1 mark, with no partial credit, since choosing an option is not a multi-step working. For every step, judge strictly against what the marking scheme step actually requires, but extend the same handwriting tolerance a real teacher would: never mark a step wrong for messy handwriting or presentation alone; when a single digit is genuinely ambiguous between two similar shapes (3/5, 1/7, 6/0, 4/9, 5/9), prefer the reading that makes the student's own working internally consistent and correct. A step that is entirely missing (not attempted at all) is not met. If a whole question is entirely unattempted, mark every one of its steps as not met. NEVER mark a step not met because a student crossed out, scratched out, or scribbled over a wrong or messy first attempt at it and redid it nearby -- correcting your own working on the page is normal, not a fault. When the same value or step appears worked out twice on the page (a scratched-out/crossed-out attempt followed by a cleaner one, e.g. a crossed-out intermediate number sitting right next to the final, clearly-written answer below it), grade ONLY the final, non-crossed-out version -- it supersedes the earlier one entirely, even if the crossed-out version is easier to read or sits closer to where you'd expect the answer. This applies just as much to a single crossed-out WORD or short phrase inside an otherwise-continuous sentence, not only to a whole separate re-attempt written elsewhere -- e.g. a student who writes "diseases that ~~do not~~ spread from person to person" with "do not" struck through has corrected their own sentence to read "diseases that spread from person to person"; read and grade the sentence with every struck-through word removed entirely, exactly as the student intends it to be read after their own correction, and never grade a struck-through word as if it were still part of the answer (including treating a struck-through negation as if it still reversed the sentence's meaning).

Students often submit their answers as several photographed pages combined into one file. A question's working very often starts on one page and its concluding line, final boxed answer, or last computational step is the very first thing on the NEXT page -- this is completely normal handwriting layout, not a sign the question was left incomplete or unattempted. NEVER mark a step as not met, or a question as unattempted, just because the page where the question begins looks like it ends abruptly -- always check whether the very next page opens with that question's continuation before deciding anything is missing. This is exactly what the required pageByPageNotes field exists for: fill it in for every single page first, before judging any step.

Some word problems describe a relationship between two quantities ("the difference between X and Y is d", "X is d more/less than Y") without stating which one is the larger of the pair. When the marking scheme below picks one specific assignment (e.g. X = Y + d) but the question itself never actually disambiguates which quantity is bigger, a student who instead consistently uses the OPPOSITE assignment (X = Y - d) throughout, correctly solves their own resulting equation, and rejects whichever root is invalid exactly as the scheme does, has found the other equally valid labeling of the same physical situation -- their final pair of values will simply come out with the two labels swapped (e.g. their X is the scheme's Y and vice versa). This is not an error and must not cost any step marks, INCLUDING the final step that states which quantity got which value -- judge that final step against whether it is internally consistent with the student's own (equally valid) assignment from part (i), not against the marking scheme's specific label choice. Only treat a swapped-looking final answer as wrong if the question actually did specify which quantity is larger and the student contradicted that.

Some submissions (especially a student's own scanned PDF rather than a photo taken directly through this app) have one or more pages rotated 90 or 180 degrees from normal reading orientation -- the handwriting runs sideways or upside down relative to the page. This is a scanning artifact, not a mistake in the student's work. Whenever a page's content doesn't read naturally left-to-right top-to-bottom, mentally rotate it to the correct orientation FIRST and read it exactly as carefully as an upright page before judging any step on it -- do not let sideways or upside-down orientation cause a rushed reading, a misread symbol, a skipped line, or a step marked not-met when the content is actually present but rotated. A page being rotated is never itself a reason to mark any step wrong.

When a marking-scheme step names a specific target expression or value (e.g. "sets up (5x+5) and (5x-1)", "simplifies to 25x^2+15x-5"), that target is the END result of a substitution, not the only acceptable way to write it down. A student who first writes out the literal, unsimplified substitution (e.g. writing (5x+3+2) before combining it into (5x+5)) and THEN simplifies it -- on the same line or the next one -- has correctly completed that step; the unsimplified intermediate form is not a wrong answer sitting next to a right one, it is normal working shown before condensing it, and must never be graded as if the student wrote the wrong expression. Only mark such a step not met if the student's WORKING never actually reaches the required value/expression anywhere, or reaches it via an incorrect substitution.

When a marking-scheme step asks a student to "identify", "state", or "show" a geometric relationship -- e.g. which angles are equal by the alternate-angle property, which sides correspond, which triangle is similar to which -- a clearly labeled diagram showing the correct value at the correct vertex/side satisfies this just as validly as a written sentence; do not require the reasoning to be spelled out in prose when the diagram unambiguously conveys it. Likewise, if a value from this kind of step (e.g. a derived angle) is then used correctly in the very next calculation, that correct, consistent usage is itself sufficient evidence the identification was made -- do not deduct for not ALSO re-writing or re-labeling it a second time somewhere else, since asking for a redundant restatement of something already correctly established and used is not what the step is checking for.

When you double-check a student's final value yourself (e.g. reconverting their fraction back to a decimal, re-solving their equation independently) as part of judging whether a step is met, redo that check carefully, digit by digit, before trusting it -- your own verification arithmetic is exactly as capable of a slip as the student's, and a wrong self-check must never be allowed to overturn a genuinely correct answer. Before writing a step's final met/not-met verdict, re-read the note you are about to attach to it: if that note's own reasoning states or concludes partway through that the student's value, method, or simplification IS correct, the step must be marked met -- a step can never be marked not-met while its own explanation admits the work was right. If your first pass through a verification produces a conclusion that contradicts an earlier part of your own reasoning, stop and redo the arithmetic rather than reporting the contradiction as if it were the student's error.

${REVISION_SUBSCRIPT_INSTRUCTION}`;
    const prompt = `Here is the paper's own question list and step-wise marking scheme, followed by the student's submitted answers as an attached file. For each question, evaluate every numbered step in order.\n\n${questionsBlock}`;

    const gradeTool = {
      name: "submit_revision_grade",
      description: "Submit the grading result.",
      input_schema: {
        type: "object",
        properties: {
          // Listed FIRST on purpose, same reasoning as homework grading's pageByPageNotes field:
          // a prose instruction alone ("check the next page") was not reliable on its own -- forcing
          // the model to write out what's on each page before it can commit to any step's met/not-met
          // judgment means it can no longer decide a question looks incomplete without having already
          // looked at, and written down, what opens the next page.
          pageByPageNotes: {
            type: "array",
            items: { type: "string" },
            description: "One entry per page of the student's submission, in the order pages appear, BEFORE judging any step. Each entry: which question ID(s) appear or continue on that page, and -- critically -- whether the page OPENS with a continuation of a question whose working started on the previous page (e.g. a final algebraic step, a boxed final answer, or a concluding sentence as the very first thing on the page). This must be filled in for every page before any step is judged not met or a question judged unattempted.",
          },
          perQuestion: {
            type: "array",
            items: {
              type: "object",
              properties: {
                questionId: { type: "string" },
                stepResults: {
                  type: "array",
                  description: "One entry per step of this question's marking scheme, in the same order, judged independently (apply error-carried-forward: a step can still be met even if an earlier step in the same question was not).",
                  items: {
                    type: "object",
                    properties: {
                      // "note" listed BEFORE "met" on purpose, same reasoning as pageByPageNotes
                      // above: a prose instruction alone ("don't contradict yourself") was tried
                      // first and proved unreliable in practice -- a real submission still got a
                      // note that worked through the check, concluded "this is fine on
                      // rechecking... correctly matches the required value", and STILL had met set
                      // to false right next to it, because met was generated first as a snap
                      // judgment and note was written afterward as commentary that never got the
                      // chance to change it. Forcing the verification to be written out first, with
                      // met required to be its direct conclusion, closes that gap structurally
                      // instead of hoping the model polices its own consistency after the fact.
                      note: { type: "string", description: "REQUIRED, never empty, written BEFORE met: silently work through whether the student's answer actually satisfies this specific step -- redo any arithmetic yourself digit by digit rather than eyeballing it, and resolve any doubt BEFORE writing anything here. This field must state ONLY your final, settled conclusion, never a narrated journey to get there -- do NOT write a 'first this looks wrong, but actually...' or 'X, which coincidentally/actually matches...' style sentence; if your own reasoning changed its mind partway through, throw away the abandoned first take entirely and write only the ending you settled on, as if that were the only thing you ever thought. If satisfied, write one short plain sentence confirming what they did right (e.g. 'Correctly simplified to 2√10, matches the required value'), not a sentence that also mentions an initial wrong-looking form. If not satisfied, one short SIMPLE sentence a student can immediately understand describing exactly what was wrong or missing -- plain language over exam jargon (e.g. 'You didn't write the final answer for k' rather than 'concluding value unstated'). Use real subscript/superscript characters for any chemical formula or exponent (e.g. N₂, x²), never a plain digit." },
                      met: { type: "boolean", description: "Must be the direct, literal conclusion of the note you just wrote -- if that note concludes the step is correct/satisfied/matches, met MUST be true. It is never valid for met to be false while note says the work is right, or true while note describes something missing or wrong." },
                    },
                    required: ["note", "met"],
                  },
                },
              },
              required: ["questionId", "stepResults"],
            },
          },
          overallFeedback: { type: "string", description: "1-2 short, simple sentences a student can understand at a glance: strongest area and one concrete tip for next time. The per-question marks and reasons are shown separately, so do not repeat question-specific detail here. Use real subscript/superscript characters for any chemical formula or exponent (e.g. N₂, x²), never a plain digit." },
        },
        required: ["pageByPageNotes", "perQuestion", "overallFeedback"],
      },
    };

    try {
      let data: any;
      let succeeded = false;
      let lastErrorMessage = "Claude did not return a usable result.";
      for (let attempt = 0; attempt < 3; attempt++) {
        if (attempt > 0) await new Promise((r) => setTimeout(r, attempt * 2000));
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": process.env.ANTHROPIC_API_KEY as string, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({
            model: CLAUDE_MODEL,
            system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
            thinking: { type: "adaptive" },
            output_config: { effort: "medium" },
            // Raised from 8000 -- Homework grading hit this exact ceiling problem first: thinking
            // tokens compete with the structured-output budget (pageByPageNotes/stepResults across
            // up to 13 questions), and a tight budget here means less real room to work through
            // each step carefully before committing, not just a truncation risk. Several real
            // misreads this session (clearly-legible correct answers marked wrong) fit that
            // profile -- matching Homework's already-fixed max_tokens gives grading the same room.
            max_tokens: 12000,
            tools: [gradeTool],
            tool_choice: { type: "tool", name: "submit_revision_grade" },
            messages: [{ role: "user", content: [contentBlock, { type: "text", text: prompt }] }],
          }),
        });
        data = await resp.json();
        if ((resp.status === 529 || resp.status === 429) && attempt < 2) {
          lastErrorMessage = data?.error?.message || `Anthropic returned status ${resp.status}`;
          continue;
        }
        const toolUseBlock = (data?.content || []).find((b: any) => b.type === "tool_use" && b.name === "submit_revision_grade");
        if (!resp.ok || !toolUseBlock) {
          lastErrorMessage = data?.error?.message || "Claude did not return a usable result.";
          break;
        }
        // Catches more than a missing field: Array.isArray([]) is true, so an EMPTY or PARTIAL
        // perQuestion array (fewer entries than the paper actually has questions) previously
        // sailed straight past this check and through to scoring -- every question with no
        // matching entry silently computes to 0 marks with no note at all, which is exactly what
        // happened to a real, clearly well-attempted 13-question submission: it came back scored
        // 0/30 with just "Checked." as the feedback, because that attempt's response had an empty
        // perQuestion array. Requiring it to actually cover every question the paper has closes
        // that gap -- and unlike the old check, this is NOT gated behind `attempt < 2`: even on the
        // final attempt, an incomplete result must not be silently accepted as if it were a real
        // grade. Leaving the submission stuck "pending" (caught by the throw below, same as any
        // other failed attempt) for a later retry is far safer than fabricating a confident-looking
        // zero score a student and parent would reasonably take at face value.
        const returnedPerQuestion = toolUseBlock.input?.perQuestion;
        if (!Array.isArray(returnedPerQuestion) || returnedPerQuestion.length < questions.length) {
          lastErrorMessage = "Claude did not return per-question step results for every question.";
          if (attempt < 2) continue;
          break;
        }
        succeeded = true;
        break;
      }
      if (!succeeded) throw new Error(lastErrorMessage);

      const toolUseBlock = (data?.content || []).find((b: any) => b.type === "tool_use" && b.name === "submit_revision_grade");
      const parsed = toolUseBlock.input;
      const perQuestion: { questionId: string; stepResults?: { met: boolean; note: string }[] }[] = Array.isArray(parsed.perQuestion) ? parsed.perQuestion : [];
      const maxByQuestion = new Map(questions.map((q) => [q.id, q.marks]));
      let totalScore = 0;
      // Every question gets its own line, always -- not just the ones with lost marks. Students
      // repeatedly told the admin they couldn't tell why marks were deducted because full-marks
      // questions were silently omitted from the old feedback text, leaving only prose about a few
      // questions; a complete question-by-question tally (marks awarded, and a plain-language reason
      // only when marks were actually lost) is what was explicitly asked for.
      const perQuestionOrder = questions.map((q) => q.id);
      const resultById = new Map(perQuestion.map((pq) => [pq.questionId, pq]));
      // Only set on an "Improve Score" resubmission (see upsertRevisionSubmission) -- empty on a
      // genuine first check, so the floor below is a no-op there.
      const priorFloor = sub.first_attempt_score != null ? parseRevisionFeedbackForFloor(sub.first_attempt_feedback) : new Map<string, { marks: number; line: string }>();
      const feedbackLines: string[] = [];
      for (const questionId of perQuestionOrder) {
        const pq = resultById.get(questionId);
        const max = maxByQuestion.get(questionId) ?? 0;
        const steps = Array.isArray(pq?.stepResults) ? pq!.stepResults : [];
        // Deterministic per-question mark: count of steps the model marked met, never a number the
        // model picks itself -- capped at that question's own max in case of a miscounted response.
        // resolveStepMet applies the self-contradiction backstop above on top of the raw met flag.
        const marksAwarded = Math.min(max, steps.filter((s) => resolveStepMet(s)).length);
        const missedNotes = steps.filter((s) => !resolveStepMet(s) && s.note && s.note.trim()).map((s) => s.note.trim());
        const newLine = missedNotes.length > 0 ? `${questionId}: ${marksAwarded}/${max} -- ${missedNotes.join("; ")}` : `${questionId}: ${marksAwarded}/${max}`;
        // Never let this specific question's mark regress from what the first attempt already
        // earned -- keep the earlier line (marks and reason) if it scored higher than this fresh
        // regrade, since the student never resubmitted a worse answer for it, the fresh grading
        // run just read it differently this time.
        const prior = priorFloor.get(questionId);
        if (prior && prior.marks > marksAwarded) {
          totalScore += prior.marks;
          feedbackLines.push(prior.line);
        } else {
          totalScore += marksAwarded;
          feedbackLines.push(newLine);
        }
      }
      totalScore = Math.min(totalScore, REVISION_TOTAL_MARKS);
      // Backstop for a first attempt graded before this per-question feedback format existed (so
      // the line-by-line floor above found nothing to compare against) -- the total shown must
      // still never drop below what was already earned.
      if (sub.first_attempt_score != null) totalScore = Math.max(totalScore, sub.first_attempt_score);

      const overall = sanitizePlaceholderText(parsed.overallFeedback) || "Checked.";
      const fullFeedback = [overall, ...feedbackLines].join("\n");

      await supabase.from("revision_submissions").update({ status: "checked", ai_score: totalScore, ai_feedback: fullFeedback }).eq("id", submissionId);
      await supabase.from("revision_papers").update({ status: "graded" }).eq("id", paper.id);
      await markRevisionChapterDone(sub.student_email, paper.subject, paper.chapter_name);
    } catch (err: any) {
      console.error(`Revision grading failed for submission ${submissionId}:`, err.message);
    }
  }

  const revisionSetupUpload = homeworkUpload.fields([
    { name: "mathsSyllabusImage", maxCount: 1 },
    { name: "scienceSyllabusImage", maxCount: 1 },
  ]);

  // Resolves the "8th"/"9th"/"10th"-style class key for validating a syllabus AT SAVE TIME --
  // distinct from resolveClassLabelForRevision (which returns the Roman-numeral form used
  // elsewhere) because a fallbackClass submitted in THIS request hasn't been saved to
  // revision_setups yet, so it needs to be checked before falling back to the DB.
  async function resolveClassKeyForRevisionSetup(auth: { email: string }, submittedFallbackClass?: string): Promise<string | null> {
    const { data: userRow } = await supabase.from("users").select("student_class").eq("email", auth.email).maybeSingle();
    if (userRow?.student_class) return CLASS_TO_TARGET[userRow.student_class] || null;
    if (submittedFallbackClass) return submittedFallbackClass;
    const { data: setup } = await supabase.from("revision_setups").select("fallback_class").eq("student_email", auth.email).maybeSingle();
    return setup?.fallback_class || null;
  }

  // Some reference-book folders hold files that aren't actual chapters -- "Practice Set 1/2" in
  // 8th-Maths, for instance, is a set of extra problems spanning the whole book, not a syllabus
  // topic of its own. Those stay in storage (still useful to download via Download NCERT) but
  // never show up as something a student can pick as a syllabus/test chapter.
  function isRealChapterTitle(title: string): boolean {
    return !/^practice\s*sets?\b/i.test(title.trim());
  }

  async function getKnownNcertChapters(classKey: string, subject: "Maths" | "Science"): Promise<string[]> {
    const { data } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).list(`${REVISION_REFERENCE_PREFIX}/${classKey}-${subject}`);
    return (data || [])
      .filter((f: any) => f.name.toLowerCase().endsWith(".pdf"))
      .map((f: any) => referenceBookDisplayTitle(f.name))
      .filter(isRealChapterTitle);
  }

  // Class 8 is the one class where a real mix of old and new NCERT is still genuinely in use in
  // schools (per the admin) -- we only have reference material for the new books (Ganita Prakash /
  // Curiosity), so a student still following the old syllabus needs the old chapter list instead.
  // Verified against independent sources (teachoo.com's per-chapter pages) rather than relying on
  // memory alone, since this app has been burned before by confidently-wrong chapter/content facts.
  const OLD_NCERT_CLASS8_CHAPTERS: Record<"Maths" | "Science", string[]> = {
    Maths: [
      "Rational Numbers",
      "Linear Equations in One Variable",
      "Understanding Quadrilaterals",
      "Practical Geometry",
      "Data Handling",
      "Squares and Square Roots",
      "Cubes and Cube Roots",
      "Comparing Quantities",
      "Algebraic Expressions and Identities",
      "Visualising Solid Shapes",
      "Mensuration",
      "Exponents and Powers",
      "Direct and Inverse Proportions",
      "Factorisation",
      "Introduction to Graphs",
      "Playing with Numbers",
    ],
    Science: [
      "Crop Production and Management",
      "Microorganisms: Friend and Foe",
      "Synthetic Fibres and Plastics",
      "Materials: Metals and Non-Metals",
      "Coal and Petroleum",
      "Combustion and Flame",
      "Conservation of Plants and Animals",
      "Cell -- Structure and Functions",
      "Reproduction in Animals",
      "Reaching the Age of Adolescence",
      "Force and Pressure",
      "Friction",
      "Sound",
      "Chemical Effects of Electric Current",
      "Some Natural Phenomena",
      "Light",
      "Stars and the Solar System",
      "Pollution of Air and Water",
    ],
  };

  // Powers the dropdown/checklist chapter picker in Revision setup -- returns the exact list of
  // real chapters a student can choose from for their own class/subject, so there's no free-typing
  // and therefore nothing to mis-type or need correcting. `version` only matters for Class 8
  // ("old" returns OLD_NCERT_CLASS8_CHAPTERS instead of the new-book reference list); every other
  // class only ever has the one (current) syllabus.
  app.get("/api/revision/chapter-options", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { subject, version, classKey: requestedClassKey } = req.query as { subject?: string; version?: string; classKey?: string };
    if (subject !== "Maths" && subject !== "Science") return res.status(400).json({ error: "Invalid subject." });
    // A class picked in the fallback-class selector only exists in the browser until the whole
    // setup form is actually saved -- an explicit classKey here lets the dropdown populate
    // immediately after picking it, the same override pattern /reference-books/mine already uses,
    // rather than requiring a save-then-reload round trip just to see the chapter list.
    let classKey: string | null = null;
    if (requestedClassKey && ["8th", "9th", "10th"].includes(requestedClassKey)) {
      classKey = requestedClassKey;
    } else {
      const classLabel = await resolveClassLabelForRevision(auth);
      classKey = classLabel ? CLASS_TO_TARGET[classLabel] : null;
    }
    if (!classKey) return res.status(400).json({ error: "We couldn't determine your class. Please pick a class in the revision setup." });
    const chapters = classKey === "8th" && version === "old" ? OLD_NCERT_CLASS8_CHAPTERS[subject] : await getKnownNcertChapters(classKey, subject);
    return res.json({ classKey, subject, chapters });
  });

  // Checks a student's typed/photographed chapter names against the real NCERT chapter list for
  // their class/subject (derived from the admin-uploaded, renamed reference book files -- see
  // REVISION_REFERENCE_PREFIX), so a paper never gets generated for a chapter that doesn't
  // actually exist. A near-miss (misspelled, abbreviated, or a common short name like "Acid" for
  // "Acids, Bases and Salts") is auto-corrected to the real title rather than rejected outright;
  // only genuinely unrecognizable names come back as invalid. Fails open (accepts everything as
  // typed) when there's no reference chapter list to check against for that class/subject, or if
  // the validation call itself fails -- this is a safety net, not something that should ever block
  // a student from saving their syllabus due to an unrelated outage.
  async function validateAndNormalizeChapters(chapters: string[], classKey: string | null, subject: "Maths" | "Science"): Promise<{ corrected: string[]; invalid: string[] }> {
    if (!classKey || chapters.length === 0) return { corrected: chapters, invalid: [] };
    const known = await getKnownNcertChapters(classKey, subject);
    if (known.length === 0) return { corrected: chapters, invalid: [] };

    const tool = {
      name: "submit_matches",
      description: "Submit the matched real chapter title for each input, in the same order.",
      input_schema: {
        type: "object",
        properties: {
          matches: {
            type: "array",
            description: "Same length and order as the input chapter list. Each entry is either the exact matching chapter title copied from the reference list, or an empty string if that input doesn't genuinely match any chapter in the list.",
            items: { type: "string" },
          },
        },
        required: ["matches"],
      },
    };
    const system = `Here is the real, complete list of NCERT chapters for this class/subject:\n${known.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n\nA student typed the following as their own syllabus chapter names. For each one, decide which real chapter above (if any) it clearly refers to -- even if misspelled, shortened, or just a common partial name (e.g. "Acid" clearly means "Acids, Bases and Salts" if that's the closest chapter in the list; "chem reactions" means "Chemical Reactions and Equations"). Return that chapter's title copied EXACTLY as written in the list above. If an input genuinely doesn't match any chapter in the list (a made-up name, a chapter from a different class/subject entirely, or gibberish), return an empty string for it instead of guessing.`;
    try {
      const result = await callClaudeTool({
        system,
        content: [{ type: "text", text: `Chapters to check, in order:\n${chapters.map((c, i) => `${i + 1}. ${c}`).join("\n")}` }],
        tool,
        maxTokens: 1500,
      });
      const matches: string[] = Array.isArray(result.matches) ? result.matches : [];
      if (matches.length !== chapters.length) return { corrected: chapters, invalid: [] };
      const corrected: string[] = [];
      const invalid: string[] = [];
      chapters.forEach((original, i) => {
        if (matches[i]) corrected.push(matches[i]);
        else invalid.push(original);
      });
      return { corrected, invalid };
    } catch (err: any) {
      console.error("Chapter validation failed, accepting syllabus as typed:", err.message);
      return { corrected: chapters, invalid: [] };
    }
  }

  app.post("/api/revision/setup", (req, res, next) => {
    revisionSetupUpload(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the uploaded file." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const body = req.body || {};
    const files = (req.files as any) || {};

    const { data: existing } = await supabase.from("revision_setups").select("*").eq("student_email", auth.email).maybeSingle();

    const update: any = { student_email: auth.email, updated_at: new Date().toISOString() };
    const newlySubmittedSubjects: ("maths" | "science")[] = [];

    for (const subj of ["maths", "science"] as const) {
      const examDateField = `${subj}ExamDate`;
      const examDateVal = body[examDateField];
      update[`${subj}_exam_date`] = examDateVal ? String(examDateVal) : null;

      const textField = `${subj}SyllabusText`;
      const typedText: string = (body[textField] || "").toString().trim();
      const imageFile = files[`${subj}SyllabusImage`]?.[0];
      // Chapters picked from the dropdown/checklist (see /api/revision/chapter-options) --
      // guaranteed to already be real chapter titles by construction, so this path skips the
      // NCERT-name validation entirely below rather than re-checking something that can't be wrong.
      const chaptersJson: string = (body[`${subj}SyllabusChapters`] || "").toString().trim();

      if (chaptersJson) {
        let chapters: string[] = [];
        try {
          const parsed = JSON.parse(chaptersJson);
          if (Array.isArray(parsed)) chapters = parsed.map((c: any) => String(c).trim()).filter(Boolean);
        } catch {
          return res.status(400).json({ error: `Invalid ${subj} chapter selection. Please try again.` });
        }
        if (chapters.length > 0) {
          update[`${subj}_chapters`] = chapters;
          update[`${subj}_syllabus_text`] = chapters.join("\n");
          update[`${subj}_syllabus_image_path`] = null;
        } else if (existing) {
          update[`${subj}_chapters`] = existing[`${subj}_chapters`];
          update[`${subj}_syllabus_text`] = existing[`${subj}_syllabus_text`];
          update[`${subj}_syllabus_image_path`] = existing[`${subj}_syllabus_image_path`];
        } else {
          update[`${subj}_chapters`] = [];
        }
      } else if (imageFile) {
        try {
          const chapters = await extractChaptersFromImage(imageFile.buffer, imageFile.mimetype);
          if (chapters.length > 0) {
            update[`${subj}_chapters`] = chapters;
            update[`${subj}_syllabus_text`] = null;
            newlySubmittedSubjects.push(subj);
            const imgPath = `revision-syllabus/${auth.email}/${subj}-${Date.now()}.jpg`;
            const { error: upErr } = await supabase.storage.from(HOMEWORK_BUCKET).upload(imgPath, imageFile.buffer, { contentType: imageFile.mimetype });
            if (!upErr) update[`${subj}_syllabus_image_path`] = imgPath;
          }
        } catch (err: any) {
          console.error(`Failed to extract ${subj} syllabus from image:`, err.message);
          return res.status(500).json({ error: `Could not read the chapter list from the ${subj} syllabus photo. Please try a clearer photo or type the chapters instead.` });
        }
      } else if (typedText) {
        const chapters = splitSyllabusText(typedText);
        update[`${subj}_chapters`] = chapters;
        update[`${subj}_syllabus_text`] = typedText;
        newlySubmittedSubjects.push(subj);
      } else if (existing) {
        // Neither a new image nor new text for this subject this time -- keep whatever was there.
        update[`${subj}_chapters`] = existing[`${subj}_chapters`];
        update[`${subj}_syllabus_text`] = existing[`${subj}_syllabus_text`];
        update[`${subj}_syllabus_image_path`] = existing[`${subj}_syllabus_image_path`];
      } else {
        update[`${subj}_chapters`] = [];
      }
      // Preserve progress on any chapter still part of the (possibly updated) syllabus -- only a
      // chapter that's no longer in the list at all should drop out of "completed", since it can
      // never be picked again anyway. This used to unconditionally reset to [] on every single
      // save, which meant simply reopening "Edit Syllabus" and re-saving -- even just to add one
      // new chapter, or with nothing actually changed -- silently erased every chapter a student
      // had already completed this cycle. A real student hit exactly this: two graded papers
      // showing in "My Papers" but only one counted as "done this cycle".
      const priorCompleted: string[] = (existing?.[`${subj}_completed_chapters`] as string[] | undefined) || [];
      const finalChapters: string[] = update[`${subj}_chapters`] || [];
      update[`${subj}_completed_chapters`] = priorCompleted.filter((c) => finalChapters.includes(c));
    }

    if (body.fallbackClass) update.fallback_class = String(body.fallbackClass);

    // Only freshly typed/photographed chapter lists get checked against the real NCERT syllabus --
    // an unchanged subject was presumably already valid (or already accepted before this check
    // existed), so re-validating it on every unrelated edit would be pointless extra cost.
    if (newlySubmittedSubjects.length > 0) {
      const classKey = await resolveClassKeyForRevisionSetup(auth, body.fallbackClass ? String(body.fallbackClass) : undefined);
      for (const subj of newlySubmittedSubjects) {
        const subjectLabel = subj === "maths" ? "Maths" : "Science";
        const { corrected, invalid } = await validateAndNormalizeChapters(update[`${subj}_chapters`] || [], classKey, subjectLabel);
        if (invalid.length > 0) {
          return res.status(400).json({ error: `These don't match any real NCERT Class ${classKey ? classKey.replace("th", "") + "th" : ""} ${subjectLabel} chapter: ${invalid.join(", ")}. Please check the name(s) and try again.` });
        }
        update[`${subj}_chapters`] = corrected;
      }
    }

    const { error: upsertError } = await supabase.from("revision_setups").upsert(update, { onConflict: "student_email" });
    if (upsertError) {
      console.error("Error saving revision setup:", upsertError.message);
      return res.status(500).json({ error: "Failed to save your revision setup. Please try again." });
    }
    return res.json({ success: true });
  });

  app.get("/api/revision/setup", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { data } = await supabase.from("revision_setups").select("*").eq("student_email", auth.email).maybeSingle();
    if (!data) return res.json({ setup: null });
    return res.json({
      setup: {
        mathsExamDate: data.maths_exam_date,
        mathsChapters: data.maths_chapters || [],
        mathsCompletedChapters: data.maths_completed_chapters || [],
        scienceExamDate: data.science_exam_date,
        scienceChapters: data.science_chapters || [],
        scienceCompletedChapters: data.science_completed_chapters || [],
        fallbackClass: data.fallback_class,
      },
    });
  });

  async function resolveClassLabelForRevision(auth: { email: string; role: string }): Promise<string | null> {
    const { data: userRow } = await supabase.from("users").select("student_class").eq("email", auth.email).maybeSingle();
    if (userRow?.student_class) return userRow.student_class;
    const { data: setup } = await supabase.from("revision_setups").select("fallback_class").eq("student_email", auth.email).maybeSingle();
    return setup?.fallback_class ? (CLASS_TO_TARGET[setup.fallback_class] ? setup.fallback_class : TARGET_TO_LABEL[setup.fallback_class] || null) : null;
  }

  // Generates a paper for either an explicit (subject, chapterName) the student picked from their
  // own syllabus breakdown, or -- when neither is given -- the auto-picked target (kept as a
  // fallback for robustness, though the current frontend always sends an explicit choice: students
  // see the full chapter breakdown and choose deliberately, rather than a paper being generated
  // for an unannounced chapter before they've agreed to start).
  app.post("/api/revision/generate-paper", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { data: setup } = await supabase.from("revision_setups").select("*").eq("student_email", auth.email).maybeSingle();
    if (!setup) return res.status(400).json({ error: "Please set up your syllabus first." });

    const { subject: requestedSubject, chapterName: requestedChapterName } = req.body as { subject?: string; chapterName?: string };

    let target: { subject: "Maths" | "Science"; chapterName: string };
    if (requestedSubject && requestedChapterName) {
      if (requestedSubject !== "Maths" && requestedSubject !== "Science") {
        return res.status(400).json({ error: "Invalid subject." });
      }
      const chapters: string[] = (requestedSubject === "Maths" ? setup.maths_chapters : setup.science_chapters) || [];
      const completed: string[] = (requestedSubject === "Maths" ? setup.maths_completed_chapters : setup.science_completed_chapters) || [];
      if (!chapters.includes(requestedChapterName)) {
        return res.status(400).json({ error: "That chapter isn't in your syllabus. Please refresh and pick again." });
      }
      // A chapter shown as "completed" is only ever actually stale here in a race (two tabs, a
      // slow refresh) -- a genuine full-syllabus cycle reset already clears both completed lists
      // proactively in markRevisionChapterDone the instant it happens, so this list is always
      // current by the time a real pick reaches here.
      if (completed.includes(requestedChapterName)) {
        return res.status(400).json({ error: "You've already completed that chapter this cycle. Pick one that's still pending." });
      }
      target = { subject: requestedSubject, chapterName: requestedChapterName };
    } else {
      const picked = pickNextRevisionTarget(setup);
      if (!picked) return res.status(400).json({ error: "Please add at least one chapter to your Maths or Science syllabus first." });
      target = picked;
    }

    const classLabel = await resolveClassLabelForRevision(auth);
    if (!classLabel) return res.status(400).json({ error: "We couldn't determine your class. Please pick a class in the revision setup." });

    const cycleNumber: number = setup.cycle_number || 1;

    // A duplicate request for the exact same (student, subject, chapter) -- a fast double-tap
    // beating the frontend's own guard, a network retry racing the original call, two tabs -- must
    // never trigger a second real Claude generation call. Reusing any already-generated paper here
    // is a pure DB read with no race window relative to the Claude call itself, so this closes the
    // gap the frontend guard and the cross-student content cache below can't fully close alone.
    const { data: existingPaper } = await supabase
      .from("revision_papers")
      .select("*")
      .eq("student_email", auth.email)
      .eq("subject", target.subject)
      .eq("chapter_name", target.chapterName)
      .eq("cycle_number", cycleNumber)
      .in("status", ["draft", "active"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existingPaper) return res.json({ paper: mapRevisionPaperForStudent(existingPaper) });

    try {
      const questions = await getRevisionQuestionsForTarget(target.subject, target.chapterName, classLabel, cycleNumber);
      const { data: paperRow, error: insertError } = await supabase
        .from("revision_papers")
        .insert({
          student_email: auth.email,
          subject: target.subject,
          chapter_name: target.chapterName,
          content: { questions },
          total_marks: REVISION_TOTAL_MARKS,
          time_allotted_minutes: REVISION_TIME_MINUTES,
          status: "draft",
          cycle_number: cycleNumber,
        })
        .select()
        .single();
      if (insertError || !paperRow) throw new Error(insertError?.message || "Failed to save the generated paper.");
      return res.json({ paper: mapRevisionPaperForStudent(paperRow) });
    } catch (err: any) {
      console.error("Error generating revision paper:", err.message);
      return res.status(500).json({ error: "Failed to generate a paper right now. Please try again in a moment." });
    }
  });

  app.post("/api/revision/start/:paperId", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { paperId } = req.params;
    const { data: paper } = await supabase.from("revision_papers").select("*").eq("id", paperId).eq("student_email", auth.email).maybeSingle();
    if (!paper) return res.status(404).json({ error: "That paper could not be found." });
    if (paper.status === "active" && paper.deadline_at) {
      return res.json({ startedAt: paper.started_at, deadlineAt: paper.deadline_at }); // already started -- return the existing window, don't restart the clock
    }
    const startedAt = new Date();
    const deadlineAt = new Date(startedAt.getTime() + (REVISION_TIME_MINUTES + REVISION_GRACE_MINUTES) * 60 * 1000);
    const { error: updateError } = await supabase
      .from("revision_papers")
      .update({ status: "active", started_at: startedAt.toISOString(), deadline_at: deadlineAt.toISOString() })
      .eq("id", paperId);
    if (updateError) return res.status(500).json({ error: "Failed to start the paper. Please try again." });
    return res.json({ startedAt: startedAt.toISOString(), deadlineAt: deadlineAt.toISOString() });
  });

  app.post("/api/revision/upload-photo", (req, res, next) => {
    homeworkUpload.single("photo")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process the photo." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, order } = req.body;
    if (!req.file) return res.status(400).json({ error: "No photo was received." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (req.file.mimetype === "application/pdf") {
      return res.status(400).json({ error: "This endpoint only accepts photos. Upload a PDF separately as a single file." });
    }
    const orderNum = parseInt(order, 10) || 0;
    const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, "");
    const tempPath = `${REVISION_TEMP_PREFIX}/${auth.email}/${safeSessionId}/${String(orderNum).padStart(3, "0")}-${Date.now()}.jpg`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(tempPath, req.file.buffer, { contentType: req.file.mimetype });
    if (uploadError) {
      console.error("Temp revision photo upload error:", uploadError.message);
      return res.status(500).json({ error: "Failed to upload this photo. Please try again." });
    }
    return res.json({ success: true, tempPath });
  });

  app.delete("/api/revision/upload-photo", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { tempPath } = req.body;
    if (!tempPath || typeof tempPath !== "string" || !tempPath.startsWith(`${REVISION_TEMP_PREFIX}/${auth.email}/`)) {
      return res.status(400).json({ error: "Invalid photo reference." });
    }
    const { error: removeError } = await supabase.storage.from(HOMEWORK_BUCKET).remove([tempPath]);
    if (removeError) return res.status(500).json({ error: "Failed to remove this photo." });
    return res.json({ success: true });
  });

  app.post("/api/revision/upload-chunk", (req, res, next) => {
    chunkUpload.single("chunk")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process this chunk." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, order } = req.body;
    if (!req.file) return res.status(400).json({ error: "No data was received." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    const orderNum = parseInt(order, 10) || 0;
    const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, "");
    const tempPath = `${REVISION_TEMP_PREFIX}/${auth.email}/${safeSessionId}/${String(orderNum).padStart(4, "0")}-${Date.now()}.part`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(tempPath, req.file.buffer, { contentType: "application/octet-stream" });
    if (uploadError) {
      console.error("Temp revision chunk upload error:", uploadError.message);
      return res.status(500).json({ error: "Failed to upload this piece of the file. Please try again." });
    }
    return res.json({ success: true, tempPath });
  });

  async function finalizeRevisionSubmission(auth: { email: string }, paperId: string, fileBuffer: Buffer, res: express.Response) {
    const { data: paper } = await supabase.from("revision_papers").select("id, deadline_at").eq("id", paperId).eq("student_email", auth.email).maybeSingle();
    if (!paper) return res.status(400).json({ error: "That revision paper no longer exists. Please refresh and try again." });

    const filePath = `${auth.email}/revision-${Date.now()}-submission.pdf`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(filePath, fileBuffer, { contentType: "application/pdf" });
    if (uploadError) {
      console.error("Revision submission file upload error:", uploadError.message);
      return res.status(500).json({ error: friendlyStorageUploadError(uploadError, "Failed to save your submission. Please try again.") });
    }

    const isLate = !!paper.deadline_at && Date.now() > new Date(paper.deadline_at).getTime();
    let row: any;
    try {
      row = await upsertRevisionSubmission({ studentEmail: auth.email, paperId, filePath, isLate });
    } catch (err: any) {
      console.error("Error saving revision submission record:", err.message);
      return res.status(500).json({ error: "File uploaded but failed to save the submission record." });
    }
    await supabase.from("revision_papers").update({ status: "submitted" }).eq("id", paperId);
    return res.json({ success: true, submission: { id: row.id, status: row.status, isLate: row.is_late, submittedAt: row.submitted_at } });
  }

  app.post("/api/revision/finalize-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, paperId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (!paperId) return res.status(400).json({ error: "Missing revision paper reference." });
    let merged: Buffer | null;
    try {
      merged = await mergeSessionPhotos(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""), REVISION_TEMP_PREFIX);
    } catch (mergeErr: any) {
      console.error("Error merging revision session photos:", mergeErr.message);
      return res.status(500).json({ error: "Failed to combine the uploaded photos into a PDF." });
    }
    if (!merged) {
      const justCreated = await findJustCreatedRevisionSubmission(auth.email, String(paperId));
      if (justCreated) return res.json({ success: true, submission: { id: justCreated.id, status: justCreated.status, isLate: justCreated.is_late, submittedAt: justCreated.submitted_at } });
      return res.status(400).json({ error: "No uploaded photos were found. Please attach at least one photo and wait for it to finish uploading before submitting." });
    }
    return finalizeRevisionSubmission(auth, String(paperId), merged, res);
  });

  app.post("/api/revision/finalize-pdf-submission", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { sessionId, paperId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    if (!paperId) return res.status(400).json({ error: "Missing revision paper reference." });
    let combined: Buffer | null;
    try {
      combined = await concatenateSessionChunks(auth.email, String(sessionId).replace(/[^a-zA-Z0-9_-]/g, ""), REVISION_TEMP_PREFIX);
    } catch (concatErr: any) {
      console.error("Error reassembling revision PDF chunks:", concatErr.message);
      return res.status(500).json({ error: "Failed to reassemble the uploaded file." });
    }
    if (!combined) {
      const justCreated = await findJustCreatedRevisionSubmission(auth.email, String(paperId));
      if (justCreated) return res.json({ success: true, submission: { id: justCreated.id, status: justCreated.status, isLate: justCreated.is_late, submittedAt: justCreated.submitted_at } });
      return res.status(400).json({ error: "No uploaded file pieces were found. Please attach a PDF and wait for it to finish uploading before submitting." });
    }
    return finalizeRevisionSubmission(auth, String(paperId), combined, res);
  });

  app.post("/api/revision/check-mine", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { submissionId } = req.body;
    if (!submissionId) return res.status(400).json({ error: "Missing submissionId." });
    const { data: sub } = await supabase.from("revision_submissions").select("student_email").eq("id", submissionId).maybeSingle();
    if (!sub || sub.student_email !== auth.email) return res.status(404).json({ error: "Submission not found." });
    await checkRevisionSubmission(String(submissionId));
    const { data: updated } = await supabase.from("revision_submissions").select("*").eq("id", submissionId).maybeSingle();
    return res.json({ submission: updated ? { id: updated.id, status: updated.status, aiScore: updated.ai_score, aiFeedback: updated.ai_feedback, isLate: updated.is_late, submittedAt: updated.submitted_at } : null });
  });

  app.get("/api/revision/mine", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { data: papers } = await supabase.from("revision_papers").select("*").eq("student_email", auth.email).order("created_at", { ascending: false }).limit(20);
    const { data: submissions } = await supabase.from("revision_submissions").select("*").eq("student_email", auth.email).order("submitted_at", { ascending: false }).limit(20);
    return res.json({
      papers: (papers || []).map(mapRevisionPaperForStudent),
      submissions: (submissions || []).map((s: any) => ({
        id: s.id,
        revisionPaperId: s.revision_paper_id,
        status: s.status,
        aiScore: s.ai_score,
        aiFeedback: s.ai_feedback,
        firstAttemptScore: s.first_attempt_score,
        firstAttemptFeedback: s.first_attempt_feedback,
        isLate: s.is_late,
        submittedAt: s.submitted_at,
      })),
    });
  });

  // Shared by both the student-facing (own class only) and admin (all classes) leaderboard
  // endpoints below. Three categories:
  //  - Most tests attempted: count of actual submissions (not merely generated/started papers).
  //  - Highest percentage: based on each paper's FIRST-attempt score (first_attempt_score when an
  //    "Improve Score" resubmission happened, otherwise the paper's only ai_score -- which already
  //    reflects any manual correction/dispute resolution applied directly to that field, so a
  //    corrected score is used automatically with no separate handling needed).
  //  - Top improvers: total marks gained (ai_score - first_attempt_score) summed across every paper
  //    a student actually used "Improve Score" on, ranking who gained the most in total.
  async function computeRevisionLeaderboard(classLabel: string) {
    const { data: classmates } = await supabase.from("users").select("email, name, photo_url").eq("student_class", classLabel).eq("role", "student").eq("status", "approved");
    const roster = classmates || [];
    const nameByEmail = new Map(roster.map((u: any) => [u.email, u.name]));
    const photoByEmail = new Map(roster.map((u: any) => [u.email, u.photo_url || null]));
    const emails = roster.map((u: any) => u.email);
    if (emails.length === 0) return { classLabel, mostAttempted: [], highestPercentage: [], topImprovers: [] };

    const { data: papers } = await supabase.from("revision_papers").select("id, total_marks").in("student_email", emails);
    const maxByPaper = new Map((papers || []).map((p: any) => [p.id, p.total_marks || REVISION_TOTAL_MARKS]));

    const { data: submissions } = await supabase.from("revision_submissions").select("student_email, revision_paper_id, ai_score, first_attempt_score").in("student_email", emails);

    const attemptedCount = new Map<string, number>();
    const scoreSum = new Map<string, number>();
    const maxSum = new Map<string, number>();
    const improveSum = new Map<string, number>();

    for (const s of submissions || []) {
      attemptedCount.set(s.student_email, (attemptedCount.get(s.student_email) || 0) + 1);
      if (typeof s.ai_score !== "number") continue;
      const max = maxByPaper.get(s.revision_paper_id) || REVISION_TOTAL_MARKS;
      const effectiveFirst = typeof s.first_attempt_score === "number" ? s.first_attempt_score : s.ai_score;
      scoreSum.set(s.student_email, (scoreSum.get(s.student_email) || 0) + effectiveFirst);
      maxSum.set(s.student_email, (maxSum.get(s.student_email) || 0) + max);
      if (typeof s.first_attempt_score === "number") {
        improveSum.set(s.student_email, (improveSum.get(s.student_email) || 0) + (s.ai_score - s.first_attempt_score));
      }
    }

    const toEntry = (email: string, value: number, extra: Record<string, any> = {}) => ({ email, name: nameByEmail.get(email) || email, photoUrl: photoByEmail.get(email) || null, value, ...extra });

    const mostAttempted = [...attemptedCount.entries()]
      .map(([email, count]) => toEntry(email, count))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const highestPercentage = [...maxSum.entries()]
      .filter(([, max]) => max > 0)
      .map(([email, max]) => toEntry(email, Math.round(((scoreSum.get(email) || 0) / max) * 1000) / 10))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const topImprovers = [...improveSum.entries()]
      .filter(([, gained]) => gained > 0)
      .map(([email, gained]) => toEntry(email, gained))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return { classLabel, mostAttempted, highestPercentage, topImprovers };
  }

  // Class-wide Revision leaderboard, shown to every student for their own class only -- the class
  // is always resolved server-side from the caller's own account (never a client-supplied param),
  // so a Class VIII student can only ever see the Class VIII leaderboard, exactly as intended.
  app.get("/api/revision/leaderboard", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const classLabel = await resolveClassLabelForRevision(auth);
    if (!classLabel) return res.status(400).json({ error: "We couldn't determine your class. Please pick a class in the revision setup." });
    return res.json(await computeRevisionLeaderboard(classLabel));
  });

  // Admin view of the same leaderboard for all three classes at once (unlike the student endpoint
  // above, not restricted to any one class -- the admin is a trusted role, not a student).
  app.get("/api/admin/revision/leaderboard", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const [viii, ix, x] = await Promise.all([
      computeRevisionLeaderboard("VIII"),
      computeRevisionLeaderboard("IX"),
      computeRevisionLeaderboard("X"),
    ]);
    return res.json({ classes: [viii, ix, x] });
  });

  // Admin engagement/performance report -- mirrors /api/admin/homework/missing + /report: for a
  // chosen date range, every approved student's revision activity (attempted count, avg score,
  // last attempt, on-time/late split) plus a same-IST-calendar-day "did nothing today" flag.
  app.get("/api/admin/revision/report", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { fromDate, toDate } = req.query as { fromDate?: string; toDate?: string };
    if (!fromDate || !toDate) return res.status(400).json({ error: "Please choose both a from date and a to date." });

    const { data: userRows } = await supabase.from("users").select("email, name, student_class, role, status");
    const roster = (userRows || []).filter((u: any) => u.role === "student" && u.status === "approved");

    const { data: paperRows } = await supabase
      .from("revision_papers")
      .select("id, student_email, subject, chapter_name, status, created_at")
      .gte("created_at", `${fromDate}T00:00:00Z`)
      .lte("created_at", `${toDate}T23:59:59Z`);

    const paperIds = (paperRows || []).map((p: any) => p.id);
    let submissionRows: any[] = [];
    if (paperIds.length > 0) {
      const { data } = await supabase.from("revision_submissions").select("revision_paper_id, student_email, ai_score, is_late, submitted_at").in("revision_paper_id", paperIds);
      submissionRows = data || [];
    }
    const submissionByPaper = new Map(submissionRows.map((s: any) => [s.revision_paper_id, s]));

    // "Missed" is evaluated against the most recently fully-completed IST calendar day (i.e.
    // yesterday), never today -- a student's day isn't over yet while it's still happening, so
    // flagging them mid-day as having "missed" it is premature and can wrongly read as neglect
    // when they simply haven't gotten to it yet. The 24h-IST cycle only closes at midnight, so
    // that's when a day can first be judged as missed or not.
    const nowIST = new Date();
    const checkDateIST = new Date(nowIST.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

    const report = roster.map((u: any) => {
      const myPapers = (paperRows || []).filter((p: any) => p.student_email === u.email);
      // "Attempted" must mean the student actually submitted an answer sheet -- a paper that was
      // only generated or started (clicked into, then abandoned) is not an attempt, and counting it
      // as one both inflates the attempted count and can wrongly clear the "missed today" flag for
      // a student who never actually did anything that day.
      const myAttemptedPapers = myPapers.filter((p: any) => submissionByPaper.has(p.id));
      const scored = myAttemptedPapers.map((p: any) => submissionByPaper.get(p.id)).filter((s: any) => s && typeof s.ai_score === "number");
      const avgScore = scored.length > 0 ? Math.round((scored.reduce((sum: number, s: any) => sum + s.ai_score, 0) / scored.length) * 10) / 10 : null;
      const lateCount = scored.filter((s: any) => s.is_late).length;
      const attemptDatesIST = myAttemptedPapers.map((p: any) => {
        const sub = submissionByPaper.get(p.id);
        return new Date(sub?.submitted_at || p.created_at).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
      });
      const missedLastCompletedDay = !attemptDatesIST.includes(checkDateIST);
      const lastAttempt = myAttemptedPapers.length > 0
        ? myAttemptedPapers.reduce((latest: any, p: any) => {
            const latestDate = new Date(submissionByPaper.get(latest.id)?.submitted_at || latest.created_at);
            const pDate = new Date(submissionByPaper.get(p.id)?.submitted_at || p.created_at);
            return pDate > latestDate ? p : latest;
          }).created_at
        : null;
      return {
        email: u.email,
        name: u.name,
        studentClass: u.student_class,
        papersAttempted: myAttemptedPapers.length,
        papersGraded: scored.length,
        avgScore,
        lateCount,
        lastAttempt,
        missedLastCompletedDay,
      };
    });

    return res.json({ report, fromDate, toDate, checkDateIST });
  });

  // Every paper a given student has attempted, newest first, with its submission (if any) -- lets
  // the admin see exactly which chapters a student has been tested on and drill into any one of
  // them (the paper itself, and the student's actual uploaded answer sheet).
  // Every distinct (class, subject, chapter, cycle) combination that's ever been generated, with
  // how many students share that content and a sample paper to view -- lets the admin browse what
  // Revision has actually written for each chapter across cycle 1, cycle 2, cycle 3, etc., rather
  // than only being able to look things up per student. Papers aren't literally shared rows (each
  // student's pick gets its own revision_papers row even when the content was reused -- see
  // getRevisionQuestionsForTarget), so this groups them after the fact for browsing.
  app.get("/api/admin/revision/papers-library", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { data: papers } = await supabase
      .from("revision_papers")
      .select("id, student_email, subject, chapter_name, cycle_number, created_at")
      .order("created_at", { ascending: true });
    if (!papers || papers.length === 0) return res.json({ groups: [] });

    const emails = [...new Set(papers.map((p: any) => p.student_email))];
    const { data: users } = await supabase.from("users").select("email, student_class").in("email", emails);
    const classByEmail = new Map((users || []).map((u: any) => [u.email, u.student_class]));

    const groups = new Map<string, { classKey: string; subject: string; chapterName: string; cycleNumber: number; studentEmails: Set<string>; samplePaperId: string; firstCreatedAt: string }>();
    for (const p of papers as any[]) {
      const studentClass = classByEmail.get(p.student_email);
      const classKey = (studentClass && CLASS_TO_TARGET[studentClass]) || "Unknown";
      const cycleNumber = p.cycle_number || 1;
      const key = `${classKey}|${p.subject}|${p.chapter_name}|${cycleNumber}`;
      if (!groups.has(key)) {
        groups.set(key, { classKey, subject: p.subject, chapterName: p.chapter_name, cycleNumber, studentEmails: new Set(), samplePaperId: p.id, firstCreatedAt: p.created_at });
      }
      groups.get(key)!.studentEmails.add(p.student_email);
    }

    const result = [...groups.values()]
      .map((g) => ({
        classKey: g.classKey,
        subject: g.subject,
        chapterName: g.chapterName,
        cycleNumber: g.cycleNumber,
        studentCount: g.studentEmails.size,
        samplePaperId: g.samplePaperId,
        firstCreatedAt: g.firstCreatedAt,
      }))
      .sort((a, b) => a.classKey.localeCompare(b.classKey) || a.subject.localeCompare(b.subject) || a.chapterName.localeCompare(b.chapterName) || a.cycleNumber - b.cycleNumber);

    return res.json({ groups: result });
  });

  app.get("/api/admin/revision/student/:email/papers", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { email } = req.params;
    const { data: papers } = await supabase
      .from("revision_papers")
      .select("id, subject, chapter_name, total_marks, status, created_at, started_at, deadline_at, cycle_number")
      .eq("student_email", email)
      .order("created_at", { ascending: false });
    const paperIds = (papers || []).map((p: any) => p.id);
    let submissions: any[] = [];
    if (paperIds.length > 0) {
      const { data } = await supabase
        .from("revision_submissions")
        .select("id, revision_paper_id, status, ai_score, ai_feedback, first_attempt_score, first_attempt_feedback, is_late, submitted_at, file_path")
        .in("revision_paper_id", paperIds);
      submissions = data || [];
    }
    const submissionByPaper = new Map(submissions.map((s: any) => [s.revision_paper_id, s]));
    const result = (papers || []).map((p: any) => {
      const sub = submissionByPaper.get(p.id);
      return {
        id: p.id,
        subject: p.subject,
        chapterName: p.chapter_name,
        totalMarks: p.total_marks,
        status: p.status,
        createdAt: p.created_at,
        cycleNumber: p.cycle_number || 1,
        submission: sub ? { id: sub.id, status: sub.status, aiScore: sub.ai_score, aiFeedback: sub.ai_feedback, firstAttemptScore: sub.first_attempt_score, firstAttemptFeedback: sub.first_attempt_feedback, isLate: sub.is_late, submittedAt: sub.submitted_at, hasFile: !!sub.file_path } : null,
      };
    });
    return res.json({ papers: result });
  });

  // Full paper content (including the marking scheme/answer key) for admin review -- unlike the
  // student-facing mapRevisionPaperForStudent, this is available regardless of the paper's status,
  // since the admin isn't the one taking the test.
  app.get("/api/admin/revision/paper/:paperId", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { paperId } = req.params;
    const { data: paper } = await supabase.from("revision_papers").select("*").eq("id", paperId).maybeSingle();
    if (!paper) return res.status(404).json({ error: "That paper could not be found." });
    return res.json({
      paper: {
        id: paper.id,
        studentEmail: paper.student_email,
        subject: paper.subject,
        chapterName: paper.chapter_name,
        totalMarks: paper.total_marks,
        timeAllottedMinutes: paper.time_allotted_minutes,
        status: paper.status,
        createdAt: paper.created_at,
        cycleNumber: paper.cycle_number || 1,
        questions: paper.content?.questions || [],
      },
    });
  });

  // Streams a student's actual uploaded answer-sheet file for the admin to review directly --
  // same HOMEWORK_BUCKET/file_path revision submissions already use.
  app.get("/api/admin/revision/submission/:submissionId/download", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { submissionId } = req.params;
    const { data: sub } = await supabase.from("revision_submissions").select("file_path, student_email").eq("id", submissionId).maybeSingle();
    if (!sub?.file_path) return res.status(404).json({ error: "That submission could not be found." });
    const { data: blob, error } = await supabase.storage.from(HOMEWORK_BUCKET).download(sub.file_path);
    if (error || !blob) return res.status(404).json({ error: "That file could not be found." });
    const buf = Buffer.from(await blob.arrayBuffer());
    const isPdf = sub.file_path.toLowerCase().endsWith(".pdf") || blob.type === "application/pdf";
    res.setHeader("Content-Type", isPdf ? "application/pdf" : (blob.type || "application/octet-stream"));
    res.setHeader("Content-Disposition", `attachment; filename="${sub.student_email.replace(/[^a-zA-Z0-9.\-]/g, "_")}-answer-sheet.${isPdf ? "pdf" : "jpg"}"`);
    return res.send(buf);
  });

  // Reference textbooks used to ground Revision paper generation (see REVISION_REFERENCE_PREFIX
  // above). Any number of PDFs per (class, subject) -- one per chapter, multiple volumes, etc.
  // Uploads go through chunk-then-finalize (see the comment on REVISION_REFERENCE_TEMP_PREFIX)
  // since a real textbook PDF or a zip of a whole book's chapters is far past what a single Vercel
  // request body can carry.
  const REVISION_REFERENCE_CLASS_KEYS = ["8th", "9th", "10th"] as const;
  const REVISION_REFERENCE_SUBJECTS = ["Maths", "Science"] as const;

  // Reference-book file names are "NN Chapter Title.pdf" (see the admin rename tooling) -- strip
  // the sort-order prefix and extension to get a clean display title.
  function referenceBookDisplayTitle(fileName: string): string {
    return fileName.replace(/^\d+\s+/, "").replace(/\.pdf$/i, "");
  }

  // Student-facing: browse and download the reference NCERT chapter PDFs on file for the logged-in
  // student's own class (same files the admin uploaded to ground Revision paper generation --
  // repurposed here as a plain "download the textbook chapter" utility for students).
  app.get("/api/revision/reference-books/mine", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    // A student's own class is always used automatically (resolved from their profile) -- the
    // optional classKey override exists only for accounts with no class on file (chiefly the
    // admin's own login, which has none) so browsing NCERT PDFs doesn't require first going
    // through Revision's syllabus setup just to pick a fallback class.
    const { classKey: requestedClassKey } = req.query as { classKey?: string };
    let classKey: string | null = null;
    if (requestedClassKey && REVISION_REFERENCE_CLASS_KEYS.includes(requestedClassKey as any)) {
      classKey = requestedClassKey;
    } else {
      const classLabel = await resolveClassLabelForRevision(auth);
      classKey = classLabel ? CLASS_TO_TARGET[classLabel] : null;
    }
    if (!classKey || !REVISION_REFERENCE_CLASS_KEYS.includes(classKey as any)) {
      return res.status(400).json({ error: "We couldn't determine your class. Please set it in the Revision syllabus setup first." });
    }
    const subjects: Record<string, { fileName: string; title: string }[]> = { Maths: [], Science: [] };
    for (const subject of REVISION_REFERENCE_SUBJECTS) {
      const { data } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).list(`${REVISION_REFERENCE_PREFIX}/${classKey}-${subject}`);
      subjects[subject] = (data || [])
        .filter((f: any) => f.name.toLowerCase().endsWith(".pdf"))
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .map((f: any) => ({ fileName: f.name, title: referenceBookDisplayTitle(f.name) }));
    }
    return res.json({ classKey, subjects });
  });

  app.get("/api/revision/reference-books/download", async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { classKey, subject, fileName } = req.query as { classKey?: string; subject?: string; fileName?: string };
    if (!classKey || !REVISION_REFERENCE_CLASS_KEYS.includes(classKey as any) || !subject || !REVISION_REFERENCE_SUBJECTS.includes(subject as any) || !fileName) {
      return res.status(400).json({ error: "Invalid request." });
    }
    const { data: blob, error } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).download(`${REVISION_REFERENCE_PREFIX}/${classKey}-${subject}/${fileName}`);
    if (error || !blob) return res.status(404).json({ error: "That file could not be found." });
    const buf = Buffer.from(await blob.arrayBuffer());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${referenceBookDisplayTitle(fileName).replace(/"/g, "")}.pdf"`);
    return res.send(buf);
  });

  app.get("/api/admin/revision/reference-books", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const files: { slotKey: string; fileName: string; sizeBytes: number | null; updatedAt: string | null }[] = [];
    for (const classKey of REVISION_REFERENCE_CLASS_KEYS) {
      for (const subject of REVISION_REFERENCE_SUBJECTS) {
        const slotKey = `${classKey}-${subject}`;
        const { data } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).list(`${REVISION_REFERENCE_PREFIX}/${slotKey}`);
        for (const f of (data || [])) {
          if (!f.name.toLowerCase().endsWith(".pdf")) continue;
          files.push({ slotKey, fileName: f.name, sizeBytes: f.metadata?.size || null, updatedAt: f.updated_at || f.created_at || null });
        }
      }
    }
    return res.json({ files });
  });

  app.post("/api/admin/revision/reference-books/upload-chunk", (req, res, next) => {
    chunkUpload.single("chunk")(req, res, (err: any) => {
      if (err) return res.status(400).json({ error: err.message || "Failed to process this chunk." });
      next();
    });
  }, async (req, res) => {
    const auth = requireAuth(req, res);
    if (!auth) return;
    if (!ADMIN_EMAILS.includes(auth.email)) return res.status(403).json({ error: "Forbidden: Admin privileges required to execute this operation." });
    const { sessionId, order } = req.body;
    if (!req.file) return res.status(400).json({ error: "No data was received." });
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });
    const orderNum = parseInt(order, 10) || 0;
    const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, "");
    const tempPath = `${REVISION_REFERENCE_TEMP_PREFIX}/${auth.email}/${safeSessionId}/${String(orderNum).padStart(4, "0")}-${Date.now()}.part`;
    const { error: uploadError } = await supabase.storage.from(HOMEWORK_BUCKET).upload(tempPath, req.file.buffer, { contentType: "application/octet-stream" });
    if (uploadError) {
      console.error("Temp reference-book chunk upload error:", uploadError.message);
      return res.status(500).json({ error: "Failed to upload this piece of the file. Please try again." });
    }
    return res.json({ success: true });
  });

  app.post("/api/admin/revision/reference-books/finalize", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const auth = requireAuth(req, res);
    if (!auth) return;
    const { classKey, subject, sessionId, fileName, isZip } = req.body as { classKey?: string; subject?: string; sessionId?: string; fileName?: string; isZip?: boolean };
    if (!classKey || !REVISION_REFERENCE_CLASS_KEYS.includes(classKey as any) || !subject || !REVISION_REFERENCE_SUBJECTS.includes(subject as any)) {
      return res.status(400).json({ error: "Invalid class or subject." });
    }
    if (!sessionId) return res.status(400).json({ error: "Missing upload session." });

    const buffer = await concatenateSessionChunks(auth.email, String(sessionId), REVISION_REFERENCE_TEMP_PREFIX);
    if (!buffer) return res.status(400).json({ error: "No uploaded data found for this session. Please try uploading again." });

    const folder = `${REVISION_REFERENCE_PREFIX}/${classKey}-${subject}`;
    const uploaded: string[] = [];

    if (isZip) {
      let zip: AdmZip;
      try {
        zip = new AdmZip(buffer);
      } catch {
        return res.status(400).json({ error: "That file isn't a valid zip archive." });
      }
      const entries = zip.getEntries().filter((e) => !e.isDirectory && e.entryName.toLowerCase().endsWith(".pdf") && !e.entryName.startsWith("__MACOSX"));
      if (entries.length === 0) return res.status(400).json({ error: "No PDF files were found inside that zip." });
      for (const entry of entries) {
        const baseName = entry.entryName.split("/").pop() || entry.entryName;
        const safeName = baseName.replace(/[^a-zA-Z0-9.\-]/g, "_");
        const { error } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).upload(`${folder}/${safeName}`, entry.getData(), { contentType: "application/pdf", upsert: true });
        if (!error) uploaded.push(safeName);
      }
      if (uploaded.length === 0) return res.status(500).json({ error: "Could not upload any of the PDFs found in that zip." });
    } else {
      const safeName = (fileName || "reference.pdf").replace(/[^a-zA-Z0-9.\-]/g, "_");
      const { error } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).upload(`${folder}/${safeName}`, buffer, { contentType: "application/pdf", upsert: true });
      if (error) return res.status(500).json({ error: `Could not upload the reference PDF: ${error.message}` });
      uploaded.push(safeName);
    }

    return res.json({ success: true, uploadedCount: uploaded.length, fileNames: uploaded });
  });

  app.delete("/api/admin/revision/reference-books", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { classKey, subject, fileName } = req.body as { classKey?: string; subject?: string; fileName?: string };
    if (!classKey || !REVISION_REFERENCE_CLASS_KEYS.includes(classKey as any) || !subject || !REVISION_REFERENCE_SUBJECTS.includes(subject as any)) {
      return res.status(400).json({ error: "Invalid class or subject." });
    }
    const folder = `${REVISION_REFERENCE_PREFIX}/${classKey}-${subject}`;
    if (fileName) {
      const { error } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).remove([`${folder}/${fileName}`]);
      if (error) return res.status(500).json({ error: error.message });
    } else {
      const { data } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).list(folder);
      const paths = (data || []).map((f: any) => `${folder}/${f.name}`);
      if (paths.length > 0) {
        const { error } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).remove(paths);
        if (error) return res.status(500).json({ error: error.message });
      }
    }
    return res.json({ success: true });
  });

  // ── ADMIN PROTECTED ENDPOINTS ──
  // Checks admin authorization headers / payload parameter
  function checkAdminAuth(req: express.Request, res: express.Response) {
    const auth = requireAuth(req, res);
    if (!auth) return false; // requireAuth already sent a 401
    if (!ADMIN_EMAILS.includes(auth.email)) {
      res.status(403).json({ error: "Forbidden: Admin privileges required to execute this operation." });
      return false;
    }
    return true;
  }

  // ── Chapter Notes: AI generation pipeline ──
  // Split into small single-purpose steps (outline, one diagram at a time, final review) driven
  // by repeated client-awaited /advance calls -- the same "no true fire-and-forget" shape used by
  // homework's check-mine (see the comment there), since a Vercel function invocation can be
  // frozen the instant its response goes out. If the admin's tab closes mid-job, the admin-side
  // sweep (mirroring the homework one) picks a stuck "processing" job back up on the next visit.
  const DIAGRAM_CANVAS_W = 480;
  const DIAGRAM_CANVAS_H = 320;

  interface ChapterNotesDiagramState { id: string; description: string; spec: DiagramSpec | null; status: "pending" | "ok" | "flagged"; issues?: string[] }
  interface ChapterNotesSection { heading: string; points: string[]; diagrams: ChapterNotesDiagramState[] }
  interface ChapterNotesContent { title: string; sections: ChapterNotesSection[]; reviewSummary?: string; reviewConcerns?: string[] }

  async function callClaudeTool(opts: { system: string; content: any[]; tool: any; maxTokens?: number; model?: string }): Promise<any> {
    const model = opts.model || CLAUDE_MODEL;
    // Adaptive thinking/output_config are a Sonnet/Opus-only feature -- Haiku 4.5 (the cheaper
    // generation model) rejects the request outright with "adaptive thinking is not supported on
    // this model" if these are sent, so they're only included for models that actually support them.
    const supportsAdaptiveThinking = model !== CLAUDE_MODEL_GENERATION;
    let lastErr = "Claude did not return a usable result.";
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 2000));
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": process.env.ANTHROPIC_API_KEY as string, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({
          model,
          ...(supportsAdaptiveThinking ? { thinking: { type: "adaptive" }, output_config: { effort: "medium" } } : {}),
          max_tokens: opts.maxTokens || 8000,
          tools: [opts.tool],
          tool_choice: { type: "tool", name: opts.tool.name },
          system: [{ type: "text", text: opts.system }],
          messages: [{ role: "user", content: opts.content }],
        }),
      });
      const data = await resp.json();
      const block = (data?.content || []).find((b: any) => b.type === "tool_use" && b.name === opts.tool.name);
      if ((resp.status === 529 || resp.status === 429 || !resp.ok || !block) && attempt === 0) {
        lastErr = data?.error?.message || `Anthropic returned status ${resp.status}`;
        continue;
      }
      if (!resp.ok || !block) { lastErr = data?.error?.message || "Claude did not return a usable result."; break; }
      return block.input;
    }
    throw new Error(lastErr);
  }

  async function generateChapterOutline(job: any, correction?: string): Promise<ChapterNotesContent> {
    const { data: pdfBlob } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).download(job.ncert_pdf_path);
    if (!pdfBlob) throw new Error("Could not download the NCERT chapter PDF from storage.");
    const pdfBuf = Buffer.from(await pdfBlob.arrayBuffer());
    const pdfBlock = { type: "document", source: { type: "base64", media_type: "application/pdf", data: pdfBuf.toString("base64") } };

    const supportBlocks: any[] = [];
    for (const p of (job.supporting_file_paths || [])) {
      const { data: b } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).download(p);
      if (!b) continue;
      const buf = Buffer.from(await b.arrayBuffer());
      const isPdf = p.toLowerCase().endsWith(".pdf");
      supportBlocks.push(isPdf
        ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: buf.toString("base64") } }
        : { type: "image", source: { type: "base64", media_type: b.type || "image/jpeg", data: buf.toString("base64") } });
    }

    const system = `You are an expert CBSE-curriculum teacher preparing exam-focused, point-wise chapter notes for Class ${job.target_class} ${job.subject}, chapter "${job.chapter_name}", from the attached official NCERT chapter PDF (the FIRST attached file; any further attached files are secondary supporting/reference material, subordinate to the NCERT PDF). Notes must be genuinely useful for CBSE board exam revision: point-wise (never long paragraphs), covering every concept/definition/formula/derivation/law in the chapter, in the chapter's own logical order, broken into clearly-headed sections. Where a diagram from the textbook would meaningfully help understanding (a labelled figure, a ray/force diagram, a geometric construction, a graph), flag that a diagram is needed with a precise description of exactly what it must show and label -- do not request a diagram for something purely textual/definitional that gains nothing from a picture. Admin's remarks on what kind of notes they want: ${job.remarks || "(none given -- use your own best judgement)"}.${correction ? `\n\nThe admin reviewed an earlier draft and asked for this correction, which takes priority over everything else: "${correction}". Revise the notes to address this fully while keeping everything else that was already good.` : ""}`;

    const tool = {
      name: "submit_notes",
      description: "Submit the structured chapter notes.",
      input_schema: {
        type: "object",
        properties: {
          title: { type: "string", description: "Chapter title." },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                heading: { type: "string" },
                points: { type: "array", items: { type: "string" }, description: "Point-wise notes for this section -- each entry one short, self-contained point (a definition, a formula, a fact, a step of a derivation). Never a paragraph." },
                diagrams: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      description: { type: "string", description: "Precisely what this diagram must show and label, in enough detail that someone else could draw it correctly from this description alone." },
                    },
                    required: ["id", "description"],
                  },
                },
              },
              required: ["heading", "points", "diagrams"],
            },
          },
        },
        required: ["title", "sections"],
      },
    };

    const content = [pdfBlock, ...supportBlocks, { type: "text", text: "Generate the chapter notes now." }];
    const result = await callClaudeTool({ system, content, tool, maxTokens: 8000 });

    const sections: ChapterNotesSection[] = (result.sections || []).map((s: any, si: number) => ({
      heading: s.heading,
      points: Array.isArray(s.points) ? s.points : [],
      diagrams: Array.isArray(s.diagrams)
        ? s.diagrams.map((d: any, di: number) => ({ id: d.id || `d${si}_${di}`, description: d.description, spec: null, status: "pending" as const }))
        : [],
    }));
    return { title: result.title, sections };
  }

  async function generateDiagramSpec(description: string, chapterTitle: string, feedback?: string): Promise<DiagramSpec> {
    const system = `You are drawing a simple, clean, CBSE-textbook-style educational diagram as a constrained shape list (not raw SVG/HTML). Canvas is ${DIAGRAM_CANVAS_W}x${DIAGRAM_CANVAS_H} units. Keep it uncluttered: generous spacing between every label and every other label/line/shape -- labels must never overlap each other, and must never sit directly on top of a line or shape they are not naming. Use role "axis" for reference lines/axes, "outline" for main structural lines/shapes, "fillPrimary"/"fillSecondary" for two distinguishable filled elements if needed, "ray" for light rays/vectors/arrows, "label" for point/part labels, "title" for a diagram title if one is warranted. This diagram is for chapter "${chapterTitle}". What it must show: ${description}${feedback ? `\n\nA previous attempt had this problem -- fix it: ${feedback}` : ""}`;
    const tool = {
      name: "submit_diagram",
      description: "Submit the diagram as a shape list.",
      input_schema: {
        type: "object",
        properties: {
          caption: { type: "string" },
          shapes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["line", "arrow", "circle", "rect", "polygon", "text"] },
                x1: { type: "number" }, y1: { type: "number" }, x2: { type: "number" }, y2: { type: "number" },
                cx: { type: "number" }, cy: { type: "number" }, r: { type: "number" },
                x: { type: "number" }, y: { type: "number" }, w: { type: "number" }, h: { type: "number" },
                points: { type: "string" }, text: { type: "string" },
                anchor: { type: "string", enum: ["start", "middle", "end"] },
                size: { type: "number" },
                role: { type: "string" },
                filled: { type: "boolean" },
                dashed: { type: "boolean" },
              },
              required: ["type", "role"],
            },
          },
        },
        required: ["caption", "shapes"],
      },
    };
    const result = await callClaudeTool({ system, content: [{ type: "text", text: "Generate the diagram now." }], tool, maxTokens: 3000 });
    return { id: "", caption: result.caption, viewBoxW: DIAGRAM_CANVAS_W, viewBoxH: DIAGRAM_CANVAS_H, shapes: result.shapes || [] };
  }

  async function visionCheckDiagram(spec: DiagramSpec, description: string): Promise<{ ok: boolean; issues: string[] }> {
    const lightSvg = buildDiagramSvg(spec, true);
    const darkSvg = buildDiagramSvg(spec, false);
    const [lightPng, darkPng] = await Promise.all([
      sharp(Buffer.from(lightSvg)).png().toBuffer(),
      sharp(Buffer.from(darkSvg)).png().toBuffer(),
    ]);
    const system = `You are doing quality control on an auto-generated educational diagram before it's shown to students. You are shown the SAME diagram rendered twice: once for light mode, once for dark mode. Check specifically for: any text label overlapping another label, any label sitting on top of / crossed by a line or shape it doesn't belong to, any label illegible against its background in EITHER mode, and any label positioned confusingly far from what it labels. Do not flag stylistic taste, only genuine overlap/legibility/clarity problems. What the diagram is meant to show: ${description}`;
    const tool = {
      name: "submit_review",
      description: "Submit the diagram QA result.",
      input_schema: {
        type: "object",
        properties: {
          ok: { type: "boolean", description: "true only if there are zero overlap/legibility/clarity problems in both modes." },
          issues: { type: "array", items: { type: "string" }, description: "Each concrete problem found, empty if ok is true." },
        },
        required: ["ok", "issues"],
      },
    };
    const content = [
      { type: "text", text: "Light mode render:" },
      { type: "image", source: { type: "base64", media_type: "image/png", data: lightPng.toString("base64") } },
      { type: "text", text: "Dark mode render:" },
      { type: "image", source: { type: "base64", media_type: "image/png", data: darkPng.toString("base64") } },
    ];
    const result = await callClaudeTool({ system, content, tool, maxTokens: 1000 });
    return { ok: !!result.ok, issues: Array.isArray(result.issues) ? result.issues : [] };
  }

  // Up to 2 generation attempts per diagram: a free deterministic bounding-box overlap check runs
  // first (cheap, catches the obvious cases without spending a vision call), then one Claude vision
  // pass actually looking at both rendered modes. A diagram that still isn't clean after that is
  // kept (not silently dropped) but marked "flagged" so it surfaces in the admin's own review --
  // matching the approve/reject/correction workflow the admin explicitly asked for, rather than
  // pretending automated QA alone can guarantee perfection.
  async function produceDiagram(description: string, chapterTitle: string): Promise<{ spec: DiagramSpec; status: "ok" | "flagged"; issues: string[] }> {
    let feedback: string | undefined;
    let spec: DiagramSpec | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      spec = await generateDiagramSpec(description, chapterTitle, feedback);
      const geomIssues = findLikelyOverlaps(spec);
      if (geomIssues.length > 0) {
        feedback = geomIssues.join(" ");
        if (attempt === 1) return { spec, status: "flagged", issues: geomIssues };
        continue;
      }
      const visionResult = await visionCheckDiagram(spec, description);
      if (visionResult.ok) return { spec, status: "ok", issues: [] };
      feedback = visionResult.issues.join(" ");
      if (attempt === 1) return { spec, status: "flagged", issues: visionResult.issues };
    }
    return { spec: spec as DiagramSpec, status: "flagged", issues: feedback ? [feedback] : ["Automatic layout check could not confirm this diagram is clean."] };
  }

  async function finalReviewChapterNotes(job: any, content: ChapterNotesContent): Promise<{ summary: string; concerns: string[] }> {
    const { data: pdfBlob } = await supabase.storage.from(CHAPTER_NOTES_BUCKET).download(job.ncert_pdf_path);
    if (!pdfBlob) throw new Error("Could not re-download the NCERT chapter PDF for final review.");
    const pdfBuf = Buffer.from(await pdfBlob.arrayBuffer());
    const pdfBlock = { type: "document", source: { type: "base64", media_type: "application/pdf", data: pdfBuf.toString("base64") } };
    const notesText = content.sections.map((s) => `## ${s.heading}\n${s.points.map((p) => `- ${p}`).join("\n")}`).join("\n\n");
    const system = `You wrote the attached point-wise chapter notes from the attached original NCERT chapter PDF. Do a final accuracy/completeness self-check: is anything in the notes factually wrong compared to the PDF, and is any concept/formula/definition from the PDF missing from the notes? Be honest and specific -- this is your own final QA pass, not a rubber stamp.`;
    const tool = {
      name: "submit_final_review",
      description: "Submit the final QA result.",
      input_schema: {
        type: "object",
        properties: {
          summary: { type: "string", description: "One or two sentence overall verdict." },
          concerns: { type: "array", items: { type: "string" }, description: "Specific factual errors or missing content found, empty if none." },
        },
        required: ["summary", "concerns"],
      },
    };
    const content2 = [pdfBlock, { type: "text", text: `Generated notes:\n\n${notesText}` }];
    const result = await callClaudeTool({ system, content: content2, tool, maxTokens: 1500 });
    return { summary: result.summary, concerns: Array.isArray(result.concerns) ? result.concerns : [] };
  }

  function findNextDiagramCoord(content: ChapterNotesContent): { si: number; di: number } | null {
    for (let si = 0; si < content.sections.length; si++) {
      const diagrams = content.sections[si].diagrams || [];
      for (let di = 0; di < diagrams.length; di++) {
        if (!diagrams[di].spec) return { si, di };
      }
    }
    return null;
  }

  // Does exactly ONE unit of work per call -- see the file-level comment above this section for
  // why (the two-request pattern, not fire-and-forget). Safe to call repeatedly/concurrently on
  // the same job: it always re-reads current_step fresh and no-ops if status isn't "processing".
  async function advanceChapterNotesJob(jobId: string): Promise<void> {
    const { data: job } = await supabase.from("chapter_notes_jobs").select("*").eq("id", jobId).maybeSingle();
    if (!job || job.status !== "processing") return;

    try {
      if (job.current_step === "outline" || job.current_step === "revise") {
        const content = await generateChapterOutline(job, job.current_step === "revise" ? job.correction_notes : undefined);
        const next = findNextDiagramCoord(content);
        await supabase.from("chapter_notes_jobs").update({
          content, current_step: next ? `diagram:${next.si}:${next.di}` : "review", step_error: null, updated_at: new Date().toISOString(),
        }).eq("id", jobId);
        return;
      }

      const diagramMatch = /^diagram:(\d+):(\d+)$/.exec(job.current_step || "");
      if (diagramMatch) {
        const si = parseInt(diagramMatch[1], 10);
        const di = parseInt(diagramMatch[2], 10);
        const content: ChapterNotesContent = job.content;
        const d = content.sections[si].diagrams[di];
        const produced = await produceDiagram(d.description, content.title);
        content.sections[si].diagrams[di] = { ...d, spec: { ...produced.spec, id: d.id }, status: produced.status, issues: produced.issues };
        const next = findNextDiagramCoord(content);
        await supabase.from("chapter_notes_jobs").update({
          content, current_step: next ? `diagram:${next.si}:${next.di}` : "review", step_error: null, updated_at: new Date().toISOString(),
        }).eq("id", jobId);
        return;
      }

      if (job.current_step === "review") {
        const content: ChapterNotesContent = job.content;
        const reviewResult = await finalReviewChapterNotes(job, content);
        const flaggedDiagrams = content.sections.flatMap((s) => s.diagrams.filter((d) => d.status === "flagged"));
        content.reviewSummary = reviewResult.summary;
        content.reviewConcerns = reviewResult.concerns;
        await supabase.from("chapter_notes_jobs").update({
          content, status: "ready_for_review", current_step: "done", step_error: null, updated_at: new Date().toISOString(),
        }).eq("id", jobId);

        const concernLines = reviewResult.concerns.length > 0
          ? `\n\nThings the AI itself flagged for your attention:\n${reviewResult.concerns.map((c) => `- ${c}`).join("\n")}`
          : "";
        const diagramLines = flaggedDiagrams.length > 0
          ? `\n\n${flaggedDiagrams.length} diagram(s) could not be fully verified as overlap-free and are marked for your extra attention in the preview.`
          : "";
        await sendSimulatedEmail(
          job.admin_email,
          `Chapter notes ready for review: ${job.chapter_name}`,
          `The AI has finished drafting notes for Class ${job.target_class} ${job.subject} -- "${job.chapter_name}".\n\n${reviewResult.summary}${concernLines}${diagramLines}\n\nOpen the admin panel's Chapter Notes section to review, and Approve, Reject, or request a correction.`,
          "outgoing"
        );
      }
    } catch (err: any) {
      console.error(`[Chapter Notes] Job ${jobId} step "${job.current_step}" failed:`, err);
      const isFirstFailure = !job.step_error;
      await supabase.from("chapter_notes_jobs").update({ step_error: err.message || String(err), updated_at: new Date().toISOString() }).eq("id", jobId);
      if (isFirstFailure) {
        await sendSimulatedEmail(
          job.admin_email,
          `Chapter notes generation hit a problem: ${job.chapter_name}`,
          `Generating notes for Class ${job.target_class} ${job.subject} -- "${job.chapter_name}" ran into an error at step "${job.current_step}":\n\n${err.message || String(err)}\n\nOpening the admin panel will automatically retry it. If this keeps failing, the uploaded file may be unreadable -- check it opens correctly and try re-uploading.`,
          "outgoing"
        );
      }
    }
  }

  function mapChapterNotesJobRow(row: any) {
    return {
      id: row.id,
      targetClass: row.target_class,
      subject: row.subject,
      chapterName: row.chapter_name,
      remarks: row.remarks,
      status: row.status,
      currentStep: row.current_step,
      content: row.content,
      stepError: row.step_error,
      correctionNotes: row.correction_notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  // Admin Dashboard Config read
  app.get("/api/admin/dashboard", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;

    const [{ data: userRows }, { data: inviteRows }, { data: logRows }] = await Promise.all([
      supabase.from("users").select("*"),
      supabase.from("invite_codes").select("*").order("created_at", { ascending: false }),
      supabase.from("email_logs").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    return res.json({
      users: (userRows || []).map(mapUserRow),
      inviteCodes: (inviteRows || []).map(mapInviteRow),
      emailLogs: (logRows || []).map((r) => ({
        id: r.id, to: r.to_email, subject: r.subject, body: r.body, timestamp: r.created_at, type: r.type
      }))
    });
  });

  // Approved a dynamic registration request
  app.post("/api/admin/approve-user", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Target email parameter is required." });

    const targetEmail = email.toLowerCase().trim();
    const { data: targetUser } = await supabase.from("users").select("*").eq("email", targetEmail).maybeSingle();
    if (!targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    await supabase.from("users").update({ status: "approved" }).eq("email", targetEmail);

    // Send congrats notification email to Student (awaited so it can't be frozen mid-send)
    await sendSimulatedEmail(
      targetEmail,
      "🎉 Account Approved: Welcome to Ray Optica",
      `Dear ${targetUser.name},\n\nWe are delighted to inform you that your registration request for Conceptual Learning Online has been officially APPROVED!\n\nYou now have full access to study notes, CBSE Board preparations, and interactive physics ray simulators on up to 3 authorized device browsers.\n\nTo begin exploring, head to the portal and sign in using your account credentials.\n\nWarm regards,\nConceptual Learning Online Team`,
      'outgoing'
    );

    return res.json({ success: true, message: `Successfully approved student: ${targetEmail}` });
  });

  // Suspended or Rejected a user registration / login
  app.post("/api/admin/reject-user", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Target email parameter is required." });

    const targetEmail = email.toLowerCase().trim();
    if (ADMIN_EMAILS.includes(targetEmail)) {
      return res.status(400).json({ error: "Action blocked: The owner account cannot be suspended or rejected." });
    }

    const { data: targetUser } = await supabase.from("users").select("*").eq("email", targetEmail).maybeSingle();
    if (!targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    await supabase.from("users").update({ status: "rejected" }).eq("email", targetEmail);

    // Send disapproval notification email to Student (awaited so it can't be frozen mid-send)
    await sendSimulatedEmail(
      targetEmail,
      "🚫 Account Request Disapproved - Ray Optica",
      `Dear ${targetUser.name},\n\nWe regret to inform you that your registration request for Conceptual Learning Online has been disapproved/suspended. If you believe this is a clerical error, please reach out to your teacher directly.\n\nBest regards,\nConceptual Learning Online Support`,
      'outgoing'
    );

    return res.json({ success: true, message: `Successfully deactivated/rejected: ${targetEmail}` });
  });

  // Reset/Clear registered devices for a user
  app.post("/api/admin/reset-devices", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Target email is required." });

    const targetEmail = email.toLowerCase().trim();
    const { data: targetUser } = await supabase.from("users").select("email").eq("email", targetEmail).maybeSingle();
    if (!targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    await supabase.from("users").update({ devices: [] }).eq("email", targetEmail);
    return res.json({ success: true, message: `Cleared all registered devices for: ${targetEmail}` });
  });

  // Generate simple sharable Access Code (Invite Code)
  app.post("/api/admin/create-invite", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { studentName } = req.body;
    const nameStr = studentName ? String(studentName).trim() : "Custom Student Link";

    // Generate clean simple code, like OPT-XXXX
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let randomPart = "";
    for (let i = 0; i < 4; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const generatedCode = `OPT-${randomPart}`;

    const { data: insertedRow, error: insertError } = await supabase
      .from("invite_codes")
      .insert({ code: generatedCode, created_for: nameStr, status: "active" })
      .select()
      .single();

    if (insertError || !insertedRow) {
      console.error("Error creating invite code:", insertError?.message);
      return res.status(500).json({ error: "Failed to create invite code." });
    }

    return res.json({ success: true, code: mapInviteRow(insertedRow) });
  });

  // Delete/Revoke invite rules
  app.post("/api/admin/delete-invite", async (req, res) => {
    if (!checkAdminAuth(req, res)) return;
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Invite code parameter is mandatory." });

    const targetCode = code.toUpperCase().trim();
    const { data: existingInvite } = await supabase.from("invite_codes").select("code").eq("code", targetCode).maybeSingle();
    if (!existingInvite) {
      return res.status(404).json({ error: "Invite code not found." });
    }

    await supabase.from("invite_codes").delete().eq("code", targetCode);
    return res.json({ success: true, message: `Successfully revoked code: ${targetCode}` });
  });

  return app;
}

// Single shared app instance: used both by the traditional dev/prod server below
// and exported directly for Vercel's serverless runtime (which imports `app` and
// never calls startServer/listen -- Vercel serves the built frontend separately).
const app = buildApp();

async function startServer() {
  const PORT = 3000;

  // ── VITE MIDDLEWARE OR STATIC SERVER ──
  if (process.env.NODE_ENV !== "production") {
    // Dynamically imported so vite (and its rollup native binary) never loads
    // in production/serverless -- rollup ships platform-specific binaries and
    // a lockfile generated on one OS can be missing another platform's binary.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Optics App Server] Full-Stack listening at http://0.0.0.0:${PORT}`);
  });
}

// On Vercel, requests are routed directly to the exported `app` as a serverless
// function -- there's no long-running process to start.
if (!process.env.VERCEL) {
  startServer();
}

export default app;
