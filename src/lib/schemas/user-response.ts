import { z } from "zod";

export const UserResponseSchema = z
  .object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    profilePictureUrl: z.string().url().nullable(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format, expected YYYY-MM-DD",
    }),
    termsAccepted: z.boolean(),
    termsAcceptedAt: z.string(),
    newsletterOptIn: z.boolean(),
    newsletterOptInAt: z.string(),
    accountLocked: z.boolean(),
    enabled: z.boolean(),
    roles: z.array(z.string()),
  })
  .passthrough();

export type UserResponse = z.infer<typeof UserResponseSchema>;
