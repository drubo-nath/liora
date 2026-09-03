import type { ProductDTO } from "@/db/types";

/**
 * Curated lifestyle model hand-worn imagery for luxury hover transitions.
 * When hovering a product card, Image 1 (flat lay) crossfades to Image 2 (worn on hand).
 */
const LIFESTYLE_HAND_IMAGES: Record<string, string> = {
  "sugar-glaze":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/BeurreDoux.jpg?v=1779190722&width=1200",
  "classic-french":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/NailImages-IcyVeil_4.jpg?v=1771580182&width=1200",
  "marshmallow-drip":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/BeurreSoleil_3.jpg?v=1772541058&width=1200",
  "rouge-luxe":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_8f4593f5-7ecc-4326-88bf-4338d21e9a95.jpg?v=1768311889&width=1200",
  "deep-petal":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_f3fce684-2d2a-4923-ae2c-67e1da3d6be3.jpg?v=1768303259&width=1200",
  "classic-ombre":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/NailImages-IcyVeil_4.jpg?v=1771580182&width=1200",
  "neutral-flow":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_60739239-9a14-4472-9b5a-a889ddeb7602.jpg?v=1768307951&width=1200",
  "red-alert":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_d4a48771-4bae-4e17-9f91-5c1ed7f83724.jpg?v=1768311827&width=1200",
  "soft-tulle":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_531fbed6-bb31-4eff-aef8-926bc93823f2.jpg?v=1768303184&width=1200",
  "coral-crush":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/PeachPerfect.jpg?v=1779189698&width=1200",
  "peach-perfect":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/CoralCrush_2.jpg?v=1779189440&width=1200",
  "saintly-sweet":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_693953fc-c917-4318-bd05-29146235481d.jpg?v=1768303865&width=1200",
  "milkyway":
    "https://cdn.shopify.com/s/files/1/0396/9279/6066/files/1_a6ff78db-40f8-480d-b832-2228a3052948.jpg?v=1768302822&width=1200",
};

/**
 * Returns the secondary model hand-worn image for a given product.
 */
export function getProductLifestyleImage(product: ProductDTO): string | null {
  // If product has multiple gallery images from admin/db, use index 1
  if (product.images && product.images.length > 1) {
    return product.images[1];
  }

  // Otherwise check curated editorial lifestyle map
  if (LIFESTYLE_HAND_IMAGES[product.slug]) {
    return LIFESTYLE_HAND_IMAGES[product.slug];
  }

  // Fallback to primary image or null
  return null;
}

