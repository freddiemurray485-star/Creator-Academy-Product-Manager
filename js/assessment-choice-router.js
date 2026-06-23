/*
  Creator Academy Hub assessment router.
  Final navigation patch:
  - Home always renders the real homepage instead of drifting into plan/coursework routes.
  - Assessments opens a clean choice screen: Homework or Formal Exams.
  This file intentionally loads last so older patch layers cannot override it.
*/
(function () {
  "use strict";

  function appRoot() {
    return document.getElementById("app");
  }

  function fn(name) {
    return typeof window[name] === "function" ? window[name] : null;
  }

  function callAny(names) {
    for (var i = 0; i < names.length; i += 1) {
      var f = fn(names[i]);
      if (f) {
        f();
        return true;
      }
    }
    return false;
  }

  function safeToast(message) {
    var toast = fn("showToast");
    if (toast) toast(message);
  }

  function setView(name) {
    var setCurrentView = fn("setCurrentView");
    if (setCurrentView) setCurrentView(name);
  }

  function navButtons() {
    return {
      home: document.getElementById("navHome"),
      assessments: document.getElementById("navAssessments"),
      course: document.getElementById("navCourse") || document.getElementById("navLevels"),
      xp: document.getElementById("navXP"),
      progress: document.getElementById("navProgress"),
      portfolio: document.getElementById("navPortfolio")
    };
  }

  function markNav(active) {
    var buttons = navButtons();
    Object.keys(buttons).forEach(function (key) {
      var button = buttons[key];
      if (!button) return;
      button.classList.toggle("active", key === active);
      button.setAttribute("aria-current", key === active ? "page" : "false");
    });
  }

  function planLabel() {
    try {
      if (fn("getCurrentPlan") && window.plans) {
        var planId = window.getCurrentPlan();
        if (planId && window.plans[planId]) return window.plans[planId].name || window.plans[planId].publicName || planId;
      }
    } catch (error) {
      // Non-critical. Homepage still renders.
    }

    var localPlan = localStorage.getItem("creatorAcademy.plan") || localStorage.getItem("academyPlan") || "Basic / Free";
    if (localPlan === "admin") return "Admin";
    if (localPlan === "platinum_lifetime") return "Platinum Lifetime";
    if (localPlan === "platinum") return "Platinum";
    if (localPlan === "proplus_lifetime") return "Pro+ Lifetime";
    if (localPlan === "proplus") return "Pro+";
    if (localPlan === "pro") return "Pro";
    if (localPlan === "elite") return "Elite";
    if (localPlan === "plus") return "Plus";
    return "Basic / Free";
  }

  function isLocalFileMode() {
    return window.location.protocol === "file:";
  }

  window.showHome = function () {
    var app = appRoot();
    if (!app) return;

    markNav("home");

    app.innerHTML = "" +
      "<section class=\"hero polished-hero ca-homepage-true\">" +
        "<div class=\"hero-content\">" +
          "<span class=\"badge\">Roblox Creator Training</span>" +
          "<h2>Creator Academy Hub</h2>" +
          "<p>A structured Roblox teaching platform for Studio, Lua, Blender, Moon Animator, UI, VFX, publishing, monetisation, and creator business. Use the Course tab for lessons and Assessments for homework or formal exams.</p>" +

          "<div class=\"ca-home-status-grid\">" +
            "<div class=\"plan-status-panel ca-home-status-card\">" +
              "<div><h3>Current Access</h3><p>" + planLabel() + "</p></div>" +
              "<span class=\"rank-badge\">" + planLabel() + "</span>" +
            "</div>" +
            "<div class=\"plan-status-panel ca-home-status-card\">" +
              "<div><h3>Mode</h3><p>" + (isLocalFileMode() ? "File Explorer preview" : "Live deployment") + "</p></div>" +
              "<span class=\"rank-badge\">" + (isLocalFileMode() ? "Local" : "Live") + "</span>" +
            "</div>" +
          "</div>" +

          "<div class=\"actions hero-actions\">" +
            "<button type=\"button\" onclick=\"showLevelHub ? showLevelHub() : openSkillTree()\">Continue Course</button>" +
            "<button type=\"button\" class=\"secondary\" onclick=\"showAssessmentsHub()\">Assessments</button>" +
            "<button type=\"button\" class=\"secondary\" onclick=\"showProgress()\">Progress</button>" +
            "<button type=\"button\" class=\"secondary\" onclick=\"showPlans ? showPlans() : null\">Plans</button>" +
          "</div>" +

          "<div class=\"flow-panel\">" +
            "<h3>Academy Flow</h3>" +
            "<div class=\"flow-grid\">" +
              "<div class=\"flow-step\"><span>01</span><h4>Learn</h4><p>Open a course level and study one structured lesson at a time.</p></div>" +
              "<div class=\"flow-step\"><span>02</span><h4>Practise</h4><p>Build in Roblox Studio, write evidence, and debug your work.</p></div>" +
              "<div class=\"flow-step\"><span>03</span><h4>Submit</h4><p>Use homework to prove independent understanding.</p></div>" +
              "<div class=\"flow-step\"><span>04</span><h4>Exam</h4><p>Use formal exams to check vocabulary, reasoning, and transfer.</p></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";

    setView("home");
  };

  window.showAssessmentsHub = function () {
    var app = appRoot();
    if (!app) return;

    markNav("assessments");

    app.innerHTML = "" +
      "<section class=\"panel ca-assessment-choice-panel\">" +
        "<div class=\"course-header ca-assessment-choice-header\">" +
          "<div>" +
            "<span class=\"badge\">Assessments</span>" +
            "<h2>Choose Assessment Type</h2>" +
            "<p>Assessments are split into independent homework and formal exams. Homework proves practice. Exams prove retained understanding.</p>" +
          "</div>" +
          "<div class=\"actions\">" +
            "<button type=\"button\" class=\"secondary\" onclick=\"showHome()\">Home</button>" +
            "<button type=\"button\" class=\"secondary\" onclick=\"showLevelHub ? showLevelHub() : openSkillTree()\">Course</button>" +
          "</div>" +
        "</div>" +

        "<div class=\"ca-assessment-choice-grid\">" +
          "<button type=\"button\" class=\"ca-assessment-choice-card homework\" onclick=\"showHomeworkAssessmentHub()\">" +
            "<span class=\"ca-choice-kicker\">Independent Work</span>" +
            "<h3>Homework</h3>" +
            "<p>Open saved homework tasks, lesson evidence, written explanations, and independent reinforcement work.</p>" +
            "<ul><li>Lesson homework</li><li>Evidence writing</li><li>Practice completion</li></ul>" +
          "</button>" +

          "<button type=\"button\" class=\"ca-assessment-choice-card exam\" onclick=\"showFormalExamHub()\">" +
            "<span class=\"ca-choice-kicker\">Formal Check</span>" +
            "<h3>Formal Exams</h3>" +
            "<p>Open timed/review exam hubs, course checks, formal reasoning tasks, and progress review exams.</p>" +
            "<ul><li>Knowledge checks</li><li>Written reasoning</li><li>Exam review</li></ul>" +
          "</button>" +
        "</div>" +
      "</section>";

    setView("assessments");
  };

  window.showHomeworkAssessmentHub = function () {
    markNav("assessments");
    if (callAny(["showAcademicHomeworkHub"])) return;
    safeToast("Homework hub is not available in this build yet.");
  };

  window.showFormalExamHub = function () {
    markNav("assessments");
    if (callAny(["showExamHub", "showCourseworkExams"])) return;
    safeToast("Formal exam hub is not available in this build yet.");
  };

  function bindFinalNav() {
    var buttons = navButtons();
    if (buttons.home) buttons.home.onclick = window.showHome;
    if (buttons.assessments) buttons.assessments.onclick = window.showAssessmentsHub;
    if (buttons.course) buttons.course.onclick = fn("showLevelHub") || fn("openSkillTree");
    if (buttons.xp) buttons.xp.onclick = fn("showXpDashboard") || fn("showXP");
    if (buttons.progress) buttons.progress.onclick = fn("showProgress");
    if (buttons.portfolio) buttons.portfolio.onclick = fn("showPortfolioSection") || fn("openPortfolioSection");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindFinalNav, { once: true });
  } else {
    bindFinalNav();
  }
  window.setTimeout(bindFinalNav, 100);
  window.setTimeout(bindFinalNav, 600);
  window.setTimeout(bindFinalNav, 1600);
}());
