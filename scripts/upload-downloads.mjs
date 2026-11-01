// Uploads the PDF notes in public/ to the PRIVATE "downloads" storage folder, from where the server hands
// them out only after a login + offline-student check. Safe to run again (it replaces files of the same name).
// Run: node scripts/upload-downloads.mjs
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const BUCKET = "downloads";

const { data: buckets } = await supabase.storage.listBuckets();
const existing = buckets?.find((b) => b.name === BUCKET);
if (!existing) {
  const { error } = await supabase.storage.createBucket(BUCKET, { public: false });
  if (error) throw new Error("could not create bucket: " + error.message);
  console.log("created private bucket", BUCKET);
} else if (existing.public) {
  const { error } = await supabase.storage.updateBucket(BUCKET, { public: false });
  if (error) throw new Error("could not make bucket private: " + error.message);
  console.log("made bucket private");
}

for (const f of fs.readdirSync("public").filter((n) => n.toLowerCase().endsWith(".pdf"))) {
  const buf = fs.readFileSync(path.join("public", f));
  const { error } = await supabase.storage.from(BUCKET).upload(f, buf, { contentType: "application/pdf", upsert: true });
  console.log(error ? `FAILED ${f}: ${error.message}` : `uploaded ${f} (${(buf.length / 1048576).toFixed(1)} MB)`);
}
const { data: list } = await supabase.storage.from(BUCKET).list("", { limit: 100 });
console.log("files now in the private folder:", (list || []).length);
