import { useState } from 'react';
import { Link } from 'react-router-dom';

const triggerModes = ['固定时间', '日落后', '日出前'] as const;
const offsets = ['即刻', '15m', '30m', '60m'] as const;
const weekDays = ['一', '二', '三', '四', '五', '六', '日'] as const;

const lightDevices = [
  {
    id: 'front-path',
    name: '前院路径灯',
    status: '开启',
    detail: '70% · 暖白',
    icon: 'light_mode',
    selected: true,
    editable: false,
  },
  {
    id: 'backyard-landscape',
    name: '后院景观灯',
    status: '开启',
    detail: '50%',
    icon: 'park',
    selected: true,
    editable: false,
  },
  {
    id: 'pond-underwater',
    name: '池塘水下灯',
    status: '开启',
    detail: '彩色 · 淡蓝色',
    icon: 'waves',
    selected: true,
    editable: false,
  },
  {
    id: 'terrace-strip',
    name: '露台灯带',
    status: '开启',
    detail: '85%',
    icon: 'linear_scale',
    selected: true,
    editable: true,
  },
] as const;

export function OwnerLightPlanCreatePage() {
  const [enabled, setEnabled] = useState(true);
  const [activeTrigger, setActiveTrigger] = useState<(typeof triggerModes)[number]>('日落后');
  const [activeOffset, setActiveOffset] = useState<(typeof offsets)[number]>('15m');
  const [selectedDays, setSelectedDays] = useState(new Set<(typeof weekDays)[number]>(['一', '二', '三', '四', '五']));

  return (
    <div className="owner-light-plan-create-page">
      <header className="owner-light-plan-create-topbar">
        <Link to="/owner/plans/create" className="owner-light-plan-create-icon-button" aria-label="返回计划类型">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1>创建灯光计划</h1>
        <button type="button" className="owner-light-plan-create-save">
          保存
        </button>
      </header>

      <main className="owner-light-plan-create-main">
        <section className="owner-light-plan-create-card owner-light-plan-create-basic-card">
          <label className="owner-light-plan-create-field">
            <span>计划名称</span>
            <input type="text" defaultValue="每日夜景灯光" aria-label="计划名称" />
          </label>

          <div className="owner-light-plan-create-toggle-row">
            <span>启用计划</span>
            <button
              type="button"
              className={`owner-light-plan-create-switch${enabled ? ' is-on' : ''}`}
              aria-pressed={enabled}
              aria-label="启用计划"
              onClick={() => setEnabled((current) => !current)}
            />
          </div>
        </section>

        <section className="owner-light-plan-create-section" aria-labelledby="trigger-title">
          <h2 id="trigger-title">触发设置</h2>

          <div className="owner-light-plan-create-segmented" role="tablist" aria-label="触发方式">
            {triggerModes.map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={activeTrigger === mode}
                className={activeTrigger === mode ? 'active' : ''}
                onClick={() => setActiveTrigger(mode)}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="owner-light-plan-create-card owner-light-plan-create-trigger-card">
            <div className="owner-light-plan-create-offset-head">
              <span>日落偏移</span>
              <strong>+15 分钟</strong>
            </div>
            <div className="owner-light-plan-create-offset-options" aria-label="日落偏移">
              {offsets.map((offset) => (
                <button
                  key={offset}
                  type="button"
                  className={activeOffset === offset ? 'active' : ''}
                  onClick={() => setActiveOffset(offset)}
                >
                  {offset}
                </button>
              ))}
            </div>

            <div className="owner-light-plan-create-time-row">
              <span className="material-symbols-outlined">schedule</span>
              <span>结束时间</span>
              <strong>23:30</strong>
            </div>
          </div>
        </section>

        <section className="owner-light-plan-create-section" aria-labelledby="repeat-title">
          <h2 id="repeat-title">重复</h2>
          <div className="owner-light-plan-create-week-row" aria-label="重复日期">
            {weekDays.map((day) => {
              const isSelected = selectedDays.has(day);

              return (
                <button
                  key={day}
                  type="button"
                  className={isSelected ? 'active' : ''}
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedDays((current) => {
                      const next = new Set(current);
                      if (next.has(day)) {
                        next.delete(day);
                      } else {
                        next.add(day);
                      }
                      return next;
                    })
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>
        </section>

        <section className="owner-light-plan-create-section" aria-labelledby="devices-title">
          <div className="owner-light-plan-create-section-head">
            <h2 id="devices-title">执行设备（4）</h2>
            <button type="button">
              <span className="material-symbols-outlined">add_circle</span>
              添加
            </button>
          </div>

          <div className="owner-light-plan-create-device-list">
            {lightDevices.map((device) => (
              <article key={device.id} className="owner-light-plan-create-device-card">
                <div className="owner-light-plan-create-device-icon">
                  <span className="material-symbols-outlined">{device.icon}</span>
                </div>
                <div className="owner-light-plan-create-device-copy">
                  <h3>{device.name}</h3>
                  <div>
                    <span>{device.status}</span>
                    <p>{device.detail}</p>
                  </div>
                </div>
                {device.editable ? (
                  <button type="button" className="owner-light-plan-create-device-edit" aria-label="编辑露台灯带">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                ) : (
                  <span className="material-symbols-outlined owner-light-plan-create-device-arrow">chevron_right</span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="owner-light-plan-create-summary">
          <div className="owner-light-plan-create-summary-icon">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <h2>计划概要</h2>
            <p>每天日落后 15 分钟开启，23:30 自动关闭，执行 4 个灯光设备</p>
          </div>
        </section>
      </main>
    </div>
  );
}
