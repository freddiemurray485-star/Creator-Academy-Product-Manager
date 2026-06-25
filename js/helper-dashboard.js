/*
  Overseer — private local founder command system.
  LocalStorage is limited to harmless task state and notes on this device.
  It is not secure storage and never grants paid, admin, owner, or account access.
*/
(function () {
  "use strict";

  var TASK_STORAGE_KEY = "creatorAcademyHelper.localTasks.v1";
  var NOTES_STORAGE_KEY = "creatorAcademyHelper.localNotes.v1";
  var INTAKE_STORAGE_KEY = "creatorAcademyHelper.localIntake.v1";
  var SOLO_STORAGE_KEY = "creatorAcademyHelper.soloMode.v1";
  var SKILL_STORAGE_KEY = "creatorAcademyHelper.soloSkills.v1";
  var UI_STORAGE_KEY = "creatorAcademyHelper.localUi.v1";
  var DECISIONS_STORAGE_KEY = "creatorAcademyHelper.localDecisions.v1";
  var VAULT_STORAGE_KEY = "creatorAcademyHelper.localVault.v1";
  var VALID_TASK_STATES = ["active", "completed", "blocked", "parked"];
  var SECTION_IDS = ["command", "blueprint", "cars", "life", "founder", "roadmap", "brain", "decisions", "vault"];
  var NAV_SECTIONS = [
    { id: "command", label: "Command Center" },
    { id: "blueprint", label: "Game Blueprint" },
    { id: "cars", label: "Car Systems" },
    { id: "life", label: "Life Systems" },
    { id: "founder", label: "Founder Systems" },
    { id: "roadmap", label: "Roadmap" },
    { id: "brain", label: "Overseer Brain" },
    { id: "decisions", label: "Decisions" },
    { id: "vault", label: "Vault" }
  ];

  var tasks = [
    { id: "vehicle-audio-loop", area: "Roblox Studio", title: "Script startup -> idle no-overlap sequence", detail: "Startup plays once, idle begins after startup finishes, and driving audio never stacks.", why: "This creates the first premium vehicle feel without needing a whole fleet.", effort: "Medium", skill: "Roblox Lua audio states", priority: 1, slot: "core", tag: "Build now", defaultStatus: "active" },
    { id: "test-vehicle-prompt", area: "Roblox Studio", title: "Create one test vehicle with a driver prompt", detail: "Use one car, one seat, one ProximityPrompt and one clear entry state.", why: "A real test vehicle proves the loop before animations and customisation expand.", effort: "Small", skill: "Roblox Studio setup", priority: 2, slot: "support", tag: "Solo-safe", defaultStatus: "active" },
    { id: "vehicle-condition-value", area: "Roblox Studio", title: "Add a simple vehicle condition value", detail: "Store a harmless prototype value such as condition = 100 for future damage and repair systems.", why: "This keeps damage planning ready without building the full repair economy too early.", effort: "Small", skill: "Lua values / attributes", priority: 3, slot: "polish", tag: "Prototype only", defaultStatus: "active" },
    { id: "roblox-core-loop", area: "Roblox Studio", title: "Prove the first playable money loop", detail: "One earning action, one bank/app claim path, one upgrade purchase and one visible result.", why: "The luxury fantasy needs a money loop before the empire can matter.", effort: "Heavy", skill: "Server-authoritative economy", priority: 4, slot: "core", tag: "Next foundation", defaultStatus: "parked" },
    { id: "lua-systems", area: "Roblox Studio", title: "Build the Lua basics practice list", detail: "Learn only the scripting needed for the current playable milestone.", why: "Targeted practice prevents tutorial drift and unlocks the next feature.", effort: "Small", skill: "Lua fundamentals", priority: 5, slot: "support", tag: "Learning required", defaultStatus: "parked" },
    { id: "studio-ui", area: "Roblox Studio", title: "Create readable button labels and feedback", detail: "Polish the minimum UI needed to understand the current loop.", why: "Clear feedback makes testing faster and lowers confusion during solo builds.", effort: "Small", skill: "UI / UX", priority: 6, slot: "polish", tag: "Prototype only", defaultStatus: "parked" },
    { id: "tycoon-events", area: "Roblox Studio", title: "Outline Tycoon and event-system boundaries", detail: "Separate trusted server logic, client UI and safe event controls.", why: "Server authority matters before anything becomes public or monetised.", effort: "Medium", skill: "RemoteEvents / server validation", priority: 7, slot: "core", tag: "Learning required", defaultStatus: "parked" },
    { id: "academy-map", area: "Tracked project", title: "Record the Creator Academy Hub boundary", detail: "Keep it parked as a separate public product; Overseer stores status and planning notes only.", priority: 4, slot: "support", tag: "Parked", defaultStatus: "parked" },
    { id: "lesson-template", area: "Tracked project", title: "Record Creator Academy Hub status", detail: "Track its current state, next review date and owner decision without building product content here.", priority: 5, slot: "support", tag: "Parked", defaultStatus: "parked" },
    { id: "assessment-plan", area: "Tracked project", title: "Capture Creator Academy Hub risks", detail: "Keep risks and unresolved decisions as private project notes.", priority: 6, slot: "support", tag: "Parked", defaultStatus: "parked" },
    { id: "portfolio-public-notes", area: "Tracked project", title: "Park Creator Academy Hub future ideas", detail: "Store future ideas without turning them into active Overseer features.", priority: 7, slot: "polish", tag: "Parked", defaultStatus: "parked" },
    { id: "pwa-review", area: "Launch readiness", title: "Review PWA readiness", detail: "Document manifest, install and offline work without claiming readiness.", priority: 8, slot: "polish", tag: "Parked", defaultStatus: "parked" },
    { id: "seo-review", area: "Launch readiness", title: "Review the SEO checklist", detail: "Check metadata, indexing files and future public-page wording.", priority: 9, slot: "polish", tag: "Parked", defaultStatus: "parked" },
    { id: "custom-vehicle-pack", area: "Future studio", title: "Commission a high-end custom vehicle pack", detail: "Keep this out of the current sprint until budget and licensing are clear.", priority: 10, slot: "polish", tag: "Outsource later", defaultStatus: "parked" },
    { id: "huge-city-map", area: "Future studio", title: "Build a huge city with dozens of custom vehicles", detail: "This scope requires a later team/studio phase and strong optimisation evidence.", priority: 11, slot: "core", tag: "Team-stage", defaultStatus: "parked" },
    { id: "decorative-command-room", area: "Future studio", title: "Build decorative command-room features before gameplay", detail: "This does not support the first playable loop.", priority: 12, slot: "polish", tag: "Cut", defaultStatus: "parked" }
  ];

  var academyFocus = [
    "Project status",
    "Roadmap",
    "Tasks",
    "Decisions",
    "Risks",
    "Private notes",
    "Future ideas"
  ];

  var intakeFields = [
    { id: "currentBuild", label: "Current Roblox Studio build", question: "What are you building in Roblox Studio right now?", placeholder: "Example: a tycoon upgrade system, UI flow, event system or Lua practice project" },
    { id: "biggestBlocker", label: "Biggest blocker", question: "What is slowing the project down most?", placeholder: "Describe the bug, missing decision, skill gap or unclear requirement" },
    { id: "courseFocus", label: "Creator Academy Hub tracking note", question: "What status, risk, decision or future idea should Overseer record for this separate project?", placeholder: "Example: parked, next review date, unresolved boundary, project risk or future idea" },
    { id: "requestedHelp", label: "ChatGPT help needed", question: "What do you want ChatGPT to help with?", placeholder: "Example: explain code, debug a script, review a project decision or write a checklist" },
    { id: "targetOutcome", label: "Target outcome", question: "What should a useful answer or finished task produce?", placeholder: "Example: working Lua code, a decision record or a focused execution checklist" },
    { id: "constraints", label: "Constraints and context", question: "What constraints, tools or details must the answer respect?", placeholder: "Example: beginner-friendly, Roblox server-authoritative, local-only, no paid services" }
  ];

  var promptModes = {
    project: { label: "Project adviser", instruction: "Act as a pragmatic private project-operations adviser. Give one prioritised next step, then a short execution plan." },
    lua: { label: "Lua debugger", instruction: "Act as a Roblox Lua debugging partner. Explain the likely cause, show a minimal safe fix, and include checks to prove it works." },
    decision: { label: "Decision reviewer", instruction: "Act as a strict project decision reviewer. Clarify the decision, evidence, risks, reversibility and single next action." },
    launch: { label: "Launch reviewer", instruction: "Act as a cautious launch reviewer. Separate confirmed facts from assumptions and list only the highest-impact blockers and next actions." }
  };

  var soloPhases = [
    { id: 1, name: "Foundation", items: ["Basic money system", "One plot", "One upgrade path", "Clean project structure", "Backup/version habit", "Basic UI shell"] },
    { id: 2, name: "First Playable Loop", items: ["Earn money", "Claim through bank/app", "Buy first garage", "Spawn one car", "Drive one car", "Save basic progress if ready"] },
    { id: 3, name: "Premium Vehicle Feel", items: ["Enter prompt", "Door animation placeholder", "Startup sound", "Idle loop", "Basic driving loop", "Dashboard light effect", "No overlapping sound"] },
    { id: 4, name: "Customisation Starter", items: ["Paint", "Wheels", "Underglow", "Number plate", "Save build preset"] },
    { id: 5, name: "Life Tycoon Depth", items: ["Car condition", "Damage", "Repair garage", "Business revenue", "Discipline/motivation", "Insurance later"] },
    { id: 6, name: "Status / Flex", items: ["Garage display", "Car meet plaza", "Rating/voting", "Photo mode", "Rarity labels"] },
    { id: 7, name: "Expansion", items: ["More cars", "More businesses", "More zones", "Prestige", "Events"] },
    { id: 8, name: "Launch Prep", items: ["UI polish", "Optimisation", "Bug testing", "Icons/thumbnails", "Trailer", "Soft launch checklist"] }
  ];

  var soloFeatures = [
    { name: "Startup-to-idle vehicle audio", reason: "High premium value, manageable solo scope, and directly supports the first car.", status: "Prototype target", risk: "Audio overlap and poor asset quality", next: "Use one startup one-shot, then start one idle loop on completion.", action: "Build Now", value: 9, difficulty: 4, riskScore: 2, dependency: 1, solo: 9, maintenance: 2, core: 8 },
    { name: "One test vehicle with driver prompt", reason: "Proves the car is usable before custom animation work starts.", status: "Needed before polish", risk: "Prompt state can desync if not reset on exit.", next: "Create one car rig with one seat and one prompt.", action: "Build Now", value: 9, difficulty: 3, riskScore: 2, dependency: 1, solo: 10, maintenance: 2, core: 9 },
    { name: "Enter-car animation", reason: "Valuable for premium feel but timing may be complex.", status: "One-car prototype only", risk: "Door, seat and camera timing can become a rabbit hole.", next: "Prototype one door and one sit transition only.", action: "Prototype Only", value: 8, difficulty: 6, riskScore: 4, dependency: 2, solo: 6, maintenance: 3, core: 6 },
    { name: "Basic money loop", reason: "The whole game needs cashflow, bank claim and upgrade feedback.", status: "Foundation dependency", risk: "Weak economy makes luxury systems feel pointless.", next: "Build one earning action and one bank/app claim path.", action: "Build Now", value: 10, difficulty: 4, riskScore: 3, dependency: 1, solo: 8, maintenance: 3, core: 10 },
    { name: "Full body-kit system across all cars", reason: "Great long-term flex feature, but too much asset and UI work now.", status: "Parked", risk: "High workload before one car is proven.", next: "Keep minimum paint/wheels/plate first.", action: "Park for Later", value: 7, difficulty: 9, riskScore: 8, dependency: 6, solo: 3, maintenance: 8, core: 4, defer: true },
    { name: "Licensed sound pack", reason: "Could massively improve premium feel, but needs money and legal clarity.", status: "Future procurement", risk: "Licensing cost and permissions.", next: "Use approved placeholder audio until budget exists.", action: "Outsource Later", value: 8, difficulty: 8, riskScore: 7, dependency: 5, solo: 2, maintenance: 4, core: 5, outsource: true },
    { name: "Huge city map", reason: "Supports empire fantasy later but will overwhelm current solo execution.", status: "Team-stage later", risk: "Performance, content volume and maintenance.", next: "Build Starter Plot and Luxury Estate first.", action: "Team Stage Later", value: 8, difficulty: 10, riskScore: 9, dependency: 10, solo: 2, maintenance: 10, core: 5 },
    { name: "Barber-style life chores", reason: "Does not support the luxury ownership fantasy strongly enough.", status: "Cut from current direction", risk: "Adds busywork and distracts from cars, money and status.", next: "Replace with discipline, business and ownership consequences.", action: "Cut for Now", value: 2, difficulty: 5, riskScore: 5, dependency: 2, solo: 6, maintenance: 4, core: 1 }
  ];

  var soloSkills = [
    { id: "lua", name: "Lua scripting", level: "Beginner", evidence: "Understands the need for server/client separation and focused practice.", exercise: "Build one tycoon purchase button with server validation.", feature: "Basic money loop", blocked: "Advanced game systems and secure purchases" },
    { id: "studio", name: "Roblox Studio building", level: "Learning", evidence: "Project workflow and organised folders are part of the foundation plan.", exercise: "Create one organised plot with named folders and backups.", feature: "One-plot playable loop", blocked: "Large map production" },
    { id: "vehicles", name: "Vehicle systems", level: "Beginner", evidence: "Understands the desired premium vehicle sequence.", exercise: "Make one vehicle drive reliably before adding entry polish.", feature: "First working car", blocked: "Advanced handling and vehicle fleets" },
    { id: "ui", name: "UI / UX", level: "Learning", evidence: "Can identify the need for clear states and feedback.", exercise: "Build one purchase button with hover, disabled and success states.", feature: "Tycoon and garage UI", blocked: "Large dashboard systems" },
    { id: "animation", name: "Moon Animator / animation", level: "Beginner", evidence: "Premium entry animation is planned but not proven.", exercise: "Prototype one door-open animation and a placeholder sit transition.", feature: "Vehicle entry sequence", blocked: "Multi-car animation library" },
    { id: "blender", name: "Blender modelling", level: "Beginner", evidence: "Custom vehicle and asset ambitions are documented.", exercise: "Optimise and import one simple prop with correct scale.", feature: "Custom garage assets", blocked: "High-end vehicle models" },
    { id: "audio", name: "Audio design / licensing", level: "Beginner", evidence: "Understands startup -> idle no-overlap system.", exercise: "Script one startup sound, then begin one idle loop when it ends.", feature: "Premium vehicle feel", blocked: "RPM blending and licensed audio packs" },
    { id: "economy", name: "Game economy", level: "Learning", evidence: "A money and upgrade loop is part of the foundation plan.", exercise: "Balance five upgrades using a simple cost/reward table.", feature: "Basic tycoon loop", blocked: "Prestige and private-bank systems" },
    { id: "monetisation", name: "Monetisation", level: "Not assessed", evidence: "Not active; no fake premium or paid access exists in Overseer.", exercise: "Write a future-only monetisation ethics checklist after gameplay works.", feature: "Future public launch", blocked: "Production backend and policy review" },
    { id: "marketing", name: "Marketing / devlogs", level: "Beginner", evidence: "Public site and launch content remain future work.", exercise: "Capture one honest weekly build update with a screenshot.", feature: "Devlog cadence", blocked: "Launch campaign" },
    { id: "optimisation", name: "Optimisation", level: "Beginner", evidence: "Ordinary-hardware performance is a permanent rule.", exercise: "Profile one scene and remove one measurable bottleneck.", feature: "Stable playable build", blocked: "Large city and content density" },
    { id: "versioning", name: "Version control / backups", level: "Learning", evidence: "GitHub publishing and local backups are active practices.", exercise: "Create a verified backup before the next structural edit.", feature: "Safe solo workflow", blocked: "Risky large refactors" }
  ];

  var operatingRules = [
    "One playable system beats ten imaginary systems.",
    "Cars are checkpoints, not the ceiling.",
    "Build from skill → product → cashflow → assets → trophies → empire.",
    "No real car brands, logos or audio unless legally licensed.",
    "Local-only app for now.",
    "Overseer stays private and local; public product systems belong in separate projects.",
    "Back up the main project before major edits.",
    "Build for performance on ordinary hardware first.",
    "Every big feature must have a minimum viable version.",
    "Overseer exists to reduce chaos, not store chaos neatly."
  ];

  var hardTruths = [
    "You are solo. Build the core loop before the empire.",
    "This idea is valid, but not for this phase.",
    "One polished car beats ten broken cars.",
    "A realistic startup sequence is valuable only after the car can actually drive.",
    "Do not build luxury polish on top of a weak money loop.",
    "No team means no excuses, but also no uncontrolled scope.",
    "The dream is allowed. The current sprint must be small.",
    "If it does not help the first playable loop, park it.",
    "Stop designing the 10-year version before the 10-minute version works."
  ];

  var directive = {
    activeProject: "Luxury Life Tycoon",
    phase: "Phase 3 - Premium Vehicle Feel",
    system: "Vehicle Audio",
    objective: "Build the first premium vehicle loop: one car, one entry prompt, one startup sound, one idle loop and one clean drive test.",
    nextAction: "Script startup -> idle no-overlap sequence.",
    done: "One test car can be entered, started, idled and driven without audio stacking or constant loop restarts.",
    risk: "Feature overload: full city, full body kits and hypercar vault must stay parked until the first playable car loop works."
  };

  var launchReadiness = [
    ["Core loop", "Prototype", "Money loop is planned; prove earn -> bank/app claim -> upgrade next."],
    ["Vehicle system", "Prototype", "One test car and audio state sequence are the active target."],
    ["Banking / income", "Missing", "CrownVault concept exists; no working Lua system yet."],
    ["Car customisation", "Prototype", "Start with paint, wheels, underglow and plates only."],
    ["Damage / repair", "Missing", "Condition value can be seeded before visual damage."],
    ["UI polish", "Prototype", "Only minimum feedback needed until gameplay works."],
    ["Save system", "Missing", "Add only after values and loop are stable."],
    ["Monetisation readiness", "Missing", "No fake paid access; future review only."],
    ["Testing", "Missing", "Needs one laptop-safe playtest checklist."]
  ];

  var gameIdentity = [
    ["Working title", "Luxury Life Tycoon"],
    ["Genre", "Tycoon foundation + luxury life simulator + vehicle ownership progression."],
    ["Core fantasy", "Start with a basic property, build wealth through believable systems, own and customise cars, manage condition, grow businesses and climb into elite founder status."],
    ["Player promise", "Every upgrade should make the player's life, garage or status visibly better."],
    ["Main audience", "Roblox players who like tycoon progress, cars, flex culture, houses, business upgrades and visible status."],
    ["Different because", "It combines money flow, vehicle ownership, car feel and selective life systems instead of plain button-spam tycoon progression."]
  ];

  var coreLoopSteps = [
    "Earn income",
    "Claim through CrownVault bank/app",
    "Buy upgrades",
    "Unlock garage",
    "Customise and drive cars",
    "Repair/manage vehicles",
    "Expand businesses",
    "Prestige/status",
    "Unlock richer districts"
  ];

  var playerProgression = [
    "Starter property",
    "First garage",
    "First car",
    "First business income",
    "First custom car build",
    "First damaged/repair loop",
    "Mansion upgrade path",
    "Dealership/tuning shop",
    "Private bank account",
    "Luxury district",
    "Hypercar vault",
    "Founder city / empire stage"
  ];

  var zoneCards = [
    { name: "Starter Plot", purpose: "Teach earning, upgrading and ownership basics.", unlock: "Default spawn.", systems: "Basic money, first upgrades, intro UI.", rewards: "Starter house, first income source, clear upgrade path." },
    { name: "Luxury Estate", purpose: "Make wealth visible through property upgrades.", unlock: "Complete starter property milestones.", systems: "Mansion path, garage expansion, status display.", rewards: "Bigger house, garage slots, richer visual feedback." },
    { name: "Supercar District", purpose: "Turn vehicle ownership into a destination.", unlock: "Own first upgraded garage and car.", systems: "Dealerships, car meets, rarity labels.", rewards: "Higher-tier cars, showcase spaces, photo spots." },
    { name: "Business Row", purpose: "Give the player believable income sources.", unlock: "First business purchase.", systems: "Dealership, tuning shop, repair garage, revenue reports.", rewards: "Business income, upgrades, brand/status growth." },
    { name: "Private Island", purpose: "Hold long-term trophy progression.", unlock: "Late prestige and high wealth.", systems: "Exclusive garage, island assets, private events.", rewards: "Rare displays, elite status, event space." },
    { name: "Hypercar Vault", purpose: "Store and flex top-tier vehicle achievements.", unlock: "Very late garage and wealth milestones.", systems: "Rare vehicles, trophies, controlled access.", rewards: "Hypercar showcase, collection status, trophy wall." },
    { name: "Founder City", purpose: "Empire-stage expansion after core game proves itself.", unlock: "Studio-stage later.", systems: "Large city, multiple businesses, events.", rewards: "Endgame map expansion and prestige loops." }
  ];

  var customisationCategories = [
    ["Paint", "Preset colours or one colour picker", "Gloss, matte, metallic, pearl, carbon", "Personal identity", "Low", "Medium", "Early"],
    ["Finish", "Gloss/matte selector", "Layered finish presets", "Premium feel", "Low", "Medium", "Early"],
    ["Wraps", "One simple stripe/decal slot", "Full wrap library", "Flex and variety", "Medium", "High", "Later"],
    ["Wheels", "Three wheel presets", "Rim size, material and brand-safe styles", "Visible upgrade", "Medium", "Medium", "Early"],
    ["Tyres", "Basic tyre type label", "Grip/road/track tyres", "Performance identity", "Medium", "Medium", "Mid"],
    ["Suspension", "One lowered stance option", "Ride height presets", "Car meet appeal", "Medium", "Medium", "Mid"],
    ["Underglow", "On/off colour presets", "Animated glow modes", "Night flex", "Low", "High", "Early"],
    ["Window tint", "Three tint levels", "Material-aware tint", "Luxury style", "Low", "Low", "Mid"],
    ["Lights", "Simple headlight colour", "LED styles and dashboard sync", "Premium feedback", "Medium", "Medium", "Mid"],
    ["Body kits", "Parked", "Front/rear/side kits per car", "High-end custom builds", "Heavy", "High", "Later"],
    ["Spoilers", "One spoiler option", "Multiple aero styles", "Sports identity", "Medium", "Medium", "Mid"],
    ["Exhaust tips", "One visual option", "Tips linked to sound profile", "Audio/visual connection", "Medium", "Medium", "Mid"],
    ["Interior", "Basic seat colour", "Materials, trim and dashboard glow", "Luxury ownership", "Heavy", "Medium", "Later"],
    ["Dashboard glow", "Startup light effect", "Themes tied to car build", "Start sequence payoff", "Medium", "Low", "Early"],
    ["Number plates", "Short custom text", "Plate styles and rarity frames", "Personal ownership", "Low", "Medium", "Early"],
    ["Engine sound profile", "One approved placeholder", "Multiple licensed/approved profiles", "Premium identity", "Medium", "High", "Early"],
    ["Performance upgrades", "Simple speed/handling tiers", "Engine, brakes, turbo, suspension", "Progression power", "Heavy", "High", "Mid"],
    ["Saved builds", "One saved preset", "Named presets per car", "Retention and collection", "Medium", "Medium", "Mid"]
  ];

  var audioStates = [
    ["Off", "Silent parked state", "State", "No engine loops running", "Low", "Early"],
    ["Startup", "Make the car feel premium", "One-shot", "Play once; idle waits until it ends", "High", "Early"],
    ["Idle", "Engine alive while stationary", "Loop", "One loop only; fade out on shutdown", "High", "Early"],
    ["Low RPM", "Gentle movement sound", "Loop / pitch band", "Adjust pitch/volume, do not restart constantly", "Medium", "Mid"],
    ["High RPM", "Speed and power feedback", "Loop / pitch band", "Blend from low RPM, no stacking", "Medium", "Mid"],
    ["Gear shift", "Short punch during acceleration", "One-shot", "Cooldown to avoid spam", "Medium", "Later"],
    ["Turbo spool", "Performance upgrade identity", "Layer", "Only with turbo profile and volume limits", "Medium", "Later"],
    ["Backfire/crackle", "Sport exhaust personality", "One-shot", "Rare triggers, not constant noise", "Medium", "Later"],
    ["Shutdown", "Clean ending", "One-shot", "Stop loops before or during shutdown fade", "Medium", "Mid"]
  ];

  var soundProfiles = [
    ["Inline-6 Legend", "Smooth tuner/sport vibe", "Startup, idle, low/high RPM, shift", "Pairs with Track Exhaust and turbo upgrades", "Use approved/licensed assets only"],
    ["Twin-Turbo V8", "Modern supercar aggression", "Startup, idle, low/high RPM, turbo, crackle", "High-tier exhaust and performance upgrades", "Use approved/licensed assets only"],
    ["Royal V12", "Luxury flagship power", "Startup, idle, low/high RPM, shutdown", "Luxury estate and hypercar status", "Use approved/licensed assets only"],
    ["Deep V8 Rumble", "Muscle luxury rumble", "Startup, idle, low/high RPM, backfire", "Classic/garage identity", "Use approved/licensed assets only"],
    ["Electric Hyperdrive", "Future silent acceleration", "Power-on, hum loop, acceleration whine", "Late-game electric hypercar", "Use approved/licensed assets only"],
    ["Track Exhaust", "Sharper racing tone", "Startup, idle, high RPM, shift, crackle", "Track kit/performance package", "Use approved/licensed assets only"],
    ["Stealth Exhaust", "Quiet luxury", "Soft startup, low idle, muted drive", "Executive/luxury builds", "Use approved/licensed assets only"]
  ];

  var interactionSequence = [
    ["Approach car", "Walks into range", "Prompt activates", "None", "Camera unchanged", "nearby", "Prompt remains hidden"],
    ["Press E", "Input confirms", "Seat reservation starts", "Click/confirm", "Slight focus", "entering", "Double input / two players"],
    ["Controls lock", "Movement pauses", "Car locks driver slot", "None", "Camera stabilises", "locked", "Player gets stuck if cancelled"],
    ["Align to door", "Character moves to point", "Door target selected", "Footstep optional", "Slight side angle", "aligning", "Bad door offset"],
    ["Reach handle", "Plays reach animation", "Door handle target", "Handle click", "Close framing", "animating", "Animation mismatch"],
    ["Door opens", "Waits", "Door hinge opens", "Door sound", "Subtle shake optional", "doorOpen", "Door clips model"],
    ["Enter and sit", "Sits in seat", "Seat occupant assigned", "Seat sound", "Enter framing", "seated", "Seat not assigned"],
    ["Door closes", "Settles in car", "Door closes", "Door close", "Camera returns", "readyToStart", "Door stays open"],
    ["Press F to Start", "Start input", "Dashboard lights on", "Button/key sound", "Dashboard focus", "starting", "Input accepted too early"],
    ["Startup sound", "No movement yet", "Engine state startup", "Startup one-shot", "Small shake", "startup", "Idle starts too early"],
    ["Idle loop begins", "Driving unlocks", "Engine state idle", "Idle loop", "Normal vehicle camera", "drivable", "Loops overlap"],
    ["Drive test", "Player drives", "Vehicle responds", "Low/high RPM blend", "Driving camera", "driving", "Loop restarts constantly"]
  ];

  var damageSystems = [
    ["Vehicle health", "Single condition value and UI bar", "Controls repair thresholds", "Garage service", "Early"],
    ["Scratches", "Light decals or material marks", "Cosmetic wear only", "Detail wash/paint fix", "Mid"],
    ["Dents", "Visible body damage presets", "Lowers condition and resale/status", "Body repair", "Later"],
    ["Engine damage", "Smoke or warning light", "Lower acceleration/top speed", "Garage service", "Mid"],
    ["Tyre damage", "Tyre warning icon", "Handling or speed penalty", "Tyre replacement", "Later"],
    ["Suspension damage", "Tilt/ride-height problem", "Handling penalty", "Mechanic repair", "Later"],
    ["Window damage", "Cracked glass material", "Cosmetic/status penalty", "Glass repair", "Later"],
    ["Totalled state", "Disabled vehicle state", "Tow/repair requirement", "Insurance or full repair", "Much later"],
    ["Insurance/protection", "Protection plan label", "Reduces repair shock", "Premium future system only", "Later"],
    ["Service history", "Simple log of repairs", "Ownership credibility", "Automatically recorded", "Later"],
    ["Vehicle condition UI", "Condition label and warning", "Clear player feedback", "Shown in garage/app", "Early"]
  ];

  var bankOptions = ["CrownVault", "PrimeLedger", "VaultCore", "Atlas Capital", "Empire Bank"];
  var bankingApp = [
    "Available balance",
    "Pending business income",
    "Revenue breakdown",
    "Claim income button",
    "Upgrade account",
    "Transaction history",
    "Business performance",
    "Investment tab later"
  ];

  var businessSystems = [
    ["Dealership", "First business license", "Car sales / commissions", "More slots, higher-tier stock", "Vehicle ownership", "Stock cost and reputation", "Discipline improves consistency"],
    ["Tuning shop", "Garage + first customisation", "Upgrade/service revenue", "Paint, wheels, sound, performance bays", "Car customisation", "Queue and part costs", "Discipline improves upgrade quality"],
    ["Repair garage", "Damage system live", "Repair and service fees", "Faster repair, better parts", "Damage/repair loop", "Player annoyance if too punishing", "Discipline lowers neglected repairs"],
    ["Luxury rental service", "Own multiple vehicles", "Rental income", "Better fleet and clients", "Garage collection", "Vehicle condition and availability", "Discipline improves rental ratings"],
    ["Private bank partnership", "High wealth + business row", "Account bonuses", "Better terms and reports", "CrownVault banking", "Balance risk if too strong", "Discipline improves stable revenue"],
    ["Racing club", "Premium vehicle feel proven", "Event rewards", "Higher event tiers", "Driving skill and status", "Fairness and anti-cheat", "Discipline improves entry consistency"],
    ["Security company", "Luxury estate stage", "Protection income", "More contracts", "Ownership protection", "Maintenance costs", "Discipline lowers losses"],
    ["Hotel/property business", "Luxury district", "Rental/property income", "Rooms, quality, reputation", "Property empire", "Complex economy", "Discipline improves operations"]
  ];

  var disciplineRules = [
    ["Motivation", "Temporary boost from milestones, clips, wins or rare 3AM ideas.", "Short-term build speed or income bonus."],
    ["Discipline", "Earned by finishing daily business tasks, repairs, reinvestment, contracts, training and streaks.", "Stable business revenue and better long-term efficiency."],
    ["Energy", "Optional resource, not forced chores.", "Signals when the player is pushing too hard."],
    ["Burnout", "Punishes messy overwork and ignored maintenance.", "Lowers efficiency until the player stabilises systems."],
    ["Focus", "Improves when the player commits to one clear task.", "Better business output and fewer mistakes."]
  ];

  var ownershipConsequences = [
    ["Car condition", "Affects status, driving and repair decisions."],
    ["Insurance", "Future protection against painful repair spikes."],
    ["Repair cost", "Creates ownership responsibility without boring chores."],
    ["Service quality", "Better shops create better long-term condition."],
    ["Garage storage", "Forces meaningful collection choices."],
    ["Business maintenance", "Businesses should need attention, not constant babysitting."],
    ["Security/protection", "Protects luxury assets and creates future business hooks."],
    ["Reputation/status", "Ties clean ownership, businesses and cars into social proof."]
  ];

  var founderDiscipline = [
    ["Current focus", "First premium vehicle loop"],
    ["Daily build rule", "Ship one small testable improvement before opening new ideas."],
    ["This week's build target", "One test car with prompt, startup sound, idle loop and clean drive test."],
    ["What to avoid", "Full city, full body kits, hypercar vault, public Creator Academy rebuild."],
    ["Current distraction risk", "Designing empire-stage systems before the first playable vehicle loop."]
  ];

  var defaultDecisions = [
    ["Overseer remains local-only.", "Current need is private planning, not accounts.", "No login, database or cloud sync is required.", "Yes"],
    ["Freddie is solo founder.", "Freddie is the only active project lead and final approver.", "Recommendations must be solo-safe and not depend on Mason.", "Yes"],
    ["Mason is inactive / left project for now.", "He is not an active dependency.", "No tasks are assigned to him.", "Yes"],
    ["Creator Academy is tracked only.", "Overseer must not become the public/student product.", "Only status, roadmap, decisions, risks, notes and future ideas appear here.", "No"],
    ["Game direction is luxury life tycoon, not plain tycoon.", "The game needs cars, business, ownership and status fantasy.", "Roadmap prioritises money, vehicles, life systems and premium feel.", "Yes"],
    ["Money does not come from mailbox.", "Bank/app/business income feels more premium and believable.", "CrownVault and business payout systems should replace mailbox cash.", "Yes"],
    ["Car audio must use licensed/approved sounds only.", "Real engine audio can create legal/licensing risk.", "Use approved placeholders until licensing is clear.", "No"],
    ["Real car names/logos/audio are avoided unless legally licensed.", "Brand and audio rights matter.", "Use fictional or inspired profiles and original assets.", "No"],
    ["Motivation is temporary; discipline is earned.", "The life system should reward consistency, not random boosts.", "Discipline gives stable progress; motivation gives short bursts.", "Yes"],
    ["Build one complete car system before expanding to many cars.", "One polished car beats ten broken cars.", "Fleet, body kits and huge city stay parked until one car works.", "Yes"]
  ];

  var vaultCategories = [
    ["10-year features", ["Full cinematic car entry system across every vehicle", "Huge city map", "Founder City", "Advanced body kits", "Seasonal luxury events"]],
    ["Hypercar inspiration", ["Hypercar vault", "Rare vehicle trophies", "Electric Hyperdrive profile", "Private island garage", "Photo-ready display rooms"]],
    ["Studio-stage systems", ["Dedicated content team", "Live analytics", "Car meet championships", "Large vehicle pipeline", "Events calendar"]],
    ["Outsource later", ["Licensed sound pack", "High-end vehicle models", "Trailer editing", "Specialist animation polish", "Icon/thumbnail art"]],
    ["Future tech", ["AI command room", "Advanced optimisation tooling", "Automated QA checklist", "Better backup/export system"]],
    ["Parked game ideas", ["Private island zone", "Luxury rental empire", "Security company expansion", "Hotel/property business"]],
    ["Big money checkpoints", ["First polished car loop", "First stable income loop", "First public test", "First premium-looking trailer", "Studio hiring later"]],
    ["Separate product work", ["Creator Academy public platform work", "Creator Academy website rebuild", "Student-facing dashboard later only in its own product"]]
  ];

  function defaultDecisionLog() {
    return defaultDecisions.map(function (item) {
      return "Decision: " + item[0] + "\nReason: " + item[1] + "\nConsequence: " + item[2] + "\nReversible: " + item[3];
    }).join("\n\n");
  }

  function defaultVaultText() {
    return vaultCategories.map(function (category) {
      return category[0] + ":\n- " + category[1].join("\n- ");
    }).join("\n\n");
  }

  var helperState = {
    currentView: "dashboard",
    activeSection: normaliseSection(readLocalText(UI_STORAGE_KEY)),
    taskState: normaliseTaskState(readLocalJson(TASK_STORAGE_KEY, {})),
    notes: readLocalText(NOTES_STORAGE_KEY),
    decisions: readLocalText(DECISIONS_STORAGE_KEY) || defaultDecisionLog(),
    vault: readLocalText(VAULT_STORAGE_KEY) || defaultVaultText(),
    intake: normaliseIntake(readLocalJson(INTAKE_STORAGE_KEY, {})),
    promptMode: "project",
    solo: normaliseSoloState(readLocalJson(SOLO_STORAGE_KEY, {})),
    skills: normaliseSkillState(readLocalJson(SKILL_STORAGE_KEY, {}))
  };

  function readLocalJson(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function readLocalText(key) {
    try { return window.localStorage.getItem(key) || ""; }
    catch (error) { return ""; }
  }

  function writeLocalJson(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { showHelperToast("Local task state could not be saved in this browser."); }
  }

  function writeLocalText(key, value) {
    try { window.localStorage.setItem(key, String(value || "")); }
    catch (error) { showHelperToast("Local notes could not be saved in this browser."); }
  }

  function normaliseTaskState(stored) {
    var clean = {};
    tasks.forEach(function (task) {
      var value = stored && stored[task.id];
      if (value === true) value = "completed";
      if (value === false) value = "active";
      clean[task.id] = VALID_TASK_STATES.indexOf(value) >= 0 ? value : task.defaultStatus;
    });
    return clean;
  }

  function normaliseSection(value) {
    return SECTION_IDS.indexOf(value) >= 0 ? value : "command";
  }

  function normaliseIntake(stored) {
    var clean = {};
    intakeFields.forEach(function (field) {
      clean[field.id] = String(stored && stored[field.id] || "").trim().slice(0, 1200);
    });
    return clean;
  }

  function normaliseSoloState(stored) {
    var phase = Number(stored && stored.phase);
    if (!Number.isInteger(phase) || phase < 1 || phase > soloPhases.length) phase = 3;
    return {
      phase: phase,
      activeSystem: String(stored && stored.activeSystem || "Vehicle Audio - first premium vehicle loop").trim().slice(0, 200),
      learningBlocker: String(stored && stored.learningBlocker || "Lua scripting fundamentals").trim().slice(0, 200),
      masonActive: Boolean(stored && stored.masonActive)
    };
  }

  function normaliseSkillState(stored) {
    var validLevels = ["Not assessed", "Beginner", "Learning", "Working", "Confident"];
    var clean = {};
    soloSkills.forEach(function (skill) {
      clean[skill.id] = validLevels.indexOf(stored && stored[skill.id]) >= 0 ? stored[skill.id] : skill.level || "Not assessed";
    });
    return clean;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function appRoot() {
    return document.getElementById("app");
  }

  function isLocalHost() {
    var host = String(window.location.hostname || "").toLowerCase();
    return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "::1";
  }

  function showHelperToast(message) {
    var previous = document.querySelector(".helper-toast");
    if (previous) previous.remove();
    var toast = document.createElement("div");
    toast.className = "helper-toast";
    toast.setAttribute("role", "status");
    toast.textContent = String(message || "");
    document.body.appendChild(toast);
    window.setTimeout(function () { if (toast.parentNode) toast.remove(); }, 3200);
  }

  function installShell() {
    document.body.classList.add("helper-app");
    var app = appRoot();
    if (app) app.classList.add("helper-root");

    var brand = document.querySelector(".topbar .brand");
    if (brand) {
      brand.innerHTML = [
        '<span class="brand-mark" aria-hidden="true">OV</span>',
        '<div><h1>Overseer</h1><p>Private · local founder command system</p></div>'
      ].join("");
    }
    renderNavigation();
  }

  function renderNavigation() {
    var nav = document.querySelector(".topbar .nav-actions");
    if (!nav) return;
    nav.classList.add("overseer-nav");
    nav.setAttribute("aria-label", "Overseer sections");
    nav.innerHTML = NAV_SECTIONS.map(function (section) {
      var active = helperState.activeSection === section.id;
      return '<button type="button" class="helper-nav-button ' + (active ? "active" : "") + '" data-section="' + section.id + '" aria-controls="overseerSectionContent" aria-pressed="' + (active ? "true" : "false") + '"' + (active ? ' aria-current="page"' : "") + '>' + section.label + '</button>';
    }).join("");
    Array.prototype.forEach.call(nav.querySelectorAll("button[data-section]"), function (button) {
      button.addEventListener("click", function () {
        setActiveSection(button.getAttribute("data-section"));
      });
    });
  }

  function taskStatus(taskId) {
    return VALID_TASK_STATES.indexOf(helperState.taskState[taskId]) >= 0 ? helperState.taskState[taskId] : "active";
  }

  function taskCounts() {
    var counts = { active: 0, completed: 0, blocked: 0, parked: 0 };
    tasks.forEach(function (task) { counts[taskStatus(task.id)] += 1; });
    return counts;
  }

  function activeSlotCounts() {
    var slots = { core: 0, support: 0, polish: 0 };
    tasks.forEach(function (task) {
      if (taskStatus(task.id) === "active" && slots[task.slot] !== undefined) slots[task.slot] += 1;
    });
    return slots;
  }

  function overloadState() {
    var slots = activeSlotCounts();
    var overloaded = slots.core > 1 || slots.support > 1 || slots.polish > 1;
    return {
      overloaded: overloaded,
      slots: slots,
      message: overloaded
        ? "Feature overload detected. You are acting like a 10-person studio. Pick one system and finish it."
        : "Feature load controlled: one core, one support and one polish slot maximum."
    };
  }

  function nextThreeActions() {
    return tasks
      .filter(function (task) { return taskStatus(task.id) === "active"; })
      .sort(function (a, b) { return a.priority - b.priority; })
      .slice(0, 3);
  }

  function soloBuildScore(feature) {
    return feature.value - feature.difficulty - feature.dependency - feature.maintenance;
  }

  function featureRecommendation(feature) {
    var score = soloBuildScore(feature);
    if (feature.core <= 2) return "Cut for now";
    if (feature.outsource) return "Outsource later";
    if (feature.dependency >= 9) return "Needs team later";
    if (feature.defer) return "Save for later";
    if (score >= 4) return "Build alone now";
    if (score >= 1) return "Prototype alone";
    if (score >= -3) return "Learn first";
    if (score >= -8) return "Save for later";
    return "Needs team later";
  }

  function localReadinessScore() {
    var counts = taskCounts();
    var completedRatio = counts.completed / tasks.length;
    var score = 15 + Math.round(completedRatio * 45);
    if (document.querySelector("link[rel='manifest']")) score += 10;
    if (document.querySelector("meta[name='description']")) score += 5;
    if (document.querySelector("link[rel='canonical']")) score += 5;
    return Math.min(score, 75);
  }

  function burnoutRisk() {
    var counts = taskCounts();
    var overload = overloadState();
    if (overload.overloaded || counts.active > 3) return { label: "High", tone: "bad", detail: "Reduce active scope before adding work." };
    if (counts.blocked > 2) return { label: "Watch", tone: "warn", detail: "Resolve or park blockers before expanding." };
    return { label: "Controlled", tone: "good", detail: "Current active limits support steady solo execution." };
  }

  function intakeProgress() {
    var answered = intakeFields.filter(function (field) {
      return Boolean(String(helperState.intake[field.id] || "").trim());
    }).length;
    return {
      answered: answered,
      total: intakeFields.length,
      percent: Math.round((answered / intakeFields.length) * 100)
    };
  }

  function nextIntakeQuestion() {
    for (var i = 0; i < intakeFields.length; i += 1) {
      if (!String(helperState.intake[intakeFields[i].id] || "").trim()) return intakeFields[i];
    }
    return null;
  }

  function nextAction() {
    var available = tasks
      .filter(function (task) { return taskStatus(task.id) === "active"; })
      .sort(function (a, b) { return a.priority - b.priority; });
    if (available.length) return available[0];

    var blocked = tasks.filter(function (task) { return taskStatus(task.id) === "blocked"; });
    if (blocked.length) {
      return {
        id: "",
        area: "Overseer",
        title: "Review the blocked task list",
        detail: "No active tasks remain. Decide what can be unblocked before adding more work.",
        priority: 1
      };
    }

    return {
      id: "",
      area: "Overseer",
      title: "Choose the next small milestone",
      detail: "The current task list is complete. Add the next focused milestone to local notes.",
      priority: 1
    };
  }

  function overseerNextAction() {
    var missing = nextIntakeQuestion();
    var task = nextAction();
    task.kind = "task";
    task.missingQuestion = missing;
    return task;
  }

  function intakeFieldsHtml() {
    return intakeFields.map(function (field) {
      return [
        '<label class="overseer-intake-field">',
          '<span>' + escapeHtml(field.label) + '</span>',
          '<small>' + escapeHtml(field.question) + '</small>',
          '<textarea id="overseer-intake-' + field.id + '" maxlength="1200" placeholder="' + escapeHtml(field.placeholder) + '">' + escapeHtml(helperState.intake[field.id]) + '</textarea>',
        '</label>'
      ].join("");
    }).join("");
  }

  function promptModeButtons() {
    return Object.keys(promptModes).map(function (mode) {
      return '<button type="button" class="overseer-prompt-mode ' + (helperState.promptMode === mode ? "active" : "") + '" onclick="helperSetPromptMode(\'' + mode + '\')">' + escapeHtml(promptModes[mode].label) + '</button>';
    }).join("");
  }

  function promptValue(value, fallback) {
    var clean = String(value || "").trim();
    return clean || fallback;
  }

  function buildPrompt() {
    var mode = promptModes[helperState.promptMode] || promptModes.project;
    return [
      mode.instruction,
      "",
      "System context:",
      "- Overseer is Freddie Murray's private local founder command system. It organises projects; it is not any tracked product.",
      "- Active tracked project: Luxury Life Tycoon, a Roblox game project.",
      "- Parked tracked project: Creator Academy Hub, a separate future public/student product. Treat it only as status, roadmap, task, decision, risk, note or future-idea metadata.",
      "- Team status: Mason Harris has left for now and must not be treated as an active dependency or task assignee.",
      "- Solo phase: Phase " + helperState.solo.phase + " — " + soloPhases[helperState.solo.phase - 1].name,
      "- Active solo system: " + promptValue(helperState.solo.activeSystem, "Not provided yet"),
      "- Current learning blocker: " + promptValue(helperState.solo.learningBlocker, "Not provided yet"),
      "- Current Roblox Studio build: " + promptValue(helperState.intake.currentBuild, "Not provided yet"),
      "- Biggest blocker: " + promptValue(helperState.intake.biggestBlocker, "Not provided yet"),
      "- Creator Academy Hub tracking note: " + promptValue(helperState.intake.courseFocus, "Not provided yet"),
      "- Help requested: " + promptValue(helperState.intake.requestedHelp, "Not provided yet"),
      "- Target outcome: " + promptValue(helperState.intake.targetOutcome, "Not provided yet"),
      "- Constraints and context: " + promptValue(helperState.intake.constraints, "Not provided yet"),
      "",
      "Response rules:",
      "- Be direct, practical and specific.",
      "- Ask up to three focused questions if critical information is missing.",
      "- Do not invent completed work, production readiness, secure accounts or paid access.",
      "- Do not generate Creator Academy lessons, curriculum, public pages, pricing, accounts, payment flows or student dashboards for Overseer.",
      "- Keep Overseer, Creator Academy Hub and Luxury Life Tycoon as three clearly separate systems.",
      "- Keep Roblox trust-sensitive logic server-authoritative.",
      "- Apply Solo Founder limits: one core system, one support system and one polish task active at most.",
      "- Flag ideas that should be parked, outsourced or delayed until team stage.",
      "- End with the single best next action."
    ].join("\n");
  }

  function statusCard(id, name, status) {
    return [
      '<article id="helper-status-' + id + '" class="helper-card helper-status-card" data-tone="' + escapeHtml(status.tone) + '">',
        '<div class="helper-status-top"><span class="helper-status-name">' + escapeHtml(name) + '</span><span class="helper-status-dot" aria-hidden="true"></span></div>',
        '<strong>' + escapeHtml(status.label) + '</strong>',
        '<p>' + escapeHtml(status.detail) + '</p>',
      '</article>'
    ].join("");
  }

  function launchStatuses() {
    var hasManifest = Boolean(document.querySelector("link[rel='manifest']"));
    var hasServiceWorkerSupport = "serviceWorker" in navigator;
    var hasSeoBaseline = Boolean(document.querySelector("meta[name='description']")) && Boolean(document.querySelector("link[rel='canonical']"));
    return {
      pwa: hasManifest && hasServiceWorkerSupport
        ? { label: "Structure detected", detail: "Install and offline behaviour still need manual testing.", tone: "good" }
        : { label: "Planning needed", detail: "Manifest or service worker setup is still outstanding.", tone: "warn" },
      deployment: { label: "Later", detail: "This is a local prototype; hosting is not a readiness claim.", tone: "warn" },
      separation: { label: "Protected", detail: "Public products remain separate from this private local command system.", tone: "good" },
      backend: { label: "Not needed locally", detail: "Only add backend/auth if a production product later needs users or sync.", tone: "good" },
      seo: hasSeoBaseline
        ? { label: "Baseline present", detail: "Metadata exists; public wording and indexing still need review.", tone: "good" }
        : { label: "Review needed", detail: "Add a public-page metadata checklist before deployment.", tone: "warn" }
    };
  }

  function focusChips(items) {
    return '<div class="overseer-chip-list">' + items.map(function (item) {
      return '<span class="overseer-chip">' + escapeHtml(item) + '</span>';
    }).join("") + '</div>';
  }

  function areaTaskList(area) {
    return '<ul class="overseer-area-list">' + tasks.filter(function (task) {
      return task.area === area;
    }).slice(0, 4).map(function (task) {
      return '<li><span class="overseer-state ' + taskStatus(task.id) + '"></span><span>' + escapeHtml(task.title) + '</span></li>';
    }).join("") + '</ul>';
  }

  function taskRows() {
    return tasks.map(function (task) {
      var status = taskStatus(task.id);
      return [
        '<article class="helper-task-row ' + status + '">',
          '<div><span class="helper-task-area">' + escapeHtml(task.area) + '</span><span class="solo-task-tag">' + escapeHtml(task.tag) + '</span><strong>' + escapeHtml(task.title) + '</strong><small>' + escapeHtml(task.detail) + '</small>' + (task.why ? '<small><b>Why:</b> ' + escapeHtml(task.why) + ' | <b>Skill:</b> ' + escapeHtml(task.skill) + ' | <b>Effort:</b> ' + escapeHtml(task.effort) + '</small>' : '') + '</div>',
          '<select class="helper-task-state" aria-label="Status for ' + escapeHtml(task.title) + '" onchange="helperSetTaskStatus(\'' + task.id + '\', this.value)">',
            '<option value="active"' + (status === "active" ? " selected" : "") + '>Active</option>',
            '<option value="completed"' + (status === "completed" ? " selected" : "") + '>Completed</option>',
            '<option value="blocked"' + (status === "blocked" ? " selected" : "") + '>Blocked</option>',
            '<option value="parked"' + (status === "parked" ? " selected" : "") + '>Parked</option>',
          '</select>',
        '</article>'
      ].join("");
    }).join("");
  }

  function soloNextActionsHtml() {
    var actions = nextThreeActions();
    if (!actions.length) return '<p class="solo-empty">No active solo tasks. Unpark one focused task before adding new scope.</p>';
    return '<ol class="solo-next-list">' + actions.map(function (task) {
      return [
        '<li>',
          '<div><span>' + escapeHtml(task.effort || task.slot) + '</span><strong>' + escapeHtml(task.title) + '</strong><small>' + escapeHtml(task.why || task.detail) + '</small></div>',
          '<dl><div><dt>Skill</dt><dd>' + escapeHtml(task.skill || "Project execution") + '</dd></div><div><dt>Status</dt><dd>' + escapeHtml(taskStatus(task.id)) + '</dd></div></dl>',
        '</li>'
      ].join("");
    }).join("") + '</ol>';
  }

  function phaseOptions() {
    return soloPhases.map(function (phase) {
      return '<option value="' + phase.id + '"' + (helperState.solo.phase === phase.id ? " selected" : "") + '>Phase ' + phase.id + ': ' + escapeHtml(phase.name) + '</option>';
    }).join("");
  }

  function soloRoadmapHtml() {
    return soloPhases.map(function (phase) {
      var state = phase.id < helperState.solo.phase ? "complete" : (phase.id === helperState.solo.phase ? "current" : "future");
      return [
        '<details class="solo-phase ' + state + '"' + (phase.id === helperState.solo.phase ? " open" : "") + '>',
          '<summary><span class="solo-phase-number">' + phase.id + '</span><div><strong>' + escapeHtml(phase.name) + '</strong><small>' + (state === "current" ? "Current solo phase" : state === "complete" ? "Earlier phase" : "Future phase") + '</small></div><span class="solo-phase-count">' + phase.items.length + ' steps</span></summary>',
          '<ul>' + phase.items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>',
        '</details>'
      ].join("");
    }).join("");
  }

  function featureScoreRows() {
    return soloFeatures.map(function (feature) {
      var score = soloBuildScore(feature);
      var recommendation = featureRecommendation(feature);
      var tone = recommendation === "Build alone now" ? "good" : (recommendation === "Prototype alone" || recommendation === "Learn first" ? "warn" : "bad");
      return [
        '<article class="solo-feature-row" data-tone="' + tone + '">',
          '<div><strong>' + escapeHtml(feature.name) + '</strong><small>Value ' + feature.value + ' − difficulty ' + feature.difficulty + ' − dependency ' + feature.dependency + ' − maintenance ' + feature.maintenance + '</small></div>',
          '<span class="solo-score">' + score + '</span>',
          '<span class="solo-recommendation">' + escapeHtml(recommendation) + '</span>',
        '</article>'
      ].join("");
    }).join("");
  }

  function skillRows() {
    var levels = ["Not assessed", "Beginner", "Learning", "Working", "Confident"];
    return soloSkills.map(function (skill) {
      var current = helperState.skills[skill.id];
      return [
        '<details class="solo-skill-row">',
          '<summary><div><strong>' + escapeHtml(skill.name) + '</strong><small>' + escapeHtml(skill.feature) + '</small></div>',
            '<select aria-label="Current level for ' + escapeHtml(skill.name) + '" onchange="event.stopPropagation(); helperSetSkillLevel(\'' + skill.id + '\', this.value)">',
              levels.map(function (level) { return '<option value="' + level + '"' + (current === level ? " selected" : "") + '>' + level + '</option>'; }).join(""),
            '</select>',
          '</summary>',
          '<dl><div><dt>Evidence</dt><dd>' + escapeHtml(skill.evidence) + '</dd></div><div><dt>Next exercise</dt><dd>' + escapeHtml(skill.exercise) + '</dd></div><div><dt>Related feature</dt><dd>' + escapeHtml(skill.feature) + '</dd></div><div><dt>Blocked features</dt><dd>' + escapeHtml(skill.blocked) + '</dd></div></dl>',
        '</details>'
      ].join("");
    }).join("");
  }

  function operatingRulesHtml() {
    return '<ol class="solo-rules-list">' + operatingRules.map(function (rule) {
      return '<li>' + escapeHtml(rule) + '</li>';
    }).join("") + '</ol>';
  }

  function renderLegacyDashboard() {
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var next = overseerNextAction();
    var counts = taskCounts();
    var intake = intakeProgress();
    var launch = launchStatuses();
    var overload = overloadState();
    var risk = burnoutRisk();
    var currentPhase = soloPhases[helperState.solo.phase - 1];
    var parkedTasks = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 4);
    var neededSkills = soloSkills.filter(function (skill) {
      return helperState.skills[skill.id] !== "Working" && helperState.skills[skill.id] !== "Confident";
    }).slice(0, 3);
    var localLabel = isLocalHost() ? "Local prototype" : "Hosted copy of local prototype";

    app.innerHTML = [
      '<section class="helper-dashboard helper-enter" aria-label="Overseer dashboard">',
        '<header class="helper-welcome overseer-heading">',
          '<div>',
            '<span class="helper-section-label">Overseer</span>',
            '<h2>Overseer Overview</h2>',
            '<p>Private local command system for project control, Roblox Studio work and founder execution.</p>',
          '</div>',
          '<span class="helper-session-pill">' + escapeHtml(localLabel) + ' · this device only</span>',
        '</header>',

        '<div class="overseer-command-strip">',
          '<span class="overseer-live"><i></i> Mode: Solo Founder</span>',
          '<span>Phase <strong>' + helperState.solo.phase + ' · ' + escapeHtml(currentPhase.name) + '</strong></span>',
          '<span>Information profile <strong>' + intake.percent + '%</strong></span>',
          '<span>Tasks <strong>' + counts.active + ' active</strong></span>',
          '<span>Readiness <strong>' + localReadinessScore() + '% local estimate</strong></span>',
          '<span>Sync <strong>off</strong></span>',
          '<span>Storage <strong>local only</strong></span>',
        '</div>',

        '<div class="overseer-overview-grid">',
          '<article class="helper-card overseer-lead-card">',
            '<div class="overseer-mark">OV</div>',
            '<div><span class="helper-section-label">What Overseer does</span><h3>One place to control separate projects.</h3><p>Overseer tracks project status, tasks, decisions, risks and notes. It does not become the products it tracks.</p></div>',
          '</article>',
          '<article class="helper-card overseer-mission-card">',
            '<span class="helper-section-label">Current mission</span>',
            '<h3>Build the next useful piece without expanding scope too early.</h3>',
            '<p>Keep Luxury Life Tycoon active while Creator Academy Hub remains a separate parked planning reference.</p>',
          '</article>',
          '<article class="helper-card overseer-members-card">',
            '<span class="helper-section-label">Operating structure</span>',
            '<div class="overseer-member"><span class="overseer-avatar">FM</span><div><strong>Freddie Murray</strong><small>Solo Founder · Project Lead · Main Developer · Final Approver</small></div><span class="member-status active">Active</span></div>',
            '<div class="overseer-member ' + (helperState.solo.masonActive ? "" : "inactive") + '"><span class="overseer-avatar mason">MH</span><div><strong>Mason Harris</strong><small>Previous role: Junior Developer / Developer-in-Training · Left project for now</small></div><span class="member-status ' + (helperState.solo.masonActive ? "active" : "inactive") + '">' + (helperState.solo.masonActive ? "Manually reactivated" : "Inactive / Left Project") + '</span><button type="button" class="member-action" onclick="helperToggleMason()">' + (helperState.solo.masonActive ? "Return to inactive" : "Reactivate later") + '</button></div>',
            '<p>Freddie is the only active project dependency. Mason remains in historical context; even if manually reactivated, current recommendations stay solo-safe until Freddie explicitly assigns work.</p>',
          '</article>',
          '<article class="helper-card overseer-project-card">',
            '<span class="helper-section-label">Project status</span>',
            '<div class="overseer-project-status"><strong>Solo execution</strong><span>Founder-led</span></div>',
            '<dl><div><dt>Active</dt><dd>' + counts.active + '</dd></div><div><dt>Completed</dt><dd>' + counts.completed + '</dd></div><div><dt>Parked</dt><dd>' + counts.parked + '</dd></div></dl>',
            '<p>Task status and notes are browser-only preferences, not secure project records.</p>',
          '</article>',
        '</div>',

        '<section class="solo-founder-command" aria-label="Solo Founder command center">',
          '<div class="solo-founder-header">',
            '<div><span class="solo-mode-chip">Mode: Solo Founder</span><h3>Solo Founder Command Center</h3><p>High ambition, practical sequencing, and no roadmap dependency on unavailable team members.</p></div>',
            '<div class="solo-risk" data-tone="' + risk.tone + '"><span>Overload risk</span><strong>' + escapeHtml(risk.label) + '</strong><small>' + escapeHtml(risk.detail) + '</small></div>',
          '</div>',
          '<div class="solo-founder-grid">',
            '<article class="solo-command-card"><span>Current solo workload</span><strong>' + counts.active + ' active features</strong><small>' + overload.slots.core + ' core · ' + overload.slots.support + ' support · ' + overload.slots.polish + ' polish</small></article>',
            '<article class="solo-command-card"><span>Active build focus</span><input id="soloActiveSystem" maxlength="200" value="' + escapeHtml(helperState.solo.activeSystem) + '" aria-label="Active build focus"></article>',
            '<article class="solo-command-card"><span>Maximum recommended</span><strong>3 active features</strong><small>1 core · 1 support · 1 polish</small></article>',
            '<article class="solo-command-card"><span>Current learning blocker</span><input id="soloLearningBlocker" maxlength="200" value="' + escapeHtml(helperState.solo.learningBlocker) + '" aria-label="Current learning blocker"></article>',
          '</div>',
          '<div class="solo-focus-grid">',
            '<article><span class="helper-section-label">Solo build phase</span><select id="soloPhaseSelect" onchange="helperSetSoloPhase(this.value)">' + phaseOptions() + '</select><p>Current: <strong>Phase ' + currentPhase.id + ' · ' + escapeHtml(currentPhase.name) + '</strong></p></article>',
            '<article><span class="helper-section-label">Next three solo actions</span>' + soloNextActionsHtml() + '</article>',
            '<article><span class="helper-section-label">Postpone until later</span><ul>' + parkedTasks.map(function (task) { return '<li>' + escapeHtml(task.title) + '</li>'; }).join("") + '</ul></article>',
            '<article><span class="helper-section-label">Skills before next phase</span><ul>' + neededSkills.map(function (skill) { return '<li><strong>' + escapeHtml(skill.name) + '</strong> · ' + escapeHtml(skill.exercise) + '</li>'; }).join("") + '</ul></article>',
          '</div>',
          '<div class="solo-save-row"><span>Outsource later: high-end custom vehicle models or a properly licensed audio pack.</span><button type="button" class="helper-button primary" onclick="helperSaveSoloState()">Save solo focus</button></div>',
          '<div class="solo-overload-warning ' + (overload.overloaded ? "danger" : "controlled") + '"><strong>' + escapeHtml(overload.message) + '</strong><span>' + escapeHtml(overload.overloaded ? hardTruths[0] : hardTruths[6]) + '</span></div>',
        '</section>',

        '<article class="helper-card helper-next-card">',
          '<div class="helper-priority">' + (next.kind === "intake" ? "INFO" : (next.id ? "HIGH" : "NEXT")) + '</div>',
          '<div><span class="helper-section-label">What should Freddie build next?</span><h3>' + escapeHtml(next.title) + '</h3><p><strong>' + escapeHtml(next.area) + ':</strong> ' + escapeHtml(next.detail) + '</p>' + (next.missingQuestion ? '<small class="solo-overseer-question">Overseer also needs: ' + escapeHtml(next.missingQuestion.question) + '</small>' : '') + '</div>',
          (next.kind === "intake"
            ? '<button type="button" class="helper-button primary" onclick="helperFocusIntake(\'' + next.fieldId + '\')">Answer now</button>'
            : (next.id ? '<button type="button" class="helper-button primary" onclick="helperSetTaskStatus(\'' + next.id + '\', \'completed\')">Mark complete</button>' : '<button type="button" class="helper-button primary" onclick="helperFocusNotes()">Open notes</button>')),
        '</article>',

        '<div class="overseer-intelligence-grid">',
          '<article id="overseerIntake" class="helper-card overseer-intake-card">',
            '<div class="overseer-card-heading">',
              '<div><span class="helper-section-label">Information intake</span><h3>Help Overseer understand the work</h3><p>Answer only what is useful. Everything stays in this browser and is not sent anywhere automatically.</p></div>',
              '<div class="overseer-progress-ring" style="--progress:' + intake.percent + '"><strong>' + intake.percent + '%</strong><span>' + intake.answered + '/' + intake.total + '</span></div>',
            '</div>',
            '<div class="overseer-intake-grid">' + intakeFieldsHtml() + '</div>',
            '<div class="overseer-intake-footer"><span>Local draft · not secure · avoid sensitive information</span><button type="button" class="helper-button primary" onclick="helperSaveIntake()">Save project information</button></div>',
          '</article>',
          '<article class="helper-card overseer-prompt-card">',
            '<div class="overseer-card-heading compact">',
              '<div><span class="helper-section-label">ChatGPT prompt lab</span><h3>Turn project context into a useful prompt</h3><p>Choose a mode, review the prompt, then copy it manually into ChatGPT.</p></div>',
            '</div>',
            '<div class="overseer-prompt-modes">' + promptModeButtons() + '</div>',
            '<textarea id="overseerGeneratedPrompt" class="overseer-generated-prompt" readonly>' + escapeHtml(buildPrompt()) + '</textarea>',
            '<div class="overseer-prompt-footer"><span>Nothing is transmitted automatically.</span><button type="button" class="helper-button primary" onclick="helperCopyPrompt()">Copy prompt</button></div>',
          '</article>',
        '</div>',

        '<div class="overseer-operations-grid">',
          '<article class="helper-card overseer-area-card roblox">',
            '<div class="overseer-area-heading"><span class="overseer-area-icon">R</span><div><span class="helper-section-label">Build operations</span><h3>Roblox Studio Work</h3></div></div>',
            '<p>Track practical building, scripting and production work for Luxury Life Tycoon.</p>',
            focusChips(robloxFocus),
            areaTaskList("Roblox Studio"),
          '</article>',
          '<article class="helper-card overseer-area-card academy">',
            '<div class="overseer-area-heading"><span class="overseer-area-icon">C</span><div><span class="helper-section-label">Tracked project</span><h3>Creator Academy Hub</h3></div></div>',
            '<p>Parked · local-only planning reference. Status, roadmap, tasks, decisions, risks, notes and future ideas only.</p>',
            focusChips(academyFocus),
            areaTaskList("Tracked project"),
          '</article>',
        '</div>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Overseer Brain</span><h3>Solo Build Score</h3></div>',
          '<p>Score = value − difficulty − dependency − maintenance risk.</p>',
        '</div>',
        '<article class="helper-card solo-feature-card">',
          '<div class="solo-feature-head"><span>Feature</span><span>Score</span><span>Recommendation</span></div>',
          '<div class="solo-feature-list">' + featureScoreRowsDetailed() + '</div>',
          '<div class="solo-brain-questions"><strong>Overseer checks:</strong><span>Can Freddie build it alone?</span><span>Does it help the core loop?</span><span>What skill blocks it?</span><span>Is it a launch distraction?</span><span>What is the smallest useful version?</span></div>',
        '</article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Practical sequencing</span><h3>Seven-phase solo roadmap</h3></div>',
          '<p>The 10-year ambition stays visible; only the current phase drives execution.</p>',
        '</div>',
        '<div class="solo-roadmap">' + soloRoadmapHtml() + '</div>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Capability building</span><h3>Solo skill tracker</h3></div>',
          '<p>Track evidence and the next practical exercise—not confidence alone.</p>',
        '</div>',
        '<article class="helper-card solo-skills-card"><div class="solo-skills-grid">' + skillRows() + '</div></article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Local workflow</span><h3>Task tracker</h3></div>',
          '<div class="helper-task-summary"><span>' + counts.active + ' active</span><span>' + counts.completed + ' completed</span><span>' + counts.blocked + ' blocked</span><span>' + counts.parked + ' parked</span></div>',
        '</div>',
        '<article class="helper-card helper-work-card">',
          '<p>Change each task between active, completed, blocked and parked. Saved on this browser only.</p>',
          '<div class="solo-tag-legend"><span>Solo-safe</span><span>Learning required</span><span>Prototype only</span><span>Production-ready</span><span>Outsource later</span><span>Team-stage</span><span>Parked</span><span>Cut</span></div>',
          '<div class="helper-task-list">' + taskRows() + '</div>',
        '</article>',

        '<div class="helper-section-heading">',
          '<div><span class="helper-section-label">Honest readiness</span><h3>Launch readiness</h3></div>',
          '<p>No production status is claimed without evidence.</p>',
        '</div>',
        '<div class="helper-status-grid overseer-readiness-grid">',
          statusCard("pwa", "PWA status", launch.pwa),
          statusCard("deployment", "Deployment", launch.deployment),
          statusCard("separation", "Project separation", launch.separation),
          statusCard("backend", "Backend and auth", launch.backend),
          statusCard("seo", "SEO checklist", launch.seo),
        '</div>',

        '<details class="helper-card solo-rules-card">',
          '<summary><div><span class="helper-section-label">Permanent principles</span><h3>Solo operating rules</h3></div><span>10 rules</span></summary>',
          operatingRulesHtml(),
        '</details>',

        '<div class="helper-work-grid">',
          '<article class="helper-card helper-work-card helper-notes-card">',
            '<h3>Local Overseer notes</h3>',
            '<p>Stored only in this browser. Do not put secrets or sensitive information here.</p>',
            '<textarea id="helperLocalNotes" class="helper-notes" maxlength="4000" placeholder="Capture the next Roblox Studio task, project decision, blocker or launch note...">' + escapeHtml(helperState.notes) + '</textarea>',
            '<div class="helper-notes-footer"><span id="helperNotesStatus">Local only · not secure</span><button type="button" class="helper-button" onclick="helperSaveNotes()">Save notes</button></div>',
          '</article>',
          '<article class="helper-card helper-work-card overseer-later-card">',
            '<h3>Production work for later</h3>',
            '<p>Only add these when the project genuinely moves beyond a local prototype.</p>',
            '<ul class="helper-list">',
              '<li><span class="helper-list-index">S</span><span>Creator Academy Hub public-product work stays outside Overseer.</span></li>',
              '<li><span class="helper-list-index">D</span><span>Deployment needs monitoring, recovery, headers and public copy review.</span></li>',
              '<li><span class="helper-list-index">A</span><span>Any future public-product infrastructure must be designed in its own project.</span></li>',
            '</ul>',
          '</article>',
        '</div>',
      '</section>'
    ].join("");
  }

  function compactList(items) {
    return '<ul class="command-compact-list">' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>';
  }

  function detailTable(headers, rows, className) {
    return [
      '<div class="detail-table-wrap ' + escapeHtml(className || "") + '"><table class="detail-table"><thead><tr>',
      headers.map(function (header) { return '<th>' + escapeHtml(header) + '</th>'; }).join(""),
      '</tr></thead><tbody>',
      rows.map(function (row) {
        return '<tr>' + row.map(function (cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join("") + '</tr>';
      }).join(""),
      '</tbody></table></div>'
    ].join("");
  }

  function definitionList(rows) {
    return '<dl class="detail-definition-list">' + rows.map(function (row) {
      return '<div><dt>' + escapeHtml(row[0]) + '</dt><dd>' + escapeHtml(row[1]) + '</dd></div>';
    }).join("") + '</dl>';
  }

  function detailCards(items, className) {
    return '<div class="' + escapeHtml(className || "detail-card-grid") + '">' + items.map(function (item) {
      var title = item.name || item[0];
      var body = item.purpose ? '<p>' + escapeHtml(item.purpose) + '</p>' : "";
      var details = item.unlock ? definitionList([["Unlock", item.unlock], ["Main systems", item.systems], ["Example rewards", item.rewards]]) : compactList(item.items || item[1] || []);
      return '<article class="helper-card detailed-mini-card"><h3>' + escapeHtml(title) + '</h3>' + body + details + '</article>';
    }).join("") + '</div>';
  }

  function launchSnapshotHtml() {
    return detailTable(["Area", "Status", "Evidence / next check"], launchReadiness, "launch-snapshot-table");
  }

  function featureScoreRowsDetailed() {
    return soloFeatures.map(function (feature) {
      var score = soloBuildScore(feature);
      var recommendation = feature.action || featureRecommendation(feature);
      var tone = recommendation === "Build Now" ? "good" : (recommendation === "Prototype Only" || recommendation === "Learn First" ? "warn" : "bad");
      return [
        '<article class="solo-feature-row" data-tone="' + tone + '">',
          '<div><strong>' + escapeHtml(feature.name) + '</strong><small>Value ' + feature.value + ' - difficulty ' + feature.difficulty + ' - risk ' + (feature.riskScore || 0) + ' - dependency ' + feature.dependency + ' - maintenance ' + feature.maintenance + ' - solo suitability ' + (feature.solo || "n/a") + '</small></div>',
          '<span class="solo-score">' + score + '</span>',
          '<span class="solo-recommendation">' + escapeHtml(recommendation) + '</span>',
        '</article>'
      ].join("");
    }).join("");
  }

  function emptyState(message) {
    return '<div class="overseer-empty-state"><span>—</span><p>' + escapeHtml(message) + '</p></div>';
  }

  function statusChipsHtml(chips) {
    return '<div class="section-status-chips">' + chips.map(function (chip) {
      return '<span data-tone="' + escapeHtml(chip.tone || "neutral") + '"><small>' + escapeHtml(chip.label) + '</small><strong>' + escapeHtml(chip.value) + '</strong></span>';
    }).join("") + '</div>';
  }

  function sectionHeaderHtml(kicker, title, purpose, chips) {
    return [
      '<header class="command-section-head">',
        '<div><span class="helper-section-label">' + escapeHtml(kicker) + '</span><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(purpose) + '</p></div>',
        chips && chips.length ? statusChipsHtml(chips) : "",
      '</header>'
    ].join("");
  }

  function localPreviewLines(value, limit) {
    return String(value || "").split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean).slice(0, limit);
  }

  function decisionRecords() {
    return String(helperState.decisions || "").split(/\n\s*\n/).map(function (block) {
      var record = { decision: "", reason: "", consequence: "", reversible: "" };
      block.split(/\r?\n/).forEach(function (line) {
        var match = line.match(/^\s*(Decision|Reason|Consequences?|Reversible)\s*:\s*(.+)$/i);
        if (!match) return;
        var key = match[1].toLowerCase();
        if (key.indexOf("consequence") === 0) key = "consequence";
        record[key] = match[2].trim();
      });
      return record;
    }).filter(function (record) { return record.decision; }).slice(0, 12);
  }

  function decisionTableHtml() {
    var records = decisionRecords();
    return [
      '<div class="decision-table-wrap"><table class="decision-table"><thead><tr><th>Decision</th><th>Reason</th><th>Consequence</th><th>Reversible</th></tr></thead><tbody>',
      records.length ? records.map(function (record) {
        return '<tr><td>' + escapeHtml(record.decision) + '</td><td>' + escapeHtml(record.reason || "Not recorded") + '</td><td>' + escapeHtml(record.consequence || "Not recorded") + '</td><td>' + escapeHtml(record.reversible || "Review") + '</td></tr>';
      }).join("") : '<tr><td colspan="4">' + emptyState("No structured decisions logged yet.") + '</td></tr>',
      '</tbody></table></div>'
    ].join("");
  }

  function founderTopHtml(next, counts, overload, risk, currentPhase) {
    return [
      '<header class="operator-header">',
        '<div class="operator-identity">',
          '<span class="founder-monogram">FM</span>',
          '<div><span class="helper-section-label">Freddie\'s Command Center</span><h1>Founder operations, without the noise.</h1><p>Current build focus, risk control and the next useful action.</p></div>',
        '</div>',
        '<div class="operator-authority"><span>Founder Access</span><strong>Freddie Murray</strong><small>Final Approver · Solo Founder</small></div>',
      '</header>',
      statusChipsHtml([
        { label: "Mode", value: "Solo Founder", tone: "accent" },
        { label: "Phase", value: currentPhase.name, tone: "neutral" },
        { label: "Focus", value: helperState.solo.activeSystem, tone: "accent" },
        { label: "Risk", value: risk.label, tone: risk.tone },
        { label: "Load", value: overload.overloaded ? "Overloaded" : "Controlled", tone: overload.overloaded ? "bad" : "good" },
        { label: "Status", value: "Local Only", tone: "good" },
        { label: "Data", value: "Local Storage", tone: "neutral" },
        { label: "Creator Academy", value: "Tracked Only", tone: "muted" }
      ]),
      '<section class="mission-focus-grid">',
        '<article class="helper-card mission-focus-card"><span class="command-card-label">Current mission</span><h2>First premium vehicle loop</h2><p>Luxury Life Tycoon - Phase ' + currentPhase.id + ' - ' + escapeHtml(currentPhase.name) + '</p><div class="mission-directive"><span>Current directive</span><strong>' + escapeHtml(directive.objective) + '</strong></div></article>',
        '<article class="helper-card next-action-card"><span class="command-card-label">Next concrete action</span><h3>' + escapeHtml(next.title) + '</h3><p>' + escapeHtml(next.detail) + '</p>' + (next.id ? '<button type="button" class="helper-button primary" onclick="helperSetTaskStatus(\'' + next.id + '\', \'completed\')">Mark complete</button>' : '') + '</article>',
      '</section>'
    ].join("");
  }

  function currentDirectiveHtml() {
    return [
      '<article class="helper-card current-directive-card">',
        '<div class="card-heading-row"><div><span class="command-card-label">Current Directive</span><h3>First premium vehicle loop</h3></div><span class="status-count">Active Project</span></div>',
        definitionList([
          ["Active Project", directive.activeProject],
          ["Current Phase", directive.phase],
          ["Current System", directive.system],
          ["Current Objective", directive.objective],
          ["Next Concrete Action", directive.nextAction],
          ["Definition of Done", directive.done],
          ["Current Risk", directive.risk]
        ]),
      '</article>'
    ].join("");
  }

  function soloFounderLoadHtml(overload) {
    var parked = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; });
    return [
      '<article class="helper-card solo-load-card">',
        '<span class="command-card-label">Solo Founder Load</span>',
        definitionList([
          ["Active core system", "Vehicle Audio"],
          ["Active support system", "One test vehicle / driver prompt"],
          ["Active polish task", "Vehicle condition seed value"],
          ["Parked systems", String(parked.length) + " parked ideas and later systems"],
          ["Recommended limit", "Maximum 1 core, 1 support and 1 polish task active at once"]
        ]),
        '<div class="scope-warning ' + (overload.overloaded ? "danger" : "controlled") + '"><strong>' + (overload.overloaded ? "Feature overload detected" : "Controlled: one core system active") + '</strong><span>' + escapeHtml(overload.message) + '</span></div>',
      '</article>'
    ].join("");
  }

  function commandCenterHtml(next, counts, overload, risk) {
    var parked = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 5);
    var recentDecisions = localPreviewLines(helperState.decisions, 3);
    return [
      '<div class="command-block-heading"><span>Execution</span><h2>Control the active build</h2><p>One core system, one support system and one polish task.</p></div>',
      '<div class="command-execution-grid">',
        currentDirectiveHtml(),
        '<article class="helper-card command-next-three"><span class="command-card-label">Next three actions</span>' + soloNextActionsHtml() + '</article>',
        soloFounderLoadHtml(overload),
        '<article class="helper-card command-signal-card"><span>Active system</span><strong>' + escapeHtml(helperState.solo.activeSystem) + '</strong><small>' + counts.active + ' active tasks</small></article>',
        '<article class="helper-card command-signal-card"><span>Current blocker</span><strong>' + escapeHtml(helperState.solo.learningBlocker) + '</strong><small>Learn only what unlocks the next milestone.</small></article>',
        '<article class="helper-card command-signal-card" data-tone="' + (overload.overloaded ? "bad" : "good") + '"><span>Feature load</span><strong>' + (overload.overloaded ? "Overloaded" : "Controlled") + '</strong><small>' + escapeHtml(overload.message) + '</small></article>',
        '<article class="helper-card command-brain-card"><span class="command-card-label">Overseer recommendation</span><strong>' + escapeHtml(overload.overloaded ? hardTruths[0] : hardTruths[7]) + '</strong><p>' + escapeHtml(risk.detail) + '</p><button type="button" class="helper-button secondary" onclick="helperSetSection(\'brain\')">Open Overseer Brain</button></article>',
      '</div>',
      '<div class="command-block-heading secondary"><span>Memory and readiness</span><h2>Keep context without clutter</h2></div>',
      '<div class="command-lower-grid">',
        '<article class="helper-card launch-snapshot-card"><span class="command-card-label">Launch readiness snapshot</span>' + launchSnapshotHtml() + '</article>',
        '<article class="helper-card command-memory-card"><span class="command-card-label">Recent decisions</span>' + (recentDecisions.length ? compactList(recentDecisions) : emptyState("No decisions logged yet.")) + '<button type="button" class="helper-button neutral" onclick="helperSetSection(\'decisions\')">Open decision log</button></article>',
        '<article class="helper-card command-memory-card"><span class="command-card-label">Parked future ideas</span>' + (parked.length ? compactList(parked.map(function (task) { return task.title; })) : emptyState("No parked future ideas yet.")) + '<button type="button" class="helper-button neutral" onclick="helperSetSection(\'vault\')">Open Vault</button></article>',
        '<article class="helper-card command-readiness-card"><span class="command-card-label">Launch readiness</span><strong>' + localReadinessScore() + '%</strong><div class="command-progress"><i style="width:' + localReadinessScore() + '%"></i></div><p>Local planning estimate only. PWA, backup and launch checks remain evidence-based.</p><button type="button" class="helper-button neutral" onclick="helperSetSection(\'roadmap\')">Review roadmap</button></article>',
        '<article class="helper-card command-local-card"><span class="command-card-label">Local data and backup</span><ul><li><strong>Task and focus state</strong><span>Saved locally</span></li><li><strong>Decisions and Vault</strong><span>Local drafts</span></li><li><strong>Backup export</strong><span>Manual</span></li><li><strong>Sensitive data</strong><span>Do not store</span></li></ul></article>',
      '</div>',
      '<footer class="command-quick-actions"><button type="button" class="helper-button primary" onclick="helperSetSection(\'brain\')">Ask Overseer Brain</button><button type="button" class="helper-button secondary" onclick="helperSetSection(\'roadmap\')">View roadmap</button><button type="button" class="helper-button neutral" onclick="helperSetSection(\'decisions\')">Record decision</button><button type="button" class="helper-button neutral" onclick="helperSetSection(\'vault\')">Park for later</button></footer>'
    ].join("");
  }

  function blueprintHtml() {
    return [
      sectionHeaderHtml("Luxury Life Tycoon", "Game Blueprint", "Core fantasy, playable loop, build phases, zones, progression and scope risk.", [{ label: "Status", value: "Prototype", tone: "warn" }, { label: "Focus", value: "First playable loop", tone: "accent" }]),
      '<div class="blueprint-grid">',
        '<article class="helper-card blueprint-core"><span>Player fantasy</span><h3>Start small. Build income. Upgrade life. Earn visible status.</h3><p>The player should feel progression through useful assets and increasingly premium spaces—not repetitive chores.</p></article>',
        '<article class="helper-card"><span>Core loop</span>' + compactList(["Earn cash", "Buy one meaningful upgrade", "Unlock a better vehicle/property option", "Show progress", "Reinvest into the next milestone"]) + '</article>',
        '<article class="helper-card"><span>Build phases</span>' + compactList(["Foundation", "First playable loop", "Premium vehicle feel", "Status / flex layer", "Tycoon expansion", "Polish and launch"]) + '</article>',
        '<article class="helper-card"><span>Zones</span>' + focusChips(["Starter plot", "Residential upgrade", "Garage", "Dealership later", "Tuning shop later", "Car meet plaza later"]) + '</article>',
        '<article class="helper-card"><span>Progression</span>' + compactList(["Starter income", "House upgrades", "Garage access", "Vehicle quality", "Businesses", "Prestige only after the loop proves itself"]) + '</article>',
        '<article class="helper-card"><span>Core risks</span>' + compactList(["Expanding before the money loop works", "Building a fleet before one car feels right", "Adding polish before reliable server logic", "Designing the city before the starter plot"]) + '</article>',
      '</div>',
      '<article class="helper-card blueprint-guardrail"><strong>Blueprint guardrail</strong><span>Do not build the city, prestige empire or dozens of vehicles before one plot, one money loop and one car work cleanly.</span></article>'
    ].join("");
  }

  function carSystemsHtml() {
    var cards = [
      ["Customisation", ["Paint colour", "Wheel choice", "Custom plates", "Body kits parked until later"]],
      ["Audio states", ["Startup state", "Idle loop", "Driving loop", "No overlapping audio", "Licensed assets only"]],
      ["Vehicle interaction", ["Enter prompt", "Align to door", "Door animation", "Sit placeholder", "Dashboard light", "Failure fallback"]],
      ["Damage and repair", ["Clear damage states", "Repair cost", "No pointless punishment", "Insurance/protection later"]],
      ["Garage and flex", ["Owned vehicles", "Rarity labels", "Status presentation", "Photo spot", "Player viewing later"]]
    ];
    return [
      sectionHeaderHtml("Vehicle systems", "Car Systems", "Vehicle customisation, audio realism, damage, repair and interaction design.", [{ label: "Checkpoint", value: "One working car", tone: "accent" }, { label: "Fleet", value: "Parked", tone: "muted" }]),
      '<div class="system-card-grid">' + cards.map(function (card, index) { return '<article class="helper-card system-detail-card"><span class="system-index">0' + (index + 1) + '</span><h3>' + card[0] + '</h3>' + compactList(card[1]) + '</article>'; }).join("") + '</div>',
      '<article class="helper-card system-sequence"><span>Current recommended sequence</span><strong>One car → enter prompt → reliable drive → startup sound → idle loop → no overlap → one door animation → dashboard light</strong></article>'
    ].join("");
  }

  function lifeSystemsHtml() {
    var systems = [
      ["Banking app / bank", "Make income, spending and future business upgrades understandable."],
      ["Business revenue", "Support the tycoon loop with clear payout timing and upgrade value."],
      ["Discipline and motivation", "Reward meaningful sessions, milestones and useful progression."],
      ["Sleep / 3AM motivation", "Use sparingly as a strategic boost, not a repetitive micro-chore."],
      ["Ownership consequences", "Connect vehicle damage, repair cost and reputation without tedious punishment."],
      ["Insurance / protection", "Future risk-management layer after damage and repair work proves useful."]
    ];
    return [
      sectionHeaderHtml("Progression mechanics", "Life Systems", "Banking, business income, discipline, motivation and ownership consequences.", [{ label: "Rule", value: "No filler chores", tone: "good" }, { label: "Status", value: "Concept", tone: "warn" }]),
      '<div class="life-system-grid">' + systems.map(function (system) { return '<article class="helper-card life-system-card"><span></span><div><h3>' + system[0] + '</h3><p>' + system[1] + '</p></div></article>'; }).join("") + '</div>',
      '<article class="helper-card blueprint-guardrail"><strong>Cut rule</strong><span>No barber visits, filler errands or realism-for-realism\'s-sake unless the mechanic directly supports gameplay, economy, ownership or status.</span></article>'
    ].join("");
  }

  function founderSystemsHtml(counts, overload, risk, currentPhase, parkedTasks, neededSkills) {
    return [
      sectionHeaderHtml("Founder operations", "Founder Systems", "Skill stack, discipline, motivation, workload and weekly focus.", [{ label: "Mode", value: "Solo Founder", tone: "accent" }, { label: "Load", value: overload.overloaded ? "Overloaded" : "Controlled", tone: overload.overloaded ? "bad" : "good" }, { label: "Risk", value: risk.label, tone: risk.tone }]),
      '<section class="solo-founder-command founder-page-command">',
        '<div class="solo-founder-header"><div><span class="solo-mode-chip">Mode: Solo Founder</span><h3>Build Control</h3><p>No excuses, no uncontrolled scope, and no dependency on unavailable people.</p></div><div class="solo-risk" data-tone="' + risk.tone + '"><span>Overload risk</span><strong>' + risk.label + '</strong><small>' + risk.detail + '</small></div></div>',
        '<div class="solo-founder-grid">',
          '<article class="solo-command-card"><span>Weekly focus</span><input id="soloActiveSystem" maxlength="200" value="' + escapeHtml(helperState.solo.activeSystem) + '"></article>',
          '<article class="solo-command-card"><span>Learning blocker</span><input id="soloLearningBlocker" maxlength="200" value="' + escapeHtml(helperState.solo.learningBlocker) + '"></article>',
          '<article class="solo-command-card"><span>Current phase</span><select id="soloPhaseSelect" onchange="helperSetSoloPhase(this.value)">' + phaseOptions() + '</select></article>',
          '<article class="solo-command-card"><span>Feature load</span><strong>' + counts.active + ' active</strong><small>' + overload.slots.core + ' core · ' + overload.slots.support + ' support · ' + overload.slots.polish + ' polish</small></article>',
        '</div>',
        '<div class="solo-save-row"><span>No-excuse rule: finish the selected system before expanding scope.</span><button type="button" class="helper-button primary" onclick="helperSaveSoloState()">Save founder focus</button></div>',
        '<div class="solo-overload-warning ' + (overload.overloaded ? "danger" : "controlled") + '"><strong>' + overload.message + '</strong><span>' + (overload.overloaded ? hardTruths[0] : hardTruths[6]) + '</span></div>',
      '</section>',
      '<div class="founder-system-grid">',
        '<article class="helper-card"><span class="command-card-label">Motivation tracker</span><strong>The dream is allowed.</strong><p>The current sprint must remain small enough to finish.</p></article>',
        '<article class="helper-card"><span class="command-card-label">Parked scope</span>' + compactList(parkedTasks.map(function (task) { return task.title; })) + '</article>',
        '<article class="helper-card"><span class="command-card-label">Skills blocking the next phase</span>' + compactList(neededSkills.map(function (skill) { return skill.name + ': ' + skill.exercise; })) + '</article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">Capability building</span><h3>Solo skill tracker</h3></div><p>Evidence and exercises, not confidence alone.</p></div>',
      '<article class="helper-card solo-skills-card"><div class="solo-skills-grid">' + skillRows() + '</div></article>',
      '<details class="helper-card solo-rules-card" open><summary><div><span class="helper-section-label">Permanent principles</span><h3>Founder operating rules</h3></div><span>10 rules</span></summary>' + operatingRulesHtml() + '</details>'
    ].join("");
  }

  function roadmapHtml(currentPhase) {
    return [
      sectionHeaderHtml("Empire build path", "Roadmap", "Seven controlled phases from Foundation through Live Updates.", [{ label: "Current", value: "Phase " + currentPhase.id, tone: "accent" }, { label: "Later phases", value: "Inactive", tone: "muted" }]),
      '<div class="roadmap-current-banner"><span>Current phase</span><strong>' + currentPhase.id + ' · ' + currentPhase.name + '</strong><small>' + currentPhase.items.join(" → ") + '</small></div>',
      '<div class="solo-roadmap roadmap-page">' + soloRoadmapHtml() + '</div>'
    ].join("");
  }

  function brainHtml(next, overload) {
    var ignore = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 3);
    var blocked = tasks.filter(function (task) { return taskStatus(task.id) === "blocked"; }).slice(0, 3);
    var priorities = nextThreeActions();
    var intake = intakeProgress();
    return [
      sectionHeaderHtml("Local intelligence", "Overseer Brain", "Priorities, scope control, blockers and the recommended next action.", [{ label: "Engine", value: "Local rules", tone: "good" }, { label: "Cloud inference", value: "Off", tone: "neutral" }]),
      '<div class="brain-summary-grid">',
        '<article class="helper-card brain-priority-card"><span>Top 3 priorities</span>' + (priorities.length ? compactList(priorities.map(function (task) { return task.title; })) : emptyState("Add a feature to calculate priority.")) + '</article>',
        '<article class="helper-card brain-recommendation-card"><span>Recommended next action</span><strong>' + escapeHtml(next.title) + '</strong><p>' + escapeHtml(next.detail) + '</p></article>',
        '<article class="helper-card"><span>What to ignore</span>' + compactList(ignore.map(function (task) { return task.title; })) + '</article>',
        '<article class="helper-card"><span>What is blocked</span>' + (blocked.length ? compactList(blocked.map(function (task) { return task.title; })) : emptyState("No active blockers logged.")) + '</article>',
        '<article class="helper-card" data-tone="' + (overload.overloaded ? "bad" : "good") + '"><span>Feature load</span><strong>' + (overload.overloaded ? "Over-scoped" : "Controlled") + '</strong><p>' + overload.message + '</p></article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">Solo evaluation</span><h3>Solo Build Score</h3></div><p>Value − difficulty − dependency − maintenance risk.</p></div>',
      '<article class="helper-card solo-feature-card"><div class="solo-feature-head"><span>Feature</span><span>Score</span><span>Recommendation</span></div><div class="solo-feature-list">' + featureScoreRowsDetailed() + '</div><div class="solo-brain-questions"><strong>Overseer checks:</strong><span>Can Freddie build it alone?</span><span>Does it help the core loop?</span><span>What skill blocks it?</span><span>What is the smallest useful version?</span></div></article>',
      '<div class="overseer-intelligence-grid brain-intelligence-grid">',
        '<article id="overseerIntake" class="helper-card overseer-intake-card"><div class="overseer-card-heading"><div><span class="helper-section-label">Information intake</span><h3>Give Overseer useful context</h3><p>Everything stays in this browser.</p></div><div class="overseer-progress-ring" style="--progress:' + intake.percent + '"><strong>' + intake.percent + '%</strong><span>' + intake.answered + '/' + intake.total + '</span></div></div><div class="overseer-intake-grid">' + intakeFieldsHtml() + '</div><div class="overseer-intake-footer"><span>Local draft · not secure</span><button type="button" class="helper-button primary" onclick="helperSaveIntake()">Save information</button></div></article>',
        '<article class="helper-card overseer-prompt-card"><div class="overseer-card-heading compact"><div><span class="helper-section-label">ChatGPT prompt lab</span><h3>Build a context-rich prompt</h3><p>Review and copy manually.</p></div></div><div class="overseer-prompt-modes">' + promptModeButtons() + '</div><textarea id="overseerGeneratedPrompt" class="overseer-generated-prompt" readonly>' + escapeHtml(buildPrompt()) + '</textarea><div class="overseer-prompt-footer"><span>Nothing is transmitted automatically.</span><button type="button" class="helper-button primary" onclick="helperCopyPrompt()">Copy prompt</button></div></article>',
      '</div>'
    ].join("");
  }

  function decisionsHtml() {
    return [
      sectionHeaderHtml("Project memory", "Decisions", "Record the decision, reason, consequence and whether it is reversible.", [{ label: "Storage", value: "Local only", tone: "good" }, { label: "Sync", value: "Off", tone: "neutral" }]),
      '<article class="helper-card decision-history-card"><div class="card-heading-row"><div><span class="command-card-label">Decision log table</span><h3>Recent structured decisions</h3></div><span class="status-count">' + decisionRecords().length + ' recorded</span></div>' + decisionTableHtml() + '</article>',
      '<div class="decision-layout">',
        '<article class="helper-card decision-guide"><span>Decision format</span>' + compactList(["Decision made", "Reason", "Consequences", "Reversible or permanent", "Related feature or project", "Date reviewed"]) + '</article>',
        '<article class="helper-card decision-editor"><label for="overseerDecisions">Local decision log</label><textarea id="overseerDecisions" maxlength="8000" placeholder="Decision:\nReason:\nConsequences:\nReversible:\nRelated feature:\n">' + escapeHtml(helperState.decisions) + '</textarea><div><span>Local only · not secure · no sync</span><button type="button" class="helper-button primary" onclick="helperSaveDecisions()">Save decisions</button></div></article>',
      '</div>'
    ].join("");
  }

  function vaultHtml() {
    return [
      sectionHeaderHtml("Future Vault", "Vault", "Parked 10-year ideas, trophy checkpoints and empire-stage concepts.", [{ label: "Status", value: "Parked", tone: "muted" }, { label: "Trajectory", value: "No Ceiling", tone: "accent" }]),
      '<div class="vault-grid">',
        '<article class="helper-card"><span>Future cars / checkpoints</span>' + compactList(["Higher rarity vehicles", "Special vehicle classes", "Custom plates", "Photo-ready garage displays"]) + '</article>',
        '<article class="helper-card"><span>Parked 10-year features</span>' + compactList(["Huge custom city", "Large vehicle fleet", "Advanced body-kit ecosystem", "Deep prestige economy"]) + '</article>',
        '<article class="helper-card"><span>Studio-stage ideas</span>' + compactList(["Custom vehicle pipeline", "Seasonal events", "Live analytics", "Dedicated content team"]) + '</article>',
        '<article class="helper-card"><span>Outsourcing ideas</span>' + compactList(["High-end vehicle models", "Properly licensed audio packs", "Trailer editing", "Specialist animation polish"]) + '</article>',
        '<article class="helper-card vault-trajectory"><span>Empire trajectory</span><strong>No Ceiling</strong><p>Skill → product → cashflow → assets → trophies → empire.</p></article>',
      '</div>',
      '<article class="helper-card vault-editor"><label for="overseerVault">Local vault notes</label><textarea id="overseerVault" maxlength="8000" placeholder="Store future ideas here instead of activating them now...">' + escapeHtml(helperState.vault) + '</textarea><div><span>Parked locally · not part of the active sprint</span><button type="button" class="helper-button primary" onclick="helperSaveVault()">Save vault</button></div></article>'
    ].join("");
  }

  function detailedBlueprintHtml() {
    return [
      sectionHeaderHtml("Luxury Life Tycoon", "Game Blueprint", "Private planning blueprint for the Roblox game. This is project intelligence, not a public product page.", [{ label: "Active project", value: "Luxury Life Tycoon", tone: "accent" }, { label: "Creator Academy", value: "Tracked only", tone: "muted" }]),
      '<div class="blueprint-grid detailed-blueprint">',
        '<article class="helper-card blueprint-core"><span>Game Identity</span><h3>Luxury Life Tycoon</h3>' + definitionList(gameIdentity) + '</article>',
        '<article class="helper-card loop-flow-card"><span>Core Loop</span><div class="loop-flow">' + coreLoopSteps.map(function (step) { return '<span>' + escapeHtml(step) + '</span>'; }).join("") + '</div></article>',
        '<article class="helper-card"><span>Player progression</span>' + compactList(playerProgression) + '</article>',
        '<article class="helper-card"><span>Core risks</span>' + compactList(["Expanding before the money loop works", "Building a fleet before one car feels premium", "Adding luxury polish before server-authoritative logic", "Designing Founder City before Starter Plot is fun"]) + '</article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">World planning</span><h3>Zones and unlock logic</h3></div><p>These are private planning cards. Build only the smallest current zone first.</p></div>',
      detailCards(zoneCards, "zone-card-grid"),
      '<article class="helper-card blueprint-guardrail"><strong>Blueprint guardrail</strong><span>Do not build the city, prestige empire or dozens of vehicles before one plot, one money loop and one premium-feeling test car work cleanly.</span></article>'
    ].join("");
  }

  function detailedCarSystemsHtml() {
    return [
      sectionHeaderHtml("Vehicle systems", "Car Systems", "Deep planner for customisation, audio, interaction, damage, repair and ownership.", [{ label: "Active", value: "Vehicle Audio", tone: "accent" }, { label: "Fleet", value: "Parked", tone: "muted" }, { label: "Legal rule", value: "Approved sounds only", tone: "good" }]),
      '<details class="helper-card detail-panel" open><summary><div><span class="command-card-label">Vehicle Customisation Planner</span><h3>Minimum now, advanced later</h3></div><span>' + customisationCategories.length + ' categories</span></summary>' + detailTable(["Category", "Minimum version", "Advanced version", "Gameplay value", "Difficulty", "Monetisation potential", "Build priority"], customisationCategories, "customisation-table") + '</details>',
      '<details class="helper-card detail-panel" open><summary><div><span class="command-card-label">Vehicle Audio Planner</span><h3>Startup must play once, then idle loop starts</h3></div><span>No overlap</span></summary>' + detailTable(["State", "Purpose", "Type", "Overlap rule", "Asset quality", "Priority"], audioStates, "audio-state-table") + '<p class="detail-note">Driving loops should not restart constantly. Use volume and pitch changes instead of stacking sounds.</p></details>',
      '<details class="helper-card detail-panel"><summary><div><span class="command-card-label">Sound Profile Library</span><h3>Fictional / inspired profiles</h3></div><span>Licensing safe</span></summary>' + detailTable(["Profile", "Inspired vibe", "Audio states needed", "Customisation tie-in", "Legal / licence status"], soundProfiles, "sound-profile-table") + '</details>',
      '<details class="helper-card detail-panel"><summary><div><span class="command-card-label">Vehicle Interaction Planner</span><h3>One-car entry sequence</h3></div><span>12 steps</span></summary>' + detailTable(["Step", "Character action", "Car action", "Sound", "Camera effect", "Script state", "Possible bug"], interactionSequence, "interaction-table") + '</details>',
      '<details class="helper-card detail-panel"><summary><div><span class="command-card-label">Damage and Repair Planner</span><h3>Ownership consequences without annoying chores</h3></div><span>Selective sim</span></summary>' + detailTable(["Damage type", "Visual effect", "Gameplay effect", "Repair method", "Build priority"], damageSystems, "damage-table") + '</details>',
      '<article class="helper-card system-sequence"><span>Current recommended sequence</span><strong>One car -> enter prompt -> reliable drive -> startup sound -> idle loop -> no overlap -> one condition value -> dashboard light -> door animation placeholder</strong></article>'
    ].join("");
  }

  function detailedLifeSystemsHtml() {
    return [
      sectionHeaderHtml("Progression mechanics", "Life Systems", "Selective life simulation for banking, business, discipline, motivation and ownership consequences.", [{ label: "Bank", value: "CrownVault", tone: "accent" }, { label: "Rule", value: "No mailbox money", tone: "good" }, { label: "Chores", value: "Cut filler", tone: "muted" }]),
      '<div class="life-detail-grid">',
        '<article class="helper-card life-system-card crownvault-card"><span></span><div><h3>CrownVault banking system</h3><p>Money should flow through a banking app, physical bank, business payouts, contracts, investments later, dealership revenue, tuning shop revenue and rental income later.</p>' + focusChips(bankOptions) + '</div></article>',
        '<article class="helper-card life-system-card"><span></span><div><h3>Banking app screens</h3>' + compactList(bankingApp) + '</div></article>',
        '<article class="helper-card life-system-card"><span></span><div><h3>Discipline and motivation rules</h3>' + detailTable(["Stat", "Rule", "Effect"], disciplineRules, "discipline-table") + '</div></article>',
        '<article class="helper-card life-system-card"><span></span><div><h3>Ownership consequences</h3><p>This is selective life simulation, not boring chores.</p>' + compactList(ownershipConsequences.map(function (item) { return item[0] + ": " + item[1]; })) + '</div></article>',
      '</div>',
      '<details class="helper-card detail-panel" open><summary><div><span class="command-card-label">Business System</span><h3>Revenue and maintenance planning</h3></div><span>' + businessSystems.length + ' businesses</span></summary>' + detailTable(["Business", "Unlock condition", "Revenue type", "Upgrade path", "Related gameplay", "Risk / maintenance", "Discipline effect"], businessSystems, "business-table") + '</details>',
      '<article class="helper-card blueprint-guardrail"><strong>Cut rule</strong><span>No barber visits, filler errands or realism-for-realism&#039;s-sake unless the mechanic directly supports gameplay, economy, ownership or status.</span></article>'
    ].join("");
  }

  function detailedFounderSystemsHtml(counts, overload, risk, currentPhase, parkedTasks, neededSkills) {
    return [
      sectionHeaderHtml("Founder operations", "Founder Systems", "Freddie-specific skill stack, discipline, workload and solo-founder warnings.", [{ label: "Founder", value: "Freddie Murray", tone: "accent" }, { label: "Mason", value: "Inactive", tone: "muted" }, { label: "Load", value: overload.overloaded ? "Overloaded" : "Controlled", tone: overload.overloaded ? "bad" : "good" }]),
      '<section class="solo-founder-command founder-page-command">',
        '<div class="solo-founder-header"><div><span class="solo-mode-chip">Mode: Solo Founder</span><h3>Build Control</h3><p>Freddie is the sole active founder, developer and final approver. Mason remains inactive historical context only.</p></div><div class="solo-risk" data-tone="' + risk.tone + '"><span>Overload risk</span><strong>' + escapeHtml(risk.label) + '</strong><small>' + escapeHtml(risk.detail) + '</small></div></div>',
        '<div class="solo-founder-grid">',
          '<article class="solo-command-card"><span>Weekly focus</span><input id="soloActiveSystem" maxlength="200" value="' + escapeHtml(helperState.solo.activeSystem) + '"></article>',
          '<article class="solo-command-card"><span>Learning blocker</span><input id="soloLearningBlocker" maxlength="200" value="' + escapeHtml(helperState.solo.learningBlocker) + '"></article>',
          '<article class="solo-command-card"><span>Current phase</span><select id="soloPhaseSelect" onchange="helperSetSoloPhase(this.value)">' + phaseOptions() + '</select></article>',
          '<article class="solo-command-card"><span>Feature load</span><strong>' + counts.active + ' active</strong><small>' + overload.slots.core + ' core - ' + overload.slots.support + ' support - ' + overload.slots.polish + ' polish</small></article>',
        '</div>',
        '<div class="solo-save-row"><span>Daily build rule: ship one small testable improvement before opening new ideas.</span><button type="button" class="helper-button primary" onclick="helperSaveSoloState()">Save founder focus</button></div>',
        '<div class="solo-overload-warning ' + (overload.overloaded ? "danger" : "controlled") + '"><strong>' + escapeHtml(overload.message) + '</strong><span>' + escapeHtml(overload.overloaded ? hardTruths[0] : hardTruths[6]) + '</span></div>',
      '</section>',
      '<div class="founder-system-grid">',
        '<article class="helper-card"><span class="command-card-label">Founder Discipline</span>' + definitionList(founderDiscipline) + '</article>',
        '<article class="helper-card"><span class="command-card-label">Solo Founder Warnings</span>' + compactList(["You are solo. Build the playable loop before the empire.", "One polished car beats ten broken cars.", "Do not build luxury polish on top of a weak money loop.", "The dream is allowed. The current sprint must be small.", "If it does not help the first playable loop, park it."]) + '</article>',
        '<article class="helper-card"><span class="command-card-label">Skills blocking the next phase</span>' + compactList(neededSkills.map(function (skill) { return skill.name + ": " + skill.exercise; })) + '</article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">Freddie Skill Stack</span><h3>Evidence, next exercise and unlocked feature</h3></div><p>Default levels are local planning labels, not credentials.</p></div>',
      '<article class="helper-card solo-skills-card"><div class="solo-skills-grid">' + skillRows() + '</div></article>',
      '<details class="helper-card solo-rules-card" open><summary><div><span class="helper-section-label">Permanent principles</span><h3>Founder operating rules</h3></div><span>10 rules</span></summary>' + operatingRulesHtml() + '</details>'
    ].join("");
  }

  function detailedRoadmapHtml(currentPhase) {
    return [
      sectionHeaderHtml("Empire build path", "Roadmap", "Specific phase deliverables from Foundation to Launch Prep. Only the current phase drives execution.", [{ label: "Current", value: "Phase " + currentPhase.id, tone: "accent" }, { label: "Total phases", value: String(soloPhases.length), tone: "neutral" }]),
      '<div class="roadmap-current-banner"><span>Current phase</span><strong>' + currentPhase.id + ' - ' + escapeHtml(currentPhase.name) + '</strong><small>' + currentPhase.items.join(" -> ") + '</small></div>',
      '<div class="solo-roadmap roadmap-page">' + soloRoadmapHtml() + '</div>',
      '<article class="helper-card blueprint-guardrail"><strong>Roadmap rule</strong><span>Phase 8 is not a launch claim. It is the future checklist after the playable loop, vehicle feel, customisation starter and life systems are proven.</span></article>'
    ].join("");
  }

  function brainRecommendationCardsHtml() {
    return '<div class="brain-recommendation-grid">' + soloFeatures.map(function (feature) {
      var action = feature.action || featureRecommendation(feature);
      var tone = action === "Build Now" ? "good" : (action === "Prototype Only" || action === "Learn First" ? "warn" : "bad");
      return [
        '<article class="helper-card brain-recommendation-detail" data-tone="' + tone + '">',
          '<span>' + escapeHtml(action) + '</span>',
          '<h3>' + escapeHtml(feature.name) + '</h3>',
          '<p>' + escapeHtml(feature.reason || "") + '</p>',
          definitionList([["Build status", feature.status || "Not set"], ["Risk", feature.risk || "Not set"], ["Next action", feature.next || "Decide smallest useful version"], ["Scoring", "Value " + feature.value + ", difficulty " + feature.difficulty + ", risk " + (feature.riskScore || 0) + ", dependency " + feature.dependency + ", solo suitability " + (feature.solo || "n/a") + ", maintenance " + feature.maintenance]]),
        '</article>'
      ].join("");
    }).join("") + '</div>';
  }

  function detailedBrainHtml(next, overload) {
    var ignore = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 4);
    var blocked = tasks.filter(function (task) { return taskStatus(task.id) === "blocked"; }).slice(0, 4);
    var priorities = nextThreeActions();
    var intake = intakeProgress();
    return [
      sectionHeaderHtml("Local intelligence", "Overseer Brain", "Rule-based recommendations using value, difficulty, risk, dependency, solo suitability, maintenance and core-loop relevance.", [{ label: "Engine", value: "Local rules", tone: "good" }, { label: "Cloud inference", value: "Off", tone: "neutral" }]),
      '<div class="brain-summary-grid">',
        '<article class="helper-card brain-priority-card"><span>Top 3 priorities</span>' + (priorities.length ? soloNextActionsHtml() : emptyState("Add a feature to calculate priority.")) + '</article>',
        '<article class="helper-card brain-recommendation-card"><span>Recommended next action</span><strong>' + escapeHtml(next.title) + '</strong><p>' + escapeHtml(next.detail) + '</p></article>',
        '<article class="helper-card"><span>What to ignore</span>' + compactList(ignore.map(function (task) { return task.title; })) + '</article>',
        '<article class="helper-card"><span>What is blocked</span>' + (blocked.length ? compactList(blocked.map(function (task) { return task.title; })) : emptyState("No active blockers logged.")) + '</article>',
        '<article class="helper-card" data-tone="' + (overload.overloaded ? "bad" : "good") + '"><span>Feature load</span><strong>' + (overload.overloaded ? "Over-scoped" : "Controlled") + '</strong><p>' + escapeHtml(overload.message) + '</p></article>',
      '</div>',
      '<div class="helper-section-heading"><div><span class="helper-section-label">Recommendations</span><h3>Build now, prototype, learn, park, outsource or cut</h3></div><p>These are local planning recommendations, not cloud AI output.</p></div>',
      brainRecommendationCardsHtml(),
      '<div class="helper-section-heading"><div><span class="helper-section-label">Solo evaluation</span><h3>Solo Build Score</h3></div><p>Value - difficulty - dependency - maintenance risk, with extra dimensions shown in each row.</p></div>',
      '<article class="helper-card solo-feature-card"><div class="solo-feature-head"><span>Feature</span><span>Score</span><span>Recommendation</span></div><div class="solo-feature-list">' + featureScoreRowsDetailed() + '</div><div class="solo-brain-questions"><strong>Overseer checks:</strong><span>Can Freddie build it alone?</span><span>Does it help the core loop?</span><span>What skill blocks it?</span><span>What is the smallest useful version?</span></div></article>',
      '<div class="overseer-intelligence-grid brain-intelligence-grid">',
        '<article id="overseerIntake" class="helper-card overseer-intake-card"><div class="overseer-card-heading"><div><span class="helper-section-label">Information intake</span><h3>Give Overseer useful context</h3><p>Everything stays in this browser.</p></div><div class="overseer-progress-ring" style="--progress:' + intake.percent + '"><strong>' + intake.percent + '%</strong><span>' + intake.answered + '/' + intake.total + '</span></div></div><div class="overseer-intake-grid">' + intakeFieldsHtml() + '</div><div class="overseer-intake-footer"><span>Local draft - not secure</span><button type="button" class="helper-button primary" onclick="helperSaveIntake()">Save information</button></div></article>',
        '<article class="helper-card overseer-prompt-card"><div class="overseer-card-heading compact"><div><span class="helper-section-label">ChatGPT prompt lab</span><h3>Build a context-rich prompt</h3><p>Review and copy manually.</p></div></div><div class="overseer-prompt-modes">' + promptModeButtons() + '</div><textarea id="overseerGeneratedPrompt" class="overseer-generated-prompt" readonly>' + escapeHtml(buildPrompt()) + '</textarea><div class="overseer-prompt-footer"><span>Nothing is transmitted automatically.</span><button type="button" class="helper-button primary" onclick="helperCopyPrompt()">Copy prompt</button></div></article>',
      '</div>'
    ].join("");
  }

  function detailedVaultHtml() {
    return [
      sectionHeaderHtml("Future Vault", "Vault", "Long-term empire storage. These ideas are not current tasks and should not pollute the active sprint.", [{ label: "Status", value: "Parked", tone: "muted" }, { label: "Trajectory", value: "No Ceiling", tone: "accent" }]),
      detailCards(vaultCategories.map(function (category) { return { name: category[0], items: category[1] }; }), "vault-category-grid"),
      '<article class="helper-card vault-trajectory"><span>Empire trajectory</span><strong>No Ceiling</strong><p>Skill -> product -> cashflow -> assets -> trophies -> empire. Current sprint still stays small.</p></article>',
      '<article class="helper-card vault-editor"><label for="overseerVault">Local vault notes</label><textarea id="overseerVault" maxlength="8000" placeholder="Store future ideas here instead of activating them now...">' + escapeHtml(helperState.vault) + '</textarea><div><span>Parked locally - not part of the active sprint - not secure</span><button type="button" class="helper-button primary" onclick="helperSaveVault()">Save vault</button></div></article>'
    ].join("");
  }

  function systemFooterHtml() {
    return [
      '<footer class="overseer-system-footer">',
        '<div><span class="system-live-dot"></span><strong>Local Command Mode</strong><small>Data is stored on this device.</small></div>',
        '<ul><li>No cloud sync</li><li>No login required</li><li>Local storage active</li><li>Creator Academy tracked only</li></ul>',
      '</footer>'
    ].join("");
  }

  function renderDashboard() {
    helperState.currentView = "dashboard";
    installShell();
    var app = appRoot();
    if (!app) return;
    var next = overseerNextAction();
    var counts = taskCounts();
    var overload = overloadState();
    var risk = burnoutRisk();
    var currentPhase = soloPhases[helperState.solo.phase - 1];
    var parkedTasks = tasks.filter(function (task) { return taskStatus(task.id) === "parked"; }).slice(0, 5);
    var neededSkills = soloSkills.filter(function (skill) { return helperState.skills[skill.id] !== "Working" && helperState.skills[skill.id] !== "Confident"; }).slice(0, 4);
    var sectionHtml = "";

    if (helperState.activeSection === "command") sectionHtml = commandCenterHtml(next, counts, overload, risk);
    if (helperState.activeSection === "blueprint") sectionHtml = detailedBlueprintHtml();
    if (helperState.activeSection === "cars") sectionHtml = detailedCarSystemsHtml();
    if (helperState.activeSection === "life") sectionHtml = detailedLifeSystemsHtml();
    if (helperState.activeSection === "founder") sectionHtml = detailedFounderSystemsHtml(counts, overload, risk, currentPhase, parkedTasks, neededSkills);
    if (helperState.activeSection === "roadmap") sectionHtml = detailedRoadmapHtml(currentPhase);
    if (helperState.activeSection === "brain") sectionHtml = detailedBrainHtml(next, overload);
    if (helperState.activeSection === "decisions") sectionHtml = decisionsHtml();
    if (helperState.activeSection === "vault") sectionHtml = detailedVaultHtml();

    var commandOverview = helperState.activeSection === "command"
      ? founderTopHtml(next, counts, overload, risk, currentPhase)
      : "";
    app.innerHTML = '<section class="helper-dashboard helper-enter organised-overseer" aria-label="Overseer command system">' + commandOverview + '<main id="overseerSectionContent" class="overseer-section-content" data-section="' + helperState.activeSection + '">' + sectionHtml + '</main>' + systemFooterHtml() + '</section>';
  }

  function captureIntakeFromDom(persist) {
    intakeFields.forEach(function (field) {
      var input = document.getElementById("overseer-intake-" + field.id);
      if (input) helperState.intake[field.id] = String(input.value || "").trim().slice(0, 1200);
    });
    if (persist) writeLocalJson(INTAKE_STORAGE_KEY, helperState.intake);
  }

  function setActiveSection(sectionId) {
    helperState.activeSection = normaliseSection(sectionId);
    writeLocalText(UI_STORAGE_KEY, helperState.activeSection);
    renderDashboard();
    var section = document.getElementById("overseerSectionContent");
    if (section && typeof section.scrollIntoView === "function") {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  window.helperSetSection = setActiveSection;

  window.helperSaveDecisions = function () {
    var field = document.getElementById("overseerDecisions");
    if (!field) return;
    helperState.decisions = String(field.value || "").slice(0, 8000);
    writeLocalText(DECISIONS_STORAGE_KEY, helperState.decisions);
    showHelperToast("Local decision log saved.");
  };

  window.helperSaveVault = function () {
    var field = document.getElementById("overseerVault");
    if (!field) return;
    helperState.vault = String(field.value || "").slice(0, 8000);
    writeLocalText(VAULT_STORAGE_KEY, helperState.vault);
    showHelperToast("Future Vault saved locally.");
  };

  window.helperSaveIntake = function () {
    captureIntakeFromDom(true);
    renderDashboard();
    showHelperToast("Local project information saved. Prompt guidance updated.");
  };

  window.helperFocusIntake = function (fieldId) {
    var field = document.getElementById("overseer-intake-" + fieldId);
    if (!field) return;
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(function () { field.focus(); }, 260);
  };

  window.helperSetPromptMode = function (mode) {
    if (!promptModes[mode]) return;
    captureIntakeFromDom(false);
    helperState.promptMode = mode;
    renderDashboard();
    var prompt = document.getElementById("overseerGeneratedPrompt");
    if (prompt) prompt.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  window.helperCopyPrompt = async function () {
    captureIntakeFromDom(false);
    var prompt = buildPrompt();
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(prompt);
      } else {
        var field = document.getElementById("overseerGeneratedPrompt");
        if (!field || typeof field.select !== "function") throw new Error("Clipboard unavailable");
        field.select();
        if (!document.execCommand || !document.execCommand("copy")) throw new Error("Copy command unavailable");
      }
      showHelperToast("Prompt copied. Review it before pasting into ChatGPT.");
    } catch (error) {
      showHelperToast("Copy was unavailable. Select the prompt manually.");
    }
  };

  window.helperSaveSoloState = function () {
    var activeSystem = document.getElementById("soloActiveSystem");
    var blocker = document.getElementById("soloLearningBlocker");
    var phase = document.getElementById("soloPhaseSelect");
    if (activeSystem) helperState.solo.activeSystem = String(activeSystem.value || "").trim().slice(0, 200);
    if (blocker) helperState.solo.learningBlocker = String(blocker.value || "").trim().slice(0, 200);
    if (phase) helperState.solo.phase = Math.max(1, Math.min(soloPhases.length, Number(phase.value) || 1));
    writeLocalJson(SOLO_STORAGE_KEY, helperState.solo);
    renderDashboard();
    showHelperToast("Solo Founder focus saved on this device.");
  };

  window.helperSetSoloPhase = function (value) {
    helperState.solo.phase = Math.max(1, Math.min(soloPhases.length, Number(value) || 1));
    writeLocalJson(SOLO_STORAGE_KEY, helperState.solo);
    renderDashboard();
  };

  window.helperToggleMason = function () {
    helperState.solo.masonActive = !helperState.solo.masonActive;
    writeLocalJson(SOLO_STORAGE_KEY, helperState.solo);
    renderDashboard();
    showHelperToast(helperState.solo.masonActive ? "Mason marked manually reactivated. No tasks were assigned." : "Mason returned to inactive historical status.");
  };

  window.helperSetSkillLevel = function (skillId, level) {
    var skillExists = soloSkills.some(function (skill) { return skill.id === skillId; });
    var validLevels = ["Not assessed", "Beginner", "Learning", "Working", "Confident"];
    if (!skillExists || validLevels.indexOf(level) < 0) return;
    helperState.skills[skillId] = level;
    writeLocalJson(SKILL_STORAGE_KEY, helperState.skills);
    showHelperToast("Solo skill level saved locally.");
  };

  window.helperSetTaskStatus = function (taskId, status) {
    var exists = tasks.some(function (task) { return task.id === taskId; });
    if (!exists || VALID_TASK_STATES.indexOf(status) < 0) return;
    helperState.taskState[taskId] = status;
    writeLocalJson(TASK_STORAGE_KEY, helperState.taskState);
    renderDashboard();
    showHelperToast("Local task updated: " + status + ".");
  };

  window.helperSaveNotes = function () {
    var field = document.getElementById("helperLocalNotes");
    if (!field) return;
    helperState.notes = String(field.value || "").slice(0, 4000);
    writeLocalText(NOTES_STORAGE_KEY, helperState.notes);
    var status = document.getElementById("helperNotesStatus");
    if (status) status.textContent = "Saved on this device · not secure";
    showHelperToast("Local Overseer notes saved.");
  };

  window.helperFocusNotes = function () {
    helperState.currentView = "dashboard";
    if (!document.getElementById("helperLocalNotes")) renderDashboard();
    var field = document.getElementById("helperLocalNotes");
    if (field) {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(function () { field.focus(); }, 260);
    }
  };

  function install() {
    installShell();
    renderDashboard();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();

}());
