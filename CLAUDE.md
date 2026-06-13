# Ars Mathematica — Project Diagnosis & Fix Plan

## 1. Project Overview

**Site:** [ro-smtz.github.io/ars-mathematica](https://ro-smtz.github.io/ars-mathematica)  
**Stack:** Astro 6.4, static output, GitHub Pages  
**Language:** Spanish (es-MX)  
**Purpose:** Educational platform for scientific visualization with LaTeX — courses, tutorials, figures, and resources, associated with the Instagram account @ars_mathematica.

---

## 2. Project Structure

```
src/
  components/           # UI components
    Header.astro        # Site header — imported once in BaseLayout
    Footer.astro        # Site footer — imported once in BaseLayout
    CourseCard.astro    # Card for course listing
    NewsCard.astro      # Card for news entries
    CodeCard.astro      # Card for code resources
    FeatureCard.astro   # Card for homepage feature links
    InstructorCard.astro  # Instructor bio block (extracted from [id].astro)
    AboutHero.astro     # About page hero
    EnConstruccion.astro  # Under construction placeholder
  content/              # Markdown content collections
    courses/            # One .md per course
    figures/            # Featured LaTeX figures
    news/               # News/updates entries
    resources/          # Downloadable resources
    tutorials/          # Tutorial entries
    pages/              # Static pages (e.g. sobre.md)
  layouts/
    BaseLayout.astro    # Master HTML shell — includes Header and Footer
  pages/                # Astro file-based routing
    index.astro
    cursos.astro
    cursos/[id].astro
    figuras.astro
    noticias.astro
    recursos.astro
    recursos/codigos-completos.astro
    sobre.astro
    tutoriales.astro
  styles/
    global.css          # Entry point — imports only
    _tokens.css         # CSS variables (colors, fonts)
    _base.css           # Reset, body, typography, blockquote
    _layout.css         # .container, .page, .section-title, .features
    _header.css         # header, .nav, .brand, nav
    _footer.css         # footer, .footer-inner, .footer-links
    _home.css           # .hero, .manifiesto, .figuras-*, .instagram-*
    _courses.css        # .cursos-*, .family-*, .course-*, .pricing-*, .instructor-*
    _news.css           # .news-home, .news-entry, .news-*
    _resources.css      # .codes-grid, .code-card, .tags-cloud, .resource-*
    _utils.css          # .ver-todas, .en-construccion, .back-link, .about-hero
    _responsive.css     # All @media (max-width: 768px) rules
  utils/
    asset.ts            # Path helper for base URL
    families.ts         # Course family definitions (key, label, description)
public/
  images/               # Static assets (PNGs, SVGs)
    courses/            # Course thumbnail images only (.tex/.pdf are gitignored)
    figures/
    resources/
  logo.svg
  logo_complete.svg
```

### Content Collections (defined in `src/content.config.ts`)

| Collection | Key fields |
|---|---|
| `courses` | `title`, `code`, `family`, `level`, `status` (open/coming-soon/archived), `pricing[]`, `cta_link` |
| `figures` | `title`, `description`, `image`, `instagram`, `github`, `tutorial` |
| `news` | `title`, `date`, `kind`, `tags`, `link`, `linkLabel` |
| `resources` | `title`, `image`, `date`, `category`, `tags`, `link` |
| `tutorials` | `title`, `summary`, `image` |
| `pages` | untyped (raw Markdown) |

### Key Utilities

**`src/utils/asset.ts`** — resolves paths relative to the GitHub Pages base URL:

```typescript
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function asset(path: string): string {
  return `${base}${path.startsWith("/") ? path : "/" + path}`;
}
```

**Rule:** every internal link (`href`) and every `public/` asset (`src`) must go through `asset()`. Never use bare `/path` strings — they will 404 in production because the site lives at `/ars-mathematica/`, not `/`.

**`src/utils/families.ts`** — course family definitions, imported by `cursos.astro`:

```typescript
export interface Family {
  key: string;
  label: string;
  description: string;
}

export const families: Family[] = [
  { key: "escritura", label: "LaTeX", description: "..." },
  { key: "tikz", label: "TikZ", description: "..." },
  { key: "pgfplots", label: "PGFPlots", description: "..." },
  { key: "especialidades", label: "Especialidades", description: "..." },
];
```

---

## 3. Configuration

### `astro.config.mjs`
```js
export default defineConfig({
  site: "https://ro-smtz.github.io",
  base: "/ars-mathematica",
  // output: 'static' is implicit
});
```

### `deploy.yml` (GitHub Actions)
- Triggers on push to `main`
- Node 22, `npm install`, `astro build`
- Uploads `./dist` via `actions/upload-pages-artifact@v3`
- Deploys via `actions/deploy-pages@v4`
- ✅ Correct and modern — no issues.

---

## 4. Diagnosis & Fix Log

All 10 issues identified in the initial diagnosis have been resolved.

### ✅ Priority 1 — Correctness Bugs (all fixed)

| ID | Issue | Fix applied |
|---|---|---|
| P1.1 | Favicon used bare `/logo.svg` — 404 in production | `asset("/logo.svg")` in `BaseLayout.astro` |
| P1.2 | `Astro.redirect("/cursos")` used bare path | `Astro.redirect(asset("/cursos"))` |
| P1.3 | `NewsCard` internal link used raw `base` | Replaced with `asset(entry.data.link)` |

### ✅ Priority 2 — Architecture & Maintainability (all fixed)

| ID | Issue | Fix applied |
|---|---|---|
| P2.1 | `<Header />` manually placed in every page | Moved to `BaseLayout.astro`; removed from all 9 pages |
| P2.2 | `base` recomputed manually in 6+ files | All replaced with `asset()` calls |
| P2.3 | `families` array hardcoded in `cursos.astro` | Extracted to `src/utils/families.ts` |
| P2.4 | Instructor block hardcoded in `[id].astro` | Extracted to `src/components/InstructorCard.astro` |
| P2.5 | `BaseLayout` had no `description` prop | Added with default value; OG tags updated |

### ✅ Priority 3 — CSS & Style Hygiene (all fixed)

| ID | Issue | Fix applied |
|---|---|---|
| P3.1 | Contradictory `.container` padding | Fixed to `padding: 0 2rem` in `_layout.css` |
| P3.2 | `global.css` was a single 500-line flat file | Split into 11 partial files with logical separation |
| P3.3 | `.course-code` class used but not defined in CSS | Renamed to `.course-meta` in `CourseCard.astro` |
| P3.4 | LaTeX build artifacts committed to `public/` | Added to `.gitignore`; removed from tracking |

---

## 5. CSS Architecture

`global.css` is now an import-only entry point:

```css
@import "./_tokens.css";
@import "./_base.css";
@import "./_layout.css";
@import "./_header.css";
@import "./_footer.css";
@import "./_home.css";
@import "./_courses.css";
@import "./_news.css";
@import "./_resources.css";
@import "./_utils.css";
@import "./_responsive.css";
```

### Naming conventions

| Pattern | Use for | Example |
|---|---|---|
| `.[page]-header` | Page-level intro block | `.cursos-header` |
| `.[component]-card` | Card containers | `.course-card`, `.code-card` |
| `.[component]-[element]` | Parts of a component | `.course-card-image`, `.news-meta` |
| `.[state]` modifier | Status variants | `.status-open`, `.tag-pill.active` |
| `_` prefix on files | Partial (not entry point) | `_tokens.css` |

---

## 6. Remaining Improvements (future sessions)

These were not blocking issues and were deferred:

- **Add `description` prop usage to individual pages** — `BaseLayout` now accepts it, but pages don't pass custom descriptions yet. Each page should pass a relevant description for better SEO.
- **`tutoriales.astro` and `figuras.astro`** — not reviewed in detail; may have similar `base`/path patterns (verify with `grep -rn "const base" src/`).
- **`output: 'static'`** — add explicitly to `astro.config.mjs` for clarity.
- **Tag filtering in `codigos-completos.astro`** — the tag pills render but have no JS filtering logic yet.
- **Dark mode** — not implemented; worth considering if on the roadmap.
- **`@astrojs/sitemap`** — not installed; useful for SEO once the site has more content.
