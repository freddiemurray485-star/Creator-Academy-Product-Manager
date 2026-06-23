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
