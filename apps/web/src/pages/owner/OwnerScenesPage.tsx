import { Link } from 'react-router-dom';
import { ownerScenes } from '../../shared/mock/owner';

export function OwnerScenesPage() {
  const visibleScenes = ownerScenes.filter((scene) => scene.showInList !== false);

  return (
    <div className="owner-scenes-page">
      <header className="scene-mobile-header">
        <span className="scene-mobile-header-spacer" aria-hidden="true" />
        <h2 className="scene-mobile-title">场景</h2>
        <Link to="/owner/scenes/create" className="scene-icon-button scene-icon-button-link" aria-label="新增场景">
          <span className="material-symbols-outlined">add</span>
        </Link>
      </header>

      <div className="scene-list-stack">
        {visibleScenes.map((scene) => (
          <article key={scene.id} className={`scene-list-card scene-list-card-${scene.accent} scene-list-card-${scene.id}`}>
            <div className="scene-card-watermark" aria-hidden="true">
              <span className="material-symbols-outlined">{scene.icon}</span>
            </div>
            <Link to={`/owner/scenes/${scene.id}`} className="scene-list-main">
              <div className="scene-list-head">
                <div className={`scene-list-icon scene-list-icon-${scene.accent}`}>
                  <span className="material-symbols-outlined filled-icon">{scene.icon}</span>
                </div>
                <span className="material-symbols-outlined scene-overflow">more_horiz</span>
              </div>
              <div className="scene-list-copy">
                <div className="scene-list-topline">
                  <h3>{scene.name}</h3>
                </div>
                <p>{scene.description}</p>
                {scene.warning ? (
                  <div className="scene-warning-row">
                    <span className="material-symbols-outlined filled-icon">error</span>
                    <span>{scene.warning}</span>
                  </div>
                ) : null}
              </div>
            </Link>

            <button
              type="button"
              className={`scene-action-button scene-action-button-${scene.accent}`}
              aria-label={`${scene.name}${scene.actionLabel}`}
            >
              <span className="material-symbols-outlined filled-icon">
                {scene.actionIcon ?? (scene.actionLabel === '编辑' ? 'edit' : 'play_arrow')}
              </span>
              <span>{scene.actionLabel}</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
