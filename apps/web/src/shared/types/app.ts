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

export type Plan = {
  id: string;
  name: string;
  window: string;
  target: string;
  status: '启用' | '草稿';
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
