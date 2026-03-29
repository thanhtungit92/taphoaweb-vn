import type { DailyHoroscopeEntry } from "@/lib/types";

type DailyHoroscopeReaderProps = {
  entry: DailyHoroscopeEntry;
  theme: "animal" | "zodiac";
};

export function DailyHoroscopeReader({
  entry,
  theme
}: DailyHoroscopeReaderProps) {
  const themeClassName =
    theme === "animal"
      ? "bg-[radial-gradient(circle_at_top_left,_#fff4e8,_#ffffff_58%)]"
      : "bg-[radial-gradient(circle_at_top_left,_#eef4ff,_#ffffff_58%)]";

  const accentClassName = theme === "animal" ? "text-amber-700" : "text-blue-700";
  const badgeClassName =
    theme === "animal"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-blue-200 bg-blue-50 text-blue-800";

  return (
    <div className="space-y-6">
      <section className={`rounded-[2rem] border border-slate-200 p-6 shadow-card md:p-8 ${themeClassName}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClassName}`}>
            Bản đọc theo ngày
          </span>
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700">
            Ngày cập nhật: {entry.publishDate}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          {entry.name}
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 md:text-lg">
          {entry.intro}
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <h2 className="text-xl font-bold text-slate-900">Công việc</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{entry.sections.congViec}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <h2 className="text-xl font-bold text-slate-900">Tài lộc</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{entry.sections.taiLoc}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <h2 className="text-xl font-bold text-slate-900">Tình cảm</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{entry.sections.tinhCam}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <h2 className="text-xl font-bold text-slate-900">Sức khỏe</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{entry.sections.sucKhoe}</p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Gợi ý nhanh trong ngày</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Màu hợp
            </p>
            <p className={`mt-2 text-lg font-bold ${accentClassName}`}>{entry.lucky.mauSac}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Con số
            </p>
            <p className={`mt-2 text-lg font-bold ${accentClassName}`}>{entry.lucky.conSo}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Giờ tốt
            </p>
            <p className={`mt-2 text-lg font-bold ${accentClassName}`}>{entry.lucky.gioTot}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Quý nhân
            </p>
            <p className={`mt-2 text-lg font-bold ${accentClassName}`}>{entry.lucky.quyNhan}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
