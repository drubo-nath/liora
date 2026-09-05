import { listBrandReviews } from "@/db/queries";
import Reveal from "@/components/motion/Reveal";

export default async function Reviews() {
  const reviews = await listBrandReviews();
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <Reveal className="mb-14 text-center md:mb-20">
        <h2 className="headline text-5xl md:text-7xl">
          Loved, <em>loudly</em>
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {reviews.slice(0, 3).map((r, i) => (
          <Reveal key={r.id} delay={i} amount={0.4} className="h-full">
            <figure className="flex h-full flex-col bg-bone p-8 md:p-10">
              <div className="text-sm tracking-[0.2em] text-clay">
                {"★".repeat(r.rating)}
                <span className="text-line">{"★".repeat(5 - r.rating)}</span>
              </div>
              <blockquote className="mt-6 flex-1 font-serif text-xl leading-snug">
                “{r.body}”
              </blockquote>
              <figcaption className="font-serif text-xs italic tracking-wider mt-8 text-taupe">
                {r.authorName} — {r.location}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
