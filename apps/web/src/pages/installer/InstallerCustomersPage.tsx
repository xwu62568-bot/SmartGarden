import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { installerCustomers } from '../../shared/mock/installer';

const customerFilters = ['全部', '有告警 (2)', '待交付', '已取消授权'] as const;

export function InstallerCustomersPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof customerFilters)[number]>('全部');
  const stitchedCustomerDetailIds = new Set(['c-88']);

  const visibleCustomers = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    return installerCustomers.filter((customer) => {
      const matchesKeyword =
        keyword.length === 0 ||
        [customer.name, customer.site, customer.phone]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(keyword));

      const matchesFilter =
        activeFilter === '全部' ||
        (activeFilter === '有告警 (2)' && customer.accent === 'danger') ||
        (activeFilter === '待交付' && customer.status === '待交付') ||
        (activeFilter === '已取消授权' && customer.status === '已取消授权');

      return matchesKeyword && matchesFilter;
    });
  }, [activeFilter, searchValue]);

  return (
    <div className="installer-customers-page">
      <header className="installer-customers-bar">
        <h1>客户</h1>
        <button type="button" aria-label="新建客户">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="installer-customers-search-row">
        <div className="installer-customers-search">
          <span className="material-symbols-outlined">search</span>
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="搜索客户或项目..."
          />
        </div>
        <button type="button" className="installer-customers-add-pill">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="installer-customers-filters">
        {customerFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={filter === activeFilter ? 'installer-customers-filter active' : 'installer-customers-filter'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="installer-customer-card-stack">
        {visibleCustomers.map((customer) => (
          <article
            key={customer.id}
            className={`installer-customer-card installer-customer-card-${customer.accent ?? 'normal'}`}
            onClick={() => {
              if (stitchedCustomerDetailIds.has(customer.id)) {
                navigate(`/installer/customers/${customer.id}`);
              }
            }}
          >
            {customer.accent === 'danger' || customer.accent === 'secondary' ? (
              <span className="installer-customer-rail" />
            ) : null}

            <div className="installer-customer-head">
              <div className="installer-customer-person">
                <div className="installer-customer-avatar">{customer.name.slice(0, 1)}</div>
                <div>
                  <h2>{customer.name}</h2>
                  <p>
                    <span className="material-symbols-outlined">phone_iphone</span>
                    {customer.phone}
                  </p>
                </div>
              </div>
              <div className={`installer-customer-status installer-customer-status-${customer.status}`}>
                {customer.status === '待交付' ? <span className="material-symbols-outlined">pending_actions</span> : <span className="installer-customer-status-dot" />}
                {customer.status}
              </div>
            </div>

            <div className={`installer-customer-signal installer-customer-signal-${customer.accent ?? 'normal'}`}>
              <span className="material-symbols-outlined">
                {customer.accent === 'danger' ? 'warning' : customer.accent === 'secondary' ? 'inventory_2' : 'check_circle'}
              </span>
              <div>
                <strong>{customer.warningText}</strong>
                <p>{customer.syncText}</p>
              </div>
            </div>

            <div className="installer-customer-stats">
              <div>
                <label>项目数量</label>
                <strong>
                  <span className="material-symbols-outlined">potted_plant</span>
                  {`${customer.projectCount}个项目`}
                </strong>
              </div>
              <div className={customer.latestMaintenance === '暂无记录' ? 'muted-card' : ''}>
                <label>最近维护</label>
                <strong>
                  <span className="material-symbols-outlined">{customer.latestMaintenance === '暂无记录' ? 'horizontal_rule' : 'history'}</span>
                  {customer.latestMaintenance}
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
