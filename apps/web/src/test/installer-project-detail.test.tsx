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
});
