"use client";

import { motion } from "motion/react";
import type { ProductDTO } from "@/db/types";
import ProductCard from "@/components/ProductCard";
import { EASE } from "@/components/motion/Reveal";

export default function BestsellersGrid({ products }: { products: ProductDTO[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4"
    >
      {products.map((p, i) => (
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
  );
}
