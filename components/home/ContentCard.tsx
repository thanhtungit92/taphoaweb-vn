import Image from "next/image";
import Link from "next/link";

import type { ContentItem } from "@/lib/types";

type ContentCardProps = {
  item: ContentItem;
};

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Link
      href={item.redirectUrl}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portal-500 focus-visible:ring-offset-2 ${
        item.featured ? "border-portal-300 ring-1 ring-portal-200" : "border-slate-200"
      }`}
      aria-label={`Mở nội dung ${item.name}`}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={item.themeImage}
          alt={`Ảnh minh họa cho ${item.name}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={item.featured}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold leading-snug text-slate-900">{item.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.shortDescription}</p>
      </div>
    </Link>
  );
}
