import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCategories, categoryBySlug, getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/config";
import { PostCard } from "@/components/sections/PostCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = categoryBySlug((await params).category);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/blog/category/${c.slug}` },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = categoryBySlug((await params).category);
  if (!c) notFound();
  const posts = getAllPosts().filter((p) => p.category === c.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${siteUrl}/blog/category/${c.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <Link href="/blog" className="label link-quiet text-olive">
            ← All posts
          </Link>
          <div className="mt-8">
            <SectionLabel>{c.name}</SectionLabel>
          </div>
          <h1 className="display max-w-[16ch] text-balance !text-[40px] md:!text-[64px]">{c.title}</h1>
          <p className="mt-6 max-w-[52ch] text-[18px] text-muted">{c.description}</p>
          <nav aria-label="Blog topics" className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="label rounded border border-ink/40 px-3 py-2 transition-colors hover:border-ink hover:bg-olive-tint">
              All posts
            </Link>
            {blogCategories.map((x) =>
              x.slug === c.slug ? (
                <span key={x.slug} className="label rounded border border-olive bg-olive px-3 py-2 text-paper">
                  {x.name}
                </span>
              ) : (
                <Link
                  key={x.slug}
                  href={`/blog/category/${x.slug}`}
                  className="label rounded border border-ink/40 px-3 py-2 transition-colors hover:border-ink hover:bg-olive-tint"
                >
                  {x.name}
                </Link>
              ),
            )}
          </nav>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="wrap">
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
