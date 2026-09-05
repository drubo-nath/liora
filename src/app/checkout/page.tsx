"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/components/cart/CartProvider";
import { placeOrder, type OrderResult } from "@/lib/actions/orders";
import {
  formatBDT,
  shippingFeeFor,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/format";
import { formatPhone } from "@/lib/phone";
import Swatch from "@/components/Swatch";
import PhoneVerify from "@/components/auth/PhoneVerify";
import { EASE } from "@/components/motion/Reveal";
import { trackPurchase } from "@/lib/analytics";
import { finishDisplayLabels, type Finish } from "@/db/types";

const PAYMENTS = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "card", label: "Card" },
] as const;

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const { data: session, isPending } = authClient.useSession();
  const [placed, setPlaced] = useState<OrderResult | null>(null);
  const [payment, setPayment] = useState<(typeof PAYMENTS)[number]["id"]>("cod");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const verified = Boolean(session?.user.phoneNumberVerified);
  const shipping = shippingFeeFor(subtotal);
  const total = subtotal + shipping;

  if (placed?.ok) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-5 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="w-full max-w-md"
        >
          <h1 className="headline text-6xl md:text-8xl">
            Dhonnobad<em>.</em>
          </h1>
          <p className="font-serif text-sm tracking-wider mt-6 text-taupe">
            Order {placed.orderNumber} · {formatBDT(placed.total)}
          </p>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-taupe">
            Your order is with our Dhaka atelier. We&apos;ll confirm by SMS and
            ship within 24 hours.
          </p>
          <Link
            href="/shop"
            className="font-serif text-xs uppercase tracking-widest mt-10 inline-block bg-ink px-10 py-4.5 text-cream transition-colors duration-300 hover:bg-clay-deep"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 md:px-10 md:py-20">
      <h1 className="headline text-4xl sm:text-5xl md:text-7xl">
        Check<em>out</em>
      </h1>

      <div className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="order-2 space-y-8 md:space-y-10 lg:order-1">
          {/* Step 1 — phone verification */}
          {!isPending && !verified && <PhoneVerify />}
          {!isPending && verified && (
            <div className="hairline border bg-cream p-5 sm:p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-taupe">Verified number</p>
              <p className="mt-2 font-serif text-xl">
                {formatPhone(session?.user.phoneNumber)}
              </p>
              <p className="mt-1 text-xs text-taupe">
                Signed in — orders are tied to this number.
              </p>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              if (!verified) {
                setError("Verify your phone number first.");
                return;
              }
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                const res = await placeOrder({
                  name: String(fd.get("name") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  address: String(fd.get("address") ?? ""),
                  city: String(fd.get("city") ?? ""),
                  postalCode: String(fd.get("postalCode") ?? ""),
                  paymentMethod: payment,
                  items: lines.map((l) => ({
                    slug: l.slug,
                    size: l.size as "XS" | "S" | "M" | "L",
                    qty: l.qty,
                  })),
                });

                if (res.ok) {
                  trackPurchase({
                    orderId: res.orderNumber,
                    total: res.total,
                    itemsCount: lines.reduce((acc, l) => acc + l.qty, 0),
                  });
                  clear();
                } else setError(res.error);
                setPlaced(res);
              });
            }}
            className="space-y-8 sm:space-y-10"
          >
            <fieldset disabled={!verified} className="disabled:opacity-50">
              <legend className="text-xs uppercase tracking-widest text-taupe font-medium">Delivery</legend>
              <div className="mt-4 grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                <Field
                  label="Full name"
                  name="name"
                  placeholder={session?.user.name || "Ayesha Rahman"}
                  defaultValue={session?.user.name !== "Guest" ? session?.user.name : ""}
                  required
                />
                <Field
                  label="Email (optional)"
                  name="email"
                  placeholder="you@email.com"
                  type="email"
                />
                <Field
                  label="Address"
                  name="address"
                  placeholder="House, Road, Area"
                  className="sm:col-span-2"
                  required
                />
                <Field label="City" name="city" placeholder="Dhaka" required />
                <Field label="Postal code" name="postalCode" placeholder="1205" />
              </div>
            </fieldset>

            <fieldset disabled={!verified} className="disabled:opacity-50">
              <legend className="text-xs uppercase tracking-widest text-taupe font-medium">Payment</legend>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {PAYMENTS.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPayment(p.id)}
                    className={
                      payment === p.id
                        ? "text-xs uppercase tracking-wider font-medium border border-ink bg-ink px-4 py-3.5 text-left text-cream transition-colors sm:px-5 sm:py-4"
                        : "text-xs uppercase tracking-wider font-medium hairline border bg-transparent px-4 py-3.5 text-left text-taupe transition-colors hover:border-ink hover:text-ink sm:px-5 sm:py-4"
                    }
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {error && (
              <p className="border border-clay/40 bg-clay/5 px-4 py-3 text-sm text-clay-deep">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending || lines.length === 0 || !verified}
              className="w-full bg-ink px-4 py-4.5 text-center text-xs tracking-wider uppercase text-cream transition-colors duration-300 hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-40 sm:py-5 sm:text-sm font-medium"
            >
              {pending
                ? "Placing order…"
                : lines.length === 0
                  ? "Your bag is empty"
                  : !verified
                    ? "Verify your number to continue"
                    : `Place Order — ${formatBDT(total)}`}
            </button>
          </form>
        </div>

        {/* Summary */}
        <aside className="hairline order-1 h-fit border bg-cream p-5 sm:p-6 md:p-8 lg:order-2 lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-widest text-taupe font-medium">Order Summary</p>
          <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="flex items-center gap-3.5 sm:gap-4">
                <Swatch
                  tones={l.tones}
                  imageUrl={l.imageUrl}
                  className="h-14 w-12 shrink-0 sm:h-16 sm:w-14"
                  variant="thumb"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-sm sm:text-base">{l.name}</p>
                  <p className="text-xs text-taupe">
                    {(l.finish && finishDisplayLabels[l.finish as Finish]) || l.finish} · {l.size} · Qty {l.qty}
                  </p>
                </div>
                <p className="text-xs shrink-0 font-medium sm:text-sm">{formatBDT(l.price * l.qty)}</p>
              </li>
            ))}
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
            <Row label="Delivery" value={shipping === 0 ? "Free" : formatBDT(shipping)} />
            {shipping > 0 && subtotal > 0 && (
              <p className="text-xs text-taupe">
                Add {formatBDT(FREE_SHIPPING_THRESHOLD - subtotal)} more for free delivery
              </p>
            )}
            <div className="hairline flex items-center justify-between border-t pt-3">
              <p className="text-xs uppercase tracking-widest text-taupe font-medium">Total</p>
              <p className="font-serif text-xl sm:text-2xl">{formatBDT(total)}</p>
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
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-taupe font-medium">{label}</span>
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
