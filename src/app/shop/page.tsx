import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Shades",
  description:
    "Browse the full Liora collection of luxury press-on nails — creme, glazed, and shimmer finishes, handcrafted in Dhaka.",
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopClient />
    </Suspense>
  );
}
