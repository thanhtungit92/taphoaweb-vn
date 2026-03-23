import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getItemBySlug, getMonthlyAiToolsContent, getSidebarTopics } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [item, content] = await Promise.all([getItemBySlug("top-10-cong-cu-ai"), getMonthlyAiToolsContent()]);

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

export default async function Top10CongCuAiPage() {
  const [item, content, sidebarTopics] = await Promise.all([
    getItemBySlug("top-10-cong-cu-ai"),
    getMonthlyAiToolsContent(),
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
            <section className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_#eef6ff,_#ffffff_60%)] p-6 shadow-card md:p-8">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sky-200 bg-white/85 px-3 py-1 text-xs font-semibold text-sky-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 md:text-lg">{content.intro}</p>
              <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">{content.summary}</p>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Cập nhật theo tháng <strong>{content.publishMonth}</strong> · Mốc cập nhật dữ liệu: {content.updatedAt}
              </p>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">Danh sách 10 công cụ AI nổi bật</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Mỗi công cụ đều có mô tả ngắn về mục đích sử dụng, lý do nên cân nhắc và mức chi phí phổ thông theo tháng.
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                {content.tools.map((tool) => (
                  <article key={tool.rank} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-sky-300 hover:bg-sky-50/50">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Top {tool.rank}</p>
                        <h3 className="mt-2 text-xl font-bold text-slate-900">{tool.name}</h3>
                      </div>
                      <div className="rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                        Chi phí phổ thông: <span className="text-sky-700">{tool.monthlyCost}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-900">AI dùng để làm gì?</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{tool.useCase}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-900">Tại sao nên sử dụng?</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{tool.whyUse}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <h4 className="text-sm font-bold text-slate-900">Lượt sử dụng / mức độ quan tâm tháng trước</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{tool.lastMonthUsage}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">Phân tích nhanh theo tháng</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Góc nhìn ngắn để chọn công cụ phù hợp với nhu cầu thực tế và ngân sách của bạn.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5">
                  <h3 className="text-xl font-bold text-slate-900">Xu hướng tháng này</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{content.analysis.overview}</p>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                  <h3 className="text-xl font-bold text-slate-900">Cách chọn công cụ phù hợp</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{content.analysis.selectionNote}</p>
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
