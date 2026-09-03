"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/checkout", label: "Checkout" },
];

interface MenuEntry {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function MobileMenu({
  open,
  onClose,
  onOpenSizeGuide,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSizeGuide?: () => void;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const links: MenuEntry[] = [
    ...LINKS,
    ...(onOpenSizeGuide
      ? [{ href: "#", label: "Size Guide", onClick: onOpenSizeGuide }]
      : []),
    ...(session?.user.role === "admin"
      ? [{ href: "/admin", label: "Admin" }]
      : []),
    // Auth entry — sign in for guests, sign out for sessions.
    !isPending &&
      (!session
        ? { href: "/login", label: "Sign In" }
        : {
            href: "#",
            label: "SIGN OUT",
            onClick: async () => {
              await authClient.signOut();
              onClose();
              router.refresh();
            },
          }),
  ].filter(Boolean) as MenuEntry[];

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
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: EASE }}
              >
                {l.onClick ? (
                  <button
                    onClick={l.onClick}
                    className="headline block py-3 text-left text-5xl"
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="headline block py-3 text-5xl"
                  >
                    {l.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>
          <p className="eyebrow px-8 pb-10 text-taupe">
            Pioneering Luxury Press-Ons in Bangladesh
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
