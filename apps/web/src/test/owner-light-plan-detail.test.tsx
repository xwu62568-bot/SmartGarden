import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('owner light plan detail page', () => {
  it('navigates from the owner plan card into the stitched light plan detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /每日夜景灯光/ }));

    expect(screen.getByRole('heading', { name: '每日夜景灯光' })).toBeInTheDocument();
    expect(screen.getByText('计划摘要')).toBeInTheDocument();
    expect(screen.getByText('立即执行一次')).toBeInTheDocument();
  });

  it('renders the stitched light plan detail sections', () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/plans/daily-lighting']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '每日夜景灯光' })).toBeInTheDocument();
    expect(screen.getByText('屋主创建')).toBeInTheDocument();
    expect(screen.getByText('下次运行：今天 18:42')).toBeInTheDocument();
    expect(screen.getByText('执行设备')).toBeInTheDocument();
    expect(screen.getByText('3 个设备')).toBeInTheDocument();
    expect(screen.getByText('后院景观灯')).toBeInTheDocument();
    expect(screen.getByText('暂停今天')).toBeInTheDocument();
    expect(screen.getByText('编辑计划')).toBeInTheDocument();
    expect(screen.getByText('今天 18:42')).toBeInTheDocument();
  });
});
