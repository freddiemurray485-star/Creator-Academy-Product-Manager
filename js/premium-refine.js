/* Creator Academy Hub — Premium Refinement Controller
   Clean, minimal controller layer:
   - Removes duplicate clutter.
   - Normalises wording to Course.
   - Adds premium microinteractions.
   - Preserves all existing core academy logic.
*/

(function () {
	"use strict";

	const PREMIUM_VERSION = "premium-refine-v1";

	function ready(fn) {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", fn);
		} else {
			fn();
		}
	}

	function qs(selector, root = document) {
		return root.querySelector(selector);
	}

	function qsa(selector, root = document) {
		return Array.from(root.querySelectorAll(selector));
	}

	function hasPaidAccess() {
		try {
			if (typeof caIsPaidAccessFixed === "function" && typeof caBestPlanFixed === "function") {
				return caIsPaidAccessFixed(caBestPlanFixed());
			}
			if (typeof hardFixHasPlanAccess === "function") return hardFixHasPlanAccess();
			if (typeof hasPlan === "function") return hasPlan();
		} catch (error) {}
		return false;
	}

	function normaliseNav() {
		const navCourse = qs("#navCourse") || qs("#navLevels");
		if (navCourse) {
			navCourse.textContent = "Course";
			navCourse.id = "navCourse";
			if (typeof showLevelHub === "function") navCourse.onclick = showLevelHub;
		}

		const navHome = qs("#navHome");
		if (navHome && typeof showHome === "function") navHome.onclick = showHome;

		const navAssessments = qs("#navAssessments");
		if (navAssessments && typeof showAssessmentsHub === "function") navAssessments.onclick = showAssessmentsHub;

		const navXP = qs("#navXP");
		if (navXP && typeof showXpDashboard === "function") navXP.onclick = showXpDashboard;

		const navProgress = qs("#navProgress");
		if (navProgress && typeof showProgress === "function") navProgress.onclick = showProgress;
	}

	function cleanPaidHome() {
		if (!hasPaidAccess()) return;

		const app = qs("#app");
		if (!app) return;

		const text = app.textContent || "";
		const isHome = text.includes("Creator Academy Hub") && text.includes("View Progress");

		if (!isHome) return;

		qsa("button", app).forEach(button => {
			const label = button.textContent.trim().toLowerCase();

			if (label === "plans" || label === "choose plan") {
				button.remove();
			}

			if (label === "continue learning" && typeof showLevelHub === "function") {
				button.onclick = showLevelHub;
			}
		});
	}

	function labelCourseWording() {
		qsa("button, h2, h3, span, p").forEach(el => {
			if (el.childElementCount) return;

			const value = el.textContent.trim();
			if (value === "Levels") el.textContent = "Course";
			if (value === "All Levels") el.textContent = "All Course";
		});
	}

	function removeDuplicateNotes() {
		const seen = new Set();

		qsa(".success-note, .warning, .notice, .course-expansion-note, .plan-bypass-note, .lifetime-access-active-note").forEach(el => {
			const key = el.textContent.trim().replace(/\s+/g, " ").slice(0, 140);
			if (!key) return;

			if (seen.has(key)) {
				el.remove();
			} else {
				seen.add(key);
			}
		});
	}

	function addPremiumStateClasses() {
		document.body.classList.add("premium-refined");
		document.body.dataset.refineVersion = PREMIUM_VERSION;

		const plan = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
		if (plan) document.body.dataset.plan = plan;
	}

	function addPointerGlow() {
		qsa(".card, .plan-card, .level-card, .assessment-main-card, .level-workshop-card").forEach(card => {
			if (card.dataset.premiumGlowBound === "true") return;
			card.dataset.premiumGlowBound = "true";

			card.addEventListener("pointermove", event => {
				const rect = card.getBoundingClientRect();
				const x = ((event.clientX - rect.left) / rect.width) * 100;
				const y = ((event.clientY - rect.top) / rect.height) * 100;
				card.style.setProperty("--glow-x", `${x}%`);
				card.style.setProperty("--glow-y", `${y}%`);
			});
		});
	}

	function addSubtleCardGlowCss() {
		if (qs("#premium-card-glow-style")) return;

		const style = document.createElement("style");
		style.id = "premium-card-glow-style";
		style.textContent = `
			.card,
			.plan-card,
			.level-card,
			.assessment-main-card,
			.level-workshop-card {
				background:
					radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 0%), rgba(56,189,248,0.085), transparent 28%),
					linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(8, 13, 29, 0.92)) !important;
			}
		`;
		document.head.appendChild(style);
	}

	function refineOnce() {
		normaliseNav();
		cleanPaidHome();
		labelCourseWording();
		removeDuplicateNotes();
		addPremiumStateClasses();
		addPointerGlow();
		addSubtleCardGlowCss();
	}

	function observeApp() {
		const app = qs("#app");
		if (!app) return;

		const observer = new MutationObserver(() => {
			window.requestAnimationFrame(refineOnce);
		});

		observer.observe(app, {
			childList: true,
			subtree: true
		});
	}

	ready(() => {
		refineOnce();
		observeApp();

		setTimeout(refineOnce, 120);
		setTimeout(refineOnce, 500);
	});
})();


/* Extra bugfix: avoid duplicate Course nav button */
(function () {
	function fixDuplicateCourseNav() {
		const nav = document.querySelector(".nav-actions");
		if (!nav) return;

		const courseButtons = Array.from(nav.querySelectorAll("button")).filter(function(button) {
			return button.textContent.trim().toLowerCase() === "course" || button.id === "navCourse" || button.id === "navLevels";
		});

		courseButtons.forEach(function(button, index) {
			if (index === 0) {
				button.id = "navCourse";
				button.textContent = "Course";
				if (typeof showLevelHub === "function") button.onclick = showLevelHub;
			} else {
				button.remove();
			}
		});
	}

	document.addEventListener("DOMContentLoaded", fixDuplicateCourseNav);
	setTimeout(fixDuplicateCourseNav, 100);
	setTimeout(fixDuplicateCourseNav, 500);
})();
