import type { Metadata } from "next";
import { Suspense } from "react";
import { listProducts } from "@/db/queries";
import ShopClient from "@/components/shop/ShopClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop All Shades",
  description:
    "Browse the full Liora collection of luxury press-on nails — creme, glazed, and shimmer finishes, hand-finished in Dhaka.",
};

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <Suspense>
      <ShopClient products={products} />
    </Suspense>
  );
}
