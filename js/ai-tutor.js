(function () {
  "use strict";

  var TOKEN_KEY = "creatorAcademy.entitlementToken";
  var PLAN_KEY = "creatorAcademy.entitlementPlan";
  var FILE_MODE = window.location.protocol === "file:";

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function storageGet(key) {
    try { return localStorage.getItem(key) || ""; } catch { return ""; }
  }

  function currentContext() {
    var title = document.title || "Creator Academy Hub";
    var activeNav = document.querySelector(".active, [aria-current='page']");
    var heading = document.querySelector("h1, h2");
    return [
      "Page title: " + title,
      heading ? "Visible heading: " + heading.textContent.trim().slice(0, 180) : "Visible heading: none detected",
      activeNav ? "Active navigation: " + activeNav.textContent.trim().slice(0, 120) : "Active navigation: none detected",
      "Stored plan: " + (storageGet(PLAN_KEY) || "none")
    ].join("\n");
  }

  function createButton() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "ca-ai-button ca-ai-nav-btn";
    button.textContent = "AI Tutor";
    button.setAttribute("aria-label", "Open AI Tutor");
    button.addEventListener("click", openModal);

    var nav = document.querySelector(".topbar-modern .nav, .topbar .nav, nav, .nav-actions, .topbar-actions");
    if (nav) {
      button.classList.add("nav-btn");
      nav.appendChild(button);
    } else {
      button.classList.add("ca-ai-floating");
      document.body.appendChild(button);
    }
  }

  function appendMessage(kind, text) {
    var log = $("#caAiLog");
    if (!log) return;
    var msg = document.createElement("div");
    msg.className = "ca-ai-message " + kind;
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  function createModal() {
    if ($("#caAiBackdrop")) return;
    var backdrop = document.createElement("div");
    backdrop.id = "caAiBackdrop";
    backdrop.className = "ca-ai-modal-backdrop";
    backdrop.innerHTML = [
      '<section class="ca-ai-modal" role="dialog" aria-modal="true" aria-labelledby="caAiTitle">',
      '  <header class="ca-ai-header">',
      '    <div>',
      '      <h2 id="caAiTitle" class="ca-ai-title">AI Tutor</h2>',
      '      <p class="ca-ai-subtitle">Ask for Roblox Studio, Lua, UI, Blender, Moon Animator, VFX, publishing, or creator-business help.</p>',
      '    </div>',
      '    <button type="button" class="ca-ai-close" aria-label="Close AI Tutor">×</button>',
      '  </header>',
      '  <div id="caAiLog" class="ca-ai-log" aria-live="polite"></div>',
      '  <form id="caAiForm" class="ca-ai-form">',
      '    <div class="ca-ai-hints">',
      '      <button type="button" class="ca-ai-hint">Explain this lesson simply</button>',
      '      <button type="button" class="ca-ai-hint">Help me debug Roblox Lua</button>',
      '      <button type="button" class="ca-ai-hint">Give me a practical task</button>',
      '    </div>',
      '    <div class="ca-ai-input-row">',
      '      <textarea id="caAiInput" class="ca-ai-input" maxlength="2000" placeholder="Ask the AI tutor something..."></textarea>',
      '      <button id="caAiSend" class="ca-ai-send" type="submit">Ask</button>',
      '    </div>',
      '  </form>',
      '</section>'
    ].join("");
    document.body.appendChild(backdrop);

    $(".ca-ai-close", backdrop).addEventListener("click", closeModal);
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) closeModal();
    });
    $("#caAiForm", backdrop).addEventListener("submit", handleSubmit);
    backdrop.querySelectorAll(".ca-ai-hint").forEach(function (button) {
      button.addEventListener("click", function () {
        var input = $("#caAiInput");
        if (input) {
          input.value = button.textContent.trim();
          input.focus();
        }
      });
    });
  }

  function openModal() {
    createModal();
    var backdrop = $("#caAiBackdrop");
    if (!backdrop) return;
    backdrop.classList.add("is-open");
    if (!backdrop.dataset.seeded) {
      backdrop.dataset.seeded = "1";
      if (FILE_MODE) {
        appendMessage("system", "Local File Mode: the AI interface is visible, but real AI needs Vercel or `vercel dev` because the OpenAI API key must stay server-side.");
      } else {
        appendMessage("assistant", "Ask me what you are building or paste a Roblox Lua snippet. I will teach the method, not just dump an answer.");
      }
    }
    setTimeout(function () {
      var input = $("#caAiInput");
      if (input) input.focus();
    }, 50);
  }

  function closeModal() {
    var backdrop = $("#caAiBackdrop");
    if (backdrop) backdrop.classList.remove("is-open");
  }

  function localPreviewResponse(message) {
    var lower = message.toLowerCase();
    if (lower.includes("lua") || lower.includes("script") || lower.includes("debug")) {
      return "Local preview only — real AI runs after Vercel deploy.\n\nFor Roblox Lua debugging, use this format when asking:\n1. What the script should do\n2. The exact error/output\n3. The script snippet\n4. Where it is placed: ServerScriptService, StarterGui, Workspace, etc.";
    }
    if (lower.includes("task") || lower.includes("practical")) {
      return "Local preview only — real AI runs after Vercel deploy.\n\nPractical task format:\n- Build one small feature\n- Test it\n- Explain what each line does\n- Then improve one thing without copy-paste.";
    }
    return "Local preview only — real AI needs Vercel or `vercel dev`. After deployment, this same panel will call `/api/ai-tutor` using your server-side `OPENAI_API_KEY`.";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var input = $("#caAiInput");
    var send = $("#caAiSend");
    if (!input || !send) return;
    var message = input.value.trim();
    if (message.length < 3) return;

    appendMessage("user", message);
    input.value = "";

    if (FILE_MODE) {
      appendMessage("assistant", localPreviewResponse(message));
      return;
    }

    var token = storageGet(TOKEN_KEY);
    if (!token) {
      appendMessage("system", "AI Tutor requires signed access. Use Stripe checkout or owner access first.");
      return;
    }

    send.disabled = true;
    send.textContent = "Thinking...";
    try {
      var response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          context: currentContext(),
          entitlementToken: token
        })
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.ok) throw new Error(data.error || "AI Tutor failed.");
      appendMessage("assistant", data.answer);
    } catch (error) {
      appendMessage("system", error.message || "AI Tutor failed. Check Vercel env vars and API route logs.");
    } finally {
      send.disabled = false;
      send.textContent = "Ask";
    }
  }

  function boot() {
    if (document.querySelector(".ca-ai-button")) return;
    createButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.caOpenAiTutor = openModal;
})();
