# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with `main.ts` wiring the Vite app, `quiz.ts` handling quiz flow, and `data/nodes.ts` defining the decision tree used across views. UI styles sit in `src/style.css`; reusable types live in `src/types.ts`. Build artifacts land in `dist/`, while standalone exports such as `all-positions.html` stay at the repo root. Tooling configs (`vite.config.ts`, `tsconfig*.json`, `.eslintrc`) should remain close to the root so Vite and TypeScript pick them up automatically.

## Build, Test, and Development Commands
Run `npm install` once to fetch dependencies. Use `npm run dev` for the hot-reloading playground, and `npm run build` to type-check (`tsc -b --noEmit`) before emitting production assets. Preview the built bundle with `npm run preview`, or serve an existing `dist/` folder via `npm run serve`. Keep linting clean with `npm run lint`, and rely on `npm run format` / `npm run format:check` to enforce Prettier defaults.

## Coding Style & Naming Conventions
Follow TypeScript with ES module syntax and avoid default exports unless a file exposes a single entry point. Keep filenames lowercase with dashes or camelCase (`quiz.ts`, `all-positions.ts`). Indent with two spaces, match existing `style.css` naming, and reuse shared types from `src/types.ts` rather than duplicating literals. Run Prettier before committing to maintain consistent wrapping and quote usage.

## Testing Guidelines
Automated tests are not yet wired in. When adding features, document manual verification steps in your PR (browser, route, expected outcome) and prefer deterministic logic that could later migrate into a test harness. If you add tests, colocate them alongside the feature (`src/module.test.ts`) and document required commands.

## Commit & Pull Request Guidelines
Recent history favors short, imperative subject lines (e.g., "Add footer", "Style updates"). Keep commits focused, reference issue IDs in the body when relevant, and leave lint/format noise out of logic commits. PRs should summarize the change, call out UI impacts with before/after screenshots, list manual test steps, and mention follow-up ideas so future work is easy to triage.

## Configuration & Security Tips
Do not commit secrets; environment-specific values should be injected at runtime or via `.env.local` entries ignored by Git. When integrating third-party data, validate shape against types in `src/types.ts` before exposing it to quiz logic to avoid runtime surprises.
