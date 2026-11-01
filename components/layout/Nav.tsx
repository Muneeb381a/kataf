"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export type NavVariant = "software" | "academy";

const software = {
  links: [
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/academy", label: "Academy ↗" },
  ],
  cta: { href: "/contact", label: "Get a Quote" },
  other: null as null | { href: string; label: string },
};

const academy = {
  links: [
    { href: "/academy#courses", label: "Courses" },
    { href: "/academy#internship", label: "Internship" },
    { href: "/academy#fees", label: "Fees" },
    { href: "/verify", label: "Verify certificate" },
  ],
  cta: { href: "/apply", label: "Apply now" },
  other: { href: "/", label: "Software house" },
};

export function Nav({ variant = "software" }: { variant?: NavVariant }) {
  const cfg = variant === "academy" ? academy : software;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper ${scrolled || open ? "border-b border-line" : "border-b border-transparent"}`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          href={variant === "academy" ? "/academy" : "/"}
          aria-label={variant === "academy" ? "Kataf Academy, home" : "Kataf, home"}
          className="flex items-center gap-3 text-ink"
        >
          <Wordmark />
          {variant === "academy" && <span className="label rounded bg-olive px-2 py-1 text-paper">Academy</span>}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex lg:gap-9">
          {cfg.links.map((l) => {
            const active = !l.href.includes("#") && (pathname === l.href || pathname.startsWith(l.href + "/"));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`text-[16px] transition-colors hover:text-olive ${active ? "text-olive" : "text-ink"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {cfg.other && (
            <Link href={cfg.other.href} className="label link-quiet text-muted hover:text-ink">
              {cfg.other.label} ↗
            </Link>
          )}
          <Button href={cfg.cta.href} className="!px-5 !py-3 text-[16px]">
            {cfg.cta.label}
          </Button>
        </div>

        <button
          type="button"
          className="label -mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-olive"
        />
      )}

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-paper px-6 pb-10 pt-8 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul>
              {cfg.links.map((l, i) => (
                <li key={l.href} className="border-b border-line">
                  <Link
                    href={l.href}
                    className="flex items-baseline gap-4 py-5 font-serif text-[36px] leading-none tracking-[-0.02em]"
                  >
                    <span className="label text-olive">0{i + 1}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 grid gap-3">
            <Button href={cfg.cta.href} className="w-full justify-between">
              {cfg.cta.label}
            </Button>
            {cfg.other && (
              <Link
                href={cfg.other.href}
                className="flex w-full items-center justify-between rounded border border-ink px-6 py-3.5 font-medium leading-none"
              >
                {cfg.other.label} <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
