import type { Metadata } from "next";
import { Baskervville, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getAnnouncements } from "@/db/queries";
import { cn } from "@/lib/utils";

const baskervville = Baskervville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Times New Roman", "times", "serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baseUrl = new URL(
  process.env.NEXT_PUBLIC_APP_URL || "https://www.liorapressedons.com",
);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "LIORA — Luxury Press-On Nails in Bangladesh",
    template: "%s | LIORA Luxury Nails",
  },
  description:
    "Salon-perfect, handmade press-on nails in Dhaka, Bangladesh. Damage-free, reusable, and delivered to your door nationwide.",
  keywords: [
    "press on nails bangladesh",
    "press on nails dhaka",
    "luxury press on nails",
    "handmade nails bd",
    "liora beauty",
    "reusable false nails",
    "nail art dhaka",
    "custom press on nails",
    "bkash nail shop",
  ],
  authors: [{ name: "LIORA Beauty Ltd", url: "https://www.liorapressedons.com" }],
  creator: "LIORA Beauty",
  publisher: "LIORA Beauty Ltd",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "/",
    siteName: "LIORA Luxury Nails",
    title: "LIORA — Luxury Press-On Nails in Bangladesh",
    description:
      "Salon-perfect, handmade press-on nails in Dhaka. Damage-free, reusable, and delivered nationwide.",
    images: [
      {
        url: "/header-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIORA Luxury Press-On Nails",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIORA — Luxury Press-On Nails in Bangladesh",
    description:
      "Salon-perfect press-on nails handcrafted in Dhaka. Reusable, damage-free, and delivered nationwide.",
    images: ["/header-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.liorapressedons.com/#organization",
      "name": "LIORA Beauty Ltd",
      "url": "https://www.liorapressedons.com",
      "logo": "https://www.liorapressedons.com/favicon.svg",
      "description":
        "Luxury handmade press-on nails crafted in Dhaka, Bangladesh.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+8801577759518",
        "email": "liorapressedons@gmail.com",
        "contactType": "customer service",
        "availableLanguage": ["en", "bn"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.liorapressedons.com/#website",
      "url": "https://www.liorapressedons.com",
      "name": "LIORA",
      "publisher": { "@id": "https://www.liorapressedons.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.liorapressedons.com/shop?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

import Analytics from "@/components/analytics/Analytics";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const announcements = await getAnnouncements();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", baskervville.variable, inter.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <Analytics />
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
