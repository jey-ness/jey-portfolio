# Jey's Portfolio — working notes for Claude

Static SPA, no build step. 3 files: `index.html` (all content), `styles.css`, `script.js`. Deploys from `main` via GitHub Pages → jey-ness.github.io/jey-portfolio. Live copy source: https://jeyness.com (Cargo site — case-study text/images originate there).

**Before any UI/styling work: read `DESIGN-SYSTEM.md`.** It has tokens, component snippets, the case-study template, and the navigation state machine. Use its classes; never inline styles.

## Find things fast (grep anchors, don't scan the file)

- A case study: `grep -n 'id="detail-SLUG"' index.html` — slugs: reporting, urlbeta, testcreation, pricing (shoplift) · dinerprofiles (clover) · dsm, experts, playground, redesign (elementor) · andco, storemaven, eshel, argaz, doodles, kinder, ifever (archive).
- Tab panels/cards: `id="panel-TAB"` (highlights, clover, shoplift, elementor, archive).
- Project registry (nav/cards/recommendations): top of `script.js` — `projectIds`, `projectTabMap`, `projectRecommendations`, `projectCatalog`.
- About/contact: `id="aboutView"`, `id="contactView"`. Modals: `confirmationModal`, `imageLightbox`.
- A CSS class: it appears exactly once in `styles.css`; grep the class name.

## Common tasks

- **Edit case-study copy**: grep the detail id, edit in place using DESIGN-SYSTEM.md components. Image order should mirror jeyness.com's page for that project.
- **New case study**: copy an existing `detail-*` div; register the slug in the 4 script.js structures; add a project card to its panel.
- **Global style change**: one class in styles.css. Check it isn't overridden inside the `@media (max-width: 700px)` block at the bottom.
- **A style change that "has no effect"**: read DESIGN-SYSTEM.md §7 before reaching for `!important` — a `:last-child` reset, modifier source-order, or the mobile block is usually the cause.
- **Tab/nav behavior**: read DESIGN-SYSTEM.md §6 first — 4 synced nav UIs; test >1200px, 701–1200px, and ≤700px.

## Preview workflow (sandbox quirks — don't rediscover these)

- Server: `preview_start {name: "portfolio"}` → http://localhost:4322. Config in `.claude/launch.json` runs `/tmp/portfolio-serve.py`, which serves **`/tmp/portfolio-preview/`** (the sandboxed Python can't read `~/Documents`, and 3.9's `--directory` flag crashes — the wrapper script exists for a reason).
- If the server errors about missing files: recreate `/tmp/portfolio-serve.py` (subclass `SimpleHTTPRequestHandler` with `directory=`, PORT from env) and `mkdir -p /tmp/portfolio-preview`.
- **After every edit**: `cp index.html styles.css script.js /tmp/portfolio-preview/` — the preview does NOT track the repo.
- Verify in browser: `openDetail('SLUG')` / `switchTab('TAB')` in the console, then screenshot. Window scrolls the page (detail views don't scroll internally). A reload resets to `#highlights` routing from the hash.

## Conventions

- Commit style: `Scope: what changed` (e.g. `Pricing: add outcome box`). Push only when asked.
- Copy edits: keep the user's voice; fix spelling/grammar silently; headlines should carry the point for skimmers.
- Scope changes to the section the user pointed at — don't propagate a wording change to other sections uninvited.
- Phosphor icons: verify the `ph-*` name exists before shipping (empty-box failure is silent; see DESIGN-SYSTEM.md §3).
- Images: Cargo CDN URLs (`freight.cargo.site/t/original/i/<hash>/<file>`). Get hashes from jeyness.com DOM (`img[data-src]`), not by guessing.
