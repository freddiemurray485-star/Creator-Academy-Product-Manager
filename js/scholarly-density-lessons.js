/* Creator Academy Hub — Scholarly Density Lessons
   Dense like coursework, but scaffolded for beginners. Depth without fake difficulty.
*/
(function () {
	"use strict";

	const STORAGE_PREFIX = "creatorAcademy.scholarEvidence.";

	const SUBJECTS = {
		studio: {
			label: "Roblox Studio",
			anchor: "object hierarchy, properties, workspace, services and model organisation",
			refs: [
				["Roblox Creator Hub: Studio", "https://create.roblox.com/docs/studio"],
				["Roblox Creator Hub: Engine API reference", "https://create.roblox.com/docs/reference/engine"],
				["Roblox Creator Hub: Parts", "https://create.roblox.com/docs/parts"]
			],
			terms: [
				["Instance", "A Roblox object with properties, methods, events and a location in the hierarchy.", "Use it to think of every object as programmable."],
				["Parent", "The container an object is inside.", "An object must be parented somewhere useful before code or players can use it."],
				["Workspace", "The main 3D world container.", "World parts and models usually appear here."],
				["Service", "A top-level engine system such as Players or ReplicatedStorage.", "Services define where different categories of logic/data belong."],
				["Property", "A stored value controlling object behaviour or appearance.", "Size, Position, Anchored, Transparency and Name are examples."],
				["BasePart", "The base physical object category for parts in the 3D world.", "Collision, touch events and physics relate heavily to BaseParts."],
				["Model", "A container grouping parts and objects into one logical object.", "Useful for houses, cars, rooms, machines and upgrade sets."],
				["Pivot", "The reference transform used to move or rotate models.", "Good pivots make placement and spawning much easier."],
				["PrimaryPart", "A main part used as reference for model movement.", "Helps move older model systems predictably."],
				["Anchored", "A property that prevents physics movement.", "Static buttons/platforms/buildings should usually be anchored."],
				["CanCollide", "Whether physics objects collide with it.", "Invisible triggers usually turn this off."],
				["Transparency", "Visibility amount from 0 to 1.", "Useful for hidden sensors or faded objects."],
				["Vector3", "A 3-number value representing X, Y and Z.", "Used for Size, Position and 3D direction."],
				["CFrame", "Position and rotation together.", "Used when placement needs orientation, not just location."],
				["Explorer", "The hierarchy view in Studio.", "You use it to find, organise and inspect objects."],
				["Properties panel", "The panel for editing selected object properties.", "This is how you inspect object behaviour without code."]
			]
		},
		lua: {
			label: "Roblox Lua",
			anchor: "variables, functions, events, remotes, modules, data and server/client responsibility",
			refs: [
				["Roblox Creator Hub: Luau", "https://create.roblox.com/docs/luau"],
				["Roblox Creator Hub: Remote events and callbacks", "https://create.roblox.com/docs/scripting/events/remote"],
				["Roblox Creator Hub: ReplicatedStorage", "https://create.roblox.com/docs/reference/engine/classes/ReplicatedStorage"],
				["Roblox Creator Hub: Data stores", "https://create.roblox.com/docs/cloud-services/data-stores"]
			],
			terms: [
				["Variable", "A named reference to a value.", "Use it to store cash, price, state, player references and settings."],
				["Scope", "Where a variable/function can be used.", "Prevents code from accidentally affecting unrelated systems."],
				["Function", "Reusable code with a defined job.", "Makes behaviour repeatable and easier to test."],
				["Parameter", "Placeholder input in a function definition.", "Lets one function work with different values."],
				["Argument", "Real value sent into a function call.", "The value that fills a parameter."],
				["Return", "A result sent back from a function.", "Lets functions answer questions like canBuy()."],
				["Boolean", "true or false.", "Used for permissions, checks, toggles and state."],
				["nil", "No value.", "Many bugs happen because a value is nil when code expects an object."],
				["Table", "Luau's list/dictionary structure.", "Used for config, inventories, levels and state maps."],
				["Event", "A signal that something happened.", "Touched, MouseButton1Click and PlayerAdded are event-driven patterns."],
				["Connection", "The link between an event and a callback function.", "Without connection, the event does not run your code."],
				["RemoteEvent", "One-way asynchronous communication across client/server boundary.", "Common for client requesting server actions."],
				["RemoteFunction", "Two-way synchronous callback across client/server boundary.", "Useful sometimes, but can yield while waiting for a response."],
				["ModuleScript", "Reusable script returning a value/table.", "Good for shared functions, constants and organised systems."],
				["DataStore", "Persistent storage for player data.", "Used for saving progress, money, levels and ownership."],
				["Validation", "Checking data before trusting it.", "Protects money, purchases, damage and admin actions."]
			]
		},
		ui: {
			label: "Roblox UI",
			anchor: "screen structure, layout, visual hierarchy, feedback and responsive design",
			refs: [
				["Roblox Creator Hub: UI", "https://create.roblox.com/docs/ui"],
				["Roblox Creator Hub: UIListLayout", "https://create.roblox.com/docs/reference/engine/classes/UIListLayout"],
				["Roblox Creator Hub: UIGridLayout", "https://create.roblox.com/docs/reference/engine/classes/UIGridLayout"]
			],
			terms: [
				["ScreenGui", "Top-level screen UI container.", "Usually copied into PlayerGui for each player."],
				["Frame", "UI rectangle/container.", "Build panels, cards and layout sections with it."],
				["TextLabel", "Displays text.", "Shows titles, cash, requirements and feedback."],
				["TextButton", "Clickable text object.", "Used for menus, purchases and navigation."],
				["UDim2", "UI size/position made from scale and offset.", "Needed for responsive interfaces."],
				["Scale", "Relative measurement based on parent size.", "Helps UI adapt to screens."],
				["Offset", "Pixel measurement.", "Useful for fixed spacing/details."],
				["AnchorPoint", "The point on the UI object used for positioning.", "0.5,0.5 helps centre objects properly."],
				["UIListLayout", "Automatically arranges UI siblings in a row/column.", "Prevents manual positioning chaos."],
				["UIGridLayout", "Automatically arranges UI siblings in a grid.", "Useful for shops, inventories and course cards."],
				["UIPadding", "Adds inside spacing.", "Stops UI from feeling cramped."],
				["UICorner", "Rounds corners.", "Visual polish."],
				["UIStroke", "Adds border/stroke.", "Improves contrast and hierarchy."],
				["ZIndex", "Controls layer order.", "Modal panels should appear above backgrounds."],
				["Feedback", "Visible response after user action.", "Players need proof their click worked."],
				["Hierarchy", "The order of visual importance.", "A good UI tells users what matters first."]
			]
		},
		blender: {
			label: "Blender / Assets",
			anchor: "geometry, scale, export, import, mesh quality and Roblox-ready assets",
			refs: [
				["Roblox Creator Hub: 3D Importer", "https://create.roblox.com/docs/art/modeling/3d-importer"],
				["Roblox Creator Hub: Mesh specifications", "https://create.roblox.com/docs/art/modeling/specifications"],
				["Roblox Creator Hub: Meshes", "https://create.roblox.com/docs/parts/meshes"],
				["Roblox Creator Hub: Roblox Blender Plugin", "https://create.roblox.com/docs/art/modeling/roblox-blender-plugin"]
			],
			terms: [
				["Mesh", "3D shape built from vertices, edges and faces.", "Custom assets become mesh-based objects."],
				["Vertex", "A point in 3D space.", "Mesh structure starts here."],
				["Edge", "A line between vertices.", "Edges form the shape network."],
				["Face", "A surface made from edges.", "Too many faces can hurt performance."],
				["Triangle", "A three-sided face used by rendering engines.", "Polygon budget often becomes triangle budget."],
				["UV map", "2D layout for texture placement.", "Required for clean image textures."],
				["Normal", "Surface direction used for lighting.", "Broken normals cause bad shading."],
				["Origin", "Object pivot/reference point.", "Bad origins make placement messy in Roblox."],
				["Applied scale", "Reset transform values after resizing.", "Prevents import size/animation problems."],
				["FBX", "Common 3D export format.", "Often used from Blender to Roblox."],
				["MeshPart", "Roblox object displaying custom mesh geometry.", "Imported assets usually become MeshParts."],
				["Collision", "Physical hitbox behaviour.", "Accurate collisions can be expensive."],
				["Material", "Surface appearance.", "Metal, plastic, glass, wood style."],
				["Texture", "Image detail placed on a surface.", "Adds visual detail without more geometry."],
				["Topology", "How geometry is organised.", "Clean topology is easier to edit and shade."],
				["Silhouette", "The readable outline of the asset.", "Game assets must read clearly from distance."]
			]
		},
		animation: {
			label: "Moon Animator / Animation",
			anchor: "poses, timing, rig control, animation readability and game integration",
			refs: [
				["Roblox Creator Hub: Animation", "https://create.roblox.com/docs/animation"],
				["Roblox Creator Hub: Animation Editor", "https://create.roblox.com/docs/animation/editor"],
				["Roblox Creator Hub: Animator", "https://create.roblox.com/docs/reference/engine/classes/Animator"]
			],
			terms: [
				["Rig", "A structure that can be animated.", "Characters, machines and objects can use rigs."],
				["Joint", "Connection that allows parts to move together.", "Character rigs rely on joints."],
				["Keyframe", "Saved pose at a specific time.", "Animation is built by moving between keyframes."],
				["Timeline", "Time area where keyframes are arranged.", "Controls order and timing."],
				["Pose", "A specific arrangement of parts/bones.", "Main readable positions of an action."],
				["Blocking", "Rough main poses before polish.", "Proves the motion reads before details."],
				["Timing", "When actions happen.", "Timing controls weight and clarity."],
				["Spacing", "How much movement happens between frames.", "Controls speed feeling."],
				["Easing", "Acceleration/deceleration between keyframes.", "Avoids robotic movement."],
				["Anticipation", "Preparation before an action.", "Makes motion readable."],
				["Follow-through", "Movement after the main action.", "Makes motion feel physical."],
				["AnimationTrack", "Playable loaded animation.", "Used to play/stop/adjust animations."],
				["Animator", "Object responsible for loading/playing animations.", "Core Roblox animation playback object."],
				["Priority", "Which animation overrides another.", "Action animations may override idle."],
				["Looping", "Whether animation repeats.", "Idle loops; attacks usually do not."],
				["Polish", "Final refinement stage.", "Smooth arcs, ease and detail."]
			]
		}
	};

	function esc(value) {
		return String(value ?? "").replace(/[&<>"']/g, function (c) {
			return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
		});
	}

	function countWords(text) {
		return String(text || "").trim().split(/\s+/).filter(Boolean).length;
	}

	function app() {
		return document.getElementById("app");
	}

	function levelDef(level) {
		try {
			if (Array.isArray(levelDefinitions)) {
				return levelDefinitions.find(x => Number(x.level) === Number(level)) || levelDefinitions[level - 1];
			}
		} catch {}
		return { level, name: "Course Level " + level, focus: "Creator training", courses: ["Roblox Lua"] };
	}

	function lessonData(level, slot) {
		try {
			if (levelLessonTemplates && levelLessonTemplates[level] && levelLessonTemplates[level][slot - 1]) {
				const data = levelLessonTemplates[level][slot - 1];
				return { id: data[0], title: data[1] || "Sublesson " + slot };
			}
		} catch {}
		return { id: null, title: "Sublesson " + slot };
	}

	function subject(level, title) {
		const text = [level.name, level.focus, title, (level.courses || []).join(" ")].join(" ").toLowerCase();
		if (text.includes("ui") || text.includes("interface") || text.includes("gui")) return "ui";
		if (text.includes("blender") || text.includes("asset") || text.includes("mesh") || text.includes("model")) return "blender";
		if (text.includes("animation") || text.includes("moon") || text.includes("animator")) return "animation";
		if (text.includes("studio") || text.includes("workspace") || text.includes("part")) return "studio";
		return "lua";
	}

	function complete(level, slot) {
		try {
			if (typeof markLevelLessonComplete === "function") return markLevelLessonComplete(level, slot);
		} catch {}
		localStorage.setItem("creatorAcademy.levelLesson." + level + "." + slot, "true");
	}

	function isDone(level, slot) {
		try {
			if (typeof isLevelLessonComplete === "function") return isLevelLessonComplete(level, slot);
		} catch {}
		return localStorage.getItem("creatorAcademy.levelLesson." + level + "." + slot) === "true";
	}

	function codeFor(id) {
		if (id === "studio") return `-- Object ownership pattern
local button = Instance.new("Part")
button.Name = "BuyButton"
button.Size = Vector3.new(8, 1, 8)
button.Anchored = true
button.CanCollide = true
button.Parent = workspace

-- Read the pattern:
-- 1. create object
-- 2. name object
-- 3. configure properties
-- 4. parent object into the world`;

		if (id === "lua") return `-- Safe server decision pattern
local function canBuy(cash, price)
	if type(cash) ~= "number" then return false end
	if type(price) ~= "number" then return false end
	if price <= 0 then return false end
	return cash >= price
end

local cash = 500
local price = 250

if canBuy(cash, price) then
	cash -= price
	print("Approved")
else
	print("Denied")
end`;

		if (id === "ui") return `-- UI feedback pattern
local button = script.Parent
local status = button.Parent:WaitForChild("StatusLabel")

button.MouseButton1Click:Connect(function()
	status.Text = "Saved"
	status.Visible = true
end)`;

		if (id === "blender") return `Asset pipeline checklist

Blockout → shape/proportions
Clean geometry → remove waste
Apply scale → reset transforms
Set origin → clean pivot
UV/material plan → readable surface
Export → FBX/mesh
Import → Roblox 3D Importer
Test → scale, collision, performance`;

		if (id === "animation") return `Animation pipeline checklist

Idea → one clear action
Blocking → main poses only
Timing → when each pose happens
Spacing → how fast movement feels
Easing → smooth transitions
Polish → arcs, overlap, follow-through
Integration → Animator, priority, looping, playback`;

		return "";
	}

	function renderTerms(terms) {
		return `<table class="scholar-table">
			<thead><tr><th>Term</th><th>Exact meaning</th><th>Use in real work</th><th>Check question</th></tr></thead>
			<tbody>
				${terms.map(t => `<tr>
					<td>${esc(t[0])}</td>
					<td>${esc(t[1])}</td>
					<td>${esc(t[2])}</td>
					<td>Can you give one working example of ${esc(t[0])}?</td>
				</tr>`).join("")}
			</tbody>
		</table>`;
	}

	function renderPrereqs(subjectObj) {
		return [
			["Recognise", "You can point to the object/system in Studio or the workflow."],
			["Define", "You can define the key words without copying the lesson text."],
			["Operate", "You can do the smallest working version with guidance."],
			["Explain", "You can say why each step exists."],
			["Debug", "You can identify at least three likely failure points."],
			["Transfer", "You can use the idea in a different situation."],
			["Judge", "You can name one quality, safety, performance or maintainability issue."]
		].map((x, i) => `<div class="scholar-card"><span class="scholar-pill">${i + 1}</span><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join("");
	}

	function renderLearningBlocks(subjectObj, title) {
		const blocks = [
			["A. Plain-English Core", "Explain the concept with no jargon. This proves the learner has not hidden confusion behind technical words."],
			["B. Formal Definition", "Use exact vocabulary. This trains precise thinking and stops sloppy meanings."],
			["C. Object/System Map", "List every object, value, service, asset, script or UI object involved."],
			["D. Worked Example", "Follow the smallest complete version. Do not decorate it yet."],
			["E. Annotated Example", "Explain each line or production step in short notes."],
			["F. Near-Miss Example", "Show a version that almost works but fails because of one realistic mistake."],
			["G. Debug Pass", "Use a checklist to find and correct the failure."],
			["H. Variation 1", "Change a name/value/context while keeping the concept identical."],
			["I. Variation 2", "Apply the same idea to a different game feature."],
			["J. Edge Case", "Ask what happens when data is nil, delayed, wrong type, too frequent or visually broken."],
			["K. Production Check", "Judge security, performance, readability, UX or maintainability."],
			["L. Memory Lock", "Answer rapid recall questions without looking."],
			["M. Evidence", "Write the proof: what was built, why it works, what broke, what was fixed, what transfers."],
			["N. Reflection", "Say what is now obvious that was not obvious before."],
			["O. Next Link", "Explain what this lesson prepares you for next."]
		];

		return blocks.map((b, i) => `<div class="scholar-card">
			<span class="scholar-pill ${i % 3 === 0 ? "gold" : i % 3 === 1 ? "green" : ""}">${b[0].split(".")[0]}</span>
			<h4>${esc(b[0])}</h4>
			<p>${esc(b[1])}</p>
		</div>`).join("");
	}

	function renderChecks(terms, subjectObj) {
		return `<div class="scholar-grid">
			<div class="scholar-card"><h4>Vocabulary Check 1: Recognition</h4><ol>
				${terms.slice(0, 8).map(t => `<li>Circle where <strong>${esc(t[0])}</strong> appears in the workflow.</li>`).join("")}
			</ol></div>
			<div class="scholar-card"><h4>Vocabulary Check 2: Definition</h4><ol>
				${terms.slice(8, 16).map(t => `<li>Define <strong>${esc(t[0])}</strong> in one sentence.</li>`).join("")}
			</ol></div>
			<div class="scholar-card"><h4>Vocabulary Check 3: Comparison</h4><ol>
				<li>Which two terms are most easily confused?</li>
				<li>What is the difference?</li>
				<li>What bug happens if the learner mixes them up?</li>
				<li>What one test proves the difference?</li>
			</ol></div>
			<div class="scholar-card"><h4>Vocabulary Check 4: Production Use</h4><ol>
				<li>Name five terms needed in a real Roblox project.</li>
				<li>Write one realistic use for each.</li>
				<li>Rank them from most essential to least essential.</li>
				<li>Explain your ranking.</li>
			</ol></div>
		</div>`;
	}

	function refs(subjectObj) {
		return `<div class="scholar-reference-list">
			${subjectObj.refs.map(r => `<a href="${esc(r[1])}" target="_blank" rel="noopener noreferrer">${esc(r[0])}</a>`).join("")}
		</div>`;
	}

	function evidenceKey(level, slot) {
		return STORAGE_PREFIX + level + ":" + slot;
	}

	function saveEvidence(level, slot) {
		const box = document.getElementById("scholarEvidenceBox");
		if (!box) return;
		localStorage.setItem(evidenceKey(level, slot), box.value);
		const status = document.getElementById("scholarEvidenceStatus");
		if (status) status.textContent = "Saved. Words: " + countWords(box.value) + ". Recommended: 500+ words. Minimum completion: 180 words.";
		if (typeof showToast === "function") showToast("Coursework evidence saved.");
	}

	function finishLesson(level, slot) {
		const box = document.getElementById("scholarEvidenceBox");
		const wc = countWords(box ? box.value : "");
		if (wc < 180) {
			if (typeof showToast === "function") showToast("Evidence is not dense enough yet. Minimum: 180 words.");
			return;
		}
		saveEvidence(level, slot);
		complete(level, slot);
		try {
			if (typeof awardOnce === "function") awardOnce("scholar:" + level + ":" + slot, 240, "Scholarly density sublesson", "lessons");
		} catch {}
		if (typeof openLevel === "function") openLevel(level, "lessons");
	}

	function openScholarLesson(level, slot) {
		level = Number(level);
		slot = Number(slot);

		if (slot > 1 && !isDone(level, slot - 1)) {
			if (typeof showToast === "function") showToast("Complete the previous sublesson first.");
			if (typeof openLevel === "function") openLevel(level, "lessons");
			return;
		}

		const root = app();
		if (!root) return;

		const ld = levelDef(level);
		const lesson = lessonData(level, slot);
		const subId = subject(ld, lesson.title);
		const subjectObj = SUBJECTS[subId] || SUBJECTS.lua;
		const saved = localStorage.getItem(evidenceKey(level, slot)) || "";

		root.innerHTML = `
			<section class="panel scholar-page">
				<div class="scholar-hero">
					<span class="badge">Scholarly Density Sublesson</span>
					<h2><span>${esc(lesson.title)}</span></h2>
					<p>
						This is dense coursework, not fake-hard coursework. Every section is here to remove uncertainty:
						terms, patterns, examples, mistakes, checks, transfer and evidence. The learner should not be overwhelmed
						by mystery; they should be surrounded by structure.
					</p>
					<div class="scholar-intensity-scale">
						<div class="scholar-intensity-card"><span>Level</span><strong>${level}: ${esc(ld.name)}</strong></div>
						<div class="scholar-intensity-card"><span>Subject</span><strong>${esc(subjectObj.label)}</strong></div>
						<div class="scholar-intensity-card"><span>Focus</span><strong>${esc(subjectObj.anchor)}</strong></div>
						<div class="scholar-intensity-card"><span>Lesson time</span><strong>75–120 min</strong></div>
						<div class="scholar-intensity-card"><span>Terms</span><strong>${subjectObj.terms.length}</strong></div>
						<div class="scholar-intensity-card"><span>Coursework blocks</span><strong>15</strong></div>
					</div>
				</div>

				<div class="scholar-section">
					<h3>1. Course Contract</h3>
					<div class="scholar-callout">
						<strong>Completion means:</strong> you can define the vocabulary, build the smallest working version, explain why it works,
						debug likely failures, apply it in a new context, and write evidence that another person can grade.
					</div>
				</div>

				<div class="scholar-section">
					<h3>2. Prerequisite Map</h3>
					<p>These are not separate lessons. They are the mental checkpoints needed before this lesson counts as learned.</p>
					<div class="scholar-grid">${renderPrereqs(subjectObj)}</div>
				</div>

				<div class="scholar-section">
					<h3>3. Vocabulary Dictionary</h3>
					<p>Vocabulary is not decoration. In technical learning, vague words cause vague building. Each term below needs a definition, a use, and a check question.</p>
					${renderTerms(subjectObj.terms)}
				</div>

				<div class="scholar-section">
					<h3>4. Concept Ladder</h3>
					<p>Move from simple recognition to production judgement. The concept is intentionally repeated through different angles so it sticks.</p>
					<div class="scholar-grid">${renderLearningBlocks(subjectObj, lesson.title)}</div>
				</div>

				<div class="scholar-section">
					<h3>5. Core Pattern</h3>
					<p>This is the smallest useful spine of the lesson. It is not the final product; it is the clean structure the final product grows from.</p>
					<pre class="scholar-code"><code>${esc(codeFor(subId))}</code></pre>
				</div>

				<div class="scholar-section">
					<h3>6. Worked Example Method</h3>
					<ol>
						<li>Read the pattern once without touching it.</li>
						<li>Rewrite it manually or rebuild the steps manually.</li>
						<li>Label each line/object/step with its job.</li>
						<li>Run/test the smallest version.</li>
						<li>Change one controlled value and predict the result.</li>
						<li>Write the rule the example teaches.</li>
					</ol>
				</div>

				<div class="scholar-section">
					<h3>7. Near-Miss Example</h3>
					<div class="scholar-callout danger">
						<strong>Near-miss rule:</strong> the best beginner training shows examples that almost work.
						The learner must identify the exact reason it fails, not just copy the fixed answer.
					</div>
					<ol>
						<li>Find one spelling/path/name mistake.</li>
						<li>Find one logic/condition mistake.</li>
						<li>Find one timing/existence mistake.</li>
						<li>Find one client/server/authority mistake if scripting is involved.</li>
						<li>Write how each mistake would look in the Output window or in-game behaviour.</li>
					</ol>
				</div>

				<div class="scholar-section">
					<h3>8. Vocabulary Checks</h3>
					${renderChecks(subjectObj.terms, subjectObj)}
				</div>

				<div class="scholar-section">
					<h3>9. Lab Manual</h3>
					<ol>
						<li><strong>Setup:</strong> create the minimum objects/assets/scripts needed.</li>
						<li><strong>Baseline:</strong> make the smallest version work once.</li>
						<li><strong>Annotation:</strong> label each critical step.</li>
						<li><strong>Stress:</strong> test wrong names, wrong order, wrong values or missing objects.</li>
						<li><strong>Repair:</strong> fix the stress case and write the defensive rule.</li>
						<li><strong>Transfer:</strong> rebuild the same idea in a second context.</li>
						<li><strong>Review:</strong> compare the first and second context.</li>
						<li><strong>Production note:</strong> record one improvement that would matter in a real game.</li>
					</ol>
				</div>

				<div class="scholar-section">
					<h3>10. Cognitive Hooks</h3>
					<div class="scholar-grid">
						<div class="scholar-card"><h4>Analogy</h4><p>Explain the system using a non-Roblox analogy. Example: a RemoteEvent is like a message being sent, not a secure decision being made.</p></div>
						<div class="scholar-card"><h4>Counterexample</h4><p>Show a case where the beginner's first instinct is wrong.</p></div>
						<div class="scholar-card"><h4>Boundary</h4><p>State what this concept does not do. Boundaries stop overusing one idea everywhere.</p></div>
						<div class="scholar-card"><h4>Trigger phrase</h4><p>Write a short phrase that reminds the learner of the key rule under pressure.</p></div>
					</div>
				</div>

				<div class="scholar-section">
					<h3>11. Retrieval Practice</h3>
					<ol>
						<li>Close the lesson and write 8 terms from memory.</li>
						<li>Write the core pattern from memory.</li>
						<li>Name 3 failure modes from memory.</li>
						<li>Explain the lesson to an imaginary beginner in 90 seconds.</li>
						<li>Return here and correct missing or weak parts.</li>
					</ol>
				</div>

				<div class="scholar-section">
					<h3>12. Coursework Questions</h3>
					<ol>
						<li>What is the core concept of this lesson?</li>
						<li>Which vocabulary terms are essential, and which are supporting terms?</li>
						<li>What is the smallest useful version of this skill?</li>
						<li>What is the most likely beginner mistake?</li>
						<li>How would you debug that mistake?</li>
						<li>How does this connect to a real Roblox game system?</li>
						<li>How would the answer change if the project became larger?</li>
						<li>What should be server-owned, client-owned, asset-owned or UI-owned?</li>
						<li>What evidence proves you did not only copy?</li>
						<li>What would you teach next after this?</li>
					</ol>
				</div>

				<div class="scholar-section">
					<h3>13. Marking Rubric</h3>
					<table class="scholar-table">
						<thead><tr><th>Grade</th><th>Meaning</th><th>Evidence standard</th></tr></thead>
						<tbody>
							<tr><td>1</td><td>Recognition only</td><td>Can point to terms but cannot use them reliably.</td></tr>
							<tr><td>2</td><td>Guided use</td><td>Can follow the pattern with help and explain some lines/steps.</td></tr>
							<tr><td>3</td><td>Independent small build</td><td>Can build the smallest version and fix simple mistakes.</td></tr>
							<tr><td>4</td><td>Transfer</td><td>Can apply the concept in a different context and compare both versions.</td></tr>
							<tr><td>5</td><td>Production judgement</td><td>Can discuss quality, safety, performance or maintainability.</td></tr>
							<tr><td>6</td><td>Teacher-ready</td><td>Can teach it clearly to a beginner with definitions, examples and failure cases.</td></tr>
						</tbody>
					</table>
				</div>

				<div class="scholar-section">
					<h3>14. Evidence Submission</h3>
					<p>Target: 500+ words. Minimum completion: 180 words. Good evidence includes definition, vocabulary, build result, bug/fix, transfer example, and production judgement.</p>
					<textarea id="scholarEvidenceBox" class="scholar-evidence-box" placeholder="Write dense coursework evidence here...">${esc(saved)}</textarea>
					<div id="scholarEvidenceStatus" class="scholar-callout warning">Words: ${countWords(saved)}. Recommended: 500+. Minimum completion: 180.</div>
					<div class="scholar-actions">
						<button type="button" onclick="saveScholarEvidence(${level}, ${slot})">Save Evidence</button>
						<button type="button" class="green" onclick="completeScholarLesson(${level}, ${slot})">Complete Scholarly Sublesson</button>
						<button type="button" class="secondary" onclick="openLevel(${level}, 'lessons')">Back to Lessons</button>
					</div>
				</div>

				<div class="scholar-section">
					<h3>15. Reference Shelf</h3>
					<p>Use references to check official meaning. Do not guess engine behaviour when documentation exists.</p>
					${refs(subjectObj)}
				</div>
			</section>
		`;

		try {
			if (typeof setCurrentView === "function") setCurrentView("scholarlyDensityLesson");
		} catch {}
	}

	function install() {
		window.openLevelLesson = openScholarLesson;
		window.caOpenCourseLesson = openScholarLesson;
		window.saveScholarEvidence = saveEvidence;
		window.completeScholarLesson = finishLesson;
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 100);
	setTimeout(install, 400);
	setTimeout(install, 1000);
})();
