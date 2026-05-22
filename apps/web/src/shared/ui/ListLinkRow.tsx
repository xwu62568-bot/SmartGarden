import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type ListLinkRowProps = {
  to: string;
  title: string;
  meta: string;
  trailing?: ReactNode;
};

export function ListLinkRow({ to, title, meta, trailing }: ListLinkRowProps) {
  return (
    <Link to={to} className="list-row">
      <div className="list-row-copy">
        <span className="list-row-title">{title}</span>
        <span className="list-row-meta">{meta}</span>
      </div>
      {trailing ?? <span className="detail-link">查看</span>}
    </Link>
  );
}
