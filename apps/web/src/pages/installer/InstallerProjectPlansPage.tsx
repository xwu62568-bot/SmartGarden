import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const categories = ['全部', '灯光', '水景', '灌溉', '户外设备'] as const;

const templates = [
  {
    id: 'night-lighting',
    name: '每日夜景灯光',
    subtitle: '日落后 15 分钟',
    icon: 'light_mode',
    tone: 'primary',
  },
  {
    id: 'morning-irrigation',
    name: '早晨浇水',
    subtitle: '周一/三/五 06:30',
    icon: 'opacity',
    tone: 'secondary',
  },
  {
    id: 'day-fountain',
    name: '白天喷泉',
    subtitle: '08:00 - 22:00',
    icon: 'sprinkler',
    tone: 'tertiary',
  },
] as const;

const schedules = [
  {
    id: 'daily-light',
    name: '每日夜景',
    type: '灯光',
    icon: 'lightbulb',
    tone: 'primary',
    meta: [
      { icon: 'schedule', text: '日落后 15 分钟' },
      { icon: 'settings_input_component', text: '4 个动作' },
    ],
    enabled: true,
    ownerEditable: true,
    locked: false,
  },
  {
    id: 'backyard-irrigation',
    name: '后院滴灌',
    type: '灌溉',
    icon: 'water_drop',
    tone: 'secondary',
    meta: [
      { icon: 'calendar_today', text: '每周一、三、五 06:30' },
      { icon: 'settings_input_component', text: '2 个动作' },
    ],
    enabled: false,
    ownerEditable: false,
    locked: false,
  },
  {
    id: 'holiday-outlet-protection',
    name: '节日插座保护',
    type: '户外设备',
    icon: 'electrical_services',
    tone: 'tertiary',
    meta: [
      { icon: 'timer', text: '开启后自动计时' },
      { icon: 'history', text: '最长运行 6 小时' },
    ],
    enabled: true,
    ownerEditable: false,
    locked: true,
  },
] as const;

export function InstallerProjectPlansPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('全部');
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(null);

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-plans-page">
      <header className="installer-project-plans-topbar">
        <div className="installer-project-plans-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}`}
            className="installer-project-plans-back"
            aria-label="返回项目详情"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-project-plans-title-wrap">
            <h1>计划配置</h1>
            <span>{`项目：${detail.name}`}</span>
          </div>
        </div>

        <button type="button" className="installer-project-plans-add">
          添加
        </button>
      </header>

      <main className="installer-project-plans-main">
        <section className="installer-project-plans-tabs" aria-label="计划分类">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'installer-project-plans-tab active' : 'installer-project-plans-tab'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="installer-project-plans-section">
          <div className="installer-project-plans-section-head">
            <h2>
              <span className="material-symbols-outlined filled-icon">auto_awesome</span>
              <span>推荐模板</span>
            </h2>
            <button type="button">查看更多</button>
          </div>

          <div className="installer-project-plans-template-row">
            {templates.map((template) => {
              const applied = appliedTemplateId === template.id;

              return (
                <article key={template.id} className="installer-project-plans-template-card">
                  <div className="installer-project-plans-template-head">
                    <div className={`installer-project-plans-template-icon installer-project-plans-template-icon-${template.tone}`}>
                      <span className="material-symbols-outlined">{template.icon}</span>
                    </div>
                    <div>
                      <h3>{template.name}</h3>
                      <p>{template.subtitle}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={applied ? 'installer-project-plans-template-apply applied' : 'installer-project-plans-template-apply'}
                    onClick={() => setAppliedTemplateId(template.id)}
                  >
                    {applied ? '已应用' : '一键应用'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="installer-project-plans-section">
          <h2 className="installer-project-plans-list-title">已创建计划</h2>

          <div className="installer-project-plans-card-stack">
            {schedules.map((schedule) => (
              <article
                key={schedule.id}
                className={schedule.locked ? 'installer-project-plans-schedule-card locked' : 'installer-project-plans-schedule-card'}
              >
                <div className="installer-project-plans-schedule-top">
                  <div className="installer-project-plans-schedule-main">
                    <div className={`installer-project-plans-schedule-icon installer-project-plans-schedule-icon-${schedule.tone}`}>
                      <span className="material-symbols-outlined">{schedule.icon}</span>
                    </div>
                    <div className="installer-project-plans-schedule-copy">
                      <div className="installer-project-plans-schedule-title-row">
                        <h3>{schedule.name}</h3>
                        <span className={`installer-project-plans-type-badge installer-project-plans-type-badge-${schedule.tone}`}>
                          {schedule.type}
                        </span>
                      </div>
                      {schedule.meta.map((item) => (
                        <p key={item.text}>
                          <span className="material-symbols-outlined">{item.icon}</span>
                          <span>{item.text}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={schedule.enabled}
                    className={schedule.enabled ? 'installer-project-plans-switch active' : 'installer-project-plans-switch'}
                  >
                    <span />
                  </button>
                </div>

                <div className={schedule.locked ? 'installer-project-plans-owner-row locked' : 'installer-project-plans-owner-row'}>
                  <div>
                    <span>允许屋主编辑</span>
                    {schedule.locked ? <span className="material-symbols-outlined">lock</span> : null}
                  </div>
                  <button
                    type="button"
                    aria-pressed={schedule.ownerEditable}
                    disabled={schedule.locked}
                    className={
                      schedule.locked
                        ? 'installer-project-plans-owner-switch disabled'
                        : schedule.ownerEditable
                          ? 'installer-project-plans-owner-switch active'
                          : 'installer-project-plans-owner-switch'
                    }
                  >
                    <span />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="installer-project-plans-glow installer-project-plans-glow-primary" aria-hidden="true" />
        <div className="installer-project-plans-glow installer-project-plans-glow-secondary" aria-hidden="true" />
      </main>
    </div>
  );
}
