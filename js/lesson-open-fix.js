/* Creator Academy Hub — Lesson Open Final Fix
   Fixes Course lessons not opening after academic/premium patches.
   This file loads last and restores openLevelLesson(level, slot).
*/

(function () {
	"use strict";

	function safeText(value, fallback) {
		return String(value || fallback || "");
	}

	function htmlEscape(value) {
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

	function getApp() {
		return document.getElementById("app");
	}

	function getLevelDef(level) {
		if (Array.isArray(window.levelDefinitions)) {
			return window.levelDefinitions.find(function (item) {
				return Number(item.level) === Number(level);
			}) || window.levelDefinitions[level - 1];
		}

		return {
			level: level,
			name: "Course Level " + level,
			focus: "Course lesson progression.",
			outcome: "Complete the lesson and produce evidence.",
			gateTitle: "Final Practical",
			gateRequirements: []
		};
	}

	function getSlotData(level, slot) {
		if (typeof window.getLevelSlot === "function") {
			try {
				return window.getLevelSlot(level, slot);
			} catch (error) {}
		}

		const template =
			window.levelLessonTemplates &&
			window.levelLessonTemplates[level] &&
			window.levelLessonTemplates[level][slot - 1]
				? window.levelLessonTemplates[level][slot - 1]
				: [null, "Course Lesson " + slot];

		return {
			realLessonId: template[0],
			title: template[1],
			level: level,
			slot: slot
		};
	}

	function levelLessonComplete(level, slot) {
		if (typeof window.isLevelLessonComplete === "function") {
			try {
				return window.isLevelLessonComplete(level, slot);
			} catch (error) {}
		}

		return localStorage.getItem("creatorAcademy.levelLesson." + level + "." + slot) === "true";
	}

	function markLevelLesson(level, slot) {
		if (typeof window.markLevelLessonComplete === "function") {
			try {
				window.markLevelLessonComplete(level, slot);
				return;
			} catch (error) {}
		}

		localStorage.setItem("creatorAcademy.levelLesson." + level + "." + slot, "true");
	}

	function levelUnlocked(level) {
		if (typeof window.isLevelUnlocked === "function") {
			try {
				return window.isLevelUnlocked(level);
			} catch (error) {}
		}

		return true;
	}

	function hasPaidAccess() {
		try {
			if (typeof window.caBugfixIsPaid === "function" && typeof window.caBugfixBestPlan === "function") {
				return window.caBugfixIsPaid(window.caBugfixBestPlan());
			}
			if (typeof window.caIsPaidAccessFixed === "function" && typeof window.caBestPlanFixed === "function") {
				return window.caIsPaidAccessFixed(window.caBestPlanFixed());
			}
			if (typeof window.hardFixApplyPlanAccess === "function") {
				return window.hardFixApplyPlanAccess();
			}
			if (typeof window.hasPlan === "function") {
				return window.hasPlan();
			}
		} catch (error) {}

		return true;
	}

	function getUnitCode(level) {
		const section = level <= 15 ? "S1" : "S2";
		return "CA-" + section + "-U" + String(level).padStart(2, "0");
	}

	function getAcademicDetail(level, slot, title, levelDef) {
		return {
			definition:
				title + " is a formal Course lesson inside " + levelDef.name + ". The learner must understand the concept, apply it practically, test or review the result, and produce useful evidence before progressing.",
			keyTerms: [
				"official definition",
				"practical application",
				"testing evidence",
				"debug/refinement",
				"reflection"
			],
			homework:
				"Complete an independent homework task based on " + title + ". Write what you attempted, what happened, what failed or improved, and how it connects to " + levelDef.name + "."
		};
	}

	function renderRealLessonBlock(data) {
		if (!data.realLessonId || !window.lessons || !window.lessons[data.realLessonId]) return "";

		const lesson = window.lessons[data.realLessonId];
		const path = window.paths && lesson.path ? window.paths[lesson.path] : null;

		return `
			<div class="lesson-block deep-dive">
				<h3>Connected Course Lesson</h3>
				<p><strong>${htmlEscape(path ? path.title : "Course Path")}:</strong> ${htmlEscape(lesson.title || data.title)}</p>
				<p>${htmlEscape(lesson.concept || lesson.summary || "This connected lesson supports the Course level.")}</p>
				${lesson.deepDive ? lesson.deepDive.map(function (paragraph) {
					return `<p>${htmlEscape(paragraph)}</p>`;
				}).join("") : ""}
				${lesson.code ? `<pre><code>${htmlEscape(lesson.code)}</code></pre>` : ""}
			</div>
		`;
	}

	function renderLesson(level, slot) {
		level = Number(level);
		slot = Number(slot);

		const app = getApp();
		if (!app) return;

		if (!hasPaidAccess()) {
			if (typeof window.showPlans === "function") window.showPlans();
			return;
		}

		if (!levelUnlocked(level)) {
			if (typeof window.showToast === "function") {
				window.showToast("Course level locked. Complete previous gates or upgrade access.");
			}
			if (typeof window.showLevelHub === "function") window.showLevelHub();
			return;
		}

		if (slot > 1 && !levelLessonComplete(level, slot - 1)) {
			if (typeof window.showToast === "function") {
				window.showToast("Complete the previous lesson first.");
			}
			if (typeof window.openLevel === "function") window.openLevel(level, "lessons");
			return;
		}

		const data = getSlotData(level, slot);
		const levelDef = getLevelDef(level);
		const academic = getAcademicDetail(level, slot, data.title, levelDef);
		const complete = levelLessonComplete(level, slot);

		app.innerHTML = `
			<section class="panel">
				<div class="lesson-card detail-panel fixed-course-lesson">
					<div class="lesson-topline">
						<p>${getUnitCode(level)} • Course Level ${level} • Lesson ${slot}</p>
						<span class="badge">${complete ? "Complete" : "Course Lesson"}</span>
					</div>

					<h2>${htmlEscape(data.title)}</h2>
					<p>${htmlEscape(academic.definition)}</p>

					<div class="academic-definition-panel">
						<span class="unit-code-pill">${getUnitCode(level)}</span>
						<span class="unit-code-pill">Lesson ${slot}</span>
						<h3>Textbook Definition</h3>
						<p>${htmlEscape(academic.definition)}</p>

						<div class="textbook-grid">
							<div class="textbook-card">
								<h4>Key Terms</h4>
								<ul>
									${academic.keyTerms.map(function (term) {
										return `<li>${htmlEscape(term)}</li>`;
									}).join("")}
								</ul>
							</div>

							<div class="textbook-card">
								<h4>Success Criteria</h4>
								<ol>
									<li>Explain the lesson concept clearly.</li>
									<li>Apply the concept in a Roblox, UI, animation, asset, business, or systems context.</li>
									<li>Produce practical evidence, not only a short written claim.</li>
									<li>Identify one issue, limitation, or improvement.</li>
									<li>Write enough detail that the work can be reviewed.</li>
								</ol>
							</div>

							<div class="textbook-card homework-card">
								<span class="homework-status">Homework</span>
								<h4>Independent Task</h4>
								<p>${htmlEscape(academic.homework)}</p>
							</div>
						</div>
					</div>

					${renderRealLessonBlock(data)}

					<div class="lesson-block practical-lab">
						<h3>Practical Task</h3>
						<p>Complete one focused practical task for: <strong>${htmlEscape(data.title)}</strong>.</p>
						<ul>
							<li>Build, script, model, animate, design, test, or document something connected to this lesson.</li>
							<li>Record what worked.</li>
							<li>Record one problem, fix, or improvement.</li>
							<li>Prepare evidence for the level gate.</li>
						</ul>
					</div>

					<div class="lesson-block">
						<h3>Course Unit Link</h3>
						<p><strong>${htmlEscape(levelDef.name)}:</strong> ${htmlEscape(levelDef.focus || levelDef.outcome || "This lesson contributes to the current Course unit.")}</p>
					</div>

					<div class="actions">
						<button type="button" class="secondary" onclick="openLevel(${level}, 'lessons')">Back to Lessons</button>
						<button type="button" class="green" onclick="completeLevelSlot(${level}, ${slot})">${complete ? "Already Complete" : "Mark Lesson Complete"}</button>
					</div>
				</div>
			</section>
		`;

		if (typeof window.setCurrentView === "function") window.setCurrentView("levelLesson");
		if (typeof window.forceAddExitRow === "function") window.forceAddExitRow();
		if (typeof window.showNotesButton === "function") window.showNotesButton(data.title);
	}

	function completeSlot(level, slot) {
		level = Number(level);
		slot = Number(slot);

		markLevelLesson(level, slot);

		if (typeof window.awardOnce === "function") {
			window.awardOnce("lesson:" + level + ":" + slot, 40, "Completed Course Level " + level + " Lesson " + slot, "lessons");
		} else if (typeof window.awardXpOnce === "function") {
			window.awardXpOnce("lesson:" + level + ":" + slot, 40, "Completed Course Level " + level + " Lesson " + slot);
		}

		if (typeof window.showToast === "function") {
			window.showToast("Lesson complete.");
		}

		if (typeof window.openLevel === "function") {
			window.openLevel(level, "lessons");
		}
	}

	function patchLessonButtons() {
		document.querySelectorAll("button.lesson-slot-card, .lesson-slot-grid button").forEach(function (button) {
			const raw = button.getAttribute("onclick") || "";
			const match = raw.match(/openLevelLesson\((\d+),\s*(\d+)\)/);

			if (match) {
				const level = Number(match[1]);
				const slot = Number(match[2]);
				button.onclick = function (event) {
					event.preventDefault();
					renderLesson(level, slot);
					return false;
				};
			}
		});
	}

	function install() {
		window.openLevelLesson = renderLesson;
		window.caOpenCourseLesson = renderLesson;
		window.completeLevelSlot = completeSlot;

		patchLessonButtons();
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 50);
	setTimeout(install, 200);
	setTimeout(install, 700);

	const app = document.getElementById("app");
	if (app) {
		const observer = new MutationObserver(function () {
			window.requestAnimationFrame(install);
		});

		observer.observe(app, {
			childList: true,
			subtree: true
		});
	}
})();
