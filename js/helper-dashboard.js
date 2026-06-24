/*
  Overseer — private local founder command system.
  LocalStorage is limited to harmless task state and notes on this device.
  It is not secure storage and never grants paid, admin, owner, or account access.
*/
(function () {
  "use strict";

  var TASK_STORAGE_KEY = "creatorAcademyHelper.localTasks.v1";
  var NOTES_STORAGE_KEY = "creatorAcademyHelper.localNotes.v1";
  var INTAKE_STORAGE_KEY = "creatorAcademyHelper.localIntake.v1";
  var SOLO_STORAGE_KEY = "creatorAcademyHelper.soloMode.v1";
  var SKILL_STORAGE_KEY = "creatorAcademyHelper.soloSkills.v1";
  var UI_STORAGE_KEY = "creatorAcademyHelper.localUi.v1";
  var DECISIONS_STORAGE_KEY = "creatorAcademyHelper.localDecisions.v1";
  var VAULT_STORAGE_KEY = "creatorAcademyHelper.localVault.v1";
  var VALID_TASK_STATES = ["active", "completed", "blocked", "parked"];
  var SECTION_IDS = ["command", "blueprint", "cars", "life", "founder", "roadmap", "brain", "decisions", "vault"];
  var NAV_SECTIONS = [
    { id: "command", label: "Command Center" },
    { id: "blueprint", label: "Game Blueprint" },
    { id: "cars", label: "Car Systems" },
    { id: "life", label: "Life Systems" },
    { id: "founder", label: "Founder Systems" },
    { id: "roadmap", label: "Roadmap" },
    { id: "brain", label: "Overseer Brain" },
    { id: "decisions", label: "Decisions" },
    { id: "vault", label: "Vault" }
  ];

  var tasks = [
    { id: "roblox-core-loop", area: "Roblox Studio", title: "Define the first playable money loop", detail: "Choose one plot, one upgrade path and one clear cash-earning action.", priority: 1, slot: "core", tag: "Solo-safe", defaultStatus: "active" },
    { id: "lua-systems", area: "Roblox Studio", title: "Build the Lua basics practice list", detail: "Learn only the scripting needed for the current playable milestone.", priority: 2, slot: "support", tag: "Learning required", defaultStatus: "active" },
    { id: "studio-ui", area: "Roblox Studio", title: "Create readable button labels and feedback", detail: "Polish the minimum UI needed to understand the current loop.", priority: 3, slot: "polish", tag: "Prototype only", defaultStatus: "active" },
    { id: "tycoon-events", area: "Roblox Studio", title: "Outline Tycoon and event-system boundaries", detail: "Separate trusted server logic, client UI and safe event controls.", priority: 4, slot: "core", tag: "Learning required", defaultStatus: "parked" },
    { id: "academy-map", area: "Tracked project", title: "Record the Creator Academy Hub boundary", detail: "Keep it parked as a separate public product; Overseer stores status and planning notes only.", priority: 4, slot: "support", tag: "Parked", defaultStatus: "parked" },
    { id: "lesson-template", area: "Tracked project", title: "Record Creator Academy Hub status", detail: "Track its current state, next review date and owner decision without building product content here.", priority: 5, slot: "support", tag: "Parked", defaultStatus: "parked" },
    { id: "assessment-plan", area: "Tracked project", title: "Capture Creator Academy Hub risks", detail: "Keep risks and unresolved decisions as private project notes.", priority: 6, slot: "support", tag: "Parked", defaultStatus: "parked" },
    { id: "portfolio-public-notes", area: "Tracked project", title: "Park Creator Academy Hub future ideas", detail: "Store future ideas without turning them into active Overseer features.", priority: 7, slot: "polish", tag: "Parked", defaultStatus: "parked" },
    { id: "pwa-review", area: "Launch readiness", title: "Review PWA readiness", detail: "Document manifest, install and offline work without claiming readiness.", priority: 8, slot: "polish", tag: "Parked", defaultStatus: "parked" },
    { id: "seo-review", area: "Launch readiness", title: "Review the SEO checklist", detail: "Check metadata, indexing files and future public-page wording.", priority: 9, slot: "polish", tag: "Parked", defaultStatus: "parked" },
    { id: "custom-vehicle-pack", area: "Future studio", title: "Commission a high-end custom vehicle pack", detail: "Keep this out of the current sprint until budget and licensing are clear.", priority: 10, slot: "polish", tag: "Outsource later", defaultStatus: "parked" },
    { id: "huge-city-map", area: "Future studio", title: "Build a huge city with dozens of custom vehicles", detail: "This scope requires a later team/studio phase and strong optimisation evidence.", priority: 11, slot: "core", tag: "Team-stage", defaultStatus: "parked" },
    { id: "decorative-command-room", area: "Future studio", title: "Build decorative command-room features before gameplay", detail: "This does not support the first playable loop.", priority: 12, slot: "polish", tag: "Cut", defaultStatus: "parked" }
  ];

  var academyFocus = [
    "Project status",
    "Roadmap",
    "Tasks",
    "Decisions",
    "Risks",
    "Private notes",
    "Future ideas"
  ];

  var intakeFields = [
    { id: "currentBuild", label: "Current Roblox Studio build", question: "What are you building in Roblox Studio right now?", placeholder: "Example: a tycoon upgrade system, UI flow, event system or Lua practice project" },
    { id: "biggestBlocker", label: "Biggest blocker", question: "What is slowing the project down most?", placeholder: "Describe the bug, missing decision, skill gap or unclear requirement" },
    { id: "courseFocus", label: "Creator Academy Hub tracking note", question: "What status, risk, decision or future idea should Overseer record for this separate project?", placeholder: "Example: parked, next review date, unresolved boundary, project risk or future idea" },
    { id: "requestedHelp", label: "ChatGPT help needed", question: "What do you want ChatGPT to help with?", placeholder: "Example: explain code, debug a script, review a project decision or write a checklist" },
    { id: "targetOutcome", label: "Target outcome", question: "What should a useful answer or finished task produce?", placeholder: "Example: working Lua code, a decision record or a focused execution checklist" },
    { id: "constraints", label: "Constraints and context", question: "What constraints, tools or details must the answer respect?", placeholder: "Example: beginner-friendly, Roblox server-authoritative, local-only, no paid services" }
  ];

  var promptModes = {
    project: { label: "Project adviser", instruction: "Act as a pragmatic private project-operations adviser. Give one prioritised next step, then a short execution plan." },
    lua: { label: "Lua debugger", instruction: "Act as a Roblox Lua debugging partner. Explain the likely cause, show a minimal safe fix, and include checks to prove it works." },
    decision: { label: "Decision reviewer", instruction: "Act as a strict project decision reviewer. Clarify the decision, evidence, risks, reversibility and single next action." },
    launch: { label: "Launch reviewer", instruction: "Act as a cautious launch reviewer. Separate confirmed facts from assumptions and list only the highest-impact blockers and next actions." }
  };

  var soloPhases = [
    { id: 1, name: "Foundation", items: ["Lua basics", "Roblox Studio workflow", "Clean file organisation", "Simple tycoon button system", "Basic money loop", "Save backups"] },
    { id: 2, name: "First Playable Loop", items: ["One plot", "One house upgrade path", "One garage", "One car", "Basic drive system", "Basic paint/wheel customisation", "Simple cash earning", "Basic save/load if ready"] },
    { id: 3, name: "Premium Vehicle Feel", items: ["Enter vehicle prompt", "Character align to door", "Door open animation", "Sit animation placeholder", "Startup sound", "Idle and driving loops", "No overlapping audio", "Basic dashboard light effect"] },
    { id: 4, name: "Status / Flex Layer", items: ["Garage display", "Car rarity labels", "Custom plates", "Photo spot", "Simple car meet plaza", "Player garage viewing"] },
    { id: 5, name: "Tycoon Expansion", items: ["More house upgrades", "Business upgrades", "Dealership", "Tuning shop", "Private bank", "Prestige logic"] },
    { id: 6, name: "Polish and Launch Prep", items: ["UI cleanup", "Performance optimisation", "Bug testing", "Monetisation review", "Icon/thumbnail/trailer", "Private test", "Soft launch"] },
    { id: 7, name: "Live Updates", items: ["New cars", "New events", "Seasonal content", "New customisation", "Balance patches", "Analytics review", "Player feedback loop"] }
  ];

  var soloFeatures = [
    { name: "Basic money loop", value: 10, difficulty: 3, dependency: 1, maintenance: 2, core: 10 },
    { name: "One clean car startup and idle audio system", value: 9, difficulty: 4, dependency: 1, maintenance: 2, core: 7 },
    { name: "Simple enter-car animation with one door and seat", value: 8, difficulty: 6, dependency: 2, maintenance: 2, core: 6 },
    { name: "Full body-kit system across many cars", value: 7, difficulty: 9, dependency: 6, maintenance: 8, core: 4, defer: true },
    { name: "Huge city map with dozens of custom vehicles", value: 8, difficulty: 10, dependency: 10, maintenance: 10, core: 5 },
    { name: "High-end custom vehicle models or licensed audio pack", value: 7, difficulty: 9, dependency: 8, maintenance: 4, core: 5, outsource: true },
    { name: "Decorative command room before the game loop works", value: 2, difficulty: 5, dependency: 2, maintenance: 4, core: 1 }
  ];

  var soloSkills = [
    { id: "lua", name: "Lua scripting", evidence: "Can explain basic variables, events and server/client boundaries.", exercise: "Build one tycoon purchase button with server validation.", feature: "Basic money loop", blocked: "Advanced game systems and secure purchases" },
    { id: "studio", name: "Roblox Studio building", evidence: "Project workflow still needs regular hands-on practice.", exercise: "Create one organised plot with named folders and backups.", feature: "One-plot playable loop", blocked: "Large map production" },
    { id: "vehicles", name: "Vehicle systems", evidence: "Understands the desired premium vehicle sequence.", exercise: "Make one vehicle drive reliably before adding entry polish.", feature: "First working car", blocked: "Advanced handling and vehicle fleets" },
    { id: "ui", name: "UI / UX", evidence: "Can identify the need for clear states and feedback.", exercise: "Build one purchase button with hover, disabled and success states.", feature: "Tycoon and garage UI", blocked: "Large dashboard systems" },
    { id: "animation", name: "Animation / Moon Animator", evidence: "Premium entry animation is planned but not proven.", exercise: "Prototype one door-open animation and a placeholder sit transition.", feature: "Vehicle entry sequence", blocked: "Multi-car animation library" },
    { id: "blender", name: "Blender modelling", evidence: "Custom vehicle and asset ambitions are documented.", exercise: "Optimise and import one simple prop with correct scale.", feature: "Custom garage assets", blocked: "High-end vehicle models" },
    { id: "audio", name: "Audio design / licensing", evidence: "Understands the no-overlap state-system concept.", exercise: "Play one startup sound, then begin one idle loop when it ends.", feature: "Premium car startup sequence", blocked: "RPM blending and licensed audio packs" },
    { id: "economy", name: "Game economy", evidence: "A money and upgrade loop is part of the foundation plan.", exercise: "Balance five upgrades using a simple cost/reward table.", feature: "Basic tycoon loop", blocked: "Prestige and private-bank systems" },
    { id: "release", name: "Release planning", evidence: "Future review is planned; no production claim is made.", exercise: "Define private-test entry and exit checks after the loop works.", feature: "Launch review", blocked: "Public release claims" },
    { id: "marketing", name: "Marketing / devlogs", evidence: "Public site and launch content remain future work.", exercise: "Capture one honest weekly build update with a screenshot.", feature: "Devlog cadence", blocked: "Launch campaign" },
    { id: "optimisation", name: "Optimisation", evidence: "Ordinary-hardware performance is a permanent rule.", exercise: "Profile one scene and remove one measurable bottleneck.", feature: "Stable playable build", blocked: "Large city and content density" },
    { id: "versioning", name: "Version control / backups", evidence: "GitHub publishing and local backups are active practices.", exercise: "Create a verified backup before the next structural edit.", feature: "Safe solo workflow", blocked: "Risky large refactors" }
  ];

  var operatingRules = [
    "One playable system beats ten imaginary systems.",
    "Cars are checkpoints, not the ceiling.",
    "Build from skill → product → cashflow → assets → trophies → empire.",
    "No real car brands, logos or audio unless legally licensed.",
    "Local-only app for now.",
    "Overseer stays private and local; public product systems belong in separate projects.",
    "Back up the main project before major edits.",
    "Build for performance on ordinary hardware first.",
    "Every big feature must have a minimum viable version.",
    "Overseer exists to reduce chaos, not store chaos neatly."
  ];

  var hardTruths = [
    "You are solo. Build the core loop before the empire.",
    "This idea is valid, but not for this phase.",
    "One polished car beats ten broken cars.",
    "A realistic startup sequence is valuable only after the car can actually drive.",
    "Do not build luxury polish on top of a weak money loop.",
    "No team means no excuses, but also no uncontrolled scope.",
    "The dream is allowed. The current sprint must be small.",
    "If it does not help the first playable loop, park it.",
    "Stop designing the 10-year version before the 10-minute version works."
  ];

  var helperState = {
    currentView: "dashboard",
    activeSection: normaliseSection(readLocalText(UI_STORAGE_KEY)),
    taskState: normaliseTaskState(readLocalJson(TASK_STORAGE_KEY, {})),
    notes: readLocalText(NOTES_STORAGE_KEY),
    decisions: readLocalText(DECISIONS_STORAGE_KEY),
    vault: readLocalText(VAULT_STORAGE_KEY),
    intake: normaliseIntake(readLocalJson(INTAKE_STORAGE_KEY, {})),
    promptMode: "project",
    solo: normaliseSoloState(readLocalJson(SOLO_STORAGE_KEY, {})),
    skills: normaliseSkillState(readLocalJson(SKILL_STORAGE_KEY, {}))
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
      clean[task.id] = VALID_TASK_STATES.indexOf(value) >= 0 ? value : task.defaultStatus;
    });
    return clean;
  }

  function normaliseSection(value) {
    return SECTION_IDS.indexOf(value) >= 0 ? value : "command";
  }

  function normaliseIntake(stored) {
    var clean = {};
    intakeFields.forEach(function (field) {
      clean[field.id] = String(stored && stored[field.id] || "").trim().slice(0, 1200);
    });
    return clean;
  }

  function normaliseSoloState(stored) {
    var phase = Number(stored && stored.phase);
    if (!Number.isInteger(phase) || phase < 1 || phase > soloPhases.length) phase = 1;
    return {
      phase: phase,
      activeSystem: String(stored && stored.activeSystem || "First playable money loop").trim().slice(0, 200),
      learningBlocker: String(stored && stored.learningBlocker || "Lua scripting fundamentals").trim().slice(0, 200),
      masonActive: Boolean(stored && stored.masonActive)
    };
  }

  function normaliseSkillState(stored) {
    var validLevels = ["Not assessed", "Beginner", "Learning", "Working", "Confident"];
    var clean = {};
    soloSkills.forEach(function (skill) {
      clean[skill.id] = validLevels.indexOf(stored && stored[skill.id]) >= 0 ? stored[skill.id] : "Not assessed";
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
        '<span class="brand-mark" aria-hidden="true">OV</span>',
        '<div><h1>Overseer</h1><p>Private · local founder command system</p></div>'
      ].join("");
    }
    renderNavigation();
  }

  function renderNavigation() {
    var nav = document.querySelector(".topbar .nav-actions");
    if (!nav) return;
    nav.classList.add("overseer-nav");
    nav.setAttribute("aria-label", "Overseer sections");
    nav.innerHTML = NAV_SECTIONS.map(function (section) {
      var active = helperState.activeSection === section.id;
      return '<button type="button" class="helper-nav-button ' + (active ? "active" : "") + '" data-section="' + section.id + '" aria-controls="overseerSectionContent" aria-pressed="' + (active ? "true" : "false") + '"' + (active ? ' aria-current="page"' : "") + '>' + section.label + '</button>';
    }).join("");
    Array.prototype.forEach.call(nav.querySelectorAll("button[data-section]"), function (button) {
      button.addEventListener("click", function () {
        setActiveSection(button.getAttribute("data-section"));
      });
    });
  }

  function taskStatus(taskId) {
    return VALID_TASK_STATES.indexOf(helperState.taskState[taskId]) >= 0 ? helperState.taskState[taskId] : "active";
  }

  function taskCounts() {
    var counts = { active: 0, completed: 0, blocked: 0, parked: 0 };
    tasks.forEach(function (task) { counts[taskStatus(task.id)] += 1; });
    return counts;
  }

  function activeSlotCounts() {
    var slots = { core: 0, support: 0, polish: 0 };
    tasks.forEach(function (task) {
      if (taskStatus(task.id) === "active" && slots[task.slot] !== undefined) slots[task.slot] += 1;
    });
    return slots;
  }

  function overloadState() {
    var slots = activeSlotCounts();
    var overloaded = slots.core > 1 || slots.support > 1 || slots.polish > 1;
    return {
      overloaded: overloaded,
      slots: slots,
      message: overloaded
        ? "Feature overload detected. You are acting like a 10-person studio. Pick one system and finish it."
        : "Feature load controlled: one core, one support and one polish slot maximum."
    };
  }

  function nextThreeActions() {
    return tasks
      .filter(function (task) { return taskStatus(task.id) === "active"; })
      .sort(function (a, b) { return a.priority - b.priority; })
      .slice(0, 3);
  }

  function soloBuildScore(feature) {
    return feature.value - feature.difficulty - feature.dependency - feature.maintenance;
  }

  function featureRecommendation(feature) {
    var score = soloBuildScore(feature);
    if (feature.core <= 2) return "Cut for now";
    if (feature.outsource) return "Outsource later";
    if (feature.dependency >= 9) return "Needs team later";
    if (feature.defer) return "Save for later";
    if (score >= 4) return "Build alone now";
    if (score >= 1) return "Prototype alone";
    if (score >= -3) return "Learn first";
    if (score >= -8) return "Save for later";
    return "Needs team later";
  }

  function localReadinessScore() {
    var counts = taskCounts();
    var completedRatio = counts.completed / tasks.length;
    var score = 15 + Math.round(completedRatio * 45);
    if (document.querySelector("link[rel='manifest']")) score += 10;
    if (document.querySelector("meta[name='description']")) score += 5;
    if (document.querySelector("link[rel='canonical']")) score += 5;
    return Math.min(score, 75);
  }

  function burnoutRisk() {
    var counts = taskCounts();
    var overload = overloadState();
    if (overload.overloaded || counts.active > 3) return { label: "High", tone: "bad", detail: "Reduce active scope before adding work." };
    if (counts.blocked > 2) return { label: "Watch", tone: "warn", detail: "Resolve or park blockers before expanding." };
    return { label: "Controlled", tone: "good", detail: "Current active limits support steady solo execution." };
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
    var task = nextAction();
    task.kind = "task";
    task.missingQuestion = missing;
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
      "System context:",
      "- Overseer is Freddie Murray's private local founder command system. It organises projects; it is not any tracked product.",
      "- Active tracked project: Luxury Life Tycoon, a Roblox game project.",
      "- Parked tracked project: Creator Academy Hub, a separate future public/student product. Treat it only as status, roadmap, task, decision, risk, note or future-idea metadata.",
      "- Team status: Mason Harris has left for now and must not be treated as an active dependency or task assignee.",
      "- Solo phase: Phase " + helperState.solo.phase + " — " + soloPhases[helperState.solo.phase - 1].name,
      "- Active solo system: " + promptValue(helperState.solo.activeSystem, "Not provided yet"),
      "- Current learning blocker: " + promptValue(helperState.solo.learningBlocker, "Not provided yet"),
      "- Current Roblox Studio build: " + promptValue(helperState.intake.currentBuild, "Not provided yet"),
      "- Biggest blocker: " + promptValue(helperState.intake.biggestBlocker, "Not provided yet"),
      "- Creator Academy Hub tracking note: " + promptValue(helperState.intake.courseFocus, "Not provided yet"),
      "- Help requested: " + promptValue(helperState.intake.requestedHelp, "Not provided yet"),
      "- Target outcome: " + promptValue(helperState.intake.targetOutcome, "Not provided yet"),
      "- Constraints and context: " + promptValue(helperState.intake.constraints, "Not provided yet"),
      "",
      "Response rules:",
      "- Be direct, practical and specific.",
      "- Ask up to three focused questions if critical information is missing.",
      "- Do not invent completed work, production readiness, secure accounts or paid access.",
      "- Do not generate Creator Academy lessons, curriculum, public pages, pricing, accounts, payment flows or student dashboards for Overseer.",
      "- Keep Overseer, Creator Academy Hub and Luxury Life Tycoon as three clearly separate systems.",
      "- Keep Roblox trust-sensitive logic server-authoritative.",
      "- Apply Solo Founder limits: one core system, one support system and one polish task active at most.",
      "- Flag ideas that should be parked, outsourced or delayed until team stage.",
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
      separation: { label: "Protected", detail: "Public products remain separate from this private local command system.", tone: "good" },
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
          '<div><span class="helper-task-area">' + escapeHtml(task.area) + '</span><span class="solo-task-tag">' + escapeHtml(task.tag) + '</span><strong>' + escapeHtml(task.title) + '</strong><small>' + escapeHtml(task.detail) + '</small></div>',
          '<select class="helper-task-state" aria-label="Status for ' + escapeHtml(task.title) + '" onchange="helperSetTaskStatus(\'' + task.id + '\', this.value)">',
            '<option value="active"' + (status === "active" ? " selected" : "") + '>Active</option>',
            '<option value="completed"' + (status === "completed" ? " selected" : "") + '>Completed</option>',
            '<option value="blocked"' + (status === "blocked" ? " selected" : "") + '>Blocked</option>',
            '<option value="parked"' + (status === "parked" ? " selected" : "") + '>Parked</option>',
          '</select>',
        '</article>'
      ].join("");
    }).join("");
  }

  function soloNextActionsHtml() {
    var actions = nextThreeActions();
    if (!actions.length) return '<p class="solo-empty">No active solo tasks. Unpark one focused task before adding new scope.</p>';
    return '<ol class="solo-next-list">' + actions.map(function (task) {
      return '<li><span>' + escapeHtml(task.slot) + '</span><strong>' + escapeHtml(task.title) + '</strong></li>';
    }).join("") + '</ol>';
  }

  function phaseOptions() {
    return soloPhases.map(function (phase) {
      return '<option value="' + phase.id + '"' + (helperState.solo.phase === phase.id ? " selected" : "") + '>Phase ' + phase.id + ': ' + escapeHtml(phase.name) + '</option>';
    }).join("");
  }

  function soloRoadmapHtml() {
    return soloPhases.map(function (phase) {
      var state = phase.id < helperState.solo.phase ? "complete" : (phase.id === helperState.solo.phase ? "current" : "future");
      return [
        '<details class="solo-phase ' + state + '"' + (phase.id === helperState.solo.phase ? " open" : "") + '>',
          '<summary><span class="solo-phase-number">' + phase.id + '</span><div><strong>' + escapeHtml(phase.name) + '</strong><small>' + (state === "current" ? "Current solo phase" : state === "complete" ? "Earlier phase" : "Future phase") + '</small></div><span class="solo-phase-count">' + phase.items.length + ' steps</span></summary>',
          '<ul>' + phase.items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>',
        '</details>'
      ].join("");
    }).join("");
  }

  function featureScoreRows() {
    return soloFeatures.map(function (feature) {
      var score = soloBuildScore(feature);
      var recommendation = featureRecommendation(feature);
      var tone = recommendation === "Build alone now" ? "good" : (recommendation === "Prototype alone" || recommendation === "Learn first" ? "warn" : "bad");
      return [
        '<article class="solo-feature-row" data-tone="' + tone + '">',
          '<div><strong>' + escapeHtml(feature.name) + '</strong><small>Value ' + feature.value + ' − difficulty ' + feature.difficulty + ' − dependency ' + feature.dependency + ' − maintenance ' + feature.maintenance + '</small></div>',
          '<span class="solo-score">' + score + '</span>',
          '<span class="solo-recommendation">' + escapeHtml(recommendation) + '</span>',
        '</article>'
      ].join("");
    }).join("");
  }

  function skillRows() {
    var levels = ["Not assessed", "Beginner", "Learning", "Working", "Confident"];
    return soloSkills.map(function (skill) {
      var current = helperState.skills[skill.id];
      return [
        '<details class="solo-skill-row">',
          '<summary><div><strong>' + escapeHtml(skill.name) + '</strong><small>' + escapeHtml(skill.feature) + '</small></div>',
            '<select aria-label="Current level for ' + escapeHtml(skill.name) + '" onchange="event.stopPropagation(); helperSetSkillLevel(\'' + skill.id + '\', this.value)">',
              levels.map(function (level) { return '<option value="' + level + '"' + (current === level ? " selected" : "") + '>' + level + '</option>'; }).join(""),
            '</select>',
          '</summary>',
          '<dl><div><dt>Evidence</dt><dd>' + escapeHtml(skill.evidence) + '</dd></div><div><dt>Next exercise</dt><dd>' + escapeHtml(skill.exercise) + '</dd></div><div><dt>Related feature</dt><dd>' + escapeHtml(skill.feature) + '</dd></div><div><dt>Blocked features</dt><dd>' + escapeHtml(skill.blocked) + '</dd></div></dl>',
        '</details>'
      ].join("");
    }).join("");
  }

  function operatingRulesHtml() {
    return '<ol class="solo-rules-list">' + operatingRules.map(function (rule) {
      return '<li>' + escapeHtml(rule) + '</li>';
    }).join("") + '</ol>';
  }

  function renderLegacyDashboard() {
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var next = overseerNextAction();
    var counts = taskCounts();
    var intake = intakeProgress();
    var launch = launchStatuses();
    var overload = overloadState();
    var risk = burnoutRisk();
    var currentPhase = soloPhases[helperState.solo.phase - 1];
    var parkedTasks = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 4);
    var neededSkills = soloSkills.filter(function (skill) {
      return helperState.skills[skill.id] !== "Working" && helperState.skills[skill.id] !== "Confident";
    }).slice(0, 3);
    var localLabel = isLocalHost() ? "Local prototype" : "Hosted copy of local prototype";

    app.innerHTML = [
      '<section class="helper-dashboard helper-enter" aria-label="Overseer dashboard">',
        '<header class="helper-welcome overseer-heading">',
          '<div>',
            '<span class="helper-section-label">Overseer</span>',
            '<h2>Overseer Overview</h2>',
            '<p>Private local command system for project control, Roblox Studio work and founder execution.</p>',
          '</div>',
          '<span class="helper-session-pill">' + escapeHtml(localLabel) + ' · this device only</span>',
        '</header>',

        '<div class="overseer-command-strip">',
          '<span class="overseer-live"><i></i> Mode: Solo Founder</span>',
          '<span>Phase <strong>' + helperState.solo.phase + ' · ' + escapeHtml(currentPhase.name) + '</strong></span>',
          '<span>Information profile <strong>' + intake.percent + '%</strong></span>',
          '<span>Tasks <strong>' + counts.active + ' active</strong></span>',
          '<span>Readiness <strong>' + localReadinessScore() + '% local estimate</strong></span>',
          '<span>Sync <strong>off</strong></span>',
          '<span>Storage <strong>local only</strong></span>',
        '</div>',

        '<div class="overseer-overview-grid">',
          '<article class="helper-card overseer-lead-card">',
            '<div class="overseer-mark">OV</div>',
            '<div><span class="helper-section-label">What Overseer does</span><h3>One place to control separate projects.</h3><p>Overseer tracks project status, tasks, decisions, risks and notes. It does not become the products it tracks.</p></div>',
          '</article>',
          '<article class="helper-card overseer-mission-card">',
            '<span class="helper-section-label">Current mission</span>',
            '<h3>Build the next useful piece without expanding scope too early.</h3>',
            '<p>Keep Luxury Life Tycoon active while Creator Academy Hub remains a separate parked planning reference.</p>',
          '</article>',
          '<article class="helper-card overseer-members-card">',
            '<span class="helper-section-label">Operating structure</span>',
            '<div class="overseer-member"><span class="overseer-avatar">FM</span><div><strong>Freddie Murray</strong><small>Solo Founder · Project Lead · Main Developer · Final Approver</small></div><span class="member-status active">Active</span></div>',
            '<div class="overseer-member ' + (helperState.solo.masonActive ? "" : "inactive") + '"><span class="overseer-avatar mason">MH</span><div><strong>Mason Harris</strong><small>Previous role: Junior Developer / Developer-in-Training · Left project for now</small></div><span class="member-status ' + (helperState.solo.masonActive ? "active" : "inactive") + '">' + (helperState.solo.masonActive ? "Manually reactivated" : "Inactive / Left Project") + '</span><button type="button" class="member-action" onclick="helperToggleMason()">' + (helperState.solo.masonActive ? "Return to inactive" : "Reactivate later") + '</button></div>',
            '<p>Freddie is the only active project dependency. Mason remains in historical context; even if manually reactivated, current recommendations stay solo-safe until Freddie explicitly assigns work.</p>',
          '</article>',
          '<article class="helper-card overseer-project-card">',
            '<span class="helper-section-label">Project status</span>',
            '<div class="overseer-project-status"><strong>Solo execution</strong><span>Founder-led</span></div>',
            '<dl><div><dt>Active</dt><dd>' + counts.active + '</dd></div><div><dt>Completed</dt><dd>' + counts.completed + '</dd></div><div><dt>Parked</dt><dd>' + counts.parked + '</dd></div></dl>',
            '<p>Task status and notes are browser-only preferences, not secure project records.</p>',
          '</article>',
        '</div>',

        '<section class="solo-founder-command" aria-label="Solo Founder command center">',
          '<div class="solo-founder-header">',
            '<div><span class="solo-mode-chip">Mode: Solo Founder</span><h3>Solo Founder Command Center</h3><p>High ambition, practical sequencing, and no roadmap dependency on unavailable team members.</p></div>',
            '<div class="solo-risk" data-tone="' + risk.tone + '"><span>Overload risk</span><strong>' + escapeHtml(risk.label) + '</strong><small>' + escapeHtml(risk.detail) + '</small></div>',
          '</div>',
          '<div class="solo-founder-grid">',
            '<article class="solo-command-card"><span>Current solo workload</span><strong>' + counts.active + ' active features</strong><small>' + overload.slots.core + ' core · ' + overload.slots.support + ' support · ' + overload.slots.polish + ' polish</small></article>',
            '<article class="solo-command-card"><span>Active build focus</span><input id="soloActiveSystem" maxlength="200" value="' + escapeHtml(helperState.solo.activeSystem) + '" aria-label="Active build focus"></article>',
            '<article class="solo-command-card"><span>Maximum recommended</span><strong>3 active features</strong><small>1 core · 1 support · 1 polish</small></article>',
            '<article class="solo-command-card"><span>Current learning blocker</span><input id="soloLearningBlocker" maxlength="200" value="' + escapeHtml(helperState.solo.learningBlocker) + '" aria-label="Current learning blocker"></article>',
          '</div>',
          '<div class="solo-focus-grid">',
            '<article><span class="helper-section-label">Solo build phase</span><select id="soloPhaseSelect" onchange="helperSetSoloPhase(this.value)">' + phaseOptions() + '</select><p>Current: <strong>Phase ' + currentPhase.id + ' · ' + escapeHtml(currentPhase.name) + '</strong></p></article>',
            '<article><span class="helper-section-label">Next three solo actions</span>' + soloNextActionsHtml() + '</article>',
            '<article><span class="helper-section-label">Postpone until later</span><ul>' + parkedTasks.map(function (task) { return '<li>' + escapeHtml(task.title) + '</li>'; }).join("") + '</ul></article>',
            '<article><span class="helper-section-label">Skills before next phase</span><ul>' + neededSkills.map(function (skill) { return '<li><strong>' + escapeHtml(skill.name) + '</strong> · ' + escapeHtml(skill.exercise) + '</li>'; }).join("") + '</ul></article>',
          '</div>',
          '<div class="solo-save-row"><span>Outsource later: high-end custom vehicle models or a properly licensed audio pack.</span><button type="button" class="helper-button primary" onclick="helperSaveSoloState()">Save solo focus</button></div>',
          '<div class="solo-overload-warning ' + (overload.overloaded ? "danger" : "controlled") + '"><strong>' + escapeHtml(overload.message) + '</strong><span>' + escapeHtml(overload.overloaded ? hardTruths[0] : hardTruths[6]) + '</span></div>',
        '</section>',

        '<article class="helper-card helper-next-card">',
          '<div class="helper-priority">' + (next.kind === "intake" ? "INFO" : (next.id ? "HIGH" : "NEXT")) + '</div>',
          '<div><span class="helper-section-label">What should Freddie build next?</span><h3>' + escapeHtml(next.title) + '</h3><p><strong>' + escapeHtml(next.area) + ':</strong> ' + escapeHtml(next.detail) + '</p>' + (next.missingQuestion ? '<small class="solo-overseer-question">Overseer also needs: ' + escapeHtml(next.missingQuestion.question) + '</small>' : '') + '</div>',
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
            '<p>Track practical building, scripting and production work for Luxury Life Tycoon.</p>',
            focusChips(robloxFocus),
            areaTaskList("Roblox Studio"),
          '</article>',
          '<article class="helper-card overseer-area-card academy">',
            '<div class="overseer-area-heading"><span class="overseer-area-icon">C</span><div><span class="helper-section-label">Tracked project</span><h3>Creator Academy Hub</h3></div></div>',
            '<p>Parked · local-only planning reference. Status, roadmap, tasks, decisions, risks, notes and future ideas only.</p>',
            focusChips(academyFocus),
            areaTaskList("Tracked project"),
          '</article>',
        '</div>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Overseer Brain</span><h3>Solo Build Score</h3></div>',
          '<p>Score = value − difficulty − dependency − maintenance risk.</p>',
        '</div>',
        '<article class="helper-card solo-feature-card">',
          '<div class="solo-feature-head"><span>Feature</span><span>Score</span><span>Recommendation</span></div>',
          '<div class="solo-feature-list">' + featureScoreRows() + '</div>',
          '<div class="solo-brain-questions"><strong>Overseer checks:</strong><span>Can Freddie build it alone?</span><span>Does it help the core loop?</span><span>What skill blocks it?</span><span>Is it a launch distraction?</span><span>What is the smallest useful version?</span></div>',
        '</article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Practical sequencing</span><h3>Seven-phase solo roadmap</h3></div>',
          '<p>The 10-year ambition stays visible; only the current phase drives execution.</p>',
        '</div>',
        '<div class="solo-roadmap">' + soloRoadmapHtml() + '</div>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Capability building</span><h3>Solo skill tracker</h3></div>',
          '<p>Track evidence and the next practical exercise—not confidence alone.</p>',
        '</div>',
        '<article class="helper-card solo-skills-card"><div class="solo-skills-grid">' + skillRows() + '</div></article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Local workflow</span><h3>Task tracker</h3></div>',
          '<div class="helper-task-summary"><span>' + counts.active + ' active</span><span>' + counts.completed + ' completed</span><span>' + counts.blocked + ' blocked</span><span>' + counts.parked + ' parked</span></div>',
        '</div>',
        '<article class="helper-card helper-work-card">',
          '<p>Change each task between active, completed, blocked and parked. Saved on this browser only.</p>',
          '<div class="solo-tag-legend"><span>Solo-safe</span><span>Learning required</span><span>Prototype only</span><span>Production-ready</span><span>Outsource later</span><span>Team-stage</span><span>Parked</span><span>Cut</span></div>',
          '<div class="helper-task-list">' + taskRows() + '</div>',
        '</article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Honest readiness</span><h3>Launch readiness</h3></div>',
          '<p>No production status is claimed without evidence.</p>',
        '</div>',
        '<div class="helper-status-grid overseer-readiness-grid">',
          statusCard("pwa", "PWA status", launch.pwa),
          statusCard("deployment", "Deployment", launch.deployment),
          statusCard("separation", "Project separation", launch.separation),
          statusCard("backend", "Backend and auth", launch.backend),
          statusCard("seo", "SEO checklist", launch.seo),
        '</div>',

        '<details class="helper-card solo-rules-card">',
          '<summary><div><span class="helper-section-label">Permanent principles</span><h3>Solo operating rules</h3></div><span>10 rules</span></summary>',
          operatingRulesHtml(),
        '</details>',

        '<div class="helper-work-grid">',
          '<article class="helper-card helper-work-card helper-notes-card">',
            '<h3>Local Overseer notes</h3>',
            '<p>Stored only in this browser. Do not put secrets or sensitive information here.</p>',
            '<textarea id="helperLocalNotes" class="helper-notes" maxlength="4000" placeholder="Capture the next Roblox Studio task, project decision, blocker or launch note...">' + escapeHtml(helperState.notes) + '</textarea>',
            '<div class="helper-notes-footer"><span id="helperNotesStatus">Local only · not secure</span><button type="button" class="helper-button" onclick="helperSaveNotes()">Save notes</button></div>',
          '</article>',
          '<article class="helper-card helper-work-card overseer-later-card">',
            '<h3>Production work for later</h3>',
            '<p>Only add these when the project genuinely moves beyond a local prototype.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">S</span><span>Creator Academy Hub public-product work stays outside Overseer.</span></li>',
              '<li><span class="helper-list-index">D</span><span>Deployment needs monitoring, recovery, headers and public copy review.</span></li>',
              '<li><span class="helper-list-index">A</span><span>Any future public-product infrastructure must be designed in its own project.</span></li>',
            '</ul>',
          '</article>',
        '</div>',
      '</section>'
    ].join("");
  }

  function compactList(items) {
    return '<ul class="command-compact-list">' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>';
  }

  function founderTopHtml(next, counts, overload, risk, currentPhase) {
    var ignored = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; })[0];
    return [
      '<section class="founder-identity-bar">',
        '<div class="founder-identity-main"><span class="founder-monogram">FM</span><div><strong>Freddie Murray</strong><small>Solo Founder · Project Lead · Developer</small></div></div>',
        '<div class="founder-authority"><span>Founder Access</span><strong>Final Approver</strong></div>',
        '<div class="founder-system-id"><span>Overseer Command System</span><strong>Private · Local</strong></div>',
        '<span class="solo-mode-chip">Mode: Solo Founder</span>',
      '</section>',
      '<section class="overseer-premium-hero">',
        '<div class="overseer-hero-copy">',
          '<span class="overseer-eyebrow">OVERSEER / COMMAND SYSTEM</span>',
          '<h2>Build the machine.<br>Control the scope.<br>Execute the next system.</h2>',
          '<p>Private command system for Freddie Murray. Ambition stays visible; current execution stays disciplined.</p>',
          '<div class="overseer-directive"><span>Current Directive</span><strong>One finished system beats ten legendary plans.</strong></div>',
        '</div>',
        '<article class="overseer-mission-console">',
          '<div class="mission-console-head"><span>Current Mission</span><i></i></div>',
          '<h3>' + escapeHtml(helperState.solo.activeSystem || "First playable money loop") + '</h3>',
          '<dl>',
            '<div><dt>Active project</dt><dd>Luxury Life Tycoon</dd></div>',
            '<div><dt>Phase</dt><dd>' + currentPhase.id + ' · ' + escapeHtml(currentPhase.name) + '</dd></div>',
            '<div><dt>Current objective</dt><dd>' + escapeHtml(next.title) + '</dd></div>',
            '<div><dt>Next concrete action</dt><dd>' + escapeHtml(next.detail) + '</dd></div>',
            '<div><dt>Current bottleneck</dt><dd>' + escapeHtml(helperState.solo.learningBlocker) + '</dd></div>',
          '</dl>',
        '</article>',
      '</section>',
      '<div class="empire-status-row">',
        '<span><small>Mode</small><strong>Solo Founder</strong></span>',
        '<span><small>Phase</small><strong>' + escapeHtml(currentPhase.name) + '</strong></span>',
        '<span><small>Focus</small><strong>' + escapeHtml(helperState.solo.activeSystem) + '</strong></span>',
        '<span data-tone="' + (overload.overloaded ? "bad" : "good") + '"><small>Feature load</small><strong>' + (overload.overloaded ? "Overloaded" : "Controlled") + '</strong></span>',
        '<span data-tone="' + risk.tone + '"><small>Risk</small><strong>' + escapeHtml(risk.label) + '</strong></span>',
        '<span><small>Next skill</small><strong>' + escapeHtml(helperState.solo.learningBlocker) + '</strong></span>',
        '<span><small>Empire trajectory</small><strong>No Ceiling</strong></span>',
      '</div>',
      '<section class="project-separation-row" aria-label="Project boundaries">',
        '<article data-state="system"><small>Command system</small><strong>Overseer</strong><span>Private · local · controls projects</span></article>',
        '<article data-state="active"><small>Active tracked project</small><strong>Luxury Life Tycoon</strong><span>Roblox game · current build</span></article>',
        '<article data-state="parked"><small>Parked tracked project</small><strong>Creator Academy Hub</strong><span>Separate product · planning references only</span></article>',
      '</section>',
      '<div class="first-screen-answers">',
        '<article><small>What am I building?</small><strong>' + escapeHtml(helperState.solo.activeSystem) + '</strong></article>',
        '<article><small>What do I do next?</small><strong>' + escapeHtml(next.title) + '</strong></article>',
        '<article><small>What should I ignore?</small><strong>' + escapeHtml(ignored ? ignored.title : "Unplanned expansion") + '</strong></article>',
        '<article><small>What is the risk?</small><strong>' + escapeHtml(overload.overloaded ? overload.message : risk.detail) + '</strong></article>',
        '<article><small>What is the long-term vision?</small><strong>Skill → product → cashflow → assets → trophies → empire</strong></article>',
      '</div>'
    ].join("");
  }

  function commandCenterHtml(next, counts, overload, risk) {
    var parked = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 5);
    return [
      '<section class="command-section-head"><span class="helper-section-label">Freddie\'s Command Center</span><h3>Execution Engine</h3><p>Only the decisions and actions needed to move the current build forward.</p></section>',
      '<div class="command-center-grid">',
        '<article class="helper-card command-primary-card"><span class="command-card-label">Next build action</span><h3>' + escapeHtml(next.title) + '</h3><p>' + escapeHtml(next.detail) + '</p>' + (next.id ? '<button type="button" class="helper-button primary" onclick="helperSetTaskStatus(\'' + next.id + '\', \'completed\')">Mark complete</button>' : '') + '</article>',
        '<article class="helper-card command-metric-card"><span>Launch readiness</span><strong>' + localReadinessScore() + '%</strong><div class="command-progress"><i style="width:' + localReadinessScore() + '%"></i></div><small>Local planning estimate, not a production claim.</small></article>',
        '<article class="helper-card command-metric-card" data-tone="' + risk.tone + '"><span>Founder discipline</span><strong>' + (overload.overloaded ? "Scope breach" : "Controlled") + '</strong><small>' + escapeHtml(overload.message) + '</small></article>',
        '<article class="helper-card command-stack-card"><span class="command-card-label">Mission stack · next three</span>' + soloNextActionsHtml() + '</article>',
        '<article class="helper-card command-stack-card"><span class="command-card-label">Parked future ideas</span>' + compactList(parked.map(function (task) { return task.title; })) + '</article>',
        '<article class="helper-card command-warning-card"><span class="command-card-label">Build discipline warning</span><strong>' + escapeHtml(overload.overloaded ? hardTruths[0] : hardTruths[7]) + '</strong><p>' + escapeHtml(risk.detail) + '</p></article>',
      '</div>',
      '<div class="command-quick-actions"><button type="button" onclick="helperSetSection(\'brain\')">Ask Overseer Brain</button><button type="button" onclick="helperSetSection(\'roadmap\')">Open build roadmap</button><button type="button" onclick="helperSetSection(\'decisions\')">Record a decision</button><button type="button" onclick="helperSetSection(\'vault\')">Park a future idea</button></div>'
    ].join("");
  }

  function blueprintHtml() {
    return [
      '<section class="command-section-head"><span class="helper-section-label">Game Blueprint</span><h3>Luxury Life Tycoon</h3><p>A premium progression game where property, vehicles, businesses and status grow from one understandable playable loop.</p></section>',
      '<div class="blueprint-grid">',
        '<article class="helper-card blueprint-core"><span>Player fantasy</span><h3>Start small. Build income. Upgrade life. Earn visible status.</h3><p>The player should feel progression through useful assets and increasingly premium spaces—not repetitive chores.</p></article>',
        '<article class="helper-card"><span>Core loop</span>' + compactList(["Earn cash", "Buy one meaningful upgrade", "Unlock a better vehicle/property option", "Show progress", "Reinvest into the next milestone"]) + '</article>',
        '<article class="helper-card"><span>Minimum viable version</span>' + compactList(["One plot", "One house path", "One garage", "One working car", "Simple cash earning", "Basic upgrade buttons"]) + '</article>',
        '<article class="helper-card"><span>Zones</span>' + focusChips(["Starter plot", "Residential upgrade", "Garage", "Dealership later", "Tuning shop later", "Car meet plaza later"]) + '</article>',
        '<article class="helper-card"><span>Progression</span>' + compactList(["Starter income", "House upgrades", "Garage access", "Vehicle quality", "Businesses", "Prestige only after the loop proves itself"]) + '</article>',
        '<article class="helper-card"><span>Businesses</span>' + compactList(["Dealership", "Tuning shop", "Private bank", "Property income", "Future service businesses"]) + '</article>',
      '</div>',
      '<article class="helper-card blueprint-guardrail"><strong>Blueprint guardrail</strong><span>Do not build the city, prestige empire or dozens of vehicles before one plot, one money loop and one car work cleanly.</span></article>'
    ].join("");
  }

  function carSystemsHtml() {
    var cards = [
      ["Vehicle customisation", ["Paint colour", "Wheel choice", "Custom plates", "Body kits parked until later"]],
      ["Vehicle audio", ["Startup state", "Idle loop", "Driving loop", "No overlapping audio", "Licensed assets only"]],
      ["Startup sequence", ["Enter prompt", "Align to door", "Door animation", "Sit placeholder", "Startup sound", "Dashboard light"]],
      ["Damage and repair", ["Clear damage states", "Repair cost", "No pointless punishment", "Insurance/protection later"]],
      ["Garage display", ["Owned vehicles", "Rarity label", "Status presentation", "Photo spot", "Player viewing later"]],
      ["Driving feel", ["Reliable basic handling", "Ordinary-hardware performance", "Camera clarity", "Input feedback", "Advanced tuning later"]],
      ["Interaction animation", ["One door", "One seat", "One clean transition", "Fallback if animation fails"]]
    ];
    return [
      '<section class="command-section-head"><span class="helper-section-label">Car Systems</span><h3>Premium vehicle feel, built in the right order</h3><p>One complete car interaction is the checkpoint. A fleet is future scope.</p></section>',
      '<div class="system-card-grid">' + cards.map(function (card, index) { return '<article class="helper-card system-detail-card"><span class="system-index">0' + (index + 1) + '</span><h3>' + card[0] + '</h3>' + compactList(card[1]) + '</article>'; }).join("") + '</div>',
      '<article class="helper-card system-sequence"><span>Current recommended sequence</span><strong>One car → enter prompt → reliable drive → startup sound → idle loop → no overlap → one door animation → dashboard light</strong></article>'
    ].join("");
  }

  function lifeSystemsHtml() {
    var systems = [
      ["Banking app / bank", "Make income, spending and future business upgrades understandable."],
      ["Business income", "Support the tycoon loop with clear payout timing and upgrade value."],
      ["Car damage and repair", "Create consequences that support vehicle ownership without becoming tedious."],
      ["Insurance / protection", "Future risk-management layer after damage and repair work."],
      ["Discipline and motivation", "Reward meaningful sessions, milestones and returning to useful work."],
      ["Sleep / 3AM motivation", "Use sparingly as a strategic boost, not a repetitive micro-chore."],
      ["Burnout / energy", "Only include if it creates useful decisions rather than slowing the player."],
      ["Reputation / status", "Make progress visible through garages, cars, businesses and social spaces."]
    ];
    return [
      '<section class="command-section-head"><span class="helper-section-label">Life Systems</span><h3>Selective mechanics that support progression</h3><p>Life simulation exists to strengthen the tycoon fantasy. Boring chores stay out.</p></section>',
      '<div class="life-system-grid">' + systems.map(function (system) { return '<article class="helper-card life-system-card"><span></span><div><h3>' + system[0] + '</h3><p>' + system[1] + '</p></div></article>'; }).join("") + '</div>',
      '<article class="helper-card blueprint-guardrail"><strong>Cut rule</strong><span>No barber visits, filler errands or realism-for-realism\'s-sake unless the mechanic directly supports gameplay, economy, ownership or status.</span></article>'
    ].join("");
  }

  function founderSystemsHtml(counts, overload, risk, currentPhase, parkedTasks, neededSkills) {
    return [
      '<section class="command-section-head"><span class="helper-section-label">Founder Systems</span><h3>Freddie\'s personal execution system</h3><p>Discipline, learning and workload control for a long solo build.</p></section>',
      '<section class="solo-founder-command founder-page-command">',
        '<div class="solo-founder-header"><div><span class="solo-mode-chip">Mode: Solo Founder</span><h3>Build Control</h3><p>No excuses, no uncontrolled scope, and no dependency on unavailable people.</p></div><div class="solo-risk" data-tone="' + risk.tone + '"><span>Overload risk</span><strong>' + risk.label + '</strong><small>' + risk.detail + '</small></div></div>',
        '<div class="solo-founder-grid">',
          '<article class="solo-command-card"><span>Weekly focus</span><input id="soloActiveSystem" maxlength="200" value="' + escapeHtml(helperState.solo.activeSystem) + '"></article>',
          '<article class="solo-command-card"><span>Learning blocker</span><input id="soloLearningBlocker" maxlength="200" value="' + escapeHtml(helperState.solo.learningBlocker) + '"></article>',
          '<article class="solo-command-card"><span>Current phase</span><select id="soloPhaseSelect" onchange="helperSetSoloPhase(this.value)">' + phaseOptions() + '</select></article>',
          '<article class="solo-command-card"><span>Feature load</span><strong>' + counts.active + ' active</strong><small>' + overload.slots.core + ' core · ' + overload.slots.support + ' support · ' + overload.slots.polish + ' polish</small></article>',
        '</div>',
        '<div class="solo-save-row"><span>No-excuse rule: finish the selected system before expanding scope.</span><button type="button" class="helper-button primary" onclick="helperSaveSoloState()">Save founder focus</button></div>',
        '<div class="solo-overload-warning ' + (overload.overloaded ? "danger" : "controlled") + '"><strong>' + overload.message + '</strong><span>' + (overload.overloaded ? hardTruths[0] : hardTruths[6]) + '</span></div>',
      '</section>',
      '<div class="founder-system-grid">',
        '<article class="helper-card"><span class="command-card-label">Motivation tracker</span><strong>The dream is allowed.</strong><p>The current sprint must remain small enough to finish.</p></article>',
        '<article class="helper-card"><span class="command-card-label">Parked scope</span>' + compactList(parkedTasks.map(function (task) { return task.title; })) + '</article>',
        '<article class="helper-card"><span class="command-card-label">Skills blocking the next phase</span>' + compactList(neededSkills.map(function (skill) { return skill.name + ': ' + skill.exercise; })) + '</article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">Capability building</span><h3>Solo skill tracker</h3></div><p>Evidence and exercises, not confidence alone.</p></div>',
      '<article class="helper-card solo-skills-card"><div class="solo-skills-grid">' + skillRows() + '</div></article>',
      '<details class="helper-card solo-rules-card" open><summary><div><span class="helper-section-label">Permanent principles</span><h3>Founder operating rules</h3></div><span>10 rules</span></summary>' + operatingRulesHtml() + '</details>'
    ].join("");
  }

  function roadmapHtml(currentPhase) {
    return [
      '<section class="command-section-head"><span class="helper-section-label">Empire Build Path</span><h3>Seven-phase solo roadmap</h3><p>Only Phase ' + currentPhase.id + ' drives the current sprint. Later phases remain visible but inactive.</p></section>',
      '<div class="roadmap-current-banner"><span>Current phase</span><strong>' + currentPhase.id + ' · ' + currentPhase.name + '</strong><small>' + currentPhase.items.join(" → ") + '</small></div>',
      '<div class="solo-roadmap roadmap-page">' + soloRoadmapHtml() + '</div>'
    ].join("");
  }

  function brainHtml(next, overload) {
    var ignore = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 3);
    var blocked = tasks.filter(function (task) { return taskStatus(task.id) === "blocked"; }).slice(0, 3);
    var intake = intakeProgress();
    return [
      '<section class="command-section-head"><span class="helper-section-label">Overseer Brain</span><h3>Local rule-based intelligence</h3><p>Priorities, scope control, feature scoring and ChatGPT prompt construction. No cloud inference is running here.</p></section>',
      '<div class="brain-summary-grid">',
        '<article class="helper-card"><span>Top priority</span><strong>' + escapeHtml(next.title) + '</strong><p>' + escapeHtml(next.detail) + '</p></article>',
        '<article class="helper-card"><span>What to ignore</span>' + compactList(ignore.map(function (task) { return task.title; })) + '</article>',
        '<article class="helper-card"><span>What is blocked</span>' + (blocked.length ? compactList(blocked.map(function (task) { return task.title; })) : '<p>No explicit blockers recorded.</p>') + '</article>',
        '<article class="helper-card" data-tone="' + (overload.overloaded ? "bad" : "good") + '"><span>Feature load</span><strong>' + (overload.overloaded ? "Over-scoped" : "Controlled") + '</strong><p>' + overload.message + '</p></article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">Solo evaluation</span><h3>Solo Build Score</h3></div><p>Value − difficulty − dependency − maintenance risk.</p></div>',
      '<article class="helper-card solo-feature-card"><div class="solo-feature-head"><span>Feature</span><span>Score</span><span>Recommendation</span></div><div class="solo-feature-list">' + featureScoreRows() + '</div><div class="solo-brain-questions"><strong>Overseer checks:</strong><span>Can Freddie build it alone?</span><span>Does it help the core loop?</span><span>What skill blocks it?</span><span>What is the smallest useful version?</span></div></article>',
      '<div class="overseer-intelligence-grid brain-intelligence-grid">',
        '<article id="overseerIntake" class="helper-card overseer-intake-card"><div class="overseer-card-heading"><div><span class="helper-section-label">Information intake</span><h3>Give Overseer useful context</h3><p>Everything stays in this browser.</p></div><div class="overseer-progress-ring" style="--progress:' + intake.percent + '"><strong>' + intake.percent + '%</strong><span>' + intake.answered + '/' + intake.total + '</span></div></div><div class="overseer-intake-grid">' + intakeFieldsHtml() + '</div><div class="overseer-intake-footer"><span>Local draft · not secure</span><button type="button" class="helper-button primary" onclick="helperSaveIntake()">Save information</button></div></article>',
        '<article class="helper-card overseer-prompt-card"><div class="overseer-card-heading compact"><div><span class="helper-section-label">ChatGPT prompt lab</span><h3>Build a context-rich prompt</h3><p>Review and copy manually.</p></div></div><div class="overseer-prompt-modes">' + promptModeButtons() + '</div><textarea id="overseerGeneratedPrompt" class="overseer-generated-prompt" readonly>' + escapeHtml(buildPrompt()) + '</textarea><div class="overseer-prompt-footer"><span>Nothing is transmitted automatically.</span><button type="button" class="helper-button primary" onclick="helperCopyPrompt()">Copy prompt</button></div></article>',
      '</div>'
    ].join("");
  }

  function decisionsHtml() {
    return [
      '<section class="command-section-head"><span class="helper-section-label">Decisions</span><h3>Project memory</h3><p>Record what changed, why, its consequences and whether it can be reversed.</p></section>',
      '<div class="decision-layout">',
        '<article class="helper-card decision-guide"><span>Decision format</span>' + compactList(["Decision made", "Reason", "Consequences", "Reversible or permanent", "Related feature or project", "Date reviewed"]) + '</article>',
        '<article class="helper-card decision-editor"><label for="overseerDecisions">Local decision log</label><textarea id="overseerDecisions" maxlength="8000" placeholder="Decision:\nReason:\nConsequences:\nReversible:\nRelated feature:\n">' + escapeHtml(helperState.decisions) + '</textarea><div><span>Local only · not secure · no sync</span><button type="button" class="helper-button primary" onclick="helperSaveDecisions()">Save decisions</button></div></article>',
      '</div>'
    ].join("");
  }

  function vaultHtml() {
    return [
      '<section class="command-section-head"><span class="helper-section-label">Future Vault</span><h3>Long-term ambition without current-sprint pollution</h3><p>The empire has no ceiling. The active build still has strict limits.</p></section>',
      '<div class="vault-grid">',
        '<article class="helper-card"><span>Future cars / checkpoints</span>' + compactList(["Higher rarity vehicles", "Special vehicle classes", "Custom plates", "Photo-ready garage displays"]) + '</article>',
        '<article class="helper-card"><span>Parked 10-year features</span>' + compactList(["Huge custom city", "Large vehicle fleet", "Advanced body-kit ecosystem", "Deep prestige economy"]) + '</article>',
        '<article class="helper-card"><span>Studio-stage ideas</span>' + compactList(["Custom vehicle pipeline", "Seasonal events", "Live analytics", "Dedicated content team"]) + '</article>',
        '<article class="helper-card"><span>Outsourcing ideas</span>' + compactList(["High-end vehicle models", "Properly licensed audio packs", "Trailer editing", "Specialist animation polish"]) + '</article>',
        '<article class="helper-card vault-trajectory"><span>Empire trajectory</span><strong>No Ceiling</strong><p>Skill → product → cashflow → assets → trophies → empire.</p></article>',
      '</div>',
      '<article class="helper-card vault-editor"><label for="overseerVault">Local vault notes</label><textarea id="overseerVault" maxlength="8000" placeholder="Store future ideas here instead of activating them now...">' + escapeHtml(helperState.vault) + '</textarea><div><span>Parked locally · not part of the active sprint</span><button type="button" class="helper-button primary" onclick="helperSaveVault()">Save vault</button></div></article>'
    ].join("");
  }

  function renderDashboard() {
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var next = overseerNextAction();
    var counts = taskCounts();
    var overload = overloadState();
    var risk = burnoutRisk();
    var currentPhase = soloPhases[helperState.solo.phase - 1];
    var parkedTasks = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 5);
    var neededSkills = soloSkills.filter(function (skill) { return helperState.skills[skill.id] !== "Working" && helperState.skills[skill.id] !== "Confident"; }).slice(0, 4);
    var sectionHtml = "";

    if (helperState.activeSection === "command") sectionHtml = commandCenterHtml(next, counts, overload, risk);
    if (helperState.activeSection === "blueprint") sectionHtml = blueprintHtml();
    if (helperState.activeSection === "cars") sectionHtml = carSystemsHtml();
    if (helperState.activeSection === "life") sectionHtml = lifeSystemsHtml();
    if (helperState.activeSection === "founder") sectionHtml = founderSystemsHtml(counts, overload, risk, currentPhase, parkedTasks, neededSkills);
    if (helperState.activeSection === "roadmap") sectionHtml = roadmapHtml(currentPhase);
    if (helperState.activeSection === "brain") sectionHtml = brainHtml(next, overload);
    if (helperState.activeSection === "decisions") sectionHtml = decisionsHtml();
    if (helperState.activeSection === "vault") sectionHtml = vaultHtml();

    var commandOverview = helperState.activeSection === "command"
      ? founderTopHtml(next, counts, overload, risk, currentPhase)
      : "";
    app.innerHTML = '<section class="helper-dashboard helper-enter organised-overseer" aria-label="Overseer command system">' + commandOverview + '<main id="overseerSectionContent" class="overseer-section-content" data-section="' + helperState.activeSection + '">' + sectionHtml + '</main></section>';
  }

  function captureIntakeFromDom(persist) {
    intakeFields.forEach(function (field) {
      var input = document.getElementById("overseer-intake-" + field.id);
      if (input) helperState.intake[field.id] = String(input.value || "").trim().slice(0, 1200);
    });
    if (persist) writeLocalJson(INTAKE_STORAGE_KEY, helperState.intake);
  }

  function setActiveSection(sectionId) {
    helperState.activeSection = normaliseSection(sectionId);
    writeLocalText(UI_STORAGE_KEY, helperState.activeSection);
    renderDashboard();
    var section = document.getElementById("overseerSectionContent");
    if (section && typeof section.scrollIntoView === "function") {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  window.helperSetSection = setActiveSection;

  window.helperSaveDecisions = function () {
    var field = document.getElementById("overseerDecisions");
    if (!field) return;
    helperState.decisions = String(field.value || "").slice(0, 8000);
    writeLocalText(DECISIONS_STORAGE_KEY, helperState.decisions);
    showHelperToast("Local decision log saved.");
  };

  window.helperSaveVault = function () {
    var field = document.getElementById("overseerVault");
    if (!field) return;
    helperState.vault = String(field.value || "").slice(0, 8000);
    writeLocalText(VAULT_STORAGE_KEY, helperState.vault);
    showHelperToast("Future Vault saved locally.");
  };

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

  window.helperSaveSoloState = function () {
    var activeSystem = document.getElementById("soloActiveSystem");
    var blocker = document.getElementById("soloLearningBlocker");
    var phase = document.getElementById("soloPhaseSelect");
    if (activeSystem) helperState.solo.activeSystem = String(activeSystem.value || "").trim().slice(0, 200);
    if (blocker) helperState.solo.learningBlocker = String(blocker.value || "").trim().slice(0, 200);
    if (phase) helperState.solo.phase = Math.max(1, Math.min(soloPhases.length, Number(phase.value) || 1));
    writeLocalJson(SOLO_STORAGE_KEY, helperState.solo);
    renderDashboard();
    showHelperToast("Solo Founder focus saved on this device.");
  };

  window.helperSetSoloPhase = function (value) {
    helperState.solo.phase = Math.max(1, Math.min(soloPhases.length, Number(value) || 1));
    writeLocalJson(SOLO_STORAGE_KEY, helperState.solo);
    renderDashboard();
  };

  window.helperToggleMason = function () {
    helperState.solo.masonActive = !helperState.solo.masonActive;
    writeLocalJson(SOLO_STORAGE_KEY, helperState.solo);
    renderDashboard();
    showHelperToast(helperState.solo.masonActive ? "Mason marked manually reactivated. No tasks were assigned." : "Mason returned to inactive historical status.");
  };

  window.helperSetSkillLevel = function (skillId, level) {
    var skillExists = soloSkills.some(function (skill) { return skill.id === skillId; });
    var validLevels = ["Not assessed", "Beginner", "Learning", "Working", "Confident"];
    if (!skillExists || validLevels.indexOf(level) < 0) return;
    helperState.skills[skillId] = level;
    writeLocalJson(SKILL_STORAGE_KEY, helperState.skills);
    showHelperToast("Solo skill level saved locally.");
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

  function install() {
    installShell();
    renderDashboard();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();

}());
