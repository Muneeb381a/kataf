import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products, shotPath } from "@/lib/products";
import { siteUrl, whatsappLink } from "@/lib/config";
import { Button, TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Screen } from "@/components/ui/Screen";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { ModuleExplorer } from "@/components/sections/ModuleExplorer";
import { QuoteForm } from "@/components/sections/QuoteForm";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.seoDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | Kataf`, description: p.seoDescription },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const url = `app.kataf.pk/${p.dir}`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.seoDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/products/${p.slug}`,
    publisher: { "@type": "Organization", name: "Kataf" },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />

      {/* 1. Hero */}
      <section className="overflow-x-clip pt-14 md:pt-24">
        <div className="wrap">
          <p className="label mb-6 text-olive">Product {p.num}</p>
          <h1 className="display">{p.name}</h1>
          <p className="mt-6 max-w-[40ch] font-serif text-[24px] leading-snug text-muted md:text-[32px]">{p.promise}</p>
          <div id="demo" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href={`/contact?interest=${encodeURIComponent(p.interest)}`}>Get a Quote</Button>
            <TextLink href={whatsappLink(`Hi Kataf, I would like to see a demo of ${p.name}.`)} external>
              Book a demo
            </TextLink>
          </div>
          <div className="stage mt-14 p-5 md:mt-20 md:p-12">
          <BrowserFrame url={`${url}/dashboard`}>
            <Screen
              src={shotPath(p)}
              label={`${p.name} dashboard`}
              priority
              sizes="(min-width: 1240px) 1144px, 100vw"
            />
          </BrowserFrame>
          </div>
        </div>
      </section>

      {/* 2. Who it's for */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <SectionLabel num="01">Who it is for</SectionLabel>
          </div>
          <div className="lg:col-span-7">
            <p className="font-serif text-[26px] leading-snug tracking-[-0.01em] md:text-[34px]">{p.whoFor}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {p.tags.map((t) => (
                <li key={t} className="label rounded border border-line bg-olive-tint px-3 py-2 text-olive-deep">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Before / After */}
      <section className="section bg-paper-2">
        <div className="wrap">
          <SectionLabel num="02">Before and after</SectionLabel>
          <h2 className="h2 max-w-[18ch]">The same day, with and without it.</h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
            <Reveal className="lg:col-span-4">
              <h3 className="label border-b border-ink pb-3 text-muted">Before</h3>
              <ul className="mt-2">
                {p.before.map((b) => (
                  <li key={b} className="border-b border-line py-4 text-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.05}>
              <h3 className="label border-b border-ink pb-3 text-olive">After, in Kataf</h3>
              <BrowserFrame url={`${url}/${p.modules[0].shot.slice(3)}`} className="mt-6">
                <Screen src={`${p.dir}/${p.modules[0].shot}`} label={`${p.name} ${p.modules[0].name}`} />
              </BrowserFrame>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {p.after.map((a) => (
                  <li key={a} className="border-t border-ink pt-3">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Modules */}
      <section className="section">
        <div className="wrap">
          <SectionLabel num="03">Modules</SectionLabel>
          <h2 className="h2 mb-14 max-w-[16ch]">Everything it covers, one module at a time.</h2>
          <ModuleExplorer
            url={url}
            modules={p.modules.map((m) => ({
              name: m.name,
              lines: m.lines,
              screen: <Screen src={`${p.dir}/${m.shot}`} label={`${p.name} · ${m.name}`} />,
            }))}
          />
        </div>
      </section>

      {/* 5. A day with */}
      <section className="section bg-paper-2">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <SectionLabel num="04">A day</SectionLabel>
            <h2 className="h2">A day with {p.name}.</h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {p.day.map((d) => (
              <li key={d.time} className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-t border-ink py-6 md:grid-cols-[6rem_1fr]">
                <span className="label pt-1.5 text-olive">{d.time}</span>
                <p className="font-serif text-[22px] leading-snug tracking-[-0.01em] md:text-[26px]">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Integrations */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionLabel num="05">Works with</SectionLabel>
          <ul className="flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-6">
            {p.integrations.map((i) => (
              <li key={i} className="label text-ink">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="section pt-0 md:pt-0">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <SectionLabel num="06">FAQ</SectionLabel>
            <h2 className="h2">Questions owners ask first.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={p.faqs} />
          </div>
        </div>
      </section>

      {/* 8. Quote form */}
      <section id="quote" className="on-dark bg-ink text-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <p className="label mb-5 text-olive-tint">07 / Quote</p>
            <h2 className="h2">Want {p.name} in your business?</h2>
            <p className="mt-5 max-w-[34ch] text-paper/70">
              Tell us a little about how you work. We reply on WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <QuoteForm dark defaultInterest={p.interest} sourcePage={`/products/${p.slug}`} />
          </div>
        </div>
      </section>
    </>
  );
}
