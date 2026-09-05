"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import type { ProductDTO, Finish } from "@/db/types";
import { finishes, finishDisplayLabels, normalizeFinish } from "@/db/types";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/Reveal";

type Sort = "featured" | "low" | "high";

export default function ShopClient({ products }: { products: ProductDTO[] }) {
  const params = useSearchParams();
  const [finish, setFinish] = useState<Finish | null>(() => {
    return normalizeFinish(params.get("finish"));
  });
  const [sort, setSort] = useState<Sort>("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Lock background scroll when filter drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterDrawerOpen]);

  // Counts per finish category
  const finishCounts = useMemo(() => {
    const map: Record<string, number> = {
      all: products.length,
      Exclusive: 0,
      Classic: 0,
      Signature: 0,
    };
    for (const p of products) {
      const norm = normalizeFinish(p.finish) ?? p.finish;
      if (map[norm] !== undefined) {
        map[norm]++;
      }
    }
    return map;
  }, [products]);

  const visible = useMemo(() => {
    const list = finish
      ? products.filter((p) => (normalizeFinish(p.finish) ?? p.finish) === finish)
      : [...products];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, finish, sort]);

  const hasActiveFilters = finish !== null || sort !== "featured";
  const activeFilterCount = (finish !== null ? 1 : 0) + (sort !== "featured" ? 1 : 0);

  const resetFilters = () => {
    setFinish(null);
    setSort("featured");
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-10 md:pt-16">
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        className="headline mt-4 text-5xl md:text-8xl"
      >
        All <em>shades</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
        className="mt-3 text-sm md:text-base text-taupe max-w-[600px]"
      >
        Discover our curated collection of luxury press-on nails, meticulously crafted for
        elegance and style.
      </motion.p>

      {/* ── Breadcrumbs & Filter Bar (sticky) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="hairline sticky top-14 md:top-16 z-30 mt-8 md:mt-10 flex items-center justify-between border-y bg-bone/95 py-3.5 md:py-4 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* Left: Breadcrumbs (Matching Ersa Nails Image 2) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-taupe font-normal">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="text-line select-none">/</span>
          <button
            type="button"
            onClick={() => setFinish(null)}
            className="hover:text-ink transition-colors cursor-pointer"
          >
            Collections
          </button>
          <span className="text-line select-none">/</span>
          <span className="text-ink font-medium">
            {finish ? finishDisplayLabels[finish] : "All Products"}
          </span>
        </nav>

        {/* Mobile: Filter Trigger Button (Matching Ersa Nails Image 2 circled button) */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-ink shadow-xs transition-all hover:border-ink cursor-pointer active:scale-95"
            aria-label="Filter and sort products"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[9px] font-bold text-cream">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop: Inline Filter Chips & Sort Dropdown */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip active={finish === null} onClick={() => setFinish(null)}>
              All
            </FilterChip>
            {finishes.map((f) => (
              <FilterChip key={f} active={finish === f} onClick={() => setFinish(f)}>
                {finishDisplayLabels[f]}
              </FilterChip>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-taupe border-l border-line pl-6">
            <span className="text-[10px] uppercase tracking-wider text-taupe font-medium">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer bg-transparent text-sm text-ink outline-none"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="low">Price · Low to High</option>
              <option value="high">Price · High to Low</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* ── Product Grid ── */}
      <motion.div layout className="mt-8 md:mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
        {visible.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-16 text-center text-xs uppercase tracking-widest text-taupe font-medium">
        {visible.length} shades · Hand-finished in Dhaka
      </p>

      {/* ── Mobile Filter & Sort Drawer ── */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="absolute inset-0 bg-ink/50 backdrop-blur-xs"
            />

            {/* Slide-out Sheet (from bottom on mobile) */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] flex flex-col rounded-t-2xl border-t border-line bg-cream shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold tracking-[0.2em] text-ink uppercase">
                    Filter &amp; Sort
                  </h2>
                  {hasActiveFilters && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-cream">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-taupe hover:text-ink hover:border-ink transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Content Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-7 text-sm">
                {/* Collection / Finish Section */}
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.2em] text-taupe uppercase font-semibold">
                    Collection / Finish
                  </p>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setFinish(null)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 rounded-lg border transition-all cursor-pointer text-left",
                        finish === null
                          ? "border-ink bg-sand/30 font-medium text-ink"
                          : "border-line/60 bg-transparent text-taupe hover:text-ink"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full border text-[10px]",
                            finish === null ? "border-ink bg-ink text-cream" : "border-line"
                          )}
                        >
                          {finish === null && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <span>All Products</span>
                      </span>
                      <span className="text-xs text-taupe/80">{finishCounts.all}</span>
                    </button>

                    {finishes.map((f) => {
                      const isSelected = finish === f;
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFinish(f)}
                          className={cn(
                            "flex w-full items-center justify-between px-4 py-3 rounded-lg border transition-all cursor-pointer text-left",
                            isSelected
                              ? "border-ink bg-sand/30 font-medium text-ink"
                              : "border-line/60 bg-transparent text-taupe hover:text-ink"
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-full border text-[10px]",
                                isSelected ? "border-ink bg-ink text-cream" : "border-line"
                              )}
                            >
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </span>
                            <span>{finishDisplayLabels[f]}</span>
                          </span>
                          <span className="text-xs text-taupe/80">{finishCounts[f] ?? 0}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort Section */}
                <div className="space-y-3 border-t border-line/60 pt-5">
                  <p className="text-xs tracking-[0.2em] text-taupe uppercase font-semibold">
                    Sort By
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { key: "featured" as Sort, label: "Featured" },
                      { key: "low" as Sort, label: "Price: Low to High" },
                      { key: "high" as Sort, label: "Price: High to Low" },
                    ].map((item) => {
                      const isSelected = sort === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setSort(item.key)}
                          className={cn(
                            "flex w-full items-center justify-between px-4 py-3 rounded-lg border transition-all cursor-pointer text-left",
                            isSelected
                              ? "border-ink bg-sand/30 font-medium text-ink"
                              : "border-line/60 bg-transparent text-taupe hover:text-ink"
                          )}
                        >
                          <span>{item.label}</span>
                          <span
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-full border text-[10px]",
                              isSelected ? "border-ink bg-ink text-cream" : "border-line"
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-line bg-sand/20 px-6 py-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="flex-1 py-3 px-4 border border-line bg-cream text-xs uppercase tracking-wider font-semibold text-ink hover:bg-bone transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-center rounded-lg"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-2 py-3 px-4 bg-ink text-xs uppercase tracking-wider font-semibold text-cream hover:bg-clay transition-colors cursor-pointer text-center rounded-lg shadow-sm"
                >
                  View {visible.length} Products
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs uppercase tracking-wider font-medium border px-5 py-2.5 transition-all duration-300",
        active
          ? "border-ink bg-ink text-cream"
          : "border-line bg-transparent text-taupe hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
