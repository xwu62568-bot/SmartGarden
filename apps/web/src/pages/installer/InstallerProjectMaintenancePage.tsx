import { Link, useParams } from 'react-router-dom';
import { installerProjectDetails } from '../../shared/mock/installer';

const pendingTasks = [
  { title: '清理池塘滤网', detail: '建议本周内完成，当前堵塞率约 35%', tone: 'warning' },
  { title: '校准水位传感器', detail: '最近 7 天读数波动偏大，需现场复核', tone: 'secondary' },
  { title: '检查补水阀线束', detail: '上次补水超时后仍未完成复检', tone: 'danger' },
] as const;

const maintenanceRecords = [
  {
    date: '2026-05-18',
    title: '春季例行巡检',
    engineer: '李工',
    summary: '完成喷泉泵、电控箱和水位传感器基础检查，系统运行恢复正常。',
    tags: ['巡检完成', '设备正常'],
  },
  {
    date: '2026-05-12',
    title: '补水异常排查',
    engineer: '陈工',
    summary: '更换补水阀接头并清理阀芯，补水时长恢复到阈值内。',
    tags: ['补水阀', '已修复'],
  },
  {
    date: '2026-04-29',
    title: '滤网与循环泵维护',
    engineer: '王工',
    summary: '清理池塘滤网，检查循环泵叶轮磨损情况，建议下季度复检。',
    tags: ['保养记录', '待复检'],
  },
] as const;

export function InstallerProjectMaintenancePage() {
  const { projectId } = useParams();
  const detail = projectId ? installerProjectDetails[projectId] : undefined;

  if (!detail) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="installer-project-maintenance-page">
      <header className="installer-project-maintenance-header">
        <div className="installer-project-maintenance-header-row">
          <div className="installer-project-maintenance-title-wrap">
            <Link
              to={`/installer/projects/${detail.id}`}
              className="installer-project-maintenance-icon-button"
              aria-label="返回项目详情"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h1>维护记录</h1>
              <p>{detail.name}</p>
            </div>
          </div>
          <button type="button" className="installer-project-maintenance-icon-button" aria-label="分享维护记录">
            <span className="material-symbols-outlined">ios_share</span>
          </button>
        </div>
      </header>

      <section className="installer-project-maintenance-summary">
        <div className="installer-project-maintenance-summary-head">
          <div>
            <span>维护档案</span>
            <strong>最近一次维护已同步</strong>
          </div>
          <span className="installer-project-maintenance-pill">已同步</span>
        </div>

        <div className="installer-project-maintenance-metrics">
          <div>
            <label>最后维护</label>
            <strong>2026-05-18</strong>
          </div>
          <div>
            <label>下次上门</label>
            <strong>2026-05-29</strong>
          </div>
          <div>
            <label>责任工程师</label>
            <strong>李工</strong>
          </div>
          <div>
            <label>项目状态</label>
            <strong className="good">{detail.authorizationLabel}</strong>
          </div>
        </div>
      </section>

      <section className="installer-project-maintenance-section">
        <div className="installer-project-maintenance-section-head">
          <h2>待处理维护项</h2>
          <span>3 项</span>
        </div>

        <div className="installer-project-maintenance-task-list">
          {pendingTasks.map((task) => (
            <article key={task.title} className={`installer-project-maintenance-task installer-project-maintenance-task-${task.tone}`}>
              <div className="installer-project-maintenance-task-icon">
                <span className="material-symbols-outlined">
                  {task.tone === 'danger' ? 'warning' : task.tone === 'secondary' ? 'tune' : 'schedule'}
                </span>
              </div>
              <div className="installer-project-maintenance-task-copy">
                <strong>{task.title}</strong>
                <p>{task.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-project-maintenance-section">
        <div className="installer-project-maintenance-section-head">
          <h2>维护记录</h2>
          <span>近 30 天</span>
        </div>

        <div className="installer-project-maintenance-record-list">
          {maintenanceRecords.map((record) => (
            <article key={`${record.date}-${record.title}`} className="installer-project-maintenance-record">
              <div className="installer-project-maintenance-record-date">
                <span>{record.date}</span>
                <strong>{record.engineer}</strong>
              </div>
              <div className="installer-project-maintenance-record-body">
                <h3>{record.title}</h3>
                <p>{record.summary}</p>
                <div className="installer-project-maintenance-record-tags">
                  {record.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-project-maintenance-section installer-project-maintenance-files">
        <div className="installer-project-maintenance-section-head">
          <h2>维护资料</h2>
          <span>附件 2 份</span>
        </div>
        <div className="installer-project-maintenance-file-grid">
          <button type="button">
            <span className="material-symbols-outlined">description</span>
            <span>巡检报告</span>
          </button>
          <button type="button">
            <span className="material-symbols-outlined">photo_library</span>
            <span>现场照片</span>
          </button>
        </div>
      </section>

      <footer className="installer-project-maintenance-footer">
        <button type="button" className="installer-project-maintenance-secondary">
          导出维护报告
        </button>
        <button type="button" className="installer-project-maintenance-primary">
          新增维护记录
        </button>
      </footer>
    </div>
  );
}
