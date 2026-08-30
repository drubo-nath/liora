import type { NextConfig } from "next";

type RemotePatterns = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>;

const images: { remotePatterns: RemotePatterns; qualities: number[] } = {
  qualities: [75, 90],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.shopify.com",
    },
    {
      protocol: "https",
      hostname: "t3.storage.dev",
    },
  ],
};

// Allow the S3-compatible storage hosts (Trigris etc.) for next/image when set.
for (const key of ["S3_PUBLIC_BASE_URL", "S3_ENDPOINT"] as const) {
  const value = process.env[key];
  if (!value) continue;
  try {
    const u = new URL(value);
    images.remotePatterns.push({ protocol: "https", hostname: u.hostname });
  } catch {
    // ignore malformed override
  }
}

const nextConfig: NextConfig = { images };

export default nextConfig;
