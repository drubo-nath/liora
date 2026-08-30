/** DB-agnostic types and constants shared between server and client. */

export interface ProductDTO {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  finish: "Creme" | "Glazed" | "Shimmer";
  badge: "Bestseller" | "New" | null;
  tones: [string, string];
  imageUrl: string | null;
  /** Admin-configured sizes; empty means the standard XS–L range. */
  sizes: string[];
  /** Gallery ordered by position; index 0 is the cover. */
  images: string[];
}

export interface ReviewDTO {
  id: number;
  authorName: string;
  location: string;
  rating: number;
  body: string;
}

export type Finish = "Creme" | "Glazed" | "Shimmer";

export const finishes: Finish[] = ["Creme", "Glazed", "Shimmer"];
