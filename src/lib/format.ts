/** Format whole-taka amounts: 1450 → "৳1,450" */
export function formatBDT(n: number) {
  return `৳${n.toLocaleString("en-US")}`;
}

/** Free delivery threshold + flat fee, mirrored server-side at checkout. */
export const FREE_SHIPPING_THRESHOLD = 2500;
export const SHIPPING_FEE = 120;

export function shippingFeeFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
    ? 0
    : SHIPPING_FEE;
}
