# Plan Hierarchy Fix

This patch makes the plan system use one final rank order:

```text
Free < Plus < Elite < Pro < Pro+ < Pro+ Lifetime < Platinum < Platinum Lifetime < Admin
```

Important rules:

- Platinum is the highest public paid plan family.
- Platinum Monthly is above Pro+ and Pro+ Lifetime for access-gate checks.
- Platinum Lifetime is the highest public paid access overall.
- Admin is hidden/internal only and remains above every paid plan.
- A Platinum/Platinum Lifetime/Admin user should not be treated like Basic or sent back to the Access Plans page as if they still need to buy access.

Runtime changes:

- Adds `js/plan-hierarchy-fix.js` as a final override layer.
- Adds `css/plan-hierarchy-fix.css` for the new plan UI.
- Replaces the public plan window with clearer plan cards and included/current-plan states.
- Normalises stored plan aliases such as `platinum monthly`, `platinum_lifetime`, `pro+ lifetime`, and `admin`.
- Patches gate helpers: `getCurrentPlan`, `getCurrentPlanRank`, `hasPlan`, `isPaidOrAdminPlan`, and `planMeetsRequirement`.
