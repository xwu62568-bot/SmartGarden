import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('installer project detail page', () => {
  it('navigates from the installer projects list into the stitched project detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('王先生后院'));

    expect(screen.getByRole('heading', { name: '王先生后院' })).toBeInTheDocument();
    expect(screen.getByText('快捷操作')).toBeInTheDocument();
    expect(screen.getByText('项目模块')).toBeInTheDocument();
  });

  it('renders the stitched installer project detail sections', () => {
    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('客户: 王先生')).toBeInTheDocument();
    expect(screen.getByText('设备总数')).toBeInTheDocument();
    expect(screen.getByText('在线设备')).toBeInTheDocument();
    expect(screen.getByText('当前告警')).toBeInTheDocument();
    expect(screen.getByText('添加设备')).toBeInTheDocument();
    expect(screen.getByText('自动化/保护')).toBeInTheDocument();
    expect(screen.getByText('最近告警')).toBeInTheDocument();
    expect(screen.getByText('池塘水位低')).toBeInTheDocument();
    expect(screen.getByText('网关信号弱')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched zone management page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('区域'));

    expect(screen.getByRole('heading', { name: '区域' })).toBeInTheDocument();
    expect(screen.getByText('当前项目：王先生后院')).toBeInTheDocument();
    expect(screen.getByText('区域管理总览')).toBeInTheDocument();
    expect(screen.getByText('池塘区 (Pond Area)')).toBeInTheDocument();
    expect(screen.getByText('项目实时状态')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched add-device scan page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('添加设备'));

    expect(screen.getByRole('heading', { name: '添加设备' })).toBeInTheDocument();
    expect(screen.getByText('项目：王先生后院')).toBeInTheDocument();
    expect(screen.getByText('将二维码放入框内即可自动扫描')).toBeInTheDocument();
    expect(screen.getByText('蓝牙搜索')).toBeInTheDocument();
    expect(screen.getByText('手动输入')).toBeInTheDocument();
    expect(screen.getByText('HT-SmartHub Pro')).toBeInTheDocument();
    expect(screen.getByText('可绑定')).toBeInTheDocument();
    expect(screen.getByText('下一步：配置通道')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched device management page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('设备'));

    expect(screen.getByRole('heading', { name: '设备' })).toBeInTheDocument();
    expect(screen.getByText('添加设备')).toBeInTheDocument();
    expect(screen.getByText('交付检查进度')).toBeInTheDocument();
    expect(screen.getByText('户外网关')).toBeInTheDocument();
    expect(screen.getByText('低压灯光控制器')).toBeInTheDocument();
    expect(screen.getByText('户外继电器 4CH')).toBeInTheDocument();
    expect(screen.getByText('池塘水位传感器')).toBeInTheDocument();
    expect(screen.getByText('后院灯光控制器')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched project map page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('点位图'));

    expect(screen.getByRole('heading', { name: '点位图' })).toBeInTheDocument();
    expect(screen.getByText('前院路灯')).toBeInTheDocument();
    expect(screen.getByText('预览屋主视图')).toBeInTheDocument();
    expect(screen.getByText('保存点位图')).toBeInTheDocument();
  });

  it('navigates from add-device into the stitched channel configuration page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101/devices/add']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('下一步：配置通道'));

    expect(screen.getByRole('heading', { name: '王先生后院' })).toBeInTheDocument();
    expect(screen.getByText('通道配置')).toBeInTheDocument();
    expect(screen.getByText('池塘循环泵')).toBeInTheDocument();
    expect(screen.getByText('补水阀')).toBeInTheDocument();
    expect(screen.getByText('高风险设备')).toBeInTheDocument();
    expect(screen.getByText('安装区域参考')).toBeInTheDocument();
    expect(screen.getByText('保存配置')).toBeInTheDocument();
    expect(screen.getByText('通道测试')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched plan configuration page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('计划'));

    expect(screen.getByRole('heading', { name: '计划配置' })).toBeInTheDocument();
    expect(screen.getByText('项目：王先生后院')).toBeInTheDocument();
    expect(screen.getByText('推荐模板')).toBeInTheDocument();
    expect(screen.getByText('每日夜景灯光')).toBeInTheDocument();
    expect(screen.getByText('已创建计划')).toBeInTheDocument();
    expect(screen.getByText('后院滴灌')).toBeInTheDocument();
    expect(screen.getByText('节日插座保护')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched scene presets page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('场景'));

    expect(screen.getByRole('heading', { name: '场景预设' })).toBeInTheDocument();
    expect(screen.getByText('项目：王先生后院')).toBeInTheDocument();
    expect(screen.getByText('智能控制中心')).toBeInTheDocument();
    expect(screen.getByText('推荐模板')).toBeInTheDocument();
    expect(screen.getAllByText('夜景模式').length).toBeGreaterThan(0);
    expect(screen.getByText('已创建场景')).toBeInTheDocument();
    expect(screen.getAllByText('聚会模式').length).toBeGreaterThan(0);
    expect(screen.getByText('项目健康度 - 系统状态')).toBeInTheDocument();
  });

  it('navigates from project detail into the stitched automation rules page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('自动化/保护'));

    expect(screen.getByRole('heading', { name: '自动规则' })).toBeInTheDocument();
    expect(screen.getByText('保护与自动化规则')).toBeInTheDocument();
    expect(screen.getByText('缺水停泵')).toBeInTheDocument();
    expect(screen.getByText('自动补水')).toBeInTheDocument();
    expect(screen.getByText('补水超时保护')).toBeInTheDocument();
    expect(screen.getByText('设备最长运行保护')).toBeInTheDocument();
    expect(screen.getByText('雨天跳过灌溉')).toBeInTheDocument();
  });

  it('navigates from channel config into the stitched channel test page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101/channels']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('通道测试'));

    expect(screen.getByRole('heading', { name: '通道测试' })).toBeInTheDocument();
    expect(screen.getByText('测试中离开页面将自动关闭设备')).toBeInTheDocument();
    expect(screen.getByText('NODE_ID: 8842_HV_RLY')).toBeInTheDocument();
    expect(screen.getByText('喷泉泵')).toBeInTheDocument();
    expect(screen.getByText('测试中')).toBeInTheDocument();
    expect(screen.getByText('实时遥测数据')).toBeInTheDocument();
    expect(screen.getByText('保存测试结果')).toBeInTheDocument();
  });

  it('returns to project detail when channel test is opened from project detail quick action', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/projects/p-101']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('通道测试'));
    await user.click(screen.getByLabelText('返回上一页'));

    expect(screen.getByRole('heading', { name: '王先生后院' })).toBeInTheDocument();
    expect(screen.getByText('快捷操作')).toBeInTheDocument();
  });
});
