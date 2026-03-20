import { Container } from "@/components/ui/Container";

type HeroSectionProps = {
  totalItems: number;
};

export function HeroSection({ totalItems }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#eaf3ff,_#f8fbff_50%,_#ffffff_90%)] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] [background-size:36px_36px]" />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-portal-200 bg-white/70 px-3 py-1 text-sm font-semibold text-portal-700 backdrop-blur">
            Tập trung vào trải nghiệm lịch
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Xem lịch trực tuyến nhanh, rõ ràng và dễ dùng mỗi ngày
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-700 md:text-xl">
            Giai đoạn hiện tại homepage chỉ ưu tiên mục Lịch để bạn tra cứu nhanh trên cả điện thoại và máy tính. Các nội dung khác được tạm ẩn và có thể bật lại sau.
          </p>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Hiện có {totalItems} nội dung xuất bản trên trang chủ
          </p>
        </div>
      </Container>
    </section>
  );
}
