import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ownerDevices, ownerLightDeviceDetails, ownerWaterDeviceDetails } from '../../shared/mock/owner';
import { MetricCard } from '../../shared/ui/MetricCard';
import { SectionCard } from '../../shared/ui/SectionCard';

const temperatureClassName = (active: boolean) =>
  `owner-light-stitch-temperature-button${active ? ' active' : ''}`;

const waterTimerClassName = (active: boolean) =>
  `owner-water-stitch-timer-option${active ? ' active' : ''}`;

export function OwnerDeviceDetailPage() {
  const { deviceId } = useParams();
  const location = useLocation();
  const lightDetail = deviceId ? ownerLightDeviceDetails[deviceId] : undefined;
  const waterDetail = deviceId ? ownerWaterDeviceDetails[deviceId] : undefined;
  const fallbackDevice = ownerDevices.find((item) => item.id === deviceId);
  const backTo =
    typeof location.state === 'object' &&
    location.state !== null &&
    'backTo' in location.state &&
    typeof location.state.backTo === 'string'
      ? location.state.backTo
      : '/owner/devices';
  const backLabel = backTo === '/owner/home' ? '返回首页' : '返回设备列表';

  const [powerOn, setPowerOn] = useState(lightDetail?.powerOn ?? false);
  const [brightness, setBrightness] = useState(lightDetail?.brightness ?? 0);
  const [activeTemperature, setActiveTemperature] = useState(lightDetail?.activeTemperature ?? '');
  const [activeColor, setActiveColor] = useState(lightDetail?.activeColor ?? '');
  const [activeTimerOption, setActiveTimerOption] = useState(waterDetail?.activeTimerOption ?? '');

  if (lightDetail) {
    const activeColorIndex = Math.max(
      0,
      lightDetail.colorOptions.findIndex((color) => color === activeColor),
    );
    const colorThumbPosition = `${(activeColorIndex / Math.max(lightDetail.colorOptions.length - 1, 1)) * 100}%`;

    return (
      <div className="owner-light-stitch-page">
        <header className="owner-light-stitch-header">
          <div className="owner-light-stitch-header-main">
            <Link to={backTo} className="owner-light-stitch-header-button" aria-label={backLabel}>
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="owner-light-stitch-title-group">
              <h1 className="owner-light-stitch-title">{lightDetail.name}</h1>
              <div className="owner-light-stitch-status">
                <span className="owner-light-stitch-status-dot" />
                <span>{lightDetail.status}</span>
              </div>
            </div>
          </div>

          <button type="button" className="owner-light-stitch-header-button" aria-label="设备设置">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </header>

        <main className="owner-light-stitch-main">
          <section className="owner-light-stitch-hero">
            <div className="owner-light-stitch-hero-glow" aria-hidden="true" />
            <div className="owner-light-stitch-device-icon-wrap">
              <div className="owner-light-stitch-device-icon-halo" aria-hidden="true" />
              <span className="material-symbols-outlined owner-light-stitch-device-icon">{lightDetail.icon}</span>
            </div>

            <div className="owner-light-stitch-toggle-block">
              <button
                type="button"
                className={`owner-light-stitch-power-button${powerOn ? ' is-on' : ''}`}
                onClick={() => setPowerOn((current) => !current)}
                aria-label="切换设备电源"
                aria-pressed={powerOn}
              >
                <span className="material-symbols-outlined owner-light-stitch-power-icon">power_settings_new</span>
              </button>
              <span className={`owner-light-stitch-power-label${powerOn ? ' is-on' : ''}`}>{powerOn ? lightDetail.summaryLabel : '关闭'}</span>
            </div>

            <div className="owner-light-stitch-brightness">
              <div className="owner-light-stitch-brightness-head">
                <span>亮度</span>
                <strong>{brightness}%</strong>
              </div>
              <input
                className="owner-light-stitch-brightness-slider"
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(event) => setBrightness(Number(event.target.value))}
                style={{ ['--slider-progress' as string]: `${brightness}%` }}
                aria-label="亮度"
              />
            </div>
          </section>

          <section className="owner-light-stitch-control-grid">
            <article className="owner-light-stitch-card owner-light-stitch-control-card">
              <div className="owner-light-stitch-card-head">
                <span>色温控制</span>
              </div>
              <div className="owner-light-stitch-temperature-tabs" role="tablist" aria-label="色温控制">
                {lightDetail.temperatures.map((temperature) => (
                  <button
                    key={temperature}
                    type="button"
                    role="tab"
                    aria-selected={activeTemperature === temperature}
                    className={temperatureClassName(activeTemperature === temperature)}
                    onClick={() => setActiveTemperature(temperature)}
                  >
                    {temperature}
                  </button>
                ))}
              </div>
            </article>

            <article className="owner-light-stitch-card owner-light-stitch-control-card">
              <div className="owner-light-stitch-card-head">
                <span>RGB 色彩</span>
                <span className="owner-light-stitch-color-preview" style={{ backgroundColor: activeColor }} aria-hidden="true" />
              </div>
              <div className="owner-light-stitch-color-band" role="tablist" aria-label="RGB 色彩">
                <div className="owner-light-stitch-color-band-track" aria-hidden="true">
                  <span className="owner-light-stitch-color-band-thumb" style={{ left: colorThumbPosition }} />
                </div>
                {lightDetail.colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    role="tab"
                    aria-selected={activeColor === color}
                    className="owner-light-stitch-color-hit"
                    aria-label={`选择颜色 ${color}`}
                    onClick={() => setActiveColor(color)}
                  />
                ))}
              </div>
            </article>
          </section>

          <section className="owner-light-stitch-info-grid">
            {lightDetail.infoCards.slice(0, 2).map((card) => (
              <article key={card.id} className="owner-light-stitch-card owner-light-stitch-info-card">
                <span className="material-symbols-outlined owner-light-stitch-info-icon">{card.icon}</span>
                <div>
                  <span className="owner-light-stitch-info-label">{card.label}</span>
                  <strong className="owner-light-stitch-info-value">{card.value}</strong>
                </div>
              </article>
            ))}

            <article className="owner-light-stitch-card owner-light-stitch-info-card owner-light-stitch-scenes-card">
              <span className="material-symbols-outlined owner-light-stitch-info-icon">layers</span>
              <div>
                <span className="owner-light-stitch-info-label">所属场景</span>
                <div className="owner-light-stitch-scene-tags">
                  {lightDetail.scenes.map((scene) => (
                    <span key={scene} className="owner-light-stitch-scene-tag">
                      {scene}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="owner-light-stitch-action-grid">
            {lightDetail.quickActions.map((action) => (
              <button key={action.id} type="button" className="owner-light-stitch-card owner-light-stitch-action-card">
                <div className="owner-light-stitch-action-icon">
                  <span className="material-symbols-outlined">{action.icon}</span>
                </div>
                <span>{action.label}</span>
              </button>
            ))}
          </section>

          <section className="owner-light-stitch-monitor-card">
            <img src={lightDetail.monitorImage} alt="" className="owner-light-stitch-monitor-image" />
            <div className="owner-light-stitch-monitor-overlay">
              <strong>{lightDetail.monitorTitle}</strong>
              <span>{lightDetail.monitorSubtitle}</span>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (waterDetail) {
    return (
      <div className="owner-water-stitch-page">
        <header className="owner-water-stitch-header">
          <div className="owner-water-stitch-header-main">
            <Link to={backTo} className="owner-water-stitch-header-button" aria-label={backLabel}>
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="owner-water-stitch-title-group">
              <h1 className="owner-water-stitch-title">{waterDetail.name}</h1>
              <div className="owner-water-stitch-status">
                <span className="owner-water-stitch-status-dot" />
                <span>{waterDetail.status}</span>
              </div>
            </div>
          </div>

          <button type="button" className="owner-water-stitch-header-button" aria-label="设备设置">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </header>

        <main className="owner-water-stitch-main">
          <section className="owner-water-stitch-hero-card">
            <div className="owner-water-stitch-hero-top">
              <div className="owner-water-stitch-hero-summary">
                <div className="owner-water-stitch-hero-badge">
                  <span className="material-symbols-outlined">waves</span>
                  <span>{waterDetail.heroStatusLabel}</span>
                </div>

                <div className="owner-water-stitch-hero-meta">
                  <p>今日运行：<strong>{waterDetail.runtimeToday}</strong></p>
                  <p>水位状态：<strong>{waterDetail.waterLevelStatus}</strong></p>
                </div>
              </div>

              <div className="owner-water-stitch-hero-protection">
                <span className="material-symbols-outlined">verified_user</span>
                <span>{waterDetail.protectionEnabledLabel}</span>
              </div>
            </div>

            <div className="owner-water-stitch-hero-visual">
              <div className="owner-water-stitch-hero-core">
                <div className="owner-water-stitch-fountain" aria-hidden="true">
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-top" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-left-outer" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-left-inner" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-center" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-right-inner" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-right-outer" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-bottom-left" />
                  <span className="owner-water-stitch-fountain-dot owner-water-stitch-fountain-dot-bottom-right" />
                  <span className="owner-water-stitch-fountain-bar" />
                  <span className="owner-water-stitch-fountain-stem" />
                </div>
              </div>
            </div>

            <div className="owner-water-stitch-hero-stability">{waterDetail.stabilityLabel}</div>
          </section>

          <section className="owner-water-stitch-section-card">
            <div className="owner-water-stitch-power-group">
              <div className="owner-water-stitch-section-head">
                <span>电源控制</span>
              </div>

              <div>
                <button type="button" className="owner-water-stitch-power-button" aria-label={waterDetail.powerLabel}>
                  <span className="material-symbols-outlined">power_settings_new</span>
                  <span>{waterDetail.powerLabel}</span>
                  <span className="owner-water-stitch-shimmer" aria-hidden="true" />
                </button>
                <p className="owner-water-stitch-power-hint">{waterDetail.powerHint}</p>
              </div>
            </div>

            <div className="owner-water-stitch-timer-grid">
              {waterDetail.timerOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={waterTimerClassName(activeTimerOption === option.id)}
                  onClick={() => setActiveTimerOption(option.id)}
                >
                  <span className="material-symbols-outlined">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="owner-water-stitch-protection-grid">
            {waterDetail.protectionCards.map((card) => (
              <article key={card.id} className="owner-water-stitch-protection-card">
                <div className="owner-water-stitch-protection-head">
                  <span className={`material-symbols-outlined owner-water-stitch-protection-icon owner-water-stitch-protection-icon-${card.tone}`}>
                    {card.icon}
                  </span>
                  <span className="owner-water-stitch-protection-title">{card.title}</span>
                </div>
                <div className="owner-water-stitch-protection-row">
                  <strong className="owner-water-stitch-protection-value">{card.value}</strong>
                  <span className={`owner-water-stitch-protection-status owner-water-stitch-protection-status-${card.tone}`}>
                    {card.status}
                  </span>
                </div>
              </article>
            ))}

            <article className="owner-water-stitch-runtime-card">
              <div className="owner-water-stitch-runtime-main">
                <div className="owner-water-stitch-runtime-icon">
                  <span className="material-symbols-outlined">history_toggle_off</span>
                </div>
                <div>
                  <span className="owner-water-stitch-runtime-label">{waterDetail.runtimeLimitLabel}</span>
                  <strong className="owner-water-stitch-runtime-value">{waterDetail.runtimeLimitValue}</strong>
                </div>
              </div>
              <button type="button" className="owner-water-stitch-runtime-action">
                {waterDetail.runtimeLimitAction}
              </button>
            </article>
          </section>

          <section className="owner-water-stitch-schedule-card">
            <div className="owner-water-stitch-schedule-main">
              <span className="material-symbols-outlined owner-water-stitch-schedule-icon">calendar_clock</span>
              <div>
                <strong className="owner-water-stitch-schedule-title">{waterDetail.scheduleTitle}</strong>
                <span className="owner-water-stitch-schedule-subtitle">{waterDetail.scheduleSubtitle}</span>
              </div>
            </div>
            <span className="material-symbols-outlined owner-water-stitch-schedule-arrow">chevron_right</span>
          </section>

          <section className="owner-water-stitch-log-grid">
            {waterDetail.logActions.map((action) => (
              <button key={action.id} type="button" className="owner-water-stitch-log-card">
                <div className="owner-water-stitch-log-copy">
                  <span className={`material-symbols-outlined owner-water-stitch-log-icon owner-water-stitch-log-icon-${action.tone}`}>
                    {action.icon}
                  </span>
                  <strong>{action.title}</strong>
                  <span>{action.subtitle}</span>
                </div>
                <span className="material-symbols-outlined owner-water-stitch-log-arrow">arrow_forward</span>
              </button>
            ))}
          </section>

          <section className="owner-water-stitch-preview-card">
            <img src={waterDetail.previewImage} alt="" className="owner-water-stitch-preview-image" />
            <div className="owner-water-stitch-preview-overlay" />
            <div className="owner-water-stitch-preview-copy">
              <span>{waterDetail.previewEyebrow}</span>
              <strong>{waterDetail.previewTitle}</strong>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!fallbackDevice) {
    return <div className="muted-text">未找到设备。</div>;
  }

  return (
    <div className="stack">
      <SectionCard title={fallbackDevice.name}>
        <p className="muted-text">{fallbackDevice.zone}</p>
      </SectionCard>
      <MetricCard label="当前读数" value={fallbackDevice.metric} hint={`状态：${fallbackDevice.state}`} />
      <Link to="/owner/devices" className="detail-link">
        返回设备列表
      </Link>
    </div>
  );
}
