import { Button, TextLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { HandUnderline } from "@/components/ui/HandUnderline";
import { Screen } from "@/components/ui/Screen";
import { Wheat } from "@/components/ui/Wheat";
import { CertificateArt } from "@/components/ui/CertificateArt";
import { CountUp } from "@/components/ui/CountUp";
import { courses } from "@/lib/courses";
import { moduleCount, products } from "@/lib/products";

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

const stats = [
  { n: products.length, l: "Ready-made products" },
  { n: moduleCount, l: "Modules inside them" },
  { n: courses.length, l: "Academy courses" },
];

export function Hero() {
  return (
    <section className="relative overflow-x-clip border-b border-line">
      <Wheat
        delay={0.9}
        strokeWidth={1.4}
        className="pointer-events-none absolute -bottom-24 right-[28%] hidden h-[560px] rotate-[8deg] text-olive/25 lg:block"
      />

      <div className="wrap relative pb-10 pt-10 md:pt-16">
        <p style={d("0s")} className="rise label mb-7 inline-flex items-center gap-3 rounded border border-line bg-paper px-3 py-1.5 text-olive">
          <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
          Software house · Academy · Pakistan
        </p>

        <h1
          style={d(".08s")}
          className="rise display max-w-[18ch] lg:max-w-none lg:!text-[min(6.9vw,84px)] lg:leading-[1]"
        >
          <span className="lg:block">
            Software that works the{" "}
            <span className="relative inline-block whitespace-nowrap font-serif italic text-olive">
              way
              <HandUnderline animated className="-bottom-1 h-[0.15em] md:-bottom-2" />
            </span>
          </span>{" "}
          <span className="lg:block">your business does.</span>
        </h1>

        <div className="mt-10 grid items-start gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-x-6">
          {/* left: what we do, and the two ways in */}
          <div className="lg:col-span-5 lg:pt-4">
            <p style={d(".22s")} className="rise max-w-[40ch] text-[18px] leading-relaxed text-muted md:text-[20px]">
              We build Printing ERP, Installment Manager, Doctor ERP and custom software for Pakistani businesses, and teach
              design, code, AI and marketing at Kataf Academy.
            </p>

            <div style={d(".34s")} className="rise mt-9 flex flex-wrap items-center gap-x-4 gap-y-4">
              <Button href="/contact">Get a Quote</Button>
              <Button href="/apply" variant="outline">
                Join the Academy
              </Button>
            </div>

            <div style={d(".46s")} className="rise mt-9">
              <TextLink href="/products">See what we have built</TextLink>
            </div>
          </div>

          {/* right: product, a second product behind it, and a certificate on top */}
          <div className="relative lg:col-span-7">
            <div
              style={d(".3s")}
              className="slide-in relative pb-16 pt-16 lg:-mr-[max(48px,calc((100vw-1240px)/2+48px))] lg:pb-20"
            >
              <div className="absolute bottom-0 left-0 z-10 hidden w-[46%] -rotate-2 lg:block">
                <BrowserFrame url="app.kataf.pk/installments">
                  <Screen src="installment/01-dashboard" label="Installment Manager dashboard" sizes="340px" />
                </BrowserFrame>
              </div>

              <BrowserFrame url="app.kataf.pk/printing/dashboard" className="relative lg:ml-[8%]">
                <Screen
                  src="printing-erp/01-dashboard"
                  label="Printing ERP dashboard"
                  priority
                  sizes="(min-width: 1100px) 760px, 100vw"
                />
              </BrowserFrame>

              <p
                style={d("1.1s")}
                className="pop label absolute right-[36%] top-[34px] z-20 hidden rotate-1 rounded bg-ink px-3 py-1.5 text-paper lg:block"
              >
                Outstanding, live ↓
              </p>

              <div style={d("1.3s")} className="pop absolute right-[3%] -top-2 z-20 hidden w-[27%] rotate-3 lg:block">
                <CertificateArt course="Full Stack Development" className="block h-auto w-full shadow-frame" />
                <p className="label absolute -bottom-3 left-3 rounded border border-ink bg-paper px-2 py-1 text-[10px] shadow-[2px_2px_0_#14130F]">
                  <span className="text-olive">✓</span> Verified online
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* facts strip */}
      <div className="wrap relative">
        <dl className="grid grid-cols-3 border-t border-ink md:grid-cols-4 md:divide-x md:divide-line">
          {stats.map((s) => (
            <div key={s.l} className="border-l border-line py-6 pl-4 first:border-l-0 first:pl-0 md:border-l-0 md:px-6 md:first:pl-0">
              <dd className="font-serif text-[36px] leading-none tracking-[-0.03em] md:text-[56px]">
                <CountUp to={s.n} />
              </dd>
              <dt className="label mt-2 text-muted">{s.l}</dt>
            </div>
          ))}
          <div className="col-span-3 border-t border-line py-6 md:col-span-1 md:border-t-0 md:px-6">
            <dd className="font-serif text-[44px] leading-none tracking-[-0.03em] text-olive md:text-[56px]">✓</dd>
            <dt className="label mt-2 text-muted">Internship + verifiable certificate</dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
