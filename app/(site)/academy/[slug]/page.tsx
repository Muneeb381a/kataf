import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { commonCourseFaqs, courses, getCourse } from "@/lib/courses";
import { siteUrl, whatsappLink } from "@/lib/config";
import { Button, TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Wheat } from "@/components/ui/Wheat";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CourseArt } from "@/components/ui/CourseArt";
import { ApplyForm } from "@/components/sections/ApplyForm";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCourse((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} course`,
    description: c.seoDescription,
    alternates: { canonical: `/academy/${c.slug}` },
    openGraph: { title: `${c.name} course | Kataf Academy`, description: c.seoDescription },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCourse((await params).slug);
  if (!c) notFound();

  const faqs = [...c.faqs, ...commonCourseFaqs];
  const idx = courses.findIndex((x) => x.slug === c.slug);
  const next = courses[(idx + 1) % courses.length];

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.seoDescription,
    url: `${siteUrl}/academy/${c.slug}`,
    provider: { "@type": "Organization", name: "Kataf", sameAs: siteUrl },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={courseLd} />
      <JsonLd data={faqLd} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-14 md:pt-24">
        <Wheat className="pointer-events-none absolute -right-6 -top-6 hidden h-[540px] rotate-[12deg] text-olive/15 lg:block" />
        <div className="wrap relative grid items-center gap-12 pb-14 md:pb-20 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
          <Link href="/academy" className="label link-quiet text-olive">
            ← Academy
          </Link>
          <p className="label mb-6 mt-8 text-olive">Course {c.num}</p>
          <h1 className="display max-w-[14ch]">{c.name}</h1>
          <p className="mt-6 max-w-[40ch] font-serif text-[24px] leading-snug text-muted md:text-[32px]">{c.tagline}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href={`/apply?course=${c.slug}`}>Apply now</Button>
            <TextLink href={whatsappLink(`Hi Kataf, I would like to know about the ${c.name} course.`)} external>
              Ask on WhatsApp
            </TextLink>
          </div>
          <ul className="mt-12 flex flex-wrap gap-3">
            {c.tools.map((t) => (
              <li key={t} className="label rounded border border-line bg-olive-tint px-3 py-2 text-olive-deep">
                {t}
              </li>
            ))}
          </ul>
          </div>
          <div className="stage p-4 lg:col-span-5">
            <div className="overflow-hidden rounded border border-ink bg-paper shadow-frame">
              <div className="stage !rounded-none !border-0">
                <CourseArt slug={c.slug} className="mx-auto block h-auto w-full max-w-[420px] p-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who + outcomes */}
      <section className="border-y border-line bg-paper-2 py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <SectionLabel num="01">Who it is for</SectionLabel>
            <p className="font-serif text-[24px] leading-snug tracking-[-0.01em] md:text-[30px]">{c.whoFor}</p>
            <p className="label mt-6 text-muted">Before you start</p>
            <p className="mt-1">{c.prerequisite}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label mb-5 text-olive">By the end you can</p>
            <ul className="border-t border-ink">
              {c.outcomes.map((o) => (
                <li key={o} className="flex gap-4 border-b border-line py-4">
                  <span aria-hidden="true" className="mt-0.5 text-olive">
                    ✓
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section">
        <div className="wrap">
          <SectionLabel num="02">Curriculum</SectionLabel>
          <h2 className="h2 mb-14 max-w-[16ch]">
            {c.modules.length} modules, one after another.
          </h2>
          <ol className="border-t border-ink">
            {c.modules.map((m, i) => (
              <li key={m.name} className="border-b border-line">
                <Reveal className="grid gap-x-6 gap-y-3 py-7 md:grid-cols-12 md:py-9">
                  <span className="label pt-2 text-olive md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3 md:col-span-4">{m.name}</h3>
                  <ul className="md:col-span-6 md:col-start-7">
                    {m.topics.map((t) => (
                      <li key={t} className="flex gap-3 border-b border-line/70 py-2 text-muted last:border-b-0">
                        <span aria-hidden="true" className="text-olive">
                          →
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects */}
      <section className="on-dark relative overflow-hidden bg-ink py-16 text-paper md:py-24">
        <Wheat className="pointer-events-none absolute -bottom-24 right-[4%] hidden h-[520px] -rotate-[10deg] text-olive-tint/15 lg:block" />
        <div className="wrap relative grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <p className="label mb-5 text-olive-tint">03 / Projects</p>
            <h2 className="h2">What you will have made.</h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {c.projects.map((p, i) => (
              <li key={p} className="grid grid-cols-[3rem_1fr] border-t border-paper/25 py-5">
                <span className="label pt-1.5 text-olive-tint">0{i + 1}</span>
                <p className="font-serif text-[22px] leading-snug tracking-[-0.01em] md:text-[26px]">{p}</p>
              </li>
            ))}
            <li className="border-t border-paper/25" aria-hidden="true" />
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <SectionLabel num="04">FAQ</SectionLabel>
            <h2 className="h2">Questions before you join.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs} />
            <p className="label mt-10 text-muted">
              Next course:{" "}
              <Link href={`/academy/${next.slug}`} className="link-quiet text-olive">
                {next.name} →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="on-dark bg-olive-deep text-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <p className="label mb-5 text-olive-tint">05 / Apply</p>
            <h2 className="h2">Join {c.name}.</h2>
            <p className="mt-5 max-w-[34ch] text-paper/70">
              Send the form. We reply on WhatsApp with the fee, the next batch and what to bring.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm dark defaultCourse={c.name} sourcePage={`/academy/${c.slug}`} />
          </div>
        </div>
      </section>
    </>
  );
}
