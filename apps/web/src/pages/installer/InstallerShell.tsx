import { Outlet, useLocation } from 'react-router-dom';
import { installerTabs } from '../../shared/mock/installer';
import { AppFrame } from '../../shared/ui/AppFrame';
import { TabBar } from '../../shared/ui/TabBar';
import { TopBar } from '../../shared/ui/TopBar';

export function InstallerShell() {
  const location = useLocation();
  const isWorkbench = location.pathname === '/installer/workbench';
  const isProjectsView = location.pathname === '/installer/projects';
  const isProjectDetail = location.pathname.startsWith('/installer/projects/');
  const isAlertsView = location.pathname === '/installer/alerts';
  const isCustomersView = location.pathname === '/installer/customers';
  const isCustomerDetail = location.pathname.startsWith('/installer/customers/');
  const isProfileView = location.pathname === '/installer/profile';

  return (
    <AppFrame
      header={
        isWorkbench || isProjectsView || isProjectDetail || isAlertsView || isCustomersView || isCustomerDetail || isProfileView
          ? null
          : <TopBar title="安装商端" subtitle="项目、告警与客户的运营工作台" />
      }
      contentClassName={
        isWorkbench
          ? 'page-scroll page-scroll-installer-workbench'
          : isProjectsView
            ? 'page-scroll page-scroll-installer-projects'
            : isProjectDetail
              ? 'page-scroll page-scroll-installer-project-detail'
            : isAlertsView
              ? 'page-scroll page-scroll-installer-alerts'
              : isCustomersView
                ? 'page-scroll page-scroll-installer-customers'
                : isCustomerDetail
                  ? 'page-scroll page-scroll-installer-customer-detail'
                : isProfileView
                  ? 'page-scroll page-scroll-installer-profile'
                  : undefined
      }
      tabBar={isProjectDetail || isCustomerDetail ? null : <TabBar items={installerTabs} />}
    >
      <Outlet />
    </AppFrame>
  );
}
