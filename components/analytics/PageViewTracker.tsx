"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_ID_STORAGE_KEY = "taphoaweb_visitor_id";

function getVisitorId() {
  const existing = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const generated = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, generated);
  return generated;
}

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const visitorId = getVisitorId();
    const search = searchParams.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    const payload = JSON.stringify({
      path: pathname,
      url,
      referrer: document.referrer || null,
      visitorId,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || null,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || null
    });

    const blob = new Blob([payload], { type: "application/json" });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/pageview", blob);
      return;
    }

    void fetch("/api/analytics/pageview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: payload,
      keepalive: true,
      cache: "no-store"
    });
  }, [pathname, searchParams]);

  return null;
}
