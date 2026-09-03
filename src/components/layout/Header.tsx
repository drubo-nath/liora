"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/cn";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import SizeChartModal from "@/components/sizing/SizeChartModal";

export default function Header() {
  const { count, openCart } = useCart();
  const { data: session, isPending } = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  const isHome = pathname === "/";
  const isAdmin = session?.user.role === "admin";
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-[50] w-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isHome && "-mb-14 md:-mb-16",
          isTransparent
            ? "border-none bg-gradient-to-b from-black/55 via-black/15 to-transparent text-white"
            : "border-b border-line/60 bg-bone/95 backdrop-blur-md text-ink shadow-xs"
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled ? "h-12 md:h-13" : "h-14 md:h-16"
          )}
        >
          {/* Left — Clean, Minimal Navigation (Shop & Size Guide) */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/shop"
              className={cn(
                "link-sweep eyebrow text-xs tracking-[0.22em] transition-colors duration-300",
                isTransparent
                  ? "text-white/95 hover:text-white"
                  : "text-ink hover:text-clay"
              )}
            >
              Shop
            </Link>
            <Link
              href="/sizing"
              className={cn(
                "link-sweep eyebrow text-xs tracking-[0.22em] transition-colors duration-300",
                isTransparent
                  ? "text-white/95 hover:text-white"
                  : "text-ink hover:text-clay"
              )}
            >
              Size Guide
            </Link>
            {!isPending && isAdmin && (
              <Link
                href="/admin"
                className="link-sweep eyebrow text-xs tracking-[0.22em] text-clay font-medium"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Left — Mobile Menu Button */}
          <button
            className={cn(
              "eyebrow flex items-center gap-2 md:hidden text-xs tracking-widest transition-colors",
              isTransparent ? "text-white" : "text-ink"
            )}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span
              className={cn(
                "block h-px w-5 transition-colors",
                isTransparent ? "bg-white" : "bg-ink"
              )}
            />
            Menu
          </button>

          {/* Center — Prominent, Bold & Visible Brand Logo */}
          <Link
            href="/"
            className="justify-self-center flex items-center transition-transform duration-200 active:scale-95 py-1"
            aria-label="Liora home"
          >
            <Image
              src="/liora.svg"
              alt="Liora"
              width={220}
              height={85}
              priority
              className={cn(
                "w-auto transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled ? "h-7 md:h-8" : "h-10 md:h-12",
                isTransparent
                  ? "brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] opacity-100"
                  : "opacity-100"
              )}
            />
          </Link>

          {/* Right — Actions */}
          <div className="flex items-center justify-end gap-6 md:gap-7">
            {!isPending &&
              (session ? (
                <button
                  onClick={async () => {
                    await authClient.signOut();
                    router.refresh();
                  }}
                  className={cn(
                    "link-sweep eyebrow hidden md:block text-xs tracking-widest transition-colors",
                    isTransparent
                      ? "text-white/95 hover:text-white"
                      : "text-ink hover:text-clay"
                  )}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    "link-sweep eyebrow hidden md:block text-xs tracking-widest transition-colors",
                    isTransparent
                  ? "text-white/95 hover:text-white"
                  : "text-ink hover:text-clay"
                  )}
                >
                  Sign In
                </Link>
              ))}

            {/* Bag Button */}
            <button
              onClick={openCart}
              className={cn(
                "link-sweep eyebrow flex items-center gap-2 text-xs tracking-widest transition-colors",
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-ink hover:text-clay"
              )}
              aria-label={`Open bag, ${count} items`}
            >
              Bag
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full text-[10px] font-medium tracking-normal transition-colors",
                  isTransparent ? "bg-white text-ink font-semibold" : "bg-ink text-cream"
                )}
              >
                {count}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenSizeGuide={() => {
          setMenuOpen(false);
          setSizeModalOpen(true);
        }}
      />

      <SizeChartModal
        open={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
      />
    </>
  );
}
