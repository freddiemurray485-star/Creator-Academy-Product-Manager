const Stripe = require("stripe");
const { createEntitlementToken } = require("./_entitlement-token");

const PRICE_ENV_TO_PLAN = {
  STRIPE_PRICE_PLUS: "plus",
  STRIPE_PRICE_ELITE: "elite",
  STRIPE_PRICE_PRO: "pro",
  STRIPE_PRICE_PROPLUS: "proplus",
  STRIPE_PRICE_PROPLUS_LIFETIME: "proplus_lifetime",
  STRIPE_PRICE_PLATINUM: "platinum",
  STRIPE_PRICE_PLATINUM_LIFETIME: "platinum_lifetime"
};

const STATUS_RATE_LIMIT_WINDOW_MS = 60_000;
const STATUS_RATE_LIMIT_MAX = 30;
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
  const recent = bucket.filter((time) => now - time < STATUS_RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitBucket.set(key, recent);
  return recent.length <= STATUS_RATE_LIMIT_MAX;
}

function safeJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.status(status).json(payload);
}

function priceMap() {
  const map = {};
  for (const [envName, plan] of Object.entries(PRICE_ENV_TO_PLAN)) {
    const price = process.env[envName];
    if (price && /^price_[A-Za-z0-9]+$/.test(price)) map[price] = plan;
  }
  return map;
}

function isPaidSession(session) {
  if (!session) return false;
  if (session.payment_status === "paid") return true;
  return Boolean(session.mode === "subscription" && session.status === "complete" && session.subscription);
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return safeJson(res, 405, { error: "Method not allowed" });
  }

  if (!rateLimit(req)) {
    return safeJson(res, 429, { ok: false, error: "Too many verification attempts. Try again shortly." });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return safeJson(res, 500, { ok: false, error: "Checkout verification is not configured yet." });
  }

  const sessionId = String(req.query.session_id || "").trim();
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return safeJson(res, 400, { ok: false, error: "Missing or invalid session_id." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price"]
    });

    const priceId = session.line_items?.data?.[0]?.price?.id;
    const plan = priceMap()[priceId];
    const paid = isPaidSession(session);

    if (!paid) {
      return safeJson(res, 200, {
        ok: false,
        paid: false,
        status: session.status,
        paymentStatus: session.payment_status
      });
    }

    if (!plan) {
      return safeJson(res, 400, {
        ok: false,
        paid: true,
        error: "Paid session found, but the Stripe Price ID is not mapped to a known plan."
      });
    }

    const customerEmail = session.customer_details?.email || "";
    const entitlementToken = createEntitlementToken({
      plan,
      learnerId: session.client_reference_id || session.metadata?.learnerId || "",
      sessionId: session.id,
      customerEmail,
      mode: session.mode
    });

    return safeJson(res, 200, {
      ok: true,
      paid: true,
      plan,
      entitlementToken,
      entitlementExpiresNote: plan.endsWith("_lifetime") ? "Lifetime access token issued." : "Monthly access token issued with a renewal buffer.",
      mode: session.mode,
      customerEmail,
      status: session.status,
      paymentStatus: session.payment_status
    });
  } catch (error) {
    console.error("Stripe checkout verification failed", { message: error.message, type: error.type });
    return safeJson(res, 500, { ok: false, error: "Failed to verify Checkout Session." });
  }
};
