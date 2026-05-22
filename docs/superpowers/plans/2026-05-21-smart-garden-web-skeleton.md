# Smart Garden Web Skeleton Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-first Vite React TypeScript mobile-web app shell with role selection, owner and installer tab navigation, mock data, and routed secondary pages.

**Architecture:** The app uses a single React SPA with `react-router-dom` nested routing for role-based shells. Shared UI primitives, typed mock data, and lightweight Zustand state keep the project easy to extend as more Stitch screens are recreated.

**Tech Stack:** Vite, React, TypeScript, React Router, Zustand, Vitest, Testing Library

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`

- [ ] Add the project package and tooling configuration.
- [ ] Add TypeScript and Vite compiler settings.
- [ ] Add a root HTML file with a mount point.

### Task 2: Test-First Shell Coverage

**Files:**
- Create: `src/test/app-shell.test.tsx`
- Create: `src/test/setup.ts`

- [ ] Write failing tests for role selection and tab shell routing.
- [ ] Verify the tests fail before implementation exists.

### Task 3: App Bootstrapping

**Files:**
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/router.tsx`

- [ ] Add the React entry point.
- [ ] Add the router tree and route layout composition.
- [ ] Make the shell tests pass with the smallest valid routing implementation.

### Task 4: Shared Domain and Mock Data

**Files:**
- Create: `src/shared/types/app.ts`
- Create: `src/shared/mock/owner.ts`
- Create: `src/shared/mock/installer.ts`
- Create: `src/store/app-store.ts`

- [ ] Define core types for tabs and mock entities.
- [ ] Add mock owner and installer content.
- [ ] Add lightweight client state for role context.

### Task 5: Shared UI System

**Files:**
- Create: `src/shared/styles/tokens.css`
- Create: `src/shared/styles/global.css`
- Create: `src/shared/ui/AppFrame.tsx`
- Create: `src/shared/ui/TopBar.tsx`
- Create: `src/shared/ui/TabBar.tsx`
- Create: `src/shared/ui/SectionCard.tsx`
- Create: `src/shared/ui/MetricCard.tsx`
- Create: `src/shared/ui/ListLinkRow.tsx`
- Create: `src/shared/ui/StatusChip.tsx`

- [ ] Add shared styling tokens and global mobile-web layout rules.
- [ ] Create reusable frame and content components.
- [ ] Apply the approved smart-garden visual direction.

### Task 6: Route Pages

**Files:**
- Create: `src/pages/RoleSelectPage.tsx`
- Create: `src/pages/owner/OwnerShell.tsx`
- Create: `src/pages/owner/OwnerHomePage.tsx`
- Create: `src/pages/owner/OwnerScenesPage.tsx`
- Create: `src/pages/owner/OwnerSceneDetailPage.tsx`
- Create: `src/pages/owner/OwnerDevicesPage.tsx`
- Create: `src/pages/owner/OwnerDeviceDetailPage.tsx`
- Create: `src/pages/owner/OwnerPlansPage.tsx`
- Create: `src/pages/owner/OwnerPlanDetailPage.tsx`
- Create: `src/pages/owner/OwnerProfilePage.tsx`
- Create: `src/pages/installer/InstallerShell.tsx`
- Create: `src/pages/installer/InstallerWorkbenchPage.tsx`
- Create: `src/pages/installer/InstallerProjectsPage.tsx`
- Create: `src/pages/installer/InstallerProjectDetailPage.tsx`
- Create: `src/pages/installer/InstallerAlertsPage.tsx`
- Create: `src/pages/installer/InstallerAlertDetailPage.tsx`
- Create: `src/pages/installer/InstallerCustomersPage.tsx`
- Create: `src/pages/installer/InstallerCustomerDetailPage.tsx`
- Create: `src/pages/installer/InstallerProfilePage.tsx`

- [ ] Implement the role entry page.
- [ ] Implement owner tab pages and detail routes.
- [ ] Implement installer tab pages and detail routes.

### Task 7: Verification

**Files:**
- Modify: `package.json`

- [ ] Add the final scripts for `dev`, `build`, and `test`.
- [ ] Run the tests and fix any failures.
- [ ] Run the production build and fix any type or bundling issues.
