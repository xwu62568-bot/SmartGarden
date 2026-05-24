import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const projectZones = [
  {
    id: 'front-yard',
    name: '前院',
    englishName: 'Front Yard',
    icon: 'home',
    deviceCount: '4台设备',
    planCount: '1个计划',
    status: '状态正常',
    tone: 'secondary',
    alert: false,
  },
  {
    id: 'backyard',
    name: '后院',
    englishName: 'Backyard',
    icon: 'park',
    deviceCount: '5台设备',
    planCount: '2个计划',
    status: '状态正常',
    tone: 'primary',
    alert: false,
  },
  {
    id: 'pond-area',
    name: '池塘区',
    englishName: 'Pond Area',
    icon: 'water',
    deviceCount: '6台设备',
    planCount: '2个计划',
    status: '水泵压力异常',
    tone: 'tertiary',
    alert: true,
  },
  {
    id: 'flower-bed',
    name: '花坛',
    englishName: 'Flower Bed',
    icon: 'local_florist',
    deviceCount: '2台设备',
    planCount: '1个计划',
    status: '状态正常',
    tone: 'accent',
    alert: false,
  },
] as const;

const liveMetrics = [
  { id: 'humidity', label: '环境湿度', value: '64%' },
  { id: 'water-usage', label: '当日用水', value: '12.5 gal' },
] as const;

const gardenVisualizationImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBDV8-aeK46UXa40zfT3_6BPr5_8MoUB6GsbECWyFmYCd_qpaq9putq7sD33BTbLMOBXTlwiDyzUbtkcAErzVYMlnSwObexnxRDjH5DMsFRdL-NppvXJQM6izVQDif2RRENsj2LgwD5GPYNVM8haN5c0KbVsJF09LOgIL3y4dYcg8c76BTdo3OMTiQVnVAOSbF3hkqtGesvJKM3VOswt-XxVhSsksC6DWeF36R3AxVzIgxqd1-lqDa5wTC66-A8cxjPUjtVxqTFNfU';

export function InstallerProjectZonesPage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-zones-page">
      <header className="installer-project-zones-topbar">
        <div className="installer-project-zones-topbar-main">
          <Link
            to={`/installer/projects/${detail.id}`}
            className="installer-project-zones-back"
            aria-label="返回项目详情"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="installer-project-zones-title-wrap">
            <h1>区域</h1>
            <span>{`当前项目：${detail.name}`}</span>
          </div>
        </div>

        <button type="button" className="installer-project-zones-add" aria-label="新增区域">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <main className="installer-project-zones-main">
        <section className="installer-project-zones-overview">
          <div className="installer-project-zones-overview-main">
            <div className="installer-project-zones-overview-icon">
              <span className="material-symbols-outlined filled-icon">landscape</span>
            </div>
            <div>
              <h2>区域管理总览</h2>
              <p>4个已连接区域 • 17台受控设备</p>
            </div>
          </div>

          <div className="installer-project-zones-sync">
            <span className="installer-project-zones-sync-dot" aria-hidden="true" />
            <span>系统同步中</span>
          </div>
        </section>

        <section className="installer-project-zones-grid" aria-label="项目区域列表">
          {projectZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              className={
                zone.alert
                  ? 'installer-project-zone-card installer-project-zone-card-alert'
                  : 'installer-project-zone-card'
              }
            >
              {zone.alert ? (
                <span className="installer-project-zone-alert-badge">
                  <span className="material-symbols-outlined">warning</span>
                  <span>1 条警报</span>
                </span>
              ) : null}

              <div className="installer-project-zone-top">
                <div className={`installer-project-zone-icon installer-project-zone-icon-${zone.tone}`}>
                  <span className="material-symbols-outlined">{zone.icon}</span>
                </div>
                <span className="material-symbols-outlined installer-project-zone-edit">edit</span>
              </div>

              <div className="installer-project-zone-content">
                <h3>{`${zone.name} (${zone.englishName})`}</h3>
                <div className="installer-project-zone-tags">
                  <span>{zone.deviceCount}</span>
                  <span>{zone.planCount}</span>
                </div>
              </div>

              <div className={zone.alert ? 'installer-project-zone-foot alert' : 'installer-project-zone-foot'}>
                <span className={zone.alert ? 'installer-project-zone-status alert' : 'installer-project-zone-status'}>
                  <span className="material-symbols-outlined filled-icon">
                    {zone.alert ? 'error' : 'check_circle'}
                  </span>
                  <span>{zone.status}</span>
                </span>
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </button>
          ))}
        </section>

        <section className="installer-project-zones-live-section">
          <h2>项目实时状态</h2>
          <div className="installer-project-zones-live-card">
            <img src={gardenVisualizationImage} alt="Garden visualization" />
            <div className="installer-project-zones-live-overlay" />
            <div className="installer-project-zones-live-metrics">
              {liveMetrics.map((metric) => (
                <div key={metric.id} className="installer-project-zones-live-metric">
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
