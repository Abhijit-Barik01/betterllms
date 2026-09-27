import { catalogSources } from "./models";

export type TipTabId = "auto" | "chat" | "agent" | "context" | "models";

export type CreditTip = {
  title: string;
  body: string;
};

export type TipTab = {
  id: TipTabId;
  label: string;
  kicker: string;
  heading: string;
  intro: string;
  tips: CreditTip[];
};

export const tipsUpdatedAt = "2026-09-27";

export const tipTabs: TipTab[] = [
  {
    id: "auto",
    label: "Auto",
    kicker: "GitHub Auto",
    heading: "Choose the right Auto tier",
    intro:
      "Auto considers task complexity, model availability, your plan, and organization policies. A discount reduces the selected model's cost; it does not make every request equally cheap.",
    tips: [
      {
        title: "Turn Auto on for everyday paid Copilot",
        body: "Paid Copilot plans receive a 10% discount on model costs with Auto in Chat, CLI, the Copilot app, and cloud agent. Treat any additional promotion as temporary and check your billing page before budgeting around it.",
      },
      {
        title: "Efficiency, Balance, or Intelligence",
        body: "Where Auto tiers are available, choose Efficiency for straightforward work, Balance for everyday tasks, and Intelligence for complex work. Tiers influence routing preferences; they are not fixed model lists or hard spending caps.",
      },
      {
        title: "Avoid unnecessary manual switches",
        body: "Manual model changes can reduce cache reuse. Auto routes around natural cache boundaries and substantial changes in task complexity. Keep a stable brief; switch when the task benefits, not just to chase a different name.",
      },
      {
        title: "Check which model actually answered",
        body: "Hover over a response in Copilot Chat or the Copilot app to inspect the model. CLI displays it in the terminal. If usage rises, compare task size, reasoning effort, and selected model before changing your whole workflow.",
      },
    ],
  },
  {
    id: "chat",
    label: "Chat",
    kicker: "Copilot Chat",
    heading: "Spend on the answer you need",
    intro:
      "Chat and agents consume input, output, and cached tokens. A clear task and a focused answer make usage more predictable than counting messages.",
    tips: [
      {
        title: "Leave completions on",
        body: "Code completions and next edit suggestions are not billed in AI credits. They remain unlimited on paid Copilot plans; free plans retain their own limits. Use them for local edits instead of opening an agent for every line.",
      },
      {
        title: "Know your billing model",
        body: "One GitHub AI credit equals $0.01. Some existing annual Pro and Pro+ subscriptions still use legacy request-based billing and model multipliers. Do not use token-credit estimates as a bill for a request-based plan.",
      },
      {
        title: "Lower thinking / effort for simple work",
        body: "Defaults vary by model. Use regular or lower effort for simple edits where supported, and increase it for difficult reasoning. Extra thinking can add billable output tokens even when the visible answer is short.",
      },
      {
        title: "Ask for a patch, not a rewrite",
        body: "Name the function, the intended behavior, and the test that should pass. Request a focused patch and a short summary. This can reduce repeated file output and unnecessary follow-up turns.",
      },
      {
        title: "Compact long chats",
        body: "When the thread becomes noisy, use your client's compaction feature or start a fresh conversation with the goal, constraints, decisions, and remaining work. Reused context may be cached; a long thread is not necessarily charged at full input price every turn.",
      },
    ],
  },
  {
    id: "agent",
    label: "Agent",
    kicker: "Agents",
    heading: "Agents multiply every token",
    intro:
      "One agent request can trigger many model calls. Measure total work completed, including retries and tool output, rather than the price of one visible reply.",
    tips: [
      {
        title: "Use Sonnet 5 or GPT-6 Sol for everyday coding",
        body: "Start with a bounded task on a balanced model available to your plan. Escalate to Opus 5.5, Astra, or Fable 5.1 when a difficult task justifies it. A stronger model can be cheaper overall if it avoids repeated failed attempts.",
      },
      {
        title: "Keep agent loops short",
        body: "Define the files in scope, acceptance tests, and a stop condition. Ask the agent to stop when those tests pass, or report a blocker after a bounded number of failed attempts. Avoid repeated broad searches and unrelated cleanup.",
      },
      {
        title: "Budget the whole run",
        body: "GPT-6 Astra and Claude Fable 5.1 have base input/output rates of $10 / $50 per million tokens. Tool results, reasoning, cache writes, and repeated calls can add to a run. Check usage and your account's spending controls before unattended work.",
      },
      {
        title: "Review access and data handling",
        body: "Model availability depends on plan, client, and administrator policy. Fable has additional data-retention and enterprise-access considerations; review GitHub's model notes before sending sensitive work. A catalog listing is not an approval to use a model.",
      },
      {
        title: "Code review has a second cost",
        body: "Copilot code review can consume both AI credits and GitHub Actions minutes. Its model is selected automatically, so a chat model's quoted rate does not predict the full cost of a review.",
      },
    ],
  },
  {
    id: "context",
    label: "Context",
    kicker: "What you paste",
    heading: "Send less. Pay less.",
    intro:
      "Send enough evidence to solve the problem, but keep unrelated files and repeated output out of the conversation. A large context window is capacity, not free storage.",
    tips: [
      {
        title: "Paste the function, not the repo",
        body: "Begin with the failing command, owning function, or relevant file. Let targeted workspace retrieval find nearby evidence. Include wider context when the dependency or failure actually requires it.",
      },
      {
        title: "Don’t resend the same document",
        body: "Keep reusable instructions and source material stable where possible. Cache eligibility, lifetime, reads, and writes differ by provider. A summary reduces tokens but can omit details; retain the original evidence for exact quotations and verification.",
      },
      {
        title: "Long docs: Flash first",
        body: "Gemini 3.8 Flash is the current Flash choice; 3.5 Flash-Lite is a lower-cost API option. Gemini 3.1 Pro Preview remains an API option for harder questions, but is retired from Copilot. Gemini 2.5 API access is restricted to existing users.",
      },
      {
        title: "Batch similar jobs",
        body: "Grouping similar items can reduce repeated instructions, but check output limits and per-item quality. Provider Batch APIs may offer separate discounts; putting ten items in a Copilot prompt does not grant an API batch discount.",
      },
      {
        title: "Watch long-context price thresholds",
        body: "Some models charge higher rates once input crosses a threshold. Copilot GPT-6 models have a tier above 272K input tokens. Gemini 3.1 Pro Preview API rates increase above 200K. Use extended context only when the task needs it.",
      },
    ],
  },
  {
    id: "models",
    label: "Models",
    kicker: "Which model",
    heading: "Current models, clear tradeoffs",
    intro:
      "These are starting points, not benchmark rankings. Test a small sample of real tasks and compare correctness, latency, and total cost before standardizing on one model.",
    tips: [
      {
        title: "Daily coding: Sonnet 5 or GPT-6 Sol",
        body: "Both have base input/output rates of $2 / $10 per million tokens. Choose based on your own coding and instruction-following tests. GPT-6 Sol is not the older GPT-5.6 Sol; Copilot plan access can differ.",
      },
      {
        title: "Bulk: GPT-6 Luna or Gemini 3.5 Flash-Lite",
        body: "Luna's base API rates are $0.10 / $0.50; Flash-Lite is $0.30 / $2.50 per million tokens. Haiku 4.5 remains the small Claude option. Flash-Lite API availability does not imply it is in Copilot.",
      },
      {
        title: "Complex work: Opus 5.5, Astra, or Fable 5.1",
        body: "Opus 5.5 costs $4 / $20 per million tokens, below Opus 5's $5 / $25. Astra and Fable 5.1 cost $10 / $50 at base rates. Evaluate whether the harder model reduces retries enough to justify the difference.",
      },
      {
        title: "Gemini 3.8 Flash has temporary pricing",
        body: "The $0.75 input / $3.75 output rate lasts through December 31, 2026. Google's published API rates become $1.50 / $7.50 on January 1, 2027. Include that change in a production budget instead of assuming the promotion is permanent.",
      },
      {
        title: "DeepSeek: use the current API aliases",
        body: "DeepSeek V4.1 Flash uses deepseek-flash; V4 Pro uses deepseek-v4-pro. Peak uncached input/output rates are $0.30 / $1.20 and $1.32 / $3.96 respectively, with off-peak rates at half. Flash supports vision; Pro does not.",
      },
      {
        title: "Qwen: choose the deployment region first",
        body: "Qwen3.8 Max is the flagship, Qwen3.7 Plus balances cost and capability, and Qwen3.8 Flash targets lower-cost work. Our rates use Alibaba Cloud's international pricing. Plus shows list prices without temporary discounts and has a higher tier above 256K input tokens.",
      },
      {
        title: "Mistral: hosted rates are not self-hosting costs",
        body: "Mistral Medium 3.5 is the agentic and coding option; Small 4 is the budget hybrid model. Both have 256K context. Their open weights use different licenses, and running them yourself adds compute and operations costs that are not in API token estimates.",
      },
      {
        title: "Grok and Kimi have different cost traps",
        body: "Grok 4.7 API rates double at 200K input tokens, and current-event answers require search tools. Kimi K3 has about 1M context but bills API cache writes separately. Both are listed by GitHub, with access controlled by your plan, client, and policies.",
      },
      {
        title: "Check retirements before pinning a version",
        body: "GitHub lists Gemini 3.5 Flash, Gemini 3.6 Flash, Opus 4.7, and Kimi K2.7 Code for retirement on October 2, 2026. API and Copilot lifecycles are separate. GPT-4o, GPT-4o mini, and GPT-4.1 may power utility features without being selectable chat models.",
      },
    ],
  },
];

export const tipSources = [
  {
    label: "GitHub: models and billing",
    href: "https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing",
  },
  {
    label: "GitHub: Auto model selection",
    href: "https://docs.github.com/en/copilot/concepts/models/auto-model-selection",
  },
  {
    label: "GitHub: availability and retirements",
    href: "https://docs.github.com/en/copilot/reference/ai-models/supported-models",
  },
  ...catalogSources.map((source) => ({ label: source.label, href: source.url })),
];
