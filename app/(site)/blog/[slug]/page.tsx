import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { categoryBySlug, formatDate, getAllPosts, getHeadings, getPost, getRelated, slugify } from "@/lib/blog";
import { site, siteUrl } from "@/lib/config";
import { getCourse } from "@/lib/courses";
import { getProduct } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PostCard } from "@/components/sections/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.seoTitle ?? meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `/blog/${meta.slug}` },
    authors: [{ name: site.name, url: siteUrl }],
    openGraph: {
      type: "article",
      title: meta.seoTitle ?? meta.title,
      description: meta.description,
      url: `/blog/${meta.slug}`,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      section: categoryBySlug(meta.category)?.name,
      tags: meta.tags,
    },
  };
}

const text = (node: React.ReactNode): string =>
  typeof node === "string" ? node : Array.isArray(node) ? node.map(text).join("") : "";

const components = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 id={slugify(text(p.children))} className="h3 mb-4 mt-14 scroll-mt-24 border-t border-ink pt-5" {...p} />
  ),
  h3: (p: React.ComponentProps<"h3">) => (
    <h3 id={slugify(text(p.children))} className="mb-3 mt-9 scroll-mt-24 font-serif text-[22px] leading-snug tracking-[-0.01em]" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => <p className="mb-5 max-w-[66ch] text-[18px] leading-[1.7] text-ink/85" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => (
    <ul className="mb-6 max-w-[66ch] list-disc space-y-2 pl-5 text-[18px] leading-[1.65] text-ink/85 marker:text-olive" {...p} />
  ),
  ol: (p: React.ComponentProps<"ol">) => (
    <ol className="mb-6 max-w-[66ch] list-decimal space-y-2 pl-5 text-[18px] leading-[1.65] text-ink/85 marker:font-mono marker:text-olive" {...p} />
  ),
  strong: (p: React.ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...p} />,
  blockquote: (p: React.ComponentProps<"blockquote">) => (
    <blockquote className="my-8 max-w-[60ch] border-l-4 border-wheat bg-olive-tint/60 px-6 py-4 font-serif text-[22px] leading-snug text-ink" {...p} />
  ),
  a: ({ href = "", ...p }: React.ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-medium text-olive underline decoration-olive/40 underline-offset-4 hover:decoration-olive" {...p} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-olive underline decoration-olive/40 underline-offset-4 hover:decoration-olive" {...p} />
    ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, content } = post;
  const cat = categoryBySlug(meta.category);
  const headings = getHeadings(content);
  const related = getRelated(meta);
  const url = `${siteUrl}/blog/${meta.slug}`;

  const course = meta.cta?.kind === "course" ? getCourse(meta.cta.slug) : undefined;
  const product = meta.cta?.kind === "product" ? getProduct(meta.cta.slug) : undefined;

  const org = { "@type": "Organization", name: site.name, url: siteUrl, logo: { "@type": "ImageObject", url: `${siteUrl}/logo/alkausar.png` } };
  const graph: object[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: meta.title,
      description: meta.description,
      datePublished: meta.date,
      dateModified: meta.updated ?? meta.date,
      inLanguage: "en-PK",
      keywords: meta.keywords.join(", "),
      articleSection: cat?.name,
      wordCount: content.split(/\s+/).filter(Boolean).length,
      image: `${siteUrl}/logo/alkausar.png`,
      mainEntityOfPage: url,
      author: org,
      publisher: org,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: cat?.name ?? "Posts", item: `${siteUrl}/blog/category/${meta.category}` },
        { "@type": "ListItem", position: 4, name: meta.title, item: url },
      ],
    },
  ];
  if (meta.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: meta.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  const share = `https://wa.me/?text=${encodeURIComponent(`${meta.title} ${url}`)}`;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <article className="pt-12 md:pt-20">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2 text-muted">
            <Link href="/" className="link-quiet">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="link-quiet">Blog</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/blog/category/${meta.category}`} className="link-quiet">{cat?.name}</Link>
          </nav>

          <header className="mt-8">
            <SectionLabel>{cat?.name}</SectionLabel>
            <h1 className="display max-w-[15em] text-balance !text-[38px] md:!text-[56px] lg:!text-[64px]">{meta.title}</h1>
          </header>
          <p className="mt-6 max-w-[56ch] font-serif text-[22px] leading-snug text-muted md:text-[26px]">{meta.description}</p>
          <p className="label mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
            <span>By {site.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            {meta.updated && meta.updated !== meta.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time></span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{meta.readingMinutes} min read</span>
          </p>

          <div className="mt-12 grid gap-12 border-t border-ink pt-12 lg:grid-cols-12 lg:gap-x-10">
            <aside className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
              <div className="lg:sticky lg:top-28">
                {headings.length > 1 && (
                  <nav aria-label="In this article">
                    <p className="label mb-4 text-olive">In this article</p>
                    <ol className="space-y-3 border-l border-line pl-4 text-[15px]">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="text-muted transition-colors hover:text-olive">
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <a href={share} target="_blank" rel="noopener noreferrer" className="label link-quiet mt-8 inline-block text-olive">
                  Share on WhatsApp ↗
                </a>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5 [&>h2:first-child]:mt-0 [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0">
              <MDXRemote source={content} components={components} />

              {(course || product) && (
                <aside className="mt-14 rounded border border-ink bg-olive-tint p-6 shadow-[4px_4px_0_#14130F] md:p-8">
                  <p className="label text-olive-deep">{course ? "Learn this with us" : "See it in action"}</p>
                  <p className="mt-3 font-serif text-[28px] leading-tight tracking-[-0.02em]">{course?.name ?? product?.name}</p>
                  <p className="mt-2 max-w-[52ch] text-olive-deep/90">{course?.tagline ?? product?.promise}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={course ? `/academy/${course.slug}` : `/products/${product!.slug}`}>
                      {course ? "See the course" : "See the product"}
                    </Button>
                    <Button href={course ? "/apply" : "/contact"} variant="outline" arrow={false}>
                      {course ? "Apply now" : "Get a Quote"}
                    </Button>
                  </div>
                </aside>
              )}

              {meta.faqs.length > 0 && (
                <section className="mt-16" aria-labelledby="faq">
                  <h2 id="faq" className="h3 mb-2 border-t border-ink pt-5">Frequently asked questions</h2>
                  <dl>
                    {meta.faqs.map((f) => (
                      <div key={f.q} className="border-b border-line py-5">
                        <dt className="font-serif text-[22px] leading-snug tracking-[-0.01em]">{f.q}</dt>
                        <dd className="mt-2 max-w-[62ch] text-[17px] leading-relaxed text-muted">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="wrap">
            <p className="label mb-8 text-olive">Keep reading</p>
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
