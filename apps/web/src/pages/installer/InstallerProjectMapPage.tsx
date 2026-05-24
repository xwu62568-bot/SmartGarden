import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const mapPins = [
  {
    id: 'ch1',
    label: 'CH1',
    name: '池边灯带',
    tone: 'light',
    icon: 'lightbulb',
    left: '20%',
    top: '30%',
  },
  {
    id: 'humidity-1',
    label: '湿度1',
    name: '草坪湿度传感器',
    tone: 'sensor',
    icon: 'sensors',
    left: '65%',
    top: '15%',
  },
  {
    id: 'main-pump',
    label: '主泵',
    name: '池塘主泵',
    tone: 'water',
    icon: 'faucet',
    left: '45%',
    top: '60%',
  },
  {
    id: 'gateway',
    label: 'GTW-01',
    name: '设备箱网关',
    tone: 'gateway',
    icon: 'hub',
    left: '82%',
    top: '74%',
  },
] as const;

const filterChips = ['全部', '灯光', '水泵', '传感器', '控制箱'] as const;

const selectedPin = {
  id: 'ch2',
  category: '灯光 - CH2',
  name: '前院路灯',
  status: '状态: 离线 (离线3h)',
  icon: 'lightbulb',
  left: '40%',
  top: '40%',
} as const;

export function InstallerProjectMapPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-map-page">
      <header className="installer-project-map-topbar">
        <div className="installer-project-map-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}`}
            className="installer-project-map-icon-button"
            aria-label="返回项目详情"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-project-map-title-wrap">
            <h1>点位图</h1>
            <p>{detail.name}</p>
          </div>
        </div>

        <div className="installer-project-map-topbar-actions">
          <button type="button" className="installer-project-map-icon-button" aria-label="上传底图">
            <span className="material-symbols-outlined">upload_file</span>
          </button>
          <button type="button" className="installer-project-map-icon-button" aria-label="拍摄底图">
            <span className="material-symbols-outlined">photo_camera</span>
          </button>
        </div>
      </header>

      <main className="installer-project-map-canvas">
        <div className="installer-project-map-background">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Oa8IxIjQvJA6c9yZuqhtaDS4J2BV9GJiAMHOLYh7FJ4gNvHmL8PGBhsSAgyzZxHgZ12RxRjLWZBAN-M0ee6YzbrfWym_ZMbBriucCks8fyAQAhGRnoigrOBKMx_1juFLtGz5dHNBOtvQx34AFNQKDGBS9gQHzGOU8-HI7-WWN0Q4fOOlXZWLqODhnDvy8qsuZwrHsqGnXnmycnkTka1sYhmhcH4kgtGbegslUZF9oPQ9xO2BY1CamziqUXrNc1tWyKnSZYRqsAU"
            alt="王先生后院设备点位图"
          />
        </div>

        <div className="installer-project-map-controls">
          <button type="button" className="installer-project-map-float-button" aria-label="放大">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button type="button" className="installer-project-map-float-button" aria-label="缩小">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button type="button" className="installer-project-map-float-button primary" aria-label="定位到当前区域">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {mapPins.map((pin) => (
          <div
            key={pin.id}
            className="installer-project-map-pin"
            style={{ left: pin.left, top: pin.top }}
          >
            <div className={`installer-project-map-pin-badge installer-project-map-pin-badge-${pin.tone}`}>
              <span className="material-symbols-outlined">{pin.icon}</span>
            </div>
            <span className="installer-project-map-pin-label">{pin.label}</span>
          </div>
        ))}

        <div
          className="installer-project-map-pin-selected"
          style={{ left: selectedPin.left, top: selectedPin.top }}
        >
          <div className="installer-project-map-popup">
            <div className="installer-project-map-popup-head">
              <span>{selectedPin.category}</span>
              <button type="button" aria-label="关闭点位详情">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h2>{selectedPin.name}</h2>
            <p>{selectedPin.status}</p>
            <div className="installer-project-map-popup-footer">
              <button type="button">
                <span>查看详情</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <span className="installer-project-map-popup-arrow" aria-hidden="true" />
          </div>

          <div className="installer-project-map-pin-badge installer-project-map-pin-badge-light active">
            <span className="material-symbols-outlined">{selectedPin.icon}</span>
          </div>
          <span className="installer-project-map-selected-tag">SELECTED</span>
        </div>
      </main>

      <section className="installer-project-map-filter-bar" aria-label="点位图筛选">
        <div className="installer-project-map-filter-row">
          {filterChips.map((chip, index) => (
            <button
              key={chip}
              type="button"
              className={
                index === 0
                  ? 'installer-project-map-filter-chip installer-project-map-filter-chip-active'
                  : 'installer-project-map-filter-chip'
              }
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      <footer className="installer-project-map-footer">
        <button type="button" className="installer-project-map-secondary-action">
          <span className="material-symbols-outlined">visibility</span>
          <span>预览屋主视图</span>
        </button>
        <button type="button" className="installer-project-map-primary-action">
          <span className="material-symbols-outlined">save</span>
          <span>保存点位图</span>
        </button>
      </footer>
    </div>
  );
}
