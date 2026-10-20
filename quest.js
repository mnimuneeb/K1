/* =========================================================
   BUDDYVERSE — PAGE 7
   Question sequence + Web3Forms + closing
   Reliable navigation and submission
   ========================================================= */

(() => {
  "use strict";

  const form = document.getElementById("q-form");

  // This script only runs on the questionnaire page.
  if (!form) return;

  const steps = Array.from(
    form.querySelectorAll(".q-step")
  );

  if (steps.length === 0) {
    console.error("BuddyVerse: No question steps were found.");
    return;
  }

  const progressCount = document.getElementById(
    "q-progress-count"
  );

  const progressBar = document.getElementById(
    "q-progress"
  );

  const progressFill = document.getElementById(
    "q-progress-fill"
  );

  const progressArea = document.querySelector(
    ".q-progress-area"
  );

  const statusMessage = document.getElementById(
    "q-status-message"
  );

  const submitButton = document.getElementById(
    "q-submit"
  );

  const thanksSection = document.getElementById(
    "q-thanks"
  );

  const totalSteps = steps.length;

  let currentStep = 0;
  let isSubmitting = false;
  let isComplete = false;


  /* =======================================================
     1. LET JAVASCRIPT HANDLE VALIDATION

     Prevent native browser validation from blocking the
     submit event before our own validation can run.
     ======================================================= */

  form.noValidate = true;


  /* =======================================================
     2. HELPERS
     ======================================================= */

  function getAnswerField(step) {
    return step.querySelector(".q-answer");
  }

  function getHint(step) {
    return step.querySelector(".q-hint");
  }

  function getNextButton(step) {
    return step.querySelector(".q-next");
  }

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }


  /* =======================================================
     3. ENSURE EVERY QUESTION HAS A BACK BUTTON

     Question 1 doesn't need one.
     Questions 2–6 must have one.
     ======================================================= */

  steps.forEach((step, index) => {
    if (index === 0) return;

    let backButton = step.querySelector("[data-back]");

    // Create the button if it is missing from the HTML.
    if (!backButton) {
      const footer = step.querySelector(".q-step-footer");

      if (!footer) {
        console.error(
          `BuddyVerse: Question ${index + 1} has no footer.`
        );

        return;
      }

      backButton = document.createElement("button");

      backButton.type = "button";
      backButton.className = "q-back";
      backButton.setAttribute("data-back", "");

      backButton.innerHTML = `
        <span aria-hidden="true">←</span>
        <span>Back</span>
      `;

      // Insert Back before Next/Submit.
      footer.insertBefore(
        backButton,
        footer.firstElementChild
      );
    }
  });


  /* =======================================================
     4. SAVE ORIGINAL HELPER TEXT
     ======================================================= */

  steps.forEach((step) => {
    const hint = getHint(step);

    if (hint && !hint.dataset.originalText) {
      hint.dataset.originalText = hint.textContent.trim();
    }
  });


  /* =======================================================
     5. VALIDATION
     ======================================================= */

  function clearValidation(step) {
    const answer = getAnswerField(step);
    const hint = getHint(step);

    if (answer) {
      answer.classList.remove("q-answer--invalid");
      answer.removeAttribute("aria-invalid");
    }

    if (hint) {
      hint.classList.remove("q-hint--error");

      hint.textContent = hint.dataset.originalText || "";
    }
  }


  function showValidationError(step) {
    const answer = getAnswerField(step);
    const hint = getHint(step);

    if (!answer) return false;

    answer.classList.add("q-answer--invalid");
    answer.setAttribute("aria-invalid", "true");

    if (hint) {
      hint.classList.add("q-hint--error");

      hint.textContent =
        "↳ Add your answer before moving ahead.";
    }

    answer.focus();

    return false;
  }


  function validateStep(step) {
    const answer = getAnswerField(step);

    if (!answer || !answer.value.trim()) {
      return showValidationError(step);
    }

    clearValidation(step);

    return true;
  }


  function validateAllSteps() {
    for (let index = 0; index < totalSteps; index++) {
      const step = steps[index];

      if (!validateStep(step)) {
        showStep(index);
        return false;
      }
    }

    return true;
  }


  /* =======================================================
     6. PROGRESS INDICATOR
     ======================================================= */

  function updateProgress() {
    const currentNumber = currentStep + 1;

    if (progressCount) {
      progressCount.textContent =
        `${formatNumber(currentNumber)} / ` +
        `${formatNumber(totalSteps)}`;
    }

    if (progressFill) {
      const percentage =
        (currentNumber / totalSteps) * 100;

      progressFill.style.width = `${percentage}%`;
    }

    if (progressBar) {
      progressBar.setAttribute(
        "aria-valuenow",
        String(currentNumber)
      );
    }
  }


  /* =======================================================
     7. SHOW A QUESTION
     ======================================================= */

  function showStep(index) {
    if (index < 0 || index >= totalSteps) return;

    steps.forEach((step, stepIndex) => {
      const isCurrent = stepIndex === index;

      step.hidden = !isCurrent;

      step.classList.remove("q-step--active");

      if (isCurrent) {
        // Restart the entrance animation.
        void step.offsetWidth;

        step.classList.add("q-step--active");
      }
    });

    currentStep = index;

    updateProgress();

    const answer = getAnswerField(steps[currentStep]);

    if (answer) {
      answer.focus({ preventScroll: true });
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  }


  /* =======================================================
     8. STATUS MESSAGES
     ======================================================= */

  function showStatus(type, title, message) {
    if (!statusMessage) {
      console.error(title, message);
      return;
    }

    statusMessage.hidden = false;
    statusMessage.dataset.type = type;

    statusMessage.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    statusMessage.append(heading, paragraph);
  }


  function hideStatus() {
    if (!statusMessage) return;

    statusMessage.hidden = true;
    statusMessage.replaceChildren();
    statusMessage.removeAttribute("data-type");
  }


  /* =======================================================
     9. NEXT AND BACK NAVIGATION

     Event delegation means the automatically created
     Back buttons work without separate event listeners.
     ======================================================= */

  form.addEventListener("click", (event) => {
    const backButton = event.target.closest("[data-back]");

    if (backButton && form.contains(backButton)) {
      event.preventDefault();

      if (isSubmitting || isComplete) return;

      // Back never requires an answer.
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }

      return;
    }

    const nextButton = event.target.closest(".q-next");

    if (!nextButton || !form.contains(nextButton)) return;

    // The final button submits the form separately.
    if (nextButton.type === "submit") return;

    event.preventDefault();

    if (isSubmitting || isComplete) return;

    const step = nextButton.closest(".q-step");

    if (!step) return;

    const stepIndex = steps.indexOf(step);

    if (stepIndex === -1) return;

    if (!validateStep(step)) return;

    if (stepIndex < totalSteps - 1) {
      hideStatus();
      showStep(stepIndex + 1);
    }
  });


  /* =======================================================
     10. CLEAR VALIDATION WHILE TYPING
     ======================================================= */

  form.addEventListener("input", (event) => {
    const answer = event.target.closest(".q-answer");

    if (!answer) return;

    const step = answer.closest(".q-step");

    if (step && answer.value.trim()) {
      clearValidation(step);
    }
  });


  /* =======================================================
     11. SUCCESSFUL CLOSING
     ======================================================= */

  function showThanks() {
    // Hide every question.
    steps.forEach((step) => {
      step.hidden = true;
    });

    // Hide the progress area.
    if (progressArea) {
      progressArea.hidden = true;
    }
// Hide the opening heading and description.
const introSection = document.querySelector(".q-intro");

if (introSection) {
  introSection.hidden = true;
}

    // Update the progress text and bar safely.
    if (progressCount) {
      progressCount.textContent = "COMPLETE";
    }

    if (progressFill) {
      progressFill.style.width = "100%";
    }

    if (progressBar) {
      progressBar.setAttribute(
        "aria-valuenow",
        String(totalSteps)
      );
    }

    // Hide the submission status after success.
    // The thank-you section will be the main focus.
    hideStatus();

    // Reveal the final section.
    if (!thanksSection) {
      console.error(
        'BuddyVerse: Could not find the element with id="q-thanks".'
      );

      return;
    }

    thanksSection.hidden = false;

    thanksSection.classList.add("q-thanks--visible");

    thanksSection.setAttribute("tabindex", "-1");

    // Bring the closing into view.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });

    thanksSection.focus({ preventScroll: true });
  }


  /* =======================================================
     12. SUBMIT TO WEB3FORMS
     ======================================================= */

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting || isComplete) return;

    // Validate all six answers ourselves.
    // This also works if the form is submitted directly.
    if (!validateAllSteps()) return;

    const accessKeyField = form.querySelector(
      '[name="access_key"]'
    );

    const accessKey = accessKeyField
      ? accessKeyField.value.trim()
      : "";

    if (
      !accessKey ||
      accessKey === "YOUR_WEB3FORMS_ACCESS_KEY"
    ) {
      showStatus(
        "error",
        "Configuration required",
        "The Web3Forms access key is missing. Please check the form configuration."
      );

      return;
    }

    isSubmitting = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "TRANSMITTING...";
    }

    showStatus(
      "sending",
      "Transmission in progress",
      "Your answers are being sent. Please keep this page open."
    );

    try {
      const formData = new FormData(form);

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an unreadable response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          "Web3Forms could not confirm the submission."
        );
      }

      // Only show the closing after confirmed success.
      isComplete = true;

      showThanks();

    } catch (error) {
      console.error(
        "BuddyVerse submission error:",
        error
      );

      showStatus(
        "error",
        "Transmission failed",
        "Your answers have not been confirmed as sent. Check your internet connection and try again."
      );

      if (submitButton) {
        submitButton.disabled = false;

        submitButton.innerHTML = `
          <span>Try again</span>
          <span aria-hidden="true">↗</span>
        `;
      }

    } finally {
      isSubmitting = false;
    }
  });


  /* =======================================================
     13. INITIALIZE
     ======================================================= */

  // Hide the thank-you section until submission succeeds.
  if (thanksSection) {
    thanksSection.hidden = true;
  }

  // Start on Question 1.
  showStep(0);

})();
