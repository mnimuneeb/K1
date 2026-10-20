# 💜 BuddyVerse — An Interactive Birthday Gift

BuddyVerse is a personalized, mobile-friendly, multi-page birthday website created as a birthday gift for Kawish ("Kawi") from her friend ("Buddy").

It is designed to feel like a personal experience rather than a conventional birthday webpage. The website combines animations, interactive elements, photographs, videos, friendship memories, questions, and personal messages.

The project is built with HTML, CSS, and JavaScript. Development and editing are carried out primarily on an Android phone using Termux, with GitHub for source-code management and Netlify for deployment.

---

## 🎯 Project Goals

- Create a memorable and personal birthday experience.
- Keep the content friendly, emotional, funny, and natural without exaggeration.
- Make the website responsive and usable on mobile devices and desktops.
- Give every page its own visual identity while maintaining a coherent overall experience.
- Use animations and interactions where they improve the experience.
- Keep the code organized and manageable across multiple files.
- Make navigation convenient without revealing the entire website immediately.
- Finish with a quiet, heartfelt message focused on friendship and appreciation.
- Avoid inventing personal memories, conversations, or dates.
- Keep the project practical to develop and maintain within the available environment.

---

## 📂 Project Structure

The website consists of eight HTML pages, shared styles and scripts, page-specific resources, and media assets.

### HTML Pages

| File | Page | Purpose |
|---|---|---|
| `index.html` | Welcome | Introduces the visitor to BuddyVerse and starts the experience. |
| `celebrate.html` | Celebration | Provides the birthday celebration experience and virtual cake. |
| `gallery.html` | Gallery | Presents 18 media items celebrating Kawi turning 18. |
| `memories.html` | Memories | Presents friendship memories through screenshots, captions, and text cards. |
| `reasons.html` | Reasons Why You're Special | Presents interactive appreciation cards. |
| `message.html` | Midnight Letters | Reveals a personal letter on an ivory, paper-style card. |
| `quest.html` | A Few Questions | Presents six questions and submits the responses through Web3Forms. |
| `ending.html` | The Final Message | Closes the experience with a quiet, friendship-focused message. |

### Shared and Page-Specific Files

| File | Responsibility |
|---|---|
| `style.css` | Shared styling, typography, colors, animations, transitions, responsive behavior, and page-specific rules. |
| `script.js` | Shared JavaScript functionality, animations, and page-specific behavior. |
| `quest.css` | Styling for the questionnaire, progress indicator, buttons, and thank-you section. |
| `quest.js` | Question navigation, answer validation, progress updates, form submission, error handling, and the thank-you transition. |
| `navigation.css` | Floating navigation button, full-screen menu, active-page styling, responsive layout, focus indicators, and reduced-motion rules. |
| `navigation.js` | Menu creation, navigation unlocking, active-page detection, menu controls, video handling, focus management, and pause/resume events. |
| `ending.css` | The final page's navy editorial design, typography, layout, responsive rules, and scoped visibility styling. |
| `README.md` | Project documentation, design decisions, implementation status, and development notes. |

Each page should load the shared files and its required page-specific resources. Check the references in each HTML file when moving or renaming files.

### Media Assets

The project uses separate directories for media:

- `assets/pic/` — Photographs, birthday cards, screenshots, and other image assets.
- `assets/vid/` — Video files used throughout the website.
- `assets/aud/` — Audio files used throughout the website.

The actual photographs, screenshots, videos, and audio files are managed separately from the page structures.

---

## 🎨 Overall Design Direction

BuddyVerse uses a personalized visual style rather than a generic birthday template.

The experience combines:

- Soft colors and decorative elements.
- Page-specific layouts and typography.
- Subtle animations and transitions.
- Interactive elements where appropriate.
- A mixture of emotional and playful experiences.
- Personal messages that reflect friendship and appreciation.

Each page should maintain its own visual identity. Consistency across the website does not require every page to use the same layout, color palette, or decorative elements.

The ending page intentionally departs from the visual patterns used earlier. Its dark navy editorial design creates a quieter final moment after the interactive experience.

The website should remain readable, responsive, and practical on mobile devices, particularly because development is carried out primarily on Android.

---

## 🖥️ Page Specifications and Status

### 1. Welcome — `index.html`

**Purpose:** Introduce the visitor to BuddyVerse.

**Implementation:**
- Serves as the starting point of the website.
- Includes the welcome experience and typing animation.
- Forms the opening stage of the birthday journey.

**Status:** The page structure and introductory experience are part of the implementation. Further browser testing and refinements may still be needed.

---

### 2. Celebration — `celebrate.html`

**Purpose:** Provide a playful birthday celebration experience.

**Implementation:**
- Includes the virtual birthday cake.
- Contains interactive celebration controls.
- Uses animations and staged interactions to make the experience engaging.

**Status:** The celebration page and its interactive elements have been created. The complete experience should be checked in the browser.

---

### 3. Gallery — `gallery.html`

**Purpose:** Celebrate Kawi turning 18 through a collection of photographs and videos.

The page contains exactly 18 media items.

#### Visual direction

The page transitions from a light introduction into a dark gallery.

| Element | Color |
|---|---|
| Introduction background | `#F8F3FA` |
| Gallery background | `#17131D` |
| Lavender accent | `#C5A3FF` |
| Dusty-pink accent | `#E7B7D0` |
| Light text | `#F5EFFA` |

#### Introduction

The introductory section contains:

- Heading: `It's time for wishes`
- Subtitle: `18 for 18`
- Description: `Take a moment to stop and see what's waiting for you.`

The introduction transitions into the gallery as the visitor scrolls.

#### Layout

- Exactly 18 media items.
- One large item per row.
- Individually designed frames for photographs and videos.
- Independently removable decorative frame corners.
- Media sized to fit the available screen dimensions.
- A final call-to-action leading to `memories.html`.

#### Scroll-driven transition

When scrolling down:

1. The introduction gradually fades and moves slightly upward.
2. The background transitions from light to dark.
3. The first gallery item appears when the background is sufficiently dark.

When scrolling up:

1. The visible gallery item fades away.
2. The background transitions back toward the light introduction.
3. The introduction gradually reappears with a slight downward movement.

The transition should respond to changes in scroll direction without unnecessary jumps or animation restarts.

#### Video behavior

- Videos pause when less than 30% of the video element is visible.
- Paused videos should not automatically resume simply because they become visible again.
- Native HTML video elements are used for this behavior.

The media files themselves are managed separately from the HTML structure.

**Status:** The 18-item layout, individual frame styling, scroll-driven transition, and video visibility-based pause behavior have been implemented. Mobile responsiveness, the complete scrolling experience, and behavior on the deployed website should be verified.

---

### 4. Memories — `memories.html`

**Purpose:** Present friendship memories through screenshots, captions, and text-based cards.

The visual direction is soft, calm, and minimal, with a light-green palette and subtle botanical accents.

#### Color palette

| Element | Color |
|---|---|
| Page background | `#F1F8F0` |
| Card background | `#FAFCF8` |
| Main text | `#293B30` |
| Secondary text | `#718477` |
| Accent | `#A7C9A4` |
| Borders | `#DCE9D9` |

#### Layout

The page supports a mixture of:

- Centered screenshots with captions.
- Side-by-side screenshot and text cards.
- Reversed screenshot-and-text arrangements.
- Text-only memory cards.
- Subtle decorative details that complement the green theme.

The scrapbook-style visual treatment belongs to the Gallery page, not the Memories page.

#### Screenshot responsiveness

Screenshot containers and images must fit within their available width.

The styling is intended to ensure that:

- Images remain within their containers.
- Images scale down on smaller screens.
- Image proportions are preserved.
- Images do not create unwanted horizontal scrolling.
- Screenshot content remains usable on mobile devices.

#### Memory card scroll animation

Memory cards use a right-to-left reveal animation as the visitor scrolls down.

The animation combines:

- A gradual fade-in.
- Horizontal movement from the right toward the original position.
- A smooth transition lasting approximately 1.1 seconds.

The intended behavior is:

1. **Scrolling down:** Cards entering the viewport reveal themselves.
2. **Scrolling up:** Revealed cards remain visible.
3. **Scrolling farther up:** A card resets after passing below the viewport.
4. **Scrolling down again:** A reset card reveals itself again.

This allows visitors to revisit memories without forcing cards to disappear immediately whenever they scroll upward.

The animation respects the user's reduced-motion preference.

#### Content

The page is intended to include:

- Screenshots of selected conversations.
- Captions or descriptions accompanying screenshots.
- Text-only memories.

Personal memories should be added deliberately. Dates, conversations, and personal details must not be invented.

**Status:** The layout and scroll-triggered reveal behavior have been implemented. A malformed CSS comment affecting the card animation was corrected during debugging. The card animation and layout have been addressed; continue checking screenshot responsiveness and behavior on the target mobile browser.

---

### 5. Reasons Why You're Special — `reasons.html`

**Purpose:** Present appreciation cards highlighting qualities and moments that make Kawi special.

#### Visual direction

- Soft aesthetic.
- Decorative hearts and sparkles.
- Handwritten-style headings paired with serif typography.
- Individual card accents and backgrounds.
- A responsive layout intended for mobile devices.

#### Card interaction

Each card has two faces:

- **Front:** Displays the reason heading and a tap prompt.
- **Back:** Displays the explanation and a `Turn back` control.

The JavaScript creates the return button dynamically when initializing each card.

The implementation uses a 3D rotation to flip the card. CSS controls the two faces, their visibility, and which face can receive taps.

#### Current status

- The introductory section and reason-card structure are present.
- The basic tap-to-flip interaction is working.
- The latest CSS adjustments prioritize a working flip and correct face visibility.
- The flip currently has no noticeable animation.
- Scroll-reveal behavior is currently disabled or visually suppressed by the latest CSS overrides.
- The return-button interaction should be tested separately.
- Placeholder text still needs to be replaced with genuine, personal appreciation for Kawi.

#### Next improvements

1. Replace placeholder explanations with genuine, specific appreciation.
2. Confirm that every card can be opened and closed reliably.
3. Test the card layout and text scrolling on mobile.
4. Revisit the flip transition only after the existing interaction is stable.
5. Reintroduce scroll-reveal effects only if they do not interfere with the card faces or taps.

**Important:** Preserve the currently working card interaction when making future CSS changes. Avoid adding competing card transforms or duplicate animation rules without first checking the existing stylesheet.

---

### 6. Midnight Letters — `message.html`

**Purpose:** Reveal a personal letter in a quiet, atmospheric setting.

#### Visual direction

- Midnight-blue theme.
- Warm ivory, antique-gold, and muted-blue accents.
- Atmospheric background with subtle golden glows.
- Cormorant Garamond and Lora typography.
- A warm ivory, paper-style letter card.

#### Opening experience

The page opens with an introduction and a button inviting the visitor to reveal the letter.

When the button is clicked:

1. The introduction fades out.
2. The introduction is removed from the active layout.
3. The letter scene transitions into view.
4. The page's scroll position resets to the top.
5. The letter receives its revealed state.
6. The ending section appears after the letter reveal animation.

The introduction should not continue occupying space after it has been removed.

#### Letter and closing section

The letter is presented on a paper-style card, followed by an ending section.

The page includes:

- A link to `quest.html`.
- A link back to `reasons.html`.

The background styling also accounts for the root HTML background so that the midnight-blue theme remains consistent.

#### Accessibility and motion

- Basic keyboard accessibility is implemented.
- Reduced-motion preferences are supported.
- The letter can be read by scrolling through the page.

#### Recent layout fix

The letter's top spacing was increased so that its upper-right corner no longer sits underneath the floating navigation button.

This adjustment changes the letter scene's spacing without changing the navigation button's fixed position or the letter's reveal interaction.

#### Current status

- The midnight-blue theme and atmospheric background are implemented.
- The opening introduction and reveal button are in place.
- The introduction-to-letter transition is implemented.
- The paper-style letter card and ending section are present.
- The scrolling behavior and top-spacing issue have been addressed.
- Navigation links are in place.
- Reduced-motion support and basic accessibility behavior are implemented.

**Remaining work:** Replace the placeholder letter text with the final personal message and perform a final mobile-browser check.

---

### 7. A Few Questions — `quest.html`

**Purpose:** Give Kawi a private little sequence of questions to answer in her own words.

The page uses a dark digital-interface design with lime-green accents, subtle grid details, atmospheric orbs, and technical typography.

#### Visual direction

The page includes:

- A dark background.
- A decorative digital grid.
- Subtle background orbs.
- A scanline effect.
- Inter, Space Grotesk, and JetBrains Mono typography.
- A connection-status indicator.
- Progress information and a progress bar.
- Individual question cards and navigation controls.

#### Questionnaire

The page contains six questions and displays one question at a time.

The questions cover:

1. Something about the friendship that makes Kawi smile.
2. A moment or conversation she still remembers.
3. Something funny, unusual, or characteristic about Buddy.
4. Something they surprisingly have in common.
5. Something she may have wanted to say but has not found the right moment for.
6. A final question in the sequence.

The exact wording of all questions is maintained in `quest.html`.

#### Navigation and validation

- The visitor progresses using the Next button.
- The Back button allows revisiting previous questions.
- A progress indicator tracks the current question.
- JavaScript validates answers before allowing progression.
- Answers should remain intact when revisiting earlier questions.
- Validation errors are displayed when an answer is missing.
- The final question provides the submission control.

#### Form submission

The form uses Web3Forms.

The implementation includes:

- A Web3Forms access key.
- Submission subject and form-name fields.
- A hidden honeypot field.
- Answer fields for all six questions.
- Client-side validation.
- A submission-in-progress state.
- Error handling for failed submissions.

When submission succeeds:

1. The questions are hidden.
2. The progress indicator is hidden.
3. The introductory heading and description are hidden.
4. A dedicated thank-you section is revealed without navigating away from the page.
5. The visitor can follow the `One last little thing` link to `ending.html`.

If submission fails, an appropriate error message is displayed and the visitor should be able to try again.

#### Recent layout fix

The page's top spacing was increased to keep its header and content below the floating navigation button.

The adjustment was made in the page-specific stylesheet. The questionnaire logic and shared navigation script do not need to be changed to maintain this spacing.

#### Current status

- Six questions are implemented.
- One-question-at-a-time navigation is implemented.
- Next and Back controls are present.
- Progress tracking is implemented.
- Answer validation is implemented.
- Web3Forms submission and error handling are implemented.
- The thank-you section appears after successful submission.
- The final link to `ending.html` is present.
- The top-spacing issue has been addressed.

**Remaining checks:**

1. Test all six questions and verify that Next and Back work correctly.
2. Confirm that answers remain intact when revisiting previous questions.
3. Test successful form submission on the deployed website.
4. Confirm that failed submissions display an appropriate error.
5. Verify that the thank-you section appears only after successful submission.
6. Check the layout and interactions on a mobile browser.

---

### 8. The Final Message — `ending.html`

**Main heading:**  
`I hope life is kind to you.`

The ending page is the final destination of BuddyVerse. It is accessed through the `One last little thing` link in the thank-you section of `quest.html`.

Its design intentionally breaks away from the visual patterns used on earlier pages. It is not another scrapbook, botanical layout, appreciation-card collection, or centered hero section.

#### Visual direction

- Dark navy editorial canvas.
- Oversized typography and asymmetrical spacing.
- Restrained dusty-pink, light-green, and light-grey accents.
- Spacious, minimal composition.
- A vertical divider separating the title area from the message.
- Responsive layout for smaller screens.
- No additional buttons or interactive controls.

#### Message and purpose

The page closes the experience with a personal, friendship-focused message.

It expresses the hope that the website makes Kawi smile and wishes her happiness, good health, blessings, and good things in life.

The message ends with:

- `Keep smiling, Buddy.`
- `You deserve so much good.`

The page is intended to feel like a quiet, heartfelt closing rather than another activity the visitor must complete.

#### Implementation

- `ending.html` contains the page structure and final message.
- `ending.css` contains the page-specific visual design, typography, layout, color accents, and responsive rules.
- `style.css` is loaded for shared styles.
- Page-specific CSS is scoped under `body.ending-page` to avoid unintended changes to other pages.
- A scoped visibility override ensures the page remains visible despite the shared stylesheet's `main` fade-in rule.
- The current design does not require a separate JavaScript file.

**Status:** The layout and final message have been implemented. The final link, mobile responsiveness, and live deployment should be checked in the browser.

---

## 🧭 Shared Navigation System

The shared navigation system allows visitors to explore all eight pages after completing the initial experience.

It is implemented in `navigation.js` and `navigation.css`.

The menu is designed to remain hidden during the visitor's first journey and become available permanently after the intended final transition.

### Navigation unlocking

The navigation system follows these rules:

1. On a visitor's first-ever visit, the menu button remains hidden on every page, including `quest.html`.
2. The `One last little thing` link in `quest.html` leads to `ending.html`.
3. Following that intended link sets a session-based marker.
4. When the visitor reaches `ending.html` with that marker, navigation is unlocked.
5. The unlocked state is saved persistently using `localStorage`.
6. On subsequent visits, the menu button is visible from the beginning on every page, including `index.html` and `quest.html`.
7. Directly visiting `ending.html` does not independently unlock navigation.
8. Unlocking does not depend solely on the current URL; the intended transition from `quest.html` to `ending.html` is checked.
9. The unlocked state persists when the visitor navigates between pages or closes and reopens the website in the same browser.

The implementation uses:

- `localStorage` to remember the unlocked state.
- `sessionStorage` to identify the intended transition from `quest.html` to `ending.html`.

If browser storage is unavailable, the script handles the failure without assuming that unlocking succeeded.

### Menu design

The navigation uses a glassmorphism-style floating button and a full-screen overlay.

When opened, the overlay displays:

- The BuddyVerse title.
- Eight vertically stacked navigation links.
- Sequential page numbers from `01` to `08`.
- A dedicated close button in the top-right corner.
- Subtle transitions and visual effects.
- A distinct active state for the current page.

The menu is created dynamically by JavaScript and is not injected before navigation has been unlocked.

### Active-page highlighting

The current page is detected automatically from the page filename.

The active navigation link receives a more prominent visual treatment, including:

- Slightly larger typography.
- A clearer visual highlight.
- An accent that fits the overall design.
- A transition between active states when moving between pages.

The other links remain readable but visually less prominent.

The active state works independently of hover interactions, so it is suitable for touchscreens as well as desktop browsers.

### Opening and closing

The menu supports:

- Opening through the floating menu button.
- Closing through the dedicated close button.
- Closing with the Escape key.
- Closing through the backdrop.
- Keyboard focus management.
- Restoring focus to the menu button after closing.
- Preserving the page's scroll position.

The menu should not reset the current page or navigate away unless the visitor selects a navigation link.

### Pause and resume behavior

Opening the navigation menu temporarily pauses the underlying page experience as much as the existing implementations allow.

The shared navigation script:

- Saves references to HTML videos that are actually playing.
- Pauses those videos when the menu opens.
- Attempts to resume the videos it paused when the menu closes.
- Preserves the current page's scroll position.
- Dispatches custom events when the menu opens and closes.

The custom events are:

- `buddyverse:menu-open`
- `buddyverse:menu-close`

Page-specific JavaScript can listen for these events to pause and resume its own timers or animations.

CSS animations and transitions should be paused where practical. JavaScript-driven animations, automatic timers, and auto-advancing content may require page-specific handling.

The menu itself must remain interactive while the background page is paused.

Resumption depends on the underlying implementation. If a video or animation cannot reliably resume, the menu should still remain usable.

### Responsive behavior

The navigation is designed for mobile devices and desktop browsers.

**Mobile requirements:**

- The menu fits within the available viewport.
- All eight links remain accessible on small screens.
- The list can scroll vertically if space is insufficient.
- Buttons and links have comfortable tap targets.
- Text remains readable without horizontal scrolling.
- Opening and closing the menu does not cause unexpected page movement.
- The interface does not depend on hover interactions.
- Safe-area insets and changing mobile viewport dimensions are considered.

**Desktop requirements:**

- The overlay is correctly aligned and sized.
- The vertical list has comfortable spacing.
- Keyboard navigation works appropriately.
- Focus states remain visible.
- The overlay and transitions remain smooth.

### Accessibility and motion

The shared navigation includes:

- Accessible labels for the menu controls.
- Dialog semantics for the full-screen overlay.
- An active-page indication.
- Keyboard interaction.
- Visible focus indicators.
- Focus management when opening and closing the menu.
- Reduced-motion styling.

Animations must not prevent visitors from accessing the page links or make navigation difficult to use.

### Shared navigation status

The core navigation implementation is present.

Implemented features include:

- Dynamic menu creation.
- Eight numbered navigation links.
- Automatic current-page detection and highlighting.
- Persistent navigation unlocking.
- Session-based verification of the intended final transition.
- Video pausing and attempted resumption.
- Scroll-position preservation.
- Custom pause/resume events.
- Escape-key and backdrop closing.
- Keyboard focus management.
- Responsive styling and reduced-motion rules.

**Remaining integration checks:**

1. Confirm that both navigation files are included correctly on all eight pages.
2. Test the first-visit experience and confirm that the menu remains hidden.
3. Follow the intended final link from `quest.html` to `ending.html` and verify that navigation unlocks.
4. Confirm that the unlocked state persists across navigation and subsequent visits.
5. Test automatic active-page highlighting on every page.
6. Verify that videos pause and resume appropriately.
7. Check that the page's scroll position is preserved.
8. Test the close button, backdrop interaction, and Escape key.
9. Verify keyboard focus management and accessibility.
10. Test the overlay on small mobile screens and desktop browsers.
11. Check whether page-specific JavaScript animations and timers respond correctly to the custom pause/resume events.
12. Test the complete navigation flow on the deployed website.

---

## 📱 Responsive Design

Mobile usability is particularly important because the website is being developed primarily on an Android phone.

All pages should work on mobile devices and desktop browsers.

Important requirements:

- Avoid horizontal scrolling.
- Keep text readable on smaller screens.
- Ensure photographs and videos fit within the viewport.
- Keep interactive controls easy to tap.
- Prevent animations from interfering with navigation or reading.
- Respect reduced-motion preferences where practical.
- Test scroll-triggered behavior on mobile browsers.
- Keep screenshots within their containers.
- Ensure the Reasons cards remain readable and interactive on small screens.
- Keep the ending page's title and message readable at narrow viewport widths.
- Keep page content clear of the fixed navigation button.
- Account for safe-area insets and changing mobile viewport heights.
- Preserve natural scrolling when content extends beyond the viewport.

### Recent spacing fixes

Two pages needed additional top spacing to prevent their content from overlapping the floating navigation button.

**Message page:**
- Increased the letter scene's top spacing.
- Kept the menu button fixed in place.
- Preserved the letter reveal interaction and typography.

**Quest page:**
- Increased the page shell's top spacing.
- Kept the questionnaire content clear of the menu button.
- Preserved the existing questionnaire logic.

These adjustments should be checked again if the shared menu button's size or positioning changes.

---

## 🛠️ Technologies and Tools

### Technologies

- **HTML5** — Page structure and content.
- **CSS3** — Styling, responsive layouts, animations, and transitions.
- **JavaScript** — Interactions, validation, navigation, scroll-driven behavior, and dynamic effects.
- **Web3Forms** — Submission of the questionnaire responses.

### Development and deployment

- **Termux** — Mobile development environment.
- **Python HTTP server** — Local testing.
- **GitHub** — Source-code hosting and version control.
- **Netlify** — Website deployment.

Development should remain manageable within the available environment, with particular attention to testing and editing on Android.

---

## 🧪 Testing and Verification

A feature being implemented does not automatically mean that every aspect of its behavior has been verified.

Testing should distinguish between:

- **Implemented:** The relevant structure or functionality exists in the code.
- **Checked:** The behavior has been tested in a browser.
- **Needs verification:** The implementation exists, but the relevant behavior still needs to be confirmed.
- **Pending content:** The structure is present, but the final personal content has not been added.

### Current testing record

| Area | Current state | Further work |
|---|---|---|
| Welcome | Implemented | Continue checking the opening experience. |
| Celebration | Implemented | Check the complete celebration experience. |
| Gallery | Core layout and interactions implemented | Verify scrolling, media behavior, and mobile responsiveness. |
| Memories | Layout and reveal behavior implemented; CSS issue corrected | Continue checking screenshot layouts and mobile behavior. |
| Reasons | Basic card flipping works | Verify opening, closing, mobile layout, and any future animation changes. |
| Message | Reveal and scrolling behavior implemented; top-spacing issue addressed | Add the final letter and complete the final mobile check. |
| Quest | Six-question flow and submission logic implemented; top-spacing issue addressed | Verify answer retention, successful and failed submissions, and the complete mobile flow. |
| Ending | Layout and message implemented | Verify the final link, responsive layout, and deployed appearance. |
| Navigation | Core implementation present | Verify the complete unlocking, navigation, pause/resume, and accessibility flows. |

### Recommended final test sequence

Before considering BuddyVerse complete:

1. Test each page individually in the browser.
2. Check all internal links and confirm that they lead to the intended pages.
3. Test all interactive controls.
4. Check that animations do not block reading or interaction.
5. Test mobile layouts and natural scrolling.
6. Confirm that no page creates unwanted horizontal scrolling.
7. Test the shared navigation's first-visit and unlocked-visit behavior.
8. Test the questionnaire with both successful and unsuccessful submissions.
9. Confirm that the final message is reached through the intended flow.
10. Publish the latest files and test the deployed website.

Testing should be repeated after changes that affect shared CSS, navigation, or page-specific JavaScript.

---

## 📌 Development Principles

1. Plan a page's layout before writing its personal content.
2. Keep personal content natural, relevant, and non-repetitive.
3. Avoid unnecessary complexity.
4. Preserve existing working code when adding new features.
5. Keep shared CSS and JavaScript organized.
6. Test changes before moving on to the next major feature.
7. Ensure the website remains usable on mobile devices.
8. Respect reduced-motion preferences when implementing animations.
9. Do not treat planned features as completed until they have been implemented.
10. Clearly distinguish implemented features from features that still need testing.
11. Never invent personal memories, conversations, or dates.
12. Prefer practical solutions that are manageable within the available development environment.
13. When debugging CSS, inspect existing rules and their specificity before appending overrides.
14. Avoid changing multiple working features while fixing one isolated issue.
15. Keep a record of temporary workarounds so they can be reviewed later.
16. Give each page its own visual identity instead of repeatedly reusing the same composition.
17. Check that page-specific styles do not unintentionally affect other pages.
18. Keep shared navigation logic and styling in `navigation.js` and `navigation.css` rather than duplicating them across individual pages.
19. Test navigation unlocking separately from ordinary page navigation.
20. When integrating shared features, account for page-specific scripts, animations, and media behavior.
21. Distinguish between implemented functionality and behavior that has been verified in the browser.
22. When a fix works, document the result and avoid reintroducing the original problem through unrelated changes.
23. Keep the README synchronized with the actual project rather than leaving outdated implementation notes.
24. Add personal content only when it reflects genuine memories, appreciation, or intentions.

---

## 💜 Project Purpose

BuddyVerse is intended to be a thoughtful birthday gift built around friendship, shared experiences, and personal appreciation.

The goal is not simply to make a beautiful website, but to create an experience that feels personal to Kawi and reflects the friendship behind it.

The journey combines playful interactions, memories, appreciation, a personal letter, and questions before arriving at a quiet final message.

The final page brings the experience to a close with one simple wish:

**That life is kind to her.**
