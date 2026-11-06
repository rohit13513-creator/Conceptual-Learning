// Regression test for the login-protected study file handler. Run after a build: npx tsx scripts/test-protected-files.mts
// Uses fake accounts and a fake secret only -- it never touches the real database or secrets.
import http from "node:http";
import fs from "node:fs";
import crypto from "node:crypto";
import { handleProtected, type ProtectedDeps } from "../protectedFiles.ts";
import { signToken, base64url } from "../sessionToken.ts";

const SECRET = "unit-test-secret-not-the-real-one";
const users: Record<string, { status: string; studentType: string | null; role: string; studentClass?: string }> = {
  "offline@x.com": { status: "approved", studentType: "offline", role: "student", studentClass: "X" },
  "online@x.com": { status: "approved", studentType: "online", role: "student", studentClass: "X" },
  "ix@x.com": { status: "approved", studentType: "offline", role: "student", studentClass: "IX" },
  "pending@x.com": { status: "pending", studentType: "offline", role: "student" },
  "admin@x.com": { status: "approved", studentType: "offline", role: "admin" },
};
let lookups = 0;
const deps: ProtectedDeps = {
  secret: SECRET,
  baseDir: "protected",
  lookupUser: async (email) => { lookups++; return users[email] || null; },
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
const ok1 = (name: string, cond: boolean, extra = '') => { if (cond) { pass++; console.log('ok  ', name); } else { fail++; console.log('FAIL', name, extra); } };
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
// ── immediate cut-off ──
{
  const cookie = `cl_session=${encodeURIComponent(tok("cut@x.com"))}`;
  users["cut@x.com"] = { status: "approved", studentType: "offline", role: "student" };
  const url = `http://127.0.0.1:${port}/?k=a&p=${encodeURIComponent(chunk)}`;
  const first = await fetch(url, { headers: { cookie } });
  const etag = first.headers.get("etag") || "";
  const beforeLookups = lookups;
  const again = await fetch(url, { headers: { cookie, "if-none-match": etag } });
  ok1("saved copy: server answers 304 (not modified) after re-checking the account", again.status === 304 && lookups === beforeLookups + 1 && /^private, max-age=\d+$/.test(first.headers.get("cache-control") || ""), `${again.status} lookups+${lookups - beforeLookups} ${first.headers.get("cache-control")}`);
  users["cut@x.com"].status = "rejected"; // the teacher rejects the student
  const after = await fetch(url, { headers: { cookie, "if-none-match": etag } });
  ok1("rejected student: very next request refused, even with a saved copy", after.status === 403, String(after.status));
  const afterPdf = await fetch(`http://127.0.0.1:${port}/?k=f&p=downloads%2Fx.pdf`, { headers: { cookie } });
  ok1("rejected student: PDF refused", afterPdf.status === 403, String(afterPdf.status));
}
// ── Mock Test Series PDFs ──
await check("mock test PDF, no login", "m", "x-bio-1/paper", {}, 401);
await check("mock test paper, offline Class X student: opens", "m", "x-bio-1/paper", { cookie: tok("offline@x.com") }, 302, (r) => { const l = r.headers.get("location") || ""; return l.includes("/object/sign/downloads/mock-x-bio-1-paper.pdf") && !l.includes("download=") ? null : "bad location " + l; });
await check("mock test answer key, ONLINE Class X student: opens", "m", "x-bio-1/key", { cookie: tok("online@x.com") }, 302, (r) => ((r.headers.get("location") || "").includes("mock-x-bio-1-key.pdf") && !(r.headers.get("location") || "").includes("download=") ? null : "bad location"));
await check("mock test saved copy, offline student", "m", "x-bio-1/paper/download", { cookie: tok("offline@x.com") }, 302, (r) => ((r.headers.get("location") || "").includes("download=Class-X-Mock-Test-1-Question-Paper.pdf") ? null : "no download name: " + r.headers.get("location")));
await check("mock test saved copy, ONLINE student is refused", "m", "x-bio-1/paper/download", { cookie: tok("online@x.com") }, 403);
await check("mock test, student of another class is refused", "m", "x-bio-1/paper", { cookie: tok("ix@x.com") }, 403);
await check("mock test, admin", "m", "x-bio-1/key/download", { cookie: tok("admin@x.com", "admin") }, 302);
await check("mock test, pending account", "m", "x-bio-1/paper", { cookie: tok("pending@x.com") }, 403);
await check("mock test, unknown test", "m", "x-zzz-9/paper", { cookie: tok("offline@x.com") }, 400);
await check("mock test, wrong file kind", "m", "x-bio-1/secret", { cookie: tok("offline@x.com") }, 400);
await check("mock test, path traversal", "m", "../x-bio-1/paper", { cookie: tok("offline@x.com") }, 400);
await check("mock test, extra path part", "m", "x-bio-1/paper/download/more", { cookie: tok("offline@x.com") }, 400);
await check("unknown kind", "z", chunk, { cookie: tok("offline@x.com") }, 400);
// ── the account check that runs on every API request ──
{
  const { makeAccountGate } = await import("../accountGate.ts");
  const status: Record<string, string | null> = { "good@x.com": "approved", "rej@x.com": "rejected", "pen@x.com": "pending" };
  let down = false;
  const gate = makeAccountGate({
    verifyToken: (t) => { try { return JSON.parse(Buffer.from(t, "base64").toString()); } catch { return null; } },
    lookupStatus: async (email) => (down ? { status: null, failed: true } : { status: email in status ? status[email] : null, failed: false }),
  });
  const run = async (path: string, auth?: string) => {
    let code = 0, passedOn = false;
    const req: any = { path, headers: auth ? { authorization: "Bearer " + auth } : {} };
    const res: any = { status(c: number) { code = c; return this; }, json() {} };
    await gate(req, res, () => { passedOn = true; });
    return { code, passedOn };
  };
  const t = (email: string) => Buffer.from(JSON.stringify({ email, role: "student" })).toString("base64");
  const cases: [string, string, string | undefined, number, boolean][] = [
    ["approved student passes", "/homework/mine", t("good@x.com"), 0, true],
    ["rejected student refused at once", "/homework/mine", t("rej@x.com"), 401, false],
    ["pending account refused", "/revision/mine", t("pen@x.com"), 401, false],
    ["deleted account refused", "/announcements", t("ghost@x.com"), 401, false],
    ["public endpoint (login) always open", "/login", undefined, 0, true],
    ["no token: endpoint's own check decides", "/homework/mine", undefined, 0, true],
    ["not-ours token (scheduled job secret) passes on", "/cron/check-homework", "not-a-token", 0, true],
    ["rejected student cannot use change-password", "/change-password", t("rej@x.com"), 401, false],
  ];
  for (const [name, path, auth, code, passed] of cases) { const r = await run(path, auth); ok1("account check: " + name, r.code === code && r.passedOn === passed, JSON.stringify(r)); }
  down = true;
  const r = await run("/homework/mine", t("good@x.com"));
  ok1("account check: database down -> asks to retry, never lets through", r.code === 503 && !r.passedOn, JSON.stringify(r));
}
server.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
