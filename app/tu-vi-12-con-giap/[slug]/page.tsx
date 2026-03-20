import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DailyHoroscopeReader } from "@/components/horoscope/DailyHoroscopeReader";
import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getDailyHoroscopeBySlug, getDailyHoroscopeEntries, getSidebarTopics } from "@/lib/content";
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
  const [entry, sidebarTopics] = await Promise.all([
    getDailyHoroscopeBySlug("12-con-giap", slug),
    getSidebarTopics()
  ]);

  if (!entry) {
    notFound();
  }

  return (
    <main className="py-8 pb-24 md:py-10 xl:pb-10">
      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <ContentSidebar topics={sidebarTopics} />

          <div className="min-w-0">
            <DailyHoroscopeReader entry={entry} theme="animal" />
          </div>
        </div>
      </Container>
    </main>
  );
}
