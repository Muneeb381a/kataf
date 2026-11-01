import type { Metadata } from "next";
import { site } from "@/lib/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Screen } from "@/components/ui/Screen";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: "Kataf is a software house and academy in Pakistan. We build software for presses, shops and clinics, and teach design, web development, AI and marketing.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "See the work first", d: "We watch how your business runs before we draw a single screen." },
  { t: "Say what is true", d: "No inflated promises, no invented numbers, no features we have not built." },
  { t: "Stay after launch", d: "The first month is when you find out what we missed. We are there for it." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <SectionLabel>About</SectionLabel>
          <h1 className="display max-w-[14ch]">A software house that also teaches.</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded border border-ink shadow-frame">
              {/* Replace with /public/screens/about/founder.webp (1600x1000) */}
              <Screen src="about/founder" label="Founder photo" alt="The founder of Kataf" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-6">
            <p className="font-serif text-[26px] leading-snug tracking-[-0.01em] md:text-[34px]">
              Kataf means harvest. We picked the name because most of the businesses we meet work hard all season, and too
              little of it reaches them.
            </p>
            <div className="mt-8 space-y-5 text-muted">
              <p>
                We build software in {site.city.split(",")[0]} for the kind of business that still runs on registers,
                carbon slips and WhatsApp groups. Not because those owners are behind, but because most software was not
                written for how they work.
              </p>
              <p>
                So we start by sitting in the shop, the press or the clinic. We build what we saw, show it to you early,
                and fix it while you can still change your mind.
              </p>
              <p>
                Kataf Academy came from the same place. The people who build the software also teach design, web
                development, full stack, AI and marketing, so students learn what is actually used in work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper-2">
        <div className="wrap">
          <SectionLabel num="01">Values</SectionLabel>
          <ul className="grid border-t border-ink md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.t} className={`py-8 md:pr-8 ${i > 0 ? "md:border-l md:border-line md:pl-8" : ""}`}>
                <h2 className="h3">{v.t}</h2>
                <p className="mt-3 text-muted">{v.d}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 border-t border-line pt-6">
            <p className="label text-muted">Where we are</p>
            <p className="mt-1">{site.city}</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
