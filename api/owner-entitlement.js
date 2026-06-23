const crypto = require("crypto");
const { VALID_PAID_PLANS, createEntitlementToken } = require("./_entitlement-token");

const MAX_BODY_BYTES = 4096;
const OWNER_RATE_LIMIT_WINDOW_MS = 60_000;
const OWNER_RATE_LIMIT_MAX = 6;
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
  const recent = bucket.filter((time) => now - time < OWNER_RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitBucket.set(key, recent);
  return recent.length <= OWNER_RATE_LIMIT_MAX;
}

function safeJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(payload);
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") {
    if (Buffer.byteLength(req.body, "utf8") > MAX_BODY_BYTES) return Promise.resolve({ __tooLarge: true });
    try { return Promise.resolve(JSON.parse(req.body)); } catch { return Promise.resolve({}); }
  }

  return new Promise((resolve) => {
    let raw = "";
    let tooLarge = false;

    req.on("data", (chunk) => {
      raw += chunk;
      if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
        tooLarge = true;
        req.destroy();
      }
    });

    req.on("end", () => {
      if (tooLarge) return resolve({ __tooLarge: true });
      try { resolve(JSON.parse(raw || "{}")); } catch { resolve({}); }
    });

    req.on("error", () => resolve(tooLarge ? { __tooLarge: true } : {}));
  });
}

function configuredSiteUrl() {
  return String(process.env.SITE_URL || "https://www.freddiemurray.co.uk").replace(/\/$/, "");
}

function configuredAllowedOrigins() {
  const fixed = [
    configuredSiteUrl(),
    "https://www.freddiemurray.co.uk",
    "https://freddiemurray.co.uk"
  ];

  const extra = String(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim().replace(/\/$/, ""))
    .filter(Boolean);

  if (process.env.VERCEL_URL) {
    extra.push(`https://${String(process.env.VERCEL_URL).replace(/\/$/, "")}`);
  }

  return new Set(fixed.concat(extra).filter(Boolean));
}

function allowedOrigin(req) {
  const origin = String(req.headers.origin || "").replace(/\/$/, "");
  if (!origin) return true;

  if (configuredAllowedOrigins().has(origin)) return true;
  if (/^http:\/\/localhost:\d+$/i.test(origin)) return true;

  if (process.env.VERCEL_ENV !== "production" && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
    return true;
  }

  return false;
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function sha256Hex(value) {
  return crypto.createHash("sha256").update(String(value || ""), "utf8").digest("hex");
}

function verifyOwnerToken(submittedToken) {
  const token = String(submittedToken || "").trim();
  const plain = String(process.env.OWNER_ACCESS_TOKEN || "").trim();
  const hash = String(process.env.OWNER_ACCESS_TOKEN_SHA256 || "").trim().toLowerCase();

  if (!plain && !hash) {
    return { ok: false, status: 500, error: "Owner access is not configured." };
  }

  if (token.length < 32) {
    return { ok: false, status: 401, error: "Invalid owner access token." };
  }

  if (plain) {
    if (plain.length < 32) {
      return { ok: false, status: 500, error: "Owner token is configured but too short. Use 32+ random characters." };
    }
    return { ok: safeEqual(token, plain), status: 401, error: "Invalid owner access token." };
  }

  if (!/^[a-f0-9]{64}$/.test(hash)) {
    return { ok: false, status: 500, error: "OWNER_ACCESS_TOKEN_SHA256 must be a 64-character SHA-256 hex string." };
  }

  return { ok: safeEqual(sha256Hex(token), hash), status: 401, error: "Invalid owner access token." };
}

function ownerPlan() {
  const plan = String(process.env.OWNER_PLAN || "platinum_lifetime").trim().toLowerCase();
  return VALID_PAID_PLANS.has(plan) ? plan : "platinum_lifetime";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return safeJson(res, 405, { ok: false, error: "Method not allowed" });
  }

  if (!allowedOrigin(req)) {
    return safeJson(res, 403, { ok: false, error: "Origin not allowed" });
  }

  if (!rateLimit(req)) {
    return safeJson(res, 429, { ok: false, error: "Too many owner access attempts. Try again shortly." });
  }

  const body = await readBody(req);
  if (body.__tooLarge) return safeJson(res, 413, { ok: false, error: "Request body too large." });

  const check = verifyOwnerToken(body.ownerToken);
  if (!check.ok) return safeJson(res, check.status, { ok: false, error: check.error });

  try {
    const plan = ownerPlan();
    const entitlementToken = createEntitlementToken({
      plan,
      learnerId: "owner",
      sessionId: "owner-entitlement",
      customerEmail: String(process.env.OWNER_EMAIL || "").slice(0, 320),
      mode: "owner_grant"
    });

    return safeJson(res, 200, {
      ok: true,
      owner: true,
      plan,
      entitlementToken,
      message: "Owner entitlement issued. Store this only on your own device/browser."
    });
  } catch (error) {
    console.error("Owner entitlement failed", { message: error.message });
    return safeJson(res, 500, { ok: false, error: "Owner entitlement could not be issued." });
  }
};
