import Link from "next/link";
import { asc, sql } from "drizzle-orm";
import Image from "next/image";
import { db, schema } from "@/db";
import { formatBDT } from "@/lib/format";
import { toggleProductActive, deleteProduct } from "@/lib/actions/admin";
import { resolveImageUrl } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const covers = await Promise.all(
    rows.map(async (r) => ({
      id: r.id,
      url: r.imageUrl ? await resolveImageUrl(r.imageUrl) : null,
    })),
  );
  const coverById = new Map(covers.map((c) => [c.id, c.url]));

  const hidden = rows.filter((r) => !r.isActive).length;

  async function setActive(fd: FormData) {
    "use server";
    await toggleProductActive(
      Number(fd.get("productId")),
      fd.get("isActive") === "true",
    );
  }
  async function remove(fd: FormData) {
    "use server";
    await deleteProduct(Number(fd.get("productId")));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} products · {hidden} hidden
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">+ New product</Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Finish</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id} className={p.isActive ? "" : "opacity-60"}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                    {coverById.get(p.id) ? (
                      <Image
                        src={coverById.get(p.id)!}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(155deg, var(--color-blush), var(--color-clay))",
                        }}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">
                    {p.name}
                    {p.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {p.badge}
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">/{p.slug}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.finish}</TableCell>
                <TableCell>{formatBDT(p.price)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {Number(p.imageCount)}
                </TableCell>
                <TableCell>
                  <Badge variant={p.isActive ? "default" : "outline"}>
                    {p.isActive ? "Live" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/products/${p.id}`}>Edit</Link>
                    </Button>
                    <form action={setActive}>
                      <input type="hidden" name="productId" value={p.id} />
                      <input
                        type="hidden"
                        name="isActive"
                        value={(!p.isActive).toString()}
                      />
                      <Button size="sm" variant="ghost" type="submit">
                        {p.isActive ? "Hide" : "Publish"}
                      </Button>
                    </form>
                    <form action={remove}>
                      <input type="hidden" name="productId" value={p.id} />
                      <Button
                        size="sm"
                        variant="ghost"
                        type="submit"
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  No products yet — create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
