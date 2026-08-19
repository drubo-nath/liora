"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import Swatch from "@/components/Swatch";
import Reveal from "@/components/motion/Reveal";

export default function MonsoonEdit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.16]">
        <Swatch tones={["#3a4a6b", "#141d31"]} className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[1440px] flex-col items-start justify-center px-5 py-24 text-cream md:px-10">
        <Reveal>
          <p className="eyebrow text-blush">Limited Collection</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="headline mt-5 max-w-3xl text-6xl md:text-8xl">
            The <em>Monsoon</em> Edit
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/80">
            Five rain-washed shades — loom blues, stormy mauves, and one perfect
            oxblood — inspired by Dhaka in the rain. While the season lasts.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <Link
            href="/shop"
            className="eyebrow mt-10 inline-block bg-cream px-10 py-4.5 text-ink transition-colors duration-300 hover:bg-blush"
          >
            Explore the Edit
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
