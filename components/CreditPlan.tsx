"use client";

import { useMemo, useState } from "react";
import {
  bestMix,
  creditMath,
  defaultCredits,
  type CreditSnapshot,
} from "@/lib/credits";

export function CreditPlan({ snapshot = defaultCredits }: { snapshot?: CreditSnapshot }) {
  const [used, setUsed] = useState(snapshot.used);
  const live: CreditSnapshot = { ...snapshot, used };
  const math = useMemo(() => creditMath(live), [live]);
  const plan = useMemo(() => bestMix(live), [live]);
  const pct = Math.min(100, math.pct);

  return (
    <section className="overflow-hidden rounded-[22px] bg-gradient-to-br from-[#16324f] via-[#1c4d63] to-[#1f6f64] p-px shadow-float">
      <div className="rounded-[21px] bg-[#0f2433] px-5 py-6 text-white sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9ad4c8]">
              Credits · {snapshot.product}
            </p>
            <h2 className="mt-1 text-[clamp(26px,4vw,36px)] font-normal tracking-tight">
              {plan.name}
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/75">
              {plan.headline}
            </p>
          </div>
          <div className="relative grid h-[120px] w-[120px] place-items-center">
            <svg viewBox="0 0 120 120" className="-rotate-90 h-[120px] w-[120px]">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#1c3d4e" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#creditArc)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 314} 314`}
              />
              <defs>
                <linearGradient id="creditArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7fe59a" />
                  <stop offset="100%" stopColor="#e9c46a" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <p className="text-2xl tracking-tight">{pct.toFixed(0)}%</p>
              <p className="font-mono text-[10px] uppercase text-white/50">used</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Used" value={live.used.toLocaleString()} />
          <Stat label="Remaining" value={math.remaining.toLocaleString()} />
          <Stat label="Resets" value={snapshot.resetLabel} />
        </div>

        <label className="mt-6 block text-sm text-white/60">
          Drag if your used credits change
          <input
            type="range"
            min={0}
            max={snapshot.total}
            value={used}
            onChange={(e) => setUsed(Number(e.target.value))}
            className="mt-2 w-full accent-[#7fe59a]"
          />
          <span className="font-mono text-xs text-white/45">
            {used.toLocaleString()} / {snapshot.total.toLocaleString()}
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip on>Ghost text</Chip>
          <Chip on>Next edit</Chip>
          <Chip>Eagerness · Auto</Chip>
          <Chip warn>Semantic index off</Chip>
          <Chip warn>External ingest blocked</Chip>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white/5">
          <div className="flex h-3 w-full">
            {plan.rows.map((r) => (
              <div
                key={r.title}
                style={{ width: `${r.share * 100}%`, background: r.color }}
              />
            ))}
          </div>
          <div className="grid gap-4 p-4 md:grid-cols-3">
            {plan.rows.map((r) => (
              <div key={r.title}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                  {Math.round(r.share * 100)}% · {r.credits.toLocaleString()} credits
                </p>
                <p className="mt-1 text-lg tracking-tight">{r.title}</p>
                <p className="text-sm text-[#9ad4c8]">{r.model}</p>
                <p className="mt-2 text-sm text-white/65">{r.why}</p>
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-6 grid gap-2 text-sm text-white/70">
          {plan.tips.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e9c46a]" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
        {label}
      </p>
      <p className="mt-1 text-xl tracking-tight">{value}</p>
    </div>
  );
}

function Chip({
  children,
  on,
  warn,
}: {
  children: string;
  on?: boolean;
  warn?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-mono text-[11px] ${
        warn
          ? "bg-[#e07a5f]/20 text-[#ffc4b0]"
          : on
            ? "bg-[#7fe59a]/20 text-[#b8f5c9]"
            : "bg-white/10 text-white/70"
      }`}
    >
      {children}
    </span>
  );
}
