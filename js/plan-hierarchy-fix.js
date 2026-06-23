/*
  Creator Academy Hub — final plan hierarchy/access fix.
  Purpose:
  - Make Platinum behave like the highest public paid tier, not another plan-page loop.
  - Keep Admin hidden/internal and above every paid plan.
  - Ensure all plan gates use one clear rank table.
*/
(function () {
  "use strict";

  var PLAN_RANKS = {
    free: 0,
    plus: 1,
    elite: 2,
    pro: 3,
    proplus: 4,
    proplus_lifetime: 5,
    platinum: 6,
    platinum_lifetime: 7,
    admin: 99
  };

  var PLAN_COPY = {
    free: {
      name: "Free",
      publicName: "Free",
      label: "Free Access",
      group: "core",
      price: "£0",
      priceNote: "forever",
      badge: "Preview",
      description: "Starter preview access. Use this to inspect the academy structure, briefing, and learning flow before choosing a paid rank.",
      features: ["Academy briefing", "Course previews", "Local progress preview", "Portfolio planning preview"]
    },
    plus: {
      name: "Plus",
      publicName: "Plus",
      label: "Plus Monthly",
      group: "core",
      price: "£9.99",
      priceNote: "per month",
      badge: "Foundation",
      description: "Entry paid tier for early Roblox creators who want structured learning beyond previews.",
      features: ["Early foundation levels", "XP and lesson progress", "Homework/evidence workflow", "Starter Roblox Studio and Lua route"]
    },
    elite: {
      name: "Elite",
      publicName: "Elite",
      label: "Elite Monthly",
      group: "core",
      price: "Elite",
      priceNote: "monthly",
      badge: "Builder",
      description: "A stronger foundation tier for learners who want more serious course access and better evidence building.",
      features: ["More foundation access", "Stronger coursework structure", "Project evidence guidance", "Studio, Lua, UI, and asset pathways"]
    },
    pro: {
      name: "Pro",
      publicName: "Pro",
      label: "Pro Monthly",
      group: "advanced",
      price: "Pro",
      priceNote: "monthly",
      badge: "Advanced",
      description: "Advanced creator training for learners building real Roblox systems, UI flows, assets, and portfolio pieces.",
      features: ["Advanced systems lessons", "Scholarly-density sublessons", "Portfolio case-study work", "Production workflow training"]
    },
    proplus: {
      name: "Pro+",
      publicName: "Pro+",
      label: "Pro+ Monthly",
      group: "advanced",
      price: "Pro+",
      priceNote: "monthly",
      badge: "Premium",
      description: "Premium monthly creator route for learners who want higher-density training and serious production preparation.",
      features: ["Premium course access", "High-density coursework", "Portfolio and launch preparation", "Roblox production workflow"]
    },
    proplus_lifetime: {
      name: "Pro+ Lifetime",
      publicName: "Pro+ Lifetime",
      label: "Pro+ Lifetime",
      group: "lifetime",
      price: "£334",
      priceNote: "one-time",
      badge: "Lifetime",
      description: "One-time Pro+ access for learners who want strong premium access without monthly billing.",
      features: ["Everything in Pro+ Monthly", "No monthly billing", "Long-term Pro+ access", "Best for committed Pro+ learners"]
    },
    platinum: {
      name: "Platinum",
      publicName: "Platinum",
      label: "Platinum Monthly",
      group: "advanced",
      price: "Platinum",
      priceNote: "monthly",
      badge: "Highest Monthly",
      description: "Highest public monthly rank. Platinum should unlock every paid monthly gate and all lower public tiers.",
      features: ["Highest monthly access", "Specialist Roblox creator routes", "Advanced security/backend/launch sections", "All lower monthly tiers included"]
    },
    platinum_lifetime: {
      name: "Platinum Lifetime",
      publicName: "Platinum Lifetime",
      label: "Platinum Lifetime",
      group: "lifetime",
      price: "£549.99",
      priceNote: "one-time",
      badge: "Highest Paid",
      description: "Highest public paid access overall. Platinum Lifetime is the top buyer rank below hidden internal Admin.",
      features: ["Everything in Platinum Monthly", "Highest public course access", "All lower paid ranks included", "One-time lifetime access"]
    },
    admin: {
      name: "Admin",
      publicName: "Admin",
      label: "Internal Admin",
      group: "internal",
      price: "Hidden",
      priceNote: "internal only",
      badge: "Internal",
      description: "Hidden owner/developer rank. Admin is above Platinum Lifetime but is not a public purchasable plan.",
      features: ["Internal testing", "Full gate bypass", "Owner/developer tools", "Not shown as a paid plan"]
    }
  };

  var PLAN_OPTIONS = [
    { id: "free", card: "free" },
    { id: "plus", card: "plus" },
    { id: "elite", card: "elite" },
    { id: "pro", card: "pro" },
    { id: "proplus", card: "proplus" },
    { id: "proplus_lifetime", card: "proplus" },
    { id: "platinum", card: "platinum" },
    { id: "platinum_lifetime", card: "platinum" }
  ];

  var CARDS = [
    { id: "free", title: "Free", options: ["free"] },
    { id: "plus", title: "Plus", options: ["plus"] },
    { id: "elite", title: "Elite", options: ["elite"] },
    { id: "pro", title: "Pro", options: ["pro"] },
    { id: "proplus", title: "Pro+", options: ["proplus", "proplus_lifetime"] },
    { id: "platinum", title: "Platinum", options: ["platinum", "platinum_lifetime"] }
  ];

  function normalisePlan(value) {
    value = String(value || "").trim().toLowerCase();
    var aliases = {
      "none": "",
      "basic": "free",
      "starter": "free",
      "pro+": "proplus",
      "pro plus": "proplus",
      "pro-plus": "proplus",
      "pro+ monthly": "proplus",
      "pro plus monthly": "proplus",
      "proplus monthly": "proplus",
      "pro+ lifetime": "proplus_lifetime",
      "pro plus lifetime": "proplus_lifetime",
      "proplus lifetime": "proplus_lifetime",
      "proplus-lifetime": "proplus_lifetime",
      "platinum monthly": "platinum",
      "platinum-monthly": "platinum",
      "platinum lifetime": "platinum_lifetime",
      "platinum-lifetime": "platinum_lifetime",
      "platinum plus lifetime": "platinum_lifetime",
      "owner": "admin",
      "internal admin": "admin",
      "internal_admin": "admin"
    };
    if (aliases[value] !== undefined) return aliases[value];
    return value.replace(/\s+/g, "_").replace(/\+/g, "plus").replace(/-/g, "_");
  }

  function safeGet(key) {
    try { return localStorage.getItem(key) || ""; } catch (error) { return ""; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (error) { /* ignore */ }
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try { window.showToast(message); return; } catch (error) { /* fall through */ }
    }
    console.log(message);
  }

  function getStoredPlan() {
    var keys = [
      "creatorAcademy.plan",
      "creatorAcademy.entitlementPlan",
      "academyPlan",
      "creatorAcademy.currentPlan",
      "creatorAcademy.selectedPlan",
      "creatorAcademy.localFilePreviewPlan"
    ];

    var candidates = [];
    for (var i = 0; i < keys.length; i++) {
      var value = normalisePlan(safeGet(keys[i]));
      if (PLAN_RANKS[value] !== undefined) candidates.push(value);
    }

    if (typeof window.state === "object" && window.state) {
      var statePlan = normalisePlan(window.state.plan);
      if (PLAN_RANKS[statePlan] !== undefined) candidates.push(statePlan);
    }

    var best = "";
    var bestRank = -1;
    candidates.forEach(function (plan) {
      var rank = PLAN_RANKS[plan];
      if (rank > bestRank) {
        best = plan;
        bestRank = rank;
      }
    });
    return best;
  }

  function currentPlan() {
    if (typeof window.caLocalAdminRankIsActive === "function" && window.caLocalAdminRankIsActive()) return "admin";
    var stored = getStoredPlan();
    return stored || "";
  }

  function rankOf(plan) {
    plan = normalisePlan(plan);
    return PLAN_RANKS[plan] !== undefined ? PLAN_RANKS[plan] : -1;
  }

  function isPaid(plan) {
    plan = normalisePlan(plan);
    return rankOf(plan) >= rankOf("plus");
  }

  function hasPlan() {
    return isPaid(currentPlan()) || currentPlan() === "admin";
  }

  function syncPlan(plan) {
    plan = normalisePlan(plan);
    if (PLAN_RANKS[plan] === undefined) return;
    safeSet("creatorAcademy.plan", plan);
    safeSet("academyPlan", plan);
    safeSet("creatorAcademy.currentPlan", plan);
    safeSet("creatorAcademy.selectedPlan", plan);
    if (typeof window.state === "object" && window.state) {
      window.state.plan = plan;
      if (plan !== "free") {
        window.state.briefingComplete = true;
        window.state.skillTreeUnlocked = true;
      }
    }
    if (typeof window.saveState === "function") {
      try { window.saveState(); } catch (error) { /* ignore */ }
    }
  }

  function mutateLegacyPlans() {
    try {
      if (typeof plans === "undefined") return;
      Object.keys(PLAN_COPY).forEach(function (id) {
        if (!plans[id]) plans[id] = {};
        var copy = PLAN_COPY[id];
        plans[id].name = copy.name;
        plans[id].publicName = copy.publicName;
        plans[id].description = copy.description;
        plans[id].features = copy.features.slice();
        plans[id].rank = PLAN_RANKS[id];
      });
    } catch (error) {
      console.warn("Plan hierarchy copy patch skipped", error);
    }

    try {
      if (typeof planOrder !== "undefined" && Array.isArray(planOrder)) {
        planOrder.length = 0;
        ["free", "plus", "elite", "pro", "proplus", "proplus_lifetime", "platinum", "platinum_lifetime", "admin"].forEach(function (id) {
          planOrder.push(id);
        });
      }
    } catch (error) { /* ignore */ }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>\"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function planName(plan) {
    plan = normalisePlan(plan);
    return PLAN_COPY[plan] ? PLAN_COPY[plan].name : (plan || "No plan");
  }

  function isCurrentOrIncluded(optionId, activePlan) {
    if (!activePlan) return false;
    return rankOf(activePlan) >= rankOf(optionId);
  }

  function visibleCards(filter) {
    if (filter === "lifetime") return CARDS.filter(function (card) { return card.options.some(function (id) { return id.indexOf("lifetime") !== -1; }); });
    if (filter === "advanced") return CARDS.filter(function (card) { return ["pro", "proplus", "platinum"].indexOf(card.id) !== -1; });
    if (filter === "core") return CARDS.filter(function (card) { return ["free", "plus", "elite"].indexOf(card.id) !== -1; });
    return CARDS;
  }

  function currentFilter() {
    return safeGet("creatorAcademy.planHierarchyFilter") || "all";
  }

  function setFilter(filter) {
    safeSet("creatorAcademy.planHierarchyFilter", filter || "all");
    renderPlansPage();
  }

  function actionLabel(optionId, activePlan) {
    if (optionId === "free") return activePlan === "free" ? "Current Preview" : "Use Free Preview";
    if (activePlan === optionId) return "Current Plan";
    if (isCurrentOrIncluded(optionId, activePlan)) return "Included in " + planName(activePlan);
    return "Choose " + PLAN_COPY[optionId].label;
  }

  function renderOption(optionId, activePlan) {
    var meta = PLAN_COPY[optionId];
    var rank = rankOf(optionId);
    var current = activePlan === optionId;
    var included = isCurrentOrIncluded(optionId, activePlan) && !current;
    var disabled = current || included || activePlan === "admin";
    var className = ["planh-option", current ? "current" : "", included ? "included" : "", optionId.indexOf("platinum") === 0 ? "platinum" : ""].filter(Boolean).join(" ");
    return [
      '<div class="' + className + '">',
      '<div class="planh-option-main">',
      '<strong>' + escapeHtml(meta.label) + '</strong>',
      '<small>Rank ' + rank + ' • ' + escapeHtml(meta.description) + '</small>',
      '</div>',
      '<div class="planh-option-price"><strong>' + escapeHtml(meta.price) + '</strong><span>' + escapeHtml(meta.priceNote) + '</span></div>',
      '<button type="button" ' + (disabled ? 'disabled aria-disabled="true"' : '') + ' onclick="caPlanHierarchyChoose(\'' + escapeHtml(optionId) + '\')">' + escapeHtml(actionLabel(optionId, activePlan)) + '</button>',
      '</div>'
    ].join("");
  }

  function renderCard(card, activePlan) {
    var topOption = card.options[card.options.length - 1];
    var meta = PLAN_COPY[card.id];
    var cardRanks = card.options.map(rankOf);
    var bestRank = Math.max.apply(Math, cardRanks);
    var activeInCard = card.options.indexOf(activePlan) !== -1;
    var includedByHigher = activePlan && rankOf(activePlan) > bestRank;
    var classes = [
      "planh-card",
      card.id === "platinum" ? "platinum" : "",
      card.id === "proplus" ? "proplus" : "",
      activeInCard ? "active-card" : "",
      includedByHigher ? "included-card" : ""
    ].filter(Boolean).join(" ");

    var featureSource = PLAN_COPY[topOption] || meta;
    return [
      '<article class="' + classes + '">',
      '<div class="planh-badge-row"><span class="planh-badge">' + escapeHtml(meta.badge) + '</span><span class="planh-rank">Up to rank ' + bestRank + '</span></div>',
      '<h3>' + escapeHtml(card.title) + '</h3>',
      '<p class="planh-description">' + escapeHtml(meta.description) + '</p>',
      '<div class="planh-options">' + card.options.map(function (optionId) { return renderOption(optionId, activePlan); }).join("") + '</div>',
      '<ul class="planh-features">' + featureSource.features.map(function (feature) { return '<li>' + escapeHtml(feature) + '</li>'; }).join("") + '</ul>',
      '</article>'
    ].join("");
  }

  function renderStatus(activePlan) {
    var rank = rankOf(activePlan);
    if (!activePlan) {
      return [
        '<div class="planh-status needs-plan">',
        '<div><span>No active paid rank</span><strong>Choose a plan to unlock the academy properly.</strong></div>',
        '<button type="button" onclick="caPlanHierarchyChoose(\'plus\')">Start with Plus</button>',
        '</div>'
      ].join("");
    }

    var highest = activePlan === "admin" || activePlan === "platinum_lifetime" || activePlan === "platinum";
    return [
      '<div class="planh-status ' + (highest ? 'top-access' : 'paid-access') + '">',
      '<div>',
      '<span>Current access</span>',
      '<strong>' + escapeHtml(planName(activePlan)) + ' active</strong>',
      '<p>Rank ' + rank + '. ' + (highest ? 'You should not be trapped on the Access Plans page.' : 'Higher plans are optional upgrades, not required to continue if your current lesson gate is covered.') + '</p>',
      '</div>',
      '<div class="planh-status-actions">',
      '<button type="button" onclick="caPlanHierarchyGoCourse()">Continue Learning</button>',
      '<button type="button" class="secondary" onclick="showHome()">Home</button>',
      '</div>',
      '</div>'
    ].join("");
  }

  function renderTabs(filter) {
    var tabs = [
      ["all", "All Plans"],
      ["core", "Core"],
      ["advanced", "Advanced"],
      ["lifetime", "Lifetime"]
    ];
    return '<div class="planh-tabs">' + tabs.map(function (tab) {
      return '<button type="button" class="' + (filter === tab[0] ? 'active' : '') + '" onclick="caPlanHierarchySetFilter(\'' + tab[0] + '\')">' + tab[1] + '</button>';
    }).join("") + '</div>';
  }

  function renderPlansPage() {
    mutateLegacyPlans();
    var root = document.getElementById("app");
    if (!root) return;

    var activePlan = currentPlan();
    var filter = currentFilter();
    var cards = visibleCards(filter);

    root.innerHTML = [
      '<section class="panel planh-page">',
      '<div class="planh-hero">',
      '<span class="badge">Access Plans</span>',
      '<h2>Choose the right academy rank</h2>',
      '<p>Hierarchy is now strict: Free → Plus → Elite → Pro → Pro+ → Pro+ Lifetime → Platinum → Platinum Lifetime → hidden Admin. Platinum is the highest public paid plan family; Admin is internal only.</p>',
      '</div>',
      renderStatus(activePlan),
      '<div class="planh-toolbar">' + renderTabs(filter) + '<p>Showing <strong>' + cards.length + '</strong> plan cards. Current rank: <strong>' + escapeHtml(activePlan ? planName(activePlan) : 'None') + '</strong>.</p></div>',
      '<div class="planh-grid">' + cards.map(function (card) { return renderCard(card, activePlan); }).join("") + '</div>',
      '<div class="planh-compare">',
      '<h3>Hierarchy rules</h3>',
      '<div class="planh-rules">',
      '<div><strong>Platinum Monthly</strong><span>Highest public monthly rank. It includes all lower monthly access.</span></div>',
      '<div><strong>Platinum Lifetime</strong><span>Highest public paid rank overall. It includes every public plan below it.</span></div>',
      '<div><strong>Admin</strong><span>Hidden owner/developer rank. It must never appear as a public checkout plan.</span></div>',
      '</div>',
      '</div>',
      '<div class="actions"><button type="button" onclick="caPlanHierarchyGoCourse()">View Courses</button><button type="button" class="secondary" onclick="showHome()">Back Home</button></div>',
      '</section>'
    ].join("");

    try { if (typeof window.setCurrentView === "function") window.setCurrentView("plans"); } catch (error) { /* ignore */ }
  }

  function choosePlan(optionId) {
    optionId = normalisePlan(optionId);
    var active = currentPlan();

    if (!PLAN_COPY[optionId] || optionId === "admin") {
      toast("Invalid public plan.");
      return false;
    }

    if (active === optionId || rankOf(active) > rankOf(optionId)) {
      toast(planName(optionId) + " is already included in " + planName(active) + ".");
      renderPlansPage();
      return false;
    }

    if (optionId === "free") {
      syncPlan("free");
      toast("Free preview selected.");
      if (typeof window.showHome === "function") window.showHome();
      return true;
    }

    if (typeof window.goToStripePlan === "function") {
      window.goToStripePlan(optionId);
      return true;
    }

    if (typeof window.startBackendCheckout === "function") {
      window.startBackendCheckout(optionId).catch(function (error) {
        console.error(error);
        toast(error.message || "Checkout failed.");
      });
      return true;
    }

    toast("Checkout is not available yet. Use Vercel deployment or File Explorer local preview.");
    return false;
  }

  function goCourse() {
    if (typeof window.showLevelHub === "function") {
      window.showLevelHub();
      return;
    }
    if (typeof window.openSkillTree === "function") {
      window.openSkillTree();
      return;
    }
    if (typeof window.showHome === "function") window.showHome();
  }

  function applyAccessClasses() {
    var active = currentPlan();
    var paid = hasPlan();
    if (paid) {
      document.body.classList.add("ca-paid-access", "ca-plan-hierarchy-active");
      document.body.classList.remove("ca-free-access", "beginner-locked");
      if (rankOf(active) >= rankOf("platinum")) document.body.classList.add("ca-top-paid-access");
    } else {
      document.body.classList.remove("ca-top-paid-access");
    }
  }

  function installOverrides() {
    mutateLegacyPlans();

    window.caPlanRanks = Object.assign({}, PLAN_RANKS);
    window.caPlanCopy = Object.assign({}, PLAN_COPY);
    window.caNormalisePlanId = normalisePlan;
    window.caGetActivePlan = currentPlan;
    window.caPlanHierarchySetFilter = setFilter;
    window.caPlanHierarchyChoose = choosePlan;
    window.caPlanHierarchyGoCourse = goCourse;

    window.getCurrentPlan = function () { return currentPlan(); };
    window.getCurrentPlanRank = function () { return rankOf(currentPlan()); };
    window.hasPlan = function () { return hasPlan(); };
    window.isPaidOrAdminPlan = function (planId) { return isPaid(normalisePlan(planId)) || normalisePlan(planId) === "admin"; };
    window.planMeetsRequirement = function (requiredPlan) {
      requiredPlan = normalisePlan(requiredPlan || "free");
      if (requiredPlan === "" || requiredPlan === "free") return true;
      var active = currentPlan();
      if (active === "admin") return true;
      return rankOf(active) >= rankOf(requiredPlan);
    };
    window.showPlans = renderPlansPage;
    window.openPlans = renderPlansPage;

    applyAccessClasses();
  }

  function startupRepair() {
    installOverrides();
    applyAccessClasses();

    var active = currentPlan();
    if (active && rankOf(active) >= rankOf("platinum")) {
      if (typeof window.state === "object" && window.state) {
        window.state.plan = active;
        window.state.briefingComplete = true;
        window.state.skillTreeUnlocked = true;
      }
      syncPlan(active);
    }
  }

  installOverrides();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startupRepair, { once: true });
  } else {
    startupRepair();
  }
  setTimeout(startupRepair, 100);
  setTimeout(startupRepair, 600);
  setTimeout(startupRepair, 1400);
  setTimeout(startupRepair, 2500);
}());
