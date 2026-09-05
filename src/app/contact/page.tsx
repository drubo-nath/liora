import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact Us | LIORA Pressed Ons",
  description:
    "Get in touch with the Liora team for nail sizing assistance, live order tracking, custom bespoke press-on designs, and customer care across Bangladesh.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | LIORA Pressed Ons",
    description:
      "We love hearing from our customers! Reach us via WhatsApp (+8801577-759518), email, or Facebook for sizing, orders, and custom designs.",
    url: "https://www.liorapressedons.com/contact",
  },
};

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Liora Pressed Ons",
  url: "https://www.liorapressedons.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "LIORA Pressed Ons",
    url: "https://www.liorapressedons.com",
    email: "liorapressedons@gmail.com",
    telephone: "+8801577759518",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+8801577759518",
        contactType: "customer support",
        contactOption: "TollFree",
        areaServed: "BD",
        availableLanguage: ["en", "bn"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "10:00",
          closes: "20:00",
        },
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }}
      />

      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-24">
        {/* Header */}
        <header className="max-w-3xl">
          <Reveal>
            <h1 className="headline text-5xl md:text-7xl">
              Contact <em>Us</em>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-base md:text-lg text-taupe leading-relaxed">
              We love hearing from our customers! Whether you need help with sizing, tracking an
              order, or custom designs, the Liora Pressed Ons team is here for you.
            </p>
          </Reveal>
        </header>

        {/* Contact Channels Grid */}
        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {/* WhatsApp */}
          <Reveal delay={1} className="h-full">
            <div className="h-full bg-cream p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="headline text-2xl md:text-3xl text-ink">WhatsApp</h2>
                <p className="mt-3 text-sm text-taupe leading-relaxed">
                  Fastest response for sizing advice, urgent address changes, and custom design
                  photos.
                </p>
                <p className="mt-6 font-serif text-xl text-ink">+8801577-759518</p>
              </div>
              <div className="mt-8">
                <a
                  href="https://wa.me/8801577759518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full border border-ink bg-ink py-3.5 text-center text-xs tracking-wider uppercase text-cream transition-colors duration-300 hover:bg-clay-deep hover:border-clay-deep"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Email */}
          <Reveal delay={2} className="h-full">
            <div className="h-full bg-cream p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="headline text-2xl md:text-3xl text-ink">Email Support</h2>
                <p className="mt-3 text-sm text-taupe leading-relaxed">
                  For order inquiries, corporate orders, press partnerships, and formal feedback.
                </p>
                <p className="mt-6 font-serif text-lg text-ink break-all">
                  liorapressedons@gmail.com
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:liorapressedons@gmail.com"
                  className="inline-block w-full border border-line bg-cream py-3.5 text-center text-xs tracking-wider uppercase text-ink transition-colors duration-300 hover:border-ink hover:bg-bone"
                >
                  Send an Email
                </a>
              </div>
            </div>
          </Reveal>

          {/* Facebook */}
          <Reveal delay={3} className="h-full">
            <div className="h-full bg-cream p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="headline text-2xl md:text-3xl text-ink">Facebook</h2>
                <p className="mt-3 text-sm text-taupe leading-relaxed">
                  Join our official beauty community, view new drops, customer tagged photos, and
                  message our inbox.
                </p>
                <p className="mt-6 font-serif text-xl text-ink">Liora Pressed Ons</p>
              </div>
              <div className="mt-8">
                <a
                  href="https://facebook.com/liorapressedons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full border border-line bg-cream py-3.5 text-center text-xs tracking-wider uppercase text-ink transition-colors duration-300 hover:border-ink hover:bg-bone"
                >
                  Visit Facebook Page
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Business Hours & Quick Assistance Split */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Business Hours */}
          <Reveal>
            <div className="border border-line bg-cream p-8 md:p-12">
              <h2 className="headline text-3xl md:text-4xl">
                Business <em>Hours</em>
              </h2>
              <p className="mt-4 text-sm text-taupe leading-relaxed">
                Our support team is available to assist you during the following hours:
              </p>

              <div className="mt-8 space-y-4 border-t border-line pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink font-medium">Saturday to Thursday</span>
                  <span className="font-serif text-base text-ink">10:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-taupe">Timezone</span>
                  <span className="text-taupe">Bangladesh Standard Time (BST)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink font-medium">Friday</span>
                  <span className="font-serif text-sm italic text-clay">Closed (Family &amp; Atelier Rest)</span>
                </div>
              </div>

              <p className="mt-8 text-xs text-taupe leading-relaxed border-t border-line pt-6">
                Messages received outside business hours or on Fridays will be promptly attended to
                the following business morning.
              </p>
            </div>
          </Reveal>

          {/* Quick Help Guide */}
          <Reveal delay={1}>
            <div className="border border-line bg-sand/30 p-8 md:p-12 space-y-6">
              <div>
                <h3 className="headline text-2xl md:text-3xl">Looking for quick answers?</h3>
                <p className="mt-3 text-sm text-taupe leading-relaxed">
                  Many common questions about sizing, delivery times, and returns can be resolved
                  instantly through our dedicated guides.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <Link
                  href="/faq#sizing"
                  className="block rounded-sm border border-line bg-cream p-4 transition-all hover:border-ink hover:bg-bone"
                >
                  <p className="font-medium text-ink text-sm">Sizing &amp; Measurement Guide →</p>
                  <p className="mt-1 text-xs text-taupe">
                    Learn how to measure your natural nails with tape and ruler for a perfect fit.
                  </p>
                </Link>

                <Link
                  href="/shipping"
                  className="block rounded-sm border border-line bg-cream p-4 transition-all hover:border-ink hover:bg-bone"
                >
                  <p className="font-medium text-ink text-sm">Shipping Rates &amp; Timelines →</p>
                  <p className="mt-1 text-xs text-taupe">
                    Dhaka 70 BDT, Suburbs 100 BDT, and Nationwide 130 BDT details and tracking.
                  </p>
                </Link>

                <Link
                  href="/returns"
                  className="block rounded-sm border border-line bg-cream p-4 transition-all hover:border-ink hover:bg-bone"
                >
                  <p className="font-medium text-ink text-sm">Return &amp; Refund Policy →</p>
                  <p className="mt-1 text-xs text-taupe">
                    Guidelines for unboxing video proof, 24-hour claims, and bKash/Nagad refunds.
                  </p>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

