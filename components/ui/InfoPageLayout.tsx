import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

type InfoSection = {
  title: string;
  content: ReactNode;
};

type InfoPageLayoutProps = {
  eyebrow?: string;
  title: string;
  description: string;
  sections: InfoSection[];
};

export function InfoPageLayout({
  eyebrow,
  title,
  description,
  sections
}: InfoPageLayoutProps) {
  return (
    <main className="py-10 md:py-14">
      <Container className="max-w-4xl">
        <header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-card md:px-8 md:py-10">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-portal-700">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {description}
          </p>
        </header>

        <div className="mt-8 space-y-5 md:mt-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-card md:px-8"
            >
              <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-4 text-base leading-7 text-slate-700">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
