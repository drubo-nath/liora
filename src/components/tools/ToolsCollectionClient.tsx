"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, Gem, Sparkles } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import type { ProductDTO } from "@/db/types";

type SortOption = "featured" | "price-asc" | "price-desc";

export default function ToolsCollectionClient({
  tools,
}: {
  tools: ProductDTO[];
}) {
  const [sort, setSort] = useState<SortOption>("featured");

  const sortedTools = useMemo(() => {
    const list = [...tools];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [tools, sort]);

  const tickerItems = [
    { icon: Heart, text: "Handmade with love using gel" },
    { icon: Clock, text: "Salon-quality nails in 10 min" },
    { icon: Gem, text: "Last up to 4 weeks with solid glue" },
    { icon: Sparkles, text: "No damage to your natural nails" },
  ];

  return (
    <div className="w-full bg-white font-sans text-ink">
      {/* ── 1. Hero Banner ── */}
      <div className="relative w-full h-52 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-neutral-900">
        <Image
          src="/tools/models-nail-essentials.png"
          alt="Tools & Accessories"
          fill
          priority
          className="object-cover object-center brightness-90"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-95 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white drop-shadow-md">
            Tools <span className="font-serif italic font-light">&amp;</span> Accessories
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/90 font-light tracking-wide max-w-xl drop-shadow-xs">
            Professional salon essentials engineered for seamless 10-minute application and gentle, damage-free removal.
          </p>
        </div>
      </div>

      {/* ── 2. Trust Bar Marquee Ticker ── */}
      <div className="w-full bg-black text-white py-3 sm:py-3.5 overflow-hidden border-y border-neutral-800 select-none">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((half) => (
            <div
              key={half}
              className="flex items-center space-x-8 sm:space-x-12 px-4 sm:px-6"
              aria-hidden={half === 1}
            >
              {[...tickerItems, ...tickerItems].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${half}-${idx}`}
                    className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-normal tracking-wider text-neutral-200 uppercase whitespace-nowrap"
                  >
                    <Icon className="h-3.5 w-3.5 text-white stroke-[1.5]" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Main Content Container ── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10 py-8 sm:py-12">
        {/* Breadcrumb & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line/60 text-xs text-taupe">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink font-medium">Tools &amp; Accessories</span>
          </nav>

          {/* Sort Dropdown & Product Count */}
          <div className="flex items-center justify-between sm:justify-end gap-6">
            <div className="relative flex items-center gap-2">
              <span className="text-taupe">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Sort tools and accessories"
                className="cursor-pointer bg-transparent text-ink font-medium outline-none pr-4 text-xs tracking-wide"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <span className="text-taupe font-normal">
              {sortedTools.length} products
            </span>
          </div>
        </div>

        {/* ── 4. Product Grid or Empty State ── */}
        {sortedTools.length > 0 ? (
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {sortedTools.slice(0, 3).map((product, idx) => (
              <ToolCard key={product.slug} product={product} priority={idx < 2} />
            ))}

            {/* Slot 4: Luxury In-Grid Press-ons Promotional Card */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-sm group bg-neutral-900 flex flex-col justify-end p-5 sm:p-6 text-center text-white select-none">
              <Image
                src="/tools/promo-card.png"
                alt="Handmade Press-ons Collection"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              <div className="relative z-10 flex flex-col items-center">
                <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-white leading-snug">
                  Handmade Press-ons
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-white/90 font-light tracking-wide">
                  Enjoy up to 40% off!
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center justify-center px-6 py-2 sm:py-2.5 bg-white text-ink text-xs font-semibold tracking-[0.18em] uppercase rounded-full shadow-md transition-all hover:bg-neutral-100 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  SHOP
                </Link>
              </div>
            </div>

            {/* Remaining Products */}
            {sortedTools.slice(3).map((product) => (
              <ToolCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State when no tools added yet */
          <div className="my-16 flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-line rounded-2xl bg-[#fbf7f6]">
            <p className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Collection in Preparation
            </p>
            <p className="mt-3 text-sm text-taupe max-w-md">
              Our curated application tools and gentle care essentials are being added to the catalog. Check back shortly.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-xs font-medium uppercase tracking-widest text-white hover:bg-clay transition-colors shadow-md"
            >
              Browse Press-On Sets
            </Link>
          </div>
        )}

        {/* ── 5. Bottom Brand Footnote ── */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-line/60 text-center">
          <p className="text-xs uppercase tracking-widest text-taupe font-medium">
            Salon Quality Essentials · Delivered Across Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
}
