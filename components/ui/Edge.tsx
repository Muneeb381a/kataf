/**
 * Torn-paper edge. Put it at the top of a section and colour it (text-*) like the section above,
 * so the upper section looks hand-torn into the lower one.
 */
const pts = (() => {
  const out: string[] = ["0 0", "1200 0"];
  // deterministic jitter so server and client render the same path
  for (let i = 24, x = 1200; i >= 0; i--, x = i * 50) {
    const y = 5 + ((i * 37) % 11) + (i % 2 ? 3 : 0);
    out.push(`${x} ${y}`);
  }
  return out.join(" ");
})();

export function Edge({ className = "text-paper" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 22"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -top-px z-10 h-[14px] w-full md:h-[22px] ${className}`}
    >
      <polygon points={pts} fill="currentColor" />
    </svg>
  );
}
