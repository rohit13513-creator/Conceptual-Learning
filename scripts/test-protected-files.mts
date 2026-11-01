// Regression test for the login-protected study file handler. Run after a build: npx tsx scripts/test-protected-files.mts
// Uses fake accounts and a fake secret only -- it never touches the real database or secrets.
import http from "node:http";
import fs from "node:fs";
import crypto from "node:crypto";
import { handleProtected, type ProtectedDeps } from "../protectedFiles.ts";
import { signToken, base64url } from "../sessionToken.ts";

const SECRET = "unit-test-secret-not-the-real-one";
const users: Record<string, { status: string; studentType: string | null; role: string }> = {
  "offline@x.com": { status: "approved", studentType: "offline", role: "student" },
  "online@x.com": { status: "approved", studentType: "online", role: "student" },
  "pending@x.com": { status: "pending", studentType: "offline", role: "student" },
  "admin@x.com": { status: "approved", studentType: "offline", role: "admin" },
};
const deps: ProtectedDeps = {
  secret: SECRET,
  baseDir: "protected",
  lookupUser: async (email) => users[email] || null,
  readStorage: async (bucket, p) => (bucket === "study-notes" && p === "biology10-diagrams/a.webp" ? Buffer.from("IMG") : null),
  signStorage: async (bucket, p) => `https://example.supabase.co/storage/v1/object/sign/${bucket}/${p}?token=T`,
};
const server = http.createServer((req, res) => {
  const u = new URL(req.url!, "http://x");
  handleProtected(req, res, u.searchParams.get("k") || "", u.searchParams.get("p") || "", deps).catch((e) => { res.statusCode = 500; res.end(String(e)); });
});
await new Promise<void>((r) => server.listen(0, r));
const port = (server.address() as any).port;
const tok = (email: string, role = "student") => signToken({ email, role }, SECRET);
const expired = (() => {
  const body = base64url(Buffer.from(JSON.stringify({ email: "offline@x.com", role: "student", exp: Date.now() - 1000 })));
  return `${body}.${base64url(crypto.createHmac("sha256", SECRET).update(body).digest())}`;
})();
const tampered = tok("offline@x.com").replace(/.$/, (c) => (c === "A" ? "B" : "A"));
const wrongSecret = signToken({ email: "offline@x.com", role: "student" }, "some-other-secret");

const chunk = fs.readdirSync("protected/assets").find((f) => f.startsWith("LearnCarbon10") && f.endsWith(".js"))!;
const diagram = (() => { const d = fs.readdirSync("protected/diagrams"); const sub = d[0]; return `${sub}/${fs.readdirSync(`protected/diagrams/${sub}`)[0]}`; })();
let pass = 0, fail = 0;
async function check(name: string, k: string, p: string, opts: { cookie?: string; bearer?: string; method?: string; enc?: string }, expectStatus: number, extra?: (r: Response) => string | null) {
  const headers: Record<string, string> = {};
  if (opts.cookie) headers["cookie"] = `cl_session=${encodeURIComponent(opts.cookie)}`;
  if (opts.bearer) headers["authorization"] = `Bearer ${opts.bearer}`;
  if (opts.enc) headers["accept-encoding"] = opts.enc;
  const r = await fetch(`http://127.0.0.1:${port}/?k=${k}&p=${encodeURIComponent(p)}`, { headers, redirect: "manual", method: opts.method || "GET" });
  const problem = r.status !== expectStatus ? `expected ${expectStatus}, got ${r.status}` : extra ? extra(r) : null;
  if (problem) { fail++; console.log("FAIL", name, "-", problem); } else { pass++; console.log("ok  ", name); }
}

await check("code file, no login", "a", chunk, {}, 401);
await check("diagram, no login", "d", diagram, {}, 401);
await check("PDF, no login", "f", "downloads/Class-10-Carbon-Compounds-Notes.pdf", {}, 401);
await check("tampered token", "a", chunk, { cookie: tampered }, 401);
await check("expired token", "a", chunk, { cookie: expired }, 401);
await check("token signed with another secret", "a", chunk, { cookie: wrongSecret }, 401);
await check("code file, offline student (cookie)", "a", chunk, { cookie: tok("offline@x.com") }, 200, (r) => (/javascript/.test(r.headers.get("content-type") || "") && /private/.test(r.headers.get("cache-control") || "") && !/public/.test(r.headers.get("cache-control") || "") ? null : "bad headers " + r.headers.get("content-type") + " / " + r.headers.get("cache-control")));
await check("code file, brotli", "a", chunk, { cookie: tok("offline@x.com"), enc: "br" }, 200, (r) => (r.headers.get("content-encoding") === "br" ? null : "no br"));
await check("code file, via Authorization header", "a", chunk, { bearer: tok("online@x.com") }, 200);
await check("code file, HEAD", "a", chunk, { cookie: tok("offline@x.com"), method: "HEAD" }, 200);
await check("code file, online student", "a", chunk, { cookie: tok("online@x.com") }, 200);
await check("code file, pending account", "a", chunk, { cookie: tok("pending@x.com") }, 403);
await check("code file, unknown account", "a", chunk, { cookie: tok("ghost@x.com") }, 403);
await check("diagram, offline student", "d", diagram, { cookie: tok("offline@x.com") }, 200, (r) => (/^image\//.test(r.headers.get("content-type") || "") ? null : "not an image"));
await check("remote diagram (study-notes)", "d", "study-notes/biology10-diagrams/a.webp", { cookie: tok("online@x.com") }, 200);
await check("remote diagram missing", "d", "study-notes/biology10-diagrams/zzz.webp", { cookie: tok("online@x.com") }, 404);
await check("PDF, offline student", "f", "downloads/Class-10-Carbon-Compounds-Notes.pdf", { cookie: tok("offline@x.com") }, 302, (r) => ((r.headers.get("location") || "").includes("/object/sign/downloads/") && (r.headers.get("location") || "").includes("download=") ? null : "bad location " + r.headers.get("location")));
await check("PDF, admin", "f", "study-notes/class10-biology-life-processes.pdf", { cookie: tok("admin@x.com", "admin") }, 302);
await check("PDF, ONLINE student is refused", "f", "downloads/Class-10-Carbon-Compounds-Notes.pdf", { cookie: tok("online@x.com") }, 403);
await check("PDF, pending account", "f", "downloads/Class-10-Carbon-Compounds-Notes.pdf", { cookie: tok("pending@x.com") }, 403);
await check("PDF, unknown bucket", "f", "chapter-notes/x.pdf", { cookie: tok("offline@x.com") }, 400);
await check("PDF, nested path", "f", "downloads/a/b.pdf", { cookie: tok("offline@x.com") }, 400);
await check("PDF, not a pdf", "f", "downloads/x.zip", { cookie: tok("offline@x.com") }, 400);
await check("path traversal (..)", "a", "../server.cjs", { cookie: tok("offline@x.com") }, 400);
await check("path traversal (encoded)", "a", "..%2F..%2Fpackage.json", { cookie: tok("offline@x.com") }, 400);
await check("diagram traversal", "d", "../assets/" + chunk, { cookie: tok("offline@x.com") }, 400);
await check("asset wrong extension", "a", "x.json", { cookie: tok("offline@x.com") }, 400);
await check("asset sub-folder", "a", "sub/x.js", { cookie: tok("offline@x.com") }, 400);
await check("unknown file", "a", "nothere-abc.js", { cookie: tok("offline@x.com") }, 404);
await check("POST not allowed", "a", chunk, { cookie: tok("offline@x.com"), method: "POST" }, 405);
await check("unknown kind", "z", chunk, { cookie: tok("offline@x.com") }, 400);
server.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
