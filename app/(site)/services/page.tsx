import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom websites and custom software for Pakistani businesses, built with you and supported after launch.",
  alternates: { canonical: "/services" },
};

type Block = {
  id: string;
  num: string;
  title: string;
  intro: string;
  get: string[];
  steps: { t: string; d: string }[];
  samples: { t: string; d: string }[];
  interest: string;
  tint?: boolean;
};

const blocks: Block[] = [
  {
    id: "websites",
    num: "01",
    title: "Custom Websites",
    intro:
      "A website for your press, shop, clinic or school that loads fast on a weak mobile connection and sends every enquiry to your WhatsApp.",
    get: [
      "Design made for your business, not a template with your logo on it",
      "Works on small phones first, then on desktop",
      "Contact form and WhatsApp button wired to your number",
      "Google-friendly pages so people find you by city and trade",
      "You can edit text and photos yourself, or we do it for you",
    ],
    steps: [
      { t: "Brief", d: "A call about what you sell and who buys it." },
      { t: "Design", d: "You see the pages before anything is built." },
      { t: "Build", d: "We build, you review on a private link." },
      { t: "Launch", d: "Domain, hosting and handover." },
    ],
    samples: [
      { t: "Printing press catalogue", d: "Products, sample work and a quote request that lands on WhatsApp." },
      { t: "Clinic website", d: "Doctors, timings, location and an appointment request form." },
      { t: "Shop catalogue", d: "Items with prices and an Order on WhatsApp button." },
    ],
    interest: "Custom%20Website",
  },
  {
    id: "software",
    num: "02",
    title: "Custom Software",
    intro:
      "When no ready-made product fits, we learn how your business runs and build the system around it. You see working screens every week.",
    get: [
      "A system built around your process, with your terms and your reports",
      "Screens designed with you before development starts",
      "Weekly working builds you can try yourself",
      "Data import from your Excel sheets or registers",
      "Support after launch, on site or remote",
    ],
    steps: [
      { t: "Understand", d: "We watch how the work actually happens." },
      { t: "Design", d: "You approve the screens first." },
      { t: "Build", d: "Working software every week." },
      { t: "Support", d: "We stay after launch." },
    ],
    samples: [
      { t: "Rice trading POS", d: "Batch-wise costing, so you know the margin on each lot." },
      { t: "Construction material ERP", d: "Site-wise orders, deliveries and party accounts." },
      { t: "School and academy portal", d: "Fees, attendance and results for parents and staff." },
    ],
    interest: "Custom%20Software",
    tint: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <SectionLabel>Services</SectionLabel>
          <h1 className="display max-w-[14ch]">Built for you, from the first screen.</h1>
          <p className="mt-8 max-w-[48ch] text-muted">
            Two things we make on request: websites and software. Both start with listening, and neither ends at launch.
          </p>
        </div>
      </section>

      {blocks.map((b) => (
        <section key={b.id} id={b.id} className={`section ${b.tint ? "bg-paper-2" : ""}`}>
          <div className="wrap">
            <SectionLabel num={b.num}>{b.title}</SectionLabel>
            <h2 className="h2 max-w-[20ch]">{b.title}</h2>
            <p className="mt-6 max-w-[52ch] text-muted">{b.intro}</p>

            <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
              <Reveal className="lg:col-span-5">
                <h3 className="label border-b border-ink pb-3 text-olive">What you get</h3>
                <ul>
                  {b.get.map((g) => (
                    <li key={g} className="border-b border-line py-4">
                      {g}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.05}>
                <h3 className="label border-b border-ink pb-3 text-olive">How it goes</h3>
                <ol>
                  {b.steps.map((s, i) => (
                    <li key={s.t} className="grid grid-cols-[3rem_1fr] border-b border-line py-4">
                      <span className="label pt-1 text-olive">0{i + 1}</span>
                      <p>
                        <span className="font-serif text-[22px] tracking-[-0.02em]">{s.t}.</span>{" "}
                        <span className="text-muted">{s.d}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <h3 className="label mt-16 border-b border-ink pb-3 text-olive">What it looks like</h3>
            <ul className="grid md:grid-cols-3">
              {b.samples.map((s, i) => (
                <li key={s.t} className={`border-b border-line py-6 md:pr-8 ${i > 0 ? "md:pl-8 md:border-l" : ""}`}>
                  <p className="font-serif text-[24px] leading-tight tracking-[-0.02em]">{s.t}</p>
                  <p className="mt-2 text-muted">{s.d}</p>
                </li>
              ))}
            </ul>

            <Button href={`/contact?interest=${b.interest}`} className="mt-12">
              Get a Quote
            </Button>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
