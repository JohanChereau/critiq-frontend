import { z } from "zod";

// Zod schema for user registration
export const UserRegisterSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." }),
    lastname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(15, { message: "Username must be at most 15 characters." }),
    dateOfBirth: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date({ invalid_type_error: "Invalid date of birth." }),
    ),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .refine((p) => /[A-Z]/.test(p), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((p) => /[a-z]/.test(p), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((p) => /[!@#$%^&*(),.?\":{}|<>]/.test(p), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
    acceptTerms: z
      .preprocess((val) => val === "on", z.boolean())
      .refine((v) => v, {
        message: "You must accept the Terms and Conditions.",
      }),
    acceptNewsletter: z.preprocess((val) => val === "on", z.boolean()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

// Type inferred from the schema
export type UserRegisterForm = z.infer<typeof UserRegisterSchema>;
