"use client";

import { useMemo, useState } from "react";
import { ModelCard } from "@/components/ModelCard";
import { SwitchAdvisor } from "@/components/SwitchAdvisor";
import {
  costWords,
  getModel,
  tasks,
  type TaskId,
} from "@/lib/models";
import { PriceExplainer } from "@/components/PriceExplainer";

export function RecommendFlow() {
  const [taskId, setTaskId] = useState<TaskId>("coding");
  const [advanced, setAdvanced] = useState(false);
  const task = tasks.find((t) => t.id === taskId)!;
  const best = getModel(task.best);
  const value = getModel(task.value);
  const cheap = getModel(task.cheap);

  const plainCost = useMemo(() => {
    return [
      costWords(best, value),
      `${cheap.name} is the budget pick when the work is simple.`,
    ];
  }, [best, value, cheap]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {tasks.map((t) => {
          const on = t.id === taskId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTaskId(t.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                on
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-line bg-white text-mute hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-sm text-mute">{task.hint}</p>

      <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-snug tracking-tight text-ink">
        {task.why}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ModelCard model={best} kicker="Best overall" highlight />
        <ModelCard model={value} kicker="Best value" />
        <ModelCard model={cheap} kicker="Cheapest usable" />
      </div>

      <section className="mt-10 rounded-folder bg-white p-6 shadow-card">
        <h2 className="text-2xl tracking-tight">What this means for cost</h2>
        <ul className="mt-3 grid gap-2 text-[15px] text-mute">
          {plainCost.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-mute">
          Rule of thumb: use the cheapest usable model until the answer quality
          starts to cost you time. Then step up one level.
        </p>
        <button
          type="button"
          className="mt-4 font-mono text-[11px] uppercase tracking-wider text-accent"
          onClick={() => setAdvanced((v) => !v)}
        >
          {advanced ? "Hide advanced" : "Advanced"}
        </button>
        {advanced ? (
          <PriceExplainer
            models={[
              ...new Map([best, value, cheap].map((m) => [m.id, m])).values(),
            ]}
          />
        ) : null}
      </section>

      <SwitchAdvisor
        key={`${task.best}-${task.cheap}`}
        defaultFrom={task.best}
        defaultTo={task.cheap}
      />
    </div>
  );
}
