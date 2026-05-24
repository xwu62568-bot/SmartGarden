import { useState } from 'react';
import { Link } from 'react-router-dom';

export function InstallerProjectCreatePage() {
  const [projectName, setProjectName] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [weatherLocation, setWeatherLocation] = useState('北京市朝阳区北辰东路15号');
  const [projectNotes, setProjectNotes] = useState('');

  return (
    <div className="installer-project-create-page">
      <header className="installer-project-create-topbar">
        <div className="installer-project-create-topbar-main">
          <Link
            to="/installer/projects"
            className="installer-project-create-back"
            aria-label="返回项目列表"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1>项目信息</h1>
        </div>
      </header>

      <div className="installer-project-create-bg">
        <div className="installer-project-create-glow installer-project-create-glow-primary" />
        <div className="installer-project-create-glow installer-project-create-glow-secondary" />
      </div>

      <main className="installer-project-create-main">
        <div className="installer-project-create-stack">
          <section className="installer-project-create-card">
            <label className="installer-project-create-label" htmlFor="installer-project-name">
              项目名称
            </label>
            <div className="installer-project-create-input-wrap">
              <input
                id="installer-project-name"
                className="installer-project-create-input"
                type="text"
                placeholder="例如 王先生后院"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
              />
              <button type="button" className="installer-project-create-generate">
                <span className="material-symbols-outlined">auto_awesome</span>
                <span>自动生成</span>
              </button>
            </div>
          </section>

          <section className="installer-project-create-card installer-project-create-card-spaced">
            <div>
              <label className="installer-project-create-label" htmlFor="installer-project-address">
                项目地址
              </label>
              <div className="installer-project-create-input-icon-wrap">
                <span className="material-symbols-outlined">location_on</span>
                <input
                  id="installer-project-address"
                  className="installer-project-create-input installer-project-create-input-with-icon"
                  type="text"
                  placeholder="请输入项目地址"
                  value={projectAddress}
                  onChange={(event) => setProjectAddress(event.target.value)}
                />
              </div>
              <div className="installer-project-create-action-grid">
                <button type="button" className="installer-project-create-soft-button">
                  <span className="material-symbols-outlined">person_add</span>
                  <span>从客户地址导入</span>
                </button>
                <button type="button" className="installer-project-create-soft-button">
                  <span className="material-symbols-outlined">map</span>
                  <span>地图定位</span>
                </button>
              </div>
            </div>

            <div className="installer-project-create-divider-block">
              <label className="installer-project-create-label" htmlFor="installer-project-weather-location">
                天气位置
              </label>
              <div className="installer-project-create-inline-row">
                <input
                  id="installer-project-weather-location"
                  className="installer-project-create-input installer-project-create-input-muted"
                  type="text"
                  value={weatherLocation}
                  onChange={(event) => setWeatherLocation(event.target.value)}
                />
                <button type="button" className="installer-project-create-inline-action">
                  手动修改
                </button>
              </div>
              <p className="installer-project-create-help">
                <span className="material-symbols-outlined">info</span>
                <span>用于日落日出计划和雨天跳过，确保自动化执行准确性。</span>
              </p>
            </div>
          </section>

          <section className="installer-project-create-card">
            <label className="installer-project-create-label">项目时区</label>
            <div className="installer-project-create-timezone">
              <span className="material-symbols-outlined">schedule</span>
              <div>
                <span className="installer-project-create-timezone-meta">已根据地址自动识别为：</span>
                <strong>(UTC+08:00) 北京</strong>
              </div>
            </div>
          </section>

          <section className="installer-project-create-card">
            <label className="installer-project-create-label" htmlFor="installer-project-notes">
              项目备注
            </label>
            <textarea
              id="installer-project-notes"
              className="installer-project-create-textarea"
              rows={4}
              placeholder="例如 后院水景 + 灯光 + 花坛滴灌"
              value={projectNotes}
              onChange={(event) => setProjectNotes(event.target.value)}
            />
          </section>

          <div className="installer-project-create-status-row">
            <span>当前项目状态</span>
            <div className="installer-project-create-status-pill">
              <strong>安装中</strong>
            </div>
          </div>
        </div>
      </main>

      <footer className="installer-project-create-footer">
        <button type="button" className="installer-project-create-submit">
          <span className="material-symbols-outlined">add_circle</span>
          <span>创建项目</span>
        </button>
        <div className="installer-project-create-home-indicator" aria-hidden="true" />
      </footer>
    </div>
  );
}
