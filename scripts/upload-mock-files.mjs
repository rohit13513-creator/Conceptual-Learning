// Uploads the ready-made PDFs of a mock test (question paper, answer key, solutions) to the PRIVATE "downloads"
// storage folder, where the server hands them out only after login (see protectedFiles.ts, kind "m").
// Safe to run again: it replaces the files of the same name. Leave out any file the test does not have.
//   node scripts/upload-mock-files.mjs <test id, e.g. x-maths-1> [--paper "<pdf>"] [--key "<pdf>"] [--solutions "<pdf>"]
import "dotenv/config";
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const args = process.argv.slice(2);
const testId = args[0];
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
if (!/^[a-z0-9-]+$/.test(testId || "")) {
  console.error('Usage: node scripts/upload-mock-files.mjs <test-id> [--paper "<pdf>"] [--key "<pdf>"] [--solutions "<pdf>"]');
  process.exit(1);
}
const jobs = [["paper", opt("paper")], ["key", opt("key")], ["solutions", opt("solutions")]].filter(([, f]) => f);
if (!jobs.length) { console.error("Give at least one file."); process.exit(1); }

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
for (const [which, file] of jobs) {
  const name = `mock-${testId}-${which}.pdf`;
  const { error } = await supabase.storage.from("downloads").upload(name, fs.readFileSync(file), { contentType: "application/pdf", upsert: true });
  console.log(error ? `FAILED ${name}: ${error.message}` : `uploaded ${name} (${(fs.statSync(file).size / 1024).toFixed(0)} KB)`);
}
