# Ars Mathematica

A science communication project dedicated to the visual representation of physics, mathematics, and chemistry through LaTeX, TikZ, and PGFPlots. Founded in 2019, Ars Mathematica has grown to 70 K+ followers on Instagram and now hosts a full educational website with courses, figure galleries, and tutorials — all in Spanish.

> *Non docentibus, sed discentibus.*  
> *Non eruditis, sed erudiendis.*

**Live site** → [ro-smtz.github.io/ars-mathematica](https://ro-smtz.github.io/ars-mathematica/)  
**Instagram** → [@ars_mathematica](https://www.instagram.com/ars_mathematica/)  
**Author** → [Rodrigo Sánchez-Martínez](https://orcid.org/0000-0002-5713-3053)

---

## Contents

- **Courses** — structured learning paths on LaTeX, TikZ, PGFPlots, and scientific writing
- **Tutorials** — focused guides on specific techniques and workflows
- **Figure gallery** — a curated collection of scientific figures with source code
- **Sobre mí** — about the project and its author

---

## Built with

- [Astro v6](https://astro.build) — static site generation with content collections
- TikZ and PGFPlots — all figures compiled with XeLaTeX
- GitHub Pages + GitHub Actions — automated deployment

The project intentionally avoids unnecessary complexity. Pages are generated statically from Markdown content collections; JavaScript is used only where interaction is essential.

---

## Project structure

```text
src/
├── components/      # Reusable UI components
├── content/         # Markdown content collections (courses, figures, tutorials)
├── layouts/         # Page layouts
├── pages/           # Site routes
├── styles/          # Global styles (centralized in global.css)
└── utils/           # Utility functions
public/              # Static assets (images, figures)
```

---

## Development

```bash
npm install       # Install dependencies
npm run dev       # Local development server
npm run build     # Production build
npm run preview   # Preview production build
```

Deploy by pushing to `main` — GitHub Actions handles the rest.

```bash
git add . && git commit -m "message" && git push
```

---

## Related

- [`ro-smtz/research`](https://github.com/ro-smtz/research) — research code and LaTeX templates from my work in ultrafast optics
- [ORCID 0000-0002-5713-3053](https://orcid.org/0000-0002-5713-3053) — publication record
