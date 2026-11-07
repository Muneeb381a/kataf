import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Wheat } from "@/components/ui/Wheat";
import { VerifyForm } from "@/components/sections/VerifyForm";
import { CertificateArt } from "@/components/ui/CertificateArt";
import { AlKausarLogo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Verify a certificate",
  description: "Check that a Kataf Academy certificate is genuine using its certificate ID.",
  alternates: { canonical: "/verify" },
};

export default function VerifyPage() {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 md:pb-32 md:pt-24">
      <Wheat className="pointer-events-none absolute -right-6 -top-6 hidden h-[520px] rotate-[12deg] text-olive/15 lg:block" />
      <div className="wrap relative grid gap-14 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6">
          <AlKausarLogo className="mb-10 h-20 w-auto" />
          <SectionLabel>Certificate verification</SectionLabel>
          <h1 className="display max-w-[12ch]">Is this certificate real?</h1>
          <p className="mt-8 max-w-[44ch] text-muted">
            Every Kataf Academy certificate has a unique ID printed on it. Type it here and we will show you who it was
            issued to, for which course, and when.
          </p>
          <div className="mt-10 max-w-[520px]">
            <VerifyForm />
          </div>
          <p className="label mt-8 text-muted">The ID looks like KTF-2026-A7K3PQ, top left of the certificate.</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="stage p-5 md:p-8">
            <CertificateArt
              course="Course name"
              className="mx-auto block h-auto w-full -rotate-2 shadow-frame"
            />
            <p className="label mt-5 text-center text-olive-deep">Find the ID here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
