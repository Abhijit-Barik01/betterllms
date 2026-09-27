"use client";

import { useState } from "react";
import { tipsUpdatedAt, tipSources, tipTabs, type TipTabId } from "@/lib/credit-tips";

export function CreditTips() {
  const [tab, setTab] = useState<TipTabId>("auto");
  const i = tipTabs.findIndex((t) => t.id === tab);
  const current = tipTabs[i];

  return (
    <div>
      <p className="mb-4 text-center font-mono text-[11px] text-mute">
        Reviewed <time dateTime={tipsUpdatedAt}>{tipsUpdatedAt}</time>
      </p>
      <div
        className="relative mx-auto mb-10 grid max-w-2xl grid-cols-5 rounded-full border border-line bg-white/80 p-1 shadow-card backdrop-blur"
        role="tablist"
        aria-label="Credit-saving tips"
      >
        <span
          className="tab-thumb pointer-events-none absolute bottom-1 top-1 rounded-full bg-charcoal"
          style={{
            width: "calc(20% - 6px)",
            left: `calc(${i * 20}% + 4px)`,
          }}
        />
        {tipTabs.map((t) => (
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

      <div key={tab} className="tab-panel mx-auto max-w-3xl">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          {current.kicker}
        </p>
        <h3 className="mt-2 text-center text-[clamp(26px,3.6vw,36px)] font-normal tracking-tight">
          {current.heading}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-mute">
          {current.intro}
        </p>

        <ol className="mt-8 grid gap-3">
          {current.tips.map((tip, n) => (
            <li
              key={tip.title}
              className="rounded-[18px] border border-line bg-white/85 p-5 shadow-card"
            >
              <p className="font-mono text-[11px] text-mute">
                {String(n + 1).padStart(2, "0")}
              </p>
              <h4 className="mt-1 text-lg tracking-tight">{tip.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{tip.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-sm text-mute">
          Based on official GitHub and provider documentation. API rates,
          Copilot availability, promotions, and plan billing can differ.
        </p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-[12px] text-mute">
          {tipSources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="underline decoration-line underline-offset-4 hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
