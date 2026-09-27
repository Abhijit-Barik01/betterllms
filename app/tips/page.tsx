import { CreditTips } from "@/components/CreditTips";

export default function TipsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Credit tips
      </p>
      <h1 className="mt-2 max-w-3xl text-[clamp(36px,5.4vw,64px)] font-normal leading-[0.98] tracking-[-0.05em]">
        Spend credits on purpose.
      </h1>
      <p className="mt-4 max-w-xl text-[17px] text-mute">
        Separate tabs for Auto, Chat, agents, what you paste, and which model to
        open. Use the planner on Credits to pick models for your leftover this
        month.
      </p>
      <div className="mt-10">
        <CreditTips />
      </div>
    </main>
  );
}
