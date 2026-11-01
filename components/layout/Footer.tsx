import Link from "next/link";
import { site, whatsappDisplay, whatsappLink } from "@/lib/config";
import { products } from "@/lib/products";
import { courses } from "@/lib/courses";
import { Wordmark } from "@/components/ui/Logo";

/** Software footer talks only about software; the academy footer only about courses. */
export function Footer({ variant = "software" }: { variant?: "software" | "academy" }) {
  const academy = variant === "academy";
  return (
    <footer className={`on-dark relative text-paper ${academy ? "bg-olive-deep" : "bg-ink"}`}>
      <div className="wrap grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Wordmark className="text-paper" markClassName="text-wheat" />
          {academy && <p className="label mt-3 text-wheat">Academy</p>}
          <p className="mt-6 max-w-[34ch] text-paper/70">
            {academy
              ? "Kataf Academy teaches design, code, AI and marketing, with a certificate you can verify and an internship in every course."
              : "Kataf means harvest. We build software for the Pakistani businesses that do the hard work, and we want the fruit of it to reach them."}
          </p>
          <Link
            href={academy ? "/" : "/academy"}
            className="label mt-6 inline-block rounded border border-paper/40 px-3 py-2 transition-colors hover:bg-paper hover:text-ink"
          >
            {academy ? "Kataf software house ↗" : "Kataf Academy ↗"}
          </Link>
        </div>

        {academy ? (
          <>
            <FooterCol title="Courses" className="md:col-span-3 md:col-start-6">
              {courses.map((c) => (
                <Link key={c.slug} href={`/academy/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </FooterCol>
            <FooterCol title="Learn with us" className="md:col-span-2">
              <Link href="/academy#fees">Fees</Link>
              <Link href="/academy#internship">Internship</Link>
              <Link href="/verify">Verify a certificate</Link>
              <Link href="/apply">Apply now</Link>
            </FooterCol>
          </>
        ) : (
          <>
            <FooterCol title="Products" className="md:col-span-2 md:col-start-6">
              {products.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`}>
                  {p.name}
                </Link>
              ))}
            </FooterCol>
            <FooterCol title="Company" className="md:col-span-3">
              <Link href="/services#software">Custom Software</Link>
              <Link href="/services#websites">Custom Websites</Link>
              <Link href="/products">Products</Link>
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
            </FooterCol>
          </>
        )}

        <FooterCol title="Contact" className="md:col-span-3 md:col-start-10">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp {whatsappDisplay}
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span className="text-paper/70">{site.hours}</span>
          <Link href={academy ? "/apply" : "/contact"}>{academy ? "Apply now" : "Get a Quote"}</Link>
        </FooterCol>
      </div>

      <div className="wrap overflow-hidden" aria-hidden="true">
        <p className="select-none font-serif text-[clamp(120px,24vw,340px)] leading-[0.8] tracking-[-0.05em] text-paper/[0.06]">
          {academy ? "Academy" : "Kataf"}
        </p>
      </div>
      <div className="wrap">
        <div className="label flex flex-col gap-2 border-t border-paper/20 py-6 text-paper/60 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Kataf{academy ? " Academy" : ""}</span>
          <span>{site.city}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="label mb-5 text-paper/60">{title}</p>
      <div className="flex flex-col items-start gap-3 text-[16px] [&_a]:underline-offset-4 [&_a:hover]:underline">
        {children}
      </div>
    </div>
  );
}
