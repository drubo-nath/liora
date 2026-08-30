/**
 * BulkSMSBD (bulksmsbd.net) transactional SMS sender.
 *
 * Configure via .env.local:
 *   BULKSMSBD_API_KEY     — your portal API key (omit in dev to log OTPs instead)
 *   BULKSMSBD_SENDER_ID   — approved Sender ID
 *   BULKSMSBD_API_URL     — override endpoint if the portal gives you a different one
 *
 * Dev fallback: without a key, messages print to the server console so OTP
 * testing costs nothing.
 */

const DEFAULT_API_URL = "https://bulksmsbd.net/api/smsapi";
const BALANCE_API_URL = "https://bulksmsbd.net/api/getBalanceApi";

/** Error codes documented by bulksmsbd.net; 202 is the only success code. */
const ERROR_TEXT: Record<string, string> = {
  "1001": "Invalid number",
  "1002": "Sender ID not correct or disabled",
  "1003": "Required fields missing",
  "1005": "Gateway internal error",
  "1006": "Balance validity not available",
  "1007": "Insufficient balance",
  "1011": "Account not found",
  "1012": "Masking SMS must be sent in Bengali",
  "1013": "Sender ID not found for this API key",
  "1014": "Sender type name not found for this sender",
  "1015": "No valid gateway for this sender ID / API key",
  "1016": "Active price info not found for this sender ID",
  "1017": "Price info not found for this sender ID",
  "1018": "Account disabled",
  "1019": "Price plan of this account is disabled",
  "1020": "Parent account not found",
  "1021": "Parent active price plan not found",
  "1031": "Account not verified — contact administrator",
  "1032": "IP not whitelisted",
};

type GatewayResponse = {
  response_code?: number | string;
  balance?: number;
  message?: string;
  error_message?: string;
  smsinfo?: Array<Record<string, unknown>>;
};

/** Gateway expects 8801XXXXXXXXX — strip the E.164 "+". */
function toGatewayNumber(e164: string): string {
  return e164.replace(/^\+/, "");
}

export type SmsResult = { ok: boolean; dev?: boolean; error?: string };

export async function sendSMS(
  to: string | string[],
  message: string,
): Promise<SmsResult> {
  const apiKey = process.env.BULKSMSBD_API_KEY;

  if (!apiKey) {
    const recipients = Array.isArray(to) ? to : [to];
    console.log(`\n[sms:dev] ────────────────────────────────`);
    console.log(`[sms:dev] to: ${recipients.join(", ")}`);
    console.log(`[sms:dev] msg: ${message}`);
    console.log(`[sms:dev] ────────────────────────────────\n`);
    return { ok: true, dev: true };
  }

  const numbers = (Array.isArray(to) ? to : [to])
    .map(toGatewayNumber)
    .join(",");
  if (!numbers) return { ok: false, error: "No valid recipient" };

  const senderId = process.env.BULKSMSBD_SENDER_ID;

  try {
    const res = await fetch(process.env.BULKSMSBD_API_URL ?? DEFAULT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        ...(senderId ? { senderid: senderId } : {}),
        number: numbers,
        message,
      }),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as GatewayResponse | null;
    const code = data?.response_code != null ? String(data.response_code) : "";

    if (!res.ok || code !== "202") {
      const detail =
        ERROR_TEXT[code] ??
        data?.error_message ??
        data?.message ??
        `HTTP ${res.status}`;
      console.error(`[sms] gateway ${code || res.status}: ${detail}`);
      return { ok: false, error: detail };
    }

    return { ok: true };
  } catch (e) {
    console.error("[sms] send failed:", e);
    return { ok: false, error: "SMS gateway unreachable" };
  }
}

/** Remaining credit from the portal, or null when unavailable. */
export async function getBalance(): Promise<number | null> {
  const apiKey = process.env.BULKSMSBD_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `${BALANCE_API_URL}?api_key=${encodeURIComponent(apiKey)}`,
      { cache: "no-store" },
    );
    const data = (await res.json().catch(() => null)) as GatewayResponse | null;
    if (
      data &&
      String(data.response_code) === "202" &&
      typeof data.balance === "number"
    ) {
      return data.balance;
    }
    return null;
  } catch {
    return null;
  }
}

/** OTP copy follows the gateway-required template: "Your <Brand> OTP is XXXX". */
export function otpMessage(code: string) {
  return `Your LIORA OTP is ${code}.`;
}
