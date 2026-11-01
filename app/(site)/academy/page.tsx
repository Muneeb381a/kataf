import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Wheat } from "@/components/ui/Wheat";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CourseCards } from "@/components/sections/CourseCards";
import { FeeTable, Includes, InternshipPath, TalkFirst } from "@/components/sections/AcademyTrust";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { commonCourseFaqs } from "@/lib/courses";
import { whatsappLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Kataf Academy teaches graphic designing, web development, backend, full stack development, AI skills and digital marketing in Pakistan.",
  alternates: { canonical: "/academy" },
};

const method = [
  { t: "Learn", d: "A short lesson on one idea, explained with real examples." },
  { t: "Build", d: "You make something with it straight away, on your own laptop." },
  { t: "Review", d: "We look at your work with you and show what to fix." },
  { t: "Ship", d: "Every course ends with a project you can put in a portfolio." },
];

const paths = [
  { name: "Frontend developer", steps: ["Web Development"] },
  { name: "Backend developer", steps: ["Web Development", "Backend Development"] },
  { name: "Full stack developer", steps: ["Full Stack Development"] },
  { name: "Designer", steps: ["Graphic Designing"] },
  { name: "Marketer", steps: ["Digital Marketing", "AI Skills"] },
];

const faqs = [
  ...commonCourseFaqs,
  {
    q: "What does the certificate say?",
    a: "It carries your name, the course, and Kataf Academy's signature. It is awarded when you complete the course and its final project.",
  },
  {
    q: "How does the internship work?",
    a: "After the course you can work on real projects with our team, in the courses where that is possible. We explain the dates and terms at admission, before you pay.",
  },
  {
    q: "I am not sure which course to choose.",
    a: "Tell us what you want to do after the course, and we will suggest one. You can pick Not sure on the admission form, or message us on WhatsApp.",
  },
  {
    q: "Is the Academy part of the software house?",
    a: "Yes. Kataf builds software for businesses and runs the Academy. What we teach is what we use.",
  },
];

export default function AcademyPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />

      <section className="relative overflow-hidden pt-14 md:pt-24">
        <Wheat className="pointer-events-none absolute -right-6 -top-6 hidden h-[560px] rotate-[12deg] text-olive/15 lg:block" />
        <div className="wrap relative pb-16 md:pb-24">
          <SectionLabel>Kataf Academy</SectionLabel>
          <h1 className="display max-w-[14ch]">
            Learn the craft <span className="italic text-olive">behind</span> the software.
          </h1>
          <p className="mt-8 max-w-[50ch] text-muted">
            Graphic designing, web development, backend, full stack, AI and digital marketing. Taught by doing, in a
            software house that builds real products.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href="/apply">Apply now</Button>
            <TextLink href={whatsappLink("Hi Kataf, I have a question about the Academy.")} external>
              Ask on WhatsApp
            </TextLink>
          </div>
          <ul className="label mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-muted">
            {["Verifiable certificate", "Internship in every course", "Real projects", "Fee in writing"].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="text-olive" aria-hidden="true">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="wrap">
          <SectionLabel num="01">Courses</SectionLabel>
          <h2 className="h2 mb-12 max-w-[16ch]">Six courses. Pick the one that gets you working.</h2>
          <CourseCards />
        </div>
      </section>

      <Includes />
      <InternshipPath />
      <FeeTable />
      <TalkFirst />

      <section className="section bg-paper-2">
        <div className="wrap">
          <SectionLabel num="06">How you learn</SectionLabel>
          <h2 className="h2 max-w-[16ch]">Less listening. More making.</h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {method.map((m, i) => (
              <li key={m.t}>
                <Reveal delay={i * 0.05}>
                  <div className="overflow-hidden rounded border border-line bg-paper p-6">
                    <span
                      aria-hidden="true"
                      className="block font-serif text-[110px] leading-[0.8] tracking-[-0.04em] text-olive-tint"
                    >
                      {i + 1}
                    </span>
                    <h3 className="h3 mt-5">{m.t}</h3>
                    <p className="mt-2 text-muted">{m.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <SectionLabel num="07">Paths</SectionLabel>
            <h2 className="h2">Where each course can take you.</h2>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {paths.map((p) => (
              <li key={p.name} className="grid items-baseline gap-2 border-t border-ink py-6 md:grid-cols-[14rem_1fr]">
                <span className="font-serif text-[26px] tracking-[-0.02em]">{p.name}</span>
                <span className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-olive">
                  {p.steps.map((s, i) => (
                    <span key={s} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden="true">→</span>}
                      {s}
                    </span>
                  ))}
                </span>
              </li>
            ))}
            <li className="border-t border-ink" aria-hidden="true" />
          </ul>
        </div>
      </section>

      <section className="section pt-0 md:pt-0">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <SectionLabel num="08">FAQ</SectionLabel>
            <h2 className="h2">Before you apply.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section id="apply" className="on-dark bg-ink text-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <p className="label mb-5 text-olive-tint">09 / Apply</p>
            <h2 className="h2">Ready to start?</h2>
            <p className="mt-5 max-w-[34ch] text-paper/70">
              Send the form. We reply on WhatsApp with the fee, the next batch and what to bring.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm dark sourcePage="/academy" />
          </div>
        </div>
      </section>
    </>
  );
}
