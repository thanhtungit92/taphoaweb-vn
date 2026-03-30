import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getGoldPriceDailyContent, getItemBySlug, getSidebarTopics } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

// Gold content changes on a business-hour boundary, so always resolve the latest file at request time.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [item, content] = await Promise.all([getItemBySlug("gia-vang-hom-nay"), getGoldPriceDailyContent()]);

  if (!item || !content) {
    return {};
  }

  const canonical = `${getSiteUrl()}${content.seo.canonicalUrl ?? item.redirectUrl}`;
  const ogImage = content.seo.ogImage ? `${getSiteUrl()}${content.seo.ogImage}` : undefined;

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: { canonical },
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

export default async function GiaVangHomNayPage() {
  const [item, content, sidebarTopics] = await Promise.all([
    getItemBySlug("gia-vang-hom-nay"),
    getGoldPriceDailyContent(),
    getSidebarTopics()
  ]);

  if (!item || !content) {
    notFound();
  }

  return (
    <main className="py-8 pb-24 md:py-10 xl:pb-10">
      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <ContentSidebar topics={sidebarTopics} />

          <div className="min-w-0 space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_#f8f2de,_#ffffff_60%)] p-6 shadow-card md:p-8">
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
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Cập nhật cho ngày <strong>{content.publishDate}</strong> · Mốc cập nhật dữ liệu: {content.updatedAt}
              </p>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">Bảng giá vàng hôm nay</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Bảng giá tham khảo theo một số loại vàng phổ biến trên thị trường Việt Nam.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-3xl border border-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-4 text-left text-sm font-bold text-slate-900">Loại vàng</th>
                      <th className="border-b border-slate-200 px-4 py-4 text-left text-sm font-bold text-slate-900">Thương hiệu / nhóm</th>
                      <th className="border-b border-slate-200 px-4 py-4 text-left text-sm font-bold text-slate-900">Mua vào</th>
                      <th className="border-b border-slate-200 px-4 py-4 text-left text-sm font-bold text-slate-900">Bán ra</th>
                      <th className="border-b border-slate-200 px-4 py-4 text-left text-sm font-bold text-slate-900">Đơn vị</th>
                      <th className="border-b border-slate-200 px-4 py-4 text-left text-sm font-bold text-slate-900">Biến động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.priceTable.map((entry) => (
                      <tr key={entry.label} className="bg-white even:bg-slate-50/50">
                        <td className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900">{entry.label}</td>
                        <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-700">{entry.brand}</td>
                        <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-700">{entry.buyPrice}</td>
                        <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-700">{entry.sellPrice}</td>
                        <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-700">{entry.unit}</td>
                        <td className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-amber-700">{entry.change ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">Phân tích ngắn trong ngày</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Góc nhìn tham khảo về các yếu tố có thể làm giá vàng tăng hoặc giảm trong ngày.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5">
                  <h3 className="text-xl font-bold text-slate-900">Vì sao giá vàng tăng?</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{content.analysis.whyUp}</p>
                </article>
                <article className="rounded-3xl border border-rose-200 bg-rose-50/70 p-5">
                  <h3 className="text-xl font-bold text-slate-900">Vì sao giá vàng giảm?</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{content.analysis.whyDown}</p>
                </article>
              </div>

              <article className="mt-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
                <h3 className="text-xl font-bold text-slate-900">Nhịp nhìn trong ngày</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{content.analysis.dayCommentary}</p>
              </article>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">Gợi ý tham khảo khi mua vàng ở Việt Nam</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Nội dung ngắn hạn và dài hạn chỉ mang tính tham khảo, không phải khuyến nghị đầu tư.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5">
                  <h3 className="text-xl font-bold text-slate-900">Ngắn hạn</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{content.advice.shortTerm}</p>
                </article>
                <article className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5">
                  <h3 className="text-xl font-bold text-slate-900">Dài hạn</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{content.advice.longTerm}</p>
                </article>
              </div>
            </section>

            <section className="rounded-[2rem] border border-amber-200 bg-amber-50/80 p-5 shadow-card md:p-6">
              <p className="text-sm leading-6 text-amber-900">{content.note}</p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
