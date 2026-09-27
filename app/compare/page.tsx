import { CompareGrid } from "@/components/CompareGrid";

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Model cards
      </p>
      <h1 className="mt-2 text-[clamp(36px,5vw,56px)] font-normal tracking-tight">
        Compare at a glance.
      </h1>
      <p className="mt-3 max-w-xl text-mute">
        Each card names the exact version (Sonnet 4.5 vs 4.6 vs 5), what it’s
        best at, and cost in dollars for a normal coding chat — plus the old
        “$/M in · $/M out” line explained in English.
      </p>
      <div className="mt-10">
        <CompareGrid />
      </div>
    </main>
  );
}
