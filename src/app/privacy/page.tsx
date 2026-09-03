import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | LIORA",
  description:
    "Learn how Liora Pressed Ons protects your personal data, secures online transactions via SSLCOMMERZ/bKash/Nagad, uses cookies, and respects your privacy.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | LIORA",
    description: "Official Privacy Policy for Liora Pressed Ons in Bangladesh.",
    url: "https://www.liorapressedons.com/privacy",
  },
};

const SECTIONS = [
  {
    num: "01",
    title: "Information We Collect",
    content: (
      <p>
        When you purchase something from our store, as part of the buying and selling process, we
        collect the personal information you give us such as your name, address, phone number, and
        email address.
      </p>
    ),
  },
  {
    num: "02",
    title: "How We Use Your Data",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>To process and deliver your handcrafted orders.</li>
        <li>To send you shipping updates, courier tracking links, and order confirmations via SMS.</li>
        <li>To communicate marketing promotions (only if you have explicitly opted in).</li>
      </ul>
    ),
  },
  {
    num: "03",
    title: "Payment Security",
    content: (
      <p>
        We use trusted third-party payment gateways (like SSLCOMMERZ, bKash, Nagad) to process
        transactions. We do not store your credit card numbers, debit credentials, or PIN details on
        our servers. All transactions are encrypted according to industry banking standards.
      </p>
    ),
  },
  {
    num: "04",
    title: "Cookies",
    content: (
      <p>
        Our website uses cookies to maintain your shopping cart, remember your login details across
        visits, and provide a seamless, personalized shopping experience.
      </p>
    ),
  },
  {
    num: "05",
    title: "Data Sharing",
    content: (
      <p>
        We do not sell or rent your personal information to third parties. We only share necessary
        delivery details (Name, Phone number, and Delivery Address) with our courier partners (e.g.,
        Steadfast, RedX, Pathao) strictly for parcel delivery and courier tracking purposes.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <Reveal>
          <p className="eyebrow text-clay">Privacy &amp; Data Protection</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="headline mt-4 text-5xl md:text-7xl">
            Privacy <em>Policy</em>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-6 text-base md:text-lg text-taupe leading-relaxed">
            Liora Pressed Ons respects your privacy and is committed to protecting your personal
            data across every digital interaction.
          </p>
        </Reveal>
      </header>

      {/* Main Content */}
      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
        <div className="space-y-12">
          {SECTIONS.map((sec, idx) => (
            <Reveal key={sec.num} delay={idx * 0.5}>
              <article className="border-t border-line pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-serif text-sm italic text-clay">{sec.num}</span>
                  <h2 className="headline text-2xl md:text-3xl text-ink">{sec.title}</h2>
                </div>
                <div className="text-[15px] leading-relaxed text-taupe pl-8 md:pl-9">
                  {sec.content}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="border border-line bg-cream p-6 text-xs text-taupe leading-relaxed">
              <p className="font-medium text-ink mb-1">Data Privacy Questions?</p>
              If you have any questions or wish to request data updates, please contact us at{" "}
              <a href="mailto:liorapressedons@gmail.com" className="text-clay underline">
                liorapressedons@gmail.com
              </a>{" "}
              or via WhatsApp at +880 1991 166660.
              or via WhatsApp at{" "}
              <a href="https://wa.me/8801577759518" className="text-clay underline">
                +8801577-759518
              </a>
              .
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-28">
          <div className="border border-line bg-cream p-6">
            <p className="eyebrow text-clay mb-3">Policy Directory</p>
            <ul className="space-y-2 text-sm text-taupe">
              <li>
                <span className="text-ink font-medium">• Privacy Policy</span>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-ink hover:underline">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-ink hover:underline">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ink hover:underline">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

