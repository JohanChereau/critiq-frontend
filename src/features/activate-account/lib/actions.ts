"use server";

import { CRITIQ_API_URL } from "@/lib/config";
import { parseExceptionResponse } from "@/lib/schemas/exception-response";

export type ActivateAccountState = { error?: string; success?: string };

/**
 * Sends the 6-digit activation code to the API.
 * - If code is missing or not exactly 6 digits, returns a client error immediately.
 * - On 2xx: returns { success }
 * - On non-2xx with a JSON payload: parses our standard ExceptionResponse and returns its `message` as error.
 * - On non-2xx without a JSON body: returns a generic error.
 */
export async function createActivateAccountAction(
  _prev: ActivateAccountState,
  formData: FormData,
): Promise<ActivateAccountState> {
  const code = formData.get("code")?.toString().trim() ?? "";

  // 1) Basic client‐side style validation
  if (!/^\d{6}$/.test(code)) {
    return { error: "Please enter a valid 6-digit code." };
  }

  // 2) Call the Spring endpoint
  const res = await fetch(
    `${CRITIQ_API_URL}/auth/activate-account?token=${encodeURIComponent(code)}`,
    { method: "GET" },
  );

  // 3) On success just return success
  if (res.ok) {
    return { success: "Your account has been activated 🎉" };
  }

  // 4) Try to parse the JSON error payload
  let raw: unknown;
  try {
    raw = await res.json();
  } catch {
    return { error: "Unexpected response from server." };
  }

  const err = parseExceptionResponse(raw);
  return { error: err.message };
}
