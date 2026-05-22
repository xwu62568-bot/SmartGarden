type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="top-bar">
      <h1 className="top-bar-title">{title}</h1>
      {subtitle ? <p className="top-bar-subtitle">{subtitle}</p> : null}
    </header>
  );
}
