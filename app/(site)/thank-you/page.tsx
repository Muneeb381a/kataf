import type { Metadata } from "next";
import Link from "next/link";
import { whatsappLink } from "@/lib/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const apply = (await searchParams).type === "apply";
  return (
    <section className="py-24 md:py-40">
      <div className="wrap">
        <SectionLabel>Received</SectionLabel>
        <h1 className="display max-w-[12ch]">{apply ? "Application received." : "Thank you. We have it."}</h1>
        <p className="mt-8 max-w-[44ch] text-muted">
          {apply
            ? "We will message you on WhatsApp with the fee, the next batch date and what to bring. If you would rather talk now, message us."
            : "We will read what you wrote and reply on the number you gave us. If it is urgent, message us on WhatsApp now."}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={whatsappLink()} external>
            Open WhatsApp
          </Button>
          <Link href={apply ? "/academy" : "/"} className="link-quiet text-olive">
            {apply ? "Back to the Academy" : "Back to home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
