import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { lookupCertificate, normalizeCode } from "@/lib/certificates";
import { ipOf, limited } from "@/lib/server/rateLimit";
import { whatsappLink } from "@/lib/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { VerifyForm } from "@/components/sections/VerifyForm";

export const metadata: Metadata = {
  title: "Certificate check",
  robots: { index: false, follow: false },
};

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function VerifyResult({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);

  // Codes are random, but we still limit guessing.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const tooMany = limited("verify", ip, 30);
  const result = tooMany ? ({ status: "limited" } as const) : await lookupCertificate(code);

  return (
    <section className="pb-20 pt-14 md:pb-32 md:pt-24">
      <div className="wrap">
        <Link href="/verify" className="label link-quiet text-olive">
          ← Check another
        </Link>
        <div className="mt-8">
          <SectionLabel>Certificate check</SectionLabel>
        </div>

        {result.status === "valid" && (
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-7">
              <p className="label mb-4 inline-flex items-center gap-2 rounded border border-olive bg-olive-tint px-3 py-1.5 text-olive-deep">
                <span aria-hidden="true">✓</span> Verified
              </p>
              <h1 className="display !text-[44px] md:!text-[72px]">This certificate is genuine.</h1>
              <p className="mt-6 max-w-[48ch] text-muted">
                It was issued by Kataf Academy to the person below, for completing the course shown.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded border border-ink bg-paper shadow-frame">
                <div className="border-b border-ink bg-olive-tint px-6 py-4">
                  <p className="label text-olive-deep">Kataf Academy · Certificate of Completion</p>
                </div>
                <dl className="px-6">
                  {[
                    ["Awarded to", result.name],
                    ["Course", result.course],
                    ["Issued", fmt(result.issuedOn)],
                    ["Certificate ID", result.code],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-line py-4 last:border-b-0">
                      <dt className="label text-muted">{k}</dt>
                      <dd className={`mt-1 ${k === "Certificate ID" ? "font-mono text-[16px] tracking-[0.06em]" : "font-serif text-[26px] leading-tight tracking-[-0.02em]"}`}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        )}

        {result.status === "revoked" && (
          <div className="max-w-[640px]">
            <h1 className="display !text-[44px] md:!text-[72px]">This certificate is no longer valid.</h1>
            <p className="mt-6 text-muted">
              The ID <span className="font-mono">{code}</span> exists, but Kataf Academy has withdrawn it. If you think this
              is a mistake, contact us.
            </p>
            <div className="mt-8">
              <Button href={whatsappLink(`Hi Kataf, about certificate ${code}.`)} external>
                Contact Kataf
              </Button>
            </div>
          </div>
        )}

        {(result.status === "not-found" || result.status === "limited") && (
          <div className="max-w-[640px]">
            <h1 className="display !text-[44px] md:!text-[72px]">
              {result.status === "limited" ? "Too many checks." : "We could not find that ID."}
            </h1>
            <p className="mt-6 text-muted">
              {result.status === "limited"
                ? "Please wait a few minutes and try again."
                : <>No certificate matches <span className="font-mono">{code}</span>. Check for a mistyped letter (the ID uses no 0, O, 1 or I), or ask the person to share the certificate again.</>}
            </p>
            <div className="mt-8 max-w-[520px]">
              <VerifyForm initial={result.status === "not-found" ? code : ""} />
            </div>
          </div>
        )}

        {result.status === "unavailable" && (
          <div className="max-w-[640px]">
            <h1 className="display !text-[44px] md:!text-[72px]">Check unavailable right now.</h1>
            <p className="mt-6 text-muted">We could not reach the certificate records. Please try again shortly, or contact us.</p>
            <div className="mt-8">
              <Button href={whatsappLink(`Hi Kataf, please verify certificate ${code}.`)} external>
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
