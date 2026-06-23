/*
  Creator Academy Hub final stability layer.
  Purpose: keep the existing patch-file structure intact while centralising the safest final overrides.
  Load this file last, after stripe-plan-status.js.
*/
(function () {
  "use strict";

  var BUILD_NAME = "creator-academy-hub-entitlement-hardened";
  var BUILD_DATE = "2026-06-13";
  var ENTITLEMENT_TOKEN_KEY = "creatorAcademy.entitlementToken";
  var ENTITLEMENT_PLAN_KEY = "creatorAcademy.entitlementPlan";
  var entitlementCheckState = "pending";

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
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function normalisePlan(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\+/g, "plus")
      .replace(/-/g, "_");
  }

  function storageGet(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      return "";
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Storage can fail in strict/private browser modes. The app should still render.
    }
  }
  function storageRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function isLocalDevelopmentHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function requiresServerEntitlement() {
    return !isLocalDevelopmentHost();
  }

  function hasStoredEntitlementToken() {
    return storageGet(ENTITLEMENT_TOKEN_KEY).length > 20;
  }


  function getCurrentPlan() {
    if (requiresServerEntitlement()) {
      var entitlementPlan = normalisePlan(storageGet(ENTITLEMENT_PLAN_KEY));
      if (entitlementPlan && hasStoredEntitlementToken()) return entitlementPlan;
      return "";
    }

    var candidates = [
      "creatorAcademy.plan",
      "academyPlan",
      "creatorAcademy.currentPlan",
      "creatorAcademy.selectedPlan",
      ENTITLEMENT_PLAN_KEY
    ];

    for (var i = 0; i < candidates.length; i += 1) {
      var plan = normalisePlan(storageGet(candidates[i]));
      if (plan) return plan;
    }
    return "";
  }

  function hasPaidAccess(plan) {
    var cleanPlan = normalisePlan(plan || getCurrentPlan());
    if (PAID_PLANS.indexOf(cleanPlan) === -1) return false;
    if (!requiresServerEntitlement()) return true;
    return entitlementCheckState === "verified";
  }

  function syncPlanStorage(plan) {
    var cleanPlan = normalisePlan(plan || getCurrentPlan());
    if (!cleanPlan) return "";

    if (requiresServerEntitlement() && PAID_PLANS.indexOf(cleanPlan) !== -1 && !hasStoredEntitlementToken()) {
      return "";
    }

    storageSet("creatorAcademy.plan", cleanPlan);
    storageSet("academyPlan", cleanPlan);
    storageSet("creatorAcademy.currentPlan", cleanPlan);
    storageSet("creatorAcademy.selectedPlan", cleanPlan);
    return cleanPlan;
  }

  function clearPaidAccessStorage() {
    storageRemove("creatorAcademy.plan");
    storageRemove("academyPlan");
    storageRemove("creatorAcademy.currentPlan");
    storageRemove("creatorAcademy.selectedPlan");
    storageRemove(ENTITLEMENT_PLAN_KEY);
    storageRemove(ENTITLEMENT_TOKEN_KEY);
    if (window.state) {
      window.state.plan = "";
      window.state.skillTreeUnlocked = false;
    }
    markPaidStateOnBody();
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try {
        window.showToast(message);
        return;
      } catch (error) {
        // Fall through to direct toast update.
      }
    }

    var node = document.getElementById("toast");
    if (!node) return;
    node.textContent = message;
    node.classList.remove("hidden");
    window.setTimeout(function () {
      node.classList.add("hidden");
    }, 2600);
  }

  function detectPathIdFromElement(element) {
    if (!element) return "";
    var text = (element.textContent || "").toLowerCase();
    var card = element.closest ? element.closest(".path-card, .skill-card, .info-card, .course-card, article, section, div") : null;
    if (card) text += " " + (card.textContent || "").toLowerCase();

    if (text.indexOf("lua") !== -1) return "lua";
    if (text.indexOf("blender") !== -1) return "blender";
    if (text.indexOf("moon") !== -1 || text.indexOf("animator") !== -1 || text.indexOf("animation") !== -1) return "moon";
    if (text.indexOf("studio") !== -1) return "studio";
    return "";
  }

  function patchOpenPathButtons() {
    if (typeof window.showPathCourseFilter !== "function") return;

    Array.prototype.forEach.call(document.querySelectorAll("button"), function (button) {
      var label = (button.textContent || "").trim().toLowerCase();
      if (label !== "open path") return;
      if (button.dataset.caFinalPathPatched === "true") return;

      button.dataset.caFinalPathPatched = "true";
      button.addEventListener("click", function (event) {
        var pathId = detectPathIdFromElement(button);
        if (!pathId) return;
        event.preventDefault();
        event.stopPropagation();
        window.showPathCourseFilter(pathId);
      }, true);
    });
  }

  function markPaidStateOnBody() {
    document.body.classList.toggle("ca-paid-access", hasPaidAccess());
    document.body.classList.toggle("ca-free-access", !hasPaidAccess());
  }

  function installPlanGuards() {
    syncPlanStorage();

    window.caGetCurrentPlan = getCurrentPlan;
    window.caHasPaidAccess = hasPaidAccess;
    window.caSyncPlanStorage = syncPlanStorage;

    // Preserve existing names used by older patch files.
    window.caBugfixBestPlan = getCurrentPlan;
    window.caBestPlanFixed = getCurrentPlan;
    window.caBugfixIsPaid = hasPaidAccess;
    window.caIsPaidAccessFixed = hasPaidAccess;
    window.hasPlan = function (plan) {
      return normalisePlan(plan) === getCurrentPlan();
    };
  }

  function installDiagnostics() {
    window.creatorAcademyDiagnostics = function () {
      var scripts = Array.prototype.map.call(document.scripts, function (script) {
        return script.getAttribute("src") || "inline-script";
      });

      return {
        build: BUILD_NAME,
        buildDate: BUILD_DATE,
        canonical: document.querySelector("link[rel='canonical']")?.href || "",
        currentPlan: getCurrentPlan(),
        paidAccess: hasPaidAccess(),
        pathFilterAvailable: typeof window.showPathCourseFilter === "function",
        checkoutAvailable: typeof window.startBackendCheckout === "function",
        entitlementTokenStored: hasStoredEntitlementToken(),
        entitlementCheckState: entitlementCheckState,
        serverEntitlementRequired: requiresServerEntitlement(),
        scriptCount: scripts.length,
        lastScript: scripts[scripts.length - 1] || "",
        scripts: scripts
      };
    };
  }


  function disablePrototypeAdminOnProduction() {
    if (isLocalDevelopmentHost()) return;

    window.openAdmin = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };
    window.attemptAdminLogin = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };
    window.adminUnlockAcademy = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };
    window.adminCompleteAll = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };

    var overlay = document.getElementById("adminOverlay");
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  async function verifyStoredEntitlement() {
    if (!requiresServerEntitlement()) {
      entitlementCheckState = "local-dev-bypass";
      return;
    }

    var token = storageGet(ENTITLEMENT_TOKEN_KEY);
    if (!token) {
      entitlementCheckState = "missing-token";
      clearPaidAccessStorage();
      return;
    }

    entitlementCheckState = "checking";
    try {
      var response = await fetch("/api/verify-entitlement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entitlementToken: token })
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.ok || !data.plan) {
        entitlementCheckState = "invalid";
        clearPaidAccessStorage();
        toast("Paid access must be re-verified. Please complete checkout again if needed.");
        return;
      }

      entitlementCheckState = "verified";
      storageSet(ENTITLEMENT_PLAN_KEY, normalisePlan(data.plan));
      syncPlanStorage(data.plan);
      if (window.state) {
        window.state.plan = normalisePlan(data.plan);
        window.state.briefingComplete = true;
        window.state.skillTreeUnlocked = true;
      }
      if (typeof window.saveState === "function") window.saveState();
      markPaidStateOnBody();
    } catch (error) {
      entitlementCheckState = "offline-or-api-unavailable";
      // Do not grant new access while offline. Existing UI remains conservative through getCurrentPlan().
      markPaidStateOnBody();
    }
  }

  function hardenExternalLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("a[target='_blank']"), function (link) {
      var rel = (link.getAttribute("rel") || "").toLowerCase().split(/\s+/);
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
      link.setAttribute("rel", rel.filter(Boolean).join(" "));
    });
  }

  function observeDynamicViews() {
    var app = document.getElementById("app") || document.body;
    if (!app || typeof MutationObserver === "undefined") return;

    var queued = false;
    var observer = new MutationObserver(function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        patchOpenPathButtons();
        markPaidStateOnBody();
        hardenExternalLinks();
        disablePrototypeAdminOnProduction();
      });
    });

    observer.observe(app, { childList: true, subtree: true });
  }

  function install() {
    installPlanGuards();
    window.caVerifyStoredEntitlement = verifyStoredEntitlement;
    verifyStoredEntitlement();
    installDiagnostics();
    patchOpenPathButtons();
    markPaidStateOnBody();
    hardenExternalLinks();
    disablePrototypeAdminOnProduction();
    observeDynamicViews();

    window.creatorAcademyBuild = {
      name: BUILD_NAME,
      date: BUILD_DATE,
      note: "Final cleanup layer loaded last. Use creatorAcademyDiagnostics() in DevTools for checks."
    };
  }

  ready(install);
}());
