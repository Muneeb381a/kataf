export type MarqueeRow = {
  /** shown on the gold tab at the start of the ribbon */
  label: string;
  items: string[];
  reverse?: boolean;
  /** serif = large words, mono = small numbered labels */
  style?: "serif" | "mono";
  tone?: "ink" | "academy";
};

/** A wheat grain, used as the separator. */
function Grain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 22" className={className} aria-hidden="true">
      <ellipse cx="7" cy="12" rx="3.6" ry="7.4" transform="rotate(24 7 12)" className="fill-wheat" />
      <path d="M7 5.5 L10.5 0.5" className="stroke-wheat" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Two ribbons, tilted the opposite way, that meet on the right like a pair of scissors.
 * Each has a gold swallowtail tab, stitched edges and ruler ticks, and scrolls the other way.
 */
export function Marquee({ rows }: { rows: MarqueeRow[] }) {
  const place = [
    "top-[16px] rotate-[1.2deg] z-10",
    "top-[84px] -rotate-[1.2deg]",
  ];

  return (
    <div
      role="region"
      aria-label="What we build and what we teach"
      className="on-dark relative h-[150px] overflow-hidden bg-paper md:h-[158px]"
    >
      {rows.map((r, idx) => {
        const mono = r.style === "mono";
        const academy = r.tone === "academy";
        const bg = academy ? "theme-academy bg-olive-deep" : "bg-ink";
        const set = (
          <div className="flex shrink-0 items-center">
            {r.items.map((t, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                {mono ? (
                  <span className="label flex items-baseline gap-2 py-[13px] text-[13px] text-paper">
                    <span className="text-wheat">{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </span>
                ) : (
                  <span className="py-[9px] font-serif text-[24px] tracking-[-0.015em] text-paper md:text-[30px]">{t}</span>
                )}
                <Grain className="mx-8 h-[16px] w-[10px] md:mx-11" />
              </span>
            ))}
          </div>
        );
        return (
          <div
            key={r.label}
            className={`marquee absolute left-[-6%] w-[112%] ${place[idx] ?? ""} ${bg} shadow-[0_5px_0_#14130F]`}
          >
            {/* stitched gold edge, ruler ticks along the bottom */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[4px] border-t border-dashed border-wheat/55" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[3px] h-[5px] opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(245,240,227,.55) 0 1px, transparent 1px 12px)",
              }}
            />

            {/* swallowtail tab, sitting at the left edge of the screen */}
            <div
              className="absolute bottom-0 left-[5.4%] top-0 z-10 flex items-center bg-wheat pl-4 pr-8 text-ink md:pl-7 md:pr-11"
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%)" }}
            >
              <span className="label font-medium">{r.label}</span>
            </div>

            <div
              className="overflow-hidden"
              style={{
                WebkitMaskImage: "linear-gradient(to right, #000 0, #000 86%, transparent 94.6%)",
                maskImage: "linear-gradient(to right, #000 0, #000 86%, transparent 94.6%)",
              }}
            >
              <div className={`marquee-track flex w-max ${r.reverse ? "marquee-rev" : ""}`}>
                {set}
                <div aria-hidden="true" className="flex">
                  {set}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
