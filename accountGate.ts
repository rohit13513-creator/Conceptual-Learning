import type { NextFunction, Request, Response } from "express";

// Stops a student whose account is no longer approved (rejected, suspended, still pending, or deleted) from using
// ANY part of the app that needs a login, immediately. A login token stays valid for 30 days, so without this
// check a student who was rejected could keep using the app until it ran out. The account's status is read from
// the database on every request, with no caching, so rejecting someone takes effect on their very next click.

export interface AccountGateDeps {
  verifyToken: (token: string) => { email: string; role: string } | null;
  lookupStatus: (email: string) => Promise<{ status: string | null; failed: boolean }>;
}

// Endpoints that must work without being logged in (or that handle their own secret).
const PUBLIC_PATHS = new Set([
  "/health", "/login", "/login/google", "/register", "/otp/send",
  "/forgot-password/request", "/forgot-password/reset", "/session/clear", "/user/approve-external", "/marks-review",
]);

export function makeAccountGate(deps: AccountGateDeps) {
  return async function accountGate(req: Request, res: Response, next: NextFunction) {
    if (PUBLIC_PATHS.has(req.path)) return next();
    const header = String(req.headers["authorization"] || "");
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
    const who = token ? deps.verifyToken(token) : null;
    // No login token (or not one of ours, e.g. the scheduled-job secret): the endpoint's own checks decide.
    if (!who) return next();
    const { status, failed } = await deps.lookupStatus(who.email);
    if (failed) return void res.status(503).json({ error: "Please try again in a moment." });
    if (status !== "approved") return void res.status(401).json({ error: "Your account is not active. Please contact your teacher." });
    return next();
  };
}
