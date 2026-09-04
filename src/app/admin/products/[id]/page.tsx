import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { resolveImageUrl } from "@/lib/storage";
import { normalizeFinish } from "@/db/types";
import ProductForm, {
  type ProductFormValues,
} from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const [row] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, productId))
    .limit(1);
  if (!row) notFound();

  const imageRows = await db
    .select({ id: schema.productImages.id, url: schema.productImages.url })
    .from(schema.productImages)
    .where(eq(schema.productImages.productId, productId))
    .orderBy(asc(schema.productImages.position));

  // Admin previews need viewable URLs, not raw keys — presign server-side.
  const images = await Promise.all(
    imageRows.map(async (img) => ({
      id: img.id,
      url: await resolveImageUrl(img.url),
    })),
  );

  const initial: ProductFormValues = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compareAtPrice,
    finish: normalizeFinish(row.finish) ?? "Exclusive",
    badge: row.badge ?? "",
    sizes: row.sizes ?? [],
    toneA: row.toneA,
    toneB: row.toneB,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit product</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {row.name} · /product/{row.slug}
      </p>
      <div className="mt-8">
        <ProductForm initial={initial} images={images} />
      </div>
    </div>
  );
}
