import { priceInEnglish, type Model } from "@/lib/models";

export function PriceExplainer({ models }: { models: Model[] }) {
  return (
    <div className="mt-4 grid gap-4">
      <p className="text-sm leading-relaxed text-mute">
        Companies do not charge per chat. They charge for <strong className="font-medium text-ink">tokens</strong> —
        tiny pieces of words. About 750 English words make 1,000 tokens. A million
        tokens is roughly a 1,500-page book, not one message.
      </p>
      <p className="text-sm leading-relaxed text-mute">
        “In” is what you send (your question, code, or PDF). “Out” is what the
        model writes back. Writing almost always costs more than reading.
      </p>
      {models.map((m) => {
        const p = priceInEnglish(m);
        return (
          <div key={m.id} className="rounded-btn border border-line bg-canvas p-4">
            <p className="font-medium tracking-tight">{m.name}</p>
            <p className="mt-1 text-sm text-ink">{p.examples}</p>
            <p className="mt-2 text-sm text-mute">{p.read}</p>
            <p className="text-sm text-mute">{p.write}</p>
            <p className="mt-2 font-mono text-[11px] text-mute">{p.jargon}</p>
          </div>
        );
      })}
    </div>
  );
}
