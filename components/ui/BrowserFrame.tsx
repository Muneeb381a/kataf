export function BrowserFrame({
  url,
  children,
  className = "",
  tilt = false,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  /** hover tilt of 1deg */
  tilt?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded border border-ink bg-paper shadow-frame ${
        tilt ? "transition-transform duration-200 hover:rotate-1 motion-reduce:hover:rotate-0" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-ink bg-paper-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2 w-2 rounded-full border border-ink" />
          <i className="block h-2 w-2 rounded-full border border-ink" />
          <i className="block h-2 w-2 rounded-full border border-ink" />
        </span>
        <span className="label truncate text-[11px] normal-case tracking-normal text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}
