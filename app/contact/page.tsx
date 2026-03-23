import type { Metadata } from "next";

import { InfoPageLayout } from "@/components/ui/InfoPageLayout";
import { getSiteUrl } from "@/lib/seo";

const title = "Liên hệ qua email: Hướng dẫn gửi nhu cầu khóa học hoặc trading bot";
const description =
  "Trang liên hệ chính thức hướng dẫn cách soạn email để trao đổi về khóa học làm website với AI hoặc dịch vụ build trading bot Binance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/contact`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/contact`,
    locale: "vi_VN",
    type: "article"
  },
  twitter: {
    card: "summary",
    title,
    description
  }
};

export default function ContactPage() {
  return (
    <InfoPageLayout
      eyebrow="Liên hệ"
      title="Liên hệ qua email"
      description="Hiện tại website sử dụng email làm kênh tiếp nhận trao đổi chính. Nếu bạn quan tâm đến khóa học hoặc dịch vụ build bot, chỉ cần soạn mail theo đúng mẫu bên dưới để việc phản hồi nhanh và rõ hơn."
      sections={[
        {
          title: "Email liên hệ chính thức",
          content: (
            <p>
              Email liên hệ: {" "}
              <a
                href="mailto:thanhtungit92@gmail.com"
                className="font-semibold text-portal-700 underline underline-offset-4"
              >
                thanhtungit92@gmail.com
              </a>
            </p>
          )
        },
        {
          title: "Nếu bạn muốn đăng ký khóa học",
          content: (
            <>
              <p>Soạn email với nội dung tối thiểu như sau:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Tiêu đề hoặc nội dung có mã: <strong>WEB_COURSE</strong></li>
                <li>Zalo: số điện thoại hoặc tài khoản Zalo để liên hệ lại</li>
                <li>Không cần mô tả thêm ở bước đầu, chỉ cần đúng mã nhu cầu và Zalo</li>
              </ul>
            </>
          )
        },
        {
          title: "Nếu bạn muốn trao đổi về bot Binance",
          content: (
            <>
              <p>Soạn email với nội dung tối thiểu như sau:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Tiêu đề hoặc nội dung có mã: <strong>BOT_TRADING</strong></li>
                <li>Zalo: số điện thoại hoặc tài khoản Zalo để liên hệ lại</li>
                <li>Không cần mô tả chiến lược ở bước đầu, chỉ cần đúng mã nhu cầu và Zalo</li>
              </ul>
            </>
          )
        },
        {
          title: "Lưu ý khi gửi email",
          content: (
            <>
              <p>
                Ở bước đầu, bạn chỉ cần gửi đúng mã nhu cầu và số Zalo. Các chi tiết sâu hơn sẽ được trao đổi sau khi kết nối được với nhau qua email.
              </p>
              <p>
                Các email phù hợp sẽ được xem xét và phản hồi trong thời gian hợp lý, tùy theo nội dung và khối lượng công việc tại từng thời điểm.
              </p>
            </>
          )
        }
      ]}
    />
  );
}
