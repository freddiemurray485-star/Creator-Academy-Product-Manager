/* Path-filtered Courses
   Opens old Skill Tree path cards into the Course/Level system, filtered by the selected subject.
*/
(function () {
	"use strict";

	const PATH_FILTERS = {
		studio: {
			id: "studio",
			title: "Roblox Studio Basics",
			shortTitle: "Studio",
			keywords: ["roblox studio basics", "studio basics", "roblox studio", "studio", "workspace", "explorer", "building"]
		},
		lua: {
			id: "lua",
			title: "Roblox Lua",
			shortTitle: "Lua",
			keywords: ["roblox lua", "lua", "scripting", "script", "scripts", "remoteevents", "modulescripts", "backend"]
		},
		blender: {
			id: "blender",
			title: "Blender",
			shortTitle: "Blender",
			keywords: ["blender", "asset", "assets", "3d", "modelling", "modeling", "models"]
		},
		moon: {
			id: "moon",
			title: "Moon Animator",
			shortTitle: "Moon Animator",
			keywords: ["moon animator", "moon", "animation", "keyframes", "animate", "animator"]
		}
	};

	function safe(value) {
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

	function getState() {
		try { return state; } catch (error) { return null; }
	}

	function getDefinitions() {
		try {
			if (Array.isArray(levelDefinitions)) return levelDefinitions;
		} catch (error) {}

		return [];
	}

	function getCompletion(level) {
		try {
			if (typeof getLevelLessonCompletion === "function") return getLevelLessonCompletion(level);
		} catch (error) {}

		return { complete: 0, total: 20, percent: 0 };
	}

	function levelUnlocked(level) {
		try {
			if (typeof isLevelUnlocked === "function") return isLevelUnlocked(level);
		} catch (error) {}

		return true;
	}

	function levelGateComplete(level) {
		try {
			if (typeof isLevelGateComplete === "function") return isLevelGateComplete(level);
		} catch (error) {}

		return false;
	}

	function currentLevel() {
		try {
			if (typeof getCurrentLevel === "function") return getCurrentLevel();
		} catch (error) {}

		return 1;
	}

	function planNameForLevel(level) {
		try {
			const requiredPlan = levelPlanRequirements[level] || "free";
			return plans && plans[requiredPlan] ? plans[requiredPlan].name : requiredPlan;
		} catch (error) {
			return "Plan";
		}
	}

	function hasAccess() {
		try {
			if (typeof caBugfixApplyAccess === "function") return caBugfixApplyAccess();
			if (typeof hardFixApplyPlanAccess === "function") return hardFixApplyPlanAccess();
			if (typeof hasPlan === "function") return hasPlan();
		} catch (error) {}

		return true;
	}

	function normalize(text) {
		return String(text || "").toLowerCase();
	}

	function levelMatchesPath(levelDef, filter) {
		const courses = Array.isArray(levelDef.courses) ? levelDef.courses : [];
		const haystack = normalize([
			levelDef.name,
			levelDef.focus,
			levelDef.outcome,
			courses.join(" ")
		].join(" "));

		return filter.keywords.some(function (keyword) {
			return haystack.includes(keyword);
		});
	}

	function getMatchedCourses(levelDef, filter) {
		const courses = Array.isArray(levelDef.courses) ? levelDef.courses : [];

		return courses.map(function (course) {
			const match = filter.keywords.some(function (keyword) {
				return normalize(course).includes(keyword);
			});

			return { name: course, match };
		});
	}

	function filteredLevels(filterId) {
		const filter = PATH_FILTERS[filterId] || PATH_FILTERS.lua;
		return getDefinitions().filter(function (levelDef) {
			return levelMatchesPath(levelDef, filter);
		});
	}

	function renderFilteredCard(levelDef, filter) {
		const progress = getCompletion(levelDef.level);
		const unlocked = levelUnlocked(levelDef.level);
		const complete = levelGateComplete(levelDef.level);
		const current = currentLevel() === levelDef.level;
		const courses = getMatchedCourses(levelDef, filter);

		let status = "Locked";
		let className = "locked";

		if (complete) {
			status = "Complete";
			className = "complete";
		} else if (unlocked) {
			status = current ? "Current Level" : "Unlocked";
			className = "current";
		}

		return `
			<div class="level-card filtered-level-card ${className}">
				<span class="filtered-match-badge">${safe(filter.title)} match</span>
				<span class="level-status">${safe(status)}</span>

				<h3>Level ${levelDef.level}: ${safe(levelDef.name)}</h3>
				<p>${safe(levelDef.focus)}</p>

				<div class="level-meta-row">
					<span class="level-pill">20 lessons</span>
					<span class="level-pill">Hard practical gate</span>
					<span class="level-pill">${safe(planNameForLevel(levelDef.level))}</span>
				</div>

				<div class="filtered-course-tags">
					${courses.map(function (course) {
						return `<span class="${course.match ? "match" : ""}">${safe(course.name)}</span>`;
					}).join("")}
				</div>

				<div class="level-progress-bar">
					<div class="level-progress-fill" style="width: ${progress.percent}%"></div>
				</div>

				<p><strong>${progress.complete}/${progress.total}</strong> lesson slots complete</p>

				<div class="actions">
					<button type="button" ${unlocked ? "" : "disabled"} onclick="openLevel(${levelDef.level})">
						${complete ? "Review Level" : "Open Level"}
					</button>
				</div>
			</div>
		`;
	}

	function renderPathTabs(activeId) {
		return `
			<div class="path-filter-tabs">
				${Object.keys(PATH_FILTERS).map(function (id) {
					const filter = PATH_FILTERS[id];
					return `<button type="button" class="${id === activeId ? "active" : "secondary"}" onclick="showPathCourseFilter('${id}')">${safe(filter.shortTitle)}</button>`;
				}).join("")}
			</div>
		`;
	}

	function showPathCourseFilter(filterId) {
		const app = getApp();
		if (!app) return;

		const st = getState();

		if (st) {
			st.briefingComplete = true;
			st.skillTreeUnlocked = true;
			try {
				if (typeof saveState === "function") saveState();
			} catch (error) {}
		}

		if (!hasAccess()) {
			if (typeof showPlans === "function") showPlans();
			return;
		}

		const filter = PATH_FILTERS[filterId] || PATH_FILTERS.lua;
		const matches = filteredLevels(filter.id);
		const all = getDefinitions();
		const totalLessons = matches.length * 20;
		const completedLessons = matches.reduce(function (sum, levelDef) {
			return sum + getCompletion(levelDef.level).complete;
		}, 0);

		app.innerHTML = `
			<section class="panel path-course-panel">
				<div class="path-filter-hero">
					<span class="badge">Filtered Course Path</span>
					<h2>${safe(filter.title)} Course Route</h2>
					<p>
						This path only shows Course levels that include <strong>${safe(filter.title)}</strong>.
						If a level includes other course types as well, it still appears because it contains this path.
					</p>

					${renderPathTabs(filter.id)}
				</div>

				<div class="path-filter-summary">
					<div class="path-filter-stat">
						<span>Matching levels</span>
						<strong>${matches.length}</strong>
					</div>
					<div class="path-filter-stat">
						<span>Lesson slots shown</span>
						<strong>${totalLessons}</strong>
					</div>
					<div class="path-filter-stat">
						<span>Completed slots</span>
						<strong>${completedLessons}</strong>
					</div>
					<div class="path-filter-stat">
						<span>Total academy levels</span>
						<strong>${all.length}</strong>
					</div>
				</div>

				<div class="course-header">
					<div>
						<span class="badge">${safe(filter.shortTitle)}</span>
						<h3>Matching Course Levels</h3>
						<p>Open a level to view its lessons. The highlighted tags show why the level belongs in this path.</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="openSkillTree()">Path Hub</button>
						<button type="button" class="secondary" onclick="showLevelHub()">All Courses</button>
					</div>
				</div>

				${matches.length ? `
					<div class="level-grid">
						${matches.map(function (levelDef) {
							return renderFilteredCard(levelDef, filter);
						}).join("")}
					</div>
				` : `
					<div class="path-empty-state">
						No matching levels found for this path yet. Add the course tag to a level's <code>courses</code> list to make it appear here.
					</div>
				`}
			</section>
		`;

		try {
			if (typeof setCurrentView === "function") setCurrentView("pathCourseFilter:" + filter.id);
			if (typeof forceAddExitRow === "function") forceAddExitRow();
		} catch (error) {}
	}

	function detectPathFromCard(button) {
		const card = button.closest(".card, .path-card, .course-card, .panel, div") || button.parentElement;
		const text = normalize((card && card.textContent) || button.textContent || "");

		if (text.includes("studio")) return "studio";
		if (text.includes("lua")) return "lua";
		if (text.includes("blender")) return "blender";
		if (text.includes("moon")) return "moon";

		return null;
	}

	function patchPathButtons() {
		const buttons = Array.from(document.querySelectorAll("button"));

		buttons.forEach(function (button) {
			const label = normalize(button.textContent).trim();

			if (label !== "open path") return;

			const pathId = detectPathFromCard(button);
			if (!pathId) return;

			button.dataset.pathCourseFilter = pathId;
			button.onclick = function (event) {
				event.preventDefault();
				showPathCourseFilter(pathId);
				return false;
			};
		});
	}

	function patchOldPathFunctions() {
		const names = ["openPath", "openCourse", "openCoursePath", "showPath", "showCoursePath"];

		names.forEach(function (name) {
			const original = window[name];

			if (typeof original === "function" && !original.__pathFilterWrapped) {
				const wrapped = function (pathId) {
					const id = normalize(pathId);

					if (PATH_FILTERS[id]) {
						showPathCourseFilter(id);
						return;
					}

					return original.apply(this, arguments);
				};

				wrapped.__pathFilterWrapped = true;
				window[name] = wrapped;
			}
		});
	}

	function install() {
		window.showPathCourseFilter = showPathCourseFilter;
		window.openFilteredCoursePath = showPathCourseFilter;
		patchOldPathFunctions();
		patchPathButtons();
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 80);
	setTimeout(install, 300);
	setTimeout(install, 900);

	const app = document.getElementById("app");
	if (app) {
		new MutationObserver(function () {
			window.requestAnimationFrame(install);
		}).observe(app, { childList: true, subtree: true });
	}
})();
