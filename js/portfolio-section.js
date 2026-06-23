
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
