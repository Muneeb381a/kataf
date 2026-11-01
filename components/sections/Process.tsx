import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWords } from "@/components/ui/RevealWords";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { t: "Understand", d: "We watch how your business actually runs." },
  { t: "Design", d: "You see the screens before we write code." },
  { t: "Build", d: "Weekly updates, working software every week." },
  { t: "Support", d: "We stay with you after launch." },
];

export function Process() {
  return (
    <section className="section bg-paper-2">
      <div className="wrap">
        <SectionLabel num="02">Process</SectionLabel>
        <RevealWords className="h2 max-w-[18ch]" text="Four steps, and you are in the *room* for all of them." />

        <ol className="relative mt-16 grid gap-6 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="relative">
              <Reveal delay={i * 0.05}>
                <div className="overflow-hidden rounded border border-line bg-paper p-6">
                  <span
                    aria-hidden="true"
                    className="block font-serif text-[120px] leading-[0.8] tracking-[-0.04em] text-olive-tint"
                  >
                    {i + 1}
                  </span>
                  <p className="label mt-5 text-olive">Step 0{i + 1}</p>
                  <h3 className="h3 mt-2">{s.t}</h3>
                  <p className="mt-2 text-muted">{s.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
