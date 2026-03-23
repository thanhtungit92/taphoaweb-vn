import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { getSidebarTopics } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

const title = "Học làm website với AI";
const description =
  "Landing page khóa học thực chiến giúp bạn dùng AI để tự build website, chạy local, deploy lên cloud, gắn domain riêng và vận hành với chi phí thấp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/khoa-hoc-lam-website-voi-ai-chi-phi-thap`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/khoa-hoc-lam-website-voi-ai-chi-phi-thap`,
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
  { href: "#hoc-gi", label: "Bạn sẽ học gì" },
  { href: "#lo-trinh", label: "Lộ trình" },
  { href: "#output", label: "Output" },
  { href: "#phu-hop", label: "Phù hợp" },
  { href: "#chuan-bi", label: "Chuẩn bị" },
  { href: "#faq", label: "FAQ" },
  { href: "#chi-phi", label: "Chi phí" },
  { href: "#dang-ky", label: "Đăng ký" }
];

const learningItems = [
  {
    title: "1. Sử dụng AI để build web",
    bullets: [
      "Viết prompt đúng để AI generate code",
      "Cách chia nhỏ task để AI làm đúng ý",
      "Fix lỗi khi AI generate sai"
    ]
  },
  {
    title: "2. Chạy web trên máy cá nhân",
    bullets: [
      "Hiểu cách web hoạt động cơ bản",
      "Chạy project local",
      "Quản lý source code"
    ]
  },
  {
    title: "3. Deploy website lên internet",
    bullets: [
      "Tạo server trên Google Cloud",
      "Upload và chạy website",
      "Truy cập web qua IP public"
    ]
  },
  {
    title: "4. Domain & hosting",
    bullets: [
      "Mua domain (Namecheap / GoDaddy)",
      "Trỏ domain về server",
      "Setup HTTPS cơ bản"
    ]
  },
  {
    title: "5. Tư duy build nhanh với AI",
    bullets: [
      "Không học code truyền thống",
      "Tập trung vào output",
      "Build → test → fix → deploy"
    ]
  }
];

const lessons = [
  "Lesson 1: Build website đầu tiên với AI",
  "Lesson 2: Chạy web local",
  "Lesson 3: Deploy lên server",
  "Lesson 4: Domain & public web",
  "Lesson 5: Làm chủ workflow với AI"
];

const outputs = [
  "Tự build một website hoàn chỉnh",
  "Tự deploy lên internet",
  "Sử dụng domain riêng",
  "Chủ động chỉnh sửa và nâng cấp web"
];

const exploreItems = [
  "Website nội dung (blog, tin tức)",
  "Tool online",
  "Landing page cho sản phẩm/dịch vụ",
  "Affiliate / quảng cáo"
];

const goodFitItems = [
  "Người muốn tự làm một website riêng nhưng chưa biết bắt đầu từ đâu",
  "Người không có background IT nhưng muốn dùng AI để ra sản phẩm thật",
  "Freelancer, chủ shop hoặc người làm side project muốn tự chủ công cụ của mình",
  "Người muốn hiểu workflow build → test → fix → deploy thay vì chỉ xem demo"
];

const badFitItems = [
  "Người muốn học lập trình truyền thống thật sâu ngay từ đầu",
  "Người không sẵn sàng tự thực hành từng bước trên máy của mình",
  "Người chỉ muốn xem cho biết mà chưa có mục tiêu làm ra website cụ thể"
];

const prepItems = [
  "Một chiếc laptop cá nhân có thể cài và chạy project web cơ bản",
  "Tinh thần thực hành từng bước thay vì chỉ xem lý thuyết",
  "Sẵn sàng tạo tài khoản cloud, mua domain nếu muốn đưa web lên internet",
  "Chấp nhận việc AI không luôn đúng và cần biết cách test rồi sửa lại"
];

const faqItems = [
  {
    question: "Không biết code có học được không?",
    answer: "Có. Khóa học được thiết kế cho người chưa có background IT. Trọng tâm là biết cách dùng AI đúng workflow để tạo ra website thật, không bắt buộc bạn phải học lập trình truyền thống trước."
  },
  {
    question: "Học xong có tự deploy website được không?",
    answer: "Có. Nội dung khóa học đi đến bước đưa website lên internet, chạy trên cloud và gắn domain riêng, nên mục tiêu là bạn tự làm được toàn bộ flow cơ bản."
  },
  {
    question: "Tôi cần chuẩn bị gì trước khi học?",
    answer: "Bạn chỉ cần laptop cá nhân, tinh thần thực hành và sẵn sàng làm theo từng bước. Nếu muốn public website thật, bạn sẽ cần thêm tài khoản cloud và domain riêng ở giai đoạn cuối."
  },
  {
    question: "Khóa học này khác gì so với xem video AI miễn phí?",
    answer: "Điểm khác là khóa học đi theo output thực chiến: build website thật, chạy local, deploy lên internet và gắn domain. Bạn học theo một flow hoàn chỉnh thay vì xem rời rạc từng mẹo nhỏ."
  }
];

export default async function KhoaHocLamWebsitePage() {
  const sidebarTopics = await getSidebarTopics();

  return (
    <main className="py-8 pb-24 md:py-10 xl:pb-10">
      <style>{`
        :root {
          --course-bg: #f6f4ee;
          --course-surface: #ffffff;
          --course-ink: #101828;
          --course-muted: #475467;
          --course-accent: #d97706;
          --course-accent-dark: #b45309;
          --course-line: #e7dfd2;
          --course-shadow: 0 18px 50px rgba(16, 24, 40, 0.08);
          --course-radius-xl: 30px;
          --course-radius-lg: 22px;
          --course-radius-md: 16px;
          --course-max: 1120px;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background:
            radial-gradient(circle at top left, rgba(217, 119, 6, 0.08), transparent 30%),
            linear-gradient(180deg, #f8f6f1 0%, #ffffff 26%);
          color: var(--course-ink);
        }

        .course-page {
          min-height: 100vh;
        }

        .course-shell {
          width: min(calc(100% - 32px), var(--course-max));
          margin: 0 auto;
        }

        .course-nav-wrap {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(16px);
          background: rgba(248, 246, 241, 0.84);
          border-bottom: 1px solid rgba(16, 24, 40, 0.08);
        }

        .course-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 72px;
        }

        .course-brand {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--course-accent-dark);
        }

        .course-nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .course-nav-links a {
          color: var(--course-muted);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: 999px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .course-nav-links a:hover {
          background: rgba(217, 119, 6, 0.1);
          color: var(--course-ink);
        }

        .course-hero {
          padding: 88px 0 72px;
        }

        .course-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
          gap: 28px;
          align-items: stretch;
        }

        .course-panel,
        .course-card,
        .course-timeline,
        .course-price,
        .course-cta-box {
          background: var(--course-surface);
          border: 1px solid var(--course-line);
          border-radius: var(--course-radius-xl);
          box-shadow: var(--course-shadow);
        }

        .course-panel {
          padding: 40px;
        }

        .course-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(217, 119, 6, 0.1);
          color: var(--course-accent-dark);
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .course-panel h1 {
          margin: 22px 0 18px;
          font-size: clamp(2.8rem, 5vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
          max-width: 9ch;
        }

        .course-panel p {
          margin: 0;
          font-size: 1.08rem;
          line-height: 1.8;
          color: var(--course-muted);
        }

        .course-bullets {
          margin: 28px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 14px;
        }

        .course-bullets li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          color: var(--course-ink);
          font-weight: 600;
        }

        .course-bullets li::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--course-accent);
          margin-top: 0.6em;
          flex-shrink: 0;
        }

        .course-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .course-btn {
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

        .course-btn:hover {
          transform: translateY(-1px);
        }

        .course-btn-primary {
          background: var(--course-accent);
          color: #fff;
        }

        .course-btn-primary:hover {
          background: var(--course-accent-dark);
        }

        .course-btn-secondary {
          background: transparent;
          color: var(--course-ink);
          border: 1px solid var(--course-line);
        }

        .course-hero-side {
          display: grid;
          gap: 20px;
        }

        .course-card {
          padding: 28px;
        }

        .course-card h2,
        .course-card h3,
        .course-price h2,
        .course-timeline h2,
        .course-cta-box h2,
        .course-section-heading h2 {
          margin: 0;
          font-size: clamp(1.55rem, 2vw, 2rem);
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .course-card p,
        .course-price p,
        .course-cta-box p,
        .course-section-copy {
          margin: 0;
          color: var(--course-muted);
          line-height: 1.8;
          font-size: 1rem;
        }

        .course-side-highlight {
          display: grid;
          gap: 12px;
        }

        .course-side-highlight strong {
          font-size: 1.1rem;
        }

        .course-side-stat {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .course-stat-box {
          padding: 18px;
          border-radius: var(--course-radius-md);
          background: #f8f4ed;
          border: 1px solid #eadfcf;
        }

        .course-stat-box span {
          display: block;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--course-muted);
          margin-bottom: 8px;
        }

        .course-stat-box strong {
          font-size: 1.7rem;
          line-height: 1;
        }

        .course-section {
          padding: 72px 0;
        }

        .course-section-heading {
          display: grid;
          gap: 14px;
          max-width: 760px;
          margin-bottom: 30px;
        }

        .course-grid-2,
        .course-grid-3 {
          display: grid;
          gap: 22px;
        }

        .course-grid-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .course-grid-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .course-learn-card {
          padding: 28px;
          background: #fff;
          border: 1px solid var(--course-line);
          border-radius: var(--course-radius-lg);
          box-shadow: var(--course-shadow);
        }

        .course-learn-card h3 {
          margin: 0 0 16px;
          font-size: 1.2rem;
          line-height: 1.35;
        }

        .course-list {
          margin: 0;
          padding-left: 20px;
          color: var(--course-muted);
          line-height: 1.8;
        }

        .course-list li + li {
          margin-top: 8px;
        }

        .course-timeline {
          padding: 26px;
        }

        .course-timeline-list {
          list-style: none;
          margin: 24px 0 0;
          padding: 0;
          display: grid;
          gap: 16px;
        }

        .course-timeline-item {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
        }

        .course-timeline-number {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          background: #1f2937;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .course-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .course-pill {
          padding: 14px 18px;
          border-radius: 999px;
          background: #f7f1e8;
          border: 1px solid #eadfcf;
          color: #3d3d3d;
          font-weight: 600;
        }

        .course-price {
          padding: 32px;
          display: grid;
          gap: 14px;
        }

        .course-price-tag {
          font-size: clamp(2.6rem, 4vw, 4rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .course-price-note {
          font-size: 0.98rem;
          color: var(--course-muted);
        }

        .course-cta-box {
          padding: 38px;
          display: grid;
          gap: 18px;
          text-align: center;
          background: linear-gradient(180deg, #fffdf8 0%, #fff4df 100%);
        }

        .course-footer-note {
          text-align: center;
          margin-top: 18px;
          color: var(--course-muted);
          font-size: 0.96rem;
        }

        @media (max-width: 980px) {
          .course-hero-grid,
          .course-grid-2,
          .course-grid-3 {
            grid-template-columns: 1fr;
          }

          .course-panel {
            padding: 30px;
          }

          .course-nav {
            min-height: auto;
            padding: 12px 0;
            align-items: flex-start;
            flex-direction: column;
          }

          .course-nav-links {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .course-hero {
            padding: 64px 0 56px;
          }

          .course-section {
            padding: 60px 0;
          }

          .course-panel,
          .course-card,
          .course-price,
          .course-timeline,
          .course-cta-box,
          .course-learn-card {
            padding: 22px;
            border-radius: 22px;
          }

          .course-side-stat {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <ContentSidebar topics={sidebarTopics} />

          <div className="course-page min-w-0">
        <div className="course-nav-wrap">
          <div className="course-shell course-nav">
            <div className="course-brand">Học làm website với AI</div>
            <nav className="course-nav-links" aria-label="Điều hướng landing page khóa học">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <section className="course-hero">
          <div className="course-shell course-hero-grid">
            <div className="course-panel">
              <div className="course-eyebrow">Khóa học thực chiến</div>
              <h1>Học làm website với AI</h1>
              <p>
                Bạn muốn build cho mình một website riêng? Không cần background IT,
                không cần biết code, không mất nhiều thời gian học. Hiện tại với AI,
                bạn có thể tự xây dựng một website hoàn chỉnh chỉ trong vài ngày.
              </p>
              <ul className="course-bullets">
                <li>Không cần background IT</li>
                <li>Không cần biết code</li>
                <li>Không mất nhiều thời gian học</li>
                <li>Tự build được, không phụ thuộc vào dev</li>
              </ul>
              <p style={{ marginTop: "22px" }}>
                Khóa học này sẽ hướng dẫn bạn cách sử dụng AI và các công cụ thực tế để tạo website từ con số 0, deploy lên internet và gắn domain riêng.
              </p>
              <div className="course-actions">
                <a className="course-btn course-btn-primary" href="#dang-ky">
                  Đăng ký ngay để bắt đầu
                </a>
                <a className="course-btn course-btn-secondary" href="#hoc-gi">
                  Xem nội dung khóa học
                </a>
              </div>
            </div>

            <div className="course-hero-side">
              <div className="course-card course-side-highlight">
                <h2>Mục tiêu của khóa học</h2>
                <p>
                  Bạn không học để biết thêm một công nghệ. Bạn học để tự ra được một website thật, nhìn được trên internet, có domain riêng và có thể tiếp tục sửa, nâng cấp sau này.
                </p>
              </div>
              <div className="course-card">
                <h3>Điểm nhấn</h3>
                <div className="course-side-stat">
                  <div className="course-stat-box">
                    <span>Workflow</span>
                    <strong>AI → Web</strong>
                  </div>
                  <div className="course-stat-box">
                    <span>Triển khai</span>
                    <strong>Cloud + Domain</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hoc-gi" className="course-section">
          <div className="course-shell">
            <header className="course-section-heading">
              <h2>Bạn sẽ học gì</h2>
              <p className="course-section-copy">
                Nội dung đi theo đúng flow làm ra sản phẩm: từ dùng AI để build, chạy local, đưa web lên internet, gắn domain cho tới tư duy build nhanh để ra output thực tế.
              </p>
            </header>
            <div className="course-grid-2">
              {learningItems.map((item) => (
                <article key={item.title} className="course-learn-card">
                  <h3>{item.title}</h3>
                  <ul className="course-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lo-trinh" className="course-section">
          <div className="course-shell course-grid-2">
            <div className="course-timeline">
              <h2>Lộ trình khóa học</h2>
              <ol className="course-timeline-list">
                {lessons.map((lesson, index) => (
                  <li key={lesson} className="course-timeline-item">
                    <span className="course-timeline-number">{index + 1}</span>
                    <div>
                      <strong>{lesson}</strong>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="course-card" id="output">
              <h2>Output bạn đạt được</h2>
              <ul className="course-list" style={{ marginTop: "20px" }}>
                {outputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ marginTop: "18px" }}>
                Quan trọng nhất: hiểu cách dùng AI để tạo sản phẩm thực tế, thay vì chỉ dừng ở mức đọc lý thuyết hoặc xem demo.
              </p>
            </div>
          </div>
        </section>

        <section id="explore" className="course-section">
          <div className="course-shell course-grid-2">
            <div className="course-card">
              <h2>Hướng đi bạn có thể explore</h2>
              <div className="course-pill-list" style={{ marginTop: "22px" }}>
                {exploreItems.map((item) => (
                  <span key={item} className="course-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="course-price" id="chi-phi">
              <h2>Chi phí</h2>
              <div className="course-price-tag">5.000.000 VND</div>
              <p>Học phí: 5.000.000 VND</p>
              <p className="course-price-note">Không yêu cầu kiến thức nền. Trọng tâm là làm được sản phẩm thật với workflow rõ ràng.</p>
            </div>
          </div>
        </section>

        <section id="phu-hop" className="course-section">
          <div className="course-shell course-grid-2">
            <div className="course-card">
              <h2>Khóa học phù hợp với ai?</h2>
              <ul className="course-list" style={{ marginTop: "20px" }}>
                {goodFitItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="course-card">
              <h2>Không phù hợp nếu bạn đang cần</h2>
              <ul className="course-list" style={{ marginTop: "20px" }}>
                {badFitItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="chuan-bi" className="course-section">
          <div className="course-shell course-grid-2">
            <div className="course-card">
              <h2>Bạn cần chuẩn bị gì trước khi học?</h2>
              <ul className="course-list" style={{ marginTop: "20px" }}>
                {prepItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="course-card">
              <h2>Vì sao khóa học này khác?</h2>
              <p style={{ marginTop: "20px" }}>
                Điểm khác của khóa học không nằm ở việc giới thiệu thêm một công cụ AI, mà ở chỗ bạn đi hết một quy trình hoàn chỉnh để làm ra website thật. Bạn sẽ hiểu cách chia việc cho AI, cách sửa khi AI làm sai và cách đưa sản phẩm lên internet để dùng thật.
              </p>
              <p style={{ marginTop: "16px" }}>
                Mục tiêu là giúp bạn có một workflow thực chiến có thể lặp lại cho các dự án sau này, thay vì chỉ xem những ví dụ ngắn rồi không tự triển khai được.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="course-section">
          <div className="course-shell">
            <header className="course-section-heading">
              <h2>FAQ</h2>
              <p className="course-section-copy">
                Một số câu hỏi thực tế mà người mới thường quan tâm trước khi bắt đầu học làm website với AI.
              </p>
            </header>
            <div className="course-grid-2">
              {faqItems.map((item) => (
                <article key={item.question} className="course-card">
                  <h3>{item.question}</h3>
                  <p style={{ marginTop: "14px" }}>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dang-ky" className="course-section">
          <div className="course-shell">
            <div className="course-cta-box">
              <h2>Đăng ký ngay để bắt đầu</h2>
              <p>
                Nếu bạn muốn tự build một website riêng bằng AI, deploy lên internet và chủ động chỉnh sửa về sau, đây là điểm bắt đầu phù hợp để đi thẳng vào thực hành.
              </p>
              <div className="course-actions" style={{ justifyContent: "center" }}>
                <a className="course-btn course-btn-primary" href="mailto:thanhtungit92@gmail.com?subject=WEB_COURSE%20-%20%C4%90%C4%83ng%20k%C3%BD%20kh%C3%B3a%20h%E1%BB%8Dc&body=Zalo%3A%20%0AN%E1%BB%99i%20dung%3A%20WEB_COURSE">
                  Gửi email đăng ký
                </a>
                <a className="course-btn course-btn-secondary" href="/contact">
                  Xem hướng dẫn soạn email
                </a>
              </div>
              <p className="course-footer-note">
                Mục tiêu: bạn tự làm được, không phụ thuộc vào dev.
              </p>
            </div>
          </div>
        </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
