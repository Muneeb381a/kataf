import type { Metadata } from "next";
import { site, whatsappDisplay, whatsappLink } from "@/lib/config";
import { courses } from "@/lib/courses";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { AlKausarLogo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Apply to the Academy",
  description: "Apply to a Al-Kausar Computer Institute course: graphic designing, web development, backend, full stack, AI or digital marketing.",
  alternates: { canonical: "/apply" },
};

const steps = [
  { t: "Apply", d: "Send this form. It takes two minutes." },
  { t: "We reply", d: "We message you on WhatsApp with the fee, the next batch and what to bring." },
  { t: "Join", d: "Confirm your seat and start with the rest of the batch." },
];

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  const preset = courses.find((c) => c.slug === course)?.name ?? "";

  return (
    <section className="pb-20 pt-14 md:pb-32 md:pt-24">
      <div className="wrap">
        <SectionLabel>Academy admission</SectionLabel>
        <h1 className="display max-w-[12ch]">Pick a course. Start learning.</h1>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <aside className="lg:col-span-4">
            <AlKausarLogo className="mb-8 h-20 w-auto" />
            <ol className="border-t border-ink">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[3rem_1fr] border-b border-line py-5">
                  <span className="label pt-1 text-olive">0{i + 1}</span>
                  <p>
                    <span className="font-serif text-[22px] tracking-[-0.02em]">{s.t}.</span>{" "}
                    <span className="text-muted">{s.d}</span>
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-b border-line pb-6">
              <p className="label text-muted">Prefer to talk first?</p>
              <a
                href={whatsappLink("Hi Al-Kausar, I have a question about the Academy.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 font-medium text-olive"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {whatsappDisplay}
              </a>
              <p className="mt-3 text-muted">{site.hours}</p>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <ApplyForm defaultCourse={preset} sourcePage="/apply" />
          </div>
        </div>
      </div>
    </section>
  );
}
