export function SectionLabel({
  num,
  children,
  className = "",
}: {
  num?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`label mb-5 text-olive ${className}`}>
      {num && <span>{num} / </span>}
      {children}
    </p>
  );
}
