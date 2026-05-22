import { Link, useParams } from 'react-router-dom';
import { installerAlerts } from '../../shared/mock/installer';
import { SectionCard } from '../../shared/ui/SectionCard';

export function InstallerAlertDetailPage() {
  const { alertId } = useParams();
  const alert = installerAlerts.find((item) => item.id === alertId);

  if (!alert) {
    return <div className="muted-text">未找到告警。</div>;
  }

  return (
    <div className="stack">
      <SectionCard title={alert.title}>
        <p className="muted-text">来源项目：{alert.source}</p>
        <p className="muted-text">优先级：{alert.level}</p>
        {alert.deviceName ? <p className="muted-text">{`设备：${alert.deviceName} (${alert.deviceZone ?? '-'})`}</p> : null}
        {alert.note ? <p className="muted-text">{`说明：${alert.note}`}</p> : null}
      </SectionCard>
      <Link to="/installer/alerts" className="detail-link">返回告警列表</Link>
    </div>
  );
}
