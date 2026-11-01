import Link from "next/link";
import { getAllWork } from "@/lib/work";
import { moduleCount, products } from "@/lib/products";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Screen } from "@/components/ui/Screen";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Proof() {
  const work = getAllWork();
  const [featured, ...rest] = work;
  const smaller = rest.slice(0, 2);

  return (
    <section className="section">
      <div className="wrap">
        <SectionLabel num="05">Work</SectionLabel>
        <h2 className="h2 max-w-[18ch]">What we have built, and the problem behind it.</h2>

        {featured && (
          <Reveal>
            <article className="mt-14 grid gap-10 border-t border-ink pt-10 lg:grid-cols-12 lg:gap-x-6">
              <div className="lg:col-span-7">
                <BrowserFrame url={`app.kataf.pk/${featured.slug}`} tilt>
                  <Screen src={featured.cover} label={featured.coverLabel} />
                </BrowserFrame>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="label mb-4 text-olive">{featured.type}</p>
                <h3 className="h3 !text-[32px] md:!text-[40px]">
                  <Link href={`/work/${featured.slug}`} className="hover:text-olive">
                    {featured.title}
                  </Link>
                </h3>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="label text-muted">Problem</dt>
                    <dd>{featured.problem}</dd>
                  </div>
                  <div>
                    <dt className="label text-muted">Result</dt>
                    <dd>{featured.result}</dd>
                  </div>
                </dl>
                <Link href={`/work/${featured.slug}`} className="link-quiet mt-8 inline-block font-medium text-olive">
                  Read the case →
                </Link>
              </div>
            </article>
          </Reveal>
        )}

        {smaller.length > 0 && (
          <div className="mt-16 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {smaller.map((w) => (
              <Reveal key={w.slug}>
                <article className="border-t border-line pt-6">
                  <p className="label mb-3 text-olive">{w.type}</p>
                  <h3 className="h3">
                    <Link href={`/work/${w.slug}`} className="hover:text-olive">
                      {w.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[44ch] text-muted">{w.problem}</p>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* Only numbers that are true. Client count and quotes are left out until real ones exist. */}
        <dl className="label mt-20 grid grid-cols-2 gap-6 border-y border-line py-6">
          <div>
            <dt className="text-muted">Products shipped</dt>
            <dd className="mt-2 font-serif text-[40px] normal-case leading-none tracking-[-0.02em] text-ink">
              <CountUp to={products.length} />
            </dd>
          </div>
          <div>
            <dt className="text-muted">Modules across them</dt>
            <dd className="mt-2 font-serif text-[40px] normal-case leading-none tracking-[-0.02em] text-ink">
              <CountUp to={moduleCount} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
