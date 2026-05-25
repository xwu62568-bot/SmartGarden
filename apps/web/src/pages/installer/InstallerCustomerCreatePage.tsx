import { useLocation, useNavigate } from 'react-router-dom';

export function InstallerCustomerCreatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const backTo =
    typeof location.state === 'object' &&
    location.state !== null &&
    'backTo' in location.state &&
    typeof location.state.backTo === 'string'
      ? location.state.backTo
      : '/installer/customers';

  return (
    <div className="installer-customer-create-page">
      <header className="installer-customer-create-topbar">
        <div className="installer-customer-create-topbar-main">
          <button type="button" className="installer-customer-create-back" aria-label="返回客户列表" onClick={() => navigate(backTo)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1>添加客户</h1>
        </div>
      </header>

      <main className="installer-customer-create-main">
        <div className="installer-customer-create-stack">
          <section className="installer-customer-create-note">
            <p>创建新客户档案以管理其灌溉设备与项目细节。</p>
          </section>

          <form className="installer-customer-create-form">
            <div className="installer-customer-create-field">
              <label htmlFor="customer-name">客户姓名</label>
              <div className="installer-customer-create-input-wrap">
                <input id="customer-name" type="text" placeholder="例如：王先生" defaultValue="" />
              </div>
            </div>

            <div className="installer-customer-create-field">
              <label htmlFor="customer-phone">手机号</label>
              <div className="installer-customer-create-phone-wrap">
                <span>+86</span>
                <input id="customer-phone" type="tel" placeholder="请输入手机号" defaultValue="" />
              </div>
            </div>

            <div className="installer-customer-create-field">
              <label htmlFor="customer-email">电子邮箱 (可选)</label>
              <div className="installer-customer-create-input-wrap">
                <input id="customer-email" type="email" placeholder="example@domain.com" defaultValue="" />
              </div>
            </div>

            <div className="installer-customer-create-field">
              <label htmlFor="project-address">项目地址 (可选)</label>
              <div className="installer-customer-create-address-wrap">
                <input id="project-address" type="text" placeholder="搜索或选择地址" defaultValue="" />
                <button type="button" aria-label="选择地址">
                  <span className="material-symbols-outlined">location_on</span>
                </button>
              </div>
              <p className="installer-customer-create-help">
                <span className="material-symbols-outlined">info</span>
                用于自动识别天气位置与时区
              </p>
            </div>

            <section className="installer-customer-create-map-preview" aria-label="地图预览">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb3_TV8ZmILO-EmCWJsdTGsL3TAJinrJwvVGAG_Lj8JfcJ4cxdJrbWMpmhxziYoOuq5MLPB0YZKXzLDVVRpixZbSbZOCFfELGirCcyverLW0Cp0j7ZgZzRhIiVN8g8RYAEROe4MklY419WOFVbuiq2ihutuzdBqe5xqPYLhEnNjaD8hXL2HWc1YBy3ifZ7KGqG-8ZAandr0hM9PwXTfmBpJa3NVSSIV1GQAYCZujMMdId6Z6SEJIjQieASjJO5ko3jaF_NaPEwDoE"
                alt="Map view preview"
              />
              <div className="installer-customer-create-map-overlay" />
              <div className="installer-customer-create-map-badge">
                <span className="material-symbols-outlined">explore</span>
                <span>MAP VIEW PREVIEW</span>
              </div>
            </section>

            <div className="installer-customer-create-field">
              <label htmlFor="customer-note">备注 (可选)</label>
              <div className="installer-customer-create-input-wrap installer-customer-create-textarea-wrap">
                <textarea
                  id="customer-note"
                  rows={3}
                  placeholder="添加关于客户偏好或场地的备注..."
                  defaultValue=""
                />
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className="installer-customer-create-footer">
        <button type="button" className="installer-customer-create-submit">
          保存客户
        </button>
        <button type="button" className="installer-customer-create-secondary">
          保存并创建项目
        </button>
      </footer>
    </div>
  );
}
