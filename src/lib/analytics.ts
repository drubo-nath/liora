"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

/** Track page views across Google Analytics and Meta Pixel */
export function trackPageView(url: string) {
  if (!hasWindow()) return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
        page_path: url,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  } catch {
    // Fail silently in ad-blocked or non-standard environments
  }
}

/** Track Add To Cart conversion event */
export function trackAddToCart(item: {
  slug: string;
  name: string;
  price: number;
}) {
  if (!hasWindow()) return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "add_to_cart", {
        currency: "BDT",
        value: item.price,
        items: [
          {
            item_id: item.slug,
            item_name: item.name,
            price: item.price,
            quantity: 1,
          },
        ],
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "AddToCart", {
        content_name: item.name,
        content_ids: [item.slug],
        content_type: "product",
        value: item.price,
        currency: "BDT",
      });
    }
  } catch {
    // Fail silently in ad-blocked or non-standard environments
  }
}

/** Track Order Purchase conversion event */
export function trackPurchase(order: {
  orderId: number | string;
  total: number;
  itemsCount: number;
}) {
  if (!hasWindow()) return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
        transaction_id: String(order.orderId),
        value: order.total,
        currency: "BDT",
        items_count: order.itemsCount,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value: order.total,
        currency: "BDT",
        num_items: order.itemsCount,
      });
    }
  } catch {
    // Fail silently in ad-blocked or non-standard environments
  }
}
