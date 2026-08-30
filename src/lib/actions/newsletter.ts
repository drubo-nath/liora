"use server";

import { db, isDbConfigured, schema } from "@/db";
import { subscribeSchema } from "@/lib/validations";

export type SubscribeResult =
  | { ok: true; already: boolean }
  | { ok: false; error: string };

export async function subscribe(email: string): Promise<SubscribeResult> {
  if (!isDbConfigured) {
    return {
      ok: false,
      error: "Database is not configured yet. Add DATABASE_URL to .env.local.",
    };
  }

  const parsed = subscribeSchema.safeParse({ email });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  try {
    const inserted = await db
      .insert(schema.newsletterSubscribers)
      .values({ email: parsed.data.email })
      .onConflictDoNothing({ target: schema.newsletterSubscribers.email })
      .returning({ id: schema.newsletterSubscribers.id });

    return { ok: true, already: inserted.length === 0 };
  } catch (e) {
    console.error("[newsletter] subscribe failed:", e);
    return { ok: false, error: "Could not subscribe right now. Try again." };
  }
}
