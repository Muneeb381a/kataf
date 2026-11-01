import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Screen } from "@/components/ui/Screen";
import { Reveal } from "@/components/ui/Reveal";

export const customExamples = [
  "Rice trading POS with batch-wise costing",
  "Construction material ERP",
  "School and academy portals",
];

export function CustomSplit() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionLabel num="03">Custom</SectionLabel>
        <h2 className="h2 max-w-[20ch]">Your business is not on our product list? Good.</h2>

        <div className="mt-14 grid md:mt-20 md:grid-cols-2">
          <Reveal className="border-t border-ink pb-12 pt-8 md:pb-0 md:pr-12">
            <h3 className="h3 !text-[32px] md:!text-[40px]">Custom Software</h3>
            <p className="mt-4 max-w-[40ch] text-muted">
              Some businesses do not fit a ready-made product. We sit with you, learn the process, and build the system
              around it, not the other way round.
            </p>
            <ul className="mt-8 border-t border-line">
              {customExamples.map((e) => (
                <li key={e} className="flex items-baseline gap-4 border-b border-line py-4">
                  <span aria-hidden="true" className="label text-olive">
                    →
                  </span>
                  {e}
                </li>
              ))}
            </ul>
            <Button href="/contact?interest=Custom%20Software" className="mt-10">
              Get a Quote
            </Button>
          </Reveal>

          <Reveal className="border-t border-ink pt-8 md:border-l md:pl-12" delay={0.05}>
            <h3 className="h3 !text-[32px] md:!text-[40px]">Custom Websites</h3>
            <p className="mt-4 max-w-[40ch] text-muted">
              A fast, clear website for your press, shop, clinic or school. It loads on a weak mobile connection and
              sends enquiries straight to your WhatsApp.
            </p>
            <div className="mt-8">
              <LaptopFrame>
                <Screen src="websites/01-sample" label="Sample website" sizes="(min-width: 768px) 460px, 100vw" />
              </LaptopFrame>
            </div>
            <Button href="/contact?interest=Custom%20Website" className="mt-10">
              Get a Quote
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[520px]">
      <div className="overflow-hidden rounded-t border-2 border-ink bg-ink p-1.5 pb-0">
        <div className="overflow-hidden">{children}</div>
      </div>
      <div className="h-3 rounded-b border-x-2 border-b-2 border-ink bg-paper-2" />
      <div className="mx-auto h-1 w-1/3 bg-ink" />
    </div>
  );
}
