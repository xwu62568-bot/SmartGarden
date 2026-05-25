import { Outlet, useLocation } from 'react-router-dom';
import { installerTabs } from '../../shared/mock/installer';
import { AppFrame } from '../../shared/ui/AppFrame';
import { TabBar } from '../../shared/ui/TabBar';
import { TopBar } from '../../shared/ui/TopBar';

export function InstallerShell() {
  const location = useLocation();
  const isWorkbench = location.pathname === '/installer/workbench';
  const isProjectsView = location.pathname === '/installer/projects';
  const isProjectCreate = location.pathname === '/installer/projects/create';
  const isAddDevice = /\/installer\/projects\/[^/]+\/devices\/add$/.test(location.pathname);
  const isProjectDevices = /\/installer\/projects\/[^/]+\/devices$/.test(location.pathname);
  const isProjectDelivery = /\/installer\/projects\/[^/]+\/delivery$/.test(location.pathname);
  const isProjectMap = /\/installer\/projects\/[^/]+\/map$/.test(location.pathname);
  const isProjectMaintenance = /\/installer\/projects\/[^/]+\/maintenance$/.test(location.pathname);
  const isAutomation = /\/installer\/projects\/[^/]+\/automation$/.test(location.pathname);
  const isChannelConfig = /\/installer\/projects\/[^/]+\/channels$/.test(location.pathname);
  const isChannelTest = /\/installer\/projects\/[^/]+\/channel-test$/.test(location.pathname);
  const isProjectPlans = /\/installer\/projects\/[^/]+\/plans$/.test(location.pathname);
  const isProjectScenes = /\/installer\/projects\/[^/]+\/scenes$/.test(location.pathname);
  const isProjectZones = /\/installer\/projects\/[^/]+\/zones$/.test(location.pathname);
  const isProjectDetail = location.pathname.startsWith('/installer/projects/');
  const isAlertsView = location.pathname === '/installer/alerts';
  const isAlertDetail = /\/installer\/alerts\/[^/]+$/.test(location.pathname);
  const isCustomersView = location.pathname === '/installer/customers';
  const isCustomerCreate = location.pathname === '/installer/customers/create';
  const isCustomerDetail = location.pathname.startsWith('/installer/customers/');
  const isProfileView = location.pathname === '/installer/profile';

  return (
    <AppFrame
      header={
        isWorkbench || isProjectsView || isProjectDetail || isAlertsView || isAlertDetail || isCustomersView || isCustomerCreate || isCustomerDetail || isProfileView
        || isProjectCreate
          ? null
          : <TopBar title="安装商端" subtitle="项目、告警与客户的运营工作台" />
      }
      contentClassName={
        isWorkbench
          ? 'page-scroll page-scroll-installer-workbench'
          : isProjectsView
            ? 'page-scroll page-scroll-installer-projects'
            : isProjectCreate
              ? 'page-scroll page-scroll-installer-project-create'
              : isAddDevice
                ? 'page-scroll page-scroll-installer-add-device'
                : isProjectDevices
                  ? 'page-scroll page-scroll-installer-project-devices'
                  : isProjectDelivery
                    ? 'page-scroll page-scroll-installer-project-delivery'
                  : isProjectMap
                    ? 'page-scroll page-scroll-installer-project-map'
                : isProjectMaintenance
                  ? 'page-scroll page-scroll-installer-project-maintenance'
                : isAutomation
                  ? 'page-scroll page-scroll-installer-automation'
                : isChannelConfig
                  ? 'page-scroll page-scroll-installer-channel-config'
                  : isChannelTest
                    ? 'page-scroll page-scroll-installer-channel-test'
                  : isProjectPlans
                    ? 'page-scroll page-scroll-installer-project-plans'
                    : isProjectScenes
                      ? 'page-scroll page-scroll-installer-project-scenes'
              : isProjectZones
                ? 'page-scroll page-scroll-installer-project-zones'
            : isProjectDetail
              ? 'page-scroll page-scroll-installer-project-detail'
            : isAlertsView
              ? 'page-scroll page-scroll-installer-alerts'
              : isAlertDetail
                ? 'page-scroll page-scroll-installer-alert-detail'
              : isCustomersView
                ? 'page-scroll page-scroll-installer-customers'
                : isCustomerCreate
                  ? 'page-scroll page-scroll-installer-customer-create'
                : isCustomerDetail
                  ? 'page-scroll page-scroll-installer-customer-detail'
                : isProfileView
                  ? 'page-scroll page-scroll-installer-profile'
                  : undefined
      }
      tabBar={isProjectDetail || isAlertDetail || isCustomerCreate || isCustomerDetail ? null : <TabBar items={installerTabs} />}
    >
      <Outlet />
    </AppFrame>
  );
}
