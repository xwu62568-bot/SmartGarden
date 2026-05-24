import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const summaryCards = [
  { label: '全部', value: '12', tone: 'default' },
  { label: '在线', value: '11', tone: 'online' },
  { label: '离线', value: '1', tone: 'offline' },
  { label: '未配置', value: '2', tone: 'secondary' },
  { label: '有告警', value: '1', tone: 'danger', icon: 'warning' },
] as const;

const progressItems = [
  { label: '网关在线', tone: 'done', icon: 'check_circle' },
  { label: '设备命名', tone: 'done', icon: 'check_circle' },
  { label: '通道配置', tone: 'idle', icon: 'circle' },
  { label: '通道测试', tone: 'pending', icon: 'pending' },
] as const;

const categoryFilters = ['全部', '网关', '灯光', '水景', '传感器'] as const;
const zoneFilters = ['全部区域', '前院', '后院', '池塘区'] as const;

const deviceCards = [
  {
    id: 'gateway',
    icon: 'router',
    title: '户外网关',
    subtitle: 'v1.0.3 • 网关',
    status: '在线',
    statusTone: 'online',
    variant: 'default',
    details: [
      { label: '位置', value: '设备箱' },
      { label: '子设备', value: '8个设备' },
    ],
    footer: [
      { label: '诊断', tone: 'secondary' },
      { label: '查看', tone: 'muted' },
    ],
  },
  {
    id: 'front-light-controller',
    icon: 'light_mode',
    title: '低压灯光控制器',
    subtitle: '前院 • 控制器',
    status: '在线',
    statusTone: 'online',
    variant: 'default',
    callout: {
      icon: 'task_alt',
      text: '4路通道已配置完成',
      tone: 'primary',
    },
    footer: [
      { label: '通道配置', tone: 'primary', to: 'channels' },
      { label: '通道测试', tone: 'muted', to: 'channel-test' },
    ],
  },
  {
    id: 'pond-relay',
    icon: 'toggle_on',
    title: '户外继电器 4CH',
    subtitle: '池塘区 • 控制器',
    status: '在线',
    statusTone: 'online',
    variant: 'danger',
    callout: {
      icon: 'warning',
      text: '3/4通道已配置 (未完全配置)',
      tone: 'danger',
    },
    footer: [
      { label: '继续配置', tone: 'solid', to: 'channels' },
      { label: '通道测试', tone: 'muted', to: 'channel-test' },
    ],
  },
  {
    id: 'pond-sensor',
    icon: 'water_drop',
    title: '池塘水位传感器',
    subtitle: '池塘区 • 传感器',
    status: '在线',
    statusTone: 'online',
    variant: 'default',
    reading: {
      label: '当前读数',
      value: '0.85m',
      status: '水位正常',
    },
    footer: [
      { label: '查看', tone: 'muted' },
      { label: '配置保护', tone: 'muted', to: 'automation' },
    ],
  },
  {
    id: 'backyard-light-controller',
    icon: 'light_mode',
    title: '后院灯光控制器',
    subtitle: '后院 • 控制器',
    status: '离线',
    statusTone: 'offline',
    variant: 'offline',
    callout: {
      icon: 'wifi_off',
      text: '设备离线',
      detail: '35分钟前断开',
      tone: 'danger',
    },
    footer: [
      { label: '查看告警', tone: 'danger' },
      { label: '诊断', tone: 'secondary' },
    ],
  },
] as const;

export function InstallerProjectDevicesPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  const backTo = `/installer/projects/${detail.id}`;

  return (
    <div className="installer-project-devices-page">
      <header className="installer-project-devices-topbar">
        <div className="installer-project-devices-topbar-main">
          <Link to={backTo} className="installer-project-devices-back" aria-label="返回项目详情">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-project-devices-title-wrap">
            <h1>
              设备
              <span className="installer-project-devices-status-badge" aria-hidden="true">
                {detail.status}
              </span>
            </h1>
            <p>{detail.name}</p>
          </div>
        </div>

        <Link to={`/installer/projects/${detail.id}/devices/add`} className="installer-project-devices-add">
          <span className="material-symbols-outlined">add</span>
          <span>添加设备</span>
        </Link>
      </header>

      <main className="installer-project-devices-main">
        <section className="installer-project-devices-stats" aria-label="设备总览">
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className={
                card.tone === 'danger'
                  ? 'installer-project-devices-stat-card installer-project-devices-stat-card-danger'
                  : 'installer-project-devices-stat-card'
              }
            >
              <div className="installer-project-devices-stat-head">
                <span>{card.label}</span>
                {card.tone === 'online' ? <span className="installer-project-devices-pulse-dot" aria-hidden="true" /> : null}
                {card.icon ? <span className="material-symbols-outlined">{card.icon}</span> : null}
              </div>
              <strong className={`installer-project-devices-stat-value installer-project-devices-stat-value-${card.tone}`}>
                {card.value}
              </strong>
            </article>
          ))}
        </section>

        <section className="installer-project-devices-banner">
          <div className="installer-project-devices-banner-copy">
            <span className="material-symbols-outlined">info</span>
            <p>有 2 个设备尚未完成配置</p>
          </div>
          <button type="button">继续配置</button>
        </section>

        <section className="installer-project-devices-progress">
          <h2>交付检查进度</h2>
          <div className="installer-project-devices-progress-grid">
            {progressItems.map((item) => (
              <article
                key={item.label}
                className={`installer-project-devices-progress-item installer-project-devices-progress-item-${item.tone}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="installer-project-devices-filters" aria-label="设备筛选">
          <div className="installer-project-devices-chip-row">
            {categoryFilters.map((item, index) => (
              <button
                key={item}
                type="button"
                className={
                  index === 0
                    ? 'installer-project-devices-chip installer-project-devices-chip-active'
                    : 'installer-project-devices-chip'
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="installer-project-devices-zone-row">
            <span>区域:</span>
            {zoneFilters.map((item, index) => (
              <button
                key={item}
                type="button"
                className={
                  index === 0
                    ? 'installer-project-devices-zone-chip installer-project-devices-zone-chip-active'
                    : 'installer-project-devices-zone-chip'
                }
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="installer-project-devices-grid" aria-label="项目设备列表">
          {deviceCards.map((device) => (
            <article
              key={device.id}
              className={`installer-project-devices-card installer-project-devices-card-${device.variant}`}
            >
              <div className="installer-project-devices-card-body">
                <div className="installer-project-devices-card-top">
                  <div className="installer-project-devices-card-title">
                    <div
                      className={
                        device.variant === 'offline'
                          ? 'installer-project-devices-card-icon installer-project-devices-card-icon-offline'
                          : 'installer-project-devices-card-icon'
                      }
                    >
                      <span className="material-symbols-outlined">{device.icon}</span>
                    </div>
                    <div>
                      <h3>{device.title}</h3>
                      <p>{device.subtitle}</p>
                    </div>
                  </div>
                  <span
                    className={
                      device.statusTone === 'offline'
                        ? 'installer-project-devices-card-status installer-project-devices-card-status-offline'
                        : 'installer-project-devices-card-status'
                    }
                  >
                    {device.status}
                  </span>
                </div>

                {'details' in device ? (
                  <div className="installer-project-devices-detail-grid">
                    {device.details.map((detailItem) => (
                      <div key={detailItem.label} className="installer-project-devices-detail-box">
                        <span>{detailItem.label}</span>
                        <strong>{detailItem.value}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}

                {'callout' in device ? (
                  <div className={`installer-project-devices-callout installer-project-devices-callout-${device.callout.tone}`}>
                    <span className="material-symbols-outlined">{device.callout.icon}</span>
                    <div>
                      <strong>{device.callout.text}</strong>
                      {'detail' in device.callout ? <span>{device.callout.detail}</span> : null}
                    </div>
                  </div>
                ) : null}

                {'reading' in device ? (
                  <div className="installer-project-devices-reading">
                    <span>{device.reading.label}</span>
                    <div>
                      <strong>{device.reading.value}</strong>
                      <em>{device.reading.status}</em>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="installer-project-devices-card-footer">
                {device.footer.map((action) => {
                  const className = `installer-project-devices-action installer-project-devices-action-${action.tone}`;

                  if (action.to === 'channels') {
                    return (
                      <Link key={action.label} to={`/installer/projects/${detail.id}/channels`} className={className}>
                        {action.label}
                      </Link>
                    );
                  }

                  if (action.to === 'channel-test') {
                    return (
                      <Link
                        key={action.label}
                        to={`/installer/projects/${detail.id}/channel-test`}
                        state={{ backTo: `/installer/projects/${detail.id}/devices` }}
                        className={className}
                      >
                        {action.label}
                      </Link>
                    );
                  }

                  if (action.to === 'automation') {
                    return (
                      <Link key={action.label} to={`/installer/projects/${detail.id}/automation`} className={className}>
                        {action.label}
                      </Link>
                    );
                  }

                  return (
                    <button key={action.label} type="button" className={className}>
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
