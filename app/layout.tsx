import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Container } from "@/components/ui/Container";
import { buildHomepageMetadata } from "@/lib/seo";

import "@/app/globals.css";

export const metadata: Metadata = buildHomepageMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>

          <footer className="border-t border-slate-200 bg-white/85 backdrop-blur">
            <Container className="flex flex-col gap-4 py-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
              <p className="text-center md:text-left">
                Website thông tin tiện lợi, giúp người dùng tiếp cận nội dung nhanh và rõ ràng hơn.
              </p>

              <nav
                aria-label="Liên kết chân trang"
                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
              >
                <Link href="/about" className="font-medium transition hover:text-portal-700">
                  Giới thiệu
                </Link>
                <Link href="/contact" className="font-medium transition hover:text-portal-700">
                  Liên hệ
                </Link>
                <Link href="/terms" className="font-medium transition hover:text-portal-700">
                  Điều khoản
                </Link>
              </nav>
            </Container>
          </footer>
        </div>
      </body>
    </html>
  );
}
