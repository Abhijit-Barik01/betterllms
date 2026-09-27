"use client";

import { useMemo, useState } from "react";
import { estimateUsd, formatUsd, models, priceInEnglish } from "@/lib/models";

const jobs = [
  { id: "short", label: "Short chat", inTok: 800, outTok: 400 },
  { id: "coding", label: "Coding session", inTok: 8000, outTok: 2500 },
  { id: "doc", label: "Read a long document", inTok: 80000, outTok: 1500 },
];

export function CostEstimator() {
  const [job, setJob] = useState(jobs[1]);
  const [times, setTimes] = useState(20);
  const [advanced, setAdvanced] = useState(false);

  const rows = useMemo(
    () =>
      models
        .filter((model) => model.status === "Current")
        .map((m) => {
          const once = estimateUsd(m, job.inTok, job.outTok);
          return { model: m, once, month: once * times };
        })
        .sort((a, b) => a.month - b.month),
    [job, times]
  );

  const cheapest = rows[0];
  const priciest = rows[rows.length - 1];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {jobs.map((j) => (
          <button
            key={j.id}
            type="button"
            onClick={() => setJob(j)}
            className={`rounded-full border px-3.5 py-1.5 text-sm ${
              job.id === j.id
                ? "border-charcoal bg-charcoal text-white"
                : "border-line bg-white text-mute"
            }`}
          >
            {j.label}
          </button>
        ))}
      </div>
      <label className="mt-6 block max-w-md text-sm text-mute">
        Times you do this in a month
        <input
          type="range"
          min={1}
          max={200}
          value={times}
          onChange={(e) => setTimes(Number(e.target.value))}
          className="mt-2 w-full accent-charcoal"
        />
        <span className="text-ink">{times} times</span>
      </label>

      <p className="mt-8 max-w-2xl text-lg tracking-tight">
        {cheapest.model.name} would be about {formatUsd(cheapest.month)} a month
        for this pattern. {priciest.model.name} would be about{" "}
        {formatUsd(priciest.month)} — roughly{" "}
        {Math.max(2, Math.round(priciest.month / Math.max(cheapest.month, 0.01)))}×
        more.
      </p>

      <p className="mt-3 max-w-2xl text-sm text-mute">
        Current models, base text API rates. Excludes tools, caching, and
        long-context surcharges. Gemini 3.8 Flash rates are promotional through
        December 31, 2026; DeepSeek uses peak, uncached rates. Copilot billing differs.
      </p>
      <div className="mt-6 overflow-x-auto rounded-folder bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line font-mono text-[11px] uppercase tracking-wider text-mute">
            <tr>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">One run</th>
              <th className="px-4 py-3">This month</th>
              <th className="px-4 py-3">Cost level</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.model.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <span className="block">{r.model.name}</span>
                  <span className="text-mute">
                    {r.model.provider} · {r.model.apiId}
                  </span>
                </td>
                <td className="px-4 py-3">{formatUsd(r.once)}</td>
                <td className="px-4 py-3 font-medium">{formatUsd(r.month)}</td>
                <td className="px-4 py-3 text-mute">{r.model.costLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="mt-4 font-mono text-[11px] uppercase tracking-wider text-accent"
        onClick={() => setAdvanced((v) => !v)}
      >
        {advanced ? "Hide token assumptions" : "Advanced"}
      </button>
      {advanced ? (
        <div className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
          <p>
            This row assumes about {job.inTok.toLocaleString()} tokens of text
            you send (your question or file) and {job.outTok.toLocaleString()}{" "}
            tokens in the reply. Live prices differ by vendor and discounts.
          </p>
          <p className="mt-2">{priceInEnglish(cheapest.model).tokens}</p>
        </div>
      ) : null}
    </div>
  );
}
