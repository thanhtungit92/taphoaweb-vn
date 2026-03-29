import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getDailyHoroscopeBySlug, getDailyHoroscopeEntries } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getDailyHoroscopeEntries("cung-hoang-dao");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getDailyHoroscopeBySlug("cung-hoang-dao", slug);

  if (!entry) {
    return {};
  }

  const canonical = `${getSiteUrl()}${entry.seo.canonicalUrl ?? `/tu-vi-cung-hoang-dao/${entry.slug}`}`;
  const ogImage = entry.seo.ogImage ? `${getSiteUrl()}${entry.seo.ogImage}` : undefined;

  return {
    title: entry.seo.title,
    description: entry.seo.description,
    keywords: entry.seo.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title: entry.seo.title,
      description: entry.seo.description,
      url: canonical,
      locale: "vi_VN",
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: entry.name }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: entry.seo.title,
      description: entry.seo.description,
      images: ogImage ? [ogImage] : undefined
    }
  };
}

export default async function TuViCungHoangDaoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getDailyHoroscopeBySlug("cung-hoang-dao", slug);

  if (!entry) {
    notFound();
  }

  redirect(`/tu-vi-cung-hoang-dao/${slug}/${entry.publishDate}`);
}
