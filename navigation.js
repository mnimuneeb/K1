/*=========================================================
   BUDDYVERSE — SHARED NAVIGATION
   Automatic page detection, unlocking, and menu controls
   ========================================================= */

(() => {
  "use strict";

  const STORAGE_KEY = "buddyverseNavigationUnlocked";
  const ENDING_GATE_KEY = "buddyverseReachedEndingFromQuest";

  const PAGES = [
    {
      file: "index.html",
      title: "Welcome"
    },
    {
      file: "celebrate.html",
      title: "Celebration"
    },
    {
      file: "gallery.html",
      title: "Gallery"
    },
    {
      file: "memories.html",
      title: "Memories"
    },
    {
      file: "reasons.html",
      title: "Reasons Why You're Special"
    },
    {
      file: "message.html",
      title: "Wishes"
    },
    {
      file: "quest.html",
      title: "A Few Questions"
    },
    {
      file: "ending.html",
      title: "The Final Message"
    }
  ];

  const currentFile = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  const isEndingPage = currentFile === "ending.html";
  const isQuestPage = currentFile === "quest.html";

  /*
    The menu unlocks only when the visitor follows the intended
    link from quest.html to ending.html.

    The session marker is set on the quest page and consumed
    on the ending page. Direct visits to ending.html do not
    create the marker.
  */

  try {
    if (
      isEndingPage &&
      sessionStorage.getItem(ENDING_GATE_KEY) === "yes"
    ) {
      localStorage.setItem(STORAGE_KEY, "yes");
      sessionStorage.removeItem(ENDING_GATE_KEY);
    }
  } catch (error) {
    console.warn("BuddyVerse navigation storage is unavailable.", error);
  }

  function isUnlocked() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "yes";
    } catch (error) {
      return false;
    }
  }

  /*
    Identify the intended final link by its destination and
    its visible wording, rather than relying on a fragile ID.
  */

  if (isQuestPage) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");

      if (!link) {
        return;
      }

      let destination;

      try {
        destination = new URL(link.href, window.location.href);
      } catch (error) {
        return;
      }

      const leadsToEnding =
        destination.pathname.split("/").pop().toLowerCase() ===
        "ending.html";

      const linkText = (link.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

if (
      leadsToEnding &&
      linkText.includes("one last little thing")
    ) {
      try {
        localStorage.setItem(STORAGE_KEY, "yes");
      } catch (error) {
        console.warn("Could not unlock BuddyVerse navigation.");
      }
    }
  });
}
  /*
    Don't inject a menu before the final page has been reached.
    The current page still loads the shared script normally.
  */

  if (!isUnlocked()) {
    return;
  }

  if (!document.body) {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }

  function initialize() {
    if (document.getElementById("bv-nav-overlay")) {
      return;
    }

    const currentPage = PAGES.find(
      (page) => page.file.toLowerCase() === currentFile
    );

    if (!currentPage) {
      console.warn(
        "BuddyVerse navigation: current page is not in the page list:",
        currentFile
      );

      return;
    }

    /* ---------- Create Floating Button ---------- */

    const menuButton = document.createElement("button");

    menuButton.type = "button";
    menuButton.className = "bv-menu-button";
    menuButton.id = "bv-menu-button";
    menuButton.hidden = false;

    menuButton.setAttribute("aria-haspopup", "dialog");
    menuButton.setAttribute("aria-controls", "bv-nav-overlay");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open BuddyVerse menu");

    menuButton.innerHTML = `
      <span class="bv-menu-icon" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span>MENU</span>
    `;

    /* ---------- Create Overlay ---------- */

    const overlay = document.createElement("div");

    overlay.className = "bv-nav-overlay";
    overlay.id = "bv-nav-overlay";
    overlay.hidden = true;

    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "bv-nav-heading");

    overlay.innerHTML = `
      <header class="bv-nav-header">
        <div class="bv-nav-brand">
          <span class="bv-nav-brand-name" id="bv-nav-heading">
            BUDDYVERSE
          </span>

          <span class="bv-nav-brand-note">
            your little corner of the internet
          </span>
        </div>

        <button
          type="button"
          class="bv-nav-close"
          id="bv-nav-close"
          aria-label="Close navigation menu"
        >
          &times;
        </button>
      </header>

      <div class="bv-nav-content">
        <p class="bv-nav-eyebrow">Take your time · Go anywhere</p>

        <nav aria-label="BuddyVerse pages">
          <ol class="bv-nav-list" id="bv-nav-list"></ol>
        </nav>
      </div>

      <footer class="bv-nav-footer">
        Made with care, just for you ♡
      </footer>
    `;

    const list = overlay.querySelector("#bv-nav-list");

    PAGES.forEach((page, index) => {
      const item = document.createElement("li");
      item.className = "bv-nav-item";

      const link = document.createElement("a");

      link.className = "bv-nav-link";
      link.href = page.file;

      if (page.file.toLowerCase() === currentFile) {
        link.setAttribute("aria-current", "page");
      }

      const number = document.createElement("span");
      number.className = "bv-nav-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const title = document.createElement("span");
      title.className = "bv-nav-title";
      title.textContent = page.title;

      const arrow = document.createElement("span");
      arrow.className = "bv-nav-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";

      link.append(number, title, arrow);
      item.appendChild(link);
      list.appendChild(item);
    });

    document.body.append(menuButton, overlay);

    const closeButton = overlay.querySelector("#bv-nav-close");

    /* ---------- State ---------- */

    let isOpen = false;
    let previousScrollY = 0;
    let previouslyFocusedElement = null;
    let pausedVideos = [];

    const pageContent = Array.from(document.body.children).filter(
      (element) =>
        element !== menuButton &&
        element !== overlay &&
        element.tagName !== "SCRIPT"
    );

    /*
      Mark page content for CSS animation pausing.
      The menu itself is excluded so it remains interactive.
    */

    pageContent.forEach((element) => {
      element.classList.add("bv-nav-pause-target");
    });

    /* ---------- Pause and Resume ---------- */

    function pausePageExperience() {
      previousScrollY = window.scrollY;
      document.documentElement.classList.add("bv-nav-open");
      document.body.classList.add("bv-nav-open");

      /*
        Save only videos that were actually playing.
        Only those videos will be resumed after closing.
      */

      pausedVideos = Array.from(document.querySelectorAll("video"))
        .filter((video) => !video.paused && !video.ended);

      pausedVideos.forEach((video) => {
        try {
          video.pause();
        } catch (error) {
          // A single video must not prevent the menu opening.
        }
      });

      /*
        Other scripts may listen for these events to pause
        timers or JavaScript-driven animations.
      */

      document.dispatchEvent(
        new CustomEvent("buddyverse:menu-open")
      );
    }

    function resumePageExperience() {
      document.documentElement.classList.remove("bv-nav-open");
      document.body.classList.remove("bv-nav-open");

      /*
        Restore the visitor's original scroll position.
      */

      window.scrollTo({
        top: previousScrollY,
        left: 0,
        behavior: "auto"
      });

      /*
        Resume videos that this menu paused.
        A video that fails to resume will remain paused.
      */

      pausedVideos.forEach((video) => {
        if (!video.isConnected || video.ended) {
          return;
        }

        const result = video.play();

        if (result && typeof result.catch === "function") {
          result.catch(() => {
            // Browser autoplay restrictions may prevent resuming.
          });
        }
      });

      pausedVideos = [];

      document.dispatchEvent(
        new CustomEvent("buddyverse:menu-close")
      );
    }

    /* ---------- Open ---------- */

    function openMenu() {
      if (isOpen) {
        return;
      }

      isOpen = true;
      previouslyFocusedElement = document.activeElement;

      pausePageExperience();

      overlay.hidden = false;
      menuButton.setAttribute("aria-expanded", "true");

      menuButton.setAttribute("aria-label", "Close BuddyVerse menu");

      closeButton.focus({
        preventScroll: true
      });
    }

    /* ---------- Close ---------- */

    function closeMenu({ restoreFocus = true } = {}) {
      if (!isOpen) {
        return;
      }

      isOpen = false;

      overlay.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");

      menuButton.setAttribute("aria-label", "Open BuddyVerse menu");

      resumePageExperience();

      if (
        restoreFocus &&
        previouslyFocusedElement &&
        previouslyFocusedElement.isConnected
      ) {
        previouslyFocusedElement.focus({
          preventScroll: true
        });
      } else {
        menuButton.focus({
          preventScroll: true
        });
      }

      previouslyFocusedElement = null;
    }

    /* ---------- Events ---------- */

    menuButton.addEventListener("click", () => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeButton.addEventListener("click", () => {
      closeMenu();
    });

    /*
      Close only when the actual backdrop is clicked.
      Clicking a link or another overlay element won't close it.
    */

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      /*
        Keep keyboard focus inside the open dialog.
      */

      if (event.key === "Tab") {
        const focusable = Array.from(
          overlay.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => {
          return (
            !element.hidden &&
            element.getAttribute("aria-hidden") !== "true"
          );
        });

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    /*
      If the visitor leaves the page while the menu is open,
      don't leave the current document frozen.
    */

    window.addEventListener("pagehide", () => {
      if (isOpen) {
        document.documentElement.classList.remove("bv-nav-open");
        document.body.classList.remove("bv-nav-open");
      }
    });
  }
})();
