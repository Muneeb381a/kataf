import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { commonCourseFaqs, courses, getCourse } from "@/lib/courses";
import { internshipSteps } from "@/lib/academy";
import { siteUrl, whatsappLink } from "@/lib/config";
import { Button, TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Wheat } from "@/components/ui/Wheat";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CourseArt } from "@/components/ui/CourseArt";
import { CertificateArt } from "@/components/ui/CertificateArt";
import { EnrolCard } from "@/components/sections/EnrolCard";
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

  const faqs = [
    ...c.faqs,
    {
      q: "Do I get a certificate?",
      a: "Yes. When you complete the course and its final project, you receive a Kataf Academy certificate with your name, the course and a unique ID. Anyone can check that ID at /verify.",
    },
    {
      q: c.internship ? "Is there an internship after the course?" : "Is there an internship for this course?",
      a: c.internship
        ? "Yes. After the course you can work on real projects with our team. We explain the dates and terms at admission, before you pay."
        : "This course ends with a project showcase instead. If you also have the skills for one of our internship courses, ask us.",
    },
    ...commonCourseFaqs,
  ];
  const idx = courses.findIndex((x) => x.slug === c.slug);
  const next = courses[(idx + 1) % courses.length];

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.seoDescription,
    url: `${siteUrl}/academy/${c.slug}`,
    provider: { "@type": "Organization", name: "Kataf", sameAs: siteUrl },
    ...(c.fee ? { offers: { "@type": "Offer", price: c.fee.replace(/[^\d]/g, ""), priceCurrency: "PKR" } } : {}),
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
      <section className="relative overflow-hidden border-b border-line pt-14 md:pt-24">
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
            <ul className="label mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-muted">
              <li className="flex items-center gap-2">
                <span className="text-olive" aria-hidden="true">✓</span> Certificate on completion
              </li>
              {c.internship && (
                <li className="flex items-center gap-2">
                  <span className="text-olive" aria-hidden="true">✓</span> Internship after the course
                </li>
              )}
              <li className="flex items-center gap-2">
                <span className="text-olive" aria-hidden="true">✓</span> {c.projects.length} real projects
              </li>
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

      {/* Body: main column + sticky enrol card */}
      <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-x-10">
        <aside className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <EnrolCard course={c} />
          </div>
        </aside>

        <div className="space-y-20 lg:col-span-8 lg:row-start-1 md:space-y-28">
          {/* Who + outcomes */}
          <section>
            <SectionLabel num="01">Who it is for</SectionLabel>
            <p className="font-serif text-[24px] leading-snug tracking-[-0.01em] md:text-[30px]">{c.whoFor}</p>
            <p className="label mt-6 text-muted">Before you start</p>
            <p className="mt-1">{c.prerequisite}</p>
            <p className="label mb-4 mt-10 text-olive">By the end you can</p>
            <ul className="border-t border-ink">
              {c.outcomes.map((o) => (
                <li key={o} className="flex gap-4 border-b border-line py-4">
                  <span aria-hidden="true" className="mt-0.5 text-olive">✓</span>
                  {o}
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-3">
              {c.tools.map((t) => (
                <li key={t} className="label rounded border border-line bg-olive-tint px-3 py-2 text-olive-deep">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Curriculum */}
          <section>
            <SectionLabel num="02">Curriculum</SectionLabel>
            <h2 className="h2 mb-10 max-w-[16ch]">{c.modules.length} modules, one after another.</h2>
            <ol className="border-t border-ink">
              {c.modules.map((m, i) => (
                <li key={m.name} className="border-b border-line">
                  <Reveal className="grid gap-x-6 gap-y-3 py-7 md:grid-cols-[3rem_1fr_1.2fr]">
                    <span className="label pt-2 text-olive">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="h3">{m.name}</h3>
                    <ul>
                      {m.topics.map((t) => (
                        <li key={t} className="flex gap-3 border-b border-line/70 py-2 text-muted last:border-b-0">
                          <span aria-hidden="true" className="text-olive">→</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          {/* Projects */}
          <section className="on-dark relative overflow-hidden rounded border border-ink bg-ink p-8 text-paper md:p-12">
            <Wheat className="pointer-events-none absolute -bottom-16 -right-2 hidden h-[360px] -rotate-[10deg] text-olive-tint/20 md:block" />
            <p className="label mb-5 text-olive-tint">03 / Projects</p>
            <h2 className="h2 max-w-[14ch]">What you will have made.</h2>
            <ol className="relative mt-8">
              {c.projects.map((p, i) => (
                <li key={p} className="grid grid-cols-[3rem_1fr] border-t border-paper/25 py-4">
                  <span className="label pt-1.5 text-olive-tint">0{i + 1}</span>
                  <p className="font-serif text-[21px] leading-snug tracking-[-0.01em] md:text-[24px]">{p}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Certificate */}
          <section>
            <SectionLabel num="04">Your certificate</SectionLabel>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="stage p-5">
                <CertificateArt
                  course={c.name}
                  className="mx-auto block h-auto w-full -rotate-2 shadow-frame transition-transform duration-300 hover:rotate-0"
                />
                <p className="label mt-5 text-center text-olive-deep">Sample certificate</p>
              </div>
              <div>
                <h2 className="h3 !text-[32px]">A certificate you earned.</h2>
                <p className="mt-4 text-muted">
                  Finish every module and the final project, and you receive a Kataf Academy certificate with your name, the course and a
                  unique ID. It is awarded for completion, not for attendance.
                </p>
                <Link href="/verify" className="link-quiet mt-5 inline-block font-medium text-olive">
                  Anyone can verify it online →
                </Link>
              </div>
            </div>
          </section>

          {/* Internship */}
          <section>
            <SectionLabel num="05">{c.internship ? "Internship" : "After the course"}</SectionLabel>
            {c.internship ? (
              <>
                <h2 className="h2 mb-4 max-w-[16ch]">Then work on the real thing.</h2>
                <p className="mb-10 max-w-[50ch] text-muted">
                  Kataf is a working software house, so after the course you can work on real projects with our team. We
                  explain the dates and terms at admission, before you pay.
                </p>
                <ol className="grid gap-6 sm:grid-cols-2">
                  {internshipSteps.map((s, i) => (
                    <li key={s.t} className="border-t-2 border-olive pt-4">
                      <span className="label text-olive">Step 0{i + 1}</span>
                      <h3 className="h3 mt-1">{s.t}</h3>
                      <p className="mt-1 text-muted">{s.d}</p>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <>
                <h2 className="h2 mb-4 max-w-[16ch]">End with a project you can show.</h2>
                <p className="max-w-[50ch] text-muted">
                  This course finishes with a project showcase, so you leave with work to show clients or employers. If you
                  also build skills for one of our internship courses, ask us about it.
                </p>
              </>
            )}
          </section>

          {/* FAQ */}
          <section>
            <SectionLabel num="06">FAQ</SectionLabel>
            <h2 className="h2 mb-10">Questions before you join.</h2>
            <Accordion items={faqs} />
            <p className="label mt-10 text-muted">
              Next course:{" "}
              <Link href={`/academy/${next.slug}`} className="link-quiet text-olive">
                {next.name} →
              </Link>
            </p>
          </section>
        </div>
      </div>

      {/* Apply */}
      <section id="apply" className="on-dark bg-olive-deep text-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <p className="label mb-5 text-olive-tint">07 / Apply</p>
            <h2 className="h2">Join {c.name}.</h2>
            <p className="mt-5 max-w-[34ch] text-paper/70">
              Send the form. We reply on WhatsApp with the fee, the next batch and what to bring, before you decide.
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
