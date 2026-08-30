/**
 * Normalize Bangladeshi mobile numbers to E.164 (+8801XXXXXXXXX).
 * Accepts 01XXXXXXXXX, 8801XXXXXXXXX, +8801XXXXXXXXX (spaces/dashes ignored).
 * Returns null for anything that isn't a valid BD mobile.
 */
export function normalizeBDPhone(input: string): string | null {
  let d = input.replace(/[\s\-()]/g, "").trim();
  if (d.startsWith("+")) d = d.slice(1);
  if (d.startsWith("88")) d = `0${d.slice(3)}`;
  if (!/^01[3-9]\d{8}$/.test(d)) return null;
  return `+880${d.slice(1)}`;
}

/** Pretty display: +8801712345678 → 01712-345678 */
export function formatPhone(e164: string | null | undefined) {
  if (!e164) return "";
  const m = e164.match(/^\+880(\d{5})(\d{6})$/);
  return m ? `0${m[1]}-${m[2]}` : e164;
}
