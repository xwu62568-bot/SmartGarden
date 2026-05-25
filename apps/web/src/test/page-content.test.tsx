import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

function renderRoute(path: string) {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <App />
    </MemoryRouter>,
  );
}

describe('stitched page content', () => {
  it('shows the Stitch-aligned owner scenes list', () => {
    renderRoute('/owner/scenes');

    expect(screen.getByRole('heading', { name: '场景' })).toBeInTheDocument();
    expect(screen.getByText('夜景模式')).toBeInTheDocument();
    expect(screen.getByText('聚会模式')).toBeInTheDocument();
    expect(screen.getByText('离家模式')).toBeInTheDocument();
    expect(screen.getByText('全部关闭')).toBeInTheDocument();
    expect(screen.getByText('自定义场景')).toBeInTheDocument();
    expect(screen.getAllByText('执行').length).toBeGreaterThan(0);
    expect(screen.getByText('开启路径灯、水下灯，关闭喷泉')).toBeInTheDocument();
    expect(screen.getByText('开启彩色灯光、喷泉和户外插座')).toBeInTheDocument();
    expect(screen.getByText('关闭喷泉和户外设备，保留安全路径灯')).toBeInTheDocument();
    expect(screen.getByText('关闭允许关闭的灯光、水景和户外设备')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /场景/ })).toBeInTheDocument();
  });

  it('shows the Stitch-aligned owner scene detail', () => {
    renderRoute('/owner/scenes/night');

    expect(screen.getAllByText('夜景模式').length).toBeGreaterThan(0);
    expect(screen.getByText('执行任务')).toBeInTheDocument();
    expect(screen.getByText('前院路径灯')).toBeInTheDocument();
    expect(screen.getByText('在首页快捷场景中显示')).toBeInTheDocument();
    expect(screen.getByText('执行场景')).toBeInTheDocument();
  });

  it('shows the stitched owner create scene page', () => {
    renderRoute('/owner/scenes/create');

    expect(screen.getByRole('heading', { name: '创建场景' })).toBeInTheDocument();
    expect(screen.getByText('场景名称')).toBeInTheDocument();
    expect(screen.getByDisplayValue('烧烤模式')).toBeInTheDocument();
    expect(screen.getByText('常用模版')).toBeInTheDocument();
    expect(screen.getByText('夜景')).toBeInTheDocument();
    expect(screen.getByText('自定义')).toBeInTheDocument();
    expect(screen.getByText('添加执行任务')).toBeInTheDocument();
    expect(screen.getByText('露台灯带')).toBeInTheDocument();
    expect(screen.getByText('喷泉')).toBeInTheDocument();
    expect(screen.getByText('后院滴灌')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /预览场景/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /保存场景/ })).toBeInTheDocument();
  });

  it('shows owner devices overview and maintenance focus', () => {
    renderRoute('/owner/devices');

    expect(screen.getByRole('heading', { name: '设备' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('搜索设备名称...')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /全部/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /灯光/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /水景/ })).toBeInTheDocument();
    expect(screen.getAllByText('前院').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: '查看前院路径灯详情' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '查看喷泉泵详情' })).toBeInTheDocument();
  });

  it('shows owner plans dashboard and creation entry', () => {
    renderRoute('/owner/plans');

    expect(screen.getByRole('heading', { name: '计划' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '创建计划' })).toBeInTheDocument();
    expect(screen.getByText('智能计划摘要')).toBeInTheDocument();
    expect(screen.getByText('今日预计节省 15% 灌溉用水')).toBeInTheDocument();
    expect(screen.getByText('每日夜景灯光')).toBeInTheDocument();
    expect(screen.getByText('白天喷泉')).toBeInTheDocument();
    expect(screen.getByText('早晨浇水')).toBeInTheDocument();
    expect(screen.getByText('缺水停泵')).toBeInTheDocument();
  });

  it('shows the stitched plan type selection page', () => {
    renderRoute('/owner/plans/create');

    expect(screen.getByRole('heading', { name: '创建计划' })).toBeInTheDocument();
    expect(screen.getByText('选择你想自动执行的计划类型')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /灯光计划/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /水景 \/ 喷泉计划/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /户外设备计划/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /基础灌溉计划/ })).toBeInTheDocument();
    expect(screen.getByText(/缺水停泵、自动补水、补水超时等安全保护规则由安装商配置/)).toBeInTheDocument();
    expect(screen.getByAltText('Modern automated garden')).toBeInTheDocument();
    expect(screen.getByText('自动化控制让一切更简单')).toBeInTheDocument();
  });

  it('shows the stitched owner light plan creation page', () => {
    renderRoute('/owner/plans/create/light');

    expect(screen.getByRole('heading', { name: '创建灯光计划' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('每日夜景灯光')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '日落后' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('+15 分钟')).toBeInTheDocument();
    expect(screen.getByText('23:30')).toBeInTheDocument();
    expect(screen.getByText('前院路径灯')).toBeInTheDocument();
    expect(screen.getByText('池塘水下灯')).toBeInTheDocument();
    expect(screen.getByText('计划概要')).toBeInTheDocument();
  });

  it('shows the stitched owner water plan creation page', () => {
    renderRoute('/owner/plans/create/water');

    expect(screen.getByRole('heading', { name: '创建水景计划' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('白天喷泉')).toBeInTheDocument();
    expect(screen.getByText('运行时间')).toBeInTheDocument();
    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('22:00')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '每天' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('安全保护状态')).toBeInTheDocument();
    expect(screen.getByText('喷泉泵')).toBeInTheDocument();
    expect(screen.getByText('过滤器开关')).toBeInTheDocument();
    expect(screen.getByText('预估计划效果')).toBeInTheDocument();
  });

  it('shows the stitched owner outdoor device plan creation page', () => {
    renderRoute('/owner/plans/create/outdoor');

    expect(screen.getByRole('heading', { name: '创建户外设备计划' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('节日灯定时')).toBeInTheDocument();
    expect(screen.getByText('执行设备')).toBeInTheDocument();
    expect(screen.getByText('户外插座')).toBeInTheDocument();
    expect(screen.getByText('节日灯')).toBeInTheDocument();
    expect(screen.getByText('运行时间')).toBeInTheDocument();
    expect(screen.getAllByText('18:00').length).toBeGreaterThan(0);
    expect(screen.getAllByText('23:00').length).toBeGreaterThan(0);
    expect(screen.getByText('安全保护（防忘关）')).toBeInTheDocument();
    expect(screen.getByText('最大连续运行')).toBeInTheDocument();
  });

  it('shows the stitched owner light plan detail page', () => {
    renderRoute('/owner/plans/daily-lighting');

    expect(screen.getByRole('heading', { name: '每日夜景灯光' })).toBeInTheDocument();
    expect(screen.getByAltText('Night Garden')).toBeInTheDocument();
    expect(screen.getByText('灯光计划')).toBeInTheDocument();
    expect(screen.getByText('日落后 15 分钟')).toBeInTheDocument();
    expect(screen.getByText('23:30 结束')).toBeInTheDocument();
    expect(screen.getByText('计划摘要')).toBeInTheDocument();
    expect(screen.getByText('前院路径灯')).toBeInTheDocument();
    expect(screen.getByText('池塘水下灯')).toBeInTheDocument();
    expect(screen.getByText('立即执行一次')).toBeInTheDocument();
    expect(screen.getByText('执行记录')).toBeInTheDocument();
    expect(screen.getByText('部分失败：池塘水下灯离线')).toBeInTheDocument();
  });

  it('shows the stitched owner water plan detail page', () => {
    renderRoute('/owner/plans/day-fountain');

    expect(screen.getByRole('heading', { name: '白天喷泉' })).toBeInTheDocument();
    expect(screen.getByAltText('Garden Fountain')).toBeInTheDocument();
    expect(screen.getByText('计划类型')).toBeInTheDocument();
    expect(screen.getByText('水景计划')).toBeInTheDocument();
    expect(screen.getByText('安全防护')).toBeInTheDocument();
    expect(screen.getByText('缺水保护')).toBeInTheDocument();
    expect(screen.getByText('执行设备状态')).toBeInTheDocument();
    expect(screen.getByText('喷泉泵')).toBeInTheDocument();
    expect(screen.getByText('立即开启 30 分钟')).toBeInTheDocument();
    expect(screen.getByText('联系安装商')).toBeInTheDocument();
    expect(screen.getByText('执行历史')).toBeInTheDocument();
    expect(screen.getByText('水位低，触发保护性停机')).toBeInTheDocument();
  });

  it('shows the stitched owner irrigation plan detail page', () => {
    renderRoute('/owner/plans/morning-irrigation');

    expect(screen.getByRole('heading', { level: 1, name: '早晨浇水' })).toBeInTheDocument();
    expect(screen.getByText('基础灌溉计划')).toBeInTheDocument();
    expect(screen.getByText('总时长')).toBeInTheDocument();
    expect(screen.getByText('23 分钟')).toBeInTheDocument();
    expect(screen.getByText('雨天跳过')).toBeInTheDocument();
    expect(screen.getByText('执行区域 (3)')).toBeInTheDocument();
    expect(screen.getByText('前院花坛')).toBeInTheDocument();
    expect(screen.getByText('后院滴灌')).toBeInTheDocument();
    expect(screen.getByText('立即执行一次')).toBeInTheDocument();
    expect(screen.getByText('执行历史')).toBeInTheDocument();
    expect(screen.getByText('后院滴灌阀门离线')).toBeInTheDocument();
  });

  it('shows installer workbench operations summary', () => {
    renderRoute('/installer/workbench');

    expect(screen.getByText('待处理事项')).toBeInTheDocument();
    expect(screen.getByText('近期维护动态')).toBeInTheDocument();
    expect(screen.getByText('王先生后院')).toBeInTheDocument();
    expect(screen.getByText('李女士花园')).toBeInTheDocument();
    expect(screen.getByText('今天有 2 个项目设备离线')).toBeInTheDocument();
  });

  it('navigates from installer workbench pending item into alert detail page', async () => {
    const user = userEvent.setup();

    renderRoute('/installer/workbench');

    await user.click(screen.getByRole('button', { name: '查看王先生后院告警详情' }));

    expect(screen.getByRole('heading', { level: 1, name: '告警详情' })).toBeInTheDocument();
    expect(screen.getByText('池塘水位低')).toBeInTheDocument();
  });

  it('shows the stitched installer alert detail page', () => {
    renderRoute('/installer/alerts/a-001');

    expect(screen.getByRole('heading', { level: 1, name: '告警详情' })).toBeInTheDocument();
    expect(screen.getByText('池塘水位低')).toBeInTheDocument();
    expect(screen.getByText('严重')).toBeInTheDocument();
    expect(screen.getByText('未处理')).toBeInTheDocument();
    expect(screen.getByText(/所属项目:/)).toBeInTheDocument();
    expect(screen.getAllByText('王先生后院').length).toBeGreaterThan(0);
    expect(screen.getByText('池塘水位传感器')).toBeInTheDocument();
    expect(screen.getByText('已执行保护动作')).toBeInTheDocument();
    expect(screen.getByText('自动防护中')).toBeInTheDocument();
    expect(screen.getByText('建议处理步骤')).toBeInTheDocument();
    expect(screen.getByText('查看设备详情')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '处理说明' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '标记为处理中' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '标记为已解决' })).toBeInTheDocument();
  });

  it('returns to alerts list when alert detail is opened from alerts page', async () => {
    const user = userEvent.setup();

    renderRoute('/installer/alerts');

    await user.click(screen.getAllByRole('button', { name: '查看详情' })[0]);
    expect(screen.getByRole('heading', { level: 1, name: '告警详情' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '返回告警列表' }));
    expect(screen.getByRole('heading', { level: 1, name: '告警' })).toBeInTheDocument();
  });

  it('navigates from installer workbench new project into the create project page', async () => {
    const user = userEvent.setup();

    renderRoute('/installer/workbench');

    await user.click(screen.getByRole('button', { name: /新建项目/ }));

    expect(screen.getByRole('heading', { name: '项目信息' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /创建项目/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回工作台' })).toBeInTheDocument();
  });

  it('returns to installer workbench when create project is opened from workbench', async () => {
    const user = userEvent.setup();

    renderRoute('/installer/workbench');

    await user.click(screen.getByRole('button', { name: /新建项目/ }));
    await user.click(screen.getByRole('link', { name: '返回工作台' }));

    expect(screen.getByText('待处理事项')).toBeInTheDocument();
    expect(screen.getByText('近期维护动态')).toBeInTheDocument();
  });

  it('shows the stitched installer project detail page', () => {
    renderRoute('/installer/projects/p-101');

    expect(screen.getByRole('heading', { name: '王先生后院' })).toBeInTheDocument();
    expect(screen.getByText('客户: 王先生')).toBeInTheDocument();
    expect(screen.getByText('设备总数')).toBeInTheDocument();
    expect(screen.getByText('项目授权')).toBeInTheDocument();
    expect(screen.getByText('通道测试')).toBeInTheDocument();
    expect(screen.getByText('点位图')).toBeInTheDocument();
    expect(screen.getByText('维护')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /告警/ })).not.toBeInTheDocument();
    expect(screen.getByText('最近告警')).toBeInTheDocument();
    expect(screen.getByText('区域 3：中心池塘传感器报告深度 < 15%。')).toBeInTheDocument();
  });

  it('shows the installer project maintenance page', () => {
    renderRoute('/installer/projects/p-101/maintenance');

    expect(screen.getByRole('heading', { level: 1, name: '维护记录' })).toBeInTheDocument();
    expect(screen.getByText('维护档案')).toBeInTheDocument();
    expect(screen.getByText('最近一次维护已同步')).toBeInTheDocument();
    expect(screen.getByText('待处理维护项')).toBeInTheDocument();
    expect(screen.getByText('清理池塘滤网')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '维护记录' })).toBeInTheDocument();
    expect(screen.getByText('春季例行巡检')).toBeInTheDocument();
    expect(screen.getByText('维护资料')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '导出维护报告' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '新增维护记录' })).toBeInTheDocument();
  });

  it('shows the installer project delivery page', () => {
    renderRoute('/installer/projects/p-101/delivery');

    expect(screen.getByRole('heading', { level: 1, name: '项目交付' })).toBeInTheDocument();
    expect(screen.getByText('交付准备度')).toBeInTheDocument();
    expect(screen.getByText('还差 2 项确认即可完成交付')).toBeInTheDocument();
    expect(screen.getByText('交付检查清单')).toBeInTheDocument();
    expect(screen.getByText('设备命名与区域归档')).toBeInTheDocument();
    expect(screen.getByText('客户交付信息')).toBeInTheDocument();
    expect(screen.getByText('客户姓名')).toBeInTheDocument();
    expect(screen.getByText('交付资料与培训')).toBeInTheDocument();
    expect(screen.getByText('项目资料包')).toBeInTheDocument();
    expect(screen.getByText('交付备注')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存交付草稿' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '确认完成交付' })).toBeInTheDocument();
  });

  it('navigates from project detail into delivery page', async () => {
    const user = userEvent.setup();

    renderRoute('/installer/projects/p-101');

    await user.click(screen.getByRole('link', { name: /交付项目/ }));

    expect(screen.getByRole('heading', { level: 1, name: '项目交付' })).toBeInTheDocument();
  });

  it('shows the stitched installer project devices page', () => {
    renderRoute('/installer/projects/p-101/devices');

    expect(screen.getByRole('heading', { name: '设备' })).toBeInTheDocument();
    expect(screen.getByText('安装中')).toBeInTheDocument();
    expect(screen.getByText('添加设备')).toBeInTheDocument();
    expect(screen.getAllByText('全部').length).toBeGreaterThan(0);
    expect(screen.getByText('未配置')).toBeInTheDocument();
    expect(screen.getByText('交付检查进度')).toBeInTheDocument();
    expect(screen.getByText('网关在线')).toBeInTheDocument();
    expect(screen.getByText('设备命名')).toBeInTheDocument();
    expect(screen.getAllByText('通道配置').length).toBeGreaterThan(0);
    expect(screen.getAllByText('通道测试').length).toBeGreaterThan(0);
    expect(screen.getByText('户外网关')).toBeInTheDocument();
    expect(screen.getByText('池塘水位传感器')).toBeInTheDocument();
    expect(screen.getByText('配置保护')).toBeInTheDocument();
    expect(screen.getByText('设备离线')).toBeInTheDocument();
  });

  it('shows the stitched installer project map page', () => {
    renderRoute('/installer/projects/p-101/map');

    expect(screen.getByRole('heading', { name: '点位图' })).toBeInTheDocument();
    expect(screen.getByText('王先生后院')).toBeInTheDocument();
    expect(screen.getByText('前院路灯')).toBeInTheDocument();
    expect(screen.getByText('状态: 离线 (离线3h)')).toBeInTheDocument();
    expect(screen.getByText('全部')).toBeInTheDocument();
    expect(screen.getByText('灯光')).toBeInTheDocument();
    expect(screen.getByText('水泵')).toBeInTheDocument();
    expect(screen.getByText('传感器')).toBeInTheDocument();
    expect(screen.getByText('控制箱')).toBeInTheDocument();
    expect(screen.getByText('预览屋主视图')).toBeInTheDocument();
    expect(screen.getByText('保存点位图')).toBeInTheDocument();
  });

  it('shows the stitched installer customer detail page', () => {
    renderRoute('/installer/customers/c-88');

    expect(screen.getByText('客户详情')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '王先生' })).toBeInTheDocument();
    expect(screen.getByText('已授权')).toBeInTheDocument();
    expect(screen.getByText('快捷操作')).toBeInTheDocument();
    expect(screen.getByText('新建项目')).toBeInTheDocument();
    expect(screen.getByText('查看维护记录')).toBeInTheDocument();
    expect(screen.getByText('项目')).toBeInTheDocument();
    expect(screen.getByText('王先生前院灯光')).toBeInTheDocument();
  });

  it('shows the stitched installer add customer page', () => {
    renderRoute('/installer/customers/create');

    expect(screen.getByRole('heading', { name: '添加客户' })).toBeInTheDocument();
    expect(screen.getByText('创建新客户档案以管理其灌溉设备与项目细节。')).toBeInTheDocument();
    expect(screen.getByLabelText('客户姓名')).toBeInTheDocument();
    expect(screen.getByLabelText('手机号')).toBeInTheDocument();
    expect(screen.getByLabelText('电子邮箱 (可选)')).toBeInTheDocument();
    expect(screen.getByLabelText('项目地址 (可选)')).toBeInTheDocument();
    expect(screen.getByText('用于自动识别天气位置与时区')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Map view preview' })).toBeInTheDocument();
    expect(screen.getByLabelText('备注 (可选)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存客户' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存并创建项目' })).toBeInTheDocument();
  });

  it('navigates from customers page into add customer page', async () => {
    const user = userEvent.setup();

    renderRoute('/installer/customers');

    await user.click(screen.getByRole('button', { name: '新建客户' }));

    expect(screen.getByRole('heading', { name: '添加客户' })).toBeInTheDocument();
  });

  it('shows the stitched installer project create page', () => {
    renderRoute('/installer/projects/create');

    expect(screen.getByRole('heading', { name: '项目信息' })).toBeInTheDocument();
    expect(screen.getByText('项目名称')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /自动生成/ })).toBeInTheDocument();
    expect(screen.getByText('项目地址')).toBeInTheDocument();
    expect(screen.getByText('从客户地址导入')).toBeInTheDocument();
    expect(screen.getByText('地图定位')).toBeInTheDocument();
    expect(screen.getByText('天气位置')).toBeInTheDocument();
    expect(screen.getByDisplayValue('北京市朝阳区北辰东路15号')).toBeInTheDocument();
    expect(screen.getByText('项目时区')).toBeInTheDocument();
    expect(screen.getByText('(UTC+08:00) 北京')).toBeInTheDocument();
    expect(screen.getByText('项目备注')).toBeInTheDocument();
    expect(screen.getByText('当前项目状态')).toBeInTheDocument();
    expect(screen.getByText('安装中')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /创建项目/ })).toBeInTheDocument();
  });

  it('shows owner profile account and service settings', () => {
    renderRoute('/owner/profile');

    expect(screen.getByRole('heading', { name: '我的' })).toBeInTheDocument();
    expect(screen.getByText('张先生')).toBeInTheDocument();
    expect(screen.getByText('当前项目：我的后院')).toBeInTheDocument();
    expect(screen.getByText('安装商授权')).toBeInTheDocument();
    expect(screen.getByText('绿意景观工程公司')).toBeInTheDocument();
    expect(screen.getByText('项目设置')).toBeInTheDocument();
    expect(screen.getByText('家庭成员')).toBeInTheDocument();
    expect(screen.getByText('通知设置')).toBeInTheDocument();
  });

  it('shows installer profile team and tool settings', () => {
    renderRoute('/installer/profile');

    expect(screen.getByRole('heading', { name: '我的' })).toBeInTheDocument();
    expect(screen.getByText('李工程师')).toBeInTheDocument();
    expect(screen.getAllByText('智绿景观工程公司').length).toBeGreaterThan(0);
    expect(screen.getByText('服务区域：上海市、苏州市、杭州市')).toBeInTheDocument();
    expect(screen.getAllByText('团队成员').length).toBeGreaterThan(0);
    expect(screen.getByText('项目权限')).toBeInTheDocument();
    expect(screen.getByText('帮助中心')).toBeInTheDocument();
  });
});
