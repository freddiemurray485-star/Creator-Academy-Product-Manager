/* Creator Academy Hub — Scholarly Density 2X
   Uses the same course system, but overrides lesson opening with a denser guided coursework page.
*/
(function () {
	"use strict";

	const PREFIX = "creatorAcademy.scholar2Evidence.";

	const SUBJECTS = {
		studio: {
			label: "Roblox Studio",
			focus: "object hierarchy, properties, services, Workspace, model organisation, testing and debugging",
			refs: [
				["Roblox Creator Hub: Studio", "https://create.roblox.com/docs/studio"],
				["Roblox Creator Hub: Workspace", "https://create.roblox.com/docs/workspace"],
				["Roblox Creator Hub: Parts", "https://create.roblox.com/docs/parts"],
				["Roblox Creator Hub: Engine API", "https://create.roblox.com/docs/reference/engine"]
			],
			terms: [
				["Instance", "A Roblox object with properties, events, methods and a place in the hierarchy.", "Every Studio object should be thought of as programmable structure."],
				["Class", "The type/category of an Instance.", "Part, Model, Script and ScreenGui behave differently because they are different classes."],
				["Explorer", "The hierarchy panel in Studio.", "Used to inspect where objects live."],
				["Properties", "The selected object's editable values.", "Used to inspect and tune object behaviour."],
				["Parent", "The container an object is inside.", "Determines where an object belongs."],
				["Child", "An object directly inside another object.", "Used when locating objects by path."],
				["Descendant", "An object inside another object at any depth.", "Useful when scanning complex models."],
				["Workspace", "The main 3D world container.", "Most visible world objects live here."],
				["Service", "A major Roblox engine system.", "Players, ReplicatedStorage and ServerScriptService are services."],
				["Model", "A container grouping objects into one logical unit.", "Used for buildings, cars, rooms and upgrade sets."],
				["BasePart", "Physical 3D object base class.", "Parts that can collide, move, touch or be positioned."],
				["Anchored", "Stops a part from physics movement.", "Static objects should usually be anchored."],
				["CanCollide", "Controls physical collision.", "Triggers often use false; floors use true."],
				["CanTouch", "Controls whether touch events can fire.", "Useful for trigger/touch systems."],
				["Transparency", "Visibility from 0 visible to 1 invisible.", "Hidden detectors use high transparency."],
				["Vector3", "Three-number value for X/Y/Z.", "Used for size and position."],
				["CFrame", "Position and rotation together.", "Used for accurate placement and orientation."],
				["Pivot", "Model movement reference transform.", "Controls how whole models move."],
				["PrimaryPart", "Main reference part for some model movement.", "Keeps grouped movement predictable."],
				["Spawn location", "Object controlling where players spawn.", "Important for game flow and testing."],
				["Play Solo", "Studio test mode where you simulate play.", "Used to test runtime behaviour."],
				["Output", "Panel showing print messages and errors.", "First debugging tool."],
				["Asset", "Reusable content such as models, meshes, images or sounds.", "Assets need structure and naming."],
				["Hierarchy hygiene", "Keeping Explorer organised.", "Messy hierarchy causes slow debugging."]
			]
		},
		lua: {
			label: "Roblox Lua / Luau",
			focus: "variables, functions, events, remotes, modules, validation, server/client boundaries and data",
			refs: [
				["Roblox Creator Hub: Luau", "https://create.roblox.com/docs/luau"],
				["Roblox Creator Hub: Remote events and callbacks", "https://create.roblox.com/docs/scripting/events/remote"],
				["Roblox Creator Hub: ModuleScript", "https://create.roblox.com/docs/reference/engine/classes/ModuleScript"],
				["Roblox Creator Hub: Data stores", "https://create.roblox.com/docs/cloud-services/data-stores"],
				["Roblox Creator Hub: Server-side security", "https://create.roblox.com/docs/scripting/security/server-side-detection"]
			],
			terms: [
				["Variable", "A named reference to a value.", "Stores cash, prices, state and object references."],
				["local", "Limits a variable/function to its scope.", "Prevents accidental global state."],
				["Scope", "Where a value can be accessed.", "Controls safety and organisation."],
				["String", "Text data.", "Names, labels and messages."],
				["Number", "Numeric data.", "Cash, prices, timers and counts."],
				["Boolean", "true/false data.", "Permissions and conditions."],
				["nil", "No value.", "Common source of missing object errors."],
				["Table", "Luau's main collection structure.", "Used for configs, arrays, dictionaries and data."],
				["Function", "Reusable named or anonymous code block.", "Turns repeated logic into one controllable tool."],
				["Parameter", "Placeholder input in a function definition.", "Lets logic work with different inputs."],
				["Argument", "Real value passed into a function call.", "Fills the parameter."],
				["Return", "Sends a result out of a function.", "Used for checks and calculations."],
				["Conditional", "Logic that branches based on truth.", "if/then/else decisions."],
				["Comparison", "Checking values against each other.", "==, ~=, >=, <=."],
				["Assignment", "Putting a value into a variable.", "cash = 500."],
				["Event", "Signal that something happened.", "Touched, PlayerAdded, MouseButton1Click."],
				["Connection", "Links event to callback.", ":Connect(function() ... end)."],
				["Callback", "Function run later by an event/system.", "The event calls it when needed."],
				["RemoteEvent", "One-way asynchronous client/server message.", "Client asks server; server validates."],
				["RemoteFunction", "Two-way synchronous client/server callback.", "Useful but can yield while waiting."],
				["ModuleScript", "Reusable script returning data/functions.", "Used for shared config and systems."],
				["DataStore", "Persistent storage across sessions.", "Saves player progress."],
				["Server authority", "Server makes trusted decisions.", "Protects purchases, cash and progression."],
				["Validation", "Checking input before trusting it.", "Rejects fake/bad remote requests."],
				["Rate limit", "Restricts how often requests happen.", "Stops spam and accidental double actions."],
				["Idempotent", "Safe if repeated.", "Useful for rewards and purchases."],
				["State", "Current stored facts of the system.", "cash, owned upgrades, current lesson."],
				["Side effect", "A change caused by code.", "Changing cash, spawning objects, saving data."]
			]
		},
		ui: {
			label: "Roblox UI",
			focus: "screen structure, layout, visual hierarchy, feedback, accessibility and responsive behaviour",
			refs: [
				["Roblox Creator Hub: UI", "https://create.roblox.com/docs/ui"],
				["Roblox Creator Hub: UIListLayout", "https://create.roblox.com/docs/reference/engine/classes/UIListLayout"],
				["Roblox Creator Hub: UIGridLayout", "https://create.roblox.com/docs/reference/engine/classes/UIGridLayout"],
				["Roblox Creator Hub: Labels", "https://create.roblox.com/docs/ui/labels"]
			],
			terms: [
				["ScreenGui", "Top-level screen UI container.", "Main UI root."],
				["PlayerGui", "Player-specific UI container.", "Runtime destination for UI."],
				["Frame", "Rectangular container.", "Panels, cards, sections."],
				["TextLabel", "Text display object.", "Titles, instructions, feedback."],
				["TextButton", "Clickable button with text.", "Navigation and actions."],
				["ImageLabel", "Image display object.", "Icons and decoration."],
				["UDim2", "UI size/position value using scale and offset.", "Core responsive unit."],
				["Scale", "Relative parent-based sizing.", "Adapts across devices."],
				["Offset", "Pixel-based sizing.", "Fine control."],
				["AnchorPoint", "Reference point for positioning.", "Prevents awkward centering."],
				["UIListLayout", "Automatic row/column layout.", "Menus and vertical lists."],
				["UIGridLayout", "Automatic grid layout.", "Inventories and course cards."],
				["UIPadding", "Interior spacing.", "Stops cramped UI."],
				["UICorner", "Rounded corners.", "Modern polish."],
				["UIStroke", "Border/stroke.", "Contrast and separation."],
				["ZIndex", "Layer priority.", "Controls what appears above."],
				["Feedback", "Visible proof an action happened.", "Avoids confusion."],
				["Affordance", "Visual clue about how something is used.", "Buttons should look clickable."],
				["Hierarchy", "Order of importance.", "Guides attention."],
				["Responsive design", "Adapts to screen size.", "Needed for mobile/desktop."]
			]
		},
		blender: {
			label: "Blender / Asset Pipeline",
			focus: "modelling, clean geometry, scale, import, collisions, mesh quality and Roblox performance",
			refs: [
				["Roblox Creator Hub: 3D Importer", "https://create.roblox.com/docs/art/modeling/3d-importer"],
				["Roblox Creator Hub: Mesh specifications", "https://create.roblox.com/docs/art/modeling/specifications"],
				["Roblox Creator Hub: Meshes", "https://create.roblox.com/docs/parts/meshes"],
				["Roblox Creator Hub: Blender plugin", "https://create.roblox.com/docs/art/modeling/roblox-blender-plugin"]
			],
			terms: [
				["Mesh", "3D shape made from vertices, edges and faces.", "Core custom asset structure."],
				["Vertex", "A point in 3D space.", "Smallest mesh position unit."],
				["Edge", "Line between vertices.", "Defines shape flow."],
				["Face", "Surface made from edges.", "Visible geometry."],
				["Triangle", "Three-sided rendering face.", "Performance measurement often uses triangles."],
				["Topology", "How geometry is organised.", "Clean topology is easier to edit."],
				["Silhouette", "Readable outer outline.", "Game assets need strong silhouettes."],
				["UV map", "2D layout for texture placement.", "Needed for accurate texture mapping."],
				["Normal", "Surface direction for lighting.", "Broken normals cause bad shading."],
				["Origin", "Object pivot/reference point.", "Affects placement and rotation."],
				["Applied scale", "Reset transform values after resizing.", "Prevents import issues."],
				["FBX", "Common export format.", "Often used for Roblox import."],
				["MeshPart", "Roblox object with custom mesh geometry.", "Imported Blender asset."],
				["Collision", "Physical hitbox behaviour.", "Complex collision can hurt performance."],
				["Material", "Surface appearance data.", "Visual style."],
				["Texture", "Image surface detail.", "Adds detail without geometry."],
				["Polygon budget", "Limit on geometry complexity.", "Keeps performance sane."],
				["Scale check", "Testing size after import.", "Prevents giant/tiny assets."],
				["Pivot check", "Testing rotation/placement reference.", "Prevents awkward use in Studio."],
				["Import test", "Verifying asset in Roblox, not just Blender.", "Final proof."]
			]
		},
		animation: {
			label: "Moon Animator / Animation",
			focus: "poses, timing, keyframes, readability, rig control, polish and Roblox playback",
			refs: [
				["Roblox Creator Hub: Animation", "https://create.roblox.com/docs/animation"],
				["Roblox Creator Hub: Animation Editor", "https://create.roblox.com/docs/animation/editor"],
				["Roblox Creator Hub: Animator", "https://create.roblox.com/docs/reference/engine/classes/Animator"]
			],
			terms: [
				["Rig", "Structure that can be animated.", "Characters and objects need controllable structure."],
				["Joint", "Connection between moving parts.", "Allows rig movement."],
				["Keyframe", "Saved pose at a time point.", "Animation is built from these."],
				["Timeline", "Time sequence where keyframes sit.", "Controls order and pacing."],
				["Pose", "Arrangement of parts/bones.", "Main visual statement."],
				["Blocking", "Rough main poses.", "Proves action reads before polish."],
				["Timing", "When poses happen.", "Controls weight and clarity."],
				["Spacing", "Distance moved between frames.", "Controls speed feeling."],
				["Easing", "Acceleration/deceleration.", "Makes motion natural."],
				["Anticipation", "Preparation before action.", "Makes movement readable."],
				["Follow-through", "Motion after main action.", "Adds physical believability."],
				["Overlap", "Parts moving at slightly different times.", "Avoids robotic motion."],
				["Animator", "Object that loads/plays animations.", "Playback system."],
				["AnimationTrack", "Loaded playable animation.", "Can play, stop and adjust speed."],
				["Priority", "Which animation wins.", "Action overrides idle."],
				["Looping", "Repeating playback.", "Idle loops, attacks often do not."],
				["Polish", "Final refinement.", "Arcs, ease, timing, detail."],
				["Readability", "Viewer understands the action.", "The point of animation."]
			]
		}
	};

	function esc(v) {
		return String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
	}

	function wc(text) {
		return String(text || "").trim().split(/\s+/).filter(Boolean).length;
	}

	function root() {
		return document.getElementById("app");
	}

	function getLevel(level) {
		try {
			if (Array.isArray(levelDefinitions)) {
				return levelDefinitions.find(x => Number(x.level) === Number(level)) || levelDefinitions[level - 1];
			}
		} catch {}
		return { level, name: "Course Level " + level, focus: "Creator training", courses: ["Roblox Lua"] };
	}

	function getLesson(level, slot) {
		try {
			if (levelLessonTemplates && levelLessonTemplates[level] && levelLessonTemplates[level][slot - 1]) {
				const d = levelLessonTemplates[level][slot - 1];
				return { id: d[0], title: d[1] || "Sublesson " + slot };
			}
		} catch {}
		return { id: null, title: "Sublesson " + slot };
	}

	function subjectOf(ld, title) {
		const text = [ld.name, ld.focus, title, (ld.courses || []).join(" ")].join(" ").toLowerCase();
		if (text.includes("ui") || text.includes("gui") || text.includes("interface")) return "ui";
		if (text.includes("blender") || text.includes("asset") || text.includes("mesh") || text.includes("model")) return "blender";
		if (text.includes("moon") || text.includes("animation") || text.includes("animator")) return "animation";
		if (text.includes("studio") || text.includes("workspace") || text.includes("part")) return "studio";
		return "lua";
	}

	function done(level, slot) {
		try {
			if (typeof isLevelLessonComplete === "function") return isLevelLessonComplete(level, slot);
		} catch {}
		return localStorage.getItem("creatorAcademy.levelLesson." + level + "." + slot) === "true";
	}

	function mark(level, slot) {
		try {
			if (typeof markLevelLessonComplete === "function") return markLevelLessonComplete(level, slot);
		} catch {}
		localStorage.setItem("creatorAcademy.levelLesson." + level + "." + slot, "true");
	}

	function key(level, slot) {
		return PREFIX + level + ":" + slot;
	}

	function save2(level, slot) {
		const box = document.getElementById("scholar2Evidence");
		if (!box) return;
		localStorage.setItem(key(level, slot), box.value);
		const status = document.getElementById("scholar2Status");
		if (status) status.textContent = "Saved. Words: " + wc(box.value) + ". Target: 750+. Minimum completion: 250.";
		if (typeof showToast === "function") showToast("2X evidence saved.");
	}

	function complete2(level, slot) {
		const box = document.getElementById("scholar2Evidence");
		const words = wc(box ? box.value : "");
		if (words < 250) {
			if (typeof showToast === "function") showToast("Evidence is not dense enough yet. Minimum: 250 words.");
			return;
		}
		save2(level, slot);
		mark(level, slot);
		try {
			if (typeof awardOnce === "function") awardOnce("scholar2:" + level + ":" + slot, 320, "2X scholarly density sublesson", "lessons");
		} catch {}
		if (typeof openLevel === "function") openLevel(level, "lessons");
	}

	function codeFor(id) {
		if (id === "lua") return `-- Decision pipeline: define → validate → act → record
local function canBuy(playerCash, price)
	if type(playerCash) ~= "number" then return false, "cash is not a number" end
	if type(price) ~= "number" then return false, "price is not a number" end
	if price <= 0 then return false, "invalid price" end
	if playerCash < price then return false, "not enough cash" end
	return true, "approved"
end

local cash = 500
local price = 250
local allowed, reason = canBuy(cash, price)

if allowed then
	cash -= price
	print("Purchase approved")
else
	warn("Purchase denied:", reason)
end`;

		if (id === "studio") return `-- Object pipeline: create → configure → parent → test
local part = Instance.new("Part")
part.Name = "TrainingButton"
part.Size = Vector3.new(8, 1, 8)
part.Position = Vector3.new(0, 3, 0)
part.Anchored = true
part.CanCollide = true
part.Parent = workspace

print(part:GetFullName())`;

		if (id === "ui") return `-- UI pipeline: find → connect → feedback
local button = script.Parent
local panel = button.Parent
local status = panel:WaitForChild("StatusLabel")

button.MouseButton1Click:Connect(function()
	status.Text = "Action saved"
	status.Visible = true
end)`;

		if (id === "blender") return `Asset pipeline:
1. Define purpose
2. Blockout silhouette
3. Clean topology
4. Apply scale
5. Set origin
6. UV/material plan
7. Export
8. Import into Roblox
9. Check scale/collision
10. Test performance`;

		if (id === "animation") return `Animation pipeline:
1. Action statement
2. Main poses
3. Timing pass
4. Spacing pass
5. Anticipation
6. Follow-through
7. Polish
8. In-game playback check`;

		return "";
	}

	function table(terms) {
		return `<table class="scholar2-table">
			<thead><tr><th>Term</th><th>Meaning</th><th>Use</th><th>Beginner trap</th><th>Check</th></tr></thead>
			<tbody>
				${terms.map(t => `<tr>
					<td>${esc(t[0])}</td>
					<td>${esc(t[1])}</td>
					<td>${esc(t[2])}</td>
					<td>Thinking "${esc(t[0])}" is just a word instead of a working idea.</td>
					<td>Give one original example.</td>
				</tr>`).join("")}
			</tbody>
		</table>`;
	}

	function learningBlocks() {
		const blocks = [
			["1", "Plain-English Meaning", "Explain the lesson without technical words."],
			["2", "Formal Meaning", "Explain the lesson with exact technical words."],
			["3", "Vocabulary Lock", "Define every core term used by the lesson."],
			["4", "Object/System Map", "Map the objects, values, scripts, services, assets or UI elements involved."],
			["5", "Ownership Map", "Say what belongs to server, client, UI, asset pipeline or animation pipeline."],
			["6", "Smallest Working Version", "Build or describe the minimum useful version."],
			["7", "Worked Example", "Follow one clean example."],
			["8", "Annotated Example", "Explain each line, step or object decision."],
			["9", "Near-Miss Example", "Study a version that almost works but fails."],
			["10", "Bug Prediction", "Predict the bug before testing."],
			["11", "Debug Evidence", "Use output, observation or checklist to prove the cause."],
			["12", "Fix Rule", "Write the rule that prevents the same bug."],
			["13", "Variation A", "Change a small value while keeping the structure."],
			["14", "Variation B", "Use the same concept in a different feature."],
			["15", "Edge Case", "Handle nil, wrong type, delayed object, invalid input or broken screen size."],
			["16", "Performance Check", "Ask if it creates lag, clutter, waste or expensive behaviour."],
			["17", "Security Check", "Ask if a player can fake/abuse the action."],
			["18", "UX Check", "Ask if the user/player can understand what happened."],
			["19", "Maintainability Check", "Ask if future-you can find/change this easily."],
			["20", "Reference Check", "Compare your understanding with documentation."],
			["21", "Memory Recall", "Write the core idea from memory."],
			["22", "Oral Explanation", "Explain it in 90 seconds to a total beginner."],
			["23", "Teacher Test", "Write a tiny teaching example."],
			["24", "Evidence", "Record what you built, broke, fixed and transferred."],
			["25", "Reflection", "State what changed in your understanding."]
		];

		return blocks.map((b, i) => `<div class="scholar2-card">
			<span class="scholar2-pill ${i % 4 === 0 ? "gold" : i % 4 === 1 ? "green" : i % 4 === 2 ? "red" : ""}">${b[0]}</span>
			<h4>${esc(b[1])}</h4>
			<p>${esc(b[2])}</p>
		</div>`).join("");
	}

	function questions(terms) {
		const termList = terms.slice(0, 12);
		return `<div class="scholar2-grid">
			<div class="scholar2-card"><h4>Vocabulary Retrieval</h4><ol>${termList.slice(0, 6).map(t => `<li>Define ${esc(t[0])} from memory.</li>`).join("")}</ol></div>
			<div class="scholar2-card"><h4>Vocabulary Application</h4><ol>${termList.slice(6, 12).map(t => `<li>Use ${esc(t[0])} in one Roblox example.</li>`).join("")}</ol></div>
			<div class="scholar2-card"><h4>Why/When Test</h4><ol>
				<li>Why does this concept exist?</li>
				<li>When would you use it?</li>
				<li>When would you avoid it?</li>
				<li>What is the most common misuse?</li>
				<li>What evidence proves it worked?</li>
			</ol></div>
			<div class="scholar2-card"><h4>Transfer Test</h4><ol>
				<li>Apply the idea to a tycoon.</li>
				<li>Apply the idea to an admin panel.</li>
				<li>Apply the idea to a course UI.</li>
				<li>Explain what stayed the same.</li>
				<li>Explain what changed.</li>
			</ol></div>
		</div>`;
	}

	function refs(s) {
		return `<div class="scholar2-ref-list">${s.refs.map(r => `<a href="${esc(r[1])}" target="_blank" rel="noopener noreferrer">${esc(r[0])}</a>`).join("")}</div>`;
	}

	function open2(level, slot) {
		level = Number(level);
		slot = Number(slot);

		if (slot > 1 && !done(level, slot - 1)) {
			if (typeof showToast === "function") showToast("Complete the previous sublesson first.");
			if (typeof openLevel === "function") openLevel(level, "lessons");
			return;
		}

		const container = root();
		if (!container) return;

		const ld = getLevel(level);
		const lesson = getLesson(level, slot);
		const id = subjectOf(ld, lesson.title);
		const s = SUBJECTS[id] || SUBJECTS.lua;
		const saved = localStorage.getItem(key(level, slot)) || "";

		container.innerHTML = `
			<section class="panel scholar2-page">
				<div class="scholar2-hero">
					<span class="badge">2X Scholarly Density Sublesson</span>
					<h2>${esc(lesson.title)}</h2>
					<p>
						This lesson is not harder by being confusing. It is denser by being more complete.
						The learner is guided through definition, vocabulary, examples, mistakes, transfer, debugging,
						judgement and evidence. The aim is total coverage without pointless academic waffle.
					</p>
					<div class="scholar2-stats">
						<div class="scholar2-stat"><span>Level</span><strong>${level}: ${esc(ld.name)}</strong></div>
						<div class="scholar2-stat"><span>Subject</span><strong>${esc(s.label)}</strong></div>
						<div class="scholar2-stat"><span>Focus</span><strong>${esc(s.focus)}</strong></div>
						<div class="scholar2-stat"><span>Guided time</span><strong>90–150 min</strong></div>
						<div class="scholar2-stat"><span>Vocabulary terms</span><strong>${s.terms.length}</strong></div>
						<div class="scholar2-stat"><span>Learning blocks</span><strong>25</strong></div>
					</div>
				</div>

				<div class="scholar2-section">
					<h3>1. Course Contract</h3>
					<div class="scholar2-callout">
						<strong>To complete this properly:</strong> define it, build it, annotate it, break it, debug it,
						transfer it, judge it, and submit evidence. Reading alone is not completion.
					</div>
				</div>

				<div class="scholar2-section">
					<h3>2. Beginner-Proof Explanation</h3>
					<p>
						This topic belongs to <strong>${esc(s.label)}</strong>. The main focus is ${esc(s.focus)}.
						The lesson should be understood in three layers: what the words mean, what the working pattern is,
						and how that pattern fails when used carelessly.
					</p>
					<p>
						The learner should not memorise one exact example. They should understand the repeatable structure
						behind the example so it can be used in a different game system later.
					</p>
				</div>

				<div class="scholar2-section">
					<h3>3. Vocabulary Dictionary Plus Traps</h3>
					<p>Every term has a meaning, use, beginner trap and check. This is the memory infrastructure of the lesson.</p>
					${table(s.terms)}
				</div>

				<div class="scholar2-section">
					<h3>4. 25-Part Concept Ladder</h3>
					<p>This is where the density doubles. Each block attacks the same topic from a different learning angle.</p>
					<div class="scholar2-grid">${learningBlocks()}</div>
				</div>

				<div class="scholar2-section">
					<h3>5. Core Pattern</h3>
					<p>This is the minimum useful pattern. The learner should annotate it before extending it.</p>
					<pre class="scholar2-code"><code>${esc(codeFor(id))}</code></pre>
				</div>

				<div class="scholar2-section">
					<h3>6. Worked Example Protocol</h3>
					<ol>
						<li>Read the example once.</li>
						<li>Rewrite/rebuild it manually.</li>
						<li>Label every variable/object/step with its job.</li>
						<li>Run or mentally simulate it.</li>
						<li>Change one safe value.</li>
						<li>Predict the result before testing.</li>
						<li>Write the rule that explains the result.</li>
					</ol>
				</div>

				<div class="scholar2-section">
					<h3>7. Near-Miss and Debugging Protocol</h3>
					<div class="scholar2-callout danger">
						A near-miss is an example that is close enough to fool a beginner but wrong enough to create a real bug.
						This trains diagnosis, not copying.
					</div>
					<ol>
						<li>Create or identify one missing object/path bug.</li>
						<li>Create or identify one wrong type/value bug.</li>
						<li>Create or identify one wrong timing/order bug.</li>
						<li>Create or identify one authority/security bug where relevant.</li>
						<li>For each bug, write: symptom → cause → fix → prevention rule.</li>
					</ol>
				</div>

				<div class="scholar2-section">
					<h3>8. Vocabulary Checks</h3>
					${questions(s.terms)}
				</div>

				<div class="scholar2-section">
					<h3>9. Lab Manual</h3>
					<ol>
						<li><strong>Setup:</strong> create only the necessary objects/assets/scripts.</li>
						<li><strong>Baseline:</strong> prove the minimum version works.</li>
						<li><strong>Annotation:</strong> explain every major line or asset decision.</li>
						<li><strong>Stress case:</strong> test a wrong name, missing object, invalid value, wrong screen size, bad import or bad timing.</li>
						<li><strong>Repair:</strong> fix the fault and write the prevention rule.</li>
						<li><strong>Transfer:</strong> rebuild the idea inside a different feature.</li>
						<li><strong>Production note:</strong> add one security, UX, performance or maintainability judgement.</li>
					</ol>
				</div>

				<div class="scholar2-section">
					<h3>10. Coursework Question Bank</h3>
					<div class="scholar2-grid">
						<div class="scholar2-card"><h4>Definition Questions</h4><ol>
							<li>What is the concept?</li>
							<li>What problem does it solve?</li>
							<li>Which terms are required to understand it?</li>
							<li>What is not part of the concept?</li>
						</ol></div>
						<div class="scholar2-card"><h4>Build Questions</h4><ol>
							<li>What is the smallest useful version?</li>
							<li>What objects/scripts/assets are required?</li>
							<li>What must be named clearly?</li>
							<li>What proves it works?</li>
						</ol></div>
						<div class="scholar2-card"><h4>Debug Questions</h4><ol>
							<li>What are three likely beginner errors?</li>
							<li>What would each error look like?</li>
							<li>How would you isolate the cause?</li>
							<li>What prevention rule would you write?</li>
						</ol></div>
						<div class="scholar2-card"><h4>Production Questions</h4><ol>
							<li>What is the security risk?</li>
							<li>What is the performance risk?</li>
							<li>What is the UX/readability risk?</li>
							<li>What would you improve before shipping?</li>
						</ol></div>
					</div>
				</div>

				<div class="scholar2-section">
					<h3>11. Marking Rubric</h3>
					<table class="scholar2-table">
						<thead><tr><th>Band</th><th>Standard</th><th>What the evidence must show</th></tr></thead>
						<tbody>
							<tr><td>1</td><td>Recognises words</td><td>Can point to terms but gives weak definitions.</td></tr>
							<tr><td>2</td><td>Defines terms</td><td>Gives correct meanings but limited practical use.</td></tr>
							<tr><td>3</td><td>Guided build</td><td>Can follow the pattern and explain some decisions.</td></tr>
							<tr><td>4</td><td>Independent small build</td><td>Builds the smallest version and fixes simple bugs.</td></tr>
							<tr><td>5</td><td>Transfer</td><td>Applies the concept to another feature.</td></tr>
							<tr><td>6</td><td>Production judgement</td><td>Discusses safety, performance, UX or maintainability.</td></tr>
							<tr><td>7</td><td>Teacher-ready</td><td>Can teach the concept with examples, traps and checks.</td></tr>
						</tbody>
					</table>
				</div>

				<div class="scholar2-section">
					<h3>12. Evidence Submission</h3>
					<p>
						Target: 750+ words. Minimum completion: 250 words. Evidence must include:
						definition, vocabulary, worked example notes, near-miss/debug story, transfer example and production judgement.
					</p>
					<textarea id="scholar2Evidence" class="scholar2-evidence" placeholder="Write 2X dense coursework evidence here...">${esc(saved)}</textarea>
					<div id="scholar2Status" class="scholar2-callout warning">Words: ${wc(saved)}. Target: 750+. Minimum completion: 250.</div>
					<div class="scholar2-actions">
						<button type="button" onclick="saveScholar2Evidence(${level}, ${slot})">Save Evidence</button>
						<button type="button" class="green" onclick="completeScholar2Lesson(${level}, ${slot})">Complete 2X Sublesson</button>
						<button type="button" class="secondary" onclick="openLevel(${level}, 'lessons')">Back to Lessons</button>
					</div>
				</div>

				<div class="scholar2-section">
					<h3>13. Reference Shelf</h3>
					<p>Use these to check engine behaviour instead of guessing.</p>
					${refs(s)}
				</div>
			</section>
		`;

		try {
			if (typeof setCurrentView === "function") setCurrentView("scholarlyDensity2x");
		} catch {}
	}

	function install() {
		window.openLevelLesson = open2;
		window.caOpenCourseLesson = open2;
		window.saveScholar2Evidence = save2;
		window.completeScholar2Lesson = complete2;
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 120);
	setTimeout(install, 500);
	setTimeout(install, 1100);
})();
