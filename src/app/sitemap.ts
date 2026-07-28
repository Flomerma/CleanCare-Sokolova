import type { MetadataRoute } from "next";
import { services } from "@/config/services";
import { site } from "@/config/site";

type Frequency = "weekly" | "monthly" | "yearly";

/** Wird unter /sitemap.xml ausgeliefert. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: Frequency }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" },
    // Jede Leistung hat eine eigene Seite – wichtig für die lokale Suche.
    ...services.map((service) => ({
      path: `/leistungen/${service.id}`,
      priority: 0.8,
      changeFrequency: "monthly" as Frequency,
    })),
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
