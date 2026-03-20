import { TopicSection } from "@/components/home/TopicSection";
import { Container } from "@/components/ui/Container";
import { ContentSidebar } from "@/components/ui/ContentSidebar";
import type { HomepageData } from "@/lib/types";

type HomePageProps = {
  data: HomepageData;
};

export function HomePage({ data }: HomePageProps) {
  return (
    <main className="py-6 pb-24 md:py-8 xl:pb-8">
      <Container className="max-w-none">
        <div className="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
          <ContentSidebar topics={data.sidebarTopics} />

          <div className="min-w-0">
            {data.topics.map((topic) => (
              <TopicSection key={topic.slug} topic={topic} />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
