import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductRow } from "@/components/sections/ProductRow";
import { Process } from "@/components/sections/Process";
import { CustomSplit } from "@/components/sections/CustomSplit";
import { Proof } from "@/components/sections/Proof";
import { WhyKataf } from "@/components/sections/WhyKataf";
import { TwoSides } from "@/components/sections/TwoSides";
import { AcademyDoor } from "@/components/sections/AcademyDoor";
import { RevealWords } from "@/components/ui/RevealWords";
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
            tone: "academy",
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
      <AcademyDoor />

      <Proof />
      <GrownWithCare />
      <WhyKataf />
      <CtaBand />
    </>
  );
}
