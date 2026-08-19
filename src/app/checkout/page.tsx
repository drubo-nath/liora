"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useCart } from "@/components/cart/CartProvider";
import { getProduct, formatBDT } from "@/data/products";
import Swatch from "@/components/Swatch";
import { EASE } from "@/components/motion/Reveal";

const PAYMENTS = ["Cash on Delivery", "bKash", "Nagad", "Card"];

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState(PAYMENTS[0]);

  const shipping = subtotal >= 2500 || subtotal === 0 ? 0 : 120;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-5 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="eyebrow text-clay">Order Confirmed</p>
          <h1 className="headline mt-5 text-6xl md:text-8xl">
            Dhonnobad<em>.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-taupe">
            Your order is with our Dhaka atelier. We&apos;ll confirm by SMS and
            ship within 24 hours. (This is a demo checkout — no payment was taken.)
          </p>
          <Link
            href="/shop"
            className="eyebrow mt-10 inline-block bg-ink px-10 py-4.5 text-cream transition-colors duration-300 hover:bg-clay-deep"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <p className="eyebrow text-clay">Almost There</p>
      <h1 className="headline mt-4 text-5xl md:text-7xl">
        Check<em>out</em>
      </h1>

      <div className="mt-12 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            setPlaced(true);
          }}
          className="space-y-10"
        >
          <fieldset>
            <legend className="eyebrow text-taupe">Contact</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" placeholder="Ayesha Rahman" required />
              <Field label="Phone" placeholder="01XXXXXXXXX" type="tel" required />
              <Field label="Email (optional)" placeholder="you@email.com" type="email" className="sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow text-taupe">Delivery</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Address" placeholder="House, Road, Area" className="sm:col-span-2" required />
              <Field label="City" placeholder="Dhaka" required />
              <Field label="Postal code" placeholder="1205" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow text-taupe">Payment</legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPayment(p)}
                  className={
                    payment === p
                      ? "eyebrow border border-ink bg-ink px-5 py-4 text-left text-cream transition-colors"
                      : "eyebrow hairline border bg-transparent px-5 py-4 text-left text-taupe transition-colors hover:border-ink hover:text-ink"
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={lines.length === 0}
            className="eyebrow w-full bg-ink py-5 text-cream transition-colors duration-300 hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {lines.length === 0 ? "Your bag is empty" : `Place Order — ${formatBDT(total)}`}
          </button>
        </form>

        {/* Summary */}
        <aside className="hairline h-fit border bg-cream p-6 md:p-8">
          <p className="eyebrow text-taupe">Order Summary</p>
          <ul className="mt-6 space-y-5">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <li key={l.slug} className="flex items-center gap-4">
                  <Swatch tones={p.tones} className="h-16 w-14 shrink-0" variant="thumb" />
                  <div className="flex-1">
                    <p className="font-serif">{p.name}</p>
                    <p className="text-xs text-taupe">Qty {l.qty}</p>
                  </div>
                  <p className="text-sm">{formatBDT(p.price * l.qty)}</p>
                </li>
              );
            })}
            {lines.length === 0 && (
              <li className="text-sm text-taupe">
                Nothing here yet —{" "}
                <Link href="/shop" className="link-sweep text-ink">
                  browse shades
                </Link>
                .
              </li>
            )}
          </ul>
          <div className="hairline mt-6 space-y-2.5 border-t pt-6 text-sm">
            <Row label="Subtotal" value={formatBDT(subtotal)} />
            <Row
              label="Delivery"
              value={shipping === 0 ? "Free" : formatBDT(shipping)}
            />
            <div className="hairline flex items-center justify-between border-t pt-3">
              <p className="eyebrow text-taupe">Total</p>
              <p className="font-serif text-2xl">{formatBDT(total)}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow text-[10px] text-taupe">{label}</span>
      <input
        {...props}
        className="hairline mt-1.5 w-full border bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-taupe/60 focus:border-ink"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-taupe">{label}</p>
      <p>{value}</p>
    </div>
  );
}
