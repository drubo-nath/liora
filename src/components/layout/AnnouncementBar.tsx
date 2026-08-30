"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AnnouncementBar({ messages }: { messages: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 4200);
    return () => clearInterval(t);
  }, [messages.length]);

  if (messages.length === 0) return null;

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
          {messages[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
