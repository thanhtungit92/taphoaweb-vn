import Link from "next/link";

import type { DailyHoroscopeEntry } from "@/lib/types";

type HoroscopeOverviewGridProps = {
  entries: DailyHoroscopeEntry[];
  accentClassName: string;
};

export function HoroscopeOverviewGrid({
  entries,
  accentClassName
}: HoroscopeOverviewGridProps) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {entries.map((entry) => (
        <Link
          key={entry.id}
          href={`${entry.collection === "12-con-giap" ? "/tu-vi-12-con-giap" : "/tu-vi-cung-hoang-dao"}/${entry.slug}`}
          className="group block cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portal-500 focus-visible:ring-offset-2"
          aria-label={`Mở tử vi hôm nay của ${entry.name}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {entry.publishDate}
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{entry.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">{entry.summary}</p>
          <p className={`mt-4 text-sm font-semibold ${accentClassName}`}>Đọc tử vi hôm nay</p>
        </Link>
      ))}
    </div>
  );
}
