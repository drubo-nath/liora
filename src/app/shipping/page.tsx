import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Shipping & Delivery | LIORA",
  description:
    "Learn about Liora's handmade creation timelines, delivery rates across Dhaka (70 BDT), suburbs (100 BDT), and nationwide Bangladesh (130 BDT), courier partners, and tracking.",
  alternates: {
    canonical: "/shipping",
  },
  openGraph: {
    title: "Shipping & Delivery | LIORA",
    description:
      "Handmade to order in Dhaka. Reliable nationwide courier delivery via Steadfast, RedX, and Pathao with live SMS tracking.",
    url: "https://www.liorapressedons.com/shipping",
  },
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <Reveal>
          <p className="eyebrow text-clay">Logistics &amp; Dispatch</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="headline mt-4 text-5xl md:text-7xl">
            Shipping &amp; <em>Delivery</em>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-6 text-base md:text-lg text-taupe leading-relaxed">
            At Liora Pressed Ons, we strive to deliver your beautiful handcrafted nail sets safely,
            securely, and as quickly as possible across all of Bangladesh.
          </p>
        </Reveal>
      </header>

      {/* Delivery Rates Grid */}
      <section className="mt-16">
        <Reveal>
          <div className="border-b border-line pb-4 mb-8">
            <h2 className="headline text-3xl">Delivery Rates</h2>
            <p className="text-sm text-taupe mt-1">Transparent flat-rate courier shipping across Bangladesh</p>
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {[
            {
              region: "Inside Dhaka",
              charge: "70 BDT",
              time: "1 to 3 business days",
              desc: "Covering all central Dhaka metropolitan delivery zones.",
            },
            {
              region: "Dhaka Suburbs",
              charge: "100 BDT",
              time: "2 to 3 business days",
              desc: "Covering sub-areas including Savar, Keraniganj, Gazipur, and Narayanganj.",
            },
            {
              region: "Outside Dhaka",
              charge: "130 BDT",
              time: "3 to 5 business days",
              desc: "Nationwide express delivery covering all remaining 63 districts.",
            },
          ].map((tier, idx) => (
            <Reveal key={tier.region} delay={idx} className="h-full">
              <div className="h-full bg-cream p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="eyebrow text-clay">Tier 0{idx + 1}</span>
                  <h3 className="font-serif text-2xl mt-2 text-ink">{tier.region}</h3>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-serif text-4xl text-ink font-light">{tier.charge}</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-clay-deep font-medium">
                    Transit: {tier.time}
                  </p>
                  <p className="mt-4 text-sm text-taupe leading-relaxed">{tier.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline & Processing Notice */}
      <section className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <Reveal>
          <div className="border border-line bg-cream p-8 md:p-12">
            <span className="eyebrow text-clay">Artisan Creation</span>
            <h2 className="headline mt-3 text-3xl md:text-4xl">
              Handmade <em>to Order</em>
            </h2>
            <p className="mt-5 text-sm md:text-base text-taupe leading-relaxed">
              Because every Liora set is individually handcrafted by our artisan nail team in Dhaka,
              please allow a <strong>processing/creation time of 2 to 4 days</strong> before your order
              is handed over to the courier.
            </p>
            <div className="mt-8 border-t border-line pt-6 text-sm text-taupe space-y-3">
              <p>
                <strong className="text-ink">Transit times begin after dispatch:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Inside Dhaka: 1 to 3 business days (after dispatch)</li>
                <li>Outside Dhaka: 3 to 5 business days (after dispatch)</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={1}>
            <div className="border border-line bg-sand/30 p-8">
              <span className="eyebrow text-clay">Trusted Partners</span>
              <h3 className="headline mt-2 text-2xl">Courier Partners &amp; SMS Tracking</h3>
              <p className="mt-4 text-sm text-taupe leading-relaxed">
                We partner with dependable logistics leaders in Bangladesh including{" "}
                <strong className="text-ink">Steadfast, RedX, and Pathao</strong> to ensure prompt,
                damage-free delivery directly to your door.
              </p>
              <div className="mt-4 rounded-sm bg-cream/80 p-4 border border-line text-xs text-taupe">
                <p className="font-medium text-ink mb-1">Live SMS Notification</p>
                You will automatically receive an SMS with your personal tracking link as soon as your
                package is picked up by the courier rider.
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="border border-line bg-cream p-8">
              <span className="eyebrow text-clay">Order Support</span>
              <h3 className="headline mt-2 text-2xl">Order Tracking &amp; Delays</h3>
              <p className="mt-4 text-sm text-taupe leading-relaxed">
                If your parcel is delayed beyond the estimated timeline or you need assistance with
                the rider, please reach out to our customer care team with your{" "}
                <strong className="text-ink">Order ID</strong> and we will promptly escalate the issue
                with our delivery partners.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/8801577759518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-ink bg-ink px-6 py-3 text-xs uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-clay-deep hover:border-clay-deep"
                >
                  WhatsApp Support
                </a>
                <Link
                  href="/returns"
                  className="border border-line px-6 py-3 text-xs uppercase tracking-wider text-ink transition-colors duration-300 hover:border-ink hover:bg-bone"
                >
                  Return Policy
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

