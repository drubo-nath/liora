/**
 * Object storage for product images.
 *
 * Production: any S3-compatible bucket (Trigris, AWS S3, R2, MinIO...) via
 * the standard S3 API. The bucket stays fully PRIVATE — shoppers are served
 * short-lived presigned GET URLs generated on the fly (local signing, no
 * network overhead).
 *
 * Configure in .env.local:
 *
 *   S3_ENDPOINT        e.g. https://t3.storage.dev
 *   S3_REGION          e.g. auto (Tigris) / us-east-1 (AWS)
 *   S3_BUCKET          bucket name
 *   S3_ACCESS_KEY_ID   access key from the console
 *   S3_SECRET_ACCESS_KEY
 *   S3_PUBLIC_BASE_URL optional — only when a real public/CDN domain exists;
 *                      skips presigning entirely
 *
 * Dev fallback: when unconfigured, files are written to public/uploads
 * (gitignored) and served locally.
 */

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { promises as fsp } from "node:fs";
import path from "node:path";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

/** Presigned URLs live 7 days; re-signing happens per request via React cache. */
const PRESIGN_TTL_SECONDS = 60 * 60 * 24 * 7;

export function imageKey(productId: number, fileName: string) {
  return `products/${productId}/${fileName}`;
}

export function storageConfigured(): boolean {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY,
  );
}

function client(): S3Client {
  return new S3Client({
    region: process.env.S3_REGION ?? "auto",
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: true,
    // Tigris (and other strict S3 clones) reject the checksum params the SDK
    // adds by default — especially as unsigned presigned-query params.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
}

/**
 * Extract the S3 object key from a stored URL (legacy rows may hold a full
 * URL). Returns null for plain local paths like "/uploads/products/x.jpg".
 */
export function keyFromStoredUrl(url: string): string | null {
  if (!url) return null;
  // Local public path — served directly, no signing.
  if (url.startsWith("/")) return null;
  // Already a bare object key.
  if (url.startsWith("products/")) return url;
  // Legacy full URL (…/products/<id>/<file>) — extract the key part.
  const marker = "/products/";
  const idx = url.lastIndexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + 1);
}

/**
 * Presign a GET for an object key. Low-level — most callers want
 * resolveImageUrl (stable route) instead, which keeps HTML cacheable.
 */
export async function presignedUrl(
  key: string,
  expiresIn: number = PRESIGN_TTL_SECONDS,
): Promise<string> {
  try {
    return await getSignedUrl(
      client(),
      new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }),
      { expiresIn },
    );
  } catch (e) {
    console.error("[storage] presign failed:", e);
    throw e;
  }
}

/**
 * Turn a stored value (S3 key, legacy full URL, or local path) into a URL a
 * browser can load right now: presigned for S3 keys, untouched for absolute
 * URLs (legacy Shopify CDN images) and local paths.
 */
export async function resolveImageUrl(stored: string): Promise<string> {
  // Already an absolute URL (legacy seed/CDN images) — nothing to do.
  if (/^https?:\/\//i.test(stored)) return stored;
  if (!storageConfigured()) return stored;

  const base = process.env.S3_PUBLIC_BASE_URL;
  if (base) {
    return `${base.replace(/\/$/, "")}/${stored}`;
  }

  const key = keyFromStoredUrl(stored);
  if (!key) return stored;

  // Stable internal route: never expires, safe for ISR/static HTML. The
  // route handler signs a fresh short-lived URL per request.
  return `/api/media/${key}`;
}

export type StorageResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

export async function putObject(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<StorageResult> {
  if (!storageConfigured()) {
    const dir = path.join(process.cwd(), "public", path.dirname(key));
    await fsp.mkdir(dir, { recursive: true });
    await fsp.writeFile(path.join(process.cwd(), "public", key), body);
    return { ok: true, url: `/${key}` };
  }

  try {
    await client().send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    // DB stores the KEY; presigning happens at read time.
    return { ok: true, url: key };
  } catch (e) {
    console.error("[storage] putObject failed:", e);
    return { ok: false, error: "Upload to object storage failed." };
  }
}

export async function deleteObject(key: string): Promise<void> {
  if (!storageConfigured()) {
    await fsp.rm(path.join(process.cwd(), "public", key), { force: true });
    return;
  }
  try {
    await client().send(
      new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }),
    );
  } catch (e) {
    // Orphaned object is harmless; the DB row is already gone.
    console.error("[storage] deleteObject failed:", e);
  }
}
