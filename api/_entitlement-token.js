const crypto = require("crypto");

const VALID_PAID_PLANS = new Set([
  "plus",
  "elite",
  "pro",
  "proplus",
  "proplus_lifetime",
  "platinum",
  "platinum_lifetime"
]);

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function fromBase64url(input) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signingSecret() {
  return process.env.ENTITLEMENT_SIGNING_SECRET || process.env.STRIPE_SECRET_KEY || "";
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function signPayload(payload) {
  const secret = signingSecret();
  if (!secret) throw new Error("Missing ENTITLEMENT_SIGNING_SECRET.");
  const encoded = base64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

function createEntitlementToken({ plan, learnerId, sessionId, customerEmail, mode }) {
  const cleanPlan = String(plan || "").trim().toLowerCase();
  if (!VALID_PAID_PLANS.has(cleanPlan)) throw new Error("Invalid entitlement plan.");
  const now = Math.floor(Date.now() / 1000);
  const ttlDays = cleanPlan.endsWith("_lifetime") ? 3650 : 35;
  return signPayload({
    v: 1,
    iss: "creator-academy-hub",
    plan: cleanPlan,
    learnerId: String(learnerId || "").slice(0, 200),
    sessionId: String(sessionId || "").slice(0, 200),
    customerEmail: String(customerEmail || "").slice(0, 320),
    mode: String(mode || "").slice(0, 50),
    iat: now,
    exp: now + ttlDays * 24 * 60 * 60
  });
}

function verifyEntitlementToken(token) {
  const secret = signingSecret();
  if (!secret) return { ok: false, error: "Entitlement verification is not configured." };

  const parts = String(token || "").split(".");
  if (parts.length !== 2) return { ok: false, error: "Malformed entitlement token." };

  const [encoded, sig] = parts;
  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  if (!safeEqual(sig, expected)) return { ok: false, error: "Invalid entitlement signature." };

  let payload;
  try {
    payload = JSON.parse(fromBase64url(encoded));
  } catch {
    return { ok: false, error: "Invalid entitlement payload." };
  }

  const plan = String(payload.plan || "").trim().toLowerCase();
  const now = Math.floor(Date.now() / 1000);
  if (!VALID_PAID_PLANS.has(plan)) return { ok: false, error: "Unknown entitlement plan." };
  if (!payload.exp || Number(payload.exp) < now) return { ok: false, error: "Entitlement token expired." };

  return {
    ok: true,
    plan,
    expiresAt: new Date(Number(payload.exp) * 1000).toISOString(),
    issuedAt: payload.iat ? new Date(Number(payload.iat) * 1000).toISOString() : "",
    customerEmail: payload.customerEmail || "",
    mode: payload.mode || ""
  };
}

module.exports = {
  VALID_PAID_PLANS,
  createEntitlementToken,
  verifyEntitlementToken
};
