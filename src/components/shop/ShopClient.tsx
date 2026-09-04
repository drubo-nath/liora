"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
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

  const visible = useMemo(() => {
    const list = finish
      ? products.filter((p) => (normalizeFinish(p.finish) ?? p.finish) === finish)
      : [...products];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, finish, sort]);

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="eyebrow text-clay"
      >
        The Collection
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        className="headline mt-4 text-6xl md:text-8xl"
      >
        All <em>shades</em>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="hairline sticky top-16 z-30 mt-10 flex flex-wrap items-center justify-between gap-4 border-y bg-bone/90 py-4 backdrop-blur-md"
      >
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
        <div className="flex items-center gap-3 text-xs text-taupe">
          <span className="eyebrow text-[10px]">Sort</span>
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
      </motion.div>

      <motion.div layout className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
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

      <p className="eyebrow mt-16 text-center text-taupe">
        {visible.length} shades · Hand-finished in Dhaka
      </p>
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
        "eyebrow border px-5 py-2.5 transition-all duration-300",
        active
          ? "border-ink bg-ink text-cream"
          : "border-line bg-transparent text-taupe hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
