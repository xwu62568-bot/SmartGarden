import { Navigate, Route, Routes } from 'react-router-dom';
import { InstallerAlertDetailPage } from '../pages/installer/InstallerAlertDetailPage';
import { InstallerAddDevicePage } from '../pages/installer/InstallerAddDevicePage';
import { InstallerAutomationRulesPage } from '../pages/installer/InstallerAutomationRulesPage';
import { InstallerAlertsPage } from '../pages/installer/InstallerAlertsPage';
import { InstallerChannelConfigPage } from '../pages/installer/InstallerChannelConfigPage';
import { InstallerChannelTestPage } from '../pages/installer/InstallerChannelTestPage';
import { InstallerCustomerDetailPage } from '../pages/installer/InstallerCustomerDetailPage';
import { InstallerCustomersPage } from '../pages/installer/InstallerCustomersPage';
import { InstallerProjectCreatePage } from '../pages/installer/InstallerProjectCreatePage';
import { InstallerProjectDevicesPage } from '../pages/installer/InstallerProjectDevicesPage';
import { InstallerProfilePage } from '../pages/installer/InstallerProfilePage';
import { InstallerProjectDetailPage } from '../pages/installer/InstallerProjectDetailPage';
import { InstallerProjectMapPage } from '../pages/installer/InstallerProjectMapPage';
import { InstallerProjectPlansPage } from '../pages/installer/InstallerProjectPlansPage';
import { InstallerProjectsPage } from '../pages/installer/InstallerProjectsPage';
import { InstallerProjectScenesPage } from '../pages/installer/InstallerProjectScenesPage';
import { InstallerProjectZonesPage } from '../pages/installer/InstallerProjectZonesPage';
import { InstallerShell } from '../pages/installer/InstallerShell';
import { InstallerWorkbenchPage } from '../pages/installer/InstallerWorkbenchPage';
import { OwnerDeviceDetailPage } from '../pages/owner/OwnerDeviceDetailPage';
import { OwnerDevicesPage } from '../pages/owner/OwnerDevicesPage';
import { OwnerHomePage } from '../pages/owner/OwnerHomePage';
import { OwnerLightPlanCreatePage } from '../pages/owner/OwnerLightPlanCreatePage';
import { OwnerOutdoorPlanCreatePage } from '../pages/owner/OwnerOutdoorPlanCreatePage';
import { OwnerWaterPlanCreatePage } from '../pages/owner/OwnerWaterPlanCreatePage';
import { OwnerSceneCreatePage } from '../pages/owner/OwnerSceneCreatePage';
import { OwnerPlanDetailPage } from '../pages/owner/OwnerPlanDetailPage';
import { OwnerPlanTypeSelectPage } from '../pages/owner/OwnerPlanTypeSelectPage';
import { OwnerPlansPage } from '../pages/owner/OwnerPlansPage';
import { OwnerProfilePage } from '../pages/owner/OwnerProfilePage';
import { OwnerSceneDetailPage } from '../pages/owner/OwnerSceneDetailPage';
import { OwnerScenesPage } from '../pages/owner/OwnerScenesPage';
import { OwnerShell } from '../pages/owner/OwnerShell';
import { RoleSelectPage } from '../pages/RoleSelectPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectPage />} />

      <Route path="/owner" element={<OwnerShell />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<OwnerHomePage />} />
        <Route path="scenes" element={<OwnerScenesPage />} />
        <Route path="scenes/create" element={<OwnerSceneCreatePage />} />
        <Route path="scenes/:sceneId" element={<OwnerSceneDetailPage />} />
        <Route path="devices" element={<OwnerDevicesPage />} />
        <Route path="devices/:deviceId" element={<OwnerDeviceDetailPage />} />
        <Route path="plans" element={<OwnerPlansPage />} />
        <Route path="plans/create" element={<OwnerPlanTypeSelectPage />} />
        <Route path="plans/create/light" element={<OwnerLightPlanCreatePage />} />
        <Route path="plans/create/outdoor" element={<OwnerOutdoorPlanCreatePage />} />
        <Route path="plans/create/water" element={<OwnerWaterPlanCreatePage />} />
        <Route path="plans/:planId" element={<OwnerPlanDetailPage />} />
        <Route path="profile" element={<OwnerProfilePage />} />
      </Route>

      <Route path="/installer" element={<InstallerShell />}>
        <Route index element={<Navigate to="workbench" replace />} />
        <Route path="workbench" element={<InstallerWorkbenchPage />} />
        <Route path="projects" element={<InstallerProjectsPage />} />
        <Route path="projects/create" element={<InstallerProjectCreatePage />} />
        <Route path="projects/:projectId/devices/add" element={<InstallerAddDevicePage />} />
        <Route path="projects/:projectId/devices" element={<InstallerProjectDevicesPage />} />
        <Route path="projects/:projectId/map" element={<InstallerProjectMapPage />} />
        <Route path="projects/:projectId/automation" element={<InstallerAutomationRulesPage />} />
        <Route path="projects/:projectId/channels" element={<InstallerChannelConfigPage />} />
        <Route path="projects/:projectId/channel-test" element={<InstallerChannelTestPage />} />
        <Route path="projects/:projectId/plans" element={<InstallerProjectPlansPage />} />
        <Route path="projects/:projectId/scenes" element={<InstallerProjectScenesPage />} />
        <Route path="projects/:projectId" element={<InstallerProjectDetailPage />} />
        <Route path="projects/:projectId/zones" element={<InstallerProjectZonesPage />} />
        <Route path="alerts" element={<InstallerAlertsPage />} />
        <Route path="alerts/:alertId" element={<InstallerAlertDetailPage />} />
        <Route path="customers" element={<InstallerCustomersPage />} />
        <Route path="customers/:customerId" element={<InstallerCustomerDetailPage />} />
        <Route path="profile" element={<InstallerProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
