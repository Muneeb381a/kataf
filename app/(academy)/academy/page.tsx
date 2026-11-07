import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Wheat } from "@/components/ui/Wheat";
import { HandUnderline } from "@/components/ui/HandUnderline";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { BatchSchedule } from "@/components/sections/BatchSchedule";
import { CourseBrowser } from "@/components/sections/CourseBrowser";
import { FeeTable, HandsOnSection, Includes, InternshipPath, TalkFirst } from "@/components/sections/AcademyTrust";
import { CourseFan } from "@/components/sections/CourseFan";
import { CountUp } from "@/components/ui/CountUp";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { commonCourseFaqs, courses } from "@/lib/courses";
import { whatsappLink } from "@/lib/config";
import { AlKausarLogo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Kataf Academy teaches graphic designing, video editing, computer essentials, web development, backend, full stack, AI skills and digital marketing in Pakistan. Hands-on, with a certificate and an internship.",
  alternates: { canonical: "/academy" },
};

const method = [
  { t: "Learn", d: "A short explanation of one idea, with real examples." },
  { t: "Do it yourself", d: "You work on the task straight away, on your own computer." },
  { t: "Review", d: "We look at your work with you and show what to fix." },
  { t: "Ship", d: "Every course ends with a project you can put in a portfolio." },
];

const paths = [
  { name: "Frontend developer", steps: ["Web Development"] },
  { name: "Backend developer", steps: ["Web Development", "Backend Development"] },
  { name: "Full stack developer", steps: ["Full Stack Development"] },
  { name: "Designer", steps: ["Graphic Designing", "Advanced Graphic Designing"] },
  { name: "Marketer", steps: ["Digital Marketing", "AI Skills"] },
  { name: "Video editor", steps: ["Video Editing"] },
  { name: "Office professional", steps: ["Computer Essentials"] },
];

const faqs = [
  ...commonCourseFaqs,
  {
    q: "What does the certificate say?",
    a: "It carries your name, the course, and Kataf Academy's signature. It is awarded when you complete the course and its final project.",
  },
  {
    q: "How does the internship work?",
    a: "After the course you can work on real projects with our team, We explain the dates and terms at admission, before you pay.",
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

      <section className="relative overflow-hidden border-b border-line">
        {/* rising sun behind the course cards */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-6 hidden h-[560px] w-[560px] rounded-full bg-wheat-tint lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[60px] top-[74px] hidden h-[430px] w-[430px] rounded-full border-2 border-wheat lg:block" />
        <Wheat className="pointer-events-none absolute -bottom-16 right-[46%] hidden h-[460px] rotate-[6deg] text-olive/25 lg:block" />

        <div className="wrap relative grid items-center gap-14 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <AlKausarLogo className="mb-8 h-20 w-auto md:h-24" />
            <p className="label mb-7 inline-flex items-center gap-3 rounded border border-olive bg-paper px-3 py-1.5 text-olive">
              <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
              Kataf Academy · Learn · Build · Work
            </p>
            <h1 className="display">
              Learn the craft <span className="relative inline-block italic text-olive">behind<HandUnderline animated tone="text-wheat" className="-bottom-1 h-[0.15em] md:-bottom-2" /></span> the software.
            </h1>
            <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted md:text-[20px]">
              Design, video, computer skills, web development, AI and marketing. We do not just teach. You get full hands-on experience, in a software house that builds real products.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/apply">Apply now</Button>
              <Button href="#courses" variant="outline" arrow={false}>
                See the courses ↓
              </Button>
            </div>
            <p className="mt-6">
              <TextLink href={whatsappLink("Hi Kataf, I have a question about the Academy.")} external>
                Ask us on WhatsApp first
              </TextLink>
            </p>
          </div>
          <div className="relative lg:col-span-6">
            <CourseFan className="mx-auto hidden h-[440px] max-w-[580px] lg:block" />
          </div>
        </div>

        <div className="wrap relative">
          <dl className="grid grid-cols-3 border-t border-ink">
            {[
              { n: courses.length, l: "Courses" },
              { n: courses.filter((c) => c.internship).length, l: "With an internship" },
              { n: courses.length, l: "Verifiable certificates" },
            ].map((x) => (
              <div key={x.l} className="border-l border-line py-6 pl-4 first:border-l-0 first:pl-0 md:pl-8 md:first:pl-0">
                <dd className="font-serif text-[40px] leading-none tracking-[-0.03em] md:text-[56px]">
                  <CountUp to={x.n} />
                </dd>
                <dt className="label mt-2 text-muted">{x.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="courses" className="py-16 md:py-24">
        <div className="wrap">
          <SectionLabel num="01">Courses</SectionLabel>
          <h2 className="h2 mb-12 max-w-[18ch]">Nine courses. Choose your level, then your course.</h2>
          <CourseBrowser />
        </div>
      </section>

      <section id="schedule" className="section bg-paper-2">
        <div className="wrap">
          <SectionLabel num="02">Class timings</SectionLabel>
          <h2 className="h2 mb-4 max-w-[18ch]">Separate batches for men and women.</h2>
          <p className="mb-12 max-w-[52ch] text-muted">
            Men and women study in their own batches, with their own timings. Pick yours to see the slots.
          </p>
          <BatchSchedule />
        </div>
      </section>

      <HandsOnSection />
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
