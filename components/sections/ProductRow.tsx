import Link from "next/link";
import type { Product } from "@/lib/products";
import { shotPath } from "@/lib/products";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Screen } from "@/components/ui/Screen";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppBubble } from "@/components/ui/WhatsAppBubble";

const stageClass = { olive: "stage", wheat: "stage-wheat", paper: "stage-paper" } as const;

export function ProductRow({ product, index }: { product: Product; index: number }) {
  const flip = index % 2 === 1;
  const extra = product.modules.length - 3;
  return (
    <article
      id={`row-${product.slug}`}
      className="relative grid scroll-mt-24 items-center gap-10 border-t border-line py-14 first:border-t-0 md:py-20 lg:grid-cols-12 lg:gap-x-6"
    >
      <Reveal
        x={flip ? 48 : -48}
        y={0}
        className={`relative lg:col-span-5 ${flip ? "lg:col-start-8 lg:row-start-1" : ""}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -top-20 select-none font-serif text-[180px] leading-none tracking-[-0.05em] text-olive-tint md:-top-28 md:text-[240px]"
        >
          {product.num}
        </span>
        <div className="relative">
          <p className="label mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-olive">
            <span>Product {product.num}</span>
            <span className="h-px w-8 bg-olive" aria-hidden="true" />
            <span className="text-muted">{product.iRun}</span>
          </p>
          <h3 className="font-serif text-[40px] leading-none tracking-[-0.02em] md:text-[56px]">
            <Link href={`/products/${product.slug}`} className="hover:text-olive">
              {product.name}
            </Link>
          </h3>
          <p className="mt-5 max-w-[34ch] font-serif text-[22px] italic leading-snug text-muted md:text-[24px]">
            {product.problem}
          </p>

          <ul className="mt-8 space-y-3 border-t border-line pt-6">
            {product.outcomes.map((o) => (
              <li key={o} className="flex gap-4">
                <span aria-hidden="true" className="mt-[7px] text-olive">
                  ✓
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Built for">
            {product.tags.slice(0, 3).map((t) => (
              <li key={t} className="label rounded border border-line bg-olive-tint px-2.5 py-1.5 text-olive-deep">
                {t}
              </li>
            ))}
          </ul>
          <p className="label mt-4 text-muted">
            {product.modules
              .slice(0, 3)
              .map((m) => m.name)
              .join(" · ")}{" "}
            <span className="text-olive">+{extra} more</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href={`/products/${product.slug}`}
              className="group inline-flex items-center gap-3 rounded bg-ink px-5 py-3 font-medium text-paper transition-colors duration-200 hover:bg-olive"
            >
              View details
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={`/contact?interest=${encodeURIComponent(product.interest)}`}
              className="link-quiet py-3 font-medium text-olive"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal
        x={flip ? -48 : 48}
        y={0}
        delay={0.12}
        className={`lg:col-span-7 ${flip ? "lg:col-start-1 lg:row-start-1" : ""}`}
      >
        <div className={`${stageClass[product.stage]} relative p-5 pb-14 md:p-10 md:pb-16`}>
          <BrowserFrame url={`app.kataf.pk/${product.dir}`} tilt>
            <Screen src={shotPath(product)} label={`${product.name} dashboard`} />
          </BrowserFrame>
          <WhatsAppBubble
            label={product.sample.label}
            text={product.sample.text}
            className={`absolute bottom-3 hidden md:block ${flip ? "right-8 rotate-2" : "left-8 -rotate-2"}`}
          />
          <p
            className={`label absolute top-2 hidden rounded bg-ink px-3 py-1.5 text-paper md:block ${
              flip ? "left-8 -rotate-2" : "right-8 rotate-2"
            }`}
          >
            {product.modules.length} modules inside
          </p>
        </div>
      </Reveal>
    </article>
  );
}
