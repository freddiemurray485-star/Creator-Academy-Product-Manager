/*
  Creator Academy Hub direct assessment hubs.
  Fixes assessment choice cards falling through into older gated routes.
  Homework and Formal Exams now render their own assessment pages directly.
*/
(function () {
  "use strict";

  var HOMEWORK_PREFIX = "creatorAcademy.homework.v1.";
  var EXAM_PREFIX = "creatorAcademy.formalExam.v1.";

  function root() {
    return document.getElementById("app");
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function markAssessments() {
    ["navHome", "navAssessments", "navCourse", "navXP", "navProgress", "navPortfolio"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var active = id === "navAssessments";
      el.classList.toggle("active", active);
      el.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  function setView(name) {
    if (typeof window.setCurrentView === "function") window.setCurrentView(name);
  }

  function toast(message) {
    if (typeof window.showToast === "function") window.showToast(message);
  }

  function getLevels() {
    var raw = Array.isArray(window.levelDefinitions) ? window.levelDefinitions : [];
    if (!raw.length) {
      return [
        { level: 1, name: "Foundation Bootcamp", courses: ["Roblox Studio Basics"] },
        { level: 2, name: "Core Scripting", courses: ["Roblox Lua"] },
        { level: 3, name: "Asset Creation", courses: ["Blender"] },
        { level: 4, name: "Animation and Polish", courses: ["Moon Animator"] }
      ];
    }
    return raw.slice().sort(function (a, b) {
      return Number(a.level || 0) - Number(b.level || 0);
    });
  }

  function unitCode(level) {
    var section = Number(level) <= 15 ? "S1" : "S2";
    return "CA-" + section + "-U" + String(level).padStart(2, "0");
  }

  function homeworkKey(level, slot) {
    return HOMEWORK_PREFIX + level + ":" + slot;
  }

  function homeworkStatus(level, slot) {
    var saved = localStorage.getItem(homeworkKey(level, slot)) || "";
    var complete = localStorage.getItem(homeworkKey(level, slot) + ".complete") === "true";
    if (complete) return { label: "Complete", className: "complete", saved: saved };
    if (saved.trim()) return { label: "Started", className: "started", saved: saved };
    return { label: "Ready", className: "ready", saved: saved };
  }

  function renderHomeworkLevelCard(level) {
    var levelNo = Number(level.level || 0);
    var samples = [1, 2, 3].map(function (slot) {
      var status = homeworkStatus(levelNo, slot);
      return "<button type=\"button\" class=\"ca-direct-mini-task " + status.className + "\" onclick=\"showDirectHomeworkTask(" + levelNo + ", " + slot + ")\">" +
        "<span>Lesson " + slot + "</span><strong>" + status.label + "</strong></button>";
    }).join("");

    return "<article class=\"ca-direct-assessment-card\">" +
      "<span class=\"unit-code-pill\">" + unitCode(levelNo) + "</span>" +
      "<h3>Level " + levelNo + ": " + escapeHtml(level.name || "Academy Level") + "</h3>" +
      "<p>" + escapeHtml(level.focus || (Array.isArray(level.courses) ? level.courses.join(" • ") : "Homework evidence and lesson practice.")) + "</p>" +
      "<div class=\"ca-direct-mini-grid\">" + samples + "</div>" +
      "<button type=\"button\" class=\"secondary\" onclick=\"showDirectHomeworkLevel(" + levelNo + ")\">View all 20 homework slots</button>" +
    "</article>";
  }

  window.showHomeworkAssessmentHub = function () {
    var app = root();
    if (!app) return;
    markAssessments();

    var levels = getLevels();
    var visible = levels.slice(0, 30).map(renderHomeworkLevelCard).join("");

    app.innerHTML = "<section class=\"panel ca-direct-assessment-page\">" +
      "<div class=\"course-header ca-direct-assessment-header\">" +
        "<div><span class=\"badge\">Homework</span><h2>Independent Homework Hub</h2>" +
        "<p>This page is a direct homework area. It does not route to Plans, Course, or older gated assessment screens.</p></div>" +
        "<div class=\"actions\"><button type=\"button\" class=\"secondary\" onclick=\"showAssessmentsHub()\">Assessment Options</button><button type=\"button\" class=\"secondary\" onclick=\"showHome()\">Home</button></div>" +
      "</div>" +
      "<div class=\"academic-definition-panel ca-direct-standard\"><h3>Homework Standard</h3>" +
      "<p>Homework should prove independent practice: what you attempted, what happened, what broke, what you fixed, and what you understand now.</p>" +
      "<ul><li>Recommended minimum: 120 words per serious submission.</li><li>Evidence can include screenshots, code notes, build notes, or design reasoning.</li><li>Homework prepares you for formal exams; it is not the same as coursework.</li></ul></div>" +
      "<div class=\"grid ca-direct-assessment-grid\">" + visible + "</div>" +
    "</section>";

    setView("homeworkDirectHub");
  };

  window.showDirectHomeworkLevel = function (levelNo) {
    var app = root();
    if (!app) return;
    markAssessments();

    var level = getLevels().filter(function (item) { return Number(item.level) === Number(levelNo); })[0] || { level: levelNo, name: "Academy Level" };
    var slots = [];
    for (var slot = 1; slot <= 20; slot += 1) {
      var status = homeworkStatus(levelNo, slot);
      slots.push("<button type=\"button\" class=\"ca-direct-slot-card " + status.className + "\" onclick=\"showDirectHomeworkTask(" + levelNo + ", " + slot + ")\">" +
        "<span>Lesson " + slot + "</span><strong>" + status.label + "</strong><small>Open homework editor</small></button>");
    }

    app.innerHTML = "<section class=\"panel ca-direct-assessment-page\">" +
      "<div class=\"course-header\"><div><span class=\"badge\">Homework</span><h2>Level " + levelNo + ": " + escapeHtml(level.name || "Academy Level") + "</h2>" +
      "<p>Choose a lesson slot and write the homework evidence directly.</p></div>" +
      "<div class=\"actions\"><button type=\"button\" class=\"secondary\" onclick=\"showHomeworkAssessmentHub()\">All Homework</button><button type=\"button\" class=\"secondary\" onclick=\"showAssessmentsHub()\">Assessment Options</button></div></div>" +
      "<div class=\"ca-direct-slot-grid\">" + slots.join("") + "</div>" +
    "</section>";

    setView("homeworkDirectLevel");
  };

  window.showDirectHomeworkTask = function (levelNo, slot) {
    var app = root();
    if (!app) return;
    markAssessments();

    var level = getLevels().filter(function (item) { return Number(item.level) === Number(levelNo); })[0] || { level: levelNo, name: "Academy Level" };
    var key = homeworkKey(levelNo, slot);
    var saved = localStorage.getItem(key) || "";
    var complete = localStorage.getItem(key + ".complete") === "true";

    app.innerHTML = "<section class=\"panel ca-direct-assessment-page\">" +
      "<div class=\"course-header\"><div><span class=\"badge\">Homework Editor</span><h2>Level " + levelNo + " Lesson " + slot + " Homework</h2>" +
      "<p>" + escapeHtml(level.name || "Academy Level") + "</p></div>" +
      "<div class=\"actions\"><button type=\"button\" class=\"secondary\" onclick=\"showDirectHomeworkLevel(" + levelNo + ")\">Level Homework</button><button type=\"button\" class=\"secondary\" onclick=\"showHomeworkAssessmentHub()\">All Homework</button></div></div>" +
      "<div class=\"academic-definition-panel ca-direct-standard\"><h3>Required Evidence Pattern</h3>" +
      "<ol><li>Define the concept in your own words.</li><li>Explain what you built or attempted.</li><li>Describe one issue or bug.</li><li>Explain the fix or next improvement.</li></ol></div>" +
      "<textarea id=\"caDirectHomeworkText\" class=\"ca-direct-textarea\" placeholder=\"Write your homework evidence here...\">" + escapeHtml(saved) + "</textarea>" +
      "<div class=\"actions\"><button type=\"button\" onclick=\"saveDirectHomework(" + levelNo + ", " + slot + ", false)\">Save Homework</button>" +
      "<button type=\"button\" class=\"secondary\" onclick=\"saveDirectHomework(" + levelNo + ", " + slot + ", true)\">Mark Complete</button></div>" +
      "<p id=\"caDirectHomeworkStatus\" class=\"academic-quality-note\">Current status: " + (complete ? "Complete" : saved.trim() ? "Started" : "Ready") + "</p>" +
    "</section>";

    setView("homeworkDirectTask");
  };

  window.saveDirectHomework = function (levelNo, slot, markComplete) {
    var box = document.getElementById("caDirectHomeworkText");
    var status = document.getElementById("caDirectHomeworkStatus");
    var text = box ? box.value : "";
    var key = homeworkKey(levelNo, slot);
    localStorage.setItem(key, text);
    if (markComplete) localStorage.setItem(key + ".complete", "true");
    if (status) status.textContent = markComplete ? "Current status: Complete" : "Current status: Saved";
    toast(markComplete ? "Homework marked complete." : "Homework saved.");
  };

  var examTracks = [
    { id: "studio", title: "Roblox Studio Basics", focus: "Explorer, Workspace, parts, testing, organisation, publishing readiness." },
    { id: "lua", title: "Roblox Lua", focus: "Variables, conditions, functions, events, tables, UI logic, client/server basics." },
    { id: "blender", title: "Blender", focus: "Modelling workflow, materials, scale, export thinking, asset evidence." },
    { id: "moon", title: "Moon Animator", focus: "Keyframes, timing, spacing, presentation, animation polish." },
    { id: "ui", title: "UI / Product Experience", focus: "ScreenGui structure, buttons, feedback, readability, user flow." },
    { id: "business", title: "Creator Business", focus: "Monetisation, portfolio, launch evidence, product thinking." }
  ];

  function examKey(trackId) {
    return EXAM_PREFIX + trackId;
  }

  function examStatus(trackId) {
    var raw = localStorage.getItem(examKey(trackId));
    if (!raw) return { label: "Ready", score: "—", className: "ready" };
    try {
      var data = JSON.parse(raw);
      return { label: data.complete ? "Submitted" : "Draft", score: data.score || "Saved", className: data.complete ? "complete" : "started" };
    } catch (error) {
      return { label: "Saved", score: "Saved", className: "started" };
    }
  }

  function renderExamTrack(track) {
    var status = examStatus(track.id);
    return "<article class=\"ca-direct-assessment-card ca-direct-exam-card " + status.className + "\">" +
      "<span class=\"ca-choice-kicker\">Formal Exam</span>" +
      "<h3>" + escapeHtml(track.title) + "</h3>" +
      "<p>" + escapeHtml(track.focus) + "</p>" +
      "<div class=\"ca-direct-exam-status\"><span>State: <strong>" + status.label + "</strong></span><span>Result: <strong>" + status.score + "</strong></span></div>" +
      "<button type=\"button\" onclick=\"openDirectFormalExam('" + track.id + "')\">" + (status.label === "Submitted" ? "Review Exam" : "Open Exam") + "</button>" +
    "</article>";
  }

  window.showFormalExamHub = function () {
    var app = root();
    if (!app) return;
    markAssessments();

    app.innerHTML = "<section class=\"panel ca-direct-assessment-page\">" +
      "<div class=\"course-header ca-direct-assessment-header\"><div><span class=\"badge\">Formal Exams</span><h2>Formal Exam Hub</h2>" +
      "<p>This is the direct exam area. It does not send you into Course or Plans.</p></div>" +
      "<div class=\"actions\"><button type=\"button\" class=\"secondary\" onclick=\"showAssessmentsHub()\">Assessment Options</button><button type=\"button\" class=\"secondary\" onclick=\"showHome()\">Home</button></div></div>" +
      "<div class=\"academic-definition-panel ca-direct-standard\"><h3>Formal Exam Standard</h3>" +
      "<p>Formal exams check vocabulary, reasoning, debugging judgement, and transfer. They are separate from course browsing.</p></div>" +
      "<div class=\"grid ca-direct-assessment-grid\">" + examTracks.map(renderExamTrack).join("") + "</div>" +
    "</section>";

    setView("formalExamDirectHub");
  };

  window.openDirectFormalExam = function (trackId) {
    var app = root();
    if (!app) return;
    markAssessments();

    var track = examTracks.filter(function (item) { return item.id === trackId; })[0] || examTracks[0];
    var raw = localStorage.getItem(examKey(track.id));
    var saved = { q1: "", q2: "", q3: "", q4: "", complete: false };
    if (raw) {
      try { saved = Object.assign(saved, JSON.parse(raw)); } catch (error) {}
    }

    app.innerHTML = "<section class=\"panel ca-direct-assessment-page\">" +
      "<div class=\"course-header\"><div><span class=\"badge\">Formal Exam</span><h2>" + escapeHtml(track.title) + " Exam</h2>" +
      "<p>Answer in full sentences. This saves locally in File Explorer mode.</p></div>" +
      "<div class=\"actions\"><button type=\"button\" class=\"secondary\" onclick=\"showFormalExamHub()\">All Exams</button><button type=\"button\" class=\"secondary\" onclick=\"showAssessmentsHub()\">Assessment Options</button></div></div>" +
      "<div class=\"ca-direct-exam-form\">" +
        directExamQuestion("q1", "1. Define the core skill this exam is checking.", saved.q1) +
        directExamQuestion("q2", "2. Explain one practical example of using this skill in a Roblox project.", saved.q2) +
        directExamQuestion("q3", "3. Describe one common mistake and how you would debug or avoid it.", saved.q3) +
        directExamQuestion("q4", "4. Explain how this skill connects to building a stronger creator portfolio.", saved.q4) +
      "</div>" +
      "<div class=\"actions\"><button type=\"button\" onclick=\"saveDirectFormalExam('" + track.id + "', false)\">Save Draft</button>" +
      "<button type=\"button\" class=\"secondary\" onclick=\"saveDirectFormalExam('" + track.id + "', true)\">Submit Exam</button></div>" +
      "<p id=\"caDirectExamStatus\" class=\"academic-quality-note\">Current status: " + (saved.complete ? "Submitted" : raw ? "Draft saved" : "Ready") + "</p>" +
    "</section>";

    setView("formalExamDirectAttempt");
  };

  function directExamQuestion(id, label, value) {
    return "<label class=\"ca-direct-exam-question\"><strong>" + escapeHtml(label) + "</strong>" +
      "<textarea id=\"caExam_" + id + "\" class=\"ca-direct-textarea\" placeholder=\"Write your answer...\">" + escapeHtml(value || "") + "</textarea></label>";
  }

  window.saveDirectFormalExam = function (trackId, complete) {
    function value(id) {
      var box = document.getElementById("caExam_" + id);
      return box ? box.value : "";
    }
    var answers = [value("q1"), value("q2"), value("q3"), value("q4")];
    var wordCount = answers.join(" ").trim().split(/\s+/).filter(Boolean).length;
    var score = complete ? (wordCount >= 220 ? "Strong evidence" : wordCount >= 100 ? "Needs expansion" : "Too short") : "Draft";
    localStorage.setItem(examKey(trackId), JSON.stringify({
      q1: answers[0], q2: answers[1], q3: answers[2], q4: answers[3],
      complete: Boolean(complete),
      score: score,
      savedAt: new Date().toISOString()
    }));
    var status = document.getElementById("caDirectExamStatus");
    if (status) status.textContent = complete ? "Current status: Submitted — " + score : "Current status: Draft saved";
    toast(complete ? "Formal exam submitted." : "Formal exam draft saved.");
  };

  function rebindChoiceCards() {
    var homework = document.querySelector(".ca-assessment-choice-card.homework");
    var exam = document.querySelector(".ca-assessment-choice-card.exam");
    if (homework) homework.onclick = window.showHomeworkAssessmentHub;
    if (exam) exam.onclick = window.showFormalExamHub;
  }

  document.addEventListener("click", function (event) {
    var homework = event.target.closest && event.target.closest(".ca-assessment-choice-card.homework");
    var exam = event.target.closest && event.target.closest(".ca-assessment-choice-card.exam");
    if (homework) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      window.showHomeworkAssessmentHub();
    }
    if (exam) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      window.showFormalExamHub();
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rebindChoiceCards, { once: true });
  } else {
    rebindChoiceCards();
  }
  window.setTimeout(rebindChoiceCards, 100);
  window.setTimeout(rebindChoiceCards, 800);
}());
