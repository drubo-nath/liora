"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/about", label: "The Atelier" },
  { href: "/checkout", label: "Checkout" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-serif text-[22px] tracking-[0.32em]">LIORA</span>
            <button onClick={onClose} className="eyebrow" aria-label="Close menu">
              Close
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
            {LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: EASE }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="headline block py-3 text-5xl"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <p className="eyebrow px-8 pb-10 text-taupe">
            Handcrafted in Dhaka, Bangladesh
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
