import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export type AnalyticsPageviewEvent = {
  timestamp: string;
  dayKey: string;
  path: string;
  url: string;
  referrer: string | null;
  visitorId: string;
  ipHash: string;
  userAgent: string;
  screen: string | null;
  language: string | null;
  timeZone: string | null;
};

const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";
const BOT_PATTERN = /bot|spider|crawl|slurp|bingpreview|facebookexternalhit|headless|lighthouse/i;

export function getAnalyticsRoot() {
  const configured = process.env.ANALYTICS_ROOT?.trim();
  return configured ? path.resolve(configured) : path.join(process.cwd(), "var", "analytics");
}

export function getTodayKeyInVietnam(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: VIETNAM_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function getAnalyticsFilePath(dayKey: string) {
  return path.join(getAnalyticsRoot(), "pageviews", `${dayKey}.jsonl`);
}

export function hashIp(value: string) {
  const salt = process.env.ANALYTICS_SALT?.trim() || "taphoaweb";
  return crypto.createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export function isBotUserAgent(userAgent: string) {
  return BOT_PATTERN.test(userAgent);
}

export async function appendPageview(event: AnalyticsPageviewEvent) {
  const filePath = getAnalyticsFilePath(event.dayKey);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.appendFile(filePath, `${JSON.stringify(event)}\n`, "utf-8");
}
