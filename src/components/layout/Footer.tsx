import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Shop",
    links: [
      { label: "All Shades", href: "/shop" },
      { label: "Creme", href: "/shop?finish=Creme" },
      { label: "Glazed", href: "/shop?finish=Glazed" },
      { label: "Shimmer", href: "/shop?finish=Shimmer" },
    ],
  },
  {
    title: "House",
    links: [
      { label: "The Atelier", href: "/about" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "Care",
    links: [
      { label: "Application Guide", href: "/about#ritual" },
      { label: "Delivery & Returns", href: "/about#promise" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hairline border-t bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/liora.svg" alt="Liora" width={100} height={10} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-taupe">
              Premium press-on nails. Curated for Bangladesh&rsquo;s most refined hands.
              Damage-free, reusable, and made to move with your life.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-taupe">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-sweep text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hairline mt-16 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs text-taupe md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Liora. All rights reserved.</p>
          <p className="eyebrow text-[10px]">bKash · Nagad · Cards · Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
