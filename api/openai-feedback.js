module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(501).json({ ok: false, error: "OpenAI API is not configured yet." });
  }
  return res.status(501).json({ ok: false, error: "OpenAI feedback endpoint placeholder. Connect full logic later." });
};
