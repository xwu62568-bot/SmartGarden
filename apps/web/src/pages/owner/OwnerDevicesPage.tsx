import { useState } from 'react';

type DeviceCard = {
  id: string;
  name: string;
  area: string;
  category: '全部' | '灯光' | '水景' | '户外设备' | '灌溉' | '传感器';
  zoneTag: '前院' | '后院' | '池塘' | '喷泉区' | '花坛' | '露台';
  icon: string;
  tone: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'danger';
  onlineState: '在线' | '离线';
  statusLine: string;
  enabled?: boolean;
  badge?: string;
  warning?: boolean;
  actionLabel?: string;
};

const categoryTabs = ['全部', '灯光', '水景', '户外设备', '灌溉', '传感器'] as const;
const zoneChips = ['前院', '后院', '池塘', '喷泉区', '花坛', '露台'] as const;

const deviceCards: DeviceCard[] = [
  {
    id: 'front-path-light',
    name: '前院路径灯',
    area: '前院',
    category: '灯光',
    zoneTag: '前院',
    icon: 'lightbulb',
    tone: 'primary',
    onlineState: '在线',
    statusLine: '开启, 亮度 70%',
    enabled: true,
  },
  {
    id: 'fountain-pump',
    name: '喷泉泵',
    area: '池塘',
    category: '水景',
    zoneTag: '池塘',
    icon: 'waves',
    tone: 'secondary',
    onlineState: '在线',
    statusLine: '运行中',
    enabled: true,
  },
  {
    id: 'pump-warning',
    name: '水泵告警',
    area: '喷泉区',
    category: '水景',
    zoneTag: '喷泉区',
    icon: 'warning',
    tone: 'danger',
    onlineState: '在线',
    statusLine: '压力异常',
    warning: true,
    actionLabel: '查看详情',
  },
  {
    id: 'backyard-drip',
    name: '后院滴灌',
    area: '花坛',
    category: '灌溉',
    zoneTag: '花坛',
    icon: 'opacity',
    tone: 'primary',
    onlineState: '在线',
    statusLine: '空闲',
    enabled: false,
  },
  {
    id: 'pond-sensor',
    name: '池塘水位传感器',
    area: '池塘',
    category: '传感器',
    zoneTag: '池塘',
    icon: 'water_ph',
    tone: 'tertiary',
    onlineState: '在线',
    statusLine: '正常',
    badge: '实时监测中',
  },
  {
    id: 'lawn-spotlight',
    name: '草坪射灯',
    area: '后院',
    category: '灯光',
    zoneTag: '后院',
    icon: 'highlight',
    tone: 'muted',
    onlineState: '离线',
    statusLine: '最后在线: 2小时前',
    enabled: false,
  },
];

export function OwnerDevicesPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categoryTabs)[number]>('全部');
  const [activeZone, setActiveZone] = useState<(typeof zoneChips)[number]>('前院');

  const filteredDevices = deviceCards.filter((device) => {
    const categoryMatch = activeCategory === '全部' || device.category === activeCategory;
    return categoryMatch;
  });

  return (
    <div className="owner-devices-page">
      <header className="owner-devices-header">
        <div className="owner-devices-header-spacer" aria-hidden="true" />
        <h1 className="owner-devices-title">设备</h1>
        <button type="button" className="owner-devices-search-button" aria-label="搜索设备">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      <div className="owner-devices-search-row">
        <label className="owner-devices-search-field">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="搜索设备名称..." />
        </label>
        <button type="button" className="owner-devices-filter-button" aria-label="筛选设备">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      <div className="owner-devices-category-tabs" role="tablist" aria-label="设备分类">
        {categoryTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === activeCategory}
            className={`owner-devices-category-tab${tab === activeCategory ? ' active' : ''}`}
            onClick={() => setActiveCategory(tab)}
          >
            <span className="material-symbols-outlined">
              {tab === '全部'
                ? 'grid_view'
                : tab === '灯光'
                  ? 'light_mode'
                  : tab === '水景'
                    ? 'waves'
                    : tab === '户外设备'
                      ? 'deck'
                      : tab === '灌溉'
                        ? 'water_drop'
                        : 'sensors'}
            </span>
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <div className="owner-devices-zone-chips">
        {zoneChips.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`owner-devices-zone-chip${chip === activeZone ? ' active' : ''}`}
            onClick={() => setActiveZone(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <section className="owner-devices-grid">
        {filteredDevices.map((device) => (
          <article
            key={device.id}
            className={`owner-device-card owner-device-card-${device.tone}${device.warning ? ' is-warning' : ''}${device.onlineState === '离线' ? ' is-offline' : ''}`}
          >
            {device.warning ? (
              <div className="owner-device-warning-ribbon">
                <span className="material-symbols-outlined">error</span>
                <span>告警</span>
              </div>
            ) : null}

            <div className="owner-device-card-top">
              <div className="owner-device-card-main">
                <div className={`owner-device-icon owner-device-icon-${device.tone}`}>
                  <span className="material-symbols-outlined">{device.icon}</span>
                </div>
                <div>
                  <h2 className="owner-device-card-title">{device.name}</h2>
                  <div className="owner-device-location">
                    <span className="material-symbols-outlined">location_on</span>
                    <span>{device.area}</span>
                  </div>
                </div>
              </div>

              <div className={`owner-device-online owner-device-online-${device.onlineState === '在线' ? 'on' : 'off'}`}>
                <span className="owner-device-online-dot" />
                <span>{device.onlineState}</span>
              </div>
            </div>

            <div className="owner-device-card-bottom">
              <div className="owner-device-status-line">
                {device.warning ? (
                  <p>{`状态: ${device.statusLine}`}</p>
                ) : (
                  <p>
                    状态:
                    <span>{device.statusLine}</span>
                  </p>
                )}
              </div>

              {device.actionLabel ? (
                <button type="button" className="owner-device-danger-button">
                  {device.actionLabel}
                </button>
              ) : device.badge ? (
                <div className="owner-device-badge">
                  <span className="material-symbols-outlined">analytics</span>
                  <span>{device.badge}</span>
                </div>
              ) : (
                <label className={`owner-device-switch-wrap${device.onlineState === '离线' ? ' disabled' : ''}`}>
                  <input type="checkbox" checked={device.enabled} readOnly disabled={device.onlineState === '离线'} />
                  <span className="owner-device-switch" />
                </label>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
