import { useState } from 'react';
import { Link } from 'react-router-dom';

const devices = [
  { id: 'outlet', name: '户外插座', icon: 'power', enabled: false, tone: 'secondary' },
  { id: 'holiday-lights', name: '节日灯', icon: 'celebration', enabled: true, tone: 'primary' },
  { id: 'mister', name: '雾化器', icon: 'waves', enabled: false, tone: 'secondary' },
  { id: 'fan', name: '户外风扇', icon: 'air', enabled: false, tone: 'secondary' },
  { id: 'filter', name: '过滤器', icon: 'filter_alt', enabled: false, tone: 'secondary' },
] as const;

export function OwnerOutdoorPlanCreatePage() {
  const [enabled, setEnabled] = useState(true);
  const [deviceStates, setDeviceStates] = useState(() =>
    new Map(devices.map((device) => [device.id, device.enabled])),
  );
  const [autoOffEnabled, setAutoOffEnabled] = useState(true);
  const [timeoutReminderEnabled, setTimeoutReminderEnabled] = useState(true);

  return (
    <div className="owner-outdoor-plan-create-page">
      <header className="owner-outdoor-plan-create-topbar">
        <Link to="/owner/plans/create" className="owner-outdoor-plan-create-icon-button" aria-label="返回计划类型">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1>创建户外设备计划</h1>
        <button type="button" className="owner-outdoor-plan-create-save">
          保存
        </button>
      </header>

      <main className="owner-outdoor-plan-create-main">
        <section className="owner-outdoor-plan-create-card owner-outdoor-plan-create-basic-card">
          <div className="owner-outdoor-plan-create-basic-head">
            <label htmlFor="outdoor-plan-name">计划名称</label>
            <div className="owner-outdoor-plan-create-toggle-row">
              <span>启用计划</span>
              <button
                type="button"
                className={`owner-outdoor-plan-create-switch${enabled ? ' is-on' : ''}`}
                aria-pressed={enabled}
                aria-label="启用计划"
                onClick={() => setEnabled((current) => !current)}
              />
            </div>
          </div>
          <input
            id="outdoor-plan-name"
            type="text"
            defaultValue="节日灯定时"
            aria-label="计划名称"
            className="owner-outdoor-plan-create-input"
          />
        </section>

        <section className="owner-outdoor-plan-create-section" aria-labelledby="device-title">
          <h2 id="device-title">执行设备</h2>
          <div className="owner-outdoor-plan-create-card owner-outdoor-plan-create-device-group">
            {devices.map((device) => {
              const isOn = deviceStates.get(device.id) ?? false;
              return (
                <div
                  key={device.id}
                  className={`owner-outdoor-plan-create-device-row${device.id === 'holiday-lights' ? ' is-highlighted' : ''}`}
                >
                  <div className="owner-outdoor-plan-create-device-main">
                    <div className={`owner-outdoor-plan-create-device-icon owner-outdoor-plan-create-device-icon-${device.tone}${isOn ? ' is-on' : ''}`}>
                      <span className="material-symbols-outlined">{device.icon}</span>
                    </div>
                    <span className={`owner-outdoor-plan-create-device-name${device.id === 'holiday-lights' ? ' is-highlighted' : ''}`}>
                      {device.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`owner-outdoor-plan-create-switch${isOn ? ' is-on' : ''}`}
                    aria-pressed={isOn}
                    aria-label={`切换${device.name}`}
                    onClick={() =>
                      setDeviceStates((current) => {
                        const next = new Map(current);
                        next.set(device.id, !isOn);
                        return next;
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="owner-outdoor-plan-create-card owner-outdoor-plan-create-time-card" aria-labelledby="runtime-title">
          <h2 id="runtime-title">运行时间</h2>
          <div className="owner-outdoor-plan-create-time-grid">
            <button type="button" className="owner-outdoor-plan-create-time-box" aria-label="开启时间 18:00">
              <span>开启时间</span>
              <strong>18:00</strong>
            </button>
            <button type="button" className="owner-outdoor-plan-create-time-box owner-outdoor-plan-create-time-box-off" aria-label="关闭时间 23:00">
              <span>关闭时间</span>
              <strong>23:00</strong>
            </button>
          </div>
          <div className="owner-outdoor-plan-create-repeat-row">
            <span>重复</span>
            <div className="owner-outdoor-plan-create-repeat-actions">
              <button type="button" className="owner-outdoor-plan-create-chip active">
                每天
              </button>
              <button type="button" className="owner-outdoor-plan-create-chip">
                自定义
              </button>
            </div>
          </div>
        </section>

        <section className="owner-outdoor-plan-create-safety-card" aria-labelledby="safety-title">
          <div className="owner-outdoor-plan-create-safety-watermark" aria-hidden="true">
            <span className="material-symbols-outlined">shield</span>
          </div>
          <div className="owner-outdoor-plan-create-safety-head">
            <span className="material-symbols-outlined">shield</span>
            <h2 id="safety-title">安全保护（防忘关）</h2>
          </div>
          <div className="owner-outdoor-plan-create-safety-limit">
            <div>
              <p>最大连续运行</p>
              <strong>6 小时</strong>
            </div>
            <span className="material-symbols-outlined">auto_timer</span>
          </div>
          <div className="owner-outdoor-plan-create-safety-options">
            <div className="owner-outdoor-plan-create-safety-row">
              <span>超时自动关闭</span>
              <button
                type="button"
                className={`owner-outdoor-plan-create-switch${autoOffEnabled ? ' is-on' : ''}`}
                aria-pressed={autoOffEnabled}
                aria-label="超时自动关闭"
                onClick={() => setAutoOffEnabled((current) => !current)}
              />
            </div>
            <div className="owner-outdoor-plan-create-safety-row">
              <span>超时提醒</span>
              <button
                type="button"
                className={`owner-outdoor-plan-create-switch${timeoutReminderEnabled ? ' is-on' : ''}`}
                aria-pressed={timeoutReminderEnabled}
                aria-label="超时提醒"
                onClick={() => setTimeoutReminderEnabled((current) => !current)}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="owner-outdoor-plan-create-footer">
        <div className="owner-outdoor-plan-create-summary">
          <div className="owner-outdoor-plan-create-summary-icon">
            <span className="material-symbols-outlined">magic_button</span>
          </div>
          <p>
            每天 <strong>18:00</strong> 开启节日灯，<strong>23:00</strong> 自动关闭，最长运行不超过 <strong>6 小时</strong>。
          </p>
        </div>
      </footer>
    </div>
  );
}
