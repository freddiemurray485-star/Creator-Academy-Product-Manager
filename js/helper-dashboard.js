/*
  Creator Academy Helper — local Overseer dashboard.
  LocalStorage is limited to harmless task state and notes on this device.
  It is not secure storage and never grants paid, admin, owner, or account access.
*/
(function () {
  "use strict";

  var TASK_STORAGE_KEY = "creatorAcademyHelper.localTasks.v1";
  var NOTES_STORAGE_KEY = "creatorAcademyHelper.localNotes.v1";
  var INTAKE_STORAGE_KEY = "creatorAcademyHelper.localIntake.v1";
  var VALID_TASK_STATES = ["active", "completed", "blocked"];

  var originalActions = {
    showLevelHub: typeof window.showLevelHub === "function" ? window.showLevelHub : null,
    showProgress: typeof window.showProgress === "function" ? window.showProgress : null
  };

  var tasks = [
    { id: "roblox-core-loop", area: "Roblox Studio", title: "Define the next Roblox Studio build milestone", detail: "Choose one small playable system to complete before expanding scope.", priority: 1 },
    { id: "lua-systems", area: "Roblox Studio", title: "Create the Lua systems practice list", detail: "Track the scripting concepts needed for current game systems.", priority: 2 },
    { id: "studio-ui", area: "Roblox Studio", title: "Map the next UI flow", detail: "List the screens, states and player feedback needed for the next build.", priority: 3 },
    { id: "tycoon-events", area: "Roblox Studio", title: "Outline Tycoon and event-system boundaries", detail: "Separate trusted server logic, client UI and safe admin/event controls.", priority: 4 },
    { id: "academy-map", area: "Creator Academy", title: "Review the course and path structure", detail: "Confirm what belongs in each path before adding more lessons.", priority: 2 },
    { id: "lesson-template", area: "Creator Academy", title: "Standardise the next lesson template", detail: "Keep outcomes, examples, tasks and evidence requirements consistent.", priority: 3 },
    { id: "assessment-plan", area: "Creator Academy", title: "Plan the next assessment and homework set", detail: "Connect each assessment to a real lesson outcome.", priority: 4 },
    { id: "portfolio-public-notes", area: "Creator Academy", title: "Capture portfolio and public-site ideas", detail: "Keep future public-facing ideas separate from this local dashboard.", priority: 5 },
    { id: "pwa-review", area: "Launch readiness", title: "Review PWA readiness", detail: "Document manifest, install and offline work without claiming readiness.", priority: 6 },
    { id: "seo-review", area: "Launch readiness", title: "Review the SEO checklist", detail: "Check metadata, indexing files and future public-page wording.", priority: 7 }
  ];

  var robloxFocus = [
    "Roblox Lua learning",
    "Game systems",
    "UI work",
    "Tycoon systems",
    "Admin and event safety",
    "Blender, Moon Animator and VFX"
  ];

  var academyFocus = [
    "Course structure",
    "Lesson planning",
    "Path planning",
    "Portfolio ideas",
    "Assessments and homework",
    "Public website notes"
  ];

  var intakeFields = [
    { id: "currentBuild", label: "Current Roblox Studio build", question: "What are you building in Roblox Studio right now?", placeholder: "Example: a tycoon upgrade system, UI flow, event system or Lua practice project" },
    { id: "biggestBlocker", label: "Biggest blocker", question: "What is slowing the project down most?", placeholder: "Describe the bug, missing decision, skill gap or unclear requirement" },
    { id: "courseFocus", label: "Course focus", question: "Which Creator Academy lesson, path or course area needs attention?", placeholder: "Example: Lua foundations, UI design, assessment planning or portfolio work" },
    { id: "requestedHelp", label: "ChatGPT help needed", question: "What do you want ChatGPT to help with?", placeholder: "Example: explain code, debug a script, improve a lesson, write a checklist or review a plan" },
    { id: "targetOutcome", label: "Target outcome", question: "What should a useful answer or finished task produce?", placeholder: "Example: working Lua code with explanation, a lesson outline, or a launch checklist" },
    { id: "constraints", label: "Constraints and context", question: "What constraints, tools or details must the answer respect?", placeholder: "Example: beginner-friendly, Roblox server-authoritative, local-only, no paid services" }
  ];

  var promptModes = {
    project: { label: "Project adviser", instruction: "Act as a pragmatic Roblox and Creator Academy project adviser. Give one prioritised next step, then a short execution plan." },
    lua: { label: "Lua debugger", instruction: "Act as a Roblox Lua debugging partner. Explain the likely cause, show a minimal safe fix, and include checks to prove it works." },
    lesson: { label: "Lesson planner", instruction: "Act as a practical course designer. Create a clear lesson outcome, teaching sequence, example, learner task and evidence check." },
    launch: { label: "Launch reviewer", instruction: "Act as a cautious launch reviewer. Separate confirmed facts from assumptions and list only the highest-impact blockers and next actions." }
  };

  var helperState = {
    currentView: "dashboard",
    taskState: normaliseTaskState(readLocalJson(TASK_STORAGE_KEY, {})),
    notes: readLocalText(NOTES_STORAGE_KEY),
    intake: normaliseIntake(readLocalJson(INTAKE_STORAGE_KEY, {})),
    promptMode: "project"
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
    catch (error) { showHelperToast("Local task state could not be saved in this browser."); }
  }

  function writeLocalText(key, value) {
    try { window.localStorage.setItem(key, String(value || "")); }
    catch (error) { showHelperToast("Local notes could not be saved in this browser."); }
  }

  function normaliseTaskState(stored) {
    var clean = {};
    tasks.forEach(function (task) {
      var value = stored && stored[task.id];
      if (value === true) value = "completed";
      if (value === false) value = "active";
      clean[task.id] = VALID_TASK_STATES.indexOf(value) >= 0 ? value : "active";
    });
    return clean;
  }

  function normaliseIntake(stored) {
    var clean = {};
    intakeFields.forEach(function (field) {
      clean[field.id] = String(stored && stored[field.id] || "").trim().slice(0, 1200);
    });
    return clean;
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
        '<div><h1>Creator Academy Helper</h1><p>Overseer · local project operations</p></div>'
      ].join("");
    }
    renderNavigation();
  }

  function renderNavigation() {
    var nav = document.querySelector(".topbar .nav-actions");
    if (!nav) return;
    nav.innerHTML = [
      '<button type="button" class="helper-nav-button ' + (helperState.currentView === "dashboard" ? "active" : "") + '" onclick="showCreatorAcademyHelper()">Overseer</button>',
      '<button type="button" class="helper-nav-button" onclick="helperOpenCourses()">Courses</button>',
      '<button type="button" class="helper-nav-button" onclick="helperOpenProgress()">Progress</button>',
      '<button type="button" class="helper-nav-button" onclick="helperFocusNotes()">Notes</button>'
    ].join("");
  }

  function taskStatus(taskId) {
    return VALID_TASK_STATES.indexOf(helperState.taskState[taskId]) >= 0 ? helperState.taskState[taskId] : "active";
  }

  function taskCounts() {
    var counts = { active: 0, completed: 0, blocked: 0 };
    tasks.forEach(function (task) { counts[taskStatus(task.id)] += 1; });
    return counts;
  }

  function intakeProgress() {
    var answered = intakeFields.filter(function (field) {
      return Boolean(String(helperState.intake[field.id] || "").trim());
    }).length;
    return {
      answered: answered,
      total: intakeFields.length,
      percent: Math.round((answered / intakeFields.length) * 100)
    };
  }

  function nextIntakeQuestion() {
    for (var i = 0; i < intakeFields.length; i += 1) {
      if (!String(helperState.intake[intakeFields[i].id] || "").trim()) return intakeFields[i];
    }
    return null;
  }

  function nextAction() {
    var available = tasks
      .filter(function (task) { return taskStatus(task.id) === "active"; })
      .sort(function (a, b) { return a.priority - b.priority; });
    if (available.length) return available[0];

    var blocked = tasks.filter(function (task) { return taskStatus(task.id) === "blocked"; });
    if (blocked.length) {
      return {
        id: "",
        area: "Overseer",
        title: "Review the blocked task list",
        detail: "No active tasks remain. Decide what can be unblocked before adding more work.",
        priority: 1
      };
    }

    return {
      id: "",
      area: "Overseer",
      title: "Choose the next small milestone",
      detail: "The current task list is complete. Add the next focused milestone to local notes.",
      priority: 1
    };
  }

  function overseerNextAction() {
    var missing = nextIntakeQuestion();
    if (missing) {
      return {
        id: "",
        area: "Information needed",
        title: missing.question,
        detail: "Answer this once and Overseer will use it to build more specific ChatGPT prompts and project guidance.",
        kind: "intake",
        fieldId: missing.id
      };
    }
    var task = nextAction();
    task.kind = "task";
    return task;
  }

  function intakeFieldsHtml() {
    return intakeFields.map(function (field) {
      return [
        '<label class="overseer-intake-field">',
          '<span>' + escapeHtml(field.label) + '</span>',
          '<small>' + escapeHtml(field.question) + '</small>',
          '<textarea id="overseer-intake-' + field.id + '" maxlength="1200" placeholder="' + escapeHtml(field.placeholder) + '">' + escapeHtml(helperState.intake[field.id]) + '</textarea>',
        '</label>'
      ].join("");
    }).join("");
  }

  function promptModeButtons() {
    return Object.keys(promptModes).map(function (mode) {
      return '<button type="button" class="overseer-prompt-mode ' + (helperState.promptMode === mode ? "active" : "") + '" onclick="helperSetPromptMode(\'' + mode + '\')">' + escapeHtml(promptModes[mode].label) + '</button>';
    }).join("");
  }

  function promptValue(value, fallback) {
    var clean = String(value || "").trim();
    return clean || fallback;
  }

  function buildPrompt() {
    var mode = promptModes[helperState.promptMode] || promptModes.project;
    return [
      mode.instruction,
      "",
      "Project context:",
      "- Project: Creator Academy, a small founder-led project by Freddie Murray with Mason Harris as a recently joined co-founder/founding member.",
      "- Current Roblox Studio build: " + promptValue(helperState.intake.currentBuild, "Not provided yet"),
      "- Biggest blocker: " + promptValue(helperState.intake.biggestBlocker, "Not provided yet"),
      "- Creator Academy focus: " + promptValue(helperState.intake.courseFocus, "Not provided yet"),
      "- Help requested: " + promptValue(helperState.intake.requestedHelp, "Not provided yet"),
      "- Target outcome: " + promptValue(helperState.intake.targetOutcome, "Not provided yet"),
      "- Constraints and context: " + promptValue(helperState.intake.constraints, "Not provided yet"),
      "",
      "Response rules:",
      "- Be direct, practical and specific.",
      "- Ask up to three focused questions if critical information is missing.",
      "- Do not invent completed work, production readiness, secure accounts or paid access.",
      "- Keep Roblox trust-sensitive logic server-authoritative.",
      "- End with the single best next action."
    ].join("\n");
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

  function launchStatuses() {
    var hasManifest = Boolean(document.querySelector("link[rel='manifest']"));
    var hasServiceWorkerSupport = "serviceWorker" in navigator;
    var hasSeoBaseline = Boolean(document.querySelector("meta[name='description']")) && Boolean(document.querySelector("link[rel='canonical']"));
    return {
      pwa: hasManifest && hasServiceWorkerSupport
        ? { label: "Structure detected", detail: "Install and offline behaviour still need manual testing.", tone: "good" }
        : { label: "Planning needed", detail: "Manifest or service worker setup is still outstanding.", tone: "warn" },
      deployment: { label: "Later", detail: "This is a local prototype; hosting is not a readiness claim.", tone: "warn" },
      stripe: { label: "Later", detail: "Payments and entitlements require a real server-side implementation.", tone: "warn" },
      backend: { label: "Not needed locally", detail: "Only add backend/auth if a production product later needs users or sync.", tone: "good" },
      seo: hasSeoBaseline
        ? { label: "Baseline present", detail: "Metadata exists; public wording and indexing still need review.", tone: "good" }
        : { label: "Review needed", detail: "Add a public-page metadata checklist before deployment.", tone: "warn" }
    };
  }

  function focusChips(items) {
    return '<div class="overseer-chip-list">' + items.map(function (item) {
      return '<span class="overseer-chip">' + escapeHtml(item) + '</span>';
    }).join("") + '</div>';
  }

  function areaTaskList(area) {
    return '<ul class="overseer-area-list">' + tasks.filter(function (task) {
      return task.area === area;
    }).slice(0, 4).map(function (task) {
      return '<li><span class="overseer-state ' + taskStatus(task.id) + '"></span><span>' + escapeHtml(task.title) + '</span></li>';
    }).join("") + '</ul>';
  }

  function taskRows() {
    return tasks.map(function (task) {
      var status = taskStatus(task.id);
      return [
        '<article class="helper-task-row ' + status + '">',
          '<div><span class="helper-task-area">' + escapeHtml(task.area) + '</span><strong>' + escapeHtml(task.title) + '</strong><small>' + escapeHtml(task.detail) + '</small></div>',
          '<select class="helper-task-state" aria-label="Status for ' + escapeHtml(task.title) + '" onchange="helperSetTaskStatus(\'' + task.id + '\', this.value)">',
            '<option value="active"' + (status === "active" ? " selected" : "") + '>Active</option>',
            '<option value="completed"' + (status === "completed" ? " selected" : "") + '>Completed</option>',
            '<option value="blocked"' + (status === "blocked" ? " selected" : "") + '>Blocked</option>',
          '</select>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderDashboard() {
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var next = overseerNextAction();
    var counts = taskCounts();
    var intake = intakeProgress();
    var launch = launchStatuses();
    var localLabel = isLocalHost() ? "Local prototype" : "Hosted copy of local prototype";

    app.innerHTML = [
      '<section class="helper-dashboard helper-enter" aria-label="Overseer dashboard">',
        '<header class="helper-welcome overseer-heading">',
          '<div>',
            '<span class="helper-section-label">Creator Academy Helper</span>',
            '<h2>Overseer Overview</h2>',
            '<p>Local Overseer dashboard for Roblox Studio work, course building, launch planning and project progress.</p>',
          '</div>',
          '<span class="helper-session-pill">' + escapeHtml(localLabel) + ' · this device only</span>',
        '</header>',

        '<div class="overseer-command-strip">',
          '<span class="overseer-live"><i></i> Overseer active</span>',
          '<span>Information profile <strong>' + intake.percent + '%</strong></span>',
          '<span>Tasks <strong>' + counts.active + ' active</strong></span>',
          '<span>Sync <strong>off</strong></span>',
          '<span>Storage <strong>local only</strong></span>',
        '</div>',

        '<div class="overseer-overview-grid">',
          '<article class="helper-card overseer-lead-card">',
            '<div class="overseer-mark">OV</div>',
            '<div><span class="helper-section-label">What Overseer does</span><h3>One place to keep the project moving.</h3><p>Overseer helps track the Creator Academy project, Roblox Studio development, course-building tasks, and launch readiness from one local dashboard.</p></div>',
          '</article>',
          '<article class="helper-card overseer-mission-card">',
            '<span class="helper-section-label">Current mission</span>',
            '<h3>Build the next useful piece without expanding scope too early.</h3>',
            '<p>Keep Roblox Studio progress and Creator Academy planning connected through small, testable milestones.</p>',
          '</article>',
          '<article class="helper-card overseer-members-card">',
            '<span class="helper-section-label">Current members</span>',
            '<div class="overseer-member"><span class="overseer-avatar">FM</span><div><strong>Freddie Murray</strong><small>Founder · Original Creator · Project Lead</small></div></div>',
            '<div class="overseer-member"><span class="overseer-avatar mason">MH</span><div><strong>Mason Harris</strong><small>Co-Founder · Founding Member</small></div></div>',
            '<p>Creator Academy is a small, founder-led project. Freddie created the original project; Mason recently joined as a founder-level member.</p>',
          '</article>',
          '<article class="helper-card overseer-project-card">',
            '<span class="helper-section-label">Project status</span>',
            '<div class="overseer-project-status"><strong>Active planning</strong><span>Local prototype</span></div>',
            '<dl><div><dt>Active</dt><dd>' + counts.active + '</dd></div><div><dt>Completed</dt><dd>' + counts.completed + '</dd></div><div><dt>Blocked</dt><dd>' + counts.blocked + '</dd></div></dl>',
            '<p>Task status and notes are browser-only preferences, not secure project records.</p>',
          '</article>',
        '</div>',

        '<article class="helper-card helper-next-card">',
          '<div class="helper-priority">' + (next.kind === "intake" ? "INFO" : (next.id ? "HIGH" : "NEXT")) + '</div>',
          '<div><span class="helper-section-label">What should I do next?</span><h3>' + escapeHtml(next.title) + '</h3><p><strong>' + escapeHtml(next.area) + ':</strong> ' + escapeHtml(next.detail) + '</p></div>',
          (next.kind === "intake"
            ? '<button type="button" class="helper-button primary" onclick="helperFocusIntake(\'' + next.fieldId + '\')">Answer now</button>'
            : (next.id ? '<button type="button" class="helper-button primary" onclick="helperSetTaskStatus(\'' + next.id + '\', \'completed\')">Mark complete</button>' : '<button type="button" class="helper-button primary" onclick="helperFocusNotes()">Open notes</button>')),
        '</article>',

        '<div class="overseer-intelligence-grid">',
          '<article id="overseerIntake" class="helper-card overseer-intake-card">',
            '<div class="overseer-card-heading">',
              '<div><span class="helper-section-label">Information intake</span><h3>Help Overseer understand the work</h3><p>Answer only what is useful. Everything stays in this browser and is not sent anywhere automatically.</p></div>',
              '<div class="overseer-progress-ring" style="--progress:' + intake.percent + '"><strong>' + intake.percent + '%</strong><span>' + intake.answered + '/' + intake.total + '</span></div>',
            '</div>',
            '<div class="overseer-intake-grid">' + intakeFieldsHtml() + '</div>',
            '<div class="overseer-intake-footer"><span>Local draft · not secure · avoid sensitive information</span><button type="button" class="helper-button primary" onclick="helperSaveIntake()">Save project information</button></div>',
          '</article>',
          '<article class="helper-card overseer-prompt-card">',
            '<div class="overseer-card-heading compact">',
              '<div><span class="helper-section-label">ChatGPT prompt lab</span><h3>Turn project context into a useful prompt</h3><p>Choose a mode, review the prompt, then copy it manually into ChatGPT.</p></div>',
            '</div>',
            '<div class="overseer-prompt-modes">' + promptModeButtons() + '</div>',
            '<textarea id="overseerGeneratedPrompt" class="overseer-generated-prompt" readonly>' + escapeHtml(buildPrompt()) + '</textarea>',
            '<div class="overseer-prompt-footer"><span>Nothing is transmitted automatically.</span><button type="button" class="helper-button primary" onclick="helperCopyPrompt()">Copy prompt</button></div>',
          '</article>',
        '</div>',

        '<div class="overseer-operations-grid">',
          '<article class="helper-card overseer-area-card roblox">',
            '<div class="overseer-area-heading"><span class="overseer-area-icon">R</span><div><span class="helper-section-label">Build operations</span><h3>Roblox Studio Work</h3></div></div>',
            '<p>Track practical building, scripting and production work without mixing it into course-page marketing.</p>',
            focusChips(robloxFocus),
            areaTaskList("Roblox Studio"),
          '</article>',
          '<article class="helper-card overseer-area-card academy">',
            '<div class="overseer-area-heading"><span class="overseer-area-icon">C</span><div><span class="helper-section-label">Learning operations</span><h3>Creator Academy Development</h3></div></div>',
            '<p>Organise curriculum, evidence and future public-site ideas from the same project view.</p>',
            focusChips(academyFocus),
            areaTaskList("Creator Academy"),
          '</article>',
        '</div>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Local workflow</span><h3>Task tracker</h3></div>',
          '<div class="helper-task-summary"><span>' + counts.active + ' active</span><span>' + counts.completed + ' completed</span><span>' + counts.blocked + ' blocked</span></div>',
        '</div>',
        '<article class="helper-card helper-work-card">',
          '<p>Change each task between active, completed and blocked. Saved on this browser only.</p>',
          '<div class="helper-task-list">' + taskRows() + '</div>',
        '</article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Honest readiness</span><h3>Launch readiness</h3></div>',
          '<p>No production status is claimed without evidence.</p>',
        '</div>',
        '<div class="helper-status-grid overseer-readiness-grid">',
          statusCard("pwa", "PWA status", launch.pwa),
          statusCard("deployment", "Deployment", launch.deployment),
          statusCard("stripe", "Stripe", launch.stripe),
          statusCard("backend", "Backend and auth", launch.backend),
          statusCard("seo", "SEO checklist", launch.seo),
        '</div>',

        '<div class="helper-work-grid">',
          '<article class="helper-card helper-work-card helper-notes-card">',
            '<h3>Local Overseer notes</h3>',
            '<p>Stored only in this browser. Do not put passwords, payment data or sensitive information here.</p>',
            '<textarea id="helperLocalNotes" class="helper-notes" maxlength="4000" placeholder="Capture the next Roblox Studio task, course decision, blocker or launch note...">' + escapeHtml(helperState.notes) + '</textarea>',
            '<div class="helper-notes-footer"><span id="helperNotesStatus">Local only · not secure</span><button type="button" class="helper-button" onclick="helperSaveNotes()">Save notes</button></div>',
          '</article>',
          '<article class="helper-card helper-work-card overseer-later-card">',
            '<h3>Production work for later</h3>',
            '<p>Only add these when the project genuinely moves beyond a local prototype.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">P</span><span>Stripe checkout, webhooks and entitlement revocation need a real backend.</span></li>',
              '<li><span class="helper-list-index">D</span><span>Deployment needs monitoring, recovery, headers and public copy review.</span></li>',
              '<li><span class="helper-list-index">A</span><span>Authentication and synced data are needed only if future users require accounts or cross-device access.</span></li>',
            '</ul>',
          '</article>',
        '</div>',
      '</section>'
    ].join("");
  }

  function captureIntakeFromDom(persist) {
    intakeFields.forEach(function (field) {
      var input = document.getElementById("overseer-intake-" + field.id);
      if (input) helperState.intake[field.id] = String(input.value || "").trim().slice(0, 1200);
    });
    if (persist) writeLocalJson(INTAKE_STORAGE_KEY, helperState.intake);
  }

  window.helperSaveIntake = function () {
    captureIntakeFromDom(true);
    renderDashboard();
    showHelperToast("Local project information saved. Prompt guidance updated.");
  };

  window.helperFocusIntake = function (fieldId) {
    var field = document.getElementById("overseer-intake-" + fieldId);
    if (!field) return;
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(function () { field.focus(); }, 260);
  };

  window.helperSetPromptMode = function (mode) {
    if (!promptModes[mode]) return;
    captureIntakeFromDom(false);
    helperState.promptMode = mode;
    renderDashboard();
    var prompt = document.getElementById("overseerGeneratedPrompt");
    if (prompt) prompt.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  window.helperCopyPrompt = async function () {
    captureIntakeFromDom(false);
    var prompt = buildPrompt();
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(prompt);
      } else {
        var field = document.getElementById("overseerGeneratedPrompt");
        if (!field || typeof field.select !== "function") throw new Error("Clipboard unavailable");
        field.select();
        if (!document.execCommand || !document.execCommand("copy")) throw new Error("Copy command unavailable");
      }
      showHelperToast("Prompt copied. Review it before pasting into ChatGPT.");
    } catch (error) {
      showHelperToast("Copy was unavailable. Select the prompt manually.");
    }
  };

  window.helperSetTaskStatus = function (taskId, status) {
    var exists = tasks.some(function (task) { return task.id === taskId; });
    if (!exists || VALID_TASK_STATES.indexOf(status) < 0) return;
    helperState.taskState[taskId] = status;
    writeLocalJson(TASK_STORAGE_KEY, helperState.taskState);
    renderDashboard();
    showHelperToast("Local task updated: " + status + ".");
  };

  window.helperSaveNotes = function () {
    var field = document.getElementById("helperLocalNotes");
    if (!field) return;
    helperState.notes = String(field.value || "").slice(0, 4000);
    writeLocalText(NOTES_STORAGE_KEY, helperState.notes);
    var status = document.getElementById("helperNotesStatus");
    if (status) status.textContent = "Saved on this device · not secure";
    showHelperToast("Local Overseer notes saved.");
  };

  window.helperFocusNotes = function () {
    helperState.currentView = "dashboard";
    if (!document.getElementById("helperLocalNotes")) renderDashboard();
    var field = document.getElementById("helperLocalNotes");
    if (field) {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(function () { field.focus(); }, 260);
    }
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

  // Older course layers use delayed startup repairs; retain Overseer as the final home surface.
  window.setTimeout(function () { window.showHome = renderDashboard; }, 700);
  window.setTimeout(function () { window.showHome = renderDashboard; if (helperState.currentView === "dashboard") renderDashboard(); }, 2800);
}());
