import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DailyHoroscopeReader } from "@/components/horoscope/DailyHoroscopeReader";
import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import {
  getCurrentVietnamDate,
  getDailyHoroscopeBySlugAndDate,
  getDailyHoroscopeEntries,
  getSidebarTopics
} from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string; date: string }>;
};

export async function generateStaticParams() {
  const entries = await getDailyHoroscopeEntries("12-con-giap");
  return entries.map((entry) => ({ slug: entry.slug, date: entry.publishDate }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, date } = await params;
  const entry = await getDailyHoroscopeBySlugAndDate("12-con-giap", slug, date);

  if (!entry) {
    return {};
  }

  const canonical = `${getSiteUrl()}/tu-vi-12-con-giap/${entry.slug}/${entry.publishDate}`;
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

export default async function TuVi12ConGiapDatedDetailPage({ params }: PageProps) {
  const { slug, date } = await params;
  const [entry, sidebarTopics] = await Promise.all([
    getDailyHoroscopeBySlugAndDate("12-con-giap", slug, date),
    getSidebarTopics()
  ]);

  if (!entry) {
    notFound();
  }

  const today = getCurrentVietnamDate();

  return (
    <main className="py-8 pb-24 md:py-10 xl:pb-10">
      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <ContentSidebar topics={sidebarTopics} />

          <div className="min-w-0 space-y-4">
            {date !== today ? (
              <section className="rounded-[2rem] border border-sky-200 bg-sky-50/80 px-5 py-4 text-sm leading-6 text-sky-900 shadow-card">
                Đây là bản tử vi theo ngày <strong>{date}</strong>. Để xem nội dung mới nhất, hãy quay lại danh sách 12 con giáp.
              </section>
            ) : null}

            <DailyHoroscopeReader entry={entry} theme="animal" />
          </div>
        </div>
      </Container>
    </main>
  );
}
