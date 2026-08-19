"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";

export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="hairline border-t bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 text-center md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow text-clay">The Inner Circle</p>
          <h2 className="headline mx-auto mt-4 max-w-2xl text-4xl md:text-6xl">
            First access to <em>new shades</em>
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-taupe">
            One letter a month. Early drops, private offers, nothing else.
          </p>
        </Reveal>

        <Reveal delay={1}>
          {sent ? (
            <p className="eyebrow mx-auto mt-10 border border-line bg-bone px-8 py-4 text-clay">
              Welcome to the inner circle ✦
            </p>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-md border border-ink"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-taupe"
              />
              <button
                type="submit"
                className="eyebrow shrink-0 bg-ink px-6 text-cream transition-colors duration-300 hover:bg-clay-deep"
              >
                Join
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
