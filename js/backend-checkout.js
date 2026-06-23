/* Backend Stripe Checkout Layer */
(function () {
  "use strict";

  const STORAGE_LEARNER_ID = "creatorAcademy.learnerId";
  const STORAGE_ENTITLEMENT_TOKEN = "creatorAcademy.entitlementToken";
  const STORAGE_ENTITLEMENT_PLAN = "creatorAcademy.entitlementPlan";
  const VALID_PAID_PLANS = new Set([
    "plus",
    "elite",
    "pro",
    "proplus",
    "proplus_lifetime",
    "platinum",
    "platinum_lifetime"
  ]);

  function safeStorageGet(key) {
    try { return localStorage.getItem(key) || ""; } catch { return ""; }
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Browser storage can fail in private mode. */ }
  }

  function normalisePlan(plan) {
    return String(plan || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\+/g, "plus")
      .replace(/-/g, "_");
  }

  function makeRandomId() {
    const webCrypto = window.crypto || window.msCrypto;
    if (webCrypto && typeof webCrypto.randomUUID === "function") return webCrypto.randomUUID();
    return "learner_" + Date.now() + "_" + Math.random().toString(16).slice(2);
  }

  function learnerId() {
    let id = safeStorageGet(STORAGE_LEARNER_ID);
    if (!id) {
      id = makeRandomId();
      safeStorageSet(STORAGE_LEARNER_ID, id);
    }
    return id;
  }

  function toast(message) {
    if (typeof window.showToast === "function") window.showToast(message);
    else console.log(message);
  }

  function getPlanName(plan) {
    if (window.plans && window.plans[plan]?.name) return window.plans[plan].name;
    return {
      plus: "Plus",
      elite: "Elite",
      pro: "Pro",
      proplus: "Pro+",
      proplus_lifetime: "Pro+ Lifetime",
      platinum: "Platinum",
      platinum_lifetime: "Platinum Lifetime"
    }[plan] || plan;
  }

  function storePlan(plan, entitlementToken) {
    plan = normalisePlan(plan);
    if (!VALID_PAID_PLANS.has(plan)) return;

    if (entitlementToken) {
      safeStorageSet(STORAGE_ENTITLEMENT_TOKEN, String(entitlementToken));
      safeStorageSet(STORAGE_ENTITLEMENT_PLAN, plan);
    }

    safeStorageSet("creatorAcademy.plan", plan);
    safeStorageSet("academyPlan", plan);
    safeStorageSet("creatorAcademy.currentPlan", plan);
    safeStorageSet("creatorAcademy.selectedPlan", plan);

    if (window.state) {
      window.state.plan = plan;
      window.state.briefingComplete = true;
      window.state.skillTreeUnlocked = true;
    }

    if (typeof window.saveState === "function") window.saveState();
    document.body.classList.remove("beginner-locked");

    if (typeof window.caSyncPlanStorage === "function") window.caSyncPlanStorage(plan);
    if (typeof window.hardFixApplyPlanAccess === "function") window.hardFixApplyPlanAccess();
    if (typeof window.caBugfixApplyAccess === "function") window.caBugfixApplyAccess();
  }

  async function readJson(response) {
    try { return await response.json(); } catch { return {}; }
  }

  async function startBackendCheckout(plan) {
    plan = normalisePlan(plan);

    if (!VALID_PAID_PLANS.has(plan)) {
      toast("Choose a paid plan before opening checkout.");
      if (typeof window.showPlans === "function") window.showPlans();
      return;
    }

    if (typeof fetch !== "function") {
      throw new Error("This browser cannot open checkout because fetch() is unavailable.");
    }

    toast("Opening secure checkout...");

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, learnerId: learnerId() })
    });

    const data = await readJson(response);

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Checkout backend is not configured. Check Stripe Price IDs in Vercel env vars.");
    }

    window.location.href = data.url;
  }

  async function verifyReturn() {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get("checkout");
    const sessionId = params.get("session_id");

    if (checkout === "cancelled") {
      toast("Checkout cancelled.");
      history.replaceState({}, document.title, location.pathname);
      return;
    }

    if (checkout !== "success" || !sessionId) return;

    toast("Verifying Stripe payment...");

    try {
      const response = await fetch("/api/checkout-status?session_id=" + encodeURIComponent(sessionId));
      const data = await readJson(response);

      if (!response.ok || !data.ok || !data.paid || !data.plan) {
        toast(data.error || "Payment could not be verified yet.");
        return;
      }

      storePlan(data.plan, data.entitlementToken);
      if (typeof window.caVerifyStoredEntitlement === "function") {
        await window.caVerifyStoredEntitlement();
      }
      history.replaceState({}, document.title, location.pathname);
      toast("Access unlocked: " + getPlanName(data.plan));

      if (typeof window.showHome === "function") setTimeout(window.showHome, 250);
    } catch (error) {
      console.error(error);
      toast("Payment verification failed. Check backend logs.");
    }
  }

  function install() {
    window.goToStripePlan = function (plan) {
      startBackendCheckout(plan).catch(error => {
        console.error(error);
        toast(error.message);
      });
      return false;
    };

    window.startBackendCheckout = startBackendCheckout;
  }

  install();
  document.addEventListener("DOMContentLoaded", function () {
    install();
    verifyReturn();
  });
  setTimeout(install, 100);
  setTimeout(install, 500);
})();
