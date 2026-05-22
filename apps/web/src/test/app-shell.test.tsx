import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

function renderApp(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <App />
    </MemoryRouter>,
  );
}

describe('app shell', () => {
  it('shows the role selection entry page', () => {
    renderApp();

    expect(screen.getByText('HyecoSmart')).toBeInTheDocument();
    expect(screen.getByText('请选择你的用户类型')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /我是屋主/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /我是安装商/ })).toBeInTheDocument();
  });

  it('shows owner tab navigation', () => {
    renderApp(['/owner/home']);

    expect(screen.getByRole('tab', { name: /首页/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /地景/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /设备/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /计划/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /我的/ })).toBeInTheDocument();
  });

  it('switches from role selection into installer shell', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: /我是安装商/ }));

    expect(screen.getByRole('tab', { name: /工作台/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /项目/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /告警/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /客户/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /我的/ })).toBeInTheDocument();
  });
});
