type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
};

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="eyebrow">{label}</div>
      <div className="hero-title" style={{ fontSize: '24px', marginTop: '8px' }}>
        {value}
      </div>
      <div className="muted-text">{hint}</div>
    </article>
  );
}
