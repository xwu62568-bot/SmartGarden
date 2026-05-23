export type Role = 'owner' | 'installer';

export type TabItem = {
  label: string;
  to: string;
  icon?: string;
};

export type Scene = {
  id: string;
  name: string;
  description: string;
  icon: string;
  detailIcon?: string;
  accent: 'sky' | 'mint' | 'slate' | 'danger' | 'lavender';
  actionLabel: '执行' | '编辑';
  actionIcon?: string;
  detailSubtitle: string;
  quickAccessEnabled: boolean;
  warning?: string;
  showInList?: boolean;
  tasks: SceneTask[];
};

export type SceneTask = {
  id: string;
  name: string;
  zone: string;
  icon: string;
  state: 'active' | 'completed' | 'locked';
  valueLabel?: string;
  progress?: number;
  statusText?: string;
  note?: string;
};

export type Device = {
  id: string;
  name: string;
  zone: string;
  metric: string;
  state: '在线' | '维护中' | '离线';
};

export type LightDeviceQuickAction = {
  id: string;
  label: string;
  icon: string;
};

export type LightDeviceInfoCard = {
  id: string;
  label: string;
  value: string;
  icon: string;
};

export type LightDeviceDetail = {
  id: string;
  name: string;
  status: string;
  icon: string;
  powerOn: boolean;
  brightness: number;
  zone: string;
  plan: string;
  scenes: string[];
  temperatures: string[];
  activeTemperature: string;
  colorOptions: string[];
  activeColor: string;
  monitorImage: string;
  monitorTitle: string;
  monitorSubtitle: string;
  quickActions: LightDeviceQuickAction[];
  summaryLabel: string;
  infoCards: LightDeviceInfoCard[];
};

export type WaterDeviceTimerOption = {
  id: string;
  label: string;
  icon: string;
};

export type WaterDeviceProtectionCard = {
  id: string;
  title: string;
  icon: string;
  value: string;
  status: string;
  tone: 'primary' | 'muted';
};

export type WaterDeviceLogAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tone: 'secondary' | 'danger';
};

export type WaterDeviceDetail = {
  id: string;
  name: string;
  status: string;
  runtimeToday: string;
  waterLevelStatus: string;
  protectionEnabledLabel: string;
  heroIcon: string;
  heroStatusLabel: string;
  stabilityLabel: string;
  powerLabel: string;
  powerHint: string;
  timerOptions: WaterDeviceTimerOption[];
  activeTimerOption: string;
  protectionCards: WaterDeviceProtectionCard[];
  runtimeLimitLabel: string;
  runtimeLimitValue: string;
  runtimeLimitAction: string;
  scheduleTitle: string;
  scheduleSubtitle: string;
  logActions: WaterDeviceLogAction[];
  previewImage: string;
  previewEyebrow: string;
  previewTitle: string;
};

export type Plan = {
  id: string;
  name: string;
  window: string;
  target: string;
  status: '启用' | '草稿';
};

export type LightPlanDetailDevice = {
  id: string;
  name: string;
  icon: string;
  tone: 'primary' | 'secondary';
  brightness: string;
  colorLabel: string;
  colorTone: 'warm' | 'blue';
  state: 'ON' | 'OFF';
};

export type LightPlanHistoryEntry = {
  id: string;
  time: string;
  message: string;
  tone: 'success' | 'error';
};

export type LightPlanDetail = {
  id: string;
  name: string;
  enabled: boolean;
  heroImage: string;
  categoryLabel: string;
  triggerLabel: string;
  endLabel: string;
  repeatLabel: string;
  ownerBadge: string;
  summaryTitle: string;
  summaryText: string;
  nextRunLabel: string;
  devices: LightPlanDetailDevice[];
  histories: LightPlanHistoryEntry[];
};

export type WaterPlanProtectionItem = {
  id: string;
  icon: string;
  label: string;
  value: string;
};

export type WaterPlanDeviceState = {
  id: string;
  name: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'muted';
  schedule: string;
  statusLabel: string;
  statusTone: 'active' | 'inactive' | 'auto';
};

export type WaterPlanHistoryEntry = {
  id: string;
  time: string;
  label: string;
  message: string;
  tone: 'success' | 'protected';
};

export type WaterPlanDetail = {
  id: string;
  name: string;
  enabled: boolean;
  heroImage: string;
  statusBadge: string;
  typeLabel: string;
  cycleLabel: string;
  scheduleLabel: string;
  sourceLabel: string;
  protectionTitle: string;
  protectionFooter: string;
  protections: WaterPlanProtectionItem[];
  devices: WaterPlanDeviceState[];
  histories: WaterPlanHistoryEntry[];
};

export type IrrigationPlanZone = {
  id: string;
  order: string;
  name: string;
  duration: string;
  sequenceLabel: string;
  protectionLabel: string;
};

export type IrrigationPlanHistoryEntry = {
  id: string;
  title: string;
  message: string;
  tone: 'success' | 'skip' | 'error';
};

export type IrrigationPlanDetail = {
  id: string;
  name: string;
  enabled: boolean;
  categoryLabel: string;
  totalDuration: string;
  startTime: string;
  repeatLabel: string;
  nextRunLabel: string;
  sourceLabel: string;
  rainSkipTitle: string;
  rainSkipStatus: string;
  rainSkipCondition: string;
  rainSkipToday: string;
  zones: IrrigationPlanZone[];
  histories: IrrigationPlanHistoryEntry[];
};

export type Project = {
  id: string;
  name: string;
  city?: string;
  health?: string;
  address?: string;
  customerName?: string;
  status?: '安装中' | '待交付' | '已交付' | '授权取消';
  onlineSummary?: string;
  totalDevices?: number;
  onlineDevices?: number;
  offlineDevices?: number;
  warningText?: string;
  lastMaintenance?: string;
  deliveryDate?: string;
  signalStrength?: string;
  note?: string;
  accent?: 'danger' | 'secondary' | 'outline';
};

export type InstallerProjectQuickAction = {
  id: string;
  label: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'tertiary' | 'solid';
};

export type InstallerProjectModule = {
  id: string;
  label: string;
  icon: string;
  tone: 'default' | 'danger';
};

export type InstallerProjectRecentAlert = {
  id: string;
  title: string;
  time: string;
  message: string;
  icon: string;
  tone: 'danger' | 'neutral';
};

export type InstallerProjectDetail = {
  id: string;
  name: string;
  status: '安装中' | '待交付' | '已交付' | '授权取消';
  customerName: string;
  address: string;
  heroImage: string;
  totalDevices: number;
  onlineDevices: number;
  activeAlerts: number;
  deliveryStatus: string;
  authorizationLabel: string;
  quickActions: InstallerProjectQuickAction[];
  modules: InstallerProjectModule[];
  recentAlerts: InstallerProjectRecentAlert[];
};

export type AlertItem = {
  id: string;
  title: string;
  level: '高' | '中' | '低';
  source: string;
  time?: string;
  customerName?: string;
  deviceName?: string;
  deviceZone?: string;
  status?: '未处理' | '处理中' | '已解决';
  note?: string;
  actionLabel?: string;
  icon?: string;
};

export type Customer = {
  id: string;
  name: string;
  site: string;
  devices: number;
  phone?: string;
  status?: '已授权' | '待交付' | '已取消授权';
  warningText?: string;
  syncText?: string;
  latestMaintenance?: string;
  projectCount?: number;
  accent?: 'danger' | 'secondary' | 'normal';
};

export type InstallerCustomerQuickAction = {
  id: string;
  label: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'tertiary' | 'muted';
};

export type InstallerCustomerProjectCard = {
  id: string;
  name: string;
  subtitle: string;
  status: string;
  statusTone: 'active' | 'idle';
  deviceId: string;
  deviceCount: string;
  lastSync: string;
};

export type InstallerCustomerDetail = {
  id: string;
  name: string;
  statusLabel: string;
  phone: string;
  email: string;
  address: string;
  quickActions: InstallerCustomerQuickAction[];
  projectsSummary: string;
  projects: InstallerCustomerProjectCard[];
};
