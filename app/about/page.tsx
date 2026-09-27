import { catalogSources, catalogUpdatedAt, models } from "@/lib/models";

export default function AboutPage() {
  const steps = [
    {
      n: "01",
      t: "Name the task",
      d: "Coding, writing, analysis, long documents, creative work, cheap bulk jobs, or general chat.",
    },
    {
      n: "02",
      t: "See three picks",
      d: "Best overall, best value, and cheapest usable. You choose the tradeoff — we don’t hide it.",
    },
    {
      n: "03",
      t: "Check the bill",
      d: "Cost is explained in everyday language: what you send vs what the model writes, plus an example chat in dollars. Open Advanced if you want the per-million-token rates.",
    },
    {
      n: "04",
      t: "Switch with care",
      d: "Changing models mid-thread can drop context. We say Switch or Don’t switch in one line.",
    },
    {
      n: "05",
      t: "Plan Copilot credits",
      d: "Enter your monthly credits and how many you’ve used (leave used empty for 0). We pace what’s left by task: everyday model, harder model, and a cheaper one.",
    },
    {
      n: "06",
      t: "Read the credit tips",
      d: "Separate tabs for Auto, Chat, agents, pasted context, and which model to open — so leftover credits last the month.",
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        How it works
      </p>
      <h1 className="mt-2 text-[clamp(36px,5vw,56px)] font-normal tracking-tight">
        Built so anyone can choose well.
      </h1>
      <p className="mt-4 text-lg text-mute">
        BetterLLMs is a decision helper, not another chat app. It answers three
        questions: which model, how much it costs, and whether switching is worth
        it.
      </p>
      <ol className="mt-10 grid gap-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="rounded-folder bg-white p-5 shadow-card"
          >
            <p className="font-mono text-[11px] text-mute">{s.n}</p>
            <h2 className="mt-1 text-xl tracking-tight">{s.t}</h2>
            <p className="mt-1 text-mute">{s.d}</p>
          </li>
        ))}
      </ol>
      <section className="mt-12 rounded-folder bg-white p-6 shadow-card">
        <h2 className="text-xl tracking-tight">What “$2/M in · $10/M out” means</h2>
        <p className="mt-2 text-mute">
          That shorthand is industry jargon. “In” is reading your message. “Out”
          is writing the answer. “/M” means per million tokens — about a
          1,500-page book of text, not one chat. A typical coding session on
          Claude Sonnet 5 is a few cents, not $2 or $10.
        </p>
      </section>
      <section id="sources" className="mt-12 border-t border-line pt-6">
        <h2 className="text-xl">Catalog sources</h2>
        <p className="mt-2 text-mute">
          {models.filter((model) => model.status === "Current").length} current
          {" "}models across {new Set(models.map((model) => model.provider)).size}
          {" "}providers, plus earlier versions for comparison. This is a curated
          text and coding catalog, not every model or specialized media API.
        </p>
        <p className="mt-2 text-mute">
          Latest additions checked on <time dateTime={catalogUpdatedAt}>{catalogUpdatedAt}</time>.
          {" "}Prices are USD per million tokens at base text rates, not live quotes.
          Previous entries retain historical snapshots. Current means a current
          recommendation, not guaranteed availability in every app or region.
          {" "}Qwen uses international list rates. Cache writes, reasoning, tools,
          and long-context tiers can change the total bill. Speed and task-fit
          descriptions are editorial guidance, not measured benchmarks.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {catalogSources.map((source) => (
            <li key={source.url}>
              <a href={source.url} className="text-accent underline underline-offset-2">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-mute">
          Task picks are editorial suggestions, not benchmark rankings. The Copilot
          planner uses a separate model list; API availability does not confirm
          Copilot availability. Confirm your plan and organization settings.
        </p>
      </section>
      <section className="mt-12 rounded-folder bg-cream p-6">
        <h2 className="text-xl tracking-tight">What we don’t do yet</h2>
        <p className="mt-2 text-mute">
          No accounts, no live price sync, no auto-routing, and no editor
          plugins. Those come later. This MVP is here to make the choice obvious.
        </p>
      </section>
    </main>
  );
}
