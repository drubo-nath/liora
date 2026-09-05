import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Find Your Size — Press-On Nail Sizing Guide",
  description:
    "Follow our simple 3-step guide to measure your natural nails, choose your perfect press-on size (XS, S, M, L), and explore nail shapes and lengths.",
  openGraph: {
    title: "How to Find Your Size — Liora Press-On Nail Sizing Guide",
    description:
      "Follow our simple 3-step guide to measure your natural nails and choose your perfect press-on size.",
  },
};

export default function SizingPage() {
  return (
    <div className="bg-bone min-h-screen text-ink pb-24">
      {/* Header Banner */}
      <div className="border-b border-line/60 bg-cream/50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink font-normal tracking-tight">
            How to Find Your Size
          </h1>
          <p className="mt-4 text-base md:text-lg text-taupe max-w-xl mx-auto font-light">
            Follow these simple instructions to find the perfect size and shape for your handcrafted press-on nails.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 pt-12 space-y-20">
        {/* ── STEP 1: MEASURE YOUR NAILS ── */}
        <section className="space-y-6">
          <div className="border-b border-line/60 pb-4">
            <span className="font-serif text-sm italic text-clay">
              Step 01
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mt-1">
              Measure Your Nails
            </h2>
            <p className="mt-2 text-sm md:text-base text-taupe leading-relaxed">
              Hold a piece of paper or flexible measuring tape across your natural nail bed. Use a pen to mark the widest part of your nail (from sidewall to sidewall). Then use a millimeter (mm) ruler to measure the exact distance between the two dots.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/ersa_T_1.png"
                alt="Step 1: Holding paper across nail bed, marking widest point, and measuring with mm ruler"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/ersa_T.png"
                alt="Measuring nail bed sidewall to sidewall with tape"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="border border-line/50 bg-cream/40 p-4 rounded-xs">
              <h3 className="font-serif text-sm font-medium text-ink">1. Wrap &amp; Mark</h3>
              <p className="text-xs text-taupe mt-1.5 leading-relaxed">
                Press a thin strip of paper tightly against the curve of your nail at the widest section. Mark both side edges with a fine pen.
              </p>
            </div>
            <div className="border border-line/50 bg-cream/40 p-4 rounded-xs">
              <h3 className="font-serif text-sm font-medium text-ink">2. Measure in mm</h3>
              <p className="text-xs text-taupe mt-1.5 leading-relaxed">
                Flatten the paper against a millimeter ruler. Measure the distance between marks. Write down the numbers for all 10 fingers.
              </p>
            </div>
            <div className="border border-line/50 bg-cream/40 p-4 rounded-xs">
              <h3 className="font-serif text-sm font-medium text-ink">3. Check Both Hands</h3>
              <p className="text-xs text-taupe mt-1.5 leading-relaxed">
                Dominant hands are often 0.5mm to 1mm larger. Measure both hands to ensure your press-ons seat seamlessly.
              </p>
            </div>
          </div>
        </section>

        {/* ── STEP 2: CHOOSE THE RIGHT SIZE ── */}
        <section className="space-y-6">
          <div className="border-b border-line/60 pb-4">
            <span className="font-serif text-sm italic text-clay">
              Step 02
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mt-1">
              Choose The Right Size
            </h2>
            <p className="mt-2 text-sm md:text-base text-taupe leading-relaxed">
              Compare your millimeter measurements to our standard size chart below. If you fall between two sizes, we always recommend sizing up.
            </p>
          </div>

          {/* Standard Size Chart Graphic */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-widest text-ink font-semibold uppercase">
              Standard Size Chart (Measurements in MM)
            </h3>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/size_choosing_2.webp"
                alt="Ersa Nails Standard Size Chart: XS, S, M, L measurements in mm for Thumb, Index, Middle, Ring, Pinky"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
          </div>

          {/* Short Almond Size Chart Graphic */}
          <div className="space-y-3 pt-6">
            <h3 className="text-xs tracking-widest text-ink font-semibold uppercase">
              Short Almond Size Chart (Special Contour)
            </h3>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/short_almond_size_choosing_2.webp"
                alt="Short Almond Size Chart with special measurements and sizing up recommendation"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
          </div>

          {/* Sizing Rules Card */}
          <div className="rounded-xs border border-clay/30 bg-clay/5 p-6 space-y-2.5 text-xs text-ink/90 leading-relaxed">
            <p className="font-serif text-sm font-medium text-ink">Essential Sizing Rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-taupe">
              <li>Please select the size that fits <strong>MOST</strong> of your fingers.</li>
              <li>Consider <strong>SIZING UP</strong> if you are between two sizes or have <strong>FLATTER</strong> nail beds.</li>
              <li>The <strong>SHORT ALMOND</strong> nail tips are <strong>SLIGHTLY SMALLER</strong> in size compared to other shapes, so we recommend <strong>SIZING UP</strong> for a comfortable fit.</li>
              <li>Nails can be gently contoured using the included emery board file for a 100% bespoke fit.</li>
            </ul>
          </div>
        </section>

        {/* ── STEP 3: NAIL SHAPES & LENGTHS ── */}
        <section className="space-y-6">
          <div className="border-b border-line/60 pb-4">
            <span className="font-serif text-sm italic text-clay">
              Step 03
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mt-1">
              Nail Shapes &amp; Lengths
            </h2>
            <p className="mt-2 text-sm md:text-base text-taupe leading-relaxed">
              Learn about our handcrafted shapes and tip lengths to find the contour that complements your fingers and daily lifestyle.
            </p>
          </div>

          {/* Shapes and Lengths Overview */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-widest text-ink font-semibold uppercase">
              Silhouette &amp; Length Matrix
            </h3>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/nail_shapes_lengths.jpg"
                alt="Nail shapes and lengths: Long Oval, Long Almond, Medium Almond, Short Almond, Long Coffin, Medium Coffin, Short Coffin, Short Squoval"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
          </div>

          {/* Real Hand Photo Guide */}
          <div className="space-y-3 pt-6">
            <h3 className="text-xs tracking-widest text-ink font-semibold uppercase">
              Worn on Natural Hands
            </h3>
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/Ersa_shape_Guide2.jpg"
                alt="Ersa Nails Nail Shape Guide worn on natural model hands showing Long Almond, Medium Almond, Short Almond, Long Oval, Long Coffin, Medium Coffin, Short Coffin"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
          </div>

          {/* Square and Cat Claw Variations */}
          <div className="space-y-3 pt-6">
            <h3 className="text-xs tracking-widest text-ink font-semibold uppercase">
              Square &amp; Cat Claw Lengths
            </h3>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xs border border-line/60 bg-white shadow-xs">
              <Image
                src="/sizing/How_to_find_your_size2_eb64808b-b207-448a-aea2-0db160152d98.webp"
                alt="Square and Cat claw lengths: Long Square, Medium Square, Short Square, Extra Long Square, Short Cat Claw"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <div className="text-center border-t border-line/60 pt-12">
          <h3 className="font-serif text-3xl text-ink">
            Discover Your Next Signature Set
          </h3>
          <p className="text-sm text-taupe mt-2 max-w-md mx-auto font-light">
            Every Liora press-on nail set includes salon gel nails, dual adhesive tabs, professional glue, cuticle stick, and prep pads.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-xs bg-ink px-8 py-3.5 text-xs tracking-[0.2em] font-semibold text-cream uppercase shadow-md transition-colors hover:bg-clay"
            >
              Shop All Nails
            </Link>
            <Link
              href="/contact"
              className="rounded-xs border border-line bg-cream px-8 py-3.5 text-xs tracking-[0.2em] font-medium text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
            >
              Need Help? Ask Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

