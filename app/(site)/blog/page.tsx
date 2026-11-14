import type { Metadata } from "next";
import Link from "next/link";
import { blogCategories, getAllPosts } from "@/lib/blog";
import { site, siteUrl } from "@/lib/config";
import { PostCard } from "@/components/sections/PostCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Blog: computer courses, careers and business software in Pakistan",
  description:
    "Practical guides from Al-Kausar Computer Institute: which computer courses to learn in Pakistan, how to start in web development and graphic designing, and how to choose business software.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/blog#blog`,
        url: `${siteUrl}/blog`,
        name: `${site.name} Blog`,
        description: "Guides on computer courses, careers and business software in Pakistan.",
        inLanguage: "en-PK",
        publisher: { "@type": "Organization", name: site.name, url: siteUrl },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${siteUrl}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="display max-w-[14ch] text-balance">Learn it here. Then do it.</h1>
          <p className="mt-6 max-w-[52ch] text-[18px] text-muted md:text-[20px]">
            Straight guides on computer courses, tech careers and business software in Pakistan, from the people who teach
            and build them.
          </p>
          <nav aria-label="Blog topics" className="mt-8 flex flex-wrap gap-3">
            <span className="label rounded border border-olive bg-olive px-3 py-2 text-paper">All posts</span>
            {blogCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="label rounded border border-ink/40 px-3 py-2 transition-colors hover:border-ink hover:bg-olive-tint"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap">
          {lead ? (
            <>
              <PostCard post={lead} featured />
              {rest.length > 0 && (
                <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="text-muted">New posts are coming soon.</p>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
