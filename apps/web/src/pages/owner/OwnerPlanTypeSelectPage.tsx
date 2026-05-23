import { Link } from 'react-router-dom';
import planTypeHeroImage from '../../assets/plan-type-hero.jpg';

type PlanTypeCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'tertiary' | 'green';
  to?: string;
};

const planTypes: PlanTypeCard[] = [
  {
    id: 'light',
    title: '灯光计划',
    description: '按时间或日落日出自动控制庭院灯光',
    icon: 'lightbulb',
    tone: 'primary',
    to: '/owner/plans/create/light',
  },
  {
    id: 'water',
    title: '水景 / 喷泉计划',
    description: '设置喷泉、水泵、瀑布的运行时间',
    icon: 'water_drop',
    tone: 'secondary',
    to: '/owner/plans/create/water',
  },
  {
    id: 'device',
    title: '户外设备计划',
    description: '定时控制户外插座、节日灯、雾化器等设备',
    icon: 'power',
    tone: 'tertiary',
    to: '/owner/plans/create/outdoor',
  },
  {
    id: 'irrigation',
    title: '基础灌溉计划',
    description: '设置花坛、盆栽、滴灌分区的浇水时间',
    icon: 'park',
    tone: 'green',
  },
] as const;

export function OwnerPlanTypeSelectPage() {
  return (
    <div className="owner-plan-type-page">
      <header className="owner-plan-type-topbar">
        <Link to="/owner/plans" className="owner-plan-type-back" aria-label="返回计划列表">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="owner-plan-type-topbar-copy">
          <h1>创建计划</h1>
        </div>
      </header>

      <main className="owner-plan-type-main">
        <section className="owner-plan-type-intro">
          <p>选择你想自动执行的计划类型</p>
        </section>

        <section className="owner-plan-type-list" aria-label="计划类型">
          {planTypes.map((planType) => {
            const cardContent = (
              <>
                <div className={`owner-plan-type-icon owner-plan-type-icon-${planType.tone}`}>
                  <span className="material-symbols-outlined">{planType.icon}</span>
                </div>
                <div className="owner-plan-type-copy">
                  <h2>{planType.title}</h2>
                  <p>{planType.description}</p>
                </div>
                <span className="material-symbols-outlined owner-plan-type-arrow">chevron_right</span>
              </>
            );

            if (planType.to) {
              return (
                <Link key={planType.id} to={planType.to} role="button" className={`owner-plan-type-card owner-plan-type-card-${planType.tone}`}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <button key={planType.id} type="button" className={`owner-plan-type-card owner-plan-type-card-${planType.tone}`}>
                {cardContent}
              </button>
            );
          })}
        </section>

        <section className="owner-plan-type-note">
          <span className="material-symbols-outlined">verified_user</span>
          <p>
            缺水停泵、自动补水、补水超时等安全保护规则由安装商配置；你可以在“
            <span>保护规则</span>”中查看当前保护状态
          </p>
        </section>

        <section className="owner-plan-type-hero">
          <div className="owner-plan-type-hero-overlay" />
          <img src={planTypeHeroImage} alt="Modern automated garden" />
          <div className="owner-plan-type-hero-copy">
            <strong>打造理想的户外生活</strong>
            <span>自动化控制让一切更简单</span>
          </div>
        </section>
      </main>
    </div>
  );
}
