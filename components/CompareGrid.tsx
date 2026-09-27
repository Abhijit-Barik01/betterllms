"use client";

import { useMemo, useState } from "react";
import { ModelCard } from "@/components/ModelCard";
import { families, models, type CostLevel, type Speed } from "@/lib/models";

export function CompareGrid() {
  const [cost, setCost] = useState<CostLevel | "Any">("Any");
  const [speed, setSpeed] = useState<Speed | "Any">("Any");
  const [family, setFamily] = useState("Any");
  const [showPrevious, setShowPrevious] = useState(false);
  const filtered = useMemo(
    () =>
      models.filter(
        (m) =>
          (showPrevious || m.status === "Current") &&
          (cost === "Any" || m.costLevel === cost) &&
          (speed === "Any" || m.speed === speed) &&
          (family === "Any" || m.family === family)
      ),
    [cost, speed, family, showPrevious]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Filter
          label="Family"
          value={family}
          onChange={setFamily}
          options={["Any", ...families]}
        />
        <Filter
          label="Cost"
          value={cost}
          onChange={(v) => setCost(v as CostLevel | "Any")}
          options={["Any", "Low", "Medium", "High"]}
        />
        <Filter
          label="Speed"
          value={speed}
          onChange={(v) => setSpeed(v as Speed | "Any")}
          options={["Any", "Fast", "Medium", "Slow"]}
        />
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-mute">
        <input
          type="checkbox"
          checked={showPrevious}
          onChange={(event) => setShowPrevious(event.target.checked)}
          className="accent-charcoal"
        />
        Include previous models
      </label>
      <p className="mt-3 max-w-2xl text-sm text-mute">
        API pricing snapshots, not Copilot availability. Previous models retain
        historical rates. Gemini 3.8 Flash promotional rates end December 31,
        2026; DeepSeek rates shown are peak, uncached prices.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <ModelCard key={m.id} model={m} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 text-mute">No models match those filters.</p>
      ) : null}
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="text-sm text-mute">
      {label}
      <select
        className="ml-2 rounded-btn border border-line bg-white px-3 py-2 text-ink"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
