# Owner Scenes Stitch Alignment Design

## Scope

This spec covers only the owner-side scenes experience:

- `src/pages/owner/OwnerScenesPage.tsx`
- `src/pages/owner/OwnerSceneDetailPage.tsx`
- supporting mock data and page-scoped styles needed to align these two pages to the downloaded Stitch originals

This spec does not cover:

- owner home, devices, plans, or profile tabs
- installer pages
- API integration or persistence
- pixel-perfect recreation of every decorative artifact in the exported Stitch HTML

## Goal

Replace the current “design-direction” implementation with a much closer reproduction of the Stitch originals for the owner scenes list and detail pages, while keeping the existing React router structure and local mock-data architecture.

Success means:

- the list page reads as a vertically stacked scene launcher, not a dashboard
- the detail page reads as a focused execution screen with hero artwork, status, tasks, and a bottom primary action
- the UI hierarchy, density, labels, and actions match the downloaded originals closely enough that the current implementation no longer feels structurally different

## Source References

Primary references in the workspace:

- `/Users/a511/Documents/UI设计稿/stitch-owner-scenes-list.png`
- `/Users/a511/Documents/UI设计稿/stitch-owner-scenes-list.html`
- `/Users/a511/Documents/UI设计稿/stitch-owner-scenes-detail.png`
- `/Users/a511/Documents/UI设计稿/stitch-owner-scenes-detail.html`

The PNGs are the visual source of truth. The HTML exports are supporting references for structure, labels, and relative spacing only.

## Recommended Approach

Use a targeted high-fidelity rewrite of the two pages instead of adapting the existing `hero-panel` and `SectionCard` composition.

Why this approach:

- the current list page is a dashboard with summary cards, grouping sections, and filters that do not exist in the Stitch original
- the current detail page is far too shallow compared to the original execution-focused layout
- preserving route structure and shared app shell is enough reuse; the page interiors need new composition

## Information Architecture

### Owner Scenes List

The page should be rebuilt as:

1. compact top bar with centered title `场景` and a right-side add affordance
2. continuous list of scene cards
3. bottom tab bar remains from the existing app shell

Each scene card should contain:

- a left icon tile
- scene name
- one-line scene description
- optional secondary status line for warning/error states
- a small overflow affordance on the top-right
- a rounded action button on the lower-right, typically `执行`

The card list should include at least these visible scene types from the Stitch reference:

- 按餐模式
- 聚会模式
- 离家模式
- 全部关闭
- 自定义场景

### Owner Scene Detail

The page should be rebuilt as:

1. compact top bar with back affordance, centered title, and right-side edit affordance
2. hero section with background artwork, centered icon badge, scene name, and short summary
3. a switch row indicating whether the scene should display on the homepage quick-launch area
4. task section titled `执行任务`
5. bottom anchored primary action button

The task list should include mixed card types matching the Stitch structure:

- device/light tasks with title and area label
- a percentage/intensity value on the right where applicable
- a visual progress/slider-like bar
- completed status rows for already-finished tasks
- at least one locked or unavailable row near the bottom to preserve the original rhythm

## Data Design

The current `ownerScenes` array is too small and too generic for this UI. It should be expanded to support richer rendering without introducing backend concerns.

Recommended additions in `src/shared/mock/owner.ts`:

- list-card icon key
- card accent or tone
- card description
- optional warning line
- action label
- action state
- detail hero subtitle
- detail quick-launch enabled flag
- detail tasks array

Task items should support:

- `name`
- `zone`
- `icon`
- `state` such as active/completed/locked
- optional `valueLabel` such as `70%`
- optional `progress`
- optional small status chip text

The detail page should render by looking up the selected scene id from the route, then consuming those richer fields directly.

## Visual Direction

### Shared Constraints

- keep the existing mobile frame and router shell
- keep the existing bottom tab bar
- preserve app-wide typography tokens unless a page-level override is necessary
- prefer page-scoped classes for new structure instead of mutating generic shared primitives until they stop matching their current use elsewhere

### List Page Direction

- near-white background with generous vertical spacing
- cards sit on very soft gray surfaces with thin borders
- icon tiles are pastel and vary by scene type
- the `执行` buttons are small, rounded, and color-coded by scene
- the `全部关闭` item should feel more urgent through red accents and warning copy

### Detail Page Direction

- hero area uses the downloaded artwork as a visual reference, recreated with CSS layers rather than image embedding unless the implementation becomes unreasonably complex
- central badge should create the same focal point as the original
- task cards should use low-contrast surfaces with clear dividers and a strong green progress state
- the bottom CTA should remain visually dominant and always readable

## Interaction Behavior

### List Page

- tapping the card action should remain a button visually; no real execution logic is required in this phase
- tapping the row title area can still link to the detail page
- overflow affordances are visual only for now unless an existing interaction can be reused trivially

### Detail Page

- the homepage quick-launch switch should be interactive in local state
- the bottom `执行场景` button is visual only in this phase
- no API calls, timers, or execution side effects are required

## Testing Strategy

Follow TDD for the behavior change:

1. update or add failing route tests for the list page so they assert the new Stitch-aligned labels and remove reliance on the old dashboard copy
2. add a failing detail-page test for the new hero/task layout
3. implement the minimal page rewrite and mock-data expansion needed to pass those tests
4. run the focused page test file, then the full test suite, then production build

Tests should verify:

- list page shows `场景`, the Stitch scene names, and at least one `执行` action
- list page shows the danger/warning copy for `全部关闭`
- detail page shows `夜景模式`, `执行任务`, and `执行场景`
- detail page shows at least one task row and the quick-launch switch label

## Risks And Boundaries

- the exported Stitch image is narrow and compressed, so exact typography and spacing will still require interpretation
- the existing shared styles are optimized for dashboard cards; forcing the new scenes UI into those primitives would produce long-term inconsistency
- the detail hero artwork may need a CSS approximation instead of literal reproduction to keep the code maintainable

## Implementation Notes

- prefer new scene-specific class names such as `owner-scenes-page`, `scene-list-card`, `scene-detail-hero`, and `scene-task-card`
- keep page logic simple and local
- do not refactor unrelated pages during this pass
- do not broaden mock data beyond fields needed for these two pages

## Definition Of Done

This work is done when:

- both owner scenes pages are structurally aligned to the downloaded Stitch originals
- the current non-matching dashboard sections have been removed from the list page
- the detail page includes hero, tasks, switch row, and bottom CTA
- tests and build pass locally
