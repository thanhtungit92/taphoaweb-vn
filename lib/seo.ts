import type { Metadata } from "next";

import type { HomepageData } from "@/lib/types";

const DEFAULT_SITE_NAME = "Cổng thông tin Việt";

export const homepageSeo = {
  title: "Lịch trực tuyến tiện lợi cho người dùng Việt Nam",
  description:
    "Tra cứu lịch trực tuyến nhanh, rõ ràng và dễ dùng. Phù hợp để xem lịch dương, theo dõi ngày trong tháng và truy cập nhanh trang lịch mỗi ngày.",
  keywords: [
    "lịch trực tuyến",
    "xem lịch online",
    "lịch dương",
    "tra cứu lịch",
    "lịch tiện lợi"
  ],
  ogImage: "/og/home-og.svg",
  canonicalPath: "/"
};

export function getSiteUrl(): string {
  const siteUrl = process.env.SITE_URL?.trim();
  return siteUrl && /^https?:\/\//.test(siteUrl) ? siteUrl : "http://localhost:3000";
}

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const siteUrl = getSiteUrl();
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteUrl}${normalizedPath}`;
}

export function buildHomepageMetadata(): Metadata {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || DEFAULT_SITE_NAME;
  const canonical = absoluteUrl(homepageSeo.canonicalPath);
  const ogImage = absoluteUrl(homepageSeo.ogImage);

  return {
    title: homepageSeo.title,
    description: homepageSeo.description,
    keywords: homepageSeo.keywords,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: canonical,
      siteName,
      title: homepageSeo.title,
      description: homepageSeo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Lịch trực tuyến tiện lợi cho người dùng Việt Nam"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: homepageSeo.title,
      description: homepageSeo.description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function buildHomepageStructuredData(data: HomepageData) {
  const siteUrl = getSiteUrl();
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || DEFAULT_SITE_NAME,
    url: siteUrl,
    inLanguage: "vi-VN",
    description: homepageSeo.description
  };

  const itemListElements = data.topics.flatMap((topic) =>
    topic.items.map((item) => ({
      "@type": "ListItem",
      position: item.order,
      name: item.name,
      url: absoluteUrl(item.redirectUrl),
      description: item.shortDescription
    }))
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Danh sách nội dung đang hiển thị",
    inLanguage: "vi-VN",
    numberOfItems: itemListElements.length,
    itemListElement: itemListElements
  };

  return { websiteSchema, itemListSchema };
}
