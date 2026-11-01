// Frees storage space by deleting the uploaded answer-sheet FILES of submissions that earned full marks
// on or before a cutoff date. Marks, feedback and every database record are left exactly as they are.
//
//   Preview only (deletes nothing):   npx tsx scripts/delete-full-marks-files.mts
//   Really delete the files:          npx tsx scripts/delete-full-marks-files.mts --delete
//
// Full marks means: homework scored 10/10 (HOMEWORK_TOTAL_MARKS) or a revision paper scored 30/30, with
// the submission dated on or before 15 October 2026 (end of day, India time). A file that is also used
// by a submission that did NOT earn full marks is never deleted. Deleted files cannot be recovered.
import "dotenv/config";
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const CUTOFF_UTC = "2026-10-15T18:29:59.999Z"; // 15 Oct 2026, 23:59:59 IST
const HOMEWORK_FULL = 10;
const REVISION_FULL = 30;
const BUCKET = "homework";
const doDelete = process.argv.includes("--delete");

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);

async function allRows(table: string, columns: string) {
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from(table).select(columns).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return rows;
}

const homework = await allRows("homework_submissions", "id, student_email, file_path, ai_score, submitted_at, status");
const revision = await allRows("revision_submissions", "id, student_email, file_path, ai_score, submitted_at, status");
// Question papers and worksheets are never deleted: homework worksheets are listed here and kept, and
// revision question papers are stored in the database, not as files.
const assignments = await allRows("homework_assignments", "file_path");
const questionPaperFiles = new Set(assignments.map((a) => a.file_path).filter(Boolean));

const qualifies = (r: any, full: number) =>
  r.status === "checked" && Number(r.ai_score) === full && new Date(r.submitted_at).getTime() <= new Date(CUTOFF_UTC).getTime();

const all = [...homework.map((r) => ({ ...r, kind: "homework", full: HOMEWORK_FULL })), ...revision.map((r) => ({ ...r, kind: "revision", full: REVISION_FULL }))];
const stillNeeded = new Set(all.filter((r) => !qualifies(r, r.full)).map((r) => r.file_path));
// Only a student's uploaded answer sheet qualifies: it must sit in a student folder named after an
// email address ("<email>/..." -- an older email folder is fine for a student whose email was later
// changed) and must not be a worksheet/question paper file.
const targets = all.filter((r) =>
  qualifies(r, r.full) && r.file_path && !stillNeeded.has(r.file_path)
  && !questionPaperFiles.has(r.file_path) && String(r.file_path).split("/")[0].includes("@"));
const paths = [...new Set(targets.map((r) => r.file_path as string))];

// File sizes, looked up folder by folder.
const sizeByPath = new Map<string, number>();
const folders = [...new Set(paths.map((p) => p.split("/").slice(0, -1).join("/")))];
for (const folder of folders) {
  const { data } = await supabase.storage.from(BUCKET).list(folder, { limit: 1000 });
  for (const f of data || []) sizeByPath.set(`${folder}/${f.name}`, Number((f as any).metadata?.size || 0));
}
const existing = paths.filter((p) => sizeByPath.has(p));
const totalBytes = existing.reduce((sum, p) => sum + (sizeByPath.get(p) || 0), 0);

console.log(`Full-marks submissions up to 15 Oct 2026: homework ${targets.filter((t) => t.kind === "homework").length}, revision ${targets.filter((t) => t.kind === "revision").length}`);
console.log(`Students affected: ${new Set(targets.map((t) => t.student_email)).size}`);
console.log(`Files found in storage: ${existing.length} (${(totalBytes / 1024 / 1024).toFixed(1)} MB). Already missing: ${paths.length - existing.length}`);

if (!doDelete) {
  console.log("\nPreview only -- nothing was deleted. Run again with --delete to remove these files.");
  process.exit(0);
}

const manifest = `deleted-files-${new Date().toISOString().slice(0, 10)}.json`;
fs.writeFileSync(manifest, JSON.stringify(existing, null, 1));
let removed = 0;
for (let i = 0; i < existing.length; i += 100) {
  const batch = existing.slice(i, i + 100);
  const { error } = await supabase.storage.from(BUCKET).remove(batch);
  if (error) { console.error("Stopped:", error.message); break; }
  removed += batch.length;
  console.log(`Deleted ${removed} / ${existing.length}`);
}
console.log(`Done. ${removed} files deleted. The list of deleted file names is saved in ${manifest}. No marks or records were changed.`);
