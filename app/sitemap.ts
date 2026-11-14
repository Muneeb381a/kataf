import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { products } from "@/lib/products";
import { courses } from "@/lib/courses";
import { getAllWork } from "@/lib/work";
import { blogCategories, getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/products", "/services", "/academy", "/apply", "/verify", "/work", "/blog", "/about", "/contact"];
  return [
    ...staticPaths.map((p) => ({ url: `${siteUrl}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, priority: 0.9 })),
    ...courses.map((c) => ({ url: `${siteUrl}/academy/${c.slug}`, priority: 0.9 })),
    ...getAllWork().map((w) => ({ url: `${siteUrl}/work/${w.slug}`, priority: 0.5 })),
    ...blogCategories.map((c) => ({ url: `${siteUrl}/blog/category/${c.slug}`, priority: 0.6 })),
    ...getAllPosts().map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date((p.updated ?? p.date) + "T00:00:00Z"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
