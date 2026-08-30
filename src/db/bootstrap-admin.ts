import { eq } from "drizzle-orm";
import { db, schema, isDbConfigured } from "./index";

/**
 * Bootstrap (or update) the admin account.
 * Auth is OTP-only — set ADMIN_PHONE in .env.local, run `pnpm db:admin`,
 * then sign in at /login with that number's OTP.
 */
function normalize(phone: string): string | null {
  let d = phone.replace(/[\s\-()]/g, "").trim();
  if (d.startsWith("+")) d = d.slice(1);
  if (d.startsWith("880")) d = "0" + d.slice(3);
  return /^01[3-9]\d{8}$/.test(d) ? `+880${d.slice(1)}` : null;
}

async function bootstrapAdmin() {
  if (!isDbConfigured) {
    console.error("✖ DATABASE_URL is not set.");
    process.exit(1);
  }

  const phone = normalize(process.env.ADMIN_PHONE ?? "");
  if (!phone) {
    console.error("✖ Set ADMIN_PHONE (01XXXXXXXXX) in .env.local first.");
    process.exit(1);
  }

  const existing = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.phoneNumber, phone))
    .limit(1);

  if (existing[0]) {
    await db
      .update(schema.user)
      .set({ role: "admin", phoneNumberVerified: true })
      .where(eq(schema.user.id, existing[0].id));
    console.log("• Existing user promoted to admin");
  } else {
    await db.insert(schema.user).values({
      id: crypto.randomUUID(),
      name: "Liora Admin",
      email: `${phone.replace("+", "")}@admin.liora.bd`,
      emailVerified: true,
      phoneNumber: phone,
      phoneNumberVerified: true,
      role: "admin",
    });
    console.log("• Admin user created");
  }

  console.log(`✓ Admin ready — sign in at /login with ${phone} (OTP)`);
  process.exit(0);
}

bootstrapAdmin().catch((e) => {
  console.error("Admin bootstrap failed:", e);
  process.exit(1);
});
