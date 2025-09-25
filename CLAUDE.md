# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Type-check with `tsc -b --noEmit` then build for production
- `npm run preview` - Preview the production build locally
- `npm run serve` - Serve the built `dist/` folder
- `npm run lint` - Run ESLint on `src/**/*.{ts,tsx}`
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Architecture Overview

This is a TypeScript + Vite single-page application that implements an interactive decision tree quiz for consciousness theories in philosophy.

### Core Structure

- **Entry Point**: `src/main.ts` initializes the `QuizApp` class and mounts it to the DOM
- **Quiz Engine**: `src/quiz.ts` contains the `QuizApp` class that manages the interactive question flow
- **Data Model**: `src/data/nodes.ts` defines the complete decision tree with questions and philosophical end-states
- **Type Definitions**: `src/types.ts` defines the core types including `Node`, `QuestionNode`, `EndNode`, and `NodeId`
- **Standalone View**: `src/all-positions.ts` renders a reference grid showing all possible philosophical positions

### Decision Tree Architecture

The application uses a node-based decision tree where:
- **Question Nodes** present philosophical questions with multiple choice answers
- **End Nodes** represent specific consciousness theories with verdicts (`conscious`, `not`, `meta`)
- Each node has a unique `NodeId` that enables navigation through the tree
- The `NodeMap` in `nodes.ts` contains the complete tree structure

### Build Configuration

- **Multi-entry Build**: Vite config defines two entry points: `index.html` (main quiz) and `all-positions.html` (reference grid)
- **Base Path**: Uses relative paths (`base: './'`) for flexible deployment
- **TypeScript**: Configured with multiple tsconfig files for different contexts

### Styling and UI

- Global styles in `src/style.css` shared across both views
- Uses CSS custom properties and modern layout techniques
- Footer component in `src/footer.ts` for shared UI elements

### Code Conventions

- ES modules with TypeScript
- No default exports (prefer named exports)
- Two-space indentation enforced by Prettier
- Filenames use lowercase with dashes (`all-positions.ts`) or camelCase
- Shared types centralized in `src/types.ts`
- Helper functions like `makeEnd()` and `makeQuestion()` for data construction