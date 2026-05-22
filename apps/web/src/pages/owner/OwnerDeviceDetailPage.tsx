import { Link, useParams } from 'react-router-dom';
import { ownerDevices } from '../../shared/mock/owner';
import { MetricCard } from '../../shared/ui/MetricCard';
import { SectionCard } from '../../shared/ui/SectionCard';

export function OwnerDeviceDetailPage() {
  const { deviceId } = useParams();
  const device = ownerDevices.find((item) => item.id === deviceId);

  if (!device) {
    return <div className="muted-text">未找到设备。</div>;
  }

  return (
    <div className="stack">
      <SectionCard title={device.name}>
        <p className="muted-text">{device.zone}</p>
      </SectionCard>
      <MetricCard label="当前读数" value={device.metric} hint={`状态：${device.state}`} />
      <Link to="/owner/devices" className="detail-link">返回设备列表</Link>
    </div>
  );
}
