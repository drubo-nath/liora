import { NextResponse } from "next/server";
import { storageConfigured, presignedUrl } from "@/lib/storage";

/**
 * Stable public entry for bucket objects: /api/media/products/<id>/<file>
 *
 * HTML references this path (never expires, cacheable), and each request
 * 302s to a freshly-signed short-lived presigned URL. Keeps the bucket fully
 * private while letting ISR/static pages reference images safely.
 */
export async function GET(
  _req: Request,
  { params }: RouteContext<"/api/media/[...key]">,
) {
  const { key } = await params;
  const segments = Array.isArray(key) ? key : [key];

  // Only product images are proxied; reject traversal or foreign prefixes.
  if (
    segments[0] !== "products" ||
    segments.length < 2 ||
    segments.some((s) => !s || s === "." || s === ".." || s.includes("/"))
  ) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (!storageConfigured()) {
    return new NextResponse("Object storage is not configured", {
      status: 503,
    });
  }

  const objectKey = segments.join("/");
  const url = await presignedUrl(objectKey, 5 * 60);

  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      // Let the browser/optimizer reuse the redirect briefly; the target
      // itself is a fresh signed URL each cache miss.
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
