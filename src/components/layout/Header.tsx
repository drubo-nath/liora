"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/cn";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Atelier" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-[50] transition-all duration-500",
          scrolled
            ? "border-b border-line bg-bone/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10 mb-5">
          {/* Left — nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="link-sweep eyebrow">
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            className="eyebrow flex items-center gap-2 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-px w-5 bg-ink" />
            Menu
          </button>

          {/* Center — wordmark */}
          <Link
            href="/"
            className="justify-self-center font-serif text-[22px] tracking-[0.32em] md:text-2xl"
            aria-label="Liora home"
          >
            <Image src='/liora.svg' alt="liora" width={100} height={10} />
          </Link>

          {/* Right — actions */}
          <div className="flex items-center justify-end gap-7">
            <Link href="/shop" className="link-sweep eyebrow hidden md:block">
              Search
            </Link>
            <button
              onClick={openCart}
              className="link-sweep eyebrow flex items-center gap-2"
              aria-label={`Open bag, ${count} items`}
            >
              Bag
              <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] tracking-normal text-cream">
                {count}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
