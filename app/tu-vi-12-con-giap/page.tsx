import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HoroscopeOverviewGrid } from "@/components/horoscope/HoroscopeOverviewGrid";
import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getDailyHoroscopeEntries, getItemBySlug, getSidebarTopics } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

// Horoscope pages need to roll over right after midnight Vietnam time without waiting for ISR expiry.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const item = await getItemBySlug("tu-vi-12-con-giap");

  if (!item) {
    return {};
  }

  const canonical = `${getSiteUrl()}${item.seo.canonicalUrl ?? item.redirectUrl}`;
  const ogImage = item.seo.ogImage ? `${getSiteUrl()}${item.seo.ogImage}` : undefined;

  return {
    title: item.seo.title,
    description: item.seo.description,
    keywords: item.seo.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title: item.seo.title,
      description: item.seo.description,
      url: canonical,
      locale: "vi_VN",
      type: "website",
      images: ogImage ? [{ url: ogImage, alt: item.name }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: item.seo.title,
      description: item.seo.description,
      images: ogImage ? [ogImage] : undefined
    }
  };
}

export default async function TuVi12ConGiapPage() {
  const [item, sidebarTopics, entries] = await Promise.all([
    getItemBySlug("tu-vi-12-con-giap"),
    getSidebarTopics(),
    getDailyHoroscopeEntries("12-con-giap")
  ]);

  if (!item) {
    notFound();
  }

  return (
    <main className="py-8 md:py-10">
      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <div className="hidden xl:block">
            <ContentSidebar topics={sidebarTopics} />
          </div>

          <div className="min-w-0 space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_#eef7ff,_#ffffff_60%)] p-6 shadow-card md:p-8">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-portal-200 bg-white/85 px-3 py-1 text-xs font-semibold text-portal-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                {item.name}
              </h1>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 md:text-lg">
                Xem nhanh tử vi hôm nay của 12 con giáp qua từng trang đọc riêng, trình bày ngắn
                gọn, rõ ràng và thuận tiện để tra cứu hằng ngày.
              </p>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">Tử vi hôm nay theo 12 con giáp</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Chọn một con giáp để mở trang đọc tử vi của ngày hôm nay.
                </p>
              </div>
              <HoroscopeOverviewGrid entries={entries} accentClassName="text-amber-700" />
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
