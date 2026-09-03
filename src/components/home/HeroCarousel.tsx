"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/Reveal";
import SizeChartModal from "@/components/sizing/SizeChartModal";

interface Slide {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; isSizeGuide?: boolean };
}

const SLIDES: Slide[] = [
  {
    src: "/hero-image2.jpg",
    alt: "Liora Festive and Fall Handcrafted Luxury Press-On Nails",
    eyebrow: "SAVE 15% ON FESTIVE NAILS",
    title: "Festive Again",
    subtitle: "Your Festive nails have arrived! Enjoy 15% off with a limited gift now! 🍂",
    primaryCta: { label: "SHOP FESTIVE", href: "/shop" },
    secondaryCta: { label: "SHOP ALL", href: "/shop" },
  },
  {
    src: "/header-image.jpg",
    alt: "Model wearing Liora luxury handcrafted press-on nails",
    eyebrow: "HANDCRAFTED SALON NAILS",
    title: "Salon Artistry",
    subtitle: "Sculpted gel press-on nails in 10 minutes. Damage-free, reusable for months.",
    primaryCta: { label: "SHOP BESTSELLERS", href: "/shop" },
    secondaryCta: { label: "FIND YOUR SIZE", href: "#size-guide", isSizeGuide: true },
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [go]);

  const slide = SLIDES[index];

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-ink text-white"
        style={{ height: "calc(100svh - 6.25rem)", minHeight: "600px" }}
        aria-roledescription="carousel"
        aria-label="Featured campaigns"
      >
        {/* ── Background Imagery with Crossfade & Subtle Zoom ── */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: [0.25, 1, 0.35, 1] }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                quality={94}
                sizes="100vw"
                // className="object-cover object-[55%_35%] md:object-[60%_35%]"
                className={cn(
                  "object-cover transition-all duration-700",
                  slide.src === "/hero-image2.jpg"
                    ? "object-[50%_35%] md:object-[60%_35%]"
                    : "object-[55%_35%] md:object-[60%_35%]"
                )}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Cinematic Shadow Vignette for High Legibility (Ersa Style) ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

        {/* ── Copy Block (Left-aligned Ersa Nails Campaign Style) ── */}
        <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-end p-6 pb-16 md:justify-center md:p-14 lg:p-20 md:max-w-xl lg:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="space-y-4"
            >
              {/* Eyebrow */}
              <p className="eyebrow text-xs tracking-[0.24em] text-white/90 font-medium">
                {slide.eyebrow}
              </p>

              {/* Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight text-white leading-[1.04]">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-md pt-1">
                {slide.subtitle}
              </p>

              {/* Stacked Ersa-Style Buttons */}
              <div className="pt-4 flex flex-col gap-3 sm:max-w-xs">
                {/* Primary Button (Solid White) */}
                <Link
                  href={slide.primaryCta.href}
                  className="w-full rounded-xs bg-white py-3.5 px-6 text-center text-xs tracking-[0.2em] font-semibold text-ink uppercase shadow-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg active:scale-[0.99]"
                >
                  {slide.primaryCta.label}
                </Link>

                {/* Secondary Button (Frosted Outline) */}
                {slide.secondaryCta.isSizeGuide ? (
                  <button
                    type="button"
                    onClick={() => setSizeModalOpen(true)}
                    className="w-full rounded-xs border border-white/80 bg-black/20 py-3.5 px-6 text-center text-xs tracking-[0.2em] font-medium text-white uppercase backdrop-blur-xs transition-all duration-300 hover:bg-white hover:text-ink hover:border-white active:scale-[0.99]"
                  >
                    {slide.secondaryCta.label}
                  </button>
                ) : (
                  <Link
                    href={slide.secondaryCta.href}
                    className="w-full rounded-xs border border-white/80 bg-black/20 py-3.5 px-6 text-center text-xs tracking-[0.2em] font-medium text-white uppercase backdrop-blur-xs transition-all duration-300 hover:bg-white hover:text-ink hover:border-white active:scale-[0.99]"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Slide Indicator Dots (Centered Bottom) ── */}
        <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                i === index ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </section>

      {/* ── Ersa Nails Signature Trust Ribbon (Moving Marquee) ── */}
      <div className="overflow-hidden border-y border-white/10 bg-[#0e0d0c] text-white py-3.5">
        <div className="animate-marquee flex w-max items-center hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div
              key={half}
              className="flex items-center gap-10 md:gap-14 px-6 md:px-8"
              aria-hidden={half === 1}
            >
              {/* 1. Handcrafted */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs text-white/90">
                <svg
                  className="w-3.5 h-3.5 text-white/80 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="font-light tracking-wide">Handcrafted by nail techs using gel</span>
                <span className="text-white/20 pl-8 md:pl-10">✦</span>
              </div>

              {/* 2. Salon quality */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs text-white/90">
                <svg
                  className="w-3.5 h-3.5 text-white/80 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="font-light tracking-wide">Salon quality in under 10 min</span>
                <span className="text-white/20 pl-8 md:pl-10">✦</span>
              </div>

              {/* 3. Longevity */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs text-white/90">
                <svg
                  className="w-3.5 h-3.5 text-white/80 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                </svg>
                <span className="font-light tracking-wide">Last up to 4 weeks each wear</span>
                <span className="text-white/20 pl-8 md:pl-10">✦</span>
              </div>

              {/* 4. Zero Damage */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs text-white/90">
                <svg
                  className="w-3.5 h-3.5 text-white/80 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5 2 4 2 4-2" />
                  <circle cx="9" cy="9.5" r="0.75" fill="currentColor" />
                  <circle cx="15" cy="9.5" r="0.75" fill="currentColor" />
                </svg>
                <span className="font-light tracking-wide">Zero nail damage &amp; reusable for life</span>
                <span className="text-white/20 pl-8 md:pl-10">✦</span>
              </div>

              {/* 5. Acclaimed */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs text-white/90">
                <svg
                  className="w-3.5 h-3.5 text-white/80 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span className="font-light tracking-wide">Loved by 10,000+ happy hands in Bangladesh</span>
                <span className="text-white/20 pl-8 md:pl-10">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Modal Instance */}
      <SizeChartModal
        open={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
      />
    </>
  );
}
