/*
  Creator Academy Hub local admin mode.
  Purpose: make prototype admin tools usable when the site is opened locally
  from File Explorer or localhost, while keeping public/production hosts blocked.
*/
(function () {
  "use strict";

  function isLocalAdminHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try { window.showToast(message); return; } catch (error) { /* fall through */ }
    }
    var node = document.getElementById("toast");
    if (node) {
      node.textContent = message;
      node.classList.remove("hidden");
      window.setTimeout(function () { node.classList.add("hidden"); }, 3000);
    } else {
      console.log(message);
    }
  }

  function showLocalAdminDashboard() {
    if (!isLocalAdminHost()) {
      toast("Admin tools are disabled on public domains.");
      return false;
    }

    var overlay = document.getElementById("adminOverlay");
    if (!overlay) {
      toast("Admin overlay was not found in this build.");
      return false;
    }

    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");

    try {
      if (typeof window.showAdminDashboard === "function") {
        window.showAdminDashboard();
      } else {
        var login = document.getElementById("adminLoginPanel");
        var dashboard = document.getElementById("adminDashboard");
        if (login) login.classList.add("hidden");
        if (dashboard) dashboard.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Local admin dashboard failed to render", error);
      toast("Admin opened, but dashboard render hit an error. Check Console.");
    }

    document.body.classList.add("ca-local-admin-enabled");
    toast("Local admin enabled for testing only.");
    return true;
  }

  function installLocalAdminButton() {
    if (!isLocalAdminHost()) return;
    if (document.getElementById("localAdminModeButton")) return;

    var button = document.createElement("button");
    button.id = "localAdminModeButton";
    button.type = "button";
    button.textContent = "Local Admin";
    button.setAttribute("aria-label", "Open local admin testing tools");
    button.style.cssText = [
      "position:fixed",
      "right:14px",
      "bottom:14px",
      "z-index:10000",
      "padding:10px 13px",
      "border-radius:999px",
      "border:1px solid rgba(125,211,252,0.45)",
      "background:rgba(8,47,73,0.96)",
      "color:#e0f2fe",
      "font:700 12px/1 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
      "box-shadow:0 12px 30px rgba(0,0,0,0.35)",
      "cursor:pointer"
    ].join(";");
    button.addEventListener("click", showLocalAdminDashboard);
    document.body.appendChild(button);
  }

  function installOverrides() {
    if (isLocalAdminHost()) {
      window.openAdmin = showLocalAdminDashboard;
      window.attemptAdminLogin = showLocalAdminDashboard;
      window.creatorAcademyLocalAdmin = {
        enabled: true,
        publicHostsBlocked: true,
        open: showLocalAdminDashboard,
        diagnostics: function () {
          return {
            enabled: true,
            protocol: window.location.protocol,
            host: window.location.hostname || "file",
            adminOverlayExists: Boolean(document.getElementById("adminOverlay")),
            showAdminDashboardExists: typeof window.showAdminDashboard === "function"
          };
        }
      };
      installLocalAdminButton();
      return;
    }

    window.creatorAcademyLocalAdmin = {
      enabled: false,
      publicHostsBlocked: true,
      open: function () {
        toast("Admin tools are disabled on public domains.");
        return false;
      }
    };
  }

  ready(installOverrides);
  window.setTimeout(installOverrides, 100);
  window.setTimeout(installOverrides, 700);
}());
