const Stripe = require("stripe");

const PLAN_CONFIG = {
  plus: { env: "STRIPE_PRICE_PLUS", mode: "subscription", publicName: "Plus" },
  elite: { env: "STRIPE_PRICE_ELITE", mode: "subscription", publicName: "Elite" },
  pro: { env: "STRIPE_PRICE_PRO", mode: "subscription", publicName: "Pro" },
  proplus: { env: "STRIPE_PRICE_PROPLUS", mode: "subscription", publicName: "Pro+" },
  proplus_lifetime: { env: "STRIPE_PRICE_PROPLUS_LIFETIME", mode: "payment", publicName: "Pro+ Lifetime" },
  platinum: { env: "STRIPE_PRICE_PLATINUM", mode: "subscription", publicName: "Platinum" },
  platinum_lifetime: { env: "STRIPE_PRICE_PLATINUM_LIFETIME", mode: "payment", publicName: "Platinum Lifetime" }
};

const MAX_BODY_BYTES = 10_000;
const CHECKOUT_RATE_LIMIT_WINDOW_MS = 60_000;
const CHECKOUT_RATE_LIMIT_MAX = 12;
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
  const recent = bucket.filter((time) => now - time < CHECKOUT_RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitBucket.set(key, recent);
  return recent.length <= CHECKOUT_RATE_LIMIT_MAX;
}

function safeJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
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

function requestBaseUrl(req) {
  const configured = configuredSiteUrl();
  if (configured) return configured;

  const host = String(req.headers.host || "localhost:3000").toLowerCase();
  const safeHost = /^[a-z0-9.-]+(?::\d+)?$/.test(host) ? host : "localhost:3000";
  return `${safeHost.includes("localhost") ? "http" : "https"}://${safeHost}`;
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

  // Allow Vercel preview deployments for testing, but not as a broad production rule.
  if (process.env.VERCEL_ENV !== "production" && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
    return true;
  }

  return false;
}

function cleanLearnerId(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_.:@-]/g, "")
    .slice(0, 120);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return safeJson(res, 405, { error: "Method not allowed" });
  }

  if (!allowedOrigin(req)) {
    return safeJson(res, 403, { error: "Origin not allowed" });
  }

  if (!rateLimit(req)) {
    return safeJson(res, 429, { error: "Too many checkout attempts. Try again shortly." });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return safeJson(res, 500, { error: "Checkout is not configured yet." });
  }

  const body = await readBody(req);
  if (body.__tooLarge) return safeJson(res, 413, { error: "Request body too large." });

  const plan = String(body.plan || "").trim().toLowerCase();
  const learnerId = cleanLearnerId(body.learnerId);
  const config = PLAN_CONFIG[plan];

  if (!config) return safeJson(res, 400, { error: "Invalid plan." });

  const priceId = process.env[config.env];
  if (!priceId || !/^price_[A-Za-z0-9]+$/.test(priceId)) {
    return safeJson(res, 500, { error: `Missing or invalid ${config.env} environment variable for ${config.publicName}.` });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const base = requestBaseUrl(req);

  const sessionConfig = {
    mode: config.mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${base}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/?checkout=cancelled&plan=${encodeURIComponent(plan)}`,
    client_reference_id: learnerId || undefined,
    metadata: { plan, learnerId },
    allow_promotion_codes: true
  };

  if (config.mode === "subscription") {
    sessionConfig.subscription_data = { metadata: { plan, learnerId } };
  } else {
    sessionConfig.payment_intent_data = { metadata: { plan, learnerId } };
  }

  try {
    const session = await stripe.checkout.sessions.create(sessionConfig);
    return safeJson(res, 200, { url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout creation failed", { message: error.message, type: error.type });
    return safeJson(res, 500, { error: "Failed to create Checkout Session." });
  }
};
