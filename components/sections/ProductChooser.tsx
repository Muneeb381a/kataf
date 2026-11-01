import Link from "next/link";
import { products } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";

/** "Which one is yours?": the quickest way to the right product. */
export function ProductChooser() {
  const options = [
    ...products.map((p) => ({ key: p.slug, run: p.iRun, name: p.name, href: `#row-${p.slug}` })),
    { key: "custom", run: "Mine is different", name: "Custom software", href: "/services#software" },
  ];
  return (
    <nav aria-label="Choose a product" className="mt-12 md:mt-16">
      <p className="label mb-4 text-muted">Which one is yours?</p>
      <ul className="grid border-y border-ink sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {options.map((o, i) => (
          <li key={o.key} className="border-b border-line last:border-b-0 lg:border-b-0">
            <Reveal delay={i * 0.05} className="h-full">
              <Link
                href={o.href}
                className="group flex h-full flex-col justify-between gap-6 px-5 py-6 transition-colors duration-200 hover:bg-olive-tint lg:first:pl-0"
              >
                <span className="label text-olive">
                  {String(i + 1).padStart(2, "0")} · {o.run}
                </span>
                <span className="flex items-end justify-between gap-3">
                  <span className="font-serif text-[26px] leading-tight tracking-[-0.02em]">{o.name}</span>
                  <span
                    aria-hidden="true"
                    className="text-olive transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </nav>
  );
}
