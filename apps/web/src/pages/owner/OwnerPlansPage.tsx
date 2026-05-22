import { useState } from 'react';

type PlanCard = {
  id: string;
  kind: '灯光计划' | '水景计划' | '灌溉计划' | '保护规则';
  title: string;
  icon: string;
  accent: 'primary' | 'secondary' | 'danger';
  summary: string;
  extra?: string;
  enabled: boolean;
};

const planTabs = ['全部', '灯光', '水景', '灌溉', '保护'] as const;

const planCards: PlanCard[] = [
  {
    id: 'daily-lighting',
    kind: '灯光计划',
    title: '每日夜景灯光',
    icon: 'wb_twilight',
    accent: 'primary',
    summary: '日落后 15 分钟',
    extra: '执行：前院灯 / 后院灯 / 水下灯',
    enabled: true,
  },
  {
    id: 'day-fountain',
    kind: '水景计划',
    title: '白天喷泉',
    icon: 'water_drop',
    accent: 'secondary',
    summary: '08:00 - 22:00',
    enabled: true,
  },
  {
    id: 'morning-irrigation',
    kind: '灌溉计划',
    title: '早晨浇水',
    icon: 'potted_plant',
    accent: 'primary',
    summary: '周一三五 06:30',
    extra: '雨天跳过开启',
    enabled: true,
  },
  {
    id: 'low-water-protection',
    kind: '保护规则',
    title: '缺水停泵',
    icon: 'warning',
    accent: 'danger',
    summary: '触发：水位低',
    enabled: true,
  },
];

export function OwnerPlansPage() {
  const [activeTab, setActiveTab] = useState<(typeof planTabs)[number]>('全部');

  const visiblePlans = planCards.filter((plan) => {
    if (activeTab === '全部') return true;
    if (activeTab === '灯光') return plan.kind === '灯光计划';
    if (activeTab === '水景') return plan.kind === '水景计划';
    if (activeTab === '灌溉') return plan.kind === '灌溉计划';
    return plan.kind === '保护规则';
  });

  return (
    <div className="owner-plans-page">
      <header className="owner-plans-header">
        <div className="owner-plans-header-spacer" aria-hidden="true" />
        <h1 className="owner-plans-title">计划</h1>
        <button type="button" className="owner-plans-add-button" aria-label="新增计划">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <nav className="owner-plans-tabs" aria-label="计划分类">
        {planTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`owner-plans-tab${tab === activeTab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="owner-plans-hero">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXPhy3JQBnATmoV0e9NhByazONnhAoFu9SXm3ZXypmhbsGBNKJMftves_ojFqUci4iEhZz5Cba4tbqkoBPySKe3yrUA7PFYJMW49VCjtkccfgp05OimNWfxICWWhS35ranuRjrePS2GTCYqBu5C9WJaJ1TO5QD1_3euvaUcHUinMUg4WZgn4JJDdLUVv2Z4IXa-5A5gYYhvyfRmh7CCDc9U8bYH7AemONh5dP5U4-zynXdEb46jOicmeDIv2Gw96op9ukS7aqOqCc"
          alt=""
        />
        <div className="owner-plans-hero-overlay" />
        <div className="owner-plans-hero-copy">
          <p>智能计划摘要</p>
          <h2>今日预计节省 15% 灌溉用水</h2>
        </div>
      </section>

      <section className="owner-plans-card-list">
        {visiblePlans.map((plan) => (
          <article
            key={plan.id}
            className={`owner-plan-card owner-plan-card-${plan.accent}${plan.kind === '保护规则' ? ' is-protection' : ''}`}
          >
            {plan.kind === '保护规则' ? (
              <div className="owner-plan-protection-mark" aria-hidden="true">
                <span className="material-symbols-outlined">gpp_maybe</span>
              </div>
            ) : null}

            <div className="owner-plan-card-top">
              <div className="owner-plan-card-main">
                <div className={`owner-plan-icon owner-plan-icon-${plan.accent}`}>
                  <span className="material-symbols-outlined">{plan.icon}</span>
                </div>
                <div>
                  <span className={`owner-plan-kind owner-plan-kind-${plan.accent}`}>{plan.kind}</span>
                  <h3 className="owner-plan-title">{plan.title}</h3>
                </div>
              </div>

              <label className="owner-plan-switch-wrap">
                <input type="checkbox" checked={plan.enabled} readOnly />
                <span className={`owner-plan-switch owner-plan-switch-${plan.accent}`} />
              </label>
            </div>

            <div className="owner-plan-card-bottom">
              <div className={`owner-plan-summary owner-plan-summary-${plan.accent}`}>
                <span className="material-symbols-outlined">
                  {plan.kind === '灯光计划'
                    ? 'schedule'
                    : plan.kind === '水景计划'
                      ? 'access_time'
                      : plan.kind === '灌溉计划'
                        ? 'calendar_month'
                        : 'sensors'}
                </span>
                <span>{plan.summary}</span>
              </div>
              {plan.extra ? (
                <div className={`owner-plan-extra${plan.kind === '灌溉计划' ? ' irrigation' : ''}`}>
                  {plan.kind === '灌溉计划' ? <span className="material-symbols-outlined">cloud_off</span> : null}
                  <p>{plan.extra}</p>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
