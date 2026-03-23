import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { appendPageview, getTodayKeyInVietnam, hashIp, isBotUserAgent } from "@/lib/analytics";

export const runtime = "nodejs";

function normalizePath(input: unknown) {
  if (typeof input !== "string" || !input.startsWith("/")) {
    return "/";
  }

  return input.slice(0, 300);
}

function normalizeUrl(input: unknown, fallbackPath: string) {
  if (typeof input !== "string" || !input.startsWith("/")) {
    return fallbackPath;
  }

  return input.slice(0, 500);
}

function normalizeText(input: unknown, limit: number) {
  return typeof input === "string" && input.trim() ? input.trim().slice(0, limit) : null;
}

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") ?? "unknown";

    if (isBotUserAgent(userAgent)) {
      return NextResponse.json({ ok: true, skipped: true, reason: "bot" });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const path = normalizePath(body.path);
    const url = normalizeUrl(body.url, path);
    const visitorId = normalizeText(body.visitorId, 100);

    if (!visitorId) {
      return NextResponse.json({ ok: false, error: "missing_visitor_id" }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
    const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";

    await appendPageview({
      timestamp: new Date().toISOString(),
      dayKey: getTodayKeyInVietnam(),
      path,
      url,
      referrer: normalizeText(body.referrer, 500),
      visitorId,
      ipHash: hashIp(clientIp),
      userAgent,
      screen: normalizeText(body.screen, 40),
      language: normalizeText(body.language, 20),
      timeZone: normalizeText(body.timeZone, 100)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics] Không thể ghi pageview", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
