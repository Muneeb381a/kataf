import type { Metadata } from "next";
import { site, whatsappDisplay, whatsappLink } from "@/lib/config";
import { interests } from "@/lib/forms";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Tell Kataf about your business and get a quote for Printing ERP, Installment Manager, Doctor ERP, custom software or a website.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const { interest } = await searchParams;
  const preset = (interests as readonly string[]).includes(interest ?? "") ? interest : "";

  return (
    <section className="pb-20 pt-14 md:pb-32 md:pt-24">
      <div className="wrap">
        <SectionLabel>Get a quote</SectionLabel>
        <h1 className="display max-w-[12ch]">Tell us how you work.</h1>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <aside className="lg:col-span-4">
            <ul className="border-t border-ink">
              <li className="border-b border-line py-5">
                <p className="label text-muted">WhatsApp</p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 font-medium text-olive"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {whatsappDisplay}
                </a>
              </li>
              <li className="border-b border-line py-5">
                <p className="label text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="link-quiet mt-1 inline-block">
                  {site.email}
                </a>
              </li>
              <li className="border-b border-line py-5">
                <p className="label text-muted">Address</p>
                <p className="mt-1">{site.city}</p>
              </li>
              <li className="border-b border-line py-5">
                <p className="label text-muted">Hours</p>
                <p className="mt-1">{site.hours}</p>
              </li>
            </ul>
            <p className="mt-8 max-w-[32ch] text-muted">
              You will hear from the people who build the software, not a sales team.
            </p>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <QuoteForm defaultInterest={preset} sourcePage="/contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
