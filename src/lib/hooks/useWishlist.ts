"use client";

import { useCallback, useSyncExternalStore } from "react";

const EMPTY_SLUGS: string[] = [];
let cachedSlugs: string[] = EMPTY_SLUGS;
let lastRawWishlistState = "";

function getWishlistedSlugs(): string[] {
  if (typeof window === "undefined") return EMPTY_SLUGS;
  try {
    const slugs: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("wishlist_") && localStorage.getItem(key) === "1") {
        slugs.push(key.replace("wishlist_", ""));
      }
    }
    slugs.sort();
    const rawState = slugs.join(",");
    if (rawState === lastRawWishlistState) {
      return cachedSlugs;
    }
    lastRawWishlistState = rawState;
    cachedSlugs = slugs;
    return cachedSlugs;
  } catch {
    return EMPTY_SLUGS;
  }
}

const getServerSnapshot = () => EMPTY_SLUGS;

const subscribeWishlist = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("wishlist_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("wishlist_change", callback);
  };
};

export function useWishlist() {
  const slugs = useSyncExternalStore(
    subscribeWishlist,
    getWishlistedSlugs,
    getServerSnapshot
  );

  const isWishlisted = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggleWishlist = useCallback((slug: string) => {
    if (typeof window === "undefined") return;
    try {
      const key = `wishlist_${slug}`;
      if (localStorage.getItem(key) === "1") {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, "1");
      }
      window.dispatchEvent(new Event("wishlist_change"));
    } catch {
      // ignore
    }
  }, []);

  return {
    slugs,
    count: slugs.length,
    isWishlisted,
    toggleWishlist,
  };
}
