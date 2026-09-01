"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Track page views across Google Analytics and Meta Pixel */
export function trackPageView(url: string) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }

  if (window.fbq) {
    window.fbq("track", "PageView");
  }
}

/** Track Add To Cart conversion event */
export function trackAddToCart(item: {
  slug: string;
  name: string;
  price: number;
}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
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

  if (window.fbq) {
    window.fbq("track", "AddToCart", {
      content_name: item.name,
      content_ids: [item.slug],
      content_type: "product",
      value: item.price,
      currency: "BDT",
    });
  }
}

/** Track Order Purchase conversion event */
export function trackPurchase(order: {
  orderId: number | string;
  total: number;
  itemsCount: number;
}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: String(order.orderId),
      value: order.total,
      currency: "BDT",
      items_count: order.itemsCount,
    });
  }

  if (window.fbq) {
    window.fbq("track", "Purchase", {
      value: order.total,
      currency: "BDT",
      num_items: order.itemsCount,
    });
  }
}

