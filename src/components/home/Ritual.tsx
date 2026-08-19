"use client";

import Reveal from "@/components/motion/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Prep",
    body: "Buff, cleanse, and push back cuticles. Sixty seconds of prep for two weeks of wear.",
  },
  {
    n: "02",
    title: "Press",
    body: "Choose your size, align at the cuticle, and press firmly for thirty seconds per nail.",
  },
  {
    n: "03",
    title: "Wear",
    body: "Up to fourteen days of glass-finish wear. Remove gently with warm water and oil — zero damage.",
  },
];

export default function Ritual() {
  return (
    <section id="ritual" className="hairline border-t bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <Reveal className="mb-14 max-w-xl md:mb-20">
          <p className="eyebrow text-clay">The Ritual</p>
          <h2 className="headline mt-4 text-5xl md:text-7xl">
            Ten minutes. <em>Two weeks.</em>
          </h2>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i} amount={0.4}>
              <div className="hairline border-t pt-6">
                <p className="font-serif text-sm italic text-clay">{s.n}</p>
                <h3 className="mt-4 font-serif text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-taupe">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
