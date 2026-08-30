import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listProducts, getProductBySlug } from "@/db/queries";
import Swatch from "@/components/Swatch";
import BuyPanel from "@/components/product/BuyPanel";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await listProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && p.finish === product.finish)
    .concat(all.filter((p) => p.slug !== product.slug && p.finish !== product.finish))
    .slice(0, 4);

  return (
    <>
      <nav className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10" aria-label="Breadcrumb">
        <ol className="eyebrow flex items-center gap-3 text-[10px] text-taupe">
          <li>
            <Link href="/" className="link-sweep">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/shop" className="link-sweep">Shop</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-10 md:grid-cols-2 md:px-10 md:py-14 lg:gap-20">
        <div className="grid gap-4">
          <Swatch
            tones={product.tones}
            imageUrl={product.imageUrl}
            variant="hero"
            className="aspect-[4/5] w-full"
          />
          {product.images.length > 1 && (
            <div
              className={`grid gap-4 ${product.images.length >= 3 ? "grid-cols-3" : product.images.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {product.images.slice(1, 4).map((url) => (
                <Swatch
                  key={url}
                  tones={product.tones}
                  imageUrl={url}
                  className="aspect-square w-full"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && <p className="eyebrow text-clay">{product.badge}</p>}
          <h1 className="headline mt-3 text-5xl md:text-6xl">{product.name}</h1>
          <p className="mt-3 font-serif text-xl italic text-taupe">
            {product.tagline} · {product.finish}
          </p>
          <BuyPanel product={product} />
        </div>
      </section>

      <section className="hairline mx-auto max-w-[1440px] border-t px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="headline text-4xl md:text-5xl">
            You may also <em>love</em>
          </h2>
          <Link href="/shop" className="link-sweep eyebrow hidden pb-1 md:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
