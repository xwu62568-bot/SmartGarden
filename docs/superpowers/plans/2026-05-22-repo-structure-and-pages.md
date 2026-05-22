# Repo Structure And Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Smart Garden prototype into a future multi-platform repo with `apps/web`, prepare Git hygiene, and add GitHub Pages deployment for the current Web app.

**Architecture:** Keep the current Vite app intact but move it wholesale into `apps/web` so internal relative paths stay stable. Add a lightweight root workspace shell, reserve `apps/mp` for the future mini-program, and configure GitHub Pages to build and publish the Web app from the new location.

**Tech Stack:** Node.js, npm, Vite, React, TypeScript, GitHub Actions, GitHub Pages

---

### Task 1: Establish repo skeleton and move the Web app

**Files:**
- Create: `apps/`
- Create: `apps/mp/README.md`
- Create: `apps/web/`
- Modify: project root file layout by moving `src`, `index.html`, `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `vite.config.js`, `vite.config.d.ts`
- Verify: `apps/web/package.json`

- [ ] **Step 1: Create the target directories**

Run:

```bash
mkdir -p apps/web apps/mp .github/workflows docs/references/stitch
```

Expected: directories are created without modifying source files yet.

- [ ] **Step 2: Move the current Web app files into `apps/web`**

Run:

```bash
mv src apps/web/
mv index.html apps/web/
mv package.json apps/web/
mv package-lock.json apps/web/
mv tsconfig.json apps/web/
mv tsconfig.node.json apps/web/
mv vite.config.ts apps/web/
mv vite.config.js apps/web/
mv vite.config.d.ts apps/web/
```

Expected: the current Vite app root becomes `apps/web`.

- [ ] **Step 3: Move design reference artifacts under docs**

Run:

```bash
mv stitch-owner-scenes-list.html docs/references/stitch/
mv stitch-owner-scenes-detail.html docs/references/stitch/
```

Expected: design reference HTML files are kept in-repo but no longer clutter the root.

- [ ] **Step 4: Add the mini-program placeholder**

Create `apps/mp/README.md` with:

```md
# Mini Program Placeholder

This directory is reserved for the future Smart Garden mini-program implementation.

Current status: no mini-program code is included yet.
```

- [ ] **Step 5: Verify the moved Web app metadata**

Run:

```bash
sed -n '1,220p' apps/web/package.json
```

Expected: the existing Vite scripts and dependencies are still present under `apps/web`.

### Task 2: Add root-level workspace files and Git hygiene

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `README.md`
- Modify: root directory contents

- [ ] **Step 1: Create the root workspace `package.json`**

Create `package.json` with:

```json
{
  "name": "smart-garden",
  "private": true,
  "workspaces": [
    "apps/*"
  ],
  "scripts": {
    "dev:web": "npm --prefix apps/web run dev",
    "build:web": "npm --prefix apps/web run build",
    "test:web": "npm --prefix apps/web run test"
  }
}
```

- [ ] **Step 2: Create `.gitignore`**

Create `.gitignore` with:

```gitignore
# dependencies
node_modules/
apps/*/node_modules/

# build outputs
dist/
apps/*/dist/

# local caches
.vite/
apps/*/.vite/
coverage/

# TypeScript
*.tsbuildinfo

# environment files
.env
.env.*
!.env.example

# macOS / editor noise
.DS_Store

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
```

- [ ] **Step 3: Create the root `README.md`**

Create `README.md` with:

```md
# Smart Garden

Smart Garden is a multi-platform product repository for the homeowner and installer control experience.

## Current Status

- `apps/web`: active Vite + React Web implementation
- `apps/mp`: reserved for the future mini-program implementation

## Development

```bash
npm run dev:web
npm run build:web
npm run test:web
```

## Structure

```text
apps/web   Web app
apps/mp    Mini-program placeholder
docs       Specs, plans, and design references
```

## Deployment

The Web app is configured for deployment to GitHub Pages through GitHub Actions.
```

- [ ] **Step 4: Remove generated noise from the working tree**

Run:

```bash
rm -rf dist
rm -rf node_modules
find . -name .DS_Store -delete
find . -name '*.tsbuildinfo' -delete
```

Expected: generated files are removed so Git starts from a clean source-only tree.

### Task 3: Prepare the Web app for the new location and GitHub Pages

**Files:**
- Modify: `apps/web/package.json`
- Modify: `apps/web/vite.config.ts`
- Verify: `apps/web/src/shared/styles/global.css`

- [ ] **Step 1: Update Web package metadata for its new role**

Edit `apps/web/package.json`:

```json
{
  "name": "smart-garden-web",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

Expected: scripts stay the same; the file remains the app-local manifest.

- [ ] **Step 2: Configure Vite `base` for GitHub Pages**

Update `apps/web/vite.config.ts` to:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages && repoName ? `/${repoName}/` : '/',
});
```

Expected: local dev keeps `/`, GitHub Pages builds use `/<repo>/`.

- [ ] **Step 3: Verify the moved asset paths still resolve**

Run:

```bash
rg -n "../../assets/fonts|assets/fonts|global.css" apps/web/src apps/web/index.html
```

Expected: current relative paths still point to `apps/web/src/assets/...` after the move.

### Task 4: Add GitHub Pages deployment

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

- [ ] **Step 1: Create the GitHub Pages workflow**

Create `.github/workflows/deploy-pages.yml` with:

```yaml
name: Deploy Web To GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: apps/web/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: apps/web

      - name: Build
        run: npm run build
        working-directory: apps/web
        env:
          GITHUB_ACTIONS: true
          GITHUB_REPOSITORY: ${{ github.repository }}

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: apps/web/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the workflow file**

Run:

```bash
sed -n '1,260p' .github/workflows/deploy-pages.yml
```

Expected: the workflow builds from `apps/web` and uploads `apps/web/dist`.

### Task 5: Verify the repo and initialize Git

**Files:**
- Modify: runtime workspace after migration
- Create: `.git/` by initialization

- [ ] **Step 1: Run the moved Web app tests**

Run:

```bash
npm --prefix apps/web test -- --runInBand
```

Expected: the known test suite runs from the new path; if legacy failures remain, they should match pre-existing failures rather than move-related failures.

- [ ] **Step 2: Run the moved Web app build**

Run:

```bash
npm --prefix apps/web run build
```

Expected: Vite build succeeds from `apps/web`.

- [ ] **Step 3: Inspect the final top-level tree**

Run:

```bash
find . -maxdepth 3 -type d | sort
```

Expected: root shows `apps/web`, `apps/mp`, `docs`, `.github/workflows`; generated directories are absent.

- [ ] **Step 4: Initialize Git after ignore rules are in place**

Run:

```bash
git init
git status --short
```

Expected: Git initializes successfully and does not track ignored directories like `node_modules` or `dist`.
