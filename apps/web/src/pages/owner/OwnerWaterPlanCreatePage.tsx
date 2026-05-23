import { useState } from 'react';
import { Link } from 'react-router-dom';
import waterPlanPreviewImage from '../../assets/water-plan-preview.jpg';

const repeatModes = ['每天', '周末', '自定义'] as const;

const waterDevices = [
  { id: 'fountain-pump', name: '喷泉泵', zone: '月亮', enabled: true, icon: 'water_pump' },
  { id: 'waterfall', name: '瀑布', zone: '海王星', enabled: true, icon: 'waterfall_chart' },
  { id: 'underwater-light', name: '水下灯（可选）', zone: '关闭', enabled: false, icon: 'wb_twilight' },
  { id: 'filter-system', name: '过滤器开关', zone: '已锁定', enabled: false, icon: 'lock' },
] as const;

const protectionItems = [
  '缺水时自动停泵',
  '最大连续运行已启用',
  '已收到园匠维护提醒',
] as const;

export function OwnerWaterPlanCreatePage() {
  const [enabled, setEnabled] = useState(true);
  const [repeatMode, setRepeatMode] = useState<(typeof repeatModes)[number]>('每天');
  const [deviceStates, setDeviceStates] = useState(() =>
    new Map(waterDevices.map((device) => [device.id, device.enabled])),
  );

  return (
    <div className="owner-water-plan-create-page">
      <header className="owner-water-plan-create-topbar">
        <Link to="/owner/plans/create" className="owner-water-plan-create-icon-button" aria-label="返回计划类型">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1>创建水景计划</h1>
        <button type="button" className="owner-water-plan-create-save">
          <span>保存</span>
        </button>
      </header>

      <main className="owner-water-plan-create-main">
        <section className="owner-water-plan-create-card owner-water-plan-create-basic-card">
          <label className="owner-water-plan-create-field">
            <span>计划名称</span>
            <input type="text" defaultValue="白天喷泉" aria-label="计划名称" />
          </label>

          <div className="owner-water-plan-create-toggle-row">
            <span>启用计划</span>
            <button
              type="button"
              className={`owner-water-plan-create-switch${enabled ? ' is-on' : ''}`}
              aria-pressed={enabled}
              aria-label="启用计划"
              onClick={() => setEnabled((current) => !current)}
            />
          </div>
        </section>

        <section className="owner-water-plan-create-section" aria-labelledby="runtime-title">
          <div className="owner-water-plan-create-section-label">
            <span className="material-symbols-outlined">schedule</span>
            <h2 id="runtime-title">运行时间</h2>
          </div>

          <div className="owner-water-plan-create-card owner-water-plan-create-runtime-card">
            <div className="owner-water-plan-create-time-grid">
              <div className="owner-water-plan-create-time-box">
                <span>开始时间</span>
                <strong>08:00</strong>
              </div>
              <div className="owner-water-plan-create-time-box">
                <span>结束时间</span>
                <strong>22:00</strong>
              </div>
            </div>

            <div className="owner-water-plan-create-repeat-head">
              <span>重复周期</span>
            </div>

            <div className="owner-water-plan-create-repeat-row" role="tablist" aria-label="重复周期">
              {repeatModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  role="tab"
                  aria-selected={repeatMode === mode}
                  className={repeatMode === mode ? 'active' : ''}
                  onClick={() => setRepeatMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="owner-water-plan-create-section" aria-labelledby="protection-title">
          <div className="owner-water-plan-create-section-label">
            <span className="material-symbols-outlined">shield</span>
            <h2 id="protection-title">安全保护状态</h2>
          </div>

          <div className="owner-water-plan-create-card owner-water-plan-create-protection-card">
            {protectionItems.map((item, index) => (
              <div key={item} className="owner-water-plan-create-protection-row">
                <div className="owner-water-plan-create-protection-copy">
                  <span className="material-symbols-outlined">{index === 0 ? 'shield' : 'check_circle'}</span>
                  <span>{item}</span>
                </div>
                {index === protectionItems.length - 1 ? (
                  <div className="owner-water-plan-create-protection-progress" aria-hidden="true">
                    <span />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="owner-water-plan-create-section" aria-labelledby="device-title">
          <div className="owner-water-plan-create-section-label">
            <span className="material-symbols-outlined">water_pump</span>
            <h2 id="device-title">执行设备</h2>
          </div>

          <div className="owner-water-plan-create-device-list">
            {waterDevices.map((device) => {
              const currentEnabled = deviceStates.get(device.id) ?? false;
              const isLocked = device.id === 'filter-system';

              return (
                <article key={device.id} className={`owner-water-plan-create-device-card${isLocked ? ' is-locked' : ''}`}>
                  <div className={`owner-water-plan-create-device-icon${currentEnabled ? ' is-on' : ''}`}>
                    <span className="material-symbols-outlined">{device.icon}</span>
                  </div>
                  <div className="owner-water-plan-create-device-copy">
                    <h3>{device.name}</h3>
                    <p>{device.zone}</p>
                  </div>
                  {isLocked ? (
                    <span className="material-symbols-outlined owner-water-plan-create-device-lock">lock</span>
                  ) : (
                    <button
                      type="button"
                      className={`owner-water-plan-create-device-switch${currentEnabled ? ' is-on' : ''}`}
                      aria-pressed={currentEnabled}
                      aria-label={`切换${device.name}`}
                      onClick={() =>
                        setDeviceStates((current) => {
                          const next = new Map(current);
                          next.set(device.id, !currentEnabled);
                          return next;
                        })
                      }
                    />
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="owner-water-plan-create-preview-card">
          <img
            src={waterPlanPreviewImage}
            alt="夜间庭院台阶与水景灯光"
          />
          <div className="owner-water-plan-create-preview-overlay" />
          <div className="owner-water-plan-create-preview-copy">
            <em>晚间</em>
            <strong>预估计划效果</strong>
            <span>晚间水景更有层次</span>
          </div>
        </section>
      </main>
    </div>
  );
}
