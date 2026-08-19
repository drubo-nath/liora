export type Finish = "Creme" | "Glazed" | "Shimmer";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: number; // BDT
  compareAt?: number;
  finish: Finish;
  tones: [string, string]; // gradient pair for swatch art
  badge?: "Bestseller" | "New";
  description: string;
}

export const products: Product[] = [
  {
    slug: "nude-atelier",
    name: "Nude Atelier",
    tagline: "The perfect bone nude",
    price: 1450,
    finish: "Creme",
    tones: ["#e9d7c6", "#c9a98f"],
    badge: "Bestseller",
    description:
      "A quiet, sculpted nude that reads expensive in every light. Our most re-ordered shade — sheer enough for the office, polished enough for the evening.",
  },
  {
    slug: "dhaka-dawn",
    name: "Dhaka Dawn",
    tagline: "Dusty morning rose",
    price: 1390,
    finish: "Creme",
    tones: ["#eec4ba", "#cf958a"],
    badge: "New",
    description:
      "The pink of first light over the Buriganga. A muted rose that flatters every skin tone — soft, assured, unmistakably yours.",
  },
  {
    slug: "rouge-noor",
    name: "Rouge Noor",
    tagline: "A luminous true red",
    price: 1590,
    compareAt: 1790,
    finish: "Glazed",
    tones: ["#b1453a", "#6e2019"],
    badge: "Bestseller",
    description:
      "Red, distilled. A glazed crimson with mirror depth — the shade you reach for when the room needs to remember you were there.",
  },
  {
    slug: "cafe-monsoon",
    name: "Café Monsoon",
    tagline: "Rain-washed mocha",
    price: 1390,
    finish: "Creme",
    tones: ["#c9a17e", "#8a6248"],
    description:
      "Warm mocha with a rain-cloud undertone. Grounded, grown-up, and endlessly wearable — the cashmere sweater of our collection.",
  },
  {
    slug: "pearl-reverie",
    name: "Pearl Reverie",
    tagline: "Milky opal shimmer",
    price: 1550,
    finish: "Shimmer",
    tones: ["#f4ece2", "#d8c7b4"],
    description:
      "A veil of milky pearl that catches light like silk. Worn alone it whispers; layered over creme shades, it glows.",
  },
  {
    slug: "terra-sundari",
    name: "Terra Sundari",
    tagline: "Baked terracotta",
    price: 1450,
    finish: "Creme",
    tones: ["#d98f68", "#a05236"],
    badge: "New",
    description:
      "Sun-baked clay from the potteries of old Dhaka. Warm, earthy, quietly bold — terracotta refined to its most elegant form.",
  },
  {
    slug: "midnight-jamdani",
    name: "Midnight Jamdani",
    tagline: "Loom-blue noir",
    price: 1590,
    finish: "Glazed",
    tones: ["#3a4a6b", "#141d31"],
    description:
      "The deep indigo of a jamdani loom at midnight. Near-black navy with a lacquered finish — for evenings that run late.",
  },
  {
    slug: "rose-whisper",
    name: "Rose Whisper",
    tagline: "Barely-there ballet pink",
    price: 1350,
    finish: "Creme",
    tones: ["#f6ded9", "#e3b6b0"],
    badge: "Bestseller",
    description:
      "The palest ballet pink, sheered to a whisper. Clean-girl nails in a single press — your natural nail, on its best day.",
  },
  {
    slug: "noir-eternel",
    name: "Noir Éternel",
    tagline: "Absolute black lacquer",
    price: 1490,
    finish: "Glazed",
    tones: ["#3a3430", "#0e0b0a"],
    description:
      "Black without apology. A glass-lacquered noir with zero streaks — sharp, timeless, and permanently in season.",
  },
  {
    slug: "golden-paddy",
    name: "Golden Paddy",
    tagline: "Champagne harvest shimmer",
    price: 1550,
    finish: "Shimmer",
    tones: ["#eedcae", "#c9a86f"],
    badge: "New",
    description:
      "Champagne gold milled from harvest light. A fine, jewelry-grade shimmer — festive without ever raising its voice.",
  },
  {
    slug: "lilac-dusk",
    name: "Lilac Dusk",
    tagline: "Evening mauve",
    price: 1390,
    finish: "Creme",
    tones: ["#d8c3d6", "#a98ca4"],
    description:
      "The mauve hour, bottled. A dusky lilac that sits between pink and grey — understated, modern, impossible to place.",
  },
  {
    slug: "crimson-rani",
    name: "Crimson Rani",
    tagline: "Regal oxblood",
    price: 1590,
    compareAt: 1850,
    finish: "Glazed",
    tones: ["#8a3540", "#4e1a20"],
    badge: "Bestseller",
    description:
      "An oxblood worthy of its name — deep, glazed, and quietly imperious. The wedding-season shade our brides reorder by the box.",
  },
];

export const finishes: Finish[] = ["Creme", "Glazed", "Shimmer"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatBDT(n: number) {
  return `৳${n.toLocaleString("en-US")}`;
}
