import { Navigate, Route, Routes } from 'react-router-dom';
import { InstallerAlertDetailPage } from '../pages/installer/InstallerAlertDetailPage';
import { InstallerAlertsPage } from '../pages/installer/InstallerAlertsPage';
import { InstallerCustomerDetailPage } from '../pages/installer/InstallerCustomerDetailPage';
import { InstallerCustomersPage } from '../pages/installer/InstallerCustomersPage';
import { InstallerProfilePage } from '../pages/installer/InstallerProfilePage';
import { InstallerProjectDetailPage } from '../pages/installer/InstallerProjectDetailPage';
import { InstallerProjectsPage } from '../pages/installer/InstallerProjectsPage';
import { InstallerShell } from '../pages/installer/InstallerShell';
import { InstallerWorkbenchPage } from '../pages/installer/InstallerWorkbenchPage';
import { OwnerDeviceDetailPage } from '../pages/owner/OwnerDeviceDetailPage';
import { OwnerDevicesPage } from '../pages/owner/OwnerDevicesPage';
import { OwnerHomePage } from '../pages/owner/OwnerHomePage';
import { OwnerSceneCreatePage } from '../pages/owner/OwnerSceneCreatePage';
import { OwnerPlanDetailPage } from '../pages/owner/OwnerPlanDetailPage';
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
        <Route path="plans/:planId" element={<OwnerPlanDetailPage />} />
        <Route path="profile" element={<OwnerProfilePage />} />
      </Route>

      <Route path="/installer" element={<InstallerShell />}>
        <Route index element={<Navigate to="workbench" replace />} />
        <Route path="workbench" element={<InstallerWorkbenchPage />} />
        <Route path="projects" element={<InstallerProjectsPage />} />
        <Route path="projects/:projectId" element={<InstallerProjectDetailPage />} />
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
