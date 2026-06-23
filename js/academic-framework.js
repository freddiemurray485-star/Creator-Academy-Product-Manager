/* Creator Academy Hub — Academic Framework Layer
   Purpose: add formal textbook-style structure, official unit language, homework, coursework, exams, and grade criteria.
*/

(function () {
	"use strict";

	const STORAGE_HOMEWORK = "creatorAcademy.homework.v1.";

	const gradeBands = [
		{
			id: "pass",
			name: "Pass",
			range: "50–64%",
			desc: "The learner meets the required outcome with working evidence and basic explanation."
		},
		{
			id: "merit",
			name: "Merit",
			range: "65–79%",
			desc: "The learner shows secure understanding, clear practical work, and useful testing or improvement."
		},
		{
			id: "distinction",
			name: "Distinction",
			range: "80–89%",
			desc: "The learner provides detailed evidence, strong reasoning, refinement, and independent problem solving."
		},
		{
			id: "mastery",
			name: "Mastery",
			range: "90–100%",
			desc: "The learner demonstrates professional-standard judgement, polish, documentation, and extension beyond the minimum."
		}
	];

	const academicDefinitions = {
		unit: "A unit is a formally assessed block of learning with a defined subject focus, learning outcomes, lesson sequence, practical work, homework, coursework, and exam/review criteria.",
		lesson: "A lesson is a single taught learning session inside a unit. It introduces one concept, explains the official definition, gives a practical application, then requires evidence of understanding.",
		level: "A level is a progression stage in the academy. Each level contains a full unit of study and controls what the learner must complete before moving to the next stage.",
		homework: "Homework is independent reinforcement work completed after a lesson. It proves the learner can apply the concept without being carried by the tutorial.",
		coursework: "Coursework is a larger practical assessment that requires build evidence, testing evidence, debugging evidence, and a written reflection.",
		exam: "An exam or review is a formal knowledge check that measures understanding, vocabulary, reasoning, and the learner’s ability to explain decisions."
	};

	function safeCall(fnName, fallback) {
		try {
			if (typeof window[fnName] === "function") return window[fnName];
		} catch (error) {}
		return fallback || function () {};
	}

	function countWordsSafe(text) {
		return String(text || "").trim().split(/\s+/).filter(Boolean).length;
	}

	function getUnitCode(level) {
		const section = level <= 15 ? "S1" : "S2";
		return `CA-${section}-U${String(level).padStart(2, "0")}`;
	}

	function getOfficialUnitTitle(levelDef) {
		return `${getUnitCode(levelDef.level)} — ${levelDef.name}`;
	}

	function renderAcademicRibbon() {
		return `
			<div class="academic-framework-ribbon">
				<div class="academic-framework-tile">
					<span>Academic Model</span>
					<strong>Unit-Based Course</strong>
					<p>Each course level is treated as a formal academy unit with outcomes, lessons, homework, coursework, and exam review.</p>
				</div>
				<div class="academic-framework-tile">
					<span>Assessment Model</span>
					<strong>Evidence-Based Grading</strong>
					<p>Learners are judged by practical build evidence, written reasoning, debugging, testing, reflection, and exam review quality.</p>
				</div>
				<div class="academic-framework-tile">
					<span>Progression Rule</span>
					<strong>One Unit at a Time</strong>
					<p>The learner completes lessons in order, unlocks workshop tasks, submits coursework, then completes exam/review work.</p>
				</div>
			</div>
		`;
	}

	function renderGradeBands() {
		return `
			<div class="grade-band-row">
				${gradeBands.map(band => `
					<div class="grade-band-card ${band.id}">
						<h4>${band.name} <span>${band.range}</span></h4>
						<p>${band.desc}</p>
					</div>
				`).join("")}
			</div>
		`;
	}

	function renderDefinitionsPanel() {
		return `
			<div class="academic-definition-panel">
				<h3>Official Academy Definitions</h3>
				<div class="textbook-grid">
					<div class="textbook-card"><h4>Unit</h4><p>${academicDefinitions.unit}</p></div>
					<div class="textbook-card"><h4>Lesson</h4><p>${academicDefinitions.lesson}</p></div>
					<div class="textbook-card"><h4>Homework</h4><p>${academicDefinitions.homework}</p></div>
					<div class="textbook-card"><h4>Coursework</h4><p>${academicDefinitions.coursework}</p></div>
					<div class="textbook-card"><h4>Exam / Review</h4><p>${academicDefinitions.exam}</p></div>
					<div class="textbook-card"><h4>Level</h4><p>${academicDefinitions.level}</p></div>
				</div>
			</div>
		`;
	}

	function buildLessonDefinition(level, slot) {
		const levelDef = Array.isArray(window.levelDefinitions)
			? window.levelDefinitions.find(item => item.level === level)
			: null;

		const levelName = levelDef ? levelDef.name : `Level ${level}`;
		const title =
			window.levelLessonTemplates &&
			window.levelLessonTemplates[level] &&
			window.levelLessonTemplates[level][slot - 1]
				? window.levelLessonTemplates[level][slot - 1][1]
				: `Lesson ${slot}`;

		return {
			unitCode: getUnitCode(level),
			title,
			levelName,
			officialDefinition:
				`${title} is a focused learning objective inside ${levelName}. In academy terms, it is the taught concept that the learner must define, apply practically, test, and document before the next lesson becomes meaningful.`,
			keyTerms: [
				"concept definition",
				"practical application",
				"testing evidence",
				"debugging evidence",
				"reflection"
			],
			successCriteria: [
				"State the concept in clear technical language.",
				"Apply the concept in a Roblox, UI, animation, asset, system, or business context.",
				"Produce practical evidence rather than only written claims.",
				"Explain at least one problem, limitation, or improvement.",
				"Write notes detailed enough that another learner could understand the process."
			],
			homework:
				`Create an independent mini-task based on ${title}. Write at least 120 words explaining what you attempted, what happened, what failed or changed, and how this connects to ${levelName}.`
		};
	}

	function renderTextbookLessonBlock(level, slot) {
		const data = buildLessonDefinition(level, slot);

		return `
			<div class="academic-definition-panel">
				<span class="unit-code-pill">${data.unitCode}</span>
				<span class="unit-code-pill">Lesson ${slot}</span>
				<h3>Textbook Definition: ${data.title}</h3>
				<p>${data.officialDefinition}</p>

				<div class="textbook-grid">
					<div class="textbook-card">
						<h4>Key Terms</h4>
						<ul>${data.keyTerms.map(term => `<li>${term}</li>`).join("")}</ul>
					</div>
					<div class="textbook-card">
						<h4>Success Criteria</h4>
						<ol>${data.successCriteria.map(item => `<li>${item}</li>`).join("")}</ol>
					</div>
					<div class="textbook-card homework-card">
						<span class="homework-status">Homework</span>
						<h4>Independent Task</h4>
						<p>${data.homework}</p>
					</div>
				</div>

				<div class="academic-quality-note">
					<span class="official-wording">Official evidence standard:</span>
					a complete lesson should include definition, practical attempt, result, issue/fix, and reflection. One-word answers or repeated filler should not count.
				</div>
			</div>
		`;
	}

	function homeworkKey(level, slot) {
		return `${STORAGE_HOMEWORK}${level}:${slot}`;
	}

	function renderHomeworkPanel(level, slot) {
		const saved = localStorage.getItem(homeworkKey(level, slot)) || "";

		return `
			<div class="academic-definition-panel">
				<h3>Homework Submission</h3>
				<p>Homework is not the same as coursework. Homework reinforces one lesson. Coursework assesses the full unit/level.</p>
				<textarea id="academicHomeworkText" placeholder="Write your independent homework evidence here...">${saved}</textarea>
				<div class="actions">
					<button type="button" onclick="saveAcademicHomework(${level}, ${slot})">Save Homework</button>
					<button type="button" class="secondary" onclick="markAcademicHomeworkComplete(${level}, ${slot})">Mark Homework Complete</button>
				</div>
				<div id="academicHomeworkStatus" class="academic-quality-note">
					Words: ${countWordsSafe(saved)}. Recommended minimum: 120 words.
				</div>
			</div>
		`;
	}

	window.saveAcademicHomework = function (level, slot) {
		const box = document.getElementById("academicHomeworkText");
		if (!box) return;

		localStorage.setItem(homeworkKey(level, slot), box.value.trim());

		const status = document.getElementById("academicHomeworkStatus");
		if (status) {
			status.textContent = `Saved. Words: ${countWordsSafe(box.value)}. Recommended minimum: 120 words.`;
		}

		if (typeof showToast === "function") showToast("Homework saved.");
	};

	window.markAcademicHomeworkComplete = function (level, slot) {
		const box = document.getElementById("academicHomeworkText");
		const text = box ? box.value.trim() : "";

		if (countWordsSafe(text) < 80) {
			if (typeof showToast === "function") showToast("Homework needs more detail first.");
			return;
		}

		localStorage.setItem(`${homeworkKey(level, slot)}.complete`, "true");

		if (typeof awardOnce === "function") {
			awardOnce(`homework:${level}:${slot}`, 90, `Completed Level ${level} Lesson ${slot} homework`, "detailXp");
		} else if (typeof awardXpOnce === "function") {
			awardXpOnce(`homework:${level}:${slot}`, 90, `Completed Level ${level} Lesson ${slot} homework`);
		}

		if (typeof showToast === "function") showToast("Homework complete.");
	};

	function injectLessonAcademicBlocks(level, slot) {
		const panel = document.querySelector(".detail-panel, .expanded-lesson-card, .panel");
		if (!panel || panel.querySelector(".academic-definition-panel")) return;

		const actions = panel.querySelector(".actions");
		const html = renderTextbookLessonBlock(level, slot) + renderHomeworkPanel(level, slot);

		if (actions) {
			actions.insertAdjacentHTML("beforebegin", html);
		} else {
			panel.insertAdjacentHTML("beforeend", html);
		}
	}

	function enhanceOpenLesson() {
		const original =
			typeof window.openLesson === "function"
				? window.openLesson
				: typeof window.openLevelLesson === "function"
					? window.openLevelLesson
					: null;

		if (!original || original.__academicEnhanced) return;

		const enhanced = function (level, slot) {
			original.apply(this, arguments);
			setTimeout(() => injectLessonAcademicBlocks(level, slot), 40);
		};

		enhanced.__academicEnhanced = true;

		if (typeof window.openLesson === "function") window.openLesson = enhanced;
		if (typeof window.openLevelLesson === "function") window.openLevelLesson = enhanced;
	}

	function enhanceCourseHub() {
		const original = typeof window.showLevelHub === "function" ? window.showLevelHub : null;
		if (!original || original.__academicEnhanced) return;

		window.showLevelHub = function () {
			original.apply(this, arguments);

			const panel = document.querySelector(".panel");
			if (!panel || panel.querySelector(".academic-framework-ribbon")) return;

			const header = panel.querySelector(".course-header, .page-head");
			const html = renderAcademicRibbon() + renderDefinitionsPanel() + `
				<div class="academic-definition-panel">
					<h3>Grade Bands</h3>
					<p>These grade bands are academy standards used to judge lesson evidence, homework, coursework, exams, and final gates.</p>
					${renderGradeBands()}
				</div>
			`;

			if (header) {
				header.insertAdjacentHTML("afterend", html);
			} else {
				panel.insertAdjacentHTML("afterbegin", html);
			}
		};

		window.showLevelHub.__academicEnhanced = true;
	}

	function renderHomeworkHub() {
		const rows = [];
		const definitions = Array.isArray(window.levelDefinitions) ? window.levelDefinitions : [];

		definitions.forEach(level => {
			for (let slot = 1; slot <= 20; slot++) {
				const saved = localStorage.getItem(homeworkKey(level.level, slot));
				const complete = localStorage.getItem(`${homeworkKey(level.level, slot)}.complete`) === "true";
				if (saved || complete || slot <= 3) {
					rows.push(`
						<div class="card homework-card ${complete ? "complete" : ""}">
							<span class="unit-code-pill">${getUnitCode(level.level)}</span>
							<h3>Lesson ${slot} Homework</h3>
							<p>${level.name}</p>
							<p>${complete ? "Complete" : saved ? "Started" : "Not started"}</p>
							<div class="actions">
								<button type="button" onclick="openLevelLesson ? openLevelLesson(${level.level}, ${slot}) : openLesson(${level.level}, ${slot})">Open Lesson</button>
							</div>
						</div>
					`);
				}
			}
		});

		return `
			<section class="panel">
				<div class="page-head">
					<div>
						<span class="badge">Homework</span>
						<h2>Independent Homework</h2>
						<p>Homework is the independent practice layer between lessons and coursework. It proves the learner can apply one concept without simply copying the lesson.</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="showAssessmentsHub ? showAssessmentsHub() : showAssessments()">Assessments</button>
					</div>
				</div>

				${renderAcademicRibbon()}

				<div class="academic-definition-panel">
					<h3>Official Homework Standard</h3>
					<p>${academicDefinitions.homework}</p>
					<ul>
						<li>Minimum recommended written evidence: 120 words.</li>
						<li>Must include what was attempted, what happened, and what should improve.</li>
						<li>Can include screenshots, notes, code extracts, or design explanation.</li>
						<li>Does not replace coursework; it prepares for coursework.</li>
					</ul>
				</div>

				<div class="grid">
					${rows.join("") || `<div class="card"><h3>No Homework Started</h3><p>Open a lesson and complete the Homework Submission section.</p></div>`}
				</div>
			</section>
		`;
	}

	window.showAcademicHomeworkHub = function () {
		if (typeof hardFixApplyPlanAccess === "function" && !hardFixApplyPlanAccess()) {
			if (typeof showPlans === "function") showPlans();
			return;
		}

		const app = document.getElementById("app");
		if (!app) return;

		app.innerHTML = renderHomeworkHub();

		if (typeof setCurrentView === "function") setCurrentView("homework");
		if (typeof hideNotesButton === "function") hideNotesButton();
	};

	function enhanceAssessments() {
		const names = ["showAssessmentsHub", "showAssessments"];
		names.forEach(fnName => {
			const original = typeof window[fnName] === "function" ? window[fnName] : null;
			if (!original || original.__academicEnhanced) return;

			window[fnName] = function () {
				original.apply(this, arguments);

				const panel = document.querySelector(".panel");
				if (!panel) return;

				const grid = panel.querySelector(".grid, .assessment-main-grid");
				if (grid && !grid.querySelector(".academic-homework-entry")) {
					grid.insertAdjacentHTML("beforeend", `
						<button type="button" class="card homework-card academic-homework-entry" onclick="showAcademicHomeworkHub()">
							<span class="homework-status">Homework</span>
							<h3>Homework</h3>
							<p>Independent lesson practice completed between taught lessons and formal coursework.</p>
							<ul>
								<li>Lesson reinforcement</li>
								<li>Independent practice</li>
								<li>Evidence preparation</li>
								<li>XP for detailed work</li>
							</ul>
						</button>
					`);
				}

				if (!panel.querySelector(".academic-definition-panel")) {
					const header = panel.querySelector(".page-head, .course-header");
					const html = renderDefinitionsPanel() + `
						<div class="academic-definition-panel">
							<h3>Assessment Grade Bands</h3>
							<p>Coursework, homework, and exams use the same evidence-quality language so the learner understands what a high-grade answer needs.</p>
							${renderGradeBands()}
						</div>
					`;
					if (header) header.insertAdjacentHTML("afterend", html);
				}
			};

			window[fnName].__academicEnhanced = true;
		});
	}

	function enhanceExams() {
		const original = typeof window.openExam === "function" ? window.openExam : null;
		if (!original || original.__academicEnhanced) return;

		window.openExam = function (level) {
			original.apply(this, arguments);

			const panel = document.querySelector(".detail-panel, .exam-panel, .panel");
			if (!panel || panel.querySelector(".exam-grade-badge")) return;

			const insertion = `
				<div class="academic-definition-panel">
					<span class="exam-grade-badge">Formal Exam / Review Standard</span>
					<h3>Official Exam Definition</h3>
					<p>${academicDefinitions.exam}</p>
					<p>A strong exam answer uses accurate vocabulary, explains cause and effect, connects theory to practical work, and gives a justified improvement.</p>
					${renderGradeBands()}
				</div>
			`;

			const textarea = panel.querySelector("textarea");
			if (textarea) textarea.insertAdjacentHTML("beforebegin", insertion);
			else panel.insertAdjacentHTML("beforeend", insertion);
		};

		window.openExam.__academicEnhanced = true;
	}

	function enhanceCourseworkGate() {
		const original = typeof window.openLevelGate === "function" ? window.openLevelGate : typeof window.openGateForm === "function" ? window.openGateForm : null;
		if (!original || original.__academicEnhanced) return;

		const enhanced = function (level) {
			original.apply(this, arguments);

			const panel = document.querySelector(".detail-panel, .level-gate-panel, .panel");
			if (!panel || panel.querySelector(".coursework-official-standard")) return;

			const html = `
				<div class="academic-definition-panel coursework-official-standard">
					<span class="unit-code-pill">${getUnitCode(level)}</span>
					<h3>Official Coursework Standard</h3>
					<p>${academicDefinitions.coursework}</p>
					<ul>
						<li><strong>Build Evidence:</strong> what was created, changed, designed, scripted, animated, or planned.</li>
						<li><strong>Testing Evidence:</strong> how the work was checked and what results were found.</li>
						<li><strong>Debug Evidence:</strong> what broke, why it happened, and how it was fixed or improved.</li>
						<li><strong>Reflection:</strong> what the learner understands now and what would be improved next.</li>
					</ul>
					${renderGradeBands()}
				</div>
			`;

			const actions = panel.querySelector(".actions");
			if (actions) actions.insertAdjacentHTML("beforebegin", html);
			else panel.insertAdjacentHTML("beforeend", html);
		};

		enhanced.__academicEnhanced = true;

		if (typeof window.openLevelGate === "function") window.openLevelGate = enhanced;
		if (typeof window.openGateForm === "function") window.openGateForm = enhanced;
	}

	function patchNow() {
		enhanceOpenLesson();
		enhanceCourseHub();
		enhanceAssessments();
		enhanceExams();
		enhanceCourseworkGate();
	}

	function ready(fn) {
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
		else fn();
	}

	ready(function () {
		patchNow();
		setTimeout(patchNow, 150);
		setTimeout(patchNow, 600);
	});
})();
