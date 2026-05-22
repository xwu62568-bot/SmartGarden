import type { PropsWithChildren } from 'react';

type SectionCardProps = PropsWithChildren<{
  title?: string;
}>;

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="section-card">
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </section>
  );
}
