import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

const exactTextContent = (text: string) => (_content: string, element: Element | null) =>
  element?.textContent === text;

describe('owner water device detail page', () => {
  it('navigates from the owner device card into the stitched water detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/devices']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('tab', { name: /水景/ }));
    await user.click(screen.getByRole('link', { name: '查看喷泉泵详情' }));

    expect(screen.getByRole('heading', { name: '喷泉泵' })).toBeInTheDocument();
    expect(screen.getByText('电源控制')).toBeInTheDocument();
    expect(screen.getByText('停止水泵')).toBeInTheDocument();
  });

  it('renders the stitched water-detail layout and controls', () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/devices/fountain-pump']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '喷泉泵' })).toBeInTheDocument();
    expect(screen.getByText('在线')).toBeInTheDocument();
    expect(screen.getByText('运行中')).toBeInTheDocument();
    expect(screen.getByText(exactTextContent('今日运行：3h 20m'))).toBeInTheDocument();
    expect(screen.getByText(exactTextContent('水位状态：正常'))).toBeInTheDocument();
    expect(screen.getByText('保护已开启')).toBeInTheDocument();
    expect(screen.getByText('电源控制')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '停止水泵' })).toBeInTheDocument();
    expect(screen.getByText('30分钟')).toBeInTheDocument();
    expect(screen.getByText('1小时')).toBeInTheDocument();
    expect(screen.getByText('自定义')).toBeInTheDocument();
    expect(screen.getByText('干烧保护')).toBeInTheDocument();
    expect(screen.getByText('自动补水')).toBeInTheDocument();
    expect(screen.getByText('最大运行时长')).toBeInTheDocument();
    expect(screen.getByText('08:00 - 22:00 运行计划')).toBeInTheDocument();
    expect(screen.getByText('运行')).toBeInTheDocument();
    expect(screen.getByText('日志')).toBeInTheDocument();
    expect(screen.getByText('告警')).toBeInTheDocument();
    expect(screen.getByText('历史')).toBeInTheDocument();
    expect(screen.getByText('设备预览')).toBeInTheDocument();
    expect(screen.getByText('主庭院水景')).toBeInTheDocument();
  });
});
