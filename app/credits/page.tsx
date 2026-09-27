import { CreditPlanner } from "@/components/CreditPlanner";

export default function CreditsPage() {
  return (
    <main className="credits-page mx-auto max-w-6xl px-5 pb-24 pt-12">
      <div
        className="credits-orb -left-16 top-10 h-48 w-48 bg-mint/70"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="credits-orb right-[-4rem] top-40 h-56 w-56 bg-[#e4ecfd]"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="credits-orb bottom-20 left-1/3 h-32 w-32 bg-cream"
        style={{ animationDelay: "2.2s" }}
      />

      <div
        className="credits-rise relative"
        style={{ animationDelay: "0.05s" }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          Copilot credits
        </p>
        <h1 className="mt-2 max-w-3xl text-[clamp(36px,5.4vw,64px)] font-normal leading-[0.98] tracking-[-0.05em]">
          Make every credit
          <span className="font-pixel"> count.</span>
        </h1>
        <p className="mt-4 max-w-xl text-[17px] text-mute">
          Type your monthly Copilot credits. We’ll match a model to the job —
          everyday, harder, and cheaper — so you don’t run out before the month
          resets.
        </p>
        <p className="mt-3 max-w-xl text-sm text-mute">
          1 credit ≈ one cent of model use. Typing suggestions are cheap. Chat
          and agents use most of your monthly credits.
        </p>
      </div>

      <div className="credits-rise relative mt-10" style={{ animationDelay: "0.12s" }}>
        <CreditPlanner />
      </div>
    </main>
  );
}
