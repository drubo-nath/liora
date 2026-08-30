"use client";

import { useState, useTransition } from "react";
import { subscribe } from "@/lib/actions/newsletter";
import Reveal from "@/components/motion/Reveal";

export default function Newsletter() {
  const [state, setState] = useState<"idle" | "done" | "already">("idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <section className="hairline border-t bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 text-center md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow text-clay">The Inner Circle</p>
          <h2 className="headline mx-auto mt-4 max-w-2xl text-4xl md:text-6xl">
            First access to <em>new shades</em>
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-taupe">
            One letter a month. Early drops, private offers, nothing else.
          </p>
        </Reveal>

        <Reveal delay={1}>
          {state !== "idle" ? (
            <p className="eyebrow mx-auto mt-10 border border-line bg-bone px-8 py-4 text-clay">
              {state === "already"
                ? "You're already in the inner circle ✦"
                : "Welcome to the inner circle ✦"}
            </p>
          ) : (
            <>
              <form
                className="mx-auto mt-10 flex max-w-md border border-ink"
                onSubmit={(e) => {
                  e.preventDefault();
                  setError(null);
                  const email = new FormData(e.currentTarget).get("email") as string;
                  startTransition(async () => {
                    const res = await subscribe(email);
                    if (res.ok) setState(res.already ? "already" : "done");
                    else setError(res.error);
                  });
                }}
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-taupe"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="eyebrow shrink-0 bg-ink px-6 text-cream transition-colors duration-300 hover:bg-clay-deep disabled:opacity-50"
                >
                  {pending ? "Joining…" : "Join"}
                </button>
              </form>
              {error && <p className="mt-3 text-xs text-clay">{error}</p>}
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
