const { verifyEntitlementToken } = require("./_entitlement-token");

const VERIFY_RATE_LIMIT_WINDOW_MS = 60_000;
const VERIFY_RATE_LIMIT_MAX = 60;
const rateLimitBucket = new Map();

function clientIp(req) {
  return String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim()
    .slice(0, 120);
}

function rateLimit(req) {
  const now = Date.now();
  const key = clientIp(req);
  const bucket = rateLimitBucket.get(key) || [];
  const recent = bucket.filter((time) => now - time < VERIFY_RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitBucket.set(key, recent);
  return recent.length <= VERIFY_RATE_LIMIT_MAX;
}

function safeJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(payload);
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") {
    try { return Promise.resolve(JSON.parse(req.body)); } catch { return Promise.resolve({}); }
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
      if (raw.length > 4096) req.destroy();
    });
    req.on("end", () => {
      try { resolve(JSON.parse(raw || "{}")); } catch { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return safeJson(res, 405, { ok: false, error: "Method not allowed" });
  }

  if (!rateLimit(req)) {
    return safeJson(res, 429, { ok: false, error: "Too many entitlement checks. Try again shortly." });
  }

  const body = await readBody(req);
  const token = String(body.entitlementToken || "").trim();
  if (!token || token.length > 4096) {
    return safeJson(res, 400, { ok: false, error: "Missing or invalid entitlement token." });
  }

  const result = verifyEntitlementToken(token);
  if (!result.ok) return safeJson(res, 401, result);
  return safeJson(res, 200, result);
};
