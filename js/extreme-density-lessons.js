/* Creator Academy Hub — Extreme Density Lessons
   Replaces course sublesson pages with high-density, zero-assumption lesson pages.
*/
(function () {
	"use strict";

	const HOMEWORK_PREFIX = "creatorAcademy.extremeHomework.";

	const REFERENCE_LINKS = {
		studio: [
			["Roblox Creator Hub: Studio Overview", "https://create.roblox.com/docs/studio"],
			["Roblox Creator Hub: Workspace and 3D objects", "https://create.roblox.com/docs/workspace"],
			["Roblox Creator Hub: Parts", "https://create.roblox.com/docs/parts"]
		],
		lua: [
			["Roblox Creator Hub: Luau scripting", "https://create.roblox.com/docs/luau"],
			["Roblox Creator Hub: Remote events and callbacks", "https://create.roblox.com/docs/scripting/events/remote"],
			["Roblox Creator Hub: ModuleScripts", "https://create.roblox.com/docs/reference/engine/classes/ModuleScript"],
			["Roblox Creator Hub: Data stores", "https://create.roblox.com/docs/cloud-services/data-stores"],
			["Roblox Creator Hub: Data store best practices", "https://create.roblox.com/docs/cloud-services/data-stores/best-practices"]
		],
		ui: [
			["Roblox Creator Hub: User interface", "https://create.roblox.com/docs/ui"],
			["Roblox Creator Hub: Labels", "https://create.roblox.com/docs/ui/labels"],
			["Roblox Creator Hub: List and flex layouts", "https://create.roblox.com/docs/ui/list-flex-layouts"],
			["Roblox Creator Hub: UIGridLayout", "https://create.roblox.com/docs/reference/engine/classes/UIGridLayout"]
		],
		blender: [
			["Roblox Creator Hub: 3D Importer", "https://create.roblox.com/docs/art/modeling/3d-importer"],
			["Roblox Creator Hub: Meshes", "https://create.roblox.com/docs/parts/meshes"],
			["Roblox Creator Hub: Mesh requirements", "https://create.roblox.com/docs/art/modeling/specifications"],
			["Roblox Creator Hub: Blender plugin", "https://create.roblox.com/docs/art/modeling/roblox-blender-plugin"]
		],
		animation: [
			["Roblox Creator Hub: Animation", "https://create.roblox.com/docs/animation"],
			["Roblox Creator Hub: Animation Editor", "https://create.roblox.com/docs/animation/editor"],
			["Roblox Creator Hub: Animator", "https://create.roblox.com/docs/reference/engine/classes/Animator"]
		],
		security: [
			["Roblox Creator Hub: Remote events and callbacks", "https://create.roblox.com/docs/scripting/events/remote"],
			["Roblox Creator Hub: Server-side detection", "https://create.roblox.com/docs/scripting/security/server-side-detection"],
			["Roblox Creator Hub: Secure remotes with validation", "https://create.roblox.com/docs/tutorials/use-case-tutorials/scripting/intermediate-scripting/hit-detection-with-lasers"]
		]
	};

	const GLOSSARY = {
		studio: [
			["Explorer", "The hierarchy view showing services, models, parts, scripts, UI objects and assets.", "Find where objects live before scripting them."],
			["Properties", "The inspector panel used to edit an object's values.", "Change Anchored, Transparency, Size, Color, CanCollide, Name and more."],
			["Workspace", "The 3D world container where visible physical objects usually live.", "Parts placed here can appear in the game world."],
			["Instance", "A Roblox object. Parts, Scripts, Folders, ScreenGuis and RemoteEvents are all Instances.", "Instance.new('Part') creates a new Part object."],
			["Parent", "The object that contains another object.", "A Part without Parent will not appear in Workspace."],
			["Child", "An object inside another object.", "workspace.Button means Button is a child of Workspace."],
			["Descendant", "An object inside another object at any depth.", "A TextLabel inside Frame inside ScreenGui is a descendant of ScreenGui."],
			["BasePart", "The base class for physical 3D parts.", "Part, MeshPart, WedgePart and UnionOperation are physical world objects."],
			["Anchored", "A property that stops physics from moving a part.", "Tycoon buttons should usually be Anchored."],
			["CanCollide", "A property that decides if objects physically collide.", "Invisible triggers often use CanCollide = false."],
			["Transparency", "How see-through an object is, from 0 visible to 1 invisible.", "Use 1 for hidden detection zones."],
			["Vector3", "A 3D value with X, Y and Z numbers.", "Used for Size, Position and directions."],
			["CFrame", "A coordinate frame containing position and rotation.", "Used when exact placement and rotation matter."],
			["Model", "A container for multiple objects that form one thing.", "A house upgrade, car, machine or room can be a Model."],
			["PrimaryPart", "A selected main part of a Model used for positioning.", "Useful when moving whole models accurately."],
			["Pivot", "The transform reference point for moving or rotating models.", "Modern model positioning uses pivots instead of manually moving every part."],
			["Service", "A top-level Roblox system object.", "Players, ReplicatedStorage, ServerScriptService and TweenService are services."],
			["ServerScriptService", "A server-only script container.", "Put secure gameplay logic here."],
			["StarterGui", "Container that copies UI to each player's PlayerGui.", "Use this for screen interfaces."],
			["StarterPlayerScripts", "Container for LocalScripts that run for the player.", "Use this for client-side input or camera logic."]
		],
		lua: [
			["Variable", "A named container for a value.", "local cash = 500"],
			["local", "Limits a variable/function to the current scope.", "Prevents accidental global variables."],
			["String", "Text inside quotes.", "'Button' and \"Button\" are strings."],
			["Number", "A numeric value used for maths.", "cash = cash + 100"],
			["Boolean", "true or false.", "canBuy = cash >= price"],
			["nil", "No value / absence of value.", "A missing child lookup can return nil."],
			["Table", "Lua's main data structure for lists/dictionaries.", "{cash = 500, level = 2}"],
			["Function", "A reusable block of code.", "function buyUpgrade(player) ... end"],
			["Parameter", "A placeholder input in a function definition.", "function createPart(name)"],
			["Argument", "A real value passed into a function call.", "createPart('Button')"],
			["Return", "Sends a result back from a function.", "return cash >= price"],
			["if statement", "Runs code only when a condition is true.", "if cash >= price then"],
			["Comparison", "Checking values against each other.", "==, ~=, >, <, >=, <="],
			["Assignment", "Putting a value into a variable.", "cash = 500"],
			["Event", "A signal that something happened.", "Part.Touched fires when something touches it."],
			["Connection", "A link between an event and a function.", "event:Connect(function() end)"],
			["RemoteEvent", "Asynchronous one-way client/server communication.", "Client asks server to buy an upgrade."],
			["RemoteFunction", "Synchronous two-way client/server callback.", "Use carefully because it yields."],
			["ModuleScript", "Reusable script that returns a table/value.", "Shared config or functions."],
			["DataStore", "Persistent storage between play sessions.", "Save cash, levels, purchases and progress."]
		],
		ui: [
			["ScreenGui", "A UI container copied to PlayerGui for screen interfaces.", "Main menu, shop, admin panel."],
			["Frame", "A rectangular UI container.", "Holds buttons, labels and layout objects."],
			["TextLabel", "A UI object that displays text.", "Cash display, title, instructions."],
			["TextButton", "A clickable text UI object.", "Buy, close, continue."],
			["ImageLabel", "A UI object that displays an image.", "Icons, avatars, badges."],
			["UDim2", "A UI position/size value using scale and offset.", "UDim2.new(0.5,0,0.5,0)."],
			["Scale", "A relative UI measurement based on parent size.", "0.5 means half of parent."],
			["Offset", "A pixel-based UI measurement.", "100 means 100 pixels."],
			["AnchorPoint", "The point on a UI object used for positioning.", "0.5,0.5 centers from the middle."],
			["UIListLayout", "Automatically arranges sibling UI objects in a row/column.", "Good for menus and lists."],
			["UIGridLayout", "Arranges UI objects into a grid.", "Inventory, course cards, shop products."],
			["UIPadding", "Adds internal spacing inside a container.", "Stops text/buttons touching edges."],
			["UICorner", "Rounds UI corners.", "Modern clean panels."],
			["UIStroke", "Adds an outline/stroke to UI.", "Borders and highlights."],
			["ZIndex", "Controls what UI appears on top.", "Modal above background."],
			["Responsive UI", "UI that adapts to different screen sizes.", "Phone, tablet, desktop."]
		],
		blender: [
			["Mesh", "A 3D shape made from vertices, edges and faces.", "Most custom Roblox assets become MeshParts."],
			["Vertex", "A point in 3D space.", "Mesh corners are vertices."],
			["Edge", "A line between two vertices.", "Edges form the structure of the mesh."],
			["Face", "A flat surface made from edges.", "Too many faces can make assets heavy."],
			["Polygon count", "How many faces/triangles a mesh uses.", "Lower counts usually perform better."],
			["UV map", "A 2D layout for applying textures to a 3D mesh.", "Needed for clean texturing."],
			["Normals", "Directions surfaces face.", "Broken normals cause weird shading."],
			["Origin", "An object's pivot/reference point in Blender.", "Bad origins make Roblox placement painful."],
			["Scale applied", "Blender transform scale reset to clean values.", "Apply scale before exporting."],
			["FBX", "A common 3D export format.", "Often used to bring assets into Roblox."],
			["MeshPart", "A Roblox part using custom mesh geometry.", "Imported Blender asset in Roblox."],
			["Collision", "How physical interaction is calculated.", "Complex collisions can hurt performance."],
			["Texture", "An image mapped onto a surface.", "Colour/detail without extra geometry."],
			["Material", "Surface appearance settings.", "Metal, plastic, wood, glass style."],
			["LOD", "Level of detail.", "Simpler versions for distance/performance."]
		],
		animation: [
			["Rig", "A model with bones/motor joints for animation.", "Character or object structure for movement."],
			["Joint", "Connection between rig parts.", "Motor6D joints drive Roblox character rigs."],
			["Keyframe", "A saved pose at a time point.", "The animation interpolates between keyframes."],
			["Timeline", "The time track where keyframes are placed.", "Used to control pacing."],
			["Ease", "Acceleration/deceleration between poses.", "Smooth movement instead of robotic snaps."],
			["Pose", "The position/rotation of rig parts at a moment.", "A jump pose, idle pose, attack pose."],
			["AnimationTrack", "A loaded playable animation instance.", "Play, Stop, AdjustSpeed."],
			["Animator", "The object that loads and plays animations.", "Usually under Humanoid or AnimationController."],
			["Looping", "Whether an animation repeats.", "Idle animation loops; attack usually does not."],
			["Priority", "Controls which animation wins over others.", "Action animations can override idle."],
			["Moon Animator", "A popular Roblox animation plugin/workflow.", "Used for richer cutscenes and object animation."],
			["Blocking", "Roughly placing the main poses first.", "Build timing before polishing."],
			["Polish", "Final smoothing/detail stage.", "Fix arcs, timing, ease and overlaps."],
			["Anticipation", "Movement before the main action.", "Wind-up before punch/jump."],
			["Follow-through", "Movement continuing after the main action.", "Cape/hair/arms settle after motion."]
		],
		security: [
			["Client", "The player's machine/app.", "Never fully trusted."],
			["Server", "The authoritative game simulation.", "Validates money, purchases, damage and saves."],
			["Exploit", "A modified client or external tool abusing game systems.", "Can fire remotes with fake values."],
			["Validation", "Checking that a request is allowed before accepting it.", "Server verifies price and player cash."],
			["Rate limit", "Restricting how often an action can happen.", "Prevents remote spam."],
			["Sanity check", "Basic impossible-value detection.", "Reject negative prices or huge cash claims."],
			["Authority", "Which side has final decision power.", "Server should own cash and purchases."],
			["Cooldown", "Minimum time between allowed actions.", "Anti-spam for buttons/remotes."],
			["Idempotent", "Safe if repeated.", "Claim reward only once even if clicked twice."],
			["Audit log", "Record of important actions.", "Track admin grants, purchases and suspicious remote use."],
			["Rollback", "Undoing a bad/false action.", "Safer than permanent punishment."],
			["Surface area", "The set of places attackers can interact with.", "Every RemoteEvent is attack surface."]
		]
	};

	function html(value) {
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

	function words(text) {
		return String(text || "").trim().split(/\s+/).filter(Boolean).length;
	}

	function getApp() {
		return document.getElementById("app");
	}

	function getLevelDef(level) {
		try {
			if (Array.isArray(levelDefinitions)) {
				return levelDefinitions.find(function (item) { return Number(item.level) === Number(level); }) || levelDefinitions[level - 1];
			}
		} catch (error) {}

		return {
			level,
			name: "Course Level " + level,
			focus: "Creator skill development.",
			courses: ["Roblox Lua", "Roblox Studio Basics"]
		};
	}

	function getSlotData(level, slot) {
		try {
			if (levelLessonTemplates && levelLessonTemplates[level] && levelLessonTemplates[level][slot - 1]) {
				const template = levelLessonTemplates[level][slot - 1];
				return {
					realLessonId: template[0],
					title: template[1] || "Course Lesson " + slot
				};
			}
		} catch (error) {}

		return { realLessonId: null, title: "Course Lesson " + slot };
	}

	function isComplete(level, slot) {
		try {
			if (typeof isLevelLessonComplete === "function") return isLevelLessonComplete(level, slot);
		} catch (error) {}

		return localStorage.getItem("creatorAcademy.levelLesson." + level + "." + slot) === "true";
	}

	function markComplete(level, slot) {
		try {
			if (typeof markLevelLessonComplete === "function") {
				markLevelLessonComplete(level, slot);
				return;
			}
		} catch (error) {}

		localStorage.setItem("creatorAcademy.levelLesson." + level + "." + slot, "true");
	}

	function subjectFrom(levelDef, lessonTitle) {
		const text = [levelDef.name, levelDef.focus, lessonTitle, (levelDef.courses || []).join(" ")].join(" ").toLowerCase();

		if (text.includes("security") || text.includes("remote") || text.includes("exploit")) return "security";
		if (text.includes("ui") || text.includes("interface") || text.includes("gui")) return "ui";
		if (text.includes("blender") || text.includes("asset") || text.includes("mesh") || text.includes("model")) return "blender";
		if (text.includes("animation") || text.includes("moon") || text.includes("animator")) return "animation";
		if (text.includes("studio") || text.includes("workspace") || text.includes("part") || text.includes("building")) return "studio";
		if (text.includes("lua") || text.includes("script") || text.includes("data") || text.includes("module")) return "lua";

		return "lua";
	}

	function relatedSubjects(primary) {
		const list = [primary];

		if (primary === "studio") list.push("lua", "ui");
		if (primary === "lua") list.push("studio", "security");
		if (primary === "ui") list.push("lua", "studio");
		if (primary === "blender") list.push("studio", "ui");
		if (primary === "animation") list.push("studio", "blender");
		if (primary === "security") list.push("lua", "studio");

		return Array.from(new Set(list));
	}

	function vocabulary(primary) {
		const keys = relatedSubjects(primary);
		let all = [];

		keys.forEach(function (key) {
			all = all.concat((GLOSSARY[key] || []).map(function (term) {
				return { subject: key, term: term[0], definition: term[1], use: term[2] };
			}));
		});

		return all.slice(0, 45);
	}

	function references(primary) {
		const keys = relatedSubjects(primary);
		let refs = [];

		keys.forEach(function (key) {
			refs = refs.concat(REFERENCE_LINKS[key] || []);
		});

		const seen = new Set();
		return refs.filter(function (ref) {
			if (seen.has(ref[1])) return false;
			seen.add(ref[1]);
			return true;
		});
	}

	function conceptText(primary, title) {
		const map = {
			studio: [
				"Roblox Studio work is object-hierarchy work. A beginner usually thinks visually: 'I see a button, therefore it exists.' A developer thinks structurally: 'This object is an Instance, it has a parent, it has properties, and code can find it by path.'",
				"The point is not to memorise every panel. The point is to know where objects live, what properties control them, and how a script can safely create, find, modify or destroy them.",
				"Treat every object as a record with a job: where it is stored, whether it appears, whether physics affects it, whether players can touch it, and whether server or client code should control it."
			],
			lua: [
				"Roblox Lua work is state and event control. State means values that exist now: cash, level, owned upgrades, cooldowns, selected course and current lesson. Events are signals that something happened: a part was touched, a button was clicked, a remote was fired.",
				"A beginner writes code hoping it runs. A developer asks: what starts this code, what data enters, what data changes, who is allowed to change it, and what should happen if the data is wrong?",
				"Every script should have a clear owner. Server code owns trust-sensitive game state. Client code owns input, camera, local UI and visual feedback."
			],
			ui: [
				"UI work is information hierarchy. You are not decorating a screen; you are deciding what the player notices first, what action they understand, and what feedback proves their action worked.",
				"A good Roblox UI is responsive, readable, predictable and hard to misclick. Layout objects and constraints are not optional polish; they prevent the UI from breaking on different screens.",
				"Every UI should answer: what is this, what should I do, what happened after I clicked, and how do I escape or go back?"
			],
			blender: [
				"Blender-to-Roblox work is production discipline. A mesh is not finished because it looks good in Blender. It must import cleanly, scale correctly, shade correctly, collide efficiently and perform acceptably in Roblox.",
				"Asset quality comes from controlled geometry, clean origins, applied transforms, sensible polygon counts, readable silhouettes and Roblox-friendly export settings.",
				"The workflow is not 'make thing then import.' It is blockout, proportions, topology cleanup, UV/material plan, export, import, collision check, scale check, performance check."
			],
			animation: [
				"Animation work is controlled time. You are not moving parts randomly; you are deciding poses, spacing, timing, easing, anticipation and follow-through.",
				"A strong animation reads clearly even before polish. The viewer should understand the action from the main poses alone. Polish comes after readable blocking.",
				"Roblox animation also has technical rules: rig structure, Animator usage, priority, looping, playback, and how animation interacts with gameplay."
			],
			security: [
				"Roblox security starts with one rule: the client is not trusted. The server must validate anything that affects money, ownership, damage, inventory, progression or moderation.",
				"RemoteEvents are not magic secure pipes. They are public doors. A player can attempt to fire them with fake arguments, too often, at the wrong time, or for things they should not control.",
				"Secure systems use validation, rate limiting, server-side ownership, cooldowns, sanity checks and logging. Detection is backup; design is the defence."
			]
		};

		return map[primary] || map.lua;
	}

	function codePattern(primary, title) {
		if (primary === "studio") {
			return `-- Object creation pattern
local part = Instance.new("Part")
part.Name = "TrainingButton"
part.Size = Vector3.new(8, 1, 8)
part.Position = Vector3.new(0, 3, 0)
part.Anchored = true
part.CanCollide = true
part.Parent = workspace

-- Meaning:
-- Instance.new creates the object.
-- Properties configure it.
-- Parent decides where it lives.`;
		}

		if (primary === "lua") {
			return `-- Server-side purchase check pattern
local function canBuy(playerCash, price)
	if type(playerCash) ~= "number" then return false end
	if type(price) ~= "number" then return false end
	if price <= 0 then return false end

	return playerCash >= price
end

local cash = 500
local price = 250

if canBuy(cash, price) then
	cash = cash - price
	print("Purchase approved")
else
	print("Not enough cash")
end`;
		}

		if (primary === "ui") {
			return `-- UI path pattern
local player = game.Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = playerGui:WaitForChild("MainGui")
local frame = screenGui:WaitForChild("MainFrame")
local button = frame:WaitForChild("ContinueButton")

button.MouseButton1Click:Connect(function()
	frame.Visible = false
	print("Continue clicked")
end)`;
		}

		if (primary === "security") {
			return `-- RemoteEvent validation pattern
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local BuyUpgrade = ReplicatedStorage:WaitForChild("BuyUpgrade")

local PRICES = {
	SmallHouse = 250,
	Garage = 750
}

local lastRequest = {}

BuyUpgrade.OnServerEvent:Connect(function(player, upgradeName)
	local now = os.clock()
	if lastRequest[player] and now - lastRequest[player] < 0.5 then
		return
	end
	lastRequest[player] = now

	if type(upgradeName) ~= "string" then return end

	local price = PRICES[upgradeName]
	if not price then return end

	local cash = player.leaderstats.Cash.Value
	if cash < price then return end

	player.leaderstats.Cash.Value = cash - price
	print(player.Name .. " bought " .. upgradeName)
end)`;
		}

		if (primary === "blender") {
			return `Blender → Roblox asset checklist

1. Model at sensible scale.
2. Apply transforms before export.
3. Keep polygon count controlled.
4. Fix normals/shading.
5. Set origin/pivot deliberately.
6. Export FBX/mesh format.
7. Import with Roblox 3D Importer.
8. Check scale in Studio.
9. Check collisions.
10. Check performance in a test place.`;
		}

		if (primary === "animation") {
			return `Animation production pattern

1. Define action: what is moving and why?
2. Block 3-5 key poses.
3. Set timing before polish.
4. Add anticipation.
5. Add follow-through.
6. Adjust easing.
7. Test in-game.
8. Check priority/looping.
9. Check if gameplay interrupts it.
10. Export/save with clear naming.`;
		}

		return "";
	}

	function renderVocabulary(vocab) {
		return `
			<table class="vocab-table">
				<thead>
					<tr>
						<th>Term</th>
						<th>Definition</th>
						<th>Why it matters</th>
					</tr>
				</thead>
				<tbody>
					${vocab.map(function (item) {
						return `<tr>
							<td>${html(item.term)}</td>
							<td>${html(item.definition)}</td>
							<td>${html(item.use)}</td>
						</tr>`;
					}).join("")}
				</tbody>
			</table>
		`;
	}

	function renderMicrochapters(primary, title) {
		const chapters = [
			{
				name: "1. Recognition Pass",
				time: "8–12 min",
				body: "Identify every object, value, event, property or system involved. Do not build yet. Name the moving parts so your brain has handles.",
				tasks: ["Write the exact object path or workflow path.", "List which side owns the work: server, client, asset tool or UI.", "Circle any term you cannot define."]
			},
			{
				name: "2. Vocabulary Lock",
				time: "10–15 min",
				body: "Convert words into usable meanings. You are not allowed to progress if you only recognise the term but cannot use it in a sentence.",
				tasks: ["Define 10 terms without copying.", "Give one Roblox example per term.", "Explain one term to a complete beginner."]
			},
			{
				name: "3. Build Pattern",
				time: "15–20 min",
				body: "Use the pattern. Copying is allowed only if you annotate each line/step. No blind paste, no mystery code, no fake understanding.",
				tasks: ["Build the smallest working version.", "Label each important line or production step.", "Run/test immediately after the first working version."]
			},
			{
				name: "4. Break and Debug",
				time: "10–15 min",
				body: "Intentionally look for failure. Strong developers do not ask whether it works once; they ask what happens when data, timing or setup is wrong.",
				tasks: ["Create one likely beginner mistake.", "Predict the error before testing.", "Fix it and write the rule that prevents it."]
			},
			{
				name: "5. Transfer Challenge",
				time: "15–25 min",
				body: "Apply the idea in a different situation. This proves the skill is not locked to one tutorial example.",
				tasks: ["Change the object/name/value/context.", "Explain what stayed the same.", "Explain what changed and why."]
			},
			{
				name: "6. Production Judgement",
				time: "10–15 min",
				body: "Judge quality. A feature can work and still be messy, unsafe, ugly, slow or impossible to maintain.",
				tasks: ["Name one performance concern.", "Name one security or reliability concern.", "Name one maintainability improvement."]
			},
			{
				name: "7. Evidence Write-up",
				time: "10–15 min",
				body: "Turn the work into reviewable evidence. If a teacher/admin cannot judge it, it is not finished.",
				tasks: ["Screenshot or quote the important result.", "Write the before/after.", "Write the rule learned in one clean sentence."]
			},
			{
				name: "8. Mini Oral Exam",
				time: "5–10 min",
				body: "Answer out loud or in writing. The aim is fast recall, not essay waffle.",
				tasks: ["Define the core term.", "Explain the most common mistake.", "Explain when not to use this pattern."]
			}
		];

		return chapters.map(function (chapter) {
			return `
				<div class="extreme-microchapter">
					<span class="micro-time">${html(chapter.time)}</span>
					<h4>${html(chapter.name)}</h4>
					<p>${html(chapter.body)}</p>
					<ul>
						${chapter.tasks.map(function (task) { return `<li>${html(task)}</li>`; }).join("")}
					</ul>
				</div>
			`;
		}).join("");
	}

	function renderChecks(vocab, primary, title) {
		const selected = vocab.slice(0, 14);

		return `
			<div class="extreme-grid">
				<div class="extreme-check-card">
					<h4>Vocabulary Check A: Define</h4>
					<ol>
						${selected.slice(0, 7).map(function (item) {
							return `<li>Define <strong>${html(item.term)}</strong> without using the word itself.</li>`;
						}).join("")}
					</ol>
				</div>

				<div class="extreme-check-card">
					<h4>Vocabulary Check B: Use</h4>
					<ol>
						${selected.slice(7, 14).map(function (item) {
							return `<li>Give one Roblox example of <strong>${html(item.term)}</strong>.</li>`;
						}).join("")}
					</ol>
				</div>

				<div class="extreme-check-card">
					<h4>Misconception Trap</h4>
					<ol>
						<li>What would a beginner wrongly assume about this topic?</li>
						<li>What is the correct rule?</li>
						<li>What bug happens if the wrong assumption is used?</li>
						<li>How would you detect that bug quickly?</li>
					</ol>
				</div>

				<div class="extreme-check-card">
					<h4>No-Fluff Recall Test</h4>
					<ol>
						<li>Define the topic in one sentence.</li>
						<li>Name the owner of the system: client, server, UI, asset pipeline or animation pipeline.</li>
						<li>Name the minimum working version.</li>
						<li>Name the safety/performance/quality risk.</li>
					</ol>
				</div>
			</div>
		`;
	}

	function renderRubric() {
		return `
			<table class="extreme-rubric-table">
				<thead>
					<tr>
						<th>Band</th>
						<th>Meaning</th>
						<th>Evidence</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>0 — Fake Complete</td>
						<td>The learner clicked complete but cannot explain the work.</td>
						<td>Short answer, no evidence, no vocabulary, no test.</td>
					</tr>
					<tr>
						<td>1 — Recognition</td>
						<td>The learner recognises the concept but needs heavy guidance.</td>
						<td>Basic definitions and copied example with some labels.</td>
					</tr>
					<tr>
						<td>2 — Guided Control</td>
						<td>The learner can use the pattern when given the structure.</td>
						<td>Working attempt, line/step explanation, one bug fixed.</td>
					</tr>
					<tr>
						<td>3 — Independent Transfer</td>
						<td>The learner can apply the idea in a changed situation.</td>
						<td>Variation attempt, before/after comparison, correct vocabulary.</td>
					</tr>
					<tr>
						<td>4 — Production Judgement</td>
						<td>The learner can judge quality, safety and maintainability.</td>
						<td>Performance/security/design notes and a clear improvement plan.</td>
					</tr>
					<tr>
						<td>5 — Teacher-Ready</td>
						<td>The learner can explain it clearly enough to teach another beginner.</td>
						<td>Clean definitions, working proof, debug story, transfer example, exam answers.</td>
					</tr>
				</tbody>
			</table>
		`;
	}

	function renderReferences(primary) {
		const refs = references(primary);

		return `
			<div class="extreme-reference-list">
				${refs.map(function (ref) {
					return `<a href="${html(ref[1])}" target="_blank" rel="noopener noreferrer">${html(ref[0])}</a>`;
				}).join("")}
			</div>
		`;
	}

	function homeworkKey(level, slot) {
		return HOMEWORK_PREFIX + level + ":" + slot;
	}

	function saveExtremeHomework(level, slot) {
		const box = document.getElementById("extremeHomeworkBox");
		if (!box) return;

		localStorage.setItem(homeworkKey(level, slot), box.value.trim());

		const status = document.getElementById("extremeHomeworkStatus");
		if (status) {
			status.textContent = "Saved. Words: " + words(box.value) + ". Target: 350+ words for dense evidence.";
		}

		if (typeof showToast === "function") showToast("Dense evidence saved.");
	}

	function completeExtremeLesson(level, slot) {
		const box = document.getElementById("extremeHomeworkBox");
		const count = words(box ? box.value : "");

		if (count < 120) {
			if (typeof showToast === "function") showToast("Evidence is too thin. Write at least 120 words before marking complete.");
			return;
		}

		saveExtremeHomework(level, slot);
		markComplete(level, slot);

		try {
			if (typeof awardOnce === "function") {
				awardOnce("extreme-density:" + level + ":" + slot, 180, "Completed dense sublesson evidence", "lessons");
			}
		} catch (error) {}

		if (typeof showToast === "function") showToast("Dense sublesson complete.");

		if (typeof openLevel === "function") {
			openLevel(level, "lessons");
		}
	}

	function openExtremeLesson(level, slot) {
		level = Number(level);
		slot = Number(slot);

		const app = getApp();
		if (!app) return;

		if (slot > 1 && !isComplete(level, slot - 1)) {
			if (typeof showToast === "function") showToast("Complete the previous sublesson first.");
			if (typeof openLevel === "function") openLevel(level, "lessons");
			return;
		}

		const levelDef = getLevelDef(level);
		const lesson = getSlotData(level, slot);
		const primary = subjectFrom(levelDef, lesson.title);
		const vocab = vocabulary(primary);
		const concept = conceptText(primary, lesson.title);
		const saved = localStorage.getItem(homeworkKey(level, slot)) || "";

		app.innerHTML = `
			<section class="panel extreme-lesson-page">
				<div class="extreme-hero">
					<span class="badge">Extreme Density Sublesson</span>
					<h2>${html(lesson.title)}</h2>
					<p>
						This lesson is built for zero-assumption learning. It is information dense on purpose:
						vocabulary first, mental model second, practical pattern third, debug and transfer after.
						The goal is not to read fast. The goal is to leave with no loose corners.
					</p>

					<div class="extreme-meta-grid">
						<div class="extreme-meta-card"><span>Level</span><strong>${level}: ${html(levelDef.name)}</strong></div>
						<div class="extreme-meta-card"><span>Slot</span><strong>Sublesson ${slot}</strong></div>
						<div class="extreme-meta-card"><span>Primary subject</span><strong>${html(primary)}</strong></div>
						<div class="extreme-meta-card"><span>Estimated time</span><strong>60–90 minutes</strong></div>
						<div class="extreme-meta-card"><span>Vocabulary</span><strong>${vocab.length} terms</strong></div>
						<div class="extreme-meta-card"><span>Microchapters</span><strong>8 passes</strong></div>
					</div>
				</div>

				<div class="extreme-section">
					<h3>Direct Definition</h3>
					<p><strong>${html(lesson.title)}</strong> is the ability to understand, build, test, explain and transfer this specific skill inside a Roblox creator workflow. Completing it means you can define the core terms, build the smallest working version, debug the common mistakes, and apply it in a second context.</p>
					<div class="extreme-callout gold">
						<strong>Progress rule:</strong> If you cannot define the vocabulary, you do not own the skill yet. If you cannot debug it, you only copied it. If you cannot transfer it, it is not stable knowledge.
					</div>
				</div>

				<div class="extreme-section">
					<h3>Mental Model</h3>
					${concept.map(function (paragraph) { return `<p>${html(paragraph)}</p>`; }).join("")}
				</div>

				<div class="extreme-section">
					<h3>Vocabulary Dictionary</h3>
					<p>Do not skip this. The dictionary is the memory map. Every later instruction depends on these words having exact meaning.</p>
					${renderVocabulary(vocab)}
				</div>

				<div class="extreme-section">
					<h3>Eight Microchapters</h3>
					<p>This turns one sublesson into multiple learning passes. Each pass attacks the concept from a different angle.</p>
					<div class="extreme-grid">
						${renderMicrochapters(primary, lesson.title)}
					</div>
				</div>

				<div class="extreme-section">
					<h3>Core Pattern</h3>
					<p>Use this as the spine of the lesson. Understand the pattern before trying to make it fancy.</p>
					<pre class="extreme-code"><code>${html(codePattern(primary, lesson.title))}</code></pre>
				</div>

				<div class="extreme-section">
					<h3>Vocabulary Checks and Misconception Traps</h3>
					${renderChecks(vocab, primary, lesson.title)}
				</div>

				<div class="extreme-section">
					<h3>Practical Ladder</h3>
					<ol>
						<li><strong>Smallest version:</strong> Build the simplest working version with no decoration.</li>
						<li><strong>Named version:</strong> Rename every important object/value so the structure is readable.</li>
						<li><strong>Explained version:</strong> Add comments or notes explaining every major decision.</li>
						<li><strong>Broken version:</strong> Intentionally create one likely beginner mistake.</li>
						<li><strong>Fixed version:</strong> Fix the mistake and explain the rule.</li>
						<li><strong>Changed version:</strong> Rebuild the idea in a second context so it is not memorised as one example.</li>
						<li><strong>Production version:</strong> Add a safety, performance, design or maintainability improvement.</li>
					</ol>
				</div>

				<div class="extreme-section">
					<h3>Debugging Checklist</h3>
					<div class="extreme-grid">
						<div class="extreme-check-card">
							<h4>Object/path bugs</h4>
							<ul>
								<li>Is the object inside the folder/service your code expects?</li>
								<li>Is the name spelled exactly the same, including capitals?</li>
								<li>Does the object exist before the code tries to use it?</li>
								<li>Should you use <code>WaitForChild</code> instead of direct indexing?</li>
							</ul>
						</div>
						<div class="extreme-check-card">
							<h4>Logic bugs</h4>
							<ul>
								<li>Did you use <code>=</code> when you meant <code>==</code>?</li>
								<li>Is the comparison reversed?</li>
								<li>Can the value be nil?</li>
								<li>Can the value be the wrong type?</li>
							</ul>
						</div>
						<div class="extreme-check-card">
							<h4>Authority bugs</h4>
							<ul>
								<li>Is the client trying to own something the server should own?</li>
								<li>Can an exploiter fake this request?</li>
								<li>Does the server validate the data?</li>
								<li>Is there a rate limit or cooldown?</li>
							</ul>
						</div>
						<div class="extreme-check-card">
							<h4>Quality bugs</h4>
							<ul>
								<li>Is the naming readable?</li>
								<li>Is the structure easy to change later?</li>
								<li>Does it work on different screen sizes/devices?</li>
								<li>Does it create unnecessary lag or clutter?</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="extreme-section">
					<h3>Mini Exam</h3>
					<ol>
						<li>Define this sublesson in one sentence.</li>
						<li>List ten vocabulary terms from memory and explain why each matters.</li>
						<li>Write the minimum working version of the pattern.</li>
						<li>Name three ways this can break.</li>
						<li>Name one server/client/security rule connected to this topic.</li>
						<li>Explain how this would appear inside a real Roblox game, not a tutorial.</li>
						<li>Build or describe a second version that uses the same idea differently.</li>
						<li>Grade your own work using the rubric below.</li>
					</ol>
					${renderRubric()}
				</div>

				<div class="extreme-section">
					<h3>Evidence Box</h3>
					<p>Write dense evidence. Required: definition, vocabulary, practical result, bug/fix, transfer example, and production judgement.</p>
					<textarea id="extremeHomeworkBox" class="extreme-answer-box" placeholder="Write your dense lesson evidence here...">${html(saved)}</textarea>
					<div id="extremeHomeworkStatus" class="extreme-callout">Words: ${words(saved)}. Target: 350+ words. Minimum to mark complete: 120 words.</div>
					<div class="extreme-actions">
						<button type="button" onclick="saveExtremeHomework(${level}, ${slot})">Save Evidence</button>
						<button type="button" class="green" onclick="completeExtremeLesson(${level}, ${slot})">Mark Dense Sublesson Complete</button>
						<button type="button" class="secondary" onclick="openLevel(${level}, 'lessons')">Back to Lessons</button>
					</div>
				</div>

				<div class="extreme-section">
					<h3>Reference Links</h3>
					<p>Use these when the learner needs the official or reference-backed source instead of guessing.</p>
					${renderReferences(primary)}
				</div>
			</section>
		`;

		try {
			if (typeof setCurrentView === "function") setCurrentView("extremeDensityLesson");
		} catch (error) {}
	}

	function install() {
		window.openLevelLesson = openExtremeLesson;
		window.caOpenCourseLesson = openExtremeLesson;
		window.saveExtremeHomework = saveExtremeHomework;
		window.completeExtremeLesson = completeExtremeLesson;

		document.querySelectorAll("button.lesson-slot-card, .lesson-slot-grid button").forEach(function (button) {
			const raw = button.getAttribute("onclick") || "";
			const match = raw.match(/openLevelLesson\((\d+),\s*(\d+)\)/);

			if (match) {
				const level = Number(match[1]);
				const slot = Number(match[2]);
				button.onclick = function (event) {
					event.preventDefault();
					openExtremeLesson(level, slot);
					return false;
				};
			}
		});
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 80);
	setTimeout(install, 300);
	setTimeout(install, 900);

	const app = document.getElementById("app");
	if (app) {
		new MutationObserver(function () {
			requestAnimationFrame(install);
		}).observe(app, { childList: true, subtree: true });
	}
})();
