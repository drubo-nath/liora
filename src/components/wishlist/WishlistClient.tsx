"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import type { ProductDTO } from "@/db/types";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/lib/hooks/useWishlist";

export default function WishlistClient({ products }: { products: ProductDTO[] }) {
  const { slugs, count } = useWishlist();

  const wishlistedProducts = products.filter((p) => slugs.includes(p.slug));

  return (
    <div className="min-h-[70vh] bg-[#fbfaf8] pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12">
        {/* Page Header */}
        <div className="mb-10 md:mb-14 text-center">
          <h1 className="headline font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
            My Wishlist
          </h1>
          {count > 0 && (
            <p className="text-xs text-neutral-500 mt-2 font-serif">
              {count} {count === 1 ? "item" : "items"} saved
            </p>
          )}
        </div>

        {/* Content */}
        {wishlistedProducts.length === 0 ? (
          <div className="mx-auto max-w-md text-center py-16 px-4">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
              <Heart className="h-7 w-7 stroke-[1.25]" />
            </div>
            <h2 className="headline font-serif text-xl sm:text-2xl text-ink font-normal">
              Your wishlist is currently empty
            </h2>
            <p className="mt-3 text-sm text-neutral-500 font-serif leading-relaxed">
              Explore our handcrafted collections and save your favorite salon-sculpted shades to review anytime.
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-xs font-serif uppercase tracking-[0.2em] text-white hover:bg-clay transition-colors"
              >
                <span>Discover The Collection</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

