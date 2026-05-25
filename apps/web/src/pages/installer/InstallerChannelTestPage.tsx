import { Link, useLocation, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

type TestChannel = {
  id: string;
  code: string;
  name: string;
  icon: string;
  statusLabel: string;
  statusTone: 'neutral' | 'running';
  duration?: string;
  testStateLabel: string;
  testStateTone: 'muted' | 'running' | 'success' | 'error';
  actionLabel: string;
  actionTone: 'primary' | 'danger' | 'outlined';
  highlighted?: boolean;
};

const testChannels: readonly TestChannel[] = [
  {
    id: 'ch1',
    code: 'CH1',
    name: '池塘循环泵',
    icon: 'water_pump',
    statusLabel: '关闭',
    statusTone: 'neutral',
    testStateLabel: '未测试',
    testStateTone: 'muted',
    actionLabel: '开启 10 秒',
    actionTone: 'primary',
  },
  {
    id: 'ch2',
    code: 'CH2',
    name: '喷泉泵',
    icon: 'sprinkler',
    statusLabel: '运行中',
    statusTone: 'running',
    duration: '08s',
    testStateLabel: '测试中',
    testStateTone: 'running',
    actionLabel: '立即停止',
    actionTone: 'danger',
    highlighted: true,
  },
  {
    id: 'ch3',
    code: 'CH3',
    name: '补水阀',
    icon: 'water_drop',
    statusLabel: '关闭',
    statusTone: 'neutral',
    testStateLabel: '成功',
    testStateTone: 'success',
    actionLabel: '开启 5 秒',
    actionTone: 'outlined',
  },
  {
    id: 'ch4',
    code: 'CH4',
    name: '户外插座',
    icon: 'electrical_services',
    statusLabel: '关闭',
    statusTone: 'neutral',
    testStateLabel: '失败',
    testStateTone: 'error',
    actionLabel: '开启 10 秒',
    actionTone: 'primary',
  },
] as const;

const telemetry = [
  { id: 'voltage', label: '总线电压', value: '24.18V' },
  { id: 'current', label: '工作电流', value: '1.42A' },
  { id: 'signal', label: '信号强度 (RSSI)', value: '-68 dBm' },
  { id: 'temp', label: '主板温度', value: '42.5°C' },
] as const;

export function InstallerChannelTestPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;
  const backTo =
    typeof location.state === 'object' &&
    location.state !== null &&
    'backTo' in location.state &&
    typeof location.state.backTo === 'string'
      ? location.state.backTo
      : `/installer/projects/${detail?.id}/channels`;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-channel-test-page">
      <header className="installer-channel-test-topbar">
        <div className="installer-channel-test-topbar-main">
          <Link
            to={backTo}
            className="installer-channel-test-icon-button"
            aria-label="返回上一页"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-channel-test-title-wrap">
            <h1>通道测试</h1>
            <div className="installer-channel-test-chip-row">
              <span>王先生后院</span>
              <span>Outdoor Relay 4CH</span>
            </div>
          </div>
        </div>

        <button type="button" className="installer-channel-test-icon-button" aria-label="测试设置">
          <span className="material-symbols-outlined">settings_applications</span>
        </button>
      </header>

      <div className="installer-channel-test-warning">
        <span className="material-symbols-outlined">warning</span>
        <p>测试中离开页面将自动关闭设备</p>
      </div>

      <main className="installer-channel-test-main">
        <div className="installer-channel-test-meta">
          <div>
            <p>NODE_ID: 8842_HV_RLY</p>
            <p>IP: 192.168.1.142</p>
          </div>
          <div className="installer-channel-test-connection-badge">
            <span className="installer-channel-test-connection-dot" aria-hidden="true" />
            <span>已连接</span>
          </div>
        </div>

        <section className="installer-channel-test-grid" aria-label="通道测试列表">
          {testChannels.map((channel) => (
            <article
              key={channel.id}
              className={
                channel.highlighted
                  ? 'installer-channel-test-card installer-channel-test-card-active'
                  : 'installer-channel-test-card'
              }
            >
              {channel.highlighted ? <span className="installer-channel-test-live-dot" aria-hidden="true" /> : null}

              <div className="installer-channel-test-card-head">
                <div className="installer-channel-test-card-title">
                  <div
                    className={
                      channel.highlighted
                        ? 'installer-channel-test-card-icon active'
                        : 'installer-channel-test-card-icon'
                    }
                  >
                    <span className="material-symbols-outlined">{channel.icon}</span>
                  </div>
                  <div>
                    <p>{channel.code}</p>
                    <h3>{channel.name}</h3>
                  </div>
                </div>

                <div className="installer-channel-test-status-wrap">
                  <span
                    className={
                      channel.statusTone === 'running'
                        ? 'installer-channel-test-status-badge running'
                        : 'installer-channel-test-status-badge'
                    }
                  >
                    {channel.statusLabel}
                  </span>
                  {channel.duration ? <strong>{channel.duration}</strong> : null}
                </div>
              </div>

              <div
                className={
                  channel.highlighted
                    ? 'installer-channel-test-card-foot active'
                    : 'installer-channel-test-card-foot'
                }
              >
                <div className="installer-channel-test-state">
                  <span>测试状态</span>
                  <strong
                    className={
                      channel.testStateTone === 'running'
                        ? 'running'
                        : channel.testStateTone === 'success'
                          ? 'success'
                          : channel.testStateTone === 'error'
                            ? 'error'
                            : 'muted'
                    }
                  >
                    <span className="material-symbols-outlined">
                      {channel.testStateTone === 'running'
                        ? 'refresh'
                        : channel.testStateTone === 'success'
                          ? 'check_circle'
                          : channel.testStateTone === 'error'
                            ? 'error'
                            : 'radio_button_unchecked'}
                    </span>
                    <span>{channel.testStateLabel}</span>
                  </strong>
                </div>

                <button
                  type="button"
                  className={
                    channel.actionTone === 'danger'
                      ? 'installer-channel-test-action installer-channel-test-action-danger'
                      : channel.actionTone === 'outlined'
                        ? 'installer-channel-test-action installer-channel-test-action-outlined'
                        : 'installer-channel-test-action installer-channel-test-action-primary'
                  }
                >
                  {channel.actionLabel}
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="installer-channel-test-telemetry-card">
          <h4>
            <span className="material-symbols-outlined">monitoring</span>
            <span>实时遥测数据</span>
          </h4>
          <div className="installer-channel-test-telemetry-grid">
            {telemetry.map((item) => (
              <div key={item.id}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="installer-channel-test-footer">
        <button type="button" className="installer-channel-test-done">
          全部测试完成
        </button>
        <button type="button" className="installer-channel-test-save">
          <span className="material-symbols-outlined">save</span>
          <span>保存测试结果</span>
        </button>
      </footer>
    </div>
  );
}
