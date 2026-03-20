import type { Metadata } from "next";

import { InfoPageLayout } from "@/components/ui/InfoPageLayout";
import { getSiteUrl } from "@/lib/seo";

const title = "Điều khoản sử dụng: Nội dung tham khảo dành cho người dùng website";
const description =
  "Xem điều khoản sử dụng của website, bao gồm phạm vi cung cấp nội dung, tính chất tham khảo của thông tin, liên kết bên thứ ba và giới hạn trách nhiệm.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/terms`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/terms`,
    locale: "vi_VN",
    type: "article"
  },
  twitter: {
    card: "summary",
    title,
    description
  }
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      eyebrow="Điều khoản"
      title="Điều khoản sử dụng"
      description="Các điều khoản dưới đây nhằm giúp người dùng hiểu rõ hơn về cách website cung cấp nội dung, phạm vi tham khảo của thông tin và những nguyên tắc sử dụng cơ bản trong giai đoạn hiện tại."
      sections={[
        {
          title: "Phạm vi cung cấp nội dung",
          content: (
            <>
              <p>
                Website được xây dựng với mục đích cung cấp thông tin hữu ích cho người dùng theo
                cách nhanh gọn, thuận tiện và dễ tiếp cận.
              </p>
              <p>
                Ở giai đoạn hiện tại, website chủ yếu tập trung vào nội dung thông tin, trải nghiệm
                người dùng và phát triển lưu lượng truy cập, thay vì cung cấp các dịch vụ yêu cầu xử
                lý dữ liệu cá nhân chuyên sâu.
              </p>
            </>
          )
        },
        {
          title: "Tính chất tham khảo của thông tin",
          content: (
            <>
              <p>
                Nội dung trên website được cung cấp chủ yếu cho mục đích tham khảo và hỗ trợ người
                dùng tiếp cận thông tin nhanh hơn.
              </p>
              <p>
                Với những thông tin quan trọng liên quan đến tài chính, pháp lý, giao dịch, quyết
                định công việc hoặc các vấn đề cần độ chính xác cao, người dùng nên tự kiểm tra lại
                từ nguồn chính thức hoặc nguồn phù hợp khác trước khi sử dụng.
              </p>
            </>
          )
        },
        {
          title: "Liên kết đến bên thứ ba",
          content: (
            <>
              <p>
                Website có thể chứa liên kết dẫn đến các trang, dịch vụ hoặc nội dung của bên thứ ba
                để giúp người dùng tiếp cận thông tin nhanh hơn.
              </p>
              <p>
                Các điểm đến bên ngoài website có thể có nội dung, chính sách hoặc cách vận hành
                riêng. Website không kiểm soát toàn bộ những nội dung đó và không chịu trách nhiệm
                hoàn toàn đối với các thay đổi xảy ra trên các điểm đến bên thứ ba.
              </p>
            </>
          )
        },
        {
          title: "Quyền thay đổi nội dung",
          content: (
            <>
              <p>
                Chủ sở hữu website có quyền cập nhật, chỉnh sửa, bổ sung, tạm ẩn hoặc gỡ bỏ bất kỳ
                nội dung nào vào bất kỳ thời điểm nào khi thấy cần thiết.
              </p>
              <p>
                Những thay đổi này có thể được thực hiện nhằm cải thiện chất lượng nội dung, tối ưu
                trải nghiệm hoặc điều chỉnh theo định hướng phát triển của website.
              </p>
            </>
          )
        },
        {
          title: "Quyền và trách nhiệm của người dùng",
          content: (
            <>
              <p>
                Người dùng có thể truy cập và sử dụng website cho nhu cầu tham khảo thông tin hợp
                pháp, phù hợp với mục đích thông thường của một website nội dung công khai.
              </p>
              <p>
                Người dùng nên tự đánh giá mức độ phù hợp của thông tin đối với nhu cầu cụ thể của
                mình, đồng thời không sử dụng nội dung trên website theo cách gây hiểu nhầm, sai lệch
                hoặc trái với quy định pháp luật hiện hành.
              </p>
            </>
          )
        },
        {
          title: "Giới hạn trách nhiệm",
          content: (
            <>
              <p>
                Website cố gắng trình bày nội dung rõ ràng và hữu ích, nhưng không bảo đảm rằng mọi
                thông tin luôn đầy đủ tuyệt đối, cập nhật tức thời hoặc phù hợp với mọi tình huống
                sử dụng riêng biệt.
              </p>
              <p>
                Trong phạm vi pháp luật cho phép, website không chịu trách nhiệm đối với các quyết
                định, tổn thất hoặc hệ quả phát sinh từ việc người dùng phụ thuộc hoàn toàn vào thông
                tin tham khảo trên website hoặc từ các liên kết dẫn sang bên thứ ba.
              </p>
            </>
          )
        },
        {
          title: "Cập nhật điều khoản",
          content: (
            <>
              <p>
                Điều khoản sử dụng này có thể được cập nhật trong tương lai để phản ánh những thay
                đổi về nội dung, cách vận hành hoặc định hướng phát triển của website.
              </p>
              <p>
                Người dùng nên xem lại trang này khi cần để nắm được phiên bản điều khoản mới nhất
                đang được áp dụng.
              </p>
            </>
          )
        }
      ]}
    />
  );
}
