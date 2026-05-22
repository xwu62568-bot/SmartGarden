import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ownerScenes } from '../../shared/mock/owner';

export function OwnerSceneDetailPage() {
  const { sceneId } = useParams();
  const scene = ownerScenes.find((item) => item.id === sceneId);
  const [quickAccessEnabled, setQuickAccessEnabled] = useState(scene?.quickAccessEnabled ?? false);

  if (!scene) {
    return <div className="muted-text">未找到场景。</div>;
  }

  return (
    <div className="scene-detail-page">
      <div className="scene-detail-atmosphere" aria-hidden="true">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNUZfwQBVp4IZ2jRbCj-NjRgk2fNXdSmNyq8gvhzHPfydPxaEWUTQb1Dpiukm9GZRmmpZyk4AAqQEexlM9p-mzAr2QOI6OYAi0K8QKEPKhgAOv1vuUTE-fN_WA7y4ze0uhk_U6MdXXaIkvFbnJmTQ8HQd_N4EoUq_-ljxsHYSFxIslpdvn3MkUfw5cnuUmj8BZL7Frd35SawiIkL96JsMxEmMuRJtd8Dre-DtM1rvKkdA8at-dzABHbuIH1NdtDLKB8ATwca3XOKU"
          alt=""
        />
      </div>
      <header className="scene-detail-header">
        <Link to="/owner/scenes" className="scene-icon-button scene-icon-button-link" aria-label="返回场景列表">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h2 className="scene-detail-header-title">{scene.name}</h2>
        <button type="button" className="scene-detail-edit">编辑</button>
      </header>

      <section className="scene-detail-overview">
        <div className="scene-detail-hero-orb">
          <div className="scene-detail-hero-badge">
            <span className="material-symbols-outlined filled-icon">{scene.detailIcon ?? scene.icon}</span>
          </div>
          <div className="scene-detail-hero-mini-badge">
            <span className="material-symbols-outlined filled-icon">auto_awesome</span>
          </div>
        </div>
        <div className="scene-detail-copy-block">
          <h3 className="scene-detail-title">{scene.name}</h3>
          <p className="scene-detail-copy">{scene.detailSubtitle}</p>
        </div>

        <section className="scene-toggle-card">
          <span>在首页快捷场景中显示</span>
          <button
            type="button"
            aria-label="首页快捷菜单开关"
            className={`switch ${quickAccessEnabled ? 'switch-on' : 'switch-off'}`}
            onClick={() => setQuickAccessEnabled((current) => !current)}
          >
            <span className="switch-thumb" />
          </button>
        </section>
      </section>

      <section className="scene-task-section">
        <div className="scene-task-section-heading">
          <h3>执行任务</h3>
          <span>{`${scene.tasks.length} 个设备`}</span>
        </div>
        <div className="scene-task-stack">
          {scene.tasks.map((task) => (
            <article key={task.id} className={`scene-task-card scene-task-card-${task.state}`}>
              <div className="scene-task-main">
                <div className={`scene-task-icon scene-task-icon-${task.state} ${task.id === 'pond-light' ? 'scene-task-icon-water' : ''}`}>
                  <span className="material-symbols-outlined filled-icon">{task.icon}</span>
                </div>
                <div className="scene-task-copy">
                  <div className="scene-task-heading-row">
                    <strong>{task.name}</strong>
                    {task.state === 'locked' ? (
                      <span className="material-symbols-outlined scene-task-lock">lock</span>
                    ) : null}
                  </div>
                  <div className="scene-task-status-row">
                    <span className={`scene-task-status scene-task-status-${task.state}`}>{task.zone || '状态'}</span>
                    {task.statusText ? <span className="scene-task-chip">{task.statusText}</span> : null}
                  </div>
                </div>
              </div>
              {typeof task.progress === 'number' ? (
                <div className="scene-task-meter">
                  <div className="scene-task-meter-head">
                    <span>亮度</span>
                    <span>{task.valueLabel}</span>
                  </div>
                  <input
                    className="scene-task-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round(task.progress * 100)}
                    style={{ ['--slider-progress' as string]: `${Math.round(task.progress * 100)}%` }}
                    disabled
                    aria-label={`${task.name}亮度`}
                  />
                </div>
              ) : null}
              {task.note ? (
                <div className="scene-task-note">
                  <span className="material-symbols-outlined filled-icon">info</span>
                  <p>{task.note}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <footer className="scene-detail-footer">
        <button type="button" className="scene-detail-cta">
          <span className="material-symbols-outlined filled-icon">play_arrow</span>
          <span>执行场景</span>
        </button>
      </footer>
    </div>
  );
}
