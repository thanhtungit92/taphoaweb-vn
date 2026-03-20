import type { Metadata } from "next";

import { InfoPageLayout } from "@/components/ui/InfoPageLayout";
import { getSiteUrl } from "@/lib/seo";

const title = "Giới thiệu website: Cổng thông tin tiện lợi cho người dùng Việt Nam";
const description =
  "Tìm hiểu mục đích hoạt động, định hướng phát triển và cam kết trải nghiệm người dùng của website thông tin tiện lợi dành cho người dùng Việt Nam.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/about`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/about`,
    locale: "vi_VN",
    type: "article"
  },
  twitter: {
    card: "summary",
    title,
    description
  }
};

export default function AboutPage() {
  return (
    <InfoPageLayout
      eyebrow="Giới thiệu"
      title="Website này được xây dựng để giúp người dùng tìm thông tin nhanh hơn"
      description="Mục tiêu của website là tổng hợp các nội dung hữu ích theo cách gọn gàng, dễ tiếp cận và thuận tiện, để người dùng không cần phải mở quá nhiều ứng dụng, website hay nguồn khác nhau chỉ để tìm những thông tin cơ bản mỗi ngày."
      sections={[
        {
          title: "Giới thiệu website",
          content: (
            <>
              <p>
                Đây là một website nội dung dành cho người dùng Việt Nam, tập trung vào việc trình
                bày thông tin theo cách rõ ràng, ngắn gọn và dễ sử dụng trên cả máy tính lẫn điện
                thoại.
              </p>
              <p>
                Thay vì buộc người dùng phải tự tìm kiếm qua nhiều nguồn rời rạc, website hướng đến
                việc gom những nội dung thiết thực vào một trải nghiệm đơn giản và nhất quán hơn.
              </p>
            </>
          )
        },
        {
          title: "Mục đích hoạt động",
          content: (
            <>
              <p>
                Website hoạt động với mục tiêu giúp người dùng tiếp cận thông tin hữu ích một cách
                nhanh chóng và thuận tiện hơn trong nhu cầu hằng ngày.
              </p>
              <p>
                Trọng tâm hiện tại là xây dựng một nền tảng nội dung dễ dùng, đáng tin cậy và tiết
                kiệm thời gian tra cứu cho người xem.
              </p>
            </>
          )
        },
        {
          title: "Nội dung website cung cấp",
          content: (
            <>
              <p>
                Website ưu tiên các nội dung mang tính thực dụng, dễ tra cứu và có giá trị sử dụng
                trực tiếp trong đời sống hằng ngày.
              </p>
              <p>
                Tùy từng giai đoạn phát triển, nội dung có thể bao gồm các công cụ tiện ích, thông
                tin tham khảo nhanh, trang tổng hợp nội dung chuyên đề và các trang hỗ trợ người dùng
                tiếp cận thông tin thuận lợi hơn.
              </p>
            </>
          )
        },
        {
          title: "Định hướng phát triển",
          content: (
            <>
              <p>
                Trong thời gian tới, website sẽ tiếp tục mở rộng theo hướng bổ sung thêm các nội dung
                hữu ích, cải thiện cấu trúc điều hướng và làm cho việc truy cập thông tin trở nên tự
                nhiên hơn.
              </p>
              <p>
                Định hướng chung là phát triển bền vững, tập trung vào chất lượng trải nghiệm và giá
                trị thực tế thay vì mở rộng dàn trải.
              </p>
            </>
          )
        },
        {
          title: "Cam kết cải thiện trải nghiệm người dùng",
          content: (
            <>
              <p>
                Website luôn được duy trì theo hướng đơn giản, dễ đọc, tốc độ tốt và hạn chế những
                yếu tố gây rối mắt hoặc làm chậm quá trình tiếp cận thông tin.
              </p>
              <p>
                Mọi góp ý từ người dùng về nội dung, cấu trúc hoặc trải nghiệm đều có giá trị tham
                khảo để website tiếp tục được hoàn thiện theo hướng hữu ích và thực tế hơn.
              </p>
            </>
          )
        }
      ]}
    />
  );
}
