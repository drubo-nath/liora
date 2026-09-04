import { asc, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { resolveImageUrl } from "@/lib/storage";
import ProductsTable, { type AdminProductRow } from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  const rows = await db
    .select({
      id: schema.products.id,
      slug: schema.products.slug,
      name: schema.products.name,
      finish: schema.products.finish,
      badge: schema.products.badge,
      price: schema.products.price,
      isActive: schema.products.isActive,
      imageUrl: schema.products.imageUrl,
      imageCount: sql<number>`(
        select count(*) from ${schema.productImages}
        where ${schema.productImages.productId} = ${schema.products.id}
      )`,
    })
    .from(schema.products)
    .orderBy(asc(schema.products.sortOrder), asc(schema.products.id));

  // Thumbnails need viewable URLs — resolve raw keys to presigned/local URLs.
  const coversList = await Promise.all(
    rows.map(async (r) => ({
      id: r.id,
      url: r.imageUrl ? await resolveImageUrl(r.imageUrl) : null,
    })),
  );
  
  const coversObj: Record<number, string | null> = {};
  for (const c of coversList) {
    coversObj[c.id] = c.url;
  }

  const products: AdminProductRow[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    finish: r.finish,
    badge: r.badge,
    price: r.price,
    isActive: r.isActive,
    imageUrl: r.imageUrl,
    imageCount: Number(r.imageCount),
  }));

  return <ProductsTable initialProducts={products} covers={coversObj} />;
}
