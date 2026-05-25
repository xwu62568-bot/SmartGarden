import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionCard } from '../../shared/ui/SectionCard';

type DeviceStateMap = Record<string, boolean>;

type QuickScene = {
  name: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'muted' | 'danger';
  to?: string;
};

type CommonDevice = {
  id: string;
  name: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'muted';
  statusOn: string;
  statusOff: string;
  to?: string;
};

export function OwnerHomePage() {
  const [deviceStates, setDeviceStates] = useState<DeviceStateMap>({
    '前院路径灯': true,
    '喷泉泵': true,
    '喷泉': false,
  });

  const quickScenes: readonly QuickScene[] = [
    { name: '夜景模式', icon: 'clear_night', tone: 'primary', to: '/owner/scenes/night' },
    { name: '聚会模式', icon: 'celebration', tone: 'secondary', to: '/owner/scenes/party' },
    { name: '离家模式', icon: 'home_work', tone: 'muted', to: '/owner/scenes/away' },
    { name: '全部关闭', icon: 'power_settings_new', tone: 'danger', to: '/owner/scenes/all-off' },
  ] as const;

  const commonDevices: readonly CommonDevice[] = [
    {
      id: 'front-path-light',
      name: '前院路径灯',
      icon: 'lightbulb',
      tone: 'primary',
      statusOn: '开启 • 70%',
      statusOff: '关闭',
      to: '/owner/devices/front-path-light',
    },
    {
      id: 'fountain-pump',
      name: '喷泉泵',
      icon: 'water_drop',
      tone: 'secondary',
      statusOn: '运行中',
      statusOff: '关闭',
      to: '/owner/devices/fountain-pump',
    },
    {
      id: 'fountain',
      name: '喷泉',
      icon: 'sprinkler',
      tone: 'muted',
      statusOn: '运行中',
      statusOff: '关闭',
    },
  ] as const;

  const schedule = [
    { time: '18:30', label: '开启庭院灯', tone: 'primary' },
    { time: '22:00', label: '关闭喷泉', tone: 'muted' },
    { time: '明早 06:30', label: '花坛灌溉', tone: 'secondary' },
  ] as const;

  return (
    <div className="stack owner-dashboard">
      <section className="alert-banner">
        <div className="alert-banner-main">
          <span className="material-symbols-outlined filled-icon">error</span>
          <span>池塘水位低，请检查</span>
        </div>
        <button type="button" className="alert-close" aria-label="关闭告警">
          <span className="material-symbols-outlined">close</span>
        </button>
      </section>

      <SectionCard>
        <div className="overview-grid">
          <div className="overview-item">
            <div className="overview-label primary">
              <span className="material-symbols-outlined filled-icon">lightbulb</span>
              <span>灯光</span>
            </div>
            <span className="overview-copy">8 在线, 2 开启</span>
          </div>
          <div className="overview-item">
            <div className="overview-label secondary">
              <span className="material-symbols-outlined filled-icon">water_drop</span>
              <span>水景</span>
            </div>
            <span className="overview-copy">喷泉运行中</span>
          </div>
          <div className="overview-item">
            <div className="overview-label secondary">
              <span className="material-symbols-outlined filled-icon">waves</span>
              <span>水位</span>
            </div>
            <span className="overview-copy">正常</span>
          </div>
          <div className="overview-item">
            <div className="overview-label primary">
              <span className="material-symbols-outlined filled-icon">grass</span>
              <span>灌溉</span>
            </div>
            <span className="overview-copy">今日 06:30 已完成</span>
          </div>
        </div>
      </SectionCard>

      <section>
        <h2 className="section-title">快速场景</h2>
        <div className="quick-scenes">
          {quickScenes.map((scene) => (
            <Link
              key={scene.name}
              to={scene.to ?? '/owner/scenes'}
              state={{ backTo: '/owner/home' }}
              className={`scene-chip scene-${scene.tone}`}
              aria-label={`查看${scene.name}`}
            >
              <div className="scene-icon-wrap">
                <span className="material-symbols-outlined filled-icon">{scene.icon}</span>
              </div>
              <span>{scene.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">常用设备</h2>
        <div className="stack">
          {commonDevices.map((device) => {
            const enabled = deviceStates[device.name];
            return (
              <article key={device.name} className={`device-row${enabled ? '' : ' is-off'}`}>
                {device.to ? (
                  <Link
                    to={device.to}
                    state={{ backTo: '/owner/home' }}
                    className="device-row-main device-row-main-link"
                    aria-label={`查看${device.name}详情`}
                  >
                    <div className={`device-icon device-icon-${enabled ? device.tone : 'muted'}`}>
                      <span className="material-symbols-outlined filled-icon">{device.icon}</span>
                    </div>
                    <div>
                      <h3 className="device-title">{device.name}</h3>
                      <div className={`device-status ${enabled ? device.tone : 'muted'}`}>
                        <span className="status-dot" />
                        <span>{enabled ? device.statusOn : device.statusOff}</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="device-row-main">
                    <div className={`device-icon device-icon-${enabled ? device.tone : 'muted'}`}>
                      <span className="material-symbols-outlined filled-icon">{device.icon}</span>
                    </div>
                    <div>
                      <h3 className="device-title">{device.name}</h3>
                      <div className={`device-status ${enabled ? device.tone : 'muted'}`}>
                        <span className="status-dot" />
                        <span>{enabled ? device.statusOn : device.statusOff}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  aria-label={`${device.name}开关`}
                  className={`switch ${enabled ? 'switch-on' : 'switch-off'}`}
                  onClick={() =>
                    setDeviceStates((current) => ({
                      ...current,
                      [device.name]: !current[device.name],
                    }))
                  }
                >
                  <span className="switch-thumb" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title">今日计划</h2>
        <div className="schedule-card">
          <div className="schedule-line" />
          <div className="stack schedule-stack">
            {schedule.map((item) => (
              <div key={item.time} className="timeline-row">
                <div className={`timeline-dot ${item.tone}`} />
                <div>
                  <p className={`timeline-time ${item.tone}`}>{item.time}</p>
                  <p className="timeline-label">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
