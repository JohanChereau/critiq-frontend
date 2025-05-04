// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      /** string because NextAuth expects User.id to be a string */
      id: string;
      username: string;
      fullName: string;
      profilePictureUrl: string | null;
      dateOfBirth: string;
      termsAccepted: boolean;
      termsAcceptedAt: string;
      newsletterOptIn: boolean;
      newsletterOptInAt: string;
      accountLocked: boolean;
      enabled: boolean;
      roles: string[];
    };
  }

  interface User extends DefaultUser {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: Session["user"];
  }
}
