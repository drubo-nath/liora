import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getAnnouncements } from "@/db/queries";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LIORA — Luxury Press-On Nails in Bangladesh",
    template: "%s — LIORA",
  },
  description:
    "Salon-perfect press-on nails handcrafted in Dhaka. Damage-free, reusable, and delivered to your door across Bangladesh.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const announcements = await getAnnouncements();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", fraunces.variable, inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <CartProvider>
          <AnnouncementBar messages={announcements} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
