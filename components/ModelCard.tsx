import type { Model } from "@/lib/models";
import { estimateUsd, formatUsd, priceInEnglish } from "@/lib/models";

const tone: Record<string, string> = {
  Low: "bg-mint/40 text-charcoal",
  Medium: "bg-cream text-charcoal",
  High: "bg-navy text-white",
  Fast: "bg-[#e4ecfd] text-[#1d4f9a]",
  Slow: "bg-line text-mute",
  Current: "bg-mint/40 text-charcoal",
  Previous: "bg-line text-mute",
  Retired: "bg-[#f4e4e4] text-[#7a3030]",
};

export function Pill({
  children,
  kind,
}: {
  children: string;
  kind?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${kind ? tone[kind] ?? "bg-line text-mute" : "bg-line text-mute"}`}
    >
      {children}
    </span>
  );
}

export function ModelCard({
  model,
  kicker,
  highlight,
}: {
  model: Model;
  kicker?: string;
  highlight?: boolean;
}) {
  const price = priceInEnglish(model);
  const sample = formatUsd(estimateUsd(model, 8000, 2500));
  const dim = highlight ? "text-white/70" : "text-mute";

  return (
    <article
      className={`flex h-full flex-col rounded-folder p-5 shadow-card ${
        highlight ? "bg-charcoal text-white" : "bg-white"
      }`}
    >
      {kicker ? (
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.14em] ${highlight ? "text-white/60" : "text-mute"}`}
        >
          {kicker}
        </p>
      ) : null}
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h3 className="text-xl tracking-tight">{model.name}</h3>
        <Pill kind={model.status}>{model.status}</Pill>
      </div>
      <p className={`text-sm ${dim}`}>
        {model.provider} · version {model.version}
      </p>
      <p className={`mt-1 break-all font-mono text-[11px] ${dim}`}>{model.apiId}</p>
      <p className="mt-3 text-[15px] leading-snug">{model.bestFor}</p>
      <dl className={`mt-4 grid gap-2 text-sm ${highlight ? "text-white/85" : "text-ink"}`}>
        <div>
          <dt className={dim}>Strength</dt>
          <dd>{model.strength}</dd>
        </div>
        <div>
          <dt className={highlight ? "text-white/50" : "text-mute"}>Weakness</dt>
          <dd>{model.weakness}</dd>
        </div>
        <div>
          <dt className={dim}>Context and pricing notes</dt>
          <dd>{model.contextNote}</dd>
        </div>
        {model.versus ? (
          <div>
            <dt className={dim}>How versions differ</dt>
            <dd>{model.versus}</dd>
          </div>
        ) : null}
      </dl>
      <div className={`mt-4 rounded-btn p-3 text-sm leading-snug ${highlight ? "bg-white/10" : "bg-canvas"}`}>
        <p className={`font-medium ${highlight ? "text-white" : "text-ink"}`}>
          Typical coding chat: {sample}
        </p>
        <p className={`mt-1 ${dim}`}>{price.read}</p>
        <p className={dim}>{price.write}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        <Pill kind={model.costLevel}>{`Cost ${model.costLevel}`}</Pill>
        <Pill kind={model.speed}>{`Speed ${model.speed}`}</Pill>
        <Pill>{`Context ${model.contextStrength}`}</Pill>
      </div>
    </article>
  );
}
