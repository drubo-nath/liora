import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/db/queries";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function ProductOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const name = product?.name || "LIORA Luxury Press-On Nails";
  const finish = product?.finish ? `${product.finish.toUpperCase()} FINISH` : "LUXURY FINISH";
  const price = product?.price ? `৳${product.price.toLocaleString()}` : "৳1,450";
  const tagline = product?.tagline || "Salon-perfect, damage-free press-on nails handcrafted in Dhaka.";
  const toneA = product?.tones?.[0] || "#E9D7C6";
  const toneB = product?.tones?.[1] || "#A6715C";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#161618",
          color: "#FAF7F2",
          position: "relative",
          padding: "60px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Gold Border Frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid #D4AF37",
            opacity: 0.4,
            display: "flex",
          }}
        />

        {/* Left Column: Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 650,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: "Georgia, serif",
              letterSpacing: "0.2em",
              color: "#D4AF37",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            LIORA • {finish}
          </div>

          <div
            style={{
              fontSize: 56,
              fontFamily: "Georgia, serif",
              lineHeight: 1.1,
              color: "#FAF7F2",
              marginBottom: 16,
            }}
          >
            {name}
          </div>

          <div
            style={{
              fontSize: 20,
              fontFamily: "sans-serif",
              color: "#A1A1AA",
              marginBottom: 32,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontFamily: "Georgia, serif",
                color: "#FAF7F2",
                fontWeight: "bold",
              }}
            >
              {price}
            </div>
            <div
              style={{
                padding: "8px 20px",
                backgroundColor: "#27272A",
                color: "#D4AF37",
                fontSize: 14,
                fontFamily: "sans-serif",
                borderRadius: "100px",
                letterSpacing: "0.1em",
                border: "1px solid #3F3F46",
                textTransform: "uppercase",
              }}
            >
              In Stock • Nationwide Delivery
            </div>
          </div>
        </div>

        {/* Right Column: Tone Swatch Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            height: 420,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${toneA} 0%, ${toneB} 100%)`,
            border: "4px solid #FAF7F2",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontFamily: "Georgia, serif",
              color: "#FFFFFF",
              letterSpacing: "0.2em",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
              textTransform: "uppercase",
            }}
          >
            LIORA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

