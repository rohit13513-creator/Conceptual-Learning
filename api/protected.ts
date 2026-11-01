import type { IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import { handleProtected, realDeps } from "../protectedFiles.js";

// Vercel sends requests for protected study files here (see the rewrites in vercel.json):
//   /assets/<file>      -> ?k=a&p=<file>
//   /diagrams/<path>    -> ?k=d&p=<path>
//   /download/<bucket>/<file>.pdf -> ?k=f&p=<bucket>/<file>.pdf
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const params = new URL(req.url || "/", "http://localhost").searchParams;
  try {
    const deps = realDeps();
    // TEMPORARY DIAGNOSTIC (removed right after checking): how many protected files can this function see?
    const count = (d: string) => { try { return fs.readdirSync(d).length; } catch { return -1; } };
    res.setHeader("X-Diag", `assets=${count(deps.baseDir + "/assets")};diagrams=${count(deps.baseDir + "/diagrams")};cwd=${process.cwd()};secret=${deps.secret ? "set" : "MISSING"};supabase=${process.env.SUPABASE_URL ? "set" : "MISSING"};key=${process.env.SUPABASE_SERVICE_ROLE_KEY ? "set" : "MISSING"}`);
    await handleProtected(req, res, params.get("k") || "", params.get("p") || "", deps);
  } catch (err: any) {
    console.error("protected file error:", err?.message);
    res.statusCode = 500;
    res.setHeader("Cache-Control", "no-store");
    res.end("Something went wrong.");
  }
}
