/** Hand-drawn style underline. Sits under its positioned parent. */
export function HandUnderline({ className = "", animated = false, tone = "text-olive" }: { className?: string; animated?: boolean; tone?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full overflow-visible ${tone} ${animated ? "wipe" : ""} ${className}`}
      fill="none"
    >
      <path
        d="M2 8.5C30 3.5 52 9.5 84 5.5s58 3.5 88-1c9-1.3 18-.8 26-2.2"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
