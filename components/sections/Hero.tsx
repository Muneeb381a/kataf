import { Button, TextLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { HandUnderline } from "@/components/ui/HandUnderline";
import { Screen } from "@/components/ui/Screen";
import { Wheat } from "@/components/ui/Wheat";

const assurances = ["Software for business", "Courses in code, design, AI and marketing", "WhatsApp built in"];

export function Hero() {
  return (
    <section className="ledger relative overflow-x-clip border-b border-line">
      {/* harvest motif */}
      <Wheat delay={0.5} className="pointer-events-none absolute -bottom-10 left-[44%] hidden h-[640px] rotate-[14deg] text-olive/45 lg:block" />
      <Wheat
        delay={1.1}
        strokeWidth={1.3}
        className="pointer-events-none absolute -top-20 left-[38%] hidden h-[420px] -rotate-[8deg] text-olive/30 lg:block"
      />

      <div className="wrap relative grid min-h-[calc(100svh-64px)] items-center gap-14 py-14 lg:grid-cols-12 lg:gap-x-6 lg:py-10">
        <div className="lg:col-span-6">
          <p style={{ "--d": "0s" } as React.CSSProperties} className="rise label mb-8 inline-flex items-center gap-3 rounded border border-line bg-paper px-3 py-1.5 text-olive">
            <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
            Software house · Academy · Pakistan
          </p>
          <h1 style={{ "--d": ".1s" } as React.CSSProperties} className="rise display">
            Software that works the{" "}
            <span className="relative inline-block whitespace-nowrap font-serif italic text-olive">
              way
              <HandUnderline animated className="-bottom-1 h-[0.16em] md:-bottom-2" />
            </span>{" "}
            your business does.
          </h1>
          <p style={{ "--d": ".25s" } as React.CSSProperties} className="rise mt-8 max-w-[44ch] text-muted">
            We build Printing ERP, Installment Manager, Doctor ERP and custom software for Pakistani businesses, and we teach design, web development, AI and marketing at Kataf Academy.
          </p>
          <div style={{ "--d": ".4s" } as React.CSSProperties} className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href="/contact">Get a Quote</Button>
            <TextLink href="/academy">Explore the Academy</TextLink>
          </div>
          <ul style={{ "--d": ".55s" } as React.CSSProperties} className="rise label mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-muted">
            {assurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="text-olive" aria-hidden="true">
                  ✓
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: main frame bleeds off the right edge, smaller one sits behind, rotated */}
        <div className="relative lg:col-span-6 lg:pb-16">
          <div style={{ "--d": ".3s" } as React.CSSProperties} className="slide-in relative lg:-mr-[max(48px,calc((100vw-1240px)/2+48px))]">
            <div className="absolute -bottom-10 -left-3 hidden w-[58%] -rotate-2 lg:block">
              <BrowserFrame url="app.kataf.pk/installments">
                <Screen src="installment/01-dashboard" label="Installment Manager dashboard" sizes="400px" />
              </BrowserFrame>
            </div>
            <BrowserFrame url="app.kataf.pk/printing/dashboard" className="relative lg:ml-[14%]">
              <Screen
                src="printing-erp/01-dashboard"
                label="Printing ERP dashboard"
                priority
                sizes="(min-width: 1100px) 760px, 100vw"
              />
            </BrowserFrame>

            {/* annotation callouts */}
            <p style={{ "--d": "1.2s" } as React.CSSProperties} className="pop label absolute -top-4 right-[18%] z-10 hidden rotate-2 rounded bg-ink px-3 py-1.5 text-paper lg:block">
              Outstanding, live ↓
            </p>
            <p style={{ "--d": "1.45s" } as React.CSSProperties} className="pop label absolute -bottom-3 left-[6%] z-10 hidden -rotate-2 rounded bg-olive px-3 py-1.5 text-paper lg:block">
              Udhaar per customer
            </p>
            <p
              style={{ "--d": "1.7s" } as React.CSSProperties}
              className="pop absolute -right-1 bottom-[-18px] z-10 hidden rounded border border-ink bg-paper px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] shadow-[3px_3px_0_#14130F] lg:block"
            >
              <span className="text-olive">✓</span> Certificate verified
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
