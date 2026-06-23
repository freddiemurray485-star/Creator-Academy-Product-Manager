/*
  Creator Academy Helper dashboard.
  This presentation layer does not grant plans, alter entitlements, or expose admin tools.
  Authentication is delegated to an existing Supabase client or creatorAcademyAuth adapter.
*/
(function () {
  "use strict";

  var originalActions = {
    showLevelHub: typeof window.showLevelHub === "function" ? window.showLevelHub : null,
    showProgress: typeof window.showProgress === "function" ? window.showProgress : null,
    showPlans: typeof window.showPlans === "function" ? window.showPlans : null
  };

  var helperState = {
    authMode: "login",
    authAdapter: null,
    session: null,
    preview: false,
    currentView: "auth",
    paymentStatus: { label: "Not checked", detail: "Run a backend check before launch.", tone: "warn" }
  };

  function isLocalHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
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

  function normaliseResult(result) {
    result = result || {};
    if (result.error) throw result.error;
    return result.data || result;
  }

  function resolveAuthAdapter() {
    var custom = window.creatorAcademyAuth;
    if (custom && typeof custom.getSession === "function" && typeof custom.signIn === "function" && typeof custom.signUp === "function") {
      return {
        name: "Creator Academy auth",
        getSession: function () { return Promise.resolve(custom.getSession()).then(normaliseResult); },
        signIn: function (email, password) { return Promise.resolve(custom.signIn({ email: email, password: password })).then(normaliseResult); },
        signUp: function (fullName, email, password) {
          return Promise.resolve(custom.signUp({ fullName: fullName, email: email, password: password })).then(normaliseResult);
        },
        signOut: function () { return typeof custom.signOut === "function" ? Promise.resolve(custom.signOut()) : Promise.resolve(); }
      };
    }

    var candidates = [window.supabaseClient, window.creatorAcademySupabase];
    for (var i = 0; i < candidates.length; i += 1) {
      var client = candidates[i];
      if (!client || !client.auth || typeof client.auth.getSession !== "function") continue;
      return {
        name: "Supabase",
        getSession: function () { return Promise.resolve(client.auth.getSession()).then(normaliseResult); },
        signIn: function (email, password) {
          return Promise.resolve(client.auth.signInWithPassword({ email: email, password: password })).then(normaliseResult);
        },
        signUp: function (fullName, email, password) {
          return Promise.resolve(client.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: fullName } }
          })).then(normaliseResult);
        },
        signOut: function () { return Promise.resolve(client.auth.signOut()).then(normaliseResult); }
      };
    }

    return null;
  }

  function sessionFromData(data) {
    if (!data) return null;
    return data.session || (data.data && data.data.session) || null;
  }

  function userFromState() {
    if (!helperState.session) return null;
    return helperState.session.user || null;
  }

  function displayName() {
    if (helperState.preview) return "local preview";
    var user = userFromState();
    if (!user) return "creator";
    var metadata = user.user_metadata || {};
    var name = metadata.full_name || metadata.name || "";
    if (name) return String(name).trim().split(/\s+/)[0];
    if (user.email) return String(user.email).split("@")[0];
    return "creator";
  }

  function showHelperToast(message) {
    var previous = document.querySelector(".helper-toast");
    if (previous) previous.remove();
    var toast = document.createElement("div");
    toast.className = "helper-toast";
    toast.setAttribute("role", "status");
    toast.textContent = String(message || "");
    document.body.appendChild(toast);
    window.setTimeout(function () { if (toast.parentNode) toast.remove(); }, 3600);
  }

  function installShell() {
    document.body.classList.add("helper-app");
    var app = appRoot();
    if (app) app.classList.add("helper-root");

    var brand = document.querySelector(".topbar .brand");
    if (brand) {
      brand.innerHTML = [
        '<span class="brand-mark" aria-hidden="true">CA</span>',
        '<div><h1>Creator Academy Helper</h1><p>Project guidance and launch support</p></div>'
      ].join("");
    }
    renderNavigation();
  }

  function renderNavigation() {
    var nav = document.querySelector(".topbar .nav-actions");
    if (!nav) return;
    if (helperState.currentView === "auth") {
      nav.innerHTML = '<button type="button" class="active" onclick="showCreatorAcademyHelper()">Sign in</button>';
      return;
    }

    nav.innerHTML = [
      '<button type="button" class="helper-nav-button ' + (helperState.currentView === "dashboard" ? "active" : "") + '" onclick="showCreatorAcademyHelper()">Overview</button>',
      '<button type="button" class="helper-nav-button" onclick="helperOpenCourses()">Courses</button>',
      '<button type="button" class="helper-nav-button" onclick="helperOpenProgress()">Progress</button>',
      helperState.preview ? '<button type="button" class="helper-nav-button helper-signout" onclick="helperExitPreview()">Exit preview</button>' : '<button type="button" class="helper-nav-button helper-signout" onclick="helperSignOut()">Sign out</button>'
    ].join("");
  }

  function renderAuth() {
    helperState.currentView = "auth";
    helperState.preview = false;
    installShell();
    var app = appRoot();
    if (!app) return;
    var signup = helperState.authMode === "signup";
    var authAvailable = Boolean(helperState.authAdapter);

    app.innerHTML = [
      '<section class="helper-auth-shell helper-enter" aria-label="Creator Academy Helper access">',
        '<div class="helper-auth-intro">',
          '<div>',
            '<span class="helper-kicker">Command assistant</span>',
            '<h2>Build with a clear next step.</h2>',
            '<p>Creator Academy Helper organises progress, launch tasks, account setup and course building into one focused workspace.</p>',
          '</div>',
          '<div class="helper-capabilities" aria-label="Helper capabilities">',
            '<div class="helper-capability">Launch readiness</div>',
            '<div class="helper-capability">Project status</div>',
            '<div class="helper-capability">Course operations</div>',
            '<div class="helper-capability">Next-action guidance</div>',
          '</div>',
        '</div>',
        '<div class="helper-auth-card">',
          '<span class="helper-section-label">Secure workspace</span>',
          '<h2>' + (signup ? "Create your account" : "Welcome back") + '</h2>',
          '<p>' + (authAvailable ? "Use your Creator Academy account to open the helper dashboard." : "Connect the Supabase auth client to enable account access. Authentication is not simulated in the browser.") + '</p>',
          '<div class="helper-auth-tabs" role="tablist" aria-label="Account access">',
            '<button type="button" class="' + (!signup ? "active" : "") + '" onclick="helperSetAuthMode(\'login\')">Log in</button>',
            '<button type="button" class="' + (signup ? "active" : "") + '" onclick="helperSetAuthMode(\'signup\')">Sign up</button>',
          '</div>',
          '<form id="helperAuthForm" class="helper-auth-form">',
            (signup ? '<div class="helper-field"><label for="helperFullName">Full name</label><input id="helperFullName" name="fullName" type="text" autocomplete="name" minlength="2" maxlength="100" required></div>' : ''),
            '<div class="helper-field"><label for="helperEmail">Email</label><input id="helperEmail" name="email" type="email" autocomplete="email" maxlength="320" required></div>',
            '<div class="helper-field"><label for="helperPassword">Password</label><input id="helperPassword" name="password" type="password" autocomplete="' + (signup ? "new-password" : "current-password") + '" minlength="8" maxlength="200" required></div>',
            '<button class="helper-submit" type="submit">' + (signup ? "Create account" : "Open helper") + '</button>',
            '<p id="helperAuthMessage" class="helper-auth-message" aria-live="polite"></p>',
          '</form>',
          (isLocalHost() ? '<button class="helper-local-preview" type="button" onclick="helperPreviewDashboard()">Preview dashboard locally</button>' : ''),
        '</div>',
      '</section>'
    ].join("");

    var form = document.getElementById("helperAuthForm");
    if (form) form.addEventListener("submit", handleAuthSubmit);
  }

  function setAuthMessage(message, isError) {
    var node = document.getElementById("helperAuthMessage");
    if (!node) return;
    node.textContent = message || "";
    node.style.color = isError ? "var(--helper-red)" : "var(--helper-green)";
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var submit = form.querySelector("button[type='submit']");
    var email = String(form.elements.email.value || "").trim();
    var password = String(form.elements.password.value || "");
    var fullName = form.elements.fullName ? String(form.elements.fullName.value || "").trim() : "";

    if (!helperState.authAdapter) {
      setAuthMessage("Supabase authentication is not connected. Add the existing auth client before signing in.", true);
      return;
    }

    submit.disabled = true;
    setAuthMessage(helperState.authMode === "signup" ? "Creating your account..." : "Checking your account...", false);
    try {
      var data = helperState.authMode === "signup"
        ? await helperState.authAdapter.signUp(fullName, email, password)
        : await helperState.authAdapter.signIn(email, password);
      var session = sessionFromData(data);
      if (!session) {
        setAuthMessage("Account created. Check your email to confirm access, then log in.", false);
        return;
      }
      helperState.session = session;
      transitionToDashboard();
    } catch (error) {
      setAuthMessage(error && error.message ? error.message : "Account access failed. Check your details and try again.", true);
    } finally {
      submit.disabled = false;
    }
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

  function updateStatusCard(id, status) {
    var card = document.getElementById("helper-status-" + id);
    if (!card) return;
    card.dataset.tone = status.tone;
    var strong = card.querySelector("strong");
    var detail = card.querySelector("p");
    if (strong) strong.textContent = status.label;
    if (detail) detail.textContent = status.detail;
  }

  function projectStatuses() {
    var authenticated = Boolean(helperState.session);
    var authStatus = authenticated
      ? { label: "Signed in", detail: "A real account session is active.", tone: "good" }
      : helperState.preview
        ? { label: "Local preview", detail: "Preview mode is not an authenticated session.", tone: "warn" }
        : { label: "Signed out", detail: "Log in to open the helper workspace.", tone: "warn" };
    var supabaseStatus = helperState.authAdapter
      ? { label: "Client detected", detail: helperState.authAdapter.name + " is available to the helper.", tone: "good" }
      : { label: "Needs connection", detail: "No Supabase/auth adapter is loaded.", tone: "bad" };
    var pwaReady = Boolean(document.querySelector("link[rel='manifest']")) && "serviceWorker" in navigator;
    var pwaStatus = pwaReady
      ? { label: "Structure detected", detail: "Manifest and service worker support are present.", tone: "good" }
      : { label: "Not ready", detail: "Manifest or service worker setup is missing.", tone: "warn" };
    var deployed = window.location.protocol === "https:" && !isLocalHost();
    var deployStatus = deployed
      ? { label: "Hosted", detail: "Running from a secure public deployment.", tone: "good" }
      : { label: "Local preview", detail: "Deploy checks require the hosted environment.", tone: "warn" };
    var coursesReady = typeof originalActions.showLevelHub === "function";
    var courseStatus = coursesReady
      ? { label: "Structure loaded", detail: "Existing course routes remain available.", tone: "good" }
      : { label: "Route unavailable", detail: "Course rendering hook was not found.", tone: "bad" };

    return {
      auth: authStatus,
      supabase: supabaseStatus,
      stripe: helperState.paymentStatus,
      pwa: pwaStatus,
      deployment: deployStatus,
      courses: courseStatus
    };
  }

  function nextAction() {
    if (!helperState.authAdapter) {
      return { priority: "HIGH", title: "Connect Supabase authentication", reason: "Login and signup must use a real auth provider before this dashboard can protect user sessions.", action: "helperCheckLogin()", label: "Check login" };
    }
    if (!helperState.session && helperState.preview) {
      return { priority: "HIGH", title: "Test the real login flow", reason: "You are viewing a local design preview, not an authenticated account session.", action: "helperExitPreview()", label: "Open login" };
    }
    if (helperState.paymentStatus.tone !== "good") {
      return { priority: "HIGH", title: "Verify the payment backend", reason: "The frontend must not assume Stripe configuration or paid access without a backend check.", action: "helperCheckPayments()", label: "Check payments" };
    }
    return { priority: "NEXT", title: "Review PWA readiness", reason: "Confirm installability and offline behaviour before treating the helper as launch-ready.", action: "helperReviewPwa()", label: "Review PWA" };
  }

  function renderDashboard() {
    if (!helperState.session && !helperState.preview) {
      renderAuth();
      return;
    }
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var statuses = projectStatuses();
    var next = nextAction();
    var greeting = displayName();

    app.innerHTML = [
      '<section class="helper-dashboard helper-enter" aria-label="Creator Academy Helper dashboard">',
        '<header class="helper-welcome">',
          '<div>',
            '<span class="helper-section-label">Creator Academy Helper</span>',
            '<h2>Good to see you, ' + escapeHtml(greeting) + '.</h2>',
            '<p>Manage progress, launch tasks, account setup and course building from one guided workspace.</p>',
          '</div>',
          '<span class="helper-session-pill">' + (helperState.preview ? "Local design preview" : "Account session active") + '</span>',
        '</header>',
        '<article class="helper-card helper-next-card">',
          '<div class="helper-priority">' + escapeHtml(next.priority) + '</div>',
          '<div><span class="helper-section-label">What should I do next?</span><h3>' + escapeHtml(next.title) + '</h3><p>' + escapeHtml(next.reason) + '</p></div>',
          '<button type="button" class="helper-button primary" onclick="' + next.action + '">' + escapeHtml(next.label) + '</button>',
        '</article>',
        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">System overview</span><h3>Project status</h3></div>',
          '<p>Live checks only — no status is marked ready without evidence.</p>',
        '</div>',
        '<div class="helper-status-grid">',
          statusCard("auth", "Auth status", statuses.auth),
          statusCard("supabase", "Supabase status", statuses.supabase),
          statusCard("stripe", "Stripe status", statuses.stripe),
          statusCard("pwa", "PWA status", statuses.pwa),
          statusCard("deployment", "Deployment status", statuses.deployment),
          statusCard("courses", "Course content status", statuses.courses),
        '</div>',
        '<div class="helper-work-grid">',
          '<article class="helper-card helper-work-card">',
            '<h3>Task assistant</h3>',
            '<p>Run focused checks without changing account permissions or paid access.</p>',
            '<div class="helper-action-grid">',
              '<button class="helper-action-button" type="button" onclick="helperCheckLogin()"><span>Check Login</span><span>→</span></button>',
              '<button class="helper-action-button" type="button" onclick="helperCheckPayments()"><span>Check Payments</span><span>→</span></button>',
              '<button class="helper-action-button" type="button" onclick="helperReviewPwa()"><span>Review PWA</span><span>→</span></button>',
              '<button class="helper-action-button" type="button" onclick="helperOpenCourses()"><span>Open Courses</span><span>→</span></button>',
            '</div>',
          '</article>',
          '<article class="helper-card helper-work-card">',
            '<h3>Launch blockers</h3>',
            '<p>Resolve these before public paid traffic.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">1</span><span>Connect and test the real Supabase session flow.</span></li>',
              '<li><span class="helper-list-index">2</span><span>Verify Stripe checkout and entitlement lifecycle server-side.</span></li>',
              '<li><span class="helper-list-index">3</span><span>Complete PWA install and offline validation.</span></li>',
            '</ul>',
          '</article>',
          '<article class="helper-card helper-work-card">',
            '<h3>Suggested fixes</h3>',
            '<p>High-value improvements detected from the current build.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">A</span><span>Keep the server authoritative for payment and entitlement state.</span></li>',
              '<li><span class="helper-list-index">B</span><span>Add a deployment health checklist with explicit pass/fail evidence.</span></li>',
              '<li><span class="helper-list-index">C</span><span>Replace prototype copy with accurate product and support language.</span></li>',
            '</ul>',
          '</article>',
          '<article class="helper-card helper-work-card">',
            '<h3>Next sprint</h3>',
            '<p>Keep the next delivery small and testable.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">1</span><span>Auth integration and session recovery test.</span></li>',
              '<li><span class="helper-list-index">2</span><span>Stripe cancellation and refund entitlement test.</span></li>',
              '<li><span class="helper-list-index">3</span><span>PWA manifest, service worker and install test.</span></li>',
            '</ul>',
          '</article>',
        '</div>',
      '</section>'
    ].join("");
  }

  function transitionToDashboard() {
    var app = appRoot();
    if (app) app.classList.add("helper-exit");
    window.setTimeout(function () {
      if (app) app.classList.remove("helper-exit");
      renderDashboard();
    }, 190);
  }

  async function restoreSession() {
    helperState.authAdapter = resolveAuthAdapter();
    if (!helperState.authAdapter) {
      renderAuth();
      return;
    }
    try {
      var data = await helperState.authAdapter.getSession();
      helperState.session = sessionFromData(data);
    } catch (error) {
      helperState.session = null;
    }
    if (helperState.session) renderDashboard();
    else renderAuth();
  }

  window.helperSetAuthMode = function (mode) {
    helperState.authMode = mode === "signup" ? "signup" : "login";
    renderAuth();
  };

  window.helperPreviewDashboard = function () {
    if (!isLocalHost()) return false;
    helperState.preview = true;
    helperState.session = null;
    transitionToDashboard();
    return true;
  };

  window.helperExitPreview = function () {
    helperState.preview = false;
    renderAuth();
  };

  window.helperSignOut = async function () {
    try {
      if (helperState.authAdapter) await helperState.authAdapter.signOut();
    } catch (error) {
      showHelperToast("Sign out could not be confirmed. Refresh and check the auth provider.");
    }
    helperState.session = null;
    helperState.preview = false;
    renderAuth();
  };

  window.helperCheckLogin = function () {
    var statuses = projectStatuses();
    updateStatusCard("auth", statuses.auth);
    updateStatusCard("supabase", statuses.supabase);
    showHelperToast(helperState.session ? "Login check passed: account session detected." : helperState.authAdapter ? "Auth client detected. Complete a real login to verify the session." : "Login check blocked: connect the Supabase/auth client first.");
  };

  window.helperCheckPayments = async function () {
    helperState.paymentStatus = { label: "Checking backend", detail: "Contacting the health endpoint...", tone: "warn" };
    updateStatusCard("stripe", helperState.paymentStatus);
    if (window.location.protocol === "file:") {
      helperState.paymentStatus = { label: "Requires deployment", detail: "Stripe APIs cannot run from file preview.", tone: "warn" };
      updateStatusCard("stripe", helperState.paymentStatus);
      showHelperToast("Use Vercel or vercel dev to test the payment backend.");
      return;
    }
    try {
      var response = await fetch("/api/health", { headers: { "Accept": "application/json" } });
      if (!response.ok) throw new Error("Health endpoint unavailable");
      helperState.paymentStatus = { label: "Backend reachable", detail: "Health passed; complete a Stripe test checkout before launch.", tone: "good" };
      showHelperToast("Backend is reachable. Stripe configuration still requires a test checkout.");
    } catch (error) {
      helperState.paymentStatus = { label: "Backend unavailable", detail: "Payment APIs could not be reached from this environment.", tone: "bad" };
      showHelperToast("Payment backend check failed.");
    }
    updateStatusCard("stripe", helperState.paymentStatus);
  };

  window.helperReviewPwa = async function () {
    var hasManifest = Boolean(document.querySelector("link[rel='manifest']"));
    var hasSupport = "serviceWorker" in navigator;
    var registration = null;
    if (hasSupport && navigator.serviceWorker.getRegistration) {
      try { registration = await navigator.serviceWorker.getRegistration(); } catch (error) { registration = null; }
    }
    var status = hasManifest && registration
      ? { label: "Registration found", detail: "Manifest and active service worker registration detected.", tone: "good" }
      : { label: "Not ready", detail: "Add and verify both a manifest and service worker registration.", tone: "warn" };
    updateStatusCard("pwa", status);
    showHelperToast(hasManifest && registration ? "PWA structure detected." : "PWA review found missing manifest or service worker registration.");
  };

  window.helperOpenCourses = function () {
    helperState.currentView = "courses";
    renderNavigation();
    if (originalActions.showLevelHub) {
      originalActions.showLevelHub();
      return;
    }
    showHelperToast("Course route is not available in this build.");
  };

  window.helperOpenProgress = function () {
    helperState.currentView = "progress";
    renderNavigation();
    if (originalActions.showProgress) {
      originalActions.showProgress();
      return;
    }
    showHelperToast("Progress route is not available in this build.");
  };

  window.showCreatorAcademyHelper = function () {
    if (helperState.session || helperState.preview) renderDashboard();
    else renderAuth();
  };

  function install() {
    installShell();
    window.showHome = window.showCreatorAcademyHelper;
    restoreSession();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();

  // Older layers use delayed startup repairs; keep the helper as the final home surface.
  window.setTimeout(function () { window.showHome = window.showCreatorAcademyHelper; }, 700);
  window.setTimeout(function () { window.showHome = window.showCreatorAcademyHelper; if (helperState.currentView === "auth") renderAuth(); }, 2800);
}());
