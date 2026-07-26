# Portfolio Design System

Single source of truth for styling and structure. **Every UI change goes through these classes — never inline styles.** If a pattern doesn't exist here, add it to `styles.css` as a class, then document it here.

## 1. Tokens (`:root` in styles.css)

| Token | Value | Use |
|---|---|---|
| `--cream` | `#FAF8F4` | page background |
| `--ink` | `#1A1814` | primary text |
| `--muted` | `#7A7672` | secondary text, labels |
| `--accent` | `#C8A882` | link underlines |
| `--accent2` | `#8B6B4A` | hover states, icons, buttons |
| `--serif` | DM Serif Display | display headings (always italic) |
| `--sans` | Instrument Sans | body text |
| `--mono` | DM Mono | labels, kickers, buttons, tags |

**Brand accents** (per employer/tab): highlights `#E8C547` · clover `#78C25A` · shoplift `#DFFF2F` · elementor `#D05C95` · archive `#A09DE0`. Applied via `--tab-accent` / `--card-accent` custom properties on variant classes (`.tab-dot-clover`, `.card-shoplift`, …).

**Recurring values** (not tokenized, keep consistent): borders `rgba(26,24,20,0.10–0.18)` · card bg `rgba(255,255,255,0.62–0.7)` · radius 8px (cards) / 10px (images, buttons) / 999px (pills) · body text `14px/1.75` · section gap `28px`.

## 2. Typography scale

| Style | Spec | Class examples |
|---|---|---|
| Page name | serif italic 28px | `.header-name` |
| Case title | serif italic 30px | `.hero-banner-title` |
| Card/accordion heading | serif italic 18–20px | `.project-title`, `.case-insight summary`, `.case-icon-card h4` |
| Section label (kicker) | mono 11px uppercase, tracking 0.1em, muted | `.detail-section h3`, `.case-card h3`, `.section-label` |
| Sub-heading inside section | sans 13px semibold uppercase, 50% opacity | `.case-subhead` |
| Body | sans 14px / 1.75, ~85% opacity | `.detail-section p`, `.case-card p`, `.case-list` |
| Caption | sans 12px muted | `.case-caption` |
| UI/buttons | mono 11–12px, tracking 0.04–0.08em | `.pill`, `.back-btn`, `.tab` |

## 3. Atoms

- **`.pill`** — rounded chip (skills, tags). Wrap in `.pill-row`. Hero variant auto-styles via `.case-hero-skills .pill`.
- **`.case-subhead`** — `<h4 class="case-subhead">` sub-heading inside a `.detail-section`.
- **`.case-caption`** — `<figcaption>` under images.
- **`.case-list`** — styled `<ul>`; `<strong>` inside gets full ink.
- **`.detail-img`** — every content image. Full width, rounded, bordered, click-to-zoom (lightbox is automatic via delegated listener).
- **`.card-img`** — project-card thumbnail (16:9 cover). Add **`.card-img-contain`** for logos that must not crop.
- **`.back-btn` / `.next-btn`** — nav buttons (injected by JS, don't hand-write beyond the seed `.back-btn`).
- **`.case-icon`** — 40px icon tile inside `.case-icon-card`, holds one Phosphor `<i class="ph ph-NAME">`.

**Phosphor icons:** loaded from CDN (`<head>`). ⚠️ A wrong `ph-*` name renders an EMPTY box with no error. Only use names verified at https://phosphoricons.com (e.g. `ph-timeline` does NOT exist; `ph-path` does). Verify new names in the browser: `getComputedStyle(el,'::before').content` must be a glyph, not `"none"`.

## 4. Components (copy-paste snippets)

### Case summary (two cards, top of case study)
```html
<div class="case-summary">
  <div class="case-card"><h3>TL;DR</h3><p>…</p></div>
  <div class="case-card"><h3>My role included</h3><ul class="case-list"><li>…</li></ul></div>
</div>
```
Use `.case-stack` instead of `.case-summary` for one full-width card (e.g. Outcome box).

To stack two cards in one `.case-summary` column (e.g. Background + Outcome on the left, role on the right), wrap them in **`.case-col`**:
```html
<div class="case-summary">
  <div class="case-col">
    <div class="case-card"><h3>Background</h3><p>…</p></div>
    <div class="case-card"><h3>Outcome</h3><p>…</p></div>
  </div>
  <div class="case-card"><h3>My role included</h3>…</div>
</div>
```

### Meta grid (3 fact tiles)
```html
<div class="case-meta-grid">
  <div class="case-meta-card"><h3>Release date</h3><p>…</p></div>
  <div class="case-meta-card"><h3>Users</h3><p>…</p></div>
  <div class="case-meta-card"><h3>Team</h3><p>…</p></div>
</div>
```

### Text section
```html
<div class="detail-section">
  <h3>Section label</h3>
  <p>…</p>
  <h4 class="case-subhead">Optional sub-heading</h4>
  <ul class="case-list"><li>…</li></ul>
</div>
```

### Figure
```html
<figure class="case-figure">
  <img class="detail-img" src="https://freight.cargo.site/t/original/i/HASH/NAME.png" alt="…">
  <figcaption class="case-caption">…</figcaption>
</figure>
```
Images live on the Cargo CDN: `https://freight.cargo.site/t/original/i/<hash>/<filename>` (use `/w/1500/q/75/` variant for card thumbnails). Row of 3 small figures: wrap in `.case-img-row`.

### Numbered accordion (challenges / learnings)
```html
<div class="case-numbered">
  <details class="case-insight" open>  <!-- first one open -->
    <summary>1. Headline that carries the point</summary>
    <ul class="case-list"><li>…</li></ul>   <!-- or <p>…</p> -->
  </details>
</div>
```

### Icon card grid (affected areas / research methods / next steps)
```html
<div class="case-icon-grid">
  <div class="case-icon-card">
    <div class="case-icon" aria-hidden="true"><i class="ph ph-user-plus"></i></div>
    <h4>Title</h4>
    <p>One-liner.</p>
  </div>
</div>
```
**Compact variant** — add `.case-icon-grid-compact` for 3-across, smaller cards. Use for short labels. The `<p>` may be omitted entirely (title-only cards); `.case-icon-card h4:last-child` drops the trailing margin automatically.
```html
<div class="case-icon-grid case-icon-grid-compact">
  <div class="case-icon-card">
    <div class="case-icon" aria-hidden="true"><i class="ph ph-target"></i></div>
    <h4>Short label</h4>
  </div>
</div>
```
Don't invent descriptions just to fill a card — a title-only card is better than fabricated prose. If one list item is a catch-all ("various improvements"), make it a closing sentence instead of a card.

### Callout (highlighted note)
`<div class="case-callout"><h3>…</h3><p>…</p></div>` — yellow tinted box.

### Project card (grids on tab panels)
```html
<div class="project-card card-shoplift" onclick="openDetail('ID')">
  <img class="card-img" src="…" alt="…" loading="lazy">
  <div class="card-body">
    <div class="project-tag">Company · Type</div>
    <div class="project-title">Title</div>
    <div class="project-desc">One-liner</div>
  </div>
  <div class="project-arrow">↗</div>
</div>
```

## 5. Case study page template (canonical order)

```
detail-view#detail-ID
├─ button.back-btn            (seed; JS replaces with back/next nav)
├─ .hero-banner.hero-shoplift (label + title + .case-hero-skills pills)
├─ figure cover image
├─ .case-summary              (TL;DR + role)
├─ .case-stack Outcome box    (optional, metrics up top)
├─ .case-meta-grid            (date / users / team)
├─ sections + figures, each image right after its section
├─ .case-thanks "Thank you!"  (JS inserts "Continue exploring" before it)
```

Hero variants: `.hero-shoplift`, `.hero-elementor`, `.hero-clover`, `.hero-other`, `.hero-reporting` (all white bg currently; the class names the brand for future theming).

## 6. Navigation architecture (the fragile part — read before touching)

Four nav UIs share state, all keyed by `data-tab` and synced by `updateActiveNavigation()` in script.js:
1. **`.tabs`** — desktop folder tabs (top).
2. **`.side-project-nav`** — desktop floating side pills, appears when scrolled inside a project (`project-mode` + `project-scrolled`, hidden when `side-nav-collapsed`).
3. **`.mobile-project-nav`** — floating top bar, only shows on mid-width desktop when the side nav doesn't fit (scrolled + collapsed). Killed entirely on ≤700px.
4. **`.mobile-burger-menu`** — ≤700px header burger. On mobile, `.tabs` is `display:none !important`.

State classes on `#mainFolders`: `project-mode` (a case study is open) · `project-scrolled` (scrolled past threshold) · `side-nav-collapsed` (no room / mobile). Set by `syncProjectTabMode()` on scroll/resize. **Any tab-behavior change must be checked in all three widths: >~1200px, 701–1200px, ≤700px.**

Routing: hash-based. `#TAB`, `#project-ID`, `#about`, `#contact` → `routeFromHash()`. New page = add to `projectIds`, `projectTabMap`, `projectRecommendations`, `projectCatalog` (script.js top) + a `detail-` div (index.html).

## 7. CSS gotchas (real bugs that have happened here)

**`:last-child` resets outrank component rules.** `.detail-section p:last-child { margin-bottom: 0 }` is specificity (0,2,1); `.case-insight p` is (0,1,1) — so the reset silently killed the accordion's bottom padding. Any component rule for a `<p>` inside `.detail-section` or `.case-card` must also carry `:last-child` to compete:
```css
.case-insight p, .case-insight p:last-child { margin: 0 18px 18px; }
```
Only bulleted accordions were unaffected (they use `.case-list`), which is why it showed on one page and not another. **When a spacing change "doesn't apply", check for a `:last-child` reset before adding `!important`.**

**Modifier classes must come after the base class in the file.** `.card-img-contain` was defined before `.card-img`, so `object-fit: cover` won and logos cropped. Same specificity = source order decides.

**A missing rule looks like a broken rule.** `.case-card p + h3` had spacing but `.case-card .case-list + h3` didn't exist, so headings after a list sat flush. Check the actual adjacent-sibling combination, not just the element.

**Check the mobile block.** `@media (max-width: 700px)` at the bottom of styles.css overrides several grids. A desktop change that "doesn't work" may be shadowed there — and the preview viewport is often ~660px wide, which is already inside the breakpoint. Verify width with `window.innerWidth` before diagnosing a layout bug.

## 8. Rules

1. **No inline `style=`** (exceptions: form honeypots).
2. New styles = class in styles.css + entry here.
3. Reuse an existing component before inventing one.
4. Copy tone: professional, first-person, plain; headlines carry the point (skimmable).
5. Verify Phosphor icon names render (see §3).
6. Emoji allowed in content copy, not in section labels.
7. After edits: sync to preview (`cp index.html styles.css script.js /tmp/portfolio-preview/`) and verify in browser before claiming done.
