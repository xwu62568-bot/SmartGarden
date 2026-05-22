import { useNavigate } from 'react-router-dom';
import { AppFrame } from '../shared/ui/AppFrame';
import { useAppStore } from '../store/app-store';

export function RoleSelectPage() {
  const navigate = useNavigate();
  const setSelectedRole = useAppStore((state) => state.setSelectedRole);

  function enterOwner() {
    setSelectedRole('owner');
    navigate('/owner/home');
  }

  function enterInstaller() {
    setSelectedRole('installer');
    navigate('/installer/workbench');
  }

  return (
    <AppFrame header={null} contentClassName="page-scroll role-select-scroll">
      <main className="role-select-shell">
        <div className="role-select-inner">
          <header className="role-select-header">
            <div className="role-brand">
              <span className="material-symbols-outlined filled-icon role-brand-icon">water_drop</span>
              <h1>HyecoSmart</h1>
            </div>
            <h2>选择用户类型</h2>
          </header>

          <div className="role-select-grid">
            <button type="button" className="selection-card selection-card-owner" onClick={enterOwner}>
              <div className="selection-top-line selection-top-line-owner" />
              <div className="selection-card-head">
                <div className="selection-icon owner">
                  <span className="material-symbols-outlined filled-icon">home</span>
                </div>
                <div className="selection-card-title">
                  <h3>我是屋主</h3>
                </div>
                <div className="selection-arrow">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
              <p className="selection-description">看状态、控设备、管场景和计划。</p>
              <div className="selection-feature-box">
                <ul>
                  <li>
                    <span className="material-symbols-outlined filled-icon">check_circle</span>
                    <span>设备控制</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined filled-icon">check_circle</span>
                    <span>场景联动</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined filled-icon">check_circle</span>
                    <span>计划执行</span>
                  </li>
                </ul>
              </div>
              <div className="selection-footer">
                <span className="material-symbols-outlined">group</span>
                <span>适合家庭庭院用户</span>
              </div>
            </button>

            <button type="button" className="selection-card selection-card-installer" onClick={enterInstaller}>
              <div className="selection-top-line selection-top-line-installer" />
              <div className="selection-card-head">
                <div className="selection-icon installer">
                  <span className="material-symbols-outlined filled-icon">handyman</span>
                </div>
                <div className="selection-card-title">
                  <h3>我是安装商</h3>
                </div>
                <div className="selection-arrow">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
              <p className="selection-description">管项目、配设备、处理告警与维护。</p>
              <div className="selection-feature-box">
                <ul>
                  <li>
                    <span className="material-symbols-outlined filled-icon">check_circle</span>
                    <span>项目管理</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined filled-icon">check_circle</span>
                    <span>调试交付</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined filled-icon">check_circle</span>
                    <span>远程维护</span>
                  </li>
                </ul>
              </div>
              <div className="selection-footer">
                <span className="material-symbols-outlined">engineering</span>
                <span>适合工程与维护团队</span>
              </div>
            </button>
          </div>

          <footer className="role-select-note">进入后仍可切换模式。</footer>
        </div>
      </main>
    </AppFrame>
  );
}
