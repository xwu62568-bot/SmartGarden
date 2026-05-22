# Smart Garden Web App Skeleton Design

**Date:** 2026-05-21

## Goal

Build a local-first React web project that recreates the mobile-oriented Stitch design direction for the Smart Garden app. Phase 1 focuses on the application shell, role entry, tab navigation, and a small set of secondary pages using mock data only.

## Scope

Phase 1 includes:

- A `Vite + React + TypeScript` project runnable locally
- A mobile-web layout rendered inside desktop browsers
- A role selection entry page
- Two application shells:
  - Owner: `首页`、`场景`、`设备`、`计划`、`我的`
  - Installer: `工作台`、`项目`、`告警`、`客户`、`我的`
- A routed page for each tab
- Initial secondary pages reachable from the tab pages
- Shared UI primitives for page container, top bar, bottom tab bar, cards, status chips, and list rows
- Mock data only, with no backend integration

Phase 1 excludes:

- Authentication
- Real device APIs
- Server persistence
- Form submission workflows with side effects
- Pixel-perfect recreation of every Stitch screen

## Product Structure

### Entry

- `/` shows the role selection page
- Choosing a role routes into the matching shell

### Owner Shell

- `/owner/home`
- `/owner/scenes`
- `/owner/devices`
- `/owner/plans`
- `/owner/profile`

Secondary pages in phase 1:

- `/owner/scenes/:sceneId`
- `/owner/devices/:deviceId`
- `/owner/plans/:planId`

### Installer Shell

- `/installer/workbench`
- `/installer/projects`
- `/installer/alerts`
- `/installer/customers`
- `/installer/profile`

Secondary pages in phase 1:

- `/installer/projects/:projectId`
- `/installer/alerts/:alertId`
- `/installer/customers/:customerId`

## UX Direction

- The app should feel like a mobile product inside the browser, not a generic admin SPA.
- Layout width should stay constrained to a handset-like viewport with safe spacing.
- The look should follow the current Stitch project language: clean surfaces, green-blue smart garden accents, soft radii, layered cards, and strong information hierarchy.
- Owner and installer shells should share a base system but differ in emphasis:
  - Owner: calmer lifestyle dashboard feel
  - Installer: denser operational feel

## Technical Design

- Use `react-router-dom` for routing
- Use `zustand` for small shared app state:
  - selected role
  - lightweight UI preferences if needed
- Use plain CSS with design tokens in a shared stylesheet
- Use `vitest` and `@testing-library/react` for route and shell coverage
- Keep data in typed mock modules under `src/shared/mock`

## Code Organization

- `src/app` for bootstrapping and router assembly
- `src/pages` for route-level pages
- `src/features` for role-specific view composition
- `src/shared/ui` for reusable UI building blocks
- `src/shared/mock` for sample content
- `src/shared/styles` for tokens and global layout rules
- `src/shared/types` for domain models
- `src/store` for global client state

## Success Criteria

- `npm install` completes successfully
- `npm run dev` starts a local app
- `npm run test` passes
- `npm run build` succeeds
- A user can:
  - choose owner or installer role
  - land in the correct tab shell
  - switch between all five tabs in each shell
  - open at least one secondary detail page from list content

