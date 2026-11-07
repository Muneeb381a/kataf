import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Wheat } from "@/components/ui/Wheat";
import { AlKausarMark } from "@/components/ui/Logo";
import { courses } from "@/lib/courses";
import { moduleCount, products } from "@/lib/products";

/** Home: the two halves of Al-Kausar side by side, joined at the seam. */
export function TwoSides() {
  return (
    <section className="relative grid lg:grid-cols-2">
      {/* seam badge */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 z-20 hidden h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-ink bg-paper text-olive shadow-[4px_4px_0_#14130F] lg:flex"
      >
        <AlKausarMark className="h-7 w-auto" />
      </div>

      {/* Build */}
      <div className="relative overflow-hidden border-b border-line bg-paper lg:border-b-0 lg:border-r lg:border-ink">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-4 select-none font-serif text-[220px] leading-none tracking-[-0.05em] text-olive-tint/70 md:text-[320px]"
        >
          01
        </span>
        <Reveal
          x={-36}
          y={0}
          className="wrap relative !mx-0 !max-w-none py-16 md:py-24 lg:pl-[max(48px,calc((100vw-1240px)/2+48px))] lg:pr-20"
        >
          <p className="label mb-6 flex items-center gap-3 text-olive">
            <span>01</span>
            <span className="h-px w-8 bg-olive" aria-hidden="true" />
            Software house
          </p>
          <h2 className="h2 max-w-[14ch]">We build software for your business.</h2>
          <p className="mt-5 max-w-[40ch] text-muted">
            Ready-made products for presses, shops and clinics, and custom software and websites when yours is different.
          </p>

          <ul className="mt-9 border-t border-ink">
            {products.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/products/${p.slug}`}
                  className="group -mx-3 flex items-center gap-4 px-3 py-4 transition-colors duration-200 hover:bg-olive-tint"
                >
                  <span className="label w-6 text-olive">{p.num}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[24px] leading-tight tracking-[-0.02em]">{p.name}</span>
                    <span className="block truncate text-[15px] text-muted">{p.problem}</span>
                  </span>
                  <span aria-hidden="true" className="text-olive transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li className="border-b border-line">
              <Link
                href="/services"
                className="group -mx-3 flex items-center gap-4 px-3 py-4 transition-colors duration-200 hover:bg-olive-tint"
              >
                <span className="label w-6 text-olive">+</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[24px] leading-tight tracking-[-0.02em]">
                    Custom software and websites
                  </span>
                  <span className="block truncate text-[15px] text-muted">Built around how your business works.</span>
                </span>
                <span aria-hidden="true" className="text-olive transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
            <Button href="/contact">Get a Quote</Button>
            <p className="label text-muted">
              <span className="text-ink">{products.length}</span> products · <span className="text-ink">{moduleCount}</span>{" "}
              modules
            </p>
          </div>
        </Reveal>
      </div>

      {/* Learn */}
      <div className="theme-academy on-dark relative overflow-hidden bg-olive-deep text-paper">
        <Wheat
          delay={0.3}
          className="pointer-events-none absolute -right-4 -top-10 hidden h-[460px] rotate-[14deg] text-olive-tint/25 lg:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-4 select-none font-serif text-[220px] leading-none tracking-[-0.05em] text-paper/[0.05] md:text-[320px]"
        >
          02
        </span>
        <Reveal
          x={36}
          y={0}
          className="wrap relative !mx-0 !max-w-none py-16 md:py-24 lg:pl-20 lg:pr-[max(48px,calc((100vw-1240px)/2+48px))]"
        >
          <p className="label mb-6 flex items-center gap-3 text-olive-tint">
            <span>02</span>
            <span className="h-px w-8 bg-olive-tint" aria-hidden="true" />
            Academy
          </p>
          <h2 className="h2 max-w-[14ch]">We teach the people who build it.</h2>
          <p className="mt-5 max-w-[40ch] text-paper/70">
            Design, web development, full stack, AI and marketing, taught by doing. Every course ends in a project you can
            show.
          </p>

          <ul className="mt-9 border-t border-paper/40">
            {courses.map((c) => (
              <li key={c.slug} className="border-b border-paper/20">
                <Link
                  href={`/academy/${c.slug}`}
                  className="group -mx-3 flex items-center gap-4 px-3 py-3.5 transition-colors duration-200 hover:bg-paper/10"
                >
                  <span className="label w-6 text-olive-tint">{c.num}</span>
                  <span className="min-w-0 flex-1 font-serif text-[22px] leading-tight tracking-[-0.02em]">{c.name}</span>
                  <span className="label hidden rounded border border-paper/30 px-2 py-1 text-paper/70 sm:inline-block">
                    {c.level}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-olive-tint transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
            <Button href="/apply" variant="paper">
              Apply now
            </Button>
            <p className="label text-paper/60">
              <span className="text-paper">{courses.length}</span> courses · a project in every one
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
