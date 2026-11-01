import { Button } from "@/components/ui/Button";
import { Edge } from "@/components/ui/Edge";
import { RevealWords } from "@/components/ui/RevealWords";
import { Wheat } from "@/components/ui/Wheat";
import { whatsappDisplay, whatsappLink } from "@/lib/config";

export function CtaBand() {
  return (
    <section className="on-dark relative overflow-hidden bg-olive-deep text-paper">
      <Edge className="text-ink" />
      <Wheat className="pointer-events-none absolute -right-6 -top-10 hidden h-[520px] rotate-[18deg] text-paper/10 md:block" />
      <Wheat className="pointer-events-none absolute right-[22%] -bottom-24 hidden h-[420px] -rotate-[12deg] text-paper/10 md:block" />
      <div className="wrap relative flex flex-col gap-10 py-20 md:py-32">
        <p className="label text-wheat">Start here</p>
        <RevealWords
          text="Need software for your *business?*"
          italicClassName="italic text-wheat"
          className="max-w-[14ch] text-[44px] leading-[1] md:text-[88px]"
        />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/contact" variant="paper">
            Get a Quote
          </Button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="label rounded border border-paper/50 px-5 py-4 transition-colors hover:bg-paper hover:text-ink"
          >
            WhatsApp {whatsappDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
