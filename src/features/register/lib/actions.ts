// src/features/register/lib/actions.ts
"use server";

import { CRITIQ_API_URL } from "@/lib/config";
import { parseExceptionResponse } from "@/lib/schemas/exception-response";
import { UserRegisterSchema, type UserRegisterForm } from "./schemas";
import { revalidatePath } from "next/cache";

type FieldErrors = Partial<Record<keyof UserRegisterForm, string>>;
export type ActionState = { errors?: FieldErrors; success?: string };

export async function createRegisterAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1) client‐side Zod validation
  const raw = Object.fromEntries(formData.entries());
  const result = UserRegisterSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: FieldErrors = {};
    for (const [key, msgs] of Object.entries(
      result.error.flatten().fieldErrors,
    )) {
      if (msgs && msgs.length) {
        fieldErrors[key as keyof UserRegisterForm] = msgs[0];
      }
    }
    return { errors: fieldErrors };
  }

  // 2) call your Next.js API proxy
  const response = await fetch(`${CRITIQ_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  // 3) error path
  if (!response.ok) {
    const rawErr = await response.json().catch(() => ({}));
    const err = parseExceptionResponse(rawErr);

    // 3.a fieldErrors from backend
    if (err.fieldErrors) {
      return { errors: err.fieldErrors as FieldErrors };
    }

    // 3.b fallback by errorCode
    let field: keyof UserRegisterForm = "email";
    if (err.errorCode === 2003) {
      field = "username"; // USER_USERNAME_ALREADY_EXISTS
    } else if (err.errorCode === 2005) {
      field = "email"; // USER_EMAIL_ALREADY_EXISTS
    }
    return { errors: { [field]: err.message } };
  }

  // 4) success path — **this return was missing**
  revalidatePath("/auth/register");
  return {
    success:
      "Registration successful! Please check your email to activate your account.",
  };
}
