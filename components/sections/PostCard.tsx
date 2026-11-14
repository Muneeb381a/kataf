import Link from "next/link";
import { categoryBySlug, formatDate, type PostMeta } from "@/lib/blog";

/** A blog post as a card. `featured` makes it the large lead story. */
export function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  const cat = categoryBySlug(post.category);
  return (
    <article
      className={`group relative flex h-full flex-col rounded border border-ink bg-paper p-6 shadow-[4px_4px_0_#14130F] transition-transform hover:-translate-y-0.5 md:p-8 ${
        featured ? "lg:p-12" : ""
      }`}
    >
      <p className="label text-olive">{cat?.name}</p>
      <h2
        className={`mt-4 font-serif leading-[1.05] tracking-[-0.02em] ${
          featured ? "text-[34px] md:text-[56px]" : "text-[26px] md:text-[30px]"
        }`}
      >
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4">
          {post.title}
        </Link>
      </h2>
      <p className={`mt-4 text-muted ${featured ? "max-w-[52ch] text-[18px]" : ""}`}>{post.description}</p>
      <p className="label mt-auto pt-6 text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
    </article>
  );
}
