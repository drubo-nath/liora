"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import ToolCard from "@/components/tools/ToolCard";
import type { ProductDTO } from "@/db/types";
import { EASE } from "@/components/motion/Reveal";

export default function ToolsSection({ tools }: { tools: ProductDTO[] }) {
  // If no tools have been added yet by the admin, keep the layout clean
  const hasTools = tools.length > 0;
  const featuredTools = tools.slice(0, 6);

  return (
    <section className="relative w-full bg-white py-14 sm:py-20 md:py-24 border-t border-line/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        {/* ── Split Layout: Left Sticky Card & Right Product Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* ── Left Column: Sticky Editorial Feature Card ── */}
          <div className="md:col-span-5 lg:col-span-5 md:sticky md:top-24 md:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] md:h-[620px] rounded-2xl overflow-hidden shadow-sm bg-neutral-900 group"
            >
              {/* Background Editorial Image */}
              <Image
                src="/tools/models-nail-essentials.png"
                alt="Must-Have Nail Essentials"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay for Pristine Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 flex flex-col items-center text-center text-white select-none">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-wide text-white leading-tight drop-shadow-sm">
                  Must-Have Nail Essentials
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-white/90 font-light tracking-wide max-w-[280px]">
                  Get the essential tools for perfect nails
                </p>
                <Link
                  href="/tools-accessories"
                  className="mt-6 inline-flex items-center justify-center px-7 py-3 bg-white text-ink text-xs font-semibold tracking-[0.18em] uppercase rounded-full shadow-lg transition-all duration-300 hover:bg-neutral-100 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  SHOP ALL TOOLS
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Dynamic Products Grid (From Database) ── */}
          <div className="md:col-span-7 lg:col-span-7">
            {hasTools ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                {featuredTools.map((product, idx) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: (idx % 2) * 0.1,
                    }}
                  >
                    <ToolCard product={product} priority={idx < 2} />
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Sleek Empty / Coming Soon Placeholder until Admin Adds Tools */
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-neutral-200 rounded-2xl bg-[#fbf7f6] min-h-[380px]">
                <p className="font-serif text-xl sm:text-2xl text-ink font-normal">
                  Care &amp; Application Essentials
                </p>
                <p className="mt-2 text-xs sm:text-sm text-taupe max-w-sm">
                  Professional adhesives, UV lamps, and gentle removal tools are coming soon.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-ink px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-ink hover:bg-ink hover:text-white transition-colors"
                >
                  Explore Press-On Shades
                </Link>
              </div>
            )}

            {/* Bottom View All Link for Mobile & Tablet */}
            {hasTools && (
              <div className="mt-12 text-center md:hidden">
                <Link
                  href="/tools-accessories"
                  className="inline-flex items-center justify-center rounded-full border border-ink px-8 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  View All Tools &amp; Accessories
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
