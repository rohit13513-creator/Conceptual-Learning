// Checks the server's "make sure an uploaded file is a readable PDF" step (toReadablePdf in server.ts) on files built here:
// a real PDF stays as it is, a zip of photos becomes a PDF with one page per photo (in name order, ignoring macOS junk entries),
// a lone photo becomes a one-page PDF, and anything else is refused with a message. Real case behind it: a student's zip of photos
// was stored as a "PDF" and could never be graded.
// Run: npx tsx scripts/test-upload-readable.mts   (optional: pass a file path to see what it makes of that file)
import fs from "node:fs";
import AdmZip from "adm-zip";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { transformSync } from "esbuild";

const src = fs.readFileSync("server.ts", "utf8");
const a = src.indexOf("async function mergeImagesToPdf(");
const b = src.indexOf("// Photos uploaded one at a time");
if (a < 0 || b < a) throw new Error("the upload helpers were not found in server.ts (markers moved?)");
const js = transformSync(src.slice(a, b), { loader: "ts", target: "es2022" }).code;
const { toReadablePdf } = new Function("sharp", "PDFDocument", "AdmZip", js + "\nreturn { toReadablePdf };")(sharp, PDFDocument, AdmZip);

let bad = 0;
const check = (ok: boolean, what: string) => { if (!ok) { bad++; console.log("PROBLEM:", what); } };
const jpeg = async (w: number, h: number, color: string) => sharp({ create: { width: w, height: h, channels: 3, background: color } }).jpeg().toBuffer();
const pages = async (buf: Buffer) => (await PDFDocument.load(buf)).getPageCount();

if (process.argv[2]) {
  const r = await toReadablePdf(fs.readFileSync(process.argv[2]));
  console.log("error" in r ? r : { converted: r.converted, pages: await pages(r.pdf) });
  process.exit(0);
}

const real = await PDFDocument.create(); real.addPage([200, 200]); real.addPage([200, 200]);
const realBuf = Buffer.from(await real.save());
let r = await toReadablePdf(realBuf);
check(!("error" in r) && !r.converted && r.pdf === realBuf, "a real PDF must be returned untouched");

const zip = new AdmZip();
zip.addFile("page 10.jpeg", await jpeg(300, 400, "#ff0000"));
zip.addFile("page 2.jpeg", await jpeg(300, 400, "#00ff00"));
zip.addFile("page 1.jpeg", await jpeg(300, 400, "#0000ff"));
zip.addFile("__MACOSX/._page 1.jpeg", Buffer.from("junk"));
zip.addFile(".DS_Store", Buffer.from("junk"));
zip.addFile("notes.txt", Buffer.from("hello"));
r = await toReadablePdf(zip.toBuffer());
check(!("error" in r) && r.converted && (await pages(r.pdf)) === 3, "a zip of 3 photos must become a 3-page PDF");

const zipPdf = new AdmZip(); zipPdf.addFile("hw.pdf", realBuf);
r = await toReadablePdf(zipPdf.toBuffer());
check(!("error" in r) && r.converted && (await pages(r.pdf)) === 2, "a zip holding one PDF must give that PDF");

r = await toReadablePdf(await jpeg(100, 100, "#123456"));
check(!("error" in r) && r.converted && (await pages(r.pdf)) === 1, "a lone photo must become a 1-page PDF");

const empty = new AdmZip(); empty.addFile("readme.txt", Buffer.from("nothing here"));
r = await toReadablePdf(empty.toBuffer());
check("error" in r, "a zip with no photos or PDFs must be refused");
r = await toReadablePdf(Buffer.from("just some text that is not a pdf at all, long enough to look like a file"));
check("error" in r, "a text file must be refused");
r = await toReadablePdf(Buffer.alloc(0));
check("error" in r, "an empty file must be refused");

console.log(bad ? `${bad} problem(s)` : "all upload checks pass");
process.exit(bad ? 1 : 0);
