import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('owner home page', () => {
  it('renders the stitched dashboard sections for the owner landing page', () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/home']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('我的后院')).toBeInTheDocument();
    expect(screen.getByText('池塘水位低，请检查')).toBeInTheDocument();
    expect(screen.getByText('快速场景')).toBeInTheDocument();
    expect(screen.getByText('常用设备')).toBeInTheDocument();
    expect(screen.getByText('今日计划')).toBeInTheDocument();
  });

  it('navigates from home quick scenes and common devices into existing detail pages', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/home']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: '查看夜景模式' }));

    expect(screen.getByText('日落后自动开启前院与后院景观灯光，营造温馨庭院氛围。')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: '返回首页' }));
    expect(screen.getByText('快速场景')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: '查看前院路径灯详情' }));

    expect(screen.getByText('色温控制')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: '返回首页' }));
    expect(screen.getByText('常用设备')).toBeInTheDocument();
  });
});
