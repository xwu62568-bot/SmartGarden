import { useNavigate } from 'react-router-dom';

const overviewStats = [
  { label: '项目总数', value: '18', tone: 'default' },
  { label: '待交付', value: '2', tone: 'secondary' },
  { label: '未处理告警', value: '5', tone: 'danger' },
  { label: '离线设备', value: '3', tone: 'warning' },
] as const;

const quickActions = [
  { label: '新建项目', icon: 'add_business', tone: 'primary', to: '/installer/projects' },
  { label: '继续安装', icon: 'play_circle', tone: 'tertiary', to: '/installer/projects' },
  { label: '查看告警', icon: 'report_problem', tone: 'danger', to: '/installer/alerts' },
] as const;

const pendingItems = [
  { title: '王先生后院', badge: '水位低', count: '1 条', tone: 'warning', to: '/installer/customers/c-88' },
  { title: '李女士花园', badge: '网关离线', count: '1 条', tone: 'danger', to: '/installer/alerts/a-001' },
  { title: 'XX 餐厅水景', badge: '喷泉泵运行失败', count: '1 条', tone: 'danger', to: '/installer/alerts/a-002' },
] as const;

const maintenanceFeed = [
  { time: '昨天 15:30', text: '昨天处理了喷泉泵异常', tone: 'muted' },
  { time: '今天 08:15', text: '今天有 2 个项目设备离线', tone: 'danger' },
] as const;

export function InstallerWorkbenchPage() {
  const navigate = useNavigate();

  return (
    <div className="installer-workbench">
      <header className="installer-workbench-bar">
        <div className="installer-workbench-bar-copy">
          <h1>HyecoSmart</h1>
          <p>张三（高级工程师）</p>
        </div>
        <button type="button" className="installer-workbench-notice" aria-label="通知">
          <span className="material-symbols-outlined">notifications</span>
          <span className="installer-workbench-notice-dot" />
        </button>
      </header>

      <section className="installer-overview-card">
        <div className="installer-overview-grid">
          {overviewStats.map((item) => (
            <article
              key={item.label}
              className={`installer-overview-metric installer-overview-metric-${item.tone}`}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-quick-grid">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="installer-quick-card"
            onClick={() => navigate(action.to)}
          >
            <div className={`installer-quick-icon installer-quick-icon-${action.tone}`}>
              <span className="material-symbols-outlined filled-icon">{action.icon}</span>
            </div>
            <span>{action.label}</span>
          </button>
        ))}
      </section>

      <section className="installer-section">
        <div className="installer-section-head">
          <h2>待处理事项</h2>
          <button type="button" onClick={() => navigate('/installer/alerts')}>
            全部
          </button>
        </div>
        <div className="installer-pending-stack">
          {pendingItems.map((item) => (
            <article
              key={item.title}
              className={`installer-pending-card installer-pending-card-${item.tone}`}
            >
              <div className="installer-pending-copy">
                <strong>{item.title}</strong>
                <div className="installer-pending-meta">
                  <span className={`installer-pill installer-pill-${item.tone}`}>{item.badge}</span>
                  <span className="installer-pending-count">
                    <span className="material-symbols-outlined">info</span>
                    {item.count}
                  </span>
                </div>
              </div>
              <button type="button" className="installer-pending-action" onClick={() => navigate(item.to)}>
                查看
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-section installer-section-last">
        <h2>近期维护动态</h2>
        <div className="installer-feed-card">
          {maintenanceFeed.map((item, index) => (
            <article key={item.time} className={`installer-feed-item ${index > 0 ? 'installer-feed-item-linked' : ''}`}>
              <span className={`installer-feed-dot installer-feed-dot-${item.tone}`} />
              <div className="installer-feed-copy">
                <span>{item.time}</span>
                <strong>{item.text}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
