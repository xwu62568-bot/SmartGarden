import { render, screen } from '@testing-library/react';
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
    expect(screen.getByRole('tab', { name: /地景/ })).toBeInTheDocument();
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

    expect(screen.getByText('设备控制')).toBeInTheDocument();
    expect(screen.getByText('全部设备')).toBeInTheDocument();
    expect(screen.getByText('关键设备')).toBeInTheDocument();
    expect(screen.getByText('设备总览')).toBeInTheDocument();
    expect(screen.getByText('12 台在线')).toBeInTheDocument();
    expect(screen.getByText('维护关注')).toBeInTheDocument();
    expect(screen.getByText('分区设备')).toBeInTheDocument();
  });

  it('shows owner plans dashboard and creation entry', () => {
    renderRoute('/owner/plans');

    expect(screen.getByText('计划与自动化')).toBeInTheDocument();
    expect(screen.getByText('本周节奏')).toBeInTheDocument();
    expect(screen.getByText('推荐模板')).toBeInTheDocument();
    expect(screen.getByText('计划中心')).toBeInTheDocument();
    expect(screen.getByText('创建新计划')).toBeInTheDocument();
    expect(screen.getByText('计划类型')).toBeInTheDocument();
    expect(screen.getByText('19:30 夜间水景')).toBeInTheDocument();
  });

  it('shows installer workbench operations summary', () => {
    renderRoute('/installer/workbench');

    expect(screen.getByText('待处理工单')).toBeInTheDocument();
    expect(screen.getByText('今日现场安排')).toBeInTheDocument();
    expect(screen.getByText('09:30 桃源别墅灌溉升级')).toBeInTheDocument();
  });

  it('shows owner profile account and service settings', () => {
    renderRoute('/owner/profile');

    expect(screen.getByText('家庭与服务')).toBeInTheDocument();
    expect(screen.getByText('快捷操作')).toBeInTheDocument();
    expect(screen.getByText('服务历程')).toBeInTheDocument();
    expect(screen.getByText('林先生家庭账户')).toBeInTheDocument();
    expect(screen.getByText('园艺助手')).toBeInTheDocument();
    expect(screen.getByText('设备分享')).toBeInTheDocument();
    expect(screen.getByText('通知偏好')).toBeInTheDocument();
    expect(screen.getByText('华东花园智控')).toBeInTheDocument();
  });

  it('shows installer profile team and tool settings', () => {
    renderRoute('/installer/profile');

    expect(screen.getByText('华东交付团队')).toBeInTheDocument();
    expect(screen.getByText('巡检工具')).toBeInTheDocument();
    expect(screen.getByText('值班与升级')).toBeInTheDocument();
  });
});
