#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import smtplib
from collections import Counter
from datetime import date, datetime, timedelta
from email.message import EmailMessage
from pathlib import Path
from zoneinfo import ZoneInfo

TIMEZONE = ZoneInfo("Asia/Ho_Chi_Minh")


def load_dotenv(dotenv_path: Path) -> None:
    if not dotenv_path.exists():
        return

    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def required(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise SystemExit(f"Thiếu biến môi trường: {name}")
    return value


def optional(name: str, default: str) -> str:
    value = os.environ.get(name, "").strip()
    return value or default


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Tổng hợp traffic từ file JSONL và gửi email báo cáo.")
    parser.add_argument("--date", help="Ngày báo cáo theo định dạng YYYY-MM-DD.")
    parser.add_argument("--today", action="store_true", help="Gửi báo cáo cho ngày hôm nay.")
    parser.add_argument("--yesterday", action="store_true", help="Gửi báo cáo cho ngày hôm qua.")
    parser.add_argument("--dry-run", action="store_true", help="Chỉ in báo cáo, không gửi email.")
    return parser.parse_args()


def resolve_day_key(args: argparse.Namespace) -> str:
    selected = [bool(args.date), args.today, args.yesterday]
    if sum(selected) > 1:
        raise SystemExit("Chỉ dùng một trong các cờ: --date, --today, --yesterday")

    today = datetime.now(TIMEZONE).date()
    if args.date:
        return datetime.strptime(args.date, "%Y-%m-%d").date().isoformat()
    if args.yesterday:
        return (today - timedelta(days=1)).isoformat()
    return today.isoformat()


def get_analytics_root(repo_root: Path) -> Path:
    configured = os.environ.get("ANALYTICS_ROOT", "").strip()
    return Path(configured) if configured else repo_root / "var" / "analytics"


def top_lines(counter: Counter[str], empty_label: str, limit: int = 5) -> list[str]:
    if not counter:
        return [f"- {empty_label}: 0"]
    return [f"- {label}: {count}" for label, count in counter.most_common(limit)]


def page_breakdown_lines(rows: list[dict[str, object]]) -> list[str]:
    if not rows:
        return ["- Không có dữ liệu: 0 pageview / 0 visitor"]

    grouped: dict[str, list[dict[str, object]]] = {}
    for row in rows:
        path = str(row.get("path", "/"))
        grouped.setdefault(path, []).append(row)

    sorted_items = sorted(
        grouped.items(),
        key=lambda item: (-len(item[1]), item[0])
    )

    lines: list[str] = []
    for path, path_rows in sorted_items:
        visitors = len({str(row.get("visitorId", "")) for row in path_rows if row.get("visitorId")})
        lines.append(f"- {path}: {len(path_rows)} pageview / {visitors} visitor")

    return lines


def build_report(day_key: str, rows: list[dict[str, object]]) -> str:
    total_pageviews = len(rows)
    unique_visitors = len({str(row.get("visitorId", "")) for row in rows if row.get("visitorId")})
    top_paths = Counter(str(row.get("path", "/")) for row in rows)
    top_referrers = Counter(
        str(row.get("referrer")) for row in rows if isinstance(row.get("referrer"), str) and row.get("referrer")
    )
    top_time_zones = Counter(
        str(row.get("timeZone")) for row in rows if isinstance(row.get("timeZone"), str) and row.get("timeZone")
    )

    return "\n".join(
        [
            f"Báo cáo traffic ngày {day_key}",
            "",
            f"- Tổng pageview: {total_pageviews}",
            f"- Unique visitor: {unique_visitors}",
            "",
            "Chi tiết theo trang:",
            *page_breakdown_lines(rows),
            "",
            "Top path:",
            *top_lines(top_paths, "Không có dữ liệu"),
            "",
            "Top referrer:",
            *top_lines(top_referrers, "Truy cập trực tiếp"),
            "",
            "Top timezone client:",
            *top_lines(top_time_zones, "Không có dữ liệu")
        ]
    )


def send_email(subject: str, body: str) -> None:
    smtp_host = required("SMTP_HOST")
    smtp_port = int(optional("SMTP_PORT", "587"))
    smtp_username = required("SMTP_USERNAME")
    smtp_password = required("SMTP_PASSWORD")
    mail_from = required("MAIL_FROM")
    mail_to = required("MAIL_TO")
    use_tls = optional("SMTP_USE_TLS", "true").lower() != "false"

    message = EmailMessage()
    message["From"] = mail_from
    message["To"] = mail_to
    message["Subject"] = subject
    message.set_content(body)

    with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
        server.ehlo()
        if use_tls:
            server.starttls()
            server.ehlo()
        server.login(smtp_username, smtp_password)
        server.send_message(message)


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    load_dotenv(repo_root / ".env")
    args = parse_args()
    day_key = resolve_day_key(args)

    analytics_root = get_analytics_root(repo_root)
    pageview_file = analytics_root / "pageviews" / f"{day_key}.jsonl"
    rows: list[dict[str, object]] = []

    if pageview_file.exists():
        for line in pageview_file.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            rows.append(json.loads(line))

    report = build_report(day_key, rows)

    if args.dry_run:
        print(report)
        return 0

    send_email(
        subject=f"[taphoaweb] Báo cáo traffic {day_key}",
        body=report
    )
    print(report)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
