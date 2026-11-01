import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WorkType = "Products" | "Websites" | "Software";

export type WorkMeta = {
  slug: string;
  title: string;
  type: WorkType;
  summary: string;
  problem: string;
  result: string;
  /** screenshot key inside /public/screens (without .webp) */
  cover: string;
  coverLabel: string;
  order: number;
};

const dir = path.join(process.cwd(), "content", "work");

export function getAllWork(): WorkMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: f.replace(/\.mdx$/, ""), ...data } as WorkMeta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getWork(slug: string) {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: { slug, ...data } as WorkMeta, content };
}
