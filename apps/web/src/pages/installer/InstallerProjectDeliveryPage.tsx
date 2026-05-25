import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const deliveryChecklist = [
  { label: '设备命名与区域归档', status: '已完成', tone: 'done' },
  { label: '通道测试与保护规则验证', status: '已完成', tone: 'done' },
  { label: '点位图与维护资料上传', status: '待确认', tone: 'pending' },
  { label: '客户培训与屋主授权', status: '待执行', tone: 'warning' },
] as const;

const handoverItems = [
  { title: '项目资料包', detail: '包含点位图、设备清单、维护建议与巡检说明。', icon: 'folder_managed' },
  { title: '客户培训清单', detail: '讲解告警处理、计划使用、日常清洁与冬季停机流程。', icon: 'school' },
  { title: '售后服务承诺', detail: '确认首月巡检时间、紧急联系人与远程支持范围。', icon: 'support_agent' },
] as const;

export function InstallerProjectDeliveryPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-delivery-page">
      <header className="installer-project-delivery-header">
        <div className="installer-project-delivery-header-row">
          <div className="installer-project-delivery-title-wrap">
            <Link
              to={`/installer/projects/${detail.id}`}
              className="installer-project-delivery-icon-button"
              aria-label="返回项目详情"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h1>项目交付</h1>
              <p>{detail.name}</p>
            </div>
          </div>
          <button type="button" className="installer-project-delivery-icon-button" aria-label="分享交付资料">
            <span className="material-symbols-outlined">ios_share</span>
          </button>
        </div>
      </header>

      <section className="installer-project-delivery-hero">
        <div className="installer-project-delivery-hero-copy">
          <span>交付准备度</span>
          <strong>还差 2 项确认即可完成交付</strong>
          <p>请在交付前确认客户授权、资料包和现场培训事项均已同步完成。</p>
        </div>
        <div className="installer-project-delivery-progress">
          <div className="installer-project-delivery-progress-ring">
            <strong>75%</strong>
          </div>
          <span>3 / 4 已完成</span>
        </div>
      </section>

      <section className="installer-project-delivery-section">
        <div className="installer-project-delivery-section-head">
          <h2>交付检查清单</h2>
          <span>逐项确认</span>
        </div>

        <div className="installer-project-delivery-checklist">
          {deliveryChecklist.map((item) => (
            <article key={item.label} className={`installer-project-delivery-check installer-project-delivery-check-${item.tone}`}>
              <div className="installer-project-delivery-check-icon">
                <span className="material-symbols-outlined">
                  {item.tone === 'done' ? 'check_circle' : item.tone === 'pending' ? 'pending_actions' : 'assignment_late'}
                </span>
              </div>
              <div className="installer-project-delivery-check-copy">
                <strong>{item.label}</strong>
                <span>{item.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-project-delivery-section">
        <div className="installer-project-delivery-section-head">
          <h2>客户交付信息</h2>
          <span>{detail.customerName}</span>
        </div>

        <div className="installer-project-delivery-customer-card">
          <div>
            <label>客户姓名</label>
            <strong>{detail.customerName}</strong>
          </div>
          <div>
            <label>当前授权</label>
            <strong className="good">{detail.authorizationLabel}</strong>
          </div>
          <div>
            <label>交付状态</label>
            <strong>{detail.deliveryStatus}</strong>
          </div>
          <div>
            <label>计划交付日</label>
            <strong>2026-05-29</strong>
          </div>
        </div>
      </section>

      <section className="installer-project-delivery-section">
        <div className="installer-project-delivery-section-head">
          <h2>交付资料与培训</h2>
          <span>3 项</span>
        </div>

        <div className="installer-project-delivery-handover-list">
          {handoverItems.map((item) => (
            <article key={item.title} className="installer-project-delivery-handover-item">
              <div className="installer-project-delivery-handover-icon">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="installer-project-delivery-handover-copy">
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-project-delivery-section installer-project-delivery-summary-card">
        <div className="installer-project-delivery-section-head">
          <h2>交付备注</h2>
          <span>同步屋主</span>
        </div>
        <p>建议交付时现场演示“计划”“场景”“告警通知”三类高频功能，并确认客户已收到维护联系方式与首月巡检安排。</p>
      </section>

      <footer className="installer-project-delivery-footer">
        <button type="button" className="installer-project-delivery-secondary">
          保存交付草稿
        </button>
        <button type="button" className="installer-project-delivery-primary">
          确认完成交付
        </button>
      </footer>
    </div>
  );
}
