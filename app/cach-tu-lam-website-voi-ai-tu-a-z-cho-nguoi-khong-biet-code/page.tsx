import type { Metadata } from "next";
import Link from "next/link";

import { InfoPageLayout } from "@/components/ui/InfoPageLayout";
import { getSiteUrl } from "@/lib/seo";

const title = "Cách tự làm website với AI từ A-Z cho người không biết code";
const description =
  "Hướng dẫn thực tế cho người mới muốn dùng AI để tự làm website, chạy local, deploy lên cloud, gắn domain và vận hành với chi phí thấp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${getSiteUrl()}/cach-tu-lam-website-voi-ai-tu-a-z-cho-nguoi-khong-biet-code`
  },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/cach-tu-lam-website-voi-ai-tu-a-z-cho-nguoi-khong-biet-code`,
    locale: "vi_VN",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export default function AiWebsiteGuidePage() {
  return (
    <InfoPageLayout
      eyebrow="Hướng dẫn"
      title="Cách tự làm website với AI từ A-Z cho người không biết code"
      description="Nếu bạn chưa có background kỹ thuật nhưng muốn tự làm một website thật, AI hiện tại đã đủ mạnh để rút ngắn đáng kể thời gian học và thử sai. Điều quan trọng không phải là học mọi thứ về code, mà là hiểu đúng workflow để biến AI thành công cụ tạo ra sản phẩm thực tế."
      sections={[
        {
          title: "1. Người không biết code có thật sự tự làm website với AI được không?",
          content: (
            <>
              <p>
                Có, nhưng theo một cách thực tế hơn nhiều người tưởng. AI không biến bạn thành lập trình viên chỉ sau một đêm, nhưng nó giúp bạn đi từ ý tưởng tới bản chạy được nhanh hơn rất nhiều nếu bạn biết cách chia bài toán đúng.
              </p>
              <p>
                Với người mới, thứ cần học trước không phải là framework phức tạp, mà là cách mô tả yêu cầu rõ ràng, cách test đầu ra, cách sửa lỗi từng bước và cách đưa sản phẩm lên internet. Nếu đi theo workflow đúng, bạn hoàn toàn có thể tự làm một website nhỏ để phục vụ công việc, bán hàng, nội dung hoặc side project.
              </p>
            </>
          )
        },
        {
          title: "2. AI giúp được gì trong quá trình làm website?",
          content: (
            <>
              <p>
                AI hỗ trợ mạnh nhất ở 4 phần: lên ý tưởng cấu trúc trang, generate code ban đầu, giải thích lỗi khi chạy và gợi ý cách chỉnh sửa khi bạn muốn đổi giao diện hoặc thêm tính năng.
              </p>
              <p>
                Thay vì ngồi viết mọi thứ từ đầu, bạn có thể dùng AI để tạo một landing page, một trang nội dung hoặc một app nhỏ rồi sửa dần. Cách này phù hợp hơn rất nhiều với người mới vì bạn luôn có thứ gì đó để nhìn, để chạy và để kiểm tra, thay vì chỉ học lý thuyết khô.
              </p>
            </>
          )
        },
        {
          title: "3. Workflow đơn giản nhất để bắt đầu",
          content: (
            <>
              <p>
                Một workflow thực tế thường sẽ đi theo thứ tự: xác định website cần làm gì, yêu cầu AI tạo phiên bản đầu tiên, chạy website trên máy cá nhân, sửa lỗi phát sinh, chỉnh giao diện theo nhu cầu rồi mới nghĩ đến chuyện deploy lên internet.
              </p>
              <p>
                Với người mới, làm từng bước nhỏ luôn hiệu quả hơn là yêu cầu AI tạo một hệ thống quá lớn ngay từ đầu. Khi mỗi bước đều có đầu ra rõ ràng, bạn sẽ kiểm soát được tiến độ và hiểu mình đang sửa cái gì.
              </p>
            </>
          )
        },
        {
          title: "4. Bạn cần chuẩn bị những gì trước khi bắt đầu?",
          content: (
            <>
              <p>
                Tối thiểu bạn cần một laptop cá nhân, một công cụ AI phù hợp để trao đổi yêu cầu, và sẵn sàng tự thao tác những bước cơ bản như mở terminal, chạy project local hoặc copy file lên server.
              </p>
              <p>
                Nếu mục tiêu là public website thật, bạn cũng sẽ cần thêm một tài khoản cloud và một domain riêng. Tin tốt là chi phí để vận hành một website nhỏ hiện nay không còn quá cao nếu bạn chọn hạ tầng phù hợp và giữ scope gọn lúc đầu.
              </p>
            </>
          )
        },
        {
          title: "5. Những lỗi người mới thường gặp khi dùng AI để làm website",
          content: (
            <>
              <p>
                Lỗi phổ biến nhất là hỏi AI quá chung chung. Khi yêu cầu không rõ, AI vẫn có thể trả lời, nhưng kết quả thường không sát nhu cầu thật. Lỗi thứ hai là cố sửa quá nhiều thứ cùng lúc, khiến bạn không biết chính xác phần nào đang gây lỗi.
              </p>
              <p>
                Ngoài ra, nhiều người nghĩ rằng chỉ cần AI generate xong là website đã hoàn chỉnh. Thực tế, bạn vẫn cần test kỹ, xem giao diện trên mobile, kiểm tra link, chỉnh nội dung và hiểu tối thiểu cách deploy. AI giúp tiết kiệm công sức, nhưng không thay thế hoàn toàn việc kiểm tra đầu ra.
              </p>
            </>
          )
        },
        {
          title: "6. Sau khi build xong, đưa website lên internet như thế nào?",
          content: (
            <>
              <p>
                Sau khi website chạy ổn trên máy cá nhân, bước tiếp theo là đưa nó lên một server hoặc dịch vụ cloud để người khác có thể truy cập. Với website nhỏ, bạn có thể bắt đầu từ một máy ảo cloud cơ bản, cài môi trường chạy, upload source code và chạy website ở cổng nội bộ.
              </p>
              <p>
                Từ đó, bạn trỏ domain về server, cấu hình web server như Nginx và bật HTTPS để website chạy ổn định với địa chỉ riêng. Đây là phần nhiều người mới ngại nhất, nhưng thực ra hoàn toàn có thể làm được nếu đi theo checklist rõ ràng từng bước.
              </p>
            </>
          )
        },
        {
          title: "7. Tự làm website với AI phù hợp với ai?",
          content: (
            <>
              <p>
                Cách làm này đặc biệt phù hợp với freelancer, chủ shop, người làm side project, người muốn tạo site nội dung riêng hoặc bất kỳ ai muốn rút ngắn quãng đường từ ý tưởng tới sản phẩm.
              </p>
              <p>
                Nó không phù hợp nếu bạn muốn học computer science bài bản ngay từ đầu hoặc muốn AI làm hết mà không cần tự kiểm tra gì. Muốn đi nhanh với AI, bạn vẫn cần tinh thần thực hành, đọc lỗi và sửa dần từng phần.
              </p>
            </>
          )
        },
        {
          title: "8. Nếu muốn đi nhanh hơn, nên học theo kiểu nào?",
          content: (
            <>
              <p>
                Cách nhanh nhất là học theo output. Thay vì đọc quá nhiều tài liệu rời rạc, bạn nên đi theo một lộ trình có sản phẩm cuối rõ ràng: tạo website đầu tiên, chạy local, deploy lên cloud, gắn domain và biết cách sửa khi AI làm sai.
              </p>
              <p>
                Nếu bạn đang muốn tự ra một website thật thay vì chỉ xem ví dụ, có thể xem thêm trang <Link href="/khoa-hoc-lam-website-voi-ai-chi-phi-thap" className="font-semibold text-portal-700 underline-offset-2 hover:underline">Học làm website với AI</Link> để có lộ trình thực chiến rõ hơn.
              </p>
            </>
          )
        }
      ]}
    />
  );
}
