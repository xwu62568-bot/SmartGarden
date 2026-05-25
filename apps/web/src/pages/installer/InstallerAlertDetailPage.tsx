import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { installerAlerts } from '../../shared/mock/installer';

type AlertDetailContent = {
  headline: string;
  severityLabel: string;
  device: string;
  area: string;
  occurredAt: string;
  currentValue: string;
  protectionBadge: string;
  protectionActions: Array<{ label: string; status: string; active?: boolean }>;
  troubleshootingSteps: string[];
};

const alertDetailContent: Record<string, AlertDetailContent> = {
  'a-001': {
    headline: '池塘水位低',
    severityLabel: '严重',
    device: '池塘水位传感器',
    area: '池塘区',
    occurredAt: '今日 10:32',
    currentValue: '水位: 低 (15%)',
    protectionBadge: '自动防护中',
    protectionActions: [
      { label: '喷泉泵', status: '已关闭' },
      { label: '瀑布泵', status: '已关闭' },
      { label: '补水阀', status: '已打开 (正在补水)', active: true },
    ],
    troubleshootingSteps: [
      '检查水源是否充足，确认市政或循环水箱无停水。',
      '检查补水阀接线与供水压力，排除电磁阀故障。',
      '检查传感器表面是否有杂物或钙化结垢影响读数。',
      '确认水泵未发生空转，以免烧毁电机。',
    ],
  },
};

const remoteActions = [
  { icon: 'monitoring', label: '查看设备详情', accent: 'secondary' },
  { icon: 'water_drop', label: '测试补水 (5s)', accent: 'primary' },
  { icon: 'history', label: '运行日志', accent: 'tertiary' },
  { icon: 'call', label: '联系客户', accent: 'secondary' },
] as const;

export function InstallerAlertDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { alertId } = useParams();
  const alert = installerAlerts.find((item) => item.id === alertId);
  const backTo = typeof location.state?.backTo === 'string' ? location.state.backTo : '/installer/alerts';
  const backLabel = backTo === '/installer/workbench' ? '返回工作台' : '返回告警列表';

  if (!alert) {
    return <div className="muted-text">未找到告警。</div>;
  }

  const alertTime = alert.time ?? '时间待确认';
  const occurredAt = alertTime.includes('今日') || alertTime.includes('昨天') ? alertTime : `今日 ${alertTime}`;

  const detail = alertDetailContent[alert.id] ?? {
    headline: `${alert.source}${alert.title}`,
    severityLabel: alert.level === '高' ? '严重' : '提醒',
    device: alert.deviceName ?? '未关联设备',
    area: alert.deviceZone ?? '未分配区域',
    occurredAt,
    currentValue: alert.note ?? '等待进一步诊断',
    protectionBadge: alert.status === '处理中' ? '人工处理中' : '待确认',
    protectionActions: [
      { label: alert.deviceName ?? '相关设备', status: alert.status === '处理中' ? '已进入处理流程' : '等待远程确认', active: alert.status === '处理中' },
    ],
    troubleshootingSteps: [
      '确认设备供电、网络和现场状态是否正常。',
      '检查相关传感器、执行器和接线是否存在松动或损坏。',
      '结合运行日志和最近操作记录，排查是否为误触发。',
      '必要时联系客户确认现场环境变化并安排上门处理。',
    ],
  };

  return (
    <div className="installer-alert-detail-page">
      <header className="installer-alert-detail-bar">
        <div className="installer-alert-detail-bar__leading">
          <button type="button" aria-label={backLabel} onClick={() => navigate(backTo)}>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          </button>
          <h1>告警详情</h1>
        </div>
        <button type="button" aria-label="更多操作">
          <span className="material-symbols-outlined" aria-hidden="true">more_vert</span>
        </button>
      </header>

      <main className="installer-alert-detail-content">
        <section className="installer-alert-detail-hero">
          <div className="installer-alert-detail-hero__title-row">
            <h2>{detail.headline}</h2>
            <div className="installer-alert-detail-badges">
              <span className="installer-alert-detail-badge installer-alert-detail-badge--severity">
                <span className="installer-alert-detail-badge__dot" aria-hidden="true" />
                {detail.severityLabel}
              </span>
              <span className="installer-alert-detail-badge installer-alert-detail-badge--status">{alert.status}</span>
            </div>
          </div>
          <div className="installer-alert-detail-meta-lines">
            <p>
              <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
              <span>所属项目: <strong>{alert.source}</strong></span>
            </p>
            <p>
              <span className="material-symbols-outlined" aria-hidden="true">person</span>
              <span>客户: <strong>{alert.customerName}</strong></span>
            </p>
          </div>
        </section>

        <section className="installer-alert-detail-card installer-alert-detail-card--glass">
          <div className="installer-alert-detail-section-title">
            <span className="material-symbols-outlined" aria-hidden="true">info</span>
            <h3>告警详情</h3>
          </div>
          <div className="installer-alert-detail-info-grid">
            <div>
              <label>设备</label>
              <strong>{detail.device}</strong>
            </div>
            <div>
              <label>区域</label>
              <strong>{detail.area}</strong>
            </div>
            <div>
              <label>发生时间</label>
              <strong>{detail.occurredAt}</strong>
            </div>
            <div>
              <label>当前数值</label>
              <strong className="installer-alert-detail-value">{detail.currentValue}</strong>
            </div>
          </div>
        </section>

        <section className="installer-alert-detail-card installer-alert-detail-card--protection">
          <div className="installer-alert-detail-card-head">
            <div className="installer-alert-detail-section-title">
              <span className="material-symbols-outlined" aria-hidden="true">shield</span>
              <h3>已执行保护动作</h3>
            </div>
            <span className="installer-alert-detail-pill">{detail.protectionBadge}</span>
          </div>
          <div className="installer-alert-detail-protection-list">
            {detail.protectionActions.map((item) => (
              <div
                key={`${item.label}-${item.status}`}
                className={`installer-alert-detail-protection-item${item.active ? ' active' : ''}`}
              >
                <span>{item.label}</span>
                <strong>
                  {item.status}
                  {item.active ? (
                    <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
                  ) : null}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className="installer-alert-detail-card installer-alert-detail-card--glass installer-alert-detail-card--steps">
          <h3>建议处理步骤</h3>
          <ol className="installer-alert-detail-steps">
            {detail.troubleshootingSteps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="installer-alert-detail-actions" aria-label="远程操作">
          {remoteActions.map((action) => (
            <button key={action.label} type="button" className={`installer-alert-detail-action installer-alert-detail-action--${action.accent}`}>
              <span className="material-symbols-outlined" aria-hidden="true">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </section>

        <section className="installer-alert-detail-card installer-alert-detail-card--glass installer-alert-detail-card--handling">
          <h3>处理记录与状态</h3>
          <textarea aria-label="处理说明" placeholder="添加处理说明..." defaultValue="" />
          <button type="button" className="installer-alert-detail-upload">
            <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
            <span>上传照片</span>
          </button>
          <div className="installer-alert-detail-handling-actions">
            <button type="button" className="installer-alert-detail-handling-button installer-alert-detail-handling-button--tertiary">
              标记为处理中
            </button>
            <button type="button" className="installer-alert-detail-handling-button installer-alert-detail-handling-button--primary">
              标记为已解决
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
