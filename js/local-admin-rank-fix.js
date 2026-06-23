/*
  Creator Academy Hub local admin rank fix.
  Purpose: in local/File Explorer testing, Admin must behave as the highest access tier,
  not as Basic/Free. Production owner access still uses backend signed entitlements.
*/
(function () {
  "use strict";

  function isLocalHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function normalisePlan(value) {
    value = String(value || "").trim().toLowerCase();
    var aliases = {
      "admin": "admin",
      "owner": "admin",
      "internal_admin": "admin",
      "internal admin": "admin",
      "platinum lifetime": "platinum_lifetime",
      "platinum-lifetime": "platinum_lifetime",
      "pro+ lifetime": "proplus_lifetime",
      "proplus lifetime": "proplus_lifetime",
      "pro plus lifetime": "proplus_lifetime",
      "pro+": "proplus",
      "pro plus": "proplus"
    };
    return aliases[value] || value.replace(/\s+/g, "_").replace(/\+/g, "plus").replace(/-/g, "_");
  }

  function storageGet(key) {
    try { return localStorage.getItem(key) || ""; } catch (error) { return ""; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (error) { /* ignore storage failure */ }
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try { window.showToast(message); return; } catch (error) { /* fall through */ }
    }
    var node = document.getElementById("toast");
    if (node) {
      node.textContent = message;
      node.classList.remove("hidden");
      window.setTimeout(function () { node.classList.add("hidden"); }, 2800);
    } else {
      console.log(message);
    }
  }

  function adminIsStored() {
    if (!isLocalHost()) return false;

    if (storageGet("creatorAcademy.persistentAdminRole") === "true") return true;

    var keys = [
      "creatorAcademy.plan",
      "academyPlan",
      "creatorAcademy.currentPlan",
      "creatorAcademy.selectedPlan",
      "creatorAcademy.entitlementPlan",
      "creatorAcademy.rank",
      "academyRank"
    ];

    for (var i = 0; i < keys.length; i += 1) {
      if (normalisePlan(storageGet(keys[i])) === "admin") return true;
    }

    try {
      if (window.state && normalisePlan(window.state.plan) === "admin") return true;
    } catch (error) { /* ignore */ }

    return false;
  }

  function grantLocalAdminRank(showMessage) {
    if (!isLocalHost()) {
      toast("Admin rank is disabled on public domains.");
      return false;
    }

    storageSet("creatorAcademy.persistentAdminRole", "true");
    storageSet("creatorAcademy.plan", "admin");
    storageSet("academyPlan", "admin");
    storageSet("creatorAcademy.currentPlan", "admin");
    storageSet("creatorAcademy.selectedPlan", "admin");
    storageSet("creatorAcademy.rank", "admin");
    storageSet("academyRank", "admin");
    storageSet("creatorAcademy.localAdminRankAt", new Date().toISOString());

    if (window.state) {
      window.state.plan = "admin";
      window.state.briefingComplete = true;
      window.state.skillTreeUnlocked = true;
    }

    if (typeof window.saveState === "function") {
      try { window.saveState(); } catch (error) { /* ignore */ }
    }

    document.body.classList.add("ca-admin-access", "ca-paid-access", "ca-local-admin-rank");
    document.body.classList.remove("ca-free-access", "beginner-locked");

    if (showMessage) toast("Local Admin rank active: highest internal tier.");
    return true;
  }

  function installAccessOverrides() {
    if (!isLocalHost()) return;

    var previousGetCurrentPlan = window.getCurrentPlan;
    var previousHasPlan = window.hasPlan;
    var previousHardFixHasPlanAccess = window.hardFixHasPlanAccess;
    var previousBeginnerHasPlan = window.beginnerHasPlan;
    var previousBeginnerIsUnlocked = window.beginnerIsUnlocked;
    var previousPlanMeetsRequirement = window.planMeetsRequirement;
    var previousIsPaidOrAdminPlan = window.isPaidOrAdminPlan;
    var previousGetCurrentPlanRank = window.getCurrentPlanRank;

    window.getCurrentPlan = function () {
      if (adminIsStored()) return "admin";
      return typeof previousGetCurrentPlan === "function" ? previousGetCurrentPlan.apply(this, arguments) : "";
    };

    window.isAdminRank = function () {
      return adminIsStored();
    };

    window.hasPlan = function () {
      if (adminIsStored()) return true;
      return typeof previousHasPlan === "function" ? previousHasPlan.apply(this, arguments) : false;
    };

    window.hardFixHasPlanAccess = function () {
      if (adminIsStored()) return true;
      return typeof previousHardFixHasPlanAccess === "function" ? previousHardFixHasPlanAccess.apply(this, arguments) : false;
    };

    window.beginnerHasPlan = function () {
      if (adminIsStored()) return true;
      return typeof previousBeginnerHasPlan === "function" ? previousBeginnerHasPlan.apply(this, arguments) : false;
    };

    window.beginnerIsUnlocked = function () {
      if (adminIsStored()) return true;
      return typeof previousBeginnerIsUnlocked === "function" ? previousBeginnerIsUnlocked.apply(this, arguments) : false;
    };

    window.isPaidOrAdminPlan = function (planId) {
      if (normalisePlan(planId) === "admin" || adminIsStored()) return true;
      return typeof previousIsPaidOrAdminPlan === "function" ? previousIsPaidOrAdminPlan.apply(this, arguments) : false;
    };

    window.getCurrentPlanRank = function () {
      if (adminIsStored()) return 99;
      return typeof previousGetCurrentPlanRank === "function" ? previousGetCurrentPlanRank.apply(this, arguments) : -1;
    };

    window.planMeetsRequirement = function () {
      if (adminIsStored()) return true;
      return typeof previousPlanMeetsRequirement === "function" ? previousPlanMeetsRequirement.apply(this, arguments) : false;
    };

    window.caLocalAdminRankIsActive = adminIsStored;
    window.creatorAcademyGrantLocalAdminRank = grantLocalAdminRank;
  }

  function patchAdminSetPlan() {
    if (!isLocalHost() || typeof window.adminSetPlan !== "function" || window.adminSetPlan.__caLocalAdminRankPatched) return;

    var originalAdminSetPlan = window.adminSetPlan;
    window.adminSetPlan = function (planId) {
      if (normalisePlan(planId) === "admin") {
        grantLocalAdminRank(true);
        if (typeof window.renderAdminDashboard === "function") {
          try { window.renderAdminDashboard("overview"); } catch (error) { /* ignore */ }
        }
        return;
      }
      return originalAdminSetPlan.apply(this, arguments);
    };
    window.adminSetPlan.__caLocalAdminRankPatched = true;
  }

  function patchLocalAdminButton() {
    if (!isLocalHost()) return;

    var button = document.getElementById("localAdminModeButton");
    if (button && button.dataset.caAdminRankPatched !== "true") {
      button.dataset.caAdminRankPatched = "true";
      button.addEventListener("click", function () {
        grantLocalAdminRank(false);
        window.setTimeout(cleanPlanGateForAdmin, 60);
      }, true);
    }
  }

  function adminStatusHtml() {
    return [
      '<div id="localAdminRankStatus" class="plan-status-panel" style="border-color:rgba(250,204,21,0.45);">',
      '<div>',
      '<h3>Internal Admin Access</h3>',
      '<p>Admin is active locally. This is the highest internal rank, above Platinum Lifetime, and is not a public purchasable plan.</p>',
      '</div>',
      '<span class="rank-badge admin">Admin</span>',
      '</div>'
    ].join("");
  }

  function cleanPlanGateForAdmin() {
    if (!adminIsStored()) return;

    document.body.classList.add("ca-admin-access", "ca-paid-access", "ca-local-admin-rank");
    document.body.classList.remove("ca-free-access", "beginner-locked");

    Array.prototype.forEach.call(document.querySelectorAll(".plan-gate-warning, .beginner-plan-lock-note"), function (node) {
      var text = String(node.textContent || "").toLowerCase();
      if (text.indexOf("basic / free") !== -1 || text.indexOf("choose plus") !== -1 || text.indexOf("upgrade required") !== -1) {
        node.remove();
      }
    });

    Array.prototype.forEach.call(document.querySelectorAll(".plan-status-panel"), function (panel) {
      var heading = panel.querySelector("h3");
      if (heading && String(heading.textContent || "").trim().toLowerCase() === "current access") {
        var paragraph = panel.querySelector("p");
        var badge = panel.querySelector(".rank-badge");
        if (paragraph) paragraph.textContent = "Admin";
        if (badge) {
          badge.textContent = "Admin";
          badge.classList.add("admin");
        }
      }
    });

    var app = document.getElementById("app");
    if (app && !document.getElementById("localAdminRankStatus")) {
      var firstPanel = app.querySelector(".panel");
      if (firstPanel) {
        var currentAccessPanel = firstPanel.querySelector(".plan-status-panel");
        if (currentAccessPanel) currentAccessPanel.insertAdjacentHTML("afterend", adminStatusHtml());
      }
    }
  }

  function patchShowPlans() {
    if (typeof window.showPlans !== "function" || window.showPlans.__caLocalAdminRankPatched) return;

    var originalShowPlans = window.showPlans;
    window.showPlans = function () {
      if (adminIsStored()) grantLocalAdminRank(false);
      var result = originalShowPlans.apply(this, arguments);
      window.setTimeout(cleanPlanGateForAdmin, 0);
      window.setTimeout(cleanPlanGateForAdmin, 80);
      return result;
    };
    window.showPlans.__caLocalAdminRankPatched = true;
  }

  function observePlanGate() {
    var target = document.getElementById("app") || document.body;
    if (!target || typeof MutationObserver === "undefined") return;

    var queued = false;
    var observer = new MutationObserver(function () {
      if (!adminIsStored() || queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        cleanPlanGateForAdmin();
        patchLocalAdminButton();
      });
    });
    observer.observe(target, { childList: true, subtree: true });
  }

  function install() {
    installAccessOverrides();
    patchAdminSetPlan();
    patchShowPlans();
    patchLocalAdminButton();
    if (adminIsStored()) grantLocalAdminRank(false);
    cleanPlanGateForAdmin();
  }

  ready(function () {
    install();
    observePlanGate();
  });

  window.setTimeout(install, 100);
  window.setTimeout(install, 500);
  window.setTimeout(install, 1200);
}());
