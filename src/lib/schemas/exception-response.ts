// lib/schemas/exception-response.ts
import { z } from "zod";

/**
 * A record mapping field names to their respective error messages.
 * Used when validation fails on specific form fields.
 */
export const FieldErrorsSchema = z.record(z.string());

/**
 * A generic schema for backend exception responses.
 *
 * - `status`: HTTP status code (e.g. 400, 409, 500).
 * - `errorCode`: your internal error code (e.g. 2005, 3001).
 * - `message`: human-readable error description.
 * - `timestamp`: ISO-8601 datetime string of when the error occurred.
 * - `fieldErrors` (optional): map of field-specific validation errors.
 * - `details` (optional): any extra details for debug or display.
 *
 * `.passthrough()` allows additional properties without validation errors.
 */
export const ExceptionResponseSchema = z
  .object({
    status: z.number(),
    errorCode: z.number(),
    message: z.string(),
    timestamp: z.string(), // e.g. "2025-05-03T18:09:31.4404086"
    fieldErrors: FieldErrorsSchema.optional(),
    details: z.string().optional(),
  })
  .passthrough();

/**
 * Strongly-typed TypeScript type for exception responses.
 */
export type ExceptionResponse = z.infer<typeof ExceptionResponseSchema>;

/**
 * Parses an arbitrary `data` payload into a validated `ExceptionResponse`.
 *
 * @param data - the raw JSON parsed response from `fetch` or similar.
 * @returns a fully-typed `ExceptionResponse`.
 * @throws if the payload does not match the expected shape.
 */
export function parseExceptionResponse(data: unknown): ExceptionResponse {
  const result = ExceptionResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid exception response shape");
  }
  return result.data;
}
