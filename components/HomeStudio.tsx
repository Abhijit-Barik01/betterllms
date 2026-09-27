"use client";

import { useState } from "react";
import { CompareGrid } from "@/components/CompareGrid";
import { CostEstimator } from "@/components/CostEstimator";
import { CreditPlanner } from "@/components/CreditPlanner";
import { CreditTips } from "@/components/CreditTips";
import { CreditsButton } from "@/components/CreditsButton";
import { RecommendFlow } from "@/components/RecommendFlow";

const tabs = [
  { id: "pick", label: "Pick model" },
  { id: "credits", label: "Credits" },
  { id: "tips", label: "Tips" },
  { id: "compare", label: "Compare" },
  { id: "cost", label: "Cost" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function HomeStudio() {
  const [tab, setTab] = useState<TabId>("pick");
  const i = tabs.findIndex((t) => t.id === tab);

  return (
    <>
      <section className="home-hero relative overflow-hidden px-5 pb-12 pt-6 sm:pt-8">
        <div className="home-grid" />
        <div className="home-glow" />

        <article className="home-float artifact-card -left-4 top-10 hidden w-52 -rotate-6 lg:block">
          <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Reading note
          </p>
          <h2 className="mt-1 text-base font-medium tracking-tight">
            Don’t pay for a genius to summarize a spreadsheet.
          </h2>
          <p className="mt-2 text-sm text-mute">
            Match the model to the job. Save the expensive one for hard thinking.
          </p>
        </article>
        <article className="home-float-rev artifact-card -right-2 bottom-6 hidden w-56 rotate-3 lg:block">
          <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Cost check
          </p>
          <h2 className="mt-1 text-base font-medium tracking-tight">
            Same answer, 12× cheaper.
          </h2>
          <p className="mt-2 text-sm text-mute">
            High-volume chores rarely need a flagship model.
          </p>
        </article>

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-[44px] font-normal leading-none tracking-normal sm:text-[72px]">
            Better<span className="home-pixel font-pixel">LLMs</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[17px] text-mute">
            The right model for your work. More capable answers, less wasted spend.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setTab("pick");
                document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-bounce inline-flex h-11 items-center rounded-full bg-[#2c2c2c] px-4 text-[15px] font-medium text-white shadow-card"
            >
              Start with a task <span className="btn-arrow ml-1">→</span>
            </button>
            <CreditsButton
              lively
              onSelect={() => {
                setTab("credits");
                document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </section>

      <section id="studio" className="relative mx-auto max-w-6xl px-5 pb-24">
        <div className="mx-auto mb-10 max-w-3xl">
          <div
            className="relative grid grid-cols-5 rounded-full border border-line bg-white/80 p-1 shadow-card backdrop-blur"
            role="tablist"
            aria-label="Home tools"
          >
            <span
              className="tab-thumb pointer-events-none absolute bottom-1 top-1 rounded-full bg-charcoal"
              style={{
                width: "calc(20% - 6px)",
                left: `calc(${i * 20}% + 4px)`,
              }}
            />
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative z-10 truncate rounded-full px-1 py-2 text-center text-[12px] font-medium transition-colors sm:text-[13px] ${
                  tab === t.id ? "text-white" : "text-mute hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div key={tab} className="tab-panel">
          {tab === "pick" && (
            <>
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                Task first
              </p>
              <h2 className="mb-8 mt-2 text-center text-[clamp(28px,4vw,42px)] font-normal tracking-tight">
                What are you trying to do?
              </h2>
              <RecommendFlow />
            </>
          )}
          {tab === "credits" && (
            <>
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                Copilot credits
              </p>
              <h2 className="mb-8 mt-2 text-center text-[clamp(28px,4vw,42px)] font-normal tracking-tight">
                Make every credit count.
              </h2>
              <CreditPlanner />
            </>
          )}
          {tab === "tips" && (
            <>
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                How to spend
              </p>
              <h2 className="mb-8 mt-2 text-center text-[clamp(28px,4vw,42px)] font-normal tracking-tight">
                Spend credits on purpose.
              </h2>
              <CreditTips />
            </>
          )}
          {tab === "compare" && (
            <>
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                Versions
              </p>
              <h2 className="mb-8 mt-2 text-center text-[clamp(28px,4vw,42px)] font-normal tracking-tight">
                Compare at a glance.
              </h2>
              <CompareGrid />
            </>
          )}
          {tab === "cost" && (
            <>
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                Estimator
              </p>
              <h2 className="mb-8 mt-2 text-center text-[clamp(28px,4vw,42px)] font-normal tracking-tight">
                How much might this cost?
              </h2>
              <CostEstimator />
            </>
          )}
        </div>
      </section>
    </>
  );
}
