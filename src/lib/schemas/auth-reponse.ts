import { z } from "zod";
import { UserResponseSchema } from "./user-response";

export const AuthenticationResponseSchema = z
  .object({
    user: UserResponseSchema,
    token: z.string(),
  })
  .passthrough();

export type AuthenticationResponse = z.infer<
  typeof AuthenticationResponseSchema
>;
