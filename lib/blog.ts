import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const blogCategories = [
  {
    slug: "courses-and-careers",
    name: "Courses and careers",
    title: "Computer courses and tech careers in Pakistan",
    description:
      "Guides for students in Pakistan: which computer courses to take, how to learn web development, graphic designing and freelancing skills, and how to get your first work.",
  },
  {
    slug: "business-software",
    name: "Business software",
    title: "Business software guides for Pakistani shops and presses",
    description:
      "Plain guides for shop, press and clinic owners in Pakistan: what business software should do, how to keep records, and how to choose a system that fits.",
  },
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type Faq = { q: string; a: string };

export type PostMeta = {
  slug: string;
  title: string;
  /** Optional shorter title for the <title> tag. */
  seoTitle?: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory["slug"];
  tags: string[];
  keywords: string[];
  faqs: Faq[];
  cta?: { kind: "course" | "product"; slug: string };
  readingMinutes: number;
};

const dir = path.join(process.cwd(), "content", "blog");

export const categoryBySlug = (slug: string) => blogCategories.find((c) => c.slug === slug);

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** gray-matter turns an unquoted YAML date into a Date; accept both that and a plain string. */
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v)).slice(0, 10);

function read(file: string) {
  const slug = file.replace(/\.mdx$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta = {
    slug,
    tags: [],
    keywords: [],
    faqs: [],
    ...data,
    date: isoDate(data.date),
    updated: data.updated ? isoDate(data.updated) : undefined,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  } as unknown as PostMeta;
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => read(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export function getPost(slug: string) {
  const file = `${slug}.mdx`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(dir, file))) return null;
  return read(file);
}

/** The h2 headings of a post, for the table of contents. */
export function getHeadings(content: string) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ text: m[1].trim(), id: slugify(m[1]) }));
}

/** Posts that share a category or tags with this one, newest first. */
export function getRelated(post: PostMeta, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
