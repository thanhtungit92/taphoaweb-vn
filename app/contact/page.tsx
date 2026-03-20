import type { Metadata } from "next";

import { InfoPageLayout } from "@/components/ui/InfoPageLayout";
import { getSiteUrl } from "@/lib/seo";

const title = "Liên hệ: Gửi góp ý, đề xuất nội dung hoặc báo lỗi thông tin";
const description =
  "Trang liên hệ chính thức để gửi góp ý, đề xuất nội dung, phản hồi về trải nghiệm hoặc báo thông tin chưa chính xác trên website.";

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
      title="Liên hệ với chúng tôi"
      description="Nếu bạn muốn góp ý, đề xuất nội dung, báo thông tin chưa chính xác hoặc trao đổi về những vấn đề liên quan đến website, bạn có thể liên hệ qua email bên dưới."
      sections={[
        {
          title: "Khi nào nên liên hệ",
          content: (
            <>
              <p>Bạn có thể liên hệ trong các trường hợp như:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Góp ý để website dễ dùng hơn hoặc rõ ràng hơn.</li>
                <li>Đề xuất chủ đề, nội dung hoặc công cụ nên được bổ sung.</li>
                <li>Báo thông tin chưa chính xác, thiếu cập nhật hoặc gây hiểu nhầm.</li>
                <li>Trao đổi về hợp tác nội dung hoặc các vấn đề liên quan đến website.</li>
              </ul>
            </>
          )
        },
        {
          title: "Email liên hệ",
          content: (
            <p>
              Email liên hệ chính thức:{" "}
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
          title: "Thời gian phản hồi",
          content: (
            <>
              <p>
                Các email phù hợp sẽ được xem xét và phản hồi trong thời gian hợp lý, tùy theo nội
                dung và khối lượng công việc tại từng thời điểm.
              </p>
              <p>
                Website cố gắng duy trì việc trao đổi rõ ràng và lịch sự, nhưng không đặt ra cam kết
                phản hồi tức thời cho mọi trường hợp.
              </p>
            </>
          )
        },
        {
          title: "Lưu ý khi gửi liên hệ",
          content: (
            <>
              <p>
                Để việc trao đổi thuận tiện hơn, bạn nên trình bày ngắn gọn nội dung cần liên hệ,
                kèm liên kết hoặc mô tả cụ thể nếu đang phản hồi về một trang hay một thông tin cụ
                thể trên website.
              </p>
              <p>
                Những nội dung rõ ràng, liên quan trực tiếp đến website hoặc trải nghiệm người dùng
                thường sẽ dễ được xem xét hơn.
              </p>
            </>
          )
        }
      ]}
    />
  );
}
