# JavaCore සිංහලෙන් — Learn Java by building Mortar

A creative Angular learning site that teaches the **entire Java + Spring Boot
roadmap** (`java_springboot_roadmap.md`) one concept at a time. Every concept is:

- explained in **Sinhala mixed with English technical words** (titles/nav stay English),
- shown with a **syntax-highlighted coding example**,
- tied to **one real-world project story** — building the **Mortar** AI Customer
  Data Platform (`PROJECT_IDEA.md`).

**178 concepts** across **11 sections**, navigated as the roadmap's nested tree
(section → topic → subtopic → concept), with progress tracking.

## Run locally

```bash
npm install        # first time only
npm start          # or: npx ng serve
```

Then open **http://localhost:4200/**.

Production build: `npm run build` (output in `dist/`).

## How it's built

- **Angular 21** — standalone components, signals, new control flow, lazy routes.
- **highlight.js** — Java/XML/SQL/YAML syntax highlighting.
- **Custom SCSS design system** (dark theme, coffee/amber + violet accents) —
  no CSS framework dependency, fully static app.
- **localStorage** — "mark complete" progress + resume-where-you-left-off.

### Project structure

```
src/app/
  core/models/roadmap.model.ts     # RoadmapNode + Concept types
  core/services/                   # content (tree/slug/prev-next) + progress
  content/tree.ts                  # the full roadmap structure (numbers + titles)
  content/concepts/section-01..11.ts  # authored bilingual content, keyed by number
  shared/                          # highlight directive + code-block component
  features/home/                   # landing: hero, journey, section cards, progress
  features/roadmap-shell/          # sidebar tree + search + progress + <router-outlet>
  features/concept-page/           # the reusable per-concept template
```

### Adding / editing content

Content is **decoupled from structure**. To edit a concept, open the matching
`content/concepts/section-XX.ts` and edit the entry keyed by its dotted number
(e.g. `'2.4.6.2'`). Each entry has: `summary`, `sinhala[]`, `analogy`, `code[]`,
`mortar`, `keyPoints[]`, and optional `pitfalls[]`. Slugs and prev/next are
generated automatically from `tree.ts`.
