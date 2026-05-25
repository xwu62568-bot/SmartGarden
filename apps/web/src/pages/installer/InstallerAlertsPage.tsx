import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { installerAlerts } from '../../shared/mock/installer';

const alertFilters = ['全部', '未处理', '严重', '设备离线', '水位异常', '补水异常', '水泵异常', '灌溉异常', '已解决'] as const;

function alertMatchesFilter(filter: (typeof alertFilters)[number], alertId: string) {
  if (filter === '全部') return true;
  if (filter === '未处理') return true;
  if (filter === '严重') return alertId === 'a-001' || alertId === 'a-003';
  if (filter === '设备离线') return alertId === 'a-002';
  if (filter === '水位异常') return alertId === 'a-001';
  if (filter === '补水异常') return alertId === 'a-003';
  if (filter === '水泵异常') return false;
  if (filter === '灌溉异常') return false;
  if (filter === '已解决') return false;
  return true;
}

export function InstallerAlertsPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof alertFilters)[number]>('全部');

  const visibleAlerts = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    return installerAlerts.filter((alert) => {
      const matchesKeyword =
        keyword.length === 0 ||
        [alert.title, alert.source, alert.customerName, alert.deviceName]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(keyword));

      return matchesKeyword && alertMatchesFilter(activeFilter, alert.id);
    });
  }, [activeFilter, searchValue]);

  return (
    <div className="installer-alerts-page">
      <header className="installer-alerts-bar">
        <h1>告警</h1>
        <button type="button">批量处理</button>
      </header>

      <div className="installer-alert-search-row">
        <div className="installer-alert-search">
          <span className="material-symbols-outlined">search</span>
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="搜索项目、客户、设备"
          />
        </div>
        <button type="button" className="installer-alert-filter-button" aria-label="筛选">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      <section className="installer-alert-overview-grid">
        <article className="installer-alert-overview-card">
          <span>未处理</span>
          <strong>5</strong>
        </article>
        <article className="installer-alert-overview-card danger">
          <span>严重告警</span>
          <strong>2</strong>
        </article>
        <article className="installer-alert-overview-card">
          <span>设备离线</span>
          <strong>3</strong>
        </article>
        <article className="installer-alert-overview-card warning">
          <span>今日新增</span>
          <strong>4</strong>
        </article>
      </section>

      <section className="installer-alert-banner">
        <span className="material-symbols-outlined filled-icon">warning</span>
        <div>
          <strong>有 2 条严重告警需要立即处理</strong>
        </div>
        <span className="material-symbols-outlined">chevron_right</span>
      </section>

      <div className="installer-alert-filters">
        {alertFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={filter === activeFilter ? 'installer-alert-chip active' : 'installer-alert-chip'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="installer-alert-card-stack">
        {visibleAlerts.map((alert) => {
          const isCritical = alert.level === '高';
          const isProcessing = alert.status === '处理中';
          const toneClass = isProcessing ? 'processing' : isCritical ? 'danger' : 'warning';

          return (
            <article key={alert.id} className={`installer-alert-card ${toneClass}`}>
              <div className="installer-alert-rail" />
              <div className="installer-alert-card-head">
                <div className="installer-alert-title-row">
                  <span className="material-symbols-outlined filled-icon">{alert.icon}</span>
                  <h2>{alert.title}</h2>
                  <span className={`installer-alert-level ${isCritical ? 'danger' : 'warning'}`}>
                    {isCritical ? '严重' : '警告'}
                  </span>
                </div>
                <span className="installer-alert-time">{alert.time}</span>
              </div>

              <div className="installer-alert-meta-grid">
                <div>
                  <label>项目</label>
                  <strong>{`${alert.source} (${alert.customerName})`}</strong>
                </div>
                <div>
                  <label>设备</label>
                  <strong>{`${alert.deviceName} (${alert.deviceZone})`}</strong>
                </div>
                <div className="installer-alert-status-block">
                  <label>状态</label>
                  <div className="installer-alert-status-line">
                    <span className="installer-alert-status-dot" />
                    <strong>{alert.status}</strong>
                  </div>
                </div>
              </div>

              <div className="installer-alert-note-box">
                <p>{`说明: ${alert.note}`}</p>
              </div>

              <div className="installer-alert-actions">
                <button
                  type="button"
                  className="ghost"
                  onClick={() => navigate(`/installer/alerts/${alert.id}`, { state: { backTo: '/installer/alerts' } })}
                >
                  查看详情
                </button>
                <button type="button" className={isProcessing ? 'soft' : 'solid'}>
                  {alert.actionLabel}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
