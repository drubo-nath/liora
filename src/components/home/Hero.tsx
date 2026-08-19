"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Swatch from "@/components/Swatch";
import { EASE } from "@/components/motion/Reveal";

const line = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.15fr_1fr] md:px-10 md:pb-24 md:pt-16 lg:gap-16">
        {/* Copy */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="eyebrow text-clay"
          >
            Press-On Nails · Made in Bangladesh
          </motion.p>

          <h1 className="headline mt-6 text-[15vw] leading-[0.95] sm:text-7xl lg:text-[92px]">
            <span className="block overflow-hidden pb-1">
              <motion.span custom={0} variants={line} initial="hidden" animate="visible" className="block">
                The salon,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span custom={1} variants={line} initial="hidden" animate="visible" className="block">
                <em>without</em> the salon.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-taupe"
          >
            Handcrafted press-on nails in sculpted shades — applied in ten
            minutes, worn for two weeks, removed without a trace of damage.
            Delivered to your door, anywhere in Bangladesh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Link
              href="/shop"
              className="eyebrow bg-ink px-10 py-4.5 text-cream transition-colors duration-300 hover:bg-clay-deep"
            >
              Shop the Collection
            </Link>
            <Link href="/about" className="link-sweep eyebrow py-2">
              Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-14 flex items-center gap-8 text-xs text-taupe"
          >
            <span>★★★★★ 4.9 — 2,300+ reviews</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="hidden sm:block">Reusable up to 5 wears</span>
          </motion.div>
        </div>

        {/* Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.965 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
          className="relative"
        >
          <Swatch
            tones={["#eec4ba", "#a05236"]}
            variant="hero"
            className="aspect-[4/5] w-full md:aspect-[5/6]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            className="eyebrow absolute bottom-5 left-5 bg-cream/90 px-3.5 py-2 text-[10px] backdrop-blur-sm"
          >
            Worn — Terra Sundari
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
