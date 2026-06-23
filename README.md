# Creator Academy Hub

Clean directory build.

Read:

```text
docs/UPLOAD-INSTRUCTIONS.md
```

Top-level files should include:

```text
index.html
package.json
vercel.json
api/
css/
js/
docs/
```

## Security note

This build includes a defensive hardening pass for headers, Stripe API routes, health endpoint leakage, and production-domain admin disabling. See `docs/SECURITY-HARDENING-PASS.md`.


## File Explorer Local Mode

This build includes `js/local-file-mode.js`, so `index.html` can be opened directly from File Explorer for UI testing. Real Stripe/Vercel API routes still require Vercel or `vercel dev`. See `docs/FILE-EXPLORER-LOCAL-MODE.md`.


## Local admin testing

When opened from File Explorer (`file:///.../index.html`) or localhost, this build shows a `Local Admin` button in the bottom-right corner. It opens the prototype admin dashboard for testing course unlocks, progress, lesson states, and local data. Public domains keep admin disabled.


## AI Tutor

This build includes a backend-only AI Tutor integration. Add `OPENAI_API_KEY` in Vercel and deploy to use real AI. File Explorer mode shows a local preview only. See `docs/AI-TUTOR-INTEGRATION.md`.
