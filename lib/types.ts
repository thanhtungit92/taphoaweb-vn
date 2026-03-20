export type PublishStatus = "published" | "draft" | "archived";

export type SeoFields = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  order: number;
  featured: boolean;
  seo: SeoFields;
};

export type ContentItem = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  themeImage: string;
  redirectUrl: string;
  tags: string[];
  featured: boolean;
  order: number;
  status: PublishStatus;
  seo: SeoFields;
  topicSlug: string;
};

export type TopicWithItems = Topic & {
  items: ContentItem[];
};

export type HoroscopeCollection = "12-con-giap" | "cung-hoang-dao";

export type DailyHoroscopeEntry = {
  id: string;
  slug: string;
  name: string;
  publishDate: string;
  summary: string;
  intro: string;
  sections: {
    congViec: string;
    taiLoc: string;
    tinhCam: string;
    sucKhoe: string;
  };
  lucky: {
    mauSac: string;
    conSo: string;
    gioTot: string;
    quyNhan: string;
  };
  seo: SeoFields;
  collection: HoroscopeCollection;
};

export type SneezeByHourEntry = {
  hour: number;
  label: string;
  prediction: string;
};

export type SneezeByWeekday = {
  slug: string;
  title: string;
  shortLabel: string;
  overview: string;
  entries: SneezeByHourEntry[];
};

export type SneezeByHourContent = {
  title: string;
  description: string;
  intro: string;
  note: string;
  howToUse: string[];
  days: SneezeByWeekday[];
  seo: SeoFields;
};

export type HomepageData = {
  sidebarTopics: TopicWithItems[];
  topics: TopicWithItems[];
  totalItems: number;
};
