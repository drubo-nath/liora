import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import Swatch from "@/components/Swatch";
import BuyPanel from "@/components/product/BuyPanel";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.finish === product.finish)
    .concat(products.filter((p) => p.slug !== product.slug && p.finish !== product.finish))
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
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
        {/* Gallery */}
        <div className="grid gap-4">
          <Swatch tones={product.tones} variant="hero" className="aspect-[4/5] w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Swatch tones={product.tones} className="aspect-square w-full" />
            <Swatch
              tones={[product.tones[1], product.tones[0]]}
              className="aspect-square w-full"
            />
            <Swatch tones={product.tones} variant="thumb" className="aspect-square w-full" />
          </div>
        </div>

        {/* Details */}
        <div>
          {product.badge && (
            <p className="eyebrow text-clay">{product.badge}</p>
          )}
          <h1 className="headline mt-3 text-5xl md:text-6xl">{product.name}</h1>
          <p className="mt-3 font-serif text-xl italic text-taupe">
            {product.tagline} · {product.finish}
          </p>
          <BuyPanel product={product} />
        </div>
      </section>

      {/* Related */}
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
