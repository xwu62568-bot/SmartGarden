import { Link, useParams } from 'react-router-dom';
import { installerCustomerDetails } from '../../shared/mock/installer';

export function InstallerCustomerDetailPage() {
  const { customerId } = useParams();
  const detail = customerId ? installerCustomerDetails[customerId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到客户。</div>;
  }

  return (
    <div className="installer-customer-detail-page">
      <header className="installer-customer-detail-header">
        <Link
          to="/installer/customers"
          className="installer-customer-detail-icon-button"
          aria-label="返回客户列表"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="installer-customer-detail-header-title">安装商门户</div>
        <button type="button" className="installer-customer-detail-icon-button" aria-label="搜索客户">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      <section className="installer-customer-detail-profile-card">
        <div className="installer-customer-detail-avatar">
          <span className="material-symbols-outlined">person</span>
        </div>

        <div className="installer-customer-detail-profile-copy">
          <div className="installer-customer-detail-name-row">
            <h1>{detail.name}</h1>
            <span className="installer-customer-detail-status">
              <span className="installer-customer-detail-status-dot" aria-hidden="true" />
              {detail.statusLabel}
            </span>
          </div>

          <div className="installer-customer-detail-contact-grid">
            <div className="installer-customer-detail-contact-row">
              <span className="material-symbols-outlined">call</span>
              <span>{detail.phone}</span>
            </div>
            <div className="installer-customer-detail-contact-row">
              <span className="material-symbols-outlined">mail</span>
              <span>{detail.email}</span>
            </div>
            <div className="installer-customer-detail-contact-row full-width">
              <span className="material-symbols-outlined">location_on</span>
              <span>{detail.address}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="installer-customer-detail-section">
        <h2>快捷操作</h2>
        <div className="installer-customer-detail-actions-grid">
          {detail.quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`installer-customer-detail-action-card installer-customer-detail-action-card-${action.tone}`}
            >
              <div className="installer-customer-detail-action-icon">
                <span className="material-symbols-outlined">{action.icon}</span>
              </div>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="installer-customer-detail-section">
        <div className="installer-customer-detail-section-head">
          <h2>项目</h2>
          <span>{detail.projectsSummary}</span>
        </div>

        <div className="installer-customer-detail-project-list">
          {detail.projects.map((project) => (
            <article key={project.id} className="installer-customer-detail-project-card">
              <div className="installer-customer-detail-project-top">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.subtitle}</p>
                </div>
                <span
                  className={`installer-customer-detail-project-status installer-customer-detail-project-status-${project.statusTone}`}
                >
                  {project.statusTone === 'active' ? (
                    <span className="installer-customer-detail-project-status-dot" aria-hidden="true" />
                  ) : null}
                  {project.status}
                </span>
              </div>

              <div className="installer-customer-detail-project-metrics">
                <div>
                  <span>设备 ID</span>
                  <strong>{project.deviceId}</strong>
                </div>
                <div>
                  <span>设备数量</span>
                  <strong>{project.deviceCount}</strong>
                </div>
                <div>
                  <span>最后同步</span>
                  <strong>{project.lastSync}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
