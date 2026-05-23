import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('owner irrigation plan detail page', () => {
  it('navigates from the owner plan card into the stitched irrigation plan detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /早晨浇水/ }));

    expect(screen.getByRole('heading', { level: 1, name: '早晨浇水' })).toBeInTheDocument();
    expect(screen.getByText('雨天跳过')).toBeInTheDocument();
    expect(screen.getByText('立即执行一次')).toBeInTheDocument();
  });

  it('renders the stitched irrigation plan detail sections', () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/plans/morning-irrigation']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('开始时间')).toBeInTheDocument();
    expect(screen.getByText('06:30')).toBeInTheDocument();
    expect(screen.getByText('周一、周三、周五')).toBeInTheDocument();
    expect(screen.getByText('周三 06:30')).toBeInTheDocument();
    expect(screen.getByText('露台盆栽')).toBeInTheDocument();
    expect(screen.getByText('暂停 24 小时')).toBeInTheDocument();
    expect(screen.getByText('复制')).toBeInTheDocument();
    expect(screen.getByText('周一 06:30 因降雨跳过')).toBeInTheDocument();
  });
});
