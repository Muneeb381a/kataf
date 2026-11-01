import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <section className="py-24 md:py-40">
      <div className="wrap">
        <SectionLabel>404</SectionLabel>
        <h1 className="display max-w-[12ch]">That page is not here.</h1>
        <p className="mt-8 max-w-[44ch] text-muted">The link may be old, or mistyped. The products are a good place to start.</p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/" className="link-quiet font-medium text-olive">
            Back to home
          </Link>
          <Link href="/products" className="link-quiet font-medium text-olive">
            See products
          </Link>
        </div>
      </div>
    </section>
  );
}
