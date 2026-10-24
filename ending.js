"use strict";

(() => {
  const page = document.querySelector(".ending-page");

  if (!page) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    return;
  }

  page.classList.add("ending-motion-ready");
})();
