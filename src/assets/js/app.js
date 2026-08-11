/* ==========================================================================
   stonewilliam.com — progressive enhancement only.
   Both features below are additive: with JavaScript disabled the All-work page
   shows every case study and the carousel remains a native scroll-snap list.

   Security notes:
   - No user input, no network requests, no third-party code, no eval.
   - All values read from build-time `data-` attributes authored in the repo.
   - DOM writes use textContent / classList / hidden — never innerHTML — so
     nothing here can introduce an injection sink if content later changes.
   ========================================================================== */

(function () {
  "use strict";

  /* --- All-work topic filter --------------------------------------------- */
  function initFilter() {
    var bar = document.querySelector("[data-filter]");
    var list = document.querySelector("[data-filter-list]");
    var empty = document.querySelector("[data-filter-empty]");
    if (!bar || !list) return;

    var buttons = Array.prototype.slice.call(bar.querySelectorAll("button"));
    var items = Array.prototype.slice.call(list.querySelectorAll(".work-item"));

    function apply(topic) {
      var visible = 0;

      items.forEach(function (item) {
        var topics = (item.getAttribute("data-topics") || "").split(/\s+/);
        var show = !topic || topics.indexOf(topic) !== -1;
        item.hidden = !show;
        if (show) visible++;
      });

      buttons.forEach(function (button) {
        var isActive = topic
          ? button.getAttribute("data-filter-topic") === topic
          : button.hasAttribute("data-filter-all");
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      if (empty) empty.hidden = visible !== 0;
    }

    bar.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button || !bar.contains(button)) return;
      apply(button.hasAttribute("data-filter-all") ? null : button.getAttribute("data-filter-topic"));
    });
  }

  /* --- Home carousel ----------------------------------------------------- */
  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var track = root.querySelector("[data-carousel-track]");
    var controls = root.querySelector("[data-carousel-controls]");
    var dotList = root.querySelector("[data-carousel-dots]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-carousel-slide]"));
    if (!track || slides.length < 2) return;

    // Controls are hidden in the markup so they never appear without JS.
    if (controls) controls.hidden = false;

    var dots = slides.map(function (_slide, index) {
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "carousel__dot";
      button.setAttribute("aria-label", "Go to case study " + (index + 1));
      button.addEventListener("click", function () {
        scrollToIndex(index);
      });
      li.appendChild(button);
      if (dotList) dotList.appendChild(li);
      return button;
    });

    // The track is inset by the page gutter so the next card peeks past the
    // container edge, so a slide's snap position is its offset minus that inset.
    function slideOffset(slide) {
      var inset = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
      return slide.offsetLeft - track.offsetLeft - inset;
    }

    function currentIndex() {
      var pos = track.scrollLeft;
      var closest = 0;
      var smallest = Infinity;
      slides.forEach(function (slide, index) {
        var distance = Math.abs(slideOffset(slide) - pos);
        if (distance < smallest) {
          smallest = distance;
          closest = index;
        }
      });
      return closest;
    }

    function scrollToIndex(index) {
      var clamped = Math.max(0, Math.min(slides.length - 1, index));
      track.scrollTo({
        left: slideOffset(slides[clamped]),
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }

    function prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function sync() {
      var index = currentIndex();
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
    }

    if (prev) {
      prev.addEventListener("click", function () {
        scrollToIndex(currentIndex() - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        scrollToIndex(currentIndex() + 1);
      });
    }

    var scrollTimer;
    track.addEventListener("scroll", function () {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(sync, 90);
    });
    window.addEventListener("resize", sync);

    sync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initFilter();
      initCarousel();
    });
  } else {
    initFilter();
    initCarousel();
  }
})();
