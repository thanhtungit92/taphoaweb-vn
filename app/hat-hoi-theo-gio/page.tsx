import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getItemBySlug, getSidebarTopics, getSneezeByHourContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [item, content] = await Promise.all([
    getItemBySlug("hat-hoi-theo-gio"),
    getSneezeByHourContent()
  ]);

  if (!item || !content) {
    return {};
  }

  const canonical = `${getSiteUrl()}${content.seo.canonicalUrl ?? item.redirectUrl}`;
  const ogImage = content.seo.ogImage ? `${getSiteUrl()}${content.seo.ogImage}` : undefined;

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonical,
      locale: "vi_VN",
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: item.name }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ogImage ? [ogImage] : undefined
    }
  };
}

export default async function HatHoiTheoGioPage() {
  const [item, content, sidebarTopics] = await Promise.all([
    getItemBySlug("hat-hoi-theo-gio"),
    getSneezeByHourContent(),
    getSidebarTopics()
  ]);

  if (!item || !content) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.description,
    inLanguage: "vi-VN",
    url: `${getSiteUrl()}${content.seo.canonicalUrl ?? item.redirectUrl}`
  };

  return (
    <>
      <main className="py-8 pb-24 md:py-10 xl:pb-10">
        <Container className="max-w-none">
          <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
            <ContentSidebar topics={sidebarTopics} />

            <div className="min-w-0 space-y-6">
              <section className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_#fff5ea,_#ffffff_60%)] p-6 shadow-card md:p-8">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-amber-200 bg-white/85 px-3 py-1 text-xs font-semibold text-amber-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  {content.title}
                </h1>
                <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 md:text-lg">
                  {content.intro}
                </p>
              </section>

              <section className="rounded-[2rem] border border-amber-200 bg-amber-50/80 p-5 shadow-card md:p-6">
                <p className="text-sm leading-6 text-amber-900">{content.note}</p>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">Cách xem bảng hắt hơi theo ngày và giờ</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {content.howToUse.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4"
                    >
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
                <div className="border-b border-slate-200 pb-5">
                  <h2 className="text-2xl font-bold text-slate-900">Tra cứu theo ngày trong tuần và từng giờ</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Chọn đúng thứ trong tuần và khung giờ gần nhất với thời điểm bạn hắt hơi để xem
                    phần diễn giải tham khảo.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {content.days.map((day) => (
                    <a
                      key={day.slug}
                      href={`#${day.slug}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-200 hover:bg-amber-50/70"
                    >
                      {day.title}
                    </a>
                  ))}
                </div>

                <div className="mt-8 space-y-8">
                  {content.days.map((day) => (
                    <section
                      key={day.slug}
                      id={day.slug}
                      className="scroll-mt-24 rounded-[1.75rem] border border-slate-200 bg-slate-50/50 p-5 md:p-6"
                    >
                      <div className="border-b border-slate-200 pb-4">
                        <h3 className="text-2xl font-bold text-slate-900">{day.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Bảng tra cứu 24 khung giờ hắt hơi của {day.title.toLowerCase()}.
                        </p>
                        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700">
                          {day.overview}
                        </p>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        {day.entries.map((entry) => (
                          <article
                            key={`${day.slug}-${entry.hour}`}
                            className="rounded-2xl border border-slate-200 bg-white/85 p-5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Khung giờ
                            </p>
                            <h4 className="mt-2 text-xl font-bold text-slate-900">{entry.label}</h4>
                            <p className="mt-3 text-sm leading-6 text-slate-700">
                              {entry.prediction}
                            </p>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
