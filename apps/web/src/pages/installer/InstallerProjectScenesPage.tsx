import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const templateCards = [
  {
    id: 'night-mode',
    title: '夜景模式',
    icon: 'dark_mode',
    tone: 'primary',
    description: '日落后自动亮起核心区域照明，营造静谧氛围。',
    suggestions: ['路径灯: ON', '水下灯: 40%'],
  },
  {
    id: 'party-mode',
    title: '聚会模式',
    icon: 'celebration',
    tone: 'secondary',
    description: '开启全场高亮度照明与水景喷泉，律动十足。',
    suggestions: ['全区: 100%', '喷泉: Active'],
  },
  {
    id: 'eco-mode',
    title: '节能模式',
    icon: 'eco',
    tone: 'tertiary',
    description: '低功耗维持关键照明，最大限度减少能源支出。',
    suggestions: ['氛围灯: 10%', '循环泵: OFF'],
  },
] as const;

const createdScenes = [
  {
    id: 'night',
    title: '夜景模式',
    status: 'Active',
    statusTone: 'primary',
    icon: 'nights_stay',
    tone: 'primary',
    subtitle: '包含 4 个设备 • 最后修改: 2小时前',
    deviceStates: ['路径灯 (80%)', '泳池射灯 (ON)', '草坪喷淋 (OFF)', '景墙灯廊 (50%)'],
    highlighted: [true, true, false, true],
    ownerVisible: true,
    ownerEditable: false,
    badges: ['可见', '锁定'],
    badgeIcons: ['visibility', 'lock'],
  },
  {
    id: 'party',
    title: '聚会模式',
    status: 'Inactive',
    statusTone: 'muted',
    icon: 'festival',
    tone: 'secondary',
    subtitle: '包含 8 个设备 • 最后修改: 3天前',
    deviceStates: [],
    highlighted: [],
    ownerVisible: true,
    ownerEditable: true,
    badges: ['可编辑'],
    badgeIcons: ['edit'],
  },
] as const;

const healthMetrics = [
  { id: 'signal', label: '信号强度', value: '-42 dBm', width: '85%', tone: 'primary-fixed' },
  { id: 'load', label: '系统负载', value: '24.2%', width: '24%', tone: 'secondary-fixed-dim' },
  { id: 'connectivity', label: '设备连通', value: '14/15', width: '93%', tone: 'error' },
] as const;

export function InstallerProjectScenesPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;
  const [createdTemplateId, setCreatedTemplateId] = useState<string | null>(null);

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-scenes-page">
      <header className="installer-project-scenes-topbar">
        <div className="installer-project-scenes-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}`}
            className="installer-project-scenes-icon-button"
            aria-label="返回项目详情"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-project-scenes-title-wrap">
            <h1>场景预设</h1>
            <span>{`项目：${detail.name}`}</span>
          </div>
        </div>

        <button type="button" className="installer-project-scenes-icon-button" aria-label="设置">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="installer-project-scenes-main">
        <section className="installer-project-scenes-hero">
          <div>
            <h2>智能控制中心</h2>
            <p>配置并同步自动化场景至客户端</p>
          </div>
          <button type="button" className="installer-project-scenes-add-button">
            <span className="material-symbols-outlined">add_circle</span>
            <span>添加场景</span>
          </button>
        </section>

        <section className="installer-project-scenes-section">
          <div className="installer-project-scenes-section-head">
            <h3>
              <span className="material-symbols-outlined">recommend</span>
              <span>推荐模板</span>
            </h3>
            <span>查看更多</span>
          </div>

          <div className="installer-project-scenes-template-row">
            {templateCards.map((template) => {
              const created = createdTemplateId === template.id;

              return (
                <article key={template.id} className="installer-project-scenes-template-card">
                  <div className="installer-project-scenes-template-top">
                    <div className={`installer-project-scenes-template-icon installer-project-scenes-template-icon-${template.tone}`}>
                      <span className="material-symbols-outlined">{template.icon}</span>
                    </div>
                    <span>{template.title}</span>
                  </div>

                  <p>{template.description}</p>

                  <div className="installer-project-scenes-suggestion-box">
                    <div>建议操作</div>
                    <div className="installer-project-scenes-suggestion-tags">
                      {template.suggestions.map((suggestion) => (
                        <span key={suggestion}>{suggestion}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="installer-project-scenes-create-button"
                    onClick={() => setCreatedTemplateId(template.id)}
                  >
                    {created ? '已创建' : '一键创建'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="installer-project-scenes-section">
          <h3 className="installer-project-scenes-list-title">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>已创建场景</span>
          </h3>

          <div className="installer-project-scenes-card-stack">
            {createdScenes.map((scene) => (
              <article
                key={scene.id}
                className={scene.statusTone === 'muted' ? 'installer-project-scenes-card muted' : 'installer-project-scenes-card'}
              >
                <div className="installer-project-scenes-card-head">
                  <div className="installer-project-scenes-card-main">
                    <div className={`installer-project-scenes-card-icon installer-project-scenes-card-icon-${scene.tone}`}>
                      <span className="material-symbols-outlined">{scene.icon}</span>
                    </div>
                    <div>
                      <h4>
                        {scene.title}
                        <span className={scene.statusTone === 'primary' ? 'installer-project-scenes-status-badge active' : 'installer-project-scenes-status-badge'}>
                          {scene.status}
                        </span>
                      </h4>
                      <p>{scene.subtitle}</p>
                    </div>
                  </div>
                  <button type="button" className="installer-project-scenes-edit-button" aria-label={`编辑${scene.title}`}>
                    <span className="material-symbols-outlined">edit_note</span>
                  </button>
                </div>

                {scene.deviceStates.length > 0 ? (
                  <div className="installer-project-scenes-device-grid">
                    {scene.deviceStates.map((deviceState, index) => (
                      <div key={deviceState} className="installer-project-scenes-device-row">
                        <span className={scene.highlighted[index] ? 'installer-project-scenes-device-dot active' : 'installer-project-scenes-device-dot'} />
                        <span>{deviceState}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="installer-project-scenes-permission-row">
                  <div className="installer-project-scenes-toggle-group">
                    <label className="installer-project-scenes-toggle-label">
                      <button type="button" aria-pressed={scene.ownerVisible} className={scene.ownerVisible ? 'installer-project-scenes-switch active' : 'installer-project-scenes-switch'}>
                        <span />
                      </button>
                      <span>展示给屋主</span>
                    </label>
                    <label className="installer-project-scenes-toggle-label">
                      <button type="button" aria-pressed={scene.ownerEditable} className={scene.ownerEditable ? 'installer-project-scenes-switch active' : 'installer-project-scenes-switch'}>
                        <span />
                      </button>
                      <span>允许屋主编辑</span>
                    </label>
                  </div>

                  <div className="installer-project-scenes-badge-row">
                    {scene.badges.map((badge, index) => (
                      <span key={badge} className={badge === '可编辑' ? 'installer-project-scenes-meta-badge editable' : 'installer-project-scenes-meta-badge'}>
                        <span className="material-symbols-outlined">{scene.badgeIcons[index]}</span>
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="installer-project-scenes-health-card">
          <div className="installer-project-scenes-health-head">
            <h4>项目健康度 - 系统状态</h4>
            <span className="material-symbols-outlined">insights</span>
          </div>

          <div className="installer-project-scenes-health-grid">
            {healthMetrics.map((metric) => (
              <div key={metric.id}>
                <div className="installer-project-scenes-health-label">{metric.label}</div>
                <div className="installer-project-scenes-health-value">{metric.value}</div>
                <div className="installer-project-scenes-health-track">
                  <div
                    className={`installer-project-scenes-health-fill installer-project-scenes-health-fill-${metric.tone}`}
                    style={{ width: metric.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="installer-project-scenes-health-glow" aria-hidden="true" />
          <div className="installer-project-scenes-health-mesh" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}
