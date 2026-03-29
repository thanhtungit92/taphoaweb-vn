import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getDailyHoroscopeBySlug, getDailyHoroscopeEntries } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getDailyHoroscopeEntries("12-con-giap");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getDailyHoroscopeBySlug("12-con-giap", slug);

  if (!entry) {
    return {};
  }

  const canonical = `${getSiteUrl()}${entry.seo.canonicalUrl ?? `/tu-vi-12-con-giap/${entry.slug}`}`;
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

export default async function TuVi12ConGiapDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getDailyHoroscopeBySlug("12-con-giap", slug);

  if (!entry) {
    notFound();
  }

  redirect(`/tu-vi-12-con-giap/${slug}/${entry.publishDate}`);
}
