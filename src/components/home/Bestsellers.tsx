"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/Reveal";

export default function Bestsellers() {
  const featured = products.filter((p) => p.badge === "Bestseller").slice(0, 4);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
        <Reveal>
          <p className="eyebrow text-clay">Most Loved</p>
          <h2 className="headline mt-4 text-5xl md:text-7xl">
            The <em>bestsellers</em>
          </h2>
        </Reveal>
        <Reveal delay={2} className="hidden md:block">
          <Link href="/shop" className="link-sweep eyebrow pb-1">
            View All Shades →
          </Link>
        </Reveal>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4"
      >
        {featured.map((p, i) => (
          <motion.div
            key={p.slug}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
              },
            }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center md:hidden">
        <Link href="/shop" className="eyebrow inline-block border border-ink px-10 py-4">
          View All Shades
        </Link>
      </div>
    </section>
  );
}
