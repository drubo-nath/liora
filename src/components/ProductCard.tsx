"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatBDT } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import Swatch from "@/components/Swatch";
import { EASE } from "@/components/motion/Reveal";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <Swatch
            tones={product.tones}
            className="aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
          {product.badge && (
            <span className="eyebrow absolute left-4 top-4 bg-cream/90 px-3 py-1.5 text-[10px] backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {/* quick add */}
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
            }}
            className="eyebrow absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 py-4 text-cream backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 hover:bg-clay-deep"
            aria-label={`Add ${product.name} to bag`}
          >
            Quick Add — {formatBDT(product.price)}
          </button>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
          <div>
            <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
            <p className="mt-1 text-xs text-taupe">{product.tagline}</p>
          </div>
          <div className="text-right text-sm">
            {product.compareAt && (
              <p className="text-xs text-taupe line-through">
                {formatBDT(product.compareAt)}
              </p>
            )}
            <p>{formatBDT(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
