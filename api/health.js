module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Keep this endpoint deliberately boring. Do not expose which secrets exist.
  return res.status(200).json({
    ok: true,
    service: "Creator Academy Hub backend",
    time: new Date().toISOString()
  });
};
