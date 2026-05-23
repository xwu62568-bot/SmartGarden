import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ownerIrrigationPlanDetails, ownerLightPlanDetails, ownerPlans, ownerWaterPlanDetails } from '../../shared/mock/owner';

const deviceToneClassName = (tone: 'primary' | 'secondary') =>
  `owner-light-plan-detail-device-icon owner-light-plan-detail-device-icon-${tone}`;

const historyToneClassName = (tone: 'success' | 'error') =>
  `owner-light-plan-detail-history-dot owner-light-plan-detail-history-dot-${tone}`;

const historyIcon = (tone: 'success' | 'error') => (tone === 'success' ? 'check_circle' : 'error');
const waterHistoryIcon = (tone: 'success' | 'protected') => (tone === 'success' ? 'check' : 'warning');
const irrigationHistoryIcon = (tone: 'success' | 'skip' | 'error') =>
  tone === 'success' ? 'check_circle' : tone === 'skip' ? 'cloud_off' : 'warning';

export function OwnerPlanDetailPage() {
  const { planId } = useParams();
  const lightPlanDetail = planId ? ownerLightPlanDetails[planId] : undefined;
  const waterPlanDetail = planId ? ownerWaterPlanDetails[planId] : undefined;
  const irrigationPlanDetail = planId ? ownerIrrigationPlanDetails[planId] : undefined;
  const plan = ownerPlans.find((item) => item.id === planId);
  const [enabled, setEnabled] = useState(
    lightPlanDetail?.enabled ?? waterPlanDetail?.enabled ?? irrigationPlanDetail?.enabled ?? plan?.status === '启用',
  );

  if (lightPlanDetail) {
    return (
      <div className="owner-light-plan-detail-page">
        <header className="owner-light-plan-detail-header">
          <div className="owner-light-plan-detail-header-row">
            <Link to="/owner/plans" className="owner-light-plan-detail-header-button" aria-label="返回计划列表">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>

            <h1 className="owner-light-plan-detail-title">{lightPlanDetail.name}</h1>

            <div className="owner-light-plan-detail-header-actions">
              <label className="owner-light-plan-detail-switch-wrap" aria-label="启用计划">
                <input type="checkbox" checked={enabled} onChange={() => setEnabled((current) => !current)} />
                <span className="owner-light-plan-detail-switch" />
              </label>
              <button type="button" className="owner-light-plan-detail-header-button" aria-label="更多操作">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </header>

        <main className="owner-light-plan-detail-main">
          <section className="owner-light-plan-detail-hero">
            <img src={lightPlanDetail.heroImage} alt="Night Garden" className="owner-light-plan-detail-hero-image" />
            <div className="owner-light-plan-detail-hero-overlay" />
            <div className="owner-light-plan-detail-hero-copy">
              <div className="owner-light-plan-detail-hero-meta">
                <p className="owner-light-plan-detail-hero-kind">
                  <span className="material-symbols-outlined">wb_twilight</span>
                  <span>{lightPlanDetail.categoryLabel}</span>
                </p>
                <h2>{lightPlanDetail.triggerLabel}</h2>
                <div className="owner-light-plan-detail-hero-tags">
                  <span>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{lightPlanDetail.endLabel}</span>
                  </span>
                  <span>
                    <span className="material-symbols-outlined">event_repeat</span>
                    <span>{lightPlanDetail.repeatLabel}</span>
                  </span>
                </div>
              </div>

              <div className="owner-light-plan-detail-owner-badge">{lightPlanDetail.ownerBadge}</div>
            </div>
          </section>

          <section className="owner-light-plan-detail-summary-card">
            <div className="owner-light-plan-detail-summary-icon">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div className="owner-light-plan-detail-summary-copy">
              <h3>{lightPlanDetail.summaryTitle}</h3>
              <p>{lightPlanDetail.summaryText}</p>
              <div className="owner-light-plan-detail-summary-next">
                <span className="material-symbols-outlined">update</span>
                <span>{lightPlanDetail.nextRunLabel}</span>
              </div>
            </div>
          </section>

          <section className="owner-light-plan-detail-section">
            <div className="owner-light-plan-detail-section-head">
              <h3>
                <span className="material-symbols-outlined">format_list_bulleted</span>
                <span>执行设备</span>
              </h3>
              <span>{lightPlanDetail.devices.length} 个设备</span>
            </div>

            <div className="owner-light-plan-detail-device-list">
              {lightPlanDetail.devices.map((device) => (
                <article key={device.id} className="owner-light-plan-detail-device-card">
                  <div className={deviceToneClassName(device.tone)}>
                    <span className="material-symbols-outlined">{device.icon}</span>
                  </div>
                  <div className="owner-light-plan-detail-device-copy">
                    <h4>{device.name}</h4>
                    <div className="owner-light-plan-detail-device-tags">
                      <span className="owner-light-plan-detail-chip owner-light-plan-detail-chip-brightness">
                        {device.brightness}
                      </span>
                      <span className={`owner-light-plan-detail-chip owner-light-plan-detail-chip-${device.colorTone}`}>
                        {device.colorLabel}
                      </span>
                    </div>
                  </div>
                  <div className="owner-light-plan-detail-device-state">{device.state}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="owner-light-plan-detail-actions">
            <button type="button" className="owner-light-plan-detail-action-primary">
              <span className="material-symbols-outlined">play_arrow</span>
              <span>立即执行一次</span>
            </button>
            <button type="button" className="owner-light-plan-detail-action-secondary">
              <span className="material-symbols-outlined">pause</span>
              <span>暂停今天</span>
            </button>

            <div className="owner-light-plan-detail-utility-grid">
              <button type="button" className="owner-light-plan-detail-utility-button">
                <span className="material-symbols-outlined">edit</span>
                <span>编辑计划</span>
              </button>
              <button type="button" className="owner-light-plan-detail-utility-button">
                <span className="material-symbols-outlined">content_copy</span>
                <span>复制计划</span>
              </button>
              <button type="button" className="owner-light-plan-detail-utility-button danger">
                <span className="material-symbols-outlined">delete</span>
                <span>删除计划</span>
              </button>
            </div>
          </section>

          <section className="owner-light-plan-detail-section">
            <h3 className="owner-light-plan-detail-history-title">
              <span className="material-symbols-outlined">history</span>
              <span>执行记录</span>
            </h3>

            <div className="owner-light-plan-detail-history-list">
              {lightPlanDetail.histories.map((entry) => (
                <article key={entry.id} className="owner-light-plan-detail-history-row">
                  <span className={historyToneClassName(entry.tone)} />
                  <div className="owner-light-plan-detail-history-copy">
                    <p>{entry.time}</p>
                    <span>{entry.message}</span>
                  </div>
                  <span className={`material-symbols-outlined owner-light-plan-detail-history-icon ${entry.tone}`}>
                    {historyIcon(entry.tone)}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (waterPlanDetail) {
    return (
      <div className="owner-water-plan-detail-page">
        <header className="owner-water-plan-detail-header">
          <div className="owner-water-plan-detail-header-row">
            <div className="owner-water-plan-detail-title-group">
              <Link to="/owner/plans" className="owner-water-plan-detail-header-button" aria-label="返回计划列表">
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <h1 className="owner-water-plan-detail-title">{waterPlanDetail.name}</h1>
            </div>

            <div className="owner-water-plan-detail-header-actions">
              <label className="owner-light-plan-detail-switch-wrap" aria-label="启用计划">
                <input type="checkbox" checked={enabled} onChange={() => setEnabled((current) => !current)} />
                <span className="owner-light-plan-detail-switch" />
              </label>
              <button type="button" className="owner-water-plan-detail-header-button" aria-label="更多操作">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </header>

        <main className="owner-water-plan-detail-main">
          <section className="owner-water-plan-detail-summary-card">
            <div className="owner-water-plan-detail-hero">
              <img src={waterPlanDetail.heroImage} alt="Garden Fountain" className="owner-water-plan-detail-hero-image" />
              <div className="owner-water-plan-detail-hero-overlay" />
              <div className="owner-water-plan-detail-status-badge">{waterPlanDetail.statusBadge}</div>
            </div>

            <div className="owner-water-plan-detail-meta-grid">
              <div>
                <p>计划类型</p>
                <strong>{waterPlanDetail.typeLabel}</strong>
              </div>
              <div>
                <p>执行周期</p>
                <strong>{waterPlanDetail.cycleLabel}</strong>
              </div>
              <div>
                <p>触发时段</p>
                <strong className="with-icon">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>{waterPlanDetail.scheduleLabel}</span>
                </strong>
              </div>
              <div>
                <p>来源</p>
                <strong>{waterPlanDetail.sourceLabel}</strong>
              </div>
            </div>
          </section>

          <section className="owner-water-plan-detail-protection-card">
            <div className="owner-water-plan-detail-protection-watermark" aria-hidden="true">
              <span className="material-symbols-outlined">shield</span>
            </div>

            <div className="owner-water-plan-detail-protection-head">
              <div className="owner-water-plan-detail-protection-icon">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h2>{waterPlanDetail.protectionTitle}</h2>
            </div>

            <div className="owner-water-plan-detail-protection-list">
              {waterPlanDetail.protections.map((item) => (
                <article key={item.id} className="owner-water-plan-detail-protection-row">
                  <div className="owner-water-plan-detail-protection-label">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <footer className="owner-water-plan-detail-protection-footer">
              <span className="material-symbols-outlined">info</span>
              <span>{waterPlanDetail.protectionFooter}</span>
            </footer>
          </section>

          <section className="owner-water-plan-detail-section">
            <h3>执行设备状态</h3>
            <div className="owner-water-plan-detail-device-list">
              {waterPlanDetail.devices.map((device) => (
                <article key={device.id} className={`owner-water-plan-detail-device-card owner-water-plan-detail-device-card-${device.statusTone}`}>
                  <div className={`owner-water-plan-detail-device-icon owner-water-plan-detail-device-icon-${device.tone}`}>
                    <span className="material-symbols-outlined">{device.icon}</span>
                  </div>
                  <div className="owner-water-plan-detail-device-copy">
                    <p>{device.name}</p>
                    <span>{device.schedule}</span>
                  </div>
                  <div className={`owner-water-plan-detail-device-pill owner-water-plan-detail-device-pill-${device.statusTone}`}>
                    {device.statusTone === 'active' ? <span className="owner-water-plan-detail-status-dot" aria-hidden="true" /> : null}
                    <span>{device.statusLabel}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="owner-water-plan-detail-actions">
            <button type="button" className="owner-water-plan-detail-action-primary">
              <span className="material-symbols-outlined">play_arrow</span>
              <span>立即开启 30 分钟</span>
            </button>
            <button type="button" className="owner-water-plan-detail-action-secondary">
              <span className="material-symbols-outlined">pause</span>
              <span>暂停今天</span>
            </button>
            <button type="button" className="owner-water-plan-detail-action-muted" disabled>
              <span className="material-symbols-outlined">lock</span>
              <span>编辑计划</span>
            </button>
            <button type="button" className="owner-water-plan-detail-action-contact">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span>联系安装商</span>
            </button>
          </section>

          <section className="owner-water-plan-detail-history-card">
            <h3>执行历史</h3>
            <div className="owner-water-plan-detail-history-list">
              {waterPlanDetail.histories.map((entry) => (
                <article key={entry.id} className="owner-water-plan-detail-history-row">
                  <div className={`owner-water-plan-detail-history-bullet owner-water-plan-detail-history-bullet-${entry.tone}`}>
                    <span className="material-symbols-outlined">{waterHistoryIcon(entry.tone)}</span>
                  </div>
                  <div className="owner-water-plan-detail-history-copy">
                    <div className="owner-water-plan-detail-history-top">
                      <p className={entry.tone === 'protected' ? 'protected' : ''}>{entry.time}</p>
                      <span className={`owner-water-plan-detail-history-label owner-water-plan-detail-history-label-${entry.tone}`}>
                        {entry.label}
                      </span>
                    </div>
                    <span className={entry.tone === 'protected' ? 'protected' : ''}>{entry.message}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (irrigationPlanDetail) {
    return (
      <div className="owner-irrigation-plan-detail-page">
        <header className="owner-irrigation-plan-detail-header">
          <div className="owner-irrigation-plan-detail-header-row">
            <div className="owner-irrigation-plan-detail-header-main">
              <Link to="/owner/plans" className="owner-irrigation-plan-detail-header-button" aria-label="返回计划列表">
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <h1>{irrigationPlanDetail.name}</h1>
            </div>

            <div className="owner-irrigation-plan-detail-header-actions">
              <label className="owner-light-plan-detail-switch-wrap" aria-label="启用计划">
                <input type="checkbox" checked={enabled} onChange={() => setEnabled((current) => !current)} />
                <span className="owner-light-plan-detail-switch" />
              </label>
              <button type="button" className="owner-irrigation-plan-detail-header-button" aria-label="更多操作">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </header>

        <main className="owner-irrigation-plan-detail-main">
          <section className="owner-irrigation-plan-detail-overview-card">
            <div className="owner-irrigation-plan-detail-overview-top">
              <div>
                <span className="owner-irrigation-plan-detail-kind">{irrigationPlanDetail.categoryLabel}</span>
                <h2>{irrigationPlanDetail.name}</h2>
              </div>
              <div className="owner-irrigation-plan-detail-duration">
                <p>总时长</p>
                <strong>{irrigationPlanDetail.totalDuration}</strong>
              </div>
            </div>

            <div className="owner-irrigation-plan-detail-meta-grid">
              <div>
                <p>
                  <span className="material-symbols-outlined">schedule</span> 开始时间
                </p>
                <strong>{irrigationPlanDetail.startTime}</strong>
              </div>
              <div>
                <p>
                  <span className="material-symbols-outlined">event_repeat</span> 重复
                </p>
                <strong>{irrigationPlanDetail.repeatLabel}</strong>
              </div>
              <div>
                <p>
                  <span className="material-symbols-outlined">update</span> 下次运行
                </p>
                <strong className="secondary">{irrigationPlanDetail.nextRunLabel}</strong>
              </div>
              <div>
                <p>
                  <span className="material-symbols-outlined">person</span> 来源
                </p>
                <strong>{irrigationPlanDetail.sourceLabel}</strong>
              </div>
            </div>
          </section>

          <section className="owner-irrigation-plan-detail-rain-card">
            <div className="owner-irrigation-plan-detail-rain-icon">
              <span className="material-symbols-outlined">cloud_done</span>
            </div>
            <div className="owner-irrigation-plan-detail-rain-copy">
              <div className="owner-irrigation-plan-detail-rain-head">
                <h3>{irrigationPlanDetail.rainSkipTitle}</h3>
                <span>{irrigationPlanDetail.rainSkipStatus}</span>
              </div>
              <p>{irrigationPlanDetail.rainSkipCondition}</p>
              <div className="owner-irrigation-plan-detail-rain-status">
                <span className="owner-irrigation-plan-detail-rain-dot" aria-hidden="true" />
                <strong>{irrigationPlanDetail.rainSkipToday}</strong>
              </div>
            </div>
          </section>

          <section className="owner-irrigation-plan-detail-section">
            <div className="owner-irrigation-plan-detail-section-head">
              <h3>执行区域 ({irrigationPlanDetail.zones.length})</h3>
              <span>按序执行</span>
            </div>

            <div className="owner-irrigation-plan-detail-zone-list">
              {irrigationPlanDetail.zones.map((zone) => (
                <article key={zone.id} className="owner-irrigation-plan-detail-zone-card">
                  <div className="owner-irrigation-plan-detail-zone-order">{zone.order}</div>
                  <div className="owner-irrigation-plan-detail-zone-copy">
                    <div className="owner-irrigation-plan-detail-zone-top">
                      <p>{zone.name}</p>
                      <strong>{zone.duration}</strong>
                    </div>
                    <div className="owner-irrigation-plan-detail-zone-meta">
                      <span>{zone.sequenceLabel}</span>
                      <span>{zone.protectionLabel}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined owner-irrigation-plan-detail-zone-handle">drag_handle</span>
                </article>
              ))}
            </div>
          </section>

          <section className="owner-irrigation-plan-detail-actions">
            <button type="button" className="owner-irrigation-plan-detail-action-primary">
              <span className="material-symbols-outlined">play_arrow</span>
              <span>立即执行一次</span>
            </button>
            <button type="button" className="owner-irrigation-plan-detail-action-secondary">暂停 24 小时</button>
            <button type="button" className="owner-irrigation-plan-detail-action-secondary">暂停 3 天</button>

            <div className="owner-irrigation-plan-detail-utility-grid">
              <button type="button" className="owner-irrigation-plan-detail-utility-button">
                <span className="material-symbols-outlined">edit</span>
                <span>编辑</span>
              </button>
              <button type="button" className="owner-irrigation-plan-detail-utility-button">
                <span className="material-symbols-outlined">content_copy</span>
                <span>复制</span>
              </button>
              <button type="button" className="owner-irrigation-plan-detail-utility-button danger">
                <span className="material-symbols-outlined">delete</span>
                <span>删除</span>
              </button>
            </div>
          </section>

          <section className="owner-irrigation-plan-detail-history-section">
            <h3>执行历史</h3>
            <div className="owner-irrigation-plan-detail-history-list">
              {irrigationPlanDetail.histories.map((entry) => (
                <article key={entry.id} className="owner-irrigation-plan-detail-history-row">
                  <div className={`owner-irrigation-plan-detail-history-icon owner-irrigation-plan-detail-history-icon-${entry.tone}`}>
                    <span className="material-symbols-outlined">{irrigationHistoryIcon(entry.tone)}</span>
                  </div>
                  <div className="owner-irrigation-plan-detail-history-copy">
                    <p>{entry.title}</p>
                    <span className={entry.tone === 'error' ? 'error' : ''}>{entry.message}</span>
                    {entry.tone === 'error' ? (
                      <div className="owner-irrigation-plan-detail-history-actions">
                        <button type="button">查看设备</button>
                        <button type="button">联系安装商</button>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!plan) {
    return <div className="muted-text">未找到计划。</div>;
  }

  return (
    <div className="stack">
      <div className="muted-text">计划详情暂未复刻。</div>
      <Link to="/owner/plans" className="detail-link">
        返回计划列表
      </Link>
    </div>
  );
}
