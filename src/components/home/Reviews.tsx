"use client";

import Reveal from "@/components/motion/Reveal";

const REVIEWS = [
  {
    quote:
      "I wore Rouge Noor through a full wedding season — three events, endless dishes, zero chips. My salon has officially lost me.",
    name: "Anika R.",
    place: "Dhaka",
  },
  {
    quote:
      "The finish looks like a ৳3,000 gel manicure. Nobody believes they press on in ten minutes. Neither did I.",
    name: "Tashfia H.",
    place: "Chattogram",
  },
  {
    quote:
      "My natural nails have finally grown back. Removal takes five minutes and leaves nothing behind. This is the way.",
    name: "Mahruf K.",
    place: "Sylhet",
  },
];

export default function Reviews() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <Reveal className="mb-14 text-center md:mb-20">
        <p className="eyebrow text-clay">Word of Mouth</p>
        <h2 className="headline mt-4 text-5xl md:text-7xl">
          Loved, <em>loudly</em>
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i} amount={0.4} className="h-full">
            <figure className="flex h-full flex-col bg-bone p-8 md:p-10">
              <div className="text-sm tracking-[0.2em] text-clay">★★★★★</div>
              <blockquote className="mt-6 flex-1 font-serif text-xl leading-snug">
                “{r.quote}”
              </blockquote>
              <figcaption className="eyebrow mt-8 text-taupe">
                {r.name} — {r.place}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
