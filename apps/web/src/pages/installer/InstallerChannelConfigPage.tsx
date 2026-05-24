import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const channels = [
  {
    id: 'ch1',
    code: 'CH1',
    name: '池塘循环泵',
    icon: 'water_pump',
    iconTone: 'primary',
    zone: '池塘区',
    rows: [
      { label: '最大运行时间', value: '12 hours', icon: 'edit', tone: 'primary' },
      { label: '场景联动控制', value: 'Yes', tone: 'primary' },
      { label: '允许一键全关', value: 'No', icon: 'security', tone: 'locked' },
    ],
  },
  {
    id: 'ch2',
    code: 'CH2',
    name: '喷泉泵',
    icon: 'sprinkler',
    iconTone: 'primary',
    zone: '池塘区',
    rows: [
      { label: '最大运行时间', value: '4 hours', icon: 'edit', tone: 'primary' },
      { label: '允许一键全关', value: 'Yes', tone: 'primary' },
    ],
  },
  {
    id: 'ch3',
    code: 'CH3',
    name: '补水阀',
    icon: 'water_drop',
    iconTone: 'danger',
    zone: '池塘区',
    riskLabel: '高风险设备',
    rows: [
      { label: '最大运行时间', value: '10 minutes', icon: 'edit', tone: 'danger' },
      { label: '允许一键全关', value: 'No', icon: 'report', tone: 'dangerLock' },
    ],
  },
  {
    id: 'ch4',
    code: 'CH4',
    name: '户外插座',
    icon: 'power',
    iconTone: 'primary',
    zone: '露台',
    rows: [
      { label: '最大运行时间', value: '6 hours', icon: 'edit', tone: 'primary' },
      { label: '状态反馈模式', value: 'Bistable', tone: 'primary' },
    ],
  },
] as const;

const referenceMapImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtEYn77XDB8nHfbPM7yaOOwYmZV_fS3eJkT1ezaX5Oe0YQI5DiBsqiyR4Hr80enXFHDnuPRx0i9x6N2fxIVdnYbTHIlfgTASeWDB0Sz6AGRXquYru0aCmtpp78copZ3u1JqlpVc32tln71ls-fs1vHJgrl_nfc-GYHBhuwNjJwWkh6qSLZu5IElYFHw75dhDlCo54ZLj0Mqinhta5qDA1R31_VPKGSmptyQrnVhKE-iUp_xo9AZiXOIVHCvgws5BRw6WxNZAYLQ_w';

export function InstallerChannelConfigPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-channel-config-page">
      <header className="installer-channel-config-topbar">
        <div className="installer-channel-config-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}/devices/add`}
            className="installer-channel-config-icon-button"
            aria-label="返回添加设备"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-channel-config-title-wrap">
            <h1>{detail.name}</h1>
            <div className="installer-channel-config-subtitle">
              <span>Outdoor Relay 4CH</span>
              <span className="installer-channel-config-online-dot" aria-hidden="true" />
              <strong>Online</strong>
            </div>
          </div>
        </div>

        <button type="button" className="installer-channel-config-icon-button" aria-label="配置建议">
          <span className="material-symbols-outlined">settings_suggest</span>
        </button>
      </header>

      <main className="installer-channel-config-main">
        <div className="installer-channel-config-head">
          <h2>通道配置</h2>
          <span>安装员模式</span>
        </div>

        <section className="installer-channel-config-grid" aria-label="通道配置列表">
          {channels.map((channel) => (
            <article
              key={channel.id}
              className={
                channel.riskLabel
                  ? 'installer-channel-card installer-channel-card-danger'
                  : 'installer-channel-card'
              }
            >
              {channel.riskLabel ? <div className="installer-channel-card-risk">{channel.riskLabel}</div> : null}

              <div className="installer-channel-card-top">
                <div className="installer-channel-card-title-group">
                  <div
                    className={
                      channel.iconTone === 'danger'
                        ? 'installer-channel-card-icon installer-channel-card-icon-danger'
                        : 'installer-channel-card-icon'
                    }
                  >
                    <span className="material-symbols-outlined">{channel.icon}</span>
                  </div>
                  <div>
                    <div className={channel.iconTone === 'danger' ? 'installer-channel-code danger' : 'installer-channel-code'}>
                      {channel.code}
                    </div>
                    <h3>{channel.name}</h3>
                  </div>
                </div>
                <span className="installer-channel-card-zone">{channel.zone}</span>
              </div>

              <div className="installer-channel-card-rows">
                {channel.rows.map((row) => (
                  <div
                    key={row.label}
                    className={
                      row.tone === 'locked'
                        ? 'installer-channel-row installer-channel-row-locked'
                        : row.tone === 'dangerLock'
                          ? 'installer-channel-row installer-channel-row-danger-lock'
                          : row.tone === 'danger'
                            ? 'installer-channel-row installer-channel-row-danger'
                            : 'installer-channel-row'
                    }
                  >
                    <span>{row.label}</span>
                    <div className={row.tone === 'danger' || row.tone === 'dangerLock' ? 'installer-channel-row-value danger' : 'installer-channel-row-value'}>
                      {row.icon ? <span className="material-symbols-outlined">{row.icon}</span> : null}
                      <strong>{row.value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="installer-channel-reference-card">
          <div className="installer-channel-reference-head">
            <span>安装区域参考</span>
            <span>最后同步: 5分钟前</span>
          </div>
          <div className="installer-channel-reference-visual">
            <img src={referenceMapImage} alt="安装区域参考图" />
            <button type="button" className="installer-channel-reference-action">
              <span className="material-symbols-outlined">map</span>
              <span>查看实景点位</span>
            </button>
          </div>
        </section>
      </main>

      <footer className="installer-channel-config-footer">
        <button type="button" className="installer-channel-config-primary">
          <span className="material-symbols-outlined">save</span>
          <span>保存配置</span>
        </button>
        <Link
          to={`/installer/projects/${detail.id}/channel-test`}
          state={{ backTo: `/installer/projects/${detail.id}/channels` }}
          className="installer-channel-config-secondary"
        >
          <span className="material-symbols-outlined">play_circle</span>
          <span>通道测试</span>
        </Link>
      </footer>
    </div>
  );
}
