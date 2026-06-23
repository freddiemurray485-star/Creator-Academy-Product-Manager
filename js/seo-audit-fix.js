/* SEO Audit Fix Layer */
(function () {
	"use strict";

	function ensureMeta(selector, createTag) {
		if (!document.head.querySelector(selector)) {
			document.head.insertAdjacentHTML("beforeend", createTag);
		}
	}

	function setCanonical() {
		let link = document.head.querySelector('link[rel="canonical"]');
		if (!link) {
			link = document.createElement("link");
			link.rel = "canonical";
			document.head.appendChild(link);
		}
		link.href = "https://www.freddiemurray.co.uk/";
	}

	function addStaticReadableContent() {
		const app = document.getElementById("app");
		if (!app || app.querySelector(".seo-content-panel")) return;

		const isHome = app.textContent.includes("Creator Academy Hub");
		if (!isHome) return;

		const panel = app.querySelector(".panel");
		if (!panel) return;

		panel.insertAdjacentHTML("beforeend", `
			<section class="seo-content-panel" aria-label="Creator Academy overview">
				<h3>Structured Creator Academy for Roblox and Digital Creation</h3>
				<p>
					Creator Academy Hub teaches Roblox Studio, Roblox Lua scripting, Blender asset creation,
					Moon Animator, user interface design, visual effects, publishing, testing, monetisation and
					creator business fundamentals. Learners progress through course sections, detailed sublessons,
					homework, coursework, exam reviews, XP tracking and practical evidence tasks.
				</p>
				<ul>
					<li>Course Section 1 covers foundation-to-mastery creator skills.</li>
					<li>Course Section 2 covers specialist creator systems, analytics, security, portfolio and launch strategy.</li>
					<li>Assessment includes homework, coursework, exams, grading criteria and evidence-based progression.</li>
				</ul>
			</section>
		`);
	}

	function cleanTitle() {
		document.title = "Creator Academy Hub | Roblox Training";
	}

	function run() {
		cleanTitle();
		setCanonical();
		ensureMeta('meta[name="description"]', '<meta name="description" content="Learn Roblox Studio, Lua, Blender, UI, VFX and creator business with structured lessons, homework, exams and XP.">');
		ensureMeta('meta[name="robots"]', '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">');
		addStaticReadableContent();
	}

	document.addEventListener("DOMContentLoaded", run);
	setTimeout(run, 100);
	setTimeout(run, 700);

	const app = document.getElementById("app");
	if (app) {
		new MutationObserver(function () {
			window.requestAnimationFrame(run);
		}).observe(app, { childList: true, subtree: true });
	}
})();
