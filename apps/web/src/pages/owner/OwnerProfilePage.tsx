import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/app-store';

const profileGroups = [
  [
    { icon: 'grid_view', label: '项目设置' },
    { icon: 'swap_horiz', label: '项目切换' },
    { icon: 'group', label: '家庭成员' },
  ],
  [
    { icon: 'notifications_active', label: '通知设置' },
    { icon: 'partly_cloudy_day', label: '天气位置' },
    { icon: 'language', label: '语言设置' },
    { icon: 'straighten', label: '单位设置' },
  ],
  [
    { icon: 'security', label: '隐私与安全' },
    { icon: 'help', label: '帮助中心' },
    { icon: 'info', label: '关于 App' },
  ],
] as const;

export function OwnerProfilePage() {
  const navigate = useNavigate();
  const clearSelectedRole = useAppStore((state) => state.clearSelectedRole);

  function handleLogout() {
    clearSelectedRole();
    navigate('/');
  }

  return (
    <div className="owner-profile-page">
      <header className="owner-profile-header">
        <h1 className="owner-profile-title">我的</h1>
      </header>

      <section className="owner-profile-identity">
        <div className="owner-profile-avatar-wrap">
          <img
            className="owner-profile-avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2yFx1g_Bo_5i9Q-qDgGYjux908IK33LaxlzGVImtOO0WyxNpHXQqSeAVOJUMRWghzIIw82y80nDVG5HfT7CBUSIc-ld_3c3-xYtlJROm3jO8WfYl2JTqxQ-DsroEu0HExQ8_j7udkEtVQl4pC5lYWyC2plsWOMro87-AzKYnslPecVSiO4Po9gBY9iXfdDKdu8II77OWjA_KdA2H489OQ63xCP3EhTHlbO5aZP6_mjpqaW1kMP-w7xquSmX0yKL8LBB7MqVx9kkY"
            alt="张先生头像"
          />
          <span className="owner-profile-verified">
            <span className="material-symbols-outlined">verified</span>
          </span>
        </div>

        <div className="owner-profile-identity-copy">
          <div className="owner-profile-name-row">
            <h2>张先生</h2>
            <span className="owner-profile-role-pill">屋主</span>
          </div>
          <div className="owner-profile-project">
            <span className="material-symbols-outlined">location_on</span>
            <p>当前项目：我的后院</p>
          </div>
        </div>
      </section>

      <section className="owner-profile-authorization">
        <div className="owner-profile-authorization-top">
          <div className="owner-profile-authorization-main">
            <div className="owner-profile-authorization-icon">
              <span className="material-symbols-outlined">engineering</span>
            </div>
            <div>
              <h3>安装商授权</h3>
              <p>绿意景观工程公司</p>
            </div>
          </div>

          <div className="owner-profile-authorization-badge">
            <span className="material-symbols-outlined">check_circle</span>
            <span>已授权</span>
          </div>
        </div>

        <div className="owner-profile-authorization-meta">
          <div className="owner-profile-authorization-line">
            <span className="material-symbols-outlined">call</span>
            <span>联系电话: 138-1234-5678</span>
          </div>
          <div className="owner-profile-authorization-line">
            <span className="material-symbols-outlined">verified_user</span>
            <span>授权范围：远程控制、计划修改</span>
          </div>
        </div>

        <div className="owner-profile-authorization-actions">
          <button type="button" className="owner-profile-primary-button">查看详情</button>
          <button type="button" className="owner-profile-danger-outline">取消授权</button>
        </div>
      </section>

      <div className="owner-profile-groups">
        {profileGroups.map((group, groupIndex) => (
          <section key={groupIndex} className="owner-profile-group">
            {group.map((item) => (
              <button key={item.label} type="button" className="owner-profile-row">
                <div className="owner-profile-row-main">
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className="material-symbols-outlined owner-profile-row-arrow">chevron_right</span>
              </button>
            ))}
          </section>
        ))}
      </div>

      <button type="button" className="owner-profile-logout" onClick={handleLogout}>
        <span className="material-symbols-outlined">logout</span>
        <span>退出登录</span>
      </button>
    </div>
  );
}
