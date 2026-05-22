type StatusChipTone = 'success' | 'warning' | 'danger';

type StatusChipProps = {
  tone: StatusChipTone;
  children: string;
};

export function StatusChip({ tone, children }: StatusChipProps) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}
