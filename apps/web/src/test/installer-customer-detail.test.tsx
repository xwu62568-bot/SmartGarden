import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('installer customer detail page', () => {
  it('navigates from the installer customers list into the stitched customer detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={['/installer/customers']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('王先生'));

    expect(screen.getByRole('heading', { name: '王先生' })).toBeInTheDocument();
    expect(screen.getByText('快捷操作')).toBeInTheDocument();
    expect(screen.getByText('项目')).toBeInTheDocument();
  });

  it('renders the stitched installer customer detail sections', () => {
    render(
      <MemoryRouter
        initialEntries={['/installer/customers/c-88']}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('安装商门户')).toBeInTheDocument();
    expect(screen.getByText('已授权')).toBeInTheDocument();
    expect(screen.getByText('+86 138 0013 8000')).toBeInTheDocument();
    expect(screen.getByText('mr.wang@example.com')).toBeInTheDocument();
    expect(screen.getByText('发送邀请')).toBeInTheDocument();
    expect(screen.getByText('查看维护记录')).toBeInTheDocument();
    expect(screen.getByText('2 活跃')).toBeInTheDocument();
    expect(screen.getByText('王先生后院')).toBeInTheDocument();
    expect(screen.getByText('HW-8829A')).toBeInTheDocument();
  });
});
