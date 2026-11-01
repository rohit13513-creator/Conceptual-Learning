// Runs right after "vite build". Takes everything that must only be visible after login OUT of the public
// website folder (dist/) and puts it in protected/, which only the login-checking function can read:
//   * every code file that is loaded after the log-in screen (notes, question banks, simulators, tools)
//   * the diagram images
// and removes the PDF notes from dist/ (they are served from private storage, after a login + offline check).
// What stays public is only what is needed to show the home page and the log-in / register screens.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const dist = "dist";
const out = "protected";
const manifestPath = path.join(dist, ".vite", "manifest.json");
if (!fs.existsSync(manifestPath)) throw new Error("dist/.vite/manifest.json is missing -- build.manifest must be true in vite.config.ts");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// 1. The public set: the page that loads first, and the portal shell that contains the log-in screen,
//    with everything either of them loads immediately (static imports).
// The portal shell is the chunk named "App" (src/App.tsx), which the page loads when someone logs in.
const roots = Object.keys(manifest).filter((k) => manifest[k].isEntry || manifest[k].name === "App");
if (!roots.some((k) => manifest[k].name === "App")) throw new Error("the App chunk was not found in the manifest");
const publicKeys = new Set();
const walk = (key) => {
  if (!manifest[key] || publicKeys.has(key)) return;
  publicKeys.add(key);
  for (const dep of manifest[key].imports || []) walk(dep);
};
roots.forEach(walk);
const publicFiles = new Set([...publicKeys].map((k) => manifest[k].file));

// 2. Everything else that is a code file is protected.
const protectedFiles = [...new Set(Object.values(manifest).map((c) => c.file))].filter((f) => f.endsWith(".js") && !publicFiles.has(f));

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "assets"), { recursive: true });
let bytes = 0;
for (const f of protectedFiles) {
  const from = path.join(dist, f);
  if (!fs.existsSync(from)) continue;
  const to = path.join(out, "assets", path.basename(f));
  const buf = fs.readFileSync(from);
  bytes += buf.length;
  fs.writeFileSync(to, buf);
  fs.writeFileSync(to + ".br", zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 9 } }));
  fs.rmSync(from);
  fs.rmSync(from + ".map", { force: true });
}

// 3. Diagram images
if (fs.existsSync(path.join(dist, "diagrams"))) fs.renameSync(path.join(dist, "diagrams"), path.join(out, "diagrams"));

// 4. PDF notes are never part of the public folder
let pdfs = 0;
for (const f of fs.readdirSync(dist)) if (f.toLowerCase().endsWith(".pdf")) { fs.rmSync(path.join(dist, f)); pdfs++; }

// 5. The build manifest is not for the public either
fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });

// 6. Safety check: nothing protected may remain public, and the shell files must still be there
for (const f of protectedFiles) if (fs.existsSync(path.join(dist, f))) throw new Error("protected file still public: " + f);
for (const f of publicFiles) if (f.endsWith(".js") && !fs.existsSync(path.join(dist, f))) throw new Error("public file missing: " + f);
console.log(`protect-build: ${protectedFiles.length} code files (${(bytes / 1048576).toFixed(1)} MB) moved to protected/assets, ` +
  `${publicFiles.size} files stay public, diagrams moved, ${pdfs} PDFs removed from the public folder.`);
