import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { RevealWords } from "@/components/ui/RevealWords";
import { Wheat } from "@/components/ui/Wheat";

const reasons = [
  { t: "WhatsApp built in", d: "Orders, dues and reminders go where your customers already are." },
  { t: "Local payments", d: "JazzCash, Easypaisa, bank transfer." },
  { t: "On-site and remote support", d: "We come to you or fix it over a call." },
  { t: "Your data is yours", d: "Export anytime, no lock-in." },
  { t: "Talk to the developer", d: "No sales layer between you and the people building it." },
];

export function WhyKataf() {
  return (
    <section className="on-dark section relative overflow-hidden bg-ink text-paper">
      <Wheat className="pointer-events-none absolute -bottom-24 left-[2%] hidden h-[620px] -rotate-[10deg] text-olive-tint/15 lg:block" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label mb-5 text-olive-tint">07 / Why</p>
            <RevealWords className="h2" italicClassName="italic text-olive-tint" text="Local business. *Local software.*" />
            <p className="mt-6 max-w-[34ch] text-paper/70">
              Made by people who answer your call, in your city, in your language.
            </p>
          </div>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {reasons.map((r, i) => (
            <li key={r.t} className="border-t border-paper/25">
              <Reveal className="grid grid-cols-[3rem_1fr] gap-x-4 py-7">
                <span className="label pt-2 text-olive-tint">0{i + 1}</span>
                <div>
                  <h3 className="h3">{r.t}</h3>
                  <p className="mt-2 max-w-[44ch] text-paper/70">{r.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="border-t border-paper/25" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
