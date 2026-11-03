"use client";

import Link from "next/link";
import { useState } from "react";
import { batches, weekdays } from "@/lib/schedule";

type Key = "men" | "women";

/** Separate men's and women's batches: pick one, see its slots and a weekly grid. */
export function BatchSchedule() {
  const [key, setKey] = useState<Key>("men");
  const b = batches[key];

  return (
    <div>
      <div role="tablist" aria-label="Choose your batch" className="grid gap-3 sm:grid-cols-2">
        {(["men", "women"] as Key[]).map((k) => {
          const on = key === k;
          return (
            <button
              key={k}
              type="button"
              role="tab"
              id={`batch-${k}`}
              aria-selected={on}
              aria-controls="batch-panel"
              onClick={() => setKey(k)}
              className={`flex items-center justify-between gap-4 rounded border px-5 py-4 text-left transition-colors ${
                on ? "border-olive bg-olive text-paper" : "border-ink/40 hover:border-ink"
              }`}
            >
              <span>
                <span className="label block opacity-80">Batch</span>
                <span className="font-serif text-[26px] leading-tight tracking-[-0.02em]">{batches[k].label}</span>
              </span>
              <span className="label rounded border border-current px-2.5 py-1">{batches[k].slots.length} slots</span>
            </button>
          );
        })}
      </div>

      <div id="batch-panel" role="tabpanel" aria-labelledby={`batch-${key}`} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-6">
        <ul className="grid min-w-0 gap-4 lg:col-span-5">
          {b.slots.map((s, i) => (
            <li key={s.id} className="rounded border border-ink bg-paper p-5 shadow-[4px_4px_0_#14130F]">
              <div className="flex items-baseline justify-between gap-3">
                <p className="label text-olive">
                  Slot {String(i + 1).padStart(2, "0")} · {s.name}
                </p>
                <p className="label text-muted">{s.days.length} days a week</p>
              </div>
              <p className="mt-2 font-serif text-[28px] leading-tight tracking-[-0.02em]">{s.time}</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {s.days.map((d) => (
                  <span key={d} className="label rounded bg-olive-tint px-2 py-1 text-olive-deep">
                    {d}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="min-w-0 lg:col-span-7">
          <p className="label mb-3 text-muted">{b.label} · week at a glance</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-center text-[15px]">
              <thead>
                <tr>
                  <th className="w-[26%] border-b border-ink p-2" scope="col">
                    <span className="sr-only">Slot</span>
                  </th>
                  {weekdays.map((d) => (
                    <th key={d} scope="col" className="label border-b border-ink p-2 font-normal text-muted">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.slots.map((s) => (
                  <tr key={s.id}>
                    <th scope="row" className="border-b border-line p-2 text-left font-normal">
                      <span className="block font-medium">{s.name}</span>
                      <span className="label text-[10px] text-muted">{s.time}</span>
                    </th>
                    {weekdays.map((d) => {
                      const on = s.days.includes(d);
                      return (
                        <td key={d} className="border-b border-line p-1.5">
                          {on ? (
                            <span className="block rounded bg-olive py-2 font-mono text-[11px] text-paper" aria-label={`${s.name} class on ${d}`}>
                              ✓
                            </span>
                          ) : (
                            <span className="block py-2 text-line" aria-label="No class">
                              ·
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded border border-line bg-olive-tint p-5">
            <p className="font-medium">Separate batches for men and women.</p>
            <p className="mt-1 text-[16px] text-olive-deep/90">
              Choose your batch and a preferred slot on the admission form. We confirm your seat and the exact timings in
              writing before you pay.
            </p>
            <Link href="/apply" className="link-quiet mt-3 inline-block font-medium text-olive">
              Choose a batch on the form →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
