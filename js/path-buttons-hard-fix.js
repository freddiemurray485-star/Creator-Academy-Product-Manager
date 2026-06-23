/* Path Buttons Hard Fix
   Forces Open Path cards to open the filtered course-level view instead of the old mini lesson tree.
*/
(function () {
	"use strict";

	const PATHS = {
		studio: ["studio", "roblox studio", "studio basics", "explorer", "workspace"],
		lua: ["lua", "roblox lua", "scripting", "script"],
		blender: ["blender", "asset", "mesh", "3d"],
		moon: ["moon", "moon animator", "animation", "animator"]
	};

	function normalise(text) {
		return String(text || "").toLowerCase();
	}

	function detectFromText(text) {
		const t = normalise(text);

		if (t.includes("moon animator") || t.includes("moon")) return "moon";
		if (t.includes("blender")) return "blender";
		if (t.includes("roblox lua") || /\blua\b/.test(t)) return "lua";
		if (t.includes("roblox studio") || t.includes("studio basics") || t.includes("studio")) return "studio";

		return null;
	}

	function detectFromOnclick(value) {
		const raw = String(value || "");
		const match = raw.match(/openCourse\(['"]([^'"]+)['"]\)/) || raw.match(/showPathCourseFilter\(['"]([^'"]+)['"]\)/);

		if (!match) return null;

		const id = normalise(match[1]);
		return PATHS[id] ? id : null;
	}

	function findPathId(button) {
		const fromOnclick = detectFromOnclick(button.getAttribute("onclick"));
		if (fromOnclick) return fromOnclick;

		const card =
			button.closest(".info-card") ||
			button.closest(".path-card") ||
			button.closest(".polished-path-card") ||
			button.closest(".card") ||
			button.parentElement;

		const text = (card ? card.textContent : button.textContent) || "";
		return detectFromText(text);
	}

	function openFiltered(pathId) {
		if (!pathId) return false;

		if (typeof window.showPathCourseFilter === "function") {
			window.showPathCourseFilter(pathId);
			return true;
		}

		if (typeof showPathCourseFilter === "function") {
			showPathCourseFilter(pathId);
			return true;
		}

		console.warn("showPathCourseFilter is not available yet.");
		return false;
	}

	function patchButtons() {
		document.querySelectorAll("button").forEach(function (button) {
			const label = normalise(button.textContent).trim();
			const onclick = button.getAttribute("onclick") || "";
			const isPathButton =
				label === "open path" ||
				button.classList.contains("path-card") ||
				button.classList.contains("polished-path-card") ||
				onclick.includes("openCourse(");

			if (!isPathButton) return;

			const pathId = findPathId(button);
			if (!pathId) return;

			button.dataset.fixedPathButton = pathId;
			button.setAttribute("onclick", "showPathCourseFilter('" + pathId + "')");
			button.onclick = function (event) {
				event.preventDefault();
				event.stopPropagation();
				openFiltered(pathId);
				return false;
			};
		});
	}

	// Capture click before old inline onclick can run.
	document.addEventListener("click", function (event) {
		const button = event.target.closest && event.target.closest("button");
		if (!button) return;

		const label = normalise(button.textContent).trim();
		const onclick = button.getAttribute("onclick") || "";

		const shouldHandle =
			label === "open path" ||
			button.classList.contains("path-card") ||
			button.classList.contains("polished-path-card") ||
			onclick.includes("openCourse(");

		if (!shouldHandle) return;

		const pathId = findPathId(button);
		if (!pathId) return;

		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		openFiltered(pathId);
	}, true);

	document.addEventListener("DOMContentLoaded", patchButtons);
	setTimeout(patchButtons, 100);
	setTimeout(patchButtons, 400);
	setTimeout(patchButtons, 1000);

	const app = document.getElementById("app");
	if (app) {
		new MutationObserver(function () {
			window.requestAnimationFrame(patchButtons);
		}).observe(app, { childList: true, subtree: true });
	}
})();
