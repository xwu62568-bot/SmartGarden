import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/app-store';

const installerProfileMenus = [
  { icon: 'business', label: '公司信息' },
  { icon: 'groups', label: '团队成员' },
  { icon: 'vpn_key', label: '项目权限' },
  { icon: 'notifications', label: '通知设置' },
  { icon: 'language', label: '语言设置' },
  { icon: 'help_outline', label: '帮助中心' },
  { icon: 'help_outline', label: '关于 App' },
] as const;

export function InstallerProfilePage() {
  const navigate = useNavigate();
  const clearSelectedRole = useAppStore((state) => state.clearSelectedRole);

  function logout() {
    clearSelectedRole();
    navigate('/');
  }

  return (
    <div className="installer-profile-page">
      <header className="installer-profile-bar">
        <h1>我的</h1>
      </header>

      <section className="installer-profile-head">
        <div className="installer-profile-avatar">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeQxjfsRyV9yZnD_5q5b5_-uJvXx5Z9HrHIEgK8-uLU4GAY-BwGu04o7VCGUG1_GYKThlH_fNWuzrxLl2QadMYL4f6koXYO41YdJnZ-F6kDdtQNQUj-4DzwZdkRo2RKW_wiCKcP89ZR1puxr5p6Y8RFIMBQNpKu5X_wJZuAFcScPwaXowa9TEavu0pw-YsSBiahxkVNYuEzJBpNSWcLqZ_ZsNJ30OzaTOgTDFNI8qaRO9lfkIa00f2eJ2krBserRCWu4iKZPQcbqY"
            alt="Profile avatar"
          />
        </div>
        <div className="installer-profile-head-copy">
          <div className="installer-profile-name-row">
            <h2>李工程师</h2>
            <span>安装商</span>
          </div>
          <p>
            <span className="material-symbols-outlined">corporate_fare</span>
            智绿景观工程公司
          </p>
        </div>
      </section>

      <section className="installer-company-card">
        <div className="installer-company-card-top">
          <div>
            <h3>智绿景观工程公司</h3>
            <p>
              <span className="material-symbols-outlined">call</span>
              021-8888 8888
            </p>
          </div>
          <button type="button" aria-label="编辑公司信息">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>

        <div className="installer-company-region">
          <span className="material-symbols-outlined">location_on</span>
          <span>服务区域：上海市、苏州市、杭州市</span>
        </div>

        <div className="installer-company-stats">
          <div>
            <label>当前项目</label>
            <strong>24</strong>
            <span>个</span>
          </div>
          <div className="with-divider">
            <label>团队成员</label>
            <strong>8</strong>
            <span>人</span>
          </div>
        </div>
      </section>

      <section className="installer-profile-menu-card">
        {installerProfileMenus.map((item) => (
          <button key={item.label} type="button" className="installer-profile-menu-row">
            <div>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        ))}

        <button type="button" className="installer-profile-logout-row" onClick={logout}>
          <div>
            <span className="material-symbols-outlined">logout</span>
            <span>退出登录</span>
          </div>
        </button>
      </section>
    </div>
  );
}
