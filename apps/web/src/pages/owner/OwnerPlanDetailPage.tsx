import { Link, useParams } from 'react-router-dom';
import { ownerPlans } from '../../shared/mock/owner';
import { SectionCard } from '../../shared/ui/SectionCard';

export function OwnerPlanDetailPage() {
  const { planId } = useParams();
  const plan = ownerPlans.find((item) => item.id === planId);

  if (!plan) {
    return <div className="muted-text">未找到计划。</div>;
  }

  return (
    <div className="stack">
      <SectionCard title={plan.name}>
        <p className="muted-text">执行时段：{plan.window}</p>
        <p className="muted-text">目标对象：{plan.target}</p>
        <p className="muted-text">当前状态：{plan.status}</p>
      </SectionCard>
      <Link to="/owner/plans" className="detail-link">返回计划列表</Link>
    </div>
  );
}
