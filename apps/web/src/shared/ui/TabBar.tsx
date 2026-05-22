import { NavLink } from 'react-router-dom';
import type { TabItem } from '../types/app';

type TabBarProps = {
  items: TabItem[];
};

export function TabBar({ items }: TabBarProps) {
  return (
    <nav className="tab-bar" aria-label="主导航">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          role="tab"
          className={({ isActive }) => `tab-link${isActive ? ' active' : ''}`}
        >
          {item.icon ? <span className="material-symbols-outlined tab-icon">{item.icon}</span> : null}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
