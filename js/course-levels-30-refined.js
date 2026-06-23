/* Creator Academy Hub — 30 Level Progression Refinement
   Fixes level names/descriptions so Level 25 is not labelled as the final academy ending.
   Level 30 is now the true final thesis/capstone.
*/
(function () {
	"use strict";

	const LEVELS = [
		{
			level: 1,
			name: "Studio Setup and Spatial Fundamentals",
			focus: "Roblox Studio interface, Explorer hierarchy, Properties panel, camera control, Workspace organisation, basic parts, anchoring, collision, and Play testing.",
			outcome: "Learner can navigate Studio, organise a clean place file, build a simple training room, test it, and explain where important objects belong.",
			courses: ["Roblox Studio Basics"],
			gateTitle: "Studio Foundation Practical",
			gateRequirements: [
				"Build a small organised training room.",
				"Use clear names and folders in Explorer.",
				"Use at least 20 parts or objects with deliberate properties.",
				"Explain Workspace, StarterGui, ReplicatedStorage, and ServerScriptService at beginner level.",
				"Run Play testing and document two fixes."
			]
		},
		{
			level: 2,
			name: "Lua Logic and Programming Foundations",
			focus: "Variables, data types, assignment, comparisons, if statements, functions, parameters, return values, tables, print debugging, and beginner code reading.",
			outcome: "Learner can read and write basic Luau logic without confusing assignment, equality, variables, strings, booleans, or function calls.",
			courses: ["Roblox Lua"],
			gateTitle: "Lua Logic Practical",
			gateRequirements: [
				"Write a working script using variables, conditions, functions, and tables.",
				"Explain every important line in plain English.",
				"Use Output debugging to prove the script runs.",
				"Create and fix at least two beginner logic mistakes.",
				"Submit a short code explanation and evidence."
			]
		},
		{
			level: 3,
			name: "Interactive Parts and Event Systems",
			focus: "Touched events, ClickDetectors/ProximityPrompts, button behaviour, reusable part creation, basic state changes, debounce thinking, and beginner interaction loops.",
			outcome: "Learner can create simple world interactions that respond to player actions and avoid obvious spam or duplicate-trigger problems.",
			courses: ["Roblox Lua", "Roblox Studio Basics"],
			gateTitle: "Interactive World Practical",
			gateRequirements: [
				"Build an interactive world object such as a button, trigger, door, reward pad, or upgrade plate.",
				"Use at least one event connection.",
				"Use a debounce, cooldown, or state check where needed.",
				"Explain what object touched/clicked/triggered the system.",
				"Document a bug and the fix."
			]
		},
		{
			level: 4,
			name: "UI Foundations and Player Feedback",
			focus: "ScreenGui, Frames, TextLabels, TextButtons, UDim2, layout basics, visible feedback, menus, close/open states, and readable player instructions.",
			outcome: "Learner can build a simple Roblox UI flow that communicates clearly and responds to player input.",
			courses: ["Roblox UI Design", "Roblox Lua"],
			gateTitle: "Basic UI Flow Practical",
			gateRequirements: [
				"Create a UI with at least three connected elements.",
				"Include a clear open/close or continue/back flow.",
				"Use readable labels and feedback messages.",
				"Explain what runs on the client.",
				"Test the UI and fix two clarity issues."
			]
		},
		{
			level: 5,
			name: "Blender Asset Basics for Roblox",
			focus: "Blender navigation, blockout modelling, simple props, scale thinking, clean object names, materials, export awareness, and Roblox import readiness.",
			outcome: "Learner can create a small beginner asset pack and understand why Roblox assets need clean scale, naming, geometry, and testing.",
			courses: ["Blender", "Roblox Studio Basics"],
			gateTitle: "Beginner Asset Pack Practical",
			gateRequirements: [
				"Create or plan at least three related simple assets.",
				"Use clean names and clear asset purpose.",
				"Explain scale, origin/pivot, and material choices.",
				"Prepare the assets for Roblox import/testing.",
				"Submit before/after or progress evidence."
			]
		},
		{
			level: 6,
			name: "Moon Animator and Motion Fundamentals",
			focus: "Moon Animator workflow, keyframes, timeline, timing, spacing, simple object motion, basic character poses, trigger planning, and playback awareness.",
			outcome: "Learner can make simple useful animations and explain how animation timing affects game feel.",
			courses: ["Moon Animator", "Animation", "Roblox Studio Basics"],
			gateTitle: "Motion Fundamentals Practical",
			gateRequirements: [
				"Create a simple object or character animation.",
				"Use clear keyframes and timing choices.",
				"Explain the purpose of the motion.",
				"Plan how the animation would trigger in-game.",
				"Do one polish pass and document the improvement."
			]
		},
		{
			level: 7,
			name: "Button Tycoon and Upgrade Systems",
			focus: "Button-based money flow, price checks, unlock logic, upgrade visibility, tycoon progression, player feedback, and reusable upgrade data.",
			outcome: "Learner can build a simple button-based tycoon system with clear costs, rewards, unlocks, and evidence.",
			courses: ["Roblox Lua", "Game Design Basics", "Roblox Studio Basics"],
			gateTitle: "Button Tycoon Practical",
			gateRequirements: [
				"Build or plan a button-based upgrade loop.",
				"Include price, cash, unlock, and feedback logic.",
				"Use a table/config for at least part of the system.",
				"Explain what prevents invalid buying.",
				"Submit test evidence and improvement notes."
			]
		},
		{
			level: 8,
			name: "RemoteEvents and Client-Server Safety",
			focus: "Client/server boundary, RemoteEvents, server authority, validation, cooldowns, fake request prevention, and secure interaction structure.",
			outcome: "Learner can explain why the client is not trusted and design safer remote-based systems.",
			courses: ["Roblox Lua", "Security", "System Design"],
			gateTitle: "Safe Remote System Practical",
			gateRequirements: [
				"Create or diagram a client-to-server interaction.",
				"Explain what the client asks for and what the server decides.",
				"Validate at least three possible bad inputs.",
				"Include cooldown or rate-limit thinking.",
				"Submit a security review."
			]
		},
		{
			level: 9,
			name: "ModuleScripts and Reusable Architecture",
			focus: "ModuleScripts, shared configuration, reusable functions, item/upgrade data tables, script organisation, maintainability, and cleaner project structure.",
			outcome: "Learner can split messy logic into reusable modules/configs and explain why the structure is easier to maintain.",
			courses: ["Roblox Lua", "System Design"],
			gateTitle: "Reusable System Architecture Practical",
			gateRequirements: [
				"Create or plan a reusable ModuleScript/config system.",
				"Move repeated values or logic into a cleaner structure.",
				"Explain how other scripts use the module/config.",
				"Show before/after organisation.",
				"Document one maintainability improvement."
			]
		},
		{
			level: 10,
			name: "Data, XP, and Progression Basics",
			focus: "Progress tracking, XP logic, lesson completion state, local vs persistent storage thinking, DataStore concepts, backups, and safe progression design.",
			outcome: "Learner can design a basic progression system and explain what should be saved, verified, and recovered.",
			courses: ["Roblox Lua", "Data Systems", "Progression Design"],
			gateTitle: "Progression Data Practical",
			gateRequirements: [
				"Design a simple player/learner data model.",
				"Include XP, completion, unlocks, and plan/access state.",
				"Explain what is temporary vs persistent.",
				"Identify two data-loss or abuse risks.",
				"Submit a progression map."
			]
		},
		{
			level: 11,
			name: "Advanced Game Systems",
			focus: "Quest systems, inventories, progression trees, rewards, cooldowns, badges, unlocks, game loops, and larger gameplay structures.",
			outcome: "Learner can design and prototype bigger gameplay systems instead of one-off scripts.",
			courses: ["Roblox Lua", "Game Design Basics", "System Design"],
			gateTitle: "Advanced Gameplay System Practical",
			gateRequirements: [
				"Plan or build a multi-step gameplay system.",
				"Use structured data/config.",
				"Include progression or unlock logic.",
				"Document abuse/confusion risks.",
				"Submit test evidence and improvements."
			]
		},
		{
			level: 12,
			name: "Economy and Multiplayer Fairness",
			focus: "Money sources, money sinks, reward balance, progression pacing, team/multiplayer fairness, trading risk, inflation, server validation, and anti-abuse rules.",
			outcome: "Learner can reason about fairness and economy balance in multiplayer or progression games.",
			courses: ["Roblox Lua", "Roblox Monetisation", "Game Design Basics"],
			gateTitle: "Economy Balance Practical",
			gateRequirements: [
				"Design an economy or multiplayer system.",
				"Identify money sources and sinks.",
				"Explain fairness and exploit risks.",
				"Adjust one value based on testing/review.",
				"Submit a balance report."
			]
		},
		{
			level: 13,
			name: "Product-Grade UI and UX Systems",
			focus: "Onboarding, dashboards, shops, settings, progress screens, responsive layouts, disabled states, conversion flow, trust signals, and user clarity.",
			outcome: "Learner can design UI that behaves like a real product instead of random buttons.",
			courses: ["Roblox UI Design", "Creator Business Basics", "Publishing and Testing"],
			gateTitle: "Product UI Practical",
			gateRequirements: [
				"Create a full UI flow with multiple screens/panels.",
				"Include onboarding, progress, settings, or shop logic.",
				"Test for confusion and fix issues.",
				"Explain mobile/readability choices.",
				"Submit screenshots and UX notes."
			]
		},
		{
			level: 14,
			name: "Studio Production Pipeline",
			focus: "Task planning, asset pipeline, script folders, bug logs, release notes, versioning, documentation, review cycles, and sprint structure.",
			outcome: "Learner can organise a project like a small production pipeline instead of random building.",
			courses: ["Publishing and Testing", "Blender", "Roblox Studio Basics"],
			gateTitle: "Production Pipeline Practical",
			gateRequirements: [
				"Create a task board or production checklist.",
				"Organise scripts, assets, UI, and documentation.",
				"Write a bug log and fix priority list.",
				"Create an update/version plan.",
				"Submit a final structure review."
			]
		},
		{
			level: 15,
			name: "Foundation Capstone Portfolio Sprint",
			focus: "Section 1 capstone: combine Studio, Lua, UI, assets, animation/polish, testing, evidence, and a small portfolio-style presentation.",
			outcome: "Learner can present a serious foundation-level creator project with technical and visual evidence.",
			courses: ["Roblox Lua", "UI Design", "Blender", "Moon Animator", "Publishing"],
			gateTitle: "Foundation Capstone Practical",
			gateRequirements: [
				"Present a complete foundation prototype or feature set.",
				"Include scripting, UI, Studio organisation, asset/polish, and testing evidence.",
				"Explain what was built and why.",
				"Show bug fixing or iteration.",
				"Submit a portfolio-style evidence pack."
			]
		},
		{
			level: 16,
			name: "AI-Assisted Creator Systems",
			focus: "AI helper design, learner feedback logic, prompt structure, progress interpretation, recommendation rules, safety boundaries, and human review.",
			outcome: "Learner can plan AI support features that improve learning without replacing real understanding.",
			courses: ["AI Systems", "Roblox Lua", "Product Design"],
			gateTitle: "AI Helper System Practical",
			gateRequirements: [
				"Design an AI-assisted feedback or lesson helper flow.",
				"Define what the AI can and cannot decide.",
				"Include learner safety and accuracy checks.",
				"Show how progress data influences feedback.",
				"Submit a system map and review notes."
			]
		},
		{
			level: 17,
			name: "Analytics and Learning Progress Signals",
			focus: "Completion tracking, XP history, drop-off points, lesson difficulty signals, retention loops, ethical metrics, and improvement decisions.",
			outcome: "Learner can use progress signals to improve a course/game without manipulating users.",
			courses: ["Analytics", "Progression Design", "Creator Business"],
			gateTitle: "Analytics and Retention Practical",
			gateRequirements: [
				"Define at least five useful progress/retention metrics.",
				"Explain what each metric means and does not mean.",
				"Identify a drop-off or confusion risk.",
				"Plan one ethical improvement from the data.",
				"Submit an analytics review."
			]
		},
		{
			level: 18,
			name: "Ethical Monetisation and Entitlement Architecture",
			focus: "Subscription tiers, lifetime offers, access gates, plan hierarchy, value ladders, Stripe/payment verification, entitlement state, and fair pricing.",
			outcome: "Learner can structure paid access without breaking trust or making buyers feel tricked.",
			courses: ["Roblox Monetisation", "Backend Planning", "Creator Business"],
			gateTitle: "Monetisation Architecture Practical",
			gateRequirements: [
				"Map every access tier and what it unlocks.",
				"Explain why each paid tier has value.",
				"Define monthly vs lifetime logic.",
				"Identify payment/access abuse risks.",
				"Submit an ethical monetisation plan."
			]
		},
		{
			level: 19,
			name: "Large-Scale Course and UI Navigation Systems",
			focus: "Course sections, level grids, path filtering, lesson views, admin dashboards, payment screens, progress panels, mobile layout, and navigation reliability.",
			outcome: "Learner can design large navigation systems that stay understandable as content expands.",
			courses: ["Roblox UI Design", "System Design", "Product Design"],
			gateTitle: "Large Navigation System Practical",
			gateRequirements: [
				"Design or improve a large UI/navigation system.",
				"Include section, level, lesson, progress, and back/exit logic.",
				"Test for broken routes or confusing labels.",
				"Fix at least two navigation problems.",
				"Submit UI flow evidence."
			]
		},
		{
			level: 20,
			name: "Backend, Accounts, and Payment Verification",
			focus: "Account concepts, backend API routes, server-side verification, Stripe checkout sessions, webhook thinking, environment variables, and trust boundaries.",
			outcome: "Learner can explain why payments and account authority must be verified on the backend.",
			courses: ["Backend Basics", "Security", "Creator Business"],
			gateTitle: "Backend Verification Practical",
			gateRequirements: [
				"Diagram a frontend-to-backend checkout flow.",
				"Explain which data is secret and where it belongs.",
				"Describe checkout verification or webhook logic.",
				"Identify at least three frontend-only risks.",
				"Submit a backend trust map."
			]
		},
		{
			level: 21,
			name: "Community, Moderation, and Trust Systems",
			focus: "Community rules, reporting flow, safe communication, moderation triage, evidence handling, content standards, support tone, and creator responsibility.",
			outcome: "Learner can design basic community and moderation systems that protect users and preserve trust.",
			courses: ["Community Systems", "Safety", "Creator Business"],
			gateTitle: "Community Trust Practical",
			gateRequirements: [
				"Write clear community or support rules.",
				"Design a simple report/moderation flow.",
				"Define what evidence should be collected.",
				"Explain escalation and fairness.",
				"Submit a trust/safety plan."
			]
		},
		{
			level: 22,
			name: "Performance Optimisation and Low-End Testing",
			focus: "Lag reduction, part count, script efficiency, UI performance, asset optimisation, effects limits, memory thinking, mobile testing, and low-device readability.",
			outcome: "Learner can identify performance risks and improve a project for weaker devices.",
			courses: ["Optimisation", "Roblox Studio Basics", "Blender", "VFX"],
			gateTitle: "Performance Review Practical",
			gateRequirements: [
				"Identify at least five performance risks.",
				"Optimise or plan improvements for assets, scripts, UI, or effects.",
				"Compare before/after or expected impact.",
				"Include mobile/low-end testing thinking.",
				"Submit a performance review."
			]
		},
		{
			level: 23,
			name: "Portfolio Case Studies and Demo Evidence",
			focus: "Portfolio structure, screenshots, demo videos, case studies, build logs, before/after evidence, technical explanations, and professional presentation.",
			outcome: "Learner can turn project work into evidence that proves skill to a buyer, employer, mentor, or collaborator.",
			courses: ["Portfolio", "Presentation", "Creator Business"],
			gateTitle: "Portfolio Evidence Practical",
			gateRequirements: [
				"Create a portfolio case-study structure.",
				"Include screenshots, explanations, and problem/solution notes.",
				"Show before/after improvement evidence.",
				"Explain what skill each piece proves.",
				"Submit a portfolio-ready evidence pack."
			]
		},
		{
			level: 24,
			name: "Studio Team Pipeline and Leadership",
			focus: "Team roles, task assignment, documentation, handoff, code/asset review, communication rules, sprint planning, and project direction.",
			outcome: "Learner can organise small-team production and communicate tasks clearly.",
			courses: ["Team Leadership", "Publishing and Testing", "System Design"],
			gateTitle: "Team Pipeline Practical",
			gateRequirements: [
				"Define roles for a small creator team.",
				"Create task handoff and review rules.",
				"Write documentation for one system or asset pipeline.",
				"Plan a sprint/review cycle.",
				"Submit a team workflow document."
			]
		},
		{
			level: 25,
			name: "Product Polish and Pre-Launch Review",
			focus: "Pre-launch quality pass: UI clarity, onboarding, bugs, trust signals, payment/access checks, presentation, feedback readiness, and release blockers.",
			outcome: "Learner can prepare a project for serious launch review without pretending it is the final academy ending.",
			courses: ["Publishing", "UI Design", "Testing", "Creator Business"],
			gateTitle: "Pre-Launch Review Practical",
			gateRequirements: [
				"Run a full pre-launch quality review.",
				"Identify blockers, warnings, and polish tasks.",
				"Check UI, access, payment, bugs, and trust signals.",
				"Create a final improvement sprint list.",
				"Submit a pre-launch review report."
			]
		},
		{
			level: 26,
			name: "Security, Anti-Exploit, and Abuse Prevention",
			focus: "Server authority, exploit modelling, RemoteEvent validation, permissions, admin abuse risk, access/payment abuse, cooldown abuse, and audit logging.",
			outcome: "Learner can identify abuse routes and design safer Roblox/game-academy systems.",
			courses: ["Security", "Roblox Lua", "Backend Planning"],
			gateTitle: "Security and Anti-Exploit Practical",
			gateRequirements: [
				"Identify at least five abuse or exploit risks.",
				"Explain what must be checked server-side.",
				"Create validation rules for a system.",
				"Plan abuse logging or review steps.",
				"Submit a before/after security improvement."
			]
		},
		{
			level: 27,
			name: "Advanced Data Models and Migration Planning",
			focus: "Player/learner profiles, XP history, lesson state, access plans, data migration, backups, recovery logic, schema evolution, and data integrity.",
			outcome: "Learner can plan reliable progression data that survives course expansion and user growth.",
			courses: ["Data Systems", "Backend Basics", "Progression Design"],
			gateTitle: "Data Model and Migration Practical",
			gateRequirements: [
				"Design a structured data model.",
				"Include XP, lessons, plan access, assessments, and timestamps.",
				"Explain save/load and recovery risks.",
				"Plan a migration for new levels or fields.",
				"Submit a data architecture document."
			]
		},
		{
			level: 28,
			name: "Launch Strategy and Growth Operations",
			focus: "Positioning, offer promise, launch content, update cadence, feedback loops, support readiness, marketing assets, trust-building, and improvement cycles.",
			outcome: "Learner can launch a creator product/academy/game with a structured go-to-market and iteration plan.",
			courses: ["Publishing", "Creator Business", "Marketing"],
			gateTitle: "Launch Strategy Practical",
			gateRequirements: [
				"Write a launch positioning statement.",
				"Define target user and value promise.",
				"Plan launch content and update cadence.",
				"Explain feedback collection and support.",
				"Submit a launch operations checklist."
			]
		},
		{
			level: 29,
			name: "Visual Direction and Brand System",
			focus: "Premium visual identity, colour systems, typography, icons, layout consistency, screenshots, trailers, product feel, and brand trust.",
			outcome: "Learner can make a project feel visually intentional, consistent, and trustworthy.",
			courses: ["UI Design", "Branding", "Presentation", "Blender"],
			gateTitle: "Visual Direction Practical",
			gateRequirements: [
				"Create or document a visual style guide.",
				"Define colours, typography, layout, button, and card rules.",
				"Show before/after visual polish.",
				"Explain how the brand builds trust.",
				"Submit screenshots or mockups with justification."
			]
		},
		{
			level: 30,
			name: "Elite Creator Thesis and Long-Term Roadmap",
			focus: "True final academy thesis: technical systems, UI, security, data, monetisation, launch strategy, brand, portfolio, leadership, and long-term creator roadmap.",
			outcome: "Learner can present a complete elite-level creator product with technical, academic, business, and presentation evidence.",
			courses: ["Elite Mastery", "Systems", "Business", "Portfolio", "Roblox Lua", "UI Design"],
			gateTitle: "Elite Creator Thesis",
			gateRequirements: [
				"Submit a full elite creator thesis or project plan.",
				"Include security, data, UI, monetisation, launch, and brand evidence.",
				"Show how the product improves long-term.",
				"Include screenshots, mockups, demo evidence, or portfolio proof.",
				"Write the roadmap for what happens after the academy."
			]
		}
	];

	const SLOT_FLOW = [
		"Official Definition",
		"Vocabulary Dictionary",
		"Tool and System Map",
		"Minimum Working Example",
		"Worked Example Annotation",
		"Near-Miss Failure Case",
		"Debugging Checklist",
		"Beginner Trap Review",
		"Practical Build A",
		"Practical Build B",
		"Transfer Challenge",
		"Quality Criteria",
		"Security/Performance/UX Review",
		"Evidence Method",
		"Mini Exam",
		"Lab Manual",
		"Feedback Review",
		"Improvement Sprint",
		"Gate Preparation",
		"Level Review"
	];

	function cloneLevel(level) {
		return {
			level: level.level,
			name: level.name,
			focus: level.focus,
			outcome: level.outcome,
			courses: level.courses.slice(),
			gateTitle: level.gateTitle,
			gateRequirements: level.gateRequirements.slice()
		};
	}

	function slotTitle(level, stage, index) {
		return level.name + " — " + stage;
	}

	function makeSlots(level) {
		return SLOT_FLOW.map(function(stage, index) {
			return [null, slotTitle(level, stage, index)];
		});
	}

	function applyRefinedLevels() {
		if (typeof levelDefinitions !== "undefined" && Array.isArray(levelDefinitions)) {
			LEVELS.forEach(function(level) {
				const existing = levelDefinitions.find(function(item) {
					return Number(item.level) === Number(level.level);
				});

				if (existing) {
					Object.assign(existing, cloneLevel(level));
				} else {
					levelDefinitions.push(cloneLevel(level));
				}
			});

			levelDefinitions.sort(function(a, b) {
				return Number(a.level) - Number(b.level);
			});

			try { window.levelDefinitions = levelDefinitions; } catch (error) {}
		}

		if (typeof academyLevelCount !== "undefined") {
			try { academyLevelCount = 30; } catch (error) {}
		}

		if (typeof levelPlanRequirements !== "undefined") {
			for (let i = 1; i <= 30; i++) {
				if (i === 1) levelPlanRequirements[i] = "free";
				else if (i <= 3) levelPlanRequirements[i] = "plus";
				else if (i <= 5) levelPlanRequirements[i] = "elite";
				else if (i <= 10) levelPlanRequirements[i] = "pro";
				else if (i <= 15) levelPlanRequirements[i] = "proplus";
				else if (i <= 25) levelPlanRequirements[i] = "platinum";
				else levelPlanRequirements[i] = "platinum_lifetime";
			}
		}

		if (typeof levelLessonTemplates !== "undefined") {
			LEVELS.forEach(function(level) {
				levelLessonTemplates[level.level] = makeSlots(level);
			});
		}

		if (typeof expandedLevelLessonDetails !== "undefined") {
			LEVELS.forEach(function(level) {
				expandedLevelLessonDetails[level.level] = makeSlots(level).map(function(slot, index) {
					const title = slot[1];

					return {
						title: title,
						objective: "Complete this structured sublesson for " + level.name + ".",
						theory: level.focus,
						practical: "Build, plan, test, debug, or document evidence connected to " + title + ".",
						evidence: [
							"Define the core concept and vocabulary.",
							"Show practical evidence or a clear implementation plan.",
							"Document a mistake, test, improvement, or production judgement."
						]
					};
				});
			});
		}

		try {
			window.caRefinedLevelMap = LEVELS;
		} catch (error) {}
	}

	applyRefinedLevels();

	document.addEventListener("DOMContentLoaded", applyRefinedLevels);
	setTimeout(applyRefinedLevels, 50);
	setTimeout(applyRefinedLevels, 250);
	setTimeout(applyRefinedLevels, 800);

	if (typeof caCourseSectionLevels === "function") {
		try {
			caCourseSectionLevels = function(section) {
				if (typeof levelDefinitions === "undefined") return [];

				return levelDefinitions.filter(function(level) {
					return section === 2
						? Number(level.level) >= 16 && Number(level.level) <= 30
						: Number(level.level) >= 1 && Number(level.level) <= 15;
				});
			};
		} catch (error) {}
	}

	if (typeof caRenderCourseSectionTabs === "function") {
		try {
			caRenderCourseSectionTabs = function() {
				const unlocked2 = typeof caSection2Unlocked === "function" ? caSection2Unlocked() : true;

				return `
					<div class="course-section-tabs">
						<button type="button" class="${caActiveCourseSection === 1 ? "active" : ""}" onclick="caSetCourseSection(1)">
							<span>1</span>
							<strong>Foundation Course</strong>
							<small>Levels 1–15</small>
						</button>
						<button type="button" class="${caActiveCourseSection === 2 ? "active" : ""} ${unlocked2 ? "" : "locked"}" onclick="${unlocked2 ? "caSetCourseSection(2)" : "showPlans()"}">
							<span>2</span>
							<strong>Specialist Course</strong>
							<small>Levels 16–30</small>
						</button>
					</div>
				`;
			};
		} catch (error) {}
	}
})();
