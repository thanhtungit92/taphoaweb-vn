import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidatePayload = {
  secret?: string;
  path?: string;
};

export async function POST(request: NextRequest) {
  let payload: RevalidatePayload = {};

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json(
      { message: "Payload JSON không hợp lệ." },
      { status: 400 }
    );
  }

  const configuredSecret = process.env.REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { message: "REVALIDATE_SECRET chưa được cấu hình." },
      { status: 500 }
    );
  }

  if (!payload.secret || payload.secret !== configuredSecret) {
    return NextResponse.json({ message: "Secret không hợp lệ." }, { status: 401 });
  }

  const path = typeof payload.path === "string" && payload.path.startsWith("/") ? payload.path : "/";

  // Với App Router, revalidatePath đánh dấu route cần regenerate ở request kế tiếp.
  // Hiện tại homepage dùng path '/'. Sau này có thể mở rộng thêm '/chu-de/[slug]'.
  revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    now: new Date().toISOString(),
    path
  });
}
