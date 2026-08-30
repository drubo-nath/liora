import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import {
  bucketName,
  client,
  presignedUrl,
  storageConfigured,
} from "@/lib/storage";

/**
 * Stable public entry for bucket objects: /api/media/products/<id>/<file>
 *
 * HTML references this path (never expires). Two response modes:
 *  - Browser requests (Accept header wants HTML/images via navigation or
 *    <img>): 302 to a freshly-signed short-lived presigned URL — keeps
 *    traffic off the app server.
 *  - next/image optimizer (identified by its JSON wire format): streams the
 *    object bytes straight through, because the optimizer does not follow
 *    redirects and treats a 302 as an empty response.
 */
function wantsBytes(req: Request): boolean {
  const accept = req.headers.get("accept") ?? "";
  const secFetchDest = req.headers.get("sec-fetch-dest") ?? "";
  // The optimizer sends a plain "/*" accept and no navigation metadata.
  return secFetchDest === "" || accept.trim() === "*/*" || accept === "";
}

export async function GET(
  req: Request,
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

  if (wantsBytes(req)) {
    // Proxy mode for the next/image optimizer.
    try {
      const res = await client().send(
        new GetObjectCommand({ Bucket: bucketName(), Key: objectKey }),
      );
      if (!res.Body) {
        return new NextResponse("Not found", { status: 404 });
      }
      const body = await res.Body.transformToByteArray();
      return new NextResponse(Buffer.from(body), {
        status: 200,
        headers: {
          "Content-Type": res.ContentType ?? "application/octet-stream",
          "Content-Length": String(res.ContentLength ?? body.byteLength),
          "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
          ETag: res.ETag ?? "",
        },
      });
    } catch (e) {
      const status = (e as { name?: string }).name === "NoSuchKey" ? 404 : 502;
      console.error("[media] proxy failed:", e);
      return new NextResponse("Upstream error", { status });
    }
  }

  // Redirect mode for ordinary browsers.
  const url = await presignedUrl(objectKey, 5 * 60);
  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      // Browsers may reuse the redirect briefly; each miss gets a fresh
      // signed URL.
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
