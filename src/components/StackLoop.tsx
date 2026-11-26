import LogoLoop from './reactbits/LogoLoop';

interface StackItem {
  name: string;
  svg: string;
  color: string;
}

// Two rows of brand logos moving in opposite directions.
export default function StackLoop({ items, label }: { items: StackItem[]; label: string }) {
  const logos = items.map((item) => ({
    title: item.name,
    ariaLabel: item.name,
    hoverColor: item.color,
    node: (
      <span
        className="flex items-center gap-2 rounded-xl border border-line bg-canvas/70 px-3 py-2 text-sm font-medium"
        style={{ color: item.color }}
      >
        <span className="size-5 [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: item.svg }} />
        <span className="text-ink">{item.name}</span>
      </span>
    ),
  }));
  const reversed = [...logos].reverse();

  return (
    <div className="flex flex-col gap-3 fit:gap-2">
      <LogoLoop logos={logos} speed={40} direction="left" gap={12} fadeOut fadeOutColor="#111113" ariaLabel={label} pauseOnHover />
      <LogoLoop logos={reversed} speed={40} direction="right" gap={12} fadeOut fadeOutColor="#111113" ariaLabel={label} pauseOnHover />
    </div>
  );
}
