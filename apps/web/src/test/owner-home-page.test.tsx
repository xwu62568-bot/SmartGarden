import { render, screen } from '@testing-library/react';
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
});
