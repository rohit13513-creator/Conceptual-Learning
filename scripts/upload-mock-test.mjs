// Splits one PDF (question paper followed by the answer key) into two PDFs and uploads them to the PRIVATE
// "downloads" storage folder, where the server hands them out only after login (see protectedFiles.ts, kind "m").
// Safe to run again: it replaces the files of the same name.
//   node scripts/upload-mock-test.mjs "<path to the PDF>" <test id, e.g. x-bio-1> <first page of the answer key>
//   add --dry to only split and report, without uploading
import "dotenv/config";
import fs from "node:fs";
import { PDFDocument } from "pdf-lib";
import { createClient } from "@supabase/supabase-js";

const [file, testId, keyStartRaw] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const dry = process.argv.includes("--dry");
const keyStart = parseInt(keyStartRaw, 10);
if (!file || !/^[a-z0-9-]+$/.test(testId || "") || !(keyStart >= 2)) {
  console.error('Usage: node scripts/upload-mock-test.mjs "<pdf>" <test-id> <first-answer-key-page> [--dry]');
  process.exit(1);
}

const src = await PDFDocument.load(fs.readFileSync(file));
const total = src.getPageCount();
if (keyStart > total) throw new Error(`The PDF has only ${total} pages.`);
const part = async (from, to) => { // 1-based, inclusive
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i));
  pages.forEach((p) => out.addPage(p));
  return Buffer.from(await out.save());
};
const paper = await part(1, keyStart - 1);
const key = await part(keyStart, total);
console.log(`question paper: pages 1-${keyStart - 1} (${(paper.length / 1024).toFixed(0)} KB) | answer key: pages ${keyStart}-${total} (${(key.length / 1024).toFixed(0)} KB)`);
if (dry) process.exit(0);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
for (const [name, buf] of [[`mock-${testId}-paper.pdf`, paper], [`mock-${testId}-key.pdf`, key]]) {
  const { error } = await supabase.storage.from("downloads").upload(name, buf, { contentType: "application/pdf", upsert: true });
  console.log(error ? `FAILED ${name}: ${error.message}` : `uploaded ${name}`);
}
