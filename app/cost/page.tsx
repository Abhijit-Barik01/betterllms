import { CostEstimator } from "@/components/CostEstimator";

export default function CostPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Simple estimator
      </p>
      <h1 className="mt-2 text-[clamp(36px,5vw,56px)] font-normal tracking-tight">
        How much might this cost?
      </h1>
      <p className="mt-3 max-w-xl text-mute">
        Pick a kind of work and how often you do it. We’ll show dollars for a
        normal session — not “$3/M in,” which most people shouldn’t have to
        decode.
      </p>
      <div className="mt-10">
        <CostEstimator />
      </div>
    </main>
  );
}
