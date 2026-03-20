import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentSidebar } from "@/components/ui/ContentSidebar";
import { Container } from "@/components/ui/Container";
import { getItemBySlug, getSidebarTopics } from "@/lib/content";
import { convertLunarToSolar, getLunarDate } from "@/lib/lunar";
import { getSiteUrl } from "@/lib/seo";

const WEEKDAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

type BaseSpecialDay = {
  label: string;
  note: string;
};

type ResolvedSpecialDay = BaseSpecialDay & {
  solarLabel: string;
  lunarLabel: string;
};

function getCalendarCells(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();
  const totalCells = Math.ceil((startOffset + totalDays) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - startOffset + 1;
    return dayNumber >= 1 && dayNumber <= totalDays ? dayNumber : null;
  });
}

function getMonthName(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function getYearCalendar(year: number) {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const baseDate = new Date(year, monthIndex, 1);

    return {
      monthIndex,
      label: getMonthName(baseDate),
      cells: getCalendarCells(year, monthIndex)
    };
  });
}

function getCanChiYear(year: number) {
  const stems = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const branches = [
    "Tý",
    "Sửu",
    "Dần",
    "Mão",
    "Thìn",
    "Tỵ",
    "Ngọ",
    "Mùi",
    "Thân",
    "Dậu",
    "Tuất",
    "Hợi"
  ];

  return `${stems[(year + 6) % 10]} ${branches[(year + 8) % 12]}`;
}

function formatSolarDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function formatLunarLabel(date: Date) {
  const lunarDate = getLunarDate(date);
  return `${lunarDate.day}/${lunarDate.month}${lunarDate.isLeap ? " nhuận" : ""} âm lịch`;
}

function getBlackFridayDate(year: number) {
  const novemberFirst = new Date(year, 10, 1);
  const firstThursdayOffset = (4 - novemberFirst.getDay() + 7) % 7;
  const thanksgiving = new Date(year, 10, 1 + firstThursdayOffset + 21);

  return new Date(
    thanksgiving.getFullYear(),
    thanksgiving.getMonth(),
    thanksgiving.getDate() + 1
  );
}

function resolveSolarEvent(
  year: number,
  monthIndex: number,
  day: number,
  label: string,
  note: string
): ResolvedSpecialDay {
  const date = new Date(year, monthIndex, day);

  return {
    label,
    note,
    solarLabel: formatSolarDate(date),
    lunarLabel: formatLunarLabel(date)
  };
}

function resolveLunarEventForYear(
  gregorianYear: number,
  lunarDay: number,
  lunarMonth: number,
  label: string,
  note: string
): ResolvedSpecialDay {
  const candidates = [gregorianYear - 1, gregorianYear, gregorianYear + 1]
    .map((lunarYear) => convertLunarToSolar(lunarDay, lunarMonth, lunarYear, false))
    .filter((date) => date.getFullYear() === gregorianYear)
    .sort((a, b) => a.getTime() - b.getTime());

  const date = candidates[0] ?? convertLunarToSolar(lunarDay, lunarMonth, gregorianYear, false);
  const lunarDate = getLunarDate(date);

  return {
    label,
    note,
    solarLabel: formatSolarDate(date),
    lunarLabel: `${lunarDate.day}/${lunarDate.month}${lunarDate.isLeap ? " nhuận" : ""} âm lịch`
  };
}

function getSpecialDays(year: number): {
  vietnamHolidays: ResolvedSpecialDay[];
  vietnamCulturalDays: ResolvedSpecialDay[];
  westernEvents: ResolvedSpecialDay[];
} {
  return {
    vietnamHolidays: [
      resolveSolarEvent(year, 0, 1, "Tết Dương lịch", "Ngày nghỉ đầu năm theo dương lịch."),
      resolveLunarEventForYear(
        year,
        1,
        1,
        "Tết Nguyên đán",
        "Lịch nghỉ thực tế có thể thay đổi theo từng năm."
      ),
      resolveLunarEventForYear(
        year,
        10,
        3,
        "Giỗ Tổ Hùng Vương",
        "Ngày nghỉ lễ truyền thống quan trọng của Việt Nam."
      ),
      resolveSolarEvent(year, 3, 30, "Ngày Giải phóng miền Nam", "Ngày lễ toàn quốc."),
      resolveSolarEvent(year, 4, 1, "Quốc tế Lao động", "Ngày nghỉ lễ liền kề dịp 30/4."),
      resolveSolarEvent(year, 8, 2, "Quốc khánh Việt Nam", "Ngày lễ lớn cấp quốc gia.")
    ],
    vietnamCulturalDays: [
      resolveLunarEventForYear(
        year,
        15,
        1,
        "Rằm tháng Giêng",
        "Ngày lễ đầu xuân được nhiều gia đình coi trọng."
      ),
      resolveLunarEventForYear(
        year,
        3,
        3,
        "Tết Hàn Thực",
        "Gắn với phong tục làm bánh trôi, bánh chay."
      ),
      resolveLunarEventForYear(
        year,
        15,
        4,
        "Lễ Phật Đản",
        "Ngày lễ lớn trong đời sống Phật giáo Việt Nam."
      ),
      resolveLunarEventForYear(
        year,
        15,
        7,
        "Lễ Vu Lan",
        "Ngày gắn với văn hóa hiếu kính và tưởng nhớ."
      ),
      resolveLunarEventForYear(
        year,
        15,
        8,
        "Tết Trung Thu",
        "Dịp đoàn viên, thiếu nhi và văn hóa dân gian."
      ),
      resolveLunarEventForYear(
        year,
        23,
        12,
        "Ông Công Ông Táo",
        "Mốc cuối năm quen thuộc trong nhiều gia đình Việt."
      )
    ],
    westernEvents: [
      resolveSolarEvent(year, 1, 14, "Valentine", "Ngày lễ phổ biến về tình cảm và quà tặng."),
      resolveSolarEvent(
        year,
        2,
        8,
        "Quốc tế Phụ nữ",
        "Ngày được nhiều thương hiệu và cộng đồng hưởng ứng."
      ),
      resolveSolarEvent(
        year,
        3,
        1,
        "Cá tháng Tư",
        "Ngày vui nhộn phổ biến trong văn hóa phương Tây."
      ),
      resolveSolarEvent(
        year,
        9,
        31,
        "Halloween",
        "Ngày lễ hóa trang quen thuộc với giới trẻ."
      ),
      resolveSolarEvent(
        getBlackFridayDate(year).getFullYear(),
        getBlackFridayDate(year).getMonth(),
        getBlackFridayDate(year).getDate(),
        "Black Friday",
        "Ngày mua sắm lớn sau Lễ Tạ Ơn, thay đổi theo từng năm."
      ),
      resolveSolarEvent(year, 11, 24, "Giáng Sinh", "Đêm lễ phổ biến trước ngày 25/12."),
      resolveSolarEvent(year, 11, 25, "Lễ Noel", "Ngày Giáng Sinh phổ biến trên toàn cầu.")
    ]
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const item = await getItemBySlug("lich");

  if (!item) {
    return {};
  }

  const canonical = `${getSiteUrl()}${item.seo.canonicalUrl ?? item.redirectUrl}`;
  const ogImage = item.seo.ogImage ? `${getSiteUrl()}${item.seo.ogImage}` : undefined;

  return {
    title: item.seo.title,
    description: item.seo.description,
    keywords: item.seo.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title: item.seo.title,
      description: item.seo.description,
      url: canonical,
      locale: "vi_VN",
      type: "website",
      images: ogImage ? [{ url: ogImage, alt: item.name }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: item.seo.title,
      description: item.seo.description,
      images: ogImage ? [ogImage] : undefined
    },
    robots: {
      index: !item.seo.noindex,
      follow: true
    }
  };
}

export default async function CalendarPage() {
  const [item, sidebarTopics] = await Promise.all([
    getItemBySlug("lich"),
    getSidebarTopics()
  ]);

  if (!item) {
    notFound();
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const currentDay = today.getDate();
  const currentWeekdayIndex = (today.getDay() + 6) % 7;
  const lunarDate = getLunarDate(today);
  const yearCalendar = getYearCalendar(currentYear);
  const fullDateLabel = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(today);
  const { vietnamHolidays, vietnamCulturalDays, westernEvents } = getSpecialDays(currentYear);

  return (
    <main className="py-8 pb-24 md:py-10 xl:pb-10">
      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)_320px]">
          <ContentSidebar topics={sidebarTopics} />

          <section className="min-w-0 space-y-6">
            <div className="grid min-h-[48vh] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
              <div className="bg-[radial-gradient(circle_at_top_left,_#eaf3ff,_#f6fbff_50%,_#ffffff_90%)] p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-portal-200 bg-white/80 px-3 py-1 text-xs font-semibold text-portal-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="max-w-4xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Hôm nay
                    </p>
                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:gap-6">
                      <span className="text-[6.5rem] font-black leading-none tracking-tight text-slate-900 md:text-[9rem]">
                        {currentDay}
                      </span>
                      <div className="pb-2">
                        <p className="text-2xl font-bold capitalize text-slate-900 md:text-3xl">
                          {getMonthName(today)}
                        </p>
                        <p className="mt-2 text-base text-slate-600">{fullDateLabel}</p>
                        <p className="mt-1 text-sm font-semibold text-amber-700">
                          Âm lịch: {lunarDate.day}/{lunarDate.month}
                          {lunarDate.isLeap ? " nhuận" : ""} • Năm {getCanChiYear(lunarDate.year)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Ngày dương
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-900">{formatSolarDate(today)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Thứ trong tuần
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {WEEKDAY_LABELS[currentWeekdayIndex]}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Năm hiện tại
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-900">{currentYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Toàn cảnh 12 tháng
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Lịch năm {currentYear}
                  </h2>
                </div>
                <p className="text-sm text-slate-600">
                  Ngày hôm nay được bôi màu để bạn nhìn thấy ngay vị trí hiện tại trong năm.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {yearCalendar.map((month) => (
                  <article
                    key={month.monthIndex}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <h3 className="text-sm font-bold capitalize text-slate-900">{month.label}</h3>

                    <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-500">
                      {WEEKDAY_LABELS.map((label) => (
                        <div key={`${month.monthIndex}-${label}`}>{label}</div>
                      ))}
                    </div>

                    <div className="mt-2 grid grid-cols-7 gap-1">
                      {month.cells.map((dayNumber, index) => {
                        const isToday =
                          month.monthIndex === currentMonthIndex && dayNumber === currentDay;
                        const isWeekend = index % 7 >= 5;

                        return (
                          <div
                            key={`${month.monthIndex}-${dayNumber ?? "empty"}-${index}`}
                            className={`flex aspect-square items-center justify-center rounded-lg text-xs font-semibold ${
                              dayNumber === null
                                ? "bg-transparent text-transparent"
                                : isToday
                                  ? "bg-portal-600 text-white shadow-sm"
                                  : isWeekend
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-white text-slate-700"
                            }`}
                          >
                            {dayNumber ?? "."}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold text-slate-900">1. Ngày lễ nghỉ của Việt Nam</h3>
              <div className="mt-4 space-y-3">
                {vietnamHolidays.map((day) => (
                  <div key={day.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{day.label}</p>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-portal-700">
                      Dương lịch: {day.solarLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-amber-700">
                      Âm lịch: {day.lunarLabel}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{day.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold text-slate-900">2. Lễ hội và văn hóa Việt Nam</h3>
              <div className="mt-4 space-y-3">
                {vietnamCulturalDays.map((day) => (
                  <div key={day.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{day.label}</p>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-portal-700">
                      Dương lịch: {day.solarLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-amber-700">
                      Âm lịch: {day.lunarLabel}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{day.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold text-slate-900">3. Event phổ biến phương Tây</h3>
              <div className="mt-4 space-y-3">
                {westernEvents.map((day) => (
                  <div key={day.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{day.label}</p>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-portal-700">
                      Dương lịch: {day.solarLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-amber-700">
                      Âm lịch: {day.lunarLabel}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{day.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </Container>
    </main>
  );
}
