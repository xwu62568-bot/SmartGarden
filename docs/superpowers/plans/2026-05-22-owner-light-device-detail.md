# Owner Light Device Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the Stitch owner light device detail screen inside the existing `/owner/devices/:deviceId` flow while keeping non-light devices on the simpler fallback detail view.

**Architecture:** Extend owner mock data with a light-detail payload, branch inside `OwnerDeviceDetailPage` based on `deviceId`, and add page-level CSS in `global.css` for the new stitched layout. Update `OwnerShell` so device detail pages use the detail scroll container and hide the bottom tab bar, matching the existing scene detail behavior.

**Tech Stack:** React 18, TypeScript, React Router, Vite, Vitest, Testing Library, global CSS

---

### Task 1: Add light-detail mock data

**Files:**
- Modify: `apps/web/src/shared/types/app.ts`
- Modify: `apps/web/src/shared/mock/owner.ts`

- [ ] Define a detail type for stitched light devices with local-state defaults and structured content sections.
- [ ] Add a light device detail record for the existing light device route target.
- [ ] Keep non-light device data unchanged so fallback rendering still works.

### Task 2: Implement the stitched light detail page

**Files:**
- Modify: `apps/web/src/pages/owner/OwnerDeviceDetailPage.tsx`

- [ ] Replace the placeholder metric-card view with a branch:
  - stitched light detail for supported light device ids
  - existing simple fallback for unsupported devices
- [ ] Implement local state for power, brightness, temperature tab, and selected color.
- [ ] Keep the page static and self-contained with no backend dependencies.

### Task 3: Connect shell and device list behavior

**Files:**
- Modify: `apps/web/src/pages/owner/OwnerShell.tsx`
- Modify: `apps/web/src/pages/owner/OwnerDevicesPage.tsx`

- [ ] Treat `/owner/devices/:deviceId` as a detail route for scroll container and tab-bar hiding.
- [ ] Add device-card navigation for the supported light device entry without rewriting the rest of the list flow.

### Task 4: Add stitched styles

**Files:**
- Modify: `apps/web/src/shared/styles/global.css`

- [ ] Add dedicated styles for the light-detail page:
  - top bar
  - hero control section
  - slider
  - temperature tabs
  - color selector
  - info cards
  - quick actions
- [ ] Preserve the current project’s light glassmorphism language and mobile-first spacing.

### Task 5: Verify with focused tests and build

**Files:**
- Modify: `apps/web/src/test/page-content.test.tsx`

- [ ] Add assertions for the stitched light detail route:
  - title
  - brightness label
  - temperature controls
  - RGB section
  - quick actions
- [ ] Run the targeted test file.
- [ ] Run the production build.
