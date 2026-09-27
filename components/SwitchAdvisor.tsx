"use client";

import { useMemo, useState } from "react";
import { adviseSwitch, models } from "@/lib/models";

export function SwitchAdvisor({
  defaultFrom,
  defaultTo,
}: {
  defaultFrom: string;
  defaultTo: string;
}) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const advice = useMemo(() => adviseSwitch(from, to), [from, to]);

  return (
    <section className="mt-10 rounded-folder border border-line bg-[#fafafa] p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Context switch
      </p>
      <h2 className="mt-1 text-2xl tracking-tight">Thinking of changing models?</h2>
      <p className="mt-2 max-w-xl text-sm text-mute">
        Switching mid-chat can drop details and change the bill. Pick two models.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-mute">You are on</span>
          <select
            className="mt-1 w-full rounded-btn border border-line bg-white px-3 py-2"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-mute">Switching to</span>
          <select
            className="mt-1 w-full rounded-btn border border-line bg-white px-3 py-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Fact label="Extra cost" value={advice.extraCost} />
        <Fact label="Risk of losing context" value={advice.contextRisk} />
        <Fact
          label="Recommendation"
          value={advice.verdict}
          strong={advice.verdict === "Switch"}
        />
      </div>
      <p className="mt-4 text-[15px] leading-snug">{advice.reason}</p>
    </section>
  );
}

function Fact({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-btn bg-white p-4 shadow-card">
      <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
        {label}
      </p>
      <p className={`mt-1 text-lg tracking-tight ${strong ? "text-navy" : ""}`}>
        {value}
      </p>
    </div>
  );
}
