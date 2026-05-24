import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const rules = [
  {
    id: 'dry-run-protection',
    title: '缺水停泵',
    icon: 'security',
    tone: 'danger',
    enabled: true,
    ifText: "'池塘水位' == 低",
    ifTone: 'danger',
    thenText: "关闭 '喷泉泵、瀑布泵'",
    thenTone: 'danger',
  },
  {
    id: 'auto-refill',
    title: '自动补水',
    icon: 'water_drop',
    tone: 'secondary',
    enabled: true,
    ifText: "'池塘水位' == 低",
    ifTone: 'secondary',
    thenText: "打开 '补水阀' until '水位恢复' (Max 10m)",
    thenTone: 'secondary',
  },
  {
    id: 'refill-timeout',
    title: '补水超时保护',
    icon: 'timer_off',
    tone: 'danger',
    enabled: true,
    ifText: "'补水时长' > 10 mins",
    ifTone: 'danger',
    thenText: "关闭 '补水阀' & 发出告警",
    thenTone: 'danger',
  },
  {
    id: 'max-runtime',
    title: '设备最长运行保护',
    icon: 'power_settings_new',
    tone: 'tertiary',
    enabled: true,
    ifText: "'户外插座' 运行时长 > 6 hrs",
    ifTone: 'tertiary',
    thenText: '自动关闭',
    thenTone: 'tertiary',
  },
  {
    id: 'rain-delay',
    title: '雨天跳过灌溉',
    icon: 'cloud_off',
    tone: 'secondary',
    enabled: true,
    ifText: "'12h 降雨概率' > 60%",
    ifTone: 'secondary',
    thenText: "跳过 '灌溉计划'",
    thenTone: 'muted',
  },
] as const;

export function InstallerAutomationRulesPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-automation-page">
      <header className="installer-automation-topbar">
        <div className="installer-automation-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}`}
            className="installer-automation-back"
            aria-label="返回项目详情"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <p>{detail.name}</p>
            <h1>自动规则</h1>
          </div>
        </div>

        <button type="button" className="installer-automation-create-button">
          <span className="material-symbols-outlined">add</span>
          <span>新建规则</span>
        </button>
      </header>

      <main className="installer-automation-main">
        <section className="installer-automation-intro">
          <h2>保护与自动化规则</h2>
          <p>在此配置设备的安全保护阈值与自动执行逻辑，确保系统稳定运行。</p>
        </section>

        <section className="installer-automation-grid" aria-label="自动化规则列表">
          {rules.map((rule) => (
            <article key={rule.id} className="installer-automation-rule-card">
              <span className={`installer-automation-rule-rail installer-automation-rule-rail-${rule.tone}`} aria-hidden="true" />

              <div className="installer-automation-rule-head">
                <div className="installer-automation-rule-title">
                  <span className={`installer-automation-rule-icon installer-automation-rule-icon-${rule.tone}`}>
                    <span className="material-symbols-outlined">{rule.icon}</span>
                  </span>
                  <h3>{rule.title}</h3>
                </div>

                <button
                  type="button"
                  aria-pressed={rule.enabled}
                  className={rule.enabled ? 'installer-automation-switch active' : 'installer-automation-switch'}
                >
                  <span />
                </button>
              </div>

              <div className="installer-automation-rule-condition">
                <span>IF</span>
                <div className="installer-automation-rule-copy">
                  {rule.ifTone === 'danger' ? (
                    <>
                      {"'池塘水位' "}
                      <strong className="danger">== 低</strong>
                    </>
                  ) : rule.ifTone === 'secondary' && rule.id === 'auto-refill' ? (
                    <>
                      {"'池塘水位' "}
                      <strong className="secondary">== 低</strong>
                    </>
                  ) : rule.ifTone === 'secondary' && rule.id === 'rain-delay' ? (
                    <>
                      {"'12h 降雨概率' "}
                      <strong className="secondary">{'> 60%'}</strong>
                    </>
                  ) : rule.ifTone === 'tertiary' ? (
                    <>
                      {"'户外插座' 运行时长 "}
                      <strong className="tertiary">{'> 6 hrs'}</strong>
                    </>
                  ) : (
                    <>
                      {"'补水时长' "}
                      <strong className="danger">{'> 10 mins'}</strong>
                    </>
                  )}
                </div>
              </div>

              <div className="installer-automation-rule-arrow">
                <span className="material-symbols-outlined">arrow_downward</span>
              </div>

              <div className={`installer-automation-rule-action installer-automation-rule-action-${rule.thenTone}`}>
                <span>THEN</span>
                <div className="installer-automation-rule-copy">
                  {rule.id === 'dry-run-protection' ? (
                    <>
                      <strong>关闭</strong> {"'喷泉泵、瀑布泵'"}
                    </>
                  ) : rule.id === 'auto-refill' ? (
                    <>
                      <strong>打开</strong> {"'补水阀' until '水位恢复' (Max 10m)"}
                    </>
                  ) : rule.id === 'refill-timeout' ? (
                    <>
                      <strong>关闭</strong> {"'补水阀' & "} <strong>发出告警</strong>
                    </>
                  ) : rule.id === 'max-runtime' ? (
                    <strong>自动关闭</strong>
                  ) : (
                    <>
                      <strong>跳过</strong> {"'灌溉计划'"}
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
