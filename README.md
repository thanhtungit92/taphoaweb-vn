# Cổng Homepage Tiếng Việt (Next.js App Router)

Dự án này là homepage portal/directory cho người dùng Việt Nam, dùng nguồn dữ liệu file-based JSON trong thư mục `/content`.

## Công nghệ

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Server Components mặc định
- ISR + on-demand revalidation
- Không dùng database/CMS

## Cấu trúc thư mục

```txt
/app
  /api/revalidate/route.ts
  /globals.css
  /layout.tsx
  /page.tsx
/components
  /home/HomePage.tsx
  /home/HeroSection.tsx
  /home/TopicSection.tsx
  /home/ContentCard.tsx
  /ui/Container.tsx
  /ui/SectionHeader.tsx
/lib
  /content.ts
  /seo.ts
  /types.ts
  /utils.ts
/content
  /cong-cu-huu-ich
    topic.json
    /items
      lich.json
      top-10-cong-cu-ai.json
  /tin-tuc
    topic.json
    /items
      top-10-tin-tuc-the-gioi-hom-qua.json
      top-10-tin-tuc-viet-nam-hom-qua.json
      gia-vang-hom-nay.json
/public
  /images/...
  /og/...
/.env.example
```

## Cách dữ liệu `/content` hoạt động

- Mỗi thư mục cấp 1 trong `/content` là một `topic`.
- Mỗi topic có:
  - `topic.json`
  - thư mục `items/*.json`
- Homepage đọc toàn bộ topic rồi render thành các section.
- Mỗi item là một card có ảnh, mô tả, tags và nút CTA.
- Card hiện tại link trực tiếp tới `redirectUrl` (chuẩn bị cho giai đoạn sau khi có trang chi tiết).

## Data model

### `topic.json`

```json
{
  "slug": "cong-cu-huu-ich",
  "title": "Công cụ hữu ích",
  "description": "...",
  "order": 1,
  "featured": true,
  "seo": {
    "title": "...",
    "description": "...",
    "keywords": ["..."],
    "ogImage": "/og/topic-cong-cu-huu-ich.svg",
    "canonicalUrl": "/cong-cu-huu-ich",
    "noindex": false
  }
}
```

### `items/*.json`

```json
{
  "id": "cc-lich",
  "slug": "lich",
  "name": "Lịch",
  "shortDescription": "...",
  "themeImage": "/images/lich.svg",
  "redirectUrl": "/lich",
  "tags": ["Lịch online", "Tiện ích"],
  "featured": true,
  "order": 1,
  "status": "published",
  "seo": {
    "title": "...",
    "description": "...",
    "keywords": ["..."],
    "ogImage": "/og/item-lich.svg",
    "canonicalUrl": "/lich",
    "noindex": false
  }
}
```

## Thêm topic mới

1. Tạo thư mục mới trong `/content`, ví dụ: `/content/du-lich`.
2. Tạo file `/content/du-lich/topic.json` theo schema topic.
3. Tạo thư mục `/content/du-lich/items`.
4. Thêm các item JSON vào thư mục `items`.
5. Đặt `order` để điều khiển vị trí section trên homepage.

## Thêm item mới

1. Tạo file mới trong `items`, ví dụ: `/content/tin-tuc/items/ban-tin-sang.json`.
2. Điền đủ field theo schema item.
3. Đặt `status: "published"` để item xuất hiện trên homepage.
4. Dùng `order` để sắp xếp trong cùng topic.

## ISR hoạt động như thế nào

- Homepage được render tĩnh và hỗ trợ ISR bằng `revalidate` trong `app/page.tsx`.
- Khi hết chu kỳ revalidate, request tiếp theo sẽ kích hoạt regenerate trang.
- Dữ liệu lấy từ filesystem nên phù hợp khi bạn chỉnh sửa JSON trực tiếp trong repo.

## On-demand revalidation API

Endpoint:

```txt
POST /api/revalidate
```

Body JSON:

```json
{
  "secret": "<REVALIDATE_SECRET>",
  "path": "/"
}
```

Ví dụ gọi API cục bộ:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-secret","path":"/"}'
```

Gợi ý mở rộng sau này:

- Khi có trang topic, có thể revalidate theo path như `/tin-tuc` hoặc `/cong-cu-huu-ich`.

## Biến môi trường bắt buộc

Xem file `.env.example`:

```env
SITE_URL=
REVALIDATE_SECRET=
NEXT_PUBLIC_SITE_NAME=
CONTENT_ROOT=
ANALYTICS_ROOT=
ANALYTICS_SALT=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_USE_TLS=true
MAIL_FROM=
MAIL_TO=thanhtungit92@gmail.com
```

Ý nghĩa:

- `SITE_URL`: domain chuẩn để tạo canonical URL, Open Graph URL.
- `REVALIDATE_SECRET`: secret bảo vệ API `/api/revalidate`.
- `NEXT_PUBLIC_SITE_NAME`: tên site hiển thị cho metadata và structured data.
- `CONTENT_ROOT`: thư mục content dùng chung trên server nếu bạn tách content khỏi release.
- `ANALYTICS_ROOT`: thư mục lưu log traffic dạng file JSONL.
- `ANALYTICS_SALT`: salt để hash IP trước khi ghi log.
- `SMTP_*`, `MAIL_FROM`, `MAIL_TO`: cấu hình gửi email báo cáo traffic.

## Traffic Analytics

Project có analytics first-party nhẹ:

- Client tracker gửi pageview vào `POST /api/analytics/pageview`
- Server ghi log JSONL vào `ANALYTICS_ROOT/pageviews/YYYY-MM-DD.jsonl`
- Không dùng database
- Có lọc bot đơn giản bằng `user-agent`

Các field chính được log:

- `timestamp`
- `path`
- `url`
- `referrer`
- `visitorId`
- `ipHash`
- `userAgent`
- `screen`
- `language`
- `timeZone`

IP không được lưu thô, chỉ lưu hash qua `ANALYTICS_SALT`.

## Gửi Email Báo Cáo Traffic

Script báo cáo mặc định cho ngày hôm qua:

```bash
python3 scripts/send_traffic_report.py --yesterday
```

Chạy thử mà không gửi mail:

```bash
python3 scripts/send_traffic_report.py --yesterday --dry-run
```

Gửi báo cáo cho ngày hôm qua:

```bash
python3 scripts/send_traffic_report.py --yesterday
```

Wrapper tiện cho cron:

```bash
bash scripts/run_traffic_report.sh --yesterday
```

### Cron gợi ý

Nếu bạn muốn nhận email ngay sau 00:00 cho traffic trọn ngày hôm trước:

```cron
5 0 * * * cd /path/to/taphoaweb-vn && /bin/zsh -lc 'set -a && source .env && set +a && bash scripts/run_traffic_report.sh --yesterday'
```

Nếu bạn muốn dời muộn hơn một chút để an toàn:

```cron
10 0 * * * cd /path/to/taphoaweb-vn && /bin/zsh -lc 'set -a && source .env && set +a && bash scripts/run_traffic_report.sh --yesterday'
```

### Gợi ý cấu hình Gmail SMTP

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=thanhtungit92@gmail.com
SMTP_PASSWORD=YOUR_GMAIL_APP_PASSWORD
SMTP_USE_TLS=true
MAIL_FROM=thanhtungit92@gmail.com
MAIL_TO=thanhtungit92@gmail.com
```

## Chạy local

```bash
npm install
npm run dev
```

Mở:

```txt
http://localhost:3000
```

## Lưu ý chất lượng dữ liệu

`lib/content.ts` có xử lý an toàn:

- Parse JSON lỗi sẽ không làm crash trang.
- File item/topic lỗi định dạng sẽ bị bỏ qua có log cảnh báo.
- Chỉ item có `status: "published"` mới được hiển thị.
- Sắp xếp ổn định theo `order` rồi fallback theo tên tiếng Việt.
