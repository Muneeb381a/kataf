import { LogoMark } from "./Logo";

export type MarqueeRow = {
  label: string;
  items: string[];
  reverse?: boolean;
  /** serif = headline words, mono = small uppercase labels */
  style?: "serif" | "mono";
  tone?: "ink" | "olive" | "academy";
};

/**
 * Two ribbons that cross each other, each tilted a little and scrolling the opposite way.
 * Stitched edges, a hard offset shadow, and they run off both sides of the page.
 */
export function Marquee({ rows }: { rows: MarqueeRow[] }) {
  const place = [
    "top-[14px] -rotate-[1.5deg] z-10",
    "top-[76px] rotate-[1.5deg]",
  ];

  return (
    <div
      role="region"
      aria-label="What we build and what we teach"
      className="on-dark relative h-[136px] overflow-hidden bg-paper md:h-[144px]"
    >
      {rows.map((r, idx) => {
        const mono = r.style === "mono";
        const bg = r.tone === "academy" ? "theme-academy bg-olive-deep" : r.tone === "olive" ? "bg-olive-deep" : "bg-ink";
        const set = (
          <div className="flex shrink-0 items-center">
            {r.items.map((t, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                {mono ? (
                  <span className="label py-[11px] text-[13px] text-olive-tint">{t}</span>
                ) : (
                  <span className="py-[7px] font-serif text-[22px] tracking-[-0.015em] text-paper md:text-[26px]">{t}</span>
                )}
                {mono ? (
                  <span aria-hidden="true" className="mx-7 h-1.5 w-1.5 rotate-45 bg-olive-tint/60" />
                ) : (
                  <LogoMark className="mx-8 h-[15px] w-[16px] text-wheat/80 md:mx-10" />
                )}
              </span>
            ))}
          </div>
        );
        return (
          <div
            key={r.label}
            className={`marquee absolute left-[-6%] w-[112%] ${place[idx] ?? ""} ${bg} shadow-[0_4px_0_#14130F]`}
          >
            {/* stitching along both edges */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[3px] border-t border-dashed border-paper/25" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[3px] border-b border-dashed border-paper/25" />
            <div className="overflow-hidden">
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
