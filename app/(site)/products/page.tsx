import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductRow } from "@/components/sections/ProductRow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Products",
  description: "Printing ERP, Installment Manager and Doctor ERP: ready-made software for presses, shops and clinics in Pakistan.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <SectionLabel>Products</SectionLabel>
          <h1 className="display max-w-[14ch]">Ready-made, and made for you.</h1>
          <p className="mt-8 max-w-[48ch] text-muted">
            Three products for three kinds of Pakistani business. Each one was designed around the registers, slips and
            WhatsApp groups that were already there.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap">
          {products.map((p, i) => (
            <ProductRow key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="wrap flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <p className="label mb-4 text-olive">Not one of these?</p>
            <h2 className="h2 max-w-[18ch]">We also build software from scratch.</h2>
            <p className="mt-4 max-w-[48ch] text-muted">
              Rice trading, construction material, schools and academies. If your business has its own way of working,
              we build around it.
            </p>
          </div>
          <Button href="/services#software" className="shrink-0">
            See custom software
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
