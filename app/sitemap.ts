import type { MetadataRoute } from "next";

import { getDailyHoroscopeEntries } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const [animalEntries, zodiacEntries] = await Promise.all([
    getDailyHoroscopeEntries("12-con-giap"),
    getDailyHoroscopeEntries("cung-hoang-dao")
  ]);

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/lich`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${siteUrl}/tu-vi-12-con-giap`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/tu-vi-cung-hoang-dao`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/hat-hoi-theo-gio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    },
    ...animalEntries.map((entry) => ({
      url: `${siteUrl}/tu-vi-12-con-giap/${entry.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.7
    })),
    ...zodiacEntries.map((entry) => ({
      url: `${siteUrl}/tu-vi-cung-hoang-dao/${entry.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.7
    })),
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4
    }
  ];
}
