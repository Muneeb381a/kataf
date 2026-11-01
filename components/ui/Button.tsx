import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { HandUnderline } from "./HandUnderline";

type Variant = "primary" | "paper" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-olive text-paper hover:bg-olive-deep",
  paper: "bg-paper text-ink hover:bg-olive-tint",
  outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
};

const base =
  "group inline-flex items-center gap-3 rounded px-6 py-3.5 font-medium leading-none transition-[background-color,transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#14130F] motion-reduce:hover:transform-none";

const Arrow = () => (
  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
    →
  </span>
);

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SubmitButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`${base} ${styles[variant]} disabled:opacity-60 ${className}`}>
      {children}
      <Arrow />
    </button>
  );
}

/** Secondary: text link with a hand-drawn olive underline. */
export function TextLink({
  href,
  children,
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `relative inline-block pb-2 font-medium ${className}`;
  const inner = (
    <>
      {children}
      <HandUnderline className="bottom-0 h-[9px]" />
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
