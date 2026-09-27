import {
  estimateUsd,
  models,
  tasks,
  type Model,
  type TaskId,
} from "@/lib/models";

/** GitHub AI Credits: 1 credit = $0.01 */
export const CREDIT_USD = 0.01;
export const DEFAULT_CYCLE_DAYS = 30;

const TASK_TOKENS: Record<
  TaskId,
  { inTok: number; outTok: number; label: string }
> = {
  coding: { inTok: 8000, outTok: 2500, label: "typical coding chat" },
  writing: { inTok: 3000, outTok: 2000, label: "typical writing pass" },
  analysis: { inTok: 5000, outTok: 3000, label: "typical analysis chat" },
  "long-document": { inTok: 80000, outTok: 1500, label: "long document pass" },
  creative: { inTok: 2000, outTok: 2500, label: "typical creative draft" },
  "cheap-volume": { inTok: 1500, outTok: 800, label: "small bulk job" },
  general: { inTok: 800, outTok: 400, label: "short chat" },
};

/** Task-fit 0–100. Used as a lightweight predictor (quality × cost), not a trained net. */
const TASK_FIT: Record<TaskId, Record<string, number>> = {
  coding: {
    "claude-opus-5-5": 96,
    "gpt-6-sol": 94,
    "gpt-6-luna": 80,
    "gemini-3-8-flash": 88,
    "claude-sonnet-5": 95,
    "gpt-5-6-terra": 93,
    "gpt-5-6-sol": 94,
    "gpt-6-astra": 97,
    "claude-fable-5-1": 96,
    "claude-sonnet-4-6": 90,
    "claude-sonnet-4-5": 86,
    "gpt-5": 91,
    "gpt-5-6-luna": 80,
    "gpt-4-1": 84,
    "claude-opus-5": 88,
    "claude-opus-4-8": 87,
    "claude-opus-4-6": 85,
    "claude-opus-4-5": 84,
    o3: 80,
    "o4-mini": 76,
    "claude-haiku-4-5": 72,
    "gpt-4o": 74,
    "gpt-4o-mini": 68,
    "gemini-3-1-pro": 78,
    "gemini-3-5-flash": 62,
    "gemini-2-5-pro": 70,
    "gemini-2-5-flash": 55,
  },
  writing: {
    "claude-opus-5-5": 96,
    "gpt-6-sol": 86,
    "gpt-6-luna": 64,
    "gemini-3-8-flash": 76,
    "claude-opus-5": 96,
    "claude-opus-4-8": 91,
    "claude-opus-4-6": 92,
    "claude-opus-4-5": 90,
    "claude-fable-5-1": 88,
    "claude-sonnet-5": 88,
    "claude-sonnet-4-6": 84,
    "claude-sonnet-4-5": 82,
    "gpt-5-6-sol": 86,
    "gpt-5-6-terra": 83,
    "gpt-6-astra": 90,
    "gpt-5": 82,
    "gpt-4o": 75,
    "claude-haiku-4-5": 70,
    "gpt-4o-mini": 58,
    "gpt-5-6-luna": 64,
    "gemini-3-1-pro": 72,
    "gemini-2-5-pro": 68,
    "gemini-3-5-flash": 56,
    "gemini-2-5-flash": 52,
    o3: 60,
    "o4-mini": 58,
  },
  analysis: {
    "claude-opus-5-5": 94,
    "gpt-6-sol": 90,
    "gpt-6-luna": 60,
    "gemini-3-8-flash": 84,
    o3: 96,
    "gpt-6-astra": 95,
    "o4-mini": 88,
    "claude-opus-5": 90,
    "claude-fable-5-1": 89,
    "gpt-5-6-sol": 90,
    "gpt-5": 86,
    "claude-sonnet-5": 78,
    "gemini-3-1-pro": 88,
    "gemini-2-5-pro": 84,
    "claude-opus-4-8": 87,
    "claude-opus-4-6": 86,
    "claude-sonnet-4-6": 74,
    "gpt-5-6-terra": 84,
    "gpt-4-1": 76,
    "claude-haiku-4-5": 52,
    "gemini-3-5-flash": 62,
    "gemini-2-5-flash": 58,
    "gpt-4o-mini": 48,
    "gpt-4o": 70,
    "gpt-5-6-luna": 60,
  },
  "long-document": {
    "claude-opus-5-5": 90,
    "gpt-6-sol": 84,
    "gpt-6-luna": 65,
    "gemini-3-8-flash": 94,
    "gemini-3-1-pro": 97,
    "gemini-3-5-flash": 92,
    "gemini-2-5-pro": 96,
    "gemini-2-5-flash": 90,
    "gpt-6-astra": 86,
    "gpt-5-6-sol": 82,
    "gpt-4-1": 82,
    "claude-sonnet-5": 74,
    "claude-opus-5": 78,
    "claude-fable-5-1": 80,
    "gpt-5": 76,
    "gpt-5-6-terra": 80,
    "claude-sonnet-4-6": 70,
    o3: 50,
    "gpt-4o-mini": 35,
    "claude-haiku-4-5": 40,
    "gpt-5-6-luna": 48,
  },
  creative: {
    "claude-opus-5-5": 96,
    "gpt-6-sol": 86,
    "gpt-6-luna": 58,
    "gemini-3-8-flash": 74,
    "claude-opus-5": 96,
    "claude-opus-4-6": 90,
    "claude-opus-4-8": 91,
    "claude-sonnet-5": 86,
    "gpt-5-6-sol": 86,
    "gpt-6-astra": 88,
    "gpt-5": 84,
    "claude-sonnet-4-6": 80,
    "gpt-4o": 72,
    "claude-haiku-4-5": 62,
    "gpt-4o-mini": 48,
    "gpt-5-6-terra": 80,
    "gpt-5-6-luna": 58,
    "gemini-2-5-flash": 50,
    "gemini-3-5-flash": 54,
    o3: 55,
  },
  "cheap-volume": {
    "claude-opus-5-5": 20,
    "gpt-6-sol": 45,
    "gpt-6-luna": 94,
    "gemini-3-8-flash": 90,
    "gemini-2-5-flash": 94,
    "gpt-4o-mini": 92,
    "gpt-5-6-luna": 88,
    "claude-haiku-4-5": 90,
    "gemini-3-5-flash": 70,
    "claude-sonnet-5": 40,
    "gpt-5": 38,
    "gpt-5-6-terra": 42,
    o3: 18,
    "claude-opus-5": 15,
    "gpt-6-astra": 8,
    "claude-fable-5-1": 8,
    "gpt-5-6-sol": 22,
    "gemini-2-5-pro": 55,
    "gemini-3-1-pro": 48,
  },
  general: {
    "claude-opus-5-5": 78,
    "gpt-6-sol": 94,
    "gpt-6-luna": 84,
    "gemini-3-8-flash": 86,
    "gpt-5-6-terra": 94,
    "gpt-5": 92,
    "claude-sonnet-5": 90,
    "gpt-5-6-sol": 88,
    "gpt-4o": 82,
    "claude-haiku-4-5": 76,
    "gpt-4o-mini": 80,
    "gpt-5-6-luna": 84,
    "gemini-3-5-flash": 80,
    "gemini-2-5-flash": 78,
    "claude-opus-5": 58,
    "gpt-6-astra": 55,
    "claude-fable-5-1": 50,
    o3: 48,
    "gpt-4-1": 80,
  },
};

export const copilotUpdatedAt = "2026-09-27";

const COPILOT_IDS = new Set([
  "claude-opus-5-5",
  "claude-sonnet-5",
  "claude-haiku-4-5",
  "claude-fable-5-1",
  "gpt-6-astra",
  "gpt-6-sol",
  "gpt-6-luna",
  "gemini-3-8-flash",
]);

export function usdToCredits(usd: number) {
  return usd / CREDIT_USD;
}

export function creditsForSession(model: Model, taskId: TaskId) {
  const t = TASK_TOKENS[taskId];
  return usdToCredits(estimateUsd(model, t.inTok, t.outTok));
}

export function formatCredits(n: number) {
  if (n < 1) return "< 1 credit";
  if (n < 10) return `${n.toFixed(1)} credits`;
  return `${Math.round(n).toLocaleString()} credits`;
}

export function taskFit(modelId: string, taskId: TaskId) {
  return TASK_FIT[taskId][modelId] ?? 50;
}

export type ScoredModel = {
  model: Model;
  fit: number;
  cost: number;
  efficiency: number;
  score: number;
  sustainable: boolean;
};

export function scoreModels(
  taskId: TaskId,
  dailyBudget: number
): ScoredModel[] {
  return models
    .filter((m) => COPILOT_IDS.has(m.id) && m.status === "Current")
    .map((model) => {
      const fit = taskFit(model.id, taskId);
      const cost = Math.max(creditsForSession(model, taskId), 0.05);
      const efficiency = fit / cost;
      const sustainable = cost <= dailyBudget;
      const budgetBonus = sustainable ? 1 : Math.max(0, dailyBudget / cost);
      const score = 0.45 * fit + 0.4 * Math.min(100, efficiency * 4) + 0.15 * budgetBonus * 100;
      return { model, fit, cost, efficiency, score, sustainable };
    })
    .sort((a, b) => b.score - a.score);
}

function pickTrio(ranked: ScoredModel[]) {
  const affordable = ranked.filter((r) => r.sustainable);
  const choices = affordable.length ? affordable : ranked;

  const daily = choices[0];
  const bulk =
    ranked
      .filter((r) => r.model.id !== daily.model.id && r.fit >= 40)
      .sort((a, b) => a.cost - b.cost || b.fit - a.fit)[0] ?? daily;
  const hard =
    ranked.find(
      (r) =>
        r.model.id !== daily.model.id &&
        r.model.id !== bulk.model.id &&
        r.fit >= daily.fit
    ) ??
    ranked.find(
      (r) => r.model.id !== daily.model.id && r.model.id !== bulk.model.id
    ) ??
    daily;

  return { daily, hard, bulk };
}

export type Pace =
  | "Comfortable"
  | "On track"
  | "Front-loaded"
  | "Tight"
  | "Over budget"
  | "Sprint leftover";

export type CreditPlan = {
  monthly: number;
  used: number;
  remaining: number;
  overage: number;
  pctUsed: number;
  daysLeft: number;
  daysElapsed: number;
  cycleDays: number;
  expectedUsed: number;
  dailyBudget: number;
  pace: Pace;
  paceNote: string;
  how: string[];
  taskLabel: string;
  sessionLabel: string;
  daily: ScoredModel & { role: string; why: string };
  hard: ScoredModel & { role: string; why: string };
  bulk: ScoredModel & { role: string; why: string };
  rows: {
    model: Model;
    role: string;
    fit: number;
    perSession: number;
    sessionsLeft: number;
    perDay: number;
  }[];
  ghostNote: string;
  mix: string;
  tips: string[];
};

function saveCreditTips(
  taskId: TaskId,
  daily: ScoredModel,
  hard: ScoredModel,
  bulk: ScoredModel,
  pace: Pace
): string[] {
  const basics = [
    `Keep Chat on ${daily.model.name}. Switch to ${hard.model.name} only after a cheap answer fails.`,
    `Use ${bulk.model.name} for one-line questions. Tiny asks on a flagship model waste credits.`,
    "Keep code completions and next edit suggestions on: they are not billed in AI credits.",
    "Use Auto Efficiency for simple work where available; it is a routing preference, not a spending cap.",
    "Paste only the file or function you need. Huge dumps make every model more expensive.",
  ];

  const byTask: Record<TaskId, string[]> = {
    coding: [
      "Ask for a small patch, not a full rewrite of the file.",
      "Use agent mode in short steps. Long unattended loops burn credits fast.",
    ],
    writing: [
      "Draft on the everyday model. One polish pass on a stronger model is enough.",
    ],
    analysis: [
      "Summarize first on a cheap model. Use a reasoning model only on the hard question.",
      "Don’t re-send the same spreadsheet in every follow-up — refer to the last summary.",
    ],
    "long-document": [
      "Ask about one section at a time instead of the whole PDF every turn.",
      "Do a cheap first pass, then a stronger model only on pages that matter.",
    ],
    creative: [
      "Generate options cheaply, then upgrade one favorite for a final pass.",
    ],
    "cheap-volume": [
      "Batch similar jobs in one prompt instead of many separate chats.",
    ],
    general: [
      "If the answer would fit in a search or a completion, skip Chat.",
    ],
  };

  const paceTips: Partial<Record<Pace, string[]>> = {
    Tight: [`Until credits recover, stay on ${bulk.model.name} for almost everything.`],
    "Over budget": ["Pause Chat and agents until the month resets. Completions only."],
    "Front-loaded": [
      "You spent early. Cap Chat to your daily leftover so the rest of the month isn’t empty.",
    ],
    "Sprint leftover": [
      "Credits may expire soon — it’s fine to use the stronger model on real work, not on trivia.",
    ],
  };

  return [...basics.slice(0, 3), ...(byTask[taskId] ?? []), ...(paceTips[pace] ?? [])].slice(
    0,
    6
  );
}

function cycleShape(daysLeftRaw: number) {
  const left = Math.max(1, Math.round(daysLeftRaw));
  if (left >= DEFAULT_CYCLE_DAYS) {
    return { daysLeft: left, daysElapsed: 0, cycleDays: left };
  }
  return {
    daysLeft: left,
    daysElapsed: DEFAULT_CYCLE_DAYS - left,
    cycleDays: DEFAULT_CYCLE_DAYS,
  };
}

export function buildCreditPlan(input: {
  monthly: number;
  used: number;
  taskId: TaskId;
  daysLeft: number;
}): CreditPlan | null {
  const monthly = Math.max(0, input.monthly);
  if (!monthly) return null;

  const used = Math.max(0, input.used);
  const remaining = Math.max(0, monthly - used);
  const overage = Math.max(0, used - monthly);
  const pctUsed = (Math.min(used, monthly) / monthly) * 100;
  const { daysLeft, daysElapsed, cycleDays } = cycleShape(input.daysLeft);
  const expectedUsed = monthly * (daysElapsed / cycleDays);
  const dailyBudget = remaining / daysLeft;
  const task = tasks.find((t) => t.id === input.taskId)!;
  const tokens = TASK_TOKENS[input.taskId];

  const ranked = scoreModels(input.taskId, Math.max(dailyBudget, 0.01));
  let { daily, hard, bulk } = pickTrio(ranked);

  const how: string[] = [
    `Your monthly credits: ${used.toLocaleString()} used of ${monthly.toLocaleString()} → ${remaining.toLocaleString()} left${overage ? ` (${overage.toLocaleString()} extra beyond the included amount)` : ""}.`,
    daysElapsed === 0
      ? `Time: you set ${daysLeft} days remaining, so the full cycle is still ahead. Fair-share “by now” is 0 — any usage is front-loaded, not “on track with the calendar.”`
      : `Time: ${daysElapsed} days gone, ${daysLeft} left (of ${cycleDays}). Fair share by now ≈ ${Math.round(expectedUsed).toLocaleString()} credits used.`,
    `Daily budget if leftover is spread evenly: ${formatCredits(dailyBudget)} per day.`,
    `Predictor for ${task.label}: score = 45% task-fit + 40% quality-per-credit + 15% “can you afford it every day.”`,
  ];

  let pace: Pace = "On track";
  let paceNote = "";
  let mix = "";

  if (remaining <= 0) {
    pace = "Over budget";
    daily = bulk;
    hard = bulk;
    paceNote = "Included credits are gone. Ghost text only, or wait for reset.";
    mix = `Do not run Chat on ${ranked[0].model.name} until your monthly credits reset.`;
    how.push("Scenario: remaining ≤ 0.");
  } else if (dailyBudget < bulk.cost) {
    pace = "Tight";
    daily = bulk;
    hard = bulk;
    paceNote = `Leftover is under one cheap ${tokens.label} per day. Chat should be rare.`;
    mix = `A few ${bulk.model.name} chats only. Completions stay on.`;
    how.push("Scenario: daily budget < cheapest useful session.");
  } else if (daysLeft <= 5 && remaining > daily.cost * 8) {
    pace = "Sprint leftover";
    paceNote = "Few days left and plenty of credits. Spend on quality so they don’t expire.";
    mix = `Use ${daily.model.name} freely. ${hard.model.name} is fine this week for hard ${task.label.toLowerCase()}.`;
    how.push("Scenario: short runway + large remainder → spend leftover on quality.");
  } else if (daysElapsed === 0 && used > 0) {
    const ok = dailyBudget >= daily.cost;
    pace = ok ? "Front-loaded" : "Tight";
    paceNote = ok
      ? `You’ve already spent ${pctUsed.toFixed(0)}% with the full ${daysLeft} days still on the clock. That is early spend — but ${formatCredits(remaining)} still covers ${daily.model.name} every day.`
      : `Early spend plus a thin daily budget. Drop to ${bulk.model.name}.`;
    if (!ok) {
      daily = bulk;
      hard = ranked.find((r) => r.model.id !== bulk.model.id) ?? bulk;
    }
    mix = `${daily.model.name} daily for ${task.label.toLowerCase()} (fit ${daily.fit}/100, ${formatCredits(daily.cost)} / session). ${bulk.model.name} for tiny asks. ${hard.model.name} only when fit is worth the extra.`;
    how.push(
      `Scenario: days remaining is still ${daysLeft} but ${used.toLocaleString()} is already used → front-loaded. Model pick still follows task-fit / credit, not a fixed Sonnet/o3 table.`
    );
  } else if (daysElapsed > 0 && used > expectedUsed * 1.25) {
    pace = "Tight";
    daily = bulk;
    hard =
      ranked.find(
        (r) => r.sustainable && r.model.id !== bulk.model.id && r.fit >= 70
      ) ?? daily;
    paceNote = `Used is ahead of the calendar (${used.toLocaleString()} vs ~${Math.round(expectedUsed).toLocaleString()} fair share). Cheap default until you catch up.`;
    mix = `~90% ${bulk.model.name}. ${hard.model.name} only when the cheap answer is wrong.`;
    how.push("Scenario: used > 125% of expected-by-now.");
  } else if (used === 0) {
    pace = "Comfortable";
    paceNote = `Full remainder (${formatCredits(remaining)}) over ${daysLeft} days. Best efficiency for ${task.label.toLowerCase()} is ${daily.model.name}.`;
    mix = `${daily.model.name} as Chat default. ${bulk.model.name} for one-liners. ${hard.model.name} when you need higher task-fit.`;
    how.push("Scenario: unused monthly credits → pick the highest quality-per-credit model you can run daily.");
  } else {
    pace = "On track";
    paceNote = `Spend is in range for the days elapsed. Keep the task-optimized default: ${daily.model.name}.`;
    mix = `${daily.model.name} for ${task.label.toLowerCase()}. ${bulk.model.name} for spam. ${hard.model.name} when stuck.`;
    how.push("Scenario: used ≈ fair share for days elapsed.");
  }

  how.push(
    `Pick: daily = ${daily.model.name} (fit ${daily.fit}, ${formatCredits(daily.cost)}, efficiency ${daily.efficiency.toFixed(1)}). hard = ${hard.model.name} (fit ${hard.fit}). bulk = ${bulk.model.name} (${formatCredits(bulk.cost)}).`
  );

  const slots = [
    { ...daily, role: "Daily default" },
    { ...hard, role: "Hard problems only" },
    { ...bulk, role: "Small / high-volume jobs" },
  ];

  const rows = slots.map((s) => ({
    model: s.model,
    role: s.role,
    fit: s.fit,
    perSession: s.cost,
    sessionsLeft: s.cost > 0 ? Math.floor(remaining / s.cost) : 0,
    perDay: s.cost > 0 ? dailyBudget / s.cost : 0,
  }));

  return {
    monthly,
    used,
    remaining,
    overage,
    pctUsed,
    daysLeft,
    daysElapsed,
    cycleDays,
    expectedUsed,
    dailyBudget,
    pace,
    paceNote,
    how,
    taskLabel: task.label,
    sessionLabel: tokens.label,
    daily: {
      ...daily,
      role: "Best quality-per-credit you can run every day",
      why: `${task.label} fit ${daily.fit}/100 · ${formatCredits(daily.cost)} per ${tokens.label}.`,
    },
    hard: {
      ...hard,
      role: "Higher task-fit when the daily model is not enough",
      why: `${hard.model.name} fit ${hard.fit}/100 · ${formatCredits(hard.cost)} per ${tokens.label}.`,
    },
    bulk: {
      ...bulk,
      role: "Lowest credit cost that still works for this task",
      why: `${formatCredits(bulk.cost)} per ${tokens.label} · fit ${bulk.fit}/100.`,
    },
    rows,
    ghostNote:
      "Inline suggestions (the gray text as you type) barely use credits. Chat, agents, and premium models use most of them.",
    mix,
    tips: saveCreditTips(input.taskId, daily, hard, bulk, pace),
  };
}

export function parseCreditsInput(raw: string) {
  const t = raw.trim();
  if (t === "") return 0;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function parseDaysInput(raw: string) {
  const t = raw.trim();
  if (t === "") return DEFAULT_CYCLE_DAYS;
  const n = Number(t);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_CYCLE_DAYS;
  return Math.min(366, n);
}
