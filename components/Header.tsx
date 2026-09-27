import Link from "next/link";
import { CreditsButton } from "@/components/CreditsButton";

const links = [
  { href: "/", label: "Recommend" },
  { href: "/credits", label: "Credits" },
  { href: "/tips", label: "Tips" },
  { href: "/compare", label: "Compare" },
  { href: "/cost", label: "Cost" },
  { href: "/about", label: "How it works" },
];

export function Header() {
  return (
    <>
    <header className="mx-auto flex max-w-[1480px] items-center gap-6 px-5 py-3.5 sm:px-7">
      <Link href="/" className="flex shrink-0 items-baseline gap-2">
        <span className="text-xl font-semibold">betterllms</span>
        <span className="rounded-full border border-line px-1.5 py-px font-mono text-[10px] font-medium text-mute">
          BETA
        </span>
      </Link>
      <nav className="hidden items-center gap-5 text-[12.25px] text-mute md:flex">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-ink">
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <CreditsButton compact />
      </div>
    </header>
    <nav className="flex gap-4 overflow-x-auto px-5 pb-2 text-[12.25px] text-mute md:hidden">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="whitespace-nowrap">
          {l.label}
        </Link>
      ))}
    </nav>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-6xl border-t border-line px-5 py-12 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-sm font-medium">betterllms.com</p>
          <p className="mt-2 max-w-xs text-sm text-mute">
            Pick a model for the job. Spend less. Keep the thread when it matters.
          </p>
        </div>
        <div className="grid gap-1 text-sm text-mute">
          <Link href="/">Recommend</Link>
          <Link href="/credits">Copilot credits</Link>
          <Link href="/tips">Credit tips</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/cost">Cost estimator</Link>
          <Link href="/about">How it works</Link>
        </div>
        <p className="text-sm text-mute">
          Prices are illustrative snapshots for planning, not live API bills.
        </p>
      </div>
    </footer>
  );
}
