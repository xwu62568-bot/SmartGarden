import type { PropsWithChildren, ReactNode } from 'react';

type AppFrameProps = PropsWithChildren<{
  header: ReactNode;
  contentClassName?: string;
  tabBar?: ReactNode;
}>;

export function AppFrame({ header, children, contentClassName, tabBar }: AppFrameProps) {
  return (
    <div className="app-shell">
      <div className="phone-frame">
        {header}
        <main className={contentClassName ?? 'page-scroll'}>{children}</main>
        {tabBar}
      </div>
    </div>
  );
}
