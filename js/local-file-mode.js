/*
  Creator Academy Hub local File Explorer mode.
  Purpose: make file:///.../index.html usable for offline/local UI testing without pretending Vercel APIs exist.
  This script only changes behaviour when window.location.protocol === "file:".
*/
(function () {
  "use strict";

  var IS_FILE_MODE = window.location.protocol === "file:";
  var PAID_PLANS = [
    "plus",
    "elite",
    "pro",
    "proplus",
    "proplus_lifetime",
    "platinum",
    "platinum_lifetime"
  ];

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function normalisePlan(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\+/g, "plus")
      .replace(/-/g, "_");
  }

  function isPaidPlan(plan) {
    return PAID_PLANS.indexOf(normalisePlan(plan)) !== -1;
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* ignore private-mode/local storage failure */ }
  }

  function storageGet(key) {
    try { return localStorage.getItem(key) || ""; } catch (error) { return ""; }
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try { window.showToast(message); return; } catch (error) { /* fall through */ }
    }
    var node = document.getElementById("toast");
    if (node) {
      node.textContent = message;
      node.classList.remove("hidden");
      window.setTimeout(function () { node.classList.add("hidden"); }, 3200);
    } else {
      console.log(message);
    }
  }

  function planName(plan) {
    plan = normalisePlan(plan);
    if (window.plans && window.plans[plan] && window.plans[plan].name) return window.plans[plan].name;
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

  function unlockLocalPreviewPlan(plan) {
    plan = normalisePlan(plan);
    if (!isPaidPlan(plan)) {
      toast("Choose a paid plan to preview locally.");
      return false;
    }

    storageSet("creatorAcademy.plan", plan);
    storageSet("academyPlan", plan);
    storageSet("creatorAcademy.currentPlan", plan);
    storageSet("creatorAcademy.selectedPlan", plan);
    storageSet("creatorAcademy.entitlementPlan", plan);
    storageSet("creatorAcademy.localFilePreviewPlan", plan);
    storageSet("creatorAcademy.localFilePreviewAt", new Date().toISOString());

    if (window.state) {
      window.state.plan = plan;
      window.state.briefingComplete = true;
      window.state.skillTreeUnlocked = true;
    }

    if (typeof window.saveState === "function") window.saveState();
    if (typeof window.caSyncPlanStorage === "function") window.caSyncPlanStorage(plan);
    if (typeof window.hardFixApplyPlanAccess === "function") window.hardFixApplyPlanAccess();
    if (typeof window.caBugfixApplyAccess === "function") window.caBugfixApplyAccess();

    document.body.classList.add("ca-file-mode", "ca-paid-access");
    document.body.classList.remove("ca-free-access", "beginner-locked");
    toast("Local preview unlocked: " + planName(plan));
    if (typeof window.showHome === "function") window.setTimeout(window.showHome, 150);
    return true;
  }

  function explainBackendUnavailable(plan) {
    var name = planName(plan);
    return [
      "Stripe checkout cannot run from File Explorer / file://.",
      "",
      "Plan selected: " + name,
      "",
      "Use Vercel or `vercel dev` for real checkout.",
      "For local UI testing only, you can unlock a preview copy of this plan in this browser."
    ].join("\n");
  }

  function installFileModeOverrides() {
    if (!IS_FILE_MODE) return;

    document.documentElement.classList.add("ca-file-mode");
    if (document.body) document.body.classList.add("ca-file-mode");

    window.caVerifyStoredEntitlement = async function () {
      // In file:// mode there is no backend to verify against.
      // Keep local preview/dev access available, but do not claim this is real payment security.
      return {
        ok: true,
        localFileMode: true,
        plan: normalisePlan(storageGet("creatorAcademy.localFilePreviewPlan") || storageGet("creatorAcademy.plan"))
      };
    };

    window.checkStripeBackend = async function () {
      toast("File Explorer mode: backend APIs are not running. Use Vercel/vercel dev for Stripe.");
      return { ok: false, localFileMode: true, reason: "file-protocol-no-api-routes" };
    };

    window.startBackendCheckout = async function (plan) {
      plan = normalisePlan(plan);
      if (!isPaidPlan(plan)) {
        toast("Choose a paid plan first.");
        return { ok: false, reason: "invalid-plan" };
      }

      var allowPreview = window.confirm(explainBackendUnavailable(plan));
      if (allowPreview) {
        unlockLocalPreviewPlan(plan);
        return { ok: true, localPreview: true, plan: plan };
      }

      toast("Checkout cancelled. Real Stripe requires Vercel or vercel dev.");
      return { ok: false, reason: "file-mode-checkout-cancelled" };
    };

    window.goToStripePlan = function (plan) {
      window.startBackendCheckout(plan).catch(function (error) {
        console.error(error);
        toast(error.message || "Local checkout preview failed.");
      });
      return false;
    };

    window.creatorAcademyLocalMode = {
      enabled: true,
      reason: "Opened through File Explorer using file://",
      unlockPreviewPlan: unlockLocalPreviewPlan,
      diagnostics: function () {
        return {
          localFileMode: true,
          protocol: window.location.protocol,
          path: window.location.pathname,
          selectedPlan: normalisePlan(storageGet("creatorAcademy.plan")),
          previewPlan: normalisePlan(storageGet("creatorAcademy.localFilePreviewPlan")),
          backendApisAvailable: false,
          realStripeAvailable: false,
          note: "Use Vercel deployment or `vercel dev` for real API routes and Stripe checkout."
        };
      }
    };
  }

  function addLocalModeBanner() {
    if (!IS_FILE_MODE) return;
    if (document.getElementById("localFileModeBanner")) return;

    var banner = document.createElement("div");
    banner.id = "localFileModeBanner";
    banner.style.cssText = [
      "position:relative",
      "z-index:21",
      "box-sizing:border-box",
      "width:100%",
      "padding:8px 14px",
      "background:rgba(15,23,42,0.98)",
      "border-bottom:1px solid rgba(148,163,184,0.35)",
      "color:#e5e7eb",
      "font:13px/1.4 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
      "text-align:center"
    ].join(";");

    banner.innerHTML = "<strong>Local File Mode:</strong> File Explorer preview only. Stripe/Vercel APIs run after Vercel deploy.";
    document.body.insertBefore(banner, document.body.firstChild);

    // The main topbar is also sticky at top:0. A sticky local banner fights it and covers the logo,
    // so keep this banner in normal document flow instead of pinning it to the viewport.
    document.documentElement.style.setProperty("--local-file-banner-height", banner.offsetHeight + "px");
  }

  function install() {
    installFileModeOverrides();
    addLocalModeBanner();
  }

  ready(install);
  // Reinstall after late override layers if any script rewrites checkout functions.
  window.setTimeout(install, 100);
  window.setTimeout(install, 600);
}());
