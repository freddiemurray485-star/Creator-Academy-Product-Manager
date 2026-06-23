/*
  Creator Academy Hub local admin UI polish.
  Purpose: keep local Admin status visible without covering brand/header/footer content.
  This is visual-only and does not grant access.
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

  function storageGet(key) {
    try { return localStorage.getItem(key) || ""; } catch (error) { return ""; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (error) { /* ignore */ }
  }

  function adminActive() {
    return isLocalHost() && (
      storageGet("creatorAcademy.persistentAdminRole") === "true" ||
      String(storageGet("creatorAcademy.plan") || "").toLowerCase() === "admin" ||
      String(storageGet("academyPlan") || "").toLowerCase() === "admin" ||
      Boolean(window.caLocalAdminRankIsActive && window.caLocalAdminRankIsActive())
    );
  }

  function injectStyles() {
    if (document.getElementById("localAdminUiPolishStyle")) return;

    var style = document.createElement("style");
    style.id = "localAdminUiPolishStyle";
    style.textContent = [
      ".live-admin-chip{display:inline-flex;align-items:center;white-space:nowrap;}",
      ".live-admin-chip .ca-admin-extra{display:none!important;}",
      "body.ca-admin-chip-hidden .live-admin-chip{display:none!important;}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function placeChipInTopbar(chip) {
    var nav = document.querySelector(".topbar .nav-actions");
    var topbar = document.querySelector(".topbar");

    chip.classList.add("ca-admin-chip-mounted");
    chip.style.position = "static";
    chip.style.left = "auto";
    chip.style.right = "auto";
    chip.style.top = "auto";
    chip.style.bottom = "auto";
    chip.style.transform = "none";

    if (nav && chip.parentNode !== nav) {
      nav.appendChild(chip);
      return;
    }

    if (!nav && topbar && chip.parentNode !== topbar) {
      topbar.appendChild(chip);
    }
  }

  function polishChip() {
    if (!isLocalHost()) return;
    injectStyles();

    if (storageGet("creatorAcademy.hideLocalAdminChip") === "true") {
      document.body.classList.add("ca-admin-chip-hidden");
    }

    var chip = document.querySelector(".live-admin-chip");
    if (!chip) return;

    placeChipInTopbar(chip);

    if (chip.dataset.caUiPolished === "true") return;

    chip.dataset.caUiPolished = "true";
    chip.setAttribute("role", "status");
    chip.setAttribute("aria-label", "Local admin mode active");
    chip.title = "Local admin mode active. Click to expand. Use × to hide this badge.";
    chip.innerHTML = [
      "<strong>Admin</strong>",
      "<span class=\"ca-admin-extra\"> · Local/testing access active</span>",
      "<button type=\"button\" class=\"ca-admin-dismiss\" aria-label=\"Hide local admin badge\">×</button>"
    ].join("");

    chip.addEventListener("click", function (event) {
      if (event.target && event.target.classList && event.target.classList.contains("ca-admin-dismiss")) return;
      chip.classList.toggle("ca-expanded");
    });

    var close = chip.querySelector(".ca-admin-dismiss");
    if (close) {
      close.addEventListener("click", function (event) {
        event.stopPropagation();
        storageSet("creatorAcademy.hideLocalAdminChip", "true");
        document.body.classList.add("ca-admin-chip-hidden");
      });
    }
  }

  function install() {
    if (!adminActive()) return;
    polishChip();
  }

  function watchForChip() {
    if (!adminActive() || !window.MutationObserver) return;
    var observer = new MutationObserver(function () {
      install();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(function () { observer.disconnect(); }, 6000);
  }

  ready(function () {
    install();
    watchForChip();
    window.setTimeout(install, 100);
    window.setTimeout(install, 400);
    window.setTimeout(install, 1000);
    window.setTimeout(install, 2000);
    window.setTimeout(install, 4000);
  });
}());
