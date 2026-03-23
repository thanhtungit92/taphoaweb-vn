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
      url: `${siteUrl}/gia-vang-hom-nay`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${siteUrl}/top-10-cong-cu-ai`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
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
    {
      url: `${siteUrl}/khoa-hoc-lam-website-voi-ai-chi-phi-thap`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/giai-phap-trading-bot-tu-dong`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/cach-tu-lam-website-voi-ai-tu-a-z-cho-nguoi-khong-biet-code`,
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
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4
    }
  ];
}
