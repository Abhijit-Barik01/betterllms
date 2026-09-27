# BetterLLMs

Production domain: https://betterllms.com

A simple site that helps people pick an AI model for a task, see cost in plain language, and decide whether switching models is worth it.

Visual language follows [fanout.sh](https://fanout.sh/): off-white canvas, Overused Grotesk, charcoal buttons, folder-radius cards — not a purple AI gradient.

## Pages

- `/` — task → best / value / cheapest + switch advisor
- `/compare` — model cards
- `/cost` — monthly cost estimator
- `/credits` — Copilot credit planner
- `/tips` — credit-saving tips
- `/about` — how it works

## Run

```bash
npm install
npm run dev
```

## Catalog

The shared model catalog and task picks live in `lib/models.ts`. Latest additions
were checked against official provider sources on 2026-09-27; source links are
also shown on `/about#sources`. Prices are planning snapshots, not live bills.
Gemini 3.8 Flash promotional rates expire on 2026-12-31. DeepSeek estimates use
peak uncached rates. Historical entries remain available in Compare.

The catalog covers current text and coding models from Anthropic, OpenAI,
Google, DeepSeek, xAI, Moonshot AI, Mistral AI, and Alibaba Cloud. Qwen rates use
international list pricing; cache writes and long-context tiers are not included
in the base estimates.

Copilot availability and editorial task-fit data in `lib/credits.ts` are separate:
adding an API model does not automatically make it eligible for Copilot credit
recommendations. Current candidates were checked against GitHub's supported-model
and pricing pages on 2026-09-27. Plan, client, and organization restrictions apply.

Tips in `lib/credit-tips.ts` were reviewed on 2026-09-27 and include Auto tiers,
the paid Auto discount, completion billing, agent budgets, caching, current model
choices, and upcoming Copilot retirements. Official sources appear below the tips.

## Domain Setup

Deploy this Next.js app to your hosting provider, add `betterllms.com` as its
custom domain, and apply the DNS records supplied by that provider at your
registrar. Add `www.betterllms.com` with a redirect to the apex domain and enable
HTTPS. Application metadata uses `https://betterllms.com`; DNS and hosting are
not configured by repository changes.
# betterllms
# betterllms
