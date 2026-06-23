/*
Creator Academy Hub generated runtime bundle.
Do not reorder layers unless you understand the override chain.
Source layer order is defined in tools/build-bundles.js.
*/

/* ===== js/script.js ===== */
const app = document.getElementById("app");
const toast = document.getElementById("toast");

const paths = {
  "lua": {
    "title": "Roblox Lua",
    "type": "Coding",
    "description": "Learn how to make Roblox experiences interactive with scripts, variables, conditions, events, parts, UI, and game logic.",
    "lessons": [
      "lua1",
      "lua2",
      "lua3",
      "lua4",
      "lua5"
    ]
  },
  "blender": {
    "title": "Blender",
    "type": "3D Modelling",
    "description": "Learn how to create simple 3D assets, understand modelling basics, and prepare objects for Roblox Studio.",
    "lessons": [
      "blend1",
      "blend2",
      "blend3"
    ]
  },
  "moon": {
    "title": "Moon Animator",
    "type": "Animation",
    "description": "Learn keyframes, object animation, beginner character poses, and simple cutscene thinking.",
    "lessons": [
      "moon1",
      "moon2",
      "moon3"
    ]
  }
};
const lessons = {
  "lua1": {
    "path": "lua",
    "title": "Lua 1: Variables",
    "summary": "Variables store information so code can reuse it later.",
    "concept": "A variable is a named storage box. It can hold values like numbers, text, booleans, or Roblox objects.",
    "deepDive": [
      "Variables are one of the first ideas every programmer must control because they let a program remember information. Without variables, code would be forced to use raw values everywhere, which quickly becomes messy. In Roblox, variables can store simple values such as coins, names, prices, and true-or-false states, but they can also store actual Roblox objects such as Parts, Frames, Buttons, Players, and Models.",
      "The word `local` tells Lua that this variable belongs to the current script or block of code. This is normally safer than making a global variable, because it prevents one random script from accidentally changing another script\u2019s data. When learning Roblox scripting, the best default habit is to use `local` unless there is a clear reason not to.",
      "Variable names should describe what the value means. A name like `x` works, but it tells the reader almost nothing. A name like `coins`, `itemPrice`, or `isUnlocked` explains the purpose instantly. Good names reduce bugs because you can read your script later and understand what the values are supposed to represent.",
      "Text values are called strings and must go inside quotation marks. Numbers do not use quotation marks. Boolean values are written as `true` or `false`. This distinction matters because `500` is a number you can add or subtract, while `\"500\"` is text that only looks like a number."
    ],
    "code": "local coins = 100\nlocal itemName = \"Speed Boost\"\nlocal isUnlocked = false\n\nprint(coins)\nprint(itemName)\nprint(isUnlocked)",
    "explain": [
      "`local` creates a local variable.",
      "`coins`, `itemName`, and `isUnlocked` are variable names.",
      "`=` stores a value inside a variable.",
      "`false` is a boolean, meaning no/off/not true."
    ],
    "quiz": {
      "question": "What does this print? `local score = 50; score = score + 25; print(score)`",
      "options": [
        "25",
        "50",
        "75"
      ],
      "answer": "75"
    },
    "task": "Create three variables: one number, one text value, and one true/false value. Print all three."
  },
  "lua2": {
    "path": "lua",
    "title": "Lua 2: If Statements",
    "summary": "If statements let code make decisions.",
    "concept": "An if statement checks a condition. If the condition is true, one block runs. If false, the else block runs.",
    "deepDive": [
      "An if statement is the basic decision-making tool in Lua. Games constantly make decisions: can the player buy this item, did the player touch the checkpoint, is the door unlocked, is the enemy alive, or has the timer reached zero? Each of those systems depends on code checking a condition and choosing what to do next.",
      "The condition goes after `if` and before `then`. In `if coins >= price then`, the script checks whether the coin amount is greater than or equal to the price. If the check is true, Lua runs the first block. If the check is false, Lua skips to the `else` block, if one exists.",
      "The difference between `=` and `==` is critical. A single equals sign stores or changes a value, such as `coins = 100`. A double equals sign compares two values, such as `coins == 100`. Mixing them up is one of the most common beginner mistakes, especially when building purchase systems.",
      "If statements become powerful when combined with variables. Instead of hardcoding every decision, you store values like price, coins, level, and unlocked state, then let the if statement decide what should happen. This is the foundation for shops, upgrades, abilities, doors, levels, quests, and many other Roblox systems."
    ],
    "code": "local coins = 300\nlocal price = 250\n\nif coins >= price then\n\tprint(\"Purchase allowed\")\nelse\n\tprint(\"Not enough coins\")\nend",
    "explain": [
      "`if` starts the decision.",
      "`coins >= price` checks if coins are greater than or equal to price.",
      "`then` runs code if the condition is true.",
      "`else` runs code if the condition is false.",
      "`end` closes the if statement."
    ],
    "quiz": {
      "question": "If coins is 100 and price is 200, what prints?",
      "options": [
        "Purchase allowed",
        "Not enough coins",
        "Both"
      ],
      "answer": "Not enough coins"
    },
    "task": "Make a price check. Change the coin amount until the success message prints."
  },
  "lua3": {
    "path": "lua",
    "title": "Lua 3: Parts and Properties",
    "summary": "Roblox objects have properties you can change with code.",
    "concept": "A Part has settings like Name, Parent, Anchored, Size, Position, Color, Transparency, and CanCollide.",
    "deepDive": [
      "Roblox is built from objects. A Part, Model, ScreenGui, TextButton, Sound, SpawnLocation, and Script are all objects. Each object has properties, which are settings that describe how it behaves or appears. Scripting in Roblox is largely about finding or creating objects, then changing their properties.",
      "`Instance.new(\"Part\")` creates a new Part object, but it does not automatically place that part into the game world. The object exists in memory, but players will not see it until it is parented somewhere visible, such as `workspace`. That is why `part.Parent = workspace` is such an important line.",
      "The `Name` property changes what the object is called in Explorer. This is separate from the Lua variable name. For example, `local block = Instance.new(\"Part\")` creates a Lua variable called `block`, but the object\u2019s name is still normally `Part` until you set `block.Name = \"PracticePart\"`.",
      "Vector3 is used for 3D values. For size, `Vector3.new(6, 1, 6)` means width on X is 6, height on Y is 1, and depth on Z is 6. For position, `Vector3.new(0, 5, 0)` means the object is centered at X 0, Y 5, Z 0. Y is height, so increasing Y moves the object upward."
    ],
    "code": "local part = Instance.new(\"Part\")\n\npart.Name = \"PracticePart\"\npart.Parent = workspace\npart.Anchored = true\npart.Size = Vector3.new(6, 1, 6)\npart.Position = Vector3.new(0, 5, 0)",
    "explain": [
      "`Instance.new(\"Part\")` creates a new Part.",
      "`part.Name` changes the object name shown in Explorer.",
      "`part.Parent = workspace` puts it into the game world.",
      "`Vector3.new(X, Y, Z)` stores 3D size or position values."
    ],
    "quiz": {
      "question": "What does `part.Parent = workspace` do?",
      "options": [
        "Deletes the part",
        "Puts the part into the game world",
        "Makes the part invisible"
      ],
      "answer": "Puts the part into the game world"
    },
    "task": "Create one Part, name it, anchor it, and place it above the baseplate."
  },
  "lua4": {
    "path": "lua",
    "title": "Lua 4: Events",
    "summary": "Events let the game react when something happens.",
    "concept": "A Touched event runs code when something touches a part. The `hit` parameter is the object that touched it.",
    "deepDive": [
      "Events are how Roblox scripts react to the world. Without events, code would mostly run from top to bottom once and then stop. Games need to respond to actions: a player joins, a part is touched, a button is clicked, a value changes, a tool is activated, or a round timer ends.",
      "The `Touched` event belongs to a BasePart. When something physically touches that part, Roblox fires the event and runs the function connected to it. The value passed into the function is commonly named `hit`, but that name is chosen by the programmer. It represents the actual object that touched the part.",
      "When a character touches a part, `hit` is often a body part such as `LeftFoot`, `RightFoot`, `HumanoidRootPart`, or `LowerTorso`. This is why `print(hit.Name)` usually prints a body part name instead of the player\u2019s username. Later, scripts can use `hit.Parent` to find the character model and then find the Player object.",
      "Events are the foundation of interactive Roblox systems. A checkpoint uses a touch event. A tycoon button uses a touch event. A damage brick uses a touch event. A door sensor uses a touch event. Understanding events means understanding how your game starts responding to players instead of just creating static objects."
    ],
    "code": "local button = Instance.new(\"Part\")\nbutton.Name = \"TouchButton\"\nbutton.Parent = workspace\nbutton.Anchored = true\nbutton.Size = Vector3.new(8, 1, 8)\nbutton.Position = Vector3.new(0, 5, 0)\n\nbutton.Touched:Connect(function(hit)\n\tprint(hit.Name)\nend)",
    "explain": [
      "`Touched` fires when something touches the part.",
      "`:Connect()` connects the event to code.",
      "`function(hit)` receives the object or body part that touched it.",
      "`hit.Name` prints the name of the touching object."
    ],
    "quiz": {
      "question": "What is `hit` in a Touched event?",
      "options": [
        "The touching object/body part",
        "The script",
        "The Roblox server"
      ],
      "answer": "The touching object/body part"
    },
    "task": "Make a touch part that prints the name of whatever touched it."
  },
  "lua5": {
    "path": "lua",
    "title": "Lua 5: UI LocalScripts",
    "summary": "UI code usually runs on the player\u2019s device.",
    "concept": "A LocalScript is used for screen UI because each player has their own PlayerGui.",
    "deepDive": [
      "Roblox UI is different from world objects. A Part exists in the 3D world, but a ScreenGui exists on a player\u2019s screen. Because every player has their own screen, UI code normally runs in a LocalScript. This lets one player open a menu without forcing every other player to see the same screen.",
      "StarterGui is like the template storage for UI. When the game starts, Roblox copies UI from StarterGui into each player\u2019s PlayerGui. The player actually sees the version inside PlayerGui. This is why LocalScripts inside UI often use `script.Parent` and `WaitForChild` to find frames, labels, and buttons.",
      "`Visible` is the basic property for showing and hiding UI elements like Frames, TextLabels, and TextButtons. If `frame.Visible = false`, the frame is hidden. If `frame.Visible = true`, it appears. This is one of the simplest ways to make menus open and close.",
      "Keyboard input uses UserInputService. The code listens for `InputBegan`, checks whether the input was already used by the game, then checks if the key was E. Mouse clicks on UI buttons use `MouseButton1Click`. Together, these two ideas let you build panels, shops, settings menus, inventory screens, admin panels, and tutorials."
    ],
    "code": "local UserInputService = game:GetService(\"UserInputService\")\n\nlocal gui = script.Parent\nlocal frame = gui:WaitForChild(\"MainFrame\")\nlocal closeButton = frame:WaitForChild(\"CloseButton\")\n\nframe.Visible = false\n\nUserInputService.InputBegan:Connect(function(input, gameProcessed)\n\tif gameProcessed then return end\n\n\tif input.KeyCode == Enum.KeyCode.E then\n\t\tframe.Visible = true\n\tend\nend)\n\ncloseButton.MouseButton1Click:Connect(function()\n\tframe.Visible = false\nend)",
    "explain": [
      "`Visible = false` hides a UI object.",
      "`Visible = true` shows it.",
      "`InputBegan` detects keyboard/mouse input.",
      "`MouseButton1Click` runs when a GUI button is clicked."
    ],
    "quiz": {
      "question": "Which script type is best for player screen UI?",
      "options": [
        "Script",
        "LocalScript",
        "ModuleScript"
      ],
      "answer": "LocalScript"
    },
    "task": "Make a frame start hidden, press E to show it, and click a button to hide it."
  },
  "blend1": {
    "path": "blender",
    "title": "Blender 1: Basic Controls",
    "summary": "Learn movement, rotation, scaling, and viewport control.",
    "concept": "Before making detailed assets, learn how to control simple objects and move around the scene.",
    "deepDive": [
      "Blender can look overwhelming because the screen has many tools, panels, modes, and shortcuts. The correct beginner approach is not to learn everything at once. Start with navigation, selecting objects, moving, scaling, and rotating. These controls are the foundation of almost every model you will ever make.",
      "Object Mode and Edit Mode are two different ways of working. Object Mode treats the object as one whole piece. You use it to move, rotate, and scale the entire object. Edit Mode lets you work with the actual mesh, meaning vertices, edges, and faces. This is where you change the object\u2019s shape.",
      "For Roblox creators, basic shape control is more important than fancy rendering at the start. A huge amount of Roblox building can be done with simple shapes that are scaled correctly and placed cleanly. A wall, platform, sign, crate, button, ramp, and floor tile can all start from cubes.",
      "The goal of this lesson is comfort, not perfection. A beginner should be able to add a cube, move it, scale it flat, rotate it, and understand whether they are changing the whole object or editing the mesh. Once those controls are automatic, modelling becomes much less frustrating."
    ],
    "code": "Beginner controls:\nMove = change position\nScale = change size\nRotate = turn object\nObject Mode = move whole objects\nEdit Mode = edit the mesh",
    "explain": [
      "Move changes object position.",
      "Scale changes object size.",
      "Rotate turns the object.",
      "Object Mode moves whole objects.",
      "Edit Mode changes the mesh shape itself."
    ],
    "quiz": {
      "question": "Which mode edits the actual mesh shape?",
      "options": [
        "Object Mode",
        "Edit Mode",
        "Render Mode"
      ],
      "answer": "Edit Mode"
    },
    "task": "Create a cube, scale it flat, move it above the grid, and give it a basic material."
  },
  "blend2": {
    "path": "blender",
    "title": "Blender 2: Simple Game Assets",
    "summary": "Start with small usable assets before complex models.",
    "concept": "Good beginner assets are simple, useful, and easy to test in Roblox Studio.",
    "deepDive": [
      "A common beginner mistake is trying to make a massive detailed model too early. Detailed vehicles, characters, buildings, and weapons require many separate skills at once. If the creator has not mastered simple shapes, scale, cleanup, and exporting, the large project becomes frustrating fast.",
      "Simple game assets are better because they teach the full workflow without overwhelming the user. A crate teaches shape and material. A door teaches scale and pivots. A sign teaches flat surfaces and text placement. A coin or collectible teaches simple curves and export testing. Each small asset builds a real skill.",
      "For Roblox, the model has to work in a game, not just look good in Blender. That means the asset should be understandable, not too heavy, easy to position, and easy to import. If an object looks good but is the wrong size or has too much geometry, it can still be a poor game asset.",
      "The best beginner standard is this: make something small, useful, and finished. A completed simple prop is more valuable than an abandoned complex model. The faster you finish small assets, the faster you learn what actually matters."
    ],
    "code": "Good first assets:\n- Crate\n- Door\n- Sign\n- Table\n- Wall panel\n- Coin or collectible",
    "explain": [
      "Simple assets are easier to finish.",
      "Small props teach useful modelling fundamentals.",
      "Testing simple objects in Roblox is faster than fixing huge models."
    ],
    "quiz": {
      "question": "Should a beginner start with a huge detailed model or a small prop?",
      "options": [
        "Huge detailed model",
        "Small prop",
        "Neither"
      ],
      "answer": "Small prop"
    },
    "task": "Make one simple prop that could be used in a Roblox map."
  },
  "blend3": {
    "path": "blender",
    "title": "Blender 3: Roblox Export Mindset",
    "summary": "Models must be game-ready, not just nice-looking.",
    "concept": "When making assets for Roblox, think about scale, naming, geometry, and whether the object works inside Studio.",
    "deepDive": [
      "Exporting is where many beginner Blender models fail. A model can look correct in Blender but import too large, too small, rotated wrong, split into confusing parts, or too detailed for the game. This is why Roblox creators need an export mindset from the beginning.",
      "Clean naming matters because Roblox Studio projects can become messy quickly. If every imported mesh is called Cube, Mesh, Object, or Untitled, it becomes hard to script, organise, and debug. Names should describe the object, such as `WoodenCrate`, `DoorFrame`, `CoinMesh`, or `WallPanel`.",
      "Geometry matters because games must run in real time. Too much unnecessary detail can reduce performance, especially if the asset is repeated many times across a map. A single high-detail object may be acceptable, but a hundred high-detail objects can become a problem.",
      "Testing inside Roblox Studio should happen early. Export a simple version, check its scale, check how it looks with Roblox lighting, and check whether it fits the player. Waiting until the model is fully detailed before testing can waste time if the scale or structure is wrong."
    ],
    "code": "Export checklist:\n- Clean shape\n- Sensible scale\n- Clear object name\n- Not too high-poly\n- Test inside Roblox Studio",
    "explain": [
      "Keep shapes clean.",
      "Avoid too much unnecessary geometry.",
      "Use clear object names.",
      "Export and test inside Roblox Studio.",
      "Fix scale problems early."
    ],
    "quiz": {
      "question": "Why test models in Roblox Studio?",
      "options": [
        "To check scale and usability",
        "To delete the model",
        "To make it 2D"
      ],
      "answer": "To check scale and usability"
    },
    "task": "Export one simple object and test its size inside Roblox Studio."
  },
  "moon1": {
    "path": "moon",
    "title": "Moon 1: Keyframes",
    "summary": "Keyframes store movement or pose at a specific time.",
    "concept": "Animation happens when an object moves from one keyframe to another over time.",
    "deepDive": [
      "A keyframe is like a saved moment in time. It stores where an object or body part is at a specific frame. When the animation plays, Moon Animator moves between those saved moments. This is the core idea behind nearly every animation system.",
      "Frame 0 is usually the starting point. If an object starts on the floor at frame 0 and is higher at frame 30, the animation moves the object upward over those frames. If the object returns to the floor at frame 60, the animation becomes an up-and-down motion.",
      "The timeline is where timing is controlled. A movement over 10 frames feels fast. The same movement over 60 frames feels slower. Timing is just as important as position because it controls the energy and mood of an animation.",
      "Beginners should start with one object and a few keyframes. Complicated animation becomes easier once the user understands the simple idea: save a starting position, move to a new frame, change the object, save another keyframe, then preview the motion."
    ],
    "code": "Example timeline:\nFrame 0 = starting position\nFrame 15 = moved position\nFrame 30 = final position",
    "explain": [
      "Frame 0 is usually the starting position.",
      "A later frame stores a changed position.",
      "The timeline controls when movement happens.",
      "The playhead shows the current preview frame."
    ],
    "quiz": {
      "question": "What does a keyframe store?",
      "options": [
        "A position or pose at a time",
        "A website link",
        "A Roblox username"
      ],
      "answer": "A position or pose at a time"
    },
    "task": "Animate a simple object moving up, then back down."
  },
  "moon2": {
    "path": "moon",
    "title": "Moon 2: Beginner Animations",
    "summary": "Object animations are the best first animations.",
    "concept": "Start with object animations before complex character movement because they are easier and useful in many game types.",
    "deepDive": [
      "Object animations are the best starting point because they have fewer moving parts. A button moves down and up. A door rotates open. A platform moves from one position to another. These animations are easy to understand, easy to test, and immediately useful in games.",
      "Character animation is harder because the human eye notices unnatural movement quickly. A walk cycle needs weight, timing, opposite limb movement, body bob, and a smooth loop. Object animation teaches timeline control before adding the complexity of body mechanics.",
      "Beginner object animations still teach important professional habits. A button press teaches anticipation and return motion. A door opening teaches pivots and rotation. A platform movement teaches start and end positions. A camera reveal teaches timing and presentation.",
      "The key is to make small animations feel responsive. A simple object that moves at the right speed can make a game feel much more polished. This is often more useful than spending hours on a rough walking animation that is not needed yet."
    ],
    "code": "Good beginner animations:\n- Button press\n- Door opening\n- Platform moving\n- Panel sliding\n- Collectible spinning\n- Camera reveal",
    "explain": [
      "Object animations have fewer moving parts.",
      "They are easier to loop and test.",
      "They make simple games feel more polished."
    ],
    "quiz": {
      "question": "Which is better as a first Moon Animator project?",
      "options": [
        "Button press",
        "Full perfect walk cycle",
        "Huge cutscene"
      ],
      "answer": "Button press"
    },
    "task": "Make a button press animation with three keyframes: up, down, up."
  },
  "moon3": {
    "path": "moon",
    "title": "Moon 3: Character Animation Basics",
    "summary": "Character animation needs balance, timing, and pose control.",
    "concept": "Start with simple poses before walking. Walking requires body weight, opposite arm/leg movement, and a smooth loop.",
    "deepDive": [
      "Character animation is more demanding than object animation because a character must look balanced and alive. Even a simple pose can look wrong if the limbs are stiff, the body has no weight, or the movement has no timing. This is why simple poses should come before full movement cycles.",
      "A good beginner character animation might be an idle pose, a wave, a point, or a short emote. These teach control over arms, torso, head direction, and timing without requiring a perfect loop. Once the creator can make a pose look intentional, movement becomes easier.",
      "Walk cycles are difficult because they must loop smoothly. The final frame has to connect back to the first frame without a visible jump. Arms and legs usually move opposite each other. The body often rises and falls slightly to suggest weight. These details are why walk cycles should not be the first goal.",
      "The best progression is simple pose, simple gesture, repeated gesture, then looped motion. Rushing to advanced animation usually creates frustration. Controlled basics create better animations faster in the long term."
    ],
    "code": "Good first character animations:\n- Idle pose\n- Wave\n- Pointing gesture\n- Short jump pose\n- Simple emote",
    "explain": [
      "Walking is harder than it looks.",
      "Arms and legs usually move opposite each other.",
      "The final frame should connect smoothly to the first frame.",
      "Simple poses teach control first."
    ],
    "quiz": {
      "question": "Why is walking harder than a button animation?",
      "options": [
        "It needs timing, body weight, and looping",
        "It uses no keyframes",
        "It cannot be animated"
      ],
      "answer": "It needs timing, body weight, and looping"
    },
    "task": "Make a simple wave pose before attempting a walk cycle."
  }
};
const briefingSteps = [
  {
    "title": "1. How the Academy Works",
    "body": "The academy uses one lesson at a time. You read the concept, study the example, answer the quiz, then do the practical task. This stops users from skipping into confusion.",
    "points": [
      "One active lesson",
      "Short examples",
      "Quiz check",
      "Practical task"
    ]
  },
  {
    "title": "2. Pick Any Course Type",
    "body": "Users can choose Roblox Lua, Blender, or Moon Animator first. Each course has its own internal order, but there is no forced global path.",
    "points": [
      "Lua = game logic",
      "Blender = 3D assets",
      "Moon Animator = movement and cutscenes"
    ]
  },
  {
    "title": "3. Unlock the Skill Tree",
    "body": "After this briefing, the Skill Tree unlocks. The Skill Tree is the main gateway to all courses.",
    "points": [
      "Skill Tree button unlocks courses",
      "Each path shows progress",
      "Locked lessons open only after the previous lesson in that path is complete"
    ]
  }
];

const savedBriefingComplete = localStorage.getItem("briefingComplete") === "true" || localStorage.getItem("creatorAcademy.briefingComplete") === "true";
const savedSkillTreeUnlocked = localStorage.getItem("skillTreeUnlocked") === "true" || localStorage.getItem("creatorAcademy.skillTreeUnlocked") === "true";

const state = {
	briefingComplete: savedBriefingComplete,
	skillTreeUnlocked: savedSkillTreeUnlocked,
	completedLessons: new Set(JSON.parse(localStorage.getItem("completedLessons")) || []),
	activePath: null,
	activeLesson: null
};

let briefingIndex = 0;

function saveState() {
	localStorage.setItem("briefingComplete", String(state.briefingComplete));
	localStorage.setItem("skillTreeUnlocked", String(state.skillTreeUnlocked));
	localStorage.setItem("creatorAcademy.briefingComplete", String(state.briefingComplete));
	localStorage.setItem("creatorAcademy.skillTreeUnlocked", String(state.skillTreeUnlocked));
	localStorage.setItem("creatorAcademy.lastSavedAt", new Date().toISOString());
	localStorage.setItem("completedLessons", JSON.stringify(Array.from(state.completedLessons)));
}

function getPathProgress(pathId) {
	const list = paths[pathId].lessons;
	const complete = list.filter(function(id) { return state.completedLessons.has(id); }).length;
	return { complete: complete, total: list.length };
}

function getNextLessonInPath(pathId) {
	const list = paths[pathId].lessons;
	for (let i = 0; i < list.length; i++) {
		if (!state.completedLessons.has(list[i])) return list[i];
	}
	return null;
}

function isLessonUnlocked(lessonId) {
	if (state.completedLessons.has(lessonId)) return true;
	const pathId = lessons[lessonId].path;
	return getNextLessonInPath(pathId) === lessonId;
}

function showToast(message) {
	toast.textContent = message;
	toast.classList.remove("hidden");

	setTimeout(function() {
		toast.classList.add("hidden");
	}, 2100);
}

function showHome() {
	const primaryAction = state.skillTreeUnlocked ? "openSkillTree()" : "startBriefing()";
	const primaryText = state.skillTreeUnlocked ? "Continue Learning" : "Start Academy Briefing";

	app.innerHTML = `
		<section class="hero polished-hero">
			<div class="hero-content">
				<span class="badge">Structured Creator Training</span>
				<h2>Creator Academy Hub</h2>
				<p>
					A focused learning academy for Roblox Lua, Blender, and Moon Animator.
					Learn one lesson at a time, pass the quiz, complete the practical lab, then unlock the next lesson.
				</p>

				<div class="actions hero-actions">
					<button type="button" onclick="${primaryAction}">${primaryText}</button>
					<button type="button" class="secondary" onclick="showProgress()">View Progress</button>
				</div>

				<div class="flow-panel">
					<h3>Academy Flow</h3>
					<div class="flow-grid">
						<div class="flow-step">
							<span>01</span>
							<h4>Briefing</h4>
							<p>Users learn how the academy works before accessing the course hub.</p>
						</div>
						<div class="flow-step">
							<span>02</span>
							<h4>Skill Tree</h4>
							<p>Users choose Lua, Blender, or Moon Animator from one organised hub.</p>
						</div>
						<div class="flow-step">
							<span>03</span>
							<h4>Lesson</h4>
							<p>Only one lesson opens at a time so the learning stays focused.</p>
						</div>
						<div class="flow-step">
							<span>04</span>
							<h4>Practical</h4>
							<p>Users must complete evidence-based practical labs to progress.</p>
						</div>
					</div>
				</div>

				<div class="info-grid polished-info-grid">
					<div class="info-card">
						<span class="mini-label">Course Path</span>
						<h3>Roblox Lua</h3>
						<p>For scripting, logic, UI, events, and game systems.</p>
					</div>

					<div class="info-card">
						<span class="mini-label">Course Path</span>
						<h3>Blender</h3>
						<p>For 3D assets, props, modelling basics, and Roblox-ready exports.</p>
					</div>

					<div class="info-card">
						<span class="mini-label">Course Path</span>
						<h3>Moon Animator</h3>
						<p>For keyframes, object movement, poses, and simple cutscene workflows.</p>
					</div>
				</div>
			</div>
		</section>
	`;
}

function startBriefing() {
	briefingIndex = 0;
	renderBriefing();
}

function renderBriefing() {
	const step = briefingSteps[briefingIndex];

	app.innerHTML = `
		<section class="step-layout">
			<aside class="sidebar">
				<h3>Academy Briefing</h3>
				${briefingSteps.map(function(item, index) {
					return `
						<div class="side-step ${index === briefingIndex ? "active" : ""} ${index < briefingIndex ? "complete" : ""}">
							<span class="circle">${index < briefingIndex ? "✓" : index + 1}</span>
							<span>${item.title.replace(/^\\d\\. /, "")}</span>
						</div>
					`;
				}).join("")}

				<div class="progress-track">
					<div class="progress-fill" style="width: ${((briefingIndex + 1) / briefingSteps.length) * 100}%"></div>
				</div>
			</aside>

			<section class="panel lesson-view">
				<div class="lesson-card">
					<div class="lesson-topline">
						<p>Step ${briefingIndex + 1} of ${briefingSteps.length}</p>
					</div>

					<h2>${step.title}</h2>
					<p>${step.body}</p>

					<div class="lesson-block">
						<h3>Key Points</h3>
						<ul>
							${step.points.map(function(point) { return `<li>${point}</li>`; }).join("")}
						</ul>
					</div>

					<div class="actions">
						<button type="button" class="secondary" onclick="previousBriefingStep()" ${briefingIndex === 0 ? "disabled" : ""}>Back</button>
						${
							briefingIndex === briefingSteps.length - 1
								? `<button type="button" class="green" onclick="finishBriefing()">Unlock Skill Tree</button>`
								: `<button type="button" onclick="nextBriefingStep()">Next</button>`
						}
					</div>
				</div>
			</section>
		</section>
	`;
}

function nextBriefingStep() {
	if (briefingIndex < briefingSteps.length - 1) {
		briefingIndex++;
		renderBriefing();
	}
}

function previousBriefingStep() {
	if (briefingIndex > 0) {
		briefingIndex--;
		renderBriefing();
	}
}

function finishBriefing() {
	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();
	showToast("Skill Tree unlocked");
	launchConfetti();
	openSkillTree();
}

function openSkillTree() {
	if (!state.skillTreeUnlocked) {
		showToast("Complete the academy briefing first");
		startBriefing();
		return;
	}

	app.innerHTML = `
		<section class="panel skill-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Main Learning Hub</span>
					<h2>Skill Tree</h2>
					<p>Choose a course path first. Each course has its own skill tree, unlock order, progress map, quiz checks, and practical labs.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
					<button type="button" class="secondary" onclick="showProgress()">Progress</button>
				</div>
			</div>

			<div class="hub-order">
				<div class="hub-order-step active"><span>1</span><p>Choose a course</p></div>
				<div class="hub-order-step"><span>2</span><p>View that course tree</p></div>
				<div class="hub-order-step"><span>3</span><p>Complete current lesson</p></div>
				<div class="hub-order-step"><span>4</span><p>Unlock next node</p></div>
			</div>

			<div class="path-grid polished-path-grid">
				${Object.entries(paths).map(function(entry) {
					return renderPathCard(entry[0], entry[1]);
				}).join("")}
			</div>
		</section>
	`;
}

function renderPathCard(pathId, path) {
	const progress = getPathProgress(pathId);
	const nextLesson = getNextLessonInPath(pathId);
	const complete = progress.complete === progress.total;
	const percent = Math.round((progress.complete / progress.total) * 100);
	const currentText = complete ? "Path complete" : "Next: " + lessons[nextLesson].title;

	return `
		<button type="button" class="path-card polished-path-card" onclick="showPathCourseFilter('${pathId}')">
			<span class="path-status">${complete ? "Complete" : "Available"}</span>
			<h3>${path.title}</h3>
			<p>${path.description}</p>

			<div class="card-progress">
				<div class="card-progress-top">
					<span>${progress.complete}/${progress.total} lessons</span>
					<span>${percent}%</span>
				</div>
				<div class="progress-track compact">
					<div class="progress-fill" style="width: ${percent}%"></div>
				</div>
			</div>

			<p class="next-lesson-text">${currentText}</p>
		</button>
	`;
}

function renderSkillNode(lessonId) {
	const lesson = lessons[lessonId];
	const complete = state.completedLessons.has(lessonId);
	const available = isLessonUnlocked(lessonId);

	let status = "Locked";
	let className = "locked";

	if (complete) {
		status = "Complete";
		className = "complete";
	} else if (available) {
		status = "Available";
		className = "available";
	}

	return `
		<button type="button" class="skill-node ${className}" onclick="openLesson('${lessonId}')">
			<span class="node-status">${status}</span>
			<h3>${lesson.title}</h3>
			<p>${lesson.summary}</p>
		</button>
	`;
}

function openCourse(pathId) {
	if (!state.skillTreeUnlocked) {
		startBriefing();
		return;
	}

	state.activePath = pathId;
	const path = paths[pathId];
	const currentLesson = getNextLessonInPath(pathId) || path.lessons[path.lessons.length - 1];
	const progress = getPathProgress(pathId);
	const percent = Math.round((progress.complete / progress.total) * 100);

	app.innerHTML = `
		<section class="panel course-map-panel">
			<div class="course-header">
				<div>
					<span class="badge">${path.type}</span>
					<h2>${path.title} Skill Tree</h2>
					<p>${path.description}</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="openSkillTree()">Back to Courses</button>
					<button type="button" onclick="openLesson('${currentLesson}')">${getNextLessonInPath(pathId) ? "Start Current Lesson" : "Review Last Lesson"}</button>
				</div>
			</div>

			<div class="course-progress-card">
				<div>
					<h3>Course Progress</h3>
					<p>${progress.complete}/${progress.total} lessons complete. This page only shows the ${path.title} course tree.</p>
				</div>
				<div class="progress-track">
					<div class="progress-fill" style="width: ${percent}%"></div>
				</div>
			</div>

			<div class="course-tree-label">
				<span>Course Tree</span>
				<p>Blue = current available lesson. Green = complete. Grey = locked until the previous lesson is finished.</p>
			</div>

			<div class="course-tree-line"></div>

			<div class="skill-grid course-lesson-grid course-only-tree">
				${path.lessons.map(renderSkillNode).join("")}
			</div>
		</section>
	`;
}

function openLesson(lessonId) {
	if (!isLessonUnlocked(lessonId)) {
		showToast("Locked: complete the previous lesson in this course first");
		return;
	}

	state.activeLesson = lessonId;
	const lesson = lessons[lessonId];
	const path = paths[lesson.path];
	const selectedAnswerName = `quiz-${lessonId}`;

	app.innerHTML = `
		<section class="step-layout">
			<aside class="sidebar">
				<h3>${path.title}</h3>
				${path.lessons.map(function(id, index) {
					const complete = state.completedLessons.has(id);
					const active = id === lessonId;
					const unlocked = isLessonUnlocked(id);
					return `
						<div class="side-step ${active ? "active" : ""} ${complete ? "complete" : ""}">
							<span class="circle">${complete ? "✓" : index + 1}</span>
							<span>${unlocked ? lessons[id].title.replace(/^.*?: /, "") : "Locked"}</span>
						</div>
					`;
				}).join("")}

				<div class="progress-track">
					<div class="progress-fill" style="width: ${(getPathProgress(lesson.path).complete / path.lessons.length) * 100}%"></div>
				</div>

				<button type="button" class="secondary" onclick="openCourse('${lesson.path}')">Course Map</button>
			</aside>

			<section class="panel lesson-view">
				<div class="lesson-card">
					<div class="lesson-topline">
						<p>${path.title} • One lesson at a time</p>
						<span class="badge">${state.completedLessons.has(lessonId) ? "Complete" : "Current Lesson"}</span>
					</div>

					<h2>${lesson.title}</h2>
					<p>${lesson.concept}</p>

					<div class="lesson-block deep-dive">
						<h3>Detailed Explanation</h3>
						${lesson.deepDive.map(function(paragraph) { return `<p>${paragraph}</p>`; }).join("")}
					</div>

					<h3>Example</h3>
					<pre><code>${escapeHtml(lesson.code)}</code></pre>

					<div class="lesson-block">
						<h3>Dissection</h3>
						<ul>
							${lesson.explain.map(function(item) { return `<li>${item}</li>`; }).join("")}
						</ul>
					</div>

					<div class="lesson-block">
						<h3>Quiz</h3>
						<p>${lesson.quiz.question}</p>
						${lesson.quiz.options.map(function(option) {
							return `
								<label class="quiz-option">
									<input type="radio" name="${selectedAnswerName}" value="${escapeAttribute(option)}">
									${option}
								</label>
							`;
						}).join("")}
						<p id="quizWarning" class="warning hidden">Answer the quiz correctly before completing the lesson.</p>
					</div>

					<div class="lesson-block">
						<h3>Practical Task</h3>
						<p>${lesson.task}</p>
					</div>

					<div class="actions">
						<button type="button" class="secondary" onclick="openCourse('${lesson.path}')">Back to Course</button>
						<button type="button" class="green" onclick="completeLesson('${lessonId}')">
							${state.completedLessons.has(lessonId) ? "Already Complete" : "Complete Lesson"}
						</button>
					</div>
				</div>
			</section>
		</section>
	`;
}

function completeLesson(lessonId) {
	if (state.completedLessons.has(lessonId)) {
		showToast("Already complete");
		return;
	}

	const lesson = lessons[lessonId];
	const selected = document.querySelector(`input[name="quiz-${lessonId}"]:checked`);

	if (!selected || selected.value !== lesson.quiz.answer) {
		document.getElementById("quizWarning").classList.remove("hidden");
		return;
	}

	state.completedLessons.add(lessonId);
	saveState();

	const next = getNextLessonInPath(lesson.path);

	if (next) {
		showToast(`Unlocked: ${lessons[next].title}`);
		openLesson(next);
	} else {
		showToast(`${paths[lesson.path].title} path complete`);
		launchConfetti();
		openCourse(lesson.path);
	}
}

function showProgress() {
	const totalLessons = Object.keys(lessons).length;
	const completeLessons = state.completedLessons.size;

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Progress</span>
					<h2>Academy Progress</h2>
					<p>${completeLessons}/${totalLessons} lessons complete.</p>
				</div>
				<div class="actions">
					<button type="button" onclick="openSkillTree()">Skill Tree</button>
					<button type="button" class="red" onclick="resetProgress()">Reset Progress</button>
				</div>
			</div>

			<div class="info-grid">
				${Object.entries(paths).map(function(entry) {
					const pathId = entry[0];
					const path = entry[1];
					const progress = getPathProgress(pathId);
					const percent = Math.round((progress.complete / progress.total) * 100);
					return `
						<div class="info-card">
							<h3>${path.title}</h3>
							<p>${progress.complete}/${progress.total} lessons complete</p>
							<div class="progress-track">
								<div class="progress-fill" style="width: ${percent}%"></div>
							</div>
							<button type="button" onclick="showPathCourseFilter('${pathId}')">Open Path</button>
						</div>
					`;
				}).join("")}
			</div>

			<div class="lesson-block">
				<h3>Testing Controls</h3>
				<p>Resetting progress keeps the academy briefing unlocked. Resetting everything locks the Skill Tree again.</p>
				<div class="actions">
					<button type="button" class="secondary" onclick="resetLessonsOnly()">Reset Lessons Only</button>
					<button type="button" class="red" onclick="resetEverything()">Reset Everything</button>
				</div>
			</div>
		</section>
	`;
}

function resetLessonsOnly() {
	state.completedLessons.clear();
	saveState();
	showToast("Lesson progress reset");
	showProgress();
}

function resetProgress() {
	resetLessonsOnly();
}

function resetEverything() {
	state.briefingComplete = false;
	state.skillTreeUnlocked = false;
	state.completedLessons.clear();
	saveState();
	localStorage.removeItem("creatorAcademy.lastSavedAt");
	showToast("Everything reset");
	showHome();
}

function escapeHtml(text) {
	return String(text)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function escapeAttribute(text) {
	return String(text).replace(/"/g, "&quot;");
}

function launchConfetti() {
	const colours = ["#38bdf8", "#22c55e", "#a78bfa", "#facc15", "#fb7185"];

	for (let i = 0; i < 42; i++) {
		const piece = document.createElement("div");
		piece.className = "confetti-piece";
		piece.style.left = Math.random() * 100 + "vw";
		piece.style.background = colours[Math.floor(Math.random() * colours.length)];
		piece.style.animationDelay = (Math.random() * 0.35) + "s";
		document.body.appendChild(piece);

		setTimeout(function() { piece.remove(); }, 1800);
	}
}

document.addEventListener("mousemove", function(event) {
	const glow = document.getElementById("cursorGlow");
	if (!glow) return;

	glow.style.left = event.clientX + "px";
	glow.style.top = event.clientY + "px";
});

document.addEventListener("click", function(event) {
	const button = event.target.closest("button");
	if (!button) return;

	const rect = button.getBoundingClientRect();
	button.style.setProperty("--ripple-x", (event.clientX - rect.left) + "px");
	button.style.setProperty("--ripple-y", (event.clientY - rect.top) + "px");

	button.classList.remove("ripple");
	void button.offsetWidth;
	button.classList.add("ripple");
});

showHome();


// ---------- Mandatory Practical Labs Override ----------
// Adds hard practical labs and requires quiz + evidence + confirmation before lesson completion.

const practicalLabs = {
	lua1: {
		difficulty: "Hard Beginner",
		required: "Build a small variable report script with at least 5 variables: one number, one string, one boolean, one price, and one reward. Print a readable report, not just random values.",
		mastery: "Change at least two variables after creating them, then print the before/after meaning clearly.",
		debug: "Deliberately make one mistake with quotes or capital letters, read the Output error, then fix it.",
		evidencePrompt: "Write what variables you created, what mistake you tested, and what the final Output printed."
	},
	lua2: {
		difficulty: "Hard Beginner",
		required: "Create a purchase check with coins, price, itemName, successMessage, and failMessage. It must print the correct message for both enough coins and not enough coins.",
		mastery: "Add a second item with a different price and test both items without deleting the first logic.",
		debug: "Test exactly equal coins and price. Confirm that >= allows the purchase.",
		evidencePrompt: "Write the two item prices, the coin amounts you tested, and which outputs appeared."
	},
	lua3: {
		difficulty: "Hard Beginner",
		required: "Create 3 different parts with different names, sizes, positions, colours, and collision settings. At least one must be invisible and non-collidable.",
		mastery: "Use a function to create the parts instead of repeating all code manually.",
		debug: "Break one property name or variable name, observe the error, then fix it.",
		evidencePrompt: "Write the names of your 3 parts, what each one does, and the bug you fixed."
	},
	lua4: {
		difficulty: "Hard Beginner",
		required: "Create a touch part that prints hit.Name, then add logic that only prints a success message if the touching object has a Parent.",
		mastery: "Make the touch part change colour when touched, then change back after a short delay.",
		debug: "Touch it with your character and with another part. Compare what hit.Name prints.",
		evidencePrompt: "Write the body part names that appeared, what happened when another part touched it, and how the colour change worked."
	},
	lua5: {
		difficulty: "Hard Beginner",
		required: "Make a ScreenGui with a hidden Frame. Press E to show it. Add a close button that hides it. Add a TextLabel that changes text when the UI opens.",
		mastery: "Add a second button inside the UI that changes the label to a different message.",
		debug: "Intentionally mismatch a name once, such as CloseButton vs closeButton, then fix the case-sensitivity issue.",
		evidencePrompt: "Write your Explorer hierarchy, what key opens the UI, and the naming bug you fixed."
	},
	blend1: {
		difficulty: "Hard Beginner",
		required: "Create a clean platform scene using only cubes: floor, wall, pillar, and one raised object. Use move, scale, and rotate intentionally.",
		mastery: "Make the scene readable from a distance by changing proportions and materials.",
		debug: "Switch between Object Mode and Edit Mode and explain what changed.",
		evidencePrompt: "Write what objects you made, which controls you used, and how Object Mode differs from Edit Mode."
	},
	blend2: {
		difficulty: "Hard Beginner",
		required: "Model one small game asset with at least 4 separate shaped parts. Examples: crate, sci-fi panel, simple door, sign, or collectible.",
		mastery: "Make a second variation of the same asset without starting from scratch.",
		debug: "Find one messy part of your model and simplify it.",
		evidencePrompt: "Write what asset you made, how many parts it uses, and what you simplified."
	},
	blend3: {
		difficulty: "Hard Beginner",
		required: "Prepare a model for Roblox export: clean name, sensible scale, simple geometry, and clear object origin.",
		mastery: "Import it into Roblox Studio and compare its size next to a Roblox character or normal part.",
		debug: "If scale is wrong, resize and export again.",
		evidencePrompt: "Write the model name, export format, whether the scale worked, and what you changed after testing."
	},
	moon1: {
		difficulty: "Hard Beginner",
		required: "Animate one object with at least 3 keyframes: start, moved position, and return or final position.",
		mastery: "Make the timing feel different by creating a fast version and a slow version.",
		debug: "Move the playhead manually and explain how the object changes across frames.",
		evidencePrompt: "Write the frame numbers you used, what moved, and whether the motion felt fast or slow."
	},
	moon2: {
		difficulty: "Hard Beginner",
		required: "Make a button press, door open, or platform movement animation with clear start and end states.",
		mastery: "Add a small anticipation or return movement so it feels less robotic.",
		debug: "Check if the first and final frames make sense when replayed.",
		evidencePrompt: "Write what object you animated, frame numbers, and how you improved the motion."
	},
	moon3: {
		difficulty: "Hard Beginner",
		required: "Make a simple character pose or gesture: wave, point, idle pose, or short emote. Do not start with a full walk cycle.",
		mastery: "Add torso or head adjustment so the pose looks less stiff.",
		debug: "Compare the pose from front and side view. Fix one awkward limb angle.",
		evidencePrompt: "Write what gesture you made, what body parts moved, and what awkward part you fixed."
	}
};

function getPracticalLabHtml(lessonId) {
	const lab = practicalLabs[lessonId];

	if (!lab) {
		return "";
	}

	return `
		<div class="lesson-block practical-lab">
			<h3>Mandatory Practical Lab</h3>
			<div class="difficulty-row">
				<span class="difficulty-pill">${lab.difficulty}</span>
				<span class="difficulty-pill">Evidence Required</span>
				<span class="difficulty-pill">No Skipping</span>
			</div>

			<div class="lab-grid">
				<div class="lab-card">
					<h4>Required Build</h4>
					<p>${lab.required}</p>
				</div>

				<div class="lab-card">
					<h4>Mastery Challenge</h4>
					<p>${lab.mastery}</p>
				</div>

				<div class="lab-card">
					<h4>Debug Check</h4>
					<p>${lab.debug}</p>
				</div>
			</div>

			<div class="media-placeholder">
				<strong>Future media slot:</strong> screenshots, reference images, or short clips can be added here later.
				For now, complete the practical and write evidence below.
			</div>

			<label class="practical-check">
				<input type="checkbox" id="practicalCheck-${lessonId}">
				<span>I completed the required practical task myself and tested it.</span>
			</label>

			<label class="practical-check">
				<input type="checkbox" id="debugCheck-${lessonId}">
				<span>I completed the debug check or found/fixed one mistake.</span>
			</label>

			<h4 style="margin-top: 16px;">Practical Evidence</h4>
			<p>${lab.evidencePrompt}</p>
			<textarea id="evidence-${lessonId}" class="evidence-box" placeholder="Write at least 80 characters of evidence. Example: what you built, what broke, what you changed, and what worked."></textarea>
			<p id="practicalWarning" class="warning hidden">Complete the practical checklist and write at least 80 characters of evidence before finishing.</p>
		</div>
	`;
}

function practicalIsComplete(lessonId) {
	const practicalCheck = document.getElementById("practicalCheck-" + lessonId);
	const debugCheck = document.getElementById("debugCheck-" + lessonId);
	const evidence = document.getElementById("evidence-" + lessonId);

	return (
		practicalCheck &&
		debugCheck &&
		evidence &&
		practicalCheck.checked &&
		debugCheck.checked &&
		evidence.value.trim().length >= 80
	);
}

// Override lesson view to include mandatory practical labs.
function openLesson(lessonId) {
	if (!isLessonUnlocked(lessonId)) {
		showToast("Locked: complete the previous lesson in this course first");
		return;
	}

	state.activeLesson = lessonId;
	const lesson = lessons[lessonId];
	const path = paths[lesson.path];
	const selectedAnswerName = `quiz-${lessonId}`;

	app.innerHTML = `
		<section class="step-layout">
			<aside class="sidebar">
				<h3>${path.title}</h3>
				${path.lessons.map(function(id, index) {
					const complete = state.completedLessons.has(id);
					const active = id === lessonId;
					const unlocked = isLessonUnlocked(id);
					return `
						<div class="side-step ${active ? "active" : ""} ${complete ? "complete" : ""}">
							<span class="circle">${complete ? "✓" : index + 1}</span>
							<span>${unlocked ? lessons[id].title.replace(/^.*?: /, "") : "Locked"}</span>
						</div>
					`;
				}).join("")}

				<div class="progress-track">
					<div class="progress-fill" style="width: ${(getPathProgress(lesson.path).complete / path.lessons.length) * 100}%"></div>
				</div>

				<button type="button" class="secondary" onclick="openCourse('${lesson.path}')">Course Map</button>
			</aside>

			<section class="panel lesson-view">
				<div class="lesson-card">
					<div class="lesson-topline">
						<p>${path.title} • One lesson at a time</p>
						<span class="badge">${state.completedLessons.has(lessonId) ? "Complete" : "Current Lesson"}</span>
					</div>

					<h2>${lesson.title}</h2>
					<p>${lesson.concept}</p>

					<div class="lesson-block deep-dive">
						<h3>Detailed Explanation</h3>
						${lesson.deepDive.map(function(paragraph) { return `<p>${paragraph}</p>`; }).join("")}
					</div>

					<h3>Example</h3>
					<pre><code>${escapeHtml(lesson.code)}</code></pre>

					<div class="lesson-block">
						<h3>Dissection</h3>
						<ul>
							${lesson.explain.map(function(item) { return `<li>${item}</li>`; }).join("")}
						</ul>
					</div>

					<div class="lesson-block">
						<h3>Quiz</h3>
						<p>${lesson.quiz.question}</p>
						${lesson.quiz.options.map(function(option) {
							return `
								<label class="quiz-option">
									<input type="radio" name="${selectedAnswerName}" value="${escapeAttribute(option)}">
									${option}
								</label>
							`;
						}).join("")}
						<p id="quizWarning" class="warning hidden">Answer the quiz correctly before completing the lesson.</p>
					</div>

					${getPracticalLabHtml(lessonId)}

					<div class="actions">
						<button type="button" class="secondary" onclick="openCourse('${lesson.path}')">Back to Course</button>
						<button type="button" class="green" onclick="completeLesson('${lessonId}')">
							${state.completedLessons.has(lessonId) ? "Already Complete" : "Complete Lesson"}
						</button>
					</div>
				</div>
			</section>
		</section>
	`;
}

// Override completion so practicals are required too.
function completeLesson(lessonId) {
	if (state.completedLessons.has(lessonId)) {
		showToast("Already complete");
		return;
	}

	const lesson = lessons[lessonId];
	const selected = document.querySelector(`input[name="quiz-${lessonId}"]:checked`);

	if (!selected || selected.value !== lesson.quiz.answer) {
		document.getElementById("quizWarning").classList.remove("hidden");
		return;
	}

	if (!practicalIsComplete(lessonId)) {
		const warning = document.getElementById("practicalWarning");
		if (warning) warning.classList.remove("hidden");
		showToast("Practical evidence required");
		return;
	}

	state.completedLessons.add(lessonId);
	saveState();

	const next = getNextLessonInPath(lesson.path);

	if (next) {
		showToast(`Unlocked: ${lessons[next].title}`);
		openLesson(next);
	} else {
		showToast(`${paths[lesson.path].title} path complete`);
		launchConfetti();
		openCourse(lesson.path);
	}
}


// ---------- Evidence anti-spam guard override ----------
// This upgrades the practical gate beyond a simple 80-character textarea.

function countWords(text) {
	const matches = text.toLowerCase().match(/[a-z0-9']+/g);
	return matches ? matches.length : 0;
}

function countUniqueWords(text) {
	const matches = text.toLowerCase().match(/[a-z0-9']+/g);
	if (!matches) return 0;

	return new Set(matches.filter(function(word) {
		return word.length > 2;
	})).size;
}

function hasSpamPattern(text) {
	const clean = text.toLowerCase().trim();

	if (clean.length < 1) return true;

	const repeatedCharacter = /(.)\1{8,}/.test(clean);
	const repeatedShortPattern = /\b(\w+)(\s+\1){5,}\b/.test(clean);
	const keyboardMash = /(asdf|qwer|zxcv|hjkl|aaaa|bbbb|cccc|dddd|eeee|ffff|gggg|hhhh|iiii|jjjj|kkkk|llll|mmmm|nnnn|oooo|pppp|qqqq|rrrr|ssss|tttt|uuuu|vvvv|wwww|xxxx|yyyy|zzzz)/.test(clean);
	const tooFewUnique = countWords(clean) >= 30 && countUniqueWords(clean) < 12;

	return repeatedCharacter || repeatedShortPattern || keyboardMash || tooFewUnique;
}

function getEvidenceText(lessonId) {
	const build = document.getElementById("evidenceBuild-" + lessonId);
	const debug = document.getElementById("evidenceDebug-" + lessonId);
	const result = document.getElementById("evidenceResult-" + lessonId);

	return [
		build ? build.value : "",
		debug ? debug.value : "",
		result ? result.value : ""
	].join(" ");
}

function updateEvidenceMeter(lessonId) {
	const text = getEvidenceText(lessonId);
	const words = countWords(text);
	const unique = countUniqueWords(text);
	const score = Math.min(100, Math.round(((words / 45) * 55) + ((unique / 24) * 45)));

	const fill = document.getElementById("qualityFill-" + lessonId);
	const label = document.getElementById("qualityLabel-" + lessonId);

	if (fill) fill.style.width = score + "%";
	if (label) label.textContent = words + " words • " + unique + " unique words";
}

function getEvidenceProblems(lessonId) {
	const problems = [];

	const practicalCheck = document.getElementById("practicalCheck-" + lessonId);
	const debugCheck = document.getElementById("debugCheck-" + lessonId);
	const build = document.getElementById("evidenceBuild-" + lessonId);
	const debug = document.getElementById("evidenceDebug-" + lessonId);
	const result = document.getElementById("evidenceResult-" + lessonId);
	const file = document.getElementById("evidenceFile-" + lessonId);

	const buildText = build ? build.value.trim() : "";
	const debugText = debug ? debug.value.trim() : "";
	const resultText = result ? result.value.trim() : "";
	const totalText = [buildText, debugText, resultText].join(" ");

	if (!practicalCheck || !practicalCheck.checked) {
		problems.push("Tick that the required build was completed and tested.");
	}

	if (!debugCheck || !debugCheck.checked) {
		problems.push("Tick that the debug check was completed.");
	}

	if (countWords(buildText) < 15) {
		problems.push("Build evidence needs at least 15 real words.");
	}

	if (countWords(debugText) < 12) {
		problems.push("Debug evidence needs at least 12 real words.");
	}

	if (countWords(resultText) < 12) {
		problems.push("Result evidence needs at least 12 real words.");
	}

	if (countWords(totalText) < 45) {
		problems.push("Total evidence needs at least 45 words.");
	}

	if (countUniqueWords(totalText) < 24) {
		problems.push("Evidence needs at least 24 unique meaningful words.");
	}

	if (hasSpamPattern(totalText)) {
		problems.push("Evidence looks repetitive or spam-like. Write what actually happened.");
	}

	if (!file || !file.files || file.files.length === 0) {
		problems.push("Attach at least one screenshot, image, or video file as evidence.");
	}

	return problems;
}

function renderEvidenceProblems(lessonId, problems) {
	const warning = document.getElementById("practicalWarning");
	if (!warning) return;

	if (problems.length === 0) {
		warning.classList.add("hidden");
		warning.innerHTML = "";
		return;
	}

	warning.classList.remove("hidden");
	warning.innerHTML = `
		<div class="evidence-warning-list">
			<strong>Practical evidence is not strong enough yet:</strong>
			<ul>
				${problems.map(function(problem) {
					return `<li>${problem}</li>`;
				}).join("")}
			</ul>
		</div>
	`;
}

function practicalIsComplete(lessonId) {
	const problems = getEvidenceProblems(lessonId);
	renderEvidenceProblems(lessonId, problems);
	return problems.length === 0;
}

function getPracticalLabHtml(lessonId) {
	const lab = practicalLabs[lessonId];

	if (!lab) {
		return "";
	}

	return `
		<div class="lesson-block practical-lab">
			<h3>Mandatory Practical Lab</h3>
			<div class="difficulty-row">
				<span class="difficulty-pill">${lab.difficulty}</span>
				<span class="difficulty-pill">Evidence Required</span>
				<span class="difficulty-pill">Anti-Spam Check</span>
				<span class="difficulty-pill">Media Required</span>
			</div>

			<div class="lab-grid">
				<div class="lab-card">
					<h4>Required Build</h4>
					<p>${lab.required}</p>
				</div>

				<div class="lab-card">
					<h4>Mastery Challenge</h4>
					<p>${lab.mastery}</p>
				</div>

				<div class="lab-card">
					<h4>Debug Check</h4>
					<p>${lab.debug}</p>
				</div>
			</div>

			<div class="media-placeholder">
				<strong>Media evidence:</strong> attach a screenshot, reference image, or short clip.
				This static version checks that a file is selected; tomorrow this can be upgraded with real AI review.
			</div>

			<label class="practical-check">
				<input type="checkbox" id="practicalCheck-${lessonId}">
				<span>I completed the required practical task myself and tested it.</span>
			</label>

			<label class="practical-check">
				<input type="checkbox" id="debugCheck-${lessonId}">
				<span>I completed the debug check or found/fixed one mistake.</span>
			</label>

			<div class="evidence-grid">
				<div class="evidence-field">
					<h4>1. Build Evidence</h4>
					<p>What exactly did you build? Mention names, objects, scripts, tools, or settings.</p>
					<textarea id="evidenceBuild-${lessonId}" class="evidence-box small" oninput="updateEvidenceMeter('${lessonId}')" placeholder="At least 15 words."></textarea>
				</div>

				<div class="evidence-field">
					<h4>2. Debug Evidence</h4>
					<p>What broke, what mistake did you test, or what did you fix?</p>
					<textarea id="evidenceDebug-${lessonId}" class="evidence-box small" oninput="updateEvidenceMeter('${lessonId}')" placeholder="At least 12 words."></textarea>
				</div>

				<div class="evidence-field">
					<h4>3. Result Evidence</h4>
					<p>What worked at the end? Mention the final output or visible result.</p>
					<textarea id="evidenceResult-${lessonId}" class="evidence-box small" oninput="updateEvidenceMeter('${lessonId}')" placeholder="At least 12 words."></textarea>
				</div>
			</div>

			<div class="file-evidence">
				<label for="evidenceFile-${lessonId}">Attach proof file</label>
				<input id="evidenceFile-${lessonId}" type="file" accept="image/*,video/*">
			</div>

			<div class="evidence-quality-meter">
				<div class="quality-row">
					<span>Evidence quality</span>
					<span id="qualityLabel-${lessonId}">0 words • 0 unique words</span>
				</div>
				<div class="quality-bar">
					<div id="qualityFill-${lessonId}" class="quality-fill"></div>
				</div>
			</div>

			<div id="practicalWarning" class="warning hidden"></div>
		</div>
	`;
}


// ---------- Hidden Admin Panel ----------
// Access methods:
// 1. Type: academyadmin
// 2. Press: Ctrl + Shift + A
// Frontend admin passcode disabled. Do not put real admin secrets in static JavaScript.
// This is front-end only. It hides tools but does not secure them against inspection.

const ADMIN_PASSCODE = "__FRONTEND_ADMIN_DISABLED__";
let typedAdminBuffer = "";
let adminLoggedIn = false;

document.addEventListener("keydown", function(event) {
	if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
		openAdmin();
		return;
	}

	if (event.key.length === 1) {
		typedAdminBuffer += event.key.toLowerCase();
		typedAdminBuffer = typedAdminBuffer.slice(-24);

		if (typedAdminBuffer.includes("academyadmin")) {
			typedAdminBuffer = "";
			openAdmin();
		}
	}
});

function openAdmin() {
	const overlay = document.getElementById("adminOverlay");
	if (!overlay) return;

	overlay.classList.remove("hidden");
	overlay.setAttribute("aria-hidden", "false");

	if (adminLoggedIn) {
		showAdminDashboard();
	} else {
		showAdminLogin();
	}

	setTimeout(function() {
		const input = document.getElementById("adminPasscode");
		if (input && !adminLoggedIn) input.focus();
	}, 80);
}

function closeAdmin() {
	const overlay = document.getElementById("adminOverlay");
	if (!overlay) return;

	overlay.classList.add("hidden");
	overlay.setAttribute("aria-hidden", "true");
}

function showAdminLogin() {
	document.getElementById("adminLoginPanel").classList.remove("hidden");
	document.getElementById("adminDashboard").classList.add("hidden");
	document.getElementById("adminLoginWarning").classList.add("hidden");
}

function showAdminDashboard() {
	document.getElementById("adminLoginPanel").classList.add("hidden");
	document.getElementById("adminDashboard").classList.remove("hidden");
	updateAdminDashboard();
}

function attemptAdminLogin() {
	const input = document.getElementById("adminPasscode");
	const warning = document.getElementById("adminLoginWarning");

	if (input && input.value === ADMIN_PASSCODE) {
		adminLoggedIn = true;
		input.value = "";
		showToast("Admin unlocked");
		showAdminDashboard();
		return;
	}

	if (warning) warning.classList.remove("hidden");
}

function lockAdmin() {
	adminLoggedIn = false;
	showAdminLogin();
	showToast("Admin locked");
}

function adminUnlockAcademy() {
	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();
	updateAdminDashboard();
	showToast("Skill Tree unlocked by admin");
}

function adminLockAcademy() {
	state.briefingComplete = false;
	state.skillTreeUnlocked = false;
	saveState();
	updateAdminDashboard();
	showToast("Skill Tree locked by admin");
}

function adminCompleteAll() {
	Object.keys(lessons).forEach(function(lessonId) {
		state.completedLessons.add(lessonId);
	});
	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();
	updateAdminDashboard();
	showToast("All lessons completed by admin");
}

function adminResetLessons() {
	state.completedLessons.clear();
	saveState();
	updateAdminDashboard();
	showToast("Lesson progress reset by admin");
}

function adminResetEverything() {
	state.briefingComplete = false;
	state.skillTreeUnlocked = false;
	state.completedLessons.clear();
	saveState();
	updateAdminDashboard();
	showToast("Everything reset by admin");
}

function adminOpenCourse(pathId) {
	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();
	closeAdmin();
	openCourse(pathId);
}

function updateAdminDashboard() {
	const stateText = document.getElementById("adminStateText");
	const lessonList = document.getElementById("adminLessonList");
	const evidenceList = document.getElementById("adminEvidenceList");

	if (stateText) {
		stateText.innerHTML = `
			Briefing complete: <strong>${state.briefingComplete}</strong><br>
			Skill Tree unlocked: <strong>${state.skillTreeUnlocked}</strong><br>
			Lessons complete: <strong>${state.completedLessons.size}/${Object.keys(lessons).length}</strong>
		`;
	}

	if (lessonList) {
		lessonList.innerHTML = Object.keys(lessons).map(function(lessonId) {
			const lesson = lessons[lessonId];
			const complete = state.completedLessons.has(lessonId);
			const unlocked = isLessonUnlocked(lessonId);
			const status = complete ? "Complete" : unlocked ? "Available" : "Locked";

			return `
				<div class="admin-row">
					<span>${lesson.title}</span>
					<span>${status}</span>
				</div>
			`;
		}).join("");
	}

	if (evidenceList) {
		evidenceList.innerHTML = `
			<div class="admin-row">
				<span>Current static version</span>
				<span>No server evidence storage yet</span>
			</div>
			<div class="admin-row">
				<span>Next upgrade</span>
				<span>AI/API review + database</span>
			</div>
		`;
	}
}


// ---------- Admin Plus ----------
// Adds local admin tools: tabs, skill levels, evidence settings, import/export, notes, audit log.
// Still static/local only. Real accounts require server auth.

const DEFAULT_EVIDENCE_SETTINGS = {
	buildWords: 15,
	debugWords: 12,
	resultWords: 12,
	totalWords: 45,
	uniqueWords: 24,
	requireFile: true
};

function adminLoadJson(key, fallback) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch (error) {
		return fallback;
	}
}

function adminSaveJson(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getEvidenceSettings() {
	return Object.assign({}, DEFAULT_EVIDENCE_SETTINGS, adminLoadJson("creatorAcademy.evidenceSettings", {}));
}

function getSkillLevels() {
	return Object.assign(
		{ lua: "Beginner", blender: "Beginner", moon: "Beginner" },
		adminLoadJson("creatorAcademy.skillLevels", {})
	);
}

function setSkillLevels(levels) {
	adminSaveJson("creatorAcademy.skillLevels", levels);
}

function getAdminNotes() {
	return localStorage.getItem("creatorAcademy.adminNotes") || "";
}

function setAdminNotes(notes) {
	localStorage.setItem("creatorAcademy.adminNotes", notes);
}

function getAdminLog() {
	return adminLoadJson("creatorAcademy.adminLog", []);
}

function addAdminLog(message) {
	const log = getAdminLog();
	log.unshift({
		time: new Date().toISOString(),
		message: message
	});

	adminSaveJson("creatorAcademy.adminLog", log.slice(0, 60));
}

function clearAdminLog() {
	localStorage.removeItem("creatorAcademy.adminLog");
}

function showAdminDashboard() {
	adminLoggedIn = true;
	document.getElementById("adminLoginPanel").classList.add("hidden");
	document.getElementById("adminDashboard").classList.remove("hidden");
	renderAdminDashboard("overview");
}

function renderAdminDashboard(activeTab) {
	const dashboard = document.getElementById("adminDashboard");
	if (!dashboard) return;

	dashboard.innerHTML = `
		<div class="admin-dashboard-header">
			<div>
				<span class="badge">Admin Dashboard</span>
				<h3>Creator Academy Control Panel</h3>
				<p>Hidden local admin tools for testing the academy, tuning requirements, and managing prototype progress.</p>
			</div>
			<div class="actions">
				<button type="button" class="secondary" onclick="lockAdmin()">Lock Admin</button>
				<button type="button" class="red" onclick="closeAdmin()">Close</button>
			</div>
		</div>

		<div class="admin-tabs">
			<button type="button" class="admin-tab ${activeTab === "overview" ? "active" : ""}" onclick="renderAdminDashboard('overview')">Overview</button>
			<button type="button" class="admin-tab ${activeTab === "learners" ? "active" : ""}" onclick="renderAdminDashboard('learners')">Learner Tools</button>
			<button type="button" class="admin-tab ${activeTab === "lessons" ? "active" : ""}" onclick="renderAdminDashboard('lessons')">Lessons</button>
			<button type="button" class="admin-tab ${activeTab === "evidence" ? "active" : ""}" onclick="renderAdminDashboard('evidence')">Evidence Rules</button>
			<button type="button" class="admin-tab ${activeTab === "data" ? "active" : ""}" onclick="renderAdminDashboard('data')">Data</button>
			<button type="button" class="admin-tab ${activeTab === "notes" ? "active" : ""}" onclick="renderAdminDashboard('notes')">Notes / Logs</button>
		</div>

		${renderAdminTab(activeTab)}
	`;
}

function renderAdminTab(tab) {
	if (tab === "overview") return renderAdminOverview();
	if (tab === "learners") return renderAdminLearners();
	if (tab === "lessons") return renderAdminLessons();
	if (tab === "evidence") return renderAdminEvidence();
	if (tab === "data") return renderAdminData();
	if (tab === "notes") return renderAdminNotes();
	return renderAdminOverview();
}

function renderAdminOverview() {
	const totalLessons = Object.keys(lessons).length;
	const completeLessons = state.completedLessons.size;
	const evidenceSettings = getEvidenceSettings();
	const skillLevels = getSkillLevels();

	return `
		<section class="admin-panel-section active">
			<div class="admin-stat-grid">
				<div class="admin-stat">
					<span>Briefing</span>
					<strong>${state.briefingComplete ? "Done" : "Locked"}</strong>
				</div>
				<div class="admin-stat">
					<span>Skill Tree</span>
					<strong>${state.skillTreeUnlocked ? "Open" : "Closed"}</strong>
				</div>
				<div class="admin-stat">
					<span>Lessons</span>
					<strong>${completeLessons}/${totalLessons}</strong>
				</div>
				<div class="admin-stat">
					<span>Evidence Words</span>
					<strong>${evidenceSettings.totalWords}+</strong>
				</div>
			</div>

			<div class="admin-grid">
				<div class="admin-card">
					<h3>Quick Academy Controls</h3>
					<p>Use these for testing the public flow quickly.</p>
					<div class="actions">
						<button type="button" onclick="adminUnlockAcademy()">Unlock Skill Tree</button>
						<button type="button" class="secondary" onclick="adminLockAcademy()">Lock Skill Tree</button>
						<button type="button" onclick="adminCompleteAll()">Complete All</button>
						<button type="button" class="red" onclick="adminResetEverything()">Reset Everything</button>
					</div>
				</div>

				<div class="admin-card">
					<h3>Current Skill Levels</h3>
					<p><strong>Lua:</strong> ${skillLevels.lua}</p>
					<p><strong>Blender:</strong> ${skillLevels.blender}</p>
					<p><strong>Moon:</strong> ${skillLevels.moon}</p>
					<button type="button" onclick="renderAdminDashboard('learners')">Edit Levels</button>
				</div>

				<div class="admin-card">
					<h3>Course Jump</h3>
					<p>Open course maps immediately.</p>
					<div class="actions">
						<button type="button" onclick="adminOpenCourse('lua')">Lua</button>
						<button type="button" onclick="adminOpenCourse('blender')">Blender</button>
						<button type="button" onclick="adminOpenCourse('moon')">Moon</button>
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderAdminLearners() {
	const skillLevels = getSkillLevels();

	return `
		<section class="admin-panel-section active">
			<div class="admin-card">
				<h3>Learner Level Settings</h3>
				<p>Prototype setting for tomorrow’s AI level system. These levels can later decide difficulty, lesson order, and feedback strictness.</p>

				<div class="admin-form-grid">
					${adminLevelSelect("lua", "Roblox Lua", skillLevels.lua)}
					${adminLevelSelect("blender", "Blender", skillLevels.blender)}
					${adminLevelSelect("moon", "Moon Animator", skillLevels.moon)}
				</div>

				<div class="actions">
					<button type="button" onclick="adminSaveSkillLevels()">Save Levels</button>
					<button type="button" class="secondary" onclick="adminAutoSetLevels()">Auto Set From Progress</button>
				</div>
			</div>

			<div class="admin-card">
				<h3>Progress by Course</h3>
				<table class="admin-table">
					<thead>
						<tr>
							<th>Course</th>
							<th>Progress</th>
							<th>Next Lesson</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						${Object.entries(paths).map(function(entry) {
							const pathId = entry[0];
							const path = entry[1];
							const progress = getPathProgress(pathId);
							const next = getNextLessonInPath(pathId);
							return `
								<tr>
									<td>${path.title}</td>
									<td>${progress.complete}/${progress.total}</td>
									<td>${next ? lessons[next].title : "Complete"}</td>
									<td>
										<button type="button" class="admin-small-button" onclick="adminOpenCourse('${pathId}')">Open</button>
										<button type="button" class="admin-small-button secondary" onclick="adminResetPath('${pathId}')">Reset Path</button>
									</td>
								</tr>
							`;
						}).join("")}
					</tbody>
				</table>
			</div>
		</section>
	`;
}

function adminLevelSelect(id, label, value) {
	return `
		<div class="admin-field">
			<label for="adminLevel-${id}">${label}</label>
			<select id="adminLevel-${id}">
				<option ${value === "Beginner" ? "selected" : ""}>Beginner</option>
				<option ${value === "Intermediate" ? "selected" : ""}>Intermediate</option>
				<option ${value === "Advanced" ? "selected" : ""}>Advanced</option>
				<option ${value === "Expert" ? "selected" : ""}>Expert</option>
			</select>
		</div>
	`;
}

function renderAdminLessons() {
	return `
		<section class="admin-panel-section active">
			<div class="admin-card">
				<h3>Lesson Lock Editor</h3>
				<p>Manually complete or undo individual lessons for testing.</p>

				<table class="admin-table">
					<thead>
						<tr>
							<th>Lesson</th>
							<th>Path</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						${Object.keys(lessons).map(function(lessonId) {
							const lesson = lessons[lessonId];
							const complete = state.completedLessons.has(lessonId);
							const unlocked = isLessonUnlocked(lessonId);
							const status = complete ? "Complete" : unlocked ? "Available" : "Locked";
							const badgeClass = complete ? "green" : unlocked ? "blue" : "red";

							return `
								<tr>
									<td>${lesson.title}</td>
									<td>${paths[lesson.path].title}</td>
									<td><span class="admin-badge ${badgeClass}">${status}</span></td>
									<td>
										<button type="button" class="admin-small-button" onclick="adminMarkLesson('${lessonId}')">Complete</button>
										<button type="button" class="admin-small-button secondary" onclick="adminUndoLesson('${lessonId}')">Undo</button>
										<button type="button" class="admin-small-button secondary" onclick="adminPreviewLesson('${lessonId}')">Preview</button>
									</td>
								</tr>
							`;
						}).join("")}
					</tbody>
				</table>
			</div>
		</section>
	`;
}

function renderAdminEvidence() {
	const settings = getEvidenceSettings();

	return `
		<section class="admin-panel-section active">
			<div class="admin-card">
				<h3>Evidence Gate Settings</h3>
				<p>Tune how strict practical lab completion should be. These settings affect future practical checks in this browser.</p>

				<div class="admin-form-grid">
					${adminNumberField("buildWords", "Build evidence words", settings.buildWords)}
					${adminNumberField("debugWords", "Debug evidence words", settings.debugWords)}
					${adminNumberField("resultWords", "Result evidence words", settings.resultWords)}
					${adminNumberField("totalWords", "Total words", settings.totalWords)}
					${adminNumberField("uniqueWords", "Unique words", settings.uniqueWords)}
					<div class="admin-field">
						<label for="adminRequireFile">Require file proof</label>
						<select id="adminRequireFile">
							<option value="true" ${settings.requireFile ? "selected" : ""}>Yes</option>
							<option value="false" ${!settings.requireFile ? "selected" : ""}>No</option>
						</select>
					</div>
				</div>

				<div class="actions">
					<button type="button" onclick="adminSaveEvidenceSettings()">Save Evidence Rules</button>
					<button type="button" class="secondary" onclick="adminResetEvidenceSettings()">Reset Defaults</button>
				</div>
			</div>

			<div class="admin-card">
				<h3>Future AI Review Plan</h3>
				<p>Later this can be upgraded so AI checks screenshots, reads evidence, detects nonsense, scores quality, and gives feedback before lesson completion.</p>
			</div>
		</section>
	`;
}

function adminNumberField(id, label, value) {
	return `
		<div class="admin-field">
			<label for="adminEvidence-${id}">${label}</label>
			<input id="adminEvidence-${id}" type="number" min="0" value="${value}">
		</div>
	`;
}

function renderAdminData() {
	const exportData = getAcademyExportData();

	return `
		<section class="admin-panel-section active">
			<div class="admin-two-column">
				<div class="admin-card">
					<h3>Export Save Data</h3>
					<p>Copy this JSON to back up current local progress/settings.</p>
					<textarea id="adminExportBox" class="admin-json-box">${escapeHtml(JSON.stringify(exportData, null, 2))}</textarea>
					<div class="actions">
						<button type="button" onclick="adminCopyExport()">Copy Export</button>
					</div>
				</div>

				<div class="admin-card">
					<h3>Import Save Data</h3>
					<p>Paste exported JSON here to restore progress/settings.</p>
					<textarea id="adminImportBox" class="admin-json-box" placeholder="Paste export JSON here"></textarea>
					<div class="actions">
						<button type="button" onclick="adminImportData()">Import Data</button>
					</div>
				</div>
			</div>

			<div class="admin-card admin-danger-zone" style="margin-top: 16px;">
				<h3>Danger Zone</h3>
				<p>Use only for testing.</p>
				<div class="actions">
					<button type="button" class="secondary" onclick="adminResetLessons()">Reset Lessons</button>
					<button type="button" class="red" onclick="adminResetEverything()">Reset Everything</button>
					<button type="button" class="red" onclick="adminClearAllLocalData()">Clear All Local Academy Data</button>
				</div>
			</div>
		</section>
	`;
}

function renderAdminNotes() {
	const notes = getAdminNotes();
	const log = getAdminLog();

	return `
		<section class="admin-panel-section active">
			<div class="admin-two-column">
				<div class="admin-card">
					<h3>Admin Notes</h3>
					<p>Use this for TODOs, ideas, or testing notes.</p>
					<div class="admin-field">
						<textarea id="adminNotesBox">${escapeHtml(notes)}</textarea>
					</div>
					<div class="actions">
						<button type="button" onclick="adminSaveNotes()">Save Notes</button>
					</div>
				</div>

				<div class="admin-card">
					<h3>Audit Log</h3>
					<p>Local prototype log of admin actions.</p>
					<div class="actions">
						<button type="button" class="secondary" onclick="adminClearLog()">Clear Log</button>
					</div>
					<div class="admin-log">
						${log.length ? log.map(function(entry) {
							return `
								<div class="admin-log-entry">
									<time>${new Date(entry.time).toLocaleString()}</time>
									${entry.message}
								</div>
							`;
						}).join("") : `<div class="admin-log-entry">No admin actions logged yet.</div>`}
					</div>
				</div>
			</div>
		</section>
	`;
}

function adminSaveSkillLevels() {
	const levels = {
		lua: document.getElementById("adminLevel-lua").value,
		blender: document.getElementById("adminLevel-blender").value,
		moon: document.getElementById("adminLevel-moon").value
	};

	setSkillLevels(levels);
	addAdminLog("Saved learner skill levels.");
	showToast("Skill levels saved");
	renderAdminDashboard("learners");
}

function adminAutoSetLevels() {
	const levels = {};

	Object.keys(paths).forEach(function(pathId) {
		const progress = getPathProgress(pathId);
		const ratio = progress.complete / progress.total;

		if (ratio >= 1) levels[pathId] = "Advanced";
		else if (ratio >= 0.5) levels[pathId] = "Intermediate";
		else levels[pathId] = "Beginner";
	});

	setSkillLevels(levels);
	addAdminLog("Auto-set learner levels from progress.");
	showToast("Levels auto-set from progress");
	renderAdminDashboard("learners");
}

function adminResetPath(pathId) {
	paths[pathId].lessons.forEach(function(lessonId) {
		state.completedLessons.delete(lessonId);
	});

	saveState();
	addAdminLog("Reset path: " + paths[pathId].title);
	showToast("Path reset");
	renderAdminDashboard("learners");
}

function adminMarkLesson(lessonId) {
	state.completedLessons.add(lessonId);
	saveState();
	addAdminLog("Marked complete: " + lessons[lessonId].title);
	showToast("Lesson marked complete");
	renderAdminDashboard("lessons");
}

function adminUndoLesson(lessonId) {
	state.completedLessons.delete(lessonId);
	saveState();
	addAdminLog("Undid lesson: " + lessons[lessonId].title);
	showToast("Lesson undone");
	renderAdminDashboard("lessons");
}

function adminPreviewLesson(lessonId) {
	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();
	closeAdmin();
	openLesson(lessonId);
}

function adminSaveEvidenceSettings() {
	const settings = {
		buildWords: Number(document.getElementById("adminEvidence-buildWords").value),
		debugWords: Number(document.getElementById("adminEvidence-debugWords").value),
		resultWords: Number(document.getElementById("adminEvidence-resultWords").value),
		totalWords: Number(document.getElementById("adminEvidence-totalWords").value),
		uniqueWords: Number(document.getElementById("adminEvidence-uniqueWords").value),
		requireFile: document.getElementById("adminRequireFile").value === "true"
	};

	adminSaveJson("creatorAcademy.evidenceSettings", settings);
	addAdminLog("Saved evidence gate settings.");
	showToast("Evidence settings saved");
	renderAdminDashboard("evidence");
}

function adminResetEvidenceSettings() {
	localStorage.removeItem("creatorAcademy.evidenceSettings");
	addAdminLog("Reset evidence gate settings.");
	showToast("Evidence settings reset");
	renderAdminDashboard("evidence");
}

function getAcademyExportData() {
	return {
		briefingComplete: state.briefingComplete,
		skillTreeUnlocked: state.skillTreeUnlocked,
		completedLessons: Array.from(state.completedLessons),
		evidenceSettings: getEvidenceSettings(),
		skillLevels: getSkillLevels(),
		adminNotes: getAdminNotes(),
		adminLog: getAdminLog(),
		exportedAt: new Date().toISOString()
	};
}

function adminCopyExport() {
	const box = document.getElementById("adminExportBox");
	if (!box) return;

	box.select();
	document.execCommand("copy");
	showToast("Export copied");
}

function adminImportData() {
	const box = document.getElementById("adminImportBox");

	try {
		const data = JSON.parse(box.value);

		state.briefingComplete = Boolean(data.briefingComplete);
		state.skillTreeUnlocked = Boolean(data.skillTreeUnlocked);
		state.completedLessons = new Set(Array.isArray(data.completedLessons) ? data.completedLessons : []);

		saveState();

		if (data.evidenceSettings) adminSaveJson("creatorAcademy.evidenceSettings", data.evidenceSettings);
		if (data.skillLevels) setSkillLevels(data.skillLevels);
		if (typeof data.adminNotes === "string") setAdminNotes(data.adminNotes);
		if (Array.isArray(data.adminLog)) adminSaveJson("creatorAcademy.adminLog", data.adminLog);

		addAdminLog("Imported academy data.");
		showToast("Data imported");
		renderAdminDashboard("data");
	} catch (error) {
		showToast("Invalid JSON import");
	}
}

function adminSaveNotes() {
	const box = document.getElementById("adminNotesBox");
	setAdminNotes(box.value);
	addAdminLog("Saved admin notes.");
	showToast("Notes saved");
	renderAdminDashboard("notes");
}

function adminClearLog() {
	clearAdminLog();
	showToast("Log cleared");
	renderAdminDashboard("notes");
}

function adminClearAllLocalData() {
	Object.keys(localStorage).forEach(function(key) {
		if (
			key.indexOf("creatorAcademy") === 0 ||
			key === "briefingComplete" ||
			key === "skillTreeUnlocked" ||
			key === "completedLessons"
		) {
			localStorage.removeItem(key);
		}
	});

	state.briefingComplete = false;
	state.skillTreeUnlocked = false;
	state.completedLessons.clear();

	showToast("Local academy data cleared");
	renderAdminDashboard("data");
}

// Add logs to existing simple admin actions by wrapping them.
const adminOriginalUnlockAcademy = adminUnlockAcademy;
adminUnlockAcademy = function() {
	adminOriginalUnlockAcademy();
	addAdminLog("Unlocked Skill Tree.");
	renderAdminDashboard("overview");
};

const adminOriginalLockAcademy = adminLockAcademy;
adminLockAcademy = function() {
	adminOriginalLockAcademy();
	addAdminLog("Locked Skill Tree.");
	renderAdminDashboard("overview");
};

const adminOriginalCompleteAll = adminCompleteAll;
adminCompleteAll = function() {
	adminOriginalCompleteAll();
	addAdminLog("Completed all lessons.");
	renderAdminDashboard("overview");
};

const adminOriginalResetLessons = adminResetLessons;
adminResetLessons = function() {
	adminOriginalResetLessons();
	addAdminLog("Reset all lesson progress.");
	renderAdminDashboard("overview");
};

const adminOriginalResetEverything = adminResetEverything;
adminResetEverything = function() {
	adminOriginalResetEverything();
	addAdminLog("Reset academy state and lessons.");
	renderAdminDashboard("overview");
};

// Override evidence requirements if Evidence Guard exists.
if (typeof getEvidenceProblems === "function") {
	getEvidenceProblems = function(lessonId) {
		const settings = getEvidenceSettings();
		const problems = [];

		const practicalCheck = document.getElementById("practicalCheck-" + lessonId);
		const debugCheck = document.getElementById("debugCheck-" + lessonId);
		const build = document.getElementById("evidenceBuild-" + lessonId);
		const debug = document.getElementById("evidenceDebug-" + lessonId);
		const result = document.getElementById("evidenceResult-" + lessonId);
		const file = document.getElementById("evidenceFile-" + lessonId);

		const buildText = build ? build.value.trim() : "";
		const debugText = debug ? debug.value.trim() : "";
		const resultText = result ? result.value.trim() : "";
		const totalText = [buildText, debugText, resultText].join(" ");

		if (!practicalCheck || !practicalCheck.checked) problems.push("Tick that the required build was completed and tested.");
		if (!debugCheck || !debugCheck.checked) problems.push("Tick that the debug check was completed.");
		if (countWords(buildText) < settings.buildWords) problems.push("Build evidence needs at least " + settings.buildWords + " real words.");
		if (countWords(debugText) < settings.debugWords) problems.push("Debug evidence needs at least " + settings.debugWords + " real words.");
		if (countWords(resultText) < settings.resultWords) problems.push("Result evidence needs at least " + settings.resultWords + " real words.");
		if (countWords(totalText) < settings.totalWords) problems.push("Total evidence needs at least " + settings.totalWords + " words.");
		if (countUniqueWords(totalText) < settings.uniqueWords) problems.push("Evidence needs at least " + settings.uniqueWords + " unique meaningful words.");
		if (hasSpamPattern(totalText)) problems.push("Evidence looks repetitive or spam-like. Write what actually happened.");
		if (settings.requireFile && (!file || !file.files || file.files.length === 0)) problems.push("Attach at least one screenshot, image, or video file as evidence.");

		return problems;
	};
}


// ---------- Mandatory Plan / Public Rank System ----------
// Static prototype only: plan selection is simulated in browser memory.
// Real payments need Stripe/PayPal + a backend server. Do not collect card details in this static site.

const planOrder = ["free", "plus", "elite", "pro", "proplus", "admin"];

const plans = {
	free: {
		name: "Basic / Free",
		publicName: "Basic",
		price: "£0",
		rank: 0,
		monthly: "/mo",
		description: "Entry access for testing the academy flow and starting each course.",
		features: [
			"Academy briefing",
			"Skill Tree access",
			"First lesson in each course",
			"Basic progress memory"
		]
	},
	plus: {
		name: "Plus",
		publicName: "Plus",
		price: "£4.99",
		rank: 1,
		monthly: "/mo",
		description: "Better beginner access for users who want more structured lesson progression.",
		features: [
			"Everything in Basic",
			"More Lua beginner lessons",
			"More Blender beginner lessons",
			"More Moon beginner lessons"
		]
	},
	elite: {
		name: "Elite",
		publicName: "Elite",
		price: "£9.99",
		rank: 2,
		monthly: "/mo",
		description: "Middle tier for serious learners who want stronger practical requirements.",
		features: [
			"Everything in Plus",
			"Expanded practical labs",
			"Evidence quality gates",
			"Intermediate course access"
		]
	},
	pro: {
		name: "Pro",
		publicName: "Pro",
		price: "£14.99",
		rank: 3,
		monthly: "/mo",
		description: "Advanced public tier for users working through full skill paths.",
		features: [
			"Everything in Elite",
			"Advanced course lessons",
			"Stricter project tasks",
			"Future AI feedback support"
		]
	},
	proplus: {
		name: "Pro+",
		publicName: "Pro+",
		price: "£24.99",
		rank: 4,
		monthly: "/mo",
		description: "Highest public course tier. Unlocks all public learning content.",
		features: [
			"Everything in Pro",
			"All public lessons",
			"All public practical labs",
			"Highest public rank"
		]
	},
	admin: {
		name: "Admin",
		publicName: "Admin",
		price: "Hidden",
		rank: 99,
		monthly: "",
		description: "Hidden internal rank. Higher than Pro+ and only available from the admin panel.",
		features: [
			"Bypasses public plan gates",
			"Admin control panel",
			"Testing tools",
			"Hidden highest rank"
		]
	}
};

const lessonPlanRequirements = {
	lua1: "free",
	lua2: "plus",
	lua3: "plus",
	lua4: "elite",
	lua5: "pro",
	blend1: "free",
	blend2: "elite",
	blend3: "proplus",
	moon1: "free",
	moon2: "pro",
	moon3: "proplus"
};

state.plan = localStorage.getItem("creatorAcademy.plan") || localStorage.getItem("academyPlan") || "";

function savePlan(planId) {
	state.plan = planId;
	localStorage.setItem("creatorAcademy.plan", planId);
	localStorage.setItem("academyPlan", planId);
	if (typeof addAdminLog === "function") {
		addAdminLog("Plan set to: " + plans[planId].name);
	}
}

function getCurrentPlan() {
	return plans[state.plan] ? state.plan : "";
}

function getCurrentPlanRank() {
	const planId = getCurrentPlan();
	if (!planId) return -1;
	return plans[planId].rank;
}

function hasPlan() {
	return Boolean(getCurrentPlan());
}

function isAdminRank() {
	return getCurrentPlan() === "admin";
}

function planMeetsRequirement(requiredPlan) {
	if (!requiredPlan) return true;
	if (isAdminRank()) return true;
	return getCurrentPlanRank() >= plans[requiredPlan].rank;
}

function getLessonRequiredPlan(lessonId) {
	return lessonPlanRequirements[lessonId] || "free";
}

function showPlanRequired(requiredPlan) {
	const plan = plans[requiredPlan] || plans.free;

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Plan Required</span>
					<h2>${plan.name} Required</h2>
					<p>This lesson needs ${plan.name} or higher. Current plan: ${getCurrentPlan() ? plans[getCurrentPlan()].name : "None"}.</p>
				</div>
				<div class="actions">
					<button type="button" onclick="showPlans()">View Plans</button>
					<button type="button" class="secondary" onclick="openSkillTree()">Back to Skill Tree</button>
				</div>
			</div>

			<div class="payment-note">
				This is a static prototype. Real paid access must be handled by a secure backend and a payment provider like Stripe or PayPal.
			</div>
		</section>
	`;
}

function showPlans() {
	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Mandatory Access Plan</span>
					<h2>Choose a Plan</h2>
					<p>Pick a plan before entering the Skill Tree. Pro+ is the highest public course rank. Admin is hidden and only assignable through the admin panel.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
				</div>
			</div>

			<div class="plan-status-panel">
				<div>
					<h3>Current Rank</h3>
					<p>${getCurrentPlan() ? plans[getCurrentPlan()].name : "No plan selected yet"}</p>
				</div>
				<span class="rank-badge ${isAdminRank() ? "admin" : ""}">${getCurrentPlan() ? plans[getCurrentPlan()].publicName : "No Rank"}</span>
			</div>

			<div class="plan-grid">
				${["free", "plus", "elite", "pro", "proplus"].map(renderPlanCard).join("")}
			</div>

			<div class="admin-rank-warning">
				<strong>Hidden rank:</strong> Admin exists above Pro+, but it is not public and does not appear as a normal plan.
				It can only be assigned from the hidden admin panel for testing/internal control.
			</div>

			<div class="payment-note">
				Prototype rule: selecting a paid plan here only simulates payment. Do not collect card details in this static website.
				Real payment requires backend verification.
			</div>
		</section>
	`;
}

function renderPlanCard(planId) {
	const plan = plans[planId];
	const current = getCurrentPlan() === planId;
	const featured = planId === "pro" ? "featured" : "";
	const proplus = planId === "proplus" ? "proplus" : "";
	const ribbon =
		planId === "free" ? "" :
		planId === "proplus" ? `<div class="plan-ribbon">Highest Public</div>` :
		planId === "pro" ? `<div class="plan-ribbon">Popular</div>` :
		"";

	return `
		<div class="plan-card ${featured} ${proplus}">
			${ribbon}
			<div>
				<span class="rank-badge">${plan.publicName}</span>
				<h3 class="plan-name">${plan.name}</h3>
				<div class="plan-price">${plan.price}<span>${plan.monthly}</span></div>
				<p>${plan.description}</p>
				<ul class="plan-features">
					${plan.features.map(function(feature) {
						return `<li>${feature}</li>`;
					}).join("")}
				</ul>
			</div>

			<button type="button" class="${current ? "green" : ""}" onclick="selectPlan('${planId}')">
				${current ? "Current Plan" : planId === "free" ? "Select Free" : "Simulate Payment"}
			</button>
		</div>
	`;
}

function selectPlan(planId) {
	if (!plans[planId] || planId === "admin") {
		showToast("Invalid public plan");
		return;
	}

	savePlan(planId);
	state.skillTreeUnlocked = true;
	state.briefingComplete = true;
	saveState();

	showToast("Plan selected: " + plans[planId].name);
	openSkillTree();
}

// Override home page to mention payment plan.
const planOriginalShowHome = showHome;
showHome = function() {
	const primaryAction = state.skillTreeUnlocked && hasPlan() ? "openSkillTree()" : state.briefingComplete ? "showPlans()" : "startBriefing()";
	const primaryText = state.skillTreeUnlocked && hasPlan() ? "Continue Learning" : state.briefingComplete ? "Choose Plan" : "Start Academy Briefing";

	app.innerHTML = `
		<section class="hero polished-hero">
			<div class="hero-content">
				<span class="badge">Structured Creator Training</span>
				<h2>Creator Academy Hub</h2>
				<p>
					A focused learning academy for Roblox Lua, Blender, and Moon Animator.
					Complete the briefing, choose an access plan, then learn through one-lesson-at-a-time course trees.
				</p>

				<div class="actions hero-actions">
					<button type="button" onclick="${primaryAction}">${primaryText}</button>
					<button type="button" class="secondary" onclick="showProgress()">View Progress</button>
					<button type="button" class="secondary" onclick="showPlans()">Plans</button>
				</div>

				<div class="plan-status-panel">
					<div>
						<h3>Current Access</h3>
						<p>${getCurrentPlan() ? plans[getCurrentPlan()].name : "No plan selected. Course access is locked until a plan is chosen."}</p>
					</div>
					<span class="rank-badge ${isAdminRank() ? "admin" : ""}">${getCurrentPlan() ? plans[getCurrentPlan()].publicName : "No Rank"}</span>
				</div>

				<div class="flow-panel">
					<h3>Academy Flow</h3>
					<div class="flow-grid">
						<div class="flow-step"><span>01</span><h4>Briefing</h4><p>Users learn how the academy works.</p></div>
						<div class="flow-step"><span>02</span><h4>Plan</h4><p>Users select Basic, Plus, Elite, Pro, or Pro+.</p></div>
						<div class="flow-step"><span>03</span><h4>Course Tree</h4><p>Users choose Lua, Blender, or Moon Animator.</p></div>
						<div class="flow-step"><span>04</span><h4>Practical</h4><p>Users pass quiz and evidence checks to progress.</p></div>
					</div>
				</div>
			</div>
		</section>
	`;
};

// Override briefing completion to require plan selection next.
const planOriginalFinishBriefing = finishBriefing;
finishBriefing = function() {
	state.briefingComplete = true;
	state.skillTreeUnlocked = false;
	saveState();

	showToast("Briefing complete. Choose a plan.");
	showPlans();
};

// Override Skill Tree: plan must exist.
const planOriginalOpenSkillTree = openSkillTree;
openSkillTree = function() {
	if (!state.briefingComplete) {
		showToast("Complete the academy briefing first");
		startBriefing();
		return;
	}

	if (!hasPlan()) {
		showToast("Choose a plan first");
		showPlans();
		return;
	}

	state.skillTreeUnlocked = true;
	saveState();
	planOriginalOpenSkillTree();
};

// Override lesson unlock to include plan gates.
const planOriginalIsLessonUnlocked = isLessonUnlocked;
isLessonUnlocked = function(lessonId) {
	if (!planOriginalIsLessonUnlocked(lessonId)) return false;
	const requiredPlan = getLessonRequiredPlan(lessonId);
	return planMeetsRequirement(requiredPlan);
};

// Override render skill nodes to show required plan.
renderSkillNode = function(lessonId) {
	const lesson = lessons[lessonId];
	const complete = state.completedLessons.has(lessonId);
	const sequenceAvailable = planOriginalIsLessonUnlocked(lessonId);
	const requiredPlan = getLessonRequiredPlan(lessonId);
	const planAllowed = planMeetsRequirement(requiredPlan);
	const available = sequenceAvailable && planAllowed;

	let status = "Locked";
	let className = "locked";

	if (complete) {
		status = "Complete";
		className = "complete";
	} else if (available) {
		status = "Available";
		className = "available";
	} else if (sequenceAvailable && !planAllowed) {
		status = plans[requiredPlan].name + " Required";
		className = "locked locked-by-plan";
	}

	return `
		<button type="button" class="skill-node ${className}" onclick="openLesson('${lessonId}')">
			<span class="node-status">${status}</span>
			<h3>${lesson.title}</h3>
			<p>${lesson.summary}</p>
			<p class="plan-lock-note">Requires: ${plans[requiredPlan].name}</p>
		</button>
	`;
};

// Override openLesson to show plan required page when needed.
const planOriginalOpenLesson = openLesson;
openLesson = function(lessonId) {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (!hasPlan()) {
		showPlans();
		return;
	}

	const requiredPlan = getLessonRequiredPlan(lessonId);

	if (planOriginalIsLessonUnlocked(lessonId) && !planMeetsRequirement(requiredPlan)) {
		showPlanRequired(requiredPlan);
		return;
	}

	planOriginalOpenLesson(lessonId);
};

// Override progress page to include plan.
const planOriginalShowProgress = showProgress;
showProgress = function() {
	planOriginalShowProgress();

	const panel = document.querySelector(".panel .course-header");
	if (panel) {
		panel.insertAdjacentHTML("afterend", `
			<div class="plan-status-panel">
				<div>
					<h3>Current Plan</h3>
					<p>${getCurrentPlan() ? plans[getCurrentPlan()].name : "No plan selected"}</p>
				</div>
				<div class="actions">
					<button type="button" onclick="showPlans()">Change Plan</button>
				</div>
			</div>
		`);
	}
};

// Extend reset everything.
const planOriginalResetEverything = resetEverything;
resetEverything = function() {
	planOriginalResetEverything();
	state.plan = "";
	localStorage.removeItem("creatorAcademy.plan");
	localStorage.removeItem("academyPlan");
};

// Admin helpers for hidden rank.
function adminSetPlan(planId) {
	if (!plans[planId]) {
		showToast("Invalid plan");
		return;
	}

	savePlan(planId);
	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();

	showToast("Rank set: " + plans[planId].name);

	if (typeof renderAdminDashboard === "function") {
		renderAdminDashboard("overview");
	}
}

function adminRenderPlanControls() {
	return `
		<div class="admin-card">
			<h3>Rank / Plan Control</h3>
			<p>Public highest is Pro+. Hidden highest rank is Admin.</p>
			<p>Current rank: <strong>${getCurrentPlan() ? plans[getCurrentPlan()].name : "None"}</strong></p>
			<div class="actions">
				${["free", "plus", "elite", "pro", "proplus", "admin"].map(function(planId) {
					return `<button type="button" class="${planId === "admin" ? "secondary" : ""}" onclick="adminSetPlan('${planId}')">${plans[planId].name}</button>`;
				}).join("")}
			</div>
		</div>
	`;
}

// Patch admin overview tab if Admin Plus exists.
if (typeof renderAdminOverview === "function") {
	const originalRenderAdminOverview = renderAdminOverview;
	renderAdminOverview = function() {
		const html = originalRenderAdminOverview();
		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${adminRenderPlanControls()}`);
	};
}

// Initial plan gate: if old saved users had skill tree but no plan, send them to plan screen on Learn.
if (state.skillTreeUnlocked && !hasPlan()) {
	state.skillTreeUnlocked = false;
	saveState();
}


// ---------- Stripe Payment Links ----------
// Public Stripe-hosted checkout links. No Stripe login details, bank details, or API secrets are stored here.
// Static version: paid users go to Stripe, then admin manually assigns the plan after payment.
// Later version: use Stripe Checkout + webhooks + backend for automatic plan unlock.

const stripePaymentLinks = {
	plus: "",
	elite: "",
	pro: "",
	proplus: ""
};

function goToStripePlan(planId) {
	const link = stripePaymentLinks[planId];

	if (!link) {
		showToast("No Stripe link set for this plan");
		return;
	}

	localStorage.setItem("creatorAcademy.pendingPlan", planId);
	localStorage.setItem("creatorAcademy.pendingPlanStartedAt", new Date().toISOString());

	window.location.href = link;
}

function getPendingPlan() {
	return localStorage.getItem("creatorAcademy.pendingPlan") || "";
}

function clearPendingPlan() {
	localStorage.removeItem("creatorAcademy.pendingPlan");
	localStorage.removeItem("creatorAcademy.pendingPlanStartedAt");
}

// Override public plan cards so paid plans go to Stripe instead of simulated unlock.
renderPlanCard = function(planId) {
	const plan = plans[planId];
	const current = getCurrentPlan() === planId;
	const pending = getPendingPlan() === planId;
	const featured = planId === "pro" ? "featured" : "";
	const proplus = planId === "proplus" ? "proplus" : "";
	const ribbon =
		planId === "free" ? "" :
		planId === "proplus" ? `<div class="plan-ribbon">Highest Public</div>` :
		planId === "pro" ? `<div class="plan-ribbon">Popular</div>` :
		"";

	const buttonHtml = planId === "free"
		? `<button type="button" class="${current ? "green" : ""}" onclick="selectPlan('free')">${current ? "Current Plan" : "Select Free"}</button>`
		: `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}')">${pending ? "Resume Stripe Checkout" : "Pay with Stripe"}</button>`;

	const noteHtml = planId === "free"
		? `<div class="stripe-link-note">Free unlocks immediately.</div>`
		: `<div class="stripe-link-note">Opens Stripe-hosted checkout. Admin/manual unlock is still needed in this static prototype.</div>`;

	return `
		<div class="plan-card ${featured} ${proplus}">
			${ribbon}
			<div>
				<span class="rank-badge">${plan.publicName}</span>
				<h3 class="plan-name">${plan.name}</h3>
				<div class="plan-price">${plan.price}<span>${plan.monthly}</span></div>
				<p>${plan.description}</p>
				<ul class="plan-features">
					${plan.features.map(function(feature) {
						return `<li>${feature}</li>`;
					}).join("")}
				</ul>
				${noteHtml}
			</div>

			${buttonHtml}
		</div>
	`;
};

// Override plan page to show pending payment info.
const stripeOriginalShowPlans = showPlans;
showPlans = function() {
	stripeOriginalShowPlans();

	const pending = getPendingPlan();

	if (pending && plans[pending]) {
		const panel = document.querySelector(".panel");
		if (panel) {
			panel.insertAdjacentHTML("beforeend", `
				<div class="payment-pending-box">
					<strong>Pending checkout:</strong> ${plans[pending].name}. 
					If payment has been completed, an admin should verify it in Stripe and assign the plan from the hidden admin panel.
					<div class="actions">
						<button type="button" class="secondary" onclick="clearPendingPlan(); showPlans();">Clear Pending Checkout</button>
					</div>
				</div>
			`);
		}
	}
};

// Make Free still unlock immediately.
const stripeOriginalSelectPlan = selectPlan;
selectPlan = function(planId) {
	if (planId === "free") {
		clearPendingPlan();
		stripeOriginalSelectPlan(planId);
		return;
	}

	goToStripePlan(planId);
};

// Add pending checkout to admin overview if available.
if (typeof renderAdminOverview === "function") {
	const stripeOriginalRenderAdminOverview = renderAdminOverview;
	renderAdminOverview = function() {
		const html = stripeOriginalRenderAdminOverview();
		const pending = getPendingPlan();

		const pendingCard = `
			<div class="admin-card">
				<h3>Stripe Checkout Status</h3>
				<p>Pending checkout: <strong>${pending && plans[pending] ? plans[pending].name : "None"}</strong></p>
				<p>After confirming payment in Stripe, assign the paid rank manually here.</p>
				<div class="actions">
					<button type="button" class="secondary" onclick="clearPendingPlan(); renderAdminDashboard('overview');">Clear Pending</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${pendingCard}`);
	};
}


// ---------- Expanded Bootcamp Lessons ----------
// Adds Roblox Studio Basics as the first Foundation course,
// then expands Lua, Blender, and Moon Animator with more structured lessons.

paths.studio = {
	title: "Roblox Studio Basics",
	type: "Foundation Bootcamp",
	description: "Learn the Roblox Studio interface, Explorer, Properties, object organisation, testing, and basic building before deeper scripting.",
	lessons: ["studio1", "studio2", "studio3", "studio4", "studio5", "studio6"]
};

lessons.studio1 = {
	path: "studio",
	title: "Studio 1: Interface and Navigation",
	summary: "Learn the main Roblox Studio windows and how to move around safely.",
	concept: "Before scripting or building properly, users need to understand the Studio interface: Explorer, Properties, Viewport, Toolbox, Output, and Play controls.",
	deepDive: [
		"Roblox Studio is the workspace where the entire game is built. A beginner who does not understand the interface will struggle even if they can copy code. The first goal is to recognise where objects live, how to select them, how to inspect their settings, and how to test changes without getting lost.",
		"Explorer shows the hierarchy of the game. It is like the file tree for the Roblox place. Workspace contains 3D world objects. StarterGui contains UI templates. ServerScriptService contains server scripts. ReplicatedStorage stores shared objects. Learning these containers early prevents a lot of beginner confusion.",
		"Properties shows the settings for the selected object. If a Part is selected, Properties shows Anchored, CanCollide, Size, Position, Transparency, Material, and other settings. Most beginner building is simply selecting an object, changing the right property, and testing the result.",
		"The Viewport is the 3D scene. Users need to orbit, zoom, pan, select, move, rotate, and scale objects. The point is not speed yet. The point is control. If the user cannot move around the scene comfortably, every later lesson becomes slower."
	],
	code: "Core windows:\nExplorer = object hierarchy\nProperties = selected object settings\nViewport = 3D world view\nOutput = script messages and errors\nPlay = test the game",
	explain: [
		"Explorer shows where objects are stored.",
		"Properties changes selected object settings.",
		"Output shows print messages and errors.",
		"Play mode tests the game like a player."
	],
	quiz: {
		question: "Which window shows object settings like Anchored and Transparency?",
		options: ["Explorer", "Properties", "Output"],
		answer: "Properties"
	},
	task: "Open Explorer, Properties, and Output. Select a Part, change at least three properties, then test in Play mode."
};

lessons.studio2 = {
	path: "studio",
	title: "Studio 2: Explorer Organisation",
	summary: "Learn where objects should go and why hierarchy matters.",
	concept: "Explorer organisation is the foundation of clean Roblox projects. Objects should be placed in the correct services so scripts and systems remain readable.",
	deepDive: [
		"Explorer is not just a list of objects. It is the structure of the game. If objects are thrown everywhere randomly, the project becomes difficult to debug. Good creators organise objects early, because messy games become harder to expand.",
		"Workspace is for objects that physically exist in the world. ServerScriptService is for server-side scripts. StarterGui is for UI templates. ReplicatedStorage is useful for shared objects that both server and client may need. StarterPlayer contains player-related defaults.",
		"Naming matters. A part named `Part` tells the developer nothing. A part named `ShopButton`, `Checkpoint_01`, or `MainDoor` communicates purpose instantly. Clear names make scripts easier because code often searches for objects by name.",
		"Grouping objects into Models or Folders is a serious habit. A map, shop, enemy system, or UI folder should be grouped logically. This helps future scripting, teamwork, debugging, and scaling the project."
	],
	code: "Good structure example:\nWorkspace\n  Map\n  Interactables\nServerScriptService\n  GameSystems\nStarterGui\n  MainMenu\nReplicatedStorage\n  SharedAssets",
	explain: [
		"Workspace stores physical world objects.",
		"ServerScriptService stores server scripts.",
		"StarterGui stores UI templates.",
		"ReplicatedStorage stores shared assets.",
		"Good names make scripts easier to read."
	],
	quiz: {
		question: "Where should physical 3D world objects usually go?",
		options: ["Workspace", "StarterGui", "Output"],
		answer: "Workspace"
	},
	task: "Create folders named Map, Interactables, and Systems. Move objects into sensible places and rename at least five objects clearly."
};

lessons.studio3 = {
	path: "studio",
	title: "Studio 3: Building with Parts",
	summary: "Use parts, anchoring, collision, materials, and grouping to build clean structures.",
	concept: "Basic Roblox building uses Parts. A creator must understand size, position, anchoring, collision, material, and grouping before making more complex maps.",
	deepDive: [
		"Parts are the simplest building blocks in Roblox Studio. Even advanced maps often begin with simple blocks. If a user can build cleanly with Parts, they can prototype levels, buttons, platforms, doors, shops, and training areas quickly.",
		"Anchored decides whether physics affects the part. A wall, floor, or platform is normally anchored because it should stay still. If an important part is not anchored, it may fall, slide, or break the map during Play mode.",
		"CanCollide decides whether players can physically touch and stand on the object. A visible wall usually has collision. A decorative hologram, effect, or invisible trigger might not. Understanding collision makes the difference between playable and annoying maps.",
		"Grouping turns several objects into a Model. This is important because finished structures should be movable as one unit. A door frame, shop stall, garage, or platform system should not stay as a pile of random separate parts."
	],
	code: "Useful properties:\nAnchored = stays still\nCanCollide = blocks movement\nTransparency = visibility\nMaterial = surface look\nColor = object colour",
	explain: [
		"Anchored stops parts from falling.",
		"CanCollide controls physical blocking.",
		"Transparency controls visibility.",
		"Materials change the surface style.",
		"Models group related objects together."
	],
	quiz: {
		question: "Which property stops a part from falling in Play mode?",
		options: ["Anchored", "Transparency", "Name"],
		answer: "Anchored"
	},
	task: "Build a simple training room with a floor, two walls, a door frame, and one trigger platform. Group it into a Model."
};

lessons.studio4 = {
	path: "studio",
	title: "Studio 4: Testing and Debugging Basics",
	summary: "Learn Play mode, Output, basic error reading, and test habits.",
	concept: "Testing is how creators prove that their game actually works. Output is where scripts report prints, warnings, and errors.",
	deepDive: [
		"Beginners often build for a long time without pressing Play, then discover ten problems at once. A better habit is to test small changes constantly. Build one thing, test it, fix it, then continue.",
		"Output is one of the most important windows in Studio. When code prints text, it appears there. When scripts break, error messages appear there. Learning to read Output is a major step toward becoming independent.",
		"Errors are not insults. They are clues. A red error usually tells the line number and the problem. Sometimes the wording is confusing, but the line number narrows the search. The developer’s job is to inspect the line, check names, check spelling, and check object paths.",
		"Testing also means checking from the player’s point of view. A build can look good in edit mode but be too small, too large, blocked by collision, or broken during Play mode. Good creators test like players."
	],
	code: "Testing habits:\n1. Make a small change\n2. Press Play\n3. Watch Output\n4. Fix errors\n5. Test again",
	explain: [
		"Play mode tests the game as a player.",
		"Output shows prints and script errors.",
		"Line numbers help locate bugs.",
		"Small tests are easier than huge tests."
	],
	quiz: {
		question: "Which window shows script errors?",
		options: ["Output", "Toolbox", "Material Manager"],
		answer: "Output"
	},
	task: "Create one intentional error, read the Output message, fix it, then write what the error meant."
};

lessons.studio5 = {
	path: "studio",
	title: "Studio 5: Starter Services",
	summary: "Understand the main Roblox services beginners use.",
	concept: "Roblox games are organised into services. Knowing where UI, scripts, shared assets, and world objects belong prevents project chaos.",
	deepDive: [
		"Services are major containers built into Roblox. They are not random folders. Each service has a purpose. Beginners do not need to master every service immediately, but they should know the common ones.",
		"Workspace contains the world. StarterGui contains UI templates. ServerScriptService contains server scripts. ReplicatedStorage is used for shared assets. StarterPlayer controls player and character defaults. Lighting controls atmosphere and visual mood.",
		"Putting objects in the wrong service can break systems. A ScreenGui in Workspace will not behave like normal screen UI. A server script inside a UI may not be the correct choice for player-only behaviour. The more users understand services, the easier scripting becomes.",
		"This lesson prepares the user for Lua. Instead of asking where a script goes every time, they start thinking logically: is this world object, server logic, client UI, shared asset, or player setting?"
	],
	code: "Common services:\nWorkspace = world\nStarterGui = UI templates\nServerScriptService = server scripts\nReplicatedStorage = shared assets\nLighting = atmosphere",
	explain: [
		"Services organise the game.",
		"Workspace is for the 3D world.",
		"StarterGui is for screen UI templates.",
		"ServerScriptService is for server scripts.",
		"ReplicatedStorage is useful for shared assets."
	],
	quiz: {
		question: "Where do UI templates usually go?",
		options: ["StarterGui", "Workspace", "Lighting"],
		answer: "StarterGui"
	},
	task: "Create a labelled folder or object in Workspace, StarterGui, ServerScriptService, and ReplicatedStorage. Explain what each one is for."
};

lessons.studio6 = {
	path: "studio",
	title: "Studio 6: Mini Bootcamp Project",
	summary: "Build a small organised Roblox scene using the basics.",
	concept: "The bootcamp project proves the user can organise, build, test, and explain a small Roblox scene before moving deeper into scripting or art.",
	deepDive: [
		"A bootcamp should end with a practical project because individual facts are not enough. The user needs to prove they can combine Studio navigation, Explorer organisation, building with parts, property editing, and testing.",
		"The project does not need to be beautiful. It needs to be organised and functional. A simple training room with labelled folders, anchored parts, a platform, a door frame, basic lighting, and clear object names is enough to prove readiness.",
		"The important part is explanation. A user who can explain why objects are in Workspace, why parts are anchored, why names are clear, and how they tested the scene is ready to learn more advanced systems.",
		"This project becomes the bridge into Lua, Blender, and Moon Animator. Lua can add logic to it, Blender can replace basic parts with custom assets, and Moon Animator can add movement."
	],
	code: "Mini project requirements:\n- Organised Explorer\n- At least 10 named objects\n- Anchored structure\n- One trigger platform\n- Tested in Play mode\n- Written evidence",
	explain: [
		"Projects prove combined understanding.",
		"Clear names make the build maintainable.",
		"Play testing catches problems.",
		"Simple but finished beats complex and unfinished."
	],
	quiz: {
		question: "What matters most in the bootcamp mini project?",
		options: ["Organisation and testing", "Using thousands of parts", "Never pressing Play"],
		answer: "Organisation and testing"
	},
	task: "Build a small organised training room and write evidence explaining your hierarchy, parts, properties, and test result."
};

// Expand Lua
paths.lua.lessons.push("lua6", "lua7", "lua8");

lessons.lua6 = {
	path: "lua",
	title: "Lua 6: Functions and Reuse",
	summary: "Functions let code be reused without rewriting the same lines.",
	concept: "A function is a named block of code that can be called whenever needed. It reduces repetition and makes systems easier to expand.",
	deepDive: [
		"Functions are how scripts become organised. Without functions, code becomes a long list of repeated actions. If the same part creation, reward, print, or UI update is written ten times, changing it later becomes annoying and risky.",
		"A function should usually do one clear job. For example, `createPart()` should create a part. `giveCoins()` should change money. `openMenu()` should show a UI. Clear function names make code read almost like instructions.",
		"Parameters make functions flexible. Instead of making three separate functions for three different parts, one function can accept a part name, position, and colour. The function definition contains placeholders, and the function call provides real values.",
		"Roblox systems become much cleaner with functions. Shops, buttons, effects, checkpoints, UI updates, and admin tools all benefit from reusable blocks."
	],
	code: 'local function createMessage(message)\n\tprint("System: " .. message)\nend\n\ncreateMessage("Door opened")\ncreateMessage("Coins awarded")',
	explain: [
		"`function` creates reusable code.",
		"Parameters are placeholders.",
		"Function calls run the function.",
		"Reusable code is easier to update."
	],
	quiz: {
		question: "Why use functions?",
		options: ["To reuse code", "To delete Workspace", "To stop all scripts"],
		answer: "To reuse code"
	},
	task: "Create a function that prints a custom message. Call it at least three times with different messages."
};

lessons.lua7 = {
	path: "lua",
	title: "Lua 7: Tables",
	summary: "Tables store multiple values in one structure.",
	concept: "A table can hold lists, settings, groups of data, or dictionaries. Tables are a core Lua structure used in real systems.",
	deepDive: [
		"Tables are one of Lua’s most powerful features. A variable stores one value, but a table can store many. This makes tables useful for inventories, shop items, lesson lists, player settings, ranks, and configuration data.",
		"A list table stores values in order. For example, a list of course names or item names. A dictionary table uses named keys, such as `price = 500` or `rank = \"Pro\"`. Both styles are common.",
		"Tables make code easier to scale. Instead of creating separate variables for every item, the developer can create one table containing all items. Scripts can loop through that table later.",
		"In Roblox, tables are everywhere. ModuleScripts often return tables. Settings are often stored in tables. Admin command lists, product lists, and UI data can all use tables."
	],
	code: 'local shopItem = {\n\tname = "Speed Boost",\n\tprice = 250,\n\tunlocked = false\n}\n\nprint(shopItem.name)\nprint(shopItem.price)',
	explain: [
		"Tables hold multiple values.",
		"Keys like `name` and `price` label values.",
		"Tables can represent items, users, settings, and systems.",
		"Dot syntax reads named table values."
	],
	quiz: {
		question: "What can a table store?",
		options: ["Only one number", "Multiple related values", "Only images"],
		answer: "Multiple related values"
	},
	task: "Create a table for a shop item with name, price, description, and unlocked state. Print each value."
};

lessons.lua8 = {
	path: "lua",
	title: "Lua 8: Client vs Server",
	summary: "Understand which scripts run for the player and which run for the whole game.",
	concept: "Server scripts handle trusted game logic. LocalScripts handle player screen/UI and local input. Knowing the difference prevents major security and logic mistakes.",
	deepDive: [
		"The server is the authority of the game. Important logic such as money, purchases, damage, rewards, and saving should be controlled by the server. This helps prevent players from cheating by changing client-side values.",
		"The client is the individual player’s device. It is good for UI, camera effects, local animations, input detection, and personal visual effects. If one player opens a menu, only that player should see it.",
		"A common beginner mistake is trusting the client too much. If the client says, 'give me 1,000,000 coins,' the server should not blindly obey. Proper systems validate important actions on the server.",
		"Understanding client and server prepares the user for RemoteEvents later. RemoteEvents allow client and server to communicate, but they must be used carefully."
	],
	code: "Server Script = trusted game logic\nLocalScript = player UI and input\nRemoteEvent = communication between client and server",
	explain: [
		"Server controls trusted systems.",
		"Client controls local player experience.",
		"UI usually runs on the client.",
		"Money and rewards should be validated by the server."
	],
	quiz: {
		question: "Where should important money rewards be validated?",
		options: ["Server", "Client only", "Nowhere"],
		answer: "Server"
	},
	task: "Write a short explanation of three things that belong on the server and three things that belong on the client."
};

// Expand Blender
paths.blender.lessons.push("blend4", "blend5");

lessons.blend4 = {
	path: "blender",
	title: "Blender 4: Materials and Visual Style",
	summary: "Use materials to make simple models look intentional.",
	concept: "Materials control the surface look of a model. Even simple shapes can look good if materials are chosen cleanly.",
	deepDive: [
		"Materials are one of the fastest ways to improve a model. A basic cube can become metal, plastic, glass-like, wood-like, or sci-fi depending on material choices. Beginners often chase complex geometry too early when simple shapes plus good materials would look cleaner.",
		"For Roblox assets, the material style should fit the game. A realistic horror map, a colourful simulator, and a futuristic academy should not all use the same surfaces. Visual style creates consistency.",
		"Too many materials can make a model look messy. A clean beginner rule is to use one main material, one secondary material, and one accent colour. This keeps the design readable.",
		"Materials should be tested in Roblox Studio because lighting changes how they look. A material that looks perfect in Blender may look different once imported."
	],
	code: "Simple material rule:\nMain material = 70%\nSecondary material = 20%\nAccent colour = 10%",
	explain: [
		"Materials change surface appearance.",
		"Consistent materials create style.",
		"Too many colours can look messy.",
		"Always test appearance in Roblox Studio."
	],
	quiz: {
		question: "Why test materials in Roblox Studio?",
		options: ["Lighting changes appearance", "It deletes the material", "It turns it into Lua"],
		answer: "Lighting changes appearance"
	},
	task: "Make one simple asset with a main material, secondary material, and accent colour. Test it in Roblox Studio."
};

lessons.blend5 = {
	path: "blender",
	title: "Blender 5: Clean Modelling Workflow",
	summary: "Learn how to keep models editable and not messy.",
	concept: "A clean workflow means using clear names, simple structure, sensible scale, and avoiding unnecessary complexity.",
	deepDive: [
		"Clean modelling is not about making everything perfect. It is about making models that can be edited, exported, tested, and improved without chaos. Messy models slow down the creator later.",
		"Naming objects matters in Blender just like in Roblox Studio. If every object is called Cube, the model becomes confusing. Names like `Door_Frame`, `Handle`, `Panel_Left`, and `Trim_Top` explain structure.",
		"Scale should be checked early. If a model is made too tiny or too huge, exporting becomes annoying. It is better to test a blockout version early before adding details.",
		"Complexity should be earned. Start with a blockout, then add important details, then polish. Do not add tiny details before the main shape is correct."
	],
	code: "Clean workflow:\n1. Blockout\n2. Name objects\n3. Check scale\n4. Add important details\n5. Export test\n6. Polish",
	explain: [
		"Blockout defines the main shape.",
		"Clear names help editing.",
		"Scale should be checked early.",
		"Polish comes after structure."
	],
	quiz: {
		question: "What should come before tiny details?",
		options: ["Blockout and scale check", "Random polish", "Exporting nothing"],
		answer: "Blockout and scale check"
	},
	task: "Create a blockout model with clear object names, then export a test version before adding polish."
};

// Expand Moon
paths.moon.lessons.push("moon4", "moon5");

lessons.moon4 = {
	path: "moon",
	title: "Moon 4: Timing and Spacing",
	summary: "Improve animation feel with speed and motion control.",
	concept: "Timing controls how long movement takes. Spacing controls how movement changes between frames. Together they determine whether animation feels smooth, heavy, fast, or robotic.",
	deepDive: [
		"Animation is not just moving something from A to B. The timing determines the feeling. A door opening in 5 frames feels snappy. A door opening in 60 frames feels slow and heavy. Neither is always correct; the right timing depends on the effect.",
		"Spacing is how far the object moves between frames. Even spacing feels mechanical. Uneven spacing can create acceleration and deceleration. This is why easing makes motion feel more natural.",
		"A button press should usually move down quickly and return slightly slower or with a small bounce. A heavy gate should start slowly and feel weighty. A UI panel might slide smoothly with a clean stop.",
		"Studying timing makes simple animations look more professional without adding extra models or effects."
	],
	code: "Animation feel:\nFast timing = snappy\nSlow timing = heavy\nEven spacing = robotic\nEased spacing = smoother",
	explain: [
		"Timing controls speed.",
		"Spacing controls motion feel.",
		"Easing makes movement less robotic.",
		"Different objects need different timing."
	],
	quiz: {
		question: "What does timing control?",
		options: ["How long movement takes", "The object name", "The Roblox account"],
		answer: "How long movement takes"
	},
	task: "Create two versions of the same object animation: one fast and one slow. Compare the feel."
};

lessons.moon5 = {
	path: "moon",
	title: "Moon 5: Exporting and Using Animations",
	summary: "Understand how an animation becomes usable inside a Roblox project.",
	concept: "Creating an animation is only part of the process. The creator must export, organise, and use it in the game.",
	deepDive: [
		"An animation inside Moon Animator is not useful until the game can play it at the right time. This means the creator needs to export or save the animation properly and connect it to game logic.",
		"Object animations and character animations may be used differently. A character animation often needs an Animation object and an Animator. Object movement might be recreated with TweenService or controlled by a script depending on the setup.",
		"Organisation matters. Animation names should clearly describe what they do, such as `Door_Open`, `Button_Press`, or `NPC_Wave`. Random names make future scripting harder.",
		"The practical goal is to understand the pipeline: make animation, name it clearly, export/save it, then trigger it from gameplay or UI."
	],
	code: "Animation pipeline:\nCreate animation\nName clearly\nExport or save\nConnect to script/game event\nTest in Play mode",
	explain: [
		"Animations need to be usable in-game.",
		"Clear names help scripting.",
		"Different animation types can need different playback methods.",
		"Testing proves the animation triggers correctly."
	],
	quiz: {
		question: "Why name animations clearly?",
		options: ["So they are easier to use later", "So they disappear", "So they become images"],
		answer: "So they are easier to use later"
	},
	task: "Create or choose one animation, name it clearly, and write how it would be triggered in-game."
};

// Put Studio first in the path order by rebuilding object insertion order.
(function reorderPathsForBootcamp() {
	const ordered = {
		studio: paths.studio,
		lua: paths.lua,
		blender: paths.blender,
		moon: paths.moon
	};

	Object.keys(paths).forEach(function(key) {
		delete paths[key];
	});

	Object.keys(ordered).forEach(function(key) {
		paths[key] = ordered[key];
	});
})();

// Add plan requirements for new lessons.
Object.assign(lessonPlanRequirements, {
	studio1: "free",
	studio2: "free",
	studio3: "plus",
	studio4: "plus",
	studio5: "elite",
	studio6: "pro",
	lua6: "elite",
	lua7: "pro",
	lua8: "proplus",
	blend4: "pro",
	blend5: "proplus",
	moon4: "pro",
	moon5: "proplus"
});

// Add practical labs for new lessons.
Object.assign(practicalLabs, {
	studio1: {
		difficulty: "Foundation",
		required: "Open Explorer, Properties, Output, and the Viewport. Select a Part and change at least three properties.",
		mastery: "Explain what each window is used for and why Output matters.",
		debug: "Hide one window, find it again from the View tab, and explain how you restored it.",
		evidencePrompt: "Write which windows you opened, which properties you changed, and what happened in Play mode."
	},
	studio2: {
		difficulty: "Foundation",
		required: "Create folders for Map, Interactables, and Systems. Move objects into the correct folders.",
		mastery: "Rename at least five objects using clear purpose-based names.",
		debug: "Find one badly named object and rename it properly.",
		evidencePrompt: "Write your Explorer structure and explain why each folder exists."
	},
	studio3: {
		difficulty: "Foundation",
		required: "Build a small room using Parts with anchored walls, floor, door frame, and trigger platform.",
		mastery: "Group the build into a Model and name it clearly.",
		debug: "Turn Anchored off on one part during testing, observe the issue, then fix it.",
		evidencePrompt: "Write what you built, what properties you used, and what changed after fixing Anchored."
	},
	studio4: {
		difficulty: "Foundation",
		required: "Create one intentional beginner error, then use Output to find and fix it.",
		mastery: "Explain the error line and what the message meant.",
		debug: "Screenshot or describe the before/after error fix.",
		evidencePrompt: "Write the error, the line it happened on, and how you fixed it."
	},
	studio5: {
		difficulty: "Foundation",
		required: "Create one labelled object/folder in Workspace, StarterGui, ServerScriptService, and ReplicatedStorage.",
		mastery: "Explain the purpose of each service.",
		debug: "Move one item to the wrong service, explain why it is wrong, then move it back.",
		evidencePrompt: "Write the four services you used and what each one stores."
	},
	studio6: {
		difficulty: "Foundation Project",
		required: "Build a small organised training room with at least 10 named objects and a clean Explorer hierarchy.",
		mastery: "Test the scene in Play mode and fix at least one issue.",
		debug: "Explain what broke or what you improved after testing.",
		evidencePrompt: "Write your hierarchy, named objects, test result, and the fix you made."
	},
	lua6: {
		difficulty: "Hard Beginner",
		required: "Create a reusable function that runs at least three times with different values.",
		mastery: "Add parameters so the function changes behaviour based on input.",
		debug: "Call the function before it exists, observe the error, then fix the order.",
		evidencePrompt: "Write the function name, parameters, calls, and bug you fixed."
	},
	lua7: {
		difficulty: "Hard Beginner",
		required: "Create a table representing a shop item, lesson, or player setting.",
		mastery: "Print at least four values from the table.",
		debug: "Mistype one key, observe nil or an error, then fix it.",
		evidencePrompt: "Write your table keys, values, and what happened when a key was mistyped."
	},
	lua8: {
		difficulty: "Intermediate",
		required: "Write a clear comparison of server logic vs client logic with at least three examples each.",
		mastery: "Identify which parts of a UI shop should be client and which should be server.",
		debug: "Explain one danger of trusting the client with rewards or purchases.",
		evidencePrompt: "Write your server examples, client examples, and the security risk you identified."
	},
	blend4: {
		difficulty: "Intermediate",
		required: "Create an asset with main, secondary, and accent materials.",
		mastery: "Import or test the look in Roblox Studio lighting.",
		debug: "Change one material that looked wrong after testing.",
		evidencePrompt: "Write the material choices, what changed in Studio, and what you adjusted."
	},
	blend5: {
		difficulty: "Intermediate",
		required: "Create a blockout model with named parts and sensible scale.",
		mastery: "Export a test version before polishing.",
		debug: "Fix one scale or naming issue before finalising.",
		evidencePrompt: "Write your object names, scale test result, and what you fixed."
	},
	moon4: {
		difficulty: "Intermediate",
		required: "Make fast and slow versions of the same animation.",
		mastery: "Use timing or spacing changes to make one feel heavier or smoother.",
		debug: "Identify which version felt wrong and why.",
		evidencePrompt: "Write your frame numbers, timing changes, and which version felt better."
	},
	moon5: {
		difficulty: "Intermediate",
		required: "Create or choose one animation and document how it would be triggered in-game.",
		mastery: "Name the animation clearly and connect it to a gameplay event idea.",
		debug: "Explain one problem that could happen if the animation is named badly or triggered wrong.",
		evidencePrompt: "Write the animation name, trigger idea, and possible playback issue."
	}
});

// Add bootcamp labels to path cards.
const bootcampOriginalRenderPathCard = renderPathCard;
renderPathCard = function(pathId, path) {
	const html = bootcampOriginalRenderPathCard(pathId, path);

	if (pathId === "studio") {
		return html.replace('class="path-card', 'data-bootcamp="true" class="path-card');
	}

	return html;
};

// Patch homepage copy if current showHome is the plan override.
const bootcampOriginalShowHome = showHome;
showHome = function() {
	bootcampOriginalShowHome();

	const hero = document.querySelector(".hero-content");
	if (hero && !hero.querySelector(".bootcamp-note")) {
		hero.insertAdjacentHTML("beforeend", `
			<div class="bootcamp-note">
				<strong>New:</strong> Roblox Studio Basics has been added as the Foundation Bootcamp.
				It teaches Explorer, Properties, services, testing, and clean project organisation before deeper Lua, Blender, and Moon Animator work.
			</div>
		`);
	}
};


// ---------- FINAL Stripe new-tab hard patch ----------
// This intentionally sits at the very end of the file.
// It prevents the academy page from being redirected to Stripe.
// Stripe opens in a separate tab only. If popups are blocked, it shows a manual link.

function showManualStripeOpen(planId, link) {
	if (!app) return;

	const plan = plans[planId];

	const existing = app.querySelector(".stripe-manual-open-box");
	if (existing) existing.remove();

	const panel = app.querySelector(".panel") || app.querySelector(".hero-content") || app;

	panel.insertAdjacentHTML("beforeend", `
		<div class="stripe-manual-open-box">
			<strong>Stripe checkout did not open automatically.</strong><br>
			Your browser may have blocked the new tab. The academy page has stayed open.
			<br>
			<a href="${link}" target="_blank" rel="noopener noreferrer">
				Open ${plan ? plan.name : "Stripe"} checkout in a new tab
			</a>
		</div>
	`);
}

goToStripePlan = function(planId) {
	const link = stripePaymentLinks && stripePaymentLinks[planId];

	if (!link) {
		showToast("No Stripe link set for this plan");
		return false;
	}

	localStorage.setItem("creatorAcademy.pendingPlan", planId);
	localStorage.setItem("creatorAcademy.pendingPlanStartedAt", new Date().toISOString());

	const newTab = window.open(link, "_blank", "noopener,noreferrer");

	if (newTab) {
		newTab.opener = null;
		showToast("Stripe checkout opened in a new tab");

		if (typeof showPlans === "function") {
			showPlans();
		}

		return false;
	}

	showToast("New tab blocked. Use the manual Stripe link.");
	showManualStripeOpen(planId, link);
	return false;
};

// Make plan cards use the hard-patched new-tab function only.
if (typeof renderPlanCard === "function") {
	renderPlanCard = function(planId) {
		const plan = plans[planId];
		const current = getCurrentPlan() === planId;
		const pending = typeof getPendingPlan === "function" && getPendingPlan() === planId;
		const featured = planId === "pro" ? "featured" : "";
		const proplus = planId === "proplus" ? "proplus" : "";
		const ribbon =
			planId === "free" ? "" :
			planId === "proplus" ? `<div class="plan-ribbon">Highest Public</div>` :
			planId === "pro" ? `<div class="plan-ribbon">Popular</div>` :
			"";

		const buttonHtml = planId === "free"
			? `<button type="button" class="${current ? "green" : ""}" onclick="selectPlan('free'); return false;">${current ? "Current Plan" : "Select Free"}</button>`
			: `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}'); return false;">${pending ? "Resume Stripe Checkout" : "Pay with Stripe"}</button>`;

		const noteHtml = planId === "free"
			? `<div class="stripe-link-note">Free unlocks immediately.</div>`
			: `<div class="stripe-link-note">Opens Stripe-hosted checkout in a separate tab. This academy page will stay open.</div>`;

		return `
			<div class="plan-card ${featured} ${proplus}">
				${ribbon}
				<div>
					<span class="rank-badge">${plan.publicName}</span>
					<h3 class="plan-name">${plan.name}</h3>
					<div class="plan-price">${plan.price}<span>${plan.monthly}</span></div>
					<p>${plan.description}</p>
					<ul class="plan-features">
						${plan.features.map(function(feature) {
							return `<li>${feature}</li>`;
						}).join("")}
					</ul>
					${noteHtml}
				</div>

				${buttonHtml}
			</div>
		`;
	};
}

// Paid selectPlan cannot redirect the current tab either.
if (typeof selectPlan === "function") {
	const finalOriginalSelectPlan = selectPlan;

	selectPlan = function(planId) {
		if (planId === "free") {
			if (typeof clearPendingPlan === "function") clearPendingPlan();
			finalOriginalSelectPlan(planId);
			return false;
		}

		return goToStripePlan(planId);
	};
}


// ---------- Weekly Mandatory Coursework System ----------
// Static/local prototype. It uses browser memory for start dates and submissions.
// Real enforcement across devices/accounts needs a backend database.

const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

const weeklyCoursework = {
	studio: [
		{
			title: "Studio Orientation Pack",
			focus: "Interface, windows, navigation, and test habits.",
			requirements: [
				"Open Explorer, Properties, Output, and Viewport.",
				"Change three properties on a Part.",
				"Write what each main window does.",
				"Attach one screenshot of the Studio layout."
			]
		},
		{
			title: "Clean Explorer Build",
			focus: "Folder organisation, names, and service placement.",
			requirements: [
				"Create Map, Interactables, and Systems folders.",
				"Rename at least 10 objects clearly.",
				"Explain why each folder exists.",
				"Attach one screenshot of Explorer."
			]
		},
		{
			title: "Bootcamp Room Project",
			focus: "Build with parts, anchor correctly, test in Play mode.",
			requirements: [
				"Build a small training room.",
				"Use at least 10 named objects.",
				"Test in Play mode.",
				"Fix one issue found during testing."
			]
		},
		{
			title: "Services and Testing Report",
			focus: "Roblox services, Output, and debugging.",
			requirements: [
				"Use Workspace, StarterGui, ServerScriptService, and ReplicatedStorage.",
				"Create one intentional mistake.",
				"Read and explain the Output error.",
				"Fix the mistake and explain the fix."
			]
		}
	],
	lua: [
		{
			title: "Variables and Conditions Build",
			focus: "Variables, if statements, and purchase checks.",
			requirements: [
				"Create a coin/price purchase check.",
				"Test success and failure outputs.",
				"Use at least five variables.",
				"Explain the difference between = and ==."
			]
		},
		{
			title: "Part and Event System",
			focus: "Create parts, set properties, and use Touched events.",
			requirements: [
				"Create at least three parts with code.",
				"Make one touch trigger.",
				"Print hit.Name.",
				"Explain what hit represents."
			]
		},
		{
			title: "UI LocalScript Assignment",
			focus: "Player UI, LocalScripts, keyboard input, and close buttons.",
			requirements: [
				"Create a hidden UI frame.",
				"Press a key to show it.",
				"Click a button to close it.",
				"Explain why this uses a LocalScript."
			]
		},
		{
			title: "Functions, Tables, and Client/Server Report",
			focus: "Reusable code, data structures, and safe game logic.",
			requirements: [
				"Create one function with parameters.",
				"Create one table with at least four values.",
				"List three server responsibilities.",
				"List three client responsibilities."
			]
		}
	],
	blender: [
		{
			title: "Basic Controls Model",
			focus: "Move, scale, rotate, Object Mode, and Edit Mode.",
			requirements: [
				"Create a simple platform scene.",
				"Use move, scale, and rotate intentionally.",
				"Explain Object Mode vs Edit Mode.",
				"Attach a screenshot of the model."
			]
		},
		{
			title: "Simple Game Asset",
			focus: "Small usable props and game-ready modelling.",
			requirements: [
				"Create one small game asset.",
				"Use at least four shaped parts.",
				"Make a second variation.",
				"Explain what you simplified."
			]
		},
		{
			title: "Material and Style Pass",
			focus: "Main material, secondary material, and accent colour.",
			requirements: [
				"Apply a main material.",
				"Apply a secondary material.",
				"Apply one accent colour.",
				"Test or explain how it would look in Roblox Studio."
			]
		},
		{
			title: "Export-Ready Asset",
			focus: "Clean naming, sensible scale, export test, and final polish.",
			requirements: [
				"Name all objects clearly.",
				"Check scale before polish.",
				"Export or prepare an export version.",
				"Explain what changed after testing."
			]
		}
	],
	moon: [
		{
			title: "Keyframe Motion Test",
			focus: "Frame 0, middle keyframe, final keyframe.",
			requirements: [
				"Animate one object using at least three keyframes.",
				"Write the frame numbers used.",
				"Explain how the object changes across frames.",
				"Attach a screenshot or short clip if possible."
			]
		},
		{
			title: "Beginner Object Animation",
			focus: "Button press, door opening, platform movement, or panel slide.",
			requirements: [
				"Create one useful object animation.",
				"Add start and end states.",
				"Add return or anticipation movement.",
				"Explain how it would be used in a game."
			]
		},
		{
			title: "Timing and Spacing Study",
			focus: "Fast vs slow animation and motion feel.",
			requirements: [
				"Create fast and slow versions of the same motion.",
				"Compare which feels better.",
				"Explain timing changes.",
				"Fix one robotic movement."
			]
		},
		{
			title: "Character or Export Plan",
			focus: "Simple pose, naming, export/use plan, and trigger idea.",
			requirements: [
				"Create or plan one character/object animation.",
				"Name it clearly.",
				"Explain how it would be triggered.",
				"Identify one possible playback problem."
			]
		}
	]
};

function getCourseworkStartKey(pathId) {
	return "creatorAcademy.courseworkStart." + pathId;
}

function getCourseworkSubmissionKey(pathId, weekNumber) {
	return "creatorAcademy.courseworkSubmission." + pathId + ".week" + weekNumber;
}

function getCourseworkStartDate(pathId) {
	const raw = localStorage.getItem(getCourseworkStartKey(pathId));
	return raw ? new Date(raw) : null;
}

function startCourseworkTrack(pathId) {
	if (!weeklyCoursework[pathId]) return;

	if (!getCourseworkStartDate(pathId)) {
		localStorage.setItem(getCourseworkStartKey(pathId), new Date().toISOString());
	}

	showToast("Weekly coursework started");
	openCourse(pathId);
}

function resetCourseworkTrack(pathId) {
	localStorage.removeItem(getCourseworkStartKey(pathId));

	for (let i = 1; i <= (weeklyCoursework[pathId] || []).length; i++) {
		localStorage.removeItem(getCourseworkSubmissionKey(pathId, i));
	}

	showToast("Coursework reset");
	openCourse(pathId);
}

function getCourseworkWeekIndex(pathId) {
	const start = getCourseworkStartDate(pathId);
	if (!start) return 0;

	const elapsed = Date.now() - start.getTime();
	return Math.max(0, Math.floor(elapsed / millisecondsPerWeek));
}

function getWeekDate(pathId, weekIndex) {
	const start = getCourseworkStartDate(pathId);
	if (!start) return null;

	return new Date(start.getTime() + (weekIndex * millisecondsPerWeek));
}

function getWeekDueDate(pathId, weekIndex) {
	const start = getCourseworkStartDate(pathId);
	if (!start) return null;

	return new Date(start.getTime() + ((weekIndex + 1) * millisecondsPerWeek));
}

function isCourseworkSubmitted(pathId, weekNumber) {
	return Boolean(localStorage.getItem(getCourseworkSubmissionKey(pathId, weekNumber)));
}

function isCourseworkWeekTimeUnlocked(pathId, weekNumber) {
	const start = getCourseworkStartDate(pathId);
	if (!start) return false;

	const unlockTime = start.getTime() + ((weekNumber - 1) * millisecondsPerWeek);
	return Date.now() >= unlockTime;
}

function isPreviousCourseworkComplete(pathId, weekNumber) {
	if (weekNumber <= 1) return true;
	return isCourseworkSubmitted(pathId, weekNumber - 1);
}

function isCourseworkWeekUnlocked(pathId, weekNumber) {
	return isCourseworkWeekTimeUnlocked(pathId, weekNumber) && isPreviousCourseworkComplete(pathId, weekNumber);
}

function getRequiredCourseworkWeekForLesson(lessonId) {
	const lesson = lessons[lessonId];
	if (!lesson) return 1;

	const lessonList = paths[lesson.path].lessons;
	const index = lessonList.indexOf(lessonId);

	// 2 lessons per coursework week. Minimum week 1.
	return Math.max(1, Math.floor(index / 2) + 1);
}

function isCourseworkGatePassedForLesson(lessonId) {
	const lesson = lessons[lessonId];
	if (!lesson) return true;

	const pathId = lesson.path;
	const weekNumber = getRequiredCourseworkWeekForLesson(lessonId);

	if (!weeklyCoursework[pathId]) return true;

	return isCourseworkSubmitted(pathId, weekNumber);
}

function formatDate(date) {
	if (!date) return "Not started";

	return date.toLocaleDateString(undefined, {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric"
	});
}

function showCourseworkHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (!hasPlan || !hasPlan()) {
		showPlans();
		return;
	}

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Mandatory Weekly Work</span>
					<h2>Coursework Hub</h2>
					<p>Each course has timed weekly coursework. Finish the required weekly assignment to unlock the matching lesson block.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
					<button type="button" class="secondary" onclick="openSkillTree()">Skill Tree</button>
				</div>
			</div>

			<div class="week-grid">
				${Object.keys(weeklyCoursework).map(renderCourseworkCourseCard).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courseworkHub");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderCourseworkCourseCard(pathId) {
	const path = paths[pathId];
	const weeks = weeklyCoursework[pathId];
	const start = getCourseworkStartDate(pathId);
	const completeCount = weeks.filter(function(_, index) {
		return isCourseworkSubmitted(pathId, index + 1);
	}).length;

	const currentWeek = start ? Math.min(getCourseworkWeekIndex(pathId) + 1, weeks.length) : 0;

	return `
		<div class="week-card ${completeCount === weeks.length ? "complete" : start ? "current" : ""}">
			<span class="week-status">${start ? completeCount + "/" + weeks.length + " Submitted" : "Not Started"}</span>
			<h3>${path ? path.title : pathId}</h3>
			<p>${path ? path.description : ""}</p>
			<p class="week-due">Current week: ${start ? "Week " + currentWeek : "Not started"}</p>
			<div class="coursework-mini-progress">
				${weeks.map(function(_, index) {
					const week = index + 1;
					const complete = isCourseworkSubmitted(pathId, week);
					const unlocked = isCourseworkWeekUnlocked(pathId, week);
					return `<span class="week-dot ${complete ? "complete" : unlocked ? "current" : "locked"}">${week}</span>`;
				}).join("")}
			</div>
			<div class="actions">
				<button type="button" onclick="${start ? "openCourseworkCourse('" + pathId + "')" : "startCourseworkTrack('" + pathId + "')"}">${start ? "Open Coursework" : "Start Weekly Track"}</button>
				${start ? `<button type="button" class="secondary" onclick="resetCourseworkTrack('${pathId}')">Reset</button>` : ""}
			</div>
		</div>
	`;
}

function openCourseworkCourse(pathId) {
	const weeks = weeklyCoursework[pathId];

	if (!weeks) {
		showToast("No coursework for this course yet");
		return;
	}

	if (!getCourseworkStartDate(pathId)) {
		startCourseworkTrack(pathId);
		return;
	}

	const path = paths[pathId];

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Weekly Coursework</span>
					<h2>${path.title} Coursework</h2>
					<p>Timed weekly assignments for this course. Future weeks unlock every 7 days and previous coursework must be submitted first.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showCourseworkHub()">All Coursework</button>
					<button type="button" class="secondary" onclick="openCourse('${pathId}')">Course Tree</button>
				</div>
			</div>

			<div class="coursework-status-panel">
				<h3>Schedule</h3>
				<p>Started: <strong>${formatDate(getCourseworkStartDate(pathId))}</strong></p>
				<p>Each week unlocks 7 days after the previous week. This keeps the bootcamp paced instead of rushed.</p>
			</div>

			<div class="week-grid">
				${weeks.map(function(week, index) {
					return renderCourseworkWeekCard(pathId, index + 1, week);
				}).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courseworkCourse");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderCourseworkWeekCard(pathId, weekNumber, week) {
	const submitted = isCourseworkSubmitted(pathId, weekNumber);
	const unlocked = isCourseworkWeekUnlocked(pathId, weekNumber);
	const timeUnlocked = isCourseworkWeekTimeUnlocked(pathId, weekNumber);
	const previousComplete = isPreviousCourseworkComplete(pathId, weekNumber);
	const unlockDate = getWeekDate(pathId, weekNumber - 1);
	const dueDate = getWeekDueDate(pathId, weekNumber - 1);

	let status = "Locked";
	let className = "locked";

	if (submitted) {
		status = "Submitted";
		className = "complete";
	} else if (unlocked) {
		status = "Current";
		className = "current";
	}

	const lockReason = !timeUnlocked
		? "Unlocks on " + formatDate(unlockDate)
		: !previousComplete
			? "Submit previous week first"
			: "";

	return `
		<div class="week-card ${className}">
			<span class="week-status">${status}</span>
			<h3>Week ${weekNumber}: ${week.title}</h3>
			<p>${week.focus}</p>
			<ul>
				${week.requirements.map(function(req) { return `<li>${req}</li>`; }).join("")}
			</ul>
			<p class="week-due">Due: ${formatDate(dueDate)}</p>
			${lockReason ? `<p class="plan-lock-note">${lockReason}</p>` : ""}
			<div class="actions">
				<button type="button" ${unlocked || submitted ? "" : "disabled"} onclick="openCourseworkSubmission('${pathId}', ${weekNumber})">
					${submitted ? "Review Submission" : "Open Assignment"}
				</button>
			</div>
		</div>
	`;
}

function openCourseworkSubmission(pathId, weekNumber) {
	const week = weeklyCoursework[pathId][weekNumber - 1];

	if (!isCourseworkWeekUnlocked(pathId, weekNumber) && !isCourseworkSubmitted(pathId, weekNumber)) {
		showToast("This coursework week is locked");
		openCourseworkCourse(pathId);
		return;
	}

	const submittedRaw = localStorage.getItem(getCourseworkSubmissionKey(pathId, weekNumber));
	const submitted = submittedRaw ? JSON.parse(submittedRaw) : null;
	const dueDate = getWeekDueDate(pathId, weekNumber - 1);

	app.innerHTML = `
		<section class="panel">
			<div class="coursework-submit-panel">
				<div class="course-header">
					<div>
						<span class="badge">Mandatory Coursework</span>
						<h2>${paths[pathId].title} — Week ${weekNumber}</h2>
						<p>${week.title}: ${week.focus}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="openCourseworkCourse('${pathId}')">Back to Weeks</button>
						<button type="button" class="secondary" onclick="openCourse('${pathId}')">Course Tree</button>
					</div>
				</div>

				<div class="coursework-meta-grid">
					<div class="coursework-meta-card">
						<span>Due Date</span>
						<strong>${formatDate(dueDate)}</strong>
					</div>
					<div class="coursework-meta-card">
						<span>Status</span>
						<strong>${submitted ? "Submitted" : "Required"}</strong>
					</div>
					<div class="coursework-meta-card">
						<span>Minimum Evidence</span>
						<strong>90 words</strong>
					</div>
				</div>

				<div class="lesson-block">
					<h3>Requirements</h3>
					<ul>
						${week.requirements.map(function(req) { return `<li>${req}</li>`; }).join("")}
					</ul>
				</div>

				${submitted ? renderSubmittedCoursework(submitted) : renderCourseworkSubmitForm(pathId, weekNumber)}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courseworkSubmit");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderSubmittedCoursework(submitted) {
	return `
		<div class="lesson-block practical-lab">
			<h3>Submitted Work</h3>
			<p><strong>Submitted:</strong> ${formatDate(new Date(submitted.submittedAt))}</p>
			<p><strong>Evidence words:</strong> ${submitted.wordCount}</p>
			<p><strong>File attached:</strong> ${submitted.fileName || "No file recorded"}</p>
			<div class="media-placeholder">${escapeHtml(submitted.evidence)}</div>
			<div class="actions">
				<button type="button" class="secondary" onclick="deleteCourseworkSubmission('${submitted.pathId}', ${submitted.weekNumber})">Delete Submission</button>
			</div>
		</div>
	`;
}

function renderCourseworkSubmitForm(pathId, weekNumber) {
	return `
		<div class="coursework-checklist">
			<label class="coursework-check">
				<input type="checkbox" id="cwBuildCheck">
				<span>I completed the required build/task for this week.</span>
			</label>

			<label class="coursework-check">
				<input type="checkbox" id="cwDebugCheck">
				<span>I tested/debugged the work and fixed or explained one issue.</span>
			</label>

			<label class="coursework-check">
				<input type="checkbox" id="cwReflectCheck">
				<span>I can explain what I learned and what I would improve next.</span>
			</label>
		</div>

		<div class="coursework-file-box">
			<label for="cwFile"><strong>Attach proof file</strong></label>
			<p>Screenshot, image, or video proof. Static version only records that a file was selected.</p>
			<input id="cwFile" type="file" accept="image/*,video/*">
		</div>

		<h3>Written Evidence</h3>
		<p>Write at least 90 words. Explain what you built, what broke, how you fixed it, and what worked by the end.</p>
		<textarea id="cwEvidence" class="coursework-textarea" placeholder="Write proper coursework evidence here..."></textarea>

		<div id="cwWarning" class="coursework-warning hidden"></div>

		<div class="actions">
			<button type="button" class="green" onclick="submitCoursework('${pathId}', ${weekNumber})">Submit Weekly Coursework</button>
		</div>
	`;
}

function submitCoursework(pathId, weekNumber) {
	const buildCheck = document.getElementById("cwBuildCheck");
	const debugCheck = document.getElementById("cwDebugCheck");
	const reflectCheck = document.getElementById("cwReflectCheck");
	const file = document.getElementById("cwFile");
	const evidence = document.getElementById("cwEvidence");
	const warning = document.getElementById("cwWarning");

	const evidenceText = evidence ? evidence.value.trim() : "";
	const wordCount = typeof countWords === "function" ? countWords(evidenceText) : evidenceText.split(/\s+/).filter(Boolean).length;
	const uniqueWords = typeof countUniqueWords === "function" ? countUniqueWords(evidenceText) : new Set(evidenceText.toLowerCase().split(/\s+/)).size;
	const spam = typeof hasSpamPattern === "function" ? hasSpamPattern(evidenceText) : false;

	const problems = [];

	if (!buildCheck.checked) problems.push("Tick that the weekly build/task was completed.");
	if (!debugCheck.checked) problems.push("Tick that testing/debugging was completed.");
	if (!reflectCheck.checked) problems.push("Tick that reflection was completed.");
	if (!file.files || file.files.length === 0) problems.push("Attach at least one screenshot/image/video proof file.");
	if (wordCount < 90) problems.push("Written evidence must be at least 90 words.");
	if (uniqueWords < 35) problems.push("Evidence needs at least 35 unique meaningful words.");
	if (spam) problems.push("Evidence looks repetitive/spam-like. Write real explanation.");

	if (problems.length > 0) {
		warning.classList.remove("hidden");
		warning.innerHTML = "<strong>Coursework cannot be submitted yet:</strong><ul>" + problems.map(function(p) { return "<li>" + p + "</li>"; }).join("") + "</ul>";
		return;
	}

	const submission = {
		pathId: pathId,
		weekNumber: weekNumber,
		submittedAt: new Date().toISOString(),
		evidence: evidenceText,
		wordCount: wordCount,
		uniqueWords: uniqueWords,
		fileName: file.files[0] ? file.files[0].name : ""
	};

	localStorage.setItem(getCourseworkSubmissionKey(pathId, weekNumber), JSON.stringify(submission));

	if (typeof addAdminLog === "function") {
		addAdminLog("Submitted weekly coursework: " + paths[pathId].title + " week " + weekNumber);
	}

	showToast("Weekly coursework submitted");
	openCourseworkCourse(pathId);
}

function deleteCourseworkSubmission(pathId, weekNumber) {
	localStorage.removeItem(getCourseworkSubmissionKey(pathId, weekNumber));
	showToast("Coursework submission deleted");
	openCourseworkSubmission(pathId, weekNumber);
}

// Patch course page to show coursework status.
const courseworkOriginalOpenCourse = openCourse;
openCourse = function(pathId) {
	courseworkOriginalOpenCourse(pathId);

	if (!weeklyCoursework[pathId]) return;

	const panel = app.querySelector(".course-map-panel, .panel");
	if (!panel || panel.querySelector(".coursework-status-panel")) return;

	const start = getCourseworkStartDate(pathId);
	const currentWeek = start ? Math.min(getCourseworkWeekIndex(pathId) + 1, weeklyCoursework[pathId].length) : 0;
	const submittedCount = weeklyCoursework[pathId].filter(function(_, index) {
		return isCourseworkSubmitted(pathId, index + 1);
	}).length;

	panel.insertAdjacentHTML("afterbegin", `
		<div class="coursework-status-panel">
			<h3>Mandatory Weekly Coursework</h3>
			<p>${start ? "Current week: Week " + currentWeek + ". Submitted: " + submittedCount + "/" + weeklyCoursework[pathId].length + "." : "Weekly coursework has not started for this course yet."}</p>
			<div class="coursework-mini-progress">
				${weeklyCoursework[pathId].map(function(_, index) {
					const week = index + 1;
					const complete = isCourseworkSubmitted(pathId, week);
					const unlocked = start && isCourseworkWeekUnlocked(pathId, week);
					return `<span class="week-dot ${complete ? "complete" : unlocked ? "current" : "locked"}">${week}</span>`;
				}).join("")}
			</div>
			<div class="actions">
				<button type="button" onclick="${start ? "openCourseworkCourse('" + pathId + "')" : "startCourseworkTrack('" + pathId + "')"}">${start ? "Open Weekly Coursework" : "Start Weekly Coursework"}</button>
			</div>
		</div>
	`);
};

// Patch lesson opening so coursework becomes mandatory.
const courseworkOriginalOpenLesson = openLesson;
openLesson = function(lessonId) {
	const lesson = lessons[lessonId];

	if (lesson && weeklyCoursework[lesson.path]) {
		const pathId = lesson.path;
		const requiredWeek = getRequiredCourseworkWeekForLesson(lessonId);

		if (!getCourseworkStartDate(pathId)) {
			app.innerHTML = `
				<section class="panel">
					<div class="course-header">
						<div>
							<span class="badge">Coursework Required</span>
							<h2>Start Weekly Coursework</h2>
							<p>This course has mandatory timed weekly coursework. Start the weekly track before opening lessons.</p>
						</div>
						<div class="actions">
							<button type="button" onclick="startCourseworkTrack('${pathId}')">Start Weekly Track</button>
							<button type="button" class="secondary" onclick="openCourse('${pathId}')">Back to Course</button>
						</div>
					</div>
				</section>
			`;
			return;
		}

		if (!isCourseworkSubmitted(pathId, requiredWeek)) {
			app.innerHTML = `
				<section class="panel">
					<div class="course-header">
						<div>
							<span class="badge">Coursework Required</span>
							<h2>Week ${requiredWeek} Coursework Required</h2>
							<p>This lesson is locked until Week ${requiredWeek} coursework is submitted.</p>
						</div>
						<div class="actions">
							<button type="button" onclick="openCourseworkCourse('${pathId}')">Open Coursework</button>
							<button type="button" class="secondary" onclick="openCourse('${pathId}')">Back to Course</button>
						</div>
					</div>

					<div class="coursework-lock-banner">
						Coursework is mandatory and timed per week. Future weeks unlock every 7 days, and the previous week must be submitted before the next week can be used.
					</div>
				</section>
			`;
			return;
		}
	}

	courseworkOriginalOpenLesson(lessonId);
};

// Patch render skill node so coursework requirement is visible.
const courseworkOriginalRenderSkillNode = renderSkillNode;
renderSkillNode = function(lessonId) {
	let html = courseworkOriginalRenderSkillNode(lessonId);
	const lesson = lessons[lessonId];

	if (!lesson || !weeklyCoursework[lesson.path]) return html;

	const week = getRequiredCourseworkWeekForLesson(lessonId);
	const passed = isCourseworkSubmitted(lesson.path, week);

	return html.replace(
		"</button>",
		`<p class="plan-lock-note">Coursework: Week ${week} ${passed ? "submitted" : "required"}</p></button>`
	);
};

// Add admin coursework tools if admin exists.
if (typeof renderAdminOverview === "function") {
	const courseworkOriginalRenderAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = courseworkOriginalRenderAdminOverview();
		const card = `
			<div class="admin-card">
				<h3>Weekly Coursework Control</h3>
				<p>Start, reset, or force-submit weekly coursework for testing.</p>
				<div class="actions">
					<button type="button" onclick="showCourseworkHub()">Open Coursework Hub</button>
					<button type="button" class="secondary" onclick="adminForceSubmitCurrentWeeks()">Force Submit Current Weeks</button>
					<button type="button" class="red" onclick="adminResetAllCoursework()">Reset All Coursework</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${card}`);
	};
}

function adminForceSubmitCurrentWeeks() {
	Object.keys(weeklyCoursework).forEach(function(pathId) {
		if (!getCourseworkStartDate(pathId)) {
			localStorage.setItem(getCourseworkStartKey(pathId), new Date().toISOString());
		}

		const currentWeek = Math.min(getCourseworkWeekIndex(pathId) + 1, weeklyCoursework[pathId].length);

		for (let week = 1; week <= currentWeek; week++) {
			if (!isCourseworkSubmitted(pathId, week)) {
				localStorage.setItem(getCourseworkSubmissionKey(pathId, week), JSON.stringify({
					pathId: pathId,
					weekNumber: week,
					submittedAt: new Date().toISOString(),
					evidence: "Admin forced coursework submission for testing unlock flow.",
					wordCount: 8,
					uniqueWords: 8,
					fileName: "admin-test"
				}));
			}
		}
	});

	showToast("Current coursework weeks force-submitted");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

function adminResetAllCoursework() {
	Object.keys(weeklyCoursework).forEach(function(pathId) {
		resetCourseworkTrack(pathId);
	});

	showToast("All coursework reset");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

// Patch topbar nav if needed.
(function addCourseworkNavSafety() {
	const nav = document.querySelector(".nav-actions");
	if (nav && !Array.from(nav.querySelectorAll("button")).some(function(btn) { return btn.textContent.trim() === "Coursework"; })) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = "Coursework";
		btn.onclick = showCourseworkHub;
		nav.insertBefore(btn, nav.lastElementChild);
	}
})();


// ---------- 5-Week Exam System ----------
// Exams unlock every 5 weeks after a course's weekly coursework track starts.
// Static/local prototype. Real exam security needs accounts, backend timing, and server validation.

const examIntervalWeeks = 5;
const examDurationMinutes = 45;
const examPassScore = 70;

const courseExamBanks = {
	studio: {
		title: "Roblox Studio Basics Exam",
		focus: "Studio interface, Explorer organisation, Properties, services, testing, and bootcamp project readiness.",
		questions: [
			{
				q: "Which Roblox Studio window shows object hierarchy?",
				options: ["Explorer", "Output", "Toolbox", "Material Manager"],
				answer: "Explorer"
			},
			{
				q: "Which window shows settings like Anchored, Transparency, and CanCollide?",
				options: ["Properties", "Explorer", "Chat", "Asset Manager"],
				answer: "Properties"
			},
			{
				q: "Where do normal 3D world objects usually belong?",
				options: ["Workspace", "StarterGui", "Lighting", "Output"],
				answer: "Workspace"
			},
			{
				q: "What does Anchored do?",
				options: ["Stops a part falling/moving from physics", "Deletes the part", "Makes UI visible", "Changes account password"],
				answer: "Stops a part falling/moving from physics"
			},
			{
				q: "Why should objects be named clearly?",
				options: ["To make the project readable and easier to script", "To make them invisible", "To stop Play mode", "To remove collisions"],
				answer: "To make the project readable and easier to script"
			}
		],
		writtenPrompt: "Explain how you would organise a small Roblox training room in Explorer. Mention at least four services/folders, why names matter, how you would test it, and one mistake you would check in Output."
	},
	lua: {
		title: "Roblox Lua Exam",
		focus: "Variables, conditions, parts, events, UI LocalScripts, functions, tables, and client/server basics.",
		questions: [
			{
				q: "What does a single equals sign do in Lua?",
				options: ["Assigns/stores a value", "Checks equality", "Creates a service", "Runs Play mode"],
				answer: "Assigns/stores a value"
			},
			{
				q: "What does == do?",
				options: ["Compares two values", "Creates a Part", "Deletes Workspace", "Makes UI visible"],
				answer: "Compares two values"
			},
			{
				q: "What does Instance.new(\"Part\") do?",
				options: ["Creates a new Part object", "Deletes a player", "Starts Stripe", "Closes Studio"],
				answer: "Creates a new Part object"
			},
			{
				q: "In a Touched event, what is hit usually?",
				options: ["The object/body part that touched", "The server owner", "A Stripe plan", "A CSS class"],
				answer: "The object/body part that touched"
			},
			{
				q: "Which script type is usually best for player screen UI?",
				options: ["LocalScript", "Server Script only", "Plain text file", "ImageLabel"],
				answer: "LocalScript"
			}
		],
		writtenPrompt: "Explain how you would make a simple tycoon button in Roblox Lua. Mention variables, price checking, parts/properties, Touched event, server/client responsibility, and one bug you would test."
	},
	blender: {
		title: "Blender Exam",
		focus: "Navigation, simple assets, materials, clean modelling workflow, scale, naming, and Roblox export readiness.",
		questions: [
			{
				q: "Which mode edits the actual mesh shape?",
				options: ["Edit Mode", "Object Mode", "Play Mode", "Explorer Mode"],
				answer: "Edit Mode"
			},
			{
				q: "Why should beginners start with small props?",
				options: ["They are easier to finish and test", "They cannot be exported", "They remove materials", "They stop learning"],
				answer: "They are easier to finish and test"
			},
			{
				q: "Why test a model inside Roblox Studio?",
				options: ["To check scale and usability", "To turn it into Lua", "To delete all geometry", "To make a payment link"],
				answer: "To check scale and usability"
			},
			{
				q: "What is a clean material rule for beginner assets?",
				options: ["Main, secondary, and accent material", "Use every colour possible", "Never use materials", "Only use invisible surfaces"],
				answer: "Main, secondary, and accent material"
			},
			{
				q: "What should happen before tiny details?",
				options: ["Blockout and scale check", "Final render only", "Random polish", "No testing"],
				answer: "Blockout and scale check"
			}
		],
		writtenPrompt: "Explain how you would create a Roblox-ready Blender asset. Mention blockout, naming, materials, scale testing, export readiness, and one issue you would fix before final polish."
	},
	moon: {
		title: "Moon Animator Exam",
		focus: "Keyframes, beginner object animations, timing, spacing, character pose basics, and export/use planning.",
		questions: [
			{
				q: "What does a keyframe store?",
				options: ["A position or pose at a specific time", "A bank account", "A script service", "A Roblox username only"],
				answer: "A position or pose at a specific time"
			},
			{
				q: "What is usually a good first Moon Animator project?",
				options: ["Button press", "Full perfect walk cycle", "Huge movie cutscene", "Advanced combat system"],
				answer: "Button press"
			},
			{
				q: "What does timing control?",
				options: ["How long movement takes", "The object name only", "The player's password", "The file size only"],
				answer: "How long movement takes"
			},
			{
				q: "Why is a walk cycle harder than a button animation?",
				options: ["It needs timing, body weight, and a smooth loop", "It uses no keyframes", "It cannot be animated", "It is just one frame"],
				answer: "It needs timing, body weight, and a smooth loop"
			},
			{
				q: "Why should animations be named clearly?",
				options: ["So they are easier to trigger/use later", "So they disappear", "So they become images", "So they stop playback"],
				answer: "So they are easier to trigger/use later"
			}
		],
		writtenPrompt: "Explain how you would make and use a simple Roblox animation. Mention keyframes, timing, object or character movement, naming, trigger idea, and one playback problem you would test."
	}
};

function getExamKey(pathId, examNumber) {
	return "creatorAcademy.examResult." + pathId + ".exam" + examNumber;
}

function getExamAttemptKey(pathId, examNumber) {
	return "creatorAcademy.examAttempt." + pathId + ".exam" + examNumber;
}

function getExamUnlockDate(pathId, examNumber) {
	const start = typeof getCourseworkStartDate === "function" ? getCourseworkStartDate(pathId) : null;
	if (!start) return null;

	return new Date(start.getTime() + ((examNumber * examIntervalWeeks - 1) * millisecondsPerWeek));
}

function getExamDueDate(pathId, examNumber) {
	const unlock = getExamUnlockDate(pathId, examNumber);
	if (!unlock) return null;

	return new Date(unlock.getTime() + millisecondsPerWeek);
}

function isExamTimeUnlocked(pathId, examNumber) {
	const unlock = getExamUnlockDate(pathId, examNumber);
	return unlock ? Date.now() >= unlock.getTime() : false;
}

function getPassedExam(pathId, examNumber) {
	const raw = localStorage.getItem(getExamKey(pathId, examNumber));
	return raw ? JSON.parse(raw) : null;
}

function isExamPassed(pathId, examNumber) {
	const result = getPassedExam(pathId, examNumber);
	return Boolean(result && result.passed);
}

function getExamAttempt(pathId, examNumber) {
	const raw = localStorage.getItem(getExamAttemptKey(pathId, examNumber));
	return raw ? JSON.parse(raw) : null;
}

function startExamAttempt(pathId, examNumber) {
	const key = getExamAttemptKey(pathId, examNumber);
	let attempt = getExamAttempt(pathId, examNumber);

	if (!attempt) {
		attempt = {
			startedAt: new Date().toISOString(),
			pathId: pathId,
			examNumber: examNumber
		};
		localStorage.setItem(key, JSON.stringify(attempt));
	}

	return attempt;
}

function getExamTimeRemainingMs(pathId, examNumber) {
	const attempt = getExamAttempt(pathId, examNumber);
	if (!attempt) return examDurationMinutes * 60 * 1000;

	const started = new Date(attempt.startedAt).getTime();
	const deadline = started + (examDurationMinutes * 60 * 1000);
	return Math.max(0, deadline - Date.now());
}

function isExamExpired(pathId, examNumber) {
	return getExamTimeRemainingMs(pathId, examNumber) <= 0;
}

function formatTime(ms) {
	const totalSeconds = Math.ceil(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function getExamStatus(pathId, examNumber) {
	if (isExamPassed(pathId, examNumber)) return "passed";
	if (!getCourseworkStartDate(pathId)) return "not-started";
	if (!isExamTimeUnlocked(pathId, examNumber)) return "locked-time";

	const requiredCourseworkWeek = examNumber * examIntervalWeeks - 1;

	// Because the current bootcamp has 4 coursework weeks per course, Exam 1 requires weeks 1-4.
	// Future exams require all available previous coursework plus previous exam.
	const courseWeeks = weeklyCoursework[pathId] || [];
	const requiredWeeks = Math.min(requiredCourseworkWeek, courseWeeks.length);

	for (let i = 1; i <= requiredWeeks; i++) {
		if (!isCourseworkSubmitted(pathId, i)) return "locked-coursework";
	}

	if (examNumber > 1 && !isExamPassed(pathId, examNumber - 1)) return "locked-previous-exam";

	const existing = getPassedExam(pathId, examNumber);
	if (existing && !existing.passed) return "failed";

	return "available";
}

function showExamHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showPlans();
		return;
	}

	app.innerHTML = `
		<section class="panel exam-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Mandatory Exams</span>
					<h2>5-Week Exam Hub</h2>
					<p>Every course gets a formal exam every 5 weeks. Exams are timed, scored, and require written reasoning.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
					<button type="button" class="secondary" onclick="showCourseworkHub()">Coursework</button>
				</div>
			</div>

			<div class="exam-cycle-banner">
				<strong>Exam cycle:</strong> Week 5, Week 10, Week 15, and so on. 
				Current prototype includes the first three exam milestones for each course.
				Week 5 Exam requires previous coursework to be submitted first.
			</div>

			<div class="exam-grid">
				${Object.keys(courseExamBanks).map(renderExamCourseCard).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("examHub");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderExamCourseCard(pathId) {
	const path = paths[pathId];
	const start = typeof getCourseworkStartDate === "function" ? getCourseworkStartDate(pathId) : null;

	let passedCount = 0;
	for (let i = 1; i <= 3; i++) {
		if (isExamPassed(pathId, i)) passedCount++;
	}

	return `
		<div class="exam-card ${start ? "available" : "locked"}">
			<span class="exam-status">${start ? passedCount + "/3 Passed" : "Coursework Not Started"}</span>
			<h3>${path ? path.title : pathId}</h3>
			<p>${courseExamBanks[pathId].focus}</p>

			<div class="exam-mini-progress">
				${[1, 2, 3].map(function(examNumber) {
					const status = getExamStatus(pathId, examNumber);
					return `<span class="exam-dot ${status === "passed" ? "passed" : status === "available" || status === "failed" ? "available" : "locked"}">W${examNumber * 5}</span>`;
				}).join("")}
			</div>

			<div class="actions">
				<button type="button" ${start ? "" : "disabled"} onclick="openCourseExams('${pathId}')">${start ? "Open Exams" : "Start Coursework First"}</button>
			</div>
		</div>
	`;
}

function openCourseExams(pathId) {
	if (!courseExamBanks[pathId]) {
		showToast("No exams for this course yet");
		return;
	}

	if (!getCourseworkStartDate(pathId)) {
		app.innerHTML = `
			<section class="panel">
				<div class="course-header">
					<div>
						<span class="badge">Coursework Required</span>
						<h2>Start Coursework First</h2>
						<p>Exams unlock based on the weekly coursework start date. Start the course coursework track first.</p>
					</div>
					<div class="actions">
						<button type="button" onclick="startCourseworkTrack('${pathId}')">Start Coursework</button>
						<button type="button" class="secondary" onclick="showExamHub()">Back to Exams</button>
					</div>
				</div>
			</section>
		`;
		return;
	}

	const bank = courseExamBanks[pathId];
	const path = paths[pathId];

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">5-Week Exams</span>
					<h2>${path.title} Exams</h2>
					<p>${bank.focus}</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showExamHub()">All Exams</button>
					<button type="button" class="secondary" onclick="openCourse('${pathId}')">Course Tree</button>
				</div>
			</div>

			<div class="coursework-status-panel">
				<h3>Exam Schedule</h3>
				<p>Coursework started: <strong>${formatDate(getCourseworkStartDate(pathId))}</strong></p>
				<p>Exams unlock every 5 weeks and require the previous coursework/exam gates to be complete.</p>
			</div>

			<div class="exam-grid">
				${[1, 2, 3].map(function(examNumber) {
					return renderExamCard(pathId, examNumber);
				}).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courseExams");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderExamCard(pathId, examNumber) {
	const status = getExamStatus(pathId, examNumber);
	const result = getPassedExam(pathId, examNumber);
	const unlockDate = getExamUnlockDate(pathId, examNumber);
	const dueDate = getExamDueDate(pathId, examNumber);

	let label = "Locked";
	let className = "locked";
	let reason = "";

	if (status === "passed") {
		label = "Passed";
		className = "passed";
	} else if (status === "failed") {
		label = "Retake Available";
		className = "failed";
	} else if (status === "available") {
		label = "Available";
		className = "available";
	} else if (status === "locked-time") {
		reason = "Unlocks on " + formatDate(unlockDate);
	} else if (status === "locked-coursework") {
		reason = "Submit required weekly coursework first";
	} else if (status === "locked-previous-exam") {
		reason = "Pass previous exam first";
	} else if (status === "not-started") {
		reason = "Start coursework first";
	}

	return `
		<div class="exam-card ${className}">
			<span class="exam-status">${label}</span>
			<h3>Week ${examNumber * 5} Exam</h3>
			<p>${courseExamBanks[pathId].title}</p>

			<div class="exam-meta-row">
				<span class="exam-pill">${examDurationMinutes} min</span>
				<span class="exam-pill">${examPassScore}% pass</span>
				<span class="exam-pill">Written answer required</span>
			</div>

			<p class="exam-required">Unlock: ${formatDate(unlockDate)}</p>
			<p class="exam-required">Due: ${formatDate(dueDate)}</p>
			${result ? `<p>Last score: <strong>${result.score}%</strong></p>` : ""}
			${reason ? `<p class="plan-lock-note">${reason}</p>` : ""}

			<div class="actions">
				<button type="button" ${status === "available" || status === "failed" || status === "passed" ? "" : "disabled"} onclick="openExam('${pathId}', ${examNumber})">
					${status === "passed" ? "Review Exam" : status === "failed" ? "Retake Exam" : "Start Exam"}
				</button>
			</div>
		</div>
	`;
}

function openExam(pathId, examNumber) {
	const status = getExamStatus(pathId, examNumber);

	if (!(status === "available" || status === "failed" || status === "passed")) {
		showToast("Exam is locked");
		openCourseExams(pathId);
		return;
	}

	const existing = getPassedExam(pathId, examNumber);
	if (existing && existing.passed) {
		showExamReview(pathId, examNumber, existing);
		return;
	}

	startExamAttempt(pathId, examNumber);
	renderExamAttempt(pathId, examNumber);
}

function renderExamAttempt(pathId, examNumber) {
	const bank = courseExamBanks[pathId];
	const remaining = getExamTimeRemainingMs(pathId, examNumber);

	app.innerHTML = `
		<section class="panel">
			<div class="exam-panel">
				<div class="course-header">
					<div>
						<span class="badge">Timed Exam</span>
						<h2>${bank.title} — Week ${examNumber * 5}</h2>
						<p>${bank.focus}</p>
						<div class="exam-timer">Time left: <span id="examTimer">${formatTime(remaining)}</span></div>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="openCourseExams('${pathId}')">Exit Exam</button>
					</div>
				</div>

				<div class="exam-cycle-banner">
					Do not rush. You need ${examPassScore}% or higher, plus a proper written answer with at least 120 words.
				</div>

				${bank.questions.map(function(question, index) {
					return `
						<div class="exam-question">
							<h4>Question ${index + 1}: ${question.q}</h4>
							${question.options.map(function(option) {
								return `
									<label class="exam-option">
										<input type="radio" name="examQ${index}" value="${escapeAttribute(option)}">
										${option}
									</label>
								`;
							}).join("")}
						</div>
					`;
				}).join("")}

				<div class="exam-question">
					<h4>Written Reasoning</h4>
					<p>${bank.writtenPrompt}</p>
					<textarea id="examWritten" class="exam-written" placeholder="Write at least 120 words. Explain your reasoning properly."></textarea>
				</div>

				<div id="examWarning" class="exam-warning hidden"></div>

				<div class="actions">
					<button type="button" class="green" onclick="submitExam('${pathId}', ${examNumber})">Submit Exam</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("examAttempt");
	if (typeof forceAddExitRow === "function") forceAddExitRow();

	startExamTimer(pathId, examNumber);
}

let activeExamTimer = null;

function startExamTimer(pathId, examNumber) {
	if (activeExamTimer) clearInterval(activeExamTimer);

	activeExamTimer = setInterval(function() {
		const timer = document.getElementById("examTimer");
		if (!timer) {
			clearInterval(activeExamTimer);
			return;
		}

		const remaining = getExamTimeRemainingMs(pathId, examNumber);
		timer.textContent = formatTime(remaining);

		if (remaining <= 0) {
			clearInterval(activeExamTimer);
			const warning = document.getElementById("examWarning");
			if (warning) {
				warning.classList.remove("hidden");
				warning.innerHTML = "<strong>Time expired.</strong> Submit now or exit and retake later.";
			}
		}
	}, 1000);
}

function submitExam(pathId, examNumber) {
	const bank = courseExamBanks[pathId];
	const warning = document.getElementById("examWarning");
	const problems = [];

	let correct = 0;

	bank.questions.forEach(function(question, index) {
		const selected = document.querySelector(`input[name="examQ${index}"]:checked`);

		if (!selected) {
			problems.push("Answer question " + (index + 1) + ".");
			return;
		}

		if (selected.value === question.answer) correct++;
	});

	const written = document.getElementById("examWritten");
	const writtenText = written ? written.value.trim() : "";
	const wordCount = typeof countWords === "function" ? countWords(writtenText) : writtenText.split(/\s+/).filter(Boolean).length;
	const uniqueWords = typeof countUniqueWords === "function" ? countUniqueWords(writtenText) : new Set(writtenText.toLowerCase().split(/\s+/)).size;
	const spam = typeof hasSpamPattern === "function" ? hasSpamPattern(writtenText) : false;

	if (wordCount < 120) problems.push("Written answer must be at least 120 words.");
	if (uniqueWords < 45) problems.push("Written answer needs at least 45 unique meaningful words.");
	if (spam) problems.push("Written answer looks repetitive/spam-like.");

	if (problems.length > 0) {
		warning.classList.remove("hidden");
		warning.innerHTML = "<strong>Exam cannot be submitted yet:</strong><ul>" + problems.map(function(problem) {
			return "<li>" + problem + "</li>";
		}).join("") + "</ul>";
		return;
	}

	const score = Math.round((correct / bank.questions.length) * 100);
	const passed = score >= examPassScore;

	const result = {
		pathId: pathId,
		examNumber: examNumber,
		submittedAt: new Date().toISOString(),
		score: score,
		correct: correct,
		total: bank.questions.length,
		passed: passed,
		written: writtenText,
		wordCount: wordCount,
		uniqueWords: uniqueWords,
		expiredAtSubmit: isExamExpired(pathId, examNumber)
	};

	localStorage.setItem(getExamKey(pathId, examNumber), JSON.stringify(result));
	localStorage.removeItem(getExamAttemptKey(pathId, examNumber));

	if (typeof addAdminLog === "function") {
		addAdminLog("Exam submitted: " + paths[pathId].title + " Week " + (examNumber * 5) + " score " + score + "%");
	}

	showExamReview(pathId, examNumber, result);
}

function showExamReview(pathId, examNumber, result) {
	app.innerHTML = `
		<section class="panel">
			<div class="exam-panel">
				<div class="course-header">
					<div>
						<span class="badge">Exam Result</span>
						<h2>${courseExamBanks[pathId].title} — Week ${examNumber * 5}</h2>
						<p>Submitted: ${formatDate(new Date(result.submittedAt))}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="openCourseExams('${pathId}')">Back to Exams</button>
						<button type="button" class="secondary" onclick="openCourse('${pathId}')">Course Tree</button>
					</div>
				</div>

				<div class="exam-result ${result.passed ? "" : "failed"}">
					<h3>${result.passed ? "Passed" : "Failed"}</h3>
					<p><strong>Score:</strong> ${result.score}% (${result.correct}/${result.total})</p>
					<p><strong>Written words:</strong> ${result.wordCount}</p>
					<p><strong>Unique words:</strong> ${result.uniqueWords}</p>
					<p>${result.passed ? "This exam gate is complete." : "Retake the exam to pass this gate."}</p>
				</div>

				<div class="lesson-block">
					<h3>Written Answer</h3>
					<p>${escapeHtml(result.written)}</p>
				</div>

				${result.passed ? "" : `<div class="actions"><button type="button" onclick="deleteExamResult('${pathId}', ${examNumber}); openExam('${pathId}', ${examNumber});">Retake Exam</button></div>`}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("examReview");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function deleteExamResult(pathId, examNumber) {
	localStorage.removeItem(getExamKey(pathId, examNumber));
	localStorage.removeItem(getExamAttemptKey(pathId, examNumber));
	showToast("Exam result deleted");
}

// Patch course pages to show exam status.
const examsOriginalOpenCourse = openCourse;
openCourse = function(pathId) {
	examsOriginalOpenCourse(pathId);

	if (!courseExamBanks[pathId]) return;

	const panel = app.querySelector(".course-map-panel, .panel");
	if (!panel || panel.querySelector(".exam-course-status-panel")) return;

	panel.insertAdjacentHTML("afterbegin", `
		<div class="coursework-status-panel exam-course-status-panel">
			<h3>5-Week Exams</h3>
			<p>Formal exams unlock every 5 weeks after this course's weekly coursework starts.</p>
			<div class="exam-mini-progress">
				${[1, 2, 3].map(function(examNumber) {
					const status = getExamStatus(pathId, examNumber);
					return `<span class="exam-dot ${status === "passed" ? "passed" : status === "available" || status === "failed" ? "available" : "locked"}">W${examNumber * 5}</span>`;
				}).join("")}
			</div>
			<div class="actions">
				<button type="button" onclick="openCourseExams('${pathId}')">Open Course Exams</button>
			</div>
		</div>
	`);
};

// Patch lesson opening so every 5-week exam gate is mandatory for later content.
const examsOriginalOpenLesson = openLesson;
openLesson = function(lessonId) {
	const lesson = lessons[lessonId];

	if (lesson && courseExamBanks[lesson.path]) {
		const lessonList = paths[lesson.path].lessons;
		const lessonIndex = lessonList.indexOf(lessonId);

		// With current course sizes, this affects future expansion.
		// Every 5 lesson blocks requires the matching exam gate.
		const requiredExamNumber = Math.floor(lessonIndex / 5);

		if (requiredExamNumber >= 1 && !isExamPassed(lesson.path, requiredExamNumber)) {
			app.innerHTML = `
				<section class="panel">
					<div class="course-header">
						<div>
							<span class="badge">Exam Required</span>
							<h2>Week ${requiredExamNumber * 5} Exam Required</h2>
							<p>This lesson block is locked until the required 5-week exam is passed.</p>
						</div>
						<div class="actions">
							<button type="button" onclick="openCourseExams('${lesson.path}')">Open Exams</button>
							<button type="button" class="secondary" onclick="openCourse('${lesson.path}')">Back to Course</button>
						</div>
					</div>
				</section>
			`;
			return;
		}
	}

	examsOriginalOpenLesson(lessonId);
};

// Patch topbar nav if needed.
(function addExamNavSafety() {
	const nav = document.querySelector(".nav-actions");
	if (nav && !Array.from(nav.querySelectorAll("button")).some(function(btn) { return btn.textContent.trim() === "Exams"; })) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = "Exams";
		btn.onclick = showExamHub;
		nav.insertBefore(btn, nav.lastElementChild);
	}
})();

// Admin controls.
if (typeof renderAdminOverview === "function") {
	const examsOriginalRenderAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = examsOriginalRenderAdminOverview();
		const card = `
			<div class="admin-card">
				<h3>5-Week Exam Control</h3>
				<p>Open, force-pass, or reset exams for testing.</p>
				<div class="actions">
					<button type="button" onclick="showExamHub()">Open Exam Hub</button>
					<button type="button" class="secondary" onclick="adminForcePassCurrentExams()">Force Pass Available Exams</button>
					<button type="button" class="red" onclick="adminResetAllExams()">Reset All Exams</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${card}`);
	};
}

function adminForcePassCurrentExams() {
	Object.keys(courseExamBanks).forEach(function(pathId) {
		if (!getCourseworkStartDate(pathId)) return;

		for (let examNumber = 1; examNumber <= 3; examNumber++) {
			const status = getExamStatus(pathId, examNumber);

			if (status === "available" || status === "failed") {
				localStorage.setItem(getExamKey(pathId, examNumber), JSON.stringify({
					pathId: pathId,
					examNumber: examNumber,
					submittedAt: new Date().toISOString(),
					score: 100,
					correct: courseExamBanks[pathId].questions.length,
					total: courseExamBanks[pathId].questions.length,
					passed: true,
					written: "Admin forced exam pass for testing the unlock flow.",
					wordCount: 9,
					uniqueWords: 9,
					expiredAtSubmit: false
				}));
			}
		}
	});

	showToast("Available exams force-passed");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

function adminResetAllExams() {
	Object.keys(courseExamBanks).forEach(function(pathId) {
		for (let examNumber = 1; examNumber <= 3; examNumber++) {
			localStorage.removeItem(getExamKey(pathId, examNumber));
			localStorage.removeItem(getExamAttemptKey(pathId, examNumber));
		}
	});

	showToast("All exams reset");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}


// ---------- Level Progression System ----------
// This replaces week locks and formal exam gates as the main prototype structure.
// Flow: Level 1 -> 20 lessons -> hard practical -> Level 2.
// 5 levels for now, 20 lesson slots per level.

const academyLevelCount = 10;
const lessonsPerLevel = 20;

const levelPlanRequirements = {
	1: "free",
	2: "plus",
	3: "elite",
	4: "pro",
	5: "proplus"
};

const levelDefinitions = [
	{
		level: 1,
		name: "Foundation Bootcamp",
		focus: "Roblox Studio basics, interface control, Explorer organisation, simple building, testing, and beginner workflow.",
		outcome: "User can navigate Studio, organise a project, build a small scene, test it, and explain basic services.",
		courses: ["Roblox Studio Basics"],
		gateTitle: "Foundation Practical Assessment",
		gateRequirements: [
			"Build a clean training room in Roblox Studio.",
			"Use at least 20 named objects.",
			"Organise Explorer with clear folders.",
			"Use Workspace, StarterGui, ServerScriptService, and ReplicatedStorage correctly.",
			"Test in Play mode and fix at least two issues."
		]
	},
	{
		level: 2,
		name: "Core Scripting",
		focus: "Lua variables, conditions, parts, events, functions, tables, UI LocalScripts, and client/server thinking.",
		outcome: "User can build simple interactive Roblox systems and explain what runs on client vs server.",
		courses: ["Roblox Lua"],
		gateTitle: "Interactive System Practical",
		gateRequirements: [
			"Build a scripted interaction system such as a shop, button system, or simple tycoon upgrade.",
			"Use variables, if statements, functions, and at least one table.",
			"Use at least one event such as Touched or MouseButton1Click.",
			"Explain which logic belongs on the server and which belongs on the client.",
			"Debug and document at least two mistakes."
		]
	},
	{
		level: 3,
		name: "Asset Creation",
		focus: "Blender controls, simple assets, clean modelling, materials, export mindset, and basic Roblox-ready visual assets.",
		outcome: "User can create simple assets and prepare them for Roblox testing.",
		courses: ["Blender", "Roblox Studio Basics"],
		gateTitle: "Game Asset Practical",
		gateRequirements: [
			"Create a small asset pack with at least three related props.",
			"Use clean object names and simple structure.",
			"Apply main, secondary, and accent materials.",
			"Test or prepare the assets for Roblox Studio scale.",
			"Explain what was simplified and what would be polished later."
		]
	},
	{
		level: 4,
		name: "Animation and Polish",
		focus: "Moon Animator, keyframes, timing, spacing, object animation, simple character poses, UI/game polish, and presentation.",
		outcome: "User can make simple useful animations and explain how they would be triggered in-game.",
		courses: ["Moon Animator", "Blender", "Roblox Lua"],
		gateTitle: "Animated Feature Practical",
		gateRequirements: [
			"Create an animated feature such as a button press, door open, platform movement, or character gesture.",
			"Use clear keyframes and timing choices.",
			"Explain how the animation would trigger in-game.",
			"Include at least one improvement pass for timing or stiffness.",
			"Document one playback problem you tested or would test."
		]
	},
	{
		level: 5,
		name: "Pro+ Creator Project",
		focus: "Combining Studio, Lua, Blender, Moon Animator, practical evidence, polish, monetisation awareness, and launch preparation.",
		outcome: "User can plan and prototype a small but complete Roblox creator project.",
		courses: ["Roblox Studio Basics", "Roblox Lua", "Blender", "Moon Animator"],
		gateTitle: "Capstone Prototype Practical",
		gateRequirements: [
			"Build a small playable prototype or polished feature demo.",
			"Include scripting, organised Studio structure, at least one custom/visual asset, and one animation or polish element.",
			"Write a mini update log and test report.",
			"Explain what would be monetised ethically and what would stay free.",
			"Present the project as if submitting to an academy mentor."
		]
	}
];

const levelLessonTemplates = {
	1: [
		["studio1", "Studio Interface and Navigation"],
		["studio2", "Explorer Organisation"],
		["studio3", "Building with Parts"],
		["studio4", "Testing and Debugging"],
		["studio5", "Starter Services"],
		["studio6", "Mini Bootcamp Project"],
		[null, "Viewport Control Drill"],
		[null, "Properties Mastery Drill"],
		[null, "Clean Naming Practice"],
		[null, "Workspace Structure Practice"],
		[null, "Anchoring and Collision Drill"],
		[null, "StarterGui Placement Practice"],
		[null, "Output Error Reading"],
		[null, "Folder Organisation Challenge"],
		[null, "Simple Map Blockout"],
		[null, "Play Mode Test Routine"],
		[null, "Beginner Debug Report"],
		[null, "Mini Scene Improvement"],
		[null, "Foundation Review"],
		[null, "Level 1 Readiness Check"]
	],
	2: [
		["lua1", "Variables"],
		["lua2", "If Statements"],
		["lua3", "Parts and Properties"],
		["lua4", "Events"],
		["lua5", "UI LocalScripts"],
		["lua6", "Functions and Reuse"],
		["lua7", "Tables"],
		["lua8", "Client vs Server"],
		[null, "Print and Output Debugging"],
		[null, "Boolean Logic Drill"],
		[null, "Purchase System Drill"],
		[null, "Button Touch System"],
		[null, "Reusable Create Part Function"],
		[null, "Basic Data Table Challenge"],
		[null, "UI Open/Close Challenge"],
		[null, "Server Safety Scenario"],
		[null, "Simple Shop Prototype"],
		[null, "Bug Fix Practical"],
		[null, "Core Scripting Review"],
		[null, "Level 2 Readiness Check"]
	],
	3: [
		["blend1", "Blender Controls"],
		["blend2", "Simple Game Assets"],
		["blend3", "Roblox Export Mindset"],
		["blend4", "Materials and Visual Style"],
		["blend5", "Clean Modelling Workflow"],
		[null, "Cube Blockout Drill"],
		[null, "Prop Shape Language"],
		[null, "Scale Testing Practice"],
		[null, "Asset Naming Routine"],
		[null, "Low Detail vs High Detail"],
		[null, "Material Palette Challenge"],
		[null, "Simple Crate Asset"],
		[null, "Door or Panel Asset"],
		[null, "Collectible Asset"],
		[null, "Roblox Import Checklist"],
		[null, "Model Cleanup Drill"],
		[null, "Asset Variation Challenge"],
		[null, "Game Asset Review"],
		[null, "Asset Pack Plan"],
		[null, "Level 3 Readiness Check"]
	],
	4: [
		["moon1", "Keyframes"],
		["moon2", "Beginner Animations"],
		["moon3", "Character Basics"],
		["moon4", "Timing and Spacing"],
		["moon5", "Exporting and Using Animations"],
		[null, "Button Press Animation"],
		[null, "Door Open Animation"],
		[null, "Platform Movement"],
		[null, "Panel Slide"],
		[null, "Fast vs Slow Timing"],
		[null, "Simple Ease Practice"],
		[null, "Idle Pose Practice"],
		[null, "Wave Gesture"],
		[null, "Animation Naming Drill"],
		[null, "Trigger Planning"],
		[null, "Playback Issue Report"],
		[null, "Polish Pass Challenge"],
		[null, "Animation Review"],
		[null, "Animated Feature Plan"],
		[null, "Level 4 Readiness Check"]
	],
	5: [
		[null, "Project Concept"],
		[null, "Core Loop Plan"],
		[null, "Studio Structure Setup"],
		[null, "Main Script System"],
		[null, "UI Flow Plan"],
		[null, "Asset Pack Selection"],
		[null, "Animation/Polish Selection"],
		[null, "Prototype Build Sprint"],
		[null, "Bug Testing Pass"],
		[null, "Performance Check"],
		[null, "Monetisation Ethics"],
		[null, "Free vs Paid Features"],
		[null, "Update Log Writing"],
		[null, "Screenshot Evidence Pack"],
		[null, "User Feedback Plan"],
		[null, "Final Fix Sprint"],
		[null, "Launch Checklist"],
		[null, "Capstone Evidence"],
		[null, "Presentation Practice"],
		[null, "Final Pro+ Review"]
	]
};

function getLevelLessonKey(level, slot) {
	return "creatorAcademy.levelLesson." + level + "." + slot;
}

function getLevelGateKey(level) {
	return "creatorAcademy.levelGate." + level;
}

function isLevelLessonComplete(level, slot) {
	return localStorage.getItem(getLevelLessonKey(level, slot)) === "true";
}

function markLevelLessonComplete(level, slot) {
	localStorage.setItem(getLevelLessonKey(level, slot), "true");
}

function isLevelGateComplete(level) {
	return Boolean(localStorage.getItem(getLevelGateKey(level)));
}

function getLevelGateSubmission(level) {
	const raw = localStorage.getItem(getLevelGateKey(level));
	return raw ? JSON.parse(raw) : null;
}

function isLevelUnlocked(level) {
	if (level <= 1) return true;

	for (let previous = 1; previous < level; previous++) {
		if (!isLevelGateComplete(previous)) return false;
	}

	const requiredPlan = levelPlanRequirements[level] || "free";
	if (typeof planMeetsRequirement === "function" && !planMeetsRequirement(requiredPlan)) {
		return false;
	}

	return true;
}

function getLevelLessonCompletion(level) {
	let complete = 0;

	for (let slot = 1; slot <= lessonsPerLevel; slot++) {
		if (isLevelLessonComplete(level, slot)) complete++;
	}

	return {
		complete: complete,
		total: lessonsPerLevel,
		percent: Math.round((complete / lessonsPerLevel) * 100)
	};
}

function isLevelReadyForGate(level) {
	return getLevelLessonCompletion(level).complete >= lessonsPerLevel;
}

function getCurrentLevel() {
	for (let level = 1; level <= academyLevelCount; level++) {
		if (!isLevelGateComplete(level)) return level;
	}

	return academyLevelCount;
}

function getLevelSlot(level, slot) {
	const list = levelLessonTemplates[level] || [];
	const item = list[slot - 1] || [null, "Lesson Slot " + slot];

	return {
		realLessonId: item[0],
		title: item[1],
		level: level,
		slot: slot
	};
}

function showLevelHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showPlans();
		return;
	}

	app.innerHTML = `
		<section class="panel level-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Main Progression</span>
					<h2>Creator Academy Levels</h2>
					<p>Five levels. Twenty lesson slots per level. Complete all lessons in the level, then pass the hard practical to unlock the next level.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
					<button type="button" class="secondary" onclick="showProgress()">Progress</button>
				</div>
			</div>

			<div class="level-route-banner">
				<strong>Prototype structure:</strong> no week locks. Progress is based on lesson completion and a serious level practical.
				This is stricter and better for a bootcamp-style academy.
			</div>

			<div class="level-dot-row">
				${levelDefinitions.map(function(levelDef) {
					const complete = isLevelGateComplete(levelDef.level);
					const unlocked = isLevelUnlocked(levelDef.level);
					const current = getCurrentLevel() === levelDef.level;
					return `<span class="level-dot ${complete ? "complete" : current && unlocked ? "current" : unlocked ? "current" : "locked"}">${levelDef.level}</span>`;
				}).join("")}
			</div>

			<div class="level-grid">
				${levelDefinitions.map(renderLevelCard).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("levelHub");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderLevelCard(levelDef) {
	const progress = getLevelLessonCompletion(levelDef.level);
	const unlocked = isLevelUnlocked(levelDef.level);
	const complete = isLevelGateComplete(levelDef.level);
	const current = getCurrentLevel() === levelDef.level;
	const requiredPlan = levelPlanRequirements[levelDef.level] || "free";
	const requiredPlanName = plans && plans[requiredPlan] ? plans[requiredPlan].name : requiredPlan;

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
		<div class="level-card ${className}">
			<span class="level-status">${status}</span>
			<h3>Level ${levelDef.level}: ${levelDef.name}</h3>
			<p>${levelDef.focus}</p>

			<div class="level-meta-row">
				<span class="level-pill">20 lessons</span>
				<span class="level-pill">Hard practical gate</span>
				<span class="level-pill">${requiredPlanName}</span>
			</div>

			<div class="level-progress-bar">
				<div class="level-progress-fill" style="width: ${progress.percent}%"></div>
			</div>
			<p><strong>${progress.complete}/${progress.total}</strong> lesson slots complete</p>

			<ul>
				${levelDef.courses.map(function(course) { return `<li>${course}</li>`; }).join("")}
			</ul>

			<div class="actions">
				<button type="button" ${unlocked ? "" : "disabled"} onclick="openLevel(${levelDef.level})">${complete ? "Review Level" : "Open Level"}</button>
			</div>
		</div>
	`;
}

function openLevel(level) {
	if (!isLevelUnlocked(level)) {
		showToast("Level locked. Complete the previous hard practical or upgrade plan.");
		showLevelHub();
		return;
	}

	const levelDef = levelDefinitions[level - 1];
	const progress = getLevelLessonCompletion(level);
	const gateComplete = isLevelGateComplete(level);

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Level ${level}</span>
					<h2>${levelDef.name}</h2>
					<p>${levelDef.outcome}</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showLevelHub()">All Levels</button>
					<button type="button" onclick="openLevelGate(${level})">${gateComplete ? "Review Practical" : "Hard Practical Gate"}</button>
				</div>
			</div>

			<div class="level-summary-panel">
				<h3>Level Progress</h3>
				<p>${progress.complete}/${progress.total} lesson slots complete. Finish the lesson slots, then pass the hard practical to unlock the next level.</p>
				<div class="level-progress-bar">
					<div class="level-progress-fill" style="width: ${progress.percent}%"></div>
				</div>
			</div>

			<div class="lesson-slot-grid">
				${Array.from({ length: lessonsPerLevel }, function(_, index) {
					return renderLevelLessonSlot(level, index + 1);
				}).join("")}
			</div>

			${renderLevelGatePreview(level)}
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("level");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderLevelLessonSlot(level, slot) {
	const data = getLevelSlot(level, slot);
	const complete = isLevelLessonComplete(level, slot);
	const previousComplete = slot === 1 || isLevelLessonComplete(level, slot - 1);
	const unlocked = previousComplete;
	const real = Boolean(data.realLessonId);
	const requiredPlan = levelPlanRequirements[level] || "free";
	const requiredPlanName = plans && plans[requiredPlan] ? plans[requiredPlan].name : requiredPlan;

	return `
		<button type="button" class="lesson-slot-card ${complete ? "complete" : ""} ${unlocked ? "" : "locked"}" ${unlocked ? `onclick="openLevelLesson(${level}, ${slot})"` : "disabled"}>
			<span class="slot-number">${slot}</span>
			<h4>${data.title}</h4>
			<p>${real ? "Full lesson connected to the course system." : "Prototype lesson slot for the 20-lesson level structure."}</p>
			<span class="slot-plan">${complete ? "Complete" : unlocked ? "Available" : "Locked"} • ${requiredPlanName}</span>
		</button>
	`;
}

function openLevelLesson(level, slot) {
	if (!isLevelUnlocked(level)) {
		showLevelHub();
		return;
	}

	if (slot > 1 && !isLevelLessonComplete(level, slot - 1)) {
		showToast("Complete the previous lesson slot first");
		openLevel(level);
		return;
	}

	const data = getLevelSlot(level, slot);

	if (data.realLessonId && lessons[data.realLessonId]) {
		// Open the original lesson content, but do not allow old coursework/week gate to block the level prototype.
		renderLevelWrappedRealLesson(level, slot, data.realLessonId);
		return;
	}

	renderPrototypeLevelLesson(level, slot, data);
}

function renderLevelWrappedRealLesson(level, slot, lessonId) {
	const lesson = lessons[lessonId];
	const path = paths[lesson.path];

	app.innerHTML = `
		<section class="panel">
			<div class="lesson-card">
				<div class="lesson-topline">
					<p>Level ${level} • Slot ${slot} • ${path.title}</p>
					<span class="badge">${isLevelLessonComplete(level, slot) ? "Complete" : "Level Lesson"}</span>
				</div>

				<h2>${lesson.title}</h2>
				<p>${lesson.concept}</p>

				<div class="lesson-block deep-dive">
					<h3>Detailed Explanation</h3>
					${lesson.deepDive ? lesson.deepDive.map(function(paragraph) { return `<p>${paragraph}</p>`; }).join("") : `<p>${lesson.summary}</p>`}
				</div>

				<h3>Example</h3>
				<pre><code>${escapeHtml(lesson.code || "No code example for this lesson.")}</code></pre>

				<div class="lesson-block">
					<h3>Level Slot Task</h3>
					<p>Complete this lesson’s practical work, then mark the level slot complete. The final level gate will still require a hard project submission.</p>
				</div>

				<div class="actions">
					<button type="button" class="secondary" onclick="openLevel(${level})">Back to Level</button>
					<button type="button" class="green" onclick="completeLevelSlot(${level}, ${slot})">${isLevelLessonComplete(level, slot) ? "Already Complete" : "Mark Slot Complete"}</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("levelLesson");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderPrototypeLevelLesson(level, slot, data) {
	const levelDef = levelDefinitions[level - 1];

	app.innerHTML = `
		<section class="panel">
			<div class="lesson-card">
				<div class="lesson-topline">
					<p>Level ${level} • Slot ${slot}</p>
					<span class="badge">${isLevelLessonComplete(level, slot) ? "Complete" : "Prototype Lesson"}</span>
				</div>

				<h2>${data.title}</h2>
				<p>This is a prototype lesson slot for the 20-lessons-per-level structure. It gives the academy a full progression shape even before every detailed lesson is written.</p>

				<div class="lesson-block deep-dive">
					<h3>Training Focus</h3>
					<p>${levelDef.focus}</p>
					<p>The learner should treat this slot as a focused drill. The goal is not random reading; it is to complete a specific action, explain the result, and prepare for the hard level practical.</p>
					<p>Later, this placeholder can be replaced with a full written lesson, quiz, examples, screenshots, videos, and AI feedback.</p>
				</div>

				<div class="lesson-block practical-lab">
					<h3>Slot Practical</h3>
					<p>Complete one small practical task related to: <strong>${data.title}</strong>.</p>
					<ul>
						<li>Build, script, model, animate, or document something small.</li>
						<li>Test or review the result.</li>
						<li>Write down one thing that worked and one thing to improve.</li>
					</ul>
				</div>

				<div class="actions">
					<button type="button" class="secondary" onclick="openLevel(${level})">Back to Level</button>
					<button type="button" class="green" onclick="completeLevelSlot(${level}, ${slot})">${isLevelLessonComplete(level, slot) ? "Already Complete" : "Mark Slot Complete"}</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("levelLesson");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function completeLevelSlot(level, slot) {
	markLevelLessonComplete(level, slot);
	showToast("Level lesson slot complete");
	openLevel(level);
}

function renderLevelGatePreview(level) {
	const levelDef = levelDefinitions[level - 1];
	const ready = isLevelReadyForGate(level);
	const complete = isLevelGateComplete(level);

	return `
		<div class="level-gate-panel">
			<h3>${levelDef.gateTitle}</h3>
			<p>${complete ? "This hard practical is complete." : ready ? "All lesson slots are complete. Submit the hard practical to unlock the next level." : "Locked until all 20 lesson slots in this level are complete."}</p>
			<ul>
				${levelDef.gateRequirements.map(function(req) { return `<li>${req}</li>`; }).join("")}
			</ul>
			<div class="actions">
				<button type="button" ${ready || complete ? "" : "disabled"} onclick="openLevelGate(${level})">${complete ? "Review Practical" : "Open Hard Practical"}</button>
			</div>
		</div>
	`;
}

function openLevelGate(level) {
	if (!isLevelUnlocked(level)) {
		showLevelHub();
		return;
	}

	const levelDef = levelDefinitions[level - 1];
	const ready = isLevelReadyForGate(level);
	const submission = getLevelGateSubmission(level);

	if (!ready && !submission) {
		showToast("Complete all 20 level lessons first");
		openLevel(level);
		return;
	}

	app.innerHTML = `
		<section class="panel">
			<div class="level-gate-panel">
				<div class="course-header">
					<div>
						<span class="badge">Hard Practical Gate</span>
						<h2>Level ${level}: ${levelDef.gateTitle}</h2>
						<p>${levelDef.outcome}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="openLevel(${level})">Back to Level</button>
					</div>
				</div>

				<div class="level-system-note">
					This is the serious progression gate. Submitting weak/spam evidence should fail. For the prototype, the gate uses strict local checks.
					Later, this can be AI-reviewed with screenshots/video evidence.
				</div>

				<h3>Requirements</h3>
				<ul>
					${levelDef.gateRequirements.map(function(req) { return `<li>${req}</li>`; }).join("")}
				</ul>

				${submission ? renderLevelGateSubmission(level, submission) : renderLevelGateForm(level)}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("levelGate");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderLevelGateSubmission(level, submission) {
	return `
		<div class="exam-result">
			<h3>Hard Practical Submitted</h3>
			<p><strong>Submitted:</strong> ${formatDate(new Date(submission.submittedAt))}</p>
			<p><strong>Total words:</strong> ${submission.wordCount}</p>
			<p><strong>Unique words:</strong> ${submission.uniqueWords}</p>
			<p><strong>File attached:</strong> ${submission.fileName || "No file recorded"}</p>
			<p>Next level is now unlocked if your plan allows it.</p>
			<div class="actions">
				<button type="button" class="secondary" onclick="deleteLevelGate(${level})">Delete Submission</button>
				<button type="button" onclick="showLevelHub()">All Levels</button>
			</div>
		</div>
	`;
}

function renderLevelGateForm(level) {
	return `
		<div class="level-evidence-grid">
			<div class="level-evidence-card">
				<h4>Build Evidence</h4>
				<p>What exactly did you build or complete?</p>
				<textarea id="levelBuildEvidence" placeholder="At least 60 words."></textarea>
			</div>

			<div class="level-evidence-card">
				<h4>Debug / Improvement Evidence</h4>
				<p>What broke, what did you improve, or what did you test?</p>
				<textarea id="levelDebugEvidence" placeholder="At least 50 words."></textarea>
			</div>

			<div class="level-evidence-card">
				<h4>Reflection Evidence</h4>
				<p>What did you learn and what would you improve next?</p>
				<textarea id="levelReflectEvidence" placeholder="At least 50 words."></textarea>
			</div>
		</div>

		<label class="level-check">
			<input type="checkbox" id="levelBuildCheck">
			<span>I completed the full hard practical myself.</span>
		</label>

		<label class="level-check">
			<input type="checkbox" id="levelTestCheck">
			<span>I tested/debugged the work and fixed or documented problems.</span>
		</label>

		<label class="level-check">
			<input type="checkbox" id="levelProofCheck">
			<span>I understand this practical unlocks the next level and should not be spammed.</span>
		</label>

		<div class="level-file-box">
			<strong>Attach proof file</strong>
			<p>Screenshot, image, or video proof. Static version only checks that a file was selected.</p>
			<input id="levelProofFile" type="file" accept="image/*,video/*">
		</div>

		<div id="levelGateWarning" class="level-warning hidden"></div>

		<div class="actions">
			<button type="button" class="green" onclick="submitLevelGate(${level})">Submit Hard Practical</button>
		</div>
	`;
}

function submitLevelGate(level) {
	const build = document.getElementById("levelBuildEvidence").value.trim();
	const debug = document.getElementById("levelDebugEvidence").value.trim();
	const reflect = document.getElementById("levelReflectEvidence").value.trim();
	const buildCheck = document.getElementById("levelBuildCheck");
	const testCheck = document.getElementById("levelTestCheck");
	const proofCheck = document.getElementById("levelProofCheck");
	const file = document.getElementById("levelProofFile");
	const warning = document.getElementById("levelGateWarning");

	const combined = [build, debug, reflect].join(" ");
	const wordCount = typeof countWords === "function" ? countWords(combined) : combined.split(/\s+/).filter(Boolean).length;
	const uniqueWords = typeof countUniqueWords === "function" ? countUniqueWords(combined) : new Set(combined.toLowerCase().split(/\s+/)).size;
	const spam = typeof hasSpamPattern === "function" ? hasSpamPattern(combined) : false;

	const problems = [];

	if (!isLevelReadyForGate(level)) problems.push("Complete all 20 lesson slots first.");
	if (!buildCheck.checked) problems.push("Tick that the full hard practical was completed.");
	if (!testCheck.checked) problems.push("Tick that testing/debugging was completed.");
	if (!proofCheck.checked) problems.push("Tick that this is proper practical evidence.");
	if (countWords(build) < 60) problems.push("Build evidence needs at least 60 words.");
	if (countWords(debug) < 50) problems.push("Debug/improvement evidence needs at least 50 words.");
	if (countWords(reflect) < 50) problems.push("Reflection evidence needs at least 50 words.");
	if (wordCount < 180) problems.push("Total hard practical evidence must be at least 180 words.");
	if (uniqueWords < 70) problems.push("Evidence needs at least 70 unique meaningful words.");
	if (spam) problems.push("Evidence looks repetitive/spam-like.");
	if (!file.files || file.files.length === 0) problems.push("Attach at least one screenshot/image/video proof file.");

	if (problems.length > 0) {
		warning.classList.remove("hidden");
		warning.innerHTML = "<strong>Hard practical cannot be submitted yet:</strong><ul>" + problems.map(function(problem) {
			return "<li>" + problem + "</li>";
		}).join("") + "</ul>";
		return;
	}

	const submission = {
		level: level,
		submittedAt: new Date().toISOString(),
		build: build,
		debug: debug,
		reflect: reflect,
		wordCount: wordCount,
		uniqueWords: uniqueWords,
		fileName: file.files[0] ? file.files[0].name : ""
	};

	localStorage.setItem(getLevelGateKey(level), JSON.stringify(submission));

	if (typeof addAdminLog === "function") {
		addAdminLog("Level " + level + " hard practical submitted.");
	}

	showToast("Level " + level + " practical complete");
	showLevelHub();
}

function deleteLevelGate(level) {
	localStorage.removeItem(getLevelGateKey(level));
	showToast("Level practical deleted");
	openLevel(level);
}

// Replace weekly/exam screens with the level system.
showCourseworkHub = showLevelHub;
showExamHub = showLevelHub;

// Replace the Learn page with levels, not course tree.
openSkillTree = showLevelHub;

// Patch home page to mention levels.
const levelOriginalShowHome = showHome;
showHome = function() {
	levelOriginalShowHome();

	const hero = document.querySelector(".hero-content");
	if (hero && !hero.querySelector(".level-system-note")) {
		hero.insertAdjacentHTML("beforeend", `
			<div class="level-system-note">
				<strong>Progression update:</strong> the prototype now uses 5 academy levels instead of week locks.
				Each level has 20 lesson slots and a hard practical gate before the next level unlocks.
			</div>
		`);
	}
};

// Patch nav after old safety scripts add Coursework/Exams.
function repairLevelNavigation() {
	const nav = document.querySelector(".nav-actions");
	if (!nav) return;

	Array.from(nav.querySelectorAll("button")).forEach(function(button) {
		const text = button.textContent.trim();

		if (text === "Coursework" || text === "Exams" || text === "Learn") {
			button.textContent = "Levels";
			button.onclick = showLevelHub;
		}
	});

	const levelButtons = Array.from(nav.querySelectorAll("button")).filter(function(button) {
		return button.textContent.trim() === "Levels";
	});

	levelButtons.slice(1).forEach(function(button) {
		button.remove();
	});
}

setTimeout(repairLevelNavigation, 0);
setTimeout(repairLevelNavigation, 200);

// Admin tools.
if (typeof renderAdminOverview === "function") {
	const levelOriginalRenderAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = levelOriginalRenderAdminOverview();

		const card = `
			<div class="admin-card">
				<h3>Level System Control</h3>
				<p>Test the 5-level progression system.</p>
				<div class="actions">
					<button type="button" onclick="showLevelHub()">Open Levels</button>
					<button type="button" class="secondary" onclick="adminCompleteCurrentLevel()">Complete Current Level Slots</button>
					<button type="button" class="secondary" onclick="adminPassCurrentLevelGate()">Pass Current Gate</button>
					<button type="button" class="red" onclick="adminResetLevels()">Reset Levels</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${card}`);
	};
}

function adminCompleteCurrentLevel() {
	const level = getCurrentLevel();

	for (let slot = 1; slot <= lessonsPerLevel; slot++) {
		markLevelLessonComplete(level, slot);
	}

	showToast("Current level slots complete");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

function adminPassCurrentLevelGate() {
	const level = getCurrentLevel();

	for (let slot = 1; slot <= lessonsPerLevel; slot++) {
		markLevelLessonComplete(level, slot);
	}

	localStorage.setItem(getLevelGateKey(level), JSON.stringify({
		level: level,
		submittedAt: new Date().toISOString(),
		build: "Admin passed level gate for testing.",
		debug: "Admin passed level gate for testing.",
		reflect: "Admin passed level gate for testing.",
		wordCount: 18,
		uniqueWords: 10,
		fileName: "admin-test"
	}));

	showToast("Current level gate passed");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

function adminResetLevels() {
	for (let level = 1; level <= academyLevelCount; level++) {
		localStorage.removeItem(getLevelGateKey(level));

		for (let slot = 1; slot <= lessonsPerLevel; slot++) {
			localStorage.removeItem(getLevelLessonKey(level, slot));
		}
	}

	showToast("Levels reset");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

// Run nav repair now and after page changes.
const levelNavObserver = new MutationObserver(function() {
	repairLevelNavigation();
});

document.addEventListener("DOMContentLoaded", function() {
	repairLevelNavigation();

	const nav = document.querySelector(".nav-actions");
	if (nav) {
		levelNavObserver.observe(nav, { childList: true, subtree: true, characterData: true });
	}
});


// ---------- Detailed Lesson Notes System ----------
// Adds a small side Notes button on lesson/level screens.
// Notes are saved locally per lesson/slot in browser localStorage.
// This is not cloud-synced yet; real accounts/backend can sync later.

let activeNotesContext = {
	id: "general",
	title: "General Notes",
	subtitle: "Creator Academy"
};

let notesAutosaveTimer = null;

function getNotesKey(contextId) {
	return "creatorAcademy.lessonNotes." + contextId;
}

function getSafeContextId(text) {
	return String(text || "general")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80) || "general";
}

function detectNotesContext() {
	const lessonCard = app && (
		app.querySelector(".lesson-card") ||
		app.querySelector(".coursework-submit-panel") ||
		app.querySelector(".exam-panel") ||
		app.querySelector(".level-gate-panel")
	);

	if (!lessonCard) {
		return null;
	}

	const title = lessonCard.querySelector("h2") ? lessonCard.querySelector("h2").textContent.trim() : "Lesson Notes";
	const topline = lessonCard.querySelector(".lesson-topline p, .badge, .course-header p");
	const subtitle = topline ? topline.textContent.trim() : "Academy lesson";

	let contextPrefix = "lesson";
	if (typeof currentViewName !== "undefined") {
		contextPrefix = currentViewName || "lesson";
	}

	return {
		id: getSafeContextId(contextPrefix + "-" + title),
		title: title,
		subtitle: subtitle
	};
}

function ensureNotesUI() {
	if (!document.getElementById("lessonNotesSideButton")) {
		const sideButton = document.createElement("button");
		sideButton.id = "lessonNotesSideButton";
		sideButton.type = "button";
		sideButton.className = "lesson-notes-side-button";
		sideButton.textContent = "Notes";
		sideButton.onclick = function() {
			openNotesDrawer();
		};
		document.body.appendChild(sideButton);
	}

	if (!document.getElementById("notesBackdrop")) {
		const backdrop = document.createElement("div");
		backdrop.id = "notesBackdrop";
		backdrop.className = "notes-backdrop";
		backdrop.onclick = closeNotesDrawer;
		document.body.appendChild(backdrop);
	}

	if (!document.getElementById("notesDrawer")) {
		const drawer = document.createElement("aside");
		drawer.id = "notesDrawer";
		drawer.className = "notes-drawer";
		drawer.innerHTML = `
			<div class="notes-header">
				<div>
					<h2 id="notesTitle">Lesson Notes</h2>
					<p id="notesSubtitle">Write detailed notes for this lesson.</p>
				</div>
				<button type="button" class="notes-close-button" onclick="closeNotesDrawer()">Close</button>
			</div>

			<div class="notes-toolbar">
				<div class="notes-toolbar-row">
					<select id="notesFormatSelect" class="notes-format-select" onchange="notesFormatBlock(this.value)">
						<option value="p">Paragraph</option>
						<option value="h1">Heading 1</option>
						<option value="h2">Heading 2</option>
						<option value="h3">Heading 3</option>
						<option value="pre">Code Block</option>
					</select>

					<button type="button" class="notes-tool-button" onclick="notesCommand('bold')" title="Bold"><strong>B</strong></button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('italic')" title="Italic"><em>I</em></button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('underline')" title="Underline"><u>U</u></button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('strikeThrough')" title="Strike">S</button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('removeFormat')" title="Clear formatting">Clear</button>
				</div>

				<div class="notes-toolbar-row">
					<button type="button" class="notes-tool-button" onclick="notesCommand('insertUnorderedList')">Bullets</button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('insertOrderedList')">Numbers</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesChecklist()">Checklist</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesQuote()">Quote</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesCode()">Code</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesDivider()">Divider</button>
				</div>

				<div class="notes-toolbar-row">
					<button type="button" class="notes-tool-button" onclick="notesCommand('justifyLeft')">Left</button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('justifyCenter')">Centre</button>
					<button type="button" class="notes-tool-button" onclick="notesCommand('justifyRight')">Right</button>
					<label class="notes-tool-button">
						Text
						<input id="notesTextColour" class="notes-colour-input" type="color" value="#0f172a" onchange="notesCommand('foreColor', this.value)">
					</label>
					<label class="notes-tool-button">
						Highlight
						<input id="notesHighlightColour" class="notes-colour-input" type="color" value="#fef08a" onchange="notesCommand('hiliteColor', this.value)">
					</label>
				</div>

				<div class="notes-toolbar-row">
					<button type="button" class="notes-tool-button" onclick="insertNotesTemplate('cornell')">Cornell</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesTemplate('lesson')">Lesson Summary</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesTemplate('debug')">Debug Log</button>
					<button type="button" class="notes-tool-button" onclick="insertNotesTemplate('practical')">Practical Plan</button>
				</div>
			</div>

			<div class="notes-meta">
				<span id="notesWordCount">0 words</span>
				<span id="notesSavedStatus" class="notes-status">Not saved yet</span>
			</div>

			<div class="notes-editor-wrap">
				<div id="notesEditor" class="notes-editor" contenteditable="true" spellcheck="true"></div>
			</div>

			<div class="notes-actions-footer">
				<div class="notes-actions-left">
					<button type="button" onclick="saveActiveNotes()">Save Notes</button>
					<button type="button" class="secondary" onclick="exportActiveNotes()">Export .html</button>
					<button type="button" class="secondary" onclick="copyActiveNotes()">Copy</button>
				</div>
				<div class="notes-actions-right">
					<button type="button" class="notes-danger" onclick="clearActiveNotes()">Clear Notes</button>
				</div>
			</div>
		`;
		document.body.appendChild(drawer);

		const editor = document.getElementById("notesEditor");
		editor.addEventListener("input", function() {
			updateNotesWordCount();
			setNotesStatus("Autosaving...");
			clearTimeout(notesAutosaveTimer);
			notesAutosaveTimer = setTimeout(saveActiveNotes, 500);
		});

		editor.addEventListener("paste", function(event) {
			event.preventDefault();
			const text = (event.clipboardData || window.clipboardData).getData("text/plain");
			document.execCommand("insertText", false, text);
		});
	}
}

function updateNotesButton() {
	ensureNotesUI();

	const context = detectNotesContext();
	const sideButton = document.getElementById("lessonNotesSideButton");

	document.querySelectorAll(".lesson-notes-inline-button").forEach(function(button) {
		button.remove();
	});

	if (!context) {
		sideButton.classList.remove("visible");
		return;
	}

	activeNotesContext = context;
	sideButton.classList.add("visible");

	const lessonCard = app.querySelector(".lesson-card, .coursework-submit-panel, .exam-panel, .level-gate-panel");
	if (lessonCard && !lessonCard.querySelector(".lesson-notes-inline-button")) {
		const inlineButton = document.createElement("button");
		inlineButton.type = "button";
		inlineButton.className = "lesson-notes-inline-button";
		inlineButton.textContent = "Open Notes";
		inlineButton.onclick = openNotesDrawer;
		lessonCard.appendChild(inlineButton);
	}
}

function openNotesDrawer() {
	ensureNotesUI();

	const context = detectNotesContext();
	if (context) activeNotesContext = context;

	document.getElementById("notesTitle").textContent = activeNotesContext.title;
	document.getElementById("notesSubtitle").textContent = activeNotesContext.subtitle + " • Saved locally on this browser";

	const editor = document.getElementById("notesEditor");
	const saved = localStorage.getItem(getNotesKey(activeNotesContext.id));

	if (saved) {
		editor.innerHTML = saved;
	} else {
		editor.innerHTML = getDefaultNotesTemplate(activeNotesContext.title);
	}

	document.getElementById("notesBackdrop").classList.add("open");
	document.getElementById("notesDrawer").classList.add("open");

	updateNotesWordCount();
	setNotesStatus(saved ? "Loaded saved notes" : "New notes started");

	setTimeout(function() {
		editor.focus();
	}, 80);
}

function closeNotesDrawer() {
	const drawer = document.getElementById("notesDrawer");
	const backdrop = document.getElementById("notesBackdrop");

	if (drawer && drawer.classList.contains("open")) {
		saveActiveNotes();
	}

	if (drawer) drawer.classList.remove("open");
	if (backdrop) backdrop.classList.remove("open");
}

function getDefaultNotesTemplate(title) {
	return `
		<h2>${escapeHtml(title)} Notes</h2>
		<p class="notes-empty-hint">Use this area for proper lesson notes, practical plans, bugs, screenshots descriptions, and revision points.</p>
		<h3>Key idea</h3>
		<p></p>
		<h3>Important details</h3>
		<ul>
			<li></li>
		</ul>
		<h3>Practical task plan</h3>
		<ol>
			<li></li>
		</ol>
		<h3>Bugs / mistakes to remember</h3>
		<p></p>
	`;
}

function notesCommand(command, value) {
	const editor = document.getElementById("notesEditor");
	if (!editor) return;

	editor.focus();
	document.execCommand(command, false, value || null);
	updateNotesWordCount();
	saveActiveNotes();
}

function notesFormatBlock(tag) {
	const editor = document.getElementById("notesEditor");
	if (!editor) return;

	editor.focus();
	document.execCommand("formatBlock", false, tag);
	updateNotesWordCount();
	saveActiveNotes();
}

function insertNotesHtml(html) {
	const editor = document.getElementById("notesEditor");
	editor.focus();
	document.execCommand("insertHTML", false, html);
	updateNotesWordCount();
	saveActiveNotes();
}

function insertNotesChecklist() {
	insertNotesHtml(`
		<ul>
			<li>☐ Task:</li>
			<li>☐ Test:</li>
			<li>☐ Fix:</li>
			<li>☐ Evidence:</li>
		</ul>
	`);
}

function insertNotesQuote() {
	insertNotesHtml(`<blockquote>Important note: </blockquote>`);
}

function insertNotesCode() {
	insertNotesHtml(`<pre><code>-- code / error / command here</code></pre>`);
}

function insertNotesDivider() {
	insertNotesHtml(`<hr>`);
}

function insertNotesTemplate(type) {
	const templates = {
		cornell: `
			<h2>Cornell Notes</h2>
			<h3>Cues / Questions</h3>
			<ul><li></li></ul>
			<h3>Notes</h3>
			<p></p>
			<h3>Summary</h3>
			<p></p>
		`,
		lesson: `
			<h2>Lesson Summary</h2>
			<h3>Main concept</h3>
			<p></p>
			<h3>What each part means</h3>
			<ul><li></li></ul>
			<h3>What I can now do</h3>
			<p></p>
		`,
		debug: `
			<h2>Debug Log</h2>
			<h3>What broke?</h3>
			<p></p>
			<h3>Error / problem</h3>
			<pre><code></code></pre>
			<h3>Fix</h3>
			<p></p>
			<h3>How to avoid it next time</h3>
			<p></p>
		`,
		practical: `
			<h2>Practical Plan</h2>
			<ol>
				<li>Build:</li>
				<li>Test:</li>
				<li>Debug:</li>
				<li>Improve:</li>
				<li>Evidence:</li>
			</ol>
		`
	};

	insertNotesHtml(templates[type] || "");
}

function saveActiveNotes() {
	const editor = document.getElementById("notesEditor");
	if (!editor) return;

	localStorage.setItem(getNotesKey(activeNotesContext.id), editor.innerHTML);
	localStorage.setItem(getNotesKey(activeNotesContext.id) + ".updatedAt", new Date().toISOString());
	setNotesStatus("Saved");
	updateNotesWordCount();
}

function setNotesStatus(text) {
	const status = document.getElementById("notesSavedStatus");
	if (status) status.textContent = text;
}

function getNotesPlainText() {
	const editor = document.getElementById("notesEditor");
	return editor ? editor.innerText.trim() : "";
}

function updateNotesWordCount() {
	const count = typeof countWords === "function"
		? countWords(getNotesPlainText())
		: getNotesPlainText().split(/\s+/).filter(Boolean).length;

	const label = document.getElementById("notesWordCount");
	if (label) label.textContent = count + " words";
}

function clearActiveNotes() {
	const confirmed = window.confirm("Clear notes for this lesson? This cannot be undone.");
	if (!confirmed) return;

	const editor = document.getElementById("notesEditor");
	editor.innerHTML = getDefaultNotesTemplate(activeNotesContext.title);
	localStorage.removeItem(getNotesKey(activeNotesContext.id));
	localStorage.removeItem(getNotesKey(activeNotesContext.id) + ".updatedAt");
	updateNotesWordCount();
	setNotesStatus("Cleared");
}

function exportActiveNotes() {
	saveActiveNotes();

	const html = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Creator Academy Hub | Roblox Training</title>
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 900px; margin: 40px auto; padding: 0 20px; }
		pre, code { background: #0f172a; color: #22c55e; padding: 8px; border-radius: 8px; }
		blockquote { border-left: 4px solid #38bdf8; padding-left: 14px; color: #334155; }
	</style>
</head>
<body>
	<h1>${escapeHtml(activeNotesContext.title)}</h1>
	<p>${escapeHtml(activeNotesContext.subtitle)}</p>
	<hr>
	${document.getElementById("notesEditor").innerHTML}
</body>
</html>`;

	const blob = new Blob([html], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = getSafeContextId(activeNotesContext.title) + "-notes.html";
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);

	setNotesStatus("Exported");
}

function copyActiveNotes() {
	const text = getNotesPlainText();

	if (navigator.clipboard) {
		navigator.clipboard.writeText(text).then(function() {
			setNotesStatus("Copied");
			showToast("Notes copied");
		}).catch(function() {
			fallbackCopyNotes(text);
		});
	} else {
		fallbackCopyNotes(text);
	}
}

function fallbackCopyNotes(text) {
	const area = document.createElement("textarea");
	area.value = text;
	document.body.appendChild(area);
	area.select();
	document.execCommand("copy");
	area.remove();
	setNotesStatus("Copied");
	showToast("Notes copied");
}

// Close notes with Escape only if drawer is open; otherwise let site exit behaviour work.
document.addEventListener("keydown", function(event) {
	const drawer = document.getElementById("notesDrawer");

	if (event.key === "Escape" && drawer && drawer.classList.contains("open")) {
		event.stopPropagation();
		closeNotesDrawer();
	}
}, true);

// Watch screen changes and add notes button to lesson pages.
ensureNotesUI();

const notesObserver = new MutationObserver(function() {
	setTimeout(updateNotesButton, 0);
});

if (app) {
	notesObserver.observe(app, { childList: true, subtree: false });
}





// ---------- Final no-exit-button guard ----------
function forceAddExitRow() {
	return false;
}

function updateGlobalExitButton() {
	return false;
}

setTimeout(function() {
	document.querySelectorAll(
		"#emergencyExitButton, #globalExitButton, .emergency-exit-button, .global-exit-button, .force-exit-row, .page-exit-row, .exit-hint"
	).forEach(function(element) {
		element.remove();
	});
}, 0);


// ---------- Pro+ Monthly + Pro+ Lifetime ----------
plans.proplus_lifetime = {
	name: "Pro+ Lifetime",
	publicName: "Pro+ Lifetime",
	price: "£334",
	rank: 4,
	monthly: " one-time",
	description: "One-time Pro+ access. Highest public lifetime plan for users who do not want a monthly subscription.",
	features: [
		"Everything in Pro+ monthly",
		"One-time payment",
		"Lifetime public Pro+ rank",
		"No monthly subscription",
		"Best for serious long-term learners"
	]
};

if (typeof planOrder !== "undefined" && Array.isArray(planOrder) && !planOrder.includes("proplus_lifetime")) {
	const adminIndex = planOrder.indexOf("admin");
	if (adminIndex >= 0) {
		planOrder.splice(adminIndex, 0, "proplus_lifetime");
	} else {
		planOrder.push("proplus_lifetime");
	}
}

stripePaymentLinks.proplus_lifetime = "";

renderPlanCard = function(planId) {
	const plan = plans[planId];
	const current = getCurrentPlan() === planId;
	const pending = typeof getPendingPlan === "function" && getPendingPlan() === planId;
	const featured = planId === "pro" ? "featured" : "";
	const proplus = planId === "proplus" ? "proplus" : "";
	const lifetime = planId === "proplus_lifetime" ? "lifetime" : "";

	const ribbon =
		planId === "free" ? "" :
		planId === "proplus_lifetime" ? `<div class="plan-ribbon">Lifetime</div>` :
		planId === "proplus" ? `<div class="plan-ribbon">Highest Monthly</div>` :
		planId === "pro" ? `<div class="plan-ribbon">Popular</div>` :
		"";

	const buttonHtml = planId === "free"
		? `<button type="button" class="${current ? "green" : ""}" onclick="selectPlan('free'); return false;">${current ? "Current Plan" : "Select Free"}</button>`
		: `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}'); return false;">${pending ? "Resume Stripe Checkout" : "Pay with Stripe"}</button>`;

	const noteHtml = planId === "free"
		? `<div class="stripe-link-note">Free unlocks immediately.</div>`
		: planId === "proplus_lifetime"
			? `<div class="lifetime-note">One-time payment. After Stripe payment, admin verifies it and assigns Pro+ Lifetime manually in this static prototype.</div>`
			: `<div class="stripe-link-note">Monthly plan. Opens Stripe-hosted checkout in a separate tab. This academy page will stay open.</div>`;

	return `
		<div class="plan-card ${featured} ${proplus} ${lifetime}">
			${ribbon}
			<div>
				<span class="rank-badge">${plan.publicName}</span>
				<h3 class="plan-name">${plan.name}</h3>
				<div class="plan-price">${plan.price}<span>${plan.monthly}</span></div>
				<p>${plan.description}</p>
				<ul class="plan-features">
					${plan.features.map(function(feature) {
						return `<li>${feature}</li>`;
					}).join("")}
				</ul>
				${noteHtml}
			</div>

			${buttonHtml}
		</div>
	`;
};

showPlans = function() {
	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Mandatory Access Plan</span>
					<h2>Choose a Plan</h2>
					<p>Choose monthly access or the one-time Pro+ Lifetime plan. Pro+ is the highest public course rank; Admin is hidden/internal only.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
				</div>
			</div>

			<div class="plan-status-panel">
				<div>
					<h3>Current Rank</h3>
					<p>${getCurrentPlan() ? plans[getCurrentPlan()].name : "No plan selected yet"}</p>
				</div>
				<span class="rank-badge ${isAdminRank() ? "admin" : ""}">${getCurrentPlan() ? plans[getCurrentPlan()].publicName : "No Rank"}</span>
			</div>

			<div class="plan-grid">
				${["free", "plus", "elite", "pro", "proplus", "proplus_lifetime"].map(renderPlanCard).join("")}
			</div>

			<div class="admin-rank-warning">
				<strong>Hidden rank:</strong> Admin exists above all public plans, but it is not a public payment plan.
				Use Admin only for testing/internal control.
			</div>

			<div class="payment-note">
				Static prototype rule: Stripe opens checkout, then admin verifies payment and manually assigns the plan.
				Automatic unlock needs a backend plus Stripe webhooks later.
			</div>
		</section>
	`;

	const pending = typeof getPendingPlan === "function" ? getPendingPlan() : "";

	if (pending && plans[pending]) {
		const panel = document.querySelector(".panel");
		if (panel) {
			panel.insertAdjacentHTML("beforeend", `
				<div class="payment-pending-box">
					<strong>Pending checkout:</strong> ${plans[pending].name}.
					If payment has been completed, admin should verify it in Stripe and assign the plan from the hidden admin panel.
					<div class="actions">
						<button type="button" class="secondary" onclick="clearPendingPlan(); showPlans();">Clear Pending Checkout</button>
					</div>
				</div>
			`);
		}
	}

	if (typeof setCurrentView === "function") setCurrentView("plans");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
};

function adminRenderPlanControls() {
	return `
		<div class="admin-card">
			<h3>Rank / Plan Control</h3>
			<p>Public highest rank is Pro+. Pro+ Lifetime is a one-time payment version. Hidden highest rank is Admin.</p>
			<p>Current rank: <strong>${getCurrentPlan() ? plans[getCurrentPlan()].name : "None"}</strong></p>
			<div class="actions">
				${["free", "plus", "elite", "pro", "proplus", "proplus_lifetime", "admin"].map(function(planId) {
					return `<button type="button" class="${planId === "admin" ? "secondary" : ""}" onclick="adminSetPlan('${planId}')">${plans[planId].name}</button>`;
				}).join("")}
			</div>
		</div>
	`;
}





// ---------- Stable topbar binding: no dropdown, no observer ----------
function showAssessmentsHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showPlans();
		return;
	}

	app.innerHTML = `
		<section class="panel assessments-panel">
			<div class="course-header">
				<div>
					<span class="badge">Assessments</span>
					<h2>Coursework and Exams</h2>
					<p>Assessments are where learners prove skill. Coursework means practical build evidence. Exams mean formal review checks.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
				</div>
			</div>

			<div class="assessment-choice-grid">
				<button type="button" class="assessment-choice-card" onclick="showLevelHub()">
					<h3>Coursework</h3>
					<p>Practical evidence tasks and hard build submissions. In the current prototype, coursework is handled through level hard practical gates.</p>
					<ul>
						<li>Build evidence</li>
						<li>File proof</li>
						<li>Hard practical gates</li>
					</ul>
				</button>

				<button type="button" class="assessment-choice-card" onclick="showLevelHub()">
					<h3>Exams</h3>
					<p>Formal checks and progress reviews. In the current level prototype, exams are represented by level review/gate work.</p>
					<ul>
						<li>Knowledge checks</li>
						<li>Written reasoning</li>
						<li>Progress reviews</li>
					</ul>
				</button>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("assessments");
}

function bindStaticTopbar() {
	const home = document.getElementById("navHome");
	const levels = document.getElementById("navLevels");
	const assessments = document.getElementById("navAssessments");
	const progress = document.getElementById("navProgress");

	if (home) home.onclick = showHome;
	if (levels) levels.onclick = showLevelHub;
	if (assessments) assessments.onclick = showAssessmentsHub;
	if (progress) progress.onclick = showProgress;
}

bindStaticTopbar();
document.addEventListener("DOMContentLoaded", bindStaticTopbar);
setTimeout(bindStaticTopbar, 100);


// ---------- Courses and Coursework separated ----------
// Courses = lesson content/course paths.
// Coursework = hard practical submissions/gates.
// Levels = full progression route.

function getPublicCoursePathIds() {
	const preferred = ["studio", "lua", "blender", "moon"];
	return preferred.filter(function(pathId) {
		return paths && paths[pathId];
	});
}

function showCoursesHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showPlans();
		return;
	}

	const courseIds = getPublicCoursePathIds();

	app.innerHTML = `
		<section class="panel course-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Courses</span>
					<h2>Course Library</h2>
					<p>Courses are the learning content: lessons, explanations, examples, and course maps. Coursework is separate and lives in its own section.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Home</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
				</div>
			</div>

			<div class="separation-note">
				<strong>Separated structure:</strong> use Courses to learn lessons. Use Coursework to submit hard practical evidence.
				Levels still control the full bootcamp progression.
			</div>

			<div class="course-hub-grid">
				${courseIds.map(function(pathId) {
					return renderCourseHubCard(pathId);
				}).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courses");
}

function renderCourseHubCard(pathId) {
	const path = paths[pathId];
	const totalLessons = path.lessons ? path.lessons.length : 0;
	const progress = typeof getPathProgress === "function" ? getPathProgress(pathId) : { complete: 0, total: totalLessons };
	const percent = progress.total ? Math.round((progress.complete / progress.total) * 100) : 0;

	return `
		<button type="button" class="course-hub-card" onclick="openCleanCourse('${pathId}')">
			<span class="course-hub-tag">${path.type || "Course"}</span>
			<h3>${path.title}</h3>
			<p>${path.description || ""}</p>

			<div class="card-progress">
				<div class="card-progress-top">
					<span>${progress.complete}/${progress.total} course lessons</span>
					<span>${percent}%</span>
				</div>
				<div class="progress-track compact">
					<div class="progress-fill" style="width: ${percent}%"></div>
				</div>
			</div>

			<p class="next-lesson-text">Open course lessons</p>
		</button>
	`;
}

// Open course page, then remove old weekly/exam panels so Courses stay clean.
const separatedOriginalOpenCourse = openCourse;
function openCleanCourse(pathId) {
	separatedOriginalOpenCourse(pathId);

	const panel = app.querySelector(".course-map-panel, .panel");
	if (panel) {
		panel.querySelectorAll(".coursework-status-panel, .exam-course-status-panel").forEach(function(element) {
			element.remove();
		});

		if (!panel.querySelector(".course-page-clean-note")) {
			panel.insertAdjacentHTML("afterbegin", `
				<div class="course-page-clean-note">
					<strong>Course page:</strong> this page is only for lessons and course structure.
					Go to <button type="button" class="secondary" onclick="showCourseworkHub()">Coursework</button> for practical submissions.
				</div>
			`);
		}
	}

	if (typeof setCurrentView === "function") setCurrentView("course");
}

// Keep old openCourse usable, but clean it when it is opened from course/library navigation.
openCourse = function(pathId) {
	openCleanCourse(pathId);
};

function showCourseworkHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showPlans();
		return;
	}

	app.innerHTML = `
		<section class="panel coursework-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Coursework</span>
					<h2>Hard Practical Coursework</h2>
					<p>Coursework is separate from lessons. These are the hard practical submissions used to prove skill and unlock later levels.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showCoursesHub()">Courses</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
				</div>
			</div>

			<div class="separation-note">
				<strong>Rule:</strong> Courses teach. Coursework proves. Do the lessons first, then submit the hard practical gate for the level.
			</div>

			<div class="coursework-hub-grid">
				${levelDefinitions.map(function(levelDef) {
					return renderCourseworkHubCard(levelDef);
				}).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("coursework");
}

function renderCourseworkHubCard(levelDef) {
	const level = levelDef.level;
	const complete = typeof isLevelGateComplete === "function" && isLevelGateComplete(level);
	const unlocked = typeof isLevelUnlocked === "function" && isLevelUnlocked(level);
	const ready = typeof isLevelReadyForGate === "function" && isLevelReadyForGate(level);
	const progress = typeof getLevelLessonCompletion === "function" ? getLevelLessonCompletion(level) : { complete: 0, total: 20, percent: 0 };

	let status = "Locked";
	let className = "locked";
	let buttonText = "Locked";

	if (complete) {
		status = "Submitted";
		className = "complete";
		buttonText = "Review Submission";
	} else if (ready) {
		status = "Ready";
		className = "current";
		buttonText = "Submit Coursework";
	} else if (unlocked) {
		status = "Lessons Required";
		className = "current";
		buttonText = "Open Level Lessons";
	}

	return `
		<div class="coursework-hub-card ${className}">
			<span class="coursework-hub-tag">Level ${level} • ${status}</span>
			<h3>${levelDef.gateTitle}</h3>
			<p>${levelDef.outcome}</p>

			<ul>
				${levelDef.gateRequirements.slice(0, 3).map(function(req) {
					return `<li>${req}</li>`;
				}).join("")}
			</ul>

			<div class="level-progress-bar">
				<div class="level-progress-fill" style="width: ${progress.percent}%"></div>
			</div>
			<p><strong>${progress.complete}/${progress.total}</strong> lesson slots completed before this coursework gate.</p>

			<div class="actions">
				<button type="button" ${unlocked ? "" : "disabled"} onclick="${ready || complete ? "openLevelGate(" + level + ")" : "openLevel(" + level + ")"}">${buttonText}</button>
			</div>
		</div>
	`;
}

// Assessment page now points to separate sections.
function showAssessmentsHub() {
	app.innerHTML = `
		<section class="panel assessments-panel">
			<div class="course-header">
				<div>
					<span class="badge">Assessments</span>
					<h2>Assessment Area</h2>
					<p>Coursework and course lessons are now separated. Coursework is for hard practical evidence; Courses is for learning content.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showCoursesHub()">Courses</button>
					<button type="button" class="secondary" onclick="showCourseworkHub()">Coursework</button>
				</div>
			</div>
		</section>
	`;
}

// Static topbar binding.
function bindSeparatedTopbar() {
	const home = document.getElementById("navHome");
	const courses = document.getElementById("navCourses");
	const coursework = document.getElementById("navCoursework");
	const levels = document.getElementById("navLevels");
	const progress = document.getElementById("navProgress");

	if (home) home.onclick = showHome;
	if (courses) courses.onclick = showCoursesHub;
	if (coursework) coursework.onclick = showCourseworkHub;
	if (levels) levels.onclick = showLevelHub;
	if (progress) progress.onclick = showProgress;
}

bindSeparatedTopbar();
document.addEventListener("DOMContentLoaded", bindSeparatedTopbar);
setTimeout(bindSeparatedTopbar, 100);
setTimeout(bindSeparatedTopbar, 500);

// Also repair if old scripts try to mutate nav.
const separatedNavObserver = new MutationObserver(function() {
	bindSeparatedTopbar();
});
setTimeout(function() {
	const nav = document.querySelector(".nav-actions");
	if (nav) {
		separatedNavObserver.observe(nav, { childList: true, subtree: true });
	}
}, 100);


// ---------- Correct Coursework Logic ----------
// Courses and Coursework are separate.
// Coursework has two internal sections: Practical Coursework and Exams.
// If user already has a plan/admin, do NOT force briefing/plans.
// If user has no plan, show a short coursework access brief then Plans.
// If user does not meet a level's plan requirement, send to Plans.
// No separate exam top-bar/panel.

function userHasAnyValidPlan() {
	return typeof hasPlan === "function" ? hasPlan() : Boolean(state.plan);
}

function getPlanName(planId) {
	return plans && plans[planId] ? plans[planId].name : planId;
}

function canOpenLevelPlan(level) {
	const requiredPlan = levelPlanRequirements[level] || "free";
	return typeof planMeetsRequirement === "function" ? planMeetsRequirement(requiredPlan) : true;
}

function showCourseworkAccessBrief() {
	app.innerHTML = `
		<section class="panel">
			<div class="coursework-access-brief">
				<span class="badge">Coursework Access</span>
				<h2>Coursework Needs a Plan</h2>
				<p>
					Coursework is where learners submit hard practical work and exam/review tasks.
					You only see this briefing if you have no active plan selected.
				</p>

				<ul>
					<li>If you already have a plan or Admin rank, Coursework opens directly.</li>
					<li>If you do not have a plan, choose one before using Coursework.</li>
					<li>If a level needs a higher plan, the site sends you to Plans.</li>
					<li>Exams are inside Coursework, not a separate top-bar section.</li>
				</ul>

				<div class="actions">
					<button type="button" onclick="showPlans()">Choose / Confirm Plan</button>
					<button type="button" class="secondary" onclick="showHome()">Back Home</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courseworkAccess");
}

function showCourseworkHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (!userHasAnyValidPlan()) {
		showCourseworkAccessBrief();
		return;
	}

	app.innerHTML = `
		<section class="panel coursework-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Coursework</span>
					<h2>Coursework Dashboard</h2>
					<p>Coursework is separate from Courses. It contains practical coursework and exams/reviews.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showCoursesHub()">Courses</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
				</div>
			</div>

			<div class="coursework-main-tabs">
				<button type="button" class="active" onclick="showCourseworkHub()">Overview</button>
				<button type="button" onclick="showPracticalCoursework()">Practical Coursework</button>
				<button type="button" onclick="showCourseworkExams()">Exams</button>
			</div>

			<div class="coursework-dashboard-intro">
				<strong>Current plan:</strong> ${getCurrentPlan && getCurrentPlan() ? getPlanName(getCurrentPlan()) : "None"}.
				Courses teach the lessons. Coursework proves skill. Exams review understanding.
			</div>

			<div class="coursework-two-section-grid">
				<button type="button" class="coursework-section-large" onclick="showPracticalCoursework()">
					<h3>Practical Coursework</h3>
					<p>Hard build submissions connected to academy levels. These are the real practical gates.</p>
					<ul>
						<li>Build evidence</li>
						<li>Debug evidence</li>
						<li>Reflection evidence</li>
						<li>File proof</li>
					</ul>
				</button>

				<button type="button" class="coursework-section-large exam" onclick="showCourseworkExams()">
					<h3>Exams</h3>
					<p>Exam/review tasks live inside Coursework. There is no separate top-bar exam panel.</p>
					<ul>
						<li>Level review checks</li>
						<li>Written reasoning</li>
						<li>Knowledge confirmation</li>
						<li>Plan-gated access</li>
					</ul>
				</button>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("coursework");
}

function showPracticalCoursework() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (!userHasAnyValidPlan()) {
		showCourseworkAccessBrief();
		return;
	}

	app.innerHTML = `
		<section class="panel coursework-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Practical Coursework</span>
					<h2>Hard Practical Gates</h2>
					<p>Submit practical evidence for each level. If the level requires a higher plan, you will be sent to Plans.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showCourseworkHub()">Coursework Home</button>
					<button type="button" class="secondary" onclick="showCoursesHub()">Courses</button>
				</div>
			</div>

			<div class="coursework-main-tabs">
				<button type="button" onclick="showCourseworkHub()">Overview</button>
				<button type="button" class="active" onclick="showPracticalCoursework()">Practical Coursework</button>
				<button type="button" onclick="showCourseworkExams()">Exams</button>
			</div>

			<div class="coursework-level-grid">
				${levelDefinitions.map(renderPracticalCourseworkCard).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("practicalCoursework");
}

function renderPracticalCourseworkCard(levelDef) {
	const level = levelDef.level;
	const complete = typeof isLevelGateComplete === "function" && isLevelGateComplete(level);
	const unlocked = typeof isLevelUnlocked === "function" && isLevelUnlocked(level);
	const ready = typeof isLevelReadyForGate === "function" && isLevelReadyForGate(level);
	const requiredPlan = levelPlanRequirements[level] || "free";
	const planOk = canOpenLevelPlan(level);
	const progress = typeof getLevelLessonCompletion === "function" ? getLevelLessonCompletion(level) : { complete: 0, total: 20, percent: 0 };

	let status = "Locked";
	let className = "locked";
	let buttonText = "Open Level";

	if (!planOk) {
		status = getPlanName(requiredPlan) + " Required";
		buttonText = "Upgrade Plan";
	} else if (complete) {
		status = "Submitted";
		className = "ready";
		buttonText = "Review Submission";
	} else if (ready) {
		status = "Ready";
		className = "ready";
		buttonText = "Submit Practical";
	} else if (unlocked) {
		status = "Lessons Required";
		className = "";
		buttonText = "Open Level Lessons";
	}

	return `
		<div class="coursework-level-card ${className}">
			<span class="coursework-tag">Level ${level} • ${status}</span>
			<h3>${levelDef.gateTitle}</h3>
			<p>${levelDef.outcome}</p>
			<ul>
				${levelDef.gateRequirements.slice(0, 3).map(function(req) {
					return `<li>${req}</li>`;
				}).join("")}
			</ul>
			<div class="level-progress-bar">
				<div class="level-progress-fill" style="width: ${progress.percent}%"></div>
			</div>
			<p><strong>${progress.complete}/${progress.total}</strong> level lesson slots complete.</p>
			<p class="coursework-plan-lock">Required plan: ${getPlanName(requiredPlan)}</p>
			<div class="actions">
				<button type="button" onclick="openCourseworkLevel(${level})">${buttonText}</button>
			</div>
		</div>
	`;
}

function openCourseworkLevel(level) {
	if (!canOpenLevelPlan(level)) {
		showPlans();
		return;
	}

	const ready = typeof isLevelReadyForGate === "function" && isLevelReadyForGate(level);
	const complete = typeof isLevelGateComplete === "function" && isLevelGateComplete(level);

	if (ready || complete) {
		openLevelGate(level);
		return;
	}

	openLevel(level);
}

function showCourseworkExams() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (!userHasAnyValidPlan()) {
		showCourseworkAccessBrief();
		return;
	}

	app.innerHTML = `
		<section class="panel coursework-hub-panel">
			<div class="course-header">
				<div>
					<span class="badge">Coursework Exams</span>
					<h2>Exams / Level Reviews</h2>
					<p>Exams are inside Coursework. They are review checks for each level, not a separate top-bar panel.</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showCourseworkHub()">Coursework Home</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
				</div>
			</div>

			<div class="coursework-main-tabs">
				<button type="button" onclick="showCourseworkHub()">Overview</button>
				<button type="button" onclick="showPracticalCoursework()">Practical Coursework</button>
				<button type="button" class="active" onclick="showCourseworkExams()">Exams</button>
			</div>

			<div class="coursework-exam-grid">
				${levelDefinitions.map(renderCourseworkExamCard).join("")}
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("courseworkExams");
}

function renderCourseworkExamCard(levelDef) {
	const level = levelDef.level;
	const complete = typeof isLevelGateComplete === "function" && isLevelGateComplete(level);
	const unlocked = typeof isLevelUnlocked === "function" && isLevelUnlocked(level);
	const requiredPlan = levelPlanRequirements[level] || "free";
	const planOk = canOpenLevelPlan(level);

	let status = "Locked";
	let className = "locked";
	let buttonText = "Open Level";

	if (!planOk) {
		status = getPlanName(requiredPlan) + " Required";
		buttonText = "Upgrade Plan";
	} else if (complete) {
		status = "Review Ready";
		className = "ready";
		buttonText = "Review Level";
	} else if (unlocked) {
		status = "Available after practical";
		className = "";
		buttonText = "Open Level Work";
	}

	return `
		<div class="coursework-exam-card ${className}">
			<span class="coursework-tag exam">Level ${level} • ${status}</span>
			<h3>Level ${level} Exam Review</h3>
			<p>${levelDef.name}</p>
			<ul>
				<li>Required plan: ${getPlanName(requiredPlan)}</li>
				<li>Checks understanding from this level.</li>
				<li>Uses written reasoning and review evidence.</li>
				<li>Practical status: ${complete ? "submitted" : "not submitted"}</li>
			</ul>
			<div class="actions">
				<button type="button" onclick="openCourseworkExamLevel(${level})">${buttonText}</button>
			</div>
		</div>
	`;
}

function openCourseworkExamLevel(level) {
	if (!canOpenLevelPlan(level)) {
		showPlans();
		return;
	}

	openLevel(level);
}

// No separate Assessments/Exams topbar. If old code calls Assessments, route to coursework.
function showAssessmentsHub() {
	showCourseworkHub();
}

// Stable topbar binding.
function bindCorrectTopbar() {
	const home = document.getElementById("navHome");
	const courses = document.getElementById("navCourses");
	const coursework = document.getElementById("navCoursework");
	const levels = document.getElementById("navLevels");
	const progress = document.getElementById("navProgress");

	if (home) home.onclick = showHome;
	if (courses) courses.onclick = showCoursesHub;
	if (coursework) coursework.onclick = showCourseworkHub;
	if (levels) levels.onclick = showLevelHub;
	if (progress) progress.onclick = showProgress;
}

bindCorrectTopbar();
document.addEventListener("DOMContentLoaded", bindCorrectTopbar);
setTimeout(bindCorrectTopbar, 100);
setTimeout(bindCorrectTopbar, 500);


// ---------- Persistent Admin Role Fix ----------
// If Admin is selected in the admin panel, keep it as the active role across refresh/navigation.
// This stores the admin role explicitly and restores it on load.

const ADMIN_ROLE_STORAGE_KEY = "creatorAcademy.persistentAdminRole";

function setPersistentAdminRole(enabled) {
	if (enabled) {
		localStorage.setItem(ADMIN_ROLE_STORAGE_KEY, "true");
		localStorage.setItem("creatorAcademy.plan", "admin");
		localStorage.setItem("academyPlan", "admin");
		state.plan = "admin";
	} else {
		localStorage.removeItem(ADMIN_ROLE_STORAGE_KEY);
		if (state.plan === "admin") {
			state.plan = "";
			localStorage.removeItem("creatorAcademy.plan");
			localStorage.removeItem("academyPlan");
		}
	}
}

function hasPersistentAdminRole() {
	return localStorage.getItem(ADMIN_ROLE_STORAGE_KEY) === "true";
}

function restorePersistentAdminRole() {
	if (hasPersistentAdminRole()) {
		localStorage.setItem("creatorAcademy.plan", "admin");
		localStorage.setItem("academyPlan", "admin");
		state.plan = "admin";
	}
}

restorePersistentAdminRole();

// Force core plan helpers to respect persistent Admin.
const adminPersistOriginalGetCurrentPlan = typeof getCurrentPlan === "function" ? getCurrentPlan : null;
getCurrentPlan = function() {
	if (hasPersistentAdminRole()) {
		return "admin";
	}

	if (adminPersistOriginalGetCurrentPlan) {
		return adminPersistOriginalGetCurrentPlan();
	}

	return state.plan || "";
};

const adminPersistOriginalIsAdminRank = typeof isAdminRank === "function" ? isAdminRank : null;
isAdminRank = function() {
	return hasPersistentAdminRole() || getCurrentPlan() === "admin";
};

const adminPersistOriginalGetCurrentPlanRank = typeof getCurrentPlanRank === "function" ? getCurrentPlanRank : null;
getCurrentPlanRank = function() {
	if (hasPersistentAdminRole()) {
		return 99;
	}

	if (adminPersistOriginalGetCurrentPlanRank) {
		return adminPersistOriginalGetCurrentPlanRank();
	}

	const planId = getCurrentPlan();
	return plans[planId] ? plans[planId].rank : -1;
};

const adminPersistOriginalPlanMeetsRequirement = typeof planMeetsRequirement === "function" ? planMeetsRequirement : null;
planMeetsRequirement = function(requiredPlan) {
	if (hasPersistentAdminRole()) {
		return true;
	}

	if (adminPersistOriginalPlanMeetsRequirement) {
		return adminPersistOriginalPlanMeetsRequirement(requiredPlan);
	}

	if (!requiredPlan) return true;
	const planId = getCurrentPlan();
	return plans[planId] && plans[requiredPlan] && plans[planId].rank >= plans[requiredPlan].rank;
};

const adminPersistOriginalHasPlan = typeof hasPlan === "function" ? hasPlan : null;
hasPlan = function() {
	if (hasPersistentAdminRole()) {
		return true;
	}

	if (adminPersistOriginalHasPlan) {
		return adminPersistOriginalHasPlan();
	}

	return Boolean(getCurrentPlan());
};

// Patch savePlan so selecting Admin persists, and selecting another plan clears persistent Admin.
const adminPersistOriginalSavePlan = typeof savePlan === "function" ? savePlan : null;
savePlan = function(planId) {
	if (planId === "admin") {
		setPersistentAdminRole(true);
		if (typeof addAdminLog === "function") addAdminLog("Persistent Admin role enabled.");
		return;
	}

	setPersistentAdminRole(false);

	if (adminPersistOriginalSavePlan) {
		adminPersistOriginalSavePlan(planId);
	} else {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);
	}
};

// Patch admin plan setter so Admin stays Admin after refresh.
adminSetPlan = function(planId) {
	if (!plans[planId]) {
		showToast("Invalid plan");
		return;
	}

	if (planId === "admin") {
		setPersistentAdminRole(true);
	} else {
		setPersistentAdminRole(false);
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);
	}

	state.briefingComplete = true;
	state.skillTreeUnlocked = true;
	saveState();

	showToast("Rank set: " + plans[planId].name);

	if (typeof addAdminLog === "function") {
		addAdminLog("Rank set to: " + plans[planId].name);
	}

	if (typeof renderAdminDashboard === "function") {
		renderAdminDashboard("overview");
	}
};

// Add a visible admin role banner to pages where useful.
function injectAdminRoleBanner() {
	if (!hasPersistentAdminRole()) return;
	if (!app) return;

	const panel = app.querySelector(".panel, .hero-content");
	if (!panel) return;
	if (panel.querySelector(".admin-role-active-banner")) return;

	panel.insertAdjacentHTML("afterbegin", `
		<div class="admin-role-active-banner">
			Admin role is active and persistent. You bypass public plan requirements until Admin is removed in the admin panel.
		</div>
	`);
}

const adminPersistOriginalShowHome = typeof showHome === "function" ? showHome : null;
if (adminPersistOriginalShowHome) {
	showHome = function() {
		restorePersistentAdminRole();
		adminPersistOriginalShowHome();
		injectAdminRoleBanner();
	};
}

const adminPersistOriginalShowPlans = typeof showPlans === "function" ? showPlans : null;
if (adminPersistOriginalShowPlans) {
	showPlans = function() {
		restorePersistentAdminRole();
		adminPersistOriginalShowPlans();
		injectAdminRoleBanner();
	};
}

const adminPersistOriginalShowCourseworkHub = typeof showCourseworkHub === "function" ? showCourseworkHub : null;
if (adminPersistOriginalShowCourseworkHub) {
	showCourseworkHub = function() {
		restorePersistentAdminRole();
		adminPersistOriginalShowCourseworkHub();
		injectAdminRoleBanner();
	};
}

const adminPersistOriginalShowLevelHub = typeof showLevelHub === "function" ? showLevelHub : null;
if (adminPersistOriginalShowLevelHub) {
	showLevelHub = function() {
		restorePersistentAdminRole();
		adminPersistOriginalShowLevelHub();
		injectAdminRoleBanner();
	};
}

const adminPersistOriginalShowCoursesHub = typeof showCoursesHub === "function" ? showCoursesHub : null;
if (adminPersistOriginalShowCoursesHub) {
	showCoursesHub = function() {
		restorePersistentAdminRole();
		adminPersistOriginalShowCoursesHub();
		injectAdminRoleBanner();
	};
}

// Make reset everything clear Admin too.
const adminPersistOriginalResetEverything = typeof resetEverything === "function" ? resetEverything : null;
if (adminPersistOriginalResetEverything) {
	resetEverything = function() {
		setPersistentAdminRole(false);
		adminPersistOriginalResetEverything();
	};
}

// Admin panel controls: make the state obvious.
const adminPersistOriginalAdminRenderPlanControls = typeof adminRenderPlanControls === "function" ? adminRenderPlanControls : null;
adminRenderPlanControls = function() {
	const current = getCurrentPlan() ? plans[getCurrentPlan()].name : "None";
	const persistentStatus = hasPersistentAdminRole() ? "Admin persistent: ON" : "Admin persistent: OFF";

	return `
		<div class="admin-card">
			<h3>Rank / Plan Control</h3>
			<p>Current rank: <strong>${current}</strong></p>
			<p><strong>${persistentStatus}</strong></p>
			<div class="actions">
				${["free", "plus", "elite", "pro", "proplus", "proplus_lifetime", "admin"].filter(function(planId) {
					return plans[planId];
				}).map(function(planId) {
					return `<button type="button" class="${planId === "admin" ? "secondary" : ""}" onclick="adminSetPlan('${planId}')">${plans[planId].name}</button>`;
				}).join("")}
				<button type="button" class="red" onclick="setPersistentAdminRole(false); showToast('Persistent Admin removed'); renderAdminDashboard('overview');">Remove Admin Persistence</button>
			</div>
		</div>
	`;
};

restorePersistentAdminRole();
setTimeout(injectAdminRoleBanner, 100);


// ---------- Courses removed: Assessments replaces Courses ----------
// Topbar is now Home / Assessments / Levels / Progress.
// Assessments contains Coursework and Exams.
// Courses page is no longer exposed in main navigation.

function showAssessmentsHub() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showCourseworkAccessBrief();
		return;
	}

	app.innerHTML = `
		<section class="panel assessment-main-panel">
			<div class="assessment-main-hero">
				<span class="badge">Assessments</span>
				<h2>Coursework and Exams</h2>
				<p>
					This section replaces the old Courses button. Coursework is for hard practical submissions.
					Exams are for formal checks and review tasks. Levels still control the full academy route.
				</p>

				<div class="assessment-subnav">
					<button type="button" class="active" onclick="showAssessmentsHub()">Overview</button>
					<button type="button" onclick="showPracticalCoursework()">Coursework</button>
					<button type="button" onclick="showCourseworkExams()">Exams</button>
					<button type="button" onclick="showLevelHub()">Levels</button>
				</div>

				<div class="assessment-note">
					<strong>Clean structure:</strong> Assessments contains Coursework + Exams. Courses has been removed from the top bar.
				</div>

				<div class="assessment-main-grid">
					<button type="button" class="assessment-main-card" onclick="showPracticalCoursework()">
						<h3>Coursework</h3>
						<p>Hard practical tasks used to prove actual skill before moving forward.</p>
						<ul>
							<li>Build evidence</li>
							<li>Debug evidence</li>
							<li>Reflection evidence</li>
							<li>File proof</li>
							<li>Level gate submissions</li>
						</ul>
					</button>

					<button type="button" class="assessment-main-card exam" onclick="showCourseworkExams()">
						<h3>Exams</h3>
						<p>Review checks that test whether the learner understood the level properly.</p>
						<ul>
							<li>Knowledge checks</li>
							<li>Written reasoning</li>
							<li>Level reviews</li>
							<li>Plan-gated progression</li>
						</ul>
					</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("assessments");
	if (typeof injectAdminRoleBanner === "function") injectAdminRoleBanner();
}

// Coursework top-level button is no longer in topbar, but old calls should go to Assessments.
function showCourseworkHub() {
	showAssessmentsHub();
}

// Keep practical coursework and exams available inside Assessments.
const assessmentOriginalShowPracticalCoursework = typeof showPracticalCoursework === "function" ? showPracticalCoursework : null;
showPracticalCoursework = function() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showCourseworkAccessBrief();
		return;
	}

	if (assessmentOriginalShowPracticalCoursework) {
		assessmentOriginalShowPracticalCoursework();

		const panel = app.querySelector(".panel");
		if (panel && !panel.querySelector(".assessment-subnav")) {
			panel.insertAdjacentHTML("afterbegin", `
				<div class="assessment-subnav">
					<button type="button" onclick="showAssessmentsHub()">Assessments</button>
					<button type="button" class="active" onclick="showPracticalCoursework()">Coursework</button>
					<button type="button" onclick="showCourseworkExams()">Exams</button>
				</div>
			`);
		}

		return;
	}
};

const assessmentOriginalShowCourseworkExams = typeof showCourseworkExams === "function" ? showCourseworkExams : null;
showCourseworkExams = function() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	if (typeof hasPlan === "function" && !hasPlan()) {
		showCourseworkAccessBrief();
		return;
	}

	if (assessmentOriginalShowCourseworkExams) {
		assessmentOriginalShowCourseworkExams();

		const panel = app.querySelector(".panel");
		if (panel && !panel.querySelector(".assessment-subnav")) {
			panel.insertAdjacentHTML("afterbegin", `
				<div class="assessment-subnav">
					<button type="button" onclick="showAssessmentsHub()">Assessments</button>
					<button type="button" onclick="showPracticalCoursework()">Coursework</button>
					<button type="button" class="active" onclick="showCourseworkExams()">Exams</button>
				</div>
			`);
		}

		return;
	}
};

// Disable old visible Courses route from topbar. If opened internally, redirect to Levels.
function showCoursesHub() {
	showLevelHub();
}

// Stable topbar binding.
function bindAssessmentTopbar() {
	const home = document.getElementById("navHome");
	const assessments = document.getElementById("navAssessments");
	const levels = document.getElementById("navLevels");
	const progress = document.getElementById("navProgress");

	const courses = document.getElementById("navCourses");
	const coursework = document.getElementById("navCoursework");
	if (courses) courses.remove();
	if (coursework) coursework.remove();

	if (home) home.onclick = showHome;
	if (assessments) assessments.onclick = showAssessmentsHub;
	if (levels) levels.onclick = showLevelHub;
	if (progress) progress.onclick = showProgress;
}

bindAssessmentTopbar();
document.addEventListener("DOMContentLoaded", bindAssessmentTopbar);
setTimeout(bindAssessmentTopbar, 100);
setTimeout(bindAssessmentTopbar, 500);

// Repair if older scripts mutate nav.
const assessmentNavObserver = new MutationObserver(function() {
	bindAssessmentTopbar();
});
setTimeout(function() {
	const nav = document.querySelector(".nav-actions");
	if (nav) {
		assessmentNavObserver.observe(nav, { childList: true, subtree: true });
	}
}, 100);


// ---------- Expanded lesson/coursework/exam content pack ----------
// Adds richer lesson slot details, stronger coursework briefs, and more exam/review tasks.
// This does not reintroduce a top-bar Courses page.

const expandedLevelLessonDetails = {
	1: [
		{ title: "Studio Interface Mastery", objective: "Understand every beginner-facing Roblox Studio window and why it matters.", theory: "A learner who cannot control Studio will struggle even with simple scripts. This lesson focuses on Explorer, Properties, Output, Viewport, Toolbox, Play controls, and how each window supports the creation workflow.", practical: "Open every required window, select a Part, change five properties, test in Play mode, and write what changed.", evidence: ["Screenshot the Studio layout.", "Explain Explorer, Properties, and Output.", "List five properties changed."] },
		{ title: "Explorer Hierarchy Discipline", objective: "Build the habit of clean object organisation.", theory: "Explorer is the skeleton of a Roblox project. Clean hierarchy reduces bugs, makes scripts easier, and stops projects becoming chaotic as they grow.", practical: "Create a project hierarchy with Map, Interactables, UI, Systems, and SharedAssets folders.", evidence: ["Screenshot Explorer.", "Explain each folder.", "Rename ten objects clearly."] },
		{ title: "Properties Deep Control", objective: "Understand how object settings change behaviour and appearance.", theory: "Properties are not decoration. They control physics, visibility, collision, rendering, names, colours, and how scripts interact with objects.", practical: "Make a platform, glass wall, invisible trigger, and decorative part using different properties.", evidence: ["List properties used.", "Explain Anchored and CanCollide.", "Explain Transparency use."] },
		{ title: "Part Building Foundations", objective: "Use basic parts to construct clean prototypes.", theory: "Most good Roblox systems can be prototyped with simple parts before custom assets exist. Blockouts allow fast testing.", practical: "Build a small training room using at least 20 named parts.", evidence: ["Screenshot the room.", "Explain scale choices.", "List grouped models."] },
		{ title: "Anchoring and Collision Lab", objective: "Control physics behaviour deliberately.", theory: "Anchored and CanCollide shape how the player interacts with the world. Wrong values create falling maps, blocked paths, and broken triggers.", practical: "Create three objects: solid platform, non-colliding hologram, invisible trigger.", evidence: ["Explain each object.", "Test in Play mode.", "Document one mistake."] },
		{ title: "Services Map", objective: "Understand core Roblox services.", theory: "Workspace, StarterGui, ServerScriptService, ReplicatedStorage, Lighting, and StarterPlayer each have a purpose. Good placement prevents broken systems.", practical: "Create labelled example objects inside five services and explain their purpose.", evidence: ["Screenshot services.", "Explain what belongs where.", "Identify one wrong placement."] },
		{ title: "Play Testing Routine", objective: "Build the habit of testing small changes frequently.", theory: "Testing only at the end creates large bug piles. Good creators test small, fix small, and continue.", practical: "Make three small changes and test after each one.", evidence: ["Write test results.", "Log one issue found.", "Explain the fix."] },
		{ title: "Output Window Basics", objective: "Read print messages and errors.", theory: "Output is the first debugging tool. It shows prints, warnings, and errors with line clues.", practical: "Create a print test and one intentional error, then fix it.", evidence: ["Copy the error message.", "Explain the line problem.", "Show the fixed result."] },
		{ title: "Model Grouping", objective: "Group related objects properly.", theory: "Models make structures reusable and easier to move. A door system or room should not remain as scattered objects.", practical: "Group a room, door frame, and platform into separate Models.", evidence: ["List model names.", "Explain why grouping helps.", "Move a model as one unit."] },
		{ title: "Naming Standards", objective: "Use names that make scripts and teamwork easier.", theory: "Names like Part and Model are useless in bigger projects. Names should communicate purpose.", practical: "Rename a messy project using clear names and prefixes.", evidence: ["Before/after name examples.", "Explain naming rules.", "List ten final names."] },
		{ title: "Lighting Basics", objective: "Set atmosphere without overcomplicating visuals.", theory: "Lighting controls mood and readability. Beginners should learn brightness, shadows, ambient colour, and time of day carefully.", practical: "Create two lighting moods for the same room.", evidence: ["Screenshot both moods.", "Explain the better one.", "Mention performance caution."] },
		{ title: "Spawn and Player Flow", objective: "Think from the player’s start position.", theory: "A game must make sense from spawn. Players need orientation, goals, and clear paths.", practical: "Place a spawn and guide path through your training room.", evidence: ["Describe the route.", "Test as player.", "Fix one confusing area."] },
		{ title: "Blockout to Polish", objective: "Separate rough structure from final decoration.", theory: "Blockouts are fast, ugly, and useful. Polish comes after scale and flow work.", practical: "Make a rough area, then add one polish pass.", evidence: ["Show rough vs improved.", "Explain what changed.", "Avoid over-detailing."] },
		{ title: "Toolbox Safety", objective: "Use assets carefully without relying on them.", theory: "Toolbox can help, but free models may include messy scripts or poor structure. Beginners must inspect before trusting.", practical: "Inspect one toolbox model and identify risk areas.", evidence: ["List objects inside.", "Check for scripts.", "Explain whether you would use it."] },
		{ title: "UI Placement Basics", objective: "Understand where UI belongs before coding it.", theory: "ScreenGui belongs in StarterGui for player UI. UI objects need hierarchy, naming, and layout.", practical: "Create a simple MainMenu ScreenGui with a Frame and two buttons.", evidence: ["Screenshot Explorer.", "Explain ScreenGui hierarchy.", "Name UI objects clearly."] },
		{ title: "Project Cleanup", objective: "Remove clutter and prepare for scripting.", theory: "Messy prototypes become harder to script. Cleanup is a real development skill.", practical: "Clean a test project by grouping, renaming, deleting clutter, and checking services.", evidence: ["List cleanup actions.", "Explain one mistake removed.", "Show final hierarchy."] },
		{ title: "Mini Build Review", objective: "Review a small scene like a developer.", theory: "Creators must judge their own work objectively: structure, scale, naming, testing, and usability.", practical: "Review your training room using a checklist.", evidence: ["Score your work.", "Write three improvements.", "Fix one issue."] },
		{ title: "Beginner Documentation", objective: "Write clear build notes.", theory: "Documentation helps you continue later and helps others understand the project.", practical: "Write a short README-style note for your Studio scene.", evidence: ["State purpose.", "List systems.", "List known issues."] },
		{ title: "Foundation Mock Assessment", objective: "Prepare for the hard practical.", theory: "Before the final practical, learners should prove they understand the whole workflow.", practical: "Run through a mock foundation checklist.", evidence: ["Checklist completed.", "Weak areas found.", "Fix plan written."] },
		{ title: "Level 1 Final Prep", objective: "Finish readiness for the practical gate.", theory: "This slot is for final cleanup, not new features. Finish, test, and prepare evidence.", practical: "Finalise the training room and evidence pack.", evidence: ["Final screenshots.", "Test log.", "Submission notes."] }
	],
	2: [
		{ title: "Variables in Game Systems", objective: "Use variables to store gameplay values.", theory: "Variables hold values such as cash, price, health, names, states, and configuration. Scripts become readable when values are named well.", practical: "Make a cash and price check script.", evidence: ["Explain each variable.", "Show success/fail cases.", "Mention = vs ==."] },
		{ title: "Print Debugging", objective: "Use print statements to trace script behaviour.", theory: "Print is a simple but powerful debugging tool. It proves whether code runs and what values exist.", practical: "Add prints before and after a condition.", evidence: ["Screenshot Output.", "Explain printed values.", "Remove unnecessary prints after testing."] },
		{ title: "If Statements", objective: "Control decisions in scripts.", theory: "If statements decide what happens based on conditions. This powers shops, damage, level locks, permissions, and UI logic.", practical: "Create a purchase permission check.", evidence: ["Explain condition.", "Test both branches.", "Use >= correctly."] },
		{ title: "Comparison Operators", objective: "Use ==, ~=, >, <, >=, <= properly.", theory: "Comparisons answer true/false questions. Wrong operators create broken purchases and permissions.", practical: "Write five comparisons and predict results.", evidence: ["List predictions.", "Run script.", "Correct mistakes."] },
		{ title: "Creating Parts with Code", objective: "Spawn and configure objects from scripts.", theory: "Instance.new creates new Roblox objects. Parent makes them appear in the game hierarchy.", practical: "Create five different parts by code.", evidence: ["Use Name, Parent, Size, Position.", "Explain Vector3.", "Test in Play."] },
		{ title: "Properties with Scripts", objective: "Change object behaviour through code.", theory: "Scripts can set the same properties you edit manually. This allows procedural systems.", practical: "Make a part change colour, transparency, and collision.", evidence: ["List properties.", "Explain values.", "Show before/after."] },
		{ title: "Events and Touched", objective: "Respond to player interaction.", theory: "Events let scripts react. Touched fires when physical contact happens.", practical: "Create a touch pad that prints hit.Name.", evidence: ["Explain hit.", "Test with character.", "Prevent spam if possible."] },
		{ title: "Debounce Basics", objective: "Stop repeated event spam.", theory: "Touched can fire many times quickly. Debounce prevents accidental repeated rewards.", practical: "Add debounce to a touch reward.", evidence: ["Show before spam.", "Show after fix.", "Explain boolean state."] },
		{ title: "Functions", objective: "Reuse code blocks.", theory: "Functions organise behaviour and reduce repetition. Good names explain purpose.", practical: "Create reusable reward or message function.", evidence: ["Call it three times.", "Use parameters.", "Explain function call."] },
		{ title: "Parameters", objective: "Pass values into reusable functions.", theory: "Parameters are placeholders. Calls provide real values.", practical: "Make createPart(name, position, colour).", evidence: ["Explain placeholders.", "Show three calls.", "Fix one argument mistake."] },
		{ title: "Tables as Data", objective: "Store related data in structures.", theory: "Tables hold lists and dictionaries. Most serious Lua systems use tables.", practical: "Create a shop item table.", evidence: ["Use name, price, owned.", "Print values.", "Mistype and fix a key."] },
		{ title: "Loops Intro", objective: "Repeat logic safely.", theory: "Loops process lists and repeated actions. They must be controlled to avoid freezing scripts.", practical: "Loop through a list of lesson names or shop items.", evidence: ["Explain ipairs.", "Print each item.", "Avoid infinite loop."] },
		{ title: "LocalScript UI", objective: "Use client scripts for player UI.", theory: "LocalScripts handle player-specific UI, input, and local effects.", practical: "Show/hide a UI with a key and close button.", evidence: ["Explain StarterGui.", "Explain LocalScript.", "Test close button."] },
		{ title: "MouseButton1Click", objective: "React to UI button clicks.", theory: "UI events are different from physical part events. Button clicks are client-side interactions.", practical: "Create a button that opens a panel.", evidence: ["Show code.", "Test click.", "Explain event connection."] },
		{ title: "Client vs Server", objective: "Separate trusted logic from local visuals.", theory: "The server should validate rewards and purchases. The client should manage UI and local input.", practical: "Classify ten actions as server/client.", evidence: ["Explain three server actions.", "Explain three client actions.", "Mention cheating risk."] },
		{ title: "RemoteEvent Concept", objective: "Understand client/server communication.", theory: "RemoteEvents send messages between client and server, but the server must validate.", practical: "Write a plan for a safe shop purchase RemoteEvent.", evidence: ["Client sends request.", "Server checks price.", "Server gives item."] },
		{ title: "Simple Shop System", objective: "Combine variables, tables, functions, and UI.", theory: "A shop is a practical mini-system that reveals whether basics are understood.", practical: "Prototype a basic shop logic flow.", evidence: ["Show table data.", "Show purchase check.", "Explain validation."] },
		{ title: "Bug Fix Sprint", objective: "Practise debugging instead of panicking.", theory: "Debugging is systematic: reproduce, inspect Output, isolate, fix, retest.", practical: "Create and fix two common Lua mistakes.", evidence: ["Document errors.", "Explain fixes.", "Retest results."] },
		{ title: "Core Scripting Review", objective: "Review all key Lua basics.", theory: "Mastery requires connecting concepts, not memorising lines.", practical: "Build a small interactive system.", evidence: ["List concepts used.", "Explain flow.", "Prepare final practical."] },
		{ title: "Level 2 Final Prep", objective: "Prepare for the scripting practical gate.", theory: "Final prep focuses on stability, readability, and evidence quality.", practical: "Clean and test the scripting project.", evidence: ["Final code notes.", "Bug log.", "Submission plan."] }
	]
};

function getExpandedLesson(level, slot) {
	const levelPack = expandedLevelLessonDetails[level];
	if (levelPack && levelPack[slot - 1]) return levelPack[slot - 1];

	const data = getLevelSlot(level, slot);
	const levelDef = levelDefinitions[level - 1];

	return {
		title: data.title,
		objective: "Complete this lesson slot and connect it to the level outcome.",
		theory: levelDef ? levelDef.focus : "This lesson supports the current academy level.",
		practical: "Complete a focused practical task, test it, and write useful evidence.",
		evidence: ["What you built.", "What you tested.", "What you fixed or improved."]
	};
}

function renderExpandedLevelLesson(level, slot) {
	const detail = getExpandedLesson(level, slot);
	const complete = isLevelLessonComplete(level, slot);

	app.innerHTML = `
		<section class="panel">
			<div class="expanded-lesson-card">
				<div class="lesson-topline">
					<p>Level ${level} • Lesson Slot ${slot}</p>
					<span class="badge">${complete ? "Complete" : "Expanded Lesson"}</span>
				</div>

				<h2>${detail.title}</h2>
				<p><strong>Objective:</strong> ${detail.objective}</p>

				<div class="expanded-lesson-block">
					<h3>Detailed Notes</h3>
					<p>${detail.theory}</p>
					<p>This lesson should be treated as a serious training unit. The learner should read the concept, complete the practical, test the result, and write evidence in their own words before marking the slot complete.</p>
				</div>

				<div class="expanded-lesson-block">
					<h3>Practical Task</h3>
					<p>${detail.practical}</p>
				</div>

				<div class="expanded-lesson-block">
					<h3>Evidence Checklist</h3>
					<ul>
						${detail.evidence.map(function(item) { return `<li>${item}</li>`; }).join("")}
					</ul>
				</div>

				<div class="expanded-practical-grid">
					<div class="expanded-practical-card">
						<h4>Build</h4>
						<p>Create or edit something visible, functional, or clearly documented.</p>
					</div>
					<div class="expanded-practical-card">
						<h4>Test</h4>
						<p>Run the work and check whether it behaves as intended.</p>
					</div>
					<div class="expanded-practical-card">
						<h4>Improve</h4>
						<p>Fix at least one issue or explain what would be improved next.</p>
					</div>
				</div>

				<div class="actions">
					<button type="button" class="secondary" onclick="openLevel(${level})">Back to Level</button>
					<button type="button" class="green" onclick="completeLevelSlot(${level}, ${slot})">${complete ? "Already Complete" : "Mark Lesson Complete"}</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("expandedLevelLesson");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

// Override the level lesson opener so every slot has real-looking detailed content.
openLevelLesson = function(level, slot) {
	if (!isLevelUnlocked(level)) {
		showLevelHub();
		return;
	}

	if (slot > 1 && !isLevelLessonComplete(level, slot - 1)) {
		showToast("Complete the previous lesson slot first");
		openLevel(level);
		return;
	}

	renderExpandedLevelLesson(level, slot);
};

function renderExpandedCourseworkDetail(level) {
	const levelDef = levelDefinitions[level - 1];
	const requiredPlan = levelPlanRequirements[level] || "free";
	const planOk = canOpenLevelPlan(level);

	if (!planOk) {
		showPlans();
		return;
	}

	app.innerHTML = `
		<section class="panel">
			<div class="level-gate-panel">
				<div class="course-header">
					<div>
						<span class="badge">Expanded Coursework</span>
						<h2>Level ${level}: ${levelDef.gateTitle}</h2>
						<p>${levelDef.outcome}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="showPracticalCoursework()">All Coursework</button>
						<button type="button" class="secondary" onclick="openLevel(${level})">Level Lessons</button>
					</div>
				</div>

				<div class="expanded-lesson-block">
					<h3>Coursework Stages</h3>
					<p><span class="expanded-coursework-stage">1. Build</span> Create the required project or feature.</p>
					<p><span class="expanded-coursework-stage">2. Test</span> Run it and document behaviour.</p>
					<p><span class="expanded-coursework-stage">3. Debug</span> Fix or explain at least two issues.</p>
					<p><span class="expanded-coursework-stage">4. Evidence</span> Submit written proof and a file.</p>
				</div>

				<div class="expanded-lesson-block">
					<h3>Requirements</h3>
					<ul>
						${levelDef.gateRequirements.map(function(req) { return `<li>${req}</li>`; }).join("")}
						<li>Write what changed between first attempt and final attempt.</li>
						<li>Include a small improvement plan for the next level.</li>
					</ul>
				</div>

				${isLevelReadyForGate(level) || isLevelGateComplete(level)
					? `<div class="actions"><button type="button" class="green" onclick="openLevelGate(${level})">Open Submission Form</button></div>`
					: `<div class="coursework-plan-lock">Complete all 20 lesson slots in this level before submitting.</div>`
				}
			</div>
		</section>
	`;
}

function openCourseworkLevel(level) {
	if (!canOpenLevelPlan(level)) {
		showPlans();
		return;
	}

	renderExpandedCourseworkDetail(level);
}

function showExpandedExam(level) {
	if (!canOpenLevelPlan(level)) {
		showPlans();
		return;
	}

	const levelDef = levelDefinitions[level - 1];
	const practicalDone = isLevelGateComplete(level);

	app.innerHTML = `
		<section class="panel">
			<div class="exam-panel">
				<div class="course-header">
					<div>
						<span class="badge">Expanded Exam Review</span>
						<h2>Level ${level} Exam Review</h2>
						<p>${levelDef.name}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="showCourseworkExams()">All Exams</button>
						<button type="button" class="secondary" onclick="openLevel(${level})">Level Lessons</button>
					</div>
				</div>

				<div class="expanded-exam-question">
					<h4>Question 1: What was the main skill of this level?</h4>
					<label><input type="radio" name="eq1"> Memorising random facts</label>
					<label><input type="radio" name="eq1"> Applying the level's concepts in a practical build</label>
					<label><input type="radio" name="eq1"> Skipping evidence</label>
				</div>

				<div class="expanded-exam-question">
					<h4>Question 2: What proves readiness for the next level?</h4>
					<label><input type="radio" name="eq2"> A hard practical with testing and evidence</label>
					<label><input type="radio" name="eq2"> Clicking complete without work</label>
					<label><input type="radio" name="eq2"> Only watching videos</label>
				</div>

				<div class="expanded-exam-question">
					<h4>Written Review</h4>
					<p>Write a review explaining what you learned, what you built, what broke, and what you would improve next.</p>
					<textarea id="expandedExamWritten" class="exam-written" placeholder="Write a serious review here..."></textarea>
				</div>

				<div class="expanded-lesson-block">
					<h3>Exam Status</h3>
					<p>Practical gate submitted: <strong>${practicalDone ? "Yes" : "No"}</strong></p>
					<p>This is currently a prototype review screen. Later it can become a scored timed exam.</p>
				</div>
			</div>
		</section>
	`;
}

function openCourseworkExamLevel(level) {
	showExpandedExam(level);
}


// ---------- More Levels Expansion ----------
// Expands the bootcamp from 5 levels to 10 levels.
// Levels 1-5 = foundation to capstone.
// Levels 6-10 = advanced creator, publishing, monetisation, business, and mastery.
// Each added level keeps 20 lesson slots + hard practical gate + exams/reviews through Assessments.

const extraLevelDefinitions = [
	{
		level: 6,
		name: "Advanced Roblox Systems",
		focus: "RemoteEvents, ModuleScripts, datastore planning, server validation, scalable systems, and reusable architecture.",
		outcome: "User can plan and prototype safer multiplayer Roblox systems instead of relying on fragile beginner scripts.",
		courses: ["Roblox Lua", "Roblox Studio Basics", "System Design"],
		gateTitle: "Advanced System Practical",
		gateRequirements: [
			"Build a secure client/server interaction system.",
			"Use a ModuleScript or clear reusable system structure.",
			"Use RemoteEvent planning with server-side validation.",
			"Create a data table/config for items, upgrades, or settings.",
			"Document security risks and how the server prevents abuse."
		]
	},
	{
		level: 7,
		name: "UI, UX, and Player Flow",
		focus: "Roblox UI layout, menus, shops, feedback, onboarding, mobile scaling, and user experience design.",
		outcome: "User can design functional, readable, mobile-aware UI that supports gameplay instead of confusing players.",
		courses: ["Roblox UI Design", "Roblox Lua", "Game Design Basics"],
		gateTitle: "UI/UX Practical",
		gateRequirements: [
			"Create a full UI flow with at least three screens or panels.",
			"Include open, close, feedback, and disabled/locked states.",
			"Make the layout readable on different screen sizes.",
			"Explain the player journey from first click to completion.",
			"Test the UI and fix at least two usability issues."
		]
	},
	{
		level: 8,
		name: "VFX, Sound, and Polish",
		focus: "Particles, beams, trails, lighting effects, UI feedback, ambience, sound balancing, and game feel.",
		outcome: "User can make a basic system feel polished through visual, audio, and feedback improvements.",
		courses: ["VFX and Effects", "Sound Design", "Moon Animator"],
		gateTitle: "Polished Feature Practical",
		gateRequirements: [
			"Take a basic feature and add VFX or animation polish.",
			"Add at least three sound/feedback moments.",
			"Use lighting, particles, beams, trails, or tweening carefully.",
			"Compare before/after and explain why the polished version feels better.",
			"Avoid excessive effects that hurt readability or performance."
		]
	},
	{
		level: 9,
		name: "Publishing, Testing, and Live Ops",
		focus: "Roblox publishing, icons, thumbnails, descriptions, update logs, bug testing, analytics mindset, and launch preparation.",
		outcome: "User can prepare a Roblox project for release and manage improvement after feedback.",
		courses: ["Publishing and Testing", "Game Design Basics", "Creator Business Basics"],
		gateTitle: "Launch Preparation Practical",
		gateRequirements: [
			"Prepare a release checklist for a Roblox project.",
			"Create an icon/title/description plan.",
			"Write a proper update log.",
			"Run a bug test pass and document fixes.",
			"Plan how feedback will be collected and used after release."
		]
	},
	{
		level: 10,
		name: "Creator Business Mastery",
		focus: "Ethical monetisation, pricing, analytics, content marketing, support, landing pages, Stripe plans, and long-term creator strategy.",
		outcome: "User can think like a responsible creator-business owner instead of only a builder.",
		courses: ["Roblox Monetisation", "Creator Business Basics", "Content Strategy"],
		gateTitle: "Creator Business Capstone",
		gateRequirements: [
			"Create a monetisation plan that avoids predatory pay-to-win design.",
			"Define free value, paid value, and why users would trust the product.",
			"Create a basic launch/marketing plan.",
			"Write a customer/support policy for refunds, bugs, and complaints.",
			"Present the full creator business plan clearly."
		]
	}
];

extraLevelDefinitions.forEach(function(levelDef) {
	if (!levelDefinitions.some(function(existing) { return existing.level === levelDef.level; })) {
		levelDefinitions.push(levelDef);
	}
});

Object.assign(levelPlanRequirements, {
	6: "proplus",
	7: "proplus",
	8: "proplus",
	9: "proplus",
	10: "proplus"
});

function makeTwentySlots(items) {
	const result = items.slice();

	while (result.length < 20) {
		result.push([null, "Expansion Lesson " + (result.length + 1)]);
	}

	return result.slice(0, 20);
}

levelLessonTemplates[6] = makeTwentySlots([
	[null, "RemoteEvents Concept"],
	[null, "Server Validation"],
	[null, "Client Request Safety"],
	[null, "ModuleScript Basics"],
	[null, "System Configuration Tables"],
	[null, "Reusable Service Modules"],
	[null, "Upgrade System Architecture"],
	[null, "Shop Purchase Validation"],
	[null, "Anti-Exploit Thinking"],
	[null, "Cooldowns and Rate Limits"],
	[null, "Basic DataStore Planning"],
	[null, "Save Data Shape"],
	[null, "Loading and Error States"],
	[null, "Server Authority Review"],
	[null, "Multiplayer Test Plan"],
	[null, "System Debug Sprint"],
	[null, "Refactor Practice"],
	[null, "Advanced System Review"],
	[null, "Security Evidence Pack"],
	[null, "Level 6 Readiness Check"]
]);

levelLessonTemplates[7] = makeTwentySlots([
	[null, "UI Layout Foundations"],
	[null, "Scale vs Offset"],
	[null, "AnchorPoint"],
	[null, "Frames and Panels"],
	[null, "Buttons and Feedback"],
	[null, "Shop UI Flow"],
	[null, "Settings UI"],
	[null, "Mobile Readability"],
	[null, "UI States"],
	[null, "Locked/Unlocked Visuals"],
	[null, "Menu Animation"],
	[null, "Error and Success Feedback"],
	[null, "Player Onboarding"],
	[null, "Tutorial Flow"],
	[null, "Accessibility Basics"],
	[null, "UI Testing Checklist"],
	[null, "UX Bug Fixes"],
	[null, "UI Polish Pass"],
	[null, "UI Evidence Pack"],
	[null, "Level 7 Readiness Check"]
]);

levelLessonTemplates[8] = makeTwentySlots([
	[null, "Game Feel Basics"],
	[null, "TweenService Polish"],
	[null, "Particle Effects"],
	[null, "Beams and Trails"],
	[null, "Impact Feedback"],
	[null, "Button Sounds"],
	[null, "Ambience Layers"],
	[null, "SoundService Basics"],
	[null, "Volume Balancing"],
	[null, "Lighting Effects"],
	[null, "Ability VFX"],
	[null, "UI Micro-Feedback"],
	[null, "Before/After Polish"],
	[null, "Performance-Friendly Effects"],
	[null, "Animation Timing Polish"],
	[null, "Effect Debugging"],
	[null, "Readability Review"],
	[null, "Polish Evidence Pack"],
	[null, "Feature Showcase"],
	[null, "Level 8 Readiness Check"]
]);

levelLessonTemplates[9] = makeTwentySlots([
	[null, "Publishing Checklist"],
	[null, "Game Title and Description"],
	[null, "Icon Planning"],
	[null, "Thumbnail Planning"],
	[null, "First-Time User Test"],
	[null, "Bug Report Template"],
	[null, "Update Log Writing"],
	[null, "Version Notes"],
	[null, "Performance Testing"],
	[null, "Device Testing"],
	[null, "Friend Test Session"],
	[null, "Feedback Collection"],
	[null, "Fix Priority Ranking"],
	[null, "Soft Launch Plan"],
	[null, "Analytics Mindset"],
	[null, "Retention Review"],
	[null, "Launch Risk Check"],
	[null, "Release Evidence Pack"],
	[null, "Post-Launch Plan"],
	[null, "Level 9 Readiness Check"]
]);

levelLessonTemplates[10] = makeTwentySlots([
	[null, "Creator Business Basics"],
	[null, "Free Value vs Paid Value"],
	[null, "Ethical Monetisation"],
	[null, "Gamepasses"],
	[null, "Developer Products"],
	[null, "Pricing Strategy"],
	[null, "Avoiding Predatory Design"],
	[null, "Landing Page Basics"],
	[null, "Stripe Plan Structure"],
	[null, "Support and Refund Policy"],
	[null, "Customer Trust"],
	[null, "Brand Positioning"],
	[null, "Content Marketing"],
	[null, "TikTok/YouTube Funnel"],
	[null, "Community Feedback"],
	[null, "Basic Metrics"],
	[null, "Revenue vs Reputation"],
	[null, "Business Risk Review"],
	[null, "Creator Business Plan"],
	[null, "Final Academy Mastery Review"]
]);

const extraExpandedLessonDetails = {
	6: [
		["RemoteEvents Concept", "Learn how client and server communicate without trusting the client blindly.", "RemoteEvents are useful but dangerous if misunderstood. The client can request an action, but the server must decide whether that action is allowed.", "Write a safe purchase flow plan using client request and server validation."],
		["Server Validation", "Make the server the authority for rewards and purchases.", "A good system does not let the client decide money, ownership, or rewards. The server checks price, ownership, cooldown, and permissions.", "Create a validation checklist for a shop or upgrade system."],
		["Client Request Safety", "Understand what data the client should send.", "The client should send minimal requests, not trusted outcomes. For example, send itemId, not 'give me item'.", "Write three bad client requests and safer replacements."],
		["ModuleScript Basics", "Organise reusable logic into modules.", "ModuleScripts keep larger projects clean by separating configuration and reusable functions.", "Plan one module for shop config, ranks, or upgrades."],
		["System Configuration Tables", "Use tables as clean system data.", "Configuration tables let systems scale without rewriting logic for every item.", "Build a config table with at least five items and settings."]
	],
	7: [
		["UI Layout Foundations", "Design clear screen layouts.", "Good UI guides the player without crowding the screen. Layout should be obvious, readable, and responsive.", "Sketch or build a three-panel UI layout."],
		["Scale vs Offset", "Understand responsive sizing.", "Scale adapts to screen size while Offset uses pixels. Mobile-friendly UI needs careful use of both.", "Convert a bad fixed-size UI into a more responsive one."],
		["AnchorPoint", "Control where UI elements position from.", "AnchorPoint changes the origin of UI objects. It is essential for centering, popups, and consistent placement.", "Create a centered modal panel and explain why it stays centered."],
		["Buttons and Feedback", "Make button interactions obvious.", "Players need feedback when they click, hover, buy, fail, or unlock something.", "Add visual feedback states to a UI button plan."],
		["Player Onboarding", "Guide first-time users.", "A good game teaches the first action quickly. Confused users leave.", "Create a three-step onboarding flow."]
	],
	8: [
		["Game Feel Basics", "Turn working features into satisfying features.", "Game feel comes from timing, feedback, effects, audio, and clarity. A system can work but still feel dead.", "Take one basic action and list five ways to improve feel."],
		["TweenService Polish", "Use smooth motion carefully.", "Tweening makes UI and objects feel more polished, but overuse can slow clarity.", "Plan a tween for a menu, button, or platform."],
		["Particle Effects", "Use particles for readable impact.", "Particles should support gameplay feedback, not cover the screen randomly.", "Design a small particle effect for a reward or hit impact."],
		["SoundService Basics", "Use sound as feedback.", "Sound helps players understand actions. Volume balance matters more than loudness.", "Plan sounds for button click, reward, error, and ambience."],
		["Performance-Friendly Effects", "Avoid excessive visual clutter.", "Effects should be controlled, timed, and readable.", "Review one effect and reduce unnecessary intensity."]
	],
	9: [
		["Publishing Checklist", "Prepare a game for public release.", "Publishing is more than clicking release. A game needs description, icon, thumbnail, testing, and update plans.", "Create a launch checklist."],
		["Game Title and Description", "Make the game understandable quickly.", "Players decide quickly whether they understand the game. Titles and descriptions must be clear.", "Write three title options and one final description."],
		["Bug Report Template", "Collect useful bug information.", "Bad bug reports waste time. Good ones include steps, expected result, actual result, device, and screenshots.", "Write a bug report form."],
		["Update Log Writing", "Communicate changes professionally.", "Update logs build trust and help players see progress.", "Write an update log for a pretend patch."],
		["Feedback Collection", "Use feedback without blindly obeying it.", "Feedback helps, but creators must filter for patterns and real issues.", "Create a feedback review table."]
	],
	10: [
		["Creator Business Basics", "Think about product, audience, trust, and delivery.", "A creator business needs more than a payment link. It needs value, support, clarity, and reputation.", "Write a one-page business concept."],
		["Free Value vs Paid Value", "Separate fair free content from paid upgrades.", "Paid features should add value without making the free product worthless.", "List what stays free and what could be paid."],
		["Ethical Monetisation", "Avoid manipulative systems.", "Good monetisation respects players and avoids pressure traps.", "Review a monetisation idea and remove unfair parts."],
		["Stripe Plan Structure", "Understand plan tiers and access logic.", "Payment tiers need clear value and clean access rules.", "Write plan benefits for Free, Plus, Pro, and Pro+."],
		["Customer Trust", "Protect long-term reputation.", "Trust is built through honesty, support, bug fixes, and clear terms.", "Write a support policy for users."]
	]
};

Object.keys(extraExpandedLessonDetails).forEach(function(levelKey) {
	const level = Number(levelKey);
	expandedLevelLessonDetails[level] = makeTwentySlots(
		extraExpandedLessonDetails[level].map(function(item) {
			return {
				title: item[0],
				objective: item[1],
				theory: item[2],
				practical: item[3],
				evidence: [
					"What you built or planned.",
					"What you tested or reviewed.",
					"What you would improve next."
				]
			};
		})
	).map(function(item, index) {
		if (Array.isArray(item)) {
			return {
				title: item[1] || "Expansion Lesson " + (index + 1),
				objective: "Complete this expansion lesson.",
				theory: "This lesson supports the advanced academy level.",
				practical: "Complete a focused practical task.",
				evidence: ["Build evidence.", "Test evidence.", "Reflection evidence."]
			};
		}
		return item;
	});
});

// Improve Level Hub copy to mention 10 levels.
const moreLevelsOriginalShowLevelHub = showLevelHub;
showLevelHub = function() {
	moreLevelsOriginalShowLevelHub();

	const panel = app.querySelector(".level-hub-panel, .panel");
	if (panel && !panel.querySelector(".level-expansion-note")) {
		panel.insertAdjacentHTML("afterbegin", `
			<div class="level-expansion-note">
				<strong>Expanded Academy:</strong> this prototype now has 10 levels, each with 20 lesson slots and a hard practical gate.
				Levels 6-10 cover advanced systems, UI/UX, polish, publishing, and creator business mastery.
			</div>
		`);
	}

	document.querySelectorAll(".level-card").forEach(function(card, index) {
		const levelNumber = index + 1;
		if (levelNumber >= 6 && levelNumber <= 8) card.classList.add("mastery");
		if (levelNumber >= 9) card.classList.add("business");
	});
};

// Make admin reset handle the added levels.
adminResetLevels = function() {
	for (let level = 1; level <= academyLevelCount; level++) {
		localStorage.removeItem(getLevelGateKey(level));

		for (let slot = 1; slot <= lessonsPerLevel; slot++) {
			localStorage.removeItem(getLevelLessonKey(level, slot));
		}
	}

	showToast("All 10 academy levels reset");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
};


// ---------- Level sections / second tab unlock ----------
// Each level now has:
// 1. Lessons tab - available immediately.
// 2. Workshop tab - unlocks after 15 completed lesson slots.
// 3. Final Gate tab - available after 20 lesson slots.
// This makes the level structure more useful than one long lesson list.

const workshopUnlockLessonCount = 15;
const gateUnlockLessonCount = 20;

const levelWorkshopTemplates = [
	{
		id: "project-brief",
		title: "Project Brief",
		type: "Planning",
		description: "Turn the level topic into a clear build/project plan.",
		requirements: [
			"Write the main project goal.",
			"List the features or assets needed.",
			"Define what counts as finished."
		]
	},
	{
		id: "debug-drill",
		title: "Debug Drill",
		type: "Problem Solving",
		description: "Find, explain, or intentionally create a mistake related to this level.",
		requirements: [
			"Identify the problem.",
			"Explain why it happens.",
			"Write the fix or prevention method."
		]
	},
	{
		id: "evidence-pack",
		title: "Evidence Pack",
		type: "Submission Prep",
		description: "Prepare screenshots, notes, and proof for the final practical.",
		requirements: [
			"Collect proof screenshots or clips.",
			"Write build/debug notes.",
			"Prepare final evidence wording."
		]
	},
	{
		id: "exam-prep",
		title: "Exam Prep",
		type: "Review",
		description: "Review the level concepts before the exam/review section.",
		requirements: [
			"Write five key terms.",
			"Answer three review questions.",
			"Explain one weak area."
		]
	},
	{
		id: "extension-task",
		title: "Extension Task",
		type: "Challenge",
		description: "Add one extra improvement beyond the minimum level requirements.",
		requirements: [
			"Pick one optional improvement.",
			"Build or plan it.",
			"Explain why it improves the final project."
		]
	}
];

function getWorkshopTaskKey(level, taskId) {
	return "creatorAcademy.levelWorkshop." + level + "." + taskId;
}

function isWorkshopTaskComplete(level, taskId) {
	return localStorage.getItem(getWorkshopTaskKey(level, taskId)) === "true";
}

function setWorkshopTaskComplete(level, taskId, value) {
	if (value) {
		localStorage.setItem(getWorkshopTaskKey(level, taskId), "true");
	} else {
		localStorage.removeItem(getWorkshopTaskKey(level, taskId));
	}
}

function getWorkshopCompletion(level) {
	let complete = 0;

	levelWorkshopTemplates.forEach(function(task) {
		if (isWorkshopTaskComplete(level, task.id)) complete++;
	});

	return {
		complete: complete,
		total: levelWorkshopTemplates.length,
		percent: Math.round((complete / levelWorkshopTemplates.length) * 100)
	};
}

function isWorkshopUnlocked(level) {
	return getLevelLessonCompletion(level).complete >= workshopUnlockLessonCount;
}

function isFinalGateTabUnlocked(level) {
	return getLevelLessonCompletion(level).complete >= gateUnlockLessonCount;
}

function openLevel(level, tab) {
	if (!isLevelUnlocked(level)) {
		showToast("Level locked. Complete the previous hard practical or upgrade plan.");
		showLevelHub();
		return;
	}

	const selectedTab = tab || "lessons";
	const levelDef = levelDefinitions[level - 1];
	const progress = getLevelLessonCompletion(level);
	const workshop = getWorkshopCompletion(level);
	const gateComplete = isLevelGateComplete(level);
	const workshopUnlocked = isWorkshopUnlocked(level);
	const gateUnlocked = isFinalGateTabUnlocked(level);

	if (selectedTab === "workshop" && !workshopUnlocked) {
		showToast("Workshop unlocks after 15 completed lessons.");
		tab = "lessons";
	}

	if (selectedTab === "gate" && !gateUnlocked && !gateComplete) {
		showToast("Final Gate unlocks after all 20 lessons.");
		tab = "lessons";
	}

	const actualTab = (selectedTab === "workshop" && workshopUnlocked) || selectedTab === "gate" ? selectedTab : "lessons";

	app.innerHTML = `
		<section class="panel">
			<div class="course-header">
				<div>
					<span class="badge">Level ${level}</span>
					<h2>${levelDef.name}</h2>
					<p>${levelDef.outcome}</p>
				</div>
				<div class="actions">
					<button type="button" class="secondary" onclick="showLevelHub()">All Levels</button>
					<button type="button" onclick="openLevelGate(${level})">${gateComplete ? "Review Practical" : "Hard Practical Gate"}</button>
				</div>
			</div>

			<div class="level-summary-panel">
				<h3>Level Progress</h3>
				<p>
					<strong>${progress.complete}/${progress.total}</strong> lessons complete.
					Workshop unlocks at <strong>15 lessons</strong>.
					Final Gate unlocks at <strong>20 lessons</strong>.
				</p>
				<div class="level-progress-bar">
					<div class="level-progress-fill" style="width: ${progress.percent}%"></div>
				</div>
				<p>Workshop tasks: <strong>${workshop.complete}/${workshop.total}</strong> complete.</p>
			</div>

			<div class="level-section-tabs">
				<button type="button" class="${actualTab === "lessons" ? "active" : ""}" onclick="openLevel(${level}, 'lessons')">Lessons</button>
				<button type="button" class="${actualTab === "workshop" ? "active" : ""} ${workshopUnlocked ? "" : "locked"}" onclick="openLevel(${level}, 'workshop')">Workshop ${workshopUnlocked ? "" : "(15 lessons)"}</button>
				<button type="button" class="${actualTab === "gate" ? "active" : ""} ${gateUnlocked || gateComplete ? "" : "locked"}" onclick="openLevel(${level}, 'gate')">Final Gate ${gateUnlocked || gateComplete ? "" : "(20 lessons)"}</button>
			</div>

			${renderLevelSectionContent(level, actualTab)}
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("level");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function renderLevelSectionContent(level, tab) {
	if (tab === "workshop") return renderLevelWorkshopSection(level);
	if (tab === "gate") return renderLevelFinalGateSection(level);
	return renderLevelLessonsSection(level);
}

function renderLevelLessonsSection(level) {
	return `
		<div class="level-section-progress">
			<strong>Lesson Route:</strong> complete lesson slots in order. At 15 lessons, the Workshop tab unlocks. At 20 lessons, the Final Gate unlocks.
		</div>

		<div class="lesson-slot-grid">
			${Array.from({ length: lessonsPerLevel }, function(_, index) {
				return renderLevelLessonSlot(level, index + 1);
			}).join("")}
		</div>
	`;
}

function renderLevelWorkshopSection(level) {
	const levelDef = levelDefinitions[level - 1];
	const workshop = getWorkshopCompletion(level);

	return `
		<div class="level-section-progress">
			<strong>Workshop unlocked.</strong> This section turns the level into a proper project process before the final coursework gate.
			Progress: <strong>${workshop.complete}/${workshop.total}</strong> workshop tasks complete.
		</div>

		<div class="level-workshop-grid">
			${levelWorkshopTemplates.map(function(task) {
				return renderWorkshopTaskCard(level, levelDef, task);
			}).join("")}
		</div>
	`;
}

function renderWorkshopTaskCard(level, levelDef, task) {
	const complete = isWorkshopTaskComplete(level, task.id);

	return `
		<button type="button" class="level-workshop-card ${complete ? "complete" : ""}" onclick="openWorkshopTask(${level}, '${task.id}')">
			<span class="level-workshop-tag">${task.type} • ${complete ? "Complete" : "Available"}</span>
			<h3>${task.title}</h3>
			<p>${task.description}</p>
			<ul>
				${task.requirements.map(function(req) {
					return `<li>${req}</li>`;
				}).join("")}
			</ul>
		</button>
	`;
}

function openWorkshopTask(level, taskId) {
	if (!isWorkshopUnlocked(level)) {
		showToast("Workshop unlocks after 15 completed lessons.");
		openLevel(level, "lessons");
		return;
	}

	const levelDef = levelDefinitions[level - 1];
	const task = levelWorkshopTemplates.find(function(item) {
		return item.id === taskId;
	});

	if (!task) {
		openLevel(level, "workshop");
		return;
	}

	const complete = isWorkshopTaskComplete(level, taskId);

	app.innerHTML = `
		<section class="panel">
			<div class="level-workshop-panel">
				<div class="course-header">
					<div>
						<span class="badge">Level ${level} Workshop</span>
						<h2>${task.title}</h2>
						<p>${levelDef.name} • ${task.type}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="openLevel(${level}, 'workshop')">Back to Workshop</button>
						<button type="button" class="secondary" onclick="openLevel(${level}, 'lessons')">Lessons</button>
					</div>
				</div>

				<p>${task.description}</p>

				<div class="level-mini-section-grid">
					<div class="level-mini-section-card">
						<h4>Goal</h4>
						<p>Connect this task to the level outcome: ${levelDef.outcome}</p>
					</div>
					<div class="level-mini-section-card">
						<h4>Status</h4>
						<p>${complete ? "This workshop task is complete." : "Complete the task, then mark it done."}</p>
					</div>
					<div class="level-mini-section-card">
						<h4>Why it matters</h4>
						<p>This section prepares the learner for the final practical instead of jumping straight from lessons to submission.</p>
					</div>
				</div>

				<div class="expanded-lesson-block">
					<h3>Requirements</h3>
					<ul>
						${task.requirements.map(function(req) {
							return `<li>${req}</li>`;
						}).join("")}
					</ul>
				</div>

				<div class="expanded-lesson-block">
					<h3>Evidence Prompt</h3>
					<p>Write what you planned, built, tested, improved, or prepared. This does not submit the final coursework yet; it prepares you for it.</p>
				</div>

				<div class="actions">
					<button type="button" class="green" onclick="completeWorkshopTask(${level}, '${task.id}')">${complete ? "Already Complete" : "Mark Workshop Task Complete"}</button>
					${complete ? `<button type="button" class="secondary" onclick="undoWorkshopTask(${level}, '${task.id}')">Undo Complete</button>` : ""}
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("workshopTask");
	if (typeof forceAddExitRow === "function") forceAddExitRow();
}

function completeWorkshopTask(level, taskId) {
	setWorkshopTaskComplete(level, taskId, true);
	showToast("Workshop task complete");
	openLevel(level, "workshop");
}

function undoWorkshopTask(level, taskId) {
	setWorkshopTaskComplete(level, taskId, false);
	showToast("Workshop task undone");
	openLevel(level, "workshop");
}

function renderLevelFinalGateSection(level) {
	const gateComplete = isLevelGateComplete(level);
	const ready = isLevelReadyForGate(level);
	const workshop = getWorkshopCompletion(level);
	const levelDef = levelDefinitions[level - 1];

	return `
		<div class="level-section-progress">
			<strong>Final Gate:</strong> this is the hard practical that unlocks the next level.
			Workshop progress: <strong>${workshop.complete}/${workshop.total}</strong>.
		</div>

		${renderLevelGatePreview(level)}

		<div class="level-gate-panel">
			<h3>Recommended before submitting</h3>
			<ul>
				<li>Complete all 20 lesson slots.</li>
				<li>Complete the 5 workshop tasks.</li>
				<li>Prepare screenshots/video proof.</li>
				<li>Write build, debug, and reflection evidence.</li>
			</ul>

			<div class="actions">
				<button type="button" ${ready || gateComplete ? "" : "disabled"} onclick="openLevelGate(${level})">${gateComplete ? "Review Submitted Gate" : "Open Submission Form"}</button>
			</div>
		</div>
	`;
}

// Practical coursework cards now respect the new tabs.
function openCourseworkLevel(level) {
	if (!canOpenLevelPlan(level)) {
		showPlans();
		return;
	}

	if (isLevelReadyForGate(level) || isLevelGateComplete(level)) {
		openLevel(level, "gate");
		return;
	}

	if (isWorkshopUnlocked(level)) {
		openLevel(level, "workshop");
		return;
	}

	openLevel(level, "lessons");
}

// Admin helper: complete to workshop unlock.
function adminUnlockCurrentLevelWorkshop() {
	const level = getCurrentLevel();

	for (let slot = 1; slot <= workshopUnlockLessonCount; slot++) {
		markLevelLessonComplete(level, slot);
	}

	showToast("Workshop unlocked for current level");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}

// Patch admin overview with workshop helper if possible.
if (typeof renderAdminOverview === "function") {
	const levelSectionsOriginalAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = levelSectionsOriginalAdminOverview();

		const card = `
			<div class="admin-card">
				<h3>Level Section Control</h3>
				<p>Workshop tab unlocks after 15 lesson slots. Final Gate unlocks after 20.</p>
				<div class="actions">
					<button type="button" onclick="adminUnlockCurrentLevelWorkshop()">Unlock Current Workshop</button>
					<button type="button" class="secondary" onclick="adminCompleteCurrentLevel()">Complete Current Level</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${card}`);
	};
}


// ---------- XP System + Leaderboard ----------
// Local prototype only. Real leaderboard needs backend accounts/database.
// XP is based on progress plus detail quality in notes/evidence/reviews.

const XP_STORAGE_KEY = "creatorAcademy.xpProfile";
const XP_CLAIMS_KEY = "creatorAcademy.xpClaims";
const XP_HISTORY_KEY = "creatorAcademy.xpHistory";
const XP_NAME_KEY = "creatorAcademy.leaderboardName";

const xpRanks = [
	{ name: "Rookie", min: 0 },
	{ name: "Apprentice", min: 250 },
	{ name: "Builder", min: 750 },
	{ name: "Scripter", min: 1500 },
	{ name: "Creator", min: 3000 },
	{ name: "Developer", min: 5500 },
	{ name: "Architect", min: 8500 },
	{ name: "Pro Creator", min: 12000 },
	{ name: "Academy Elite", min: 17000 },
	{ name: "World Class", min: 24000 }
];

const xpRules = {
	lesson: 40,
	workshop: 120,
	levelGateBase: 500,
	examReviewBase: 250,
	notesMilestone: 30,
	detailedBonusMax: 450
};

function xpLoadJson(key, fallback) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch (error) {
		return fallback;
	}
}

function xpSaveJson(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getXpProfile() {
	return Object.assign({
		xp: 0,
		totalEarned: 0,
		lessonsCompleted: 0,
		workshopsCompleted: 0,
		gatesCompleted: 0,
		examsCompleted: 0,
		detailXp: 0
	}, xpLoadJson(XP_STORAGE_KEY, {}));
}

function saveXpProfile(profile) {
	xpSaveJson(XP_STORAGE_KEY, profile);
}

function getXpClaims() {
	return xpLoadJson(XP_CLAIMS_KEY, {});
}

function saveXpClaims(claims) {
	xpSaveJson(XP_CLAIMS_KEY, claims);
}

function getXpHistory() {
	return xpLoadJson(XP_HISTORY_KEY, []);
}

function saveXpHistory(history) {
	xpSaveJson(XP_HISTORY_KEY, history.slice(0, 80));
}

function getLeaderboardName() {
	return localStorage.getItem(XP_NAME_KEY) || "You";
}

function setLeaderboardName(name) {
	const clean = String(name || "You").trim().slice(0, 24) || "You";
	localStorage.setItem(XP_NAME_KEY, clean);
}

function getXpRank(xp) {
	let current = xpRanks[0];

	xpRanks.forEach(function(rank) {
		if (xp >= rank.min) current = rank;
	});

	const index = xpRanks.indexOf(current);
	const next = xpRanks[index + 1] || null;

	return {
		current: current,
		next: next,
		level: index + 1,
		progressToNext: next ? Math.min(100, Math.round(((xp - current.min) / (next.min - current.min)) * 100)) : 100
	};
}

function countXpWords(text) {
	if (typeof countWords === "function") return countWords(text);
	return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function countXpUniqueWords(text) {
	if (typeof countUniqueWords === "function") return countUniqueWords(text);
	return new Set(String(text || "").toLowerCase().match(/[a-z0-9']+/g) || []).size;
}

function hasXpSpam(text) {
	if (typeof hasSpamPattern === "function") return hasSpamPattern(text);
	const lower = String(text || "").toLowerCase().trim();
	if (!lower) return false;
	const words = lower.split(/\s+/).filter(Boolean);
	if (words.length < 12) return false;
	const unique = new Set(words);
	return unique.size / words.length < 0.25;
}

function calculateDetailXp(text, options) {
	options = options || {};
	const words = countXpWords(text);
	const unique = countXpUniqueWords(text);
	const spam = hasXpSpam(text);

	if (spam || words < 20) {
		return {
			xp: 0,
			words: words,
			unique: unique,
			spam: spam,
			label: "Too short/spam"
		};
	}

	let xp = 0;
	xp += Math.min(180, Math.floor(words * 1.1));
	xp += Math.min(120, unique * 2);

	if (words >= 80) xp += 40;
	if (words >= 150) xp += 70;
	if (words >= 250) xp += 90;
	if (unique >= 60) xp += 50;
	if (options.hasFile) xp += 70;
	if (options.sections) xp += Math.min(90, options.sections * 30);

	xp = Math.min(options.max || xpRules.detailedBonusMax, xp);

	return {
		xp: xp,
		words: words,
		unique: unique,
		spam: false,
		label: words + " words / " + unique + " unique"
	};
}

function awardXpOnce(claimKey, amount, reason, meta) {
	if (!amount || amount <= 0) return false;

	const claims = getXpClaims();
	if (claims[claimKey]) return false;

	claims[claimKey] = {
		amount: amount,
		reason: reason,
		claimedAt: new Date().toISOString(),
		meta: meta || {}
	};
	saveXpClaims(claims);

	const profile = getXpProfile();
	profile.xp += amount;
	profile.totalEarned += amount;

	if (claimKey.indexOf("lesson:") === 0) profile.lessonsCompleted += 1;
	if (claimKey.indexOf("workshop:") === 0) profile.workshopsCompleted += 1;
	if (claimKey.indexOf("gate:") === 0) profile.gatesCompleted += 1;
	if (claimKey.indexOf("exam:") === 0) profile.examsCompleted += 1;
	if (claimKey.indexOf("detail:") === 0 || claimKey.indexOf("notes:") === 0) profile.detailXp += amount;

	saveXpProfile(profile);

	const history = getXpHistory();
	history.unshift({
		amount: amount,
		reason: reason,
		time: new Date().toISOString(),
		meta: meta || {}
	});
	saveXpHistory(history);

	showXpToast("+" + amount + " XP — " + reason);
	return true;
}

function showXpToast(text) {
	let toast = document.getElementById("xpToast");

	if (!toast) {
		toast = document.createElement("div");
		toast.id = "xpToast";
		toast.className = "xp-toast";
		document.body.appendChild(toast);
	}

	toast.textContent = text;
	toast.classList.add("show");

	clearTimeout(showXpToast.timer);
	showXpToast.timer = setTimeout(function() {
		toast.classList.remove("show");
	}, 2600);
}

function renderXpSummaryCard() {
	const profile = getXpProfile();
	const rank = getXpRank(profile.xp);

	return `
		<div class="xp-topbar-card">
			<div class="xp-chip">${rank.current.name} • ${profile.xp} XP</div>
			<p>Next rank: <strong>${rank.next ? rank.next.name : "Max Rank"}</strong>. Detail quality, practical evidence, notes, exams, and level progress all award XP.</p>
			<div class="xp-progress-track">
				<div class="xp-progress-fill" style="width: ${rank.progressToNext}%"></div>
			</div>
		</div>
	`;
}

function getSimulatedLeaderboard() {
	const profile = getXpProfile();
	const name = getLeaderboardName();

	const bots = [
		{ name: "AvaScript", xp: 21400, rank: "Academy Elite", badges: "Systems / UI" },
		{ name: "BuilderKai", xp: 17650, rank: "Academy Elite", badges: "Blender / Maps" },
		{ name: "MoonVFX", xp: 13240, rank: "Pro Creator", badges: "Animation / Polish" },
		{ name: "TycoonMax", xp: 9800, rank: "Architect", badges: "Roblox Systems" },
		{ name: "PixelForge", xp: 7200, rank: "Developer", badges: "Assets / Testing" },
		{ name: "ScriptNova", xp: 4300, rank: "Creator", badges: "Lua / UI" },
		{ name: "StudioRookie", xp: 1100, rank: "Builder", badges: "Foundation" }
	];

	const userEntry = {
		name: name,
		xp: profile.xp,
		rank: getXpRank(profile.xp).current.name,
		badges: "You",
		current: true
	};

	return bots.concat([userEntry]).sort(function(a, b) {
		return b.xp - a.xp;
	});
}

function showLeaderboard() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	const profile = getXpProfile();
	const rank = getXpRank(profile.xp);
	const entries = getSimulatedLeaderboard();

	app.innerHTML = `
		<section class="panel leaderboard-panel">
			<div class="leaderboard-hero">
				<span class="badge">XP System</span>
				<h2>Leaderboard</h2>
				<p>
					Earn XP by completing lessons, workshop tasks, hard practical coursework, exam reviews, and detailed notes/evidence.
					The more detailed and non-spammy your written answers are, the more XP you can earn.
				</p>

				<div class="leaderboard-name-form">
					<input id="leaderboardNameInput" type="text" value="${escapeAttribute(getLeaderboardName())}" placeholder="Leaderboard name">
					<button type="button" onclick="saveLeaderboardName()">Save Name</button>
					<button type="button" class="secondary" onclick="showXpRules()">XP Rules</button>
				</div>

				${renderXpSummaryCard()}

				<div class="xp-stat-grid">
					<div class="xp-stat-card"><span>Total XP</span><strong>${profile.xp}</strong></div>
					<div class="xp-stat-card"><span>Rank</span><strong>${rank.current.name}</strong></div>
					<div class="xp-stat-card"><span>Lessons</span><strong>${profile.lessonsCompleted}</strong></div>
					<div class="xp-stat-card"><span>Workshop</span><strong>${profile.workshopsCompleted}</strong></div>
					<div class="xp-stat-card"><span>Gates</span><strong>${profile.gatesCompleted}</strong></div>
					<div class="xp-stat-card"><span>Detail XP</span><strong>${profile.detailXp}</strong></div>
				</div>

				<div class="leaderboard-table-wrap">
					<table class="leaderboard-table">
						<thead>
							<tr>
								<th>Place</th>
								<th>Learner</th>
								<th>Rank</th>
								<th>XP</th>
								<th>Focus</th>
							</tr>
						</thead>
						<tbody>
							${entries.map(function(entry, index) {
								const place = index + 1;
								return `
									<tr class="${entry.current ? "current-user" : ""}">
										<td><span class="leaderboard-rank ${place === 1 ? "top1" : place === 2 ? "top2" : place === 3 ? "top3" : ""}">${place}</span></td>
										<td>${escapeHtml(entry.name)}</td>
										<td>${entry.rank}</td>
										<td>${entry.xp}</td>
										<td>${entry.badges}</td>
									</tr>
								`;
							}).join("")}
						</tbody>
					</table>
				</div>

				<h3 style="color:#7dd3fc; margin-top:24px;">Recent XP</h3>
				<div class="xp-history">
					${renderXpHistory()}
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("leaderboard");
}

function saveLeaderboardName() {
	const input = document.getElementById("leaderboardNameInput");
	setLeaderboardName(input ? input.value : "You");
	showToast("Leaderboard name saved");
	showLeaderboard();
}

function renderXpHistory() {
	const history = getXpHistory();

	if (!history.length) {
		return `<div class="xp-history-item">No XP earned yet. Complete lessons, notes, workshop tasks, or coursework gates.</div>`;
	}

	return history.slice(0, 20).map(function(item) {
		return `
			<div class="xp-history-item">
				<time>${new Date(item.time).toLocaleString()}</time>
				<strong>+${item.amount} XP</strong> — ${escapeHtml(item.reason)}
			</div>
		`;
	}).join("");
}

function showXpRules() {
	app.innerHTML = `
		<section class="panel leaderboard-panel">
			<div class="leaderboard-hero">
				<span class="badge">XP Rules</span>
				<h2>How XP Works</h2>
				<p>XP rewards actual work. Short spam answers earn little or nothing. More detailed written evidence earns more XP, up to a cap.</p>

				<div class="xp-rules-grid">
					<div class="xp-rule-card">
						<h3>Lessons</h3>
						<p>Completing a lesson slot gives <strong>${xpRules.lesson} XP</strong> once.</p>
					</div>
					<div class="xp-rule-card">
						<h3>Workshop</h3>
						<p>Workshop tasks give <strong>${xpRules.workshop} XP</strong> once each.</p>
					</div>
					<div class="xp-rule-card">
						<h3>Hard Practical Gates</h3>
						<p>Final level gates give a base <strong>${xpRules.levelGateBase} XP</strong> plus detail XP from evidence quality.</p>
					</div>
					<div class="xp-rule-card">
						<h3>Detailed Answers</h3>
						<p>Longer, clearer, varied answers get more XP. Spam, repeated words, and tiny answers get blocked.</p>
					</div>
					<div class="xp-rule-card">
						<h3>Notes</h3>
						<p>Lesson notes award XP at word milestones: 50, 150, 300, and 600 words.</p>
					</div>
					<div class="xp-rule-card">
						<h3>Exams / Reviews</h3>
						<p>Exam review writing gives XP based on length, variety, and quality.</p>
					</div>
				</div>

				<div class="actions" style="margin-top:20px;">
					<button type="button" onclick="showLeaderboard()">Back to Leaderboard</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
				</div>
			</div>
		</section>
	`;
}

// Award XP for lessons.
const xpOriginalCompleteLevelSlot = typeof completeLevelSlot === "function" ? completeLevelSlot : null;
if (xpOriginalCompleteLevelSlot) {
	completeLevelSlot = function(level, slot) {
		const already = isLevelLessonComplete(level, slot);
		xpOriginalCompleteLevelSlot(level, slot);

		if (!already) {
			awardXpOnce("lesson:" + level + ":" + slot, xpRules.lesson, "Completed Level " + level + " Lesson " + slot);
		}
	};
}

// Award XP for workshop.
const xpOriginalCompleteWorkshopTask = typeof completeWorkshopTask === "function" ? completeWorkshopTask : null;
if (xpOriginalCompleteWorkshopTask) {
	completeWorkshopTask = function(level, taskId) {
		const already = isWorkshopTaskComplete(level, taskId);
		xpOriginalCompleteWorkshopTask(level, taskId);

		if (!already) {
			awardXpOnce("workshop:" + level + ":" + taskId, xpRules.workshop, "Completed Level " + level + " workshop task");
		}
	};
}

// Award XP for hard practical gate based on evidence detail.
const xpOriginalSubmitLevelGate = typeof submitLevelGate === "function" ? submitLevelGate : null;
if (xpOriginalSubmitLevelGate) {
	submitLevelGate = function(level) {
		const before = getLevelGateSubmission(level);
		xpOriginalSubmitLevelGate(level);

		const after = getLevelGateSubmission(level);
		if (!before && after) {
			const combined = [after.build, after.debug, after.reflect].join(" ");
			const detail = calculateDetailXp(combined, {
				hasFile: Boolean(after.fileName),
				sections: 3,
				max: 650
			});

			awardXpOnce(
				"gate:" + level,
				xpRules.levelGateBase + detail.xp,
				"Submitted Level " + level + " hard practical (" + detail.label + ")",
				detail
			);
		}
	};
}

// Award XP for expanded exam review.
const xpOriginalShowExpandedExam = typeof showExpandedExam === "function" ? showExpandedExam : null;
if (xpOriginalShowExpandedExam) {
	showExpandedExam = function(level) {
		xpOriginalShowExpandedExam(level);

		const panel = app.querySelector(".exam-panel");
		if (panel && !panel.querySelector("#submitExpandedExamXp")) {
			panel.insertAdjacentHTML("beforeend", `
				<div class="actions">
					<button id="submitExpandedExamXp" type="button" class="green" onclick="submitExpandedExamXp(${level})">Submit Review for XP</button>
				</div>
			`);
		}
	};
}

function submitExpandedExamXp(level) {
	const written = document.getElementById("expandedExamWritten");
	const text = written ? written.value.trim() : "";
	const detail = calculateDetailXp(text, {
		sections: 1,
		max: 420
	});

	if (detail.xp <= 0) {
		showToast("Write a more detailed non-spam review first.");
		return;
	}

	awardXpOnce(
		"exam:" + level,
		xpRules.examReviewBase + detail.xp,
		"Submitted Level " + level + " exam review (" + detail.label + ")",
		detail
	);

	showLeaderboard();
}

// Award XP for detailed notes milestones.
const xpOriginalSaveActiveNotes = typeof saveActiveNotes === "function" ? saveActiveNotes : null;
if (xpOriginalSaveActiveNotes) {
	saveActiveNotes = function() {
		xpOriginalSaveActiveNotes();

		if (typeof activeNotesContext === "undefined") return;

		const text = typeof getNotesPlainText === "function" ? getNotesPlainText() : "";
		const words = countXpWords(text);
		const milestones = [50, 150, 300, 600];

		milestones.forEach(function(milestone) {
			if (words >= milestone) {
				awardXpOnce(
					"notes:" + activeNotesContext.id + ":" + milestone,
					xpRules.notesMilestone + Math.floor(milestone / 10),
					"Detailed notes milestone: " + milestone + " words",
					{ words: words, milestone: milestone }
				);
			}
		});
	};
}

// Inject XP summary into levels/assessments/home.
function injectXpSummary() {
	if (!app) return;
	const panel = app.querySelector(".panel, .hero-content");
	if (!panel) return;
	if (panel.querySelector(".xp-topbar-card")) return;

	panel.insertAdjacentHTML("afterbegin", renderXpSummaryCard());
}

["showLevelHub", "showAssessmentsHub", "showPracticalCoursework", "showCourseworkExams", "showHome"].forEach(function(fnName) {
	const original = window[fnName];
	if (typeof original === "function") {
		window[fnName] = function() {
			original.apply(this, arguments);
			injectXpSummary();
		};
	}
});

// Topbar binding with Leaderboard.
function bindXpTopbar() {
	const home = document.getElementById("navHome");
	const assessments = document.getElementById("navAssessments");
	const levels = document.getElementById("navLevels");
	const leaderboard = document.getElementById("navLeaderboard");
	const progress = document.getElementById("navProgress");

	if (home) home.onclick = showHome;
	if (assessments) assessments.onclick = typeof showAssessmentsHub === "function" ? showAssessmentsHub : showCourseworkHub;
	if (levels) levels.onclick = showLevelHub;
	if (leaderboard) leaderboard.onclick = showLeaderboard;
	if (progress) progress.onclick = showProgress;
}

bindXpTopbar();
document.addEventListener("DOMContentLoaded", bindXpTopbar);
setTimeout(bindXpTopbar, 100);
setTimeout(bindXpTopbar, 500);

// Admin XP controls.
if (typeof renderAdminOverview === "function") {
	const xpOriginalRenderAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = xpOriginalRenderAdminOverview();
		const profile = getXpProfile();

		const card = `
			<div class="admin-card">
				<h3>XP / Leaderboard Control</h3>
				<p>Current XP: <strong>${profile.xp}</strong></p>
				<div class="actions">
					<button type="button" onclick="awardXpOnce('admin-bonus-' + Date.now(), 1000, 'Admin test XP bonus')">Give 1000 XP</button>
					<button type="button" class="secondary" onclick="showLeaderboard()">Open Leaderboard</button>
					<button type="button" class="red" onclick="adminResetXp()">Reset XP</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${card}`);
	};
}

function adminResetXp() {
	localStorage.removeItem(XP_STORAGE_KEY);
	localStorage.removeItem(XP_CLAIMS_KEY);
	localStorage.removeItem(XP_HISTORY_KEY);
	showToast("XP reset");
	if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
}


// ---------- Global Leaderboard Prototype ----------
// Adds a Global leaderboard next to the Local leaderboard.
// Static prototype note: true global ranking needs backend accounts + database.
// This creates the UI and data shape so backend sync can be connected later.

const GLOBAL_LEADERBOARD_SYNC_KEY = "creatorAcademy.globalLeaderboardLastSync";

function getGlobalLeaderboardSeason() {
	return "Season 1: Creator Academy Launch";
}

function getLastGlobalSync() {
	return localStorage.getItem(GLOBAL_LEADERBOARD_SYNC_KEY) || "";
}

function setLastGlobalSync() {
	localStorage.setItem(GLOBAL_LEADERBOARD_SYNC_KEY, new Date().toISOString());
}

function getGlobalLeaderboardEntries() {
	const profile = getXpProfile();
	const userEntry = {
		name: getLeaderboardName(),
		xp: profile.xp,
		rank: getXpRank(profile.xp).current.name,
		badges: "Your synced profile",
		region: "Local",
		current: true
	};

	const globalEntries = [
		{ name: "ByteOverlord", xp: 48200, rank: "World Class", badges: "10 Levels Complete", region: "GB" },
		{ name: "StudioPrime", xp: 43150, rank: "World Class", badges: "Systems Mastery", region: "US" },
		{ name: "VFXNova", xp: 39240, rank: "World Class", badges: "Polish Specialist", region: "CA" },
		{ name: "LuaTitan", xp: 35890, rank: "World Class", badges: "Advanced Scripting", region: "AU" },
		{ name: "AssetForge", xp: 31670, rank: "World Class", badges: "Blender / Assets", region: "DE" },
		{ name: "LaunchPilot", xp: 28990, rank: "World Class", badges: "Publishing", region: "GB" },
		{ name: "UXRift", xp: 24680, rank: "World Class", badges: "UI / UX", region: "NL" },
		{ name: "TycoonStack", xp: 22140, rank: "Academy Elite", badges: "Roblox Systems", region: "IE" },
		{ name: "MoonFrame", xp: 19800, rank: "Academy Elite", badges: "Animation", region: "US" },
		{ name: "PixelLedger", xp: 17420, rank: "Academy Elite", badges: "Creator Business", region: "GB" },
		{ name: "CodeQuarry", xp: 15110, rank: "Pro Creator", badges: "Lua / Debugging", region: "FR" },
		{ name: "MapSignal", xp: 12600, rank: "Pro Creator", badges: "Level Design", region: "SE" },
		{ name: "SoundAxis", xp: 10350, rank: "Architect", badges: "Sound Design", region: "US" },
		{ name: "ScriptSprout", xp: 8300, rank: "Developer", badges: "Foundation", region: "GB" }
	];

	return globalEntries.concat([userEntry]).sort(function(a, b) {
		return b.xp - a.xp;
	});
}

function getUserGlobalPlace() {
	const entries = getGlobalLeaderboardEntries();
	const index = entries.findIndex(function(entry) {
		return entry.current;
	});

	return index >= 0 ? index + 1 : entries.length;
}

function renderLeaderboardTabs(mode) {
	return `
		<div class="leaderboard-tabs">
			<button type="button" class="${mode === "local" ? "active" : ""}" onclick="showLeaderboard('local')">Local Leaderboard</button>
			<button type="button" class="${mode === "global" ? "active" : ""}" onclick="showLeaderboard('global')">Global Leaderboard</button>
			<button type="button" class="secondary" onclick="showXpRules()">XP Rules</button>
		</div>
	`;
}

function renderLeaderboardTable(entries, includeRegion) {
	return `
		<div class="leaderboard-table-wrap">
			<table class="leaderboard-table">
				<thead>
					<tr>
						<th>Place</th>
						<th>Learner</th>
						<th>Rank</th>
						<th>XP</th>
						<th>Focus</th>
						${includeRegion ? "<th>Region</th>" : ""}
					</tr>
				</thead>
				<tbody>
					${entries.map(function(entry, index) {
						const place = index + 1;
						return `
							<tr class="${entry.current ? "current-user" : ""}">
								<td><span class="leaderboard-rank ${place === 1 ? "top1" : place === 2 ? "top2" : place === 3 ? "top3" : ""}">${place}</span></td>
								<td>${escapeHtml(entry.name)}</td>
								<td>${entry.rank}</td>
								<td>${entry.xp}</td>
								<td>${entry.badges}</td>
								${includeRegion ? `<td>${entry.region || "-"}</td>` : ""}
							</tr>
						`;
					}).join("")}
				</tbody>
			</table>
		</div>
	`;
}

showLeaderboard = function(mode) {
	mode = mode || "local";

	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	const profile = getXpProfile();
	const rank = getXpRank(profile.xp);
	const entries = mode === "global" ? getGlobalLeaderboardEntries() : getSimulatedLeaderboard();
	const userPlace = mode === "global" ? getUserGlobalPlace() : entries.findIndex(function(entry) { return entry.current; }) + 1;

	app.innerHTML = `
		<section class="panel leaderboard-panel">
			<div class="leaderboard-hero">
				<span class="badge">XP System</span>
				<h2>${mode === "global" ? "Global Leaderboard" : "Leaderboard"}</h2>
				<p>
					Earn XP by completing lessons, workshop tasks, hard practical coursework, exam reviews, and detailed notes/evidence.
					The more detailed and non-spammy your written answers are, the more XP you can earn.
				</p>

				${renderLeaderboardTabs(mode)}

				<div class="leaderboard-name-form">
					<input id="leaderboardNameInput" type="text" value="${escapeAttribute(getLeaderboardName())}" placeholder="Leaderboard name">
					<button type="button" onclick="saveLeaderboardName()">Save Name</button>
					${mode === "global" ? `<button type="button" class="secondary" onclick="syncGlobalLeaderboard()">Sync Global Score</button>` : ""}
				</div>

				${mode === "global" ? renderGlobalLeaderboardInfo(userPlace) : ""}

				${renderXpSummaryCard()}

				<div class="xp-stat-grid">
					<div class="xp-stat-card"><span>Total XP</span><strong>${profile.xp}</strong></div>
					<div class="xp-stat-card"><span>Rank</span><strong>${rank.current.name}</strong></div>
					<div class="xp-stat-card"><span>${mode === "global" ? "Global Place" : "Local Place"}</span><strong>#${userPlace || "-"}</strong></div>
					<div class="xp-stat-card"><span>Lessons</span><strong>${profile.lessonsCompleted}</strong></div>
					<div class="xp-stat-card"><span>Gates</span><strong>${profile.gatesCompleted}</strong></div>
					<div class="xp-stat-card"><span>Detail XP</span><strong>${profile.detailXp}</strong></div>
				</div>

				${renderLeaderboardTable(entries, mode === "global")}

				<h3 style="color:#7dd3fc; margin-top:24px;">Recent XP</h3>
				<div class="xp-history">
					${renderXpHistory()}
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView(mode === "global" ? "globalLeaderboard" : "leaderboard");
};

function renderGlobalLeaderboardInfo(userPlace) {
	const lastSync = getLastGlobalSync();

	return `
		<div class="global-leaderboard-banner">
			<strong>Global prototype:</strong> this board uses simulated global entries right now.
			A real global leaderboard needs login accounts, a backend database, anti-cheat checks, and server-side XP validation.
		</div>

		<div class="global-season-card">
			<h3>${getGlobalLeaderboardSeason()}</h3>
			<p>Your current global position: <strong>#${userPlace}</strong>.</p>
			<p>Last mock sync: <strong>${lastSync ? new Date(lastSync).toLocaleString() : "Never"}</strong>.</p>
		</div>

		<div class="global-sync-panel">
			<strong>Backend-ready data shape:</strong>
			<code>{ userId, displayName, xp, rank, completedLessons, gatesCompleted, updatedAt }</code>
			<p>Later, this can connect to Firebase, Supabase, MongoDB, or a custom Node/Express backend.</p>
		</div>
	`;
}

function syncGlobalLeaderboard() {
	setLastGlobalSync();
	awardXpOnce("global-sync-" + new Date().toISOString().slice(0, 10), 75, "Global leaderboard sync bonus");
	showLeaderboard("global");
}

// Keep topbar Leaderboard opening the local/global hub.
function bindGlobalLeaderboardTopbar() {
	const leaderboard = document.getElementById("navLeaderboard");
	if (leaderboard) leaderboard.onclick = function() {
		showLeaderboard("local");
	};
}

bindGlobalLeaderboardTopbar();
document.addEventListener("DOMContentLoaded", bindGlobalLeaderboardTopbar);
setTimeout(bindGlobalLeaderboardTopbar, 100);
setTimeout(bindGlobalLeaderboardTopbar, 500);

// Add admin control for global mock sync.
if (typeof renderAdminOverview === "function") {
	const globalLeaderboardOriginalAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = globalLeaderboardOriginalAdminOverview();

		const card = `
			<div class="admin-card">
				<h3>Global Leaderboard</h3>
				<p>Mock global sync for prototype testing.</p>
				<div class="actions">
					<button type="button" onclick="showLeaderboard('global')">Open Global</button>
					<button type="button" class="secondary" onclick="syncGlobalLeaderboard()">Mock Sync</button>
				</div>
			</div>
		`;

		return html.replace(`<div class="admin-grid">`, `<div class="admin-grid">${card}`);
	};
}


// ---------- REAL Global Leaderboard Mode ----------
// This replaces the fake/simulated global board.
// It connects to a backend API if available.
// Included backend in this zip: server.js + package.json.
// Local fallback stays local only and is clearly labelled.

const REAL_GLOBAL_API_KEY = "creatorAcademy.realGlobalApiUrl";
const REAL_GLOBAL_CLIENT_ID_KEY = "creatorAcademy.realGlobalClientId";
const DEFAULT_REAL_GLOBAL_API = "http://localhost:3000";

function getRealGlobalApiUrl() {
	return localStorage.getItem(REAL_GLOBAL_API_KEY) || DEFAULT_REAL_GLOBAL_API;
}

function setRealGlobalApiUrl(url) {
	const clean = String(url || DEFAULT_REAL_GLOBAL_API).trim().replace(/\/+$/, "");
	localStorage.setItem(REAL_GLOBAL_API_KEY, clean || DEFAULT_REAL_GLOBAL_API);
}

function getRealGlobalClientId() {
	let id = localStorage.getItem(REAL_GLOBAL_CLIENT_ID_KEY);
	if (!id) {
		id = "client_" + Math.random().toString(36).slice(2) + "_" + Date.now().toString(36);
		localStorage.setItem(REAL_GLOBAL_CLIENT_ID_KEY, id);
	}
	return id;
}

async function realGlobalFetch(path, options) {
	const base = getRealGlobalApiUrl();
	const response = await fetch(base + path, Object.assign({
		headers: {
			"Content-Type": "application/json"
		}
	}, options || {}));

	if (!response.ok) {
		const text = await response.text().catch(function() { return ""; });
		throw new Error("API " + response.status + ": " + text);
	}

	return response.json();
}

function buildRealGlobalPayload() {
	const profile = getXpProfile();
	const rank = getXpRank(profile.xp);

	return {
		clientId: getRealGlobalClientId(),
		displayName: getLeaderboardName(),
		xp: profile.xp,
		rank: rank.current.name,
		stats: {
			lessonsCompleted: profile.lessonsCompleted || 0,
			workshopsCompleted: profile.workshopsCompleted || 0,
			gatesCompleted: profile.gatesCompleted || 0,
			examsCompleted: profile.examsCompleted || 0,
			detailXp: profile.detailXp || 0
		},
		updatedAt: new Date().toISOString()
	};
}

async function syncRealGlobalLeaderboard() {
	const payload = buildRealGlobalPayload();
	const result = await realGlobalFetch("/api/leaderboard", {
		method: "POST",
		body: JSON.stringify(payload)
	});

	setLastGlobalSync();
	return result;
}

async function loadRealGlobalLeaderboard() {
	return realGlobalFetch("/api/leaderboard");
}

async function testRealGlobalBackend() {
	return realGlobalFetch("/api/health");
}

function renderRealGlobalConfig() {
	return `
		<div class="real-global-config">
			<input id="realGlobalApiInput" type="text" value="${escapeAttribute(getRealGlobalApiUrl())}" placeholder="Backend API URL">
			<button type="button" onclick="saveRealGlobalApiUrl()">Save API URL</button>
			<button type="button" class="secondary" onclick="runRealGlobalHealthCheck()">Test</button>
		</div>
	`;
}

function saveRealGlobalApiUrl() {
	const input = document.getElementById("realGlobalApiInput");
	setRealGlobalApiUrl(input ? input.value : DEFAULT_REAL_GLOBAL_API);
	showToast("Global API URL saved");
	showLeaderboard("global");
}

async function runRealGlobalHealthCheck() {
	const status = document.getElementById("realGlobalStatus");
	if (status) {
		status.className = "real-global-status";
		status.textContent = "Checking backend...";
	}

	try {
		const result = await testRealGlobalBackend();

		if (status) {
			status.className = "real-global-status online";
			status.innerHTML = "<strong>Backend online.</strong> " + escapeHtml(result.message || "API ready.");
		}
	} catch (error) {
		if (status) {
			status.className = "real-global-status offline";
			status.innerHTML = "<strong>Backend offline.</strong> Start the included Node backend or paste your deployed API URL.";
		}
	}
}

async function syncAndRefreshRealGlobal() {
	const status = document.getElementById("realGlobalStatus");
	if (status) {
		status.className = "real-global-status";
		status.textContent = "Syncing your XP to the real backend...";
	}

	try {
		await syncRealGlobalLeaderboard();
		awardXpOnce("real-global-sync-" + new Date().toISOString().slice(0, 10), 75, "Real global leaderboard sync bonus");
		await showLeaderboard("global");
	} catch (error) {
		if (status) {
			status.className = "real-global-status offline";
			status.innerHTML = "<strong>Sync failed.</strong> Backend is not reachable. Use the included server.js or deployed API URL.";
		}
	}
}

function renderRealGlobalBackendInstructions() {
	return `
		<div class="real-global-backend-card">
			<strong>Real backend included in this zip.</strong>
			<p>To make Global actually shared, run the backend:</p>
			<p><code>npm install</code></p>
			<p><code>npm start</code></p>
			<p>Then keep the API URL as <code>http://localhost:3000</code>, or deploy the backend and paste the deployed URL above.</p>
			<p>This stores leaderboard entries in <code>data/leaderboard.json</code> on the server.</p>
		</div>
	`;
}

function renderRealGlobalEmpty() {
	return `
		<div class="real-global-empty">
			<h3>No real global data loaded yet</h3>
			<p>This is no longer using fake global players. Start the backend, press <strong>Sync My XP</strong>, then the table will show real submitted entries.</p>
			<p>If you deploy the backend online, multiple users can submit to the same global leaderboard.</p>
		</div>
	`;
}

function renderRealLeaderboardTableFromServer(entries) {
	if (!entries || !entries.length) return renderRealGlobalEmpty();

	return renderLeaderboardTable(entries.map(function(entry) {
		return {
			name: entry.displayName || "Unknown",
			xp: entry.xp || 0,
			rank: entry.rank || "Unranked",
			badges: buildRealGlobalBadges(entry),
			region: entry.region || "Global",
			current: entry.clientId === getRealGlobalClientId()
		};
	}), true);
}

function buildRealGlobalBadges(entry) {
	const stats = entry.stats || {};
	const parts = [];

	if (stats.lessonsCompleted) parts.push(stats.lessonsCompleted + " lessons");
	if (stats.gatesCompleted) parts.push(stats.gatesCompleted + " gates");
	if (stats.workshopsCompleted) parts.push(stats.workshopsCompleted + " workshops");
	if (stats.detailXp) parts.push(stats.detailXp + " detail XP");

	return parts.length ? parts.join(" / ") : "Synced learner";
}

// Final override: local remains local, global is real API-backed.
showLeaderboard = async function(mode) {
	mode = mode || "local";

	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	const profile = getXpProfile();
	const rank = getXpRank(profile.xp);
	let entries = [];
	let globalError = null;

	if (mode === "global") {
		try {
			const data = await loadRealGlobalLeaderboard();
			entries = Array.isArray(data.entries) ? data.entries : [];
		} catch (error) {
			globalError = error;
			}
	} else {
		entries = getSimulatedLeaderboard();
	}

	const userPlace = mode === "global"
		? (entries.findIndex(function(entry) { return entry.clientId === getRealGlobalClientId(); }) + 1 || "-")
		: entries.findIndex(function(entry) { return entry.current; }) + 1;

	app.innerHTML = `
		<section class="panel leaderboard-panel">
			<div class="leaderboard-hero">
				<span class="badge">XP System</span>
				<h2>${mode === "global" ? "Real Global Leaderboard" : "Local Leaderboard"}</h2>
				<p>
					Local leaderboard is for this browser. Global leaderboard now uses a real backend API when connected.
					No fake global names are shown in Global mode.
				</p>

				${renderLeaderboardTabs(mode)}

				<div class="leaderboard-name-form">
					<input id="leaderboardNameInput" type="text" value="${escapeAttribute(getLeaderboardName())}" placeholder="Leaderboard name">
					<button type="button" onclick="saveLeaderboardName()">Save Name</button>
					${mode === "global" ? `<button type="button" class="secondary" onclick="syncAndRefreshRealGlobal()">Sync My XP</button>` : ""}
				</div>

				${mode === "global" ? renderRealGlobalConfig() : ""}

				${mode === "global" ? `
					<div id="realGlobalStatus" class="real-global-status ${globalError ? "offline" : "online"}">
						${globalError
							? "<strong>Backend offline.</strong> No fake global entries are being shown. Start the included backend or paste a deployed API URL."
							: "<strong>Backend connected.</strong> Showing real entries from the API."
						}
					</div>
				` : ""}

				${mode === "global" ? renderRealGlobalBackendInstructions() : ""}

				${renderXpSummaryCard()}

				<div class="xp-stat-grid">
					<div class="xp-stat-card"><span>Total XP</span><strong>${profile.xp}</strong></div>
					<div class="xp-stat-card"><span>Rank</span><strong>${rank.current.name}</strong></div>
					<div class="xp-stat-card"><span>${mode === "global" ? "Global Place" : "Local Place"}</span><strong>#${userPlace || "-"}</strong></div>
					<div class="xp-stat-card"><span>Lessons</span><strong>${profile.lessonsCompleted}</strong></div>
					<div class="xp-stat-card"><span>Gates</span><strong>${profile.gatesCompleted}</strong></div>
					<div class="xp-stat-card"><span>Detail XP</span><strong>${profile.detailXp}</strong></div>
				</div>

				${mode === "global" ? renderRealLeaderboardTableFromServer(entries) : renderLeaderboardTable(entries, false)}

				<h3 style="color:#7dd3fc; margin-top:24px;">Recent XP</h3>
				<div class="xp-history">
					${renderXpHistory()}
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView(mode === "global" ? "realGlobalLeaderboard" : "leaderboard");
};

function syncGlobalLeaderboard() {
	return syncAndRefreshRealGlobal();
}


// ---------- Google Accounts for Real Global Leaderboard ----------
// Global sync now uses Google Sign-In, not random browser IDs.
// Frontend gets Google ID token, backend verifies it, backend stores XP under googleSub.

const GOOGLE_CLIENT_ID_STORAGE_KEY = "creatorAcademy.googleClientId";
const GOOGLE_USER_STORAGE_KEY = "creatorAcademy.googleUser";
const GOOGLE_ID_TOKEN_STORAGE_KEY = "creatorAcademy.googleIdToken";

function getGoogleClientId() {
	return localStorage.getItem(GOOGLE_CLIENT_ID_STORAGE_KEY) || "";
}

function setGoogleClientId(value) {
	localStorage.setItem(GOOGLE_CLIENT_ID_STORAGE_KEY, String(value || "").trim());
}

function getGoogleUser() {
	try {
		return JSON.parse(localStorage.getItem(GOOGLE_USER_STORAGE_KEY) || "null");
	} catch (error) {
		return null;
	}
}

function setGoogleUser(user, idToken) {
	localStorage.setItem(GOOGLE_USER_STORAGE_KEY, JSON.stringify(user));
	if (idToken) localStorage.setItem(GOOGLE_ID_TOKEN_STORAGE_KEY, idToken);
	if (user && user.displayName) {
		setLeaderboardName(user.displayName);
	}
}

function getGoogleIdToken() {
	return localStorage.getItem(GOOGLE_ID_TOKEN_STORAGE_KEY) || "";
}

function clearGoogleUser() {
	localStorage.removeItem(GOOGLE_USER_STORAGE_KEY);
	localStorage.removeItem(GOOGLE_ID_TOKEN_STORAGE_KEY);
}

function saveGoogleClientIdFromInput() {
	const input = document.getElementById("googleClientIdInput");
	setGoogleClientId(input ? input.value : "");
	showToast("Google Client ID saved");
	renderGoogleButtonSoon();
}

function renderGoogleButtonSoon() {
	setTimeout(renderGoogleButton, 120);
	setTimeout(renderGoogleButton, 600);
}

function renderGoogleButton() {
	const container = document.getElementById("googleSignInButton");
	const clientId = getGoogleClientId();

	if (!container || !clientId) return;

	if (!window.google || !google.accounts || !google.accounts.id) {
		container.innerHTML = `<div class="google-required-warning">Google script not loaded yet. Refresh if this stays visible.</div>`;
		return;
	}

	container.innerHTML = "";

	google.accounts.id.initialize({
		client_id: clientId,
		callback: handleGoogleCredentialResponse
	});

	google.accounts.id.renderButton(container, {
		theme: "outline",
		size: "large",
		text: "signin_with",
		shape: "pill"
	});
}

async function handleGoogleCredentialResponse(response) {
	const idToken = response && response.credential;

	if (!idToken) {
		showToast("Google sign-in failed");
		return;
	}

	const status = document.getElementById("realGlobalStatus");
	if (status) {
		status.className = "real-global-status";
		status.textContent = "Verifying Google account with backend...";
	}

	try {
		const result = await realGlobalFetch("/api/auth/google", {
			method: "POST",
			body: JSON.stringify({
				idToken: idToken,
				googleClientId: getGoogleClientId()
			})
		});

		setGoogleUser(result.user, idToken);
		showToast("Signed in with Google");
		showLeaderboard("global");
	} catch (error) {
		if (status) {
			status.className = "real-global-status offline";
			status.innerHTML = "<strong>Google sign-in failed.</strong> Backend could not verify the token. Check backend GOOGLE_CLIENT_ID / frontend Client ID.";
		}
		showToast("Google sign-in failed");
	}
}

function renderGoogleAuthPanel() {
	const clientId = getGoogleClientId();
	const user = getGoogleUser();

	return `
		<div class="google-auth-panel">
			<h3>Google Account Login</h3>
			<p>Global leaderboard sync requires Google sign-in. Browser-only IDs are not allowed for global XP.</p>

			<div class="google-auth-config">
				<input id="googleClientIdInput" type="text" value="${escapeAttribute(clientId)}" placeholder="Paste Google Client ID here">
				<button type="button" onclick="saveGoogleClientIdFromInput()">Save Client ID</button>
			</div>

			${clientId ? `<div id="googleSignInButton"></div>` : `
				<div class="google-required-warning">
					Paste your Google OAuth Web Client ID first. It looks like:
					<br><code>1234567890-example.apps.googleusercontent.com</code>
				</div>
			`}

			${user ? `
				<div class="google-user-card">
					${user.picture ? `<img src="${escapeAttribute(user.picture)}" alt="">` : ""}
					<div>
						<strong>Signed in as ${escapeHtml(user.displayName || "Google User")}</strong>
						<span>Global ID: ${escapeHtml(String(user.googleSub || "").slice(0, 12))}...</span>
					</div>
					<button type="button" class="secondary" onclick="clearGoogleUser(); showLeaderboard('global');">Sign out</button>
				</div>
			` : `
				<div class="google-required-warning">
					You must sign in with Google before syncing to the real global leaderboard.
				</div>
			`}

			<div class="google-backend-note">
				Backend must use the same Client ID. Local command:
				<code>GOOGLE_CLIENT_ID=your-client-id npm start</code>
			</div>
		</div>
	`;
}

// Override global client ID: Google user ID first, browser ID only for local/non-global fallback.
const oldGetRealGlobalClientId = typeof getRealGlobalClientId === "function" ? getRealGlobalClientId : null;
getRealGlobalClientId = function() {
	const user = getGoogleUser();
	if (user && user.googleSub) return user.googleSub;
	return oldGetRealGlobalClientId ? oldGetRealGlobalClientId() : "local_" + Date.now();
};

// Real global sync now requires Google.
syncRealGlobalLeaderboard = async function() {
	const user = getGoogleUser();
	const idToken = getGoogleIdToken();

	if (!user || !idToken) {
		throw new Error("Google sign-in required before global sync");
	}

	const payload = buildRealGlobalPayload();
	payload.googleSub = user.googleSub;
	payload.displayName = user.displayName || payload.displayName;
	payload.picture = user.picture || "";
	payload.googleClientId = getGoogleClientId();

	const response = await fetch(getRealGlobalApiUrl() + "/api/leaderboard", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + idToken
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const text = await response.text().catch(function() { return ""; });
		throw new Error("API " + response.status + ": " + text);
	}

	setLastGlobalSync();
	return response.json();
};

// Override global view to insert Google panel.
const oldShowLeaderboardForGoogle = showLeaderboard;
showLeaderboard = async function(mode) {
	mode = mode || "local";

	await oldShowLeaderboardForGoogle(mode);

	if (mode === "global") {
		const hero = app.querySelector(".leaderboard-hero");
		if (hero && !hero.querySelector(".google-auth-panel")) {
			const config = hero.querySelector(".real-global-config");
			if (config) {
				config.insertAdjacentHTML("afterend", renderGoogleAuthPanel());
			} else {
				hero.insertAdjacentHTML("afterbegin", renderGoogleAuthPanel());
			}
			renderGoogleButtonSoon();
		}
	}
};

// Override sync button behaviour.
syncAndRefreshRealGlobal = async function() {
	const status = document.getElementById("realGlobalStatus");
	if (status) {
		status.className = "real-global-status";
		status.textContent = "Syncing Google account XP to global leaderboard...";
	}

	try {
		await syncRealGlobalLeaderboard();
		awardXpOnce("real-google-global-sync-" + new Date().toISOString().slice(0, 10), 75, "Google global leaderboard sync bonus");
		await showLeaderboard("global");
	} catch (error) {
		if (status) {
			status.className = "real-global-status offline";
			status.innerHTML = "<strong>Sync failed.</strong> Sign in with Google and make sure the backend is online with the correct Google Client ID.";
		}
		showToast("Google sign-in required for global sync");
	}
};

document.addEventListener("DOMContentLoaded", renderGoogleButtonSoon);
setTimeout(renderGoogleButtonSoon, 500);


// ---------- Simplified Google Global Leaderboard UI ----------
// Keeps the real Google-backed system, but hides complexity from normal users.

function renderGoogleAuthPanel() {
	const clientId = getGoogleClientId();
	const user = getGoogleUser();

	return `
		<div class="simple-google-card">
			<h3>Google Account</h3>
			<p>Sign in once, then your XP can be synced to the global leaderboard.</p>

			<div class="simple-google-steps">
				<div class="simple-google-step">
					<strong>1. Connect</strong>
					<span>Paste the Google Client ID once.</span>
				</div>
				<div class="simple-google-step">
					<strong>2. Sign in</strong>
					<span>Use your Google account.</span>
				</div>
				<div class="simple-google-step">
					<strong>3. Sync</strong>
					<span>Press Sync My XP.</span>
				</div>
			</div>

			${clientId ? "" : `
				<div class="simple-google-input-row">
					<input id="googleClientIdInput" type="text" value="" placeholder="Paste Google Client ID here">
					<button type="button" onclick="saveGoogleClientIdFromInput()">Save</button>
				</div>
			`}

			${clientId ? `<div id="googleSignInButton"></div>` : `
				<div class="simple-google-warning">
					Google Client ID needed once before the sign-in button appears.
				</div>
			`}

			${user ? `
				<div class="simple-google-user">
					${user.picture ? `<img src="${escapeAttribute(user.picture)}" alt="">` : ""}
					<div>
						<strong>${escapeHtml(user.displayName || "Google User")}</strong>
						<span>Signed in and ready to sync XP.</span>
					</div>
					<button type="button" class="secondary" onclick="clearGoogleUser(); showLeaderboard('global');">Sign out</button>
				</div>
			` : ""}

			<details class="simple-dev-details">
				<summary>Developer setup</summary>
				<div>
					<p>Run the backend once:</p>
					<p><code>npm install</code></p>
					<p><code>GOOGLE_CLIENT_ID=your-client-id npm start</code></p>
					<p>Default API URL: <code>http://localhost:3000</code></p>
				</div>
			</details>
		</div>
	`;
}

// Simpler health/status wording.
function renderRealGlobalBackendInstructions() {
	return `
		<div class="real-global-backend-card">
			<strong>Global leaderboard backend:</strong>
			<p>Run the included backend to make global scores shared between users.</p>
			<p><code>npm install</code> then <code>npm start</code></p>
		</div>
	`;
}

// Simplify the global leaderboard page after the old renderer runs.
const simpleGoogleOldShowLeaderboard = showLeaderboard;
showLeaderboard = async function(mode) {
	mode = mode || "local";
	await simpleGoogleOldShowLeaderboard(mode);

	if (mode !== "global") return;

	const hero = app.querySelector(".leaderboard-hero");
	if (!hero) return;

	// Remove repeated/technical blocks from older versions if present.
	hero.querySelectorAll(".google-auth-panel").forEach(function(el) { el.remove(); });

	const config = hero.querySelector(".real-global-config");
	if (config) {
		config.style.display = "none";
		config.insertAdjacentHTML("afterend", renderGoogleAuthPanel());
	} else if (!hero.querySelector(".simple-google-card")) {
		hero.insertAdjacentHTML("afterbegin", renderGoogleAuthPanel());
	}

	const status = document.getElementById("realGlobalStatus");
	if (status) {
		const user = getGoogleUser();
		if (user) {
			status.className = "real-global-status online";
			status.innerHTML = "<strong>Ready.</strong> You are signed in with Google. Press Sync My XP.";
		} else {
			status.className = "real-global-status offline";
			status.innerHTML = "<strong>Sign in needed.</strong> Connect Google before syncing global XP.";
		}
	}

	renderGoogleButtonSoon();
};


// ---------- Leaderboard removed, XP retained ----------
// XP still awards from lessons, workshop tasks, notes, exams/reviews, and hard practicals.
// Removed user-facing leaderboard/global/Google flows.

function showXpDashboard() {
	if (!state.briefingComplete) {
		startBriefing();
		return;
	}

	const profile = getXpProfile();
	const rank = getXpRank(profile.xp);

	app.innerHTML = `
		<section class="panel xp-dashboard-panel">
			<div class="xp-dashboard-hero">
				<span class="badge">XP System</span>
				<h2>XP Progress</h2>
				<p>
					XP tracks your academy effort. You earn XP from lessons, workshop tasks, hard practical coursework, exam reviews,
					detailed notes, and high-quality written evidence.
				</p>

				${renderXpSummaryCard()}

				<div class="xp-system-note">
					<strong>Leaderboard removed:</strong> this build keeps XP progression only. No global ranking, no fake leaderboard, no Google login.
				</div>

				<div class="xp-dashboard-grid">
					<div class="xp-dashboard-card"><span>Total XP</span><strong>${profile.xp}</strong></div>
					<div class="xp-dashboard-card"><span>Rank</span><strong>${rank.current.name}</strong></div>
					<div class="xp-dashboard-card"><span>Rank Level</span><strong>${rank.level}</strong></div>
					<div class="xp-dashboard-card"><span>Lessons</span><strong>${profile.lessonsCompleted}</strong></div>
					<div class="xp-dashboard-card"><span>Workshop</span><strong>${profile.workshopsCompleted}</strong></div>
					<div class="xp-dashboard-card"><span>Hard Gates</span><strong>${profile.gatesCompleted}</strong></div>
					<div class="xp-dashboard-card"><span>Exam Reviews</span><strong>${profile.examsCompleted}</strong></div>
					<div class="xp-dashboard-card"><span>Detail XP</span><strong>${profile.detailXp}</strong></div>
				</div>

				<div class="xp-dashboard-actions">
					<button type="button" onclick="showXpRules()">XP Rules</button>
					<button type="button" class="secondary" onclick="showLevelHub()">Levels</button>
					<button type="button" class="secondary" onclick="showAssessmentsHub()">Assessments</button>
				</div>

				<h3 style="color:#7dd3fc; margin-top:24px;">Recent XP</h3>
				<div class="xp-history-clean">
					${renderXpHistory()}
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("xpDashboard");
}

// Keep old calls safe: if any old button/function calls leaderboard, send to XP dashboard.
function showLeaderboard() {
	showXpDashboard();
}

// Override global sync functions so nothing leaderboard-related remains active.
function syncGlobalLeaderboard() {
	showToast("Leaderboard removed. XP system is still active.");
}

function syncAndRefreshRealGlobal() {
	showToast("Leaderboard removed. XP system is still active.");
}

// XP rules stays, but no leaderboard back button.
const xpOnlyOriginalShowXpRules = typeof showXpRules === "function" ? showXpRules : null;
showXpRules = function() {
	if (xpOnlyOriginalShowXpRules) {
		xpOnlyOriginalShowXpRules();

		const backButtons = app.querySelectorAll("button");
		backButtons.forEach(function(button) {
			if (button.textContent.trim().toLowerCase().includes("leaderboard")) {
				button.textContent = "Back to XP";
				button.onclick = showXpDashboard;
			}
		});
		return;
	}

	showXpDashboard();
};

// Stable topbar binding.
function bindXpOnlyTopbar() {
	const home = document.getElementById("navHome");
	const assessments = document.getElementById("navAssessments");
	const levels = document.getElementById("navLevels");
	const xp = document.getElementById("navXP");
	const progress = document.getElementById("navProgress");

	const oldLeaderboard = document.getElementById("navLeaderboard");
	if (oldLeaderboard) oldLeaderboard.remove();

	if (home) home.onclick = showHome;
	if (assessments) assessments.onclick = typeof showAssessmentsHub === "function" ? showAssessmentsHub : showCourseworkHub;
	if (levels) levels.onclick = showLevelHub;
	if (xp) xp.onclick = showXpDashboard;
	if (progress) progress.onclick = showProgress;
}

bindXpOnlyTopbar();
document.addEventListener("DOMContentLoaded", bindXpOnlyTopbar);
setTimeout(bindXpOnlyTopbar, 100);
setTimeout(bindXpOnlyTopbar, 500);

// Admin XP control no longer links to Leaderboard.
if (typeof renderAdminOverview === "function") {
	const xpOnlyOriginalAdminOverview = renderAdminOverview;

	renderAdminOverview = function() {
		const html = xpOnlyOriginalAdminOverview();
		return html
			.replace(/Open Leaderboard/g, "Open XP")
			.replace(/showLeaderboard\(\)/g, "showXpDashboard()")
			.replace(/showLeaderboard\('global'\)/g, "showXpDashboard()");
	};
}


// ---------- Beginner onboarding lock ----------
// New users must only see:
// 1. Academy briefing
// 2. Payment plan option
// No XP/Levels/Assessments/Progress pages until onboarding and plan are valid.

function beginnerHasPlan() {
	if (typeof hasPersistentAdminRole === "function" && hasPersistentAdminRole()) return true;
	if (typeof isAdminRank === "function" && isAdminRank()) return true;
	if (typeof hasPlan === "function") return hasPlan();
	return Boolean(state && state.plan);
}

function beginnerIsBriefed() {
	return Boolean(state && state.briefingComplete);
}

function beginnerIsUnlocked() {
	return beginnerIsBriefed() && beginnerHasPlan();
}

function updateBeginnerLockClass() {
	if (beginnerIsUnlocked()) {
		document.body.classList.remove("beginner-locked");
	} else {
		document.body.classList.add("beginner-locked");
	}
}

function showBeginnerOnlyBriefing() {
	updateBeginnerLockClass();

	app.innerHTML = `
		<section class="beginner-only-panel">
			<div class="beginner-briefing-card">
				<span class="beginner-badge">Creator Academy Briefing</span>
				<h1>Welcome to Creator Academy Hub</h1>
				<p>
					This academy teaches Roblox creation step by step. Before a new learner sees levels, XP, coursework, exams, or progress dashboards,
					they must understand how the academy works and choose a plan.
				</p>

				<div class="beginner-path-grid">
					<div class="beginner-path-card">
						<h3>1. Learn the system</h3>
						<p>Start with the academy briefing so the learner understands levels, assessments, XP, and practical work.</p>
					</div>
					<div class="beginner-path-card">
						<h3>2. Choose access</h3>
						<p>Plans decide what content is available. Free starts basic; higher plans unlock deeper levels.</p>
					</div>
					<div class="beginner-path-card">
						<h3>3. Begin properly</h3>
						<p>After briefing and plan access, the full academy opens: Levels, Assessments, XP, and Progress.</p>
					</div>
				</div>

				<ul>
					<li>No skipping straight into advanced content.</li>
					<li>No XP/Progress clutter before onboarding.</li>
					<li>No coursework/exams before access is confirmed.</li>
					<li>Admin/test users with a valid plan can still enter normally.</li>
				</ul>

				<div class="beginner-plan-preview">
					<strong>Only two options appear here:</strong> start the briefing or open the payment/access plans.
				</div>

				<div class="beginner-action-row">
					<button type="button" onclick="beginnerStartBriefing()">Start Briefing</button>
					<button type="button" class="secondary" onclick="beginnerOpenPlans()">View Payment Plans</button>
				</div>
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("beginnerBriefing");
}

function beginnerStartBriefing() {
	document.body.classList.add("beginner-locked");

	if (typeof startBriefing === "function") {
		startBriefing();
		return;
	}

	state.briefingComplete = true;
	saveState();
	beginnerOpenPlans();
}

function beginnerOpenPlans() {
	updateBeginnerLockClass();
	showPlans();

	const panel = app.querySelector(".panel");
	if (panel && !panel.querySelector(".beginner-plan-lock-note")) {
		panel.insertAdjacentHTML("afterbegin", `
			<div class="beginner-plan-lock-note">
				New learners only see briefing and payment/access plans until a plan is selected.
				After plan access is confirmed, the full academy unlocks.
			</div>
		`);
	}
}

function beginnerGate(actionName, callback) {
	return function() {
		updateBeginnerLockClass();

		if (!beginnerIsBriefed()) {
			showBeginnerOnlyBriefing();
			return;
		}

		if (!beginnerHasPlan()) {
			beginnerOpenPlans();
			return;
		}

		document.body.classList.remove("beginner-locked");
		callback.apply(this, arguments);
	};
}

// Patch main sections so new users cannot reach them directly.
const beginnerOriginalShowHome = typeof showHome === "function" ? showHome : null;
if (beginnerOriginalShowHome) {
	showHome = function() {
		if (!beginnerIsUnlocked()) {
			showBeginnerOnlyBriefing();
			return;
		}
		document.body.classList.remove("beginner-locked");
		beginnerOriginalShowHome();
	};
}

["showAssessmentsHub", "showLevelHub", "showXpDashboard", "showProgress", "showPracticalCoursework", "showCourseworkExams"].forEach(function(fnName) {
	const original = window[fnName];
	if (typeof original === "function") {
		window[fnName] = beginnerGate(fnName, original);
	}
});

// Plans must remain accessible before full unlock.
const beginnerOriginalShowPlans = typeof showPlans === "function" ? showPlans : null;
if (beginnerOriginalShowPlans) {
	showPlans = function() {
		updateBeginnerLockClass();
		beginnerOriginalShowPlans();

		if (!beginnerIsUnlocked()) {
			document.body.classList.add("beginner-locked");
			const panel = app.querySelector(".panel");
			if (panel && !panel.querySelector(".beginner-plan-lock-note")) {
				panel.insertAdjacentHTML("afterbegin", `
					<div class="beginner-plan-lock-note">
						Choose a plan to unlock the full academy navigation.
					</div>
				`);
			}
		}
	};
}

// When a plan is selected, unlock nav if briefing is complete.
const beginnerOriginalSelectPlan = typeof selectPlan === "function" ? selectPlan : null;
if (beginnerOriginalSelectPlan) {
	selectPlan = function(planId) {
		beginnerOriginalSelectPlan(planId);
		updateBeginnerLockClass();

		if (beginnerIsUnlocked()) {
			document.body.classList.remove("beginner-locked");
		}
	};
}

const beginnerOriginalAdminSetPlan = typeof adminSetPlan === "function" ? adminSetPlan : null;
if (beginnerOriginalAdminSetPlan) {
	adminSetPlan = function(planId) {
		beginnerOriginalAdminSetPlan(planId);
		updateBeginnerLockClass();
	};
}

// Topbar stays hidden until unlocked; bind normally after unlock.
function bindBeginnerAwareTopbar() {
	updateBeginnerLockClass();

	const home = document.getElementById("navHome");
	const assessments = document.getElementById("navAssessments");
	const levels = document.getElementById("navLevels");
	const xp = document.getElementById("navXP");
	const progress = document.getElementById("navProgress");

	if (home) home.onclick = showHome;
	if (assessments && typeof showAssessmentsHub === "function") assessments.onclick = showAssessmentsHub;
	if (levels && typeof showLevelHub === "function") levels.onclick = showLevelHub;
	if (xp && typeof showXpDashboard === "function") xp.onclick = showXpDashboard;
	if (progress && typeof showProgress === "function") progress.onclick = showProgress;
}

bindBeginnerAwareTopbar();
document.addEventListener("DOMContentLoaded", function() {
	bindBeginnerAwareTopbar();

	if (!beginnerIsUnlocked()) {
		showBeginnerOnlyBriefing();
	}
});
setTimeout(function() {
	bindBeginnerAwareTopbar();
	if (!beginnerIsUnlocked()) showBeginnerOnlyBriefing();
}, 100);

// Make first screen strict for brand-new visitors.
if (!beginnerIsUnlocked()) {
	setTimeout(showBeginnerOnlyBriefing, 0);
}


// ---------- Plan bypasses briefing correction ----------
// Users with Free/Plus/Elite/Pro/Pro+/Lifetime/Admin access should NOT be forced through briefing.
// Briefing is only for visitors with no selected plan/access.

function beginnerHasPlan() {
	if (typeof hasPersistentAdminRole === "function" && hasPersistentAdminRole()) return true;
	if (typeof isAdminRank === "function" && isAdminRank()) return true;

	const currentPlan = typeof getCurrentPlan === "function" ? getCurrentPlan() : (state && state.plan ? state.plan : "");
	if (currentPlan && plans && plans[currentPlan]) return true;

	if (typeof hasPlan === "function") return hasPlan();
	return Boolean(state && state.plan);
}

function beginnerIsBriefed() {
	return Boolean(state && state.briefingComplete);
}

function beginnerIsUnlocked() {
	// Important: any valid plan bypasses briefing.
	return beginnerHasPlan();
}

function updateBeginnerLockClass() {
	if (beginnerIsUnlocked()) {
		document.body.classList.remove("beginner-locked");
	} else {
		document.body.classList.add("beginner-locked");
	}
}

function beginnerGate(actionName, callback) {
	return function() {
		updateBeginnerLockClass();

		// Has plan/admin? Go straight in. No briefing needed.
		if (beginnerHasPlan()) {
			document.body.classList.remove("beginner-locked");
			callback.apply(this, arguments);
			return;
		}

		// No plan and not briefed? Show briefing.
		if (!beginnerIsBriefed()) {
			showBeginnerOnlyBriefing();
			return;
		}

		// Briefed but still no plan? Show plans.
		beginnerOpenPlans();
	};
}

// Patch main screens again with corrected rule.
["showHome", "showAssessmentsHub", "showLevelHub", "showXpDashboard", "showProgress", "showPracticalCoursework", "showCourseworkExams"].forEach(function(fnName) {
	const original = window[fnName];
	if (typeof original === "function" && !original.__planBypassPatched) {
		const patched = beginnerGate(fnName, original);
		patched.__planBypassPatched = true;
		window[fnName] = patched;
	}
});

// Plans remain accessible if no plan.
const planBypassOriginalShowPlans = typeof showPlans === "function" ? showPlans : null;
if (planBypassOriginalShowPlans && !planBypassOriginalShowPlans.__planBypassPlansPatched) {
	const patchedShowPlans = function() {
		updateBeginnerLockClass();
		planBypassOriginalShowPlans();

		const panel = app.querySelector(".panel");
		if (!beginnerHasPlan() && panel && !panel.querySelector(".beginner-plan-lock-note")) {
			panel.insertAdjacentHTML("afterbegin", `
				<div class="beginner-plan-lock-note">
					Choose a plan to unlock the full academy. Users who already have Free, Plus, Elite, Pro, Pro+, Lifetime, or Admin access do not need to complete briefing.
				</div>
			`);
		}

		if (beginnerHasPlan()) {
			document.body.classList.remove("beginner-locked");
			if (panel && !panel.querySelector(".plan-bypass-note")) {
				panel.insertAdjacentHTML("afterbegin", `
					<div class="plan-bypass-note">
						Plan access detected. Briefing is skipped for existing plan users.
					</div>
				`);
			}
		}
	};
	patchedShowPlans.__planBypassPlansPatched = true;
	showPlans = patchedShowPlans;
}

// Selecting any plan unlocks immediately; no briefing required.
const planBypassOriginalSelectPlan = typeof selectPlan === "function" ? selectPlan : null;
if (planBypassOriginalSelectPlan && !planBypassOriginalSelectPlan.__planBypassSelectPatched) {
	const patchedSelectPlan = function(planId) {
		planBypassOriginalSelectPlan(planId);
		updateBeginnerLockClass();

		if (beginnerHasPlan()) {
			document.body.classList.remove("beginner-locked");
			showToast("Plan access active. Briefing skipped.");
		}
	};
	patchedSelectPlan.__planBypassSelectPatched = true;
	selectPlan = patchedSelectPlan;
}

// Admin plan assignment also unlocks immediately.
const planBypassOriginalAdminSetPlan = typeof adminSetPlan === "function" ? adminSetPlan : null;
if (planBypassOriginalAdminSetPlan && !planBypassOriginalAdminSetPlan.__planBypassAdminPatched) {
	const patchedAdminSetPlan = function(planId) {
		planBypassOriginalAdminSetPlan(planId);
		updateBeginnerLockClass();

		if (beginnerHasPlan()) {
			document.body.classList.remove("beginner-locked");
		}
	};
	patchedAdminSetPlan.__planBypassAdminPatched = true;
	adminSetPlan = patchedAdminSetPlan;
}

// On load: only no-plan visitors get briefing. Plan users go normal.
document.addEventListener("DOMContentLoaded", function() {
	updateBeginnerLockClass();

	if (!beginnerHasPlan()) {
		if (!beginnerIsBriefed()) {
			showBeginnerOnlyBriefing();
		} else {
			beginnerOpenPlans();
		}
	}
});

setTimeout(function() {
	updateBeginnerLockClass();

	if (!beginnerHasPlan() && !beginnerIsBriefed()) {
		showBeginnerOnlyBriefing();
	}
}, 100);


// ---------- FINAL HARD FIX: Pro+ Lifetime bypasses briefing ----------
// This sits at the end and wins over older onboarding logic.
// Pro+ Lifetime / Pro+ / Admin / any valid stored plan = full academy access.
// Briefing only appears when there is truly no plan/access.

function normalizeStoredPlanId(value) {
	value = String(value || "").trim().toLowerCase();

	const aliases = {
		"free": "free",
		"basic": "free",
		"basic/free": "free",
		"plus": "plus",
		"elite": "elite",
		"pro": "pro",
		"pro+": "proplus",
		"proplus": "proplus",
		"pro_plus": "proplus",
		"pro plus": "proplus",
		"pro+ monthly": "proplus",
		"proplus monthly": "proplus",
		"pro+ lifetime": "proplus_lifetime",
		"proplus lifetime": "proplus_lifetime",
		"pro plus lifetime": "proplus_lifetime",
		"pro_plus_lifetime": "proplus_lifetime",
		"proplus_lifetime": "proplus_lifetime",
		"lifetime": "proplus_lifetime",
		"admin": "admin"
	};

	return aliases[value] || value;
}

function getAllStoredPlanCandidates() {
	const candidates = [];

	try {
		candidates.push(state && state.plan);
	} catch (error) {}

	[
		"creatorAcademy.plan",
		"academyPlan",
		"creatorAcademy.currentPlan",
		"creatorAcademy.selectedPlan",
		"creatorAcademy.pendingPlan",
		"creatorAcademy.rank",
		"academyRank"
	].forEach(function(key) {
		try {
			candidates.push(localStorage.getItem(key));
		} catch (error) {}
	});

	try {
		if (localStorage.getItem("creatorAcademy.persistentAdminRole") === "true") {
			candidates.push("admin");
		}
	} catch (error) {}

	return candidates.map(normalizeStoredPlanId).filter(Boolean);
}

function getHardFixedActivePlan() {
	const candidates = getAllStoredPlanCandidates();

	// Highest priority first.
	const priority = ["admin", "proplus_lifetime", "proplus", "pro", "elite", "plus", "free"];

	for (const planId of priority) {
		if (candidates.includes(planId)) return planId;
	}

	// Fallback: any known plan object.
	for (const candidate of candidates) {
		if (typeof plans !== "undefined" && plans && plans[candidate]) return candidate;
	}

	return "";
}

function hardFixHasPlanAccess() {
	const active = getHardFixedActivePlan();
	return Boolean(active && typeof plans !== "undefined" && plans && plans[active]);
}

function hardFixApplyPlanAccess() {
	const active = getHardFixedActivePlan();

	if (!active) return false;

	try {
		state.plan = active;
		localStorage.setItem("creatorAcademy.plan", active);
		localStorage.setItem("academyPlan", active);

		if (active === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		}

		document.body.classList.remove("beginner-locked");
		return true;
	} catch (error) {
		return false;
	}
}

// Override plan helpers one last time.
getCurrentPlan = function() {
	const active = getHardFixedActivePlan();
	if (active) return active;
	return state && state.plan ? state.plan : "";
};

hasPlan = function() {
	return hardFixHasPlanAccess();
};

isAdminRank = function() {
	return getHardFixedActivePlan() === "admin";
};

getCurrentPlanRank = function() {
	const active = getCurrentPlan();
	if (active === "admin") return 99;
	return plans && plans[active] ? plans[active].rank : -1;
};

planMeetsRequirement = function(requiredPlan) {
	if (isAdminRank()) return true;

	const active = getCurrentPlan();
	if (!requiredPlan) return true;
	if (!plans || !plans[active] || !plans[requiredPlan]) return false;

	// Pro+ Lifetime counts as Pro+.
	if (active === "proplus_lifetime" && requiredPlan === "proplus") return true;

	return plans[active].rank >= plans[requiredPlan].rank;
};

beginnerHasPlan = function() {
	return hardFixHasPlanAccess();
};

beginnerIsUnlocked = function() {
	return hardFixHasPlanAccess();
};

updateBeginnerLockClass = function() {
	if (hardFixHasPlanAccess()) {
		document.body.classList.remove("beginner-locked");
	} else {
		document.body.classList.add("beginner-locked");
	}
};

function hardFixGate(callback) {
	return function() {
		if (hardFixApplyPlanAccess()) {
			callback.apply(this, arguments);
			return;
		}

		if (typeof showBeginnerOnlyBriefing === "function") {
			showBeginnerOnlyBriefing();
		} else if (typeof showPlans === "function") {
			showPlans();
		}
	};
}

// Patch main pages: plan access goes straight in.
["showHome", "showAssessmentsHub", "showLevelHub", "showXpDashboard", "showProgress", "showPracticalCoursework", "showCourseworkExams"].forEach(function(fnName) {
	const original = window[fnName];
	if (typeof original === "function") {
		window[fnName] = hardFixGate(original);
	}
});

// Selecting Pro+ Lifetime must store correctly.
const hardFixOriginalSelectPlan = typeof selectPlan === "function" ? selectPlan : null;
selectPlan = function(planId) {
	planId = normalizeStoredPlanId(planId);

	if (planId && plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (typeof saveState === "function") saveState();

		document.body.classList.remove("beginner-locked");
		showToast("Plan active: " + plans[planId].name);

		if (typeof showHome === "function") {
			setTimeout(showHome, 100);
		}
		return;
	}

	if (hardFixOriginalSelectPlan) {
		hardFixOriginalSelectPlan(planId);
	}
};

// Admin assignment also stores correctly.
const hardFixOriginalAdminSetPlan = typeof adminSetPlan === "function" ? adminSetPlan : null;
adminSetPlan = function(planId) {
	planId = normalizeStoredPlanId(planId);

	if (planId && plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (planId === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		} else {
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
		}

		state.briefingComplete = true;
		state.skillTreeUnlocked = true;
		if (typeof saveState === "function") saveState();

		document.body.classList.remove("beginner-locked");
		showToast("Rank set: " + plans[planId].name);

		if (typeof renderAdminDashboard === "function") {
			renderAdminDashboard("overview");
		}
		return;
	}

	if (hardFixOriginalAdminSetPlan) {
		hardFixOriginalAdminSetPlan(planId);
	}
};

function injectLifetimeAccessNote() {
	if (!hardFixHasPlanAccess()) return;

	const panel = app && app.querySelector(".panel, .hero-content");
	if (!panel || panel.querySelector(".lifetime-access-active-note")) return;

	const active = getCurrentPlan();
	const planName = plans && plans[active] ? plans[active].name : active;

	panel.insertAdjacentHTML("afterbegin", `
		<div class="lifetime-access-active-note">
			Access active: ${planName}. Briefing is bypassed.
		</div>
	`);
}

// On load: if any stored valid plan exists, unlock immediately.
function hardFixStartupUnlock() {
	if (hardFixApplyPlanAccess()) {
		injectLifetimeAccessNote();

		// If current screen is beginner lock despite plan access, send to home.
		const isBeginnerScreen = app && app.textContent && app.textContent.includes("Welcome to Creator Academy Hub") && app.textContent.includes("Start Briefing");
		if (isBeginnerScreen && typeof showHome === "function") {
			showHome();
		}
	}
}

hardFixStartupUnlock();
document.addEventListener("DOMContentLoaded", hardFixStartupUnlock);
setTimeout(hardFixStartupUnlock, 50);
setTimeout(hardFixStartupUnlock, 250);
setTimeout(hardFixStartupUnlock, 800);


// ---------- FINAL FIX: Basic / Free must NOT bypass ----------
// Access rules:
// Basic / Free / no plan -> briefing/plans.
// Plus / Elite / Pro / Pro+ / Pro+ Lifetime / Admin -> full academy access.

function isPaidOrAdminPlan(planId) {
	planId = normalizeStoredPlanId(planId);
	return ["plus", "elite", "pro", "proplus", "proplus_lifetime", "admin"].includes(planId);
}

function getPaidOrAdminActivePlan() {
	const candidates = getAllStoredPlanCandidates();

	const priority = ["admin", "proplus_lifetime", "proplus", "pro", "elite", "plus"];

	for (const planId of priority) {
		if (candidates.includes(planId)) return planId;
	}

	return "";
}

function hardFixHasPlanAccess() {
	return Boolean(getPaidOrAdminActivePlan());
}

function hardFixApplyPlanAccess() {
	const active = getPaidOrAdminActivePlan();

	if (!active) {
		document.body.classList.add("beginner-locked");
		return false;
	}

	state.plan = active;
	localStorage.setItem("creatorAcademy.plan", active);
	localStorage.setItem("academyPlan", active);

	if (active === "admin") {
		localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
	}

	document.body.classList.remove("beginner-locked");
	return true;
}

getCurrentPlan = function() {
	const paid = getPaidOrAdminActivePlan();
	if (paid) return paid;

	// Return free/basic for display only, but it is not access.
	const candidates = getAllStoredPlanCandidates();
	if (candidates.includes("free")) return "free";

	return state && state.plan ? normalizeStoredPlanId(state.plan) : "";
};

hasPlan = function() {
	return hardFixHasPlanAccess();
};

isAdminRank = function() {
	return getPaidOrAdminActivePlan() === "admin";
};

getCurrentPlanRank = function() {
	const active = getPaidOrAdminActivePlan();
	if (active === "admin") return 99;
	if (active && plans && plans[active]) return plans[active].rank;
	return -1;
};

planMeetsRequirement = function(requiredPlan) {
	if (isAdminRank()) return true;

	const active = getPaidOrAdminActivePlan();
	if (!active) return false;

	// Pro+ Lifetime counts as Pro+.
	if (active === "proplus_lifetime" && requiredPlan === "proplus") return true;

	if (!plans || !plans[active] || !plans[requiredPlan]) return false;
	return plans[active].rank >= plans[requiredPlan].rank;
};

beginnerHasPlan = function() {
	return hardFixHasPlanAccess();
};

beginnerIsUnlocked = function() {
	return hardFixHasPlanAccess();
};

updateBeginnerLockClass = function() {
	if (hardFixHasPlanAccess()) {
		document.body.classList.remove("beginner-locked");
	} else {
		document.body.classList.add("beginner-locked");
	}
};

function showFreeRequiresPlanScreen() {
	document.body.classList.add("beginner-locked");

	if (typeof showPlans === "function") {
		showPlans();

		const panel = app && app.querySelector(".panel");
		if (panel && !panel.querySelector(".free-requires-plan-note")) {
			panel.insertAdjacentHTML("afterbegin", `
				<div class="free-requires-plan-note">
					Basic / Free does not unlock the academy. Choose Plus or higher to enter, or use Admin for testing.
				</div>
			`);
		}
		return;
	}

	if (typeof showBeginnerOnlyBriefing === "function") {
		showBeginnerOnlyBriefing();
	}
}

function paidAccessGate(callback) {
	return function() {
		if (hardFixApplyPlanAccess()) {
			callback.apply(this, arguments);
			return;
		}

		// Free/basic/no-plan all go to plans/briefing path.
		showFreeRequiresPlanScreen();
	};
}

// Patch main areas again so Basic / Free cannot enter.
["showHome", "showAssessmentsHub", "showLevelHub", "showXpDashboard", "showProgress", "showPracticalCoursework", "showCourseworkExams"].forEach(function(fnName) {
	const original = window[fnName];
	if (typeof original === "function") {
		window[fnName] = paidAccessGate(original);
	}
});

// Selecting Free stores free but does not unlock. Selecting Plus+ unlocks.
const freeFixOriginalSelectPlan = typeof selectPlan === "function" ? selectPlan : null;
selectPlan = function(planId) {
	planId = normalizeStoredPlanId(planId);

	if (planId === "free") {
		state.plan = "free";
		localStorage.setItem("creatorAcademy.plan", "free");
		localStorage.setItem("academyPlan", "free");
		if (typeof saveState === "function") saveState();

		document.body.classList.add("beginner-locked");
		showToast("Basic / Free selected. Upgrade required to enter academy.");
		showFreeRequiresPlanScreen();
		return;
	}

	if (isPaidOrAdminPlan(planId) && plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (planId === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		} else {
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
		}

		state.briefingComplete = true;
		state.skillTreeUnlocked = true;
		if (typeof saveState === "function") saveState();

		document.body.classList.remove("beginner-locked");
		showToast("Access active: " + plans[planId].name);

		const realHome = window.showHome;
		if (typeof realHome === "function") {
			setTimeout(realHome, 100);
		}
		return;
	}

	if (freeFixOriginalSelectPlan) {
		freeFixOriginalSelectPlan(planId);
	}
};

// Admin assignment: Free still does not unlock; Plus+ and Admin do.
const freeFixOriginalAdminSetPlan = typeof adminSetPlan === "function" ? adminSetPlan : null;
adminSetPlan = function(planId) {
	planId = normalizeStoredPlanId(planId);

	if (planId === "free") {
		state.plan = "free";
		localStorage.setItem("creatorAcademy.plan", "free");
		localStorage.setItem("academyPlan", "free");
		localStorage.removeItem("creatorAcademy.persistentAdminRole");
		if (typeof saveState === "function") saveState();

		document.body.classList.add("beginner-locked");
		showToast("Rank set: Basic / Free. Upgrade required to enter.");
		if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
		return;
	}

	if (isPaidOrAdminPlan(planId) && plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (planId === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		} else {
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
		}

		state.briefingComplete = true;
		state.skillTreeUnlocked = true;
		if (typeof saveState === "function") saveState();

		document.body.classList.remove("beginner-locked");
		showToast("Rank set: " + plans[planId].name);

		if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
		return;
	}

	if (freeFixOriginalAdminSetPlan) {
		freeFixOriginalAdminSetPlan(planId);
	}
};

function removeWrongFreeBypassBanner() {
	document.querySelectorAll(".lifetime-access-active-note, .plan-bypass-note, .admin-role-active-banner").forEach(function(element) {
		if (element.textContent && element.textContent.toLowerCase().includes("basic")) {
			element.remove();
		}
	});
}

// Startup: Basic / Free gets plans. Paid/Admin gets full access.
function freeFixStartup() {
	removeWrongFreeBypassBanner();

	if (hardFixApplyPlanAccess()) {
		document.body.classList.remove("beginner-locked");
		return;
	}

	document.body.classList.add("beginner-locked");

	const active = normalizeStoredPlanId(state && state.plan ? state.plan : localStorage.getItem("creatorAcademy.plan"));
	if (active === "free" || active === "basic" || active === "basic/free") {
		showFreeRequiresPlanScreen();
	}
}

freeFixStartup();
document.addEventListener("DOMContentLoaded", freeFixStartup);
setTimeout(freeFixStartup, 50);
setTimeout(freeFixStartup, 250);
setTimeout(removeWrongFreeBypassBanner, 500);


// ---------- Polished plans + relevant descriptions ----------
// Keeps Basic / Free locked, but makes the page look like Creator Academy Hub.
// Rewrites plans around actual academy access.

Object.assign(plans.free, {
	name: "Basic / Free",
	publicName: "Basic",
	price: "£0",
	monthly: "",
	description: "Preview-only access. Basic lets a new visitor see the academy pitch and plan options, but it does not unlock the learning dashboard.",
	features: [
		"Academy landing preview",
		"Payment/access plan page",
		"No Levels access",
		"No Assessments access",
		"No XP dashboard access"
	]
});

Object.assign(plans.plus, {
	name: "Plus",
	publicName: "Plus",
	price: "£4.99",
	monthly: "/mo",
	description: "Entry paid access for beginners who want to start the academy properly instead of just previewing it.",
	features: [
		"Unlocks the full academy interface",
		"Access to early Levels and lesson slots",
		"Practical coursework access",
		"XP progression enabled",
		"Best starting tier for new learners"
	]
});

Object.assign(plans.elite, {
	name: "Elite",
	publicName: "Elite",
	price: "£9.99",
	monthly: "/mo",
	description: "For learners who want stronger practice, more coursework structure, and intermediate-level progression.",
	features: [
		"Everything in Plus",
		"More practical coursework depth",
		"Workshop-style level tasks",
		"Intermediate creator training focus",
		"Better for consistent weekly learning"
	]
});

Object.assign(plans.pro, {
	name: "Pro",
	publicName: "Pro",
	price: "£14.99",
	monthly: "/mo",
	description: "For serious learners building real projects, polishing skills, and moving toward advanced creator workflows.",
	features: [
		"Everything in Elite",
		"Advanced lesson progression",
		"Harder practical gates",
		"Exam/review preparation",
		"Project-focused creator path"
	]
});

Object.assign(plans.proplus, {
	name: "Pro+",
	publicName: "Pro+",
	price: "£24.99",
	monthly: "/mo",
	description: "Highest public monthly tier. Built for learners who want all public levels, all assessment paths, and the full creator academy route.",
	features: [
		"Everything in Pro",
		"All 10 public academy levels",
		"Advanced systems, UI/UX, VFX, publishing, and business",
		"Full coursework and exam/review access",
		"Highest public monthly rank"
	]
});

if (plans.proplus_lifetime) {
	Object.assign(plans.proplus_lifetime, {
		name: "Pro+ Lifetime",
		publicName: "Pro+ Lifetime",
		price: "£334",
		monthly: " one-time",
		description: "One-time Pro+ access for long-term learners who want the full public academy without a monthly subscription.",
		features: [
			"Everything in Pro+ monthly",
			"One-time payment",
			"Lifetime public Pro+ access",
			"All 10 public levels",
			"Best for committed long-term learners"
		]
	});
}

const relevantPlanUseCases = {
	free: "Use this only as a public preview. It should not let learners enter the actual academy.",
	plus: "Use this to start learning properly from the beginning.",
	elite: "Use this when the learner wants stronger coursework and more serious practice.",
	pro: "Use this for learners building real Roblox creator projects.",
	proplus: "Use this for full monthly access to every public level and assessment.",
	proplus_lifetime: "Use this for full long-term access without monthly billing."
};

function renderRelevantPlanCard(planId) {
	const plan = plans[planId];
	if (!plan) return "";

	const active = getCurrentPlan && getCurrentPlan() === planId;
	const pending = typeof getPendingPlan === "function" && getPendingPlan() === planId;

	const classes = [
		"plan-card",
		planId === "free" ? "preview-only" : "",
		planId === "plus" ? "plus-entry" : "",
		planId === "pro" ? "featured" : "",
		planId === "proplus" ? "proplus" : "",
		planId === "proplus_lifetime" ? "lifetime best-value" : ""
	].join(" ");

	const ribbon =
		planId === "free" ? `<div class="plan-ribbon">Preview Only</div>` :
		planId === "plus" ? `<div class="plan-ribbon">Start Here</div>` :
		planId === "pro" ? `<div class="plan-ribbon">Project Builder</div>` :
		planId === "proplus" ? `<div class="plan-ribbon">Full Monthly</div>` :
		planId === "proplus_lifetime" ? `<div class="plan-ribbon">Best Long-Term</div>` :
		"";

	const buttonHtml = planId === "free"
		? `<button type="button" class="secondary" onclick="selectPlan('free')">${active ? "Preview Selected" : "Stay on Preview"}</button>`
		: `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}'); return false;">${pending ? "Resume Stripe Checkout" : "Choose " + plan.name}</button>`;

	const warning = planId === "free"
		? `<div class="plan-current-warning">Basic / Free does not unlock the academy. Choose Plus or higher to enter.</div>`
		: "";

	return `
		<div class="${classes}">
			${ribbon}
			<div>
				<span class="rank-badge">${plan.publicName}</span>
				<h3 class="plan-name">${plan.name}</h3>
				<div class="plan-price">${plan.price}<span>${plan.monthly}</span></div>
				<p>${plan.description}</p>
				<ul class="plan-features">
					${plan.features.map(function(feature) {
						return `<li>${feature}</li>`;
					}).join("")}
				</ul>
				<div class="plan-use-case">${relevantPlanUseCases[planId] || ""}</div>
				${warning}
			</div>
			${buttonHtml}
		</div>
	`;
}

function showPolishedPlansPage() {
	const activePlan = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
	const planName = activePlan && plans[activePlan] ? plans[activePlan].name : "No paid access";

	const visiblePlans = ["free", "plus", "elite", "pro", "proplus"];
	if (plans.proplus_lifetime) visiblePlans.push("proplus_lifetime");

	app.innerHTML = `
		<section class="panel">
			<div class="plan-gate-hero">
				<span class="plan-gate-badge">Structured Creator Training</span>
				<h1><span>Creator</span> Academy Hub</h1>
				<p>
					A focused academy for Roblox Lua, Roblox Studio, Blender, Moon Animator, UI/UX, VFX, publishing, and creator business.
					Choose access before entering the full learning dashboard.
				</p>

				<div class="plan-gate-flow">
					<div class="plan-gate-step">
						<strong>1. Choose access</strong>
						<span>Basic is only a preview. Plus or higher unlocks the academy.</span>
					</div>
					<div class="plan-gate-step">
						<strong>2. Learn in levels</strong>
						<span>Progress through structured lessons, workshops, and final gates.</span>
					</div>
					<div class="plan-gate-step">
						<strong>3. Prove skill</strong>
						<span>Use coursework, exams/reviews, XP, and evidence-based tasks.</span>
					</div>
				</div>
			</div>

			${activePlan === "free" || !hardFixHasPlanAccess || !hardFixHasPlanAccess() ? `
				<div class="plan-gate-warning">
					Basic / Free is a preview only. To enter Creator Academy Hub, choose Plus or higher.
				</div>
			` : ""}

			<div class="plan-status-panel">
				<div>
					<h3>Current Access</h3>
					<p>${planName}</p>
				</div>
				<span class="rank-badge ${typeof isAdminRank === "function" && isAdminRank() ? "admin" : ""}">
					${activePlan && plans[activePlan] ? plans[activePlan].publicName : "No Access"}
				</span>
			</div>

			<div class="plan-grid relevant-plans">
				${visiblePlans.map(renderRelevantPlanCard).join("")}
			</div>

			<div class="plan-page-footer-note">
				<strong>Admin is hidden:</strong> Admin access is for testing/internal control only and is not sold as a public plan.
				Payments use Stripe links in this static prototype; automatic unlock would need backend verification later.
			</div>
		</section>
	`;

	if (typeof setCurrentView === "function") setCurrentView("plans");
}

// Override the plan screen last so the free/basic gate still looks like the real academy.
showPlans = showPolishedPlansPage;

showFreeRequiresPlanScreen = function() {
	document.body.classList.add("beginner-locked");
	showPolishedPlansPage();
};

// If the visitor is free/no-plan, send them to the polished plan gate rather than a plain page.
const polishedOriginalShowHome = typeof showHome === "function" ? showHome : null;
showHome = function() {
	if (typeof hardFixHasPlanAccess === "function" && !hardFixHasPlanAccess()) {
		showPolishedPlansPage();
		return;
	}

	if (polishedOriginalShowHome) polishedOriginalShowHome();
};

setTimeout(function() {
	if (typeof hardFixHasPlanAccess === "function" && !hardFixHasPlanAccess()) {
		showPolishedPlansPage();
	}
}, 150);


// ---------- Minimal Platinum Plan Patch: no website revamp ----------
// Adds Platinum Monthly to the existing site without changing the academy structure/design.

plans.platinum = {
	name: "Platinum",
	publicName: "Platinum",
	price: "£39.99",
	rank: 5,
	monthly: "/mo",
	description: "Highest public monthly tier. Platinum is for serious learners who want the strongest monthly academy access above Pro+.",
	features: [
		"Everything in Pro+",
		"Highest public monthly rank",
		"All 10 academy levels",
		"Full coursework access",
		"Full exam/review access",
		"Premium creator project route"
	]
};

stripePaymentLinks.platinum = "";

if (typeof planOrder !== "undefined" && Array.isArray(planOrder) && !planOrder.includes("platinum")) {
	const adminIndex = planOrder.indexOf("admin");
	if (adminIndex >= 0) {
		planOrder.splice(adminIndex, 0, "platinum");
	} else {
		planOrder.push("platinum");
	}
}

const platinumOriginalNormalizeStoredPlanId = typeof normalizeStoredPlanId === "function" ? normalizeStoredPlanId : null;
if (platinumOriginalNormalizeStoredPlanId) {
	normalizeStoredPlanId = function(value) {
		value = String(value || "").trim().toLowerCase();
		if (["platinum", "platinum monthly", "platinum_monthly"].includes(value)) return "platinum";
		return platinumOriginalNormalizeStoredPlanId(value);
	};
}

const platinumOriginalIsPaidOrAdminPlan = typeof isPaidOrAdminPlan === "function" ? isPaidOrAdminPlan : null;
if (platinumOriginalIsPaidOrAdminPlan) {
	isPaidOrAdminPlan = function(planId) {
		planId = typeof normalizeStoredPlanId === "function" ? normalizeStoredPlanId(planId) : planId;
		if (planId === "platinum") return true;
		return platinumOriginalIsPaidOrAdminPlan(planId);
	};
}

const platinumOriginalPlanMeetsRequirement = typeof planMeetsRequirement === "function" ? planMeetsRequirement : null;
if (platinumOriginalPlanMeetsRequirement) {
	planMeetsRequirement = function(requiredPlan) {
		if (typeof getCurrentPlan === "function" && getCurrentPlan() === "platinum") return true;
		return platinumOriginalPlanMeetsRequirement(requiredPlan);
	};
}

const platinumOriginalHardFixHasPlanAccess = typeof hardFixHasPlanAccess === "function" ? hardFixHasPlanAccess : null;
if (platinumOriginalHardFixHasPlanAccess) {
	hardFixHasPlanAccess = function() {
		if (typeof getCurrentPlan === "function" && getCurrentPlan() === "platinum") return true;
		return platinumOriginalHardFixHasPlanAccess();
	};
}

const platinumOriginalBeginnerHasPlan = typeof beginnerHasPlan === "function" ? beginnerHasPlan : null;
if (platinumOriginalBeginnerHasPlan) {
	beginnerHasPlan = function() {
		if (typeof getCurrentPlan === "function" && getCurrentPlan() === "platinum") return true;
		return platinumOriginalBeginnerHasPlan();
	};
}

const platinumOriginalRenderRelevantPlanCard = typeof renderRelevantPlanCard === "function" ? renderRelevantPlanCard : null;
if (platinumOriginalRenderRelevantPlanCard) {
	renderRelevantPlanCard = function(planId) {
		const html = platinumOriginalRenderRelevantPlanCard(planId);
		if (planId !== "platinum") return html;

		return html
			.replace('plan-card ', 'plan-card platinum-plan ')
			.replace('class="plan-ribbon">', 'class="plan-ribbon">Best Monthly • ');
	};
}

const platinumOriginalShowPolishedPlansPage = typeof showPolishedPlansPage === "function" ? showPolishedPlansPage : null;
if (platinumOriginalShowPolishedPlansPage) {
	showPolishedPlansPage = function() {
		platinumOriginalShowPolishedPlansPage();

		const grid = document.querySelector(".plan-grid");
		if (!grid || grid.querySelector(".platinum-plan")) return;

		const lifetimeCard = Array.from(grid.children).find(function(card) {
			return card.textContent.includes("Pro+ Lifetime");
		});

		const platinumHtml = typeof renderRelevantPlanCard === "function"
			? renderRelevantPlanCard("platinum")
			: "";

		if (platinumHtml) {
			if (lifetimeCard) {
				lifetimeCard.insertAdjacentHTML("afterend", platinumHtml);
			} else {
				grid.insertAdjacentHTML("beforeend", platinumHtml);
			}
		}
	};
	showPlans = showPolishedPlansPage;
}

const platinumOriginalAdminSetPlan = typeof adminSetPlan === "function" ? adminSetPlan : null;
if (platinumOriginalAdminSetPlan) {
	adminSetPlan = function(planId) {
		planId = typeof normalizeStoredPlanId === "function" ? normalizeStoredPlanId(planId) : planId;
		if (planId === "platinum") {
			state.plan = "platinum";
			localStorage.setItem("creatorAcademy.plan", "platinum");
			localStorage.setItem("academyPlan", "platinum");
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
			state.briefingComplete = true;
			state.skillTreeUnlocked = true;
			if (typeof saveState === "function") saveState();
			document.body.classList.remove("beginner-locked");
			showToast("Rank set: Platinum");
			if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
			return;
		}
		return platinumOriginalAdminSetPlan(planId);
	};
}

// If existing admin plan controls exist, add Platinum button visually.
const platinumOriginalAdminRenderPlanControls = typeof adminRenderPlanControls === "function" ? adminRenderPlanControls : null;
if (platinumOriginalAdminRenderPlanControls) {
	adminRenderPlanControls = function() {
		let html = platinumOriginalAdminRenderPlanControls();
		if (!html.includes("adminSetPlan('platinum')")) {
			html = html.replace(
				`<button type="button" class="secondary" onclick="adminSetPlan('admin')">Admin</button>`,
				`<button type="button" onclick="adminSetPlan('platinum')">Platinum</button><button type="button" class="secondary" onclick="adminSetPlan('admin')">Admin</button>`
			);
		}
		return html;
	};
}


// ---------- Grouped plan options patch ----------
// Keeps the same site style, but fixes plan hierarchy:
// Pro+ Lifetime is above Platinum Monthly.
// Platinum is highest MONTHLY, not higher than lifetime.
// Pro+ card contains Monthly + Lifetime choices inside one card.

if (plans.proplus_lifetime) {
	plans.proplus_lifetime.rank = 6;
}

if (plans.platinum) {
	plans.platinum.rank = 5;
	plans.platinum.description = "Highest public monthly tier. Platinum is stronger than Pro+ monthly, but Pro+ Lifetime remains the highest public access overall.";
	plans.platinum.features = [
		"Everything in Pro+ monthly",
		"Highest public monthly rank",
		"All 10 academy levels",
		"Full coursework and exam/review access",
		"Premium creator project route",
		"Monthly option below Pro+ Lifetime"
	];
}

const groupedPlanOrder = ["free", "plus", "elite", "pro", "proplus", "platinum"];

function getGroupedPlanRibbon(planId) {
	if (planId === "free") return "Preview Only";
	if (planId === "plus") return "Start Here";
	if (planId === "pro") return "Project Builder";
	if (planId === "proplus") return "Monthly + Lifetime";
	if (planId === "platinum") return "Best Monthly";
	return "";
}

function renderGroupedPlanCard(planId) {
	const plan = plans[planId];
	if (!plan) return "";

	const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
	const isCurrent = current === planId || (planId === "proplus" && current === "proplus_lifetime");
	const ribbon = getGroupedPlanRibbon(planId);

	const classes = [
		"plan-card",
		planId === "free" ? "preview-only" : "",
		planId === "plus" ? "plus-entry" : "",
		planId === "pro" ? "featured" : "",
		planId === "proplus" ? "proplus grouped-choice-card" : "",
		planId === "platinum" ? "platinum-plan" : ""
	].join(" ");

	const mainButton = planId === "free"
		? `<button type="button" class="secondary" onclick="selectPlan('free')">${isCurrent ? "Preview Selected" : "Stay on Preview"}</button>`
		: `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}'); return false;">Choose ${plan.name} Monthly</button>`;

	const proPlusOptions = planId === "proplus" && plans.proplus_lifetime
		? `
			<div class="plan-option-box">
				<h4>Choose Pro+ Access</h4>

				<div class="plan-choice-row">
					<div>
						<strong>Pro+ Monthly</strong>
						<span>£24.99/mo • full monthly access</span>
					</div>
					<button type="button" onclick="goToStripePlan('proplus'); return false;">Monthly</button>
				</div>

				<div class="plan-choice-row lifetime-choice">
					<div>
						<strong>Pro+ Lifetime</strong>
						<span>£334 one-time • highest public access overall</span>
					</div>
					<button type="button" onclick="goToStripePlan('proplus_lifetime'); return false;">Lifetime</button>
				</div>
			</div>
		`
		: "";

	const rankNote = planId === "platinum"
		? `<div class="plan-current-warning">Platinum is the highest monthly plan. Pro+ Lifetime still ranks above it.</div>`
		: planId === "proplus"
			? `<div class="plan-current-warning">Pro+ Lifetime is kept inside this Pro+ card and ranks above Platinum Monthly.</div>`
			: "";

	return `
		<div class="${classes}">
			${ribbon ? `<div class="plan-ribbon">${ribbon}</div>` : ""}
			<div>
				<span class="rank-badge">${plan.publicName}</span>
				<h3 class="plan-name">${plan.name}</h3>
				<div class="plan-price">${plan.price}<span>${plan.monthly || plan.period || ""}</span></div>
				<p>${plan.description || plan.desc || ""}</p>
				<ul class="plan-features">
					${(plan.features || []).map(function(feature) {
						return `<li>${feature}</li>`;
					}).join("")}
				</ul>
				<div class="plan-use-case">${typeof relevantPlanUseCases !== "undefined" && relevantPlanUseCases[planId] ? relevantPlanUseCases[planId] : (plan.use || "")}</div>
				${rankNote}
				${planId === "free" ? `<div class="plan-current-warning">Basic / Free does not unlock the academy. Choose Plus or higher to enter.</div>` : ""}
				${proPlusOptions}
			</div>
			${planId === "proplus" ? "" : mainButton}
		</div>
	`;
}

if (typeof showPolishedPlansPage === "function") {
	showPolishedPlansPage = function() {
		const activePlan = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
		const planName = activePlan && plans[activePlan] ? plans[activePlan].name : "No paid access";

		app.innerHTML = `
			<section class="panel">
				<div class="plan-gate-hero">
					<span class="plan-gate-badge">Structured Creator Training</span>
					<h1><span>Creator</span> Academy Hub</h1>
					<p>
						A focused academy for Roblox Lua, Roblox Studio, Blender, Moon Animator, UI/UX, VFX, publishing, and creator business.
						Choose access before entering the full learning dashboard.
					</p>

					<div class="plan-gate-flow">
						<div class="plan-gate-step">
							<strong>1. Choose access</strong>
							<span>Basic is only a preview. Plus or higher unlocks the academy.</span>
						</div>
						<div class="plan-gate-step">
							<strong>2. Learn in levels</strong>
							<span>Progress through structured lessons, workshops, and final gates.</span>
						</div>
						<div class="plan-gate-step">
							<strong>3. Prove skill</strong>
							<span>Use coursework, exams/reviews, XP, and evidence-based tasks.</span>
						</div>
					</div>
				</div>

				${typeof hardFixHasPlanAccess === "function" && hardFixHasPlanAccess() ? "" : `
					<div class="plan-gate-warning">
						Basic / Free is a preview only. To enter Creator Academy Hub, choose Plus or higher.
					</div>
				`}

				<div class="plan-status-panel">
					<div>
						<h3>Current Access</h3>
						<p>${planName}</p>
					</div>
					<span class="rank-badge ${typeof isAdminRank === "function" && isAdminRank() ? "admin" : ""}">
						${activePlan && plans[activePlan] ? plans[activePlan].publicName : "No Access"}
					</span>
				</div>

				<div class="plan-grid relevant-plans grouped-plan-grid">
					${groupedPlanOrder.map(renderGroupedPlanCard).join("")}
				</div>

				<div class="plan-page-footer-note">
					<strong>Ranking clarity:</strong> Platinum is the highest public monthly plan. Pro+ Lifetime is still above Platinum because it is a lifetime public access tier.
					Admin remains hidden and internal only.
				</div>
			</section>
		`;

		if (typeof setCurrentView === "function") setCurrentView("plans");
	};

	showPlans = showPolishedPlansPage;
}

if (typeof planMeetsRequirement === "function") {
	const groupedOriginalPlanMeetsRequirement = planMeetsRequirement;
	planMeetsRequirement = function(requiredPlan) {
		const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";

		if (current === "admin") return true;
		if (current === "proplus_lifetime") return true;
		if (current === "platinum") return true;

		return groupedOriginalPlanMeetsRequirement(requiredPlan);
	};
}

if (typeof getCurrentPlanRank === "function") {
	const groupedOriginalGetCurrentPlanRank = getCurrentPlanRank;
	getCurrentPlanRank = function() {
		const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";

		if (current === "admin") return 99;
		if (current === "proplus_lifetime") return 6;
		if (current === "platinum") return 5;

		return groupedOriginalGetCurrentPlanRank();
	};
}


// ---------- Pro+ single button choice modal patch ----------
// Pro+ card now has one button. Clicking it opens Monthly / Lifetime choices.

function openProPlusChoiceModal() {
	const old = document.getElementById("proPlusChoiceModal");
	if (old) old.remove();

	const modal = document.createElement("div");
	modal.id = "proPlusChoiceModal";
	modal.className = "proplus-choice-backdrop";
	modal.innerHTML = `
		<div class="proplus-choice-modal">
			<div class="proplus-choice-head">
				<div>
					<span class="badge">Pro+ Access</span>
					<h2>Choose Pro+</h2>
					<p>Pick monthly access or lifetime access.</p>
				</div>
				<button type="button" class="secondary" onclick="closeProPlusChoiceModal()">Close</button>
			</div>

			<div class="proplus-choice-grid">
				<button type="button" class="proplus-choice-card" onclick="goToStripePlan('proplus'); closeProPlusChoiceModal(); return false;">
					<span>Monthly</span>
					<strong>£24.99/mo</strong>
					<p>Full Pro+ monthly access. Best if the learner wants to pay monthly.</p>
				</button>

				<button type="button" class="proplus-choice-card lifetime" onclick="goToStripePlan('proplus_lifetime'); closeProPlusChoiceModal(); return false;">
					<span>Lifetime</span>
					<strong>£334 one-time</strong>
					<p>Highest public access overall. One-time Pro+ Lifetime payment.</p>
				</button>
			</div>

			<div class="proplus-choice-note">
				Pro+ Lifetime ranks above Platinum Monthly overall. Platinum is only the highest monthly plan.
			</div>
		</div>
	`;

	document.body.appendChild(modal);

	modal.addEventListener("click", function(event) {
		if (event.target === modal) {
			closeProPlusChoiceModal();
		}
	});
}

function closeProPlusChoiceModal() {
	const modal = document.getElementById("proPlusChoiceModal");
	if (modal) modal.remove();
}

// Override plan card render so Pro+ has one clean button instead of inline Monthly/Lifetime boxes.
if (typeof renderGroupedPlanCard === "function") {
	renderGroupedPlanCard = function(planId) {
		const plan = plans[planId];
		if (!plan) return "";

		const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
		const isCurrent = current === planId || (planId === "proplus" && current === "proplus_lifetime");
		const ribbon = typeof getGroupedPlanRibbon === "function" ? getGroupedPlanRibbon(planId) : "";

		const classes = [
			"plan-card",
			planId === "free" ? "preview-only" : "",
			planId === "plus" ? "plus-entry" : "",
			planId === "pro" ? "featured" : "",
			planId === "proplus" ? "proplus grouped-choice-card proplus-single-button-card" : "",
			planId === "platinum" ? "platinum-plan" : ""
		].join(" ");

		let buttonHtml = "";

		if (planId === "free") {
			buttonHtml = `<button type="button" class="secondary" onclick="selectPlan('free')">${isCurrent ? "Preview Selected" : "Stay on Preview"}</button>`;
		} else if (planId === "proplus") {
			buttonHtml = `<button type="button" class="payment-link-button proplus-main-choice-button" onclick="openProPlusChoiceModal(); return false;">Choose Pro+</button>`;
		} else {
			buttonHtml = `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}'); return false;">Choose ${plan.name}</button>`;
		}

		const rankNote = planId === "platinum"
			? `<div class="plan-current-warning">Platinum is the highest monthly plan. Pro+ Lifetime still ranks above it.</div>`
			: planId === "proplus"
				? `<div class="plan-current-warning">Click Choose Pro+ to pick Monthly or Lifetime.</div>`
				: "";

		return `
			<div class="${classes}">
				${ribbon ? `<div class="plan-ribbon">${ribbon}</div>` : ""}
				<div>
					<span class="rank-badge">${plan.publicName}</span>
					<h3 class="plan-name">${plan.name}</h3>
					<div class="plan-price">${plan.price}<span>${plan.monthly || plan.period || ""}</span></div>
					<p>${plan.description || plan.desc || ""}</p>
					<ul class="plan-features">
						${(plan.features || []).map(function(feature) {
							return `<li>${feature}</li>`;
						}).join("")}
					</ul>
					<div class="plan-use-case">${typeof relevantPlanUseCases !== "undefined" && relevantPlanUseCases[planId] ? relevantPlanUseCases[planId] : (plan.use || "")}</div>
					${rankNote}
					${planId === "free" ? `<div class="plan-current-warning">Basic / Free does not unlock the academy. Choose Plus or higher to enter.</div>` : ""}
				</div>
				${buttonHtml}
			</div>
		`;
	};
}

// Esc closes Pro+ modal.
document.addEventListener("keydown", function(event) {
	if (event.key === "Escape") {
		closeProPlusChoiceModal();
	}
});


// ---------- Platinum Lifetime choice patch ----------
// Adds Platinum Lifetime and makes Platinum card open Monthly / Lifetime choices.
// Platinum Lifetime ranks above Platinum Monthly.
// Public ranking: Platinum Lifetime > Pro+ Lifetime > Platinum Monthly > Pro+ Monthly.

plans.platinum_lifetime = {
	name: "Platinum Lifetime",
	publicName: "Platinum Lifetime",
	price: "£549.99",
	rank: 7,
	monthly: " one-time",
	description: "Highest public lifetime tier. Platinum Lifetime is for committed learners who want the strongest public access without monthly billing.",
	features: [
		"Everything in Platinum Monthly",
		"Highest public lifetime rank",
		"All 10 academy levels",
		"Full coursework and exam/review access",
		"Premium creator project route",
		"One-time lifetime payment"
	]
};

stripePaymentLinks.platinum_lifetime = "";

if (plans.proplus_lifetime) plans.proplus_lifetime.rank = 6;
if (plans.platinum) {
	plans.platinum.rank = 5;
	plans.platinum.description = "Highest public monthly tier. Platinum Monthly is stronger than Pro+ monthly, while Platinum Lifetime is the highest public plan overall.";
}

const platinumLifetimeOriginalNormalizeStoredPlanId = typeof normalizeStoredPlanId === "function" ? normalizeStoredPlanId : null;
if (platinumLifetimeOriginalNormalizeStoredPlanId) {
	normalizeStoredPlanId = function(value) {
		value = String(value || "").trim().toLowerCase();
		if (["platinum lifetime", "platinum_lifetime", "platinum+ lifetime", "platinum plus lifetime"].includes(value)) return "platinum_lifetime";
		if (["platinum", "platinum monthly", "platinum_monthly"].includes(value)) return "platinum";
		return platinumLifetimeOriginalNormalizeStoredPlanId(value);
	};
}

function openPlatinumChoiceModal() {
	const old = document.getElementById("platinumChoiceModal");
	if (old) old.remove();

	const modal = document.createElement("div");
	modal.id = "platinumChoiceModal";
	modal.className = "proplus-choice-backdrop platinum-choice-backdrop";
	modal.innerHTML = `
		<div class="proplus-choice-modal platinum-choice-modal">
			<div class="proplus-choice-head">
				<div>
					<span class="badge">Platinum Access</span>
					<h2>Choose Platinum</h2>
					<p>Pick monthly access or lifetime access.</p>
				</div>
				<button type="button" class="secondary" onclick="closePlatinumChoiceModal()">Close</button>
			</div>

			<div class="proplus-choice-grid">
				<button type="button" class="proplus-choice-card platinum-monthly-choice" onclick="goToStripePlan('platinum'); closePlatinumChoiceModal(); return false;">
					<span>Monthly</span>
					<strong>£39.99/mo</strong>
					<p>Highest public monthly tier. Best if the learner wants top monthly access.</p>
				</button>

				<button type="button" class="proplus-choice-card lifetime platinum-lifetime-choice" onclick="goToStripePlan('platinum_lifetime'); closePlatinumChoiceModal(); return false;">
					<span>Lifetime</span>
					<strong>£549.99 one-time</strong>
					<p>Highest public access overall. One-time Platinum Lifetime payment.</p>
				</button>
			</div>

			<div class="proplus-choice-note">
				Ranking: Platinum Lifetime > Pro+ Lifetime > Platinum Monthly > Pro+ Monthly.
			</div>
		</div>
	`;

	document.body.appendChild(modal);

	modal.addEventListener("click", function(event) {
		if (event.target === modal) {
			closePlatinumChoiceModal();
		}
	});
}

function closePlatinumChoiceModal() {
	const modal = document.getElementById("platinumChoiceModal");
	if (modal) modal.remove();
}

// Override grouped card renderer again so Platinum is also a single button with Monthly/Lifetime choices.
if (typeof renderGroupedPlanCard === "function") {
	renderGroupedPlanCard = function(planId) {
		const plan = plans[planId];
		if (!plan) return "";

		const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
		const isCurrent = current === planId || (planId === "proplus" && current === "proplus_lifetime") || (planId === "platinum" && current === "platinum_lifetime");
		const ribbon = typeof getGroupedPlanRibbon === "function" ? getGroupedPlanRibbon(planId) : "";

		const classes = [
			"plan-card",
			planId === "free" ? "preview-only" : "",
			planId === "plus" ? "plus-entry" : "",
			planId === "pro" ? "featured" : "",
			planId === "proplus" ? "proplus grouped-choice-card proplus-single-button-card" : "",
			planId === "platinum" ? "platinum-plan platinum-single-button-card" : ""
		].join(" ");

		let buttonHtml = "";

		if (planId === "free") {
			buttonHtml = `<button type="button" class="secondary" onclick="selectPlan('free')">${isCurrent ? "Preview Selected" : "Stay on Preview"}</button>`;
		} else if (planId === "proplus") {
			buttonHtml = `<button type="button" class="payment-link-button proplus-main-choice-button" onclick="openProPlusChoiceModal(); return false;">Choose Pro+</button>`;
		} else if (planId === "platinum") {
			buttonHtml = `<button type="button" class="payment-link-button platinum-main-choice-button" onclick="openPlatinumChoiceModal(); return false;">Choose Platinum</button>`;
		} else {
			buttonHtml = `<button type="button" class="payment-link-button" onclick="goToStripePlan('${planId}'); return false;">Choose ${plan.name}</button>`;
		}

		const rankNote = planId === "platinum"
			? `<div class="plan-current-warning">Click Choose Platinum to pick Monthly or Lifetime. Platinum Lifetime is the highest public plan.</div>`
			: planId === "proplus"
				? `<div class="plan-current-warning">Click Choose Pro+ to pick Monthly or Lifetime.</div>`
				: "";

		return `
			<div class="${classes}">
				${ribbon ? `<div class="plan-ribbon">${ribbon}</div>` : ""}
				<div>
					<span class="rank-badge">${plan.publicName}</span>
					<h3 class="plan-name">${plan.name}</h3>
					<div class="plan-price">${plan.price}<span>${plan.monthly || plan.period || ""}</span></div>
					<p>${plan.description || plan.desc || ""}</p>
					<ul class="plan-features">
						${(plan.features || []).map(function(feature) {
							return `<li>${feature}</li>`;
						}).join("")}
					</ul>
					<div class="plan-use-case">${typeof relevantPlanUseCases !== "undefined" && relevantPlanUseCases[planId] ? relevantPlanUseCases[planId] : (plan.use || "")}</div>
					${rankNote}
					${planId === "free" ? `<div class="plan-current-warning">Basic / Free does not unlock the academy. Choose Plus or higher to enter.</div>` : ""}
				</div>
				${buttonHtml}
			</div>
		`;
	};
}

if (typeof planMeetsRequirement === "function") {
	const platinumLifetimeOriginalPlanMeetsRequirement = planMeetsRequirement;
	planMeetsRequirement = function(requiredPlan) {
		const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
		if (current === "admin") return true;
		if (current === "platinum_lifetime") return true;
		if (current === "proplus_lifetime") return true;
		if (current === "platinum") return true;
		return platinumLifetimeOriginalPlanMeetsRequirement(requiredPlan);
	};
}

if (typeof getCurrentPlanRank === "function") {
	const platinumLifetimeOriginalGetCurrentPlanRank = getCurrentPlanRank;
	getCurrentPlanRank = function() {
		const current = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
		if (current === "admin") return 99;
		if (current === "platinum_lifetime") return 7;
		if (current === "proplus_lifetime") return 6;
		if (current === "platinum") return 5;
		return platinumLifetimeOriginalGetCurrentPlanRank();
	};
}

// Make paid access helpers include Platinum Lifetime if present.
const platinumLifetimeOriginalIsPaidOrAdminPlan = typeof isPaidOrAdminPlan === "function" ? isPaidOrAdminPlan : null;
if (platinumLifetimeOriginalIsPaidOrAdminPlan) {
	isPaidOrAdminPlan = function(planId) {
		planId = typeof normalizeStoredPlanId === "function" ? normalizeStoredPlanId(planId) : planId;
		if (planId === "platinum_lifetime") return true;
		return platinumLifetimeOriginalIsPaidOrAdminPlan(planId);
	};
}

const platinumLifetimeOriginalAdminSetPlan = typeof adminSetPlan === "function" ? adminSetPlan : null;
if (platinumLifetimeOriginalAdminSetPlan) {
	adminSetPlan = function(planId) {
		planId = typeof normalizeStoredPlanId === "function" ? normalizeStoredPlanId(planId) : planId;
		if (planId === "platinum_lifetime") {
			state.plan = "platinum_lifetime";
			localStorage.setItem("creatorAcademy.plan", "platinum_lifetime");
			localStorage.setItem("academyPlan", "platinum_lifetime");
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
			state.briefingComplete = true;
			state.skillTreeUnlocked = true;
			if (typeof saveState === "function") saveState();
			document.body.classList.remove("beginner-locked");
			showToast("Rank set: Platinum Lifetime");
			if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
			return;
		}
		return platinumLifetimeOriginalAdminSetPlan(planId);
	};
}

document.addEventListener("keydown", function(event) {
	if (event.key === "Escape") {
		closePlatinumChoiceModal();
	}
});


// ---------- FINAL Platinum Access Gate Fix ----------
// Platinum Monthly and Platinum Lifetime are paid access.
// They must NOT trigger the beginner briefing or payment-plan lock.
// Basic / Free still does NOT bypass.

function caNormalizePlanFixed(value) {
	value = String(value || "").trim().toLowerCase();

	const aliases = {
		"free": "free",
		"basic": "free",
		"basic/free": "free",

		"plus": "plus",
		"elite": "elite",
		"pro": "pro",

		"pro+": "proplus",
		"pro plus": "proplus",
		"proplus": "proplus",
		"pro_plus": "proplus",
		"pro+ monthly": "proplus",
		"proplus monthly": "proplus",

		"pro+ lifetime": "proplus_lifetime",
		"proplus lifetime": "proplus_lifetime",
		"pro plus lifetime": "proplus_lifetime",
		"pro_plus_lifetime": "proplus_lifetime",
		"proplus_lifetime": "proplus_lifetime",

		"platinum": "platinum",
		"platinum monthly": "platinum",
		"platinum_monthly": "platinum",

		"platinum lifetime": "platinum_lifetime",
		"platinum_lifetime": "platinum_lifetime",
		"platinum+ lifetime": "platinum_lifetime",
		"platinum plus lifetime": "platinum_lifetime",

		"admin": "admin"
	};

	return aliases[value] || value;
}

function caStoredPlanCandidatesFixed() {
	const keys = [
		"creatorAcademy.plan",
		"academyPlan",
		"creatorAcademy.currentPlan",
		"creatorAcademy.selectedPlan",
		"creatorAcademy.pendingPlan",
		"creatorAcademy.rank",
		"academyRank"
	];

	const candidates = [];

	try {
		if (state && state.plan) candidates.push(state.plan);
	} catch (error) {}

	keys.forEach(function(key) {
		try {
			const value = localStorage.getItem(key);
			if (value) candidates.push(value);
		} catch (error) {}
	});

	try {
		if (localStorage.getItem("creatorAcademy.persistentAdminRole") === "true") {
			candidates.push("admin");
		}
	} catch (error) {}

	return candidates.map(caNormalizePlanFixed).filter(Boolean);
}

function caBestPlanFixed() {
	const candidates = caStoredPlanCandidatesFixed();
	const priority = [
		"admin",
		"platinum_lifetime",
		"proplus_lifetime",
		"platinum",
		"proplus",
		"pro",
		"elite",
		"plus",
		"free"
	];

	for (const planId of priority) {
		if (candidates.includes(planId)) return planId;
	}

	return "";
}

function caIsPaidAccessFixed(planId) {
	planId = caNormalizePlanFixed(planId);
	return ["plus", "elite", "pro", "proplus", "proplus_lifetime", "platinum", "platinum_lifetime", "admin"].includes(planId);
}

function caApplyPlanFixed() {
	const planId = caBestPlanFixed();

	if (!planId) {
		document.body.classList.add("beginner-locked");
		return false;
	}

	if (plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (planId === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		} else {
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
		}

		if (caIsPaidAccessFixed(planId)) {
			document.body.classList.remove("beginner-locked");
			return true;
		}
	}

	document.body.classList.add("beginner-locked");
	return false;
}

// Override every known helper that older patches may call.
normalizeStoredPlanId = caNormalizePlanFixed;

getCurrentPlan = function() {
	return caBestPlanFixed();
};

hasPlan = function() {
	return caIsPaidAccessFixed(caBestPlanFixed());
};

isPaidOrAdminPlan = function(planId) {
	return caIsPaidAccessFixed(planId);
};

isAdminRank = function() {
	return caBestPlanFixed() === "admin";
};

getCurrentPlanRank = function() {
	const planId = caBestPlanFixed();

	if (planId === "admin") return 99;
	if (planId === "platinum_lifetime") return 7;
	if (planId === "proplus_lifetime") return 6;
	if (planId === "platinum") return 5;
	if (plans && plans[planId]) return plans[planId].rank;

	return -1;
};

planMeetsRequirement = function(requiredPlan) {
	const current = caBestPlanFixed();

	if (current === "admin") return true;
	if (current === "platinum_lifetime") return true;
	if (current === "proplus_lifetime") return true;
	if (current === "platinum") return true;

	if (!plans || !plans[current] || !plans[requiredPlan]) return false;
	return plans[current].rank >= plans[requiredPlan].rank;
};

hardFixHasPlanAccess = function() {
	return caIsPaidAccessFixed(caBestPlanFixed());
};

hardFixApplyPlanAccess = function() {
	return caApplyPlanFixed();
};

beginnerHasPlan = function() {
	return caIsPaidAccessFixed(caBestPlanFixed());
};

beginnerIsUnlocked = function() {
	return caIsPaidAccessFixed(caBestPlanFixed());
};

updateBeginnerLockClass = function() {
	if (caIsPaidAccessFixed(caBestPlanFixed())) {
		document.body.classList.remove("beginner-locked");
	} else {
		document.body.classList.add("beginner-locked");
	}
};

function caAccessGateFixed(callback) {
	return function() {
		const planId = caBestPlanFixed();

		if (caIsPaidAccessFixed(planId)) {
			caApplyPlanFixed();
			callback.apply(this, arguments);
			return;
		}

		if (typeof showFreeRequiresPlanScreen === "function") {
			showFreeRequiresPlanScreen();
		} else if (typeof showPlans === "function") {
			showPlans();
		}
	};
}

// Patch all main routes once more.
["showHome", "showAssessmentsHub", "showLevelHub", "showXpDashboard", "showProgress", "showPracticalCoursework", "showCourseworkExams"].forEach(function(fnName) {
	const original = window[fnName];
	if (typeof original === "function") {
		window[fnName] = caAccessGateFixed(original);
	}
});

// Selecting any Platinum plan must store and unlock correctly.
const caOriginalSelectPlanFixed = typeof selectPlan === "function" ? selectPlan : null;
selectPlan = function(planId) {
	planId = caNormalizePlanFixed(planId);

	if (plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (planId === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		} else {
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
		}

		if (typeof saveState === "function") saveState();

		if (caIsPaidAccessFixed(planId)) {
			document.body.classList.remove("beginner-locked");
			showToast("Access active: " + plans[planId].name);
			if (typeof showHome === "function") setTimeout(showHome, 80);
		} else {
			document.body.classList.add("beginner-locked");
			showToast("Basic / Free is preview only.");
			if (typeof showPlans === "function") setTimeout(showPlans, 80);
		}
		return;
	}

	if (caOriginalSelectPlanFixed) caOriginalSelectPlanFixed(planId);
};

const caOriginalAdminSetPlanFixed = typeof adminSetPlan === "function" ? adminSetPlan : null;
adminSetPlan = function(planId) {
	planId = caNormalizePlanFixed(planId);

	if (plans && plans[planId]) {
		state.plan = planId;
		localStorage.setItem("creatorAcademy.plan", planId);
		localStorage.setItem("academyPlan", planId);

		if (planId === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		} else {
			localStorage.removeItem("creatorAcademy.persistentAdminRole");
		}

		state.briefingComplete = true;
		state.skillTreeUnlocked = true;
		if (typeof saveState === "function") saveState();

		if (caIsPaidAccessFixed(planId)) {
			document.body.classList.remove("beginner-locked");
			showToast("Rank set: " + plans[planId].name);
		} else {
			document.body.classList.add("beginner-locked");
			showToast("Rank set: Basic / Free. Upgrade required.");
		}

		if (typeof renderAdminDashboard === "function") renderAdminDashboard("overview");
		return;
	}

	if (caOriginalAdminSetPlanFixed) caOriginalAdminSetPlanFixed(planId);
};

// Startup repair: if Platinum is stored, remove lock and push away from plan/briefing page.
function caPlatinumStartupRepair() {
	const planId = caBestPlanFixed();

	if (caIsPaidAccessFixed(planId)) {
		caApplyPlanFixed();

		const text = app && app.textContent ? app.textContent.toLowerCase() : "";
		const stuckOnGate =
			text.includes("briefing") ||
			text.includes("basic / free") ||
			text.includes("choose plus or higher") ||
			text.includes("payment/access");

		if (stuckOnGate && typeof showHome === "function") {
			showHome();
		}
	}
}

caPlatinumStartupRepair();
document.addEventListener("DOMContentLoaded", caPlatinumStartupRepair);
setTimeout(caPlatinumStartupRepair, 50);
setTimeout(caPlatinumStartupRepair, 250);
setTimeout(caPlatinumStartupRepair, 700);


// ---------- Paid Home Button Cleanup ----------
// If user has paid/admin access, Home must not show extra Plans/Choose Plan buttons.
// It should show Continue Learning + View Progress only.
// If user has no paid access, Plans still opens normally.

function caPlanNameForHomeFixed() {
	const planId = typeof getCurrentPlan === "function" ? getCurrentPlan() : "";
	return plans && plans[planId] ? plans[planId].name : "Active Access";
}

function caHasPaidAccessForHomeFixed() {
	if (typeof caIsPaidAccessFixed === "function" && typeof caBestPlanFixed === "function") {
		return caIsPaidAccessFixed(caBestPlanFixed());
	}
	if (typeof hardFixHasPlanAccess === "function") return hardFixHasPlanAccess();
	if (typeof hasPlan === "function") return hasPlan();
	return false;
}

function showCleanPaidHome() {
	if (!caHasPaidAccessForHomeFixed()) {
		if (typeof showPlans === "function") showPlans();
		return;
	}

	document.body.classList.remove("beginner-locked");

	app.innerHTML = `
		<section class="panel">
			<div class="hero">
				<span class="badge">Structured Creator Training</span>
				<h2><span>Creator</span> Academy Hub</h2>
				<p>
					A focused learning academy for Roblox Lua, Blender, Moon Animator, UI/UX, VFX, publishing, and creator business.
					Continue your lessons, complete practical work, and progress through the academy.
				</p>

				<div class="actions clean-home-actions">
					<button type="button" onclick="${typeof showLevelHub === "function" ? "showLevelHub()" : "showLevels()"}">Continue Learning</button>
					<button type="button" class="secondary" onclick="showProgress()">View Progress</button>
				</div>
			</div>

			<div class="success-note">
				Access active: ${caPlanNameForHomeFixed()}.
			</div>
		</section>
	`;

	if (typeof hideNotesButton === "function") hideNotesButton();
	if (typeof setCurrentView === "function") setCurrentView("home");
}

// Replace Home route only; plan page still exists when access is missing.
showHome = showCleanPaidHome;

// Re-bind nav to the clean Home route.
function bindCleanHomeButtons() {
	const home = document.getElementById("navHome");
	if (home) home.onclick = showCleanPaidHome;
}

bindCleanHomeButtons();
document.addEventListener("DOMContentLoaded", bindCleanHomeButtons);
setTimeout(bindCleanHomeButtons, 100);
setTimeout(bindCleanHomeButtons, 500);

// Startup repair: if already paid/admin and stuck on the old hero with Plans button, clean it.
function cleanOldHomePlanButtonIfPaid() {
	if (!caHasPaidAccessForHomeFixed()) return;

	const text = app && app.textContent ? app.textContent : "";
	const oldHomeHasPlansButton = text.includes("Choose Plan") && text.includes("Plans") && text.includes("Creator Academy Hub");

	if (oldHomeHasPlansButton) {
		showCleanPaidHome();
	}
}

setTimeout(cleanOldHomePlanButtonIfPaid, 150);
setTimeout(cleanOldHomePlanButtonIfPaid, 600);


// ---------- Course rename + 15 course levels patch ----------
// Keeps Coursework unchanged. Only the learning Levels section becomes Course.
// Adds Levels 11-15 to the course path.

const extraCourseLevels = [
	{
		level: 11,
		name: "Advanced Game Systems",
		focus: "Quest systems, inventories, unlock logic, progression trees, badges, rewards, cooldowns, and larger Roblox gameplay systems.",
		outcome: "Learner can design and prototype bigger gameplay systems instead of only simple one-script features.",
		courses: ["Roblox Lua", "Game Design Basics", "System Design"],
		gateTitle: "Advanced Gameplay System Practical",
		gateRequirements: [
			"Build or fully plan a multi-step gameplay system.",
			"Use clear system data/config tables.",
			"Include unlock logic or progression logic.",
			"Document how the system avoids confusion or abuse.",
			"Show test evidence and improvement notes."
		]
	},
	{
		level: 12,
		name: "Multiplayer and Economy Design",
		focus: "Team systems, trading concepts, server authority, in-game economy balance, rewards, pricing, inflation, fairness, and abuse prevention.",
		outcome: "Learner can reason about multiplayer fairness and in-game economy structure.",
		courses: ["Roblox Lua", "Roblox Monetisation", "Game Design Basics"],
		gateTitle: "Economy and Multiplayer Practical",
		gateRequirements: [
			"Design a fair economy or multiplayer system.",
			"Explain money sources and money sinks.",
			"Include server-side validation planning.",
			"Identify at least three exploit or abuse risks.",
			"Write balance changes after testing/review."
		]
	},
	{
		level: 13,
		name: "Advanced UI and Product Experience",
		focus: "Professional menus, onboarding funnels, plan/access screens, settings, shop UX, conversion flow, retention UI, and user trust.",
		outcome: "Learner can design UI that feels like a product, not just buttons on a screen.",
		courses: ["Roblox UI Design", "Creator Business Basics", "Publishing and Testing"],
		gateTitle: "Product UI Practical",
		gateRequirements: [
			"Create a full product-style UI flow.",
			"Include onboarding, settings, purchase/access, and progress screens.",
			"Explain why each screen exists.",
			"Test the UI for confusion and fix two issues.",
			"Document mobile readability decisions."
		]
	},
	{
		level: 14,
		name: "Studio Production Pipeline",
		focus: "Asset pipeline, versioning, task planning, sprint structure, bug logs, feature planning, documentation, and release organisation.",
		outcome: "Learner can manage a project like a small studio pipeline rather than random building.",
		courses: ["Publishing and Testing", "Blender", "Roblox Studio Basics"],
		gateTitle: "Production Pipeline Practical",
		gateRequirements: [
			"Create a production board or task list.",
			"Organise assets, scripts, UI, and documentation.",
			"Write a bug log and fix priority list.",
			"Create a version/update plan.",
			"Show a final project structure review."
		]
	},
	{
		level: 15,
		name: "Master Creator Capstone",
		focus: "Final academy project: build, polish, test, monetise ethically, publish-ready planning, evidence pack, and creator-business presentation.",
		outcome: "Learner can present a serious creator project with technical, design, polish, testing, and business evidence.",
		courses: ["Roblox Lua", "UI Design", "VFX", "Publishing", "Creator Business"],
		gateTitle: "Master Creator Capstone",
		gateRequirements: [
			"Present a complete academy project or full prototype.",
			"Include scripting, UI, polish, testing, and project organisation.",
			"Include an ethical monetisation or access plan.",
			"Submit evidence for build, debug, polish, and feedback.",
			"Write a final creator reflection and next-step plan."
		]
	}
];

if (typeof levelDefinitions !== "undefined" && Array.isArray(levelDefinitions)) {
	extraCourseLevels.forEach(function(levelDef) {
		if (!levelDefinitions.some(function(existing) { return existing.level === levelDef.level; })) {
			levelDefinitions.push(levelDef);
		}
	});
}

if (typeof academyLevelCount !== "undefined") {
	try { academyLevelCount = Math.max(academyLevelCount, 15); } catch (error) {}
}

if (typeof levelPlanRequirements !== "undefined") {
	Object.assign(levelPlanRequirements, {
		11: "platinum",
		12: "platinum",
		13: "platinum",
		14: "platinum",
		15: "platinum"
	});
}

function makeCourseTwentySlots(items) {
	const result = items.slice();
	while (result.length < 20) result.push([null, "Course Lesson " + (result.length + 1)]);
	return result.slice(0, 20);
}

if (typeof levelLessonTemplates !== "undefined") {
	levelLessonTemplates[11] = makeCourseTwentySlots([
		[null, "Quest System Planning"],
		[null, "Inventory Structure"],
		[null, "Unlock Trees"],
		[null, "Reward Logic"],
		[null, "Cooldown Design"],
		[null, "Progression Tables"],
		[null, "Badge/Reward Planning"],
		[null, "System Feedback"],
		[null, "Abuse Prevention"],
		[null, "Player Goal Design"],
		[null, "Data Shape Planning"],
		[null, "System Testing"],
		[null, "Debug Logs"],
		[null, "Refactor Sprint"],
		[null, "Feature Review"],
		[null, "Expansion Planning"],
		[null, "UX Check"],
		[null, "Evidence Pack"],
		[null, "Gate Prep"],
		[null, "Level 11 Review"]
	]);

	levelLessonTemplates[12] = makeCourseTwentySlots([
		[null, "Economy Sources"],
		[null, "Economy Sinks"],
		[null, "Pricing Balance"],
		[null, "Inflation Risk"],
		[null, "Trading Concepts"],
		[null, "Team Systems"],
		[null, "Server Authority"],
		[null, "Reward Fairness"],
		[null, "Anti-Abuse"],
		[null, "Cooldown Economy"],
		[null, "Premium Value Ethics"],
		[null, "Progression Balance"],
		[null, "Testing Economy Loops"],
		[null, "Feedback Review"],
		[null, "Balance Patch Notes"],
		[null, "Risk Audit"],
		[null, "Economy Evidence"],
		[null, "Multiplayer Review"],
		[null, "Gate Prep"],
		[null, "Level 12 Review"]
	]);

	levelLessonTemplates[13] = makeCourseTwentySlots([
		[null, "Product UI Overview"],
		[null, "Onboarding Funnel"],
		[null, "Access Screen UX"],
		[null, "Progress Screen UX"],
		[null, "Settings Design"],
		[null, "Shop UX"],
		[null, "Trust Signals"],
		[null, "Mobile UI Pass"],
		[null, "Error States"],
		[null, "Success States"],
		[null, "Retention UI"],
		[null, "Microcopy"],
		[null, "Conversion Flow"],
		[null, "User Testing"],
		[null, "UX Fixes"],
		[null, "Visual Polish"],
		[null, "Accessibility Review"],
		[null, "Evidence Pack"],
		[null, "Gate Prep"],
		[null, "Level 13 Review"]
	]);

	levelLessonTemplates[14] = makeCourseTwentySlots([
		[null, "Pipeline Overview"],
		[null, "Folder Standards"],
		[null, "Asset Versioning"],
		[null, "Script Organisation"],
		[null, "Task Board"],
		[null, "Sprint Planning"],
		[null, "Bug Log"],
		[null, "Priority Ranking"],
		[null, "Feature Scope"],
		[null, "Documentation"],
		[null, "Asset Checklist"],
		[null, "Testing Checklist"],
		[null, "Release Checklist"],
		[null, "Update Notes"],
		[null, "Team Handoff"],
		[null, "Project Cleanup"],
		[null, "Production Review"],
		[null, "Evidence Pack"],
		[null, "Gate Prep"],
		[null, "Level 14 Review"]
	]);

	levelLessonTemplates[15] = makeCourseTwentySlots([
		[null, "Capstone Concept"],
		[null, "Feature Scope"],
		[null, "Technical Plan"],
		[null, "UI Plan"],
		[null, "Asset Plan"],
		[null, "VFX/Sound Plan"],
		[null, "Monetisation Ethics"],
		[null, "Testing Plan"],
		[null, "Build Sprint 1"],
		[null, "Build Sprint 2"],
		[null, "Polish Sprint"],
		[null, "Bug Fix Sprint"],
		[null, "Feedback Pass"],
		[null, "Launch Plan"],
		[null, "Evidence Pack"],
		[null, "Business Summary"],
		[null, "Presentation Prep"],
		[null, "Final Review"],
		[null, "Submission Prep"],
		[null, "Mastery Reflection"]
	]);
}

if (typeof expandedLevelLessonDetails !== "undefined") {
	[11, 12, 13, 14, 15].forEach(function(level) {
		expandedLevelLessonDetails[level] = makeCourseTwentySlots((levelLessonTemplates[level] || []).map(function(slot, index) {
			const title = slot[1] || ("Course Lesson " + (index + 1));
			return {
				title: title,
				objective: "Complete this advanced course lesson and connect it to the level outcome.",
				theory: "This lesson belongs to the advanced Course path, not Coursework. Read the concept, complete a practical step, and document useful evidence.",
				practical: "Build, plan, test, or review something connected to " + title + ".",
				evidence: [
					"What you built or planned.",
					"What you tested or reviewed.",
					"What you would improve next."
				]
			};
		}));
	});
}

// Rename visible Levels language to Course without touching Coursework.
function renameLevelsToCourseText() {
	const navLevels = document.getElementById("navLevels");
	if (navLevels) {
		navLevels.textContent = "Course";
		navLevels.id = "navCourse";
		navLevels.onclick = typeof showLevelHub === "function" ? showLevelHub : navLevels.onclick;
	}

	const navCourse = document.getElementById("navCourse");
	if (navCourse && typeof showLevelHub === "function") {
		navCourse.onclick = showLevelHub;
	}

	document.querySelectorAll("button, h2, h3, span, p").forEach(function(el) {
		if (!el.childElementCount && el.textContent) {
			if (el.textContent.trim() === "Levels") el.textContent = "Course";
			if (el.textContent.trim() === "All Levels") el.textContent = "All Course";
		}
	});
}

const coursePatchOriginalShowLevelHub = typeof showLevelHub === "function" ? showLevelHub : null;
if (coursePatchOriginalShowLevelHub) {
	showLevelHub = function() {
		coursePatchOriginalShowLevelHub();
		const head = document.querySelector(".course-header h2, .page-head h2, h2");
		if (head && /level/i.test(head.textContent)) {
			head.textContent = "Course";
		}
		renameLevelsToCourseText();

		const panel = document.querySelector(".panel");
		if (panel && !panel.querySelector(".course-expansion-note")) {
			panel.insertAdjacentHTML("afterbegin", `
				<div class="course-expansion-note">
					<strong>Course expanded:</strong> the learning path now has 15 course levels. The added levels are part of the Course path, not Coursework.
				</div>
			`);
		}
	};
}

const coursePatchOriginalOpenLevel = typeof openLevel === "function" ? openLevel : null;
if (coursePatchOriginalOpenLevel) {
	openLevel = function(level, tab) {
		coursePatchOriginalOpenLevel(level, tab);
		renameLevelsToCourseText();
	};
}

const coursePatchOriginalShowCleanPaidHome = typeof showCleanPaidHome === "function" ? showCleanPaidHome : null;
if (coursePatchOriginalShowCleanPaidHome) {
	showCleanPaidHome = function() {
		coursePatchOriginalShowCleanPaidHome();
		const btn = Array.from(document.querySelectorAll("button")).find(function(button) {
			return button.textContent.trim() === "Continue Learning";
		});
		if (btn && typeof showLevelHub === "function") btn.onclick = showLevelHub;
		renameLevelsToCourseText();
	};
	showHome = showCleanPaidHome;
}

function bindCourseNavButton() {
	const navCourse = document.getElementById("navCourse") || document.getElementById("navLevels");
	if (navCourse) {
		navCourse.textContent = "Course";
		navCourse.onclick = typeof showLevelHub === "function" ? showLevelHub : navCourse.onclick;
	}
}

bindCourseNavButton();
document.addEventListener("DOMContentLoaded", function() {
	bindCourseNavButton();
	renameLevelsToCourseText();
});
setTimeout(bindCourseNavButton, 100);
setTimeout(renameLevelsToCourseText, 250);


// ---------- Course Section 2: separate specialist course levels ----------
// Section 1 = Course Levels 1-15.
// Section 2 = Course Levels 16-25.
// This is Course content, not Coursework.

const caSection2Names = [
	["AI-Assisted Creator Systems", "AI helper systems, learner feedback logic, progress analysis, recommendation rules, and safe automation planning.", "AI Assistant System Practical"],
	["Analytics and Retention Systems", "Retention loops, playtime metrics, completion tracking, drop-off analysis, and ethical engagement systems.", "Analytics and Retention Practical"],
	["Advanced Monetisation Architecture", "Subscription tiers, lifetime offers, access gates, entitlement checks, value ladders, and ethical premium systems.", "Monetisation Architecture Practical"],
	["Large-Scale UI Systems", "Dashboard UX, modular UI components, course navigation, admin panels, payment screens, notes areas, and responsive design.", "Large UI System Practical"],
	["Backend and Account Planning", "Accounts, authentication concepts, backend APIs, databases, XP saving, payment verification, server-side trust, and deployment planning.", "Backend Planning Practical"],
	["Community and Moderation Systems", "Community design, reporting, rules, moderation flow, safe communication, content standards, and creator responsibility.", "Community System Practical"],
	["Performance and Optimisation", "Lag reduction, part count control, script efficiency, UI performance, asset optimisation, effect limits, and lower-device testing.", "Optimisation Practical"],
	["Professional Portfolio Building", "Portfolio structure, screenshots, demo videos, case studies, project writeups, skill evidence, and creator presentation.", "Portfolio Practical"],
	["Studio Team Leadership", "Team roles, task assignment, pipelines, documentation, communication, handoff, review cycles, and project direction.", "Team Pipeline Practical"],
	["World-Class Creator Final", "Final advanced capstone: product thinking, technical systems, polished UI, monetisation, analytics, backend plan, portfolio, and launch strategy.", "World-Class Creator Final Capstone"]
];

const caSection2Reqs = [
	"Create a clear advanced project/system plan.",
	"Show build, design, business, or technical evidence.",
	"Explain the problem the system solves.",
	"Document testing, feedback, or risk review.",
	"Write an improvement plan for the next stage."
];

if (typeof levelDefinitions !== "undefined" && Array.isArray(levelDefinitions)) {
	caSection2Names.forEach(function(row, index) {
		const levelNumber = index + 16;
		if (!levelDefinitions.some(function(existing) { return existing.level === levelNumber; })) {
			levelDefinitions.push({
				level: levelNumber,
				name: row[0],
				focus: row[1],
				outcome: "Learner can handle this advanced creator specialism at a serious project standard.",
				courses: ["Advanced Creator Course", "Roblox", "Business", "Systems"],
				gateTitle: row[2],
				gateRequirements: caSection2Reqs.slice()
			});
		}
	});
}

if (typeof academyLevelCount !== "undefined") {
	try { academyLevelCount = Math.max(academyLevelCount, 25); } catch (error) {}
}

if (typeof levelPlanRequirements !== "undefined") {
	for (let i = 16; i <= 20; i++) levelPlanRequirements[i] = "platinum";
	for (let i = 21; i <= 25; i++) levelPlanRequirements[i] = "platinum_lifetime";
}

function caMakeSection2Slots(levelNumber, levelName) {
	const bases = [
		"Concept Overview", "System Purpose", "Planning Task", "Technical Structure", "User Flow",
		"Risk Review", "Evidence Planning", "Testing Method", "Improvement Pass", "Documentation",
		"Practical Build", "Debug Review", "UX/Clarity Check", "Business/Value Check", "Safety/Ethics Check",
		"Performance Review", "Polish Pass", "Submission Evidence", "Gate Prep", "Level Review"
	];
	return bases.map(function(title) {
		return [null, levelName + " — " + title];
	});
}

if (typeof levelLessonTemplates !== "undefined") {
	caSection2Names.forEach(function(row, index) {
		const levelNumber = index + 16;
		levelLessonTemplates[levelNumber] = caMakeSection2Slots(levelNumber, row[0]);
	});
}

if (typeof expandedLevelLessonDetails !== "undefined") {
	caSection2Names.forEach(function(row, index) {
		const levelNumber = index + 16;
		expandedLevelLessonDetails[levelNumber] = caMakeSection2Slots(levelNumber, row[0]).map(function(slot) {
			const title = slot[1];
			return {
				title: title,
				objective: "Complete this Course Section 2 specialist lesson.",
				theory: "This lesson belongs to Course Section 2, not Coursework. It develops advanced creator skills such as systems thinking, product design, business structure, optimisation, leadership, or professional presentation.",
				practical: "Build, plan, test, review, or document something connected to " + title + ".",
				evidence: [
					"What you built or planned.",
					"What system, UI, business, or creator problem it solves.",
					"What you tested, reviewed, or improved."
				]
			};
		});
	});
}

let caActiveCourseSection = Number(localStorage.getItem("creatorAcademy.activeCourseSection") || "1");

function caCourseSectionLevels(section) {
	if (typeof levelDefinitions === "undefined") return [];
	return levelDefinitions.filter(function(level) {
		return section === 2 ? level.level >= 16 && level.level <= 25 : level.level >= 1 && level.level <= 15;
	});
}

function caSetCourseSection(section) {
	caActiveCourseSection = section;
	localStorage.setItem("creatorAcademy.activeCourseSection", String(section));
	showLevelHub();
}

function caSection2Unlocked() {
	if (typeof planMeetsRequirement === "function") return planMeetsRequirement("platinum");
	return true;
}

function caRenderCourseSectionTabs() {
	const unlocked2 = caSection2Unlocked();
	return `
		<div class="course-section-tabs">
			<button type="button" class="${caActiveCourseSection === 1 ? "active" : ""}" onclick="caSetCourseSection(1)">
				<span>1</span>
				<strong>Main Course</strong>
				<small>Levels 1–15</small>
			</button>
			<button type="button" class="${caActiveCourseSection === 2 ? "active" : ""} ${unlocked2 ? "" : "locked"}" onclick="${unlocked2 ? "caSetCourseSection(2)" : "showPlans()"}">
				<span>2</span>
				<strong>Specialist Course</strong>
				<small>Levels 16–25</small>
			</button>
		</div>
	`;
}

const caOriginalShowLevelHubSection2 = typeof showLevelHub === "function" ? showLevelHub : null;
if (caOriginalShowLevelHubSection2 && typeof renderLevelCard === "function") {
	showLevelHub = function() {
		if (typeof hardFixApplyPlanAccess === "function" && !hardFixApplyPlanAccess()) {
			if (typeof showPlans === "function") showPlans();
			return;
		}

		const sectionLevels = caCourseSectionLevels(caActiveCourseSection);
		const title = caActiveCourseSection === 2 ? "Course Section 2" : "Course Section 1";
		const text = caActiveCourseSection === 2
			? "10 specialist course levels in a separate section. These are advanced creator specialisms, not Coursework."
			: "15 main course levels covering the foundation through master creator capstone.";

		app.innerHTML = `
			<section class="panel course-section-panel">
				<div class="course-header">
					<div>
						<span class="badge">Course</span>
						<h2>${title}</h2>
						<p>${text}</p>
					</div>
					<div class="actions">
						<button type="button" class="secondary" onclick="showProgress()">Progress</button>
					</div>
				</div>

				${caRenderCourseSectionTabs()}

				<div class="course-expansion-note">
					<strong>${title}:</strong> ${caActiveCourseSection === 2 ? "Levels 16–25 are in a separate specialist section." : "Levels 1–15 remain in the main course section."}
				</div>

				<div class="level-grid">
					${sectionLevels.map(renderLevelCard).join("")}
				</div>
			</section>
		`;

		if (typeof setCurrentView === "function") setCurrentView("course");
		if (typeof hideNotesButton === "function") hideNotesButton();
	};
}

function caBindCourseSectionNav() {
	const navCourse = document.getElementById("navCourse") || document.getElementById("navLevels");
	if (navCourse) {
		navCourse.textContent = "Course";
		if (typeof showLevelHub === "function") navCourse.onclick = showLevelHub;
	}
}

caBindCourseSectionNav();
document.addEventListener("DOMContentLoaded", caBindCourseSectionNav);
setTimeout(caBindCourseSectionNav, 100);


// ---------- Bugfix: duplicate Course nav + old path access gate ----------
// Fixes:
// 1. Duplicate Course button in top nav.
// 2. Old path cards / Open Path buttons sending paid Platinum users to briefing/plans.
// 3. Platinum / Platinum Lifetime access recognised before any path/course navigation.

function caBugfixNormalizePlan(value) {
	value = String(value || "").trim().toLowerCase();

	const aliases = {
		"free": "free",
		"basic": "free",
		"basic/free": "free",

		"plus": "plus",
		"elite": "elite",
		"pro": "pro",

		"pro+": "proplus",
		"pro plus": "proplus",
		"proplus": "proplus",
		"pro_plus": "proplus",

		"pro+ lifetime": "proplus_lifetime",
		"proplus lifetime": "proplus_lifetime",
		"pro plus lifetime": "proplus_lifetime",
		"pro_plus_lifetime": "proplus_lifetime",
		"proplus_lifetime": "proplus_lifetime",

		"platinum": "platinum",
		"platinum monthly": "platinum",
		"platinum_monthly": "platinum",

		"platinum lifetime": "platinum_lifetime",
		"platinum_lifetime": "platinum_lifetime",
		"platinum+ lifetime": "platinum_lifetime",
		"platinum plus lifetime": "platinum_lifetime",

		"admin": "admin"
	};

	return aliases[value] || value;
}

function caBugfixStoredPlans() {
	const keys = [
		"creatorAcademy.plan",
		"academyPlan",
		"creatorAcademy.currentPlan",
		"creatorAcademy.selectedPlan",
		"creatorAcademy.rank",
		"academyRank"
	];

	const values = [];

	try {
		if (state && state.plan) values.push(state.plan);
	} catch (error) {}

	keys.forEach(function(key) {
		try {
			const value = localStorage.getItem(key);
			if (value) values.push(value);
		} catch (error) {}
	});

	try {
		if (localStorage.getItem("creatorAcademy.persistentAdminRole") === "true") {
			values.push("admin");
		}
	} catch (error) {}

	return values.map(caBugfixNormalizePlan).filter(Boolean);
}

function caBugfixBestPlan() {
	const values = caBugfixStoredPlans();
	const priority = [
		"admin",
		"platinum_lifetime",
		"proplus_lifetime",
		"platinum",
		"proplus",
		"pro",
		"elite",
		"plus",
		"free"
	];

	for (const plan of priority) {
		if (values.includes(plan)) return plan;
	}

	return "";
}

function caBugfixIsPaid(plan) {
	plan = caBugfixNormalizePlan(plan);
	return ["plus", "elite", "pro", "proplus", "proplus_lifetime", "platinum", "platinum_lifetime", "admin"].includes(plan);
}

function caBugfixApplyAccess() {
	const plan = caBugfixBestPlan();

	if (plan && plans && plans[plan]) {
		state.plan = plan;
		localStorage.setItem("creatorAcademy.plan", plan);
		localStorage.setItem("academyPlan", plan);

		if (plan === "admin") {
			localStorage.setItem("creatorAcademy.persistentAdminRole", "true");
		}

		if (caBugfixIsPaid(plan)) {
			document.body.classList.remove("beginner-locked");
			return true;
		}
	}

	document.body.classList.add("beginner-locked");
	return false;
}

// Override access helpers again, because older path code may still call them.
normalizeStoredPlanId = caBugfixNormalizePlan;

getCurrentPlan = function() {
	return caBugfixBestPlan();
};

hasPlan = function() {
	return caBugfixIsPaid(caBugfixBestPlan());
};

beginnerHasPlan = function() {
	return caBugfixIsPaid(caBugfixBestPlan());
};

beginnerIsUnlocked = function() {
	return caBugfixIsPaid(caBugfixBestPlan());
};

hardFixHasPlanAccess = function() {
	return caBugfixIsPaid(caBugfixBestPlan());
};

hardFixApplyPlanAccess = function() {
	return caBugfixApplyAccess();
};

isPaidOrAdminPlan = function(planId) {
	return caBugfixIsPaid(planId);
};

isAdminRank = function() {
	return caBugfixBestPlan() === "admin";
};

getCurrentPlanRank = function() {
	const plan = caBugfixBestPlan();

	if (plan === "admin") return 99;
	if (plan === "platinum_lifetime") return 7;
	if (plan === "proplus_lifetime") return 6;
	if (plan === "platinum") return 5;
	if (plans && plans[plan]) return plans[plan].rank;

	return -1;
};

planMeetsRequirement = function(requiredPlan) {
	const plan = caBugfixBestPlan();

	if (plan === "admin") return true;
	if (plan === "platinum_lifetime") return true;
	if (plan === "proplus_lifetime") return true;
	if (plan === "platinum") return true;

	if (!plans || !plans[plan] || !plans[requiredPlan]) return false;
	return plans[plan].rank >= plans[requiredPlan].rank;
};

function caBugfixRemoveDuplicateCourseNav() {
	const nav = document.querySelector(".nav-actions");
	if (!nav) return;

	const buttons = Array.from(nav.querySelectorAll("button"));
	const courseButtons = buttons.filter(function(button) {
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

function caBugfixRouteOpenPathButtons() {
	const paid = caBugfixIsPaid(caBugfixBestPlan());

	document.querySelectorAll("button").forEach(function(button) {
		const label = button.textContent.trim().toLowerCase();

		if (label === "open path" || label === "open course" || label === "course") {
			const cardText = button.closest(".card, .path-card, .course-card, .panel")?.textContent || "";

			// This targets the old path cards shown in the screenshot.
			const isOldPathButton =
				button.textContent.trim() === "Open Path" ||
				cardText.includes("Roblox Studio Basics") ||
				cardText.includes("Roblox Lua") ||
				cardText.includes("Blender") ||
				cardText.includes("Moon Animator");

			if (isOldPathButton) {
				button.onclick = function(event) {
					event.preventDefault();

					if (paid) {
						caBugfixApplyAccess();
						if (typeof showLevelHub === "function") showLevelHub();
					} else if (typeof showPlans === "function") {
						showPlans();
					}

					return false;
				};
			}
		}
	});
}

function caBugfixHideOldPathGridIfCourseExists() {
	// The old "Roblox Studio Basics / Roblox Lua / Blender / Moon Animator" path grid is legacy.
	// Keep it from hijacking the paid learner flow if Course is available.
	const paid = caBugfixIsPaid(caBugfixBestPlan());
	if (!paid || typeof showLevelHub !== "function") return;

	const cards = Array.from(document.querySelectorAll(".card, .path-card, .course-card"));
	const oldPathCards = cards.filter(function(card) {
		const text = card.textContent || "";
		return (
			text.includes("Roblox Studio Basics") ||
			text.includes("Roblox Lua") ||
			text.includes("Blender") ||
			text.includes("Moon Animator")
		) && text.includes("Open Path");
	});

	// Do not delete if the current page is intentionally a path hub, just patch the buttons.
	oldPathCards.forEach(function(card) {
		const btn = card.querySelector("button");
		if (btn) {
			btn.textContent = "Open Course";
			btn.onclick = function(event) {
				event.preventDefault();
				caBugfixApplyAccess();
				showLevelHub();
				return false;
			};
		}
	});
}

function caBugfixMain() {
	caBugfixApplyAccess();
	caBugfixRemoveDuplicateCourseNav();
	caBugfixRouteOpenPathButtons();
	caBugfixHideOldPathGridIfCourseExists();
}

// Wrap old path functions if they exist.
["openPath", "openCoursePath", "showPath", "showCoursePath"].forEach(function(fnName) {
	const original = window[fnName];

	if (typeof original === "function" && !original.__caBugfixPatched) {
		const patched = function() {
			if (caBugfixIsPaid(caBugfixBestPlan())) {
				caBugfixApplyAccess();
				if (typeof showLevelHub === "function") {
					showLevelHub();
					return;
				}
			}

			return original.apply(this, arguments);
		};

		patched.__caBugfixPatched = true;
		window[fnName] = patched;
	}
});

// Wrap home and course renderers to clean after render.
["showHome", "showLevelHub", "showAssessmentsHub", "showXpDashboard", "showProgress"].forEach(function(fnName) {
	const original = window[fnName];

	if (typeof original === "function" && !original.__caBugfixCleaned) {
		const patched = function() {
			const result = original.apply(this, arguments);
			setTimeout(caBugfixMain, 30);
			return result;
		};

		patched.__caBugfixCleaned = true;
		window[fnName] = patched;
	}
});

document.addEventListener("DOMContentLoaded", caBugfixMain);
setTimeout(caBugfixMain, 50);
setTimeout(caBugfixMain, 200);
setTimeout(caBugfixMain, 700);

const caBugfixObserverTarget = document.getElementById("app");
if (caBugfixObserverTarget) {
	const caBugfixObserver = new MutationObserver(function() {
		window.requestAnimationFrame(caBugfixMain);
	});

	caBugfixObserver.observe(caBugfixObserverTarget, {
		childList: true,
		subtree: true
	});
}


// ---------- Course Section 2 Extension: Levels 26-30 ----------
// Adds 5 more specialist Course levels to Section 2.
// Section 2 now runs Levels 16-30. This is Course content, not Coursework.

const caSection2ExtraLevels = [
	{
		level: 26,
		name: "Advanced Security and Anti-Exploit Design",
		focus: "Server authority, exploit risk analysis, RemoteEvent validation, permissions, payment/access abuse prevention, cooldown abuse, data trust, and secure creator systems.",
		outcome: "Learner can identify security weaknesses and design safer Roblox/game-academy systems.",
		courses: ["Security", "Roblox Lua", "Backend Planning"],
		gateTitle: "Security and Anti-Exploit Practical",
		gateRequirements: [
			"Identify at least five abuse or exploit risks.",
			"Explain what must be checked server-side.",
			"Create a validation plan for a system or feature.",
			"Document how access/payment/XP abuse would be prevented.",
			"Submit a security review with before/after improvement notes."
		]
	},
	{
		level: 27,
		name: "Advanced Data, Saving, and Progression",
		focus: "Data models, player profiles, XP history, lesson completion, entitlement state, save/load planning, migration, backups, and recovery logic.",
		outcome: "Learner can plan reliable progression data instead of messy local-only storage.",
		courses: ["Data Systems", "Backend Basics", "Progression Design"],
		gateTitle: "Data and Progression Practical",
		gateRequirements: [
			"Design a player/learner data model.",
			"Include XP, lessons, course sections, plans, and assessment state.",
			"Explain save/load and recovery risks.",
			"Plan how data changes when the course expands.",
			"Submit a structured data model and explanation."
		]
	},
	{
		level: 28,
		name: "Professional Product Launch Strategy",
		focus: "Launch positioning, offer structure, landing-page promise, onboarding, release timing, feedback loops, update cadence, marketing content, and trust-building.",
		outcome: "Learner can launch a creator product/academy/game with a structured go-to-market plan.",
		courses: ["Publishing", "Creator Business", "Marketing"],
		gateTitle: "Launch Strategy Practical",
		gateRequirements: [
			"Write a clear launch positioning statement.",
			"Define the target learner/player and main value promise.",
			"Plan launch content, updates, feedback, and support.",
			"Explain how pricing connects to real product value.",
			"Submit a launch checklist and improvement roadmap."
		]
	},
	{
		level: 29,
		name: "Advanced Visual Direction and Brand System",
		focus: "Premium visual identity, colour systems, typography, icon language, UI consistency, screenshots, trailers, product feel, and brand trust.",
		outcome: "Learner can make the academy/game feel visually premium and consistent rather than random.",
		courses: ["UI Design", "Branding", "Presentation"],
		gateTitle: "Visual Direction Practical",
		gateRequirements: [
			"Create or document a visual style guide.",
			"Define colours, typography, card styles, buttons, and layout rules.",
			"Show before/after UI or presentation polish.",
			"Explain why the visual system feels trustworthy/premium.",
			"Submit screenshots or mockups with written justification."
		]
	},
	{
		level: 30,
		name: "Elite Creator Thesis",
		focus: "Final specialist thesis: security, data, monetisation, UI, launch strategy, brand, portfolio, leadership, and long-term creator roadmap.",
		outcome: "Learner can present a complete elite-level creator product with technical, academic, business, and presentation evidence.",
		courses: ["Elite Mastery", "Systems", "Business", "Portfolio"],
		gateTitle: "Elite Creator Thesis",
		gateRequirements: [
			"Submit a full elite creator thesis/project plan.",
			"Include security, data, UI, monetisation, and launch evidence.",
			"Show how the product is structured for long-term improvement.",
			"Include professional screenshots/mockups or portfolio proof.",
			"Write a final roadmap explaining what happens after the academy."
		]
	}
];

if (typeof levelDefinitions !== "undefined" && Array.isArray(levelDefinitions)) {
	caSection2ExtraLevels.forEach(function(levelDef) {
		if (!levelDefinitions.some(function(existing) { return existing.level === levelDef.level; })) {
			levelDefinitions.push(levelDef);
		}
	});
}

if (typeof academyLevelCount !== "undefined") {
	try { academyLevelCount = Math.max(academyLevelCount, 30); } catch (error) {}
}

if (typeof levelPlanRequirements !== "undefined") {
	for (let i = 26; i <= 30; i++) {
		levelPlanRequirements[i] = "platinum_lifetime";
	}
}

function caMakeExtraSection2Slots(levelName) {
	const bases = [
		"Official Definition",
		"Core Vocabulary",
		"System Purpose",
		"Planning Standard",
		"Technical Structure",
		"Risk Analysis",
		"Evidence Method",
		"Practical Build",
		"Testing Method",
		"Debug Review",
		"Professional Documentation",
		"Quality Criteria",
		"Ethics and Trust",
		"Performance/Scalability",
		"Before and After Review",
		"Portfolio Evidence",
		"Peer/User Feedback",
		"Improvement Sprint",
		"Gate Preparation",
		"Final Review"
	];

	return bases.map(function(title) {
		return [null, levelName + " — " + title];
	});
}

if (typeof levelLessonTemplates !== "undefined") {
	caSection2ExtraLevels.forEach(function(levelDef) {
		levelLessonTemplates[levelDef.level] = caMakeExtraSection2Slots(levelDef.name);
	});
}

if (typeof expandedLevelLessonDetails !== "undefined") {
	caSection2ExtraLevels.forEach(function(levelDef) {
		expandedLevelLessonDetails[levelDef.level] = caMakeExtraSection2Slots(levelDef.name).map(function(slot) {
			const title = slot[1];

			return {
				title: title,
				objective: "Complete this elite Course Section 2 specialist lesson and connect it to the final academy standard.",
				theory: "This lesson belongs to the upper specialist part of Course Section 2. It develops advanced creator judgement: security, data, launch planning, brand quality, leadership, product thinking, or elite portfolio presentation.",
				practical: "Build, plan, test, review, document, or present something connected to " + title + ".",
				evidence: [
					"What you built, planned, tested, or documented.",
					"What advanced creator problem it solves.",
					"What proof shows improvement, quality, trust, or professional judgement."
				]
			};
		});
	});
}

// Extend Section 2 filter and labels if the previous section renderer exists.
if (typeof caCourseSectionLevels === "function") {
	caCourseSectionLevels = function(section) {
		if (typeof levelDefinitions === "undefined") return [];

		return levelDefinitions.filter(function(level) {
			return section === 2
				? level.level >= 16 && level.level <= 30
				: level.level >= 1 && level.level <= 15;
		});
	};
}

if (typeof caRenderCourseSectionTabs === "function") {
	caRenderCourseSectionTabs = function() {
		const unlocked2 = typeof caSection2Unlocked === "function" ? caSection2Unlocked() : true;

		return `
			<div class="course-section-tabs">
				<button type="button" class="${caActiveCourseSection === 1 ? "active" : ""}" onclick="caSetCourseSection(1)">
					<span>1</span>
					<strong>Main Course</strong>
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
}

const caExtraSection2OriginalShowLevelHub = typeof showLevelHub === "function" ? showLevelHub : null;
if (caExtraSection2OriginalShowLevelHub && !caExtraSection2OriginalShowLevelHub.__section2Level30Patched) {
	const patchedShowLevelHub = function() {
		caExtraSection2OriginalShowLevelHub.apply(this, arguments);

		if (typeof caActiveCourseSection !== "undefined" && caActiveCourseSection === 2) {
			const panel = document.querySelector(".course-section-panel, .panel");

			if (panel && !panel.querySelector(".section-2-level-30-note")) {
				panel.insertAdjacentHTML("afterbegin", `
					<div class="section-2-level-30-note">
						<strong>Section 2 expanded:</strong> Specialist Course now contains Levels 16–30, including five elite-level modules at the end.
					</div>
				`);
			}

			document.querySelectorAll(".course-section-tabs small").forEach(function(small) {
				if (small.textContent.includes("16")) small.textContent = "Levels 16–30";
			});
		}
	};

	patchedShowLevelHub.__section2Level30Patched = true;
	showLevelHub = patchedShowLevelHub;
}

/* ===== js/premium-refine.js ===== */
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

/* ===== js/academic-framework.js ===== */
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

/* ===== js/lesson-open-fix.js ===== */
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

/* ===== js/detailed-sublessons.js ===== */

/* Detailed Sublessons - loads last */
(function(){
"use strict";
const HW="creatorAcademy.deepSublessonHomework.";
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function wc(t){return String(t||"").trim().split(/\s+/).filter(Boolean).length;}
function app(){return document.getElementById("app");}
function unit(level){return "CA-"+(level<=15?"S1":"S2")+"-U"+String(level).padStart(2,"0");}
function levelDef(level){if(Array.isArray(window.levelDefinitions)){return window.levelDefinitions.find(x=>Number(x.level)===Number(level))||window.levelDefinitions[level-1];}return {level,name:"Course Level "+level,focus:"Course progression.",outcome:"Complete the course lesson and submit evidence."};}
function slotData(level,slot){const t=window.levelLessonTemplates&&window.levelLessonTemplates[level]&&window.levelLessonTemplates[level][slot-1]?window.levelLessonTemplates[level][slot-1]:[null,"Course Lesson "+slot];return {realLessonId:t[0],title:t[1]||"Course Lesson "+slot,level,slot};}
function done(level,slot){try{if(typeof window.isLevelLessonComplete==="function")return window.isLevelLessonComplete(level,slot);}catch(e){}return localStorage.getItem("creatorAcademy.levelLesson."+level+"."+slot)==="true";}
function mark(level,slot){try{if(typeof window.markLevelLessonComplete==="function"){window.markLevelLessonComplete(level,slot);return;}}catch(e){}localStorage.setItem("creatorAcademy.levelLesson."+level+"."+slot,"true");}
function paid(){try{if(typeof window.caBugfixIsPaid==="function"&&typeof window.caBugfixBestPlan==="function")return window.caBugfixIsPaid(window.caBugfixBestPlan());if(typeof window.caIsPaidAccessFixed==="function"&&typeof window.caBestPlanFixed==="function")return window.caIsPaidAccessFixed(window.caBestPlanFixed());if(typeof window.hardFixApplyPlanAccess==="function")return window.hardFixApplyPlanAccess();if(typeof window.hasPlan==="function")return window.hasPlan();}catch(e){}return true;}
function subject(ld,title){const s=(ld.name+" "+ld.focus+" "+title).toLowerCase();if(/lua|script|remote|data|backend|security/.test(s))return"technical systems";if(/ui|ux|interface|visual|brand/.test(s))return"interface and product design";if(/blender|asset|model/.test(s))return"asset production";if(/animation|moon/.test(s))return"animation and motion";if(/business|monetisation|launch|portfolio/.test(s))return"creator business";if(/vfx|sound|polish/.test(s))return"polish and presentation";return"creator development";}
function model(level,slot){
 const ld=levelDef(level), sd=slotData(level,slot), subj=subject(ld,sd.title);
 return {ld,sd,subj,title:sd.title,unit:unit(level),
 objective:"By the end of this sublesson, the learner should be able to define the concept, explain why it matters, apply it in a practical creator context, test or review the result, and record evidence clearly enough for assessment.",
 definition:sd.title+" is a focused sublesson inside "+ld.name+". In this academy, a sublesson is not just a reading page. It is a complete learning cycle: definition, explanation, guided application, independent practice, evidence, review, and progression.",
 why:"This matters because high-quality creators do not only copy steps. They understand the reason behind each step, apply it in different situations, test their work, and explain decisions. "+sd.title+" strengthens the learner’s "+subj+" skill and prepares them for the level’s practical gate.",
 core:"The core idea is to move from recognition to control. Recognition means the learner can identify the concept when they see it. Control means the learner can use it deliberately, explain what changed, and diagnose why something did or did not work. Treat this as a small professional workflow: plan, build, test, explain, improve.",
 example:"For example, if this sublesson is about scripting, identify the variable, event, function, condition, data structure, or server/client decision involved. If it is about UI or visual design, identify layout, visual hierarchy, readability, and user flow. If it is business or launch strategy, identify audience, value, trust, and measurable outcome.",
 guided:"Create a small practical piece connected to this sublesson. It can be a Roblox feature, Lua snippet, UI screen, animation, asset, launch plan, business explanation, security checklist, or portfolio section. The work must show decision-making, not just surface-level completion.",
 independent:"Create a second mini-variation without copying the first one exactly. Change one variable, design choice, system rule, layout decision, asset detail, or business assumption. Compare version one and version two.",
 extension:"Connect this sublesson to a larger project. Ask how this skill would appear inside a real Roblox game, academy system, UI dashboard, product page, or portfolio case study. Then write one improvement that would make it more professional.",
 homework:"Write a detailed homework response. Include the official definition, what you attempted, what happened, one problem or limitation, how you would improve it, and how this connects to the course level. Recommended minimum: 180 words.",
 mistakes:["Writing only one short sentence and calling it evidence.","Copying without explaining what each part does.","Skipping testing and missing bugs or weak design choices.","Using vague words such as good, bad, or works without explaining why.","Moving to the next lesson before the current concept is understood."],
 focus:["Can the learner define the concept accurately?","Can the learner apply it in a relevant creator context?","Can the learner explain decisions using clear vocabulary?","Can the learner identify a weakness, bug, limitation, or improvement?","Can the learner produce evidence that proves the work happened?"]};
}
function rubric(){return `<table class="sublesson-rubric-table"><thead><tr><th>Grade</th><th>Standard</th><th>Evidence Required</th></tr></thead><tbody><tr><td>Pass</td><td>Basic understanding</td><td>Defines the concept and completes a simple practical attempt.</td></tr><tr><td>Merit</td><td>Secure understanding</td><td>Explains choices, tests the result, and identifies an improvement.</td></tr><tr><td>Distinction</td><td>Strong independent work</td><td>Shows detailed evidence, uses accurate vocabulary, and compares alternatives.</td></tr><tr><td>Mastery</td><td>Professional judgement</td><td>Connects the lesson to a larger system/project and justifies decisions at a high standard.</td></tr></tbody></table>`;}
function quiz(m){return `<ol><li>Define <strong>${esc(m.title)}</strong> in your own words.</li><li>Why does this concept matter inside <strong>${esc(m.ld.name)}</strong>?</li><li>Give one practical example of where a creator would use it.</li><li>What is one beginner mistake connected to this sublesson?</li><li>What evidence would prove you actually understood it?</li></ol>`;}
function connected(m){const id=m.sd.realLessonId;if(!id||!window.lessons||!window.lessons[id])return"";const l=window.lessons[id],p=window.paths&&l.path?window.paths[l.path]:null;return `<div class="sublesson-section"><h3>Connected Original Lesson</h3><div class="sublesson-callout"><strong>${esc(p?p.title:"Course Path")}:</strong> ${esc(l.title||m.title)}</div><p>${esc(l.concept||l.summary||"This connected lesson supports the current Course sublesson.")}</p>${Array.isArray(l.deepDive)?l.deepDive.map(x=>`<p>${esc(x)}</p>`).join(""):""}${l.code?`<pre class="sublesson-code"><code>${esc(l.code)}</code></pre>`:""}</div>`;}
function hwKey(level,slot){return HW+level+":"+slot;}
function openDetailed(level,slot){
 level=Number(level);slot=Number(slot);
 if(!paid()){if(typeof window.showPlans==="function")window.showPlans();return;}
 if(slot>1&&!done(level,slot-1)){if(typeof window.showToast==="function")window.showToast("Complete the previous sublesson first.");if(typeof window.openLevel==="function")window.openLevel(level,"lessons");return;}
 const a=app();if(!a)return;const m=model(level,slot), complete=done(level,slot), saved=localStorage.getItem(hwKey(level,slot))||"";
 a.innerHTML=`<section class="panel detailed-sublesson-page">
 <div class="sublesson-hero"><span class="badge">${m.unit} • Sublesson ${slot}</span><h2>${esc(m.title)}</h2><p>${esc(m.objective)}</p><div class="sublesson-meta-grid"><div class="sublesson-meta-card"><span>Course Level</span><strong>${level}: ${esc(m.ld.name)}</strong></div><div class="sublesson-meta-card"><span>Subject Area</span><strong>${esc(m.subj)}</strong></div><div class="sublesson-meta-card"><span>Status</span><strong>${complete?"Complete":"In Progress"}</strong></div><div class="sublesson-meta-card"><span>Assessment Type</span><strong>Lesson + Homework Evidence</strong></div></div></div>
 <div class="sublesson-section"><h3>Official Textbook Definition</h3><p>${esc(m.definition)}</p><div class="sublesson-callout gold"><strong>Academic standard:</strong> the learner should be able to explain this concept without needing the exact wording from the page.</div></div>
 <div class="sublesson-section"><h3>Full Explanation</h3><p>${esc(m.core)}</p><p>${esc(m.why)}</p><p>${esc(m.example)}</p></div>
 ${connected(m)}
 <div class="sublesson-two-col"><div class="sublesson-section"><h3>Guided Practical</h3><p>${esc(m.guided)}</p><h4>Required proof</h4><ul><li>Screenshot, written plan, code snippet, UI mockup, asset evidence, or test notes.</li><li>One sentence explaining the purpose of the work.</li><li>One sentence explaining what changed after testing or review.</li></ul></div><div class="sublesson-section"><h3>Independent Task</h3><p>${esc(m.independent)}</p><h4>Extension</h4><p>${esc(m.extension)}</p></div></div>
 <div class="sublesson-section"><h3>Common Mistakes</h3><ul>${m.mistakes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><div class="sublesson-callout red"><strong>Do not progress with weak evidence.</strong> If the work cannot be explained, it is not finished.</div></div>
 <div class="sublesson-section"><h3>Mini Exam Questions</h3>${quiz(m)}</div>
 <div class="sublesson-section"><h3>Assessment Focus</h3><ul>${m.focus.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>${rubric()}</div>
 <div class="sublesson-section homework-card"><span class="homework-status">Homework</span><h3>Homework Submission</h3><p>${esc(m.homework)}</p><textarea id="deepHomeworkText" class="sublesson-textarea" placeholder="Write your detailed homework evidence here...">${esc(saved)}</textarea><div id="deepHomeworkStatus" class="sublesson-callout">Words: ${wc(saved)}. Recommended minimum: 180 words. Minimum to mark complete: 100 words.</div><div class="sublesson-actions"><button type="button" onclick="saveDeepSublessonHomework(${level},${slot})">Save Homework</button><button type="button" class="secondary" onclick="markDeepSublessonHomework(${level},${slot})">Mark Homework Complete</button></div></div>
 <div class="sublesson-section"><h3>Completion Checklist</h3><ul><li>I can define the sublesson concept clearly.</li><li>I completed a practical attempt or detailed plan.</li><li>I tested, reviewed, or compared my work.</li><li>I recorded one mistake, limitation, or improvement.</li><li>I wrote enough evidence for review.</li></ul><div class="sublesson-actions"><button type="button" class="secondary" onclick="openLevel(${level},'lessons')">Back to Lessons</button><button type="button" class="green" onclick="completeDeepSublesson(${level},${slot})">${complete?"Already Complete":"Mark Sublesson Complete"}</button></div></div>
 </section>`;
 if(typeof window.setCurrentView==="function")window.setCurrentView("detailedSublesson");
 if(typeof window.showNotesButton==="function")window.showNotesButton(m.title);
}
window.saveDeepSublessonHomework=function(level,slot){const box=document.getElementById("deepHomeworkText");if(!box)return;localStorage.setItem(hwKey(level,slot),box.value.trim());const s=document.getElementById("deepHomeworkStatus");if(s)s.textContent="Saved. Words: "+wc(box.value)+". Recommended minimum: 180 words. Minimum to mark complete: 100 words.";if(typeof window.showToast==="function")window.showToast("Homework saved.");};
window.markDeepSublessonHomework=function(level,slot){const box=document.getElementById("deepHomeworkText"),text=box?box.value.trim():"";if(wc(text)<100){if(typeof window.showToast==="function")window.showToast("Homework needs more detail first.");return;}localStorage.setItem(hwKey(level,slot),text);localStorage.setItem(hwKey(level,slot)+".complete","true");if(typeof window.awardOnce==="function")window.awardOnce("deep-homework:"+level+":"+slot,140,"Completed detailed homework for Level "+level+" Sublesson "+slot,"detailXp");else if(typeof window.awardXpOnce==="function")window.awardXpOnce("deep-homework:"+level+":"+slot,140,"Completed detailed homework for Level "+level+" Sublesson "+slot);if(typeof window.showToast==="function")window.showToast("Detailed homework complete.");};
window.completeDeepSublesson=function(level,slot){mark(level,slot);if(typeof window.awardOnce==="function")window.awardOnce("deep-sublesson:"+level+":"+slot,65,"Completed detailed Course Level "+level+" Sublesson "+slot,"lessons");else if(typeof window.awardXpOnce==="function")window.awardXpOnce("deep-sublesson:"+level+":"+slot,65,"Completed detailed Course Level "+level+" Sublesson "+slot);if(typeof window.showToast==="function")window.showToast("Sublesson complete.");if(typeof window.openLevel==="function")window.openLevel(level,"lessons");};
function patch(){window.openLevelLesson=openDetailed;window.caOpenCourseLesson=openDetailed;document.querySelectorAll("button.lesson-slot-card,.lesson-slot-grid button").forEach(btn=>{const raw=btn.getAttribute("onclick")||"",m=raw.match(/openLevelLesson\((\d+),\s*(\d+)\)/);if(m){const level=Number(m[1]),slot=Number(m[2]);btn.onclick=function(e){e.preventDefault();openDetailed(level,slot);return false;};}});}
document.addEventListener("DOMContentLoaded",patch);setTimeout(patch,50);setTimeout(patch,250);setTimeout(patch,800);
const root=document.getElementById("app");if(root){new MutationObserver(()=>window.requestAnimationFrame(patch)).observe(root,{childList:true,subtree:true});}
})();

/* ===== js/live-ready.js ===== */
/* Live Ready Refinement */
(function(){
"use strict";

function ready(fn){
	if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", fn);
	else fn();
}

function getPlan(){
	try { if(typeof getCurrentPlan==="function") return getCurrentPlan(); } catch(e) {}
	return "";
}

function paid(){
	try { if(typeof hasPlan==="function") return hasPlan(); } catch(e) {}
	return false;
}

function applyBody(){
	document.body.classList.add("live-ready");
	const plan = getPlan();
	if(plan) document.body.dataset.plan = plan;
}

function fixCourseNav(){
	const nav = document.querySelector(".nav-actions");
	if(!nav) return;

	const buttons = Array.from(nav.querySelectorAll("button")).filter(function(b){
		const t = b.textContent.trim().toLowerCase();
		return t==="course" || b.id==="navCourse" || b.id==="navLevels";
	});

	buttons.forEach(function(b, i){
		if(i === 0){
			b.id = "navCourse";
			b.textContent = "Course";
			if(typeof showLevelHub === "function") b.onclick = showLevelHub;
		} else {
			b.remove();
		}
	});
}

function cleanHome(){
	const app = document.getElementById("app");
	if(!app) return;

	const isHome = app.textContent.includes("Creator Academy Hub") && app.textContent.includes("View Progress");
	if(!isHome) return;

	app.querySelectorAll("button").forEach(function(b){
		const t = b.textContent.trim().toLowerCase();
		if(t === "plans" || t === "choose plan") b.remove();
		if(t === "continue learning" && typeof showLevelHub === "function") b.onclick = showLevelHub;
	});
}

function banner(){
	if(document.querySelector(".live-launch-banner") || !paid()) return;

	const app = document.getElementById("app");
	if(!app) return;

	const panel = app.querySelector(".panel");
	if(!panel) return;

	const txt = panel.textContent || "";
	if(!txt.includes("Creator Academy Hub") && !txt.includes("Course Section")) return;

	panel.insertAdjacentHTML("afterbegin",
		'<div class="live-launch-banner"><strong>Live-ready mode:</strong> course, XP, homework, coursework, exams, plans, and premium UI are prepared. AI integration is intentionally not active until the backend/API layer is added.</div>'
	);
}

function apiNote(){
	const app = document.getElementById("app");
	if(!app || app.querySelector(".live-api-warning")) return;

	const txt = app.textContent || "";
	if(!(txt.includes("Admin") || txt.includes("Stripe") || txt.includes("Platinum") || txt.includes("Plans"))) return;

	const panel = app.querySelector(".panel");
	if(!panel) return;

	panel.insertAdjacentHTML("beforeend",
		'<div class="live-api-warning"><strong>API safety note:</strong> when OpenAI API is added, do not put the API key in frontend JavaScript. Route requests through a backend and load secrets from environment variables such as <code>OPENAI_API_KEY</code>.</div>'
	);
}

function adminChip(){
	const host = String(window.location.hostname || "").toLowerCase();
	const isLocalTestingHost = window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
	if(!isLocalTestingHost){
		const existing = document.querySelector(".live-admin-chip");
		if(existing) existing.remove();
		return;
	}
	if(document.querySelector(".live-admin-chip")) return;

	document.body.insertAdjacentHTML("beforeend",
		'<div class="live-admin-chip"><strong>Admin mode</strong> · Internal/testing access active</div>'
	);
}

function footer(){
	if(document.querySelector(".live-terms-footer")) return;

	const app = document.getElementById("app");
	if(!app) return;

	app.insertAdjacentHTML("afterend",
		`<footer class="live-terms-footer">
			<span>Creator Academy Hub prototype. Payments/access should be manually verified until a backend is connected.</span>
			<button type="button" class="secondary" onclick="openLivePolicyModal('privacy')">Privacy</button>
			<button type="button" class="secondary" onclick="openLivePolicyModal('terms')">Terms</button>
		</footer>`
	);
}

window.openLivePolicyModal = function(type){
	const old = document.querySelector(".live-modal-backdrop");
	if(old) old.remove();

	const privacy = type === "privacy";

	const html = privacy
		? `<h2>Privacy Notice</h2>
			<p>This prototype stores progress, plan state, XP, notes, homework, and coursework status locally in the browser.</p>
			<h3>Important</h3>
			<ul>
				<li>No OpenAI API requests are active in this static build.</li>
				<li>No API keys should be placed inside frontend code.</li>
				<li>Payment verification should use a backend before real public launch.</li>
				<li>Local browser storage can be cleared by the user or browser.</li>
			</ul>`
		: `<h2>Terms Notice</h2>
			<p>This is an academy prototype for structured creator learning.</p>
			<h3>Access</h3>
			<ul>
				<li>Basic / Free is preview only.</li>
				<li>Paid access should be verified before granting real account access.</li>
				<li>Admin tools are internal/testing only.</li>
				<li>Course content and assessment structure should be reviewed before commercial launch.</li>
			</ul>`;

	document.body.insertAdjacentHTML("beforeend",
		`<div class="live-modal-backdrop" onclick="if(event.target===this)this.remove()">
			<div class="live-modal">
				${html}
				<div class="actions">
					<button type="button" onclick="this.closest('.live-modal-backdrop').remove()">Close</button>
				</div>
			</div>
		</div>`
	);
};

function run(){
	applyBody();
	fixCourseNav();
	cleanHome();
	adminChip();
	footer();
	banner();
	apiNote();
}

ready(function(){
	run();
	setTimeout(run, 120);
	setTimeout(run, 600);

	const app = document.getElementById("app");
	if(app){
		new MutationObserver(function(){
			window.requestAnimationFrame(run);
		}).observe(app, {childList:true, subtree:true});
	}
});

})();

/* ===== js/backend-checkout.js ===== */
/* Backend Stripe Checkout Layer */
(function () {
  "use strict";

  const STORAGE_LEARNER_ID = "creatorAcademy.learnerId";
  const STORAGE_ENTITLEMENT_TOKEN = "creatorAcademy.entitlementToken";
  const STORAGE_ENTITLEMENT_PLAN = "creatorAcademy.entitlementPlan";
  const VALID_PAID_PLANS = new Set([
    "plus",
    "elite",
    "pro",
    "proplus",
    "proplus_lifetime",
    "platinum",
    "platinum_lifetime"
  ]);

  function safeStorageGet(key) {
    try { return localStorage.getItem(key) || ""; } catch { return ""; }
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Browser storage can fail in private mode. */ }
  }

  function normalisePlan(plan) {
    return String(plan || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\+/g, "plus")
      .replace(/-/g, "_");
  }

  function makeRandomId() {
    const webCrypto = window.crypto || window.msCrypto;
    if (webCrypto && typeof webCrypto.randomUUID === "function") return webCrypto.randomUUID();
    return "learner_" + Date.now() + "_" + Math.random().toString(16).slice(2);
  }

  function learnerId() {
    let id = safeStorageGet(STORAGE_LEARNER_ID);
    if (!id) {
      id = makeRandomId();
      safeStorageSet(STORAGE_LEARNER_ID, id);
    }
    return id;
  }

  function toast(message) {
    if (typeof window.showToast === "function") window.showToast(message);
    else console.log(message);
  }

  function getPlanName(plan) {
    if (window.plans && window.plans[plan]?.name) return window.plans[plan].name;
    return {
      plus: "Plus",
      elite: "Elite",
      pro: "Pro",
      proplus: "Pro+",
      proplus_lifetime: "Pro+ Lifetime",
      platinum: "Platinum",
      platinum_lifetime: "Platinum Lifetime"
    }[plan] || plan;
  }

  function storePlan(plan, entitlementToken) {
    plan = normalisePlan(plan);
    if (!VALID_PAID_PLANS.has(plan)) return;

    if (entitlementToken) {
      safeStorageSet(STORAGE_ENTITLEMENT_TOKEN, String(entitlementToken));
      safeStorageSet(STORAGE_ENTITLEMENT_PLAN, plan);
    }

    safeStorageSet("creatorAcademy.plan", plan);
    safeStorageSet("academyPlan", plan);
    safeStorageSet("creatorAcademy.currentPlan", plan);
    safeStorageSet("creatorAcademy.selectedPlan", plan);

    if (window.state) {
      window.state.plan = plan;
      window.state.briefingComplete = true;
      window.state.skillTreeUnlocked = true;
    }

    if (typeof window.saveState === "function") window.saveState();
    document.body.classList.remove("beginner-locked");

    if (typeof window.caSyncPlanStorage === "function") window.caSyncPlanStorage(plan);
    if (typeof window.hardFixApplyPlanAccess === "function") window.hardFixApplyPlanAccess();
    if (typeof window.caBugfixApplyAccess === "function") window.caBugfixApplyAccess();
  }

  async function readJson(response) {
    try { return await response.json(); } catch { return {}; }
  }

  async function startBackendCheckout(plan) {
    plan = normalisePlan(plan);

    if (!VALID_PAID_PLANS.has(plan)) {
      toast("Choose a paid plan before opening checkout.");
      if (typeof window.showPlans === "function") window.showPlans();
      return;
    }

    if (typeof fetch !== "function") {
      throw new Error("This browser cannot open checkout because fetch() is unavailable.");
    }

    toast("Opening secure checkout...");

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, learnerId: learnerId() })
    });

    const data = await readJson(response);

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Checkout backend is not configured. Check Stripe Price IDs in Vercel env vars.");
    }

    window.location.href = data.url;
  }

  async function verifyReturn() {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get("checkout");
    const sessionId = params.get("session_id");

    if (checkout === "cancelled") {
      toast("Checkout cancelled.");
      history.replaceState({}, document.title, location.pathname);
      return;
    }

    if (checkout !== "success" || !sessionId) return;

    toast("Verifying Stripe payment...");

    try {
      const response = await fetch("/api/checkout-status?session_id=" + encodeURIComponent(sessionId));
      const data = await readJson(response);

      if (!response.ok || !data.ok || !data.paid || !data.plan) {
        toast(data.error || "Payment could not be verified yet.");
        return;
      }

      storePlan(data.plan, data.entitlementToken);
      if (typeof window.caVerifyStoredEntitlement === "function") {
        await window.caVerifyStoredEntitlement();
      }
      history.replaceState({}, document.title, location.pathname);
      toast("Access unlocked: " + getPlanName(data.plan));

      if (typeof window.showHome === "function") setTimeout(window.showHome, 250);
    } catch (error) {
      console.error(error);
      toast("Payment verification failed. Check backend logs.");
    }
  }

  function install() {
    window.goToStripePlan = function (plan) {
      startBackendCheckout(plan).catch(error => {
        console.error(error);
        toast(error.message);
      });
      return false;
    };

    window.startBackendCheckout = startBackendCheckout;
  }

  install();
  document.addEventListener("DOMContentLoaded", function () {
    install();
    verifyReturn();
  });
  setTimeout(install, 100);
  setTimeout(install, 500);
})();

/* ===== js/seo-audit-fix.js ===== */
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

/* ===== js/path-course-filter.js ===== */
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

/* ===== js/extreme-density-lessons.js ===== */
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

/* ===== js/scholarly-density-lessons.js ===== */
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

/* ===== js/scholarly-density-2x.js ===== */
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

/* ===== js/path-buttons-hard-fix.js ===== */
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

/* ===== js/course-levels-30-refined.js ===== */
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

/* ===== js/portfolio-section.js ===== */

(function(){
"use strict";
const KEY="creatorAcademy.portfolioProjects",READY="creatorAcademy.portfolioConfirmedReady";
const TYPES=["Roblox Game","Roblox System","Roblox UI","Blender Asset","Moon Animator Animation","VFX / Effects","Coursework Case Study","Business / Monetisation Plan"];
function e(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function wc(t){return String(t||"").trim().split(/\s+/).filter(Boolean).length}
function app(){return document.getElementById("app")}
function toast(m){if(typeof showToast==="function")showToast(m);else console.log(m)}
function get(){try{let d=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(d)?d:[]}catch{return[]}}
function set(v){localStorage.setItem(KEY,JSON.stringify(v))}
function addNav(){
 if(document.querySelector("[data-portfolio-nav]"))return;
 const nav=document.querySelector(".nav-actions")||document.querySelector(".topbar .actions")||document.querySelector(".actions");
 if(!nav)return;
 const b=document.createElement("button");b.type="button";b.textContent="Portfolio";b.dataset.portfolioNav="true";b.onclick=showPortfolioSection;nav.appendChild(b);
}
function score(p){return [p.title&&p.title.length>2,p.type,wc(p.summary)>=25,wc(p.evidence)>=25,p.skills&&p.skills.length>=5].filter(Boolean).length}
function checks(projects){
 return [
  ["At least 3 portfolio pieces",projects.length>=3],
  ["At least 1 Roblox game or Roblox system",projects.some(p=>["Roblox Game","Roblox System"].includes(p.type))],
  ["At least 1 visual/asset/UI/animation/VFX piece",projects.some(p=>["Roblox UI","Blender Asset","Moon Animator Animation","VFX / Effects"].includes(p.type))],
  ["At least 1 detailed case-study style evidence section",projects.some(p=>p.type==="Coursework Case Study"||wc(p.evidence)>=80)],
  ["At least 1 complete project with title, type, summary, evidence and skills",projects.some(p=>score(p)>=5)],
  ["At least 1 project listing 3+ skills",projects.some(p=>(p.skills||"").split(",").filter(x=>x.trim()).length>=3)]
 ];
}
function addProject(){
 const p={
  id:Date.now().toString(36)+Math.random().toString(36).slice(2),
  title:document.getElementById("portfolioTitle")?.value.trim()||"",
  type:document.getElementById("portfolioType")?.value||"",
  status:document.getElementById("portfolioStatus")?.value||"Draft",
  summary:document.getElementById("portfolioSummary")?.value.trim()||"",
  evidence:document.getElementById("portfolioEvidence")?.value.trim()||"",
  skills:document.getElementById("portfolioSkills")?.value.trim()||"",
  link:document.getElementById("portfolioLink")?.value.trim()||"",
  createdAt:new Date().toISOString()
 };
 if(!p.title||!p.type||!p.summary||!p.evidence){alert("Fill in title, type, summary and evidence before adding this portfolio piece.");return}
 if(wc(p.summary)<15||wc(p.evidence)<15){alert("This is too thin. Summary and evidence should both be at least 15 words.");return}
 if(!confirm("Add this portfolio piece?\n\n"+p.title+"\n"+p.type+"\n\nThis saves locally in this browser."))return;
 const projects=get();projects.push(p);set(projects);localStorage.removeItem(READY);toast("Portfolio piece added.");showPortfolioSection();
}
function del(id){
 const projects=get(),p=projects.find(x=>x.id===id); if(!p)return;
 if(!confirm("Delete this portfolio piece?\n\n"+p.title+"\n\nThis cannot be undone unless exported."))return;
 set(projects.filter(x=>x.id!==id));localStorage.removeItem(READY);toast("Portfolio piece deleted.");showPortfolioSection();
}
function exportPortfolio(){
 const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),type:"creator-academy-portfolio",projects:get()},null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="creator-academy-portfolio.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast("Portfolio exported.");
}
function confirmReady(){
 const missing=checks(get()).filter(x=>!x[1]).map(x=>x[0]);
 if(missing.length){alert("Portfolio is not ready yet.\n\nMissing:\n- "+missing.join("\n- "));return}
 if(!confirm("Confirm portfolio readiness?\n\nThis means the portfolio has enough Roblox/creator evidence to be reviewed."))return;
 localStorage.setItem(READY,new Date().toISOString());toast("Portfolio readiness confirmed.");showPortfolioSection();
}
function projectHtml(p){
 const tags=String(p.skills||"").split(",").map(s=>s.trim()).filter(Boolean).slice(0,8);
 return `<div class="portfolio-project"><h4>${e(p.title)}</h4><div class="portfolio-project-meta"><span>${e(p.type)}</span><span>${e(p.status||"Draft")}</span><span>${score(p)}/5 evidence score</span></div><p><strong>Summary:</strong> ${e(p.summary)}</p><p><strong>Evidence:</strong> ${e(p.evidence)}</p>${tags.length?`<div>${tags.map(t=>`<span class="portfolio-pill">${e(t)}</span>`).join("")}</div>`:""}${p.link?`<p><strong>Link:</strong> <a href="${e(p.link)}" target="_blank" rel="noopener noreferrer">${e(p.link)}</a></p>`:""}<div class="portfolio-actions"><button type="button" class="secondary" onclick="portfolioDeleteProject('${e(p.id)}')">Delete</button></div></div>`;
}
function readinessHtml(projects){
 const ready=localStorage.getItem(READY);
 return `${checks(projects).map(c=>`<div class="portfolio-check ${c[1]?"done":"missing"}"><strong>${c[1]?"✓":"!"}</strong><span>${e(c[0])}</span></div>`).join("")}<div class="portfolio-confirmation ${ready?"visible":""}"><strong>Portfolio readiness confirmed.</strong><br>Confirmed at: ${e(ready||"")}</div>`;
}
function showPortfolioSection(){
 const root=app(); if(!root)return;
 const projects=get(),ready=localStorage.getItem(READY);
 root.innerHTML=`<section class="panel portfolio-page"><div class="portfolio-hero"><span class="badge">Creator Portfolio</span><h2>Roblox Creator Portfolio</h2><p>This section is only for relevant evidence: Roblox games, Roblox systems, UI, Blender assets, Moon Animator animations, VFX, coursework case studies, and creator-business planning. It is not a random gallery. Every piece should prove a skill.</p><div><span class="portfolio-pill green">${projects.length} saved pieces</span><span class="portfolio-pill ${ready?"green":"gold"}">${ready?"Readiness confirmed":"Readiness not confirmed"}</span></div></div>
 <div class="portfolio-grid"><div class="portfolio-card"><h3>Add Portfolio Piece</h3><p>Confirmation appears before saving.</p><form class="portfolio-form" onsubmit="event.preventDefault();portfolioAddProject();"><label>Project title<input id="portfolioTitle" placeholder="Example: Button Tycoon Upgrade System"></label><label>Type<select id="portfolioType"><option value="">Choose type...</option>${TYPES.map(t=>`<option>${e(t)}</option>`).join("")}</select></label><label>Status<select id="portfolioStatus"><option>Draft</option><option>In Progress</option><option>Tested</option><option>Portfolio Ready</option></select></label><label>Summary<textarea id="portfolioSummary" placeholder="What did you build or plan? What problem does it solve?"></textarea></label><label>Evidence<textarea id="portfolioEvidence" placeholder="What proves the skill? Mention screenshots, code, UI, bugs fixed, before/after, or testing."></textarea></label><label>Skills shown<input id="portfolioSkills" placeholder="Roblox Lua, UI, RemoteEvents, UX, debugging"></label><label>Link optional<input id="portfolioLink" placeholder="Roblox game link, GitHub, video, screenshot folder, etc."></label><div class="portfolio-actions"><button type="submit">Add With Confirmation</button><button type="button" class="secondary" onclick="portfolioExport()">Export Portfolio</button></div></form></div>
 <div class="portfolio-card"><h3>Portfolio Readiness Confirmation</h3><p>Confirm only when the portfolio has enough proof to be reviewed.</p>${readinessHtml(projects)}<div class="portfolio-actions"><button type="button" class="green" onclick="portfolioConfirmReady()">Confirm Portfolio Ready</button><button type="button" class="secondary" onclick="showLevelHub()">Back to Courses</button></div></div></div>
 <div class="portfolio-card"><h3>Portfolio Pieces</h3>${projects.length?`<div class="portfolio-project-list">${projects.map(projectHtml).join("")}</div>`:`<div class="portfolio-empty">No portfolio pieces yet. Good first options: a button tycoon system, a clean UI flow, a Blender asset pack, a Moon Animator animation, or a coursework case study.</div>`}</div>
 <div class="portfolio-card"><h3>Recommended Portfolio Categories</h3><div class="portfolio-grid"><div><span class="portfolio-pill">Roblox Game</span><p>Playable prototype, tycoon, simulator, obby, showcase, system demo, or academy feature.</p></div><div><span class="portfolio-pill">Roblox System</span><p>Upgrade logic, admin system, RemoteEvent flow, data model, XP, course unlocks, or backend planning.</p></div><div><span class="portfolio-pill">Roblox UI</span><p>Plan screen, dashboard, shop, admin panel, loading screen, mobile responsive layout, or feedback UI.</p></div><div><span class="portfolio-pill">Blender Asset</span><p>Asset pack, building model, prop set, vehicle part, map object, or optimisation proof.</p></div><div><span class="portfolio-pill">Moon Animator</span><p>Character motion, object animation, UI transition concept, cutscene, or timing study.</p></div><div><span class="portfolio-pill">Case Study</span><p>Problem, process, build, bug, fix, result, and what was learned.</p></div></div></div></section>`;
 try{if(typeof setCurrentView==="function")setCurrentView("portfolio")}catch{}
}
function install(){window.showPortfolioSection=showPortfolioSection;window.openPortfolioSection=showPortfolioSection;window.portfolioAddProject=addProject;window.portfolioDeleteProject=del;window.portfolioExport=exportPortfolio;window.portfolioConfirmReady=confirmReady;addNav()}
document.addEventListener("DOMContentLoaded",install);setTimeout(install,100);setTimeout(install,400);setTimeout(install,1000);
const a=document.getElementById("app");if(a)new MutationObserver(()=>requestAnimationFrame(addNav)).observe(a,{childList:true,subtree:true});
})();

/* ===== js/plans-window-upgrade.js ===== */
/* Creator Academy Hub — Upgraded Plans Window */
(function () {
	"use strict";

	const PLAN_STORAGE = "creatorAcademy.selectedPlanWindowFilter";

	const PLAN_GROUPS = {
		core: "Core Plans",
		advanced: "Advanced Plans",
		lifetime: "Lifetime Options"
	};

	const PLANS = [
		{
			id: "free",
			group: "core",
			name: "Free",
			subtitle: "Start the academy, complete briefing, view structure, and test the learning flow.",
			badges: ["Starter"],
			price: "£0",
			priceNote: "forever",
			options: [{ id: "free", label: "Free Access", price: "£0", note: "Basic access and preview mode." }],
			features: [
				"Academy briefing",
				"Starter progress tracking",
				"Course previews",
				"Portfolio planning preview"
			],
			cta: "Use Free"
		},
		{
			id: "plus",
			group: "core",
			name: "Plus",
			subtitle: "Best for early learners who want the first paid course unlocks and basic progression.",
			badges: ["Monthly"],
			price: "£9.99",
			priceNote: "per month",
			options: [{ id: "plus", label: "Plus Monthly", price: "£9.99/mo", note: "Early course access and core progression." }],
			features: [
				"Unlock early course levels",
				"XP and course progress",
				"Guided lesson structure",
				"Basic portfolio evidence"
			],
			cta: "Choose Plus"
		},
		{
			id: "elite",
			group: "core",
			name: "Elite",
			subtitle: "A stronger learning tier for users who want more serious creator training and evidence.",
			badges: ["Monthly"],
			price: "Elite",
			priceNote: "monthly",
			options: [{ id: "elite", label: "Elite Monthly", price: "Monthly", note: "More course access and evidence structure." }],
			features: [
				"More course levels unlocked",
				"Better coursework/evidence flow",
				"Project and portfolio guidance",
				"UI, Studio, Lua, and asset pathways"
			],
			cta: "Choose Elite"
		},
		{
			id: "pro",
			group: "advanced",
			name: "Pro",
			subtitle: "For committed learners building real systems, UI flows, assets, and publishable project evidence.",
			badges: ["Advanced"],
			price: "Pro",
			priceNote: "monthly",
			options: [{ id: "pro", label: "Pro Monthly", price: "Monthly", note: "Advanced levels and serious project work." }],
			features: [
				"Advanced course access",
				"Scholarly-density sublessons",
				"Portfolio case studies",
				"System design and production workflows"
			],
			cta: "Choose Pro"
		},
		{
			id: "proplus",
			group: "advanced",
			name: "Pro+",
			subtitle: "Premium creator route. Opens as monthly or lifetime so buyers clearly choose the right access.",
			badges: ["Popular", "Monthly or Lifetime"],
			price: "Pro+",
			priceNote: "choose option",
			options: [
				{ id: "proplus", label: "Pro+ Monthly", price: "Monthly", note: "Premium monthly creator access." },
				{ id: "proplus_lifetime", label: "Pro+ Lifetime", price: "£334", note: "One-time lifetime Pro+ access." }
			],
			features: [
				"Premium course access",
				"High-density coursework",
				"Portfolio and launch preparation",
				"Production-grade creator workflow"
			],
			cta: "Choose Pro+",
			featured: true
		},
		{
			id: "platinum",
			group: "advanced",
			name: "Platinum",
			subtitle: "Highest monthly access route for users who want the broadest academy access before lifetime ownership.",
			badges: ["Top Monthly"],
			price: "Platinum",
			priceNote: "choose option",
			options: [
				{ id: "platinum", label: "Platinum Monthly", price: "Monthly", note: "Top recurring access tier." },
				{ id: "platinum_lifetime", label: "Platinum Lifetime", price: "£549.99", note: "One-time highest lifetime access." }
			],
			features: [
				"Highest access tier",
				"Specialist levels and advanced routes",
				"Launch, portfolio, security, backend and strategy sections",
				"Lifetime option available inside the plan"
			],
			cta: "Choose Platinum",
			premium: true
		}
	];

	function escapeHtml(value) {
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

	function app() {
		return document.getElementById("app");
	}

	function toast(message) {
		if (typeof showToast === "function") showToast(message);
		else console.log(message);
	}

	function currentFilter() {
		return localStorage.getItem(PLAN_STORAGE) || "all";
	}

	function setFilter(filter) {
		localStorage.setItem(PLAN_STORAGE, filter);
		showPlans();
	}

	function visiblePlans() {
		const filter = currentFilter();

		if (filter === "all") return PLANS;
		if (filter === "lifetime") return PLANS.filter(plan => plan.options.some(opt => opt.id.includes("lifetime")));
		return PLANS.filter(plan => plan.group === filter);
	}

	function optionName(optionId) {
		const plan = PLANS.find(p => p.options.some(o => o.id === optionId));
		const option = plan && plan.options.find(o => o.id === optionId);
		return option ? option.label : optionId;
	}

	function getSelectedOption(plan) {
		const checked = document.querySelector(`input[name="planx-${plan.id}"]:checked`);
		return checked ? checked.value : plan.options[0].id;
	}

	function renderTabs() {
		const f = currentFilter();
		const tabs = [
			["all", "All"],
			["core", "Core"],
			["advanced", "Advanced"],
			["lifetime", "Lifetime"]
		];

		return `
			<div class="planx-tabs">
				${tabs.map(tab => `
					<button type="button" class="${f === tab[0] ? "active" : ""}" onclick="planxSetFilter('${tab[0]}')">${tab[1]}</button>
				`).join("")}
			</div>
		`;
	}

	function renderPlan(plan) {
		const defaultOption = plan.options[0].id;
		const classes = [
			"planx-card",
			plan.featured ? "featured" : "",
			plan.premium ? "premium" : ""
		].filter(Boolean).join(" ");

		return `
			<div class="${classes}">
				<div class="planx-badge-row">
					${plan.badges.map(badge => `<span class="planx-badge ${badge.toLowerCase().includes("lifetime") || badge.toLowerCase().includes("top") ? "gold" : ""}">${escapeHtml(badge)}</span>`).join("")}
				</div>

				<div>
					<h3>${escapeHtml(plan.name)}</h3>
					<p class="planx-subtitle">${escapeHtml(plan.subtitle)}</p>
				</div>

				<div class="planx-price">
					<strong>${escapeHtml(plan.price)}</strong>
					<span>${escapeHtml(plan.priceNote)}</span>
				</div>

				<div class="planx-choice-box">
					${plan.options.map((option, index) => `
						<label class="planx-choice ${index === 0 ? "active" : ""}" onclick="planxMarkActiveChoice(this)">
							<input type="radio" name="planx-${plan.id}" value="${escapeHtml(option.id)}" ${option.id === defaultOption ? "checked" : ""}>
							<span>
								<strong>${escapeHtml(option.label)}</strong>
								<small>${escapeHtml(option.note)}</small>
							</span>
							<span class="planx-choice-price">${escapeHtml(option.price)}</span>
						</label>
					`).join("")}
				</div>

				<ul class="planx-features">
					${plan.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join("")}
				</ul>

				<div class="planx-card-actions">
					<button type="button" data-stripe-plan-card="true" onclick="planxConfirmFromCard('${escapeHtml(plan.id)}')">${escapeHtml(plan.cta)}</button>
					<div class="planx-secondary-note">Confirmation appears before checkout/access change.</div>
				</div>
			</div>
		`;
	}

	function renderComparison() {
		return `
			<div class="planx-compare">
				<h3>Plan hierarchy clarity</h3>
				<table class="planx-table">
					<thead>
						<tr>
							<th>Access type</th>
							<th>Meaning</th>
							<th>Important rule</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Monthly tiers</td>
							<td>Recurring access for active learners.</td>
							<td>Plus → Elite → Pro → Pro+ → Platinum monthly.</td>
						</tr>
						<tr>
							<td>Lifetime options</td>
							<td>One-time access options shown inside their plan.</td>
							<td>Pro+ Lifetime stays inside Pro+. Platinum Lifetime stays inside Platinum.</td>
						</tr>
						<tr>
							<td>Pro+ Lifetime</td>
							<td>Premium one-time Pro+ access.</td>
							<td>It is not visually buried under normal monthly tiers.</td>
						</tr>
						<tr>
							<td>Platinum Lifetime</td>
							<td>Highest lifetime access option.</td>
							<td>Priced separately and shown clearly as lifetime.</td>
						</tr>
					</tbody>
				</table>
			</div>
		`;
	}

	function renderFaq() {
		return `
			<div class="planx-compare">
				<h3>Buyer clarity</h3>
				<div class="planx-faq">
					<details>
						<summary>Why are monthly and lifetime inside the same plan?</summary>
						<p>Because the buyer should first choose the plan level, then choose how they want to pay for that level.</p>
					</details>
					<details>
						<summary>Why is Pro+ not one flat checkout button?</summary>
						<p>Because Pro+ can have monthly or lifetime access. The upgraded window forces the buyer to pick the exact option before checkout.</p>
					</details>
					<details>
						<summary>Why does Platinum not replace Pro+ Lifetime?</summary>
						<p>Because monthly hierarchy and lifetime ownership are separate buying decisions. Pro+ Lifetime remains a strong one-time option, while Platinum is the highest tier.</p>
					</details>
				</div>
			</div>
		`;
	}

	function showPlans() {
		const root = app();
		if (!root) return;

		const plans = visiblePlans();

		root.innerHTML = `
			<section class="panel planx-page">
				<div class="planx-hero">
					<span class="badge">Access Plans</span>
					<h2>Choose Your Academy Access</h2>
					<p>
						Choose the plan level first, then choose monthly or lifetime inside that plan where available.
						This keeps the pricing clear and stops Pro+ Lifetime, Platinum Monthly, and Platinum Lifetime from being visually mixed together.
					</p>

					<div class="planx-trust-row">
						<div class="planx-trust"><span>Structure</span><strong>Plan first, payment type second</strong></div>
						<div class="planx-trust"><span>Checkout</span><strong>Confirmation before payment</strong></div>
						<div class="planx-trust"><span>Access</span><strong>Monthly and lifetime separated</strong></div>
						<div class="planx-trust"><span>Backend</span><strong>Stripe-ready verification flow</strong></div>
					</div>
				</div>

				<div class="planx-toolbar">
					${renderTabs()}
					<div class="planx-hint">
						Showing <strong>${plans.length}</strong> plan cards. Use Lifetime tab to compare one-time options only.
					</div>
				</div>

				<div class="planx-grid">
					${plans.map(renderPlan).join("")}
				</div>

				${renderComparison()}
				${renderFaq()}

				<div class="actions">
					<button type="button" class="secondary" onclick="showHome()">Back Home</button>
					<button type="button" class="secondary" onclick="showLevelHub()">View Courses</button>
				</div>
			</section>
		`;

		ensureModal();

		try {
			if (typeof setCurrentView === "function") setCurrentView("plans");
		} catch {}
	}

	function ensureModal() {
		if (document.querySelector(".planx-confirm-modal")) return;

		document.body.insertAdjacentHTML("beforeend", `
			<div class="planx-confirm-modal" id="planxConfirmModal" role="dialog" aria-modal="true">
				<div class="planx-confirm-card">
					<h3 id="planxConfirmTitle">Confirm plan</h3>
					<p id="planxConfirmText">Confirm this access choice before continuing.</p>
					<div class="planx-confirm-actions">
						<button type="button" id="planxConfirmContinue">Continue</button>
						<button type="button" class="secondary" onclick="planxCloseConfirm()">Cancel</button>
					</div>
				</div>
			</div>
		`);
	}

	function closeConfirm() {
		document.getElementById("planxConfirmModal")?.classList.remove("visible");
	}

	function confirmFromCard(planId) {
		const plan = PLANS.find(p => p.id === planId);
		if (!plan) return;

		const selected = getSelectedOption(plan);
		confirmPlan(selected);
	}

	function confirmPlan(optionId) {
		ensureModal();

		const modal = document.getElementById("planxConfirmModal");
		const title = document.getElementById("planxConfirmTitle");
		const text = document.getElementById("planxConfirmText");
		const button = document.getElementById("planxConfirmContinue");

		const label = optionName(optionId);

		title.textContent = "Confirm " + label;
		text.textContent =
			"You selected " + label + ". Continue only if this is the access option you want. " +
			"Monthly and lifetime options are separate choices.";

		button.onclick = function () {
			closeConfirm();
			startPlanAction(optionId);
		};

		modal.classList.add("visible");
	}

	function startPlanAction(optionId) {
		optionId = String(optionId || "").trim().toLowerCase();

		if (optionId === "free") {
			try {
				const stateObj = typeof state !== "undefined" ? state : null;
				if (stateObj) {
					stateObj.plan = "free";
					stateObj.briefingComplete = true;
					stateObj.skillTreeUnlocked = true;
					if (typeof saveState === "function") saveState();
				}
			} catch {}

			toast("Free access selected.");
			if (typeof showHome === "function") showHome();
			return;
		}

		// Main Stripe link: this is created in js/backend-checkout.js.
		if (typeof window.goToStripePlan === "function") {
			window.goToStripePlan(optionId);
			return;
		}

		// Secondary Stripe link if backend-checkout exposed the lower-level function.
		if (typeof window.startBackendCheckout === "function") {
			window.startBackendCheckout(optionId).catch(function (error) {
				console.error(error);
				toast(error.message || "Stripe checkout failed.");
			});
			return;
		}

		// Hard fallback: call the Vercel API route directly.
		fetch("/api/create-checkout-session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				plan: optionId,
				learnerId: localStorage.getItem("creatorAcademy.learnerId") || "learner_" + Date.now()
			})
		})
			.then(function (response) {
				return response.json().then(function (data) {
					if (!response.ok || !data.url) {
						throw new Error(data.error || "Stripe checkout is not configured yet.");
					}
					window.location.href = data.url;
				});
			})
			.catch(function (error) {
				console.error(error);
				alert(
					"Stripe checkout is not ready yet.\\n\\n" +
					error.message + "\\n\\n" +
					"Check Vercel Environment Variables: STRIPE_SECRET_KEY and the STRIPE_PRICE_* values."
				);
			});
	}

	function markActiveChoice(label) {
		const parent = label.closest(".planx-choice-box");
		if (!parent) return;

		parent.querySelectorAll(".planx-choice").forEach(item => item.classList.remove("active"));
		label.classList.add("active");

		const input = label.querySelector("input");
		if (input) input.checked = true;
	}

	function install() {
		window.showPlans = showPlans;
		window.openPlans = showPlans;
		window.planxSetFilter = setFilter;
		window.planxConfirmFromCard = confirmFromCard;
		window.planxConfirmPlan = confirmPlan;
		window.planxCloseConfirm = closeConfirm;
		window.planxMarkActiveChoice = markActiveChoice;
	}

	document.addEventListener("DOMContentLoaded", install);
	setTimeout(install, 50);
	setTimeout(install, 300);
	setTimeout(install, 900);
})();

/* ===== js/stripe-plan-status.js ===== */
/* Stripe Plan Link Status Helper */
(function () {
	"use strict";

	function toast(message) {
		if (typeof window.showToast === "function") window.showToast(message);
		else console.log(message);
	}

	async function checkStripeBackend() {
		try {
			const response = await fetch("/api/health");
			const data = await response.json().catch(() => ({}));

			if (!response.ok || !data.ok) {
				throw new Error(data.error || "Health endpoint failed.");
			}

			toast("Backend health endpoint is reachable. Test a checkout to verify Stripe env vars.");

			return data;
		} catch (error) {
			console.error(error);
			toast("Could not check Stripe backend status.");
			return null;
		}
	}

	window.checkStripeBackend = checkStripeBackend;
})();

/* ===== js/final-stability-cleanup.js ===== */
/*
  Creator Academy Hub final stability layer.
  Purpose: keep the existing patch-file structure intact while centralising the safest final overrides.
  Load this file last, after stripe-plan-status.js.
*/
(function () {
  "use strict";

  var BUILD_NAME = "creator-academy-hub-entitlement-hardened";
  var BUILD_DATE = "2026-06-13";
  var ENTITLEMENT_TOKEN_KEY = "creatorAcademy.entitlementToken";
  var ENTITLEMENT_PLAN_KEY = "creatorAcademy.entitlementPlan";
  var entitlementCheckState = "pending";

  var PAID_PLANS = [
    "plus",
    "elite",
    "pro",
    "proplus",
    "proplus_lifetime",
    "platinum",
    "platinum_lifetime"
  ];

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function normalisePlan(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/\+/g, "plus")
      .replace(/-/g, "_");
  }

  function storageGet(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      return "";
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Storage can fail in strict/private browser modes. The app should still render.
    }
  }
  function storageRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function isLocalDevelopmentHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function requiresServerEntitlement() {
    return !isLocalDevelopmentHost();
  }

  function hasStoredEntitlementToken() {
    return storageGet(ENTITLEMENT_TOKEN_KEY).length > 20;
  }


  function getCurrentPlan() {
    if (requiresServerEntitlement()) {
      var entitlementPlan = normalisePlan(storageGet(ENTITLEMENT_PLAN_KEY));
      if (entitlementPlan && hasStoredEntitlementToken()) return entitlementPlan;
      return "";
    }

    var candidates = [
      "creatorAcademy.plan",
      "academyPlan",
      "creatorAcademy.currentPlan",
      "creatorAcademy.selectedPlan",
      ENTITLEMENT_PLAN_KEY
    ];

    for (var i = 0; i < candidates.length; i += 1) {
      var plan = normalisePlan(storageGet(candidates[i]));
      if (plan) return plan;
    }
    return "";
  }

  function hasPaidAccess(plan) {
    var cleanPlan = normalisePlan(plan || getCurrentPlan());
    if (PAID_PLANS.indexOf(cleanPlan) === -1) return false;
    if (!requiresServerEntitlement()) return true;
    return entitlementCheckState === "verified";
  }

  function syncPlanStorage(plan) {
    var cleanPlan = normalisePlan(plan || getCurrentPlan());
    if (!cleanPlan) return "";

    if (requiresServerEntitlement() && PAID_PLANS.indexOf(cleanPlan) !== -1 && !hasStoredEntitlementToken()) {
      return "";
    }

    storageSet("creatorAcademy.plan", cleanPlan);
    storageSet("academyPlan", cleanPlan);
    storageSet("creatorAcademy.currentPlan", cleanPlan);
    storageSet("creatorAcademy.selectedPlan", cleanPlan);
    return cleanPlan;
  }

  function clearPaidAccessStorage() {
    storageRemove("creatorAcademy.plan");
    storageRemove("academyPlan");
    storageRemove("creatorAcademy.currentPlan");
    storageRemove("creatorAcademy.selectedPlan");
    storageRemove(ENTITLEMENT_PLAN_KEY);
    storageRemove(ENTITLEMENT_TOKEN_KEY);
    if (window.state) {
      window.state.plan = "";
      window.state.skillTreeUnlocked = false;
    }
    markPaidStateOnBody();
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      try {
        window.showToast(message);
        return;
      } catch (error) {
        // Fall through to direct toast update.
      }
    }

    var node = document.getElementById("toast");
    if (!node) return;
    node.textContent = message;
    node.classList.remove("hidden");
    window.setTimeout(function () {
      node.classList.add("hidden");
    }, 2600);
  }

  function detectPathIdFromElement(element) {
    if (!element) return "";
    var text = (element.textContent || "").toLowerCase();
    var card = element.closest ? element.closest(".path-card, .skill-card, .info-card, .course-card, article, section, div") : null;
    if (card) text += " " + (card.textContent || "").toLowerCase();

    if (text.indexOf("lua") !== -1) return "lua";
    if (text.indexOf("blender") !== -1) return "blender";
    if (text.indexOf("moon") !== -1 || text.indexOf("animator") !== -1 || text.indexOf("animation") !== -1) return "moon";
    if (text.indexOf("studio") !== -1) return "studio";
    return "";
  }

  function patchOpenPathButtons() {
    if (typeof window.showPathCourseFilter !== "function") return;

    Array.prototype.forEach.call(document.querySelectorAll("button"), function (button) {
      var label = (button.textContent || "").trim().toLowerCase();
      if (label !== "open path") return;
      if (button.dataset.caFinalPathPatched === "true") return;

      button.dataset.caFinalPathPatched = "true";
      button.addEventListener("click", function (event) {
        var pathId = detectPathIdFromElement(button);
        if (!pathId) return;
        event.preventDefault();
        event.stopPropagation();
        window.showPathCourseFilter(pathId);
      }, true);
    });
  }

  function markPaidStateOnBody() {
    document.body.classList.toggle("ca-paid-access", hasPaidAccess());
    document.body.classList.toggle("ca-free-access", !hasPaidAccess());
  }

  function installPlanGuards() {
    syncPlanStorage();

    window.caGetCurrentPlan = getCurrentPlan;
    window.caHasPaidAccess = hasPaidAccess;
    window.caSyncPlanStorage = syncPlanStorage;

    // Preserve existing names used by older patch files.
    window.caBugfixBestPlan = getCurrentPlan;
    window.caBestPlanFixed = getCurrentPlan;
    window.caBugfixIsPaid = hasPaidAccess;
    window.caIsPaidAccessFixed = hasPaidAccess;
    window.hasPlan = function (plan) {
      return normalisePlan(plan) === getCurrentPlan();
    };
  }

  function installDiagnostics() {
    window.creatorAcademyDiagnostics = function () {
      var scripts = Array.prototype.map.call(document.scripts, function (script) {
        return script.getAttribute("src") || "inline-script";
      });

      return {
        build: BUILD_NAME,
        buildDate: BUILD_DATE,
        canonical: document.querySelector("link[rel='canonical']")?.href || "",
        currentPlan: getCurrentPlan(),
        paidAccess: hasPaidAccess(),
        pathFilterAvailable: typeof window.showPathCourseFilter === "function",
        checkoutAvailable: typeof window.startBackendCheckout === "function",
        entitlementTokenStored: hasStoredEntitlementToken(),
        entitlementCheckState: entitlementCheckState,
        serverEntitlementRequired: requiresServerEntitlement(),
        scriptCount: scripts.length,
        lastScript: scripts[scripts.length - 1] || "",
        scripts: scripts
      };
    };
  }


  function disablePrototypeAdminOnProduction() {
    if (isLocalDevelopmentHost()) return;

    window.openAdmin = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };
    window.attemptAdminLogin = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };
    window.adminUnlockAcademy = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };
    window.adminCompleteAll = function () {
      toast("Frontend admin tools are disabled outside local development.");
    };

    var overlay = document.getElementById("adminOverlay");
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  async function verifyStoredEntitlement() {
    if (!requiresServerEntitlement()) {
      entitlementCheckState = "local-dev-bypass";
      return;
    }

    var token = storageGet(ENTITLEMENT_TOKEN_KEY);
    if (!token) {
      entitlementCheckState = "missing-token";
      clearPaidAccessStorage();
      return;
    }

    entitlementCheckState = "checking";
    try {
      var response = await fetch("/api/verify-entitlement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entitlementToken: token })
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.ok || !data.plan) {
        entitlementCheckState = "invalid";
        clearPaidAccessStorage();
        toast("Paid access must be re-verified. Please complete checkout again if needed.");
        return;
      }

      entitlementCheckState = "verified";
      storageSet(ENTITLEMENT_PLAN_KEY, normalisePlan(data.plan));
      syncPlanStorage(data.plan);
      if (window.state) {
        window.state.plan = normalisePlan(data.plan);
        window.state.briefingComplete = true;
        window.state.skillTreeUnlocked = true;
      }
      if (typeof window.saveState === "function") window.saveState();
      markPaidStateOnBody();
    } catch (error) {
      entitlementCheckState = "offline-or-api-unavailable";
      // Do not grant new access while offline. Existing UI remains conservative through getCurrentPlan().
      markPaidStateOnBody();
    }
  }

  function hardenExternalLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("a[target='_blank']"), function (link) {
      var rel = (link.getAttribute("rel") || "").toLowerCase().split(/\s+/);
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
      link.setAttribute("rel", rel.filter(Boolean).join(" "));
    });
  }

  function observeDynamicViews() {
    var app = document.getElementById("app") || document.body;
    if (!app || typeof MutationObserver === "undefined") return;

    var queued = false;
    var observer = new MutationObserver(function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        patchOpenPathButtons();
        markPaidStateOnBody();
        hardenExternalLinks();
        disablePrototypeAdminOnProduction();
      });
    });

    observer.observe(app, { childList: true, subtree: true });
  }

  function install() {
    installPlanGuards();
    window.caVerifyStoredEntitlement = verifyStoredEntitlement;
    verifyStoredEntitlement();
    installDiagnostics();
    patchOpenPathButtons();
    markPaidStateOnBody();
    hardenExternalLinks();
    disablePrototypeAdminOnProduction();
    observeDynamicViews();

    window.creatorAcademyBuild = {
      name: BUILD_NAME,
      date: BUILD_DATE,
      note: "Final cleanup layer loaded last. Use creatorAcademyDiagnostics() in DevTools for checks."
    };
  }

  ready(install);
}());
