import { ogImage, ogSize } from "@/lib/og";
import { categoryBySlug, getAllPosts, getPost } from "@/lib/blog";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Al-Kausar blog post";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return ogImage("Al-Kausar blog", "Al-Kausar");
  return ogImage(`Blog · ${categoryBySlug(post.meta.category)?.name ?? ""}`, post.meta.title);
}
