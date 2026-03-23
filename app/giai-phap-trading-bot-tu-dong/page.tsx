import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getSidebarTopics } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

const title = "Hỗ trợ build trading bot Binance theo chiến lược riêng";
const description =
  "Dịch vụ hỗ trợ build trading bot Binance theo đúng chiến lược của bạn để tự động hóa mở lệnh, đóng lệnh và quản lý vận hành rõ ràng hơn.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/giai-phap-trading-bot-tu-dong`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/giai-phap-trading-bot-tu-dong`,
    locale: "vi_VN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

const navItems = [
  { href: "#giai-phap", label: "Giải pháp" },
  { href: "#doi-tuong", label: "Phù hợp với ai" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#chi-phi", label: "Chi phí" },
  { href: "#faq", label: "FAQ" },
  { href: "#lien-he", label: "Liên hệ" }
];

const supportItems = [
  "Tự động mở lệnh theo điều kiện chiến lược của bạn",
  "Tự động đóng lệnh theo TP / SL / điều kiện riêng",
  "Hạn chế tác động cảm xúc trong quá trình trading",
  "Giảm thời gian ngồi canh thị trường thủ công",
  "Hỗ trợ theo dõi trạng thái hoạt động của bot",
  "Gửi email sau khi mở lệnh hoặc đóng lệnh để bạn dễ theo dõi",
  "Hỗ trợ logic quản lý vốn theo rule bạn yêu cầu",
  "Có thể điều chỉnh theo mức độ phức tạp thực tế của chiến lược"
];

const fitItems = [
  "Người đã có chiến lược trading rõ ràng",
  "Người muốn tự động hóa việc thực thi thay vì vào lệnh thủ công",
  "Người muốn giảm ảnh hưởng của cảm xúc khi trade",
  "Người không có nhiều thời gian ngồi theo dõi chart liên tục",
  "Người muốn có một công cụ chạy theo logic riêng của mình"
];

const processItems = [
  "Bước 1: Bạn mô tả chiến lược trading của mình",
  "Bước 2: Phân tích tính khả thi để đưa vào bot",
  "Bước 3: Xây dựng bot theo logic đã thống nhất",
  "Bước 4: Test và hoàn thiện",
  "Bước 5: Bàn giao, hướng dẫn sử dụng và hỗ trợ vận hành"
];

const faqItems = [
  {
    question: "Tôi chưa có chiến lược rõ ràng thì có làm được không?",
    answer:
      "Dịch vụ phù hợp nhất khi bạn đã có chiến lược rõ ràng. Nếu chiến lược còn quá mơ hồ, cần làm rõ trước khi triển khai."
  },
  {
    question: "Bot có đảm bảo lợi nhuận không?",
    answer:
      "Không. Bot chỉ là công cụ thực thi theo logic được yêu cầu, không đảm bảo lợi nhuận."
  },
  {
    question: "Có hỗ trợ sau khi bàn giao không?",
    answer: "Có. Hỗ trợ bảo hành và support vận hành trong 1 năm."
  },
  {
    question: "Có hỗ trợ chỉnh sửa bot sau này không?",
    answer:
      "Có, nhưng các thay đổi thêm sẽ được báo giá theo yêu cầu thực tế."
  }
];

const goodFit = [
  "Đã có chiến lược cụ thể",
  "Muốn giảm cảm xúc khi trade",
  "Muốn tự động hóa"
];

const badFit = [
  "Muốn bot tự nghĩ ra chiến lược",
  "Muốn cam kết lợi nhuận",
  "Chưa có logic trading rõ ràng"
];

export default async function GiaiPhapTradingBotPage() {
  const sidebarTopics = await getSidebarTopics();

  return (
    <main className="py-8 pb-24 md:py-10 xl:pb-10">
      <style>{`
        :root {
          --bot-bg: #f4f6f7;
          --bot-surface: #ffffff;
          --bot-ink: #111827;
          --bot-muted: #4b5563;
          --bot-line: #d9e0e5;
          --bot-accent: #0f766e;
          --bot-accent-dark: #115e59;
          --bot-warn-bg: #fff7ed;
          --bot-warn-border: #fdba74;
          --bot-shadow: 0 20px 44px rgba(15, 23, 42, 0.08);
          --bot-max: 1120px;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background:
            radial-gradient(circle at top right, rgba(15, 118, 110, 0.08), transparent 28%),
            linear-gradient(180deg, #f7f8f9 0%, #ffffff 26%);
          color: var(--bot-ink);
        }

        .bot-page {
          min-height: 100vh;
        }

        .bot-shell {
          width: min(calc(100% - 32px), var(--bot-max));
          margin: 0 auto;
        }

        .bot-nav-wrap {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(14px);
          background: rgba(247, 248, 249, 0.88);
          border-bottom: 1px solid rgba(17, 24, 39, 0.08);
        }

        .bot-nav {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .bot-brand {
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--bot-accent-dark);
        }

        .bot-nav-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .bot-nav-links a {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--bot-muted);
          padding: 10px 14px;
          border-radius: 999px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .bot-nav-links a:hover {
          background: rgba(15, 118, 110, 0.1);
          color: var(--bot-ink);
        }

        .bot-hero {
          padding: 86px 0 68px;
        }

        .bot-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
          gap: 28px;
        }

        .bot-panel,
        .bot-card,
        .bot-warning,
        .bot-cta-box,
        .bot-price-card,
        .bot-faq-card {
          background: var(--bot-surface);
          border: 1px solid var(--bot-line);
          border-radius: 28px;
          box-shadow: var(--bot-shadow);
        }

        .bot-panel {
          padding: 40px;
        }

        .bot-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(15, 118, 110, 0.1);
          color: var(--bot-accent-dark);
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .bot-panel h1 {
          margin: 22px 0 18px;
          font-size: clamp(2.5rem, 4.8vw, 4.6rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          max-width: 10ch;
        }

        .bot-panel p,
        .bot-card p,
        .bot-warning p,
        .bot-price-card p,
        .bot-cta-box p,
        .bot-section-copy {
          margin: 0;
          color: var(--bot-muted);
          font-size: 1.03rem;
          line-height: 1.82;
        }

        .bot-bullets {
          list-style: none;
          padding: 0;
          margin: 28px 0 0;
          display: grid;
          gap: 14px;
        }

        .bot-bullets li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-weight: 600;
        }

        .bot-bullets li::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--bot-accent);
          margin-top: 0.6em;
          flex-shrink: 0;
        }

        .bot-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .bot-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 22px;
          border-radius: 999px;
          font-size: 1rem;
          font-weight: 700;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .bot-btn:hover {
          transform: translateY(-1px);
        }

        .bot-btn-primary {
          background: var(--bot-accent);
          color: #fff;
        }

        .bot-btn-primary:hover {
          background: var(--bot-accent-dark);
        }

        .bot-btn-secondary {
          border: 1px solid var(--bot-line);
          color: var(--bot-ink);
          background: transparent;
        }

        .bot-side {
          display: grid;
          gap: 20px;
        }

        .bot-card,
        .bot-warning,
        .bot-price-card,
        .bot-faq-card,
        .bot-cta-box {
          padding: 28px;
        }

        .bot-card h2,
        .bot-card h3,
        .bot-warning h2,
        .bot-price-card h2,
        .bot-cta-box h2,
        .bot-faq-card h3,
        .bot-section-heading h2 {
          margin: 0;
          font-size: clamp(1.5rem, 2vw, 2rem);
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .bot-warning {
          background: var(--bot-warn-bg);
          border-color: var(--bot-warn-border);
        }

        .bot-warning strong {
          display: block;
          margin-bottom: 10px;
          font-size: 1rem;
        }

        .bot-section {
          padding: 72px 0;
        }

        .bot-section-heading {
          display: grid;
          gap: 14px;
          max-width: 760px;
          margin-bottom: 30px;
        }

        .bot-grid-2,
        .bot-grid-3 {
          display: grid;
          gap: 22px;
        }

        .bot-grid-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .bot-grid-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .bot-list {
          margin: 0;
          padding-left: 20px;
          color: var(--bot-muted);
          line-height: 1.8;
        }

        .bot-list li + li {
          margin-top: 8px;
        }

        .bot-process {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
          display: grid;
          gap: 14px;
        }

        .bot-process li {
          padding: 16px 18px;
          border-radius: 18px;
          background: #f8fafb;
          border: 1px solid var(--bot-line);
          font-weight: 600;
        }

        .bot-note {
          margin-top: 18px;
          padding: 16px 18px;
          border-left: 4px solid var(--bot-accent);
          background: #f6fbfa;
          color: var(--bot-muted);
          border-radius: 0 16px 16px 0;
        }

        .bot-compare {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .bot-compare-good,
        .bot-compare-bad {
          padding: 28px;
          border-radius: 24px;
          border: 1px solid var(--bot-line);
          background: #fff;
          box-shadow: var(--bot-shadow);
        }

        .bot-compare-good {
          border-top: 5px solid var(--bot-accent);
        }

        .bot-compare-bad {
          border-top: 5px solid #dc2626;
        }

        .bot-price-amount {
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
          font-weight: 800;
          margin-top: 10px;
        }

        .bot-faq-card {
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .bot-faq-card:hover,
        .bot-card:hover,
        .bot-price-card:hover,
        .bot-compare-good:hover,
        .bot-compare-bad:hover {
          transform: translateY(-2px);
          border-color: #b8c7cf;
        }

        .bot-cta-box {
          text-align: center;
          background: linear-gradient(180deg, #ffffff 0%, #eef8f7 100%);
        }

        .bot-footer {
          padding: 32px 0 54px;
          color: var(--bot-muted);
          text-align: center;
          font-size: 0.96rem;
        }

        @media (max-width: 980px) {
          .bot-hero-grid,
          .bot-grid-2,
          .bot-grid-3,
          .bot-compare {
            grid-template-columns: 1fr;
          }

          .bot-nav {
            min-height: auto;
            padding: 12px 0;
            align-items: flex-start;
            flex-direction: column;
          }

          .bot-nav-links {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .bot-hero {
            padding: 64px 0 54px;
          }

          .bot-section {
            padding: 60px 0;
          }

          .bot-panel,
          .bot-card,
          .bot-warning,
          .bot-cta-box,
          .bot-price-card,
          .bot-faq-card,
          .bot-compare-good,
          .bot-compare-bad {
            padding: 22px;
            border-radius: 22px;
          }
        }
      `}</style>

      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <ContentSidebar topics={sidebarTopics} />

          <div className="bot-page min-w-0">
        <div className="bot-nav-wrap">
          <div className="bot-shell bot-nav">
            <div className="bot-brand">Trading bot Binance</div>
            <nav className="bot-nav-links" aria-label="Điều hướng landing page trading bot">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <section className="bot-hero">
          <div className="bot-shell bot-hero-grid">
            <div className="bot-panel">
              <div className="bot-eyebrow">Dịch vụ triển khai</div>
              <h1>Hỗ trợ build trading bot Binance theo chiến lược riêng</h1>
              <p>
                Bạn có chiến lược trading của riêng mình, nhưng lại khó kiểm soát cảm xúc khi vào lệnh?
              </p>
              <ul className="bot-bullets">
                <li>Dễ FOMO khi thị trường biến động</li>
                <li>Khó giữ kỷ luật theo đúng chiến lược</li>
                <li>Mất nhiều thời gian để canh điểm vào lệnh, chốt lời, cắt lỗ</li>
                <li>Không thể ngồi theo dõi thị trường liên tục</li>
              </ul>
              <p style={{ marginTop: "22px" }}>
                Nếu bạn đã có chiến lược trade, giải pháp phù hợp có thể là xây dựng một trading bot để tự động hóa việc thực thi.
              </p>
              <div className="bot-actions">
                <a className="bot-btn bot-btn-primary" href="#lien-he">
                  Gửi email trao đổi
                </a>
                <a className="bot-btn bot-btn-secondary" href="#giai-phap">
                  Xem phạm vi hỗ trợ
                </a>
              </div>
            </div>

            <div className="bot-side">
              <div className="bot-card">
                <h2>Mô tả ngắn</h2>
                <p>
                  Dịch vụ này hỗ trợ build trading bot Binance theo đúng chiến lược của bạn, giúp tự động hóa việc mở lệnh, đóng lệnh và quản lý quá trình vận hành rõ ràng hơn.
                </p>
              </div>
              <div className="bot-warning">
                <h2>Lưu ý quan trọng</h2>
                <strong>Chỉ build bot theo chiến lược có sẵn.</strong>
                <p>
                  Không cung cấp chiến lược trade, không cam kết lợi nhuận, không tư vấn đầu tư. Dịch vụ này chỉ hỗ trợ xây công cụ thực thi theo logic mà bạn đã xác định trước.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="giai-phap" className="bot-section">
          <div className="bot-shell">
            <header className="bot-section-heading">
              <h2>Giải pháp trading bot có thể hỗ trợ gì?</h2>
              <p className="bot-section-copy">
                Phạm vi hỗ trợ tập trung vào việc tự động hóa thực thi, giảm thao tác thủ công và giúp quá trình vận hành bám sát logic trading mà bạn đã có sẵn.
              </p>
            </header>
            <div className="bot-grid-2">
              {supportItems.map((item) => (
                <article key={item} className="bot-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="doi-tuong" className="bot-section">
          <div className="bot-shell bot-grid-2">
            <div className="bot-card">
              <h2>Phù hợp với ai?</h2>
              <ul className="bot-list" style={{ marginTop: "20px" }}>
                {fitItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bot-card">
              <h2>Phạm vi hỗ trợ hiện tại</h2>
              <ul className="bot-list" style={{ marginTop: "20px" }}>
                <li>Hiện tại chỉ hỗ trợ làm bot cho Binance</li>
                <li>Chỉ build bot theo chiến lược của bạn</li>
                <li>Chưa hỗ trợ các sàn khác ở giai đoạn này</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="bot-section">
          <div className="bot-shell bot-grid-2">
            <div className="bot-card">
              <h2>Quy trình triển khai</h2>
              <ol className="bot-process">
                {processItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <div className="bot-note">
                Chiến lược càng rõ ràng, việc triển khai càng nhanh và sát yêu cầu hơn.
              </div>
            </div>
            <div className="bot-card">
              <h2>Phù hợp / Không phù hợp</h2>
              <div className="bot-compare" style={{ marginTop: "22px" }}>
                <div className="bot-compare-good">
                  <h3>Phù hợp</h3>
                  <ul className="bot-list" style={{ marginTop: "14px" }}>
                    {goodFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bot-compare-bad">
                  <h3>Không phù hợp</h3>
                  <ul className="bot-list" style={{ marginTop: "14px" }}>
                    {badFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="chi-phi" className="bot-section">
          <div className="bot-shell bot-grid-2">
            <div className="bot-price-card">
              <h2>Chi phí làm tool</h2>
              <div className="bot-price-amount">3M → 10M</div>
              <p>Từ 3.000.000 VND đến 10.000.000 VND</p>
              <p>Phụ thuộc vào độ phức tạp của chiến lược và yêu cầu vận hành.</p>
            </div>
            <div className="bot-price-card">
              <h2>Chi phí vận hành</h2>
              <div className="bot-price-amount">500K → 1M</div>
              <p>Từ 500.000 VND đến 1.000.000 VND / tháng</p>
              <p>Phụ thuộc vào cách triển khai thực tế và nhu cầu theo dõi / vận hành.</p>
            </div>
          </div>
        </section>

        <section className="bot-section">
          <div className="bot-shell bot-grid-2">
            <div className="bot-card">
              <h2>Bảo hành & hỗ trợ</h2>
              <ul className="bot-list" style={{ marginTop: "18px" }}>
                <li>Hỗ trợ bảo hành và support vận hành trong 1 năm</li>
                <li>Hỗ trợ xử lý các vấn đề phát sinh liên quan đến bot trong phạm vi đã triển khai</li>
                <li>Nếu có yêu cầu thay đổi hoặc mở rộng chiến lược sau này, chi phí sẽ được tính thêm theo yêu cầu thực tế</li>
              </ul>
            </div>
            <div className="bot-card">
              <h2>Giới hạn phạm vi hỗ trợ</h2>
              <ul className="bot-list" style={{ marginTop: "18px" }}>
                <li>Chỉ hỗ trợ xây công cụ thực thi theo logic bạn cung cấp</li>
                <li>Không giữ tài sản hoặc thay người dùng quyết định giao dịch</li>
                <li>Không quản lý vốn thay cho người dùng ngoài rule đã thống nhất trong bot</li>
                <li>Không cung cấp chiến lược mới hoặc dịch vụ tư vấn đầu tư</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bot-section">
          <div className="bot-shell">
            <div className="bot-warning">
              <h2>Không phải lời khuyên đầu tư</h2>
              <ul className="bot-list" style={{ marginTop: "18px" }}>
                <li>Dịch vụ này chỉ hỗ trợ xây dựng công cụ thực thi theo chiến lược của bạn</li>
                <li>Không cung cấp lời khuyên đầu tư</li>
                <li>Không chịu trách nhiệm cho kết quả lãi/lỗ phát sinh từ chiến lược trading của người dùng</li>
                <li>Người dùng cần tự chịu trách nhiệm với quyết định giao dịch và quản lý vốn của mình</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="bot-section">
          <div className="bot-shell">
            <header className="bot-section-heading">
              <h2>FAQ</h2>
              <p className="bot-section-copy">
                Một số câu hỏi thường gặp trước khi trao đổi sâu hơn về khả năng triển khai bot Binance theo chiến lược riêng.
              </p>
            </header>
            <div className="bot-grid-2">
              {faqItems.map((item) => (
                <article key={item.question} className="bot-faq-card">
                  <h3>{item.question}</h3>
                  <p style={{ marginTop: "14px" }}>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lien-he" className="bot-section">
          <div className="bot-shell">
            <div className="bot-cta-box">
              <h2>Bạn đã có chiến lược trade và muốn tự động hóa nó?</h2>
              <p>
                Liên hệ để trao đổi chi tiết về chiến lược của bạn và đánh giá khả năng triển khai thành trading bot Binance.
              </p>
              <div className="bot-actions" style={{ justifyContent: "center" }}>
                <a className="bot-btn bot-btn-primary" href="mailto:thanhtungit92@gmail.com?subject=BOT_TRADING%20-%20Trao%20%C4%91%E1%BB%95i%20nhu%20c%E1%BA%A7u&body=Zalo%3A%20%0AN%E1%BB%99i%20dung%3A%20BOT_TRADING">
                  Gửi email trao đổi
                </a>
                <a className="bot-btn bot-btn-secondary" href="/contact">
                  Xem hướng dẫn soạn email
                </a>
              </div>
              <p style={{ marginTop: "4px" }}>
                Khi gửi mail, vui lòng ghi rõ <strong>BOT_TRADING</strong> và số Zalo để việc trao đổi nhanh hơn.
              </p>
            </div>
          </div>
        </section>

        <footer className="bot-footer bot-shell">
          Kênh liên hệ hiện tại: gửi email với mã nhu cầu và số Zalo để bắt đầu trao đổi.
        </footer>
          </div>
        </div>
      </Container>
    </main>
  );
}
