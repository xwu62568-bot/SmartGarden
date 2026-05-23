import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('owner light device detail page', () => {
  it('navigates from the owner device card into the stitched light detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/devices']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: '查看前院路径灯详情' }));

    expect(screen.getByRole('heading', { name: '前院路径灯' })).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('色温控制')).toBeInTheDocument();
  });

  it('renders the stitched light-detail controls and sections', () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/devices/front-path-light']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '前院路径灯' })).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('亮度')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
    expect(screen.getByText('色温控制')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '暖白' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('RGB 色彩')).toBeInTheDocument();
    expect(screen.getByText('所属区域')).toBeInTheDocument();
    expect(screen.getByText('当前计划')).toBeInTheDocument();
    expect(screen.getByText('所属场景')).toBeInTheDocument();
    expect(screen.getByText('倒计时关闭')).toBeInTheDocument();
    expect(screen.getByText('设置计划')).toBeInTheDocument();
    expect(screen.getByText('查看实时花园监控')).toBeInTheDocument();
    expect(screen.getByText('当前能见度: 良好')).toBeInTheDocument();
  });
});
