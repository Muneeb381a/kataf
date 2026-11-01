"use client";

import Link from "next/link";
import { useState } from "react";
import type { WorkMeta } from "@/lib/work";

const filters = ["All", "Products", "Websites", "Software"] as const;

export function WorkList({ items }: { items: WorkMeta[] }) {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const shown = f === "All" ? items : items.filter((i) => i.type === f);

  return (
    <div>
      <div role="group" aria-label="Filter work" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-ink pb-4">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={`label py-1 ${f === x ? "text-olive underline decoration-2 underline-offset-[6px]" : "text-muted hover:text-ink"}`}
          >
            {x}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="border-b border-line py-10 text-muted">
          Nothing here yet. We only list work we can show properly, so this one is still being written up.
        </p>
      ) : (
        <ul>
          {shown.map((w, i) => (
            <li key={w.slug} className="border-b border-line">
              <Link
                href={`/work/${w.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-12 md:gap-x-6 md:py-10"
              >
                <span className="label text-olive md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-muted md:col-span-2">{w.type}</span>
                <span className="md:col-span-5">
                  <span className="font-serif text-[28px] leading-tight tracking-[-0.02em] group-hover:text-olive md:text-[34px]">
                    {w.title}
                  </span>
                </span>
                <span className="text-muted md:col-span-3 md:col-start-10">{w.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
