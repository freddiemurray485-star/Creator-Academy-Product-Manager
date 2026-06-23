# Creator Academy Hub — Combined Documentation
This file combines the docs folder to keep the GitHub web upload under the file-count limit.


---

# Source: `docs/30-LEVEL-PROGRESSION-REFINED.md`

# 30-Level Progression Refined

This patch fixes the course-level naming and structure.

Important correction:

```text
Level 25 is no longer labelled as the final academy level.
Level 25 is now Product Polish and Pre-Launch Review.
Level 30 is the true final Elite Creator Thesis and Long-Term Roadmap.
```

Course structure:

```text
Section 1: Foundation Course
Levels 1–15

Section 2: Specialist Course
Levels 16–30
```

Each level now has updated:

- name
- focus/description
- outcome
- course tags
- gate title
- gate requirements
- 20 lesson-slot labels

The progression now reads like a 30-level academy instead of ending accidentally at Level 25.



---

# Source: `docs/ADMIN-NEUTRALIZATION-NOTES.md`

# Admin Neutralization Notes

This pass removes the old demo admin passcode from the public source layer and disables prototype admin tools outside local development hosts.

Why:

- Static JavaScript is public.
- A frontend passcode is not real security.
- Vercel preview/public deployments should not expose admin unlock tools.

Current behaviour:

```text
localhost / 127.0.0.1 -> prototype admin UI can remain for local development only
www.freddiemurray.co.uk -> disabled
freddiemurray.co.uk -> disabled
Vercel preview domains -> disabled
other public hosts -> disabled
```

Real future admin should be implemented through backend authentication, server-side roles, and database-backed entitlements.



---

# Source: `docs/AI-TUTOR-INTEGRATION.md`

# AI Tutor Integration

This patch adds a backend-only OpenAI integration for Creator Academy Hub.

## Added files

- `api/ai-tutor.js`
- `js/ai-tutor.js`
- `css/ai-tutor.css`

## Behaviour

- File Explorer / `file://` mode shows the AI Tutor interface but uses local preview messages only.
- Real AI calls require Vercel or `vercel dev`, because `/api/ai-tutor` must run server-side.
- The OpenAI API key is never placed in frontend JavaScript.
- The API route requires a signed Creator Academy entitlement token before it calls OpenAI.

## Required Vercel environment variables

```text
OPENAI_API_KEY
OPENAI_MODEL
```

`OPENAI_MODEL` is optional. Default:

```text
gpt-5.4-mini
```

Keep `OPENAI_API_KEY` sensitive.

## Existing env vars still required for paid/owner access

```text
ENTITLEMENT_SIGNING_SECRET
OWNER_ACCESS_TOKEN
OWNER_PLAN
STRIPE_SECRET_KEY
SITE_URL
STRIPE_PRICE_PLUS
STRIPE_PRICE_ELITE
STRIPE_PRICE_PRO
STRIPE_PRICE_PROPLUS
STRIPE_PRICE_PROPLUS_LIFETIME
STRIPE_PRICE_PLATINUM
STRIPE_PRICE_PLATINUM_LIFETIME
STRIPE_WEBHOOK_SECRET
```

## Security notes

- The backend rate-limits requests by IP.
- Request bodies are size-limited.
- Questions and context are length-limited.
- Same-origin/public-domain origin checks are used.
- The route does not run for unauthenticated frontend-only localStorage plan edits unless a signed entitlement token exists.

## Test process

Local File Explorer:

```text
Open index.html → click AI Tutor → confirm local preview message appears.
```

Vercel deployment:

```text
1. Add OPENAI_API_KEY in Vercel.
2. Redeploy.
3. Use owner access or Stripe checkout to create a signed entitlement.
4. Click AI Tutor.
5. Ask a short Roblox/Lua question.
```

`vercel dev` local backend test:

```bash
npm install
vercel dev
```

Then open the localhost URL and test after adding local env vars.



---

# Source: `docs/ASSESSMENT-DIRECT-HUBS-FIX.md`

# Assessment Direct Hubs Fix

Problem found during local testing:

- Homework from the Assessments choice screen could fall through into the older academic homework function, which still used plan-gate logic and could send the user to Plans.
- Formal Exams could fall through into the older exam/course system and appear to route into Courses.

Fix:

- Added `js/assessment-direct-hubs.js`, loaded after `js/assessment-choice-router.js`.
- Homework now renders a dedicated direct Homework Hub.
- Formal Exams now renders a dedicated direct Formal Exam Hub.
- These pages do not call `showPlans()`, `showLevelHub()`, or the older gated exam router.
- Local homework/exam drafts save to browser `localStorage` for File Explorer testing.

This preserves the existing Course tab and payment/security systems while making the Assessments menu behave as requested.



---

# Source: `docs/ASSESSMENTS-HOME-ROUTING-FIX.md`

# Assessments and Home Routing Fix

Final routing patch added after the topbar click guard.

## Changed

- `Home` now renders a real homepage view directly instead of relying on older plan/coursework overrides.
- `Assessments` now opens a clean choice screen with exactly two primary options:
  - Homework
  - Formal Exams
- `Homework` routes to `showAcademicHomeworkHub()` when available.
- `Formal Exams` routes to `showExamHub()` first, then falls back to `showCourseworkExams()`.
- Course button behaviour is preserved.

## Added files

- `js/assessment-choice-router.js`
- `css/assessment-choice-router.css`

## Reason

The historical script stack contained several older assessment overrides: Coursework, Courses, Levels, and Exams were repeatedly repointed. This final patch keeps the existing systems but exposes a simpler user-facing assessment choice.



---

# Source: `docs/CODEBASE-INSPECTION-NOTES.md`

# Codebase Inspection Notes

## What was inspected

- Root app structure
- `index.html` script and stylesheet order
- CSS layer list
- JS layer list
- Vercel configuration
- Stripe API routes
- Package scripts
- SEO files
- Course/path/portfolio/plan patch layers

## Main conclusion

This is not a generic website. It is a layered Roblox creator academy app. Most features are added through later override files, so load order matters.

## Cleanup decision

Runtime scripts and styles were bundled, but the source layer files were kept. This avoids the danger of deleting context while still making the deployed HTML cleaner.

## Important warning

Do not treat `script.js` as the only app file. Many final behaviours come from later source layers and the generated `js/academy.bundle.js`.



---

# Source: `docs/DEPLOYMENT-STACK-CHECKLIST.md`

# Deployment Stack Checklist

Project stack:

```text
GitHub -> Vercel -> Fasthosts domain/DNS -> Vercel SSL -> Stripe Checkout -> Screaming Frog SEO audit
```

## GitHub

Commit the folder that directly contains:

```text
index.html
api/
css/
js/
package.json
vercel.json
```

If the repository has the folder `creator-academy-hub-stripe-linked-plans/`, set that as the Vercel Root Directory.

## Vercel

Required project settings:

```text
Root Directory: creator-academy-hub-stripe-linked-plans
Framework Preset: Other / static where applicable
Build Command: leave empty or npm run check if you want strict checking
Output Directory: leave empty
```

Required environment variables:

```text
STRIPE_SECRET_KEY
SITE_URL
STRIPE_PRICE_PLUS
STRIPE_PRICE_ELITE
STRIPE_PRICE_PRO
STRIPE_PRICE_PROPLUS
STRIPE_PRICE_PROPLUS_LIFETIME
STRIPE_PRICE_PLATINUM
STRIPE_PRICE_PLATINUM_LIFETIME
STRIPE_WEBHOOK_SECRET
```

Recommended:

```text
SITE_URL=https://www.freddiemurray.co.uk
```

## Fasthosts DNS

Use Fasthosts to point both domains to Vercel:

```text
www.freddiemurray.co.uk
freddiemurray.co.uk
```

Keep `www.freddiemurray.co.uk` as the main SEO/canonical version.

## Stripe

Use Stripe Price IDs, not old Payment Link URLs.

Correct plan IDs sent by the site:

```text
plus
elite
pro
proplus
proplus_lifetime
platinum
platinum_lifetime
```

## Screaming Frog

After deployment, crawl:

```text
https://www.freddiemurray.co.uk
```

Do not crawl both `www` and non-`www` at the same time unless you are deliberately testing redirects.

Expected canonical:

```text
https://www.freddiemurray.co.uk/
```



---

# Source: `docs/ENTITLEMENT-HARDENING-PASS.md`

# Entitlement Hardening Pass

This pass reduces the biggest prototype weakness: trusting plain browser `localStorage` for paid access.

## What changed

- Added `api/_entitlement-token.js`.
- Added `api/verify-entitlement.js`.
- `/api/checkout-status` now returns a signed entitlement token after Stripe verifies a paid Checkout Session.
- `js/backend-checkout.js` stores the signed entitlement token after checkout.
- `js/final-stability-cleanup.js` now requires a backend-verified entitlement token for paid access on public domains.
- Local development still allows the old prototype behaviour so the site can be tested without blocking every local view.
- Added `ENTITLEMENT_SIGNING_SECRET` to `.env.example`.

## What this prevents

Before this pass, a user could edit browser storage keys such as:

```text
creatorAcademy.plan
academyPlan
```

and trick the frontend into treating them as paid.

After this pass, public domains require:

```text
creatorAcademy.entitlementToken
```

to be verified by `/api/verify-entitlement` before paid UI state is trusted.

## What this does not fully solve

This is still not a full account system. It does not give you:

- login accounts
- passwordless auth
- user dashboards synced across devices
- database-backed subscription state
- cancellation/revocation handling from Stripe subscriptions
- server-side hiding of all paid course content

For a real paid launch, the next architecture should be:

```text
Auth provider + database + Stripe webhook fulfilment + backend entitlement checks
```

Stripe recommends using webhooks for fulfilment, and OWASP guidance warns against storing sensitive access data purely client-side. This pass moves the project closer to that model without forcing a database decision yet.



---

# Source: `docs/EXTREME-DENSITY-LESSONS.md`

# Extreme Density Lessons

This build turns each course sublesson into a dense 60–90 minute lesson.

Each sublesson includes:

- Direct definition
- Mental model
- Vocabulary dictionary
- 8 microchapters
- Core pattern
- Vocabulary checks
- Misconception traps
- Practical ladder
- Debugging checklist
- Mini exam
- 0–5 rubric
- Evidence box with word target
- Reference links

Goal:

```text
No fake completion.
No vague learning.
No loose vocabulary.
No blind copying.
```

A learner should leave each sublesson able to define, build, debug, transfer and judge the concept.



---

# Source: `docs/FILE-EXPLORER-LOCAL-MODE.md`

# File Explorer Local Mode

This build can be opened by double-clicking `index.html` in File Explorer.

## What works in File Explorer

- Home page
- Course UI
- Path filtering
- Lesson pages
- Homework/local progress storage
- Portfolio/local storage
- Plan window UI
- Local paid-plan preview for testing

## What does not work in File Explorer

Real backend features do not run under `file://`, including:

- `/api/create-checkout-session`
- `/api/checkout-status`
- `/api/verify-entitlement`
- `/api/stripe-webhook`
- real Stripe checkout verification
- real signed entitlement verification

That is normal. File Explorer is static-only.

## How local paid-plan preview works

When a paid plan is selected from `file://`, the site shows a warning and asks whether to unlock a local preview.
This is only for checking the UI and course gates in your own browser.
It is not real payment security and is not used on the deployed site.

## Real Stripe testing

Use one of these instead:

```bash
npm install
vercel dev
```

or deploy through Vercel with the required environment variables.

## Production rule

The production build should still use:

```text
Stripe Price IDs → Vercel API routes → signed entitlement token
```

Do not treat File Explorer local preview as real paid access.



---

# Source: `docs/FINAL-SEO-NOTES.md`

# Final SEO Clean Build

This build targets the final Screaming Frog warnings:

- Page title over 60 characters
- Page title over 561 pixels
- Meta description over 155 characters
- Meta description over 985 pixels
- Multiple H2 headings

Final title:

```text
Creator Academy Hub | Roblox Training
```

Final meta description:

```text
Learn Roblox Studio, Lua, Blender, UI, VFX and creator business with structured lessons, homework, exams and XP.
```

Canonical URL:

```text
https://www.freddiemurray.co.uk/
```

Deploy this folder as the Vercel root directory.



---

# Source: `docs/HARDENING-PASS-CHANGELOG.md`

# Hardening Pass Changelog

This pass jackhammered weak points without changing the core Creator Academy Hub structure.

## Fixed

- Removed legacy Stripe Payment Link URLs from runtime JavaScript source. Checkout should go through `/api/create-checkout-session` using Stripe Price IDs in Vercel env vars.
- Hardened `js/backend-checkout.js`:
  - safer localStorage reads/writes
  - safer learner ID generation
  - plan ID normalisation
  - paid-plan whitelist before checkout
  - clearer checkout/backend error messages
- Added `npm run build` so Vercel/GitHub workflows can regenerate bundles before deployment.
- Kept `npm run check` as a full bundle + syntax check.
- Added `.gitignore` to avoid committing `node_modules`, `.env`, `.vercel`, and editor junk.
- Added `.env.example` with placeholder Vercel environment variables.
- Fixed privacy/terms canonical URLs:
  - `/privacy`
  - `/terms`
- Updated `sitemap.xml` to use clean URLs instead of `.html` URLs.

## Preserved

- Same top-level project structure.
- Same `index.html` entry point.
- Same CSS/JS source-layer files.
- Same generated runtime bundle approach.
- Same Vercel API route layout.
- Same plan IDs and course architecture.

## Deployment note

Deploy the folder that directly contains:

```text
index.html
api/
css/
js/
package.json
vercel.json
```

On Vercel, make sure the real secret values are added in Project Settings, not committed to GitHub.



---

# Source: `docs/LOCAL-ADMIN-MODE.md`

# Local Admin Mode

This build re-enables the prototype admin dashboard only for local testing.

Allowed hosts:

```text
file:///.../index.html
http://localhost:...
http://127.0.0.1:...
```

Blocked hosts:

```text
www.freddiemurray.co.uk
freddiemurray.co.uk
*.vercel.app
any public domain
```

How to open locally:

1. Extract the ZIP.
2. Double-click `index.html`.
3. Click the `Local Admin` button in the bottom-right corner.

Security note:

This is a frontend prototype admin panel. It is acceptable for local UI/course testing only. Production admin should use real accounts, backend role checks, and database-backed admin permissions.



---

# Source: `docs/LOCAL-ADMIN-RANK-FIX.md`

# Local Admin Rank Fix

This patch fixes local/File Explorer admin behaviour.

## Problem

Local admin could open the admin dashboard and display `Admin` in some places, but the access gate still treated the user as Basic/Free because the final entitlement hardening layer only counted public paid plans as paid access.

## Fix

Added:

```text
js/local-admin-rank-fix.js
```

Loaded after:

```text
js/owner-access.js
```

## Behaviour

Local/File Explorer/localhost:

```text
Admin = highest internal rank
Admin rank = 99
Admin bypasses all plan gates
Admin removes Basic/Free warning
Admin shows as internal status, not as a purchasable public plan
```

Public domains:

```text
Frontend admin remains blocked.
Production owner access still uses /api/owner-entitlement and Vercel secrets.
```

## Reason

Admin should be usable for local testing but must not be sold or exposed as a public payment option.



---

# Source: `docs/LOCAL-ADMIN-UI-POLISH.md`

# Local Admin UI Polish

This patch reduces the local Admin badge so it does not cover the footer or page content.

Changed:

- Added `js/local-admin-ui-polish.js`.
- The badge now appears as a compact `Admin` pill.
- Clicking the pill expands/collapses the longer explanation.
- The `×` button hides the badge locally.
- This patch is visual-only; it does not grant admin access.
- Production admin rules are unchanged.



---

# Source: `docs/LOCAL-ADMIN-UI-TOPBAR.md`

# Local Admin UI Topbar Fix

The previous local Admin pill was small but still floated over the Creator Academy Hub title area on some window sizes.

This patch keeps the admin indicator visible but moves it into the top navigation/header flow instead of floating over page content.

Changed file:

```text
js/local-admin-ui-polish.js
```

Expected behaviour:

```text
Local/File Explorer admin active -> small Admin pill appears in the topbar/navigation area.
Click Admin -> expands local/testing status text.
Click x -> hides the badge locally.
Production/public domains -> frontend admin remains blocked.
```

This patch is visual-only and does not grant access by itself.



---

# Source: `docs/LOCAL-BANNER-FIX.md`

# Local Banner Fix

Fixed the File Explorer local-mode banner covering/cutting off the top navigation.

Change:

- `js/local-file-mode.js` now renders the banner in normal document flow instead of sticky/fixed position.
- The message is shorter so it does not dominate the header area.
- Production/Vercel behavior is unchanged.

Reason:

The site topbar is already sticky at `top: 0`. A second sticky banner at `top: 0` overlaps it in local `file://` mode.



---

# Source: `docs/OWNER-ACCESS-SETUP.md`

# Owner Access Setup

This build adds a production-safe owner unlock path.

It does **not** put an admin code in frontend JavaScript.

## What it does

1. You visit the live domain with `?owner=1`.
2. The site opens an Owner Access modal.
3. You paste your private owner token.
4. `/api/owner-entitlement` checks the token on the backend.
5. The backend returns a signed entitlement token.
6. The browser stores that signed entitlement for the real domain.

This lets your own browser become Platinum on the real domain without making local File Explorer storage global.

## Required Vercel environment variables

Add these to Vercel Project Settings → Environment Variables:

```text
ENTITLEMENT_SIGNING_SECRET
OWNER_ACCESS_TOKEN
OWNER_PLAN
OWNER_EMAIL
```

Recommended:

```text
OWNER_PLAN=platinum_lifetime
```

`OWNER_EMAIL` is optional but useful for logs/metadata later.

## Safer token storage option

Instead of storing `OWNER_ACCESS_TOKEN`, you can store only a SHA-256 hash:

```text
OWNER_ACCESS_TOKEN_SHA256=<sha256 hex of your private token>
```

If `OWNER_ACCESS_TOKEN` is set, the API uses that. If it is not set, it checks `OWNER_ACCESS_TOKEN_SHA256`.

## How to use after deployment

Open:

```text
https://www.freddiemurray.co.uk/?owner=1
```

Paste your owner token.

After success, remove `?owner=1` from the address bar. The entitlement stays in that browser until it expires or storage is cleared.

## Important limits

This is not a full account system.

It gives owner access to one browser/device at a time. To use another device, open `?owner=1` there and paste the token again.

For permanent cross-device ownership, the site still needs real accounts and a database.



---

# Source: `docs/OWNER-ACCESS-VERCEL-STEPS.md`

# Vercel Steps for Owner Access

## 1. Generate a private token

Use a long random token. Minimum 32 characters. Do not use a normal password.

Example shape:

```text
ca_owner_7d8f2c9b4a1e6f0d_random_long_secret_here
```

## 2. Add env vars in Vercel

Go to:

```text
Vercel Dashboard → Your Project → Settings → Environment Variables
```

Add:

```text
ENTITLEMENT_SIGNING_SECRET=<long random secret>
OWNER_ACCESS_TOKEN=<your private owner token>
OWNER_PLAN=platinum_lifetime
OWNER_EMAIL=<your email optional>
```

Keep them enabled for Production. You can also add them to Preview/Development if you test there.

## 3. Redeploy

After env vars are changed, redeploy the project so the serverless functions receive the new values.

## 4. Use it

Go to:

```text
https://www.freddiemurray.co.uk/?owner=1
```

Paste the owner token.

## 5. Local File Explorer warning

This does not work from:

```text
file:///.../index.html
```

File Explorer has no Vercel backend API routes. File Explorer mode still has Local Admin for testing only.



---

# Source: `docs/PATH-BUTTONS-FIX.md`

# Path Buttons Fix

Fixed the path cards so `Open Path` opens the filtered Course/Level view instead of the old small path lesson tree.

Fixes included:

- Directly changed generated path buttons from `openCourse(pathId)` to `showPathCourseFilter(pathId)`.
- Added `js/path-buttons-hard-fix.js` as a final capture-layer override.
- Updated path-course-filter wrapper to intercept `openCourse` as well.

Expected behaviour:

```text
Roblox Studio Basics → Studio-filtered course levels
Roblox Lua → Lua-filtered course levels
Blender → Blender-filtered course levels
Moon Animator → animation-filtered course levels
```



---

# Source: `docs/PATH-FILTERED-COURSES.md`

# Path Filtered Courses

Added:

- Clicking `Open Path` on Roblox Studio Basics opens only course levels that include Roblox Studio Basics.
- Clicking `Open Path` on Roblox Lua opens only course levels that include Roblox Lua.
- Clicking `Open Path` on Blender opens only course levels that include Blender.
- Clicking `Open Path` on Moon Animator opens only course levels that include Moon Animator.
- Levels with multiple course tags still show if one of their tags matches the selected path.

Examples:

```text
Blender path
→ Asset Creation
→ Animation and Polish
→ Pro+ Creator Project
→ Studio Production Pipeline
```

because those levels include Blender somewhere in their course tags or focus text.



---

# Source: `docs/PLAN-WINDOW-UPGRADE.md`

# Plan Window Upgrade

Added a upgraded pricing/access window.

Features:

- Cleaner premium plan layout
- Plan first, payment type second
- Monthly/lifetime options inside plan cards
- Pro+ opens to Pro+ Monthly or Pro+ Lifetime
- Platinum opens to Platinum Monthly or Platinum Lifetime
- Lifetime tab for one-time options
- Buyer confirmation modal before checkout/access action
- Comparison table clarifying monthly vs lifetime hierarchy
- FAQ explaining Pro+ Lifetime vs Platinum
- Back Home and View Courses actions

Important structure:

```text
Pro+ Lifetime stays inside Pro+.
Platinum Lifetime stays inside Platinum.
Platinum is the highest tier, but Pro+ Lifetime is not visually buried.
```



---

# Source: `docs/PORTFOLIO-SECTION.md`

# Portfolio Section

Adds a relevant Creator Portfolio section for:

- Roblox Game
- Roblox System
- Roblox UI
- Blender Asset
- Moon Animator Animation
- VFX / Effects
- Coursework Case Study
- Business / Monetisation Plan

Features:

- Portfolio button in navigation
- Local portfolio saving
- Confirmation before adding
- Confirmation before deleting
- Portfolio readiness checklist
- Final readiness confirmation
- JSON export

Readiness requires:

- 3 portfolio pieces
- 1 Roblox game/system
- 1 visual/asset/UI/animation/VFX piece
- 1 detailed case-study evidence section
- 1 complete project with title/type/summary/evidence/skills
- 1 project listing 3+ skills



---

# Source: `docs/README-BACKEND.md`

# Creator Academy Hub — Backend Stripe Setup

This build adds Vercel API routes for backend-created Stripe Checkout Sessions.

## What it does

1. The plan button calls `/api/create-checkout-session`.
2. Vercel creates a Stripe Checkout Session.
3. Stripe redirects back with `?checkout=success&session_id=...`.
4. The frontend calls `/api/checkout-status`.
5. The backend verifies the Checkout Session with Stripe.
6. The correct plan unlocks locally.

## Added files

- `api/create-checkout-session.js`
- `api/checkout-status.js`
- `api/stripe-webhook.js`
- `backend-checkout.js`
- `package.json`

## Required Vercel environment variables

Add these in Vercel:

Project → Settings → Environment Variables

```text
STRIPE_SECRET_KEY
SITE_URL
STRIPE_PRICE_PLUS
STRIPE_PRICE_ELITE
STRIPE_PRICE_PRO
STRIPE_PRICE_PROPLUS
STRIPE_PRICE_PROPLUS_LIFETIME
STRIPE_PRICE_PLATINUM
STRIPE_PRICE_PLATINUM_LIFETIME
STRIPE_WEBHOOK_SECRET
ENTITLEMENT_SIGNING_SECRET
```

`SITE_URL` should be:

```text
https://freddiemurray.co.uk
```

## Important

Use Stripe Price IDs like:

```text
price_123...
```

Do not use Payment Link URLs like:

```text
https://buy.stripe.com/...
```

## Existing old payments

Old static Payment Link purchases cannot automatically unlock unless you manually set the user/admin state or check Stripe Dashboard. This backend works for new purchases started from the site after this build is deployed.



---

# Source: `docs/README-LIVE.md`

# Creator Academy Hub — Live Ready Refined

This build is prepared for near-live prototype testing.

## Current status

- Premium academy UI kept.
- Detailed sublessons kept.
- Course Section 1 and Section 2 kept.
- XP, homework, coursework, exams, notes, and plan access kept.
- Launch meta tags added.
- Lightweight Privacy / Terms modals added.
- OpenAI API integration is not active yet.

## OpenAI API rule

Do not put an OpenAI API key inside frontend JavaScript.

When adding AI later:

1. Create a backend endpoint.
2. Store the API key in an environment variable.
3. The frontend calls your backend.
4. Your backend calls OpenAI.
5. Your backend returns safe output to the frontend.

Recommended variable name:

OPENAI_API_KEY



---

# Source: `docs/README.md`

# Creator Academy Hub


## Minimal Platinum patch

This version keeps the previous website design/structure and only adds:

- Platinum Monthly
- £39.99/mo
- Stripe link: [removed: use Stripe Price IDs via Vercel env vars]


## Grouped plan options update

- Pro+ is one card with Monthly and Lifetime buttons inside it.
- Platinum is the highest public monthly tier.
- Pro+ Lifetime remains above Platinum overall.
- Admin remains hidden/internal only.


## Pro+ single button choice modal

- Pro+ plan card now has one `Choose Pro+` button.
- Clicking it opens a Monthly / Lifetime choice popup.
- Pro+ Lifetime remains above Platinum Monthly overall.


## Platinum Lifetime choice update

- Platinum now has one `Choose Platinum` button.
- Clicking it opens Monthly / Lifetime options.
- Platinum Monthly: £39.99/mo
- Platinum Lifetime: £549.99 one-time
- Platinum Lifetime Stripe link: [removed: use Stripe Price IDs via Vercel env vars]

Ranking:
Platinum Lifetime > Pro+ Lifetime > Platinum Monthly > Pro+ Monthly


## Platinum access gate fixed

Platinum Monthly and Platinum Lifetime now count as paid access everywhere.

They bypass:
- briefing lock
- payment plan lock
- beginner gate
- level gate access checks
- assessment access checks
- XP/progress page checks

Basic / Free still does not unlock the academy.


## Home button cleanup

Paid/admin users now see only:
- Continue Learning
- View Progress

The extra Plans/Choose Plan button is removed from the paid-access homepage.
No-access users still get the plan screen.


## 15 course levels update

- Visible "Levels" navigation renamed to "Course".
- Coursework is unchanged.
- Added Course Levels 11-15:
  - Level 11: Advanced Game Systems
  - Level 12: Multiplayer and Economy Design
  - Level 13: Advanced UI and Product Experience
  - Level 14: Studio Production Pipeline
  - Level 15: Master Creator Capstone
- Levels 11-15 are gated to Platinum access.


## Course Section 2 update

Course now has separate sections:

- Section 1: Levels 1–15
- Section 2: Levels 16–25

Section 2 is Course content, not Coursework.

Added:
16 AI-Assisted Creator Systems
17 Analytics and Retention Systems
18 Advanced Monetisation Architecture
19 Large-Scale UI Systems
20 Backend and Account Planning
21 Community and Moderation Systems
22 Performance and Optimisation
23 Professional Portfolio Building
24 Studio Team Leadership
25 World-Class Creator Final


## Premium refinement layer

This build keeps the current academy logic and adds a clean premium refinement layer:

- `premium-refine.css` controls the upgraded visual system.
- `premium-refine.js` handles small UI cleanup, nav wording, duplicate notice removal, and premium microinteractions.
- Core logic remains in `script.js`.
- No leaderboard was reintroduced.
- Course Section 1 and Section 2 remain intact.


## Academic framework layer

This build adds a formal academy structure:

- Official definitions for Unit, Lesson, Level, Homework, Coursework, and Exam/Review.
- Textbook-style lesson blocks.
- Homework system with local saving and XP reward.
- Grade bands: Pass, Merit, Distinction, Mastery.
- Unit codes such as CA-S1-U01 and CA-S2-U16.
- More formal assessment criteria for homework, coursework, and exams.
- Core academy systems are preserved.


## Bugfix duplicate Course and path gate

Fixed:
- Duplicate Course button in the top navigation.
- Old path cards such as Roblox Studio Basics / Roblox Lua / Blender / Moon Animator no longer send Platinum users back to briefing/plans.
- Platinum and Platinum Lifetime are recognised as paid access before course/path routing.


## Course Section 2 Levels 26-30 update

Added five more specialist Course levels:

- 26 Advanced Security and Anti-Exploit Design
- 27 Advanced Data, Saving, and Progression
- 28 Professional Product Launch Strategy
- 29 Advanced Visual Direction and Brand System
- 30 Elite Creator Thesis

Section 2 now runs Levels 16–30.
These are Course levels, not Coursework.
Levels 26–30 are gated to Platinum Lifetime.


## Lesson open final fix

Added `lesson-open-fix.js`, loaded last.

Fixes:
- Course lesson cards not opening from the Lessons tab.
- Academic framework accidentally overriding `openLevelLesson(level, slot)`.
- Lesson completion now works from the restored lesson page.


## Detailed sublessons update

Added:
- detailed-sublessons.css
- detailed-sublessons.js

Each Course sublesson now includes:
- official textbook definition
- full explanation
- worked/example context
- guided practical
- independent task
- extension task
- common mistakes
- mini exam questions
- assessment focus
- grading rubric
- homework submission
- completion checklist


## Live ready refinement

Added `live-ready.css`, `live-ready.js`, and `README-LIVE.md` for near-live prototype testing.


## Backend Stripe checkout layer

Added Vercel API routes for backend-created Stripe Checkout Sessions and verified plan unlock. See `README-BACKEND.md`.


## SEO audit fixes

Added:
- Single improved title tag
- Meta description
- Canonical URL
- Static hidden H1
- Extra readable SEO content panel
- robots.txt
- sitemap.xml
- llms.txt
- Vercel headers/config
- Basic security headers
- Static asset cache headers

Notes:
- HTTPS is handled by Vercel/domain propagation.
- Compression is handled by Vercel/CDN, but audit tools may still flag unminified source files.
- Duplicate content can still appear briefly if both the custom domain and `.vercel.app` domain are crawled. Use the custom domain as canonical.


## HTTPS mixed content fix

Added:
- Content-Security-Policy: upgrade-insecure-requests; block-all-mixed-content
- Strict-Transport-Security
- Replacement of obvious hardcoded non-local http:// links with https://

If the browser still says the page is not fully secure, open DevTools → Console and look for "Mixed Content" to identify the exact file or URL still loading over HTTP.


## Favicon fix

Added `favicon.ico` and `favicon.png` to stop `/favicon.ico` 404 errors.


## WWW canonical SEO fix

Screaming Frog showed:
- root domain redirects to www
- page canonical pointed to non-www
- canonical therefore pointed to a redirect/non-indexable URL

Fixed:
- canonical URL now uses https://www.freddiemurray.co.uk/
- sitemap URL now uses https://www.freddiemurray.co.uk/
- robots.txt sitemap now uses https://www.freddiemurray.co.uk/sitemap.xml
- llms.txt main URL now uses https://www.freddiemurray.co.uk/
- X-Frame-Options header added as SAMEORIGIN
- CSP frame-ancestors added
- hidden static internal links added for crawlers

After deploying, crawl https://www.freddiemurray.co.uk again.


## Screaming Frog minor fixes

Uploaded issues reviewed:
{'h2_multiple.csv': 1, 'page_titles_over_60_characters.csv': 1, 'page_titles_over_561_pixels.csv': 1, 'meta_description_over_155_characters.csv': 1, 'meta_description_over_985_pixels.csv': 1, 'issues_overview_report.csv': 5}

Fixed:
- Title shortened to: `Creator Academy Hub | Roblox Creator Training`
- Meta description shortened to: `Learn Roblox Studio, Lua, Blender, UI, VFX and creator business with structured lessons, homework, coursework, exams and XP.`
- Hidden/admin overlay H2 headings demoted to H3
- Dynamic SEO script no longer resets title/meta to long versions
- Dynamic SEO panel heading demoted from H2 to H3
- WWW canonical setup preserved

After deploying, recrawl:
`https://www.freddiemurray.co.uk`



---

# Source: `docs/README.txt`

Put future screenshots, reference images, GIFs, or short tutorial clips here. When you provide media later, it can be wired into the lesson pages as visual examples.



---

# Source: `docs/REMAINING-STRUCTURAL-SECURITY-WORK.md`

# Remaining Structural Security Work

These items cannot be honestly "fully fixed" inside a static ZIP without choosing external services.

## 1. Real accounts

Needed so each paid learner has an identity.

Possible future choices:

- Clerk
- Supabase Auth
- Auth.js / NextAuth
- Firebase Auth

## 2. Database entitlements

Needed so the server stores who owns which plan.

Possible future choices:

- Supabase Postgres
- Neon Postgres
- Vercel Postgres
- Firebase/Firestore
- Upstash Redis/KV for simple entitlement records

## 3. Stripe webhook fulfilment

The webhook should store or update entitlement records when Stripe sends events such as successful checkout, subscription renewal, failed payment, or cancellation.

## 4. Server-side course delivery

The locked course content is still present in frontend JavaScript. The current gating is stronger than plain localStorage, but serious paid content should eventually be delivered after backend access checks.

## 5. Progress sync

Learner progress is still mostly local browser state. A database is needed for cross-device progress and recovery.



---

# Source: `docs/SCHOLARLY-DENSITY-2X.md`

# Scholarly Density 2X

This doubles lesson density without turning it into vague academic difficulty.

Changed:

- 90–150 minute target per sublesson
- larger vocabulary dictionaries
- vocabulary trap column
- 25-part concept ladder
- worked example protocol
- near-miss/debug protocol
- expanded coursework question bank
- stronger evidence requirements
- 7-band marking rubric
- 750+ word target evidence
- 250-word minimum completion gate

Principle:

```text
Dense by structure.
Beginner-proof by explanation.
Difficult only when the concept genuinely requires care.
```



---

# Source: `docs/SCHOLARLY-DENSITY-LESSONS.md`

# Scholarly Density Lessons

This build increases the lesson density without making the learning artificially difficult.

Principle:

```text
Hard because it is structured and complete.
Not hard because it is vague, unexplained, or overloaded with mystery.
```

Each sublesson now includes 15 coursework blocks:

1. Course Contract
2. Prerequisite Map
3. Vocabulary Dictionary
4. Concept Ladder
5. Core Pattern
6. Worked Example Method
7. Near-Miss Example
8. Vocabulary Checks
9. Lab Manual
10. Cognitive Hooks
11. Retrieval Practice
12. Coursework Questions
13. Marking Rubric
14. Evidence Submission
15. Reference Shelf

Each lesson aims for 75–120 minutes of dense guided work.



---

# Source: `docs/SCRIPT-CLEANUP-CHANGELOG.md`

# Script Cleanup Changelog

This cleanup keeps the existing Creator Academy Hub structure intact.

## Files changed

- `index.html`
  - Removed duplicate final `</html>` closing tag.
  - Added clear comments around the script load chain.
  - Added `js/final-stability-cleanup.js` as the final loaded script.

- `js/final-stability-cleanup.js`
  - Centralises safe final guards without rewriting old feature layers.
  - Normalises plan storage across all known localStorage keys.
  - Re-exposes compatibility helpers used by older patch files.
  - Re-patches dynamic `Open Path` buttons after app view changes.
  - Adds `creatorAcademyDiagnostics()` for DevTools checks.
  - Adds body classes for free/paid access state.

- `package.json`
  - Added `npm run check` to syntax-check all API and JS files.
  - Added a small diagnostics script reminder.

- `vercel.json`
  - Changed JS/CSS cache headers from one-year immutable caching to `max-age=3600, must-revalidate`.
  - This is safer while the site is still changing often, because same-named files such as `script.js` can otherwise stay stale in browser cache after redeploy.

## Rule going forward

Do not load new feature patches before `js/final-stability-cleanup.js` unless you are intentionally replacing the final stability layer.

Current final load order:

```text
script.js
premium-refine.js
academic-framework.js
lesson-open-fix.js
detailed-sublessons.js
live-ready.js
backend-checkout.js
seo-audit-fix.js
path-course-filter.js
extreme-density-lessons.js
scholarly-density-lessons.js
scholarly-density-2x.js
path-buttons-hard-fix.js
course-levels-30-refined.js
portfolio-section.js
plans-window-upgrade.js
stripe-plan-status.js
final-stability-cleanup.js
```



---

# Source: `docs/SCRIPT-MERGE-MAP.md`

# Script and CSS Merge Map

This build keeps the same project structure, but reduces runtime clutter.

## Runtime files loaded by `index.html`

```text
css/academy.bundle.css
js/academy.bundle.js
```

These two files are generated bundles.

## Source files kept

The original layer files are still kept in `css/` and `js/` so the project remains understandable and editable.

Do not delete the source files unless you also update:

```text
tools/build-bundles.js
package.json
index.html
```

## Why the files were bundled

The old build loaded many separate CSS and JS files. That worked, but it made the script chain harder to read and increased the chance of editing the wrong layer.

The bundle keeps the same order while making `index.html` cleaner.

## JS source layer order

```text
js/script.js
js/premium-refine.js
js/academic-framework.js
js/lesson-open-fix.js
js/detailed-sublessons.js
js/live-ready.js
js/backend-checkout.js
js/seo-audit-fix.js
js/path-course-filter.js
js/extreme-density-lessons.js
js/scholarly-density-lessons.js
js/scholarly-density-2x.js
js/path-buttons-hard-fix.js
js/course-levels-30-refined.js
js/portfolio-section.js
js/plans-window-upgrade.js
js/stripe-plan-status.js
js/final-stability-cleanup.js
```

## CSS source layer order

```text
css/style.css
css/premium-refine.css
css/academic-framework.css
css/detailed-sublessons.css
css/live-ready.css
css/seo-audit-fix.css
css/path-course-filter.css
css/extreme-density-lessons.css
css/scholarly-density-lessons.css
css/scholarly-density-2x.css
css/portfolio-section.css
css/plans-window-upgrade.css
```

## Safe edit rule

For small fixes, edit the relevant source file, then run:

```text
npm run bundle
npm run check
```

For new final fixes, add them to `js/final-stability-cleanup.js`, then rebuild the bundle.



---

# Source: `docs/SECURITY-HARDENING-PASS.md`

# Security Hardening Pass

This pass was defensive only. The goal was to reduce obvious abuse paths before GitHub → Vercel redeploy.

## Fixed in this build

- Stronger global security headers in `vercel.json`:
  - `default-src 'self'`
  - `base-uri 'self'`
  - `object-src 'none'`
  - `frame-ancestors 'self'`
  - restricted `form-action`, `connect-src`, `img-src`, `style-src`, and `script-src`
  - `Cross-Origin-Opener-Policy`
  - `Cross-Origin-Resource-Policy`
- `/api/create-checkout-session` hardened:
  - request body size limit
  - basic per-instance rate limiting
  - origin allowlist check
  - stricter Stripe Price ID validation
  - learner ID sanitisation
  - safer host/base URL handling
  - generic production error response
- `/api/checkout-status` hardened:
  - basic per-instance rate limiting
  - stricter Checkout Session ID validation
  - no fallback unlock from untrusted session metadata
  - must map to a configured Stripe Price ID
  - generic production error response
- `/api/health` no longer reveals whether Stripe/OpenAI secrets are configured.
- Production custom domains disable the prototype frontend admin panel:
  - `www.freddiemurray.co.uk`
  - `freddiemurray.co.uk`
- External links opened in a new tab receive `rel="noopener noreferrer"`.

## Remaining security limitation

The current site is still a static/local-storage prototype. A determined user can edit browser storage or frontend JavaScript on their own device. That means local plan unlocks, XP, completed lessons, notes, and admin-style prototype controls are not real account security.

Real paid access security requires:

1. User accounts/authentication.
2. Server-side entitlement storage.
3. Stripe webhook fulfilment writing purchases to a database.
4. API-protected premium content checks.
5. Frontend rendering based on server-confirmed entitlement, not only `localStorage`.

## Safe next step later

Add a small backend database layer for entitlements. Until then, treat this as a near-live prototype, not a piracy-proof platform.


## Follow-up validation pass

Added after re-reading the hardened build:

- `api/create-checkout-session.js` now accepts both `https://www.freddiemurray.co.uk` and `https://freddiemurray.co.uk` as valid origins.
- Added optional `ALLOWED_ORIGINS` env support for controlled preview/custom domains.
- Vercel preview origins are allowed only outside production.
- `js/stripe-plan-status.js` no longer claims the Stripe secret is missing, because `/api/health` intentionally stopped exposing secret-configuration status.

Recommended production env values:

```text
SITE_URL=https://www.freddiemurray.co.uk
ALLOWED_ORIGINS=https://www.freddiemurray.co.uk,https://freddiemurray.co.uk
```



---

# Source: `docs/STABLE-VIEW-FIXED-NOTES.md`

# Stable View Fixed Build

This build removes the launch-polish overlay/controller that may have broken viewing.

Kept:
- Clean css/js/api/docs folder layout
- SEO title/meta/canonical fixes
- Stripe backend files
- Favicon
- robots.txt
- sitemap.xml
- privacy.html
- terms.html
- small backend health endpoint
- OpenAI placeholder endpoint

Use this one if the launch-ready-local build looked broken.



---

# Source: `docs/STRIPE-PLAN-LINKS.md`

# Stripe Plan Links

The upgraded Plan window now links directly to the existing Stripe checkout backend.

## Frontend flow

```text
Plan card
→ choose monthly/lifetime option
→ confirmation modal
→ window.goToStripePlan(optionId)
→ /api/create-checkout-session
→ Stripe Checkout
```

## Plan IDs sent to Stripe backend

```text
plus
elite
pro
proplus
proplus_lifetime
platinum
platinum_lifetime
```

## Required Vercel Environment Variables

```text
STRIPE_SECRET_KEY
SITE_URL
STRIPE_PRICE_PLUS
STRIPE_PRICE_ELITE
STRIPE_PRICE_PRO
STRIPE_PRICE_PROPLUS
STRIPE_PRICE_PROPLUS_LIFETIME
STRIPE_PRICE_PLATINUM
STRIPE_PRICE_PLATINUM_LIFETIME
STRIPE_WEBHOOK_SECRET
ENTITLEMENT_SIGNING_SECRET
```

## Important

Use Stripe Price IDs, not payment links.

Correct:

```text
price_12345...
```

Wrong:

```text
https://buy.stripe.com/...
```

## Recommended SITE_URL

```text
https://www.freddiemurray.co.uk
```

## What was fixed

The Plan window previously searched for checkout functions like:

```text
startCheckout
createCheckoutSession
openCheckout
```

but the real checkout function in the site is:

```text
goToStripePlan(plan)
```

This patch now calls the real function first, then falls back to:

```text
startBackendCheckout(plan)
```

and finally direct fetch:

```text
POST /api/create-checkout-session
```



---

# Source: `docs/TOPBAR-ADMIN-CHIP-COLLISION-FIX.md`

# Topbar Admin Chip Collision Fix

Fixes the local admin status pill overlapping the Creator Academy Hub brand area.

Changes:

- Forces the admin chip to use `position: static` after it is mounted into the topbar navigation row.
- Clears old fixed-position values inherited from the historical live-ready CSS.
- Adds a MutationObserver so if the older script creates `.live-admin-chip` late, the polish layer still catches and moves it.
- Adds a fallback fixed bottom-right placement only if the chip somehow cannot be mounted.

Expected local behavior:

```text
Brand/logo stays clean on the left.
Navigation pills stay in the row.
Admin chip sits at the far-right end of navigation or falls back to bottom-right.
No overlap with the title.
```

Production behavior is unchanged: frontend admin remains blocked on public hosts.



---

# Source: `docs/TOPBAR-CLICK-GUARD-FIX.md`

# Topbar Click Guard Fix

The sleek topbar introduced a visual scroll rail. In local testing the nav buttons could stop responding after the rail/admin polishing layers changed layout and injected elements.

Fixes added:

- `js/topbar-click-guard.js` loaded last.
- Rebinds Home, Assessments, Course, XP, Progress, and Portfolio by ID/text.
- Uses final capture-phase handlers so older broken handlers cannot swallow the click.
- Keeps the admin dismiss button separate.
- Adds pointer-event safety rules for the decorative rail pieces.

This is a defensive final layer. It does not change Stripe, owner access, entitlement signing, or production admin blocking.



---

# Source: `docs/TOPBAR-HORIZONTAL-SCROLL-RAIL.md`

# Topbar Horizontal Scroll Rail

Fixes the navigation clipping issue where the first nav items could disappear when the header was too narrow.

Changes:

- Keeps the brand/logo on the left.
- Turns the navigation into a real horizontal scroll rail when needed.
- Sets nav alignment to start instead of flex-end, preventing left-side clipping.
- Adds a visible sideways scrollbar.
- Allows mouse-wheel sideways scrolling while hovering over the nav rail.
- Keeps Admin as the last internal chip, not a public plan.
- Keeps production admin security unchanged.

Expected result:

```text
Brand/logo remains visible.
Home/Assessments/Course/XP/Progress/Portfolio/Admin appear in a horizontal rail.
If they do not fit, the user can scroll sideways instead of losing clipped buttons.
```



---

# Source: `docs/TOPBAR-MODERNISATION.md`

# Topbar Modernisation

This pass cleans up the top navigation/header without changing the app structure.

## Changed

- Added `css/topbar-modern.css`, loaded after `css/academy.bundle.css`.
- Kept the existing `.topbar`, `.brand`, and `.nav-actions` structure.
- Reduced oversized navigation buttons into compact modern pills.
- Made the header use a stable grid layout on desktop.
- Added horizontal nav scrolling instead of ugly wrapping/collision.
- Converted the local admin badge into a small status chip inside the nav row.
- Removed the admin chip expand behaviour because it was visually noisy.
- Preserved production admin blocking and local admin testing rules.

## Why this is a separate CSS layer

The project has many historical CSS/JS layers. This file is intentionally loaded last so the topbar can be corrected without rewriting the existing source chain.



---

# Source: `docs/TOPBAR-RAIL-EDGE-PADDING-FIX.md`

# Topbar Rail Edge Padding Fix

The horizontal topbar rail previously used a fade mask and tight side padding. On narrower widths this made the first/last navigation pills look slightly cut off even though they were technically scrollable.

Changes:

- Removed the visual mask that clipped nav edges.
- Added left/right breathing room to `.nav-actions`.
- Added `scroll-padding-inline` and per-item `scroll-margin-inline`.
- Kept the horizontal scrollbar/sideways rail behavior.
- Added a small rail glow at both edges instead of cutting content.
- Made the active Course button scroll near the middle when the rail is active.

This is a UI-only patch. It does not change admin, access, Stripe, owner unlock, or course logic.



---

# Source: `docs/TOPBAR-RAIL-SIDE-SHADING.md`

# Topbar Rail Side Shading

This patch refines the horizontal navigation rail introduced for narrow desktop widths.

## Problem

The rail had enough edge padding to stop buttons from being cut off, but the empty left/right gutters looked like harsh blank blocks.

## Fix

- Added left and right shaded gradients to the active scroll rail.
- Kept the full edge padding so first/last buttons can scroll fully into view.
- Kept the visible horizontal scrollbar.
- Did not reintroduce a mask/fade that clips nav buttons.

## Files changed

- `css/topbar-modern.css`
- `docs/TOPBAR-RAIL-SIDE-SHADING.md`



---

# Source: `docs/TOPBAR-SLEEK-REFINEMENT.md`

# Topbar Sleek Refinement

This pass modernises the local/debug topbar without changing routing, access logic, Stripe logic, or admin security.

Changes:

- Softer glass-style header background.
- More compact command-bar style nav rail.
- Slimmer horizontal scrollbar.
- Cleaner active Course pill.
- Softer side shading without clipping buttons.
- More refined CA brand mark.
- Better spacing and responsive behaviour.
- Admin remains a small internal/testing chip at the end of the nav rail.

Security behaviour is unchanged:

- Local/File Explorer admin remains for testing.
- Public frontend admin remains blocked.
- Production owner access still requires Vercel backend env vars.



---

# Source: `docs/UPLOAD-INSTRUCTIONS.md`

# Upload Instructions

Upload the CONTENTS of this folder to GitHub.

Correct:

```text
repo/index.html
repo/css/style.css
repo/js/script.js
repo/api/create-checkout-session.js
```

Wrong:

```text
repo/creator-academy-hub-clean-directory/index.html
```

`index.html` must be visible on the first page of the GitHub repo.

## Vercel settings

If `index.html` is at the repo root:

```text
Root Directory: blank or .
Framework Preset: Other
Build Command: blank
Output Directory: blank or .
Install Command: npm install
```

If you uploaded the whole folder itself:

```text
Root Directory: creator-academy-hub-clean-directory
```

## Stripe/Vercel environment variables

Add these in Vercel:

```text
STRIPE_SECRET_KEY
SITE_URL
STRIPE_PRICE_PLUS
STRIPE_PRICE_ELITE
STRIPE_PRICE_PRO
STRIPE_PRICE_PROPLUS
STRIPE_PRICE_PROPLUS_LIFETIME
STRIPE_PRICE_PLATINUM
STRIPE_PRICE_PLATINUM_LIFETIME
STRIPE_WEBHOOK_SECRET
```

Use Stripe Price IDs like `price_...`.

`SITE_URL` should be:

```text
https://www.freddiemurray.co.uk
```

