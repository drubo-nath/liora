"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { normalizeBDPhone } from "@/lib/phone";
import { EASE } from "@/components/motion/Reveal";

/**
 * OTP-only sign-in: enter your mobile number, receive a one-time code via
 * BDSMS, verify, and you're in. New numbers are registered automatically.
 */
export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/";

  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalized = normalizeBDPhone(phone);
  const fail = (m?: string) => setError(m ?? "Something went wrong. Try again.");

  const sendOtp = async () => {
    setError(null);
    if (!normalized) return fail("Enter a valid Bangladeshi mobile number");
    setBusy(true);
    const res = await authClient.phoneNumber.sendOtp({ phoneNumber: normalized });
    setBusy(false);
    if (res.error) return fail(res.error.message);
    setStep("code");
  };

  const verify = async () => {
    setError(null);
    if (!normalized) return;
    setBusy(true);
    const res = await authClient.phoneNumber.verify({
      phoneNumber: normalized,
      code: code.trim(),
    });
    setBusy(false);
    if (res.error) return fail(res.error.message);
    router.push(next);
    router.refresh();
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {step === "phone" ? (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="space-y-4"
          >
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              inputMode="tel"
              autoComplete="tel"
              onKeyDown={(e) => e.key === "Enter" && sendOtp()}
              className="hairline w-full border bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-taupe/60 focus:border-ink"
            />
            <button
              onClick={sendOtp}
              disabled={busy}
              className="eyebrow w-full bg-ink py-4 text-cream transition-colors hover:bg-clay-deep disabled:opacity-50"
            >
              {busy ? "Sending…" : "Send Code"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="space-y-4"
          >
            <p className="text-sm text-taupe">
              Code sent to {phone}.{" "}
              <button onClick={() => setStep("phone")} className="link-sweep">
                Change number
              </button>
            </p>
            <input
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="······"
              inputMode="numeric"
              autoComplete="one-time-code"
              onKeyDown={(e) => e.key === "Enter" && verify()}
              className="hairline w-full border bg-transparent px-4 py-3.5 text-center font-serif text-xl tracking-[0.4em] outline-none focus:border-ink"
            />
            <button
              onClick={verify}
              disabled={busy || code.length !== 6}
              className="eyebrow w-full bg-ink py-4 text-cream transition-colors hover:bg-clay-deep disabled:opacity-50"
            >
              {busy ? "Verifying…" : "Verify & Sign In"}
            </button>
            <button
              onClick={sendOtp}
              disabled={busy}
              className="link-sweep text-xs text-taupe"
            >
              Resend code
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-4 text-xs text-clay-deep">{error}</p>}

      <p className="hairline mt-10 border-t pt-6 text-xs leading-relaxed text-taupe">
        First order? You don&apos;t even need to sign in here —{" "}
        <Link href="/shop" className="link-sweep text-ink">
          pick a shade
        </Link>{" "}
        and verify your number at checkout.
      </p>
    </div>
  );
}
