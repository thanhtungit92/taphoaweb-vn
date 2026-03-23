import type { Metadata } from "next";

import { InfoPageLayout } from "@/components/ui/InfoPageLayout";
import { getSiteUrl } from "@/lib/seo";

const title = "Chính sách bảo mật: Cách website thu thập và sử dụng dữ liệu";
const description =
  "Xem cách website thu thập dữ liệu cơ bản như pageview, thông tin liên hệ qua email và cách dữ liệu được sử dụng để cải thiện trải nghiệm người dùng.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/privacy`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/privacy`,
    locale: "vi_VN",
    type: "article"
  },
  twitter: {
    card: "summary",
    title,
    description
  }
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      eyebrow="Bảo mật"
      title="Chính sách bảo mật"
      description="Trang này giải thích ngắn gọn cách website xử lý dữ liệu cơ bản trong quá trình người dùng truy cập, tương tác và liên hệ."
      sections={[
        {
          title: "Dữ liệu website có thể thu thập",
          content: (
            <>
              <p>
                Khi người dùng truy cập website, hệ thống có thể ghi nhận một số dữ liệu kỹ thuật cơ bản như đường dẫn đã xem, thời điểm truy cập, trình duyệt, kích thước màn hình, ngôn ngữ thiết bị và múi giờ trình duyệt.
              </p>
              <p>
                Những dữ liệu này chủ yếu phục vụ cho việc thống kê traffic và cải thiện trải nghiệm sử dụng website theo thời gian.
              </p>
            </>
          )
        },
        {
          title: "Mục đích sử dụng dữ liệu",
          content: (
            <>
              <p>
                Dữ liệu được sử dụng để theo dõi số lượt truy cập, hiểu những trang nào được quan tâm nhiều hơn và cải thiện cấu trúc nội dung cũng như trải nghiệm điều hướng của website.
              </p>
              <p>
                Website không thu thập dữ liệu để bán cho bên thứ ba và không sử dụng dữ liệu traffic cơ bản cho mục đích quảng cáo cá nhân hóa ở giai đoạn hiện tại.
              </p>
            </>
          )
        },
        {
          title: "Thông tin liên hệ do người dùng chủ động gửi",
          content: (
            <>
              <p>
                Nếu người dùng liên hệ qua email, các thông tin được gửi trong email như địa chỉ email, mã nhu cầu hoặc số Zalo sẽ được xem là thông tin do người dùng chủ động cung cấp.
              </p>
              <p>
                Những thông tin này chỉ được dùng để phản hồi nhu cầu liên hệ, trao đổi công việc hoặc hỗ trợ các nội dung mà người dùng đã chủ động yêu cầu.
              </p>
            </>
          )
        },
        {
          title: "Cách website lưu dữ liệu traffic cơ bản",
          content: (
            <>
              <p>
                Website hiện sử dụng cơ chế analytics nội bộ để ghi lại pageview. Dữ liệu dạng kỹ thuật như đường dẫn truy cập, visitor ID, referrer hoặc timezone có thể được lưu ở dạng log nhằm phục vụ báo cáo traffic và đánh giá hiệu quả nội dung.
              </p>
              <p>
                Địa chỉ IP nếu có xuất hiện trong quá trình xử lý sẽ được băm trước khi lưu, nhằm giảm rủi ro lưu trữ dữ liệu nhận diện trực tiếp không cần thiết.
              </p>
            </>
          )
        },
        {
          title: "Chia sẻ dữ liệu với bên thứ ba",
          content: (
            <>
              <p>
                Website không chủ động bán hoặc chia sẻ dữ liệu traffic cơ bản của người dùng cho bên thứ ba vì mục đích thương mại trong phạm vi vận hành hiện tại.
              </p>
              <p>
                Tuy vậy, hạ tầng lưu trữ, email hoặc dịch vụ cloud có thể tham gia vào quá trình vận hành website. Những dịch vụ này có chính sách bảo mật riêng và người dùng nên hiểu rằng hạ tầng kỹ thuật vẫn có thể liên quan đến việc xử lý dữ liệu ở mức cần thiết để website hoạt động bình thường.
              </p>
            </>
          )
        },
        {
          title: "Quyền của người dùng",
          content: (
            <>
              <p>
                Người dùng có thể chủ động không gửi thông tin liên hệ nếu không có nhu cầu trao đổi. Trong trường hợp đã liên hệ qua email và muốn điều chỉnh hoặc xóa thông tin trao đổi, người dùng có thể tiếp tục liên hệ lại để yêu cầu xử lý phù hợp trong phạm vi khả thi.
              </p>
              <p>
                Với dữ liệu traffic cơ bản dạng tổng hợp, website chủ yếu sử dụng cho thống kê nội bộ nên việc gắn dữ liệu đó với danh tính cụ thể của một cá nhân không phải là mục tiêu vận hành chính.
              </p>
            </>
          )
        },
        {
          title: "Cập nhật chính sách bảo mật",
          content: (
            <>
              <p>
                Chính sách này có thể được cập nhật khi website thay đổi cách vận hành, bổ sung tính năng mới hoặc thay đổi công cụ theo dõi dữ liệu.
              </p>
              <p>
                Người dùng nên xem lại trang này định kỳ nếu muốn nắm phiên bản chính sách mới nhất.
              </p>
            </>
          )
        }
      ]}
    />
  );
}
