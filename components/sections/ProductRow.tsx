import Link from "next/link";
import type { Product } from "@/lib/products";
import { shotPath } from "@/lib/products";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Screen } from "@/components/ui/Screen";
import { Reveal } from "@/components/ui/Reveal";

export function ProductRow({ product, index }: { product: Product; index: number }) {
  const flip = index % 2 === 1;
  const extra = product.modules.length - 3;
  return (
    <>
      <article className="relative grid items-center gap-10 border-t border-line py-14 first:border-t-0 md:py-20 lg:grid-cols-12 lg:gap-x-6">
        <Reveal x={flip ? 48 : -48} y={0} className={`relative lg:col-span-5 ${flip ? "lg:col-start-8 lg:row-start-1" : ""}`}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-2 select-none font-serif text-[180px] leading-none tracking-[-0.05em] text-olive-tint md:-top-28 md:text-[240px]"
          >
            {product.num}
          </span>
          <div className="relative">
            <p className="label mb-5 text-olive">Product {product.num}</p>
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
            <p className="label mt-7 text-muted">
              {product.modules
                .slice(0, 3)
                .map((m) => m.name)
                .join(" · ")}{" "}
              <span className="text-olive">+{extra} modules</span>
            </p>
            <Link
              href={`/products/${product.slug}`}
              className="group mt-8 inline-flex items-center gap-3 rounded border border-ink px-5 py-3 font-medium transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              View details
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal x={flip ? -48 : 48} y={0} delay={0.12} className={`lg:col-span-7 ${flip ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          <div className="stage p-5 md:p-10">
            <BrowserFrame url={`app.kataf.pk/${product.dir}`} tilt>
              <Screen src={shotPath(product)} label={`${product.name} dashboard`} />
            </BrowserFrame>
          </div>
        </Reveal>
      </article>
    </>
  );
}

