/*
  Creator Academy Hub topbar click guard.
  Purpose: final safety layer after visual topbar overrides. It restores navigation clicks
  if scroll-rail/polish layers interfere with the original handlers.
*/
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function nav() {
    return document.querySelector(".topbar .nav-actions");
  }

  function callFirst(names) {
    for (var i = 0; i < names.length; i += 1) {
      var fn = window[names[i]];
      if (typeof fn === "function") {
        try {
          fn();
          return true;
        } catch (error) {
          console.warn("Topbar action failed:", names[i], error);
          return false;
        }
      }
    }
    return false;
  }

  function actionFor(button) {
    if (!button) return null;
    var id = String(button.id || "").toLowerCase();
    var text = String(button.textContent || "").replace(/×/g, "").trim().toLowerCase();
    if (id === "navhome" || text === "home") return "home";
    if (id === "navassessments" || text === "assessments") return "assessments";
    if (id === "navcourse" || id === "navlevels" || text === "course" || text === "levels") return "course";
    if (id === "navxp" || text === "xp") return "xp";
    if (id === "navprogress" || text === "progress") return "progress";
    if (id === "navportfolio" || button.dataset.portfolioNav === "true" || text === "portfolio") return "portfolio";
    return null;
  }

  function run(action) {
    if (action === "home") return callFirst(["showHome"]);
    if (action === "assessments") return callFirst(["showAssessmentsHub", "showCourseworkHub", "showCoursework"]);
    if (action === "course") return callFirst(["showLevelHub", "showCourseHub", "showSkillTree"]);
    if (action === "xp") return callFirst(["showXpDashboard", "showXPDashboard", "showXP"]);
    if (action === "progress") return callFirst(["showProgress"]);
    if (action === "portfolio") return callFirst(["showPortfolioSection", "openPortfolioSection"]);
    return false;
  }

  function bindButton(button) {
    if (!button || button.dataset.caTopbarClickGuard === "true") return;
    if (button.classList && button.classList.contains("helper-nav-button")) return;
    var action = actionFor(button);
    if (!action) return;
    button.dataset.caTopbarClickGuard = "true";
    button.dataset.caTopbarAction = action;
    button.type = "button";
    button.style.pointerEvents = "auto";
    button.addEventListener("click", function (event) {
      var latestAction = actionFor(button) || button.dataset.caTopbarAction;
      if (!latestAction) return;
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      run(latestAction);
      return false;
    }, true);
  }

  function bindAll() {
    var root = nav();
    if (!root) return;
    root.style.pointerEvents = "auto";
    Array.prototype.forEach.call(root.querySelectorAll("button"), function (button) {
      if (button.classList && button.classList.contains("ca-admin-dismiss")) return;
      bindButton(button);
    });
  }

  ready(function () {
    bindAll();
    window.setTimeout(bindAll, 100);
    window.setTimeout(bindAll, 500);
    window.setTimeout(bindAll, 1500);
    if (window.MutationObserver) {
      var root = nav() || document.body;
      var observer = new MutationObserver(function () { bindAll(); });
      observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["id", "data-portfolio-nav"] });
    }
  });
}());
