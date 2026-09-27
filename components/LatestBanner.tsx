import Link from "next/link";
import { catalogUpdatedAt, latestModels } from "@/lib/models";

export function LatestBanner() {
  const latest = latestModels();
  const names = latest.map((m) => m.name).join(" · ");

  return (
    <div className="bg-[#e4ecfd] px-4 py-2 text-center text-[13.5px] text-[#1d4f9a]">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-wider">
        Latest
      </span>
      <span className="hidden sm:inline">{names}</span>
      <span className="sm:hidden">{latest[0]?.name ?? "Current models"}</span>
      <Link href="/compare" className="ml-2 font-medium underline-offset-2 hover:underline">
        See versions →
      </Link>
      <Link href="/about#sources" className="ml-2 inline-block text-[11px] underline underline-offset-2">
        Updated <time dateTime={catalogUpdatedAt}>{catalogUpdatedAt}</time>
      </Link>
    </div>
  );
}
