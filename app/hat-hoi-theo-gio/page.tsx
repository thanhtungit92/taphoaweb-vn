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

  const faqItems = [
    {
      question: "Hắt hơi theo giờ là gì?",
      answer: "Đây là cách diễn giải dân gian dựa trên thời điểm bạn hắt hơi trong ngày và trong tuần. Nội dung phù hợp để tham khảo hoặc đọc cho vui, không phải kết luận chắc chắn về điều sắp xảy ra."
    },
    {
      question: "Có nên tin tuyệt đối vào nội dung hắt hơi theo giờ không?",
      answer: "Không. Bạn nên xem đây là nội dung tham khảo mang tính dân gian và giải trí. Các quyết định quan trọng trong công việc, tiền bạc hay sức khỏe không nên dựa hoàn toàn vào kiểu diễn giải này."
    },
    {
      question: "Nên xem theo giờ nào nếu hắt hơi nhiều lần?",
      answer: "Bạn có thể ưu tiên khung giờ gần nhất với lần hắt hơi mà mình chú ý rõ nhất. Mục đích là để tra cứu thuận tiện, không cần quá cứng nhắc khi đối chiếu từng phút."
    },
    {
      question: "Khi nào nên dừng việc diễn giải và chú ý sức khỏe?",
      answer: "Nếu bạn hắt hơi liên tục, kéo dài hoặc kèm cảm giác khó chịu, nghẹt mũi, đau đầu hay mệt mỏi, nên ưu tiên theo dõi sức khỏe thay vì tiếp tục đọc nội dung theo hướng điềm báo."
    }
  ];
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
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Giải thích nhanh
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Hắt hơi theo giờ là gì?</h2>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <article className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5">
                    <h3 className="text-xl font-bold text-slate-900">Nội dung dân gian để tham khảo</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Hắt hơi theo giờ thường được truyền miệng như một cách đọc vui dựa trên khung giờ và ngày trong tuần. Nó phù hợp với người muốn xem nhanh một diễn giải dân gian, nhưng không nên hiểu như một cơ sở chắc chắn cho điều sẽ xảy ra.
                    </p>
                  </article>
                  <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <h3 className="text-xl font-bold text-slate-900">Phù hợp để đọc theo hướng giải trí</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Với các nội dung kiểu này, giá trị chính nằm ở trải nghiệm tham khảo và góc nhìn văn hóa dân gian. Nếu đọc theo tinh thần nhẹ nhàng, bạn sẽ thấy nội dung hữu ích hơn là cố xem đó như một dự đoán tuyệt đối.
                    </p>
                  </article>
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
                <div className="border-b border-slate-200 pb-5">
                  <h2 className="text-2xl font-bold text-slate-900">Cách xem bảng hắt hơi theo ngày và giờ</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Dùng đúng ngày trong tuần và khung giờ gần nhất để tra cứu sẽ giúp bạn đọc nội dung nhất quán hơn.
                  </p>
                </div>
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
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Lưu ý quan trọng</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Khi nào nên xem cho vui và khi nào không nên dựa vào nội dung này?</h2>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <article className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5">
                    <h3 className="text-xl font-bold text-slate-900">Phù hợp để tham khảo</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Khi bạn chỉ muốn xem nhanh một nội dung dân gian theo giờ, đọc cho vui hoặc tìm thêm một góc nhìn nhẹ nhàng trong ngày, trang này là đủ phù hợp.
                    </p>
                  </article>
                  <article className="rounded-3xl border border-rose-200 bg-rose-50/70 p-5">
                    <h3 className="text-xl font-bold text-slate-900">Không nên dùng để quyết định việc quan trọng</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Các quyết định về sức khỏe, tiền bạc, công việc hoặc quan hệ cá nhân vẫn nên dựa trên dữ kiện thực tế. Nội dung này không thay thế cho đánh giá thực tế hay tư vấn chuyên môn.
                    </p>
                  </article>
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">FAQ</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Câu hỏi thường gặp</h2>
                </div>

                <div className="mt-6 space-y-4">
                  {faqItems.map((item) => (
                    <article key={item.question} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
                      <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
                    </article>
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
