# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static site blog built with 11ty (Eleventy), generating pure HTML/CSS/JS output. Minimal JavaScript, no framework runtime. Templating removes the need to duplicate the menu across pages.

## Running locally

Install dependencies (one-time):

    npm install

Then serve with live reload during development:

    npm run dev

Or build once and serve the static output:

    npm run build
    cd _site && python3 -m http.server 8000

Then open `http://localhost:8000` in a browser. There are no tests and no linter configured.

## Architecture

- **11ty templating** — pages are `.njk` (Nunjucks) templates in `src/`. Each page's front matter specifies `title` and `layout: layout.njk`. The shared menu is defined once in `src/_includes/layout.njk`, eliminating duplication across pages.

- **Build structure**:
  - `src/` contains template files (`*.njk`)
  - `src/_includes/` contains reusable layout templates
  - `_site/` is the generated output (not committed to git)
  - `.eleventy.js` configures 11ty to pass through assets, styles, and JS unchanged

- **Theme toggling** works the same as before: `js/main.js` handles the toggle click, stores preference in `localStorage["theme"]`, and swaps the icon. All pages hardcode `<body class="dark">` initially; JS corrects this on `DOMContentLoaded`, so there's a brief flash-of-wrong-theme by design.

- **Styling** lives entirely in `styles/main.css`, keyed off `body.dark` for dark mode and a single `--accent` CSS custom property (used for links, form `accent-color`, caret color, and text selection highlight).

- **`js/main.js`** is the one shared script and currently does two unrelated things: theme toggle logic, and a global `playAudio()` helper (plays `assets/audio/*.mp3`) that `page2.njk` invokes on a `setInterval`. Treat it as a shared utility file.

- **Navigation** is plain multi-page `<a href>` links, not client-side routing — per the site's philosophy: "Avoid in-page interactions that require JavaScript in favor of multi-page navigations that rely on HTML and are enhanced with CSS view transitions (and a dash of JS if/where prudent)." Keep new features consistent with that philosophy.

- **Adding new pages**: Create a new `.njk` file in `src/`, add front matter with `title` and `layout: layout.njk`, then write your content. The menu is automatically included from the layout.
