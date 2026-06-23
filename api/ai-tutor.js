const { verifyEntitlementToken } = require("./_entitlement-token");

const AI_RATE_LIMIT_WINDOW_MS = 60_000;
const AI_RATE_LIMIT_MAX = 12;
const rateLimitBucket = new Map();

const ALLOWED_PUBLIC_ORIGINS = new Set([
  "https://www.freddiemurray.co.uk",
  "https://freddiemurray.co.uk"
]);

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
  const recent = bucket.filter((time) => now - time < AI_RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitBucket.set(key, recent);
  return recent.length <= AI_RATE_LIMIT_MAX;
}

function safeJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(payload);
}

function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const host = req.headers.host || "localhost:3000";
  return `${host.includes("localhost") ? "http" : "https"}://${host}`;
}

function allowedOrigins(req) {
  const origins = new Set(ALLOWED_PUBLIC_ORIGINS);
  origins.add(siteUrl(req));
  const extra = String(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim().replace(/\/$/, ""))
    .filter(Boolean);
  for (const origin of extra) origins.add(origin);
  return origins;
}

function enforceOrigin(req, res) {
  const origin = String(req.headers.origin || "").replace(/\/$/, "");
  if (!origin) return true;
  if (allowedOrigins(req).has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    return true;
  }
  return false;
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
      if (raw.length > 12_000) req.destroy();
    });
    req.on("end", () => {
      try { resolve(JSON.parse(raw || "{}")); } catch { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function verifyAccess(body) {
  const token = cleanText(body.entitlementToken, 4096);
  if (!token) return { ok: false, status: 401, error: "AI Tutor requires signed paid/admin entitlement." };
  const verified = verifyEntitlementToken(token);
  if (!verified.ok) return { ok: false, status: 401, error: "AI Tutor entitlement check failed." };
  return { ok: true, plan: verified.plan, customerEmail: verified.customerEmail || "" };
}

function buildSystemPrompt(access) {
  return [
    "You are the Creator Academy Hub AI Tutor for a Roblox Studio learning platform.",
    "Teach Roblox Studio, Roblox Lua, UI, Blender pipeline, Moon Animator, VFX, publishing, monetisation, and creator-business topics.",
    "Use practical beginner-to-advanced guidance. Prefer short steps, definitions, checks, and Roblox-specific examples.",
    "Do not claim you can inspect the learner's private files or Roblox project unless they paste the relevant code/details.",
    "Do not do homework/exam answers as a pure answer dump. Coach the learner, show method, ask for their attempt, and provide feedback.",
    "For Lua/code help, explain what each part does and include safe, minimal Roblox snippets when useful.",
    "For business/monetisation help, avoid promises of income and focus on ethical product thinking.",
    `Learner verified plan: ${access.plan || "unknown"}.`
  ].join("\n");
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  const chunks = [];
  const output = Array.isArray(data.output) ? data.output : [];
  for (const item of output) {
    const content = Array.isArray(item.content) ? item.content : [];
    for (const part of content) {
      if (typeof part.text === "string") chunks.push(part.text);
      if (typeof part.output_text === "string") chunks.push(part.output_text);
    }
  }
  return chunks.join("\n").trim();
}

async function callOpenAI({ message, context, access }) {
  const model = cleanText(process.env.OPENAI_MODEL, 100) || "gpt-5.4-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      max_output_tokens: 900,
      input: [
        { role: "system", content: buildSystemPrompt(access) },
        {
          role: "user",
          content: [
            context ? `Current page/context:\n${context}` : "Current page/context: not provided.",
            `Learner question:\n${message}`
          ].join("\n\n")
        }
      ]
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = data.error?.message || `OpenAI request failed with status ${response.status}.`;
    const error = new Error(msg);
    error.status = response.status;
    throw error;
  }

  const answer = extractOutputText(data);
  if (!answer) throw new Error("OpenAI returned an empty response.");
  return { answer, model };
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    if (!enforceOrigin(req, res)) return safeJson(res, 403, { ok: false, error: "Origin not allowed." });
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return safeJson(res, 405, { ok: false, error: "Method not allowed" });
  }

  if (!enforceOrigin(req, res)) {
    return safeJson(res, 403, { ok: false, error: "Origin not allowed." });
  }

  if (!rateLimit(req)) {
    return safeJson(res, 429, { ok: false, error: "Too many AI Tutor requests. Try again shortly." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return safeJson(res, 501, { ok: false, error: "OpenAI API is not configured. Add OPENAI_API_KEY in Vercel." });
  }

  const body = await readBody(req);
  const access = verifyAccess(body);
  if (!access.ok) return safeJson(res, access.status || 401, { ok: false, error: access.error });

  const message = cleanText(body.message, 2000);
  const context = cleanText(body.context, 2000);
  if (message.length < 3) {
    return safeJson(res, 400, { ok: false, error: "Ask a longer question first." });
  }

  try {
    const result = await callOpenAI({ message, context, access });
    return safeJson(res, 200, {
      ok: true,
      answer: result.answer,
      model: result.model,
      plan: access.plan
    });
  } catch (error) {
    console.error("AI Tutor failed", { message: error.message, status: error.status || 500 });
    return safeJson(res, error.status && error.status < 500 ? error.status : 500, {
      ok: false,
      error: error.status && error.status < 500 ? error.message : "AI Tutor failed. Check OpenAI/Vercel configuration."
    });
  }
};
