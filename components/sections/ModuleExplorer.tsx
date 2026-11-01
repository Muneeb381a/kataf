"use client";

import { useState } from "react";

export type ExplorerModule = {
  name: string;
  lines: string[];
  screen: React.ReactNode;
};

/** Desktop: sticky side-nav + panel. Mobile: accordion. */
export function ModuleExplorer({ modules, url }: { modules: ExplorerModule[]; url: string }) {
  const [active, setActive] = useState(0);
  const m = modules[active];

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-x-6 lg:grid lg:grid-cols-12">
        <div className="col-span-4">
          <ul className="sticky top-28 border-t border-ink" role="tablist" aria-label="Modules">
            {modules.map((mod, i) => (
              <li key={mod.name} className="border-b border-line">
                <button
                  type="button"
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="module-panel"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-baseline gap-4 py-4 text-left transition-colors ${
                    i === active ? "text-olive" : "text-ink hover:text-olive"
                  }`}
                >
                  <span className="label w-6 text-olive">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-serif text-[24px] leading-tight tracking-[-0.02em] ${i === active ? "underline decoration-olive decoration-2 underline-offset-[6px]" : ""}`}>
                    {mod.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-8" id="module-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <p className="label mb-4 text-muted">{url}</p>
          <div className="stage overflow-hidden !rounded border-ink p-0 shadow-frame">{m.screen}</div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {m.lines.map((l) => (
              <li key={l} className="border-t border-ink pt-3">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile */}
      <div className="border-t border-ink lg:hidden">
        {modules.map((mod, i) => (
          <details key={mod.name} className="group border-b border-line">
            <summary className="flex cursor-pointer items-baseline justify-between gap-4 py-5">
              <span className="flex items-baseline gap-4">
                <span className="label text-olive">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[22px] tracking-[-0.02em]">{mod.name}</span>
              </span>
              <span aria-hidden="true" className="label text-olive">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <div className="pb-8">
              <div className="stage overflow-hidden !rounded border-ink">{mod.screen}</div>
              <ul className="mt-5 space-y-3">
                {mod.lines.map((l) => (
                  <li key={l} className="border-t border-line pt-3">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
