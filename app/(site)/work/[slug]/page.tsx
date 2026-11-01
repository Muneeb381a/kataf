import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWork, getWork } from "@/lib/work";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Screen } from "@/components/ui/Screen";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  return {
    title: w.meta.title,
    description: w.meta.summary,
    alternates: { canonical: `/work/${w.meta.slug}` },
  };
}

const components = {
  h2: (p: React.ComponentProps<"h2">) => <h2 className="h3 mb-4 mt-14 border-t border-ink pt-5" {...p} />,
  p: (p: React.ComponentProps<"p">) => <p className="mb-5 max-w-[60ch] text-muted" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => <ul className="mb-6 max-w-[60ch] list-disc space-y-2 pl-5 marker:text-olive" {...p} />,
  Shot: ({ src, label }: { src: string; label: string }) => (
    <BrowserFrame url="app.kataf.pk" className="my-10">
      <Screen src={src} label={label} />
    </BrowserFrame>
  ),
};

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const w = getWork((await params).slug);
  if (!w) notFound();
  const { meta, content } = w;

  return (
    <>
      <article className="pt-14 md:pt-24">
        <div className="wrap">
          <Link href="/work" className="label link-quiet text-olive">
            ← All work
          </Link>
          <div className="mt-8">
            <SectionLabel>{meta.type}</SectionLabel>
          </div>
          <h1 className="display max-w-[16ch] !text-[44px] md:!text-[72px]">{meta.title}</h1>
          <p className="mt-6 max-w-[48ch] font-serif text-[24px] leading-snug text-muted">{meta.summary}</p>

          <BrowserFrame url={`app.kataf.pk/${meta.slug}`} className="mt-14">
            <Screen src={meta.cover} label={meta.coverLabel} priority sizes="(min-width: 1240px) 1144px, 100vw" />
          </BrowserFrame>

          <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-x-6">
            <dl className="space-y-6 lg:col-span-3">
              <div>
                <dt className="label text-muted">Problem</dt>
                <dd className="mt-1">{meta.problem}</dd>
              </div>
              <div>
                <dt className="label text-muted">Result</dt>
                <dd className="mt-1">{meta.result}</dd>
              </div>
            </dl>
            <div className="lg:col-span-7 lg:col-start-5 [&>h2:first-child]:mt-0 [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0">
              <MDXRemote source={content} components={components} />
            </div>
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
