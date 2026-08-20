# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A dependency-free static HTML/CSS/JS site — no package.json, no build step, no bundler, no framework. Pages are plain `.html` files that link a single shared stylesheet (`styles/main.css`) and a single shared script (`js/main.js`).

## Running locally

There is no dev server or npm script. Serve the directory statically, e.g.:

    python3 -m http.server 8000

Then open `index.html` / `page1.html` / `page2.html` / `menu.html` in a browser. There are no tests and no linter configured.

## Architecture

- **No templating** — every page (`index.html`, `page1.html`, `page2.html`, `menu.html`) is a standalone HTML file. The top menu bar (logo link + theme-toggle SVG + hamburger-menu link) is duplicated verbatim across `index.html`, `page1.html`, and `page2.html`. When changing that markup, update it in all three places by hand.

- **Theme toggling is split across two mechanisms**:
  - `index.html`, `page1.html`, `page2.html` each render the theme-toggle button and load `js/main.js`, which wires the click handler, swaps the light/dark SVG icon, and persists the choice to `localStorage["theme"]`.
  - `menu.html` has no toggle button; it has its own small inline `<script>` that only reads `localStorage["theme"]` and applies/removes the `dark` class on load.
  - All pages hardcode `<body class="dark">` in the markup; JS then corrects this on `DOMContentLoaded` based on the stored preference, so there's a brief flash-of-wrong-theme by design (no build step to inline this earlier).

- **Styling** lives entirely in `styles/main.css`, keyed off `body.dark` for dark mode and a single `--accent` CSS custom property (used for links, form `accent-color`, caret color, and text selection highlight).

- **`js/main.js`** is the one shared script and currently does two unrelated things: the theme toggle logic described above, and a global `playAudio()` helper (plays `assets/audio/*.mp3`) that `page2.html` invokes on a `setInterval`. Treat it as a shared utility file, not a per-page script.

- **Navigation** is plain multi-page `<a href>` links, not client-side routing — per `index.html`'s own copy: "Avoid in-page interactions that require JavaScript in favor of multi-page navigations that rely on HTML and are enhanced with CSS view transitions (and a dash of JS if/where prudent)." Keep new features consistent with that philosophy — favor native HTML/CSS, reach for JS only where necessary.

- **Icons/manifest**: `site.webmanifest` and the favicon `<link>` tags in `index.html` reference icon paths — check these stay in sync with wherever the icon files actually live if you move them.
