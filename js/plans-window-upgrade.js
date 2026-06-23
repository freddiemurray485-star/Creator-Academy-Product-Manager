/* Creator Academy Hub — Upgraded Plans Window */
(function () {
	"use strict";

	const PLAN_STORAGE = "creatorAcademy.selectedPlanWindowFilter";

	const PLAN_GROUPS = {
		core: "Core Plans",
		advanced: "Advanced Plans",
		lifetime: "Lifetime Options"
	};

	const PLANS = [
		{
			id: "free",
			group: "core",
			name: "Free",
			subtitle: "Start the academy, complete briefing, view structure, and test the learning flow.",
			badges: ["Starter"],
			price: "£0",
			priceNote: "forever",
			options: [{ id: "free", label: "Free Access", price: "£0", note: "Basic access and preview mode." }],
			features: [
				"Academy briefing",
				"Starter progress tracking",
				"Course previews",
				"Portfolio planning preview"
			],
			cta: "Use Free"
		},
		{
			id: "plus",
			group: "core",
			name: "Plus",
			subtitle: "Best for early learners who want the first paid course unlocks and basic progression.",
			badges: ["Monthly"],
			price: "£9.99",
			priceNote: "per month",
			options: [{ id: "plus", label: "Plus Monthly", price: "£9.99/mo", note: "Early course access and core progression." }],
			features: [
				"Unlock early course levels",
				"XP and course progress",
				"Guided lesson structure",
				"Basic portfolio evidence"
			],
			cta: "Choose Plus"
		},
		{
			id: "elite",
			group: "core",
			name: "Elite",
			subtitle: "A stronger learning tier for users who want more serious creator training and evidence.",
			badges: ["Monthly"],
			price: "Elite",
			priceNote: "monthly",
			options: [{ id: "elite", label: "Elite Monthly", price: "Monthly", note: "More course access and evidence structure." }],
			features: [
				"More course levels unlocked",
				"Better coursework/evidence flow",
				"Project and portfolio guidance",
				"UI, Studio, Lua, and asset pathways"
			],
			cta: "Choose Elite"
		},
		{
			id: "pro",
			group: "advanced",
			name: "Pro",
			subtitle: "For committed learners building real systems, UI flows, assets, and publishable project evidence.",
			badges: ["Advanced"],
			price: "Pro",
			priceNote: "monthly",
			options: [{ id: "pro", label: "Pro Monthly", price: "Monthly", note: "Advanced levels and serious project work." }],
			features: [
				"Advanced course access",
				"Scholarly-density sublessons",
				"Portfolio case studies",
				"System design and production workflows"
			],
			cta: "Choose Pro"
		},
		{
			id: "proplus",
			group: "advanced",
			name: "Pro+",
			subtitle: "Premium creator route. Opens as monthly or lifetime so buyers clearly choose the right access.",
			badges: ["Popular", "Monthly or Lifetime"],
			price: "Pro+",
			priceNote: "choose option",
			options: [
				{ id: "proplus", label: "Pro+ Monthly", price: "Monthly", note: "Premium monthly creator access." },
				{ id: "proplus_lifetime", label: "Pro+ Lifetime", price: "£334", note: "One-time lifetime Pro+ access." }
			],
			features: [
				"Premium course access",
				"High-density coursework",
				"Portfolio and launch preparation",
				"Production-grade creator workflow"
			],
			cta: "Choose Pro+",
			featured: true
		},
		{
			id: "platinum",
			group: "advanced",
			name: "Platinum",
			subtitle: "Highest monthly access route for users who want the broadest academy access before lifetime ownership.",
			badges: ["Top Monthly"],
			price: "Platinum",
			priceNote: "choose option",
			options: [
				{ id: "platinum", label: "Platinum Monthly", price: "Monthly", note: "Top recurring access tier." },
				{ id: "platinum_lifetime", label: "Platinum Lifetime", price: "£549.99", note: "One-time highest lifetime access." }
			],
			features: [
				"Highest access tier",
				"Specialist levels and advanced routes",
				"Launch, portfolio, security, backend and strategy sections",
				"Lifetime option available inside the plan"
			],
			cta: "Choose Platinum",
			premium: true
		}
	];

	function escapeHtml(value) {
		return String(value ?? "").replace(/[&<>"']/g, function (char) {
			return {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;"
			}[char];
		});
	}

	function app() {
		return document.getElementById("app");
	}

	function toast(message) {
		if (typeof showToast === "function") showToast(message);
		else console.log(message);
	}

	function currentFilter() {
		return localStorage.getItem(PLAN_STORAGE) || "all";
	}

	function setFilter(filter) {
		localStorage.setItem(PLAN_STORAGE, filter);
		showPlans();
	}

	function visiblePlans() {
		const filter = currentFilter();

		if (filter === "all") return PLANS;
		if (filter === "lifetime") return PLANS.filter(plan => plan.options.some(opt => opt.id.includes("lifetime")));
		return PLANS.filter(plan => plan.group === filter);
	}

	function optionName(optionId) {
		const plan = PLANS.find(p => p.options.some(o => o.id === optionId));
		const option = plan && plan.options.find(o => o.id === optionId);
		return option ? option.label : optionId;
	}

	function getSelectedOption(plan) {
		const checked = document.querySelector(`input[name="planx-${plan.id}"]:checked`);
		return checked ? checked.value : plan.options[0].id;
	}

	function renderTabs() {
		const f = currentFilter();
		const tabs = [
			["all", "All"],
			["core", "Core"],
			["advanced", "Advanced"],
			["lifetime", "Lifetime"]
		];

		return `
			<div class="planx-tabs">
				${tabs.map(tab => `
					<button type="button" class="${f === tab[0] ? "active" : ""}" onclick="planxSetFilter('${tab[0]}')">${tab[1]}</button>
				`).join("")}
			</div>
		`;
	}

	function renderPlan(plan) {
		const defaultOption = plan.options[0].id;
		const classes = [
			"planx-card",
			plan.featured ? "featured" : "",
			plan.premium ? "premium" : ""
		].filter(Boolean).join(" ");

		return `
			<div class="${classes}">
				<div class="planx-badge-row">
					${plan.badges.map(badge => `<span class="planx-badge ${badge.toLowerCase().includes("lifetime") || badge.toLowerCase().includes("top") ? "gold" : ""}">${escapeHtml(badge)}</span>`).join("")}
				</div>

				<div>
					<h3>${escapeHtml(plan.name)}</h3>
					<p class="planx-subtitle">${escapeHtml(plan.subtitle)}</p>
				</div>

				<div class="planx-price">
					<strong>${escapeHtml(plan.price)}</strong>
					<span>${escapeHtml(plan.priceNote)}</span>
				</div>

				<div class="planx-choice-box">
					${plan.options.map((option, index) => `
						<label class="planx-choice ${index === 0 ? "active" : ""}" onclick="planxMarkActiveChoice(this)">
							<input type="radio" name="planx-${plan.id}" value="${escapeHtml(option.id)}" ${option.id === defaultOption ? "checked" : ""}>
							<span>
								<strong>${escapeHtml(option.label)}</strong>
								<small>${escapeHtml(option.note)}</small>
							</span>
							<span class="planx-choice-price">${escapeHtml(option.price)}</span>
						</label>
					`).join("")}
				</div>

				<ul class="planx-features">
					${plan.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join("")}
				</ul>

				<div class="planx-card-actions">
					<button type="button" data-stripe-plan-card="true" onclick="planxConfirmFromCard('${escapeHtml(plan.id)}')">${escapeHtml(plan.cta)}</button>
					<div class="planx-secondary-note">Confirmation appears before checkout/access change.</div>
				</div>
			</div>
		`;
	}

	function renderComparison() {
		return `
			<div class="planx-compare">
				<h3>Plan hierarchy clarity</h3>
				<table class="planx-table">
					<thead>
						<tr>
							<th>Access type</th>
							<th>Meaning</th>
							<th>Important rule</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Monthly tiers</td>
							<td>Recurring access for active learners.</td>
							<td>Plus → Elite → Pro → Pro+ → Platinum monthly.</td>
						</tr>
						<tr>
							<td>Lifetime options</td>
							<td>One-time access options shown inside their plan.</td>
							<td>Pro+ Lifetime stays inside Pro+. Platinum Lifetime stays inside Platinum.</td>
						</tr>
						<tr>
							<td>Pro+ Lifetime</td>
							<td>Premium one-time Pro+ access.</td>
							<td>It is not visually buried under normal monthly tiers.</td>
						</tr>
						<tr>
							<td>Platinum Lifetime</td>
							<td>Highest lifetime access option.</td>
							<td>Priced separately and shown clearly as lifetime.</td>
						</tr>
					</tbody>
				</table>
			</div>
		`;
	}

	function renderFaq() {
		return `
			<div class="planx-compare">
				<h3>Buyer clarity</h3>
				<div class="planx-faq">
					<details>
						<summary>Why are monthly and lifetime inside the same plan?</summary>
						<p>Because the buyer should first choose the plan level, then choose how they want to pay for that level.</p>
					</details>
					<details>
						<summary>Why is Pro+ not one flat checkout button?</summary>
						<p>Because Pro+ can have monthly or lifetime access. The upgraded window forces the buyer to pick the exact option before checkout.</p>
					</details>
					<details>
						<summary>Why does Platinum not replace Pro+ Lifetime?</summary>
						<p>Because monthly hierarchy and lifetime ownership are separate buying decisions. Pro+ Lifetime remains a strong one-time option, while Platinum is the highest tier.</p>
					</details>
				</div>
			</div>
		`;
	}

	function showPlans() {
		const root = app();
		if (!root) return;

		const plans = visiblePlans();

		root.innerHTML = `
			<section class="panel planx-page">
				<div class="planx-hero">
					<span class="badge">Access Plans</span>
					<h2>Choose Your Academy Access</h2>
					<p>
						Choose the plan level first, then choose monthly or lifetime inside that plan where available.
						This keeps the pricing clear and stops Pro+ Lifetime, Platinum Monthly, and Platinum Lifetime from being visually mixed together.
					</p>

					<div class="planx-trust-row">
						<div class="planx-trust"><span>Structure</span><strong>Plan first, payment type second</strong></div>
						<div class="planx-trust"><span>Checkout</span><strong>Confirmation before payment</strong></div>
						<div class="planx-trust"><span>Access</span><strong>Monthly and lifetime separated</strong></div>
						<div class="planx-trust"><span>Backend</span><strong>Stripe-ready verification flow</strong></div>
					</div>
				</div>

				<div class="planx-toolbar">
					${renderTabs()}
					<div class="planx-hint">
						Showing <strong>${plans.length}</strong> plan cards. Use Lifetime tab to compare one-time options only.
					</div>
				</div>

				<div class="planx-grid">
					${plans.map(renderPlan).join("")}
				</div>

				${renderComparison()}
				${renderFaq()}

				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Back Home</button>
					<button type="button" class="secondary" onclick="showLevelHub()">View Courses</button>
				</div>
			</section>
		`;

		ensureModal();

		try {
			if (typeof setCurrentView === "function") setCurrentView("plans");
		} catch {}
	}

	function ensureModal() {
		if (document.querySelector(".planx-confirm-modal")) return;

		document.body.insertAdjacentHTML("beforeend", `
			<div class="planx-confirm-modal" id="planxConfirmModal" role="dialog" aria-modal="true">
				<div class="planx-confirm-card">
					<h3 id="planxConfirmTitle">Confirm plan</h3>
					<p id="planxConfirmText">Confirm this access choice before continuing.</p>
					<div class="planx-confirm-actions">
						<button type="button" id="planxConfirmContinue">Continue</button>
						<button type="button" class="secondary" onclick="planxCloseConfirm()">Cancel</button>
					</div>
				</div>
			</div>
		`);
	}

	function closeConfirm() {
		document.getElementById("planxConfirmModal")?.classList.remove("visible");
	}

	function confirmFromCard(planId) {
		const plan = PLANS.find(p => p.id === planId);
		if (!plan) return;

		const selected = getSelectedOption(plan);
		confirmPlan(selected);
	}

	function confirmPlan(optionId) {
		ensureModal();

		const modal = document.getElementById("planxConfirmModal");
		const title = document.getElementById("planxConfirmTitle");
		const text = document.getElementById("planxConfirmText");
		const button = document.getElementById("planxConfirmContinue");

		const label = optionName(optionId);

		title.textContent = "Confirm " + label;
		text.textContent =
			"You selected " + label + ". Continue only if this is the access option you want. " +
			"Monthly and lifetime options are separate choices.";

		button.onclick = function () {
			closeConfirm();
			startPlanAction(optionId);
		};

		modal.classList.add("visible");
	}

	function startPlanAction(optionId) {
		optionId = String(optionId || "").trim().toLowerCase();

		if (optionId === "free") {
			try {
				const stateObj = typeof state !== "undefined" ? state : null;
				if (stateObj) {
					stateObj.plan = "free";
					stateObj.briefingComplete = true;
					stateObj.skillTreeUnlocked = true;
					if (typeof saveState === "function") saveState();
				}
			} catch {}

			toast("Free access selected.");
			if (typeof showHome === "function") showHome();
			return;
		}

		// Main Stripe link: this is created in js/backend-checkout.js.
		if (typeof window.goToStripePlan === "function") {
			window.goToStripePlan(optionId);
			return;
		}

		// Secondary Stripe link if backend-checkout exposed the lower-level function.
		if (typeof window.startBackendCheckout === "function") {
			window.startBackendCheckout(optionId).catch(function (error) {
				console.error(error);
				toast(error.message || "Stripe checkout failed.");
			});
			return;
		}

		// Hard fallback: call the Vercel API route directly.
		fetch("/api/create-checkout-session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				plan: optionId,
				learnerId: localStorage.getItem("creatorAcademy.learnerId") || "learner_" + Date.now()
			})
		})
			.then(function (response) {
				return response.json().then(function (data) {
					if (!response.ok || !data.url) {
						throw new Error(data.error || "Stripe checkout is not configured yet.");
					}
					window.location.href = data.url;
				});
			})
			.catch(function (error) {
				console.error(error);
				alert(
					"Stripe checkout is not ready yet.\\n\\n" +
					error.message + "\\n\\n" +
					"Check Vercel Environment Variables: STRIPE_SECRET_KEY and the STRIPE_PRICE_* values."
				);
			});
	}

	function markActiveChoice(label) {
		const parent = label.closest(".planx-choice-box");
		if (!parent) return;

		parent.querySelectorAll(".planx-choice").forEach(item => item.classList.remove("active"));
		label.classList.add("active");

		const input = label.querySelector("input");
		if (input) input.checked = true;
	}

	function install() {
		window.showPlans = showPlans;
		window.openPlans = showPlans;
		window.planxSetFilter = setFilter;
		window.planxConfirmFromCard = confirmFromCard;
		window.planxConfirmPlan = confirmPlan;
		window.planxCloseConfirm = closeConfirm;
		window.planxMarkActiveChoice = markActiveChoice;
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 50);
	setTimeout(install, 300);
	setTimeout(install, 900);
})();
