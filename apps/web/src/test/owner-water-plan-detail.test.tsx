import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('owner water plan detail page', () => {
  it('navigates from the owner plan card into the stitched water plan detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /白天喷泉/ }));

    expect(screen.getByRole('heading', { name: '白天喷泉' })).toBeInTheDocument();
    expect(screen.getByText('安全防护')).toBeInTheDocument();
    expect(screen.getByText('立即开启 30 分钟')).toBeInTheDocument();
  });

  it('renders the stitched water plan detail sections', () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/plans/day-fountain']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '白天喷泉' })).toBeInTheDocument();
    expect(screen.getByText('执行周期')).toBeInTheDocument();
    expect(screen.getByText('安装商预设')).toBeInTheDocument();
    expect(screen.getByText('最大运行保护')).toBeInTheDocument();
    expect(screen.getByText('瀑布泵')).toBeInTheDocument();
    expect(screen.getByText('已关闭')).toBeInTheDocument();
    expect(screen.getByText('编辑计划')).toBeInTheDocument();
    expect(screen.getByText('PROTECTED')).toBeInTheDocument();
  });
});
