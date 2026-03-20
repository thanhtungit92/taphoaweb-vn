import { HomePage } from "@/components/home/HomePage";
import { getHomepageData } from "@/lib/content";
import { buildHomepageStructuredData } from "@/lib/seo";

// App Router yêu cầu giá trị literal cho `revalidate`.
// Đổi số giây tại đây nếu muốn điều chỉnh chu kỳ ISR của homepage.
export const revalidate = 1800;

export default async function Page() {
  const data = await getHomepageData();
  const structuredData = buildHomepageStructuredData(data);

  return (
    <>
      <HomePage data={data} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.itemListSchema) }}
      />
    </>
  );
}
