import Link from "next/link";
import { courses } from "@/lib/courses";
import { products } from "@/lib/products";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWords } from "@/components/ui/RevealWords";
import { Reveal } from "@/components/ui/Reveal";
import { FieldScene, type FieldItem } from "@/components/sections/FieldScene";

const items: FieldItem[] = [
  ...products.map((p) => ({ name: p.name, href: `/products/${p.slug}`, group: "software" as const })),
  ...courses.map((c) => ({ name: c.name, href: `/academy/${c.slug}`, group: "academy" as const })),
];

const cares = [
  { t: "Plant", d: "We start small: one screen, one lesson, one real problem." },
  { t: "Tend", d: "Every week we check what is growing, and fix what is not." },
  { t: "Harvest", d: "The result is software that earns, and students who can work." },
];

/** Home: wheat growing from the soil, one stalk per product and per course. */
export function GrownWithCare() {
  return (
    <section className="overflow-hidden bg-paper-2 pt-20 md:pt-32">
      <div className="wrap">
        <SectionLabel num="06">Care</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <RevealWords
            className="h2 lg:col-span-6"
            text="We *tend* what we plant."
          />
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-[44ch] text-muted">
              A harvest is not luck. Software needs looking after once it ships, and a student needs looking after until
              the skill sticks. We treat both the same way: start small, tend it every week, and stay until it bears
              fruit.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 grid border-t border-ink md:grid-cols-3">
          {cares.map((c, i) => (
            <li key={c.t} className={`py-5 md:pr-8 ${i > 0 ? "md:border-l md:border-line md:pl-8" : ""}`}>
              <p className="label text-olive">0{i + 1}</p>
              <p className="font-serif text-[26px] leading-tight tracking-[-0.02em]">{c.t}</p>
              <p className="mt-1 text-[16px] text-muted">{c.d}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 md:mt-10">
        <FieldScene items={items} />
      </div>

      {/* phones: tags are too small on the scene, so list them under the soil */}
      <div className="bg-ink md:hidden">
        <ul className="wrap on-dark grid grid-cols-2 gap-x-4 gap-y-2 pb-10 pt-4 text-[15px] text-paper">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="underline decoration-paper/30 underline-offset-4">
                {it.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
