import type { Metadata } from "next";
import Link from "next/link";
import Swatch from "@/components/Swatch";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "The Atelier",
  description:
    "Liora is a Dhaka-born nail house crafting luxury press-on nails — damage-free, reusable, and made with intention.",
};

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-14 md:px-10 md:pt-24">
        <Reveal>
          <p className="eyebrow text-clay">The Atelier</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="headline mt-5 max-w-4xl text-6xl md:text-8xl">
            Beauty, <em>made slowly</em> in a fast city
          </h1>
        </Reveal>
      </section>

      {/* Story split */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-24 md:grid-cols-2 md:px-10 lg:gap-20">
        <Reveal>
          <Swatch tones={["#e9d7c6", "#a6715c"]} variant="hero" className="aspect-[4/5] w-full" />
        </Reveal>
        <div className="max-w-lg">
          <Reveal>
            <h2 className="headline text-4xl md:text-5xl">
              Born in <em>Dhaka</em>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-taupe">
              <p>
                Liora began at a small desk in Banani with a simple frustration:
                salon gel appointments that cost half a day and left nails
                thinner each time. We believed beautiful nails shouldn&apos;t
                require damage, UV lamps, or a standing appointment.
              </p>
              <p>
                Every Liora set is pressed, shaped, and hand-finished by our
                small team in Dhaka. We use a HEMA-free, cruelty-free formula
                and test each shade through real Bangladeshi life — rickshaw
                commutes, wedding seasons, monsoon humidity, and all.
              </p>
              <p>
                The result: nails that look like a ৳3,000 salon set, apply in
                ten minutes, and come off without a trace.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section id="promise" className="hairline border-t bg-cream">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-14">
            <p className="eyebrow text-clay">Our Promise</p>
            <h2 className="headline mt-4 text-5xl md:text-6xl">
              What we <em>stand</em> by
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {[
              {
                t: "Damage-free, always",
                b: "No drills, no acetone soaks, no UV. Your natural nails stay exactly as healthy as they were.",
              },
              {
                t: "7-day exchange",
                b: "Wrong size or a shade that isn't you? Exchange any unworn set within seven days, nationwide.",
              },
              {
                t: "Made fairly",
                b: "Every set is made by our in-house Dhaka team — paid fairly, trained properly, credited proudly.",
              },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i} className="h-full">
                <div className="h-full bg-cream p-8 md:p-10">
                  <p className="font-serif text-sm italic text-clay">0{i + 1}</p>
                  <h3 className="mt-4 font-serif text-2xl">{v.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-taupe">{v.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={2} className="mt-14 text-center">
            <Link
              href="/shop"
              className="eyebrow inline-block bg-ink px-10 py-4.5 text-cream transition-colors duration-300 hover:bg-clay-deep"
            >
              Shop the Collection
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
