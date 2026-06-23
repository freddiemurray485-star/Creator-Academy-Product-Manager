/*
  Creator Academy Hub owner access.
  Production-safe owner unlock: no admin code in frontend JS.
  Requires /api/owner-entitlement and Vercel env vars.
*/
(function () {
  "use strict";

  var PAID_PLANS = {
    plus: "Plus",
    elite: "Elite",
    pro: "Pro",
    proplus: "Pro+",
    proplus_lifetime: "Pro+ Lifetime",
    platinum: "Platinum",
    platinum_lifetime: "Platinum Lifetime"
  };

  function isFileMode() {
    return window.location.protocol === "file:";
  }

  function normalisePlan(plan) {
    return String(plan || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\+/g, "plus")
      .replace(/-/g, "_");
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (error) { /* ignore storage errors */ }
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try { window.showToast(message); return; } catch (error) { /* fall through */ }
    }
    var node = document.getElementById("toast");
    if (node) {
      node.textContent = message;
      node.classList.remove("hidden");
      window.setTimeout(function () { node.classList.add("hidden"); }, 3600);
    } else {
      console.log(message);
    }
  }

  function applyPlan(plan, entitlementToken) {
    plan = normalisePlan(plan);
    if (!PAID_PLANS[plan] || !entitlementToken) return false;

    safeStorageSet("creatorAcademy.entitlementToken", entitlementToken);
    safeStorageSet("creatorAcademy.entitlementPlan", plan);
    safeStorageSet("creatorAcademy.plan", plan);
    safeStorageSet("academyPlan", plan);
    safeStorageSet("creatorAcademy.currentPlan", plan);
    safeStorageSet("creatorAcademy.selectedPlan", plan);
    safeStorageSet("creatorAcademy.ownerGrantAt", new Date().toISOString());

    if (window.state) {
      window.state.plan = plan;
      window.state.briefingComplete = true;
      window.state.skillTreeUnlocked = true;
    }

    if (typeof window.saveState === "function") window.saveState();
    if (typeof window.caSyncPlanStorage === "function") window.caSyncPlanStorage(plan);
    if (typeof window.hardFixApplyPlanAccess === "function") window.hardFixApplyPlanAccess();
    if (typeof window.caBugfixApplyAccess === "function") window.caBugfixApplyAccess();

    document.body.classList.add("ca-paid-access", "ca-owner-access");
    document.body.classList.remove("ca-free-access", "beginner-locked");
    return true;
  }

  async function readJson(response) {
    try { return await response.json(); } catch (error) { return {}; }
  }

  async function requestOwnerAccess(ownerToken) {
    ownerToken = String(ownerToken || "").trim();

    if (isFileMode()) {
      toast("Owner unlock needs the deployed Vercel backend. File Explorer can only use Local Admin/preview.");
      return { ok: false, error: "file-mode-no-backend" };
    }

    if (ownerToken.length < 32) {
      toast("Owner token is too short or missing.");
      return { ok: false, error: "missing-token" };
    }

    var response = await fetch("/api/owner-entitlement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerToken: ownerToken })
    });

    var data = await readJson(response);
    if (!response.ok || !data.ok || !data.plan || !data.entitlementToken) {
      throw new Error(data.error || "Owner access failed.");
    }

    applyPlan(data.plan, data.entitlementToken);

    if (typeof window.caVerifyStoredEntitlement === "function") {
      try { await window.caVerifyStoredEntitlement(); } catch (error) { console.warn("Owner entitlement verification follow-up failed", error); }
    }

    toast("Owner access enabled: " + (PAID_PLANS[data.plan] || data.plan));
    if (typeof window.showHome === "function") window.setTimeout(window.showHome, 250);
    return data;
  }

  function ensureOwnerModal() {
    var existing = document.getElementById("ownerAccessModal");
    if (existing) return existing;

    var modal = document.createElement("div");
    modal.id = "ownerAccessModal";
    modal.className = "hidden";
    modal.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:10020",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "background:rgba(2,6,23,0.72)",
      "padding:18px"
    ].join(";");

    modal.innerHTML = [
      '<div style="width:min(440px,100%);border:1px solid rgba(125,211,252,0.35);background:rgba(15,23,42,0.98);border-radius:18px;padding:18px;box-shadow:0 24px 80px rgba(0,0,0,0.45);color:#e5e7eb;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">',
      '<h2 style="margin:0 0 8px;font-size:20px;">Owner Access</h2>',
      '<p style="margin:0 0 12px;color:#cbd5e1;font-size:13px;line-height:1.45;">Paste your private owner token. This calls the Vercel backend and stores a signed Platinum entitlement on this browser only.</p>',
      '<input id="ownerAccessTokenInput" type="password" autocomplete="off" spellcheck="false" placeholder="OWNER_ACCESS_TOKEN" style="width:100%;box-sizing:border-box;border-radius:12px;border:1px solid rgba(148,163,184,0.35);background:#020617;color:#e5e7eb;padding:11px 12px;margin:0 0 12px;">',
      '<div style="display:flex;gap:8px;justify-content:flex-end;">',
      '<button id="ownerAccessCancel" type="button" style="padding:9px 12px;border-radius:10px;border:1px solid rgba(148,163,184,0.25);background:transparent;color:#cbd5e1;cursor:pointer;">Cancel</button>',
      '<button id="ownerAccessSubmit" type="button" style="padding:9px 12px;border-radius:10px;border:1px solid rgba(125,211,252,0.45);background:#075985;color:#e0f2fe;font-weight:700;cursor:pointer;">Unlock Owner</button>',
      '</div>',
      '<p id="ownerAccessStatus" style="min-height:18px;margin:10px 0 0;color:#93c5fd;font-size:12px;"></p>',
      '</div>'
    ].join("");

    document.body.appendChild(modal);

    var close = function () { modal.classList.add("hidden"); };
    modal.addEventListener("click", function (event) { if (event.target === modal) close(); });
    modal.querySelector("#ownerAccessCancel").addEventListener("click", close);
    modal.querySelector("#ownerAccessSubmit").addEventListener("click", async function () {
      var input = modal.querySelector("#ownerAccessTokenInput");
      var status = modal.querySelector("#ownerAccessStatus");
      status.textContent = "Checking owner token...";
      try {
        await requestOwnerAccess(input.value);
        status.textContent = "Owner access enabled.";
        input.value = "";
        window.setTimeout(close, 450);
      } catch (error) {
        console.error(error);
        status.textContent = error.message || "Owner access failed.";
        toast(status.textContent);
      }
    });

    return modal;
  }

  function openOwnerAccess() {
    if (isFileMode()) {
      toast("File Explorer mode cannot call Vercel owner API. Use the deployed domain for owner unlock.");
      return false;
    }
    var modal = ensureOwnerModal();
    modal.classList.remove("hidden");
    var input = modal.querySelector("#ownerAccessTokenInput");
    if (input) window.setTimeout(function () { input.focus(); }, 40);
    return true;
  }

  function shouldAutoOpen() {
    var params = new URLSearchParams(window.location.search || "");
    return params.get("owner") === "1" || window.location.hash === "#owner";
  }

  function install() {
    window.creatorAcademyOwnerAccess = {
      open: openOwnerAccess,
      request: requestOwnerAccess,
      applyPlan: applyPlan,
      diagnostics: function () {
        return {
          fileMode: isFileMode(),
          apiRoute: "/api/owner-entitlement",
          currentHost: window.location.hostname || "file"
        };
      }
    };

    if (shouldAutoOpen()) {
      window.setTimeout(openOwnerAccess, 250);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
}());
