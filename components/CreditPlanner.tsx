"use client";

import { useMemo, useState } from "react";
import {
  buildCreditPlan,
  copilotUpdatedAt,
  DEFAULT_CYCLE_DAYS,
  formatCredits,
  parseCreditsInput,
  parseDaysInput,
  type Pace,
} from "@/lib/credits";
import { tasks, type TaskId } from "@/lib/models";

const paceLook: Record<Pace, { className: string; label: string }> = {
  Comfortable: { className: "bg-mint/50 text-charcoal", label: "Plenty left" },
  "On track": { className: "bg-[#e4ecfd] text-[#1d4f9a]", label: "On track" },
  "Front-loaded": { className: "bg-cream text-charcoal", label: "Used early" },
  Tight: { className: "bg-cream text-charcoal", label: "Slow down" },
  "Over budget": { className: "bg-[#f4e4e4] text-[#7a3030]", label: "Out of credits" },
  "Sprint leftover": { className: "bg-mint/50 text-charcoal", label: "Use them soon" },
};

export function CreditPlanner() {
  const [monthly, setMonthly] = useState("");
  const [used, setUsed] = useState("");
  const [days, setDays] = useState(String(DEFAULT_CYCLE_DAYS));
  const [taskId, setTaskId] = useState<TaskId>("coding");
  const [showHow, setShowHow] = useState(false);

  const plan = useMemo(() => {
    const m = parseCreditsInput(monthly);
    if (m <= 0) return null;
    return buildCreditPlan({
      monthly: m,
      used: parseCreditsInput(used),
      taskId,
      daysLeft: parseDaysInput(days),
    });
  }, [monthly, used, days, taskId]);

  return (
    <div>
      <p className="mx-auto mb-6 max-w-3xl text-center text-sm text-mute">
        Copilot model snapshot: <time dateTime={copilotUpdatedAt}>{copilotUpdatedAt}</time>.
        {" "}Access depends on plan, client, and organization policy. Fit scores are
        editorial estimates, not benchmarks. Costs use base text rates without
        cache reads/writes, Auto discounts, tools, or long-context surcharges.
        Legacy request-based annual plans use different billing.
      </p>
      <form
        className="relative grid gap-5 overflow-hidden rounded-[22px] border border-line bg-white/80 p-6 shadow-float backdrop-blur-sm sm:grid-cols-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field
          label="Monthly credits"
          hint="The big number in Copilot, like 6,000 or 39,500."
          placeholder="6000"
          value={monthly}
          onChange={setMonthly}
        />
        <Field
          label="Already used"
          hint="Leave empty if you haven’t used any yet."
          placeholder="0"
          value={used}
          onChange={setUsed}
        />
        <Field
          label="Days left this month"
          hint="Starts at 30. Clear it and type a new number."
          placeholder="30"
          value={days}
          onChange={setDays}
        />
      </form>

      <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        What are you working on?
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {tasks.map((t) => {
          const on = t.id === taskId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTaskId(t.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition duration-200 ${
                on
                  ? "scale-[1.03] border-charcoal bg-charcoal text-white shadow-card"
                  : "border-line bg-white/80 text-mute hover:-translate-y-0.5 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {!plan ? (
        <p className="mt-12 text-center text-mute">
          Add your monthly credits above to see a simple plan.
        </p>
      ) : (
        <div className="mt-10 grid gap-6">
          <section
            className="credits-rise grid items-center gap-8 overflow-hidden rounded-[22px] bg-charcoal px-6 py-8 text-white shadow-float md:grid-cols-[auto_1fr]"
            style={{ animationDelay: "0.08s" }}
          >
            <CreditRing pct={plan.pctUsed} remaining={plan.remaining} />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  This month
                </p>
                <span
                  className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase ${paceLook[plan.pace].className}`}
                >
                  {paceLook[plan.pace].label}
                </span>
              </div>
              <p className="mt-2 text-3xl tracking-tight md:text-4xl">
                {plan.used.toLocaleString()}
                <span className="text-white/40"> / {plan.monthly.toLocaleString()}</span>
              </p>
              <p className="mt-2 text-sm text-white/65">
                {formatCredits(plan.remaining)} still available · {plan.daysLeft} day
                {plan.daysLeft === 1 ? "" : "s"} left
                {plan.overage > 0
                  ? ` · ${plan.overage.toLocaleString()} extra used`
                  : ""}
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-snug text-white/90">
                {plan.paceNote}
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <Stat k="Used" v={`${plan.pctUsed.toFixed(0)}%`} />
                <Stat k="Per day" v={formatCredits(plan.dailyBudget)} />
                <Stat k="Task" v={plan.taskLabel} />
              </dl>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <PlanCard
              delay="0.12s"
              kicker="Use most days"
              title={plan.daily.model.name}
              body={plan.daily.role}
              note={plan.daily.why}
              featured
            />
            <PlanCard
              delay="0.2s"
              kicker="When you’re stuck"
              title={plan.hard.model.name}
              body={plan.hard.role}
              note={plan.hard.why}
            />
            <PlanCard
              delay="0.28s"
              kicker="Small questions"
              title={plan.bulk.model.name}
              body={plan.bulk.role}
              note={plan.bulk.why}
            />
          </section>

          <section
            className="credits-rise overflow-hidden rounded-[22px] bg-white shadow-card"
            style={{ animationDelay: "0.32s" }}
          >
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line font-mono text-[11px] uppercase tracking-wider text-mute">
                <tr>
                  <th className="px-4 py-3">For {plan.taskLabel.toLowerCase()}</th>
                  <th className="px-4 py-3">Fit</th>
                  <th className="px-4 py-3">Credits each time</th>
                  <th className="px-4 py-3">Chats you can still run</th>
                  <th className="px-4 py-3">Per day</th>
                </tr>
              </thead>
              <tbody>
                {plan.rows.map((r) => (
                  <tr key={r.role} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">
                      <span className="block">{r.model.name}</span>
                      <span className="text-mute">{r.role}</span>
                    </td>
                    <td className="px-4 py-3">{r.fit}/100</td>
                    <td className="px-4 py-3">{formatCredits(r.perSession)}</td>
                    <td className="px-4 py-3 font-medium">
                      {r.sessionsLeft.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {r.perDay < 1 ? "< 1" : r.perDay.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section
            className="credits-rise rounded-[22px] border border-cream bg-cream/80 p-6"
            style={{ animationDelay: "0.36s" }}
          >
            <h3 className="text-xl tracking-tight">Tips to save credits</h3>
            <p className="mt-1 text-sm text-mute">
              Tuned for {plan.taskLabel.toLowerCase()} and how much you have left.
            </p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {plan.tips.map((tip, n) => (
                <li
                  key={tip}
                  className="rounded-btn bg-white px-4 py-3 text-sm leading-snug shadow-card"
                >
                  <span className="mr-2 font-mono text-[11px] text-mute">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </section>

          <section
            className="credits-rise rounded-[22px] border border-mint/60 bg-mint/20 p-6"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-xl tracking-tight">
              Simple plan for {plan.taskLabel.toLowerCase()}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{plan.mix}</p>
            <p className="mt-3 text-sm text-mute">{plan.ghostNote}</p>
            <button
              type="button"
              className="mt-5 font-mono text-[11px] uppercase tracking-wider text-accent"
              onClick={() => setShowHow((v) => !v)}
            >
              {showHow ? "Hide the numbers" : "Show the numbers"}
            </button>
            {showHow ? (
              <ol className="mt-3 grid gap-2 text-sm text-mute">
                {plan.how.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-sm">
      <span className="text-mute">{label}</span>
      <input
        className="mt-1 w-full rounded-btn border border-line bg-canvas px-3 py-2.5 outline-none transition focus:border-charcoal"
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="mt-1 block text-xs text-mute">{hint}</span>
    </label>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-btn bg-white/10 px-3 py-2">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-white/45">{k}</dt>
      <dd className="mt-0.5">{v}</dd>
    </div>
  );
}

function CreditRing({ pct, remaining }: { pct: number; remaining: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const used = Math.min(100, Math.max(0, pct));
  const offset = c - (used / 100) * c;
  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#3a3a38" strokeWidth="10" />
        <circle
          className="credits-ring-fill"
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#7fe59a"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-pixel text-2xl leading-none">{Math.round(100 - used)}%</p>
          <p className="mt-1 text-[11px] text-white/55">credits left</p>
        </div>
      </div>
      <span className="sr-only">{remaining} credits remaining</span>
    </div>
  );
}

function PlanCard({
  kicker,
  title,
  body,
  note,
  featured,
  delay,
}: {
  kicker: string;
  title: string;
  body: string;
  note: string;
  featured?: boolean;
  delay: string;
}) {
  return (
    <article
      className={`credits-rise rounded-[22px] p-5 shadow-card transition duration-300 hover:-translate-y-1 ${
        featured ? "bg-mint text-charcoal" : "bg-white"
      }`}
      style={{ animationDelay: delay }}
    >
      <p className="font-mono text-[11px] uppercase tracking-wider opacity-60">{kicker}</p>
      <h3 className="mt-1 text-xl tracking-tight">{title}</h3>
      <p className="mt-2 text-sm">{body}</p>
      <p className={`mt-2 text-sm ${featured ? "opacity-80" : "text-mute"}`}>{note}</p>
    </article>
  );
}
