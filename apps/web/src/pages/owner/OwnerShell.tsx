import { Outlet, useLocation } from 'react-router-dom';
import { ownerTabs } from '../../shared/mock/owner';
import { AppFrame } from '../../shared/ui/AppFrame';
import { TabBar } from '../../shared/ui/TabBar';

export function OwnerShell() {
  const location = useLocation();
  const isHome = location.pathname === '/owner/home';
  const isScenesList = location.pathname === '/owner/scenes';
  const isSceneCreate = location.pathname === '/owner/scenes/create';
  const isSceneDetail = location.pathname.startsWith('/owner/scenes/');
  const isDevicesView = location.pathname === '/owner/devices';
  const isDeviceDetail = location.pathname.startsWith('/owner/devices/');
  const isLightDeviceDetail = location.pathname === '/owner/devices/front-path-light';
  const isWaterDeviceDetail = location.pathname === '/owner/devices/fountain-pump';
  const isPlansView = location.pathname === '/owner/plans';
  const isPlanCreate = location.pathname.startsWith('/owner/plans/create');
  const isPlanDetail = location.pathname.startsWith('/owner/plans/') && !isPlansView && !isPlanCreate;
  const isProfileView = location.pathname === '/owner/profile';
  const isScenesView = isScenesList || isSceneCreate || isSceneDetail;

  const ownerPageMeta = [
    { match: '/owner/scenes', title: '场景编排', subtitle: '把日常维护、氛围模式和联动场景集中管理', icon: 'wb_twilight' },
    { match: '/owner/devices', title: '设备控制', subtitle: '按分区查看在线状态、维护关注和高频操作设备', icon: 'settings_remote' },
    { match: '/owner/plans', title: '计划与自动化', subtitle: '管理灌溉、水景和灯光在一周内的执行节奏', icon: 'calendar_today' },
    { match: '/owner/profile', title: '家庭与服务', subtitle: '查看成员权限、通知偏好和当前售后服务状态', icon: 'person' },
  ] as const;

  const pageMeta = ownerPageMeta.find((item) => location.pathname.startsWith(item.match));

  const header = isHome ? (
    <header className="owner-app-bar">
      <div className="owner-app-bar-title">
        <h1>我的后院</h1>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      <div className="owner-app-bar-actions">
        <div className="owner-weather">
          <span className="material-symbols-outlined">wb_sunny</span>
          <span>24°C 晴</span>
        </div>
        <button type="button" className="owner-icon-button" aria-label="通知">
          <span className="material-symbols-outlined">notifications</span>
          <span className="owner-notice-dot" />
        </button>
      </div>
    </header>
  ) : isScenesView || isDevicesView || isDeviceDetail || isPlansView || isPlanCreate || isPlanDetail || isProfileView ? null : (
    <header className="owner-page-header">
      <div className="owner-page-header-main">
        <div className="owner-page-header-icon">
          <span className="material-symbols-outlined filled-icon">{pageMeta?.icon ?? 'apps'}</span>
        </div>
        <div>
          <h1 className="owner-page-header-title">{pageMeta?.title ?? '屋主端'}</h1>
          <p className="owner-page-header-subtitle">{pageMeta?.subtitle ?? '花园自动化与日常场景控制'}</p>
        </div>
      </div>
      <button type="button" className="owner-page-header-button" aria-label="页面操作">
        <span className="material-symbols-outlined">tune</span>
      </button>
    </header>
  );

  return (
    <AppFrame
      header={header}
      contentClassName={
        isLightDeviceDetail
          ? 'page-scroll page-scroll-light-detail'
        : isWaterDeviceDetail
          ? 'page-scroll page-scroll-water-detail'
        : isSceneCreate || isSceneDetail
          || isDeviceDetail || isPlanCreate || isPlanDetail
          ? 'page-scroll page-scroll-detail'
          : isScenesList
            ? 'page-scroll page-scroll-scenes'
          : isDevicesView
            ? 'page-scroll page-scroll-devices'
            : isPlansView
              ? 'page-scroll page-scroll-plans'
              : isProfileView
                ? 'page-scroll page-scroll-profile'
            : undefined
      }
      tabBar={isSceneCreate || isSceneDetail || isDeviceDetail || isPlanCreate || isPlanDetail ? null : <TabBar items={ownerTabs} />}
    >
      <Outlet />
    </AppFrame>
  );
}
