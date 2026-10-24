/* =========================================================
   BUDDYVERSE: GLOBAL SCROLL RESTORATION
   Start pages at the top when they load or reload.
   ========================================================= */

(() => {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function resetScrollPosition() {
    window.scrollTo(0, 0);
  }

  // Reset as soon as the DOM is ready.
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      resetScrollPosition,
      { once: true }
    );
  } else {
    resetScrollPosition();
  }

  // Handle pages restored from the browser's back-forward cache.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      resetScrollPosition();
    }
  });
})();
/* ---------- Start of Actual code -----------*/
'use strict';

(() => {
  /* ---------- Configuration ---------- */

  const LINES = [
    'Hey Buddy',
    'Welcome',
    'To this small corner of the internet',
    'Curated particularly for you',
  ];

  const TIMING = {
    initialDelay: 2500,
    fade: 1000,
    typeSpeed: 70,
    holdText: 1500,
    gap: 300,
  };

  /* ---------- Helpers ---------- */

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const show = (el) => {
    void el.offsetWidth;
    el.classList.remove('fade-out');
    el.classList.add('fade-in');
  };

  const hide = (el) => {
    el.classList.remove('fade-in');
    el.classList.add('fade-out');
  };

  async function typeText(el, text) {
    for (let i = 1; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      await wait(TIMING.typeSpeed);
    }
  }

  /* ---------- Setup ---------- */

  function prepare({ circle, line }) {
    circle.style.animation = 'none';
    hide(circle);

    line.style.animation = 'none';
    line.textContent = '';
    line.setAttribute('aria-live', 'polite');
    hide(line);

    circle.appendChild(line);
  }

  /* ---------- Opening Sequence ---------- */

  async function playSequence({ circle, line }) {
    await wait(TIMING.initialDelay);

    show(circle);

    for (const [index, text] of LINES.entries()) {
      line.textContent = '';
      show(line);

      await typeText(line, text);
      await wait(TIMING.holdText);

      hide(line);
      await wait(TIMING.fade);

      if (index < LINES.length - 1) {
        await wait(TIMING.gap);
      }
    }
  }

  /* ---------- Reveal Introduction ---------- */

  async function revealIntro({ welcome, main }) {
    hide(welcome);
    show(main);

    await wait(TIMING.fade);

    welcome.hidden = true;
  }

  /* ---------- Initialization ---------- */

  async function init() {
    const els = {
      welcome: document.getElementById('welcome'),
      circle: document.getElementById('entry-animation'),
      line: document.getElementById('welcome-title'),
      main: document.querySelector('main'),
    };

    if (!els.welcome || !els.circle || !els.line || !els.main) {
      if (els.welcome) {
        els.welcome.hidden = true;
      }

      if (els.main) {
        els.main.classList.add('fade-in');
      }

      return;
    }

    prepare({
      circle: els.circle,
      line: els.line,
    });

    try {
      await playSequence(els);
    } catch (error) {
      console.error('Opening sequence failed:', error);
    } finally {
      await revealIntro(els);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* =========================================================
   BUDDYVERSE GALLERY
   Append this section to the bottom of script.js.
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Check Whether This Is the Gallery Page ---------- */

  const page = document.querySelector(".gv-gallery");

  if (!page) {
    return;
  }

  const root = document.documentElement;
  const body = document.body;

  const transitionSection = document.querySelector(
    ".gv-transition"
  );

  const intro = document.querySelector(".gv-intro");

  const firstMedia = document.querySelector(
    ".gv-transition__media"
  );

  if (!transitionSection || !intro || !firstMedia) {
    console.warn(
      "Gallery transition could not start: a required element is missing."
    );

    return;
  }

  /* ---------- Color Helpers ---------- */

  const lightColor = {
    r: 248,
    g: 243,
    b: 250
  };

  const darkColor = {
    r: 23,
    g: 19,
    b: 29
  };

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function smoothStep(value) {
    const t = clamp(value);

    return t * t * (3 - 2 * t);
  }

  function mixColor(start, end, progress) {
    const r = Math.round(
      start.r + (end.r - start.r) * progress
    );

    const g = Math.round(
      start.g + (end.g - start.g) * progress
    );

    const b = Math.round(
      start.b + (end.b - start.b) * progress
    );

    return `rgb(${r}, ${g}, ${b})`;
  }

  /* ---------- Scroll-Driven Transition ---------- */

  let animationFrameRequested = false;

  let currentProgress = 0;

  function calculateProgress() {
    const rect = transitionSection.getBoundingClientRect();

    const viewportHeight = window.innerHeight;

    /*
      The transition progresses while the sticky section
      remains pinned to the viewport.

      It is based on actual scroll position, not a timed
      animation. Scrolling backward reverses it naturally.
    */

    const scrollDistance = Math.max(
      1,
      transitionSection.offsetHeight - viewportHeight
    );

    const travelledDistance = -rect.top;

    return clamp(travelledDistance / scrollDistance);
  }

  function updateTransition() {
    animationFrameRequested = false;

    const progress = calculateProgress();

    currentProgress = progress;

    /*
      1. Background:
         Light lavender-white -> dark plum.

      2. Intro:
         Fades away and moves gently upward.

      3. First media:
         Appears late in the transition, when the background
         is already dark enough to keep it from appearing
         against the light intro background.
    */

    const backgroundProgress = smoothStep(progress);

    const backgroundColor = mixColor(
      lightColor,
      darkColor,
      backgroundProgress
    );

    root.style.setProperty(
      "--gv-background",
      backgroundColor
    );

    /*
      Intro fades away during the first 68% of the transition.

      Its movement is deliberately small, so it feels subtle
      rather than like a full slide animation.
    */

    const introProgress = smoothStep(
      progress / 0.68
    );

    const introOpacity = 1 - introProgress;

    const introMovement = -16 * introProgress;

    intro.style.opacity = introOpacity;

    intro.style.transform =
      `translateY(${introMovement}px)`;

    /*
      Do not reveal the first item until the background is
      already dark. This prevents the media from showing
      against the light background.
    */

    const mediaStart = 0.84;

    const mediaProgress = smoothStep(
      (progress - mediaStart) / (1 - mediaStart)
    );

    const mediaOpacity = mediaProgress;

    const mediaMovement = 24 * (1 - mediaProgress);

    firstMedia.style.opacity = mediaOpacity;

    firstMedia.style.transform =
      `translate(-50%, calc(-50% + ${mediaMovement}px))`;

    /*
      visibility prevents the hidden media from being
      focusable or interactive before its reveal begins.
    */

    if (mediaProgress > 0.01) {
      firstMedia.classList.add("gv-is-visible");
    } else {
      firstMedia.classList.remove("gv-is-visible");
    }

    /*
      When the intro is almost invisible, disable interaction
      with it. It becomes interactive again when scrolling up.
    */

    intro.style.pointerEvents =
      introOpacity > 0.05 ? "auto" : "none";
  }

  function requestTransitionUpdate() {
    if (animationFrameRequested) {
      return;
    }

    animationFrameRequested = true;

    window.requestAnimationFrame(updateTransition);
  }

  window.addEventListener(
    "scroll",
    requestTransitionUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestTransitionUpdate,
    { passive: true }
  );

  /* ---------- Video Playback Control ---------- */

  /*
    IMPORTANT:
    Videos must be ordinary HTML <video> elements for this
    visibility-based pause behavior to work reliably.

    When less than 30% of a video is visible, pause it.
    A paused video will NOT automatically resume when visible
    again. The viewer must press Play themselves.
  */

  const videos = document.querySelectorAll(
    ".gv-page video"
  );

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.intersectionRatio < 0.30) {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 1]
      }
    );

    videos.forEach((video) => {
      videoObserver.observe(video);
    });
  } else {
    /*
      Fallback for older browsers.

      This is less efficient than IntersectionObserver, but
      still pauses videos that are mostly outside the screen.
    */

    function checkVideoVisibility() {
      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();

        const visibleHeight = Math.max(
          0,
          Math.min(rect.bottom, window.innerHeight) -
          Math.max(rect.top, 0)
        );

        const visibleWidth = Math.max(
          0,
          Math.min(rect.right, window.innerWidth) -
          Math.max(rect.left, 0)
        );

        const totalArea = rect.width * rect.height;

        const visibleArea = visibleWidth * visibleHeight;

        const visibleRatio = totalArea > 0
          ? visibleArea / totalArea
          : 0;

        if (visibleRatio < 0.30) {
          video.pause();
        }
      });
    }

    window.addEventListener(
      "scroll",
      checkVideoVisibility,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      checkVideoVisibility,
      { passive: true }
    );
  }

  /* ---------- Initial State ---------- */

  /*
    The first frame must always start with:
    - light background
    - visible introduction
    - hidden first media item
  */

  root.style.setProperty(
    "--gv-background",
    "rgb(248, 243, 250)"
  );

  updateTransition();

  /* ---------- Optional Debugging ---------- */

  /*
    Uncomment the next line temporarily if you need to
    inspect the transition progress while testing.

    window.addEventListener("scroll", () => console.log(currentProgress));
  */

})();

/* =====================================================
   BUDDYVERSE — REASONS PAGE
   Scroll reveals + genuine 3D card flips
   ===================================================== */

(() => {
  "use strict";

  const page = document.body;

  if (!page.classList.contains("rs-page")) {
    return;
  }

  const cards = Array.from(
    document.querySelectorAll(".rs-card.rs-reveal-item")
  );

  if (!cards.length) {
    return;
  }

  /* ---------- Card Flip Interaction ---------- */

/* ---------- Minimal Card Note Interaction ---------- */

cards.forEach(card => {
  const front = card.querySelector(".rs-card__trigger");

  if (!front) {
    return;
  }

  const noteId = front.getAttribute("aria-controls");
  const note = noteId
    ? document.getElementById(noteId)
    : null;

  if (!note) {
    return;
  }

  const hint = front.querySelector(".rs-card__hint");

  let closeTimer = null;

  /* Create the return button only once. */
  let returnButton = note.querySelector(".rs-card__return");

  if (!returnButton) {
    returnButton = document.createElement("button");

    returnButton.type = "button";
    returnButton.className = "rs-card__return";
    returnButton.textContent = "Turn back ↶";

    note.appendChild(returnButton);
  }

  function openCard() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    card.classList.remove("is-closing");

    /* Reveal the note before opening the card. */
    note.hidden = false;

    /* Let the browser register its initial hidden state. */
    void note.offsetHeight;

    card.classList.add("is-open");

    front.setAttribute("aria-expanded", "true");

    if (hint) {
      hint.textContent = "Note opened";
    }
  }

  function closeCard() {
    if (!card.classList.contains("is-open")) {
      return;
    }

    card.classList.remove("is-open");
    card.classList.add("is-closing");

    front.setAttribute("aria-expanded", "false");

    if (hint) {
      hint.textContent = "Tap to open";
    }

    /*
      Allow the note to fade away before hiding it.
      The card then returns to its original height.
    */
    closeTimer = window.setTimeout(() => {
      note.hidden = true;
      card.classList.remove("is-closing");

      closeTimer = null;
    }, 210);
  }

  front.addEventListener("click", openCard);

  returnButton.addEventListener("click", closeCard);
});

  /* ---------- Respect Reduced Motion ---------- */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    return;
  }

  /* ---------- Scroll Reveal ---------- */

  page.classList.add("rs-reveal-ready");

  let lastScrollY = window.scrollY;
  let scrollDirection = "down";
  let ticking = false;

  function updateCards() {
    const viewportHeight = window.innerHeight;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();

      if (scrollDirection === "down") {
        if (
          rect.top < viewportHeight &&
          rect.bottom > 0
        ) {
          card.classList.add("rs-revealed");
        }
      }

      if (scrollDirection === "up") {
        if (rect.top >= viewportHeight) {
          card.classList.remove("rs-revealed");
        }
      }
    });

    ticking = false;
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      scrollDirection = "down";
    } else if (currentScrollY < lastScrollY) {
      scrollDirection = "up";
    }

    lastScrollY = currentScrollY;

    if (!ticking) {
      window.requestAnimationFrame(updateCards);
      ticking = true;
    }
  }

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCards);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateCards();

})();

/* =========================================================
   BUDDYVERSE — PAGE 6: BIRTHDAY MESSAGE
   ========================================================= */

(() => {
  "use strict";

  const page = document.querySelector(".msg-page");

  // Do nothing on other BuddyVerse pages.
  if (!page) {
    return;
  }

  const openButton = document.getElementById(
    "msg-open-button"
  );

  const intro = document.getElementById(
    "msg-intro"
  );

  const letter = document.getElementById(
    "msg-letter"
  );

  if (!openButton || !intro || !letter) {
    console.warn(
      "Birthday message page could not initialize."
    );

    return;
  }

  openButton.addEventListener("click", () => {
    // Prevent the letter from opening more than once.
    if (!letter.hidden) {
      return;
    }

    // Reveal the letter.
    letter.hidden = false;

    // Trigger its entrance animation.
    letter.classList.remove("msg-letter-visible");

    void letter.offsetWidth;

    letter.classList.add("msg-letter-visible");

    // Update the button's accessibility state.
    openButton.setAttribute("aria-expanded", "true");

    // Hide the introduction after opening.
    intro.hidden = true;

    // Bring the revealed letter into view.
    letter.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",

      block: "start"
    });
  });

})();
