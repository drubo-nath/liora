"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Complimentary delivery on orders over ৳2,500",
  "Cash on delivery — anywhere in Bangladesh",
  "The Monsoon Edit has arrived",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative z-[60] flex h-9 items-center justify-center overflow-hidden bg-ink text-cream">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow absolute text-[10px] tracking-[0.24em]"
        >
          {MESSAGES[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
