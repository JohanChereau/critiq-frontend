import { getSession } from "next-auth/react";
import { parseExceptionResponse } from "./schemas/exception-response";

const BASE = process.env.CRITIQ_BACKEND_URL!;

/**
 * A small wrapper around the standard fetch API that:
 * 1. Automatically injects the current user's JWT as a Bearer token
 * 2. Parses the response text as JSON, or throws if it’s invalid
 * 3. On non-2xx status codes, attempts to parse our standardized
 *    ExceptionResponse payload and throws an Error with its message
 *
 * @template T
 * @param input - The relative endpoint path (e.g. "/movies", "/user/me")
 * @param init  - Optional fetch options (method, headers, body, etc.)
 * @returns A Promise that resolves with the parsed JSON body as type T
 * @throws {Error} If the response is not valid JSON, or if status ≥ 400.
 *                 If the server returned a structured ExceptionResponse,
 *                 its `message` property is used as the Error message.
 */
export async function authFetch<T = unknown>(
  input: string,
  init: RequestInit = {},
): Promise<T> {
  // Retrieve the current session to get the JWT
  const session = await getSession();
  const token = session?.accessToken;

  // Merge headers, injecting Authorization if we have a token
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Perform the network request
  const res = await fetch(`${BASE}${input}`, { ...init, headers });

  // Read the raw text and attempt to JSON.parse it
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  // If we received an HTTP error, try to interpret it as our ExceptionResponse
  if (!res.ok) {
    try {
      const err = parseExceptionResponse(data);
      const e = new Error(err.message);
      // Attach the backend-specific errorCode if you need it
      // @ts-expect-error code doesn't exist in error
      e.code = err.errorCode;
      throw e;
    } catch {
      throw new Error("Unexpected error from server");
    }
  }

  return data as T;
}
