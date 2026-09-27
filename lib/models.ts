export type CostLevel = "Low" | "Medium" | "High";
export type Speed = "Fast" | "Medium" | "Slow";
export type Status = "Current" | "Previous" | "Retired";
export type TaskId =
  | "coding"
  | "writing"
  | "analysis"
  | "long-document"
  | "creative"
  | "cheap-volume"
  | "general";

export type Model = {
  id: string;
  name: string;
  family: string;
  version: string;
  apiId: string;
  provider: string;
  status: Status;
  headline?: boolean;
  bestFor: string;
  strength: string;
  weakness: string;
  versus?: string;
  costLevel: CostLevel;
  speed: Speed;
  contextStrength: "Short" | "Good" | "Very long";
  /** USD per 1 million input tokens */
  inputPerM: number;
  /** USD per 1 million output tokens */
  outputPerM: number;
  contextNote: string;
};

export type Task = {
  id: TaskId;
  label: string;
  hint: string;
  best: string;
  value: string;
  cheap: string;
  why: string;
};

export const tasks: Task[] = [
  {
    id: "coding",
    label: "Coding",
    hint: "Write, debug, or review code",
    best: "claude-sonnet-5",
    value: "deepseek-v4-1-flash",
    cheap: "gpt-6-luna",
    why: "You need a model that follows instructions closely and still stays affordable for many back-and-forth edits.",
  },
  {
    id: "writing",
    label: "Writing",
    hint: "Emails, docs, and long-form copy",
    best: "claude-opus-5-5",
    value: "claude-sonnet-5",
    cheap: "claude-haiku-4-5",
    why: "Tone and structure matter more than raw speed. A stronger model often saves rewrite time.",
  },
  {
    id: "analysis",
    label: "Analysis",
    hint: "Reason through data or decisions",
    best: "gpt-6-astra",
    value: "gpt-6-sol",
    cheap: "deepseek-v4-1-flash",
    why: "Hard thinking benefits from a reasoning model. Everyday summaries can stay cheaper.",
  },
  {
    id: "long-document",
    label: "Long document reading",
    hint: "PDFs, reports, large notes",
    best: "gemini-3-1-pro",
    value: "gemini-3-8-flash",
    cheap: "gemini-3-5-flash-lite",
    why: "The document has to fit. A long-context model is safer than chopping the file into pieces.",
  },
  {
    id: "creative",
    label: "Creative work",
    hint: "Ideas, stories, brand voice",
    best: "claude-opus-5-5",
    value: "claude-sonnet-5",
    cheap: "gpt-6-luna",
    why: "Creative work rewards taste. Use a stronger model for first drafts, then a cheaper one for small edits.",
  },
  {
    id: "cheap-volume",
    label: "Cheap high-volume tasks",
    hint: "Lots of small, similar jobs",
    best: "gemini-3-8-flash",
    value: "gemini-3-5-flash-lite",
    cheap: "gpt-6-luna",
    why: "When each job is simple, the cheapest reliable model usually wins. Quality gaps are small.",
  },
  {
    id: "general",
    label: "General chat",
    hint: "Everyday questions",
    best: "gpt-6-sol",
    value: "claude-sonnet-5",
    cheap: "gpt-6-luna",
    why: "A balanced everyday model is enough. Save expensive models for work that would take you a long time.",
  },
];

export const catalogUpdatedAt = "2026-09-27";

export const catalogSources = [
  { label: "Anthropic models and pricing", url: "https://platform.claude.com/docs/en/about-claude/models/overview" },
  { label: "OpenAI models and pricing", url: "https://developers.openai.com/api/docs/models" },
  { label: "Google models", url: "https://ai.google.dev/gemini-api/docs/models" },
  { label: "Google pricing", url: "https://ai.google.dev/gemini-api/docs/pricing" },
  { label: "DeepSeek models and pricing", url: "https://api-docs.deepseek.com/quick_start/pricing" },
  { label: "xAI models and pricing", url: "https://docs.x.ai/developers/models" },
  { label: "Kimi models and pricing", url: "https://platform.kimi.ai/docs/pricing/chat" },
  { label: "Mistral Medium 3.5", url: "https://docs.mistral.ai/models/mistral-medium-3-5-26-04" },
  { label: "Mistral Small 4", url: "https://docs.mistral.ai/models/mistral-small-4-0-26-03" },
  { label: "Qwen models", url: "https://www.alibabacloud.com/help/en/model-studio/text-generation-model" },
  { label: "Qwen international pricing", url: "https://www.alibabacloud.com/help/en/model-studio/model-pricing" },
];

export const models: Model[] = [
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    family: "Claude Opus",
    version: "5.5",
    apiId: "claude-opus-5-5",
    provider: "Anthropic",
    status: "Current",
    headline: true,
    bestFor: "Complex writing, coding agents, and knowledge work",
    strength: "Current Opus with adaptive reasoning and long context",
    weakness: "More expensive than Sonnet for routine work",
    versus: "$4 / $20 per million tokens, down from Opus 5 at $5 / $25.",
    costLevel: "High",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 4,
    outputPerM: 20,
    contextNote: "1M-token context; up to 128K output tokens.",
  },
  {
    id: "gpt-6-sol",
    name: "GPT-6 Sol",
    family: "GPT-6",
    version: "Sol",
    apiId: "gpt-6-sol",
    provider: "OpenAI",
    status: "Current",
    headline: true,
    bestFor: "Daily coding, tool use, and general reasoning",
    strength: "Balances capability and cost in the GPT-6 lineup",
    weakness: "Astra is the stronger option for the hardest tasks",
    versus: "$2 / $10 per million tokens; one fifth of Astra's base rates.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 10,
    contextNote: "1.05M-token context; base rates shown, extra-long prompts may cost more.",
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    family: "GPT-6",
    version: "Luna",
    apiId: "gpt-6-luna",
    provider: "OpenAI",
    status: "Current",
    bestFor: "Focused tasks, simple edits, and high-volume processing",
    strength: "Lowest base rates in the GPT-6 lineup",
    weakness: "Validate quality before using it for complex reasoning",
    versus: "$0.10 / $0.50 per million tokens, below GPT-4o mini's base rates.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.1,
    outputPerM: 0.5,
    contextNote: "1.05M-token context; up to 128K output tokens.",
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    family: "Gemini",
    version: "3.8 Flash",
    apiId: "gemini-3.8-flash",
    provider: "Google",
    status: "Current",
    headline: true,
    bestFor: "Long documents, coding, and multi-step tool use",
    strength: "Current stable Flash for agentic and everyday work",
    weakness: "Promotional rates expire December 31, 2026",
    versus: "$0.75 / $3.75 through 2026; $1.50 / $7.50 from January 1, 2027.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.75,
    outputPerM: 3.75,
    contextNote: "Long-context model. Output pricing includes thinking tokens.",
  },
  {
    id: "gemini-3-5-flash-lite",
    name: "Gemini 3.5 Flash-Lite",
    family: "Gemini",
    version: "3.5 Flash-Lite",
    apiId: "gemini-3.5-flash-lite",
    provider: "Google",
    status: "Current",
    bestFor: "High-volume extraction, translation, and simple processing",
    strength: "Low-cost stable Gemini for new projects",
    weakness: "Use Flash or Pro for harder reasoning",
    versus: "$0.30 / $2.50 per million tokens; a current alternative to 2.5 Flash.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.3,
    outputPerM: 2.5,
    contextNote: "Long-context processing; output pricing includes thinking tokens.",
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    family: "DeepSeek V4",
    version: "V4.1 Flash",
    apiId: "deepseek-flash",
    provider: "DeepSeek",
    status: "Current",
    headline: true,
    bestFor: "Budget coding, tool use, and visual inputs",
    strength: "Thinking and non-thinking modes with a 1M-token context",
    weakness: "Peak rates depend on time of day; test reliability on your tasks",
    versus: "Peak uncached rates: $0.30 / $1.20. Off-peak rates are half.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.3,
    outputPerM: 1.2,
    contextNote: "1M-token context; use the deepseek-flash API alias.",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    family: "DeepSeek V4",
    version: "V4 Pro 0813",
    apiId: "deepseek-v4-pro",
    provider: "DeepSeek",
    status: "Current",
    bestFor: "More demanding reasoning and coding in the DeepSeek lineup",
    strength: "Long context and thinking mode at moderate rates",
    weakness: "No vision support; more expensive than Flash",
    versus: "Peak uncached rates: $1.32 / $3.96. Off-peak rates are half.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 1.32,
    outputPerM: 3.96,
    contextNote: "1M-token context; current version is DeepSeek-V4-Pro-0813.",
  },
  {
    id: "qwen3-8-max",
    name: "Qwen3.8 Max",
    family: "Qwen",
    version: "3.8 Max",
    apiId: "qwen3.8-max",
    provider: "Alibaba Cloud",
    status: "Current",
    bestFor: "Complex reasoning, coding, and long-document work",
    strength: "Current Qwen flagship with thinking, tools, and 1M context",
    weakness: "Higher cost than Plus or Flash; deployment region matters",
    versus: "International rates: $2 / $6 per million tokens up to 1M input.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 6,
    contextNote: "1M-token context. qwen3.8-max-0902 is also listed as a snapshot.",
  },
  {
    id: "qwen3-7-plus",
    name: "Qwen3.7 Plus",
    family: "Qwen",
    version: "3.7 Plus",
    apiId: "qwen3.7-plus",
    provider: "Alibaba Cloud",
    status: "Current",
    bestFor: "Balanced coding, office work, and tool-calling agents",
    strength: "Provider-recommended balance of capability and cost",
    weakness: "Higher price tier above 256K input; promotional discounts vary",
    versus: "International list rates: $0.40 / $1.60 up to 256K; $1.20 / $4.80 above. Promotions excluded.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.4,
    outputPerM: 1.6,
    contextNote: "1M-token context; thinking and non-thinking output have the same listed rate.",
  },
  {
    id: "qwen3-8-flash",
    name: "Qwen3.8 Flash",
    family: "Qwen",
    version: "3.8 Flash",
    apiId: "qwen3.8-flash",
    provider: "Alibaba Cloud",
    status: "Current",
    bestFor: "High-volume processing, summaries, and everyday questions",
    strength: "Low international rates with 1M context and tool calling",
    weakness: "Compare quality with Plus or Max on difficult reasoning",
    versus: "International rates: $0.15 / $0.47 per million tokens up to 1M input.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.15,
    outputPerM: 0.47,
    contextNote: "1M-token context. Confirm availability and pricing in your deployment region.",
  },
  {
    id: "grok-4-7",
    name: "Grok 4.7",
    family: "Grok",
    version: "4.7",
    apiId: "grok-4.7",
    provider: "xAI",
    status: "Current",
    bestFor: "General chat, coding, and tool-assisted research",
    strength: "Current xAI model for text and code with 500K context",
    weakness: "Live information requires search tools; long prompts cost more",
    versus: "$2 / $6 per million tokens below 200K input; $4 / $12 at or above 200K.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 6,
    contextNote: "500K-token context. Higher-tier rates apply to the whole request.",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    family: "Kimi",
    version: "K3",
    apiId: "kimi-k3",
    provider: "Moonshot AI",
    status: "Current",
    bestFor: "Long-context reasoning and multi-step coding work",
    strength: "Current Kimi with a 1,048,576-token context window",
    weakness: "Cache writes are billed separately from base input and output",
    versus: "$3 / $15 per million tokens. Cached input is $0.30; cache-write rates depend on TTL.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 3,
    outputPerM: 15,
    contextNote: "About 1M context. API cache writes: $3/M for 5min or $6/M for 1h.",
  },
  {
    id: "mistral-medium-3-5",
    name: "Mistral Medium 3.5",
    family: "Mistral",
    version: "3.5",
    apiId: "mistral-medium-3-5",
    provider: "Mistral AI",
    status: "Current",
    bestFor: "Agentic coding, document questions, and multimodal work",
    strength: "Tool calling and structured outputs; open weights under Modified MIT",
    weakness: "Smaller context than 1M-token alternatives; review license terms",
    versus: "$1.50 / $7.50 per million tokens; Small 4 is the lower-cost Mistral option.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 1.5,
    outputPerM: 7.5,
    contextNote: "256K-token context. Hosted API pricing is separate from self-hosting costs.",
  },
  {
    id: "mistral-small-4",
    name: "Mistral Small 4",
    family: "Mistral",
    version: "4",
    apiId: "mistral-small-2603",
    provider: "Mistral AI",
    status: "Current",
    bestFor: "Budget instruction following, reasoning, and coding",
    strength: "Hybrid model with tool calling and Apache 2.0 open weights",
    weakness: "Test hard tasks against Medium before choosing solely on price",
    versus: "$0.15 / $0.60 per million tokens; much lower base rates than Medium 3.5.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.15,
    outputPerM: 0.6,
    contextNote: "256K-token context; dated API snapshot mistral-small-2603.",
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5",
    family: "Claude Opus",
    version: "5",
    apiId: "claude-opus-5",
    provider: "Anthropic",
    status: "Previous",
    bestFor: "The hardest writing, research, and high-stakes answers",
    strength: "Most careful Claude. Strong taste and long, nuanced replies",
    weakness: "Costs more than Sonnet for everyday work",
    versus: "Opus 5.5 is newer and cheaper at $4 / $20. Keep Opus 5 only for a pinned workflow.",
    costLevel: "High",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 5,
    outputPerM: 25,
    contextNote: "Holds a very large conversation or document.",
  },
  {
    id: "claude-opus-4-8",
    name: "Claude Opus 4.8",
    family: "Claude Opus",
    version: "4.8",
    apiId: "claude-opus-4-8",
    provider: "Anthropic",
    status: "Previous",
    bestFor: "Hard agentic coding if you are still on the Opus 4.x line",
    strength: "Legacy 4.x Opus for pinned workflows",
    weakness: "Opus 5.5 is newer and has lower base rates",
    versus: "Legacy $5 / $25 rates. Prefer Opus 5.5 unless a workflow requires 4.8.",
    costLevel: "High",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 5,
    outputPerM: 25,
    contextNote: "Very long memory. Fine for big drafts.",
  },
  {
    id: "claude-fable-5-1",
    name: "Claude Fable 5.1",
    family: "Claude Fable",
    version: "5.1",
    apiId: "claude-fable-5-1",
    provider: "Anthropic",
    status: "Current",
    headline: true,
    bestFor: "Long unattended coding and knowledge-work agents",
    strength: "Built for long-horizon autonomous tasks in Copilot",
    weakness: "Expensive. Admins often must enable it. Data-retention rules differ from other Claude models.",
    versus: "Costs like a flagship ($10 / $50). Use for multi-step agents, not daily chat. Sonnet 5 is cheaper for normal coding.",
    costLevel: "High",
    speed: "Slow",
    contextStrength: "Very long",
    inputPerM: 10,
    outputPerM: 50,
    contextNote: "Meant for long agent runs. Don’t dump trivia into it.",
  },
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    family: "Claude Opus",
    version: "4.6",
    apiId: "claude-opus-4-6",
    provider: "Anthropic",
    status: "Previous",
    bestFor: "Careful writing if you are already on the 4.x line",
    strength: "Excellent long answers and judgment",
    weakness: "Legacy model; Opus 5.5 is newer and has lower base rates",
    versus: "Same $5 / $25 rate as Opus 4.5, 4.7, and 4.8. Pick 4.6 only if your tools already pin this version.",
    costLevel: "High",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 5,
    outputPerM: 25,
    contextNote: "Very long memory. Fine for big drafts.",
  },
  {
    id: "claude-opus-4-5",
    name: "Claude Opus 4.5",
    family: "Claude Opus",
    version: "4.5",
    apiId: "claude-opus-4-5",
    provider: "Anthropic",
    status: "Previous",
    bestFor: "High-stakes writing on an older Opus pin",
    strength: "Still a top-tier writer",
    weakness: "Superseded by 4.6 and Opus 5",
    versus: "Same price as Opus 4.6. Prefer 4.6 or Opus 5 unless a workflow is locked to 4.5.",
    costLevel: "High",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 5,
    outputPerM: 25,
    contextNote: "Very long memory.",
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    family: "Claude Sonnet",
    version: "5",
    apiId: "claude-sonnet-5",
    provider: "Anthropic",
    status: "Current",
    headline: true,
    bestFor: "Daily coding, writing, and planning at a lower Sonnet price",
    strength: "Newest Sonnet, cheaper than 4.5 / 4.6",
    weakness: "If a company still requires Sonnet 4.6, you cannot swap silently",
    versus: "$2 to read / $10 to write per million tokens — less than Sonnet 4.6’s $3 / $15.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 10,
    contextNote: "Excellent memory for most projects.",
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    family: "Claude Sonnet",
    version: "4.6",
    apiId: "claude-sonnet-4-6",
    provider: "Anthropic",
    status: "Previous",
    bestFor: "Daily work: coding, writing, planning (widely used 4.x pin)",
    strength: "Strong quality without Opus-level price",
    weakness: "Priced higher than the newer Sonnet 5",
    versus: "Same $3 / $15 as Sonnet 4.5. 4.6 is the later 4.x drop; Sonnet 5 is cheaper if you can move.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 3,
    outputPerM: 15,
    contextNote: "Excellent memory for most projects.",
  },
  {
    id: "claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    family: "Claude Sonnet",
    version: "4.5",
    apiId: "claude-sonnet-4-5",
    provider: "Anthropic",
    status: "Previous",
    bestFor: "Everyday work on teams still pinned to 4.5",
    strength: "Proven all-rounder",
    weakness: "4.6 is newer; Sonnet 5 is cheaper",
    versus: "Same list price as Sonnet 4.6. Prefer 4.6 or Sonnet 5 unless 4.5 is required.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 3,
    outputPerM: 15,
    contextNote: "Excellent memory for most projects.",
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    family: "Claude Haiku",
    version: "4.5",
    apiId: "claude-haiku-4-5",
    provider: "Anthropic",
    status: "Current",
    headline: true,
    bestFor: "Quick replies, light edits, cheap Claude volume",
    strength: "Fast and inexpensive, still a Claude",
    weakness: "Weaker on hard reasoning than Sonnet",
    versus: "Newer than retired Haiku 3.5. Slightly higher list price, stronger quality.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 1,
    outputPerM: 5,
    contextNote: "Fine for short threads. Don’t dump huge files.",
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    family: "GPT-5",
    version: "5",
    apiId: "gpt-5",
    provider: "OpenAI",
    status: "Previous",
    headline: false,
    bestFor: "General work in the GPT-5 line",
    strength: "Strong mixed tasks at a mid price",
    weakness: "Not the cheapest mini, not the deepest reasoner",
    versus: "GPT-5.6 and GPT-6 Astra are newer. Keep 4o mini for bulk.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 1.25,
    outputPerM: 10,
    contextNote: "Solid for typical chats.",
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra",
    family: "GPT-6",
    version: "Astra",
    apiId: "gpt-6-astra",
    provider: "OpenAI",
    status: "Current",
    headline: true,
    bestFor: "Long coding agents and hard multi-step work",
    strength: "Newest OpenAI flagship. Plans, checks, and finishes agent tasks with fewer loops",
    weakness: "Very expensive in Copilot credits. Not on Copilot Free/Pro in all rollouts",
    versus:
      "$10 / $50 per million tokens at base rates. GPT-6 Sol costs $2 / $10; choose Astra when its extra capability justifies the cost.",
    costLevel: "High",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 10,
    outputPerM: 50,
    contextNote: "Huge context, but long prompts cost extra after ~272k tokens.",
  },
  {
    id: "gpt-5-6-sol",
    name: "GPT-5.6 Sol",
    family: "GPT-5.6",
    version: "Sol",
    apiId: "gpt-5.6-sol",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Strong GPT-5.6 work without Astra’s bill",
    strength: "Current GPT-5.6 flagship in Copilot",
    weakness: "Still much pricier than Luna or mini",
    versus: "Use Sol as the GPT default. Jump to Astra only for long agent jobs.",
    costLevel: "High",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 4,
    outputPerM: 20,
    contextNote: "Large context. Promo rates can change.",
  },
  {
    id: "gpt-5-6-terra",
    name: "GPT-5.6 Terra",
    family: "GPT-5.6",
    version: "Terra",
    apiId: "gpt-5.6-terra",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Balanced GPT-5.6 daily coding",
    strength: "Mid GPT-5.6: cheaper than Sol, stronger than Luna",
    weakness: "Not the top of the 5.6 line",
    versus: "A sensible GPT daily driver if Sol is too spendy.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 12,
    contextNote: "Good everyday GPT-5.6 context.",
  },
  {
    id: "gpt-5-6-luna",
    name: "GPT-5.6 Luna",
    family: "GPT-5.6",
    version: "Luna",
    apiId: "gpt-5.6-luna",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Cheap GPT-5.6 volume in Copilot",
    strength: "Lowest GPT-5.6 price",
    weakness: "Weaker on hard reasoning than Sol or Astra",
    versus: "Prefer Luna over Astra for one-liners and boilerplate.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 0.2,
    outputPerM: 1.2,
    contextNote: "Fine for short GPT-5.6 chats.",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    family: "GPT-4o",
    version: "4o",
    apiId: "gpt-4o",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "General chat if your tools still default to 4o",
    strength: "Versatile and familiar",
    weakness: "Older than GPT-5; not the best specialist",
    versus: "GPT-5 is usually the better default now. 4o mini stays the cheap sibling.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 2.5,
    outputPerM: 10,
    contextNote: "Solid for typical chats.",
  },
  {
    id: "gpt-4-1",
    name: "GPT-4.1",
    family: "GPT-4.1",
    version: "4.1",
    apiId: "gpt-4.1",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Longer GPT-4-class threads",
    strength: "Strong instruction following",
    weakness: "Legacy model; GPT-6 Sol is a current general-purpose alternative",
    versus: "Mini and nano versions exist for cheaper 4.1 work.",
    costLevel: "Medium",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 8,
    contextNote: "Very long context for GPT-4-class work.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    family: "GPT-4o",
    version: "4o mini",
    apiId: "gpt-4o-mini",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Cheap everyday tasks and high volume",
    strength: "Very low cost, quick answers",
    weakness: "Shallow on complex work",
    versus: "Usually cheaper than Haiku for bulk. Step up to Sonnet or GPT-5 when quality slips.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 0.15,
    outputPerM: 0.6,
    contextNote: "Good enough for short, simple threads.",
  },
  {
    id: "o3",
    name: "o3",
    family: "o-series",
    version: "o3",
    apiId: "o3",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Hard analysis and tricky bugs",
    strength: "Thinks through problems carefully",
    weakness: "Slower; overkill for simple chat",
    versus: "Use o4-mini if you want similar reasoning for less money.",
    costLevel: "High",
    speed: "Slow",
    contextStrength: "Good",
    inputPerM: 2,
    outputPerM: 8,
    contextNote: "Keep the prompt focused. Extra length costs more.",
  },
  {
    id: "o4-mini",
    name: "o4-mini",
    family: "o-series",
    version: "o4-mini",
    apiId: "o4-mini",
    provider: "OpenAI",
    status: "Previous",
    bestFor: "Reasoning on a smaller budget",
    strength: "Careful thinking without o3’s full bill",
    weakness: "Still slower than a flash/mini chat model",
    versus: "Cheaper than o3. Use o3 only when the extra depth is obvious.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Good",
    inputPerM: 1.1,
    outputPerM: 4.4,
    contextNote: "Good for focused problem-solving.",
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    family: "Gemini",
    version: "2.5 Pro",
    apiId: "gemini-2.5-pro",
    provider: "Google",
    status: "Previous",
    headline: false,
    bestFor: "Reading very long documents",
    strength: "Huge context window",
    weakness: "Overkill for short chats",
    versus: "Use Flash when the file is long but the questions are simple.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 1.25,
    outputPerM: 10,
    contextNote: "Best when the file itself is the point.",
  },
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    family: "Gemini",
    version: "2.5 Flash",
    apiId: "gemini-2.5-flash",
    provider: "Google",
    status: "Previous",
    bestFor: "High volume and long files on a budget",
    strength: "Cheap, fast, long context",
    weakness: "Access is restricted to existing users",
    versus: "For new projects, use Gemini 3.8 Flash or 3.5 Flash-Lite.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 0.3,
    outputPerM: 2.5,
    contextNote: "Can swallow large docs without a big bill.",
  },
  {
    id: "gemini-3-1-pro",
    name: "Gemini 3.1 Pro Preview",
    family: "Gemini",
    version: "3.1 Pro",
    apiId: "gemini-3.1-pro-preview",
    provider: "Google",
    status: "Current",
    bestFor: "Long documents that still need careful answers",
    strength: "Newer Pro with huge context",
    weakness: "Overkill for short chats",
    versus: "Use 3.8 Flash for simpler questions. Preview availability and limits can change.",
    costLevel: "Medium",
    speed: "Medium",
    contextStrength: "Very long",
    inputPerM: 2,
    outputPerM: 12,
    contextNote: "Base rates up to 200K input tokens; above that, $4 / $18 per million.",
  },
  {
    id: "gemini-3-5-flash",
    name: "Gemini 3.5 Flash",
    family: "Gemini",
    version: "3.5 Flash",
    apiId: "gemini-3.5-flash",
    provider: "Google",
    status: "Previous",
    bestFor: "High volume and long files on a budget",
    strength: "Cheap, fast, long context — newer than 2.5 Flash",
    weakness: "Less polished writing than Claude",
    versus: "Gemini 3.8 Flash is newer and currently cheaper; keep 3.5 for pinned workflows.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Very long",
    inputPerM: 1.5,
    outputPerM: 9,
    contextNote: "Can swallow large docs without a flagship bill.",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    family: "DeepSeek V3",
    version: "V3",
    apiId: "deepseek-chat",
    provider: "DeepSeek",
    status: "Previous",
    bestFor: "Coding on a tight budget",
    strength: "Strong code quality for the price",
    weakness: "Less consistent on writing tone",
    versus: "V3.2 is a later drop; V3 is the well-known cheap coder many tools still list.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 0.27,
    outputPerM: 1.1,
    contextNote: "Fine for most coding threads.",
  },
  {
    id: "deepseek-v3-2",
    name: "DeepSeek V3.2",
    family: "DeepSeek V3",
    version: "V3.2",
    apiId: "deepseek-v3.2",
    provider: "DeepSeek",
    status: "Previous",
    bestFor: "Cheap coding with a newer V3 drop",
    strength: "Still very inexpensive for code",
    weakness: "Writing tone still trails Claude",
    versus: "Historical rates shown. Use DeepSeek V4.1 Flash for current API work.",
    costLevel: "Low",
    speed: "Fast",
    contextStrength: "Good",
    inputPerM: 0.23,
    outputPerM: 0.34,
    contextNote: "Fine for most coding threads.",
  },
];

export function getModel(id: string) {
  const model = models.find((m) => m.id === id);
  if (!model) throw new Error(`Unknown model: ${id}`);
  return model;
}

export function estimateUsd(
  model: Model,
  inputTokens: number,
  outputTokens: number
) {
  return (
    (inputTokens / 1_000_000) * model.inputPerM +
    (outputTokens / 1_000_000) * model.outputPerM
  );
}

export function formatUsd(n: number) {
  if (n < 0.005) return "less than a cent";
  if (n < 0.01) return "< $0.01";
  if (n < 1) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(2)}`;
}

export function formatRate(n: number) {
  if (Number.isInteger(n)) return `$${n}`;
  if (n < 1) return `$${n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}`;
  return `$${n}`;
}

/** Everyday explanation of $X/M in · $Y/M out */
export function priceInEnglish(model: Model) {
  const shortChat = estimateUsd(model, 800, 400);
  const codingChat = estimateUsd(model, 8000, 2500);
  return {
    read: `Reading what you send: about ${formatRate(model.inputPerM)} each time it reads a million tokens.`,
    write: `Writing the reply: about ${formatRate(model.outputPerM)} for a million tokens it types back. Replies cost more than reading, because generating text is harder.`,
    tokens:
      "A token is a small piece of a word. About 750 English words ≈ 1,000 tokens. A million tokens is roughly a 1,500-page book — not a single message.",
    examples: `A short chat (a few paragraphs) is about ${formatUsd(shortChat)}. A typical coding session (a few files in, a medium answer out) is about ${formatUsd(codingChat)}.`,
    jargon: `${formatRate(model.inputPerM)}/M in · ${formatRate(model.outputPerM)}/M out means per million tokens read / written.`,
  };
}

export function costWords(a: Model, b: Model) {
  const ratio = (a.inputPerM + a.outputPerM) / (b.inputPerM + b.outputPerM);
  if (ratio > 1.4) {
    return `${a.name} costs more than ${b.name}. For the same coding session, that’s about ${formatUsd(estimateUsd(a, 8000, 2500))} vs ${formatUsd(estimateUsd(b, 8000, 2500))}.`;
  }
  if (ratio < 0.7) {
    return `${a.name} is cheaper than ${b.name} for the same amount of reading and writing.`;
  }
  return `${a.name} and ${b.name} land in a similar price range for everyday chats.`;
}

export type SwitchAdvice = {
  extraCost: string;
  contextRisk: "Low" | "Medium" | "High";
  verdict: "Switch" | "Don’t switch";
  reason: string;
};

export function adviseSwitch(fromId: string, toId: string): SwitchAdvice {
  const from = getModel(fromId);
  const to = getModel(toId);
  const fromCost = from.inputPerM + from.outputPerM;
  const toCost = to.inputPerM + to.outputPerM;
  const cheaper = toCost < fromCost * 0.75;
  const pricier = toCost > fromCost * 1.4;
  const contextDrop =
    rankContext(to.contextStrength) < rankContext(from.contextStrength);

  const fromEx = formatUsd(estimateUsd(from, 8000, 2500));
  const toEx = formatUsd(estimateUsd(to, 8000, 2500));
  let extraCost = `About the same. A coding session is ~${fromEx} today vs ~${toEx} after the switch.`;
  if (pricier)
    extraCost = `Higher bill: a typical coding session goes from about ${fromEx} to ${toEx}.`;
  if (cheaper)
    extraCost = `Lower bill: a typical coding session goes from about ${fromEx} to ${toEx}.`;

  const contextRisk: SwitchAdvice["contextRisk"] = contextDrop
    ? "High"
    : to.contextStrength === from.contextStrength
      ? "Low"
      : "Medium";

  if (contextDrop && !cheaper) {
    return {
      extraCost,
      contextRisk,
      verdict: "Don’t switch",
      reason: `${to.name} may forget more of the conversation, without saving much money.`,
    };
  }
  if (cheaper && !contextDrop) {
    return {
      extraCost,
      contextRisk,
      verdict: "Switch",
      reason: `You keep similar memory and pay less. Paste a short recap of the goal when you switch.`,
    };
  }
  if (pricier && rankContext(to.contextStrength) > rankContext(from.contextStrength)) {
    return {
      extraCost,
      contextRisk: "Low",
      verdict: "Switch",
      reason: `Pay more only if the extra room for the document or thread is worth it.`,
    };
  }
  return {
    extraCost,
    contextRisk,
    verdict: cheaper ? "Switch" : "Don’t switch",
    reason: cheaper
      ? "The cheaper model is good enough if the task is still simple."
      : "Stay put unless the new model clearly does something the current one cannot.",
  };
}

function rankContext(level: Model["contextStrength"]) {
  return level === "Very long" ? 3 : level === "Good" ? 2 : 1;
}

export const families = [...new Set(models.map((m) => m.family))];

/** Newest headline models for the site banner. */
export function latestModels() {
  return models.filter((m) => m.status === "Current" && m.headline);
}
