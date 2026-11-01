import { ogImage, ogSize } from "@/lib/og";
import { getProduct, products } from "@/lib/products";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  return ogImage(`Kataf · Product ${p?.num ?? ""}`, p ? `${p.name}. ${p.outcomes[0]}` : "Kataf");
}
