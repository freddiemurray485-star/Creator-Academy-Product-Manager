/*
  Creator Academy Hub topbar scroll rail.
  Converts the topbar nav into a predictable horizontal rail when the available width is tight.
*/
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function getNav() {
    return document.querySelector(".topbar .nav-actions");
  }

  function updateRailState(nav) {
    if (!nav) return;
    var active = nav.scrollWidth > nav.clientWidth + 6;
    document.body.classList.toggle("ca-topbar-rail-active", active);
    nav.setAttribute("data-scroll-rail", active ? "active" : "idle");
    nav.setAttribute("aria-label", active ? "Main navigation. Scroll sideways to reveal more items." : "Main navigation");
  }

  function keepStartVisible(nav) {
    if (!nav || nav.dataset.caRailStartSet === "true") return;
    nav.dataset.caRailStartSet = "true";
    window.setTimeout(function () {
      try { nav.scrollLeft = 0; } catch (error) { /* ignore */ }
      updateRailState(nav);
    }, 60);
  }

  function keepFocusedItemVisible(nav) {
    if (!nav) return;
    var active = nav.querySelector('[aria-current="page"], .active, #navCourse');
    if (!active || nav.scrollWidth <= nav.clientWidth + 6) return;
    window.setTimeout(function () {
      try { active.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" }); } catch (error) { /* ignore */ }
      updateRailState(nav);
    }, 180);
  }

  function installWheelSideScroll(nav) {
    if (!nav || nav.dataset.caWheelRail === "true") return;
    nav.dataset.caWheelRail = "true";
    nav.addEventListener("wheel", function (event) {
      if (nav.scrollWidth <= nav.clientWidth + 6) return;
      var dominantVertical = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      if (!dominantVertical) return;
      event.preventDefault();
      nav.scrollLeft += event.deltaY;
    }, { passive: false });
  }

  function install() {
    var nav = getNav();
    if (!nav) return;
    keepStartVisible(nav);
    keepFocusedItemVisible(nav);
    installWheelSideScroll(nav);
    updateRailState(nav);

    window.addEventListener("resize", function () { updateRailState(nav); }, { passive: true });
    nav.addEventListener("scroll", function () { updateRailState(nav); }, { passive: true });

    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { updateRailState(nav); });
      ro.observe(nav);
    }
  }

  ready(function () {
    install();
    window.setTimeout(install, 100);
    window.setTimeout(install, 500);
    window.setTimeout(install, 1500);
  });
}());
