import { useState } from 'react';
import { Link } from 'react-router-dom';

const sceneIcons = ['outdoor_grill', 'brightness_3', 'local_fire_department', 'celebration', 'home', 'park'] as const;

const sceneTemplates = [
  { id: 'night', label: '夜景', icon: 'nights_stay', tone: 'indigo' },
  { id: 'party', label: '聚会', icon: 'festival', tone: 'pink' },
  { id: 'away', label: '离家', icon: 'door_front', tone: 'amber' },
  { id: 'holiday', label: '节日', icon: 'redeem', tone: 'red' },
  { id: 'custom', label: '自定义', icon: 'add', tone: 'primary' },
] as const;

const sceneCategories = ['灯光', '水景', '户外设备', '灌溉'] as const;

type SceneCreateTask = {
  id: string;
  name: string;
  summary: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'tertiary';
  status?: string;
  meterLabel?: string;
  meterValue?: number;
  muted?: boolean;
};

const sceneTasks: SceneCreateTask[] = [
  {
    id: 'patio-light',
    name: '露台灯带',
    summary: '动作：开启 | 暖白',
    icon: 'light_mode',
    tone: 'primary',
    status: '运行中',
    meterLabel: '70%',
    meterValue: 70,
  },
  {
    id: 'fountain',
    name: '喷泉',
    summary: '动作：开启 | 持续2小时',
    icon: 'waves',
    tone: 'secondary',
  },
  {
    id: 'irrigation',
    name: '后院滴灌',
    summary: '动作：暂停运行',
    icon: 'water_drop',
    tone: 'tertiary',
    status: '已挂起',
    muted: true,
  },
] as const;

export function OwnerSceneCreatePage() {
  const [sceneName, setSceneName] = useState('烧烤模式');
  const [sceneDescription, setSceneDescription] = useState('开启所有氛围灯光，开启瀑布水景。');
  const [selectedIcon, setSelectedIcon] = useState<typeof sceneIcons[number]>('outdoor_grill');
  const [quickAccessEnabled, setQuickAccessEnabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState<typeof sceneCategories[number]>('灯光');

  return (
    <div className="owner-scene-create-page">
      <header className="owner-scene-create-topbar">
        <div className="owner-scene-create-topbar-main">
          <Link to="/owner/scenes" className="owner-scene-create-back" aria-label="返回场景列表">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1>创建场景</h1>
        </div>
        <button type="button" className="owner-scene-create-save">
          保存
        </button>
      </header>

      <section className="owner-scene-create-card owner-scene-create-basics">
        <div className="owner-scene-create-field">
          <label htmlFor="scene-name">场景名称</label>
          <input id="scene-name" value={sceneName} onChange={(event) => setSceneName(event.target.value)} />
        </div>

        <div className="owner-scene-create-field">
          <span>场景图标</span>
          <div className="owner-scene-create-icon-row">
            {sceneIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                className={icon === selectedIcon ? 'owner-scene-create-icon active' : 'owner-scene-create-icon'}
                onClick={() => setSelectedIcon(icon)}
                aria-label={`选择图标${icon}`}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="owner-scene-create-field">
          <label htmlFor="scene-description">描述信息</label>
          <textarea
            id="scene-description"
            rows={2}
            value={sceneDescription}
            onChange={(event) => setSceneDescription(event.target.value)}
          />
        </div>

        <div className="owner-scene-create-toggle-row">
          <span>显示在首页快捷场景</span>
          <button
            type="button"
            aria-label="显示在首页快捷场景开关"
            className={quickAccessEnabled ? 'switch switch-on' : 'switch switch-off'}
            onClick={() => setQuickAccessEnabled((current) => !current)}
          >
            <span className="switch-thumb" />
          </button>
        </div>
      </section>

      <section className="owner-scene-create-section">
        <h2>常用模版</h2>
        <div className="owner-scene-create-template-row">
          {sceneTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              className={template.tone === 'primary' ? 'owner-scene-template owner-scene-template-primary' : 'owner-scene-template'}
            >
              <span className={`owner-scene-template-icon owner-scene-template-icon-${template.tone}`}>
                <span className="material-symbols-outlined">{template.icon}</span>
              </span>
              <span>{template.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="owner-scene-create-section">
        <div className="owner-scene-create-section-head">
          <h2>添加执行任务</h2>
          <button type="button" className="owner-scene-create-link">
            <span className="material-symbols-outlined">add_circle</span>
            <span>添加设备</span>
          </button>
        </div>

        <div className="owner-scene-create-categories" role="tablist" aria-label="设备类型">
          {sceneCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={category === activeCategory}
              className={category === activeCategory ? 'owner-scene-category active' : 'owner-scene-category'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="owner-scene-task-stack">
          {sceneTasks.map((task) => (
            <article
              key={task.id}
              className={task.muted ? 'owner-scene-task-card owner-scene-task-card-muted' : 'owner-scene-task-card'}
            >
              <div className={`owner-scene-task-icon owner-scene-task-icon-${task.tone}`}>
                <span className="material-symbols-outlined">{task.icon}</span>
              </div>
              <div className="owner-scene-task-content">
                <div className="owner-scene-task-head">
                  <div>
                    <h3>{task.name}</h3>
                    <p>{task.summary}</p>
                  </div>
                  {task.status ? (
                    <span className={task.tone === 'primary' ? 'owner-scene-task-status owner-scene-task-status-primary' : 'owner-scene-task-status'}>
                      {task.status}
                    </span>
                  ) : (
                    <button type="button" className="owner-scene-task-more" aria-label={`${task.name}更多操作`}>
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  )}
                </div>

                {task.meterValue ? (
                  <div className="owner-scene-task-meter">
                    <span className="material-symbols-outlined">brightness_low</span>
                    <div className="owner-scene-task-meter-track">
                      <div className="owner-scene-task-meter-fill" style={{ width: `${task.meterValue}%` }} />
                    </div>
                    <strong>{task.meterLabel}</strong>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="owner-scene-create-note">
        <span className="material-symbols-outlined">lock</span>
        <p>
          补水阀、水位保护等关键设备已锁定，以确保系统安全运行。如需调整，请前往系统设置或联系专业安装商。
        </p>
      </section>

      <footer className="owner-scene-create-footer">
        <button type="button" className="owner-scene-create-preview">
          <span className="material-symbols-outlined">play_circle</span>
          <span>预览场景</span>
        </button>
        <button type="button" className="owner-scene-create-submit">
          保存场景
        </button>
      </footer>
    </div>
  );
}
