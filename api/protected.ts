import type { IncomingMessage, ServerResponse } from "node:http";
import { handleProtected, realDeps } from "../protectedFiles.js";

// Vercel sends requests for protected study files here (see the rewrites in vercel.json):
//   /assets/<file>      -> ?k=a&p=<file>
//   /diagrams/<path>    -> ?k=d&p=<path>
//   /download/<bucket>/<file>.pdf -> ?k=f&p=<bucket>/<file>.pdf
//   /mocktest/<test id>/<paper|key>[/download] -> ?k=m&p=<test id>/<paper|key>[/download]
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const params = new URL(req.url || "/", "http://localhost").searchParams;
  try {
    await handleProtected(req, res, params.get("k") || "", params.get("p") || "", realDeps());
  } catch (err: any) {
    console.error("protected file error:", err?.message);
    res.statusCode = 500;
    res.setHeader("Cache-Control", "no-store");
    res.end("Something went wrong.");
  }
}
