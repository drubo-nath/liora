import type { Metadata } from "next";
import { listProducts } from "@/db/queries";
import WishlistClient from "@/components/wishlist/WishlistClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "My Wishlist — LIORA Luxury Press-On Nails",
  description: "View and manage your saved luxury press-on nail sets.",
};

export default async function WishlistPage() {
  const products = await listProducts();

  return <WishlistClient products={products} />;
}

