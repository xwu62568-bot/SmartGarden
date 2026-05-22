# Owner Scenes Stitch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the owner scenes list and detail pages so they match the downloaded Stitch originals much more closely while staying on the current React router and local mock-data stack.

**Architecture:** Expand the owner scene mock data so each scene carries the fields needed for both the list-card view and the detail execution view. Replace the current dashboard-like page internals with scene-specific mobile layouts and page-scoped CSS while leaving the app shell, routing, and bottom tabs intact.

**Tech Stack:** React, TypeScript, React Router, Testing Library, Vitest, CSS

---

### Task 1: Rewrite route tests for the new scenes layout

**Files:**
- Modify: `src/test/page-content.test.tsx`
- Test: `src/test/page-content.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
it('shows the Stitch-aligned owner scenes list', () => {
  renderRoute('/owner/scenes');

  expect(screen.getByText('场景')).toBeInTheDocument();
  expect(screen.getByText('按餐模式')).toBeInTheDocument();
  expect(screen.getByText('聚会模式')).toBeInTheDocument();
  expect(screen.getByText('全部关闭')).toBeInTheDocument();
  expect(screen.getAllByText('执行').length).toBeGreaterThan(0);
  expect(screen.getByText('关闭不必要的灯光，水景和户外设备')).toBeInTheDocument();
});

it('shows the Stitch-aligned owner scene detail', () => {
  renderRoute('/owner/scenes/night');

  expect(screen.getByText('夜景模式')).toBeInTheDocument();
  expect(screen.getByText('执行任务')).toBeInTheDocument();
  expect(screen.getByText('前院彩条灯')).toBeInTheDocument();
  expect(screen.getByText('在首页快捷菜单中显示')).toBeInTheDocument();
  expect(screen.getByText('执行场景')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: FAIL because the current scenes list still renders dashboard copy like `精选场景` and the detail page does not render the new task layout.

- [ ] **Step 3: Keep the rest of the file intact while replacing only the owner scenes assertions**

```tsx
describe('stitched page content', () => {
  it('shows the Stitch-aligned owner scenes list', () => {
    renderRoute('/owner/scenes');

    expect(screen.getByText('场景')).toBeInTheDocument();
    expect(screen.getByText('按餐模式')).toBeInTheDocument();
    expect(screen.getByText('聚会模式')).toBeInTheDocument();
    expect(screen.getByText('全部关闭')).toBeInTheDocument();
    expect(screen.getAllByText('执行').length).toBeGreaterThan(0);
    expect(screen.getByText('关闭不必要的灯光，水景和户外设备')).toBeInTheDocument();
  });

  it('shows the Stitch-aligned owner scene detail', () => {
    renderRoute('/owner/scenes/night');

    expect(screen.getByText('夜景模式')).toBeInTheDocument();
    expect(screen.getByText('执行任务')).toBeInTheDocument();
    expect(screen.getByText('前院彩条灯')).toBeInTheDocument();
    expect(screen.getByText('在首页快捷菜单中显示')).toBeInTheDocument();
    expect(screen.getByText('执行场景')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run test to verify it still fails for the intended reason**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: FAIL on the two scenes tests only because the UI has not been rewritten yet.

- [ ] **Step 5: Commit**

```bash
git add src/test/page-content.test.tsx
git commit -m "test: define owner scenes stitch expectations"
```

### Task 2: Expand owner scene mock data for list and detail rendering

**Files:**
- Modify: `src/shared/mock/owner.ts`
- Test: `src/test/page-content.test.tsx`

- [ ] **Step 1: Write the minimal data shape needed by the failing tests**

```ts
export const ownerScenes = [
  {
    id: 'dining',
    name: '按餐模式',
    description: '烛光音响，开关灯，关掉地暖',
    warning: '',
    icon: 'wb_cloudy',
    accent: 'sky',
    actionLabel: '执行',
    detailSubtitle: '日落后自动打开庭院灯与彩条灯，营造温馨氛围。',
    quickAccessEnabled: true,
    tasks: [],
  },
];
```

- [ ] **Step 2: Run test to verify it still fails**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: FAIL because data changes alone do not update the pages.

- [ ] **Step 3: Replace the old two-item scene array with a richer five-item dataset**

```ts
export const ownerScenes = [
  {
    id: 'dining',
    name: '按餐模式',
    description: '烛光音响，开关灯，关掉地暖',
    icon: 'wb_cloudy',
    accent: 'sky',
    actionLabel: '执行',
    detailSubtitle: '日落后自动打开庭院灯与彩条灯，营造温馨氛围。',
    quickAccessEnabled: true,
    tasks: [],
  },
  {
    id: 'party',
    name: '聚会模式',
    description: '打开彩灯灯带，播放音乐节场景',
    icon: 'forest',
    accent: 'mint',
    actionLabel: '执行',
    detailSubtitle: '聚会开始后自动启动灯光、音乐和庭院水景。',
    quickAccessEnabled: true,
    tasks: [],
  },
  {
    id: 'night',
    name: '夜景模式',
    description: '关闭强光并缩小部分设备，保留夜里出行灯',
    icon: 'bed',
    accent: 'slate',
    actionLabel: '执行',
    detailSubtitle: '日落后自动打开庭院彩灯与后院景灯，营造温馨氛围。',
    quickAccessEnabled: true,
    tasks: [
      { name: '前院彩条灯', zone: '车库', icon: 'lightbulb', state: 'active', valueLabel: '70%', progress: 0.7 },
      { name: '后院景莱灯', zone: '车天', icon: 'lightbulb', state: 'active', valueLabel: '50%', progress: 0.5 },
      { name: '池塘水下灯', zone: '车天', icon: 'waves', state: 'active', valueLabel: '40%', progress: 0.4, chip: '已关闭' },
      { name: '喷泉', zone: '', icon: 'water_drop', state: 'completed', statusText: '已关闭' },
      { name: '沙池音乐环', zone: '保持上次状态', icon: 'sync', state: 'locked', statusText: '' },
    ],
  },
  {
    id: 'all-off',
    name: '全部关闭',
    description: '关闭不必要的灯光，水景和户外设备',
    warning: '启动后将关闭庭院电力',
    icon: 'power_settings_new',
    accent: 'danger',
    actionLabel: '执行',
    detailSubtitle: '一键关闭非必要设备，保留安全与基础功能。',
    quickAccessEnabled: false,
    tasks: [],
  },
  {
    id: 'custom',
    name: '自定义场景',
    description: '用户自定义设备状态',
    icon: 'auto_awesome',
    accent: 'lavender',
    actionLabel: '编辑',
    detailSubtitle: '按你的偏好自由组合灯光、水景与其它设备状态。',
    quickAccessEnabled: false,
    tasks: [],
  },
];
```

- [ ] **Step 4: Run test to verify it still fails only on layout expectations**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: FAIL because the page components still render the old structure.

- [ ] **Step 5: Commit**

```bash
git add src/shared/mock/owner.ts
git commit -m "feat: expand owner scenes mock data"
```

### Task 3: Rebuild the owner scenes list page

**Files:**
- Modify: `src/pages/owner/OwnerScenesPage.tsx`
- Modify: `src/shared/styles/global.css`
- Test: `src/test/page-content.test.tsx`

- [ ] **Step 1: Write only the structure needed for the failing list-page test**

```tsx
export function OwnerScenesPage() {
  return (
    <div>
      <h2>场景</h2>
      <div>按餐模式</div>
      <div>聚会模式</div>
      <div>全部关闭</div>
      <button type="button">执行</button>
    </div>
  );
}
```

- [ ] **Step 2: Run test to verify the list test can move toward green while the detail test still fails**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: the owner scenes list assertions move closer to passing, while the detail test still fails.

- [ ] **Step 3: Replace the temporary structure with the Stitch-aligned card list**

```tsx
export function OwnerScenesPage() {
  return (
    <div className="owner-scenes-page">
      <header className="scene-mobile-header">
        <span className="scene-mobile-header-spacer" aria-hidden="true" />
        <h2 className="scene-mobile-title">场景</h2>
        <button type="button" className="scene-icon-button" aria-label="新增场景">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="scene-list-stack">
        {ownerScenes.map((scene) => (
          <article key={scene.id} className={`scene-list-card scene-list-card-${scene.accent}`}>
            <Link to={`/owner/scenes/${scene.id}`} className="scene-list-main">
              <div className={`scene-list-icon scene-list-icon-${scene.accent}`}>
                <span className="material-symbols-outlined filled-icon">{scene.icon}</span>
              </div>
              <div className="scene-list-copy">
                <div className="scene-list-topline">
                  <h3>{scene.name}</h3>
                  <span className="material-symbols-outlined scene-overflow">more_horiz</span>
                </div>
                <p>{scene.description}</p>
                {scene.warning ? (
                  <div className="scene-warning-row">
                    <span className="material-symbols-outlined filled-icon">error</span>
                    <span>{scene.warning}</span>
                  </div>
                ) : null}
              </div>
            </Link>

            <button
              type="button"
              className={`scene-action-button scene-action-button-${scene.accent}`}
              aria-label={`${scene.name}${scene.actionLabel}`}
            >
              <span className="material-symbols-outlined filled-icon">
                {scene.actionLabel === '编辑' ? 'edit' : 'bolt'}
              </span>
              <span>{scene.actionLabel}</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Add list-page CSS matching the new composition**

```css
.owner-scenes-page {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.scene-mobile-header {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  padding: 2px 2px 6px;
}

.scene-mobile-title {
  margin: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}

.scene-list-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scene-list-card {
  position: relative;
  border-radius: 18px;
  padding: 14px 14px 52px;
  background: rgba(248, 249, 247, 0.95);
  border: 1px solid rgba(19, 45, 25, 0.06);
  box-shadow: 0 10px 24px rgba(52, 71, 57, 0.08);
}
```

- [ ] **Step 5: Run test to verify the list test passes**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: the list-page test passes; the detail-page test still fails until Task 4 is complete.

- [ ] **Step 6: Commit**

```bash
git add src/pages/owner/OwnerScenesPage.tsx src/shared/styles/global.css
git commit -m "feat: rebuild owner scenes list page"
```

### Task 4: Rebuild the owner scene detail page

**Files:**
- Modify: `src/pages/owner/OwnerSceneDetailPage.tsx`
- Modify: `src/shared/styles/global.css`
- Test: `src/test/page-content.test.tsx`

- [ ] **Step 1: Write only the structure needed to satisfy the failing detail test**

```tsx
export function OwnerSceneDetailPage() {
  return (
    <div>
      <h2>夜景模式</h2>
      <div>执行任务</div>
      <div>前院彩条灯</div>
      <div>在首页快捷菜单中显示</div>
      <button type="button">执行场景</button>
    </div>
  );
}
```

- [ ] **Step 2: Run test to verify the detail test moves toward green**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: the detail test now fails only on missing final structure/styling assumptions if any remain.

- [ ] **Step 3: Replace the temporary detail structure with a route-driven Stitch-style page**

```tsx
export function OwnerSceneDetailPage() {
  const { sceneId } = useParams();
  const scene = ownerScenes.find((item) => item.id === sceneId);
  const [quickAccessEnabled, setQuickAccessEnabled] = useState(scene?.quickAccessEnabled ?? false);

  if (!scene) {
    return <Link to="/owner/scenes" className="detail-link">返回场景列表</Link>;
  }

  return (
    <div className="scene-detail-page">
      <header className="scene-detail-header">
        <Link to="/owner/scenes" className="scene-icon-button scene-icon-button-link" aria-label="返回">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h2 className="scene-detail-header-title">{scene.name}</h2>
        <button type="button" className="scene-detail-edit">编辑</button>
      </header>

      <section className={`scene-detail-hero scene-detail-hero-${scene.accent}`}>
        <div className="scene-detail-hero-badge">
          <span className="material-symbols-outlined filled-icon">{scene.icon}</span>
        </div>
        <p className="scene-detail-overline">{scene.name}</p>
        <h3 className="scene-detail-title">{scene.name}</h3>
        <p className="scene-detail-copy">{scene.detailSubtitle}</p>
      </section>

      <section className="scene-toggle-card">
        <span>在首页快捷菜单中显示</span>
        <button
          type="button"
          aria-label="首页快捷菜单开关"
          className={`switch ${quickAccessEnabled ? 'switch-on' : 'switch-off'}`}
          onClick={() => setQuickAccessEnabled((current) => !current)}
        >
          <span className="switch-thumb" />
        </button>
      </section>

      <section className="scene-task-section">
        <div className="scene-task-section-heading">
          <h3>执行任务</h3>
          <span>{`${scene.tasks.length} 个设备`}</span>
        </div>
        <div className="scene-task-stack">
          {scene.tasks.map((task) => (
            <article key={task.name} className={`scene-task-card scene-task-card-${task.state}`}>
              <div className="scene-task-main">
                <div className="scene-task-icon">
                  <span className="material-symbols-outlined filled-icon">{task.icon}</span>
                </div>
                <div className="scene-task-copy">
                  <div className="scene-task-topline">
                    <strong>{task.name}</strong>
                    {task.valueLabel ? <span>{task.valueLabel}</span> : null}
                  </div>
                  <div className="scene-task-subline">
                    <span>{task.zone || '状态'}</span>
                    {task.statusText ? <span>{task.statusText}</span> : null}
                  </div>
                </div>
              </div>
              {typeof task.progress === 'number' ? (
                <div className="scene-task-progress">
                  <span style={{ width: `${task.progress * 100}%` }} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <button type="button" className="scene-detail-cta">
        <span className="material-symbols-outlined filled-icon">bolt</span>
        <span>执行场景</span>
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Add detail-page CSS for hero, toggle row, tasks, and sticky CTA**

```css
.scene-detail-page {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 6px;
}

.scene-detail-header {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
}

.scene-detail-hero {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 26px 18px 20px;
  text-align: center;
}

.scene-toggle-card,
.scene-task-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(18, 34, 24, 0.08);
  border-radius: 18px;
}

.scene-detail-cta {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 15px 18px;
  background: #0f6a2f;
  color: #fff;
  font-weight: 700;
}
```

- [ ] **Step 5: Run test to verify the detail test passes**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/owner/OwnerSceneDetailPage.tsx src/shared/styles/global.css
git commit -m "feat: rebuild owner scene detail page"
```

### Task 5: Run full verification

**Files:**
- Test: `src/test/page-content.test.tsx`
- Test: full test suite
- Test: production build

- [ ] **Step 1: Run the focused route tests**

Run: `npm test -- src/test/page-content.test.tsx`
Expected: PASS

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: Vite build succeeds with exit code 0

- [ ] **Step 4: Commit the verified scenes alignment work**

```bash
git add src/pages/owner/OwnerScenesPage.tsx src/pages/owner/OwnerSceneDetailPage.tsx src/shared/mock/owner.ts src/shared/styles/global.css src/test/page-content.test.tsx
git commit -m "feat: align owner scenes pages to stitch design"
```
