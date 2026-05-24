import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const gateways = ['Gateway_01 (Backyard Main)', 'Gateway_02 (Front Entrance)'] as const;
const zones = ['后院 (Backyard)', '前院 (Front Yard)', '池塘 (Pond)'] as const;

const scannerBackgroundImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWg1JMPGxfu-hIZm5Mff-d2sOtJbjUYdzs0D_TyJQ-DtZneQc5wqk_EDoq7OlkDy2cx_2Q3etmOakd6Y2sS2hyVutcTeOfQs2q2tLQqVnkldkGvn8Q-LUluQgc2W0ajS81maj_YZFJj7GS_-jSkQ3TKwpjwtdRBVFE9bDZhbJ6ZCFDD4S6z9-YydialicFNbj8FMEFbuCkOLuczAGPsiQUZ9DkwxlDNnI8hpj9TVtnfoC1g6KbqZoIsfa25EM-oL2OJSvM1uiu91Q';

export function InstallerAddDevicePage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(true);
  const [selectedGateway, setSelectedGateway] = useState<(typeof gateways)[number]>(gateways[0]);
  const [selectedZone, setSelectedZone] = useState<(typeof zones)[number]>(zones[0]);
  const [deviceName, setDeviceName] = useState('Zone 4 Sprinkler Hub');

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-add-device-page">
      <header className="installer-add-device-topbar">
        <div className="installer-add-device-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}`}
            className="installer-add-device-icon-button"
            aria-label="返回项目详情"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-add-device-title-wrap">
            <h1>添加设备</h1>
            <span>{`项目：${detail.name}`}</span>
          </div>
        </div>

        <button type="button" className="installer-add-device-icon-button" aria-label="帮助">
          <span className="material-symbols-outlined">help</span>
        </button>
      </header>

      <main className="installer-add-device-scanner">
        <div className="installer-add-device-camera">
          <img src={scannerBackgroundImage} alt="Scanner View Background" />
        </div>

        <div className="installer-add-device-overlay">
          <button
            type="button"
            className="installer-add-device-scan-window"
            aria-label="扫码区域"
            onClick={() => setSheetExpanded((current) => !current)}
          >
            <span className="installer-add-device-corner top-left" />
            <span className="installer-add-device-corner top-right" />
            <span className="installer-add-device-corner bottom-left" />
            <span className="installer-add-device-corner bottom-right" />
            <span className="installer-add-device-scan-line" />
          </button>

          <p className="installer-add-device-prompt">将二维码放入框内即可自动扫描</p>

          <div className="installer-add-device-tools">
            <button
              type="button"
              className="installer-add-device-tool"
              onClick={() => setFlashEnabled((current) => !current)}
            >
              <span className={flashEnabled ? 'installer-add-device-tool-icon active' : 'installer-add-device-tool-icon'}>
                <span className="material-symbols-outlined">
                  {flashEnabled ? 'flashlight_off' : 'flashlight_on'}
                </span>
              </span>
              <span>手电筒</span>
            </button>

            <button type="button" className="installer-add-device-tool">
              <span className="installer-add-device-tool-icon">
                <span className="material-symbols-outlined">image</span>
              </span>
              <span>相册</span>
            </button>
          </div>
        </div>

        <div className="installer-add-device-alternative-bar">
          <button type="button" className="installer-add-device-chip">
            <span className="material-symbols-outlined">bluetooth</span>
            <span>蓝牙搜索</span>
          </button>
          <button type="button" className="installer-add-device-chip">
            <span className="material-symbols-outlined">keyboard</span>
            <span>手动输入</span>
          </button>
        </div>
      </main>

      <section
        className={
          sheetExpanded
            ? 'installer-add-device-sheet'
            : 'installer-add-device-sheet installer-add-device-sheet-collapsed'
        }
      >
        <div className="installer-add-device-sheet-panel">
          <div className="installer-add-device-sheet-handle" />

          <div className="installer-add-device-sheet-head">
            <div className="installer-add-device-device-summary">
              <div className="installer-add-device-device-icon">
                <span className="material-symbols-outlined">settings_input_component</span>
              </div>
              <div>
                <h2>HT-SmartHub Pro</h2>
                <p>控制器 (Controller)</p>
              </div>
            </div>

            <div className="installer-add-device-bindable-badge">
              <span className="installer-add-device-bindable-dot" aria-hidden="true" />
              <span>可绑定</span>
            </div>
          </div>

          <div className="installer-add-device-tech-grid">
            <div>
              <span>序列号 (S/N)</span>
              <strong>SN 8821093321</strong>
            </div>
            <div>
              <span>固件版本</span>
              <strong>V2.4.1</strong>
            </div>
          </div>

          <div className="installer-add-device-form">
            <label className="installer-add-device-field">
              <span>选择网关</span>
              <div className="installer-add-device-select-wrap">
                <select value={selectedGateway} onChange={(event) => setSelectedGateway(event.target.value as (typeof gateways)[number])}>
                  {gateways.map((gateway) => (
                    <option key={gateway} value={gateway}>
                      {gateway}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </label>

            <div className="installer-add-device-form-grid">
              <label className="installer-add-device-field">
                <span>选择区域</span>
                <div className="installer-add-device-select-wrap">
                  <select value={selectedZone} onChange={(event) => setSelectedZone(event.target.value as (typeof zones)[number])}>
                    {zones.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined">location_on</span>
                </div>
              </label>

              <label className="installer-add-device-field">
                <span>设备名称</span>
                <input value={deviceName} onChange={(event) => setDeviceName(event.target.value)} />
              </label>
            </div>
          </div>

          <Link to={`/installer/projects/${detail.id}/channels`} className="installer-add-device-submit">
            <span>下一步：配置通道</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
