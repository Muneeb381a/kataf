import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductRow } from "@/components/sections/ProductRow";
import { Process } from "@/components/sections/Process";
import { CustomSplit } from "@/components/sections/CustomSplit";
import { Proof } from "@/components/sections/Proof";
import { WhyKataf } from "@/components/sections/WhyKataf";
import { TwoSides } from "@/components/sections/TwoSides";
import { CourseCards } from "@/components/sections/CourseCards";
import { RevealWords } from "@/components/ui/RevealWords";
import { Button } from "@/components/ui/Button";
import { GrownWithCare } from "@/components/sections/GrownWithCare";
import { Edge } from "@/components/ui/Edge";
import { CtaBand } from "@/components/sections/CtaBand";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        rows={[
          { label: "Build", items: ["Printing press", "Installments", "Clinics", "Custom software", "Websites"], tone: "ink" },
          {
            label: "Learn",
            items: ["Graphic design", "Web development", "Backend", "Full stack", "AI skills", "Digital marketing"],
            style: "mono",
            tone: "olive",
            reverse: true,
          },
        ]}
      />

      <TwoSides />

      <section className="section">
        <div className="wrap">
          <SectionLabel num="01">Products</SectionLabel>
          <RevealWords className="h2 max-w-[16ch]" text="Three products. Three *different* businesses." />
          <div className="mt-12 md:mt-16">
            {products.map((p, i) => (
              <ProductRow key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CustomSplit />
      <section className="section relative bg-paper-2">
        <Edge className="text-paper" />
        <div className="wrap">
          <SectionLabel num="04">Academy</SectionLabel>
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="h2 max-w-[16ch]">Learn the craft behind the software.</h2>
            <Button href="/academy" className="shrink-0">
              See all courses
            </Button>
          </div>
          <CourseCards />
          <ul className="label mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink pt-5 text-muted">
            {["Certificate with an ID anyone can verify", "Internship in every course", "Fee shared in writing"].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="text-olive" aria-hidden="true">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Proof />
      <GrownWithCare />
      <WhyKataf />
      <CtaBand />
    </>
  );
}
