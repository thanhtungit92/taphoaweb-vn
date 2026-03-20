import fs from "node:fs/promises";
import path from "node:path";

import { asArrayOfStrings, clampOrder, normalizePath, stableSort } from "@/lib/utils";
import type {
  ContentItem,
  DailyHoroscopeEntry,
  HomepageData,
  HoroscopeCollection,
  SeoFields,
  SneezeByHourContent,
  SneezeByWeekday,
  Topic,
  TopicWithItems
} from "@/lib/types";

const CONTENT_DIR = process.env.CONTENT_ROOT?.trim()
  ? path.resolve(process.env.CONTENT_ROOT.trim())
  : path.join(process.cwd(), "content");
const HOROSCOPE_CONTENT_DIR = path.join(CONTENT_DIR, "xem-boi-tu-vi", "daily");
const SNEEZE_BY_HOUR_CONTENT_FILE = path.join(
  CONTENT_DIR,
  "xem-boi-tu-vi",
  "static",
  "hat-hoi-theo-gio.json"
);
const HOROSCOPE_ENTRY_ORDER: Record<HoroscopeCollection, string[]> = {
  "12-con-giap": ["ty", "suu", "dan", "mao", "thin", "ty-ran", "ngo", "mui", "than", "dau", "tuat", "hoi"],
  "cung-hoang-dao": [
    "bach-duong",
    "kim-nguu",
    "song-tu",
    "cu-giai",
    "su-tu",
    "xu-nu",
    "thien-binh",
    "bo-cap",
    "nhan-ma",
    "ma-ket",
    "bao-binh",
    "song-ngu"
  ]
};
const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";
const HOMEPAGE_VISIBLE_ITEM_SLUGS = new Set([
  "lich",
  "tu-vi-12-con-giap",
  "tu-vi-cung-hoang-dao",
  "hat-hoi-theo-gio"
]);
const SIDEBAR_VISIBLE_ITEM_SLUGS = new Set([
  "lich",
  "tu-vi-12-con-giap",
  "tu-vi-cung-hoang-dao",
  "hat-hoi-theo-gio"
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getTodayInVietnam(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: VIETNAM_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

async function readJsonFile(filePath: string): Promise<unknown | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as unknown;
  } catch (error) {
    console.error(`[content] Không thể đọc hoặc parse JSON: ${filePath}`, error);
    return null;
  }
}

function parseSeoFields(input: unknown, fallbackTitle: string, fallbackDescription: string): SeoFields {
  const record = isRecord(input) ? input : {};

  return {
    title: typeof record.title === "string" ? record.title : fallbackTitle,
    description:
      typeof record.description === "string" ? record.description : fallbackDescription,
    keywords: asArrayOfStrings(record.keywords),
    ogImage: typeof record.ogImage === "string" ? normalizePath(record.ogImage) : undefined,
    canonicalUrl:
      typeof record.canonicalUrl === "string" ? normalizePath(record.canonicalUrl) : undefined,
    noindex: typeof record.noindex === "boolean" ? record.noindex : false
  };
}

function parseTopic(input: unknown, folderSlug: string): Topic | null {
  if (!isRecord(input)) {
    return null;
  }

  if (typeof input.title !== "string" || typeof input.description !== "string") {
    return null;
  }

  return {
    slug: typeof input.slug === "string" ? input.slug : folderSlug,
    title: input.title,
    description: input.description,
    order: clampOrder(input.order),
    featured: Boolean(input.featured),
    seo: parseSeoFields(input.seo, input.title, input.description)
  };
}

function parseContentItem(input: unknown, topicSlug: string): ContentItem | null {
  if (!isRecord(input)) {
    return null;
  }

  const requiredStringFields = ["id", "slug", "name", "shortDescription", "redirectUrl", "themeImage"];

  const hasRequiredFields = requiredStringFields.every((field) => typeof input[field] === "string");

  if (!hasRequiredFields) {
    return null;
  }

  const status =
    input.status === "published" || input.status === "draft" || input.status === "archived"
      ? input.status
      : "draft";
  const id = input.id as string;
  const slug = input.slug as string;
  const name = input.name as string;
  const shortDescription = input.shortDescription as string;
  const themeImage = input.themeImage as string;
  const redirectUrl = input.redirectUrl as string;

  return {
    id,
    slug,
    name,
    shortDescription,
    themeImage: normalizePath(themeImage),
    redirectUrl: normalizePath(redirectUrl),
    tags: asArrayOfStrings(input.tags),
    featured: Boolean(input.featured),
    order: clampOrder(input.order),
    status,
    seo: parseSeoFields(input.seo, name, shortDescription),
    topicSlug
  };
}

function parseDailyHoroscopeEntry(
  input: unknown,
  collection: HoroscopeCollection,
  fallbackSlug: string
): DailyHoroscopeEntry | null {
  if (!isRecord(input)) {
    return null;
  }

  const requiredStringFields = ["id", "slug", "name", "publishDate", "summary", "intro"];
  const hasRequiredFields = requiredStringFields.every((field) => typeof input[field] === "string");

  if (!hasRequiredFields || !isRecord(input.sections) || !isRecord(input.lucky)) {
    return null;
  }

  const sections = input.sections;
  const lucky = input.lucky;

  if (
    typeof sections.congViec !== "string" ||
    typeof sections.taiLoc !== "string" ||
    typeof sections.tinhCam !== "string" ||
    typeof sections.sucKhoe !== "string" ||
    typeof lucky.mauSac !== "string" ||
    typeof lucky.conSo !== "string" ||
    typeof lucky.gioTot !== "string" ||
    typeof lucky.quyNhan !== "string"
  ) {
    return null;
  }

  const slug = input.slug as string;
  const name = input.name as string;
  const summary = input.summary as string;
  const intro = input.intro as string;
  const publishDate = input.publishDate as string;

  return {
    id: input.id as string,
    slug: slug || fallbackSlug,
    name,
    publishDate,
    summary,
    intro,
    sections: {
      congViec: sections.congViec,
      taiLoc: sections.taiLoc,
      tinhCam: sections.tinhCam,
      sucKhoe: sections.sucKhoe
    },
    lucky: {
      mauSac: lucky.mauSac,
      conSo: lucky.conSo,
      gioTot: lucky.gioTot,
      quyNhan: lucky.quyNhan
    },
    seo: parseSeoFields(input.seo, name, summary),
    collection
  };
}

function parseSneezeByHourContent(input: unknown): SneezeByHourContent | null {
  if (!isRecord(input)) {
    return null;
  }

  if (
    typeof input.title !== "string" ||
    typeof input.description !== "string" ||
    typeof input.intro !== "string" ||
    typeof input.note !== "string" ||
    !Array.isArray(input.howToUse) ||
    !Array.isArray(input.days)
  ) {
    return null;
  }

  const howToUse = input.howToUse.filter((item): item is string => typeof item === "string");

  if (howToUse.length === 0) {
    return null;
  }

  const days = input.days
    .map((day) => {
      if (
        !isRecord(day) ||
        typeof day.slug !== "string" ||
        typeof day.title !== "string" ||
        typeof day.shortLabel !== "string" ||
        typeof day.overview !== "string" ||
        !Array.isArray(day.entries)
      ) {
        return null;
      }

      const entries = day.entries
        .map((entry) => {
          if (
            !isRecord(entry) ||
            typeof entry.hour !== "number" ||
            typeof entry.label !== "string" ||
            typeof entry.prediction !== "string"
          ) {
            return null;
          }

          return {
            hour: entry.hour,
            label: entry.label,
            prediction: entry.prediction
          };
        })
        .filter((entry): entry is SneezeByWeekday["entries"][number] => Boolean(entry));

      if (entries.length !== 24) {
        return null;
      }

      return {
        slug: day.slug,
        title: day.title,
        shortLabel: day.shortLabel,
        overview: day.overview,
        entries: stableSort(entries, (a, b) => a.hour - b.hour)
      };
    })
    .filter((day): day is SneezeByWeekday => Boolean(day));

  if (days.length !== 7) {
    return null;
  }

  return {
    title: input.title,
    description: input.description,
    intro: input.intro,
    note: input.note,
    howToUse,
    days,
    seo: parseSeoFields(input.seo, input.title, input.description)
  };
}

async function getTopicFolders(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error) {
    console.error("[content] Không thể đọc thư mục /content", error);
    return [];
  }
}

async function getItemsForTopic(topicSlug: string): Promise<ContentItem[]> {
  const itemsDir = path.join(CONTENT_DIR, topicSlug, "items");
  let files: string[] = [];

  try {
    const entries = await fs.readdir(itemsDir, { withFileTypes: true });
    files = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name);
  } catch (error) {
    console.error(`[content] Không thể đọc thư mục items của topic: ${topicSlug}`, error);
    return [];
  }

  const parsedItems = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(itemsDir, file);
      const raw = await readJsonFile(filePath);

      const item = parseContentItem(raw, topicSlug);

      if (!item) {
        console.warn(`[content] Bỏ qua item lỗi định dạng: ${filePath}`);
      }

      return item;
    })
  );

  const publishedItems = parsedItems.filter((item): item is ContentItem => Boolean(item)).filter((item) => item.status === "published");

  return stableSort(publishedItems, (a, b) => a.order - b.order || a.name.localeCompare(b.name, "vi"));
}

async function getPublishedTopicsWithItems(): Promise<TopicWithItems[]> {
  const topics = await getAllTopics();

  return Promise.all(
    topics.map(async (topic) => ({
      ...topic,
      items: await getItemsForTopic(topic.slug)
    }))
  );
}

export async function getAllPublishedTopicsWithItems(): Promise<TopicWithItems[]> {
  return getPublishedTopicsWithItems();
}

async function getLegacyHoroscopeEntries(
  collectionDir: string,
  collection: HoroscopeCollection
): Promise<DailyHoroscopeEntry[]> {
  let files: string[] = [];

  try {
    const entries = await fs.readdir(collectionDir, { withFileTypes: true });
    files = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name);
  } catch (error) {
    console.error(`[content] Không thể đọc nội dung tử vi: ${collectionDir}`, error);
    return [];
  }

  const parsedEntries = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(collectionDir, file);
      const raw = await readJsonFile(filePath);
      const fallbackSlug = file.replace(/\.json$/u, "");
      const entry = parseDailyHoroscopeEntry(raw, collection, fallbackSlug);

      if (!entry) {
        console.warn(`[content] Bỏ qua file tử vi lỗi định dạng: ${filePath}`);
      }

      return entry;
    })
  );

  return parsedEntries.filter((entry): entry is DailyHoroscopeEntry => Boolean(entry));
}

async function getVersionedHoroscopeEntries(
  collectionDir: string,
  collection: HoroscopeCollection
): Promise<DailyHoroscopeEntry[]> {
  const today = getTodayInVietnam();
  let folders: string[] = [];

  try {
    const entries = await fs.readdir(collectionDir, { withFileTypes: true });
    folders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error) {
    console.error(`[content] Không thể đọc thư mục tử vi versioned: ${collectionDir}`, error);
    return [];
  }

  const selectedEntries = await Promise.all(
    folders.map(async (slugFolder) => {
      const slugDir = path.join(collectionDir, slugFolder);
      let files: string[] = [];

      try {
        const entries = await fs.readdir(slugDir, { withFileTypes: true });
        files = entries
          .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
          .map((entry) => entry.name);
      } catch (error) {
        console.error(`[content] Không thể đọc thư mục slug tử vi: ${slugDir}`, error);
        return null;
      }

      const parsedVersions = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(slugDir, file);
          const raw = await readJsonFile(filePath);
          const entry = parseDailyHoroscopeEntry(raw, collection, slugFolder);

          if (!entry) {
            console.warn(`[content] Bỏ qua file tử vi lỗi định dạng: ${filePath}`);
          }

          return entry;
        })
      );

      const eligibleEntries = parsedVersions
        .filter((entry): entry is DailyHoroscopeEntry => Boolean(entry))
        .filter((entry) => entry.publishDate <= today);

      if (eligibleEntries.length === 0) {
        return null;
      }

      return stableSort(
        eligibleEntries,
        (a, b) => b.publishDate.localeCompare(a.publishDate) || b.id.localeCompare(a.id, "vi")
      )[0] ?? null;
    })
  );

  return selectedEntries.filter((entry): entry is DailyHoroscopeEntry => Boolean(entry));
}

export async function getDailyHoroscopeEntries(
  collection: HoroscopeCollection
): Promise<DailyHoroscopeEntry[]> {
  const collectionDir = path.join(HOROSCOPE_CONTENT_DIR, collection);
  const [legacyEntries, versionedEntries] = await Promise.all([
    getLegacyHoroscopeEntries(collectionDir, collection),
    getVersionedHoroscopeEntries(collectionDir, collection)
  ]);

  const mergedEntries = new Map<string, DailyHoroscopeEntry>();

  for (const entry of legacyEntries) {
    mergedEntries.set(entry.slug, entry);
  }

  for (const entry of versionedEntries) {
    mergedEntries.set(entry.slug, entry);
  }

  const validEntries = Array.from(mergedEntries.values());
  const orderMap = new Map(
    HOROSCOPE_ENTRY_ORDER[collection].map((slug, index) => [slug, index])
  );

  return stableSort(
    validEntries,
    (a, b) =>
      (orderMap.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
        (orderMap.get(b.slug) ?? Number.MAX_SAFE_INTEGER) ||
      a.name.localeCompare(b.name, "vi") ||
      a.slug.localeCompare(b.slug, "vi")
  );
}

export async function getDailyHoroscopeBySlug(
  collection: HoroscopeCollection,
  slug: string
): Promise<DailyHoroscopeEntry | null> {
  const entries = await getDailyHoroscopeEntries(collection);
  return entries.find((entry) => entry.slug === slug) ?? null;
}

export async function getSneezeByHourContent(): Promise<SneezeByHourContent | null> {
  const raw = await readJsonFile(SNEEZE_BY_HOUR_CONTENT_FILE);
  const content = parseSneezeByHourContent(raw);

  if (!content) {
    console.warn(`[content] Bỏ qua nội dung hắt hơi theo giờ lỗi định dạng: ${SNEEZE_BY_HOUR_CONTENT_FILE}`);
  }

  return content;
}

export async function getSidebarTopics(): Promise<TopicWithItems[]> {
  const topics = await getPublishedTopicsWithItems();

  return topics
    .map((topic) => ({
      ...topic,
      items: topic.items.filter((item) => SIDEBAR_VISIBLE_ITEM_SLUGS.has(item.slug))
    }))
    .filter((topic) => topic.items.length > 0);
}

export async function getItemBySlug(slug: string): Promise<ContentItem | null> {
  const topics = await getPublishedTopicsWithItems();

  for (const topic of topics) {
    const item = topic.items.find((entry) => entry.slug === slug);

    if (item) {
      return item;
    }
  }

  return null;
}

export async function getAllTopics(): Promise<Topic[]> {
  const folders = await getTopicFolders();

  const parsedTopics = await Promise.all(
    folders.map(async (folder) => {
      const topicPath = path.join(CONTENT_DIR, folder, "topic.json");
      const raw = await readJsonFile(topicPath);
      const topic = parseTopic(raw, folder);

      if (!topic) {
        console.warn(`[content] Bỏ qua topic lỗi định dạng: ${topicPath}`);
      }

      return topic;
    })
  );

  const validTopics = parsedTopics.filter((topic): topic is Topic => Boolean(topic));

  return stableSort(validTopics, (a, b) => a.order - b.order || a.title.localeCompare(b.title, "vi"));
}

export async function getTopicBySlug(slug: string): Promise<TopicWithItems | null> {
  const allTopics = await getPublishedTopicsWithItems();
  const topic = allTopics.find((entry) => entry.slug === slug);

  if (!topic) {
    return null;
  }

  return topic;
}

export async function getHomepageData(): Promise<HomepageData> {
  const sidebarTopics = await getSidebarTopics();
  const topicWithItems = sidebarTopics.map((topic) => ({
    ...topic,
    items: topic.items.filter((item) => HOMEPAGE_VISIBLE_ITEM_SLUGS.has(item.slug))
  }));

  const visibleTopics = topicWithItems.filter((topic) => topic.items.length > 0);
  const totalItems = visibleTopics.reduce((sum, topic) => sum + topic.items.length, 0);

  return {
    sidebarTopics,
    topics: visibleTopics,
    totalItems
  };
}
