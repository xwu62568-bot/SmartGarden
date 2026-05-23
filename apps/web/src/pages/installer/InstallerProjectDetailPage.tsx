import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails, installerProjects } from '../../shared/mock/installer';

const deliveryStatusLabel = '交付状态';
const authorizationLabel = '项目授权';

export function InstallerProjectDetailPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;
  const project = installerProjects.find((item) => item.id === projectId);

  if (!detail || !project) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-detail-page">
      <header className="installer-project-detail-header">
        <div className="installer-project-detail-header-row">
          <div className="installer-project-detail-title-wrap">
            <Link
              to="/installer/projects"
              className="installer-project-detail-icon-button"
              aria-label="返回项目列表"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h1>{detail.name}</h1>
            </div>
          </div>
          <div className="installer-project-detail-header-actions">
            <button type="button" className="installer-project-detail-icon-button" aria-label="分享项目">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button type="button" className="installer-project-detail-icon-button primary" aria-label="添加项目内容">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        <div className="installer-project-detail-subheader">
          <div className="installer-project-detail-meta">
            <div className="installer-project-detail-badges">
              <span className="installer-project-detail-status">
                <span className="installer-project-detail-status-dot" aria-hidden="true" />
                {detail.status}
              </span>
              <span className="installer-project-detail-customer">客户: {detail.customerName}</span>
            </div>
            <div className="installer-project-detail-location">
              <span className="material-symbols-outlined">location_on</span>
              <span>{detail.address}</span>
            </div>
          </div>

          <div className="installer-project-detail-hero-thumb">
            <img src={detail.heroImage} alt={`${detail.name} 项目预览`} />
          </div>
        </div>
      </header>

      <section className="installer-project-detail-overview-card">
        <div className="installer-project-detail-stat-grid">
          <div className="installer-project-detail-stat">
            <span>设备总数</span>
            <strong>{detail.totalDevices}</strong>
          </div>
          <div className="installer-project-detail-stat">
            <span>在线设备</span>
            <strong className="secondary">{detail.onlineDevices}</strong>
          </div>
          <div className="installer-project-detail-stat">
            <span>当前告警</span>
            <strong className="danger">{detail.activeAlerts}</strong>
          </div>
        </div>

        <div className="installer-project-detail-overview-list">
          <div className="installer-project-detail-overview-row">
            <span>{deliveryStatusLabel}</span>
            <strong>{detail.deliveryStatus}</strong>
          </div>
          <div className="installer-project-detail-overview-row">
            <span>{authorizationLabel}</span>
            <strong className="authorized">{detail.authorizationLabel}</strong>
          </div>
        </div>
      </section>

      <section className="installer-project-detail-section">
        <h2>快捷操作</h2>
        <div className="installer-project-detail-action-row">
          {detail.quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`installer-project-detail-action-card installer-project-detail-action-card-${action.tone}`}
            >
              <span className="material-symbols-outlined">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="installer-project-detail-section">
        <h2>项目模块</h2>
        <div className="installer-project-detail-module-grid">
          {detail.modules.map((module) => (
            <button
              key={module.id}
              type="button"
              className={`installer-project-detail-module-card installer-project-detail-module-card-${module.tone}`}
            >
              <span className="installer-project-detail-module-icon-wrap">
                <span className="material-symbols-outlined">{module.icon}</span>
                {module.tone === 'danger' ? <span className="installer-project-detail-module-dot" aria-hidden="true" /> : null}
              </span>
              <span>{module.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="installer-project-detail-section installer-project-detail-alerts-section">
        <div className="installer-project-detail-section-head">
          <h2>最近告警</h2>
          <button type="button">查看全部</button>
        </div>

        <div className="installer-project-detail-alert-list">
          {detail.recentAlerts.map((alert) => (
            <article
              key={alert.id}
              className={`installer-project-detail-alert-card installer-project-detail-alert-card-${alert.tone}`}
            >
              <div className="installer-project-detail-alert-icon">
                <span className="material-symbols-outlined">{alert.icon}</span>
              </div>
              <div className="installer-project-detail-alert-copy">
                <div className="installer-project-detail-alert-top">
                  <strong>{alert.title}</strong>
                  <span>{alert.time}</span>
                </div>
                <p>{alert.message}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button type="button" className="installer-project-detail-fab" aria-label="添加项目照片">
        <span className="material-symbols-outlined">add_a_photo</span>
      </button>
    </div>
  );
}
