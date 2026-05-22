import { Link, useParams } from 'react-router-dom';
import { installerCustomers } from '../../shared/mock/installer';
import { SectionCard } from '../../shared/ui/SectionCard';

export function InstallerCustomerDetailPage() {
  const { customerId } = useParams();
  const customer = installerCustomers.find((item) => item.id === customerId);

  if (!customer) {
    return <div className="muted-text">未找到客户。</div>;
  }

  return (
    <div className="stack">
      <SectionCard title={customer.name}>
        <p className="muted-text">站点：{customer.site}</p>
        <p className="muted-text">接入设备：{customer.devices} 台</p>
        {customer.phone ? <p className="muted-text">联系电话：{customer.phone}</p> : null}
        {customer.status ? <p className="muted-text">状态：{customer.status}</p> : null}
      </SectionCard>
      <Link to="/installer/customers" className="detail-link">返回客户列表</Link>
    </div>
  );
}
