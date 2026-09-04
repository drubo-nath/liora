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
  type?: "video" | "image";
  poster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; isSizeGuide?: boolean };
}

const SLIDES: Slide[] = [
  {
    src: "/Create_hero_section_transition_1080p_202609050243.mp4",
    type: "video",
    poster: "/hero-image2.jpg",
    alt: "Liora Luxury Salon Press-On Nails Transition",
    eyebrow: "ATELIER COLLECTION",
    title: "SCULPTED ARTISTRY",
    subtitle: "HANDCRAFTED SALON GEL · REUSABLE FOR MONTHS",
    primaryCta: { label: "SHOP THE CAMPAIGN", href: "/shop" },
    secondaryCta: { label: "FIND YOUR SIZE", href: "#size-guide", isSizeGuide: true },
  },
  {
    src: "/hero-image2.jpg",
    type: "image",
    alt: "Liora Festive and Fall Handcrafted Luxury Press-On Nails",
    eyebrow: "LIMITED EDITION",
    title: "THE FESTIVE EDIT",
    subtitle: "AUTHENTIC SHIMMER & GLAZE · 15% OFF",
    primaryCta: { label: "SHOP FESTIVE", href: "/shop" },
    secondaryCta: { label: "EXPLORE ALL", href: "/shop" },
  },
  {
    src: "/header-image.jpg",
    type: "image",
    alt: "Model wearing Liora luxury handcrafted press-on nails",
    eyebrow: "SALON PERFECTION",
    title: "MODERN LUXURY",
    subtitle: "ENGINEERED STRENGTH · ZERO NATURAL DAMAGE",
    primaryCta: { label: "SHOP BESTSELLERS", href: "/shop" },
    secondaryCta: { label: "SIZE GUIDE", href: "#size-guide", isSizeGuide: true },
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  const slide = SLIDES[index];

  useEffect(() => {
    const duration = slide.type === "video" ? 8500 : AUTO_ADVANCE_MS;
    const t = setTimeout(() => go(1), duration);
    return () => clearTimeout(t);
  }, [go, slide.type, index]);

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-ink text-white"
        style={{ height: "calc(100svh - 6.25rem)", minHeight: "600px" }}
        aria-roledescription="carousel"
        aria-label="Featured campaigns"
      >
        {/* ── Background Imagery / Video with Crossfade ── */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {slide.type === "video" ? (
              <video
                key={slide.src}
                src={slide.src}
                poster={slide.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            ) : (
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
                  className={cn(
                    "object-cover transition-all duration-700",
                    slide.src === "/hero-image2.jpg"
                      ? "object-[50%_35%] md:object-[60%_35%]"
                      : "object-[55%_35%] md:object-[60%_35%]"
                  )}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Versace Pure Cinema Gradient: Clear middle, focused bottom grounding ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* ── Versace Front Hero Layout: Centered Bottom, Bold All-Caps, Sharp Geometric CTAs ── */}
        <div className="absolute inset-x-0 bottom-10 sm:bottom-14 z-20 flex flex-col items-center justify-center px-5 sm:px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center max-w-3xl space-y-3 md:space-y-4"
            >
              {/* Versace Eyebrow */}
              {slide.eyebrow && (
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.38em] font-semibold text-white/90">
                  {slide.eyebrow}
                </p>
              )}

              {/* Versace Bold All-Caps Headline */}
              <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white leading-tight">
                {slide.title}
              </h1>

              {/* Versace Minimal Subtitle */}
              {slide.subtitle && (
                <p className="text-[11px] sm:text-xs text-white/80 uppercase font-medium tracking-[0.24em] max-w-xl pb-1">
                  {slide.subtitle}
                </p>
              )}

              {/* Versace Dual Sharp Buttons (Sharp Corners, Zero Border-Radius, High Contrast) */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <Link
                  href={slide.primaryCta.href}
                  className="w-full sm:w-auto min-w-[210px] rounded-none border border-white bg-white px-8 py-3.5 text-center text-[11px] font-bold tracking-[0.26em] text-black uppercase transition-all duration-300 hover:bg-transparent hover:text-white active:scale-98 shadow-md"
                >
                  {slide.primaryCta.label}
                </Link>

                {slide.secondaryCta.isSizeGuide ? (
                  <button
                    type="button"
                    onClick={() => setSizeModalOpen(true)}
                    className="w-full sm:w-auto min-w-[210px] rounded-none border border-white bg-black/30 backdrop-blur-xs px-8 py-3.5 text-center text-[11px] font-bold tracking-[0.26em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black active:scale-98 cursor-pointer shadow-md"
                  >
                    {slide.secondaryCta.label}
                  </button>
                ) : (
                  <Link
                    href={slide.secondaryCta.href}
                    className="w-full sm:w-auto min-w-[210px] rounded-none border border-white bg-black/30 backdrop-blur-xs px-8 py-3.5 text-center text-[11px] font-bold tracking-[0.26em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black active:scale-98 shadow-md"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Versace Architectural Pagination Indicators ── */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-[2px] transition-all duration-400 rounded-none",
                i === index ? "w-8 sm:w-12 bg-white" : "w-3 sm:w-4 bg-white/40 hover:bg-white/70"
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
