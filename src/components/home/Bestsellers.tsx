import Link from "next/link";
import { listBestsellers } from "@/db/queries";
import BestsellersGrid from "./BestsellersGrid";
import Reveal from "@/components/motion/Reveal";

export default async function Bestsellers() {
  const featured = await listBestsellers();

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
        <Reveal>
          <p className="eyebrow text-clay">Most Loved</p>
          <h2 className="headline mt-4 text-5xl md:text-7xl">
            The <em>bestsellers</em>
          </h2>
        </Reveal>
        <Reveal delay={2} className="hidden md:block">
          <Link href="/shop" className="link-sweep eyebrow pb-1">
            View All Shades →
          </Link>
        </Reveal>
      </div>

      <BestsellersGrid products={featured} />

      <div className="mt-12 text-center md:hidden">
        <Link href="/shop" className="eyebrow inline-block border border-ink px-10 py-4">
          View All Shades
        </Link>
      </div>
    </section>
  );
}
