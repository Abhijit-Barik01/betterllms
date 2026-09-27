import Link from "next/link";

export function CreditsButton({
  compact,
  lively,
  onSelect,
}: {
  compact?: boolean;
  lively?: boolean;
  onSelect?: () => void;
}) {
  const className = `group inline-flex h-11 items-center gap-2 rounded-full bg-mint px-4 text-[13.5px] font-medium text-charcoal shadow-card ring-1 ring-charcoal/15 ${lively ? "btn-dance" : ""}`;
  const inner = (
    <>
      <span className="btn-coin grid h-5 w-5 place-items-center rounded-full bg-charcoal font-mono text-[9px] text-mint">
        ¢
      </span>
      {compact ? "Credits" : "Plan Copilot credits"}
      <span className="btn-arrow font-pixel text-[12px] leading-none">→</span>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className={className} onClick={onSelect}>
        {inner}
      </button>
    );
  }

  return (
    <Link href="/credits" className={className}>
      {inner}
    </Link>
  );
}
