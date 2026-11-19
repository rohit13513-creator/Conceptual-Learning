// Publishes the results of the Class X mock tests: checks a JSON file (see mockResults.ts for its shape) and uploads it as the private file
// mock-results.json in the "downloads" storage bucket, where the server reads it. Names and marks are never put in the code.
//   npx tsx scripts/upload-mock-results.mts <file.json> --check     only check the file
//   npx tsx scripts/upload-mock-results.mts <file.json>             check and upload (replaces the file, so the JSON must hold every published test)
import "dotenv/config";
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { validateMockResult } from "../mockResults.ts";
import type { MockResults } from "../mockResults.ts";
import { MOCK_TESTS } from "../mockTests.ts";

const file = process.argv[2];
if (!file) { console.log("usage: npx tsx scripts/upload-mock-results.mts <file.json> [--check]"); process.exit(1); }
const data: MockResults = JSON.parse(fs.readFileSync(file, "utf8"));
let problems = 0;
for (const [id, r] of Object.entries(data)) {
  const test = MOCK_TESTS.find((t) => t.id === id);
  if (!test) { console.log(`${id}: no such test in mockTests.ts`); problems++; continue; }
  const bad = validateMockResult(r, test.maxMarks);
  bad.forEach((b) => console.log(`${id}: ${b}`));
  problems += bad.length;
  const avg = r.rows.reduce((s, x) => s + x.finalMarks, 0) / r.rows.length;
  console.log(`${id}: ${r.rows.length} students, class average ${avg.toFixed(2)} of ${r.maxMarks}, highest ${Math.max(...r.rows.map((x) => x.finalMarks))}`);
}
if (problems) { console.log(problems + " problem(s): nothing uploaded"); process.exit(1); }
if (process.argv.includes("--check")) { console.log("the file is correct"); process.exit(0); }
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const { error } = await supabase.storage.from("downloads").upload("mock-results.json", Buffer.from(JSON.stringify(data)), { contentType: "application/json", upsert: true });
if (error) { console.log("upload failed:", error.message); process.exit(1); }
console.log("uploaded mock-results.json; the website shows it within a minute");
