import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Collection",
    links: [
      { label: "All Press-Ons", href: "/shop" },
      { label: "Exclusive", href: "/shop?finish=Exclusive" },
      { label: "Classic (Single Colours)", href: "/shop?finish=Classic" },
      { label: "Signature", href: "/shop?finish=Signature" },
      { label: "New Arrivals", href: "/shop?sort=new" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Return Policy", href: "/returns" },
      { label: "How to Find Your Size", href: "/sizing" },
    ],
  },
  {
    title: "The Atelier",
    links: [
      { label: "About Liora", href: "/about" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0b0a] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-8 md:px-12 md:py-20">
        {/* ── Main Footer Grid (Brand + 3 Columns) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 md:gap-12 lg:gap-14 items-start">
          {/* Brand Manifesto & Concierge */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1 max-w-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/liora.svg"
                alt="Liora"
                width={180}
                height={60}
                className="h-9 md:h-10 w-auto brightness-0 invert opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>

            <p className="text-xs md:text-sm leading-relaxed text-white/70 font-light pt-1">
              Salon-sculpted, handcrafted press-on nails crafted for Bangladesh&rsquo;s most refined hands. Damage-free, reusable for months, and ready in ten minutes.
            </p>

            {/* Direct Brand WhatsApp & Email */}
            <div className="space-y-1.5 pt-2 text-xs text-white/80">
              <p className="flex items-center gap-2">
                <span className="text-clay font-medium">WhatsApp:</span>
                <a
                  href="https://wa.me/8801577759518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  +880 1577-759518
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-clay font-medium">Email:</span>
                <a
                  href="mailto:liorapressedons@gmail.com"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  liorapressedons@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Nav Link Columns */}
          {COLS.map((col) => (
            <div key={col.title} className="space-y-3.5">
              <p className="eyebrow text-xs tracking-[0.2em] uppercase font-semibold text-white/90">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-xs text-white/65 hover:text-white transition-colors duration-200 inline-block py-0.5"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Sub-Footer Bottom Bar ── */}
        <div className="mt-14 md:mt-18 border-t border-white/10 pt-8 flex flex-col items-start justify-between gap-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Liora Pressed Ons. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3.5 text-xs text-white/60">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/shipping" className="hover:text-white transition-colors">
              Shipping
            </Link>
            <span>·</span>
            <Link href="/returns" className="hover:text-white transition-colors">
              Returns
            </Link>
            <span>·</span>
            <Link href="/sizing" className="hover:text-white transition-colors">
              Sizing Guide
            </Link>
            <span>·</span>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-white/60">
            <span>🇧🇩 Bangladesh · BDT (৳)</span>
            <span className="text-white/20">|</span>
            <span className="eyebrow text-[10px] text-white/40">bKash · Nagad · COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
