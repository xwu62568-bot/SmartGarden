import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { installerProjects } from '../../shared/mock/installer';

const projectFilters = ['全部', '安装中', '待交付', '已交付', '有告警', '离线', '授权取消'] as const;

export function InstallerProjectsPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>('全部');

  const normalizedKeyword = searchValue.trim().toLowerCase();
  const visibleProjects = installerProjects.filter((project) => {
    const matchesKeyword =
      normalizedKeyword.length === 0 ||
      [project.name, project.customerName, project.address]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedKeyword));

    const matchesFilter =
      activeFilter === '全部' ||
      (activeFilter === '待交付' && project.status === '待交付') ||
      (activeFilter === '已交付' && project.status === '已交付') ||
      (activeFilter === '安装中' && project.status === '安装中') ||
      (activeFilter === '授权取消' && project.status === '授权取消') ||
      (activeFilter === '有告警' && Boolean(project.warningText)) ||
      (activeFilter === '离线' && (project.offlineDevices ?? 0) > 0);

    return matchesKeyword && matchesFilter;
  });

  return (
    <div className="installer-projects-page">
      <header className="installer-projects-bar">
        <h1>项目</h1>
        <button type="button" className="installer-projects-add-button" aria-label="新建项目">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="installer-projects-search">
        <span className="material-symbols-outlined">search</span>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="搜索项目、客户或地址..."
        />
        <button type="button" aria-label="筛选">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>

      <div className="installer-project-filters">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={filter === activeFilter ? 'installer-project-filter active' : 'installer-project-filter'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="installer-project-card-stack">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className={`installer-project-card installer-project-card-${project.accent ?? 'outline'}`}
            onClick={() => navigate(`/installer/projects/${project.id}`)}
          >
            <div className="installer-project-card-top">
              <div>
                <h2>{project.name}</h2>
                {project.address ? (
                  <div className="installer-project-location">
                    <span className="material-symbols-outlined">location_on</span>
                    <span>{project.address}</span>
                  </div>
                ) : (
                  <div className="installer-project-location">
                    <span className="material-symbols-outlined">
                      {project.id === 'p-202' ? 'person' : 'account_balance'}
                    </span>
                    <span>{`客户: ${project.customerName ?? '-'}`}</span>
                  </div>
                )}
              </div>
              <span className={`installer-project-status installer-project-status-${project.status ?? '已交付'}`}>
                {project.status}
              </span>
            </div>

            {project.id === 'p-101' ? (
              <>
                <div className="installer-project-split-grid">
                  <div>
                    <label>客户</label>
                    <strong>{project.customerName}</strong>
                  </div>
                  <div>
                    <label>设备状态</label>
                    <strong>{project.onlineSummary}</strong>
                  </div>
                </div>
                <div className="installer-project-alert-row">
                  <div>
                    <span className="material-symbols-outlined filled-icon">warning</span>
                    <span>{project.warningText}</span>
                  </div>
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
                <div className="installer-project-card-foot">
                  <span>{`最后维护: ${project.lastMaintenance}`}</span>
                  <button type="button">详情 <span className="material-symbols-outlined">arrow_forward</span></button>
                </div>
              </>
            ) : null}

            {project.id === 'p-202' ? (
              <>
                <div className="installer-project-signal-grid">
                  <div>
                    <label>设备状态</label>
                    <strong>{project.onlineSummary}</strong>
                  </div>
                  <div className="align-right">
                    <label>信号强度</label>
                    <strong>{project.signalStrength}</strong>
                  </div>
                </div>
                <div className="installer-project-ok-row">
                  <div>
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>无待处理告警</span>
                  </div>
                  <span>{`交付预约: ${project.deliveryDate}`}</span>
                </div>
              </>
            ) : null}

            {project.id === 'p-303' ? (
              <>
                <div className="installer-project-offline-panel">
                  <div className="installer-project-offline-stats">
                    <div>
                      <label>在线</label>
                      <strong>{project.onlineDevices}</strong>
                    </div>
                    <span className="installer-project-divider" />
                    <div>
                      <label className="danger-label">离线</label>
                      <strong className="danger-value">{project.offlineDevices}</strong>
                    </div>
                  </div>
                  <div className="align-right">
                    <label>最后维护</label>
                    <strong>{project.lastMaintenance}</strong>
                  </div>
                </div>
                <div className="installer-project-card-foot">
                  <div className="installer-project-note">
                    <span className="material-symbols-outlined">info</span>
                    <span>{project.note}</span>
                  </div>
                  <button type="button" className="installer-project-detail-button">查看详情</button>
                </div>
              </>
            ) : null}
          </article>
        ))}
      </div>

      <button type="button" className="installer-project-fab" aria-label="新建项目">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
