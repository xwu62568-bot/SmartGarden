import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('owner plan type selection page', () => {
  it('navigates from the plans page create entry into the stitched selection page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: '创建计划' }));

    expect(screen.getByRole('heading', { name: '创建计划' })).toBeInTheDocument();
    expect(screen.getByText('选择你想自动执行的计划类型')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /灯光计划/ })).toBeInTheDocument();
  });

  it('updates the selected plan type when a non-navigation card is clicked', async () => {
    render(
      <MemoryRouter
        initialEntries={['/owner/plans/create']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /基础灌溉计划/ })).toBeInTheDocument();
    expect(screen.getByText('设置花坛、盆栽、滴灌分区的浇水时间')).toBeInTheDocument();
  });

  it('opens the stitched light plan creation page from the light card', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans/create']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /灯光计划/ }));

    expect(screen.getByRole('heading', { name: '创建灯光计划' })).toBeInTheDocument();
    expect(screen.getByLabelText('计划名称')).toHaveValue('每日夜景灯光');
    expect(screen.getByRole('tab', { name: '日落后' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('执行设备（4）')).toBeInTheDocument();
    expect(screen.getByText('露台灯带')).toBeInTheDocument();
    expect(screen.getByText(/每天日落后 15 分钟开启/)).toBeInTheDocument();
  });

  it('opens the stitched water plan creation page from the water card', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans/create']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /水景 \/ 喷泉计划/ }));

    expect(screen.getByRole('heading', { name: '创建水景计划' })).toBeInTheDocument();
    expect(screen.getByLabelText('计划名称')).toHaveValue('白天喷泉');
    expect(screen.getByRole('tab', { name: '每天' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('安全保护状态')).toBeInTheDocument();
    expect(screen.getByText('喷泉泵')).toBeInTheDocument();
    expect(screen.getByText('预估计划效果')).toBeInTheDocument();
  });

  it('opens the stitched outdoor device plan creation page from the device card', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/owner/plans/create']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /户外设备计划/ }));

    expect(screen.getByRole('heading', { name: '创建户外设备计划' })).toBeInTheDocument();
    expect(screen.getByLabelText('计划名称')).toHaveValue('节日灯定时');
    expect(screen.getByText('执行设备')).toBeInTheDocument();
    expect(screen.getByText('节日灯')).toBeInTheDocument();
    expect(screen.getByText('安全保护（防忘关）')).toBeInTheDocument();
  });
});
