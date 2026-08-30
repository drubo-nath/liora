"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/Reveal";

/**
 * Full-bleed campaign carousel, Zara-style.
 *
 * To add slides: drop images in /public and append entries to SLIDES —
 * crossfade, arrows, and the progress rail switch on automatically once
 * there is more than one slide.
 */
interface Slide {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  /** Rendered in italic serif, appended after title. */
  accent?: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDES: Slide[] = [
  {
    src: "/header-image.jpg",
    alt: "Model wearing Liora press-on nails",
    eyebrow: "Handmade Press-On Nails",
    title: "Say it",
    accent: "with your hands.",
    ctaLabel: "Shop the Collection",
    ctaHref: "/shop",
  },
];

const AUTO_ADVANCE_MS = 6500;

const textLine = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.45 + i * 0.11 },
  }),
};

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const multi = SLIDES.length > 1;

  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    [],
  );

  // Auto-advance only matters once there are multiple slides.
  useEffect(() => {
    if (!multi) return;
    const t = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [multi, go]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100svh - 6.25rem)" }}
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
    >
      {/* ── Images: crossfade + slow Ken Burns zoom ────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: [0.25, 1, 0.35, 1] }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-[62%_50%]"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Legibility veil over the text corner only */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bone/70 via-bone/25 to-transparent" />

      {/* ── Copy — bottom-left, fashion-campaign style ─────────────── */}
      <div className="absolute bottom-0 left-0 z-10 max-w-2xl p-7 pb-12 md:p-14 md:pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={slide.src + "-copy"}>
            <p className="eyebrow overflow-hidden text-ink/60">
              <motion.span
                variants={textLine}
                custom={0}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {slide.eyebrow}
              </motion.span>
            </p>

            <h1 className="headline mt-4 text-[13vw] text-ink sm:text-6xl md:text-7xl">
              <span className="block overflow-hidden pb-0.5">
                <motion.span
                  variants={textLine}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  {slide.title}
                </motion.span>
              </span>
              {slide.accent && (
                <span className="block overflow-hidden pb-1.5">
                  <motion.span
                    variants={textLine}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    className="block"
                  >
                    <em>{slide.accent}</em>
                  </motion.span>
                </span>
              )}
            </h1>

            <div className="mt-7 overflow-hidden">
              <motion.div variants={textLine} custom={3} initial="hidden" animate="visible">
                <Link
                  href={slide.ctaHref}
                  className="eyebrow inline-block border border-ink bg-ink/90 px-9 py-4 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-transparent hover:text-ink"
                >
                  {slide.ctaLabel}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls: arrows + progress rail (multi-slide only) ────── */}
      {multi && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="eyebrow absolute left-7 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-ink/70 transition-colors hover:text-ink md:block"
          >
            ← Prev
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="eyebrow absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-ink/70 transition-colors hover:text-ink md:block"
          >
            Next →
          </button>

          <div className="absolute bottom-6 right-7 z-10 flex items-center gap-2 md:right-14">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-px w-10 transition-all duration-500",
                  i === index ? "bg-ink" : "bg-ink/25 hover:bg-ink/60",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
