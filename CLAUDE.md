# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Angular component library monorepo with two publishable libraries and a demo app:

| Project | Type | Prefix | Purpose |
|---|---|---|---|
| `ngx-material-extended` | library | `mex-` | Angular Material component extensions |
| `ngx-table` | library | `ngx-` | CSS Grid-based table components |
| `ngx-form-param` (root `src/`) | app | — | Demo/dev harness |

## Commands

```bash
# Dev server (demo app, port 4200)
npm start

# Build the demo app
npm run build

# Build a library
ng build ngx-material-extended
ng build ngx-table

# Run tests (all projects)
npm test

# Run tests for one project
ng test --project ngx-material-extended
ng test --project ngx-table

# Watch mode (demo app)
npm run watch
```

## Architecture

### Library structure

Each feature under `projects/ngx-material-extended/src/lib/` follows this shape:
```
feature/
  feature.ts          # Component/directive
  feature.html        # Template (if non-trivial)
  feature.scss        # Styles
  feature.spec.ts     # Tests
  public-api.ts       # Re-exports for the barrel
```

All public symbols roll up through `projects/ngx-material-extended/src/public-api.ts`.

### Angular patterns in use

- **Standalone components** — all new components use `standalone: true`; no NgModules needed
- **Angular Signals** — prefer `input()`, `signal()`, `computed()` over `@Input()` and `BehaviorSubject` for new code
- **`contentChildren()`** — used for layout logic (e.g. `NgxTable` counts columns by querying `NgxTr` children)
- **`ViewEncapsulation.None`** — used broadly so SCSS can target child elements; scope styles manually with a host class (e.g. `.mex-table`)
- **Attribute selectors** — some components use `[mex-table]` so they apply to existing HTML elements
- **`@angular/animations`** — enter/leave triggers on progress bars, dialogs, etc.

### ngx-table vs mex-table

`ngx-table` (`NgxTable`) uses a **CSS Grid layout** — no `<table>` element. Column count is computed dynamically from `contentChildren(NgxTr)`. Styling is via custom properties (see README.md).

`mex-table` in `ngx-material-extended` is an **attribute directive** on a real `<table>` element, adding Material-style borders and column width control.

### TypeScript paths

`tsconfig.json` maps library names to source so the demo app can import libraries directly without building them first:
```json
"ngx-material-extended" → "projects/ngx-material-extended/src/public-api.ts"
"ngx-table"             → "projects/ngx-table/src/public-api.ts"
```

### Theming

`projects/ngx-material-extended/src/lib/theme/` contains M3 theme builder SCSS. The `theming/` feature provides directives (`mexColor`, `mexOutline`, `mexButton`) for applying Material Design tokens programmatically.

## Conventions

- Strict TypeScript (`strict: true`, `strictTemplates: true`) — no `any`, no non-null assertions without justification
- Component SCSS uses `ViewEncapsulation.None`; always namespace selectors under the component's host class
- New features get a `public-api.ts` barrel and an entry in the root `public-api.ts`
- Tests use Karma + Jasmine; `TestBed.configureTestingModule({ imports: [ComponentUnderTest] })` pattern (standalone imports)
