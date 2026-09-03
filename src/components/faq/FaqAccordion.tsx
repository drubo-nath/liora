"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export default function FaqAccordion({
  items,
  defaultIndex = 0,
}: {
  items: FaqItem[];
  defaultIndex?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultIndex);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="transition-colors duration-200">
            <button
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-clay focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-xl md:text-2xl pr-4 text-ink">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-sm transition-transform duration-300",
                  isOpen ? "rotate-45 bg-ink text-cream border-ink" : "text-taupe hover:border-ink"
                )}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 text-[15px] leading-relaxed text-taupe space-y-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

