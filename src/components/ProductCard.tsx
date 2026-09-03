"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ProductDTO } from "@/db/types";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import Swatch from "@/components/Swatch";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { getProductLifestyleImage } from "@/lib/product-media";

export default function ProductCard({ product }: { product: ProductDTO }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const primaryImage = product.imageUrl || (product.images && product.images[0]) || null;
  const lifestyleImage = getProductLifestyleImage(product);
  const hasSecondary = Boolean(lifestyleImage && lifestyleImage !== primaryImage);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
          {/* Image 1: Studio Flat Lay on Neutral Linen/Silk */}
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={cn(
                "object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-105",
                hasSecondary ? "opacity-100 group-hover:opacity-0" : "opacity-100"
              )}
            />
          ) : (
            <Swatch
              tones={product.tones}
              className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-105"
            />
          )}

          {/* Image 2: Model's Real Hand (Worn Perspective) — Smooth Crossfade */}
          {hasSecondary && lifestyleImage && (
            <Image
              src={lifestyleImage}
              alt={`${product.name} worn on hand`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 pointer-events-none"
            />
          )}

          {/* Luxury Badge */}
          {product.badge && (
            <span className="eyebrow absolute left-3 top-3 z-10 bg-cream/90 px-3 py-1.5 text-[9px] tracking-wider text-ink backdrop-blur-sm shadow-xs">
              {product.badge}
            </span>
          )}

          {/* Discreet "Quick Add +" Button Sliding Up from Bottom Edge */}
          <div className="absolute inset-x-3 bottom-3 z-20 translate-y-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={cn(
                "flex w-full items-center justify-between border px-4 py-3 text-[11px] tracking-widest uppercase backdrop-blur-md transition-all duration-300",
                added
                  ? "border-clay bg-clay text-cream shadow-md"
                  : "border-line/70 bg-cream/95 text-ink shadow-sm hover:border-ink hover:bg-ink hover:text-cream"
              )}
              aria-label={`Quick add ${product.name} to bag`}
            >
              <span className="font-medium">
                {added ? "Added to Bag" : "Quick Add"}
              </span>
              <span className="font-serif text-sm leading-none">
                {added ? "✓" : "+"}
              </span>
            </button>
          </div>
        </div>

        {/* Product Details & Price */}
        <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
          <div>
            <h3 className="font-serif text-lg leading-tight text-ink group-hover:text-clay transition-colors duration-300">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-taupe">{product.tagline}</p>
          </div>
          <div className="text-right text-sm">
            {product.compareAtPrice && (
              <p className="text-xs text-taupe line-through">
                {formatBDT(product.compareAtPrice)}
              </p>
            )}
            <p className="font-medium text-ink">{formatBDT(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
