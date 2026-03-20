"use client";

import { useState } from "react";
import Link from "next/link";

import type { TopicWithItems } from "@/lib/types";

type ContentSidebarProps = {
  topics: TopicWithItems[];
};

export function ContentSidebar({ topics }: ContentSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (topics.length === 0) {
    return null;
  }

  return (
    <>
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-4 left-4 z-40 inline-flex items-center rounded-full border border-portal-300 bg-white px-4 py-3 text-sm font-semibold text-portal-900 shadow-card"
          aria-label="Mở menu nội dung"
        >
          Menu
        </button>

        {isMobileOpen ? (
          <div className="fixed inset-0 z-50 bg-slate-950/35">
            <div className="h-full w-[88vw] max-w-sm overflow-hidden border-r border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center rounded-xl border border-portal-200 bg-portal-50 px-4 py-2 text-sm font-bold text-portal-900"
                >
                  Homepage
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
                  aria-label="Đóng menu nội dung"
                >
                  ×
                </button>
              </div>

              <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto p-4">
                <div className="space-y-5">
                  {topics.map((topic) => (
                    <section key={`mobile-${topic.slug}`} aria-labelledby={`mobile-topic-${topic.slug}`}>
                      <h3
                        id={`mobile-topic-${topic.slug}`}
                        className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900"
                      >
                        {topic.title}
                      </h3>

                      <div className="mt-3 space-y-2">
                        {topic.items.map((item) => (
                          <Link
                            key={`mobile-${item.id}`}
                            href={item.redirectUrl}
                            onClick={() => setIsMobileOpen(false)}
                            className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                          >
                            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-600">
                              {item.shortDescription}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <aside className="sticky top-6 hidden self-start xl:block">
        <div
          className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition-all duration-300 ${
            isExpanded ? "w-full" : "w-14"
          }`}
        >
          <div className="border-b border-slate-200 px-4 py-4">
            {isExpanded ? (
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-xl border border-portal-200 bg-portal-50 px-4 py-2 text-sm font-bold text-portal-900 transition hover:border-portal-300 hover:bg-portal-100"
                >
                  Homepage
                </Link>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:text-portal-800"
                  aria-label="Thu gọn điều hướng"
                >
                  &lt;&lt;
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="mx-auto rounded-lg border border-slate-300 px-2 py-2 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:text-portal-800"
                  aria-label="Mở rộng điều hướng"
                >
                  &gt;&gt;
                </button>
              </div>
            )}
          </div>

          {isExpanded ? (
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-4">
              <div className="space-y-5">
                {topics.map((topic) => (
                  <section key={topic.slug} aria-labelledby={`sidebar-topic-${topic.slug}`}>
                    <h3
                      id={`sidebar-topic-${topic.slug}`}
                      className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900"
                    >
                      {topic.title}
                    </h3>

                    <div className="mt-3 space-y-2">
                      {topic.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.redirectUrl}
                          className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-300 hover:bg-portal-50"
                        >
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-600">
                            {item.shortDescription}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}
