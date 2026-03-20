import { ContentCard } from "@/components/home/ContentCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TopicWithItems } from "@/lib/types";

type TopicSectionProps = {
  topic: TopicWithItems;
};

export function TopicSection({ topic }: TopicSectionProps) {
  if (topic.items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={`topic-${topic.slug}`} className="py-10 md:py-12">
      <SectionHeader id={`topic-${topic.slug}`} title={topic.title} description={topic.description} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topic.items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
