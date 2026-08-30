"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { normalizeBDPhone } from "@/lib/phone";
import { EASE } from "@/components/motion/Reveal";

/**
 * Inline phone verification for checkout — sends an OTP via BDSMS and
 * signs the shopper in on success. Hidden once a session exists.
 */
export default function PhoneVerify() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async () => {
    setError(null);
    const normalized = normalizeBDPhone(phone);
    if (!normalized) {
      setError("Enter a valid Bangladeshi mobile number");
      return;
    }
    setBusy(true);
    const res = await authClient.phoneNumber.sendOtp({ phoneNumber: normalized });
    setBusy(false);
    if (res.error) {
      setError(res.error.message ?? "Could not send the code.");
      return;
    }
    setStep("code");
  };

  const verify = async () => {
    setError(null);
    const normalized = normalizeBDPhone(phone);
    if (!normalized) return;
    setBusy(true);
    const res = await authClient.phoneNumber.verify({
      phoneNumber: normalized,
      code: code.trim(),
    });
    setBusy(false);
    if (res.error) {
      setError(res.error.message ?? "That code didn't match.");
      return;
    }
    // Session cookie is set — refresh so the server sees it.
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="hairline border bg-cream p-6 md:p-8"
    >
      <p className="eyebrow text-clay">Step 1 — Verify your number</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-taupe">
        Orders are tied to your mobile number. We&apos;ll text you a one-time
        code — no password needed.
      </p>
      
      <AnimatePresence mode="wait">
        {step === "phone" ? (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-5 flex gap-2"
          >
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              inputMode="tel"
              autoComplete="tel"
              className="hairline min-w-0 flex-1 border bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-taupe/60 focus:border-ink"
            />
            <button
              onClick={sendOtp}
              disabled={busy}
              className="eyebrow shrink-0 bg-ink px-6 text-cream transition-colors hover:bg-clay-deep disabled:opacity-50"
            >
              {busy ? "Sending…" : "Send Code"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-5 space-y-4"
          >
            <p className="text-sm text-taupe">
              Sent to {phone}.{" "}
              <button onClick={() => setStep("phone")} className="link-sweep">
                Change
              </button>
            </p>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="······"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="hairline w-40 border bg-transparent px-4 py-3.5 text-center font-serif text-xl tracking-[0.4em] outline-none focus:border-ink"
              />
              <button
                onClick={verify}
                disabled={busy || code.length !== 6}
                className="eyebrow flex-1 bg-ink px-6 py-3.5 text-cream transition-colors hover:bg-clay-deep disabled:opacity-50"
              >
                {busy ? "Verifying…" : "Verify & Continue"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-3 text-xs text-clay-deep">{error}</p>}
    </motion.div>
  );
}
