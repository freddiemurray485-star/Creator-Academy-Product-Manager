/*
  Creator Academy Helper local dashboard.
  LocalStorage is used only for harmless task preferences and notes on this device.
  It is not secure storage and never grants paid, admin, owner, or account access.
*/
(function () {
  "use strict";

  var TASK_STORAGE_KEY = "creatorAcademyHelper.localTasks.v1";
  var NOTES_STORAGE_KEY = "creatorAcademyHelper.localNotes.v1";

  var originalActions = {
    showLevelHub: typeof window.showLevelHub === "function" ? window.showLevelHub : null,
    showProgress: typeof window.showProgress === "function" ? window.showProgress : null
  };

  var tasks = [
    {
      id: "review-content",
      title: "Review the next course module",
      reason: "A clear module outline keeps course building focused and avoids duplicated lessons.",
      group: "Course building"
    },
    {
      id: "check-pwa",
      title: "Review PWA readiness",
      reason: "Document the manifest, install and offline work needed later without pretending it is complete.",
      group: "Prototype readiness"
    },
    {
      id: "write-payment-notes",
      title: "Write Stripe setup notes",
      reason: "Keep future payment requirements visible while leaving paid access entirely server-side.",
      group: "Later integration"
    },
    {
      id: "write-deployment-notes",
      title: "Prepare deployment notes",
      reason: "Capture hosting checks now without turning the local helper into a production account system.",
      group: "Later integration"
    }
  ];

  var helperState = {
    currentView: "dashboard",
    completed: readLocalJson(TASK_STORAGE_KEY, {}),
    notes: readLocalText(NOTES_STORAGE_KEY)
  };

  function readLocalJson(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function readLocalText(key) {
    try { return window.localStorage.getItem(key) || ""; }
    catch (error) { return ""; }
  }

  function writeLocalJson(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { showHelperToast("Local task preferences could not be saved in this browser."); }
  }

  function writeLocalText(key, value) {
    try { window.localStorage.setItem(key, String(value || "")); }
    catch (error) { showHelperToast("Local notes could not be saved in this browser."); }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function appRoot() {
    return document.getElementById("app");
  }

  function isLocalHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function showHelperToast(message) {
    var previous = document.querySelector(".helper-toast");
    if (previous) previous.remove();
    var toast = document.createElement("div");
    toast.className = "helper-toast";
    toast.setAttribute("role", "status");
    toast.textContent = String(message || "");
    document.body.appendChild(toast);
    window.setTimeout(function () { if (toast.parentNode) toast.remove(); }, 3200);
  }

  function installShell() {
    document.body.classList.add("helper-app");
    var app = appRoot();
    if (app) app.classList.add("helper-root");

    var brand = document.querySelector(".topbar .brand");
    if (brand) {
      brand.innerHTML = [
        '<span class="brand-mark" aria-hidden="true">CA</span>',
        '<div><h1>Creator Academy Helper</h1><p>Local project guidance</p></div>'
      ].join("");
    }
    renderNavigation();
  }

  function renderNavigation() {
    var nav = document.querySelector(".topbar .nav-actions");
    if (!nav) return;
    nav.innerHTML = [
      '<button type="button" class="helper-nav-button ' + (helperState.currentView === "dashboard" ? "active" : "") + '" onclick="showCreatorAcademyHelper()">Overview</button>',
      '<button type="button" class="helper-nav-button" onclick="helperOpenCourses()">Courses</button>',
      '<button type="button" class="helper-nav-button" onclick="helperOpenProgress()">Progress</button>'
    ].join("");
  }

  function statusCard(id, name, status) {
    return [
      '<article id="helper-status-' + id + '" class="helper-card helper-status-card" data-tone="' + escapeHtml(status.tone) + '">',
        '<div class="helper-status-top"><span class="helper-status-name">' + escapeHtml(name) + '</span><span class="helper-status-dot" aria-hidden="true"></span></div>',
        '<strong>' + escapeHtml(status.label) + '</strong>',
        '<p>' + escapeHtml(status.detail) + '</p>',
      '</article>'
    ].join("");
  }

  function projectStatuses() {
    var hasManifest = Boolean(document.querySelector("link[rel='manifest']"));
    var hasServiceWorkerSupport = "serviceWorker" in navigator;
    var pwaReady = hasManifest && hasServiceWorkerSupport;
    var local = isLocalHost();
    var coursesReady = typeof originalActions.showLevelHub === "function";
    var completedCount = tasks.filter(function (task) { return Boolean(helperState.completed[task.id]); }).length;

    return {
      mode: {
        label: local ? "Local prototype" : "Prototype build",
        detail: local ? "Running without accounts or a database." : "This build remains a local-only prototype even when hosted.",
        tone: "good"
      },
      storage: {
        label: "Browser preferences only",
        detail: "Task ticks and notes stay on this device and are not secure.",
        tone: "warn"
      },
      stripe: {
        label: "Later integration",
        detail: "Payment and paid access must remain server-authoritative in production.",
        tone: "warn"
      },
      pwa: pwaReady
        ? { label: "Structure detected", detail: "Manifest and service worker support are present; install testing remains.", tone: "good" }
        : { label: "Planning needed", detail: "Manifest or service worker setup is still outstanding.", tone: "warn" },
      deployment: local
        ? { label: "Local only", detail: "No production deployment is required for this prototype.", tone: "good" }
        : { label: "Hosted prototype", detail: "Hosting does not make local preferences secure or multi-device.", tone: "warn" },
      courses: coursesReady
        ? { label: "Structure loaded", detail: "Existing course-building routes remain available.", tone: "good" }
        : { label: "Route unavailable", detail: "The course renderer was not found in this build.", tone: "bad" },
      tasks: {
        label: completedCount + " of " + tasks.length + " complete",
        detail: "Saved locally in this browser only.",
        tone: completedCount === tasks.length ? "good" : "warn"
      }
    };
  }

  function nextAction() {
    for (var i = 0; i < tasks.length; i += 1) {
      if (!helperState.completed[tasks[i].id]) {
        return {
          priority: i === 0 ? "NEXT" : "PLAN",
          title: tasks[i].title,
          reason: tasks[i].reason,
          taskId: tasks[i].id
        };
      }
    }
    return {
      priority: "DONE",
      title: "Review your local notes",
      reason: "The current checklist is complete. Capture decisions and choose the next small course-building task.",
      taskId: ""
    };
  }

  function taskRows() {
    return tasks.map(function (task) {
      var checked = Boolean(helperState.completed[task.id]);
      return [
        '<label class="helper-task-row ' + (checked ? "completed" : "") + '">',
          '<input type="checkbox" ' + (checked ? "checked" : "") + ' onchange="helperToggleTask(\'' + task.id + '\', this.checked)">',
          '<span class="helper-task-check" aria-hidden="true"></span>',
          '<span><strong>' + escapeHtml(task.title) + '</strong><small>' + escapeHtml(task.group) + '</small></span>',
        '</label>'
      ].join("");
    }).join("");
  }

  function renderDashboard() {
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var statuses = projectStatuses();
    var next = nextAction();

    app.innerHTML = [
      '<section class="helper-dashboard helper-enter" aria-label="Creator Academy Helper dashboard">',
        '<header class="helper-welcome">',
          '<div>',
            '<span class="helper-section-label">Creator Academy Helper</span>',
            '<h2>Your local project command centre.</h2>',
            '<p>Plan course work, track launch preparation and keep the next useful action visible—without accounts, a database or fake production security.</p>',
          '</div>',
          '<span class="helper-session-pill">Local prototype · this device only</span>',
        '</header>',

        '<article class="helper-card helper-next-card">',
          '<div class="helper-priority">' + escapeHtml(next.priority) + '</div>',
          '<div><span class="helper-section-label">What should I do next?</span><h3>' + escapeHtml(next.title) + '</h3><p>' + escapeHtml(next.reason) + '</p></div>',
          (next.taskId ? '<button type="button" class="helper-button primary" onclick="helperCompleteNext(\'' + next.taskId + '\')">Mark complete</button>' : '<button type="button" class="helper-button primary" onclick="helperFocusNotes()">Open notes</button>'),
        '</article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Local overview</span><h3>Project status</h3></div>',
          '<p>Status labels describe this prototype only.</p>',
        '</div>',
        '<div class="helper-status-grid">',
          statusCard("mode", "App mode", statuses.mode),
          statusCard("storage", "Local storage", statuses.storage),
          statusCard("tasks", "Local checklist", statuses.tasks),
          statusCard("courses", "Course content", statuses.courses),
          statusCard("pwa", "PWA readiness", statuses.pwa),
          statusCard("stripe", "Stripe notes", statuses.stripe),
          statusCard("deployment", "Deployment notes", statuses.deployment),
        '</div>',

        '<div class="helper-work-grid">',
          '<article class="helper-card helper-work-card">',
            '<h3>Local task tracker</h3>',
            '<p>Checkboxes are harmless browser preferences. They are not synced or secured.</p>',
            '<div class="helper-task-list">' + taskRows() + '</div>',
          '</article>',
          '<article class="helper-card helper-work-card">',
            '<h3>Course-building helper</h3>',
            '<p>Open existing course tools or capture the next module decision.</p>',
            '<div class="helper-action-grid">',
              '<button class="helper-action-button" type="button" onclick="helperOpenCourses()"><span>Open Courses</span><span>→</span></button>',
              '<button class="helper-action-button" type="button" onclick="helperOpenProgress()"><span>Review Progress</span><span>→</span></button>',
              '<button class="helper-action-button" type="button" onclick="helperFocusNotes()"><span>Plan Next Module</span><span>→</span></button>',
              '<button class="helper-action-button" type="button" onclick="helperReviewPwa()"><span>Review PWA</span><span>→</span></button>',
            '</div>',
          '</article>',
          '<article class="helper-card helper-work-card helper-notes-card">',
            '<h3>Local progress notes</h3>',
            '<p>Stored only in this browser. Do not put passwords, payment data or sensitive information here.</p>',
            '<textarea id="helperLocalNotes" class="helper-notes" maxlength="4000" placeholder="Capture the next course task, launch question or decision...">' + escapeHtml(helperState.notes) + '</textarea>',
            '<div class="helper-notes-footer"><span id="helperNotesStatus">Local only · not secure</span><button type="button" class="helper-button" onclick="helperSaveNotes()">Save notes</button></div>',
          '</article>',
          '<article id="helperLaterNotes" class="helper-card helper-work-card">',
            '<h3>Later: production integrations</h3>',
            '<p>These are planning notes, not active services.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">P</span><span><strong>Payments:</strong> Stripe checkout, webhooks and entitlement revocation require a real backend.</span></li>',
              '<li><span class="helper-list-index">D</span><span><strong>Deployment:</strong> verify hosting, headers, monitoring and recovery before public launch.</span></li>',
              '<li><span class="helper-list-index">A</span><span><strong>Accounts:</strong> add real authentication only if a future production product genuinely needs users or cross-device data.</span></li>',
            '</ul>',
          '</article>',
        '</div>',
      '</section>'
    ].join("");
  }

  window.helperToggleTask = function (taskId, checked) {
    var exists = tasks.some(function (task) { return task.id === taskId; });
    if (!exists) return;
    helperState.completed[taskId] = Boolean(checked);
    writeLocalJson(TASK_STORAGE_KEY, helperState.completed);
    renderDashboard();
  };

  window.helperCompleteNext = function (taskId) {
    window.helperToggleTask(taskId, true);
    showHelperToast("Local task marked complete.");
  };

  window.helperSaveNotes = function () {
    var field = document.getElementById("helperLocalNotes");
    if (!field) return;
    helperState.notes = String(field.value || "").slice(0, 4000);
    writeLocalText(NOTES_STORAGE_KEY, helperState.notes);
    var status = document.getElementById("helperNotesStatus");
    if (status) status.textContent = "Saved on this device · not secure";
    showHelperToast("Local notes saved on this device.");
  };

  window.helperFocusNotes = function () {
    var field = document.getElementById("helperLocalNotes");
    if (field) {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(function () { field.focus(); }, 260);
    }
  };

  window.helperReviewPwa = async function () {
    var hasManifest = Boolean(document.querySelector("link[rel='manifest']"));
    var hasSupport = "serviceWorker" in navigator;
    var registration = null;
    if (hasSupport && navigator.serviceWorker.getRegistration) {
      try { registration = await navigator.serviceWorker.getRegistration(); }
      catch (error) { registration = null; }
    }
    showHelperToast(hasManifest && registration
      ? "PWA structure detected. Test install and offline behavior manually."
      : "PWA work remains: add and test a manifest plus service worker when needed.");
  };

  window.helperShowLaterNotes = function () {
    var notes = document.getElementById("helperLaterNotes");
    if (notes) notes.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  window.helperOpenCourses = function () {
    helperState.currentView = "courses";
    renderNavigation();
    if (originalActions.showLevelHub) originalActions.showLevelHub();
    else showHelperToast("Course route is not available in this build.");
  };

  window.helperOpenProgress = function () {
    helperState.currentView = "progress";
    renderNavigation();
    if (originalActions.showProgress) originalActions.showProgress();
    else showHelperToast("Progress route is not available in this build.");
  };

  window.showCreatorAcademyHelper = renderDashboard;

  function install() {
    installShell();
    window.showHome = renderDashboard;
    renderDashboard();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();

  // Older course layers use delayed startup repairs; retain the local helper as the final home surface.
  window.setTimeout(function () { window.showHome = renderDashboard; }, 700);
  window.setTimeout(function () { window.showHome = renderDashboard; if (helperState.currentView === "dashboard") renderDashboard(); }, 2800);
}());
