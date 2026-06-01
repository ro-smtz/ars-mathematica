# Ars Mathematica

Official website of **Ars Mathematica**, a project dedicated to scientific visualization, technical communication, and education with LaTeX.

The website contains:

* Courses on LaTeX, TikZ, PGFPlots, and scientific writing.
* Tutorials and learning resources.
* A gallery of scientific figures and visualizations.
* Information about the project and its author.

The site is built with Astro and deployed through GitHub Pages.

---

## Technology

* Astro
* Markdown content collections
* HTML & CSS
* GitHub Pages

The project intentionally avoids unnecessary complexity and JavaScript frameworks whenever possible. Most pages are generated statically from Markdown content.

---

## Project Structure

```text
src/
├── components/      # Reusable UI components
├── content/         # Markdown content collections
│   ├── courses/
│   ├── tutorials/
│   ├── figures/
│   └── resources/
├── layouts/         # Page layouts
├── pages/           # Site routes
├── styles/          # Global styles
└── utils/           # Utility functions
```

Static assets such as images are stored in:

```text
public/
```

---

## Course Content

Courses are written as Markdown files with frontmatter metadata.

Example:

```yaml
---
title: "Escritura de Artículos Científicos con LaTeX"
code: "T1"
status: "open"
level: "Inicial"

dates: "22–26 de junio de 2026"
schedule: "7:30 PM – 9:00 PM (UTC-6)"
modality: "En línea · Zoom"

summary: "Aprende a redactar, estructurar y preparar tu primer artículo científico utilizando LaTeX como una herramienta profesional de trabajo."
---
```

The `status` field controls how the course page is displayed:

| Status        | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `open`        | Enrollment information is displayed.                            |
| `coming-soon` | Course description is available but enrollment is not yet open. |
| `archived`    | Historical or inactive course.                                  |

---

## Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the generated site:

```bash
npm run preview
```

---

## Deployment

The site is automatically deployed through GitHub Pages.

Production URL:

https://ro-smtz.github.io/ars-mathematica/

---

## About

Ars Mathematica was created by Rodrigo Sánchez-Martínez as a long-term project for teaching LaTeX, scientific visualization, and technical communication through practical academic workflows.

> Non docentibus, sed discentibus.
>
> Non eruditis, sed erudiendis.