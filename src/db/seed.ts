import { db, isDbConfigured, schema } from "./index";
import { productSeeds, reviewSeeds, contentSeeds } from "./seed-data";

/**
 * Idempotent seed: wipes catalog/content tables and re-inserts.
 * Safe to re-run in development. NOT for production use.
 */
async function seed() {
  if (!isDbConfigured) {
    console.error("✖ DATABASE_URL is not set. Add it to .env.local first.");
    process.exit(1);
  }

  console.log("Seeding Liora…");

  await db.transaction(async (tx) => {
    // Order matters: children before parents.
    await tx.delete(schema.orderItems);
    await tx.delete(schema.orders);
    await tx.delete(schema.reviews);
    await tx.delete(schema.products);
    await tx.delete(schema.siteContent);
    await tx.delete(schema.newsletterSubscribers);

    await tx.insert(schema.products).values(productSeeds);
    await tx.insert(schema.reviews).values(reviewSeeds);
    await tx.insert(schema.siteContent).values(contentSeeds);
  });

  console.log(
    `✓ Seeded ${productSeeds.length} products, ${reviewSeeds.length} reviews, ${contentSeeds.length} content keys.`,
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
