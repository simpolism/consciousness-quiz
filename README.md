# Consciousness Quiz

A TypeScript + Vite single-page app that walks you through a decision tree of consciousness theories. Answer questions, explore advanced explanations, and browse a reference grid of philosophical positions.

## Getting Started

```bash
npm install
npm run dev
```

- `npm run dev` starts the local dev server at the URL Vite prints.
- `npm run build` emits a production build under `dist/`.
- `npm run preview` serves the built output locally for testing.
- `npm run lint` runs ESLint on `src/`.

## Project Structure

- `src/quiz.ts` – renders the interactive question flow.
- `src/all-positions.ts` – standalone page showing every end-state.
- `src/data/nodes.ts` – data for the decision tree questions and end nodes.
- `src/style.css` – global styling (shared by both views).

The build uses Vite with TypeScript; no server runtime is required for hosting.
