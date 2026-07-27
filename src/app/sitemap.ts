import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Wird unter /sitemap.xml ausgeliefert. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" | "weekly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" },
    { path: "/buchung", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ueber-uns", priority: 0.7, changeFrequency: "yearly" },
    { path: "/kontakt", priority: 0.8, changeFrequency: "yearly" },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${site.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
